#!/usr/bin/env python3
"""StartupHub Phase 9 - Competitor Research.

    "This is where I would spend a lot of effort. Because StartupHub already
     overlaps with existing ecosystem platforms."

THIS PHASE REPLACES 04_Competitor_DeepDive, WHICH WAS PHASE 0 WORK.

Three Phase 0 claims did not survive verification. They are corrected here
rather than quietly dropped, because a competitor study whose errors are hidden
is worth less than no study at all:

  FALSIFIED - "No competitor can prove a large Indian institution runs on
               their software."
               EcoSync names TBI-KIET (KIET Group of Institutions);
               VentureLink publishes a named testimonial from ICUBE at the
               University of Toronto; Accubate names NSRCOM and NASSCOM.

  FALSIFIED - "exactly zero competitors have an IPR module"
               Wellspring for Tech Transfer, Helikon Labs, Commercify and
               SINT.OTRI all implement patent, disclosure, licence and spin-out
               workflow. What survives is narrower and stronger: none of them is
               JOINED TO INCUBATION PROGRAMME MANAGEMENT.

  IMPRECISE - "RiserNest - Europe (unverified)", "VentureLink - not found",
               "EcoSync - login-gated, unverified".
               All three are real and substantial. RiserNest is Rotterdam, 2024.
               VentureLink was founded inside a University of Toronto incubator
               and publishes a named university customer.

GAP-02 (TRL) and GAP-03 (YUKTI-NIR workflow) were NOT touched by this research
and stand exactly as recorded. That distinction is preserved in the dataset.

A NOTE ON EVIDENCE GRADING

Named customers are graded, not treated as equivalent:

  NAMED_REFERENCE   a named person, role and organisation, quoted
  NAMED_LOGO        an organisation named by the vendor, unreferenced
  VENDOR_CLAIM      asserted by the vendor with no supporting detail
  UNKNOWN           no evidence either way

A VENDOR_CLAIM is not evidence of a deployment. Most of this category is
VENDOR_CLAIM or worse, and pretending otherwise is how a competitive analysis
turns into marketing copy.

Usage:  python build/data_p9_competitors.py
"""

import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))

import data_p8_pricing as P        # noqa: E402  (FX, Indian price envelope)

SCHEMA_VERSION = "1.0"
BUILD_DATE = "2026-10-19"
RETRIEVED = "2026-10-19"

USD = P.FX["usd_inr"]
EUR = P.FX["eur_inr"]

# ---------------------------------------------------------------------------
# taxonomy - the four categories the spec names, plus one the research forced
# ---------------------------------------------------------------------------

CATEGORIES = {
    "direct": dict(
        label="Direct competitors",
        spec="Platforms that manage incubation, innovation, startup programs, institutional ecosystems",
    ),
    "ecosystem": dict(
        label="Ecosystem competitors",
        spec="Startup India, BHASKAR, state portals, IIC systems, incubator-specific platforms",
    ),
    "indirect": dict(
        label="Indirect competitors",
        spec="Excel, Sheets, Notion, Airtable, CRM, project management, campus ERP",
    ),
    "global": dict(
        label="Global competitors",
        spec="Innovation, incubator, accelerator and startup ecosystem platforms",
    ),
}

# The spec's four global sub-categories, plus tech transfer - which the
# verification research forced into existence by falsifying GAP-01.
GLOBAL_SUBCATEGORIES = {
    "innovation": "Innovation management platforms",
    "incubator": "Incubator management platforms",
    "accelerator": "Accelerator management platforms",
    "ecosystem": "Startup ecosystem platforms",
    "tech_transfer": "Tech transfer / IP management platforms (added by Phase 9)",
}

EVIDENCE_GRADES = ["NAMED_REFERENCE", "NAMED_LOGO", "VENDOR_CLAIM", "UNKNOWN", "NOT_APPLICABLE"]

# feature axes used for the coverage matrix. Chosen to test the surviving gaps.
FEATURES = [
    ("intake", "Application intake"),
    ("evaluation", "Scored panel evaluation"),
    ("cohort", "Cohort / programme management"),
    ("mentor", "Mentor matching & logging"),
    ("funding", "Grant tranche tracking"),
    ("ipr", "IPR / patent workflow"),
    ("trl", "TRL as a modelled object"),
    ("mandate", "YUKTI-NIR / ARIIA export"),
    ("faculty", "Faculty / innovator entity"),
    ("multisite", "Multi-campus / sub-tenancy"),
    ("datares", "Indian data residency"),
    ("nocost", "Free tier for institutions"),
]

# 2 = native, 1 = partial/basic, 0 = absent, None = not assessed
def F(**kw):
    return kw


# ==========================================================================
# THE COMPETITOR SET
# ==========================================================================
# every row: url + confidence + evidence grade. No exceptions.

COMPETITORS = [
    # ---------------------------------------------------------------- DIRECT: India
    dict(name="NestLens Orbit", vendor="LabelNest India Pvt Ltd", category="direct",
         sub=None, market="India", origin="Bengaluru, India", founded="2025",
         pricing="₹75,000 / ₹99,000 / ₹1,25,000 / ₹2,50,000 per year (Orbit Launch/Starter/Growth/Scale); Orbit PM ₹2,499/mo; Orbit OS ₹29,999/mo",
         price_inr_low=29_988, price_inr_high=359_988,
         evidence="UNKNOWN", customers="", customers_n=0,
         reviews=0, threat="HIGH",
         scope="incubation OS: intake, screening, evaluation, cohorts, mentors, MOM transcription, grant ledger, compliance calendar",
         differentiator="Indian-language MOM transcription (Sarvam); NIDHI/DST-TBI/BIRAC/RKVY ledgers",
         weakness="No verifiable Indian customer; zero third-party reviews; internal pricing conflict",
         url="https://labelnest.in/nestlens/orbit", confidence="VERIFIED_LIVE",
         features=F(intake=2, evaluation=2, cohort=2, mentor=2, funding=2, ipr=0, trl=0,
                    mandate=0, faculty=0, multisite=1, datares=1, nocost=0)),

    dict(name="EcoSync", vendor="Opernova Technologies LLP", category="direct",
         sub=None, market="India", origin="India (registered LLP)", founded="Not disclosed",
         pricing="Login-gated; plans configured per deployment, monthly/weekly/yearly",
         price_inr_low=None, price_inr_high=None,
         evidence="VENDOR_CLAIM", customers="TBI-KIET (KIET Group of Institutions)",
         customers_n=1, reviews=0, threat="HIGH",
         scope="incubator CRM+ERP: programs, applications, weighted panel evaluation, office space, funding source-to-tranche, task boards",
         differentiator="India-first rails (INR/GST/TDS/UPI/IST); funding over-allocation blocked at entry; 12-status audit trail",
         weakness="VENDOR_CLAIM only - no third-party verification; no SOC 2 / ISO 27001 (self-disclosed); first customer is also the reference",
         url="https://www.ecosync.co/", confidence="VERIFIED_LIVE",
         features=F(intake=2, evaluation=2, cohort=2, mentor=1, funding=2, ipr=0, trl=0,
                    mandate=0, faculty=0, multisite=1, datares=2, nocost=0)),

    dict(name="Incubatee (SCIP)", vendor="SCIP, Bhopal", category="direct",
         sub=None, market="India", origin="Bhopal, India", founded="2019",
         pricing="Platform subscription ₹3,00,000/year (₹25,000/month)",
         price_inr_low=300_000, price_inr_high=300_000,
         evidence="UNKNOWN", customers="", customers_n=0, reviews=0, threat="MEDIUM",
         scope="incubator platform; part of the scip.co group",
         differentiator="Mentors and startups reportedly unbilled - the right pricing shape (GAP-12)",
         weakness="Zero reviews; zero verifiable customers; no public feature detail",
         url="https://www.incubatee.com/company", confidence="PUBLISHED",
         features=F(intake=1, evaluation=1, cohort=2, mentor=1, funding=1, ipr=0, trl=0,
                    mandate=0, faculty=0, multisite=0, datares=1, nocost=0)),

    dict(name="IncubatX", product_note="", vendor="IncubatX", category="direct",
         sub=None, market="India", origin="India", founded="2026",
         pricing="Foundation ₹10,000–15,000/mo · Accelerator ₹30,000–40,000/mo · Executive AI ₹50,000–60,000/mo · Media Kit add-on ₹15,000/mo",
         price_inr_low=120_000, price_inr_high=720_000,
         evidence="UNKNOWN", customers="", customers_n=0, reviews=0, threat="HIGH",
         scope="incubator/accelerator OS: cohorts, funding, CSR, matchmaking, impact dashboard",
         differentiator="Published INR price list; top of the observed Indian envelope",
         weakness="Founded 2026, no track record; claims 240+ schemes but matches on sector/stage, not TRL; zero customers",
         url="https://incubatx.com/", confidence="VERIFIED_LIVE",
         features=F(intake=1, evaluation=1, cohort=2, mentor=2, funding=2, ipr=0, trl=0,
                    mandate=0, faculty=0, multisite=0, datares=1, nocost=0)),

    dict(name="Accubate", vendor="Cunomial", category="direct",
         sub="incubator", market="India", origin="India", founded="Not disclosed",
         pricing="$149/user/month (aggregator); own site publishable-only",
         price_inr_low=12_441, price_inr_high=12_441,
         evidence="NAMED_LOGO", customers="NSRCEL, NASSCOM, TCS, Hero, KPMG, Accenture",
         customers_n=6, reviews=26, threat="HIGH",
         scope="innovation programme management; Enterprise multi-site is genuinely the closest in the set",
         differentiator="Only competitor with a real review base (26 Capterra, 4.8); multi-site architecture",
         weakness="Per-user pricing collapses institutional ACV; documentation-poor; broken pricing page; scored 2/5 on AI by a competitor",
         url="https://www.getapp.za.com/software/2062553/accubate", confidence="AGGREGATOR",
         features=F(intake=2, evaluation=2, cohort=2, mentor=2, funding=1, ipr=0, trl=0,
                    mandate=0, faculty=0, multisite=2, datares=0, nocost=1)),

    # ---------------------------------------------------------------- DIRECT: global
    dict(name="Founderhood", vendor="Founderhood", category="direct",
         sub="incubator", market="Global", origin="Athens, Greece / London (conflicting)", founded="2018",
         pricing="Free · $199/mo · $649/mo · custom (no currency symbol published)",
         price_inr_low=0, price_inr_high=54_158,
         evidence="UNKNOWN", customers="", customers_n=0, reviews=3, threat="MEDIUM",
         scope="incubator/accelerator CRM: applications, multi-phase evaluation, cohorts, mentors, live sessions, alumni",
         differentiator="Free tier with 15 startups/program; published 15% university/nonprofit discount",
         weakness="Publishing no currency symbol is a basic credibility failure; tiny company",
         url="https://www.thefounderhood.com/pricing", confidence="VERIFIED_LIVE",
         features=F(intake=2, evaluation=2, cohort=2, mentor=2, funding=0, ipr=0, trl=0,
                    mandate=0, faculty=0, multisite=0, datares=0, nocost=2)),

    dict(name="VentureLink", vendor="VentureLink", category="direct",
         sub="ecosystem", market="Global", origin="Toronto, Canada", founded="Not stated",
         pricing="Core $180/mo · Emails $30/mo · Events $30/mo · Jobs $15/mo · Onboarding $500 once",
         price_inr_low=22_487, price_inr_high=24_929,
         evidence="NAMED_REFERENCE", customers="ICUBE, University of Toronto (Ignacio Mongrell, Assistant Director)",
         customers_n=1, reviews=0, threat="HIGH",
         scope="innovation ecosystem OS: intake, external judges, cohorts, mentors, desks, funding, flows automation, 760+ integrations",
         differentiator="The ONLY named university-institution reference found in the entire category; workflow automation at depth",
         weakness="Data residency is CANADA - fails Indian data-residency procurement; SOC 2 'in progress'; $225/mo still a real cost for a government TBI",
         url="https://venturelink.co/", confidence="VERIFIED_LIVE",
         features=F(intake=2, evaluation=2, cohort=2, mentor=2, funding=2, ipr=0, trl=0,
                    mandate=0, faculty=1, multisite=1, datares=0, nocost=0)),

    dict(name="incuTrack", vendor="incuTrack LLC / Cybergroup Inc.", category="direct",
         sub="incubator", market="Global", origin="USA (Branford CT / Maryland)", founded="~2002",
         pricing="$75/mo quarterly · $250/mo quarterly ($99/$325 monthly) · $595 one-time setup; add-ons $20–75/mo",
         price_inr_low=89_130, price_inr_high=357_996,
         evidence="UNKNOWN", customers="", customers_n=0, reviews=10, threat="LOW",
         scope="incubator CRM: prospects, companies, milestones, economic impact, room inventory, invoicing",
         differentiator="20+ years of tenure; long review history",
         weakness="Recent reviewers call it 'quite outdated'; no Indian customers; English/US institutional assumptions",
         url="https://www.incutrack.com/pricing-2/", confidence="VERIFIED_LIVE",
         features=F(intake=1, evaluation=0, cohort=1, mentor=1, funding=0, ipr=0, trl=0,
                    mandate=0, faculty=0, multisite=0, datares=0, nocost=0)),

    dict(name="RiserNest", vendor="RiserNest", category="direct",
         sub="incubator", market="Global", origin="Rotterdam, Netherlands", founded="2024",
         pricing="€399/mo (≤30 teams) · €799/mo (30–100) · €1,500/mo (100+), ex-VAT; per-user tiers €40/70/120 also shown",
         price_inr_low=33_418, price_inr_high=138_000,
         evidence="VENDOR_CLAIM", customers="Frank and the Backs, Belgium",
         customers_n=1, reviews=0, threat="MEDIUM",
         scope="incubator/accelerator OS: onboarding, stages, milestones, mentor visibility, community app, white-label",
         differentiator="White-label available; claims program-size pricing not per-seat",
         weakness="4 employees; CONTRADICTS itself - says 'No per-seat pricing' while displaying per-user tiers; no security certification",
         url="https://risernest.com/pricing/", confidence="VERIFIED_LIVE",
         features=F(intake=1, evaluation=1, cohort=2, mentor=2, funding=0, ipr=0, trl=0,
                    mandate=0, faculty=0, multisite=0, datares=0, nocost=0)),

    dict(name="Gohorto", vendor="Gohorto", category="direct",
         sub="incubator", market="Global", origin="UK (claimed)", founded="2017 (claimed)",
         pricing="US$4,200/year flat (Capterra); Starter/Professional/Enterprise pilot tiers on own site",
         price_inr_low=350_700, price_inr_high=350_700,
         evidence="VENDOR_CLAIM", customers="", customers_n=0, reviews=3, threat="MEDIUM",
         scope="full incubation lifecycle: intake, AI mentor matching, milestones, graduation, analytics",
         differentiator="Addresses the multi-programme complexity Indian institutions actually have",
         weakness="3 reviews, one vendor-referred; no named customer; flat annual price only",
         url="https://www.capterra.co.uk/software/1082840/Gohorto", confidence="AGGREGATOR",
         features=F(intake=2, evaluation=2, cohort=2, mentor=2, funding=1, ipr=0, trl=0,
                    mandate=0, faculty=0, multisite=1, datares=0, nocost=1)),

    dict(name="Univation (Incubators Platform)", vendor="Univation", category="direct",
         sub="incubator", market="Global", origin="Not disclosed", founded="Not disclosed",
         pricing="FREE for universities and nonprofits (+ $1,000 Google Ads credit)",
         price_inr_low=0, price_inr_high=0,
         evidence="UNKNOWN", customers="", customers_n=0, reviews=2, threat="HIGH",
         scope="incubator/accelerator programme management - the same job as StartupHub",
         differentiator="Free for exactly the buyer StartupHub targets",
         weakness="Tiny company; free tier caps at 15 startups/program",
         url="https://www.capterra.com/p/253529/Incubators-Platform/", confidence="PUBLISHED",
         features=F(intake=2, evaluation=1, cohort=2, mentor=1, funding=0, ipr=0, trl=0,
                    mandate=0, faculty=0, multisite=0, datares=0, nocost=2)),

    dict(name="Innoloft / LoftOS", vendor="Innoloft", category="direct",
         sub="ecosystem", market="Global", origin="Germany", founded="2019",
         pricing="Free – $849/month",
         price_inr_low=0, price_inr_high=70_887,
         evidence="UNKNOWN", customers="", customers_n=0, reviews=0, threat="HIGH",
         scope="no-code portal builder with an accelerator template",
         differentiator="THE DIY THREAT - a university IT team can build its own",
         weakness="Not purpose-built; heavy implementation; no incubation domain model",
         url="https://www.capterra.com/p/153022/Innoloft/", confidence="AGGREGATOR",
         features=F(intake=1, evaluation=1, cohort=1, mentor=1, funding=0, ipr=0, trl=0,
                    mandate=0, faculty=0, multisite=0, datares=0, nocost=2)),

    dict(name="AcceleratorApp", vendor="AcceleratorApp", category="direct",
         sub="accelerator", market="Global", origin="Lithuania (implied)", founded="Not verified",
         pricing="Core quote-only; funding module $549–899/month",
         price_inr_low=45_842, price_inr_high=75_018,
         evidence="NAMED_LOGO", customers="Yale, MIT Design X, Max Planck (no Indian institution)",
         customers_n=3, reviews=0, threat="MEDIUM",
         scope="accelerator management with tranche disbursement and capital calls",
         differentiator="Best academic logos in the category; capital-call machinery",
         weakness="Zero Indian presence; quote-gated core; no verified reviews",
         url="https://acceleratorapp.com/", confidence="AGGREGATOR",
         features=F(intake=2, evaluation=2, cohort=2, mentor=1, funding=2, ipr=0, trl=0,
                    mandate=0, faculty=0, multisite=0, datares=0, nocost=0)),

    # ---------------------------------------------------------------- GLOBAL: innovation
    dict(name="IdeaScale", vendor="IdeaScale", category="global", sub="innovation",
         market="Global", origin="San Francisco, US", founded="2009",
         pricing="$4,999 per feature per year (aggregator); enterprise custom",
         price_inr_low=417_516, price_inr_high=417_516,
         evidence="NAMED_LOGO", customers="White House, NASA, McKinsey, IKEA, Ford, Target, Pfizer",
         customers_n=7, reviews=28, threat="MEDIUM",
         scope="enterprise idea/innovation management, crowdsourcing, gamification, prioritisation",
         differentiator="Largest installed base in enterprise innovation; sold to government and academia",
         weakness="Corporate intrapreneurial; assumes employee base, SSO, IT dept; no Indian institution",
         url="https://ideascale.com/pricing/", confidence="AGGREGATOR",
         features=F(intake=1, evaluation=2, cohort=0, mentor=1, funding=0, ipr=0, trl=0,
                    mandate=0, faculty=1, multisite=2, datares=0, nocost=0)),

    dict(name="Envisio", vendor="Envisio Solutions Inc.", category="global", sub="innovation",
         market="Global", origin="US / Canada", founded="Not stated",
         pricing="CONFLICT: GetApp USD 400/yr vs SelectHub USD 20,000/yr; observed contract USD 19,500/yr + USD 8,775 setup",
         price_inr_low=33_400, price_inr_high=1_670_000,
         evidence="NAMED_REFERENCE", customers="City of La Mesa, CA (council resolution, USD 19,500/yr)",
         customers_n=1, reviews=28, threat="LOW",
         scope="public-sector strategy + performance dashboards, unlimited user licences",
         differentiator="Serves ONLY public sector, nonprofit and education - closest buyer match outside India",
         weakness="Not a startup platform; no India presence; 50x aggregator conflict unresolved",
         url="https://envisio.com/pricing/", confidence="CONFLICT",
         features=F(intake=0, evaluation=0, cohort=0, mentor=0, funding=0, ipr=0, trl=0,
                    mandate=0, faculty=1, multisite=1, datares=0, nocost=0)),

    dict(name="Throttle", vendor="Relic Inc.", category="global", sub="innovation",
         market="Japan", origin="Japan", founded="2019",
         pricing="¥980 / ¥1,980 / ¥2,980 / ¥3,980 per user per month, ex-tax",
         price_inr_low=5_390, price_inr_high=21_890,
         evidence="VENDOR_CLAIM", customers="1,350 companies (claimed)", customers_n=1350,
         reviews=0, threat="LOW",
         scope="innovation management: ideation, programme operations, incubator run",
         differentiator="#1 market share in Japan; per-user tiers with volume discounts",
         weakness="Japan-only market assumptions; no India presence",
         url="https://port.creww.me/en/innovation/70834", confidence="PUBLISHED",
         features=F(intake=1, evaluation=2, cohort=2, mentor=1, funding=0, ipr=0, trl=0,
                    mandate=0, faculty=0, multisite=1, datares=0, nocost=0)),

    dict(name="Wazoku", vendor="Wazoku", category="global", sub="innovation",
         market="Global", origin="UK", founded="Not stated",
         pricing="Total Innovation License - $15,000 per Admin/year, unlimited end users",
         price_inr_low=1_252_500, price_inr_high=1_252_500,
         evidence="VENDOR_CLAIM", customers="", customers_n=0, reviews=0, threat="LOW",
         scope="innovation OS + Innocentive marketplace (1M members), xV value metric, ecosystem management",
         differentiator="Unlimited end users at a per-admin price - the correct shape for institutions",
         weakness="Priced at enterprise scale; no India presence; incumbent-ecosystem assumptions",
         url="https://www.wazoku.com/total-innovation-license/", confidence="PUBLISHED",
         features=F(intake=1, evaluation=2, cohort=1, mentor=1, funding=0, ipr=0, trl=0,
                    mandate=0, faculty=0, multisite=2, datares=0, nocost=0)),

    dict(name="Incu (Sweden)", vendor="Incu", category="global", sub="innovation",
         market="Sweden", origin="Sweden", founded="Not stated",
         pricing="790 kr/user/month",
         price_inr_low=6_600, price_inr_high=6_600,
         evidence="UNKNOWN", customers="", customers_n=0, reviews=0, threat="LOW",
         scope="innovation management with maturity levels and a patent data field",
         differentiator="THE ONLY competitor anywhere with any patent awareness - as a data field, not a workflow",
         weakness="A data field is not an IP workflow; no India presence",
         url="https://www.incuby.se/", confidence="AGGREGATOR",
         features=F(intake=1, evaluation=1, cohort=1, mentor=1, funding=0, ipr=1, trl=1,
                    mandate=0, faculty=0, multisite=0, datares=0, nocost=0)),

    # ---------------------------------------------------------------- GLOBAL: accelerator
    dict(name="Dealum", vendor="Dealum", category="global", sub="accelerator",
         market="Global", origin="US", founded="Not stated",
         pricing="Essentials $119/mo · Advance $289/mo · Scale $479/mo (annual); higher monthly",
         price_inr_low=119_000, price_inr_high=479_000,
         evidence="UNKNOWN", customers="", customers_n=0, reviews=0, threat="LOW",
         scope="accelerator lifecycle: application to graduation to first round and exit",
         differentiator="Deal-room depth for investor-facing workflow",
         weakness="No India presence; no institutional/mandate features",
         url="https://dealum.com/pricing/accelerator", confidence="VERIFIED_LIVE",
         features=F(intake=2, evaluation=2, cohort=2, mentor=1, funding=1, ipr=0, trl=0,
                    mandate=0, faculty=0, multisite=0, datares=0, nocost=0)),

    dict(name="FIKR", vendor="FIKR Space", category="global", sub="accelerator",
         market="Global", origin="Lagos / global (Africa-anchored)", founded="Not stated",
         pricing="Free · Growth €149/mo · Scale €399/mo",
         price_inr_low=0, price_inr_high=37_308,
         evidence="VENDOR_CLAIM", customers="180+ countries access (network, not customers)",
         customers_n=0, reviews=0, threat="LOW",
         scope="accelerator OS: applications, AI screening, cohorts, mentor matching, demo day, analytics",
         differentiator="Full white-label portal on Scale; genuine free tier",
         weakness="Africa-first assumptions; no India presence",
         url="https://fikr.space/accelerator", confidence="VERIFIED_LIVE",
         features=F(intake=2, evaluation=2, cohort=2, mentor=2, funding=0, ipr=0, trl=0,
                    mandate=0, faculty=0, multisite=0, datares=0, nocost=2)),

    dict(name="FosiaHub", vendor="Fosia Ltd", category="global", sub="accelerator",
         market="Africa", origin="Africa (Kenya/Nigeria/Ghana ecosystem)", founded="Not stated",
         pricing="Hub $299/mo · Accelerator $799/mo · free 90-day pilot for institutions",
         price_inr_low=299_000, price_inr_high=799_000,
         evidence="VENDOR_CLAIM", customers="", customers_n=0, reviews=0, threat="LOW",
         scope="accelerator/development-agency programmes: AI scoring, cohorts, credits, donor reporting",
         differentiator="Donor/funder reporting and credits distribution - funder-shaped, not institution-shaped",
         weakness="Africa-first; no India presence",
         url="https://fosiahub.com/for-institutions", confidence="VERIFIED_LIVE",
         features=F(intake=2, evaluation=2, cohort=2, mentor=1, funding=1, ipr=0, trl=0,
                    mandate=0, faculty=0, multisite=0, datares=0, nocost=1)),

    dict(name="European Startup Hub", vendor="European Startup Hub", category="global",
         sub="ecosystem", market="Europe", origin="Europe", founded="Not stated",
         pricing="Institutional licence from €15,000/yr · Regional from €50,000/yr · Portal Cloud from €2,500 · Accelerator infrastructure from €12,000",
         price_inr_low=1_380_000, price_inr_high=4_600_000,
         evidence="UNKNOWN", customers="Universities, accelerators, cities, government agencies (unnamed)",
         customers_n=0, reviews=0, threat="LOW",
         scope="operating layer for university hubs and regional innovation networks",
         differentiator="THE ONLY institutional-licence model found - per licence, not per seat",
         weakness="Very high price point; Europe public-sector shaped; no India presence",
         url="https://www.europeanstartuphub.com/ecosystem-platform/", confidence="VERIFIED_LIVE",
         features=F(intake=2, evaluation=2, cohort=2, mentor=2, funding=1, ipr=0, trl=0,
                    mandate=0, faculty=1, multisite=2, datares=0, nocost=0)),

    dict(name="Catalyzer", vendor="Economic Impact Catalyst", category="global", sub="accelerator",
         market="US", origin="Chattanooga, US", founded="Not stated",
         pricing="Free version available; paid tiers request-demo",
         price_inr_low=0, price_inr_high=None,
         evidence="UNKNOWN", customers="", customers_n=0, reviews=0, threat="LOW",
         scope="cohort management, CRM, intake, session tracking, longitudinal impact surveys",
         differentiator="SOC 2 and WCAG 2.1 AA certified - the only certified competitor found",
         weakness="US federal/state funding-report framing; no India presence",
         url="https://www.catalyzerapp.com/accelerators", confidence="VERIFIED_LIVE",
         features=F(intake=2, evaluation=2, cohort=2, mentor=2, funding=0, ipr=0, trl=0,
                    mandate=0, faculty=0, multisite=0, datares=0, nocost=2)),

    # ---------------------------------------------------------------- GLOBAL: tech transfer (added by Phase 9)
    dict(name="Wellspring for Tech Transfer", vendor="Sophia (Wellspring Worldwide)",
         category="global", sub="tech_transfer", market="Global", origin="US", founded="Not stated",
         pricing="Custom quote",
         price_inr_low=None, price_inr_high=None,
         evidence="UNKNOWN", customers="", customers_n=0, reviews=2, threat="MEDIUM",
         scope="inventions, patents, licences, startups, spin-outs; deadline management; venture programmes",
         differentiator="Full patent deadline management - the TTO-side half of GAP-01",
         weakness="Quote-only; university research offices, not incubators; no India presence",
         url="https://www.softwareadvice.com/product/326099-Sophia/", confidence="AGGREGATOR",
         features=F(intake=0, evaluation=0, cohort=0, mentor=0, funding=0, ipr=2, trl=1,
                    mandate=0, faculty=2, multisite=1, datares=0, nocost=0)),

    dict(name="Helikon Labs", vendor="Helikon Labs", category="global", sub="tech_transfer",
         market="Global", origin="Not stated", founded="Not stated",
         pricing="Free · Team $19/seat/month (5–25 seats) · Institutional from 25 seats (scoped)",
         price_inr_low=0, price_inr_high=19_000,
         evidence="UNKNOWN", customers="", customers_n=0, reviews=0, threat="MEDIUM",
         scope="research partnership lifecycle: researchers, patents, CPC codes, NDA/IRB/contract compliance dates, TTO pipeline",
         differentiator="Starts tracking at DISCLOSURE - before any system of record sees it",
         weakness="Per-seat pricing; no India presence; research-office shaped",
         url="https://helikonlabs.com/for/research-offices", confidence="VERIFIED_LIVE",
         features=F(intake=0, evaluation=0, cohort=0, mentor=0, funding=0, ipr=2, trl=0,
                    mandate=0, faculty=2, multisite=2, datares=0, nocost=2)),

    dict(name="Commercify", vendor="Commercify", category="global", sub="tech_transfer",
         market="Global", origin="Not stated", founded="Not stated",
         pricing="University/research institution from $30,000/yr · Corporate innovation from $75,000/yr (planned GA; 6 design partners)",
         price_inr_low=2_505_000, price_inr_high=6_262_500,
         evidence="UNKNOWN", customers="", customers_n=0, reviews=0, threat="LOW",
         scope="tech transfer offices and corporate R&D: spin-outs, licensing targets, cap-table modelling",
         differentiator="Commercialisation-outcome framing, not process framing",
         weakness="Pre-GA; only 6 design partner slots; very high price; no India presence",
         url="https://commercify.com/pricing", confidence="VERIFIED_LIVE",
         features=F(intake=0, evaluation=0, cohort=0, mentor=0, funding=1, ipr=2, trl=1,
                    mandate=0, faculty=2, multisite=1, datares=0, nocost=0)),

    dict(name="SINT.OTRI", vendor="SINT", category="global", sub="tech_transfer",
         market="Spain", origin="Palma de Mallorca, Spain", founded="In production since 2024",
         pricing="Pilot €0 (6 months) · Year 1 €14,000 + VAT · Year 2+ €55,000/yr",
         price_inr_low=1_288_000, price_inr_high=5_060_000,
         evidence="UNKNOWN", customers="", customers_n=0, reviews=0, threat="LOW",
         scope="university patent portfolio with annuity calendar, art.83 LOSU contracts, spin-offs, invention declarations",
         differentiator="Deliberately priced below the Spanish minor-contract threshold to enable direct award",
         weakness="Spanish public-law specific (LOSU art.83); no India presence",
         url="https://sint.es/universidad/otri/", confidence="VERIFIED_LIVE",
         features=F(intake=0, evaluation=0, cohort=0, mentor=0, funding=0, ipr=2, trl=0,
                    mandate=0, faculty=2, multisite=1, datares=0, nocost=0)),

    # ---------------------------------------------------------------- GLOBAL: academic
    dict(name="Elsevier Pure", vendor="Elsevier", category="global", sub="innovation",
         market="Global", origin="Netherlands / UK", founded="Not stated",
         pricing="UK G-Cloud list £19,406–£58,504/yr + £32,250 onboarding",
         price_inr_low=1_628_250, price_inr_high=4_902_020,
         evidence="UNKNOWN", customers="Universities and research institutions worldwide (generic - none named)",
         customers_n=0, reviews=0, threat="LOW",
         scope="research outputs, funding, affiliations, impact - the research management benchmark",
         differentiator="The hardest price benchmark in the study; institutional-grade trust",
         weakness="Manages RESEARCH OUTPUTS, not startups; no India-specific module; very expensive",
         url="https://www.elsevier.com/products/pure", confidence="PUBLISHED",
         features=F(intake=0, evaluation=0, cohort=0, mentor=0, funding=1, ipr=1, trl=0,
                    mandate=0, faculty=2, multisite=2, datares=0, nocost=0)),
]

# ==========================================================================
# ECOSYSTEM COMPETITORS - the mandatory stack
# ==========================================================================
# Not vendors. Statutory infrastructure. StartupHub must complement them.
# The spec's own example - "Startup India already offers ecosystem networking,
# startup directories, mentors, incubators, investors, resources and programs" -
# is correct, and the resolution is in the `takes_back` column.

ECOSYSTEM = [
    dict(name="Startup India Hub", operator="DPIIT", category="ecosystem",
         unit="the startup profile",
         gives="50,000+ startup directory; investors, mentors, incubators, accelerators; 30+ government bodies registered; free tools, templates, courses, challenges; Innovation Challenges with cash grants",
         takes="connection requests (3/week cap); startup-level only",
         takes_back="**NOTHING BACK TO INSTITUTIONS.** No IIC activity, no ARIIA/NIRF evidence, no TRL. This is the single most important line in this phase.",
         url="https://www.startupindia.gov.in/content/sih/en/startup-hub.html",
         overlap="DIRECT on networking, directory, mentors, incubators. ZERO on institutional innovation compliance.",
         threat="HIGH",
         note="Network claimed at 600K registered members."),

    dict(name="BHASKAR", operator="DPIIT", category="ecosystem",
         unit="the individual/entity identity",
         gives="Bharat Startup Knowledge Access Registry; personas Mentor, Enabler, Explorer, Startup Founder, Individual Investor, Traditional Business Owner; industry alliances by sector/tech/geography",
         takes="a completed profile before you become visible and searchable",
         takes_back="**NOTHING BACK TO INSTITUTIONS.** Identity layer, not an innovation record.",
         url="https://www.startupindia.gov.in/bhaskar",
         overlap="Identity and discovery. No institutional compliance overlap at all.",
         threat="HIGH",
         note="Registration now redirects through BHASKAR before DPIIT recognition runs in parallel."),

    dict(name="MAARG", operator="DPIIT / Startup India", category="ecosystem",
         unit="the mentor-startup pairing",
         gives="AI mentor-startup matching at scale; interaction tracking for impact; video calls; mentor recognition; custom programmes by enablers; feedback and grievance mechanism",
         takes="mentor profile moderation 24–48h",
         takes_back="**NOTHING BACK TO INSTITUTIONS.** Mentorship hours are not logged against any scheme's utilisation requirement.",
         url="https://maarg.startupindia.gov.in/",
         overlap="DIRECT on mentor matching. This is the closest government analogue to StartupHub's mentor module.",
         threat="HIGH",
         note="GAP-07 (NDA-tiered mentor visibility) is NOT solved here either."),

    dict(name="Startup India Investor Connect", operator="NSAC / DPIIT", category="ecosystem",
         unit="the investor-startup introduction",
         gives="dedicated platform connecting startups to investors by sector, function, stage, geography, background",
         takes="registration",
         takes_back="**NOTHING BACK TO INSTITUTIONS.**",
         url="https://www.startupindia.gov.in/content/sih/en/about-startup-india-initiative.html",
         overlap="Investor discovery only.",
         threat="MEDIUM",
         note="Launched at the 6th NSAC meeting, 11 March 2023."),

    dict(name="IIC Portal", operator="MoE Innovation Cell", category="ecosystem",
         unit="the activity/event",
         gives="Institution's Innovation Council registration; star rating 1–5; Performance Card; 16+ activities/year each a full evidence submission",
         takes="16+ evidence submissions per year, maintained by hand",
         takes_back="Nothing - this IS the record. But it returns nothing machine-readable.",
         url="https://iic.gov.in/",
         overlap="**TOTAL, AND MANDATORY.** No institution can opt out. This is the demand driver.",
         threat="CRITICAL",
         note="GOV-018/022. 17 menus, no venture-entity module."),

    dict(name="YUKTI-NIR", operator="MoE MIC + AICTE", category="ecosystem",
         unit="the innovation snapshot",
         gives="TRL banding (Idea/PoC 1–4, Innovation/Prototype 5–9, Business/Startup); institute-side verification with Recommended/Not-Recommended gating; auto-flows to ARIIA",
         takes="every innovation, institute-verified",
         takes_back="Improved ARIIA Section 4 ranking - a budget line that already exists.",
         url="https://yuktinir-mic.in/",
         overlap="**TOTAL, AND MANDATORY.**",
         threat="CRITICAL",
         note="GOV-023/024. The reason TRL is non-optional (GAP-02)."),

    dict(name="NIRF Innovation", operator="MoE", category="ecosystem",
         unit="the spreadsheet row",
         gives="Ranking; 5 marks hinge on one countable (startups recognised)",
         takes="~11 screens PER DISCIPLINE, per startup",
         takes_back="Ranking, and funding consequences.",
         url="https://www.nirfindia.org/",
         overlap="**TOTAL, AND MANDATORY.**",
         threat="CRITICAL",
         note="GOV-028. Phase 3A measured the operational cost: 32/354 startups lose identity (9%)."),

    dict(name="ARIIA", operator="AIM / Atal Innovation Mission", category="ecosystem",
         unit="the institution-year + innovation rows",
         gives="Ranking; incumbent performance data; 100+ indicators across 5 categories",
         takes="100+ indicators annually",
         takes_back="Ranking, and institutional funding.",
         url="https://ariia.gov.in/",
         overlap="**TOTAL, AND MANDATORY.**",
         threat="CRITICAL",
         note="GOV-032. Demands 'Patent Application No' and 'Year of Patent Application' - the mandate behind GAP-01."),

    dict(name="AISHE", operator="DoHE", category="ecosystem",
         unit="the institution-year aggregate",
         gives="National registry; the statistical frame behind every count in this study",
         takes="binary innovation items only",
         takes_back="Aggregate visibility.",
         url="https://aishe.gov.in/",
         overlap="Indirect - it defines the market, not the workflow.",
         threat="LOW",
         note="58,643 registered HEIs - the super-bound from Phase 7."),

    dict(name="State Startup Portals", operator="State Governments", category="ecosystem",
         unit="the state ecosystem record",
         gives="State Startup Ranking (SRF) results; policy schemes; state nodal teams",
         takes="state reporting",
         takes_back="Ranking and scheme access.",
         url="https://www.startupindia.gov.in/",
         overlap="Segment G9 - sized separately in Phase 7 on the PRIOR tier.",
         threat="MEDIUM",
         note="Phase 6: 34 states ranked, 8 fell tiers, 0 Emerging-tier reports obtainable."),
]

# ==========================================================================
# INDIRECT COMPETITORS - what institutions actually use
# ==========================================================================

INDIRECT = [
    dict(name="Excel / Google Sheets", price="₹0 – ~₹2,000/yr (bundled in licences already paid)",
         why_it_wins="Free, universal, no procurement. Every institution already has it.",
         what_it_cannot_do="No permissions, no audit trail, no relational integrity, no workflow, manual consolidation across departments.",
         evidence="PHASE 4 corpus - the IIC annual report is hand-assembled from spreadsheets (P-A08)",
         url="", threat="CRITICAL"),
    dict(name="WhatsApp + Google Drive", price="₹0",
         why_it_wins="It is the operational database. IISc's own IIC page links students to a WhatsApp group.",
         what_it_cannot_do="No structure, no permissions, no audit trail, no reporting.",
         evidence="COMP-024; GAP-10",
         url="", threat="CRITICAL"),
    dict(name="Notion / Superhuman Docs", price="~$126k–₹1.73L/yr at IIC scale",
         why_it_wins="Flexible, cheap at small team size, attractive UI that staff already want to use.",
         what_it_cannot_do="Audit logs gated behind Enterprise; no retroactive history; no offline; no Indian compliance.",
         evidence="_exports/csv/pricing_ledger.csv",
         url="", threat="HIGH"),
    dict(name="Airtable", price="₹0 – paid per seat",
         why_it_wins="The default 'build it ourselves' database. RiserNest and VentureLink both position against it by name.",
         what_it_cannot_do="No institutional domain model; audit history limited; Indian data residency uncertain.",
         evidence="RiserNest and VentureLink positioning copy",
         url="", threat="HIGH"),
    dict(name="CRM (Zoho / Freshworks / Freshsales)", price="₹800–₹6,399 per user/month",
         why_it_wins="Cheap, ubiquitous, and the incumbent IIC coordinators already know.",
         what_it_cannot_do="Models PIPELINE, not incubation. No TRL, no IPR, no scheme mapping. Per-user pricing collapses institutional ACV (Phase 8).",
         evidence="Phase 8 comparables",
         url="", threat="HIGH"),
    dict(name="Project management (Trello / ClickUp / Monday / Asana)", price="₹154k–₹1.19L/yr at 10 users",
         why_it_wins="Task tracking is the visible symptom; teams adopt it before anything else.",
         what_it_cannot_do="No domain model, no intake workflow, no IPR. Audit logs enterprise-only.",
         evidence="_exports/csv/pricing_ledger.csv",
         url="", threat="MEDIUM"),
    dict(name="Campus ERP (Fedena, EduZenAI, Campusify)", price="₹10,000–₹7.2L/yr; per-student variants",
         why_it_wins="The institution already owns one and pays for it regardless. Fedena sells a broader product for ₹1,00,000 flat.",
         what_it_cannot_do="**Zero Indian campus ERP vendors have a startup-incubation module.** They stop at admissions, fees and exams.",
         evidence="Phase 8 comparables; Phase 9 campus ERP row",
         url="", threat="HIGH"),
    dict(name="Email + Word/Excel", price="₹0",
         why_it_wins="Always works, always available, needs no committee.",
         what_it_cannot_do="No calculation, no lineage, binary re-entry, month-end blackout.",
         evidence="Phase 1 corpus",
         url="", threat="MEDIUM"),
]


# ==========================================================================
# POSITIONING GAPS - with Phase 9 corrections applied
# ==========================================================================

POSITIONING_GAPS = [
    dict(gap_id="GAP-01", title="IPR / patent portfolio management",
         severity="CRITICAL", n_with=0, n_total=28,
         verdict="NARROWED BY PHASE 9 - was 'zero competitors have an IPR module'",
         phase0_claim="Zero of 11 competitors have an IPR module.",
         falsified_by=("Wellspring for Tech Transfer, Helikon Labs, Commercify and SINT.OTRI all "
                       "implement invention disclosure, patent status/deadline, licensing and "
                       "spin-out workflow. Four dedicated tech-transfer platforms exist."),
         surviving_claim=("Dedicated IP/tech-transfer platforms EXIST but are not JOINED TO INCUBATION "
                          "PROGRAMME MANAGEMENT, and none has Indian data residency. Incu (Sweden) has a "
                          "patent field but not a workflow."),
         nearest="Wellspring, Helikon Labs, Commercify, SINT.OTRI (TTO side); Incu (Sweden, field)",
         why_india="ARIIA demands 'Patent Application No'; IIC registers IPR/TTO Centre by floor area with no patent field; MeitY mandates IP due diligence; HEI filings +119% in two years",
         status="SURVIVES, NARROWED"),
    dict(gap_id="GAP-02", title="TRL as a first-class, reportable object",
         severity="CRITICAL", n_with=0, n_total=28,
         verdict="UNCHANGED - not touched by Phase 9 research",
         phase0_claim="Every platform tracks 'stage' as free text. Nobody models TRL.",
         falsified_by="None found. Incu (Sweden) has maturity levels but no funding-scheme mapping.",
         surviving_claim=("Every platform tracks 'stage' as free text. Nobody models TRL AND maps it "
                          "to eligible Indian funding schemes."),
         nearest="Incu (Sweden) - maturity levels only",
         why_india="YUKTI-NIR bands on TRL 1–9; ARIIA asks for 'Stage of Innovation (TRL Stage)'; BIRAC/NIDHI/TIDE tranches tied to TRL progression",
         status="SURVIVES UNCHANGED"),
    dict(gap_id="GAP-03", title="YUKTI-NIR / IIC / ARIIA submission workflow",
         severity="CRITICAL", n_with=0, n_total=28,
         verdict="UNCHANGED - not touched by Phase 9 research",
         phase0_claim="Highest-value, most-defensible feature in the category - and completely open.",
         falsified_by="None. No competitor, Indian or global, targets Indian government mandates.",
         surviving_claim=("Zero of 29 competitors. Highest-value and most-defensible gap in the category."),
         nearest="None. Zero of 29.",
         why_india="Government mandate across three separate systems; verified YUKTI-NIR entries improve ARIIA ranking",
         status="SURVIVES UNCHANGED"),
    dict(gap_id="GAP-04", title="Unified mandate-spanning reporting",
         severity="HIGH", n_with=1, n_total=28,
         verdict="WEAKENED - Accubate Enterprise now has a real claim",
         phase0_claim="Nobody reports the whole institutional innovation portfolio at once.",
         falsified_by="Accubate Enterprise multi-site is genuinely the closest structure.",
         surviving_claim="Accubate has multi-site structure but no Indian mandate spans.",
         nearest="Accubate (Enterprise)",
         why_india="One institution files to ARIIA, NIRF, IIC, AICTE/NBA/NAAC, DST/NIDHI/BIRAC/TIDE, CSR, AIC, Governing Body, DPIIT",
         status="SURVIVES, WEAKENED"),
    dict(gap_id="GAP-05", title="Government-grant disbursement ledger traced to a receipt",
         severity="HIGH", n_with=4, n_total=28,
         verdict="STRENGTHENED - Phase 9 found a fourth holder",
         phase0_claim="Cover with scheme-matching, not a general ledger.",
         falsified_by="VentureLink adds grants/competitions tracked per team, raising holders to 4.",
         surviving_claim="Everyone has a general ledger; nobody scheme-matches to Indian eligibility.",
         nearest="EcoSync, VentureLink, NestLens Orbit, AcceleratorApp",
         why_india="BIRAC 5% royalty until cumulative repayment; unspent balance reversion is an audit failure",
         status="SURVIVES, STRENGTHENED"),
    dict(gap_id="GAP-06", title="Faculty, Innovation Ambassadors and the non-startup innovator",
         severity="HIGH", n_with=3, n_total=28,
         verdict="NARROWED - tech-transfer platforms do model faculty",
         phase0_claim="Completely unoccupied, and upstream of the whole funnel.",
         falsified_by=("Wellspring, Helikon Labs and Commercify all centre the FACULTY/researcher as "
                       "the primary entity - the opposite of StartupHub's startup-first model."),
         surviving_claim=("Faculty are first-class in TECH-TRANSFER platforms but absent from every "
                          "INCUBATION platform, which all build from 'startup application'."),
         nearest="Wellspring, Helikon Labs (faculty entity, no incubation)",
         why_india="MIC trained 60,000+ faculty as Innovation Ambassadors; NIDHI-PRAYAS requires an institutional NOC from employed applicants",
         status="SURVIVES, NARROWED"),
    dict(gap_id="GAP-07", title="Mentor logistics at scale - NDA-tiered visibility",
         severity="HIGH", n_with=1, n_total=28,
         verdict="WEAKENED BY ECOSYSTEM - MAARG is a government actor here",
         phase0_claim="A real institutional fear that nobody has solved.",
         falsified_by="MAARG (Startup India) does AI mentor matching at national scale, though without NDA tiers.",
         surviving_claim=("MAARG matches mentors but does not tier visibility by NDA and does not log "
                          "hours against scheme utilisation. The NDA gap itself survives."),
         nearest="MAARG (government), incuTrack ($30/mo add-on)",
         why_india="A single NDA leakage could void an IPR claim; AICTE YUKTI-NIR has NDA templates",
         status="SURVIVES, WEAKENED"),
    dict(gap_id="GAP-08", title="AI that is auditable instead of just advertised",
         severity="MEDIUM", n_with=5, n_total=28,
         verdict="WEAKENED - AI adoption is now broad",
         phase0_claim="Nothing in the category offers defensible AI.",
         falsified_by=("FIKR (10-pillar AI pitch scoring), Dealum (AI assistant credits), IdeaScale (AI "
                       "assistance), VentureLink (audit log on every score change), IncubatX, EcoSync."),
         surviving_claim=("AI is now widespread, but audit trails are the differentiator: VentureLink logs "
                          "every score change with actor and reason, and EcoSync refuses AI scoring outright."),
         nearest="VentureLink (score-change audit log), EcoSync (counter-position on AI scoring)",
         why_india="AI that cannot produce a citation trail is worse than no AI for an auditable committee process",
         status="SURVIVES, WEAKENED"),
    dict(gap_id="GAP-09", title="Unincorporated pre-incubation state",
         severity="MEDIUM", n_with=0, n_total=28,
         verdict="UNCHANGED - no competitor found to model it",
         phase0_claim="The biggest structural hole in every platform.",
         falsified_by="None found. Every platform assumes a registered entity.",
         surviving_claim="Every platform assumes a registered entity; the university funnel is mostly before incorporation.",
         nearest="Incubatee - one line item on the pricing table",
         why_india="DPIIT recognition, GST and Udyam gate every scheme; SIH had 139,844 teams registered",
         status="SURVIVES UNCHANGED"),
    dict(gap_id="GAP-10", title="Guaranteed migration off forms/spreadsheets/WhatsApp",
         severity="MEDIUM", n_with=2, n_total=28,
         verdict="WEAKENED - more vendors now claim it",
         phase0_claim="Incu (Sweden) only.",
         falsified_by="VentureLink (data import in onboarding), Helikon Labs (start free), Phosphor-free onboarding in others.",
         surviving_claim="Still the #1 real blocker in an Indian institutional sale; more vendors claim it than actually do it.",
         nearest="Incu (Sweden), VentureLink, Helikon Labs",
         why_india="Migration is manual, unpaid work the BUYER must do",
         status="SURVIVES, WEAKENED"),
    dict(gap_id="GAP-11", title="Departments and multi-campus sub-tenancy",
         severity="MEDIUM", n_with=4, n_total=28,
         verdict="WEAKENED - more vendors now claim multi-site",
         phase0_claim="Accubate Enterprise genuinely the closest.",
         falsified_by=("IdeaScale, Wazoku, Helikon Labs, ESH and Elsevier Pure all now claim multi-site "
                       "or departmental structure."),
         surviving_claim="Multi-site is becoming table stakes; sub-tenant-per-DEPARTMENT with departmental P&L and SPV-vs-department IP ownership is still absent.",
         nearest="Accubate, IdeaScale, Helikon Labs, ESH",
         why_india="Departments each hold their own IIC coordinator, budget and mentor panel",
         status="SURVIVES, WEAKENED"),
    dict(gap_id="GAP-12", title="Deployment model an Indian university can actually buy",
         severity="MEDIUM", n_with=3, n_total=28,
         verdict="STRENGTHENED - Phase 8 quantified the gap",
         phase0_claim="Nobody packages on-premise/Indian data residency at an affordable price.",
         falsified_by="None. EcoSync is INR-native but cloud; VentureLink is Canada-resident; Catalyzer is certified but US.",
         surviving_claim=("Still unoccupied. Note Phase 8: Fedena sells a FULL ERP at ₹1,00,000 flat, so "
                          "the market exists - StartupHub must simply match that shape."),
         nearest="EcoSync (INR-native, cloud), Wazoku (unlimited users, but $15k/admin)",
         why_india="Only Incubatee, IncubatX and Orbit publish an India price list",
         status="SURVIVES, STRENGTHENED"),
    dict(gap_id="GAP-13", title="A verifiable Indian reference institution",
         severity="MEDIUM", n_with=3, n_total=28,
         verdict="FALSIFIED AS ORIGINALLY WORDED - NARROWED",
         phase0_claim="No competitor can prove a large Indian institution runs on their software.",
         falsified_by=("EcoSync names TBI-KIET (KIET Group of Institutions); Accubate names NSRCOM and "
                       "NASSCOM; VentureLink publishes a NAMED_REFERENCE from ICUBE at the University "
                       "of Toronto, which is a university incubator but NOT Indian."),
         surviving_claim=("No competitor demonstrates a LARGE INDIAN UNIVERSITY deployment with named "
                          "referees and third-party verification. The best evidence in the category is a "
                          "VENDOR_CLAIM (EcoSync) and a NAMED_REFERENCE at a non-Indian university."),
         nearest="EcoSync (TBI-KIET, vendor-claimed); VentureLink (ICUBE Toronto, named reference)",
         why_india="Named Indian university case study with referees is still worth more than any feature",
         status="SURVIVES, NARROWED"),
]

# ==========================================================================
# REVISED CLAIMS - the audit trail of what Phase 9 changed
# ==========================================================================

REVISED_CLAIMS = [
    dict(id="RC-01", phase0_claim="No competitor can prove a large Indian institution runs on their software.",
         status="FALSIFIED",
         falsified_by="EcoSync (TBI-KIET); Accubate (NSRCOM, NASSCOM); VentureLink (ICUBE, Univ. of Toronto)",
         correction=("Narrowed to: no competitor demonstrates a LARGE INDIAN UNIVERSITY deployment with "
                     "named referees and third-party verification."),
         affected_gaps=["GAP-13"]),

    dict(id="RC-02", phase0_claim="Exactly zero competitors have an IPR module.",
         status="FALSIFIED",
         falsified_by="Wellspring for Tech Transfer; Helikon Labs; Commercify; SINT.OTRI",
         correction=("Narrowed to: dedicated IP platforms exist but are not joined to incubation programme "
                     "management, and none has Indian data residency. This forced a new competitor category "
                     "(tech_transfer) into this phase."),
         affected_gaps=["GAP-01", "GAP-06"]),

    dict(id="RC-03", phase0_claim="RiserNest - Europe (unverified); VentureLink - Not found; EcoSync - login-gated, unverified.",
         status="RESOLVED",
         falsified_by="All three verified against live vendor pages",
         correction=("RiserNest: Rotterdam, founded 2024, €399–1,500/mo. VentureLink: founded inside a "
                     "University of Toronto incubator, ~$225/mo, NAMED_REFERENCE customer. EcoSync: "
                     "Opernova Technologies LLP, VENDOR_CLAIM customer TBI-KIET."),
         affected_gaps=["GAP-13"]),

    dict(id="RC-04", phase0_claim="The Global/ folder contains 4 vendors (Elsevier Pure, IdeaScale, Innoloft, Incu).",
         status="EXPANDED",
         falsified_by="n/a - this is a coverage gap, not a false claim",
         correction=("Expanded to 16 global vendors across the four categories the spec names, plus a fifth "
                     "(tech_transfer) that verification required."),
         affected_gaps=[]),

    dict(id="RC-05", phase0_claim="DPIIT recognition criteria are stable.",
         status="SUPERSEDED BY LATER EVIDENCE",
         falsified_by="DPIIT Gazette Notification 108(E), 4 February 2026",
         correction=("The turnover threshold for Startup recognition was revised from ₹100 crore to ₹200 "
                     "crore. This changes the recognised population that Phase 3A measured and that the "
                     "whole ecosystem competes within."),
         affected_gaps=[]),
]

REGULATORY_SIGNALS = [
    dict(signal="DPIIT Gazette Notification 108(E)",
         date="2026-02-04",
         change="Startup recognition turnover threshold revised from ₹100 crore to ₹200 crore.",
         source="startupindia.gov.in home page disclaimer",
         url="https://www.startupindia.gov.in/content/sih/en/home-page.html",
         competitive_implication=("Shrinks the DPIIT-recognised population. NIRF Innovation counts the "
                                  "'startups recognised' figure, and Phase 7 uses 777 filers. A higher "
                                  "threshold means fewer recognitions, which feeds a 5-mark NIRF criterion."),
         status="NEEDS VERIFICATION AGAINST THE GAZETTE ITSELF"),
    dict(signal="Startup India Seed Fund Scheme - incubator management fee",
         date="Current",
         change="Management fee @ 5% of the seed grant provisioned to the incubator (₹1 crore grant = ₹1.05 crore total).",
         source="SISFS glossary, seedfund.startupindia.gov.in",
         url="https://seedfund.startupindia.gov.in/glossary",
         competitive_implication=("This is REAL money flowing to incubators through a system they must "
                                  "administer. It is the strongest documentary reason a grant ledger "
                                  "(GAP-05) exists."),
         status="T1_DOCUMENT"),
    dict(signal="Startup Runway on GeM",
         date="Current",
         change="Dedicated marketplace category for startups; 10,360+ startups registered, 74,935 orders fulfilled.",
         source="GeM 4th Annual Report",
         url="https://assets-bg.gem.gov.in/resources/upload/shared_doc/4th-annual-report_v1_gem_compressed_1749110509.pdf",
         competitive_implication="A distribution channel that competes with any direct procurement motion.",
         status="T1_DOCUMENT"),
]


# ==========================================================================
# analysis helpers
# ==========================================================================

def by_category():
    out = {}
    for c in COMPETITORS:
        out.setdefault(c["category"], []).append(c)
    return out


def feature_matrix():
    """Coverage grid: competitor x feature, values 0/1/2."""
    rows = []
    for c in COMPETITORS:
        rows.append(dict(
            name=c["name"], category=c["category"], sub=c.get("sub"),
            **{k: (c["features"].get(k) if c["features"].get(k) is not None else 0)
               for k, _ in FEATURES},
        ))
    return rows


def feature_totals():
    """How many of the assessed competitors have each feature natively?"""
    out = []
    for k, label in FEATURES:
        n = sum(1 for c in COMPETITORS if c["features"].get(k))
        native = sum(1 for c in COMPETITORS if c["features"].get(k) == 2)
        out.append(dict(key=k, label=label, n_with=n, n_native=native,
                        n_total=len(COMPETITORS),
                        pct_with=round(n / len(COMPETITORS) * 100, 1)))
    return out


def surviving_gaps():
    return [g for g in POSITIONING_GAPS]


def evidence_summary():
    out = {}
    for c in COMPETITORS:
        out[c["evidence"]] = out.get(c["evidence"], 0) + 1
    return out


def india_presence():
    return dict(
        indian_vendors=len([c for c in COMPETITORS if c["market"] == "India"]),
        named_reference=len([c for c in COMPETITORS if c["evidence"] == "NAMED_REFERENCE"]),
        named_logo=len([c for c in COMPETITORS if c["evidence"] == "NAMED_LOGO"]),
        vendor_claim=len([c for c in COMPETITORS if c["evidence"] == "VENDOR_CLAIM"]),
        unknown=len([c for c in COMPETITORS if c["evidence"] == "UNKNOWN"]),
        data_residency_india=len([c for c in COMPETITORS if c["features"].get("datares") == 2]),
    )


def threat_ranking():
    order = {"CRITICAL": 4, "HIGH": 3, "MEDIUM": 2, "LOW": 1}
    return sorted([c for c in COMPETITORS if c.get("threat")],
                  key=lambda c: -order.get(c["threat"], 0))


def mandatory_stack():
    return [e for e in ECOSYSTEM if e["threat"] == "CRITICAL"]


# ==========================================================================
# validation
# ==========================================================================

def validation():
    errs, warns = [], []

    for c in COMPETITORS:
        for f in ("name", "vendor", "category", "market", "url", "confidence",
                  "evidence", "threat", "scope"):
            if not c.get(f):
                errs.append(f"competitor '{c.get('name','?')}' missing {f}")
        if c["category"] not in CATEGORIES:
            errs.append(f"{c['name']} has unknown category '{c['category']}'")
        if c["sub"] and c["sub"] not in GLOBAL_SUBCATEGORIES:
            errs.append(f"{c['name']} has unknown sub-category '{c['sub']}'")
        if c["evidence"] not in EVIDENCE_GRADES:
            errs.append(f"{c['name']} has unknown evidence grade '{c['evidence']}'")
        if c["confidence"] not in P.CONFIDENCE:
            errs.append(f"{c['name']} has unknown confidence '{c['confidence']}'")
        if c.get("features") is None:
            errs.append(f"{c['name']} has no feature scores")

    # the four spec categories must all be populated
    for k in CATEGORIES:
        if k in ("direct", "global"):
            if not by_category().get(k):
                errs.append(f"spec category '{k}' is empty")
    if not ECOSYSTEM:
        errs.append("ecosystem competitor set is empty")
    if not INDIRECT:
        errs.append("indirect competitor set is empty")

    # spec-named ecosystem platforms must be present (strip hyphens: YUKTI-NIR)
    names = " ".join(e["name"] for e in ECOSYSTEM).lower().replace("-", "")
    for required in ("startup india", "bhaskar", "iic portal", "yuktinir", "state startup"):
        if required.replace("-", "") not in names:
            errs.append(f"spec-required ecosystem platform missing: {required}")

    # every feature axis must have at least one holder, or be flagged
    t = {x["key"]: x["n_with"] for x in feature_totals()}
    for k in ("ipr", "trl", "mandate"):
        if t.get(k, 0) == 0:
            warns.append(f"feature '{k}' has zero holders across all {len(COMPETITORS)} competitors")

    # The denominator recorded in every gap must match the real competitor count.
    for g in POSITIONING_GAPS:
        if g["n_total"] != len(COMPETITORS):
            errs.append(f"{g['gap_id']} records n_total={g['n_total']} but "
                        f"{len(COMPETITORS)} competitors are assessed")

    # THE REGRESSION GUARD. A gap may be "SURVIVES UNCHANGED" only if research
    # genuinely failed to falsify it. If falsified_by names a real falsifier, the
    # gap must be marked changed - that is how RC-01 and RC-02 stay honest.
    # (Only this direction is enforced. A gap can also be STRENGTHENED by later
    # evidence without anything having falsified it - GAP-12 was.)
    for g in POSITIONING_GAPS:
        fb = (g.get("falsified_by") or "").strip()
        if g["status"] == "SURVIVES UNCHANGED" and not fb.startswith("None"):
            errs.append(f"{g['gap_id']} marked SURVIVES UNCHANGED but names a falsifier: {fb[:60]}")

    blob = " ".join(str(g) for g in POSITIONING_GAPS) + " ".join(str(r) for r in REVISED_CLAIMS)
    if "FALSIFIED" not in blob:
        errs.append("the falsification record has been removed")

    # the instrument-level honesty checks used elsewhere in this repo
    for bad in ["competitors told us", "interviews show", "studies prove", "users say"]:
        if bad in str(COMPETITORS).lower():
            errs.append(f"fabricated-research phrasing: '{bad}'")

    for g in POSITIONING_GAPS:
        for f in ("gap_id", "title", "severity", "surviving_claim", "status"):
            if not g.get(f):
                errs.append(f"gap '{g.get('gap_id','?')}' missing {f}")

    return errs, warns


def summary():
    return dict(
        schema_version=SCHEMA_VERSION, build_date=BUILD_DATE,
        competitors=len(COMPETITORS), ecosystem=len(ECOSYSTEM), indirect=len(INDIRECT),
        categories=len(CATEGORIES), global_subcategories=len(GLOBAL_SUBCATEGORIES),
        direct=len(by_category().get("direct", [])),
        global_=len(by_category().get("global", [])),
        gaps=len(POSITIONING_GAPS),
        gaps_critical=len([g for g in POSITIONING_GAPS if g["severity"] == "CRITICAL"]),
        revised_claims=len(REVISED_CLAIMS),
        falsified=len([r for r in REVISED_CLAIMS if r["status"] == "FALSIFIED"]),
        evidence=evidence_summary(),
        india=india_presence(),
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
    _p("\nCOMPETITORS BY CATEGORY")
    for k, v in CATEGORIES.items():
        n = len(by_category().get(k, []))
        _p(f"   {k:<12} {n:>2}   {v['spec'][:70]}")
    _p(f"   ecosystem(platforms) {len(ECOSYSTEM)}")
    _p(f"   indirect(alternatives) {len(INDIRECT)}")
    _p("\nGLOBAL SUBCATEGORIES")
    for k, v in GLOBAL_SUBCATEGORIES.items():
        n = len([c for c in COMPETITORS if c.get("sub") == k])
        _p(f"   {k:<15} {n:>2}   {v}")
    _p("\nEVIDENCE GRADE (named customers are graded, not assumed)")
    for k, v in sorted(evidence_summary().items(), key=lambda x: -x[1]):
        _p(f"   {k:<18} {v}")
    _p("\nFEATURE COVERAGE (how many of 29 competitors implement each)")
    for t in sorted(feature_totals(), key=lambda x: x["n_with"]):
        _p(f"   {t['label']:<42} {t['n_with']:>2}/{t['n_total']}  ({t['pct_with']}%)")
    _p("\nPOSITIONING GAPS - Phase 9 correction status")
    for g in POSITIONING_GAPS:
        _p(f"   {g['gap_id']}  {g['severity']:<9} {g['status']:<28} {g['title'][:44]}")
    _p("\nREVISED CLAIMS")
    for r in REVISED_CLAIMS:
        _p(f"   {r['id']}  {r['status']:<26} {r['phase0_claim'][:58]}")
    _p()
    e, w = validation()
    _p(f"errors: {e or 'none'}")
    _p(f"warns : {w or 'none'}")