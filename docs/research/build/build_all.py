#!/usr/bin/env python3
"""
StartupHub research — full build.

Runs every generator in order and reports a summary.
Requires: python-docx, openpyxl (unused), xlsxwriter, matplotlib, and @mermaid-js/mermaid-cli.

Usage:  python build/build_all.py
"""

import subprocess
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
HERE = Path(__file__).resolve().parent

# Sub-process output is decoded as UTF-8 (several generators emit rupee signs and
# typographic dashes). The Windows console defaults to cp1252 and will raise
# UnicodeEncodeError on print, so force UTF-8 with replacement rather than
# letting one generator's box-drawing characters kill the whole build.
for _stream in (sys.stdout, sys.stderr):
    try:
        _stream.reconfigure(encoding="utf-8", errors="replace")
    except (AttributeError, ValueError):
        pass

STEPS = [
    ("Mermaid diagrams -> SVG + PNG", "render_diagrams.py"),
    ("Structured data -> CSV + JSON", "build_data.py"),
    ("Excel workbooks", "build_xlsx.py"),
    ("Data charts -> PNG", "build_charts.py"),
    ("Word documents", "build_docx.py"),
    ("Phase 1 - IIC annual report corpus", "build_phase1.py"),
    ("Phase 2 - customer roles and approval chain", "build_phase2.py"),
    ("Phase 3A - NIRF/ARIIA government forms", "build_phase3.py"),
    ("Phase 3B - interview programme (instruments)", "build_phase3b.py"),
    ("Phases 4/5/7/30 - segmentation, market, sizing, scorecard", "build_phase45.py"),
    ("Raw evidence layer + manifest", "build_raw.py"),
]


def audit_layering() -> list:
    """Enforce the repo rule: summaries live in the 14 topic folders, data in _exports.

    The only markdown allowed inside _exports/ is raw/*_RAW.md - unedited
    extraction, which is data by definition. Anything else with prose in it is a
    summary that has been written to the wrong place.
    """
    ex = ROOT / "_exports"
    stray = []
    for p in ex.rglob("*.md"):
        rel = p.relative_to(ex).as_posix()
        if rel.startswith("raw/") and "_RAW" in p.name:
            continue
        stray.append(rel)
    return stray


def main() -> int:
    t0 = time.time()
    print("=" * 78)
    print("  STARTUPHUB RESEARCH — FULL BUILD")
    print("=" * 78)
    failed = []
    for i, (label, script) in enumerate(STEPS, 1):
        print(f"\n[{i}/{len(STEPS)}] {label}")
        print("-" * 78)
        r = subprocess.run([sys.executable, str(HERE / script)],
                           cwd=str(ROOT), capture_output=True, text=True, encoding="utf-8", errors="replace")
        out = (r.stdout or "").strip()
        if out:
            print(out)
        if r.returncode != 0:
            err = (r.stderr or "").strip()[-800:]
            print(f"!! FAILED (exit {r.returncode})\n{err}")
            failed.append(script)

    stray = audit_layering()
    if stray:
        print(f"\n!! LAYERING VIOLATION - prose found inside _exports/ ({len(stray)}):")
        for s in stray:
            print(f"   - _exports/{s}")
        print("   Summaries belong in the 00_-14_ topic folders. Move it and rebuild.")
        failed.append("layering")

    ex = ROOT / "_exports"
    counts = {ext: len(list(ex.rglob(f"*.{ext}")))
              for ext in ("md", "csv", "json", "xlsx", "docx", "svg", "png", "mmd")}
    size = sum(p.stat().st_size for p in ex.rglob("*") if p.is_file())

    print("\n" + "=" * 78)
    print(f"  BUILD COMPLETE in {time.time() - t0:.0f}s" if not failed else
          f"  BUILD FINISHED WITH {len(failed)} FAILURE(S) in {time.time() - t0:.0f}s")
    print("=" * 78)
    print(f"  _exports/  —  {size / 1024 / 1024:.1f} MB")
    for ext, n in counts.items():
        if n:
            print(f"    .{ext:5s} {n:4d}")
    if failed:
        print(f"\n  FAILED: {failed}")
        return 1
    print("\n  Entry points:")
    print("    _exports/docx/StartupHub_Phase0_Findings.docx")
    print("    _exports/xlsx/StartupHub_Research_Database_MASTER.xlsx")
    print("    _exports/charts/            9 data charts (PNG)")
    print("    _exports/diagrams/svg/      6 Mermaid diagrams (SVG + PNG)")
    print("    _exports/json/              9 structured datasets")
    print("    01_Problem_Research/F_Synthesis/IIC_Corpus_Analysis.md   Phase 1 corpus findings")
    print("    _exports/phase1/            Phase 1 corpus data (csv + json + schema)")
    print("    08_User_Roles/README.md    Phase 2 roles, buying centres, approval chain")
    print("    _exports/phase2/            Phase 2 role + procurement data")
    print("    01_Problem_Research/F_Synthesis/Government_Form_Analysis.md  Phase 3A forms")
    print("    _exports/phase3/            Phase 3A NIRF/ARIIA form data")
    print("    02_User_Research/README.md  Phase 3B interview programme (0 conducted)")
    print("    _exports/phase3b/           Phase 3B instruments, shortlist, codes")
    print("    03_Market_Research/README.md  Phase 5 ecosystem base (T1 sources)")
    print("    05_Market_Sizing/README.md    Phase 7 TAM/SAM/SOM as ranges")
    print("    13_Synthesis/Validation_Scorecard.md  Phase 30, interviews = 0")
    print("    _exports/raw/manifest.json  every file, SHA-256 hashed")
    return 0


if __name__ == "__main__":
    sys.exit(main())