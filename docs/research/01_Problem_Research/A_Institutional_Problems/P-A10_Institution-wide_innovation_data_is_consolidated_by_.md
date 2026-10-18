# P-A10 - Institution-wide innovation data is consolidated by hand from departmental silos

**Evidence grade:** `DOCUMENTED` - Multiple primary documents read and cited by corpus_id.

**Severity:** `HIGH` - Recurring, substantial time loss or error rate.

**Corpus documents cited:** `IIC-031`, `IIC-013`, `IIC-005`, `IIC-001`, `IIC-023`

> **Not an observed user problem.** Phase 3 user interviews have not been conducted. This is documentary analysis of what institutions publish about themselves. Do not present it to a third party as an observed user problem.

---

## Statement

Innovation data originates in departments, cells, a TTO, an incubator and a research office. It reaches the IIC form only through manual aggregation by one person, and the same vocabulary is reused by institutions with completely different underlying structures.

## Evidence

- Teresa's College's grant list is organised BY DEPARTMENT - 'department of physics', 'department of home science' (three separate awards), 'department of mathematics and statistics', 'department of Botany' (two awards). The grant field is effectively a manual roll-up of departmental records. (`IIC-031`)
- St Paul's College submitted a 10-line budget-vs-actual table spanning infrastructure, library, lab equipment, consumables, salaries, maintenance, R&D, training and miscellaneous - an institution-level finance roll-up presented as the innovation expenditure answer. (`IIC-013`)
- Manav Rachna University published a 12-member Innovation Cell list spanning Fluid Mechanics, Peace and Sustainability, Production Development and Law, plus a separate IPR Cell with a named in-charge - i.e. the reporting population is a union of unrelated units. (`IIC-005`)
- NIT Calicut's IIC is constituted from multiple departments plus external industry experts, and its patent table mixes faculty and student inventions with no unit field. (`IIC-001`)
- 13 distinct institution types across 36 documents file the same schema, from NITs to a management college with 2 activities and INR 50,000 spend (`IIC-023`).

### What is still missing

Strong on the structure of the problem, silent on the tooling. We have not observed a single institution's internal system - we only see its export. Whether consolidation is done in Excel, Tally, an ERP or by hand is UNKNOWN from documents and is a primary Phase 3 interview question. This is the gap that most directly threatens todo.md Section B's 'Excel dependency' claims, which remain unevidenced.

## Who experiences it

Whoever consolidates - typically the IIC coordinator, drawing from departmental coordinators who have no obligation to report.

## Severity - HIGH

It is the upstream cause of P-A02, P-A08 and P-A09, and it is the reason no institution's numbers agree with its own.

## Frequency

Continuous, with a hard deadline at year end.

## Current workaround

Manual aggregation across departments. Internal tooling is unknown - the Excel dependency that todo.md Section B assumes is NOT yet evidenced and must not be asserted.

## Quantified cost

Not measured. This is the highest-value unknown in Section A: without it, the operational problem set in Section B has no quantified foundation.

## Failure consequence

Departmental records and the institutional submission diverge, and the institution cannot tell which is correct because neither was designed to be the record of truth.

## Potential fixer

A departmental-level intake with institutional roll-up derived automatically, with the government forms as an export.

## Competitive implication

This is the strongest version of the Phase 0 thesis and it is now independently corroborated by documents. Mandated systems are compliance ledgers, not systems of record (D-004). Phase 0 proved this from the government side by finding the IIC portal can register an 'IPR/TTO Centre' but has no field for a single patent. Phase 1 proves it from the institution side: the same 36 documents cannot agree with themselves.

## Source documents

| Corpus ID | Institution | Type | State | Year |
|---|---|---|---|---|
| `IIC-031` | Teresa's College | Arts and science college (non-technical) | Kerala | 2023-24 |
| `IIC-013` | St Paul's College of Pharmacy | Pharmacy college | Kerala | 2023-24 |
| `IIC-005` | Manav Rachna University | Private deemed university | Haryana | 2023-24 |
| `IIC-001` | NIT Calicut | NIT (central) | Kerala | 2024-25 |
| `IIC-023` | SIES CoMS | Management college (non-technical) | Maharashtra | 2024-25 |

Full records: `_exports/phase1/csv/iic_reports_wide.csv`. Derived findings: `_exports/phase1/md/iic_corpus_analysis.md`.
