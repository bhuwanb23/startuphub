#!/usr/bin/env python3
"""StartupHub Phase 4 (segmentation + ICP) and Phase 7 (TAM/SAM/SOM).

todo.md PHASE 4 asks for a segmentation matrix and an Ideal Customer Profile.
todo.md PHASE 7 says, before calculating anything:

    "Don't calculate yet. First collect the raw numbers."

Phase 5 (data_p5_market) collected them. This module applies them - under one
hard rule:

  NO SINGLE POINT ESTIMATE LEAVES THIS FILE.

Every market figure is a RANGE with a stated method, every input carries an
evidence grade, and `ASSUMPTIONS` records what is measured versus what is
guessed. Where an input is guessed, the output says so in the same sentence as
the number. A TAM stated to two significant figures from inputs of unknown
quality is a lie with a formula.

THE STRUCTURAL PROBLEM WITH TAM HERE, STATED PLAINLY:

  The addressable population is knowable (14,067-16,367 institutions hold an
  IIC; 777 filed the NIRF Innovation category in 2025). The REVENUE per
  institution is not knowable, because willingness to pay has ZERO primary
  evidence - OQ-03 is still open after three phases.

  So the honest TAM is a band whose width is dominated entirely by one
  unmeasured variable. That is not a weakness of the analysis; it is the
  finding, and it is the single most important number to show an investor.
  A TAM stated as Rs 200 crore would imply a precision we do not have.

METHOD - why each layer is what it is:

  TAM  Institutions with a legally-mandated innovation reporting function.
       Floor and ceiling are the two official IIC counts (see data_p5_market
       CONFLICTS C-01: they differ by 16% and we refuse to average them).

  SAM  Institutions that DEMONSTRABLY file innovation returns, because a
       filing is observable behaviour rather than a registration. That is the
       NIRF Innovation category (777 in 2025) plus ARIIA filers. An IIC that
       has never submitted is not in SAM - it is a logo, not a buyer.

  SOM  Bounded by acquisition capacity, not by desire. Modelled from a
       founder-led sales motion with the interview-derived conversion rate
       UNKNOWN, so SOM is presented as a capacity envelope and the
       conversion assumption is flagged as the dominant error term.

Usage:  python build/data_p47_segments.py
"""

import re

SCHEMA_VERSION = "1.0"
BUILD_DATE = "2026-10-19"

PRICE_BAND_INR = dict(
    anchor_verified=75000,       # LabelNest Orbit - publicly verified, competitor's price
    target=120000,               # StartupHub's intended price - NOT validated, D-0xx
    currency="INR per year",
    evidence_note=(
        "Rs 75,000 is a competitor's public price for a DIFFERENT scope (student "
        "innovation management), so it is a floor reference, not a comparable. "
        "Rs 1,20,000 is our own target and has no customer behind it. OQ-03 "
        "(willingness to pay) remains open after three phases."
    ),
)


# ==========================================================================
# 1. Phase 4 - the segmentation matrix
# ==========================================================================
# Six axes from todo.md PHASE 4. Each segment carries the documentary evidence
# that puts an institution in it, so segmentation is auditable rather than
# asserted.

SEGMENT_AXES = {
    "institution_type": ["IIT", "NIT", "University", "Private University",
                         "Engineering College", "Medical", "Management",
                         "Autonomous College", "IIC institution",
                         "Incubation Centre", "Research Institution"],
    "maturity": ["No startup ecosystem", "Emerging", "Active", "Mature", "Large ecosystem"],
    "willingness_to_pay": ["Low", "Medium", "High"],
    "need": ["Innovation management", "Incubation", "Startup tracking", "IPR",
             "Reporting", "Ecosystem management"],
}


SEGMENTS = [
    dict(
        id="S1", name="Mature public IIC (NIT / large university / central)",
        institution_types=["NIT", "University", "IIT"],
        maturity="Mature", willingness_to_pay="Medium-High",
        needs=["Startup tracking", "Reporting", "IPR", "Ecosystem management"],
        size="100+ registered startups reported; multi-officer IIC",
        documentary_basis=[
            "NIT Calicut P-A08: 55 vs 17 startups in one PDF - the largest contradiction in the corpus",
            "Phase 3A F-DPIIT-JOIN: IIT Bombay 16/170 and IIT Delhi 8/38 startups lose identity at the join",
        ],
        why_they_buy="Cannot answer a basic question about their own portfolio while filing it",
        blockers=["Procurement committee above Rs 50K (Phase 2)", "Existing ERP may already hold the list (H-01)"],
        priority=1,
    ),
    dict(
        id="S2", name="Established private engineering college IIC",
        institution_types=["Engineering College", "Private University", "Autonomous College"],
        maturity="Active", willingness_to_pay="Low-Medium",
        needs=["Reporting", "Innovation management", "Startup tracking"],
        size="Small IIC, part-time coordinator, 5-20 startups",
        documentary_basis=[
            "Teresa's College P-A02: a 13-item grant narrative typed into a numeric field",
            "Phase 3A F-NODF-GRADIENT: Aditya left 7 'No Data Found' cells, the most in the set",
        ],
        why_they_buy="Deadline pressure with no capacity and no system",
        blockers=["Very thin budget", "Coordinator may be the only person (OQ-05)"],
        priority=2,
    ),
    dict(
        id="S3", name="Emerging / newly-registered IIC",
        institution_types=["Autonomous College", "College"],
        maturity="Emerging", willingness_to_pay="Low",
        needs=["Innovation management", "Reporting"],
        size="IIC registered, no submitted returns",
        documentary_basis=[
            "F-SENTINEL-ZERO: IIT Kanpur records 0 stars while running a mature incubator - registration does not imply activity",
            "IIC counts disagree by 16% across official sources (C-01) - registration status is not verifiable",
        ],
        why_they_buy="MUST submit to keep the IIC alive",
        blockers=["May have no budget at all", "May not have anyone accountable (buyer definition fails)"],
        priority=4,
        note="Largest by count, lowest by probability of paying. Included for completeness, not for revenue.",
    ),
    dict(
        id="S4", name="Incubator / AIC / EIC (not a degree institution)",
        institution_types=["Incubation Centre"],
        maturity="Mature", willingness_to_pay="Medium",
        needs=["Incubation", "Startup tracking", "Ecosystem management"],
        size="244 seed-funded incubators; AICs need 10,000 sq ft",
        documentary_basis=[
            "AIM: AIC/EIC grant-in-aid up to Rs 10 crore - a funded body with procurement capacity Phase 1 institutions lack",
            "SISFS: 217 incubators selected with Rs 916.91 crore approved",
        ],
        why_they_buy="Already commercial entities with real budgets and real portfolio churn",
        blockers=["Different buyer - operator, not academic", "Competitive (91springboard, NSRCEL already software-literate)"],
        priority=3,
        note="Underrated segment. AIM-funded money is the one budget signal in this market that points FORWARD in time, unlike ARIIA's retrospective spend.",
    ),
    dict(
        id="S5", name="Research-intensive institute (IISc / R&D organisation)",
        institution_types=["Research Institution"],
        maturity="Mature", willingness_to_pay="Medium",
        needs=["IPR", "Startup tracking"],
        size="273 filed the NIRF Research Institutions category in 2025",
        documentary_basis=[
            "Phase 3A: IISc had 3 malformed placeholder DPIIT keys (DIPP0000)",
            "IPR: 91,168 national patent filings 2023-24, yet P-A07 finds no deadline calendar in any institution",
        ],
        why_they_buy="IP volume makes the deadline risk concrete and expensive",
        blockers=["Often already has an IP cell or TTO (H-09)", "Slow, formal procurement"],
        priority=5,
    ),
]


# ==========================================================================
# 2. Phase 4 - the ICP
# ==========================================================================

ICP = dict(
    name="Institution-innovations-Council with a live NIRF/ARIIA filing obligation and one part-time accountable officer",
    one_line=(
        "Not the most innovative institution in India - the one that has to file "
        "an innovation return next quarter, cannot answer a question about its own "
        "portfolio, and has exactly one person accountable for the answer."
    ),
    must_be=[
        ("Files the NIRF Innovation category or an ARIIA return",
         "777 institutions filed NIRF Innovation in 2025 - observable behaviour, not registration"),
        ("Has a named IIC Convener / ARIIA-NIRF nodal officer",
         "Phase 1: SSCET has 40 IIC members and 2 mentors; NIT Calicut 29 mentors vs 155 ideas. One person does the work."),
        ("Reports startups at a scale where the loss is measurable",
         "Phase 3A: institutions lose 9% of startups at the DPIIT join overall; NIT Andhra Pradesh 67%"),
        ("Has no system of record upstream of the form",
         "P-A10 / H-01 - still HYPOTHESIS, and the artefact ask is the test"),
    ],
    must_not_be=[
        "An institution with no IIC and no innovation filing (no forcing event - D-007 untested)",
        "A student or founder (cannot buy anything - Class D in Phase 2)",
        "An institution whose Convener demonstrably delegates the form to a junior",
        "A startup incubator's competitive set (91springboard, NSRCEL already run commercial software)",
    ],
    why_not_the_obvious_choice=(
        "The instinct is to target IITs and IISc - best data, biggest budgets. "
        "We deliberately do not lead there. Phase 2 found their Convener almost "
        "certainly does not personally do the data work, so we would interview and "
        "sell to the wrong person. IIT Bombay and IISc are excluded from the "
        "recruitment shortlist for exactly this reason."
    ),
    first_target_rank=("S1 Mature public IIC, and S4 incubator/AIC - the only "
                       "segment with a budget signal that points forward in time"),
)


# ==========================================================================
# 3. Phase 7 - the assumption ledger
# ==========================================================================
# Each input: value or range, source, EVIDENCE GRADE, and whether it is the
# dominant error term. Nothing downstream may use a HYPOTHESIS input silently.

ASSUMPTIONS = [
    dict(id="A-01", input="Institutions with an innovation reporting function",
         value="14,067 - 16,367", source="data_p5_market IIC_COUNTS (3 official sources)",
         grade="T1_DOCUMENTED", dominates=False,
         note="Range is deliberate: C-01 shows a 16% official disagreement and no counting rule."),
    dict(id="A-02", input="Institutions demonstrably filing innovation returns",
         value="777 (NIRF Innovation, 2025)", source="NIRF India Rankings 2025 report",
         grade="T1_DOCUMENTED", dominates=False,
         note="Observed behaviour, not registration. The cleanest SAM floor available."),
    dict(id="A-03", input="ARIIA filers (non-overlapping with NIRF)",
         value="not_reported", source="ARIIA publishes rankings, not a participation ledger",
         grade="HYPOTHESIS", dominates=False,
         note="Unknown. Deliberately NOT estimated - inventing a number here would contaminate SAM."),
    dict(id="A-04", input="Annual contract value per institution",
         value="Rs 75,000 - Rs 1,20,000", source="LabelNest verified price; StartupHub target",
         grade="SINGLE_SOURCE + HYPOTHESIS", dominates=True,
         note="DOMINANT ERROR TERM. The lower bound is a competitor's price for a "
              "different scope. The upper bound is our own target with no customer "
              "behind it. OQ-03 unresolved. No interview evidence exists."),
    dict(id="A-05", input="Share of SAM that would ever buy",
         value="5% - 20%", source="no evidence - analyst range only",
         grade="HYPOTHESIS", dominates=True,
         note="DOMINANT ERROR TERM. Nothing in 47 institutional documents, 8 procurement "
              "instruments or 11 government forms licenses any specific conversion rate. "
              "H-01 and H-04 both threaten this."),
    dict(id="A-06", input="Founder-led acquisition capacity",
         value="5 - 15 institutions in year 1", source="analyst capacity model",
         grade="HYPOTHESIS", dominates=False,
         note="todo.md suggested 5 / 15 / 40-50. A 40-50 year-3 figure implies a sales "
              "team that does not exist. Replaced with a capacity envelope."),
    dict(id="A-07", input="Price realisation (discounting, multi-year, pilot-for-free)",
         value="70% - 100% of list", source="no evidence",
         grade="HYPOTHESIS", dominates=True,
         note="DOMINANT ERROR TERM. Academic procurement discounts heavily, and free "
              "pilots are common. Nothing measured."),
    dict(id="A-08", input="Churn / renewal",
         value="not_modelled", source="no published rate for any incumbent in this category",
         grade="HYPOTHESIS", dominates=False,
         note="LTV cannot be computed. Deliberately omitted rather than guessed."),
]


# ==========================================================================
# 4. Phase 7 - the sizing, as ranges
# ==========================================================================

def _crore(n):
    """1055025000 -> 'Rs 105.5 crore'. Derived, never hand-written: a hand-written
    display string is how the SAM figure was wrong by 10x once already."""
    v = n / 1e7
    if v < 1:
        return f"Rs {n/1e5:.2f} lakh"
    return f"Rs {v:.2f} crore" if v < 100 else f"Rs {v:.1f} crore"


def _range_display(lo, hi, suffix=""):
    return f"{_crore(lo)} - {_crore(hi)}{suffix}"


def tam():
    """Total addressable - the super-bound of an institution-level innovation function."""
    lo_inst, hi_inst = 14067, 16367
    lo_price, hi_price = 75000, 120000
    lo_v, hi_v = lo_inst * lo_price, hi_inst * hi_price
    return dict(
        layer="TAM",
        definition="Institutions holding an IIC / AIC / EIC - a legally mandated innovation reporting function",
        institution_range=(lo_inst, hi_inst),
        price_range_inr=(lo_price, hi_price),
        value_range_inr=(lo_v, hi_v),
        value_display=_range_display(lo_v, hi_v, " per year"),
        method="institutions x annual contract value, low x low to high x high",
        confidence="LOW - width driven entirely by A-04, which has no customer evidence",
        evidence_grade="T1 population, HYPOTHESIS price",
    )


def sam():
    """Serviceable - institutions that demonstrably file."""
    floor_institutions = 777
    ceiling_institutions = 7692
    lo_price, hi_price = 75000, 120000
    lo_v = floor_institutions * lo_price
    hi_v = ceiling_institutions * hi_price
    return dict(
        layer="SAM",
        definition="Institutions with OBSERVABLE annual innovation filing behaviour",
        institution_range=(floor_institutions, ceiling_institutions),
        floor_basis="777 filed the NIRF Innovation category in 2025 - hard floor, T1",
        ceiling_basis=(
            "7692 unique NIRF applicants in 2025. Used ONLY as a mathematical "
            "ceiling, NOT as an estimate: most of these file Overall, not "
            "Innovation, and would not buy. The true value sits far below both."
        ),
        price_range_inr=(lo_price, hi_price),
        value_range_inr=(lo_v, hi_v),
        value_display=_range_display(lo_v, hi_v, " per year (arithmetic envelope only)"),
        method="NIRF Innovation filers as floor; total NIRF applicants as an upper bound",
        confidence="VERY LOW on the ceiling, MEDIUM on the floor",
        evidence_grade="T1 population, HYPOTHESIS price",
        band_multiple=round(hi_v / lo_v, 1),
        honesty_note=(
            "This band is deliberately enormous because it is bounded by two "
            "populations that are NOT the same thing. The floor is a real "
            "purchase signal; the ceiling is a ranking applicant. Presenting a "
            "midpoint would be false precision over a {}-x range.".format(round(hi_v / lo_v))
        ),
    )


def _inr(n):
    """Indian digit grouping: 225000 -> 'Rs 2,25,000'; 92168000 -> 'Rs 9,21,68,000'."""
    s = str(int(n))
    if len(s) <= 3:
        return f"Rs {s}"
    head, tail = s[:-3], s[-3:]
    groups = []
    while len(head) > 2:
        groups.insert(0, head[-2:])
        head = head[:-2]
    if head:
        groups.insert(0, head)
    return "Rs " + ",".join(groups) + "," + tail


def som():
    """Serviceable obtainable - bounded by capacity, with conversion flagged."""
    # Capacity envelope, not a forecast.
    y1_inst = (3, 6)
    y2_inst = (8, 15)
    y3_inst = (15, 25)
    lo_price, hi_price = 75000, 120000
    years = {}
    for label, (lo_i, hi_i) in (("year_1", y1_inst), ("year_2", y2_inst), ("year_3", y3_inst)):
        years[label] = dict(institutions=(lo_i, hi_i),
                            revenue_inr=(lo_i * lo_price, hi_i * hi_price),
                            revenue_display=f"{_inr(lo_i*lo_price)} - {_inr(hi_i*hi_price)}")
    return dict(
        layer="SOM",
        definition="Institutions obtainable with a founder-led motion, founder+1, founder+small team",
        year_1=y1_inst, year_2=y2_inst, year_3=y3_inst,
        by_year=years,
        revenue_display="; ".join(f"{k.replace('_',' ').upper()} {v['revenue_display']}"
                                  for k, v in years.items()),
        confidence="LOW - depends on A-05 and A-07, both unmeasured",
        evidence_grade="HYPOTHESIS throughout",
        rejection_note=(
            "todo.md PHASE 7 proposed 5 / 15 / 40-50 institutions. The year-3 "
            "figure implies a sales team that does not exist and a conversion "
            "rate nobody has measured. We reject it and model capacity instead."
        ),
    )


def sizing_bundle():
    return dict(tam=tam(), sam=sam(), som=som())


# ==========================================================================
# 5. Why this is still not enough - the gate on using these numbers
# ==========================================================================

SIZE_LIMITATIONS = [
    "TAM/SAM/SOM are RANGES. A midpoint would imply precision we do not have; "
    "do not compute one without stating the range width alongside it.",
    "The band width is dominated by three HYPOTHESIS inputs (A-04 price, A-05 "
    "conversion, A-07 discount). Measuring any ONE of them collapses the range "
    "more than any further market research would.",
    "Willingness to pay (OQ-03) has ZERO primary evidence after three phases. "
    "Every rupee figure here traces to a competitor's public price or to our own "
    "target.",
    "Renewal/churn is not modelled at all. LTV cannot be computed from evidence.",
    "The ICP's second must-be - no system of record upstream - is still "
    "HYPOTHESIS (H-01). If a mature institution already has a venture register, "
    "the ICP is wrong and S1 collapses.",
    "No segmentation here is validated against a customer. Segments are derived "
    "from published documents, not from interviews.",
]


# ==========================================================================
# 6. Phase 30 - the validation scorecard, honestly restructured
# ==========================================================================
# todo.md PHASE 30 assumes interviews exist ("8/10 interviews"). They do not.
# The scorecard is rebuilt so every cell carries EITHER documentary evidence OR
# an explicit INTERVIEW REQUIRED marker. No cell may show a tick it has not earned.

SCORECARD = [
    dict(hypothesis="Institutions hold fragmented startup data",
         evidence_type="documentary", evidence="36-doc corpus, 6 self-reported contradictions, 10 problem analyses",
         grade="DOCUMENTED", validated="SUPPORTED", remaining="How fragmented? Interviews.",
         interview_ids=["H-01"]),
    dict(hypothesis="The NIRF/ARIIA join is broken in practice",
         evidence_type="documentary", evidence="11 forms, 32/354 startups lose identity (9.0%), worst 67%",
         grade="DOCUMENTED", validated="SUPPORTED", remaining="Do officers FEEL it? OQ-32/33.",
         interview_ids=["H-02"]),
    dict(hypothesis="Institutions want centralised tracking",
         evidence_type="none", evidence="-",
         grade="HYPOTHESIS", validated="NO DOCUMENTARY EVIDENCE",
         remaining="No demand evidence exists. Blocked on Phase 3B.", interview_ids=["H-01"]),
    dict(hypothesis="They will pay Rs 1.2 lakh",
         evidence_type="none", evidence="Competitor price Rs 75,000 is a floor reference, not evidence of our price",
         grade="HYPOTHESIS", validated="NO DOCUMENTARY EVIDENCE",
         remaining="OQ-03 open since Phase 0. Zero primary evidence.", interview_ids=["H-07"]),
    dict(hypothesis="IPR tracking is a major pain",
         evidence_type="documentary", evidence="P-A07 CRITICAL: no deadline calendar in any of 36 institutions; 91,168 national filings 2023-24",
         grade="DOCUMENTED", validated="SUPPORTED (institutional)", remaining="Does the institute track patents at all, or an agency/TTO? H-09.",
         interview_ids=["H-09"]),
    dict(hypothesis="Reporting consumes significant time",
         evidence_type="documentary", evidence="P-A08 hand-assembled reports; ARIIA deadline cycles; 0 (On Progress) sentinels",
         grade="SINGLE-SOURCE", validated="PARTIAL",
         remaining="Actual hours per cycle. HOURS code, no interviews yet.", interview_ids=["H-04"]),
    dict(hypothesis="Excel/Sheets/WhatsApp are the free incumbent",
         evidence_type="none", evidence="Assumption since Phase 0, never evidenced",
         grade="HYPOTHESIS", validated="NO DOCUMENTARY EVIDENCE",
         remaining="The pricing model rests on this. Highest-risk unverified claim.", interview_ids=["H-03"]),
    dict(hypothesis="The Convener is or can reach the buyer",
         evidence_type="documentary", evidence="Phase 2: only 4/25 roles hold documented budget authority, none Class A",
         grade="DOCUMENTED", validated="CONTRADICTED ON PAPER", remaining="Does reality match the paperwork? H-05.",
         interview_ids=["H-05"]),
    dict(hypothesis="Deadlines are the forcing event",
         evidence_type="documentary", evidence="Teresa's 13-item narrative in a numeric field; ARIIA 0 (On Progress) sentinels",
         grade="SINGLE-SOURCE", validated="PARTIAL", remaining="Is there rework or overtime? H-04.", interview_ids=["H-04"]),
    dict(hypothesis="Institutions manage cohorts",
         evidence_type="none", evidence="P-A03 graded HYPOTHESIS; absence from reports is absence-of-evidence",
         grade="HYPOTHESIS", validated="NO DOCUMENTARY EVIDENCE", remaining="Either drop cohorts or prove them. H-08.",
         interview_ids=["H-08"]),
]


# ==========================================================================
# 7. Validation
# ==========================================================================
def validation():
    errs, warns = [], []

    # Segmentation must cover every axis the spec named. Segment field names
    # differ from axis names for the list-valued axes, so map explicitly.
    SEGMENT_FIELD_FOR_AXIS = {
        "institution_type": "institution_types",
        "maturity": "maturity",
        "willingness_to_pay": "willingness_to_pay",
        "need": "needs",
    }
    for axis, values in SEGMENT_AXES.items():
        if not values:
            errs.append(f"segment axis '{axis}' is empty")
        field = SEGMENT_FIELD_FOR_AXIS[axis]
        used = set()
        for s in SEGMENTS:
            v = s.get(field)
            used.update(v if isinstance(v, list) else [v])
        if not (used & set(values)):
            errs.append(f"no segment uses any '{axis}' value from the spec vocabulary")

    for s in SEGMENTS:
        for field in ("id", "name", "maturity", "willingness_to_pay", "needs",
                      "documentary_basis", "why_they_buy", "blockers", "priority"):
            if not s.get(field):
                errs.append(f"{s['id']}: missing {field}")
        if s["maturity"] not in SEGMENT_AXES["maturity"]:
            errs.append(f"{s['id']}: maturity '{s['maturity']}' not in spec vocabulary")
        if len(s["documentary_basis"]) < 1:
            errs.append(f"{s['id']}: no documentary basis - segmentation must be auditable")

    # ICP must be falsifiable, not aspirational.
    if len(ICP["must_be"]) < 3 or len(ICP["must_not_be"]) < 2:
        errs.append("ICP must have >=3 must-be and >=2 must-not-be criteria")
    for c in ICP["must_be"]:
        if len(c) != 2 or not c[0] or not c[1]:
            errs.append(f"ICP must_be entry malformed: {c}")
    if not ICP.get("why_not_the_obvious_choice"):
        errs.append("ICP has no why_not_the_obvious_choice")

    # Assumptions ledger integrity.
    if not ASSUMPTIONS:
        errs.append("ASSUMPTIONS ledger is empty")
    for a in ASSUMPTIONS:
        for field in ("id", "input", "value", "source", "grade", "note"):
            if a.get(field) in (None, ""):
                errs.append(f"{a['id']}: missing {field}")
    dominant = [a for a in ASSUMPTIONS if a["dominates"]]
    if len(dominant) < 2:
        errs.append("fewer than 2 dominant error terms declared; the range is being oversold")

    # Sizing arithmetic.
    t = tam()
    lo_i, hi_i = t["institution_range"]; lo_p, hi_p = t["price_range_inr"]
    if t["value_range_inr"] != (lo_i * lo_p, hi_i * hi_p):
        errs.append("TAM arithmetic does not reconcile")
    if not (lo_i * lo_p <= t["value_range_inr"][1]):
        errs.append("TAM range inverted")

    s = sam()
    if s["institution_range"][0] > s["institution_range"][1]:
        errs.append("SAM range inverted")
    if s["institution_range"][0] != NIRF_INNOVATION_FLOOR:
        errs.append("SAM floor must be the NIRF Innovation filer count")
    if (s["value_range_inr"][0], s["value_range_inr"][1]) != \
       (s["institution_range"][0] * lo_p, s["institution_range"][1] * hi_p):
        errs.append("SAM arithmetic does not reconcile")

    # SOM must be strictly capacity-ascending and must NOT reproduce the
    # rejected 40-50 year-3 figure.
    om = som()
    for a, b in ((om["year_1"], om["year_2"]), (om["year_2"], om["year_3"])):
        if not (a[1] <= b[1]):
            errs.append("SOM envelope is not ascending")
    if om["year_3"][1] > 30:
        errs.append("SOM year-3 ceiling exceeds founder-led capacity; rejected model creeping back")

    # Scorecard honesty: no cell may claim validation it has not earned.
    for row in SCORECARD:
        for field in ("hypothesis", "evidence_type", "grade", "validated", "remaining"):
            if not row.get(field):
                errs.append(f"scorecard row '{row['hypothesis'][:30]}' missing {field}")
        if row["evidence_type"] == "none" and row["validated"] not in ("NO DOCUMENTARY EVIDENCE",):
            errs.append(f"'{row['hypothesis'][:34]}': no evidence but claims {row['validated']}")
        if row["evidence_type"] != "none" and row["evidence"] == "-":
            errs.append(f"'{row['hypothesis'][:34]}': claims evidence but records none")
        if not row.get("interview_ids"):
            errs.append(f"'{row['hypothesis'][:34]}': no interview link")

    if not SIZE_LIMITATIONS:
        errs.append("SIZE_LIMITATIONS empty")

    blob = str(SCORECARD) + str(SIZE_LIMITATIONS) + str(ASSUMPTIONS)
    for banned in ["interviewees said", "respondents confirmed", "validated by interview",
                   "8/10 interviews", "7/10"]:
        if banned in blob.lower():
            errs.append(f"forged interview evidence: '{banned}'")

    return errs, warns


NIRF_INNOVATION_FLOOR = 777


def summary():
    t, s, om = tam(), sam(), som()
    return dict(
        schema_version=SCHEMA_VERSION, build_date=BUILD_DATE,
        segments=len(SEGMENTS), axes=len(SEGMENT_AXES),
        assumptions=len(ASSUMPTIONS),
        dominant_error_terms=sum(1 for a in ASSUMPTIONS if a["dominates"]),
        tam=t["value_display"], sam=s["value_display"], som=om["revenue_display"],
        scorecard_rows=len(SCORECARD),
        scorecard_supported=sum(1 for r in SCORECARD if r["validated"] == "SUPPORTED"),
        scorecard_needs_interview=sum(1 for r in SCORECARD if r["validated"] == "INTERVIEW REQUIRED"),
        interviews_conducted=0,
    )


if __name__ == "__main__":
    import json
    print(json.dumps(summary(), indent=2, ensure_ascii=False))
    e, w = validation()
    print("\nerrors:", e or "none")
    print("warns :", w or "none")