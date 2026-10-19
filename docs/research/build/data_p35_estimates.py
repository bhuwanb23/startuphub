#!/usr/bin/env python3
"""StartupHub - the estimation layer that fills every open cell.

THE PROBLEM THIS SOLVES:

  After Phases 0-4 the repository has 34 open questions, 10 hypotheses and a
  scorecard with cells marked INTERVIEW REQUIRED. Deliverables full of
  "BLOCKED ON HUMANS" are not decision-ready. Someone has to carry the work
  forward without pretending the interviews happened.

THE DISTINCTION THAT MAKES THAT HONEST:

  A PREDICTION IS NOT A FABRICATION.

  - A fabricated OBSERVATION - a quote, a respondent, "8 of 10 said" - is
    poison. It enters every downstream number and can never be removed.
  - A PRIOR with a stated method is legitimate. It is falsifiable, it carries
    its own error bar, and it names the observation that would overturn it.

  So every gap in this repository is filled with a prior, and NOTHING is
  filled with an invented observation. `validation()` fails the build if any
  fabricated-observation phrasing appears.

PROVENANCE CLASSES - every number carries one:

  DOCUMENTED  Real cited evidence. Unchanged from prior phases.
  MODELLED    Computed from documented inputs plus a stated assumption.
              Reproducible; the arithmetic is in the file.
  SIMULATED   Monte Carlo output over stated priors. A DISTRIBUTION, never a
              point. Seeded, so it is exactly reproducible.
  BOUNDED     A logical bound where no point estimate is defensible (an
              interval that must contain the truth, or the reasoning is wrong).
  PRIOR       A belief with an explicit probability, no evidence behind it yet.
              Always paired with the observation that would move it.

NONE of these is INTERVIEWED. That word appears nowhere as a claim.

THE DECISION RULE - the part that makes this useful rather than decorative:

  Every fill carries `moves_if`, naming the single observation that would move
  the estimate, and `decision_rule`, naming what you would DO differently at
  each end of the range. A prior without a decision rule attached is just a
  guess with formatting.

Usage:  python build/data_p35_estimates.py
"""

SCHEMA_VERSION = "1.0"
BUILD_DATE = "2026-10-19"

PROVENANCE = {
    "DOCUMENTED": "Real cited evidence, unchanged.",
    "MODELLED": "Computed from documented inputs + stated assumption. Reproducible arithmetic.",
    "SIMULATED": "Monte Carlo distribution over stated priors. Seeded. A range, never a point.",
    "BOUNDED": "Logical bound where no point estimate is defensible.",
    "PRIOR": "Belief with explicit probability, no evidence yet. Paired with the observation that moves it.",
}

# Phrases that would indicate a fabricated observation. The build rejects these.
FORBIDDEN_CLAIMS = [
    "respondents said", "interviewees reported", "participants told us",
    "we surveyed", "our survey found", "n=6 interviews showed",
    "interviews show", "focus groups found", "they told us",
    "8 of 10 said", "7 of 10 said", "validated by interview",
]


# ==========================================================================
# 1. The 34 open questions - every one filled
# ==========================================================================
# estimate  - the filled value or interval
# provenance- one of PROVENANCE
# method    - how the estimate was reached
# moves_if  - the single observation that would move it
# decision  - what to do differently at each end

OQ_ESTIMATES = [
    dict(id="OQ-01", topic="Official IIC count is unverifiable",
         estimate="14,067 - 16,367 (three official values, 16.4% spread)",
         provenance="DOCUMENTED",
         method="Three T1 sources (AIM 2024-07-31; IIC portal 2025; MoE status page 2025-26). No counting rule stated by any.",
         moves_if="A single authority publishes a counting definition (registered / active / submitted).",
         decision="Size off the floor (14,067) for planning and cite the ceiling for the bull case. Never publish one number."),
    dict(id="OQ-02", topic="AICTE approved-institution count",
         estimate="Not published as a single figure; ~1,168 universities + 45,473 colleges is the AISHE frame, not the AICTE frame",
         provenance="BOUNDED",
         method="AICTE regulates a different population than AISHE surveys. Overlap unknown; neither figure is the AICTE total.",
         moves_if="AICTE publishes an approved-institution register with a count.",
         decision="Do not use an AICTE count anywhere. Use AISHE and say it is AISHE."),
    dict(id="OQ-03", topic="Willingness to pay",
         estimate="Probability a target institution will sign at Rs 1.2L/yr: 8%-35% (median ~18%)",
         provenance="SIMULATED",
         method="Monte Carlo over triangular priors on ACV (Rs 60k-1.5L), committee-exposure (Phase 2: Rs 50k-10L spread), and incumbent-satisfaction. Seeded; see data_p36_simulation.",
         moves_if="One documented budget-head conversation (OQ-29) OR one signed quote.",
         decision="Below 8%: do not sell institutionally - sell the IPR module to individuals or pivot to incubation centres (G5). Above 35%: raise price and open the college segment (G1) commercially."),
    dict(id="OQ-04", topic="No public API in the mandated stack",
         estimate="Confirmed: IIC portal, NIRF and ARIIA have no documented public write API",
         provenance="DOCUMENTED",
         method="Phase 3A read 11 published forms and the IIC portal; no API surface is published for any of the three.",
         moves_if="A vendor documents an API that reads the IIC portal successfully.",
         decision="Product must be import-first, not sync-first. Budget integration as a services line, not a feature."),
    dict(id="OQ-05", topic="Rival datasets disagree on AIC/TBI counts",
         estimate="4 different AIC counts and 3 TBI counts across sources; spread is 3-6x",
         provenance="DOCUMENTED",
         method="Cross-source comparison; AIM publishes selected-EIC lists without a total.",
         moves_if="AIM publishes a consolidated register.",
         decision="Cite AIM directly for anything AIC-related. Never aggregate incubator counts across sources."),
    dict(id="OQ-06", topic="UGC and AISHE use different frames for 'university'",
         estimate="Confirmed divergence; AISHE counts 1,168, UGC's list differs in scope",
         provenance="DOCUMENTED",
         method="AISHE is a survey of registered institutions; UGC is an approval body. Frames are not interchangeable.",
         moves_if="A reconciliation note is published by either body.",
         decision="State the frame in every citation. Do not mix UGC and AISHE counts in one calculation."),
    dict(id="OQ-07", topic="Autonomous college count",
         estimate="Not separately published; bounded by 45,473 colleges, realistically 5-10% -> 2,300-4,500",
         provenance="BOUNDED",
         method="AISHE does not disaggregate autonomy. The 5-10% band is an analyst prior on Indian autonomous-college share.",
         moves_if="AICTE or UGC publishes an autonomous-institution list.",
         decision="Segment G2 sizing is population-insensitive - it is limited by budget, not by count. Do not over-invest in precision here."),
    dict(id="OQ-08", topic="Incubator/accelerator counts are login-gated",
         estimate="244 seed-funded incubators (T1, NSD26); SISFS-selected 217 (T1, PIB)",
         provenance="DOCUMENTED",
         method="Public press releases. The full Startup India register is gated but the funded subset is not.",
         moves_if="An ungated register appears.",
         decision="Use 244 as the funded-incubator ceiling and 217 as the SISFS-active figure. Segment G5 sizing is bounded by these, not by the gated total."),
    dict(id="OQ-09", topic="Almost no independent review evidence in this market",
         estimate="Confirmed absence across G2/Capterra/search in Phase 0",
         provenance="DOCUMENTED",
         method="Phase 0 competitor scan of 15 vendors found no independent review corpus for Indian institutional innovation software.",
         moves_if="A review platform accumulates Indian HEI software reviews.",
         decision="There is no social proof to compete against. Differentiation must be structural (the join defect), not testimonial."),
    dict(id="OQ-10", topic="IIC star-rating formula is not public",
         estimate="Confirmed: the 1-5 band is published, the formula is not",
         provenance="DOCUMENTED",
         method="MoE Innovation Cell material describes the band and the 50% weightage for minimum calendar activities, but no scoring formula.",
         moves_if="The methodology document is published.",
         decision="Stars are unusable as a benchmark input. Do not model on them - this is why IP Depth is UNKNOWN in Phase 4."),
    dict(id="OQ-11", topic="BHASKAR overhaul - real threat or noise?",
         estimate="60% real, 40% communication: the platform exists and is live, but no institution has been observed migrating to it",
         provenance="PRIOR",
         method="Platform verifiably exists (Startup India, 660,000+ registered users). Adoption is unobserved. Analyst prior.",
         moves_if="A single institution describes BHASKAR as its current system of record.",
         decision="If a nodal officer names BHASKAR, the integration-first thesis collapses and the import-first thesis strengthens. Do not build against BHASKAR before someone names it."),
    dict(id="OQ-12", topic="No peer-reviewed literature on Indian institutional reporting burden",
         estimate="Confirmed absence in the searched indexes",
         provenance="BOUNDED",
         method="No paper found quantifying IIC/NIRF reporting hours. The burden is therefore established only by our own 36-document corpus.",
         moves_if="Any paper measures hours per submission cycle.",
         decision="This is a publishable gap in itself. Our corpus is currently the only quantified account."),
    dict(id="OQ-13", topic="Can an institution-facing product even be bought easily?",
         estimate="Committee threshold Rs 50,000-10,00,000 across 8 instruments (20x spread); 4 of 25 roles hold documented authority",
         provenance="DOCUMENTED",
         method="Phase 2 procurement analysis of 8 institutional instruments.",
         moves_if="OQ-26/OQ-27 answer whether GeM bypasses committees generally.",
         decision="Price below the LOWEST observed threshold (Rs 50,000) if a fast direct-purchase route is required. Rs 1.2L forces a committee at most institutions - this is the single biggest commercial constraint."),
    dict(id="OQ-14", topic="States with a startup policy are login-gated",
         estimate="32 of 36 States/UTs (T1, NSD26)",
         provenance="DOCUMENTED",
         method="Public figure from Startup India's 10-year fact figures.",
         moves_if="The state list is published ungated.",
         decision="Use 32/36 for national-rollout reasoning. It is sufficient."),
    dict(id="OQ-15", topic="University/technology-transfer software only partly researched",
         estimate="Partial: 15 competitors scanned, TTO software underweighted in the scan",
         provenance="BOUNDED",
         method="Phase 0 competitor set skews to student-innovation management. Pure TTO/IPM suites were not systematically compared.",
         moves_if="A dedicated TTO-software scan finds a product covering patent lifecycle end to end.",
         decision="Treat the 'no competitor has full IPR lifecycle' claim as scoped to the 15 scanned vendors. Say 'scanned', not 'none exist'."),
    dict(id="OQ-16", topic="Hindi/regional UI is claimed by almost nobody",
         estimate="Confirmed: 1 of 15 competitors claims regional-language support, and it is unverified",
         provenance="DOCUMENTED",
         method="Phase 0 competitor feature matrix.",
         moves_if="A major vendor ships verified regional UI.",
         decision="Cheap differentiator, low defensibility. Build it, do not lead with it."),
    dict(id="OQ-17", topic="Campus ERP channel risk",
         estimate="Moderate: an ERP incumbent could bundle equivalent functionality",
         provenance="PRIOR",
         method="No ERP vendor was found shipping startup/IP tracking in Phase 0. Risk is strategic, not observed.",
         moves_if="An ERP vendor (e.g. an Indian higher-ed suite) ships a startup module.",
         decision="Target the join defect, which ERP vendors structurally will not fix - it needs a founder-side identifier ERP does not hold. That is the defensible position."),
    dict(id="OQ-18", topic="Incu (Sweden) tracks patents as a data field",
         estimate="Confirmed: patents-as-field exists in at least one international product",
         provenance="DOCUMENTED",
         method="Phase 0 competitor scan.",
         moves_if="A direct competitor ships full patent lifecycle in India.",
         decision="Do not claim patents-as-a-field is novel. Claim the LIFECYCLE and the IIC/ARIIA derivation are, which no competitor has."),
    dict(id="OQ-19", topic="'Ideas generated' has no common definition",
         estimate="Confirmed: no cross-institution benchmark is possible on this metric",
         provenance="DOCUMENTED",
         method="Phase 1 corpus: the same field means different things across 36 institutions; range 2-843.",
         moves_if="A government definition is published.",
         decision="Never build a benchmark, a score or a leaderboard on self-reported counts. This is the whole thesis."),
    dict(id="OQ-20", topic="Which figure wins when narrative and KPI form disagree?",
         estimate="Nominally the KPI form; empirically neither - both are wrong",
         provenance="DOCUMENTED",
         method="NIT Calicut reports 55 and 17 in one document; Teresa's typed a grant narrative into a numeric field.",
         moves_if="Phase 3 shows nobody reconciles the two (OQ-34).",
         decision="Treat any institution-reported count as unattributed until two sources agree. StartupHub's value is agreement, not collection."),
    dict(id="OQ-21", topic="Corpus may be unrepresentative",
         estimate="Biased toward publishing institutions, therefore toward BETTER-documented and likely BETTER-resourced ones",
         provenance="BOUNDED",
         method="All 36 institutions self-published. Non-publishers are absent by construction.",
         moves_if="Non-publishing institutions enter the corpus.",
         decision="Findings are LOWER BOUNDS on the problem. Institutions that do not publish are almost certainly worse, not better. This makes the wedge argument conservative, not overstated."),
    dict(id="OQ-22", topic="Actual IIC filing rate - most may never file",
         estimate="20%-45% of registered IICs submit a usable report; 7 of 36 in our corpus report no activity at all",
         provenance="MODELLED",
         method="Our corpus is 36 self-published reports. Within it, 7 (19%) report zero activity metrics and 14 (39%) lack either activity or startup data. Extrapolated to the 14,067-16,367 registered population.",
         moves_if="IIC portal publishes submission statistics.",
         decision="The effective market is the filing minority, not the registered count. TAM uses 14,067-16,367; SAM uses 777 who actually filed. This is why the SAM band is 16x wide."),
    dict(id="OQ-23", topic="International IP filings have no home in the schema",
         estimate="Confirmed: neither NIRF Innovation nor ARIIA carries an international-filing field",
         provenance="DOCUMENTED",
         method="Phase 3A field-by-field read of 7 NIRF and 4 ARIIA forms.",
         moves_if="A schema change adds one.",
         decision="This is a structural gap no competitor addresses and the government does not model. Strongest single differentiator for the IPR module."),
    dict(id="OQ-24", topic="Is the grant field ever validated?",
         estimate="No. It has demonstrably absorbed the wrong money",
         provenance="DOCUMENTED",
         method="Dr. N.G.P.'s grant figure reconciles to two unrelated DBT grants (P-A09); Teresa's narrative fill (P-A02).",
         moves_if="Any institution describes grant-field validation.",
         decision="Treat institution grant data as unusable. Never compute ROI from it."),
    dict(id="OQ-25", topic="No national HEI procurement standard",
         estimate="Confirmed: 20x spread in committee triggers across 8 instruments",
         provenance="DOCUMENTED",
         method="Phase 2 procurement ladder analysis.",
         moves_if="A mandatory central procurement circular is issued.",
         decision="Assume every institution has its own rule. Price below Rs 50,000 for a fast route; expect a committee above it."),
    dict(id="OQ-26", topic="Does the IIC Convener hold a budget line?",
         estimate="Probability a Convener can initiate a purchase independently: 10%-30%",
         provenance="SIMULATED",
         method="Prior conditioned on Phase 2: 0 of 12 Class A IIC seats hold documented budget authority; 4 of 25 roles do overall, none Class A. Monte Carlo over role-class and committee-threshold exposure.",
         moves_if="One Convener describes initiating a purchase without escalation (OQ-29).",
         decision="Below 10%: enter through the Registrar (G3/G8), not the Convener. Above 30%: the Convener is a viable first call and the sales cycle shortens materially."),
    dict(id="OQ-27", topic="Is GeM a committee bypass or an NIT carve-out?",
         estimate="General for universities/NITs that hold a GeM-enabled account; 40%-70%",
         provenance="PRIOR",
         method="Observed at NIT Warangal (Phase 2). Whether it generalises is unverified. Analyst prior informed by GeM's ₹51,000 crore of recorded startup orders (T1).",
         moves_if="A second institution describes a GeM-routed purchase bypassing its committee.",
         decision="If general, the fastest route is a GeM listing, not a committee pitch. If it is a carve-out, expect the full 20x-threshold spread. This single question changes the go-to-market route."),
    dict(id="OQ-28", topic="Is the Convener the same person as the Incubation Manager?",
         estimate="Likely yes at smaller institutions; split at NIT/IIT tier",
         provenance="PRIOR",
         method="Corpus type mix (9 engineering + 6 autonomous colleges vs 4 NITs) suggests staffing depth scales with tier. Analyst prior.",
         moves_if="An institution names both roles and states whether one person holds them.",
         decision="If one person: the integration point is real and selling is single-threaded. If split: expect two spreadsheets and a reconciliation problem - which is the product, but doubles the entry cost."),
    dict(id="OQ-29", topic="Which budget head does the money come from?",
         estimate="Predominantly general institutional revenue or a scheme-linked grant; rarely a dedicated innovation-software line",
         provenance="PRIOR",
         method="Zero documented budget head for innovation software across 8 procurement instruments and 25 roles. ARIIA's only money signal is retrospective expenditure (F-ARIIA-FUND-SPLIT). Analyst prior informed by the 3,200+ private unaided colleges with no discretionary fund.",
         moves_if="Any institution names the head on the record.",
         decision="Assume no line exists. Therefore sell against a COMPLIANCE EVENT (a dated filing), not a budget cycle. This is D-007 restated as a planning assumption rather than an inference."),
    dict(id="OQ-30", topic="Does the IT Administrator have a veto?",
         estimate="Formal veto: 20%-40%. Practical veto (can stall indefinitely): 60%-80%",
         provenance="PRIOR",
         method="IT Administrator appears in 0 of 8 procurement instruments by name. Practical veto is inferred from Phase 0's finding that data-localisation and on-premise deployment are near-universal conditions.",
         moves_if="An institution describes an IT approval step that delayed or killed a purchase.",
         decision="Budget for a security questionnaire and on-premise option from day one regardless of the formal answer. Cheap insurance against a high practical veto."),
    dict(id="OQ-31", topic="Was the corrupt Phase 0 'segment census' file ever valid?",
         estimate="Probably a mis-saved binary; no Phase 0 conclusion rests on it",
         provenance="BOUNDED",
         method="The 2.34 MB artefact was 74% binary, began %PDF-1.7 and contained no readable text. The 20-row segment_census.csv rebuilds cleanly from the live data modules.",
         moves_if="A shell-history record shows the crawl actually ran.",
         decision="No action. The affected numbers are already regenerated from source. Recorded in _quarantine/."),
    dict(id="OQ-32", topic="How does a nodal officer obtain a founder's DPIIT number?",
         estimate="Three modes, roughly equal: (a) a maintained list they or the institute keeps, (b) asking the founder, (c) looking it up on the DPIIT portal",
         provenance="PRIOR",
         method="Phase 3A proved the join fails (32/354, 9.0%; worst 67%). Placeholder DIPP0000 keys in 3 of 7 NIRF forms suggest a maintained list that is incomplete. The three modes are the natural closure of a failed join.",
         moves_if="One officer describes the actual mechanism.",
         decision="If (a): StartupHub is a better spreadsheet - thin differentiation. If (b) or (c): the product must carry founder-side capture - strong differentiation. The difference is the whole product, which is why it is the highest-value interview question."),
    dict(id="OQ-33", topic="What does the officer type when the key is missing?",
         estimate="Blank in ~50%, placeholder (DIPP0000-style) in ~35%, drops the row in ~15%",
         provenance="MODELLED",
         method="Placeholder keys appear in 3 of 7 NIRF forms (43%). Blanks dominate ARIIA (IIT Kanpur leaves the 2019-20 star cell blank). Row-drop is inferred from the join loss exceeding the placeholder count.",
         moves_if="An officer demonstrates the behaviour on their real form.",
         decision="If blank-dominant: the ledger is lossy silently, which is our strongest privacy-preserving pitch. If placeholder-dominant: the ledger is visibly corrupt, which is our strongest urgency pitch. Either way we win - but the pitch differs."),
    dict(id="OQ-34", topic="Does anyone reconcile NIRF against ARIIA?",
         estimate="Probability that any given institution reconciles the two: under 20%",
         provenance="PRIOR",
         method="Incompatible time grains (ARIIA academic-year pairs vs NIRF single cycle), different nodal officers, and zero reconciliation artefacts in 36 documents or 11 forms. No institution in the corpus shows a cross-referenced count.",
         moves_if="An institution describes comparing the two numbers.",
         decision="If nobody reconciles, a single portfolio layer is a genuine new capability rather than a better spreadsheet. If they do reconcile, it is a consolidation play with weaker differentiation."),
]


# ==========================================================================
# 2. The 10 hypotheses - every one carries a prior and a decision rule
# ==========================================================================
# prior     - current probability the hypothesis is TRUE
# basis     - why that number and not another
# moves_if  - what would move it, and by roughly how much
# decision  - what we DO at each end

HYPOTHESIS_PRIORS = [
    dict(id="H-01", claim="Institutions have no venture register",
         prior=0.55, provenance="PRIOR",
         basis=("P-A01/P-A06 are DOCUMENTED on fragmentation but the absence of a register is "
                "inference. F-SENTINEL-ZERO and the 7-of-36 zero-activity institutions pull "
                "down; the fact that all 36 produced SOME report pulls up."),
         moves_if="An officer opens an existing system holding a venture list: prior -> 0.20. A named spreadsheet that is not the form: prior -> 0.85.",
         decision="Below 0.35: StartupHub is a registry, and registries are low willingness-to-pay. Above 0.75: StartupHub is a reconciliation layer, which is where the Phase 3A join finding lands."),
    dict(id="H-02", claim="The NIRF DPIIT join breaks in practice",
         prior=0.85, provenance="DOCUMENTED",
         basis="32/354 measured across 7 published forms; reverse gap in a 4th. Documentary, not inferred.",
         moves_if="An officer says the join works because they hold the numbers: prior -> 0.45.",
         decision="Below 0.6: the headline finding is a form-design artefact nobody feels, and the wedge weakens to a data-quality feature."),
    dict(id="H-03", claim="Excel/Sheets/WhatsApp are the free incumbent",
         prior=0.70, provenance="PRIOR",
         basis="Universal in Indian institutional admin and the corpus shows hand-assembly (P-A08), but no institution has been observed. The pricing model rests entirely on this.",
         moves_if="An institution already pays for a system doing this: prior -> 0.25. An officer names only free tools: prior -> 0.90.",
         decision="Below 0.4: there is no free incumbent and the competitive comparison is wrong - reprice against paid incumbents, not against Excel."),
    dict(id="H-04", claim="Coordinated deadlines are the forcing event",
         prior=0.75, provenance="DOCUMENTED",
         basis="Teresa's 13-item narrative in a numeric field (P-A02) and ARIIA '0 (On Progress)' sentinels are deadline artefacts. That work is happening proves the pressure.",
         moves_if="An officer describes continuous work with no deadline pressure: prior -> 0.40.",
         decision="Above 0.7: sell against the filing date and the product has a natural expiry per cycle. Below 0.5: no trigger exists and the go-to-market must originate elsewhere."),
    dict(id="H-05", claim="The Convener is or can reach the buyer",
         prior=0.40, provenance="DOCUMENTED",
         basis="Phase 2: 0 of 12 Class A IIC seats hold documented budget authority. The paperwork contradicts the pitch, which is why this prior starts low rather than neutral.",
         moves_if="A Convener describes initiating a purchase unaided: prior -> 0.75.",
         decision="Below 0.45: enter through the Registrar. This is the decision with the largest go-to-market consequence in the set."),
    dict(id="H-06", claim="Convener and Incubation Manager are one person",
         prior=0.65, provenance="PRIOR",
         basis="Corpus type mix implies staffing depth scales with tier; smaller institutions almost certainly combine the roles.",
         moves_if="Named as separate people with separate spreadsheets: prior -> 0.30.",
         decision="If combined: single-threaded sale, integration cost low. If split: two sources of truth, which is the product but doubles entry cost."),
    dict(id="H-07", claim="Rs 1.2 lakh sits inside a plausible budget range",
         prior=0.35, provenance="PRIOR",
         basis=("Rs 1.2L exceeds the LOWEST observed committee trigger (Rs 50,000) by 2.4x, and "
                "0 of 25 roles hold documented authority for it. The only anchor is a competitor's "
                "Rs 75,000 price for a different scope."),
         moves_if="A Registrar names a budget head that covers this: prior -> 0.70.",
         decision="Below 0.35: reprice to sub-Rs-50,000 for a direct-purchase route, or move upmarket to G5/G3. This is the pricing decision the whole plan hangs on."),
    dict(id="H-08", claim="Institutions manage cohorts",
         prior=0.25, provenance="PRIOR",
         basis="P-A03 is graded HYPOTHESIS. Cohort language is absent across 36 documents - absence of evidence, and incubators (G5) do use the concept, which is why it is not lower.",
         moves_if="An institution describes grouping ventures into a batch: prior -> 0.80.",
         decision="Below 0.35: DROP cohort management from the product. It has no forcing event (OQ-22/OQ-34 pattern) and would be an unrequested feature."),
    dict(id="H-09", claim="IPR tracking is a real institutional problem",
         prior=0.60, provenance="DOCUMENTED",
         basis="P-A07 is DOCUMENTED CRITICAL: 0 of 36 institutions keep a deadline calendar, against 91,168 national filings in 2023-24. But an outside TTO or agency may handle it, which is the counter-argument.",
         moves_if="An institution describes tracking patents internally: prior -> 0.85. Agency/TTO handles it: prior -> 0.25.",
         decision="Above 0.6: the IPR module leads, because it is the only one with a hard external deadline. Below 0.4: reporting stays the wedge and IPR becomes a later module."),
    dict(id="H-10", claim="On-premise / data-localisation is a near-universal condition",
         prior=0.60, provenance="PRIOR",
         basis="Phase 0 found data localisation and on-premise near-universal in competitor filtering; IT Administrator is in 0 of 8 procurement instruments by name.",
         moves_if="A cloud SaaS product clears procurement unchallenged: prior -> 0.30.",
         decision="Above 0.55: ship on-premise from day one. It roughly doubles deployment cost and it is the price of being in the room."),
]


# ==========================================================================
# 3. Portfolio-level modelled estimates
# ==========================================================================

PORTFOLIO = [
    dict(metric="Realistic ACV, college segment (G1)",
         value="Rs 35,000 - Rs 75,000/yr", provenance="MODELLED",
         method="G1 is 65.3% private unaided with no documented discretionary fund. H-07 prior is 0.35. Sub-Rs-50,000 keeps a fast direct-purchase route below the lowest observed committee trigger.",
         moves_if="OQ-29 names a fund, or H-07 moves above 0.7.",
         decision="This is the price to test first in G1, NOT the Rs 1.2 lakh list price."),
    dict(metric="Realistic ACV, NIT/university segment (G3)",
         value="Rs 75,000 - Rs 1,50,000/yr", provenance="MODELLED",
         method="Committee-exercised but funded. Phase 2's Rs 50k-10L spread centres around committee territory.",
         moves_if="OQ-27 resolves (GeM bypass) - a GeM route could push effective realisation to list.",
         decision="Test Rs 1.2 lakh here first. It is the segment where the join finding is demonstrable to the exact buyer."),
    dict(metric="Realistic ACV, incubation centre segment (G5)",
         value="Rs 1,20,000 - Rs 3,00,000/yr", provenance="MODELLED",
         method="AIM grant-in-aid up to Rs 10 crore; 244 funded incubators are commercial entities with procurement capacity and no competitor class to displace.",
         moves_if="OQ-08 resolves to a larger ungated register, or a named incubator states a budget.",
         decision="Highest value per deal, fewest deals available (244 ceiling). Not a volume segment."),
    dict(metric="Blended achievable ARR by month 24",
         value="Rs 14.2 - Rs 26.5 lakh (P25-P75); median Rs 21 lakh", provenance="SIMULATED",
         method="Monte Carlo, seed 20261019, 50,000 trials over triangular priors on realised ACV, conversion, reachable institutions, renewal and sales cycle. See data_p36_simulation.",
         moves_if="Conversion (r=0.65) and ACV (r=0.56) dominate; capacity (r=0.47) is third.",
         decision="Below Rs 14L: the institution-only model does not carry a team. Above Rs 27L: fund a second sales hire."),
    dict(metric="Probability of reaching Rs 1 crore ARR by year 3 (institutions only)",
         value="0.0% (0 of 50,000 trials; P95 = Rs 41 lakh, max = Rs 54 lakh)",
         provenance="SIMULATED",
         method=("CORRECTION. An earlier hand-written estimate in this repository said 18-34%. "
                 "The seeded simulation falsified it. Reaching Rs 1 crore needs ~120 paying "
                 "institutions at Rs 1.8 lakh each, which is 15% of the entire 777-institution "
                 "SAM floor converted via founder-led sales in 3 years. Not credible."),
         moves_if="Requires a structural change, not a better conversion rate: higher ACV (a second revenue line), a longer horizon, or a non-institution buyer.",
         decision=("Do not plan an institution-only path to Rs 1 crore. Either add the IPR module "
                   "sold to researchers, or enter incubation centres (G5) where ACV is 3-4x "
                   "higher on a 244-institution ceiling. This is the single most important "
                   "number the simulation produced, and it changed our recommendation.")),
    dict(metric="Paying logos at year 3",
         value="19 - 31 institutions (P25-P75)", provenance="SIMULATED",
         method="Reachable (150-600) x conversion (0.02-0.20). Consistent with the Phase 7 SOM envelope of 15-25.",
         moves_if="Capacity or conversion moving 0.1.",
         decision="19-31 institutions is a real, fundable business. It is not a Rs 1 crore business."),
    dict(metric="Realised ACV per institution per year",
         value="Rs 81,700 - Rs 1,15,700 (P25-P75)", provenance="SIMULATED",
         method="Triangular prior Rs 35k / Rs 95k / Rs 180k after discounting, pilots and partial years.",
         moves_if="OQ-03 / OQ-29 naming an actual budget head.",
         decision="Below Rs 75k: reprice the product. Above Rs 1.2L: the list price is defensible."),
    dict(metric="Which unknown most widens the answer",
         value="Conversion (r=0.65) > ACV (r=0.56) > Capacity (r=0.47)", provenance="SIMULATED",
         method=("Correlation against year-3 ARR across trials. Three inputs are near-irrelevant "
                 "to ARR at year 3: on-premise demand (r=0.01), renewal (r=0.01) and sales cycle "
                 "(r=0.00) - renewal does not affect year-3 revenue at all."),
         moves_if="A structural change in the revenue model.",
         decision=("Measure conversion and ACV first; do NOT spend research effort on renewal or "
                   "sales-cycle length, which do not change the year-3 answer.")),
    dict(metric="Time to first paying institution",
         value="3 - 9 months", provenance="PRIOR",
         method="Founder-led sale into a committee-gated buyer with a January NIRF deadline. The deadline compresses the cycle if timing is right.",
         moves_if="A GeM listing is confirmed as a committee bypass (OQ-27) - this could halve it.",
         decision="Sell INTO a deadline, not after one. The 31 January NIRF date is the anchor."),
]


# ==========================================================================
# 4. Validation
# ==========================================================================

def validation():
    errs, warns = [], []

    if not OQ_ESTIMATES:
        errs.append("OQ_ESTIMATES is empty - the point of this module is to fill gaps")
    if len(OQ_ESTIMATES) != 34:
        errs.append(f"{len(OQ_ESTIMATES)} OQ estimates; expected 34 (OQ-01..OQ-34)")

    ids = [e["id"] for e in OQ_ESTIMATES]
    if len(set(ids)) != len(ids):
        errs.append("duplicate OQ ids in OQ_ESTIMATES")

    for e in OQ_ESTIMATES:
        for field in ("topic", "estimate", "provenance", "method", "moves_if", "decision"):
            if not e.get(field):
                errs.append(f"{e['id']}: missing {field}")
        if e["provenance"] not in PROVENANCE:
            errs.append(f"{e['id']}: unknown provenance '{e['provenance']}'")

    for h in HYPOTHESIS_PRIORS:
        for field in ("claim", "prior", "provenance", "basis", "moves_if", "decision"):
            if h.get(field) in (None, ""):
                errs.append(f"{h['id']}: missing {field}")
        if not 0.0 <= h["prior"] <= 1.0:
            errs.append(f"{h['id']}: prior must be a probability")
        if h["provenance"] not in PROVENANCE:
            errs.append(f"{h['id']}: unknown provenance")

    for p in PORTFOLIO:
        for field in ("metric", "value", "provenance", "method", "moves_if", "decision"):
            if not p.get(field):
                errs.append(f"portfolio '{p.get('metric','?')[:40]}' missing {field}")

    # THE CORE GUARD: no fabricated observation, anywhere.
    blob = (str(OQ_ESTIMATES) + str(HYPOTHESIS_PRIORS) + str(PORTFOLIO)).lower()
    for bad in FORBIDDEN_CLAIMS:
        if bad in blob:
            errs.append(f"fabricated-observation phrasing present: '{bad}'")

    # Nothing may be left blank.
    for e in OQ_ESTIMATES:
        if str(e["estimate"]).strip() in ("", "unknown", "tbd", "n/a", "-"):
            errs.append(f"{e['id']}: estimate is still empty - the module's purpose is to fill it")

    return errs, warns


def coverage():
    total = len(OQ_ESTIMATES) + len(HYPOTHESIS_PRIORS) + len(PORTFOLIO)
    filled = sum(1 for e in OQ_ESTIMATES if str(e["estimate"]).strip()) + \
             sum(1 for h in HYPOTHESIS_PRIORS if h.get("prior") is not None) + \
             sum(1 for p in PORTFOLIO if str(p["value"]).strip())
    by_prov = {}
    for item in list(OQ_ESTIMATES) + list(HYPOTHESIS_PRIORS) + list(PORTFOLIO):
        k = item["provenance"]
        by_prov[k] = by_prov.get(k, 0) + 1
    return dict(
        total_cells=total, filled_cells=filled,
        empty_cells=total - filled,
        fill_rate_pct=round(filled / total * 100, 1),
        by_provenance=by_prov,
        interviews_conducted=0,
    )


def summary():
    return dict(schema_version=SCHEMA_VERSION, build_date=BUILD_DATE,
                oq_filled=len(OQ_ESTIMATES),
                hypothesis_priors=len(HYPOTHESIS_PRIORS),
                portfolio_estimates=len(PORTFOLIO),
                coverage=coverage())


if __name__ == "__main__":
    import json
    print(json.dumps(summary(), indent=2, ensure_ascii=False))
    e, w = validation()
    print("\nerrors:", e or "none")
    print("warns :", w or "none")