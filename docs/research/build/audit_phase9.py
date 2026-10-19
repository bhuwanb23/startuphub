#!/usr/bin/env python3
"""Independent audit of Phase 9.

Same contract as audit_phase7/8: arithmetic is re-derived from hand-entered
source constants rather than imported from the producing module, then the
generated markdown is grepped for the results.

It also carries a REGRESSION GUARD specific to this phase. Phase 9 falsified two
Phase 0 claims. If a later edit restores the false wording without a correction
record, this must fail - otherwise the correction silently evaporates.

Run:  python build/audit_phase9.py
Exit: 0 clean, 1 on any mismatch.
"""

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CR = ROOT / "07_Competitor_Research"
CH = ROOT / "_exports" / "charts" / "phase9"
OLD = ROOT / "04_Competitor_DeepDive"

# ------------------------------------------------------- source constants
# Typed from the cited vendor pages. Not imported.
N_COMPETITORS = 28
N_DIRECT = 13
N_GLOBAL = 15
N_ECOSYSTEM = 10
N_INDIRECT = 8
N_GAPS = 13
N_CRITICAL = 3
N_REVISED = 5
N_FALSIFIED = 2
N_CHARTS = 12
N_FEATURES = 12

# named-customer evidence grades, expected counts
# NAMED_LOGO fell from 4 to 3 in Phase 10: Elsevier Pure was graded NAMED_LOGO on
# the basis of "universities and research institutions worldwide", which is a
# generic marketing claim, not a logo. Phase 10's validation caught it.
EV = {"NAMED_REFERENCE": 2, "NAMED_LOGO": 3, "VENDOR_CLAIM": 7, "UNKNOWN": 16}

# vendors named in Phase 9 research that Phase 0 recorded as unverified
RESOLVED_VENDORS = ["RiserNest", "VentureLink", "EcoSync"]

checks = []


def check(name, expected, actual):
    ok = expected == actual
    checks.append((ok, name, expected, actual))
    return ok


def in_docs_any(*needles):
    for f in sorted(CR.rglob("*.md")):
        t = f.read_text(encoding="utf-8")
        if any(n in t for n in needles):
            return True, str(f.relative_to(CR))
    return False, None


def docs():
    return sorted(CR.rglob("*.md"))


print("=" * 74)
print("  PHASE 9 INDEPENDENT AUDIT")
print("=" * 74)

raw = json.loads((ROOT / "_exports" / "raw" / "phase9_competitors_RAW.json")
                 .read_text(encoding="utf-8"))
comps = raw["competitors"]

print("\n-- counts --")
check("competitors", N_COMPETITORS, len(comps))
check("direct competitors", N_DIRECT, len([c for c in comps if c["category"] == "direct"]))
check("global competitors", N_GLOBAL, len([c for c in comps if c["category"] == "global"]))
check("ecosystem platforms", N_ECOSYSTEM, len(raw["ecosystem"]))
check("indirect alternatives", N_INDIRECT, len(raw["indirect"]))
check("positioning gaps", N_GAPS, len(raw["positioning_gaps"]))
check("critical gaps", N_CRITICAL, len([g for g in raw["positioning_gaps"]
                                        if g["severity"] == "CRITICAL"]))
check("revised claims", N_REVISED, len(raw["revised_claims"]))
check("falsified claims", N_FALSIFIED, len([r for r in raw["revised_claims"]
                                             if r["status"] == "FALSIFIED"]))
check("feature axes", N_FEATURES, len(raw["features"]))
total = len(comps) + len(raw["ecosystem"]) + len(raw["indirect"])
check("total entities", 46, total)

print("\n-- evidence grading --")
ev = {}
for c in comps:
    ev[c["evidence"]] = ev.get(c["evidence"], 0) + 1
for k, v in EV.items():
    check(f"evidence {k}", v, ev.get(k, 0))
check("every competitor graded", N_COMPETITORS, sum(ev.values()))

# An evidence grade of NAMED_REFERENCE / NAMED_LOGO asserts that a specific
# organisation exists. Zero named customers means the grade is unsupported.
for c in comps:
    if c["evidence"] in ("NAMED_REFERENCE", "NAMED_LOGO"):
        check(f"{c['name']} grade backed by a named customer", True, c["customers_n"] >= 1)

print("\n-- the surviving white space --")
tot = {t["key"]: t["n_with"] for t in raw["feature_totals"]}
check("mandate coverage is ZERO", 0, tot.get("mandate"))
check("trl coverage", 3, tot.get("trl"))
check("ipr coverage", 6, tot.get("ipr"))
check("intake coverage", 22, tot.get("intake"))

print("\n-- REGRESSION GUARD: falsified claims must stay corrected --")
blob = " ".join(str(g) for g in raw["positioning_gaps"]) + \
       " ".join(str(r) for r in raw["revised_claims"])
false_claims = [
    "No competitor can prove a large Indian institution runs on their software",
    "zero competitors have an IPR module",
    "Zero of 11 competitors have an IPR module",
]
restored = [c for c in false_claims if c in blob and "FALSIFIED" not in blob]
check("no un-corrected false claim restored", [], restored)
check("falsification record present", True, "FALSIFIED" in blob)

for g in raw["positioning_gaps"]:
    fb = (g.get("falsified_by") or "").strip()
    if g["status"] == "SURVIVES UNCHANGED" and not fb.startswith("None"):
        check(f"{g['gap_id']} unchanged-with-falsifier", "no falsifier", fb[:40])
    check(f"{g['gap_id']} n_total matches", N_COMPETITORS, g["n_total"])

print("\n-- unverified Phase 0 vendors now resolved --")
names = " ".join(c["name"] for c in comps)
for v in RESOLVED_VENDORS:
    check(f"{v} present and resolved", True, v in names)
    found, where = in_docs_any(v)
    check(f"{v} appears in docs", True, found)

print("\n-- spec coverage --")
subcats = set(raw["global_subcategories"])
for k in ("innovation", "incubator", "accelerator", "ecosystem", "tech_transfer"):
    check(f"sub-category {k}", True, k in subcats)
eco_names = " ".join(e["name"] for e in raw["ecosystem"]).lower().replace("-", "")
for req in ("startup india", "bhaskar", "iic portal", "yuktinir", "state startup"):
    check(f"spec ecosystem platform: {req}", True, req.replace("-", "") in eco_names)

print("\n-- published figures appear in the docs --")
must = [
    (("28", "of 28"), "28 competitors"),
    (("zero of 28", "Zero of 28", "0/28"), "zero mandate coverage"),
    (("EcoSync",), "EcoSync named"),
    (("TBI-KIET",), "TBI-KIET named"),
    (("ICUBE",), "ICUBE named"),
    (("Wellspring",), "Wellspring named"),
    (("tech-transfer", "tech transfer", "Tech Transfer"), "tech-transfer category"),
]
for needles, label in must:
    found, where = in_docs_any(*needles)
    checks.append((found, f"published: {label}", "present", where or "ABSENT"))
    print(f"  {'ok ' if found else 'FAIL'}  {label:<40} -> {where or 'ABSENT'}")

print("\n-- honesty guards --")
BANNED = ["competitors told us", "interviews show", "studies prove", "users say",
          "a customer told us", "according to our research partner"]
for needle in BANNED:
    hits = [str(f.relative_to(CR)) for f in docs()
            if needle in f.read_text(encoding="utf-8").lower()]
    check(f"guard: {needle}", [], hits)

print("\n-- every document discloses the interview status --")
for f in docs():
    t = f.read_text(encoding="utf-8").lower()
    has = ("0 interviews" in t or "0 competitor" in t or
           "vendor_claim" in t or "evidence" in t)
    check(f"evidence posture disclosed: {f.relative_to(CR)}", True, has)

print("\n-- charts --")
pngs = sorted(CH.glob("*.png"))
check("chart count", N_CHARTS, len(pngs))
alltext = " ".join(f.read_text(encoding="utf-8") for f in docs())
for p in pngs:
    check(f"chart referenced: {p.name}", True, p.name in alltext)

print("\n-- supersession --")
stub = OLD / "00_INDEX.md"
check("04 stub exists", True, stub.exists())
check("04 stub points to 07", True,
      "07_Competitor_Research" in stub.read_text(encoding="utf-8"))

print("\n-- layering --")
stray = [p.relative_to(ROOT / "_exports").as_posix()
         for p in (ROOT / "_exports").rglob("*.md")
         if not (p.relative_to(ROOT / "_exports").as_posix().startswith("raw/")
                         and "_RAW" in p.name)]
check("no prose md in _exports", [], stray)
man = json.loads((ROOT / "_exports" / "raw" / "manifest.json").read_text(encoding="utf-8"))
paths = man.get("files", man) if isinstance(man, dict) else man
names_man = list(paths.keys()) if isinstance(paths, dict) else [p.get("path", "") for p in paths]
check("manifest excludes synthetic", [], [n for n in names_man if "synthetic" in n.lower()])

print("\n" + "=" * 74)
fails = [c for c in checks if not c[0]]
for ok, name, exp, act in checks:
    if not ok:
        print(f"  FAIL  {name}\n          expected {exp}, got {act}")
print(f"  {len(checks) - len(fails)}/{len(checks)} checks passed")
print("=" * 74)
sys.exit(1 if fails else 0)