# Quarantine — corrupt raw artefacts

Files here are **not evidence**. They are retained only so the failure is auditable rather than
silently deleted. Per the repository rule *"contradictions are logged, not smoothed"*, a broken
artefact gets recorded, not removed without trace.

Nothing in this folder may be cited, hashed into `manifest.json` as evidence, or counted in any
statistic.

---

## `phase0_research_SEGMENT_CENSUS_RAW.pdf.dump`

| | |
|---|---|
| Former path | `_exports/raw/phase0_research_SEGMENT_CENSUS_RAW.md` |
| Size | 2,342,791 bytes |
| Status | **Corrupt. Content unrecoverable.** |
| Detected | 2026-10-18, during the Phase 3 file-size audit |

### What it actually is

Not a markdown research dump. It is a **PDF saved with a `.md` extension.**

Evidence:

- First bytes are `%PDF-1.7` — the PDF file signature.
- 74.1% of bytes in the first 20 KB are non-text (high-bit, or control characters outside
  `\t` `\n` `\r`).
- Contains PDF object grammar throughout: `endobj` (100×), `stream` (31×), `endstream` (31×),
  `/Filter /FlateDecode`, `/Type /Font`, `/CropBox [ 0.0 0.0 612.0 792.0 ]`.
- Contains `/Filter /DCTDecode` — embedded JPEG image data, i.e. scanned page images.

It has **zero headings, zero prose, zero citations.** 10,779 lines of which none are readable text.

### Why it matters

It was the largest single file in the repository — **26% of everything in `_exports/raw/`** — and it
was being SHA-256 hashed into `manifest.json` on every build, presenting itself to any consumer as
verified raw research.

That is the specific failure this repository's integrity rules exist to prevent: an artefact whose
provenance looks intact (it has a hash, it has a name, it is in the manifest) while carrying no
information at all.

### What was lost

The *raw layer* for the segment-census research topic only. The **summary survives intact** at
[`../02_Landscape_Map/Segment_Census.md`](../02_Landscape_Map/Segment_Census.md), and the derived
denominators survive in `build/data_market.py` → `_exports/csv/` and `_exports/xlsx/`. No
conclusion in this repository depended on the corrupt file alone.

What is genuinely lost is the **audit trail** — the ability to check whether a denominator in
`Segment_Census.md` was transcribed correctly from its source PDF. That check must now be redone from
the original sources listed in `Source_Registry.csv` if it is ever required. Logged as **OQ-31**.

### How it happened

Almost certainly a PDF was fetched during Phase 0 and written to disk verbatim instead of being
text-extracted. The other five `phase0_research_*_RAW.md` files are genuine text (1.2–4.1%
non-ASCII, which is normal for UTF-8 prose) and are unaffected.

### Prevention

`_exports/raw/` now contains only text files. Any future write to the raw layer should be checked
for a `%PDF` signature before being accepted.

---

Back to [Research Index](../00_Research_Index/README.md)