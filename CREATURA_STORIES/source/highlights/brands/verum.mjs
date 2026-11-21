// VERUM ITALY — source: verumitaly.com (EN pages: Nuda collection, model pages, systems)
import { product, list, img } from '../lib.mjs';
import M from '../research/verum_models.json' with { type: 'json' };
import C from '../research/verum.json' with { type: 'json' };

const FINISH = /^(Satin Chrome|Polished Chrome|Moon Grey|Etna Black|Monviso White|Venezia Gold|Yester Bronze|Bronzo Yester|Sahara Gold|Cenote Blue|Blue Cenote|Ghisa Grey|Nero etna|Cromo lucido|Cromo satinato|Bronzo yester|Bianco monviso|Grigio Moon|Satin chrome|Monviso white|SAHARA GOLD|SPACE|MERCURY|JUPITER|URANUS|Marmo .*)$/i;
const norm = (f) => f.replace(/^Bronzo Yester$/i, 'Yester Bronze').replace(/^Blue Cenote$/i, 'Cenote Blue').replace(/^Nero etna$/i, 'Etna Black').replace(/^Cromo lucido$/i, 'Polished Chrome')
  .replace(/^Cromo satinato$/i, 'Satin Chrome').replace(/^Bronzo yester$/i, 'Yester Bronze').replace(/^Bianco monviso$/i, 'Monviso White').replace(/^Grigio Moon$/i, 'Moon Grey')
  .replace(/^Marmo nero Marquinia lucido$/i, 'мрамор Nero Marquina').replace(/^Marmo bianco di Carrara lucido$/i, 'мрамор Bianco Carrara')
  .replace(/^SAHARA GOLD$/, 'Sahara Gold').replace(/^(SPACE|MERCURY|JUPITER|URANUS)$/, (m) => m[0] + m.slice(1).toLowerCase()).replace(/\b(\w)(\w*)\b/g, (a, b, c) => (/^[a-z]/.test(a) ? b.toUpperCase() + c : a));
const finishes = (k) => [...new Set(M[k].text.filter((l) => FINISH.test(l)).map(norm))];
const designer = (k) => (M[k].text.find((l) => /^DESIGN /.test(l)) || '').replace(/^DESIGN /, '').toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
const I = (k, re) => img('verum/' + k, (re && M[k].imgs.find((u) => re.test(u))) || M[k].imgs[0]);
const N = (k, title, text, re, extra = []) => {
  const f = finishes(k); const d = designer(k);
  return product({ cat: 'NUDA · ручки без розетки', title, sub: d ? `design ${d}` : 'Verum Italy', text,
    specs: [...extra, ['Монтаж', 'без розетки · патент Verum'], f.length && ['Отделки', `${f.length}: ${f.join(', ')}`]].filter(Boolean), img: I(k, re) });
};
const CI = (k, re, i = 0) => img('verum/' + k + (i ? '-' + i : ''), (re && C[k].imgs.find((u) => re.test(u))) || C[k].imgs[i]);

export default {
  key: 'verum', name: 'VERUM', full: 'Verum Italy S.r.l.', folder: '05_VERUM',
  tagline: 'Дверные ручки без розетки и дизайнерская фурнитура',
  facts: [
    ['Страна', 'Италия · Брианца'],
    ['Опыт', 'более 20 лет в архитектуре и интерьере'],
    ['Nuda', 'единственная коллекция ручек без розетки'],
    ['Патенты', 'собственные запатентованные системы'],
  ],
  source: 'verumitaly.com',
  stories: [
    product({ cat: 'Коллекция NUDA', title: 'NUDA', sub: 'Ручки без розетки',
      text: 'Убрали всё лишнее — осталась только ручка. Эксклюзивная технология Verum позволяет установить её без розетки на дверь любой толщины и типа.',
      specs: [['Моделей', '15 и более'], ['Также', 'оконные, для раздвижных, стеклянных и бронированных дверей']], img: CI('nuda', null) }),
    N('serie-85-handle', 'Serie 85', 'Текучий и непрерывный объём, мягкие органичные формы. В серии — ручка, полуручка и кнопка.', null, [['Серия', 'Handle · Half Handle · Knob']]),
    N('nora', 'Nora', 'Рукоять и основание сливаются без перехода; профиль естественно сужается — лёгкий и уверенный баланс.', /Nora-Nero-Etna/),
    N('gala', 'Gala', 'Синтез пропорции и сдержанности: архитектурная ясность без лишних элементов.', /Cromo-Satinato/),
    N('lieve', 'Lieve', 'Лёгкая минималистичная ручка коллекции Nuda.', /chromo_satinato/),
    N('baar', 'Baar', 'Ручка коллекции Nuda с чистой геометрией.', /cromo_satinato/),
    N('wind', 'Wind', 'Ручка коллекции Nuda.', /cromo_satinato/),
    N('atlanta', 'Atlanta', 'Ручка коллекции Nuda.', /cromo_satinato/),
    N('pure', 'Pure', 'Ручка коллекции Nuda с самой широкой палитрой отделок.', /cromo_satinato/),
    N('pepe', 'Pepe', 'Ручка коллекции Nuda.', /cromo_satinato/),
    N('7900-2', '7900', 'Первая алюминиевая ручка Verum: лёгкая, современная, с простым минималистичным дизайном.', /Space-scaled/, [['Материал', 'алюминий']]),
    N('cham', 'Cham', 'Ручка-кнопка коллекции Nuda.', /cromo_lucido/),
    N('soap', 'Soap', 'Ручка-кнопка коллекции Nuda.', /cromo_satinato/),
    N('lui', 'Lui · Lui Marmo', 'Кнопка коллекции Nuda; версия Lui Marmo — из полированного мрамора.', /cromo_satinato/, [['Lui Marmo', 'мрамор Nero Marquina, Bianco Carrara']]),
    product({ cat: 'Ручки', title: 'SNAPP', sub: 'design Alessandro Stabile',
      text: 'Ручка из переработанного пластика — старых рыболовных сетей, поднятых из океана. Партнёр — Oceanworks.',
      specs: [['Цвета', 'чёрный, серо-коричневый (taupe), синий']], img: CI('handle-snapp', /snapp-nero/) }),
    list({ cat: 'Системы NUDA', title: 'Dummy · замки · окна', rows: [
      { name: 'Dummy · Dummy Clever', text: 'Патентованный цилиндр для крепления ручки без замка; Clever держит дверь закрытой магнитом.', spec: 'Для всех моделей Nuda', img: CI('dummy', null) },
      { name: 'Замки', text: 'Магнитные и механические замки, ответные планки в отделках Nuda.', spec: 'Made in Italy · UNI EN 12209', img: CI('locks', /Magnetica-Cromo-sat/) },
      { name: 'Оконные ручки', text: 'Любая модель Nuda — в оконной версии: механизм Mini DK Ø 29 мм или Slim 24 мм.', spec: '4 и 8 положений', img: CI('window-handles', null) },
      { name: 'Lift & Slide', text: 'Ручки для подъёмно-раздвижных дверей Round, Square и Mini.', spec: 'Ниша, цилиндр, двойная', img: CI('lift-and-slide-handles', null) },
    ] }),
    list({ cat: 'Раздвижные и стеклянные двери', title: 'Sliding · Glass', rows: [
      { name: 'Для деревянных раздвижных', text: 'Врезные ручки Miles (design Studio Klass), ручки-ниши и с поворотником.', spec: 'В отделках Nuda', img: CI('sliding-wooden-doors', /Miles-Oro/) },
      { name: 'Для стеклянных раздвижных', text: 'Ручки Vulcano, Yoyo, Cham, Tondo для стеклянных дверей.', spec: 'Etna Black, Milano Grey, Monviso White и др.', img: CI('sliding-glass-door', null) },
      { name: 'Накладки для стекла', text: 'Total Glass для ручек Nuda, Glass Frame для профиля, Vulcano Lock с замком и Push & Pull.', spec: 'Распашные и раздвижные', img: CI('glass-plates', /\/1-scaled/) },
      { name: 'Ironlev', text: 'Раздвижные системы на магнитной левитации: Party для перегородок, D-Way для дверей.', spec: 'D-Way — до 80 кг, высота до 3 м', img: CI('sliding-systems-for-interiors', null) },
    ] }),
    list({ cat: 'Аксессуары', title: 'Накладки · Stoppino · Rigo', rows: [
      { name: 'Декоративные пластины', text: 'Clock, Bespoke (имена, логотипы, номера), Shadow, Round, Square.', spec: 'Монтаж и на готовую дверь', img: CI('window-handles-2', /orologio-1/) },
      { name: 'Stoppino', text: 'Минималистичный магнитный стопор: Open — напольный, X — на дверь, Close — магнитное закрывание.', spec: 'Клеевой монтаж без сверления', img: CI('stoppino', /verum_stoppino_open/) },
      { name: 'Rigo', text: 'Алюминиевая ручка-скоба для входных дверей, Round и Square.', spec: 'Анодирование · дерево и стекло', img: CI('pull-handle', null) },
      { name: 'Privacy, накладки, шайбы', text: 'Фиксаторы Punto, Atlanta, Pure/Wind; накладки под ключ и цилиндр; шайбы Ø 24 / 30 / 45.', spec: 'Во всех отделках Nuda', img: CI('privacy-sets', null) },
    ] }),
  ],
};
