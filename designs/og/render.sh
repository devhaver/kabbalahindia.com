#!/bin/sh
# Renders the share card and the icons into ../../public (needs a Chromium
# binary in $CHROME and ImageMagick). Fonts are the local OFL files in fonts/.
#   og.html     -> public/og-dawn.jpg (1200x630)
#   icon-16.svg -> public/favicon-16.png      icon-32.svg -> public/favicon-32.png
#   icon-48.svg -> public/favicon-48.png      the three above -> public/favicon.ico
#   icon.svg    -> public/{apple-touch-icon,icon-192,icon-512}.png
set -e
cd "$(dirname "$0")"
OUT=../../public
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT
shot() { "$CHROME" --no-sandbox --disable-gpu --hide-scrollbars --force-device-scale-factor=1 --virtual-time-budget=5000 --window-size="$2" --screenshot="$TMP/$3.png" "file://$PWD/$1" >/dev/null 2>&1; }
# svg FILE SIZE OUT: FILE drawn natively at SIZE px, corners transparent where the artwork has them.
svg() {
  sed "1s/width=\"[0-9]*\" height=\"[0-9]*\"/width=\"$2\" height=\"$2\"/" "$1" >"$TMP/$3.svg"
  "$CHROME" --no-sandbox --disable-gpu --hide-scrollbars --force-device-scale-factor=1 --default-background-color=00000000 --window-size="$2,$2" --screenshot="$TMP/$3.png" "file://$TMP/$3.svg" >/dev/null 2>&1
}
shot og.html 1200,630 og
magick "$TMP/og.png" -strip -sampling-factor 4:2:0 -interlace Plane -quality "${OGQ:-88}" "$OUT/og-dawn.jpg"
# Tab icons: one hand-set artwork per size, drawn natively rather than downscaled, to stay crisp.
for n in 16 32 48; do
  svg icon-$n.svg $n f$n
  magick "$TMP/f$n.png" -strip "$OUT/favicon-$n.png"
done
magick "$TMP/f16.png" "$TMP/f32.png" "$TMP/f48.png" "$OUT/favicon.ico"
# Home-screen icons: full-bleed square (no rounded corners, no transparency); iOS/Android apply their own mask.
svg icon.svg 512 h512
magick "$TMP/h512.png" -alpha off "$OUT/icon-512.png"
svg icon.svg 192 h192
magick "$TMP/h192.png" -alpha off "$OUT/icon-192.png"
svg icon.svg 180 h180
magick "$TMP/h180.png" -alpha off "$OUT/apple-touch-icon.png"
