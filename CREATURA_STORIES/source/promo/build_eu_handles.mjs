#!/usr/bin/env node
// "Европейские дверные ручки для дизайнерских интерьеров" — 5 stories, Creatura (1080×1920).
// Photos: official imagery of Verum Italy, Formani, Salice Paolo + Creatura's own completed project (Salice Paolo handles).
// Palette: graphite / warm grey / beige / ivory. Type: Cormorant Garamond (headlines) + Manrope (text), large for phones.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const OUT = path.join(ROOT, 'PROMO', '2026-11_EU_HANDLES'); fs.mkdirSync(OUT, { recursive: true });
const U = (...p) => pathToFileURL(path.join(ROOT, ...p)).href;
const P = (f) => U('assets', 'promo', 'eu_handles', f);
const SP = (f) => U('assets', 'highlights', 'sel', 'salicepaolo', f);
const PROJ = (f) => U('assets', 'projects', '2026-11_salice-paolo_stv', 'media', f);
const NB = ' ';
const t = (s) => s.replace(/(^|\s)([А-Яа-яЁёA-Za-z]{1,2}|для|под)\s+/g, `$1$2${NB}`).replace(/\s+—/g, NB + '—');

const C = { bg: '#1E1C1A', ivory: '#F3EEE7', soft: 'rgba(243,238,231,.8)', beige: '#CBB89D', warm: '#8C847A' };
const CSS = `@font-face{font-family:CG;font-weight:600;src:url(${U('fonts', 'CormorantGaramond-SemiBold.ttf')})}
@font-face{font-family:CG;font-weight:500;src:url(${U('fonts', 'CormorantGaramond-Medium.ttf')})}
@font-face{font-family:CG;font-style:italic;font-weight:500;src:url(${U('fonts', 'CormorantGaramond-MediumItalic.ttf')})}
${[400, 500, 600].map((w) => `@font-face{font-family:MR;font-weight:${w};src:url(${U('fonts', `Manrope-${['Regular', 'Medium', 'SemiBold'][[400, 500, 600].indexOf(w)]}.ttf`)})}`).join('')}
*{margin:0;padding:0;box-sizing:border-box}html,body{width:1080px;height:1920px;background:${C.bg}}
.s{position:relative;width:1080px;height:1920px;overflow:hidden;background:${C.bg};color:${C.ivory};font-family:MR,sans-serif}
.abs{position:absolute;left:96px;right:96px}
.hdr{top:262px;display:flex;justify-content:space-between;font:600 24px/1 MR;letter-spacing:.36em;z-index:5}
.hdr span:last-child{color:${C.beige};letter-spacing:.2em}
.k{font:600 25px/1.2 MR;letter-spacing:.26em;text-transform:uppercase;color:${C.beige}}
.t{font:600 92px/1.02 CG;letter-spacing:-.005em}
.t i{font-style:italic;font-weight:500;color:${C.beige}}
.p{font:500 37px/1.4 MR;color:${C.soft}}
.rule{height:2px;width:110px;background:${C.beige}}
.ph{position:absolute;background-size:cover;background-position:center}
.cap{font:600 21px/1.2 MR;letter-spacing:.2em;text-transform:uppercase;color:${C.beige};margin-top:14px}
.cta{display:flex;align-items:center;justify-content:space-between;background:${C.beige};color:#1E1C1A;font:600 40px/1.2 MR;padding:34px 40px}
.cta svg{width:44px;height:44px}
.wm{font:600 60px/1 MR;letter-spacing:.42em}`;
const hdr = (n) => `<div class="abs hdr"><span>CREATURA</span><span>${n} / 5</span></div>`;
const shade = (top, h, dir = 180, a = .92) => `<div style="position:absolute;left:0;right:0;top:${top}px;height:${h}px;background:linear-gradient(${dir}deg,rgba(30,28,26,${a}) 0%,rgba(30,28,26,${a * .75}) 45%,rgba(30,28,26,0) 100%)"></div>`;

const S = [
  // 1 — Зацепка: интерьер, ручка — главный акцент
  `<div class="ph" style="inset:0;background-image:url(${P('verum_bedroom.jpg')});background-size:auto 2700px;background-position:62% 46%"></div>
   ${shade(0, 1000)}${hdr(1)}
   <div class="abs" style="top:340px"><div class="k">Для дизайнеров и архитекторов</div><div class="rule" style="margin:30px 0"></div>
     <div class="t" style="font-size:88px">${t('Ищете фурнитуру, которая подчеркнёт уровень ваших проектов?')}</div></div>
   <div class="abs" style="top:1560px"><div class="cap" style="color:${C.ivory};opacity:.8">Verum Italy · NUDA</div></div>`,
  // 2 — Эстетика: несколько моделей, формы и покрытия
  `${hdr(2)}<div class="abs" style="top:340px"><div class="k">Эстетика</div>
     <p class="t" style="font-size:66px;line-height:1.1;margin-top:26px">${t('Европейские дверные ручки с выразительным дизайном, премиальными покрытиями и безупречным исполнением.')}</p></div>
   ${[['formani_eclipse_10102.jpg', 'ECLIPSE'], ['formani_nour_10200.jpg', 'NOUR'], ['gl101_pvd_satin_gold.jpg', 'RIVIO'], ['formani_one_10034.jpg', 'ONE']].map(([f, n], i) =>
     `<div style="position:absolute;left:${96 + (i % 2) * 452}px;top:${870 + Math.floor(i / 2) * 380}px;width:436px">
       <div class="ph" style="position:relative;width:436px;height:300px;background-image:url(${P(f)});background-size:150%"></div><div class="cap">FORMANI · ${n}</div></div>`).join('')}`,
  // 3 — Детали: макро, Италия
  `${hdr(3)}<div class="abs" style="top:340px"><div class="k">Детали</div>
     <div class="t" style="font-size:80px;margin-top:26px">${t('Итальянская эстетика.')}<br><i>${t('Нестандартные формы.')}</i><br>${t('Благородные оттенки.')}</div></div>
   <div class="ph" style="left:96px;top:800px;width:560px;height:560px;background-image:url(${SP('handles-113-kone-jewel.jpg')});background-size:210%;background-position:52% 14%"></div>
   <div class="ph" style="left:672px;top:800px;width:312px;height:272px;background-image:url(${SP('knobs-115-arum.jpg')});background-size:170%;background-position:62% 50%"></div>
   <div class="ph" style="left:672px;top:1088px;width:312px;height:272px;background-image:url(${P('verum_nuda_macro.jpg')});background-size:180%;background-position:30% 40%"></div>
   <div class="abs" style="top:1384px"><div class="cap" style="margin:0 0 22px">Salice Paolo · Krone Jewel, Arum &nbsp;·&nbsp; Verum · Nuda</div>
     <p class="p" style="font-size:36px;color:${C.ivory}">${t('Детали, которые формируют характер интерьера.')}</p></div>`,
  // 4 — Для профессионалов: коллаж интерьеров
  `${hdr(4)}<div class="abs" style="top:340px"><div class="k">Для профессионалов</div>
     <div class="t" style="font-size:80px;margin-top:26px">${t('Подбираете фурнитуру для нового проекта?')}</div></div>
   ${['verum_living.jpg', 'verum_kitchen.jpg', 'verum_bath.jpg'].map((f, i) => `<div class="ph" style="left:${96 + i * 302}px;top:760px;width:284px;height:600px;background-image:url(${P(f)})"></div>`).join('')}
   <div class="abs" style="top:1386px"><p class="p" style="font-size:36px;color:${C.ivory}">${t('В Creatura вы найдёте решения для интерьеров, в которых важна каждая деталь.')}</p></div>`,
  // 5 — CTA: проект Creatura, ручки Salice Paolo
  `<div class="ph" style="left:0;top:0;width:1080px;height:980px;background-image:url(${PROJ('IMG_2604.jpg')});background-position:50% 55%"></div>
   ${shade(0, 420)}${shade(560, 420, 0, 1)}${hdr(5)}
   <div class="abs" style="top:860px"><div class="t" style="font-size:72px">${t('Создавайте интерьеры с характером вместе с Creatura.')}</div>
     <p class="p" style="font-size:32px;margin-top:22px">${t('Приглашаем дизайнеров, архитекторов и мебельные компании познакомиться с нашими коллекциями.')}</p></div>
   <div class="abs" style="top:1290px"><div class="cta"><span>${t('Напишите нам в Direct — каталог и консультация')}</span><svg viewBox="0 0 24 24"><path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="#1E1C1A" stroke-width="1.8"/></svg></div>
     <div style="margin-top:32px"><div class="wm" style="font-size:44px">CREATURA</div>
       <p class="p" style="font-family:CG;font-style:italic;font-size:40px;color:${C.beige};margin-top:14px">${t('детали, которые формируют характер интерьера')}</p></div></div>`,
];

const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
for (let i = 0; i < S.length; i++) {
  const f = path.join(OUT, `_story_0${i + 1}.html`);
  fs.writeFileSync(f, `<!doctype html><html lang="ru"><head><meta charset="utf-8"><style>${CSS}</style></head><body><div class="s">${S[i]}</div></body></html>`);
  await p.goto(pathToFileURL(f).href); await p.evaluate(async () => { await Promise.all(['600 40px CG', '500 20px MR', '600 20px MR'].map((x) => document.fonts.load(x, 'Жж'))); await document.fonts.ready; });
  await new Promise((r) => setTimeout(r, 300));
  const bad = await p.evaluate(() => [...document.querySelectorAll('.abs:not(.hdr)')].filter((e) => { const r = e.getBoundingClientRect(); return r.bottom > 1625 || r.right > 1000; }).map((e) => e.textContent.trim().slice(0, 30)));
  await p.screenshot({ path: path.join(OUT, `story_0${i + 1}.png`) }); fs.unlinkSync(f);
  console.log('story', i + 1, bad.length ? 'CHECK: ' + bad.join(' | ') : 'ok');
}
await b.close();
