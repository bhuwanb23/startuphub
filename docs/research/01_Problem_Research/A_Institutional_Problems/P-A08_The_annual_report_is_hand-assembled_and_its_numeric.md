# P-A08 - The annual report is hand-assembled, and its numeric fields fail in predictable ways

**Evidence grade:** `DOCUMENTED` - Multiple primary documents read and cited by corpus_id.

**Severity:** `HIGH` - Recurring, substantial time loss or error rate.

**Corpus documents cited:** `IIC-031`, `IIC-035`, `IIC-024`, `IIC-022`, `IIC-012`, `IIC-029`

> **Not an observed user problem.** Phase 3 user interviews have not been conducted. This is documentary analysis of what institutions publish about themselves. Do not present it to a third party as an observed user problem.

---

## Statement

The IIC annual report is produced by a part-time academic re-keying activity data into a mandated form. The report format has no way to express a real-world value, so coordinators write prose into number fields.

## Evidence

- Teresa's College put a 13-item bulleted narrative - spanning DST, Cochin Shipyard CSR, KSUM x3, AICTE YUKTI, ICSSR, NCERT, SERB, UNDP Green Innovation Fund, Nidhi Prayas, Federal Bank CSR and a YIP prize, plus a student 'currently working through the procedure to see if the concept can be patented' - into the field 'Amount grant or fund supported to student & Faculty lead Innovations, start-ups and IPR'. The adjacent awareness-spend field in the same report was entered cleanly as INR 3,42,624, which proves the failure is specific to grant data, not to data entry generally. (`IIC-031`)
- Marathwada Mitra Mandal's College submitted both money fields as lower bounds: 'RS. 3 L+' and 'RS. 7 L+'. (`IIC-035`)
- SSCET wrote 'In-progress' in the awareness and grant fields, and 'Nil' for startups, on a report filed after the year closed. (`IIC-024`)
- IPS Academy filed a PROPOSAL in the awareness field ('Amount proposed to be spent ... 8 Lakhs') where the grant field carried INR 20,000 actually supported - a 40x intent-versus-reality gap inside one report. (`IIC-022`)
- Scottish Church College carried sponsor identity and purpose inside money fields: 'Rs. 30,000 sponsored by Microbiologists Society India for supporting an awareness seminar'. (`IIC-012`)
- MIET Jammu's digits and amount-in-words disagree by INR 90,000 in one field. (`IIC-029`)

### What is still missing

Strong on the pattern, silent on the cause. We observe that fields fail; we have not observed a coordinator explaining why, and we do not know whether the IIC portal would accept a richer data structure if offered.

## Who experiences it

Whoever compiles the report - consistently a single named academic (named compiler at Scottish Church, St Paul's and SSCET), not an administrator or a system.

## Severity - HIGH

This is the mechanism that generates P-A02's contradictions and P-A09's misfiled money. It is upstream of the others.

## Frequency

Annual, concentrated into the submission window.

## Current workaround

Hand-writing prose into numeric fields, writing lower bounds when the exact figure is unknown, and entering proposals where actuals belong.

## Quantified cost

Not measured directly. The Teresa's College case shows a single field carrying at least 13 distinct funding events across 6 funding bodies - work that is entirely invisible to the government system it is reported to.

## Failure consequence

The institution's own record of its innovation activity is not machine-readable, not comparable, and not auditable - by the institution or anyone else.

## Potential fixer

Make the government submission a derived output of records captured during the year, so the report assembles itself. Include a first-class 'unknown / not applicable / pending' value so nobody has to write prose to escape a numeric field.

## Competitive implication

This reframes the product. The competitor set sells dashboards and intake. The unclaimed job is 'make the mandated report assemble itself'. No competitor in the Phase 0 survey does derivation; they all ask the user to fill in another system.

## Verbatim evidence quoted

**Q-P1-002** - Teresa's College (2023-24), `IIC-031`

> She is currently working through the procedure to see if the concept can be patented.

<https://teresas.ac.in/wp-content/uploads/2025/03/IIC-Annual-Report-23-24.pdf> - accessed 2026-10-18, tier T1. Extracted from a PDF text layer: **re-verify visually before external use.**

**Q-P1-003** - Model Institute of Engineering and Technology (2023-24), `IIC-029`

> Amount spent on promotion and awareness generation on Innovation Entrepreneurship in the campus: Rs 4,10,000 ( Three Lakh Twenty Thousands only )

<https://mietjmu.in/IIC/IIC%20Annual%20Report%202023-24%20Version%202.pdf> - accessed 2026-10-18, tier T1. Extracted from a PDF text layer: **re-verify visually before external use.**

**Q-P1-008** - IPS Academy, Institute of Engineering and Science (2024-25), `IIC-022`

> Amount proposed to be spent on promotion and awareness generation on Innovation Entrepreneurship, infrastructure in the campus 8 Lakhs

<https://ies.ipsacademy.org/wp-content/uploads/2025/10/2024-25%20IIC%20Report.pdf> - accessed 2026-10-18, tier T1. Extracted from a PDF text layer: **re-verify visually before external use.**

**Q-P1-011** - Institute of Science, Nagpur (2024-25), `IIC-011`

> Amount grant or fund supported to student & Faculty lead Innovations, start-ups and IPR: 00

<https://iscnagpur.ac.in/pdf/Annual%20Report%202024-25.pdf> - accessed 2026-10-18, tier T1. Extracted from a PDF text layer: **re-verify visually before external use.**

## Source documents

| Corpus ID | Institution | Type | State | Year |
|---|---|---|---|---|
| `IIC-031` | Teresa's College | Arts and science college (non-technical) | Kerala | 2023-24 |
| `IIC-035` | MMCOP Pune | Pharmacy college | Maharashtra | 2023-24 |
| `IIC-024` | SSCET | Engineering college | Telangana | 2024-25 |
| `IIC-022` | IPS Academy Indore | Autonomous engineering college | Madhya Pradesh | 2024-25 |
| `IIC-012` | Scottish Church Kolkata | Undergraduate college | West Bengal | 2024-25 |
| `IIC-029` | MIET Jammu | Autonomous engineering college | Jammu and Kashmir | 2023-24 |

Full records: `_exports/phase1/csv/iic_reports_wide.csv`. Derived findings: `_exports/phase1/md/iic_corpus_analysis.md`.
