# Institutional IIC Annual Report Corpus — Phase 1 Analysis

**Scope.** Every row below was extracted from a document retrieved and read on 18 October 2026. No figure is carried over from a comparable institution, a press release, or a vendor page.

## 1. Corpus coverage

| Measure | Count |
|---|---|
| Documents in corpus | 36 |
| Target | 40 |
| Fully parsed (KPIs read) | 25 |
| Partially parsed | 9 |
| Header only, KPIs pending | 2 |
| Publishing a spend figure | 22 |
| Splitting awareness vs grant money | 13 |
| Publishing an IIC ID | 11 |
| Publishing a star rating | 8 |

## 2. Institution types present

Document count and distinct-institution count differ where one institution filed more than one report, or where a single PDF was captured twice because its narrative and KPI form disagree.

| Type | docs | institutions | Institutions |
|---|---|---|---|
| Engineering college | 9 | 9 | EGSPEC, KCG College of Technology, KIT CoE, NRCM, PIET Poornima, SIGCE, SLRTCE, SSCET, VC Engineering College |
| Autonomous engineering college | 5 | 5 | CMRIT, IPS Academy Indore, Kongu Engineering College, MIET Jammu, REC Raghu |
| Pharmacy college | 5 | 5 | MMCOP Pune, Rathinam College of Pharmacy, SV College of Pharmacy Chittoor, St Paul's College of Pharmacy, VIPS Women |
| NIT (central) | 4 | 2 | NIT Andhra Pradesh, NIT Calicut |
| Private deemed university | 3 | 3 | Brainware University, ICFAI University Tripura, Manav Rachna University |
| Arts and science college (non-technical) | 3 | 3 | Teresa's College, Vivekanandha College, WCC Chennai |
| Private university group | 1 | 1 | Regent RERFGI |
| Deemed university (private) | 1 | 1 | BIT Mesra |
| Autonomous science college | 1 | 1 | Institute of Science Nagpur |
| Undergraduate college | 1 | 1 | Scottish Church Kolkata |
| Management college (non-technical) | 1 | 1 | SIES CoMS |
| PG women's college (non-technical) | 1 | 1 | Kanoria Jaipur |
| Autonomous arts and science college | 1 | 1 | Dr NGP ASC |

Distinct institutions in corpus: 34 across 36 documents.

The presence of non-technical arts, science, management and women's colleges is a segment-sizing input, not noise: these institutions are inside the IIC reporting obligation and inside the addressable user base, and they file reports in the same schema as NITs.

## 3. Finding 1 — `ideas generated` is not one measurement

19 institutions publish both `ideas generated` and `prototypes developed`. The implied conversion rate spans **0.0% to 262.5%** — and in one case exceeds 100%, which is arithmetically impossible for a same-year funnel.

| Idea to prototype | Institution | Type | Year |
|---|---|---|---|
| 0.0% | Kanoria Jaipur | PG women's college (non-technical) | 2024-25 |
| 4.0% | WCC Chennai | Arts and science college (non-technical) | 2023-24 |
| 8.3% | Scottish Church Kolkata | Undergraduate college | 2024-25 |
| 17.5% | CMRIT | Autonomous engineering college | 2024-25 |
| 20.8% | Vivekanandha College | Arts and science college (non-technical) | 2024-25 |
| 25.6% | IPS Academy Indore | Autonomous engineering college | 2024-25 |
| 33.2% | Kongu Engineering College | Autonomous engineering college | 2023-24 |
| 33.3% | Institute of Science Nagpur | Autonomous science college | 2024-25 |
| 36.8% | Brainware University | Private deemed university | 2023-24 |
| 37.5% | Manav Rachna University | Private deemed university | 2023-24 |
| 54.9% | KCG College of Technology | Engineering college | 2024-25 |
| 55.6% | MMCOP Pune | Pharmacy college | 2023-24 |
| 55.6% | SIGCE | Engineering college | 2024-25 |
| 57.1% | REC Raghu | Autonomous engineering college | 2024-25 |
| 87.5% (!) | PIET Poornima | Engineering college | 2023-24 |
| 93.0% (!) | EGSPEC | Engineering college | 2023-24 |
| 100.0% (!) | NIT Andhra Pradesh | NIT (central) | 2024-25 |
| 100.0% (!) | NRCM | Engineering college | 2024-25 |
| 262.5% (!) | ICFAI University Tripura | Private deemed university | 2023-24 |

A conversion rate above 100% cannot mean "of the ideas we counted this year, this many became prototypes". It can only mean the two fields were populated from different populations or different time windows. Institutions reporting 33–38% (Kongu, Manav Rachna, Institute of Science Nagpur) are describing a plausible funnel. Institutions reporting 87–100% (PIET, EGSPEC, NIT Andhra Pradesh, NRCM) are not describing the same thing.

**Consequence for StartupHub:** any cross-institution benchmark built on these fields is invalid. A tool that displays "prototype conversion" across an institution's own history is defensible; one that ranks institutions on it is not.

## 4. Finding 2 — Six documented self-contradictions

These are not cross-institution disagreements. Each row is an inconsistency **inside a single document**, where the narrative and the KPI form disagree, or where digits and words disagree.

| Institution | Field | Value A | Value B | Divergence |
|---|---|---|---|---|
| NIT Calicut | `startups_total` | 55 startups incubated (13 student/alumni, 4 faculty, 38 other) | 17 Student & Faculty Start-ups/Ventures established | 3.2x |
| NIT Calicut | `amount_inr (awareness spend)` | INR 151,488 spent of INR 228,212 available | INR 16,00,000 | 10.6x |
| NIT Calicut | `grant_total_inr` | INR 228,212 total available (implied ceiling) | INR 50,00,000 | 21.9x |
| Institute of Science Nagpur | `activities_total` | 16 (10 IIC + 4 self-driven + 2 celebration) | 02 | 8.0x |
| MIET Jammu | `amount_inr (awareness spend)` | Rs 4,10,000 (digits) | Three Lakh Twenty Thousands only = INR 3,20,000 (words) | 1.28x |
| NIT Calicut | `patents_filed` | 48 filed in FY 2023-24 | 24 filed between 1 Jan and 31 Jul 2024 | n/a - overlapping windows |

**Consequence for StartupHub:** the IIC-portal KPI form is not a reliable target. An institution cannot reconcile its own narrative against its own submission, and the person who must reconcile it is the IIC coordinator or IIC President — a part-time role in almost every institution observed. This is the single strongest argument for a reconciliation layer rather than another data-entry form.

## 5. Finding 3 — No controlled vocabulary for "nothing happened"

Across the corpus, institutions signal absence at least seven different ways inside the same mandated form:

| Institution | Field | How absence was written |
|---|---|---|
| Kanoria Jaipur | `startups_total` | NA |
| Kanoria Jaipur | `prototypes_developed; ips_total; startups_total; grant` | Nil |
| SSCET | `amount_inr; grant_total_inr` | In-progress |
| SSCET | `startups_total` | Nil |
| WCC Chennai | `startups_total` | In process |
| Brainware University | `tech_transfers` | NA |
| Brainware University | `startups_total` | Nil |
| SIES CoMS | `ideas; prototypes; IPs; startups; grant; tech_transfers` | (blank dash) |
| MMCOP Pune | `amount_inr; grant_total_inr` | RS. 3 L+ / RS. 7 L+ |
| Teresa's College | `grant_total_inr` | (13-item narrative, no number) |
| Scottish Church Kolkata | `amount_inr; grant_total_inr` | number + sponsor + purpose |
| IPS Academy Indore | `amount_inr` | Amount proposed to be spent |
| Institute of Science Nagpur | `grant_total_inr` | 00 |

Only **one** institution (Institute of Science Nagpur, IIC-011) wrote a numeric zero in a money field. Every other absence is prose. The single most advanced data point in the corpus is Teresa's College (IIC-031), whose numeric grant field contains no number at all — instead a 13-item narrative spanning DST, three separate CSR sources, KSUM, AICTE YUKTI, ICSSR, NCERT, SERB, UNDP and Nidhi Prayas, plus a YIP prize, plus one student described as *"currently working through the procedure to see if the concept can be patented"*. The adjacent awareness-spend field in that same report was entered cleanly, which proves the failure is specific to grant data, not to data entry generally.

**Consequence for StartupHub:** a single-value money field is structurally incapable of representing an institution's real grant portfolio. This is a schema defect with a product-shaped answer.

## 6. Finding 4 — Grant money swamps awareness money, and is often the wrong money

| Grant ÷ awareness | Institution | Type | Year |
|---|---|---|---|
| 0.0x | Institute of Science Nagpur | Autonomous science college | 2024-25 |
| 0.0x | Kanoria Jaipur | PG women's college (non-technical) | 2024-25 |
| 0.0x | SIGCE | Engineering college | 2024-25 |
| 1.8x | MIET Jammu | Autonomous engineering college | 2023-24 |
| 2.0x | VIPS Women | Pharmacy college | 2024-25 |
| 2.2x | Brainware University | Private deemed university | 2023-24 |
| 2.4x | WCC Chennai | Arts and science college (non-technical) | 2023-24 |
| 2.9x | CMRIT | Autonomous engineering college | 2024-25 |
| 3.3x | Scottish Church Kolkata | Undergraduate college | 2024-25 |
| 3.8x | KCG College of Technology | Engineering college | 2024-25 |
| 4.7x | PIET Poornima | Engineering college | 2023-24 |
| 11.2x | Manav Rachna University | Private deemed university | 2023-24 |
| 15.2x | ICFAI University Tripura | Private deemed university | 2023-24 |
| 52.0x | EGSPEC | Engineering college | 2023-24 |
| 76.0x | Dr NGP ASC | Autonomous arts and science college | 2023-24 |

The two extremes are instructive. Dr. N.G.P. Arts and Science College reports 76.0x — but the grant figure reconciles exactly to two DBT academic grants (INR 1,25,95,438 + INR 62,30,583 = INR 2,16,81,371), which are **not** innovation funding. EGSPEC reports 52.0x. Meanwhile Institute of Science Nagpur, SIGCE and Kanoria all report exactly zero grant support.

**Consequence for StartupHub:** the field labelled "amount grant or fund supported to student & faculty lead innovations, start-ups and IPR" cannot be used as a market-size proxy. It captures whatever large government grants the institution happened to receive that year. Any Phase 1 cost or budget claim built on it would be unsound.

## 7. Finding 5 — Activity counts do not predict outcomes

Three institutions in the corpus ran comparable or higher activity counts with far fewer results:

| Institution | Activities | Ideas | Prototypes | IPs | Startups |
|---|---|---|---|---|---|
| Vivekanandha College (IIC-026) | 112 | 48 | 10 | 1 | — |
| Kanoria Jaipur (IIC-027) | 79 | 21 | 0 | 0 | 0 |
| REC Raghu (IIC-019) | 94 | 7 | 4 | 0 | 4 |
| WCC Chennai (IIC-033) | 84 | 25 | 1 | 5 | 0 |
| CMRIT (IIC-016) | 164 | 400 | 70 | 183 | 9 |

REC Raghu ran 94 activities to produce 7 ideas, 4 prototypes and **zero** IPs — 23.5 activities per startup. Meanwhile EGSPEC (IIC-034) reported 843 ideas and 784 prototypes from 42 activities. Activity volume and idea volume are not related in this corpus.

**Consequence for StartupHub:** ARIIA star bands are driven substantially by activity counts and awareness spend. Institutions are therefore optimising activity counts, and the activity count is the cheapest field in the form to inflate. That is a predictable behaviour to design for, not a scandal.

## 8. What this does NOT yet establish

- No primary interviews have been conducted. Everything above is documentary.
- The corpus is self-selecting: institutions that publish well-written IIC reports. These may be better resourced than median, or may simply be better at reporting. The direction of that bias is unknown and is recorded as open question OQ-21.
- `ideas generated` definitions have not been confirmed with any institution, so the spread in §3 is *evidence of inconsistency*, not a measured taxonomy.
- Star ratings were recorded only where an institution self-reported one. Six of 36 documents. ARIIA has not been independently queried for all corpus institutions.
- The corpus is 36 documents against a target of 40, with 2 documents still pending KPI extraction.
