// CREATURA — composition library.
// Each layout receives the story object `s` and helpers `h`, and returns the inner HTML of <div class="story">.
// All coordinates are in px on the 1080 × 1920 canvas. Instagram safe zone for meaningful text: y 262 … 1610.

const W = 1080, M = 96, SAFE_T = 262, SAFE_B = 1610;

const ARROW = `<svg viewBox="0 0 24 24"><path d="M4 12h15M13 6l6 6-6 6"/></svg>`;
const PLAY = `<svg viewBox="0 0 16 16"><path d="M2 1l13 7-13 7z"/></svg>`;

const at = (x, y, w, extra = '') => `position:absolute;left:${x}px;top:${y}px;${w ? `width:${w}px;` : ''}${extra}`;
const box = (x, y, w, html, cls = '', extra = '') => `<div class="${cls}" style="${at(x, y, w, extra)}">${html}</div>`;
// Bottom-anchored box: its last line sits at `bottom` px from canvas top — keeps text inside the safe zone whatever its length.
const boxB = (x, bottom, w, html, cls = '', extra = '') =>
  `<div class="${cls}" style="position:absolute;left:${x}px;bottom:${1920 - bottom}px;width:${w}px;${extra}">${html}</div>`;

function cta(h, s, theme = '') {
  return `<div class="cta a-fade d4 ${theme}"><span>${h.t(s.cta)}</span><span class="arrow">${ARROW}</span></div>`;
}
function bodies(h, list, cls = 'body') {
  return (list || []).map((b, i) => `<p class="${cls} a-fade d${Math.min(i + 2, 4)}">${h.t(b)}</p>`).join('');
}

export const layouts = {

  /* 21.1 — Premium Product Cover: brand on top, oversized model name, product dominates, body bottom-left */
  cover(s, h) {
    const fs = s.titleSize || 214;
    return `
      ${h.hdr(s)}
      ${s.kicker ? box(M, 330, 0, `<div class="kicker accent">${h.t(s.kicker)}</div>`) : ''}
      ${box(M - 8, s.kicker ? 372 : 330, 0, `<div class="display a-fade" style="font-size:${fs}px">${h.t(s.title)}</div>`)}
      ${h.slot('main', 0, 560, W, 880, { cls: 'a-zoom' })}
      ${box(M, 1476, 0, `<div class="rule a-line" style="width:120px;background:var(--accent)"></div>`)}
      ${boxB(M, SAFE_B, 640, bodies(h, s.body))}
      ${s.caption ? boxB(W - M - 300, SAFE_B - 6, 300, `<div class="cap" style="text-align:right">${h.t(s.caption)}</div>`) : ''}`;
  },

  /* Macro Editorial: full-screen macro, small solid text card with hairline and micro caption */
  macroFull(s, h) {
    const pos = s.card || 'bl';
    const cw = 760, ch = 500;
    const cx = pos.endsWith('l') ? 0 : W - cw;
    const cy = pos.startsWith('t') ? 300 : SAFE_B + 10 - ch;
    const pad = pos.endsWith('l') ? `padding:56px 70px 56px ${M}px` : `padding:56px ${M}px 56px 70px`;
    return `
      ${h.slot('main', 0, 0, W, 1920, { cls: 'a-zoom' })}
      ${h.hdr(s, { theme: s.hdrTheme })}
      <div class="panel" style="left:${cx}px;top:${cy}px;width:${cw}px;height:${ch}px;${pad}">
        <div style="display:flex;align-items:center;gap:22px;margin-bottom:34px">
          <div class="rule accent a-line" style="width:72px"></div><span class="cap accent">${h.t(s.caption || 'Details')}</span>
        </div>
        <p class="lead a-fade" style="font-size:${s.leadSize || 58}px">${h.t(s.lead)}</p>
        ${s.body ? `<div style="margin-top:26px">${bodies(h, s.body, 'body s muted')}</div>` : ''}
      </div>`;
  },

  /* Product in Motion: model name top-left, large media frame bleeding off one edge, timeline, short caption */
  motionFrame(s, h) {
    const left = s.mirror ? 0 : M;
    const fw = W - M;
    return `
      ${h.hdr(s)}
      ${box(M - 4, 318, 0, `<div class="display a-fade" style="font-size:${s.titleSize || 128}px">${h.t(s.title)}</div>`)}
      ${box(W - M - 64, 352, 0, `<div class="play muted">${PLAY}</div>`)}
      ${h.slot('main', left, 500, fw, 920, { cls: 'a-zoom' })}
      ${box(M, 1450, W - 2 * M, `<div class="timeline"><span>${h.t(s.caption || 'In motion')}</span><span class="bar"></span><span>00:00</span></div>`)}
      ${boxB(M, SAFE_B, 760, bodies(h, s.body, 'body s'))}`;
  },

  /* Technical Detail: two media blocks, staggered, with numbered technical captions */
  splitStates(s, h) {
    const [a, b] = s.states;
    const flip = !!s.mirror;
    const ax = flip ? 404 : M, bx = flip ? M : 404;
    const lax = flip ? M : 710, lbx = flip ? 710 : M;
    const lab = (n, txt) => `<div class="num" style="font-size:54px;line-height:1">${n}</div>
      <div class="rule" style="margin:20px 0 18px;width:100%"></div><div class="cap" style="letter-spacing:.18em;line-height:1.5">${h.t(txt)}</div>`;
    return `
      ${h.hdr(s)}
      ${box(M, 318, 860, `<p class="lead a-fade" style="font-size:${s.leadSize || 60}px">${h.t(s.lead)}</p>`)}
      ${h.slot('a', ax, 560, 580, 490)}
      ${box(lax, 566, 274, lab('01', a))}
      ${h.slot('b', bx, 1090, 580, 490)}
      ${box(lbx, 1096, 274, lab('02', b))}`;
  },

  /* Commercial Closing — editorial: large question, free space, offset photo, minimal CTA */
  closingEditorial(s, h) {
    const m = !!s.mirror;
    return `
      ${h.hdr(s)}
      ${box(M - 4, 330, s.headW || 880, `<h1 class="title a-fade" style="font-size:${s.titleSize || 116}px">${h.t(s.title)}</h1>`)}
      ${s.body ? box(M, s.bodyY || 760, 640, bodies(h, s.body)) : ''}
      ${h.slot('main', m ? 0 : 420, s.photoY || 900, 660, s.photoH || 500, { cls: 'a-zoom' })}
      ${box(m ? 700 : M, (s.photoY || 900) + 6, 270, `<div class="cap">${h.t(s.caption || '')}</div>`)}
      ${boxB(M, SAFE_B, W - 2 * M, cta(h, s))}`;
  },

  /* Product hero on a seamless background — object centred with generous air */
  heroCentered(s, h) {
    const flip = !!s.flip;
    const sy = flip ? 640 : 380;
    return `
      ${h.hdr(s)}
      ${h.slot('main', M, sy, W - 2 * M, flip ? 800 : 900, { cls: 'a-zoom contain' })}
      ${flip
        ? box(M - 6, 318, 0, `<div class="display a-fade" style="font-size:${s.titleSize || 168}px">${h.t(s.title)}</div>`) +
          boxB(M, SAFE_B, 620, bodies(h, s.body))
        : box(M - 6, 1316, 0, `<div class="display a-fade" style="font-size:${s.titleSize || 168}px">${h.t(s.title)}</div>`) +
          boxB(M, SAFE_B, 600, bodies(h, s.body, 'body s'))}
      ${box(W - M - 260, flip ? 340 : 1330, 260, `<div class="rule accent a-line" style="width:100%;margin-bottom:16px"></div><div class="cap" style="text-align:right">${h.t(s.caption || '')}</div>`)}`;
  },

  /* Technical grid: one large + two small details, numbered legend of real construction elements */
  technicalGrid(s, h) {
    const badge = (n) => `<div class="panel" style="left:0;top:0;width:64px;height:64px;display:flex;align-items:center;justify-content:center"><span class="num" style="font-size:30px">${n}</span></div>`;
    return `
      ${h.hdr(s)}
      ${box(M, 318, 860, `<p class="lead a-fade" style="font-size:${s.leadSize || 64}px">${h.t(s.lead)}</p>`)}
      <div style="${at(M, 560, 560, 'height:760px;position:absolute')}">${h.slot('a', 0, 0, 560, 760)}${badge('01')}</div>
      <div style="${at(680, 560, 304, 'height:372px;position:absolute')}">${h.slot('b', 0, 0, 304, 372, { cls: 'sm' })}${badge('02')}</div>
      <div style="${at(680, 948, 304, 'height:372px;position:absolute')}">${h.slot('c', 0, 0, 304, 372, { cls: 'sm' })}${badge('03')}</div>
      ${boxB(M, SAFE_B, W - 2 * M, `<ul class="legend">${s.legend.map((l, i) => `<li><span class="num">0${i + 1}</span><span>${h.t(l)}</span></li>`).join('')}</ul>`)}`;
  },

  /* Product in motion — full-screen video, minimal graphics, solid band top or bottom */
  motionFull(s, h) {
    const top = s.band === 'top';
    const band = top
      ? `<div class="panel" style="left:0;top:0;width:${W}px;height:660px"></div>
         ${box(M, 340, 760, `<div style="display:flex;align-items:center;gap:26px;margin-bottom:34px"><div class="play">${PLAY}</div><span class="cap accent">${h.t(s.caption || 'Video')}</span></div>
           <p class="lead a-fade" style="font-size:${s.leadSize || 60}px">${h.t(s.lead)}</p>${bodies(h, s.body, 'body s muted')}`)}`
      : `<div class="panel" style="left:0;top:1250px;width:${W}px;height:670px"></div>
         ${box(M, 1250, W - 2 * M, `<div class="rule a-line"></div>`)}
         ${boxB(M, SAFE_B, 800, `<div style="display:flex;align-items:center;gap:26px;margin-bottom:30px"><div class="play">${PLAY}</div><span class="cap accent">${h.t(s.caption || 'Video')}</span></div>
           <p class="lead a-fade" style="font-size:${s.leadSize || 60}px">${h.t(s.lead)}</p>${s.body ? `<div style="margin-top:18px">${bodies(h, s.body, 'body s muted')}</div>` : ''}`)}`;
    return `
      ${h.slot('main', 0, top ? 660 : 0, W, top ? 1260 : 1250, { cls: 'a-zoom video-slot' })}
      ${band}
      ${h.hdr(s, { theme: top ? '' : s.hdrTheme })}`;
  },

  /* Architectural context — interior photograph with a solid text band (top or bottom) */
  contextBand(s, h) {
    const top = s.band !== 'bottom';
    const split = top ? 760 : 1180;
    return top ? `
      ${h.hdr(s)}
      ${box(M, 330, 0, `<div class="kicker accent">${h.t(s.kicker || '')}</div>`)}
      ${box(M, 400, 840, `${s.title ? `<div class="title a-fade" style="font-size:${s.titleSize || 110}px;margin-bottom:24px">${h.t(s.title)}</div>` : ''}<p class="lead a-fade d2" style="font-size:${s.leadSize || 58}px">${h.t(s.lead)}</p>`)}
      ${h.slot('main', 0, split, W, 1920 - split, { cls: 'a-zoom' })}
      ${box(W - M - 280, split + 30, 280, `<div class="panel" style="position:relative;padding:14px 18px"><div class="cap" style="text-align:right">${h.t(s.caption || '')}</div></div>`)}`
    : `
      ${h.slot('main', 0, 0, W, split, { cls: 'a-zoom' })}
      ${h.hdr(s, { theme: s.hdrTheme })}
      ${box(M, split + 56, W - 2 * M, `<div style="display:flex;justify-content:space-between;align-items:center"><span class="kicker accent">${h.t(s.kicker || '')}</span><span class="cap">${h.t(s.caption || '')}</span></div><div class="rule a-line" style="margin-top:26px"></div>`)}
      ${boxB(M, SAFE_B, 860, `${s.title ? `<div class="title a-fade" style="font-size:${s.titleSize || 104}px;margin-bottom:20px">${h.t(s.title)}</div>` : ''}<p class="lead a-fade d2" style="font-size:${s.leadSize || 58}px">${h.t(s.lead)}</p>`)}`;
  },

  /* Commercial closing — split: product photograph top half on dark, offer on light below */
  closingSplit(s, h) {
    return `
      ${h.slot('main', 0, 0, W, 1000, { cls: 'a-zoom', theme: 't-graphite' })}
      ${h.hdr(s, { theme: 't-graphite' })}
      ${box(M, 1060, 0, `<div class="kicker accent">${h.t(s.kicker || '')}</div>`)}
      ${box(M - 4, 1120, 880, `<h1 class="title a-fade" style="font-size:${s.titleSize || 90}px">${h.t(s.title)}</h1>`)}
      ${boxB(M, SAFE_B, W - 2 * M, cta(h, s))}`;
  },

  /* Editorial with offset product — name and copy top-left, photograph bleeding off the side */
  editorialOffset(s, h) {
    const m = !!s.mirror;
    const px = m ? 0 : 300, pw = 780;
    return `
      ${h.hdr(s)}
      ${box(m ? M : M - 6, 318, m ? W - 2 * M : 0, `<div class="display a-fade" style="font-size:${s.titleSize || 200}px;${m ? 'text-align:right' : ''}">${h.t(s.title)}</div>`)}
      ${box(m ? W - M - 560 : M, 530, 560, bodies(h, s.body), '', m ? 'text-align:right' : '')}
      ${h.slot('main', px, 760, pw, 840, { cls: 'a-zoom' })}
      ${box(m ? W - M - 196 : M, 1260, 196, `<div class="rule accent a-line" style="margin-bottom:22px"></div><div class="cap" style="line-height:1.6;${m ? 'text-align:right' : ''}">${h.t(s.caption || '')}</div>`)}`;
  },

  /* Product in motion — main video frame + three-frame sequence strip */
  motionSequence(s, h) {
    const fw = (W - 2 * M - 32) / 3;
    return `
      ${h.hdr(s)}
      ${box(M, 318, 860, `<p class="lead a-fade" style="font-size:${s.leadSize || 62}px">${h.t(s.lead)}</p>`)}
      ${h.slot('main', M, 540, W - 2 * M, 720, { cls: 'a-zoom' })}
      ${box(M + 30, 540 + 30, 0, `<div class="panel" style="position:relative;padding:14px 20px;display:flex;gap:16px;align-items:center"><span class="cap accent">${h.t(s.caption || 'Video')}</span></div>`)}
      ${[0, 1, 2].map(i => h.slot('f' + (i + 1), M + i * (fw + 16), 1284, fw, 230, { cls: 'sm' })).join('')}
      ${[0, 1, 2].map(i => box(M + i * (fw + 16), 1532, fw, `<div style="display:flex;gap:14px;align-items:baseline"><span class="num" style="font-size:28px">0${i + 1}</span><span class="cap">${h.t((s.frames || [])[i] || '')}</span></div>`)).join('')}
`;
  },

  /* Macro details — 2 × 2 mosaic, each crop labelled with the real element it shows */
  macroMosaic(s, h) {
    const cw = (W - 2 * M - 16) / 2, chh = 400;
    const ys = [560, 560 + chh + 70];
    return `
      ${h.hdr(s)}
      ${box(M, 318, 860, `<p class="lead a-fade" style="font-size:${s.leadSize || 62}px">${h.t(s.lead)}</p>`)}
      ${[0, 1, 2, 3].map(i => {
        const x = M + (i % 2) * (cw + 16), y = ys[Math.floor(i / 2)];
        return h.slot('d' + (i + 1), x, y, cw, chh, { cls: 'sm' }) +
          box(x, y + chh + 16, cw, `<div style="display:flex;gap:14px;align-items:baseline"><span class="num" style="font-size:28px">0${i + 1}</span><span class="cap" style="letter-spacing:.16em">${h.t(s.legend[i])}</span></div>`);
      }).join('')}`;
  },

  /* Architectural context with framed close-up inset */
  contextInset(s, h) {
    return `
      ${h.hdr(s)}
      ${box(M, 330, 0, `<div class="kicker accent">${h.t(s.kicker || '')}</div>`)}
      ${box(M, 396, 820, `<p class="lead a-fade" style="font-size:${s.leadSize || 62}px">${h.t(s.lead)}</p>`)}
      ${h.slot('main', 0, 680, W, 1240, { cls: 'a-zoom' })}
      <div class="panel" style="left:${W - M - 400}px;top:1080px;width:400px;height:520px;padding:14px">
        <div style="position:relative;width:372px;height:430px">${h.slot('inset', 0, 0, 372, 430, { cls: 'sm' })}</div>
        <div class="cap" style="margin-top:20px;font-size:17px">${h.t(s.insetCaption || '')}</div>
      </div>`;
  },

  /* Commercial closing — product centred on dark, clean typography */
  closingCentered(s, h) {
    return `
      ${h.hdr(s)}
      ${h.slot('main', 190, 360, 700, 720, { cls: 'a-zoom contain' })}
      ${box(M, 1120, 0, `<div class="kicker accent">${h.t(s.kicker || '')}</div>`)}
      ${box(M - 4, 1170, 888, `${s.title ? `<div class="display a-fade" style="font-size:${s.titleSize || 120}px;margin-bottom:22px">${h.t(s.title)}</div>` : ''}${s.lead ? `<p class="lead a-fade d2" style="font-size:${s.leadSize || 60}px">${h.t(s.lead)}</p>` : ''}`)}
      ${boxB(M, SAFE_B, W - 2 * M, cta(h, s))}`;
  },

  /* Full-height product column, narrow text column — strong vertical rhythm */
  heroColumn(s, h) {
    const m = !!s.mirror;
    const cx = m ? 0 : 440, tx = m ? 700 : M, tw = 290;
    return `
      ${h.slot('main', cx, 0, 640, 1920, { cls: 'a-zoom' })}
      ${h.hdr(s, { theme: s.hdrTheme, narrow: m ? 'right' : 'left' })}
      ${box(tx - 4, 380, tw + 20, `<div class="display a-fade" style="font-size:${s.titleSize || 140}px">${h.t(s.title)}</div>`)}
      ${box(tx, 560, 80, `<div class="rule accent a-line"></div>`)}
      ${box(tx, 600, tw, `<div class="cap" style="line-height:1.7">${h.t(s.caption || '')}</div>`)}
      ${boxB(tx, SAFE_B, tw, bodies(h, s.body, 'body s'))}`;
  },

  /* Commercial closing — several models in one composition */
  collectionGrid(s, h) {
    if (s.grid === 'row') {
      const cw = (W - 2 * M - 32) / 3;
      return `
        ${h.hdr(s)}
        ${box(M - 4, 318, 880, `<h1 class="title a-fade" style="font-size:${s.titleSize || 96}px">${h.t(s.title)}</h1>`)}
        ${[1, 2, 3].map((n, i) => h.slot('m' + n, M + i * (cw + 16), 620 + (i === 1 ? 50 : 0), cw, 640, { cls: 'sm contain' })).join('')}
        ${box(M, 1340, W - 2 * M, `<div style="display:flex;justify-content:space-between"><span class="kicker accent">${h.t(s.caption || '')}</span><span class="cap">${h.t(s.count || '')}</span></div>`)}
        ${boxB(M, SAFE_B, W - 2 * M, cta(h, s))}`;
    }
    const cw = (W - 2 * M - 16) / 2, ch = 330;
    return `
      ${h.hdr(s)}
      ${box(M, 318, 0, `<div class="kicker accent">${h.t(s.kicker || '')}</div>`)}
      ${box(M - 4, 372, 900, `<h1 class="title a-fade" style="font-size:${s.titleSize || 84}px">${h.t(s.title)}</h1>`)}
      ${box(M, 560, 760, bodies(h, s.body, 'body s muted'))}
      ${[0, 1, 2, 3].map(i => h.slot('m' + (i + 1), M + (i % 2) * (cw + 16), 720 + Math.floor(i / 2) * (ch + 16), cw, ch, { cls: 'sm contain' })).join('')}
      ${boxB(M, SAFE_B, W - 2 * M, cta(h, s))}`;
  },

  /* Hero on interior photograph — full-bleed image, solid lower panel carrying brand and model */
  heroFullDark(s, h) {
    return `
      ${h.slot('main', 0, 0, W, 1200, { cls: 'a-zoom' })}
      ${h.hdr(s, { theme: s.hdrTheme })}
      <div class="panel" style="left:0;top:1200px;width:${W}px;height:720px"></div>
      ${box(M, 1250, W - 2 * M, `<div style="display:flex;justify-content:space-between;align-items:center"><span class="kicker accent">${h.t(s.kicker)}</span><span class="cap">${h.t(s.caption || '')}</span></div>`)}
      ${box(M - 6, 1310, 0, `<div class="display a-fade" style="font-size:${s.titleSize || 176}px">${h.t(s.title)}</div>`)}
      ${boxB(M, SAFE_B, 640, bodies(h, s.body, 'body s'))}`;
  },

  /* Design — several angles: three vertical slices or one large + two */
  multiAngle(s, h) {
    if (s.variant === 'large') {
      return `
        ${h.hdr(s)}
        ${box(M, 318, 880, `<p class="lead a-fade" style="font-size:${s.leadSize || 64}px">${h.t(s.lead)}</p>`)}
        ${h.slot('a', 0, 600, 640, 900, { cls: 'a-zoom' })}
        ${h.slot('b', 664, 600, 416, 438, { cls: 'sm' })}
        ${h.slot('c', 664, 1062, 416, 438, { cls: 'sm' })}
        ${box(M, 1530, 520, `<div style="display:flex;gap:14px;align-items:baseline"><span class="num" style="font-size:28px">01</span><span class="cap">${h.t((s.angles || [])[0] || '')}</span></div>`)}
        ${box(688, 1530, 296, `<div style="display:flex;gap:14px;align-items:baseline"><span class="num" style="font-size:28px">02—03</span><span class="cap">${h.t((s.angles || [])[1] || '')}</span></div>`)}`;
    }
    const cw = (W - 2 * M - 32) / 3;
    return `
      ${h.hdr(s)}
      ${box(M - 4, 318, 900, (s.lines || []).map((l, i) => `<div class="title a-fade d${i + 1}" style="font-size:${s.titleSize || 82}px;${i === 1 ? 'font-style:italic;font-weight:500' : ''}">${h.t(l)}</div>`).join(''))}
      ${[0, 1, 2].map(i => h.slot('a' + (i + 1), M + i * (cw + 16), 690 + (i === 1 ? -40 : 0), cw, 800, { cls: 'sm' })).join('')}
      ${[0, 1, 2].map(i => box(M + i * (cw + 16), 1520 + (i === 1 ? -40 : 0), cw, `<div style="display:flex;gap:12px;align-items:baseline"><span class="num" style="font-size:26px">0${i + 1}</span><span class="cap">${h.t((s.angles || [])[i] || '')}</span></div>`)).join('')}`;
  },

  /* Finishes — real finish samples composed as a premium palette */
  finishPalette(s, h) {
    const n = s.finishes.length;
    if (s.variant === 'bars') {
      const bw = (W - 2 * M - (n - 1) * 16) / n;
      return `
        ${h.hdr(s)}
        ${box(M, 318, 860, `<p class="lead a-fade" style="font-size:${s.leadSize || 64}px">${h.t(s.lead)}</p>`)}
        ${s.finishes.map((f, i) => h.slot('fin' + (i + 1), M + i * (bw + 16), 600 + (i % 2) * 60, bw, 760, { cls: 'sm' }) +
          box(M + i * (bw + 16), 1380 + (i % 2) * 60, bw, `<div class="num" style="font-size:28px">0${i + 1}</div><div class="swatch-name" style="margin-top:6px">${h.t(f)}</div>`)).join('')}`;
    }
    const tw = (W - 2 * M - (n - 1) * 16) / n;
    return `
      ${h.hdr(s)}
      ${box(M - 4, 318, 0, `<div class="display a-fade" style="font-size:${s.titleSize || 120}px">${h.t(s.title)}</div>`)}
      ${box(M, 450, 640, bodies(h, s.body, 'body s'))}
      ${h.slot('main', M, 620, W - 2 * M, 600, { cls: 'a-zoom' })}
      ${s.finishes.map((f, i) => h.slot('fin' + (i + 1), M + i * (tw + 16), 1250, tw, tw, { cls: 'sm' }) +
        box(M + i * (tw + 16), 1250 + tw, tw, `<div class="swatch-name">${h.t(f)}</div>`)).join('')}`;
  },

  /* Architectural context — gallery-style framed photograph with passe-partout */
  contextFrame(s, h) {
    const wide = s.variant === 'bleed';
    return `
      ${h.hdr(s)}
      ${h.slot('main', wide ? 0 : M, 360, wide ? 920 : W - 2 * M, 1010, { cls: 'a-zoom' })}
      ${wide ? box(950, 360, 34, `<div class="vrule" style="height:1010px;margin-left:16px"></div>`) : ''}
      ${box(M, 1400, W - 2 * M, `<div style="display:flex;justify-content:space-between"><span class="cap">${h.t(s.caption || '')}</span><span class="kicker accent">${h.t(s.kicker || '')}</span></div>`)}
      ${boxB(M, SAFE_B, 860, `<p class="lead a-fade" style="font-size:${s.leadSize || 56}px">${h.t(s.lead)}</p>`)}`;
  },

  /* Offer — oversized figure, product, short commercial line */
  offer(s, h) {
    return `
      ${h.hdr(s)}
      ${h.slot('main', 0, 380, 600, 960, { cls: 'a-zoom' })}
      ${box(640, 390, 344, `<div class="kicker accent" style="line-height:1.6">${h.t(s.kicker)}</div>`)}
      ${box(626, 470, 0, `<div class="display" style="font-size:${s.figureSize || 300}px;letter-spacing:-.03em">${h.t(s.figure)}</div>`)}
      ${box(640, 790, 344, `<div class="rule accent a-line" style="margin-bottom:30px"></div>${bodies(h, s.body, 'body s')}`)}
      ${boxB(M, SAFE_B, W - 2 * M, cta(h, s))}`;
  },

  /* Technical — three panoramic detail strips with labels */
  detailStrip(s, h) {
    const ys = [620, 900, 1180];
    return `
      ${h.hdr(s)}
      ${box(M, 318, 880, `<p class="lead a-fade" style="font-size:${s.leadSize || 54}px">${h.t(s.lead)}</p>`)}
      ${ys.map((y, i) => h.slot('d' + (i + 1), 330, y, W - 330, 256, { cls: 'sm' }) +
        box(M, y, 200, `<div class="num" style="font-size:44px;line-height:1">0${i + 1}</div><div class="rule" style="margin:18px 0 14px"></div><div class="cap" style="letter-spacing:.16em">${h.t(s.legend[i])}</div>`)).join('')}
      ${boxB(M, SAFE_B, W - 2 * M, `<div class="rule"></div><div style="display:flex;justify-content:space-between;margin-top:22px"><span class="kicker accent">${h.t(s.kicker || '')}</span><span class="cap">${h.t(s.caption || '')}</span></div>`)}`;
  },

  /* Split-screen closing — two brands left / right with one colour treatment */
  splitVertical(s, h) {
    return `
      ${h.slot('left', 0, 0, 539, 1120, { cls: 'a-zoom' })}
      ${h.slot('right', 541, 0, 539, 1120, { cls: 'a-zoom' })}
      ${h.hdr(s, { theme: s.hdrTheme })}
      ${box(M, 1160, 400, `<div class="kicker accent">${h.t(s.labels[0])}</div>`)}
      ${box(541 + 48, 1160, 400, `<div class="kicker accent">${h.t(s.labels[1])}</div>`)}
      ${box(539, 1120, 2, `<div class="vrule" style="height:90px;margin-left:0"></div>`)}
      ${box(M - 4, 1240, 888, `<h1 class="title a-fade" style="font-size:${s.titleSize || 72}px">${h.t(s.title)}</h1>`)}
      ${boxB(M, SAFE_B, W - 2 * M, cta(h, s))}`;
  },

  /* Product comparison — two specific models side by side */
  comparison(s, h) {
    const cw = (W - 2 * M - 24) / 2;
    return `
      ${h.hdr(s)}
      ${box(M - 4, 318, 880, `<h1 class="title a-fade" style="font-size:${s.titleSize || 92}px">${h.t(s.title)}</h1>`)}
      ${[0, 1].map(i => h.slot('m' + (i + 1), M + i * (cw + 24), 560, cw, 700, { cls: 'contain' }) +
        box(M + i * (cw + 24), 1284, cw, `<div style="display:flex;gap:16px;align-items:baseline"><span class="num" style="font-size:40px">0${i + 1}</span><span class="kicker" style="font-size:20px">${h.t(s.models[i])}</span></div><div class="rule" style="margin-top:18px"></div>`)).join('')}
      ${boxB(M, SAFE_B, 720, bodies(h, s.body))}`;
  },

  /* Duo — two products in one composition, large + small, bottom-aligned */
  duo(s, h) {
    return `
      ${h.hdr(s)}
      ${box(M - 4, 318, 900, `<h1 class="title a-fade" style="font-size:${s.titleSize || 84}px">${h.t(s.title)}</h1>`)}
      ${h.slot('a', 0, 580, 700, 760, { cls: 'a-zoom' })}
      ${h.slot('b', 730, 940, 350, 400, { cls: 'sm' })}
      ${box(730, 600, 254, `<div class="num" style="font-size:40px">01</div><div class="cap" style="margin-top:8px">${h.t(s.labels[0])}</div><div class="rule" style="margin:34px 0"></div><div class="num" style="font-size:40px">02</div><div class="cap" style="margin-top:8px">${h.t(s.labels[1])}</div>`)}
      ${boxB(M, SAFE_B, W - 2 * M, cta(h, s))}`;
  },

  /* Statement + photo — large technical statement, photograph bleeding right */
  statementPhoto(s, h) {
    return `
      ${h.hdr(s)}
      ${box(M - 2, 318, 900, `<p class="title a-fade" style="font-size:${s.titleSize || 76}px;font-weight:500">${h.t(s.lead)}</p>`)}
      ${h.slot('main', M, 760, W - M, 700, { cls: 'a-zoom' })}
      ${boxB(M, SAFE_B, W - 2 * M, `<div style="display:flex;align-items:center;gap:22px"><div class="rule accent" style="width:72px"></div><span class="cap">${h.t(s.caption || '')}</span></div>`)}`;
  },
};
