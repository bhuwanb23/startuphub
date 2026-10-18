#!/usr/bin/env python3
"""StartupHub research — Excel workbooks.

Produces:
    _exports/xlsx/StartupHub_Research_Database_MASTER.xlsx   (all sheets)
    _exports/xlsx/01_Segment_Census.xlsx
    _exports/xlsx/02_Competitor_Matrix.xlsx
    _exports/xlsx/03_Pricing_Evidence.xlsx
    _exports/xlsx/04_Problem_Evidence.xlsx
    _exports/xlsx/05_Open_Questions_and_Decisions.xlsx

Usage: python build/build_xlsx.py
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import xlsxwriter                                                       # noqa: E402
from data_sources import SOURCES, RESEARCH_META                        # noqa: E402
from data_market import SEGMENTS, UNIVERSITY_TYPES, STARTUPS_BY_STATE, PRICING, PRICING_FIELDS, GAPS   # noqa: E402
from data_competition import COMPETITORS, FEATURE_KEYS, OPEN_QUESTIONS  # noqa: E402
from data_governance import DECISIONS, PROBLEMS                        # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "_exports" / "xlsx"

NAVY, TEAL, RED, AMBER, GREY, GREEN = "#1E3A5F", "#134E4A", "#B91C1C", "#B45309", "#475569", "#166534"
SCALE_FILL = {0: "#FCA5A5", 1: "#FDE68A", 2: "#BFDBFE", 3: "#86EFAC"}

wb = None


def _fmt(wb):
    """Shared workbook formats."""
    return {
        "title": wb.add_format({"bold": True, "font_size": 16, "font_color": "#FFFFFF",
                                "bg_color": NAVY, "align": "left", "valign": "vcenter", "indent": 1}),
        "subtitle": wb.add_format({"font_size": 10, "font_color": "#475569", "italic": True}),
        "hdr": wb.add_format({"bold": True, "font_size": 10, "font_color": "#FFFFFF", "bg_color": NAVY,
                              "border": 1, "border_color": "#0F172A", "text_wrap": True,
                              "valign": "vcenter", "align": "center"}),
        "cell": wb.add_format({"font_size": 10, "border": 1, "border_color": "#E2E8F0", "valign": "top", "text_wrap": True}),
        "cellc": wb.add_format({"font_size": 10, "border": 1, "border_color": "#E2E8F0",
                                "align": "center", "valign": "top", "text_wrap": True}),
        "wrap": wb.add_format({"font_size": 10, "border": 1, "border_color": "#E2E8F0",
                               "valign": "top", "text_wrap": True, "rotation": 0}),
        "num": wb.add_format({"font_size": 10, "border": 1, "border_color": "#E2E8F0",
                              "num_format": "#,##0", "valign": "top"}),
        "money": wb.add_format({"font_size": 10, "border": 1, "border_color": "#E2E8F0",
                                "num_format": '"Rs "#,##0', "valign": "top"}),
        "url": wb.add_format({"font_size": 10, "border": 1, "border_color": "#E2E8F0",
                              "font_color": "#2563EB", "underline": 1, "valign": "top"}),
        "note": wb.add_format({"font_size": 9, "font_color": GREY, "italic": True, "text_wrap": True, "valign": "top"}),
        "sect": wb.add_format({"bold": True, "font_size": 12, "font_color": NAVY, "bottom": 2, "border_color": TEAL}),
        "crit": wb.add_format({"font_size": 10, "border": 1, "border_color": "#E2E8F0", "bg_color": "#FEE2E2",
                               "font_color": RED, "bold": True, "valign": "top", "text_wrap": True, "align": "center"}),
        "warn": wb.add_format({"font_size": 10, "border": 1, "border_color": "#E2E8F0", "bg_color": "#FEF3C7",
                               "font_color": AMBER, "valign": "top", "text_wrap": True, "align": "center"}),
        "ok": wb.add_format({"font_size": 10, "border": 1, "border_color": "#E2E8F0", "bg_color": "#DCFCE7",
                             "font_color": GREEN, "valign": "top", "text_wrap": True, "align": "center"}),
        "yes": wb.add_format({"font_size": 10, "border": 1, "border_color": "#E2E8F0",
                              "bg_color": "#FEE2E2", "font_color": RED, "bold": True, "align": "center"}),
    }


F = {}


def sheet_title(ws, title, subtitle, width=12):
    ws.merge_range(0, 0, 0, width - 1, title, F["title"])
    ws.set_row(0, 30)
    ws.merge_range(1, 0, 1, width - 1, subtitle, F["subtitle"])
    ws.set_row(1, 26)


def write_table(ws, headers, rows, start_row=3, widths=None, fmts=None, freeze=True):
    """Write a formatted table. fmts maps column-index -> format key or callable(row)->key."""
    for c, h in enumerate(headers):
        ws.write(start_row, c, h, F["hdr"])
    ws.set_row(start_row, 34)
    for r, row in enumerate(rows, start=start_row + 1):
        for c, h in enumerate(headers):
            v = row.get(h, "")
            key = fmts.get(h) if fmts else None
            fmt = F["cellc"] if (isinstance(v, (int, float)) and not isinstance(v, bool)) else F["cell"]
            if callable(key):
                fmt = F[key(v)]
            elif key:
                fmt = F[key]
            if isinstance(v, str) and v.startswith("http") and h.lower() in ("url", "source_url"):
                ws.write_url(r, c, v, F["url"], string=v)
            else:
                ws.write(r, c, v, fmt)
    if widths:
        for c, w in enumerate(widths):
            ws.set_column(c, c, w)
    else:
        for c in range(len(headers)):
            ws.set_column(c, c, 22)
    if freeze:
        ws.freeze_panes(start_row + 1, 1)


# ======================================================================================
# SHEET BUILDERS
# ======================================================================================
def sh_readme(ws):
    sheet_title(ws, "StartupHub — Research Database (Phase 0)",
                "Positioning · Landscape Sweep · Competitive Deep Dive | Compiled 18 October 2026", 4)
    ws.set_column(0, 0, 34); ws.set_column(1, 1, 96)
    r = 3
    ws.write(r, 0, "FIELD", F["hdr"]); ws.write(r, 1, "VALUE", F["hdr"]); r += 1
    meta = [
        ("Project", "StartupHub"), ("Phase", "Phase 0 — Positioning, Landscape Sweep & Competitive Deep Dive"),
        ("Status", "Complete (initial pass)"), ("Compiled / Access date", "2026-10-18"),
        ("Geography", "India"),
        ("Sources registered", f"{len(SOURCES)}  (44 government primary + 32 competitive)"),
        ("Competitors profiled", f"{len(COMPETITORS)}"),
        ("Pricing records", f"{len(PRICING)}"),
        ("Positioning gaps", f"{len(GAPS)}  (3 CRITICAL, 4 HIGH, 6 MEDIUM)"),
        ("Open questions", f"{len(OPEN_QUESTIONS)}  (3 BLOCKING)"),
        ("Decisions logged", f"{len(DECISIONS)}"),
        ("Problem areas", f"{len(PROBLEMS)}  (7 DOCUMENTARY, 4 INFERRED, 1 ASSUMED)"),
    ]
    for k, v in meta:
        ws.write(r, 0, k, F["cell"]); ws.write(r, 1, v, F["cell"]); r += 1

    r += 1
    ws.merge_range(r, 0, r, 1, "THE FIVE FINDINGS THAT CHANGE THE PROJECT", F["sect"]); r += 2
    for n, t in enumerate([
        "India digitised innovation ACCOUNTABILITY, not innovation OPERATIONS. Every mandated system is a compliance ledger keyed on events and snapshots; none is a system of record keyed on a venture over time.",
        "The IIC portal has a menu item 'IPR/TTO Centres' that registers a TTO's existence and floor area — and has NO field anywhere to record a single patent. Zero of 11 direct competitors have an IPR module. National HEI patent filings grew 119% in two years.",
        "The market is NOT empty. NestLens Orbit publishes INR 75,000/yr all-in. todo.md's assumed Rs 1.2L sits ABOVE the cheapest credible Indian incumbent.",
        "Three capabilities have zero competitors across 11 vendors: IPR lifecycle, TRL as a first-class object, and YUKTI-NIR/IIC/ARIIA export. All three are MANDATED by India today. This is a mandate-shaped hole, not a feature gap.",
        "The real competitor is free, and it is WhatsApp. IISc's own IIC page links students to a WhatsApp group. Notion/Airtable/Coda at IIC scale cost Rs 26k-1.73L — inside our band — and all three gate audit logs behind Enterprise with no retroactive history.",
    ], 1):
        ws.merge_range(r, 0, r, 1, f"{n}. {t}", F["cell"])
        ws.set_row(r, 46); r += 1

    r += 1
    ws.merge_range(r, 0, r, 1, "⚠️  THREE BLOCKING UNKNOWNS — NOTHING HERE IS TAM-READY", F["sect"]); r += 2
    for t in [
        "OQ-01  The current official IIC count is UNVERIFIED. Last official PIB figure: >6,400 (Nov 2022) — four years stale. This is the closest proxy for our denominator.",
        "OQ-02  AICTE / engineering-college counts are UNVERIFIED. AICTE's dashboard returned HTTP 404 during research.",
        "OQ-03  Willingness to pay is completely unvalidated. We have competitor ASKING prices, not what an institution would PAY.",
        "Every figure in this workbook carries a source, an as-of date, and a reliability grade. Rows flagged CONFLICT must never be collapsed into a single number.",
    ]:
        ws.merge_range(r, 0, r, 1, t, F["warn"]); ws.set_row(r, 30); r += 1

    r += 1
    ws.merge_range(r, 0, r, 1, "EVIDENCE TIER STANDARD", F["sect"]); r += 1
    ws.write(r, 0, "Tier", F["hdr"]); ws.write(r, 1, "Meaning", F["hdr"]); r += 1
    for k, v in RESEARCH_META["evidence_grading"].items():
        ws.write(r, 0, f"TIER {k}", F["cellc"]); ws.write(r, 1, v, F["cell"]); r += 1
    r += 1
    for k, v in RESEARCH_META["reliability_markers"].items():
        ws.write(r, 0, k, F["cellc"]); ws.write(r, 1, v, F["cell"]); r += 1


def sh_sources(ws):
    headers = ["id", "area", "claim", "org", "stype", "tier", "reliability", "url",
               "pub", "access", "segment", "conflict", "notes"]
    sheet_title(ws, "Source Registry — 76 cited sources",
                "Every factual claim in the research traces to one row here. conflict=TRUE means sources disagree — do not collapse.", len(headers))
    write_table(ws, headers, SOURCES,
                widths=[10, 20, 66, 30, 26, 6, 12, 46, 14, 12, 26, 9, 60],
                fmts={"tier": lambda v: "cellc", "conflict": lambda v: "yes" if v else "cellc",
                      "reliability": lambda v: {"HIGH": "ok", "MEDIUM": "warn", "LOW": "crit"}.get(v, "cellc")})


def sh_segments(ws):
    headers = ["segment", "count", "unit", "as_of", "source_id", "reliability", "conflict", "notes"]
    sheet_title(ws, "Segment Census — every denominator, with its caveats",
                "Segment sizes span THREE orders of magnitude. This is why Phase 0 did not freeze a beachhead.", len(headers))
    write_table(ws, headers, SEGMENTS,
                widths=[42, 12, 14, 16, 12, 12, 10, 82],
                fmts={"count": "num", "conflict": lambda v: "yes" if v else "cellc",
                      "reliability": lambda v: {"HIGH": "ok", "MEDIUM": "warn", "LOW": "crit"}.get(v, "cellc")})
    r = 3 + len(SEGMENTS) + 2
    ws.merge_range(r, 0, r, 7, "⚠️  Three of these denominators are UNKNOWN, not merely uncertain: the current IIC count (OQ-01), AICTE/engineering-college counts (OQ-02), and any incubator count from Startup India (OQ-08).", F["warn"])
    ws.set_row(r, 32)


def sh_university_types(ws):
    rows = [dict(university_type=a, count=b, as_of=c, source_id=d, reliability=e)
            for a, b, c, d, e in UNIVERSITY_TYPES]
    sheet_title(ws, "Universities by type — AISHE 2023-24 (1,289 total)",
                "⚠️ UGC's different frame says 1,153. Do not mix. See OQ-06.", 5)
    write_table(ws, ["university_type", "count", "as_of", "source_id", "reliability"], rows,
                widths=[44, 12, 16, 12, 12], fmts={"count": "num"})


def sh_startups_by_state(ws):
    rows = [dict(state=a, startups_recognised=b, direct_jobs=c, as_of="31 Mar 2026", source_id="GOV-013")
            for a, b, c in STARTUPS_BY_STATE]
    sheet_title(ws, "DPIIT-recognised startups by State — 31 March 2026 (top 10 published)",
                "Source: PIB/DPIIT. The release publishes no full 36-row table; last full annexure was 30 June 2024.", 5)
    write_table(ws, ["state", "startups_recognised", "direct_jobs", "as_of", "source_id"], rows,
                widths=[24, 22, 18, 16, 12], fmts={"startups_recognised": "num", "direct_jobs": "num"})


def sh_competitors(ws):
    headers = (["name", "vendor", "origin", "founded", "category", "price_model", "price_low_inr",
                "price_high_inr", "price_note", "pricing_confidence", "free_tier",
                "indian_customers", "indian_customer_names", "reviews", "iso_cert", "white_label",
                "strengths", "weaknesses", "complaints", "does_not_do", "threat_level", "url"]
               + [f"score_{k}" for k in FEATURE_KEYS])
    sheet_title(ws, "Competitor Dossiers — 15 profiles",
                "Feature scores: 0=Absent, 1=Partial, 2=Good, 3=Strong. Conditional formatting shows the pattern.", len(headers))
    rows = [{**c, **{f"score_{k}": c[k] for k in FEATURE_KEYS}} for c in COMPETITORS]
    for c in rows:
        for k in FEATURE_KEYS:
            c[f"score_{k}"] = c[f"score_{k}"]
    hdrs = headers[:22] + [f"{k}\n(0-3)" for k in FEATURE_KEYS]
    widths = [20, 24, 24, 12, 20, 24, 14, 14, 52, 14, 22, 12, 40, 34, 22, 24,
              70, 70, 70, 66, 44, 40]
    start = 3
    for cc, h in enumerate(hdrs):
        ws.write(start, cc, h, F["hdr"])
    ws.set_row(start, 40)
    for ri, row in enumerate(rows, start=start + 1):
        for ci, h in enumerate(hdrs):
            v = row.get(h, "")
            if h.startswith("score_"):
                ws.write(ri, ci, v, wb.add_format({
                    "font_size": 10, "border": 1, "border_color": "#E2E8F0", "align": "center",
                    "valign": "vcenter", "bg_color": SCALE_FILL[v], "bold": v == 0}))
            elif h in ("price_low_inr", "price_high_inr"):
                ws.write(ri, ci, v if v is not None else "not public", F["money"] if v else F["warn"])
            elif h == "url":
                ws.write_url(ri, ci, v, F["url"], string=v)
            elif h == "pricing_confidence":
                ws.write(ri, ci, v, {"VERIFIED": F["ok"], "LISTED": F["warn"], "NOT_PUBLIC": F["crit"]}.get(v, F["cellc"]))
            else:
                ws.write(ri, ci, v, F["cell"])
    for ci, w in enumerate(widths):
        ws.set_column(ci, ci, w)
    ws.freeze_panes(start + 1, 1)
    ws.autofilter(start, 0, start + len(rows), len(hdrs) - 1)


def sh_matrix(ws):
    short = {"portfolio": "Portfolio", "incubation": "Incubation", "panel_eval_audit": "Panel eval+audit",
             "mentorship": "Mentorship", "ipr": "IPR", "trl": "TRL", "resources": "Resources",
             "programme": "Programme", "milestones": "Milestones", "funding_ledger": "Funding ledger",
             "reporting": "Reporting", "ai": "AI", "integrations": "Integrations",
             "india_compliance": "India compliance", "mandated_export": "MANDATED EXPORT"}
    headers = ["name", "category", "pricing_confidence", "price_low_inr", "indian_customers", "reviews"] + \
              [f"{short[k]} ({k})" for k in FEATURE_KEYS]
    sheet_title(ws, "Competitor Feature Matrix — the comparison table",
                "Three columns are entirely zero across every vendor: IPR, TRL, and MANDATED EXPORT.", len(headers))
    rows = []
    for c in COMPETITORS:
        r = {"name": c["name"], "category": c["category"], "pricing_confidence": c["pricing_confidence"],
             "price_low_inr": c["price_low_inr"], "indian_customers": c["indian_customers"], "reviews": c["reviews"]}
        for k in FEATURE_KEYS:
            r[f"{short[k]} ({k})"] = c[k]
        rows.append(r)
    start = 3
    for cc, h in enumerate(headers):
        ws.write(start, cc, h, F["hdr"])
    ws.set_row(start, 44)
    for ri, row in enumerate(rows, start=start + 1):
        for ci, h in enumerate(headers):
            v = row.get(h, "")
            if h in [x for x in headers if "(" in x and ")" in x] and isinstance(v, int):
                ws.write(ri, ci, v, wb.add_format({
                    "font_size": 11, "border": 1, "border_color": "#E2E8F0", "align": "center",
                    "valign": "vcenter", "bg_color": SCALE_FILL[v], "bold": v == 0}))
            elif h == "price_low_inr":
                ws.write(ri, ci, v if v is not None else "not public", F["money"] if v else F["warn"])
            elif h == "pricing_confidence":
                ws.write(ri, ci, v, {"VERIFIED": F["ok"], "LISTED": F["warn"], "NOT_PUBLIC": F["crit"]}.get(v, F["cellc"]))
            else:
                ws.write(ri, ci, v, F["cell"])
    ws.set_column(0, 0, 22); ws.set_column(1, 5, 20)
    for ci in range(6, len(headers)):
        ws.set_column(ci, ci, 11)
    ws.freeze_panes(start + 1, 6)


def sh_pricing(ws):
    headers = ["vendor", "plan", "amount", "unit", "inr_annualised", "confidence", "market", "notes"]
    sheet_title(ws, "Pricing Ledger — every real, cited price",
                "⚠️ RULE: never present a competitor's ASKING price as evidence of what an institution would PAY. Different quantities.", len(headers))
    write_table(ws, headers, [dict(zip(PRICING_FIELDS, r)) for r in PRICING],
                widths=[28, 30, 16, 20, 18, 14, 12, 78],
                fmts={"amount": "money", "inr_annualised": "money",
                      "confidence": lambda v: {"VERIFIED": "ok", "LISTED": "warn",
                                               "NOT_PUBLIC": "crit", "MEDIUM": "warn", "LOW": "crit"}.get(v, "cellc")})
    r = 3 + len(PRICING) + 2
    ws.merge_range(r, 0, r, 7,
                   "THE DEFENSIBLE BAND IS Rs 75,000 – Rs 5,00,000. Below Rs 54,000 we cannot survive against Trello's free tier. "
                   "Above Rs 5,00,000 we compete with AcceleratorApp and Elsevier Pure. Within it, the only axis that matters is "
                   "being the only thing that produces a compliant submission — not price, not feature count.", F["note"])
    ws.set_row(r, 44)


def sh_gaps(ws):
    headers = ["gap_id", "title", "severity", "competitors_with", "competitors_total",
               "evidence", "gap_detail", "why_india", "nearest_competitor", "verdict"]
    sheet_title(ws, "Positioning Gaps — 13 things nobody in this market does well",
                "Ranked by how confidently no competitor covers them, and how painful they are for the Indian institutional buyer.", len(headers))
    write_table(ws, headers, GAPS,
                widths=[10, 40, 12, 14, 14, 96, 76, 60, 56, 68],
                fmts={"severity": lambda v: {"CRITICAL": "crit", "HIGH": "warn", "MEDIUM": "cellc"}.get(v, "cellc"),
                      "competitors_with": "num", "competitors_total": "num"})


def sh_problems(ws):
    headers = ["num", "area", "grade", "evidence_count", "evidence", "inference", "still_needs", "source_ids"]
    sheet_title(ws, "Problem Evidence Register — seeds for Phase 1",
                "⚠️ We have interviewed ZERO institutions. No problem here is yet validated in the todo.md sense.", len(headers))
    write_table(ws, headers, PROBLEMS,
                widths=[6, 34, 16, 14, 110, 90, 58, 46],
                fmts={"num": "num", "evidence_count": "num",
                      "grade": lambda v: {"DOCUMENTARY": "ok", "INFERRED": "warn", "ASSUMED": "crit"}.get(v, "cellc")})


def sh_questions(ws):
    headers = ["id", "priority", "area", "title", "what_we_know", "why_it_blocks",
               "what_would_settle_it", "interim_handling", "source_ids", "status"]
    sheet_title(ws, "Open Questions — 18, of which 3 are blocking",
                "Nothing here is silently resolved. If sources disagree, both go in this sheet.", len(headers))
    write_table(ws, headers, OPEN_QUESTIONS,
                widths=[10, 12, 18, 54, 100, 76, 60, 66, 30, 24],
                fmts={"priority": lambda v: {"BLOCKING": "crit", "HIGH": "warn"}.get(v, "cellc")})


def sh_decisions(ws):
    headers = ["id", "date", "topic", "decision", "evidence", "reverses_if", "status"]
    sheet_title(ws, "Decision Log — 12 decisions with their reversal conditions",
                "Append-only. If a decision changes, add a new entry that supersedes it.", len(headers))
    write_table(ws, headers, DECISIONS, widths=[10, 12, 20, 92, 110, 72, 44])


SHEETS = [
    ("README", sh_readme), ("Sources", sh_sources), ("Segment_Census", sh_segments),
    ("University_Types", sh_university_types), ("Startups_By_State", sh_startups_by_state),
    ("Competitors", sh_competitors), ("Feature_Matrix", sh_matrix),
    ("Pricing_Ledger", sh_pricing), ("Positioning_Gaps", sh_gaps),
    ("Problem_Evidence", sh_problems), ("Open_Questions", sh_questions), ("Decision_Log", sh_decisions),
]


def build(path, sheets):
    global wb, F
    wb = xlsxwriter.Workbook(str(path), {"constant_memory": False})
    F = _fmt(wb)
    for name, fn in sheets:
        fn(wb.add_worksheet(name[:31]))
    wb.close()
    print(f"  xlsx  {path.relative_to(ROOT)}  ({len(sheets)} sheets, {path.stat().st_size//1024} KB)")


def main() -> int:
    OUT.mkdir(parents=True, exist_ok=True)
    print("Building Excel workbooks...")
    build(OUT / "StartupHub_Research_Database_MASTER.xlsx", SHEETS)
    build(OUT / "01_Segment_Census.xlsx", [s for s in SHEETS if s[0] in
           ("README", "Segment_Census", "University_Types", "Startups_By_State")])
    build(OUT / "02_Competitor_Matrix.xlsx", [s for s in SHEETS if s[0] in
           ("README", "Competitors", "Feature_Matrix")])
    build(OUT / "03_Pricing_Evidence.xlsx", [s for s in SHEETS if s[0] in
           ("README", "Pricing_Ledger")])
    build(OUT / "04_Problem_Evidence.xlsx", [s for s in SHEETS if s[0] in
           ("README", "Problem_Evidence")])
    build(OUT / "05_Open_Questions_Decisions.xlsx", [s for s in SHEETS if s[0] in
           ("README", "Open_Questions", "Decision_Log")])
    print("\nDone. 6 workbooks.")
    return 0


if __name__ == "__main__":
    sys.exit(main())