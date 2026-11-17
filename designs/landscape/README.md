# Hero landscape

`generate.py` (stdlib only) writes `desktop.svg` (1440x820) and `mobile.svg` (390x520): noise ridges and sparse deodar/pine rows that fade with distance.
Edit it, then run `python3 generate.py` in this folder.
The site ships rasters, not these SVGs: run `CHROME=/path/to/chromium ./render.sh` (needs ImageMagick) to render them to `public/landscape/*.webp`.
Budgets: mobile images under 60 KB, desktop under 150 KB; keep the sky edges matching the CSS background in `app/components/DawnLandscape.vue`.
