"""StartupHub - unit economics infographic pack (square edition).

Three SQUARE PNGs, 10.0 x 10.0 in @ 200 DPI:

    ue_01_unit_economics.png   four cards + flow strip + break-even banner
    ue_02_cost_to_serve.png    the Rs 20,000 breakdown, planning allocation
    ue_03_cac_gap.png          CAC shown separately: research vs target

PROVENANCE - READ BEFORE PRESENTING
-----------------------------------
    Rs 19,930   Phase 5 cost-to-serve, P50, SIMULATED (seed 20261019)
                _exports/phase5/unit_economics.csv. Rounded to Rs 20,000
                for presentation. NOT a vendor quotation.
    Rs 1,20,000 list price. Assumption D-006, UNSOURCED. Recorded as such
                in 06_Pricing_Evidence/README.md line 18.
    Rs 1,00,000 computed = 120,000 - 20,000.
    83.3%       computed = 100,000 / 120,000. CONTRIBUTION margin,
                before CAC and before on-premise servicing.
    ~6          computed = 600,000 / 100,000. Fixed cost = the Rs 6 lakh
                grant ask, not a researched operating budget.
    Rs 7.2L     computed = 6 x 120,000.
    CAC         Phase 5 P25-P50, SIMULATED: Rs 579,357 - Rs 716,155.
                Research verdict: P(LTV/CAC > 1) = 0.0% at Rs 1.2L ACV.
    LTV/CAC     0.14 (P25) - 0.21 (P50), SIMULATED.

The Rs 20,000 component split is a PLANNING ALLOCATION around the Rs 19,930
median. The research records that no cloud/hosting vendor quote exists. The
split is not evidence of what those line items actually cost.

Usage:  python 17_PPT_Assets/build_unit_economics.py
"""

import textwrap
from pathlib import Path

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent

NAVY = "#1E3A5F"
TEAL = "#0F766E"
ORANGE = "#EA580C"
RED = "#B91C1C"
SLATE = "#64748B"
GREY = "#94A3B8"
WHITE = "#FFFFFF"
CARD_EDGE = "#CBD5E1"
PAGE_BG = "#F8FAFC"
ORANGE_BG = "#FFF4E6"
ORANGE_EDGE = "#F97316"
STRIP_BG = "#EEF2F7"

DPI = 200
FIGSIZE = (10.0, 10.0)

# ---- inputs (single source of truth) -------------------------------------
ACV = 120_000
DIRECT_COST = 20_000
GROSS_PROFIT = ACV - DIRECT_COST
GROSS_MARGIN = GROSS_PROFIT / ACV
FIXED_COST = 600_000
BREAK_EVEN = FIXED_COST / GROSS_PROFIT
ARR_AT_BREAKEVEN = BREAK_EVEN * ACV
COST_P50 = 19_930
COST_P25, COST_P75 = 15_596, 24_359
CAC_P25, CAC_P50 = 579_357, 716_155
LTV_CAC_P25, LTV_CAC_P50 = 0.14, 0.21
CAC_TARGET = 100_000
LTV_CAC_TARGET = 3.0

COST_LINES = [
    ("Cloud infrastructure\n& hosting", 6_000, "#1E3A5F"),
    ("AI / API usage", 5_000, "#0F766E"),
    ("Maintenance\n& deployment", 3_500, "#3B82F6"),
    ("Support & monitoring", 3_000, "#B45309"),
    ("Storage, comms\n& notifications", 2_500, "#64748B"),
]
COST_TOTAL = sum(v for _, v, _ in COST_LINES)

CHECKS = []


def check(name, cond):
    CHECKS.append((name, bool(cond)))


# ---- primitives -----------------------------------------------------------
def _panel(ax, x, y, w, h, fc=WHITE, ec=CARD_EDGE, lw=1.4, z=2):
    ax.add_patch(FancyBboxPatch(
        (x, y), w, h, boxstyle="round,pad=0.006,rounding_size=0.015",
        linewidth=lw, edgecolor=ec, facecolor=fc, zorder=z))


def _foot(ax, txt, y=0.085, color=GREY, size=10.5, width=88, pad=0.030):
    lines = textwrap.wrap(txt, width)
    start = y + (len(lines) - 1) * pad / 2
    for i, ln in enumerate(lines):
        ax.text(0.5, start - i * pad, ln, fontsize=size, color=color,
                style="italic", ha="center", va="center", zorder=4)


def _banner(ax, y, h, title, value, note=None):
    _panel(ax, 0.06, y, 0.88, h, fc=ORANGE_BG, ec=ORANGE_EDGE, lw=2.0)
    if note:
        ax.text(0.5, y + h * 0.80, title, fontsize=11.5, color=ORANGE,
                style="italic", va="center", ha="center", zorder=3)
        ax.text(0.5, y + h * 0.47, value, fontsize=20, color=ORANGE,
                fontweight="bold", va="center", ha="center", zorder=3)
        ax.text(0.5, y + h * 0.15, note, fontsize=9.5, color=ORANGE,
                va="center", ha="center", zorder=3)
    else:
        ax.text(0.5, y + h * 0.66, title, fontsize=12.0, color=ORANGE,
                style="italic", va="center", ha="center", zorder=3)
        ax.text(0.5, y + h * 0.28, value, fontsize=20, color=ORANGE,
                fontweight="bold", va="center", ha="center", zorder=3)


def _base(title, sub):
    fig = plt.figure(figsize=FIGSIZE, dpi=DPI, facecolor=PAGE_BG)
    ax = fig.add_axes([0, 0, 1, 1])
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    ax.axis("off")
    ax.text(0.06, 0.945, title, fontsize=21, fontweight="bold", color=NAVY,
            va="center", ha="left")
    ax.text(0.94, 0.945, sub, fontsize=11, color=SLATE, va="center",
            ha="right")
    ax.plot([0.06, 0.94], [0.905, 0.905], color=CARD_EDGE, lw=1.4)
    return fig, ax


def _save(fig, out: Path):
    out.parent.mkdir(parents=True, exist_ok=True)
    fig.savefig(out, dpi=DPI, facecolor=PAGE_BG)
    plt.close(fig)
    return out


# ---- ue_01 ---------------------------------------------------------------
def ue01(out: Path):
    fig, ax = _base("StartupHub  \u00b7  Unit Economics",
                    "per institution  \u00b7  annual")

    cards = [
        (f"\u20b9{DIRECT_COST:,}", "Direct Cost\n/ Institution / Year", TEAL),
        (f"\u20b9{ACV:,}", "Institutional ACV\n/ Year", NAVY),
        (f"\u20b9{GROSS_PROFIT:,}", "Gross Contribution\n/ Institution", NAVY),
        (f"~{GROSS_MARGIN*100:.0f}%", "Gross Margin\n(contribution)", TEAL),
    ]
    left, right, gap = 0.06, 0.94, 0.035
    w = (right - left - gap) / 2
    h, rowgap = 0.115, 0.030

    # cursor-based top-down layout: each block flows below the previous
    cursor = 0.760                      # top of first card row
    rows_y = [cursor, cursor - h - rowgap]   # [0.760, 0.615]

    for i, (val, lab, col) in enumerate(cards):
        x = left + (i % 2) * (w + gap)
        y = rows_y[i // 2]
        _panel(ax, x, y, w, h)
        ax.text(x + w / 2, y + h - 0.048, val, fontsize=24, color=col,
                fontweight="bold", va="center", ha="center", zorder=3)
        ax.text(x + w / 2, y + 0.032, lab, fontsize=10.5, color=SLATE,
                va="center", ha="center", zorder=3, linespacing=1.5)

    # flow strip — sits strictly below row2
    steps = [
        (f"\u20b9{ACV/100000:.1f}L", "ACV"),
        (f"\u20b9{DIRECT_COST/1000:.0f}K", "Direct cost"),
        (f"\u20b9{GROSS_PROFIT/100000:.1f}L", "Gross contrib."),
        ("~83%", "Margin"),
        ("6", "Break-even"),
        (f"\u20b9{ARR_AT_BREAKEVEN/100000:.1f}L", "ARR"),
    ]
    fh = 0.095
    fy = rows_y[1] - rowgap - fh        # 0.615 - 0.030 - 0.095 = 0.490
    _panel(ax, left, fy, right - left, fh, fc=STRIP_BG, ec=CARD_EDGE)
    cellw = (right - left - 0.02) / len(steps)
    for i, (big, small) in enumerate(steps):
        cx = left + 0.01 + i * cellw + cellw / 2
        ax.text(cx, fy + fh * 0.64, big, fontsize=13,
                color=NAVY if i % 2 == 0 else TEAL, fontweight="bold",
                va="center", ha="center", zorder=3)
        ax.text(cx, fy + fh * 0.24, small, fontsize=8.5, color=SLATE,
                va="center", ha="center", zorder=3)
        if i < len(steps) - 1:
            ax.annotate("", xy=(cx + cellw / 2 - 0.004, fy + fh / 2),
                        xytext=(cx + cellw / 2 - 0.020, fy + fh / 2),
                        arrowprops=dict(arrowstyle="-|>", color=GREY, lw=1.2,
                                        shrinkA=0, shrinkB=0), zorder=3)

    # banner — sits strictly below flow strip
    bh = 0.090
    by = fy - 0.040 - bh                # 0.490 - 0.040 - 0.090 = 0.360
    _banner(ax, by, bh,
            f"Operating break-even \u2248 {int(BREAK_EVEN)} institutions "
            f"(before CAC)",
            f"\u20b9{ARR_AT_BREAKEVEN/100000:.1f}L ARR")

    _foot(ax,
          "Gross margin is CONTRIBUTION, before CAC and before on-premise "
          "servicing. Phase 5 on-premise-adjusted margin (P50) = 54%. "
          "Cost-to-serve Rs 19,930 P50 (SIMULATED, seed 20261019); ACV Rs "
          "1,20,000 is assumption D-006, UNSOURCED.", y=0.060, size=10.0,
          width=92, pad=0.028)
    return _save(fig, out)


# ---- ue_02 ---------------------------------------------------------------
def ue02(out: Path):
    fig, ax = _base("Cost to Serve  \u00b7  Rs 20,000 / yr",
                    "PLANNING ALLOCATION")

    rowh, barh = 0.088, 0.050
    maxv = max(v for _, v, _ in COST_LINES)
    x0, maxw = 0.42, 0.36
    y0 = 0.40

    for i, (lab, val, col) in enumerate(COST_LINES):
        yy = y0 + (len(COST_LINES) - 1 - i) * rowh
        ax.text(0.39, yy, lab, fontsize=11.5, color=NAVY, va="center",
                ha="right", zorder=3, linespacing=1.4)
        bw = maxw * val / maxv
        _panel(ax, x0, yy - barh / 2, bw, barh, fc=col, ec=col, lw=0, z=2)
        ax.text(x0 + bw + 0.015, yy, f"\u20b9{val:,}", fontsize=13,
                color=NAVY, fontweight="bold", va="center", ha="left",
                zorder=3)

    ty = y0 + len(COST_LINES) * rowh + 0.005
    ax.plot([0.30, 0.90], [ty - 0.022, ty - 0.022], color=CARD_EDGE, lw=1.2)
    ax.text(0.39, ty + 0.030, "Total", fontsize=13, color=NAVY,
            fontweight="bold", va="center", ha="right", zorder=3)
    ax.text(x0, ty + 0.030, f"\u20b9{COST_TOTAL:,}", fontsize=16, color=TEAL,
            fontweight="bold", va="center", ha="left", zorder=3)
    ax.text(0.90, ty + 0.030,
            f"researched median \u20b9{COST_P50:,} (P50)",
            fontsize=10.5, color=SLATE, va="center", ha="right", zorder=3)

    _banner(ax, 0.200, 0.100,
            "Rs 20,000 is a planning allocation around the researched median",
            "NOT a vendor quote")

    _foot(ax,
          f"Allocation basis: Phase 5 annual cost-to-serve P50 = Rs "
          f"{COST_P50:,} (P25 Rs {COST_P25:,} / P75 Rs {COST_P75:,}), "
          f"SIMULATED, seed 20261019. Component split is analyst judgement, "
          f"not observed spend. Validate against vendor quotations during "
          f"pilot deployment.", y=0.075, size=10.0, width=92, pad=0.032)
    return _save(fig, out)


# ---- ue_03 ---------------------------------------------------------------
def ue03(out: Path):
    fig, ax = _base("Customer Acquisition",
                    "the binding constraint")

    rows = [
        ("Institutional ACV", f"\u20b9{ACV:,}", f"\u20b9{ACV:,}+",
         "NAVY", "NAVY"),
        ("Direct service cost", "~\u20b920K", "\u2264\u20b925K",
         "TEAL", "TEAL"),
        ("Gross margin", "~83%", "\u226575%", "TEAL", "TEAL"),
        ("CAC", f"\u20b9{CAC_P25/100000:.1f}\u2013{CAC_P50/100000:.1f}L",
         f"\u2264\u20b9{CAC_TARGET/100000:.1f}L", "RED", "TEAL"),
        ("LTV / CAC",
         f"{LTV_CAC_P25:.2f}\u2013{LTV_CAC_P50:.2f}\u00d7",
         f"\u2265{LTV_CAC_TARGET:.0f}\u00d7", "RED", "TEAL"),
    ]
    cmap = {"NAVY": NAVY, "TEAL": TEAL, "RED": RED}

    x_lab, x_now, x_tgt = 0.10, 0.50, 0.84
    hy, hh = 0.790, 0.068
    _panel(ax, 0.06, hy, 0.88, hh, fc=STRIP_BG, ec=CARD_EDGE)
    ax.text(x_lab, hy + hh / 2, "Metric", fontsize=12.5, color=NAVY,
            fontweight="bold", va="center", ha="left", zorder=3)
    ax.text(x_now, hy + hh / 2, "Current research", fontsize=12.5, color=RED,
            fontweight="bold", va="center", ha="center", zorder=3)
    ax.text(x_tgt, hy + hh / 2, "Target model", fontsize=12.5, color=TEAL,
            fontweight="bold", va="center", ha="center", zorder=3)

    rh = 0.098
    for i, (lab, now, tgt, nc, tc) in enumerate(rows):
        yy = hy - 0.018 - i * rh
        if i % 2 == 0:
            _panel(ax, 0.06, yy - rh / 2 + 0.004, 0.88, rh - 0.004,
                   fc=WHITE, ec=CARD_EDGE, lw=0.8, z=1)
        ax.text(x_lab, yy, lab, fontsize=12.5, color=NAVY, va="center",
                ha="left", zorder=3)
        ax.text(x_now, yy, now, fontsize=14.5, color=cmap[nc],
                fontweight="bold", va="center", ha="center", zorder=3)
        ax.text(x_tgt, yy, tgt, fontsize=14.5, color=cmap[tc],
                fontweight="bold", va="center", ha="center", zorder=3)

    _banner(ax, 0.195, 0.100,
            "At Rs 1.2L ACV the research finds P(LTV/CAC > 1) = 0.0% "
            "\u2014 50,000 trials",
            "Target, not proven",
            note="Rs 1L CAC is a target model, not a result")

    _foot(ax,
          "CAC Rs 5.79L (P25) \u2013 Rs 7.16L (P50), LTV/CAC 0.14 \u2013 0.21, "
          "SIMULATED, seed 20261019, from "
          "_exports/phase5/unit_economics.csv. Research verdict: zero of "
          "50,000 trials clear 1.0. ACV needed for LTV/CAC = 3 is Rs "
          "10,27,962 \u2014 8.6x the list price.", y=0.075, size=10.0,
          width=92, pad=0.032)
    return _save(fig, out)


# ---- validate ------------------------------------------------------------
def validate():
    check("gross profit = acv - direct", GROSS_PROFIT == 100_000)
    check("gross margin = 100000/120000",
          abs(GROSS_MARGIN - 100_000 / 120_000) < 1e-9)
    check("gross margin rounds to 83%", round(GROSS_MARGIN * 100) == 83)
    check("break-even = 600000/100000", abs(BREAK_EVEN - 6.0) < 1e-9)
    check("ARR at break-even = 7.2L", abs(ARR_AT_BREAKEVEN - 720_000) < 1e-9)
    check("cost lines sum to 20000", COST_TOTAL == DIRECT_COST)
    check("cost lines are 5", len(COST_LINES) == 5)
    check("direct cost within phase5 p25-p75", COST_P25 <= DIRECT_COST
          <= COST_P75)
    check("direct cost rounds from p50 19930", round(COST_P50 / 1000) * 1000
          == 20_000)
    check("cac band ordered", CAC_P25 < CAC_P50)
    check("cac target far below research", CAC_TARGET < CAC_P25)
    check("ltv/cac ordered", LTV_CAC_P25 < LTV_CAC_P50)
    check("ltv/cac target above research", LTV_CAC_TARGET > LTV_CAC_P50)
    check("every cost line positive", all(v > 0 for _, v, _ in COST_LINES))
    check("figsize is square", FIGSIZE[0] == FIGSIZE[1])
    return CHECKS


if __name__ == "__main__":
    checks = validate()
    bad = [c for c in checks if not c[1]]
    print(f"  validation: {len(checks) - len(bad)}/{len(checks)} checks passed")
    if bad:
        for name, _ in bad:
            print(f"  FAIL  {name}")
        raise SystemExit(1)
    print(f"  derived    : ACV {ACV:,} - cost {DIRECT_COST:,} = "
          f"{GROSS_PROFIT:,}  ({GROSS_MARGIN*100:.1f}%)")
    print(f"  derived    : {FIXED_COST:,} / {GROSS_PROFIT:,} = "
          f"{BREAK_EVEN:.0f} institutions  ->  {ARR_AT_BREAKEVEN:,.0f} ARR")
    for fn, name in [(ue01, "ue_01_unit_economics.png"),
                     (ue02, "ue_02_cost_to_serve.png"),
                     (ue03, "ue_03_cac_gap.png")]:
        p = fn(HERE / name)
        print(f"  png        {p.relative_to(ROOT)}  "
              f"({p.stat().st_size // 1024} KB)  "
              f"{FIGSIZE[0]}x{FIGSIZE[1]}in @{DPI}DPI")
