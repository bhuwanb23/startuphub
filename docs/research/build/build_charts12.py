#!/usr/bin/env python3
"""StartupHub Phase 12 - feature gap infographics.

Eight figures drawn from build/data_p12_gaps.py.

Chart 2 is the load-bearing one: it is the saturation test, and it is the
reason this phase lands on six differentiators instead of the thirteen the
predecessor phases proposed. Applying a 50% rule to reporting and analytics
removes capabilities that three separate gaps were leaning on.

Usage: python build/build_charts12.py
Output: _exports/charts/phase12/*.png
"""

import sys
from collections import Counter
from pathlib import Path

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt                                   # noqa: E402
from matplotlib.patches import FancyArrowPatch, Patch, Rectangle   # noqa: E402
import matplotlib.ticker as mticker                              # noqa: E402
import numpy as np                                                # noqa: E402

sys.path.insert(0, str(Path(__file__).resolve().parent))
import data_p12_gaps as G                                         # noqa: E402
import data_p10_matrix as M                                       # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "_exports" / "charts" / "phase12"

NAVY, TEAL, RED, AMBER, SLATE = "#1E3A5F", "#0F766E", "#B91C1C", "#B45309", "#64748B"
PURPLE, GREEN, PINK, GREY = "#6D28D9", "#15803D", "#BE185D", "#94A3B8"
DPI = 200

plt.rcParams.update({
    "font.family": "DejaVu Sans", "font.size": 10,
    "axes.titlesize": 13.5, "axes.titleweight": "bold", "axes.titlecolor": NAVY,
    "axes.labelsize": 10, "axes.labelcolor": "#334155",
    "axes.edgecolor": "#CBD5E1", "axes.grid": True, "grid.color": "#E2E8F0",
    "grid.linewidth": 0.8, "axes.axisbelow": True,
    "figure.facecolor": "white", "axes.facecolor": "white", "legend.frameon": False,
})

ROWS = G.ROWS
COV = G.coverage_rows()
DIFFS = {d["n"]: d for d in G.DIFFERENTIATORS}
S = G.summary()

V_COL = {"SURVIVES": GREEN, "NARROWED": AMBER, "CONTESTED": PURPLE,
         "RETIRED": RED, "SURVIVES_AS_REQUIREMENT": TEAL}
TRIAGE_COL = {"EVIDENCED": GREEN, "DEFERRED": GREY, "SATURATED": SLATE,
              "CONTRADICTED": RED, "NEEDS_PRIMARY": PURPLE}


def _save(fig, name):
    OUT.mkdir(parents=True, exist_ok=True)
    p = OUT / f"{name}.png"
    fig.savefig(p, dpi=DPI, bbox_inches="tight", facecolor="white")
    plt.close(fig)
    print(f"  png   {p.relative_to(ROOT)}  ({p.stat().st_size // 1024} KB)")


# ==========================================================================
# 1. The saturation test - Rule 1 applied
# ==========================================================================
def chart_saturation():
    cov = M.dimension_coverage(ROWS)
    rows = []
    for c in cov:
        n = len(ROWS)
        share = (c["n_native"] + c["n_differentiator"]) / n
        rows.append((c["label"], share, share >= G.SATURATION_THRESHOLD))
    rows.sort(key=lambda r: r[1])

    fig, ax = plt.subplots(figsize=(13.4, 7.4))
    y = np.arange(len(rows))
    vals = [r[1] for r in rows]
    cols = [RED if r[2] else GREEN for r in rows]

    ax.barh(y, vals, color=cols, height=0.66, edgecolor="white")
    ax.axvline(G.SATURATION_THRESHOLD, color=NAVY, linewidth=2.4, linestyle="--")
    ax.text(G.SATURATION_THRESHOLD + 0.02, len(rows) - 1.2,
            f"{int(G.SATURATION_THRESHOLD*100)}% saturation line\n"
            "anything right of this CANNOT be a differentiator",
            fontsize=10, color=NAVY, fontweight="bold", va="bottom")

    for i, (lab, v, sat) in enumerate(rows):
        n_hold = round(v * len(ROWS))
        ax.text(v + 0.012, i, f"{n_hold}/{len(ROWS)}   {v*100:.0f}%",
                va="center", fontsize=9,
                fontweight="bold" if sat else "normal",
                color=RED if sat else "#334155")

    ax.set_yticks(y)
    ax.set_yticklabels([r[0] for r in rows], fontsize=9.6)
    ax.set_xlim(0, 1.18)
    ax.xaxis.set_major_formatter(mticker.PercentFormatter(1.0))
    ax.set_xlabel("vendors building this natively or better")
    ax.set_title("The Saturation Test - Why This Phase Lands On Six, Not Thirteen\n"
                 "Five capabilities are already at or above half the market. Reporting "
                 "and analytics are near-universal.\nRetiring them is what makes the "
                 "remaining gaps visible.",
                 pad=14)
    _save(fig, "p12_01_saturation_test")


# ==========================================================================
# 2. Gap scorecard - what changed since Phase 10
# ==========================================================================
def chart_gap_scorecard():
    gaps = sorted(G.GAP_SCORECARD, key=lambda g: (G.SATURATION_THRESHOLD,))
    labels = [f'{g["id"]}  {g["title"][:44]}' for g in gaps]
    y = np.arange(len(gaps))

    fig, ax = plt.subplots(figsize=(14.0, 7.6))
    for i, g in enumerate(gaps):
        col = V_COL[g["verdict"]]
        ax.barh(i, 0.30, color=col, height=0.62, edgecolor="white")
        ax.text(0.33, i, g["verdict"].replace("_", " "), va="center",
                fontsize=9.2, fontweight="bold", color=col)
        if g.get("holders") is not None:
            n = g["holders"]
            ax.text(2.35, i, f"{n}/{len(ROWS)} vendors hold it", va="center",
                    fontsize=9, color="#334155")
        else:
            ax.text(2.35, i, "not measurable in the matrix", va="center",
                    fontsize=9, color=RED, style="italic")

    ax.set_yticks(y)
    ax.set_yticklabels(labels, fontsize=9)
    ax.set_xlim(0, 6.2)
    ax.set_xticks([])
    ax.set_ylim(-0.8, len(gaps) - 0.2)
    ax.grid(False)
    ax.legend(handles=[
        Patch(color=GREEN, label="SURVIVES - still real"),
        Patch(color=AMBER, label="NARROWED - smaller than it was"),
        Patch(color=PURPLE, label="CONTESTED - new entrants, no proof"),
        Patch(color=TEAL, label="SURVIVES AS REQUIREMENT - not a feature"),
        Patch(color=RED, label="RETIRED - saturated or falsified"),
    ], fontsize=9.4, ncol=3, loc="lower right")

    ax.set_title("All 13 Gaps, Re-Scored Against 40 Vendors\n"
                 f"{S['gaps_surviving']} survive · {S['gaps_narrowed']} narrowed · "
                 f"{S['gaps_contested']} contested · {S['gaps_retired']} retired or "
                 "reclassified as packaging.\nGAP-03 was 'the highest-value and "
                 "most-defensible gap in the category' three phases ago.",
                 pad=14, loc="left")
    _save(fig, "p12_02_gap_scorecard")


# ==========================================================================
# 3. The differentiator landscape - 6 x 40
# ==========================================================================
def chart_differentiator_landscape():
    order = sorted(COV, key=lambda c: -c["differentiators_held"])
    names = [c["vendor"] for c in order][:22]

    fig, ax = plt.subplots(figsize=(13.6, 8.6))
    grid = np.array([[c[f"d{n}"] for n in range(1, 7)] for c in order[:22]])

    cmap = matplotlib.colors.LinearSegmentedColormap.from_list(
        "d12", ["#F1F5F9", "#BAE6FD", "#0F766E", "#B45309"])
    im = ax.imshow(grid, cmap=cmap, aspect="auto", vmin=0, vmax=3)

    for i in range(len(names)):
        for j in range(6):
            v = grid[i, j]
            ax.text(j, i, "●" if v >= 2 else ("◐" if v == 1 else "·"),
                    ha="center", va="center", fontsize=13,
                    color="white" if v >= 2 else ("#7DD3FC" if v == 1 else "#CBD5E1"))

    ax.set_xticks(range(6))
    ax.set_xticklabels([f"D{n}\n{DIFFS[n]['name'].split(',')[0][:26]}"
                        for n in range(1, 7)], fontsize=8.6)
    ax.set_yticks(range(len(names)))
    ax.set_yticklabels(names, fontsize=9)
    ax.set_xticks(np.arange(-.5, 6, 1), minor=True)
    ax.set_yticks(np.arange(-.5, len(names), 1), minor=True)
    ax.grid(which="minor", color="white", linewidth=1.6)
    ax.grid(which="major", visible=False)

    cb = fig.colorbar(im, ax=ax, fraction=0.02, pad=0.015, ticks=[0, 1, 2, 3])
    cb.ax.set_yticklabels(["absent", "partial", "native", "differentiator"], fontsize=8)
    cb.ax.tick_params(labelsize=8)

    ax.set_title("Which Of The Six Does Each Vendor Already Have\n"
                 f"Shown: the {len(names)} vendors with the most. "
                 f"{S['vendors_holding_any']} of {S['vendors']} hold at least one; "
                 f"{S['vendors_holding_two']} hold two or more.\n"
                 "D3, D4, D5 and D6 read as empty because no vendor evidences them at "
                 "all - which is the opportunity and the risk.",
                 pad=14)
    _save(fig, "p12_03_differentiator_landscape")


# ==========================================================================
# 4. Contested vs uncontested
# ==========================================================================
def chart_contested():
    fig, ax = plt.subplots(figsize=(12.8, 6.6))

    rows = []
    for n, d in DIFFS.items():
        held = len(d["contested_by"])
        rows.append((d["name"], held, [h for h in d["contested_by"]]))
    rows.sort(key=lambda r: r[1])

    y = np.arange(len(rows))
    vals = [r[1] for r in rows]
    cols = [RED if v > 0 else GREEN for v in vals]

    ax.barh(y, vals, color=cols, height=0.58, edgecolor="white")
    for i, (name, v, who) in enumerate(rows):
        ax.text(v + 0.25, i,
                ("UNCONTESTED - nobody in 40 vendors builds this" if v == 0
                 else ", ".join(who)),
                va="center", fontsize=8.8,
                fontweight="bold" if v == 0 else "normal",
                color=GREEN if v == 0 else "#334155")

    ax.set_yticks(y)
    ax.set_yticklabels([r[0][:46] for r in rows], fontsize=9.4)
    ax.set_xlim(0, 12.5)
    ax.set_xlabel("vendors already holding this differentiator (of 40)")
    ax.set_title("Four Of Six Differentiators Are Uncontested\n"
                 "Uncontested cuts both ways: it means nobody thinks it is worth "
                 "building, and nobody has proven it wrong.\n"
                 "That is the honest place to stand - and exactly where the 0 "
                 "interviews we have not run would tell us whether it is an opening "
                 "or a trap.",
                 pad=14)
    _save(fig, "p12_04_contested_vs_uncontested")


# ==========================================================================
# 5. features.md triage - all 46 sections
# ==========================================================================
def chart_features_triage():
    feats = G.FEATURES_MAP
    order = {"EVIDENCED": 0, "NEEDS_PRIMARY": 1, "CONTRADICTED": 2,
             "DEFERRED": 3, "SATURATED": 4}
    feats = sorted(feats, key=lambda f: order[f[2]])

    fig, ax = plt.subplots(figsize=(13.2, 9.4))
    y = np.arange(len(feats))
    for i, (num, name, verdict, _) in enumerate(feats):
        ax.barh(i, 1.0, color=TRIAGE_COL[verdict], height=0.7, edgecolor="white")
        ax.text(0.12, i, f"{num}.  {name[:52]}", va="center", fontsize=8.6,
                color="white", fontweight="bold")
        ax.text(1.10, i, verdict, va="center", fontsize=8,
                color=TRIAGE_COL[verdict], fontweight="bold")

    ax.set_yticks(y)
    ax.set_yticklabels([])
    ax.set_xlim(0, 3.1)
    ax.set_xticks([])
    ax.invert_yaxis()
    ax.grid(False)

    vc = Counter(f[2] for f in G.FEATURES_MAP)
    handles = [Patch(color=TRIAGE_COL[k], label=f"{k} - {vc[k]}") for k in order]
    ax.legend(handles=handles, fontsize=9.6, ncol=5, loc="lower right")

    ax.set_title("docs/features.md - All 46 Sections, Triaged Against The Evidence\n"
                 f"{vc['EVIDENCED']} evidenced · {vc['SATURATED']} already built by "
                 f"competitors · {vc['CONTRADICTED']} cut against by Phase 11 · "
                 f"{vc['DEFERRED']} deferred · {vc['NEEDS_PRIMARY']} cannot be decided "
                 "without interviews.\n"
                 "Nothing was silently dropped. A 46-section vision is a reasonable "
                 "target and an unreasonable v1.",
                 pad=14)
    _save(fig, "p12_05_features_triage")


# ==========================================================================
# 6. Module triage - 12 modules
# ==========================================================================
def chart_module_triage():
    mods = G.MODULES_MAP
    y = np.arange(len(mods))
    fig, ax = plt.subplots(figsize=(12.6, 6.4))

    for i, (name, verdict, why, when) in enumerate(mods):
        col = TRIAGE_COL[verdict]
        ax.barh(i, 1.0, color=col, height=0.62, edgecolor="white")
        ax.text(0.10, i + 0.14, name, va="center", fontsize=10,
                color="white", fontweight="bold")
        ax.text(0.10, i - 0.16, verdict, va="center", fontsize=8,
                color="white")
        ax.text(1.10, i, f"{when:<22}", va="center", fontsize=8.8,
                fontweight="bold", color=col)
        ax.text(2.55, i, why, va="center", fontsize=8.4, color="#334155")

    ax.set_yticks(y)
    ax.set_yticklabels([])
    ax.set_xlim(0, 6.6)
    ax.set_xticks([])
    ax.invert_yaxis()
    ax.grid(False)
    ax.set_title("The 12 Modules, Placed\n"
                 "Five are v1 core. Three are parity requirements - build them well, "
                 "never sell them. Four are v3+.\n"
                 "One, the Intelligence Layer, is allowed only as internal "
                 "infrastructure and never as positioning.",
                 pad=14)
    _save(fig, "p12_06_module_triage")


# ==========================================================================
# 7. The honesty chart - evidence A vs evidence U
# ==========================================================================
def chart_evidence_honesty():
    fig, ax = plt.subplots(figsize=(13.0, 6.4))

    y = np.arange(1, 7)
    a_scores = []
    u_scores = []
    for n in range(1, 7):
        d = DIFFS[n]
        a = d["confidence"].startswith("HIGH")
        u = "STRONG" in d["evidence_u"] or d["evidence_u"].startswith("MODERATE")
        a_scores.append(3 if a else 2)
        u_scores.append(3 if u else (2 if d["evidence_u"].startswith("None directly")
                                     else 1))

    ax.barh(y + 0.19, a_scores, height=0.36, color=NAVY, edgecolor="white",
            label="A - competitor absence, measured across 40 vendors")
    ax.barh(y - 0.19, u_scores, height=0.36, color=AMBER, edgecolor="white",
            label="U - user voice, Phase 11's 24 usable records")

    for i, n in enumerate(range(1, 7)):
        ax.text(a_scores[i] + 0.08, y[i] + 0.19, "strong", va="center",
                fontsize=8.6, color=NAVY, fontweight="bold")
        ax.text(u_scores[i] + 0.08, y[i] - 0.19,
                "present" if u_scores[i] == 3 else
                "weak" if u_scores[i] == 2 else "NONE",
                va="center", fontsize=8.6,
                color=AMBER if u_scores[i] == 2 else RED,
                fontweight="bold")

    ax.set_yticks(y)
    ax.set_yticklabels([f"D{n}" for n in range(1, 7)], fontsize=12,
                       fontweight="bold")
    ax.set_xlim(0, 4.1)
    ax.set_xticks([])
    ax.invert_yaxis()
    ax.grid(False)
    ax.legend(fontsize=9.6, loc="lower right")
    ax.set_title("The Honest Picture: Five Of Six Have No User Demand Behind Them\n"
                 "Competitor absence is measured and strong. User demand rests on 24 "
                 "retrieved review records - none of them from an Indian university.\n"
                 "No differentiator below may be published as 'users asked for this'. "
                 "They are published as 'nobody builds this, and we think they should'.",
                 pad=14)
    _save(fig, "p12_07_evidence_honesty")


# ==========================================================================
# 8. How we win a contested gap
# ==========================================================================
def chart_how_we_win():
    fig, ax = plt.subplots(figsize=(13.2, 6.6))

    strategies = G.WIN_STRATEGIES
    cells = np.zeros((6, len(strategies)))
    for j, s in enumerate(strategies):
        for i in s["applies_to"]:
            if 1 <= i <= 6:
                cells[i - 1, j] = 1

    ax.imshow(cells, cmap=matplotlib.colors.ListedColormap(["#F1F5F9", "#0F766E"]),
              aspect="auto", vmin=0, vmax=1)

    for i in range(6):
        for j in range(len(strategies)):
            ax.text(j, i, "●" if cells[i, j] else "", ha="center", va="center",
                    fontsize=15, color="white")

    ax.set_xticks(range(len(strategies)))
    ax.set_xticklabels([s["strategy"] for s in strategies], rotation=22,
                       ha="right", fontsize=10, fontweight="bold")
    ax.set_yticks(range(6))
    ax.set_yticklabels([f"D{n}\n{DIFFS[n]['name'].split(',')[0][:34]}"
                        for n in range(1, 7)], fontsize=8.6)
    ax.set_xticks(np.arange(-.5, len(strategies), 1), minor=True)
    ax.set_yticks(np.arange(-.5, 6, 1), minor=True)
    ax.grid(which="minor", color="white", linewidth=2)
    ax.grid(which="major", visible=False)

    ax.set_title("How We Actually Win A Gap That Has Entrants\n"
                 "Three differentiators are uncontested, which invites the reasonable "
                 "objection that they are uncontested for a reason.\n"
                 "These are the five answers, and they are operational - not claims.",
                 pad=14)
    _save(fig, "p12_08_how_we_win")


def main():
    print("Phase 12 charts")
    chart_saturation()
    chart_gap_scorecard()
    chart_differentiator_landscape()
    chart_contested()
    chart_features_triage()
    chart_module_triage()
    chart_evidence_honesty()
    chart_how_we_win()
    print(f"  8 charts -> {OUT}")


if __name__ == "__main__":
    main()