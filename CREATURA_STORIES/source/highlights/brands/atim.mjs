// ATIM — Trasformabili (since 2024 part of the Salice group). Source: salice.com/ww/en/products/trasformabili
import { list, img, balance } from '../lib.mjs';
import data from '../research/salice.json' with { type: 'json' };

const BASE = 'https://www.salice.com';
const RU = {
  'Pull-out column top with cutlery tray': 'Выдвижная столешница колонны с лотком для приборов',
  'Pull-out drawer worktop with cutlery tray': 'Выдвижная рабочая поверхность в ящике с лотком',
  'Pull-out drawer chopping board with cutlery tray': 'Выдвижная разделочная доска с лотком для приборов',
  'Pull-out drawer table with chopping board and cutlery tray': 'Выдвижной стол с разделочной доской и лотком',
  'Pull-out drawer table wit double telescopic folding leg': 'Выдвижной стол из ящика, двойная складная телескопическая опора',
  'Pull-out drawer table with double telescopic folding leg': 'Выдвижной стол из ящика, двойная складная телескопическая опора',
  'Pull-out cabinet table with bridge leg': 'Выдвижной стол из шкафа с П-образной опорой',
  'Pull-out drawer bench with single folding leg': 'Выдвижная скамья из ящика со складной опорой',
  'Pull-out drawer table': 'Выдвижной стол из ящика',
  'Pull-out top flush with shelf': 'Выдвижная столешница вровень с полкой',
  'Pull-out top alligned with shelf': 'Выдвижная столешница вровень с полкой',
  'Pull-out drawer worktop': 'Выдвижная рабочая поверхность из ящика',
  'Pull-out drawer table with single telescopic folding leg': 'Выдвижной стол из ящика, складная телескопическая опора',
  'Tilting top with single telescopic folding leg': 'Откидная столешница со складной телескопической опорой',
  'Pull-out top table with legs': 'Выдвижной стол на опорах',
  'Foldaway top table with legs': 'Складной стол на опорах',
  'Sliding and revolving table top': 'Выдвижная и поворотная столешница',
  'Pull-out ironing board': 'Выдвижная гладильная доска',
  'Tilting ironing board': 'Откидная гладильная доска',
  'Pull-out top alligned with counter top': 'Выдвижная столешница вровень со столешницей',
  'Pull-out drawer worktop with easybook': 'Выдвижная рабочая поверхность с подставкой Easybook',
  'Pull-out top': 'Выдвижная столешница',
  'Sliding table top': 'Выдвижная столешница',
  'Sliding table top with diagonal opening': 'Столешница с диагональным выдвижением',
  'Pull-out drawer table with synchronous system: open/close': 'Выдвижной стол с синхронным открыванием и закрыванием',
  'Drop-leaf foldaway desk': 'Откидной письменный стол',
  'Pull-out column worktop': 'Выдвижная рабочая поверхность колонны',
};
const FIN = { 'Inox Bronzino': 'Inox Bronzino', 'Anodised aluminium (Gray satin)': 'анодированный алюминий', 'Galvanised iron': 'оцинкованная сталь', 'Anodised aluminium': 'анодированный алюминий' };
const spec = (b) => {
  const s = (b || '').replace(/<[^>]+>/g, '|');
  const load = (s.match(/(\d+)\s*kg/) || [])[1];
  const fin = (s.match(/Finishing(?: Runners)?:\s*([^|]+)/) || [])[1]?.trim();
  return [load && `Нагрузка ${load} кг`, fin && (FIN[fin] || fin)].filter(Boolean).join(' · ');
};
const FAM = [
  ['zero', 'ZERO', 'Выдвижные столы и рабочие поверхности, скрытые в ящике или под полкой'],
  ['top', 'TOP', 'Выдвижные и сдвижные столешницы'],
  ['dinamico', 'DINAMICO', 'Многофункциональные решения для компактной кухни'],
  ['duo', 'DUO', 'Столы с двойной опорой и П-образной ножкой'],
  ['mono', 'MONO', 'Столы и скамьи на одной складной опоре'],
  ['living', 'LIVING', 'Версии +39 для гостиной и жилых зон'],
  ['penisola', 'PENISOLA', 'Столы-полуострова на опорах'],
  ['service', 'SERVICE', 'Выдвижные и откидные гладильные доски'],
];
const stories = FAM.flatMap(([k, name, lead]) => {
  const items = data[`/ww/en/products/trasformabili/${k}`].products;
  const parts = balance(items, 5);
  return parts.map((part, i) => list({
    cat: `Trasformabili · ${name}${parts.length > 1 ? ` · ${i + 1}/${parts.length}` : ''}`, title: name, lead,
    rows: part.map((p) => ({ name: p.t, text: RU[p.abstract] || p.abstract, spec: spec(p.b),
      img: img('atim/' + p.u.split('/').pop(), BASE + p.i, { salicePage: BASE + p.u }) })),
  }));
});

export default {
  key: 'atim', name: 'ATIM', full: 'ATIM S.p.A. · группа Salice', folder: '02_ATIM',
  tagline: 'Алюминиевые механизмы для мебели-трансформера',
  facts: [
    ['Страна', 'Италия'],
    ['Профиль', 'фурнитура на основе алюминия для мебели'],
    ['С 2024', 'в составе группы Salice'],
    ['Линия', `Trasformabili · ${FAM.length} семейств, ${FAM.reduce((n, [k]) => n + data['/ww/en/products/trasformabili/' + k].products.length, 0)} решений`],
  ],
  source: 'salice.com · Trasformabili',
  stories,
};
