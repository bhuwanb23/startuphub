# Unit Economics

**Phase 5 — built 2026-10-19 by `build/build_phase5.py`. Seeded Monte Carlo, 50,000 trials, seed `20261019`. Modelled at the same ACV distribution as everything else, so it stays internally consistent.**

> **Provenance: `SIMULATED`.** These describe our cost assumptions, not the market.

---

## The finding: at Rs 1.2 lakh, this business destroys value on every deal

| Metric | P25 | P50 | P75 |
|---|---:|---:|---:|
| Customer acquisition cost | Rs 5,79,357 | Rs 7,16,155 | Rs 8,59,194 |
| Lifetime value | Rs 1,07,335 | Rs 1,49,186 | Rs 1,95,061 |
| CAC payback period | 10.1 months | 13.4 months | 18.6 months |
| **LTV / CAC** | **0.14** | **0.21** | **0.29** |

### P(LTV/CAC > 3) = 0.0%

**Zero of 50,000 trials reach even 1.0.** At a median ratio of **0.21**, every rupee of acquisition cost returns about twenty paise of lifetime value.

### Why

CAC is dominated by the **sales cycle**, not by marketing spend:

- cycle 6 months × Rs 67,000/month × 1.5 people ≈ **Rs 7,16,155**
- LTV at Rs 1,49,186 is capped by a 1.2 lakh contract, a ~54% effective margin and a 65% renewal rate

> **The ACV is roughly an order of magnitude too small for this sales motion.** No amount of sales-process improvement closes a 0.21 ratio.

---

## What ACV would make it work?

| | P25 | P50 | P75 |
|---|---:|---:|---:|
| **ACV required for LTV/CAC = 3** | Rs 7,99,333 | **Rs 10,27,962** | Rs 13,09,500 |

That is **8.6× the current Rs 120,000 list price.**

### And the budget can absorb it

At Rs 10,27,962 a year, against a NIT's Rs 1,89,58,23,333 budget, that is **0.054% of the institution's annual budget.**

> ### The coherent picture, for the first time
>
> 1. Phase 36: P(Rs 1 crore ARR by year 3) = **0.0%**
> 2. Phase 5: our price is **0.006%** of a NIT's budget — affordability is a non-issue
> 3. Phase 5 unit economics: **LTV/CAC = 0.21** at the current price
> 4. Viability needs ACV ≈ **Rs 10.3 lakh**, which is **0.054%** of that same budget
>
> **We are priced roughly 9× too low for our own sales model, and the budget has enormous room to absorb the increase.** The only thing arguing against it is willingness to pay — `OQ-03` — which is still unmeasured.

This is what the budget data is for: **not to raise the price, but to know that price is not the constraint.** Raising it on the strength of unspent budget would be the exact inference error we have refused throughout. `OQ-03` has to be answered.

---

## The three ways out

| Lever | Effect | Evidence status |
|---|---|---|
| **Raise ACV to ~Rs 10 lakh** | LTV/CAC 0.21 → 3.0 | Affordable (budget headroom proven). Willingness **unmeasured** (`OQ-03`) |
| **Cut CAC** via shorter cycle | CAC is `cycle × seller × people` — halving the cycle halves CAC | Committee-gated (Phase 2). `OQ-27` (GeM bypass) is the lever |
| **Sell through a partner** (incubators, AIM-funded) | Removes the founder from the CAC equation entirely | 244 funded incubators (G5). Untested |

The simulation says **conversion (r=0.65) and ACV (r=0.56) dominate** the year-3 answer, and that renewal and sales-cycle length sit at r ≈ 0.00. But the unit-economics model shows the sales cycle is what *creates* the CAC. The two models agree on ACV and disagree on cycle length — which is itself worth knowing.

---

## Assumptions

| Input | Min | Mode | Max | Basis |
|---|---:|---:|---:|---|
| `seller_monthly_cost` | 45,000 | 67,000 | 95,000 | Rs 8 lakh/yr fully loaded ≈ Rs 66,700/month |
| `people_per_deal` | 1.0 | 1.5 | 2.5 | seller plus a technical/commercial half |
| `gross_margin` | 0.6 | 0.78 | 0.88 | SaaS minus on-premise servicing |
| `on_premise_annual_cost` | 18,000 | 36,000 | 70,000 | infra, patches, support per on-prem customer |

**Every figure here is an assumption we chose.** The model is only as good as these, which is why they are published rather than buried.
