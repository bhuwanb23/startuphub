# The Government Forms Institutions Actually Fill In

**Phase 3 Workstream A - 11 published forms - built 2026-10-19 by `build/build_phase3.py`.**

> **This is documentary evidence, not interview evidence.** Every claim below is traced to a published PDF that the institution itself submitted under its own name. Willingness to pay, felt pain and real budget ownership remain **unverified** and cannot be settled by any document.

---

## Why these two forms

| Form | What it asks for | Who fills it |
|---|---|---|
| **NIRF Innovation** | Startups recognised by DPIIT, VC investment, per-innovation TRL, incubation, IIC | IIC / nodal officer |
| **ARIIA** | 7 sections: I&E teaching, IIC, IPR cell, TRL 4-9 innovations, ventures started/supported, IIC star bands | Institution + nodal officer |

These are the government demand-side ledger. If an institution's innovation reporting has a defect, it will be visible here - and in this set it is.

## Corpus

- **7 NIRF** and **4 ARIIA** forms, 407 pages, all parse_status `parsed`.
- Mix spans IIT, IISc, NIT, central university, private college and a small institution, across 2020-2026.
- Extraction: pypdf 6.

---

## Finding 1 - the DPIIT join key breaks (the headline)

The NIRF form asks for two things about the same startups:

1. which startups are **Recognized by DPIIT**;
2. a per-innovation **TRL** table.

The only key joining them is the **DPIIT registration number**. That number is granted by the DPIIT to the **founder**, not held by the institution. So the join key is an identifier the person filling the form often does not have.

| Institution | Year | Recognised | Keyed in TRL | Lost | Rate |
|---|---|---:|---:|---:|---:|
| NIT Andhra Pradesh | 2026 | 6 | 2 | 4 | 66.7% |
| IIT Delhi | 2025 | 38 | 30 | 8 | 21.1% |
| IIT Bombay | 2026 | 170 | 154 | 16 | 9.4% |
| Indian Institute of Science | 2026 | 122 | 118 | 4 | 3.3% |
| NIT Warangal | 2025 | 7 | 8 | 0 | 0.0% |
| Jawaharlal Nehru University | 2026 | 8 | 8 | 0 | 0.0% |
| Panimalar Engineering College | 2025 | 3 | 3 | 0 | 0.0% |
| **Total** | | **354** | | **32** | **9.0%** |

Worst case is **NIT Andhra Pradesh**, which recognises 6 startups but can evidence a TRL for only 2.

One form (NIT Warangal 2025) shows the **reverse gap**: the TRL table carries a DPIIT number for an innovation whose startup is missing from the recognised table. Two tables, one submission, disagreeing.

**Why this is the most product-relevant fact in the corpus.** The state already knows which startups an institution has, and already asks for TRL. What is missing is the join. An institution can lose track of its own portfolio while appearing fully compliant on paper - and nothing in the form lets anyone detect it.

---

## Finding 2 - blank, 0 and "0 (On Progress)" all mean different things

ARIIA Section 1.2 prints the IIC star ladder per academic year. Read it:

| Institution | 2018-19 | 2019-20 | 2020-21 | 2021-22 |
|---|---|---|---|---|
| IIT Kanpur | 1 | (blank) | 0 | 0 (On Progress) |
| IIT (ISM) Dhanbad | 1,2,3,4 | 5 | 4 | 0 (On Progress) |
| Aditya College of Engineering & Technology | 1,2 | 3.5 | 4 | 0 (On Progress) |

Three problems in one table:

- **IIT Kanpur records 0 stars for 2020-21** while running one of India's most mature technology business incubators. The recorded value contradicts the institution's own published capability, so the 0 is a **non-report**, not a measurement.
- **A blank and a 0 sit in the same column** of the same table (IIT Kanpur, consecutive years) with no legend distinguishing them.
- **`1,2,3,4` sits in one scalar cell** (IIT (ISM) 2018-19) - four values in a field that expects one.

The sentinel register holds **10 entries** across five kinds of meaningless number: blank that a sibling column encoded as `0`, multi-value in a scalar cell, non-report (`0` where nothing was reported), placeholder join key (`DIPP0000`), ranking cycle still open (`0 (On Progress)`). Any ranking built on these forms will read non-report as underperformance.

This is Phase 1's "0 is not a measurement" problem, now observed inside the primary government instrument itself.

---

## Finding 3 - ARIIA defers the TRL record to YUKTI-NIR

> are Recorded in the YUKTI National Innovation Repository of the IIC

ARIIA Section 4 asks how many innovations are *Verified and Recommended* - and the record lives in the **YUKTI National Innovation Repository**, a central IIC system, not with the institution.

The institution is a **pointer, not a system of record**. It submits a count it cannot independently verify. This is the cleanest available statement of the gap: the state has already built a central innovation repository, and the institution still cannot tell you what its own portfolio is doing this year.

---

## Finding 4 - ARIIA asks whether an IPR cell exists, not whether a patent moved

> Existence of IPR Cell / Patent Facilitation Unit / Technology Transfer

Section 3.3 is a single capability checkbox. No patent number, no filing date, no stage, no owner.

So at national level the instrument stops at *does a cell exist*. This is the documentary proof of the Phase 0 claim that **no direct competitor provides a complete IPR lifecycle** - and neither does the government's own ranking form.

---

## Finding 5 - "supported" has no amount, no date, no scope

> Start-ups/Ventures Established and Supported at HEI and Recognitions Received

An institution records that it started and supported a venture, plus recognitions received. It cannot answer *what did that cost, and when*. Institutional memory of its own support commitments is not recoverable from the record.

---

## Finding 6 - the one money signal points backwards

> Institute Own/Internal  |  Number of External Sponsorship/External

ARIIA forces an **expenditure** split between own money and external sponsorship (LBRCE 2020: 8 internal rows against 7 external). It is retrospective - the government learns what was already spent, never what is needed next.

This directly bounds the Phase 0 conclusion: there is **no documented budget-holder signal** for innovation software, and the single government money signal that exists points backwards in time.

---

## Finding 7 - missingness tracks maturity

| Institution | Type | "No Data Found" |
|---|---|---:|
| Aditya College of Engineering & Technology | Private engineering college | 7 |
| IIT (ISM) Dhanbad | IIT (central) | 4 |
| IIT Kanpur | IIT (central) | 0 |
| LBRCE | Private engineering college | 0 |

Completeness is an **equity problem**. Small institutions leave the most fields blank, so any ranking built on form completeness systematically disadvantages them - and gives blank-heavy forms an incentive to over-report.

ARIIA also counts in **academic-year pairs** ("AY 2020-21 & 2021-22") while NIRF counts on a single cycle. Two ledgers, incompatible time grains, not reconcilable without manual work.

---

## What this changes

| Phase 0 claim | Status after Phase 3A |
|---|---|
| Government systems are compliance ledgers, not venture systems of record | **Strengthened** - F-DPIIT-JOIN and F-ARIIA-YUKTI |
| No competitor covers an end-to-end patent lifecycle | **Strengthened** - the government's own ARIIA 3.3 is a yes/no cell checkbox |
| Reported metrics are not venture metrics | **Strengthened** - F-SENTINEL-ZERO, F-ARIIA-STARS |
| No documented budget-holder signal | **Unchanged and bounded** - the only money signal is retrospective spend |

**New:** the join-key defect is not a gap StartupHub has to argue for. It is already the visible behaviour of the official forms, in published data, at IITs, NITs, IISc and a private college.

---

## Honest limits

- Nothing here is interview evidence. Willingness to pay, felt pain and actual budget ownership remain unverified.
- The corpus is 11 forms from institutions that CHOOSE to publish. IICs that do not publish are absent, so missingness within this set understates the real gap.
- Extraction is a text layer only, with no OCR. Ligature loss affects wording but not the counts used in F-DPIIT-JOIN.
- Join-key counts are distinct DPIIT numbers per table. A single startup with several innovations can appear more than once in the TRL table, so dpiit_in_trl is a key count, not a startup count.
- Only one ARIIA form (LBRCE 2020) exposes the fund-split rows in a readable layout; the 2022 forms use a newer template whose column labels the text layer does not preserve.
- Years are not comparable across the two forms (see F-ARIYA-AY), so no cross-form total is computed anywhere in this module.

---

## What interviews must now test

Documents cannot answer these. Phase 3 Workstream B exists to falsify them.

| # | Question this corpus cannot answer |
|---|---|
| 1 | Does the nodal officer actually **hold** founders' DPIIT numbers, or re-derive them? Where from? |
| 2 | What do institutions use **between** NIRF and ARIIA cycles - Excel, Sheets, WhatsApp, an ERP, nothing? |
| 3 | When a startup's DPIIT number is unknown, what does the officer actually type into the TRL table? |
| 4 | Does anyone ever reconcile the NIRF and ARIIA numbers, or are they two unrelated submissions? |
| 5 | Who inside the institution would be accountable for fixing the join - and is that the buyer? |
| 6 | Would anyone pay to make one portfolio answerable across both forms, or is the NIRF deadline the only forcing event? |

---

Machine-readable: `_exports/phase3/`. Sources `P3-001`-`P3-011` in `00_Research_Index/Source_Registry.csv`. Reproduce with `python build/build_phase3.py`; re-extract with `python build/_fetch_forms.py`.
