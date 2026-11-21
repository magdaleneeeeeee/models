// CEAM — source: ceamitalia.it (EN model pages with technical data)
import { product, list, img } from '../lib.mjs';
import D from '../research/ceam.json' with { type: 'json' };

const val = (k, label) => { const L = D[k].text; const i = L.indexOf(label + ':'); return i >= 0 ? L[i + 1] : null; };
const loads = (k) => [val(k, 'Load capacity 2 hinges'), val(k, 'Load capacity 3 hinges')];
const FIN = { 'BRONZE': 'бронза', 'NICKEL PLATED': 'никель', 'BRASS PLATED': 'латунь', 'NICKEL MATTE': 'матовый никель', 'SILVER PAINTED': 'серебристая окраска', 'BLACK VARNISHED': 'чёрный лак', 'STAINLESS STEEL': 'нержавеющая сталь', 'BLACK NICKEL': 'чёрный никель', 'BRUSHED BRONZE': 'брашированная бронза', 'CHAMPAGNE PAINTED': 'окраска шампань', 'MATT CHROME': 'матовый хром', 'SATIN NICKEL': 'сатинированный никель', 'WHITE': 'белый' };
const finishes = (k) => { const L = D[k].text; const i = L.indexOf('AVAILABLE FINISHES'); if (i < 0) return []; return [...new Set(L.slice(i + 1).filter((l) => /^[A-Z][A-Z ]+$/.test(l) && !/CONTACT|DOWNLOAD/.test(l)))]; };
const UA = { 'Wood': 'дерево', 'Alluminium': 'алюминий', 'Steel': 'сталь', 'Glass': 'стекло' };
const doors = (k) => (val(k, 'Suitable for doors') || '').split(/,\s*/).map((x) => UA[x] || x).join(', ');
const firstImg = (k) => D[k].imgs.find((u) => !/logo|Logo_|cropped|dis\.png|finitura|fissa2D|Immagine/i.test(u));
const I = (k) => img('ceam/' + k.replace(/.*-(?=[^-]+$)/, '').toLowerCase(), firstImg(k));
const dims = (k) => `${val(k, 'Height')} × ${val(k, 'Width')} × ${val(k, 'Depth')}`.replace(/ mm/g, '').replace(/(\d)\.(\d)/g, '$1,$2') + ' мм';

const H3 = (k, title, text) => {
  const [l2, l3] = loads(k); const fr = val(k, 'Fire resistance'); const f = finishes(k).map((x) => FIN[x] || x.toLowerCase());
  return product({ cat: 'Скрытые петли · 3D-регулировка', title, sub: 'Регулировка в 3 плоскостях', text,
    specs: [['Размер', dims(k)], ['Нагрузка', `${l2} на 2 петли · ${l3} на 3`.replace(/kg/g, 'кг')], ['Мин. толщина двери', (val(k, 'Minimum door thickness') || '').replace('mm', 'мм')], ['Двери', doors(k)],
      fr && !/^(--|n\.d\.)$/.test(fr) && ['Огнестойкость', fr], f.length && ['Отделки', f.join(', ')]].filter(Boolean), img: I(k) });
};
const row = (k, name, text) => { const [l2, l3] = loads(k); return { name, text, spec: `${dims(k)} · ${l2} / ${l3} (2 / 3 петли)`.replace(/kg/g, 'кг'), img: I(k) }; };

export default {
  key: 'ceam', name: 'CEAM', full: 'Ceam Amadeo S.p.A.', folder: '07_CEAM',
  tagline: 'Скрытые петли для дверей и мебели',
  facts: [
    ['Страна', 'Италия · Черменате (Комо)'],
    ['Основана', '1962, Celesteantonio Amadeo'],
    ['Производство', '100% в Италии'],
    ['Специализация', 'скрытые регулируемые петли'],
  ],
  source: 'ceamitalia.it',
  stories: [
    H3('3d-concealed-door-hinges-1130s', '1130s', 'Бестселлер CEAM среди регулируемых петель: продано более 1 млн штук.'),
    H3('3d-concealed-door-hinges-1130-inox', '1130 Inox', 'Полностью из нержавеющей стали AISI 304L — для сложных погодных условий и яхт.'),
    H3('3d-concealed-door-hinges-1129', '1129', 'Самая компактная в серии S.T.A.R.S.: цельный цинковый сплав, симметричная, глубина всего 18 мм.'),
    H3('3d-concealed-door-hinges-1131s', '1131s', 'Для тяжёлых дверей; испытана для противопожарных дверей до 120 минут.'),
    H3('3d-concealed-door-hinges-1230s', '1230s', 'Реверсивная петля для дверей 35–45 мм; зазор между крыльями 23 мм — обход плинтусов и облицовок.'),
    H3('3d-concealed-door-hinges-1235s', '1235s', 'Прочность цинкового сплава и лёгкость внутренних корпусов из стекловолокна.'),
    H3('1428', '1428', 'Тонкая петля 18 мм для полотен от 22 мм: шкафы и лёгкие межкомнатные двери.'),
    H3('3d-hinges-1429', '1429', 'Цинковый сплав и вставки из стекловолокна в размере 22 мм.'),
    H3('1430', '1430', 'Основа новой серии 14: минималистичный дизайн и широкий выбор отделок.'),
    H3('3d-hinges-1430wb', '1430 WB', 'Wide body: полная реверсивность на дверях толщиной 40 и 44 мм, 12 отделок.'),
    H3('3d-hinges-1431', '1431', 'Реверсивная и симметричная — для входных дверей отелей с доводчиками.'),
    H3('3d-hinges-1432', '1432', 'Для тяжёлых нагрузок: двери в полную высоту, входные с доводчиком, массив.'),
    H3('3d-hinges-1432w', '1432 W', 'Увеличенный зазор между рычагами — облицовка до 8 мм с двух сторон: стекло, дерево, мрамор.'),
    H3('1450', '1450', 'Сверхширокий вылет: до 10 мм припуска фрезеровки с каждой стороны — для облицованных дверей.'),
    H3('cerniere-a-scomparsa-1418', '1418', 'Самая мощная петля со смещением: облицовка до 18 мм со стороны коробки.'),
    list({ cat: 'Скрытые петли · 2D-регулировка', title: '829+804 · 830+800 · 930+800 · 1080', rows: [
      row('2d-concealed-door-hinges-829-804', '829 + 804', 'Регулировка в 2 плоскостях, для деревянных дверей от 24 мм.'),
      row('2d-concealed-door-hinges-830-800', '830 + 800', 'Регулировка в 2 плоскостях, для деревянных дверей от 28 мм.'),
      row('2d-concealed-door-hinges-930-800', '930 + 800', 'Регулировка в 2 плоскостях, для деревянных дверей от 28 мм.'),
      row('glass-door-hinges-1080-glass', '1080 Glass', 'Для дверей из дерева, алюминия и стекла, от 30 мм.'),
    ] }),
    list({ cat: 'Скрытые петли · без регулировки', title: 'Первая серия CEAM', lead: 'Нагрузка от 25 до 90 кг, есть модели из нержавеющей стали.', rows: [
      row('concealed-door-hinges-2010', '2010', 'Нержавеющая сталь; жильё, офис, яхты.'),
      row('concealed-door-hinges-731', '731', 'Для входных и тяжёлых дверей.'),
      row('concealed-door-hinges-831', '831', 'Жильё, коммерческие объекты, офисы.'),
      row('concealed-door-hinges-930', '930', 'Жильё, коммерческие объекты, офисы.'),
      row('concealed-door-hinges-830', '830', 'Жильё и офисы.'),
    ] }),
    list({ cat: 'Скрытые петли · компактные', title: 'Компактные модели', rows: [
      row('concealed-door-hinges-2015', '2015', 'Жильё и офисы; бронза, никель, латунь.'),
      row('832s', '832s', 'Для дверей от 35 мм.'),
      row('829', '829', 'Самая компактная дверная петля серии.'),
      row('929', '929', 'Первая 3D-регулируемая петля CEAM для мебели.'),
    ] }),
    list({ cat: 'Для мебели и аксессуары', title: 'Мебель · механизмы · аксессуары', rows: [
      { name: 'Петли для мебели', text: 'Модели 501–504 и 929: раздвижные столы, фасады с откидным и боковым открыванием.', spec: 'Сталь, нерж. сталь, цинк, латунь', img: img('ceam/furniture', D['cat_concealed-hinges-for-furniture'].imgs[0]) },
      { name: 'Opening systems', text: 'Mercury для вертикальных складных фасадов, тормозные шарниры и газлифты для откидных.', spec: 'Вверх и вниз', img: img('ceam/opening', D['cat_opening-systems'].imgs[0]) },
      { name: 'Аксессуары для петель', text: 'Шаблоны для фрезеровки, ответные части для стальных коробок, планки, клинья, ключи.', spec: 'Для серии S.T.A.R.S.', img: img('ceam/accessories', D['cat_door-accessories'].imgs.find((u) => /img-1|IMG/.test(u))) },
      { name: 'Опоры и фурнитура', text: 'Скрытые опоры для полок, соединители и втулки для корпусов.', spec: 'Цинк, хромированная сталь', img: img('ceam/supports', D['cat_self-support'].imgs.find((u) => /img-/.test(u))) },
    ] }),
  ],
};
