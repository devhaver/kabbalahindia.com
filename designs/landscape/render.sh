#!/bin/sh
# Renders the SVGs to WebP in ../../public/landscape (needs a Chromium binary
# in $CHROME and ImageMagick). Run generate.py first.
set -e
cd "$(dirname "$0")"
OUT=../../public/landscape
mkdir -p "$OUT" /tmp/landscape-render
shot() { "$CHROME" --no-sandbox --disable-gpu --hide-scrollbars --force-device-scale-factor="$3" --window-size="$2" --screenshot="/tmp/landscape-render/$4.png" "file://$PWD/$1" >/dev/null 2>&1; }
shot desktop.svg 1440,820 1 d1
shot mobile.svg 390,520 1 m1
shot mobile.svg 390,520 2 m2
magick /tmp/landscape-render/d1.png -quality "${DQ:-85}" "$OUT/hero-desktop.webp"
magick /tmp/landscape-render/m1.png -quality "${MQ:-85}" "$OUT/hero-mobile.webp"
magick /tmp/landscape-render/m2.png -quality "${MQ:-85}" "$OUT/hero-mobile-2x.webp"
