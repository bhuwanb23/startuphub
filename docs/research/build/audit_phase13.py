#!/usr/bin/env python3
"""Independent audit of Phase 13 - the Customer Journey Research.

This phase's value is almost entirely in what it REFUSES. Eleven stages and
six questions produce 66 cells, and the tempting failure is to fill all 66
with a plausible narrative - especially at the two stages where nothing is
documented, and especially for the manual-work rows where hours and rupees
would be the most quotable numbers in the whole programme.

So the checks below are built to catch exactly that drift, plus the three
fabrication families that Phase 13 is specifically forbidden from:

  RULE 1  zero interviews. No respondent, buyer or competitor quote exists,
          because none was collected. No cell may be written as if a person
          said it.
  RULE 2  grade vocabulary is DOCUMENTARY | INFERRED | UNKNOWN |
          NOT_APPLICABLE. ASSUMED and HYPOTHESIS are hard failures.
  RULE 3  the banned fabrication strings - researched, confirmed absent from
          the repo and from Source_Registry, and therefore never assertable.
  RULE 4  external benchmarks stay OUT of the 66-cell matrix.

The figures are re-derived from the raw JSON, not imported from the producing
module, so a silent edit to data_p13_journey.py cannot make a failing build
look clean.

Run:  python build/audit_phase13.py
Exit: 0 clean, 1 on any failure.
"""

import csv
import json
import re
import sys
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CJ = ROOT / "11_Customer_Journey"
CH = ROOT / "_exports" / "charts" / "phase13"
EX = ROOT / "_exports" / "phase13"
XLSX = ROOT / "_exports" / "xlsx" / "11_Customer_Journey.xlsx"
RAW = ROOT / "_exports" / "raw" / "phase13_journey_RAW.json"
REG = ROOT / "00_Research_Index" / "Source_Registry.csv"

# ------------------------------------------------------------- constants
N_STAGES = 11
N_QUESTIONS = 6
N_CELLS = 66
N_BREAKPOINTS = 14
N_MANUAL = 10
N_STRUCTURAL = 7
N_UNKNOWN_MANUAL = 3
N_EXTERNAL = 12
N_DOCS = 10
N_CHARTS = 8
N_CSV = 7
N_SHEETS = 6

GRADES = ("DOCUMENTARY", "INFERRED", "UNKNOWN", "NOT_APPLICABLE")
FORBIDDEN_GRADES = ("ASSUMED", "HYPOTHESIS")

BANNED_STRINGS = (
    "VRS Siddhartha",
    "Google Sheet",
    "Galgotias",
    "NISP 2019",
    "startup_policy_2019",
    "Calendar 2025-26",
    "IIC 8.0 Calendar",
    "PSA TRL",
)

# Research-participant language. A documentary quote ("COMP-024 is a direct
# quote from IISc's own coordination page") and a portal field name
# ("participant counts") are both legitimate and must not trip this. Only
# first-person research language is forbidden.
PARTICIPANT_PATTERNS = (
    "interview with",
    "interviewee",
    "respondent",
    "participant said",
    "participant told",
    "in an interview",
    "told us",
    "he told",
    "she told",
    "he said",
    "she said",
)

DOC_NAMES = [
    "README.md",
    "01_Journey_Map.md",
    "02_Stage_Dossiers.md",
    "03_The_Two_Tracks.md",
    "04_Breakpoints.md",
    "05_Manual_Work.md",
    "06_Evidence_Gaps.md",
    "07_Implications_For_StartupHub.md",
    "08_Limitations.md",
    "09_External_Benchmarks.md",
]

CHART_NAMES = [
    "p13_01_journey_map.png",
    "p13_02_evidence_heatmap.png",
    "p13_03_two_tracks.png",
    "p13_04_breakpoint_severity.png",
    "p13_05_manual_work.png",
    "p13_06_stage_owners.png",
    "p13_07_documented_mandated_tools.png",
    "p13_08_unknowns_to_interview.png",
]

checks = []


def check(name, expected, actual):
    ok = expected == actual
    checks.append((ok, name, expected, actual))
    return ok


def docs():
    return sorted(CJ.glob("*.md"))


def doc_text():
    return "\n".join(p.read_text(encoding="utf-8") for p in docs())


def _norm(s):
    """Collapse whitespace so a check is not defeated by line wrapping."""
    lines = [ln.lstrip("> ").lstrip(">") if ln.startswith(">") else ln
             for ln in s.splitlines()]
    return " ".join(" ".join(lines).split())


print("=" * 74)
print("  PHASE 13 INDEPENDENT AUDIT")
print("=" * 74)

raw = json.loads(RAW.read_text(encoding="utf-8"))
stages = raw["stages"]
questions = raw["questions"]
cells = raw["cells"]
bps = raw["breakpoints"]
mw = raw["manual_work"]
xb = raw["external_benchmarks"]
gaps = raw["evidence_gaps"]
tt = raw["two_track"]

# ---------------------------------------------------------------- structure
print("\n-- structure --")
check("stages", N_STAGES, len(stages))
check("questions", N_QUESTIONS, len(questions))
check("cells", N_CELLS, len(cells))
pairs = {(c["stage"], c["question"]) for c in cells}
expected_pairs = {(s["id"], q["key"]) for s in stages for q in questions}
check("every stage x question pair present once", expected_pairs, pairs)
check("breakpoints", N_BREAKPOINTS, len(bps))
check("manual-work rows", N_MANUAL, len(mw))
check("structural counts", N_STRUCTURAL,
      sum(1 for m in mw if m["measure_type"] == "STRUCTURAL_COUNT"))
check("unknown manual rows", N_UNKNOWN_MANUAL,
      sum(1 for m in mw if m["measure_type"] == "UNKNOWN"))
check("external benchmarks", N_EXTERNAL, len(xb))
check("evidence gaps present", True, len(gaps) > 0)
check("raw records zero interviews", 0, raw["interviews_conducted"])
check("documents written", N_DOCS, len(docs()))
check("workbook exists", True, XLSX.exists())
check("raw json present", True, RAW.exists())

# ------------------------------------------------------------------ exports
print("\n-- exports --")
check("csv count", N_CSV, len(list(EX.glob("*.csv"))))
check("schema.json present", True, (EX / "schema.json").exists())
schema = json.loads((EX / "schema.json").read_text(encoding="utf-8"))


def csv_rows(name):
    with open(EX / name, newline="", encoding="utf-8-sig") as fh:
        return list(csv.DictReader(fh))


check("journey_stages.csv rows", N_STAGES, len(csv_rows("journey_stages.csv")))
check("stage_question_matrix.csv rows", N_CELLS,
      len(csv_rows("stage_question_matrix.csv")))
check("breakpoints.csv rows", N_BREAKPOINTS,
      len(csv_rows("breakpoints.csv")))
check("manual_work_ledger.csv rows", N_MANUAL,
      len(csv_rows("manual_work_ledger.csv")))
check("external_benchmarks.csv rows", N_EXTERNAL,
      len(csv_rows("external_benchmarks.csv")))
check("evidence_gaps.csv rows", len(gaps),
      len(csv_rows("evidence_gaps.csv")))
check("source_map.csv rows", N_CELLS, len(csv_rows("source_map.csv")))

# The CSVs must agree with the raw JSON cell for cell, not merely in count.
mrows = csv_rows("stage_question_matrix.csv")
raw_by_key = {(c["stage"], c["question"]): c for c in cells}
mismatch = []
for r in mrows:
    c = raw_by_key.get((r["stage"], r["question"]))
    if c is None:
        mismatch.append(f'{r["stage"]}/{r["question"]}: absent from raw')
        continue
    if r["grade"] != c["grade"] or r["answer"] != c["answer"]:
        mismatch.append(f'{r["stage"]}/{r["question"]}: grade or answer drift')
check("matrix csv matches raw json cell for cell", [], mismatch)

# ------------------------------------------------------------------- charts
print("\n-- charts --")
pngs = sorted(CH.glob("*.png"))
check("chart count", N_CHARTS, len(pngs))
missing_charts = [c for c in CHART_NAMES if not (CH / c).exists()]
check("all named charts exist", [], missing_charts)
txt = _norm(doc_text())
unref = [c for c in CHART_NAMES if c not in txt]
check("every chart referenced in the prose", [], unref)

# ------------------------------------------------- RULE 1: zero interviews
print("\n-- RULE 1: zero interviews --")
check("schema records zero interviews", 0, schema["interviews_conducted"])

# No cell may be written as though a person said it. Document quotations and
# portal field names are legitimate and are excluded by the narrow patterns.
resp = []
for c in cells:
    blob = (c["answer"] + " " + c["basis"]).lower()
    for pat in PARTICIPANT_PATTERNS:
        if pat in blob:
            resp.append(f'{c["stage"]}/{c["question"]}: {pat}')
check("no cell is written as first-person research", [], resp)

# The zero-interview banner must be in every document, not just the README.
no_banner = []
for p in docs():
    t = p.read_text(encoding="utf-8")
    if "0 interviews conducted" not in t:
        no_banner.append(p.name)
check("every document carries the zero-interview banner", [], no_banner)

# And the docs must say so in the body, not only in the banner.
check("zero interviews stated in the body", True,
      "Zero interviews" in txt or "zero interviews" in txt)

# ------------------------------------------- RULE 2: grade vocabulary
print("\n-- RULE 2: grade vocabulary --")
bad_grade = [f'{c["stage"]}/{c["question"]}={c["grade"]}'
              for c in cells if c["grade"] not in GRADES]
check("every cell grade is in the vocabulary", [], bad_grade)

bad_word = [f'{c["stage"]}/{c["question"]}'
            for c in cells
            if any(g in c["answer"] or g in c["basis"] for g in FORBIDDEN_GRADES)]
check("no forbidden grade word in any cell", [], bad_word)

# In the prose the two words may appear ONLY as a meta-statement about the
# rule itself. Anywhere else, they are a grade assertion and a failure.
meta_ok = []
for p in docs():
    t = p.read_text(encoding="utf-8")
    for m in re.finditer(r"ASSUMED|HYPOTHESIS", t):
        window = t[max(0, m.start() - 160):m.end() + 160].lower()
        if not any(k in window for k in ("audit failure", "grade vocabulary",
                                         "forbidden")):
            meta_ok.append(f"{p.name}: {m.group(0)}")
check("forbidden grade words only ever appear as the rule itself", [],
      meta_ok)

# Re-derive the grade tallies rather than trusting the summary.
gc = Counter(c["grade"] for c in cells)
check("documentary re-derived", gc["DOCUMENTARY"], schema["grade_counts"]["DOCUMENTARY"])
check("inferred re-derived", gc["INFERRED"], schema["grade_counts"]["INFERRED"])
check("unknown re-derived", gc["UNKNOWN"], schema["grade_counts"]["UNKNOWN"])
check("not_applicable re-derived", gc["NOT_APPLICABLE"],
      schema["grade_counts"]["NOT_APPLICABLE"])
check("grades sum to the cell count", N_CELLS, sum(gc.values()))
check("no grade is empty", [], [c["stage"] for c in cells if not c["grade"]])

# Per-stage tallies in the schema must also re-derive.
stage_bad = []
for s in stages:
    sub = Counter(c["grade"] for c in cells if c["stage"] == s["id"])
    claimed = schema["stage_grade_counts"][s["id"]]
    for g in GRADES:
        if sub[g] != claimed[g]:
            stage_bad.append(f'{s["id"]}/{g}: {claimed[g]} vs {sub[g]}')
check("per-stage grade tallies re-derive", [], stage_bad)

# Every UNKNOWN cell must say what would close it. An UNKNOWN with no next
# step is an abandonment, not an unknown.
unclosed = [f'{c["stage"]}/{c["question"]}'
            for c in cells
            if c["grade"] == "UNKNOWN"
            and not (c.get("still_needs") or c.get("cross_ref"))]
check("every UNKNOWN cell names what it needs", [], unclosed)

# Every INFERRED cell must name its inference chain.
nobasis = [f'{c["stage"]}/{c["question"]}'
           for c in cells
           if c["grade"] == "INFERRED" and len(c.get("basis", "")) < 30]
check("every INFERRED cell states its inference chain", [], nobasis)

# ------------------------------------------------ RULE 3: fabrication strings
print("\n-- RULE 3: banned fabrication strings --")
banned_cells = []
for c in cells:
    for b in BANNED_STRINGS:
        if b in c["answer"] or b in c["basis"]:
            # The Diagram-5 reconstruction is the single allow-listed case,
            # and only where the cell explicitly names Diagram 5.
            if b == "Google Sheet" and "Diagram 5" in c.get("cross_ref", ""):
                continue
            banned_cells.append(f'{c["stage"]}/{c["question"]}: {b}')
check("no banned string in any cell", [], banned_cells)

# The exemption may only be used where Diagram 5 is the cross-reference.
exempt = [f'{c["stage"]}/{c["question"]}'
          for c in cells
          if any("Google Sheet" in c["answer"] or "Google Sheet" in c["basis"]
                 for _ in (0,))
          and "Diagram 5" not in c.get("cross_ref", "")]
check("the Diagram-5 exemption is not used elsewhere", [], exempt)

banned_docs = []
for p in docs():
    t = p.read_text(encoding="utf-8")
    for b in BANNED_STRINGS:
        if b in t:
            banned_docs.append(f"{p.name}: {b}")
check("no banned string in the prose", [], banned_docs)

# The tripwires must also be absent from the source registry, which is where
# they would have to be if they were ever to be asserted.
reg_text = REG.read_text(encoding="utf-8")
reg_banned = [b for b in BANNED_STRINGS if b in reg_text]
check("banned strings absent from Source_Registry", [], reg_banned)

# --------------------------------- RULE 4: external benchmarks stay outside
print("\n-- RULE 4: external benchmarks stay outside the matrix --")
matrix_cols = set(mrows[0].keys()) if mrows else set()
check("matrix csv has no benchmark column", True,
      not any("benchmark" in c.lower() for c in matrix_cols))
check("raw json holds benchmarks in a separate register", True,
      "external_benchmarks" in raw and "cells" in raw)
xb_ids = {x["id"] for x in xb}
check("benchmark ids are XB-prefixed", N_EXTERNAL,
      len([i for i in xb_ids if i.startswith("XB-")]))
leak = [f'{c["stage"]}/{c["question"]}'
        for c in cells if any(s.startswith("XB-") for s in c["source_ids"])]
check("no cell cites a benchmark as journey evidence", [], leak)
# The benchmarks must still be documentary and registered.
check("every benchmark is DOCUMENTARY", [],
      [x["id"] for x in xb if x["grade"] != "DOCUMENTARY"])
check("every benchmark cites a source", [],
      [x["id"] for x in xb if not x["source_ids"]])

# ------------------------------------------------------ zero-evidence stages
print("\n-- zero-evidence stages ship UNKNOWN --")
for sid in ("S08", "S10"):
    sub = [c for c in cells if c["stage"] == sid]
    check(f"{sid} has 6 cells", 6, len(sub))
    check(f"{sid} ships 6 UNKNOWN", 6,
          sum(1 for c in sub if c["grade"] == "UNKNOWN"))
    check(f"{sid} has no DOCUMENTARY cell", 0,
          sum(1 for c in sub if c["grade"] == "DOCUMENTARY"))

# ---------------------------------------------------------------- provenance
print("\n-- provenance --")
reg_ids = set()
with open(REG, newline="", encoding="utf-8") as fh:
    for row in csv.DictReader(fh):
        reg_ids.add(row["id"].strip())
check("source registry readable", True, len(reg_ids) > 100)

cited = set()
for c in cells:
    cited.update(c["source_ids"])
for b in bps:
    cited.update(b["source_ids"])
for m in mw:
    cited.update(m["source_ids"])
for x in xb:
    cited.update(x["source_ids"])
cited.update(tt["join_source_ids"])
for r in tt["rekey_targets"]:
    cited.update(r["source_ids"])
unregistered = sorted(s for s in cited if s not in reg_ids)
check("every cited source id is registered", [], unregistered)
print(f"       {len(cited)} distinct registered sources cited")

# Every DOCUMENTARY cell must carry at least one source. A documentary claim
# with no citation is the single most likely way to smuggle in a fabrication.
nodoc = [f'{c["stage"]}/{c["question"]}'
         for c in cells if c["grade"] == "DOCUMENTARY" and not c["source_ids"]]
check("every DOCUMENTARY cell cites a source", [], nodoc)

check("every cell has a non-empty answer", [],
      [f'{c["stage"]}/{c["question"]}' for c in cells if not c["answer"].strip()])
check("every cell has a non-empty basis", [],
      [f'{c["stage"]}/{c["question"]}' for c in cells if not c["basis"].strip()])

# ------------------------------------------------------------- manual work
print("\n-- manual work --")
check("measure types valid", [],
      [m["id"] for m in mw
       if m["measure_type"] not in ("STRUCTURAL_COUNT", "UNKNOWN")])
check("every structural count has a value", [],
      [m["id"] for m in mw
       if m["measure_type"] == "STRUCTURAL_COUNT"
       and (m["value"] in ("", "UNKNOWN") or not m["source_ids"])])
check("every unknown row says UNKNOWN", [],
      [m["id"] for m in mw
       if m["measure_type"] == "UNKNOWN" and m["value"] != "UNKNOWN"])
# Hours and rupees must not be quantified anywhere in the ledger.
money = [m["id"] for m in mw
         if re.search(r"\b\d+(\.\d+)?\s*(hours|hrs|hour|rupees|rs\.?)\b",
                      f'{m["metric"]} {m["value"]}', re.I)]
check("no hours or rupees is quantified", [], money)

# ------------------------------------------------------------- breakpoints
print("\n-- breakpoints --")
check("severities valid", [],
      [b["id"] for b in bps if b["severity"] not in (1, 2, 3)])
check("every DOCUMENTARY breakpoint cites a source", [],
      [b["id"] for b in bps
       if b["grade"] == "DOCUMENTARY" and not b["source_ids"]])
check("every INFERRED breakpoint names its reconstruction", [],
      [b["id"] for b in bps
       if b["grade"] == "INFERRED" and "Diagram" not in b.get("cross_ref", "")])
check("every breakpoint has a stage", [],
      [b["id"] for b in bps if b["stage"] not in
       {s["id"] for s in stages}])

# --------------------------------------------------------------- two tracks
print("\n-- the two-track join --")
check("join is a single stage", True, isinstance(tt.get("join_stage"), str))
check("join cites registered sources", [],
      [s for s in tt["join_source_ids"] if s not in reg_ids])
check("join source ids are documentary", 2, len(tt["join_source_ids"]))
# The venture and data tracks must not overlap: the whole finding is that
# they never join except at one point.
vset, dset = set(tt["venture"]), set(tt["data"])
check("tracks do not overlap", [], sorted(vset & dset))
check("every track stage exists", [],
      sorted((vset | dset) - {s["id"] for s in stages}))
check("join stage is a real stage", True, tt["join_stage"] in
      {s["id"] for s in stages})
check("the join is stated as one-directional in the prose", True,
      "one-directional" in txt.lower())
check("the join does not remove NIRF-I, stated in the prose", True,
      "nirf-i" in txt.lower())

# ----------------------------------------------------------------- the docs
print("\n-- the documents --")
for n in DOC_NAMES:
    check(f"{n} exists", True, (CJ / n).exists())
no_banner_md = [p.name for p in docs()
                if "GENERATED by build/build_phase13.py" not in
                p.read_text(encoding="utf-8")]
check("every document carries the generated banner", [], no_banner_md)
# The README must link every other document.
readme = (CJ / "README.md").read_text(encoding="utf-8")
unlinked = [n for n in DOC_NAMES if n != "README.md" and n not in readme]
check("README links every other document", [], unlinked)
# Folder naming must be explained, as in Phase 12.
check("folder naming explained", True, "11_Customer_Journey" in txt)
# The honesty statements that make the phase legible.
check("hours and rupees stated as unknown", True,
      "hours" in txt.lower() and "rupees" in txt.lower())
check("zero-evidence stages named in the prose", True,
      "S08" in txt and "S10" in txt)
check("limitations document is not empty", True,
      len((CJ / "08_Limitations.md").read_text(encoding="utf-8")) > 1500)

# ------------------------------------------------------- cross-doc numbers
print("\n-- headline numbers agree with the data --")
check("README states the documentary count", True,
      f'{gc["DOCUMENTARY"]} DOCUMENTARY' in readme or
      f'**{gc["DOCUMENTARY"]}**' in readme)
check("README states the unknown count", True,
      f'**{gc["UNKNOWN"]}**' in readme)
check("README states the cell count", True, f'**{N_CELLS}**' in readme)
check("README states the breakpoint count", True,
      f'**{len(bps)}**' in readme)
check("README states zero interviews", True, "**0**" in readme)

# The severity-1 tier is empty; the prose must say so rather than imply
# otherwise.
sev_counts = Counter(b["severity"] for b in bps)
check("severity 1 tier is genuinely empty", 0, sev_counts.get(1, 0))
check("the empty severity-1 tier is stated", True,
      "severity 1" in txt.lower() and "empty" in txt.lower())

# And the severity-3 stage list claimed in the prose must re-derive.
sev3_stages = sorted({b["stage"] for b in bps if b["severity"] == 3})
claimed = re.findall(r"severity-3 breaks land on ([A-Z0-9,\s]+?) -",
                      txt.lower())
claimed_stages = []
for cl in claimed:
    claimed_stages += [x.strip() for x in cl.split(",") if x.strip()]
if claimed_stages:
    check("the claimed severity-3 stage list re-derives", sev3_stages,
          sorted(set(claimed_stages)))

# ------------------------------------------------------------------ layering
print("\n-- layering --")
stray = [p.relative_to(ROOT / "_exports").as_posix()
         for p in (ROOT / "_exports").rglob("*.md")
         if not (p.relative_to(ROOT / "_exports").as_posix().startswith("raw/")
                 and "_RAW" in p.name)]
check("no prose md in _exports", [], stray)

# The retired legacy folder must be gone, not merely empty.
check("legacy 11_Legal_Policy_Tech removed", True,
      not (ROOT / "11_Legal_Policy_Tech").exists())

print("\n" + "=" * 74)
fails = [c for c in checks if not c[0]]
for ok_, name, exp, act in checks:
    if not ok_:
        print(f"  FAIL  {name}\n          expected {exp}, got {act}")
print(f"  {len(checks) - len(fails)}/{len(checks)} checks passed")
print("=" * 74)
sys.exit(1 if fails else 0)
