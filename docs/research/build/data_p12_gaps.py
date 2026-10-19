#!/usr/bin/env python3
"""StartupHub Phase 12 - Feature Gap Analysis.

    "For every competitor: what they have, vs what users actually need, vs what
     StartupHub can uniquely provide. ... Your goal is to find 5-7 meaningful
     differentiators, not 50 features."

WHY THIS PHASE IS MOSTLY A SUBTRACTION
---------------------------------------
Phases 0-11 produced 13 positioning gaps and a 40-vendor capability matrix.
The instinct on reaching Phase 12 is to restate those 13 gaps as a feature
roadmap. That is the failure mode the instruction is guarding against, because
the 13 gaps are not equally real and some have been falsified since they were
written.

Three of them died or were contested in the last two phases:

    GAP-03  was "Zero of 29 competitors. Highest-value and most-defensible gap
            in the category." Phase 11's competitor sweep found four vendors
            absent from the matrix, three of which build YUKTI-NIR / IIC
            compliance. It is now 3 of 40, and all three are unproven.

    GAP-01  looked like a 10-vendor gap until you notice 6 of those 10 are
            dedicated technology-transfer platforms that do not touch
            incubation at all. The JOINED set is 4.

    GAP-04  "unified reporting" is largely dead: 28 of 40 vendors build
            reporting natively or better.

So this phase scores all 13 gaps again against 40 vendors, discards the ones
that no longer survive, and lands on the remainder. Six differentiators clear
the bar. A seventh candidate - the deployment shape - is real but is a pricing
and packaging decision rather than a product capability, so it is carried as a
REQUIREMENT rather than promoted into the differentiator set to hit a number.

THE THREE RULES THAT GOVERN EVERY ROW
-------------------------------------
1. A capability held natively or better by half the market is NOT a
   differentiator. That single rule retires reporting, analytics and
   incubation, which three of the 13 gaps leaned on.
2. "Users need it" and "competitors do not build it" are different claims with
   different evidence. Competitor absence is measured across 40 vendors.
   User demand rests on 24 usable review records (Phase 11), none of them from
   an Indian university. Both are shown, separately, on every row.
3. Every differentiator carries a falsifier - the observation that would make
   us drop it. A differentiator nobody could kill is not a strategy.

Usage:  python build/data_p12_gaps.py
"""

import sys
from collections import Counter
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))

import data_p9_competitors as C9                                 # noqa: E402
import data_p10_matrix as M                                      # noqa: E402

SCHEMA_VERSION = "1.0"
BUILD_DATE = "2026-10-19"

ROWS = M.build_rows()
MATRIX = {r["competitor"]: r for r in ROWS}
N_VENDORS = len(ROWS)


# ==========================================================================
# Rule 1 - the saturation test
# ==========================================================================

SATURATION_THRESHOLD = 0.50   # natively-or-better share that retires a claim


def holders(dim):
    """Vendors building a dimension natively or better."""
    return [r["competitor"] for r in ROWS if r[dim] in (2, 3)]


def partial(dim):
    return [r["competitor"] for r in ROWS if r[dim] == 1]


def absent(dim):
    return [r["competitor"] for r in ROWS if r[dim] == 0]


def joined(a, b):
    """Vendors building BOTH dimensions natively. The 'joined to' test."""
    return [r["competitor"] for r in ROWS if r[a] in (2, 3) and r[b] in (2, 3)]


# ==========================================================================
# The 13 gaps, re-scored against 40 vendors
# ==========================================================================
# status values: SURVIVES | NARROWED | CONTESTED | RETIRED
#
# The distinction matters. A NARROWED gap is still real but the set of
# competitors holding it shrank or the joined set is much smaller than the raw
# count. A CONTESTED gap has new entrants with no customer proof - winnable,
# but not the safe harbour it was three phases ago.

GAP_SCORECARD = [
    dict(id="GAP-01", title="IPR / patent portfolio management",
         severity="CRITICAL", verdict="NARROWED",
         dim="ipr",
         holders=len(holders("ipr")),
         holders_list=holders("ipr"),
         joined_n=len(joined("ipr", "incubation")),
         joined_list=joined("ipr", "incubation"),
         note="10 of 40 build IPR, but 6 of those are dedicated tech-transfer "
              "platforms (Wellspring, Helikon, Commercify, SINT.OTRI, KampusCore, "
              "KSS) that never touch incubation. The JOINED set is 4. Of those, only "
              "Protrak/IISc has a named Indian university - and it is IP-only, which is "
              "the reference GAP-13 was narrowed to.",
         phase11_effect="ESI (ipr=3) and IncuMan (ipr=2) both joined in Phase 11."),

    dict(id="GAP-02", title="TRL as a first-class, reportable object",
         severity="CRITICAL", verdict="SURVIVES",
         dim="trl",
         holders=len(holders("trl")),
         holders_list=holders("trl"),
         joined_n=len(holders("trl")),
         joined_list=holders("trl"),
         note="2 of 40 build TRL natively (Inpart, IncuMan); 5 more partially. "
              "Wider than GAP-03 by one vendor and structurally different: it needs "
              "no scheme integration to be useful, and it is the object a NIRF or "
              "IIC return actually asks for.",
         phase11_effect="IncuMan arrived with trl=3. Moved from 1 of 28 to 2 of 40."),

    dict(id="GAP-03", title="YUKTI-NIR / IIC / ARIIA submission workflow",
         severity="CRITICAL", verdict="CONTESTED",
         dim="mandate",
         holders=len(holders("mandate")),
         holders_list=holders("mandate"),
         joined_n=len(holders("mandate")),
         joined_list=holders("mandate"),
         note="WAS 'Zero of 29 competitors. Highest-value and most-defensible gap in "
              "the category.' Now 3 of 40 - all three Phase 11 discoveries, none with "
              "a named customer. IncuMan is private beta; ESI publishes a compliance "
              "export carrying a live '(TODO)'; CSM Technologies is a government "
              "systems integrator, not a product. Zero partial implementations, which "
              "means nobody has solved the easy version either.",
         phase11_effect="THE MOST IMPORTANT CHANGE IN THE STUDY. Not closed - "
                        "contested by entrants with no customer proof."),

    dict(id="GAP-04", title="Unified mandate-spanning reporting",
         severity="HIGH", verdict="RETIRED",
         dim="reporting",
         holders=len(holders("reporting")),
         holders_list=holders("reporting"),
         joined_n=len(joined("mandate", "reporting")),
         joined_list=joined("mandate", "reporting"),
         note="RETIRED by Rule 1. 28 of 40 vendors build reporting natively or better; "
              "exactly 1 has it absent. Reporting is the most saturated capability in "
              "the category. It cannot be a differentiator and should not appear in a "
              "feature roadmap as one.",
         phase11_effect="Phase 11 found no institutional user complaining about "
                        "reporting. The spec's own example table proposed "
                        "'Reporting -> Automated' as a differentiator; that is wrong."),

    dict(id="GAP-05", title="Government-grant disbursement ledger traced to a receipt",
         severity="HIGH", verdict="NARROWED",
         dim="funding",
         holders=len(holders("funding")),
         holders_list=holders("funding"),
         joined_n=len(joined("funding", "reporting")),
         joined_list=joined("funding", "reporting"),
         note="11 of 40 build funding natively and 10 more partially. NestLens Orbit, "
              "IncubatX, VentureLink and AcceleratorApp all do grant tracking; ESI and "
              "IncuMan both carry a grant pipeline. A plain grant ledger is now "
              "table stakes. What is NOT built is tracing a disbursement to a receipt "
              "and to the scheme's utilisation format (NIDHI-SSS, DST-TBI, BIRAC) - "
              "though Orbit already ships those report formats.",
         phase11_effect="ESI and IncuMan both added grant pipelines."),

    dict(id="GAP-06", title="Faculty, Innovation Ambassadors and the non-startup innovator",
         severity="HIGH", verdict="SURVIVES",
         dim=None,
         holders=None,
         holders_list=[],
         joined_n=0,
         joined_list=[],
         note="NOT MEASURED as a Phase 10 dimension, so no honest count exists. Phase 9 "
              "scored 'faculty' as a feature flag: it is held by tech-transfer "
              "platforms and by ZERO incubation platforms, all of which build intake "
              "from 'startup application'. Phase 1 evidence is strong and independent - "
              "15,000 college Innovation Ambassadors, 25,000 school ambassadors, and "
              "institutions splitting innovation funding three ways (innovation / "
              "startup / IPR). The 12 vendors added after Phase 9 were NOT scored on "
              "this axis, which is a gap in the matrix rather than a fact about them.",
         phase11_effect="Not re-checked. Flagged as an unmeasured axis."),

    dict(id="GAP-07", title="Mentor logistics at scale - NDA-tiered visibility",
         severity="HIGH", verdict="NARROWED",
         dim="mentorship",
         holders=len(holders("mentorship")),
         holders_list=holders("mentorship"),
         joined_n=len(holders("mentorship")),
         joined_list=holders("mentorship"),
         note="15 of 40 build mentorship natively, 11 partially - the category's third "
              "most saturated capability. The surviving claim is narrow: visibility "
              "tiered by NDA plus mentor hours logged against scheme utilisation. "
              "incuTrack sells mentor matching as a PAID ADD-ON, which is the clearest "
              "signal that the category treats mentorship as an accessory.",
         phase11_effect="No change."),

    dict(id="GAP-08", title="AI that is auditable instead of just advertised",
         severity="MEDIUM", verdict="NARROWED",
         dim="ai",
         holders=len(holders("ai")),
         holders_list=holders("ai"),
         joined_n=len(holders("ai")),
         joined_list=holders("ai"),
         note="9 of 40 build AI natively, 9 partially, 21 absent. Phase 11 is the "
              "decisive input: NOT ONE user in the retrieved corpus asked for AI. "
              "Phase 11 explicitly listed 'nobody has solved AI-driven incubation' as "
              "NOT SUPPORTED BY EVIDENCE. The auditable framing survives on VentureLink "
              "(logs every score change with actor, value and reason) and on EcoSync's "
              "refusal to publish AI scores at all - two opposing proofs that the audit "
              "trail, not the model, is the thing worth building.",
         phase11_effect="Downgraded from a feature to a posture."),

    dict(id="GAP-09", title="Unincorporated pre-incubation state",
         severity="MEDIUM", verdict="SURVIVES",
         dim=None,
         holders=0,
         holders_list=[],
         joined_n=0,
         joined_list=[],
         note="0 of 40, and no vendor even partially attempts it. Every platform assumes "
              "a registered entity with a DPIIT number and a cap table. Phase 1 shows "
              "why that is wrong for this buyer: NIT Calicut's report attributes 38 of 55 "
              "incubated ventures to an undefined 'others' bucket, 94 activities "
              "produced 0 IPs, and 843 ideas came from just 42 activities. The university's "
              "funnel is overwhelmingly PRE-entity.",
         phase11_effect="Not re-checked. Strongest Phase 1 support of the seven."),

    dict(id="GAP-10", title="Guaranteed migration off forms/spreadsheets/WhatsApp",
         severity="MEDIUM", verdict="SURVIVES",
         dim=None,
         holders=0,
         holders_list=[],
         joined_n=0,
         joined_list=[],
         note="Every vendor CLAIMS migration. Zero sells it as a guaranteed, scoped "
              "engagement with the data carried over - which is the only part the buyer "
              "cares about. Phase 11 sharpened this into something bigger than a "
              "feature: the displaced incumbent is Google Forms and spreadsheets (two "
              "Accubate reviewers name Google Forms explicitly), and the real blocker "
              "is inertia, which nobody in the category addresses because the people "
              "who feel it never go looking for software.",
         phase11_effect="Promoted from a feature to the wedge strategy."),

    dict(id="GAP-11", title="Departments and multi-campus sub-tenancy",
         severity="MEDIUM", verdict="SURVIVES",
         dim=None,
         holders=None,
         holders_list=[],
         joined_n=0,
         joined_list=[],
         note="Multi-site is becoming table stakes (Accubate Enterprise, VentureLink, "
              "NestLens Orbit). What is absent is sub-tenancy per DEPARTMENT with a "
              "departmental P&L and correct SPV-versus-department IP ownership - which is "
              "how Indian universities are actually organised. Phase 9's 'multisite' "
              "flag cannot distinguish the two, so this is asserted from Phase 9's "
              "narrative rather than counted. A known limitation of the matrix.",
         phase11_effect="Not re-checked."),

    dict(id="GAP-12", title="Deployment model an Indian university can actually buy",
         severity="MEDIUM", verdict="SURVIVES_AS_REQUIREMENT",
         dim=None,
         holders=None,
         holders_list=[],
         joined_n=0,
         joined_list=[],
         note="Real but not a product differentiator - it is a packaging decision. "
              "Phase 8 supplies the proof: Fedena sells a FULL college ERP at Rs 1,00,000 "
              "flat with unlimited users, below StartupHub's recommended Rs 1.2 lakh list. "
              "Univation offers a directly comparable platform FREE to universities with "
              "Google Ads credit. Free is an active price in this market and the entry "
              "shape is a requirement, not an advantage.",
         phase11_effect="Unchanged. Phase 11 found a second free competitor."),

    dict(id="GAP-13", title="A verifiable Indian reference institution",
         severity="MEDIUM", verdict="NARROWED",
         dim=None,
         holders=None,
         holders_list=[],
         joined_n=0,
         joined_list=[],
         note="Protrak/ProrIISe at IISc remains the ONLY named Indian university "
              "deployment in 40 vendors - and it is IP management, not incubation. "
              "Phase 11 found no Indian university reference for IncuMan, ESI or CSM. "
              "EcoSync's TBI-KIET is a vendor claim. The gap survives for INCUBATION, "
              "where the reference is the thing a committee actually asks for.",
         phase11_effect="Confirmed against the 4 new vendors; all three have none."),
]


# ==========================================================================
# THE SIX DIFFERENTIATORS
# ==========================================================================
# evidence_a = competitor absence across 40 vendors   (strong)
# evidence_u = user voice from Phase 11               (weak; 24 records)
#
# contested_by names vendors that already hold the capability. Empty means the
# gap is uncontested - which is rare and worth noticing, because uncontested
# usually also means "nobody thinks it is worth building".

DIFFERENTIATORS = [
    dict(
        n=1,
        name="TRL as a governed object, mapped to eligible Indian schemes",
        gaps=["GAP-02"],
        statement="Model Technology Readiness Level as a tracked, auditable property of "
                  "the venture - not a free-text stage label - and map it to the "
                  "schemes a venture at that level is actually eligible for.",
        why="Every platform tracks 'stage' as prose. A TRL that a return can be filed "
            "against is the object both NIRF and IIC actually ask for, and it is the "
            "input a scheme-eligibility check needs. Phase 1 found only 32 of 354 "
            "DPIIT-recognised startups appear in the NIRF Innovation table.",
        evidence_a="2 of 40 build TRL natively; 32 of 40 are evidenced-absent. The "
                   "widest technical gap in the matrix.",
        evidence_u="None. No user in the corpus asked for TRL.",
        contested_by=holders("trl"),
        contested_note="Inpart builds it for TTOs. IncuMan builds it for HEIs but is in "
                       "private beta with no customers.",
        falsifier="If two vendors demonstrate a live Indian university running TRL to "
                  "scheme-mapped eligibility, this closes. Watch IncuMan's beta exit.",
        our_edge="INERTIA. This is exactly the capability that is tedious, unglamorous "
                 "and requires scheme-by-scheme eligibility maintenance. Incumbents with "
                 "investor-facing roadmaps will not build it. Phase 5 also shows the "
                 "budget filter excludes nobody at Rs 1.2L, so nobody is being "
                 "undercut on price - we would be the only one offering it at all.",
        confidence="HIGH on absence, UNPROVEN on demand"),

    dict(
        n=2,
        name="IPR joined to the venture lifecycle, not bolted beside it",
        gaps=["GAP-01"],
        statement="One venture record carries the disclosure, the docket, the milestone "
                  "and the licence. Filing status changes when the venture changes "
                  "stage, because they are the same object.",
        why="Six of the ten vendors that build IPR are technology-transfer platforms "
            "that never touch incubation. The four that do join it are mostly Indian "
            "newcomers with no named customer. A TTO officer and an incubation manager "
            "today hold two systems and reconcile them by hand - the same reconciliation "
            "problem Phase 1 documented for startup counts.",
        evidence_a="4 of 40 build IPR JOINED to incubation, against 10 that build IPR "
                   "alone. Only Protrak/IISc has a named Indian university, and it is "
                   "IP-only.",
        evidence_u="None directly. The FRAGMENTATION complaint category is the nearest "
                   "signal, and it is about handoffs between people, not modules.",
        contested_by=joined("ipr", "incubation"),
        contested_note="Protrak (IISc, IP-only), Inpart, IncuMan, ESI. None demonstrates "
                       "a full venture-to-licence lifecycle in production.",
        falsifier="If IncuMan or ESI ships and names an Indian university running "
                  "joint incubation + IPR, the joined claim narrows to Protrak's "
                  "reference advantage alone.",
        our_edge="REFERENCE + SCOPE. StartupHub already competes for the IIC budget "
                 "line; Protrak competes for the TTO budget line, which is a separate "
                 "and slower approval chain (Phase 2: 0 of 25 roles have documented "
                 "budget authority). Winning the IIC budget first and adding IPR second "
                 "is a sequencing advantage Protrak does not have.",
        confidence="HIGH on absence, MODERATE on demand"),

    dict(
        n=3,
        name="The unincorporated venture as a first-class state",
        gaps=["GAP-09"],
        statement="Track the idea, the student team and the pre-entity venture as real "
                  "records with their own lifecycle, which can later convert into an "
                  "incorporated entity without losing history.",
        why="Every one of 40 vendors assumes a registered entity with a DPIIT number. "
            "The Indian university funnel is mostly before that point. Phase 1 shows "
            "NIT Calicut attributing 38 of 55 ventures to an undefined 'others' bucket, "
            "and 843 ideas arising from 42 activities - a pipeline of unidentified "
            "pre-entity work that no incumbent can represent.",
        evidence_a="0 of 40, with no partial implementations either. Nobody has even "
                   "attempted the easy version.",
        evidence_u="None. This is a Phase 1 document finding, not a user finding.",
        contested_by=[],
        contested_note="UNCONTESTED. Which usually means nobody thinks it is worth "
                       "building - and also that nobody has proven it wrong.",
        falsifier="If the Phase 1 'others'-bucket and idea-count findings turn out to be "
                  "a reporting artefact rather than a real pipeline, this collapses. "
                  "This is precisely what a Phase 3B interview is designed to test.",
        our_edge="LACK OF INCUMBENT MOTIVE. Incumbents sell to incubators whose revenue "
                 "comes from accepted cohorts. Counting people who will never be "
                 "accepted is unmonetisable for them and central to the university's "
                 "accreditation return. Different buyer, different metric.",
        confidence="HIGH on absence, UNPROVEN on demand"),

    dict(
        n=4,
        name="Faculty and Innovation Ambassadors as first-class entities",
        gaps=["GAP-06"],
        statement="Model the faculty inventor, the student innovator and the Innovation "
                  "Ambassador as entities with their own records, so innovation activity "
                  "is not forced through a 'startup application' form.",
        why="Every incubation platform in the set begins intake at 'startup "
            "application'. Faculty appear only in tech-transfer platforms. But Phase 1 "
            "shows the institution splits innovation funding three ways - innovation, "
            "startup, IPR - and runs 15,000 college Innovation Ambassadors and 25,000 "
            "school ambassadors who are not startups at all.",
        evidence_a="0 incubation platforms hold it (Phase 9 'faculty' flag). NOT "
                   "MEASURED in the Phase 10 matrix, so the 12 later vendors are "
                   "unscored on this axis - a known gap.",
        evidence_u="None. Not asked for by anyone in the corpus.",
        contested_by=[],
        contested_note="UNCONTESTED and unmeasured. The weakest evidence base of the six "
                       "and the one most in need of a Phase 3B interview.",
        falsifier="A single IIC coordinator saying 'we already track that in the annual "
                  "return' closes it. Do not fund this before that conversation.",
        our_edge="ADJACENCY TO ACCREDITATION. The buyer already produces this data "
                 "annually for NIRF and ARIIA. It is not a new reporting burden; it is "
                 "the report they are already late submitting.",
        confidence="MODERATE on absence, UNPROVEN on demand"),

    dict(
        n=5,
        name="Guaranteed migration and adoption - the inertia wedge",
        gaps=["GAP-10"],
        statement="A scoped, fixed-price migration off forms, spreadsheets and "
                  "WhatsApp with the data carried over, plus a named onboarding owner "
                  "for the first two intake cycles.",
        why="Every vendor claims migration; none sells the guarantee. Phase 11 showed "
            "the displaced incumbent is free - two Accubate reviewers moved from Google "
            "Forms - and identified the real blocker: programmes that have the means to "
            "automate still do it by hand, because nobody sells change management.",
        evidence_a="0 of 40 sell migration as a guaranteed engagement. It is a services "
                   "offer, and services do not appear on feature pages.",
        evidence_u="STRONGEST user evidence of the six. Three independent routes: the "
                   "ICUBE institutional record, a six-year university incubator "
                   "manager, and FRAGMENTATION being the only complaint category with "
                   "multi-source support.",
        contested_by=[],
        contested_note="UNCONTESTED. Note the trap: this is also the thing the few "
                       "incumbents most likely to copy, because it is service work and "
                       "not a feature.",
        falsifier="If the ICUBE record turns out to be an outlier - a sophisticated "
                  "university that most buyers are unlike - the wedge weakens sharply.",
        our_edge="SEQUENCING. Migration is the only differentiator that generates its "
                 "own proof: a migrated institution is the reference institution GAP-13 "
                 "says nobody has. It converts directly into case studies and into the "
                 "Protrak-style evidence the market currently lacks.",
        confidence="HIGH on demand, HIGH on absence"),

    dict(
        n=6,
        name="Department-level tenancy with departmental P&L",
        gaps=["GAP-11"],
        statement="Sub-tenancy per academic department, each with its own budget view and "
                  "correct ownership of IP between the department, the institute and any "
                  "SPV.",
        why="Multi-campus is table stakes. How Indian universities are actually "
            "organised - by department, with separate heads and separate money - is not. "
            "It also determines who signs, which matters given that Phase 2 found 0 of "
            "25 roles with documented budget authority: the Department Head may be a "
            "cheaper approval than the institute.",
        evidence_a="0 of 40 demonstrably. Phase 9's 'multisite' flag cannot distinguish "
                   "campus-level from department-level, so this is asserted rather than "
                   "counted - a stated limitation.",
        evidence_u="None.",
        contested_by=[],
        contested_note="UNCONTESTED but unmeasured. Weakest absence evidence of the six.",
        falsifier="If multi-campus tenancy in any incumbent is already department-"
                  "granular, this is already solved and we are describing a checkbox.",
        our_edge="APPROVAL-PATH OPTIMISATION. Phased differently from the product "
                 "wedge: this may be worth shipping as tenancy plumbing rather than "
                 "positioning it as a differentiator.",
        confidence="MODERATE on absence, UNPROVEN on demand"),
]


# ==========================================================================
# The seventh candidate - graded, and deliberately NOT a differentiator
# ==========================================================================

PACKAGING_REQUIREMENT = dict(
    name="Deployment shape an Indian university can actually buy",
    gaps=["GAP-12"],
    verdict="REQUIREMENT, NOT DIFFERENTIATOR",
    reason="Phase 8: Fedena sells a FULL college ERP at Rs 1,00,000 flat with unlimited "
           "users - below the recommended Rs 1.2 lakh list. Phase 11 found a second "
           "free competitor (Univation, free to universities with Google Ads credit). "
           "A flat, unlimited-user, sub-Rs-1.5-lakh shape is the price of admission. "
           "Meeting it is not an advantage; failing to meet it is a non-starter.",
    evidence="Phase 8 comparables, Phase 11 RATING/price findings, OQ-03 still "
             "unmeasured - so this rests on competitor prices, never on a stated "
             "willingness to pay.",
)


# ==========================================================================
# THE CONTESTED-GAP QUESTION
# ==========================================================================
# Q4: how do we actually win a gap that now has entrants?

WIN_STRATEGIES = [
    dict(strategy="Inertia",
         why_it_works="Boring, unglamorous, scheme-maintenance-heavy capability that "
                      "investor-facing roadmaps will not prioritise.",
         applies_to=[1, 4],
         risk="Requires discipline to stay unfashionable when fundraising gets loud."),
    dict(strategy="Sequencing",
         why_it_works="Winning the IIC budget line is cheaper and faster than winning "
                      "the TTO line, so build the module the IIC buyer pays for first.",
         applies_to=[2, 3],
         risk="Phase 2 found 0 of 25 roles with documented budget authority - the IIC "
              "line may be easier to reach but not easy to spend."),
    dict(strategy="Reference",
         why_it_works="Every migration produces a named Indian university deployment, "
                      "which is the one asset GAP-13 says nobody in the category has.",
         applies_to=[5, 3],
         risk="Cannot be bought. Requires selling into institutions that do not "
              "currently buy anything."),
    dict(strategy="Approval-path optimisation",
         why_it_works="Offering a cheaper-to-approve buyer than the incumbent's target "
                      "user converts a budget problem into a procurement win.",
         applies_to=[6],
         risk="A department-level budget is smaller. Does not replace the institute deal."),
    dict(strategy="Absence of incumbent motive",
         why_it_works="Capabilities that pay the incubator but not the vendor get "
                      "systematically skipped. Count pre-entity ventures; they will "
                      "never be an accepted cohort.",
         applies_to=[3, 4],
         risk="If a vendor's pricing ever moves to per-registered-venture, this closes."),
]


# ==========================================================================
# FEATURES.MD TRIAGE - all 46 sections
# ==========================================================================
# docs/features.md specifies 46 numbered sections, 9 primary user roles and 12
# modules. The research programme covers a materially narrower product.
#
# Verdicts:
#   EVIDENCED   supported by a Phase 12 differentiator or a Phase 1 documented
#               problem
#   DEFERRED    plausible, not contradicted, but no evidence and not differenti-
#               ating - legitimate v2+ scope
#   SATURATED   competitors already do this (Rule 1)
#   CONTRADICTED  research actively cuts against it
#   NEEDS_PRIMARY cannot be decided without the 0 interviews we have not run
#
# This is the section the user asked for by choosing option (b): every one of the
# 46 sections is placed, and nothing is silently dropped.

FEATURES_MAP = [
    (1,  "User Types (9 roles)", "NEEDS_PRIMARY",
     "9 roles; the research evidences at most 4 as buyers (IIC coordinator, "
     "incubation manager, TTO/IP officer, evaluator). Phase 2 mapped 25 roles but found "
     "0 with documented budget authority. Founder, mentor, investor, corporate and "
     "resource-provider roles are all DEFERRED."),
    (2,  "Startup Onboarding", "EVIDENCED",
     "Feeds differentiator 3 - the venture record must exist before incorporation."),
    (3,  "Idea Management", "EVIDENCED",
     "Feeds GAP-09 and Phase 1's 843-ideas-from-42-activities finding."),
    (4,  "Idea Validation", "DEFERRED",
     "Reasonable, no competitor builds it, but nothing in 11 phases evidences demand "
     "and it is a founder-side module, not the institutional buyer."),
    (5,  "Incubation Management", "SATURATED",
     "21 of 40 build incubation natively, 11 partially. Rule 1 applies. Must be built "
     "well; cannot be the wedge."),
    (6,  "Mentor Management", "SATURATED",
     "15 of 40 native. Mentorship is even sold as a paid add-on by incuTrack. Only the "
     "NDA-tiered visibility half of GAP-07 survives."),
    (7,  "IPR Management", "EVIDENCED",
     "Differentiator 2. The full discovery-to-licence workflow is a v2 expansion of "
     "the joined-venture record."),
    (8,  "Resource Management", "DEFERRED",
     "Only 3 of 40 build it natively, so the gap is real - but Phase 5 concluded we "
     "should NOT compete here: incuTrack and EcoSync are strong and this is most "
     "likely a free defensive feature, not a wedge."),
    (9,  "Market Intelligence", "DEFERRED",
     "Startup-side analytics. 27 of 40 build analytics; market intel is 7 native / 15 "
     "partial. Real gap, wrong buyer."),
    (10, "Competitor Intelligence", "DEFERRED",
     "Founder-side. Would require the data this study itself collects. Interesting but "
     "not this buyer."),
    (11, "Product / MVP Management", "DEFERRED",
     "No evidence in 11 phases. Founder-side."),
    (12, "Customer Management", "DEFERRED", "No evidence. Founder-side."),
    (13, "Funding", "EVIDENCED",
     "Scheme-eligibility matching is the second half of differentiator 1. A plain "
     "grant LIST is saturated (11 of 40 native) - matching is not."),
    (14, "Fundraising Management", "DEFERRED", "Investor-side. Not this buyer."),
    (15, "Growth Management", "DEFERRED", "Startup-side. No evidence."),
    (16, "Startup Performance Dashboard", "SATURATED",
     "28 of 40 build reporting, 27 analytics. Rule 1 retires this as a differentiator."),
    (17, "Risk Management", "NEEDS_PRIMARY",
     "Plausible and connected to the TRL object, but Phase 11 found no user asking "
     "for risk scoring. Cannot be scoped without interviews."),
    (18, "Founder AI Assistant", "CONTRADICTED",
     "Phase 11: zero users asked for AI, and 'AI assistant' is exactly the positioning "
     "Phase 11 declined to make. Keep as an internal surface over the TRL object, never "
     "as a differentiator."),
    (19, "Incubator / Accelerator (portfolio)", "SATURATED",
     "Portfolio view is standard in 15+ vendors."),
    (20, "Program Management", "SATURATED",
     "Cohort and programme management is the most built capability in the category."),
    (21, "Portfolio Dashboard", "SATURATED", "See #16."),
    (22, "Incubator Resource Management", "DEFERRED",
     "Same reasoning as #8 - real gap, wrong strategic choice."),
    (23, "Mentor / Expert", "DEFERRED",
     "Retained only for the NDA-tiered visibility half (GAP-07)."),
    (24, "IPR / Legal Professional", "DEFERRED",
     "Second persona for differentiator 2; expand after the venture record ships."),
    (25, "Investor", "DEFERRED", "Investor-side. Not this buyer."),
    (26, "Investor Due Diligence", "DEFERRED", "Investor-side."),
    (27, "Investment Management", "DEFERRED", "Investor-side."),
    (28, "Government / Institution", "EVIDENCED",
     "The mandate and accreditation-return surface is the commercial reason the IIC "
     "budget exists. Note GAP-03 is now CONTESTED."),
    (29, "Government → Startup Matching", "EVIDENCED",
     "Same object as differentiator 1's scheme mapping, seen from the government side."),
    (30, "Resource Provider", "DEFERRED", "Marketplace-side."),
    (31, "Resource Marketplace", "DEFERRED",
     "Two-sided marketplace economics, months of work, zero evidence of demand."),
    (32, "Corporate / Industry Partner", "DEFERRED",
     "Phase 9 found corporate_match is 5 native / 18 partial - mostly weak. No "
     "evidence the university buyer wants this in v1."),
    (33, "Corporate Pilot Management", "DEFERRED", "Same reasoning as #32."),
    (34, "University / Research Institution", "EVIDENCED",
     "This IS the buyer. Research-to-IP-to-startup connection is differentiator 2."),
    (35, "Talent / Professional", "DEFERRED", "Marketplace-side."),
    (36, "StartupHub Admin", "EVIDENCED",
     "Governance, audit logs and permissions are load-bearing for the accreditation "
     "argument and for GAP-08's auditable posture."),
    (37, "Verification & Trust Layer", "EVIDENCED",
     "Required for the institutional-defensibility wedge; a committee buying a system "
     "of record needs to know who certified each record."),
    (38, "Communication Layer", "SATURATED",
     "Every vendor has email, chat and reminders. Phase 11's one real complaint - email "
     "to spam - is a deliverability problem, not a feature gap."),
    (39, "Document & Knowledge Management", "DEFERRED",
     "Needed eventually, not differentiating, and heavily commoditised."),
    (40, "Notification & Alert Engine", "SATURATED", "Standard across the category."),
    (41, "The Central AI Engine", "CONTRADICTED",
     "As positioning, contradicted by Phase 11. As internal infrastructure, fine - but "
     "it must never be the reason a customer buys."),
    (42, "AI Matching Engine", "NEEDS_PRIMARY",
     "Mentor matching is saturated and unasked-for. Grant/mentor matching tied to TRL "
     "is differentiator 1 and IS evidenced. Only the evidenced use ships."),
    (43, "AI Scoring Engine", "NEEDS_PRIMARY",
     "Eight proposed scores, none evidenced. EcoSync's refusal to publish AI scores "
     "and VentureLink's actor-reason audit trail are the two data points that matter, "
     "and both are about auditability rather than the score."),
    (44, "Ecosystem Intelligence", "NEEDS_PRIMARY",
     "Requires cross-institution data nobody has shared. Not reachable by a single "
     "institution's purchase."),
    (45, "12-module platform structure", "NEEDS_PRIMARY",
     "The module taxonomy is sound as architecture. As a delivery plan for v1 it is "
     "12x too large for the evidence. Triaged at module level in MODULES_MAP."),
    (46, "Per-role distinct experiences", "EVIDENCED",
     "The strongest idea in features.md, and the one Phase 2 independently converged "
     "on: the IIC coordinator's question is 'which startup needs intervention', not "
     "'show me the list'. Build the surfaces around that question."),
]

MODULES_MAP = [
    ("01 Startup & Idea", "EVIDENCED", "Differentiators 2 and 3", "v1 core"),
    ("02 Incubation & Acceleration", "SATURATED", "Must be excellent, cannot differentiate",
     "v1 - parity requirement"),
    ("03 IPR & Legal", "EVIDENCED", "Differentiator 2", "v1 core, expanded v2"),
    ("04 Resource Hub", "DEFERRED", "Phase 5 said do not compete here", "v3+"),
    ("05 Market Intelligence", "DEFERRED", "Real gap, wrong buyer", "v3+"),
    ("06 Product & Validation", "DEFERRED", "No evidence", "v3+"),
    ("07 Funding & Investment", "EVIDENCED", "Differentiator 1 (scheme matching)",
     "v1 core - matching only"),
    ("08 Growth & Performance", "SATURATED", "28 of 40 build reporting", "v1 - parity only"),
    ("09 Ecosystem Marketplace", "DEFERRED", "Phase 9: platforms already do this and "
     "return nothing to institutions", "v3+ / partnership"),
    ("10 Collaboration", "SATURATED", "Standard everywhere", "v1 - parity only"),
    ("11 Intelligence Layer", "CONTRADICTED", "Zero users asked for AI",
     "internal only - never positioning"),
    ("12 Ecosystem Administration", "EVIDENCED", "Differentiators 5 and 6; the "
     "institutional-defensibility argument", "v1 core"),
]


# ==========================================================================
# competitor coverage - which of the 6 each of 40 vendors already has
# ==========================================================================
# Scored strictly on the Phase 10 matrix, so this is comparable to Phase 10's
# own numbers and inherits its evidence discipline.

COVERAGE_CRITERIA = {
    1: lambda r: 3 if r["trl"] == 3 else 2 if r["trl"] == 2 else 1 if r["trl"] == 1 else 0,
    2: (lambda r: 3 if (r["ipr"] in (2, 3) and r["incubation"] in (2, 3))
        else 2 if (r["ipr"] in (1, 2, 3) and r["incubation"] in (1, 2, 3)) else 0),
    3: lambda r: 0,          # no vendor evidences a pre-incubation entity model
    4: lambda r: 0,          # no incubation platform evidences a faculty entity
    5: lambda r: 0,          # nobody sells migration as a guaranteed engagement
    6: lambda r: 0,          # campus-level != department-level; not derivable
}


def coverage_rows():
    out = []
    for r in ROWS:
        row = dict(vendor=r["competitor"], evidence_grade=r["evidence_grade"],
                   position=r["market_position"])
        for n in range(1, 7):
            row[f"d{n}"] = COVERAGE_CRITERIA[n](r)
        held = [n for n in range(1, 7) if row[f"d{n}"] >= 2]
        row["differentiators_held"] = len(held)
        row["held"] = "; ".join(f"D{n}" for n in held) or "none"
        out.append(row)
    return out


def summary():
    cov = coverage_rows()
    diffs = {d["n"]: d for d in DIFFERENTIATORS}
    return dict(
        vendors=N_VENDORS,
        differentiators=len(DIFFERENTIATORS),
        packaging=1,
        gaps_scored=len(GAP_SCORECARD),
        gaps_surviving=len([g for g in GAP_SCORECARD if g["verdict"] == "SURVIVES"]),
        gaps_narrowed=len([g for g in GAP_SCORECARD if g["verdict"] == "NARROWED"]),
        gaps_contested=len([g for g in GAP_SCORECARD if g["verdict"] == "CONTESTED"]),
        gaps_retired=len([g for g in GAP_SCORECARD
                          if g["verdict"] in ("RETIRED", "SURVIVES_AS_REQUIREMENT")]),
        features_sections=len(FEATURES_MAP),
        modules=len(MODULES_MAP),
        verdict_counts=Counter(f[2] for f in FEATURES_MAP),
        vendors_holding_any=len([c for c in cov if c["differentiators_held"] > 0]),
        vendors_holding_two=len([c for c in cov if c["differentiators_held"] >= 2]),
        contested_by_d1=len(diffs[1]["contested_by"]),
        contested_by_d2=len(diffs[2]["contested_by"]),
    )


if __name__ == "__main__":
    s = summary()
    print("=" * 74)
    print("  PHASE 12 - FEATURE GAP ANALYSIS")
    print("=" * 74)
    print(f"  vendors scored          : {s['vendors']}")
    print(f"  gaps re-scored          : {s['gaps_scored']}")
    print(f"    SURVIVES              : {s['gaps_surviving']}")
    print(f"    NARROWED              : {s['gaps_narrowed']}")
    print(f"    CONTESTED             : {s['gaps_contested']}")
    print(f"    RETIRED / REQUIREMENT : {s['gaps_retired']}")
    print(f"  DIFFERENTIATORS         : {s['differentiators']}  "
          f"(+1 packaging requirement)")
    print(f"  features.md sections    : {s['features_sections']} triaged")
    print(f"  modules                 : {s['modules']} triaged")
    print(f"  vendors holding >=1     : {s['vendors_holding_any']} of {s['vendors']}")
    print(f"  vendors holding >=2     : {s['vendors_holding_two']} of {s['vendors']}")
    print("\n  features.md triage:")
    for k, v in s["verdict_counts"].most_common():
        print(f"    {k:<15} {v}")