#!/bin/sh
# Renders the share card and the icons into ../../public (needs a Chromium
# binary in $CHROME and ImageMagick). Fonts are the local OFL files in fonts/.
#   og.html  -> public/og-dawn.jpg (1200x630)
#   icon.svg -> public/{apple-touch-icon,icon-192,icon-512}.png, favicon.ico
set -e
cd "$(dirname "$0")"
OUT=../../public
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT
shot() { "$CHROME" --no-sandbox --disable-gpu --hide-scrollbars --force-device-scale-factor=1 --virtual-time-budget=5000 --window-size="$2" --screenshot="$TMP/$3.png" "file://$PWD/$1" >/dev/null 2>&1; }
shot og.html 1200,630 og
shot icon.svg 512,512 icon
magick "$TMP/og.png" -strip -sampling-factor 4:2:0 -interlace Plane -quality "${OGQ:-88}" "$OUT/og-dawn.jpg"
magick "$TMP/icon.png" -alpha off "$OUT/icon-512.png"
magick "$TMP/icon.png" -alpha off -resize 192x192 "$OUT/icon-192.png"
magick "$TMP/icon.png" -alpha off -resize 180x180 "$OUT/apple-touch-icon.png"
magick "$TMP/icon.png" -alpha off -define icon:auto-resize=48,32,16 "$OUT/favicon.ico"
