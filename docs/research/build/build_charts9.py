#!/usr/bin/env python3
"""StartupHub Phase 9 - competitor infographics (matplotlib, PNG).

Twelve figures, all drawn from build/data_p9_competitors.py.

Usage: python build/build_charts9.py
Output: _exports/charts/phase9/*.png
"""

import sys
from pathlib import Path

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt                                    # noqa: E402
from matplotlib.patches import Patch, Rectangle, FancyBboxPatch    # noqa: E402
import matplotlib.ticker as mticker                               # noqa: E402
import numpy as np                                                # noqa: E402

sys.path.insert(0, str(Path(__file__).resolve().parent))
import data_p9_competitors as C                                    # noqa: E402
import data_p8_pricing as P                                       # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "_exports" / "charts" / "phase9"

NAVY, TEAL, RED, AMBER, SLATE = "#1E3A5F", "#0F766E", "#B91C1C", "#B45309", "#64748B"
PURPLE, GREEN, PINK = "#6D28D9", "#15803D", "#BE185D"
CAT_COLOR = {"direct": NAVY, "global": PURPLE}
SUBCOLOR = {"innovation": AMBER, "incubator": NAVY, "accelerator": TEAL,
            "ecosystem": GREEN, "tech_transfer": PINK}
THREAT_COLOR = {"CRITICAL": RED, "HIGH": "#DC2626", "MEDIUM": AMBER, "LOW": SLATE}
DPI = 200

plt.rcParams.update({
    "font.family": "DejaVu Sans", "font.size": 10,
    "axes.titlesize": 13.5, "axes.titleweight": "bold", "axes.titlecolor": NAVY,
    "axes.labelsize": 10, "axes.labelcolor": "#334155",
    "axes.edgecolor": "#CBD5E1", "axes.grid": True, "grid.color": "#E2E8F0",
    "grid.linewidth": 0.8, "axes.axisbelow": True,
    "figure.facecolor": "white", "axes.facecolor": "white", "legend.frameon": False,
})

RS = "Rs "


def _save(fig, name):
    OUT.mkdir(parents=True, exist_ok=True)
    p = OUT / f"{name}.png"
    fig.savefig(p, dpi=DPI, bbox_inches="tight", facecolor="white")
    plt.close(fig)
    print(f"  png   {p.relative_to(ROOT)}  ({p.stat().st_size // 1024} KB)")


def breadth(c):
    return sum(1 for v in c["features"].values() if v)


def india_readiness(c):
    return ((2 if c["market"] == "India" else 0)
            + c["features"].get("datares", 0)
            + c["features"].get("nocost", 0))


# ==========================================================================
# 1. Positioning matrix - breadth vs India-readiness
# ==========================================================================
def chart_positioning():
    fig, ax = plt.subplots(figsize=(13, 8.8))
    ax.add_patch(Rectangle((0, 3), 6.5, 5.6, color="#FEF2F2", zorder=0))
    ax.add_patch(Rectangle((6.5, 3), 7, 5.6, color="#ECFDF5", zorder=0))
    ax.add_patch(Rectangle((0, 0), 6.5, 3, color="#F8FAFC", zorder=0))
    ax.add_patch(Rectangle((6.5, 0), 7, 3, color="#F0FDFA", zorder=0))
    ax.text(3.25, 8.1, "NARROW + NOT INDIA-READY\nthe risk zone", ha="center",
            fontsize=10, color="#991B1B", fontweight="bold", zorder=1)
    ax.text(10.0, 8.1, "BROAD + INDIA-READY\nStartupHub's target quadrant", ha="center",
            fontsize=10, color="#065F46", fontweight="bold", zorder=1)

    # Who actually occupies the target quadrant? Say so rather than claiming it is empty.
    in_target = [c for c in C.COMPETITORS if breadth(c) >= 6.5 and india_readiness(c) >= 3]
    ax.scatter([], [], s=0)  # keep autoscale honest
    if in_target:
        ax.text(10.0, 6.5,
                "Occupied by: " + ", ".join(c["name"] for c in in_target) +
                "\nAll unproven at institutional scale",
                ha="center", fontsize=9.2, color="#065F46", style="italic", zorder=6)

    # spread labels so co-located vendors do not overprint
    offsets = {"EcoSync": (8, 8), "IncubatX": (-70, 10), "NestLens Orbit": (8, -14),
               "Innoloft / LoftOS": (8, 8), "VentureLink": (8, 8), "Envisio": (8, 8)}
    for c in C.COMPETITORS:
        col = CAT_COLOR.get(c["category"], SLATE)
        size = 60 + c["reviews"] * 14
        ax.scatter(breadth(c), india_readiness(c), s=size, color=col,
                   alpha=0.80, edgecolor="white", linewidth=1.6, zorder=3)
    for c in C.COMPETITORS:
        if c["evidence"] == "NAMED_REFERENCE" or c["name"] in offsets:
            ax.annotate(c["name"], (breadth(c), india_readiness(c)),
                        xytext=offsets.get(c["name"], (6, 5)), textcoords="offset points",
                        fontsize=8.4, color="#1E293B", zorder=4)

    ax.axvline(6.5, color="#94A3B8", ls="--", lw=1.4)
    ax.axhline(3, color="#94A3B8", ls="--", lw=1.4)
    ax.set_xlabel("Product breadth (number of the 12 assessed capabilities implemented)")
    ax.set_ylabel("India-readiness\n(India vendor + data residency + free tier)", fontsize=9.5)
    ax.set_title("Competitive Positioning\n"
                 "Bubble size = third-party review count. The target quadrant is occupied - "
                 "but only by vendors with no verifiable institutional deployment.",
                 pad=14)
    ax.set_xlim(-0.5, 13.5); ax.set_ylim(-0.5, 8.9)
    ax.legend(handles=[
        Patch(color=NAVY, label="Direct competitors (13)"),
        Patch(color=PURPLE, label="Global competitors (15)"),
        plt.Line2D([], [], marker="o", ls="", ms=14, mfc="#94A3B8", mec="white",
                   label="bubble size = review count"),
    ], loc="upper center", bbox_to_anchor=(0.5, -0.09), ncol=3, fontsize=9)
    _save(fig, "p9_01_positioning")


# ==========================================================================
# 2. Feature coverage - where the market is and is not
# ==========================================================================
def chart_feature_coverage():
    rows = sorted(C.feature_totals(), key=lambda r: r["n_with"])
    fig, ax = plt.subplots(figsize=(12, 7))
    y = range(len(rows))
    cols = [RED if r["n_with"] == 0 else (AMBER if r["n_with"] < len(C.COMPETITORS) * 0.25
                                           else (TEAL if r["n_with"] > len(C.COMPETITORS) * 0.6 else NAVY))
            for r in rows]
    ax.barh(list(y), [r["n_with"] for r in rows], color=cols, edgecolor="white", height=0.7)
    ax.set_yticks(list(y))
    ax.set_yticklabels([r["label"] for r in rows], fontsize=9.4)
    n = len(C.COMPETITORS)
    for i, r in enumerate(rows):
        tag = "  <- ZERO of 28" if r["n_with"] == 0 else ""
        ax.text(r["n_with"] + 0.4, i, f"{r['n_with']}/{n}  ({r['pct_with']}%){tag}",
                va="center", fontsize=8.8, color="#334155", fontweight="bold")
    ax.set_xlabel(f"Competitors implementing (of {n} assessed)")
    ax.set_title("Capability Coverage Across the Whole Competitive Set\n"
                 "The bottom four are the entire white space", pad=14)
    ax.set_xlim(0, n + 9)
    ax.legend(handles=[
        Patch(color=RED, label="zero coverage - unoccupied"),
        Patch(color=AMBER, label="under 25%"),
        Patch(color=NAVY, label="25-60%"),
        Patch(color=TEAL, label="over 60% - table stakes"),
    ], loc="lower right", fontsize=9)
    _save(fig, "p9_02_feature_coverage")


# ==========================================================================
# 3. Coverage heatmap
# ==========================================================================
def chart_heatmap():
    rows = C.feature_matrix()
    rows.sort(key=lambda r: (r["category"], -sum(v for v in r.values()
                                                  if isinstance(v, int) and v > 0)))
    mat = np.array([[r[k] for k, _ in C.FEATURES] for r in rows], dtype=float)

    fig, ax = plt.subplots(figsize=(13, 11))
    cmap = matplotlib.colors.ListedColormap(["#F1F5F9", "#93C5FD", "#1D4ED8"])
    ax.imshow(mat, aspect="auto", cmap=cmap, vmin=0, vmax=2)

    ax.set_xticks(range(len(C.FEATURES)))
    ax.set_xticklabels([l for _, l in C.FEATURES], rotation=45, ha="right", fontsize=9)
    ax.set_yticks(range(len(rows)))
    ax.set_yticklabels([r["name"] for r in rows], fontsize=8.4)
    ax.set_xticks(np.arange(-.5, len(C.FEATURES), 1), minor=True)
    ax.set_yticks(np.arange(-.5, len(rows), 1), minor=True)
    ax.grid(which="minor", color="white", linewidth=1.6)
    ax.tick_params(which="minor", length=0)
    ax.grid(False)

    # mark the three columns that are the surviving gaps
    for key in ("ipr", "trl", "mandate"):
        j = [k for k, _ in C.FEATURES].index(key)
        ax.add_patch(Rectangle((j - .5, -1.35), 1, len(rows) + 1.35,
                               fill=False, edgecolor=RED, lw=2.4, zorder=5))
    ax.text(len(C.FEATURES) / 2, -2.3, "The three surviving CRITICAL gaps (GAP-01/02/03)",
            ha="center", fontsize=10, color=RED, fontweight="bold")

    ax.set_title("Capability Heatmap - 28 Competitors x 12 Capabilities\n"
                 "absent / partial / native", pad=26)
    handles = [Patch(color="#F1F5F9", label="absent"),
               Patch(color="#93C5FD", label="partial"),
               Patch(color="#1D4ED8", label="native")]
    ax.legend(handles=handles, loc="lower left", bbox_to_anchor=(0, -0.12),
              ncol=3, fontsize=9)
    _save(fig, "p9_03_heatmap")


# ==========================================================================
# 4. Evidence quality - the credibility problem
# ==========================================================================
def chart_evidence():
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 6.4),
                                  gridspec_kw={"width_ratios": [1, 1.25]})

    ev = C.evidence_summary()
    order = ["NAMED_REFERENCE", "NAMED_LOGO", "VENDOR_CLAIM", "UNKNOWN"]
    labels = {"NAMED_REFERENCE": "Named reference\n(person + role + org)",
              "NAMED_LOGO": "Named logo\n(org, unreferenced)",
              "VENDOR_CLAIM": "Vendor claim\n(unverified)",
              "UNKNOWN": "Unknown\n(no evidence)"}
    cols = [GREEN, TEAL, AMBER, RED]
    vals = [ev.get(k, 0) for k in order]
    bars = ax1.bar(range(4), vals, color=cols, edgecolor="white", width=0.6)
    for i, v in enumerate(vals):
        ax1.text(i, v + 0.3, str(v), ha="center", fontsize=12, fontweight="bold", color="#334155")
    ax1.set_xticks(range(4))
    ax1.set_xticklabels([labels[k] for k in order], fontsize=8.6)
    ax1.set_ylabel("Competitors")
    ax1.set_title("Evidence Quality for Named Customers\n"
                  f"{ev.get('UNKNOWN',0)+ev.get('VENDOR_CLAIM',0)} of {len(C.COMPETITORS)} "
                  "are no better than a vendor claim", pad=12)
    ax1.set_ylim(0, max(vals) + 3)

    # reviews vs named customers
    named = sorted(C.COMPETITORS, key=lambda c: -c["reviews"])[:12]
    y = np.arange(len(named))
    ax2.barh(y, [c["reviews"] for c in named],
             color=[GREEN if c["evidence"] == "NAMED_REFERENCE" else
                    (TEAL if c["evidence"] == "NAMED_LOGO" else
                     (AMBER if c["evidence"] == "VENDOR_CLAIM" else RED)) for c in named],
             edgecolor="white", height=0.66)
    ax2.set_yticks(y)
    ax2.set_yticklabels([f"{c['name'][:22]}" for c in named], fontsize=8.4)
    ax2.invert_yaxis()
    ax2.set_xlabel("Third-party review count")
    ax2.set_title("Review Base vs Customer Proof\nAccubate is the only real review base", pad=12)
    ax2.legend(handles=[Patch(color=c, label=l) for c, l in
                        [(GREEN, "named reference"), (TEAL, "named logo"),
                         (AMBER, "vendor claim"), (RED, "unknown")]],
               loc="lower right", fontsize=8.4)
    _save(fig, "p9_04_evidence")


# ==========================================================================
# 5. Category map
# ==========================================================================
def chart_categories():
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(13.5, 6.2),
                                  gridspec_kw={"width_ratios": [1, 1.4]})

    cats = [("Direct", len([c for c in C.COMPETITORS if c["category"] == "direct"]), NAVY),
            ("Global", len([c for c in C.COMPETITORS if c["category"] == "global"]), PURPLE),
            ("Ecosystem\nplatforms", len(C.ECOSYSTEM), TEAL),
            ("Indirect\nalternatives", len(C.INDIRECT), SLATE)]
    ax1.bar([c[0] for c in cats], [c[1] for c in cats],
            color=[c[2] for c in cats], edgecolor="white", width=0.6)
    for i, (_, v, _) in enumerate(cats):
        ax1.text(i, v + 0.5, str(v), ha="center", fontsize=12, fontweight="bold", color="#334155")
    ax1.set_ylabel("Entries")
    ax1.set_title("The Four Spec Categories\n46 assessed entities", pad=12)

    subs = C.GLOBAL_SUBCATEGORIES
    ks = list(subs.keys())
    vs = [len([c for c in C.COMPETITORS if c.get("sub") == k]) for k in ks]
    y = np.arange(len(ks))
    ax2.barh(y, vs, color=[SUBCOLOR[k] for k in ks], edgecolor="white", height=0.6)
    for i, (k, v) in enumerate(zip(ks, vs)):
        added = " (added by Phase 9)" if k == "tech_transfer" else ""
        ax2.text(v + 0.15, i, f"{v}{added}", va="center", fontsize=9.4,
                 fontweight="bold", color="#334155")
    ax2.set_yticks(y)
    ax2.set_yticklabels([subs[k] for k in ks], fontsize=9)
    ax2.invert_yaxis()
    ax2.set_xlabel("Vendors")
    ax2.set_xlim(0, max(vs) + 4.5)
    ax2.set_title("Global Competitors by Sub-Category\n"
                  "The spec named four; verification forced a fifth", pad=12)
    _save(fig, "p9_05_categories")


# ==========================================================================
# 6. The mandatory government stack
# ==========================================================================
def chart_mandatory_stack():
    fig, ax = plt.subplots(figsize=(12, 7))
    rows = sorted(C.ECOSYSTEM, key=lambda e: -{"CRITICAL": 4, "HIGH": 3,
                                                "MEDIUM": 2, "LOW": 1}[e["threat"]])
    y = np.arange(len(rows))
    ax.barh(y, [1] * len(rows), color=[THREAT_COLOR[r["threat"]] for r in rows],
            edgecolor="white", height=0.68)
    ax.set_yticks(y)
    ax.set_yticklabels([f"{r['name']}\n{r['operator']}" for r in rows], fontsize=8.6)
    ax.invert_yaxis()
    ax.set_xticks([])
    ax.set_xlim(0, 3.4)
    for i, r in enumerate(rows):
        overlap = "TOTAL, MANDATORY" if r["threat"] == "CRITICAL" else r["overlap"][:52]
        ax.text(1.06, i, overlap, va="center", fontsize=8.6, color="white",
                fontweight="bold" if r["threat"] == "CRITICAL" else "normal")
        ax.text(1.14, i, "", va="center")
    ax.set_title("The Mandatory Stack Is Not Optional\n"
                 "These are the demand drivers - no institution can opt out of any CRITICAL row", pad=14)
    ax.legend(handles=[Patch(color=THREAT_COLOR[t], label=t) for t in
                       ("CRITICAL", "HIGH", "MEDIUM", "LOW")],
              loc="lower right", ncol=4, fontsize=9)
    _save(fig, "p9_06_mandatory_stack")


# ==========================================================================
# 7. Gap status - what survived Phase 9
# ==========================================================================
def chart_gap_status():
    fig, ax = plt.subplots(figsize=(12, 7.4))
    gaps = C.POSITIONING_GAPS
    y = np.arange(len(gaps))
    sev = {"CRITICAL": RED, "HIGH": AMBER, "MEDIUM": SLATE}
    ax.barh(y, [1] * len(gaps), color=[sev[g["severity"]] for g in gaps],
            edgecolor="white", height=0.68)

    stat_map = {
        "SURVIVES UNCHANGED": (GREEN, "SURVIVES UNCHANGED"),
        "SURVIVES, NARROWED": (TEAL, "SURVIVES, NARROWED"),
        "SURVIVES, WEAKENED": (AMBER, "SURVIVES, WEAKENED"),
        "SURVIVES, STRENGTHENED": (NAVY, "SURVIVES, STRENGTHENED"),
    }
    for i, g in enumerate(gaps):
        col, lab = stat_map.get(g["status"], (SLATE, g["status"]))
        ax.text(1.05, i, lab, va="center", fontsize=8.8, color="white", fontweight="bold")
        ax.text(2.28, i, g["title"][:40], va="center", fontsize=8.6, color="#334155")

    ax.set_yticks(y)
    ax.set_yticklabels([g["gap_id"] for g in gaps], fontsize=9.4, fontweight="bold")
    ax.invert_yaxis()
    ax.set_xticks([]); ax.set_xlim(0, 5.6)
    ax.set_title("All 13 Positioning Gaps, After Verification\n"
                 "3 survive untouched. 6 were narrowed or weakened by Phase 9 research.", pad=14)
    ax.legend(handles=[Patch(color=c, label=l) for c, l in
                       [(RED, "CRITICAL"), (AMBER, "HIGH"), (SLATE, "MEDIUM")]]
              + [Patch(color=GREEN, label="status: unchanged"),
                 Patch(color=TEAL, label="status: narrowed"),
                 Patch(color="#F59E0B", label="status: weakened"),
                 Patch(color=NAVY, label="status: strengthened")],
              loc="lower right", ncol=4, fontsize=8.8)
    _save(fig, "p9_07_gap_status")


# ==========================================================================
# 8. Revised claims - the audit trail
# ==========================================================================
def chart_revised_claims():
    fig, ax = plt.subplots(figsize=(12.5, 6.4))
    ax.axis("off")
    rows = C.REVISED_CLAIMS
    smap = {"FALSIFIED": RED, "RESOLVED": TEAL, "EXPANDED": NAVY,
            "SUPERSEDED BY LATER EVIDENCE": AMBER}
    y = 1.0
    for r in rows:
        col = smap.get(r["status"], SLATE)
        ax.add_patch(FancyBboxPatch((0.005, y - 0.105), 0.99, 0.20,
                                    boxstyle="round,pad=0.006", linewidth=0,
                                    facecolor=f"{col}14", transform=ax.transAxes))
        ax.text(0.02, y - 0.005, r["id"], fontsize=10, fontweight="bold",
                color=col, transform=ax.transAxes, va="top")
        ax.text(0.085, y - 0.005, r["status"], fontsize=9.4, fontweight="bold",
                color=col, transform=ax.transAxes, va="top")
        ax.text(0.30, y - 0.005, r["phase0_claim"][:78], fontsize=8.8,
                color="#334155", style="italic", transform=ax.transAxes, va="top")
        ax.text(0.30, y - 0.062, r["correction"][:150], fontsize=8.2,
                color="#475569", transform=ax.transAxes, va="top")
        y -= 0.235
    ax.text(0.5, 0.985, "Phase 9 Corrected Five Phase 0 Claims",
            ha="center", fontsize=14, fontweight="bold", color=NAVY,
            transform=ax.transAxes, va="top")
    _save(fig, "p9_08_revised_claims")


# ==========================================================================
# 9. Price vs capability breadth
# ==========================================================================
def chart_price_scope():
    fig, ax = plt.subplots(figsize=(12, 7.4))
    pts = []
    for c in C.COMPETITORS:
        lo = c.get("price_inr_low")
        if lo is None or lo == 0:
            continue
        pts.append((c, lo))
    for c, lo in pts:
        col = CAT_COLOR.get(c["category"], SLATE)
        ax.scatter(breadth(c), lo, s=90, color=col, alpha=0.85,
                   edgecolor="white", linewidth=1.4, zorder=3)
    for c, lo in pts:
        ax.annotate(c["name"][:20], (breadth(c), lo), xytext=(6, 4),
                    textcoords="offset points", fontsize=7.8, color="#334155")
    ax.set_yscale("log")
    ax.set_xlabel("Capability breadth (of 12)")
    ax.set_ylabel("Lowest published annual price, INR (log scale)")
    ax.yaxis.set_major_formatter(mticker.FuncFormatter(lambda v, _: f"{v:,.0f}"))
    ax.set_title("Price vs Capability Breadth\n"
                 "No correlation - the market does not price for scope", pad=14)
    ax.legend(handles=[Patch(color=NAVY, label="Direct"),
                       Patch(color=PURPLE, label="Global"),
                       Patch(color=SLATE, label="free / quote-only (excluded)")],
              loc="upper left", fontsize=9)
    ax.set_xlim(1, 13)
    _save(fig, "p9_09_price_scope")


# ==========================================================================
# 10. India vs global readiness
# ==========================================================================
def chart_india_vs_global():
    fig, ax = plt.subplots(figsize=(11.5, 6.8))
    ind = [c for c in C.COMPETITORS if c["market"] == "India"]
    glob = [c for c in C.COMPETITORS if c["market"] != "India"]
    ind_r = [india_readiness(c) for c in ind]
    glob_r = [india_readiness(c) for c in glob]

    bins = np.arange(0, 7)
    ax.hist(glob_r, bins=bins, color=PURPLE, alpha=0.65, label=f"Global vendors (n={len(glob)})")
    ax.hist(ind_r, bins=bins, color=NAVY, alpha=0.75, label=f"Indian vendors (n={len(ind)})")
    ax.set_xlabel("India-readiness score (India vendor + data residency + free tier)")
    ax.set_ylabel("Vendors")
    ax.set_title("Indian Vendors Lead on India-Readiness\n"
                 "but 10 of 28 competitors have no India-facing capability at all", pad=14)
    ax.legend(fontsize=9.5)
    i = C.india_presence()
    ax.text(0.97, 0.93,
            f"Indian vendors: {i['indian_vendors']}\n"
            f"Indian data residency: {i['data_residency_india']}\n"
            f"Any Indian mandate support: 0\n"
            f"Zero-price to institutions: 4",
            transform=ax.transAxes, ha="right", va="top", fontsize=9,
            bbox=dict(boxstyle="round", facecolor="#F8FAFC", edgecolor="#CBD5E1"))
    _save(fig, "p9_10_india_vs_global")


# ==========================================================================
# 11. Tech-transfer adjacency - why GAP-01 narrowed
# ==========================================================================
def chart_tech_transfer():
    fig, ax = plt.subplots(figsize=(12, 8))
    tt = [c for c in C.COMPETITORS if c.get("sub") == "tech_transfer"]
    inc = [c for c in C.COMPETITORS if c.get("sub") in ("incubator", "accelerator")]

    TOP, BOT = 12.5, -9.0
    ax.add_patch(Rectangle((0, 0), 10, TOP, color="#ECFDF5", zorder=0))
    ax.text(5, TOP - 0.75, "INCUBATION PLATFORMS  (intake -> cohort -> graduation)",
            ha="center", fontsize=11.5, color="#065F46", fontweight="bold", zorder=2)
    ax.add_patch(Rectangle((0, BOT), 10, -BOT, color="#FDF2F8", zorder=0))
    ax.text(5, 0.75, "TECH-TRANSFER PLATFORMS  (disclosure -> patent -> licence)",
            ha="center", fontsize=11.5, color="#9D174D", fontweight="bold", zorder=2)

    def stack(items, top_y, bot_y, face, edge, tcol, with_price):
        """Lay items out between top_y and bot_y, whatever the item count is."""
        n = len(items)
        if not n:
            return
        usable = (top_y - bot_y)
        gap = usable / n
        h = gap * 0.82
        for i, c in enumerate(items):
            y = top_y - (i + 0.5) * gap
            ax.add_patch(FancyBboxPatch((0.6, y - h / 2), 8.8, h,
                                        boxstyle="round,pad=0.02", facecolor=face,
                                        alpha=0.13, edgecolor=edge, linewidth=1.5, zorder=3))
            if with_price:
                ax.text(0.9, y + 0.12, c["name"], fontsize=9.4, fontweight="bold",
                        color=tcol, zorder=4, va="center")
                ax.text(0.9, y - 0.22, c["pricing"][:84], fontsize=7.6, color=tcol,
                        zorder=4, va="center")
            else:
                ax.text(0.9, y, c["name"], fontsize=9.4, color=tcol, zorder=4, va="center")

    stack(inc, 10.9, 1.35, NAVY, NAVY, "#1E3A5F", False)
    stack(tt, -1.65, -7.35, PINK, PINK, "#831843", True)

    ax.annotate("", xy=(10.35, 0.55), xytext=(10.35, -0.55),
                arrowprops=dict(arrowstyle="<->", color=RED, lw=3.2))
    ax.text(10.55, 0, "NOBODY\nCROSSES", fontsize=10.5, color=RED, fontweight="bold",
            va="center", rotation=90)

    ax.text(5, TOP + 0.4, "The Adjacency That Narrowed GAP-01",
            ha="center", fontsize=14, fontweight="bold", color=NAVY)
    ax.text(5, BOT + 0.62,
            "Phase 0 said 'zero competitors have an IPR module'. That was false.\n"
            "What survives: these platforms exist - and none is joined to incubation.",
            ha="center", fontsize=9.4, color="#9D174D")
    ax.set_xlim(0, 12.2); ax.set_ylim(BOT, TOP + 1.0)
    ax.axis("off")
    _save(fig, "p9_11_tech_transfer")


# ==========================================================================
# 12. Threat vs evidence quality
# ==========================================================================
def chart_threat_evidence():
    fig, ax = plt.subplots(figsize=(11.5, 6.8))
    order = {"CRITICAL": 4, "HIGH": 3, "MEDIUM": 2, "LOW": 1}
    grade_x = {"UNKNOWN": 0, "VENDOR_CLAIM": 1, "NAMED_LOGO": 2, "NAMED_REFERENCE": 3}
    jitter = np.linspace(-0.22, 0.22, len(C.COMPETITORS))
    for i, c in enumerate(C.COMPETITORS):
        ax.scatter(grade_x[c["evidence"]], order[c["threat"]] + jitter[i],
                   s=90, color=THREAT_COLOR[c["threat"]], alpha=0.82,
                   edgecolor="white", linewidth=1.2, zorder=3)
    for c in C.COMPETITORS:
        if c["threat"] in ("CRITICAL", "HIGH"):
            ax.annotate(c["name"][:18], (grade_x[c["evidence"]], order[c["threat"]]),
                        xytext=(9, 2), textcoords="offset points", fontsize=7.6,
                        color="#334155")
    ax.set_xticks(range(4))
    ax.set_xticklabels(["unknown", "vendor claim", "named logo", "named reference"], fontsize=9)
    ax.set_yticks([1, 2, 3, 4])
    ax.set_yticklabels(["LOW", "MEDIUM", "HIGH", "CRITICAL"], fontsize=9.4)
    ax.set_ylim(0.5, 4.7)
    ax.set_xlabel("Evidence quality for named customers")
    ax.set_ylabel("Threat level")
    ax.set_title("The Most Dangerous Competitors Are Also the Least Proven\n"
                 "Every HIGH or CRITICAL threat sits in the two leftmost columns", pad=14)
    ax.legend(handles=[Patch(color=THREAT_COLOR[t], label=t) for t in
                       ("CRITICAL", "HIGH", "MEDIUM", "LOW")],
              loc="lower right", ncol=2, fontsize=9)
    _save(fig, "p9_12_threat_vs_evidence")


def main():
    print("Phase 9 charts")
    chart_positioning()
    chart_feature_coverage()
    chart_heatmap()
    chart_evidence()
    chart_categories()
    chart_mandatory_stack()
    chart_gap_status()
    chart_revised_claims()
    chart_price_scope()
    chart_india_vs_global()
    chart_tech_transfer()
    chart_threat_evidence()
    print(f"\n12 charts -> {OUT}")
    return 0


if __name__ == "__main__":
    sys.exit(main())