// CREATURA — content of all 50 stories (21–30.11.2026), minimal white-studio style.
// Edit texts here and run `node source/build.mjs` to re-render.
// model / maker → lockup "MODEL by MAKER";  wm → wordmark at the bottom (default = maker);  tag → small caption top-right.
// Media: `file` = base name expected in assets/photos (jpg/png/webp/tif) or assets/video (mp4/mov); `alt` = substitutes.
//   Packshots ("cut" slots) should be shot or cut out on pure white, as in catalogue photography.
// Copy follows the brief verbatim; no technical specifications are added.
// `type` = composition type from brief §6 (checked: never more than twice in a row).

const P = (file, note, alt = []) => ({ file, kind: 'photo', note, alt });
const V = (file, note, alt = []) => ({ file, kind: 'video', note, alt });
const T = 't-white';

export const days = [
  { folder: '01_NOVEMBER_21', date: '21.11', theme: 'ALUMOVE + пантографы' },
  { folder: '02_NOVEMBER_22', date: '22.11', theme: 'STV / замки' },
  { folder: '03_NOVEMBER_23', date: '23.11', theme: 'ATIM' },
  { folder: '04_NOVEMBER_24', date: '24.11', theme: 'CEAM / петли' },
  { folder: '05_NOVEMBER_25', date: '25.11', theme: 'VERUM / NUDA 5+' },
  { folder: '06_NOVEMBER_26', date: '26.11', theme: 'AIRCUBE + ALUMOVE' },
  { folder: '07_NOVEMBER_27', date: '27.11', theme: 'STV / замки (вторая модель)' },
  { folder: '08_NOVEMBER_28', date: '28.11', theme: 'ATIM + пантографы' },
  { folder: '09_NOVEMBER_29', date: '29.11', theme: 'VERUM / TIMELESS' },
  { folder: '10_NOVEMBER_30', date: '30.11', theme: 'CEAM / петли (вторая модель)' },
];

export const stories = [
  /* ───────────── 21.11 — ALUMOVE + PANTOGRAPH ───────────── */
  { day: 0, n: 1, name: 'Alumove — hero product', type: 'full', layout: 'fullBleed', theme: T, brand: 'alumove', maker: 'ALUMOVE',
    lines: ['Алюминиевые решения для современной мебели.'],
    media: { main: P('alumove_01_hero_furniture', 'Готовая мебельная конструкция с системой Alumove, крупный план профиля, мягкий боковой свет', ['alumove_hero']) } },

  { day: 0, n: 2, name: 'Alumove — material details', type: 'macro', layout: 'macroBlock', theme: T, brand: 'alumove', maker: 'ALUMOVE', caption: 'Material details',
    lines: ['Детали, которые формируют качество готового изделия.', 'ALUMOVE — для мебельных проектов, где важна каждая линия.'],
    media: { main: P('alumove_02_macro_joint', 'Макро: алюминиевый профиль, стыки и соединения, светло-серый фон') } },

  { day: 0, n: 3, name: 'Pantograph — function', type: 'motion', layout: 'video', theme: T, brand: 'pantograph', model: 'Пантограф', wm: 'CREATURA', caption: 'In motion',
    lines: ['Функциональное решение для верхних секций гардеробной.'],
    media: { main: V('pantograph_03_motion', 'Открытый шкаф, пантограф в установленном положении; видео или кадр механизма в движении', ['pantograph_03_open_wardrobe']) } },

  { day: 0, n: 4, name: 'Pantograph — mechanism', type: 'technical', layout: 'twoStates', theme: T, brand: 'pantograph', wm: 'CREATURA', tag: 'Пантограф',
    lines: ['Продуманная механика для современной гардеробной системы.'], states: ['Верхнее положение', 'Рабочее положение'],
    media: { a: P('pantograph_04_position_up', 'Механизм в верхнем положении; крепления и рычаги'),
             b: P('pantograph_04_position_down', 'Механизм в опущенном (рабочем) положении') } },

  { day: 0, n: 5, name: 'B2B call to action', type: 'closing', layout: 'cta', theme: T, brand: 'pantograph', wm: 'CREATURA',
    q: 'Комплектуете мебельные проекты?', lines: ['Подберём фурнитуру под ваши задачи.'], linesY: 1200, ctaY: 1300, cta: 'Запросите каталог в Creatura.',
    media: { main: P('pantograph_05_wardrobe_best', 'Лучшее фото гардеробной с установленным пантографом', ['pantograph_03_open_wardrobe']) } },

  /* ───────────── 22.11 — STV / LOCKS ───────────── */
  { day: 1, n: 1, name: 'STV — model presentation', type: 'full', layout: 'hero', theme: T, brand: 'stv', maker: 'STV',
    lines: ['Замки для современных дверных решений.'],
    media: { main: P('stv_model1_01_product', 'Конкретная модель замка STV на белом фоне, высокое разрешение') } },

  { day: 1, n: 2, name: 'STV — product details', type: 'technical', layout: 'details', theme: T, brand: 'stv', maker: 'STV',
    lines: ['Конструкция, в которой важна каждая деталь.'], legend: ['Корпус замка', 'Лицевая планка', 'Язычок'],
    media: { main: P('stv_model1_02_overview', 'Замок STV целиком, вид сбоку, белый фон', ['stv_model1_01_product']),
             d1: P('stv_model1_02_body', 'Корпус замка'), d2: P('stv_model1_02_faceplate', 'Лицевая планка'), d3: P('stv_model1_02_latch', 'Язычок') } },

  { day: 1, n: 3, name: 'STV — mechanism', type: 'motion', layout: 'video', theme: T, brand: 'stv', maker: 'STV', caption: 'Mechanism', variant: 'full',
    lines: ['Механизм STV в действии.', 'Оцените конструкцию и исполнение модели.'],
    media: { main: V('stv_model1_03_mechanism', 'Видео работы механизма, крупный план движения деталей') } },

  { day: 1, n: 4, name: 'STV — installed product', type: 'context', layout: 'interior', theme: T, brand: 'stv', maker: 'STV', caption: 'Торец двери',
    lines: ['STV для производителей дверей и профессиональных проектов.'],
    media: { main: P('stv_model1_04_installed', 'Замок в установленной двери, интерьерный кадр, акцент на торцевой части двери') } },

  { day: 1, n: 5, name: 'STV — commercial', type: 'closing', layout: 'cta', theme: T, brand: 'stv', maker: 'STV',
    q: 'Подбираете замки для дверного производства?', cta: 'Запросите каталог STV и условия заказа.', ctaY: 1330,
    media: { main: P('stv_model1_05_packshot', 'Предметная фотография замка STV, белый фон', ['stv_model1_01_product']) } },

  /* ───────────── 23.11 — ATIM ───────────── */
  { day: 2, n: 1, name: 'ATIM — brand hero', type: 'full', layout: 'stack', theme: T, brand: 'atim', maker: 'ATIM',
    lines: ['Итальянские решения для современной мебели.'],
    media: { v1: P('atim_01_product', 'Конкретная модель ATIM, общий вид, белый фон, выразительная мягкая тень'),
             v2: P('atim_01_side', 'Та же модель, вид сбоку, белый фон'),
             macro: P('atim_01_macro', 'Макро-кадр той же модели на светло-сером фоне') } },

  { day: 2, n: 2, name: 'ATIM — functionality', type: 'motion', layout: 'video', theme: T, brand: 'atim', maker: 'ATIM', caption: 'Full cycle',
    lines: ['Функциональность, заложенная в конструкцию.'],
    media: { main: V('atim_02_motion', 'Видео работы механизма — полное движение изделия') } },

  { day: 2, n: 3, name: 'ATIM — engineering details', type: 'macro', layout: 'mosaic', theme: T, brand: 'atim', maker: 'ATIM',
    lines: ['Инженерная составляющая мебельного решения.'], legend: ['Соединения', 'Крепления', 'Материалы', 'Движущиеся элементы'],
    media: { d1: P('atim_03_macro_joints', 'Макро: соединения'), d2: P('atim_03_macro_mounts', 'Макро: крепления'),
             d3: P('atim_03_macro_material', 'Макро: материал / поверхность'), d4: P('atim_03_macro_moving', 'Макро: движущиеся элементы') } },

  { day: 2, n: 4, name: 'ATIM — in furniture', type: 'context', layout: 'fullBleed', theme: T, brand: 'atim', maker: 'ATIM',
    lines: ['ATIM в проектах современной корпусной мебели.'],
    media: { main: P('atim_04_interior', 'Механизм в готовой мебели: общий интерьерный план или крупный план установленного изделия') } },

  { day: 2, n: 5, name: 'ATIM — B2B CTA', type: 'closing', layout: 'cta', theme: T, brand: 'atim', maker: 'ATIM',
    q: 'Для мебельных производств и дизайнерских проектов.', cta: 'Запросите каталог ATIM в Creatura.', ctaY: 1330,
    media: { main: P('atim_05_packshot', 'Изделие ATIM, предметный кадр', ['atim_01_product']) } },

  /* ───────────── 24.11 — CEAM / HINGES ───────────── */
  { day: 3, n: 1, name: 'CEAM — product hero', type: 'full', layout: 'stack', theme: T, brand: 'ceam', maker: 'CEAM',
    lines: ['Петли для современных дверных систем.'],
    media: { v1: P('ceam_model1_01_product', 'Конкретная модель петли CEAM, фронтальный вид, белый фон'),
             v2: P('ceam_model1_01_side', 'Та же петля, вид сбоку / в раскрытом положении'),
             macro: P('ceam_model1_01_macro', 'Макро-кадр петли на светло-сером фоне') } },

  { day: 3, n: 2, name: 'CEAM — macro details', type: 'macro', layout: 'mosaic', theme: T, brand: 'ceam', maker: 'CEAM',
    lines: ['Точность исполнения в каждой детали.'], legend: ['Корпус', 'Шарнирные элементы', 'Крепления', 'Поверхность'],
    media: { d1: P('ceam_model1_02_body', 'Макро: корпус петли'), d2: P('ceam_model1_02_pivot', 'Макро: шарнирные элементы'),
             d3: P('ceam_model1_02_mounts', 'Макро: крепления'), d4: P('ceam_model1_02_surface', 'Макро: поверхность изделия') } },

  { day: 3, n: 3, name: 'CEAM — motion', type: 'motion', layout: 'video', theme: T, brand: 'ceam', maker: 'CEAM', caption: 'In motion', variant: 'full',
    lines: ['Конструкция CEAM в работе.'],
    media: { main: V('ceam_model1_03_door_opening', 'Видео открывания двери — работа установленной петли') } },

  { day: 3, n: 4, name: 'CEAM — application', type: 'context', layout: 'interior', theme: T, brand: 'ceam', maker: 'CEAM', caption: 'Application', variant: 'bleed',
    lines: ['Для производителей дверей и профессиональных монтажных проектов.'],
    media: { main: P('ceam_model1_04_interior', 'Петля в установленном состоянии, дверное полотно, архитектурный интерьер') } },

  { day: 3, n: 5, name: 'CEAM — CTA', type: 'closing', layout: 'ctaGrid', theme: T, brand: 'ceam', maker: 'CEAM', count: 3,
    q: 'Подбираете петли для дверных проектов?', cta: 'Запросите каталог CEAM в Creatura.',
    media: { m1: P('ceam_05_collection_1', 'Петля CEAM — модель 1, белый фон'), m2: P('ceam_05_collection_2', 'Петля CEAM — модель 2'), m3: P('ceam_05_collection_3', 'Петля CEAM — модель 3') } },

  /* ───────────── 25.11 — VERUM / NUDA 5+ ───────────── */
  { day: 4, n: 1, name: 'Verum Nuda 5+ — hero', type: 'full', layout: 'hero', theme: T, brand: 'verum', model: 'NUDA 5+', maker: 'VERUM',
    lines: ['Минимализм в деталях дверной фурнитуры.'],
    media: { main: P('verum_nuda5_01_hero', 'Оригинальная фотография ручки NUDA 5+, крупный предметный кадр на белом') } },

  { day: 4, n: 2, name: 'Nuda 5+ — design', type: 'editorial', layout: 'stack', theme: T, brand: 'verum', model: 'NUDA 5+', maker: 'VERUM',
    lines: ['Чистая геометрия. Выразительная форма. Ничего лишнего.'],
    media: { v1: P('verum_nuda5_02_angle_side', 'NUDA 5+, вид сбоку, белый фон'), v2: P('verum_nuda5_02_angle_front', 'NUDA 5+, фронтальный вид с розеткой, белый фон'),
             macro: P('verum_nuda5_02_macro', 'Крупный план формы (изгиб ручки), светло-серый фон') } },

  { day: 4, n: 3, name: 'Nuda 5+ — finishes', type: 'technical', layout: 'finishes', theme: T, brand: 'verum', model: 'NUDA 5+', maker: 'VERUM',
    lines: ['Варианты отделки для разных интерьерных концепций.'], finishes: ['Отделка 01', 'Отделка 02', 'Отделка 03', 'Отделка 04'],
    media: { main: P('verum_nuda5_03_finishes_group', 'Групповой кадр ручек в реальных вариантах отделки, белый фон'),
             fin1: P('verum_nuda5_finish_1', 'Образец реальной отделки №1 (название — по каталогу Verum)'),
             fin2: P('verum_nuda5_finish_2', 'Образец реальной отделки №2'), fin3: P('verum_nuda5_finish_3', 'Образец реальной отделки №3'),
             fin4: P('verum_nuda5_finish_4', 'Образец реальной отделки №4') } },

  { day: 4, n: 4, name: 'Nuda 5+ — interior', type: 'context', layout: 'interior', theme: T, brand: 'verum', model: 'NUDA 5+', maker: 'VERUM', caption: 'Interior',
    lines: ['Дверная фурнитура — часть архитектуры интерьера.'],
    media: { main: P('verum_nuda5_04_interior', 'Ручка на установленной двери, архитектурный интерьер, акцент на изделие') } },

  { day: 4, n: 5, name: 'Nuda 5+ — offer', type: 'closing', layout: 'offer', theme: T, brand: 'verum', model: 'NUDA 5+', maker: 'VERUM',
    figure: '5%', lines: ['Скидка 5% по программе Verum Nuda 5+.'], cta: 'Запросите каталог и условия заказа.',
    media: { main: P('verum_nuda5_05_closeup', 'Красивый крупный кадр NUDA 5+ на белом', ['verum_nuda5_01_hero']) } },

  /* ───────────── 26.11 — AIRCUBE + ALUMOVE ───────────── */
  { day: 5, n: 1, name: 'AirCube — product', type: 'full', layout: 'hero', theme: T, brand: 'aircube', maker: 'AIRCUBE', align: 'left',
    lines: ['Функциональные решения для мебельных проектов.'],
    media: { main: P('aircube_01_product', 'Конкретное изделие AirCube, предметная фотография на белом, минималистичная композиция') } },

  { day: 5, n: 2, name: 'AirCube — details', type: 'macro', layout: 'macroBlock', theme: T, brand: 'aircube', maker: 'AIRCUBE', caption: 'Details',
    lines: ['Внимание к деталям — основа качественного решения.'],
    media: { main: P('aircube_02_macro', 'Макросъёмка изделия AirCube: конструкция, отделка; светло-серый фон') } },

  { day: 5, n: 3, name: 'Alumove — system', type: 'editorial', layout: 'fullBleed', theme: T, brand: 'alumove', maker: 'ALUMOVE',
    lines: ['Алюминиевые системы для современной мебели.'],
    media: { main: P('alumove_06_furniture', 'Алюминиевая система, общий вид, фотография готовой мебели', ['alumove_01_hero_furniture']) } },

  { day: 5, n: 4, name: 'Alumove — details', type: 'technical', layout: 'details', theme: T, brand: 'alumove', maker: 'ALUMOVE',
    lines: ['Архитектура мебельного фасада начинается с правильного выбора комплектующих.'], legend: ['Профиль', 'Стыки', 'Соединения'],
    media: { main: P('alumove_06_profile_overview', 'Профиль Alumove целиком на белом фоне'),
             d1: P('alumove_06_profile', 'Крупный план: профиль'), d2: P('alumove_06_joints', 'Крупный план: стыки', ['alumove_02_macro_joint']),
             d3: P('alumove_06_connections', 'Крупный план: соединения') } },

  { day: 5, n: 5, name: 'AirCube + Alumove — commercial', type: 'split', layout: 'split', theme: T, brand: 'aircube', wm: 'CREATURA',
    labels: ['AirCube', 'Alumove'], q: 'Два направления для профессиональных мебельных проектов.', cta: 'Запросите каталоги в Creatura.',
    media: { left: P('aircube_05_split', 'AirCube — левая половина, единая цветовая обработка', ['aircube_01_product']),
             right: P('alumove_05_split', 'Alumove — правая половина, единая цветовая обработка', ['alumove_06_furniture', 'alumove_01_hero_furniture']) } },

  /* ───────────── 27.11 — STV / LOCKS (MODEL 2) ───────────── */
  { day: 6, n: 1, name: 'STV — second model hero', type: 'full', layout: 'stack', theme: T, brand: 'stv', maker: 'STV',
    lines: ['Ещё одно решение в линейке дверных замков.'],
    media: { v1: P('stv_model2_01_product', 'Другая модель замка STV (не та, что 22.11), вид сбоку, белый фон'),
             v2: P('stv_model2_01_faceplate', 'Та же модель, вид на лицевую планку, белый фон'),
             macro: P('stv_model2_01_macro', 'Макро-кадр модели на светло-сером фоне') } },

  { day: 6, n: 2, name: 'STV — second model construction', type: 'macro', layout: 'macroBlock', theme: T, brand: 'stv', maker: 'STV', caption: 'Construction',
    lines: ['Рассматриваем конструкцию и исполнение модели.'],
    media: { main: P('stv_model2_02_macro', 'Макросъёмка конструкции второй модели STV') } },

  { day: 6, n: 3, name: 'STV — second model in motion', type: 'motion', layout: 'video', theme: T, brand: 'stv', maker: 'STV', caption: 'Mechanism',
    lines: ['Демонстрация механизма STV в работе.'],
    media: { main: V('stv_model2_03_mechanism', 'Видео работы замка (вторая модель)') } },

  { day: 6, n: 4, name: 'STV — comparison', type: 'comparison', layout: 'pair', theme: T, brand: 'stv', maker: 'STV',
    q: 'Разные модели — разные задачи.', labels: ['STV · модель 01', 'STV · модель 02'], lines: ['Подбор под конструкцию и требования проекта.'],
    media: { m1: P('stv_model1_01_product', 'Модель 1 (из 22.11) — тот же ракурс и свет, что у модели 2'), m2: P('stv_model2_01_product', 'Модель 2 (из 27.11)') } },

  { day: 6, n: 5, name: 'STV — commercial closing', type: 'closing', layout: 'cta', theme: T, brand: 'stv', maker: 'STV', qSize: 50,
    q: 'Производите двери или работаете с дверными проектами?', cta: 'Запросите ассортимент STV и условия сотрудничества.', ctaY: 1330,
    media: { main: P('stv_model2_05_packshot', 'Предметный кадр STV на белом', ['stv_model2_01_product']) } },

  /* ───────────── 28.11 — ATIM + PANTOGRAPH ───────────── */
  { day: 7, n: 1, name: 'ATIM — in furniture', type: 'context', layout: 'interior', theme: T, brand: 'atim', maker: 'ATIM', caption: 'In furniture', variant: 'bleed',
    lines: ['Функциональная фурнитура для современной корпусной мебели.'],
    media: { main: P('atim_08_in_furniture', 'Конкретная модель механизма ATIM в готовой мебели', ['atim_04_interior']) } },

  { day: 7, n: 2, name: 'ATIM — full cycle video', type: 'motion', layout: 'video', theme: T, brand: 'atim', maker: 'ATIM', caption: 'Full cycle', variant: 'full',
    lines: ['Показываем возможности механизма в реальном использовании.'],
    media: { main: V('atim_08_full_cycle', 'Видео полного цикла работы механизма ATIM', ['atim_02_motion']) } },

  { day: 7, n: 3, name: 'Pantograph — wardrobe', type: 'context', layout: 'fullBleed', theme: T, brand: 'pantograph', model: 'Пантограф', wm: 'CREATURA',
    lines: ['Решение для эффективной организации верхних секций шкафа.'],
    media: { main: P('pantograph_08_wardrobe', 'Пантограф в гардеробной системе', ['pantograph_05_wardrobe_best']) } },

  { day: 7, n: 4, name: 'Pantograph — mechanism', type: 'technical', layout: 'twoStates', theme: T, brand: 'pantograph', wm: 'CREATURA', tag: 'Пантограф',
    lines: ['Продуманная механика для современных гардеробных систем.'], states: ['Крепления', 'Опускание штанги'],
    media: { a: P('pantograph_08_macro_mounts', 'Макросъёмка креплений пантографа', ['pantograph_04_position_up']),
             b: V('pantograph_08_rod_lowering', 'Видео опускания штанги', ['pantograph_03_motion']) } },

  { day: 7, n: 5, name: 'ATIM + Pantograph — commercial', type: 'closing', layout: 'ctaGrid', theme: T, brand: 'atim', wm: 'CREATURA', count: 2,
    q: 'Комплектуете корпусную мебель и гардеробные?', labels: ['ATIM', 'Пантограф'], cta: 'Подберём механизмы и фурнитуру под ваши проекты.',
    media: { m1: P('atim_08_duo', 'ATIM — предметный кадр на белом', ['atim_01_product']),
             m2: P('pantograph_08_duo', 'Пантограф — предметный кадр на белом', ['pantograph_08_wardrobe']) } },

  /* ───────────── 29.11 — VERUM / TIMELESS ───────────── */
  { day: 8, n: 1, name: 'Verum Timeless — hero', type: 'full', layout: 'hero', theme: T, brand: 'verum', model: 'TIMELESS', maker: 'VERUM',
    lines: ['Дверная фурнитура с акцентом на форму и детали.'],
    media: { main: P('verum_timeless_01_hero', 'Оригинальная фотография модели Timeless, большой предметный кадр на белом') } },

  { day: 8, n: 2, name: 'Timeless — design', type: 'editorial', layout: 'stack', theme: T, brand: 'verum', model: 'TIMELESS', maker: 'VERUM',
    lines: ['Дизайн, который становится частью архитектуры пространства.'],
    media: { v1: P('verum_timeless_02_angle_1', 'Timeless, вид сбоку, белый фон'), v2: P('verum_timeless_02_angle_2', 'Timeless, фронтальный вид, белый фон'),
             macro: P('verum_timeless_02_angle_3', 'Крупный план под другим углом, светло-серый фон') } },

  { day: 8, n: 3, name: 'Timeless — finishes', type: 'technical', layout: 'finishes', theme: T, brand: 'verum', model: 'TIMELESS', maker: 'VERUM', variant: 'bars',
    lines: ['Подбор отделки под концепцию вашего проекта.'], finishes: ['Отделка 01', 'Отделка 02', 'Отделка 03', 'Отделка 04'],
    media: { fin1: P('verum_timeless_finish_1', 'Timeless в реальной отделке №1, вертикальный кадр на белом'), fin2: P('verum_timeless_finish_2', 'Отделка №2'),
             fin3: P('verum_timeless_finish_3', 'Отделка №3'), fin4: P('verum_timeless_finish_4', 'Отделка №4') } },

  { day: 8, n: 4, name: 'Timeless — interior', type: 'context', layout: 'interior', theme: T, brand: 'verum', model: 'TIMELESS', maker: 'VERUM', caption: 'Interior',
    lines: ['VERUM TIMELESS для дизайнерских и архитектурных проектов.'],
    media: { main: P('verum_timeless_04_interior', 'Установленная ручка, дверь в современном интерьере') } },

  { day: 8, n: 5, name: 'Timeless — pre-order', type: 'closing', layout: 'cta', theme: T, brand: 'verum', model: 'TIMELESS', maker: 'VERUM',
    q: 'Доступна для заказа по предварительной заявке.', cta: 'Запросите каталог и условия предзаказа.', ctaY: 1330,
    media: { main: P('verum_timeless_05_packshot', 'Предметный кадр Timeless на белом', ['verum_timeless_01_hero']) } },

  /* ───────────── 30.11 — CEAM / HINGES (MODEL 2) ───────────── */
  { day: 9, n: 1, name: 'CEAM — second model', type: 'full', layout: 'hero', theme: T, brand: 'ceam', maker: 'CEAM', align: 'left',
    lines: ['Инженерные решения для дверных систем.'],
    media: { main: P('ceam_model2_01_product', 'Другая модель петли CEAM (не та, что 24.11), предметная фотография на белом') } },

  { day: 9, n: 2, name: 'CEAM — construction', type: 'macro', layout: 'details', theme: T, brand: 'ceam', maker: 'CEAM',
    lines: ['Каждый элемент конструкции имеет значение.'], legend: ['Корпус', 'Конструкция', 'Крепления'],
    media: { main: P('ceam_model2_02_overview', 'Петля целиком, белый фон', ['ceam_model2_01_product']),
             d1: P('ceam_model2_02_body', 'Крупный план корпуса'), d2: P('ceam_model2_02_detail', 'Элемент конструкции'), d3: P('ceam_model2_02_mounts', 'Крепления') } },

  { day: 9, n: 3, name: 'CEAM — in motion', type: 'motion', layout: 'video', theme: T, brand: 'ceam', maker: 'CEAM', caption: 'In motion',
    lines: ['Функциональность, которую можно оценить в движении.'],
    media: { main: V('ceam_model2_03_motion', 'Видео установленной петли в действии') } },

  { day: 9, n: 4, name: 'CEAM — installation', type: 'technical', layout: 'macroBlock', theme: T, brand: 'ceam', maker: 'CEAM', caption: 'Торец двери · монтаж',
    lines: ['Правильный подбор дверной фурнитуры начинается с технических параметров проекта.'],
    media: { main: P('ceam_model2_04_door_edge', 'Петля на торце двери или на этапе монтажа') } },

  { day: 9, n: 5, name: 'CEAM — range', type: 'closing', layout: 'ctaGrid', theme: T, brand: 'ceam', maker: 'CEAM', count: 4,
    q: 'CEAM в ассортименте Creatura.', lines: ['Для производителей дверей, архитекторов и профильных специалистов.'], cta: 'Запросите каталог и подбор модели.',
    media: { m1: P('ceam_10_range_1', 'Модель CEAM 1, белый фон', ['ceam_model1_01_product']), m2: P('ceam_10_range_2', 'Модель CEAM 2', ['ceam_model2_01_product']),
             m3: P('ceam_10_range_3', 'Модель CEAM 3'), m4: P('ceam_10_range_4', 'Модель CEAM 4') } },
];
