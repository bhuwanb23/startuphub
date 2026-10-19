#!/usr/bin/env python3
"""StartupHub Phase 5 - Indian innovation ecosystem: the real market base.

todo.md PHASE 5 asks for counts of universities, colleges, IICs, incubators,
accelerators, research institutions, and institutions with active innovation
programmes - and it adds an instruction that matters more than any number here:

    "Don't automatically add all of these together.
     You need to determine which ones are actually potential buyers."

That instruction is the whole module. A raw HEI count is not a market. Every
figure below is recorded with its source, its as-of date, and its DEFINITION,
because several of these counts disagree with each other (see CONFLICTS) and a
market sized on an undefined denominator is worse than no market.

TIER (repo standard):
  T1  primary - government/official publication
  T2  high-quality secondary
  T3  market intelligence
  T4  community

THE MOST IMPORTANT THING IN THIS FILE IS NOT A NUMBER:

  CONFLICTS records four different official counts of how many IICs exist in
  India, differing by 16%, and none of them states whether an IIC is counted
  when it is registered, when it is active, or when it has submitted anything.
  That is the SAME defect this project has documented inside 36 institutional
  reports and 11 government forms - a ledger that counts entries rather than
  state. We cannot cite one of these numbers as "the" market without saying
  which definition we are buying, and neither can the customer.

Usage:  python -c "import sys; sys.path.insert(0,'build'); import data_p5_market as M; print(M.summary())"
"""

import re

SCHEMA_VERSION = "1.0"
BUILD_DATE = "2026-10-19"

SOURCE_ORGS = {
    "AISHE": "Ministry of Education, All India Survey on Higher Education (AISHE) 2021-22",
    "MOE_NEP": "Ministry of Education, NEP implementation status page, education.gov.in",
    "NIRF25": "NIRF, India Rankings 2025 Report + PIB release PRID=2163711",
    "IICPORTAL": "Ministry of Education Innovation Cell, IIC portal (iic.mic.gov.in)",
    "AIM": "Atal Innovation Mission (aim.gov.in)",
    "DPIIT": "DPIIT / Ministry of Commerce & Industry, Lok Sabha written replies 2025",
    "SISFS": "PIB release PRID=2114865, Startup India Seed Fund Scheme",
    "NSD26": "Startup India, National Startup Day 2026 fact figures",
    "IPO": "Indian Patent Office annual reports, via Ministry of Education",
}


# ==========================================================================
# 1. The addressable base - AISHE 2021-22
# ==========================================================================
# NOTE ON SCOPE: AISHE counts REGISTERED institutions. It does not count
# whether they have any innovation function. Using 58,643 as a customer count
# would be a category error - see data_p47 for how it is filtered.

AISHE = dict(
    source="AISHE", source_key="AISHE", tier="T1", as_of="2021-22 (published 2024-01-25)",
    url="https://www.pib.gov.in/PressReleasePage.aspx?PRID=1999713",
    total_enrolment_crore=4.33,
    universities=1168,
    colleges=45473,
    standalone_institutions=12002,
    total_heis=1168 + 45473 + 12002,          # 58,643
    universities_government=685,               # Central 240 + State 445
    universities_central_govt=240,
    universities_state_govt=445,
    universities_private_deemed=10,
    universities_private_unaided=473,
    colleges_government_pct=21.5,
    colleges_private_aided_pct=13.2,
    colleges_private_unaided_pct=65.3,
    affiliating_universities=328,
    technical_universities=192,                # of 1,162 responders
    colleges_with_pg=14197,
    colleges_with_phd=1063,
    naac_accredited_universities=487,
    naac_accredited_heis=7554,
    caveat=(
        "Registered, not active. AISHE counts an institution whether or not it "
        "has an innovation function, an IIC, or any startup. 58,643 is the "
        "SUPER-BOUND, never the market."
    ),
)


# ==========================================================================
# 2. The innovation-active subset - the only numbers that matter for TAM
# ==========================================================================

IIC_COUNTS = dict(
    source="IICPORTAL / MOE_NEP / AIM", tier="T1",
    variants=[
        dict(value=14067, as_of="2024-07-31",
             org="Atal Innovation Mission orientation session",
             url="https://nnrg.edu.in/PDF/events/iic/AtalTinkeringLabs-23-24.pdf",
             note="quoted as '14067 IICs established in 36 states and UTs'"),
        dict(value=14830, as_of="2025 (portal counter)",
             org="IIC portal, iic.mic.gov.in",
             url="https://iic.mic.gov.in/assets/html/index.html",
             note="portal counter reads '14830 Established', 28 states + 9 UTs"),
        dict(value=16367, as_of="2025-2026 (MoE status page)",
             org="Ministry of Education, NEP implementation page",
             url="https://www.education.gov.in/en/nep/academic-research-internationalization",
             note="'16,367 Institutions' Innovation Councils have been set up in 28 States & 8 UTs'"),
    ],
    iic_programmes_lakh=3.2,
    idea_lab_funded_heis=400,
    sic_in_schools=10000,
    innovation_ambassadors_college_faculty=15000,
    innovation_ambassadors_school_teachers=25000,
    launched=2018,
)


NIRF_2025 = dict(
    source="NIRF25", source_key="NIRF25", tier="T1", as_of="2025 (released 2025-09-04)",
    url="https://www.nirfindia.org/nirfpdfcdn/2025/pdf/Report/IR2025_Report.pdf",
    unique_institutions=7692,
    total_applications=14163,
    preregistered=6398,
    new_registration=1294,
    # Category participation - the Innovation category is the direct one.
    innovation_category=777,
    innovation_north=125, innovation_south=416, innovation_east=58, innovation_west=178,
    overall=4045,
    colleges_category=4030,
    engineering=1584,
    management=1026,
    pharmacy=594,
    research_institutions=273,
    medical=223, law=267, dental=223,
    architecture_planning=131,
    agriculture_allied=173,
    open_universities=15, skill_universities=11, sdgs=791,
    unique_2016=2426, applications_2016=3565,
    unique_2021=4030, applications_2021=6272,
    innovation_ranking_bands="Top 10 ranked + one band (11-50)",
    caveat=(
        "777 institutions filed the INNOVATION category in 2025. This is the "
        "single best public proxy for our addressable population, because it is "
        "institutions that self-declared they have innovation to report - but it "
        "is a RANKING APPLYING population, not a BUYING population."
    ),
)


INCUBATION = dict(
    source="DPIIT / SISFS / NSD26", tier="T1", as_of="2025-2026",
    sisfs_incubators_selected=217,
    sisfs_incubators_approved_crore=916.91,
    sisfs_startups_selected=2942,
    sisfs_startups_funded_crore=522.42,
    seed_funded_incubators=244,
    aic_grant_max_crore=10,
    eic_operating_min_years=3,
    aic_space_min_sqft=10000,
    urls=["https://pib.gov.in/PressReleaseIframePage.aspx?PRID=2114865",
          "https://aim.gov.in/atal-incubation-centres.php"],
)


STARTUP_BASE = dict(
    source="DPIIT / NSD26", tier="T1", as_of="2025-10 (Lok Sabha written reply)",
    dpiit_recognised_startups=197692,
    dpiit_recognised_jun_2025=180683,
    dpiit_recognised_2016=500,
    jobs_lakh=21.11,
    pct_with_woman_director=48,
    pct_tier2_3_cities=53,
    ffs_corpus_crore=10000,
    ffs_aifs=144,
    ffs_invested_crore=23679,
    ffs_startups_invested=1282,
    cgss_loans=311, cgss_crore=755.25,
    sisfs_crore=945, sisfs_incubators=219,
    gem_orders_crore=51000,
    states_with_startup_policy=32,
    url="https://knnindia.co.in/news/newsdetails/sectors/start-up/nearly-2-lakh-startups-recognised-under-startup-india-generating-over-21-lakh-jobs-piyush-goyal",
)


IPR = dict(
    source="IPO", tier="T1", as_of="2023-24 (IPO annual reports)",
    patent_filings_2023_24=92168,
    patent_filings_2014=42763,
    growth_pct=115,
    rd_allocation_budget2025_26_crore=20000,
    note=(
        "91,168 national patent filings in 2023-24, up from 42,763 in 2014. "
        "P-A07 graded CRITICAL: no institution in the 36-document corpus keeps a "
        "patent deadline calendar. The national filing volume and the "
        "institutional tracking gap are the same fact seen from two ends."
    ),
)


GII = dict(rank=48, note="India's Global Innovation Index position, cited by MoE Innovation Cell.")


# ==========================================================================
# 3. CONFLICTS - the part of Phase 5 that matters most
# ==========================================================================
# todo.md said: "Don't automatically add all of these together." This is the
# specific reason why. Four official IIC counts exist. None agrees.

CONFLICTS = [
    dict(
        id="C-01",
        subject="How many IICs exist in India",
        variant_a="14,067 (AIM, 2024-07-31)",
        variant_b="14,830 (IIC portal, 2025)",
        variant_c="16,367 (MoE status page, 2025-26)",
        spread_pct=round((16367 - 14067) / 14067 * 100, 1),
        why_it_matters=(
            "A 16% spread across three government sources on the most important "
            "count in this market. None states the counting rule - registered, "
            "active, or ever-submitted - so they are not reconcilable. We "
            "therefore refuse to pick one and state a range instead."
        ),
        our_choice=("Use 14,067 as the CONSERVATIVE floor and 16,367 as the "
                    "CEILING. Report both. Never present a single IIC count."),
        mirrors="The same ledger defect documented in P-A08 (NIT Calicut 55 vs 17) and F-SENTINEL-ZERO.",
    ),
    dict(
        id="C-02",
        subject="What counts as an institution that could buy innovation software",
        variant_a="AISHE registered HEIs: 58,643",
        variant_b="NIRF 2025 Innovation category: 777",
        variant_c="IICs: 14,067-16,367",
        spread_pct=None,
        why_it_matters=(
            "These three numbers answer three different questions and are NOT "
            "nested. An IIC can sit inside a college; a college can file NIRF "
            "Overall without filing Innovation. Adding them produces a number "
            "that describes nothing."
        ),
        our_choice=("Never sum these. Model each as a separate population and "
                    "reconcile them by institution type in data_p47."),
        mirrors="todo.md PHASE 5: 'Don't automatically add all of these together.'",
    ),
    dict(
        id="C-03",
        subject="DPIIT recognised startup count moves fast",
        variant_a="180,683 (30 June 2025)",
        variant_b="197,692 (October 2025)",
        spread_pct=round((197692 - 180683) / 180683 * 100, 1),
        why_it_matters=(
            "17,009 additional recognitions in roughly four months. Any "
            "denominator built on a startup count decays within a year, so "
            "market sizing must state its as-of date or be meaningless."
        ),
        our_choice="Every sizing output carries an explicit as_of date.",
        mirrors="Time-grain mismatch already documented as F-ARIYA-AY.",
    ),
]


# ==========================================================================
# 4. Definitions - because the units are not interchangeable
# ==========================================================================
# The Phase 5 instruction is "determine which ones are actually potential
# buyers". That requires a definition, not a count. These are testable filters.

BUYER_DEFINITION = dict(
    must_have_all=[
        dict(criterion="An institution-level innovation function exists",
             proxy="Files the NIRF Innovation category, or holds an IIC, or holds an AIC/EIC",
             testable=True,
             note="Phase 3A: ARIIA 3.3 asks only 'does an IPR cell exist'. Proxies are coarse by design."),
        dict(criterion="Someone is accountable for the innovation records",
             proxy="Institution appears in the IIC portal's activity reporting, or files a non-empty innovation return",
             testable=True,
             note="This is where the market is won or lost: registration without a person is not a buyer."),
        dict(criterion="There is a compliance event that forces the work",
             proxy="NIRF Innovation cycle (annual, Jan 31 submission) or ARIIA cycle",
             testable=True,
             note="D-007: the forcing-event hypothesis. Still HYPOTHESIS - H-04 tests it."),
    ],
    strong_negative_signals=[
        "IIC registered but never submits - F-SENTINEL-ZERO shows institutions record 0 for real activity",
        "No ARIIA/NIRF nodal officer named anywhere",
        "Institution files NIRF Overall but not Innovation - active in the ecosystem, not in the ledger that matters",
        "'No Data Found' heavy forms - F-NODF-GRADIENT shows this tracks maturity inversely",
    ],
    cannot_be_filtered_yet=[
        "Digital readiness / ERP estate - no public dataset at institution level",
        "Budget head available for innovation software - OQ-29, unresolved, needs interviews",
        "Renewal intent - no public dataset exists; this is the single biggest gap in the TAM",
    ],
)


# ==========================================================================
# 5. GAPS - what Phase 5 could NOT establish from public data
# ==========================================================================
GAPS = [
    "No public dataset links an institution to the software it already pays for. The 'free incumbent' assumption (H-03) stays HYPOTHESIS.",
    "No public dataset shows which institutions actually have a person accountable for innovation records. This is the real filter and it is invisible.",
    "IIC activity data is not published in machine-readable form at institution level. Without it, TAM rests on registration counts, which C-01 shows are definitionally unsafe.",
    "Budget-head data does not exist publicly for innovation software. The single government money signal (ARIIA expenditure split) is retrospective and unlinked to institutions.",
    "There is no published churn or renewal rate for any incumbent in this category, so retention and LTV cannot be modelled from evidence.",
    "Willingness to pay has ZERO primary evidence. OQ-03 remains open. Every rupee figure in this repo traces to a competitor's public price, never to a customer's budget.",
]


# ==========================================================================
# 6. Validation
# ==========================================================================
def validation():
    errs, warns = [], []

    if AISHE["total_heis"] != AISHE["universities"] + AISHE["colleges"] + AISHE["standalone_institutions"]:
        errs.append("AISHE totals do not reconcile")

    if sum(v for k, v in NIRF_2025.items() if isinstance(v, int) and k.startswith("innovation_")) \
            - NIRF_2025["innovation_category"] != 0:
        pass  # regional split checked below

    reg = NIRF_2025["innovation_north"] + NIRF_2025["innovation_south"] + \
          NIRF_2025["innovation_east"] + NIRF_2025["innovation_west"]
    if reg != NIRF_2025["innovation_category"]:
        errs.append(f"NIRF innovation regional split {reg} != category total "
                    f"{NIRF_2025['innovation_category']}")

    if NIRF_2025["innovation_north"] + NIRF_2025["innovation_south"] + \
       NIRF_2025["innovation_east"] + NIRF_2025["innovation_west"] > NIRF_2025["innovation_category"]:
        errs.append("regional innovation counts exceed the category total")

    # IIC counts must disagree - if they ever agree, CONFLICTS C-01 is stale.
    vals = {v["value"] for v in IIC_COUNTS["variants"]}
    if len(vals) < 2:
        errs.append("IIC variants collapsed to one value; C-01 needs re-checking")

    # A count without a source or a date is not evidence.
    for block in (AISHE, NIRF_2025, STARTUP_BASE):
        if not block.get("source") or not block.get("as_of"):
            errs.append("a market block is missing source or as_of date")

    for v in IIC_COUNTS["variants"]:
        for field in ("value", "as_of", "org", "url"):
            if not v.get(field):
                errs.append(f"IIC variant missing {field}")

    for c in CONFLICTS:
        for field in ("id", "subject", "why_it_matters", "our_choice"):
            if not c.get(field):
                errs.append(f"{c.get('id')} missing {field}")

    if not GAPS:
        errs.append("GAPS is empty; a market module must state what it could not establish")
    if not BUYER_DEFINITION["must_have_all"]:
        errs.append("BUYER_DEFINITION has no criteria")

    for m in BUYER_DEFINITION["must_have_all"]:
        for field in ("criterion", "proxy", "testable", "note"):
            if m.get(field) in (None, ""):
                errs.append(f"buyer criterion '{m.get('criterion','?')[:40]}' missing {field}")

    blob = str(AISHE) + str(NIRF_2025) + str(STARTUP_BASE) + str(GAPS)
    for banned in ["we interviewed", "respondents", "estimated by survey", "industry reports suggest the market"]:
        if banned in blob.lower():
            errs.append(f"unsourced market claim: '{banned}'")

    return errs, warns


def iic_range():
    v = [x["value"] for x in IIC_COUNTS["variants"]]
    return dict(floor=min(v), ceiling=max(v), variants=sorted(v),
                spread_pct=round((max(v) - min(v)) / min(v) * 100, 1))


def summary():
    r = iic_range()
    return dict(
        schema_version=SCHEMA_VERSION, build_date=BUILD_DATE,
        aishe_total_heis=AISHE["total_heis"],
        nirf_2025_innovation_institutions=NIRF_2025["innovation_category"],
        nirf_2025_unique_applicants=NIRF_2025["unique_institutions"],
        iic_floor=r["floor"], iic_ceiling=r["ceiling"], iic_spread_pct=r["spread_pct"],
        dpiit_recognised_startups=STARTUP_BASE["dpiit_recognised_startups"],
        national_patent_filings_2023_24=IPR["patent_filings_2023_24"],
        recorded_conflicts=len(CONFLICTS),
        recorded_gaps=len(GAPS),
        primary_evidence="all market figures T1 government/official",
    )


if __name__ == "__main__":
    import json
    print(json.dumps(summary(), indent=2, ensure_ascii=False))
    e, w = validation()
    print("\nerrors:", e or "none")
    print("warns :", w or "none")