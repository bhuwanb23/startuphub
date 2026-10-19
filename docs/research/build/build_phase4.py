#!/usr/bin/env python3
"""StartupHub Phase 4 exporter - the segmentation matrix.

Replaces the earlier narrative segment census with the MATRIX todo.md asks for.

Writes:
  03_Market_Research/Segmentation_Matrix.md   the matrix + quadrant + module fit
  03_Market_Research/ICP.md                  ICP, predicate audit, exclusions
  03_Market_Research/Segment_Census.md        short redirect (superseded)
  _exports/phase45/segmentation_matrix.csv
  _exports/phase45/type_crosswalk.csv
  _exports/phase45/activity_scale_bands.csv
  _exports/phase45/module_fit.csv
  _exports/phase45/segment_quadrant.csv

Usage:  python build/build_phase4.py
"""

import csv
import json
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
ROOT = HERE.parent

import data_p4_segmentation as P    # noqa: E402

OUT = ROOT / "_exports" / "phase45"
MR = ROOT / "03_Market_Research"
GENERATED = "2026-10-19"


def write_csv(path, cols, rows):
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", newline="", encoding="utf-8-sig") as fh:
        w = csv.DictWriter(fh, fieldnames=cols, extrasaction="ignore")
        w.writeheader()
        for r in rows:
            w.writerow(r)
    return len(rows)


# --------------------------------------------------------------------------
# machine exports
# --------------------------------------------------------------------------
MATRIX_COLS = ["id", "name", "types", "activity_scale", "ip_depth", "willingness_to_pay",
               "needs", "urgency", "urgency_basis", "revenue", "revenue_basis", "quadrant",
               "grade", "population", "population_basis", "excluded", "why_primary"]


def write_matrix():
    q = {r["id"]: r for r in P.quadrant_table()}
    rows = []
    for s in P.SEGMENTS:
        rows.append({
            "id": s["id"], "name": s["name"], "types": "; ".join(s["types"]),
            "activity_scale": s["activity_scale"], "ip_depth": s["ip_depth"],
            "willingness_to_pay": s["wtp"], "needs": "; ".join(s["needs"]),
            "urgency": s["urgency"], "urgency_basis": s["urgency_basis"],
            "revenue": s["revenue"], "revenue_basis": s["revenue_basis"],
            "quadrant": q[s["id"]]["quadrant"], "grade": s["grade"],
            "population": s["population"], "population_basis": s["population_basis"],
            "excluded": s.get("excluded_from_initial_outreach", False),
            "why_primary": s["why_primary"],
        })
    return write_csv(OUT / "segmentation_matrix.csv", MATRIX_COLS, rows)


def write_crosswalk():
    rows = [dict(corpus_label=k, corpus_documents=sum(
                    1 for r in __import__("data_p1_iic_records").IIC_REPORTS
                    if r.get("institution_type") == k),
                spec_type=v,
                spec_vocabulary_entry=v in P.AXES["institution_type"])
            for k, v in P.TYPE_CROSSWALK.items()]
    return write_csv(OUT / "type_crosswalk.csv",
                     ["corpus_label", "corpus_documents", "spec_type", "spec_vocabulary_entry"], rows)


def write_bands():
    return write_csv(OUT / "activity_scale_bands.csv",
                     ["id", "institution", "short_name", "corpus_type", "spec_type",
                      "activity_band", "fields_reported", "fields_total",
                      "activities_total", "ideas_generated", "startups_total", "amount_inr"],
                     P.activity_profile())


MODULE_COLS = ["segment_id", "segment", "module", "need", "forcing_event", "fit", "note"]


def write_module_fit():
    rows = []
    for s in P.SEGMENTS:
        for mod, fit in s["modules"].items():
            m = P.MODULES[mod]
            rows.append(dict(segment_id=s["id"], segment=s["name"], module=mod,
                             need=m["need"], forcing_event=m["forcing_event"], fit=fit,
                             note=m["note"]))
    return write_csv(OUT / "module_fit.csv", MODULE_COLS, rows)


def write_quadrant():
    cols = ["id", "name", "urgency", "revenue", "quadrant", "wtp",
            "activity_scale", "ip_depth", "grade", "excluded_from_initial_outreach"]
    return write_csv(OUT / "segment_quadrant.csv", cols, P.quadrant_table())


# --------------------------------------------------------------------------
# prose
# --------------------------------------------------------------------------
def write_matrix_doc():
    MR.mkdir(parents=True, exist_ok=True)
    p = MR / "Segmentation_Matrix.md"
    prof = P.activity_profile()
    dist = P.band_distribution()
    q = P.quadrant_table()
    L = []
    a = L.append

    a("# Customer Segmentation Matrix")
    a("")
    a(f"**Phase 4 — built {GENERATED} by `build/build_phase4.py` from "
      f"`data_p4_segmentation.py`. {len(P.SEGMENTS)} segments, "
      f"{len(P.AXES['institution_type'])} institution types.**")
    a("")
    a("> **Derived from published documents, not from interviews. "
      "Interviews conducted: 0.** Activity Scale is *computed* from the 36-document "
      "Phase 1 corpus. Willingness to pay is a **documented rule applied to sourced "
      "signals** — `OQ-03` remains open, so no WTP band here is a measured outcome.")
    a("")

    a("---")
    a("")
    a("## Two departures from the spec, both declared")
    a("")
    a("### 1. Maturity is split into two axes")
    a("")
    a("The corpus **cannot** support a single maturity axis. Field coverage across "
      f"the {P.activity_profile()[0]['fields_total'] and 36} documents:")
    a("")
    a("| Field | Populated | Bandable? |")
    a("|---|---:|---|")
    for c in P.ip_depth_coverage():
        a(f"| `{c['field']}` | {c['populated']}/{c['corpus']} ({c['coverage_pct']}%) | "
          f"{'yes' if c['bandable'] else '**NO**'} |")
    a("")
    a("The four fields that *are* usable: `activities_total` 22/36 (61%), "
      "`ideas_generated` 22/36 (61%), `amount_inr` 22/36 (61%), "
      "`startups_total` 18/36 (50%).")
    a("")
    a("So maturity becomes:")
    a("")
    a("- **Activity Scale** — *derived*. How much innovation activity is demonstrable.")
    a("- **IP Depth** — *unmeasurable*. Carried as `UNKNOWN`, and the build **refuses "
      "to let any numeric IP score exist**.")
    a("")
    a(f"> {P.IP_DEPTH['reason']}")
    a("")
    a(f"> **What still stands without IP-depth data:** {P.IP_DEPTH['still_actionable']}")
    a("")

    a("### 2. A 12th institution type: `College (affiliated/general)`")
    a("")
    a(f"> {P.VOCABULARY_DEPARTURE['reason']}")
    a("")
    a(f"**Authority:** {P.VOCABULARY_DEPARTURE['authority']}.")
    a("")

    a("---")
    a("")
    a("## The matrix")
    a("")
    a("| ID | Segment | Types | Activity | IP Depth | WTP | Needs |")
    a("|---|---|---|---|---|---|---|")
    for s in sorted(P.SEGMENTS, key=lambda x: x["id"]):
        a(f"| **{s['id']}** | {s['name']} | {', '.join(s['types'])} | "
          f"{s['activity_scale']} | `{s['ip_depth']}` | **{s['wtp']}** | "
          f"{', '.join(s['needs'])} |")
    a("")

    a("---")
    a("")
    a("## Activity Scale — derived from the corpus")
    a("")
    a("| Band | Institutions | Meaning |")
    a("|---|---:|---|")
    for b in P.AXES["activity_scale"]:
        mean = next(x["means"] for x in P.BANDS if x["band"] == b)
        a(f"| {b} | {dist[b]} | {mean} |")
    a("")
    a(f"**{dist['No ecosystem']} of 36 institutions report no activity metric at all.** "
      f"That is not 'no innovation' — it is the same non-report we documented as "
      f"F-SENTINEL-ZERO. Bands are computed from *reported* values only; a missing "
      f"field is never coerced to 0.")
    a("")
    a("Per-institution derivation: `_exports/phase45/activity_scale_bands.csv`.")
    a("")

    a("---")
    a("")
    a("## The quadrant — urgency vs revenue")
    a("")
    a("Both axes are scored, because **they disagree** and collapsing them hides it.")
    a("")
    a("| ID | Segment | Urgency | Revenue | Quadrant | WTP |")
    a("|---|---|---:|---:|---|---|")
    for r in q:
        a(f"| {r['id']} | {r['name']} | **{r['urgency']}** | **{r['revenue']}** | "
          f"**{r['quadrant']}** | {r['wtp']} |")
    a("")
    a("| Quadrant | Segments |")
    a("|---|---|")
    for qn in ("ACT NOW", "BUYABLE, LOW URGENCY", "PAINFUL, HARD TO PAY", "DEFER"):
        ids = [r["id"] for r in q if r["quadrant"] == qn]
        a(f"| **{qn}** | {', '.join(ids) if ids else '— none —'} |")
    a("")
    a("> **The finding is the empty quadrant.** Nothing scores high on both. The "
      "institutions with the most acute pain (`G4`, urgency 5) sit behind the "
      "slowest procurement in the system, and the segments with money "
      "(`G5`) have no deadline forcing the work. **That disagreement is the "
      "go-to-market problem, and it is now visible instead of assumed.**")
    a("")

    a("---")
    a("")
    a("## Module fit — what triggers what, and when")
    a("")
    a("All four modules are in scope, so *need* alone cannot discriminate segments. "
      "What discriminates is the **forcing event**: a dated, institutionally-owned "
      "obligation.")
    a("")
    a("| Module | Need | Forcing event | Hard deadline? |")
    a("|---|---|---|---|")
    for m, v in P.MODULES.items():
        fe = P.FORCING_EVENTS[v["forcing_event"]]
        a(f"| **{m}** | {v['need']} | {v['forcing_event']} | "
          f"{'**YES**' if fe['hard_deadline'] else 'no'} |")
    a("")
    a("### Per segment")
    a("")
    for s in sorted(P.SEGMENTS, key=lambda x: x["id"]):
        cores = [m for m, v in s["modules"].items() if v == "CORE"]
        nos = [m for m, v in s["modules"].items() if v == "NO"]
        a(f"**{s['id']} {s['name']}** — CORE: {', '.join(cores) if cores else 'none'}"
          + (f" · NO: {', '.join(nos)}" if nos else ""))
        a("")

    a("> **Cohort management is the weakest module in the portfolio.** It has *no "
      "forcing event* — no documented obligation creates the need. `P-A03` remains "
      "`HYPOTHESIS`. IPR lifecycle is the strongest: the only module with a hard "
      "external deadline, and the only one where Phase 0 proved both the competitors "
      "and the government's own ARIIA 3.3 fail.")
    a("")

    a("---")
    a("")
    a("## Forcing events")
    a("")
    a("| Event | When | Hard? | Owner | Evidence |")
    a("|---|---|---|---|---|")
    for name, fe in P.FORCING_EVENTS.items():
        a(f"| {name} | {fe['when']} | {'**YES**' if fe['hard_deadline'] else 'no'} | "
          f"{fe['owner']} | {fe['evidence']} |")
    a("")

    a("---")
    a("")
    a("## Population per segment — never summed")
    a("")
    a("| Segment | Population | Basis |")
    a("|---|---:|---|")
    for s in sorted(P.SEGMENTS, key=lambda x: -x["population"]):
        a(f"| {s['id']} {s['name']} | {s['population']:,} | {s['population_basis']} |")
    a("")
    a("> **These do not add up, and must not.** They are non-nested populations "
      "(Conflict C-02): a college is also an institution, an IIC sits inside a "
      "university, and an incubator is not a degree-granting body at all.")
    a("")
    naive = sum(s["population"] for s in P.SEGMENTS)
    real = 58643
    a("### Arithmetic proof that they cannot be summed")
    a("")
    a("| | |")
    a("|---|---:|")
    a(f"| Naive sum of the column above | **{naive:,}** |")
    a(f"| Actual registered HEIs (AISHE 2021-22) | **{real:,}** |")
    a(f"| Apparent overlap | **{naive - real:,}** |")
    a("")
    a(f"The naive sum **exceeds the real population by {naive - real:,} institutions** "
      f"({round((naive - real) / real * 100)}%). That is not a rounding error — it is "
      f"arithmetic proof that these categories **overlap**. Colleges appear twice "
      f"(G1 and G2); universities appear as G3, G6, G7 and G8 depending on lens.")
    a("")
    a("This is the same trap `todo.md` PHASE 5 warns about: *\"Don't automatically add "
      "all of these together.\"* Here it is demonstrated rather than asserted.")
    a("")

    a("---")
    a("")
    a("## Segment detail")
    a("")
    for s in sorted(P.SEGMENTS, key=lambda x: x["id"]):
        a(f"### {s['id']} — {s['name']}")
        a("")
        a(f"- **Activity Scale:** {s['activity_scale']} · **IP Depth:** `{s['ip_depth']}` · "
          f"**WTP:** {s['wtp']} · **Grade:** {s['grade']}")
        a(f"- **Urgency {s['urgency']}/5** — {s['urgency_basis']}")
        a(f"- **Revenue {s['revenue']}/5** — {s['revenue_basis']}")
        a("")
        a(f"**Why it matters.** {s['why_primary']}")
        a("")
        a("**Documentary basis.**")
        for b in s["documentary_basis"]:
            a(f"- {b}")
        a("")
        if s.get("caveat"):
            a(f"> ⚠️ **{s['caveat']}**")
            a("")
        if s.get("excluded_from_initial_outreach"):
            a(f"> 🚫 **Excluded from initial outreach.** {s['exclusion_reason']}")
            a("")
        a("---")
        a("")

    a("## Limitation")
    a("")
    a("No segment is validated against a customer. WTP is a documented rule, not a "
      "measurement. IP Depth is `UNKNOWN` everywhere and cannot be filled in without "
      "new evidence — not a code change. The ICP's load-bearing predicate (*no system "
      "of record upstream of the form*) remains `HYPOTHESIS` (**H-01**).")
    a("")
    a("Machine-readable: `_exports/phase45/segmentation_matrix.csv`, "
      "`segment_quadrant.csv`, `module_fit.csv`, `type_crosswalk.csv`, "
      "`activity_scale_bands.csv`.")
    a("")
    p.write_text("\n".join(L), encoding="utf-8")
    return p


def write_icp_doc():
    MR.mkdir(parents=True, exist_ok=True)
    p = MR / "ICP.md"
    L = []
    a = L.append
    a("# Ideal Customer Profile")
    a("")
    a(f"**Phase 4 — built {GENERATED} by `build/build_phase4.py`.**")
    a("")
    a(f"## {P.ICP['name']}")
    a("")
    a(f"> {P.ICP['one_line']}")
    a("")
    a("---")
    a("")
    a("## Predicates — each one tested against real data")
    a("")
    a("| Test | Checkable? | How | Spec example clause | Verdict |")
    a("|---|---|---|---|---|")
    for pr in P.ICP["predicates"]:
        a(f"| {pr['test']} | **{pr['checkable']}** | {pr['how']} | "
          f"*{pr['spec_example_clause']}* | {pr['spec_example_verdict']} |")
    a("")
    a("---")
    a("")
    a("## Audit of the spec's own example")
    a("")
    a("The spec offers this example ICP:")
    a("")
    a("> *\"Institution with an active IIC/incubation ecosystem, 20+ startups/"
      "innovation projects, multiple programs, dedicated innovation staff, and a "
      "requirement for structured reporting.\"*")
    a("")
    a(f"> **Our audit:** {P.ICP['spec_clause_audit']}")
    a("")
    a("| Example clause | Verdict |")
    a("|---|---|")
    for pr in P.ICP["predicates"]:
        if pr["spec_example_clause"].startswith("("):
            continue
        a(f"| {pr['spec_example_clause']} | {pr['spec_example_verdict']} |")
    a("")
    a("**\"Requirement for structured reporting\" is the strongest clause** — it is "
      "fully checkable (three separate government submissions: IIC portal, NIRF, "
      "ARIIA) and it is the one our evidence most directly supports.")
    a("")
    a("---")
    a("")
    a("## Targeting order")
    a("")
    a(f"- **Primary segment:** {P.ICP['primary_segment']}")
    a(f"- **First paying segment:** {P.ICP['first_paying_segment']}")
    a("")
    a("These differ on purpose. Colleges are the largest population and where the "
      "reporting defect is most visible, but they carry the thinnest budgets. "
      "Incubation centres are the only segment whose funding signal points *forward* "
      "in time (AIM grant-in-aid up to ₹10 crore), unlike ARIIA's retrospective "
      "expenditure split.")
    a("")
    a("---")
    a("")
    a("## Explicit exclusions")
    a("")
    a("| Excluded | Why | Revisit |")
    a("|---|---|---|")
    for e in P.EXCLUSIONS:
        a(f"| **{e['segment']}** | {e['reason']} | {e['revisit']} |")
    a("")
    a("> An exclusion list is what makes a segmentation usable. A matrix that only "
      "describes who to sell to will eventually be used to sell to someone who "
      "cannot buy.")
    a("")
    p.write_text("\n".join(L), encoding="utf-8")
    return p


def write_census_redirect():
    """The narrative census is superseded by the matrix. Leave a pointer."""
    MR.mkdir(parents=True, exist_ok=True)
    p = MR / "Segment_Census.md"
    p.write_text(
        "# Customer Segmentation\n\n"
        f"**Superseded. See [Segmentation_Matrix.md](Segmentation_Matrix.md) and "
        f"[ICP.md](ICP.md).**\n\n"
        f"Built {GENERATED} by `build/build_phase4.py`.\n\n"
        "The previous version of this page was five narrative segments, which was not "
        "the matrix `todo.md` PHASE 4 asks for: it missed three of the eleven named "
        "institution types, used one type not in the spec vocabulary, and used "
        "willingness-to-pay values (`Medium-High`, `Low-Medium`) that were not in the "
        "spec's `Low`/`Medium`/`High` vocabulary.\n\n"
        "The matrix now covers all declared types, uses spec vocabulary throughout, "
        "derives Activity Scale from the corpus, and declares IP Depth unmeasurable "
        "rather than guessing it.\n", encoding="utf-8")
    return p


# --------------------------------------------------------------------------
def main():
    errs, warns = P.validation()
    for w in warns:
        print(f"  warn: {w}")
    if errs:
        raise SystemExit("Validation failed:\n  - " + "\n  - ".join(errs))

    n1 = write_matrix();     print(f"  csv/segmentation_matrix.csv   {n1:4d} segments")
    n2 = write_crosswalk();   print(f"  csv/type_crosswalk.csv        {n2:4d} corpus labels mapped")
    n3 = write_bands();       print(f"  csv/activity_scale_bands.csv  {n3:4d} institutions derived")
    n4 = write_module_fit();  print(f"  csv/module_fit.csv            {n4:4d} segment x module")
    n5 = write_quadrant();    print(f"  csv/segment_quadrant.csv      {n5:4d} quadrant placements")

    write_matrix_doc();       print("  03_Market_Research/Segmentation_Matrix.md")
    write_icp_doc();          print("  03_Market_Research/ICP.md")
    write_census_redirect();  print("  03_Market_Research/Segment_Census.md  (redirect)")

    print()
    dist = P.band_distribution()
    q = P.quadrant_table()
    print(f"  Segments {len(P.SEGMENTS)} | types {len(P.AXES['institution_type'])} "
          f"| corpus labels mapped {len(P.TYPE_CROSSWALK)}")
    print(f"  Activity bands: " + ", ".join(f"{k} {v}" for k, v in dist.items()))
    print(f"  IP depth: UNMEASURABLE (best field coverage "
          f"{max(c['coverage_pct'] for c in P.ip_depth_coverage())}%)")
    print()
    for qn in ("ACT NOW", "BUYABLE, LOW URGENCY", "PAINFUL, HARD TO PAY", "DEFER"):
        ids = [r["id"] for r in q if r["quadrant"] == qn]
        print(f"  {qn:<24} {', '.join(ids) if ids else '(empty)'}")
    print()
    print("  NOTE: interviews conducted = 0. WTP is a documented rule, not a measurement.")
    return 0


if __name__ == "__main__":
    sys.exit(main())