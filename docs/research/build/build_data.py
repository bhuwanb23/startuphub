#!/usr/bin/env python3
"""StartupHub research — export every dataset to CSV and JSON.

Usage: python build/build_data.py
Output: _exports/csv/*.csv  and  _exports/json/*.json
"""

import csv
import json
import sys
from datetime import datetime, timezone
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from data_sources import SOURCES, RESEARCH_META          # noqa: E402
from data_market import SEGMENTS, UNIVERSITY_TYPES, STARTUPS_BY_STATE, PRICING, PRICING_FIELDS, GAPS  # noqa: E402
from data_competition import COMPETITORS, FEATURE_KEYS, OPEN_QUESTIONS            # noqa: E402
from data_governance import DECISIONS, PROBLEMS                                  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
OUT_CSV = ROOT / "_exports" / "csv"
OUT_JSON = ROOT / "_exports" / "json"

SCALE = {0: "Absent", 1: "Partial", 2: "Good", 3: "Strong"}


def _jsonable(obj):
    """Recursively convert records to JSON-safe types."""
    if isinstance(obj, dict):
        return {k: _jsonable(v) for k, v in obj.items()}
    if isinstance(obj, (list, tuple)):
        return [_jsonable(v) for v in obj]
    if isinstance(obj, bool):
        return obj
    return obj


def write_csv(name: str, rows: list[dict], fieldnames: list[str] | None = None) -> int:
    OUT_CSV.mkdir(parents=True, exist_ok=True)
    if not rows:
        return 0
    fieldnames = fieldnames or list(rows[0].keys())
    path = OUT_CSV / f"{name}.csv"
    with path.open("w", newline="", encoding="utf-8-sig") as fh:
        w = csv.DictWriter(fh, fieldnames=fieldnames, extrasaction="ignore")
        w.writeheader()
        for r in rows:
            w.writerow(r)
    print(f"  csv   {path.relative_to(ROOT)}  ({len(rows)} rows)")
    return len(rows)


def write_json(name: str, payload) -> None:
    OUT_JSON.mkdir(parents=True, exist_ok=True)
    path = OUT_JSON / f"{name}.json"
    path.write_text(json.dumps(_jsonable(payload), indent=2, ensure_ascii=False), encoding="utf-8")
    n = len(payload) if isinstance(payload, list) else "-"
    print(f"  json  {path.relative_to(ROOT)}  ({n} records)")


def main() -> int:
    stamp = datetime.now(timezone.utc).isoformat(timespec="seconds")
    total = 0

    print("Building structured exports...")

    # ---------------- SOURCES ----------------
    total += write_csv("source_registry", SOURCES)
    write_json("source_registry", {
        "meta": {**RESEARCH_META, "exported_at": stamp, "record_count": len(SOURCES)},
        "records": SOURCES,
    })

    # ---------------- SEGMENTS ----------------
    total += write_csv("segment_census", SEGMENTS)
    write_json("segment_census", {
        "meta": {**RESEARCH_META, "exported_at": stamp, "record_count": len(SEGMENTS),
                 "note": "conflict=true marks rows where sources disagree. Never collapse these into a single number."},
        "records": SEGMENTS,
    })

    total += write_csv("university_types",
                       [dict(university_type=a, count=b, as_of=c, source_id=d, reliability=e)
                        for a, b, c, d, e in UNIVERSITY_TYPES])
    total += write_csv("startups_by_state",
                       [dict(state=a, startups_recognised=b, direct_jobs=c, as_of="31 Mar 2026", source_id="GOV-013")
                        for a, b, c in STARTUPS_BY_STATE])

    # ---------------- COMPETITORS ----------------
    comp_rows, comp_matrix = [], []
    for c in COMPETITORS:
        r = {k: v for k, v in c.items() if k not in FEATURE_KEYS}
        r["price_low_inr"] = c.get("price_low_inr")
        r["price_high_inr"] = c.get("price_high_inr")
        comp_rows.append(r)
        m = {k: c[k] for k in ("name", "category", "origin", "pricing_confidence",
                               "price_low_inr", "indian_customers", "reviews")}
        for k in FEATURE_KEYS:
            m[f"score_{k}"] = c[k]
            m[f"label_{k}"] = SCALE[c[k]]
        comp_matrix.append(m)

    total += write_csv("competitors", comp_rows)
    total += write_csv("competitor_feature_matrix", comp_matrix)
    write_json("competitors", {
        "meta": {**RESEARCH_META, "exported_at": stamp, "record_count": len(COMPETITORS),
                 "scoring": SCALE,
                 "feature_dimensions": FEATURE_KEYS},
        "records": COMPETITORS,
    })

    # ---------------- PRICING ----------------
    total += write_csv("pricing_ledger", [dict(zip(PRICING_FIELDS, r)) for r in PRICING])
    ind_prices = sorted(
        (r for r in PRICING if r[6] == "India" and r[4]),
        key=lambda r: r[4],
    )
    write_json("pricing_ledger", {
        "meta": {**RESEARCH_META, "exported_at": stamp, "record_count": len(PRICING),
                 "fx_assumption": "USD_INR=90, GBP_INR=135 - directional only",
                 "RULE": "Never present a competitor's asking price as evidence of what an institution would pay. They are different quantities."},
        "records": [dict(zip(PRICING_FIELDS, r)) for r in PRICING],
        "india_price_ladder_inr_annualised": [r[4] for r in ind_prices],
        "competitive_anchor_inr": 75000,
        "todo_md_assumption_inr": 120000,
        "gap_note": "todo.md's unvalidated Rs 1.2L assumption sits ABOVE the cheapest credible Indian incumbent (Orbit Launch, Rs 75,000).",
    })

    # ---------------- GAPS ----------------
    total += write_csv("positioning_gaps", GAPS)
    write_json("positioning_gaps", {
        "meta": {**RESEARCH_META, "exported_at": stamp, "record_count": len(GAPS)},
        "records": GAPS,
    })

    # ---------------- QUESTIONS & DECISIONS ----------------
    total += write_csv("open_questions", OPEN_QUESTIONS)
    write_json("open_questions", {
        "meta": {**RESEARCH_META, "exported_at": stamp, "record_count": len(OPEN_QUESTIONS),
                 "blocking_count": sum(1 for q in OPEN_QUESTIONS if q["priority"] == "BLOCKING")},
        "records": OPEN_QUESTIONS,
    })

    total += write_csv("decision_log", DECISIONS)
    write_json("decision_log", {
        "meta": {**RESEARCH_META, "exported_at": stamp, "record_count": len(DECISIONS)},
        "records": DECISIONS,
    })

    # ---------------- PROBLEMS ----------------
    total += write_csv("problem_evidence", PROBLEMS)
    write_json("problem_evidence", {
        "meta": {**RESEARCH_META, "exported_at": stamp, "record_count": len(PROBLEMS),
                 "grades": {"DOCUMENTARY": "proven from a government primary source that the work exists and what it demands",
                            "INFERRED": "strongly implied by documentary evidence but not itself observed",
                            "ASSUMED": "plausible, stated in todo.md, not yet evidenced at all"},
                 "warning": "We have interviewed ZERO institutions. No problem below is yet validated in the todo.md sense."},
        "records": PROBLEMS,
    })

    # ---------------- MASTER BUNDLE ----------------
    write_json("startuphub_research_phase0", {
        "meta": {**RESEARCH_META, "exported_at": stamp},
        "counts": {"sources": len(SOURCES), "segments": len(SEGMENTS), "competitors": len(COMPETITORS),
                   "pricing_records": len(PRICING), "positioning_gaps": len(GAPS),
                   "open_questions": len(OPEN_QUESTIONS), "decisions": len(DECISIONS), "problem_areas": len(PROBLEMS)},
        "headline_findings": [
            "India digitised innovation ACCOUNTABILITY, not innovation OPERATIONS. Every mandated system is a compliance ledger keyed on events and snapshots; none is a system of record keyed on a venture over time.",
            "The IIC portal has a menu item 'IPR/TTO Centres' that registers a TTO's existence and floor area - and has no field anywhere to record a single patent. Zero of 11 direct competitors have an IPR module.",
            "The market is NOT empty. NestLens Orbit publishes INR 75,000/yr all-in. todo.md's assumed Rs 1.2L sits ABOVE the cheapest credible Indian incumbent.",
            "Three capabilities have zero competitors across 11 vendors: IPR lifecycle, TRL as a first-class object, and YUKTI-NIR/IIC/ARIIA export. All three are MANDATED by India today.",
            "The real competitor is free and it is WhatsApp. IISc's own IIC page links students to a WhatsApp group.",
        ],
        "key_numbers": {
            "heis_total": 64756, "universities_aishe_2023_24": 1289, "colleges_aishe_2023_24": 48246,
            "iics_last_official_2022": 6400, "dpiit_recognised_startups_mar_2026": 223000,
            "institutionally_attributable_ventures": 5490, "nirf_institutions_in_dataset": 204,
            "meiTY_incubators_dec_2025": 517, "dst_tbis_2026": 175, "aic_acic_centres": 103,
            "hei_patent_filings_fy23": 15383, "hei_patent_filings_fy25": 33675,
            "patent_filing_growth_pct": 119, "tpo_offices_registered": 3249,
        },
        "price_band_inr_annualised": {
            "free_incumbent": 0, "trello_10_users": 54000, "orbit_launch_ANCHOR": 75000,
            "notion_plus_8_editors": 86400, "todo_md_assumption_UNVALIDATED": 120000,
            "founderhood_starter_university_discount": 182070, "acceleratorapp_core": 539000,
            "incubatee_year_one": 395200, "elsevier_pure_min_indian": 4460000,
        },
    })

    print(f"\nDone. {total} CSV rows across 11 files, 9 JSON files.")
    return 0


if __name__ == "__main__":
    sys.exit(main())