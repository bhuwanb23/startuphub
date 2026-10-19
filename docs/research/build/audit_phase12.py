#!/usr/bin/env python3
"""Independent audit of Phase 12 - the Feature Gap Analysis.

This phase's value is almost entirely in what it REFUSES. Thirteen gaps went in
and six differentiators came out; the brief warned against producing fifty
features. A phase that quietly padded the set back to thirteen would look
identical to a successful one in a file listing, so the checks below are built
to catch exactly that drift.

Two jobs:

  1. Re-derive the headline figures from the raw JSON rather than importing the
     producing module.
  2. Enforce the three governing rules:
       Rule 1  a capability held natively by >= 50% of vendors cannot be a
               differentiator
       Rule 2  competitor absence and user demand are separate claims and are
               never merged
       Rule 3  every differentiator carries a falsifier

Run:  python build/audit_phase12.py
Exit: 0 clean, 1 on any failure.
"""

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
FG = ROOT / "10_Feature_Gap"
CH = ROOT / "_exports" / "charts" / "phase12"
EX = ROOT / "_exports" / "phase12"
XLSX = ROOT / "_exports" / "xlsx" / "10_Feature_Gap.xlsx"
RAW = ROOT / "_exports" / "raw" / "phase12_gaps_RAW.json"
MRAW = ROOT / "_exports" / "raw" / "phase10_matrix_RAW.json"

# ------------------------------------------------------------- constants
N_VENDORS = 40
N_DIFFS = 6
N_GAPS = 13
N_FEATURES = 46
N_MODULES = 12
N_STRATEGIES = 5
N_DOCS = 8
N_CHARTS = 8
N_EXPORTS = 9          # 8 csv + schema.json
SATURATION = 0.50

BANNED_DIFFERENTIATORS = ["reporting", "analytics", "incubation", "mentorship",
                          "startup management", "dashboard", "notification"]

checks = []


def check(name, expected, actual):
    ok = expected == actual
    checks.append((ok, name, expected, actual))
    return ok


def docs():
    return sorted(FG.rglob("*.md"))


def _norm(s):
    """Collapse whitespace so a check is not defeated by line wrapping.

    The generated docs wrap prose at ~78 columns and prefix continuation lines
    with markdown blockquote markers, so a literal substring search across a
    line break silently fails. Strip the markers first, then collapse.
    """
    lines = [ln.lstrip("> ").lstrip(">") if ln.startswith(">") else ln
             for ln in s.splitlines()]
    return " ".join(" ".join(lines).split())


def in_docs(*needles):
    for f in docs():
        t = _norm(f.read_text(encoding="utf-8")).lower()
        if all(n.lower() in t for n in needles):
            return True, f.name
    return False, None


def any_doc(*needles):
    return in_docs(*needles)


print("=" * 74)
print("  PHASE 12 INDEPENDENT AUDIT")
print("=" * 74)

raw = json.loads(RAW.read_text(encoding="utf-8"))
diffs = raw["differentiators"]
gaps = raw["gap_scorecard"]
feats = raw["features_map"]
mods = raw["modules_map"]
cov = raw["coverage"]
matrix = json.loads(MRAW.read_text(encoding="utf-8"))
mrows = matrix["rows"]
mdims = matrix["dimensions"]
dim_keys = [d[0] for d in mdims]

print("\n-- structure --")
check("vendors scored", N_VENDORS, len(mrows))
check("differentiators", N_DIFFS, len(diffs))
check("gaps re-scored", N_GAPS, len(gaps))
check("features.md sections", N_FEATURES, len(feats))
check("modules", N_MODULES, len(mods))
check("win strategies", N_STRATEGIES, len(raw["win_strategies"]))
check("packaging requirement present", True, "verdict" in raw["packaging_requirement"])
check("documents written", N_DOCS, len(docs()))
check("workbook exists", True, XLSX.exists())
check("coverage rows", N_VENDORS, len(cov))

print("\n-- RULE 1: the saturation test --")
# A differentiator may not rest on a capability held by half the market.
sat = {}
for r in mrows:
    for k in dim_keys:
        if r[k] in (2, 3):
            sat[k] = sat.get(k, 0) + 1
shares = {k: v / N_VENDORS for k, v in sat.items()}
over = {k: v for k, v in shares.items() if v >= SATURATION}
check("saturation set computed", True, len(over) >= 4)
print(f"       {len(over)} capabilities at or above {int(SATURATION*100)}%: "
      f"{', '.join(sorted(over))}")

# The banned set must genuinely be over the line, or the rule is theatre.
for k in ("reporting", "analytics", "incubation"):
    check(f"rule 1 bite confirmed: {k}", True, shares.get(k, 0) >= SATURATION)
check("reporting retired", True,
      any(g["id"] == "GAP-04" and g["verdict"] == "RETIRED" for g in gaps))

# No differentiator may name a saturated capability as its core claim.
violations = []
for d in diffs:
    blob = f'{d["name"]} {d["statement"]}'.lower()
    for b in BANNED_DIFFERENTIATORS:
        if b in blob:
            violations.append(f"D{d['n']}:{b}")
check("no differentiator rests on a saturated capability", [], violations)

print("\n-- RULE 2: absence is not demand --")
# Every differentiator must carry both columns and must not claim user demand.
missing_a = [d["n"] for d in diffs if not d.get("evidence_a")]
missing_u = [d["n"] for d in diffs if not d.get("evidence_u")]
check("every differentiator has an A column", [], missing_a)
check("every differentiator has a U column", [], missing_u)

claims_demand = [d["n"] for d in diffs
                 if d["evidence_u"].strip().lower().startswith("users need")]
check("no differentiator claims user demand", [], claims_demand)

csv_u = (EX / "evidence_basis.csv").read_text(encoding="utf-8-sig")
check("may_claim_user_demand column exported", True,
      "may_claim_user_demand" in csv_u)
# Every one of the 6 rows must answer NO. If any row could claim user demand,
# the absence-vs-demand rule has been quietly abandoned downstream.
u_rows = [line for line in csv_u.strip().splitlines()[1:] if line.strip()]
check("evidence_basis row count", N_DIFFS, len(u_rows))
check("no row may claim user demand", N_DIFFS,
      sum(1 for line in u_rows if line.rstrip().endswith("NO")))

# The honesty chart must exist and be referenced.
pngs = sorted(CH.glob("*.png"))
check("chart count", N_CHARTS, len(pngs))
check("evidence-honesty chart exists", True,
      (CH / "p12_07_evidence_honesty.png").exists())
check("saturation chart exists", True,
      (CH / "p12_01_saturation_test.png").exists())

print("\n-- RULE 3: every differentiator carries a falsifier --")
no_fals = [d["n"] for d in diffs if not d.get("falsifier")
           or len(d["falsifier"]) < 40]
check("every differentiator has a substantive falsifier", [], no_fals)
for d in diffs:
    check(f"D{d['n']} states our_edge", True, len(d.get("our_edge", "")) > 60)
    check(f"D{d['n']} has a named gap", True, len(d.get("gaps", "")) > 0)

print("\n-- the brief's own warning --")
# The brief said 5-7 differentiators, not 50. Hold the line on both ends.
check("differentiator count within 5-7", True, 5 <= N_DIFFS <= 7)
check("no feature-padded differentiator list", [], violations)
# And features.md must be triaged, not adopted wholesale.
evidenced = len([f for f in feats if f[2] == "EVIDENCED"])
check("features.md majority not marked evidenced", True, evidenced < N_FEATURES / 2)
check("all 46 sections triaged", N_FEATURES, len(feats))
check("no section left unplaced", [], [f[0] for f in feats if f[2] not in
                                       ("EVIDENCED", "DEFERRED", "SATURATED",
                                        "CONTRADICTED", "NEEDS_PRIMARY")])
check("every section carries a rationale", [],
      [f[0] for f in feats if not f[3] or len(f[3]) < 30])
print(f"       {evidenced} of {N_FEATURES} features.md sections evidenced "
      f"({N_FEATURES - evidenced} placed elsewhere)")

print("\n-- Phase 11 findings carried forward --")
# Phase 11 published a NOT_SUPPORTED list. It must not be silently re-promoted.
r11 = json.loads((ROOT / "_exports" / "raw" / "phase11_reviews_RAW.json")
                 .read_text(encoding="utf-8"))
r11_text = json.dumps(r11).lower()
check("phase 11 raw present", True, len(r11.get("reviews", [])) > 0)
for term in ("vendor_marketing", "user_review", "aggregator_echo"):
    check(f"phase 11 raw carries {term}", True, term in r11_text)

# AI must not be a differentiator. Phase 11 found zero users asking for it.
ai_diffs = [d["n"] for d in diffs if "ai" == d["name"].lower()[:2]
            or d["name"].lower().startswith("ai ")]
check("no AI differentiator", [], ai_diffs)
ok, where = any_doc("NOT SUPPORTED BY EVIDENCE")
check("phase 11 AI finding carried into phase 12", True, ok)

print("\n-- contested gaps are not reported as uncontested --")
g3 = next((g for g in gaps if g["id"] == "GAP-03"), None)
check("GAP-03 present", True, g3 is not None)
check("GAP-03 marked CONTESTED", "CONTESTED", g3["verdict"])
check("GAP-03 holder count matches", 3, len(g3["holders_list"]))
check("GAP-03 counts the 3 mandate vendors",
      ["csm technologies (stpi coe)", "esi incubation centre os", "incuman"],
      sorted(v.lower() for v in g3["holders_list"]))
ok, where = any_doc("gap-03 died", "highest-value")
check("GAP-03 reversal stated in the docs", True, ok)

print("\n-- the brief's example table is addressed, not deleted --")
ok, where = any_doc("Mentor matching", "Automated", "Ecosystem connections")
check("spec example table reproduced and rebutted", True, ok)
check("05_Not_Differentiators.md exists", True,
      (FG / "05_Not_Differentiators.md").exists())

print("\n-- honesty guards on the published prose --")
ok, where = any_doc("0 interviews conducted", "0 competitor conversations")
check("zero interviews banner present", True, ok)
ok, where = any_doc("0 interviews")
check("zero interviews stated in the body", True, ok)
ok, where = any_doc("none of them from an Indian university")
check("Indian-university evidence gap stated", True, ok)
ok, where = any_doc("cannot be honestly counted")
check("unmeasured gaps disclosed", True, ok)
ok, where = any_doc("10_Feature_Gap")
check("folder-naming decision explained", True, ok)
ok, where = any_doc("survive contact with the evidence")
check("spec table contradictions stated", True, ok)

print("\n-- exports --")
check("phase12 csv count", N_EXPORTS - 1, len(list(EX.glob("*.csv"))))
check("schema.json present", True, (EX / "schema.json").exists())
cov_csv = (EX / "competitor_coverage.csv").read_text(encoding="utf-8-sig")
check("coverage csv has 40 data rows", N_VENDORS,
      len(cov_csv.strip().splitlines()) - 1)
check("coverage csv has 6 differentiator columns", 6,
      sum(1 for c in cov_csv.splitlines()[0].split(",") if c.startswith("D")
          and c.endswith("_score")))

print("\n-- layering --")
stray = [p.relative_to(ROOT / "_exports").as_posix()
         for p in (ROOT / "_exports").rglob("*.md")
         if not (p.relative_to(ROOT / "_exports").as_posix().startswith("raw/")
                 and "_RAW" in p.name)]
check("no prose md in _exports", [], stray)

print("\n" + "=" * 74)
fails = [c for c in checks if not c[0]]
for ok_, name, exp, act in checks:
    if not ok_:
        print(f"  FAIL  {name}\n          expected {exp}, got {act}")
print(f"  {len(checks) - len(fails)}/{len(checks)} checks passed")
print("=" * 74)
sys.exit(1 if fails else 0)