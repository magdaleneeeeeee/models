#!/usr/bin/env node
// HIGOLD BV — highlight series for Creatura (1080×1920): BV SERIES (Moran Green), BV PREMIUM GREY, BV PRO.
// Photos: official HIGOLD product images from higoldhardware.com (img.waimaoniu.net), trimmed only — product untouched.
// Copy: client brief (names, articles, descriptions verbatim); functional accents translated from the official product pages.
//   node source/promo/build_higold_bv.mjs  → PROMO/HIGOLD_BV/<series>/00_cover.png, 01.png … + cover_icon_1080x1080.png
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const OUT = path.join(ROOT, 'PROMO', 'HIGOLD_BV');
const A = path.join(ROOT, 'assets', 'promo', 'higold_bv');
const META = JSON.parse(fs.readFileSync(path.join(A, 'meta.json')));
const IMG = (c) => pathToFileURL(path.join(A, c + '.jpg')).href;
const FONT = (w) => pathToFileURL(path.join(ROOT, 'fonts', 'brands', `Montserrat-${w}.ttf`)).href;
const NB = '\u00A0';
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const t = (s) => { let x = esc(s); for (let i = 0; i < 2; i++) x = x.replace(/(^|[\s(«])([А-Яа-яЁёA-Za-z]{1,2}|для|под|без)\s+/g, `$1$2${NB}`);
  return x.replace(/\s+—/g, NB + '—').replace(/(\d)\s+(мм|м)\b/g, `$1${NB}$2`); };

// ——— content ———
const G = { acc: 'Организация аксессуаров', clo: 'Системы хранения одежды', tr: 'Брючницы и аксессуары', sh: 'Обувные системы', add: 'Дополнительные решения' };
const A_LIGHT = 'Встроенная подсветка с вибродатчиком';
const A_LEATHER_BASKET = 'Корзина обтянута кожей вручную · усиленное дно';
const A_GLIDE = 'Кожаная отделка · тихий плавный ход направляющих';
const D = {
  '706041': 'Органайзер для аккуратного хранения аксессуаров.',
  '706001': 'Многофункциональная система хранения для гардеробных принадлежностей.',
  '706011': 'Кожаный органайзер для хранения ювелирных украшений.',
  '706051': 'Глубокая выдвижная корзина с кожаной отделкой.',
  '706031': 'Неглубокая выдвижная корзина для организации вещей.',
  '703501': 'Поворотная вешалка для удобного доступа к одежде.',
  '703533': 'Угловая корзина для хранения одежды.',
  '703502': 'Верхняя брючница для организации хранения брюк.',
  '706021': 'Выдвижная система хранения брюк.',
  '703541': 'Специальный держатель для галстуков.',
  '703591': 'Поворотная система хранения обуви.',
  '706161': 'Поворотное зеркало высотой 1,7 метра.',
  '703573': 'Боковая система хранения.',
  '703660': 'Держатели для гардеробной штанги.',
  '703640': 'Держатели для гардеробной штанги.',
  '703156': 'Подъёмный механизм для одежды.',
  '703297': 'Сейф с сенсорной панелью управления.',
  '706173': 'Овальная гардеробная штанга с подсветкой.',
  '703202': 'Многофункциональная угловая система хранения.',
};
const P = (art, name, g, accent, o = {}) => ({ art, name, g, accent, desc: o.desc ?? D[art.replace(/S$/, '')], img: o.img ?? art, int: o.int, note: o.note });

const SERIES = [
  {
    key: 'BV_SERIES', folder: '01_BV_SERIES', title: 'BV SERIES', sub: 'Moran Green', highlight: 'BV SERIES',
    C: { bg: '#17221E', bg2: '#1F2C27', fg: '#F2EEE7', soft: 'rgba(242,238,231,.78)', acc: '#C9B79C', card: '#F4F1EC' },
    cover: { img: '706051_int', pos: '50% 60%' },
    tagline: 'Премиальные решения для организации гардеробного пространства.',
    intro: { title: 'Эстетика в каждой детали.', p: 'Гардеробные аксессуары HIGOLD BV объединяют продуманную организацию хранения, кожаную отделку и внимание к деталям.', img: '706001_int' },
    items: [
      P('706041', 'Accessories Storage Box', G.acc, A_LIGHT),
      P('706001', 'Multi-functional Storage Box', G.acc, A_LIGHT, { int: '706001_int' }),
      P('706011', 'Leather Jewelry Box', G.acc, 'Подсветка с вибродатчиком · противоскользящая вставка'),
      P('706051', 'Deep Leather Basket', G.clo, A_LEATHER_BASKET, { int: '706051_int' }),
      P('706031', 'Shallow Leather Basket', G.clo, A_LEATHER_BASKET),
      P('703501', 'Rotating Clothes Hanger', G.clo, 'Свободное вращение на 360°'),
      P('703533', 'Corner Clothes Basket', G.clo, 'Поворот на 360° · три уровня хранения в углу', { note: 'Фото в исполнении Premium Grey — на сайте HIGOLD артикул представлен только в нём' }),
      P('703502', 'Top Mounted Pants Rack', G.tr, A_GLIDE),
      P('706021', 'Trousers Rack', G.tr, A_GLIDE, { int: '706021_int' }),
      P('703541', 'Tie Rack', G.tr, 'Кожаная отделка · аккуратное и наглядное хранение'),
      P('703591', 'Rotating Shoe Rack', G.sh, 'Поворот на 360° · кожа цвета Moran Green', { int: '703591_int' }),
      P('706161', 'Revolve Mirror 1.7 m', G.add, 'Поворачивается и выдвигается · трёхсекционные направляющие'),
      P('703573', 'Side Mount', G.add, 'Для кошельков, сумок и шёлковых платков'),
      P('703660', 'Hanging Rod Holders', G.add, 'Верхний и боковой монтаж'),
      P('703640', 'Hanging Rod Holders', G.add, 'Верхний монтаж'),
      P('703156', 'Clothing Lifting Rack 900 mm', G.add, 'Использует верхнюю зону гардероба для часто используемой одежды'),
      P('703297', 'Touch Panel Safe Box', G.add, 'Встраивается в ящик · сенсорная клавиатура и аварийный ключ', { int: '703297_int' }),
      P('706173', 'Oval Clothes Rail with Light 600 mm', G.add, 'Алюминиевый профиль в цвете Moran Green', { img: false, int: '706173' }),
      P('703202', 'Multi-functional Corner 800 mm', G.add, 'Трёхсекционные направляющие · плавный выдвижной ход'),
    ],
    toc: [[G.acc, '706041 · 706001 · 706011'], [G.clo, '706051 · 706031 · 703501 · 703533'], [G.tr, '703502 · 706021 · 703541'], [G.sh, '703591'], [G.add, '706161 · 703573 · 703660 · 703640 · 703156 · 703297 · 706173 · 703202']],
  },
  {
    key: 'BV_PREMIUM_GREY', folder: '02_BV_PREMIUM_GREY', title: 'BV PREMIUM GREY', sub: 'Premium Grey', highlight: 'BV PREMIUM GREY',
    C: { bg: '#262728', bg2: '#303132', fg: '#F1EFEC', soft: 'rgba(241,239,236,.78)', acc: '#C4B39B', card: '#F4F3F1' },
    cover: { cut: '703533' },
    tagline: 'Премиальные решения для организации гардеробного пространства.',
    intro: { title: 'Эстетика в каждой детали.', p: 'Гардеробные аксессуары HIGOLD BV в исполнении Premium Grey: продуманная организация хранения, кожаная отделка и внимание к деталям.', cut: '706041S' },
    items: [
      P('706041S', 'Accessories Storage Box 600 mm', G.acc, A_LIGHT),
      P('706001S', 'Multi-functional Storage Box 600 mm', G.acc, A_LIGHT),
      P('706011S', 'Leather Jewelry Box 600 mm', G.acc, 'Подсветка с вибродатчиком · противоскользящая вставка'),
      P('706051S', 'Deep Leather Basket 600 mm', G.clo, A_LEATHER_BASKET),
      P('706031S', 'Shallow Leather Basket 600 mm', G.clo, A_LEATHER_BASKET),
      P('703533', 'Corner Clothes Basket', G.clo, 'Поворот на 360° · три уровня хранения в углу'),
      P('703502S', 'Top Mounted Trousers Rack 400 mm', G.tr, 'Нанонапыление покрытия · кожаная отделка'),
      P('706021S', 'Trousers Rack 600 mm', G.tr, A_GLIDE),
      P('703541S', 'Tie Rack', G.tr, 'Для галстуков и ремней · шариковые направляющие'),
      P('706161S', 'Revolve Mirror 1.7 m', G.add, 'Поворачивается и выдвигается · трёхсекционные направляющие'),
      P('703573S', 'Side Mount Basket 400 mm', G.add, 'Фторуглеродное покрытие · без запаха и деформаций'),
      P('703156S', 'Clothing Lifting Rack 900 mm', G.add, 'Использует верхнюю зону гардероба для часто используемой одежды'),
      P('703297S', 'Touch Panel Safe Box 490 mm', G.add, 'Встраивается в ящик · сенсорная клавиатура и аварийный ключ'),
      P('703202S', 'Multi-functional Corner 800 mm', G.add, 'Трёхсекционные направляющие · плавный выдвижной ход'),
    ],
  },
  {
    key: 'BV_PRO', folder: '03_BV_PRO', title: 'BV PRO', sub: 'Premium Grey', highlight: 'BV PRO',
    C: { bg: '#1C1B1A', bg2: '#262422', fg: '#F2EEE8', soft: 'rgba(242,238,232,.78)', acc: '#B9966F', card: '#F4F2EE' },
    cover: { cut: '706311S' },
    tagline: 'Премиальные решения для организации гардеробного пространства.',
    intro: { title: 'Эстетика в каждой детали.', p: 'Гардеробные аксессуары HIGOLD BV Pro объединяют продуманную организацию хранения, кожаную отделку и внимание к деталям.', cut: '706351S' },
    items: [
      P('706341S', 'Accessories Storage Box 600 mm', G.acc, A_LIGHT, { desc: D['706041'] }),
      P('706301S', 'Multi-functional Storage Box 600 mm', G.acc, A_LIGHT, { desc: D['706001'] }),
      P('706311S', 'Leather Jewelry Box 600 mm', G.acc, 'Подсветка с вибродатчиком · противоскользящая вставка', { desc: D['706011'] }),
      P('706351S', 'Deep Leather Basket 600 mm', G.clo, A_LEATHER_BASKET, { desc: D['706051'] }),
      P('706331S', 'Shallow Leather Basket 600 mm', G.clo, A_LEATHER_BASKET, { desc: D['706031'] }),
      P('706321S', 'Trousers Rack 600 mm', G.tr, A_GLIDE, { desc: D['706021'] }),
    ],
  },
];
for (const s of SERIES) if (!s.toc) s.toc = [...new Map(s.items.map((i) => [i.g, []])).keys()].map((g) => [g, s.items.filter((i) => i.g === g).map((i) => i.art).join(' · ')]);

// ——— styles ———
const css = (C) => `${[400, 500, 600, 700].map((w) => `@font-face{font-family:M;font-weight:${w};src:url(${FONT(w)})}`).join('')}
*{margin:0;padding:0;box-sizing:border-box}html,body{width:1080px;height:1920px;background:${C.bg}}
.s{position:relative;width:1080px;height:1920px;overflow:hidden;background:${C.bg};color:${C.fg};font-family:M,sans-serif}
.abs{position:absolute;left:96px;right:96px}
.hdr{top:262px;display:flex;justify-content:space-between;align-items:baseline;font:600 24px/1 M;letter-spacing:.3em;z-index:5}
.hdr b{color:${C.acc};font-weight:600;letter-spacing:.16em}
.k{font:600 26px/1.25 M;letter-spacing:.2em;text-transform:uppercase;color:${C.acc}}
.t{font:700 86px/1.04 M;letter-spacing:-.01em}
.p{font:500 37px/1.4 M;color:${C.soft}}
.rule{height:2px;width:120px;background:${C.acc}}
.card{position:absolute;background:${C.card};overflow:hidden}
.card::after{content:"";position:absolute;inset:14px;border:1.5px dashed ${C.acc};opacity:.55;pointer-events:none}
.card img.cut{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);mix-blend-mode:multiply;object-fit:contain}
.scene{position:absolute;background-size:cover;background-position:center}
.art{font:600 30px/1 M;letter-spacing:.14em;color:${C.acc};display:flex;gap:18px;align-items:center}
.art span{font-size:56px;letter-spacing:.06em;color:${C.fg}}
.nm{font:700 62px/1.08 M;letter-spacing:-.005em;margin-top:22px}
.acc{display:flex;gap:22px;align-items:flex-start;margin-top:30px;font:600 30px/1.35 M;color:${C.acc}}
.acc i{flex:none;width:56px;height:2px;background:${C.acc};margin-top:20px}
.toc{border-top:1.5px solid rgba(255,255,255,.18)}
.toc div{display:flex;flex-direction:column;gap:6px;padding:16px 0;border-bottom:1.5px solid rgba(255,255,255,.18)}
.toc b{font:600 27px/1.2 M;letter-spacing:.16em;text-transform:uppercase;color:${C.fg}}
.toc span{font:500 27px/1.3 M;color:${C.acc};letter-spacing:.04em}
.cta{background:${C.acc};color:${C.bg};font:700 38px/1.32 M;padding:38px 42px}
.wm{font:600 46px/1 M;letter-spacing:.42em}
.shade{position:absolute;left:0;right:0}`;

// image placement inside a card: low-res originals are never enlarged beyond 2.4× their native pixels
const cutImg = (code, w, h, fill = 0.82) => {
  const m = META[code]; if (!m) return `<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font:600 28px M;color:#8a8580;text-align:center;padding:60px">Фото ${code} не найдено на сайте производителя</div>`;
  const [nw, nh] = m.native || m.size; const k = Math.min((w * fill) / nw, (h * fill) / nh, m.lowres ? 2.4 : 99);
  return `<img class="cut" src="${IMG(code)}" style="width:${Math.round(nw * k)}px;height:${Math.round(nh * k)}px;max-width:${fill * 100}%;max-height:${fill * 100}%;object-fit:contain">`;
};
const card = (x, y, w, h, code, fill) => `<div class="card" data-fit style="left:${x}px;top:${y}px;width:${w}px;height:${h}px">${cutImg(code, w, h, fill)}</div>`;
const scene = (x, y, w, h, code, pos = 'center') => `<div class="scene" data-fit style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;background-image:url(${IMG(code)});background-position:${pos}"></div>`;

const hdrF = (S, n, total) => `<div class="abs hdr"><span>HIGOLD · <b>${S.title}</b></span><span>${n ? `${String(n).padStart(2, '0')} / ${total}` : 'CREATURA'}</span></div>`;

function storyCover(S) {
  const { C } = S;
  const visual = S.cover.img
    ? `${scene(0, 0, 1080, 1060, S.cover.img, S.cover.pos)}<div class="shade" style="top:0;height:440px;background:linear-gradient(180deg,${C.bg} 0%,${C.bg}cc 55%,${C.bg}00 100%)"></div><div class="shade" style="top:700px;height:362px;background:linear-gradient(0deg,${C.bg} 0%,${C.bg}00 100%)"></div>`
    : card(96, 360, 888, 700, S.cover.cut, 0.86);
  return `${visual}${hdrF(S)}
   <div class="abs" style="top:1110px"><div class="k">HIGOLD · ${S.sub}</div>
     <div class="t" style="font-size:${S.title.length > 10 ? 104 : 132}px;margin-top:22px;letter-spacing:.01em">${S.title}</div>
     <div class="rule" style="margin:34px 0 30px"></div>
     <p class="p" style="font-size:40px;color:${C.fg}">${t(S.tagline)}</p></div>`;
}
function storyIntro(S) {
  const I = S.intro;
  return `${hdrF(S)}<div class="abs" style="top:340px"><div class="k">Концепция</div>
     <div class="t" style="margin-top:24px;font-size:92px">${t(I.title)}</div>
     <p class="p" style="margin-top:30px;font-size:39px;color:${S.C.fg}">${t(I.p)}</p>
     <div class="toc" style="margin-top:64px">${S.toc.map(([g, a]) => `<div><b>${t(g)}</b><span>${a}</span></div>`).join('')}</div></div>`;
}
function storyItem(S, it, n, total) {
  const top = 360, h = 900;
  let vis;
  if (it.img && it.int) vis = card(96, top, 576, h, it.img, 0.86) + scene(688, top, 296, h, it.int);
  else if (it.img) vis = card(96, top, 888, h, it.img, 0.84);
  else vis = scene(96, top, 888, h, it.int);
  return `${hdrF(S, n, total)}<div class="abs" style="top:322px;z-index:3"></div>${vis}
   <div class="abs" style="top:1190px" data-text>
     <div class="k" style="font-size:24px">${t(it.g)}</div>
     <div class="art" style="margin-top:22px">АРТ.<span>${it.art}</span></div>
     <div class="nm">${esc(it.name).replace(/ (?=\d)/g, NB).replace(/(\d) (mm|m)\b/g, `$1${NB}$2`)}</div>
     <p class="p" style="margin-top:20px;font-size:35px">${t(it.desc)}</p>
     <div class="acc"><i></i><span>${t(it.accent)}</span></div></div>`;
}
function storyCta(S) {
  const { C } = S; const name = S.key === 'BV_SERIES' ? 'HIGOLD BV' : `HIGOLD ${S.title}`;
  const vis = S.key === 'BV_SERIES' ? scene(0, 0, 1080, 900, '703591_int', '50% 40%') + `<div class="shade" style="top:0;height:430px;background:linear-gradient(180deg,${C.bg} 0%,${C.bg}cc 55%,${C.bg}00 100%)"></div><div class="shade" style="top:560px;height:342px;background:linear-gradient(0deg,${C.bg} 0%,${C.bg}00 100%)"></div>`
    : card(96, 360, 888, 480, S.items[0].img, 0.86);
  return `${vis}${hdrF(S)}
   <div class="abs" style="top:880px"><div class="t" style="font-size:66px">${t(`${name} — продуманная организация вашего гардероба.`)}</div>
     <p class="p" style="margin-top:26px;font-size:35px">${t('Подберите функциональные решения для своих интерьерных проектов вместе с Creatura.')}</p></div>
   <div class="abs" style="top:1290px"><div class="cta">${t('Для получения каталога и консультации напишите нам в Direct слово «КАТАЛОГ».')}</div>
     <div class="wm" style="margin-top:44px">CREATURA</div></div>`;
}
function icon(S) {
  const { C } = S; const [a, b] = S.key === 'BV_PRO' ? ['BV', 'PRO'] : S.key === 'BV_PREMIUM_GREY' ? ['BV', 'PREMIUM GREY'] : ['BV', 'SERIES'];
  return `<div style="position:absolute;inset:0;width:1080px;height:1080px;background:${C.bg};display:flex;flex-direction:column;align-items:center;justify-content:center">
    <div style="font:600 40px/1 M;letter-spacing:.42em;color:${C.acc};margin-left:.42em">HIGOLD</div>
    <div style="font:700 360px/1 M;letter-spacing:.02em;color:${C.fg};margin:40px 0 30px">${a}</div>
    <div style="width:140px;height:3px;background:${C.acc}"></div>
    <div style="font:600 ${b.length > 8 ? 46 : 60}px/1 M;letter-spacing:.32em;color:${C.fg};margin:44px 0 0 .32em">${b}</div></div>`;
}

// ——— render ———
const browser = await chromium.launch(); const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
const render = async (S, html, file, clip) => {
  const f = path.join(OUT, '_tmp.html');
  fs.writeFileSync(f, `<!doctype html><html lang="ru"><head><meta charset="utf-8"><style>${css(S.C)}</style></head><body><div class="s">${html}</div></body></html>`);
  await page.goto(pathToFileURL(f).href);
  await page.evaluate(async () => { await document.fonts.load('700 40px M', 'Жж'); await document.fonts.load('500 40px M', 'Жж'); await document.fonts.load('600 40px M', 'Жж'); await document.fonts.ready;
    await Promise.all([...document.images].map((im) => (im.complete ? 0 : new Promise((r) => { im.onload = im.onerror = r; })))); });
  await page.evaluate(() => { const tx = document.querySelector('[data-text]'); if (!tx) return;
    const top = Math.min(1250, 1606 - tx.getBoundingClientRect().height); tx.style.top = top + 'px';
    for (const e of document.querySelectorAll('[data-fit]')) e.style.height = (top - 48 - e.offsetTop) + 'px'; });
  const bad = await page.evaluate(() => [...document.querySelectorAll('.abs:not(.hdr)')].map((e) => { const r = e.getBoundingClientRect(); return r.height && (r.bottom > 1615 || r.top < 250) ? `${e.textContent.trim().slice(0, 24)}… ${Math.round(r.top)}-${Math.round(r.bottom)}` : ''; }).filter(Boolean));
  await page.screenshot({ path: file, clip }); fs.unlinkSync(f);
  return bad;
};
const report = [];
for (const S of SERIES) {
  const dir = path.join(OUT, S.folder); fs.rmSync(dir, { recursive: true, force: true }); fs.mkdirSync(dir, { recursive: true });
  const seq = [['00_cover', storyCover(S), 'Обложка'], ['01', storyIntro(S), 'Концепция и содержание']];
  S.items.forEach((it, i) => seq.push([String(i + 2).padStart(2, '0'), storyItem(S, it, i + 1, S.items.length), `${it.art} ${it.name}`, it]));
  seq.push([String(S.items.length + 2).padStart(2, '0'), storyCta(S), 'Каталог и консультация']);
  const lines = [];
  for (const [name, html, label, it] of seq) {
    const bad = await render(S, html, path.join(dir, name + '.png'));
    const m = it && META[it.img]; const flags = [it && !it.img && it.int ? 'фото в интерьере (отдельного предметного фото нет)' : '', m?.lowres ? `исходник производителя ${m.native.join('×')} px — низкое разрешение, рекомендуем запросить у HIGOLD` : '', it?.note || ''].filter(Boolean);
    lines.push(`- \`${name}.png\` — ${label}${flags.length ? ` · ⚠ ${flags.join('; ')}` : ''}`);
    console.log(`${S.folder}/${name}`, bad.length ? 'CHECK ' + bad.join(' | ') : 'ok');
  }
  await page.setViewportSize({ width: 1080, height: 1080 });
  await render(S, icon(S), path.join(dir, 'cover_icon_1080x1080.png'), { x: 0, y: 0, width: 1080, height: 1080 });
  await page.setViewportSize({ width: 1080, height: 1920 });
  report.push(`## ${S.highlight} — \`${S.folder}\` · ${seq.length} сторис`, '', ...lines, '');
}
await browser.close();

const src = Object.entries(META).map(([c, m]) => `| ${c} | ${m.mode === 'cut' ? 'предметное' : 'интерьер'} | ${m.url} |`);
fs.writeFileSync(path.join(OUT, 'README.md'), `# HIGOLD BV — Актуальное для Creatura

Три отдельные серии, 1080 × 1920 px. Публикуйте по порядку (\`00_cover.png\`, \`01.png\`, \`02.png\`…) и сохраните каждую в своё «Актуальное». Обложка раздела — \`cover_icon_1080x1080.png\`.

| Папка | Актуальное | Сторис |
|---|---|---|
${SERIES.map((S) => `| \`${S.folder}\` | ${S.highlight} | ${S.items.length + 3} |`).join('\n')}

Серии BV Premium Grey и BV Pro подготовлены отдельно и не смешаны с основной BV Series (Moran Green).

**Тексты.** Названия моделей, артикулы и описания взяты из брифа. Короткий функциональный акцент в каждой сторис переведён с официальной страницы модели на higoldhardware.com. Размеры, материалы и характеристики сверх этого не добавлялись.
**Фото.** Только официальные изображения HIGOLD с higoldhardware.com, фото каждой модели взято с её собственной страницы. Изображения обрезаны по краям, сам продукт не менялся. Если у модели есть интерьерное фото на той же странице, оно стоит рядом с предметным.

### Замечания по проверке
- **703533 Corner Clothes Basket**: на сайте HIGOLD артикул размещён в разделе BV-Premium Grey и показан только в сером исполнении. В основной серии использовано это фото, другая модель им не подменялась.
- **706173 Oval Clothes Rail with Light**: на странице модели есть только интерьерное фото, оно и использовано.
- **Низкое разрешение исходников** у 703541, 706161, 703202, 703156S, 703297S, 706161S и 703202S: производитель публикует их только в маленьком размере. В сторис они не растянуты больше 2,4×. Для максимального качества стоит запросить у HIGOLD фото в высоком разрешении.
- На сайте у 703202S в заголовке опечатка «706202S», в адресе страницы и фото указан 703202S. В сторис использован 703202S.
- Отсутствующих фото нет: у всех 19 + 14 + 6 позиций найдены официальные изображения именно этой модели.

${report.join('\n')}
### Источники фото
| Код | Тип | URL |
|---|---|---|
${src.join('\n')}
`);
console.log('done');
