# CREATURA — Premium B2B Instagram Stories · 21–30.11.2026

50 stories (5 per day), 1080 × 1920 px, PNG, RGB. The art direction is luxury European architectural editorial.

> **Status: layout system ready, product photography missing.** No original photos, videos or logos of Creatura or its manufacturers were supplied. Per the brief, no imagery was generated or substituted. Every image area is a marked placeholder named after the file it needs (see `MISSING_ASSETS.md`). Once the files are added, one command produces the final renders.

## Structure

```
CREATURA_STORIES/
├── 01_NOVEMBER_21 … 10_NOVEMBER_30/   story_01.png … story_05.png  (+ story_0X.mp4 for video stories once footage exists)
├── assets/photos   assets/video   assets/logos      ← drop original files here (names in MISSING_ASSETS.md)
├── fonts/          Cormorant Garamond + Manrope (TTF, OFL), FONTS.md
├── source/
│   ├── stories.mjs     all texts, layout choice, background, media slots for the 50 stories
│   ├── layouts.mjs     composition library (cover, macro, motion, split, comparison, context, technical, closing…)
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

## Design system

| Token | HEX | Use |
|---|---|---|
| Warm Ivory | `#F2EFE9` | light backgrounds for light products and interiors |
| Soft Beige | `#D8D0C4` | warm secondary background |
| Sand | `#B9AA98` | accent backgrounds (26.11, 28.11, 30.11) |
| Graphite | `#252525` | metal products, locks, macro |
| Deep Charcoal | `#171717` | dark covers, offer, video |
| Warm Grey | `#89847D` | captions, secondary text |
| Muted Bronze | `#92785D` | thin accents only: lines, numerals, kickers |

Typography: Cormorant Garamond SemiBold for titles, Manrope Regular for body copy, and Manrope Medium/SemiBold for captions and CTAs. Text is not set in all caps, except brand names and micro-captions.

Grid: 96 px side margins. Meaningful text sits within y 262–1610 px. Instagram's top 250 px and bottom 300 px stay free.

The rhythm across 10 days uses 27 compositions. The same §6 composition type never appears more than twice in a row, and `build.mjs` checks this automatically. It also checks safe zones, text over photos and font loading; results are in `preview/QA_REPORT.md`.

Motion (HTML/MP4): headlines fade in, the image zooms slowly (6%), lines draw in. There are no fly-ins, bounces or spinning logos.

## Content principles
* Copy is taken verbatim from the brief. No specifications, model names or finish names were invented. Where they are needed there are neutral labels ("Отделка 01", "STV · модель 01") to replace, listed in `MISSING_ASSETS.md`.
* Callouts list only construction elements named in the brief (body, faceplate, latch; joints, mounts…).
