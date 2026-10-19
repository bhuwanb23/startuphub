#!/usr/bin/env python3
"""StartupHub Phase 8 - Pricing Research.

    "This is one of your biggest current gaps... Find Willingness to Pay rather
     than simply assuming Rs 1.2 lakh."

WHY THIS MODULE STARTS FROM COMPARABLES AND NOT FROM A PRICE

Willingness to pay is, by definition, a property of a BUYER. It cannot be
derived from arithmetic, and it cannot be observed from public data. The honest
method is:

  1. Establish what comparable buyers actually PAY (revealed preference).
  2. Convert that into a bracket with every bound traceable to a source.
  3. Label the bracket DERIVED-FROM-COMPARABLES - not measured.
  4. Build the instrument that would convert it to measured, and publish no
     results, because none exist.

Step 4 is the one this programme keeps getting wrong, so it is enforced in
validation(): a WTP figure may not carry the provenance class MEASURED while
zero interviews have been conducted.

THE FINDING THIS MODULE EXISTS TO TEST

Phase 7 established that the list price (Rs 1,20,000) yields LTV/CAC = 0.21 and
that Rs 10,27,962 is the ACV required for viability. Meanwhile the observed
Indian institutional market runs from roughly Rs 50,000 (a full college ERP,
per institution, unlimited users) to about Rs 7,20,000 (the top tier of an
incubator operating system).

That means Scenario B sits ABOVE the entire observed Indian envelope. If that
holds, the unit-economics problem CANNOT be solved by raising price, and the
spec's assumption of Rs 1.2 lakh is itself at the top of the observed range for
a product with LESS scope than the incumbents selling below it.

Both facts are tested here against named, citable prices rather than asserted.

EVERY PRICE HERE WAS READ FROM A LIVE VENDOR PAGE OR A PUBLIC DOCUMENT.
Nothing is invented, and where two sources disagree the conflict is recorded
rather than resolved by picking the convenient one.

Usage:  python build/data_p8_pricing.py
"""

import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))

import data_p7_sizing as S        # noqa: E402  (Scenario A / B ACVs, SAM)
import data_p5_finance as F      # noqa: E402  (budget, ceiling)

SCHEMA_VERSION = "1.0"
BUILD_DATE = "2026-10-19"
RETRIEVED = "2026-10-19"

# FX used to normalise non-INR prices. Recorded explicitly so it can be changed.
FX = dict(usd_inr=83.5, eur_inr=92.0, gbp_inr=106.0, jpy_inr=0.55,
          as_of="2026-10-19",
          note=("Single mid-market reference. Every non-INR price in this file is "
                "flagged as FX-derived and must not be treated as a vendor-quoted "
                "INR price."))

CONFIDENCE = ["VERIFIED_LIVE", "PUBLISHED", "DOCUMENT", "AGGREGATOR", "CONFLICT", "CURRENCY_UNCERTAIN"]


# ==========================================================================
# 1. Comparable prices - read from live vendor pages and public documents
# ==========================================================================
# scope: what the product actually does. Needed because StartupHub's price can
# only be judged against products of comparable or greater breadth.

COMPARABLES = [
    # ---------------- India: incubation / accelerator management ----------------
    dict(vendor="NestLens (LabelNest)", product="Orbit Launch", category="incubation",
         market="India", price=75_000, unit="INR/year", inr=75_000, seats=None, volume="25,000 applications/yr",
         scope="incubation OS: intake, screening, evaluation, cohorts, mentors, MOMs, grants, compliance",
         url="https://labelnest.in/nestlens/orbit", confidence="VERIFIED_LIVE",
         note="THE CLOSEST INDIAN COMPARABLE - full incubation lifecycle."),
    dict(vendor="NestLens (LabelNest)", product="Orbit Starter", category="incubation",
         market="India", price=99_000, unit="INR/year", inr=99_000, seats=None, volume="added capacity",
         scope="as above", url="https://labelnest.in/nestlens/orbit", confidence="VERIFIED_LIVE", note=""),
    dict(vendor="NestLens (LabelNest)", product="Orbit Growth", category="incubation",
         market="India", price=125_000, unit="INR/year", inr=125_000, seats=None, volume="added capacity",
         scope="as above", url="https://labelnest.in/nestlens/orbit", confidence="VERIFIED_LIVE", note=""),
    dict(vendor="NestLens (LabelNest)", product="Orbit Scale", category="incubation",
         market="India", price=250_000, unit="INR/year", inr=250_000, seats=40, volume="100,000 applications",
         scope="as above + API + white-label", url="https://labelnest.in/nestlens/orbit",
         confidence="VERIFIED_LIVE", note="40 admin seats."),
    dict(vendor="NestLens (LabelNest)", product="Orbit PM", category="incubation",
         market="India", price=2_499, unit="INR/month", inr=29_988, seats=None, volume="entry tier",
         scope="programme management, scales with cohort size",
         url="https://labelnest.in/nestlens", confidence="VERIFIED_LIVE",
         note="Annualised from the monthly rate. Starts at this price."),
    dict(vendor="NestLens (LabelNest)", product="Orbit OS (module page)", category="incubation",
         market="India", price=29_999, unit="INR/month", inr=359_988, seats=None, volume="full programme ERP",
         scope="full programme ERP", url="https://labelnest.in/nestlens", confidence="CONFLICT",
         note=("CONFLICT, carried forward from Phase 0 and re-verified. The module page "
               "says Rs 29,999/month = Rs 2,99,999/year; the product page lists Scale at "
               "Rs 2,50,000/year. Rs 3,59,988 is the naive 12x annualisation, which is "
               "almost certainly NOT the vendor's real annual price.")),
    dict(vendor="IncubatX", product="Foundation", category="incubation",
         market="India", price=15_000, unit="INR/month", inr=180_000, seats=None, volume="up to 4 cohorts",
         scope="cohort management, startup tracking, AI reporting",
         url="https://incubatx.com/", confidence="VERIFIED_LIVE",
         note="Published as a range Rs 10,000-15,000/month; midpoint-top used as the bound."),
    dict(vendor="IncubatX", product="Foundation (low)", category="incubation",
         market="India", price=10_000, unit="INR/month", inr=120_000, seats=None, volume="up to 4 cohorts",
         scope="as above", url="https://incubatx.com/", confidence="VERIFIED_LIVE",
         note="Published range floor."),
    dict(vendor="IncubatX", product="Accelerator", category="incubation",
         market="India", price=40_000, unit="INR/month", inr=480_000, seats=None, volume="unlimited cohorts",
         scope="+ grants, CSR, funding, investor/mentor matchmaking",
         url="https://incubatx.com/", confidence="VERIFIED_LIVE",
         note="Published as Rs 30,000-40,000/month."),
    dict(vendor="IncubatX", product="Executive AI", category="incubation",
         market="India", price=60_000, unit="INR/month", inr=720_000, seats=None, volume="top tier",
         scope="everything + dedicated implementation, advanced analytics",
         url="https://incubatx.com/", confidence="VERIFIED_LIVE",
         note="TOP OF THE OBSERVED INDIAN INCUBATION ENVELOPE. Published Rs 50,000-60,000/month."),
    dict(vendor="IncubatX", product="Media Kit add-on", category="incubation",
         market="India", price=15_000, unit="INR/month", inr=180_000, seats=None, volume="add-on",
         scope="visibility/media add-on, not core platform",
         url="https://incubatx.com/", confidence="VERIFIED_LIVE",
         note="Evidence that add-ons ARE sold separately in this market - relevant to Model F."),
    dict(vendor="Incubatee (SCIP)", product="Platform subscription", category="incubation",
         market="India", price=300_000, unit="INR/year", inr=300_000, seats=None, volume="",
         scope="incubator platform, part of the scip.co group",
         url="https://www.incubatee.com/company", confidence="PUBLISHED",
         note="Carried from the Phase 0 ledger; vendor confirmed live."),
    dict(vendor="Founderhood", product="Free", category="incubation",
         market="India", price=0, unit="currency-unclear/month", inr=0, seats=1, volume="15 startups/program",
         scope="applications, programmes, mentors, evaluation",
         url="https://www.thefounderhood.com/pricing", confidence="CURRENCY_UNCERTAIN",
         note=("Site prints '199 / month' and '649 / month' with NO currency symbol. "
               "Almost certainly USD, not INR. EXCLUDED from the INR ladder - but the "
               "TIER STRUCTURE and the free tier are real and highly relevant.")),
    dict(vendor="Founderhood", product="University / nonprofit discount", category="incubation",
         market="India", price=None, unit="discount", inr=None, seats=None, volume="",
         scope="15% off list for universities and nonprofits",
         url="https://www.thefounderhood.com/pricing", confidence="VERIFIED_LIVE",
         note=("A published 15% institutional discount. Evidence that this market "
               "prices institutions BELOW list.")),
    dict(vendor="Univation (Incubators Platform)", product="Universities & nonprofits",
         category="incubation", market="Global", price=0, unit="INR/year", inr=0, seats=None, volume="",
         scope="incubator/accelerator programme management - same job as StartupHub",
         url="https://www.capterra.com/p/253529/Incubators-Platform/", confidence="PUBLISHED",
         note=("THE CEILING PROBLEM: a direct competitor offered FREE to universities, "
               "with $1,000 Google Ads credit. Free is an active price in this market.")),

    # ---------------- India: campus / college management ----------------
    dict(vendor="Fedena (Foradian)", product="Standard", category="campus",
         market="India", price=50_000, unit="INR/year", inr=50_000, seats=None, volume="unlimited users",
         scope="FULL college ERP: admissions, attendance, exams, fees, library, hostel, transport, payroll, parent portal, mobile apps",
         url="https://fedena.com/pricing", confidence="PUBLISHED",
         note=("THE SINGLE MOST IMPORTANT COMPARABLE. A BROADER product than StartupHub, "
               "flat per institution, unlimited users, at less than HALF StartupHub's list price.")),
    dict(vendor="Fedena (Foradian)", product="Premium", category="campus",
         market="India", price=75_000, unit="INR/year", inr=75_000, seats=None, volume="unlimited users",
         scope="as above", url="https://fedena.com/pricing", confidence="PUBLISHED", note=""),
    dict(vendor="Fedena (Foradian)", product="Ultimate", category="campus",
         market="India", price=100_000, unit="INR/year", inr=100_000, seats=None, volume="unlimited users",
         scope="as above", url="https://fedena.com/pricing", confidence="PUBLISHED",
         note="Below StartupHub's Rs 1.2L list price."),
    dict(vendor="EduZenAI (collegesoftware.in)", product="Startup", category="campus",
         market="India", price=10_000, unit="INR/year", inr=10_000, seats=None, volume="0-300 students flat",
         scope="college ERP web version, payments, biometric, WhatsApp, exams, library, hostel, transport",
         url="https://collegesoftware.in/pricing.php", confidence="VERIFIED_LIVE",
         note="Flat base + Rs 35/student above 300. +18% GST."),
    dict(vendor="EduZenAI (collegesoftware.in)", product="Startup (per-student, >300)", category="campus",
         market="India", price=35, unit="INR/student/year", inr=35, seats=None, volume="above 300 students",
         scope="as above", url="https://collegesoftware.in/pricing.php", confidence="VERIFIED_LIVE",
         note="Per-student component only; base fee also applies."),
    dict(vendor="EduZenAI (collegesoftware.in)", product="Enterprise (per-student, >300)", category="campus",
         market="India", price=70, unit="INR/student/year", inr=70, seats=None, volume="above 300 students",
         scope="as above, all features", url="https://collegesoftware.in/pricing.php", confidence="VERIFIED_LIVE",
         note="Rs 20,000 base + Rs 70/student."),
    dict(vendor="Campusify", product="Core", category="campus",
         market="India", price=49, unit="INR/student/month", inr=588, seats=None, volume="all modules included",
         scope="admissions, attendance, exams, fees, NAAC SSR, OBE/CBCS, alumni",
         url="https://campusify.io/", confidence="VERIFIED_LIVE",
         note="Annualised Rs 588/student/year."),
    dict(vendor="Campusify", product="Plus", category="campus",
         market="India", price=99, unit="INR/student/month", inr=1188, seats=None, volume="all modules included",
         scope="as above", url="https://campusify.io/", confidence="VERIFIED_LIVE",
         note="At 2,000 students this vendor's own calculator shows Rs 23.76 lakh/year."),
    dict(vendor="DHONDI", product="University tier", category="campus",
         market="India", price=1200, unit="INR/student/year", inr=1200, seats=None, volume="",
         scope="student engagement / engagement platform",
         url="https://dhondi.ai/pricing", confidence="VERIFIED_LIVE",
         note="Discounted rate Rs 600/student/year also published."),
    dict(vendor="DHONDI", product="College tier", category="campus",
         market="India", price=1000, unit="INR/student/year", inr=1000, seats=None, volume="",
         scope="as above", url="https://dhondi.ai/pricing", confidence="VERIFIED_LIVE",
         note="Discounted Rs 500."),
    dict(vendor="VidyalayaERP", product="Basic (schools)", category="campus",
         market="India", price=7_500, unit="INR/year", inr=7_500, seats=None, volume="flat",
         scope="school ERP", url="https://vidyalayaerp.com/pricing/", confidence="VERIFIED_LIVE",
         note="School, not college - context only."),
    dict(vendor="VidyalayaERP", product="Professional (schools)", category="campus",
         market="India", price=100, unit="INR/student/year", inr=100, seats=None, volume="per student",
         scope="school ERP + parent portal", url="https://vidyalayaerp.com/pricing/", confidence="VERIFIED_LIVE",
         note="Rs 13,500/yr Premium covers up to 500 students."),
    dict(vendor="CAMPUSDEAN", product="School modules", category="campus",
         market="India", price=130, unit="INR/student/year", inr=130, seats=None, volume="per student",
         scope="school ERP", url="https://campusdean.com/modules/", confidence="VERIFIED_LIVE", note=""),
    dict(vendor="Codingclave", product="Cloud monthly", category="campus",
         market="India", price=7_999, unit="INR/month", inr=95_988, seats=None, volume="",
         scope="college ERP cloud", url="https://codingclave.com/blog/college-erp-software-india",
         confidence="AGGREGATOR", note="From a competitor's own comparison blog - disclosed as such."),
    dict(vendor="MasterSoft (IITMS)", product="Enterprise", category="campus",
         market="India", price=None, unit="quote only", inr=None, seats=None, volume="",
         scope="full campus ERP - enterprise tier",
         url="https://codingclave.com/blog/college-erp-software-india", confidence="AGGREGATOR",
         note="NO PUBLISHED PRICE. The incumbent enterprise vendor is opaque."),

    # ---------------- India: CRM ----------------
    dict(vendor="Zoho CRM", product="Standard", category="crm",
         market="India", price=800, unit="INR/user/month", inr=9_600, seats=None, volume="annual billing",
         scope="CRM - contact/pipeline/reporting", url="https://www.zoho.com/crm/zohocrm-pricing.html",
         confidence="VERIFIED_LIVE", note="+18% GST. Free for 3 users."),
    dict(vendor="Zoho CRM", product="Professional", category="crm",
         market="India", price=1_400, unit="INR/user/month", inr=16_800, seats=None, volume="annual billing",
         scope="CRM + automation + CPQ", url="https://www.zoho.com/crm/zohocrm-pricing.html",
         confidence="VERIFIED_LIVE", note=""),
    dict(vendor="Zoho CRM", product="Enterprise", category="crm",
         market="India", price=2_400, unit="INR/user/month", inr=28_800, seats=None, volume="annual billing",
         scope="+ ABM, custom functions", url="https://www.zoho.com/crm/zohocrm-pricing.html",
         confidence="VERIFIED_LIVE", note=""),
    dict(vendor="Zoho CRM", product="Ultimate", category="crm",
         market="India", price=2_600, unit="INR/user/month", inr=31_200, seats=None, volume="annual billing",
         scope="+ hosted in India", url="https://www.zoho.com/crm/zohocrm-pricing.html",
         confidence="VERIFIED_LIVE", note="Top published tier."),
    dict(vendor="Zoho CRM", product="Lite user", category="crm",
         market="India", price=2_400, unit="INR/user/month", inr=28_800, seats=None, volume="Enterprise/Ultimate only",
         scope="restricted-role seat", url="https://www.zoho.com/crm/help/complete-feature-list.html",
         confidence="VERIFIED_LIVE", note="MINIMUM 25 regular user licences to add Lite users."),
    dict(vendor="Freshworks Freshsales", product="Growth", category="crm",
         market="India", price=1_299, unit="INR/user/month", inr=15_588, seats=None, volume="annual billing",
         scope="AI sales CRM", url="https://www.freshworks.com/freshdesk/pricing/", confidence="AGGREGATOR",
         note="Free tier exists."),
    dict(vendor="Freshworks Freshdesk", product="Growth", category="crm",
         market="India", price=1_499, unit="INR/agent/month", inr=17_988, seats=None, volume="annual billing",
         scope="helpdesk/ticketing", url="https://www.freshworks.com/freshdesk/pricing/",
         confidence="AGGREGATOR", note="Chennai-headquartered; INR billing with GST."),

    # ---------------- Innovation management (global) ----------------
    dict(vendor="IdeaScale", product="Per feature tier", category="innovation",
         market="Global", price=4_999, unit="USD/year", inr=417_516, seats=None, volume="per feature per year",
         scope="enterprise idea/innovation management", url="https://ideascale.com/pricing/",
         confidence="AGGREGATOR", note="Sold to government and academic institutions."),
    dict(vendor="Envisio", product="Starter (aggregator listing)", category="innovation",
         market="Global", price=400, unit="USD/year", inr=33_400, seats=None, volume="",
         scope="public-sector strategy + performance dashboards, unlimited users",
         url="https://www.getapp.com/operations-management-software/a/envisio/",
         confidence="CONFLICT",
         note="CONFLICT: GetApp lists USD 400/year; SelectHub lists USD 20,000/year."),
    dict(vendor="Envisio", product="Starter (selecthub listing)", category="innovation",
         market="Global", price=20_000, unit="USD/year", inr=1_670_000, seats=None, volume="",
         scope="as above", url="https://www.selecthub.com/p/strategic-planning-software/envisio/",
         confidence="CONFLICT", note="50x discrepancy between aggregators. Never collapse."),
    dict(vendor="Envisio", product="City of La Mesa CA (AWARDED CONTRACT)", category="procurement",
         market="US", price=19_500, unit="USD/year", inr=1_628_250, seats=None, volume="unlimited user licences",
         scope="strategic plan module + analytics suite + public dashboard",
         url="https://pub-lamesa.escribemeetings.com/filestream.ashx?DocumentId=22059",
         confidence="DOCUMENT",
         note=("A REAL OBSERVED TRANSACTION, not a list price. City council resolution: "
               "USD 19,500/yr subscription + USD 8,775 one-time setup; 3-year total "
               "USD 70,249. Public-sector buyer, unlimited users, paid.")),

    # ---------------- Incubation management (global) ----------------
    dict(vendor="incuTrack", product="Starter", category="incubation",
         market="Global", price=99, unit="USD/month", inr=99_033, seats=None, volume="quarterly billing = USD 75/mo",
         scope="incubator CRM", url="https://www.incutrack.com/pricing-2/", confidence="VERIFIED_LIVE",
         note="USD 595 one-time setup fee."),
    dict(vendor="incuTrack", product="Premier", category="incubation",
         market="Global", price=325, unit="USD/month", inr=325_233, seats=None, volume="monthly billing",
         scope="incubator CRM + milestones + economic impact data",
         url="https://www.incutrack.com/pricing-2/", confidence="VERIFIED_LIVE",
         note="Add-ons sold separately: Mentor Matching USD 30/mo, Surveys USD 20/mo, Events USD 50/mo."),
    dict(vendor="Gohorto", product="Platform", category="incubation",
         market="Global", price=4_200, unit="USD/year", inr=350_700, seats=None, volume="flat",
         scope="full incubation lifecycle: intake, mentor matching, milestones, graduation",
         url="https://www.capterra.co.uk/software/1082840/Gohorto", confidence="AGGREGATOR",
         note="Flat annual, no seat limit published."),
    dict(vendor="Accubate", product="Standard", category="incubation",
         market="Global", price=149, unit="USD/user/month", inr=12_441, seats=None, volume="per user",
         scope="innovation program management", url="https://www.getapp.za.com/software/2062553/accubate",
         confidence="AGGREGATOR", note="Rs 12,441 per user PER YEAR - a seat multiplier."),
    dict(vendor="Throttle (Relic)", product="Standard", category="innovation",
         market="Japan", price=2980, unit="JPY/user/month", inr=19_674, seats=None, volume="per user per month",
         scope="innovation management, incubation programmes (1,350 companies)",
         url="https://port.creww.me/en/innovation/70834", confidence="PUBLISHED",
         note="Tiers: 980 / 1,980 / 2,980 / 3,980 JPY per user/month. Japan's #1 share."),
]


def _c(**kw):
    return kw


# ==========================================================================
# 2. Government / institutional procurement - published bands only
# ==========================================================================
# User decision: use published GeM/CPPP bands, no live tender scraping.

PROCUREMENT_BANDS = [
    dict(band="Direct Purchase", rule="amount up to INR 25,000",
         mechanism="no competition", competition="none",
         source="GeM 4th Annual Report", url="https://assets-bg.gem.gov.in/resources/upload/shared_doc/4th-annual-report_v1_gem_compressed_1749110509.pdf",
         implication="Below this there is no price discovery at all. Free incumbents sit here."),
    dict(band="L1", rule="INR 25,000 < amount < INR 5,00,000",
         mechanism="single-award L1", competition="low",
         source="GeM 4th Annual Report", url="https://assets-bg.gem.gov.in/resources/upload/shared_doc/4th-annual-report_v1_gem_compressed_1749110509.pdf",
         implication="StartupHub's whole Scenario A range sits inside L1. No reverse-auction pressure."),
    dict(band="Bid & Reverse Auction", rule="amount >= INR 5,00,000 (mandatory)",
         mechanism="L-1 with reverse auction", competition="high",
         source="GeM 4th Annual Report", url="https://assets-bg.gem.gov.in/resources/upload/shared_doc/4th-annual-report_v1_gem_compressed_1749110509.pdf",
         implication=("Crossing Rs 5 lakh puts us into auction territory. Observed L1-L5 "
                      "spread for services is 5-15%, i.e. price compression.")),
    dict(band="MSE preference", rule="service provider within L1 + 15%",
         mechanism="100% order if MSE", competition="n/a",
         source="GeM bid terms", url="https://apps.powergrid.in/pgciltenders/Files/1b0b5b26-36fe-43d7-bd8f-fbf3806b6d53/GeM-Bidding-7200963.pdf",
         implication="MSE (Startup) status is worth up to a 15% pricing advantage."),
    dict(band="Price dispersion", rule="L1 vs L5 spread, services/works",
         mechanism="observed 5-15%; goods 12-25%", competition="n/a",
         source="Bidovate tender research", url="https://bidindia.co.in/blog/pricing-strategy-government-tenders-l1",
         implication="Buyers anchor on estimates; in 60-70% of tenders L1 lands BELOW the buyer's estimate."),
    dict(band="IT manpower floor", rule="L1 resource not below INR 80,000/month",
         mechanism="bid floor, INR 9,60,000/annum", competition="n/a",
         source="LIC of India tender (ITSM/NMS)",
         url="https://licindia.in/documents/20121/1545279/Corrigendum_7_Annexure+G1+and+G2_Commercial+bid_ITSM+and+NMS.pdf/6435ea02-885f-729d-6f21-c2eccb0be1fc",
         implication=("A REAL institutional IT services price floor. Rs 9.6 lakh/yr is what "
                      "ONE deployed IT resource costs an institution - a useful sanity "
                      "check against Scenario B.")),
]

PROCUREMENT_SUMMARY = dict(
    direct_purchase_ceiling=25_000,
    l1_ceiling=500_000,
    reverse_auction_floor=500_000,
    services_l1_l5_spread_pct=(5, 15),
    mse_advantage_pct=15,
    it_resource_floor_annual=960_000,
    provenance="T1_DOCUMENT",
)


# ==========================================================================
# 3. Internal anchors already established in earlier phases
# ==========================================================================

INTERNAL_ANCHORS = dict(
    committee_trigger_low=50_000,          # Phase 2, 8 instruments
    committee_trigger_high=1_000_000,
    list_price=S.PRICE_SCENARIOS["A"]["acv"],
    required_acv=S.PRICE_SCENARIOS["B"]["acv"],
    ltv_cac=S.ue_summary()["ltv_cac_p50"],
    nit_budget_cr=S.raw("nit_budget_per_institution_cr"),
    nit_unspent_cr=S.raw("nit_unspent_per_institution_cr"),
    sam_low=S.sam_funnel()[-1]["remaining_low"],
    sam_high=S.sam_funnel()[-1]["remaining_high"],
)


# ==========================================================================
# 4. The observed Indian envelope - the central finding
# ==========================================================================

INDIAN_CATEGORIES = ("incubation", "campus")


def indian_envelope():
    """Observed Indian institutional price envelope, excluding free tiers.

    Free products are excluded from the ENVELOPE (they bound the floor, not the
    paid market) but they are reported separately as the substitution problem.
    """
    rows = [c for c in COMPARABLES
            if c["market"] == "India" and c["category"] in INDIAN_CATEGORIES
            and c["inr"] and c["inr"] > 0
            and c["confidence"] not in ("CURRENCY_UNCERTAIN", "AGGREGATOR")]
    paid = [c for c in rows if c["inr"] >= 10_000]
    return dict(
        rows=paid,
        low=min(c["inr"] for c in paid),
        high=max(c["inr"] for c in paid),
        free_competitors=[c for c in COMPARABLES if c["inr"] == 0],
        n=len(paid),
    )


def envelope_position(price):
    """Where does a given price sit inside the observed Indian envelope?"""
    e = indian_envelope()
    if price < e["low"]:
        return "BELOW observed paid market"
    if price > e["high"]:
        return "ABOVE observed Indian market"
    return "INSIDE observed envelope"


def scenario_b_gap():
    """How far above the observed Indian market does Scenario B sit?"""
    e = indian_envelope()
    b = INTERNAL_ANCHORS["required_acv"]
    top = max(e["rows"], key=lambda c: c["inr"])
    return dict(
        required_acv=b,
        envelope_high=e["high"],
        envelope_high_vendor=top["vendor"],
        envelope_high_product=top["product"],
        multiple_above_envelope=round(b / e["high"], 2),
        multiple_above_list=round(b / INTERNAL_ANCHORS["list_price"], 2),
        verdict=("Scenario B is ABOVE the entire observed Indian institutional market. "
                 f"The highest Indian comparable found is {top['vendor']} {top['product']} "
                 f"at Rs {top['inr']:,}/year, and Scenario B is {round(b / e['high'], 2)}x that. "
                 "No Indian comparable in this dataset reaches it, at any scope."),
    )


# ==========================================================================
# 5. The six WTP evidence streams
# ==========================================================================
# Each stream yields a BOUND, not a point estimate, and names its source.
# The bracket is the intersection of what is affordable and what is defensible.

WTP_STREAMS = [
    dict(
        n=1, stream="Observed clearing prices",
        question="What do Indian institutional buyers actually pay for software like this?",
        method="Read live vendor price pages for Indian incubation and campus software.",
        bound="₹50,000 - ₹7,20,000",
        low=50_000, high=720_000,
        provenance="VERIFIED_LIVE + PUBLISHED",
        evidence=("Fedena ₹50k/₹75k/₹1L for a FULL ERP with unlimited users; "
                  "NestLens Orbit ₹75k-₹2.5L; IncubatX ₹1.2L-₹7.2L."),
        direction="sets the ceiling",
    ),
    dict(
        n=2, stream="Free-substitute ceiling",
        question="What is the cheapest way for a buyer to say no to us?",
        method="Identify zero-cost substitutes a buyer can adopt instead.",
        bound="₹0",
        low=0, high=10_000,
        provenance="PUBLISHED",
        evidence=("Univation's Incubators Platform is offered FREE to universities and "
                  "nonprofits. Founderhood has a free tier. Founderhood also publishes a "
                  "15% university/nonprofit discount off list."),
        direction="sets the floor and destroys margin at the low end",
    ),
    dict(
        n=3, stream="Procurement-threshold anchoring",
        question="At what price does the buying process change behaviour?",
        method="Phase 2 committee-trigger analysis across 8 institutional instruments.",
        bound="₹50,000 - ₹10,00,000",
        low=50_000, high=1_000_000,
        provenance="T1_DOCUMENT + MODELLED",
        evidence=("Committee-trigger spread is Rs 50,000 to Rs 10,00,000 across the "
                  "instruments reviewed in Phase 2. Below ~Rs 50k a purchase is routine; "
                  "above it, a committee is convened, which lengthens the cycle and "
                  "raises CAC - which is exactly the constraint we are trying to relieve."),
        direction="high ACV is self-defeating on sales-cycle grounds",
    ),
    dict(
        n=4, stream="Government auction compression",
        question="What happens if we sell through GeM or a state tender?",
        method="Published GeM procurement-mode bands and observed bid dispersion.",
        bound="₹25,000 - ₹5,00,000 (pre-auction) then compressed 5-15%",
        low=25_000, high=500_000,
        provenance="T1_DOCUMENT",
        evidence=("GeM L1 band is INR 25,000-5,00,000. Bid and Reverse Auction is "
                  "MANDATORY at INR 5,00,000+. Observed L1-L5 spread for services is "
                  "5-15%, and in 60-70% of tenders L1 lands below the buyer's estimate."),
        direction="caps realised price when selling to government",
    ),
    dict(
        n=5, stream="Value-based ceiling",
        question="What is the pain actually worth?",
        method="Cost-of-failure anchor from the Phase 1 problem corpus.",
        bound="₹1,20,000 - ₹6,00,000",
        low=120_000, high=600_000,
        provenance="MODELLED",
        evidence=("P-A07 (patent deadline tracking absent) is the only CRITICAL finding "
                  "in the Phase 1 corpus. A single missed NIRF/NAAC deadline or a lost "
                  "grant cycle costs far more than an annual subscription, which is why "
                  "value-based pricing can exceed comparables - but only where the "
                  "buyer feels the pain directly."),
        direction="the only stream that can justify a premium",
    ),
    dict(
        n=6, stream="Scope / substitution breadth",
        question="Is our scope bigger or smaller than what buyers can get for less?",
        method="Feature-breadth comparison against the cheapest broad competitor.",
        bound="₹50,000 - ₹1,00,000 (Fedena) is the effective substitute set",
        low=50_000, high=100_000,
        provenance="PUBLISHED",
        evidence=("Fedena sells admissions, attendance, exams, fees, library, hostel, "
                  "transport, payroll, parent portal and mobile apps - strictly MORE than "
                  "StartupHub - at Rs 50,000 to Rs 1,00,000 per institution per year with "
                  "unlimited users. Any price above Rs 1 lakh must be justified on scope, "
                  "and scope is the one axis where we currently lose."),
        direction="the binding constraint on the list price",
    ),
]


WTP_FRAMING = dict(
    finding=("The ceiling depends entirely on WHICH competitor set the buyer accepts. "
             "Judged against campus ERPs, we are capped near Rs 1 lakh. Judged against "
             "incubation platforms, Rs 7.2 lakh is defensible. Judged on cost-of-failure, "
             "Rs 6 lakh is arguable. These are three different answers to three different "
             "questions, and averaging them produces a number that answers none."),
    consequence=("The real pricing decision is not 'what is the market willing to pay' "
                 "but 'which competitor are we actually up against at renewal'. That is a "
                 "sales-positioning choice, not a research finding, which is why it must "
                 "be stated rather than modelled."),
)


def wtp_bracket():
    """Three ceilings, one floor - because the competitive frame sets the ceiling.

    An earlier version took max(stream lows) / min(stream highs), which produced a
    nonsensical CROSSED bracket (floor 120,000 > ceiling 10,000). That was a
    modelling error, not a finding. The mistake was treating the free-substitute
    stream as a ceiling on WTP, when a free alternative actually sets a
    DIFFERENTIAL: the buyer pays only the incremental value over free.

    So the streams are separated into three competitive frames, and the bracket is
    reported per frame. Floor is the cheapest credible PAID position.
    """
    paid = [c for c in indian_envelope()["rows"] if c["inr"] >= 50_000]
    frames = [
        dict(frame="vs campus ERP (broad substitutes)",
             ceiling=100_000, ceiling_basis="Fedena Ultimate, full ERP, unlimited users",
             stream=6,
             read=("Our list price of Rs 1.2L is ALREADY 20% above this ceiling. "
                   "Competing here at Rs 1.2L means being more expensive than a "
                   "strictly broader product.")),
        dict(frame="vs incubation platforms (like-for-like)",
             ceiling=720_000, ceiling_basis="IncubatX Executive AI, top observed tier",
             stream=1,
             read=("Under this frame Rs 1.2L is comfortable and Scenario B's Rs 10.28L "
                   "is still 1.43x above everything observed.")),
        dict(frame="vs cost of failure (value-based)",
             ceiling=600_000, ceiling_basis="P-A07 patent-deadline exposure",
             stream=5,
             read=("Defensible only where the buyer feels the pain directly - i.e. an "
                   "institution with a real grant or accreditation deadline at stake.")),
        dict(frame="vs government procurement (GeM)",
             ceiling=500_000, ceiling_basis="GeM reverse-auction threshold; 5-15% L1-L5 spread",
             stream=4,
             read=("Above Rs 5 lakh the sale becomes an auction and the realised price "
                   "compresses. Effective realised ceiling is below Rs 5 lakh.")),
    ]
    return dict(
        floor=50_000,
        floor_basis="cheapest credible paid position (Fedena Standard, full ERP)",
        frames=frames,
        binding_frame=frames[0],
        provenance="DERIVED-FROM-COMPARABLES",
        note=("Floor is Rs 50,000 - below that we are under market and cannot fund CAC. "
              "The ceiling is frame-dependent, so it is published per frame rather than "
              "collapsed. Against the binding frame (campus ERP) our list price is "
              "already 1.2x the ceiling."),
        list_price_vs_binding_ceiling=round(INTERNAL_ANCHORS["list_price"] / 100_000, 2),
    )


# ==========================================================================
# 6. Models A-F, scored against the observed market
# ==========================================================================

MODELS = [
    dict(
        key="A", name="Flat Rs 50,000/year", spec="₹50k/year",
        mechanic="flat institutional subscription",
        where_on_ladder="bottom of the observed paid market",
        comparable="Fedena Standard (₹50k, full ERP, unlimited users)",
        verdict="VIABLE but not distinctive",
        why=("Matches Fedena's entry tier exactly while offering far less scope. "
             "Would be priced against a full ERP rather than against a niche tool."),
        arr_at_sam=(50_000, 50_000),
    ),
    dict(
        key="B", name="Flat Rs 1,20,000/year", spec="₹1.2L/year",
        mechanic="flat institutional subscription (current list price)",
        where_on_ladder="top of the observed Indian market",
        comparable="IncubatX Foundation (₹1.2L-₹1.8L/yr); above Fedena Ultimate (₹1L)",
        verdict="DEFENSIBLE ONLY AGAINST INCUMBENTS, NOT AGAINST ERP",
        why=("Equal to IncubatX's entry tier and 20% above Fedena's full ERP. Needs a "
             "scope argument against ERP vendors that we currently cannot make."),
        arr_at_sam=(120_000, 120_000),
    ),
    dict(
        key="C", name="Flat Rs 2-5 lakh/year", spec="₹2-5L/year",
        mechanic="flat institutional subscription, premium tier",
        where_on_ladder="inside IncubatX Accelerator/Executive AI and NestLens Scale",
        comparable="IncubatX Accelerator ₹3.6-4.8L; NestLens Orbit Scale ₹2.5L",
        verdict="ABOVE THE BRACKET ON MOST EVIDENCE",
        why=("Defensible only against direct incubation-platform competitors, and it "
             "crosses the GeM ₹5 lakh reverse-auction threshold at the top of the band."),
        arr_at_sam=(200_000, 500_000),
    ),
    dict(
        key="D", name="Per-user pricing", spec="per-user",
        mechanic="per named seat per year",
        where_on_ladder="well established - Zoho ₹800-₹2,600/user/mo",
        comparable="Zoho CRM ₹9,600-₹31,200/user/year",
        verdict="STRUCTURALLY WRONG FOR INSTITUTIONS",
        why=("Institutions cap the seats that touch innovation data at a handful "
             "(Phase 2 found 25 roles, only 4 with documented budget authority). "
             "Per-user pricing would collapse ACV to a few thousand rupees. Note Zoho "
             "requires a 25-licence minimum for Lite seats - the same trap."),
        arr_at_sam=(48_000, 144_000),
    ),
    dict(
        key="E", name="Institution + number of startups", spec="base + per-startup",
        mechanic="platform fee plus a fee per incubated startup tracked",
        where_on_ladder="matches how IncubatX and NestLens actually scale",
        comparable="IncubatX 'up to 4 cohorts'; NestLens 'scales with cohort size'",
        verdict="THE MODEL THE INCUMBENTS USE",
        why=("Aligns price with the thing the institution is actually measured on - "
             "the cohort. Directly parallels the SISFS scheme, which pays incubators "
             "5% management fee on the grant value they administer."),
        arr_at_sam=(250_000, 700_000),
    ),
    dict(
        key="F", name="Base platform + premium modules", spec="base + modules",
        mechanic="core subscription plus paid add-on modules",
        where_on_ladder="proven - IncubatX Media Kit ₹15k/mo; incuTrack add-ons",
        comparable="IncubatX Media Kit add-on; incuTrack Mentor Matching/Surveys/Events",
        verdict="PROVEN LAND-AND-EXPAND",
        why=("Lets us enter low (Model A/B) and expand with the buyer instead of "
             "front-loading the whole price at the first committee meeting."),
        arr_at_sam=(200_000, 800_000),
    ),
]


def model_matrix():
    rows = []
    for m in MODELS:
        rows.append(dict(
            key=m["key"], name=m["name"], spec=m["spec"], mechanic=m["mechanic"],
            where=m["where_on_ladder"], comparable=m["comparable"],
            verdict=m["verdict"], why=m["why"],
            arr_low=m["arr_at_sam"][0], arr_high=m["arr_at_sam"][1],
            arr_low_cr=round(m["arr_at_sam"][0] / 1e7, 2),
            arr_high_cr=round(m["arr_at_sam"][1] / 1e7, 2),
        ))
    return rows


def per_user_failure():
    """Model D arithmetic: why per-user pricing collapses institutional ACV."""
    roles = dict(total=25, budget_authority=4)
    zoho_lo, zoho_hi = 9_600, 31_200
    return dict(
        roles_total=roles["total"], roles_with_authority=roles["budget_authority"],
        acv_at_5_seats=(zoho_lo * 5, zoho_hi * 5),
        acv_at_10_seats=(zoho_lo * 10, zoho_hi * 10),
        note=("Phase 2 found 25 roles touching innovation data and only 4 with "
              "documented budget authority. At Zoho's published per-user rates, a "
              "5-10 seat deployment pays Rs 48,000-3,12,000 a year - below the flat "
              "list price, and with no floor because Zoho itself imposes a 25-licence "
              "minimum on Lite seats."),
    )


# ==========================================================================
# 7. WTP instrument - built, NOT executed
# ==========================================================================
# User decision: build the instrument, publish no results.

WTP_INSTRUMENT = dict(
    name="Institutional WTP instrument - Van Westendorp + Gabor-Granger",
    status="INSTRUMENT ONLY - NOT ADMINISTERED - 0 RESPONSES",
    n_responses=0,
    administered=False,
    why=("Van Westendorp yields an acceptable price interval and Gabor-Granger "
         "yields a demand curve. Both require asking buyers. Neither can be "
         "simulated into legitimacy, so no results are published."),
    van_westendorp=[
        dict(qid="VW1", kind="open", text=(
            "What is the least you would be willing to pay per year for a system that "
            "produced a defensible innovation report without manual assembly?")),
        dict(qid="VW2", kind="open", text=(
            "At what price would you consider the purchase too expensive to justify "
            "to your finance office?")),
        dict(qid="VW3", kind="open", text=(
            "At what price would you begin to seriously consider it?")),
        dict(qid="VW4", kind="open", text=(
            "At what price would it feel cheap - that you would be delighted to have "
            "budget for it?")),
    ],
    gabor_granger_ladder=[50_000, 100_000, 150_000, 200_000, 300_000, 500_000, 750_000, 1_000_000],
    ladder_basis=("Anchored on the observed Indian envelope (Rs 50k-7.2L) and "
                  "straddling both Phase 7 scenarios (Rs 1.2L and Rs 10.28L)."),
    probing_questions=[
        dict(qid="G1", text=("Who else would have to approve this budget line, and what "
                             "is their threshold for convening a committee?"),
             measures="buying-process friction (Phase 2 committee trigger spread)"),
        dict(qid="G2", text=("What does your institution spend today on this - including "
                             "staff time - even if the answer is zero rupees of software?"),
             measures="revealed current spend, the real substitute price"),
        dict(qid="G3", text=("If you lost your current manual process tomorrow, what "
                             "would that cost you in a missed deadline or a lost grant?"),
             measures="value-based ceiling (stream 5)"),
        dict(qid="G4", text=("Would you pay more if the system also produced your NIRF "
                             "and NAAC submission artefacts automatically?"),
             measures="premium headroom for Model F modules"),
    ],
    coding_note=("Reuse the Phase 3B protocol, consent form and coding scheme. Do not "
                 "create a parallel interview regime."),
)


# ==========================================================================
# 8. Validation
# ==========================================================================

def validation():
    errs, warns = [], []

    # Every comparable must be traceable.
    for c in COMPARABLES:
        for f in ("vendor", "product", "category", "market", "url", "confidence", "scope"):
            if not c.get(f) and c.get(f) != 0:
                errs.append(f"comparable '{c.get('vendor','?')}/{c.get('product','?')}' missing {f}")
        if c["confidence"] not in CONFIDENCE:
            errs.append(f"comparable '{c['vendor']}' has unknown confidence '{c['confidence']}'")
        if c["category"] not in ("incubation", "campus", "crm", "innovation",
                                 "enterprise", "procurement"):
            errs.append(f"comparable '{c['vendor']}' has unknown category '{c['category']}'")

    # The seven categories the spec names must all be represented.
    spec_categories = {
        "institutional SaaS": {"incubation", "campus", "enterprise"},
        "incubation management": {"incubation"},
        "campus management": {"campus"},
        "CRM": {"crm"},
        "innovation management": {"innovation"},
        "enterprise SaaS": {"enterprise", "crm"},
        "government procurement": {"procurement"},
    }
    present = {c["category"] for c in COMPARABLES}
    for name, cats in spec_categories.items():
        if not (cats & present):
            errs.append(f"spec category '{name}' has no comparables")

    # Models A-F all present, with ladder positions.
    if {m["key"] for m in MODELS} != set("ABCDEF"):
        errs.append("Models A-F are not all defined")
    for m in MODELS:
        if not m.get("verdict") or not m.get("comparable") or not m.get("why"):
            errs.append(f"Model {m['key']} missing verdict/comparable/rationale")

    if len(WTP_STREAMS) < 6:
        errs.append(f"{len(WTP_STREAMS)} WTP streams; six were specified")
    for s in WTP_STREAMS:
        for f in ("stream", "bound", "low", "high", "provenance", "evidence"):
            if s.get(f) in (None, ""):
                errs.append(f"WTP stream {s.get('n')} missing {f}")
        if s["low"] > s["high"]:
            errs.append(f"WTP stream {s['n']} has an inverted band")

    # THE HARD GUARD: no WTP figure may claim to be measured.
    blob = str(WTP_INSTRUMENT) + str(MODELS) + str(WTP_STREAMS)
    for bad in ("respondents said", "interviewees reported", "interviews show",
                "buyers told us", "customers said", "van westendorp result",
                "gabor-granger result"):
        if bad in blob.lower():
            errs.append(f"fabricated-research phrasing: '{bad}'")
    if WTP_INSTRUMENT["administered"] or WTP_INSTRUMENT["n_responses"] != 0:
        errs.append("the WTP instrument claims to have been administered; it has not been")
    if wtp_bracket()["provenance"] != "DERIVED-FROM-COMPARABLES":
        errs.append("the WTP bracket must be labelled DERIVED-FROM-COMPARABLES")
    # The list price must not be allowed to sit silently above the binding ceiling.
    b = wtp_bracket()
    if INTERNAL_ANCHORS["list_price"] > b["binding_frame"]["ceiling"]:
        # This is a real finding, not an error - but it MUST be surfaced in the docs.
        warns.append(
            f"list price Rs {INTERNAL_ANCHORS['list_price']:,} exceeds the binding "
            f"ceiling Rs {b['binding_frame']['ceiling']:,} "
            f"({b['list_price_vs_binding_ceiling']}x) - must be stated in Price_Recommendation")
    for f in b["frames"]:
        if f["ceiling"] < b["floor"]:
            errs.append(f"WTP frame '{f['frame']}' ceiling is below the floor")
    if INTERNAL_ANCHORS["ltv_cac"] >= 3.0:
        errs.append("Phase 5/7 established LTV/CAC below 3.0; the premise of this phase is broken")

    for b in PROCUREMENT_BANDS:
        if not b.get("source") or not b.get("url"):
            errs.append(f"procurement band '{b['band']}' missing source or url")

    return errs, warns


# ==========================================================================
# 9. Summary
# ==========================================================================

def summary():
    e = indian_envelope()
    g = scenario_b_gap()
    b = wtp_bracket()
    return dict(
        schema_version=SCHEMA_VERSION, build_date=BUILD_DATE,
        comparables=len(COMPARABLES),
        categories=sorted({c["category"] for c in COMPARABLES}),
        live_verified=sum(1 for c in COMPARABLES if c["confidence"] == "VERIFIED_LIVE"),
        conflicts_recorded=sum(1 for c in COMPARABLES if c["confidence"] == "CONFLICT"),
        free_competitors=len(e["free_competitors"]),
        indian_envelope_low=e["low"], indian_envelope_high=e["high"],
        list_price=INTERNAL_ANCHORS["list_price"],
        list_price_position=envelope_position(INTERNAL_ANCHORS["list_price"]),
        list_price_vs_erp_ceiling=b["list_price_vs_binding_ceiling"],
        required_acv=INTERNAL_ANCHORS["required_acv"],
        required_acv_position=envelope_position(INTERNAL_ANCHORS["required_acv"]),
        scenario_b_gap_x=g["multiple_above_envelope"],
        wtp_floor=b["floor"],
        wtp_ceilings={f["frame"]: f["ceiling"] for f in b["frames"]},
        binding_frame=b["binding_frame"]["frame"],
        models=len(MODELS), wtp_streams=len(WTP_STREAMS),
        instrument_administered=False, interviews=0,
    )


def _print(s=""):
    """Console is cp1252 on Windows; the rupee sign is not encodable there."""
    try:
        print(s)
    except UnicodeEncodeError:
        print(s.replace("₹", "Rs ").encode("ascii", "replace").decode("ascii"))


if __name__ == "__main__":
    import json
    _print(json.dumps(summary(), indent=2, ensure_ascii=False))
    e = indian_envelope()
    _print(f"\nOBSERVED INDIAN ENVELOPE  Rs {e['low']:,} - Rs {e['high']:,}  ({e['n']} paid comparables)")
    for c in sorted(e["rows"], key=lambda c: c["inr"]):
        _print(f"   Rs {c['inr']:>9,}  {c['vendor']:<28} {c['product']}")
    _print("\nFREE SUBSTITUTES (the floor problem)")
    for c in e["free_competitors"]:
        _print(f"   Rs 0         {c['vendor']:<28} {c['product']}")
    b = wtp_bracket()
    _print(f"\nWTP FLOOR  Rs {b['floor']:,}   ({b['floor_basis']})")
    _print("WTP CEILINGS - frame dependent, never averaged:")
    for f in b["frames"]:
        _print(f"   Rs {f['ceiling']:>9,}  {f['frame']:<42} ({f['ceiling_basis']})")
    _print(f"\n   list price Rs {INTERNAL_ANCHORS['list_price']:,} vs binding ceiling "
           f"Rs {b['binding_frame']['ceiling']:,} = {b['list_price_vs_binding_ceiling']}x")
    _print("\nSCENARIO POSITIONS")
    for label, p in (("A list price", INTERNAL_ANCHORS["list_price"]),
                     ("B required ACV", INTERNAL_ANCHORS["required_acv"])):
        _print(f"   {label:<16} Rs {p:>10,}   {envelope_position(p)}")
    _print()
    errs, warns = validation()
    _print(f"errors: {errs or 'none'}")
    _print(f"warns : {warns or 'none'}")