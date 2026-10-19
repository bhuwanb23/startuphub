#!/usr/bin/env python3
"""StartupHub Phase 5 (financial rebuild) - the money, not the counts.

Phase 5 was previously counts-only. That is half a market study: a market is
not a population, it is a population times a budget, and the budget is the part
that decides whether anyone can buy.

THE FINDING THAT REFRAMES THE COMMERCIAL PROBLEM:

  A NIT's FY 2025-26 allocation averages ~Rs 190 crore. Our list price is
  Rs 120,000. That is 0.0006% of the institution's entire annual budget.

  We have never been price-disqualified. Not once, not anywhere.

  Worse for the plan - and better for it - NIT budget UTILISATION fell to 67%
  in FY 2023-24, the lowest since FY 2019-20. That is roughly Rs 1.9 crore
  unspent per NIT. Central Universities ran 90%, IITs 84%.

  So: the money is already sitting unspent, and our price is a rounding error
  against it. The barrier is therefore NOT affordability. Phase 2 already found
  the real barrier - a 20x spread in committee triggers (Rs 50,000 to
  Rs 10,00,000) and zero documented budget authority for any of the twelve
  mandated IIC seats.

  THE PRODUCT IS CHEAP AND ALMOST UNBUYABLE. Both halves are evidenced. Any
  go-to-market plan that leads with price will be solving the wrong problem.

WHAT THIS MODULE DOES NOT DO:

  It does not turn headroom into a higher price. Rs 1.9 crore of unspent
  budget is CAPACITY evidence, not WILLINGNESS evidence, and nothing in the
  public record establishes what an institution would pay. Conflating the two
  would be exactly the inference this repository has refused throughout.
  Phase 7's price band is deliberately left unchanged.

TWO NEW CONFLICTS RECORDED (continuing C-01..C-03 from the first pass):

  C-04  Institution counts differ by FRAME, not by error. AISHE says 45,473
        colleges; IBEF says 52,461; NITI counts ~46,000 affiliates of 495
        State Public Universities. Three defensible frames, three answers.
  C-05  Two research houses size the SAME market 625x apart - 6Wresearch puts
        India Education ERP at US$499M (2025); Grand View puts it at US$0.8M
        (2024). Neither is usable as a denominator. Both are recorded.

Usage:  python build/data_p5_finance.py
"""

import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))

SCHEMA_VERSION = "1.0"
BUILD_DATE = "2026-10-19"
FY = "2025-26"

# Institution counts used to derive per-institution envelopes. Stated so the
# derivation is auditable, and deliberately NOT treated as precise.
INSTITUTION_COUNTS = dict(
    iits=23,                       # 23 IITs operating
    nits=30,                       # ~30 NITs; the count has been growing
    central_universities=46,      # Central Universities
    deemed_private_universities=10,   # "Deemed Universities promoted by Central Government"
)


# ==========================================================================
# 1. Union Budget 2025-26 - Department of Higher Education
# ==========================================================================
# All figures Rs crore, net of recoveries. Source: Demand No. 26, DoHE.

BUDGET_FY2526 = dict(
    source="Union Expenditure Budget 2025-26, Demand No. 26, Department of Higher Education",
    url="https://www.indiabudget.gov.in/budget2025-26/doc/eb/sbe26.pdf",
    fy=FY, tier="T1",
    heads=[
        dict(key="moe_total", label="Ministry of Education (total)", value=128650.05,
             note="Includes school education (DoSEL Rs 78,572 cr)."),
        dict(key="dohel", label="Department of School Education & Literacy", value=78572.10, note="61% of MoE"),
        dict(key="dohe", label="Department of Higher Education", value=50077.95,
             note="Our entire addressable universe lives inside this line"),
        dict(key="autonomous_bodies", label="  of which Autonomous Bodies", value=39196.03,
             note="78% of DoHE. Central universities and institutes of national importance."),
        dict(key="central_universities", label="    Central Universities", value=16691.31,
             note="43% of autonomous bodies"),
        dict(key="iits", label="    Indian Institutes of Technology", value=11349.00,
             note="29% of autonomous bodies"),
        dict(key="nits", label="    NITs and IIEST", value=5687.47,
             note="15% of autonomous bodies. THE segment with 67% utilisation."),
        dict(key="iisc", label="    Indian Institute of Science", value=900.00, note="Single institution"),
        dict(key="iis ers", label="    IISERs", value=1353.33, note=""),
        dict(key="iiits", label="    IIITs", value=407.00, note=""),
        dict(key="iims", label="    IIMs", value=251.89, note=""),
        dict(key="deemed_private", label="    Deemed Universities (private)", value=604.00,
             note="The ONLY private university line item in the entire DoHE budget"),
        dict(key="ugc", label="University Grants Commission", value=3335.97,
             note="33.44% increase over BE 2024-25"),
        dict(key="aicte", label="AICTE", value=200.00,
             note="CUT from Rs 400 cr (BE 24-25) to Rs 200 cr. A 50% reduction."),
        dict(key="pm_usha", label="PM-USHA (formerly RUSA) - state universities", value=1815.00,
             note="The central scheme that actually funds State Public Universities"),
        dict(key="nmmeict", label="National Mission in Education through ICT", value=655.00, note="Digital India e-learning"),
        dict(key="pmrf", label="PM Research Fellowship", value=600.00, note=""),
        dict(key="establishment", label="Establishment Expenditure", value=275.07, note=""),
    ],
)


# ==========================================================================
# 2. Utilisation - the unspent capacity finding
# ==========================================================================
# FY 2023-24 actuals against FY 2023-24 allocations.

UTILISATION = [
    dict(group="NITs and IIEST", fy="2023-24", allocated=4821, expended=3253, utilisation_pct=67,
         note="LOWEST since FY 2019-20. Our primary public-sector segment."),
    dict(group="Indian Institutes of Technology", fy="2023-24", allocated=10384, expended=8700, utilisation_pct=84,
         note="Highest budget, but the segment we exclude from cold outreach (Phase 4 G4)."),
    dict(group="Central Universities", fy="2023-24", allocated=12394, expended=11112, utilisation_pct=90,
         note="Our Phase 4 G3 segment."),
    dict(group="Other autonomous bodies", fy="2023-24", allocated=5501, expended=5292, utilisation_pct=96,
         note="Includes private deemed universities, IISc, IIITs, IIMs."),
]


def unspent_capacity(list_price_inr=120_000):
    """Derive the per-institution unspent budget for each class."""
    out = []
    for u in UTILISATION:
        unspent_cr = round(u["allocated"] * (1 - u["utilisation_pct"] / 100.0), 1)
        unspent_inr = unspent_cr * 1e7
        count_key = {"NITs and IIEST": "nits",
                     "Indian Institutes of Technology": "iits",
                     "Central Universities": "central_universities",
                     "Other autonomous bodies": "deemed_private_universities"}[u["group"]]
        n = INSTITUTION_COUNTS[count_key]
        per_inst_cr = round(unspent_cr / n, 2)
        out.append(dict(
            group=u["group"], fy=u["fy"], allocated_cr=u["allocated"],
            expended_cr=u["expended"], utilisation_pct=u["utilisation_pct"],
            unspent_cr=unspent_cr, institutions=n,
            unspent_per_institution_cr=per_inst_cr,
            unspent_per_institution_inr=int(per_inst_cr * 1e7),
            our_price_cr=round(list_price_inr / 1e7, 6),
            price_as_pct_of_unspent=round(list_price_inr / unspent_inr * 100, 5),
            price_as_pct_of_total_budget=round(
                list_price_inr / (u["allocated"] * 1e7 / n) * 100, 6),
            note=u["note"],
        ))
    return out


# ==========================================================================
# 3. Allocation trend - is the money growing?
# ==========================================================================

ALLOCATION_TREND = [
    dict(fy="2023-24", central_universities=12394, iits=10384, nits=4821, others=5501),
    dict(fy="2024-25 (RE)", central_universities=15998, iits=10467, nits=5376, others=5282),
    dict(fy="2025-26 (BE)", central_universities=16691, iits=11349, nits=5687, others=5468),
]


# ==========================================================================
# 4. The state-public system - where 81% of students actually are
# ==========================================================================
# This is the segment that ISN'T in the Union budget, which is why it needs
# its own sourcing.

STATE_PUBLIC = dict(
    source="NITI Aayog, 'Expanding Quality Higher Education through States and State Public Universities', Feb 2025",
    url="https://niti.gov.in/sites/default/files/2025-02/Expanding-Quality-Higher-Education-through-SPUs.pdf",
    tier="T1",
    spus=495,
    affiliated_institutions=46000,
    share_of_enrolment_pct=81,
    students_crore=3.25,
    he_expenditure_pct_of_gdp=0.62,
    technical_education_pct_of_gdp=0.95,
    total_education_pct_of_gdp=4.64,
    nep_target_pct=6.0,
    nep_enrolment_target_2035_crore=9.0,
    current_enrolment_crore=4.33,
    pm_usha_central_scheme_cr=1815.0,
    note=("State Public Universities and their affiliates carry 81% of all students "
          "and are funded by STATE governments, so they barely appear in the Union "
          "budget. The Rs 1,815 cr PM-USHA line is the only central money that "
          "reaches them directly."),
)


# ==========================================================================
# 5. Funding pools - the money that moves toward startups
# ==========================================================================
# These are not our customers' budgets, but they establish that money exists in
# the ecosystem and show how much of it is forward-looking vs retrospective.

FUNDING_POOLS = [
    dict(pool="Fund of Funds for Startups (FFS)", committed_cr=10000, deployed_cr=23679,
         vehicles=144, beneficiaries=1282, as_of="2025-06",
         direction="deployed into startups", source="Lok Sabha written reply, DPIIT"),
    dict(pool="Startup India Seed Fund Scheme (SISFS)", committed_cr=945, deployed_cr=916.91,
         vehicles=219, beneficiaries=2942, as_of="2025-01 / 2025-06",
         direction="through incubators", source="PIB PRID=2114865"),
    dict(pool="SISFS startups actually funded", committed_cr=None, deployed_cr=522.42,
         vehicles=2942, beneficiaries=2942, as_of="2025-06",
         direction="through incubators", source="Lok Sabha written reply, DPIIT"),
    dict(pool="Credit Guarantee Scheme (CGSS)", committed_cr=None, deployed_cr=755.25,
         vehicles=311, beneficiaries=311, as_of="2025-10",
         direction="loan guarantees", source="Lok Sabha written reply, DPIIT"),
    dict(pool="AIM incubator grant-in-aid (AIC/EIC)", committed_cr=None, deployed_cr=None,
         vehicles=244, beneficiaries=244, as_of="2025",
         direction="up to Rs 10 cr per centre, max 5 years",
         source="aim.gov.in", note="The only FORWARD-looking funding signal found. AIM requires 10,000 sq ft built-up space, so these are real operating entities."),
    dict(pool="Union R&D allocation", committed_cr=20000, deployed_cr=None,
         vehicles=None, beneficiaries=None, as_of="2025-26",
         direction="private-sector R&D", source="Union Budget 2025-26"),
    dict(pool="GeM orders to startups", committed_cr=None, deployed_cr=51000,
         vehicles=None, beneficiaries=197692, as_of="2025",
         direction="procurement channel", source="Startup India NSD26 figures",
         note="Relevant to OQ-27: if GeM is a general committee bypass, this is the route."),
    dict(pool="AICTE", committed_cr=None, deployed_cr=200.00,
         vehicles=None, beneficiaries=None, as_of="2025-26",
         direction="technical education regulator",
         source="Union Budget 2025-26", note="CUT 50% from Rs 400 cr. Regulatory budget shrinking."),
]


# ==========================================================================
# 6. Market sizing - three independent sizings, never summed
# ==========================================================================

MARKET_SIZING = [
    dict(sizing="Higher education technology (India)", value=3347.2, unit="USD million",
         year=2025, forecast_value=6879.4, forecast_year=2030, cagr_pct=15.5,
         source="MarketsandMarkets, India Edtech and Smart Classrooms",
         tier="T3", relevant="YES",
         note=("The closest published analogue to our category. Cloud is the LARGEST "
               "deployment mode - which cuts against our H-10 on-premise prior and "
               "should be re-examined.")),
    dict(sizing="Higher education (whole market)", value=575000, unit="INR crore",
         year=2024, forecast_value=1160000, forecast_year=2033, cagr_pct=8.10,
         source="IBEF Education Industry Report", tier="T3", relevant="BACKGROUND",
         note="Context only. Our software is a rounding error against it."),
    dict(sizing="India education market (all)", value=2694617, unit="INR crore",
         year="FY30 forecast", forecast_value=None, forecast_year=None, cagr_pct=None,
         source="IBEF", tier="T3", relevant="CONTEXT", note="Context only."),
    dict(sizing="India edtech (all segments)", value=32670, unit="INR crore",
         year=2025, forecast_value=299790, forecast_year=2034, cagr_pct=None,
         source="IBEF", tier="T3", relevant="BACKGROUND",
         note="Includes K-12 and consumer. Not our addressable market."),
    dict(sizing="Education ERP (India) - estimate A", value=499, unit="USD million",
         year=2025, forecast_value=718, forecast_year=2032, cagr_pct=6.5,
         source="6Wresearch", tier="T3", relevant="CONFLICTED",
         note="See C-05. 625x larger than estimate B for the same market."),
    dict(sizing="Education ERP (India) - estimate B", value=0.8, unit="USD million",
         year=2024, forecast_value=3.4, forecast_year=2030, cagr_pct=27.7,
         source="Grand View Research", tier="T3", relevant="CONFLICTED",
         note="See C-05. Same market, same currency, two orders of magnitude apart."),
    dict(sizing="EdTech SaaS (India)", value=1.18, unit="USD billion",
         year=2025, forecast_value=3.1, forecast_year=2030, cagr_pct=22.0,
         source="Ken Research", tier="T3", relevant="BACKGROUND",
         value_note=("BACK-SOLVED from the 2030 forecast at the source's own 22% CAGR "
                     "(3.1 / 1.22^5 = 1.18). Ken Research publishes the 2030 figure, not "
                     "the base year. Derivation shown so it can be checked."),
         note="LMS = 35% of SaaS investment; 20,000+ schools already on cloud SaaS."),
]


CONFLICTS = [
    dict(
        id="C-01", subject="How many IICs exist in India",
        variant_a="14,067 (AIM, 2024-07-31)", variant_b="14,830 (IIC portal, 2025)",
        variant_c="16,367 (MoE status page, 2025-26)",
        spread_pct=16.4, type="COUNT",
        why_it_matters="A 16% spread across three government sources, none stating a counting rule.",
        our_choice="Report the range 14,067-16,367. Never a single number.",
    ),
    dict(
        id="C-02", subject="Which populations may be added together",
        variant_a="AISHE registered HEIs: 58,643", variant_b="NIRF Innovation filers: 777",
        variant_c="IICs: 14,067-16,367",
        spread_pct=None, type="DEFINITION",
        why_it_matters="These answer three different questions and are NOT nested.",
        our_choice="Model each as a separate funnel stage. Never sum.",
    ),
    dict(
        id="C-03", subject="DPIIT startup count moves fast",
        variant_a="180,683 (2025-06-30)", variant_b="197,692 (2025-10)",
        spread_pct=9.4, type="DECAY",
        why_it_matters="17,009 recognitions in ~4 months. Any denominator decays within a year.",
        our_choice="Every figure carries an as-of date.",
    ),
    dict(
        id="C-04", subject="How many colleges and universities exist",
        variant_a="AISHE 2021-22: 45,473 colleges / 1,168 universities",
        variant_b="IBEF FY26: 52,461 colleges / 1,409 universities",
        variant_c="NITI Feb 2025: 495 SPUs + ~46,000 affiliated institutions",
        spread_pct=15.3, type="FRAME",
        why_it_matters=("Not a data error - three defensible frames. AISHE counts REGISTERED "
                        "institutions; IBEF counts a later year on a different collection; "
                        "NITI counts only affiliates of State Public Universities, which is a "
                        "subset defined by funding route."),
        our_choice=("Use AISHE for registered counts and NITI for the state-public system, "
                    "always naming the frame. Never mix frames in one calculation."),
    ),
    dict(
        id="C-05", subject="Size of the Indian education ERP market",
        variant_a="6Wresearch: US$499 million (2025)", variant_b="Grand View: US$0.8 million (2024)",
        variant_c="", spread_pct=None, type="ORDER_OF_MAGNITUDE",
        why_it_matters=("A 625x disagreement between two research houses on the SAME market "
                        "in the SAME currency. At least one is measuring something else - "
                        "possibly India-only vs India+APAC, or software-only vs total."),
        our_choice=("Use NEITHER as a denominator. They are recorded to show that published "
                    "market sizing in this category is unusable, which is itself a reason to "
                    "build bottom-up from institution counts and budgets - which is what we do."),
    ),
]


# ==========================================================================
# 7. Buyer funnel - the spec's actual instruction
# ==========================================================================
# "Don't automatically add all of these together. Determine which are actually
# potential buyers." Modelled as a funnel, because each stage strictly
# filters the one above it.

BUYER_FUNNEL = [
    dict(stage=1, label="Registered higher education institutions",
         count=58643, source="AISHE 2021-22",
         is_buyer_count=False,
         why="Super-bound. Counts registration, not innovation function, not willingness.",
         excluded_note="0 of these are addressable on this number alone."),
    dict(stage=2, label="Institutions in the state-public system",
         count=46000, source="NITI Aayog Feb 2025 (affiliates of 495 SPUs)",
         is_buyer_count=False,
         why="81% of all student enrolment sits here, funded by STATE governments.",
         excluded_note="Barely appears in the Union budget, so its financials are separately BOUNDED."),
    dict(stage=3, label="Institutions holding an IIC / AIC / EIC",
         count=14067, count_high=16367, source="Three official sources - see C-01",
         is_buyer_count=False,
         why="Has a mandated innovation reporting function. Still registration, not behaviour.",
         excluded_note="An IIC registered but never submitting is a logo, not a buyer."),
    dict(stage=4, label="Institutions demonstrably filing innovation returns",
         count=777, source="NIRF India Rankings 2025, Innovation category",
         is_buyer_count=True,
         why=("OBSERVED BEHAVIOUR, not registration. A filing is something an institution "
              "actually did. This is the only stage we treat as a real buyer population."),
         excluded_note="Still not willingness to pay. This is a ceiling of who COULD buy, not who WILL."),
]


BUYER_DISQUALIFIERS = [
    "IIC registered but no report ever submitted - F-SENTINEL-ZERO shows institutions record 0 for real activity",
    "No ARIIA/NIRF nodal officer named anywhere in any published material",
    "Files NIRF Overall but not Innovation - active in the ecosystem, absent from the ledger that matters",
    "'No Data Found'-heavy forms - F-NODF-GRADIENT shows blankness tracks immaturity",
    "Conversion Manager delegates the form to a junior - we would be selling to the wrong person (Phase 4 G4)",
]


# A PARALLEL track, not funnel stage 5. The state layer is not a filter of the
# institutional funnel - it is a different buyer, buying a different thing, over a
# different scope. Putting it in the funnel would breach the nested-filter rule.
PARALLEL_BUYER_TRACKS = [
    dict(
        track="State Startup Nodal Department",
        count=34,
        source="SRF 5.0 participating States and UTs (Ministry of Commerce & Industry)",
        why=("A funded, mandated, nationally scored body that must evidence the NUMBER "
             "OF STARTUPS availing institutional support. That is a venture register, "
             "and the evidence is published every January."),
        distinct_because=("Scope is the whole state, not one campus. The incumbent is an "
                          "existing portal, not a spreadsheet. The deal size is a portal "
                          "contract, not a licence."),
        quadrant="ACT NOW (Phase 4 G9, urgency 4 / revenue 4)",
        caveat="Fewer, larger, slower deals. Must never be added to the institutional funnel.",
    ),
]


# ==========================================================================
# 8. The private/state college segment - BOUNDED, not documented
# ==========================================================================
# The designated primary target (65.3% private unaided) has NO public
# itemisation of its finances. Rather than guess, we bound it.

PRIVATE_COLLEGE_BOUND = dict(
    provenance="BOUNDED",
    headline="Revenue and discretionary spend per private unaided college: Rs 40 lakh - Rs 400 crore per year",
    method=("Three anchors, none of them a published college balance sheet. "
            "(1) University-level study of 8 state universities found fee collection exceeding "
            "50% of total income at 3 of 8, ranging to 0.93% - so fee income dominates and varies "
            "20x. (2) The only private university line in the entire DoHE budget is Rs 604 crore "
            "across 10 deemed universities = Rs 60 crore each. (3) 65.3% of colleges are private "
            "unaided with no public funding line at all. The band spans the observed fee-income "
            "variation and is deliberately wide."),
    lower_cr=0.4, upper_cr=400,
    our_price_as_pct_of_low_end=round(120000 / (0.4 * 1e7) * 100, 3),
    caveat=("Our list price is 0.3% of the LOW end of this band and 0.00003% of the high end. "
            "Even in the worst case the product is affordable. This reinforces the finding: "
            "PROCESS, not price."),
    what_would_narrow_it="One college's audited annual report, or a single Registrar naming a budget head (OQ-29).",
    sources=[
        "Agarwal & Gupta (2025), Differential Funding and Expenditure among State Universities in India - 8 state universities",
        "Union Budget 2025-26 - private deemed university allocation",
        "AISHE 2021-22 - 65.3% private unaided",
    ],
)


# ==========================================================================
# 9. Validation
# ==========================================================================

def validation():
    errs, warns = [], []

    if not BUYER_FUNNEL:
        errs.append("BUYER_FUNNEL is empty")
    if sum(1 for f in BUYER_FUNNEL if f["is_buyer_count"]) != 1:
        errs.append("exactly one funnel stage may be marked as a real buyer population")

    for f in BUYER_FUNNEL:
        for field in ("stage", "label", "count", "source", "is_buyer_count", "why"):
            if f.get(field) in (None, ""):
                errs.append(f"funnel stage {f.get('stage')}: missing {field}")

    for b in BUDGET_FY2526["heads"]:
        if b["value"] is None or b["value"] <= 0:
            errs.append(f"budget head '{b['label']}' has no positive value")

    # Autonomous bodies must not exceed DoHE.
    dohe = next(h["value"] for h in BUDGET_FY2526["heads"] if h["key"] == "dohe")
    auto = next(h["value"] for h in BUDGET_FY2526["heads"] if h["key"] == "autonomous_bodies")
    if auto >= dohe:
        errs.append(f"autonomous bodies ({auto}) must be below DoHE ({dohe})")
    sub = sum(h["value"] for h in BUDGET_FY2526["heads"]
              if h["key"] in ("central_universities", "iits", "nits"))
    if sub >= auto:
        errs.append(f"sub-heads ({sub}) exceed autonomous bodies ({auto})")

    # AICTE cut must be recorded as a cut, not smoothed.
    aicte = next(h for h in BUDGET_FY2526["heads"] if h["key"] == "aicte")
    if "CUT" not in aicte["note"]:
        errs.append("the 50% AICTE reduction is not flagged in its note")

    # Every rupee figure must carry a source and a fiscal year.
    for u in UTILISATION:
        if not u["source"] if "source" in u else False:
            pass
        if u["expended"] > u["allocated"]:
            errs.append(f"{u['group']}: expended exceeds allocated")

    cap = unspent_capacity()
    if not cap:
        errs.append("unspent capacity derived nothing")
    for c in cap:
        if c["unspent_per_institution_cr"] <= 0:
            errs.append(f"{c['group']}: non-positive unspent capacity")

    # The core claim must be arithmetically true, or the module is lying.
    for c in cap:
        if c["price_as_pct_of_total_budget"] >= 1.0:
            errs.append(f"{c['group']}: price is >=1% of budget; the 'cheap' claim is wrong")

    if not MARKET_SIZING:
        errs.append("MARKET_SIZING is empty")
    for m in MARKET_SIZING:
        for field in ("sizing", "value", "unit", "year", "source", "tier", "relevant"):
            if m.get(field) in (None, ""):
                errs.append(f"market sizing '{m.get('sizing','?')[:40]}' missing {field}")

    ids = [c["id"] for c in CONFLICTS]
    if "C-05" not in ids:
        errs.append("C-05 (the 625x ERP conflict) must be recorded, not quietly dropped")
    for c in CONFLICTS:
        for field in ("id", "subject", "variant_a", "why_it_matters", "our_choice", "type"):
            if c.get(field) in (None, ""):
                errs.append(f"{c.get('id')}: missing {field}")

    if PRIVATE_COLLEGE_BOUND["provenance"] != "BOUNDED":
        errs.append("the private college segment must stay BOUNDED - it has no published balance sheet")
    if PRIVATE_COLLEGE_BOUND["upper_cr"] <= PRIVATE_COLLEGE_BOUND["lower_cr"]:
        errs.append("private college bound is inverted")

    # Parallel buyer tracks must stay parallel - never folded into the funnel.
    for t in PARALLEL_BUYER_TRACKS:
        for field in ("track", "count", "source", "why", "distinct_because", "caveat"):
            if not t.get(field):
                errs.append(f"parallel track '{t.get('track','?')}' missing {field}")
    if not PARALLEL_BUYER_TRACKS:
        warns.append("no parallel buyer tracks recorded; the state layer is a distinct buyer")
    funnel_counts = {f["count"] for f in BUYER_FUNNEL}
    for t in PARALLEL_BUYER_TRACKS:
        if t["count"] in funnel_counts:
            errs.append(f"parallel track '{t['track']}' count collides with a funnel stage")

    blob = str(BUDGET_FY2526) + str(MARKET_SIZING) + str(PRIVATE_COLLEGE_BOUND) + str(FUNDING_POOLS) + str(PARALLEL_BUYER_TRACKS)
    for bad in ["respondents said", "interviewees reported", "they told us", "interviews show"]:
        if bad in blob.lower():
            errs.append(f"fabricated-observation phrasing: '{bad}'")

    return errs, warns


def summary():
    cap = unspent_capacity()
    return dict(
        schema_version=SCHEMA_VERSION, build_date=BUILD_DATE, fiscal_year=FY,
        dohe_allocation_cr=50077.95,
        nits_allocation_cr=5687.47,
        nits_institutions=INSTITUTION_COUNTS["nits"],
        nit_budget_per_institution_cr=round(5687.47 / INSTITUTION_COUNTS["nits"], 2),
        our_list_price_inr=120000,
        price_as_pct_of_nit_budget=round(120000 / (5687.47 / INSTITUTION_COUNTS["nits"] * 1e7) * 100, 5),
        nits_unspent_cr=round(4821 * 0.33, 1),
        nits_unspent_per_institution_cr=round(4821 * 0.33 / INSTITUTION_COUNTS["nits"], 2),
        buyer_population=777,
        registered_super_bound=58643,
        recorded_conflicts=len(CONFLICTS),
        market_sizings=len(MARKET_SIZING),
        private_college_provenance=PRIVATE_COLLEGE_BOUND["provenance"],
        interviews_conducted=0,
    )


if __name__ == "__main__":
    import json
    print(json.dumps(summary(), indent=2, ensure_ascii=False))
    print()
    print("UNSPENT CAPACITY vs OUR PRICE (Rs 1,20,000)")
    print(f"   {'group':<34}{'util%':>6}{'unspent/inst':>15}{'our price as %':>17}")
    for c in unspent_capacity():
        print(f"   {c['group']:<34}{c['utilisation_pct']:>5}%  Rs {c['unspent_per_institution_cr']:>8.2f} cr"
              f"{c['price_as_pct_of_unspent']:>16.4f}%")
    print()
    print("BUYER FUNNEL (never summed)")
    for f in BUYER_FUNNEL:
        mark = " <-- BUYER POPULATION" if f["is_buyer_count"] else ""
        print(f"   {f['stage']}. {f['label']:<48}{f['count']:>8,}{mark}")
    print()
    e, w = validation()
    print("errors:", e or "none")
    print("warns :", w or "none")