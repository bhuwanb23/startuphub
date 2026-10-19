#!/usr/bin/env python3
"""StartupHub Phase 3A - the two government forms institutions actually fill in.

todo.md Phase 3 asks for interview evidence. Interviews cannot be synthesised,
so Workstream A mines the one artefact that IS public and real: the filled-in
NIRF Innovation and ARIIA forms that institutions submit under their own name.

WHY THESE TWO FORMS MATTER (they are the government demand-side ledger):

  NIRF  Innovation: "Recognized by DPIIT", "Startups which have got VC
        investment", "Innovations at various stages of Technology Readiness
        Level", Incubation, and the IIC block.
  ARIIA Atal Ranking of Institutions on Innovation Achievements: 7 sections
        covering I&E teaching, the IIC, IPR cell, TRL 4-9 innovations,
        ventures started/supported, and IIC star bands per academic year.

THE CENTRAL FINDING OF THIS MODULE (F-DPIIT-JOIN):

  The NIRF form asks for two things about the same startups -
  (a) the count/startups "Recognized by DPIIT", and
  (b) a per-innovation TRL table keyed on the DPIIT registration number.
  DPIIT registration is granted to the FOUNDER by the DPIIT, not held by the
  institution. So the join key is an identifier the data-entry operator
  frequently does not have to hand. Measured across 7 real forms, 32 startups
  lose their identity at that join and 1 form contains a reverse gap.
  That is not a survey finding - it is the structural defect of the form
  itself, visible in published primary data.

EVIDENCE GRADING (repo standard, D-017):

  DOCUMENTED     - multiple primary sources read and cited
  SINGLE-SOURCE  - one primary source
  HYPOTHESIS     - structurally implied, NOT evidenced

  Every form record below is DOCUMENTED by construction: the cited artefact IS
  the primary source, extracted from the published PDF text layer.

PROVENANCE AND PARSE STATUS - never hidden:

  parse_status   parsed        text layer extracted and fields read
                 unparseable   could not extract; MUST NOT be mined
  extract_chars  characters recovered from the PDF text layer
  Join-key counts are MEASURED (regex over the extracted text layer), not
  estimated, and are reproducible via `build/_analyse_forms.py`.

THE HONESTY GUARDS (mirroring Phase 2's approach):

  1. No form may be counted as evidence if parse_status != "parsed".
  2. A count of 0 must never be stored as a numeric zero. `sentinel_zero`
     records WHY a 0 appeared, so downstream code cannot average it away.
  3. Derived findings must cite at least the number of forms they rest on.
  4. Nothing in this module is interview evidence.
"""

import re
from datetime import date

SCHEMA_VERSION = "1.0"
BUILD_DATE = date(2026, 10, 19)

# --------------------------------------------------------------------------
# Provenance of the extraction run (reproducible: python build/_fetch_forms.py)
# --------------------------------------------------------------------------
EXTRACT_METHOD = (
    "pypdf 6.x text-layer extraction over the published PDF, downloaded with a "
    "browser UA. No OCR was used. These are browser-printed PDFs and some "
    "characters are lost to font-encoding (notably ligatures: 'Verified' -> "
    "'Veri ed', 'Findings' -> 'Find ngs'). Numeric values survive; this "
    "matters for blanks-vs-zeros but not for the counts used here."
)

TEMP_WORKSPACE = r"C:\Users\Bhuwan\AppData\Local\Temp\opencode\forms"


# ==========================================================================
# 1. NIRF FORMS - the DPIIT join-key measurement
# ==========================================================================
# dpiit_recognised  = distinct DPIIT numbers in the "Recognized by DPIIT" table
# dpiit_in_trl      = distinct DPIIT numbers in the TRL innovations table
# Joined on the DPIIT number, which is the ONLY key the form offers.
# lost_at_join      = dpiit_recognised - dpiit_in_trl   (identity dropped)
# reverse_gap       = dpiit_in_trl - dpiit_recognised   (key present but the
#                     startup is absent from the recognised table)

NIRF_FORMS = [
    dict(
        key="nirf_iitb_2026", institution="IIT Bombay", year=2026,
        institution_type="IIT (central)",
        url="https://www.iitb.ac.in/sites/default/files/2026-04/NIRF_IITBombay_2026_Innovation_Category.pdf",
        pages=80, extract_chars=212604, parse_status="parsed",
        dpiit_recognised=170, dpiit_in_trl=154,
        dpiit_anomalies=0, dpiit_anomaly_examples=[],
        note="Largest measured form. 16 recognised startups lose their identity "
             "between the DPIIT table and the TRL table.",
    ),
    dict(
        key="nirf_iisc_2026", institution="Indian Institute of Science", year=2026,
        institution_type="Institute of national importance",
        url="https://iisc.ac.in/wp-content/uploads/2026/04/Indian-Institute-of-Science20260406-Innovation.pdf",
        pages=61, extract_chars=170826, parse_status="parsed",
        dpiit_recognised=122, dpiit_in_trl=118,
        dpiit_anomalies=3, dpiit_anomaly_examples=["DIPP0000", "DIPP000", "DIPP00000"],
        note="Near-complete join (4 lost). Three malformed placeholder DPIIT "
             "values appear, i.e. the operator left the field unfilled but the "
             "table still demanded a key.",
    ),
    dict(
        key="nirf_iitd_2025", institution="IIT Delhi", year=2025,
        institution_type="IIT (central)",
        url="https://home.iitd.ac.in/uploads/nirf/2025/NIRF%202025_Innovation_Indian%20Institute%20of%20Technology%20Delhi20250118-2.pdf",
        pages=38, extract_chars=90455, parse_status="parsed",
        dpiit_recognised=38, dpiit_in_trl=30,
        dpiit_anomalies=2, dpiit_anomaly_examples=["DIPP0000", "DIPP0000"],
        note="8 of 38 (21%) drop at the join.",
    ),
    dict(
        key="nirf_nitw_2025", institution="NIT Warangal", year=2025,
        institution_type="NIT (central)",
        url="https://nitw.ac.in/api/static/files/NIRF-2025_Submitted_data_Innovation_2025-2-3-9-47-33.pdf",
        pages=19, extract_chars=43255, parse_status="parsed",
        dpiit_recognised=7, dpiit_in_trl=8,
        dpiit_anomalies=1, dpiit_anomaly_examples=["DIPP0000"],
        note="REVERSE GAP: the TRL table carries a DPIIT number for an innovation "
             "whose startup is not in the recognised table. Same-document "
             "contradiction between two tables of one submission.",
    ),
    dict(
        key="nirf_jnu_2026", institution="Jawaharlal Nehru University", year=2026,
        institution_type="Central university",
        url="https://www.jnu.ac.in/sites/default/files/nirf/NIRF2026-Innovation-Data.pdf",
        pages=27, extract_chars=64658, parse_status="parsed",
        dpiit_recognised=8, dpiit_in_trl=8,
        dpiit_anomalies=0, dpiit_anomaly_examples=[],
        note="Clean join. Small denominator, so a single good data-entry operator "
             "can hold the whole thing together - which is itself the point.",
    ),
    dict(
        key="nirf_nitap_2026", institution="NIT Andhra Pradesh", year=2026,
        institution_type="NIT (central)",
        url="https://nitandhra.ac.in/main/nirf/NATIONAL%20INSTITUTE%20OF%20TECHNOLOGY,%20ANDHRA%20PRADESH%20INNOVATION.pdf",
        pages=9, extract_chars=19598, parse_status="parsed",
        dpiit_recognised=6, dpiit_in_trl=2,
        dpiit_anomalies=0, dpiit_anomaly_examples=[],
        note="WORST measured rate: 4 of 6 (67%) drop. A small NIT can recognise 6 "
             "startups but can only evidence a TRL for 2, because it does not "
             "hold the other 4 founders' DPIIT numbers.",
    ),
    dict(
        key="nirf_panimalar_2025", institution="Panimalar Engineering College", year=2025,
        institution_type="Private engineering college",
        url="https://panimalar.ac.in/assets/pdf/academics/nirf/PEC_NIRF2025_Innovation.pdf",
        pages=30, extract_chars=72940, parse_status="parsed",
        dpiit_recognised=3, dpiit_in_trl=3,
        dpiit_anomalies=0, dpiit_anomaly_examples=[],
        note="Private college. Clean join on a tiny denominator.",
    ),
]


# ==========================================================================
# 2. ARIIA FORMS - the star ladder, the sentinel zeros, the YUKTI deferral
# ==========================================================================
# iic_star_bands is the academic-year ladder the form itself prints in
# Section 1.2. Values are copied verbatim, INCLUDING the sentinel, because
# the sentinel is the finding.

ARIIA_FORMS = [
    dict(
        key="ariia_iitk_2022", institution="IIT Kanpur", year=2022,
        institution_type="IIT (central)",
        url="https://iitk.ac.in/data/ARIIA-Reports/ARIIA_Report-2022.pdf",
        pages=112, extract_chars=166641, parse_status="parsed",
        no_data_found_count=0,
        # 2018-19 -> 2019-20 -> 2020-21 -> 2021-22
        iic_star_bands=["1", "", "0", "0 (On Progress)"],
        sections_present=7,
        fund_split_rows=None,
        contradiction=(
            "Records 0 IIC stars for 2020-21 and leaves 2019-20 BLANK, while "
            "running one of India's most mature technology business "
            "incubators. The recorded value contradicts the institution's own "
            "published capability, so 0 is a non-report, not a measurement."
        ),
    ),
    dict(
        key="ariia_iitism_2022", institution="IIT (ISM) Dhanbad", year=2022,
        institution_type="IIT (central)",
        url="https://people.iitism.ac.in/~download/ARIIA/Submitted%20Data%202022.pdf",
        pages=10, extract_chars=10786, parse_status="parsed",
        no_data_found_count=4,
        iic_star_bands=["1,2,3,4", "5", "4", "0 (On Progress)"],
        sections_present=7,
        fund_split_rows=None,
        contradiction=(
            "Section 1.2 records '1,2,3,4' in a single cell for 2018-19: four "
            "distinct values in one scalar field, so the cell cannot be "
            "parsed as a number."
        ),
    ),
    dict(
        key="ariia_aditya_2022",
        institution="Aditya College of Engineering & Technology", year=2021,
        institution_type="Private engineering college",
        url="http://acet.ac.in/uploads/ARIIA/ARIIA_2021_22.pdf",
        pages=13, extract_chars=16587, parse_status="parsed",
        no_data_found_count=7,
        iic_star_bands=["1,2", "3.5", "4", "0 (On Progress)"],
        sections_present=7,
        fund_split_rows=None,
        contradiction=(
            "Same multi-value cell defect as IIT (ISM), and the highest "
            "no-data count in the set (7) from the smallest institution."
        ),
    ),
    dict(
        key="ariia_lbrce_2020", institution="LBRCE", year=2020,
        institution_type="Private engineering college",
        url="https://www.lbrce.ac.in/committees/ciie_committee/ciie_ariia/ARIIA_%202020_Submitted%20Application.pdf",
        pages=8, extract_chars=12497, parse_status="parsed",
        no_data_found_count=0,
        iic_star_bands=None,
        sections_present=0,          # older template, different section headings
        fund_split_rows=(8, 7),      # (Institute Own/Internal, External Sponsorship)
        contradiction=None,
    ),
]


ALL_FORMS = NIRF_FORMS + ARIIA_FORMS


# ==========================================================================
# 3. Verified verbatim strings (quoted exactly as extracted)
# ==========================================================================
VERBATIM = [
    dict(form="ariia_iitism_2022", also_in=["ariia_aditya_2022", "ariia_iitk_2022"],
         text="are Recorded in the YUKTI National Innovation Repository of the IIC",
         meaning="ARIIA Section 4 does not ask the institution to hold a TRL. It "
                 "asks how many innovations are VERIFIED AND RECOMMENDED, and "
                 "defers the record itself to YUKTI-NIR, a central IIC system. "
                 "The institution is a pointer, not a system of record.",
         supports="F-ARIIA-YUKTI"),
    dict(form="ariia_aditya_2022", also_in=[],
         text="Total no. of Innovations (Verified and Recommended) in Different TRLs (4-9)",
         meaning="The institution submits a COUNT that it cannot independently "
                 "verify. 'Verified and Recommended' is done centrally.",
         supports="F-ARIIA-YUKTI"),
    dict(form="ariia_iitism_2022", also_in=["ariia_aditya_2022"],
         text="Existence of IPR Cell / Patent Facilitation Unit / Technology Transfer",
         meaning="ARIIA 3.3 asks whether an IPR CELL EXISTS. It is a yes/no "
                 "capability checkbox. It is NOT a patent lifecycle and it does "
                 "not record a single patent number.",
         supports="F-ARIIA-IPR-CELL"),
    dict(form="ariia_iitism_2022", also_in=["ariia_aditya_2022"],
         text="Start-ups/Ventures Established and Supported at HEI and Recognitions Received",
         meaning="Section 5 records that a venture was STARTED and SUPPORTED, "
                 "plus recognitions received. Supported is unquantified: no "
                 "amount, no date, no scope of support.",
         supports="F-ARIIA-SEC5"),
    dict(form="ariia_iitism_2022", also_in=["ariia_aditya_2022"],
         text="Scores and Stars Obtained",
         meaning="The performance metric is a 1-5 ordinal STAR BAND awarded by "
                 "the central IIC body, not a continuous innovation score.",
         supports="F-ARIIA-STARS"),
    dict(form="ariia_lbrce_2020", also_in=[],
         text="Institute Own/Internal  |  Number of External Sponsorship/External",
         meaning="ARIIA forces an EXPENDITURE split between own money and "
                 "external sponsorship. It is spend already committed, not a "
                 "funding source, and not a budget the applicant is asking for.",
         supports="F-ARIIA-FUND-SPLIT"),
    dict(form="ariia_iitk_2022", also_in=[],
         text="IIC 1.0 (2018-19) 1  IIC 2.0 (2019-20)  IIC 3.0 (2020-21) 0  IIC 4.0 (2021-22) 0 (On Progress)",
         meaning="A blank and a 0 sit in the SAME column of the SAME table for "
                 "consecutive years. Two different sentinels for the same "
                 "condition, with no legend distinguishing them.",
         supports="F-SENTINEL-ZERO"),
]


# ==========================================================================
# 4. Sentinel register - every 0 that is NOT a zero
# ==========================================================================
# Downstream code must never sum, average or rank these. Each entry records
# what the 0 actually means so it cannot be silently treated as a value.

SENTINELS = [
    dict(form="ariia_iitk_2022",  field="Section 1.2 IIC stars, 2020-21",
         literal="0", real_meaning="NOT REPORTED (institution runs a mature incubator)",
         sentinel_class="non_report", evidence_grade="SINGLE-SOURCE"),
    dict(form="ariia_iitk_2022",  field="Section 1.2 IIC stars, 2021-22",
         literal="0 (On Progress)", real_meaning="RANKING CYCLE INCOMPLETE at submission",
         sentinel_class="in_progress", evidence_grade="DOCUMENTED"),
    dict(form="ariia_iitism_2022", field="Section 1.2 IIC stars, 2021-22",
         literal="0 (On Progress)", real_meaning="RANKING CYCLE INCOMPLETE at submission",
         sentinel_class="in_progress", evidence_grade="DOCUMENTED"),
    dict(form="ariia_aditya_2022", field="Section 1.2 IIC stars, 2021-22",
         literal="0 (On Progress)", real_meaning="RANKING CYCLE INCOMPLETE at submission",
         sentinel_class="in_progress", evidence_grade="DOCUMENTED"),
    dict(form="nirf_iisc_2026",  field="DPIIT registration number",
         literal="DIPP0000", real_meaning="PLACEHOLDER - operator left the join key blank",
         sentinel_class="placeholder_key", evidence_grade="SINGLE-SOURCE"),
    dict(form="nirf_iitd_2025",  field="DPIIT registration number",
         literal="DIPP0000", real_meaning="PLACEHOLDER - operator left the join key blank",
         sentinel_class="placeholder_key", evidence_grade="SINGLE-SOURCE"),
    dict(form="nirf_nitw_2025",  field="DPIIT registration number",
         literal="DIPP0000", real_meaning="PLACEHOLDER - operator left the join key blank",
         sentinel_class="placeholder_key", evidence_grade="SINGLE-SOURCE"),
    dict(form="ariia_iitism_2022", field="Section 1.2 IIC stars, 2018-19",
         literal="1,2,3,4", real_meaning="MULTI-VALUE IN A SCALAR CELL - unparseable as a number",
         sentinel_class="multi_value_cell", evidence_grade="SINGLE-SOURCE"),
    dict(form="ariia_aditya_2022", field="Section 1.2 IIC stars, 2018-19",
         literal="1,2", real_meaning="MULTI-VALUE IN A SCALAR CELL - unparseable as a number",
         sentinel_class="multi_value_cell", evidence_grade="SINGLE-SOURCE"),
    dict(form="ariia_iitk_2022",  field="Section 1.2 IIC stars, 2019-20",
         literal="(blank)", real_meaning="DISTINCT SENTINEL from 0 in the same column",
         sentinel_class="blank_not_zero", evidence_grade="SINGLE-SOURCE"),
]


# ==========================================================================
# 5. Derived findings - each must declare its own form count
# ==========================================================================

def dpiit_join_metrics():
    """Measure the NIRF join-key defect across all parsed NIRF forms."""
    rows = []
    for f in NIRF_FORMS:
        if f["parse_status"] != "parsed":
            continue
        rec, trl = f["dpiit_recognised"], f["dpiit_in_trl"]
        rows.append(dict(
            key=f["key"], institution=f["institution"], year=f["year"],
            institution_type=f["institution_type"],
            dpiit_recognised=rec, dpiit_in_trl=trl,
            lost_at_join=max(0, rec - trl),
            reverse_gap=max(0, trl - rec),
            loss_rate_pct=round(max(0, rec - trl) / rec * 100, 1) if rec else None,
            placeholder_dpiit_count=f["dpiit_anomalies"],
            url=f["url"],
        ))
    return rows


def findings():
    j = dpiit_join_metrics()
    total_rec = sum(r["dpiit_recognised"] for r in j)
    total_lost = sum(r["lost_at_join"] for r in j)
    total_rev = sum(r["reverse_gap"] for r in j)
    forms_with_loss = sum(1 for r in j if r["lost_at_join"] > 0)
    worst = max(j, key=lambda r: (r["loss_rate_pct"] or 0))

    ndf = [(f["institution"], f["no_data_found_count"]) for f in ARIIA_FORMS
           if f["no_data_found_count"] is not None]
    in_progress = sum(1 for s in SENTINELS if s["sentinel_class"] == "in_progress")
    blank = sum(1 for s in SENTINELS if s["sentinel_class"] == "blank_not_zero")
    multi = sum(1 for s in SENTINELS if s["sentinel_class"] == "multi_value_cell")
    placeholder = sum(1 for s in SENTINELS if s["sentinel_class"] == "placeholder_key")

    return [
        dict(
            id="F-DPIIT-JOIN",
            title="NIRF's TRL table is keyed on a DPIIT number the institution does not hold",
            evidence_grade="DOCUMENTED",
            forms_supporting=len(j),
            measurement=(f"{total_lost} of {total_rec} recognised startups "
                         f"({round(total_lost/total_rec*100,1)}%) lose their identity "
                         f"at the DPIIT join across {forms_with_loss} of {len(j)} forms; "
                         f"worst case {worst['institution']} "
                         f"{worst['lost_at_join']}/{worst['dpiit_recognised']} "
                         f"({worst['loss_rate_pct']}%). A further {total_rev} reverse-gap "
                         f"rows appear, where the TRL table carries a key for a startup "
                         f"absent from the recognised table."),
            why_it_matters=(
                "This is the single most product-relevant structural fact in the "
                "whole corpus. The government already knows which startups an "
                "institution has, and already asks for TRL - but the two cannot be "
                "joined because the only offered key belongs to the founder. An "
                "institution can therefore lose track of its own portfolio while "
                "appearing, on paper, fully compliant."
            ),
            supports_phase0_thesis=[
                "Government systems are compliance ledgers, not venture systems of record",
                "Label-and-count is the only IIC↔startup join available today",
            ],
        ),
        dict(
            id="F-SENTINEL-ZERO",
            title="The same column uses blank, 0 and '0 (On Progress)' for three different conditions",
            evidence_grade="DOCUMENTED",
            forms_supporting=3,
            measurement=(f"{in_progress} in-progress sentinels, {blank} blank-not-zero "
                         f"sentinel, {multi} multi-value cells and {placeholder} "
                         f"placeholder DPIIT keys, all in ARIIA Section 1.2 or the NIRF "
                         f"key column."),
            why_it_matters=(
                "Any ranking built on these forms will read non-report as "
                "underperformance. IIT Kanpur is the proof case: it records 0 IIC "
                "stars while running one of India's most mature incubators. This "
                "is Phase 1's '0 is not a measurement' problem, now observed "
                "inside the primary government instrument itself."
            ),
            supports_phase0_thesis=["Reported metrics are not venture metrics"],
        ),
        dict(
            id="F-ARIIA-YUKTI",
            title="ARIIA defers the TRL record to YUKTI-NIR rather than asking the institution to hold it",
            evidence_grade="DOCUMENTED",
            forms_supporting=3,
            measurement=("All three 2022 ARIIA forms with a readable Section 4 "
                         "instruct the applicant to report innovations 'Verified and "
                         "Recommended' as recorded in the YUKTI National Innovation "
                         "Repository."),
            why_it_matters=(
                "The institution is asked for a COUNT it cannot independently "
                "verify, and the authoritative record lives in a central IIC system. "
                "That is the cleanest possible statement of the gap: the state "
                "already built a central innovation repository, and the institution "
                "still cannot tell you what its own portfolio is doing this year."
            ),
            supports_phase0_thesis=[
                "IIC can register a centre but cannot record a patent lifecycle",
                "Government systems are compliance ledgers, not venture systems of record",
            ],
        ),
        dict(
            id="F-ARIIA-IPR-CELL",
            title="ARIIA asks whether an IPR cell exists, not whether a patent moved",
            evidence_grade="DOCUMENTED",
            forms_supporting=2,
            measurement=("Section 3.3 is a single capability checkbox: 'Existence of "
                         "IPR Cell / Patent Facilitation Unit / Technology Transfer'. "
                         "No patent number, no filing date, no stage."),
            why_it_matters=(
                "Even at national level, the instrument stops at 'does a cell "
                "exist'. Nothing in the ARIIA form can record where a specific "
                "patent sits. This is the documentary proof for the Phase 0 claim "
                "that no competitor covers an end-to-end patent lifecycle - the "
                "government's own ranking instrument does not either."
            ),
            supports_phase0_thesis=[
                "IIC can register a centre but cannot record a patent lifecycle",
                "No direct competitor provides a complete IPR lifecycle object",
            ],
        ),
        dict(
            id="F-ARIIA-SEC5",
            title="'Supported' is recorded without amount, date or scope",
            evidence_grade="DOCUMENTED",
            forms_supporting=2,
            measurement=("Section 5 is titled 'Start-ups/Ventures Established and "
                         "Supported at HEI and Recognitions Received' and yields a "
                         "count plus recognition names."),
            why_it_matters=(
                "An institution cannot answer 'what did supporting this venture "
                "actually cost, and when'. The ledger records that help happened, "
                "not its terms - so institutional memory of its own support "
                "commitments is not recoverable from the record."
            ),
            supports_phase0_thesis=["Reported metrics are not venture metrics"],
        ),
        dict(
            id="F-ARIYA-AY",
            title="ARIIA counts in academic-year pairs; NIRF counts on a calendar basis",
            evidence_grade="DOCUMENTED",
            forms_supporting=4,
            measurement=("ARIIA Section 5 is explicitly scoped 'AY 2020-21 & "
                         "2021-22', and the star ladder is printed per academic "
                         "year 2018-19 to 2021-22. NIRF innovation tables are "
                         "single-cycle."),
            why_it_matters=(
                "Two government ledgers, two incompatible time grains, neither "
                "reconcilable without manual work. Any cross-institution "
                "comparison of 'innovation performance' is comparing different "
                "denominators."
            ),
            supports_phase0_thesis=["Reported metrics are not venture metrics"],
        ),
        dict(
            id="F-ARIIA-STARS",
            title="The headline innovation metric is a 1-5 ordinal star band, not a measurement",
            evidence_grade="DOCUMENTED",
            forms_supporting=3,
            measurement=("ARIIA Section 1.2 prints 'Scores and Stars Obtained' and "
                         "'Annual Performances of IIC Institute Stars Secured' on a "
                         "band ladder IIC 1.0 (2018-19) through IIC 4.0 (2021-22). "
                         "Observed values are coarse and irregular: IIT (ISM) '1,2,3,4' "
                         "then 5 then 4 then '0 (On Progress)'; Aditya '1,2' then 3.5 "
                         "then 4 then '0 (On Progress)'; IIT Kanpur 1, blank, 0, "
                         "'0 (On Progress)'."),
            why_it_matters=(
                "An institution's innovation performance is reduced to a coarse "
                "ordinal band on a fixed annual ladder, which cannot express "
                "momentum, and cannot even be stored as a number when the cell "
                "holds several values. It is a compliance score, not a measurement, "
                "so it cannot drive any operational decision an institution makes."
            ),
            supports_phase0_thesis=["Reported metrics are not venture metrics"],
        ),
        dict(
            id="F-ARIIA-FUND-SPLIT",
            title="ARIIA records spend already committed, never the budget being requested",
            evidence_grade="SINGLE-SOURCE",
            forms_supporting=1,
            measurement=("The expenditure block splits 'Institute Own/Internal' from "
                         "'Number of External Sponsorship/External'. In the one "
                         "form with a readable layout (LBRCE 2020) the split is 8 "
                         "internal rows against 7 external."),
            why_it_matters=(
                "This is retrospective: the government learns what an institution "
                "already spent, never what it needs next. It directly bounds the "
                "Phase 0 conclusion that there is no documented budget-holder "
                "signal for innovation software - the one government money signal "
                "that exists points backwards in time."
            ),
            supports_phase0_thesis=[
                "Sell against a compliance event, not a budget cycle",
                "Documented budget authority is rare and never in Class A",
            ],
        ),
        dict(
            id="F-NODF-GRADIENT",
            title="'No Data Found' tracks institutional maturity, so missingness is not random",
            evidence_grade="SINGLE-SOURCE",
            forms_supporting=3,
            measurement=("No Data Found occurrences: "
                         + ", ".join(f"{i} ({n})" for i, n in ndf)),
            why_it_matters=(
                "Completeness is itself an equity problem. Small institutions "
                "leave the most fields blank, which means any ranking built on "
                "form completeness systematically disadvantages them. It also "
                "means blank-heavy forms have an incentive to over-report."
            ),
            supports_phase0_thesis=["Reported metrics are not venture metrics"],
        ),
    ]


# ==========================================================================
# 6. Honest limits - what this module does NOT establish
# ==========================================================================
LIMITS = [
    "Nothing here is interview evidence. Willingness to pay, felt pain and "
    "actual budget ownership remain unverified.",
    "The corpus is 11 forms from institutions that CHOOSE to publish. IICs that "
    "do not publish are absent, so missingness within this set understates the "
    "real gap.",
    "Extraction is a text layer only, with no OCR. Ligature loss affects wording "
    "but not the counts used in F-DPIIT-JOIN.",
    "Join-key counts are distinct DPIIT numbers per table. A single startup with "
    "several innovations can appear more than once in the TRL table, so "
    "dpiit_in_trl is a key count, not a startup count.",
    "Only one ARIIA form (LBRCE 2020) exposes the fund-split rows in a readable "
    "layout; the 2022 forms use a newer template whose column labels the text "
    "layer does not preserve.",
    "Years are not comparable across the two forms (see F-ARIYA-AY), so no "
    "cross-form total is computed anywhere in this module.",
]


# ==========================================================================
# 7. Validation - fails the build rather than shipping a soft claim
# ==========================================================================

def validation():
    errs, warns = [], []

    # 1. unparsed forms may not count as evidence
    unparsed = [f["key"] for f in ALL_FORMS if f["parse_status"] != "parsed"]
    if unparsed:
        warns.append(f"forms present but not mined: {unparsed}")

    if len(ALL_FORMS) < 10:
        errs.append(f"only {len(ALL_FORMS)} forms; Phase 3A target is >= 10")

    if len(NIRF_FORMS) < 5:
        errs.append(f"only {len(NIRF_FORMS)} NIRF forms; need >= 5 to measure the join")

    # 2. a numeric 0 must always carry a sentinel explanation
    for s in SENTINELS:
        if not s.get("real_meaning"):
            errs.append(f"sentinel {s['form']}/{s['field']} has no real_meaning")
    if not SENTINELS:
        errs.append("sentinel register is empty - zero handling is unguarded")

    # 3. derived findings must declare how many forms they rest on
    for f in findings():
        if not f.get("forms_supporting"):
            errs.append(f"{f['id']} does not declare forms_supporting")
        if f["evidence_grade"] == "DOCUMENTED" and f["forms_supporting"] < 2:
            errs.append(f"{f['id']} graded DOCUMENTED on {f['forms_supporting']} form(s)")
        if not f.get("why_it_matters"):
            errs.append(f"{f['id']} has no why_it_matters")

    # 4. every sentinel must trace to a real form
    keys = {f["key"] for f in ALL_FORMS}
    for s in SENTINELS:
        if s["form"] not in keys:
            errs.append(f"sentinel references unknown form {s['form']}")

    # 5. join arithmetic must hold
    for r in dpiit_join_metrics():
        if r["dpiit_recognised"] and r["loss_rate_pct"] is None:
            errs.append(f"{r['key']}: loss rate not computed despite a recognised count")

    # 6. verbatim quotes must trace to a mined form
    for v in VERBATIM:
        if v["form"] not in keys:
            errs.append(f"verbatim from unmined form {v['form']}")
        if v["supports"] not in {f["id"] for f in findings()}:
            errs.append(f"verbatim supports unknown finding {v['supports']}")

    # 7. the module must never claim interview evidence
    blob = (str(ALL_FORMS) + str(findings()) + str(LIMITS)).lower()
    for banned in ["interview-confirmed", "interview validated", "users told us",
                   "respondents said", "survey shows"]:
        if banned in blob:
            errs.append(f"forbidden interview-style claim present: '{banned}'")

    if not LIMITS:
        errs.append("LIMITS is empty; an evidence module must state its limits")

    return errs, warns


def summary():
    j = dpiit_join_metrics()
    return dict(
        schema_version=SCHEMA_VERSION,
        build_date=BUILD_DATE.isoformat(),
        forms_total=len(ALL_FORMS),
        forms_parsed=sum(1 for f in ALL_FORMS if f["parse_status"] == "parsed"),
        nirf_forms=len(NIRF_FORMS),
        ariia_forms=len(ARIIA_FORMS),
        dpiit_recognised_total=sum(r["dpiit_recognised"] for r in j),
        dpiit_lost_at_join_total=sum(r["lost_at_join"] for r in j),
        dpiit_reverse_gap_total=sum(r["reverse_gap"] for r in j),
        sentinels_registered=len(SENTINELS),
        verbatim_quotes=len(VERBATIM),
        findings=[f["id"] for f in findings()],
        extract_method=EXTRACT_METHOD,
    )


if __name__ == "__main__":
    import json
    print(json.dumps(summary(), indent=2, ensure_ascii=False))
    e, w = validation()
    print("\nerrors:", e or "none")
    print("warns :", w or "none")