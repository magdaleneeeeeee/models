// Layouts for highlight (Актуальное) catalogue stories — minimal white studio style.
// Each returns inner HTML of <div class="story t-white hl">. Canvas 1080 × 1920; meaningful content within y 262 … 1610.

const W = 1080, M = 96, CW = W - 2 * M, BOTTOM = 1600;
const ARROW = `<svg viewBox="0 0 24 24"><path d="M4 12h15M13 6l6 6-6 6"/></svg>`;
const at = (x, y, w, html, extra = '') => `<div style="position:absolute;left:${x}px;top:${y}px;${w ? `width:${w}px;` : ''}${extra}">${html}</div>`;
const atB = (x, b, w, html, extra = '') => `<div style="position:absolute;left:${x}px;bottom:${1920 - b}px;width:${w}px;${extra}">${html}</div>`;
const specTable = (h, specs) => `<table class="specs">${specs.map(([l, v]) => `<tr><td class="l">${h.t(l)}</td><td>${h.t(v)}</td></tr>`).join('')}</table>`;
// rough height estimate of the spec table (to give the photo the remaining space)
const specH = (specs) => specs.reduce((s, [, v]) => s + 30 + 33 * Math.ceil(String(v).length / 40), 0);
const textH = (t, cpl = 52, lh = 41) => (t ? Math.ceil(t.length / cpl) * lh : 0);

export const hl = {
  cover(b, h) {
    const n = b.name; const fs = n.length > 10 ? 64 : n.length > 7 ? 80 : 104;
    return `
      <div class="ring" style="left:${540 - 330}px;top:${960 - 330}px;width:660px;height:660px"></div>
      ${at(M, 960 - fs * 0.62, CW, `<div class="t1" style="font-size:${fs}px;text-align:center;letter-spacing:.06em">${h.t(n)}</div>`)}
      ${at(M, 960 + fs * 0.62, CW, `<div class="k" style="text-align:center">каталог</div>`)}
      ${at(M, 1360, CW, `<div class="sub" style="text-align:center">CREATURA</div>`)}`;
  },

  intro(b, s, h) {
    const toc = s.toc;
    return `
      ${h.hdr(b, s)}
      ${at(M, 330, 0, `<div class="k">Бренд в Creatura</div>`)}
      ${at(M - 4, 380, CW, `<div class="t1 xl">${h.t(b.name)}</div>`)}
      ${at(M, 510, 780, `<p class="p">${h.t(b.tagline)}</p>`)}
      ${at(M, 640, CW, specTable(h, b.facts))}
      ${atB(M, BOTTOM, CW, `<div class="k" style="margin-bottom:18px">В разделе · ${toc.length}</div><ul class="toc">${toc.map((c, i) => `<li><b>${String(i + 1).padStart(2, '0')}</b><span>${h.t(c)}</span></li>`).join('')}</ul>`)}`;
  },

  product(b, s, h) {
    const sp = specH(s.specs || []); const tx = textH(s.text);
    const subH = s.sub ? 40 : 0;
    const textTop = BOTTOM - sp - 34 - tx - 16 - subH - 78; // title block starts here
    const photoH = Math.max(380, Math.min(720, textTop - 30 - 380));
    return `
      ${h.hdr(b, s)}
      ${at(M, 330, 0, `<div class="k">${h.t(s.cat)}</div>`)}
      ${h.m(s.img, M, 380, CW, photoH, { big: true })}
      ${atB(M, BOTTOM, CW, `<div class="t1">${h.t(s.title)}</div>${s.sub ? `<div class="sub" style="margin-top:12px">${h.t(s.sub)}</div>` : ''}
        ${s.text ? `<p class="p s" style="margin-top:20px">${h.t(s.text)}</p>` : ''}
        ${s.specs?.length ? `<div style="margin-top:30px">${specTable(h, s.specs)}</div>` : ''}`)}`;
  },

  list(b, s, h) {
    const top = s.lead ? 560 : 500; const n = s.rows.length;
    const rh = Math.min(300, Math.floor((BOTTOM - top) / n)); const th = Math.min(250, rh - 34);
    return `
      ${h.hdr(b, s)}
      ${at(M, 330, 0, `<div class="k">${h.t(s.cat)}</div>`)}
      ${at(M - 2, 376, CW, `<div class="t1">${h.t(s.title)}</div>`)}
      ${s.lead ? at(M, 460, 820, `<p class="p s">${h.t(s.lead)}</p>`) : ''}
      ${s.rows.map((r, i) => `<div class="row" style="top:${top + i * rh}px;height:${rh - 22}px">
          <div class="th" style="width:${th}px;height:${th}px">${h.m(r.img, 0, 0, th, th, { thumb: true })}</div>
          <div><div class="nm">${h.t(r.name)}</div><div class="tx">${h.t(r.text)}</div>${r.spec ? `<div class="sp">${h.t(r.spec)}</div>` : ''}</div>
        </div>`).join('')}`;
  },

  grid(b, s, h) {
    const tw = (CW - 24) / 2, th = 250, rowH = 352;
    return `
      ${h.hdr(b, s)}
      ${at(M, 330, 0, `<div class="k">${h.t(s.cat)}</div>`)}
      ${at(M - 2, 376, CW, `<div class="t1">${h.t(s.title)}</div>`)}
      ${s.items.map((it, i) => `<div class="tile" style="left:${M + (i % 2) * (tw + 24)}px;top:${480 + Math.floor(i / 2) * rowH}px;width:${tw}px">
          ${h.m(it.img, 0, 0, tw, th, { thumb: true, rel: true })}
          <div style="height:${th}px"></div><div class="nm">${h.t(it.name)}</div>${it.code ? `<div class="cd">Арт. ${h.t(it.code)}</div>` : ''}
        </div>`).join('')}
      ${s.note ? atB(M, BOTTOM, CW, `<div class="rule" style="margin-bottom:16px"></div><div class="sub">${h.t(s.note)}</div>`) : ''}`;
  },

  cta(b, s, h) {
    return `
      ${h.hdr(b, s)}
      ${at(M, 330, 0, `<div class="k">${h.t(b.name)} в Creatura</div>`)}
      ${at(M - 2, 600, CW, `<p class="q">Подбираете ${h.t(b.ctaWhat || 'фурнитуру')} ${h.t(b.name)}?</p>`)}
      ${at(M, 860, 760, `<p class="p">Подберём модели под ваш проект. Для мебельных и дверных производств, дизайнеров и архитекторов.</p>`)}
      ${at(M, 1130, 0, `<span class="cta">Запросите каталог ${h.t(b.name)}${ARROW}</span>`)}
      ${atB(M, BOTTOM, CW, `<div style="display:flex;justify-content:center"><div class="wm">CREATURA</div></div>`)}`;
  },
};
