#!/usr/bin/env python3
"""StartupHub research — data charts (matplotlib, PNG).

Usage: python build/build_charts.py
Output: _exports/charts/*.png
"""

import sys
from pathlib import Path

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt                              # noqa: E402
from matplotlib.patches import Patch                        # noqa: E402
import matplotlib.ticker as mticker                         # noqa: E402

sys.path.insert(0, str(Path(__file__).resolve().parent))
from data_market import SEGMENTS, PRICING, PRICING_FIELDS, GAPS   # noqa: E402
from data_competition import COMPETITORS, FEATURE_KEYS, OPEN_QUESTIONS   # noqa: E402
from data_governance import PROBLEMS                        # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "_exports" / "charts"

NAVY, TEAL, RED, AMBER, SLATE = "#1E3A5F", "#0F766E", "#B91C1C", "#B45309", "#64748B"
DPI = 200

plt.rcParams.update({
    "font.family": "DejaVu Sans", "font.size": 10,
    "axes.titlesize": 14, "axes.titleweight": "bold", "axes.titlecolor": NAVY,
    "axes.labelsize": 10, "axes.labelcolor": "#334155",
    "axes.edgecolor": "#CBD5E1", "axes.grid": True, "grid.color": "#E2E8F0",
    "grid.linewidth": 0.8, "axes.axisbelow": True,
    "figure.facecolor": "white", "axes.facecolor": "white",
    "legend.frameon": False,
})


def _save(fig, name, dpi=DPI):
    OUT.mkdir(parents=True, exist_ok=True)
    p = OUT / f"{name}.png"
    fig.savefig(p, dpi=dpi, bbox_inches="tight", facecolor="white")
    plt.close(fig)
    print(f"  png   {p.relative_to(ROOT)}  ({p.stat().st_size//1024} KB)")


# ----------------------------------------------------------------------------
def chart_segment_sizes():
    """Segment sizes span three orders of magnitude — the reason not to narrow."""
    rows = [s for s in SEGMENTS if s["count"] and s["count"] >= 74]
    rows = sorted(rows, key=lambda s: s["count"], reverse=True)
    fig, ax = plt.subplots(figsize=(11, 6.5))
    colors = [NAVY if s["conflict"] is False else AMBER for s in rows]
    y = range(len(rows))
    labels = [f"{s['segment']}  ({s['as_of']})" for s in rows]
    ax.barh(list(y), [s["count"] for s in rows], color=colors, edgecolor="white", height=0.72)
    ax.set_yticks(list(y)); ax.set_yticklabels(labels, fontsize=9)
    ax.invert_yaxis()
    ax.set_xscale("log")
    ax.xaxis.set_major_formatter(mticker.FuncFormatter(lambda v, _: f"{v:,.0f}"))
    ax.set_xlabel("Count (log scale — segment sizes span three orders of magnitude)")
    ax.set_title("Segment Census — India\nHow big is each segment, really?", pad=14)
    for i, s in enumerate(rows):
        ax.text(s["count"] * 1.15, i, f"{s['count']:,}", va="center", fontsize=8.5, color="#334155")
    ax.legend(handles=[Patch(color=NAVY, label="Single agreed figure"),
                       Patch(color=AMBER, label="⚠ Sources CONFLICT — do not collapse")],
              loc="lower right", fontsize=9)
    ax.set_xlim(50, 400000)
    _save(fig, "01_segment_sizes")


def chart_price_band():
    """The defensible price band. Log scale cannot plot 0, so the free tier is drawn as a floor stub."""
    bands = [
        ("Free incumbents\nExcel / Sheets / WhatsApp", 45000, "#94A3B8", "₹0"),
        ("The floor we can't undercut\nTrello @10 users", 54000, "#F59E0B", "₹54k"),
        ("ORBIT LAUNCH — competitive anchor", 75000, "#DC2626", "₹75,000"),
        ("Notion Plus @8 editors", 86400, "#F59E0B", "₹86k"),
        ("todo.md assumption — UNVALIDATED", 120000, "#A855F7", "₹1.2L"),
        ("IncubatX Foundation", 150000, "#F59E0B", "₹1.5L"),
        ("Founderhood Starter −15% (university)", 182070, "#F59E0B", "₹1.82L"),
        ("Orbit Scale", 250000, "#F59E0B", "₹2.5L"),
        ("Incubatee year one", 395200, "#F59E0B", "₹3.95L"),
        ("AcceleratorApp core (ISO 27001)", 539000, "#F59E0B", "₹5.4L"),
        ("IdeaScale entry", 585000, "#F59E0B", "₹5.85L"),
        ("Elsevier Pure — min Indian deployment", 4460000, "#475569", "₹44.6L"),
    ]
    fig, ax = plt.subplots(figsize=(12, 7))
    ax.bar(range(len(bands)), [b[1] for b in bands],
           color=[b[2] for b in bands], edgecolor="white", width=0.7)
    ax.set_yscale("log")
    ax.set_ylim(30000, 12000000)
    ax.yaxis.set_major_formatter(mticker.FuncFormatter(
        lambda v, _: f"₹{v/100000:.0f}L" if v >= 100000 else f"₹{v/1000:.0f}k"))
    ax.set_ylabel("INR per year (log scale)")
    ax.set_xticks(range(len(bands)))
    ax.set_xticklabels([b[0] for b in bands], rotation=38, ha="right", fontsize=8.5)
    for i, b in enumerate(bands):
        ax.text(i, b[1] * 1.18, b[3], ha="center", fontsize=8.5, fontweight="bold", color="#1E293B")
    ax.axhspan(75000, 500000, color="#DC2626", alpha=0.08)
    ax.text(0.3, 310000, "THE DEFENSIBLE BAND  ₹75k – ₹5L", fontsize=11,
            color="#DC2626", fontweight="bold", alpha=0.95)
    ax.axhline(120000, color="#A855F7", ls=":", lw=2)
    ax.set_title("The Price Band — StartupHub's competitive position\n"
                 "todo.md's ₹1.2L assumption sits ABOVE the cheapest credible Indian incumbent",
                 pad=14)
    _save(fig, "02_price_band", dpi=140)


def chart_gap_matrix():
    """Three capability columns are entirely zero."""
    direct = [c for c in COMPETITORS if c["category"] in ("Direct", "Direct / Global")]
    keys = ["portfolio", "incubation", "panel_eval_audit", "mentorship", "ipr", "trl",
            "resources", "programme", "milestones", "funding_ledger", "reporting", "ai",
            "integrations", "india_compliance", "mandated_export"]
    short = ["Portfolio", "Incubation", "Panel+audit", "Mentorship", "IPR", "TRL", "Resources",
             "Programme", "Milestones", "Funding", "Reporting", "AI", "Integrations",
             "India compliance", "MANDATED EXPORT"]
    fig, ax = plt.subplots(figsize=(13, 7.5))
    cmap = matplotlib.colors.ListedColormap(["#FCA5A5", "#FDE68A", "#BFDBFE", "#86EFAC"])
    m = [[c[k] for k in keys] for c in direct]
    im = ax.imshow(m, cmap=cmap, vmin=0, vmax=3, aspect="auto")
    ax.set_xticks(range(len(keys))); ax.set_xticklabels(short, rotation=42, ha="right", fontsize=9)
    ax.set_yticks(range(len(direct))); ax.set_yticklabels([c["name"] for c in direct], fontsize=9)
    for i in range(len(direct)):
        for j in range(len(keys)):
            v = m[i][j]
            ax.text(j, i, "○" if v == 0 else ("◐" if v == 1 else ("●" if v == 2 else "◎")),
                    ha="center", va="center", fontsize=9,
                    color="#7F1D1D" if v == 0 else "#1E293B", fontweight="bold" if v == 0 else "normal")
    ax.grid(False)
    # highlight the three empty columns
    for k in ("ipr", "trl", "mandated_export"):
        j = keys.index(k)
        ax.add_patch(plt.Rectangle((j - 0.5, -0.5), 1, len(direct) + 1, fill=False,
                                   edgecolor="#DC2626", lw=2.5))
    ax.set_title("Competitor Feature Matrix — 11 direct vendors\n"
                 "Red boxes: ZERO of eleven have these three. India mandates all three.", pad=14, color=NAVY)
    ax.legend(handles=[
        Patch(color="#FCA5A5", label="○ Absent"), Patch(color="#FDE68A", label="◐ Partial"),
        Patch(color="#BFDBFE", label="● Good"), Patch(color="#86EFAC", label="◎ Strong"),
        Patch(facecolor="none", edgecolor="#DC2626", label="Nobody has this")],
        loc="upper center", bbox_to_anchor=(0.5, -0.20), ncol=5, fontsize=9)
    _save(fig, "03_gap_matrix")


def chart_india_startups():
    rows = [("Maharashtra", 38660), ("Karnataka", 22600), ("Uttar Pradesh", 21960),
            ("Delhi", 21120), ("Gujarat", 19270), ("Tamil Nadu", 14830),
            ("Telangana", 12520), ("Haryana", 11620), ("Kerala", 8620), ("Rajasthan", 8100)]
    fig, ax = plt.subplots(figsize=(10, 5.5))
    names = [r[0] for r in rows]; vals = [r[1] for r in rows]
    ax.barh(names[::-1], vals[::-1], color=[f"{TEAL}{int(200 - i*14):02x}" for i in range(len(names))],
            edgecolor="white", height=0.72)
    ax.set_xlabel("DPIIT-recognised startups (as of 31 March 2026)")
    ax.set_title("DPIIT-recognised startups by State — top 10 published\n"
                 "2.23 lakh+ nationally; 23.36 lakh+ direct jobs; 1.07 lakh (48%) women-led", pad=14)
    ax.xaxis.set_major_formatter(mticker.FuncFormatter(lambda v, _: f"{v/1000:.0f}k"))
    for i, v in enumerate(vals[::-1]):
        ax.text(v + 500, i, f"{v:,}", va="center", fontsize=9, color="#334155")
    ax.set_xlim(0, 46000)
    _save(fig, "04_startups_by_state")


def chart_competitor_positioning():
    """India-compliance depth vs institutional credibility."""
    pts = {
        "NestLens Orbit": (78, 45, "#DC2626"), "EcoSync": (72, 28, "#DC2626"),
        "IncubatX": (80, 15, "#DC2626"), "Incubatee": (45, 32, "#DC2626"),
        "Accubate": (40, 62, "#DC2626"), "AcceleratorApp": (18, 78, "#DC2626"),
        "Gohorto": (22, 14, "#DC2626"), "Founderhood": (28, 35, "#DC2626"),
        "VentureLink": (15, 10, "#DC2626"), "incuTrack": (10, 48, "#DC2626"),
        "RiserNest": (20, 30, "#DC2626"), "Innoloft/LoftOS": (12, 55, "#F59E0B"),
        "Notion/Airtable": (5, 22, "#94A3B8"), "Excel/Sheets/WhatsApp": (2, 8, "#94A3B8"),
    }
    fig, ax = plt.subplots(figsize=(11.5, 8))
    ax.axvspan(0, 50, color="#94A3B8", alpha=0.10); ax.axvspan(50, 100, color="#10B981", alpha=0.10)
    ax.axhspan(0, 45, color="#94A3B8", alpha=0.08); ax.axhspan(45, 100, color="#F59E0B", alpha=0.10)
    for name, (x, y, c) in pts.items():
        big = name.startswith("Excel")
        ax.scatter(x, y, s=340 if big else 170, color=c, edgecolor="white", lw=2, zorder=5,
                   alpha=0.95 if big else 0.9)
        ax.annotate(name, (x, y), xytext=(7, 6), textcoords="offset points",
                    fontsize=9, fontweight="bold" if big else "normal", color="#1E293B")
    ax.scatter(92, 72, s=460, marker="*", color="#16A34A", edgecolor="white", lw=2, zorder=6)
    ax.annotate("STARTUPHUB TARGET", (92, 72), xytext=(-118, 12), textcoords="offset points",
                fontsize=11, fontweight="bold", color="#15803D")
    ax.text(25, 93, "CREDIBILITY, NO INDIA", ha="center", fontsize=11, fontweight="bold", color=SLATE)
    ax.text(75, 93, "DEFEND THIS", ha="center", fontsize=11, fontweight="bold", color="#15803D")
    ax.text(25, 3, "FREE TIER ZONE — nobody leaves by being cheaper", ha="center",
            fontsize=10, fontweight="bold", color="#64748B")
    ax.text(75, 3, "⚠ CONTESTED — Orbit's ground", ha="center", fontsize=10, fontweight="bold", color="#B45309")
    ax.set_xlim(-4, 104); ax.set_ylim(-2, 100)
    ax.set_xlabel("India-compliance depth  (GST/TDS/UPI · named schemes · mandated-portal export) →")
    ax.set_ylabel("Institutional credibility  →")
    ax.set_title("Competitive Positioning — Indian institutional innovation management\n"
                 "Target is unreachable by feature parity: Orbit and IncubatX already ship "
                 "\"AI + government schemes\"", pad=14)
    _save(fig, "05_competitor_positioning")


def chart_problem_evidence():
    rows = sorted(PROBLEMS, key=lambda p: -p["evidence_count"])
    colour = {"DOCUMENTARY": "#15803D", "INFERRED": "#D97706", "ASSUMED": "#DC2626"}
    fig, ax = plt.subplots(figsize=(11, 6.5))
    labels = [f"{p['num']}. {p['area']}" for p in rows]
    vals = [p["evidence_count"] for p in rows]
    cols = [colour[p["grade"]] for p in rows]
    ax.barh(labels, vals, color=cols, edgecolor="white", height=0.7)
    ax.set_xlabel("Independent documentary citations (Tier 1 government sources)")
    ax.set_title("Problem Evidence Register — which problems are documented and which are assumed\n"
                 "⚠ We have interviewed ZERO institutions. None of these is validated yet.", pad=14)
    for i, p in enumerate(rows):
        ax.text(p["evidence_count"] + 0.15, i, f"{p['evidence_count']}  ·  {p['grade']}",
                va="center", fontsize=8.5, color="#334155", fontweight="bold")
    ax.set_xlim(0, 10.5)
    ax.legend(handles=[Patch(color=colour[k], label=k) for k in colour], loc="lower right", fontsize=9)
    _save(fig, "06_problem_evidence")


def chart_gap_severity():
    order = {"CRITICAL": 0, "HIGH": 1, "MEDIUM": 2}
    rows = sorted(GAPS, key=lambda g: (order[g["severity"]], -g["competitors_with"]))
    colour = {"CRITICAL": "#DC2626", "HIGH": "#EA580C", "MEDIUM": "#D97706"}
    fig, ax = plt.subplots(figsize=(12, 7))
    labels = [f"{g['gap_id']}  {g['title']}" for g in rows]
    zero = [g["competitors_with"] for g in rows]
    ax.barh(labels, zero, color=[colour[g["severity"]] for g in rows], edgecolor="white", height=0.7)
    ax.set_xlabel("Number of the 11 direct competitors that have this capability  (0 = uncontested)")
    ax.set_title("13 Positioning Gaps — ranked by severity and by how many competitors cover them\n"
                 "GAP-01, GAP-02 and GAP-03 are CRITICAL and contested by literally nobody", pad=14)
    for i, g in enumerate(rows):
        ax.text(0.08, i, f" {g['competitors_with']}/{g['competitors_total']}  ·  {g['severity']}",
                va="center", fontsize=8.5, color="white", fontweight="bold")
    ax.set_xlim(0, 3.2)
    ax.legend(handles=[Patch(color=colour[k], label=k) for k in order], loc="lower right", fontsize=9)
    _save(fig, "07_positioning_gaps")


def chart_open_questions():
    order = {"BLOCKING": 0, "HIGH": 1, "MEDIUM": 2, "LOW": 3}
    rows = sorted(OPEN_QUESTIONS, key=lambda q: order[q["priority"]])
    colour = {"BLOCKING": "#DC2626", "HIGH": "#EA580C", "MEDIUM": "#D97706", "LOW": "#64748B"}
    fig, ax = plt.subplots(figsize=(12, 7))
    labels = [f"{q['id']}  [{q['area']}]" for q in rows]
    ax.barh(labels, [1] * len(rows), color=[colour[q["priority"]] for q in rows],
            edgecolor="white", height=0.68)
    ax.set_xticks([])
    ax.set_xlabel("Each row = one unresolved question")
    ax.set_title("Open Questions — 18 total, 3 blocking\n"
                 "Blocking = a later phase cannot start until this is resolved", pad=14)
    for i, q in enumerate(rows):
        ax.text(0.015, i, f" {q['title'][:72]}", va="center", fontsize=9.5, color="white", fontweight="bold")
        ax.text(1.005, i, q["priority"], va="center", ha="left", fontsize=8.5,
                color=colour[q["priority"]], fontweight="bold")
    ax.set_xlim(0, 1.18)
    ax.grid(False)
    ax.legend(handles=[Patch(color=colour[k], label=k) for k in order], loc="lower right", fontsize=9)
    _save(fig, "08_open_questions")


def chart_trl_ip_chain():
    """The mandate chain: institutions are required to report what no system holds."""
    fig, ax = plt.subplots(figsize=(13, 6.5))
    ax.axis("off")
    boxes = [
        (0.03, 0.56, 0.20, 0.30, "THE INSTITUTION'S IP RECORD\n(exists, private,\nre-keyed by hand yearly)", "#0F766E"),
        (0.29, 0.72, 0.20, 0.24, "NIRF Innovation\n'Patents Commercialised'\n'Income from Technology\nTransferred (Rs)'", "#1E3A5F"),
        (0.29, 0.40, 0.20, 0.24, "ARIIA\n'Patent Application No'\n'Year of Application'\n'Current Status'", "#1E3A5F"),
        (0.29, 0.08, 0.20, 0.24, "IIC PORTAL\nRegisters the IPR/TTO Centre\nby existence + floor area\n— NO PATENT FIELD", "#B91C1C"),
        (0.60, 0.40, 0.34, 0.52, "ZERO OF ELEVEN COMPETITORS\nHAVE AN IPR MODULE\n\nAnd zero model TRL as a reportable object\n\nNational HEI patent filings:\n15,383 (FY23)  ->  33,675 (FY25)   +119%\n\n3,249 TTO offices registered", "#7F1D1D"),
    ]
    for x, y, w, h, t, c in boxes:
        ax.add_patch(plt.Rectangle((x, y), w, h, facecolor=c, edgecolor="white", lw=3,
                                   transform=ax.transAxes, zorder=2))
        ax.text(x + w / 2, y + h / 2, t, ha="center", va="center", fontsize=9,
                color="white", fontweight="bold", transform=ax.transAxes, zorder=3)
    for (x0, y0), (x1, y1) in [((0.23, 0.71), (0.29, 0.84)), ((0.23, 0.56), (0.29, 0.52)),
                                ((0.23, 0.20), (0.29, 0.20))]:
        ax.annotate("", xy=(x1, y1), xytext=(x0, y0),
                    xycoords="axes fraction", textcoords="axes fraction",
                    arrowprops=dict(arrowstyle="-|>", color="#475569", lw=2.5))
    ax.text(0.5, 0.955, "The Mandate Chain — the single sharpest finding in Phase 0",
            ha="center", fontsize=16, fontweight="bold", color="#1E3A5F", transform=ax.transAxes)
    _save(fig, "09_mandate_chain")


CHARTS = [
    chart_segment_sizes, chart_price_band, chart_gap_matrix, chart_india_startups,
    chart_competitor_positioning, chart_problem_evidence, chart_gap_severity,
    chart_open_questions, chart_trl_ip_chain,
]


def main() -> int:
    print("Building charts...")
    for fn in CHARTS:
        fn()
    print(f"\nDone. {len(CHARTS)} charts.")
    return 0


if __name__ == "__main__":
    sys.exit(main())