"""Generate the MIC/AICTE grant requirement card as a rectangle PNG.

Mirrors the four funding fields from the grant application plus the
ceiling callout. Every figure is declared once below and printed from
those constants so the image cannot drift from the inputs.
"""
from pathlib import Path
from textwrap import fill

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent

NAVY = "#1E3A5F"
SLATE = "#64748B"
WHITE = "#FFFFFF"
CARD_BG = "#FFFFFF"
CARD_EDGE = "#CBD5E1"
PAGE_BG = "#F8FAFC"
ORANGE = "#EA580C"
ORANGE_BG = "#FFF4E6"
ORANGE_EDGE = "#F97316"

DPI = 200
FIGSIZE = (12.0, 4.4)  # rectangle, 4-up grid

# ---- the figures (single source of truth) --------------------------------
FIELDS = [
    ("A. Grant sought from MIC / AICTE", "Rs. 6 lakhs", "understated"),
    ("B. To be Raised / raised from other sources", "Rs. ...", "open"),
    ("Total Grant Requirements (A+B)", "Rs. 6 lakhs", "understated"),
    ("If any Investment/Debt Secured", "Rs. NA", "none"),
]
CEILING_TITLE = "*Please Note: Max grant ceiling from MIC-AICTE/Innovation"
CEILING_VALUE = "Rs. 10 lakhs"
TITLE = "Grant Requirement Summary"


def card(ax, x, y, w, h, label, value, value_color):
    ax.add_patch(FancyBboxPatch(
        (x, y), w, h, boxstyle="round,pad=0.006,rounding_size=0.02",
        linewidth=1.4, edgecolor=CARD_EDGE, facecolor=CARD_BG, zorder=2))
    ax.text(x + w / 2, y + h - 0.06, fill(label, width=30), fontsize=9.6,
            color=SLATE, va="top", ha="center", zorder=3, linespacing=1.4)
    ax.text(x + w / 2, y + h / 2 - 0.14, value, fontsize=21, color=value_color,
            fontweight="bold", va="center", ha="center", zorder=3)


def build(out: Path):
    fig = plt.figure(figsize=FIGSIZE, dpi=DPI, facecolor=PAGE_BG)
    ax = fig.add_axes([0, 0, 1, 1])
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    ax.axis("off")

    ax.text(0.035, 0.93, TITLE, fontsize=15.5, fontweight="bold", color=NAVY,
            va="center", ha="left")

    # 4-up rectangle grid
    n = len(FIELDS)
    gap = 0.022
    left = 0.035
    right = 0.965
    w = (right - left - gap * (n - 1)) / n
    h = 0.40
    y = 0.40

    value_colors = {"understated": NAVY, "open": SLATE, "none": SLATE}
    for i, (label, value, kind) in enumerate(FIELDS):
        x = left + i * (w + gap)
        card(ax, x, y, w, h, label, value, value_colors[kind])

    # ceiling callout strip
    bx, bw = left, right - left
    bh = 0.185
    by = 0.075
    ax.add_patch(FancyBboxPatch(
        (bx, by), bw, bh, boxstyle="round,pad=0.006,rounding_size=0.02",
        linewidth=2.0, edgecolor=ORANGE_EDGE, facecolor=ORANGE_BG, zorder=2))
    ax.text(bx + 0.02, by + bh / 2, CEILING_TITLE, fontsize=11.5,
            color=ORANGE, va="center", ha="left", zorder=3, style="italic")
    ax.text(bx + bw - 0.02, by + bh / 2, CEILING_VALUE, fontsize=22,
            color=ORANGE, fontweight="bold", va="center", ha="right", zorder=3)

    out.parent.mkdir(parents=True, exist_ok=True)
    fig.savefig(out, dpi=DPI, facecolor=PAGE_BG, bbox_inches="tight")
    plt.close(fig)
    return out


if __name__ == "__main__":
    p = build(HERE / "grant_requirement.png")
    kb = p.stat().st_size // 1024
    print(f"  png   {p.relative_to(ROOT)}  ({kb} KB)  {FIGSIZE[0]}x{FIGSIZE[1]}in @{DPI}DPI")
    print(f"  fields: {len(FIELDS)}  |  ceiling: {CEILING_VALUE}")
