# ASSETS — everything generated from the Phase 0 research

**All machine-readable and presentation-ready outputs live in [`_exports/`](_exports/).** Everything here is **derived** from the markdown research files — change the `.md`, re-run `python build/build_all.py`, and every format regenerates.

**Rebuild everything:** `python build/build_all.py` (13s)
**Compiled:** 18 October 2026 · 100 files · 8.4 MB

---

## 0b. Phase 2 — customer roles and approval chain

**Split follows the repository rule: the 14 topic folders hold summaries, `_exports/` holds data.**

| Written summary (topic folder) | Machine data (`_exports/`) |
|---|---|
| `08_User_Roles/README.md` — hub, the four questions answered | `phase2/csv/role_matrix.csv` — 25 roles × 17 cols, every answer graded |
| `08_User_Roles/Mandated_IIC_Seats.md` — the 12 portal-enforced offices | `phase2/csv/procurement_thresholds.csv` — 36 thresholds across 8 institutions |
| `08_User_Roles/Role_Matrix.md` — 25 roles × the four questions | `phase2/json/role_profiles.json` — nested role records + 6 exemptions |
| `08_User_Roles/Decision_Map.md` — answers by segment | `phase2/json/role_schema.json` — field defs + honesty guard |
| `08_User_Roles/Procurement_Authority.md` — price → approver ladders | `raw/phase2_roles_RAW.json` — unedited extraction layer |
| `08_User_Roles/Deep_Dives/` — 4 full profiles | `_exports/diagrams/{svg,png}/06_iic_roles_and_the_approval_chain` |
| `08_User_Roles/IIC_Roles_And_Approval_Chain.md` — mermaid source | |

Built by `build/build_phase2.py` from `build/data_p2_roles.py` and `build/data_p2_procurement.py`.

**Headline finding:** across 25 roles, only **4 have documented budget authority** — VC/Director,
Dean/Innovation Head, Registrar/Dean (ICSR), Finance Officer. **Not one is a mandated IIC seat.**
The offices that own the innovation data do not own the money.

**Enforced mechanically:** `validation()` fails the build if any role is graded `DOCUMENTED` on
`pays` without citing a procurement instrument that actually confers budget authority.

---

## 0. Phase 1 evidence corpus

**Split follows the repository rule: the 14 topic folders hold summaries, `_exports/` holds data.**

| Written summary (topic folder) | Machine data (`_exports/`) |
|---|---|
| `01_Problem_Research/F_Synthesis/IIC_Corpus_Analysis.md` - the five findings | `_exports/phase1/csv/iic_reports_wide.csv` - 36 documents x 42 cols |
| `01_Problem_Research/A_Institutional_Problems/` - 10 graded analyses | `_exports/phase1/csv/iic_metrics_long.csv` - 1,112 tidy rows, chart-ready |
| `01_Problem_Research/F_Synthesis/README.md` - synthesis hub | `_exports/phase1/csv/iic_contradictions.csv` - 6 same-document inconsistencies |
| `01_Problem_Research/01_Evidence_Corpus/README.md` - corpus index | `_exports/phase1/csv/iic_absence_vocabulary.csv` - 13 expressions of absence |
| `01_Evidence_Vault/Quotes/Phase1_Institutional_Quotes.md` - 12 quotes | `_exports/phase1/json/iic_corpus.json` + `iic_corpus_schema.json` |
| | `_exports/raw/phase1_iic_corpus_RAW.json` - unedited extraction layer |

Built by `build/build_phase1.py` from `build/data_p1_iic.py`, `data_p1_registry.py`, `data_p1_problems.py`.

**Corpus state:** 36 of 40 target documents, 34 distinct institutions, 25 fully parsed.

**The five findings, in one line each:**

1. `ideas generated` is not one measurement - implied idea-to-prototype conversion spans 0.0% to 262.5% across 19 institutions, and one exceeds 100%, which is impossible.
2. Six same-document contradictions, including NIT Calicut reporting both 55 and 17 startups and both Rs 1.51 lakh and Rs 16 lakh awareness spend in one PDF.
3. No controlled vocabulary for absence - at least seven ways to write "nothing happened" in the same mandated form, including one numeric money field filled with a 13-item prose narrative.
4. Grant money swamps awareness money and is often the wrong money - one institution's "innovation grant" figure reconciles exactly to two unrelated DBT academic grants.
5. Activity counts do not predict outcomes - 94 activities produced zero IPs at one institution; 42 activities produced 843 ideas at another.

**Data-integrity rule enforced by the exporter:** a missing metric is never defaulted to zero. See Decision Log D-014.

---

## 1. Quick start — what to open first

| If you want… | Open |
|---|---|
| The story, written out | 📄 [`_exports/docx/StartupHub_Phase0_Findings.docx`](_exports/docx/StartupHub_Phase0_Findings.docx) |
| Everything in one workbook | 📊 [`_exports/xlsx/StartupHub_Research_Database_MASTER.xlsx`](_exports/xlsx/StartupHub_Research_Database_MASTER.xlsx) — 12 sheets |
| A slide | 🖼️ [`_exports/charts/`](_exports/charts/) — 9 PNGs, 200 DPI |
| A diagram | 📐 [`_exports/diagrams/svg/`](_exports/diagrams/svg/) — 5 SVGs, scales cleanly |
| The data to pivot | 📋 [`_exports/csv/`](_exports/csv/) — 11 CSVs, 253 rows |
| To code against it | `{}` [`_exports/json/`](_exports/json/) — 9 datasets + JSON Schemas |
| To verify nothing was faked | 🔐 [`_exports/raw/manifest.json`](_exports/raw/manifest.json) — 100 files, SHA-256 |

---

## 2. Word documents — `_exports/docx/` (5 files)

| File | Contents | Orientation |
|---|---|---|
| **`StartupHub_Phase0_Findings.docx`** | ⭐ **The pitch-facing synthesis.** Five findings, the positioning, where not to compete, what we don't know, exploitable weaknesses, next steps. 9 embedded charts | Portrait |
| **`StartupHub_Competitor_Pack.docx`** | All 15 competitor dossiers + comparison matrix + positioning chart | Landscape |
| **`StartupHub_Segment_Census.docx`** | Every denominator with caveats, conflicts flagged in red | Portrait |
| **`StartupHub_Source_Register.docx`** | All 76 sources with full URLs, evidence tiers | Landscape |
| **`StartupHub_Positioning_Gaps.docx`** | The 13 gaps, one page each | Portrait |

---

## 3. Excel — `_exports/xlsx/` (6 workbooks)

### `StartupHub_Research_Database_MASTER.xlsx` — 12 sheets

| Sheet | Rows | Notes |
|---|---|---|
| `README` | — | Findings summary, blocking unknowns, evidence tier standard |
| `Sources` | 76 | Every cited source. `conflict=TRUE` cells shaded red |
| `Segment_Census` | 20 | Conflicts shaded amber, unreliable values shaded |
| `University_Types` | 10 | AISHE 2023-24 breakdown |
| `Startups_By_State` | 10 | Top 10 published, 31 Mar 2026 |
| `Competitors` | 15 | Full dossiers + 15 scored feature columns |
| `Feature_Matrix` | 15 | The comparison table. **Zeros shaded red** — read the three empty columns |
| `Pricing_Ledger` | 52 | Every real cited price, INR-annualised |
| `Positioning_Gaps` | 13 | CRITICAL shaded red, HIGH amber |
| `Problem_Evidence` | 12 | Graded DOCUMENTARY / INFERRED / ASSUMED |
| `Open_Questions` | 18 | BLOCKING shaded red |
| `Decision_Log` | 12 | Decision + evidence + reversal condition |

### Topic workbooks

| File | Sheets |
|---|---|
| `01_Segment_Census.xlsx` | README · Segment_Census · University_Types · Startups_By_State |
| `02_Competitor_Matrix.xlsx` | README · Competitors · Feature_Matrix |
| `03_Pricing_Evidence.xlsx` | README · Pricing_Ledger |
| `04_Problem_Evidence.xlsx` | README · Problem_Evidence |
| `05_Open_Questions_Decisions.xlsx` | README · Open_Questions · Decision_Log |

All sheets: frozen header row, autofilter, wrapped text, colour-coded severity.

---

## 4. Data charts — `_exports/charts/` (9 PNG, 200 DPI)

| # | File | Use in |
|---|---|---|
| 1 | `01_segment_sizes.png` | **Market slide** — segment sizes span three orders of magnitude; conflicts flagged amber |
| 2 | `02_price_band.png` | **Business model slide** — ₹0 → ₹44.6L log scale, defensible band shaded |
| 3 | `03_gap_matrix.png` | **Competition slide** — 11 vendors × 15 features; the 3 empty columns boxed in red |
| 4 | `04_startups_by_state.png` | Market context |
| 5 | `05_competitor_positioning.png` | **Strategy slide** — India-compliance vs credibility quadrant, StartupHub target plotted |
| 6 | `06_problem_evidence.png` | Problem slide — which problems are documented vs assumed |
| 7 | `07_positioning_gaps.png` | Differentiation slide — 13 gaps by competitor coverage |
| 8 | `08_open_questions.png` | **Risk slide** — 18 open questions, 3 blocking |
| 9 | `09_mandate_chain.png` | ⭐ **The core problem slide** — what institutions must report vs what no system holds |

---

## 5. Diagrams — `_exports/diagrams/` (5 × 3 formats)

Each exists as **`.mmd` source · `.svg` vector · `.png` 2× raster**.

| # | Diagram | SVG / PNG |
|---|---|---|
| 1 | `01_the_indian_innovation_ecosystem` | Government → Institution → Startup → Ecosystem, with the system-of-record gap marked |
| 2 | `02_the_structural_gap_what_is_required_vs_what_soft` | ⭐ **Core thesis** — required reports → unit of record → what exists nowhere |
| 3 | `03_competitive_positioning` | Quadrant chart |
| 4 | `04_the_price_band` | Flow diagram of the price ladder |
| 5 | `05_today_s_workflow_vs_startuphub_s` | Current-state vs target workflow |

**Folders:** `src/*.mmd` · `svg/*.svg` · `png/*.png` (3600px wide, 2× scale)
**Theme:** `theme.json` — slide-friendly light palette, Segoe UI/Inter stack

> Diagrams are **original work** derived from cited public sources and may be used freely. Third-party logos are **not** included — government emblems are governed by the Government Emblems Act 1950 and vendor logos are trademarked. Use wordmarks, which is what these do.

---

## 6. Structured data — `_exports/csv/` and `_exports/json/`

### CSV (11 files, 253 rows)

| File | Rows | Key columns |
|---|---|---|
| `source_registry.csv` | 76 | `id, area, claim, org, stype, tier, reliability, url, pub, access, segment, conflict, notes` |
| `segment_census.csv` | 20 | `segment, count, unit, as_of, source_id, reliability, conflict, notes` |
| `competitors.csv` | 15 | 22 descriptive columns |
| `competitor_feature_matrix.csv` | 15 | 15 scored dimensions × 6 context columns |
| `pricing_ledger.csv` | 52 | `vendor, plan, amount, unit, inr_annualised, confidence, market, notes` |
| `positioning_gaps.csv` | 13 | `gap_id, title, severity, competitors_with, evidence, gap_detail, why_india, nearest_competitor, verdict` |
| `problem_evidence.csv` | 12 | `num, area, grade, evidence_count, evidence, inference, still_needs, source_ids` |
| `open_questions.csv` | 18 | `id, priority, area, title, what_we_know, why_it_blocks, what_would_settle_it, source_ids, status` |
| `decision_log.csv` | 12 | `id, date, topic, decision, evidence, reverses_if, status` |
| `university_types.csv` | 10 | AISHE 2023-24 |
| `startups_by_state.csv` | 10 | 31 Mar 2026 |

All UTF-8 **with BOM** so Excel opens them correctly on Windows.

### JSON (9 datasets + 9 schemas)

| File | Shape |
|---|---|
| `startuphub_research_phase0.json` | **Master bundle** — meta, counts, 5 headline findings, 12 key numbers, full price band |
| `source_registry.json` | `{meta, records[76]}` |
| `segment_census.json` | `{meta, records[20]}` |
| `competitors.json` | `{meta, scoring, feature_dimensions, records[15]}` |
| `pricing_ledger.json` | `{meta, records[52], india_price_ladder, competitive_anchor, todo_md_assumption, gap_note}` |
| `positioning_gaps.json` | `{meta, records[13]}` |
| `open_questions.json` | `{meta, blocking_count, records[18]}` |
| `decision_log.json` | `{meta, records[12]}` |
| `problem_evidence.json` | `{meta, grades, warning, records[12]}` |

### JSON Schemas — `_exports/raw/schema/` (9 files)

Draft 2020-12. Every dataset has a typed field reference, record count, and enumeration of allowed values. Regenerated on every build.

---

## 7. Datasets — `_exports/datasets/`

| File | Contents |
|---|---|
| `nirf_dpiit_startups_SAMPLE.csv` | ⭐ **10 real rows** from the Factly/Dataful NIRF DPIIT startup dataset preview. Columns: `ranking_year, institute_id, institute_name, state, city, name_of_venture, year_of_recognition, registration_number` |
| `nirf_dpiit_startups_SAMPLE.meta.json` | Dataset metadata, distinct-value counts, **five analyst caveats**, and why it matters |

> **The full 6,817-row dataset is paywalled and was not downloaded.** Only the publicly visible preview rows are captured. Full statistics: 204 distinct `institute_id`, 202 distinct `institute_name` (a **0.98% dirty-record rate**), 5,490 distinct ventures, 4,538 registration numbers, 26 states, 80 cities.
>
> **Highest-priority primary-data task:** extract the NIRF PDF corpus — institutions publish their own Data Capture System submissions openly (verified at NIT Rourkela, IIM Goa, JBIET, Rajah Serfoji Government College).

---

## 8. Raw research — `_exports/raw/` (6 files, 2.6 MB)

Unedited research output, preserved verbatim so claims can be traced back to what was actually retrieved.

| File | Stream |
|---|---|
| `phase0_research_SEGMENT_CENSUS_RAW.md` | Institution counts, government data, schemes (2.3 MB) |
| `phase0_research_DIRECT_COMPETITORS_RAW.md` | 11 competitor dossiers + comparison table + gap synthesis |
| `phase0_research_INDIRECT_AND_GLOBAL_RAW.md` | Indirect alternatives + global vendors |
| `phase0_research_ECOSYSTEM_PLATFORMS_RAW.md` | Government platforms + structural gap analysis |
| `phase0_research_*_EXTRACT_RAW.md` (2) | Recovered tails of truncated reports |
| `manifest.json` | ⭐ **Every file in the project with SHA-256** — md, csv, json, xlsx, docx, svg, png, mmd |

---

## 9. Build pipeline — `build/`

Re-runnable. Everything is reproducible from source.

| File | Does |
|---|---|
| `build_all.py` | Runs everything, reports a summary |
| `render_diagrams.py` | Extracts ```mermaid blocks from the `.md` → `.mmd` → SVG + PNG via mermaid-cli |
| `build_data.py` | CSV + JSON from the canonical data modules |
| `build_xlsx.py` | 6 Excel workbooks with colour-coded formatting |
| `build_charts.py` | 9 matplotlib charts |
| `build_docx.py` | 5 Word documents with embedded charts |
| `build_raw.py` | Schemas, dataset samples, SHA-256 manifest |
| `data_sources.py` | ⭐ 76 source records — canonical |
| `data_market.py` | Segments, university types, pricing ledger, 13 gaps — canonical |
| `data_competition.py` | 15 competitor dossiers, 18 open questions — canonical |
| `data_governance.py` | 12 decisions, 12 problem areas — canonical |

**The four `data_*.py` modules are the single source of truth.** The markdown files are the narrative; these are the facts. Both cite the same IDs.

**Dependencies:** `python-docx` · `xlsxwriter` · `matplotlib` · `@mermaid-js/mermaid-cli` (npm)

---

## 10. Reproducibility & integrity

- **SHA-256 manifest.** `_exports/raw/manifest.json` hashes all 100 files. Verify with:
  ```powershell
  Get-Content _exports/raw/manifest.json | ConvertFrom-Json | % { $_.files } | % {
    $h = (Get-FileHash $_.path -Algorithm SHA256).Hash.ToLower()
    if ($h -ne $_.sha256) { "MISMATCH: $($_.path)" }
  }
  ```
- **Single source of truth.** Edit `build/data_*.py`, re-run `build_all.py`, and CSV/JSON/XLSX/DOCX/charts all stay in sync.
- **No fabricated data.** Every figure traces to a row in `source_registry.csv` with a URL, an as-of date, and a reliability grade. Negative findings are recorded as findings.
- **Conflicts are never collapsed.** Rows flagged `conflict=TRUE` must always be cited with their source and date.

---

## 11. Known limitations of this export layer

| Limitation | Impact | Fix |
|---|---|---|
| The NIRF dataset is paywalled — only 10 preview rows captured | Cannot size the elite cohort precisely | Extract the public NIRF PDF corpus (Phase 0 next action #2) |
| All G2/Capterra quotes are search-index excerpts | Both sites return HTTP 403 to automated fetch | Re-verify directly before any customer-facing use |
| `mmdc` lives in a temp directory | Diagrams won't rebuild if that folder is cleared | `npm install @mermaid-js/mermaid-cli` and update `MMDC` in `render_diagrams.py` |
| No automated test suite | Silent regressions in the build | Add a row-count assertion pass to `build_raw.py` |
| Company logo URLs recorded, assets not downloaded | Copyright/trademark exposure | Deliberate. Link to official press pages instead |

---

Back to [Research Index](00_Research_Index/README.md) · [Phase 0 Findings](13_Synthesis/Phase0_Findings.md)
---

## 12. Phase 3A — government forms (NIRF / ARIIA)

Mined from published primary PDFs that institutions submit under their own name.

| Asset | What it is |
|---|---|
| `01_Problem_Research/F_Synthesis/Government_Form_Analysis.md` | The write-up: 11 forms, 9 findings, join-key table, star ladder |
| `_exports/phase3/form_corpus.csv` | 11 forms x 13 cols |
| `_exports/phase3/dpiit_join_key.csv` | The join measurement, per NIRF form |
| `_exports/phase3/sentinel_register.csv` | 10 zeros that are not zeros |
| `_exports/phase3/verbatim_quotes.csv` | 7 verbatim strings from the forms |
| `_exports/phase3/findings.json` + `findings_schema.json` | Findings, limits, honesty guards |
| `_exports/raw/phase3_forms_RAW.json` | Raw extraction layer |

Reproduce: `python build/_fetch_forms.py` (download + extract) then `python build/build_phase3.py`.

### Headline

The NIRF form's only join between "startups recognized by DPIIT" and the TRL table is the
**founder's DPIIT registration number** — which the institution does not hold. Measured across
7 forms: **32 of 354 recognised startups (9.0%) lose their identity at that join**, worst case
NIT Andhra Pradesh at 4 of 6 (67%).

### Phase 3A limits

| Limitation | Impact |
|---|---|
| **Documentary only — zero interviews** | Willingness to pay, felt pain and budget ownership remain unverified |
| 11 forms, all from institutions that **choose to publish** | Missingness inside this set **understates** the real gap |
| Text-layer extraction, **no OCR** | Ligature loss affects wording, not the counts used |
| `dpiit_in_trl` is a **key count**, not a startup count | One startup with several innovations appears more than once |
| One ARIIA form exposes the fund-split rows in a readable layout | The 2022 template's column labels do not survive extraction |
| ARIIA counts academic-year pairs; NIRF counts single cycles | **No cross-form total is computed anywhere** |

Full limits list: `data_p3_forms.LIMITS`, mirrored in `_exports/phase3/findings.json`.

---

## 13. Phase 3B — interview programme (instruments)

**Interviews conducted: 0.** This is an instrument, not a result.

| Asset | What it is |
|---|---|
| `02_User_Research/README.md` | Programme hub + the pairing method |
| `02_User_Research/Interview_Protocol.md` | How to run one interview, 30–40 min, incl. the artefact ask |
| `02_User_Research/Consent_And_Ethics.md` | 6-point consent block, attribution, recording rules |
| `02_User_Research/Guides/` | 4 role-class guides, 21 questions, each with probe + hook + falsifier |
| `02_User_Research/Falsification_Matrix.md` | 10 hypotheses x the observation that would kill each |
| `02_User_Research/Recruitment_Shortlist.md` | 6 institutions ranked by documented contradiction |
| `02_User_Research/Coding_Scheme.md` | 10 codes, evidence bars, 3-of-6 reporting rule |
| `02_User_Research/Capture_Template.md` | Note sheet, non-answer log, paired-divergence grid |
| `_exports/phase3b/` | guides.csv, falsification_matrix.csv, recruitment_shortlist.csv, coding_scheme.csv, instrument_schema.json |

Reproduce: `python build/build_phase3b.py`.

### Build guards that fail the run

| Guard | Effect |
|---|---|
| No hypothetical-purchase frame in any structured question | Rejected — 21/21 pass |
| Every question needs bank + probe + hook + falsifier | Rejected if missing |
| Every hypothesis needs a refuting observation and a real guide question | Rejected if missing |
| No interview-result wording anywhere in the module | Rejected — `interviews_conducted: 0` |
| `_exports/synthetic/` excluded from the manifest | Verified with a planted canary |

### Phase 3B limits

| Limitation | Impact |
|---|---|
| **0 interviews conducted** | All 10 hypotheses untested; 8 remain HYPOTHESIS, 2 SINGLE-SOURCE |
| Shortlist drawn only from institutions in the Phase 1 corpus | Selection bias toward institutions that publish |
| 6 institutions is a small sample | Below 3-of-6 for anything; cannot support a claim about "Indian institutions" generally |
| The artefact ask may be declined | `P-A10` (internal tooling) may stay HYPOTHESIS if most respondents refuse |

---

## 14. Phases 4 / 5 / 7 / 30 — market, segmentation, sizing, scorecard

**Interviews conducted: 0. No market figure is a point estimate.**

| Asset | What it is |
|---|---|
| `03_Market_Research/README.md` | Ecosystem base, all T1 government sources; why 58,643 is not a market |
| `03_Market_Research/Segment_Census.md` | Phase 4 — 5 segments x 4 axes + the ICP |
| `05_Market_Sizing/README.md` | Phase 7 — TAM/SAM/SOM as ranges + assumption ledger |
| `13_Synthesis/Validation_Scorecard.md` | Phase 30 — rebuilt around what actually exists |
| `_exports/phase45/` | market_base, iic_counts, conflicts, segments, icp_criteria, assumptions, sizing, validation_scorecard |

Reproduce: `python build/build_phase45.py`.

### Headline numbers

| | |
|---|---|
| Registered HEIs (AISHE 2021-22) | 58,643 — **super-bound, not a market** |
| Filed NIRF Innovation (2025) | **777** — SAM floor, observable behaviour |
| IICs | **14,067 – 16,367** — three official sources, 16.4% spread |
| TAM | Rs 105.5 cr – Rs 196.4 cr / year |
| SAM | Rs 5.83 cr – Rs 92.30 cr / year (**15.8x band**, deliberate) |
| SOM | Y1 Rs 2.25–7.20 lakh · Y2 Rs 6.00–18.00 lakh · Y3 Rs 11.25–30.00 lakh |

### The finding that matters most

**Three official sources give three different counts of how many IICs exist in India,
differing by 16.4%, and none states its counting rule.** We therefore refuse to pick
one and publish a range.

This is the same defect documented inside 36 institutional reports and 11 government
forms — a ledger that counts *entries* rather than *state*. We cannot cite one of
these numbers as "the" market, and neither can the customer.

### Limits

| Limitation | Impact |
|---|---|
| TAM/SAM band is dominated by 3 HYPOTHESIS inputs (price, conversion, discount) | Measuring any one collapses the range more than further market research |
| SAM ceiling is NIRF applicants, most of whom file Overall not Innovation | Ceiling is arithmetic, not an estimate; true SAM is far below it |
| I rejected the plan's own SOM (5/15/40-50) | Year-3 implied a sales team that does not exist |
| Willingness to pay has **zero** primary evidence | `OQ-03` open since Phase 0; every rupee traces to a competitor's price |
| Churn / renewal not modelled at all | LTV cannot be computed from evidence |
| No segment validated against a customer | ICP's 2nd must-be is still HYPOTHESIS (H-01); if false, S1 collapses |
