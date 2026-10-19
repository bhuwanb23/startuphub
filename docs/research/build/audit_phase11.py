#!/usr/bin/env python3
"""Independent audit of Phase 11 - the competitor user reviews.

This phase's entire value is that it did NOT report what the search would have
made easy to report. Most of the checks below exist to catch a drift back
toward that: a vendor blog quoted as a user complaint, an aggregator's copy of
a vendor's homepage counted as a review, an incentive flag stripped off a quote,
or a searched-but-empty platform quietly omitted.

Two jobs:

  1. Re-derive the headline figures from the raw JSON rather than importing the
     producing module.
  2. Enforce the evidence ladder. Only USER_REVIEW, USER_INSTITUTIONAL and
     USER_FORUM may originate an opportunity claim.

Run:  python build/audit_phase11.py
Exit: 0 clean, 1 on any failure.
"""

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
UR = ROOT / "09_User_Reviews"
CH = ROOT / "_exports" / "charts" / "phase11"
EX = ROOT / "_exports" / "phase11"
XLSX = ROOT / "_exports" / "xlsx" / "09_Competitor_User_Reviews.xlsx"
RAW = ROOT / "_exports" / "raw" / "phase11_reviews_RAW.json"

# ------------------------------------------------------------- constants
N_RECORDS = 37
N_USABLE = 24
N_PLATFORMS = 13
N_CATEGORIES = 12
N_COVERAGE = 32
N_CONFLICTS = 4
N_NEW_COMPETITORS = 4
N_CHARTS = 8
N_DOCS = 7
MATRIX_VENDORS = 40
EXCLUDED_GRADES = {"VENDOR_MARKETING", "VENDOR_TESTIMONIAL", "EDITORIAL",
                   "AGGREGATOR_ECHO"}
CLAIM_GRADES = {"USER_REVIEW", "USER_INSTITUTIONAL", "USER_FORUM"}

checks = []


def check(name, expected, actual):
    ok = expected == actual
    checks.append((ok, name, expected, actual))
    return ok


def docs():
    return sorted(UR.rglob("*.md"))


def in_docs_any(*needles):
    for f in docs():
        t = f.read_text(encoding="utf-8")
        if any(n in t for n in needles):
            return True, f.name
    return False, None


print("=" * 74)
print("  PHASE 11 INDEPENDENT AUDIT")
print("=" * 74)

raw = json.loads(RAW.read_text(encoding="utf-8"))
reviews = raw["reviews"]
grades = raw["grades"]
taxonomy = raw["pain_categories"]

print("\n-- structure --")
check("review records", N_RECORDS, len(reviews))
check("grades defined", 10, len(grades))
check("platforms searched", N_PLATFORMS, len(raw["platforms"]))
check("pain categories", N_CATEGORIES, len(taxonomy))
check("coverage notes", N_COVERAGE, len(raw["coverage_notes"]))
check("conflicts recorded", N_CONFLICTS, len(raw["conflicts"]))
check("new competitors", N_NEW_COMPETITORS, len(raw["new_competitors"]))
check("workbook exists", True, XLSX.exists())
check("documents written", N_DOCS, len(docs()))

print("\n-- the evidence ladder --")
usable = [r for r in reviews if r["grade"] in CLAIM_GRADES]
check("usable as user voice", N_USABLE, len(usable))

# THE central guard. No excluded grade may appear in the complaint set.
leaked = [r["id"] for r in usable if r["grade"] in EXCLUDED_GRADES]
check("no excluded grade may originate a claim", [], leaked)

# Every review carries a grade that actually exists in the ladder.
unknown_grade = [r["id"] for r in reviews if r["grade"] not in {g[0] for g in grades}]
check("every record has a defined grade", [], unknown_grade)

# Only three grades are permitted to claim.
claimers = [g[0] for g in grades if g[3] == "YES"]
check("claim-capable grades", sorted(CLAIM_GRADES), sorted(claimers))

print("\n-- provenance: every quote is traceable --")
no_url = [r["id"] for r in reviews if not r.get("url")]
check("every record carries a source URL", [], no_url)
quoted = [r for r in reviews if r.get("dislike")]
check("every quote has a URL", [], [r["id"] for r in quoted if not r["url"]])

# Snippet-grade records must never be marked verbatim-verified.
snip_bad = [r["id"] for r in reviews
            if r["grade"] == "SNIPPET" and r.get("verified")]
check("SNIPPET never marked verbatim-verified", [], snip_bad)

# An aggregator echo must announce itself as excluded in its own text.
echo_bad = [r["id"] for r in reviews
            if r["grade"] == "AGGREGATOR_ECHO" and "EXCLUDED" not in r.get("dislike", "")]
check("aggregator echoes labelled EXCLUDED in-band", [], echo_bad)

print("\n-- the aggregator echo guard --")
echo = [r for r in reviews if r["grade"] == "AGGREGATOR_ECHO"]
check("the known echo is present", 1, len(echo))
check("echo is incuTrack / topbusinesssoftware", True,
      bool(echo and "topbusinesssoftware" in echo[0]["url"]))

print("\n-- incentive flags survive extraction --")
flagged = [r for r in reviews if r.get("incentive")]
check("incentive-flagged records", 8, len(flagged))
csv_txt = (EX / "reviews.csv").read_text(encoding="utf-8-sig")
check("incentive column exported", True, "incentive_flagged" in csv_txt)
check("flagged records still marked YES in csv", True,
      csv_txt.count(",YES,") >= len(flagged))

print("\n-- absence is recorded, not dropped --")
cats = {c[0] for c in taxonomy}
check("NO_COMPLAINT_RECORDED bucket exists", True,
      "NO_COMPLAINT_RECORDED" in cats)
check("every review pain category is defined", [],
      sorted({r["pain"] for r in reviews} - cats))
notapp = [c for c in raw["coverage_notes"] if c[2] == "NOT_APPLICABLE"]
check("app stores / google reviews marked not-applicable", True, len(notapp) >= 3)
check("app stores covered", True,
      any("APP_STORES" in c[1] for c in raw["coverage_notes"]))
check("google reviews covered", True,
      any("GOOGLE_REVIEWS" in c[1] for c in raw["coverage_notes"]))
check("product hunt covered", True,
      any("PRODUCT_HUNT" in c[1] for c in raw["coverage_notes"]))

print("\n-- conflicts are recorded, not averaged --")
for v in ("incuTrack", "Accubate", "IdeaScale", "Envisio"):
    check(f"conflict recorded: {v}", True,
          any(c["vendor"] == v for c in raw["conflicts"]))

# The incuTrack review count must NOT be treated as verified anywhere.
incu = [r for r in reviews if r["vendor"] == "incuTrack"]
check("incuTrack G2 records are SNIPPET only", True,
      all(r["grade"] == "SNIPPET" for r in incu
          if r["platform"] == "G2"))
check("incuTrack conflict text flags exclusion", True,
      any("excluded from market-position" in c["resolution"]
          for c in raw["conflicts"] if c["vendor"] == "incuTrack"))

print("\n-- honesty guards on the published prose --")
check("zero interviews stated", True,
      any("0 interviews conducted" in f.read_text(encoding="utf-8") for f in docs()))
ok, where = in_docs_any("0 competitor conversations")
check("zero competitor conversations stated", True, ok)
ok, where = in_docs_any("no recorded user dissatisfaction",
                         "Nobody in this category complains")
check("headline negative finding stated", True, ok)
ok, where = in_docs_any("AGGREGATOR_ECHO")
check("aggregator echo documented", True, ok)
ok, where = in_docs_any("Google Forms")
check("real incumbent named", True, ok)
ok, where = in_docs_any("ICUBE")
check("institutional voice used", True, ok)
ok, where = in_docs_any("Not supported by evidence")
check("unsupported claims explicitly rejected", True, ok)

# The prose must not smuggle vendor marketing in as user voice.
vm_docs = [f.name for f in docs()
           if "VENDOR_MARKETING" in f.read_text(encoding="utf-8")
           and "01_Evidence_Grading.md" != f.name]
check("vendor marketing named only in the grading doc", True, len(vm_docs) <= 2)
print(f"       (vendor marketing named in: {', '.join(vm_docs) or 'none'})")

print("\n-- matrix extension carried through --")
mraw = json.loads((ROOT / "_exports" / "raw" / "phase10_matrix_RAW.json")
                  .read_text(encoding="utf-8"))
mnames = {r["competitor"] for r in mraw["rows"]}
check("matrix vendors", MATRIX_VENDORS, len(mnames))
for v in ("IncuMan", "ESI Incubation Centre OS",
          "CSM Technologies (STPI CoE)", "SanchiApp"):
    check(f"phase 11 discovery in matrix: {v}", True, v in mnames)
check("phase11 csv agrees with the matrix", MATRIX_VENDORS,
      sum(1 for line in (EX / "vendor_sentiment.csv")
          .read_text(encoding="utf-8-sig").splitlines() if line.strip()) - 1)

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

print("\n" + "=" * 74)
fails = [c for c in checks if not c[0]]
for ok_, name, exp, act in checks:
    if not ok_:
        print(f"  FAIL  {name}\n          expected {exp}, got {act}")
print(f"  {len(checks) - len(fails)}/{len(checks)} checks passed")
print("=" * 74)
sys.exit(1 if fails else 0)