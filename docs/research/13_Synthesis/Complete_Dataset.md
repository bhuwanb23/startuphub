# Complete Dataset — every cell filled, every cell labelled

**Built 2026-10-19 by `build/build_phase35.py`. 53/53 cells filled (100.0%). 0 empty.**

---

## What this is, and the line it holds

A previous state of this repository ended with `BLOCKED ON HUMANS` in several places. That is not decision-ready, and it was not the right way to leave the work.

So every gap is now **filled with a prior** — and the distinction that makes this honest is:

> ### A prediction is not a fabrication.
>
> - A **fabricated observation** — a quote, a respondent, *"8 of 10 said"* — is poison. It enters every downstream number and can never be removed.
> - A **prior with a stated method** is legitimate. It is falsifiable, it carries its own error bar, and it names the observation that would overturn it.

**No cell in this repository is filled with an invented respondent.** The build fails if that phrasing appears anywhere.

---

## Provenance classes

| Class | Meaning | Cells |
|---|---|---:|
| **DOCUMENTED** | Real cited evidence, unchanged. | 20 |
| **MODELLED** | Computed from documented inputs + stated assumption. Reproducible arithmetic. | 5 |
| **SIMULATED** | Monte Carlo distribution over stated priors. Seeded. A range, never a point. | 7 |
| **BOUNDED** | Logical bound where no point estimate is defensible. | 6 |
| **PRIOR** | Belief with explicit probability, no evidence yet. Paired with the observation that moves it. | 15 |

**Interviews conducted: 0.** That number is not going anywhere.

---

## The headline: the simulation falsified our own estimate

An earlier hand-written figure in this repository put the probability of **reaching ₹1 crore ARR by year 3** at **18–34%**.

A seeded Monte Carlo over 50,000 trials says **0.0%**.

| Percentile | Year-3 ARR |
|---|---:|
| P5 | Rs 0.10 crore |
| P25 | Rs 0.17 crore |
| median | Rs 0.23 crore |
| P75 | Rs 0.31 crore |
| P95 | Rs 0.41 crore |
| max | Rs 0.54 crore |

**P(ARR ≥ ₹1 crore) = 0.00%.** Even the P95 is only Rs 0.41 crore.

Reaching ₹1 crore requires ~120 paying institutions at ₹1.8 lakh each — that is **15% of the entire 777-institution SAM floor**, converted via founder-led sales inside three years. It is not credible, and the optimistic joint tail of all three priors still only reaches ₹2.16 crore.

> ### What this changes
>
> Do **not** plan an institution-only path to ₹1 crore. Either add the IPR module sold to individual researchers (a second revenue line at a different price point), or enter incubation centres (G5) where ACV is 3–4× higher on a 244-institution ceiling.
>
> This is the single most valuable number the simulation produced, and it **changed our recommendation**.

---

## Where the uncertainty actually lives

| Priority | Input | Correlation with year-3 ARR |
|---:|---|---:|
| 1 | `conversion` | +0.649 |
| 2 | `acv_realised` | +0.561 |
| 3 | `reachable_y3` | +0.468 |
| 4 | `on_premise_demand` | +0.010 |
| 5 | `renewal` | +0.006 |
| 6 | `sales_cycle_months` | +0.003 |

> **Measure conversion and ACV first.** Do not spend research effort on renewal or sales-cycle length — both sit at r ≈ 0.00 and cannot move the year-3 answer at all. Renewal does not affect year-3 revenue by definition.

---

## All 34 open questions, filled

### OQ-01 — Official IIC count is unverifiable

**Estimate.** 14,067 - 16,367 (three official values, 16.4% spread)  
**Provenance.** `DOCUMENTED`

- **Method:** Three T1 sources (AIM 2024-07-31; IIC portal 2025; MoE status page 2025-26). No counting rule stated by any.
- **What would move it:** A single authority publishes a counting definition (registered / active / submitted).
- **Decision rule:** Size off the floor (14,067) for planning and cite the ceiling for the bull case. Never publish one number.

### OQ-02 — AICTE approved-institution count

**Estimate.** Not published as a single figure; ~1,168 universities + 45,473 colleges is the AISHE frame, not the AICTE frame  
**Provenance.** `BOUNDED`

- **Method:** AICTE regulates a different population than AISHE surveys. Overlap unknown; neither figure is the AICTE total.
- **What would move it:** AICTE publishes an approved-institution register with a count.
- **Decision rule:** Do not use an AICTE count anywhere. Use AISHE and say it is AISHE.

### OQ-03 — Willingness to pay

**Estimate.** Probability a target institution will sign at Rs 1.2L/yr: 8%-35% (median ~18%)  
**Provenance.** `SIMULATED`

- **Method:** Monte Carlo over triangular priors on ACV (Rs 60k-1.5L), committee-exposure (Phase 2: Rs 50k-10L spread), and incumbent-satisfaction. Seeded; see data_p36_simulation.
- **What would move it:** One documented budget-head conversation (OQ-29) OR one signed quote.
- **Decision rule:** Below 8%: do not sell institutionally - sell the IPR module to individuals or pivot to incubation centres (G5). Above 35%: raise price and open the college segment (G1) commercially.

### OQ-04 — No public API in the mandated stack

**Estimate.** Confirmed: IIC portal, NIRF and ARIIA have no documented public write API  
**Provenance.** `DOCUMENTED`

- **Method:** Phase 3A read 11 published forms and the IIC portal; no API surface is published for any of the three.
- **What would move it:** A vendor documents an API that reads the IIC portal successfully.
- **Decision rule:** Product must be import-first, not sync-first. Budget integration as a services line, not a feature.

### OQ-05 — Rival datasets disagree on AIC/TBI counts

**Estimate.** 4 different AIC counts and 3 TBI counts across sources; spread is 3-6x  
**Provenance.** `DOCUMENTED`

- **Method:** Cross-source comparison; AIM publishes selected-EIC lists without a total.
- **What would move it:** AIM publishes a consolidated register.
- **Decision rule:** Cite AIM directly for anything AIC-related. Never aggregate incubator counts across sources.

### OQ-06 — UGC and AISHE use different frames for 'university'

**Estimate.** Confirmed divergence; AISHE counts 1,168, UGC's list differs in scope  
**Provenance.** `DOCUMENTED`

- **Method:** AISHE is a survey of registered institutions; UGC is an approval body. Frames are not interchangeable.
- **What would move it:** A reconciliation note is published by either body.
- **Decision rule:** State the frame in every citation. Do not mix UGC and AISHE counts in one calculation.

### OQ-07 — Autonomous college count

**Estimate.** Not separately published; bounded by 45,473 colleges, realistically 5-10% -> 2,300-4,500  
**Provenance.** `BOUNDED`

- **Method:** AISHE does not disaggregate autonomy. The 5-10% band is an analyst prior on Indian autonomous-college share.
- **What would move it:** AICTE or UGC publishes an autonomous-institution list.
- **Decision rule:** Segment G2 sizing is population-insensitive - it is limited by budget, not by count. Do not over-invest in precision here.

### OQ-08 — Incubator/accelerator counts are login-gated

**Estimate.** 244 seed-funded incubators (T1, NSD26); SISFS-selected 217 (T1, PIB)  
**Provenance.** `DOCUMENTED`

- **Method:** Public press releases. The full Startup India register is gated but the funded subset is not.
- **What would move it:** An ungated register appears.
- **Decision rule:** Use 244 as the funded-incubator ceiling and 217 as the SISFS-active figure. Segment G5 sizing is bounded by these, not by the gated total.

### OQ-09 — Almost no independent review evidence in this market

**Estimate.** Confirmed absence across G2/Capterra/search in Phase 0  
**Provenance.** `DOCUMENTED`

- **Method:** Phase 0 competitor scan of 15 vendors found no independent review corpus for Indian institutional innovation software.
- **What would move it:** A review platform accumulates Indian HEI software reviews.
- **Decision rule:** There is no social proof to compete against. Differentiation must be structural (the join defect), not testimonial.

### OQ-10 — IIC star-rating formula is not public

**Estimate.** Confirmed: the 1-5 band is published, the formula is not  
**Provenance.** `DOCUMENTED`

- **Method:** MoE Innovation Cell material describes the band and the 50% weightage for minimum calendar activities, but no scoring formula.
- **What would move it:** The methodology document is published.
- **Decision rule:** Stars are unusable as a benchmark input. Do not model on them - this is why IP Depth is UNKNOWN in Phase 4.

### OQ-11 — BHASKAR overhaul - real threat or noise?

**Estimate.** 60% real, 40% communication: the platform exists and is live, but no institution has been observed migrating to it  
**Provenance.** `PRIOR`

- **Method:** Platform verifiably exists (Startup India, 660,000+ registered users). Adoption is unobserved. Analyst prior.
- **What would move it:** A single institution describes BHASKAR as its current system of record.
- **Decision rule:** If a nodal officer names BHASKAR, the integration-first thesis collapses and the import-first thesis strengthens. Do not build against BHASKAR before someone names it.

### OQ-12 — No peer-reviewed literature on Indian institutional reporting burden

**Estimate.** Confirmed absence in the searched indexes  
**Provenance.** `BOUNDED`

- **Method:** No paper found quantifying IIC/NIRF reporting hours. The burden is therefore established only by our own 36-document corpus.
- **What would move it:** Any paper measures hours per submission cycle.
- **Decision rule:** This is a publishable gap in itself. Our corpus is currently the only quantified account.

### OQ-13 — Can an institution-facing product even be bought easily?

**Estimate.** Committee threshold Rs 50,000-10,00,000 across 8 instruments (20x spread); 4 of 25 roles hold documented authority  
**Provenance.** `DOCUMENTED`

- **Method:** Phase 2 procurement analysis of 8 institutional instruments.
- **What would move it:** OQ-26/OQ-27 answer whether GeM bypasses committees generally.
- **Decision rule:** Price below the LOWEST observed threshold (Rs 50,000) if a fast direct-purchase route is required. Rs 1.2L forces a committee at most institutions - this is the single biggest commercial constraint.

### OQ-14 — States with a startup policy are login-gated

**Estimate.** 32 of 36 States/UTs (T1, NSD26)  
**Provenance.** `DOCUMENTED`

- **Method:** Public figure from Startup India's 10-year fact figures.
- **What would move it:** The state list is published ungated.
- **Decision rule:** Use 32/36 for national-rollout reasoning. It is sufficient.

### OQ-15 — University/technology-transfer software only partly researched

**Estimate.** Partial: 15 competitors scanned, TTO software underweighted in the scan  
**Provenance.** `BOUNDED`

- **Method:** Phase 0 competitor set skews to student-innovation management. Pure TTO/IPM suites were not systematically compared.
- **What would move it:** A dedicated TTO-software scan finds a product covering patent lifecycle end to end.
- **Decision rule:** Treat the 'no competitor has full IPR lifecycle' claim as scoped to the 15 scanned vendors. Say 'scanned', not 'none exist'.

### OQ-16 — Hindi/regional UI is claimed by almost nobody

**Estimate.** Confirmed: 1 of 15 competitors claims regional-language support, and it is unverified  
**Provenance.** `DOCUMENTED`

- **Method:** Phase 0 competitor feature matrix.
- **What would move it:** A major vendor ships verified regional UI.
- **Decision rule:** Cheap differentiator, low defensibility. Build it, do not lead with it.

### OQ-17 — Campus ERP channel risk

**Estimate.** Moderate: an ERP incumbent could bundle equivalent functionality  
**Provenance.** `PRIOR`

- **Method:** No ERP vendor was found shipping startup/IP tracking in Phase 0. Risk is strategic, not observed.
- **What would move it:** An ERP vendor (e.g. an Indian higher-ed suite) ships a startup module.
- **Decision rule:** Target the join defect, which ERP vendors structurally will not fix - it needs a founder-side identifier ERP does not hold. That is the defensible position.

### OQ-18 — Incu (Sweden) tracks patents as a data field

**Estimate.** Confirmed: patents-as-field exists in at least one international product  
**Provenance.** `DOCUMENTED`

- **Method:** Phase 0 competitor scan.
- **What would move it:** A direct competitor ships full patent lifecycle in India.
- **Decision rule:** Do not claim patents-as-a-field is novel. Claim the LIFECYCLE and the IIC/ARIIA derivation are, which no competitor has.

### OQ-19 — 'Ideas generated' has no common definition

**Estimate.** Confirmed: no cross-institution benchmark is possible on this metric  
**Provenance.** `DOCUMENTED`

- **Method:** Phase 1 corpus: the same field means different things across 36 institutions; range 2-843.
- **What would move it:** A government definition is published.
- **Decision rule:** Never build a benchmark, a score or a leaderboard on self-reported counts. This is the whole thesis.

### OQ-20 — Which figure wins when narrative and KPI form disagree?

**Estimate.** Nominally the KPI form; empirically neither - both are wrong  
**Provenance.** `DOCUMENTED`

- **Method:** NIT Calicut reports 55 and 17 in one document; Teresa's typed a grant narrative into a numeric field.
- **What would move it:** Phase 3 shows nobody reconciles the two (OQ-34).
- **Decision rule:** Treat any institution-reported count as unattributed until two sources agree. StartupHub's value is agreement, not collection.

### OQ-21 — Corpus may be unrepresentative

**Estimate.** Biased toward publishing institutions, therefore toward BETTER-documented and likely BETTER-resourced ones  
**Provenance.** `BOUNDED`

- **Method:** All 36 institutions self-published. Non-publishers are absent by construction.
- **What would move it:** Non-publishing institutions enter the corpus.
- **Decision rule:** Findings are LOWER BOUNDS on the problem. Institutions that do not publish are almost certainly worse, not better. This makes the wedge argument conservative, not overstated.

### OQ-22 — Actual IIC filing rate - most may never file

**Estimate.** 20%-45% of registered IICs submit a usable report; 7 of 36 in our corpus report no activity at all  
**Provenance.** `MODELLED`

- **Method:** Our corpus is 36 self-published reports. Within it, 7 (19%) report zero activity metrics and 14 (39%) lack either activity or startup data. Extrapolated to the 14,067-16,367 registered population.
- **What would move it:** IIC portal publishes submission statistics.
- **Decision rule:** The effective market is the filing minority, not the registered count. TAM uses 14,067-16,367; SAM uses 777 who actually filed. This is why the SAM band is 16x wide.

### OQ-23 — International IP filings have no home in the schema

**Estimate.** Confirmed: neither NIRF Innovation nor ARIIA carries an international-filing field  
**Provenance.** `DOCUMENTED`

- **Method:** Phase 3A field-by-field read of 7 NIRF and 4 ARIIA forms.
- **What would move it:** A schema change adds one.
- **Decision rule:** This is a structural gap no competitor addresses and the government does not model. Strongest single differentiator for the IPR module.

### OQ-24 — Is the grant field ever validated?

**Estimate.** No. It has demonstrably absorbed the wrong money  
**Provenance.** `DOCUMENTED`

- **Method:** Dr. N.G.P.'s grant figure reconciles to two unrelated DBT grants (P-A09); Teresa's narrative fill (P-A02).
- **What would move it:** Any institution describes grant-field validation.
- **Decision rule:** Treat institution grant data as unusable. Never compute ROI from it.

### OQ-25 — No national HEI procurement standard

**Estimate.** Confirmed: 20x spread in committee triggers across 8 instruments  
**Provenance.** `DOCUMENTED`

- **Method:** Phase 2 procurement ladder analysis.
- **What would move it:** A mandatory central procurement circular is issued.
- **Decision rule:** Assume every institution has its own rule. Price below Rs 50,000 for a fast route; expect a committee above it.

### OQ-26 — Does the IIC Convener hold a budget line?

**Estimate.** Probability a Convener can initiate a purchase independently: 10%-30%  
**Provenance.** `SIMULATED`

- **Method:** Prior conditioned on Phase 2: 0 of 12 Class A IIC seats hold documented budget authority; 4 of 25 roles do overall, none Class A. Monte Carlo over role-class and committee-threshold exposure.
- **What would move it:** One Convener describes initiating a purchase without escalation (OQ-29).
- **Decision rule:** Below 10%: enter through the Registrar (G3/G8), not the Convener. Above 30%: the Convener is a viable first call and the sales cycle shortens materially.

### OQ-27 — Is GeM a committee bypass or an NIT carve-out?

**Estimate.** General for universities/NITs that hold a GeM-enabled account; 40%-70%  
**Provenance.** `PRIOR`

- **Method:** Observed at NIT Warangal (Phase 2). Whether it generalises is unverified. Analyst prior informed by GeM's ₹51,000 crore of recorded startup orders (T1).
- **What would move it:** A second institution describes a GeM-routed purchase bypassing its committee.
- **Decision rule:** If general, the fastest route is a GeM listing, not a committee pitch. If it is a carve-out, expect the full 20x-threshold spread. This single question changes the go-to-market route.

### OQ-28 — Is the Convener the same person as the Incubation Manager?

**Estimate.** Likely yes at smaller institutions; split at NIT/IIT tier  
**Provenance.** `PRIOR`

- **Method:** Corpus type mix (9 engineering + 6 autonomous colleges vs 4 NITs) suggests staffing depth scales with tier. Analyst prior.
- **What would move it:** An institution names both roles and states whether one person holds them.
- **Decision rule:** If one person: the integration point is real and selling is single-threaded. If split: expect two spreadsheets and a reconciliation problem - which is the product, but doubles the entry cost.

### OQ-29 — Which budget head does the money come from?

**Estimate.** Predominantly general institutional revenue or a scheme-linked grant; rarely a dedicated innovation-software line  
**Provenance.** `PRIOR`

- **Method:** Zero documented budget head for innovation software across 8 procurement instruments and 25 roles. ARIIA's only money signal is retrospective expenditure (F-ARIIA-FUND-SPLIT). Analyst prior informed by the 3,200+ private unaided colleges with no discretionary fund.
- **What would move it:** Any institution names the head on the record.
- **Decision rule:** Assume no line exists. Therefore sell against a COMPLIANCE EVENT (a dated filing), not a budget cycle. This is D-007 restated as a planning assumption rather than an inference.

### OQ-30 — Does the IT Administrator have a veto?

**Estimate.** Formal veto: 20%-40%. Practical veto (can stall indefinitely): 60%-80%  
**Provenance.** `PRIOR`

- **Method:** IT Administrator appears in 0 of 8 procurement instruments by name. Practical veto is inferred from Phase 0's finding that data-localisation and on-premise deployment are near-universal conditions.
- **What would move it:** An institution describes an IT approval step that delayed or killed a purchase.
- **Decision rule:** Budget for a security questionnaire and on-premise option from day one regardless of the formal answer. Cheap insurance against a high practical veto.

### OQ-31 — Was the corrupt Phase 0 'segment census' file ever valid?

**Estimate.** Probably a mis-saved binary; no Phase 0 conclusion rests on it  
**Provenance.** `BOUNDED`

- **Method:** The 2.34 MB artefact was 74% binary, began %PDF-1.7 and contained no readable text. The 20-row segment_census.csv rebuilds cleanly from the live data modules.
- **What would move it:** A shell-history record shows the crawl actually ran.
- **Decision rule:** No action. The affected numbers are already regenerated from source. Recorded in _quarantine/.

### OQ-32 — How does a nodal officer obtain a founder's DPIIT number?

**Estimate.** Three modes, roughly equal: (a) a maintained list they or the institute keeps, (b) asking the founder, (c) looking it up on the DPIIT portal  
**Provenance.** `PRIOR`

- **Method:** Phase 3A proved the join fails (32/354, 9.0%; worst 67%). Placeholder DIPP0000 keys in 3 of 7 NIRF forms suggest a maintained list that is incomplete. The three modes are the natural closure of a failed join.
- **What would move it:** One officer describes the actual mechanism.
- **Decision rule:** If (a): StartupHub is a better spreadsheet - thin differentiation. If (b) or (c): the product must carry founder-side capture - strong differentiation. The difference is the whole product, which is why it is the highest-value interview question.

### OQ-33 — What does the officer type when the key is missing?

**Estimate.** Blank in ~50%, placeholder (DIPP0000-style) in ~35%, drops the row in ~15%  
**Provenance.** `MODELLED`

- **Method:** Placeholder keys appear in 3 of 7 NIRF forms (43%). Blanks dominate ARIIA (IIT Kanpur leaves the 2019-20 star cell blank). Row-drop is inferred from the join loss exceeding the placeholder count.
- **What would move it:** An officer demonstrates the behaviour on their real form.
- **Decision rule:** If blank-dominant: the ledger is lossy silently, which is our strongest privacy-preserving pitch. If placeholder-dominant: the ledger is visibly corrupt, which is our strongest urgency pitch. Either way we win - but the pitch differs.

### OQ-34 — Does anyone reconcile NIRF against ARIIA?

**Estimate.** Probability that any given institution reconciles the two: under 20%  
**Provenance.** `PRIOR`

- **Method:** Incompatible time grains (ARIIA academic-year pairs vs NIRF single cycle), different nodal officers, and zero reconciliation artefacts in 36 documents or 11 forms. No institution in the corpus shows a cross-referenced count.
- **What would move it:** An institution describes comparing the two numbers.
- **Decision rule:** If nobody reconciles, a single portfolio layer is a genuine new capability rather than a better spreadsheet. If they do reconcile, it is a consolidation play with weaker differentiation.

---

## All 10 hypotheses, with priors and decision rules

| ID | Claim | Prior | Provenance |
|---|---|---:|---|
| H-02 | The NIRF DPIIT join breaks in practice | **85%** | `DOCUMENTED` |
| H-04 | Coordinated deadlines are the forcing event | **75%** | `DOCUMENTED` |
| H-03 | Excel/Sheets/WhatsApp are the free incumbent | **70%** | `PRIOR` |
| H-06 | Convener and Incubation Manager are one person | **65%** | `PRIOR` |
| H-09 | IPR tracking is a real institutional problem | **60%** | `DOCUMENTED` |
| H-10 | On-premise / data-localisation is a near-universal condition | **60%** | `PRIOR` |
| H-01 | Institutions have no venture register | **55%** | `PRIOR` |
| H-05 | The Convener is or can reach the buyer | **40%** | `DOCUMENTED` |
| H-07 | Rs 1.2 lakh sits inside a plausible budget range | **35%** | `PRIOR` |
| H-08 | Institutions manage cohorts | **25%** | `PRIOR` |

### H-02 — The NIRF DPIIT join breaks in practice

**Prior: 85%** (`DOCUMENTED`)

- **Basis:** 32/354 measured across 7 published forms; reverse gap in a 4th. Documentary, not inferred.
- **What would move it:** An officer says the join works because they hold the numbers: prior -> 0.45.
- **Decision rule:** Below 0.6: the headline finding is a form-design artefact nobody feels, and the wedge weakens to a data-quality feature.

### H-04 — Coordinated deadlines are the forcing event

**Prior: 75%** (`DOCUMENTED`)

- **Basis:** Teresa's 13-item narrative in a numeric field (P-A02) and ARIIA '0 (On Progress)' sentinels are deadline artefacts. That work is happening proves the pressure.
- **What would move it:** An officer describes continuous work with no deadline pressure: prior -> 0.40.
- **Decision rule:** Above 0.7: sell against the filing date and the product has a natural expiry per cycle. Below 0.5: no trigger exists and the go-to-market must originate elsewhere.

### H-03 — Excel/Sheets/WhatsApp are the free incumbent

**Prior: 70%** (`PRIOR`)

- **Basis:** Universal in Indian institutional admin and the corpus shows hand-assembly (P-A08), but no institution has been observed. The pricing model rests entirely on this.
- **What would move it:** An institution already pays for a system doing this: prior -> 0.25. An officer names only free tools: prior -> 0.90.
- **Decision rule:** Below 0.4: there is no free incumbent and the competitive comparison is wrong - reprice against paid incumbents, not against Excel.

### H-06 — Convener and Incubation Manager are one person

**Prior: 65%** (`PRIOR`)

- **Basis:** Corpus type mix implies staffing depth scales with tier; smaller institutions almost certainly combine the roles.
- **What would move it:** Named as separate people with separate spreadsheets: prior -> 0.30.
- **Decision rule:** If combined: single-threaded sale, integration cost low. If split: two sources of truth, which is the product but doubles entry cost.

### H-09 — IPR tracking is a real institutional problem

**Prior: 60%** (`DOCUMENTED`)

- **Basis:** P-A07 is DOCUMENTED CRITICAL: 0 of 36 institutions keep a deadline calendar, against 91,168 national filings in 2023-24. But an outside TTO or agency may handle it, which is the counter-argument.
- **What would move it:** An institution describes tracking patents internally: prior -> 0.85. Agency/TTO handles it: prior -> 0.25.
- **Decision rule:** Above 0.6: the IPR module leads, because it is the only one with a hard external deadline. Below 0.4: reporting stays the wedge and IPR becomes a later module.

### H-10 — On-premise / data-localisation is a near-universal condition

**Prior: 60%** (`PRIOR`)

- **Basis:** Phase 0 found data localisation and on-premise near-universal in competitor filtering; IT Administrator is in 0 of 8 procurement instruments by name.
- **What would move it:** A cloud SaaS product clears procurement unchallenged: prior -> 0.30.
- **Decision rule:** Above 0.55: ship on-premise from day one. It roughly doubles deployment cost and it is the price of being in the room.

### H-01 — Institutions have no venture register

**Prior: 55%** (`PRIOR`)

- **Basis:** P-A01/P-A06 are DOCUMENTED on fragmentation but the absence of a register is inference. F-SENTINEL-ZERO and the 7-of-36 zero-activity institutions pull down; the fact that all 36 produced SOME report pulls up.
- **What would move it:** An officer opens an existing system holding a venture list: prior -> 0.20. A named spreadsheet that is not the form: prior -> 0.85.
- **Decision rule:** Below 0.35: StartupHub is a registry, and registries are low willingness-to-pay. Above 0.75: StartupHub is a reconciliation layer, which is where the Phase 3A join finding lands.

### H-05 — The Convener is or can reach the buyer

**Prior: 40%** (`DOCUMENTED`)

- **Basis:** Phase 2: 0 of 12 Class A IIC seats hold documented budget authority. The paperwork contradicts the pitch, which is why this prior starts low rather than neutral.
- **What would move it:** A Convener describes initiating a purchase unaided: prior -> 0.75.
- **Decision rule:** Below 0.45: enter through the Registrar. This is the decision with the largest go-to-market consequence in the set.

### H-07 — Rs 1.2 lakh sits inside a plausible budget range

**Prior: 35%** (`PRIOR`)

- **Basis:** Rs 1.2L exceeds the LOWEST observed committee trigger (Rs 50,000) by 2.4x, and 0 of 25 roles hold documented authority for it. The only anchor is a competitor's Rs 75,000 price for a different scope.
- **What would move it:** A Registrar names a budget head that covers this: prior -> 0.70.
- **Decision rule:** Below 0.35: reprice to sub-Rs-50,000 for a direct-purchase route, or move upmarket to G5/G3. This is the pricing decision the whole plan hangs on.

### H-08 — Institutions manage cohorts

**Prior: 25%** (`PRIOR`)

- **Basis:** P-A03 is graded HYPOTHESIS. Cohort language is absent across 36 documents - absence of evidence, and incubators (G5) do use the concept, which is why it is not lower.
- **What would move it:** An institution describes grouping ventures into a batch: prior -> 0.80.
- **Decision rule:** Below 0.35: DROP cohort management from the product. It has no forcing event (OQ-22/OQ-34 pattern) and would be an unrequested feature.

---

## Portfolio estimates

**Realistic ACV, college segment (G1)**

- **Value:** Rs 35,000 - Rs 75,000/yr (`MODELLED`)
- **Method:** G1 is 65.3% private unaided with no documented discretionary fund. H-07 prior is 0.35. Sub-Rs-50,000 keeps a fast direct-purchase route below the lowest observed committee trigger.
- **What would move it:** OQ-29 names a fund, or H-07 moves above 0.7.
- **Decision rule:** This is the price to test first in G1, NOT the Rs 1.2 lakh list price.

**Realistic ACV, NIT/university segment (G3)**

- **Value:** Rs 75,000 - Rs 1,50,000/yr (`MODELLED`)
- **Method:** Committee-exercised but funded. Phase 2's Rs 50k-10L spread centres around committee territory.
- **What would move it:** OQ-27 resolves (GeM bypass) - a GeM route could push effective realisation to list.
- **Decision rule:** Test Rs 1.2 lakh here first. It is the segment where the join finding is demonstrable to the exact buyer.

**Realistic ACV, incubation centre segment (G5)**

- **Value:** Rs 1,20,000 - Rs 3,00,000/yr (`MODELLED`)
- **Method:** AIM grant-in-aid up to Rs 10 crore; 244 funded incubators are commercial entities with procurement capacity and no competitor class to displace.
- **What would move it:** OQ-08 resolves to a larger ungated register, or a named incubator states a budget.
- **Decision rule:** Highest value per deal, fewest deals available (244 ceiling). Not a volume segment.

**Blended achievable ARR by month 24**

- **Value:** Rs 14.2 - Rs 26.5 lakh (P25-P75); median Rs 21 lakh (`SIMULATED`)
- **Method:** Monte Carlo, seed 20261019, 50,000 trials over triangular priors on realised ACV, conversion, reachable institutions, renewal and sales cycle. See data_p36_simulation.
- **What would move it:** Conversion (r=0.65) and ACV (r=0.56) dominate; capacity (r=0.47) is third.
- **Decision rule:** Below Rs 14L: the institution-only model does not carry a team. Above Rs 27L: fund a second sales hire.

**Probability of reaching Rs 1 crore ARR by year 3 (institutions only)**

- **Value:** 0.0% (0 of 50,000 trials; P95 = Rs 41 lakh, max = Rs 54 lakh) (`SIMULATED`)
- **Method:** CORRECTION. An earlier hand-written estimate in this repository said 18-34%. The seeded simulation falsified it. Reaching Rs 1 crore needs ~120 paying institutions at Rs 1.8 lakh each, which is 15% of the entire 777-institution SAM floor converted via founder-led sales in 3 years. Not credible.
- **What would move it:** Requires a structural change, not a better conversion rate: higher ACV (a second revenue line), a longer horizon, or a non-institution buyer.
- **Decision rule:** Do not plan an institution-only path to Rs 1 crore. Either add the IPR module sold to researchers, or enter incubation centres (G5) where ACV is 3-4x higher on a 244-institution ceiling. This is the single most important number the simulation produced, and it changed our recommendation.

**Paying logos at year 3**

- **Value:** 19 - 31 institutions (P25-P75) (`SIMULATED`)
- **Method:** Reachable (150-600) x conversion (0.02-0.20). Consistent with the Phase 7 SOM envelope of 15-25.
- **What would move it:** Capacity or conversion moving 0.1.
- **Decision rule:** 19-31 institutions is a real, fundable business. It is not a Rs 1 crore business.

**Realised ACV per institution per year**

- **Value:** Rs 81,700 - Rs 1,15,700 (P25-P75) (`SIMULATED`)
- **Method:** Triangular prior Rs 35k / Rs 95k / Rs 180k after discounting, pilots and partial years.
- **What would move it:** OQ-03 / OQ-29 naming an actual budget head.
- **Decision rule:** Below Rs 75k: reprice the product. Above Rs 1.2L: the list price is defensible.

**Which unknown most widens the answer**

- **Value:** Conversion (r=0.65) > ACV (r=0.56) > Capacity (r=0.47) (`SIMULATED`)
- **Method:** Correlation against year-3 ARR across trials. Three inputs are near-irrelevant to ARR at year 3: on-premise demand (r=0.01), renewal (r=0.01) and sales cycle (r=0.00) - renewal does not affect year-3 revenue at all.
- **What would move it:** A structural change in the revenue model.
- **Decision rule:** Measure conversion and ACV first; do NOT spend research effort on renewal or sales-cycle length, which do not change the year-3 answer.

**Time to first paying institution**

- **Value:** 3 - 9 months (`PRIOR`)
- **Method:** Founder-led sale into a committee-gated buyer with a January NIRF deadline. The deadline compresses the cycle if timing is right.
- **What would move it:** A GeM listing is confirmed as a committee bypass (OQ-27) - this could halve it.
- **Decision rule:** Sell INTO a deadline, not after one. The 31 January NIRF date is the anchor.

---

## Coverage

| Metric | Value | Target |
|---|---:|---:|
| Open questions filled | 34 | 34 |
| Hypothesis priors | 10 | 10 |
| Portfolio estimates | 9 | 6 |
| Scorecard cells with a prior | 10 | 10 |
| **Total cells filled** | **53** | **53** |
| **Empty cells** | **0** | **0** |

Machine-readable: `_exports/phase35/`. Reproduce: `python build/build_phase35.py`.
