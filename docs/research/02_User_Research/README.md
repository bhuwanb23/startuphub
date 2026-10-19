# Phase 3B — The Interview Programme

**Built 2026-10-19 by `build/build_phase3b.py`. Interviews conducted: 0.**

> **Everything in this folder is an instrument, not a result.** There are guides to ask, targets to call and hypotheses to kill. No respondent has been spoken to. No claim here may be cited externally as user evidence until a real interview supports it.

---

## Why this exists

Phase 1 (36 institutional reports) and Phase 2 (8 procurement instruments) are **documentary**. Phase 3A (11 NIRF/ARIIA forms) is also documentary. All three are strong on what institutions *published*, and silent on what people *do*.

The things that decide whether StartupHub is a product or a guess all live in the gap: who holds the budget, whether a venture register exists at all, what the nodal officer types when a DPIIT number is missing, whether anyone reconciles NIRF against ARIIA.

**6 institutions × 2 paired roles = 12 interviews.**

| | |
|---|---|
| Interviews | 12 (6 institutions, 2 roles each) |
| Length | 30–40 min each |
| Method | Semi-structured, past-behaviour anchored |
| Hypotheses to test | 10 (see `Falsification_Matrix.md`) |
| Reporting bar | 3 of 6 institutions minimum, count always shown |

---

## The pairing is the method

Each institution gets two interviews with **different roles** so the two accounts of one portfolio can be compared directly:

- **The operational view** — the Convener / ARIIA-NIRF nodal officer, who does the work.
- **The authority view** — the Registrar / Dean (ICSR), who can authorise or refuse.

Compared on four questions:

1. How many startups does the institute have? Do the two numbers match?
2. Who owns the startup data?
3. What was the last thing the institute paid for in this space?
4. Who could actually approve a purchase here?

A divergence between the operational and authority views is itself the finding. It tells us whether the person with the pain can reach the person with the money — which is the entire go-to-market question.

---

## The one rule that matters

`todo.md` is right that *"Would you use StartupHub?"* produces weak validation. The fix is not softer questions. **It is anchoring every question to a recent real event.**

> ❌ Don't ask: *"Would you pay ₹1.2 lakh?"*
> ✅ Ask: *"You asked for ₹1.2 lakh for something. Where did that number come from? Did you compare it to something you already spend?"*

Every question in every guide carries:

| Field | Purpose |
|---|---|
| `question` | The ask, anchored to a past event |
| `probe` | The follow-up that turns an answer into evidence |
| `hook` | The prior finding it tests (`P-A10`, `OQ-32`, `F-DPIIT-JOIN`…) |
| `falsifies` | The claim that dies if the answer goes this way |

A question with no `hook` is a question we cannot act on. The build rejects it.

---

## Files

| File | What it is |
|---|---|
| `Interview_Protocol.md` | How to run one interview, end to end |
| `Consent_And_Ethics.md` | Consent block, recording rules, what we never publish |
| `Guides/` | 4 role-class guides, 21 questions, each with probe + hook + falsifier |
| `Falsification_Matrix.md` | 10 hypotheses and the observation that would kill each |
| `Recruitment_Shortlist.md` | 6 institutions, ranked by *contradiction*, not prestige |
| `Coding_Scheme.md` | 10 codes, evidence bars, and the 3-of-6 reporting rule |
| `Capture_Template.md` | The note sheet — fill one per interview |

Machine-readable: `_exports/phase3b/`.

---

## What Workstream A changed

Phase 3A found the NIRF form's only join is the founder's DPIIT number, and that **32 of 354** recognised startups lose identity at it. That turns three of the guides' best questions:

- *"Where did the DPIIT number come from?"* (`OQ-32`)
- *"What did you type when you couldn't find it?"* (`OQ-33`)
- *"When ARIIA asks again, do you reuse the same list?"* (`OQ-34`)

Without Phase 3A these would have been generic workflow questions. With it they are specific, and the answers are decision-changing.

---

## Blocked

**This phase cannot progress past instrumentation without people.** The remaining work is: recruit 6 institutions, run 12 interviews, code them, and report only what survives the 3-of-6 bar.

Ollama is available for **instrument validation only** — checking that the guides are answerable and non-leading before a human wastes time on them. Synthetic output is permanently quarantined: `SYNTHETIC — NOT EVIDENCE`, excluded from the manifest, never counted, never quoted.
