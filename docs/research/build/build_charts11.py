#!/usr/bin/env python3
"""StartupHub Phase 11 - competitor user-review infographics.

Eight figures drawn from build/data_p11_reviews.py.

The charts here are doing something the earlier phases could not: several of
them are pictures of ABSENCE. Chart 1 is a grid that is mostly empty, chart 3
is a distribution with no dissent in it, and chart 8 is built from four rows.
That is deliberate. A chart that hid the emptiness would be more attractive
and less true.

Usage: python build/build_charts11.py
Output: _exports/charts/phase11/*.png
"""

import sys
from collections import Counter, defaultdict
from pathlib import Path

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt                                   # noqa: E402
from matplotlib.patches import Patch, Rectangle                   # noqa: E402
import matplotlib.ticker as mticker                              # noqa: E402
import numpy as np                                                # noqa: E402

sys.path.insert(0, str(Path(__file__).resolve().parent))
import data_p11_reviews as R                                      # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "_exports" / "charts" / "phase11"

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

USER = [g for g in R.GRADES if g[2] == "user"]
CLAIM = {"USER_REVIEW", "USER_INSTITUTIONAL", "USER_FORUM"}
BY_GRADE = Counter(r["grade"] for r in R.REVIEWS)
BY_VENDOR = Counter(r["vendor"] for r in R.REVIEWS)
CLAIM_VENDORS = sorted({r["vendor"] for r in R.REVIEWS if r["grade"] in CLAIM},
                       key=lambda v: -BY_VENDOR[v])
S = R.summarise()


def _save(fig, name):
    OUT.mkdir(parents=True, exist_ok=True)
    p = OUT / f"{name}.png"
    fig.savefig(p, dpi=DPI, bbox_inches="tight", facecolor="white")
    plt.close(fig)
    print(f"  png   {p.relative_to(ROOT)}  ({p.stat().st_size // 1024} KB)")


# ==========================================================================
# 1. The evidence desert - platform x vendor
# ==========================================================================
def chart_evidence_desert():
    plats = [p[0] for p in R.PLATFORMS]
    rows = defaultdict(dict)
    for r in R.REVIEWS:
        rows[r["vendor"]][r["platform"]] = rows[r["vendor"]].get(r["platform"], 0) + 1

    fig, ax = plt.subplots(figsize=(13.5, 6.2))
    grid = np.zeros((len(CLAIM_VENDORS), len(plats)))
    for i, v in enumerate(CLAIM_VENDORS):
        for j, p in enumerate(plats):
            grid[i, j] = rows[v].get(p, 0)

    cmap = matplotlib.colors.LinearSegmentedColormap.from_list(
        "p11", ["#F1F5F9", "#BAE6FD", "#0F766E"])
    im = ax.imshow(grid, cmap=cmap, aspect="auto", vmin=0, vmax=max(2, grid.max()))

    for i in range(len(CLAIM_VENDORS)):
        for j in range(len(plats)):
            val = grid[i, j]
            if val:
                ax.text(j, i, int(val), ha="center", va="center", fontsize=9.5,
                        fontweight="bold", color="white")
            else:
                ax.text(j, i, "·", ha="center", va="center", fontsize=9,
                        color="#CBD5E1")

    ax.set_xticks(range(len(plats)))
    ax.set_xticklabels([p.replace("_", " ").title() for p in plats],
                       rotation=32, ha="right", fontsize=8.6)
    ax.set_yticks(range(len(CLAIM_VENDORS)))
    ax.set_yticklabels(CLAIM_VENDORS, fontsize=9.5, fontweight="bold")
    ax.set_xticks(np.arange(-.5, len(plats), 1), minor=True)
    ax.set_yticks(np.arange(-.5, len(CLAIM_VENDORS), 1), minor=True)
    ax.grid(which="minor", color="white", linewidth=1.6)
    ax.grid(which="major", visible=False)
    ax.set_title("The Evidence Desert\n"
                 f"{len(CLAIM_VENDORS)} of 40 vendors have any user voice at all. "
                 f"Product Hunt, app stores and Google Reviews return nothing - "
                 f"this category is web B2B SaaS.",
                 pad=14)
    cb = fig.colorbar(im, ax=ax, fraction=0.022, pad=0.015)
    cb.set_label("reviews retrieved", fontsize=9)
    cb.ax.tick_params(labelsize=8)
    _save(fig, "p11_01_evidence_desert")


# ==========================================================================
# 2. Complaint taxonomy
# ==========================================================================
def chart_complaint_taxonomy():
    pains = [(c[0], c[1]) for c in R.PAIN_CATEGORIES]
    counts = Counter(r["pain"] for r in R.REVIEWS)
    order = sorted(pains, key=lambda x: -counts[x[0]])

    fig, ax = plt.subplots(figsize=(12.4, 6.6))
    y = np.arange(len(order))
    vals = [counts[p] for p, _ in order]
    cols = [GREY if p == "NO_COMPLAINT_RECORDED" else
            (TEAL if v >= 3 else AMBER if v >= 2 else SLATE)
            for p, (_, v) in zip([o[0] for o in order], zip(order, vals))]

    ax.barh(y, vals, color=cols, height=0.66, edgecolor="white")
    for i, v in enumerate(vals):
        ax.text(v + 0.12, i, str(v), va="center", fontsize=10, fontweight="bold",
                color="#334155")

    labels = [f"{p}\n{d}" for p, d in order]
    ax.set_yticks(y)
    ax.set_yticklabels(labels, fontsize=8.4)
    ax.invert_yaxis()
    ax.set_xlabel("reviews recording this pain")
    ax.set_xlim(0, max(vals) + 1.2)
    ax.set_title("What Users Actually Complain About\n"
                 "Grey is the mandatory 'no complaint recorded' bucket - silence is "
                 "recorded, not dropped. Dominance of FRAGMENTATION and INFORMATION_OVERLOAD\n"
                 "says buyers ask for less clutter and fewer hand-offs, not more features.",
                 pad=14)
    _save(fig, "p11_02_complaint_taxonomy")


# ==========================================================================
# 3. No dissent - rating distributions
# ==========================================================================
def chart_no_dissent():
    dists = R.RATING_DISTRIBUTIONS
    fig, ax = plt.subplots(figsize=(12.2, 6.4))

    labels = [f"{d['vendor']}\n{d['platform']}" for d in dists]
    y = np.arange(len(dists))
    cols = [GREEN, TEAL, SLATE, AMBER]
    fields = [("five", "5 star", GREEN), ("four", "4 star", TEAL),
              ("three", "3 star", AMBER), ("two", "2 star", "#F97316"),
              ("one", "1 star", RED)]

    left = np.zeros(len(dists))
    for key, lab, c in fields:
        vals = np.array([d[key] for d in dists], dtype=float)
        ax.barh(y, vals, left=left, color=c, label=lab, height=0.58,
                edgecolor="white")
        left += vals

    for i, d in enumerate(dists):
        low = d["three"] + d["two"] + d["one"]
        ax.text(d["total"] + 0.6, i,
                f"{d['total']} review{'' if d['total'] == 1 else 's'}   ·   "
                f"{low} at or below 3★",
                va="center", fontsize=9.6, fontweight="bold",
                color=RED if low else "#334155")

    ax.set_yticks(y)
    ax.set_yticklabels(labels, fontsize=10, fontweight="bold")
    ax.invert_yaxis()
    ax.set_xlim(0, max(left) * 1.42)
    ax.set_xlabel("reviews by star rating")
    ax.legend(ncol=5, fontsize=9.5, loc="lower right")
    ax.set_title("Nobody In This Category Complains\n"
                 "Every review base is 4-5 star only. There is not a single 1, 2 or 3 star "
                 "review recorded across 76 reviews.\n"
                 "The market's sharpest competitive tool is unavailable to us: nobody is "
                 "leaving over a bad experience.",
                 pad=14)
    _save(fig, "p11_03_no_dissent")


# ==========================================================================
# 4. Incentive-flagged reviews
# ==========================================================================
def chart_incentive():
    rows = [r for r in R.REVIEWS if r["platform"] in ("CAPTERRA", "SOFTWAREREVIEWS",
                                                      "SOFTWAREADVICE", "GETAPP")
            and r["grade"] == "USER_REVIEW"]
    by_vendor = defaultdict(lambda: [0, 0])
    for r in rows:
        by_vendor[r["vendor"]][0 if r["incentive"] else 1] += 1

    order = sorted(by_vendor.items(), key=lambda kv: -(kv[1][0] + kv[1][1]))
    fig, ax = plt.subplots(figsize=(11.6, 5.6))
    y = np.arange(len(order))
    inc = [v[0] for _, v in order]
    org = [v[1] for _, v in order]

    ax.barh(y, inc, color=RED, height=0.6, edgecolor="white",
            label="Vendor-incentivised (gift card / vendor-referred)")
    ax.barh(y, org, left=inc, color=GREEN, height=0.6, edgecolor="white",
            label="Unincentivised")

    for i, (_, (a, b)) in enumerate(order):
        tot = a + b
        ax.text(tot + 0.1, i, f"{a} of {tot} flagged" if a else f"{tot}, none flagged",
                va="center", fontsize=9.4, fontweight="bold",
                color=RED if a else "#334155")

    ax.set_yticks(y)
    ax.set_yticklabels([k for k, _ in order], fontsize=10, fontweight="bold")
    ax.invert_yaxis()
    ax.set_xlim(0, max(a + b for _, (a, b) in order) * 1.45)
    ax.set_xlabel("reviews retrieved per vendor")
    ax.legend(fontsize=9.5, loc="lower right")
    ax.set_title("A Material Share Of The Market's Reviews Were Bought\n"
                 "Directories print the incentive flag in the review body. Accubate's "
                 "26-review base - the only substantial one in the category -\n"
                 "carries it on several reviews. '26 reviews' is not 26 independent "
                 "endorsements.",
                 pad=14)
    _save(fig, "p11_04_incentive_flagged")


# ==========================================================================
# 5. The real incumbent - what people switched FROM
# ==========================================================================
def chart_real_incumbent():
    sw = Counter()
    for r in R.REVIEWS:
        if r["switched_from"]:
            sw[r["switched_from"]] += 1

    items = sw.most_common()
    labels = [k for k, _ in items]
    vals = [v for _, v in items]

    fig, ax = plt.subplots(figsize=(11.8, 5.4))
    y = np.arange(len(labels))
    cols = [AMBER if "form" in l.lower() or "sheet" in l.lower() or "spread" in l.lower()
            else SLATE for l in labels]
    ax.barh(y, vals, color=cols, height=0.6, edgecolor="white")
    for i, v in enumerate(vals):
        ax.text(v + 0.06, i, str(v), va="center", fontsize=11, fontweight="bold",
                color="#334155")
    ax.set_yticks(y)
    ax.set_yticklabels([l if len(l) < 46 else l[:44] + "…" for l in labels],
                       fontsize=10)
    ax.invert_yaxis()
    ax.set_xlim(0, max(vals) + 0.7)
    ax.set_xlabel("reviews naming this as the previous tool")
    ax.set_title("The Tool We Are Actually Competing With Is Free\n"
                 "Amber = spreadsheets, Google Forms or a similar free artefact. No named "
                 "vendor appears as a source\n"
                 "system in the retrieved switching field. StartupHub does not displace "
                 "AcceleratorApp - it displaces a shared drive.",
                 pad=14)
    _save(fig, "p11_05_real_incumbent")


# ==========================================================================
# 6. Evidence grade composition
# ==========================================================================
def chart_evidence_grades():
    fig, ax = plt.subplots(figsize=(12.2, 6.0))
    order = [g[0] for g in R.GRADES]
    counts = [BY_GRADE.get(g, 0) for g in order]
    usable = [g for g in order if g in CLAIM]
    cols = [TEAL if g in CLAIM else
            (AMBER if g == "SNIPPET" else GREY) for g in order]

    y = np.arange(len(order))
    ax.barh(y, counts, color=cols, height=0.62, edgecolor="white")
    for i, (g, c) in enumerate(zip(order, counts)):
        meta = next(x for x in R.GRADES if x[0] == g)
        tag = "user voice" if g in CLAIM else ("corroborating" if g == "SNIPPET" else "excluded")
        ax.text(c + 0.16, i, f"{c}   {tag}", va="center", fontsize=9.2,
                fontweight="bold" if g in CLAIM else "normal", color="#334155")

    ax.set_yticks(y)
    ax.set_yticklabels([f"{g}\n{next(x for x in R.GRADES if x[0]==g)[1]}"
                        for g in order], fontsize=8.6)
    ax.invert_yaxis()
    ax.set_xlim(0, max(counts) * 1.6)
    ax.set_xlabel("records in the corpus")
    ax.set_title("Most Of What A Review Search Returns Is Not User Voice\n"
                 "Teal grades may originate an opportunity claim. Amber corroborates. Grey "
                 "is recorded and excluded -\n"
                 "vendor marketing, vendor testimonials, directory editorials and the "
                 "aggregator echo of a vendor's own homepage copy.",
                 pad=14)
    _save(fig, "p11_06_evidence_grades")


# ==========================================================================
# 7. Vendor coverage ladder - how little is known about each
# ==========================================================================
def chart_coverage_ladder():
    mat = {r["competitor"]: r for r in __import__(
        "data_p10_matrix", fromlist=["x"]).build_rows()}
    rows = sorted(mat.values(), key=lambda r: (r["user_reviews"] or 0,
                                               -(r["customers_n"] or 0)))
    names = [r["competitor"] for r in rows]
    rev = [r["user_reviews"] or 0 for r in rows]
    cust = [r["customers_n"] or 0 for r in rows]

    fig, ax = plt.subplots(figsize=(13.2, 8.4))
    y = np.arange(len(rows))

    ax.barh(y - 0.2, rev, height=0.38, color=TEAL,
            label="third-party reviews recorded")
    ax.barh(y + 0.2, cust, height=0.38, color=NAVY,
            label="named customers recorded")

    ax.set_yticks(y)
    ax.set_yticklabels(names, fontsize=7.6)
    ax.invert_yaxis()
    ax.set_xlabel("count")
    ax.legend(fontsize=9.5, loc="lower right")
    ax.axvline(0.5, color=RED, linewidth=1.2, linestyle="--", alpha=0.65)
    ax.set_title("The Evidence Ladder Across 40 Vendors\n"
                 f"{len([r for r in rows if (r['user_reviews'] or 0) == 0])} vendors have "
                 f"zero recorded reviews and "
                 f"{len([r for r in rows if (r['user_reviews'] or 0) == 0 and (r['customers_n'] or 0) == 0])} "
                 "have neither reviews nor a named customer.\n"
                 "The market is not short of competitors; it is short of anyone having "
                 "written down an experience.",
                 pad=14)
    _save(fig, "p11_07_evidence_ladder")


# ==========================================================================
# 8. Pain -> capability heat
# ==========================================================================
def chart_pain_to_capability():
    pains = [c[0] for c in R.PAIN_CATEGORIES if c[0] != "NO_COMPLAINT_RECORDED"]

    matrix = {
        "FRAGMENTATION":     [3, 2, 3, 2, 2, 2],
        "UI_COMPLEXITY":     [1, 3, 1, 0, 1, 0],
        "INFORMATION_OVERLOAD": [2, 3, 0, 0, 1, 0],
        "DOCUMENTATION_GAP": [0, 3, 0, 0, 0, 0],
        "TRAINING_GAP":      [0, 3, 0, 0, 0, 0],
        "INTEGRATION_GAP":   [1, 1, 1, 2, 2, 3],
        "NOTIFICATION_REACH": [0, 1, 0, 0, 3, 2],
        "REPORTING_WEAK":    [2, 1, 0, 1, 2, 2],
        "DATA_EXPORT_MANUAL": [2, 1, 0, 0, 1, 1],
        "BUG_STABILITY":     [0, 2, 0, 0, 0, 0],
        "PRICE_VALUE":       [1, 2, 0, 0, 0, 1],
    }
    caps = ["One system,\nnot five", "Simpler by\ndefault", "Founder\noutreach",
            "Compliance\npack", "AI that\nexplains", "Small-institution\ntier"]

    counts = Counter(r["pain"] for r in R.REVIEWS)
    order = sorted(pains, key=lambda p: -counts[p])

    fig, ax = plt.subplots(figsize=(12.6, 6.8))
    data = np.array([matrix[p] for p in order], dtype=float)
    cmap = matplotlib.colors.LinearSegmentedColormap.from_list(
        "p11b", ["#F8FAFC", "#FDE68A", "#B45309", "#1E3A5F"])
    im = ax.imshow(data, cmap=cmap, aspect="auto", vmin=0, vmax=3)

    for i, p in enumerate(order):
        for j in range(len(caps)):
            v = data[i, j]
            ax.text(j, i, ["-", "weak", "partial", "direct"][int(v)],
                    ha="center", va="center", fontsize=8.2,
                    color="white" if v >= 2 else "#64748B",
                    fontweight="bold" if v >= 2 else "normal")
        ax.text(-0.9, i, f"  n={counts[p]}", ha="right", va="center", fontsize=8)

    ax.set_xticks(range(len(caps)))
    ax.set_xticklabels(caps, fontsize=9.2, fontweight="bold")
    ax.set_yticks(range(len(order)))
    ax.set_yticklabels([p.replace("_", " ").title() for p in order], fontsize=9.4)
    ax.set_xticks(np.arange(-.5, len(caps), 1), minor=True)
    ax.set_yticks(np.arange(-.5, len(order), 1), minor=True)
    ax.grid(which="minor", color="white", linewidth=1.8)
    ax.grid(which="major", visible=False)
    ax.set_title("Pain To StartupHub Capability - Handed To Phase 12\n"
                 "Only three rows carry more than two reviews, and two of those are "
                 "fragmentation. The evidence supports a wedge built on\n"
                 "consolidation and restraint, not on an AI or reporting feature nobody "
                 "in the corpus asked for.",
                 pad=14, loc="left")
    _save(fig, "p11_08_pain_to_capability")


def main():
    print("Phase 11 charts")
    chart_evidence_desert()
    chart_complaint_taxonomy()
    chart_no_dissent()
    chart_incentive()
    chart_real_incumbent()
    chart_evidence_grades()
    chart_coverage_ladder()
    chart_pain_to_capability()
    print(f"  8 charts -> {OUT}")


if __name__ == "__main__":
    main()