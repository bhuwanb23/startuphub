#!/usr/bin/env python3
"""StartupHub Phase 13 - customer-journey infographics.

Eight figures drawn from build/data_p13_journey.py.

Chart 2 is the load-bearing one: the 11x6 evidence heatmap. It shows the
documentary density of each stage at a glance and makes the zero-evidence
stages (S08 Market Validation, S10 Growth) visibly blank rather than
papered over. S08 and S10 ship all-UNKNOWN by the approved rule, and this
chart is where a reviewer sees that without reading the prose.

Usage: python build/build_charts13.py
Output: _exports/charts/phase13/*.png
"""

import json
import sys
from collections import Counter
from pathlib import Path

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt                                   # noqa: E402
from matplotlib.patches import FancyBboxPatch, Patch, Rectangle   # noqa: E402
import numpy as np                                                # noqa: E402

sys.path.insert(0, str(Path(__file__).resolve().parent))
import data_p13_journey as J                                      # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "_exports" / "charts" / "phase13"

NAVY, TEAL, RED, AMBER, SLATE = "#1E3A5F", "#0F766E", "#B91C1C", "#B45309", "#64748B"
PURPLE, GREEN, GREY = "#6D28D9", "#15803D", "#94A3B8"
DPI = 200

# Grade colours - reuse the programme-wide vocabulary from build_charts.py:204
GRADE_COL = {"DOCUMENTARY": GREEN, "INFERRED": AMBER, "UNKNOWN": SLATE,
             "NOT_APPLICABLE": GREY}
SEV_COL = {1: TEAL, 2: AMBER, 3: RED}
TRACK_COL = {"venture": TEAL, "data": NAVY, "both": PURPLE}

plt.rcParams.update({
    "font.family": "DejaVu Sans", "font.size": 10,
    "axes.titlesize": 13.5, "axes.titleweight": "bold", "axes.titlecolor": NAVY,
    "axes.labelsize": 10, "axes.labelcolor": "#334155",
    "axes.edgecolor": "#CBD5E1", "axes.grid": True, "grid.color": "#E2E8F0",
    "grid.linewidth": 0.8, "axes.axisbelow": True,
    "figure.facecolor": "white", "axes.facecolor": "white", "legend.frameon": False,
})

STAGES = J.STAGES
QUESTIONS = J.QUESTIONS
CELLS = J.CELLS
S = J.summary()
CELL_BY = {(c["stage"], c["question"]): c for c in CELLS}


def _save(fig, name):
    OUT.mkdir(parents=True, exist_ok=True)
    p = OUT / f"{name}.png"
    fig.savefig(p, dpi=DPI, bbox_inches="tight", facecolor="white")
    plt.close(fig)
    print(f"  png   {p.relative_to(ROOT)}  ({p.stat().st_size // 1024} KB)")


# ==========================================================================
# 1. The journey map - 11 stages in order
# ==========================================================================
def chart_journey_map():
    fig, ax = plt.subplots(figsize=(14.2, 7.8))
    ax.set_xlim(0, 12.6)
    ax.set_ylim(0, 7.6)
    ax.axis("off")
    ax.grid(False)

    # Two horizontal lanes: venture on top, data on bottom, "both" straddles.
    ax.text(0.15, 7.05, "VENTURE TRACK", fontsize=10, fontweight="bold",
            color=TEAL, va="center")
    ax.text(0.15, 1.15, "DATA TRACK", fontsize=10, fontweight="bold",
            color=NAVY, va="center")
    ax.axhline(4.1, color="#E2E8F0", linewidth=1.2, linestyle="--")

    ev_grade = {}
    for st in STAGES:
        gc = J.stage_grade_counts(st["id"])
        top = max(g for g in ("DOCUMENTARY", "INFERRED", "UNKNOWN")
                  if gc[g] > 0) if gc["DOCUMENTARY"] else (
            "INFERRED" if gc["INFERRED"] else "UNKNOWN")
        # Dominant grade: DOCUMENTARY if majority, else INFERRED, else UNKNOWN
        if gc["DOCUMENTARY"] >= 4:
            top = "DOCUMENTARY"
        elif gc["UNKNOWN"] >= 6:
            top = "UNKNOWN"
        elif gc["INFERRED"] + gc["DOCUMENTARY"] >= 1:
            top = "INFERRED" if gc["DOCUMENTARY"] < 4 and gc["UNKNOWN"] < 6 else top
        ev_grade[st["id"]] = top

    for i, st in enumerate(STAGES):
        x = 0.7 + i * 1.09
        if st["track"] == "venture":
            y = 5.9
        elif st["track"] == "data":
            y = 2.3
        else:  # both
            y = 4.1
        col = TRACK_COL[st["track"]]
        gc = J.stage_grade_counts(st["id"])
        box = FancyBboxPatch((x - 0.48, y - 0.72), 0.96, 1.44,
                             boxstyle="round,pad=0.04,rounding_size=0.1",
                             facecolor="white", edgecolor=col, linewidth=2.0)
        ax.add_patch(box)
        ax.text(x, y + 0.50, st["id"], ha="center", fontsize=8.4,
                fontweight="bold", color=col)
        # Wrap name
        name = st["name"]
        if len(name) > 14:
            mid = len(name) // 2
            cut = name.rfind(" ", 0, mid + 2)
            lines = (name[:cut], name[cut + 1:]) if cut > 0 else (name[:mid], name[mid + 1:])
        else:
            lines = (name,)
        for li, ln in enumerate(lines[:2]):
            ax.text(x, y + 0.16 - li * 0.30, ln, ha="center", fontsize=8.6,
                    fontweight="bold", color="#0F172A")
        ax.text(x, y - 0.42, f"{gc['DOCUMENTARY']}D {gc['INFERRED']}I "
                             f"{gc['UNKNOWN']}U", ha="center", fontsize=7.4,
                color=GRADE_COL[ev_grade[st["id"]]])
        if i < len(STAGES) - 1:
            ax.annotate("", xy=(x + 0.95, y), xytext=(x + 0.50, y),
                        arrowprops=dict(arrowstyle="->", color="#94A3B8",
                                        lw=1.6))

    ax.text(6.3, 0.45,
            "D=DOCUMENTARY  I=INFERRED  U=UNKNOWN   ·   "
            "S08 and S10 are blank on purpose: no registered source, "
            "so all six cells ship UNKNOWN.",
            ha="center", fontsize=8.6, color=SLATE, style="italic")

    ax.set_title("The 11-Stage Journey - Venture Track Above, Data Track Below\n"
                 "Track colour shows which lane the stage belongs to. "
                 "Sub-caption shows the grade mix of its six cells.\n"
                 "The only documentary join between the tracks is S06 "
                 "(YUKTI auto-pool to ARIIA).",
                 pad=14)
    _save(fig, "p13_01_journey_map")


# ==========================================================================
# 2. The evidence heatmap - 11 x 6
# ==========================================================================
def chart_evidence_heatmap():
    fig, ax = plt.subplots(figsize=(13.4, 8.0))

    gcode = {"DOCUMENTARY": 3, "INFERRED": 2, "UNKNOWN": 1,
             "NOT_APPLICABLE": 0}
    grid = np.array([
        [gcode[CELL_BY[(st["id"], q["key"])]["grade"]] for q in QUESTIONS]
        for st in STAGES
    ])

    cmap = matplotlib.colors.ListedColormap(["#E2E8F0", SLATE, AMBER, GREEN])
    ax.imshow(grid, cmap=cmap, aspect="auto", vmin=0, vmax=3)

    for i, st in enumerate(STAGES):
        for j, q in enumerate(QUESTIONS):
            g = CELL_BY[(st["id"], q["key"])]["grade"]
            mark = {"DOCUMENTARY": "D", "INFERRED": "I",
                    "UNKNOWN": "U", "NOT_APPLICABLE": "N/A"}[g]
            ax.text(j, i, mark, ha="center", va="center", fontsize=10.5,
                    fontweight="bold",
                    color="white" if gcode[g] >= 2 else "#334155")

    ax.set_xticks(range(len(QUESTIONS)))
    ax.set_xticklabels([f"{q['id']}\n{q['label']}" for q in QUESTIONS],
                       fontsize=8.8)
    ax.set_yticks(range(len(STAGES)))
    ax.set_yticklabels([f"{st['id']}  {st['name']}  ({st['evidence']})"
                        for st in STAGES], fontsize=9)
    ax.set_xticks(np.arange(-.5, len(QUESTIONS), 1), minor=True)
    ax.set_yticks(np.arange(-.5, len(STAGES), 1), minor=True)
    ax.grid(which="minor", color="white", linewidth=1.8)
    ax.grid(which="major", visible=False)

    ax.legend(handles=[
        Patch(color=GREEN, label=f"DOCUMENTARY ({S['documentary']} cells)"),
        Patch(color=AMBER, label=f"INFERRED ({S['inferred']} cells)"),
        Patch(color=SLATE, label=f"UNKNOWN ({S['unknown']} cells)"),
    ], fontsize=9.4, ncol=3, loc="upper center",
        bbox_to_anchor=(0.5, -0.08))

    ax.set_title("The Evidence Heatmap - 11 Stages x 6 Questions = 66 Cells\n"
                 f"{S['documentary']} documentary, {S['inferred']} inferred, "
                 f"{S['unknown']} unknown. Zero interviews. "
                 "S08 Market Validation and S10 Growth are all-SLATE by design.\n"
                 "The vertical stripe of U down S08 and S10 is the honest "
                 "result of a zero-interview study, not an omission.",
                 pad=14)
    _save(fig, "p13_02_evidence_heatmap")


# ==========================================================================
# 3. The two tracks - and the join neither portal implements
# ==========================================================================
def chart_two_tracks():
    fig, ax = plt.subplots(figsize=(14.0, 7.0))
    ax.set_xlim(0, 12)
    ax.set_ylim(0, 7.2)
    ax.axis("off")
    ax.grid(False)

    venture = J.TWO_TRACK["venture"]
    data = J.TWO_TRACK["data"]
    join = J.TWO_TRACK["join_stage"]

    def _stage_box(sid, x, y, col):
        st = J.STAGE_BY_ID[sid]
        box = FancyBboxPatch((x - 0.52, y - 0.44), 1.04, 0.88,
                             boxstyle="round,pad=0.03,rounding_size=0.1",
                             facecolor="white", edgecolor=col, linewidth=2.0)
        ax.add_patch(box)
        ax.text(x, y + 0.14, sid, ha="center", fontsize=8.0,
                fontweight="bold", color=col)
        nm = st["name"]
        if len(nm) > 12:
            cut = nm.rfind(" ", 0, 12)
            if cut < 4:
                cut = 10
            ax.text(x, y - 0.18, nm[:cut], ha="center", fontsize=7.4,
                    color="#0F172A")
            ax.text(x, y - 0.36, nm[cut + 1:], ha="center", fontsize=7.4,
                    color="#0F172A")
        else:
            ax.text(x, y - 0.20, nm, ha="center", fontsize=7.6,
                    color="#0F172A")

    # Venture lane
    ax.text(0.4, 6.3, "VENTURE TRACK  (idea -> evaluation -> incubation -> "
                      "prototype -> IPR -> funding -> growth)",
            fontsize=9.6, fontweight="bold", color=TEAL)
    for i, sid in enumerate(venture):
        x = 1.1 + i * 1.55
        _stage_box(sid, x, 5.3, TEAL)
        if i < len(venture) - 1:
            ax.annotate("", xy=(x + 1.30, 5.3), xytext=(x + 0.56, 5.3),
                        arrowprops=dict(arrowstyle="->", color=TEAL, lw=1.5))

    # Data lane
    ax.text(0.4, 1.0, "DATA TRACK  (IIC portal -> YUKTI-NIR -> ARIIA -> NIRF)",
            fontsize=9.6, fontweight="bold", color=NAVY)
    for i, sid in enumerate(data):
        x = 1.1 + i * 3.2
        _stage_box(sid, x, 2.0, NAVY)
        if i < len(data) - 1:
            ax.annotate("", xy=(x + 2.7, 2.0), xytext=(x + 0.56, 2.0),
                        arrowprops=dict(arrowstyle="->", color=NAVY, lw=1.5))

    # The join - S06 sits in the venture row but bridges down
    join_x = 1.1 + venture.index(join) * 1.55
    ax.annotate("", xy=(join_x, 2.5), xytext=(join_x, 4.8),
                arrowprops=dict(arrowstyle="<->", color=PURPLE, lw=2.4,
                                linestyle="--"))
    ax.text(join_x + 0.30, 3.65,
            "THE ONLY JOIN\nYUKTI 'Recommended'\nauto-pools into\n"
            "ARIIA Section 4\n(GOV-024, GOV-031)\n\n"
            "One-directional.\nARIIA-scoped only.\nDoes NOT remove\n"
            "NIRF-I. No shared\nwrite path.",
            fontsize=8.2, color=PURPLE, va="center",
            fontweight="bold",
            bbox=dict(boxstyle="round,pad=0.35", facecolor="#F5F3FF",
                      edgecolor=PURPLE, linewidth=1.4))

    # The gap annotation
    ax.text(9.8, 3.6,
            "GAP: every recommended\n"
            "prototype is re-keyed\n"
            "for NIRF by hand.\n\n"
            "StartupHub's wedge is\n"
            "the join neither portal\n"
            "implements: one venture\n"
            "record emits all four\n"
            "submissions.",
            fontsize=8.6, color=RED, va="center", fontweight="bold",
            bbox=dict(boxstyle="round,pad=0.35", facecolor="#FEF2F2",
                      edgecolor=RED, linewidth=1.4))

    ax.set_title("The Two Tracks That Never Formally Join\n"
                 "The venture track is about the startup. The data track is about "
                 "the institution's ranking.\nThey share one auto-pool (S06 -> "
                 "ARIIA) and nothing else. StartupHub lives at that join.",
                 pad=10, y=0.98)
    _save(fig, "p13_03_two_tracks")


# ==========================================================================
# 4. Breakpoint severity - 14 breakpoints
# ==========================================================================
def chart_breakpoint_severity():
    bps = sorted(J.BREAKPOINTS, key=lambda b: (b["severity"], b["stage"]),
                 reverse=True)
    fig, ax = plt.subplots(figsize=(13.6, 8.2))

    y = np.arange(len(bps))
    for i, b in enumerate(bps):
        col = SEV_COL[b["severity"]]
        ax.barh(i, 0.30, color=col, height=0.62, edgecolor="white")
        ax.text(0.33, i, f"severity {b['severity']}", va="center",
                fontsize=8.8, fontweight="bold", color=col)
        st = J.STAGE_BY_ID.get(b["stage"], {})
        ax.text(1.55, i, f"[{b['id']}] {b['title'][:66]}", va="center",
                fontsize=8.8, color="#0F172A")
        ax.text(7.9, i, b["stage"], va="center", fontsize=8.4,
                fontweight="bold", color=TRACK_COL.get(
                    st.get("track", "both"), SLATE))
        gcol = GRADE_COL.get(b["grade"], SLATE)
        ax.text(8.6, i, b["grade"], va="center", fontsize=8.0,
                color=gcol, fontweight="bold")

    ax.set_yticks(y)
    ax.set_yticklabels([""] * len(bps))
    ax.set_xlim(0, 10.2)
    ax.set_xticks([])
    ax.set_ylim(-0.8, len(bps) - 0.2)
    ax.grid(False)
    sev_counts = Counter(b["severity"] for b in bps)
    ax.legend(handles=[
        Patch(color=RED, label=f"3 = hard gate / data-integrity failure "
                               f"({sev_counts[3]})"),
        Patch(color=AMBER, label=f"2 = real break ({sev_counts[2]})"),
        Patch(color=TEAL, label=f"1 = friction ({sev_counts[1]})"),
    ], fontsize=9.2, ncol=3, loc="lower right")

    ax.set_title("All 14 Breakpoints, Ordered by Severity\n"
                 "Severity 3 means a single missing artefact or a schema-level "
                 "integrity failure blocks or corrupts a mandated flow.\n"
                 "Nine of the fourteen are severity 3 - the journey is not "
                 "inconvenient, it is structurally broken at the portal schema.",
                 pad=14, loc="left")
    _save(fig, "p13_04_breakpoint_severity")


# ==========================================================================
# 5. Manual work - structural counts vs unknowns
# ==========================================================================
def chart_manual_work():
    rows = J.MANUAL_WORK
    fig, ax = plt.subplots(figsize=(13.4, 6.8))

    y = np.arange(len(rows))
    for i, m in enumerate(rows):
        col = GREEN if m["measure_type"] == "STRUCTURAL_COUNT" else SLATE
        ax.barh(i, 0.28, color=col, height=0.60, edgecolor="white")
        label = m["value"] if m["measure_type"] == "STRUCTURAL_COUNT" \
            else "UNKNOWN"
        ax.text(0.31, i, label, va="center", fontsize=9.4,
                fontweight="bold", color=col)
        ax.text(1.30, i, f"[{m['id']}] {m['metric'][:58]}", va="center",
                fontsize=8.8, color="#0F172A")
        stage = m["stage"]
        ax.text(7.4, i, stage, va="center", fontsize=8.4,
                fontweight="bold", color=NAVY)
        if m["measure_type"] == "UNKNOWN":
            ax.text(8.1, i, "routes to Phase 3B", va="center", fontsize=8.0,
                    color=AMBER, style="italic")

    ax.set_yticks(y)
    ax.set_yticklabels([""] * len(rows))
    ax.set_xlim(0, 10.4)
    ax.set_xticks([])
    ax.set_ylim(-0.8, len(rows) - 0.2)
    ax.grid(False)

    n_struct = S["structural_counts"]
    n_unk = S["unknown_manual"]
    ax.legend(handles=[
        Patch(color=GREEN, label=f"STRUCTURAL_COUNT - measured from docs "
                                 f"({n_struct})"),
        Patch(color=SLATE, label=f"UNKNOWN - hours or rupees, no registered "
                                 f"source measures it ({n_unk})"),
    ], fontsize=9.4, ncol=2, loc="lower right")

    ax.set_title("The Manual-Work Ledger: What We Can Count vs What We Cannot\n"
                 "Structural counts are arithmetic on registered portal "
                 "requirements (16+ activities, 8 artefacts each, ~128/year).\n"
                 "Hours and rupees are UNKNOWN by design - P-A10:554 calls "
                 "them the highest-value unknown in that section.",
                 pad=14, loc="left")
    _save(fig, "p13_05_manual_work")


# ==========================================================================
# 6. Who manages each stage - the 25 institutional roles
# ==========================================================================
def chart_stage_owners():
    roles_path = ROOT / "_exports" / "raw" / "phase2_roles_RAW.json"
    with open(roles_path, encoding="utf-8") as fh:
        roles_data = json.load(fh)
    roles = roles_data["roles"]

    fig, ax = plt.subplots(figsize=(13.6, 9.4))

    # Group by role_class A / B / C / D
    classes = {"A": [], "B": [], "C": [], "D": []}
    for r in roles:
        classes[r["role_class"]].append(r)

    ax.set_xlim(0, 12)
    ax.set_ylim(0, 11.2)
    ax.axis("off")
    ax.grid(False)

    y = 10.6
    for rc, title, col in [
        ("A", "Class A - IIC Council (12 roles, portal-enforced)", NAVY),
        ("B", "Class B - Institute Administration (pays=YES on 3 roles)",
         TEAL),
        ("C", "Class C - Other Institutional Roles", PURPLE),
        ("D", "Class D - End Users (the startups the product serves)",
         AMBER),
    ]:
        ax.text(0.3, y, title, fontsize=9.6, fontweight="bold", color=col)
        y -= 0.40
        for r in classes[rc]:
            pays = r.get("pays", "")
            pays_flag = "  $" if "YES" in str(pays) else ""
            ax.text(0.7, y, f"{r['id']}", fontsize=7.4, color=SLATE,
                    fontweight="bold")
            ax.text(1.35, y, r["name"][:44], fontsize=7.6, color="#0F172A")
            if pays_flag:
                ax.text(6.3, y, pays_flag, fontsize=8.4, color=GREEN,
                        fontweight="bold")
            if r.get("portal_enforced"):
                ax.text(6.9, y, "P", fontsize=7.6, color=AMBER,
                        fontweight="bold")
            y -= 0.28
        y -= 0.22

    ax.text(0.7, 0.55,
            "$ = pays (budget authority documented)    "
            "P = portal-enforced role (appears on the IIC portal itself)\n\n"
            "No role in Class A holds a documented procurement budget. "
            "Custodianship of portal data is not budget authority "
            "(P2 roles analysis).\nWho manages each stage is therefore "
            "DOCUMENTARY for the council (S02) and INFERRED or UNKNOWN "
            "elsewhere - see the who_manages stripe in chart 2.",
            fontsize=8.4, color=SLATE, va="bottom")

    ax.set_title("Who Manages It: The 25 Institutional Roles Against The Journey\n"
                 "Twelve council roles are portal-enforced. Three non-council "
                 "roles carry documented budget authority (B-01, B-02, C-03).\n"
                 "This is the buyer map Phase 3B interviews must confirm.",
                 pad=10, y=0.99)
    _save(fig, "p13_06_stage_owners")


# ==========================================================================
# 7. The mandated tools - what is documented, what is not
# ==========================================================================
def chart_mandated_tools():
    fig, ax = plt.subplots(figsize=(13.2, 6.4))

    systems = [
        ("IIC Portal", "GOV-018, GOV-019, GOV-020, GOV-021",
         "dashboard, activities, council,\nparticipation, incubation unit",
         "DOCUMENTARY"),
        ("YUKTI-NIR", "GOV-023, GOV-025",
         "innovation buckets by TRL,\nverifier workflow, YIC eligibility",
         "DOCUMENTARY"),
        ("ARIIA DCS", "GOV-031",
         "cross-portal fetch from IIC,\nNISP, YUKTI, Innovation Ambassador",
         "DOCUMENTARY"),
        ("NIRF Innovation", "GOV-026, GOV-027, GOV-028",
         "~11 screens per discipline;\nFSI/IA/RIO/PII/AIE/Perception",
         "DOCUMENTARY"),
    ]
    unknown_internal = [
        ("Internal tools at S01", "P-A10"),
        ("Internal tools at S02", "P-A10"),
        ("Internal tools at S03", "P-A10"),
        ("Internal tools at S04", "P-A10"),
        ("Internal tools at S05", "P-A10"),
        ("Internal tools at S06", "P-A10"),
        ("Internal tools at S07", "P-A10"),
        ("Internal tools at S08", "P-A10"),
        ("Internal tools at S09", "P-A10"),
        ("Internal tools at S10", "P-A10"),
        ("Internal tools at S11", "P-A10"),
    ]

    ax.set_xlim(0, 12)
    ax.set_ylim(0, 7.0)
    ax.axis("off")
    ax.grid(False)

    ax.text(0.3, 6.4, "MANDATED SYSTEMS - every field documented from the "
                      "portals themselves", fontsize=9.6,
            fontweight="bold", color=GREEN)
    for i, (name, srcs, fields, grade) in enumerate(systems):
        x = 0.5 + i * 3.0
        box = FancyBboxPatch((x, 3.4), 2.7, 2.6,
                             boxstyle="round,pad=0.06,rounding_size=0.12",
                             facecolor="#F0FDF4", edgecolor=GREEN, linewidth=1.8)
        ax.add_patch(box)
        ax.text(x + 0.15, 5.65, name, fontsize=9.8, fontweight="bold",
                color=GREEN)
        ax.text(x + 0.15, 5.25, fields, fontsize=7.8, color="#0F172A",
                va="top")
        ax.text(x + 0.15, 3.60, f"sources: {srcs}", fontsize=6.8,
                color=SLATE, va="bottom")

    ax.text(0.3, 2.85, "INTERNAL TOOLING - UNKNOWN at every stage "
                       "(P-A10)", fontsize=9.6, fontweight="bold",
            color=SLATE)
    for i, (name, src) in enumerate(unknown_internal):
        col = i % 6
        row = i // 6
        x = 0.5 + col * 2.0
        yy = 2.2 - row * 0.55
        box = FancyBboxPatch((x, yy), 1.8, 0.44,
                             boxstyle="round,pad=0.03,rounding_size=0.08",
                             facecolor="#F8FAFC", edgecolor=SLATE,
                             linewidth=1.0)
        ax.add_patch(box)
        ax.text(x + 0.12, yy + 0.12, name, fontsize=7.4, color=SLATE)
        ax.text(x + 0.12, yy + 0.02, "UNKNOWN", fontsize=6.6, color=SLATE,
                style="italic")

    ax.text(0.5, 0.35,
            "The mandated stack is documented. What the institution actually "
            "uses day-to-day - the spreadsheets, chats and local registers - "
            "is UNKNOWN across every registered source (P-A10).\n"
            "That is the honest boundary of a zero-interview, "
            "documentary-only study.",
            fontsize=8.4, color=SLATE, va="bottom", style="italic")

    ax.set_title("Documented Mandated Tools vs UNKNOWN Internal Tooling\n"
                 "Four mandated systems, every field sourced from the portals "
                 "themselves. Eleven internal-tooling UNKNOWNs route to Phase 3B.",
                 pad=10, y=0.99)
    _save(fig, "p13_07_documented_mandated_tools")


# ==========================================================================
# 8. Unknowns to interview - the Phase 3B route
# ==========================================================================
def chart_unknowns_to_interview():
    gaps = J.evidence_gaps()
    # Count by stage
    by_stage = Counter(g["stage"] for g in gaps)
    stage_order = [s["id"] for s in STAGES]
    stage_order.append("ALL")

    fig, ax = plt.subplots(figsize=(13.4, 6.6))
    xs = np.arange(len(stage_order))
    doc_counts = [sum(1 for c in CELLS if c["stage"] == sid
                      and c["grade"] == "DOCUMENTARY")
                  for sid in stage_order if sid != "ALL"]
    inf_counts = [sum(1 for c in CELLS if c["stage"] == sid
                      and c["grade"] == "INFERRED")
                  for sid in stage_order if sid != "ALL"]
    unk_counts = [sum(1 for c in CELLS if c["stage"] == sid
                      and c["grade"] == "UNKNOWN")
                  for sid in stage_order if sid != "ALL"]

    x_cells = np.arange(len(STAGES))
    ax.bar(x_cells, doc_counts, color=GREEN, label="DOCUMENTARY", width=0.72,
           edgecolor="white")
    ax.bar(x_cells, inf_counts, bottom=doc_counts, color=AMBER,
           label="INFERRED", width=0.72, edgecolor="white")
    ax.bar(x_cells, unk_counts,
           bottom=np.array(doc_counts) + np.array(inf_counts),
           color=SLATE, label="UNKNOWN", width=0.72, edgecolor="white")

    for i, sid in enumerate([s["id"] for s in STAGES]):
        n_gap = by_stage.get(sid, 0)
        if n_gap:
            total = 6
            ax.text(i, total + 0.15, f"{n_gap} gap{'s' if n_gap > 1 else ''}",
                    ha="center", fontsize=8.2, color=RED, fontweight="bold")

    ax.set_xticks(x_cells)
    ax.set_xticklabels([f"{s['id']}\n{s['name'][:14]}" for s in STAGES],
                       fontsize=8.2)
    ax.set_ylabel("cells")
    ax.set_ylim(0, 7.2)
    ax.legend(fontsize=9.4, ncol=3, loc="upper right")
    ax.set_title("What Routes To The Phase 3B Interview Instrument\n"
                 f"{S['evidence_gaps']} evidence gaps (every non-DOCUMENTARY "
                 "cell plus the 3 unknown manual-work rows). "
                 "S08 and S10 contribute 6 gaps each - the whole stage.\n"
                 "The interview instrument, not a guess, is what closes "
                 "these. No quote is invented to fill them.",
                 pad=14)
    _save(fig, "p13_08_unknowns_to_interview")


def main():
    print("Phase 13 charts")
    chart_journey_map()
    chart_evidence_heatmap()
    chart_two_tracks()
    chart_breakpoint_severity()
    chart_manual_work()
    chart_stage_owners()
    chart_mandated_tools()
    chart_unknowns_to_interview()
    print(f"  8 charts -> {OUT}")


if __name__ == "__main__":
    main()
