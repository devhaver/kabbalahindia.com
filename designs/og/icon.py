"""Writes icon.svg: the saffron "K" of DM Serif Display, outlined as a path.

Run with: uv run --with fonttools python icon.py
"""

from pathlib import Path

from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont

HERE = Path(__file__).parent
SIZE = 512
RADIUS = 96  # 6/32 of the tile, as in the old tab icon
GLYPH_HEIGHT = 0.63  # K cap height as a share of the tile
# Nudge up: the serif feet add weight at the bottom, so the K reads low.
OPTICAL_LIFT = 0.005

font = TTFont(HERE / "fonts" / "DMSerifDisplay-Regular.ttf")
glyphs = font.getGlyphSet()
name = font.getBestCmap()[ord("K")]

bounds = BoundsPen(glyphs)
glyphs[name].draw(bounds)
x0, y0, x1, y1 = bounds.bounds

scale = SIZE * GLYPH_HEIGHT / (y1 - y0)
dx = (SIZE - (x1 - x0) * scale) / 2 - x0 * scale
dy = SIZE * (1 + GLYPH_HEIGHT) / 2 - SIZE * OPTICAL_LIFT  # baseline, y down

pen = SVGPathPen(glyphs, ntos=lambda v: f"{v:.1f}".rstrip("0").rstrip("."))
glyphs[name].draw(TransformPen(pen, (scale, 0, 0, -scale, dx, dy)))

(HERE / "icon.svg").write_text(
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {SIZE} {SIZE}" width="{SIZE}" height="{SIZE}">\n'
    f'  <rect width="{SIZE}" height="{SIZE}" rx="{RADIUS}" fill="#1a1a4d" />\n'
    f'  <path fill="#e27a2e" d="{pen.getCommands()}" />\n'
    "</svg>\n"
)
