// Helpers for brand content files.
// Story kinds: cover (highlight cover), intro (brand + contents), product (one model / series with specs),
// list (up to 5 products with photo, name, one line, key spec), grid (up to 6 models with photo + name/code), cta.

export const product = (o) => ({ kind: 'product', ...o });
export const list = (o) => ({ kind: 'list', ...o });
export const grid = (o) => ({ kind: 'grid', ...o });

// Image spec: id is "<brand>/<slug>"; url = official source; optional {page, xref} for PDF catalogue extraction,
// salicePage for Salice/ATIM product pages (largest packshot is picked).
export const img = (id, url, extra = {}) => ({ id, url, ...extra });

// Split a long array into chunks (for list/grid stories).
export const chunk = (arr, n) => arr.reduce((a, x, i) => (i % n ? a[a.length - 1].push(x) : a.push([x]), a), []);

// Split into the fewest chunks of at most n, with balanced sizes (no near-empty last page).
export const balance = (arr, n) => { const k = Math.ceil(arr.length / n); const size = Math.ceil(arr.length / k); return chunk(arr, size); };
