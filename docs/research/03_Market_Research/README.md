# Indian Innovation Ecosystem — The Real Base

**Phase 5 — built 2026-10-19 by `build/build_phase45.py`. Every figure is T1 government/official.**

---

## The instruction this phase had to satisfy

> *"Don't automatically add all of these together. You need to determine **which ones are actually potential buyers**."* — `todo.md` PHASE 5

That instruction is why this page leads with **three numbers that disagree**, not with a total.

---

## The base

| Population | Count | As of | Source |
|---|---:|---|---|
| Registered HEIs (universities + colleges + standalone) | **58,643** | 2021-22 (published 2024-01-25) | AISHE 2021-22 |
| Universities | 1,168 | 2021-22 (published 2024-01-25) | AISHE 2021-22 |
| Colleges | 45,473 | 2021-22 (published 2024-01-25) | AISHE 2021-22 |
| Standalone institutions | 12,002 | 2021-22 (published 2024-01-25) | AISHE 2021-22 |
| **Institutions filing NIRF Innovation** | **777** | 2025 (released 2025-09-04) | India Rankings 2025 |
| Unique NIRF applicants (any category) | 7,692 | 2025 (released 2025-09-04) | India Rankings 2025 |
| **IICs** | **14,067 – 16,367** | 2024 – 2026 | 3 official sources |
| DPIIT-recognised startups | 197,692 | 2025-10 (Lok Sabha written reply) | Lok Sabha reply |
| National patent filings | 92,168 | 2023-24 (IPO annual reports) | IPO annual report |
| SISFS-selected incubators | 217 | 2025-2026 | PIB |

**Total student enrolment 4.33 crore.** 65.3% of colleges are private unaided — which is why college-type is the wrong segmentation axis and *innovation activity* is the right one.

---

## Why 58,643 is not the market

> Registered, not active. AISHE counts an institution whether or not it has an innovation function, an IIC, or any startup. 58,643 is the SUPER-BOUND, never the market.

AISHE counts **registration**. Phase 3A measured what registration is worth: IIT Kanpur holds an IIC and recorded **0** IIC stars while running one of India's most mature incubators. A registered institution with no accountable person is not a buyer.

---

## Conflict C-01 — three official counts of how many IICs exist

| Value | As of | Source |
|---:|---|---|
| **14,067** | 2024-07-31 | Atal Innovation Mission orientation session |
| **14,830** | 2025 (portal counter) | IIC portal, iic.mic.gov.in |
| **16,367** | 2025-2026 (MoE status page) | Ministry of Education, NEP implementation page |

That is a **16.4% spread** across three government sources on the single most important count in this market — and **none of them states the counting rule**. Registered? Active? Ever submitted?

**Our choice.** Use 14,067 as the CONSERVATIVE floor and 16,367 as the CEILING. Report both. Never present a single IIC count.

This is not a research complaint. It is the same defect this project has documented inside 36 institutional reports and 11 government forms: **a ledger that counts entries rather than state.** We cannot cite one of these numbers as *the* market — and neither can the customer.

---

## Who is actually a potential buyer

Phase 5 asks us to determine this. Three testable criteria, no hand-waving:

| Must have | Public proxy | Testable? |
|---|---|---|
| An institution-level innovation function exists | Files the NIRF Innovation category, or holds an IIC, or holds an AIC/EIC | yes |
| Someone is accountable for the innovation records | Institution appears in the IIC portal's activity reporting, or files a non-empty innovation return | yes |
| There is a compliance event that forces the work | NIRF Innovation cycle (annual, Jan 31 submission) or ARIIA cycle | yes |

### Strong negative signals

- IIC registered but never submits - F-SENTINEL-ZERO shows institutions record 0 for real activity
- No ARIIA/NIRF nodal officer named anywhere
- Institution files NIRF Overall but not Innovation - active in the ecosystem, not in the ledger that matters
- 'No Data Found' heavy forms - F-NODF-GRADIENT shows this tracks maturity inversely

### Cannot be filtered with public data

- Digital readiness / ERP estate - no public dataset at institution level
- Budget head available for innovation software - OQ-29, unresolved, needs interviews
- Renewal intent - no public dataset exists; this is the single biggest gap in the TAM

---

## What this phase could NOT establish

- No public dataset links an institution to the software it already pays for. The 'free incumbent' assumption (H-03) stays HYPOTHESIS.
- No public dataset shows which institutions actually have a person accountable for innovation records. This is the real filter and it is invisible.
- IIC activity data is not published in machine-readable form at institution level. Without it, TAM rests on registration counts, which C-01 shows are definitionally unsafe.
- Budget-head data does not exist publicly for innovation software. The single government money signal (ARIIA expenditure split) is retrospective and unlinked to institutions.
- There is no published churn or renewal rate for any incumbent in this category, so retention and LTV cannot be modelled from evidence.
- Willingness to pay has ZERO primary evidence. OQ-03 remains open. Every rupee figure in this repo traces to a competitor's public price, never to a customer's budget.

Machine-readable: `_exports/phase45/`. Sources `M5-001`–`M5-006` in `00_Research_Index/Source_Registry.csv`.
