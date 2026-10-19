#!/usr/bin/env python3
"""StartupHub Phase 3A exporter - the two government forms, mined from published PDFs.

todo.md Phase 3 wants interview evidence. Interviews cannot be synthesised, so
Workstream A mines the public primary artefacts instead: the filled-in NIRF
Innovation and ARIIA forms that institutions submit under their own name.

Writes, per the repository layering rule (summaries in topic folders, data in
_exports):

  01_Problem_Research/F_Synthesis/Government_Form_Analysis.md
  _exports/phase3/form_corpus.csv
  _exports/phase3/dpiit_join_key.csv
  _exports/phase3/sentinel_register.csv
  _exports/phase3/verbatim_quotes.csv
  _exports/phase3/findings.json + findings_schema.json
  _exports/raw/phase3_forms_RAW.json

Sources registered as P3-001..P3-011 in 00_Research_Index/Source_Registry.csv.

WHAT THIS IS NOT: none of this is interview evidence. Willingness to pay, felt
pain and budget ownership stay unverified. The prose says so on every page.

Usage:  python build/build_phase3.py
"""

import csv
import json
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
ROOT = HERE.parent

import data_p3_forms as F          # noqa: E402

OUT = ROOT / "_exports" / "phase3"
RAW = ROOT / "_exports" / "raw"
SYNTH = ROOT / "01_Problem_Research" / "F_Synthesis"

GENERATED = "2026-10-19"

REGISTRY_COLUMNS = [
    "id", "research_area", "claim_supported", "source_org", "source_type",
    "tier", "reliability", "url", "publication_date", "access_date",
    "geography", "customer_segment", "notes",
]

P3_RESEARCH_AREA = "Phase 3A - government forms (NIRF/ARIIA)"

P3_CLAIMS = {
    "nirf_iitb_2026": "NIRF TRL table keyed on DPIIT number loses 16 recognised startups",
    "nirf_iisc_2026": "Near-complete DPIIT join but placeholder DIPP0000 keys present",
    "nirf_iitd_2025": "8 of 38 recognised startups lose identity at the DPIIT join",
    "nirf_nitw_2025": "Reverse gap: TRL table key absent from the recognised table",
    "nirf_jnu_2026": "Clean join possible at small scale with one competent operator",
    "nirf_nitap_2026": "Worst measured loss rate: 4 of 6 recognised startups drop",
    "nirf_panimalar_2025": "Private college, clean join on a tiny denominator",
    "ariia_iitk_2022": "IIT Kanpur records 0 IIC stars despite a mature incubator",
    "ariia_iitism_2022": "Multi-value cell '1,2,3,4' in a scalar star field",
    "ariia_aditya_2022": "Small institution leaves the most ARIIA fields blank",
    "ariia_lbrce_2020": "ARIIA expenditure split is retrospective spend, not a request",
}


# --------------------------------------------------------------------------
# helpers
# --------------------------------------------------------------------------
def write_csv(path, cols, rows):
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", newline="", encoding="utf-8-sig") as fh:
        w = csv.DictWriter(fh, fieldnames=cols, extrasaction="ignore")
        w.writeheader()
        for r in rows:
            w.writerow(r)
    return len(rows)


def merge_registry(rows):
    reg = ROOT / "00_Research_Index" / "Source_Registry.csv"
    with reg.open("r", encoding="utf-8-sig", newline="") as fh:
        existing = list(csv.DictReader(fh))
    have = {r["id"] for r in existing}
    todo = [r for r in rows if r["id"] not in have]
    if not todo:
        return len(existing), 0
    fields = list(existing[0].keys())
    if set(fields) ^ set(REGISTRY_COLUMNS):
        raise SystemExit("Source_Registry.csv columns changed; update REGISTRY_COLUMNS.")
    with reg.open("w", encoding="utf-8", newline="") as fh:
        w = csv.DictWriter(fh, fieldnames=fields)
        w.writeheader()
        for r in existing + todo:
            w.writerow(r)
    return len(existing), len(todo)


def ariia_years(f):
    """ARIIA stars are printed per academic year 2018-19 -> 2021-22."""
    return ["2018-19", "2019-20", "2020-21", "2021-22"]


# --------------------------------------------------------------------------
# machine exports
# --------------------------------------------------------------------------
FORM_COLS = [
    "key", "form", "institution", "institution_type", "year",
    "dpiit_recognised", "dpiit_in_trl", "no_data_found_count",
    "sections_present", "pages", "extract_chars", "parse_status", "url",
]


def write_corpus():
    rows = []
    for f in F.ALL_FORMS:
        rows.append({
            "key": f["key"],
            "form": "NIRF" if f["key"].startswith("nirf") else "ARIIA",
            "institution": f["institution"],
            "institution_type": f["institution_type"],
            "year": f["year"],
            "dpiit_recognised": f.get("dpiit_recognised", "not_applicable"),
            "dpiit_in_trl": f.get("dpiit_in_trl", "not_applicable"),
            "no_data_found_count": f.get("no_data_found_count", "not_applicable"),
            "sections_present": f.get("sections_present", "not_applicable"),
            "pages": f["pages"],
            "extract_chars": f["extract_chars"],
            "parse_status": f["parse_status"],
            "url": f["url"],
        })
    return write_csv(OUT / "form_corpus.csv", FORM_COLS, rows)


JOIN_COLS = [
    "key", "institution", "institution_type", "year", "dpiit_recognised",
    "dpiit_in_trl", "lost_at_join", "reverse_gap", "loss_rate_pct",
    "placeholder_dpiit_count", "url",
]


def write_join():
    return write_csv(OUT / "dpiit_join_key.csv", JOIN_COLS, F.dpiit_join_metrics())


SENT_COLS = ["form", "field", "literal", "real_meaning", "sentinel_class", "evidence_grade"]


def write_sentinels():
    return write_csv(OUT / "sentinel_register.csv", SENT_COLS, F.SENTINELS)


QUOTE_COLS = ["form", "text", "meaning", "supports"]


def write_quotes():
    return write_csv(OUT / "verbatim_quotes.csv", QUOTE_COLS, F.VERBATIM)


def write_findings():
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / "findings.json").write_text(json.dumps(dict(
        summary=F.summary(),
        findings=F.findings(),
        limits=F.LIMITS,
        join_key=F.dpiit_join_metrics(),
    ), indent=2, ensure_ascii=False), encoding="utf-8")

    (OUT / "findings_schema.json").write_text(json.dumps(dict(
        note="Field definitions and the honesty guards enforced by "
             "data_p3_forms.validation(). The build fails if any guard breaks.",
        grades={"DOCUMENTED": "multiple primary forms read and cited",
                "SINGLE-SOURCE": "one primary form",
                "HYPOTHESIS": "structurally implied, NOT evidenced"},
        sentinel_classes={
            "non_report": "0 recorded because the institution did not report",
            "in_progress": "0 recorded because the ranking cycle was incomplete",
            "placeholder_key": "DIPP0000-style filler where a join key was required",
            "multi_value_cell": "several values in one scalar cell; not a number",
            "blank_not_zero": "empty cell that a sibling column encoded as 0",
        },
        guards=[
            "a form may only be counted when parse_status == parsed",
            "every numeric 0 in the corpus must carry a sentinel explanation",
            "a DOCUMENTED finding must rest on >= 2 forms",
            "every verbatim quote must trace to a mined form and a real finding",
            "no interview-style claim wording is permitted anywhere in this module",
        ],
        fields={
            "lost_at_join": "dpiit_recognised - dpiit_in_trl; startups that lose identity",
            "reverse_gap": "dpiit_in_trl - dpiit_recognised; keys with no recognised row",
            "loss_rate_pct": "lost_at_join / dpiit_recognised * 100",
        },
    ), indent=2, ensure_ascii=False), encoding="utf-8")
    return len(F.findings())


def write_raw():
    RAW.mkdir(parents=True, exist_ok=True)
    p = RAW / "phase3_forms_RAW.json"
    p.write_text(json.dumps(dict(
        note="Raw Phase 3A extraction layer. Same records as _exports/phase3/ with no "
             "interpretation added. Regenerated - do not hand-edit. Contains NO interview "
             "data and no synthetic output.",
        generated=GENERATED, generated_by="build/build_phase3.py",
        extract_method=F.EXTRACT_METHOD,
        forms=F.ALL_FORMS, verbatim=F.VERBATIM, sentinels=F.SENTINELS,
        limits=F.LIMITS,
    ), indent=2, ensure_ascii=False), encoding="utf-8")
    return p


def registry_rows():
    rows = []
    for i, f in enumerate(F.ALL_FORMS, start=1):
        rows.append({
            "id": f"P3-{i:03d}",
            "research_area": P3_RESEARCH_AREA,
            "claim_supported": P3_CLAIMS.get(f["key"], "Phase 3A government form evidence"),
            "source_org": f["institution"],
            "source_type": ("NIRF submitted innovation data" if f["key"].startswith("nirf")
                            else "ARIIA submitted application"),
            "tier": "T1",
            "reliability": "HIGH",
            "url": f["url"],
            "publication_date": str(f["year"]),
            "access_date": GENERATED,
            "geography": "India",
            "customer_segment": f["institution_type"],
            "notes": (
                f"parse_status={f['parse_status']}; {f['pages']} pages, text layer "
                f"{f['extract_chars']:,} chars; {f['institution_type']}; "
                f"public self-reported institutional submission; "
                f"no OCR, ligature loss affects wording not counts"
            ),
        })
    return rows


# --------------------------------------------------------------------------
# prose (topic folder, per the layering rule)
# --------------------------------------------------------------------------
def write_analysis():
    SYNTH.mkdir(parents=True, exist_ok=True)
    p = SYNTH / "Government_Form_Analysis.md"
    j = F.dpiit_join_metrics()
    fs = F.findings()
    total_rec = sum(r["dpiit_recognised"] for r in j)
    total_lost = sum(r["lost_at_join"] for r in j)
    worst = max(j, key=lambda r: (r["loss_rate_pct"] or 0))

    L = []
    a = L.append
    a("# The Government Forms Institutions Actually Fill In")
    a("")
    a(f"**Phase 3 Workstream A - {len(F.ALL_FORMS)} published forms - built "
      f"{GENERATED} by `build/build_phase3.py`.**")
    a("")
    a("> **This is documentary evidence, not interview evidence.** Every claim below "
      "is traced to a published PDF that the institution itself submitted under its "
      "own name. Willingness to pay, felt pain and real budget ownership remain "
      "**unverified** and cannot be settled by any document.")
    a("")
    a("---")
    a("")

    a("## Why these two forms")
    a("")
    a("| Form | What it asks for | Who fills it |")
    a("|---|---|---|")
    a("| **NIRF Innovation** | Startups recognised by DPIIT, VC investment, "
      "per-innovation TRL, incubation, IIC | IIC / nodal officer |")
    a("| **ARIIA** | 7 sections: I&E teaching, IIC, IPR cell, TRL 4-9 innovations, "
      "ventures started/supported, IIC star bands | Institution + nodal officer |")
    a("")
    a("These are the government demand-side ledger. If an institution's innovation "
      "reporting has a defect, it will be visible here - and in this set it is.")
    a("")

    a("## Corpus")
    a("")
    a(f"- **{len(F.NIRF_FORMS)} NIRF** and **{len(F.ARIIA_FORMS)} ARIIA** forms, "
      f"{sum(f['pages'] for f in F.ALL_FORMS):,} pages, all parse_status `parsed`.")
    a("- Mix spans IIT, IISc, NIT, central university, private college and a "
      "small institution, across 2020-2026.")
    a(f"- Extraction: {F.EXTRACT_METHOD.split('.')[0]}.")
    a("")

    a("---")
    a("")
    a("## Finding 1 - the DPIIT join key breaks (the headline)")
    a("")
    a("The NIRF form asks for two things about the same startups:")
    a("")
    a("1. which startups are **Recognized by DPIIT**;")
    a("2. a per-innovation **TRL** table.")
    a("")
    a("The only key joining them is the **DPIIT registration number**. That number is "
      "granted by the DPIIT to the **founder**, not held by the institution. So the "
      "join key is an identifier the person filling the form often does not have.")
    a("")
    a("| Institution | Year | Recognised | Keyed in TRL | Lost | Rate |")
    a("|---|---|---:|---:|---:|---:|")
    for r in sorted(j, key=lambda x: -(x["loss_rate_pct"] or 0)):
        rate = f"{r['loss_rate_pct']}%" if r["loss_rate_pct"] is not None else "-"
        a(f"| {r['institution']} | {r['year']} | {r['dpiit_recognised']} | "
          f"{r['dpiit_in_trl']} | {r['lost_at_join']} | {rate} |")
    a(f"| **Total** | | **{total_rec}** | | **{total_lost}** | "
      f"**{round(total_lost/total_rec*100,1)}%** |")
    a("")
    a(f"Worst case is **{worst['institution']}**, which recognises "
      f"{worst['dpiit_recognised']} startups but can evidence a TRL for only "
      f"{worst['dpiit_in_trl']}.")
    a("")
    a("One form (NIT Warangal 2025) shows the **reverse gap**: the TRL table carries a "
      "DPIIT number for an innovation whose startup is missing from the recognised "
      "table. Two tables, one submission, disagreeing.")
    a("")
    a("**Why this is the most product-relevant fact in the corpus.** The state already "
      "knows which startups an institution has, and already asks for TRL. What is "
      "missing is the join. An institution can lose track of its own portfolio while "
      "appearing fully compliant on paper - and nothing in the form lets anyone "
      "detect it.")
    a("")

    a("---")
    a("")
    a("## Finding 2 - blank, 0 and \"0 (On Progress)\" all mean different things")
    a("")
    a("ARIIA Section 1.2 prints the IIC star ladder per academic year. Read it:")
    a("")
    a("| Institution | 2018-19 | 2019-20 | 2020-21 | 2021-22 |")
    a("|---|---|---|---|---|")
    for f in F.ARIIA_FORMS:
        if f["iic_star_bands"]:
            b = f["iic_star_bands"] + [""] * (4 - len(f["iic_star_bands"]))
            a(f"| {f['institution']} | {b[0] or '(blank)'} | {b[1] or '(blank)'} | "
              f"{b[2] or '(blank)'} | {b[3] or '(blank)'} |")
    a("")
    a("Three problems in one table:")
    a("")
    a("- **IIT Kanpur records 0 stars for 2020-21** while running one of India's most "
      "mature technology business incubators. The recorded value contradicts the "
      "institution's own published capability, so the 0 is a **non-report**, not a "
      "measurement.")
    a("- **A blank and a 0 sit in the same column** of the same table (IIT Kanpur, "
      "consecutive years) with no legend distinguishing them.")
    a("- **`1,2,3,4` sits in one scalar cell** (IIT (ISM) 2018-19) - four values in a "
      "field that expects one.")
    a("")
    a(f"The sentinel register holds **{len(F.SENTINELS)} entries** across five kinds of "
      "meaningless number: "
      + ", ".join(sorted({
          "non-report (`0` where nothing was reported)",
          "ranking cycle still open (`0 (On Progress)`)",
          "multi-value in a scalar cell",
          "placeholder join key (`DIPP0000`)",
          "blank that a sibling column encoded as `0`",
      }))
      + ". Any ranking built on these forms will read non-report as underperformance.")
    a("")
    a("This is Phase 1's \"0 is not a measurement\" problem, now observed inside the "
      "primary government instrument itself.")
    a("")

    a("---")
    a("")
    a("## Finding 3 - ARIIA defers the TRL record to YUKTI-NIR")
    a("")
    a("> " + F.VERBATIM[0]["text"])
    a("")
    a("ARIIA Section 4 asks how many innovations are *Verified and Recommended* - and "
      "the record lives in the **YUKTI National Innovation Repository**, a central IIC "
      "system, not with the institution.")
    a("")
    a("The institution is a **pointer, not a system of record**. It submits a count it "
      "cannot independently verify. This is the cleanest available statement of the "
      "gap: the state has already built a central innovation repository, and the "
      "institution still cannot tell you what its own portfolio is doing this year.")
    a("")

    a("---")
    a("")
    a("## Finding 4 - ARIIA asks whether an IPR cell exists, not whether a patent moved")
    a("")
    a("> " + [v for v in F.VERBATIM if v["supports"] == "F-ARIIA-IPR-CELL"][0]["text"])
    a("")
    a("Section 3.3 is a single capability checkbox. No patent number, no filing date, "
      "no stage, no owner.")
    a("")
    a("So at national level the instrument stops at *does a cell exist*. This is the "
      "documentary proof of the Phase 0 claim that **no direct competitor provides a "
      "complete IPR lifecycle** - and neither does the government's own ranking form.")
    a("")

    a("---")
    a("")
    a("## Finding 5 - \"supported\" has no amount, no date, no scope")
    a("")
    a("> " + [v for v in F.VERBATIM if v["supports"] == "F-ARIIA-SEC5"][0]["text"])
    a("")
    a("An institution records that it started and supported a venture, plus "
      "recognitions received. It cannot answer *what did that cost, and when*. "
      "Institutional memory of its own support commitments is not recoverable from "
      "the record.")
    a("")

    a("---")
    a("")
    a("## Finding 6 - the one money signal points backwards")
    a("")
    a("> " + [v for v in F.VERBATIM if v["supports"] == "F-ARIIA-FUND-SPLIT"][0]["text"])
    a("")
    a("ARIIA forces an **expenditure** split between own money and external "
      "sponsorship (LBRCE 2020: 8 internal rows against 7 external). It is "
      "retrospective - the government learns what was already spent, never what is "
      "needed next.")
    a("")
    a("This directly bounds the Phase 0 conclusion: there is **no documented "
      "budget-holder signal** for innovation software, and the single government "
      "money signal that exists points backwards in time.")
    a("")

    a("---")
    a("")
    a("## Finding 7 - missingness tracks maturity")
    a("")
    a("| Institution | Type | \"No Data Found\" |")
    a("|---|---|---:|")
    for f in sorted(F.ARIIA_FORMS, key=lambda x: -x["no_data_found_count"]):
        a(f"| {f['institution']} | {f['institution_type']} | {f['no_data_found_count']} |")
    a("")
    a("Completeness is an **equity problem**. Small institutions leave the most fields "
      "blank, so any ranking built on form completeness systematically disadvantages "
      "them - and gives blank-heavy forms an incentive to over-report.")
    a("")
    a("ARIIA also counts in **academic-year pairs** (\"AY 2020-21 & 2021-22\") while "
      "NIRF counts on a single cycle. Two ledgers, incompatible time grains, not "
      "reconcilable without manual work.")
    a("")

    a("---")
    a("")
    a("## What this changes")
    a("")
    a("| Phase 0 claim | Status after Phase 3A |")
    a("|---|---|")
    a("| Government systems are compliance ledgers, not venture systems of record | "
      "**Strengthened** - F-DPIIT-JOIN and F-ARIIA-YUKTI |")
    a("| No competitor covers an end-to-end patent lifecycle | "
      "**Strengthened** - the government's own ARIIA 3.3 is a yes/no cell checkbox |")
    a("| Reported metrics are not venture metrics | "
      "**Strengthened** - F-SENTINEL-ZERO, F-ARIIA-STARS |")
    a("| No documented budget-holder signal | "
      "**Unchanged and bounded** - the only money signal is retrospective spend |")
    a("")
    a("**New:** the join-key defect is not a gap StartupHub has to argue for. It is "
      "already the visible behaviour of the official forms, in published data, at "
      "IITs, NITs, IISc and a private college.")
    a("")

    a("---")
    a("")
    a("## Honest limits")
    a("")
    for lim in F.LIMITS:
        a(f"- {lim}")
    a("")
    a("---")
    a("")
    a("## What interviews must now test")
    a("")
    a("Documents cannot answer these. Phase 3 Workstream B exists to falsify them.")
    a("")
    a("| # | Question this corpus cannot answer |")
    a("|---|---|")
    a("| 1 | Does the nodal officer actually **hold** founders' DPIIT numbers, or "
      "re-derive them? Where from? |")
    a("| 2 | What do institutions use **between** NIRF and ARIIA cycles - Excel, "
      "Sheets, WhatsApp, an ERP, nothing? |")
    a("| 3 | When a startup's DPIIT number is unknown, what does the officer "
      "actually type into the TRL table? |")
    a("| 4 | Does anyone ever reconcile the NIRF and ARIIA numbers, or are they "
      "two unrelated submissions? |")
    a("| 5 | Who inside the institution would be accountable for fixing the join - "
      "and is that the buyer? |")
    a("| 6 | Would anyone pay to make one portfolio answerable across both forms, "
      "or is the NIRF deadline the only forcing event? |")
    a("")
    a("---")
    a("")
    a(f"Machine-readable: `_exports/phase3/`. Sources `P3-001`-`P3-{len(F.ALL_FORMS):03d}` "
      f"in `00_Research_Index/Source_Registry.csv`. Reproduce with "
      f"`python build/build_phase3.py`; re-extract with `python build/_fetch_forms.py`.")
    a("")

    p.write_text("\n".join(L), encoding="utf-8")
    return p


# --------------------------------------------------------------------------
def main():
    errs, warns = F.validation()
    for w in warns:
        print(f"  warn: {w}")
    if errs:
        raise SystemExit("Validation failed:\n  - " + "\n  - ".join(errs))

    n1 = write_corpus();     print(f"  csv/form_corpus.csv            {n1:4d} forms")
    n2 = write_join();       print(f"  csv/dpiit_join_key.csv         {n2:4d} NIRF forms x join measurement")
    n3 = write_sentinels();  print(f"  csv/sentinel_register.csv      {n3:4d} non-zero sentinels")
    n4 = write_quotes();     print(f"  csv/verbatim_quotes.csv        {n4:4d} quotes")
    n5 = write_findings();   print(f"  json/findings.json + schema    {n5:4d} findings")

    write_analysis();        print("  01_Problem_Research/F_Synthesis/Government_Form_Analysis.md")

    before, added = merge_registry(registry_rows())
    print(f"  Source_Registry.csv            +{added} rows ({before} -> {before + added})")

    p = write_raw();         print(f"  _exports/raw/                  {p.name} ({p.stat().st_size:,} bytes)")

    print()
    j = F.dpiit_join_metrics()
    tr = sum(r["dpiit_recognised"] for r in j)
    tl = sum(r["lost_at_join"] for r in j)
    print(f"  Forms: {len(F.ALL_FORMS)} parsed | NIRF {len(F.NIRF_FORMS)} | ARIIA {len(F.ARIIA_FORMS)}")
    print(f"  DPIIT join: {tl}/{tr} startups lose identity ({round(tl/tr*100,1)}%) across "
          f"{sum(1 for r in j if r['lost_at_join']>0)}/{len(j)} NIRF forms")
    print(f"  Sentinels registered: {len(F.SENTINELS)} | Findings: {n5}")
    print("  NOTE: documentary evidence only - no interview data exists.")
    return 0


if __name__ == "__main__":
    sys.exit(main())