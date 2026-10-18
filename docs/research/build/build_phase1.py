#!/usr/bin/env python3
"""StartupHub Phase 1 exporter - institutional IIC annual report corpus.

Emits, under _exports/phase1/ :
  csv/iic_reports_wide.csv        one row per document, all metric columns
  csv/iic_metrics_long.csv        one row per (document, metric) - tidy, chart-ready
  csv/iic_contradictions.csv      every self-reported inconsistency found
  csv/iic_absence_vocabulary.csv  how each institution expressed "nothing"
  json/iic_corpus.json            full nested records incl. notes and quotes
  json/iic_corpus_schema.json     field definitions for consumers
  md/iic_corpus_analysis.md       the derived findings, written up

Design rule: this script NEVER invents a number. If a metric was not read from
the source it stays absent from `metrics`, and the long-format export records it
as status "not_reported" rather than 0.

Usage:  python build/build_phase1.py
"""

import csv
import json
import shutil
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
ROOT = HERE.parent

import data_p1_iic as D        # noqa: E402
import data_p1_registry as R   # noqa: E402
import data_p1_problems as PR  # noqa: E402

OUT = ROOT / "_exports" / "phase1"
VAULT = ROOT / "01_Evidence_Vault"
PROB = ROOT / "01_Problem_Research"

# Column order of 00_Research_Index/Source_Registry.csv. Phase 1 rows must match
# exactly or the registry stops being one table.
REGISTRY_COLUMNS = ["id", "research_area", "claim_supported", "source_org", "source_type",
                    "tier", "reliability", "url", "publication_date", "access_date",
                    "geography", "customer_segment", "notes"]

# Canonical metric ordering for the long export. Order is meaningful: it runs
# activity -> funnel -> money -> people, which is the order a reader thinks in.
METRIC_ORDER = [
    "activities_total",
    "activities_total_narrative",
    "activities_total_form_kpi",
    "activities_iic_calendar",
    "activities_mic_driven",
    "activities_self_driven",
    "activities_celebration",
    "activities_ie",
    "activities_ipr",
    "ideas_generated",
    "prototypes_developed",
    "ips_total",
    "ips_filed",
    "ips_published",
    "ips_granted",
    "patents_filed",
    "patents_published",
    "patents_granted",
    "designs_filed",
    "startups_total",
    "startups_established",
    "startups_pipeline",
    "tech_transfers",
    "amount_inr",
    "grant_total_inr",
    "innovation_ambassadors",
    "faculty_mentors",
    "star_rating",
]

# Metrics that are knowingly non-exact in the source and must be labelled.
APPROX_SUFFIXES = ("_approx", "_words")


def is_approx(key):
    return key.endswith(APPROX_SUFFIXES)


def metric_value(m, key):
    """Return (value, status) without ever defaulting a missing value to zero."""
    if key in m and m[key] is not None:
        status = "approximate" if is_approx(key) else "reported"
        return m[key], status
    return None, "not_reported"


def build_wide():
    cols = ["id", "institution", "short_name", "institution_type", "state", "year",
            "iic_id", "star_rating", "parse_status", "evidence_tier",
            "access_date", "url", "conversion_rate_pct", "grant_awareness_ratio"]
    cols += [k for k in METRIC_ORDER]
    rows = []
    for r in D.IIC_REPORTS:
        m = r.get("metrics", {})
        row = {c: r.get(c) for c in cols[:12]}
        row["conversion_rate_pct"] = D.conversion_rate(r["id"])
        row["grant_awareness_ratio"] = D.grant_to_awareness_ratio(r["id"])
        for k in METRIC_ORDER:
            row[k] = m.get(k)
        row["pending_extraction"] = r.get("pending_extraction") or ""
        rows.append(row)
    return cols, rows


def build_long():
    cols = ["document_id", "institution", "state", "institution_type", "year",
            "metric", "value", "status", "evidence_tier", "access_date", "url"]
    rows = []
    for r in D.IIC_REPORTS:
        m = r.get("metrics", {})
        for key in METRIC_ORDER:
            val, status = metric_value(m, key)
            rows.append(dict(
                document_id=r["id"], institution=r["short_name"], state=r["state"],
                institution_type=r["institution_type"], year=r["year"],
                metric=key, value=val, status=status,
                evidence_tier=r["evidence_tier"], access_date=r["access_date"], url=r["url"],
            ))
        # Extra metrics outside the canonical order still get exported, flagged.
        for key in sorted(set(m) - set(METRIC_ORDER)):
            val, status = metric_value(m, key)
            rows.append(dict(
                document_id=r["id"], institution=r["short_name"], state=r["state"],
                institution_type=r["institution_type"], year=r["year"],
                metric=key, value=val, status=status,
                evidence_tier=r["evidence_tier"], access_date=r["access_date"], url=r["url"],
            ))
    return cols, rows


# Every distinct way an institution signalled "no value" in the source.
# Collected by hand from the read text; each entry must name its source.
ABSENCE_VOCABULARY = [
    dict(institution="Kanoria Jaipur", field="startups_total", word="NA",
         doc_id="IIC-027",
         note="Same form uses 'Nil' for prototypes, IPs and technology transfers."),
    dict(institution="Kanoria Jaipur", field="prototypes_developed; ips_total; startups_total; grant",
         word="Nil", doc_id="IIC-027", note="Four adjacent fields, four 'Nil's."),
    dict(institution="SSCET", field="amount_inr; grant_total_inr", word="In-progress",
         doc_id="IIC-024",
         note="Report filed after year close. The form has no vocabulary for 'we did not do this'."),
    dict(institution="SSCET", field="startups_total", word="Nil", doc_id="IIC-024", note=""),
    dict(institution="WCC Chennai", field="startups_total", word="In process", doc_id="IIC-033", note=""),
    dict(institution="Brainware University", field="tech_transfers", word="NA", doc_id="IIC-032", note=""),
    dict(institution="Brainware University", field="startups_total", word="Nil", doc_id="IIC-032", note=""),
    dict(institution="SIES CoMS", field="ideas; prototypes; IPs; startups; grant; tech_transfers",
         word="(blank dash)", doc_id="IIC-023",
         note="Six consecutive fields left as a dash rather than zero."),
    dict(institution="MMCOP Pune", field="amount_inr; grant_total_inr", word="RS. 3 L+ / RS. 7 L+",
         doc_id="IIC-035",
         note="Lower bound supplied where an exact amount was not tracked."),
    dict(institution="Teresa's College", field="grant_total_inr", word="(13-item narrative, no number)",
         doc_id="IIC-031",
         note="Numeric field filled with prose spanning six funding sources and one pending patent."),
    dict(institution="Scottish Church Kolkata", field="amount_inr; grant_total_inr",
         word="number + sponsor + purpose", doc_id="IIC-012",
         note="'Rs. 30,000 sponsored by Microbiologists Society India for supporting an awareness "
              "seminar'. Sponsor identity carried inside a money field."),
    dict(institution="IPS Academy Indore", field="amount_inr", word="Amount proposed to be spent",
         doc_id="IIC-022",
         note="Budget intent (INR 8 lakh) filed in a field that elsewhere carries actuals."),
    dict(institution="Institute of Science Nagpur", field="grant_total_inr", word="00",
         doc_id="IIC-011", note="Numeric zero - the only institution that used a real zero."),
]

CONTRADICTIONS = [
    dict(doc_ids="IIC-001 / IIC-001b",
         institution="NIT Calicut",
         field="startups_total",
         value_a="55 startups incubated (13 student/alumni, 4 faculty, 38 other)",
         value_b="17 Student & Faculty Start-ups/Ventures established",
         ratio="3.2x", scope="same PDF, 2024-25",
         source_of_conflict="Narrative section vs IIC-portal KPI form."),
    dict(doc_ids="IIC-001 / IIC-001b",
         institution="NIT Calicut",
         field="amount_inr (awareness spend)",
         value_a="INR 151,488 spent of INR 228,212 available",
         value_b="INR 16,00,000",
         ratio="10.6x", scope="same PDF, 2024-25",
         source_of_conflict="Budget narrative vs IIC-portal KPI form."),
    dict(doc_ids="IIC-001 / IIC-001b",
         institution="NIT Calicut",
         field="grant_total_inr",
         value_a="INR 228,212 total available (implied ceiling)",
         value_b="INR 50,00,000",
         ratio="21.9x", scope="same PDF, 2024-25",
         source_of_conflict="Budget narrative vs IIC-portal KPI form."),
    dict(doc_ids="IIC-011",
         institution="Institute of Science Nagpur",
         field="activities_total",
         value_a="16 (10 IIC + 4 self-driven + 2 celebration)",
         value_b="02",
         ratio="8.0x", scope="same PDF, 2024-25",
         source_of_conflict="Narrative section vs KPI form."),
    dict(doc_ids="IIC-029",
         institution="MIET Jammu",
         field="amount_inr (awareness spend)",
         value_a="Rs 4,10,000 (digits)",
         value_b="Three Lakh Twenty Thousands only = INR 3,20,000 (words)",
         ratio="1.28x", scope="same field, 2023-24",
         source_of_conflict="Figure vs amount-in-words within one field. The WORDS are the "
                            "non-standard form; adjacent grant field has no such mismatch, so "
                            "this is an error not a house convention."),
    dict(doc_ids="IIC-001",
         institution="NIT Calicut",
         field="patents_filed",
         value_a="48 filed in FY 2023-24",
         value_b="24 filed between 1 Jan and 31 Jul 2024",
         ratio="n/a - overlapping windows",
         scope="2023-24 report",
         source_of_conflict="Two different reporting windows in one document. Not a contradiction "
                            "but a live double-count risk for anyone summing this report."),
]


def write_csv(path, cols, rows):
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", newline="", encoding="utf-8-sig") as fh:
        w = csv.DictWriter(fh, fieldnames=cols, extrasaction="ignore")
        w.writeheader()
        for r in rows:
            w.writerow(r)
    return len(rows)


def conversion_rows():
    rows = []
    for r in D.IIC_REPORTS:
        c = D.conversion_rate(r["id"])
        if c is None:
            continue
        rows.append((c, r["short_name"], r["institution_type"], r["year"]))
    return sorted(rows)


def ratio_rows():
    rows = []
    for r in D.IIC_REPORTS:
        g = D.grant_to_awareness_ratio(r["id"])
        if g is None:
            continue
        rows.append((g, r["short_name"], r["institution_type"], r["year"]))
    return sorted(rows)


def write_analysis():
    stats = D.CORPUS_STATS()
    conv = conversion_rows()
    ratios = ratio_rows()
    parsed = [r for r in D.IIC_REPORTS if r["parse_status"] == "parsed"]
    types = {}
    for r in D.IIC_REPORTS:
        types.setdefault(r["institution_type"], []).append(r["short_name"])

    L = []
    A = L.append
    A("# Institutional IIC Annual Report Corpus — Phase 1 Analysis")
    A("")
    A("**Scope.** Every row below was extracted from a document retrieved and read on "
      "18 October 2026. No figure is carried over from a comparable institution, a press "
      "release, or a vendor page.")
    A("")
    A("## 1. Corpus coverage")
    A("")
    A("| Measure | Count |")
    A("|---|---|")
    A(f"| Documents in corpus | {stats['documents']} |")
    A(f"| Target | {stats['target_documents']} |")
    A(f"| Fully parsed (KPIs read) | {stats['parsed']} |")
    A(f"| Partially parsed | {stats['partial']} |")
    A(f"| Header only, KPIs pending | {stats['header_only']} |")
    A(f"| Publishing a spend figure | {stats['with_any_amount']} |")
    A(f"| Splitting awareness vs grant money | {stats['with_grant_split']} |")
    A(f"| Publishing an IIC ID | {stats['named_iic_id']} |")
    A(f"| Publishing a star rating | {stats['with_star_rating']} |")
    A("")
    A("## 2. Institution types present")
    A("")
    A("Document count and distinct-institution count differ where one institution filed "
      "more than one report, or where a single PDF was captured twice because its narrative "
      "and KPI form disagree.")
    A("")
    A("| Type | docs | institutions | Institutions |")
    A("|---|---|---|---|")
    for t, names in sorted(types.items(), key=lambda kv: -len(kv[1])):
        uniq = sorted(set(names))
        A(f"| {t} | {len(names)} | {len(uniq)} | {', '.join(uniq)} |")
    A("")
    A(f"Distinct institutions in corpus: "
      f"{len({r['short_name'] for r in D.IIC_REPORTS})} across {len(D.IIC_REPORTS)} documents.")
    A("")
    A("The presence of non-technical arts, science, management and women's colleges is a "
      "segment-sizing input, not noise: these institutions are inside the IIC reporting "
      "obligation and inside the addressable user base, and they file reports in the same "
      "schema as NITs.")
    A("")
    A("## 3. Finding 1 — `ideas generated` is not one measurement")
    A("")
    A(f"{len(conv)} institutions publish both `ideas generated` and `prototypes developed`. "
      "The implied conversion rate spans **%.1f%% to %.1f%%** — and in one case exceeds 100%%, "
      "which is arithmetically impossible for a same-year funnel."
      % (conv[0][0], conv[-1][0]))
    A("")
    A("| Idea to prototype | Institution | Type | Year |")
    A("|---|---|---|---|")
    for c, n, t, y in conv:
        flag = " (!)" if c > 100 else (" (!)" if c > 85 else "")
        A(f"| {c:.1f}%{flag} | {n} | {t} | {y} |")
    A("")
    A("A conversion rate above 100% cannot mean \"of the ideas we counted this year, this "
      "many became prototypes\". It can only mean the two fields were populated from "
      "different populations or different time windows. Institutions reporting 33–38% "
      "(Kongu, Manav Rachna, Institute of Science Nagpur) are describing a plausible funnel. "
      "Institutions reporting 87–100% (PIET, EGSPEC, NIT Andhra Pradesh, NRCM) are not "
      "describing the same thing.")
    A("")
    A("**Consequence for StartupHub:** any cross-institution benchmark built on these fields "
      "is invalid. A tool that displays \"prototype conversion\" across an institution's own "
      "history is defensible; one that ranks institutions on it is not.")
    A("")
    A("## 4. Finding 2 — Six documented self-contradictions")
    A("")
    A("These are not cross-institution disagreements. Each row is an inconsistency **inside a "
      "single document**, where the narrative and the KPI form disagree, or where digits and "
      "words disagree.")
    A("")
    A("| Institution | Field | Value A | Value B | Divergence |")
    A("|---|---|---|---|---|")
    for c in CONTRADICTIONS:
        A(f"| {c['institution']} | `{c['field']}` | {c['value_a']} | {c['value_b']} | {c['ratio']} |")
    A("")
    A("**Consequence for StartupHub:** the IIC-portal KPI form is not a reliable target. An "
      "institution cannot reconcile its own narrative against its own submission, and the "
      "person who must reconcile it is the IIC coordinator or IIC President — a part-time "
      "role in almost every institution observed. This is the single strongest argument for "
      "a reconciliation layer rather than another data-entry form.")
    A("")
    A("## 5. Finding 3 — No controlled vocabulary for \"nothing happened\"")
    A("")
    A("Across the corpus, institutions signal absence at least seven different ways inside "
      "the same mandated form:")
    A("")
    A("| Institution | Field | How absence was written |")
    A("|---|---|---|")
    for a in ABSENCE_VOCABULARY:
        A(f"| {a['institution']} | `{a['field']}` | {a['word']} |")
    A("")
    A("Only **one** institution (Institute of Science Nagpur, IIC-011) wrote a numeric zero "
      "in a money field. Every other absence is prose. The single most advanced data point in "
      "the corpus is Teresa's College (IIC-031), whose numeric grant field contains no number "
      "at all — instead a 13-item narrative spanning DST, three separate CSR sources, KSUM, "
      "AICTE YUKTI, ICSSR, NCERT, SERB, UNDP and Nidhi Prayas, plus a YIP prize, plus one "
      "student described as *\"currently working through the procedure to see if the concept can "
      "be patented\"*. The adjacent awareness-spend field in that same report was entered "
      "cleanly, which proves the failure is specific to grant data, not to data entry generally.")
    A("")
    A("**Consequence for StartupHub:** a single-value money field is structurally incapable of "
      "representing an institution's real grant portfolio. This is a schema defect with a "
      "product-shaped answer.")
    A("")
    A("## 6. Finding 4 — Grant money swamps awareness money, and is often the wrong money")
    A("")
    A("| Grant ÷ awareness | Institution | Type | Year |")
    A("|---|---|---|---|")
    for g, n, t, y in ratios:
        A(f"| {g:.1f}x | {n} | {t} | {y} |")
    A("")
    A("The two extremes are instructive. Dr. N.G.P. Arts and Science College reports 76.0x — "
      "but the grant figure reconciles exactly to two DBT academic grants (INR 1,25,95,438 + "
      "INR 62,30,583 = INR 2,16,81,371), which are **not** innovation funding. EGSPEC reports "
      "52.0x. Meanwhile Institute of Science Nagpur, SIGCE and Kanoria all report exactly zero "
      "grant support.")
    A("")
    A("**Consequence for StartupHub:** the field labelled \"amount grant or fund supported to "
      "student & faculty lead innovations, start-ups and IPR\" cannot be used as a market-size "
      "proxy. It captures whatever large government grants the institution happened to receive "
      "that year. Any Phase 1 cost or budget claim built on it would be unsound.")
    A("")
    A("## 7. Finding 5 — Activity counts do not predict outcomes")
    A("")
    A("Three institutions in the corpus ran comparable or higher activity counts with far "
      "fewer results:")
    A("")
    A("| Institution | Activities | Ideas | Prototypes | IPs | Startups |")
    A("|---|---|---|---|---|---|")
    A("| Vivekanandha College (IIC-026) | 112 | 48 | 10 | 1 | — |")
    A("| Kanoria Jaipur (IIC-027) | 79 | 21 | 0 | 0 | 0 |")
    A("| REC Raghu (IIC-019) | 94 | 7 | 4 | 0 | 4 |")
    A("| WCC Chennai (IIC-033) | 84 | 25 | 1 | 5 | 0 |")
    A("| CMRIT (IIC-016) | 164 | 400 | 70 | 183 | 9 |")
    A("")
    A("REC Raghu ran 94 activities to produce 7 ideas, 4 prototypes and **zero** IPs — 23.5 "
      "activities per startup. Meanwhile EGSPEC (IIC-034) reported 843 ideas and 784 prototypes "
      "from 42 activities. Activity volume and idea volume are not related in this corpus.")
    A("")
    A("**Consequence for StartupHub:** ARIIA star bands are driven substantially by activity "
      "counts and awareness spend. Institutions are therefore optimising activity counts, and "
      "the activity count is the cheapest field in the form to inflate. That is a predictable "
      "behaviour to design for, not a scandal.")
    A("")
    A("## 8. What this does NOT yet establish")
    A("")
    A("- No primary interviews have been conducted. Everything above is documentary.")
    A("- The corpus is self-selecting: institutions that publish well-written IIC reports. "
      "These may be better resourced than median, or may simply be better at reporting. The "
      "direction of that bias is unknown and is recorded as open question OQ-21.")
    A("- `ideas generated` definitions have not been confirmed with any institution, so the "
      "spread in §3 is *evidence of inconsistency*, not a measured taxonomy.")
    A("- Star ratings were recorded only where an institution self-reported one. Six of "
      f"{stats['documents']} documents. ARIIA has not been independently queried for all "
      "corpus institutions.")
    A(f"- The corpus is {stats['documents']} documents against a target of "
      f"{stats['target_documents']}, with {stats['header_only']} documents still pending KPI "
      "extraction.")
    A("")
    path = OUT / "md" / "iic_corpus_analysis.md"
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text("\n".join(L), encoding="utf-8")
    return path


def build_registry_rows():
    """Phase 1 rows for Source_Registry.csv, in the existing 13-column shape."""
    rows = []
    n = 0
    for rec in D.IIC_REPORTS:
        meta = R.P1_SOURCE_METADATA.get(rec["id"])
        if not meta:
            raise KeyError(f"{rec['id']} has no entry in data_p1_registry.P1_SOURCE_METADATA. "
                           "Every Phase 1 document must state what it is used to prove.")
        claim, geo, segment, reliability = meta
        n += 1
        rows.append({
            "id": f"P1-{n:03d}",
            "research_area": R.P1_RESEARCH_AREA,
            "claim_supported": claim,
            "source_org": rec["institution"],
            "source_type": f"Institutional IIC annual report ({rec['year']})",
            "tier": rec["evidence_tier"],
            "reliability": reliability,
            "url": rec["url"],
            "publication_date": rec.get("year"),
            "access_date": rec["access_date"],
            "geography": geo,
            "customer_segment": segment,
            "notes": f"corpus_id={rec['id']}; parse_status={rec['parse_status']}"
                     + (f"; contradiction_of={rec['contradiction_of']}"
                        if rec.get("contradiction_of") else ""),
        })
    return rows


def merge_registry(rows):
    """Append Phase 1 rows to the live registry, skipping any already present.

    Idempotent: re-running the build will not duplicate rows.
    """
    reg = ROOT / "00_Research_Index" / "Source_Registry.csv"
    with reg.open("r", encoding="utf-8-sig", newline="") as fh:
        existing = list(csv.DictReader(fh))
    have = {r["id"] for r in existing}
    todo = [r for r in rows if r["id"] not in have]
    if not todo:
        return len(existing), 0
    fields = list(existing[0].keys())
    missing = set(fields) ^ set(REGISTRY_COLUMNS)
    if missing:
        raise SystemExit(f"Source_Registry.csv columns changed: {sorted(missing)}. "
                         "Update REGISTRY_COLUMNS in build_phase1.py.")
    with reg.open("w", encoding="utf-8", newline="") as fh:
        w = csv.DictWriter(fh, fieldnames=fields)
        w.writeheader()
        for r in existing + todo:
            w.writerow(r)
    return len(existing), len(todo)


def write_quote_vault():
    """01_Evidence_Vault/Quotes/ - verbatim, attributed, no opinion."""
    qdir = VAULT / "Quotes"
    qdir.mkdir(parents=True, exist_ok=True)
    cols = ["qid", "quote", "speaker_role", "speaker_name", "institution", "doc_id",
            "year", "tier", "extraction_method", "access_date", "url",
            "recheck_before_external_use", "why_it_matters"]
    write_csv(qdir / "Phase1_Institutional_Quotes.csv", cols, R.QUOTES)

    L = ["# Quote Vault - Phase 1 Institutional Evidence", "",
         "**Verbatim only.** Every string below was read in the source document named in its row. "
         "Nothing here is paraphrased, summarised or reconstructed.", "",
         "## How to use this file", "",
         "- `tier` follows the repository standard in `00_Research_Index/README.md` section 3.",
         "- `extraction_method = pdf_text_layer` means the string came from a machine-extracted text "
         "layer rather than a visually confirmed page. PDF text layers scramble ligatures, bullet "
         "glyphs and Devanagari conjuncts.",
         "- **Every quote is flagged `recheck_before_external_use = TRUE`.** Re-verify against the "
         "original PDF page before any of this appears in a pitch, deck or external document.",
         "- To quote one of these, find `doc_id` in `../01_Problem_Research/01_Evidence_Corpus/` or in "
         "`_exports/phase1/csv/iic_reports_wide.csv` to get the full document record.", "",
         "## Quotes", ""]
    for q in R.QUOTES:
        L += [f"### {q['qid']} - {q['institution']} ({q['year']})", "",
              f"> {q['quote']}", "",
              f"- **Attributed to:** {q['speaker_role']}"
              + (f" - {q['speaker_name']}" if q.get("speaker_name") else ""),
              f"- **Corpus record:** `{q['doc_id']}`  |  **Tier:** {q['tier']}  |  "
              f"**Accessed:** {q['access_date']}",
              f"- **Source:** <{q['url']}>",
              f"- **Extraction:** {q['extraction_method']} - re-verify visually before external use",
              f"- **Why it is here:** {q['why_it_matters']}", ""]
    p = qdir / "Phase1_Institutional_Quotes.md"
    p.write_text("\n".join(L), encoding="utf-8")
    return len(R.QUOTES)


def write_corpus_index():
    """01_Problem_Research/01_Evidence_Corpus/ - the mined-document index."""
    cdir = PROB / "01_Evidence_Corpus"
    cdir.mkdir(parents=True, exist_ok=True)
    stats = D.CORPUS_STATS()
    by_status = {}
    for r in D.IIC_REPORTS:
        by_status.setdefault(r["parse_status"], []).append(r)

    L = ["# Phase 1 Evidence Corpus", "",
         "Raw retrieved documents, organised by class. This folder is the **index**; the machine-readable "
         "records live in `build/data_p1_iic.py` and export to `_exports/phase1/`.", "",
         "## Corpus classes and their tiers", "",
         "| Class | Tier | Documents | Status |", "|---|---|---|---|"]
    for cls, tier in D.CORPUS_TIER_MAP.items():
        n = len(D.IIC_REPORTS) if cls == "Institutional_IIC_Reports" else 0
        st = "mined" if n else "not started"
        L.append(f"| `{cls}/` | {tier} | {n or '-'} | {st} |")
    L += ["",
          "Tier definitions are the repository standard - see `00_Research_Index/README.md` section 3. "
          "An institution's own annual report is **T1**: it is the origin of the fact about that "
          "institution. See Decision Log D-016 for the correction that got us there.", "",
          "## Institutional IIC reports - extraction status", "",
          f"Target: **{stats['target_documents']} documents.** Currently "
          f"**{stats['documents']}** ({stats['parsed']} parsed, {stats['partial']} partial, "
          f"{stats['header_only']} pending KPI extraction).", ""]
    for status in ("parsed", "partial", "header_only"):
        recs = by_status.get(status, [])
        if not recs:
            continue
        L += [f"### {status.replace('_', ' ').title()} ({len(recs)})", "",
              "| Corpus ID | Institution | Type | State | Year | IIC ID | URL |",
              "|---|---|---|---|---|---|---|"]
        for r in recs:
            L.append(f"| `{r['id']}` | {r['short_name']} | {r['institution_type']} | {r['state']} "
                     f"| {r['year'] or '-'} | {r['iic_id'] or '-'} | [doc]({r['url']}) |")
        L.append("")

    L += ["## What still has to be mined", "",
          "- 4 further IIC reports to reach the 40-document target.",
          "- 20 ARIIA / NIRF institutional submission forms.",
          "- 20 peer-reviewed / institutional research papers.",
          "- 15 government procurement tenders.",
          "- Vendor case studies (Tier 4 only, never load-bearing).", "",
          "## Integrity rules for this corpus", "",
          "1. **A missing metric means not read, never zero.** See Decision Log D-014.",
          "2. **Same-document contradictions are kept as two records**, never reconciled. See D-013.",
          "3. **A source that will not parse is logged as `unparseable`, not estimated.**", "",
          "Derived analysis: `_exports/phase1/md/iic_corpus_analysis.md`", ""]
    p = cdir / "README.md"
    p.write_text("\n".join(L), encoding="utf-8")
    return stats


def write_problem_analyses():
    """01_Problem_Research/A_Institutional_Problems/ - the ten written analyses."""
    errs = PR.validation()
    if errs:
        raise SystemExit("Problem records failed validation:\n  - " + "\n  - ".join(errs))

    adir = PROB / "A_Institutional_Problems"
    adir.mkdir(parents=True, exist_ok=True)
    quotes_by_id = {q["qid"]: q for q in R.QUOTES}
    corpus_by_id = {r["id"]: r for r in D.IIC_REPORTS}
    written = []

    for p in PR.PROBLEMS:
        L = [f"# {p['id']} - {p['title']}", "",
             f"**Evidence grade:** `{p['evidence_grade']}` - {PR.EVIDENCE_GRADES[p['evidence_grade']]}",
             "",
             f"**Severity:** `{p['severity']}` - {PR.SEVERITY_SCALE[p['severity']]}",
             "",
             f"**Corpus documents cited:** {', '.join('`' + c + '`' for c in p['cited_corpus_ids'])}",
             "",
             "> **Not an observed user problem.** Phase 3 user interviews have not been conducted. "
             "This is documentary analysis of what institutions publish about themselves. Do not "
             "present it to a third party as an observed user problem.", "",
             "---", "", "## Statement", "", p["statement"], "",
             "## Evidence", ""]
        for e in p["evidence"]:
            L.append(f"- {e}")
        L += ["", "### What is still missing", "", p["evidence_gap"], "",
              "## Who experiences it", "", p["who_experiences_it"], "",
              f"## Severity - {p['severity']}", "", p["severity_justification"], "",
              "## Frequency", "", p["frequency"], "",
              "## Current workaround", "", p["current_workaround"], "",
              "## Quantified cost", "", p["quantified_cost"], "",
              "## Failure consequence", "", p["failure_consequence"], "",
              "## Potential fixer", "", p["potential_fixer"], "",
              "## Competitive implication", "", p["competitive_implication"], ""]

        if p["quotes"]:
            L += ["## Verbatim evidence quoted", ""]
            for qid in p["quotes"]:
                q = quotes_by_id[qid]
                L += [f"**{qid}** - {q['institution']} ({q['year']}), `{q['doc_id']}`", "",
                      f"> {q['quote']}", "",
                      f"<{q['url']}> - accessed {q['access_date']}, tier {q['tier']}. "
                      "Extracted from a PDF text layer: **re-verify visually before external use.**",
                      ""]

        L += ["## Source documents", "", "| Corpus ID | Institution | Type | State | Year |",
              "|---|---|---|---|---|"]
        for c in p["cited_corpus_ids"]:
            r = corpus_by_id[c]
            L.append(f"| `{r['id']}` | {r['short_name']} | {r['institution_type']} | "
                     f"{r['state']} | {r['year'] or '-'} |")
        L += ["", "Full records: `_exports/phase1/csv/iic_reports_wide.csv`. "
              "Derived findings: `_exports/phase1/md/iic_corpus_analysis.md`.", ""]

        path = adir / f"{p['id']}_{p['title'][:52].replace(' ', '_').replace(',', '').replace('/', '')}.md"
        path.write_text("\n".join(L), encoding="utf-8")
        written.append((p, path))

    write_problem_index(written, adir)
    return written


def write_problem_index(written, adir):
    grades = PR.grade_counts()
    sevs = PR.severity_counts()
    L = ["# Section A - Ten Institutional Problems", "",
         "todo.md Section A asks for evidence on ten institutional problems. This folder holds one "
         "analysis per problem, each built to the same nine fields.", "",
         "## Read this first", "",
         "**No user interviews have been conducted.** Phase 3 has not started. Everything here is "
         "documentary analysis of documents institutions published about themselves. This is "
         "evidence about *reporting behaviour*, which is real and useful, but it is not the same "
         "thing as evidence about what users say they struggle with. Phase 3 may revise these "
         "rankings substantially - that is the correct outcome, not a problem with the work.", "",
         "## Evidence grades", "",
         "| Grade | Meaning |", "|---|---|"]
    for g, m in PR.EVIDENCE_GRADES.items():
        L.append(f"| `{g}` | {m} |")
    L += ["", f"Distribution: "
          + ", ".join(f"{v} {k}" for k, v in sorted(grades.items(), key=lambda kv: -kv[1])) + ".", "",
          "### Severity distribution", "",
          "| Severity | Meaning | n |", "|---|---|---|"]
    for s in ["CRITICAL", "HIGH", "MEDIUM", "LOW"]:
        if sevs.get(s):
            L.append(f"| `{s}` | {PR.SEVERITY_SCALE[s]} | {sevs[s]} |")
    L += ["", "## The ten problems", "",
          "| # | ID | Problem | Grade | Severity |", "|---|---|---|---|---|"]
    for p, _ in written:
        L.append(f"| {p['number']} | [`{p['id']}`]({p['id']}_"
                 f"{p['title'][:52].replace(' ', '_').replace(',', '').replace('/', '')}.md) "
                 f"| {p['title']} | `{p['evidence_grade']}` | `{p['severity']}` |")
    L += ["", "## What is strongest and what is weakest", "",
          "**Strongest.** `P-A07` (IP deadlines and IP records) is the only CRITICAL. It is the "
          "strongest finding in Phase 1 because it is corroborated from two independent directions: "
          "peer-reviewed TTO literature on the cost of missed prosecution deadlines, and 36 "
          "institutional reports in which no deadline field appears. It also independently confirms "
          "the Phase 0 thesis that no competitor has an IPR module.", "",
          "**Weakest, and deliberately labelled.** `P-A03` (incubator cohorts) is graded HYPOTHESIS "
          "and `P-A05` (mentorship) is SINGLE-SOURCE. Both describe plausible institutional problems "
          "that this corpus **cannot** evidence. P-A03 in particular is an absence-of-evidence "
          "finding: the IIC form does not ask about cohorts, so their absence from the reports "
          "proves nothing about whether institutions manage them.", "",
          "**The gap that matters most.** `P-A10` shows institutional data is consolidated manually "
          "across departments, but no retrieved document reveals any institution's *internal* "
          "tooling. We have only ever seen the export. Until Phase 3 establishes what sits "
          "upstream - Excel, an ERP, or paper - todo.md Section B's \"Excel dependency\" claims "
          "remain unevidenced and must not be asserted in any external material.", "",
          "---", "",
          "Section B (operational problems) and Section C (evidence register) have not been written.",
          "Corpus index: [`../01_Evidence_Corpus/README.md`](../01_Evidence_Corpus/README.md)", ""]
    (adir / "README.md").write_text("\n".join(L), encoding="utf-8")


def write_raw_layer():
    """_exports/raw/ - the raw work layer. Machine-extracted text, not edited."""
    raw = ROOT / "_exports" / "raw"
    raw.mkdir(parents=True, exist_ok=True)
    p = raw / "phase1_iic_corpus_RAW.json"
    payload = dict(
        note="Raw Phase 1 extraction layer. Machine-readable; carries the same records as "
             "_exports/phase1/json/iic_corpus.json plus the quote vault and academic "
             "evidence, with no interpretation added. Regenerated - do not hand-edit.",
        generated="2026-10-18",
        generated_by="build/build_phase1.py",
        evidence_tiers=D.TIERS,
        corpus_tier_map=D.CORPUS_TIER_MAP,
        parse_status_vocabulary=D.PARSE_STATUS,
        corpus_stats=D.CORPUS_STATS(),
        documents=D.IIC_REPORTS,
        registry_rows=build_registry_rows(),
        quotes=R.QUOTES,
        academic_evidence=R.ACADEMIC_EVIDENCE,
        problem_analyses_section_a=PR.PROBLEMS,
        problem_grade_scale=PR.EVIDENCE_GRADES,
        problem_severity_scale=PR.SEVERITY_SCALE,
    )
    p.write_text(json.dumps(payload, indent=2, ensure_ascii=False), encoding="utf-8")
    return p


def main():
    print("=" * 78)
    print("  PHASE 1 — IIC ANNUAL REPORT CORPUS EXPORT")
    print("=" * 78)
    OUT.mkdir(parents=True, exist_ok=True)

    cols, rows = build_wide()
    n = write_csv(OUT / "csv" / "iic_reports_wide.csv", cols, rows)
    print(f"  csv/iic_reports_wide.csv         {n:4d} documents x {len(cols)} cols")

    cols, rows = build_long()
    n = write_csv(OUT / "csv" / "iic_metrics_long.csv", cols, rows)
    print(f"  csv/iic_metrics_long.csv         {n:4d} document-metric rows")

    n = write_csv(OUT / "csv" / "iic_contradictions.csv",
                  list(CONTRADICTIONS[0].keys()), CONTRADICTIONS)
    print(f"  csv/iic_contradictions.csv       {n:4d} self-reported inconsistencies")

    n = write_csv(OUT / "csv" / "iic_absence_vocabulary.csv",
                  list(ABSENCE_VOCABULARY[0].keys()), ABSENCE_VOCABULARY)
    print(f"  csv/iic_absence_vocabulary.csv   {n:4d} absence expressions")

    payload = dict(
        generated="2026-10-18",
        generated_by="build/build_phase1.py",
        evidence_tiers=D.TIERS,
        parse_status_vocabulary=D.PARSE_STATUS,
        corpus_stats=D.CORPUS_STATS(),
        contradictions=CONTRADICTIONS,
        absence_vocabulary=ABSENCE_VOCABULARY,
        documents=D.IIC_REPORTS,
    )
    p = OUT / "json" / "iic_corpus.json"
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(json.dumps(payload, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"  json/iic_corpus.json             {len(D.IIC_REPORTS):4d} nested records")

    schema = dict(
        generated="2026-10-18",
        description="One record per IIC annual report document. An institution may appear "
                    "more than once (different years, or two records for the same PDF when "
                    "its narrative and KPI form disagree - see `contradiction_of`).",
        fields={
            "id": "Stable corpus identifier.",
            "institution": "Full legal/official name as published.",
            "institution_type": "NIT/engineering/pharmacy/arts-science/management. Segment sizing input.",
            "state": "Indian state or UT.",
            "year": "Reporting year or academic year of the document.",
            "iic_id": "IIC portal identifier where the institution published it. Often absent.",
            "star_rating": "ARIIA/IIC star band, self-reported by the institution.",
            "url": "Direct document URL, retrieved 2026-10-18.",
            "evidence_tier": "Repository standard (00_Research_Index/README.md s3). IIC annual reports are T1 - an institution's own report about itself is a primary source. See CORPUS_TIER_MAP for the full corpus mapping.",
            "parse_status": "One of: " + ", ".join(sorted(D.PARSE_STATUS)) + ".",
            "metrics": "Only values actually read from the document. Absent key = not read, NOT zero.",
            "metrics_note": "Interpretation guard. Read this before quoting any figure.",
            "contradiction_of": "Set when this record captures a value that conflicts with another record.",
            "pending_extraction": "What still has to be read from this document.",
            "quote_candidates": "Verbatim strings usable as evidence quotes, with their source context.",
        },
        metric_semantics={
            "amount_inr": "Rupees spent on promotion/awareness of innovation & entrepreneurship on campus. Field name in source: 'Amount spent on promotion and awareness generation'.",
            "grant_total_inr": "Rupees of grant or fund support reaching student/faculty-led innovation, startups and IPR. NOTE: observed to absorb unrelated large government research grants.",
            "activities_total": "Count of I&E and IPR activities. May be stated in narrative, KPI form, or both, and may disagree.",
            "ips_total": "Combined generated/published/granted IP count as the institution summarises it. Institutions frequently mix current-year and cumulative in this field.",
        },
        known_defects=[
            "amount_inr and grant_total_inr are reported by 22 of 36 documents; the rest use prose or ranges.",
            "'ideas generated' is not a consistent measurement - see iic_corpus_analysis.md section 3.",
            "Six same-document contradictions are catalogued in iic_contradictions.csv.",
        ],
    )
    p = OUT / "json" / "iic_corpus_schema.json"
    p.write_text(json.dumps(schema, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"  json/iic_corpus_schema.json       field definitions + known defects")

    p = write_analysis()
    print(f"  md/iic_corpus_analysis.md         {p.stat().st_size:,} bytes")

    print()
    print("  -- writing into the research tree --")
    nq = write_quote_vault()
    print(f"  01_Evidence_Vault/Quotes/         {nq} verbatim quotes (csv + md)")

    stats = write_corpus_index()
    print(f"  01_Problem_Research/01_Evidence_Corpus/README.md   "
          f"{stats['documents']}/{stats['target_documents']} docs indexed")

    written = write_problem_analyses()
    print(f"  01_Problem_Research/A_Institutional_Problems/       "
          f"{len(written)} analyses + README")
    for p, path in written:
        print(f"      {p['id']}  {p['evidence_grade']:<14} {p['severity']:<9} {path.name}")

    reg_rows = build_registry_rows()
    before, added = merge_registry(reg_rows)
    print(f"  00_Research_Index/Source_Registry.csv  +{added} rows ({before} -> {before + added})")

    p = write_raw_layer()
    print(f"  _exports/raw/                      {p.name} ({p.stat().st_size:,} bytes)")

    print()
    s = D.CORPUS_STATS()
    print(f"  Corpus: {s['documents']}/{s['target_documents']} documents "
          f"({s['parsed']} fully parsed, {s['partial']} partial, {s['header_only']} pending)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
