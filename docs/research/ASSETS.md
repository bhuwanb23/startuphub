# ASSETS — everything generated from the Phase 0 research

**All machine-readable and presentation-ready outputs live in [`_exports/`](_exports/).** Everything here is **derived** from the markdown research files — change the `.md`, re-run `python build/build_all.py`, and every format regenerates.

**Rebuild everything:** `python build/build_all.py` (44s)
**Compiled:** 20 October 2026 · 398 manifest files · 20.0 MB in `_exports/`

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
| A slide | 🖼️ [`_exports/charts/`](_exports/charts/) — 81 PNGs, 200 DPI, in 8 phase folders |
| A diagram | 📐 [`_exports/diagrams/svg/`](_exports/diagrams/svg/) — 6 SVGs, scales cleanly |
| The data to pivot | 📋 [`_exports/csv/`](_exports/csv/) — 11 CSVs, 253 rows |
| To code against it | `{}` [`_exports/json/`](_exports/json/) — 9 datasets + JSON Schemas |
| To verify nothing was faked | 🔐 [`_exports/raw/manifest.json`](_exports/raw/manifest.json) — 372 files, SHA-256 |

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
| `05_Market_Sizing/README.md` | Phase 7 hub — two price scenarios, base A ₹1.2L / upside B ₹10.28L |
| `05_Market_Sizing/TAM.md` | 3 methods, 2 scenarios; ceilings vs reachable, never averaged |
| `05_Market_Sizing/SAM.md` | Six named filters, 58,643 → 582–777 institutions |
| `05_Market_Sizing/SOM.md` | Capacity-built; the spec's own 5/15/40–50 plan rejected in writing |
| `05_Market_Sizing/State_SOTP.md` | G9 sized separately on the PRIOR tier, ₹0.75–6.4 cr |
| `05_Market_Sizing/ARR_Bridge.md` | Years 1–5 both prices; the A/B gap is price, not selling effort |
| `05_Market_Sizing/Unit_Economics.md` | The price problem: LTV/CAC 0.21, required ACV 8.6× list |
| `05_Market_Sizing/Adoption_Penetration.md` | NIRF/IIC/SRF curves; the 1.32% headroom and its trap |
| `05_Market_Sizing/Triangulation.md` | Why the methods disagree and we refused to average |
| `05_Market_Sizing/Falsification.md` | Six pre-committed ways this sizing breaks |
| `_exports/phase7/` | tam_methods, sam_funnel, som_capacity, arr_bridge, unit_economics_linked, adoption_curves, penetration, triangulation, schema |
| `_exports/csv/sizing.csv` | **canonical** TAM/REACHABLE/SAM/SOM — Phase 7 owns it; pre-Phase-7 pass marked SUPERSEDED |
| `06_Pricing_Research/README.md` | Phase 8 hub — observed market ₹10K–₹7.2L; list price 1.2× the ERP ceiling |
| `06_Pricing_Research/Comparable_Prices.md` | 46 real prices, each with source URL + retrieval date |
| `06_Pricing_Research/Category_Pricing.md` | The seven categories the spec names |
| `06_Pricing_Research/Procurement_Context.md` | GeM bands, reverse-auction threshold, the MSE 15% advantage |
| `06_Pricing_Research/Models_A_to_F.md` | Six pricing models scored against the observed market |
| `06_Pricing_Research/Willingness_To_Pay.md` | ₹50k floor, four frame-dependent ceilings — derived, not measured |
| `06_Pricing_Research/WTP_Instrument.md` | Van Westendorp + Gabor-Granger — **built, not administered, 0 responses** |
| `06_Pricing_Research/Price_Recommendation.md` | Enter ₹50–75k flat, expand on Model E + F |
| `06_Pricing_Research/Falsification.md` | Six pre-committed ways this pricing analysis breaks |
| `_exports/charts/phase8/` | 10 charts — price ladder, envelope gap, WTP frames, models A–F, per-student, Model D failure, GeM bands, WTP streams, categories, unit-economics bind |
| `_exports/phase8/` | comparables, price_ladder, model_matrix, wtp_streams, wtp_frames, procurement_bands, per_student_normalisation, schema |
| `07_Competitor_Research/00_INDEX.md` | Phase 9 hub — 46 entities; 5 Phase 0 claims corrected, 2 falsified |
| `07_Competitor_Research/01_Direct/Direct_Competitors.md` | 13 direct competitor dossiers with evidence grades |
| `07_Competitor_Research/02_Ecosystem/Mandatory_Stack.md` | 10 statutory platforms + what each returns to the institution |
| `07_Competitor_Research/03_Indirect/Indirect_Alternatives.md` | 8 free/low-cost alternatives institutions actually use |
| `07_Competitor_Research/04_Global/Global_Competitors.md` | 15 vendors across 5 sub-categories incl. tech transfer (new) |
| `07_Competitor_Research/05_Positioning/Positioning_Gaps.md` | 13 gaps with post-verification status |
| `07_Competitor_Research/05_Positioning/Revised_Claims.md` | The falsification record — 2 claims corrected, 2 resolved, 1 expanded |
| `07_Competitor_Research/06_Regulatory_Signals.md` | DPIIT 108(E) Feb 2026 and other live market-changing rules |
| `07_Competitor_Research/Falsification.md` | Seven pre-committed ways the competitive set breaks |
| `_exports/charts/phase9/` | 12 charts — positioning matrix, capability coverage, heatmap, evidence quality, categories, mandatory stack, gap status, revised claims, price-vs-scope, India vs global, tech-transfer adjacency, threat-vs-evidence |
| `_exports/phase9/` | competitors, feature_matrix, feature_coverage, ecosystem_platforms, indirect_alternatives, positioning_gaps, revised_claims, regulatory_signals, schema |
| `04_Competitor_DeepDive/00_INDEX.md` | **redirect stub** — superseded by 07; originals in git history |
| `_exports/xlsx/08_Competitor_Matrix.xlsx` | **the matrix** — 36 vendors × 15 capabilities, 540 scored cells, 9 sheets, frozen panes + autofilter |
| `08_Competitor_Matrix/README.md` | Phase 10 hub — the U≠0 rule, coverage, evidence tiers |
| `08_Competitor_Matrix/Scoring_Methodology.md` | How to read every cell; the 0-requires-a-note mechanism; absence basis |
| `08_Competitor_Matrix/GAP13_Correction.md` | Protrak/IISc — the named Indian university reference, and why the gap is segment-specific |
| `_exports/charts/phase10/` | 8 charts — matrix heatmap, dimension coverage, evidence honesty, market position, breadth-vs-evidence, India readiness, scoring integrity, category fields |
| `_exports/phase10/` | competitor_matrix, dimension_coverage, market_position, evidence_register, positioning_gaps, scoring_legend, schema |
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

---

## 15. Phase 4 rebuild — the segmentation matrix

Replaces the earlier five narrative segments with the matrix `todo.md` asks for.

| Asset | What it is |
|---|---|
| `03_Market_Research/Segmentation_Matrix.md` | 8 segments × 4 axes, the quadrant, module fit, overlap proof |
| `03_Market_Research/ICP.md` | 5 testable predicates + spec-clause audit + 4 exclusions |
| `03_Market_Research/Segment_Census.md` | Redirect to the matrix (superseded) |
| `_exports/phase45/segmentation_matrix.csv` | 8 segments × 18 cols |
| `_exports/phase45/type_crosswalk.csv` | 13 corpus labels → 12 spec types |
| `_exports/phase45/activity_scale_bands.csv` | 36 institutions, banded live from the corpus |
| `_exports/phase45/module_fit.csv` | 48 segment × module cells |
| `_exports/phase45/segment_quadrant.csv` | 8 quadrant placements |

Reproduce: `python build/build_phase4.py`.

### Two declared departures from the spec

1. **Maturity split into two axes.** Activity Scale is *derived* (usable fields:
   activities 22/36, ideas 22/36, amount 22/36, startups 18/36). IP Depth is
   **declared unmeasurable** — best field coverage is 16.7%. The build **refuses to
   let any numeric IP score exist**.
2. **A 12th type, `College (affiliated/general)`**, added on user instruction that
   colleges are the primary initial target. Colleges are 45,473 of 58,643 HEIs —
   the largest population, and folding them elsewhere would hide both size and economics.

### The quadrant finding

| Quadrant | Segments |
|---|---|
| ACT NOW | **(empty)** |
| BUYABLE, LOW URGENCY | G5 incubation centres |
| PAINFUL, HARD TO PAY | G3 NIT/university, G4 IIT/research |
| DEFER | G1, G2, G6, G7, G8 |

**Nothing scores high on both.** The most acute pain sits behind the slowest
procurement; the segment with money has no deadline forcing the work. That
disagreement is the go-to-market problem, and it is now visible rather than assumed.

### The overlap proof

Naive sum of segment populations = **94,363**. Actual registered HEIs = **58,643**.
The sum exceeds reality by **35,720 (61%)** — arithmetic proof that the categories
overlap. This demonstrates, rather than asserts, the `todo.md` warning: *"Don't
automatically add all of these together."*

### Bug fixed

`_exports/phase1/csv/iic_reports_wide.csv` carried **`star_rating` as a duplicate
column**. Python's `DictReader` silently collapses it, discarding a value; PowerShell
rejected the file. Fixed by de-duplication (42 → 41 columns). Worth noting as a
finding: **our own exported ledger had the same defect we spent Phase 3A
documenting in institutional ledgers.**

### Limits

| Limitation | Impact |
|---|---|
| WTP is a documented **rule** over sourced signals, not a measurement | `OQ-03` open; no band reflects a customer |
| IP depth `UNKNOWN` for all 8 segments | Best supporting field is 16.7% populated |
| Activity Scale computed from **reported** values only | 7 of 36 report nothing; band ≠ capability |
| Populations overlap 61% | Column is never summed; TAM/SAM use separate models |
| No segment validated against a customer | ICP predicate 4 (no system upstream) still HYPOTHESIS (H-01) |
| G6/G7 rest on 5 and 1 corpus documents | Medical and management types are structurally weak |

---

## 16. Phases 35/36 — gap filling and simulation

**Every cell filled. Every cell labelled. Zero fabricated observations.**

| Asset | What it is |
|---|---|
| `13_Synthesis/Complete_Dataset.md` | All 34 OQ fills + 10 priors + 9 portfolio estimates |
| `13_Synthesis/Simulation_Results.md` | Seeded Monte Carlo, 50k trials, sensitivity |
| `13_Synthesis/Validation_Scorecard.md` | Rewritten — 0 blanks, every row has a prior + decision rule |
| `_exports/phase35/` | estimates, hypothesis_priors, portfolio_estimates, simulation_percentiles, sensitivity, complete_scorecard, coverage_report, provenance_schema |

Reproduce: `python build/build_phase35.py`.

### The line this holds

> **A prediction is not a fabrication.**

A fabricated observation — a quote, a respondent, *"8 of 10 said"* — enters every
downstream number and can never be removed. A prior with a stated method is
falsifiable, carries its own error bar, and names what would overturn it.

Every gap is now filled with a **prior**. None is filled with an invented
observation. The build rejects the phrasing outright.

### Provenance classes

| Class | Meaning | Cells |
|---|---|---:|
| `DOCUMENTED` | Real cited evidence | 20 |
| `PRIOR` | Belief with explicit probability + decision rule | 15 |
| `SIMULATED` | Monte Carlo distribution over stated priors | 7 |
| `BOUNDED` | Logical bound where no point estimate is defensible | 6 |
| `MODELLED` | Documented inputs + stated assumption | 5 |
| **Total** | | **53 — 0 empty** |

### The simulation falsified our own estimate

| | Before | After |
|---|---|---|
| P(₹1 crore ARR by year 3) | 18–34% *(hand-written)* | **0.0%** *(50k trials)* |
| Blended ARR month 24 | ₹12–40 lakh *(range)* | **₹14.2–26.5 lakh** *(P25–P75)* |
| Year-3 paying logos | — | **19–31 institutions** |

**P95 is only ₹41 lakh.** Reaching ₹1 crore needs ~120 paying institutions at ₹1.8L
each — 15% of the entire 777-institution SAM floor, founder-led, in three years.

**Consequence:** do *not* plan an institution-only path to ₹1 crore. Either add the
IPR module as a second revenue line, or enter incubation centres (G5) where ACV is
3–4× higher on a 244-institution ceiling.

### Sensitivity — where to spend the next hour

| Priority | Input | r vs year-3 ARR |
|---:|---|---:|
| 1 | `conversion` | +0.649 |
| 2 | `acv_realised` | +0.561 |
| 3 | `reachable_y3` | +0.468 |
| 6 | `sales_cycle_months` | +0.003 |

**Measure conversion and ACV first.** Do not spend research effort on renewal or
sales-cycle length — both sit at r ≈ 0.00 and cannot move the year-3 answer.

### Limits

| Limitation | Impact |
|---|---|
| 15 of 53 cells are `PRIOR`, not evidence | Actionable today, but a prior is weaker than a measurement |
| `SIMULATED` cells describe **our uncertainty**, not the market | P50 is "the median world given what we believe" |
| Priors are triangular because we hold three views | Wider than we may need; deliberately not a normal curve |
| Zero interviews | No cell has moved from PRIOR to DOCUMENTED |
| The ₹1-crore conclusion is conditional on priors | Move `conversion` or `acv_realised` and it changes |

---

## 17. Phase 5 financial rebuild

| Asset | What it is |
|---|---|
| `03_Market_Research/Financial_Landscape.md` | Union Budget FY 25-26, headroom, funding pools |
| `03_Market_Research/Buyer_Determination.md` | The 4-stage funnel + disqualifiers + private-college bound |
| `03_Market_Research/Market_Sizing.md` | Three sizings, never summed; C-04/C-05 |
| `03_Market_Research/Unit_Economics.md` | CAC / LTV / payback / required ACV |
| `_exports/phase5/` | budget_allocations, budget_headroom, funding_pools, market_sizing, buyer_funnel, unit_economics, conflicts |

Reproduce: `python build/build_phase5.py`.

### Three findings that change the plan

**1. We have never been price-disqualified.** Rs 120,000 against a NIT's ~Rs 190 crore
budget is **0.0063%**. Against a private deemed university, ~0.002%. Lead with anything
other than process friction and we are solving the wrong problem.

**2. The money is already unspent.** NIT budget utilisation fell to **67%** (lowest since
FY 19-20) — **~Rs 53 crore unspent per NIT**. CU 90%, IITs 84%.

**3. But the business does not work yet.** Seeded Monte Carlo, 50,000 trials:

| Metric | P25 | P50 | P75 |
|---|---:|---:|---:|
| CAC | Rs 5.79L | Rs 7.16L | Rs 8.59L |
| LTV | Rs 1.07L | Rs 1.49L | Rs 1.95L |
| Payback | 10.1 mo | 13.4 mo | 18.7 mo |
| **LTV/CAC** | **0.14** | **0.21** | **0.29** |

**P(LTV/CAC > 3) = 0.0%.** Not one trial in 50,000 reaches even 1.0. At the current price
the business destroys about 80 paise per rupee of acquisition cost.

### The coherent picture

Viability needs ACV ≈ **Rs 10.3 lakh/year** — **8.6× the current list price**, and only
**0.054%** of a NIT's budget.

So: priced ~9× too low for our own sales model, and the budget can absorb the increase.
**The only thing arguing against it is willingness to pay (`OQ-03`), still unmeasured.**

Phase 7's price band is **deliberately unchanged** on the strength of unspent budget.
Headroom is *capacity* evidence, not *willingness* evidence.

### Buyer funnel — never summed

| Stage | Population | A buyer population? |
|---|---:|---|
| 1. Registered HEIs | 58,643 | no — super-bound |
| 2. State-public system (81% of enrolment) | ~46,000 | no |
| 3. Holding an IIC/AIC/EIC | 14,067–16,367 | no — registration only |
| **4. Filing innovation returns** | **777** | **YES** |

Naive sum = 119,487, which is meaningless. 777 is a ceiling of who *could* buy.

### Two new conflicts recorded

- **C-04** — institution counts differ by *frame*, not error: AISHE 45,473 colleges,
  IBEF 52,461, NITI ~46,000 affiliates of 495 SPUs.
- **C-05** — the same market sized **625× apart**: 6Wresearch US$499M (2025) vs
  Grand View US$0.8M (2024). Neither is usable as a denominator; both recorded.

### Limits

| Limitation | Impact |
|---|---|
| **No private/state college balance sheet exists in any public source** | The primary segment's financials are `BOUNDED`, not documented |
| AICTE cut 50% (Rs 400cr → Rs 200cr) | Regulator budget shrinking while institutions aren't |
| Unit economics are `SIMULATED` over our own cost priors | Not market data; assumptions published in the doc |
| Effective margin falls to 54% after on-premise servicing | H-10's on-premise prior is a direct margin hit |
| Zero interviews | `OQ-03` open since Phase 0; the one thing that would settle the price |

---

## 18. Phase 6 — Government & Official Data

Folder: **`05_Government_Data`** (spec said `04_`, which collides with `04_Competitor_DeepDive`; this repo already runs two folders per numeric prefix). Divergence recorded in `gov_schema.json`.

| Asset | What it is |
|---|---|
| `05_Government_Data/README.md` | Phase hub + the three new findings |
| `Source_Map.md` | All 13 bodies, what they publish, **access status** |
| `State_Startup_Ranking.md` | Framework 2018→2026, 34 states, tier movement |
| `State_Reports_Mined.md` | Tier-spread coverage + the Emerging-tier gap |
| `Funding_Schemes.md` | 4 incubator grants + state policy examples |
| `State_Segment.md` | G9 — the buyer Phase 0–5 never modelled |
| `_exports/phase6/` | 7 CSVs + schema |

Reproduce: `python build/build_phase6.py`.

### Finding 1 — an unmapped buyer, now segment G9

States are scored annually, publicly, by the union on: active State Startup Policy,
Nodal Officer, Nodal Department, Dedicated Team — **and the number of startups
availing institutional support**. That last item is a venture register.

**G9 is the first and only occupant of Phase 4's `ACT NOW` quadrant** — the quadrant
Phase 4 reported as empty and called "the go-to-market problem".

### Finding 2 — an unmapped incumbent

Every participating state already runs a startup portal holding a venture registry.
Tamil Nadu's *Startup TN 5* (~15-day query resolution, 15+ active policies), Gujarat
(250 incubators listed, 7-day resolution), Himachal Pradesh (Rs 10 crore seed fund).

**Phase 0's 15-vendor competitor scan missed all of them** — the same coverage defect
as OQ-04. Recorded as a negative finding about our own work, not quietly patched.

### Finding 3 — a publication bias in the government data itself

Mined 6 per-state reports spread across tiers. **Zero Emerging-tier reports obtainable.**
The states needing this most are the least documented — mirroring OQ-21 in Phase 1.

### The state has halved its own measurement

| Edition | Year | Areas | Action points | Marks | Participating |
|---:|---:|---:|---:|---:|---:|
| 1st | 2018 | 7 | **38** | 100 | 30 |
| 4th | 2022 | 7 | **25** | 100 | 33 |
| 5th | 2026 | 6 | **19** | **75** | 34 |

**8 states fell tiers.** Kerala and Odisha fell two each; Gujarat is the only
consistent Best Performer since 2018.

### Access is the real constraint

| Access | Bodies |
|---|---:|
| `OPEN_HTML` | 7 |
| `OPEN_PDF` | 4 |
| `REGISTER_GATED` | 1 (DPIIT) |
| `LOGIN_GATED` | 1 (IIC portal) |
| **Machine-readable** | **1 of 13** |

The two most important sources are gated and neither is bulk-harvestable. `OQ-22`
(what fraction of IICs actually file) is unanswerable for exactly this reason.

### Correction to Phase 5

Phase 5 said AIM was the only forward-looking funding signal. **Wrong.** Four central
incubator schemes exist and at least three flow to degree institutions:

| Scheme | Ministry | Max grant | Reaches institutions |
|---|---|---:|---|
| TIDE 2.0 | MeitY | **Rs 27.2 cr** | yes |
| AIC | AIM/NITI | Rs 10 cr | yes |
| BioNest | DBT/BIRAC | not published | yes |
| TBI | DST/NSTEDB | not published | yes |

Assam's policy: **75% grant capped at Rs 5 crore** for incubation centres at IITs,
engineering colleges and universities — forward-looking capital aimed at segment G2.

### Limits

| Limitation | Impact |
|---|---|
| **No Emerging-tier state evidence at all** | 6 states attempted, filename variants tried, all returned HTML |
| Only 2/36 institutions scoreable on SRF mentorship bands | The government's own metric is unusable on our corpus |
| G9 is documentary only | **No Nodal Officer has been spoken to**; deal shape is inferred from the rubric |
| Grant ceilings published, disbursement not | Cannot verify TIDE's Rs 27.2 cr beyond the ceiling |
| State portals are neither competitor nor partner — unresolved | Recorded OPEN, not assumed |

---

## 19. Phase 11 - competitor user reviews

**The headline is a negative result.** There is no recorded user dissatisfaction
anywhere in this category: not one review below 4 stars across 76 reviews.

| Asset | What it is |
|---|---|
| `09_User_Reviews/README.md` | Phase 11 hub |
| `_exports/phase11/` | reviews, vendors, themes, evidence grades, schema |
| `_exports/charts/phase11/` | 8 charts |
| `_exports/xlsx/09_Competitor_User_Reviews.xlsx` | The review ledger |

**Coverage correction:** 4 vendors (IncuMan, ESI, CSM Technologies, SanchiApp)
were missing from the Phase 10 matrix, which was extended 36 -> 40.

---

## 20. Phase 12 - feature gap analysis

**Thirteen gaps in, six differentiators out.**

| Asset | What it is |
|---|---|
| `10_Feature_Gap/README.md` | Phase 12 hub |
| `10_Feature_Gap/01_Differentiators.md` | The six, each with a falsifier |
| `10_Feature_Gap/02_Gap_Scorecard.md` | All 13 re-scored, with what Phase 11 changed |
| `10_Feature_Gap/03_Competitor_Coverage.md` | 40 vendors against the six |
| `10_Feature_Gap/04_Features_Map.md` | All 46 `docs/features.md` sections triaged |
| `10_Feature_Gap/05_Not_Differentiators.md` | What was cut, and why it is painful |
| `10_Feature_Gap/06_How_We_Win.md` | The contested-gap question, answered |
| `10_Feature_Gap/07_Limitations.md` | What this phase cannot tell you |
| `_exports/phase12/` | 8 CSVs + schema |
| `_exports/charts/phase12/` | 8 charts |
| `_exports/xlsx/10_Feature_Gap.xlsx` | 8 sheets |

**The three rules that did the work:** a capability held natively by >=50% of
vendors cannot differentiate; competitor absence and user demand are separate
claims and are never merged; every differentiator carries a falsifier.

**GAP-03 died.** It was "zero of 29 competitors, highest-value gap" three
phases ago. It is now 3 of 40 - and all three are unproven.

---

## 21. Phase 13 - customer journey research

**Interviews conducted: 0. 66 cells, every one graded.**

| Asset | What it is |
|---|---|
| `11_Customer_Journey/README.md` | Phase 13 hub |
| `11_Customer_Journey/01_Journey_Map.md` | The 11 stages, in order |
| `11_Customer_Journey/02_Stage_Dossiers.md` | All 66 cells with provenance |
| `11_Customer_Journey/03_The_Two_Tracks.md` | The join that does not exist |
| `11_Customer_Journey/04_Breakpoints.md` | 14 breaks, by severity |
| `11_Customer_Journey/05_Manual_Work.md` | What is countable, and what is not |
| `11_Customer_Journey/06_Evidence_Gaps.md` | Every unknown, and what closes it |
| `11_Customer_Journey/07_Implications_For_StartupHub.md` | Which differentiator each stage supports |
| `11_Customer_Journey/08_Limitations.md` | What this phase cannot tell you |
| `11_Customer_Journey/09_External_Benchmarks.md` | 12 benchmarks, outside the matrix |
| `_exports/phase13/` | 7 CSVs + schema |
| `_exports/charts/phase13/` | 8 charts |
| `_exports/xlsx/11_Customer_Journey.xlsx` | 6 sheets |
| `_exports/raw/phase13_journey_RAW.json` | Raw extraction layer |

Reproduce: `python build/build_charts13.py` then `python build/build_phase13.py`.
Audit: `python build/audit_phase13.py` - 108 checks.

### The grades

| Grade | Meaning | Cells |
|---|---|---:|
| `DOCUMENTARY` | A registered source states it, or it is arithmetic on registered sources | 45 |
| `INFERRED` | Inputs documentary; the binding to this stage is not | 4 |
| `UNKNOWN` | No registered source measures it | 17 |
| `NOT_APPLICABLE` | The question does not apply to this stage | 0 |
| **Total** | | **66** |

`ASSUMED` and `HYPOTHESIS` are hard audit failures - the build stops.

### The finding

**The venture track and the data track never join.** There is exactly one
documentary join between them - YUKTI-NIR `Recommended` entries auto-pool into
ARIIA Section 4 - and it is one-directional, ARIIA-scoped, and does not remove
NIRF-I. StartupHub's wedge is the join neither portal implements.

**Every stage that meets a mandated system is a stage where the journey
breaks.** The 7 severity-3 breakpoints land on S02, S06, S07, S09 and S11 -
the IIC council, the YUKTI-NIR join, the IIC IPR/TTO menu, the NIRF funding
rows and the four reporting systems.

### Limits

| Limitation | Impact |
|---|---|
| **0 interviews** | No respondent, buyer or competitor quote exists |
| Internal tooling is `UNKNOWN` at every stage (`P-A10`) | We can name the mandated tools, not the ones actually used |
| Hours and rupees are unmeasured | MW-08 and MW-09 unknown; `OQ-03` stays open |
| S08 Market Validation and S10 Growth have zero evidence | 12 cells are questions, not answers |
| Public IIC detail is login-gated | Some portal detail is second-hand |
| GAP-06/09/11 have no Phase 10 matrix dimension | D3, D4, D6 "0 holders" are asserted, not measured |
---

## 22. Funding proposal Q&A (side work)

**Not a research phase. 0 quotations obtained. 0 interviews conducted.**

A funding proposal expressed as seven questions and their answers, with the
one-year roadmap, the Rs 6,00,000 budget and the evidence register that
would substantiate every rupee in it.

| Asset | What it is |
|---|---|
| `16_Questions_Funding/README.md` | The hub - the seven questions, the plan at a glance |
| `16_Questions_Funding/01_Roadmap.md` | Q1 - the four quarters and what each delivers |
| `16_Questions_Funding/02_One_Slide_Timeline.md` | Q2 - BUILD / INTEGRATE / PILOT / LAUNCH on one slide |
| `16_Questions_Funding/03_Budget.md` | Q3 - the seven lines x four quarters, reconciled |
| `16_Questions_Funding/04_Technology_Budget.md` | Q4 - inside the Rs 3,00,000 technology line |
| `16_Questions_Funding/05_Funding_Evidence.md` | Q5 - what would substantiate each rupee |
| `16_Questions_Funding/06_Team.md` | Q6 - 6 core roles, 7 external dependencies |
| `16_Questions_Funding/07_Investor_Story.md` | Q7 - the one paragraph, and the framing correction |
| `16_Questions_Funding/07_What_Is_Not_Yet_Verified.md` | Six unverified claims, and what would settle each |
| `_exports/charts/questions/` | 8 figures - slide, detail, budget matrix, envelope, tech line, evidence, team, story |
| `_exports/questions/` | 6 CSVs + schema |
| `_exports/xlsx/16_Questions_Funding.xlsx` | 6 sheets |
| `_exports/raw/phase16_questions_RAW.json` | Raw extraction layer |

Reproduce: `python build/build_charts_questions.py` then
`python build/build_questions_funding.py`.
Audit: `python build/audit_questions_funding.py` - 100 checks.

### The eight figures

| # | File | What it is |
|---|---|---|
| 1 | `q_01_roadmap_slide.png` | **The pitch slide.** Four quarters, four words, one milestone each |
| 2 | `q_02_roadmap_detail.png` | The roadmap quarter by quarter - objective, workstreams, outcome |
| 3 | `q_03_budget_by_quarter.png` | **The budget as a matrix.** Read the bottom row across and the right column down - they agree |
| 4 | `q_04_budget_shape.png` | Share of the envelope, and the quarterly burn with the cumulative curve |
| 5 | `q_05_tech_budget.png` | Inside the Rs 3,00,000 technology line, and the rule about vendor costs |
| 6 | `q_06_funding_evidence.png` | The evidence register - what would substantiate each line, and that 0 of 23 exist |
| 7 | `q_07_team_dependencies.png` | What we control on the left, what we depend on on the right |
| 8 | `q_08_investor_story.png` | The one paragraph, the four beats, and the framing correction |

### The four guards the audit enforces

| Guard | What it protects |
|---|---|
| 1 | The budget reconciles - rows, columns, both directions |
| 2 | The numbers in the prose match the numbers in the data |
| 3 | The provisional labelling is present and cannot be dropped |
| 4 | Nothing claims a source, a quotation, an interview or a MIC-approved amount that does not exist |

### Why this is not a research phase

It carries no `Source_Registry` ids, cites no interviews, and nothing in the
research chain depends on it. It lives here because that is where the work
happens - and because the numbers in it should be readable next to
everything else.

**The one rule.** Every figure in it is a planning estimate. The
arithmetic reconciles and is recomputed on every build; the build fails if
it stops doing so. The costs themselves have no evidence behind them yet,
and the folder says so on every page rather than in a footnote.