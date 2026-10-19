# Simulation Results

**Built 2026-10-19 by `build/build_phase35.py`. Seed `20261019`, 50,000 trials. Deterministic — the same seed reproduces these numbers exactly.**

> **Provenance: `SIMULATED`.** These are percentiles *of our priors*, not measurements of the market. P50 is not "the likely answer" — it is "the median world given what we currently believe". Read it as a description of our uncertainty.

---

## Priors

Every input is a **triangular** (min, mode, max) distribution. Triangular because we genuinely hold three views on each — a floor, a considered middle, and a ceiling — and inventing a normal curve would imply a confidence we do not have about our own uncertainty.

| Input | Min | Mode | Max | Why |
|---|---:|---:|---:|---|
| `acv_realised` | 35,000 | 95,000 | 180,000 | list Rs 1.2L minus discounting, pilots, partial years |
| `conversion` | 0.02 | 0.06 | 0.2 | 0 of 12 Class A IIC seats hold documented budget authority |
| `reachable_y3` | 150 | 300 | 600 | bounded by the 777-institution SAM floor |
| `renewal` | 0.4 | 0.65 | 0.9 | no published rate exists for any incumbent |
| `sales_cycle_months` | 3 | 6 | 14 | committee-gated academic sale |
| `on_premise_demand` | 0.2 | 0.55 | 0.85 | H-10 prior |

---

## Outputs

| Metric | P5 | P25 | P50 | P75 | P95 | Max |
|---|---:|---:|---:|---:|---:|---:|
| Realised ACV per institution per year | 55,581 | 81,728 | 100,886 | 115,677 | 125,921 | 128,273 |
| Probability an engaged institution converts | 3.9% | 6.2% | 8.0% | 9.3% | 10.3% | 10.5% |
| Institutions engageable by year 3 | 208 | 280 | 334 | 375 | 403 | 410 |
| Year-2 renewal rate | 47.9% | 57.7% | 65.0% | 70.6% | 74.4% | 75.4% |
| Sales cycle length | 425.6% | 585.7% | 704.7% | 796.8% | 860.2% | 874.5% |
| Probability on-premise is demanded | 30.8% | 43.9% | 53.8% | 61.3% | 66.5% | 67.7% |
| Paying logos at year 3 | 11 | 19 | 25 | 31 | 38 | 43 |
| Blended ARR at month 24 | 813,073 | 1,418,495 | 1,993,789 | 2,645,416 | 3,553,855 | 4,913,264 |
| Blended ARR at year 3 | 951,757 | 1,658,056 | 2,325,704 | 3,084,943 | 4,134,255 | 5,431,685 |
| Year-1 ARR per logo including renewal | 90,249 | 133,122 | 164,119 | 188,553 | 210,548 | 224,753 |

---

## What the simulation changed

| | Before | After |
|---|---|---|
| P(₹1 crore ARR by year 3) | 18–34% *(hand-written)* | **0.0%** *(simulated)* |
| Blended ARR month 24 | Rs 12–40 lakh *(range)* | **₹14.2–26.5 lakh** *(P25–P75)* |
| Year-3 paying logos | — | **19–31 institutions** |

The hand-written estimate was a range produced by feel. The simulation produced a distribution from stated priors, and **falsified it.** That is the entire reason this module exists.
