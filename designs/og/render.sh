#!/bin/sh
# Renders the share card and the icons into ../../public (needs a Chromium
# binary in $CHROME and ImageMagick). Fonts are the local OFL files in fonts/.
#   og.html  -> public/og-dawn.jpg (1200x630)
#   icon.svg -> public/{apple-touch-icon,icon-192,icon-512}.png, favicon.ico, favicon.svg
set -e
cd "$(dirname "$0")"
OUT=../../public
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT
shot() { "$CHROME" --no-sandbox --disable-gpu --hide-scrollbars --force-device-scale-factor=1 --virtual-time-budget=5000 --window-size="$2" --screenshot="$TMP/$3.png" "file://$PWD/$1" >/dev/null 2>&1; }
# tile SIZE OUT: icon.svg drawn natively at SIZE px, rounded corners kept and transparent.
tile() {
  sed "1s/width=\"512\" height=\"512\"/width=\"$1\" height=\"$1\"/" icon.svg >"$TMP/t$1.svg"
  "$CHROME" --no-sandbox --disable-gpu --hide-scrollbars --force-device-scale-factor=1 --default-background-color=00000000 --window-size="$1,$1" --screenshot="$TMP/t$1.png" "file://$TMP/t$1.svg" >/dev/null 2>&1
}
shot og.html 1200,630 og
# Full-bleed square (no rounded corners) for the touch icons; iOS/Android apply their own mask.
sed 's/ rx="96"//' icon.svg >"$TMP/bleed.svg"
"$CHROME" --no-sandbox --disable-gpu --hide-scrollbars --force-device-scale-factor=1 --window-size=512,512 --screenshot="$TMP/icon.png" "file://$TMP/bleed.svg" >/dev/null 2>&1
magick "$TMP/og.png" -strip -sampling-factor 4:2:0 -interlace Plane -quality "${OGQ:-88}" "$OUT/og-dawn.jpg"
magick "$TMP/icon.png" -alpha off "$OUT/icon-512.png"
magick "$TMP/icon.png" -alpha off -resize 192x192 "$OUT/icon-192.png"
magick "$TMP/icon.png" -alpha off -resize 180x180 "$OUT/apple-touch-icon.png"
# Tab icon and .ico frames are drawn natively per size, not downscaled, to stay crisp.
cp icon.svg "$OUT/favicon.svg"
for n in 16 32 48; do tile $n; done
magick "$TMP/t48.png" "$TMP/t32.png" "$TMP/t16.png" "$OUT/favicon.ico"
