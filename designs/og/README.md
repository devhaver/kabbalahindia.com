# Share card and icons

`og.html` is the 1200x630 link-preview card: the hero landscape (`../landscape/desktop.svg`) behind left-aligned text, set in the site's fonts.
`icon.svg` is the single source for every icon: indigo rounded square, saffron "K" as an outlined path (no font needed, so it renders the same everywhere).
`icon.py` regenerates it from `fonts/DMSerifDisplay-Regular.ttf`: `uv run --with fonttools python icon.py`. Only needed when the glyph, size or colours change.
Fonts live in `fonts/` (SIL OFL, licences alongside) and are used only here; nothing in this folder ships.
Run `CHROME=/path/to/chromium ./render.sh` (needs ImageMagick) to write `public/og-dawn.jpg`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `favicon.ico` and `favicon.svg`.
The touch icons are rendered full-bleed (no rounded corners, no transparency); the `.ico` frames and `favicon.svg` keep the rounded tile, and each `.ico` size is drawn natively rather than downscaled so 16px stays crisp.
The icons are not marked `maskable`: the K sits inside the central 80% square but its corners fall outside the 80% safe circle.
Keep the card under 200 KB and the text inside x 120-1080.
Rename the card (not just overwrite it) when its look changes so social caches fetch it fresh, then update `app/app.vue`.
