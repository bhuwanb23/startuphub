# StartupHub — Research Index

**Purpose:** the single navigation point for all StartupHub research. Every document in this repository should be reachable from here, and every factual claim should be traceable to a row in `Source_Registry.csv`.

**Current phase:** Phase 1 — Problem Research (in progress)
**Status:** Phase 0 complete. Phase 1 Section A complete; Sections B–F not started.
**Last updated:** 18 October 2026

> ### 📦 Want data, not prose?
> Every finding below is also available as **Excel, CSV, JSON, Word, SVG, PNG and PowerPoint-ready charts**.
> Go to **[`ASSETS.md`](../ASSETS.md)** — or jump straight to:
> - 📊 [`_exports/xlsx/StartupHub_Research_Database_MASTER.xlsx`](../_exports/xlsx/StartupHub_Research_Database_MASTER.xlsx) — all 12 sheets
> - 📄 [`_exports/docx/StartupHub_Phase0_Findings.docx`](../_exports/docx/StartupHub_Phase0_Findings.docx) — the written synthesis
> - 🖼️ [`_exports/charts/`](../_exports/charts/) — 9 slide-ready PNGs
> - 🔐 [`_exports/raw/manifest.json`](../_exports/raw/manifest.json) — every file SHA-256 hashed
>
> Rebuild everything with `python build/build_all.py`.

---

## 1. What this repository is for

The master plan is in [`../todo.md`](../todo.md) — 34 research phases ending in a defensible pitch.

This repository is organised **by type of evidence**, not by phase. That is deliberate: a claim gathered in Phase 9 and a claim gathered in Phase 20 belong in the same place if they prove the same thing. Phases are *when we look*; folders are *where evidence lives*.

Three rules govern everything:

1. **No naked claims.** Every factual assertion carries a source, an access date, and a tier grade. An assertion without a source is marked `⚠️ UNVERIFIED` — it is not deleted, it is flagged.
2. **Contradictions are logged, not smoothed.** If two sources disagree, both go in `Open_Questions.md`. We do not average them.
3. **Nothing is narrowed prematurely.** Segment shortlisting happens from evidence, at the end, in `13_Synthesis/`.

---

## 2. Folder map

```
research/
├── todo.md                          The 34-phase master plan (unchanged)
├── ASSETS.md                        ⭐ INDEX of every generated file and format
├── _exports/                        ⭐ ALL machine output (regenerable, never hand-edited)
│   ├── xlsx/                        6 Excel workbooks
│   ├── docx/                        5 Word documents
│   ├── csv/                         11 Phase 0 CSVs, 253 rows
│   ├── json/                        9 datasets
│   ├── phase1/                      ⭐ Phase 1 corpus: csv + json + schema (NO prose)
│   ├── charts/                      9 data charts (PNG)
│   ├── diagrams/                    5 Mermaid diagrams (mmd + svg + png)
│   ├── datasets/                    raw dataset samples
│   └── raw/                         unedited research output + SHA-256 manifest
├── build/                           ⭐ reproducible build pipeline
│   ├── build_all.py                 runs everything (13s)
│   ├── render_diagrams.py           mmd -> svg + png
│   ├── build_data.py                -> csv + json
│   ├── build_xlsx.py                -> xlsx
│   ├── build_charts.py              -> png charts
│   ├── build_docx.py                -> docx
│   ├── build_raw.py                 -> schemas + manifest
│   └── data_*.py                    ⭐ canonical data (single source of truth)
│
├── 00_Research_Index/               ← YOU ARE HERE
│   ├── README.md                    this file
│   ├── Source_Registry.csv          every source, with tier + access date
│   ├── Decision_Log.md              what we decided and on what evidence
│   └── Open_Questions.md            unresolved conflicts and gaps
│
├── 01_Evidence_Vault/               THE PROOF LAYER — quotations only, no opinion
│   ├── Quotes/                      verbatim, attributed  ← 12 Phase 1 quotes
│   ├── Datasets/                    raw CSVs
│   ├── Screenshots/                 portal captures
│   └── Diagrams/                    rendered assets
│
├── 01_Problem_Research/             ← PHASE 1 (current phase)
│   ├── 01_Evidence_Corpus/          mined documents, indexed by class and parse status
│   │   ├── Institutional_IIC_Reports/     36 docs mined  ← PRIMARY CORPUS
│   │   ├── ARIIA_NIRF_Forms/             not started
│   │   ├── Academic_Literature/           3 refs logged, not yet mined
│   │   ├── Procurement_Tenders/           not started
│   │   └── Vendor_Case_Studies_T4/        not started
│   ├── A_Institutional_Problems/    ← 10 analyses, DONE
│   ├── B_Operational_Problems/     not started
│   ├── C_Evidence_Register/        not started
│   ├── D_Quotes/                   not started
│   ├── E_Visual_Evidence/          not started
│   │   ├── Infographics/           not started
│   │   └── Form_Wireframes/        not started
│   └── F_Synthesis/                ← WRITTEN FINDINGS
│       ├── README.md                     synthesis hub
│       └── IIC_Corpus_Analysis.md        the five corpus findings
│
├── 02_Landscape_Map/                How big is each segment, really?
│   ├── Segment_Census.md            ← START HERE for denominators
│   ├── Universities/
│   ├── Engineering_Colleges/
│   ├── IIC_and_TBI/
│   ├── Incubators_Accelerators/
│   ├── Startups_and_Cohorts/
│   └── Government_Schemes/
│
├── 03_Problem_Evidence/             Problem → hard evidence (feeds Phase 1)
├── 04_Competitor_DeepDive/          ← the highest-value Phase 0 output
│   ├── 00_INDEX.md                  read this first
│   ├── Direct/                      11 dossiers
│   ├── Ecosystem_Platforms/         the mandatory government stack
│   ├── Indirect_Alternatives/       what they use if we don't exist
│   ├── Global/                      international players
│   ├── Pricing_Evidence.md          every real, cited price
│   └── Positioning_Map.md           where the white space is
│
├── 05_Government_Data/              DPIIT, MoE/MIC, AICTE, UGC, DST, MeitY, states
├── 06_Pricing_Evidence/             pricing deep-dive (Phase 8)
├── 07_Workflow_CurrentState/        how institutions actually work today
├── 08_User_Roles/                   who uses / decides / pays / approves
├── 09_Market_Data/                  raw market inputs (feeds Phase 7)
├── 10_AI_Opportunity/               where AI genuinely creates value
├── 11_Legal_Policy_Tech/            DPDP, procurement, tenancy, security
├── 12_Partners_Ecosystem/           IIC networks, DST-TBIs, state missions
├── 13_Synthesis/                    cross-cutting findings + narrowing candidates
└── 14_Assets/                       diagrams, logos, chart sources
```

---

## 2b. The two layers — and the one rule that separates them

There are exactly two kinds of file in this repository, and the distinction matters:

| Layer | Location | What it is | Edit it by |
|---|---|---|---|
| **Narrative** | `*.md` in the topic folders (`00_` … `14_`) | The reasoning. Why a number matters, what it contradicts, what it implies | Writing |
| **Data** | `build/data_*.py` | The facts. Every figure, every source, every score | The canonical Python modules |

### Where output goes

> **The 14 topic folders hold the summaries. `_exports/` holds the data.**

| You are writing… | It goes in |
|---|---|
| A README, an analysis, a synthesis, a written finding | the matching topic folder (`00_` … `14_`) |
| A CSV, JSON, XLSX, DOCX, PNG, SVG, MMD | `_exports/`, via `build/build_all.py` |
| Unedited retrieved material and the SHA-256 manifest | `_exports/raw/` |

**`_exports/` contains no written analysis.** If a document has prose in it, it belongs in a topic
folder. The only markdown in `_exports/` is `raw/*_RAW.md` — unedited extraction, which is data by
definition.

**Never hand-edit a file in `_exports/`.** Change `build/data_*.py` (or the `.md`) and re-run
`python build/build_all.py`. Everything in `_exports/` is **derived** and regenerates with one
command, so the CSV, JSON, Excel, Word and chart versions of a claim can never drift from the
markdown — there is a single source of truth per fact, and the narrative is commentary on top of it.


---

## 3. Evidence grading standard

Adapted from todo.md Phase 32. Applied to every row in `Source_Registry.csv`.

| Tier | Meaning | Examples | Use for |
|---|---|---|---|
| **T1 — Primary** | The origin of the fact | Government publications, official statistics, official pricing pages, statutes/gazettes, our own interviews and pilot data | Market sizing, compliance claims, pricing |
| **T2 — High-quality secondary** | Reputable analysis of primary data | IIM/IIIT research, established consulting, World Bank/OECD, peer-reviewed work | Framing, triangulation |
| **T3 — Market intelligence** | Commercially motivated | Tracxn, Crunchbase, Factly/Dataful, SaaS directories (G2, Capterra, GetApp) | Vendor sizing, review sentiment — **never** for market size |
| **T4 — Community** | Anecdotal, unverified | Vendor blogs, LinkedIn posts, Reddit, YouTube, review-site excerpts | Sentiment, complaints, discovery of leads — **never** for any number in the pitch |

### Reliability markers used in documents

- 🟢 **VERIFIED** — read directly from a primary source
- 🟡 **LISTED** — third-party directory, not the vendor
- 🔴 **NOT PUBLIC** — gated behind login/sales call
- ⚠️ **UNVERIFIED** — could not be confirmed; do not cite externally

### Additional honesty rules

- **Access date is mandatory.** Government portals change without notice; a figure without a date is not citable.
- **Conflicts get named, not resolved by convenience.** See `Open_Questions.md`.
- **Absence of evidence is recorded as a finding.** "No peer-reviewed literature quantifies Indian institutional reporting burden" is itself a research result and is logged as such.

---

## 4. Citation format

Inside documents:

```
Claim → Source Organisation, Title, As-of Date. <URL> [Tier, Reliability]
Example: 2.23 lakh+ DPIIT-recognised startups as of 31 Mar 2026.
         PIB/DPIIT. <https://pib.gov.in/PressReleasePage.aspx?PRID=2253019> [T1, HIGH]
```

In the registry, `Source_Registry.csv` uses these columns:

```
id, research_area, claim_supported, source_org, source_type, tier, reliability,
url, publication_date, access_date, geography, customer_segment, notes
```

---

## 5. Status board

| Phase | Topic | Status | Primary output |
|---|---|---|---|
| **0** | **Positioning + landscape + competitors** | ✅ **Complete (initial pass)** | `04_Competitor_DeepDive/`, `02_Landscape_Map/Segment_Census.md` |
| 1 | Problem research | 🟡 **Section A done, corpus mined** | `01_Problem_Research/A_Institutional_Problems/`, `01_Evidence_Vault/Quotes/` |
| 2 | Customer research (roles) | ⬜ Not started | `08_User_Roles/` |
| 3 | User interviews | ⬜ Not started | — |
| 4 | Segmentation + ICP | ⬜ Not started (blocked on Phase 3) | — |
| 5 | Market research | 🟡 Seeded | `02_Landscape_Map/` |
| 6 | Government data | 🟡 Seeded | `05_Government_Data/` |
| 7 | TAM/SAM/SOM | ⬜ Deliberately deferred | `09_Market_Data/` |
| 8 | Pricing | 🟡 Seeded | `06_Pricing_Evidence/` |
| 9 | Competitors | ✅ **Done in Phase 0** | `04_Competitor_DeepDive/` |
| 10 | Competitor matrix | ✅ Done | `04_Competitor_DeepDive/Positioning_Map.md` |
| 11 | Competitor user reviews | 🟡 Partial (thin — see Open Questions) | dossiers |
| 12 | Feature gap | ✅ Done | `04_.../Positioning_Map.md` |
| 13–15 | Journey / JTBD / workflow | ⬜ Not started | `07_Workflow_CurrentState/` |
| 16–18 | Financial model | ⬜ Blocked on pricing validation | `09_Market_Data/` |
| 19 | GTM | ⬜ Not started | `12_Partners_Ecosystem/` |
| 20 | Pilot | ⬜ Not started | — |
| 21 | MVP | ⬜ Deliberately deferred | — |
| 22–26 | Tech / AI / legal / security / IPR | ⬜ Not started | `10_`, `11_`, `15_` |
| 27 | Policy | 🟡 Seeded | `05_Government_Data/` |
| 28 | Ecosystem mapping | ✅ Done | `01_Evidence_Vault/Diagrams/` |
| 29 | Market alternatives | ✅ Done | `04_.../Indirect_Alternatives/` |
| 30 | Validation scorecard | ⬜ Blocked on Phase 3 interviews | — |
| 31–32 | Evidence DB + source hierarchy | ✅ Done | `Source_Registry.csv` |
| 33 | Final folder structure | ✅ Done | this file |
| 34 | 30 final questions | ⬜ Partial (Q12–21 largely answerable now) | `13_Synthesis/` |

---

## 6. How to use this repository

- **Building the pitch?** Start at `13_Synthesis/Phase0_Findings.md` — it is written to be quoted.
- **Sizing a market?** `02_Landscape_Map/Segment_Census.md` has the denominators, with conflicts flagged.
- **Answering "who does this already?"** `04_Competitor_DeepDive/00_INDEX.md`.
- **Looking for a quote?** `01_Evidence_Vault/Quotes/`.
- **Checking whether a number is safe to publish?** `Source_Registry.csv` → find the claim → read the reliability column.
- **Challenging an assumption?** `Decision_Log.md` shows what we believed and why, so it can be overturned on evidence.

---

## 7. Working agreement for future phases

When a later phase produces evidence:

1. Log the source in `Source_Registry.csv` first.
2. Put the verbatim material in `01_Evidence_Vault/`.
3. Write the analysis into the topic folder, citing the registry ID.
4. If it contradicts something, append to `Open_Questions.md` — do not silently overwrite.
5. If it changes a decision, append to `Decision_Log.md` with the old and new position.

### Phase 1 additions

6. **Grade every problem.** Section A records carry `DOCUMENTED` / `SINGLE-SOURCE` / `HYPOTHESIS`.
   `build/data_p1_problems.py::validation()` fails the build if a `DOCUMENTED` problem cites fewer
   than two corpus ids, or if a quote or corpus id does not resolve. See Decision Log D-017.
7. **Never let a second tier scheme exist.** Tiers come from section 3 of this file only. See D-016.
8. **A missing number is never zero.** See D-014.
9. **Same-document contradictions are kept, not reconciled.** See D-013.
10. **Quotes from PDF text layers are flagged** `recheck_before_external_use = TRUE`. Machine
    extraction scrambles ligatures, bullets and Devanagari. Re-verify against the page before any
    external use.