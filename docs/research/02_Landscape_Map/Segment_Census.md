# Segment Census — How Big Is Each Segment, Really?

**Purpose.** Before any market sizing, we need honest denominators. Most pitch failures happen because a founder multiplied the wrong number.

**Compiled:** 18 October 2026 · **Every figure carries source + as-of date + reliability** · Source IDs refer to [`../00_Research_Index/Source_Registry.csv`](../00_Research_Index/Source_Registry.csv)

> ### ⚠️ Read this before using any number
> The three biggest figures a pitch will want — **how many institutions have an IIC**, **how many incubators exist**, and **what institutions will pay** — are respectively **unverifiable**, **not published by anyone**, and **completely unvalidated**. All three are open questions (`OQ-01`, `OQ-08`, `OQ-03`). Nothing below should be presented externally without its date and source.

---

## 1. The headline: segment sizes span three orders of magnitude

| Segment | Count | As-of | Source | Reliability |
|---|---|---|---|---|
| **All HEIs on AISHE frame** | **64,756** | 2023-24 | MoE/PIB (`GOV-001`) | 🟢 HIGH |
| Colleges | 48,246 | 2023-24 | AISHE (`GOV-002`) | 🟢 HIGH |
| Standalone institutions | 15,221 | 2023-24 | AISHE (`GOV-002`) | 🟢 HIGH |
| **Universities** | **1,289** | 2023-24 | AISHE (`GOV-002`) | 🟢 HIGH |
| Autonomous colleges | ~578 | ⚠️ unlabelled vintage | AISHE dashboard (`GOV-005`) | 🟡 MEDIUM |
| AICTE technical institutions | 8,489 | Apr 2026 | PRS (`GOV-004`) | 🟡 MEDIUM |
| Medical colleges | 823 | Apr 2026 | PRS (`GOV-004`) | 🟡 MEDIUM |
| Teacher training institutions | 17,752 | Apr 2026 | PRS (`GOV-004`) | 🟡 MEDIUM |
| **IICs established** | **>6,400** | **Nov 2022** ⚠️ | PIB (`GOV-006`) | 🟢 HIGH but **4 years stale** |
| IICs — current | **UNVERIFIED** | — | — | 🔴 See `OQ-01` |
| Atal Incubation Centres + ACICs | 103 (83+20) | Mar 2026 | Lok Sabha (`GOV-008`) | 🟢 HIGH |
| Atal Tinkering Labs | 10,000+ | Jan 2026 | PIB (`GOV-009`) | 🟢 HIGH |
| DST TBIs | 160+ / 175+ | 2026 | DST / PIB (`GOV-010`) | 🟢 HIGH — **sources conflict** |
| MeitY Startup Hub incubators | 517+ | Dec 2025 | PIB (`GOV-012`) | 🟢 HIGH |
| BIRAC bio-incubators | 74 | current | BIRAC (`GOV-011`) | 🟢 HIGH — **page says 75 elsewhere** |
| **DPIIT-recognised startups** | **223,000+** | 31 Mar 2026 | PIB/DPIIT (`GOV-013`) | 🟢 HIGH |
| Startups incubated in AICs | 6,782 | Mar 2026 | Lok Sabha (`GOV-008`) | 🟢 HIGH |
| Startups supported by DST NIDHI | 12,000+ | Jan 2026 | PIB (`GOV-010`) | 🟢 HIGH |

**The spread matters.** A "universities only" TAM is roughly **50× smaller** than an "all colleges" TAM, and roughly **300× smaller** than "all HEIs". This is why Phase 0 deliberately did not narrow.

---

## 2. Universities — 1,289 (AISHE 2023-24)

### 2.1 By type

| University type | Count |
|---|---|
| State Private University | 464 |
| State Public University | 462 |
| Institute of National Importance | 159 |
| Deemed University – Private | 82 |
| Central University | 55 |
| Deemed University – Government | 33 |
| State Open University | 17 |
| Deemed University – Government Aided | 10 |
| Institute under State Legislature Act | 6 |
| Central Open University | 1 |
| **Total** | **1,289** |

Source: AISHE 2023-24, Fig. 1 / Box 10 (`GOV-002`) · 🟢 HIGH

**5-year trend** (2019-20 → 2023-24): State Public 386→462 · State Private 327→464 · Deemed-Private 80→82. **Private universities nearly doubled while state universities grew more slowly** — a budget-relevant trend for Phase 8.

**By management:** 733 government-managed (254 central + 479 state) · 546 private unaided · 10 private deemed aided.

### 2.2 Discipline split

| Discipline | % of universities | Approx. count |
|---|---|---|
| Multidisciplinary / General | 59.9% | 765 |
| Technical | 13.5% | ~174 *(derived)* |
| Medical Science | 7.7% | 98 |
| Agriculture & Allied | 4.1% | 52 |
| Science | 2.9% | — |
| Management & Finance | 2.4% | — |
| Law | 2.3% | 30 |
| Indian Language | 1.9% | 24 |

Source: AISHE 2023-24 (`GOV-002`) · Percentages 🟢 HIGH · The technical absolute is **derived**, not published.

### 2.3 ⚠️ UGC says something different

| Category | UGC (31.03.2024) | AISHE (2023-24) |
|---|---|---|
| Central | 57 | 55 |
| State Public | 482 | 462 |
| State Private | 478 | 464 |
| Deemed | 136 | 125 |
| **Total** | **1,153** | **1,289** |

Source: UGC Annual Report 2023-24, p.110 (`GOV-003`) · 🟢 HIGH for both

**These are different frames, not a contradiction.** Never mix them. Never cite "1,289 universities" without the year and frame. → `OQ-06`

---

## 3. Colleges — 48,246 (AISHE 2023-24)

- 48,246 registered across **346 affiliating universities**; 46,468 responded (96.3%)
- **70.0% private unaided · 12.9% private aided · 17.1% government**
- 1,622 newly registered in 2023-24; +9,748 vs 2014-15 (38,498)
- **4,787 (10.3%) are exclusively for women**
- 151 affiliating universities have ≥100 colleges; 21 have ≥500; ~55% have fewer than 100

Source: AISHE 2023-24 (`GOV-002`) · 🟢 HIGH

### 3.1 Standalone institutions — 15,221

11,787 responded (**77.4%** — the weakest of the three categories). Dashboard breakdown (⚠️ unlabelled vintage): Technical/Polytechnic ~5,347–5,361 · Nursing Diploma ~4,835–4,889 · Teacher Training ~3,922–3,927 · Paramedical 1,750 · Pharmacy 278–308 · PGDM 354–355.

> ⚠️ AISHE dashboard college counts (Affiliated 49,601–49,905) **exceed** the published 2023-24 total of 48,246. The dashboard reflects a **later, unlabelled frame**. Do not mix.

### 3.2 The low-response signal

**77.4%** standalone-institution response vs a government claim of ">90% participation" overall is a hard number (`GOV-034`, `COMP-029`). Combined with the AISHE self-reporting disclaimer — *"the data is self-reported by the HEIs... the quality of data is generally taken care of by the respective HEIs"* (`GOV-033`) — this is **evidence of data-entry friction at scale**, from the government's own documents.

**We have found no official study quantifying institutional data-collection burden.** → `OQ-12`

---

## 4. Engineering / technical institutions

| Figure | Value | As-of | Source | Reliability |
|---|---|---|---|---|
| AICTE-regulated technical institutions | 8,489 | Apr 2026 | PRS (`GOV-004`) | 🟡 MEDIUM |
| AICTE dashboard "Total Institutes" | 12,981 | ⚠️ **year unattributable** | AICTE (HTTP 404) | 🔴 UNVERIFIED |
| Engineering colleges specifically | — | — | Bulk download only | 🔴 **See `OQ-02`** |
| Institutions "progressive closed" 2025-26 | 58 | 2025-26 | ⚠️ secondary source | 🔴 LOW |

**Engineering colleges are a named segment in `todo.md` Phase 4 and we cannot currently size them.** The 8,489 figure is a Tier-2 PRS compilation, not an AICTE publication, and AICTE's own dashboard was down during research.

---

## 5. Innovation infrastructure — where the real concentration is

### 5.1 IICs — the key unknown

| Figure | As-of | Source | Note |
|---|---|---|---|
| 900 HEIs in IIC 1.0 | 2019-20 | MoE MIC | Programme launch figure |
| "more than 2,200 institutions" | Nov 2020 | MIC (via KPRIET annual report) | Institutional secondary |
| **"more than 6,400 IICs"** | **Nov 2022** | **PIB (`GOV-006`)** | **Last official PIB figure** |
| Current (2025-26) | — | MIC Brochure 2025 | 🔴 **Value in a non-extractable graphic** |
| "over 14,000 HEIs" | Feb 2025 | Education Times | 🔴 Implausible vs 6,400; not a verifiable attribution |

**This is the single most important number in the project and it is unverifiable.** → `OQ-01`

**Verified adjacent MIC figures** (MIC Brochure 2025, values legible — `GOV-007`):
- KAPILA: **2,746 institutes** registered (18 Jul 2025) · **11,768 patents reimbursed** with ₹380 lakh funding · HEI patent filings **15,383 (FY23) → 33,675 (FY25), +119%** · funding raised to **100% (₹5,600)** for up to 100 patents/institution from FY 2024-25
- 3,249 IPR/TTO offices · 5,157 pre-incubation + 3,083 incubation facilities
- Smart India Hackathon: 1,39,844 teams registered, 1,520 winners

Several other brochure values (1,10,218 · 1,52,032 · 60,006 · 16,466 · 3,77,49,200) **could not be reliably paired with their labels** and are deliberately left unattributed.

### 5.2 The IPR trend is the strongest quantified demand signal we have

**HEI patent filings rose 119% in two years (15,383 → 33,675).** Institutions are doing more IP work every year, with **no mandated system anywhere that holds a patent record** (see §8). That gap is widening, not closing.

### 5.3 Incubators — no official national count exists

| Source | Figure | As-of |
|---|---|---|
| MeitY Startup Hub | 517+ incubators, 329+ labs | Dec 2025 (`GOV-012`) |
| DST / NSTEDB | "more than 160 TBIs" + 8 NIDHI-CoE | current (`GOV-010`) |
| PIB (Jan 2026) | "175+ TBIs backed" | Jan 2026 (`GOV-010`) |
| ISTI | 120 TBIs + 40 NIDHI-TBI + 4 iTBI = 164 | undated |
| AIC + ACIC | 103 across 28 S/UTs | Mar 2026 (`GOV-008`) |
| BIRAC BioNEST | 74 (page table says 75) | current (`GOV-011`) |
| Startup India / BHASKAR | 🔴 login-gated, no aggregate published | — |

**Per-state incubator counts are published by nobody.** → `OQ-08`

### 5.4 Government funding flowing to institutions

| Scheme | Corpus / scale | As-of |
|---|---|---|
| **SISFS** (Startup India Seed Fund) | ₹945 cr · 219 incubators · 3,400+ startups funded · ₹605 cr approved | Apr 2026 (`GOV-014`) |
| **Fund of Funds for Startups** | ₹10,000 cr · ₹7,000+ cr to 135+ AIFs · ₹26,900+ cr into 1,420+ startups; **FFS 2.0 notified at ₹10,000 cr** | 2026 (`GOV-016`) |
| **NIDHI-PRAYAS 2.0** | PRAYAS Centre: ₹1.5 cr capex + ₹2 cr prototyping + ₹30 lakh/yr opex, up to ₹20 lakh/innovator. APC: ₹1.5 cr + ₹4 cr, up to ₹40 lakh/innovator | current |
| **BIRAC BIG** | ₹50 lakh grant-in-aid over 18 months, 2 calls/yr | current |
| **TIDE 2.0** (MeitY) | 51 incubators · ₹264.62 cr / 5 yrs · 1,706 startups supported | Dec 2025 |
| **GENESIS** (MeitY, deep-tech) | ₹490 cr / 5 yrs · ~1,600 Tier II/III startups | Jan 2026 |
| **CGSS** | Guarantee raised ₹10 cr → ₹20 cr; 410+ loans, ₹1,250 cr+ guaranteed | Mar 2026 |
| **Atal Innovation Mission** | ₹2,750 cr to March 2028 | Jan 2026 (`GOV-009`) |
| **PMEGP** | 25% rural / 15% urban margin money; ₹50 lakh mfg, ₹20 lakh services | Jan 2026 |

**Every one of these schemes requires an institution or incubator to track money, milestones and outcomes.** None of them is a system of record.

---

## 6. Startups — 223,000+ recognised, but the institutional subset is tiny

### 6.1 National

| Figure | As-of | Source |
|---|---|---|
| 2.23 lakh+ recognised · 23.36 lakh+ direct jobs · 1.07 lakh (48%) women-led | 31 Mar 2026 | PIB/DPIIT (`GOV-013`) |
| 55,200+ recognised in FY 2025-26 — highest ever in a year | Apr 2026 | PIB (`GOV-013`) |
| >2.35 lakh recognised | Jun 2026 | PIB |
| Startups in 653 districts | Sep 2026 | Startup India (`GOV-015`) |

**Regulatory change (critical for data modelling).** Gazette G.S.R. 108(E) of 4 Feb 2026 (`GOV-017`):
- Turnover ceiling **₹100 cr → ₹200 cr**
- **Deep Tech: 20 years** from incorporation (was 10); Deep Tech ceiling ₹300 cr
- **Cooperative societies now eligible**

StartupHub's data model must carry a **recognition-basis field**, or it will silently mis-score institutions whose records span the old and new definitions.

### 6.2 State distribution (31 Mar 2026)

| State/UT | Startups | Direct jobs |
|---|---|---|
| Maharashtra | 38,660+ | 4,13,900+ |
| Karnataka | 22,600+ | 2,46,000+ |
| Uttar Pradesh | 21,960+ | 2,11,580+ |
| Delhi | 21,120+ | 2,36,640+ |
| Gujarat | 19,270+ | 2,14,800+ |
| Tamil Nadu | 14,830+ | 1,52,900 |
| Telangana | 12,520+ | 1,36,570+ |
| Haryana | 11,620+ | 1,39,600+ |
| Kerala | 8,620+ | 74,130+ |
| Rajasthan | 8,100+ | 83,100+ |

Source: PIB/DPIIT (`GOV-013`) · Top-10 only — the release publishes no full 36-row table.

### 6.3 🔥 The most important dataset finding of Phase 0

Factly/Dataful has already extracted **NIRF institution-wise DPIIT startup data** (`GOV-030`):

| Metric | Value |
|---|---|
| Rows | **6,817** |
| Ranking years | 2024, 2025, 2026 |
| Distinct `institute_id` | **204** |
| Distinct ventures | 5,490 |
| Distinct registration numbers | 4,538 |
| States / cities | 26 / 80 |

**Read this carefully. The rows are not startups.**
1. 6,817 rows are startup-rows across **three ranking years** — deduplicated distinct ventures ≈ **5,490**
2. The universe is **204 institutions** — a self-selected subset of ~1,200 universities and ~46,000 colleges. **This is the innovation-active elite, not the HEI population**
3. Three snapshots with **no longitudinal join key** — a venture in both 2024 and 2026 may be one venture or two
4. `institute_name` and `institute_id` disagree (204 vs 202 distinct) — a **0.98% dirty-record rate in a government-derived dataset**, before any cross-portal join
5. It is **paywalled**

**Why this matters enormously.** Three conclusions:

- **The elite segment is real and identifiable.** 204 institutions produced ~5,500 DPIIT-recognised startups over three years. That is the highest-density, highest-willingness-to-pay, most reachable segment in the entire census — and it is enumerable *today*.
- **The data is extractable.** NIRF institutions publish their own submitted Data Capture System PDFs on the open web (`GOV-029`) — verified live at NIT Rourkela, IIM Goa, JBIET, Rajah Serfoji Government College. A commercial intermediary has already proven the extraction is feasible and has monetised it.
- **Someone will build the data layer before a government body does.** Factly already has. This is both a proof of concept for StartupHub's own data asset and a warning that pure data play may already be partly occupied.

---

## 7. Market structure — 31 of 36 states have a startup policy

- **31 of 36** States/UTs have a dedicated Startup Policy; **27** developed after Startup India (2016); startups in **653 districts** (Startup India, page updated 14 Sep 2026 — `GOV-015`)
- **SRF 5.0** results declared **16 Jan 2026**: 34 S/UTs, 19 Action Points, 6 Reform Areas. **Best Performer Cat A = Gujarat**; Top Performers = Karnataka, Punjab, Tamil Nadu, UP; Leaders = Kerala, Rajasthan
- The **list** of 31 states is login-gated → `OQ-14`
- Delhi, Gujarat, Tamil Nadu and UP institution-facing portals **not verified** in this pass

### 7.1 States building the data layer themselves

**Maharashtra Startup Policy 2025** commits to: *"an online system for registration with the unique ID will be created to **map all startups, incubators, accelerators, innovation hubs/labs/centre, investors and mentors/experts**"*, plus a §9.7 Knowledge Portal aggregating directories, funding, mentorship, schemes and regulatory guidelines (`GOV-036`).

**This is the most forward-looking state commitment in India.** It is simultaneously StartupHub's largest future partner and its largest future threat. → `D-011`, `OQ-11`

**Kerala** operates **375+ IEDCs** across colleges and universities, 27 R&D institutions, 63 incubators, and issues a **KSUM UID** as a third identity layer after CIN and DIPP (`GOV-042`). Most developed institution-facing state innovation programme in India.

**Karnataka** runs a **Startup Policy 2025-2030 with a ₹518 crore corpus** — the largest single-state corpus in India — and ELEVATE (idea→PoC grants up to ₹50 lakh, evaluated on 100 marks across 5 parameters; 960 applications in 2024, 554 qualified).

### 7.2 ⚠️ Credential fragmentation

A single venture can hold: **CIN** (MCA) → **DIPP** (DPIIT) → **KSUM UID** (Kerala) → **IIC ID** → **AISHE code** → **NIRF institute_id** → **ARIIA ID** → possibly **SAKALA** (Karnataka).

**No canonical identifier spans these.** And the platforms themselves are separate silos: *"IIC login credentials and the YUKTI login credentials are different"* (`GOV-025`).

---

## 8. What this census means for StartupHub

### 8.1 The reporting burden is concentrated in a small, identifiable set

Institutions with a functioning IIC must file, per academic year:

| Obligation | Scale | Source |
|---|---|---|
| **IIC council meetings** | Minimum 2/yr, with signed resolutions, quarterly plans, minutes, photographs | `GOV-019` |
| **IIC activities** | **≥16/yr** (12 calendar + 4 celebration) + all MIC-driven | `GOV-020` |
| Per-activity submission | **4 social media links + participant counts + expenditure + video URL + 2 photos + document upload** | `GOV-021` |
| **YUKTI-NIR** | Every innovation/startup, TRL-banded, institute-verified, flows to ARIIA | `GOV-023`, `GOV-024` |
| **NIRF Innovation** | ~11 screens **per discipline**, per startup: name, DPIIT no, amount, funder, year, achievement level, investment type | `GOV-027`, `GOV-028` |
| **ARIIA** | 100+ indicators across 5 categories, incl. Patent Application No, Year of Application, Current Status | `GOV-032` |
| **NIDHI / DST / BIRAC** | Grant utilisation, audited certificates, action plans, PFMS/CGA registration | GOV-010 |
| **AISHE** | Lightweight for innovation — but binary re-entry of NIRF status | `GOV-033` |

**And the hard gate:** if council-meeting minutes are not uploaded for a quarter, the **"Add to My Calendar" button becomes unavailable** and the institution cannot add activities at all (`GOV-019`). A governance artefact gates the reporting form.

### 8.2 The unit of record is wrong everywhere

| System | Unit of record | Source |
|---|---|---|
| IIC | the activity/event | `GOV-018`, `GOV-021` |
| YUKTI-NIR | the innovation snapshot (3 static buckets) | `GOV-023` |
| NIRF-Innovation | the spreadsheet row | `GOV-027` |
| AISHE | the institution-year aggregate | `GOV-032` |
| DPIIT | the recognition certificate | `GOV-039` |

**What exists in none of them: a venture entity with state over time.** No system anywhere can answer:

> *Venture V was founded by student S from batch 2023; entered incubation 2024-06; raised ₹40 L from investor I in 2025-02 at valuation ₹X; is now at Series A; the founder has vested 12 of 24 months; the next milestone is X on date Y.*

**An institution literally cannot answer "how many of our incubatees are still alive?" from any government system.** IIC's "Overall Impact" means *students and faculty who benefited from activities* — event attendance, not venture survival.

### 8.3 The sharpest single proof

The IIC portal has a menu item called **"IPR/TTO Centres"** that registers a technology-transfer office's **existence and floor area** — and then has **no field anywhere to record a single patent** (`GOV-022`).

Meanwhile NIRF-Innovation demands *"Patents Commercialized & Technology Transferred"* and *"Income from Technology Transferred (in Rupees)"* (`GOV-028`), and ARIIA demands *"Patent Application No"* and *"Year of Patent Application"* (`GOV-032`).

So an institution registers its IP office in the government system, **records its patents in a private register it maintains itself**, and then **re-types them by hand every year** to answer two government screens — while national HEI patent filings grow **119% in two years** (`GOV-007`).

### 8.4 Four segments worth keeping alive

Not a shortlist. A statement of what Phase 0 surfaced as structurally distinct and worth carrying forward.

| Segment | Denominator | Why it's structurally distinct |
|---|---|---|
| **Innovation-active institutions** (the 204-institution NIRF cohort) | ~204 | Highest startup density, already self-reporting innovation data, enumerable today from public PDFs. **The most reachable proof point in the census.** |
| **Government TBIs & AICs** | 160–175 DST TBIs · 103 AICs · 517+ MeitY incubators | Mandated grant reporting and audited utilisation certificates. Highest pain, but 3-digit population — a volume business is impossible here. |
| **IIC-active HEIs broadly** | ⚠️ unknown, ≥6,400 (2022) | The big prize if the count is large. Blocked on `OQ-01`. |
| **Private universities** | 464, nearly doubled since 2019-20 | Faster budget growth, commercial decision-maker, less procurement friction than government institutions. |

---

## 9. Next actions from this census

1. **`OQ-01` — resolve the IIC count.** Query MIC or read the MIC Brochure 2025 graphic. This gates Phase 5 and Phase 7.
2. **`OQ-02` — resolve AICTE counts.** Needed to size engineering colleges.
3. **Extract the NIRF PDF corpus** into `01_Evidence_Vault/Datasets/`. Factly proved it's possible and monetised it; the 204-institution cohort is our most reachable segment.
4. **Build the institution-level innovation graph** as a Phase 0 by-product: venture → institution → DPIIT number → recognition year → state. This is the seed of both the pitch and a possible data asset.
5. **Do not compute TAM/SAM/SOM yet.** `todo.md` Phase 7 is right to defer. Three of its inputs are currently unknown.