// FRITSJURGENS — source: fritsjurgens.com (pivot hinge pages)
import { product, list, img } from '../lib.mjs';

const CDN = 'https://cdn.fritsjurgens.com/';
const I = (slug, path) => img('fritsjurgens/' + slug, CDN + path);

export default {
  key: 'fritsjurgens', name: 'FRITSJURGENS', full: 'FritsJurgens', folder: '08_FRITSJURGENS',
  tagline: 'Скрытые системы петель для поворотных (pivot) дверей',
  facts: [
    ['Страна', 'Нидерланды'],
    ['История', 'три поколения, с 1930 года'],
    ['Возможности', 'двери до 500 кг, шириной до 4 м, любой высоты'],
    ['Принцип', 'механизм полностью скрыт внутри двери'],
  ],
  source: 'fritsjurgens.com',
  stories: [
    product({ cat: 'Pivot-системы', title: 'System M+', sub: 'Самозакрывающаяся · гидравлическая · 20–500 кг',
      text: 'Регулируемый контроль каждой фазы движения двери; механизм полностью скрыт внутри полотна.',
      specs: [['Damper Control', 'мягкое закрывание; торможение на 70° защищает стену'], ['30° Speed Control', 'скорость закрывания на последних 30°'], ['Latch Control', 'доводка в защёлку или замок'], ['Фиксация', '0°, 90° и −90°, двустороннее открывание']],
      img: I('system-m-plus', 'm--new-scale-1747309826.png') }),
    product({ cat: 'Pivot-системы', title: 'System One', sub: 'Свободное вращение · 18 мм',
      text: 'Самая компактная pivot-петля FritsJurgens: одна ось вращения, без фиксации и самозакрывания.',
      specs: [['Высота', '18 мм · ширина 32 мм'], ['Толщина двери', 'от 40 мм'], ['Открывание', '90°, 180° (двустороннее) или 360°']],
      img: I('system-one', 'one-new-scale-1747309961.png') }),
    product({ cat: 'Pivot-системы · для тонких профилей', title: 'System One Slim', sub: 'Свободное вращение · 18 мм · класс C, до 209 кг',
      text: 'Для межкомнатных дверей в тонких стальных и алюминиевых профилях; монтаж без адаптеров (ProfileFit).',
      specs: [['Высота', '18 мм сверху и снизу'], ['Вырез в профиле', '114 × 32,4 мм, 2 болта M6'], ['Тяжелее 209 кг', 'System One + Top pivot Reversed, до 500 кг']],
      img: I('system-one-slim', 'products/system-one-slim/slim-one-front-r5.jpg') }),
    product({ cat: 'Pivot-системы', title: 'System Fx', sub: 'Фиксация каждые 90° · 20–500 кг',
      text: 'Сильная фиксация в положениях через каждые 90°; минималистичная и долговечная система для межкомнатных дверей.',
      specs: [['Высота', '38 мм · ширина 32 мм'], ['Толщина двери', 'от 40 мм'], ['Возврат', 'в ближайшую позицию с ±10°']],
      img: I('system-fx', 'fx-new-scale-1747309868.png') }),
    product({ cat: 'Pivot-системы · для тонких профилей', title: 'System Fx Slim', sub: 'Фиксация · 18 мм · класс C, до 209 кг',
      text: 'Первая и единственная pivot-система с фиксацией высотой всего 18 мм; дверь фиксируется каждые 90°.',
      specs: [['Фиксация', '0°, 90°, 180°, 270°'], ['Между позициями', 'свободный ход, доводка в пределах 10°'], ['Монтаж', 'ProfileFit, без адаптеров']],
      img: I('system-fx-slim', 'products/system-fx-slim/slim-fx-front-r5.jpg') }),
    product({ cat: 'Pivot-системы', title: 'System 3', sub: 'Вращение 360° · фиксация',
      text: 'Pivot-система с вращением на 360° и несколькими позициями фиксации — идеальна для поворотных стен.',
      specs: [['Фиксация', '0°, 90°, 180°, 270°'], ['Доводка', 'с каждых 45° к ближайшей позиции'], ['Применение', 'поворотные стены и перегородки']],
      img: I('system-3', '3-new-scale.png') }),
    list({ cat: 'Компоненты', title: 'Верхние оси · напольные плиты', rows: [
      { name: 'Top pivot 70 mm', text: 'Универсальная верхняя ось: точка вращения от 70 мм до середины двери.', spec: 'Классы B / G · One, 3, M+, Fx', img: I('tp70', 'tp70-g-new-scale.png') },
      { name: 'Top pivot 40 mm', text: 'Фиксированная точка вращения 40 мм — максимум проёма.', spec: 'Классы B / G · One, M+, Fx', img: I('tp40', 'tp40-g-scale.png') },
      { name: 'Top pivot Reversed', text: 'Верхняя ось для тяжёлых дверей.', spec: 'До 500 кг с System One', img: I('tpr', 'tpr-new-scale.png') },
      { name: 'Напольные плиты', text: 'Единственная видимая деталь у пола; монтаж на 8 мм в пол, регулировка ±2,5°.', spec: '80 × 40 × 9 мм · нерж. сталь, PVD чёрный', img: I('floor-plate', 'products/floorplates/floor-plate-fp-m-s-ss-top-r1.jpg') },
    ] }),
    list({ cat: 'Аксессуары', title: 'Flush · Hexagon Guide · Axle Wrench', rows: [
      { name: 'Flush', text: 'Пара сильных магнитов: выравнивает pivot-дверь вровень со стеной или соседней дверью.', spec: 'Монтаж в низ двери и в стену', img: I('flush', 'sites/1/2019/05/fritsjurgens-flush-slider.png') },
      { name: 'Hexagon Guide', text: 'Упрощает монтаж верхней оси, если точка вращения дальше 280 мм от края.', spec: 'Регулировка зазоров ключом', img: I('hexagon', 'sites/1/2019/04/hexagon-guide-fritsjurgens.png') },
      { name: 'Axle Wrench', text: 'Ключ для поворота шпинделя при монтаже двери с System M+.', spec: 'Для System M+', img: I('axle-wrench', 'sites/1/2019/09/axle-wrench-1.png') },
    ] }),
  ],
};
