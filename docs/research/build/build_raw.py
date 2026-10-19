#!/usr/bin/env python3
"""StartupHub research — raw evidence layer.

Writes:
    _exports/raw/manifest.json          file manifest with SHA-256 + row counts
    _exports/raw/schema/*.json         JSON Schema for every dataset
    _exports/datasets/nirf_dpiit_startups_sample.csv    real rows from the public preview
    01_Evidence_Vault/Datasets/README.md

Usage: python build/build_raw.py
"""

import csv
import hashlib
import json
import sys
from datetime import datetime, timezone
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from data_sources import SOURCES                                  # noqa: E402
from data_market import SEGMENTS, PRICING, PRICING_FIELDS, GAPS  # noqa: E402
from data_competition import COMPETITORS, OPEN_QUESTIONS          # noqa: E402
from data_governance import DECISIONS, PROBLEMS                   # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
RAW = ROOT / "_exports" / "raw"
SCHEMA = RAW / "schema"
DATASETS = ROOT / "_exports" / "datasets"
VAULT = ROOT / "01_Evidence_Vault" / "Datasets"

# ---------------------------------------------------------------------------------
# REAL ROWS — the public preview of the Factly/Dataful NIRF DPIIT startup dataset.
# These are the actual rows visible on the dataset page (https://dataful.in/datasets/20553).
# The full 6,817-row dataset is PAYWALLED and was not downloaded.
# ---------------------------------------------------------------------------------
NIRF_SAMPLE = [
    (2026, "IR-I-U-1229", "St Joseph's University",          "Karnataka", "",          "AURATRAL DATASPACE PVT LTD",              2024, "DIPP180036"),
    (2026, "IR-I-U-1078", "Silver Oak University",            "Gujarat",   "",          "Ctenophora Advance Lighting Solution Pvt. Ltd.", 2024, "DIPP183794"),
    (2026, "IR-I-U-1078", "Silver Oak University",            "Gujarat",   "",          "Carbonmatrix Composite Pvt. Ltd.",          2023, "DIPP158576"),
    (2026, "IR-I-U-1078", "Silver Oak University",            "Gujarat",   "",          "Newway Biotech Pvt. Ltd",                  2022, "DIPP115799"),
    (2026, "IR-I-U-1078", "Silver Oak University",            "Gujarat",   "",          "Greengo Agro Technologies Private Limited", 2019, "DIPP104299"),
    (2026, "IR-I-U-1078", "Silver Oak University",            "Gujarat",   "",          "Tejeel Innovations LLP",                    2017, "DIPP123850"),
    (2026, "IR-I-U-1007", "Indian Institute of Management, Visakhapatnam", "Andhra Pradesh", "", "Remap Intelligence Solutions", 2024, "DIPP134921"),
    (2026, "IR-I-U-1007", "Indian Institute of Management, Visakhapatnam", "Andhra Pradesh", "", "Samak Technologies",         2024, "DIPP131797"),
    (2026, "IR-I-U-1007", "Indian Institute of Management, Visakhapatnam", "Andhra Pradesh", "", "Yotuh Energy",             2023, "DIPP106622"),
    (2026, "IR-I-U-1007", "Indian Institute of Management, Visakhapatnam", "Andhra Pradesh", "", "Buzzworthy Ventures",     2022, "DIPP139108"),
]

NIRF_COLUMNS = ["ranking_year", "institute_id", "institute_name", "state", "city",
                "name_of_venture", "year_of_recognition", "registration_number"]

NIRF_DATASET_META = {
    "dataset_name": "NIRF - Year and institution-wise details of startups recognised by DPIIT / Startup India",
    "publisher": "Factly Media & Research (dataful.in)",
    "url": "https://dataful.in/datasets/20553",
    "last_updated": "2026-07-20",
    "access_date": "2026-10-18",
    "tier": 3,
    "reliability": "MEDIUM",
    "rows_total": 6817,
    "columns": 8,
    "time_period": "2024-2026",
    "granularity": "Year, Institution",
    "distinct": {"ranking_year": 3, "institute_id": 204, "institute_name": 202,
                 "name_of_venture": 5490, "registration_number": 4538, "state": 26, "city": 80},
    "paywalled": True,
    "downloaded": False,
    "sample_rows_obtained": len(NIRF_SAMPLE),
    "stated_limitation": "The data pertains only to those universities/colleges/institutions whose detailed NIRF submissions is uploaded to the NIRF portal.",
    "analyst_caveats": [
        "6,817 rows are NOT 6,817 startups. They are startup-rows across THREE ranking years. Deduplicated distinct ventures is approximately 5,490.",
        "The universe is 204 institutions — a self-selected subset of ~1,200 universities and ~46,000 colleges. This is the innovation-active ELITE, not the HEI population.",
        "Three snapshots with NO longitudinal join key. A startup appearing in both 2024 and 2026 may be one venture or two.",
        "institute_id (204 distinct) and institute_name (202 distinct) disagree — a 0.98% dirty-record rate in a government-derived dataset, before any cross-portal join.",
        "No institute_id to AISHE code crosswalk exists.",
    ],
    "why_this_matters": [
        "The elite segment is real and IDENTIFIABLE TODAY: 204 institutions produced ~5,490 DPIIT-recognised startups over three years. Highest startup density, highest willingness to pay, most reachable segment in the entire census.",
        "The data is machine-extractable: institutions publish their own NIRF Data Capture System PDFs on the open web (verified live at NIT Rourkela, IIM Goa, JBIET, Rajah Serfoji Government College).",
        "A commercial intermediary has already monetised it. That is both proof of concept for StartupHub's own data asset and a warning that the pure-data play is partly occupied.",
    ],
    "next_action": "Extract the full NIRF PDF corpus into 01_Evidence_Vault/Datasets/. Highest-priority primary-data task in the project.",
    "source_id": "GOV-030",
}

# ---------------------------------------------------------------------------------
SCHEMAS = {
    "source_registry": {
        "description": "Every source cited in the StartupHub research, with tier and reliability grade.",
        "record_count": len(SOURCES),
        "fields": {"id": "string (unique, e.g. GOV-001 / COMP-001)", "area": "string", "claim": "string",
                   "org": "string", "stype": "string", "tier": "integer 1-4", "reliability": "HIGH|MEDIUM|LOW",
                   "url": "string|null", "pub": "ISO date or empty", "access": "ISO date",
                   "segment": "string", "conflict": "boolean (sources disagree)", "notes": "string"},
    },
    "segment_census": {
        "description": "Every denominator for the Indian institutional innovation ecosystem.",
        "record_count": len(SEGMENTS),
        "fields": {"segment": "string", "count": "integer", "unit": "string", "as_of": "string",
                   "source_id": "string FK -> source_registry.id", "reliability": "HIGH|MEDIUM|LOW",
                   "conflict": "boolean", "notes": "string"},
    },
    "competitors": {
        "description": "Competitor dossiers with feature-coverage scores.",
        "record_count": len(COMPETITORS),
        "feature_scores": {"scale": "0=Absent 1=Partial 2=Good 3=Strong",
                           "dimensions": ["portfolio", "incubation", "panel_eval_audit", "mentorship", "ipr",
                                          "trl", "resources", "programme", "milestones", "funding_ledger",
                                          "reporting", "ai", "integrations", "india_compliance", "mandated_export"]},
        "fields": {"name": "string", "vendor": "string", "origin": "string", "founded": "string",
                   "category": "string", "url": "string", "price_model": "string",
                   "price_low_inr": "integer|null", "price_high_inr": "integer|null",
                   "pricing_confidence": "VERIFIED|LISTED|NOT_PUBLIC", "indian_customers": "integer",
                   "reviews": "string", "iso_cert": "string", "white_label": "string",
                   "strengths": "string", "weaknesses": "string", "complaints": "string",
                   "does_not_do": "string", "threat_level": "string"},
    },
    "pricing_ledger": {
        "description": "Every real, cited price across direct, indirect and global vendors.",
        "record_count": len(PRICING),
        "fields": dict(zip(PRICING_FIELDS,
                           ["string", "string", "number", "string", "number",
                            "VERIFIED|LISTED|NOT_PUBLIC|MEDIUM|LOW", "string", "string"])),
        "fx_assumption": {"USD_INR": 90, "GBP_INR": 135, "note": "directional only"},
    },
    "positioning_gaps": {
        "description": "13 capabilities no competitor in the market covers.",
        "record_count": len(GAPS),
        "fields": {"gap_id": "string", "title": "string", "severity": "CRITICAL|HIGH|MEDIUM",
                   "competitors_with": "integer", "competitors_total": "integer", "evidence": "string",
                   "gap_detail": "string", "why_india": "string", "nearest_competitor": "string",
                   "verdict": "string"},
    },
    "open_questions": {
        "description": "Unresolved conflicts and gaps. Nothing here is silently resolved.",
        "record_count": len(OPEN_QUESTIONS),
        "fields": {"id": "string", "priority": "BLOCKING|HIGH|MEDIUM|LOW", "area": "string", "title": "string",
                   "what_we_know": "string", "why_it_blocks": "string", "what_would_settle_it": "string",
                   "interim_handling": "string", "source_ids": "semicolon-separated FK list",
                   "status": "OPEN|ACCEPTED"},
    },
    "decision_log": {
        "description": "Decisions made, the evidence behind them, and what would reverse them.",
        "record_count": len(DECISIONS),
        "fields": {"id": "string", "date": "ISO date", "topic": "string", "decision": "string",
                   "evidence": "string", "reverses_if": "string", "status": "string"},
    },
    "problem_evidence": {
        "description": "The 12 problem areas, graded by evidence strength.",
        "record_count": len(PROBLEMS),
        "fields": {"num": "integer", "area": "string",
                   "grade": "DOCUMENTARY|INFERRED|ASSUMED", "evidence_count": "integer",
                   "evidence": "string", "inference": "string", "still_needs": "string",
                   "source_ids": "semicolon-separated FK list"},
    },
    "nirf_dpiit_startups": {
        "description": "NIRF institution-wise DPIIT-recognised startup dataset (PAYWALLED - sample rows only obtained).",
        "record_count": "6817 (not downloaded)",
        "fields": {"ranking_year": "integer", "institute_id": "string", "institute_name": "string",
                   "state": "string", "city": "string|null", "name_of_venture": "string",
                   "year_of_recognition": "integer", "registration_number": "string"},
        "meta": NIRF_DATASET_META,
    },
}


def sha256(p: Path) -> str:
    h = hashlib.sha256()
    with p.open("rb") as fh:
        for chunk in iter(lambda: fh.read(65536), b""):
            h.update(chunk)
    return h.hexdigest()


def main() -> int:
    stamp = datetime.now(timezone.utc).isoformat(timespec="seconds")
    for d in (RAW, SCHEMA, DATASETS, VAULT):
        d.mkdir(parents=True, exist_ok=True)

    print("Building raw evidence layer...")

    # ---- schemas ----
    for name, s in SCHEMAS.items():
        (SCHEMA / f"{name}.schema.json").write_text(
            json.dumps({"$schema": "https://json-schema.org/draft/2020-12/schema",
                        "title": name, "generated_at": stamp,
                        "project": "StartupHub", "phase": 0, **s}, indent=2, ensure_ascii=False),
            encoding="utf-8")
        print(f"  schema  {name}.schema.json")

    # ---- NIRF sample rows (real, from the public dataset preview) ----
    out = DATASETS / "nirf_dpiit_startups_SAMPLE.csv"
    with out.open("w", newline="", encoding="utf-8-sig") as fh:
        w = csv.writer(fh)
        w.writerow(NIRF_COLUMNS)
        w.writerows(NIRF_SAMPLE)
    (DATASETS / "nirf_dpiit_startups_SAMPLE.meta.json").write_text(
        json.dumps(NIRF_DATASET_META, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"  csv    {out.relative_to(ROOT)}  ({len(NIRF_SAMPLE)} real sample rows)")

    # ---- manifest ----
    # Synthetic material (Ollama, models, any generated respondent) lives in
    # _exports/synthetic/ and is EXCLUDED from the manifest. A file that could
    # be mistaken for something a person said must never be hashed as evidence.
    SYNTHETIC_DIR = "_exports/synthetic"
    manifest = {"generated_at": stamp, "project": "StartupHub", "phase": 0,
                "note": "Every export file, with SHA-256 so downstream consumers can verify integrity.",
                "excluded": [f"{SYNTHETIC_DIR}/ (synthetic, not evidence)"],
                "files": []}
    for pattern_root, pattern in ((ROOT / "_exports", "**/*"),):
        for p in sorted(pattern_root.rglob("*")):
            if not p.is_file() or p.name == "manifest.json":
                continue
            if SYNTHETIC_DIR in p.relative_to(ROOT).as_posix():
                continue
            manifest["files"].append({
                "path": str(p.relative_to(ROOT)).replace("\\", "/"),
                "bytes": p.stat().st_size,
                "sha256": sha256(p),
            })
    md_files = sorted(ROOT.glob("*.md"))
    for p in md_files:
        manifest["files"].append({"path": p.name, "bytes": p.stat().st_size, "sha256": sha256(p)})
    for sub in ("00_Research_Index", "01_Evidence_Vault", "01_Problem_Research",
                "02_Landscape_Map", "02_User_Research", "03_Market_Research",
                "03_Problem_Evidence", "04_Competitor_DeepDive", "05_Government_Data",
                "05_Market_Sizing", "06_Pricing_Evidence", "08_User_Roles",
                "09_Market_Data", "13_Synthesis", "14_Assets"):
        for p in sorted((ROOT / sub).rglob("*.md")):
            manifest["files"].append({
                "path": str(p.relative_to(ROOT)).replace("\\", "/"),
                "bytes": p.stat().st_size, "sha256": sha256(p)})

    manifest["counts"] = {
        "markdown_research_files": len([f for f in manifest["files"] if f["path"].endswith(".md")]),
        "csv": len([f for f in manifest["files"] if f["path"].endswith(".csv")]),
        "json": len([f for f in manifest["files"] if f["path"].endswith(".json")]),
        "xlsx": len([f for f in manifest["files"] if f["path"].endswith(".xlsx")]),
        "docx": len([f for f in manifest["files"] if f["path"].endswith(".docx")]),
        "svg": len([f for f in manifest["files"] if f["path"].endswith(".svg")]),
        "png": len([f for f in manifest["files"] if f["path"].endswith(".png")]),
        "mmd": len([f for f in manifest["files"] if f["path"].endswith(".mmd")]),
        "total_files": len(manifest["files"]),
    }
    (RAW / "manifest.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    print(f"\n  manifest.json  {manifest['counts']['total_files']} files hashed")
    for k, v in manifest["counts"].items():
        if k != "total_files":
            print(f"    {k:32s} {v}")
    return 0


if __name__ == "__main__":
    sys.exit(main())