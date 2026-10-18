# Open Questions

Every unresolved conflict, unverifiable figure and research gap. **Nothing here is silently resolved.** Each item states what we know, what we don't, and who or what would settle it.

Priority: 🔴 blocks a later phase · 🟠 significant gap · 🟡 nice to have

---

## 🔴 BLOCKING

### OQ-01 · The current official count of IICs is unverifiable
**What we know.** The last official PIB figure is **"more than 6,400"** in Nov 2022 (registry `GOV-006`). An MIC Brochure 2025 infographic contains a national IIC count, but the value is embedded as a vector graphic and did not survive PDF text extraction. A media claim of "over 14,000 HEIs" (Education Times, Feb 2025) sits implausibly against 6,400 and is not a verifiable attribution.

**Why it blocks.** This is the **single most important denominator in the whole project.** It is the closest proxy for "how many Indian institutions have a functioning innovation structure."

**What would settle it.** Authenticated access to `iic.mic.gov.in/institute-list`, a manual read of the MIC Brochure 2025 graphic, a written query to MIC (`mic-mhrd@gov.in`), or an RTI.

**Interim handling.** Cite **6,400 with its 2022 date**, never the current count. All market sizing in `02_Landscape_Map/Segment_Census.md` is shown both with and without IIC coverage.

---

### OQ-02 · AICTE's total approved institutions, and the engineering-college-specific count
**What we know.** PRS compiled **8,489 technical institutions** as of April 2026 (Tier 2). AICTE's own Analytics Dashboard returned HTTP 404 and a search snippet showed "12,981 institutes" that **could not be attributed to an academic year** — the filters spanned 2012-13 to 2026-27. Engineering-college-only count is unknown; AICTE publishes only bulk-login downloads.

**Why it blocks.** Engineering colleges are a named segment in todo.md Phase 4. Sizing them requires the true count.

**What would settle it.** AICTE Centralized Support System login, or the annual approved-institution list.

---

### OQ-03 · Willingness to pay — completely unvalidated
**What we know.** We have **competitor prices** (₹75k–₹6.25L/yr) and **free-tier anchors** (₹0–₹1.73L/yr). We have **zero** primary evidence of what an institution would actually pay. `todo.md` carries an assumed ₹1.2L/yr with no source.

**Why it blocks.** Phases 7, 8, 16, 17 and 18 all depend on it. A financial model built on ₹1.2L is currently an assertion, not a model.

**What would settle it.** Phase 3 interviews (10–15 institutions) using the *value* framing — "if this problem disappeared tomorrow, what would that save you?" — not "would you pay ₹1.2 lakh?" Plus Phase 20 pilot conversion data.

---

## 🟠 SIGNIFICANT

### OQ-04 · No public API anywhere in the mandated stack
**What we know.** No public API, developer documentation or bulk export endpoint was found for IIC, YUKTI, NIRF, AISHE or MAARG (`GOV-043`). All are form-based web apps with per-activity manual uploads. data.gov.in carries some DPIIT/CSVs but they are parliamentary-answer snapshots, not live APIs — and the Startup India SRF CSV returns `{"message":"Session Expired"}` on unauthenticated fetch.

**Why it matters.** If these systems have no APIs, **integration is impossible and must be reimplemented as export-then-import**. This changes the technical architecture (Phase 22) and it changes the pitch (one-click export, not live sync).

**What would settle it.** Written enquiry to MIC/MoE, or an RTI. Until then, assume **no API** and design export/import.

---

### OQ-05 · Four rival datasets disagree on AIC count, three on TBI count
| Metric | Competing figures | Which to use |
|---|---|---|
| AIC | 83 (Lok Sabha, Mar 2026) · 72 (AIM site) · 69 (AIM AIC page, Jan 2024) | **83** — most authoritative and current |
| TBI | "more than 160" (DST) · "175+" (PIB Jan 2026) · 120+40+4=164 (ISTI, undated) | Name the source whenever citing |
| BioNEST | 74 (stats block) · 75 (table footer) — **same page** | **74**, flagged |
| IIC | 6,400 (PIB 2022) · unreadable (MIC Brochure 2025) · "14,000" (media) | See OQ-01 |

**Handling.** Never present a single number without its source and date. Where a range matters, present the range.

---

### OQ-06 · UGC and AISHE use different frames for "university"
| Category | UGC (31.03.2024) | AISHE (2023-24) |
|---|---|---|
| Central | 57 | 55 |
| State Public | 482 | 462 |
| State Private | 478 | 464 |
| Deemed | 136 | 125 |
| **Total** | **1,153** | **1,289** |

**Handling.** Keep the frames separate. Never cite "1,289 universities" without saying "AISHE 2023-24" and never compare it to UGC's 1,153. **Unresolved** — the frames are genuinely different, not one being wrong.

---

### OQ-07 · Autonomous college count
Only **578/579** appears, on an AISHE dashboard whose vintage is unlabelled and whose college counts exceed the published 2023-24 totals. UGC publishes no authoritative total. UGC issued the *UGC (Conferment of Autonomous Status upon Colleges) Regulations, 2023* but no register count.

**Impact.** Autonomous colleges are a named segment in todo.md Phase 4.

---

### OQ-08 · Incubator/accelerator counts on Startup India are login-gated
BHASKAR's incubator and accelerator listings publish no aggregate count. The only public figure is a "600K strong" registry counter, which is **not** an incubator count and is marketing, not a statistic. Closest official national aggregate is **MeitY Startup Hub: 517+ incubators** (Dec 2025, `GOV-012`). **Per-state incubator counts are not published by anyone.**

---

### OQ-09 · Almost no independent review evidence exists in this market
**Reality check.**

| Vendor | Third-party reviews |
|---|---|
| EcoSync, NestLens, Incubatee, IncubatX, RiserNest, VentureLink | **Zero** |
| Gohorto | 3 GetApp (one vendor-referred) |
| Founderhood | 1 G2 + 2 Capterra |
| AcceleratorApp | None found |
| incuTrack | 10 G2 (3.8) — recent ones call it "quite outdated" |
| Accubate | **26 Capterra (4.8)** — the only real base |

**Two consequences.**
1. Phase 11 of `todo.md` (competitor user reviews) is **thin by necessity**, not by omission. We have exhausted what is publicly findable.
2. **Nobody in this category can prove a large Indian institution runs on their software.** AcceleratorApp has the best logo list (Yale, MIT Design X, Max Planck) but zero Indian institutions. Accubate has the best Indian roster but is documentation-poor with a broken pricing page.

**Implication for StartupHub.** One published, verifiable Indian university case study with named referees is worth more than any feature on the comparison table. The cheapest route is to deploy free or near-free to 2–3 IICs with a named reference agreement — a Phase 20 decision, but flagging it now because it takes months.

**Caveat.** All G2 and Capterra quotes in this research come from **search-index excerpts**, because both sites return HTTP 403 to automated fetch. Re-verify any quote before using it in customer-facing material.

---

### OQ-10 · IIC's star-rating formula is not publicly documented
The official "Rating and Scoring System" help page returns **"Coming Soon"** (`GOV-027`). 3-star and 5-star ratings appear in institutional reports, so the system exists and works, but the weights and thresholds are unknown.

**Why it matters.** If StartupHub's core promise is "your IIC data is already here, here's your star rating," we cannot build it without the formula. This is a **feature risk**, not just a research gap.

**What would settle it.** MIC clarification, or reverse-engineering from institutional Performance Cards across many years.

---

### OQ-11 · BHASKAR overhaul — real threat or press noise?
DPIIT reportedly plans to turn BHASKAR into a "National Startup Master Data" registry tracking the startup lifecycle; MeitY Startup Hub floated a similar tender (`GOV-040`, 21 May 2026, Moneycontrol). **Tier 4 — trade press reporting a plan, not a notification.**

**Why it matters.** If a national master data layer materialises, it becomes the upstream identity system and StartupHub must reconcile to it rather than duplicate it.

**Handling.** Design for BHASKAR-ID reconciliation now (`D-011`). Do **not** cite externally until confirmed from a government source. Re-check before any launch.

---

### OQ-12 · No peer-reviewed literature on Indian institutional reporting burden
Searched and **not found**. What exists instead:
- ARIIA's own DCS statement that integration "has reduced data submission efforts at the institute level by checking redundancy" (`GOV-031`) — the strongest official acknowledgement
- The AISHE 2023-24 report enumerating **12+ HEI-facing portals** (`GOV-006`)
- RBI's SDMX paper: "The requirement of resources and technical manpower at the reporting entity side is too onerous for mid to small sized institutions" — a useful analogy, not direct evidence
- NIRF methodology critiques exist, but focus on ranking validity, not data-entry burden

**Consequence.** No one has quantified this burden. **StartupHub should run its own primary time-and-motion study across ~20 IIC institutions.** That would be genuinely novel research and would produce the single strongest evidence asset in the project — it is currently the difference between saying "institutions have this problem" and "7 of 10 interviewed institutions lose X hours per month to this."

---

### OQ-13 · Whether an institution-facing product can even be bought easily
Not yet researched, and it may be the hardest constraint in the business:
- **GeM** (Government e-Marketplace) procurement route — eligibility, registration, listing mechanics, security-questionnaire burden
- **DRE/Direct Purchase** rules for institutions of different categories
- Data-localisation and on-premise requirements as procurement conditions
- Whether an IIC can even sign a SaaS contract, or whether it needs the university as contracting party

**What would settle it.** Phase 24 legal/compliance + Phase 19 GTM. Note that EcoSync has already publicly conceded it holds no SOC 2 or ISO 27001 and publishes no uptime SLA — which means procurement-aware buyers can disqualify it today (`COMP-003`). Procurement is a real moat if StartupHub can clear it.

---

## 🟡 NICE TO HAVE

### OQ-14 · The list of 31 States/UTs with a dedicated Startup Policy is login-gated
The count (31 of 36, as of 14 Sep 2026) is published; the **list** is not extractable. UP's Startup Policy 2026 was approved by State Cabinet on 6 July 2026, replacing the 2020 policy. Delhi, Gujarat, Tamil Nadu and UP institution-facing portals were not verified in this pass.

### OQ-15 · University/technology-transfer software was only partly researched
Elsevier Pure is well documented and priced (UK G-Cloud public list, `COMP-014`) — minimum Indian deployment ≈ **₹44.6L/yr + ₹43.5L onboarding**, which is the hardest pricing benchmark available and roughly **two orders of magnitude** above StartupHub's band. But Invenio, Tech Transfer Ware, and the university innovation-management category were only lightly covered. A university CTO could argue "we already own Pure." **Phase 22 task.**

### OQ-16 · Hindi / regional-language UI is claimed by almost nobody
Only Accubate lists Hindi as supported (on GetApp). LabelNest's Sarvam-based Indian-language MOM transcription is the one genuinely India-specific AI feature found anywhere in the category — and it is aimed at the real bottleneck (minutes in regional languages). AcceleratorApp translates into seven European languages, Arabic and Ukrainian, but **not Hindi**. Whether this matters is a Phase 3 interview question, not an assumption.

### OQ-17 · Campus ERP channel risk
Zero Indian campus ERP vendors have a genuine startup-incubation module (`COMP-021`), but several already claim **"NAAC SSR auto-generation, NIRF ranking data, AISHE submissions"** (OnCampusERP, EduplusCampus). They compete for the compliance budget, own the institutional relationship, and hold the procurement precedent. A Phase 19 question: is StartupHub a partner, a competitor, or a module they'd resell?

### OQ-18 · Incu (Sweden) tracks patents as a data field
*"Moduler med nyckeldata om avtal, patent, kapital, varumärke"* — 790 kr/user/month (~US$75) + €3,500 implementation. The only competitor found anywhere with any patent awareness (`D-005`). A data field, not a workflow. Worth a direct look to confirm the depth.

---

## Phase 1 — raised by the IIC annual report corpus (added 2026-10-18)

Evidence base: `_exports/phase1/` — 36 documents, 34 distinct institutions, 25 fully parsed. See `iic_corpus_analysis.md`.

### OQ-19 · `ideas generated` has no common definition, so no cross-institution benchmark exists
**What we know.** Across 19 institutions publishing both `ideas generated` and `prototypes developed`, the implied conversion ranges from **0.0% to 262.5%** (`IIC-007`). A rate above 100% is arithmetically impossible for a same-year funnel, so at least one of the two fields is counting a different population than its label implies. Institutions reporting 33–38% describe a plausible funnel; institutions reporting 87–100% do not.

**Why it matters.** Any Phase 1 benchmark, ranking, or "how are institutions doing?" chart built on these fields is invalid. This does not affect StartupHub's product thesis — it strengthens it — but it does block Phase 2 segmentation work that assumes comparable outcomes.

**What would settle it.** The IIC-portal field definition/help text; a direct question to two or three of the outlier institutions (EGSPEC, ICFAI Tripura, NIT Andhra Pradesh); or MIC guidance on whether `ideas generated` counts individual submissions or intake headcount.

---

### OQ-20 · Which figure is authoritative when an institution's own narrative and KPI form disagree?
**What we know.** Six same-document inconsistencies are catalogued in `_exports/phase1/csv/iic_contradictions.csv`. Sharpest: **NIT Calicut's single 2024-25 PDF** states both 55 startups and 17 startups, and both ₹1,51,488 and ₹16,00,000 awareness spend. **Institute of Science Nagpur** states 16 activities in narrative and 02 in its KPI form. **MIET Jammu** writes "Rs 4,10,000" in digits and "Three Lakh Twenty Thousands only" in words in the same field.

**Why it matters.** If the IIC portal form is the submission of record and the narrative is decoration, the portal is authoritative. If ARIIA verification reads the portal and the institution's own board reads the narrative, neither is. This determines whether a reconciliation tool is solving a real problem or a cosmetic one.

**What would settle it.** Confirmation of which artefact ARIIA assessors actually read; whether the IIC portal performs any validation; and whether MIC reviews submissions at all beyond star banding.

---

### OQ-21 · The corpus may be unrepresentative in an unknown direction
**What we know.** All 36 documents come from institutions that publish a reasonably complete IIC report. That is a self-selecting population. It is unknown whether these are better-resourced institutions, or simply better reporters, or institutions whose IIC coordinator happens to enjoy writing.

**Why it matters.** Every rate in the Phase 1 corpus analysis — conversion, grant ratios, activity-to-output — is conditional on this bias. If well-reporting institutions are systematically better funded, the corpus overstates institutional capability and understates the pain.

**What would settle it.** Comparing the corpus against the ARIIA distribution: if low-star institutions are systematically absent from the corpus, the bias is toward capability. Also: a manual scan of a random sample of *non*-publishing IICs to see what they hold instead.

---

### OQ-22 · What is the actual filing rate? Most IICs may never file a report.
**What we know.** The corpus contains 34 institutions. The last official IIC count is **>6,400 (Nov 2022, OQ-01)**. If even 20% of IICs file a readable annual report, that is ~1,300 documents — far more than the ~40 targeted here.

**Why it matters.** Filing rate is a demand-side sizing input and also a product-adoption signal: a mandate nobody complies with is not a mandate a product can monetise.

**What would settle it.** Authenticated access to `iic.mic.gov.in/institute-list` (OQ-01), which would show how many institutions have an active IIC record at all.

---

### OQ-23 · International IP filings have no home in the reporting schema
**What we know.** Institute of Science Nagpur's report leads with a **UK Design registration (No. 6381983, 31 July 2024)** as its flagship innovation (`IIC-011`). The IIC reporting vocabulary observed across 36 documents is uniformly domestic: Indian patent application numbers, Indian design numbers, copyright.

**Why it matters.** Any IP record created inside a system built only on the IIC vocabulary risks not capturing a foreign filing that the institution considers its most valuable asset.

**What would settle it.** A check of whether any corpus institution files US/EU/WIPO filings, and whether those ever appear in an annual report.

---

### OQ-24 · Is the grant field ever validated? It has demonstrably absorbed the wrong money.
**What we know.** Dr. N.G.P. Arts and Science College (IIC-030) reported ₹2,16,81,371 as "Amount grant or fund supported to student & faculty lead innovations, start-ups and IPR". That figure reconciles **exactly** to two unrelated DBT academic grants (₹1,25,95,438 + ₹62,30,583). Teresa's College (IIC-031) put a 13-item multi-source narrative in the same field instead of a number. EGSPEC reported a 52.0x grant-to-awareness ratio; three institutions reported exactly zero.

**Why it matters.** The field cannot be used as a market-size proxy, an ROI denominator, or a "how much innovation money flows" statistic. If it is never validated, it is a free-text box with a number-shaped label.

**What would settle it.** Whether ARIIA scoring reads this field; whether MIC reconciles it against any other source; whether any institution has been asked to substantiate it.

---

## Closed

_(none yet — nothing has been resolved out of this file; resolutions move to Decision_Log as D-entries with a "supersedes OQ-nn" note)_