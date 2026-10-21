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
            (x, TOP - 1.30), W, 1.30, boxstyle="round,pad=0.02,rounding_size=0.10",
            facecolor=col, edgecolor="none"))
        ax.text(x + W / 2, TOP - 0.46, q["phase_word"], ha="center", va="center",
                fontsize=17, fontweight="bold", color="white")
        ax.text(x + W / 2, TOP - 1.00, f'{q["id"]}  ·  {q["name"]}',
                ha="center", va="center", fontsize=8.4, color="#E2E8F0")

        # The three slide lines.
        body_y = TOP - 1.55
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
        cy = TOP - 4.28
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
    sy = 1.55
    ax.add_patch(FancyBboxPatch(
        (X0, sy - 0.55), 15.5, 1.10, boxstyle="round,pad=0.02,rounding_size=0.10",
        facecolor=NAVY, edgecolor="none"))
    for i, s in enumerate(Q.STORY_ARC):
        cx = X0 + 0.55 + i * 3.85
        ax.text(cx, sy + 0.16, f'{s["quarter"]}  {s["verb"]}', fontsize=11.5,
                fontweight="bold", color="white", va="center")
        ax.text(cx, sy - 0.30, s["phrase"][:44], fontsize=8.6, color="#93C5FD",
                va="center")

    ax.text(0.25, 0.62, "Every expense answers one question:", fontsize=10.5,
            color=SLATE, va="center")
    ax.text(0.25, 0.22, Q.MILESTONE_QUESTION, fontsize=13, fontweight="bold",
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

        for ln in _wrap(q["objective"], 62):
            ax.text(0.35, 11.10, ln, fontsize=9.4, color="#334155", va="top")
        ax.text(0.35, 10.30, "OBJECTIVE", fontsize=7.8, color=SLATE,
                va="center", fontweight="bold")

        y = 9.72
        for label, items in q["workstreams"]:
            ax.add_patch(Rectangle((0.35, y - 0.02), 0.09, 0.30, facecolor=col,
                                   edgecolor="none"))
            ax.text(0.60, y + 0.13, label.upper(), fontsize=9.2,
                    fontweight="bold", color=NAVY, va="center")
            y -= 0.38
            for it in items:
                ax.text(0.62, y, "·", fontsize=9, color=GREY, va="center")
                ax.text(0.85, y, it, fontsize=8.9, color="#334155", va="center")
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
    fig, ax = plt.subplots(figsize=(15.0, 8.6))

    lines = Q.BUDGET
    n = len(lines)
    y = np.arange(n)[::-1]
    h = 0.19

    for qi in range(4):
        vals = [b["q"][qi] / 1000 for b in lines]
        off = (1.5 - qi) * h
        ax.barh(y + off, vals, height=h, color=QCOL[f"Q{qi + 1}"],
                edgecolor="white", linewidth=0.8, label=f"Q{qi + 1}")

    # Row totals, and the grand total.
    for i, b in enumerate(lines):
        tot = sum(b["q"])
        ax.text(tot / 1000 + 4, y[i], f"{tot / 1000:,.0f}K", va="center",
                fontsize=9.6, fontweight="bold", color=NAVY)

    ax.set_yticks(y)
    ax.set_yticklabels([b["name"] for b in lines], fontsize=9.6, color="#1E293B")
    ax.set_xlabel("rupees, in thousands")
    ax.set_xlim(0, 330)
    ax.set_xticks(range(0, 331, 50))
    ax.xaxis.set_major_formatter(
        matplotlib.ticker.FuncFormatter(lambda v, p: f"{v:,.0f}K"))
    ax.grid(axis="y", visible=False)
    ax.legend(loc="lower right", fontsize=9.6, ncol=4, title="Quarter",
              title_fontsize=9.6)

    # The shape of the year, annotated.
    q1_tech = lines[0]["q"][0] / sum(lines[0]["q"])
    q4_research = lines[1]["q"][3] / sum(lines[1]["q"])
    ax.annotate("Q1 is development-heavy:\ntechnology is the whole quarter",
                xy=(95, y[0] + 0.10), xytext=(150, y[0] + 1.35),
                fontsize=9, color=TEAL, fontweight="bold",
                arrowprops=dict(arrowstyle="->", color=TEAL, linewidth=1.4))
    ax.annotate("Q4 is market-heavy:\nresearch is 40% of that line",
                xy=(42, y[1] - 0.24), xytext=(120, y[1] - 1.35),
                fontsize=9, color=NAVY, fontweight="bold",
                arrowprops=dict(arrowstyle="->", color=NAVY, linewidth=1.4))

    ax.set_title("Where the Rs 6,00,000 Goes",
                 fontsize=15, fontweight="bold", color=NAVY, pad=16)
    fig.text(0.5, 0.915,
             "Seven lines, four quarters. The row totals reconcile to the "
             "stated category totals and the grand total of Rs 6,00,000.",
             ha="center", fontsize=10.5, color=SLATE)
    _prov(fig, y=0.004)
    fig.tight_layout(rect=[0, 0.045, 1, 0.90])
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
    order = np.argsort(totals)[::-1]
    y = np.arange(len(lines))[::-1]
    for i in order:
        ax1.barh(y[list(order).index(i)], totals[i] / 1000, height=0.62,
                 color=BCOL[names[i]], edgecolor="white", linewidth=1.0)
    ax1.set_yticks(y)
    ax1.set_yticklabels([names[i] for i in order], fontsize=9.0,
                        color="#1E293B")
    for i, v in zip(order, totals):
        ax1.text(v / 1000 + 5, y[list(order).index(i)],
                 f"{v / 1000:,.0f}K  ({v / Q.BUDGET_TOTAL:.0%})",
                 va="center", fontsize=9.2, fontweight="bold", color=NAVY)
    ax1.set_xlim(0, 400)
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
        ax2b.text(xi, v + 14, f"{v:,.0f}K", ha="center", fontsize=9.4,
                  fontweight="bold", color=AMBER)
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
             "7% of the ask in Q1 to 27% in Q4. Contingency is a controlled "
             f"reserve at {Q.contingency_share():.1%}.",
             ha="center", fontsize=10.3, color=SLATE)
    _prov(fig, y=0.004)
    fig.tight_layout(rect=[0, 0.05, 1, 0.915])
    _save(fig, "q_04_budget_shape")


# ==========================================================================
# 5. Inside the technology budget
# ==========================================================================
def chart_tech_budget():
    fig, ax = plt.subplots(figsize=(14.6, 7.4))
    ax.set_xlim(0, 15.0)
    ax.set_ylim(0, 7.9)
    ax.axis("off")
    ax.grid(False)

    ax.text(0.25, 7.45, "INSIDE THE Rs 3,00,000 TECHNOLOGY LINE", fontsize=15,
            fontweight="bold", color=NAVY, va="center")
    ax.text(0.25, 7.02, "Half the entire envelope, and the line that has to "
            "carry the most scrutiny.", fontsize=10.4, color=SLATE, va="center")

    W = 3.52
    GAP = 0.30
    X0 = 0.30
    TOP = 6.30

    for i, t in enumerate(Q.TECH_BUDGET):
        x = X0 + i * (W + GAP)
        col = QCOL[t["quarter"]]

        ax.add_patch(FancyBboxPatch(
            (x, TOP - 1.15), W, 1.15, boxstyle="round,pad=0.02,rounding_size=0.10",
            facecolor=col, edgecolor="none"))
        ax.text(x + 0.28, TOP - 0.40, t["quarter"], fontsize=11.5,
                fontweight="bold", color="white", va="center")
        ax.text(x + W - 0.28, TOP - 0.40, Q.short(t["amount"]), fontsize=15,
                fontweight="bold", color="white", va="center", ha="right")
        ax.text(x + 0.28, TOP - 0.86, Q.TECH_BUDGET[i].get("label", "") or
                ["Core build", "Ecosystem modules", "Pilot hardening",
                 "Production"][i], fontsize=9.2, color="#E2E8F0", va="center")

        y = TOP - 1.52
        for it in t["items"]:
            ax.add_patch(FancyBboxPatch(
                (x, y - 0.50), W, 0.58, boxstyle="round,pad=0.02,rounding_size=0.07",
                facecolor="#F8FAFC", edgecolor="#E2E8F0", linewidth=1.0))
            ax.add_patch(Rectangle((x, y - 0.50), 0.07, 0.58, facecolor=col,
                                   edgecolor="none"))
            ax.text(x + 0.22, y - 0.21, it, ha="left", va="center",
                    fontsize=9.5, color="#1E293B")
            y -= 0.66

        if i < 3:
            ax.add_patch(FancyArrowPatch(
                (x + W + 0.04, TOP - 0.58), (x + W + GAP - 0.04, TOP - 0.58),
                arrowstyle="-|>", mutation_scale=14, color="#CBD5E1",
                linewidth=2.0, shrinkA=0, shrinkB=0))

    # The rule, in a box at the bottom.
    ax.add_patch(FancyBboxPatch(
        (0.30, 0.42), 14.40, 1.12, boxstyle="round,pad=0.02,rounding_size=0.10",
        facecolor="#FEF3C7", edgecolor=AMBER, linewidth=1.8))
    ax.text(0.62, 1.30, "THE RULE", fontsize=8.6, fontweight="bold",
            color=AMBER, va="center")
    ax.text(0.62, 0.90, "Do not write invented vendor costs.", fontsize=12.5,
            fontweight="bold", color="#7C2D12", va="center")
    ax.text(0.62, 0.58, "Obtain actual quotations and estimates, and use "
            "those as the evidence.", fontsize=10.2, color="#7C2D12",
            va="center")

    _save(fig, "q_05_tech_budget")


# ==========================================================================
# 6. The funding evidence checklist
# ==========================================================================
def chart_funding_evidence():
    fig, ax = plt.subplots(figsize=(15.0, 8.8))
    ax.set_xlim(0, 16.0)
    ax.set_ylim(0, 10.2)
    ax.axis("off")
    ax.grid(False)

    ax.text(0.30, 9.80, "HOW WE PROVE EVERY RUPEE", fontsize=15,
            fontweight="bold", color=NAVY, va="center")
    ax.text(0.30, 9.36, "For every line in the budget, the artefact that "
            "would substantiate it. None of them exists yet.",
            fontsize=10.4, color=SLATE, va="center")

    # Column headers.
    ax.text(0.35, 8.92, "BUDGET LINE", fontsize=8.8, fontweight="bold",
            color=NAVY, va="center")
    ax.text(4.35, 8.92, "AMOUNT", fontsize=8.8, fontweight="bold", color=NAVY,
            va="center", ha="right")
    ax.text(4.85, 8.92, "EVIDENCE REQUIRED", fontsize=8.8, fontweight="bold",
            color=NAVY, va="center")
    ax.text(15.55, 8.92, "STATUS", fontsize=8.8, fontweight="bold", color=NAVY,
            va="center", ha="right")
    ax.add_patch(Rectangle((0.30, 8.72), 15.40, 0.035, facecolor="#CBD5E1",
                           edgecolor="none"))

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

    y = 8.28
    for ev in Q.FUNDING_EVIDENCE:
        line = cat_to_line[ev["category"]]
        b = line_by_name[line]
        col = BCOL[line]
        n_art = len(ev["artefacts"])

        ax.add_patch(Rectangle((0.30, y - 0.40), 15.40, 0.92, facecolor="#F8FAFC",
                               edgecolor="#E2E8F0", linewidth=0.8))
        ax.add_patch(Rectangle((0.30, y - 0.40), 0.09, 0.92, facecolor=col,
                               edgecolor="none"))
        ax.text(0.55, y + 0.06, line, fontsize=9.6, color="#1E293B", va="center",
                fontweight="bold")
        ax.text(4.35, y + 0.06, Q.short(sum(b["q"])), fontsize=9.6,
                color=NAVY, va="center", ha="right", fontweight="bold")

        # The artefacts, as small chips.
        cx = 4.95
        for art in ev["artefacts"]:
            w = 0.082 * len(art) + 0.32
            ax.add_patch(FancyBboxPatch(
                (cx, y - 0.24), w, 0.40,
                boxstyle="round,pad=0.02,rounding_size=0.05",
                facecolor="white", edgecolor="#CBD5E1", linewidth=0.9))
            ax.text(cx + w / 2, y - 0.04, art, fontsize=8.0, color="#475569",
                    va="center", ha="center")
            cx += w + 0.16

        ax.text(15.55, y + 0.06, "0 obtained", fontsize=9.0, color=AMBER,
                va="center", ha="right", fontweight="bold")
        y -= 1.02

    ax.add_patch(FancyBboxPatch(
        (0.30, 0.30), 15.40, 0.86, boxstyle="round,pad=0.02,rounding_size=0.08",
        facecolor="#FEF3C7", edgecolor=AMBER, linewidth=1.6))
    ax.text(0.62, 0.90, "Contingency is not extra money.", fontsize=11,
            fontweight="bold", color="#7C2D12", va="center")
    ax.text(0.62, 0.56, "It is a controlled reserve for essential unforeseen "
            "MVP/pilot requirements, subject to approval and funding rules.",
            fontsize=9.6, color="#7C2D12", va="center")

    _save(fig, "q_06_funding_evidence")


# ==========================================================================
# 7. Team and dependencies
# ==========================================================================
def chart_team_dependencies():
    fig, ax = plt.subplots(figsize=(14.8, 8.2))
    ax.set_xlim(0, 15.0)
    ax.set_ylim(0, 8.6)
    ax.axis("off")
    ax.grid(False)

    ax.text(0.30, 8.18, "THE TEAM FOR THE YEAR", fontsize=15, fontweight="bold",
            color=NAVY, va="center")
    ax.text(0.30, 7.76, "What we control on the left. What we depend on on "
            "the right.", fontsize=10.4, color=SLATE, va="center")

    # Divider.
    ax.add_patch(Rectangle((6.90, 0.60), 0.022, 6.72, facecolor="#CBD5E1",
                           edgecolor="none"))
    ax.text(3.60, 7.20, "CORE TEAM", fontsize=9.6, fontweight="bold",
            color=TEAL, va="center", ha="center")
    ax.text(10.90, 7.20, "EXTERNAL DEPENDENCIES", fontsize=9.6,
            fontweight="bold", color=NAVY, va="center", ha="center")

    # Core team cards.
    y = 6.62
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
        y -= 1.05

    # Dependencies.
    y = 6.62
    for d in Q.DEPENDENCIES:
        ax.add_patch(FancyBboxPatch(
            (7.25, y - 0.40), 7.45, 0.66,
            boxstyle="round,pad=0.02,rounding_size=0.09",
            facecolor=NAVY, edgecolor="none"))
        ax.text(7.60, y - 0.07, d, fontsize=10.2, color="white", va="center",
                fontweight="bold")
        y -= 0.88

    # The dependency that actually gates the plan.
    ax.add_patch(FancyBboxPatch(
        (7.25, 0.60), 7.45, 1.10,
        boxstyle="round,pad=0.02,rounding_size=0.08",
        facecolor="#FEF3C7", edgecolor=AMBER, linewidth=1.6))
    ax.text(7.55, 1.42, "The one that gates everything", fontsize=9.2,
            fontweight="bold", color=AMBER, va="center")
    ax.text(7.55, 1.02, "Pilot institutions. Q3 cannot start, and Q4 "
            "cannot be validated,", fontsize=8.8, color="#7C2D12", va="center")
    ax.text(7.55, 0.80, "without them. Secure them during Q2.",
            fontsize=8.8, color="#7C2D12", va="center")

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
        (0.30, 4.70), 14.80, 2.42,
        boxstyle="round,pad=0.02,rounding_size=0.10",
        facecolor="#F8FAFC", edgecolor="#E2E8F0", linewidth=1.2))
    ax.add_patch(Rectangle((0.30, 4.70), 0.10, 2.42, facecolor=NAVY,
                           edgecolor="none"))
    y = 6.72
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
