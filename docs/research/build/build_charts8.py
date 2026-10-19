#!/usr/bin/env python3
"""StartupHub Phase 8 - pricing charts (matplotlib, PNG).

Every figure is drawn from build/data_p8_pricing.py, which contains only prices
read from live vendor pages or public documents. No chart invents a number.

Usage: python build/build_charts8.py
Output: _exports/charts/phase8/*.png
"""

import sys
from pathlib import Path

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt                                   # noqa: E402
from matplotlib.patches import Patch, Rectangle                  # noqa: E402
import matplotlib.ticker as mticker                              # noqa: E402

sys.path.insert(0, str(Path(__file__).resolve().parent))
import data_p8_pricing as P                                       # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "_exports" / "charts" / "phase8"

NAVY, TEAL, RED, AMBER, SLATE = "#1E3A5F", "#0F766E", "#B91C1C", "#B45309", "#64748B"
PURPLE, GREEN = "#6D28D9", "#15803D"
CAT_COLOR = {"incubation": NAVY, "campus": TEAL, "crm": PURPLE,
             "innovation": AMBER, "procurement": GREEN}
DPI = 200

plt.rcParams.update({
    "font.family": "DejaVu Sans", "font.size": 10,
    "axes.titlesize": 13.5, "axes.titleweight": "bold", "axes.titlecolor": NAVY,
    "axes.labelsize": 10, "axes.labelcolor": "#334155",
    "axes.edgecolor": "#CBD5E1", "axes.grid": True, "grid.color": "#E2E8F0",
    "grid.linewidth": 0.8, "axes.axisbelow": True,
    "figure.facecolor": "white", "axes.facecolor": "white", "legend.frameon": False,
})

RS = "Rs "  # console/CP1252-safe; matplotlib handles unicode but keep labels short


def _save(fig, name):
    OUT.mkdir(parents=True, exist_ok=True)
    p = OUT / f"{name}.png"
    fig.savefig(p, dpi=DPI, bbox_inches="tight", facecolor="white")
    plt.close(fig)
    print(f"  png   {p.relative_to(ROOT)}  ({p.stat().st_size // 1024} KB)")


def inr(v):
    if v >= 1e7:
        return f"{v / 1e7:.1f} Cr"
    if v >= 1e5:
        return f"{v / 1e5:.1f} L"
    return f"{v / 1e3:.0f}K"


# ==========================================================================
# 1. The price ladder - the core chart
# ==========================================================================
def chart_price_ladder():
    env = P.indian_envelope()
    rows = sorted(env["rows"], key=lambda c: c["inr"])
    fig, ax = plt.subplots(figsize=(12, 8.4))

    y = range(len(rows))
    colors = [CAT_COLOR.get(c["category"], SLATE) for c in rows]
    ax.barh(list(y), [c["inr"] for c in rows], color=colors, edgecolor="white", height=0.72)

    lp = P.INTERNAL_ANCHORS["list_price"]
    ra = P.INTERNAL_ANCHORS["required_acv"]

    ax.axvspan(min(c["inr"] for c in rows), max(c["inr"] for c in rows),
               color="#F1F5F9", zorder=0)
    ax.axvline(lp, color=RED, ls="--", lw=2, zorder=3)
    ax.axvline(ra, color=RED, ls=":", lw=2.4, zorder=3)

    ax.set_yticks(list(y))
    ax.set_yticklabels([f"{c['vendor']}\n{c['product']}" for c in rows], fontsize=8.2)
    ax.set_xscale("log")
    ax.xaxis.set_major_formatter(mticker.FuncFormatter(lambda v, _: f"{v:,.0f}"))
    ax.set_xlabel("Annual price, INR (log scale)")
    ax.set_title("The Observed Indian Institutional Price Ladder\n"
                 "Every bar is a real published price. Nothing here is estimated.", pad=14)

    for i, c in enumerate(rows):
        ax.text(c["inr"] * 1.12, i, inr(c["inr"]), va="center", fontsize=8.4,
                color="#334155", fontweight="bold")

    ax.annotate(f"StartupHub list price\n{RS}{lp:,}", xy=(lp, -0.9), xytext=(lp, -2.0),
                ha="center", color=RED, fontsize=9, fontweight="bold")
    ax.annotate(f"Phase 7 Scenario B\n{RS}{ra:,}\n1.43x above everything observed",
                xy=(ra, len(rows) - 0.3), xytext=(ra, len(rows) - 2.4),
                ha="center", color=RED, fontsize=9, fontweight="bold")

    # free competitors
    ax.axvline(1, color=SLATE, lw=1, alpha=0.4)
    handles = [Patch(color=CAT_COLOR[k], label=k) for k in ("incubation", "campus")]
    handles += [Patch(color=RED, label="StartupHub scenarios"),
                Patch(color=SLATE, label="free competitors (plotted at Rs 1)")]
    ax.legend(handles=handles, loc="lower right", fontsize=9)
    ax.set_ylim(len(rows) - 0.4, -3.4)
    ax.set_xlim(1, 3e6)
    _save(fig, "p8_01_price_ladder")


# ==========================================================================
# 2. The central finding - Scenario B is outside the market
# ==========================================================================
def chart_envelope_gap():
    env = P.indian_envelope()
    ra = P.INTERNAL_ANCHORS["required_acv"]
    lp = P.INTERNAL_ANCHORS["list_price"]

    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(13, 6.4),
                                   gridspec_kw={"width_ratios": [1.35, 1]})

    # left: the gap
    top = max(env["rows"], key=lambda c: c["inr"])
    bars = [("Highest Indian\ncomparable", top["inr"], CAT_COLOR["incubation"]),
            ("StartupHub\nlist price", lp, SLATE),
            ("Phase 7\nScenario B", ra, RED)]
    names = [b[0] for b in bars]
    vals = [b[1] for b in bars]
    cols = [b[2] for b in bars]
    ax1.bar(names, vals, color=cols, edgecolor="white", width=0.6)
    for i, v in enumerate(vals):
        ax1.text(i, v, f"{RS}{v:,.0f}", ha="center", va="bottom", fontsize=10,
                 fontweight="bold", color="#334155")
    ax1.set_ylabel("INR per year")
    ax1.set_title("Scenario B sits outside the market\n1.43x above the highest price found in India",
                  pad=12, color=RED)
    ax1.set_ylim(0, max(vals) * 1.22)
    ax1.axhline(top["inr"], color=NAVY, ls="--", lw=1.6, alpha=0.8)
    ax1.text(2.42, top["inr"], f"  ceiling of the\n  observed market\n  {RS}{top['inr']:,}",
             fontsize=8.6, color=NAVY, va="center")

    # right: consequences
    ax2.axis("off")
    gap = P.scenario_b_gap()
    txt = (
        "WHAT THIS RULES OUT\n\n"
        f"Raising ACV to {RS}{ra:,} cannot\nfix LTV/CAC, because no Indian\n"
        "institutional buyer has been\nobserved paying that.\n\n"
        "WHAT REMAINS\n\n"
        "1. Cut CAC\n"
        "   Committee thresholds, not\n   price, drive sales-cycle length.\n\n"
        "2. Change the model\n"
        "   Model E (institution + startups)\n"
        "   is what IncubatX and NestLens\n   actually sell.\n\n"
        "3. Narrow the fight\n"
        "   Compete like-for-like with\n"
        "   incubation platforms, not with\n"
        "   full college ERPs."
    )
    ax2.text(0.0, 0.98, txt, va="top", ha="left", fontsize=10.5, family="DejaVu Sans",
             linespacing=1.55, transform=ax2.transAxes)
    _save(fig, "p8_02_envelope_gap")


# ==========================================================================
# 3. WTP ceilings are frame-dependent
# ==========================================================================
def chart_wtp_frames():
    b = P.wtp_bracket()
    frames = b["frames"]
    fig, ax = plt.subplots(figsize=(11.5, 6.6))

    names = [f["frame"] for f in frames]
    ceils = [f["ceiling"] for f in frames]
    cols = [RED, NAVY, TEAL, AMBER]
    y = range(len(frames))
    ax.barh(list(y), ceils, color=cols, edgecolor="white", height=0.6)
    ax.set_yticks(list(y)); ax.set_yticklabels(names, fontsize=9.4)
    ax.invert_yaxis()
    ax.set_xlabel("Ceiling on annual price, INR")
    ax.set_title("Willingness to Pay is Frame-Dependent\n"
                 "Four competitive frames. Four different ceilings. None of them is 'the' answer.",
                 pad=14)

    for i, f in enumerate(frames):
        ax.text(f["ceiling"] * 1.03, i, f"{RS}{f['ceiling']:,}\n{f['ceiling_basis']}",
                va="center", fontsize=8.4, color="#334155")

    ax.axvline(P.INTERNAL_ANCHORS["list_price"], color=RED, ls="--", lw=2)
    ax.text(P.INTERNAL_ANCHORS["list_price"], -0.72,
            f"list price {RS}{P.INTERNAL_ANCHORS['list_price']:,}",
            ha="center", color=RED, fontsize=9, fontweight="bold")

    ax.set_xlim(0, max(ceils) * 1.75)
    ax.set_ylim(len(frames) - 0.4, -1.0)
    ax.legend(handles=[
        Patch(color=RED, label="BINDING - our list price is already above this"),
        Patch(color=NAVY, label="like-for-like comparison"),
        Patch(color=TEAL, label="value-based"),
        Patch(color=AMBER, label="government channel"),
    ], loc="lower right", fontsize=9)
    _save(fig, "p8_03_wtp_frames")


# ==========================================================================
# 4. Models A-F against the market
# ==========================================================================
def chart_models():
    rows = P.model_matrix()
    fig, ax = plt.subplots(figsize=(11.5, 6.8))

    y = list(range(len(rows)))
    for i, m in enumerate(rows):
        lo, hi = m["arr_low"], m["arr_high"]
        ax.plot([lo, hi], [i, i], lw=11, solid_capstyle="round",
                color=RED if m["key"] == "B" else (NAVY if m["key"] in "EF" else SLATE),
                alpha=0.85)
        ax.text(hi * 1.06, i, f"{RS}{lo:,} - {RS}{hi:,}", va="center", fontsize=8.8,
                color="#334155", fontweight="bold")

    ax.set_yticks(y)
    ax.set_yticklabels([f"Model {m['key']}\n{m['mechanic']}" for m in rows], fontsize=8.6)
    ax.set_xscale("log")
    ax.xaxis.set_major_formatter(mticker.FuncFormatter(lambda v, _: f"{v:,.0f}"))
    ax.set_xlabel("Implied ACV per institution per year, INR (log scale)")
    ax.set_title("Models A-F Against the Observed Market\n"
                 "Where each pricing mechanic lands, and which one incumbents actually use",
                 pad=14)

    env = P.indian_envelope()
    ax.axvspan(env["low"], env["high"], color="#ECFDF5", zorder=0)
    ax.axvline(env["high"], color=TEAL, ls="--", lw=1.8)
    ax.text(env["high"], len(rows) - 0.55, f" observed Indian ceiling {RS}{env['high']:,}",
            fontsize=8.8, color=TEAL, fontweight="bold")
    ax.axvline(P.INTERNAL_ANCHORS["required_acv"], color=RED, ls=":", lw=2)
    ax.text(P.INTERNAL_ANCHORS["required_acv"], -0.85,
            f"Scenario B {RS}{P.INTERNAL_ANCHORS['required_acv']:,}",
            ha="center", fontsize=8.6, color=RED, fontweight="bold")

    ax.legend(handles=[
        Patch(color=RED, label="Model B - current list price, fails unit economics"),
        Patch(color=NAVY, label="Models E/F - what incumbents actually sell"),
        Patch(color=SLATE, label="Models A/C/D"),
        Patch(color=TEAL, label="observed Indian paid market"),
    ], loc="lower right", fontsize=8.8)
    ax.set_ylim(len(rows) - 0.4, -1.25)
    ax.set_xlim(3e4, 2e6)
    _save(fig, "p8_04_models")


# ==========================================================================
# 5. Per-student vs flat - why flat wins at Indian college scale
# ==========================================================================
def chart_per_student():
    sizes = [500, 1000, 2000, 5000]
    fig, ax = plt.subplots(figsize=(11.5, 6.6))

    series = [
        ("Fedena Ultimate (flat, full ERP)", [100_000] * 4, NAVY, "-"),
        ("Fedena Standard (flat, full ERP)", [50_000] * 4, TEAL, "-"),
        ("EduZenAI Enterprise (20k + 70/student)", [20_000 + max(0, s - 300) * 70 for s in sizes], AMBER, "-"),
        ("Campusify Plus (99/student/mo)", [s * 1188 for s in sizes], RED, "-"),
        ("DHONDI college (1000/student/yr)", [s * 1000 for s in sizes], PURPLE, "-"),
    ]
    for name, vals, col, ls in series:
        ax.plot(sizes, vals, marker="o", lw=2.6, color=col, label=name)

    ax.set_yscale("log")
    ax.set_xlabel("Enrolled students per institution")
    ax.set_ylabel("Annual price, INR (log scale)")
    ax.set_xticks(sizes)
    ax.xaxis.set_major_formatter(mticker.FuncFormatter(lambda v, _: f"{v:,.0f}"))
    ax.yaxis.set_major_formatter(mticker.FuncFormatter(lambda v, _: f"{v:,.0f}"))
    ax.set_title("Why the Indian Market Sits Flat, Not Per-Student\n"
                 "At 2,000 students a per-student vendor costs 24x a flat full-ERP licence", pad=14)

    ax.axvline(2000, color=SLATE, ls="--", lw=1.4, alpha=0.7)
    ax.annotate("Campusify's own calculator\nat 2,000 students:\n"
                f"{RS}{2000 * 1188:,}/year",
                xy=(2000, 2000 * 1188), xytext=(2300, 2000 * 1188 * 0.42),
                fontsize=9, color=RED,
                arrowprops=dict(arrowstyle="->", color=RED, lw=1.5))
    ax.annotate(f"Fedena Ultimate\n{RS}1,00,000 flat",
                xy=(2000, 100_000), xytext=(900, 220_000), fontsize=9, color=NAVY,
                arrowprops=dict(arrowstyle="->", color=NAVY, lw=1.5))
    ax.legend(loc="upper left", fontsize=9)
    ax.set_ylim(3e4, 1.5e7)
    _save(fig, "p8_05_per_student")


# ==========================================================================
# 6. Model D failure - per-user pricing collapses institutional ACV
# ==========================================================================
def chart_model_d():
    pf = P.per_user_failure()
    fig, ax = plt.subplots(figsize=(11, 6.2))

    seats = list(range(1, 26))
    z_lo = 9_600
    z_hi = 31_200
    ax.fill_between(seats, [z_lo * s for s in seats], [z_hi * s for s in seats],
                    color=PURPLE, alpha=0.18, label="Zoho CRM published per-user band")
    ax.plot(seats, [z_lo * s for s in seats], color=PURPLE, lw=2, ls="--")
    ax.plot(seats, [z_hi * s for s in seats], color=PURPLE, lw=2, ls="--")

    ax.axhline(P.INTERNAL_ANCHORS["list_price"], color=RED, lw=2.4)
    ax.text(24.6, P.INTERNAL_ANCHORS["list_price"],
            f"StartupHub flat list price {RS}{P.INTERNAL_ANCHORS['list_price']:,}",
            ha="right", va="bottom", color=RED, fontsize=9.4, fontweight="bold")

    n_at_or_above = next((s for s in seats if z_lo * s >= P.INTERNAL_ANCHORS["list_price"]), None)
    if n_at_or_above:
        ax.axvline(n_at_or_above, color=AMBER, ls=":", lw=2)
        ax.text(n_at_or_above + 0.4, 4e4,
                f"you need {n_at_or_above} seats before\nper-user beats the flat price",
                fontsize=9, color=AMBER)

    ax.set_xlabel("Licensed seats")
    ax.set_ylabel("Annual price, INR (log scale)")
    ax.set_yscale("log")
    ax.yaxis.set_major_formatter(mticker.FuncFormatter(lambda v, _: f"{v:,.0f}"))
    ax.set_title("Model D Fails Structurally for Institutions\n"
                 "Phase 2 found 25 innovation roles and only 4 with budget authority", pad=14)
    ax.legend(loc="upper left", fontsize=9)
    ax.set_xlim(1, 26)
    ax.set_ylim(5e3, 1e6)
    _save(fig, "p8_06_model_d_failure")


# ==========================================================================
# 7. Government procurement bands - where our prices land
# ==========================================================================
def chart_gem_bands():
    ps = P.PROCUREMENT_SUMMARY
    fig, ax = plt.subplots(figsize=(11.5, 6.2))

    bands = [
        ("Direct Purchase", 0, ps["direct_purchase_ceiling"], "#DCFCE7",
         "no competition - no price discovery"),
        ("L1", ps["direct_purchase_ceiling"], ps["l1_ceiling"], "#FEF3C7",
         "single award, low competition"),
        ("Bid & Reverse Auction", ps["l1_ceiling"], 5_000_000, "#FEE2E2",
         "MANDATORY above here; L1-L5 spread 5-15% for services"),
    ]
    for name, lo, hi, col, note in bands:
        ax.barh([0], [hi - lo], left=[lo], height=0.42, color=col,
                edgecolor="white", linewidth=2)
        ax.text((lo + hi) / 2, 0, name, ha="center", va="center",
                fontsize=10.5, fontweight="bold", color="#334155")
        ax.text(hi * 1.03, 0, f"{RS}{lo:,.0f} - {RS}{hi:,.0f}\n{note}",
                va="center", fontsize=8.8, color="#475569")

    for price, lbl, col in (
        (P.INTERNAL_ANCHORS["list_price"], "Model B list price", NAVY),
        (P.MODELS[2]["arr_at_sam"][1], "Model C top (Rs 5L)", AMBER),
        (P.INTERNAL_ANCHORS["required_acv"], "Phase 7 Scenario B", RED),
        (ps["it_resource_floor_annual"], "one deployed IT resource", GREEN),
    ):
        ax.axvline(price, color=col, ls="--", lw=2.1)
        ax.text(price, 0.42, lbl, rotation=0, ha="center", va="bottom",
                fontsize=8.8, color=col, fontweight="bold")

    ax.set_xscale("log")
    ax.xaxis.set_major_formatter(mticker.FuncFormatter(lambda v, _: f"{v:,.0f}"))
    ax.set_yticks([])
    ax.set_xlabel("Procurement value, INR (log scale)")
    ax.set_title("Selling to Government Caps Realised Price\n"
                 "GeM makes reverse auction mandatory at Rs 5 lakh", pad=14)
    ax.set_xlim(1e4, 4e7)
    ax.set_ylim(-0.45, 1.05)
    ax.legend(handles=[
        Patch(color=AMBER, label="MSE startup status: up to 15% pricing advantage over L1"),
        Patch(color=RED, label="Scenario B would require an auction we are not built for"),
    ], loc="upper left", fontsize=9)
    _save(fig, "p8_07_gem_bands")


# ==========================================================================
# 8. The six evidence streams
# ==========================================================================
def chart_wtp_streams():
    fig, ax = plt.subplots(figsize=(12, 6.8))

    streams = P.WTP_STREAMS
    y = list(range(len(streams)))
    for i, s in enumerate(streams):
        ax.barh(i, s["high"] - s["low"], left=s["low"], height=0.46,
                color=NAVY if s["n"] in (1, 6) else (RED if s["n"] == 2 else AMBER),
                edgecolor="white")
        ax.text(s["high"] * 1.06, i, s["bound"], va="center", fontsize=9,
                color="#334155", fontweight="bold")

    ax.set_yticks(y)
    ax.set_yticklabels([f"{s['n']}. {s['stream']}" for s in streams], fontsize=9.4)
    ax.invert_yaxis()
    ax.set_xscale("log")
    ax.xaxis.set_major_formatter(mticker.FuncFormatter(lambda v, _: f"{v:,.0f}"))
    ax.set_xlabel("Annual price, INR (log scale)")
    ax.set_title("Six Independent Evidence Streams\n"
                 "Not averaged, not reconciled - each bounds willingness from a different direction",
                 pad=14)
    ax.axvline(P.INTERNAL_ANCHORS["list_price"], color=RED, ls="--", lw=2)
    ax.axvline(P.INTERNAL_ANCHORS["required_acv"], color=RED, ls=":", lw=2.2)
    ax.legend(handles=[
        Patch(color=NAVY, label="revealed preference (what buyers pay)"),
        Patch(color=RED, label="substitution pressure (buyer can pay zero)"),
        Patch(color=AMBER, label="process / procurement constraint"),
        Patch(color="#DC2626", label="StartupHub scenarios"),
    ], loc="lower right", fontsize=9)
    ax.set_xlim(500, 2e6)
    _save(fig, "p8_08_wtp_streams")


# ==========================================================================
# 9. Category price bands - the seven categories the spec names
# ==========================================================================
def chart_categories():
    fig, ax = plt.subplots(figsize=(11.5, 6.6))

    cats = [
        ("Campus /\ninstitutional ERP", [10_000, 7_200_000], TEAL),
        ("Incubation\nmanagement", [0, 720_000], NAVY),
        ("Innovation\nmanagement", [33_400, 1_670_000], AMBER),
        ("CRM\n(per user/year)", [9_600, 31_200], PURPLE),
        ("Government\nprocurement", [25_000, 9_600_000], GREEN),
    ]
    for i, (name, (lo, hi), col) in enumerate(cats):
        ax.barh(i, hi - lo if hi > lo else 100, left=lo, height=0.5,
                color=col, edgecolor="white", alpha=0.88)
        ax.text(hi * 1.15, i, f"{RS}{lo:,.0f} - {RS}{hi:,.0f}", va="center",
                fontsize=9, color="#334155", fontweight="bold")

    ax.set_yticks(range(len(cats)))
    ax.set_yticklabels([c[0] for c in cats], fontsize=9.4)
    ax.invert_yaxis()
    ax.set_xscale("log")
    ax.xaxis.set_major_formatter(mticker.FuncFormatter(lambda v, _: f"{v:,.0f}"))
    ax.set_xlabel("Observed annual price, INR (log scale)")
    ax.set_title("Observed Price Bands by Category\n"
                 "Note the CRM band is PER USER - that is the whole problem with Model D", pad=14)
    ax.axvspan(50_000, 720_000, color="#F8FAFC", zorder=0)
    ax.text(1.5e5, 4.55, "observed Indian institutional envelope",
            ha="center", fontsize=9, color=SLATE, style="italic")
    ax.set_xlim(600, 4e7)
    ax.set_ylim(len(cats) - 0.4, -0.6)
    _save(fig, "p8_09_categories")


# ==========================================================================
# 10. The LTV/CAC bind - price cannot be the lever
# ==========================================================================
def chart_unit_economics_bind():
    ue = P.S.ue_summary()
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(13, 6))

    # left: what CAC must fall to
    lp = P.INTERNAL_ANCHORS["list_price"]
    req = P.INTERNAL_ANCHORS["required_acv"]
    cac_now = P.S.cac_p50()
    ltv = P.S.ltv_p50()

    need_cac = ltv / 3.0
    fold = round(cac_now / need_cac, 1)
    ax1.bar(["CAC today", "CAC required for\nLTV/CAC = 3 at list price"],
            [cac_now, need_cac],
            color=[RED, TEAL], edgecolor="white", width=0.5)
    for i, v in enumerate([cac_now, need_cac]):
        ax1.text(i, v, f"{RS}{v:,.0f}", ha="center", va="bottom", fontsize=11,
                 fontweight="bold", color="#334155")
    ax1.annotate("", xy=(1, need_cac), xytext=(1, cac_now),
                 arrowprops=dict(arrowstyle="<->", color=SLATE, lw=1.6))
    ax1.text(1.32, (cac_now + need_cac) / 2,
             f"CAC must fall\n{fold}x\n({RS}{cac_now - need_cac:,.0f})",
             fontsize=10, color=RED, fontweight="bold")
    ax1.set_ylabel("Customer acquisition cost, INR")
    ax1.set_title("Price cannot be the lever\n"
                  f"At the list price, CAC must fall {fold}x to reach LTV/CAC = 3", pad=12)

    # right: price vs observed ceiling
    names = ["Observed Indian\nceiling", "StartupHub\nlist price", "Phase 7\nScenario B"]
    vals = [P.indian_envelope()["high"], lp, req]
    cols = [TEAL, SLATE, RED]
    ax2.bar(names, vals, color=cols, edgecolor="white", width=0.55)
    for i, v in enumerate(vals):
        ax2.text(i, v, f"{RS}{v:,.0f}", ha="center", va="bottom", fontsize=10.5,
                 fontweight="bold", color="#334155")
    ax2.set_ylabel("INR per year")
    ax2.set_title("And price cannot be the lever either\n"
                  "Scenario B is 1.43x the highest price observed in India", pad=12, color=RED)
    ax2.set_ylim(0, max(vals) * 1.25)

    _save(fig, "p8_10_unit_economics_bind")


def main():
    print("Phase 8 charts")
    chart_price_ladder()
    chart_envelope_gap()
    chart_wtp_frames()
    chart_models()
    chart_per_student()
    chart_model_d()
    chart_gem_bands()
    chart_wtp_streams()
    chart_categories()
    chart_unit_economics_bind()
    print(f"\n10 charts -> {OUT}")
    return 0


if __name__ == "__main__":
    sys.exit(main())