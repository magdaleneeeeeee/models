#!/usr/bin/env node
// Project stories: completed interior with Salice Paolo handles and STV locks.
// node source/projects/build_project.mjs   → PROJECTS/2026-11_SALICE_PAOLO_STV/{story_01..05.mp4, full_edit.mp4, frames/*.png}
// Video 1080×1920, H.264 High, 30 fps, AAC 48 kHz. Text layers are rendered in the brand typography (Manrope) and faded in.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..');
const SRC = path.join(ROOT, 'assets', 'projects', '2026-11_salice-paolo_stv');
const OUT = path.join(ROOT, 'PROJECTS', '2026-11_SALICE_PAOLO_STV');
const TMP = path.join(HERE, '.tmp'); fs.mkdirSync(TMP, { recursive: true }); fs.mkdirSync(path.join(OUT, 'frames'), { recursive: true });
const M = (f) => path.join(SRC, 'media', f); const A = (f) => path.join(SRC, 'audio', f);
const ff = (args) => execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: ['ignore', 'inherit', 'inherit'] });

// ── Storyboard ──────────────────────────────────────────────────────────────
export const STORIES = [
  { id: 1, dur: 6.0, src: { video: 'IMG_2602.mov', ss: 0, to: 4.87, slow: 1.25 },
    kicker: 'Реализованный проект', title: 'Каждая деталь имеет значение', line: 'Показываем результат нашей работы.',
    sfx: [['whoosh', 0, 0.30], ['tick', 0.55, 0.22]], orig: 0.5 },
  { id: 2, dur: 6.0, src: { photo: 'IMG_2604.jpg', z: [1.0, 1.09], focus: [0.5, 0.56], cx: 0.5 },
    kicker: 'Дверные ручки', title: 'SALICE PAOLO', line: 'Итальянский бренд. Элегантный дизайн, выразительная форма и внимание к деталям.',
    sfx: [['whoosh', 0, 0.28], ['tick', 0.55, 0.22]] },
  { id: 3, dur: 6.0, src: { photo: 'IMG_2599.jpg', z: [1.0, 1.10], focus: [0.62, 0.52], cx: 0.04 },
    kicker: 'Замки', title: 'STV', line: 'За эстетикой — надёжность и функциональность в повседневном использовании.', cap: 'Made in Italy',
    sfx: [['whoosh', 0, 0.28], ['tick', 0.55, 0.22]] },
  { id: 4, dur: 6.7, src: { video: 'IMG_2600.mov', ss: 3.9, to: 9.3, slow: 1.25 },
    kicker: 'Детали', title: 'Из деталей складывается пространство', line: 'Salice Paolo и STV в одном проекте.',
    sfx: [['whoosh', 0, 0.28], ['tick', 0.55, 0.2]], orig: 0.45 },
  { id: 5, dur: 7.0, src: { photo: 'IMG_2605.jpg', z: [1.08, 1.0], focus: [0.5, 0.45], cx: 0.5 },
    kicker: 'Ваш проект', title: 'Планируете ремонт или новый объект?', line: 'Подберём фурнитуру под ваш проект.', cta: 'Напишите нам в Direct',
    sfx: [['whoosh', 0, 0.28], ['tick', 0.55, 0.2], ['tick', 1.45, 0.18]] },
];

const NB = ' ';
const typo = (s) => String(s).replace(/(^|\s)([А-Яа-яЁёA-Za-z]{1,2}|для|под|или)\s+/g, `$1$2${NB}`).replace(/\s+—/g, NB + '—').replace(/&/g, '&amp;').replace(/</g, '&lt;');
const ARROW = `<svg viewBox="0 0 24 24" width="28" height="28" style="margin-left:16px;flex:none"><path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="#171717" stroke-width="1.8"/></svg>`;

function layerHTML(s, which) {
  const css = `@font-face{font-family:Manrope;font-weight:400;src:url(${pathToFileURL(path.join(ROOT, 'fonts/Manrope-Regular.ttf')).href})}
    @font-face{font-family:Manrope;font-weight:500;src:url(${pathToFileURL(path.join(ROOT, 'fonts/Manrope-Medium.ttf')).href})}
    @font-face{font-family:Manrope;font-weight:600;src:url(${pathToFileURL(path.join(ROOT, 'fonts/Manrope-SemiBold.ttf')).href})}
    html,body{margin:0;width:1080px;height:1920px;background:transparent}*{box-sizing:border-box}
    .c{position:absolute;left:96px;right:96px;color:#171717;font-family:Manrope,sans-serif}
    .k{font:500 19px/1.3 Manrope;letter-spacing:.3em;text-transform:uppercase;color:rgba(23,23,23,.62)}
    .t{font:600 62px/1.08 Manrope;letter-spacing:.005em;margin-top:22px;max-width:820px}
    .t.br{letter-spacing:.06em}
    .l{font:400 31px/1.42 Manrope;max-width:760px}
    .cap{font:600 17px/1 Manrope;letter-spacing:.3em;text-transform:uppercase;color:rgba(23,23,23,.62);margin-top:22px}
    .cta{display:inline-flex;align-items:center;font:600 30px/1.3 Manrope;padding-bottom:10px;border-bottom:2px solid #171717;margin-top:34px}
    .mark{position:absolute;left:96px;top:262px;font:600 20px/1 Manrope;letter-spacing:.38em;color:#171717}
    .veil{position:absolute;left:0;top:0;width:1080px;height:1100px;background:linear-gradient(180deg,rgba(250,248,245,.72) 0%,rgba(250,248,245,.5) 45%,rgba(250,248,245,0) 100%)}`;
  let body = '';
  if (which === 'base') body = `<div class="veil"></div><div class="mark">CREATURA</div>`;
  if (which === 'a') body = `<div class="c" style="top:340px"><div class="k">${typo(s.kicker)}</div><div class="t ${/^[A-Z ]+$/.test(s.title) ? 'br' : ''}">${typo(s.title)}</div></div>`;
  if (which === 'b') body = `<div class="c" style="top:${s._lineTop}px"><div class="l">${typo(s.line)}</div>${s.cap ? `<div class="cap">${typo(s.cap)}</div>` : ''}${s.cta ? `<div><span class="cta">${typo(s.cta)}${ARROW}</span></div>` : ''}</div>`;
  return `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body>${body}</body></html>`;
}

async function renderLayers() {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  for (const s of STORIES) {
    // measure title height to place the second layer
    const load = async (w) => { const f = path.join(TMP, `s${s.id}_${w}.html`); fs.writeFileSync(f, layerHTML(s, w)); await p.goto(pathToFileURL(f).href);
      await p.evaluate(async () => { await Promise.all(['400 20px Manrope', '500 20px Manrope', '600 20px Manrope'].map((x) => document.fonts.load(x, 'Жж'))); await document.fonts.ready; });
      if (!(await p.evaluate(() => document.fonts.check('600 20px Manrope', 'Ж')))) throw new Error('Manrope not loaded'); };
    await load('a');
    s._lineTop = Math.round(await p.evaluate(() => document.querySelector('.c').getBoundingClientRect().bottom)) + 28;
    for (const w of ['base', 'a', 'b']) {
      await load(w);
      await p.screenshot({ path: path.join(TMP, `s${s.id}_${w}.png`), omitBackground: true });
    }
  }
  await b.close();
}

// ── Video per story (silent) ─────────────────────────────────────────────────
function picture(s) {
  const out = path.join(TMP, `s${s.id}_pic.mp4`); const fr = Math.round(s.dur * 30);
  const grade = 'eq=contrast=1.04:saturation=0.94:gamma=1.02';
  if (s.src.video) {
    const { ss, to, slow } = s.src;
    ff(['-ss', String(ss), '-to', String(to), '-i', M(s.src.video), '-an',
      '-vf', `scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,setpts=${slow}*PTS,minterpolate=fps=30:mi_mode=blend,${grade},trim=duration=${s.dur},format=yuv420p`,
      '-r', '30', '-c:v', 'libx264', '-crf', '14', '-preset', 'medium', out]);
  } else {
    const { z: [z0, z1], focus: [fx, fy], cx } = s.src;
    const zexp = `${z0}+(${z1}-${z0})*(1-cos(PI*on/${fr}))/2`; // eased zoom
    ff(['-i', M(s.src.photo),
      '-vf', `scale=-2:3840,crop=2160:3840:'${cx}*(iw-2160)':0,zoompan=z='${zexp}':x='${fx}*(iw-iw/zoom)':y='${fy}*(ih-ih/zoom)':d=${fr}:s=1080x1920:fps=30,${grade},format=yuv420p`,
      '-frames:v', String(fr), '-c:v', 'libx264', '-crf', '14', '-preset', 'medium', out]);
  }
  return out;
}

function compose(s, pic, withIntroFade) {
  const out = path.join(TMP, `s${s.id}_v.mp4`); const L = (w) => path.join(TMP, `s${s.id}_${w}.png`);
  const rise = (st) => `y='16*(1-min(1,max(0,(t-${st})/0.9)))'`;
  const f = [
    `[1:v]format=rgba,fade=t=in:st=0.15:d=0.6:alpha=1[base]`,
    `[2:v]format=rgba,fade=t=in:st=0.45:d=0.9:alpha=1[a]`,
    `[3:v]format=rgba,fade=t=in:st=1.05:d=0.9:alpha=1[b]`,
    `[0:v][base]overlay=0:0[v1]`, `[v1][a]overlay=0:${rise(0.45)}[v2]`, `[v2][b]overlay=0:${rise(1.05)}[v3]`,
    `[v3]${withIntroFade ? 'fade=t=in:st=0:d=0.45:color=white,' : ''}format=yuv420p[v]`,
  ].join(';');
  ff(['-i', pic, ...['base', 'a', 'b'].flatMap((w) => ['-loop', '1', '-t', String(s.dur), '-i', L(w)]),
    '-filter_complex', f, '-map', '[v]', '-t', String(s.dur), '-r', '30', '-c:v', 'libx264', '-crf', '16', '-preset', 'medium', out]);
  return out;
}

// ── Audio ───────────────────────────────────────────────────────────────────
// music offset per story keeps the track continuous when the stories play one after another
function storyAudio(s, offset) {
  const out = path.join(TMP, `s${s.id}_a.wav`);
  const inputs = ['-ss', String(offset), '-t', String(s.dur), '-i', A('music_ambient.wav')];
  const parts = [`[0:a]highpass=f=100,lowpass=f=9000,volume=0.55,afade=t=in:d=0.35,afade=t=out:st=${s.dur - 0.6}:d=0.6[m]`];
  const mix = ['[m]']; let k = 1;
  for (const [n, at, vol] of s.sfx) {
    inputs.push('-i', A(`sfx_${n}.wav`)); parts.push(`[${k}:a]volume=${vol},adelay=${Math.round(at * 1000)}|${Math.round(at * 1000)}[x${k}]`); mix.push(`[x${k}]`); k++;
  }
  if (s.orig && s.src.video) {
    inputs.push('-ss', String(s.src.ss), '-to', String(s.src.to), '-i', M(s.src.video));
    parts.push(`[${k}:a]atempo=${(1 / s.src.slow).toFixed(4)},highpass=f=120,volume=${s.orig},apad[o]`); mix.push('[o]'); k++;
  }
  parts.push(`${mix.join('')}amix=inputs=${mix.length}:normalize=0:duration=first,atrim=duration=${s.dur},aformat=sample_rates=48000:channel_layouts=stereo[out]`);
  ff([...inputs, '-filter_complex', parts.join(';'), '-map', '[out]', out]);
  return out;
}

async function main() {
  await renderLayers();
  let offset = 0; const finals = [];
  for (const s of STORIES) {
    const pic = picture(s); const v = compose(s, pic, true); const a = storyAudio(s, offset);
    const out = path.join(OUT, `story_0${s.id}.mp4`);
    ff(['-i', v, '-i', a, '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', '-shortest', out]);
    ff(['-ss', '2.6', '-i', out, '-frames:v', '1', path.join(OUT, 'frames', `story_0${s.id}.png`)]);
    s._v = compose(s, pic, s.id === 1); s._a = a; offset += s.dur; finals.push(out);
    console.log('story', s.id, s.dur + 's');
  }
  // full edit: dissolves between stories, continuous music, whoosh at every transition
  const X = 0.6; let chain = '[0:v]'; const vf = []; let t = STORIES[0].dur;
  STORIES.slice(1).forEach((s, i) => { vf.push(`${chain}[${i + 1}:v]xfade=transition=fade:duration=${X}:offset=${(t - X).toFixed(2)}[x${i}]`); chain = `[x${i}]`; t += s.dur - X; });
  const total = t;
  const vOnly = path.join(TMP, 'full_v.mp4');
  ff([...STORIES.flatMap((s) => ['-i', s._v]), '-filter_complex', vf.join(';'), '-map', chain, '-r', '30', '-c:v', 'libx264', '-crf', '16', '-preset', 'medium', vOnly]);
  const ins = ['-t', String(total), '-i', A('music_ambient.wav')]; const fa = [`[0:a]highpass=f=100,lowpass=f=9000,volume=0.55,afade=t=in:d=0.5,afade=t=out:st=${(total - 1.5).toFixed(2)}:d=1.5[m]`]; const mx = ['[m]'];
  let at = 0, k = 1;
  STORIES.forEach((s, i) => {
    const start = i === 0 ? 0 : at - X;
    ins.push('-i', A('sfx_whoosh.wav')); fa.push(`[${k}:a]volume=0.26,adelay=${Math.round(Math.max(0, start - 0.15) * 1000)}|${Math.round(Math.max(0, start - 0.15) * 1000)}[w${k}]`); mx.push(`[w${k}]`); k++;
    if (s.orig && s.src.video) { ins.push('-ss', String(s.src.ss), '-to', String(s.src.to), '-i', M(s.src.video)); fa.push(`[${k}:a]atempo=${(1 / s.src.slow).toFixed(4)},highpass=f=120,volume=${s.orig},adelay=${Math.round(start * 1000)}|${Math.round(start * 1000)}[o${k}]`); mx.push(`[o${k}]`); k++; }
    at = (i === 0 ? s.dur : at - X + s.dur);
  });
  fa.push(`${mx.join('')}amix=inputs=${mx.length}:normalize=0:duration=first[out]`);
  const aFull = path.join(TMP, 'full_a.wav'); ff([...ins, '-filter_complex', fa.join(';'), '-map', '[out]', aFull]);
  ff(['-i', vOnly, '-i', aFull, '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', '-shortest', path.join(OUT, 'full_edit.mp4')]);
  console.log('full edit', total.toFixed(1) + 's');
}

main().catch((e) => { console.error(e); process.exit(1); });
