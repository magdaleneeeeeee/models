#!/usr/bin/env node
// HIGOLD promo — 3 stories (1080×1920). Photos: official HIGOLD imagery from en.higold.com (cropped, product untouched).
// Style follows HIGOLD's own campaigns: deep warm-black stage, champagne-gold accent, clean sans (Montserrat).
// node source/promo/build_higold.mjs → PROMO/2026-11_HIGOLD/story_0N.png
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const OUT = path.join(ROOT, 'PROMO', '2026-11_HIGOLD'); fs.mkdirSync(OUT, { recursive: true });
const IMG = (f) => pathToFileURL(path.join(ROOT, 'assets', 'promo', 'higold', f)).href;
const FONT = (w) => pathToFileURL(path.join(ROOT, 'fonts', 'brands', `Montserrat-${w}.ttf`)).href;
const NB = ' ';
const t = (s) => s.replace(/(^|\s)([А-Яа-яЁёA-Za-z]{1,2}|для)\s+/g, `$1$2${NB}`).replace(/\s+—/g, NB + '—');

const C = { bg: '#14110E', fg: '#FFFFFF', soft: 'rgba(255,255,255,.78)', gold: '#C9A96E', line: 'rgba(201,169,110,.45)' };
const CSS = `${[400, 500, 600, 700].map((w) => `@font-face{font-family:M;font-weight:${w};src:url(${FONT(w)})}`).join('')}
*{margin:0;padding:0;box-sizing:border-box}html,body{width:1080px;height:1920px;background:${C.bg}}
.s{position:relative;width:1080px;height:1920px;overflow:hidden;background:${C.bg};color:${C.fg};font-family:M,"Noto Color Emoji",sans-serif}
.abs{position:absolute;left:96px;right:96px}
.hdr{top:262px;display:flex;justify-content:space-between;font:600 24px/1 M;letter-spacing:.32em;z-index:5}
.hdr b{color:${C.gold};font-weight:600}
.k{font:600 26px/1.2 M;letter-spacing:.24em;text-transform:uppercase;color:${C.gold}}
.t{font:700 84px/1.05 M,"Noto Color Emoji";letter-spacing:-.005em;text-transform:uppercase}
.t2{font:700 74px/1.08 M,"Noto Color Emoji"}
.p{font:500 38px/1.38 M;color:${C.soft}}
.rule{height:2px;background:${C.gold};width:120px}
.badge{display:inline-block;border:2px solid ${C.gold};color:${C.fg};font:600 36px/1.3 M;padding:26px 32px}
.cta{display:flex;align-items:center;justify-content:center;background:${C.gold};color:#14110E;font:700 40px/1.2 M;padding:34px 30px;text-align:center}
.ph{position:absolute;background-size:cover;background-position:center}
.fade-b{position:absolute;left:0;right:0;height:420px;background:linear-gradient(180deg,${C.bg} 0%,rgba(20,17,14,0) 100%)}
.fade-t{position:absolute;left:0;right:0;height:420px;background:linear-gradient(0deg,${C.bg} 0%,rgba(20,17,14,0) 100%)}
.lbl{font:600 24px/1.25 M;letter-spacing:.14em;text-transform:uppercase;color:${C.gold};margin-top:14px}.lbl span{display:block;color:${C.soft};letter-spacing:.02em;text-transform:none;font-weight:500;font-size:26px;margin-top:4px}`;

const hdr = `<div class="abs hdr"><span>CREATURA</span><span><b>HIGOLD</b></span></div>`;
const STORIES = [
  // 1 — Анонс акции
  `<div class="ph" style="left:0;top:1130px;width:1080px;height:790px;background-image:url(${IMG('_src_shearer_5.0_vertical.jpg')});background-position:50% 30%"></div>
   <div class="fade-b" style="top:1130px;height:300px"></div>${hdr}
   <div class="abs" style="top:330px"><div class="k">Акция · HIGOLD</div>
     <div class="t" style="margin-top:28px">${t('🎉 Специальные скидки HIGOLD!')}</div>
     <p class="p" style="margin-top:34px">${t('Приобретайте премиальные мебельные механизмы и системы хранения HIGOLD на специальных условиях.')}</p></div>
   <div class="abs" style="top:900px"><div class="badge">${t('Скидки на отдельные позиции, имеющиеся в наличии!')}</div></div>`,
  // 2 — Продукция
  `${hdr}<div class="abs" style="top:330px"><div class="k">Продукция HIGOLD</div>
     <div class="t2" style="margin-top:24px">${t('Функциональность в каждой детали!')}</div>
     <p class="p" style="margin-top:26px;font-size:34px">${t('Кухонные механизмы, системы хранения и аксессуары HIGOLD — решения, которые делают мебель удобнее и практичнее.')}</p></div>
   <div class="ph" style="left:96px;top:820px;width:888px;height:330px;background-image:url(${IMG('shearer_drawer.jpg')})"></div>
   <div class="ph" style="left:96px;top:1166px;width:436px;height:300px;background-image:url(${IMG('signet_drawer.jpg')})"></div>
   <div class="ph" style="left:548px;top:1166px;width:436px;height:300px;background-image:url(${IMG('kingkong.jpg')});background-position:50% 55%"></div>
   <div class="abs" style="top:1484px"><p class="p" style="font-size:31px;color:${C.fg}">${t('Выбирайте качественные комплектующие для своих проектов по специальным ценам.')}</p></div>`,
  // 3 — Продажа
  `<div class="ph" style="left:0;top:0;width:1080px;height:980px;background-image:url(${IMG('signet_v.jpg')});background-position:50% 40%"></div>
   <div class="fade-t" style="top:560px"></div>
   <div style="position:absolute;left:0;top:0;width:1080px;height:420px;background:linear-gradient(180deg,rgba(20,17,14,.96) 0%,rgba(20,17,14,.92) 80%,rgba(20,17,14,0) 100%)"></div>${hdr}
   <div class="abs" style="top:900px"><div class="k">Наличие · специальные цены</div>
     <div class="t" style="margin-top:22px;font-size:76px">${t('🔥 Выгодные покупки в HIGOLD!')}</div>
     <p class="p" style="margin-top:26px;font-size:34px">${t('На отдельные товары из наличия действуют специальные скидки. Уточняйте ассортимент и актуальные цены у наших менеджеров.')}</p></div>
   <div class="abs" style="top:1420px"><div class="cta">${t('Напишите «КАТАЛОГ» в Direct — отправим подробную информацию!')}</div></div>`,
];

const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
for (let i = 0; i < STORIES.length; i++) {
  const f = path.join(OUT, `story_0${i + 1}.html`);
  fs.writeFileSync(f, `<!doctype html><html lang="ru"><head><meta charset="utf-8"><style>${CSS}</style></head><body><div class="s">${STORIES[i]}</div></body></html>`);
  await p.goto(pathToFileURL(f).href); await p.evaluate(async () => { await document.fonts.load('700 40px M', 'Жж'); await document.fonts.ready; });
  await new Promise((r) => setTimeout(r, 300));
  const over = await p.evaluate(() => [...document.querySelectorAll('.abs:not(.hdr)')].map((e) => { const r = e.getBoundingClientRect(); return r.bottom > 1625 || r.top < 250 ? Math.round(r.bottom) : 0; }).filter(Boolean));
  await p.screenshot({ path: path.join(OUT, `story_0${i + 1}.png`) });
  console.log('story', i + 1, over.length ? 'SAFE-ZONE ' + over : 'ok');
}
await b.close();
