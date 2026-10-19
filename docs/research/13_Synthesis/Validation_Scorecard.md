# Customer Validation Scorecard

**Phase 30 — built 2026-10-19 by `build/build_phase45.py`.**

---

## Why this looks different from the plan

> `todo.md` PHASE 30 specifies a scorecard with cells like *"8/10 interviews"*. **Interviews conducted: 0.**

So the scorecard is rebuilt around what actually exists. Every row carries either **documentary evidence** or an explicit **`INTERVIEW REQUIRED`** marker. No row may show a tick it has not earned, and the build fails if one does.

---

## The scorecard

| Hypothesis | Evidence | Grade | Status |
|---|---|---|---|
| Institutions hold fragmented startup data | 36-doc corpus, 6 self-reported contradictions, 10 problem analyses | `DOCUMENTED` | **SUPPORTED** |
| The NIRF/ARIIA join is broken in practice | 11 forms, 32/354 startups lose identity (9.0%), worst 67% | `DOCUMENTED` | **SUPPORTED** |
| Institutions want centralised tracking | — | `HYPOTHESIS` | **INTERVIEW REQUIRED** |
| They will pay Rs 1.2 lakh | — | `HYPOTHESIS` | **INTERVIEW REQUIRED** |
| IPR tracking is a major pain | P-A07 CRITICAL: no deadline calendar in any of 36 institutions; 91,168 national filings... | `DOCUMENTED` | **SUPPORTED (institutional)** |
| Reporting consumes significant time | P-A08 hand-assembled reports; ARIIA deadline cycles; 0 (On Progress) sentinels | `SINGLE-SOURCE` | **PARTIAL** |
| Excel/Sheets/WhatsApp are the free incumbent | — | `HYPOTHESIS` | **INTERVIEW REQUIRED** |
| The Convener is or can reach the buyer | Phase 2: only 4/25 roles hold documented budget authority, none Class A | `DOCUMENTED` | **CONTRADICTED ON PAPER** |
| Deadlines are the forcing event | Teresa's 13-item narrative in a numeric field; ARIIA 0 (On Progress) sentinels | `SINGLE-SOURCE` | **PARTIAL** |
| Institutions manage cohorts | — | `HYPOTHESIS` | **INTERVIEW REQUIRED** |

---

## Tally

- **2 SUPPORTED** on documentary evidence
- **2 PARTIAL** — mechanism visible, magnitude unmeasured
- **1 CONTRADICTED ON PAPER** — the paperwork disagrees with the pitch
- **4 INTERVIEW REQUIRED** — no evidence of any kind

### The four that need interviews most

| Hypothesis | Why it is the priority |
|---|---|
| Institutions want centralised tracking | No demand evidence exists. Blocked on Phase 3B. |
| They will pay Rs 1.2 lakh | OQ-03 open since Phase 0. Zero primary evidence. |
| Excel/Sheets/WhatsApp are the free incumbent | The pricing model rests on this. Highest-risk unverified claim. |
| Institutions manage cohorts | Either drop cohorts or prove them. H-08. |

---

## The honest read

**Two of ten hypotheses are supported by documentary evidence. Four have no evidence at all.** That is not a failure of the research — it is the shape of it. Three phases of documentary work have done what documentary work can: proved the reporting defect is real, measured, and visible in published data.

**What remains is not more research. It is twelve conversations.**

The two findings that most change the roadmap:

1. **The join defect is documented and quantified** (32/354 startups, 9.0%, worst case 67%). StartupHub's core wedge is not an opinion any more.
2. **Every rupee figure in this repository traces to a competitor's public price, never to a customer's budget.** `OQ-03` is the single highest-value unanswered question in the project.

Full cell detail: `_exports/phase45/validation_scorecard.csv`.
