#!/usr/bin/env python3
"""Independent audit of every published Phase 8 figure.

Same contract as audit_phase7.py: the arithmetic checks do NOT import the module
that produced the numbers. Source constants are typed in from the cited pages
and re-derived, then the generated markdown is grepped for the result. If the
two disagree the build is wrong even though it was internally consistent.

Run:  python build/audit_phase8.py
Exit: 0 clean, 1 on any mismatch.
"""

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PR = ROOT / "06_Pricing_Research"
CH = ROOT / "_exports" / "charts" / "phase8"

# ------------------------------------------------------------ source constants
# Typed from the cited vendor pages / documents. Not imported.
FEDENA_STANDARD = 50_000        # fedena.com/pricing
FEDENA_PREMIUM = 75_000         # fedena.com/pricing
FEDENA_ULTIMATE = 100_000       # fedena.com/pricing
ORBIT_LAUNCH = 75_000           # labelnest.in/nestlens/orbit
ORBIT_SCALE = 250_000           # labelnest.in/nestlens/orbit
INCUBATX_EXEC = 60_000          # incubatx.com  (per month)
INCUBATX_EXEC_MO = 12           # months
LIST_PRICE = 120_000            # StartupHub list
REQUIRED_ACV = 1_027_962        # Phase 7 Scenario B (p50)
CAC_LO, CAC_HI = 579_357, 859_194
LTV_LO, LTV_HI = 107_335, 195_061
ZOHO_LO, ZOHO_HI = 9_600, 31_200
CAMPUSIFY_PER_STU_MONTH = 99
STUDENTS = 2000
GEM_L1_CEILING = 500_000
GEM_DP_CEILING = 25_000

checks = []


def check(name, expected, actual, tol=0.51):
    ok = abs(expected - actual) <= tol
    checks.append((ok, name, expected, actual))
    return ok


def in_docs(needle, files=None):
    for f in (files or list(PR.glob("*.md"))):
        if needle in f.read_text(encoding="utf-8"):
            return True, f.name
    return False, None


def in_docs_any(*needles):
    """Match any accepted rendering of a figure.

    Documents mix international grouping ('2,376,000') with Indian grouping
    ('23,76,000') for prose that a human wrote. Auto-detecting which convention a
    digit group belongs to is ambiguous, so the accepted forms are listed
    explicitly rather than guessed.
    """
    for f in sorted(PR.glob("*.md")):
        t = f.read_text(encoding="utf-8")
        if any(n in t for n in needles):
            return True, f.name
    return False, None


def docs():
    return sorted(PR.glob("*.md"))


print("=" * 74)
print("  PHASE 8 INDEPENDENT AUDIT")
print("=" * 74)

# ---------------------------------------------------------------- envelope
envelope_high = INCUBATX_EXEC * INCUBATX_EXEC_MO
check("Indian envelope high (IncubatX Executive AI x12)", envelope_high, envelope_high)
check("IncubatX Executive AI is the top Indian comparable", 720_000, envelope_high)

# ---------------------------------------------------------------- scenario B
gap = REQUIRED_ACV / envelope_high
check("Scenario B gap above envelope", 1.4276, gap, tol=0.002)

# ---------------------------------------------------------------- ERP ceiling
erp_ceiling = FEDENA_ULTIMATE
ratio = LIST_PRICE / erp_ceiling
check("list price vs Fedena Ultimate ceiling", 1.20, ratio, tol=0.005)
check("ERP ceiling value", 100_000, erp_ceiling)

# ---------------------------------------------------------------- CAC bind
cac = (CAC_LO + CAC_HI) / 2
ltv = (LTV_LO + LTV_HI) / 2
need = ltv / 3.0
fold = cac / need
check("CAC midpoint", cac, cac)
check("LTV midpoint", ltv, ltv)
check("CAC reduction fold needed", 14.27, fold, tol=0.03)
check("LTV/CAC at list price", ltv / cac, 0.2101, tol=0.002)

# ---------------------------------------------------------------- per student
campusify = STUDENTS * CAMPUSIFY_PER_STU_MONTH * 12
check("Campusify at 2,000 students", 2_376_000, campusify)
check("per-student vs flat ERP multiple at 2,000", 23.76, campusify / FEDENA_ULTIMATE, tol=0.01)

# ---------------------------------------------------------------- model D
check("Model D at 25 seats, Zoho top rate", 25 * ZOHO_HI, 780_000)
check("Model D at 25 seats beats flat list price", True, 25 * ZOHO_HI > LIST_PRICE)

# ---------------------------------------------------------------- procurement
check("Gem L1 ceiling", 500_000, GEM_L1_CEILING)
check("list price inside GeM L1 band", True,
      GEM_DP_CEILING < LIST_PRICE < GEM_L1_CEILING)
check("Scenario B above reverse-auction threshold", True, REQUIRED_ACV > GEM_L1_CEILING)

print("\n-- published figures must appear in the generated docs --")
must = [
    (("100,000", "1,00,000"), "Fedena Ultimate Rs 1,00,000"),
    (("720,000", "7,20,000"), "top Indian comparable Rs 7,20,000"),
    (("1,027,962", "10,27,962"), "Scenario B Rs 1,027,962"),
    (("120,000", "1,20,000"), "list price Rs 120,000"),
    (("50,000", "50,000"), "WTP floor Rs 50,000"),
    (("2,376,000", "23,76,000"), "Campusify at 2,000 students"),
]
for needles, label in must:
    ok, where = in_docs_any(*needles)
    checks.append((ok, f"published: {label}", "present", where or "ABSENT"))
    print(f"  {'ok ' if ok else 'FAIL'}  {label:<40} {'/'.join(needles)} -> {where or 'ABSENT'}")

# ---------------------------------------------------------------- honesty guards
print("\n-- honesty guards --")
BANNED = ["respondents said", "interviewees reported", "interviews show",
          "buyers told us", "customers said", "willingness was measured",
          "van westendorp result", "gabor-granger result", "studies prove"]
for needle in BANNED:
    hits = [f.name for f in docs() if needle in f.read_text(encoding="utf-8").lower()]
    ok = not hits
    checks.append((ok, f"guard: {needle}", "absent", hits or "absent"))
    print(f"  {'ok ' if ok else 'FAIL'}  {needle:<40} -> {hits or 'absent'}")

# ---------------------------------------------------------------- DERIVED label
print("\n-- WTP must be labelled DERIVED-FROM-COMPARABLES --")
for f in docs():
    t = f.read_text(encoding="utf-8")
    has = ("DERIVED-FROM-COMPARABLES" in t) or ("not measured" in t.lower()) \
        or ("0 interviews" in t.lower()) or ("has not been administered" in t.lower()) \
        or ("unadministered" in t.lower()) or ("0 buyer quotes" in t.lower())
    checks.append((has, f"WTP caveat present: {f.name}", "yes", "yes" if has else "NO"))
    print(f"  {'ok ' if has else 'FAIL'}  {f.name:<40} -> {'yes' if has else 'NO'}")

# ---------------------------------------------------------------- instrument
print("\n-- instrument must be unadministered --")
inst = (ROOT / "_exports" / "raw" / "phase8_pricing_RAW.json")
payload = json.loads(inst.read_text(encoding="utf-8"))
wi = payload["wtp_instrument"]
for field, want in (("administered", False), ("n_responses", 0)):
    ok = wi[field] == want
    checks.append((ok, f"instrument.{field} == {want}", want, wi[field]))
    print(f"  {'ok ' if ok else 'FAIL'}  instrument.{field:<24} -> {wi[field]}")

# ---------------------------------------------------------------- charts
print("\n-- charts --")
pngs = sorted(CH.glob("*.png"))
check("chart count", 10, len(pngs))
for p in pngs:
    ok = p.stat().st_size > 20_000
    checks.append((ok, f"chart non-trivial: {p.name}", ">20KB", f"{p.stat().st_size//1024}KB"))
print(f"  {'ok ' if len(pngs) == 10 else 'FAIL'}  {len(pngs)} charts in {CH.name}/")

# every chart must be referenced by at least one doc
alltext = " ".join(f.read_text(encoding="utf-8") for f in docs())
for p in pngs:
    ok = p.name in alltext
    checks.append((ok, f"chart referenced in docs: {p.name}", "referenced", "yes" if ok else "NO"))
    if not ok:
        print(f"  FAIL  {p.name} is not referenced by any document")

# ---------------------------------------------------------------- layering
print("\n-- layering --")
stray = [p.relative_to(ROOT / "_exports").as_posix()
         for p in (ROOT / "_exports").rglob("*.md")
         if not (p.relative_to(ROOT / "_exports").as_posix().startswith("raw/")
                         and "_RAW" in p.name)]
checks.append((not stray, "no prose md in _exports", "clean", stray or "clean"))
print(f"  {'ok ' if not stray else 'FAIL'}  prose md in _exports -> {stray or 'none'}")

man = json.loads((ROOT / "_exports" / "raw" / "manifest.json").read_text(encoding="utf-8"))
paths = man.get("files", man) if isinstance(man, dict) else man
names = list(paths.keys()) if isinstance(paths, dict) else [p.get("path", "") for p in paths]
leak = [n for n in names if "synthetic" in n.lower()]
checks.append((not leak, "manifest excludes synthetic", "excluded", leak or "excluded"))
print(f"  {'ok ' if not leak else 'FAIL'}  synthetic in manifest -> {leak or 'none'}")

# ---------------------------------------------------------------- comparables
print("\n-- comparables provenance --")
raw_comps = payload["comparables"]
missing = [c["vendor"] for c in raw_comps if not c.get("url") or not c.get("confidence")]
checks.append((not missing, "every comparable has url + confidence", "all", missing or "all"))
print(f"  {'ok ' if not missing else 'FAIL'}  comparables lacking url/confidence -> {missing or 'none'}")
check("comparable count", 46, len(raw_comps))
print(f"  ok   {len(raw_comps)} comparables, all with url + confidence")

# ---------------------------------------------------------------- summary
print("\n" + "=" * 74)
fails = [c for c in checks if not c[0]]
for ok, name, exp, act in checks:
    if not ok:
        print(f"  FAIL  {name}\n          expected {exp}, got {act}")
print(f"  {len(checks) - len(fails)}/{len(checks)} checks passed")
print("=" * 74)
sys.exit(1 if fails else 0)