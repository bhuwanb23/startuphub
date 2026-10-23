"""StartupHub - unit economics infographic pack.

Three rectangle PNGs, same 12.0 x 4.4 in canvas as grant_requirement.png
so the four slide figures tile as one strip:

    ue_01_unit_economics.png   the four-card PPT version + flow strips
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
    83.3%       computed = 100,000 / 120,000. This is CONTRIBUTION margin
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
TEAL_BG = "#ECFDF5"
ORANGE_BG = "#FFF4E6"
ORANGE_EDGE = "#F97316"

DPI = 200
FIGSIZE = (12.0, 4.4)

# ---- inputs (single source of truth) -------------------------------------
ACV = 120_000
DIRECT_COST = 20_000
GROSS_PROFIT = ACV - DIRECT_COST
GROSS_MARGIN = GROSS_PROFIT / ACV
FIXED_COST = 600_000
BREAK_EVEN = FIXED_COST / GROSS_PROFIT
ARR_AT_BREAKEVEN = BREAK_EVEN * ACV
COST_P50 = 19_930
CAC_P25, CAC_P50 = 579_357, 716_155
LTV_CAC_P25, LTV_CAC_P50 = 0.14, 0.21
CAC_TARGET = 100_000
LTV_CAC_TARGET = 3.0

COST_LINES = [
    ("Cloud infrastructure & hosting", 6_000, "#1E3A5F"),
    ("AI / API usage", 5_000, "#0F766E"),
    ("Maintenance & deployment", 3_500, "#3B82F6"),
    ("Support & monitoring", 3_000, "#B45309"),
    ("Storage, comms & notifications", 2_500, "#64748B"),
]
COST_TOTAL = sum(v for _, v, _ in COST_LINES)

CHECKS = []


def check(name, cond):
    CHECKS.append((name, bool(cond)))


def _panel(ax, x, y, w, h, fc=WHITE, ec=CARD_EDGE, lw=1.4, z=2):
    ax.add_patch(FancyBboxPatch(
        (x, y), w, h, boxstyle="round,pad=0.006,rounding_size=0.02",
        linewidth=lw, edgecolor=ec, facecolor=fc, zorder=z))


def _foot(ax, txt, y=0.038, color=GREY, size=8.2):
    ax.text(0.5, y, txt, fontsize=size, color=color, style="italic",
            ha="center", va="center", zorder=4)


def _banner(ax, title, value, note=None):
    _panel(ax, 0.035, 0.055, 0.93, 0.16, fc=ORANGE_BG, ec=ORANGE_EDGE, lw=2.0)
    ax.text(0.055, 0.135, title, fontsize=10.5, color=ORANGE, style="italic",
            va="center", ha="left", zorder=3)
    if note:
        ax.text(0.60, 0.135, note, fontsize=8.6, color=ORANGE,
                va="center", ha="center", zorder=3)
    ax.text(0.945, 0.135, value, fontsize=19, color=ORANGE, fontweight="bold",
            va="center", ha="right", zorder=3)


def _base(title, sub=None):
    fig = plt.figure(figsize=FIGSIZE, dpi=DPI, facecolor=PAGE_BG)
    ax = fig.add_axes([0, 0, 1, 1])
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    ax.axis("off")
    ax.text(0.035, 0.935, title, fontsize=15.5, fontweight="bold", color=NAVY,
            va="center", ha="left")
    if sub:
        ax.text(0.965, 0.935, sub, fontsize=9.4, color=SLATE, va="center",
                ha="right")
    return fig, ax


def ue01(out: Path):
    """The PPT version: four cards + flow strip + validation strip."""
    fig, ax = _base("StartupHub  \u00b7  Unit Economics",
                    "per institution  \u00b7  annual")

    cards = [
        (f"\u20b9{DIRECT_COST:,}", "Direct Cost\n/ Institution / Year", TEAL),
        (f"\u20b9{ACV:,}", "Institutional ACV\n/ Year", NAVY),
        (f"\u20b9{GROSS_PROFIT:,}", "Gross Contribution\n/ Institution", NAVY),
        (f"~{GROSS_MARGIN*100:.0f}%", "Gross Margin\n(contribution)", TEAL),
    ]
    n = len(cards)
    gap, left, right = 0.022, 0.035, 0.965
    w = (right - left - gap * (n - 1)) / n
    h, y = 0.34, 0.455

    for i, (val, lab, col) in enumerate(cards):
        x = left + i * (w + gap)
        _panel(ax, x, y, w, h)
        ax.text(x + w / 2, y + h - 0.115, val, fontsize=25, color=col,
                fontweight="bold", va="center", ha="center", zorder=3)
        ax.text(x + w / 2, y + 0.095, lab, fontsize=9.5, color=SLATE,
                va="center", ha="center", zorder=3, linespacing=1.45)

    # flow strip
    steps = [
        (f"\u20b9{ACV/100000:.1f}L", "ACV"),
        (f"\u20b9{DIRECT_COST/1000:.0f}K", "Direct cost"),
        (f"\u20b9{GROSS_PROFIT/100000:.1f}L", "Gross contribution"),
        ("~83%", "Margin"),
        ("6", "Break-even"),
        (f"\u20b9{ARR_AT_BREAKEVEN/100000:.1f}L", "ARR"),
    ]
    fy, fh = 0.265, 0.115
    _panel(ax, left, fy, right - left, fh, fc="#EEF2F7", ec=CARD_EDGE)
    cx = left + 0.012
    cellw = (right - left - 0.024) / len(steps)
    for i, (big, small) in enumerate(steps):
        x = cx + i * cellw
        ax.text(x + cellw / 2, fy + fh * 0.63, big, fontsize=13.5,
                color=NAVY if i % 2 == 0 else TEAL, fontweight="bold",
                va="center", ha="center", zorder=3)
        ax.text(x + cellw / 2, fy + fh * 0.22, small, fontsize=8.0,
                color=SLATE, va="center", ha="center", zorder=3)
        if i < len(steps) - 1:
            ax.annotate("", xy=(x + cellw - 0.004, fy + fh / 2),
                        xytext=(x + cellw - 0.028, fy + fh / 2),
                        arrowprops=dict(arrowstyle="-|>", color=GREY,
                                        lw=1.2, shrinkA=0, shrinkB=0),
                        zorder=3)

    _banner(ax,
            f"Operating break-even \u2248 {int(BREAK_EVEN)} institutions "
            f"(before CAC)",
            f"\u20b9{ARR_AT_BREAKEVEN/100000:.1f}L ARR")

    _foot(ax,
          "Gross margin is CONTRIBUTION, before CAC and before on-premise "
          "servicing. Phase 5 on-premise-adjusted margin (P50) = 54%.  "
          "Cost-to-serve Rs 19,930 P50 (SIMULATED, seed 20261019); ACV Rs "
          "1,20,000 is assumption D-006, UNSOURCED.", y=0.035, size=7.6)

    out.parent.mkdir(parents=True, exist_ok=True)
    fig.savefig(out, dpi=DPI, facecolor=PAGE_BG, bbox_inches="tight")
    plt.close(fig)
    return out


def ue02(out: Path):
    """The Rs 20,000 breakdown - a planning allocation."""
    fig, ax = _base("Cost to Serve  \u00b7  Rs 20,000 / institution / year",
                    "PLANNING ALLOCATION")
    bars, labels, colors = [], [], []
    for lab, val, col in COST_LINES:
        labels.append(lab)
        bars.append(val)
        colors.append(col)

    y0 = 0.30
    rowh, barh = 0.115, 0.062
    maxv = max(bars)
    x0, maxw = 0.315, 0.50

    for i, (lab, val, col) in enumerate(zip(labels, bars, colors)):
        yy = y0 + (len(bars) - 1 - i) * rowh
        ax.text(0.30, yy, lab, fontsize=10.2, color=NAVY, va="center",
                ha="right", zorder=3)
        bw = maxw * val / maxv
        _panel(ax, x0, yy - barh / 2, bw, barh, fc=col, ec=col, lw=0, z=2)
        ax.text(x0 + bw + 0.012, yy, f"\u20b9{val:,}", fontsize=11,
                color=NAVY, fontweight="bold", va="center", ha="left", zorder=3)

    ty = y0 + len(bars) * rowh - 0.015
    ax.plot([0.13, 0.93], [ty - 0.04, ty - 0.04], color=CARD_EDGE, lw=1.2)
    ax.text(0.30, ty + 0.03, "Total", fontsize=12, color=NAVY,
            fontweight="bold", va="center", ha="right", zorder=3)
    ax.text(x0, ty + 0.03, f"\u20b9{COST_TOTAL:,}", fontsize=15,
            color=TEAL, fontweight="bold", va="center", ha="left", zorder=3)
    ax.text(x0 + 0.14, ty + 0.03,
            f"vs researched median \u20b9{COST_P50:,} (P50, SIMULATED)",
            fontsize=9, color=SLATE, va="center", ha="left", zorder=3)

    _banner(ax,
            "Rs 20,000 is a planning allocation around the researched median",
            "NOT a vendor quote")

    _foot(ax,
          "Allocation basis: Phase 5 annual cost-to-serve P50 = Rs 19,930 "
          "(P25 Rs 15,596 / P75 Rs 24,359), SIMULATED, seed 20261019. "
          "Component split is analyst judgement, not observed spend. "
          "Validate against vendor quotations during pilot deployment.",
          y=0.035, size=7.8)

    out.parent.mkdir(parents=True, exist_ok=True)
    fig.savefig(out, dpi=DPI, facecolor=PAGE_BG, bbox_inches="tight")
    plt.close(fig)
    return out


def ue03(out: Path):
    """CAC shown separately - research verdict vs target model."""
    fig, ax = _base("Customer Acquisition  \u00b7  the binding constraint",
                    "shown separately, never inside the margin")

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

    x_lab, x_now, x_tgt = 0.055, 0.46, 0.86
    ty = 0.665
    _panel(ax, 0.035, ty, 0.93, 0.085, fc="#EEF2F7", ec=CARD_EDGE)
    ax.text(x_lab, ty + 0.042, "Metric", fontsize=10.5, color=NAVY,
            fontweight="bold", va="center", ha="left", zorder=3)
    ax.text(x_now, ty + 0.042, "Current research", fontsize=10.5, color=RED,
            fontweight="bold", va="center", ha="center", zorder=3)
    ax.text(x_tgt, ty + 0.042, "Target model", fontsize=10.5, color=TEAL,
            fontweight="bold", va="center", ha="center", zorder=3)

    cmap = {"NAVY": NAVY, "TEAL": TEAL, "RED": RED}
    rh = 0.082
    for i, (lab, now, tgt, nc, tc) in enumerate(rows):
        yy = ty - 0.015 - i * rh
        if i % 2 == 0:
            _panel(ax, 0.035, yy - rh / 2 + 0.006, 0.93, rh - 0.004,
                   fc=WHITE, ec=CARD_EDGE, lw=0.8, z=1)
        ax.text(x_lab, yy, lab, fontsize=10.6, color=NAVY, va="center",
                ha="left", zorder=3)
        ax.text(x_now, yy, now, fontsize=12.5, color=cmap[nc],
                fontweight="bold", va="center", ha="center", zorder=3)
        ax.text(x_tgt, yy, tgt, fontsize=12.5, color=cmap[tc],
                fontweight="bold", va="center", ha="center", zorder=3)

    _banner(ax,
            "At Rs 1.2L ACV the research finds P(LTV/CAC > 1) = 0.0% "
            "\u2014 50,000 trials",
            "Target, not proven",
            note="Rs 1L CAC is a target model")

    _foot(ax,
          "CAC Rs 5.79L (P25) \u2013 Rs 7.16L (P50), LTV/CAC 0.14 \u2013 0.21, "
          "SIMULATED, seed 20261019, from _exports/phase5/unit_economics.csv. "
          "Research verdict: zero of 50,000 trials clear 1.0. ACV needed for "
          "LTV/CAC = 3 is Rs 10,27,962 \u2014 8.6x the list price. The target "
          "column is a goal, not a result.", y=0.035, size=7.6)

    out.parent.mkdir(parents=True, exist_ok=True)
    fig.savefig(out, dpi=DPI, facecolor=PAGE_BG, bbox_inches="tight")
    plt.close(fig)
    return out


def validate():
    check("gross profit = acv - direct", GROSS_PROFIT == 100_000)
    check("gross margin = 100000/120000",
          abs(GROSS_MARGIN - 100_000 / 120_000) < 1e-9)
    check("gross margin rounds to 83%", round(GROSS_MARGIN * 100) == 83)
    check("break-even = 600000/100000", abs(BREAK_EVEN - 6.0) < 1e-9)
    check("ARR at break-even = 7.2L", abs(ARR_AT_BREAKEVEN - 720_000) < 1e-9)
    check("cost lines sum to 20000", COST_TOTAL == DIRECT_COST)
    check("cost lines are 5", len(COST_LINES) == 5)
    check("direct cost within phase5 p25-p75",
          15_596 <= DIRECT_COST <= 24_359)
    check("direct cost rounds from p50 19930", round(COST_P50 / 1000) * 1000
          == 20_000)
    check("cac band ordered", CAC_P25 < CAC_P50)
    check("cac target far below research", CAC_TARGET < CAC_P25)
    check("ltv/cac ordered", LTV_CAC_P25 < LTV_CAC_P50)
    check("ltv/cac target above research", LTV_CAC_TARGET > LTV_CAC_P50)
    check("every cost line positive", all(v > 0 for _, v, _ in COST_LINES))
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
    outputs = [
        (ue01, "ue_01_unit_economics.png"),
        (ue02, "ue_02_cost_to_serve.png"),
        (ue03, "ue_03_cac_gap.png"),
    ]
    for fn, name in outputs:
        p = fn(HERE / name)
        print(f"  png        {p.relative_to(ROOT)}  "
              f"({p.stat().st_size // 1024} KB)  "
              f"{FIGSIZE[0]}x{FIGSIZE[1]}in @{DPI}DPI")
