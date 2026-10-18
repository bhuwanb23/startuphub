# P-A02 - The mandated IIC activity form is internally inconsistent and cannot be trusted

**Evidence grade:** `DOCUMENTED` - Multiple primary documents read and cited by corpus_id.

**Severity:** `HIGH` - Recurring, substantial time loss or error rate.

**Corpus documents cited:** `IIC-001`, `IIC-001b`, `IIC-011`, `IIC-029`, `IIC-028`, `IIC-024`

> **Not an observed user problem.** Phase 3 user interviews have not been conducted. This is documentary analysis of what institutions publish about themselves. Do not present it to a third party as an observed user problem.

---

## Statement

The IIC reporting schema produces documents whose narrative and KPI form disagree with each other, by up to 10.6x on a money field. Institutions cannot treat their own submission as a reliable record of what they did.

## Evidence

- Six same-document contradictions across 36 documents. NIT Calicut: 55 vs 17 startups, INR 1,51,488 vs INR 16,00,000 awareness spend, INR 2,28,212 vs INR 50,00,000 grant. (`IIC-001`, `IIC-001b`)
- Institute of Science Nagpur itemises 16 activities in its narrative and enters 02 in its KPI form - an 8x gap inside one report. (`IIC-011`)
- MIET Jammu writes 'Rs 4,10,000' in digits and 'Three Lakh Twenty Thousands only' in words in the same field. The adjacent grant field has no such mismatch, so no house convention explains it. (`IIC-029`)
- The mandated activity taxonomy is a closed five-value vocabulary ('Innovation & Design Thinking', 'Pre incubation & Incubation management', 'Entrepreneurship & startup', 'IPR & Technology transfer', 'Celebration Activity') applied to every activity, so a TRL workshop is filed as design thinking. (`IIC-028`)

### What is still missing

Whether the IIC portal validates submissions at all is unknown. If it validates nothing, the contradictions are a documentation problem; if ARIIA reads the portal, they are a ranking problem. Logged as OQ-20.

## Who experiences it

IIC coordinator and IIC President - typically a single part-time academic, evidenced by SSCET fielding 40 IIC members and 30 innovation ambassadors for 2 mentors (`IIC-024`), and NIT Calicut pairing 29 faculty mentors against 155 ideas (`IIC-001`).

## Severity - HIGH

Drives every downstream number an institution is assessed on. Not CRITICAL because no evidence here of legal consequence.

## Frequency

Continuous during the activity year; acute in the 2-4 weeks before submission.

## Current workaround

Writing the narrative and the KPI table separately and never comparing them. There is no mechanism in the form that would surface the difference.

## Quantified cost

Not measured. Proxy: the misstatement is not small. At NIT Andhra Pradesh, INR 2,292,000 of awareness spend per idea generated, against INR 977 at NIT Calicut - a 2,346x difference between two institutions in the same national programme.

## Failure consequence

Institutional rankings rest on numbers the institution itself does not believe. A correction discovered during verification costs credibility that a whole academic year's activity cannot rebuild.

## Potential fixer

A reconciliation layer, not another form: one activity register that derives the narrative, the KPI table and the ARIIA/NIRF submissions from a single set of records, so the three cannot disagree.

## Competitive implication

This is the strongest evidenced problem in Phase 1. A product that makes the government submission derivable - rather than asking the coordinator to re-key - is not competing on features. It is removing a task the user currently does by hand.

## Verbatim evidence quoted

**Q-P1-001** - National Institute of Technology Calicut (2024-25), `IIC-001b`

> Amount spent on promotion and awareness generation on Innovation Entrepreneurship in the campus: Rs 16,00,000/- (Rupees Sixteen Lakhs)

<https://nitc.ac.in/imgserver/uploads/attachments/Ed__44cab2fb-596f-4726-9b77-8122bc273b37_.pdf> - accessed 2026-10-18, tier T1. Extracted from a PDF text layer: **re-verify visually before external use.**

**Q-P1-012** - Institute of Science, Nagpur (2024-25), `IIC-011`

> Number and Different types of I&E and IPR activities Conducted: 02

<https://iscnagpur.ac.in/pdf/Annual%20Report%202024-25.pdf> - accessed 2026-10-18, tier T1. Extracted from a PDF text layer: **re-verify visually before external use.**

**Q-P1-009** - National Institute of Technology Calicut (2024-25), `IIC-001`

> Under IIC 7.0, in the year 2024-25, the Institution's Innovation Council (IIC) at NIT Calicut successfully organized a total of 67 activities including 32 activities as part of its IIC calendar.

<https://nitc.ac.in/imgserver/uploads/attachments/Ed__44cab2fb-596f-4726-9b77-8122bc273b37_.pdf> - accessed 2026-10-18, tier T1. Extracted from a PDF text layer: **re-verify visually before external use.**

## Source documents

| Corpus ID | Institution | Type | State | Year |
|---|---|---|---|---|
| `IIC-001` | NIT Calicut | NIT (central) | Kerala | 2024-25 |
| `IIC-001b` | NIT Calicut | NIT (central) | Kerala | 2024-25 |
| `IIC-011` | Institute of Science Nagpur | Autonomous science college | Maharashtra | 2024-25 |
| `IIC-029` | MIET Jammu | Autonomous engineering college | Jammu and Kashmir | 2023-24 |
| `IIC-028` | Rathinam College of Pharmacy | Pharmacy college | Tamil Nadu | 2024-25 |
| `IIC-024` | SSCET | Engineering college | Telangana | 2024-25 |

Full records: `_exports/phase1/csv/iic_reports_wide.csv`. Derived findings: [`../../F_Synthesis/IIC_Corpus_Analysis.md`](../../F_Synthesis/IIC_Corpus_Analysis.md).
