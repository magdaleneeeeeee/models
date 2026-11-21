// CREATURA — content of all 50 stories (21–30.11.2026).
// Edit texts here and run `node source/build.mjs` to re-render.
// Media: `file` is the base name expected in assets/photos (jpg/jpeg/png/webp/tif) or assets/video (mp4/mov).
//        `alt` lists other files that may be used instead (first one found wins).
// Copy follows the brief verbatim. No technical specifications are added.
// `type` = composition type from brief §6 (used to check that no type repeats more than twice in a row).

const P = (file, note, alt = []) => ({ file, kind: 'photo', note, alt });
const V = (file, note, alt = []) => ({ file, kind: 'video', note, alt });

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
  { day: 0, n: 1, name: 'Alumove — hero product', type: 'full', layout: 'cover', theme: 't-ivory', brand: 'alumove', meta: 'Alumove',
    title: 'ALUMOVE', titleSize: 184, body: ['Алюминиевые решения для современной мебели.'], caption: 'Aluminium systems',
    media: { main: P('alumove_01_hero_furniture', 'Готовая мебельная конструкция с системой Alumove, крупный план профиля, мягкий боковой свет', ['alumove_hero']) } },

  { day: 0, n: 2, name: 'Alumove — material details', type: 'macro', layout: 'macroFull', theme: 't-graphite', brand: 'alumove', meta: 'Alumove', card: 'bl',
    caption: 'Material details', lead: 'Детали, которые формируют качество готового изделия.',
    body: ['ALUMOVE — для мебельных проектов, где важна каждая линия.'],
    media: { main: P('alumove_02_macro_joint', 'Макро: алюминиевый профиль, стыки и соединения. Оригинальное фото') } },

  { day: 0, n: 3, name: 'Pantograph — function', type: 'motion', layout: 'motionFrame', theme: 't-beige', brand: 'pantograph', meta: 'Пантограф',
    title: 'ПАНТОГРАФ', titleSize: 132, caption: 'In motion', body: ['Функциональное решение для верхних секций гардеробной.'],
    media: { main: V('pantograph_03_motion', 'Открытый шкаф, пантограф в установленном положении. Видео или кадр механизма в движении', ['pantograph_03_open_wardrobe']) } },

  { day: 0, n: 4, name: 'Pantograph — mechanism', type: 'technical', layout: 'splitStates', theme: 't-charcoal', brand: 'pantograph', meta: 'Пантограф',
    lead: 'Продуманная механика для современной гардеробной системы.', states: ['Верхнее положение', 'Рабочее положение'],
    media: { a: P('pantograph_04_position_up', 'Механизм в верхнем положении; крепления и рычаги'),
             b: P('pantograph_04_position_down', 'Механизм в опущенном (рабочем) положении') } },

  { day: 0, n: 5, name: 'B2B call to action', type: 'closing', layout: 'closingEditorial', theme: 't-ivory', brand: 'pantograph', meta: 'Каталог',
    title: 'Комплектуете мебельные проекты?', body: ['Подберём фурнитуру под ваши задачи.'], cta: 'Запросите каталог в Creatura.',
    caption: 'Гардеробная · пантограф', bodyY: 720, photoY: 880, photoH: 520,
    media: { main: P('pantograph_05_wardrobe_best', 'Лучшее фото гардеробной с установленным пантографом', ['pantograph_03_open_wardrobe']) } },

  /* ───────────── 22.11 — STV / LOCKS ───────────── */
  { day: 1, n: 1, name: 'STV — model presentation', type: 'full', layout: 'heroCentered', theme: 't-graphite', brand: 'stv', meta: 'STV',
    title: 'STV', titleSize: 196, body: ['Замки для современных дверных решений.'], caption: 'Door locks',
    media: { main: P('stv_model1_01_product', 'Конкретная модель замка STV на нейтральном фоне, высокое разрешение') } },

  { day: 1, n: 2, name: 'STV — product details', type: 'technical', layout: 'technicalGrid', theme: 't-ivory', brand: 'stv', meta: 'STV',
    lead: 'Конструкция, в которой важна каждая деталь.', legend: ['Корпус замка', 'Лицевая планка', 'Язычок'],
    media: { a: P('stv_model1_02_body', 'Корпус замка'), b: P('stv_model1_02_faceplate', 'Лицевая планка'), c: P('stv_model1_02_latch', 'Язычок') } },

  { day: 1, n: 3, name: 'STV — mechanism', type: 'motion', layout: 'motionFull', theme: 't-charcoal', brand: 'stv', meta: 'STV', band: 'bottom', hdrTheme: 't-charcoal',
    caption: 'Mechanism', lead: 'Механизм STV в действии.', body: ['Оцените конструкцию и исполнение модели.'],
    media: { main: V('stv_model1_03_mechanism', 'Видео работы механизма, крупный план движения деталей') } },

  { day: 1, n: 4, name: 'STV — installed product', type: 'context', layout: 'contextBand', theme: 't-beige', brand: 'stv', meta: 'STV', band: 'top',
    kicker: 'STV', caption: 'Торец двери', lead: 'STV для производителей дверей и профессиональных проектов.',
    media: { main: P('stv_model1_04_installed', 'Замок в установленной двери, интерьерный кадр, акцент на торцевой части двери') } },

  { day: 1, n: 5, name: 'STV — commercial', type: 'closing', layout: 'closingSplit', theme: 't-ivory', brand: 'stv', meta: 'STV',
    kicker: 'STV', title: 'Подбираете замки для дверного производства?', titleSize: 92, cta: 'Запросите каталог STV и условия заказа.',
    media: { main: P('stv_model1_05_packshot', 'Предметная фотография замка STV', ['stv_model1_01_product']) } },

  /* ───────────── 23.11 — ATIM ───────────── */
  { day: 2, n: 1, name: 'ATIM — brand hero', type: 'full', layout: 'editorialOffset', theme: 't-ivory', brand: 'atim', meta: 'ATIM',
    title: 'ATIM', titleSize: 220, body: ['Итальянские решения для современной мебели.'], caption: 'Made in Italy',
    media: { main: P('atim_01_product', 'Конкретная модель ATIM, предметная съёмка, светлый фон, выразительная тень') } },

  { day: 2, n: 2, name: 'ATIM — functionality', type: 'motion', layout: 'motionSequence', theme: 't-beige', brand: 'atim', meta: 'ATIM',
    lead: 'Функциональность, заложенная в конструкцию.', caption: 'Video · полный цикл', frames: ['Начало', 'Движение', 'Финал'],
    media: { main: V('atim_02_motion', 'Видео работы механизма — полное движение изделия'),
             f1: P('atim_02_frame1', 'Кадр из видео: начало движения'), f2: P('atim_02_frame2', 'Кадр: середина движения'), f3: P('atim_02_frame3', 'Кадр: конечное положение') } },

  { day: 2, n: 3, name: 'ATIM — engineering details', type: 'macro', layout: 'macroMosaic', theme: 't-graphite', brand: 'atim', meta: 'ATIM',
    lead: 'Инженерная составляющая мебельного решения.', legend: ['Соединения', 'Крепления', 'Материалы', 'Движущиеся элементы'],
    media: { d1: P('atim_03_macro_joints', 'Макро: соединения'), d2: P('atim_03_macro_mounts', 'Макро: крепления'),
             d3: P('atim_03_macro_material', 'Макро: материал / поверхность'), d4: P('atim_03_macro_moving', 'Макро: движущиеся элементы') } },

  { day: 2, n: 4, name: 'ATIM — in furniture', type: 'context', layout: 'contextInset', theme: 't-ivory', brand: 'atim', meta: 'ATIM',
    kicker: 'ATIM', lead: 'ATIM в проектах современной корпусной мебели.', insetCaption: 'Установленное изделие',
    media: { main: P('atim_04_interior', 'Механизм в готовой мебели, общий интерьерный план'),
             inset: P('atim_04_installed_closeup', 'Крупный план установленного изделия') } },

  { day: 2, n: 5, name: 'ATIM — B2B CTA', type: 'closing', layout: 'closingCentered', theme: 't-graphite', brand: 'atim', meta: 'ATIM',
    kicker: 'ATIM', lead: 'Для мебельных производств и дизайнерских проектов.', leadSize: 70, cta: 'Запросите каталог ATIM в Creatura.',
    media: { main: P('atim_05_packshot_dark', 'Изделие ATIM на графитовом фоне', ['atim_01_product']) } },

  /* ───────────── 24.11 — CEAM / HINGES ───────────── */
  { day: 3, n: 1, name: 'CEAM — product hero', type: 'full', layout: 'heroColumn', theme: 't-beige', brand: 'ceam', meta: 'CEAM',
    title: 'CEAM', titleSize: 132, caption: 'Door hinges', body: ['Петли для современных дверных систем.'],
    media: { main: P('ceam_model1_01_product', 'Конкретная модель петли CEAM, предметная фотография, мягкий свет, нейтральный фон') } },

  { day: 3, n: 2, name: 'CEAM — macro details', type: 'macro', layout: 'macroMosaic', theme: 't-ivory', brand: 'ceam', meta: 'CEAM',
    lead: 'Точность исполнения в каждой детали.', legend: ['Корпус', 'Шарнирные элементы', 'Крепления', 'Поверхность изделия'],
    media: { d1: P('ceam_model1_02_body', 'Макро: корпус петли'), d2: P('ceam_model1_02_pivot', 'Макро: шарнирные элементы'),
             d3: P('ceam_model1_02_mounts', 'Макро: крепления'), d4: P('ceam_model1_02_surface', 'Макро: поверхность изделия') } },

  { day: 3, n: 3, name: 'CEAM — motion', type: 'motion', layout: 'motionFull', theme: 't-ivory', brand: 'ceam', meta: 'CEAM', band: 'top',
    caption: 'In motion', lead: 'Конструкция CEAM в работе.', leadSize: 72,
    media: { main: V('ceam_model1_03_door_opening', 'Видео открывания двери — работа установленной петли') } },

  { day: 3, n: 4, name: 'CEAM — application', type: 'context', layout: 'contextBand', theme: 't-graphite', brand: 'ceam', meta: 'CEAM', band: 'bottom', hdrTheme: 't-graphite',
    kicker: 'CEAM', caption: 'Application', lead: 'Для производителей дверей и профессиональных монтажных проектов.',
    media: { main: P('ceam_model1_04_interior', 'Петля в установленном состоянии, дверное полотно, архитектурный интерьер') } },

  { day: 3, n: 5, name: 'CEAM — CTA', type: 'closing', layout: 'collectionGrid', theme: 't-ivory', brand: 'ceam', meta: 'CEAM', grid: 'row',
    title: 'Подбираете петли для дверных проектов?', titleSize: 90, caption: 'CEAM', cta: 'Запросите каталог CEAM в Creatura.',
    media: { m1: P('ceam_05_collection_1', 'Петля CEAM — модель 1'), m2: P('ceam_05_collection_2', 'Петля CEAM — модель 2'), m3: P('ceam_05_collection_3', 'Петля CEAM — модель 3') } },

  /* ───────────── 25.11 — VERUM / NUDA 5+ ───────────── */
  { day: 4, n: 1, name: 'Verum Nuda 5+ — hero', type: 'full', layout: 'heroFullDark', theme: 't-charcoal', brand: 'verum', meta: 'Verum', hdrTheme: 't-charcoal',
    kicker: 'VERUM', title: 'NUDA 5+', caption: 'Door handles', body: ['Минимализм в деталях дверной фурнитуры.'],
    media: { main: P('verum_nuda5_01_hero', 'Оригинальная фотография ручки NUDA 5+, крупный предметный кадр, тёмный интерьерный фон') } },

  { day: 4, n: 2, name: 'Nuda 5+ — design', type: 'editorial', layout: 'multiAngle', theme: 't-ivory', brand: 'verum', meta: 'Verum · Nuda 5+',
    lines: ['Чистая геометрия.', 'Выразительная форма.', 'Ничего лишнего.'], titleSize: 84, angles: ['Фронт', 'Профиль', 'Деталь'],
    media: { a1: P('verum_nuda5_02_angle_front', 'Ракурс: фронтальный, крупный план формы'), a2: P('verum_nuda5_02_angle_side', 'Ракурс: профиль'),
             a3: P('verum_nuda5_02_angle_detail', 'Ракурс: деталь формы') } },

  { day: 4, n: 3, name: 'Nuda 5+ — finishes', type: 'technical', layout: 'finishPalette', theme: 't-beige', brand: 'verum', meta: 'Verum',
    title: 'NUDA 5+', body: ['Варианты отделки для разных интерьерных концепций.'], finishes: ['Отделка 01', 'Отделка 02', 'Отделка 03', 'Отделка 04'],
    media: { main: P('verum_nuda5_03_finishes_group', 'Групповой кадр ручек в реальных вариантах отделки'),
             fin1: P('verum_nuda5_finish_1', 'Образец реальной отделки №1 (имя отделки — по каталогу Verum)'),
             fin2: P('verum_nuda5_finish_2', 'Образец реальной отделки №2'), fin3: P('verum_nuda5_finish_3', 'Образец реальной отделки №3'),
             fin4: P('verum_nuda5_finish_4', 'Образец реальной отделки №4') } },

  { day: 4, n: 4, name: 'Nuda 5+ — interior', type: 'context', layout: 'contextFrame', theme: 't-ivory', brand: 'verum', meta: 'Verum',
    kicker: 'Nuda 5+', caption: 'Interior', lead: 'Дверная фурнитура — часть архитектуры интерьера.',
    media: { main: P('verum_nuda5_04_interior', 'Ручка на установленной двери, архитектурный интерьер, акцент на изделие') } },

  { day: 4, n: 5, name: 'Nuda 5+ — offer', type: 'closing', layout: 'offer', theme: 't-charcoal', brand: 'verum', meta: 'Verum',
    kicker: 'VERUM NUDA 5+', figure: '5%', body: ['Скидка 5% по программе Verum Nuda 5+.'], cta: 'Запросите каталог и условия заказа.',
    media: { main: P('verum_nuda5_05_closeup', 'Красивый крупный кадр NUDA 5+', ['verum_nuda5_01_hero']) } },

  /* ───────────── 26.11 — AIRCUBE + ALUMOVE ───────────── */
  { day: 5, n: 1, name: 'AirCube — product', type: 'full', layout: 'heroCentered', theme: 't-ivory', brand: 'aircube', meta: 'AirCube', flip: true,
    title: 'AIRCUBE', titleSize: 150, body: ['Функциональные решения для мебельных проектов.'], caption: 'Furniture solutions',
    media: { main: P('aircube_01_product', 'Конкретное изделие AirCube, предметная фотография, минималистичная композиция') } },

  { day: 5, n: 2, name: 'AirCube — details', type: 'macro', layout: 'macroFull', theme: 't-charcoal', brand: 'aircube', meta: 'AirCube', card: 'tr',
    caption: 'Details', lead: 'Внимание к деталям — основа качественного решения.',
    media: { main: P('aircube_02_macro', 'Макросъёмка изделия AirCube: конструкция, отделка') } },

  { day: 5, n: 3, name: 'Alumove — system', type: 'editorial', layout: 'editorialOffset', theme: 't-sand', brand: 'alumove', meta: 'Alumove', mirror: true,
    title: 'ALUMOVE', titleSize: 170, body: ['Алюминиевые системы для современной мебели.'], caption: 'Aluminium systems',
    media: { main: P('alumove_06_furniture', 'Алюминиевая система, общий вид, фотография готовой мебели', ['alumove_01_hero_furniture']) } },

  { day: 5, n: 4, name: 'Alumove — details', type: 'technical', layout: 'detailStrip', theme: 't-graphite', brand: 'alumove', meta: 'Alumove',
    lead: 'Архитектура мебельного фасада начинается с правильного выбора комплектующих.', legend: ['Профиль', 'Стыки', 'Соединения'],
    kicker: 'Alumove', caption: 'Details',
    media: { d1: P('alumove_06_profile', 'Крупный план: профиль'), d2: P('alumove_06_joints', 'Крупный план: стыки', ['alumove_02_macro_joint']),
             d3: P('alumove_06_connections', 'Крупный план: соединения') } },

  { day: 5, n: 5, name: 'AirCube + Alumove — commercial', type: 'split', layout: 'splitVertical', theme: 't-ivory', brand: 'aircube', meta: 'Каталоги',
    labels: ['AirCube', 'Alumove'], title: 'Два направления для профессиональных мебельных проектов.', cta: 'Запросите каталоги в Creatura.',
    media: { left: P('aircube_05_split', 'AirCube — для левой половины, единая цветовая обработка', ['aircube_01_product']),
             right: P('alumove_05_split', 'Alumove — для правой половины, единая цветовая обработка', ['alumove_06_furniture', 'alumove_01_hero_furniture']) } },

  /* ───────────── 27.11 — STV / LOCKS (MODEL 2) ───────────── */
  { day: 6, n: 1, name: 'STV — second model hero', type: 'full', layout: 'heroColumn', theme: 't-graphite', brand: 'stv', meta: 'STV', mirror: true,
    title: 'STV', titleSize: 170, caption: 'Door locks', body: ['Ещё одно решение в линейке дверных замков.'],
    media: { main: P('stv_model2_01_product', 'Другая модель замка STV (не та, что 22.11), предметный кадр') } },

  { day: 6, n: 2, name: 'STV — second model construction', type: 'macro', layout: 'macroFull', theme: 't-ivory', brand: 'stv', meta: 'STV', card: 'br', hdrTheme: 't-graphite',
    caption: 'Construction', lead: 'Рассматриваем конструкцию и исполнение модели.',
    media: { main: P('stv_model2_02_macro', 'Макросъёмка конструкции второй модели STV') } },

  { day: 6, n: 3, name: 'STV — second model in motion', type: 'motion', layout: 'motionSequence', theme: 't-charcoal', brand: 'stv', meta: 'STV',
    lead: 'Демонстрация механизма STV в работе.', caption: 'Video · mechanism', frames: ['Кадр 01', 'Кадр 02', 'Кадр 03'],
    media: { main: V('stv_model2_03_mechanism', 'Видео работы замка (вторая модель)'),
             f1: P('stv_model2_03_frame1', 'Кадр из видео 1'), f2: P('stv_model2_03_frame2', 'Кадр из видео 2'), f3: P('stv_model2_03_frame3', 'Кадр из видео 3') } },

  { day: 6, n: 4, name: 'STV — comparison', type: 'comparison', layout: 'comparison', theme: 't-beige', brand: 'stv', meta: 'STV',
    title: 'Разные модели — разные задачи.', models: ['STV · модель 01', 'STV · модель 02'], body: ['Подбор под конструкцию и требования проекта.'],
    media: { m1: P('stv_model1_01_product', 'Модель 1 (из 22.11) — тот же фон и свет, что у модели 2'), m2: P('stv_model2_01_product', 'Модель 2 (из 27.11)') } },

  { day: 6, n: 5, name: 'STV — commercial closing', type: 'closing', layout: 'closingEditorial', theme: 't-graphite', brand: 'stv', meta: 'STV', mirror: true,
    title: 'Производите двери или работаете с дверными проектами?', titleSize: 96, cta: 'Запросите ассортимент STV и условия сотрудничества.',
    caption: 'STV · ассортимент', photoY: 860, photoH: 520,
    media: { main: P('stv_model2_05_packshot', 'Предметный кадр STV для финальной сторис', ['stv_model2_01_product']) } },

  /* ───────────── 28.11 — ATIM + PANTOGRAPH ───────────── */
  { day: 7, n: 1, name: 'ATIM — in furniture', type: 'context', layout: 'editorialOffset', theme: 't-beige', brand: 'atim', meta: 'ATIM',
    title: 'ATIM', titleSize: 200, body: ['Функциональная фурнитура для современной корпусной мебели.'], caption: 'In furniture',
    media: { main: P('atim_08_in_furniture', 'Конкретная модель механизма ATIM в готовой мебели', ['atim_04_interior']) } },

  { day: 7, n: 2, name: 'ATIM — full cycle video', type: 'motion', layout: 'motionFull', theme: 't-graphite', brand: 'atim', meta: 'ATIM', band: 'bottom', hdrTheme: 't-graphite',
    caption: 'Full cycle', lead: 'Показываем возможности механизма в реальном использовании.', leadSize: 58,
    media: { main: V('atim_08_full_cycle', 'Видео полного цикла работы механизма ATIM', ['atim_02_motion']) } },

  { day: 7, n: 3, name: 'Pantograph — wardrobe', type: 'context', layout: 'contextBand', theme: 't-ivory', brand: 'pantograph', meta: 'Пантограф', band: 'top',
    kicker: 'Wardrobe systems', title: 'Пантограф', titleSize: 116, caption: 'Гардеробная', lead: 'Решение для эффективной организации верхних секций шкафа.', leadSize: 46,
    media: { main: P('pantograph_08_wardrobe', 'Пантограф в гардеробной системе', ['pantograph_05_wardrobe_best']) } },

  { day: 7, n: 4, name: 'Pantograph — mechanism', type: 'technical', layout: 'splitStates', theme: 't-graphite', brand: 'pantograph', meta: 'Пантограф', mirror: true,
    lead: 'Продуманная механика для современных гардеробных систем.', states: ['Крепления', 'Опускание штанги'],
    media: { a: P('pantograph_08_macro_mounts', 'Макросъёмка креплений пантографа', ['pantograph_04_position_up']),
             b: V('pantograph_08_rod_lowering', 'Видео опускания штанги', ['pantograph_03_motion']) } },

  { day: 7, n: 5, name: 'ATIM + Pantograph — commercial', type: 'closing', layout: 'duo', theme: 't-sand', brand: 'atim', meta: 'Creatura',
    title: 'Комплектуете корпусную мебель и гардеробные?', labels: ['ATIM', 'Пантограф'], cta: 'Подберём механизмы и фурнитуру под ваши проекты.',
    media: { a: P('atim_08_duo', 'ATIM — для общей композиции', ['atim_08_in_furniture', 'atim_01_product']),
             b: P('pantograph_08_duo', 'Пантограф — для общей композиции', ['pantograph_08_wardrobe', 'pantograph_05_wardrobe_best']) } },

  /* ───────────── 29.11 — VERUM / TIMELESS ───────────── */
  { day: 8, n: 1, name: 'Verum Timeless — hero', type: 'full', layout: 'cover', theme: 't-charcoal', brand: 'verum', meta: 'Verum',
    kicker: 'VERUM', title: 'TIMELESS', titleSize: 160, body: ['Дверная фурнитура с акцентом на форму и детали.'], caption: 'Door handles',
    media: { main: P('verum_timeless_01_hero', 'Оригинальная фотография модели Timeless, большой предметный кадр') } },

  { day: 8, n: 2, name: 'Timeless — design', type: 'editorial', layout: 'multiAngle', theme: 't-beige', brand: 'verum', meta: 'Verum · Timeless', variant: 'large',
    lead: 'Дизайн, который становится частью архитектуры пространства.', angles: ['Основной ракурс', 'Другие углы'],
    media: { a: P('verum_timeless_02_angle_1', 'Крупный план, основной ракурс'), b: P('verum_timeless_02_angle_2', 'Крупный план, другой угол'),
             c: P('verum_timeless_02_angle_3', 'Крупный план, третий угол') } },

  { day: 8, n: 3, name: 'Timeless — finishes', type: 'technical', layout: 'finishPalette', theme: 't-graphite', brand: 'verum', meta: 'Verum · Timeless', variant: 'bars',
    lead: 'Подбор отделки под концепцию вашего проекта.', finishes: ['Отделка 01', 'Отделка 02', 'Отделка 03', 'Отделка 04'],
    media: { fin1: P('verum_timeless_finish_1', 'Реальный образец отделки Timeless №1'), fin2: P('verum_timeless_finish_2', 'Образец №2'),
             fin3: P('verum_timeless_finish_3', 'Образец №3'), fin4: P('verum_timeless_finish_4', 'Образец №4') } },

  { day: 8, n: 4, name: 'Timeless — interior', type: 'context', layout: 'contextFrame', theme: 't-ivory', brand: 'verum', meta: 'Verum', variant: 'bleed',
    kicker: 'Timeless', caption: 'Interior', lead: 'VERUM TIMELESS для дизайнерских и архитектурных проектов.',
    media: { main: P('verum_timeless_04_interior', 'Установленная ручка, дверь в современном интерьере') } },

  { day: 8, n: 5, name: 'Timeless — pre-order', type: 'closing', layout: 'closingCentered', theme: 't-ivory', brand: 'verum', meta: 'Verum',
    kicker: 'VERUM', title: 'TIMELESS', titleSize: 130, lead: 'Доступна для заказа по предварительной заявке.', leadSize: 54,
    cta: 'Запросите каталог и условия предзаказа.',
    media: { main: P('verum_timeless_05_packshot', 'Предметный кадр Timeless', ['verum_timeless_01_hero']) } },

  /* ───────────── 30.11 — CEAM / HINGES (MODEL 2) ───────────── */
  { day: 9, n: 1, name: 'CEAM — second model', type: 'full', layout: 'heroCentered', theme: 't-sand', brand: 'ceam', meta: 'CEAM',
    title: 'CEAM', titleSize: 190, body: ['Инженерные решения для дверных систем.'], caption: 'Door hinges',
    media: { main: P('ceam_model2_01_product', 'Другая модель петли CEAM (не та, что 24.11), предметная фотография') } },

  { day: 9, n: 2, name: 'CEAM — construction', type: 'macro', layout: 'technicalGrid', theme: 't-graphite', brand: 'ceam', meta: 'CEAM',
    lead: 'Каждый элемент конструкции имеет значение.', legend: ['Корпус', 'Элементы конструкции', 'Крепления'],
    media: { a: P('ceam_model2_02_body', 'Крупный план корпуса'), b: P('ceam_model2_02_detail', 'Элемент конструкции'), c: P('ceam_model2_02_mounts', 'Крепления') } },

  { day: 9, n: 3, name: 'CEAM — in motion', type: 'motion', layout: 'motionFrame', theme: 't-ivory', brand: 'ceam', meta: 'CEAM', mirror: true,
    title: 'CEAM', titleSize: 140, caption: 'In motion', body: ['Функциональность, которую можно оценить в движении.'],
    media: { main: V('ceam_model2_03_motion', 'Видео установленной петли в действии') } },

  { day: 9, n: 4, name: 'CEAM — installation', type: 'technical', layout: 'statementPhoto', theme: 't-beige', brand: 'ceam', meta: 'CEAM',
    lead: 'Правильный подбор дверной фурнитуры начинается с технических параметров проекта.', titleSize: 74, caption: 'Торец двери · монтаж',
    media: { main: P('ceam_model2_04_door_edge', 'Петля на торце двери или на этапе монтажа') } },

  { day: 9, n: 5, name: 'CEAM — range', type: 'closing', layout: 'collectionGrid', theme: 't-charcoal', brand: 'ceam', meta: 'CEAM',
    kicker: 'CEAM', title: 'CEAM в ассортименте Creatura.', body: ['Для производителей дверей, архитекторов и профильных специалистов.'],
    cta: 'Запросите каталог и подбор модели.',
    media: { m1: P('ceam_10_range_1', 'Модель CEAM 1', ['ceam_model1_01_product']), m2: P('ceam_10_range_2', 'Модель CEAM 2', ['ceam_model2_01_product']),
             m3: P('ceam_10_range_3', 'Модель CEAM 3'), m4: P('ceam_10_range_4', 'Модель CEAM 4') } },
];
