"""Generates the hero landscape SVGs (desktop.svg, mobile.svg) for the site.

Pure standard library. Run: python3 generate.py [outdir]  (default: this dir).
Ridges are fractal-noise silhouettes in a dusty-blue palette; the vegetation
(sparse deodar/pine rows fading with distance) is built procedurally.
"""

import math
import os
import random
import sys

HAZE = "#c9d8ec"
TREE = "#34496f"


def noise1d(seed):
    rnd = random.Random(seed)
    tab = [rnd.random() for _ in range(512)]

    def f(x):
        i = int(math.floor(x))
        t = x - i
        t = t * t * (3 - 2 * t)
        return tab[i % 512] * (1 - t) + tab[(i + 1) % 512] * t

    return f


def fbm(f, x, octaves=4, gain=0.5, lac=2.0):
    s = a = fr = tot = 0
    a, fr = 1, 1
    for k in range(octaves):
        s += a * f(x * fr + 17 * k)
        tot += a
        a *= gain
        fr *= lac
    return s / tot


def smooth(a, b, x):
    t = min(1, max(0, (x - a) / (b - a)))
    return t * t * (3 - 2 * t)


def mix(c1, c2, t):
    a = [int(c1[i : i + 2], 16) for i in (1, 3, 5)]
    b = [int(c2[i : i + 2], 16) for i in (1, 3, 5)]
    return "#%02x%02x%02x" % tuple(round(a[i] * (1 - t) + b[i] * t) for i in range(3))


def ridges(W, H, layers, env_a, env_b, uid, step):
    """Returns (defs, [path svg per layer], [{x: y} per layer])."""
    defs, paths, ys = "", [], []
    for i, L in enumerate(layers):
        n = noise1d(L["seed"])
        n2 = noise1d(L["seed"] + 99)
        pts = []
        for x in range(0, W + step, step):
            e = smooth(env_a, env_b, x)
            base = L["left"] + (L["right"] - L["left"]) * e
            v = fbm(n, x * L["freq"], 4, 0.5)
            if L["ridged"]:
                r = (1 - abs(2 * v - 1)) ** 1.6
                off = -(r - 0.35) * L["amp"] * 1.6
            else:
                off = -(v - 0.5) * L["amp"] * 2
            off += -(fbm(n2, x * L["freq"] * 3.1, 2) - 0.5) * L["amp"] * 0.25
            pts.append((x, base + off))
        ys.append(dict(pts))
        d = "M" + " L".join(f"{x},{y:.1f}" for x, y in pts) + f" L{W},{H} L0,{H}Z"
        top = min(y for _, y in pts)
        c = L["c"]
        hz = mix(HAZE, c, 0.18 + 0.05 * i)
        end = c if L.get("solid") else hz
        mid = c if L.get("solid") else mix(c, hz, 0.35)
        defs += (
            f'<linearGradient id="{uid}g{i}" gradientUnits="userSpaceOnUse" x1="0" y1="{top:.0f}" '
            f'x2="0" y2="{top + L["fade"]:.0f}"><stop offset="0" stop-color="{c}"/>'
            f'<stop offset=".5" stop-color="{mid}"/><stop offset="1" stop-color="{end}"/></linearGradient>'
        )
        paths.append(f'<path d="{d}" fill="url(#{uid}g{i})"/>')
    return defs, paths, ys


def y_at(ys, i, x):
    k = min(ys[i].keys(), key=lambda a: abs(a - x))
    return ys[i][k]


def conifer(x, y, h, w, lean, rnd):
    """Slender deodar/pine: drooping irregular tiers, optional lean."""
    tiers = max(5, int(h / 6.5))
    step = h * 0.86 / tiers
    left, right = [], []
    for k in range(tiers):
        t = (k + 0.5) / tiers
        yk = y - h * (0.12 + 0.88 * t)
        axis = lean * t * t * h * 0.14
        taper = (1 - t) ** 0.85
        hwl = w * taper * rnd.uniform(0.6, 1.15)
        hwr = w * taper * rnd.uniform(0.6, 1.15)
        d = step * rnd.uniform(0.5, 0.9)
        left.append((x + axis - hwl, yk + d, x + axis - hwl * 0.28, yk - step * 0.45))
        right.append((x + axis + hwr, yk + d, x + axis + hwr * 0.28, yk - step * 0.45))
    tip = (x + lean * h * 0.14, y - h)
    pts = [(x - 1.1, y + 3), (x - 1.1, y - h * 0.1)]
    for ox, oy, nx, ny in left:
        pts += [(ox, oy), (nx, ny)]
    pts.append(tip)
    for ox, oy, nx, ny in reversed(right):
        pts += [(nx, ny), (ox, oy)]
    pts += [(x + 1.1, y - h * 0.1), (x + 1.1, y + 3)]
    return "M" + " L".join(f"{px:.1f},{py:.1f}" for px, py in pts) + "Z"


def conifer_row(ys, i, xs, hr, col, seed, wr=0.17, lean_max=0.5):
    rnd = random.Random(seed)
    out = f'<g fill="{col}" stroke="{col}" stroke-width=".5" stroke-linejoin="round">'
    for x in xs:
        h = rnd.uniform(*hr)
        out += f'<path d="{conifer(x, y_at(ys, i, x) + 2, h, h * wr, rnd.uniform(-lean_max, lean_max) if rnd.random() < 0.4 else rnd.uniform(-0.12, 0.12), rnd)}"/>'
    return out + "</g>"


def clumps(rnd, spans, step):
    """Irregular x positions: clumps inside spans with random gaps."""
    xs = []
    for a, b in spans:
        x = a
        while x < b:
            xs.append(x + rnd.uniform(-3, 3))
            x += step * rnd.uniform(0.55, 1.7) if rnd.random() > 0.2 else step * rnd.uniform(2.5, 4)
    return xs


COLS = ["#c1cfe5", "#b4c4de", "#a3b5d3", "#90a4c6", "#7d93b9", "#6a82ab", "#586f98", "#46608a"]


def wrap(W, H, defs, body, cls_extra=""):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}"><defs>{defs}</defs>{body}</svg>'


def birds(pts, sw, op):
    d = "".join(f'<path d="M{x} {y} q{w/2} -{w/2} {w} 0 q{w/2} -{w/2} {w} 0"/>' for x, y, w in pts)
    return f'<g fill="none" stroke="#566f99" stroke-width="{sw}" stroke-linecap="round" opacity="{op}">{d}</g>'


def desktop():
    W, H = 1440, 820
    P = [
        (585, 330, 34, 0.0075, True, 260), (630, 400, 30, 0.0085, True, 240),
        (688, 470, 24, 0.0070, True, 220), (735, 540, 20, 0.0060, False, 200),
        (770, 600, 16, 0.0050, False, 170), (795, 660, 13, 0.0042, False, 150),
        (810, 712, 10, 0.0035, False, 120), (822, 770, 7, 0.0030, False, 90),
    ]
    layers = [dict(c=COLS[i], left=p[0], right=p[1], amp=p[2], freq=p[3], ridged=p[4], fade=p[5], seed=11 + i * 7, solid=(i == 7)) for i, p in enumerate(P)]
    defs, lp, ys = ridges(W, H, layers, 520, 1180, "d", 6)
    rnd = random.Random(7)
    defs += (
        '<linearGradient id="dsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eef3f9"/><stop offset=".55" stop-color="#d8e3f2"/><stop offset="1" stop-color="#c3d3e9"/></linearGradient>'
        '<radialGradient id="dglow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#f8d9c2" stop-opacity=".95"/><stop offset=".45" stop-color="#f1dcd8" stop-opacity=".55"/><stop offset="1" stop-color="#eaeaf3" stop-opacity="0"/></radialGradient>'
        '<filter id="dbl1" x="-20%" y="-100%" width="140%" height="300%"><feGaussianBlur stdDeviation="22"/></filter>'
        '<filter id="dbl2" x="-20%" y="-200%" width="140%" height="500%"><feGaussianBlur stdDeviation="9"/></filter>'
    )
    mist = lambda cy, rx, ry, op: f'<ellipse cx="760" cy="{cy}" rx="{rx}" ry="{ry}" fill="#f3f7fc" opacity="{op}" filter="url(#dbl1)"/>'
    far = conifer_row(ys, 4, clumps(rnd, [(760, 980), (1090, 1160)], 20), (22, 40), mix(COLS[4], TREE, 0.3), 21, 0.15)
    mid = conifer_row(ys, 5, clumps(rnd, [(620, 700), (880, 1010), (1060, 1150), (1425, 1440)], 26), (38, 66), mix(COLS[5], TREE, 0.5), 22)
    near = conifer_row(ys, 6, clumps(rnd, [(1010, 1110)], 34), (50, 88), mix(COLS[6], TREE, 0.72), 23, 0.18)
    edge = conifer_row(ys, 6, [1176, 1243, 1362], (56, 90), mix(COLS[6], TREE, 0.85), 24, 0.16, 0.2) + conifer_row(ys, 6, [1300, 1413], (118, 150), mix(COLS[6], TREE, 0.9), 25, 0.15, 0.15)
    body = (
        f'<rect width="{W}" height="{H}" fill="url(#dsky)"/><ellipse cx="930" cy="560" rx="760" ry="250" fill="url(#dglow)"/>'
        '<g fill="#fff" filter="url(#dbl2)"><ellipse cx="1010" cy="170" rx="260" ry="7" opacity=".5"/><ellipse cx="1180" cy="235" rx="200" ry="5" opacity=".4"/><ellipse cx="760" cy="120" rx="150" ry="4" opacity=".35"/></g>'
        f"{lp[0]}{lp[1]}{mist(470, 620, 22, .5)}{lp[2]}{lp[3]}{mist(560, 700, 26, .55)}{lp[4]}{far}{lp[5]}{mid}{mist(660, 760, 24, .4)}{lp[6]}{near}{edge}{lp[7]}"
        + birds([(980, 300, 12), (1012, 286, 10), (1000, 320, 8), (1046, 308, 8)], 1.4, 0.55)
    )
    return wrap(W, H, defs, body)


def mobile():
    W, H = 390, 520
    P = [
        (250, 150, 12, 0.018, True, 150), (278, 185, 11, 0.020, True, 140), (308, 225, 9, 0.016, False, 130),
        (338, 270, 8, 0.014, False, 120), (372, 320, 7, 0.012, False, 110), (410, 372, 6, 0.010, False, 100),
        (445, 420, 5, 0.009, False, 80), (480, 468, 4, 0.008, False, 60),
    ]
    layers = [dict(c=COLS[i], left=p[0], right=p[1], amp=p[2], freq=p[3], ridged=p[4], fade=p[5], seed=31 + i * 5, solid=(i == 7)) for i, p in enumerate(P)]
    defs, lp, ys = ridges(W, H, layers, 0, 390, "m", 4)
    rnd = random.Random(8)
    defs += (
        '<linearGradient id="msky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e4ecf6"/><stop offset="1" stop-color="#c9d8ec"/></linearGradient>'
        '<radialGradient id="mglow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#f8d9c2" stop-opacity=".95"/><stop offset=".45" stop-color="#f1dcd8" stop-opacity=".55"/><stop offset="1" stop-color="#eaeaf3" stop-opacity="0"/></radialGradient>'
        '<filter id="mbl" x="-20%" y="-300%" width="140%" height="700%"><feGaussianBlur stdDeviation="8"/></filter>'
    )
    mist = lambda cy, op: f'<ellipse cx="200" cy="{cy}" rx="260" ry="12" fill="#f3f7fc" opacity="{op}" filter="url(#mbl)"/>'
    far = conifer_row(ys, 4, clumps(rnd, [(150, 390)], 17), (13, 24), mix(COLS[4], TREE, 0.3), 41, 0.15)
    mid = conifer_row(ys, 5, clumps(rnd, [(0, 110), (150, 250), (330, 390)], 20), (22, 40), mix(COLS[5], TREE, 0.5), 42)
    near = conifer_row(ys, 6, clumps(rnd, [(8, 120), (190, 250), (352, 390)], 22), (30, 52), mix(COLS[6], TREE, 0.72), 43, 0.18)
    edge = conifer_row(ys, 6, [284, 330], (32, 50), mix(COLS[6], TREE, 0.85), 44, 0.16, 0.2) + conifer_row(ys, 6, [362], (68, 84), mix(COLS[6], TREE, 0.9), 45, 0.15, 0.15)
    body = (
        f'<rect width="{W}" height="{H}" fill="url(#msky)"/><ellipse cx="250" cy="270" rx="330" ry="130" fill="url(#mglow)"/>'
        '<g fill="#fff" filter="url(#mbl)"><ellipse cx="260" cy="70" rx="140" ry="4" opacity=".5"/><ellipse cx="120" cy="30" rx="90" ry="3" opacity=".4"/></g>'
        f"{lp[0]}{lp[1]}{mist(240, .5)}{lp[2]}{lp[3]}{mist(300, .5)}{lp[4]}{far}{lp[5]}{mid}{mist(380, .4)}{lp[6]}{near}{edge}{lp[7]}"
        + birds([(210, 150, 8), (234, 140, 6), (226, 162, 6)], 1, 0.5)
    )
    return wrap(W, H, defs, body)


if __name__ == "__main__":
    out = sys.argv[1] if len(sys.argv) > 1 else os.path.dirname(os.path.abspath(__file__))
    for name, fn in (("desktop", desktop), ("mobile", mobile)):
        with open(os.path.join(out, f"{name}.svg"), "w") as f:
            f.write(fn().rstrip("\n") + "\n")
