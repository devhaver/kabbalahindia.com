# Share card and icons

`og.html` is the 1200x630 link-preview card: the hero landscape (`../landscape/desktop.svg`) behind left-aligned text, set in the site's fonts.
`icon.svg` is the source for the app icons: indigo square, saffron serif "K".
Fonts live in `fonts/` (SIL OFL, licences alongside) and are used only here; nothing in this folder ships.
Run `CHROME=/path/to/chromium ./render.sh` (needs ImageMagick) to write `public/og-dawn.jpg`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png` and `favicon.ico`.
Keep the card under 200 KB and the text inside x 120-1080.
Rename the card (not just overwrite it) when its look changes so social caches fetch it fresh, then update `app/app.vue`.
