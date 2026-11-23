// Creatura highlight selection (v2): only the positions Creatura works with.
// Content: official sites / catalogues of each brand (raw data in ./research). Copy translated, no data added.
import { product, list, grid, img, balance } from './lib.mjs';
import SAL from './research/salice.json' with { type: 'json' };
import VM from './research/verum_models.json' with { type: 'json' };
import FM from './research/formani.json' with { type: 'json' };
import CE from './research/ceam.json' with { type: 'json' };
import SP from './research/salicepaolo.json' with { type: 'json' };
import FJb from './brands/fritsjurgens.mjs';
import ATIMb from './brands/atim.mjs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SRC = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../assets/highlights/_src');
const local = (f) => 'file://' + path.join(SRC, f);
const swatch = (s) => ({ kind: 'swatches', ...s });

/* ── SALICE ─────────────────────────────────────────────────────────────── */
const SB = 'https://www.salice.com';
const salP = (l, i = 0) => Object.values(SAL).flatMap((c) => c.products).filter((p) => p.l === l)[i];
const SI = (slug, l, i = 0) => { const p = salP(l, i); return img('sel/salice/' + slug, SB + p.i, { salicePage: SB + p.u }); };
const salice = {
  key: 'salice', name: 'SALICE', folder: '01_SALICE', ctaWhat: 'системы', tagline: 'Петли и раздвижные системы для мебели',
  facts: [['Страна', 'Италия · Новедрате'], ['Основана', '1926 год, Канту'], ['1957', 'первый в мире патент на скрытую самозакрывающуюся петлю']],
  stories: [
    product({ cat: 'Петли · полностью скрытые', title: 'AIR', sub: 'AIR · AIR Push',
      text: 'Врезается в корпус и фасад — снаружи петлю не видно.',
      specs: [['Открывание', '105°'], ['Фасады', 'дерево и алюминиевая рамка'], ['Версии', 'с доводчиком или Push']], img: SI('air', 'AIR') }),
    product({ cat: 'Открывание нажатием', title: 'PUSH', sub: 'Петли Push и толкатели',
      text: 'Для фасадов без ручек: дверь открывается лёгким нажатием.',
      specs: [['Петли', 'Series 200 · 94° · 110° · 155°'], ['Толкатели', 'механические и магнитные']], img: SI('push', 'PUSH', 8) }),
    product({ cat: 'Пенальные системы', title: 'EXEDRA GRAVITY', sub: 'Дверь уходит в пенал',
      text: 'Работает без тросов, тяг и пружин. Механизм скрыт в нише 55 мм.',
      specs: [['Высота двери', '1100–3000 мм'], ['Ширина', '300–900 мм'], ['Вес двери', 'до 40 кг'], ['Отделки', 'никель, титан']],
      img: img('sel/salice/exedra-gravity', SB + '/media/immagini/7956_n_salice-exedra-gravity-pocket-doors-system-PRE-03a.jpg', { salicePage: SB + salP('POCKET DOOR SYSTEM', 0).u }) }),
    product({ cat: 'Пенальные системы · две двери', title: 'EXEDRA2', sub: 'Star · Smart',
      text: 'Две связанные двери уходят в пенал одновременно. Гравитация и магнитные демпферы.',
      specs: [['Star', 'механизм скрыт панелью · ширина 350–757 мм'], ['Smart', 'меньше глубина · ширина 525–862 мм'], ['Высота', '1800–3000 мм · до 25 кг'], ['Ресурс', '50 000 циклов']],
      img: img('sel/salice/exedra2', SB + '/media/immagini/5827_n_salice-exedra2-star-sliding-system-double-pocket-doors-PRE-03b.jpg') }),
    product({ cat: 'Пенальные системы · с мотором', title: 'EXEDRA2 MOTORISED', sub: 'Interzum Award 2025 · Best of the Best',
      text: 'Exedra2 с полностью моторизованным открыванием.',
      specs: [['Открывание', 'традиционное, Push или мотор'], ['Версии', 'Star и Smart']],
      img: img('sel/salice/exedra2-motor', SB + '/media/immagini/8068_z_salice-exedra2-sliding-system-double-pocket-doors-optional-motorised.png') }),
  ],
};

/* ── ATIM: all Trasformabili, 3 per story for large type ───────────────── */
const atimRows = ATIMb.stories.flatMap((s) => s.rows.map((r) => ({ ...r, fam: s.title, lead: s.lead })));
const atimFams = [...new Set(atimRows.map((r) => r.fam))];
const atim = {
  key: 'atim', name: 'ATIM', folder: '02_ATIM', ctaWhat: 'механизмы', tagline: 'Мебель-трансформер: столы, столешницы, доски',
  facts: [['Страна', 'Италия'], ['С 2024 года', 'в группе Salice'], ['Линия', `Trasformabili · ${atimRows.length} решений`]],
  stories: atimFams.flatMap((f) => { const rows = atimRows.filter((r) => r.fam === f); const parts = balance(rows, 3);
    return parts.map((p, i) => list({ cat: `Trasformabili${parts.length > 1 ? ` · ${i + 1}/${parts.length}` : ''}`, title: f, rows: p })); }),
};

/* ── STV: ATTRAZIONE A7 ───────────────────────────────────────────────── */
const STVPDF = 'https://www.stvserrature.it/img/pdf/Catalogo_generale-ita-eng.pdf';
const stv = {
  key: 'stv', name: 'STV', folder: '03_STV', ctaWhat: 'замки', tagline: 'Магнитный замок ATTRAZIONE A7', coverSub: 'The Italian Lock',
  facts: [['Страна', 'Италия · 100% Made in Italy'], ['Основана', '1960-е, семья Tagliapietra'], ['Качество', 'ISO 9001 с 2006 года']],
  stories: [
    product({ cat: 'Магнитный замок ATTRAZIONE', title: 'Art. A7', sub: 'Замок под WC-фиксатор',
      text: 'Магнитный язычок выходит, только когда дверь подходит к коробке.',
      specs: [['Межосевое', '96 мм'], ['Бэксет', '50 мм'], ['Квадрат', 'ручка 8 мм · WC 6 мм'], ['Планка', 'скруглённая, 22 мм']],
      img: img('sel/stv/a7-gold', STVPDF, { page: 75, xref: 2425 }) }),
    product({ cat: 'Как работает', title: '4 магнита', sub: 'ATTRAZIONE',
      text: 'Ровная планка без выступов. Язычок блокируется, ручка вращается свободно.',
      specs: [['Механизм', '4 постоянных магнита'], ['Возврат язычка', 'через фиксатор'], ['Крепление ручки', 'DIN']],
      img: img('sel/stv/a7-steel', STVPDF, { page: 76, xref: 2430 }) }),
    swatch({ cat: 'ATTRAZIONE A7', title: 'Отделки', items: [
      { name: 'Белый', code: 'White P.', img: img('sel/stv/sw-white', local('stv-a7-white.png'), { mode: 'cut' }) },
      { name: 'Золото', code: 'Polished Brass', img: img('sel/stv/sw-brass', local('stv-a7-polished-brass.png'), { mode: 'cut' }) },
      { name: 'Матовый хром', code: 'Matt Chrome', img: img('sel/stv/sw-chrome', local('stv-a7-matt-chrome.png'), { mode: 'cut' }) },
      { name: 'Матовый никель', code: 'Matt Nickel', img: img('sel/stv/sw-nickel', local('stv-a7-matt-nickel.png'), { mode: 'cut' }) },
    ] }),
  ],
};

/* ── FORMANI ──────────────────────────────────────────────────────────── */
const fimg = (k, re) => { const a = FM[k].imgs; return img('sel/formani/' + k.toLowerCase(), (re && a.find((u) => re.test(u))) || a.find((u) => /main/i.test(u)) || a[0]); };
const F = (k, title, by, text, specs, re) => product({ cat: 'Коллекция', title, sub: by, text, specs, img: fimg(k, re) });
const formani = {
  key: 'formani', name: 'FORMANI', folder: '04_FORMANI', ctaWhat: 'фурнитуру', tagline: 'Дизайнерская фурнитура: двери, окна, мебель',
  facts: [['Страна', 'Нидерланды'], ['Подход', 'единый стиль для всего объекта'], ['Дизайнеры', 'Piet Boon, Zaha Hadid Design, Gensler и др.']],
  stories: [
    F('ONE-by-Piet-Boon', 'ONE', 'by Piet Boon', 'Иконическая серия: чистый цилиндрический объём.', [['Отделки', '8, включая PVD gold и champagne']], /ONE_satin_stainless/),
    F('INC-by-Piet-Boon', 'INC', 'by Piet Boon', 'Плавный наклон и уверенный хват.', [['Награда', 'Red Dot 2019'], ['Отделки', '5']], /INC_satin_stainless/),
    F('ELEEZ-by-zaha-hadid-design', 'ELEEZ', 'by Zaha Hadid Design', 'Мягкая спираль на цилиндрической ручке.', [['Отделки', '6']]),
    F('RIVIO', 'RIVIO', 'by Gensler', 'Срезы под пальцы — особенно удобный хват.', [['Отделки', '6']], /GL101_satin_stainless/),
    F('RIBBON-by-Bob-Manders', 'RIBBON', 'by Bob Manders', 'Розетка, шейка и рычаг — одна цельная деталь.', [['Отделки', 'сталь, бронза, PVD чёрный']]),
    F('SQUARE-by-Jan-des-Bouvrie', 'SQUARE', 'by Jan des Bouvrie', 'Ода квадрату: каждая деталь проверяется на прямизну вручную.', [['Серия', 'самая большая у FORMANI']]),
    F('BOSCO-by-Lazaro-Rosa-Violan', 'BOSCO', 'by Lázaro Rosa-Violán', 'Классика с современным характером.', [['Рукоять', 'чёрная или мрамор каррара']]),
    F('NOUR-by-Edward-van-Vliet', 'NOUR', 'by Edward van Vliet', 'Модульная ручка: вставки меняются по цвету.', [['Награда', 'German Design Award']]),
    F('BOBBY-by-Eric-Kuster', 'BOBBY', 'by Eric Kuster', 'Прямоугольное сечение переходит в округлую рукоять.', [['Отделки', 'сталь, PVD чёрный, бронза']]),
    F('CONE-by-Osiris-Hertman', 'CONE', 'by Osiris Hertman', 'Коническая шейка без розетки — ручка будто парит.', [['Награда', 'Red Dot 2021']]),
    F('TENSE-by-Bertram-Beerbaum', 'TENSE', 'by Bertram Beerbaum', 'Цилиндрическая шейка и прямоугольный рычаг.', [['Отделки', 'сталь, чёрный, бронза, PVD champagne']], /Tense_satin_stainless/),
    F('Eclipse-by-David-Rockwell', 'ECLIPSE', 'by David Rockwell', 'Цилиндр с изогнутым каналом под руку.', [['Награда', 'Red Dot 2021'], ['Отделки', '6']], /satin-stainless/),
    F('TIMELESS-by-FORMANI', 'TIMELESS', 'by FORMANI', 'Модели 1815–1950 годов, каждая названа по году создания.', [['Состав', 'двери, окна, мебель, аксессуары']]),
  ],
};

/* ── VERUM ────────────────────────────────────────────────────────────── */
const FIN = /^(Satin Chrome|Polished Chrome|Moon Grey|Etna Black|Monviso White|Venezia Gold|Yester Bronze|Sahara Gold|Cenote Blue|Blue Cenote|Ghisa Grey|Nero etna|Cromo lucido|Cromo satinato|Bronzo yester|Bianco monviso|Grigio Moon|Satin chrome|Monviso white|SAHARA GOLD)$/i;
const fn = (f) => ({ 'nero etna': 'Etna Black', 'cromo lucido': 'Polished Chrome', 'cromo satinato': 'Satin Chrome', 'bronzo yester': 'Yester Bronze', 'bianco monviso': 'Monviso White', 'grigio moon': 'Moon Grey', 'blue cenote': 'Cenote Blue', 'sahara gold': 'Sahara Gold', 'satin chrome': 'Satin Chrome', 'monviso white': 'Monviso White' }[f.toLowerCase()] || f);
const V = (k) => { const f = [...new Set(VM[k].text.filter((l) => FIN.test(l)).map(fn))];
  return product({ cat: 'NUDA · без розетки', title: k.toUpperCase(), sub: 'Verum Italy', text: 'Ручка без розетки — патентованная система Verum.',
    specs: [['Отделок', String(f.length)], ['Палитра', f.slice(0, 6).join(', ') + (f.length > 6 ? ' и др.' : '')]],
    img: img('sel/verum/' + k, VM[k].imgs.find((u) => /cromo_satinato|chromo_satinato/.test(u)) || VM[k].imgs[0]) }); };
const verum = {
  key: 'verum', name: 'VERUM', folder: '05_VERUM', ctaWhat: 'ручки', tagline: 'Ручки без розетки — коллекция NUDA',
  facts: [['Страна', 'Италия · Брианца'], ['Опыт', 'более 20 лет'], ['NUDA', 'монтаж без розетки, патент Verum']],
  stories: ['lieve', 'pepe', 'atlanta', 'baar', 'pure', 'wind'].map(V),
};

/* ── SALICE PAOLO: Timeless + Classic, all models ────────────────────── */
const SPB = 'https://www.salicepaolo.it';
const spItems = (k) => { const seen = new Set(); return (SP[`/en/products/${k}/`]?.items || []).filter((x) => { const n = x.name.trim().toLowerCase(); if (!n || seen.has(n)) return false; seen.add(n); return true; })
  .map((x) => ({ name: x.name.trim().replace(/^([A-Z])([A-Z\s\-]+)$/, (a, b, c) => b + c.toLowerCase()), code: (x.cod || '').replace(/^Cod\s*/i, '').trim(),
    img: img('sel/salicepaolo/' + x.u.replace(/^\/en\/products\//, '').replace(/\/$/, '').replace(/\//g, '-').toLowerCase(), SPB + x.img.replace('preview_', '')) })); };
const spGrids = (line, cat, k) => { const it = spItems(k); const parts = balance(it, 6);
  return parts.map((p, i) => grid({ cat: `${line} · ${cat}`, title: `${cat}${parts.length > 1 ? ` ${i + 1}/${parts.length}` : ''}`, items: p })); };
const SPT = [['Ручки', 'handles-113'], ['Оконные ручки', 'dreykipp-114'], ['Для раздвижных дверей', 'plate-for-sliding-door-119'], ['Кнопки', 'knobs-115'], ['Ручки-скобы', 'door-pull-116'], ['Аксессуары', 'accessories-118'], ['Мебельные ручки', 'furniture-handles-and-knobs']];
const SPC = [['Ручки', 'handles'], ['Оконные ручки', 'moving-window-knob'], ['Для раздвижных дверей', 'plate-for-sliding-door'], ['Кнопки', 'knobs'], ['Ручки-скобы', 'door-pull'], ['Входные гарнитуры', 'entrance-set'], ['Гарнитуры Yale', 'entrance-set-yale'], ['Аксессуары', 'accessories'], ['Мебельные ручки', 'furniture-stud'], ['Мебельный декор', 'furniture-decoration']];
const spFacts = [['Страна', 'Италия · Канту'], ['С 1937 года', 'изделия из латуни'], ['Производство', 'разработано и сделано в Италии']];
const spTimeless = { key: 'salicepaolo', name: 'SALICE PAOLO', folder: '06_SALICE_PAOLO_TIMELESS', ctaWhat: 'ручки', coverSub: 'Timeless', tagline: 'Линия Timeless — латунные ручки и фурнитура', facts: spFacts,
  stories: SPT.flatMap(([c, k]) => spGrids('Timeless', c, k)) };
const spClassic = { key: 'salicepaolo', name: 'SALICE PAOLO', folder: '07_SALICE_PAOLO_CLASSIC', ctaWhat: 'ручки', coverSub: 'Classic', tagline: 'Линия Classic — латунные ручки и фурнитура', facts: spFacts,
  stories: SPC.flatMap(([c, k]) => spGrids('Classic', c, k)) };

/* ── CEAM ─────────────────────────────────────────────────────────────── */
const cv = (k, label) => { const L = CE[k].text; const i = L.indexOf(label + ':'); return i >= 0 ? L[i + 1] : null; };
const cimg = (k) => CE[k].imgs.find((u) => !/logo|Logo_|cropped|dis\.png|finitura|fissa2D|Immagine/i.test(u));
const UA = { Wood: 'дерево', Alluminium: 'алюминий', Steel: 'сталь' };
const C = (k, title, text) => { const fr = cv(k, 'Fire resistance');
  return product({ cat: 'Скрытые петли · 3D', title, sub: 'Регулировка в 3 плоскостях', text,
    specs: [['Нагрузка', `${cv(k, 'Load capacity 2 hinges')} / ${cv(k, 'Load capacity 3 hinges')} (2 / 3 петли)`.replace(/kg/g, 'кг')],
      ['Размер', `${cv(k, 'Height')} × ${cv(k, 'Width')} × ${cv(k, 'Depth')}`.replace(/ mm/g, '').replace(/(\d)\.(\d)/g, '$1,$2') + ' мм'],
      ['Дверь от', (cv(k, 'Minimum door thickness') || '').replace('mm', 'мм')],
      fr && !/^(--|n\.d\.)$/.test(fr) ? ['Огнестойкость', fr] : ['Двери', (cv(k, 'Suitable for doors') || '').split(/,\s*/).map((x) => UA[x] || x).join(', ')]],
    img: img('sel/ceam/' + title.toLowerCase().replace(/\s+/g, ''), cimg(k)) }); };
const ceam = {
  key: 'ceam', name: 'CEAM', folder: '08_CEAM', ctaWhat: 'скрытые петли', tagline: 'Скрытые регулируемые петли',
  facts: [['Страна', 'Италия · Черменате'], ['Основана', '1962 год'], ['Производство', '100% в Италии']],
  stories: [
    C('1430', '1430', 'Основа серии 14: минималистичный дизайн, много отделок.'),
    C('1450', '1450', 'Сверхширокий вылет — для облицованных дверей.'),
    C('3d-concealed-door-hinges-1230s', '1230s', 'Реверсивная, для дверей 35–45 мм.'),
    C('cerniere-a-scomparsa-1418', '1418', 'Петля со смещением: облицовка до 18 мм со стороны коробки.'),
    C('3d-concealed-door-hinges-1131s', '1131s', 'Для тяжёлых дверей; испытана для противопожарных до 120 минут.'),
    C('929', '929', 'Первая 3D-петля CEAM для мебели.'),
  ],
};

/* ── SIMONSWERK: TECTUS ───────────────────────────────────────────────── */
const SW = 'https://media-selector.simonswerk.com/storage/fileadmin/user_upload/Standardbild/TECTUS/';
const simonswerk = {
  key: 'simonswerk', name: 'SIMONSWERK', folder: '09_SIMONSWERK', ctaWhat: 'петли', tagline: 'TECTUS — полностью скрытые петли',
  facts: [['Страна', 'Германия'], ['TECTUS', 'скрытые петли с 3D-регулировкой'], ['Для дверей', 'дерево, сталь, алюминий']],
  stories: [
    product({ cat: 'TECTUS', title: 'TE 340 3D', sub: 'Для дверей без притвора',
      text: 'Полностью скрытая петля с закрытым корпусом.',
      specs: [['Нагрузка', '80 кг (2 петли)'], ['Длина', '160 мм'], ['Дверь от', '36 мм'], ['Открывание', '180°']],
      img: img('sel/simonswerk/te340', SW + 'TE_340_3D.jpg') }),
    product({ cat: 'TECTUS FVZ', title: 'TE 311 3D FVZ 44', sub: 'Для коробок с утопленным наличником',
      text: 'Наличник утоплен до 12 мм — видна только дверь.',
      specs: [['Нагрузка', '60 кг (2 петли)'], ['Длина', '125 мм'], ['Дверь от', '44 мм'], ['Открывание', '180°']],
      img: img('sel/simonswerk/te311fvz44', SW + 'TE_311_3D_FVZ_44.jpg') }),
    swatch({ cat: 'TECTUS', title: 'Отделки', items: [
      { name: 'Матовый никель', code: 'SW 125 · Satin Nickel Look F2', badge: 'SW 125' },
      { name: 'Чёрный матовый', code: 'SW 107 · RAL 9005', img: img('sel/simonswerk/sw107', 'https://www.simonswerk.com/fileadmin/_processed_/2/8/csm_TECTUS_Produktslider_Produktbild_TE_340_3D_TIEFSCHWARZ_MATT_RAL9005_ef73330cf3.webp') },
      { name: 'Светлая бронза', code: 'SW 175 · Bronze Finish light', badge: 'SW 175' },
      { name: 'Полированная латунь', code: 'SW 030 · Polished brassed', badge: 'SW 030' },
    ], note: 'Все четыре отделки доступны для TE 340 3D; для TE 311 3D FVZ 44 — уточняйте наличие.' }),
  ],
};

/* ── FRITSJURGENS: all ────────────────────────────────────────────────── */
const fritsjurgens = { ...FJb, folder: '10_FRITSJURGENS', ctaWhat: 'pivot-системы', tagline: 'Скрытые системы для pivot-дверей',
  facts: [['Страна', 'Нидерланды'], ['История', 'с 1930 года'], ['Двери', 'до 500 кг, ширина до 4 м']],
  stories: FJb.stories.flatMap((s) => (s.kind === 'list' ? balance(s.rows, 3).map((r) => ({ ...s, rows: r })) : [s])) };

export const SELECTION = [salice, atim, stv, formani, verum, spTimeless, spClassic, ceam, simonswerk, fritsjurgens];
