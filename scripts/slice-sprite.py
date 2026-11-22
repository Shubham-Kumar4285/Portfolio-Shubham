"""Slice the 6x4 sprite sheet: key out the purple background, drop the dotted frame
borders, and repack every frame into equal cells anchored on the feet.

Usage: python3 scripts/slice-sprite.py <source.png> public/sprites/ronin.webp
Needs numpy, scipy and Pillow. The grid/border coordinates below are for the
supplied 896x1200 sheet; adjust COLS/ROW_SPLITS/VLINES/HLINES for another one.
Prints the frame size to put in components/sprite/sheets.ts."""
import sys, json
import numpy as np
from PIL import Image
from scipy import ndimage as ndi

src, out = sys.argv[1], sys.argv[2]
a = np.asarray(Image.open(src).convert('RGB')).astype(float)
BG = np.array([80, 71, 88.0])
d = np.abs(a - BG).sum(2)

alpha = np.clip((d - 30) / (75 - 30), 0, 1)
solid = d > 45

# Cut the dotted frame borders (they would glue neighbouring frames together).
VLINES = [(71, 75), (197, 201), (205, 209), (331, 335), (339, 343), (465, 468), (473, 477), (598, 601), (606, 610), (732, 736), (741, 744), (866, 869)]
HLINES = [(89, 94), (311, 316), (357, 362), (578, 583), (629, 634), (865, 869), (915, 920), (1166, 1171)]
cut = np.zeros_like(solid)
for x0, x1 in VLINES:
    cut[:, x0:x1 + 1] = True
for y0, y1 in HLINES:
    cut[y0:y1 + 1, :] = True
# a border pixel is kept only where the character runs across it (solid on both sides)
bridge = np.zeros_like(solid)
for x0, x1 in VLINES:
    both = solid[:, x0 - 2] & solid[:, min(x1 + 2, solid.shape[1] - 1)]
    bridge[:, x0:x1 + 1] |= both[:, None]
for y0, y1 in HLINES:
    both = solid[y0 - 2, :] & solid[min(y1 + 2, solid.shape[0] - 1), :]
    bridge[y0:y1 + 1, :] |= both[None, :]
solid = solid & ~cut

# components; tiny ones are border dots / noise
lab, n = ndi.label(solid, structure=np.ones((3, 3)))
idx = np.arange(1, n + 1)
area = ndi.sum(np.ones_like(d), lab, idx)
cy, cx = np.array(ndi.center_of_mass(np.ones_like(d), lab, idx)).T if n else ([], [])

COLS = [(72, 200), (206, 334), (340, 467), (474, 600), (607, 735), (742, 868)]
ROW_SPLITS = [0, 335, 605, 890, 1200]

def cell_of(y, x):
    r = next(i for i in range(4) if ROW_SPLITS[i] <= y < ROW_SPLITS[i + 1])
    c = min(range(6), key=lambda i: abs((COLS[i][0] + COLS[i][1]) / 2 - x))
    return r, c

# border lines: thin long runs -> components that are very elongated or tiny
frames = {}
for k, (ar, y, x) in enumerate(zip(area, cy, cx), start=1):
    if ar < 60:
        continue
    sl = ndi.find_objects(lab == k)[0]
    h, w = sl[0].stop - sl[0].start, sl[1].stop - sl[1].start
    if (h > 60 and w <= 4) or (w > 60 and h <= 4):  # a solid border segment
        continue
    frames.setdefault(cell_of(y, x), []).append(k)

# grow kept components by 2px so the soft edges (alpha < solid) come along
masks = {}
alpha_in = np.clip((d - 10) / (20 - 10), 0, 1)
soft = np.zeros_like(d)
for key, ks in frames.items():
    m = np.isin(lab, ks)
    # Dark clothes sit close to the background colour, so inside the silhouette
    # (holes filled) use a much gentler key than at the outside edge.
    inside = ndi.binary_fill_holes(m)
    m = ndi.binary_dilation(inside, iterations=2) & (~cut | bridge)
    masks[key] = m
    soft[m] = np.maximum(soft[m], np.where(inside[m], alpha_in[m], alpha[m]))

# anchors: box centre x, ground = lowest solid pixel per row
ground = {}
for r in range(4):
    ys = [np.nonzero(masks[(r, c)].any(1))[0].max() for c in range(6) if (r, c) in masks]
    ground[r] = int(np.median(ys))
ext = [0, 0, 0, 0]  # left, right, up, down from anchor
for (r, c), m in masks.items():
    ys, xs = np.nonzero(m)
    ax = (COLS[c][0] + COLS[c][1]) / 2
    ext = [max(ext[0], ax - xs.min()), max(ext[1], xs.max() - ax), max(ext[2], ground[r] - ys.min()), max(ext[3], ys.max() - ground[r])]
PAD = 4
L = int(np.ceil(max(ext[0], ext[1]))) + PAD
U, D = int(np.ceil(ext[2])) + PAD, int(np.ceil(ext[3])) + PAD
W, H = 2 * L, U + D
sheet = np.zeros((4 * H, 6 * W, 4), dtype=np.uint8)
for (r, c), m in masks.items():
    ax = int(round((COLS[c][0] + COLS[c][1]) / 2))
    y0, x0 = ground[r] - U, ax - L
    al = (soft * m)[y0:y0 + H, x0:x0 + W]
    px = a[y0:y0 + H, x0:x0 + W]
    safe = np.maximum(al, 1e-3)[..., None]
    rgb = np.clip((px - (1 - safe) * BG) / safe, 0, 255)  # un-blend the purple fringe
    tile = np.dstack([rgb, al * 255]).astype(np.uint8)
    sheet[r * H:(r + 1) * H, c * W:(c + 1) * W] = tile

# ---------- crisp pass: make it read as clean pixel art ----------
# The source is resampled (soft, noisy), so: hard alpha (no halo), one shared palette
# mapped without dithering (flat colour areas), and speckle removal.
COLORS = 48
opaque = sheet[..., 3] >= 128
pal = Image.fromarray(sheet[..., :3][opaque][None]).quantize(COLORS, method=Image.Quantize.MEDIANCUT, kmeans=4)
idx = np.asarray(Image.fromarray(sheet[..., :3]).quantize(palette=pal, dither=Image.Dither.NONE))
idx = np.where(opaque, idx, 255).astype(np.int32)  # 255 = transparent


def majority(win):
    """A pixel matching none of its 8 neighbours takes the most common neighbour value."""
    c = int(win[4])
    nb = np.delete(win, 4).astype(int)
    if (nb == c).any():
        return c
    vals, counts = np.unique(nb, return_counts=True)
    return vals[counts.argmax()]


for _ in range(2):
    idx = ndi.generic_filter(idx, majority, size=3, mode='constant', cval=255)
palette = np.array(pal.getpalette()[: COLORS * 3]).reshape(-1, 3)
alpha = (idx != 255) * 255
sheet = np.dstack([palette[np.clip(idx, 0, COLORS - 1)], alpha]).astype(np.uint8)
sheet[alpha == 0] = 0

img = Image.fromarray(sheet)
if out.endswith('.webp'):
    img.save(out, 'WEBP', lossless=True, method=6)  # lossless: no artifacts on pixel edges
else:
    img.save(out, optimize=True)
print(json.dumps({'frameWidth': W, 'frameHeight': H, 'cols': 6, 'rows': 4, 'frames': {f'{r},{c}': len(v) for (r, c), v in frames.items()}}))
