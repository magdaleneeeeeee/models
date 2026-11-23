// Highlight stories v2 — brand-styled, large readable type. Returns complete HTML documents.
import { fontFaces } from './themes.mjs';

const W = 1080, M = 96, CW = W - 2 * M, BOTTOM = 1600;
const ARROW = (c) => `<svg viewBox="0 0 24 24" width="38" height="38" style="flex:none;margin-left:18px"><path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="${c}" stroke-width="1.8"/></svg>`;
const at = (x, y, w, html, extra = '') => `<div style="position:absolute;left:${x}px;top:${y}px;${w ? `width:${w}px;` : ''}${extra}">${html}</div>`;
const atB = (x, b, w, html, extra = '') => `<div style="position:absolute;left:${x}px;bottom:${1920 - b}px;width:${w}px;${extra}">${html}</div>`;

function css(t, rel) {
  const f = fontFaces(t, rel);
  const up = t.head.up ? 'uppercase' : 'none';
  return `${f.css}
  *{box-sizing:border-box;margin:0;padding:0}html,body{width:1080px;height:1920px;background:${t.bg}}
  .s{position:relative;width:1080px;height:1920px;overflow:hidden;background:${t.bg};color:${t.fg};font-family:"${f.body}",sans-serif;-webkit-font-smoothing:antialiased}
  .hdr{position:absolute;left:${M}px;right:${M}px;top:262px;display:flex;justify-content:space-between;align-items:center;z-index:3;font:600 22px/1 "${f.body}";letter-spacing:.28em;text-transform:uppercase}
  .hdr .n{letter-spacing:.14em;font-weight:500;opacity:.75}
  .band{position:absolute;left:0;top:0;width:1080px;background:${t.band || 'transparent'}}
  .k{font:${t.kick.w} 26px/1.3 "${f.body}";letter-spacing:${t.kick.tr};text-transform:uppercase;color:${t.kick.color}}
  .bar{width:72px;height:6px;background:${t.accent};margin-bottom:22px}
  .t{font-family:"${f.head}";font-weight:${t.head.w};letter-spacing:${t.head.tr};text-transform:${up};line-height:1.04;font-size:84px}
  .t.xl{font-size:112px}
  .sub{font:500 28px/1.3 "${f.body}";color:${t.muted};margin-top:14px;${t.sub?.italic ? 'font-style:italic;' : 'letter-spacing:.04em;'}}
  .p{font:400 34px/1.4 "${f.body}"}
  .specs{width:100%;border-collapse:collapse}
  .specs td{border-top:1.5px solid ${t.line};padding:16px 0 15px;vertical-align:top;font:500 30px/1.32 "${f.body}"}
  .specs tr:last-child td{border-bottom:1.5px solid ${t.line}}
  .specs td.l{width:290px;padding-right:24px;color:${t.muted};font-weight:400}
  .m{position:absolute;overflow:hidden;background:${t.plate}}
  .m img{position:absolute;inset:0;width:100%;height:100%;display:block}
  .m.cut img{object-fit:contain}.m.plate img{object-fit:cover}
  .row{position:absolute;left:${M}px;right:${M}px;display:flex;gap:36px;align-items:center}
  .row .th{position:relative;flex:none}
  .row .nm{font-family:"${f.head}";font-weight:${t.head.w};letter-spacing:${t.head.tr};text-transform:${up};font-size:42px;line-height:1.1}
  .row .tx{font:400 30px/1.36 "${f.body}";margin-top:10px}
  .row .sp{font:500 24px/1.3 "${f.body}";color:${t.muted};margin-top:10px}
  .tile{position:absolute}
  .tile .nm{font-family:"${f.head}";font-weight:${t.head.w};text-transform:${up};letter-spacing:${t.head.tr};font-size:36px;line-height:1.1;margin-top:16px}
  .tile .cd{font:500 24px/1.2 "${f.body}";color:${t.muted};margin-top:6px}
  .toc{list-style:none}.toc.c2{columns:2;column-gap:36px}.toc.c2 li{break-inside:avoid;font-size:28px}.toc li{display:flex;gap:18px;padding:13px 0;border-top:1.5px solid ${t.line};font:400 30px/1.3 "${f.body}"}
  .toc li:last-child{border-bottom:1.5px solid ${t.line}}.toc b{font-weight:600;min-width:46px;color:${t.muted}}
  .q{font-family:"${f.head}";font-weight:${t.head.w};letter-spacing:${t.head.tr};text-transform:${up};font-size:76px;line-height:1.08}
  .cta{display:inline-flex;align-items:center;font:600 38px/1.3 "${f.body}";padding-bottom:10px;border-bottom:3px solid ${t.fg}}
  .wm{font:600 52px/1 "${f.body}";letter-spacing:.3em}
  .ring{position:absolute;border:2px solid ${t.fg};border-radius:50%}
  .ph{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font:500 22px "${f.body}";color:${t.muted};border:2px dashed ${t.line}}`;
}

const specTable = (h, specs) => `<table class="specs">${specs.map(([l, v]) => `<tr><td class="l">${h.t(l)}</td><td>${h.t(v)}</td></tr>`).join('')}</table>`;
const specH = (specs) => specs.reduce((s, [, v]) => s + 32 + 40 * Math.ceil(String(v).length / 27), 0);
const textH = (t, cpl = 46, lh = 48) => (t ? Math.ceil(t.length / cpl) * lh : 0);
const titleH = (t, size = 84) => Math.ceil(String(t).length / (size > 90 ? 12 : 15)) * size * 1.06;

const hdr = (b, s, t) => `<div class="hdr" style="color:${t.band ? '#fff' : t.fg}"><span>CREATURA</span><span class="n">${b.name}&nbsp;&nbsp;${String(s.n).padStart(2, '0')}/${s.total}</span></div>`;
const kick = (h, txt, t, y = 330) => (t.band ? `<div class="band" style="height:${y + 70}px"></div>` : '') + at(M, y, CW, `${t.bar ? '<div class="bar"></div>' : ''}<div class="k">${h.t(txt)}</div>`, t.bar ? 'margin-top:-28px' : '');

export const V2 = {
  doc(t, rel, inner) { return `<!doctype html><html lang="ru"><head><meta charset="utf-8"><style>${css(t, rel)}</style></head><body><div class="s">${inner}</div></body></html>`; },

  cover(b, s, h, t) {
    const n = b.name; const fs = n.length > 12 ? 62 : n.length > 8 ? 78 : 104;
    return `${t.band ? `<div class="band" style="height:1920px;background:${t.band}"></div>` : ''}
      <div class="ring" style="left:210px;top:630px;width:660px;height:660px;border-color:${t.band ? '#fff' : t.fg}"></div>
      ${at(M, 960 - fs * 0.6, CW, `<div class="t" style="font-size:${fs}px;text-align:center;color:${t.band ? '#fff' : t.fg}">${h.t(n)}</div>`)}
      ${b.coverSub ? at(M, 960 + fs * 0.62, CW, `<div class="k" style="text-align:center;color:${t.band ? '#fff' : t.kick.color}">${h.t(b.coverSub)}</div>`) : ''}
      ${at(M, 1360, CW, `<div class="k" style="text-align:center;color:${t.band ? '#fff' : t.muted}">каталог · Creatura</div>`)}`;
  },

  intro(b, s, h, t) {
    return `${kick(h, 'Бренд в Creatura', t)}${hdr(b, s, t)}
      ${at(M - 4, t.band ? 440 : 392, CW, `<div class="t xl">${h.t(b.name)}</div>`)}
      ${at(M, t.band ? 580 : 540, CW, `<p class="p">${h.t(b.tagline)}</p>`)}
      ${at(M, t.band ? 720 : 690, CW, specTable(h, b.facts))}
      ${atB(M, BOTTOM, CW, `<div class="k" style="margin-bottom:18px;color:${t.muted}">В разделе</div><ul class="toc ${s.toc.length > 7 ? 'c2' : ''}">${s.toc.map((c, i) => `<li><b>${String(i + 1).padStart(2, '0')}</b><span>${h.t(c)}</span></li>`).join('')}</ul>`)}`;
  },

  product(b, s, h, t) {
    const sp = specH(s.specs || []); const tx = textH(s.text); const th = titleH(s.title);
    const blockH = th + (s.sub ? 52 : 0) + (s.text ? tx + 22 : 0) + (s.specs?.length ? sp + 30 : 0);
    const top = t.band ? 420 : 392;
    const photoH = Math.max(300, Math.min(760, BOTTOM - blockH - 40 - top));
    return `${kick(h, s.cat, t)}${hdr(b, s, t)}
      ${h.m(s.img, M, top, CW, photoH)}
      ${atB(M, BOTTOM, CW, `<div class="t">${h.t(s.title)}</div>${s.sub ? `<div class="sub">${h.t(s.sub)}</div>` : ''}
        ${s.text ? `<p class="p" style="margin-top:22px">${h.t(s.text)}</p>` : ''}
        ${s.specs?.length ? `<div style="margin-top:30px">${specTable(h, s.specs)}</div>` : ''}`)}`;
  },

  swatches(b, s, h, t) {
    const n = s.items.length; const cols = 2; const tw = (CW - 32) / cols; const ih = n > 2 ? 330 : 520;
    const top = t.band ? 560 : 530;
    return `${kick(h, s.cat, t)}${hdr(b, s, t)}
      ${at(M - 2, t.band ? 440 : 392, CW, `<div class="t">${h.t(s.title)}</div>`)}
      ${s.items.map((it, i) => `<div class="tile" style="left:${M + (i % cols) * (tw + 32)}px;top:${top + Math.floor(i / cols) * (ih + 150)}px;width:${tw}px">
        ${it.img ? h.m(it.img, 0, 0, tw, ih, { rel: true }) : `<div class="m" style="left:0;top:0;width:${tw}px;height:${ih}px;background:${t.plate};border:1.5px solid ${t.line};display:flex;align-items:center;justify-content:center"><span style="font-size:72px;font-weight:600;line-height:1;letter-spacing:.02em;color:${t.accent}">${h.t(it.badge || '')}</span></div>`}<div style="height:${ih}px"></div>
        <div class="nm">${h.t(it.name)}</div>${it.code ? `<div class="cd">${h.t(it.code)}</div>` : ''}</div>`).join('')}
      ${s.note ? atB(M, BOTTOM, CW, `<p class="p" style="font-size:30px;color:${t.muted}">${h.t(s.note)}</p>`) : ''}`;
  },

  list(b, s, h, t) {
    const top = (t.band ? 560 : 520) + (s.lead ? 70 : 0); const n = s.rows.length;
    const rh = Math.min(360, Math.floor((BOTTOM - top) / Math.max(n, 3))); const th = Math.min(280, rh - 40);
    return `${kick(h, s.cat, t)}${hdr(b, s, t)}
      ${at(M - 2, t.band ? 440 : 392, CW, `<div class="t">${h.t(s.title)}</div>`)}
      ${s.lead ? at(M, (t.band ? 440 : 392) + 104, CW, `<p class="p" style="font-size:30px;color:${t.muted}">${h.t(s.lead)}</p>`) : ''}
      ${s.rows.map((r, i) => `<div class="row" style="top:${top + i * rh}px;height:${rh - 24}px">
        <div class="th" style="width:${th}px;height:${th}px">${h.m(r.img, 0, 0, th, th)}</div>
        <div><div class="nm">${h.t(r.name)}</div>${r.text ? `<div class="tx">${h.t(r.text)}</div>` : ''}${r.spec ? `<div class="sp">${h.t(r.spec)}</div>` : ''}</div></div>`).join('')}`;
  },

  grid(b, s, h, t) {
    const tw = (CW - 32) / 2, ih = 268, rowH = 368; const top = t.band ? 560 : 520;
    return `${kick(h, s.cat, t)}${hdr(b, s, t)}
      ${at(M - 2, t.band ? 440 : 392, CW, `<div class="t" style="font-size:72px">${h.t(s.title)}</div>`)}
      ${s.items.map((it, i) => `<div class="tile" style="left:${M + (i % 2) * (tw + 32)}px;top:${top + Math.floor(i / 2) * rowH}px;width:${tw}px">
        ${h.m(it.img, 0, 0, tw, ih, { rel: true })}<div style="height:${ih}px"></div>
        <div class="nm">${h.t(it.name)}</div>${it.code ? `<div class="cd">Арт. ${h.t(it.code)}</div>` : ''}</div>`).join('')}
      ${s.note ? atB(M, BOTTOM, CW, `<div class="sub">${h.t(s.note)}</div>`) : ''}`;
  },

  cta(b, s, h, t) {
    return `${kick(h, `${b.name} в Creatura`, t)}${hdr(b, s, t)}
      ${at(M - 2, 600, CW, `<p class="q">Подбираете ${h.t(b.ctaWhat)} ${h.t(b.name)}?</p>`)}
      ${at(M, 900, 860, `<p class="p">Подберём модели под ваш проект. Для мебельных и дверных производств, дизайнеров и архитекторов.</p>`)}
      ${at(M, 1170, 0, `<span class="cta">Запросите каталог${ARROW(t.fg)}</span>`)}
      ${atB(M, BOTTOM, CW, `<div style="display:flex;justify-content:center"><div class="wm">CREATURA</div></div>`)}`;
  },
};
