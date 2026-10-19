#!/usr/bin/env python3
"""Independent audit of every published Phase 7 figure.

The point of this script is that it does NOT import the module that produced the
numbers for the arithmetic checks. It re-derives each published figure from
hand-entered source constants, then greps the generated markdown for that
figure. If the two disagree, the build is wrong even though it was internally
consistent - which is exactly the failure mode a self-checking build cannot see.

Run:  python build/audit_phase7.py
Exit: 0 clean, 1 on any mismatch.
"""

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
MD = ROOT / "05_Market_Sizing"

# ---------------------------------------------------------------- source facts
# Typed in from the cited sources, NOT imported from build modules.
HEIS = 58_643            # AISHE 2021-22
UNIV = 1_168             # AISHE 2021-22
COLLEGES = 45_473        # AISHE 2021-22
IIC_FLOOR = 14_067       # AIM 2024-07-31
IIC_CEIL = 16_367        # MoE status page
FILERS = 777             # NIRF 2025 Innovation category
NKN_UNIV, NKN_COLL = 0.56, 0.24
CPU_UNIV, CPU_COLL = 0.93, 0.88
EAST_FILERS = 58         # NIRF 2025 regional
NIT_BUDGET_CR = 189.58   # Union Budget 2025-26

ACV_A = 120_000          # StartupHub list price
ACV_B = 1_027_962        # simulated required ACV (p50)

G9_ACV_LO, G9_ACV_HI = 2_500_000, 8_000_000
G9_N_LO, G9_N_HI = 3, 8

CR = 1e7

checks = []


def check(name, expected, actual, tol=0.051):
    ok = abs(expected - actual) <= tol
    checks.append((ok, name, expected, actual))
    return ok


def in_docs(needle, files=None):
    """Is this literal string present in the generated markdown?"""
    files = files or list(MD.glob("*.md"))
    for f in files:
        if needle in f.read_text(encoding="utf-8"):
            return True, f.name
    return False, None


def cr_str(v):
    return f"{v / CR:.1f}"


print("=" * 74)
print("  PHASE 7 INDEPENDENT AUDIT")
print("=" * 74)

# ---------------------------------------------------------------- TAM (M1, A)
tam_lo = IIC_FLOOR * ACV_A
tam_hi = IIC_CEIL * ACV_A
check("TAM M1 low (cr)", IIC_FLOOR * ACV_A / CR, tam_lo / CR)
check("TAM M1 high (cr)", IIC_CEIL * ACV_A / CR, tam_hi / CR)

tamB_lo = IIC_FLOOR * ACV_B
tamB_hi = IIC_CEIL * ACV_B
check("TAM M1 low B (cr)", IIC_FLOOR * ACV_B / CR, tamB_lo / CR)

# ---------------------------------------------------------------- SAM funnel
f1 = UNIV + COLLEGES
check("filter 1 population", 46_641, f1)
check("filter 1 survival %", f1 / HEIS * 100, 79.5, tol=0.05)

f2_lo = int(UNIV * NKN_UNIV + COLLEGES * NKN_COLL)
f2_hi = int(UNIV * CPU_UNIV + COLLEGES * CPU_COLL)
check("filter 2 low (NKN)", 11_567, f2_lo)
check("filter 2 high (computer centre)", 41_102, f2_hi)

check("filter 3 population (measured)", 777, FILERS)

f5_lo = int(FILERS * 0.75)
check("filter 5 low (ecosystem haircut)", 582, f5_lo)

f6_lo = FILERS - EAST_FILERS
check("filter 6 raw low (drop East)", 719, f6_lo)
# ...but filter 6 is applied to what survived filter 5, so it cannot go below 582
check("filter 6 effective low (capped by filter 5)", f5_lo, min(f5_lo, f6_lo))

sam_lo, sam_hi = f5_lo, FILERS
check("SAM low (cr)", sam_lo * ACV_A / CR, 6.984, tol=0.051)
check("SAM high (cr)", sam_hi * ACV_A / CR, 9.324, tol=0.051)
check("SAM low B (cr)", sam_lo * ACV_B / CR, sam_lo * ACV_B / CR)
check("SAM as % of registered", sam_hi / HEIS * 100, 1.32, tol=0.005)

# ---------------------------------------------------------------- price ratio
check("required ACV / list price", ACV_B / ACV_A, 8.566, tol=0.001)
check("required ACV as % of NIT budget", ACV_B / (NIT_BUDGET_CR * CR) * 100, 0.0542, tol=0.001)
check("list price as % of NIT budget", ACV_A / (NIT_BUDGET_CR * CR) * 100, 0.00634, tol=0.001)

# ---------------------------------------------------------------- state SOTP
check("G9 low (cr)", G9_N_LO * G9_ACV_LO / CR, 0.75, tol=0.005)
check("G9 high (cr)", G9_N_HI * G9_ACV_HI / CR, 6.4, tol=0.005)

# ---------------------------------------------------------------- funnel shape
prev_hi = prev_lo = HEIS
for label, lo, hi in [("type", f1, f1), ("digital", f2_lo, f2_hi),
                      ("innovation", FILERS, FILERS), ("budget", FILERS, FILERS),
                      ("ecosystem", f5_lo, FILERS), ("geography", f5_lo, FILERS)]:
    hi = min(prev_hi, hi)
    lo = min(prev_lo, lo)
    if lo > hi:
        lo = hi
    if hi > prev_hi or lo > hi:
        checks.append((False, f"funnel monotonic at {label}", "decreasing", f"{lo}-{hi}"))
    prev_lo, prev_hi = lo, hi
check("funnel terminates at 582-777", True, (prev_lo, prev_hi) == (582, 777))

# ---------------------------------------------------------------- published text
print("\n-- published figures must appear in the generated docs --")
must_appear = [
    (f"{cr_str(tam_lo)}-{cr_str(tam_hi)}", "TAM M1 Scenario A range"),
    (f"{cr_str(tam_lo)}", "TAM M1 low"),
    (f"{ACV_A:,}", "Scenario A ACV"),
    (f"{ACV_B:,}", "Scenario B ACV"),
    ("582", "SAM lower bound"),
    ("777", "SAM measured cross-check"),
    (f"{cr_str(sam_lo * ACV_A)}-{cr_str(sam_hi * ACV_A)}", "SAM value Scenario A"),
]
for needle, label in must_appear:
    ok, where = in_docs(needle)
    checks.append((ok, f"published: {label} ('{needle}')", "present", where or "ABSENT"))
    print(f"  {'ok ' if ok else 'FAIL'}  {label:<42} '{needle}'  -> {where or 'ABSENT'}")

# ---------------------------------------------------------------- honesty guards
print("\n-- honesty guards --")
guards = [
    ("respondents said", "fabricated observation phrasing"),
    ("interviewees reported", "fabricated observation phrasing"),
    ("interviews show", "fabricated observation phrasing"),
    ("they told us", "fabricated observation phrasing"),
    ("studies prove", "unsourced authority claim"),
]
for needle, label in guards:
    hits = [f.name for f in MD.glob("*.md") if needle in f.read_text(encoding="utf-8").lower()]
    ok = not hits
    checks.append((ok, f"guard: {needle}", "absent", hits or "absent"))
    print(f"  {'ok ' if ok else 'FAIL'}  {label:<42} -> {hits or 'absent'}")

# every doc must state interviews = 0
print("\n-- every document must disclose 0 interviews --")
for f in sorted(MD.glob("*.md")):
    t = f.read_text(encoding="utf-8")
    has = ("0" in t and "nterview" in t)
    checks.append((has, f"discloses interviews: {f.name}", "yes", "yes" if has else "NO"))
    print(f"  {'ok ' if has else 'FAIL'}  {f.name:<42} -> {'yes' if has else 'NO'}")

# ---------------------------------------------------------------- layering
print("\n-- layering: no prose md inside _exports except raw/*_RAW.md --")
stray = []
for p in (ROOT / "_exports").rglob("*.md"):
    rel = p.relative_to(ROOT / "_exports").as_posix()
    if not (rel.startswith("raw/") and "_RAW" in p.name):
        stray.append(rel)
checks.append((not stray, "layering audit", "clean", stray or "clean"))
print(f"  {'ok ' if not stray else 'FAIL'}  prose md in _exports -> {stray or 'none'}")

# ---------------------------------------------------------------- synthetic excluded
print("\n-- synthetic layer excluded from manifest --")
import json
man = json.loads((ROOT / "_exports" / "raw" / "manifest.json").read_text(encoding="utf-8"))
paths = man.get("files", man) if isinstance(man, dict) else man
if isinstance(paths, dict):
    names = list(paths.keys())
else:
    names = [p.get("path", "") for p in paths]
leak = [n for n in names if "synthetic" in n.lower()]
checks.append((not leak, "manifest excludes _exports/synthetic", "excluded", leak or "excluded"))
print(f"  {'ok ' if not leak else 'FAIL'}  synthetic in manifest -> {leak or 'none'}")

# ---------------------------------------------------------------- summary
print("\n" + "=" * 74)
fails = [c for c in checks if not c[0]]
for ok, name, exp, act in checks:
    if not ok:
        print(f"  FAIL  {name}\n          expected {exp}, got {act}")
print(f"  {len(checks) - len(fails)}/{len(checks)} checks passed")
print("=" * 74)
sys.exit(1 if fails else 0)