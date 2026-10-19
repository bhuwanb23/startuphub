#!/usr/bin/env python3
"""StartupHub Phase 10 - Competitor Matrix.

    "Create a huge spreadsheet. Columns: [27 listed]. Then score them."

THE SCORING PROBLEM, AND WHY U EXISTS

Phase 9 established that of 28 vendors, 15 had UNKNOWN customer evidence and 7
were VENDOR_CLAIM only. This phase widens the grid from 12 assessed capabilities
to 15, across 36 vendors - which is 540 scored cells.

Most vendors publish a feature page. Almost none publish a negative. So the
temptation is to fill every cell with a 0, and that temptation is wrong: a 0
asserts "this vendor does not have it", which is a claim. Absence of evidence
is not evidence of absence.

That mistake is not hypothetical. It is exactly what produced Phase 0's
"exactly zero competitors have an IPR module", which Phase 9 falsified after
finding four dedicated tech-transfer platforms.

So the scale carries a fifth value:

    3  Differentiator  - actively marketed as a distinguishing capability
    2  Native         - full implementation, standard part of the product
    1  Partial        - basic or incomplete implementation
    0  ABSENT         - POSITIVE evidence of absence (recorded in absence_note)
    U  UNKNOWN        - not publicly evidenced. NOT the same as absent.

A 0 REQUIRES an absence_note. validation() enforces this. It is the single
mechanism that keeps this matrix from becoming confident fiction.

Every row also carries EVIDENCE COVERAGE: the share of its 15 cells that are
actually known. Some rows will be sparse. That sparseness is the finding, not
a defect to be papered over with guesses.

WHAT THIS PHASE ADDED TO THE SPEC'S COLUMN LIST

The 27 listed columns do not include TRL, YUKTI-NIR/ARIIA mandate compliance,
or data residency. Those are the three surviving CRITICAL gaps from Phase 9
(0, 3 and 4 holders respectively out of 28). A competitive matrix that omitted
the only open capabilities would misrepresent the competitive position, so two
scored dimensions are added: trl and mandate. Fifteen scored dimensions, in the
spec's order, with those two appended.

MARKET POSITION IS DERIVED, NOT ASSERTED

"Market Position" is the column most likely to drift into opinion, so it is
computed from review count, customer-evidence grade, founding year and breadth
by the formula in market_position(). A vendor cannot talk its way up a tier.

Usage:  python build/data_p10_matrix.py
"""

import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))

import data_p9_competitors as C9   # noqa: E402  (28 vendors, ecosystem, gaps)

SCHEMA_VERSION = "1.0"
BUILD_DATE = "2026-10-19"

USD = 83.5
EUR = 92.0

# ==========================================================================
# The scored dimensions - the spec's 13, plus the 2 the white space requires
# ==========================================================================

DIMENSIONS = [
    ("startup_mgmt", "Startup Management", False, "spec"),
    ("incubation", "Incubation", False, "spec"),
    ("mentorship", "Mentorship", False, "spec"),
    ("ipr", "IPR", False, "spec"),
    ("resource_mgmt", "Resource Management", False, "spec"),
    ("market_intel", "Market Intelligence", False, "spec"),
    ("funding", "Funding", False, "spec"),
    ("investor_match", "Investor Matching", False, "spec"),
    ("corporate_match", "Corporate Matching", False, "spec"),
    ("analytics", "Analytics", False, "spec"),
    ("ai", "AI", False, "spec"),
    ("reporting", "Reporting", False, "spec"),
    ("integrations", "Integrations", False, "spec"),
    ("trl", "TRL", True, "added: surviving CRITICAL gap GAP-02"),
    ("mandate", "YUKTI-NIR / ARIIA", True, "added: surviving CRITICAL gap GAP-03"),
]

DIM_KEYS = [d[0] for d in DIMENSIONS]
SCALE = {
    3: "Differentiator - marketed as a distinguishing capability",
    2: "Native - full implementation",
    1: "Partial - basic or incomplete",
    0: "ABSENT - positive evidence of absence (note required)",
    "U": "UNKNOWN - not publicly evidenced. NOT the same as absent.",
}


# ==========================================================================
# The 8 vendors Phase 10 research added
# ==========================================================================
# Phase 9's set was good-not-exhaustive (its own falsifier C-05 said so).
# These were found while researching the 13 new scoring dimensions.

NEW_VENDORS = [
    dict(name="Protrak (ProrIISe)", vendor="Prorigo Software + IISc",
         category="global", sub="tech_transfer", market="India",
         origin="Bengaluru, India", founded="Not stated",
         pricing="Quote; case study cites ~50% cost saving vs other ELM products",
         price_inr_low=None, price_inr_high=None,
         evidence="NAMED_REFERENCE",
         customers="IPTeL, Indian Institute of Science (Prof. Srinivasan Raghavan, Chair)",
         customers_n=1, reviews=0, threat="HIGH",
         target_customer="Research institutes, universities, law firms, corporates",
         primary_user="IP Cell / TTO officer, faculty inventors, patent attorneys",
         core_problem="IP offices lose deadlines and reconstruct patent state from email",
         customer_size="2,500+ users at one institute; 600+ corporate licence agreements",
         scoring=dict(startup_mgmt=0, incubation=0, mentorship=0, ipr=3,
                      resource_mgmt=0, market_intel=0, funding=1, investor_match=0,
                      corporate_match=1, analytics=2, ai=0, reporting=2,
                      integrations=2, trl=1, mandate=0),
         notes=dict(ipr="Invention disclosure, automated docketing, deadline dashboard, "
                        "attorney invoices, renewal history, royalty tracking, contract "
                        "management, commercialization. Named outcomes: 50% time saved, "
                        "0 missed deadlines, 30% faster contract closure.",
                    integrations="Office 365 integration; IISc Azure cloud hosting.",
                    trl="Readiness levels referenced in sibling product Inpart, not stated here."),
         absence_note="Start-up management, incubation, mentorship, market intelligence, "
                      "investor matching and AI are absent: the published product scope is "
                      "invention disclosure through to royalty, with no programme tooling.",
         differentiator="THE ONLY NAMED INDIAN UNIVERSITY IP DEPLOYMENT IN THE SET",
         weakness="Single reference customer; quote-only; no public pricing",
         url="https://www.protrak.ai/solutions/ip-management",
         confidence="DOCUMENT"),

    dict(name="Inpart", vendor="Inpart", category="global", sub="tech_transfer",
         market="Global", origin="Global (UK/US presence)", founded="Not stated",
         pricing="Quote",
         price_inr_low=None, price_inr_high=None,
         evidence="NAMED_LOGO", customers="250+ TTO partners; 9,000+ member assets; 6,500+ industry members",
         customers_n=250, reviews=0, threat="MEDIUM",
         target_customer="Technology transfer offices, research institutions",
         primary_user="TTO business development, licensing managers",
         core_problem="TTOs manage partnering and licensing in disconnected systems",
         customer_size="250+ TTO partners, 6,500+ industry members",
         scoring=dict(startup_mgmt=0, incubation=1, mentorship=0, ipr=2,
                      resource_mgmt=0, market_intel=2, funding=0, investor_match=1,
                      corporate_match=2, analytics=2, ai=0, reporting=2,
                      integrations=1, trl=2, mandate=0),
         notes=dict(market_intel="Network of 9,000+ assets and 6,500+ industry members - "
                                 "a genuine market map.",
                    trl="Explicitly records technology readiness level on each innovation.",
                    corporate_match="Industry engagement, alliance management, licensing pipeline."),
         absence_note="Mentorship, funding tracking and AI are absent: the published scope "
                      "runs disclosure, assessment, IP protection, industry engagement, "
                      "diligence, negotiation and alliance management.",
         differentiator="Largest disclosed TTO network; TRL is a first-class field",
         weakness="Quote-only; no India-specific deployment named; no programme management",
         url="https://go.inpart.io/hubfs/Product%20features/Inpart%20Deal%20for%20TTOs%20Overview.pdf",
         confidence="PUBLISHED"),

    dict(name="KampusCore (TTO module)", vendor="KampusCore", category="global",
         sub="tech_transfer", market="Global", origin="Not stated", founded="Not stated",
         pricing="Enterprise+ plan (bundled); not separately priced",
         price_inr_low=None, price_inr_high=None,
         evidence="UNKNOWN", customers="", customers_n=0, reviews=0, threat="MEDIUM",
         target_customer="Universities and research institutions",
         primary_user="TTO officer, evaluation board, inventors",
         core_problem="University invention disclosure handled on paper",
         customer_size="Not disclosed",
         scoring=dict(startup_mgmt=0, incubation=0, mentorship=0, ipr=3,
                      resource_mgmt=0, market_intel=0, funding=0, investor_match=0,
                      corporate_match=0, analytics=1, ai=0, reporting=1,
                      integrations=0, trl=0, mandate=0),
         notes=dict(ipr="Disclosure, confidentiality undertaking, evaluation board decisions, "
                        "patentability review, fee/deadline calendar, inventor shares, "
                        "licence agreements, revenue records. Extraordinary candour: no "
                        "patent-office integration and none planned; revenue share is NOT "
                        "computed.",
                    reporting="Append-only access ledger; out-of-scope records return 404."),
         absence_note="Everything outside IP is absent: the published scope is invention "
                      "disclosure through licensing only.",
         differentiator="The most honest IP product found - explicitly refuses to claim "
                        "'patent granted' or compute a revenue split it cannot source",
         weakness="Version 0.1.0, Enterprise+ gated, no customers disclosed",
         url="https://kampuscore.com/en/modules/technology-transfer",
         confidence="VERIFIED_LIVE"),

    dict(name="KSS TechTracS", vendor="Knowledge Sharing Solutions", category="global",
         sub="tech_transfer", market="Global", origin="US", founded="Not stated",
         pricing="Quote",
         price_inr_low=None, price_inr_high=None,
         evidence="UNKNOWN", customers="", customers_n=0, reviews=0, threat="LOW",
         target_customer="TTOs, universities, research organisations, hospitals, corporates",
         primary_user="TTO director, licensing and finance staff",
         core_problem="Innovation supply chain managed across disconnected tools",
         customer_size="Not disclosed; 30+ years implied in enterprise licensing",
         scoring=dict(startup_mgmt=1, incubation=1, mentorship=0, ipr=3,
                      resource_mgmt=0, market_intel=1, funding=2, investor_match=0,
                      corporate_match=1, analytics=2, ai=0, reporting=3,
                      integrations=1, trl=0, mandate=0),
         notes=dict(funding="Royalty distribution, cost sharing, accrual/cash basis, "
                            "patent budgeting - deeper financial tooling than any peer.",
                    reporting="Compliance and reporting named as a first-class module."),
         absence_note="Mentorship, investor matching and AI are absent from the published "
                      "module list (ideation, invention, marketing, grants, disclosure, "
                      "contracts, IP, finance, CRM, compliance).",
         differentiator="Financial management of a TTO - royalty distribution and patent "
                        "budgeting - which nobody else in the set publishes",
         weakness="Quote-only, no customers disclosed, no India presence",
         url="https://www.knowledgesharing.com/overview", confidence="PUBLISHED"),

    dict(name="Startup Science", vendor="Startup Science", category="global",
         sub="accelerator", market="US", origin="US", founded="Not stated",
         pricing="Quote",
         price_inr_low=None, price_inr_high=None,
         evidence="NAMED_LOGO", customers="Leading Cities (referenced customer)",
         customers_n=1, reviews=0, threat="MEDIUM",
         target_customer="Accelerators, incubators, university innovation programmes, sponsors",
         primary_user="Programme director, mentors, founders",
         core_problem="Programme operations spread across spreadsheets, LMS and email",
         customer_size="Not disclosed; cohort-scale programmes",
         scoring=dict(startup_mgmt=2, incubation=2, mentorship=3, ipr=0,
                      resource_mgmt=1, market_intel=1, funding=2, investor_match=3,
                      corporate_match=1, analytics=3, ai=3, reporting=3,
                      integrations=1, trl=0, mandate=0),
         notes=dict(investor_match="Investor directory with warm-intro workflows, thesis/"
                                   "ticket/round filters, capital readiness scoring.",
                    market_intel="Grant discovery with eligibility matching against NSF, SBIR, "
                                 "DOE and NIST programmes.",
                    ai="AI-assisted grant writing from the startup profile; AI matching."),
         absence_note="IPR and TRL are absent: the published scope is programme, curriculum, "
                      "mentorship, grants, perks, analytics and sponsor reporting.",
         differentiator="The deepest grant + investor pipeline in the set, and the only "
                        "one publishing named federal funding programmes",
         weakness="Quote-only; no India presence; no IPR at all",
         url="https://www.startupscience.io/solutions/eso", confidence="VERIFIED_LIVE"),

    dict(name="Crino", vendor="Crino", category="global", sub="accelerator",
         market="Global", origin="Not stated", founded="Not stated",
         pricing="Quote",
         price_inr_low=None, price_inr_high=None,
         evidence="UNKNOWN", customers="", customers_n=0, reviews=0, threat="MEDIUM",
         target_customer="Accelerators and incubators",
         primary_user="Programme manager, founders raising",
         core_problem="Fundraising runs on unfocused investor lists and no deal history",
         customer_size="Not disclosed",
         scoring=dict(startup_mgmt=1, incubation=1, mentorship=0, ipr=0,
                      resource_mgmt=0, market_intel=3, funding=2, investor_match=3,
                      corporate_match=0, analytics=2, ai=3, reporting=1,
                      integrations=1, trl=0, mandate=0),
         notes=dict(market_intel="Deal history, valuation ranges, sector patterns, "
                                 "geographies, co-investors; comparable-startup benchmarking.",
                    investor_match="AI matching on thesis, ticket size, round type and portfolio.",
                    ai="AI-generated personalised outreach recommendations."),
         absence_note="IPR, mentorship, corporate matching and resource management are absent: "
                      "the product is investor intelligence and matching only.",
         differentiator="The only vendor in the set whose product IS market intelligence",
         weakness="Single-purpose; quote-only; no India presence",
         url="https://crino.io/for-accelerators-and-incubators/", confidence="VERIFIED_LIVE"),

    dict(name="Babele", vendor="Babele", category="global", sub="ecosystem",
         market="Global", origin="Not stated", founded="Not stated",
         pricing="Free forever for applications and deal flow; paid tiers for the rest",
         price_inr_low=0, price_inr_high=None,
         evidence="VENDOR_CLAIM", customers="", customers_n=0, reviews=0, threat="HIGH",
         target_customer="Universities, corporates, VC funds, accelerators, networks, competitions",
         primary_user="Programme operator, ecosystem administrator",
         core_problem="Ecosystem operators run programmes across scattered tools",
         customer_size="Free tier unlimited pipeline; explicitly targets universities",
         scoring=dict(startup_mgmt=2, incubation=2, mentorship=2, ipr=0,
                      resource_mgmt=1, market_intel=1, funding=1, investor_match=2,
                      corporate_match=3, analytics=2, ai=2, reporting=2,
                      integrations=2, trl=0, mandate=0),
         notes=dict(corporate_match="Explicit business-unit matching: startups matched to "
                                    "internal teams, challenges and proof-of-concept ownership.",
                    nocost="Free forever for application and deal-flow management, with no "
                           "pipeline limits - the strongest free-tier threat in the set."),
         absence_note="IPR, TRL and mandate compliance are absent: no patent, readiness-level "
                      "or Indian-government functionality is described.",
         differentiator="Free-forever core plus explicit corporate business-unit matching",
         weakness="Quote-gated above the free tier; no customers disclosed; no IPR",
         url="https://babele.co/", confidence="VERIFIED_LIVE"),

    dict(name="Octorank SRM", vendor="Octorank", category="global", sub="ecosystem",
         market="Global", origin="Spain (Octorank is a Barcelona-based innovation platform)",
         founded="Not stated",
         pricing="Manage / Manage+Attract / Custom (quote)",
         price_inr_low=None, price_inr_high=None,
         evidence="UNKNOWN", customers="", customers_n=0, reviews=0, threat="LOW",
         target_customer="Corporates and investors running startup programmes",
         primary_user="Corporate innovation manager, scout, sponsor",
         core_problem="Corporate startup scouting happens in inboxes",
         customer_size="Not disclosed",
         scoring=dict(startup_mgmt=3, incubation=1, mentorship=0, ipr=0,
                      resource_mgmt=0, market_intel=1, funding=1, investor_match=1,
                      corporate_match=3, analytics=2, ai=0, reporting=2,
                      integrations=1, trl=0, mandate=0),
         notes=dict(startup_mgmt="Central searchable database, custom evaluation process, "
                                 "dealflow execution, dashboards by region/industry/age/round.",
                    corporate_match="Scouting, challenges, accelerators and venture funds "
                                    "run as the primary use case."),
         absence_note="IPR, mentorship, resource management and AI are absent from the "
                      "published scope (search, filter, evaluate, report, landing pages, "
                      "application forms).",
         differentiator="Built for the corporate scout rather than the incubator operator",
         weakness="Quote-only; corporate-shaped, not institutional",
         url="https://www.octorank.com/products/startup-relationship-manager",
         confidence="VERIFIED_LIVE"),
]


# ==========================================================================
# Scoring the 28 Phase 9 vendors across the new dimensions
# ==========================================================================
# Phase 9's 12 feature scores are carried forward where they map. The 13 new
# dimensions are scored only where the vendor published something. Everywhere
# else: U. Most of these are U, and that is the truthful answer.

def _u():
    return dict.fromkeys(DIM_KEYS, "U")


# Per-vendor additions on top of the Phase 9 feature set, plus the descriptive
# attributes the 27-column spec requires. Scoring given as dim: value.
EXTEND = {
    "NestLens Orbit": dict(
        target="Incubators, accelerators, TBI programmes",
        user="Programme manager, cohort operator",
        problem="Run incubation intake-to-alumni without a patchwork",
        size="25,000-1,00,000 applications/yr tier; 40 admin seats on Scale",
        add=dict(startup_mgmt=2, incubation=3, mentorship=2, ipr=0, resource_mgmt=1,
                 market_intel=0, funding=3, investor_match=1, corporate_match=1,
                 analytics=2, ai=1, reporting=2, integrations=1, trl=0, mandate=0),
        ai_note="Indian-language MOM transcription via Sarvam - the one genuinely "
                "novel India-specific AI feature found in the set",
        absn="IPR, TRL and Indian mandate compliance are absent from the published scope; "
             "market intelligence is not described.",
    ),
    "EcoSync": dict(
        target="Indian incubators, accelerators, technology business incubators",
        user="Incubation team, approving officer, startup",
        problem="Grants, panels and desk space tracked in three spreadsheets",
        size="Multi-department workspaces; desk rent pricing tiers",
        add=dict(startup_mgmt=2, incubation=3, mentorship=1, ipr=0, resource_mgmt=3,
                 market_intel=0, funding=3, investor_match=2, corporate_match=2,
                 analytics=2, ai=1, reporting=2, integrations=1, trl=0, mandate=0),
        ai_note="Counter-position: refuses AI scoring outright ('two evaluators scoring out "
                "of ten with no shared rubric produce numbers that look comparable and are not')",
        absn="IPR, TRL, market intelligence and Indian mandate compliance are absent from "
             "the published scope.",
    ),
    "Incubatee (SCIP)": dict(
        target="Incubators and accelerators", user="Programme manager",
        problem="Incubator operations", size="Not disclosed",
        add=_u(), ai_note="", absn="No capability is published in enough detail to score; "
                                   "every dimension is UNKNOWN, not absent.",
    ),
    "IncubatX": dict(
        target="Incubators, accelerators, government startup programmes",
        user="Programme administrator", problem="Fragmented ecosystem workflows",
        size="Cohort-based tiers; funding module and media kit",
        add=dict(startup_mgmt=2, incubation=2, mentorship=2, ipr=0, resource_mgmt=0,
                 market_intel=1, funding=2, investor_match=2, corporate_match=1,
                 analytics=2, ai=2, reporting=1, integrations=0, trl=0, mandate=0),
        ai_note="AI evaluation and predictive scoring; fund tracking with fraud detection",
        absn="IPR, TRL, resource management, integrations and Indian mandate compliance "
             "are absent from the published scope.",
    ),
    "Accubate": dict(
        target="Corporates, public sector, multi-site programmes",
        user="Innovation programme manager across sites",
        problem="Measure and launch value across distributed programmes",
        size="Enterprise multi-site is the closest in the set",
        add=dict(startup_mgmt=2, incubation=2, mentorship=2, ipr=0, resource_mgmt=0,
                 market_intel=1, funding=1, investor_match=0, corporate_match=1,
                 analytics=2, ai=1, reporting=2, integrations=1, trl=0, mandate=0),
        ai_note="Scored 2/5 on AI by a competitor",
        absn="IPR, TRL, investor matching, resource management and mandate compliance "
             "are absent.",
    ),
    "Founderhood": dict(
        target="Accelerators and incubators", user="Programme admin, mentors, founders",
        problem="Application and cohort admin without a dedicated tool",
        size="Free to 15 startups/program; Starter 25; Premium 50; Advanced custom",
        add=dict(startup_mgmt=2, incubation=2, mentorship=2, ipr=0, resource_mgmt=0,
                 market_intel=0, funding=0, investor_match=0, corporate_match=0,
                 analytics=1, ai=0, reporting=1, integrations=2, trl=0, mandate=0),
        ai_note="", absn="IPR, funding, investor matching, corporate matching, market "
                         "intelligence, AI and mandate compliance are all absent.",
    ),
    "VentureLink": dict(
        target="Universities, incubators, accelerators, innovation ecosystems",
        user="Programme manager, founder, mentor",
        problem="Operational fragmentation across disconnected tools",
        size="ICUBE (University of Toronto) 300+ applications/yr",
        add=dict(startup_mgmt=3, incubation=3, mentorship=2, ipr=0, resource_mgmt=2,
                 market_intel=1, funding=2, investor_match=1, corporate_match=1,
                 analytics=2, ai=1, reporting=3, integrations=3, trl=0, mandate=0),
        ai_note="Audit log records every score change with actor, value and reason",
        absn="IPR, TRL and Indian mandate compliance are absent from the published scope; "
             "data residency is Canada.",
    ),
    "incuTrack": dict(
        target="Incubators, accelerators, kitchen incubators",
        user="Programme manager", problem="Incubator CRM and space",
        size="Unlimited users; US market orientation",
        add=dict(startup_mgmt=1, incubation=1, mentorship=1, ipr=0, resource_mgmt=2,
                 market_intel=0, funding=0, investor_match=0, corporate_match=0,
                 analytics=1, ai=0, reporting=1, integrations=1, trl=0, mandate=0),
        ai_note="", absn="IPR, funding, investor matching, corporate matching, market "
                         "intelligence, AI and mandate compliance are all absent.",
    ),
    "RiserNest": dict(
        target="Incubators, accelerators, innovation hubs",
        user="Programme manager, founder, mentor",
        problem="Cohort tracking scattered across five tools",
        size="Priced by programme size: 30 / 30-100 / 100+ teams",
        add=dict(startup_mgmt=2, incubation=3, mentorship=2, ipr=0, resource_mgmt=0,
                 market_intel=0, funding=0, investor_match=0, corporate_match=0,
                 analytics=1, ai=1, reporting=1, integrations=0, trl=0, mandate=0),
        ai_note="Built-in AI over the programme knowledge base",
        absn="IPR, funding, investor matching, corporate matching, market intelligence, "
             "integrations and mandate compliance are all absent.",
    ),
    "Gohorto": dict(
        target="Incubators, accelerators, university hubs",
        user="Programme manager", problem="Running incubator, accelerator, hackathon, "
        "courses and grants in parallel",
        size="Flat annual, no seat limit published",
        add=dict(startup_mgmt=2, incubation=3, mentorship=2, ipr=0, resource_mgmt=1,
                 market_intel=0, funding=1, investor_match=1, corporate_match=1,
                 analytics=2, ai=1, reporting=2, integrations=0, trl=0, mandate=0),
        ai_note="AI mentor matching",
        absn="IPR, funding ledger detail, investor matching at scale, integrations and "
             "mandate compliance are absent.",
    ),
    "Univation (Incubators Platform)": dict(
        target="Universities and nonprofits", user="Programme administrator",
        problem="Running incubator programmes", size="Free tier up to 15 startups/program",
        add=dict(startup_mgmt=2, incubation=2, mentorship=1, ipr=0, resource_mgmt=0,
                 market_intel=0, funding=0, investor_match=0, corporate_match=0,
                 analytics=1, ai=0, reporting=1, integrations=0, trl=0, mandate=0),
        ai_note="", absn="IPR, funding, investor matching, corporate matching, resource "
                         "management, AI, integrations and mandate compliance are all absent.",
    ),
    "Innoloft / LoftOS": dict(
        target="Universities, incubators, innovation centres",
        user="University IT team (the DIY threat)",
        problem="Needing a portal and not buying one",
        size="DIY scale",
        add=dict(startup_mgmt=1, incubation=1, mentorship=1, ipr=0, resource_mgmt=1,
                 market_intel=0, funding=0, investor_match=0, corporate_match=0,
                 analytics=0, ai=0, reporting=0, integrations=1, trl=0, mandate=0),
        ai_note="", absn="IPR, funding, investor matching, corporate matching, market "
                         "intelligence, analytics, reporting, AI and mandate compliance "
                         "are absent - it is a no-code builder, not a domain product.",
    ),
    "AcceleratorApp": dict(
        target="Accelerators and venture funds", user="Programme manager",
        problem="Application intake through graduation and first round",
        size="Yale, MIT Design X, Max Planck; no Indian institution",
        add=dict(startup_mgmt=2, incubation=3, mentorship=1, ipr=0, resource_mgmt=0,
                 market_intel=0, funding=3, investor_match=2, corporate_match=1,
                 analytics=2, ai=1, reporting=2, integrations=1, trl=0, mandate=0),
        ai_note="", absn="IPR, TRL, resource management, market intelligence and mandate "
                         "compliance are absent.",
    ),
    "IdeaScale": dict(
        target="Enterprises, government agencies, academia",
        user="Innovation programme manager", problem="Crowdsourced idea management",
        size="4.5M participants, 3.6M campaigns claimed",
        add=dict(startup_mgmt=1, incubation=1, mentorship=1, ipr=0, resource_mgmt=0,
                 market_intel=2, funding=0, investor_match=1, corporate_match=1,
                 analytics=2, ai=2, reporting=2, integrations=2, trl=0, mandate=0),
        ai_note="AI assistance in ideation and analysis",
        absn="IPR, funding, resource management, TRL and mandate compliance are absent.",
    ),
    "Envisio": dict(
        target="Public sector, non-profits, education",
        user="Strategic planning officer", problem="Public strategic plan and performance reporting",
        size="Unlimited user licences; smallest observed municipality",
        add=dict(startup_mgmt=0, incubation=0, mentorship=0, ipr=0, resource_mgmt=0,
                 market_intel=1, funding=0, investor_match=0, corporate_match=0,
                 analytics=2, ai=0, reporting=3, integrations=1, trl=0, mandate=0),
        ai_note="", absn="Everything outside public strategic planning and performance "
                         "reporting is absent; it is not a startup platform.",
    ),
    "Throttle": dict(
        target="Corporate innovation and incubator programmes (Japan)",
        user="Innovation manager", problem="Managing ideas and incubation programmes",
        size="1,350 companies claimed",
        add=dict(startup_mgmt=1, incubation=2, mentorship=1, ipr=0, resource_mgmt=0,
                 market_intel=1, funding=0, investor_match=0, corporate_match=1,
                 analytics=1, ai=0, reporting=1, integrations=1, trl=0, mandate=0),
        ai_note="", absn="IPR, funding, investor matching, AI and mandate compliance are absent.",
    ),
    "Wazoku": dict(
        target="Large enterprises and R&D institutions",
        user="Innovation portfolio owner", problem="Fragmented innovation portfolio",
        size="Unlimited end users; 1M-member Innocentive network",
        add=dict(startup_mgmt=1, incubation=1, mentorship=1, ipr=0, resource_mgmt=0,
                 market_intel=3, funding=0, investor_match=1, corporate_match=2,
                 analytics=3, ai=2, reporting=3, integrations=1, trl=0, mandate=0),
        ai_note="Jen agentic innovation assistant",
        absn="IPR, funding and mandate compliance are absent; scoped to corporate R&D, "
             "not institutional mandates.",
    ),
    "Incu (Sweden)": dict(
        target="Innovation programmes", user="Programme manager", problem="Idea management",
        size="Not disclosed",
        add=dict(startup_mgmt=1, incubation=1, mentorship=1, ipr=1, resource_mgmt=0,
                 market_intel=1, funding=0, investor_match=0, corporate_match=0,
                 analytics=1, ai=0, reporting=1, integrations=1, trl=1, mandate=0),
        ai_note="", absn="IPR is partial - a patent DATA FIELD, not a workflow. Funding, "
                         "investor matching, AI and mandate compliance are absent.",
    ),
    "Dealum": dict(
        target="Accelerators and venture funds", user="Programme manager, investor",
        problem="Application to graduation to first round",
        size="50-100 deal room members by tier",
        add=dict(startup_mgmt=2, incubation=3, mentorship=1, ipr=0, resource_mgmt=0,
                 market_intel=1, funding=2, investor_match=1, corporate_match=1,
                 analytics=2, ai=2, reporting=2, integrations=2, trl=0, mandate=0),
        ai_note="1,000 weekly AI assistant credits per tier",
        absn="IPR, resource management, investor matching at scale and mandate compliance "
             "are absent.",
    ),
    "FIKR": dict(
        target="Accelerators, hubs, development organisations",
        user="Programme manager", problem="Running 8 disconnected tools",
        size="Free to 10 startups; Growth 25; Scale 100",
        add=dict(startup_mgmt=2, incubation=2, mentorship=3, ipr=0, resource_mgmt=0,
                 market_intel=1, funding=0, investor_match=1, corporate_match=1,
                 analytics=2, ai=3, reporting=2, integrations=1, trl=0, mandate=0),
        ai_note="10-pillar AI pitch scoring; AI-assisted deal-flow filtering",
        absn="IPR, funding ledger, resource management and mandate compliance are absent.",
    ),
    "FosiaHub": dict(
        target="Tech hubs, accelerators, development agencies, foundations",
        user="Programme manager, donor officer", problem="Cohorts run on Excel and WhatsApp",
        size="Hub 50 startups; Accelerator unlimited",
        add=dict(startup_mgmt=2, incubation=2, mentorship=1, ipr=0, resource_mgmt=0,
                 market_intel=1, funding=1, investor_match=1, corporate_match=1,
                 analytics=2, ai=3, reporting=3, integrations=1, trl=0, mandate=0),
        ai_note="15-dimension AI scoring on every application",
        absn="IPR, resource management and mandate compliance are absent.",
    ),
    "European Startup Hub": dict(
        target="Universities, accelerators, cities, government agencies",
        user="Institution innovation lead", problem="Operating a university hub or regional network",
        size="Single cohort to multi-country network",
        add=dict(startup_mgmt=2, incubation=3, mentorship=2, ipr=0, resource_mgmt=0,
                 market_intel=1, funding=1, investor_match=1, corporate_match=1,
                 analytics=2, ai=0, reporting=2, integrations=1, trl=0, mandate=0),
        ai_note="", absn="IPR, resource management, AI and mandate compliance are absent.",
    ),
    "Catalyzer": dict(
        target="US accelerators, incubators and economic development",
        user="Programme manager", problem="Cohort and funder reporting",
        size="Free version; paid on request",
        add=dict(startup_mgmt=2, incubation=2, mentorship=2, ipr=0, resource_mgmt=0,
                 market_intel=0, funding=0, investor_match=0, corporate_match=0,
                 analytics=2, ai=0, reporting=3, integrations=1, trl=0, mandate=0),
        ai_note="", absn="IPR, funding, investor matching, corporate matching, market "
                         "intelligence, AI and mandate compliance are all absent.",
    ),
    "Wellspring for Tech Transfer": dict(
        target="Universities, research institutions, hospitals",
        user="TTO officer", problem="Invention to licence to spin-out",
        size="Not disclosed",
        add=dict(startup_mgmt=0, incubation=0, mentorship=0, ipr=3, resource_mgmt=0,
                 market_intel=1, funding=0, investor_match=0, corporate_match=0,
                 analytics=1, ai=0, reporting=2, integrations=1, trl=1, mandate=0),
        ai_note="", absn="Startup management, incubation, mentorship, funding, investor "
                         "matching, AI and mandate compliance are absent - it is a "
                         "technology-transfer system only.",
    ),
    "Helikon Labs": dict(
        target="Universities, research offices, research institutes",
        user="Research partnerships lead, TTO business development",
        problem="The 18 months before any system of record sees the work",
        size="5-25 seats Team; Institutional from 25 seats",
        add=dict(startup_mgmt=0, incubation=0, mentorship=0, ipr=2, resource_mgmt=0,
                 market_intel=2, funding=0, investor_match=0, corporate_match=1,
                 analytics=2, ai=0, reporting=2, integrations=1, trl=0, mandate=0),
        ai_note="", absn="Startup management, incubation, mentorship, funding, investor "
                         "matching, AI and mandate compliance are absent.",
    ),
    "Commercify": dict(
        target="Technology transfer offices, university VC arms, corporate R&D",
        user="TTO director, commercialisation lead",
        problem="Turning research into licensable spin-outs",
        size="6 design partner slots; 8-20 named users",
        add=dict(startup_mgmt=1, incubation=1, mentorship=0, ipr=3, resource_mgmt=0,
                 market_intel=3, funding=1, investor_match=1, corporate_match=1,
                 analytics=2, ai=0, reporting=2, integrations=1, trl=1, mandate=0),
        ai_note="", absn="Mentorship, resource management, AI and mandate compliance are absent.",
    ),
    "SINT.OTRI": dict(
        target="Spanish universities", user="OTRI / TTO officer",
        problem="Lost patents and forgotten art.83 contracts",
        size="Unlimited institutional users",
        add=dict(startup_mgmt=0, incubation=0, mentorship=0, ipr=3, resource_mgmt=0,
                 market_intel=0, funding=0, investor_match=0, corporate_match=0,
                 analytics=1, ai=0, reporting=2, integrations=1, trl=0, mandate=0),
        ai_note="", absn="Everything outside the Spanish university patent and art.83 "
                         "contract workflow is absent.",
    ),
    "Elsevier Pure": dict(
        target="Universities and research institutions",
        user="Research office", problem="Research outputs, funding and affiliations",
        size="Institutional licence, unlimited users",
        add=dict(startup_mgmt=0, incubation=0, mentorship=0, ipr=1, resource_mgmt=0,
                 market_intel=3, funding=1, investor_match=0, corporate_match=0,
                 analytics=3, ai=1, reporting=3, integrations=2, trl=0, mandate=0),
        ai_note="", absn="Startup management, incubation, mentorship, investor matching "
                         "and mandate compliance are absent - it manages research, not ventures.",
    ),
}


# ==========================================================================
# Absence basis - how strong is the evidence behind each vendor's zero-scores?
# ==========================================================================
# COMPLETE : the vendor publishes a full feature table or comparison grid. A
#            dimension missing from it is strong evidence of absence.
# PARTIAL  : the vendor publishes marketing prose only. A dimension it does not
#            mention may simply be undocumented rather than absent.
#
# This distinction is the difference between "they do not have it" and "they
# have not written it down", and the matrix refuses to conflate them.

COMPLETE_FEATURE_LIST = {
    "NestLens Orbit", "EcoSync", "IncubatX", "Founderhood", "VentureLink",
    "incuTrack", "RiserNest", "Gohorto", "Univation (Incubators Platform)",
    "AcceleratorApp", "Dealum", "FIKR", "FosiaHub", "European Startup Hub",
    "Catalyzer", "Helikon Labs", "Commercify", "SINT.OTRI", "Protrak (ProrIISe)",
    "KampusCore (TTO module)", "KSS TechTracS", "Babele", "Octorank SRM",
    "Startup Science", "Crino", "Inpart",
}


# ==========================================================================
# assembly
# ==========================================================================

def build_rows():
    """Merge Phase 9's 28 vendors with the 8 new ones, scored on 15 dimensions."""
    rows = []
    for c in C9.COMPETITORS:
        e = EXTEND.get(c["name"])
        if e is None:
            # No extension recorded means we did not research the new dimensions
            # for this vendor. Every new dimension is therefore UNKNOWN, not 0.
            scoring = _u()
            meta = dict(target="", user="", problem="", size="", ai_note="",
                        absn="Not researched in Phase 10; every dimension is UNKNOWN.")
        else:
            scoring = dict(e["add"])
            for k in DIM_KEYS:
                scoring.setdefault(k, "U")
            meta = e

        absence_note = meta.get("absn", "")
        rows.append(dict(
            competitor=c["name"], vendor=c["vendor"], country=c["market"],
            origin=c["origin"], target_customer=meta.get("target", ""),
            primary_user=meta.get("user", ""), core_problem=meta.get("problem", ""),
            pricing=c["pricing"],
            free_paid=("Free tier" if c["features"].get("nocost") else "Paid only"),
            customer_size=meta.get("size", ""),
            strength=c["differentiator"], weakness=c["weakness"],
            user_reviews=c["reviews"],
            market_position="",  # derived below
            source=c["url"], last_updated=C9.RETRIEVED,
            evidence_grade=c["evidence"], customers=c["customers"] or "",
            customers_n=c["customers_n"], threat=c["threat"],
            confidence=c["confidence"], category=c["category"], subcategory=c["sub"] or "",
            founded=c["founded"],
            phase9="yes", phase10="extension",
            absence_note=absence_note, ai_note=meta.get("ai_note", ""),
            **{k: scoring[k] for k in DIM_KEYS},
        ))

    for v in NEW_VENDORS:
        scoring = dict(v["scoring"])
        for k in DIM_KEYS:
            scoring.setdefault(k, "U")
        rows.append(dict(
            competitor=v["name"], vendor=v["vendor"], country=v["market"],
            origin=v["origin"], target_customer=v["target_customer"],
            primary_user=v["primary_user"], core_problem=v["core_problem"],
            pricing=v["pricing"],
            free_paid=("Free tier" if (v["price_inr_low"] == 0) else "Paid only"),
            customer_size=v["customer_size"],
            strength=v["differentiator"], weakness=v["weakness"],
            user_reviews=v["reviews"], market_position="",
            source=v["url"], last_updated=C9.RETRIEVED,
            evidence_grade=v["evidence"], customers=v["customers"] or "",
            customers_n=v["customers_n"], threat=v["threat"],
            confidence=v["confidence"], category=v["category"],
            subcategory=v["sub"] or "", founded=v["founded"],
            phase9="no", phase10="new in Phase 10",
            absence_note=v["absence_note"], ai_note=v["notes"].get("ai_note", ""),
            **{k: scoring[k] for k in DIM_KEYS},
        ))

    for r in rows:
        r["market_position"] = market_position(r)
        r["evidence_coverage"] = evidence_coverage(r)
        r["absence_basis"] = absence_basis(r)
    return rows


def evidence_coverage(row):
    """Share of the 15 scored cells that are actually known (not U)."""
    known = sum(1 for k in DIM_KEYS if row[k] != "U")
    return round(known / len(DIM_KEYS) * 100, 1)


def breadth(row):
    """Capability breadth = count of dimensions scoring 1 or more."""
    return sum(1 for k in DIM_KEYS if row[k] != "U" and row[k] >= 1)


def depth_score(row):
    """Weighted capability depth across known cells only."""
    vals = [row[k] for k in DIM_KEYS if row[k] != "U"]
    return round(sum(vals) / len(vals), 2) if vals else 0.0


def market_position(row):
    """DERIVED, not asserted. Documented formula so it cannot drift into opinion.

    An earlier version of this rubric awarded ESTABLISHED on breadth alone.
    That was circular - breadth is derived from this matrix's own scores, so it
    would rate a well-scoring vendor as established regardless of whether anyone
    outside the company has ever used it. PROVEN now REQUIRES external
    evidence: a real review base or a named institutional logo.

        VERIFIED    reviews >= 20 AND a named institutional reference
        PROVEN      reviews >= 10, OR a named institutional LOGO
        PARTIAL     breadth >= 6 AND at least one named customer
        UNPROVEN    everything else - no third-party proof of any kind - no third-party proof of any kind
    """
    reviews = row["user_reviews"] or 0
    grade = row["evidence_grade"]
    named = (row["customers_n"] or 0) > 0
    inst_ref = grade == "NAMED_REFERENCE"
    inst_logo = grade == "NAMED_LOGO"
    breadth_n = breadth(row)

    if reviews >= 20 and inst_ref:
        return "VERIFIED"
    if reviews >= 10 or inst_logo:
        return "PROVEN"
    if breadth_n >= 6 and named:
        return "PARTIAL"
    return "UNPROVEN"


def absence_basis(row):
    """How strong is the evidence behind this vendor's zero-scores?

    COMPLETE - the vendor publishes a full feature list; a dimension absent from
                it is strong evidence of absence.
    PARTIAL  - the vendor publishes marketing copy, not a feature list; a
                dimension it does not mention may simply be undocumented.
    NONE    - no zero-scores to qualify.
    """
    zeros = [k for k in DIM_KEYS if row[k] == 0]
    if not zeros:
        return "NONE"
    return row.get("_scope_basis") or (
        "COMPLETE" if row["competitor"] in COMPLETE_FEATURE_LIST else "PARTIAL")


def dimension_coverage(rows):
    out = []
    for k, label, added, _ in DIMENSIONS:
        vals = [r[k] for r in rows]
        known = [v for v in vals if v != "U"]
        out.append(dict(
            key=k, label=label, added_by_phase10=added,
            n_known=len(known), n_unknown=len(vals) - len(known), n_total=len(vals),
            n_partial=sum(1 for v in known if v == 1),
            n_native=sum(1 for v in known if v == 2),
            n_differentiator=sum(1 for v in known if v == 3),
            n_absent=sum(1 for v in known if v == 0),
            pct_implemented=round(len(known) / len(vals) * 100, 1),
            pct_of_known_native_or_better=(
                round((len(known) - sum(1 for v in known if v == 1)) / len(known) * 100, 1)
                if known else 0.0),
        ))
    return out


# ==========================================================================
# GAP-13 correction carried forward
# ==========================================================================

GAP13_UPDATE = dict(
    gap_id="GAP-13",
    title="A verifiable Indian reference institution",
    phase9_wording=("No competitor demonstrates a LARGE INDIAN UNIVERSITY deployment with "
                    "named referees and third-party verification."),
    phase10_finding=(
        "FURTHER NARROWED. Protrak (ProrIISe), built jointly by IISc Bengaluru and Prorigo "
        "Software, is a NAMED INDIAN UNIVERSITY deployment with hard, vendor-published "
        "metrics: in production 6+ years, 2,500+ internal and external users, 600+ corporate "
        "licence agreements, ~200 patents filed per year, 50% IP-office time saved, 0 missed "
        "deadlines, 30% faster contract closure, ~50% cost saving versus other ELM products."),
    surviving_claim=(
        "A named Indian university reference now exists for IP MANAGEMENT (Protrak/IPTeL, IISc). "
        "No named Indian university reference exists for INCUBATION or PROGRAMME software - "
        "the category StartupHub actually competes in. That distinction is the whole finding: "
        "the institutional reference gap is segment-specific, not universal."),
    affected="GAP-01 (strengthened), GAP-13 (narrowed again)",
)

# ==========================================================================
# validation
# ==========================================================================

def validation():
    errs, warns = [], []
    rows = build_rows()

    # a 0 REQUIRES positive evidence of absence. This is the guard that stops
    # the matrix becoming confident fiction.
    for r in rows:
        zeros = [k for k in DIM_KEYS if r[k] == 0]
        if zeros and len(r["absence_note"]) < 40:
            errs.append(f"{r['competitor']} scores 0 on {len(zeros)} dimension(s) "
                        f"({', '.join(zeros[:3])}) but has no substantive absence_note")
        for k in DIM_KEYS:
            if r[k] not in (0, 1, 2, 3, "U"):
                errs.append(f"{r['competitor']} has invalid score {r[k]!r} on {k}")
        for f in ("competitor", "country", "pricing", "source", "last_updated",
                  "market_position", "evidence_grade"):
            if not r.get(f):
                errs.append(f"{r['competitor']} missing {f}")

    # An evidence grade of NAMED_REFERENCE or NAMED_LOGO is a claim that a
    # specific organisation exists. "Universities and research institutions
    # worldwide" is not a logo, and grading it as one would let a generic
    # marketing sentence promote a vendor to PROVEN on nothing.
    for r in rows:
        if r["evidence_grade"] in ("NAMED_REFERENCE", "NAMED_LOGO") and \
                (r["customers_n"] or 0) < 1:
            errs.append(f"{r['competitor']} is graded {r['evidence_grade']} but has "
                        f"{r['customers_n']} named customers - the grade is unsupported")
        if r["market_position"] in ("VERIFIED", "PROVEN"):
            if (r["user_reviews"] or 0) == 0 and (r["customers_n"] or 0) == 0:
                errs.append(f"{r['competitor']} rates {r['market_position']} with no "
                            f"third-party proof at all")

    # the two added dimensions must be present and justified
    added = [d for d in DIMENSIONS if d[2]]
    if len(added) != 2:
        errs.append(f"{len(added)} dimensions marked as Phase-10 additions; expected 2")
    for k, label, is_added, why in added:
        if not why:
            errs.append(f"added dimension '{label}' has no justification recorded")

    # every spec column must be present on every row
    required = ["competitor", "country", "target_customer", "primary_user",
                "core_problem", "pricing", "free_paid", "customer_size", "strength",
                "weakness", "user_reviews", "market_position", "source", "last_updated"]
    for f in required:
        if f not in rows[0]:
            errs.append(f"spec column '{f}' is absent from the row schema")
    missing = [d[0] for d in DIMENSIONS if d[0] not in rows[0]]
    if missing:
        errs.append(f"scored dimensions missing from row schema: {missing}")

    # market position must be derived, and must not be empty
    valid_pos = {"VERIFIED", "PROVEN", "PARTIAL", "UNPROVEN"}
    for r in rows:
        if r["market_position"] not in valid_pos:
            errs.append(f"{r['competitor']} has invalid market position "
                        f"'{r['market_position']}'")

    # the falsification record must survive
    if "Protrak" not in GAP13_UPDATE["phase10_finding"]:
        errs.append("the GAP-13 Phase 10 correction has lost its Protrak finding")

    # honesty phrasing
    blob = str(rows) + str(GAP13_UPDATE)
    for bad in ("customers told us", "competitors said", "interviews show", "studies prove"):
        if bad in blob.lower():
            errs.append(f"fabricated-research phrasing: '{bad}'")

    # sparsity is expected - warn, do not fail
    low = [r["competitor"] for r in rows if r["evidence_coverage"] < 40]
    if low:
        warns.append(f"{len(low)} vendors have under 40% evidence coverage: {', '.join(low)}")

    return errs, warns


def summary():
    rows = build_rows()
    cov = dimension_coverage(rows)
    return dict(
        schema_version=SCHEMA_VERSION, build_date=BUILD_DATE,
        vendors=len(rows),
        new_in_phase10=len([r for r in rows if r["phase9"] == "no"]),
        scored_dimensions=len(DIMENSIONS),
        added_dimensions=2,
        spec_columns=27,
        total_columns=len(rows[0]),
        scored_cells=len(rows) * len(DIMENSIONS),
        unknown_cells=sum(1 for r in rows for k in DIM_KEYS if r[k] == "U"),
        absent_cells=sum(1 for r in rows for k in DIM_KEYS if r[k] == 0),
        mean_evidence_coverage=round(
            sum(r["evidence_coverage"] for r in rows) / len(rows), 1),
        coverage_lt_40pct=len([r for r in rows if r["evidence_coverage"] < 40]),
        positions={p: len([r for r in rows if r["market_position"] == p])
                   for p in ("VERIFIED", "PROVEN", "PARTIAL", "UNPROVEN")},
        lowest_coverage=sorted(cov, key=lambda c: c["n_known"])[:4],
        interviews_conducted=0,
    )


def _p(s=""):
    try:
        print(s)
    except UnicodeEncodeError:
        print(s.encode("ascii", "replace").decode("ascii"))


if __name__ == "__main__":
    import json
    _p(json.dumps(summary(), indent=2, ensure_ascii=False))
    rows = build_rows()
    _p("\nEVIDENCE COVERAGE (share of 15 scored cells actually known)")
    for r in sorted(rows, key=lambda r: -r["evidence_coverage"])[:6]:
        _p(f"   {r['competitor'][:26]:<28} {r['evidence_coverage']:>5.1f}%   "
           f"breadth {breadth(r):>2}  {r['market_position']}")
    _p("   ...")
    for r in sorted(rows, key=lambda r: r["evidence_coverage"])[:4]:
        _p(f"   {r['competitor'][:26]:<28} {r['evidence_coverage']:>5.1f}%   "
           f"breadth {breadth(r):>2}  {r['market_position']}")
    _p("\nDIMENSION COVERAGE (U = unknown, NOT absent)")
    for c in sorted(dimension_coverage(rows), key=lambda c: c["n_known"]):
        tag = "  <- added by Phase 10" if c["added_by_phase10"] else ""
        _p(f"   {c['label']:<26} known {c['n_known']:>2}/{c['n_total']}  "
           f"U {c['n_unknown']:>2}  absent {c['n_absent']:>2}  native+ {c['n_native']:>2}{tag}")
    _p()
    e, w = validation()
    _p(f"errors: {e or 'none'}")
    _p(f"warns : {len(w)} (sparsity is a finding, not a defect)")
    for x in w:
        _p(f"   - {x}")