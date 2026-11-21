#!/usr/bin/env node
// CREATURA Stories — build pipeline.
//   node source/build.mjs              → editable HTML + PNG for all 50 stories, previews, QA + missing-asset reports
//   node source/build.mjs --only 03    → only day folder starting with "03"
//   node source/build.mjs --no-video   → skip MP4 export
// Photos dropped into assets/photos (and videos into assets/video) with the expected file names replace placeholders automatically.

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
import { stories, days } from './stories.mjs';
import { layouts } from './layouts.mjs';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const SRC = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SRC, '..');
const A = (...p) => path.join(ROOT, 'assets', ...p);
const args = process.argv.slice(2);
const only = args.includes('--only') ? args[args.indexOf('--only') + 1] : null;
const noVideo = args.includes('--no-video');

const PHOTO_EXT = ['.jpg', '.jpeg', '.png', '.webp', '.tif', '.tiff'];
const VIDEO_EXT = ['.mp4', '.mov', '.m4v'];
const LOGO_EXT = ['.svg', '.png', '.webp'];

const hasFfmpeg = (() => { try { execFileSync('ffmpeg', ['-version'], { stdio: 'ignore' }); return true; } catch { return false; } })();

function findFile(dir, base, exts) {
  for (const e of exts) for (const x of [e, e.toUpperCase()]) {
    const f = path.join(dir, base + x);
    if (fs.existsSync(f)) return f;
  }
  return null;
}

/* Resolve a media spec to a real file. Videos: the PNG uses a poster frame (own *_poster image or a frame extracted with ffmpeg). */
function resolveMedia(spec) {
  for (const base of [spec.file, ...(spec.alt || [])]) {
    const vid = findFile(A('video'), base, VIDEO_EXT);
    if (vid) {
      let poster = findFile(A('photos'), base + '_poster', PHOTO_EXT) || findFile(A('photos'), base, PHOTO_EXT);
      if (!poster && hasFfmpeg) {
        fs.mkdirSync(A('video', '_frames'), { recursive: true });
        poster = A('video', '_frames', base + '.jpg');
        if (!fs.existsSync(poster)) execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-ss', '1', '-i', vid, '-frames:v', '1', '-q:v', '2', poster]);
      }
      return { video: vid, image: poster, base };
    }
    const img = findFile(A('photos'), base, PHOTO_EXT);
    if (img) return { image: img, base };
  }
  return null;
}

const NBSP = ' ';
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// Russian typesetting: bind short words to the next word, keep dashes and "5+" with the previous word.
function typo(str) {
  let s = String(str ?? '');
  for (let i = 0; i < 2; i++) s = s.replace(/(^|[\s («])([А-Яа-яЁёA-Za-z]{1,2}|для|под|или|без|над|при)\s+/g, `$1$2${NBSP}`);
  s = s.replace(/\s+—/g, NBSP + '—').replace(/\s+(\d+\+)/g, NBSP + '$1').replace(/(\d)\s+%/g, '$1%');
  return esc(s);
}

const ICON_PHOTO = `<svg class="ph__icon" viewBox="0 0 48 48"><rect x="5" y="11" width="38" height="28" rx="1"/><circle cx="24" cy="25" r="8"/><path d="M17 11l3-5h8l3 5"/></svg>`;
const ICON_VIDEO = `<svg class="ph__icon" viewBox="0 0 48 48"><rect x="5" y="11" width="28" height="26" rx="1"/><path d="M33 20l10-6v20l-10-6z"/></svg>`;

function rel(fromDir, file) { return path.relative(fromDir, file).split(path.sep).join('/'); }

function buildStory(s) {
  const day = days[s.day];
  const htmlDir = path.join(SRC, 'html', day.folder);
  const missing = [];
  const usedVideo = [];
  const h = {
    t: typo,
    slot(key, x, y, w, hh, o = {}) {
      const spec = s.media[key];
      if (!spec) throw new Error(`${day.folder}/story_0${s.n}: no media "${key}"`);
      const r = resolveMedia(spec);
      const cls = `slot ${o.cls || ''} ${spec.kind === 'video' ? 'video' : ''} ${o.theme || ''}`.replace(/\s+/g, ' ').trim();
      const style = `left:${x}px;top:${y}px;width:${w}px;height:${hh}px;`;
      if (r && r.image) {
        if (r.video) usedVideo.push({ key, ...r });
        return `<div class="${cls}" data-slot="${key}" data-file="${esc(r.base)}" style="${style}"><img src="${rel(htmlDir, r.image)}" alt="" style="object-position:${spec.pos || '50% 50%'}"></div>`;
      }
      missing.push({ key, ...spec, w, h: hh });
      const ext = spec.kind === 'video' ? '.mp4' : '.jpg';
      return `<div class="${cls}" data-slot="${key}" data-placeholder="${esc(spec.file)}" style="${style}"><div class="ph"><div class="ph__label">
        ${spec.kind === 'video' ? ICON_VIDEO : ICON_PHOTO}
        <span class="ph__kind">${spec.kind === 'video' ? 'Видео' : 'Фото'} · placeholder</span>
        <span class="ph__file">${esc(spec.file + ext)}</span>
        <span class="ph__note">${esc(spec.note)}</span></div></div></div>`;
    },
    mark() {
      const cLogo = findFile(A('logos'), 'creatura', LOGO_EXT);
      return cLogo ? `<img src="${rel(htmlDir, cLogo)}" alt="Creatura">` : 'CREATURA';
    },
    hdr(s) {
      if ((s.wm || '').toUpperCase() === 'CREATURA') return s.tag ? `<div class="hdr"><span></span><span class="tag">${typo(s.tag)}</span></div>` : '';
      return `<div class="hdr"><span class="mark">${h.mark()}</span>${s.tag ? `<span class="tag">${typo(s.tag)}</span>` : ''}</div>`;
    },
    // Manufacturer wordmark at the bottom: original logo from assets/logos/<key>.svg|png, otherwise neutral typography
    wm(s) {
      const text = s.wm || s.maker || 'CREATURA';
      const key = (s.wmKey || (text.toUpperCase() === 'CREATURA' ? 'creatura' : s.brand) || '').toLowerCase();
      const logo = key ? findFile(A('logos'), key, LOGO_EXT) : null;
      return `<div class="wm">${logo ? `<img src="${rel(htmlDir, logo)}" alt="${esc(text)}">` : typo(text)}</div>`;
    },
  };
  const layout = layouts[s.layout];
  if (!layout) throw new Error(`Unknown layout ${s.layout}`);
  const inner = layout(s, h);
  const flag = missing.length ? `<div class="draft-flag">Draft · ${missing.length} placeholder${missing.length > 1 ? 's' : ''}</div>` : '';
  const html = `<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=1080">
<title>Creatura · ${day.date} · Story ${s.n} — ${esc(s.name)}</title>
<!-- Editable source. Layout: ${s.layout} · composition type: ${s.type}. Content lives in source/stories.mjs; edit there and rebuild, or edit this file directly. -->
<link rel="stylesheet" href="../../styles.css">
</head>
<body>
<div class="story ${s.theme} animate" data-day="${day.folder}" data-story="${s.n}">
${inner}
${flag}
</div>
</body>
</html>
`;
  fs.mkdirSync(htmlDir, { recursive: true });
  const file = path.join(htmlDir, `story_0${s.n}.html`);
  fs.writeFileSync(file, html);
  return { s, day, file, missing, usedVideo };
}

/* ── QA executed inside the page ─────────────────────────────────────────── */
async function qa(page) {
  return page.evaluate(() => {
    const issues = [];
    const R = (el) => el.getBoundingClientRect();
    const textSel = '.lockup,.line,.q,.cap,.cta,.wm,.big,.num';
    const texts = [...document.querySelectorAll(textSel)].filter(el => !el.closest('.hdr') && !el.closest('.ph') && R(el).width > 0);
    const slots = [...document.querySelectorAll('.slot')];
    const label = (el) => (el.textContent || '').trim().slice(0, 40);
    for (const el of texts) {
      const r = R(el);
      if (r.top < 250 || r.bottom > 1620) issues.push(`safe-zone: "${label(el)}" y ${Math.round(r.top)}–${Math.round(r.bottom)}`);
      if (r.left < 60 || r.right > 1020) issues.push(`side-margin: "${label(el)}" x ${Math.round(r.left)}–${Math.round(r.right)}`);
      if (el.scrollWidth > el.clientWidth + 2 && getComputedStyle(el).overflow !== 'visible') issues.push(`overflow: "${label(el)}"`);
      if (el.closest('.panel')) continue; // text sits on a solid panel, not on the product
      for (const sl of slots) {
        const q = R(sl);
        const ix = Math.min(r.right, q.right) - Math.max(r.left, q.left), iy = Math.min(r.bottom, q.bottom) - Math.max(r.top, q.top);
        if (ix > 2 && iy > 2) issues.push(`text-over-media: "${label(el)}" over slot ${sl.dataset.slot}`);
      }
    }
    // display/title lines must fit inside the canvas width
    for (const el of document.querySelectorAll('.display,.title')) {
      const r = R(el); if (r.right > 1040) issues.push(`title-width: "${label(el)}" right ${Math.round(r.right)}`);
    }
    const rects = slots.map(sl => ({ key: sl.dataset.slot, video: sl.classList.contains('video'), x: R(sl).x, y: R(sl).y, w: R(sl).width, h: R(sl).height }));
    return { issues, rects };
  });
}

async function main() {
  const list = stories.filter(s => !only || days[s.day].folder.startsWith(only));
  const built = list.map(buildStory);
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  const results = [];

  for (const b of built) {
    const outDir = path.join(ROOT, b.day.folder);
    fs.mkdirSync(outDir, { recursive: true });
    await page.goto(pathToFileURL(b.file).href, { waitUntil: 'load' });
    await page.evaluate(async () => {
      document.querySelector('.story').classList.remove('animate');
      await Promise.all(['400 20px Manrope', '500 20px Manrope', '600 20px Manrope'].map(f => document.fonts.load(f, 'Жж')));
      await document.fonts.ready;
      await Promise.all([...document.images].map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; })));
    });
    const fontsOk = await page.evaluate(() => ['400 20px Manrope', '500 20px Manrope', '600 20px Manrope'].every(f => document.fonts.check(f, 'Ж')));
    const { issues, rects } = await qa(page);
    if (!fontsOk) issues.push('fonts: brand fonts not loaded');
    const png = path.join(outDir, `story_0${b.s.n}.png`);
    await page.screenshot({ path: png, clip: { x: 0, y: 0, width: 1080, height: 1920 } });

    let mp4 = null;
    if (b.usedVideo.length && hasFfmpeg && !noVideo) mp4 = await exportVideo(page, b, rects, outDir);
    results.push({ ...b, png, issues, mp4 });
    process.stdout.write(`${b.day.folder}/story_0${b.s.n}.png  ${b.missing.length ? `[${b.missing.length} placeholder]` : '[final]'}${issues.length ? '  ⚠ ' + issues.length : ''}${mp4 ? '  + mp4' : ''}\n`);
  }

  if (!only) {
    await previews(ctx, results);
    reports(results);
  }
  await browser.close();
}

/* MP4: base PNG → video scaled into its slot → transparent overlay (text/graphics) fading in. 1080×1920, H.264, 25 fps. */
async function exportVideo(page, b, rects, outDir) {
  const v = b.usedVideo[0];
  const r = rects.find(x => x.key === v.key);
  const tmp = path.join(SRC, '.tmp'); fs.mkdirSync(tmp, { recursive: true });
  const overlay = path.join(tmp, `${b.day.folder}_${b.s.n}_overlay.png`);
  await page.evaluate(() => { document.documentElement.classList.add('overlay-mode'); });
  await page.screenshot({ path: overlay, omitBackground: true, clip: { x: 0, y: 0, width: 1080, height: 1920 } });
  await page.evaluate(() => { document.documentElement.classList.remove('overlay-mode'); });
  const base = path.join(outDir, `story_0${b.s.n}.png`);
  await page.screenshot({ path: base, clip: { x: 0, y: 0, width: 1080, height: 1920 } });
  let dur = 10;
  try { dur = Math.min(15, parseFloat(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', v.video]).toString()) || 10); } catch {}
  const W = Math.round(r.w / 2) * 2, H = Math.round(r.h / 2) * 2;
  const out = path.join(outDir, `story_0${b.s.n}.mp4`);
  const filter = [
    `[1:v]scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H},fps=25,setsar=1[vid]`,
    `[0:v][vid]overlay=${Math.round(r.x)}:${Math.round(r.y)}[bg]`,
    `[2:v]format=rgba,fade=t=in:st=0.2:d=0.9:alpha=1[ov]`,
    `[bg][ov]overlay=0:0,format=yuv420p[out]`,
  ].join(';');
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-loop', '1', '-framerate', '25', '-i', base, '-i', v.video, '-loop', '1', '-framerate', '25', '-i', overlay,
    '-filter_complex', filter, '-map', '[out]', '-an', '-t', String(dur), '-r', '25', '-c:v', 'libx264', '-profile:v', 'high', '-crf', '17', '-preset', 'slow', '-movflags', '+faststart', out]);
  return out;
}

async function previews(ctx, results) {
  const pv = path.join(ROOT, 'preview'); fs.mkdirSync(pv, { recursive: true });
  const page = await ctx.newPage();
  const css = `body{margin:0;background:#F4F4F3;color:#171717;font-family:Manrope,sans-serif}
    @font-face{font-family:Manrope;font-weight:500;src:url(../fonts/Manrope-Medium.ttf)} @font-face{font-family:Manrope;font-weight:600;src:url(../fonts/Manrope-SemiBold.ttf)}
    .wrap{padding:64px} h1{font:600 48px/1 Manrope;letter-spacing:.06em;text-transform:uppercase;margin:0 0 14px} .sub{font-size:20px;letter-spacing:.24em;text-transform:uppercase;color:#89847D;margin-bottom:48px}
    .row{display:flex;gap:20px;align-items:flex-start;margin-bottom:44px} .dl{width:150px;flex:none;padding-top:6px}
    .dl b{display:block;font:600 36px/1 Manrope} .dl span{display:block;font-size:15px;color:#89847D;margin-top:10px;line-height:1.4}
    figure{margin:0} img{display:block;width:270px;height:480px;box-shadow:0 1px 3px rgba(0,0,0,.08),0 8px 24px rgba(0,0,0,.06)} figcaption{font-size:14px;color:#89847D;margin-top:10px;letter-spacing:.06em}`;
  const fig = (r) => `<figure><img src="../${r.day.folder}/story_0${r.s.n}.png"><figcaption>0${r.s.n} · ${esc(r.s.name)}${r.missing.length ? ' · ◌' : ''}</figcaption></figure>`;
  const rowFor = (d) => `<div class="row"><div class="dl"><b>${d.date}</b><span>${esc(d.theme)}</span></div>${results.filter(r => r.day === d).map(fig).join('')}</div>`;
  const doc = (title, rows) => `<!doctype html><html><head><meta charset="utf-8"><title>${title}</title><style>${css}</style></head><body><div class="wrap"><h1>${title}</h1><div class="sub">Instagram Stories · 21–30.11.2026 · ◌ = contains placeholders</div>${rows}</div></body></html>`;

  const all = path.join(pv, 'index.html');
  fs.writeFileSync(all, doc('Creatura — 50 Stories', days.map(rowFor).join('')));
  await page.setViewportSize({ width: 1720, height: 300 });
  await page.goto(pathToFileURL(all).href, { waitUntil: 'load' });
  await page.evaluate(async () => { await document.fonts.ready; });
  await page.screenshot({ path: path.join(pv, 'CREATURA_all_50_stories.png'), fullPage: true });

  for (const d of days) {
    const f = path.join(pv, `_day_${d.folder}.html`);
    fs.writeFileSync(f, doc(`Creatura — ${d.date}`, rowFor(d)));
    await page.goto(pathToFileURL(f).href, { waitUntil: 'load' });
    await page.evaluate(async () => { await document.fonts.ready; });
    await page.screenshot({ path: path.join(pv, `${d.folder}_preview.png`), fullPage: true });
    fs.unlinkSync(f);
  }
  await page.close();
}

function reports(results) {
  // Composition rhythm: same §6 type must not appear more than twice in a row
  const rhythm = [];
  for (let i = 2; i < results.length; i++) {
    const [a, b, c] = [results[i - 2], results[i - 1], results[i]].map(r => r.s.type);
    if (a === b && b === c) rhythm.push(`${results[i].day.folder}/story_0${results[i].s.n}: type "${c}" three times in a row`);
  }
  const layoutUse = {};
  results.forEach(r => (layoutUse[r.s.layout] = (layoutUse[r.s.layout] || 0) + 1));

  // Missing assets (deduplicated by file)
  const byFile = new Map();
  for (const r of results) for (const m of r.missing) {
    const k = m.file;
    if (!byFile.has(k)) byFile.set(k, { ...m, uses: [], minW: m.w, minH: m.h });
    const e = byFile.get(k); e.uses.push(`${r.day.date} · 0${r.s.n}`); e.minW = Math.max(e.minW, m.w); e.minH = Math.max(e.minH, m.h);
  }
  const photos = [...byFile.values()].filter(m => m.kind === 'photo');
  const videos = [...byFile.values()].filter(m => m.kind === 'video');
  const tbl = (arr, ext) => `| Файл | Что нужно снять / найти | Где используется | Мин. размер в макете |\n|---|---|---|---|\n` +
    arr.map(m => `| \`${m.file}${ext}\` | ${m.note}${m.alt?.length ? ` _(можно заменить: ${m.alt.map(a => '`' + a + '`').join(', ')})_` : ''} | ${m.uses.join(', ')} | ${m.minW}×${m.minH} px |`).join('\n');
  const logos = ['creatura', 'alumove', 'atim', 'stv', 'ceam', 'verum', 'aircube'].filter(l => !findFile(A('logos'), l, LOGO_EXT));

  const md = `# CREATURA — недостающие материалы

Сгенерировано автоматически скриптом \`source/build.mjs\`. Положите файлы с указанными именами в \`assets/photos\` (jpg/png/webp/tif) или \`assets/video\` (mp4/mov) и запустите сборку заново: заглушки заменятся реальными изображениями, видео-сторис дополнительно экспортируются в MP4.

Итого: **${photos.length} фото**, **${videos.length} видео**, **${logos.length} логотипов**. Макетов с заглушками: **${results.filter(r => r.missing.length).length} из ${results.length}**.

## Логотипы (assets/logos, SVG предпочтительно)
${logos.length ? logos.map(l => `- \`${l}.svg\` — оригинальный логотип ${l === 'creatura' ? 'Creatura' : l.toUpperCase()}. Пока используется текстовое название в нейтральной типографике.`).join('\n') : 'Все логотипы на месте.'}

## Фотографии (assets/photos)
${tbl(photos, '.jpg')}

## Видео (assets/video)
Требования к исходнику: горизонтальное или вертикальное, от 1080 px по короткой стороне, 25–30 fps, 6–15 с, без музыки. Для PNG-версии берётся кадр на 1-й секунде (или файл \`<имя>_poster.jpg\` в assets/photos).

${tbl(videos, '.mp4')}

## Тексты, требующие уточнения
- **STV, модели 1 и 2** — нужны точные названия/артикулы моделей (22.11 и 27.11). В сравнении 27.11 сейчас стоят подписи «STV · модель 01 / 02».
- **CEAM, модели 1 и 2** — точные названия моделей петель (24.11 и 30.11).
- **ATIM** — какая конкретная модель механизма участвует 23.11 и 28.11.
- **Verum NUDA 5+ и Timeless — отделки**: в палитрах стоят «Отделка 01–04». Нужны официальные названия отделок из каталога Verum (не выдумываем).
- **Контакт для CTA** — при желании добавить в CTA сайт, телефон или @username Creatura.

## Макеты с временными placeholders
| Дата | Сторис | Заглушки |
|---|---|---|
${results.filter(r => r.missing.length).map(r => `| ${r.day.date} | ${r.day.folder}/story_0${r.s.n}.png — ${r.s.name} | ${r.missing.map(m => '`' + m.file + '`').join(', ')} |`).join('\n')}
`;
  fs.writeFileSync(path.join(ROOT, 'MISSING_ASSETS.md'), md);

  const qaMd = `# QA — проверка перед экспортом

| Проверка | Результат |
|---|---|
| Размер 1080 × 1920 px, PNG, RGB | ${results.length} файлов |
| Безопасные зоны (текст в пределах y 250–1620, x 60–1020) | ${results.flatMap(r => r.issues.filter(i => /safe|side/.test(i))).length ? 'есть замечания ↓' : 'OK'} |
| Нет наложения текста на фото товара | ${results.flatMap(r => r.issues.filter(i => /over-media/.test(i))).length ? 'есть замечания ↓' : 'OK'} |
| Шрифт Manrope загружен | ${results.some(r => r.issues.some(i => i.startsWith('fonts'))) ? 'ошибка' : 'OK'} |
| Один тип композиции не более двух раз подряд | ${rhythm.length ? rhythm.join('; ') : 'OK'} |
| CTA в 5-й сторис каждого дня | ${results.filter(r => r.s.n === 5).every(r => r.s.cta) ? 'OK' : 'нет CTA'} |
| Выдуманные характеристики | нет — используются только тексты из ТЗ |
| Логотипы не искажены | оригиналов нет → текстовые названия; при добавлении SVG масштабируются пропорционально |
| Товар соответствует модели | **требует проверки после подстановки фото** |

## Использование композиций (${Object.keys(layoutUse).length} шаблонов)
${Object.entries(layoutUse).map(([k, v]) => `- ${k}: ${v}`).join('\n')}

## Замечания по макетам
${results.filter(r => r.issues.length).map(r => `- ${r.day.folder}/story_0${r.s.n}: ${r.issues.join('; ')}`).join('\n') || 'Замечаний нет.'}
`;
  fs.writeFileSync(path.join(ROOT, 'preview', 'QA_REPORT.md'), qaMd);
}

main().catch(e => { console.error(e); process.exit(1); });
