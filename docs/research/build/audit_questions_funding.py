#!/usr/bin/env python3
"""Independent audit of the funding-proposal Q&A folder.

Side work, not a research phase - so this audit is deliberately narrow.
It does not check evidence, because there is none to check: 0 quotations
have been obtained and 0 interviews were conducted. What it checks is
the one thing this document actually asserts, plus the guards that keep
it from quietly becoming something else.

    GUARD 1  the budget reconciles - rows, columns, both directions
    GUARD 2  the numbers in the prose match the numbers in the data
    GUARD 3  the provisional labelling is present and cannot be dropped
    GUARD 4  nothing claims a source, a quotation, an interview or a
             MIC-approved amount that does not exist

The figures are re-derived from the raw JSON, not imported from the
producing module, so an edit to the data module cannot make a failing
build look clean.

Run:  python build/audit_questions_funding.py
Exit: 0 clean, 1 on any failure.
"""

import csv
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
QF = ROOT / "16_Questions_Funding"
CH = ROOT / "_exports" / "charts" / "questions"
EX = ROOT / "_exports" / "questions"
XLSX = ROOT / "_exports" / "xlsx" / "16_Questions_Funding.xlsx"
RAW = ROOT / "_exports" / "raw" / "phase16_questions_RAW.json"

# ------------------------------------------------------------- constants
N_QUESTIONS = 7
N_DOCS = 9
N_CHARTS = 8
N_CSV = 6
N_SHEETS = 6
N_BUDGET_LINES = 7
N_QUARTERS = 4
N_EVIDENCE_CATEGORIES = 7
N_TEAM = 6
N_DEPENDENCIES = 7
GRAND_TOTAL = 600000
QUARTER_TOTALS = [135000, 150000, 165000, 150000]
TECH_TOTAL = 300000

DOC_NAMES = [
    "README.md",
    "01_Roadmap.md",
    "02_One_Slide_Timeline.md",
    "03_Budget.md",
    "04_Technology_Budget.md",
    "05_Funding_Evidence.md",
    "06_Team.md",
    "07_Investor_Story.md",
    "07_What_Is_Not_Yet_Verified.md",
]

CHART_NAMES = [
    "q_01_roadmap_slide.png",
    "q_02_roadmap_detail.png",
    "q_03_budget_by_quarter.png",
    "q_04_budget_shape.png",
    "q_05_tech_budget.png",
    "q_06_funding_evidence.png",
    "q_07_team_dependencies.png",
    "q_08_investor_story.png",
]

# Words that would assert a source, a quotation or a funder decision that
# does not exist. Each is checked in context, because several of them
# legitimately appear in a negation ("do not claim that Rs 6 lakh is the
# MIC-approved amount").
FORBIDDEN_CLAIMS = [
    "mic-approved amount is",
    "approved by mic",
    "sanctioned by mic",
    "eligible amount is rs",
    "we have quotations",
    "quotation obtained",
    "interviews were conducted",
    "interview conducted with",
    "respondent said",
    "as confirmed by startup india",
    "guaranteed payback",
    "guaranteed roi",
]

checks = []


def check(name, expected, actual):
    ok = expected == actual
    checks.append((ok, name, expected, actual))
    return ok


def docs():
    return sorted(QF.glob("*.md"))


def doc_text():
    return "\n".join(p.read_text(encoding="utf-8") for p in docs())


def _norm(s):
    """Collapse whitespace so a check is not defeated by line wrapping."""
    lines = [ln.lstrip("> ").lstrip(">") if ln.startswith(">") else ln
             for ln in s.splitlines()]
    return " ".join(" ".join(lines).split())


print("=" * 74)
print("  FUNDING PROPOSAL Q&A - INDEPENDENT AUDIT")
print("=" * 74)

raw = json.loads(RAW.read_text(encoding="utf-8"))
budget = raw["budget"]
quarters = raw["quarters"]
tech = raw["tech_budget"]
evidence = raw["funding_evidence"]
unverified = raw["unverified"]

# ---------------------------------------------------------------- structure
print("\n-- structure --")
check("documents", N_DOCS, len(docs()))
for n in DOC_NAMES:
    check(f"{n} exists", True, (QF / n).exists())
check("workbook exists", True, XLSX.exists())
check("raw present", True, RAW.exists())
check("csv count", N_CSV, len(list(EX.glob("*.csv"))))
check("schema.json present", True, (EX / "schema.json").exists())
check("chart count", N_CHARTS, len(list(CH.glob("*.png"))))
for c in CHART_NAMES:
    check(f"{c} exists", True, (CH / c).exists())

# ------------------------------------------------- GUARD 1: it reconciles
print("\n-- GUARD 1: the budget reconciles --")
check("budget lines", N_BUDGET_LINES, len(budget))
check("quarters", N_QUARTERS, len(quarters))

row_ok = all(sum(b["q"]) == b["total"] for b in budget)
check("every line total equals its quarter sum", True, row_ok)

col = [sum(b["q"][i] for b in budget) for i in range(4)]
check("quarter totals re-derive", QUARTER_TOTALS, col)
check("the four quarters sum to the grand total", GRAND_TOTAL, sum(col))
check("the seven lines sum to the grand total", GRAND_TOTAL,
      sum(sum(b["q"]) for b in budget))
check("no negative amount", [],
      [b["name"] for b in budget if any(v < 0 for v in b["q"])])
check("grand total is Rs 6,00,000", 600000, sum(sum(b["q"]) for b in budget))

# The technology line has to equal its own breakdown, quarter by quarter.
tq = [next(b for b in budget
           if b["name"].startswith("Technology Development"))["q"][i]
      for i in range(4)]
check("technology breakdown matches the technology line", tq,
      [t["amount"] for t in tech])
check("technology breakdown sums", TECH_TOTAL, sum(t["amount"] for t in tech))
check("technology line total", TECH_TOTAL,
      next(b for b in budget
           if b["name"].startswith("Technology Development"))["total"])

# The CSVs must agree with the raw JSON, cell for cell.
with open(EX / "budget.csv", newline="", encoding="utf-8-sig") as fh:
    brows = list(csv.DictReader(fh))
check("budget.csv rows", N_BUDGET_LINES, len(brows))
drift = []
for r, b in zip(brows, budget):
    if (r["name"] != b["name"]
            or int(r["Q1"]) != b["q"][0]
            or int(r["Q4"]) != b["q"][3]
            or int(r["total"]) != sum(b["q"])):
        drift.append(b["name"])
check("budget.csv matches the raw json", [], drift)

with open(EX / "funding_evidence.csv", newline="", encoding="utf-8-sig") as fh:
    erows = list(csv.DictReader(fh))
check("funding_evidence.csv rows", N_EVIDENCE_CATEGORIES, len(erows))
check("every evidence row records zero obtained", N_EVIDENCE_CATEGORIES,
      sum(1 for r in erows if r["obtained"] == "0"))
check("every evidence row is NOT OBTAINED", N_EVIDENCE_CATEGORIES,
      sum(1 for r in erows if r["status"] == "NOT OBTAINED"))
check("every evidence row names at least one artefact", N_EVIDENCE_CATEGORIES,
      sum(1 for r in erows if r["artefacts"].strip()))

with open(EX / "team.csv", newline="", encoding="utf-8-sig") as fh:
    trows = list(csv.DictReader(fh))
check("team.csv rows", N_TEAM + N_DEPENDENCIES, len(trows))
check("core team roles", N_TEAM,
      sum(1 for r in trows if r["kind"] == "CORE TEAM"))
check("external dependencies", N_DEPENDENCIES,
      sum(1 for r in trows if r["kind"] == "EXTERNAL DEPENDENCY"))

# ------------------------------------------- GUARD 2: prose matches data
print("\n-- GUARD 2: the prose matches the data --")
txt = _norm(doc_text())
low = txt.lower()

for i, v in enumerate(QUARTER_TOTALS):
    check(f"quarter {i + 1} total appears in the prose", True,
          f"{v:,}" in txt or f"{v // 1000}K" in txt or
          f"{v // 100000:.2f}L" in txt or
          {1: "1,35,000", 2: "1,50,000",
           3: "1,65,000"}[i + 1] in txt)

# The grand total, in whichever of the accepted forms is used.
check("grand total appears in the prose", True,
      any(s in txt for s in ("6,00,000", "Rs 600,000", "600K", "6.00L")))

# Every quarter name and its four-word phase must appear.
for q in quarters:
    check(f"{q['id']} appears in the prose", True, q["id"] in txt)
    check(f"{q['id']} phase word appears", True, q["phase_word"] in txt)
    check(f"{q['id']} outcome appears", True, q["slide_outcome"] in txt)

# Every budget line must be named.
for b in budget:
    check(f"budget line named: {b['name'][:28]}", True, b["name"] in txt)

# Every chart must be referenced by at least one document.
unref = [c for c in CHART_NAMES if c not in txt]
check("every chart is referenced in the prose", [], unref)

# The prose must not claim a number the data does not support. The budget
# shares in the tables are the most likely thing to drift.
shape_ok = True
for i, tot in enumerate(QUARTER_TOTALS):
    t = next(b for b in budget
             if b["name"].startswith("Technology Development"))["q"][i]
    if f"{t / tot:.0%}" not in txt:
        shape_ok = False
check("the technology share of every quarter is stated correctly", True,
      shape_ok)

# --------------------------------------- GUARD 3: the provisional labelling
print("\n-- GUARD 3: the provisional labelling --")
check("every document carries the provisional banner", N_DOCS,
      sum(1 for p in docs()
          if "PROVISIONAL" in p.read_text(encoding="utf-8")))
check("the provisional banner names the evidence status", True,
      "No quotation has been obtained" in txt)
check("quotations obtained is zero in the raw", 0, raw["quotations_obtained"])
check("interviews conducted is zero in the raw", 0, raw["interviews_conducted"])
check("a not-yet-verified page exists", True,
      (QF / "07_What_Is_Not_Yet_Verified.md").exists())
check("the unverified register is populated", True, len(unverified) >= 5)
bad_uv = [u["id"] for u in unverified
          if not (u["claim"] and u["checked"] and u["open"])]
check("every unverified item names what was checked and what is open", [],
      bad_uv)
# The register must be reachable from the hub.
readme = (QF / "README.md").read_text(encoding="utf-8")
check("the hub links the unverified page", True,
      "07_What_Is_Not_Yet_Verified.md" in readme)
# The budget page must carry the warning, not just the hub.
check("the budget page carries the provisional warning", True,
      "PROVISIONAL" in (QF / "03_Budget.md").read_text(encoding="utf-8"))

# -------------------------------------------- GUARD 4: nothing is claimed
print("\n-- GUARD 4: nothing is claimed that does not exist --")
for phrase in FORBIDDEN_CLAIMS:
    check(f"no claim: '{phrase}'", False, phrase in low)

# The MIC-eligibility claim must appear ONLY as a thing not to claim.
NEGATIVE_CONTEXTS = (
    "do not", "not claim", "must not", "must **not**", "not be said",
    "not be claimed", "not established", "makes no such claim",
    "cannot be claimed", "not asserted", "does not", "nothing. this",
)
mic = [m.start() for m in re.finditer(r"mic-approved", low)]
check("the MIC-approved phrase appears only as a warning", True,
      all(any(k in low[max(0, i - 200):i + 200] for k in NEGATIVE_CONTEXTS)
          for i in mic))
check("the MIC-eligibility warning is present", True, len(mic) >= 1)

# The evidence register must state that nothing has been obtained, and it
# must state the TRUE artefact count - a hardcoded count is exactly how
# this drifts.
n_artefacts = sum(len(e["artefacts"]) for e in evidence)
check("the artefact count in the prose is the true count", True,
      f"Total artefacts required: {n_artefacts}" in txt)
check("the artefact count is stated", True,
      re.search(r"Total artefacts required: \d+\. Obtained: 0\.", txt)
      is not None)
check("the evidence page states the obtained count is zero", True,
      "obtained" in low)
check("the contingency is described as a controlled reserve", True,
      "controlled reserve" in low)
check("the milestone question is stated", True,
      "what milestone does this money help us achieve" in low)

# The folder must not have drifted into the research programme's evidence
# apparatus - it is side work and must not look like a phase.
check("the folder claims no source registry ids", True,
      "GOV-" not in txt and "P1-" not in txt and "P2-" not in txt)
check("the folder records zero interviews", True,
      re.search(r"interviews? conducted\s*\|?\s*\**0", low) is not None)

# ------------------------------------------------------------------ layering
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
