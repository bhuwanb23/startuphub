# P-A09 - Government scheme money is tracked as one lump and is frequently the wrong money

**Evidence grade:** `DOCUMENTED` - Multiple primary documents read and cited by corpus_id.

**Severity:** `HIGH` - Recurring, substantial time loss or error rate.

**Corpus documents cited:** `IIC-030`, `IIC-031`, `IIC-025`, `IIC-013`, `IIC-011`, `IIC-004`

> **Not an observed user problem.** Phase 3 user interviews have not been conducted. This is documentary analysis of what institutions publish about themselves. Do not present it to a third party as an observed user problem.

---

## Statement

Institutions manage multiple concurrent funding streams. The single mandated 'grant supported' field cannot represent them, so it absorbs whatever large government grants arrived that year - including unrelated academic funding.

## Evidence

- Dr. N.G.P. Arts and Science College reported INR 2,16,81,371 as grant support to innovations, start-ups and IPR. That figure reconciles exactly to two DBT academic grants (INR 1,25,95,438 + INR 62,30,583 = INR 2,16,81,371) for undergraduate science teaching - not innovation funding. (`IIC-030`)
- Teresa's College's grant field lists 13 separate awards from 6 funding bodies. (`IIC-031`)
- Vijaya Institute ran MSME Idea Hackathon 4.0, Idea Hackathon 5.0, YUKTI Innovation Challenge 2025, and NIPAM in one year, each with its own portal and deadline. (`IIC-025`)
- St Paul's College ran MSME Idea Hackathon 3.0 and 4.0, SIH 2024, YUKTI and KAPILA IP filing support in one year, publishing grants from MSME and WBSCST separately. (`IIC-013`)
- Only one institution in 36 documents wrote a true numeric zero in a grant field (`IIC-011`); five others wrote Nil, NA, In-progress, or a dash.

### What is still missing

We can prove the DBT absorption arithmetically for one institution. We have not checked whether any government body actually reads this field, which determines whether the misfiling has consequences. Logged as OQ-24.

## Who experiences it

R&D office; the funding coordinator; the principal's office signing off the submission; finance, reconciling after the fact.

## Severity - HIGH

Wrong-money reporting is a real integrity exposure if the field is ever audited, and it destroys the field's usefulness as a market signal regardless.

## Frequency

Continuous; spikes at each scheme's financial reporting.

## Current workaround

Maintaining the real grant portfolio separately and transcribing an aggregate into the government field.

## Quantified cost

Not measured. Observable: the reported total is off by at least INR 2.16 lakh at one institution, in the direction of overstating innovation funding. Kongu is the only institution splitting grant money three ways (innovation / startup / IPR), which suggests the split is achievable but rare - 1 of 36 documents.

## Failure consequence

Overstated innovation funding on the public record; a market analyst sizing the innovation-support market from this field would be measuring government research budgets.

## Potential fixer

A grant record per award - source, scheme, amount, date, beneficiary - with the government field derived as a filtered aggregate.

## Competitive implication

Directly supports the Phase 0 positioning decision D-007 (sell against an existing IIC or scheme grant rather than create a new budget line). This finding shows the grant data itself is unreliable, which strengthens the 'reduces re-keying' pitch.

## Verbatim evidence quoted

**Q-P1-004** - Dr. N.G.P. Arts and Science College (2023-24), `IIC-030`

> Amount grant or fund supported to student & Faculty lead Innovations, start-ups and IPR: Rs. 2,16,81,371/-

<https://www.drngpasc.ac.in/pdf/IIC/report/2023-24.pdf> - accessed 2026-10-18, tier T1. Extracted from a PDF text layer: **re-verify visually before external use.**

**Q-P1-002** - Teresa's College (2023-24), `IIC-031`

> She is currently working through the procedure to see if the concept can be patented.

<https://teresas.ac.in/wp-content/uploads/2025/03/IIC-Annual-Report-23-24.pdf> - accessed 2026-10-18, tier T1. Extracted from a PDF text layer: **re-verify visually before external use.**

## Source documents

| Corpus ID | Institution | Type | State | Year |
|---|---|---|---|---|
| `IIC-030` | Dr NGP ASC | Autonomous arts and science college | Tamil Nadu | 2023-24 |
| `IIC-031` | Teresa's College | Arts and science college (non-technical) | Kerala | 2023-24 |
| `IIC-025` | VIPS Women | Pharmacy college | Andhra Pradesh | 2024-25 |
| `IIC-013` | St Paul's College of Pharmacy | Pharmacy college | Kerala | 2023-24 |
| `IIC-011` | Institute of Science Nagpur | Autonomous science college | Maharashtra | 2024-25 |
| `IIC-004` | Kongu Engineering College | Autonomous engineering college | Tamil Nadu | 2023-24 |

Full records: `_exports/phase1/csv/iic_reports_wide.csv`. Derived findings: `_exports/phase1/md/iic_corpus_analysis.md`.
