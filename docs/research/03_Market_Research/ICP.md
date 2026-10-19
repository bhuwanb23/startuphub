# Ideal Customer Profile

**Phase 4 — built 2026-10-19 by `build/build_phase4.py`.**

## Institution with a live annual innovation filing obligation, at least 20 tracked innovations, and one accountable officer who cannot answer a question about their own portfolio

> Not the most innovative institution in India. The one that must file an innovation return next quarter, holds enough activity that the filing is lossy, and has exactly one person accountable for it.

---

## Predicates — each one tested against real data

| Test | Checkable? | How | Spec example clause | Verdict |
|---|---|---|---|---|
| Files the NIRF Innovation category or an ARIIA return | **YES - public** | NIRF 2025 filer list; 777 institutions filed Innovation | *active IIC/incubation ecosystem* | supportable |
| Runs 20+ tracked innovation projects | **PARTLY** | 20+ is the corpus median for institutions reporting startups (18/36 report any; max 55) | *20+ startups/innovation projects* | checkable only where the institution reports it - 50% coverage |
| Has a named IIC Convener / ARIIA-NIRF nodal officer | **YES - public** | ARIIA forms name a nodal officer by role and contact in every mined document | *dedicated innovation staff* | MISLEADING - 2/36 report staff numbers. A named officer is NOT dedicated staff |
| Requires structured reporting across 2+ instruments | **YES - public** | IIC portal + NIRF + ARIIA are three separate submissions | *requirement for structured reporting* | strongly supportable - the strongest clause |
| Has NO system of record upstream of the form | **NO** | P-A10 / H-01 - still HYPOTHESIS. The artefact ask is the test | *(not in the example)* | this is the load-bearing unknown |

---

## Audit of the spec's own example

The spec offers this example ICP:

> *"Institution with an active IIC/incubation ecosystem, 20+ startups/innovation projects, multiple programs, dedicated innovation staff, and a requirement for structured reporting."*

> **Our audit:** Four of the example's five clauses are checkable from public data. 'Dedicated innovation staff' is NOT: the corpus populates faculty_mentors in 2 of 36 institutions. We therefore substitute a checkable proxy (a named nodal officer) and mark the original as unverifiable rather than quietly accepting it.

| Example clause | Verdict |
|---|---|
| active IIC/incubation ecosystem | supportable |
| 20+ startups/innovation projects | checkable only where the institution reports it - 50% coverage |
| dedicated innovation staff | MISLEADING - 2/36 report staff numbers. A named officer is NOT dedicated staff |
| requirement for structured reporting | strongly supportable - the strongest clause |

**"Requirement for structured reporting" is the strongest clause** — it is fully checkable (three separate government submissions: IIC portal, NIRF, ARIIA) and it is the one our evidence most directly supports.

---

## Targeting order

- **Primary segment:** G1/G2 - colleges and autonomous colleges, per user direction
- **First paying segment:** G5 - incubation centres, the only forward-looking budget signal

These differ on purpose. Colleges are the largest population and where the reporting defect is most visible, but they carry the thinnest budgets. Incubation centres are the only segment whose funding signal points *forward* in time (AIM grant-in-aid up to ₹10 crore), unlike ARIIA's retrospective expenditure split.

---

## Explicit exclusions

| Excluded | Why | Revisit |
|---|---|---|
| **G4 - IIT / premier research institution** | Convener almost certainly delegates the form; slowest procurement; often has a TTO | via a named coordinator, never cold |
| **Institutions with no innovation filing obligation** | No forcing event (D-007). Nothing creates the deadline that sells the product | only if a non-deadline driver is documented |
| **Students and founders** | Cannot buy anything - Phase 2 Class D | never, as buyers; always as evidence sources |
| **Incumbents' competitors as buyers** | 91springboard, NSRCEL already run commercial software and build their own | never |

> An exclusion list is what makes a segmentation usable. A matrix that only describes who to sell to will eventually be used to sell to someone who cannot buy.
