# Government & Official Data

**Phase 6 — built 2026-10-19 by `build/build_phase6.py`. 13 sources mapped, 9 of them buyer-relevant.**

---

## A declared divergence

> `todo.md` PHASE 6 specifies **`04_Government_Data`**. That prefix is already taken by `04_Competitor_DeepDive`.
>
> This repository already runs two folders per numeric prefix — `00_`, `01_`, `02_` and `03_` each have two — and `05_Government_Data` already existed as an empty placeholder that `todo.md`'s own status table points at. This phase uses **`05_Government_Data`**, alongside `05_Market_Sizing`.

---

## The finding that justifies the phase

> ### The State Startup Ranking is not a report. It is a buyer scorecard.
>
> Every state is scored annually, by the union, on whether it has an active State Startup Policy, a Nodal Officer, a Nodal Department, a Dedicated Team — **and the number of startups availing institutional support**.
>
> That last item is a venture register. Phases 0–5 modelled no such buyer.

---

## Three things we did not know

### 1. An unmapped buyer (now Phase 4 segment **G9**)

| | Institution | State Nodal Dept |
|---|---|---|
| Budget | none documented | policy-linked |
| Mandate | IIC compliance only | **scored nationally, annually** |
| Scope | one campus | whole state |
| Incumbent | none found | **a state startup portal** |

**G9 is the first and only segment in Phase 4's `ACT NOW` quadrant** (urgency 4 / revenue 4) — the quadrant Phase 4 reported as empty.

### 2. An unmapped incumbent

> Every SRF-participating state is scored on having a functional startup portal offering single-window services. Every state therefore ALREADY runs software that holds a venture registry.

- SRF Institutional Support Action Point 1: access to information through a State Startup Portal, 12 parameters
- Portal scope: startup registration, policy and clearances, nodal officer details, list of incubators and accelerators, list of mentors, public procurement relaxation details, funding support, grievance redressal
- Tamil Nadu 'Startup TN 5': bilingual, 15+ active policies, ~15 day query resolution

> **Competitor implication.** Phase 0 scanned 15 vendors and found none covering this. The miss is the same coverage defect as OQ-04 (no public API in the mandated stack): we inventoried private vendors and not public infrastructure.

> **Open question, not resolved by assumption:** Is a state portal a competitor, a data source, a partner, or an integration target? We cannot answer that without opening one. Recorded as OPEN, not resolved by assumption.

### 3. A publication bias in the government data itself

> ZERO Emerging-tier state reports could be obtained. The tier that needs this product most is the least documented in public data.

We mined six per-state reports deliberately spread across tiers. **Zero Emerging-tier reports were obtainable.** That mirrors OQ-21 in Phase 1: self-publishing institutions meant the winners were visible and the failures were not. Here, the states that need a product like this most are the least documented.

---

## Access is the real constraint

| Access | Bodies |
|---|---:|
| `OPEN_HTML` | 7 of 13 |
| `OPEN_PDF` | 4 of 13 |
| `REGISTER_GATED` | 1 of 13 |
| `LOGIN_GATED` | 1 of 13 |

| Access | Means |
|---|---|
| `OPEN_PDF` | public PDF, no login |
| `OPEN_HTML` | public web page, no login |
| `OPEN_DATA` | public machine-readable data |
| `REGISTER_GATED` | registration required for detail |
| `LOGIN_GATED` | login required - cannot be bulk-harvested |
| `PRESS_ONLY` | figures only via press releases, no underlying dataset |

> **Only 0 of 13 publish machine-readable data, and the two most important — the IIC portal and DPIIT — are gated.** `OQ-22` (what fraction of IICs actually file) is unanswerable for exactly this reason. This is `OQ-04` restated as an access finding rather than a technology finding.

---

## Funding schemes — correcting Phase 5

Phase 5 concluded that AIM's grant was the only forward-looking funding signal found. **That was wrong, and this phase corrects it.**

| Scheme | Ministry | Max grant | Years | Reaches institutions |
|---|---|---:|---:|---|
| **TIDE 2.0** | MeitY | Rs 27.2 cr | 5 | yes |
| **AIC (Atal Incubation Centre)** | AIM / NITI Aayog | Rs 10 cr | 5 | yes |
| **BioNest** | DBT / BIRAC | not stated | 3-5 | yes |
| **TBI (Technology Business Incubator)** | DST / NSTEDB | not stated | 5 | yes |

**Four central schemes, and at least three flow directly to degree institutions.** TIDE 2.0's ceiling of Rs 27.2 crore is the largest incubator grant found anywhere in this research.

---

## Files

| File | What it covers |
|---|---|
| [Source_Map.md](Source_Map.md) | All 13 bodies, what they publish, access status |
| [State_Startup_Ranking.md](State_Startup_Ranking.md) | Framework 2018→2026, results, tier movement |
| [State_Reports_Mined.md](State_Reports_Mined.md) | Tier-spread coverage and the Emerging-tier gap |
| [Funding_Schemes.md](Funding_Schemes.md) | Incubator grants + state policy examples |
| [State_Segment.md](State_Segment.md) | G9 — the buyer Phase 0–5 never modelled |

Machine-readable: `_exports/phase6/`. Reproduce: `python build/build_phase6.py`.
