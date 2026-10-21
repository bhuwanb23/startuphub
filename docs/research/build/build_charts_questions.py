#!/usr/bin/env python3
"""StartupHub - funding proposal figures.

Eight figures that turn the Q&A into something an investor can read in
thirty seconds.

The load-bearing one is q_03_budget_by_quarter.png. A budget table is
where a proposal quietly stops being a proposal and starts being a wish
list, so this chart shows the money moving - development-heavy in Q1,
market-research-heavy by Q3, and never a quarter that does not name what
it buys.

Every budget figure carries a PROVISIONAL band. Not one rupee has a
quotation behind it, and a chart is exactly where that fact gets lost,
so the chart says it too.

Usage: python build/build_charts_questions.py
Output: _exports/charts/questions/*.png
"""

import sys
from pathlib import Path

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt                                   # noqa: E402
from matplotlib.patches import FancyArrowPatch, FancyBboxPatch, Patch, \
    Rectangle                                                     # noqa: E402
import numpy as np                                                # noqa: E402

sys.path.insert(0, str(Path(__file__).resolve().parent))
import data_questions_funding as Q                               # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "_exports" / "charts" / "questions"

NAVY, TEAL, RED, AMBER, SLATE = "#1E3A5F", "#0F766E", "#B91C1C", "#B45309", "#64748B"
PURPLE, GREEN, PINK, GREY = "#6D28D9", "#15803D", "#BE185D", "#94A3B8"
DPI = 200

# One colour per quarter, used everywhere a quarter appears.
QCOL = {"Q1": TEAL, "Q2": NAVY, "Q3": PURPLE, "Q4": GREEN}

# One colour per budget line, used in every budget figure.
BCOL = {
    "Technology Development & Innovation Refinement": NAVY,
    "Market Research & Pilot Study": TEAL,
    "IP Filing & Management": PURPLE,
    "Incubation & Mentorship": GREEN,
    "Startup Registration & Consultation": AMBER,
    "Competitions / Exhibitions": PINK,
    "Essential Contingency": SLATE,
}

PROVISIONAL = "PROVISIONAL - every figure is a planning estimate; no quotation obtained"

plt.rcParams.update({
    "font.family": "DejaVu Sans", "font.size": 10,
    "axes.titlesize": 13.5, "axes.titleweight": "bold", "axes.titlecolor": NAVY,
    "axes.labelsize": 10, "axes.labelsize": 10, "axes.labelcolor": "#334155",
    "axes.edgecolor": "#CBD5E1", "axes.grid": True, "grid.color": "#E2E8F0",
    "grid.linewidth": 0.8, "axes.axisbelow": True,
    "figure.facecolor": "white", "axes.facecolor": "white", "legend.frameon": False,
})


def _save(fig, name):
    OUT.mkdir(parents=True, exist_ok=True)
    p = OUT / f"{name}.png"
    fig.savefig(p, dpi=DPI, bbox_inches="tight", facecolor="white")
    plt.close(fig)
    print(f"  png   {p.relative_to(ROOT)}  ({p.stat().st_size // 1024} KB)")


def _prov(fig, text=PROVISIONAL, y=0.005, color=AMBER):
    fig.text(0.5, y, text, ha="center", va="bottom", fontsize=8.6,
             color=color, fontweight="bold")


def _wrap(text, width):
    words = str(text).split()
    lines, cur = [], ""
    for w in words:
        if len(cur) + len(w) + 1 <= width:
            cur = f"{cur} {w}".strip()
        else:
            lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


# ==========================================================================
# 1. The one-slide timeline
# ==========================================================================
def chart_roadmap_slide():
    fig, ax = plt.subplots(figsize=(15.2, 8.0))
    ax.set_xlim(0, 16.0)
    ax.set_ylim(0, 8.6)
    ax.axis("off")
    ax.grid(False)

    ax.text(0.25, 8.15, "THE ONE-YEAR PLAN", fontsize=15, fontweight="bold",
            color=NAVY, va="center")
    ax.text(0.25, 7.75, "Four quarters. Four words. Every rupee buys a "
            "milestone.", fontsize=10.5, color=SLATE, va="center")

    W = 3.62
    GAP = 0.28
    X0 = 0.25
    TOP = 7.05
    H = 5.55

    for i, q in enumerate(Q.QUARTERS):
        x = X0 + i * (W + GAP)
        col = QCOL[q["id"]]

        # The quarter's word - the big thing.
        ax.add_patch(FancyBboxPatch(
            (x, TOP - 1.62), W, 1.62, boxstyle="round,pad=0.02,rounding_size=0.10",
            facecolor=col, edgecolor="none"))
        ax.text(x + W / 2, TOP - 0.46, q["phase_word"], ha="center", va="center",
                fontsize=17, fontweight="bold", color="white")
        qlines = _wrap(f'{q["id"]}  ·  {q["name"]}', 30)
        for li, ln in enumerate(qlines):
            ax.text(x + W / 2, TOP - 1.02 - li * 0.24, ln, ha="center",
                    va="center", fontsize=7.8, color="#E2E8F0")

        # The three slide lines.
        body_y = TOP - 1.85
        for j, line in enumerate(q["slide"]):
            y = body_y - j * 0.72
            ax.add_patch(FancyBboxPatch(
                (x, y - 0.52), W, 0.60, boxstyle="round,pad=0.02,rounding_size=0.06",
                facecolor="#F8FAFC", edgecolor="#E2E8F0", linewidth=1.0))
            ax.add_patch(Rectangle((x, y - 0.52), 0.075, 0.60, facecolor=col,
                                   edgecolor="none"))
            ax.text(x + 0.24, y - 0.22, line, ha="left", va="center",
                    fontsize=10.2, color="#1E293B")

        # The milestone chip.
        cy = TOP - 4.32
        ax.add_patch(FancyBboxPatch(
            (x, cy - 0.34), W, 0.68, boxstyle="round,pad=0.02,rounding_size=0.09",
            facecolor="white", edgecolor=col, linewidth=2.0))
        ax.text(x + W / 2, cy, q["slide_outcome"], ha="center", va="center",
                fontsize=10.4, fontweight="bold", color=col)

        # Arrow to the next quarter.
        if i < 3:
            ax.add_patch(FancyArrowPatch(
                (x + W + 0.03, TOP - 0.65), (x + W + GAP - 0.03, TOP - 0.65),
                arrowstyle="-|>", mutation_scale=15, color="#CBD5E1",
                linewidth=2.0, shrinkA=0, shrinkB=0))

    # The story line across the bottom.
    sy = 1.52
    ax.add_patch(FancyBboxPatch(
        (X0, sy - 0.62), 15.5, 1.40, boxstyle="round,pad=0.02,rounding_size=0.10",
        facecolor=NAVY, edgecolor="none"))
    for i, s in enumerate(Q.STORY_ARC):
        cx = X0 + 1.85 + i * 3.85
        ax.text(cx, sy + 0.52, f'{s["quarter"]}  {s["verb"]}', fontsize=11.5,
                fontweight="bold", color="white", va="center", ha="center")
        for li, ln in enumerate(_wrap(s["phrase"], 26)[:3]):
            ax.text(cx, sy + 0.12 - li * 0.24, ln, fontsize=8.4,
                    color="#93C5FD", va="center", ha="center")

    ax.text(0.25, 0.58, "Every expense answers one question:", fontsize=10.5,
            color=SLATE, va="center")
    ax.text(0.25, 0.20, Q.MILESTONE_QUESTION, fontsize=13, fontweight="bold",
            color=NAVY, va="center")

    _save(fig, "q_01_roadmap_slide")


# ==========================================================================
# 2. The roadmap in detail
# ==========================================================================
def chart_roadmap_detail():
    fig, axes = plt.subplots(2, 2, figsize=(15.4, 12.4))
    axes = axes.ravel()

    for i, q in enumerate(Q.QUARTERS):
        ax = axes[i]
        ax.set_xlim(0, 10)
        ax.set_ylim(0, 13.2)
        ax.axis("off")
        ax.grid(False)
        col = QCOL[q["id"]]

        ax.add_patch(Rectangle((0, 11.55), 10, 1.65, facecolor=col,
                               edgecolor="none"))
        ax.text(0.35, 12.72, f'{q["id"]}  ·  {q["name"]}', fontsize=13.5,
                fontweight="bold", color="white", va="center")
        ax.text(0.35, 12.10, q["phase_word"], fontsize=10, color="#E2E8F0",
                va="center", fontweight="bold")

        ax.text(0.35, 11.24, "OBJECTIVE", fontsize=7.8, color=SLATE,
                va="center", fontweight="bold")
        oy = 10.88
        for ln in _wrap(q["objective"], 100):
            ax.text(0.35, oy, ln, fontsize=9.4, color="#334155", va="center")
            oy -= 0.28

        y = 10.28
        for label, items in q["workstreams"]:
            ax.add_patch(Rectangle((0.35, y - 0.02), 0.09, 0.30, facecolor=col,
                                   edgecolor="none"))
            ax.text(0.60, y + 0.13, label.upper(), fontsize=9.2,
                    fontweight="bold", color=NAVY, va="center")
            y -= 0.38
            for it in items:
                ax.add_patch(Rectangle((0.64, y - 0.045), 0.055, 0.055,
                                       facecolor=GREY, edgecolor="none"))
                ax.text(0.85, y - 0.01, it, fontsize=8.9, color="#334155",
                        va="center")
                y -= 0.305
            y -= 0.16

        ax.add_patch(FancyBboxPatch(
            (0.30, 0.30), 9.40, 1.28, boxstyle="round,pad=0.02,rounding_size=0.10",
            facecolor="#F1F5F9", edgecolor=col, linewidth=1.8))
        ax.text(0.58, 1.28, "QUARTER OUTCOME", fontsize=7.8, fontweight="bold",
                color=col, va="center")
        yy = 0.92
        for ln in _wrap(q["outcome"], 68):
            ax.text(0.58, yy, ln, fontsize=9.4, color="#1E293B", va="center")
            yy -= 0.28

    fig.suptitle("The One-Year Roadmap, Quarter by Quarter",
                 fontsize=16, fontweight="bold", color=NAVY, y=0.985)
    fig.text(0.5, 0.958, "Develop what the quarter is for. Validate it. "
             "Name the resources it consumes. Exit with a milestone.",
             ha="center", fontsize=10.5, color=SLATE)
    fig.tight_layout(rect=[0, 0.012, 1, 0.945])
    _save(fig, "q_02_roadmap_detail")


# ==========================================================================
# 3. The budget, by line and by quarter
# ==========================================================================
def chart_budget_by_quarter():
    """The budget as a matrix - the reconciliation, made visible.

    Rows are the seven lines, columns are the four quarters, and the last
    row and last column are the totals. A reader can check the arithmetic
    by eye in the way they would on a printed table, which is the whole
    point: the criticism of the original sheet was that its totals did not
    reconcile, and the fix has to be visible rather than asserted.
    """
    fig, ax = plt.subplots(figsize=(15.6, 9.2))
    ax.set_xlim(0, 16.0)
    ax.set_ylim(0, 10.6)
    ax.axis("off")
    ax.grid(False)

    ax.text(0.30, 10.05, "WHERE THE Rs 6,00,000 GOES", fontsize=15,
            fontweight="bold", color=NAVY, va="center")
    ax.text(0.30, 9.66, "Seven lines, four quarters. Read the bottom row "
            "across and the right column down - they agree.",
            fontsize=10.4, color=SLATE, va="center")

    lines = Q.BUDGET
    cols = Q.computed_quarter_totals()
    grand = Q.computed_total()

    # Geometry.
    LBL_W = 5.35           # label column
    CELL_W = 1.78          # one quarter column
    TOT_W = 2.05           # total column
    X0 = 0.30
    HEAD_Y = 9.20
    ROW_H = 0.78
    GAP = 0.07

    qx = [X0 + LBL_W + i * (CELL_W + GAP) for i in range(4)]
    tot_x = X0 + LBL_W + 4 * (CELL_W + GAP)

    # Header.
    for i, q in enumerate(Q.QUARTERS):
        ax.add_patch(FancyBboxPatch(
            (qx[i], HEAD_Y - 0.52), CELL_W, 0.62,
            boxstyle="round,pad=0.02,rounding_size=0.07",
            facecolor=QCOL[q["id"]], edgecolor="none"))
        ax.text(qx[i] + CELL_W / 2, HEAD_Y - 0.21, q["id"], ha="center",
                va="center", fontsize=12, fontweight="bold", color="white")
    ax.add_patch(FancyBboxPatch(
        (tot_x, HEAD_Y - 0.52), TOT_W, 0.62,
        boxstyle="round,pad=0.02,rounding_size=0.07",
        facecolor=NAVY, edgecolor="none"))
    ax.text(tot_x + TOT_W / 2, HEAD_Y - 0.21, "TOTAL", ha="center", va="center",
            fontsize=11, fontweight="bold", color="white")

    ax.text(X0 + 0.18, HEAD_Y - 0.21, "BUDGET LINE", fontsize=9.2,
            fontweight="bold", color=NAVY, va="center")

    # The largest single cell drives the shading scale.
    vmax = max(max(b["q"]) for b in lines)

    y = HEAD_Y - 0.74
    for b in lines:
        col = BCOL[b["name"]]
        ax.add_patch(FancyBboxPatch(
            (X0, y - ROW_H + 0.10), LBL_W - GAP, ROW_H,
            boxstyle="round,pad=0.02,rounding_size=0.06",
            facecolor="#F8FAFC", edgecolor="#E2E8F0", linewidth=0.9))
        ax.add_patch(Rectangle((X0, y - ROW_H + 0.10), 0.085, ROW_H,
                               facecolor=col, edgecolor="none"))
        ax.text(X0 + 0.24, y - 0.19, b["name"], fontsize=9.0, color="#1E293B",
                va="center", fontweight="bold")

        for i, v in enumerate(b["q"]):
            # Shade by magnitude - darker means more money.
            f = 0.06 + 0.34 * (v / vmax)
            ax.add_patch(FancyBboxPatch(
                (qx[i], y - ROW_H + 0.10), CELL_W, ROW_H,
                boxstyle="round,pad=0.02,rounding_size=0.06",
                facecolor=QCOL[f"Q{i + 1}"], edgecolor="none", alpha=f + 0.30))
            ax.text(qx[i] + CELL_W / 2, y - 0.19, Q.short(v), ha="center",
                    va="center", fontsize=10.4, fontweight="bold",
                    color="white" if v > 0 else "#94A3B8")

        ax.add_patch(FancyBboxPatch(
            (tot_x, y - ROW_H + 0.10), TOT_W, ROW_H,
            boxstyle="round,pad=0.02,rounding_size=0.06",
            facecolor="white", edgecolor=col, linewidth=1.8))
        ax.text(tot_x + TOT_W / 2, y - 0.19, Q.short(sum(b["q"])), ha="center",
                va="center", fontsize=11.4, fontweight="bold", color=col)
        y -= ROW_H + GAP

    # The totals row - the thing the original sheet got wrong.
    y -= 0.08
    ax.add_patch(FancyBboxPatch(
        (X0, y - ROW_H + 0.10), LBL_W - GAP, ROW_H,
        boxstyle="round,pad=0.02,rounding_size=0.06",
        facecolor=NAVY, edgecolor="none"))
    ax.text(X0 + 0.24, y - 0.19, "TOTAL", fontsize=10.4, fontweight="bold",
            color="white", va="center")
    for i, v in enumerate(cols):
        ax.add_patch(FancyBboxPatch(
            (qx[i], y - ROW_H + 0.10), CELL_W, ROW_H,
            boxstyle="round,pad=0.02,rounding_size=0.06",
            facecolor=NAVY, edgecolor="none"))
        ax.text(qx[i] + CELL_W / 2, y - 0.19, Q.short(v), ha="center",
                va="center", fontsize=10.6, fontweight="bold", color="white")
    ax.add_patch(FancyBboxPatch(
        (tot_x, y - ROW_H + 0.10), TOT_W, ROW_H,
        boxstyle="round,pad=0.02,rounding_size=0.06",
        facecolor=TEAL, edgecolor="none"))
    ax.text(tot_x + TOT_W / 2, y - 0.19, Q.short(grand), ha="center", va="center",
            fontsize=12.5, fontweight="bold", color="white")

    # The reconciliation, stated.
    ax.text(X0, 1.40,
            "Every row sums to its total. The four column totals sum to the "
            "same Rs 6,00,000. Nothing is balanced by a rounding line.",
            fontsize=10.2, color=SLATE, va="center")

    # Where the shape of the year shows up.
    ax.add_patch(FancyBboxPatch(
        (X0, 0.25), 15.40, 0.92,
        boxstyle="round,pad=0.02,rounding_size=0.08",
        facecolor="#F1F5F9", edgecolor="#CBD5E1", linewidth=1.2))
    ax.text(X0 + 0.28, 0.87, "The shape of the year", fontsize=9.4,
            fontweight="bold", color=NAVY, va="center")
    ax.text(X0 + 0.28, 0.56,
            "Q1 is development: technology is the whole quarter. Q4 is "
            "market: research and launch dominate. The money follows the "
            "work, which is what makes the budget arguable.",
            fontsize=9.4, color="#334155", va="center")

    _prov(fig, y=0.004)
    _save(fig, "q_03_budget_by_quarter")


# ==========================================================================
# 4. The shape of the envelope
# ==========================================================================
def chart_budget_shape():
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(15.0, 7.0),
                                   gridspec_kw={"width_ratios": [1.05, 1]})

    # Left: category share of the envelope.
    lines = Q.BUDGET
    names = [b["name"] for b in lines]
    totals = [sum(b["q"]) for b in lines]
    order = list(np.argsort(totals)[::-1])   # descending by total
    y = np.arange(len(lines))[::-1]           # top row first
    for k, i in enumerate(order):
        ax1.barh(y[k], totals[i] / 1000, height=0.62,
                 color=BCOL[names[i]], edgecolor="white", linewidth=1.0)
    ax1.set_yticks(y)
    ax1.set_yticklabels([names[i] for i in order], fontsize=9.0,
                        color="#1E293B")
    for k, i in enumerate(order):
        v = totals[i]
        ax1.text(v / 1000 + 5, y[k],
                 f"{v / 1000:,.0f}K  ({v / Q.BUDGET_TOTAL:.0%})",
                 va="center", fontsize=9.2, fontweight="bold", color=NAVY)
    ax1.set_xlim(0, 390)
    ax1.set_xlabel("rupees, in thousands")
    ax1.grid(axis="y", visible=False)
    ax1.set_title("Share of the envelope", fontsize=13, fontweight="bold",
                  color=NAVY, pad=10)

    # Right: the quarterly burn and the cumulative curve.
    q = np.array([v / 1000 for v in Q.computed_quarter_totals()])
    cum = np.cumsum(q)
    x = np.arange(4)
    bars = ax2.bar(x, q, width=0.55, color=[QCOL[f"Q{i + 1}"] for i in range(4)],
                    edgecolor="white", linewidth=1.2, label="Quarter spend")
    for xi, v in zip(x, q):
        ax2.text(xi, v + 5, f"{v:,.0f}K", ha="center", fontsize=10.2,
                 fontweight="bold", color=NAVY)
    ax2b = ax2.twinx()
    ax2b.plot(x, cum, color=AMBER, linewidth=2.4, marker="o", markersize=7,
              markerfacecolor="white", markeredgewidth=2.2, markeredgecolor=AMBER,
              label="Cumulative")
    for xi, v in zip(x, cum):
        ax2b.text(xi, v + 16, f"{v:,.0f}K", ha="center", fontsize=9.4,
                  fontweight="bold", color=AMBER,
                  bbox=dict(boxstyle="round,pad=0.16", fc="white", ec="none",
                            alpha=0.88))
    ax2b.set_ylim(0, 720)
    ax2b.set_ylabel("cumulative, in thousands", fontsize=9.4, color=AMBER)
    ax2b.tick_params(axis="y", labelcolor=AMBER, labelsize=9)
    ax2b.grid(False)
    ax2.set_ylim(0, 210)
    ax2.set_xticks(x)
    ax2.set_xticklabels([f"Q{i + 1}" for i in range(4)], fontsize=11,
                         fontweight="bold", color="#1E293B")
    ax2.set_ylabel("quarter spend, in thousands", fontsize=9.4)
    ax2.set_title("The burn, and the cumulative", fontsize=13, fontweight="bold",
                  color=NAVY, pad=10)
    h1, l1 = ax2.get_legend_handles_labels()
    h2, l2 = ax2b.get_legend_handles_labels()
    ax2.legend(h1 + h2, l1 + l2, loc="upper left", fontsize=9.2)

    fig.suptitle("Rs 6,00,000: What the Envelope Looks Like",
                 fontsize=15.5, fontweight="bold", color=NAVY, y=0.975)
    fig.text(0.5, 0.928,
             "Technology is half the envelope. Market research rises from "
             "7% of Q1's spend to 27% of Q4's. Contingency is a controlled "
             f"reserve at {Q.contingency_share():.1%}.",
             ha="center", fontsize=10.3, color=SLATE)
    _prov(fig, y=0.004)
    fig.tight_layout(rect=[0, 0.05, 1, 0.915])
    _save(fig, "q_04_budget_shape")


# ==========================================================================
# 5. Inside the technology budget
# ==========================================================================
def chart_tech_budget():
    fig, ax = plt.subplots(figsize=(15.2, 8.2))
    ax.set_xlim(0, 15.6)
    ax.set_ylim(0, 8.6)
    ax.axis("off")
    ax.grid(False)

    ax.text(0.30, 8.30, "INSIDE THE Rs 3,00,000 TECHNOLOGY LINE", fontsize=15,
            fontweight="bold", color=NAVY, va="center")
    ax.text(0.30, 7.90, "Half the entire envelope, and the line that has to "
            "carry the most scrutiny.", fontsize=10.4, color=SLATE, va="center")

    W = 3.46
    GAP = 0.26
    X0 = 0.30
    TOP = 7.20
    CHIP_H = 0.78
    STEP = 0.84

    for i, t in enumerate(Q.TECH_BUDGET):
        x = X0 + i * (W + GAP)
        col = QCOL[t["quarter"]]

        ax.add_patch(FancyBboxPatch(
            (x, TOP - 1.15), W, 1.15, boxstyle="round,pad=0.02,rounding_size=0.10",
            facecolor=col, edgecolor="none"))
        ax.text(x + 0.28, TOP - 0.38, t["quarter"], fontsize=11.5,
                fontweight="bold", color="white", va="center")
        ax.text(x + W - 0.28, TOP - 0.38, Q.short(t["amount"]), fontsize=15,
                fontweight="bold", color="white", va="center", ha="right")
        ax.text(x + 0.28, TOP - 0.86, t["label"], fontsize=9.2, color="#E2E8F0",
                va="center")

        y = TOP - 1.52
        for it in t["items"]:
            ax.add_patch(FancyBboxPatch(
                (x, y - CHIP_H + 0.14), W, CHIP_H,
                boxstyle="round,pad=0.02,rounding_size=0.07",
                facecolor="#F8FAFC", edgecolor="#E2E8F0", linewidth=1.0))
            ax.add_patch(Rectangle((x, y - CHIP_H + 0.14), 0.07, CHIP_H,
                                   facecolor=col, edgecolor="none"))
            # Item text wraps to two lines so it can never leave its box.
            lines = _wrap(it, 28)[:2]
            ty = y - 0.25 + (len(lines) - 1) * 0.11
            for ln in lines:
                ax.text(x + 0.22, ty, ln, ha="left", va="center",
                        fontsize=8.6, color="#1E293B")
                ty -= 0.22
            y -= STEP

        if i < 3:
            ax.add_patch(FancyArrowPatch(
                (x + W + 0.03, TOP - 0.58), (x + W + GAP - 0.03, TOP - 0.58),
                arrowstyle="-|>", mutation_scale=14, color="#CBD5E1",
                linewidth=2.0, shrinkA=0, shrinkB=0))

    # The rule, in a box at the bottom.
    ax.add_patch(FancyBboxPatch(
        (0.30, 0.32), 14.90, 1.12, boxstyle="round,pad=0.02,rounding_size=0.10",
        facecolor="#FEF3C7", edgecolor=AMBER, linewidth=1.8))
    ax.text(0.62, 1.22, "THE RULE", fontsize=8.6, fontweight="bold",
            color=AMBER, va="center")
    ax.text(0.62, 0.84, "Do not write invented vendor costs.", fontsize=12.5,
            fontweight="bold", color="#7C2D12", va="center")
    ax.text(0.62, 0.54, "Obtain actual quotations and estimates, and use "
            "those as the evidence.", fontsize=10.2, color="#7C2D12",
            va="center")

    _save(fig, "q_05_tech_budget")


# ==========================================================================
# 6. The funding evidence checklist
# ==========================================================================
def chart_funding_evidence():
    fig, ax = plt.subplots(figsize=(15.6, 9.8))
    ax.set_xlim(0, 16.0)
    ax.set_ylim(0, 11.2)
    ax.axis("off")
    ax.grid(False)

    ax.text(0.30, 10.78, "HOW WE PROVE EVERY RUPEE", fontsize=15,
            fontweight="bold", color=NAVY, va="center")
    ax.text(0.30, 10.40, "For every line in the budget, the artefact that "
            "would substantiate it. None of them exists yet.",
            fontsize=10.4, color=SLATE, va="center")

    # Map each evidence category back to the budget line it substantiates.
    cat_to_line = {
        "Technology": "Technology Development & Innovation Refinement",
        "Market Research": "Market Research & Pilot Study",
        "IP": "IP Filing & Management",
        "Incubation": "Incubation & Mentorship",
        "Registration": "Startup Registration & Consultation",
        "Competitions / Exhibitions": "Competitions / Exhibitions",
        "Contingency": "Essential Contingency",
    }
    line_by_name = {b["name"]: b for b in Q.BUDGET}

    # Geometry - the columns are fixed so nothing can collide.
    X0 = 0.30
    ROW_W = 15.40
    LBL_X = 0.55
    AMT_X = 5.60          # right-aligned
    CHIP_X = 5.90         # chips start here
    CHIP_LIMIT = 14.25    # and must end before here
    STATUS_X = 15.50      # right-aligned
    HEAD_Y = 9.90
    ROW_H = 1.00

    ax.text(LBL_X, HEAD_Y, "BUDGET LINE", fontsize=8.8, fontweight="bold",
            color=NAVY, va="center")
    ax.text(AMT_X, HEAD_Y, "AMOUNT", fontsize=8.8, fontweight="bold",
            color=NAVY, va="center", ha="right")
    ax.text(CHIP_X, HEAD_Y, "EVIDENCE REQUIRED", fontsize=8.8,
            fontweight="bold", color=NAVY, va="center")
    ax.text(STATUS_X, HEAD_Y, "STATUS", fontsize=8.8, fontweight="bold",
            color=NAVY, va="center", ha="right")
    ax.add_patch(Rectangle((X0, HEAD_Y - 0.22), ROW_W, 0.035,
                           facecolor="#CBD5E1", edgecolor="none"))

    y = HEAD_Y - 0.42
    for ev in Q.FUNDING_EVIDENCE:
        line = cat_to_line[ev["category"]]
        b = line_by_name[line]
        col = BCOL[line]

        ax.add_patch(Rectangle((X0, y - ROW_H + 0.10), ROW_W, ROW_H,
                               facecolor="#F8FAFC", edgecolor="#E2E8F0",
                               linewidth=0.8))
        ax.add_patch(Rectangle((X0, y - ROW_H + 0.10), 0.09, ROW_H,
                               facecolor=col, edgecolor="none"))
        # The line name is wrapped so it can never reach the amount column.
        ll = _wrap(line, 30)[:2]
        for li, ln in enumerate(ll):
            ax.text(LBL_X, y - 0.16 - li * 0.24, ln, fontsize=8.2,
                    color="#1E293B", va="center", fontweight="bold")
        ax.text(AMT_X, y - 0.16, Q.short(sum(b["q"])), fontsize=9.6,
                color=NAVY, va="center", ha="right", fontweight="bold")

        # The artefacts, flowed across the evidence column and wrapped.
        cx, cy = CHIP_X, y - 0.30
        for art in ev["artefacts"]:
            w = 0.072 * len(art) + 0.30
            if cx + w > CHIP_LIMIT:
                cx = CHIP_X
                cy -= 0.46
            ax.add_patch(FancyBboxPatch(
                (cx, cy - 0.20), w, 0.40,
                boxstyle="round,pad=0.02,rounding_size=0.05",
                facecolor="white", edgecolor="#CBD5E1", linewidth=0.9))
            ax.text(cx + w / 2, cy, art, fontsize=7.6, color="#475569",
                    va="center", ha="center")
            cx += w + 0.14

        ax.text(STATUS_X, y - 0.16, "0 obtained", fontsize=8.8, color=AMBER,
                va="center", ha="right", fontweight="bold")
        y -= ROW_H + 0.06

    ax.add_patch(FancyBboxPatch(
        (X0, 0.22), ROW_W, 0.82, boxstyle="round,pad=0.02,rounding_size=0.08",
        facecolor="#FEF3C7", edgecolor=AMBER, linewidth=1.6))
    ax.text(X0 + 0.32, 0.82, "Contingency is not extra money.", fontsize=11,
            fontweight="bold", color="#7C2D12", va="center")
    ax.text(X0 + 0.32, 0.48, "It is a controlled reserve for essential "
            "unforeseen MVP/pilot requirements, subject to approval and "
            "funding rules.", fontsize=9.6, color="#7C2D12", va="center")

    _save(fig, "q_06_funding_evidence")


# ==========================================================================
# 7. Team and dependencies
# ==========================================================================
def chart_team_dependencies():
    fig, ax = plt.subplots(figsize=(14.8, 8.8))
    ax.set_xlim(0, 15.0)
    ax.set_ylim(0, 9.2)
    ax.axis("off")
    ax.grid(False)

    ax.text(0.30, 8.90, "THE TEAM FOR THE YEAR", fontsize=15, fontweight="bold",
            color=NAVY, va="center")
    ax.text(0.30, 8.50, "What we control on the left. What we depend on on "
            "the right.", fontsize=10.4, color=SLATE, va="center")

    # Divider.
    ax.add_patch(Rectangle((6.90, 1.40), 0.022, 6.20, facecolor="#CBD5E1",
                           edgecolor="none"))
    ax.text(3.60, 7.95, "CORE TEAM", fontsize=9.6, fontweight="bold",
            color=TEAL, va="center", ha="center")
    ax.text(10.90, 7.95, "EXTERNAL DEPENDENCIES", fontsize=9.6,
            fontweight="bold", color=NAVY, va="center", ha="center")

    # Core team cards.
    y = 7.45
    for t in Q.TEAM:
        ax.add_patch(FancyBboxPatch(
            (0.30, y - 0.78), 6.30, 0.92,
            boxstyle="round,pad=0.02,rounding_size=0.08",
            facecolor="white", edgecolor=TEAL, linewidth=1.4))
        ax.add_patch(Rectangle((0.30, y - 0.78), 0.09, 0.92, facecolor=TEAL,
                               edgecolor="none"))
        ax.text(0.58, y + 0.02, t["role"], fontsize=10.6, fontweight="bold",
                color=NAVY, va="center")
        ax.text(0.58, y - 0.44, t["detail"], fontsize=8.8, color="#475569",
                va="center")
        y -= 1.00

    # Dependencies.
    y = 7.45
    for d in Q.DEPENDENCIES:
        ax.add_patch(FancyBboxPatch(
            (7.25, y - 0.40), 7.45, 0.60,
            boxstyle="round,pad=0.02,rounding_size=0.09",
            facecolor=NAVY, edgecolor="none"))
        ax.text(7.60, y - 0.10, d, fontsize=10.2, color="white", va="center",
                fontweight="bold")
        y -= 0.70

    # The dependency that actually gates the plan.
    ax.add_patch(FancyBboxPatch(
        (7.25, 0.35), 7.45, 1.10,
        boxstyle="round,pad=0.02,rounding_size=0.08",
        facecolor="#FEF3C7", edgecolor=AMBER, linewidth=1.6))
    ax.text(7.55, 1.17, "The one that gates everything", fontsize=9.2,
            fontweight="bold", color=AMBER, va="center")
    ax.text(7.55, 0.79, "Pilot institutions. Q3 cannot start, and Q4 cannot "
            "be validated,", fontsize=8.8, color="#7C2D12", va="center")
    ax.text(7.55, 0.57, "without them. Secure them during Q2.",
            fontsize=8.8, color="#7C2D12", va="center")

    # The mirror note on the internal side.
    ax.add_patch(FancyBboxPatch(
        (0.30, 0.35), 6.30, 1.10,
        boxstyle="round,pad=0.02,rounding_size=0.08",
        facecolor="#F1F5F9", edgecolor="#CBD5E1", linewidth=1.4))
    ax.text(0.60, 1.17, "What these roles cost is inside the envelope",
            fontsize=9.2, fontweight="bold", color=NAVY, va="center")
    ax.text(0.60, 0.79, "The team is what the technology and market-research "
            "lines buy. A role here is a", fontsize=8.8, color="#334155",
            va="center")
    ax.text(0.60, 0.57, "commitment, not a line item - so the estimate must "
            "name a quotation.", fontsize=8.8, color="#334155", va="center")

    _save(fig, "q_07_team_dependencies")


# ==========================================================================
# 8. The investor story
# ==========================================================================
def chart_investor_story():
    fig, ax = plt.subplots(figsize=(15.0, 7.6))
    ax.set_xlim(0, 15.4)
    ax.set_ylim(0, 8.0)
    ax.axis("off")
    ax.grid(False)

    ax.text(0.30, 7.55, "THE INVESTOR STORY", fontsize=15, fontweight="bold",
            color=NAVY, va="center")

    # The paragraph, set as a quotation.
    ax.add_patch(FancyBboxPatch(
        (0.30, 4.95), 14.80, 1.62,
        boxstyle="round,pad=0.02,rounding_size=0.10",
        facecolor="#F8FAFC", edgecolor="#E2E8F0", linewidth=1.2))
    ax.add_patch(Rectangle((0.30, 4.95), 0.10, 1.62, facecolor=NAVY,
                           edgecolor="none"))
    y = 6.26
    for ln in _wrap(Q.INVESTOR_STORY, 96):
        ax.text(0.78, y, ln, fontsize=11.4, color="#1E293B", va="center")
        y -= 0.31

    # The four beats.
    W = 3.50
    GAP = 0.30
    X0 = 0.30
    for i, s in enumerate(Q.STORY_ARC):
        x = X0 + i * (W + GAP)
        q = next(qq for qq in Q.QUARTERS if qq["id"] == s["quarter"])
        col = QCOL[s["quarter"]]

        ax.add_patch(FancyBboxPatch(
            (x, 1.62), W, 2.60, boxstyle="round,pad=0.02,rounding_size=0.10",
            facecolor="white", edgecolor=col, linewidth=2.0))
        ax.add_patch(FancyBboxPatch(
            (x, 3.42), W, 0.80, boxstyle="round,pad=0.02,rounding_size=0.10",
            facecolor=col, edgecolor="none"))
        ax.text(x + W / 2, 3.82, f'{s["quarter"]}  {s["verb"]}', ha="center",
                va="center", fontsize=13, fontweight="bold", color="white")
        yy = 3.06
        for ln in _wrap(s["phrase"], 30):
            ax.text(x + W / 2, yy, ln, ha="center", va="center", fontsize=10.2,
                    color="#1E293B")
            yy -= 0.28
        ax.add_patch(Rectangle((x + 0.55, 1.98), W - 1.10, 0.035,
                               facecolor="#E2E8F0", edgecolor="none"))
        ax.text(x + W / 2, 1.80, q["slide_outcome"], ha="center", va="center",
                fontsize=10.2, fontweight="bold", color=col)

        if i < 3:
            ax.add_patch(FancyArrowPatch(
                (x + W + 0.04, 2.92), (x + W + GAP - 0.04, 2.92),
                arrowstyle="-|>", mutation_scale=16, color="#CBD5E1",
                linewidth=2.2, shrinkA=0, shrinkB=0))

    # The framing, and the thing not to claim.
    ax.add_patch(FancyBboxPatch(
        (0.30, 0.20), 9.30, 1.10, boxstyle="round,pad=0.02,rounding_size=0.08",
        facecolor="#FEF3C7", edgecolor=AMBER, linewidth=1.6))
    ax.text(0.58, 1.10, "Do not present Rs 6 lakh as an arbitrary funding "
            "requirement.", fontsize=10.2, fontweight="bold", color="#7C2D12",
            va="center")
    ax.text(0.58, 0.72, "Present it as derived from four defined milestones, "
            "with each head supported by evidence.", fontsize=8.8,
            color="#7C2D12", va="center")
    ax.text(0.58, 0.46, "And do not claim it is the MIC-approved amount "
            "until the applicable call is checked.", fontsize=8.8,
            color="#7C2D12", va="center")

    ax.add_patch(FancyBboxPatch(
        (9.85, 0.20), 5.25, 1.10, boxstyle="round,pad=0.02,rounding_size=0.08",
        facecolor="#F1F5F9", edgecolor="#CBD5E1", linewidth=1.4))
    ax.text(10.12, 1.10, "The question every rupee must answer", fontsize=9.2,
            fontweight="bold", color=NAVY, va="center")
    ax.text(10.12, 0.66, Q.MILESTONE_QUESTION, fontsize=10.4,
            fontweight="bold", color=SLATE, va="center")

    _save(fig, "q_08_investor_story")


def main():
    print("Funding proposal figures")
    chart_roadmap_slide()
    chart_roadmap_detail()
    chart_budget_by_quarter()
    chart_budget_shape()
    chart_tech_budget()
    chart_funding_evidence()
    chart_team_dependencies()
    chart_investor_story()
    print(f"  8 figures -> {OUT}")


if __name__ == "__main__":
    main()
