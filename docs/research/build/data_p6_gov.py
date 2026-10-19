#!/usr/bin/env python3
"""StartupHub Phase 6 - Government & Official Data, and the State Startup Ranking.

todo.md PHASE 6 names thirteen primary sources and singles out the States'
Startup Ranking reports as worth extra attention. They are, and not for the
reason the spec gives.

WHY THE STATE RANKING MATTERS MORE THAN A REPORT:

  It is the only artefact found in this project that describes a BUYER that
  Phases 0-5 never modelled - the State Startup Nodal Department - and it
  simultaneously exposes an INCUMBENT that Phase 0's 15-vendor competitor scan
  missed entirely: every participating state already runs a startup portal
  holding a venture registry.

  A state is scored, on a 75-point framework, on whether it has:
    - an active State Startup Policy
    - a Nodal Officer, a Nodal Department and a Dedicated Team
    - the NUMBER OF STARTUPS AVAILING INSTITUTIONAL SUPPORT

  That last item is a venture register. Scored annually, by the union, in public.

FOLDER NAMING - A DIVERGENCE WE DECLARE RATHER THAN HIDE:

  todo.md PHASE 6 asks for `04_Government_Data`. That prefix is already taken
  by `04_Competitor_DeepDive`. This repository already runs two folders per
  numeric prefix (00_, 01_, 02_ and 03_ each have two), and
  `05_Government_Data` already exists as an empty placeholder that todo.md's own
  status table points at. So we use `05_Government_Data`, alongside
  `05_Market_Sizing`, and record the divergence here.

THE FINDING THAT CUTS BOTH WAYS:

  We mined six per-state reports, deliberately spread across performance tiers.
  We could not obtain a SINGLE report for any Emerging-tier state. The states
  that need a product like this most are the least documented - the same
  publication bias Phase 1 already hit with self-publishing institutions
  (recorded there as OQ-21). We do not treat that as a gap to be filled by
  assumption; we treat it as a finding about who is invisible in the data.

Usage:  python build/data_p6_gov.py
"""

import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))

import data_p1_iic_records as R    # noqa: E402  (for SRF-banded mentor scoring)

SCHEMA_VERSION = "1.0"
BUILD_DATE = "2026-10-19"

FOLDER = "05_Government_Data"


# ==========================================================================
# 1. Source map - all thirteen bodies the spec names
# ==========================================================================
# `access` is the field that matters most and the one Phase 0 never recorded.
# OQ-04 ("no public API in the mandated stack") is really a statement about
# ACCESS, and access has to be mapped before anything can integrate.

ACCESS = {
    "OPEN_PDF": "public PDF, no login",
    "OPEN_HTML": "public web page, no login",
    "OPEN_DATA": "public machine-readable data",
    "REGISTER_GATED": "registration required for detail",
    "LOGIN_GATED": "login required - cannot be bulk-harvested",
    "PRESS_ONLY": "figures only via press releases, no underlying dataset",
}

SOURCE_MAP = [
    dict(n=1, body="DPIIT", ministry="Commerce & Industry",
         publishes="Startup recognition, TRL recognition ladder, recognition numbers, sector categorisation",
         form="HTML + press releases", access="REGISTER_GATED",
         machine_readable=False, buyer_relevant=True,
         note="197,692 recognised startups (Oct 2025). The recognition number is the join key Phase 3A proved institutions do not hold."),
    dict(n=2, body="Startup India", ministry="Commerce & Industry (Invest India)",
         publishes="Ecosystem map, incubator schemes, state startup policies, States' Startup Ranking portal",
         form="HTML portal + PDF", access="OPEN_HTML",
         machine_readable=False, buyer_relevant=True,
         note="Hosts the SRF and every state policy PDF. The single richest source in this phase."),
    dict(n=3, body="Ministry of Education (MoE)", ministry="MoE",
         publishes="Innovation Cell, IIC framework, IIC portal counters",
         form="HTML + PDF", access="OPEN_HTML",
         machine_readable=False, buyer_relevant=True,
         note="Source of the 16,367 IIC figure and the '48th GII rank' claim."),
    dict(n=4, body="Department of Higher Education", ministry="MoE",
         publishes="Annual budget, AISHE, NIRF framework",
         form="PDF budget + HTML", access="OPEN_PDF",
         machine_readable=True, buyer_relevant=True,
         note="FY 2025-26 DoHE Rs 50,078 cr. Already mined in Phase 5."),
    dict(n=5, body="NIRF", ministry="MoE",
         publishes="Rankings, per-institution submitted innovation data (777 Innovation filers)",
         form="PDF + submitted PDFs", access="OPEN_PDF",
         machine_readable=False, buyer_relevant=True,
         note="The only public source of institutions' own submitted innovation data. Mined in Phase 3A."),
    dict(n=6, body="AICTE", ministry="Education",
         publishes="Approved institutions list, technical education regulation",
         form="HTML lists", access="OPEN_HTML",
         machine_readable=False, buyer_relevant=False,
         note="Budget CUT 50% to Rs 200 cr in FY 2025-26. Approved-institution count not published as a single figure (OQ-02)."),
    dict(n=7, body="UGC", ministry="Education",
         publishes="Grants, university lists, accreditation",
         form="HTML + PDF", access="OPEN_HTML",
         machine_readable=False, buyer_relevant=False,
         note="Rs 3,336 cr FY 2025-26. Uses a different frame for 'university' than AISHE (OQ-06)."),
    dict(n=8, body="IIC / MIC portal", ministry="MoE Innovation Cell",
         publishes="IIC registry, quarterly activity reports, scoring",
         form="Web application", access="LOGIN_GATED",
         machine_readable=False, buyer_relevant=True,
         note="The mandated stack's most important dataset and the least accessible. OQ-22 (actual filing rate) is unanswerable because of this."),
    dict(n=9, body="Invest India", ministry="Commerce & Industry",
         publishes="Investment facilitation data, state-wise investment",
         form="HTML + reports", access="OPEN_HTML",
         machine_readable=False, buyer_relevant=False,
         note="Overlaps DPIIT/Startup India. Not separately mined."),
    dict(n=10, body="DST (NIDHI)", ministry="Science & Technology",
         publishes="PRAYAS 2.0, TBI, iTBI, Seed Support, Accelerator, CoE guidelines",
         form="HTML + PDF guidelines", access="OPEN_PDF",
         machine_readable=False, buyer_relevant=True,
         note="Guidelines are public; per-incubator disbursement is not. PRAYAS Centres Rs 20L, Advance PRAYAS Rs 40L."),
    dict(n=11, body="MeitY (TIDE 2.0)", ministry="Electronics & IT",
         publishes="TIDE 2.0 centres, MeitY Startup Hub",
         form="HTML + PDF", access="OPEN_HTML",
         machine_readable=False, buyer_relevant=True,
         note="51 incubators, ~2000 startups over 5 years. Grant up to Rs 27.2 cr - the LARGEST incubator grant found."),
    dict(n=12, body="State Startup Missions", ministry="State governments",
         publishes="State startup policy, nodal officer/department, startup portal, incubator list",
         form="Per-state PDF + portal", access="OPEN_PDF",
         machine_readable=False, buyer_relevant=True,
         note="THE BUYER. 31 of 36 States/UTs have a startup policy; 34 participated in SRF 5.0."),
    dict(n=13, body="State Innovation Councils", ministry="State governments",
         publishes="Legacy tier-1 AICTE innovation council listings",
         form="HTML lists", access="OPEN_HTML",
         machine_readable=False, buyer_relevant=False,
         note="Predates IIC/AIM. Largely dormant and frequently superseded. Listed for completeness only."),
]

# The access pattern is itself a finding.
ACCESS_TALLY = {}


def access_summary():
    from collections import Counter
    c = Counter(s["access"] for s in SOURCE_MAP)
    return dict(c)


# ==========================================================================
# 2. States' Startup Ranking - framework evolution
# ==========================================================================

SRF_EDITIONS = [
    dict(edition=1, year=2018, reform_areas=7, action_points=38, total_marks=100,
         participating=30, source="DIPP evaluation methodology, F.No. P-38015/9/2018",
         areas=["Startup Policy and implementation", "Incubation support",
                "Seed funding support", "Funding support - Angel and Venture",
                "Simplified regulations", "Easing public procurement",
                "Awareness and outreach"]),
    dict(edition=4, year=2022, reform_areas=7, action_points=25, total_marks=100,
         participating=33, complete_submissions=17,
         source="SRF 2022 National Report",
         areas=["Institutional Support", "Fostering Innovation and Entrepreneurship",
                "Access to Market", "Incubation and Mentorship Support",
                "Funding Support", "Capacity Building of Enablers",
                "Roadmap to a Sustainable Future"],
         weights=dict(documents=85, startup_feedback=15, private_mapping=0),
         note="15% of total score came from 10,000+ startup survey responses in 9 languages."),
    dict(edition=5, year=2026, reform_areas=6, action_points=19, total_marks=75,
         participating=34, complete_submissions=24,
         source="SRF 5.0 National Report (15-01-26)",
         areas=["Institutional Support", "Infrastructure Support", "Funding Opportunities",
                "Market Access & Reach", "Ecosystem Capacity Building",
                "Focus on Innovation and Sustainability"],
         weights=dict(documents=75, startup_feedback=15, private_mapping=10),
         note=("First edition to add Private Ecosystem Mapping at 10%. 3,800+ documents, "
               "12 evaluation committee meetings, ~26 lakh data points. "
               "Consideration period 1 Jan 2023 - 30 Nov 2024.")),
]

SRF_5_0_PILLARS = [
    dict(area="Institutional Support", marks=25, action_points=6, absolute=6, relative=1),
    dict(area="Infrastructure Support", marks=12, action_points=2, absolute=2, relative=0),
    dict(area="Funding Opportunities", marks=12, action_points=3, absolute=3, relative=0),
    dict(area="Market Access & Reach", marks=11, action_points=3, absolute=2, relative=3),
    dict(area="Ecosystem Capacity Building", marks=9, action_points=3, absolute=2, relative=1),
    dict(area="Focus on Innovation and Sustainability", marks=6, action_points=2, absolute=2, relative=0),
]

CATEGORIES_5_0 = dict(
    A1="population over 5 crore", A2="population over 1 crore and under 5 crore",
    B="population under 1 crore",
)

SRF_RESULTS_5_0 = {
    "Best Performer": [("Gujarat", "A1"), ("Arunachal Pradesh", "B"), ("Goa", "B")],
    "Top Performer": [("Karnataka", "A1"), ("Punjab", "A2"), ("Tamil Nadu", "A1"),
                      ("Uttar Pradesh", "A1"), ("Himachal Pradesh", "B")],
    "Leader": [("Rajasthan", "A1"), ("Kerala", "A2"), ("Madhya Pradesh", "A1"),
               ("Uttarakhand", "A2"), ("Telangana", "A2"), ("Maharashtra", "A1"),
               ("Andhra Pradesh", "A2"), ("Haryana", "A2"), ("Manipur", "B"),
               ("Nagaland", "B"), ("Meghalaya", "B")],
    "Aspiring Leader": [("Assam", "A2"), ("Odisha", "A2"), ("Bihar", "A1"),
                        ("Jammu and Kashmir", "A2"), ("Sikkim", "B"), ("Tripura", "B"),
                        ("Mizoram", "B"), ("Andaman and Nicobar Islands", "B")],
    "Emerging Startup Ecosystem": [("Chhattisgarh", "A2"), ("NCT of Delhi", "A2"),
                                   ("Puducherry", "B"), ("Chandigarh", "B"),
                                   ("Dadra and Nagar Haveli and Daman and Diu", "B"),
                                   ("Lakshadweep", "B"), ("Ladakh", "B")],
}

SRF_RESULTS_2022 = {
    "Best Performer": [("Gujarat", "A"), ("Karnataka", "A"), ("Kerala", "A"), ("Tamil Nadu", "A")],
    "Top Performer": [("Maharashtra", "A"), ("Odisha", "A"), ("Punjab", "A"),
                      ("Rajasthan", "A"), ("Telangana", "A")],
    "Leader": [("Andhra Pradesh", "A"), ("Assam", "A"), ("Madhya Pradesh", "A"),
               ("Uttar Pradesh", "A"), ("Uttarakhand", "A")],
    "Aspiring Leader": [("Bihar", "A"), ("Haryana", "A")],
    "Emerging Ecosystems": [("Chhattisgarh", "A"), ("Delhi", "A"), ("Jammu and Kashmir", "A")],
    "Category B - Best": [("Himachal Pradesh", "B")],
    "Category B - Top": [("Arunachal Pradesh", "B"), ("Meghalaya", "B")],
    "Category B - Leader": [("Goa", "B"), ("Manipur", "B"), ("Tripura", "B")],
}

TIER_ORDER = ["Best Performer", "Top Performer", "Leader",
              "Aspiring Leader", "Emerging Startup Ecosystem"]


def tier_movement():
    """States that moved DOWN between the 4th and 5th editions."""
    def rank(d, tier_labels):
        out = {}
        for t in tier_labels:
            for i, (st, cat) in enumerate(d.get(t, [])):
                out.setdefault(st, t)
        return out

    r22 = rank(SRF_RESULTS_2022, ["Best Performer", "Top Performer", "Leader",
                                  "Aspiring Leader", "Emerging Ecosystems"])
    r26 = rank(SRF_RESULTS_5_0, TIER_ORDER)
    moved = []
    for st, t22 in r22.items():
        t26 = r26.get(st)
        if not t26 or t26 == t22:
            continue
        try:
            delta = TIER_ORDER.index(t26) - TIER_ORDER.index(t22)
        except ValueError:
            continue
        if delta > 0:
            moved.append(dict(state=st, from_tier=t22, to_tier=t26, tiers_fell=delta))
    return sorted(moved, key=lambda x: -x["tiers_fell"])


# ==========================================================================
# 3. State reports actually mined - deliberately tier-spread
# ==========================================================================

STATE_REPORTS_MINED = [
    dict(state="Gujarat", tier_5_0="Best Performer", category="A1",
         portal="State Startup Portal", pages=28, chars=35072,
         verified_facts={"incubators_listed": 250},
         note="One of the first movers in setting up a startup portal; average grievance resolution seven days (per SRF 2022 summary)."),
    dict(state="Tamil Nadu", tier_5_0="Top Performer", category="A1",
         portal="Startup TN 5", pages=32, chars=34081,
         verified_facts={"active_policies": "15+", "avg_query_resolution_days": 15,
                         "funding_up_to_inr_lakh": 15},
         note="Bilingual portal (English + Tamil). Query resolution reported as ~15 days in the 2022 summary."),
    dict(state="Himachal Pradesh", tier_5_0="Top Performer", category="B",
         portal="dedicated Startup portal", pages=28, chars=31248,
         verified_facts={"avg_query_resolution_days": 14, "mentors_listed": 60,
                         "seed_fund_inr_crore": 10},
         note="Category B but runs a Rs 10 crore seed fund - a forward-looking budget signal, unusual for a sub-1-crore-population state."),
    dict(state="Telangana", tier_5_0="Leader", category="A2",
         portal=None, pages=28, chars=33595,
         verified_facts={"avg_query_resolution_days": 16},
         note="Portal name not stated in the report text we extracted."),
    dict(state="Kerala", tier_5_0="Leader", category="A2",
         portal=None, pages=32, chars=34800,
         verified_facts={},
         note="Fell from Best Performer (2022) to Leader (5.0). No probe hit in our extraction."),
    dict(state="Bihar", tier_5_0="Aspiring Leader", category="A1",
         portal=None, pages=32, chars=33828,
         verified_facts={"active_policies": 10, "seed_grant_up_to_inr_lakh": 10},
         note="Largest Category A state by population, an Aspiring Leader. Policy offers incubators 3% of incubatee SEBI AIF investment, matched 1:1 by government."),
]

STATE_REPORTS_UNAVAILABLE = [
    dict(state=s, tier_5_0=t, reason="no per-state report published at the SRF results path; "
                                     "filename variants tried and returned HTML error pages")
    for s, t in [("Odisha", "Aspiring Leader"), ("Meghalaya", "Leader"),
                 ("Puducherry", "Emerging"), ("Goa", "Emerging/Best"),
                 ("Chhattisgarh", "Emerging"), ("NCT of Delhi", "Emerging")]
]

EMERGING_TIER_COVERAGE = dict(
    tiers_targeted=5, tiers_with_reports=4,
    emerging_tier_reports_obtained=0,
    finding=("ZERO Emerging-tier state reports could be obtained. The tier that needs "
             "this product most is the least documented in public data."),
)


# ==========================================================================
# 4. State startup portals - the incumbent Phase 0 missed
# ==========================================================================

STATE_PORTALS = dict(
    finding=("Every SRF-participating state is scored on having a functional startup "
             "portal offering single-window services. Every state therefore ALREADY "
             "runs software that holds a venture registry."),
    evidence=[
        "SRF Institutional Support Action Point 1: access to information through a State Startup Portal, 12 parameters",
        "Portal scope: startup registration, policy and clearances, nodal officer details, list of incubators and accelerators, list of mentors, public procurement relaxation details, funding support, grievance redressal",
        "Tamil Nadu 'Startup TN 5': bilingual, 15+ active policies, ~15 day query resolution",
        "Gujarat: average grievance resolution seven days",
        "Himachal Pradesh: dedicated startup portal, 14 day query resolution, 60 mentors listed",
    ],
    competitor_implication=("Phase 0 scanned 15 vendors and found none covering this. The "
                            "miss is the same coverage defect as OQ-04 (no public API in the "
                            "mandated stack): we inventoried private vendors and not public "
                            "infrastructure."),
    strategic_question=("Is a state portal a competitor, a data source, a partner, or an "
                        "integration target? We cannot answer that without opening one. "
                        "Recorded as OPEN, not resolved by assumption."),
)


# ==========================================================================
# 5. Incubator funding schemes - forward-looking money for institutions
# ==========================================================================
# This CORRECTS Phase 5, which found AIM's grant the only forward-looking signal.
# There are four central schemes and at least three flow to degree institutions.

INCUBATOR_SCHEMES = [
    dict(scheme="TIDE 2.0", ministry="MeitY", grant_max_crore=27.2, duration_years=5,
         beneficiaries="51 incubators, ~2000 tech startups", reaches_institutions=True,
         eligibility="Academic/R&D institutions and incubators with industry linkages; 3 tiers G1C/G2C/G3C",
         note="Largest incubator grant found anywhere in this research."),
    dict(scheme="AIC (Atal Incubation Centre)", ministry="AIM / NITI Aayog",
         grant_max_crore=10, duration_years=5, beneficiaries="244 seed-funded incubators",
         reaches_institutions=True,
         eligibility="Public-funded, private or PPP institutions; 10,000 sq ft built-up space minimum",
         note="Already mined in Phase 5."),
    dict(scheme="BioNest", ministry="DBT / BIRAC", grant_max_crore=None, duration_years="3-5",
         beneficiaries="BioNests at academic/research institutes", reaches_institutions=True,
         eligibility="Academic institutes, research hospitals, existing incubators; private partners contribute 20% capex",
         note="Grant amount is project-dependent; not published as a ceiling."),
    dict(scheme="TBI (Technology Business Incubator)", ministry="DST / NSTEDB",
         grant_max_crore=None, duration_years=5, beneficiaries="TBIs nationwide",
         reaches_institutions=True,
         eligibility="Not-for-profit entity; host institution must exist 3+ years",
         note="Grant amount not stated in the public guidelines."),
]

STATE_POLICY_EXAMPLES = [
    dict(state="Assam", provision="75% grant, capped at Rs 5 crore, for incubation centres",
         target="IITs, engineering colleges, universities, biotechnology parks, IT parks, educational institutions",
         forward_looking=True),
    dict(state="Bihar", provision="Incubators receive 3% of incubatees' SEBI-registered AIF investment; government matches 1:1",
         target="State-supported incubators", forward_looking=True),
    dict(state="Tamil Nadu", provision="Land at nominal lease for 99 years for Startup Parks",
         target="Entrepreneurs including NRIs", forward_looking=True),
    dict(state="Puducherry", provision="Land or built-up space at preferential rates for startup cells",
         target="Startup cells in industrial estates and IT parks", forward_looking=True),
]

# ==========================================================================
# 6. SRF mentorship bands - a rubric we can borrow
# ==========================================================================
# SRF scores a state on the number of mentors it provides, with explicit bands.
# Phase 1 found mentor counts in only 2 of 36 institutions, but where they exist
# we can score them on the government's own scale rather than inventing one.

SRF_MENTORSHIP_BANDS = dict(
    Category_A=[(">80 mentors", 3), ("41-80 mentors", 2), ("1-40 mentors", 1)],
    Category_B=[(">20 mentors", 3), ("10-20 mentors", 2), ("1-9 mentors", 1)],
)


def score_mentorship(n):
    """Score a mentor count on the SRF's own bands. Returns (catA, catB) or None."""
    if n is None or n <= 0:
        return None
    a = 0
    if n > 80:
        a = 3
    elif n >= 41:
        a = 2
    elif n >= 1:
        a = 1
    b = 0
    if n > 20:
        b = 3
    elif n >= 10:
        b = 2
    else:
        b = 1
    return (a, b)


def score_corpus_on_srf():
    """Apply SRF's mentorship bands to the 36-document Phase 1 corpus."""
    out = []
    for r in R.IIC_REPORTS:
        m = (r.get("metrics", {}) or {}).get("faculty_mentors")
        try:
            n = int(str(m).strip()) if m not in (None, "", "0") else None
        except (TypeError, ValueError):
            n = None
        sc = score_mentorship(n)
        out.append(dict(id=r["id"], institution=r.get("institution"),
                        mentors=n, cat_a_score=sc[0] if sc else None,
                        cat_b_score=sc[1] if sc else None))
    scored = [x for x in out if x["cat_a_score"] is not None]
    return dict(
        total=len(out), scoreable=len(scored),
        coverage_pct=round(len(scored) / len(out) * 100, 1),
        cat_a_mean=round(sum(x["cat_a_score"] for x in scored) / len(scored), 2) if scored else None,
        cat_b_mean=round(sum(x["cat_b_score"] for x in scored) / len(scored), 2) if scored else None,
        rows=sorted(out, key=lambda x: (-(x["mentors"] or 0))),
    )


# ==========================================================================
# 7. The new segment - G9
# ==========================================================================

G9_SEGMENT = dict(
    id="G9",
    name="State Startup Nodal Department / Mission",
    types=["State Startup Mission", "IIC institution"],
    population=34, population_basis="States and UTs participating in SRF 5.0",
    activity_scale="Mature", ip_depth="UNKNOWN",
    wtp="Medium", urgency=4, revenue=4,
    quadrant="ACT NOW",
    grade="DOCUMENTED",
    why=("The only buyer found in this project with a budget, a national scorecard and "
         "state-wide scope. Scored annually by the union on an active State Startup "
         "Policy, a Nodal Officer, a Nodal Department, a Dedicated Team, and the number "
         "of startups availing institutional support. That last item IS a venture register."),
    what_they_need="(" + "; ".join([
        "a venture register they can evidence to the union",
        "department-wise support counts for their SRF submission",
        "incubator and mentor lists",
        "grievance tracking with a 30-day resolution clock",
    ]) + ")",
    forcing_event="SRF evaluation cycle; scores published annually in January",
    incumbent="Every participating state already runs a startup portal",
    blocker="Portal replacement is a political decision, not a software decision",
    caveat=("One portal contract wins or loses an entire state. This is a different motion "
            "from institutional selling: fewer, larger, slower deals with a different "
            "procurement path. It is NOT a volume segment."),
)


# ==========================================================================
# 8. Validation
# ==========================================================================

def validation():
    errs, warns = [], []

    if len(SOURCE_MAP) != 13:
        errs.append(f"source map has {len(SOURCE_MAP)} bodies; the spec names 13")
    for s in SOURCE_MAP:
        for field in ("body", "ministry", "publishes", "form", "access", "buyer_relevant"):
            if s.get(field) in (None, ""):
                errs.append(f"source '{s.get('body')}' missing {field}")
        if s["access"] not in ACCESS:
            errs.append(f"source '{s['body']}' has unknown access status '{s['access']}'")

    # SRF editions must stay distinct - the 38->25->19 progression is a finding.
    aps = [e["action_points"] for e in SRF_EDITIONS]
    if len(set(aps)) != len(aps):
        errs.append("SRF editions collapsed to a shared action-point count")
    if not (aps[0] > aps[1] > aps[2]):
        errs.append(f"SRF action-point progression is not monotonically decreasing: {aps}")
    marks = [e["total_marks"] for e in SRF_EDITIONS]
    if marks[0] != marks[1]:
        errs.append("unexpected mark change between editions 1 and 4")

    for e in SRF_EDITIONS:
        for field in ("edition", "year", "reform_areas", "action_points", "total_marks", "source"):
            if e.get(field) in (None, ""):
                errs.append(f"SRF edition {e.get('edition')} missing {field}")

    pillar_total = sum(p["marks"] for p in SRF_5_0_PILLARS)
    pillar_ap = sum(p["action_points"] for p in SRF_5_0_PILLARS)
    if pillar_total != 75:
        errs.append(f"SRF 5.0 pillars sum to {pillar_total}, expected 75")
    if pillar_ap != 19:
        errs.append(f"SRF 5.0 pillars sum to {pillar_ap} action points, expected 19")

    n_states = sum(len(v) for v in SRF_RESULTS_5_0.values())
    if n_states != 34:
        errs.append(f"SRF 5.0 lists {n_states} states; the report says 34")

    # Tier coverage must be explicit, including the gap.
    tiers_covered = {r["tier_5_0"] for r in STATE_REPORTS_MINED}
    if EMERGING_TIER_COVERAGE["emerging_tier_reports_obtained"] != 0:
        errs.append("an Emerging-tier report was claimed; re-verify before changing this")
    if len(STATE_REPORTS_MINED) < 4:
        errs.append(f"only {len(STATE_REPORTS_MINED)} state reports mined; tier coverage requires >= 4 tiers")
    for r in STATE_REPORTS_MINED:
        if "verified_facts" not in r or r["verified_facts"] is None:
            errs.append(f"{r['state']}: no verified_facts recorded (empty is fine, missing is not)")

    sc = score_corpus_on_srf()
    if sc["scoreable"] > 10:
        errs.append(f"{sc['scoreable']} of {sc['total']} institutions now have mentor counts; "
                    "the SRF-scoring limitation note would need revisiting")

    if not STATE_PORTALS["evidence"]:
        errs.append("STATE_PORTALS has no evidence; the incumbent finding would be unsupported")
    if not any(w in STATE_PORTALS["competitor_implication"].lower()
               for w in ("miss", "not inventoried", "blind spot")):
        errs.append("the competitor-coverage miss must stay on the record")
    if "phase 0" not in STATE_PORTALS["competitor_implication"].lower():
        errs.append("the competitor-coverage miss must be attributed to Phase 0")

    if not any(s["reaches_institutions"] for s in INCUBATOR_SCHEMES):
        errs.append("no incubator scheme reaches institutions; Phase 5's correction is lost")

    g = G9_SEGMENT
    for field in ("id", "name", "population", "population_basis", "wtp", "urgency",
                  "revenue", "why", "forcing_event", "incumbent", "caveat"):
        if not g.get(field):
            errs.append(f"G9 missing {field}")
    if g["wtp"] not in ("Low", "Medium", "High"):
        errs.append("G9 willingness-to-pay must be in spec vocabulary")
    if g["ip_depth"] != "UNKNOWN":
        errs.append("G9 ip_depth must stay UNKNOWN like every other segment")

    blob = str(SOURCE_MAP) + str(G9_SEGMENT) + str(STATE_REPORTS_MINED)
    for bad in ["respondents said", "interviewees reported", "they told us", "interviews show"]:
        if bad in blob.lower():
            errs.append(f"fabricated-observation phrasing: '{bad}'")

    return errs, warns


def summary():
    sc = score_corpus_on_srf()
    return dict(
        schema_version=SCHEMA_VERSION, build_date=BUILD_DATE, folder=FOLDER,
        sources_mapped=len(SOURCE_MAP),
        buyer_relevant_sources=sum(1 for s in SOURCE_MAP if s["buyer_relevant"]),
        access_summary=access_summary(),
        srf_action_points=[e["action_points"] for e in SRF_EDITIONS],
        srf_marks=[e["total_marks"] for e in SRF_EDITIONS],
        states_ranked_5_0=sum(len(v) for v in SRF_RESULTS_5_0.values()),
        state_reports_mined=len(STATE_REPORTS_MINED),
        state_reports_unavailable=len(STATE_REPORTS_UNAVAILABLE),
        emerging_tier_reports=EMERGING_TIER_COVERAGE["emerging_tier_reports_obtained"],
        states_fell_tiers=len(tier_movement()),
        corpus_scoreable_on_srf=sc["scoreable"],
        new_segment=G9_SEGMENT["id"],
        interviews_conducted=0,
    )


if __name__ == "__main__":
    import json
    print(json.dumps(summary(), indent=2, ensure_ascii=False))
    print()
    print("ACCESS PATTERN (the finding, not just a table)")
    for k, v in sorted(access_summary().items(), key=lambda x: -x[1]):
        print(f"   {k:<18} {v:>3} of {len(SOURCE_MAP)}")
    print()
    print("SRF EVOLUTION")
    for e in SRF_EDITIONS:
        print(f"   {e['edition']}th ({e['year']}): {e['reform_areas']} areas | "
              f"{e['action_points']:>2} APs | {e['total_marks']:>3} marks | {e['participating']} states")
    print()
    print("TIER MOVEMENT 2022 -> 5.0")
    for m in tier_movement():
        print(f"   {m['state']:<16} {m['from_tier']:<16} -> {m['to_tier']:<26} ({m['tiers_fell']} tiers)")
    print()
    sc = score_corpus_on_srf()
    print(f"CORPUS SCORED ON SRF BANDS: {sc['scoreable']}/{sc['total']} ({sc['coverage_pct']}%)")
    for r in sc["rows"]:
        if r["mentors"]:
            print(f"   {r['institution'][:40]:<42} mentors={r['mentors']:>3}  "
                  f"CatA={r['cat_a_score']}/3  CatB={r['cat_b_score']}/3")
    print()
    print("EMERGING TIER:", EMERGING_TIER_COVERAGE["finding"])
    print()
    e, w = validation()
    print("errors:", e or "none")
    print("warns :", w or "none")