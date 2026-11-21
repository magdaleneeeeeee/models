// SALICE PAOLO — source: salicepaolo.it (EN product listings: model name, article code, official photo)
import { grid, img, balance } from '../lib.mjs';
import D from '../research/salicepaolo.json' with { type: 'json' };

const BASE = 'https://www.salicepaolo.it';
const items = (...keys) => {
  const seen = new Set();
  return keys.flatMap((k) => D[`/en/products/${k}/`].items).filter((x) => {
    const n = x.name.trim().toLowerCase().replace(/\s+/g, ' ');
    if (!n || seen.has(n)) return false; seen.add(n); return true;
  }).map((x) => ({
    name: x.name.trim().replace(/^(\w)(\w*)$/u, (a, b, c) => (a === a.toUpperCase() ? b + c.toLowerCase() : a)).replace(/^[a-z]/, (c) => c.toUpperCase()),
    code: (x.cod || '').replace(/^Cod\s*/i, '').trim(),
    img: img('salicepaolo/' + x.u.replace(/^\/en\/products\//, '').replace(/\/$/, '').replace(/\//g, '-').toLowerCase(), BASE + x.img.replace('preview_', '')),
  }));
};
const grids = (cat, title, list, { max = Infinity, note } = {}) => {
  const all = list.slice(0, max); const parts = balance(all, 6);
  return parts.map((p, i) => grid({ cat, title: title + (parts.length > 1 ? ` · ${i + 1}/${parts.length}` : ''), items: p,
    note: i === parts.length - 1 ? (note || (list.length > all.length ? `и ещё ${list.length - all.length} моделей — в каталоге` : undefined)) : undefined }));
};

export default {
  key: 'salicepaolo', name: 'SALICE PAOLO', full: 'Salice Paolo S.r.l.', folder: '06_SALICE_PAOLO',
  tagline: 'Латунные ручки и фурнитура: Classic и Timeless',
  facts: [
    ['Страна', 'Италия · Канту'],
    ['С 1937 года', 'семейное производство изделий из латуни'],
    ['Производство', 'разработано, изготовлено и отделано в Италии'],
    ['Линии', 'Classic · Timeless · Bathroom'],
  ],
  source: 'salicepaolo.it',
  stories: [
    ...grids('Timeless · дверные ручки', 'Timeless', items('handles-113')),
    ...grids('Timeless · кнопки', 'Timeless · кнопки', items('knobs-115')),
    ...grids('Timeless · ручки-скобы', 'Timeless · скобы', items('door-pull-116')),
    ...grids('Timeless · мебельные ручки', 'Timeless · для мебели', items('furniture-handles-and-knobs')),
    ...grids('Classic · дверные ручки', 'Classic', items('handles')),
    ...grids('Classic · кнопки', 'Classic · кнопки', items('knobs'), { max: 12 }),
    ...grids('Classic · ручки-скобы', 'Classic · скобы', items('door-pull'), { max: 12 }),
    ...grids('Classic · входные гарнитуры', 'Entrance set', items('entrance-set')),
    ...grids('Classic · мебельные ручки', 'Classic · для мебели', items('furniture-stud'), { max: 12 }),
    ...grids('Bathroom · аксессуары', 'Calliope · Zeus', [...items('calliope-135').slice(0, 3), ...items('zeus-136').slice(0, 3)],
      { note: 'Серии Calliope (14 позиций) и Zeus (19 позиций)' }),
  ],
};
