# CREATURA — Premium B2B Instagram Stories · 21–30.11.2026

50 stories (5 per day), 1080 × 1920 px, PNG, RGB. The art direction is luxury European architectural editorial.

> **Status: layout system ready, product photography missing.** No original photos, videos or logos of Creatura or its manufacturers were supplied. Per the brief, no imagery was generated or substituted. Every image area is a marked placeholder named after the file it needs (see `MISSING_ASSETS.md`). Once the files are added, one command produces the final renders.

## Structure

```
CREATURA_STORIES/
├── 01_NOVEMBER_21 … 10_NOVEMBER_30/   story_01.png … story_05.png  (+ story_0X.mp4 for video stories once footage exists)
├── assets/photos   assets/video   assets/logos      ← drop original files here (names in MISSING_ASSETS.md)
├── fonts/          Manrope (used) + Cormorant Garamond (reserve), TTF, OFL — FONTS.md
├── source/
│   ├── stories.mjs     all texts, layout choice, background, media slots for the 50 stories
│   ├── layouts.mjs     minimal composition library (hero, stack, macro, video, details, interior, pair, finishes, cta…)
│   ├── styles.css      design tokens: palette, typography, grid, safe zones, motion
│   ├── palette.json
│   ├── build.mjs       render pipeline (HTML → PNG, MP4, previews, QA, reports)
│   └── html/           editable HTML source of each story (open in a browser to see the restrained animation)
├── preview/        CREATURA_all_50_stories.png, per-day previews, index.html, QA_REPORT.md
└── MISSING_ASSETS.md   photos / videos / logos still needed, plus the stories that use placeholders
```

## Rebuild

```bash
node source/build.mjs            # all 50 stories + previews + reports
node source/build.mjs --only 05  # a single day
```
Needs Node 18+, Playwright with Chromium and, for MP4, ffmpeg.

* **Photo:** put `assets/photos/<name>.jpg` in place (any of jpg/png/webp/tif) and the placeholder is replaced. The crop is `cover`. To shift the focal point, set `pos: '50% 30%'` on that media entry in `stories.mjs`.
* **Video:** put `assets/video/<name>.mp4` in place. The PNG uses the frame at 1 s, or `assets/photos/<name>_poster.jpg` if present. An MP4 is also exported at 1080×1920, H.264, 25 fps. The video is fitted into its frame and the typography fades in softly.
* **Logos:** add `assets/logos/creatura.svg`, `alumove.svg`, `atim.svg`, `stv.svg`, `ceam.svg`, `verum.svg` and `aircube.svg`. They replace the text names and keep their proportions (fixed height, auto width).
* **Text:** edit `stories.mjs`. Russian typesetting (non-breaking spaces after short words and before dashes) is applied automatically.

The "Draft · N placeholders" bronze flag in the corner appears only while a story still contains placeholders. Final renders do not have it.

## Design system — minimal white studio

The visual reference is a catalogue-style story: the product as a cutout on pure white, one or two views plus a macro crop on light grey, a quiet "MODEL by BRAND" lockup and the manufacturer's name as a logo at the bottom.

| Token | HEX | Use |
|---|---|---|
| White | `#FFFFFF` | main background of every story |
| Studio grey | `#EDEDEC` | backdrop for macro crops and detail shots |
| Deep Charcoal | `#171717` | all text, wordmark |
| Warm Grey | `#89847D` / `#8A8A88` | captions, numbering |
| Warm Ivory / Soft Beige / Sand / Graphite / Muted Bronze | `#F2EFE9` `#D8D0C4` `#B9AA98` `#252525` `#92785D` | in the palette as reserves (an `t-ivory` theme is available) |

* **Typography:** Manrope only. Model name 600 uppercase + "by" 400 + brand 400; copy 400 at 27–31 px; closing questions 500 at 50–56 px; manufacturer wordmark 600 at 66 px with wide tracking.
* **Text:** one or two short lines per story, taken verbatim from the brief. No serif display type, decorative frames, gradients or badges.
* **Creatura:** small letter-spaced mark at the top (y 262). In closing stories without a specific manufacturer, the CREATURA wordmark sits at the bottom.
* **Photography:** packshots (`cut` slots) on pure white, so they merge with the background. Macro shots (`studio` slots) on light grey. Interiors and video in neat rectangles with white margins or bleeding off the top.
* **Grid:** 96 px side margins, meaningful text within y 262–1610 px, Instagram's bottom 300 px left empty.
* **Compositions:** 15 (hero, stack, macroBlock, fullBleed, video ×2, twoStates, details, mosaic, interior ×2, pair, finishes ×2, cta, ctaGrid, split, offer). The same §6 composition type never appears more than twice in a row (checked in `preview/QA_REPORT.md`).
* **Motion (HTML/MP4):** soft fade-in of text, slow 5% zoom of the image.

## Content principles
* Copy is taken verbatim from the brief. No specifications, model names or finish names were invented. Where they are needed there are neutral labels ("Отделка 01", "STV · модель 01") to replace, listed in `MISSING_ASSETS.md`.
* Callouts list only construction elements named in the brief (body, faceplate, latch; joints, mounts…).
