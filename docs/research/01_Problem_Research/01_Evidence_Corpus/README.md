# Phase 1 Evidence Corpus

Raw retrieved documents, organised by class. This folder is the **index**; the machine-readable records live in `build/data_p1_iic.py` and export to `_exports/phase1/`.

## Corpus classes and their tiers

| Class | Tier | Documents | Status |
|---|---|---|---|
| `Institutional_IIC_Reports/` | T1 | 36 | mined |
| `ARIIA_NIRF_Forms/` | T1 | - | not started |
| `Procurement_Tenders/` | T1 | - | not started |
| `Academic_Literature/` | T2 | - | not started |
| `Vendor_Case_Studies_T4/` | T4 | - | not started |

Tier definitions are the repository standard - see `00_Research_Index/README.md` section 3. An institution's own annual report is **T1**: it is the origin of the fact about that institution. See Decision Log D-016 for the correction that got us there.

## Institutional IIC reports - extraction status

Target: **40 documents.** Currently **36** (25 parsed, 9 partial, 2 pending KPI extraction).

### Parsed (25)

| Corpus ID | Institution | Type | State | Year | IIC ID | URL |
|---|---|---|---|---|---|---|
| `IIC-001` | NIT Calicut | NIT (central) | Kerala | 2024-25 | - | [doc](https://nitc.ac.in/imgserver/uploads/attachments/Ed__44cab2fb-596f-4726-9b77-8122bc273b37_.pdf) |
| `IIC-001b` | NIT Calicut | NIT (central) | Kerala | 2024-25 | - | [doc](https://nitc.ac.in/imgserver/uploads/attachments/Ed__44cab2fb-596f-4726-9b77-8122bc273b37_.pdf) |
| `IIC-002` | NIT Calicut | NIT (central) | Kerala | 2023-24 | - | [doc](https://nitc.ac.in/imgserver/uploads/attachments/Ed__1307b021-1d66-41a0-9bd6-c97cd283618e_.pdf) |
| `IIC-004` | Kongu Engineering College | Autonomous engineering college | Tamil Nadu | 2023-24 | - | [doc](https://kongu.ac.in/kongu.ac.in/ief/docs/AnnualReport_2023-24.pdf) |
| `IIC-005` | Manav Rachna University | Private deemed university | Haryana | 2023-24 | - | [doc](https://manavrachna.edu.in/assets/pdf/ANNUAL-REPORT-IIC-6.0-2023_24.pdf) |
| `IIC-006` | PIET Poornima | Engineering college | Rajasthan | 2023-24 | - | [doc](http://www.piet.poornima.org/PIET_NAAC_SSSR/IIC/reports/Annual_Report_2023-24.pdf) |
| `IIC-007` | ICFAI University Tripura | Private deemed university | Tripura | 2023-24 | - | [doc](https://iutripura.edu.in/assets/pdf/IIC-Annual-Activity-Report-for-the-Academic-Year-2023%E2%80%9324.pdf) |
| `IIC-008` | Regent RERFGI | Private university group | Gujarat | 2024-25 | - | [doc](https://www.regent.ac.in/storage/475/1760255758.pdf) |
| `IIC-011` | Institute of Science Nagpur | Autonomous science college | Maharashtra | 2024-25 | IC202218420 | [doc](https://iscnagpur.ac.in/pdf/Annual%20Report%202024-25.pdf) |
| `IIC-016` | CMRIT | Autonomous engineering college | Tamil Nadu | 2024-25 | IC201811190 | [doc](https://www.cmrit.ac.in/wp-content/uploads/2026/02/IIC-Annual-Report-2024-25-as-on-15th-oct-2025.pdf) |
| `IIC-017` | KCG College of Technology | Engineering college | Tamil Nadu | 2024-25 | IC201810669 | [doc](https://kcgcollege.ac.in/pdf/IIC-Annual-Report-2024-25.pdf) |
| `IIC-018` | SIGCE | Engineering college | Tamil Nadu | 2024-25 | - | [doc](https://sigce.edu.in/wp-content/uploads/2026/08/IIC-ANNUAL-REPORT-2024-2025.pdf) |
| `IIC-019` | REC Raghu | Autonomous engineering college | Andhra Pradesh | 2024-25 | - | [doc](https://www.raghuenggcollege.com/documents/iic-7.0/95_REC-IIC-Annual-Report-2024-2025.pdf) |
| `IIC-022` | IPS Academy Indore | Autonomous engineering college | Madhya Pradesh | 2024-25 | - | [doc](https://ies.ipsacademy.org/wp-content/uploads/2025/10/2024-25%20IIC%20Report.pdf) |
| `IIC-023` | SIES CoMS | Management college (non-technical) | Maharashtra | 2024-25 | - | [doc](https://www.siescoms.edu.in/docs/IIC%20Annual%20Report%2024-25.pdf) |
| `IIC-024` | SSCET | Engineering college | Telangana | 2024-25 | IC202218297 | [doc](https://shreesathyam.edu.in/files/attach/iic/iic-annual-report-2024-25.pdf) |
| `IIC-025` | VIPS Women | Pharmacy college | Andhra Pradesh | 2024-25 | IC201912172 | [doc](https://vipw.in/images/864804e152b87a519a1505dc10daab3e.pdf) |
| `IIC-026` | Vivekanandha College | Arts and science college (non-technical) | Tamil Nadu | 2024-25 | IC202115926 | [doc](https://www.viaasrtt.ac.in/pdf/iic/iic_annualreport_2024-25.pdf) |
| `IIC-027` | Kanoria Jaipur | PG women's college (non-technical) | Rajasthan | 2024-25 | IC202428336 | [doc](https://kanoriacollege.in/documents/IIC/IIC%20Annual%20Reports/IIC%20Annual%20Report%202024-25.pdf) |
| `IIC-029` | MIET Jammu | Autonomous engineering college | Jammu and Kashmir | 2023-24 | - | [doc](https://mietjmu.in/IIC/IIC%20Annual%20Report%202023-24%20Version%202.pdf) |
| `IIC-031` | Teresa's College | Arts and science college (non-technical) | Kerala | 2023-24 | - | [doc](https://teresas.ac.in/wp-content/uploads/2025/03/IIC-Annual-Report-23-24.pdf) |
| `IIC-032` | Brainware University | Private deemed university | West Bengal | 2023-24 | - | [doc](https://www.brainwareuniversity.ac.in/pdfs/iic/iic-annual-report-2023-24.pdf) |
| `IIC-033` | WCC Chennai | Arts and science college (non-technical) | Tamil Nadu | 2023-24 | IC201810962 | [doc](https://wcc.edu.in/wp-content/uploads/IIC/IIC-6.0-ANNUAL-REPORT-2023-24.pdf) |
| `IIC-034` | EGSPEC | Engineering college | Uttar Pradesh | 2023-24 | - | [doc](https://firebasestorage.googleapis.com/v0/b/egspec-website.appspot.com/o/egspec%2Factivities%2Fiic%2Fiic-60-annual-report-2023-24-egspec.pdf) |
| `IIC-035` | MMCOP Pune | Pharmacy college | Maharashtra | 2023-24 | IC202012981 | [doc](https://mmcop.edu.in/wp-content/uploads/2024/10/IIC-report-2023-24.pdf) |

### Partial (9)

| Corpus ID | Institution | Type | State | Year | IIC ID | URL |
|---|---|---|---|---|---|---|
| `IIC-003` | NIT Andhra Pradesh | NIT (central) | Andhra Pradesh | 2024-25 | - | [doc](https://nitandhra.ac.in/main/iic/IIC%20NIT-ANP%20Annual%20Report%202024-2025.pdf) |
| `IIC-009` | VC Engineering College | Engineering college | Kerala | 2023-24 | - | [doc](https://vcenggw.ac.in/pdf/iic/2023-24/Annual-Report-2023-2024.pdf) |
| `IIC-010` | BIT Mesra | Deemed university (private) | Jharkhand | 2023-24 | - | [doc](https://bitmesra.ac.in/UploadedDocuments/adminiic/files/Final%20_IIC%20Annual%20Report%20%202023-2024.pdf) |
| `IIC-013` | St Paul's College of Pharmacy | Pharmacy college | Kerala | 2023-24 | IC202115868 | [doc](https://stpaulscollege.ac.in/wp-content/uploads/2025/01/IIC-Annual-Report-2023-24.pdf) |
| `IIC-015` | KIT CoE | Engineering college | Tamil Nadu | - | - | [doc](https://www.kitcoek.in/documents/About/mandatory-disclosure-v2/18.15%20xv%20Innovation%20Cell.pdf) |
| `IIC-020` | NRCM | Engineering college | Telangana | 2024-25 | - | [doc](https://www.nrcmec.org/pdf/IIC/Reports/Annual%20Report%202024-25.pdf) |
| `IIC-021` | SLRTCE | Engineering college | Maharashtra | 2024-25 | IC2020144xxx | [doc](https://slrtce.in/wp-content/uploads/2025/09/ANNUAL-REPORT-2024-25-IIC.pdf) |
| `IIC-028` | Rathinam College of Pharmacy | Pharmacy college | Tamil Nadu | 2024-25 | - | [doc](https://rathinamcollegeofpharmacy.com/wp-content/uploads/2026/03/IIC-7.0-Report.pdf) |
| `IIC-030` | Dr NGP ASC | Autonomous arts and science college | Tamil Nadu | 2023-24 | - | [doc](https://www.drngpasc.ac.in/pdf/IIC/report/2023-24.pdf) |

### Header Only (2)

| Corpus ID | Institution | Type | State | Year | IIC ID | URL |
|---|---|---|---|---|---|---|
| `IIC-012` | Scottish Church Kolkata | Undergraduate college | West Bengal | 2024-25 | - | [doc](https://www.scottishchurch.ac.in/docs/IIC/20251229_IIC_Annual_Report_2024_25.pdf) |
| `IIC-014` | SV College of Pharmacy Chittoor | Pharmacy college | Andhra Pradesh | 2023-24 | - | [doc](https://svcop.in/wp-content/uploads/2025/03/IIC-ANNUAL-REPORT-2023-24.pdf) |

## What still has to be mined

- 4 further IIC reports to reach the 40-document target.
- 20 ARIIA / NIRF institutional submission forms.
- 20 peer-reviewed / institutional research papers.
- 15 government procurement tenders.
- Vendor case studies (Tier 4 only, never load-bearing).

## Integrity rules for this corpus

1. **A missing metric means not read, never zero.** See Decision Log D-014.
2. **Same-document contradictions are kept as two records**, never reconciled. See D-013.
3. **A source that will not parse is logged as `unparseable`, not estimated.**

Derived analysis: `_exports/phase1/md/iic_corpus_analysis.md`
