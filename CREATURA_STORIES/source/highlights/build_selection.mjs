#!/usr/bin/env node
// Highlights v2 — Creatura selection, each brand in its own style, large readable type.
//   node source/highlights/build_selection.mjs [--only <folder-prefix>] [--no-fetch]
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
import { SELECTION } from './selection.mjs';
import { THEMES } from './themes.mjs';
import { V2 } from './layouts_v2.mjs';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..');
const OUT = path.join(ROOT, 'HIGHLIGHTS');
const ASSETS = path.join(ROOT, 'assets', 'highlights');
const args = process.argv.slice(2);
const only = args.includes('--only') ? args[args.indexOf('--only') + 1] : null;

const NB = ' ';
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const typo = (str) => { let s = String(str ?? ''); for (let i = 0; i < 2; i++) s = s.replace(/(^|[\s («])([А-Яа-яЁёA-Za-z]{1,2}|для|под|или|без)\s+/g, `$1$2${NB}`);
  return esc(s.replace(/\s+—/g, NB + '—').replace(/(\d)\s+(мм|кг|°)/g, `$1${NB}$2`).replace(/(\d) (\d{3})\b/g, `$1${NB}$2`)); };

async function main() {
  const brands = SELECTION.filter((b) => !only || b.folder.startsWith(only));
  const specs = []; const walk = (o) => { if (!o || typeof o !== 'object') return; if (o.id && typeof o.url === 'string') specs.push(o); else Object.values(o).forEach(walk); };
  brands.forEach((b) => walk(b.stories));
  if (!args.includes('--no-fetch')) execFileSync('python3', [path.join(HERE, 'process_images.py')], { input: JSON.stringify([...new Map(specs.map((s) => [s.id, s])).values()]), stdio: ['pipe', 'inherit', 'inherit'] });
  const meta = JSON.parse(fs.readFileSync(path.join(ASSETS, 'meta.json')));

  if (!only) for (const d of fs.readdirSync(OUT)) if (/^\d\d_/.test(d)) fs.rmSync(path.join(OUT, d), { recursive: true });
  const browser = await chromium.launch(); const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  const report = [];
  for (const b of brands) {
    const t = THEMES[b.key]; const outDir = path.join(OUT, b.folder); const htmlDir = path.join(HERE, 'html_v2', b.folder);
    fs.rmSync(outDir, { recursive: true, force: true }); fs.mkdirSync(outDir, { recursive: true }); fs.mkdirSync(htmlDir, { recursive: true });
    const toc = [...new Set(b.stories.map((s) => (s.kind === 'grid' ? s.cat : s.title).replace(/ \d+\/\d+$/, '').replace(/ · \d+\/\d+$/, '')))];
    const seq = [{ kind: 'cover' }, { kind: 'intro', toc: toc.slice(0, 16) }, ...b.stories, { kind: 'cta' }];
    const missing = [];
    for (let i = 0; i < seq.length; i++) {
      const s = { ...seq[i], n: i + 1, total: seq.length };
      const rel = (f) => path.relative(htmlDir, f).split(path.sep).join('/');
      const h = {
        t: typo,
        m: (spec, x, y, w, hh, o = {}) => {
          const pos = o.rel ? 'left:0;top:0;' : `left:${x}px;top:${y}px;`; const box = `${pos}width:${w}px;height:${hh}px`;
          const mt = spec && meta[spec.id]; const file = spec && path.join(ASSETS, spec.id + '.jpg');
          if (mt && fs.existsSync(file)) return `<div class="m ${mt.mode === 'cut' ? 'cut' : 'plate'}" style="${box};${mt.mode === 'cut' ? '' : `background:${mt.bg}`}"><img src="${rel(file)}" alt=""></div>`;
          if (spec) missing.push(spec.id);
          return `<div class="m" style="${box}"><div class="ph">${spec ? 'фото: ' + esc(spec.id.split('/').pop()) : ''}</div></div>`;
        },
      };
      const inner = V2[s.kind](b, s, h, t);
      const hf = path.join(htmlDir, `${String(i).padStart(2, '0')}.html`);
      fs.writeFileSync(hf, V2.doc(t, rel(path.join(ROOT, 'fonts')), inner));
      await page.goto(pathToFileURL(hf).href);
      await page.evaluate(async () => { await document.fonts.ready; await Promise.all([...document.images].map((im) => (im.complete ? 0 : new Promise((r) => { im.onload = im.onerror = r; })))); });
      const issues = await page.evaluate(() => {
        const o = []; const R = (e) => e.getBoundingClientRect();
        for (const e of document.querySelectorAll('.t,.k,.p,.specs,.row,.tile,.toc,.q,.cta,.sub')) { if (e.closest('.hdr')) continue; const r = R(e);
          if (r.top < 250 || r.bottom > 1625) o.push(`safe-zone "${e.textContent.trim().slice(0, 24)}" ${Math.round(r.top)}-${Math.round(r.bottom)}`);
          if (r.right > 1000) o.push(`right-edge "${e.textContent.trim().slice(0, 24)}"`); }
        const media = [...document.querySelectorAll('.s > .m')];
        for (const e of document.querySelectorAll('.t,.p,.specs,.sub')) for (const m of media) { const a = R(e), c = R(m);
          if (Math.min(a.bottom, c.bottom) - Math.max(a.top, c.top) > 2 && Math.min(a.right, c.right) - Math.max(a.left, c.left) > 2) o.push(`text over photo "${e.textContent.trim().slice(0, 24)}"`); }
        const tiles = [...document.querySelectorAll('.row,.tile')]; for (let i = 1; i < tiles.length; i++) { const a = R(tiles[i - 1]), c = R(tiles[i]); if (a.bottom > c.top + 2 && a.left === c.left) o.push('rows overlap'); }
        return [...new Set(o)];
      });
      const name = s.kind === 'cover' ? '00_cover' : String(i).padStart(2, '0');
      await page.screenshot({ path: path.join(outDir, name + '.png') });
      if (s.kind === 'cover') { const p = path.join(outDir, 'cover_icon_1080x1080.png'); await page.screenshot({ path: p, clip: { x: 170, y: 590, width: 740, height: 740 } });
        execFileSync('python3', ['-c', `from PIL import Image; im = Image.open('${p}'); im.resize((1080, 1080), Image.LANCZOS).save('${p}')`]); }
      report.push({ b, name, kind: s.kind, title: s.title || s.kind, issues });
      if (issues.length) console.log(`  ⚠ ${b.folder}/${name}: ${issues.join('; ')}`);
    }
    console.log(`${b.folder}: ${seq.length} stories${missing.length ? `, ${missing.length} без фото: ${missing.join(', ')}` : ''}`);
    b._n = seq.length; b._missing = missing;
  }
  await browser.close();
  if (!only) {
    const L = ['# CREATURA — Актуальное (v2: подборка Creatura, стиль каждого бренда)', '', 'Каждая папка — один раздел «Актуального». Публикуйте по порядку: `00_cover.png`, затем `01.png`, `02.png`… Обложка раздела — `cover_icon_1080x1080.png`.', ''];
    for (const b of brands) { L.push(`## ${b.name}${b.coverSub ? ' ' + b.coverSub : ''} — \`${b.folder}\` · ${b._n} сторис`, ''); report.filter((r) => r.b === b).forEach((r) => L.push(`- \`${r.name}.png\` — ${r.kind === 'cover' ? 'обложка' : r.kind === 'intro' ? 'о бренде' : r.kind === 'cta' ? 'запрос каталога' : r.title}`)); L.push(''); }
    fs.writeFileSync(path.join(OUT, 'README.md'), L.join('\n') + '\n');
  }
}
main().catch((e) => { console.error(e); process.exit(1); });
