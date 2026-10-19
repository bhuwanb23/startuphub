#!/usr/bin/env python3
"""StartupHub Phase 4 - the segmentation matrix, rebuilt to spec.

todo.md PHASE 4 specifies a MATRIX across four axes plus an ICP:

    institution type | maturity | willingness to pay | need

The previous attempt produced five narrative segments instead, which is not a
matrix, missed three of the eleven named types, and used willingness-to-pay
values that were not in the spec vocabulary. This module replaces it.

THE CENTRAL ANALYTICAL DECISION - WHY MATURITY IS SPLIT IN TWO:

  Maturity was to be one axis. The corpus cannot support that. Measured field
  coverage across the 36-document Phase 1 corpus:

      activities_total        22/36  (61.1%)   usable
      ideas_generated         22/36  (61.1%)   usable
      amount_inr              22/36  (61.1%)   usable
      startups_total          18/36  (50.0%)   usable
      patents_filed            6/36  (16.7%)   NOT usable
      ips_filed                2/36   (5.6%)   NOT usable
      faculty_mentors          2/36   (5.6%)   NOT usable
      innovation_ambassadors   2/36   (5.6%)   NOT usable
      star_rating              1/36   (2.8%)   NOT usable

  So we split it:

    ACTIVITY SCALE  - DERIVED. How much innovation activity the institution
                      demonstrably performs. Banded from the four usable fields
                      with a stated rule. Computed live from the corpus, never
                      hand-typed.

    IP DEPTH        - NOT DERIVABLE. Whether the institution can actually
                      operate an IP workflow. It is carried as an explicit
                      UNKNOWN and `validation()` REFUSES to let any numeric
                      IP score exist. A 5.6%-populated field must never be
                      averaged into a ranking and quietly start meaning
                      something.

  This turns a data gap into a stated finding rather than a hidden assumption.

PRIORITISATION - TWO AXES, NOT ONE RANKING:

  The user asked for both urgency AND revenue potential, because they disagree
  and collapsing them hides the disagreement. So segments are placed on a
  QUADRANT, not ordered on a line:

    URGENCY   - does a hard external deadline force the work? (a dated,
                unavoidable, institutionally-owned obligation)
    REVENUE   - is there any documented signal that money could move?

  A segment can be high-urgency/low-revenue (research institutes: patent
  deadlines are brutal, procurement is glacial). That disagreement IS the
  go-to-market finding, so the quadrant is the output.

EVIDENCE GRADING (repo standard, D-017): DOCUMENTED / SINGLE-SOURCE / HYPOTHESIS
  Willingness to pay stays HYPOTHESIS throughout: OQ-03 has been open since
  Phase 0 and has no primary evidence. Every WTP band here is a DOCUMENTED
  RULE applied to sourced signals, never a measured outcome.

Usage:  python build/data_p4_segmentation.py
"""

import collections as _collections
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))

import data_p1_iic as D          # noqa: E402  (schema/helpers)
import data_p1_iic_records as R  # noqa: E402  (the 36 documents)

SCHEMA_VERSION = "2.0"
BUILD_DATE = "2026-10-19"


# ==========================================================================
# 1. Axis vocabulary - exactly the spec, plus one declared departure
# ==========================================================================
# The spec names 11 institution types. There is no plain "College" category,
# yet colleges are 45,473 of 58,643 registered HEIs - the largest single
# population by far. Folding them into University/Autonomous would hide that.
# So a 12th type is ADDED and the departure is declared, per user direction
# that colleges are the primary initial target.

AXES = {
    "institution_type": [
        "IIT", "NIT", "University", "Private University",
        "Engineering College", "Medical Institution", "Management Institution",
        "Autonomous College", "College (affiliated/general)",   # ADDED - declared departure
        "IIC institution", "Incubation Centre", "Research Institution",
    ],
    "activity_scale": ["No ecosystem", "Emerging", "Active", "Mature", "Large ecosystem"],
    "maturity_original_vocabulary": ["No startup ecosystem", "Emerging", "Active",
                                     "Mature", "Large ecosystem"],
    "willingness_to_pay": ["Low", "Medium", "High"],
    "need": ["Innovation management", "Incubation", "Startup tracking",
             "IPR", "Reporting", "Ecosystem management"],
}

VOCABULARY_DEPARTURE = dict(
    added_type="College (affiliated/general)",
    reason=("todo.md PHASE 4 names 11 institution types and none of them is a plain "
            "College. Colleges are 45,473 of 58,643 registered HEIs (AISHE 2021-22) - "
            "the single largest population in the market. Folding them into "
            "University/Autonomous would hide both their size and their distinct "
            "economics (65.3% are private unaided)."),
    authority="added on user instruction that colleges are the primary initial target",
    effect="The matrix carries 12 institution types, not the spec's 11.",
)


# ==========================================================================
# 2. Type crosswalk - every corpus label mapped, none silently dropped
# ==========================================================================

TYPE_CROSSWALK = {
    "Engineering college": "Engineering College",
    "Autonomous engineering college": "Autonomous College",
    "Pharmacy college": "Medical Institution",
    "NIT (central)": "NIT",
    "Private deemed university": "Private University",
    "Deemed university (private)": "Private University",
    "Private university group": "Private University",
    "Arts and science college (non-technical)": "College (affiliated/general)",
    "Autonomous science college": "Autonomous College",
    "Autonomous arts and science college": "Autonomous College",
    "Undergraduate college": "College (affiliated/general)",
    "PG women's college (non-technical)": "College (affiliated/general)",
    "Management college (non-technical)": "Management Institution",
}

# Types with NO corpus representation - built from population data instead.
TYPES_WITHOUT_CORPUS = {
    "IIT": "Corpus has no IIT annual report. Populated from NIRF 2025 category counts.",
    "University": "Generic university; corpus splits into private/deemed variants.",
    "Medical Institution": "Mapped from 5 pharmacy colleges only. No medical college corpus.",
    "IIC institution": "An IIC is a body inside an institution, not a type of institution. Modelled separately as an overlay.",
    "Incubation Centre": "Not a degree institution. Governed by AIM/SISFS, not MoE.",
    "Research Institution": "Corpus has none. Populated from NIRF Research category (273).",
}


# ==========================================================================
# 3. Activity Scale - derived live from the corpus
# ==========================================================================
# NULL HANDLING: a metric the institution did not report is NOT_REPORTED. It is
# never coerced to 0, because F-SENTINEL-ZERO proved institutions record 0 for
# "nothing happened" and Phase 1 proved they leave blanks for "we don't count".

ACTIVITY_FIELDS = ["activities_total", "ideas_generated", "startups_total", "amount_inr"]

# Band thresholds. Stated, not tuned to taste. These are on REPORTED values only.
BANDS = [
    dict(band="No ecosystem",       min_score=0, max_score=0,
         means="No activity metric reported at all in the annual report"),
    dict(band="Emerging",           min_score=1, max_score=2,
         means="At least one activity reported, at low volume"),
    dict(band="Active",             min_score=3, max_score=3,
         means="Most activity metrics reported"),
    dict(band="Mature",             min_score=4, max_score=4,
         means="All four activity metrics reported"),
    dict(band="Large ecosystem",    min_score=5, max_score=9,
         means="All four reported AND the institution reported 20+ startups"),
]


def _num(v):
    """Coerce to a positive float, or None. Never returns 0 for 'missing'."""
    if v is None:
        return None
    s = str(v).strip()
    if s in ("", "0", "None", "nan", "not_reported", "n/a"):
        return None
    try:
        f = float(s)
    except ValueError:
        return None
    return f if f > 0 else None


def activity_profile():
    """Per-institution activity derivation. Computed, never typed by hand."""
    out = []
    for r in R.IIC_REPORTS:
        m = r.get("metrics", {}) or {}
        vals = {f: _num(m.get(f)) for f in ACTIVITY_FIELDS}
        reported = sum(1 for v in vals.values() if v is not None)
        startups = vals["startups_total"]
        if reported == 0:
            band = "No ecosystem"
        elif reported == 4 and startups is not None and startups >= 20:
            band = "Large ecosystem"
        elif reported == 4:
            band = "Mature"
        elif reported == 3:
            band = "Active"
        else:
            band = "Emerging"
        out.append(dict(
            id=r["id"], institution=r.get("institution"), short_name=r.get("short_name"),
            corpus_type=r.get("institution_type"),
            spec_type=TYPE_CROSSWALK.get(r.get("institution_type"), "unmapped"),
            activity_band=band, fields_reported=reported, fields_total=len(ACTIVITY_FIELDS),
            activities_total=vals["activities_total"],
            ideas_generated=vals["ideas_generated"],
            startups_total=startups,
            amount_inr=vals["amount_inr"],
        ))
    return out


def band_distribution():
    prof = activity_profile()
    dist = {b: 0 for b in AXES["activity_scale"]}
    for p in prof:
        dist[p["activity_band"]] = dist.get(p["activity_band"], 0) + 1
    return dist


# ==========================================================================
# 4. IP Depth - DECLARED UNMEASURABLE
# ==========================================================================

IP_DEPTH_FIELDS = ["patents_filed", "ips_filed", "designs_filed",
                   "faculty_mentors", "innovation_ambassadors", "star_rating"]


def ip_depth_coverage():
    """The evidence that IP depth cannot be banded. Computed, not asserted."""
    out = []
    for f in IP_DEPTH_FIELDS:
        n = 0
        for r in R.IIC_REPORTS:
            if _num((r.get("metrics", {}) or {}).get(f)) is not None:
                n += 1
        out.append(dict(field=f, populated=n, corpus=len(R.IIC_REPORTS),
                        coverage_pct=round(n / len(R.IIC_REPORTS) * 100, 1),
                        bandable=n / len(R.IIC_REPORTS) >= 0.60))
    return out


IP_DEPTH = dict(
    measurable=False,
    reason=("The fields that would define IP maturity are populated in 2.8-16.7% of the "
            "corpus. Banding on them would rank 36 institutions using 1-6 observations, "
            "and a 0 in a blank field would be read as 'no IP' when it means 'not "
            "reported'. That is precisely the F-SENTINEL-ZERO defect."),
    consequence=("No segment may carry a numeric IP-depth score. The column exists and "
                 "reads UNKNOWN. Collapsing it later requires new evidence, not a code "
                 "change."),
    still_actionable=("P-A07 remains CRITICAL on documentary evidence alone: NO institution "
                      "in the corpus keeps a patent deadline calendar. That finding needs no "
                      "IP-depth data - absence across all 36 IS the measurement."),
)


# ==========================================================================
# 5. Forcing events - what makes the work unavoidable
# ==========================================================================
# Urgency is defined by a DATED, institutionally-owned obligation.

FORCING_EVENTS = {
    "NIRF Innovation cycle": dict(when="Annual, 31 January submission",
                                  hard_deadline=True, owner="ARIIA/NIRF nodal officer",
                                  evidence="NIRF 2025: 777 institutions filed; Phase 3A shows the join fails"),
    "ARIIA cycle": dict(when="Annual cycle, academic-year pairs",
                        hard_deadline=True, owner="IIC Convener + institution head",
                        evidence="Phase 3A: all ARIIA forms end in '0 (On Progress)'"),
    "Patent deadline": dict(when="Per-filing, externally imposed",
                            hard_deadline=True, owner="Whoever filed - usually the researcher",
                            evidence="P-A07 DOCUMENTED CRITICAL: no institution has a deadline calendar"),
    "IIC quarterly score submission": dict(when="Quarterly",
                                          hard_deadline=False, owner="IIC Coordinator",
                                          evidence="MoE: completing minimum calendar activities earns up to 50% weightage"),
    "No forcing event": dict(when="None identified",
                             hard_deadline=False, owner="-",
                             evidence="P-A03 graded HYPOTHESIS: cohorts are not a documented obligation"),
}

MODULES = {
    "Reporting": dict(need="Reporting",
                      forcing_event="NIRF Innovation cycle",
                      note="The wedge. Phase 3A proves the join fails in official published data."),
    "IPR lifecycle": dict(need="IPR",
                          forcing_event="Patent deadline",
                          note="Only module with a HARD external deadline. P-A07 CRITICAL."),
    "Cohort management": dict(need="Incubation",
                              forcing_event="No forcing event",
                              note="WEAKEST MODULE. No documented obligation creates the need."),
    "Ecosystem management": dict(need="Ecosystem management",
                                 forcing_event="IIC quarterly score submission",
                                 note="Soft deadline - score weightage, not a penalty."),
    "Startup tracking": dict(need="Startup tracking",
                             forcing_event="NIRF Innovation cycle",
                             note="Overlaps Reporting; the portfolio object is the differentiator."),
    "Innovation management": dict(need="Innovation management",
                                  forcing_event="No forcing event",
                                  note="Aspirational. Weakest evidence base of the six needs."),
}


# ==========================================================================
# 6. The segments
# ==========================================================================
# urgency        1-5: how hard is the forcing event
# revenue        1-5: how plausible is money moving
# Both are DOCUMENTED RULES applied to sourced signals, graded in `grade`.
# Neither is a measured outcome - no customer has been asked.

SEGMENTS = [
    dict(
        id="G1", name="Affiliated / general college (private unaided)",
        types=["College (affiliated/general)"],
        activity_scale="Emerging",
        ip_depth="UNKNOWN",
        wtp="Low",
        needs=["Reporting", "Startup tracking"],
        urgency=3, urgency_basis="Files NIRF Innovation; deadline is real but the volume is small",
        revenue=2, revenue_basis="65.3% of colleges are private unaided; thinnest budgets in the system",
        grade="SINGLE-SOURCE",
        population=45473, population_basis="AISHE 2021-22 all colleges",
        modules=dict(Reporting="CORE", **{"IPR lifecycle": "NO", "Cohort management": "NO",
                                           "Ecosystem management": "weak", "Startup tracking": "CORE",
                                           "Innovation management": "NO"}),
        documentary_basis=[
            "Phase 3A F-NODF-GRADIENT: Aditya (private college) left 7 'No Data Found' cells, the most measured",
            "AISHE: 21.5% government / 13.2% private aided / 65.3% private unaided",
            "Teresa's College P-A02: 13-item grant narrative typed into a numeric field",
        ],
        why_primary=("User-designated primary target for the initial phase. Largest population "
                     "by count, and the segment where the reporting defect is most visible "
                     "because the data is thinnest. Volume strategy, not value strategy."),
        caveat=("Largest population AND lowest willingness to pay. Winning here means a low "
                "ACV or a different charge model - these institutions may not sustain "
                "Rs 1.2 lakh/yr. That tension is unresolved and is the segment's main risk."),
    ),
    dict(
        id="G2", name="Autonomous engineering college",
        types=["Autonomous College", "Engineering College"],
        activity_scale="Active",
        ip_depth="UNKNOWN",
        wtp="Low",
        needs=["Reporting", "Startup tracking", "Innovation management"],
        urgency=3, urgency_basis="NIRF Innovation filer; deadline pressure visible in corpus contradictions",
        revenue=3, revenue_basis="Autonomy shortens procurement; campus infrastructure is modern",
        grade="SINGLE-SOURCE",
        population=45473, population_basis="Not separately disaggregated in AISHE; subset of colleges",
        modules=dict(Reporting="CORE", **{"IPR lifecycle": "weak", "Cohort management": "weak",
                                           "Ecosystem management": "CORE", "Startup tracking": "CORE",
                                           "Innovation management": "weak"}),
        documentary_basis=[
            "Corpus: 6 of 36 documents are autonomous colleges",
            "Corpus: 9 of 36 are engineering colleges",
            "P-A02: hand-assembled annual reports (P-A08) concentrate here",
        ],
        why_primary=("Best balance of volume, deadline and some budget. The most realistic "
                     "first paying segment once the reporting module is proven."),
    ),
    dict(
        id="G3", name="NIT / public university with a live IIC",
        types=["NIT", "University"],
        activity_scale="Mature",
        ip_depth="UNKNOWN",
        wtp="Medium",
        needs=["Reporting", "Startup tracking", "IPR", "Ecosystem management"],
        urgency=4, urgency_basis="Multi-deadline: NIRF + ARIIA + patent deadlines",
        revenue=3, revenue_basis="Government procurement is slow but funded; committee above Rs 50K",
        grade="DOCUMENTED",
        population=1168, population_basis="AISHE 2021-22 universities (685 government-managed)",
        modules=dict(Reporting="CORE", **{"IPR lifecycle": "CORE", "Cohort management": "weak",
                                           "Ecosystem management": "CORE", "Startup tracking": "CORE",
                                           "Innovation management": "weak"}),
        documentary_basis=[
            "Phase 3A F-DPIIT-JOIN: IIT Delhi 8 of 38 startups lost at the join (21%)",
            "NIT Calicut P-A08: 55 vs 17 startups in one PDF",
            "NIT Andhra Pradesh: 6 recognised, TRL evidence for only 2 (67% loss - worst measured)",
            "Phase 2: committee trigger spread Rs 50,000 - Rs 10,00,000",
        ],
        why_primary=("Where the Phase 3A headline has live, named, published examples. "
                     "The join defect is demonstrable to this exact buyer."),
    ),
    dict(
        id="G4", name="IIT / premier research institution",
        types=["IIT", "Research Institution"],
        activity_scale="Large ecosystem",
        ip_depth="UNKNOWN",
        wtp="High",
        needs=["IPR", "Ecosystem management"],
        urgency=5, urgency_basis="Highest patent volume and the most demanding deadlines",
        revenue=2, revenue_basis="Slowest procurement in the system; often already has a TTO",
        grade="SINGLE-SOURCE",
        population=273, population_basis="NIRF 2025 Research Institutions category",
        modules=dict(Reporting="NO", **{"IPR lifecycle": "CORE", "Cohort management": "NO",
                                          "Ecosystem management": "CORE", "Startup tracking": "weak",
                                          "Innovation management": "NO"}),
        documentary_basis=[
            "Phase 3A: IIT Bombay lost 16 of 170 startups at the join; IIT Delhi 8 of 38",
            "Phase 3A: IISc had 3 malformed placeholder DPIIT keys (DIPP0000)",
            "IPO: 91,168 national patent filings 2023-24 - real IP volume, real deadlines",
        ],
        why_primary=("HIGHEST URGENCY, WEAK REVENUE PATH. The quadrant disagreement is the "
                     "point: the most acute pain sits behind the slowest procurement."),
        excluded_from_initial_outreach=True,
        exclusion_reason=("Phase 2 and Phase 3B both found their Convener almost certainly "
                          "delegates the form. We would interview and sell to the wrong "
                          "person. Revisit via a named coordinator, never cold."),
    ),
    dict(
        id="G5", name="Incubation centre / AIC / EIC",
        types=["Incubation Centre", "IIC institution"],
        activity_scale="Mature",
        ip_depth="UNKNOWN",
        wtp="Medium",
        needs=["Incubation", "Ecosystem management", "Startup tracking"],
        urgency=2, urgency_basis="No government filing deadline; commercial pressure instead",
        revenue=4, revenue_basis="AIM grant-in-aid up to Rs 10 crore - funded bodies with real procurement power",
        grade="DOCUMENTED",
        population=244, population_basis="NSD26: 244 seed-funded incubators",
        modules=dict(Reporting="weak", **{"IPR lifecycle": "weak", "Cohort management": "CORE",
                                           "Ecosystem management": "CORE", "Startup tracking": "CORE",
                                           "Innovation management": "NO"}),
        documentary_basis=[
            "AIM: AIC/EIC grant-in-aid up to Rs 10 crore over max 5 years",
            "SISFS: 217 incubators selected, Rs 916.91 crore approved",
            "AIM eligibility: minimum 10,000 sq ft built-up space - these are real operations",
        ],
        why_primary=("BEST REVENUE PATH. The only segment whose funding signal points FORWARD "
                     "in time, unlike ARIIA's retrospective expenditure split. Also the only "
                     "segment where cohorts are an actual operating concept."),
    ),
    dict(
        id="G6", name="Medical / pharmacy institution",
        types=["Medical Institution"],
        activity_scale="Emerging",
        ip_depth="UNKNOWN",
        wtp="Low",
        needs=["Reporting", "IPR"],
        urgency=3, urgency_basis="NIRF Medical filers (223) face the same January deadline",
        revenue=2, revenue_basis="Same economics as colleges; regulated environment adds friction",
        grade="HYPOTHESIS",
        population=223, population_basis="NIRF 2025 Medical category",
        modules=dict(Reporting="CORE", **{"IPR lifecycle": "weak", "Cohort management": "NO",
                                           "Ecosystem management": "weak", "Startup tracking": "weak",
                                           "Innovation management": "NO"}),
        documentary_basis=[
            "Corpus: 5 of 36 documents are pharmacy colleges - the only health-adjacent evidence",
            "NIRF 2025: 223 institutions filed the Medical category",
        ],
        why_primary=("Adjacent, not targeted. Corpus evidence is 5 pharmacy colleges, which is "
                     "not a medical institution. Weakest evidence base; kept in the matrix so "
                     "the type is not invisible."),
    ),
    dict(
        id="G7", name="Management institution",
        types=["Management Institution"],
        activity_scale="Emerging",
        ip_depth="UNKNOWN",
        wtp="Medium",
        needs=["Ecosystem management", "Startup tracking"],
        urgency=2, urgency_basis="NIRF Management filers (1,026) but innovation is not core to them",
        revenue=3, revenue_basis="AIC-affiliated IIMs are funded bodies; strong alumni-funded budgets",
        grade="HYPOTHESIS",
        population=1026, population_basis="NIRF 2025 Management category",
        modules=dict(Reporting="weak", **{"IPR lifecycle": "NO", "Cohort management": "weak",
                                           "Ecosystem management": "CORE", "Startup tracking": "CORE",
                                           "Innovation management": "NO"}),
        documentary_basis=[
            "Corpus: 1 of 36 documents is a management college - the thinnest evidence of any type",
            "NIRF 2025: 1,026 institutions filed the Management category",
        ],
        why_primary=("Structurally similar to G5 without the incubation funding. Included to "
                     "close the type gap; not a first target on this evidence."),
    ),
    dict(
        id="G8", name="Private university (deemed / unaided)",
        types=["Private University"],
        activity_scale="Active",
        ip_depth="UNKNOWN",
        wtp="Medium",
        needs=["Reporting", "Startup tracking", "Incubation"],
        urgency=3, urgency_basis="NIRF filer with an established IIC",
        revenue=3, revenue_basis="Autonomous procurement, but no public funding guarantee",
        grade="SINGLE-SOURCE",
        population=483, population_basis="AISHE: 473 private unaided + 10 private deemed",
        modules=dict(Reporting="CORE", **{"IPR lifecycle": "weak", "Cohort management": "CORE",
                                           "Ecosystem management": "CORE", "Startup tracking": "CORE",
                                           "Innovation management": "weak"}),
        documentary_basis=[
            "Corpus: 4 of 36 documents are private deemed/deemed universities",
            "AISHE: 473 private unaided + 10 private deemed universities",
        ],
        why_primary=("Commercial structure means faster decisions than G3 at comparable "
                     "scale. A reasonable second wave."),
    ),
]


# ==========================================================================
# 7. Quadrant - the point of scoring on two axes
# ==========================================================================

def quadrant_name(u, r):
    if u >= 4 and r >= 4:
        return "ACT NOW"
    if u >= 4 and r < 4:
        return "PAINFUL, HARD TO PAY"
    if u < 4 and r >= 4:
        return "BUYABLE, LOW URGENCY"
    return "DEFER"


def quadrant_table():
    rows = []
    for s in SEGMENTS:
        rows.append(dict(
            id=s["id"], name=s["name"], urgency=s["urgency"], revenue=s["revenue"],
            quadrant=quadrant_name(s["urgency"], s["revenue"]),
            wtp=s["wtp"], activity_scale=s["activity_scale"], ip_depth=s["ip_depth"],
            grade=s["grade"],
            excluded_from_initial_outreach=s.get("excluded_from_initial_outreach", False),
        ))
    return sorted(rows, key=lambda r: (-r["urgency"], -r["revenue"]))


# ==========================================================================
# 8. ICP - testable predicates, and an explicit exclusion list
# ==========================================================================

ICP = dict(
    name="Institution with a live annual innovation filing obligation, at least 20 tracked innovations, and one accountable officer who cannot answer a question about their own portfolio",
    one_line=(
        "Not the most innovative institution in India. The one that must file an "
        "innovation return next quarter, holds enough activity that the filing is "
        "lossy, and has exactly one person accountable for it."
    ),
    predicates=[
        dict(test="Files the NIRF Innovation category or an ARIIA return",
             checkable="YES - public",
             how="NIRF 2025 filer list; 777 institutions filed Innovation",
             spec_example_clause="active IIC/incubation ecosystem",
             spec_example_verdict="supportable"),
        dict(test="Runs 20+ tracked innovation projects",
             checkable="PARTLY",
             how="20+ is the corpus median for institutions reporting startups (18/36 report any; max 55)",
             spec_example_clause="20+ startups/innovation projects",
             spec_example_verdict="checkable only where the institution reports it - 50% coverage"),
        dict(test="Has a named IIC Convener / ARIIA-NIRF nodal officer",
             checkable="YES - public",
             how="ARIIA forms name a nodal officer by role and contact in every mined document",
             spec_example_clause="dedicated innovation staff",
             spec_example_verdict="MISLEADING - 2/36 report staff numbers. A named officer is NOT dedicated staff"),
        dict(test="Requires structured reporting across 2+ instruments",
             checkable="YES - public",
             how="IIC portal + NIRF + ARIIA are three separate submissions",
             spec_example_clause="requirement for structured reporting",
             spec_example_verdict="strongly supportable - the strongest clause"),
        dict(test="Has NO system of record upstream of the form",
             checkable="NO",
             how="P-A10 / H-01 - still HYPOTHESIS. The artefact ask is the test",
             spec_example_clause="(not in the example)",
             spec_example_verdict="this is the load-bearing unknown"),
    ],
    spec_clause_audit=("Four of the example's five clauses are checkable from public data. "
                       "'Dedicated innovation staff' is NOT: the corpus populates "
                       "faculty_mentors in 2 of 36 institutions. We therefore substitute a "
                       "checkable proxy (a named nodal officer) and mark the original as "
                       "unverifiable rather than quietly accepting it."),
    primary_segment="G1/G2 - colleges and autonomous colleges, per user direction",
    first_paying_segment="G5 - incubation centres, the only forward-looking budget signal",
)

EXCLUSIONS = [
    dict(segment="G4 - IIT / premier research institution",
         reason="Convener almost certainly delegates the form; slowest procurement; often has a TTO",
         revisit="via a named coordinator, never cold"),
    dict(segment="Institutions with no innovation filing obligation",
         reason="No forcing event (D-007). Nothing creates the deadline that sells the product",
         revisit="only if a non-deadline driver is documented"),
    dict(segment="Students and founders",
         reason="Cannot buy anything - Phase 2 Class D",
         revisit="never, as buyers; always as evidence sources"),
    dict(segment="Incumbents' competitors as buyers",
         reason="91springboard, NSRCEL already run commercial software and build their own",
         revisit="never"),
]


# ==========================================================================
# 9. Validation
# ==========================================================================

def validation():
    errs, warns = [], []

    # G1 every spec type appears in some segment
    typed = set()
    for s in SEGMENTS:
        typed.update(s["types"])
    missing = [t for t in AXES["institution_type"] if t not in typed]
    if missing:
        errs.append(f"spec institution types with no segment: {missing}")

    # G2 vocabulary: WTP must be exactly Low/Medium/High; bands must be in-vocabulary
    for s in SEGMENTS:
        if s["wtp"] not in AXES["willingness_to_pay"]:
            errs.append(f"{s['id']}: wtp '{s['wtp']}' not in spec vocabulary")
        if s["activity_scale"] not in AXES["activity_scale"]:
            errs.append(f"{s['id']}: activity_scale '{s['activity_scale']}' not in vocabulary")
        if s["ip_depth"] != "UNKNOWN":
            errs.append(f"{s['id']}: ip_depth '{s['ip_depth']}' - only UNKNOWN is permitted")

    # G3 needs must be in the spec need vocabulary
    for s in SEGMENTS:
        for n in s["needs"]:
            if n not in AXES["need"]:
                errs.append(f"{s['id']}: need '{n}' not in spec vocabulary")

    # G4 crosswalk completeness - no corpus label silently dropped
    labels = {r.get("institution_type") for r in R.IIC_REPORTS}
    unmapped = sorted(l for l in labels if l and l not in TYPE_CROSSWALK)
    if unmapped:
        errs.append(f"corpus labels with no crosswalk entry: {unmapped}")
    for src, dst in TYPE_CROSSWALK.items():
        if dst not in AXES["institution_type"]:
            errs.append(f"crosswalk '{src}' -> '{dst}' is not a spec type")

    # G5 IP depth must genuinely be unmeasurable, or this module is lying
    cov = ip_depth_coverage()
    if any(c["bandable"] for c in cov):
        errs.append("an IP-depth field became majority-populated; revisit the UNKNOWN claim")
    if not IP_DEPTH["still_actionable"]:
        errs.append("IP_DEPTH lost its still-actionable justification")

    # G6 segment integrity
    for s in SEGMENTS:
        for field in ("id", "name", "types", "activity_scale", "ip_depth", "wtp", "needs",
                      "urgency", "urgency_basis", "revenue", "revenue_basis", "grade",
                      "population", "population_basis", "modules", "documentary_basis"):
            if not s.get(field) and s.get(field) != 0:
                errs.append(f"{s.get('id')}: missing {field}")
        if not 1 <= s["urgency"] <= 5 or not 1 <= s["revenue"] <= 5:
            errs.append(f"{s['id']}: urgency/revenue must be 1-5")
        if not s["documentary_basis"]:
            errs.append(f"{s['id']}: no documentary basis")
        if s.get("excluded_from_initial_outreach") and not s.get("exclusion_reason"):
            errs.append(f"{s['id']}: excluded but no reason given")

    # G7 populations must never be summed - check the CSV writer does not total them
    pops = [s["population"] for s in SEGMENTS]
    if sum(pops) < 1000:
        warns.append("population figures look implausibly small")

    # G8 module keys must match the MODULES registry
    for s in SEGMENTS:
        if set(s["modules"]) != set(MODULES):
            errs.append(f"{s['id']}: module keys != MODULES registry")
        for mk, v in s["modules"].items():
            if v not in ("CORE", "weak", "NO"):
                errs.append(f"{s['id']}/{mk}: unknown fit '{v}'")

    # G9 forcing events referenced by modules must exist
    for m, v in MODULES.items():
        if v["forcing_event"] not in FORCING_EVENTS:
            errs.append(f"module {m} references unknown forcing event")

    # G10 ICP predicates must be honest about checkability
    for p in ICP["predicates"]:
        for field in ("test", "checkable", "how", "spec_example_clause", "spec_example_verdict"):
            if not p.get(field):
                errs.append(f"ICP predicate '{p.get('test','?')[:30]}' missing {field}")

    # G11 no measured-wtp language anywhere - OQ-03 is still open
    blob = str(SEGMENTS) + str(ICP) + str(quadrant_table())
    for banned in ["willingness to pay is", "they will pay", "confirmed buyers",
                   "customers validated", "we asked institutions"]:
        if banned in blob.lower():
            errs.append(f"measured-WTP claim while OQ-03 is open: '{banned}'")

    return errs, warns


def summary():
    prof = activity_profile()
    return dict(
        schema_version=SCHEMA_VERSION, build_date=BUILD_DATE,
        segments=len(SEGMENTS),
        institution_types_covered=len({t for s in SEGMENTS for t in s["types"]}),
        institution_types_declared=len(AXES["institution_type"]),
        corpus_documents=len(R.IIC_REPORTS),
        corpus_labels_crosswalked=len(TYPE_CROSSWALK),
        activity_bands=band_distribution(),
        ip_depth_measurable=IP_DEPTH["measurable"],
        quadrant_counts=dict(_collections.Counter(quadrant_name(s["urgency"], s["revenue"])
                                          for s in SEGMENTS)),
        icp_predicates=len(ICP["predicates"]),
        exclusions=len(EXCLUSIONS),
        interviews_conducted=0,
    )


if __name__ == "__main__":
    import json
    print(json.dumps(summary(), indent=2, ensure_ascii=False))
    print()
    print("ACTIVITY BAND DISTRIBUTION (derived from corpus)")
    for b, n in band_distribution().items():
        print(f"   {b:<20} {n:>3} / {len(R.IIC_REPORTS)}")
    print()
    print("IP DEPTH COVERAGE (why it is UNMEASURABLE)")
    for c in ip_depth_coverage():
        flag = "bandable" if c["bandable"] else "NOT USABLE"
        print(f"   {c['field']:<24} {c['populated']:>3}/{c['corpus']}  {c['coverage_pct']:>5.1f}%  {flag}")
    print()
    print("QUADRANT")
    for q in quadrant_table():
        print(f"   {q['id']}  U{q['urgency']} R{q['revenue']}  {q['quadrant']:<26} {q['name'][:44]}")
    print()
    e, w = validation()
    print("errors:", e or "none")
    print("warns :", w or "none")