# Customer Segmentation and ICP

**Phase 4 — built 2026-10-19 by `build/build_phase45.py`. 5 segments across 4 axes.**

> **Every segment is derived from published documents, not from interviews.** Each carries the documentary basis that puts an institution in it, so the segmentation is auditable rather than asserted. **Interviews conducted: 0.**

---

## Axes

**Institution Type** — IIT, NIT, University, Private University, Engineering College, Medical, Management, Autonomous College, IIC institution, Incubation Centre, Research Institution
**Maturity** — No startup ecosystem, Emerging, Active, Mature, Large ecosystem
**Willingness To Pay** — Low, Medium, High
**Need** — Innovation management, Incubation, Startup tracking, IPR, Reporting, Ecosystem management

---

## Segments

| # | Segment | Types | Maturity | WTP | Priority |
|---|---|---|---|---|---|
| 1 | **S1 Mature public IIC (NIT / large university / central)** | NIT, University, IIT | Mature | Medium-High | 1 |
| 2 | **S2 Established private engineering college IIC** | Engineering College, Private University, Autonomous College | Active | Low-Medium | 2 |
| 3 | **S4 Incubator / AIC / EIC (not a degree institution)** | Incubation Centre | Mature | Medium | 3 |
| 4 | **S3 Emerging / newly-registered IIC** | Autonomous College, College | Emerging | Low | 4 |
| 5 | **S5 Research-intensive institute (IISc / R&D organisation)** | Research Institution | Mature | Medium | 5 |

---

### S1 — Mature public IIC (NIT / large university / central)

- **Size:** 100+ registered startups reported; multi-officer IIC
- **Needs:** Startup tracking, Reporting, IPR, Ecosystem management
- **Willingness to pay:** Medium-High

**Why they buy.** Cannot answer a basic question about their own portfolio while filing it

**Documentary basis.**
- NIT Calicut P-A08: 55 vs 17 startups in one PDF - the largest contradiction in the corpus
- Phase 3A F-DPIIT-JOIN: IIT Bombay 16/170 and IIT Delhi 8/38 startups lose identity at the join

**Blockers.** Procurement committee above Rs 50K (Phase 2); Existing ERP may already hold the list (H-01).

---

### S2 — Established private engineering college IIC

- **Size:** Small IIC, part-time coordinator, 5-20 startups
- **Needs:** Reporting, Innovation management, Startup tracking
- **Willingness to pay:** Low-Medium

**Why they buy.** Deadline pressure with no capacity and no system

**Documentary basis.**
- Teresa's College P-A02: a 13-item grant narrative typed into a numeric field
- Phase 3A F-NODF-GRADIENT: Aditya left 7 'No Data Found' cells, the most in the set

**Blockers.** Very thin budget; Coordinator may be the only person (OQ-05).

---

### S4 — Incubator / AIC / EIC (not a degree institution)

- **Size:** 244 seed-funded incubators; AICs need 10,000 sq ft
- **Needs:** Incubation, Startup tracking, Ecosystem management
- **Willingness to pay:** Medium

**Why they buy.** Already commercial entities with real budgets and real portfolio churn

**Documentary basis.**
- AIM: AIC/EIC grant-in-aid up to Rs 10 crore - a funded body with procurement capacity Phase 1 institutions lack
- SISFS: 217 incubators selected with Rs 916.91 crore approved

**Blockers.** Different buyer - operator, not academic; Competitive (91springboard, NSRCEL already software-literate).

> Underrated segment. AIM-funded money is the one budget signal in this market that points FORWARD in time, unlike ARIIA's retrospective spend.

---

### S3 — Emerging / newly-registered IIC

- **Size:** IIC registered, no submitted returns
- **Needs:** Innovation management, Reporting
- **Willingness to pay:** Low

**Why they buy.** MUST submit to keep the IIC alive

**Documentary basis.**
- F-SENTINEL-ZERO: IIT Kanpur records 0 stars while running a mature incubator - registration does not imply activity
- IIC counts disagree by 16% across official sources (C-01) - registration status is not verifiable

**Blockers.** May have no budget at all; May not have anyone accountable (buyer definition fails).

> Largest by count, lowest by probability of paying. Included for completeness, not for revenue.

---

### S5 — Research-intensive institute (IISc / R&D organisation)

- **Size:** 273 filed the NIRF Research Institutions category in 2025
- **Needs:** IPR, Startup tracking
- **Willingness to pay:** Medium

**Why they buy.** IP volume makes the deadline risk concrete and expensive

**Documentary basis.**
- Phase 3A: IISc had 3 malformed placeholder DPIIT keys (DIPP0000)
- IPR: 91,168 national patent filings 2023-24, yet P-A07 finds no deadline calendar in any institution

**Blockers.** Often already has an IP cell or TTO (H-09); Slow, formal procurement.

---

## The Ideal Customer Profile

### Institution-innovations-Council with a live NIRF/ARIIA filing obligation and one part-time accountable officer

> Not the most innovative institution in India - the one that has to file an innovation return next quarter, cannot answer a question about its own portfolio, and has exactly one person accountable for the answer.

**Must be:**

| Criterion | Basis |
|---|---|
| Files the NIRF Innovation category or an ARIIA return | 777 institutions filed NIRF Innovation in 2025 - observable behaviour, not registration |
| Has a named IIC Convener / ARIIA-NIRF nodal officer | Phase 1: SSCET has 40 IIC members and 2 mentors; NIT Calicut 29 mentors vs 155 ideas. One person does the work. |
| Reports startups at a scale where the loss is measurable | Phase 3A: institutions lose 9% of startups at the DPIIT join overall; NIT Andhra Pradesh 67% |
| Has no system of record upstream of the form | P-A10 / H-01 - still HYPOTHESIS, and the artefact ask is the test |

**Must not be:**

- An institution with no IIC and no innovation filing (no forcing event - D-007 untested)
- A student or founder (cannot buy anything - Class D in Phase 2)
- An institution whose Convener demonstrably delegates the form to a junior
- A startup incubator's competitive set (91springboard, NSRCEL already run commercial software)

**Why not the obvious choice.** The instinct is to target IITs and IISc - best data, biggest budgets. We deliberately do not lead there. Phase 2 found their Convener almost certainly does not personally do the data work, so we would interview and sell to the wrong person. IIT Bombay and IISc are excluded from the recruitment shortlist for exactly this reason.

**First targets.** S1 Mature public IIC, and S4 incubator/AIC - the only segment with a budget signal that points forward in time

---

## Limitation

No segment here is validated against a customer. They are derived from published documents. The ICP's second must-be — *no system of record upstream of the form* — is still `HYPOTHESIS` (**H-01**). If a mature institution already keeps a venture register, the ICP is wrong and **S1 collapses**.
