# Share card and icons

`og.html` is the 1200x630 link-preview card: the hero landscape (`../landscape/desktop.svg`) behind left-aligned text, set in the site's fonts.
The icon is the "KAI" dawn tile: pale-sky gradient, a two-layer dusty-blue ridge, a small saffron sun and indigo DM Serif Display letters, all outlined as paths (no font needed, so it renders the same everywhere).
`icon.py` writes every source from `fonts/DMSerifDisplay-Regular.ttf`: `uv run --with fonttools python icon.py`. Only needed when the glyphs, sizes or colours change.
The artwork is drawn per size rather than scaled, so each stays crisp:
- `icon-16.svg` is hand-set on the 16px grid: whole-pixel 2px stems, 11px-tall letters, a deeper sky so the pale tile holds on a white tab, a two-row ridge band and no sun (it only muddied the letters).
- `icon-32.svg` and `icon-48.svg` are the full dawn tile with the letter box snapped to that size's pixel grid.
- `icon.svg` is the full-bleed square for the home-screen icons, letters inside the central 80%.
- `mark.svg` is the same artwork on a 22% rounded tile. `app/components/KaiMark.vue` (the header and footer logo) mirrors it as inline SVG, so update the component whenever the icon or `mark.svg` changes.
Fonts live in `fonts/` (SIL OFL, licences alongside) and are used only here; nothing in this folder ships.
Run `CHROME=/path/to/chromium ./render.sh` (needs ImageMagick) to write `public/og-dawn.jpg`, `favicon-16.png`, `favicon-32.png`, `favicon-48.png`, `favicon.ico` (the same three frames), `apple-touch-icon.png`, `icon-192.png` and `icon-512.png`.
Each size is rendered natively in headless Chromium. There is no `favicon.svg`: browsers would scale one SVG to every size, so the tab gets the raster of its own size instead.
The touch icons are full-bleed (no rounded corners, no transparency); the tab icons keep the rounded tile.
The icons are not marked `maskable`: the letters sit inside the central 80% square but the sun and ridge are not designed for a circular mask.
Keep the card under 200 KB and the text inside x 120-1080.
Rename the card (not just overwrite it) when its look changes so social caches fetch it fresh, then update `app/app.vue`.
