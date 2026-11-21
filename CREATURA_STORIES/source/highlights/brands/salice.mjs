// SALICE — source: salice.com (product catalogue embedded in the official category pages)
import { product, list, img } from '../lib.mjs';
import data from '../research/salice.json' with { type: 'json' };

const BASE = 'https://www.salice.com';
const all = Object.values(data).flatMap((c) => c.products);
const fam = (l) => all.filter((p) => p.l === l);
// photo of the first product of a family (largest packshot from its product page)
const F = (slug, l, i = 0, listing = false) => { const p = fam(l)[i]; return img('salice/' + slug, BASE + p.i, listing ? {} : { salicePage: BASE + p.u }); };
const names = (l, re = /$^/) => [...new Set(fam(l).map((p) => p.t.replace(re, '').trim()))];

export default {
  key: 'salice', name: 'SALICE', full: 'Arturo Salice S.p.A.', folder: '01_SALICE',
  tagline: 'Петли, подъёмные механизмы, направляющие и раздвижные системы для мебели',
  facts: [
    ['Страна', 'Италия · Новедрате'],
    ['Основана', '1926, Канту'],
    ['1957', 'первый в мире патент на скрытую самозакрывающуюся петлю'],
    ['Производство', '47 000 м² · собственный технологический центр'],
  ],
  source: 'salice.com',
  stories: [
    product({ cat: 'Петли · встроенный доводчик', title: 'SILENTIA+', sub: `${fam('SILENTIA+').length} исполнений · Series 100 · 200 · 700 · для металлических профилей`,
      text: 'Петли с регулируемым встроенным доводчиком: два силиконово-масляных демпфера внутри чашки.',
      specs: [['Открывание', '94° · 105° · 110° · 120° · 155°'], ['Двери', 'дерево, алюминиевая рамка'], ['Монтаж', 'Domi — защёлкиванием или на винтах'], ['Установка', 'стандартная, угловая, Crampon']],
      img: F('silentia', 'SILENTIA+') }),
    product({ cat: 'Петли · полностью скрытые', title: 'AIR', sub: 'The truly concealed hinge · AIR и AIR Push',
      text: 'Петля врезается в корпус и фасад и не видна снаружи. Компактный размер, встроенное торможение или система Push.',
      specs: [['Открывание', '105°'], ['Двери', 'дерево и алюминиевая рамка'], ['Версии', 'с доводчиком · Push для фасадов без ручек']],
      img: F('air', 'AIR') }),
    product({ cat: 'Петли · для стеклянных дверей', title: 'Universal hinges', sub: 'Доводчик · Push · с пружиной',
      text: 'Петли для стеклянных фасадов: стекло сверлить не нужно.',
      specs: [['Открывание', '110°'], ['Применение', 'накладные, полунакладные, фасады с профилем'], ['Монтаж', 'Domi или традиционные планки']],
      img: F('universal', 'UNIVERSAL HINGES') }),
    product({ cat: 'Петли · с декоративными крышками', title: 'LAPIS', sub: 'Series 200 · Series 700 · LAPIS Push',
      text: 'Петли с регулируемым встроенным доводчиком и декоративными крышками.',
      specs: [['Открывание', '94° · 110°'], ['Фасады', 'средний вес, толщина 16–26 мм (Push — 19–35 мм)'], ['Монтаж', 'Domi, продольные планки']],
      img: F('lapis', 'LAPIS') }),
    product({ cat: 'Петли · врезные', title: 'CONECTA', sub: 'Для деревянных и алюминиевых фасадов',
      text: 'Петля с утапливаемой установкой в фасад и в боковину.',
      specs: [['Открывание', '94° и 180°'], ['Толщина фасада', '22–30 мм'], ['Боковина', 'от 16 мм']],
      img: F('conecta', 'CONECTA') }),
    product({ cat: 'Петли · открывание нажатием', title: 'PUSH', sub: 'Series 200 · 94° · 110° · 155°',
      text: 'Петли со специальной пружиной для фасадов без ручек — открываются нажатием.',
      specs: [['Открывание', '94° · 110° · 155°'], ['Установка', 'стандартная, угловая, Crampon']],
      img: F('push-hinge', 'PUSH', 8) }),
    product({ cat: 'Петли · с пружиной', title: 'Самозакрывающиеся петли', sub: `${fam('SELF-CLOSING').length} исполнений · Series 100 · 200 · 400 · 700`,
      text: 'Классические петли с пружиной для деревянных фасадов и металлических профилей.',
      specs: [['Открывание', 'от 65° до 270°'], ['Монтаж', 'Domi — защёлкиванием или на винтах'], ['Фасады', 'дерево, металлический профиль']],
      img: F('self-closing', 'SELF-CLOSING', 0, true) }),
    product({ cat: 'Петли · для улицы', title: 'CHROMIA', sub: '94° · стандартная и Crampon',
      text: 'Петли со специальным защитным покрытием для улицы и сложных условий эксплуатации.',
      specs: [['Открывание', '94°'], ['Фасад', 'от 16 мм, дерево'], ['Доводчик', 'Silentia+']],
      img: F('chromia', 'CHROMIA') }),
    product({ cat: 'Подъёмные механизмы', title: 'WIND', sub: 'С доводчиком или Push',
      text: 'Механизм для фасадов, открывающихся вверх, с чистой линейной эстетикой.',
      specs: [['Высота фасада', '220–600 мм'], ['Вес фасада', '1–24 кг'], ['Открывание', '85°–94°'], ['Пружина', 'регулируемое усилие']],
      img: F('wind', 'WIND') }),
    product({ cat: 'Подъёмные механизмы', title: 'EVOLIFT', sub: 'Откидной · складной · параллельный · поворотный',
      text: 'Компактные подъёмные механизмы с высокой производительностью для фасадов любого типа открывания.',
      specs: [['Высота фасада', '300–600 мм'], ['Вес фасада', '1,5–18 кг'], ['Привод', 'спиральная пружина · доводчик или Push']],
      img: F('evolift', 'EVOLIFT') }),
    list({ cat: 'Откидные и вертикальные системы', title: 'PACTA · TILT · MOVER', rows: [
      { name: 'PACTA', text: 'Компактная самонесущая петля для откидных фасадов, с Smove или Push.', spec: 'Высота 280–400 мм · 1,5–9,5 кг · 90°', img: F('pacta', 'PACTA') },
      { name: 'TILT Down / Up', text: 'Система для откидных фасадов вниз и вверх с плавным ходом.', spec: 'Толщина 12 мм · фасады 18–30 мм · 90°', img: F('tilt', 'TILT') },
      { name: 'MOVER · MOVER Flat', text: 'Фасад опускается вниз и фиксируется в любом положении.', spec: 'До 23 кг · ширина 900–2400 мм', img: F('mover', 'VERTICAL SLIDING SYSTEM') },
    ] }),
    list({ cat: 'Скрытые направляющие', title: 'PROGRESSA · FUTURA · UNICA', rows: [
      { name: 'PROGRESSA+', text: 'Направляющие скрытого монтажа полного выдвижения, Smove или Push.', spec: 'Динамическая нагрузка 70 кг', img: F('progressa-plus', 'PROGRESSA+ SMOVE') },
      { name: 'PROGRESSA', text: 'Полное выдвижение, совместимы с ящиками Lineabox Easy.', spec: 'Динамическая нагрузка 45 кг', img: F('progressa', 'PROGRESSA SMOVE') },
      { name: 'FUTURA', text: 'Частичное и полное выдвижение · самозакрывание, Push или Smove.', spec: 'Длина 250–600 мм · 30 кг', img: F('futura', 'FUTURA SMOVE') },
      { name: 'UNICA', text: 'Полное выдвижение со встроенными Push и Smove, крепление без винтов.', spec: 'Длина 300–500 мм', img: F('unica', 'UNICA') },
    ] }),
    list({ cat: 'Металлические ящики', title: 'ADAPTO · LINEABOX EASY', rows: [
      { name: 'ADAPTO', text: 'Стальные боковины, деревянные дно и задняя стенка. 2-sided, с релингом и надставкой.', spec: '3 высоты · 4 отделки · дно 16 мм', img: F('adapto', 'ADAPTO') },
      { name: 'LINEABOX EASY', text: 'Алюминиевые боковины с торцом под 90°, деревянные дно и задняя стенка.', spec: '4 высоты · дно 16 мм', img: F('lineabox', 'LINEABOX EASY') },
      { name: 'Выдвижные полки', text: 'Направляющие для выдвижных полок PROGRESSA+ Shelf и Shelf, Smove или Push.', spec: 'До 50 кг · длина 350–600 мм', img: F('shelf', 'PROGRESSA+ SHELF SMOVE') },
    ] }),
    product({ cat: 'Раздвижные системы · пенал', title: 'EXEDRA', sub: 'Exedra Gravity · Exedra Light · Exedra2 Star · Exedra2 Smart',
      text: 'Системы для дверей, уходящих в пенал: работают без тросов, тяг и пружин; автоматическое выдвижение и заведение двери.',
      specs: [['Высота двери', '1100–3000 мм'], ['Ширина', '300–900 мм'], ['Толщина', '10–30 мм'], ['Вес', 'до 40 кг']],
      img: F('exedra', 'POCKET DOOR SYSTEM') }),
    product({ cat: 'Раздвижные системы · компланарные', title: 'SLIDER', sub: 'S10 · S20 · M35 · M35 Top · M50 · M50 Flex · L70 · L70 Flex · L100',
      text: 'Компланарные системы для шкафов: от кухонных навесных до гардеробов. Плавное открывание и закрывание.',
      specs: [['S10', 'до 10 кг на дверь · ширина 512–1200 мм'], ['Линейка', 'S · M · L — по весу и размеру дверей']],
      img: F('slider', 'COPLANAR SYSTEM') }),
    list({ cat: 'Раздвижные и складные двери', title: 'GLOW · FOLDER', rows: [
      { name: 'GLOW+ · GLOW Easy', text: 'Для шкафов с 2, 3 и более дверями внахлёст, с масляным демпфером.', spec: 'До 70 кг на дверь (до 100 кг)', img: F('glow', 'SYSTEM FOR OVERLAPPING DOORS') },
      { name: 'FOLDER 90 · FOLDER 180', text: 'Петлевая система в сочетании с раздвижной — для складных дверей.', spec: 'Высота 600–3000 мм · до 40 кг на 2 двери', img: F('folder', 'CONCERTINA DOORS SYSTEM') },
    ] }),
    list({ cat: 'Доводчики и толкатели', title: 'SMOVE · PUSH', rows: [
      { name: 'SMOVE', text: 'Демпфер для плавного закрывания любой мебельной двери на скрытых петлях любого бренда.', spec: 'Регулируемое торможение · накладной и врезной', img: F('smove', 'SMOVE') },
      { name: 'PUSH', text: 'Механические и магнитные толкатели для фасадов без ручек.', spec: 'На винтах · с регулировкой', img: F('push', 'PUSH') },
    ] }),
    product({ cat: 'Модульная система', title: 'LUXER', sub: 'Luxer Room · Luxer Wall',
      text: 'Настенная система вертикальных профилей для полок и выдвижных блоков, со встроенной скрытой LED-подсветкой.',
      specs: [['Полки', 'до 40 кг'], ['Блоки ящиков', 'до 50 кг'], ['Крепления', 'без видимого крепежа'], ['Питание', 'через одну стойку']],
      img: F('luxer', 'LUXER') }),
    list({ cat: 'Наполнение гардеробных', title: 'EXCESSORIES', rows: [
      { name: 'Pull-out · Modular', text: 'Алюминиевые ящики и полки, вешалки для брюк и юбок, обувницы.', spec: 'Ширина до 1500 мм · 3 высоты', img: F('exc-pullout', 'EXCESSORIES - PULL-OUT') },
      { name: 'Shelves', text: 'Полки в алюминиевой рамке со светом внутри шкафа.', spec: 'Профиль 30 / 36 мм', img: F('exc-shelves', 'EXCESSORIES - SHELVES') },
      { name: 'Hang · Contain · Store · Protect', text: 'Вешалки, штанги, текстильные боксы, лотки из эко-кожи, чехлы.', spec: 'Отделки metal grey brown, desert taupe', img: F('exc-hang', 'EXCESSORIES - HANG') },
      { name: 'PIN', text: 'Профили для хранения на виду: винный, ножевой, полка, вешалка.', spec: 'Алюминий, титан · 3,5 кг на пару', img: F('pin', 'PIN, THE DISPLAY STORAGE SYSTEM') },
    ] }),
  ],
};
