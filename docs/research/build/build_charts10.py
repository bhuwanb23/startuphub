#!/usr/bin/env python3
"""StartupHub Phase 10 - competitor matrix infographics.

Eight figures, all drawn from build/data_p10_matrix.py.

Usage: python build/build_charts10.py
Output: _exports/charts/phase10/*.png
"""

import sys
from pathlib import Path

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt                                   # noqa: E402
from matplotlib.patches import Patch, Rectangle                   # noqa: E402
import matplotlib.ticker as mticker                              # noqa: E402
import numpy as np                                                # noqa: E402

sys.path.insert(0, str(Path(__file__).resolve().parent))
import data_p10_matrix as M                                       # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "_exports" / "charts" / "phase10"

NAVY, TEAL, RED, AMBER, SLATE = "#1E3A5F", "#0F766E", "#B91C1C", "#B45309", "#64748B"
PURPLE, GREEN, PINK, GREY = "#6D28D9", "#15803D", "#BE185D", "#94A3B8"
POS = {"VERIFIED": GREEN, "PROVEN": TEAL, "PARTIAL": AMBER, "UNPROVEN": GREY}
DPI = 200

plt.rcParams.update({
    "font.family": "DejaVu Sans", "font.size": 10,
    "axes.titlesize": 13.5, "axes.titleweight": "bold", "axes.titlecolor": NAVY,
    "axes.labelsize": 10, "axes.labelcolor": "#334155",
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


ROWS = M.build_rows()
DIMS = M.DIMENSIONS


# ==========================================================================
# 1. The capability heatmap - 36 x 15
# ==========================================================================
def chart_heatmap():
    rows = sorted(ROWS, key=lambda r: (-M.breadth(r), r["competitor"]))
    mat = np.array([[(4 if r[k] == "U" else r[k]) for k, _, _, _ in DIMS] for r in rows],
                   dtype=float)

    fig, ax = plt.subplots(figsize=(14, 13))
    cmap = matplotlib.colors.ListedColormap(
        ["#F1F5F9", "#FDE68A", "#60A5FA", "#1D4ED8", "#CBD5E1"])
    ax.imshow(mat, aspect="auto", cmap=cmap, vmin=-0.5, vmax=4.5)

    ax.set_xticks(range(len(DIMS)))
    ax.set_xticklabels([d[1] for d in DIMS], rotation=45, ha="right", fontsize=9)
    ax.set_yticks(range(len(rows)))
    ax.set_yticklabels([r["competitor"][:26] for r in rows], fontsize=8.2)
    ax.set_xticks(np.arange(-.5, len(DIMS), 1), minor=True)
    ax.set_yticks(np.arange(-.5, len(rows), 1), minor=True)
    ax.grid(which="minor", color="white", linewidth=1.4)
    ax.tick_params(which="minor", length=0)
    ax.grid(False)

    for key, tag in (("trl", "GAP-02"), ("mandate", "GAP-03")):
        j = [k for k, _, _, _ in DIMS].index(key)
        ax.add_patch(Rectangle((j - .5, -.5), 1, len(rows), fill=False,
                               edgecolor=RED, lw=2.6, zorder=5))
        ax.text(j, -2.6, tag, ha="center", fontsize=8.4, color=RED, fontweight="bold")

    ax.set_title("Competitor Matrix — 36 vendors x 15 scored capabilities\n"
                 "Grey = UNKNOWN (not evidenced). It is not the same as absent.", pad=24)
    ax.legend(handles=[Patch(color=c, label=l) for c, l in
                       [("#FDE68A", "1 partial"), ("#60A5FA", "2 native"),
                        ("#1D4ED8", "3 differentiator"), ("#F1F5F9", "0 absent"),
                        ("#CBD5E1", "U unknown")]],
              loc="lower left", bbox_to_anchor=(0, -0.11), ncol=5, fontsize=9)
    _save(fig, "p10_01_matrix_heatmap")


# ==========================================================================
# 2. Dimension coverage - the white space
# ==========================================================================
def chart_coverage():
    cov = sorted(M.dimension_coverage(ROWS), key=lambda c: (c["n_native"] + c["n_differentiator"]))
    fig, ax = plt.subplots(figsize=(12.5, 7.6))
    y = np.arange(len(cov))
    n = cov[0]["n_total"]
    partial = [c["n_partial"] for c in cov]
    native = [c["n_native"] for c in cov]
    diff = [c["n_differentiator"] for c in cov]
    unknown = [c["n_unknown"] for c in cov]
    absent = [c["n_absent"] for c in cov]

    ax.barh(y, native, color="#1D4ED8", label="2 native", edgecolor="white")
    ax.barh(y, diff, left=native, color=NAVY, label="3 differentiator", edgecolor="white")
    ax.barh(y, partial, left=np.add(native, diff), color="#FDE68A",
            label="1 partial", edgecolor="white")
    ax.barh(y, absent, left=np.add(np.add(native, diff), partial), color="#F1F5F9",
            label="0 absent", edgecolor="white")
    ax.barh(y, unknown, left=np.add(np.add(np.add(native, diff), partial), absent),
            color="#CBD5E1", label="U unknown", edgecolor="white")

    ax.set_yticks(y)
    ax.set_yticklabels([c["label"] for c in cov], fontsize=9.4)
    for i, c in enumerate(cov):
        tag = "  ← added" if c["added_by_phase10"] else ""
        ax.text(n + 0.6, i, f"{c['n_native'] + c['n_differentiator']}/{n} implemented{tag}",
                va="center", fontsize=8.6, color="#334155", fontweight="bold")
    ax.set_xlabel(f"Vendors (of {n})")
    ax.set_title("Capability Coverage Across 36 Vendors\n"
                 "Sorted by how many actually build it. The bottom two are the defensible position.",
                 pad=14)
    ax.set_xlim(0, n + 7)
    ax.legend(loc="lower right", ncol=2, fontsize=8.6)
    _save(fig, "p10_02_dimension_coverage")


# ==========================================================================
# 3. Evidence honesty - unknown density and absence basis
# ==========================================================================
def chart_evidence_honesty():
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 7.4),
                                   gridspec_kw={"width_ratios": [1.15, 1]})

    rows = sorted(ROWS, key=lambda r: r["evidence_coverage"])
    y = np.arange(len(rows))
    cols = [POS[r["market_position"]] for r in rows]
    ax1.barh(y, [r["evidence_coverage"] for r in rows], color=cols,
             edgecolor="white", height=0.7)
    ax1.set_yticks(y)
    ax1.set_yticklabels([r["competitor"][:24] for r in rows], fontsize=7.6)
    ax1.set_xlabel("Evidence coverage (% of 15 cells actually known)")
    ax1.set_title("Evidence Coverage by Vendor\n"
                  "Colour = derived market position, not quality", pad=12)
    ax1.set_xlim(0, 108)
    ax1.axvline(100, color=SLATE, ls="--", lw=1)
    for i, r in enumerate(rows):
        if r["evidence_coverage"] < 50:
            ax1.text(r["evidence_coverage"] + 1.5, i, f"{r['evidence_coverage']:.0f}%",
                     va="center", fontsize=7.4, color=RED, fontweight="bold")

    # absence basis
    basis = {}
    for r in ROWS:
        basis[r["absence_basis"]] = basis.get(r["absence_basis"], 0) + 1
    keys = ["COMPLETE", "PARTIAL", "NONE"]
    vals = [basis.get(k, 0) for k in keys]
    cols2 = [TEAL, AMBER, "#E2E8F0"]
    b = ax2.bar(keys, vals, color=cols2, edgecolor="white", width=0.55)
    for i, v in enumerate(vals):
        ax2.text(i, v + 0.4, str(v), ha="center", fontsize=13, fontweight="bold", color="#334155")
    ax2.set_ylabel("Vendors")
    ax2.set_title("How Strong Are the Zero-Scores?\n"
                  "COMPLETE = vendor publishes a full feature list", pad=12)
    ax2.text(0.5, -0.16, "A zero on a PARTIAL list may mean undocumented,\n"
                          "not absent. The matrix refuses to conflate them.",
             transform=ax2.transAxes, ha="center", fontsize=8.8, color=SLATE,
             style="italic")
    ax2.set_ylim(0, max(vals) + 4)
    _save(fig, "p10_03_evidence_honesty")


# ==========================================================================
# 4. Market position - derived, evidence-ranked
# ==========================================================================
def chart_market_position():
    fig, ax = plt.subplots(figsize=(11.5, 7))
    order = ["VERIFIED", "PROVEN", "PARTIAL", "UNPROVEN"]
    counts = {p: len([r for r in ROWS if r["market_position"] == p]) for p in order}
    y = np.arange(len(order))
    ax.barh(y, [counts[p] for p in order], color=[POS[p] for p in order],
            edgecolor="white", height=0.6)
    for i, p in enumerate(order):
        ax.text(counts[p] + 0.4, i, str(counts[p]), va="center", fontsize=13,
                fontweight="bold", color="#334155")
    ax.set_yticks(y)
    ax.set_yticklabels(order, fontsize=11, fontweight="bold")
    ax.invert_yaxis()
    ax.set_xlabel("Vendors")
    ax.set_title("Derived Market Position — These Are EVIDENCE Tiers, Not Quality Tiers\n"
                 "23 of 36 vendors have no third-party proof of any kind", pad=14)
    ax.set_xlim(0, max(counts.values()) + 4)
    ax.text(0.5, -0.13, "A vendor can be UNPROVEN and still be excellent.\n"
                         "UNPROVEN means nobody outside the company has demonstrated it works.",
             transform=ax.transAxes, ha="center", fontsize=9, color=SLATE, style="italic")
    _save(fig, "p10_04_market_position")


# ==========================================================================
# 5. Capability breadth vs evidence quality
# ==========================================================================
def chart_breadth_vs_evidence():
    fig, ax = plt.subplots(figsize=(12, 7.6))
    for r in ROWS:
        ax.scatter(M.breadth(r), r["user_reviews"] or 0,
                   s=90 + (r["customers_n"] or 0) * 4,
                   color=POS[r["market_position"]], alpha=0.82,
                   edgecolor="white", linewidth=1.3, zorder=3)
    for r in ROWS:
        if r["evidence_grade"] in ("NAMED_REFERENCE",) or r["competitor"] in (
                "Accubate", "VentureLink", "Protrak (ProrIISe)", "EcoSync", "Inpart"):
            ax.annotate(r["competitor"][:20], (M.breadth(r), r["user_reviews"] or 0),
                        xytext=(7, 4), textcoords="offset points", fontsize=8,
                        color="#1E293B")
    ax.set_xlabel("Capability breadth (dimensions scoring 1 or more, of 15)")
    ax.set_ylabel("Third-party review count")
    ax.set_yscale("symlog")
    ax.set_title("Capability Breadth Is Not Evidence\n"
                 "Bubble size = named customers. The broad vendors with no reviews are the risk.",
                 pad=14)
    ax.legend(handles=[Patch(color=POS[p], label=p) for p in
                       ("VERIFIED", "PROVEN", "PARTIAL", "UNPROVEN")],
              loc="upper right", fontsize=9)
    ax.axvline(8, color=SLATE, ls="--", lw=1.2, alpha=0.7)
    ax.text(8.2, 0.4, "broad enough\nto be a threat", fontsize=8.6, color=SLATE)
    _save(fig, "p10_05_breadth_vs_evidence")


# ==========================================================================
# 6. India readiness
# ==========================================================================
def chart_india():
    fig, ax = plt.subplots(figsize=(12, 7))
    ind = [r for r in ROWS if r["country"] == "India"]
    glob = [r for r in ROWS if r["country"] != "India"]
    bins = np.arange(0, 16)
    ax.hist([M.breadth(r) for r in glob], bins=bins, color=PURPLE, alpha=0.62,
            label=f"Non-Indian vendors (n={len(glob)})")
    ax.hist([M.breadth(r) for r in ind], bins=bins, color=NAVY, alpha=0.78,
            label=f"Indian vendors (n={len(ind)})")
    ax.set_xlabel("Capability breadth (of 15)")
    ax.set_ylabel("Vendors")
    ax.set_title("Indian Vendors Compete on Breadth, Not Proof\n"
                 f"{len(ind)} Indian vendors; only one has a named institutional reference", pad=14)
    ax.legend(fontsize=9.5)
    ax.text(0.97, 0.93,
            f"Indian vendors: {len(ind)}\n"
            f"Named Indian university\n  reference (any category): 1\n"
            f"  ...and it is IP management,\n  not incubation",
            transform=ax.transAxes, ha="right", va="top", fontsize=8.8,
            bbox=dict(boxstyle="round", facecolor="#F8FAFC", edgecolor="#CBD5E1"))
    _save(fig, "p10_06_india_readiness")


# ==========================================================================
# 7. The scoring integrity chart
# ==========================================================================
def chart_scoring_integrity():
    fig, ax = plt.subplots(figsize=(11.5, 6.4))
    total = len(ROWS) * len(DIMS)
    absent = sum(1 for r in ROWS for k, _, _, _ in DIMS if r[k] == 0)
    unknown = sum(1 for r in ROWS for k, _, _, _ in DIMS if r[k] == "U")
    impl = total - absent - unknown
    segs = [("Absent (0)\nrequires an absence note", absent, "#F1F5F9"),
            ("Partial (1)", sum(1 for r in ROWS for k, _, _, _ in DIMS if r[k] == 1), "#FDE68A"),
            ("Native (2)", sum(1 for r in ROWS for k, _, _, _ in DIMS if r[k] == 2), "#60A5FA"),
            ("Differentiator (3)", sum(1 for r in ROWS for k, _, _, _ in DIMS if r[k] == 3), NAVY),
            ("UNKNOWN (U)\nnot the same as absent", unknown, "#CBD5E1")]
    left = 0
    for label, v, col in segs:
        ax.barh([0], [v], left=[left], color=col, edgecolor="white", height=0.42)
        if v > 12:
            ax.text(left + v / 2, 0, f"{v}\n{label}", ha="center", va="center",
                    fontsize=9, fontweight="bold", color="#334155")
        left += v
    ax.set_xlabel(f"Scored cells (of {total})")
    ax.set_yticks([])
    ax.set_title("How the Matrix Is Actually Filled\n"
                 f"{impl} implemented · {absent} evidenced absent · {unknown} unknown", pad=14)
    ax.text(0.5, -0.16, "Every 'absent' cell carries a written note in the absence_note column.\n"
                         "The build fails if a vendor scores 0 without one.",
             transform=ax.transAxes, ha="center", fontsize=9, color=SLATE, style="italic")
    _save(fig, "p10_07_scoring_integrity")


# ==========================================================================
# 8. Category field - what the market clusters on
# ==========================================================================
def chart_categories():
    fig, ax = plt.subplots(figsize=(12, 7))
    fields = {
        "Incubation\nprogramme ops": ["incubation", "startup_mgmt", "mentorship"],
        "Resource &\nspace": ["resource_mgmt"],
        "Capital\n& funding": ["funding", "investor_match"],
        "Corporate\n& market": ["corporate_match", "market_intel"],
        "IP &\ntechnology transfer": ["ipr", "trl"],
        "Intelligence\nlayer": ["analytics", "ai", "reporting", "integrations"],
        "Mandate\ncompliance": ["mandate"],
    }
    keys = list(fields)
    data = []
    for f in keys:
        vals = [r[k] for r in ROWS for k in fields[f] if r[k] != "U"]
        data.append((f, len(vals), sum(1 for v in vals if v >= 2) / len(vals) * 100 if vals else 0))
    data.sort(key=lambda x: x[2])
    y = np.arange(len(data))
    ax.barh(y, [d[2] for d in data],
            color=["#B91C1C" if d[2] < 20 else ("#B45309" if d[2] < 45 else TEAL)
                   for d in data], edgecolor="white", height=0.6)
    for i, d in enumerate(data):
        ax.text(d[2] + 1.5, i, f"{d[2]:.0f}% native-or-better of {d[1]} known cells",
                va="center", fontsize=8.8, color="#334155", fontweight="bold")
    ax.set_yticks(y)
    ax.set_yticklabels([d[0] for d in data], fontsize=9.4)
    ax.set_xlabel("% of known cells scoring native (2) or differentiator (3)")
    ax.set_xlim(0, 118)
    ax.set_ylim(-0.6, len(data) - 0.4)
    ax.set_title("What the Market Actually Competes On\n"
                 "Mandate compliance and technology transfer are the emptiest fields", pad=14)
    _save(fig, "p10_08_category_fields")


def main():
    print("Phase 10 charts")
    chart_heatmap()
    chart_coverage()
    chart_evidence_honesty()
    chart_market_position()
    chart_breadth_vs_evidence()
    chart_india()
    chart_scoring_integrity()
    chart_categories()
    print(f"\n8 charts -> {OUT}")
    return 0


if __name__ == "__main__":
    sys.exit(main())