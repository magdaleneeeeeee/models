// Brand themes for the selection highlights (v2): each section follows the look of the brand's own site and catalogue.
// Proprietary brand fonts are replaced by the closest free Google font with Cyrillic support (files in fonts/brands).
export const THEMES = {
  salice: { // salice.com: white, black type, signature orange #FA4616, grotesk Switzer → Inter
    font: 'Inter', bg: '#FFFFFF', fg: '#000000', muted: '#5E5E5E', line: 'rgba(0,0,0,.14)', accent: '#FA4616', plate: '#F3F3F3',
    head: { w: 700, tr: '-.01em', up: false }, kick: { w: 600, tr: '.16em', color: '#FA4616' }, bar: 'accent' },
  atim: { // ATIM is part of the Salice group — same system, warm graphite accent
    font: 'Inter', bg: '#FFFFFF', fg: '#000000', muted: '#5E5E5E', line: 'rgba(0,0,0,.14)', accent: '#FA4616', plate: '#F3F3F3',
    head: { w: 700, tr: '-.01em', up: false }, kick: { w: 600, tr: '.16em', color: '#FA4616' }, bar: 'accent' },
  stv: { // STV catalogue: royal-blue header band, condensed type, "The Italian Lock"
    font: 'RobotoCondensed', bg: '#FFFFFF', fg: '#14233F', muted: '#56627A', line: 'rgba(20,35,63,.16)', accent: '#2B4C9B', plate: '#FFFFFF',
    head: { w: 700, tr: '0', up: false }, kick: { w: 600, tr: '.08em', color: '#FFFFFF' }, band: '#2B4C9B', sub: { italic: true } },
  formani: { // formani.com: black stage, white type, Gotham → Montserrat, wide-tracked capitals
    font: 'Montserrat', bg: '#000000', fg: '#FFFFFF', muted: '#A3A3A3', line: 'rgba(255,255,255,.18)', accent: '#FFFFFF', plate: '#000000',
    head: { w: 600, tr: '.1em', up: true }, kick: { w: 500, tr: '.24em', color: '#A3A3A3' } },
  verum: { // verumitaly.com: light-grey studio, black capitals, Neue Montreal → Onest
    font: 'Onest', bg: '#ECECEC', fg: '#000000', muted: '#636366', line: 'rgba(0,0,0,.14)', accent: '#000000', plate: '#ECECEC',
    head: { w: 500, tr: '.04em', up: true }, kick: { w: 500, tr: '.2em', color: '#636366' } },
  salicepaolo: { // salicepaolo.it: classic Italian brass maker — ivory, serif headings, brass hairlines
    font: 'SourceSans3', headFont: 'Cormorant Garamond', bg: '#F6F2EA', fg: '#232323', muted: '#6E6A63', line: 'rgba(35,35,35,.16)', accent: '#9C7B45', plate: '#FFFFFF',
    head: { w: 600, tr: '0', up: false }, kick: { w: 600, tr: '.2em', color: '#9C7B45' } },
  ceam: { // CEAM: engineering, model numbers as heroes — IBM Plex Sans, graphite on white
    font: 'IBMPlexSans', bg: '#FFFFFF', fg: '#1D1D1B', muted: '#5F5F5C', line: 'rgba(29,29,27,.16)', accent: '#1D1D1B', plate: '#F2F2F2',
    head: { w: 600, tr: '-.01em', up: false }, kick: { w: 600, tr: '.16em', color: '#5F5F5C' } },
  simonswerk: { // simonswerk.com: off-white, teal #009999, geometric Campton → Jost
    font: 'Jost', bg: '#F7F7F7', fg: '#000000', muted: '#4D5055', line: 'rgba(0,0,0,.14)', accent: '#009999', plate: '#FFFFFF',
    head: { w: 600, tr: '0', up: false }, kick: { w: 500, tr: '.18em', color: '#009999' }, bar: 'accent' },
  fritsjurgens: { // fritsjurgens.com: stark black & white, TheSans → Source Sans 3
    font: 'SourceSans3', bg: '#FFFFFF', fg: '#000000', muted: '#4F4F4F', line: 'rgba(0,0,0,.16)', accent: '#000000', plate: '#FFFFFF',
    head: { w: 700, tr: '-.005em', up: false }, kick: { w: 600, tr: '.18em', color: '#4F4F4F' } },
};

// font-face declarations for a theme (paths relative to the generated HTML file)
export function fontFaces(t, rel) {
  const files = {
    Inter: [400, 500, 600, 700], RobotoCondensed: [400, 500, 600, 700], Montserrat: [400, 500, 600, 700], Onest: [400, 500, 600],
    SourceSans3: [400, 600, 700], IBMPlexSans: [400, 500, 600], Jost: [400, 500, 600],
  };
  const fam = { RobotoCondensed: 'Roboto Condensed', SourceSans3: 'Source Sans 3', IBMPlexSans: 'IBM Plex Sans' };
  let css = (files[t.font] || []).map((w) => `@font-face{font-family:"${fam[t.font] || t.font}";font-weight:${w};src:url("${rel}/brands/${t.font}-${w}.ttf")}`).join('');
  if (t.headFont === 'Cormorant Garamond') css += `@font-face{font-family:"Cormorant Garamond";font-weight:600;src:url("${rel}/CormorantGaramond-SemiBold.ttf")}@font-face{font-family:"Cormorant Garamond";font-weight:500;src:url("${rel}/CormorantGaramond-Medium.ttf")}`;
  return { css, body: fam[t.font] || t.font, head: t.headFont || fam[t.font] || t.font };
}
