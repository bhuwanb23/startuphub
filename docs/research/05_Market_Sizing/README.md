# TAM / SAM / SOM

**Phase 7 — built 2026-10-19 by `build/build_phase45.py`.**

---

## Read this before the numbers

> ### Every figure below is a **RANGE**, and the range is wide on purpose.
>
> The addressable population is knowable from public sources. **The revenue per institution is not**, because willingness to pay has **zero primary evidence** — `OQ-03` has been open since Phase 0 and is still open.
>
> So the honest market is a band whose width is dominated by one unmeasured variable. **That is not a weakness of the analysis. It is the finding**, and it is the most important number to show an investor.

---

## TAM — Total Addressable

**Definition.** Institutions holding an IIC / AIC / EIC - a legally mandated innovation reporting function

| Input | Low | High |
|---|---:|---:|
| Institutions | 14,067 | 16,367 |
| Annual contract value | ₹75,000 | ₹120,000 |
| **TAM** | **₹105.5 cr** | **₹196.4 cr** |

- **Method:** institutions x annual contract value, low x low to high x high
- **Confidence:** LOW - width driven entirely by A-04, which has no customer evidence
- **Evidence grade:** T1 population, HYPOTHESIS price

> The institution range is the honest width: **three official IIC counts disagree by 16.4%** and none states a counting rule (Conflict C-01).

---

## SAM — Serviceable Addressable

**Definition.** Institutions with OBSERVABLE annual innovation filing behaviour

| Layer | Institutions | Basis |
|---|---:|---|
| Floor | 777 | 777 filed the NIRF Innovation category in 2025 - hard floor, T1 |
| Ceiling | 7,692 | 7692 unique NIRF applicants in 2025. Used ONLY as a mathematical ceiling, NOT as an estimate: most of these file Overall, not Innovation, and would not buy. The true value sits far below both. |

| | Low | High |
|---|---:|---:|
| **SAM** | **₹5.83 cr** | **₹92.30 cr** |

> **This band is 16× wide on purpose.** It is bounded by two populations that are not the same thing: the floor is a real purchase signal, the ceiling is a ranking applicant. Presenting a midpoint would be false precision over a 16× range.

---

## SOM — Serviceable Obtainable

**Definition.** Institutions obtainable with a founder-led motion, founder+1, founder+small team

| Year | Institutions | Revenue (low) | Revenue (high) |
|---|---:|---:|---:|
| Year 1 | 3–6 | ₹225,000 | ₹720,000 |
| Year 2 | 8–15 | ₹600,000 | ₹1,800,000 |
| Year 3 | 15–25 | ₹1,125,000 | ₹3,000,000 |

> **We rejected the plan's own numbers.** todo.md PHASE 7 proposed 5 / 15 / 40-50 institutions. The year-3 figure implies a sales team that does not exist and a conversion rate nobody has measured. We reject it and model capacity instead.

---

## The assumption ledger

Every input, its source, its grade, and whether it dominates the error.

| ID | Input | Value | Grade | Dominates? |
|---|---|---|---|---|
| `A-01` | Institutions with an innovation reporting function | 14,067 - 16,367 | `T1_DOCUMENTED` | no |
| `A-02` | Institutions demonstrably filing innovation returns | 777 (NIRF Innovation, 2025) | `T1_DOCUMENTED` | no |
| `A-03` | ARIIA filers (non-overlapping with NIRF) | not_reported | `HYPOTHESIS` | no |
| `A-04` | Annual contract value per institution | Rs 75,000 - Rs 1,20,000 | `SINGLE_SOURCE + HYPOTHESIS` | **YES** |
| `A-05` | Share of SAM that would ever buy | 5% - 20% | `HYPOTHESIS` | **YES** |
| `A-06` | Founder-led acquisition capacity | 5 - 15 institutions in year 1 | `HYPOTHESIS` | no |
| `A-07` | Price realisation (discounting, multi-year, pilot-for-free) | 70% - 100% of list | `HYPOTHESIS` | **YES** |
| `A-08` | Churn / renewal | not_modelled | `HYPOTHESIS` | no |

### Notes on the dominant error terms

- **`A-04` Annual contract value per institution** — DOMINANT ERROR TERM. The lower bound is a competitor's price for a different scope. The upper bound is our own target with no customer behind it. OQ-03 unresolved. No interview evidence exists.
- **`A-05` Share of SAM that would ever buy** — DOMINANT ERROR TERM. Nothing in 47 institutional documents, 8 procurement instruments or 11 government forms licenses any specific conversion rate. H-01 and H-04 both threaten this.
- **`A-07` Price realisation (discounting, multi-year, pilot-for-free)** — DOMINANT ERROR TERM. Academic procurement discounts heavily, and free pilots are common. Nothing measured.

> **Measuring any ONE of the three dominant error terms collapses the range more than any further market research would.**

---

## Limitations

- TAM/SAM/SOM are RANGES. A midpoint would imply precision we do not have; do not compute one without stating the range width alongside it.
- The band width is dominated by three HYPOTHESIS inputs (A-04 price, A-05 conversion, A-07 discount). Measuring any ONE of them collapses the range more than any further market research would.
- Willingness to pay (OQ-03) has ZERO primary evidence after three phases. Every rupee figure here traces to a competitor's public price or to our own target.
- Renewal/churn is not modelled at all. LTV cannot be computed from evidence.
- The ICP's second must-be - no system of record upstream - is still HYPOTHESIS (H-01). If a mature institution already has a venture register, the ICP is wrong and S1 collapses.
- No segmentation here is validated against a customer. Segments are derived from published documents, not from interviews.

Machine-readable: `_exports/phase45/sizing.csv`, `assumptions.csv`.
