# Ecosystem Platforms — The Mandatory Stack and the Structural Gap

**The single most important analysis in Phase 0.**

These are **not competitors**. They are statutory/compliance infrastructure — a set of disconnected, form-driven, government-run portals that an Indian institution must populate to stay compliant, earn ratings, and unlock grants.

> ### The structural finding
> **Every mandated system is an annual or quarterly compliance ledger keyed on events and snapshots. Not one is a system of record keyed on a venture through time.**
>
> The gap is not a feature gap inside an existing product. It is a **category error in how Indian innovation policy was digitised.** India digitised innovation **accountability** and never digitised innovation **operations**.

---

## 1. IIC Portal — the most important document in this folder

**Institution's Innovation Council** — launched 2018 by **MoE through the Innovation Cell (MIC), in collaboration with AICTE**.
iic.mic.gov.in · mic.gov.in

**Eligibility — any one criterion suffices:** pre-incubation/incubation centres or student idea clubs · participated in ARIIA · participated in NIRF · NBA/NAAC accredited · TEQIP-III recipient with startup cell · Government/Govt-funded/Deemed University · HEIs offering non-technical programmes.

### 1.1 Portal structure — 17 top-level menus
`GOV-018`, `GOV-022`

My Profile · My Council · **Manage Activity** · Innovation Ambassador · **Manage Pre-Incubation / Incubation Details** · Announcements · Notification · Schemes / Programs (Mentor-Mentee, Impact Lecture) · ATL School Linkage · e-Learning Resources · **YUKTI** · Refer Institute · **Performance Card** · Suggestion · Download · Contact us · Portal Manual.

The header shows the **Institute Name and "Your Institute current star rating"** — star rating is a headline institution attribute.

### 1.2 What institutions must submit

**A. Council meeting — the hard gate** `GOV-019`
Per quarter: Meeting Date · Quarterly Plan · **Resolution** (prescribed PDF, signed by HOI/IIC President, listing all members with roles) · Quarterly activity list with tentative dates · **Minutes of Meeting** (President and Convenor must be present) · Photo.
Minimum **two council meetings per academic year**. Bi-quarterly meetings allowed via a checkbox.

> ⚠️ **The gating rule, verbatim:** *"If it is in red cross then you cannot add any activity under 'Manage Activity' section."* And: *"If 'Add to My Calendar' button is not available under some events, that will be because… You would have not completed / uploaded 'Council Meeting' for that particular quarter."*

**A governance artefact gates the reporting form. Upload the minutes or you cannot file activities at all.**

**B. Activity minimums** `GOV-020`

| Activity type | Minimum | Nature |
|---|---|---|
| IIC Calendar Activity | **3 per quarter = 12/yr** | Prescribed annual calendar; score-bearing |
| MIC Driven Activity | **All** | Mandatory |
| Celebration Activity | **1 per quarter = 4/yr** | Mandatory |
| Self-Driven Activity | Encouraged, uncapped | Institution-created |
| **Baseline total** | **≥16 activities/yr + all MIC-driven** | |

> Repeated caveat: *"Conducting the event alone will not secure the stars / score. The activity you have conducted should be approved by the IIC."*

**C. Level declaration** (determines scoring weight)
Level 1: expert talks/mentoring/exposure, 1–4 contact hours · Level 2: workshop/seminar/conference, 5–8 hrs · Level 3: workshop/bootcamp/exhibition/demo day/competition/hackathon, 9–18 hrs · Level 4: tech-fest/challenges/bootcamps, >18 hrs.

**D. Per-activity report — the full field list** `GOV-021`
Social media promotion: **Twitter · Facebook · Instagram · LinkedIn** (all four) · Quarter · Program title · Type (Level 1–4) · **Theme** (IPR & Technology Transfer / Innovation & Design Thinking / Entrepreneurship & Startup / Pre-Incubation & Incubation Management) · Duration · Start/End date · **Student participants · Faculty participants · External participants** · **Expenditure for that event** · Mode · Overview · Objective · Benefits · Remark · **Video URL · Photograph 1 · Photograph 2 · Overall report (document upload)**.

### 1.3 Scoring
Star rating (1–5) computed from approved activities against quarterly minimums, shown as *"Your Institute current star rating."* Performance Cards preserve year-on-year records.

> ⚠️ **The official "Rating and Scoring System" help page returns "Coming Soon."** The exact star-rating formula is **not publicly documented**. → `Open_Questions` `OQ-10`

### 1.4 🔴 WHAT THE IIC PORTAL DOES **NOT** DO

This table is the whole thesis. Evidence: the portal's own menus.

| Capability | Present? | Evidence |
|---|---|---|
| **Operational startup management** (pipeline, ownership, next actions) | **NO** | Zero venture-entity module. Only an Innovation Ambassador *coordinator* role. |
| **Mentorship workflow** (scheduling, session notes, outcomes) | **FORM-ONLY** | "Manage Mentor-Mentee Program" is a scheme participation form. No calendar, matching, outcome capture, or goal tracking — unlike MAARG which has all four. |
| **Portfolio analytics** (funnel, cohort survival, revenue) | **NO** | Counters are event counts and participant headcounts. Peer comparison exists only as an all-institute aggregate. |
| **IPR tracking** (docket, deadlines, renewals) | **NO** | "IPR/TTO Centres" is a **centre directory entry** — existence and floor area. No patent record, application status, or renewal diary. |
| **Incubation cohort management** | **NO** | "Manage Pre-Incubation/Incubation Details" registers **the facility**, not **the incubatees**. |
| **Impact/outcome reporting** (jobs, revenue, survival) | **NO** | "Impact" = students/faculty **benefited from activities** — event attendance, not venture outcomes. |
| **Financial management / expenditure ledger** | **NO** | A single free-text "Expenditure for that event" field. |
| **Commercial / fundraising** | **NO** | No investor matching, no fundraising pipeline. |
| **REST API / bulk export / data portability** | **NO EVIDENCE** | Form-based web app with per-activity manual uploads. No developer docs, no API, no export endpoint found. → `GOV-043` |

### 1.5 The killer detail

> **The IIC portal has a menu item called "IPR/TTO Centres."** An institution with a working technology-transfer office registers that office's **existence and floor area**. The portal then has **no place to record a single patent.**
>
> Meanwhile NIRF-Innovation asks for *"Patents Commercialized & Technology Transferred"* and *"Income from Technology Transferred (in Rupees)"*, and ARIIA asks for *"Patent Application No"* and *"Year of Patent Application"*.
>
> **The patent data exists in the institution. It exists nowhere in the ecosystem stack. And it is re-entered by hand every year.**

---

## 2. YUKTI-NIR — the highest-value integration target

**YUKTI = "Young India Unleashing Knowledge & Innovation"** · MoE MIC + AICTE · yukti.mic.gov.in

**Three pillars:**
1. **Innovation Repository (NIR)** — institutes identify, scout and evaluate innovations and startups from faculty, students, alumni and incubated startups, year-round
2. **National Innovation Challenge (NIC)** — nominations to national contests/grand challenges → mentoring, funding assistance, incubation linkage, investment linkage
3. **NFTTIC** — decentralised hub-and-spoke for tech transfer offices

### 2.1 TRL-based categorisation — the category nobody else implements

| Bucket | TRL range |
|---|---|
| **Idea / PoC Repository** | **TRL 1–4** |
| **Innovation / Prototype Repository** | **TRL 5–9** (portal text also references TRL 10) |
| **Business Model / Startup Repository** | direct submission, or upgrade a shortlisted innovation |

Indexed on **Themes & Stages · Technology Readiness Level (TRL) · Manufacturing Readiness Level (MRL) · Investment Readiness Level (IRL)**.

### 2.2 The institute-side verification workflow
IIC portal generates a **unique YIR registration link per institute** for students/faculty/alumni/incubatees.
⚠️ **"IIC login credentials and the YUKTI login credentials are different."** `GOV-025`
HEIs manage expert verification through an **"Add Verifier" tab**. Status flow: **Pending → Recommended / Not Recommended**. Recommended ⇒ eligible for YIC.

### 2.3 ⭐⭐ The killer feature — automatic ARIIA ranking data
> **"Data entered in YUKTI – NIR will act as input for ARIIA. Help HEI in benchmarking Innovation and Startups practices and setting targets by taking it as Key Performance Indicator"**
> "**Data Entry in YUKTI – NIR for ARIIA** — Section 4: Innovations — The repository of innovations verified by the HEI with the 'Recommended' status... **will be auto-pooled and reflected in the data for ARIIA ranking.**"

**Strategic significance.** A product that makes an institution look better in a national ranking is selling into a budget line that already exists. → `Decision_Log` `D-007`

### 2.4 What it does NOT do
No venture lifecycle, no funding ledger, no IP docket, no cohort management. YUKTI is a **submission plus institute-side verification queue** — a moderated pipeline with three static buckets. YIC 2025 is the 4th edition, open to TRL 4+ registered innovations.

---

## 3. NIRF Innovation — where the manual work is

MoE · nirfindia.org · Ministry of Education ranking

### 3.1 Parameter weights — and they changed

| Parameter | 2024 | 2025 |
|---|---|---|
| Financial Support for Innovation (FSI) | 0.30 | **0.25** |
| Innovation Achievements (IA) | 0.15 | 0.15 |
| Research & Innovation Output (RIO) | 0.30 | 0.30 |
| Pre-Incubation & Incubation (PII) | 0.10 | 0.10 |
| Adoption of I&E Policy in HEIs (AIE) | 0.05 | **0.10** |
| Perception (PR) | 0.10 | 0.10 |

`GOV-026` · ⚠️ **NIRF 2026 weights not located — UNVERIFIED.**

### 3.2 The startup sub-metric
> **SU = 20 × f(N_vsp)**, where **N_vsp = Number of ventures/startups recognised by DPIIT/Startup India in the previous three years.**

**So 20 of 100 FSI marks — i.e. 5 marks of the final Innovation score (0.25 weight) — hinge on a single countable: how many DPIIT-recognised startups the institution produced in 3 years.** `GOV-027`

**2025 sub-metrics:** FSI = SU(20) + VC investment(20) + **Seed Funding from Govt Organisations(20)** + FDI(20) + Innovation grant(20). Year-on-year, VC investment dropped 25→20 marks and a *new* government-seed-funding line appeared. In IA, **"Patent Commercialization & Technology Transfer (10)" was removed** and replaced by "Alumni Founders of Forbes/Fortune 500 (20)".

### 3.3 🔴 The data-capture burden

~11 screens **per discipline**. A university with 4 disciplines files the Innovation form **4×**.

Per startup row, hand-typed: **Name · DPIIT No. · Amount in rupees · Funding organisation name · Year · Achievement Level · Type of Investment**. Plus patents published/granted by year, patents commercialised + **income from technology transferred (₹)**, innovations by TRL stage, ventures grown past ₹50 lakh turnover, Forbes/Fortune 500 alumni founders, pre-incubation and incubation unit income and expenditure.

**None of this auto-populates from MCA, GST, ROC, or DPIIT's own recognition database.** `GOV-028`

### 3.4 🔥 NIRF does not gate submission — the data is already public

Institutions publish their **own submitted Data Capture System PDFs** on the open web. Verified live:
- NIT Rourkela NIRF'2025 Innovation, 8 DPIIT startups with DIPP numbers
- IIM Goa NIRF'2026 Innovation, 3 startups + seed funding rows
- Rajah Serfoji Government College — visible empty "NA" rows
- JBIET

> **This is de facto an open export of institution-submitted innovation data.** Any party can build an institution-ranking dataset from public PDFs — **and Factly/Dataful has already done exactly that** (6,817 rows, 204 institutions, monetised). `GOV-029`, `GOV-030`

### 3.5 The de-duplication that does exist — and its limits
**ARIIA's DCS statement:** *"Institutions submit data using the Data Capturing System (DCS) which facilitates data capturing from HEIs and **fetches institution's performance related information from other programs such as IIC, NISP, YUKTI-Innovation Repository, and Innovation Ambassador portals** etc. This integration of data capturing and fetching **has reduced data submission efforts at the institute level by checking redundancy**."* `GOV-031`

**Limits:** it is a **one-directional fetch** (ARIIA pulls from IIC/YUKTI/NISP) with **no shared write path back**; it is scoped to **ARIIA only**; it does **not** remove NIRF-I; and NIRF Innovation screens show **no evidence of auto-population from YUKTI**.

---

## 4. Startup India / DPIIT — what institutions get back: nothing

Launched 16 Jan 2016, implemented by **DPIIT**, Ministry of Commerce & Industry.

**What it does for institutions:** essentially nothing institution-specific. **There is no institution dashboard on Startup India.** Institutions are consumers of recognition numbers, not registered entities.

**Notable surfaces:**
- ⭐ **MAARG** — the national mentorship platform: AI matchmaking, session scheduling, cohort programmes, dashboards for startups *and mentors*. **The most operationally capable system in the mandated stack** — and scoped to **DPIIT-recognised startups**, not institutional portfolios. `GOV-041`
- **Startup India Investor Connect** — AI-based startup–investor matchmaking (launched 11 Mar 2023)
- **State Startup Policies** — nodal agency + incentives listing
- **TEJAS** — district-level awareness across 112 NITI Aayog Aspirational Districts + 20 DPIIT districts

### 4.1 🔴 Regulatory change — affects our data model
**Gazette G.S.R. 108(E), 4 Feb 2026** `GOV-017`:

| Parameter | Old | New |
|---|---|---|
| Turnover ceiling | ₹100 crore | **₹200 crore** |
| Recognition age | 10 years | 10 years (**20 for Deep Tech**) |
| Deep Tech ceiling | n/a | **₹300 crore** |
| Cooperative societies | not eligible | **now eligible** |

**Implication:** historic YUKTI/NIRF records use the *old* definition and recognition numbers are now bifurcated (standard vs Deep Tech). **StartupHub's data model must carry a recognition-basis field or it will silently mis-score institutions.**

### 4.2 States' Startup Ranking Framework (SRF)
Launched Feb 2018, **5 editions**. **SRF 5.0 results declared 16 Jan 2026**: 34 S/UTs, **19 Action Points**, 6 Reform Areas, private ecosystem mapping added.
- Best Performer Cat A: **Gujarat**
- Top Performers Cat A: Karnataka, Punjab, Tamil Nadu, UP
- Leaders Cat A: Kerala, Rajasthan

**Per-State report PDFs are published** — and they **do surface institutional support metrics** (e.g. Rajasthan cites *"Institutional support provided to Startups: 20+"*, "Innovation Studio and Accelerators (AISA)", and school/rural outreach workshops). **This is the strongest public evidence that institutional-level contribution data is being collected at state level.** `GOV-035`

---

## 5. BHASKAR — and the watch item

**BHASKAR = Bharat Startup Knowledge Access Registry.** DPIIT / Startup India platform, launched **16 Sep 2024**, positioned as *"the world's largest digital registry of the startup ecosystem."* `GOV-039`

**What it does:** issues a **BHASKAR ID** — *"a personalised identification number… tied to your profile"* — intended as the ecosystem's universal identity. Network/discovery via profile cards, ecosystem map, industry alliances.

**Personas:** Mentor · Enabler · Explorer · Startup Founder · Organisation.
⚠️ Registration runs **in parallel with**, not instead of, DPIIT recognition: *"For now, the registration process to get DPIIT recognition and avail services of Startup India will continue in parallel."*

**What it does NOT do:** no institution-facing module, no institution reporting, no incubation cohort management, no IPR workflow. It is a **counterparty directory, not an operating system.**

### 🔴 THE WATCH ITEM
DPIIT is reported to be planning an overhaul of BHASKAR into a **"National Startup Master Data"** registry that would unify records, schemes, mentors and investors, and **track the startup lifecycle**. MeitY Startup Hub has floated a similar tender. `GOV-040` · **Tier 4 — trade-press reporting of a plan, not a notification.**

> **If a national master startup data layer materialises, it becomes the upstream identity system.** StartupHub's data model must be designed to **reconcile to BHASKAR IDs**, not duplicate them. → `Decision_Log` `D-011`, `Open_Questions` `OQ-11`

---

## 6. AISHE — correcting a common assumption

**All India Survey on Higher Education** — MoE, Department of Higher Education. Annual web-based survey since 2010-11.

**Scale:** AISHE 2023-24 = 14th edition. **64,756 HEIs** in frame. Registration for 2025-26 *and* 2026-27 open. Reports published 09 July 2026.

### ⚠️ AISHE is NOT a significant innovation-data collector
From the published Data Capture Format, the innovation-adjacent items are **lightweight and binary**:
- *"Whether your institution has participated in NIRF Ranking? [Yes/No]"*
- NIRF category rank · NAAC accreditation (body, score, grade, cycle, validity) · NBA by programme · number of active MoUs

> **The heavy innovation/startup data burden lives in NIRF-Innovation and ARIIA — NOT in AISHE.** AISHE's contribution is (a) annual re-entry of NIRF participation status, and (b) acting as the **institutional registry** (AISHE code) that NIRF/ARIIA/IIC all key off.
>
> **Any StartupHub thesis that overstates AISHE's innovation-data load would be wrong.** `GOV-032`

### But AISHE still evidences friction
> *"Participation in AISHE is voluntary, and the data is self-reported by the HEIs via AISHE web portal... the quality of data is generally taken care of by the respective HEIs."* `GOV-033`

Standalone institutions responded at only **77.4%** (11,787 of 15,221) — the weakest category, while the government still describes overall participation as ">90%". `GOV-034` Data upload migrated from Adobe PDF to fully web-based entry from AISHE 2020-21; the **2024-25 survey had to be reopened for data error rectification until 24 Dec 2025**; and registration for 2025-26 *and* 2026-27 was open simultaneously. `COMP-029`

---

## 7. State portals — independent silos

| State | Key institution-facing element | Verified scale |
|---|---|---|
| **Kerala** ⭐ | **375+ IEDCs** across colleges and universities — the most developed institution-facing state innovation programme in India. Issues a **KSUM UID** as a *third* identity layer after CIN and DIPP | 27 R&D institutions, 63 incubators `GOV-042` |
| **Maharashtra** ⭐ | Policy 2025 §Data Repository: *"an online system for registration with the unique ID will be created to **map all startups, incubators, accelerators, innovation hubs/labs/centre, investors and mentors/experts**"* + §9.7 Knowledge Portal. §Entrepreneurship Cells | 29,147 DPIIT startups (May 2025) = 18% of national total. Incubation funding up to ₹5 cr/centre. Incubator Ranking Framework `GOV-036` |
| **Karnataka** | Startup Policy **2025-2030, ₹518 crore corpus** — largest single-state corpus. ELEVATE idea→PoC grants up to ₹50 lakh, 100-mark evaluation across 5 parameters | 960 applications in 2024; 554 qualified for Stage 3 |
| **Telangana** | TSIC (2017); TSIRI incentives — Prototype / Seed / Pilot grants for grassroots innovators | 11,839 startups · 5,000+ incubatees · 74 incubators |
| **Gujarat** | SSIP 2.0, ₹300 cr corpus; i-Hub Ahmedabad (⚠️ secondary source) | SRF 5.0 **Best Performer Cat A** |
| **UP / TN / Delhi** | ⚠️ **NOT VERIFIED** in this pass | UP & TN: SRF 5.0 Top Performer Cat A |

### Cross-state structural finding
State portals are **independent silos with their own registration, own ID, own login, and own form taxonomy.** A DPIIT-recognised startup in Kerala holds *three* identifiers (CIN, DIPP, KSUM UID); in Karnataka it must additionally engage SAKALA. **None of the state portals exposes an API that a system of record could write to.**

---

## 8. 🔴 THE ANSWER: the structural gap

> ### *"What is the gap between what institutions are REQUIRED to report and what software EXISTS to manage startups day-to-day?"*

### Gap 1 — The unit of record is wrong. **This is the root cause.**

| System | Unit of record |
|---|---|
| IIC | **the activity/event** — 16+ per year, each a form with 2 photos, a video URL, participant counts, one expenditure line |
| YUKTI-NIR | **the innovation snapshot** — three static buckets |
| NIRF-I | **the spreadsheet row** |
| AISHE | **the institution-year aggregate** |
| DPIIT | **the recognition certificate** |

**What does not exist in any of them: the venture entity with state over time.**

> No record anywhere says: *venture V was founded by student S from batch 2023; entered incubation 2024-06; raised ₹40 L from investor I in 2025-02 at valuation ₹X; is now at Series A; the founder has vested 12 of 24 months; the next milestone is X on date Y.*

**Consequence: an institution literally cannot answer "how many of our incubatees are still alive?" from any government system.**

### Gap 2 — No operational startup management anywhere in the mandated stack

| Capability | IIC | YUKTI | NIRF-I | AISHE | DPIIT |
|---|---|---|---|---|---|
| Venture pipeline / CRM stages | ✗ | ✗ | ✗ | ✗ | ✗ |
| Cohort intake & graduation | ✗ registers the *centre* | ✗ | ✗ | ✗ | ✗ |
| Equity / vesting / founder IP transfer | ✗ | ✗ | ✗ | ✗ | ✗ |
| Fundraising pipeline | ✗ | ✗ | ✗ | ✗ | ✗ |
| IPR docket, deadlines, renewals | ✗ directory of the *centre* | ✗ | annual counts only | ✗ | ✗ |
| Mentor session management | form only | ✗ | ✗ | ✗ | via MAARG, startup-scoped |
| Institutional benchmarking vs peers | aggregate only | ✗ | rank only | ✗ | ✗ |

### Gap 3 — No verification layer, so the same facts get retyped 3–6×/year
NIRF requires VC amount, funder name, year, achievement level, investment type **per startup, per discipline, per year**. Those numbers live in the startup's own books. **No linkage to MCA, GST, ROC or DPIIT's database was found in any form.**

> **The government asks the institution to manually attest financial facts that other government databases already hold.** That is the definitional waste at the heart of the system.

### Gap 4 — Credential and identity fragmentation
A single venture can hold **CIN → DIPP → KSUM UID → IIC ID → AISHE code → NIRF institute_id → ARIIA ID → SAKALA.** No canonical identifier spans these. The platforms are separate silos — *"IIC login credentials and the YUKTI login credentials are different."*

And the record quality is already imperfect **before** any join: Factly's government-derived dataset has 204 `institute_id` values against 202 `institute_name` values — a **0.98% dirty-record rate**.

### Gap 5 — Government funding flows through institutions with no tracking system
SISFS ₹945 cr → 219 incubators → 3,400+ startups. FFS ₹10,000 cr → 135+ AIFs → 1,420+ startups. NIDHI, BIRAC BIG, TIDE 2.0, GENESIS, AIC grants. **Every one requires an institution or incubator to track money, milestones and outcomes.** None of them is a system of record.

**NIDHI-PRAYAS even requires an institutional NOC** confirming *"any intellectual property generated will vest entirely with the innovator or startup"* — a hard IP-vesting document that **no platform tracks**. `GOV-037`

---

## 9. What StartupHub must be, stated precisely

**Not** "a platform for startups." **Not** "a directory." **Not** "another IIC portal."

> **A system of record for the venture — keyed on the entity and its state over time — that produces the mandated submissions as a by-product.**

Concretely, the institution's single startup record should generate:
- **IIC** activity submissions (with the evidence pack already attached)
- **YUKTI-NIR** entries with correct TRL banding and verifier workflow (`GOV-023`, `GOV-024`)
- **ARIIA Section 4** rows, which then auto-pool into ranking (`GOV-024`)
- **NIRF Innovation** rows across all disciplines, entered once
- **DPIIT** recognition tracking, with the correct post-Feb-2026 basis (`GOV-017`)

Each of those is a **government workflow**, not a feature — and none of the eleven competitors has any of them. → `Positioning_Map` Gap 3