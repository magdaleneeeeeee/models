#!/usr/bin/env python3
"""Download / extract official product photos for the highlight stories and normalise them.

Input : JSON list on stdin: [{"id": "stv/security", "url": "...", "page"?: int, "xref"?: int, "salicePage"?: url}]
Output: assets/highlights/<id>.jpg  (max 1600 px, sRGB)  +  assets/highlights/meta.json  {id: {w,h,bg,mode,src}}
  mode "cut"   → photo shot on (near) white: shown as a cut-out, contain, on the white story
  mode "plate" → photo with its own backdrop / interior: shown as a clean rectangular plate, cover
Nothing is altered in the product itself: only uniform margins are trimmed and the image is resized.
"""
import io, json, os, re, subprocess, sys, urllib.parse
from PIL import Image, ImageChops

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
OUT = os.path.join(ROOT, 'assets', 'highlights')
CACHE = os.path.join(os.path.dirname(__file__), '.cache')
UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/124 Safari/537.36'


def fetch(url, dest=None):
    os.makedirs(CACHE, exist_ok=True)
    dest = dest or os.path.join(CACHE, re.sub(r'[^A-Za-z0-9._-]+', '_', url)[-180:])
    if not os.path.exists(dest) or os.path.getsize(dest) == 0:
        for _ in range(3):
            r = subprocess.run(['curl', '-sS', '-L', '-f', '-A', UA, '-m', '90', '-o', dest, url], capture_output=True, text=True)
            if r.returncode == 0:
                break
        else:
            raise RuntimeError(f'download failed {url}: {r.stderr.strip()[:120]}')
    return dest


def salice_best(page_url, fallback):
    """Salice/ATIM product page → largest detail/packshot image (_z_ DET/PRE), else listing image."""
    h = open(fetch(page_url), errors='ignore').read()
    imgs = list(dict.fromkeys(re.findall(r'/media/immagini/\d+_[zn]_[^"\'\s)]+?\.(?:jpg|png)', h)))
    imgs = [i for i in imgs if 'MENU' not in i and '-MAG-' not in i and 'technical-drawing' not in i and 'CAT' not in i]
    pri = [i for i in imgs if '_z_' in i and re.search(r'(PRE|DET)', i)] + [i for i in imgs if re.search(r'PRE', i)]
    return 'https://www.salice.com' + pri[0] if pri else fallback


def pdf_image(pdf_url, page, xref):
    import pymupdf as fitz
    d = fitz.open(fetch(pdf_url))
    pix = fitz.Pixmap(d, xref)
    if pix.colorspace and pix.colorspace.n != 3:
        pix = fitz.Pixmap(fitz.csRGB, pix)
    sm = d.xref_get_key(xref, 'SMask')
    im = Image.open(io.BytesIO(pix.tobytes('png')))
    if sm[0] == 'xref':
        m = fitz.Pixmap(d, int(sm[1].split()[0]))
        mask = Image.open(io.BytesIO(m.tobytes('png'))).convert('L').resize(im.size)
        bg = Image.new('RGB', im.size, 'white'); bg.paste(im.convert('RGB'), mask=mask); im = bg
    return im


def border_color(im):
    w, h = im.size
    px = [im.getpixel((x, y)) for x in range(0, w, max(1, w // 40)) for y in (0, h - 1)] + \
         [im.getpixel((x, y)) for y in range(0, h, max(1, h // 40)) for x in (0, w - 1)]
    px.sort(key=lambda p: sum(p))
    return px[len(px) // 2]


def trim(im, bg, tol=10, pad=0.04):
    diff = ImageChops.difference(im, Image.new('RGB', im.size, bg)).convert('L').point(lambda v: 255 if v > tol else 0)
    box = diff.getbbox()
    if not box:
        return im
    x0, y0, x1, y1 = box
    px, py = int((x1 - x0) * pad), int((y1 - y0) * pad)
    return im.crop((max(0, x0 - px), max(0, y0 - py), min(im.width, x1 + px), min(im.height, y1 + py)))


def main():
    specs = json.load(sys.stdin)
    meta_path = os.path.join(OUT, 'meta.json')
    meta = json.load(open(meta_path)) if os.path.exists(meta_path) else {}
    force = '--force' in sys.argv
    for s in specs:
        out = os.path.join(OUT, s['id'] + '.jpg')
        if os.path.exists(out) and s['id'] in meta and not force:
            continue
        os.makedirs(os.path.dirname(out), exist_ok=True)
        try:
            if 'xref' in s:
                im = pdf_image(s['url'], s['page'], s['xref']); src = f"{s['url']}#page={s['page']}"
            else:
                url = salice_best(s['salicePage'], s['url']) if s.get('salicePage') else s['url']
                im = Image.open(fetch(url)); src = url
            if im.mode in ('RGBA', 'LA', 'P'):
                im = im.convert('RGBA'); bgc = Image.new('RGB', im.size, 'white'); bgc.paste(im, mask=im.split()[-1]); im = bgc
            im = im.convert('RGB')
            bg = border_color(im)
            light = min(bg) >= 238
            mode = s.get('mode') or ('cut' if light else 'plate')
            if mode == 'cut':
                im = trim(im, bg)
            im.thumbnail((1600, 1600), Image.LANCZOS)
            im.save(out, 'JPEG', quality=88, optimize=True, progressive=True)
            meta[s['id']] = {'w': im.width, 'h': im.height, 'bg': '#%02x%02x%02x' % bg, 'mode': mode, 'src': src}
            print('ok  ', s['id'], im.size, mode)
        except Exception as e:  # keep going; the story falls back to a placeholder
            print('FAIL', s['id'], e)
    json.dump(meta, open(meta_path, 'w'), indent=1, ensure_ascii=False, sort_keys=True)


if __name__ == '__main__':
    main()
