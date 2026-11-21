// CREATURA — minimal composition library (white studio style).
// Each layout returns the inner HTML of <div class="story">. Coordinates in px on 1080 × 1920.
// Meaningful text stays inside y 262 … 1610 (Instagram safe zone); the bottom 300 px remain empty white.

const W = 1080, M = 96, B = 1600; // B = baseline of the bottom wordmark

const ARROW = `<svg viewBox="0 0 24 24"><path d="M4 12h15M13 6l6 6-6 6"/></svg>`;
const PLAY = `<span class="play"><i><svg viewBox="0 0 16 16"><path d="M2 1l13 7-13 7z"/></svg></i></span>`;

const at = (x, y, w, extra = '') => `position:absolute;left:${x}px;top:${y}px;${w ? `width:${w}px;` : ''}${extra}`;
const box = (x, y, w, html, extra = '') => `<div style="${at(x, y, w, extra)}">${html}</div>`;
const boxB = (x, bottom, w, html, extra = '') => `<div style="position:absolute;left:${x}px;bottom:${1920 - bottom}px;width:${w}px;${extra}">${html}</div>`;
const center = (y, html, w = W - 2 * M) => box((W - w) / 2, y, w, html, 'text-align:center');

function lockup(h, s, cls = '') {
  const model = s.model ? `<span>${h.t(s.model)}</span>` : '';
  const maker = s.maker ? (s.model ? `<span class="by">by</span><span class="br">${h.t(s.maker)}</span>` : `<span>${h.t(s.maker)}</span>`) : '';
  return `<div class="lockup a-fade ${cls}">${model}${maker}</div>`;
}
const lines = (h, arr, cls = 'line') => (arr || []).map((l, i) => `<p class="${cls} a-fade d${Math.min(i + 2, 3)}">${h.t(l)}</p>`).join('');
const cta = (h, s) => `<span class="cta a-fade d3">${h.t(s.cta)}${ARROW}</span>`;
const wmC = (h, s) => boxB(M, B, W - 2 * M, `<div style="display:flex;justify-content:center">${h.wm(s)}</div>`);
const wmL = (h, s) => boxB(M, B, W - 2 * M, h.wm(s));

export const layouts = {

  /* Single packshot on white, lockup + one line, wordmark. align: center | left */
  hero(s, h) {
    const left = s.align === 'left';
    return `
      ${h.hdr(s)}
      ${h.slot('main', M, 330, W - 2 * M, 1000, { cls: 'cut a-zoom' })}
      ${left
        ? box(M, 1370, 0, lockup(h, s)) + box(M, 1432, 620, lines(h, s.lines))
        : center(1370, lockup(h, s)) + center(1432, lines(h, s.lines), 700)}
      ${left ? wmL(h, s) : wmC(h, s)}`;
  },

  /* Catalogue stack: two views of the product + studio macro crop, lockup right-aligned (reference layout) */
  stack(s, h) {
    return `
      ${h.hdr(s)}
      ${s.lines ? box(M, 322, 888, lines(h, s.lines, 'line s')) : ''}
      ${h.slot('v1', 160, 420, 760, 290, { cls: 'cut' })}
      ${h.slot('v2', 160, 730, 760, 290, { cls: 'cut' })}
      ${box(M, 1040, W - 2 * M, lockup(h, s, 's'), 'text-align:right')}
      ${h.slot('macro', 160, 1104, 760, 366, { cls: 'studio a-zoom' })}
      ${wmC(h, s)}`;
  },

  /* Large studio macro, small caption row, one line of copy */
  macroBlock(s, h) {
    return `
      ${h.hdr(s)}
      ${h.slot('main', M, 330, W - 2 * M, 940, { cls: 'studio a-zoom' })}
      ${box(M, 1298, W - 2 * M, `<div style="display:flex;justify-content:space-between;align-items:center"><span class="cap">${h.t(s.caption || '')}</span>${lockup(h, s, 's')}</div>`)}
      ${box(M, 1356, 760, lines(h, s.lines))}
      ${wmC(h, s)}`;
  },

  /* Photograph bleeding off the top, white lower field */
  fullBleed(s, h) {
    return `
      ${h.slot('main', 0, 0, W, 1240, { cls: 'a-zoom' })}
      ${box(M, 1290, W - 2 * M, `<div style="display:flex;justify-content:space-between;align-items:center">${lockup(h, s)}${(s.wm || '').toUpperCase() === 'CREATURA' ? '' : `<span class="mark">${h.mark()}</span>`}</div>`)}
      ${box(M, 1360, 760, lines(h, s.lines))}
      ${wmL(h, s)}`;
  },

  /* Video frame (inset or full-width), play mark, one line */
  video(s, h) {
    const full = s.variant === 'full';
    return `
      ${full ? '' : h.hdr(s)}
      ${full ? h.slot('main', 0, 0, W, 1300, { cls: 'a-zoom' }) : h.slot('main', M, 330, W - 2 * M, 960, { cls: 'studio a-zoom' })}
      ${box(M, full ? 1336 : 1318, W - 2 * M, `<div style="display:flex;justify-content:space-between;align-items:center"><span style="display:flex;align-items:center;gap:16px">${PLAY}<span class="cap">${h.t(s.caption || 'Video')}</span></span>${lockup(h, s, 's')}</div>`)}
      ${box(M, full ? 1406 : 1390, 760, lines(h, s.lines))}
      ${wmC(h, s)}`;
  },

  /* Two stacked images (positions / mount + motion), numbered labels */
  twoStates(s, h) {
    const lab = (n, t) => `<div style="display:flex;gap:16px;align-items:baseline"><span class="num">${n}</span><span class="cap">${h.t(t)}</span></div>`;
    return `
      ${h.hdr(s)}
      ${box(M, 322, 800, lines(h, s.lines))}
      ${h.slot('a', M, 450, W - 2 * M, 450, { cls: 'studio' })}
      ${box(M, 914, W - 2 * M, lab('01', s.states[0]))}
      ${h.slot('b', M, 966, W - 2 * M, 450, { cls: 'studio' })}
      ${box(M, 1430, W - 2 * M, lab('02', s.states[1]))}
      ${wmC(h, s)}`;
  },

  /* Packshot + three numbered macro details */
  details(s, h) {
    const cw = (W - 2 * M - 32) / 3;
    return `
      ${h.hdr(s)}
      ${h.slot('main', M, 320, W - 2 * M, 640, { cls: 'cut a-zoom' })}
      ${[0, 1, 2].map(i => h.slot('d' + (i + 1), M + i * (cw + 16), 990, cw, cw, { cls: 'studio sm' }) +
        box(M + i * (cw + 16), 990 + cw + 14, cw, `<div style="display:flex;gap:12px;align-items:baseline"><span class="num">0${i + 1}</span><span class="cap" style="letter-spacing:.14em">${h.t(s.legend[i])}</span></div>`)).join('')}
      ${box(M, 1362, 860, lines(h, s.lines, 'line s'))}
      ${wmC(h, s)}`;
  },

  /* 2 × 2 macro mosaic with element names */
  mosaic(s, h) {
    const cw = (W - 2 * M - 16) / 2, ch = 420;
    return `
      ${h.hdr(s)}
      ${box(M, 322, 800, lines(h, s.lines))}
      ${[0, 1, 2, 3].map(i => {
        const x = M + (i % 2) * (cw + 16), y = 440 + Math.floor(i / 2) * (ch + 62);
        return h.slot('d' + (i + 1), x, y, cw, ch, { cls: 'studio sm' }) +
          box(x, y + ch + 14, cw, `<div style="display:flex;gap:12px;align-items:baseline"><span class="num">0${i + 1}</span><span class="cap" style="letter-spacing:.14em">${h.t(s.legend[i])}</span></div>`);
      }).join('')}
      ${wmC(h, s)}`;
  },

  /* Interior photograph framed by white margins */
  interior(s, h) {
    const bleed = s.variant === 'bleed';
    return `
      ${h.hdr(s)}
      ${h.slot('main', bleed ? 0 : M, 330, bleed ? W - M : W - 2 * M, 960, { cls: 'a-zoom' })}
      ${box(M, 1326, W - 2 * M, `<div style="display:flex;justify-content:space-between;align-items:center">${lockup(h, s, 's')}<span class="cap">${h.t(s.caption || '')}</span></div>`)}
      ${box(M, 1386, 820, lines(h, s.lines))}
      ${wmL(h, s)}`;
  },

  /* Two products / models side by side */
  pair(s, h) {
    const cw = (W - 2 * M - 24) / 2;
    return `
      ${h.hdr(s)}
      ${box(M, 322, 860, `<p class="q a-fade" style="font-size:${s.qSize || 52}px">${h.t(s.q)}</p>`)}
      ${[0, 1].map(i => h.slot('m' + (i + 1), M + i * (cw + 24), 500, cw, 700, { cls: 'cut' }) +
        box(M + i * (cw + 24), 1222, cw, `<div class="rule" style="margin-bottom:18px"></div><div style="display:flex;gap:14px;align-items:baseline"><span class="num">0${i + 1}</span><span class="cap">${h.t(s.labels[i])}</span></div>`)).join('')}
      ${box(M, 1320, 860, lines(h, s.lines))}
      ${wmC(h, s)}`;
  },

  /* Finishes: real finish samples of the same model */
  finishes(s, h) {
    const n = s.finishes.length;
    if (s.variant === 'bars') {
      const bw = (W - 2 * M - (n - 1) * 16) / n;
      return `
        ${h.hdr(s)}
        ${box(M, 322, 800, lines(h, s.lines))}
        ${s.finishes.map((f, i) => h.slot('fin' + (i + 1), M + i * (bw + 16), 440, bw, 760, { cls: 'cut sm' }) +
          box(M + i * (bw + 16), 1216, bw, `<div class="rule" style="margin-bottom:14px"></div><div class="cap" style="letter-spacing:.14em">${h.t(f)}</div>`)).join('')}
        ${box(M, 1320, 0, lockup(h, s))}
        ${wmC(h, s)}`;
    }
    const tw = (W - 2 * M - (n - 1) * 16) / n;
    return `
      ${h.hdr(s)}
      ${h.slot('main', M, 320, W - 2 * M, 620, { cls: 'cut a-zoom' })}
      ${s.finishes.map((f, i) => h.slot('fin' + (i + 1), M + i * (tw + 16), 970, tw, 250, { cls: 'studio sm' }) +
        box(M + i * (tw + 16), 1234, tw, `<div class="cap" style="letter-spacing:.14em">${h.t(f)}</div>`)).join('')}
      ${box(M, 1300, 0, lockup(h, s))}
      ${box(M, 1360, 800, lines(h, s.lines))}
      ${wmC(h, s)}`;
  },

  /* Closing: product, short question, CTA link */
  cta(s, h) {
    return `
      ${h.hdr(s)}
      ${h.slot('main', 200, 320, 680, 640, { cls: 'cut a-zoom' })}
      ${s.model || s.maker ? box(M, 990, 0, lockup(h, s, 's')) : ''}
      ${box(M, 1050, 880, `<p class="q a-fade" style="font-size:${s.qSize || 56}px">${h.t(s.q)}</p>`)}
      ${s.lines ? box(M, s.linesY || 1270, 820, lines(h, s.lines)) : ''}
      ${box(M, s.ctaY || 1380, 0, cta(h, s))}
      ${wmC(h, s)}`;
  },

  /* Closing: several products in a row/grid */
  ctaGrid(s, h) {
    const n = s.count || 3;
    const cw = (W - 2 * M - (n - 1) * 16) / n;
    return `
      ${h.hdr(s)}
      ${box(M, 322, 880, `<p class="q a-fade" style="font-size:${s.qSize || 52}px">${h.t(s.q)}</p>`)}
      ${Array.from({ length: n }, (_, i) => h.slot('m' + (i + 1), M + i * (cw + 16), 520, cw, n > 2 ? 640 : 700, { cls: 'cut sm' }) +
        (s.labels ? box(M + i * (cw + 16), (n > 2 ? 1174 : 1234), cw, `<div class="cap" style="letter-spacing:.14em">${h.t(s.labels[i])}</div>`) : '')).join('')}
      ${s.lines ? box(M, 1250, 860, lines(h, s.lines, 'line s')) : ''}
      ${box(M, s.ctaY || 1380, 0, cta(h, s))}
      ${wmC(h, s)}`;
  },

  /* Closing split screen: two directions left / right */
  split(s, h) {
    return `
      ${h.slot('left', 0, 0, 539, 1100, { cls: 'a-zoom' })}
      ${h.slot('right', 541, 0, 539, 1100, { cls: 'a-zoom' })}
      ${box(M, 1132, 400, `<div class="lockup s">${h.t(s.labels[0])}</div>`)}
      ${box(541 + 48, 1132, 400, `<div class="lockup s">${h.t(s.labels[1])}</div>`)}
      ${box(M, 1206, 888, `<p class="q a-fade" style="font-size:${s.qSize || 46}px">${h.t(s.q)}</p>`)}
      ${box(M, 1400, 0, cta(h, s))}
      ${wmC(h, s)}`;
  },

  /* Offer: packshot, large figure, short condition, CTA */
  offer(s, h) {
    return `
      ${h.hdr(s)}
      ${h.slot('main', M, 320, W - 2 * M, 680, { cls: 'cut a-zoom' })}
      ${box(M - 10, 1030, 0, `<div class="big">${h.t(s.figure)}</div>`)}
      ${box(560, 1046, 424, lockup(h, s, 's') + `<div style="height:20px"></div>` + lines(h, s.lines, 'line s'))}
      ${box(M, 1300, 0, cta(h, s))}
      ${wmC(h, s)}`;
  },
};
