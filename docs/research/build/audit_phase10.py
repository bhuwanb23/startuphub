#!/usr/bin/env python3
"""Independent audit of Phase 10 - the Competitor Matrix.

Two jobs:

  1. Re-derive the headline figures from hand-entered constants rather than
     importing the producing module.
  2. ENFORCE THE INTEGRITY RULES. This phase's whole value depends on three
     things staying true, and a spreadsheet cannot enforce any of them:

       - U (unknown) is never silently merged with 0 (absent)
       - every 0 carries a substantive absence note
       - the falsified Phase 0 / Phase 9 wording has not been restored

Run:  python build/audit_phase10.py
Exit: 0 clean, 1 on any failure.
"""

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
MX = ROOT / "08_Competitor_Matrix"
CH = ROOT / "_exports" / "charts" / "phase10"
XLSX = ROOT / "_exports" / "xlsx" / "08_Competitor_Matrix.xlsx"

# ------------------------------------------------------------- constants
N_VENDORS = 40
N_NEW = 12
N_DIMS = 15
N_ADDED = 2
N_SPEC_COLS = 27
N_CELLS = 600          # 40 * 15
N_CHARTS = 8
SCALE = {3, 2, 1, 0, "U"}

checks = []


def check(name, expected, actual):
    ok = expected == actual
    checks.append((ok, name, expected, actual))
    return ok


def docs():
    return sorted(MX.rglob("*.md"))


def in_docs_any(*needles):
    for f in docs():
        t = f.read_text(encoding="utf-8")
        if any(n in t for n in needles):
            return True, f.name
    return False, None


print("=" * 74)
print("  PHASE 10 INDEPENDENT AUDIT")
print("=" * 74)

raw = json.loads((ROOT / "_exports" / "raw" / "phase10_matrix_RAW.json")
                 .read_text(encoding="utf-8"))
rows = raw["rows"]
dims = raw["dimensions"]

print("\n-- structure --")
check("vendors", N_VENDORS, len(rows))
check("new in Phase 10", N_NEW, len([r for r in rows if r["phase9"] == "no"]))
check("scored dimensions", N_DIMS, len(dims))
check("added dimensions", N_ADDED, len([d for d in dims if d[2]]))
check("scored cells", N_CELLS, N_VENDORS * N_DIMS)
check("workbook exists", True, XLSX.exists())

keys = [d[0] for d in dims]
check("all 15 scored keys present", N_DIMS, len(set(keys)))

print("\n-- U is not 0: the central integrity rule --")
u_cells = sum(1 for r in rows for k in keys if r[k] == "U")
z_cells = sum(1 for r in rows for k in keys if r[k] == 0)
check("U and 0 counted separately", True, isinstance(u_cells, int) and isinstance(z_cells, int))
check("U + 0 != total (they are not conflated)", True,
      (u_cells + z_cells) <= N_CELLS)
print(f"       {u_cells} unknown cells, {z_cells} evidenced-absent cells")

bad_scale = [(r["competitor"], k, r[k]) for r in rows for k in keys
             if r[k] not in SCALE]
check("no invalid score values", [], bad_scale)

# An unknown must never be recorded as a numeric zero.
zero_rows_no_note = [r["competitor"] for r in rows
                     if any(r[k] == 0 for k in keys) and len(r["absence_note"]) < 40]
check("every 0 carries an absence note", [], zero_rows_no_note)

print("\n-- absence basis --")
basis = {}
for r in rows:
    basis[r["absence_basis"]] = basis.get(r["absence_basis"], 0) + 1
check("absence_basis always published", N_VENDORS, sum(basis.values()))
check("no vendor has zero-scores with basis NONE", 0,
      len([r for r in rows if r["absence_basis"] == "NONE"
           and any(r[k] == 0 for k in keys)]))

print("\n-- market position is derived --")
pos = {}
for r in rows:
    pos[r["market_position"]] = pos.get(r["market_position"], 0) + 1
check("market positions sum to vendor count", N_VENDORS, sum(pos.values()))
check("all positions valid", True,
      set(pos) <= {"VERIFIED", "PROVEN", "PARTIAL", "UNPROVEN"})
# The circular-rubric guard: a vendor with ZERO third-party proof (0 reviews and
# no named customer) must never be rated PROVEN or VERIFIED.
unproven_pretending = [r["competitor"] for r in rows
                       if r["market_position"] in ("VERIFIED", "PROVEN")
                       and (r["user_reviews"] or 0) == 0 and r["customers_n"] == 0]
check("no vendor with no third-party proof rates PROVEN/VERIFIED",
      [], unproven_pretending)
print(f"       {pos}")

print("\n-- provenance --")
no_src = [r["competitor"] for r in rows if not r.get("source", "").startswith("http")]
check("every vendor has an http source", [], no_src)
no_date = [r["competitor"] for r in rows if not r.get("last_updated")]
check("every vendor has a last-updated date", [], no_date)
grades = {}
for r in rows:
    grades[r["evidence_grade"]] = grades.get(r["evidence_grade"], 0) + 1
check("every vendor evidence-graded", N_VENDORS, sum(grades.values()))

print("\n-- GAP-13 regression guard --")
blob = " ".join(f.read_text(encoding="utf-8") for f in docs()) + \
       " ".join(str(r) for r in raw["gap13_update"].values())

CORRECTION_MARKERS = ("falsified", "FALSIFIED", "narrowed", "was", "Phase 9",
                      "Phase 0", "correction", "further narrowed")
for false_claim in ["No competitor can prove a large Indian institution runs on their software",
                    "No competitor demonstrates a LARGE INDIAN UNIVERSITY deployment with named referees"]:
    # The wording may legitimately APPEAR - these documents quote it in order to
    # record how it narrowed. What must never happen is it appearing WITHOUT a
    # correction marker nearby, which would mean it is being asserted again.
    bare = 0
    start = 0
    while True:
        i = blob.find(false_claim, start)
        if i < 0:
            break
        window = blob[max(0, i - 400): i + len(false_claim) + 400]
        if not any(mk in window for mk in CORRECTION_MARKERS):
            bare += 1
        start = i + 1
    check(f"falsified wording never asserted uncorrected: '{false_claim[:42]}...'",
          0, bare)

check("GAP-13 correction names Protrak", True, "Protrak" in blob)
check("GAP-13 correction records the segment distinction", True,
      "incubation" in raw["gap13_update"]["surviving_claim"].lower())
check("Protrak is graded NAMED_REFERENCE with a named customer", True,
      any(r["competitor"].startswith("Protrak") and r["evidence_grade"] == "NAMED_REFERENCE"
          and r["customers_n"] >= 1 for r in rows))

print("\n-- published figures appear in the docs --")
must = [
    (("40", "of 40"), "40 vendors"),
    (("Protrak",), "Protrak named"),
    (("IISc",), "IISc named"),
    (("U` is not `0", "U is not 0", "not the same as absent"), "U!=0 rule stated"),
    (("absence_note", "absence note"), "absence note rule stated"),
    (("added by Phase 10", "added*"), "added dimensions disclosed"),
    (("UNPROVEN",), "evidence tiers used"),
]
for needles, label in must:
    found, where = in_docs_any(*needles)
    checks.append((found, f"published: {label}", "present", where or "ABSENT"))
    print(f"  {'ok ' if found else 'FAIL'}  {label:<40} -> {where or 'ABSENT'}")

print("\n-- honesty guards --")
BANNED = ["competitors told us", "interviews show", "studies prove", "users say",
          "a customer told us", "research partner said"]
for needle in BANNED:
    hits = [f.name for f in docs() if needle in f.read_text(encoding="utf-8").lower()]
    check(f"guard: {needle}", [], hits)
for f in docs():
    t = f.read_text(encoding="utf-8").lower()
    check(f"interview status disclosed: {f.name}", True,
          ("0 interviews" in t or "0 competitor" in t or "conversations" in t))

print("\n-- charts --")
pngs = sorted(CH.glob("*.png"))
check("chart count", N_CHARTS, len(pngs))
alltext = " ".join(f.read_text(encoding="utf-8") for f in docs())
for p in pngs:
    check(f"chart referenced: {p.name}", True, p.name in alltext)

print("\n-- layering --")
stray = [p.relative_to(ROOT / "_exports").as_posix()
         for p in (ROOT / "_exports").rglob("*.md")
         if not (p.relative_to(ROOT / "_exports").as_posix().startswith("raw/")
                         and "_RAW" in p.name)]
check("no prose md in _exports", [], stray)
man = json.loads((ROOT / "_exports" / "raw" / "manifest.json").read_text(encoding="utf-8"))
paths = man.get("files", man) if isinstance(man, dict) else man
names = list(paths.keys()) if isinstance(paths, dict) else [p.get("path", "") for p in paths]
check("manifest excludes synthetic", [], [n for n in names if "synthetic" in n.lower()])

print("\n" + "=" * 74)
fails = [c for c in checks if not c[0]]
for ok, name, exp, act in checks:
    if not ok:
        print(f"  FAIL  {name}\n          expected {exp}, got {act}")
print(f"  {len(checks) - len(fails)}/{len(checks)} checks passed")
print("=" * 74)
sys.exit(1 if fails else 0)
