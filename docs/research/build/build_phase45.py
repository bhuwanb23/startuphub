#!/usr/bin/env python3
"""StartupHub exporter - Phases 4 (segmentation), 5 (market), 7 (sizing), 30 (scorecard).

Writes, per the repository layering rule (summaries in topic folders, data in
_exports):

  03_Market_Research/README.md          the ecosystem base, with sources
  03_Market_Research/Segment_Census.md  Phase 4 segments + ICP
  05_Market_Sizing/README.md            TAM / SAM / SOM as RANGES
  13_Synthesis/Validation_Scorecard.md  Phase 30, rebuilt honestly
  _exports/phase45/market_base.csv
  _exports/phase45/iic_counts.csv
  _exports/phase45/conflicts.csv
  _exports/phase45/segments.csv
  _exports/phase45/icp_criteria.csv
  _exports/phase45/assumptions.csv
  _exports/phase45/sizing.csv
  _exports/phase45/validation_scorecard.csv
  _exports/phase45/market_schema.json
  _exports/raw/phase45_market_RAW.json

NO POINT ESTIMATES LEAVE THIS BUILD. Everything market-shaped is a range.
NO INTERVIEW EVIDENCE IS CLAIMED. Interviews conducted: 0.

Usage:  python build/build_phase45.py
"""

import csv
import json
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
ROOT = HERE.parent

import data_p5_market as M       # noqa: E402
import data_p47_segments as S    # noqa: E402

OUT = ROOT / "_exports" / "phase45"
RAW = ROOT / "_exports" / "raw"
MR = ROOT / "03_Market_Research"
SZ = ROOT / "05_Market_Sizing"
SYN = ROOT / "13_Synthesis"

GENERATED = "2026-10-19"


def write_csv(path, cols, rows):
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", newline="", encoding="utf-8-sig") as fh:
        w = csv.DictWriter(fh, fieldnames=cols, extrasaction="ignore")
        w.writeheader()
        for r in rows:
            w.writerow(r)
    return len(rows)


def register_sources():
    """Register the Phase 5 primary sources into Source_Registry.csv.

    Merged by URL so re-running never duplicates a row.
    """
    reg = ROOT / "00_Research_Index" / "Source_Registry.csv"
    with reg.open("r", encoding="utf-8-sig", newline="") as fh:
        existing = list(csv.DictReader(fh))
    fields = list(existing[0].keys())
    have = {r["url"] for r in existing if r.get("url")}

    new = [
        dict(id="M5-001", research_area="Phase 5 - ecosystem base",
             claim_supported="58,643 registered HEIs (1,168 universities / 45,473 colleges / 12,002 standalone)",
             source_org="Ministry of Education", source_type="government_statutory_survey",
             tier="T1", reliability="HIGH",
             url="https://www.pib.gov.in/PressReleasePage.aspx?PRID=1999713",
             publication_date="2024-01-25", access_date=GENERATED, geography="India",
             customer_segment="All higher education institutions",
             notes="AISHE 2021-22 final report. Registered institutions, NOT innovation-active. Super-bound only."),
        dict(id="M5-002", research_area="Phase 5 - ecosystem base",
             claim_supported="777 institutions filed the NIRF Innovation category; 7,692 unique applicants; 14,163 applications",
             source_org="NIRF / Ministry of Education", source_type="government_ranking_report",
             tier="T1", reliability="HIGH",
             url="https://www.nirfindia.org/nirfpdfcdn/2025/pdf/Report/IR2025_Report.pdf",
             publication_date="2025-09-04", access_date=GENERATED, geography="India",
             customer_segment="Institutions filing the NIRF Innovation category",
             notes="India Rankings 2025. 777 Innovation filers is the SAM floor. Regional split reconciles: 125+416+58+178=777."),
        dict(id="M5-003", research_area="Phase 5 - ecosystem base",
             claim_supported="16,367 IICs set up in 28 States and 8 UTs",
             source_org="Ministry of Education", source_type="government_status_page",
             tier="T1", reliability="MEDIUM",
             url="https://www.education.gov.in/en/nep/academic-research-internationalization",
             publication_date="2025", access_date=GENERATED, geography="India",
             customer_segment="Institutions holding an IIC",
             notes="CONFLICT C-01: three official IIC counts exist (14,067 / 14,830 / 16,367), a 16.4% spread. No counting rule stated. Range used, never a single figure."),
        dict(id="M5-004", research_area="Phase 5 - ecosystem base",
             claim_supported="197,692 DPIIT-recognised startups as of October 2025; 21.11 lakh jobs",
             source_org="DPIIT / Ministry of Commerce & Industry",
             source_type="parliamentary_written_reply", tier="T1", reliability="HIGH",
             url="https://knnindia.co.in/news/newsdetails/sectors/start-up/nearly-2-lakh-startups-recognised-under-startup-india-generating-over-21-lakh-jobs-piyush-goyal",
             publication_date="2025-12-02", access_date=GENERATED, geography="India",
             customer_segment="DPIIT-recognised startups",
             notes="CONFLICT C-03: 180,683 at 30 June 2025 vs 197,692 at Oct 2025 - 17,009 additions in ~4 months. Denominator decays within a year."),
        dict(id="M5-005", research_area="Phase 5 - ecosystem base",
             claim_supported="217 incubators selected under SISFS with Rs 916.91 crore approved; 244 seed-funded incubators",
             source_org="PIB / Startup India", source_type="government_press_release",
             tier="T1", reliability="HIGH",
             url="https://pib.gov.in/PressReleaseIframePage.aspx?PRID=2114865",
             publication_date="2025-03-25", access_date=GENERATED, geography="India",
             customer_segment="SISFS-selected incubators",
             notes="S4 segment evidence. AIC/EIC grant-in-aid up to Rs 10 crore is the only forward-looking budget signal found."),
        dict(id="M5-006", research_area="Phase 5 - ecosystem base",
             claim_supported="Patent filings 92,168 in 2023-24, up from 42,763 in 2014 (+115%)",
             source_org="Indian Patent Office (via Ministry of Education)",
             source_type="government_annual_report", tier="T1", reliability="HIGH",
             url="https://www.education.gov.in/en/nep/academic-research-internationalization",
             publication_date="2024", access_date=GENERATED, geography="India",
             customer_segment="Indian patent applicants",
             notes="Pairs with P-A07 CRITICAL: no institution in the 36-doc corpus keeps a patent deadline calendar."),
    ]
    todo = [r for r in new if r["url"] not in have]
    if todo:
        with reg.open("w", encoding="utf-8", newline="") as fh:
            w = csv.DictWriter(fh, fieldnames=fields)
            w.writeheader()
            for r in existing + todo:
                w.writerow(r)
    return len(existing), len(todo)


# --------------------------------------------------------------------------
# machine exports
# --------------------------------------------------------------------------
def write_market_base():
    rows = []
    for block, label in ((M.AISHE, "higher_education"), (M.NIRF_2025, "nirf_2025"),
                         (M.STARTUP_BASE, "startup_base"), (M.INCUBATION, "incubation")):
        for k, v in block.items():
            if isinstance(v, (int, float)):
                rows.append(dict(domain=label, metric=k, value=v,
                                 source=block.get("source", ""), tier=block.get("tier", ""),
                                 as_of=block.get("as_of", ""), url=block.get("url", "")))
    rows.append(dict(domain="ipr", metric="patent_filings_2023_24",
                     value=M.IPR["patent_filings_2023_24"], source=M.IPR["source"],
                     tier=M.IPR["tier"], as_of=M.IPR["as_of"], url=""))
    return write_csv(OUT / "market_base.csv",
                     ["domain", "metric", "value", "source", "tier", "as_of", "url"], rows)


def write_iic_counts():
    rows = [dict(value=v["value"], as_of=v["as_of"], org=v["org"], url=v["url"], note=v["note"])
            for v in M.IIC_COUNTS["variants"]]
    return write_csv(OUT / "iic_counts.csv", ["value", "as_of", "org", "url", "note"], rows)


def write_conflicts():
    cols = ["id", "subject", "variant_a", "variant_b", "variant_c", "spread_pct",
            "why_it_matters", "our_choice", "mirrors"]
    return write_csv(OUT / "conflicts.csv", cols, M.CONFLICTS)


def write_segments():
    cols = ["id", "name", "institution_types", "maturity", "willingness_to_pay", "needs",
            "size", "why_they_buy", "blockers", "documentary_basis", "priority"]
    rows = [dict(id=s["id"], name=s["name"],
                 institution_types="; ".join(s["institution_types"]),
                 maturity=s["maturity"], willingness_to_pay=s["willingness_to_pay"],
                 needs="; ".join(s["needs"]), size=s["size"],
                 why_they_buy=s["why_they_buy"], blockers="; ".join(s["blockers"]),
                 documentary_basis=" | ".join(s["documentary_basis"]),
                 priority=s["priority"]) for s in S.SEGMENTS]
    return write_csv(OUT / "segments.csv", cols, rows)


def write_icp():
    rows = [dict(axis="must_be", n=i + 1, criterion=c[0], basis=c[1])
            for i, c in enumerate(S.ICP["must_be"])]
    rows += [dict(axis="must_not_be", n=i + 1, criterion=c, basis="")
             for i, c in enumerate(S.ICP["must_not_be"])]
    return write_csv(OUT / "icp_criteria.csv", ["axis", "n", "criterion", "basis"], rows)


def write_assumptions():
    cols = ["id", "input", "value", "source", "grade", "dominates", "note"]
    rows = [dict(id=a["id"], input=a["input"], value=a["value"], source=a["source"],
                 grade=a["grade"], dominates=a["dominates"], note=a["note"])
            for a in S.ASSUMPTIONS]
    return write_csv(OUT / "assumptions.csv", cols, rows)


def write_sizing():
    t, sa, om = S.tam(), S.sam(), S.som()
    rows = [
        dict(layer="TAM", definition=t["definition"],
             institutions_low=t["institution_range"][0], institutions_high=t["institution_range"][1],
             price_low=t["price_range_inr"][0], price_high=t["price_range_inr"][1],
             value_low_inr=t["value_range_inr"][0], value_high_inr=t["value_range_inr"][1],
             display=t["value_display"], method=t["method"],
             confidence=t["confidence"], evidence_grade=t["evidence_grade"]),
        dict(layer="SAM", definition=sa["definition"],
             institutions_low=sa["institution_range"][0], institutions_high=sa["institution_range"][1],
             price_low=sa["price_range_inr"][0], price_high=sa["price_range_inr"][1],
             value_low_inr=sa["value_range_inr"][0], value_high_inr=sa["value_range_inr"][1],
             display=sa["value_display"], method=f"{sa['floor_basis']} | {sa['ceiling_basis']}",
             confidence=sa["confidence"], evidence_grade=sa["evidence_grade"]),
    ]
    for label in ("year_1", "year_2", "year_3"):
        y = om["by_year"][label]
        rows.append(dict(layer=f"SOM {label.replace('_',' ').upper()}", definition=om["definition"],
                         institutions_low=y["institutions"][0], institutions_high=y["institutions"][1],
                         price_low=S.PRICE_BAND_INR["anchor_verified"],
                         price_high=S.PRICE_BAND_INR["target"],
                         value_low_inr=y["revenue_inr"][0], value_high_inr=y["revenue_inr"][1],
                         display=y["revenue_display"], method=om["definition"],
                         confidence=om["confidence"], evidence_grade=om["evidence_grade"]))
    cols = ["layer", "definition", "institutions_low", "institutions_high", "price_low",
            "price_high", "value_low_inr", "value_high_inr", "display", "method",
            "confidence", "evidence_grade"]
    return write_csv(OUT / "sizing.csv", cols, rows)


SCORE_COLS = ["hypothesis", "evidence_type", "evidence", "grade", "validated", "remaining", "interview_ids"]


def write_scorecard():
    rows = [dict(hypothesis=r["hypothesis"], evidence_type=r["evidence_type"],
                 evidence=r["evidence"], grade=r["grade"], validated=r["validated"],
                 remaining=r["remaining"], interview_ids="; ".join(r["interview_ids"]))
            for r in S.SCORECARD]
    return write_csv(OUT / "validation_scorecard.csv", SCORE_COLS, rows)


def write_schema():
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / "market_schema.json").write_text(json.dumps(dict(
        note="Phases 4/5/7/30 field definitions and the guards enforced by "
             "data_p47_segments.validation().",
        rule_no_point_estimates=(
            "Every market figure is a RANGE. A midpoint implies precision the "
            "inputs do not support and is never computed."
        ),
        rule_no_interview_claims="Interviews conducted: 0. No cell may claim validation it has not earned.",
        grading={"T1_DOCUMENTED": "primary government source",
                 "SINGLE_SOURCE": "one primary source",
                 "HYPOTHESIS": "no primary evidence - analyst range only"},
        sizing_layers={
            "TAM": "institutions holding an IIC/AIC/EIC (mandated reporting function)",
            "SAM": "institutions demonstrably filing innovation returns",
            "SOM": "bounded by founder-led acquisition capacity",
        },
        assumptions=S.ASSUMPTIONS,
        size_limitations=S.SIZE_LIMITATIONS,
        market_gaps=M.GAPS,
        recorded_conflicts=M.CONFLICTS,
    ), indent=2, ensure_ascii=False), encoding="utf-8")
    return 1


def write_raw():
    RAW.mkdir(parents=True, exist_ok=True)
    p = RAW / "phase45_market_RAW.json"
    p.write_text(json.dumps(dict(
        note="Raw Phase 4/5/7 extraction layer. Public-source market data. "
             "Contains NO interview data and NO synthetic output. Regenerated - do not hand-edit.",
        generated=GENERATED, generated_by="build/build_phase45.py",
        interviews_conducted=0,
        aishe=M.AISHE, iic_counts=M.IIC_COUNTS, nirf_2025=M.NIRF_2025,
        incubation=M.INCUBATION, startup_base=M.STARTUP_BASE, ipr=M.IPR, gii=M.GII,
        conflicts=M.CONFLICTS, buyer_definition=M.BUYER_DEFINITION, market_gaps=M.GAPS,
        price_band=S.PRICE_BAND_INR, segments=S.SEGMENTS, icp=S.ICP,
        sizing=S.sizing_bundle(), scorecard=S.SCORECARD,
    ), indent=2, ensure_ascii=False), encoding="utf-8")
    return p


# --------------------------------------------------------------------------
# prose
# --------------------------------------------------------------------------
def write_market_readme():
    MR.mkdir(parents=True, exist_ok=True)
    p = MR / "README.md"
    r = M.iic_range()
    L = []
    a = L.append
    a("# Indian Innovation Ecosystem — The Real Base")
    a("")
    a(f"**Phase 5 — built {GENERATED} by `build/build_phase45.py`. Every figure is "
      f"T1 government/official.**")
    a("")
    a("---")
    a("")
    a("## The instruction this phase had to satisfy")
    a("")
    a("> *\"Don't automatically add all of these together. You need to determine "
      "**which ones are actually potential buyers**.\"* — `todo.md` PHASE 5")
    a("")
    a("That instruction is why this page leads with **three numbers that disagree**, "
      "not with a total.")
    a("")
    a("---")
    a("")
    a("## The base")
    a("")
    a("| Population | Count | As of | Source |")
    a("|---|---:|---|---|")
    a(f"| Registered HEIs (universities + colleges + standalone) | "
      f"**{M.AISHE['total_heis']:,}** | {M.AISHE['as_of']} | AISHE 2021-22 |")
    a(f"| Universities | {M.AISHE['universities']:,} | {M.AISHE['as_of']} | AISHE 2021-22 |")
    a(f"| Colleges | {M.AISHE['colleges']:,} | {M.AISHE['as_of']} | AISHE 2021-22 |")
    a(f"| Standalone institutions | {M.AISHE['standalone_institutions']:,} | "
      f"{M.AISHE['as_of']} | AISHE 2021-22 |")
    a(f"| **Institutions filing NIRF Innovation** | **{M.NIRF_2025['innovation_category']:,}** | "
      f"{M.NIRF_2025['as_of']} | India Rankings 2025 |")
    a(f"| Unique NIRF applicants (any category) | {M.NIRF_2025['unique_institutions']:,} | "
      f"{M.NIRF_2025['as_of']} | India Rankings 2025 |")
    a(f"| **IICs** | **{r['floor']:,} – {r['ceiling']:,}** | 2024 – 2026 | 3 official sources |")
    a(f"| DPIIT-recognised startups | {M.STARTUP_BASE['dpiit_recognised_startups']:,} | "
      f"{M.STARTUP_BASE['as_of']} | Lok Sabha reply |")
    a(f"| National patent filings | {M.IPR['patent_filings_2023_24']:,} | "
      f"{M.IPR['as_of']} | IPO annual report |")
    a(f"| SISFS-selected incubators | {M.INCUBATION['sisfs_incubators_selected']:,} | "
      f"{M.INCUBATION['as_of']} | PIB |")
    a("")
    a(f"**Total student enrolment {M.AISHE['total_enrolment_crore']} crore.** "
      f"{M.AISHE['colleges_private_unaided_pct']}% of colleges are private unaided — "
      f"which is why college-type is the wrong segmentation axis and *innovation "
      f"activity* is the right one.")
    a("")
    a("---")
    a("")
    a("## Why 58,643 is not the market")
    a("")
    a(f"> {M.AISHE['caveat']}")
    a("")
    a("AISHE counts **registration**. Phase 3A measured what registration is worth: "
      "IIT Kanpur holds an IIC and recorded **0** IIC stars while running one of "
      "India's most mature incubators. A registered institution with no accountable "
      "person is not a buyer.")
    a("")
    a("---")
    a("")
    a("## Conflict C-01 — three official counts of how many IICs exist")
    a("")
    a("| Value | As of | Source |")
    a("|---:|---|---|")
    for v in M.IIC_COUNTS["variants"]:
        a(f"| **{v['value']:,}** | {v['as_of']} | {v['org']} |")
    a("")
    a(f"That is a **{r['spread_pct']}% spread** across three government sources on the "
      f"single most important count in this market — and **none of them states the "
      f"counting rule**. Registered? Active? Ever submitted?")
    a("")
    a(f"**Our choice.** {M.CONFLICTS[0]['our_choice']}")
    a("")
    a("This is not a research complaint. It is the same defect this project has "
      "documented inside 36 institutional reports and 11 government forms: **a "
      "ledger that counts entries rather than state.** We cannot cite one of these "
      "numbers as *the* market — and neither can the customer.")
    a("")
    a("---")
    a("")
    a("## Who is actually a potential buyer")
    a("")
    a("Phase 5 asks us to determine this. Three testable criteria, no hand-waving:")
    a("")
    a("| Must have | Public proxy | Testable? |")
    a("|---|---|---|")
    for c in M.BUYER_DEFINITION["must_have_all"]:
        a(f"| {c['criterion']} | {c['proxy']} | {'yes' if c['testable'] else 'no'} |")
    a("")
    a("### Strong negative signals")
    a("")
    for s in M.BUYER_DEFINITION["strong_negative_signals"]:
        a(f"- {s}")
    a("")
    a("### Cannot be filtered with public data")
    a("")
    for c in M.BUYER_DEFINITION["cannot_be_filtered_yet"]:
        a(f"- {c}")
    a("")
    a("---")
    a("")
    a("## What this phase could NOT establish")
    a("")
    for g in M.GAPS:
        a(f"- {g}")
    a("")
    a("Machine-readable: `_exports/phase45/`. Sources `M5-001`–`M5-006` in "
      "`00_Research_Index/Source_Registry.csv`.")
    a("")
    p.write_text("\n".join(L), encoding="utf-8")
    return p


def write_segment_census():
    MR.mkdir(parents=True, exist_ok=True)
    p = MR / "Segment_Census.md"
    L = []
    a = L.append
    a("# Customer Segmentation and ICP")
    a("")
    a(f"**Phase 4 — built {GENERATED} by `build/build_phase45.py`. "
      f"{len(S.SEGMENTS)} segments across {len(S.SEGMENT_AXES)} axes.**")
    a("")
    a("> **Every segment is derived from published documents, not from interviews.** "
      "Each carries the documentary basis that puts an institution in it, so the "
      "segmentation is auditable rather than asserted. **Interviews conducted: 0.**")
    a("")
    a("---")
    a("")
    a("## Axes")
    a("")
    for axis, vals in S.SEGMENT_AXES.items():
        a(f"**{axis.replace('_',' ').title()}** — " + ", ".join(vals))
    a("")
    a("---")
    a("")
    a("## Segments")
    a("")
    a("| # | Segment | Types | Maturity | WTP | Priority |")
    a("|---|---|---|---|---|---|")
    for s in sorted(S.SEGMENTS, key=lambda x: x["priority"]):
        a(f"| {s['priority']} | **{s['id']} {s['name']}** | "
          f"{', '.join(s['institution_types'][:3])} | {s['maturity']} | "
          f"{s['willingness_to_pay']} | {s['priority']} |")
    a("")
    a("---")
    a("")
    for s in sorted(S.SEGMENTS, key=lambda x: x["priority"]):
        a(f"### {s['id']} — {s['name']}")
        a("")
        a(f"- **Size:** {s['size']}")
        a(f"- **Needs:** {', '.join(s['needs'])}")
        a(f"- **Willingness to pay:** {s['willingness_to_pay']}")
        a("")
        a(f"**Why they buy.** {s['why_they_buy']}")
        a("")
        a("**Documentary basis.**")
        for b in s["documentary_basis"]:
            a(f"- {b}")
        a("")
        a("**Blockers.** " + "; ".join(s["blockers"]) + ".")
        a("")
        if s.get("note"):
            a(f"> {s['note']}")
            a("")
        a("---")
        a("")
    a("## The Ideal Customer Profile")
    a("")
    a(f"### {S.ICP['name']}")
    a("")
    a(f"> {S.ICP['one_line']}")
    a("")
    a("**Must be:**")
    a("")
    a("| Criterion | Basis |")
    a("|---|---|")
    for c in S.ICP["must_be"]:
        a(f"| {c[0]} | {c[1]} |")
    a("")
    a("**Must not be:**")
    a("")
    for c in S.ICP["must_not_be"]:
        a(f"- {c}")
    a("")
    a(f"**Why not the obvious choice.** {S.ICP['why_not_the_obvious_choice']}")
    a("")
    a(f"**First targets.** {S.ICP['first_target_rank']}")
    a("")
    a("---")
    a("")
    a("## Limitation")
    a("")
    a("No segment here is validated against a customer. They are derived from "
      "published documents. The ICP's second must-be — *no system of record upstream "
      "of the form* — is still `HYPOTHESIS` (**H-01**). If a mature institution "
      "already keeps a venture register, the ICP is wrong and **S1 collapses**.")
    a("")
    p.write_text("\n".join(L), encoding="utf-8")
    return p


def write_sizing_doc():
    SZ.mkdir(parents=True, exist_ok=True)
    p = SZ / "README.md"
    t, sa, om = S.tam(), S.sam(), S.som()
    L = []
    a = L.append
    a("# TAM / SAM / SOM")
    a("")
    a(f"**Phase 7 — built {GENERATED} by `build/build_phase45.py`.**")
    a("")
    a("---")
    a("")
    a("## Read this before the numbers")
    a("")
    a("> ### Every figure below is a **RANGE**, and the range is wide on purpose.")
    a(">")
    a("> The addressable population is knowable from public sources. **The revenue "
      "per institution is not**, because willingness to pay has **zero primary "
      "evidence** — `OQ-03` has been open since Phase 0 and is still open.")
    a(">")
    a("> So the honest market is a band whose width is dominated by one unmeasured "
      "variable. **That is not a weakness of the analysis. It is the finding**, and "
      "it is the most important number to show an investor.")
    a("")
    a("---")
    a("")
    a("## TAM — Total Addressable")
    a("")
    a(f"**Definition.** {t['definition']}")
    a("")
    a("| Input | Low | High |")
    a("|---|---:|---:|")
    a(f"| Institutions | {t['institution_range'][0]:,} | {t['institution_range'][1]:,} |")
    a(f"| Annual contract value | ₹{t['price_range_inr'][0]:,} | ₹{t['price_range_inr'][1]:,} |")
    a(f"| **TAM** | **₹{t['value_range_inr'][0]/1e7:.1f} cr** | "
      f"**₹{t['value_range_inr'][1]/1e7:.1f} cr** |")
    a("")
    a(f"- **Method:** {t['method']}")
    a(f"- **Confidence:** {t['confidence']}")
    a(f"- **Evidence grade:** {t['evidence_grade']}")
    a("")
    a(f"> The institution range is the honest width: **three official IIC counts "
      f"disagree by {M.iic_range()['spread_pct']}%** and none states a counting rule "
      f"(Conflict C-01).")
    a("")
    a("---")
    a("")
    a("## SAM — Serviceable Addressable")
    a("")
    a(f"**Definition.** {sa['definition']}")
    a("")
    a("| Layer | Institutions | Basis |")
    a("|---|---:|---|")
    a(f"| Floor | {sa['institution_range'][0]:,} | {sa['floor_basis']} |")
    a(f"| Ceiling | {sa['institution_range'][1]:,} | {sa['ceiling_basis']} |")
    a("")
    a("| | Low | High |")
    a("|---|---:|---:|")
    a(f"| **SAM** | **₹{sa['value_range_inr'][0]/1e7:.2f} cr** | "
      f"**₹{sa['value_range_inr'][1]/1e7:.2f} cr** |")
    a("")
    a(f"> **This band is {sa['value_range_inr'][1]/sa['value_range_inr'][0]:.0f}× wide "
      f"on purpose.** It is bounded by two populations that are not the same thing: "
      f"the floor is a real purchase signal, the ceiling is a ranking applicant. "
      f"Presenting a midpoint would be false precision over a "
      f"{sa['value_range_inr'][1]/sa['value_range_inr'][0]:.0f}× range.")
    a("")
    a("---")
    a("")
    a("## SOM — Serviceable Obtainable")
    a("")
    a(f"**Definition.** {om['definition']}")
    a("")
    a("| Year | Institutions | Revenue (low) | Revenue (high) |")
    a("|---|---:|---:|---:|")
    for label, key in (("Year 1", "year_1"), ("Year 2", "year_2"), ("Year 3", "year_3")):
        y = om["by_year"][key]
        a(f"| {label} | {y['institutions'][0]}–{y['institutions'][1]} | "
          f"₹{y['revenue_inr'][0]:,} | ₹{y['revenue_inr'][1]:,} |")
    a("")
    a(f"> **We rejected the plan's own numbers.** {om['rejection_note']}")
    a("")
    a("---")
    a("")
    a("## The assumption ledger")
    a("")
    a("Every input, its source, its grade, and whether it dominates the error.")
    a("")
    a("| ID | Input | Value | Grade | Dominates? |")
    a("|---|---|---|---|---|")
    for a_ in S.ASSUMPTIONS:
        a(f"| `{a_['id']}` | {a_['input']} | {a_['value']} | `{a_['grade']}` | "
          f"{'**YES**' if a_['dominates'] else 'no'} |")
    a("")
    a("### Notes on the dominant error terms")
    a("")
    for a_ in S.ASSUMPTIONS:
        if a_["dominates"]:
            a(f"- **`{a_['id']}` {a_['input']}** — {a_['note']}")
    a("")
    a("> **Measuring any ONE of the three dominant error terms collapses the range "
      "more than any further market research would.**")
    a("")
    a("---")
    a("")
    a("## Limitations")
    a("")
    for l_ in S.SIZE_LIMITATIONS:
        a(f"- {l_}")
    a("")
    a("Machine-readable: `_exports/phase45/sizing.csv`, `assumptions.csv`.")
    a("")
    p.write_text("\n".join(L), encoding="utf-8")
    return p


def write_scorecard_doc():
    SYN.mkdir(parents=True, exist_ok=True)
    p = SYN / "Validation_Scorecard.md"
    L = []
    a = L.append
    a("# Customer Validation Scorecard")
    a("")
    a(f"**Phase 30 — built {GENERATED} by `build/build_phase45.py`.**")
    a("")
    a("---")
    a("")
    a("## Why this looks different from the plan")
    a("")
    a("> `todo.md` PHASE 30 specifies a scorecard with cells like *\"8/10 interviews\"*. "
      "**Interviews conducted: 0.**")
    a("")
    a("So the scorecard is rebuilt around what actually exists. Every row carries "
      "either **documentary evidence** or an explicit **`INTERVIEW REQUIRED`** marker. "
      "No row may show a tick it has not earned, and the build fails if one does.")
    a("")
    a("---")
    a("")
    a("## The scorecard")
    a("")
    a("| Hypothesis | Evidence | Grade | Status |")
    a("|---|---|---|---|")
    for r in S.SCORECARD:
        ev = r["evidence"] if r["evidence_type"] != "none" else "—"
        if len(ev) > 90:
            ev = ev[:87] + "..."
        a(f"| {r['hypothesis']} | {ev} | `{r['grade']}` | **{r['validated']}** |")
    a("")
    a("---")
    a("")
    a("## Tally")
    a("")
    sup = sum(1 for r in S.SCORECARD if r["validated"] == "SUPPORTED")
    par = sum(1 for r in S.SCORECARD if r["validated"] == "PARTIAL")
    req = sum(1 for r in S.SCORECARD if r["validated"] == "INTERVIEW REQUIRED")
    con = sum(1 for r in S.SCORECARD if r["validated"].startswith("CONTRADICTED"))
    a(f"- **{sup} SUPPORTED** on documentary evidence")
    a(f"- **{par} PARTIAL** — mechanism visible, magnitude unmeasured")
    a(f"- **{con} CONTRADICTED ON PAPER** — the paperwork disagrees with the pitch")
    a(f"- **{req} INTERVIEW REQUIRED** — no evidence of any kind")
    a("")
    a("### The four that need interviews most")
    a("")
    a("| Hypothesis | Why it is the priority |")
    a("|---|---|")
    for r in S.SCORECARD:
        if r["validated"] == "INTERVIEW REQUIRED":
            a(f"| {r['hypothesis']} | {r['remaining']} |")
    a("")
    a("---")
    a("")
    a("## The honest read")
    a("")
    a("**Two of ten hypotheses are supported by documentary evidence. Four have no "
      "evidence at all.** That is not a failure of the research — it is the shape of "
      "it. Three phases of documentary work have done what documentary work can: "
      "proved the reporting defect is real, measured, and visible in published data.")
    a("")
    a("**What remains is not more research. It is twelve conversations.**")
    a("")
    a("The two findings that most change the roadmap:")
    a("")
    a("1. **The join defect is documented and quantified** (32/354 startups, 9.0%, "
      "worst case 67%). StartupHub's core wedge is not an opinion any more.")
    a("2. **Every rupee figure in this repository traces to a competitor's public "
      "price, never to a customer's budget.** `OQ-03` is the single highest-value "
      "unanswered question in the project.")
    a("")
    a("Full cell detail: `_exports/phase45/validation_scorecard.csv`.")
    a("")
    p.write_text("\n".join(L), encoding="utf-8")
    return p


# --------------------------------------------------------------------------
def main():
    me, mw = M.validation()
    se, sw = S.validation()
    for w in (mw + sw):
        print(f"  warn: {w}")
    errs = me + se
    if errs:
        raise SystemExit("Validation failed:\n  - " + "\n  - ".join(errs))

    n1 = write_market_base();  print(f"  csv/market_base.csv          {n1:4d} metrics")
    n2 = write_iic_counts();   print(f"  csv/iic_counts.csv           {n2:4d} conflicting official counts")
    n3 = write_conflicts();    print(f"  csv/conflicts.csv            {n3:4d} recorded conflicts")
    n4 = write_segments();     print(f"  csv/segments.csv             {n4:4d} segments")
    n5 = write_icp();          print(f"  csv/icp_criteria.csv         {n5:4d} ICP criteria")
    n6 = write_assumptions();  print(f"  csv/assumptions.csv          {n6:4d} sizing assumptions")
    n7 = write_sizing();       print(f"  csv/sizing.csv               {n7:4d} TAM/SAM/SOM rows")
    n8 = write_scorecard();    print(f"  csv/validation_scorecard.csv {n8:4d} hypotheses")
    write_schema();            print("  json/market_schema.json")

    write_market_readme();     print("  03_Market_Research/README.md")
    write_segment_census();    print("  03_Market_Research/Segment_Census.md")
    write_sizing_doc();        print("  05_Market_Sizing/README.md")
    write_scorecard_doc();     print("  13_Synthesis/Validation_Scorecard.md")

    before, added = register_sources()
    print(f"  Source_Registry.csv            +{added} rows ({before} -> {before + added})")

    p = write_raw();           print(f"  _exports/raw/                 {p.name} ({p.stat().st_size:,} bytes)")

    print()
    r = M.iic_range()
    print(f"  Base: {M.AISHE['total_heis']:,} registered HEIs (super-bound, NOT a market)")
    print(f"        {M.NIRF_2025['innovation_category']:,} filed NIRF Innovation  <- SAM floor")
    print(f"        IICs {r['floor']:,}-{r['ceiling']:,} (3 official sources, {r['spread_pct']}% spread)")
    print(f"  TAM {S.tam()['value_display']}")
    print(f"  SAM {S.sam()['value_display']}")
    print(f"  Scorecard: {S.summary()['scorecard_supported']} supported, "
          f"{S.summary()['scorecard_needs_interview']} need interviews, 0 conducted")
    return 0


if __name__ == "__main__":
    sys.exit(main())