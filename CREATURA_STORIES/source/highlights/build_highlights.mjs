#!/usr/bin/env node
// CREATURA — Highlights (Актуальное): one catalogue story set per brand.
//   node source/highlights/build_highlights.mjs            → download/refresh official photos, render all brands
//   node source/highlights/build_highlights.mjs --only stv → one brand
//   --no-fetch  skip photo download (use what is in assets/highlights)
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
import { hl } from './layouts_hl.mjs';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..');
const OUT = path.join(ROOT, 'HIGHLIGHTS');
const ASSETS = path.join(ROOT, 'assets', 'highlights');
const args = process.argv.slice(2);
const only = args.includes('--only') ? args[args.indexOf('--only') + 1] : null;

const BRANDS = ['salice', 'atim', 'stv', 'formani', 'verum', 'salicepaolo', 'ceam', 'fritsjurgens', 'simonswerk', 'alumove'];
const CTA_WHAT = { salice: 'петли и механизмы', atim: 'механизмы-трансформеры', stv: 'замки', formani: 'дверную фурнитуру', verum: 'ручки', salicepaolo: 'латунные ручки', ceam: 'скрытые петли', fritsjurgens: 'pivot-системы', simonswerk: 'дверные петли', alumove: 'алюминиевые фасады' };

const NBSP = ' ';
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
function typo(str) {
  let s = String(str ?? '');
  for (let i = 0; i < 2; i++) s = s.replace(/(^|[\s («])([А-Яа-яЁёA-Za-z]{1,2}|для|под|или|без|над|при)\s+/g, `$1$2${NBSP}`);
  s = s.replace(/\s+—/g, NBSP + '—').replace(/(\d)\s+(мм|кг|см|м|%|°)/g, `$1${NBSP}$2`).replace(/(\d) (\d{3})\b/g, `$1${NBSP}$2`);
  return esc(s);
}

async function main() {
  const brands = [];
  for (const k of BRANDS.filter((k) => !only || k === only)) brands.push((await import(pathToFileURL(path.join(HERE, 'brands', k + '.mjs')).href)).default);

  // 1. official photos
  const specs = [];
  const walk = (o) => { if (!o || typeof o !== 'object') return; if (o.id && o.url && typeof o.url === 'string') specs.push(o); else Object.values(o).forEach(walk); };
  brands.forEach((b) => walk(b.stories));
  const uniq = [...new Map(specs.map((s) => [s.id, s])).values()];
  if (!args.includes('--no-fetch')) {
    execFileSync('python3', [path.join(HERE, 'process_images.py')], { input: JSON.stringify(uniq), stdio: ['pipe', 'inherit', 'inherit'], maxBuffer: 1 << 26 });
  }
  const meta = fs.existsSync(path.join(ASSETS, 'meta.json')) ? JSON.parse(fs.readFileSync(path.join(ASSETS, 'meta.json'))) : {};

  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  const report = [];

  for (const b of brands) {
    b.ctaWhat = CTA_WHAT[b.key];
    const toc = [...new Set(b.stories.map((s) => s.cat.replace(/ · \d+\/\d+$/, '').replace(/^(Timeless|Classic|Bathroom) · .*$/, '$1')))];
    const seq = [{ kind: 'cover' }, { kind: 'intro', toc }, ...b.stories, { kind: 'cta' }];
    const outDir = path.join(OUT, b.folder); const htmlDir = path.join(HERE, 'html', b.folder);
    fs.rmSync(outDir, { recursive: true, force: true }); fs.mkdirSync(outDir, { recursive: true }); fs.mkdirSync(htmlDir, { recursive: true });
    const missing = [];

    for (let i = 0; i < seq.length; i++) {
      const s = { ...seq[i], n: i + 1, total: seq.length };
      const rel = (f) => path.relative(htmlDir, f).split(path.sep).join('/');
      const h = {
        t: typo,
        hdr: (b, s) => `<div class="hdr"><span class="mark">CREATURA</span><span class="tag"><b>${typo(b.name)}</b>&nbsp;&nbsp;${String(s.n).padStart(2, '0')} / ${s.total}</span></div>`,
        m: (spec, x, y, w, hh, o = {}) => {
          const pos = o.rel ? '' : `left:${x}px;top:${y}px;`;
          const mt = spec && meta[spec.id]; const file = spec && path.join(ASSETS, spec.id + '.jpg');
          if (mt && fs.existsSync(file)) {
            const style = `${pos}width:${w}px;height:${hh}px;--plate:${mt.bg};`;
            const cls = mt.mode === 'cut' ? 'cut' : (spec.fit ? 'plate fit' : 'plate');
            return `<div class="m ${cls}" style="${style}"><img src="${rel(file)}" alt="" style="object-position:${spec.pos || '50% 50%'}"></div>`;
          }
          missing.push(spec ? spec.id : '(no image)');
          return `<div class="slot ${o.thumb ? 'sm' : ''}" style="${pos}width:${w}px;height:${hh}px;${o.rel ? 'position:absolute;left:0;top:0' : ''}"><div class="ph"><div class="ph__label"><span class="ph__kind">Фото · placeholder</span><span class="ph__file">${esc(spec ? spec.id : '')}</span></div></div></div>`;
        },
      };
      const inner = s.kind === 'cover' ? hl.cover(b, h) : s.kind === 'intro' ? hl.intro(b, s, h) : s.kind === 'cta' ? hl.cta(b, s, h) : hl[s.kind](b, s, h);
      const html = `<!doctype html>\n<html lang="ru"><head><meta charset="utf-8"><title>${esc(b.name)} · ${s.n}</title>
<link rel="stylesheet" href="../../../styles.css"><link rel="stylesheet" href="../../hl.css"></head>
<body><div class="story t-white hl">${inner}</div></body></html>\n`;
      const hf = path.join(htmlDir, `${String(s.n).padStart(2, '0')}.html`);
      fs.writeFileSync(hf, html);
      await page.goto(pathToFileURL(hf).href, { waitUntil: 'load' });
      await page.evaluate(async () => { await Promise.all(['400 20px Manrope', '500 20px Manrope', '600 20px Manrope'].map((f) => document.fonts.load(f, 'Жж'))); await document.fonts.ready;
        await Promise.all([...document.images].map((i) => (i.complete ? 0 : new Promise((r) => { i.onload = i.onerror = r; })))); });
      const issues = await page.evaluate(() => {
        const out = []; const R = (e) => e.getBoundingClientRect();
        const els = [...document.querySelectorAll('.t1,.k,.sub,.p,.specs,.row,.tile,.toc,.q,.cta,.wm')].filter((e) => !e.closest('.hdr'));
        for (const e of els) { const r = R(e); if (r.top < 250 || r.bottom > 1625) out.push(`safe-zone "${e.textContent.trim().slice(0, 30)}" ${Math.round(r.top)}–${Math.round(r.bottom)}`); if (r.right > 1000 || r.left < 80) out.push(`margin "${e.textContent.trim().slice(0, 30)}"`); }
        const blocks = [...document.querySelectorAll('.m:not(.row .m):not(.tile .m), .slot:not(.row .slot):not(.tile .slot)')];
        for (const e of [...document.querySelectorAll('.t1,.k,.p,.specs')]) for (const m of blocks) { const a = R(e), c = R(m); if (Math.min(a.bottom, c.bottom) - Math.max(a.top, c.top) > 2 && Math.min(a.right, c.right) - Math.max(a.left, c.left) > 2) out.push(`text over photo "${e.textContent.trim().slice(0, 30)}"`); }
        const rows = [...document.querySelectorAll('.row,.tile')]; rows.forEach((r) => { if (r.scrollHeight > r.clientHeight + 4 && r.classList.contains('row')) out.push('row overflow'); });
        return out;
      });
      const name = s.kind === 'cover' ? '00_cover' : String(s.n - 1).padStart(2, '0');
      await page.screenshot({ path: path.join(outDir, `${name}.png`), clip: { x: 0, y: 0, width: 1080, height: 1920 } });
      if (s.kind === 'cover') { const p = path.join(outDir, 'cover_icon_1080x1080.png'); await page.screenshot({ path: p, clip: { x: 170, y: 590, width: 740, height: 740 } }); execFileSync('python3', ['-c', `from PIL import Image; im = Image.open('${p}'); im.resize((1080, 1080), Image.LANCZOS).save('${p}')`]); }
      report.push({ brand: b, n: name, kind: s.kind, title: s.title || s.kind, issues });
    }
    report.filter((r) => r.brand === b).forEach((r) => r.issues.length && console.log(`  ⚠ ${b.key}/${r.n}: ${r.issues.join('; ')}`));
    console.log(`${b.folder}: ${seq.length} stories${missing.length ? `, ${missing.length} photo placeholders` : ''}`);
    b._missing = missing; b._count = seq.length;
  }

  if (!only) await previews(ctx, brands);
  writeIndex(brands, meta, report);
  await browser.close();
}

async function previews(ctx, brands) {
  const pv = path.join(OUT, '_preview'); fs.mkdirSync(pv, { recursive: true });
  const page = await ctx.newPage(); await page.setViewportSize({ width: 1760, height: 300 });
  const css = `body{margin:0;background:#F4F4F3;font-family:Manrope,sans-serif;color:#171717}
   @font-face{font-family:Manrope;font-weight:500;src:url(../../fonts/Manrope-Medium.ttf)}@font-face{font-family:Manrope;font-weight:600;src:url(../../fonts/Manrope-SemiBold.ttf)}
   .w{padding:56px}h1{font:600 40px Manrope;letter-spacing:.06em;margin:0 0 6px}.s{font-size:16px;letter-spacing:.2em;text-transform:uppercase;color:#8A8A88;margin-bottom:36px}
   .g{display:grid;grid-template-columns:repeat(8,1fr);gap:18px}img{width:100%;display:block;box-shadow:0 1px 3px rgba(0,0,0,.08),0 8px 22px rgba(0,0,0,.06)}
   figure{margin:0}figcaption{font-size:13px;color:#8A8A88;margin-top:6px}`;
  for (const b of brands) {
    const files = fs.readdirSync(path.join(OUT, b.folder)).filter((f) => /^\d\d(_cover)?\.png$/.test(f)).sort();
    const doc = `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body><div class="w"><h1>${esc(b.name)}</h1><div class="s">Актуальное Creatura · ${files.length} stories</div><div class="g">${files.map((f) => `<figure><img src="../${b.folder}/${f}"><figcaption>${f.replace('.png', '')}</figcaption></figure>`).join('')}</div></div></body></html>`;
    const f = path.join(pv, `${b.folder}.html`); fs.writeFileSync(f, doc);
    await page.goto(pathToFileURL(f).href, { waitUntil: 'load' }); await page.evaluate(async () => { await document.fonts.ready; });
    await page.screenshot({ path: path.join(pv, `${b.folder}.png`), fullPage: true });
  }
  // all covers side by side
  const covers = brands.map((b) => `<figure><img src="../${b.folder}/cover_icon_1080x1080.png" style="border-radius:50%"><figcaption>${esc(b.name)}</figcaption></figure>`).join('');
  const f = path.join(pv, 'covers.html');
  fs.writeFileSync(f, `<!doctype html><html><head><meta charset="utf-8"><style>${css}.g{grid-template-columns:repeat(9,1fr)}</style></head><body><div class="w"><h1>Обложки актуального</h1><div class="s">Instagram обрезает обложку по кругу</div><div class="g">${covers}</div></div></body></html>`);
  await page.goto(pathToFileURL(f).href, { waitUntil: 'load' }); await page.evaluate(async () => { await document.fonts.ready; });
  await page.screenshot({ path: path.join(pv, 'covers.png'), fullPage: true });
  await page.close();
}

function writeIndex(brands, meta, report) {
  const lines = [`# CREATURA — Актуальное (Highlights) по брендам`, '',
    'Каждая папка — один раздел «Актуального»: `00_cover.png` — первая сторис и обложка раздела (для обложки также `cover_icon_1080x1080.png`), далее сторис по порядку `01.png`, `02.png`… Загружайте их в Instagram по порядку, затем добавляйте в одноимённое «Актуальное».', '',
    'Фото — официальные изображения производителей (источник каждого — ниже). Тексты и характеристики — с официальных сайтов и каталогов, переведены без добавления данных.', ''];
  for (const b of brands) {
    lines.push(`## ${b.name} — \`HIGHLIGHTS/${b.folder}\` · ${b._count} сторис`, '', `Источник: ${b.source}`, '');
    report.filter((r) => r.brand === b).forEach((r) => lines.push(`- \`${r.n}.png\` — ${r.kind === 'cover' ? 'обложка' : r.kind === 'intro' ? 'о бренде и содержание' : r.kind === 'cta' ? 'запрос каталога' : r.title}${r.issues.length ? ` ⚠ ${r.issues.join('; ')}` : ''}`));
    if (b._missing.length) lines.push('', `Нет фото (заглушки): ${b._missing.join(', ')}`);
    lines.push('');
  }
  lines.push('## Источники фотографий', '', '| Файл | Источник |', '|---|---|');
  Object.entries(meta).sort().forEach(([id, m]) => lines.push(`| \`assets/highlights/${id}.jpg\` | ${m.src} |`));
  fs.writeFileSync(path.join(OUT, 'README.md'), lines.join('\n') + '\n');
}

main().catch((e) => { console.error(e); process.exit(1); });
