#!/usr/bin/env python3
"""StartupHub - funding proposal questions and answers (side work).

    The one-year roadmap, the revised Rs 6 lakh budget, the technology
    budget breakdown, the funding-evidence checklist, the team, and the
    investor story - each expressed as a question with an answer.

WHY THIS IS SEPARATE FROM THE RESEARCH PROGRAMME
------------------------------------------------
This is funding-proposal material, not a research finding. It carries no
Source_Registry ids, no evidence grades and no interview records, and it
does not feed any phase of the study. It lives in this repository because
that is where the work happens, and it is deliberately NOT part of the
Phase 0-13 chain.

THE ONE RULE THAT MATTERS HERE
------------------------------
No quotation has been obtained for a single rupee in this document. Every
figure below is a PLANNING ESTIMATE, and the folder says so in the place a
reader will actually look. The budget is not wrong because it is
unverified; it is wrong if it is presented as if it were verified.

    BUDGET_TOTAL      = the sum of the 7 line items
    QUARTER_TOTALS    = the column sums
    Both are recomputed here and compared against the stated figures. A
    mismatch fails validation() and stops the build - the same discipline
    the research phases use, aimed at the one arithmetic claim this
    document actually makes.

Usage:  python build/data_questions_funding.py
"""

import sys

SCHEMA_VERSION = "1.0"
BUILD_DATE = "2026-10-20"

# Every rupee figure in this module is a planning estimate. The folder
# carries this label on the budget page and in the workbook.
EVIDENCE_STATUS = "UNVERIFIED - no quotation obtained"
EVIDENCE_NOTE = ("Every line is a planning estimate. Obtain actual quotations, "
                 "official fee schedules, vendor estimates or institutional "
                 "documentation before submitting. Do not write invented "
                 "vendor costs.")

# ==========================================================================
# The budget - Rs 6,00,000 across four quarters
# ==========================================================================
# Each line carries its four quarterly amounts in rupees and its own
# stated total. validation() recomputes both.

BUDGET = [
    dict(name="Technology Development & Innovation Refinement",
         q=[90000, 80000, 75000, 55000], total=300000,
         note="Core product, then ecosystem integration, then pilot "
              "hardening, then production readiness."),
    dict(name="Market Research & Pilot Study",
         q=[10000, 15000, 35000, 40000], total=100000,
         note="Front-loaded cheaply, weighted to the pilot quarters, and "
              "heaviest in Q4 when willingness-to-pay has to be tested."),
    dict(name="IP Filing & Management",
         q=[10000, 10000, 5000, 5000], total=30000,
         note="Check DPIIT facilitator benefits and statutory fee "
              "schedules before committing this line."),
    dict(name="Incubation & Mentorship",
         q=[15000, 15000, 15000, 15000], total=60000,
         note="Flat across the year - the only line that does not flex."),
    dict(name="Startup Registration & Consultation",
         q=[0, 10000, 10000, 5000], total=25000,
         note="Starts in Q2, once there is a product to register."),
    dict(name="Competitions / Exhibitions",
         q=[0, 0, 5000, 5000], total=10000,
         note="Late-year, and travel only where explicitly eligible."),
    dict(name="Essential Contingency",
         q=[10000, 20000, 20000, 25000], total=75000,
         note="A controlled reserve for essential unforeseen MVP/pilot "
              "requirements, subject to approval and funding rules. Not "
              "'extra money'."),
]

QUARTER_TOTALS = [135000, 150000, 165000, 150000]
BUDGET_TOTAL = 600000
CONTINGENCY_LINE = "Essential Contingency"

# ==========================================================================
# The four quarters
# ==========================================================================
# phase_word  - the four-word arc used on the investor slide
# workstreams - a label and its items; the labels differ by quarter
#               because the work genuinely changes shape
# slide       - the three lines that appear on the one-slide timeline
# slide_outcome - the milestone chip

QUARTERS = [
    dict(
        id="Q1", name="Foundation & MVP Definition", phase_word="BUILD",
        objective="Convert StartupHub from concept into a clearly defined, "
                   "usable MVP.",
        workstreams=[
            ("Develop", [
                "Finalise core institutional problem and target users",
                "Finalise MVP scope and user journeys",
                "Startup onboarding and profile",
                "Institution / incubator dashboard",
                "Idea submission and management",
                "Startup assessment",
                "Basic incubation management",
                "Basic mentor management",
                "Basic IPR support workflow",
                "Resource discovery",
                "Basic analytics and reporting",
                "User roles and access management",
            ]),
            ("Validation", [
                "User interviews",
                "Institutional requirement mapping",
                "Feature prioritisation",
                "Initial usability testing",
            ]),
            ("Resources", [
                "Product development team",
                "UI/UX support",
                "Cloud/software services",
                "Domain experts and institutional mentors",
            ]),
        ],
        outcome="A functional MVP ready for controlled institutional "
                "testing.",
        slide=["Define MVP", "Core workflows", "Initial testing"],
        slide_outcome="MVP Ready",
    ),
    dict(
        id="Q2", name="Integrated MVP & Pilot Preparation", phase_word="INTEGRATE",
        objective="Connect the major ecosystem workflows and prepare the "
                   "product for real users.",
        workstreams=[
            ("Develop", [
                "Mentor discovery and matching",
                "Investor and funding discovery",
                "IPR management workflows",
                "Resource matching and requests",
                "Market validation tools",
                "Feedback and survey management",
                "Milestone and roadmap tracking",
                "Notifications",
                "Document management",
                "Improved dashboards",
                "Basic AI-assisted recommendations",
            ]),
            ("Validation", [
                "Internal testing",
                "User acceptance testing",
                "Security and reliability checks",
                "Feedback from initial institutions",
            ]),
            ("Resources", [
                "Development and product team",
                "IPR/legal advisor",
                "Mentors",
                "Pilot institutions",
            ]),
        ],
        outcome="An integrated product ready for pilot deployment.",
        slide=["Connect ecosystem", "AI & matching", "Pilot preparation"],
        slide_outcome="Pilot Ready",
    ),
    dict(
        id="Q3", name="Institutional Pilot & Product Refinement",
        phase_word="PILOT",
        objective="Put StartupHub into real institutional environments and "
                   "measure actual usage.",
        workstreams=[
            ("Pilot", [
                "Onboard selected institutions",
                "Onboard startups",
                "Configure institutional workflows",
                "Run real startup-management activities",
                "Collect user feedback",
                "Track adoption and engagement",
                "Measure time saved and process improvement",
            ]),
            ("Refine", [
                "Fix usability issues",
                "Improve workflows",
                "Improve recommendations",
                "Improve dashboards and reporting",
                "Strengthen security and reliability",
                "Prioritise features based on real usage",
            ]),
            ("Market Validation", [
                "Institutional feedback",
                "Customer interviews",
                "Pricing validation",
                "Willingness-to-pay assessment",
                "Pilot-to-paid conversion assessment",
            ]),
        ],
        outcome="Validated product with measurable pilot results and "
                "evidence of institutional demand.",
        slide=["Real institutions", "User adoption", "Feedback & refinement"],
        slide_outcome="Validated Product",
    ),
    dict(
        id="Q4", name="Launch Readiness & Early Commercialisation",
        phase_word="LAUNCH",
        objective="Convert the validated MVP into a market-ready product.",
        workstreams=[
            ("Complete", [
                "Final product refinement",
                "Production deployment",
                "Institutional onboarding process",
                "Customer support process",
                "Documentation and training material",
                "Performance monitoring",
                "Final analytics and reporting",
                "Pricing and subscription structure",
                "Sales and demonstration material",
            ]),
            ("Commercial Validation", [
                "Convert pilot institutions into paying customers",
                "Establish institutional partnerships",
                "Demonstrate product outcomes",
                "Prepare expansion strategy",
            ]),
            ("IP & Business", [
                "Finalise relevant IP protection",
                "Startup registration/compliance",
                "Prepare investor and partnership documentation",
            ]),
        ],
        outcome="Market-ready StartupHub with pilot evidence, initial "
                "institutional customers and a clear scale-up pathway.",
        slide=["Market readiness", "Paying customers", "Scale strategy"],
        slide_outcome="Market Ready",
    ),
]

# The one-slide story, in the order a reader meets it.
STORY_ARC = [
    dict(quarter="Q1", verb="Establish", phrase="the MVP foundation"),
    dict(quarter="Q2", verb="Integrate", phrase="the core ecosystem"),
    dict(quarter="Q3", verb="Validate", phrase="the platform through real "
                                               "institutional pilots"),
    dict(quarter="Q4", verb="Transition", phrase="the validated product into "
                                                 "market readiness and early "
                                                 "commercial adoption"),
]

INVESTOR_STORY = (
    "StartupHub will use the first quarter to establish the MVP foundation, "
    "the second quarter to integrate the core ecosystem, the third quarter "
    "to validate the platform through real institutional pilots, and the "
    "fourth quarter to transition the validated product into market "
    "readiness and early commercial adoption."
)

MILESTONE_QUESTION = "What milestone does this money help us achieve?"

FRAMING_STATEMENT = (
    "Rs 6 lakh is the estimated first-year MVP-to-market requirement, "
    "derived from the planned development, validation, IP, incubation, "
    "registration and pilot activities across four defined milestones. "
    "Individual cost heads will be supported through quotations, official "
    "fee schedules, vendor estimates, or institutional documentation "
    "wherever applicable."
)

# ==========================================================================
# The technology budget - the Rs 3 lakh line, broken down
# ==========================================================================

TECH_BUDGET = [
    dict(quarter="Q1", amount=90000,
         items=["Core product development",
                "Product architecture and initial implementation",
                "UI/UX",
                "Basic cloud/software services"]),
    dict(quarter="Q2", amount=80000,
         items=["Additional ecosystem modules",
                "Integration of workflows",
                "AI-assisted functionality",
                "Cloud/software services"]),
    dict(quarter="Q3", amount=75000,
         items=["Pilot-specific improvements",
                "Reliability and security improvements",
                "User feedback implementation",
                "Testing and deployment"]),
    dict(quarter="Q4", amount=55000,
         items=["Production readiness",
                "Final improvements",
                "Deployment",
                "Performance monitoring",
                "Launch support"]),
]

TECH_BUDGET_TOTAL = 300000

# ==========================================================================
# Funding evidence - what would substantiate each rupee
# ==========================================================================

FUNDING_EVIDENCE = [
    dict(category="Technology",
         artefacts=["Developer/team quotation",
                    "Software subscription quotations",
                    "Cloud/service estimates",
                    "AI/API pricing pages",
                    "Deployment/testing estimates"]),
    dict(category="Market Research",
         artefacts=["Interview plan",
                    "Survey costs",
                    "Pilot institution letters",
                    "Pilot onboarding requirements",
                    "User testing expenses"]),
    dict(category="IP",
         artefacts=["IP consultant quotation",
                    "Government statutory fee schedule",
                    "Patent/trademark-related estimates"]),
    dict(category="Incubation",
         artefacts=["Incubator quotation/invoice",
                    "Mentorship fee structure",
                    "Facility/service charges"]),
    dict(category="Registration",
         artefacts=["MCA/government fee schedule",
                    "Professional CA/CS/legal quotation"]),
    dict(category="Competitions / Exhibitions",
         artefacts=["Registration fee",
                    "Exhibition participation fee",
                    "Demonstration/material requirements",
                    "Travel only if explicitly eligible"]),
    dict(category="Contingency",
         artefacts=["Controlled reserve for essential unforeseen MVP/pilot "
                    "requirements, subject to approval and funding rules"]),
]

# ==========================================================================
# Team and dependencies
# ==========================================================================

TEAM = [
    dict(role="Product Lead",
         detail="Product strategy, roadmap, requirements and stakeholder "
                "coordination"),
    dict(role="Technology Team",
         detail="Product development, integration and deployment"),
    dict(role="Design Support",
         detail="User experience and interface refinement"),
    dict(role="Business/Market Lead",
         detail="Institutional research, pilots and customer validation"),
    dict(role="Domain Experts",
         detail="IPR, incubation, startup ecosystem and institutional "
                "processes"),
    dict(role="Mentors/Advisors",
         detail="Product, business and market guidance"),
]

DEPENDENCIES = [
    "Pilot institutions",
    "Incubation centre",
    "IPR/legal professionals",
    "Cloud/software providers",
    "Institutional mentors",
    "Potential startup users",
    "Industry/institutional partners",
]

# ==========================================================================
# What is NOT yet verified
# ==========================================================================
# Each item names the specific claim, what was checked, and what remains
# open. None of these is asserted as true anywhere in the folder.

UNVERIFIED = [
    dict(
        id="UV-01",
        title="No rupee in this budget is evidenced",
        claim="The full Rs 6,00,000 across 7 lines and 4 quarters.",
        checked="Arithmetic. Every row total, every column total and the "
                "grand total were recomputed and agree.",
        open="Not one line has a quotation behind it. This is a planning "
             "estimate, and it must not be submitted as a costed proposal "
             "until the evidence register in 04_Funding_Evidence.md is "
             "filled."),
    dict(
        id="UV-02",
        title="The cited MIC document is a 2020 contest guide",
        claim="That MIC's innovation framework 'expects a clear progression "
              "from idea/PoC toward prototype, with defined milestones, "
              "resources, mentoring and validation'.",
        checked="The cited PDF was retrieved and read (20 pages). It is the "
                "IIC National Innovation Contest 2020 portal submission "
                "guide. It does document the idea -> PoC -> prototype "
                "progression, TRL banding, evaluation by the IIC with a "
                "score of 25 of 50 for approval, and mentoring of approved "
                "prototypes.",
        open="It is a contest guide for 2020, not the current general IIC "
             "handholding framework, and it does not state the 'cost, "
             "beneficiaries, impact and scalability' framing. That framing "
             "comes from a different MIC document which has not been "
             "identified or retrieved. Do not attribute it to this PDF."),
    dict(
        id="UV-03",
        title="Startup India IP-fee benefits are unconfirmed",
        claim="That eligible DPIIT-recognised startups can access IP "
              "facilitators with the government bearing facilitator fees, "
              "and that patents receive an 80% filing-fee rebate.",
        checked="The Startup India scheme page was retrieved. It renders "
                "its substantive content through JavaScript and the text "
                "could not be read, so the claim was not confirmed.",
        open="Confirm against the current DPIIT benefits page or the "
             "relevant gazette notification before relying on either "
             "benefit. This matters: it is the reason the IP line is only "
             "Rs 30,000 and should not grow without checking first."),
    dict(
        id="UV-04",
        title="MIC eligibility for Rs 6 lakh is not established",
        claim="That Rs 6 lakh is the MIC-approved or eligible amount.",
        checked="Nothing. This document makes no such claim and the folder "
                "states so explicitly.",
        open="The specific current call and guidelines applicable to the "
             "institution must be checked. The MIC material establishes an "
             "innovation-development and handholding framework, which is "
             "not by itself enough to infer eligibility for every proposed "
             "expense head."),
    dict(
        id="UV-05",
        title="Incorporation cost is not quantified here",
        claim="That private-company incorporation carries statutory costs "
              "plus professional fees, varying by circumstance and state.",
        checked="Stated as a variable, not a number. The folder asserts no "
                "amount.",
        open="The MCA and government fee schedules and the professional "
             "quotation will settle the Startup Registration line."),
    dict(
        id="UV-06",
        title="Market demand behind the roadmap is not evidenced",
        claim="That institutions will buy, and at what price.",
        checked="Nothing in this folder supports it. The pilot in Q3 and the "
                "willingness-to-pay assessment in Q4 are the activities "
                "that would test it.",
        open="Q3's pricing validation and willingness-to-pay assessment "
             "are the first point at which this claim becomes testable. "
             "Until then it is an assumption, and the Q3 and Q4 budgets "
             "should be understood as buying the test."),
]


# ==========================================================================
# Formatting helpers
# ==========================================================================

def rs(n):
    """Full rupee amount, e.g. Rs 90,000."""
    return f"Rs {n:,.0f}"


def short(n):
    """Compact amount - Rs 1.35L / Rs 90K / Rs 0."""
    if n == 0:
        return "Rs 0"
    if n >= 100000:
        return f"Rs {n / 100000:.2f}L"
    if n % 1000 == 0:
        return f"Rs {n // 1000}K"
    return f"Rs {n:,.0f}"


def quarter_label(i):
    return f"Q{i + 1}"


def budget_rows():
    """Budget lines with computed totals, ready for the writer."""
    out = []
    for b in BUDGET:
        row = dict(b)
        row["computed_total"] = sum(b["q"])
        row["share"] = sum(b["q"]) / BUDGET_TOTAL
        out.append(row)
    return out


def computed_quarter_totals():
    return [sum(b["q"][i] for b in BUDGET) for i in range(4)]


def computed_total():
    return sum(sum(b["q"]) for b in BUDGET)


def contingency_share():
    c = next(b for b in BUDGET if b["name"] == CONTINGENCY_LINE)
    return sum(c["q"]) / BUDGET_TOTAL


# ==========================================================================
# Validation - the build stops if the arithmetic or the labelling breaks
# ==========================================================================

def validation():
    """Return a list of (ok, name, expected, actual) tuples."""
    checks = []

    # 1. Every line total matches its own four quarters.
    bad = [b["name"] for b in BUDGET if sum(b["q"]) != b["total"]]
    checks.append((not bad, "every line total equals its quarter sum",
                   "clean", bad or "clean"))

    # 2. Every quarter total matches the stated column.
    cols = computed_quarter_totals()
    checks.append((cols == QUARTER_TOTALS, "quarter totals match the stated "
                   "columns", QUARTER_TOTALS, cols))

    # 3. The grand total matches, both ways round.
    checks.append((computed_total() == BUDGET_TOTAL, "grand total matches",
                   BUDGET_TOTAL, computed_total()))
    checks.append((sum(QUARTER_TOTALS) == BUDGET_TOTAL, "the four quarter "
                   "totals sum to the grand total", BUDGET_TOTAL,
                   sum(QUARTER_TOTALS)))

    # 4. No line is negative and no quarter is negative.
    neg = [b["name"] for b in BUDGET if any(v < 0 for v in b["q"])]
    checks.append((not neg, "no negative amount", "clean", neg or "clean"))

    # 5. The technology line equals the technology breakdown.
    tech = next(b for b in BUDGET
                if b["name"].startswith("Technology Development"))
    checks.append((tech["total"] == TECH_BUDGET_TOTAL, "technology line "
                   "equals the technology breakdown", TECH_BUDGET_TOTAL,
                   tech["total"]))
    tb = sum(t["amount"] for t in TECH_BUDGET)
    checks.append((tb == TECH_BUDGET_TOTAL, "technology breakdown sums",
                   TECH_BUDGET_TOTAL, tb))
    tq = [next(b for b in BUDGET
               if b["name"].startswith("Technology Development"))["q"][i]
          for i in range(4)]
    tbq = [t["amount"] for t in TECH_BUDGET]
    checks.append((tbq == tq, "technology breakdown matches the technology "
                   "line quarter by quarter", tq, tbq))

    # 6. Four quarters, six questions, consistent shape.
    checks.append((len(QUARTERS) == 4, "four quarters", 4, len(QUARTERS)))
    bad_q = [q["id"] for q in QUARTERS if len(q["workstreams"]) != 3]
    checks.append((not bad_q, "every quarter has three workstreams", "clean",
                   bad_q or "clean"))
    bad_s = [q["id"] for q in QUARTERS if len(q["slide"]) != 3]
    checks.append((not bad_s, "every quarter has three slide lines", "clean",
                   bad_s or "clean"))

    # 7. The slide arc is the four-word story.
    words = [q["phase_word"] for q in QUARTERS]
    checks.append((words == ["BUILD", "INTEGRATE", "PILOT", "LAUNCH"],
                   "the four-word arc", ["BUILD", "INTEGRATE", "PILOT",
                                         "LAUNCH"], words))
    checks.append((len(STORY_ARC) == 4, "story arc has four beats", 4,
                   len(STORY_ARC)))

    # 8. Every evidence category names at least one artefact.
    bad_e = [e["category"] for e in FUNDING_EVIDENCE if not e["artefacts"]]
    checks.append((not bad_e, "every funding category names an artefact",
                   "clean", bad_e or "clean"))
    # And every budget line has a funding-evidence entry.
    cats = {e["category"] for e in FUNDING_EVIDENCE}
    expect = {"Technology", "Market Research", "IP", "Incubation",
              "Registration", "Competitions / Exhibitions", "Contingency"}
    checks.append((cats == expect, "funding evidence covers every budget "
                   "category", sorted(expect), sorted(cats)))

    # 9. Team and dependencies are the stated counts.
    checks.append((len(TEAM) == 6, "six core team roles", 6, len(TEAM)))
    checks.append((len(DEPENDENCIES) == 7, "seven external dependencies", 7,
                   len(DEPENDENCIES)))

    # 10. The provisional labelling is present and consistent.
    checks.append((EVIDENCE_STATUS.startswith("UNVERIFIED"),
                   "the budget is labelled unverified", "UNVERIFIED...",
                   EVIDENCE_STATUS))
    checks.append((len(UNVERIFIED) >= 5, "the unverified register is "
                   "populated", ">= 5", len(UNVERIFIED)))
    bad_uv = [u["id"] for u in UNVERIFIED
              if not (u["claim"] and u["checked"] and u["open"])]
    checks.append((not bad_uv, "every unverified item names what is checked "
                   "and what is open", "clean", bad_uv or "clean"))

    # 11. Contingency is described as a controlled reserve, not extra money.
    cont = next(b for b in BUDGET if b["name"] == CONTINGENCY_LINE)
    checks.append(("controlled reserve" in cont["note"].lower(),
                   "contingency is a controlled reserve", "controlled reserve",
                   cont["note"][:40]))

    return checks


def summary():
    cols = computed_quarter_totals()
    return dict(
        schema_version=SCHEMA_VERSION,
        build_date=BUILD_DATE,
        quarters=len(QUARTERS),
        budget_lines=len(BUDGET),
        budget_total=computed_total(),
        quarter_totals=cols,
        tech_total=TECH_BUDGET_TOTAL,
        tech_share=TECH_BUDGET_TOTAL / computed_total(),
        contingency_share=contingency_share(),
        evidence_categories=len(FUNDING_EVIDENCE),
        team_roles=len(TEAM),
        dependencies=len(DEPENDENCIES),
        unverified_items=len(UNVERIFIED),
        evidence_status=EVIDENCE_STATUS,
        interviews=0,
        quotations_obtained=0,
    )


def main():
    checks = validation()
    s = summary()
    print("Funding proposal Q&A")
    print(f"  quarters            : {s['quarters']}  budget lines: "
          f"{s['budget_lines']}")
    print(f"  budget total        : Rs {s['budget_total']:,.0f}")
    print(f"  quarter totals      : "
          f"{[f'{v:,.0f}' for v in s['quarter_totals']]}")
    print(f"  technology line     : Rs {s['tech_total']:,.0f}  "
          f"({s['tech_share']:.0%} of the envelope)")
    print(f"  contingency         : {s['contingency_share']:.1%} of the "
          "envelope")
    print(f"  evidence categories : {s['evidence_categories']}  team roles: "
          f"{s['team_roles']}  dependencies: {s['dependencies']}")
    print(f"  quotations obtained : {s['quotations_obtained']}  "
          f"evidence status: {s['evidence_status']}")
    fails = [c for c in checks if not c[0]]
    print(f"  validation: {len(checks) - len(fails)}/{len(checks)} checks "
          "passed")
    for okc, name, exp, act in fails:
        print(f"    FAIL  {name}: expected={exp} actual={act}")
    if fails:
        sys.exit(1)


if __name__ == "__main__":
    main()
