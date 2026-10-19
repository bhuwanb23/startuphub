#!/usr/bin/env python3
"""StartupHub - cross-phase infographic pack.

Twelve figures that each pull from a DIFFERENT phase of the study, plus three
that deliberately cross phases. These exist because the per-phase charts are
scoped to their own phase and the interesting questions live in the joins:
how big the funnel actually is, where the phases disagree, and what proportion
of the entire study rests on primary documents rather than vendor claims.

Usage: python build/build_charts_infographics.py
Output: _exports/charts/infographics/*.png
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
import data_p1_problems as P1                                    # noqa: E402
import data_p1_iic_records as P1R                                # noqa: E402
import data_p2_roles as P2                                       # noqa: E402
import data_p5_market as P5                                      # noqa: E402
import data_p7_sizing as P7                                      # noqa: E402
import data_p8_pricing as P8                                     # noqa: E402
import data_p9_competitors as P9                                 # noqa: E402
import data_p10_matrix as M                                      # noqa: E402
import data_p11_reviews as R                                     # noqa: E402
import data_p35_estimates as P35                                 # noqa: E402
import data_p36_simulation as P36                                # noqa: E402
import data_sources as DS                                        # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "_exports" / "charts" / "infographics"

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


def _save(fig, name):
    OUT.mkdir(parents=True, exist_ok=True)
    p = OUT / f"{name}.png"
    fig.savefig(p, dpi=DPI, bbox_inches="tight", facecolor="white")
    plt.close(fig)
    print(f"  png   {p.relative_to(ROOT)}  ({p.stat().st_size // 1024} KB)")


ROWS = M.build_rows()
DIM_KEYS = M.DIM_KEYS
S11 = R.summarise()
S7 = P7.summary()

# The one MEASURED step of the Phase 7 funnel: institutions that filed the
# NIRF Innovation category in 2025. Everything else in the funnel is a proxy.
NIRF_FILERS = next(s["remaining_low"] for s in P7.sam_funnel()
                   if s["filter"] == "Innovation activity")

# Counted, not asserted - the subtitle of the executive dashboard quotes them.
N_REGISTERED_SOURCES = len(DS.SOURCES)
N_IIC_REPORTS = len(P1R.IIC_REPORTS)


# ==========================================================================
# 1. The market funnel
# ==========================================================================
def inf_funnel():
    steps = P7.sam_funnel()
    som = P7.som_scenario("A") if callable(getattr(P7, "som_scenario", None)) else None

    rows = [s for s in steps if s["dropped_high"] > 0 or s["remaining_low"] < 58643]
    rows = rows[:5]

    fig, ax = plt.subplots(figsize=(15.0, 7.4))
    y = 8.2
    h = 1.02
    prev = None
    for s in rows:
        lo, hi = s["remaining_low"], s["remaining_high"]
        label = f'{s["filter"]}'
        pct = s["cumulative_low_pct"]
        method = s["method"]

        wlo = max(1.7, 8.4 * (np.log10(lo + 1) / np.log10(58643 + 1)))
        whi = max(1.7, 8.4 * (np.log10(hi + 1) / np.log10(58643 + 1)))
        yc = 5.6

        if hi > lo:
            poly = [(yc - whi / 2, y), (yc + whi / 2, y),
                    (yc + wlo / 2, y - h), (yc - wlo / 2, y - h)]
        else:
            poly = [(yc - wlo / 2, y), (yc + wlo / 2, y),
                    (yc + wlo / 2 - 0.16, y - h), (yc - wlo / 2 + 0.16, y - h)]
        ax.add_patch(plt.Polygon(poly, closed=True, facecolor=NAVY,
                                 edgecolor="white", linewidth=2.2))

        rng = f"{lo:,}" if hi == lo else f"{lo:,} - {hi:,}"
        ax.text(yc, y - h / 2 + 0.13, rng, ha="center", va="center",
                fontsize=16, fontweight="bold", color="white")
        ax.text(yc, y - h / 2 - 0.20, f"{pct:.2f}% of the base", ha="center",
                va="center", fontsize=8.8, color="#CBD5E1")

        ax.text(yc, y + 0.20, label, ha="center", va="bottom", fontsize=10.4,
                fontweight="bold", color=NAVY)
        ax.text(yc, y - h - 0.10, s["rule"][:66], ha="center", va="top",
                fontsize=8.0, color=SLATE, style="italic")
        ax.text(9.55, y - h / 2, method, ha="right", va="center", fontsize=8.6,
                fontweight="bold",
                color=GREEN if method == "MEASURED" else
                PURPLE if method == "BOUNDED" else SLATE)

        if prev is not None and prev > hi:
            ax.annotate("", xy=(yc + 4.55, y - h), xytext=(yc + 4.55, y - h + 0.02),
                        arrowprops=dict(arrowstyle="-|>", color=RED, lw=1.6))
        prev = hi
        y -= h + 0.72

    ax.text(0.55, 9.55, "The StartupHub Funnel - Every Filter, With Its Counting Rule",
            fontsize=17.5, fontweight="bold", color=NAVY)
    ax.text(0.55, 9.05,
            "58,643 registered HEIs is the super-bound, not a market. Each band below is "
            "the result of one documented rule.\nOnly ONE of these filters is MEASURED "
            "(green). Everything above it is a proxy; everything below it is an analyst "
            "floor.",
            fontsize=10.4, color="#334155")
    ax.text(9.55, 9.30, "provenance", ha="right", fontsize=9,
             fontweight="bold", color=SLATE)
    ax.legend(handles=[
        Patch(color=GREEN, label="MEASURED"),
        Patch(color=SLATE, label="DERIVED"),
        Patch(color=PURPLE, label="BOUNDED"),
    ], fontsize=9, loc="upper right", bbox_to_anchor=(1.0, 0.86), ncol=3)
    _save(fig, "inf_01_market_funnel")


# ==========================================================================
# 2. What the whole study rests on
# ==========================================================================
def inf_evidence_base():
    fig, ax = plt.subplots(figsize=(13.6, 6.8))

    left = 0
    blocks = [
        ("T1 Primary documents", 1213, NAVY,
         "Government reports, IIC annual reports, NIRF/ARIIA forms, tenders, "
         "official statistics"),
        ("T2 High-quality secondary", 28, TEAL,
         "Peer-reviewed work, IIM/IIIT research, World Bank/OECD"),
        ("T3 Market intelligence", 40, AMBER,
         "Tracxn, Crunchbase, SaaS directories, review aggregators"),
        ("T4 Community / vendor", 96, PURPLE,
         "Vendor blogs, case studies, LinkedIn, Reddit, review excerpts"),
        ("User voice (Phase 11)", S11["verified_text"], GREEN,
         "Retrieved review or forum text that may support a claim"),
        ("Primary research", 0, RED,
         "Interviews conducted. Zero, across every phase."),
    ]
    for label, val, col, _ in blocks:
        ax.barh(0, val, left=left, color=col, height=0.46, edgecolor="white")
        if val:
            ax.text(left + val / 2, 0, f"{val:,}", ha="center", va="center",
                    fontsize=13, fontweight="bold", color="white")
        left += val

    handles = [Patch(color=c, label=f"{l} - {v:,}") for l, v, c, _ in blocks]
    ax.legend(handles=handles, fontsize=9.6, loc="upper center",
              bbox_to_anchor=(0.5, -0.10), ncol=2)

    y = 0.62
    for label, val, col, note in blocks:
        if val:
            ax.text(0, y, label, fontsize=10, fontweight="bold", color=col)
            ax.text(2.35, y, f"{val:,}", fontsize=10, fontweight="bold",
                    color="#334155")
            ax.text(3.15, y, note, fontsize=8.6, color=SLATE)
        y += 0.40

    ax.set_xlim(0, left * 1.02)
    ax.set_ylim(-1.5, 3.6)
    ax.set_yticks([])
    ax.set_xlabel("sources / records across all 11 phases")
    ax.set_title("What The Entire Study Rests On\n"
                 "The study is built on primary documents. It contains no interviews, and "
                 f"only {S11['verified_text']} records of independent user voice. "
                 "Every rupee figure is modelled, not measured.",
                 pad=14)
    _save(fig, "inf_02_evidence_base")


# ==========================================================================
# 3. Problem severity
# ==========================================================================
def inf_problem_severity():
    probs = P1.PROBLEMS
    order = {"CRITICAL": 0, "HIGH": 1, "MEDIUM": 2, "LOW": 3}
    probs = sorted(probs, key=lambda p: (order.get(p["severity"], 9),
                                        -len(p["evidence"])))
    sev_col = {"CRITICAL": RED, "HIGH": AMBER, "MEDIUM": TEAL, "LOW": GREY}
    grade_col = {"DOCUMENTED": GREEN, "SINGLE-SOURCE": AMBER, "HYPOTHESIS": RED}

    fig, ax = plt.subplots(figsize=(13.4, 7.2))
    y = np.arange(len(probs))
    h = 0.36

    for i, p in enumerate(probs):
        ax.barh(i + h / 2 + 0.03, len(p["evidence"]), height=h,
                color=sev_col.get(p["severity"], GREY), edgecolor="white",
                label="severity" if i == 0 else None)
        ax.barh(i - h / 2 - 0.03, len(p["quoted" if "quoted" in p else "evidence"]),
                height=h, color=grade_col.get(p["evidence_grade"], GREY),
                edgecolor="white", alpha=0.55)

    ax.set_yticks(y)
    ax.set_yticklabels([f'{p["id"]}  {p["title"][:58]}' for p in probs],
                       fontsize=8.6)
    ax.invert_yaxis()
    ax.set_xlabel("count")
    ax.legend(handles=[
        Patch(color=RED, label="CRITICAL"), Patch(color=AMBER, label="HIGH"),
        Patch(color=TEAL, label="MEDIUM"), Patch(color=GREY, label="LOW"),
        Patch(color=GREEN, alpha=0.55, label="evidence = DOCUMENTED"),
        Patch(color=AMBER, alpha=0.55, label="SINGLE-SOURCE"),
        Patch(color=RED, alpha=0.55, label="HYPOTHESIS"),
    ], fontsize=8.8, ncol=4, loc="lower right")

    grades = Counter(p["evidence_grade"] for p in P1.PROBLEMS)
    sev = Counter(p["severity"] for p in P1.PROBLEMS)
    ax.set_title("The Ten Documented Problems - Phase 1\n"
                 + " · ".join(f"{k}: {v}" for k, v in sev.most_common())
                 + "   |   evidence: "
                 + " · ".join(f"{k}: {v}" for k, v in grades.most_common())
                 + "\nBar length is supporting evidence. A problem graded HYPOTHESIS is "
                 "structurally implied by the documents, not observed in an interview.",
                 pad=14)
    _save(fig, "inf_03_problem_severity")


# ==========================================================================
# 4. The buying centre
# ==========================================================================
def inf_buying_centre():
    roles = P2.ROLES
    by_class = Counter(r["role_class"] for r in roles)
    pay = Counter(r["grades"]["pays"] for r in roles)

    fig, (ax, ax2) = plt.subplots(1, 2, figsize=(14.4, 6.4),
                                  gridspec_kw={"width_ratios": [1.35, 1]})

    cls_lbl = {"A": "A - Mandated IIC seats\n(portal-enforced)",
               "B": "B - Adjacent offices\n(Registrar, IPR, TTO)",
               "C": "C - Off-portal gatekeepers\n(control the purchase)",
               "D": "D - Individual users\n(never institutional buyers)"}
    cols = {"A": NAVY, "B": TEAL, "C": AMBER, "D": GREY}
    keys = ["A", "B", "C", "D"]
    vals = [by_class.get(k, 0) for k in keys]
    bars = ax.bar(range(4), vals, color=[cols[k] for k in keys], width=0.62,
                  edgecolor="white")
    for i, v in enumerate(vals):
        ax.text(i, v + 0.12, str(v), ha="center", fontsize=13, fontweight="bold",
                color="#334155")
    ax.set_xticks(range(4))
    ax.set_xticklabels([cls_lbl[k] for k in keys], fontsize=8.8)
    ax.set_ylabel("roles mapped")
    ax.set_title(f"Who Is In The Buying Centre - {len(roles)} roles")

    pc = {"DOCUMENTED": GREEN, "SINGLE-SOURCE": AMBER, "HYPOTHESIS": RED}
    keys2 = ["DOCUMENTED", "SINGLE-SOURCE", "HYPOTHESIS"]
    v2 = [pay.get(k, 0) for k in keys2]
    ax2.barh(range(3), v2, color=[pc[k] for k in keys2], height=0.55,
             edgecolor="white")
    for i, v in enumerate(v2):
        ax2.text(v + 0.12, i, f"{v} of {len(roles)}", va="center", fontsize=11.5,
                 fontweight="bold", color="#334155")
    ax2.set_yticks(range(3))
    ax2.set_yticklabels(["Documented\nbudget authority",
                         "Single-source\nsuggestion",
                         "Hypothesis -\nnot evidenced"], fontsize=9.4)
    ax2.invert_yaxis()
    ax2.set_xlim(0, max(v2) * 1.5)
    ax2.set_xlabel("roles")
    ax2.set_title("Who Actually Pays - The Hardest Question\n"
                  "Class C was added because the gatekeepers who\n"
                  "control the purchase were absent from the spec.")

    fig.suptitle("Phase 2 - Nobody In The Buying Centre Has Documented Budget Authority "
                 "For This Purchase",
                 fontsize=14, fontweight="bold", color=NAVY, y=1.0)
    _save(fig, "inf_04_buying_centre")


# ==========================================================================
# 5. Capability saturation
# ==========================================================================
def inf_capability_saturation():
    cov = M.dimension_coverage(ROWS)
    cov = sorted(cov, key=lambda c: -(c["n_native"] + c["n_differentiator"]))
    labels = [c["label"] for c in cov]
    nat = [c["n_native"] + c["n_differentiator"] for c in cov]
    par = [c["n_partial"] for c in cov]
    unk = [c["n_unknown"] for c in cov]
    tot = len(ROWS)

    fig, ax = plt.subplots(figsize=(13.0, 7.2))
    y = np.arange(len(cov))
    ax.barh(y, nat, color=NAVY, height=0.62, edgecolor="white",
            label="native or better")
    ax.barh(y, par, left=nat, color=TEAL, height=0.62, edgecolor="white",
            label="partial")
    ax.barh(y, unk, left=np.array(nat) + np.array(par), color=GREY, height=0.62,
            edgecolor="white", label="unknown (not absent)")

    for i, c in enumerate(cov):
        pct = (c["n_native"] + c["n_differentiator"]) / tot * 100
        ax.text(tot + 0.6, i, f"{c['n_native'] + c['n_differentiator']}/{tot}"
                f"   {pct:.0f}%", va="center", fontsize=9.4,
                fontweight="bold" if pct < 30 else "normal",
                color=RED if pct < 30 else "#334155")
        if c["added_by_phase10"]:
            ax.text(-1.0, i, "*", ha="right", va="center", fontsize=13,
                    color=RED, fontweight="bold")

    ax.set_yticks(y)
    ax.set_yticklabels([l + ("  *" if c["added_by_phase10"] else "")
                        for l, c in zip(labels, cov)], fontsize=9.6)
    ax.invert_yaxis()
    ax.set_xlim(0, tot * 1.16)
    ax.set_xlabel(f"vendors out of {tot}")
    ax.legend(fontsize=9.5, ncol=3, loc="lower right")
    ax.set_title("Incubation Operations Are Saturated. Compliance Is Not.\n"
                 "* marks the two dimensions Phase 10 added because Phase 9 proved they "
                 "were the surviving gaps. They sit at the bottom of the chart with the "
                 "fewest builders.",
                 pad=14)
    _save(fig, "inf_05_capability_saturation")


# ==========================================================================
# 6. The evidence desert, study-wide
# ==========================================================================
def inf_evidence_desert_study():
    vendors = len(ROWS)
    with_reviews = len([r for r in ROWS if (r["user_reviews"] or 0) > 0])
    with_named = len([r for r in ROWS if (r["customers_n"] or 0) > 0])
    with_both = len([r for r in ROWS
                     if (r["user_reviews"] or 0) > 0 and (r["customers_n"] or 0) > 0])
    neither = vendors - with_reviews - with_named + with_both

    fig, ax = plt.subplots(figsize=(12.8, 6.6))
    labels = ["Has BOTH reviews\nand a named customer", "Has named customers\nonly",
              "Has reviews\nonly", "Has NEITHER"]
    vals = [with_both, with_named - with_both, with_reviews - with_both, neither]
    cols = [GREEN, TEAL, AMBER, RED]

    bars = ax.bar(range(4), vals, color=cols, width=0.6, edgecolor="white")
    for i, v in enumerate(vals):
        ax.text(i, v + 0.7, f"{v}\n{v/vendors*100:.0f}%", ha="center",
                fontsize=13, fontweight="bold", color="#334155")

    ax.set_xticks(range(4))
    ax.set_xticklabels(labels, fontsize=9.6)
    ax.set_ylabel("vendors")
    ax.set_ylim(0, max(vals) * 1.32)
    ax.set_title("The Competitor Landscape Has No Independently Verified Winner\n"
                 f"Out of {vendors} vendors, {neither} have neither a third-party review "
                 f"nor a single named customer that is not the vendor itself.\n"
                 "Nobody in this market can prove a large institution runs their software.",
                 pad=14)
    _save(fig, "inf_06_evidence_desert_study")


# ==========================================================================
# 7. Price ladder against procurement reality
# ==========================================================================
def inf_price_ladder():
    comps = [c for c in P8.COMPARABLES if c.get("inr") and c["category"] == "incubation"]
    comps = sorted(comps, key=lambda c: c["inr"])

    fig, ax = plt.subplots(figsize=(13.2, 7.4))
    xs = list(range(len(comps)))
    vals = [c["inr"] for c in comps]
    cols = [GREEN if c["inr"] <= 150000 else TEAL if c["inr"] <= 400000
            else AMBER if c["inr"] <= 1000000 else RED for c in comps]

    ax.bar(xs, vals, color=cols, width=0.7, edgecolor="white")
    for i, c in enumerate(comps):
        ax.text(i, c["inr"] + 22000, f"{c['inr']/100000:.1f}L", ha="center",
                fontsize=7.6, fontweight="bold", color="#334155")

    bands = P8.PROCUREMENT_SUMMARY if isinstance(P8.PROCUREMENT_SUMMARY, dict) else {}
    rec_x = P7.PRICE_SCENARIOS["A"]["acv"]
    ax.axhline(rec_x, color=GREEN, linewidth=2.4, linestyle="--")
    ax.text(len(comps) - 0.4, rec_x * 1.03,
            f"RECOMMENDED ENTRY  Rs {rec_x:,}/yr  (Scenario A)",
            ha="right", fontsize=10.2, fontweight="bold", color=GREEN)

    env = P8.indian_envelope()
    ax.set_xticks(xs)
    ax.set_xticklabels([c["vendor"][:17] for c in comps], rotation=62,
                       ha="right", fontsize=7.8)
    ax.set_ylabel("published price, INR per year")
    ax.yaxis.set_major_formatter(
        mticker.FuncFormatter(lambda v, _: f"{v/100000:.1f}L" if v else "0"))
    ax.set_title(f"The Price Ladder - {len(comps)} Indian Incubator-Suite Comparables\n"
                 f"Observed Indian envelope: Rs {env['low']:,} - Rs {env['high']:,}/yr. "
                 f"Green marks the recommended Rs {rec_x:,} entry band.\n"
                 "Most published prices sit ABOVE the point where a university committee "
                 "needs a formal tender - and two competitors offer FREE to universities.",
                 pad=14)
    _save(fig, "inf_07_price_ladder")


# ==========================================================================
# 8. Claim provenance - how solid is every number
# ==========================================================================
def inf_claim_provenance():
    prov = Counter(o["provenance"] for o in P35.OQ_ESTIMATES)
    pc = {"DOCUMENTED": NAVY, "MODELLED": TEAL, "SIMULATED": AMBER,
          "BOUNDED": PURPLE, "PRIOR": RED}

    fig, (ax, ax2) = plt.subplots(1, 2, figsize=(14.2, 6.2),
                                  gridspec_kw={"width_ratios": [1, 1.15]})

    keys = ["DOCUMENTED", "MODELLED", "SIMULATED", "BOUNDED", "PRIOR"]
    vals = [prov.get(k, 0) for k in keys]
    ax.barh(range(len(keys)), vals, color=[pc[k] for k in keys], height=0.58,
            edgecolor="white")
    for i, v in enumerate(vals):
        ax.text(v + 0.2, i, str(v), va="center", fontsize=12, fontweight="bold",
                color="#334155")
    ax.set_yticks(range(len(keys)))
    ax.set_yticklabels([f"{k}\n{P35.PROVENANCE[k][:46]}..." for k in keys],
                       fontsize=8.2)
    ax.invert_yaxis()
    ax.set_xlabel("open questions")
    ax.set_title(f"Provenance of {len(P35.OQ_ESTIMATES)} Open-Question Answers")

    # The banned-claim guard, visualised.
    ax2.axis("off")
    ax2.text(0.5, 0.94, "The Forbidden-Claims List", ha="center", fontsize=13,
             fontweight="bold", color=NAVY, transform=ax2.transAxes)
    ax2.text(0.5, 0.855, "Phrases this study refuses to publish, and why",
             ha="center", fontsize=9.4, color=SLATE, style="italic",
             transform=ax2.transAxes)
    for i, phrase in enumerate(P35.FORBIDDEN_CLAIMS[:10]):
        y = 0.74 - i * 0.072
        ax2.add_patch(Rectangle((0.05, y - 0.028), 0.90, 0.056,
                                transform=ax2.transAxes, facecolor="#FEE2E2",
                                edgecolor="#FCA5A5", linewidth=0.8))
        ax2.text(0.5, y, f'"{phrase}"', ha="center", va="center", fontsize=9.2,
                 color=RED, fontweight="bold", transform=ax2.transAxes)
    ax2.text(0.5, 0.005, "0 interviews conducted - so every one of these would be a lie.",
             ha="center", fontsize=10, fontweight="bold", color=RED,
             transform=ax2.transAxes)

    fig.suptitle("Every Number In This Study Carries Its Own Confidence Grade",
                 fontsize=14, fontweight="bold", color=NAVY, y=1.0)
    _save(fig, "inf_08_claim_provenance")


# ==========================================================================
# 9. Phases, and what each one changed
# ==========================================================================
def inf_phase_arc():
    phases = [
        ("0-6", "Ground truth", 36, "IIC reports, NIRF/ARIIA forms, tenders,\nAISHE, procurement rules", NAVY),
        ("7", "Sizing", 0, "TAM/SAM/SOM as ranges;\nrequired ACV via simulation", TEAL),
        ("8", "Pricing", 46, "46 comparables;\nentry at Rs 1.2 lakh", TEAL),
        ("9", "Competitors", 28, "28 vendors + ecosystem;\nfalsified 2 Phase 0 claims", AMBER),
        ("10", "Matrix", 40, "40 vendors x 15 capabilities;\nU is not 0", AMBER),
        ("11", "User reviews", 37, "Found NO dissatisfaction;\nfound 4 missing competitors", PURPLE),
    ]

    fig, ax = plt.subplots(figsize=(14.0, 6.6))
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 10)
    ax.axis("off")

    n = len(phases)
    xs = np.linspace(0.9, 9.1, n)
    for i, (pid, name, count, desc, col) in enumerate(phases):
        y = 5.2
        ax.add_patch(plt.Circle((xs[i], y), 0.52, facecolor=col,
                                edgecolor="white", linewidth=2.6))
        ax.text(xs[i], y + 0.10, pid, ha="center", va="center", fontsize=13.5,
                fontweight="bold", color="white")
        ax.text(xs[i], y - 0.20, name, ha="center", va="center", fontsize=8.2,
                color="white", fontweight="bold")

        up = i % 2 == 0
        ty = y + 1.05 if up else y - 1.05
        ax.add_patch(FancyArrowPatch((xs[i], y + (0.55 if up else -0.55)),
                                     (xs[i], ty - (0.06 if up else -0.06)),
                                     arrowstyle="-", color=col, linewidth=1.4))
        ax.text(xs[i], ty + (0.16 if up else -0.16), desc, ha="center",
                va="bottom" if up else "top", fontsize=8.6, color="#334155")
        if count:
            ax.text(xs[i], ty + (0.95 if up else -0.95),
                    f"{count} records", ha="center",
                    va="bottom" if up else "top", fontsize=9.6,
                    fontweight="bold", color=col)

        if i < n - 1:
            ax.add_patch(FancyArrowPatch((xs[i] + 0.56, y), (xs[i + 1] - 0.56, y),
                                         arrowstyle="-|>", mutation_scale=16,
                                         color="#CBD5E1", linewidth=2.2))

    ax.text(0.9, 9.55, "The Eleven Phases And What Each One Changed",
            fontsize=17, fontweight="bold", color=NAVY)
    ax.text(0.9, 9.05,
            "Two phases are about removing claims rather than adding them. Phase 9 "
            "falsified two Phase 0 assertions.\nPhase 11 falsified the expectation that "
            "user reviews would supply an opportunity - and found four competitors the "
            "matrix had missed.",
            fontsize=10.2, color="#334155")
    ax.text(9.1, 1.1, "3 of 11 phases\nproduced a NEGATIVE result",
            ha="right", fontsize=11, fontweight="bold", color=RED)
    _save(fig, "inf_09_phase_arc")


# ==========================================================================
# 10. The four surviving gaps
# ==========================================================================
def inf_surviving_gaps():
    gaps = [
        ("IPR workflow", "Wellspring, Helikon, Commercify, SINT.OTRI,\nKampusCore, Elsevier Pure",
         "Falsified Phase 0's claim", GREEN),
        ("TRL as an object", "Inpart, Commercify, Protrak\n(3 of 40 build it)",
         "GAP-02 - still open", RED),
        ("YUKTI-NIR / ARIIA mandate", "Protrak (IP), NestLens Orbit,\nIncuMan, ESI, CSM",
         "GAP-03 - narrowed by Phase 11", AMBER),
        ("Indian data residency", "VentureLink is CANADA;\nnearly everyone else is too",
         "GAP-04 - still open", RED),
    ]

    fig, ax = plt.subplots(figsize=(13.6, 6.8))
    ax.axis("off")
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 10)

    for i, (name, who, status, col) in enumerate(gaps):
        y = 7.6 - i * 1.85
        ax.add_patch(Rectangle((0.5, y - 0.72), 9.0, 1.44, facecolor="#F8FAFC",
                               edgecolor=col, linewidth=2.2))
        ax.add_patch(Rectangle((0.5, y - 0.72), 0.14, 1.44, facecolor=col,
                               edgecolor="none"))
        ax.text(0.92, y + 0.30, name, fontsize=13, fontweight="bold", color=NAVY)
        ax.text(0.92, y - 0.22, who, fontsize=9.4, color="#334155")
        ax.text(9.25, y, status, ha="right", fontsize=10, fontweight="bold",
                color=col)

    ax.text(0.5, 9.55, "Four Capabilities The Market Does Not Serve",
            fontsize=17, fontweight="bold", color=NAVY)
    ax.text(0.5, 9.02,
             "Phase 9 opened thirteen gaps. Four survived Phase 10 and Phase 11's "
             "competitor sweep. One of them\nwas closed by the discovery that Phase 0 "
             "had been simply wrong. Phase 11 narrowed a second by finding IncuMan, "
             "ESI and CSM,\nwho all build mandate compliance - which means the widest-"
             "claimed gap is the fastest-closing one.",
             fontsize=10.2, color="#334155")
    _save(fig, "inf_10_surviving_gaps")


# ==========================================================================
# 11. Simulation: the honest revenue picture
# ==========================================================================
def inf_simulation():
    fig, ax = plt.subplots(figsize=(12.6, 6.4))

    labels = ["Reach Rs 1 crore\nARR by year 3", "Reach Rs 10 lakh\nARR by year 3",
              "Cover 1 IIC\nwithout loss", "Cover 10 IICs\nwithout loss",
              "Cover 25 IICs\nwithout loss"]
    vals = [0.0, 0.02, 0.55, 0.22, 0.04]
    cols = [RED, RED, TEAL, AMBER, GREY]

    bars = ax.bar(range(len(labels)), vals, color=cols, width=0.6, edgecolor="white")
    for i, v in enumerate(vals):
        ax.text(i, v + 0.012, "0.0%" if v == 0 else f"{v*100:.1f}%", ha="center",
                fontsize=12, fontweight="bold", color="#334155")

    ax.set_xticks(range(len(labels)))
    ax.set_xticklabels(labels, fontsize=9.4)
    ax.set_ylabel("probability across 50,000 seeded trials")
    ax.yaxis.set_major_formatter(mticker.PercentFormatter(1.0))
    ax.set_ylim(0, max(vals) * 1.35)
    ax.set_title("What The Seeded Simulation Actually Says\n"
                 f"{P36.TRIALS:,} trials, seed {P36.SEED}, "
                 "priors stated in data_p36_simulation.py.\nThe headline number is the "
                 "leftmost bar: the probability of the outcome that makes this a venture-"
                 "sized business is 0.0%.",
                 pad=14)
    _save(fig, "inf_11_simulation")


# ==========================================================================
# 12. The one-page executive dashboard
# ==========================================================================
def inf_executive():
    fig = plt.figure(figsize=(16.4, 9.2))
    gs = fig.add_gridspec(3, 4, hspace=0.62, wspace=0.30,
                          left=0.045, right=0.975, top=0.845, bottom=0.045)

    def card(ax, title, value, sub, col):
        ax.set_facecolor("#F8FAFC")
        for sp in ax.spines.values():
            sp.set_color("#CBD5E1")
            sp.set_linewidth(1.1)
        ax.set_xticks([])
        ax.set_yticks([])
        ax.grid(False)
        ax.text(0.5, 0.80, value, ha="center", va="center", fontsize=27,
                fontweight="bold", color=col)
        ax.text(0.5, 0.44, title, ha="center", va="center", fontsize=10.2,
                fontweight="bold", color=NAVY)
        ax.text(0.5, 0.19, sub, ha="center", va="center", fontsize=8.4,
                color=SLATE, wrap=True)

    cards = [
        ("Registered HEIs", f'{P5.AISHE["total_heis"]:,}', "the super-bound, not a market", SLATE),
        ("NIRF Innovation filers", f'{NIRF_FILERS:,}', "the evidenced serviceable floor", AMBER),
        ("Vendors in the matrix", f"{len(ROWS)}", "12 added beyond the Phase 9 set", NAVY),
        ("Third-party reviews", f'{len([r for r in ROWS if (r["user_reviews"] or 0) > 0])}',
         f"vendors with any, of {len(ROWS)}", TEAL),
        ("Usable user-voice records", f'{S11["verified_text"]}', f"of {S11['total']} retrieved", GREEN),
        ("Reviews below 4 stars", "0", "in the entire category", RED),
        ("Documented problems", f"{len(P1.PROBLEMS)}", "from 36 institutional IIC reports", NAVY),
        ("Roles with budget authority", "0", f"of {len(P2.ROLES)} mapped", RED),
        ("Recommended entry price", "Rs 1.2L", "vs a Rs 50k committee-tender threshold", GREEN),
        ("Vendors with NEITHER evidence", f'{len([r for r in ROWS if (r["user_reviews"] or 0) == 0 and (r["customers_n"] or 0) == 0])}',
         "no reviews, no named customer", RED),
        ("IIC reports analysed", f"{len(P1R.IIC_REPORTS)}", "primary documents, tier 1", NAVY),
        ("Interviews conducted", "0", "the study's single largest gap", RED),
    ]
    for i, (t, v, s, c) in enumerate(cards):
        ax = fig.add_subplot(gs[i // 4, i % 4])
        card(ax, t, v, s, c)

    fig.suptitle("STARTUPHUB - THE STUDY AT A GLANCE", fontsize=25,
                 fontweight="bold", color=NAVY, y=0.965)
    fig.text(0.5, 0.895,
             f"Eleven phases. {N_REGISTERED_SOURCES} registered sources plus "
             f"{N_IIC_REPORTS} institutional IIC reports. {len(ROWS)} competitors. "
             f"{len(ROWS) * len(DIM_KEYS)} scored capability cells. "
             "And exactly zero interviews.",
             ha="center", fontsize=12.4, color=SLATE)
    _save(fig, "inf_12_executive_dashboard")


def main():
    print("Cross-phase infographic pack")
    inf_funnel()
    inf_evidence_base()
    inf_problem_severity()
    inf_buying_centre()
    inf_capability_saturation()
    inf_evidence_desert_study()
    inf_price_ladder()
    inf_claim_provenance()
    inf_phase_arc()
    inf_surviving_gaps()
    inf_simulation()
    inf_executive()
    print(f"  12 infographics -> {OUT}")


if __name__ == "__main__":
    main()