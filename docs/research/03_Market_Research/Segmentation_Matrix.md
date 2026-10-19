# Customer Segmentation Matrix

**Phase 4 — built 2026-10-19 by `build/build_phase4.py` from `data_p4_segmentation.py`. 8 segments, 12 institution types.**

> **Derived from published documents, not from interviews. Interviews conducted: 0.** Activity Scale is *computed* from the 36-document Phase 1 corpus. Willingness to pay is a **documented rule applied to sourced signals** — `OQ-03` remains open, so no WTP band here is a measured outcome.

---

## Two departures from the spec, both declared

### 1. Maturity is split into two axes

The corpus **cannot** support a single maturity axis. Field coverage across the 36 documents:

| Field | Populated | Bandable? |
|---|---:|---|
| `patents_filed` | 6/36 (16.7%) | **NO** |
| `ips_filed` | 2/36 (5.6%) | **NO** |
| `designs_filed` | 1/36 (2.8%) | **NO** |
| `faculty_mentors` | 2/36 (5.6%) | **NO** |
| `innovation_ambassadors` | 2/36 (5.6%) | **NO** |
| `star_rating` | 1/36 (2.8%) | **NO** |

The four fields that *are* usable: `activities_total` 22/36 (61%), `ideas_generated` 22/36 (61%), `amount_inr` 22/36 (61%), `startups_total` 18/36 (50%).

So maturity becomes:

- **Activity Scale** — *derived*. How much innovation activity is demonstrable.
- **IP Depth** — *unmeasurable*. Carried as `UNKNOWN`, and the build **refuses to let any numeric IP score exist**.

> The fields that would define IP maturity are populated in 2.8-16.7% of the corpus. Banding on them would rank 36 institutions using 1-6 observations, and a 0 in a blank field would be read as 'no IP' when it means 'not reported'. That is precisely the F-SENTINEL-ZERO defect.

> **What still stands without IP-depth data:** P-A07 remains CRITICAL on documentary evidence alone: NO institution in the corpus keeps a patent deadline calendar. That finding needs no IP-depth data - absence across all 36 IS the measurement.

### 2. A 12th institution type: `College (affiliated/general)`

> todo.md PHASE 4 names 11 institution types and none of them is a plain College. Colleges are 45,473 of 58,643 registered HEIs (AISHE 2021-22) - the single largest population in the market. Folding them into University/Autonomous would hide both their size and their distinct economics (65.3% are private unaided).

**Authority:** added on user instruction that colleges are the primary initial target.

---

## The matrix

| ID | Segment | Types | Activity | IP Depth | WTP | Needs |
|---|---|---|---|---|---|---|
| **G1** | Affiliated / general college (private unaided) | College (affiliated/general) | Emerging | `UNKNOWN` | **Low** | Reporting, Startup tracking |
| **G2** | Autonomous engineering college | Autonomous College, Engineering College | Active | `UNKNOWN` | **Low** | Reporting, Startup tracking, Innovation management |
| **G3** | NIT / public university with a live IIC | NIT, University | Mature | `UNKNOWN` | **Medium** | Reporting, Startup tracking, IPR, Ecosystem management |
| **G4** | IIT / premier research institution | IIT, Research Institution | Large ecosystem | `UNKNOWN` | **High** | IPR, Ecosystem management |
| **G5** | Incubation centre / AIC / EIC | Incubation Centre, IIC institution | Mature | `UNKNOWN` | **Medium** | Incubation, Ecosystem management, Startup tracking |
| **G6** | Medical / pharmacy institution | Medical Institution | Emerging | `UNKNOWN` | **Low** | Reporting, IPR |
| **G7** | Management institution | Management Institution | Emerging | `UNKNOWN` | **Medium** | Ecosystem management, Startup tracking |
| **G8** | Private university (deemed / unaided) | Private University | Active | `UNKNOWN` | **Medium** | Reporting, Startup tracking, Incubation |

---

## Activity Scale — derived from the corpus

| Band | Institutions | Meaning |
|---|---:|---|
| No ecosystem | 7 | No activity metric reported at all in the annual report |
| Emerging | 9 | At least one activity reported, at low volume |
| Active | 11 | Most activity metrics reported |
| Mature | 7 | All four activity metrics reported |
| Large ecosystem | 2 | All four reported AND the institution reported 20+ startups |

**7 of 36 institutions report no activity metric at all.** That is not 'no innovation' — it is the same non-report we documented as F-SENTINEL-ZERO. Bands are computed from *reported* values only; a missing field is never coerced to 0.

Per-institution derivation: `_exports/phase45/activity_scale_bands.csv`.

---

## The quadrant — urgency vs revenue

Both axes are scored, because **they disagree** and collapsing them hides it.

| ID | Segment | Urgency | Revenue | Quadrant | WTP |
|---|---|---:|---:|---|---|
| G4 | IIT / premier research institution | **5** | **2** | **PAINFUL, HARD TO PAY** | High |
| G3 | NIT / public university with a live IIC | **4** | **3** | **PAINFUL, HARD TO PAY** | Medium |
| G2 | Autonomous engineering college | **3** | **3** | **DEFER** | Low |
| G8 | Private university (deemed / unaided) | **3** | **3** | **DEFER** | Medium |
| G1 | Affiliated / general college (private unaided) | **3** | **2** | **DEFER** | Low |
| G6 | Medical / pharmacy institution | **3** | **2** | **DEFER** | Low |
| G5 | Incubation centre / AIC / EIC | **2** | **4** | **BUYABLE, LOW URGENCY** | Medium |
| G7 | Management institution | **2** | **3** | **DEFER** | Medium |

| Quadrant | Segments |
|---|---|
| **ACT NOW** | — none — |
| **BUYABLE, LOW URGENCY** | G5 |
| **PAINFUL, HARD TO PAY** | G4, G3 |
| **DEFER** | G2, G8, G1, G6, G7 |

> **The finding is the empty quadrant.** Nothing scores high on both. The institutions with the most acute pain (`G4`, urgency 5) sit behind the slowest procurement in the system, and the segments with money (`G5`) have no deadline forcing the work. **That disagreement is the go-to-market problem, and it is now visible instead of assumed.**

---

## Module fit — what triggers what, and when

All four modules are in scope, so *need* alone cannot discriminate segments. What discriminates is the **forcing event**: a dated, institutionally-owned obligation.

| Module | Need | Forcing event | Hard deadline? |
|---|---|---|---|
| **Reporting** | Reporting | NIRF Innovation cycle | **YES** |
| **IPR lifecycle** | IPR | Patent deadline | **YES** |
| **Cohort management** | Incubation | No forcing event | no |
| **Ecosystem management** | Ecosystem management | IIC quarterly score submission | no |
| **Startup tracking** | Startup tracking | NIRF Innovation cycle | **YES** |
| **Innovation management** | Innovation management | No forcing event | no |

### Per segment

**G1 Affiliated / general college (private unaided)** — CORE: Reporting, Startup tracking · NO: IPR lifecycle, Cohort management, Innovation management

**G2 Autonomous engineering college** — CORE: Reporting, Ecosystem management, Startup tracking

**G3 NIT / public university with a live IIC** — CORE: Reporting, IPR lifecycle, Ecosystem management, Startup tracking

**G4 IIT / premier research institution** — CORE: IPR lifecycle, Ecosystem management · NO: Reporting, Cohort management, Innovation management

**G5 Incubation centre / AIC / EIC** — CORE: Cohort management, Ecosystem management, Startup tracking · NO: Innovation management

**G6 Medical / pharmacy institution** — CORE: Reporting · NO: Cohort management, Innovation management

**G7 Management institution** — CORE: Ecosystem management, Startup tracking · NO: IPR lifecycle, Innovation management

**G8 Private university (deemed / unaided)** — CORE: Reporting, Cohort management, Ecosystem management, Startup tracking

> **Cohort management is the weakest module in the portfolio.** It has *no forcing event* — no documented obligation creates the need. `P-A03` remains `HYPOTHESIS`. IPR lifecycle is the strongest: the only module with a hard external deadline, and the only one where Phase 0 proved both the competitors and the government's own ARIIA 3.3 fail.

---

## Forcing events

| Event | When | Hard? | Owner | Evidence |
|---|---|---|---|---|
| NIRF Innovation cycle | Annual, 31 January submission | **YES** | ARIIA/NIRF nodal officer | NIRF 2025: 777 institutions filed; Phase 3A shows the join fails |
| ARIIA cycle | Annual cycle, academic-year pairs | **YES** | IIC Convener + institution head | Phase 3A: all ARIIA forms end in '0 (On Progress)' |
| Patent deadline | Per-filing, externally imposed | **YES** | Whoever filed - usually the researcher | P-A07 DOCUMENTED CRITICAL: no institution has a deadline calendar |
| IIC quarterly score submission | Quarterly | no | IIC Coordinator | MoE: completing minimum calendar activities earns up to 50% weightage |
| No forcing event | None identified | no | - | P-A03 graded HYPOTHESIS: cohorts are not a documented obligation |

---

## Population per segment — never summed

| Segment | Population | Basis |
|---|---:|---|
| G1 Affiliated / general college (private unaided) | 45,473 | AISHE 2021-22 all colleges |
| G2 Autonomous engineering college | 45,473 | Not separately disaggregated in AISHE; subset of colleges |
| G3 NIT / public university with a live IIC | 1,168 | AISHE 2021-22 universities (685 government-managed) |
| G7 Management institution | 1,026 | NIRF 2025 Management category |
| G8 Private university (deemed / unaided) | 483 | AISHE: 473 private unaided + 10 private deemed |
| G4 IIT / premier research institution | 273 | NIRF 2025 Research Institutions category |
| G5 Incubation centre / AIC / EIC | 244 | NSD26: 244 seed-funded incubators |
| G6 Medical / pharmacy institution | 223 | NIRF 2025 Medical category |

> **These do not add up, and must not.** They are non-nested populations (Conflict C-02): a college is also an institution, an IIC sits inside a university, and an incubator is not a degree-granting body at all.

### Arithmetic proof that they cannot be summed

| | |
|---|---:|
| Naive sum of the column above | **94,363** |
| Actual registered HEIs (AISHE 2021-22) | **58,643** |
| Apparent overlap | **35,720** |

The naive sum **exceeds the real population by 35,720 institutions** (61%). That is not a rounding error — it is arithmetic proof that these categories **overlap**. Colleges appear twice (G1 and G2); universities appear as G3, G6, G7 and G8 depending on lens.

This is the same trap `todo.md` PHASE 5 warns about: *"Don't automatically add all of these together."* Here it is demonstrated rather than asserted.

---

## Segment detail

### G1 — Affiliated / general college (private unaided)

- **Activity Scale:** Emerging · **IP Depth:** `UNKNOWN` · **WTP:** Low · **Grade:** SINGLE-SOURCE
- **Urgency 3/5** — Files NIRF Innovation; deadline is real but the volume is small
- **Revenue 2/5** — 65.3% of colleges are private unaided; thinnest budgets in the system

**Why it matters.** User-designated primary target for the initial phase. Largest population by count, and the segment where the reporting defect is most visible because the data is thinnest. Volume strategy, not value strategy.

**Documentary basis.**
- Phase 3A F-NODF-GRADIENT: Aditya (private college) left 7 'No Data Found' cells, the most measured
- AISHE: 21.5% government / 13.2% private aided / 65.3% private unaided
- Teresa's College P-A02: 13-item grant narrative typed into a numeric field

> ⚠️ **Largest population AND lowest willingness to pay. Winning here means a low ACV or a different charge model - these institutions may not sustain Rs 1.2 lakh/yr. That tension is unresolved and is the segment's main risk.**

---

### G2 — Autonomous engineering college

- **Activity Scale:** Active · **IP Depth:** `UNKNOWN` · **WTP:** Low · **Grade:** SINGLE-SOURCE
- **Urgency 3/5** — NIRF Innovation filer; deadline pressure visible in corpus contradictions
- **Revenue 3/5** — Autonomy shortens procurement; campus infrastructure is modern

**Why it matters.** Best balance of volume, deadline and some budget. The most realistic first paying segment once the reporting module is proven.

**Documentary basis.**
- Corpus: 6 of 36 documents are autonomous colleges
- Corpus: 9 of 36 are engineering colleges
- P-A02: hand-assembled annual reports (P-A08) concentrate here

---

### G3 — NIT / public university with a live IIC

- **Activity Scale:** Mature · **IP Depth:** `UNKNOWN` · **WTP:** Medium · **Grade:** DOCUMENTED
- **Urgency 4/5** — Multi-deadline: NIRF + ARIIA + patent deadlines
- **Revenue 3/5** — Government procurement is slow but funded; committee above Rs 50K

**Why it matters.** Where the Phase 3A headline has live, named, published examples. The join defect is demonstrable to this exact buyer.

**Documentary basis.**
- Phase 3A F-DPIIT-JOIN: IIT Delhi 8 of 38 startups lost at the join (21%)
- NIT Calicut P-A08: 55 vs 17 startups in one PDF
- NIT Andhra Pradesh: 6 recognised, TRL evidence for only 2 (67% loss - worst measured)
- Phase 2: committee trigger spread Rs 50,000 - Rs 10,00,000

---

### G4 — IIT / premier research institution

- **Activity Scale:** Large ecosystem · **IP Depth:** `UNKNOWN` · **WTP:** High · **Grade:** SINGLE-SOURCE
- **Urgency 5/5** — Highest patent volume and the most demanding deadlines
- **Revenue 2/5** — Slowest procurement in the system; often already has a TTO

**Why it matters.** HIGHEST URGENCY, WEAK REVENUE PATH. The quadrant disagreement is the point: the most acute pain sits behind the slowest procurement.

**Documentary basis.**
- Phase 3A: IIT Bombay lost 16 of 170 startups at the join; IIT Delhi 8 of 38
- Phase 3A: IISc had 3 malformed placeholder DPIIT keys (DIPP0000)
- IPO: 91,168 national patent filings 2023-24 - real IP volume, real deadlines

> 🚫 **Excluded from initial outreach.** Phase 2 and Phase 3B both found their Convener almost certainly delegates the form. We would interview and sell to the wrong person. Revisit via a named coordinator, never cold.

---

### G5 — Incubation centre / AIC / EIC

- **Activity Scale:** Mature · **IP Depth:** `UNKNOWN` · **WTP:** Medium · **Grade:** DOCUMENTED
- **Urgency 2/5** — No government filing deadline; commercial pressure instead
- **Revenue 4/5** — AIM grant-in-aid up to Rs 10 crore - funded bodies with real procurement power

**Why it matters.** BEST REVENUE PATH. The only segment whose funding signal points FORWARD in time, unlike ARIIA's retrospective expenditure split. Also the only segment where cohorts are an actual operating concept.

**Documentary basis.**
- AIM: AIC/EIC grant-in-aid up to Rs 10 crore over max 5 years
- SISFS: 217 incubators selected, Rs 916.91 crore approved
- AIM eligibility: minimum 10,000 sq ft built-up space - these are real operations

---

### G6 — Medical / pharmacy institution

- **Activity Scale:** Emerging · **IP Depth:** `UNKNOWN` · **WTP:** Low · **Grade:** HYPOTHESIS
- **Urgency 3/5** — NIRF Medical filers (223) face the same January deadline
- **Revenue 2/5** — Same economics as colleges; regulated environment adds friction

**Why it matters.** Adjacent, not targeted. Corpus evidence is 5 pharmacy colleges, which is not a medical institution. Weakest evidence base; kept in the matrix so the type is not invisible.

**Documentary basis.**
- Corpus: 5 of 36 documents are pharmacy colleges - the only health-adjacent evidence
- NIRF 2025: 223 institutions filed the Medical category

---

### G7 — Management institution

- **Activity Scale:** Emerging · **IP Depth:** `UNKNOWN` · **WTP:** Medium · **Grade:** HYPOTHESIS
- **Urgency 2/5** — NIRF Management filers (1,026) but innovation is not core to them
- **Revenue 3/5** — AIC-affiliated IIMs are funded bodies; strong alumni-funded budgets

**Why it matters.** Structurally similar to G5 without the incubation funding. Included to close the type gap; not a first target on this evidence.

**Documentary basis.**
- Corpus: 1 of 36 documents is a management college - the thinnest evidence of any type
- NIRF 2025: 1,026 institutions filed the Management category

---

### G8 — Private university (deemed / unaided)

- **Activity Scale:** Active · **IP Depth:** `UNKNOWN` · **WTP:** Medium · **Grade:** SINGLE-SOURCE
- **Urgency 3/5** — NIRF filer with an established IIC
- **Revenue 3/5** — Autonomous procurement, but no public funding guarantee

**Why it matters.** Commercial structure means faster decisions than G3 at comparable scale. A reasonable second wave.

**Documentary basis.**
- Corpus: 4 of 36 documents are private deemed/deemed universities
- AISHE: 473 private unaided + 10 private deemed universities

---

## Limitation

No segment is validated against a customer. WTP is a documented rule, not a measurement. IP Depth is `UNKNOWN` everywhere and cannot be filled in without new evidence — not a code change. The ICP's load-bearing predicate (*no system of record upstream of the form*) remains `HYPOTHESIS` (**H-01**).

Machine-readable: `_exports/phase45/segmentation_matrix.csv`, `segment_quadrant.csv`, `module_fit.csv`, `type_crosswalk.csv`, `activity_scale_bands.csv`.
