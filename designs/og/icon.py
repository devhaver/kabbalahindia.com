"""Writes the icon sources: the "KAI" dawn tile of DM Serif Display, outlined as paths.

One family, drawn per size so each stays crisp:
  icon-16.svg  hand-set pixel letters on a 16px grid (rounded tile, one-row ridge band)
  icon-32.svg  the full dawn tile, edges snapped to the 32px grid (rounded tile)
  icon-48.svg  the same, snapped to the 48px grid (rounded tile)
  icon.svg     full-bleed square for the home-screen icons (180/192/512), letters inside the central 80%
  mark.svg     the same artwork with a 22% rounded tile; app/components/KaiMark.vue mirrors it

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
MARK_RADIUS = 112  # 22% of the tile, the on-page logo

INDIGO = "#1a1a4d"
SAFFRON = "#e27a2e"
SKY_TOP, SKY_BOTTOM = "#eef3f9", "#c3d3e9"
MIST_400, MIST_600 = "#b4c4dc", "#566f99"

font = TTFont(HERE / "fonts" / "DMSerifDisplay-Regular.ttf")
glyphs = font.getGlyphSet()
cmap = font.getBestCmap()


def num(value):
    return f"{value:.1f}".rstrip("0").rstrip(".")


def glyph_width(char, height):
    bounds = BoundsPen(glyphs)
    glyphs[cmap[ord(char)]].draw(bounds)
    x0, y0, x1, y1 = bounds.bounds
    return (x1 - x0) * height / (y1 - y0)


def glyph_path(char, height, left, baseline, squeeze):
    """Outlined glyph with cap height `height`, left edge at `left`; returns (path, right edge)."""
    glyph = glyphs[cmap[ord(char)]]
    bounds = BoundsPen(glyphs)
    glyph.draw(bounds)
    x0, y0, x1, y1 = bounds.bounds
    k = height / (y1 - y0)
    pen = SVGPathPen(glyphs, ntos=num)
    glyph.draw(TransformPen(pen, (k * squeeze, 0, 0, -k, left - x0 * k * squeeze, baseline)))
    return pen.getCommands(), left + (x1 - x0) * k * squeeze


def word_path(height, baseline, gap, stroke, x0, x1):
    """K A I squeezed so the stroked word spans x0..x1; the stroke adds stroke/2 on every side."""
    natural = sum(glyph_width(c, height) for c in "KAI")
    squeeze = (x1 - x0 - 2 * gap - stroke) / natural
    x = x0 + stroke / 2
    paths = []
    for char in "KAI":
        d, x = glyph_path(char, height, x, baseline, squeeze)
        paths.append(d)
        x += gap
    return "".join(paths)


def dawn(size, rounded, x0, x1, top_px, bottom_px, stroke, corner=RADIUS):
    """Full dawn tile. The stroked letter box spans rows top_px..bottom_px of a `size`px grid."""
    px = SIZE / size
    top, bottom = top_px * px, bottom_px * px
    word = word_path(bottom - top - stroke, bottom - stroke / 2, 18, stroke, x0, x1)
    radius = corner if rounded else 0
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {SIZE} {SIZE}" width="{size}" height="{size}">\n'
        f'<defs><clipPath id="c"><rect width="{SIZE}" height="{SIZE}" rx="{radius}" /></clipPath>'
        '<linearGradient id="s" x1="0" y1="0" x2="0" y2="1">'
        f'<stop offset="0" stop-color="{SKY_TOP}" /><stop offset="1" stop-color="{SKY_BOTTOM}" />'
        "</linearGradient></defs>\n"
        '<g clip-path="url(#c)">\n'
        f'<rect width="{SIZE}" height="{SIZE}" fill="url(#s)" />\n'
        f'<circle cx="256" cy="414" r="40" fill="{SAFFRON}" />\n'
        f'<path fill="{MIST_400}" d="M0 428L90 406L170 432L270 380L350 420L430 394L512 424V512H0Z" />\n'
        f'<path fill="{MIST_600}" d="M0 450L110 426L200 456L300 430L400 460L512 434V512H0Z" />\n'
        f'<path fill="{INDIGO}" stroke="{INDIGO}" stroke-width="{stroke}" stroke-linejoin="round" d="{word}" />\n'
        "</g>\n"
        "</svg>\n"
    )


# 16px: letters drawn cell by cell so every stem is a whole 2px column.
LETTERS_16 = {
    "K": [
        "##..#",
        "##..#",
        "##.#.",
        "####.",
        "###..",
        "###..",
        "###..",
        "####.",
        "##.#.",
        "##..#",
        "##..#",
    ],
    "A": [
        ".###.",
        "##.##",
        "##.##",
        "##.##",
        "##.##",
        "#####",
        "#####",
        "##.##",
        "##.##",
        "##.##",
        "##.##",
    ],
    "I": ["##"] * 11,
}
LETTER_TOP_16 = 2
LETTER_COLUMNS_16 = {"K": 1, "A": 7, "I": 13}
# A deeper sky than the 32px+ gradient so the pale tile holds its shape on a white tab.
SKY_16 = ("#d9e4f2", "#c3d3e9")
CORNERS_16 = {0: 2, 1: 1}  # row -> cells cut from each side, a 3px radius done by hand


def lerp(a, b, t):
    ca = [int(a[i : i + 2], 16) for i in (1, 3, 5)]
    cb = [int(b[i : i + 2], 16) for i in (1, 3, 5)]
    return "#" + "".join(f"{round(x + (y - x) * t):02x}" for x, y in zip(ca, cb))


def tab_16():
    cells = {}  # (col, row) -> colour
    for row in range(16):
        sky = lerp(SKY_16[0], SKY_16[1], row / 13)
        for col in range(16):
            cells[(col, row)] = sky
    for col in range(16):
        cells[(col, 14)] = MIST_400
        cells[(col, 15)] = MIST_600
    for char, col0 in LETTER_COLUMNS_16.items():
        for r, line in enumerate(LETTERS_16[char]):
            for c, mark in enumerate(line):
                if mark == "#":
                    cells[(col0 + c, LETTER_TOP_16 + r)] = INDIGO
    for row, cut in CORNERS_16.items():
        for bottom in (row, 15 - row):
            for col in [*range(cut), *range(16 - cut, 16)]:
                cells.pop((col, bottom), None)

    by_colour = {}
    for (col, row), colour in sorted(cells.items(), key=lambda item: (item[0][1], item[0][0])):
        runs = by_colour.setdefault(colour, [])
        if runs and runs[-1][1] == row and runs[-1][0] + runs[-1][2] == col:
            runs[-1][2] += 1
        else:
            runs.append([col, row, 1])
    body = "".join(
        f'<path fill="{colour}" d="{"".join(f"M{x} {y}h{w}v1h-{w}z" for x, y, w in runs)}" />\n'
        for colour, runs in by_colour.items()
    )
    return (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" shape-rendering="crispEdges">\n'
        f"{body}</svg>\n"
    )


(HERE / "icon-16.svg").write_text(tab_16())
(HERE / "icon-32.svg").write_text(dawn(32, True, 28, 484, 6, 22, 16))
(HERE / "icon-48.svg").write_text(dawn(48, True, 28, 484, 9, 33, 16))
# Home screen: the letter box stays inside x/y 51..461, the central 80% of the tile.
(HERE / "icon.svg").write_text(dawn(SIZE, False, 56, 456, 96, 352, 15))
(HERE / "mark.svg").write_text(dawn(SIZE, True, 56, 456, 96, 352, 15, MARK_RADIUS))
