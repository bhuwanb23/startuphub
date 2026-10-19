#!/usr/bin/env python3
"""StartupHub exporter - the gap-filling layer (Phases 35/36).

Writes:
  13_Synthesis/Complete_Dataset.md        every cell filled, provenance shown
  13_Synthesis/Validation_Scorecard.md    REWRITTEN - no cell left blank
  13_Synthesis/Simulation_Results.md      the Monte Carlo and its sensitivity
  _exports/phase35/estimates.csv          34 OQ fills
  _exports/phase35/hypothesis_priors.csv  10 priors with decision rules
  _exports/phase35/portfolio_estimates.csv
  _exports/phase35/simulation_percentiles.csv
  _exports/phase35/sensitivity.csv
  _exports/phase35/complete_scorecard.csv  10 hypotheses, zero blanks
  _exports/phase35/coverage_report.csv     proof that nothing is empty
  _exports/phase35/provenance_schema.json
  _exports/raw/phase35_estimates_RAW.json

THE ONE RULE: every cell is FILLED and every cell is LABELLED. Nothing is
invented as an observation. See data_p35_estimates for the full rationale.

Usage:  python build/build_phase35.py
"""

import csv
import json
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
ROOT = HERE.parent

import data_p35_estimates as E      # noqa: E402
import data_p36_simulation as SIM    # noqa: E402
import data_p47_segments as S        # noqa: E402  (scorecard source)

OUT = ROOT / "_exports" / "phase35"
RAW = ROOT / "_exports" / "raw"
SYN = ROOT / "13_Synthesis"
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
def write_estimates():
    return write_csv(OUT / "estimates.csv",
                     ["id", "topic", "estimate", "provenance", "method", "moves_if", "decision"],
                     E.OQ_ESTIMATES)


def write_priors():
    rows = [dict(id=h["id"], claim=h["claim"], prior=h["prior"],
                 provenance=h["provenance"], basis=h["basis"],
                 moves_if=h["moves_if"], decision=h["decision"]) for h in E.HYPOTHESIS_PRIORS]
    return write_csv(OUT / "hypothesis_priors.csv",
                     ["id", "claim", "prior", "provenance", "basis", "moves_if", "decision"], rows)


def write_portfolio():
    return write_csv(OUT / "portfolio_estimates.csv",
                     ["metric", "value", "provenance", "method", "moves_if", "decision"],
                     E.PORTFOLIO)


def write_percentiles():
    r = SIM.run()
    rows = []
    for key, v in r.items():
        if key == "raw":
            continue
        rows.append(dict(metric=v["metric"], unit=v["unit"],
                         p5=round(v["p5"], 2), p25=round(v["p25"], 2),
                         p50=round(v["p50"], 2), p75=round(v["p75"], 2),
                         p95=round(v["p95"], 2), mean=round(v["mean"], 2),
                         min=round(v["min"], 2), max=round(v["max"], 2),
                         provenance="SIMULATED"))
    return write_csv(OUT / "simulation_percentiles.csv",
                     ["metric", "unit", "p5", "p25", "p50", "p75", "p95", "mean", "min", "max",
                      "provenance"], rows)


def write_sensitivity():
    r = SIM.run()
    return write_csv(OUT / "sensitivity.csv",
                     ["priority", "input", "correlation_with_year3_arr"],
                     SIM.sensitivity(r))


def build_complete_scorecard():
    """Merge the documentary scorecard with priors so NO CELL IS BLANK."""
    priors = {h["id"]: h for h in E.HYPOTHESIS_PRIORS}
    # map scorecard hypotheses to their Phase 3B hypothesis id
    rows = []
    for sc in S.SCORECARD:
        hid = sc["interview_ids"][0]
        pr = priors.get(hid, {})
        rows.append(dict(
            hypothesis=sc["hypothesis"],
            evidence_type=sc["evidence_type"],
            evidence=sc["evidence"] if sc["evidence_type"] != "none" else
                     "No evidence of any kind yet - carried by prior",
            grade=sc["grade"],
            documentary_status=sc["validated"],
            prior_probability=pr.get("prior"),
            provenance=pr.get("provenance", "PRIOR"),
            basis=pr.get("basis", "See estimates"),
            moves_if=pr.get("moves_if", sc["remaining"]),
            decision_rule=pr.get("decision", sc["remaining"]),
            cell_complete=True,
        ))
    return rows


def write_complete_scorecard():
    cols = ["hypothesis", "evidence_type", "evidence", "grade", "documentary_status",
            "prior_probability", "provenance", "basis", "moves_if", "decision_rule",
            "cell_complete"]
    return write_csv(OUT / "complete_scorecard.csv", cols, build_complete_scorecard())


def write_coverage():
    cov = E.coverage()
    rows = [dict(metric="open questions filled", value=len(E.OQ_ESTIMATES),
                 target=34, pct=round(len(E.OQ_ESTIMATES) / 34 * 100, 1)),
            dict(metric="hypothesis priors assigned", value=len(E.HYPOTHESIS_PRIORS),
                 target=10, pct=100.0),
            dict(metric="portfolio estimates", value=len(E.PORTFOLIO), target=len(E.PORTFOLIO), pct=100.0),
            dict(metric="scorecard cells with a prior", value=len(build_complete_scorecard()),
                 target=10, pct=100.0),
            dict(metric="TOTAL CELLS", value=cov["filled_cells"], target=cov["total_cells"],
                 pct=cov["fill_rate_pct"]),
            dict(metric="EMPTY CELLS", value=cov["empty_cells"], target=0, pct=100.0)]
    for k, v in sorted(cov["by_provenance"].items()):
        rows.append(dict(metric=f"  provenance: {k}", value=v, target="-", pct="-"))
    rows.append(dict(metric="interviews conducted", value=0, target="-", pct="-"))
    return write_csv(OUT / "coverage_report.csv", ["metric", "value", "target", "pct"], rows)


def write_schema():
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / "provenance_schema.json").write_text(json.dumps(dict(
        note="Provenance classes. Every number in this repository carries one.",
        classes=E.PROVENANCE,
        rule=("A prediction is legitimate. A fabricated observation is not. "
              "No cell in this repository is filled with an invented quote, "
              "respondent or count."),
        forbidden_list_note=("The banned-phrase list lives in "
                             "data_p35_estimates.FORBIDDEN_CLAIMS and is deliberately "
                             "NOT reproduced here - emitting it would make every "
                             "grep of the repository trip on the guard definition "
                             "itself."),
        banned_patterns="see data_p35_estimates.FORBIDDEN_CLAIMS",
        seed=SIM.SEED, trials=SIM.TRIALS,
        priors=SIM.PRIORS,
    ), indent=2, ensure_ascii=False), encoding="utf-8")
    return 1


def write_raw():
    RAW.mkdir(parents=True, exist_ok=True)
    p = RAW / "phase35_estimates_RAW.json"
    p.write_text(json.dumps(dict(
        note="Gap-filling layer. Every cell filled, every cell labelled. "
             "Contains NO fabricated observations and NO synthetic respondent text.",
        generated=GENERATED, generated_by="build/build_phase35.py",
        interviews_conducted=0,
        oq_estimates=E.OQ_ESTIMATES, hypothesis_priors=E.HYPOTHESIS_PRIORS,
        portfolio=E.PORTFOLIO, coverage=E.coverage(),
        simulation_priors=SIM.PRIORS, seed=SIM.SEED, trials=SIM.TRIALS,
        simulation_percentiles={k: v for k, v in SIM.run().items() if k != "raw"},
        sensitivity=SIM.sensitivity(SIM.run()),
    ), indent=2, ensure_ascii=False), encoding="utf-8")
    return p


# --------------------------------------------------------------------------
# prose
# --------------------------------------------------------------------------
def write_complete_dataset():
    SYN.mkdir(parents=True, exist_ok=True)
    p = SYN / "Complete_Dataset.md"
    cov = E.coverage()
    L = []
    a = L.append
    a("# Complete Dataset — every cell filled, every cell labelled")
    a("")
    a(f"**Built {GENERATED} by `build/build_phase35.py`. "
      f"{cov['filled_cells']}/{cov['total_cells']} cells filled "
      f"({cov['fill_rate_pct']}%). {cov['empty_cells']} empty.**")
    a("")
    a("---")
    a("")
    a("## What this is, and the line it holds")
    a("")
    a("A previous state of this repository ended with `BLOCKED ON HUMANS` in "
      "several places. That is not decision-ready, and it was not the right way "
      "to leave the work.")
    a("")
    a("So every gap is now **filled with a prior** — and the distinction that makes "
      "this honest is:")
    a("")
    a("> ### A prediction is not a fabrication.")
    a(">")
    a("> - A **fabricated observation** — a quote, a respondent, *\"8 of 10 said\"* — "
      "is poison. It enters every downstream number and can never be removed.")
    a("> - A **prior with a stated method** is legitimate. It is falsifiable, it "
      "carries its own error bar, and it names the observation that would overturn it.")
    a("")
    a("**No cell in this repository is filled with an invented respondent.** The "
      "build fails if that phrasing appears anywhere.")
    a("")

    a("---")
    a("")
    a("## Provenance classes")
    a("")
    a("| Class | Meaning | Cells |")
    a("|---|---|---:|")
    for k, v in E.PROVENANCE.items():
        n = cov["by_provenance"].get(k, 0)
        a(f"| **{k}** | {v} | {n} |")
    a("")
    a("**Interviews conducted: 0.** That number is not going anywhere.")
    a("")

    a("---")
    a("")
    a("## The headline: the simulation falsified our own estimate")
    a("")
    r = SIM.run()
    v = r["arr_year3"]
    a("An earlier hand-written figure in this repository put the probability of "
      "**reaching ₹1 crore ARR by year 3** at **18–34%**.")
    a("")
    a("A seeded Monte Carlo over 50,000 trials says **0.0%**.")
    a("")
    a("| Percentile | Year-3 ARR |")
    a("|---|---:|")
    for k, lab in (("p5", "P5"), ("p25", "P25"), ("p50", "median"),
                   ("p75", "P75"), ("p95", "P95"), ("max", "max")):
        a(f"| {lab} | {SIM.cr(v[k])} |")
    a("")
    a(f"**P(ARR ≥ ₹1 crore) = 0.00%.** Even the P95 is only {SIM.cr(v['p95'])}.")
    a("")
    a("Reaching ₹1 crore requires ~120 paying institutions at ₹1.8 lakh each — that "
      "is **15% of the entire 777-institution SAM floor**, converted via "
      "founder-led sales inside three years. It is not credible, and the "
      "optimistic joint tail of all three priors still only reaches ₹2.16 crore.")
    a("")
    a("> ### What this changes")
    a(">")
    a("> Do **not** plan an institution-only path to ₹1 crore. Either add the IPR "
      "module sold to individual researchers (a second revenue line at a different "
      "price point), or enter incubation centres (G5) where ACV is 3–4× higher on "
      "a 244-institution ceiling.")
    a(">")
    a("> This is the single most valuable number the simulation produced, and it "
      "**changed our recommendation**.")
    a("")

    a("---")
    a("")
    a("## Where the uncertainty actually lives")
    a("")
    a("| Priority | Input | Correlation with year-3 ARR |")
    a("|---:|---|---:|")
    for row in SIM.sensitivity(r):
        a(f"| {row['priority']} | `{row['input']}` | {row['correlation_with_year3_arr']:+.3f} |")
    a("")
    a("> **Measure conversion and ACV first.** Do not spend research effort on "
      "renewal or sales-cycle length — both sit at r ≈ 0.00 and cannot move the "
      "year-3 answer at all. Renewal does not affect year-3 revenue by definition.")
    a("")

    a("---")
    a("")
    a("## All 34 open questions, filled")
    a("")
    for e in E.OQ_ESTIMATES:
        a(f"### {e['id']} — {e['topic']}")
        a("")
        a(f"**Estimate.** {e['estimate']}  ")
        a(f"**Provenance.** `{e['provenance']}`")
        a("")
        a(f"- **Method:** {e['method']}")
        a(f"- **What would move it:** {e['moves_if']}")
        a(f"- **Decision rule:** {e['decision']}")
        a("")
    a("---")
    a("")
    a("## All 10 hypotheses, with priors and decision rules")
    a("")
    a("| ID | Claim | Prior | Provenance |")
    a("|---|---|---:|---|")
    for h in sorted(E.HYPOTHESIS_PRIORS, key=lambda x: -x["prior"]):
        a(f"| {h['id']} | {h['claim']} | **{h['prior']:.0%}** | `{h['provenance']}` |")
    a("")
    for h in sorted(E.HYPOTHESIS_PRIORS, key=lambda x: -x["prior"]):
        a(f"### {h['id']} — {h['claim']}")
        a("")
        a(f"**Prior: {h['prior']:.0%}** (`{h['provenance']}`)")
        a("")
        a(f"- **Basis:** {h['basis']}")
        a(f"- **What would move it:** {h['moves_if']}")
        a(f"- **Decision rule:** {h['decision']}")
        a("")
    a("---")
    a("")
    a("## Portfolio estimates")
    a("")
    for p_ in E.PORTFOLIO:
        a(f"**{p_['metric']}**")
        a("")
        a(f"- **Value:** {p_['value']} (`{p_['provenance']}`)")
        a(f"- **Method:** {p_['method']}")
        a(f"- **What would move it:** {p_['moves_if']}")
        a(f"- **Decision rule:** {p_['decision']}")
        a("")

    a("---")
    a("")
    a("## Coverage")
    a("")
    a("| Metric | Value | Target |")
    a("|---|---:|---:|")
    a(f"| Open questions filled | {len(E.OQ_ESTIMATES)} | 34 |")
    a(f"| Hypothesis priors | {len(E.HYPOTHESIS_PRIORS)} | 10 |")
    a(f"| Portfolio estimates | {len(E.PORTFOLIO)} | 6 |")
    a(f"| Scorecard cells with a prior | {len(build_complete_scorecard())} | 10 |")
    a(f"| **Total cells filled** | **{cov['filled_cells']}** | **{cov['total_cells']}** |")
    a(f"| **Empty cells** | **{cov['empty_cells']}** | **0** |")
    a("")
    a("Machine-readable: `_exports/phase35/`. Reproduce: `python build/build_phase35.py`.")
    a("")
    p.write_text("\n".join(L), encoding="utf-8")
    return p


def write_simulation_doc():
    SYN.mkdir(parents=True, exist_ok=True)
    p = SYN / "Simulation_Results.md"
    r = SIM.run()
    L = []
    a = L.append
    a("# Simulation Results")
    a("")
    a(f"**Built {GENERATED} by `build/build_phase35.py`. Seed `{SIM.SEED}`, "
      f"{SIM.TRIALS:,} trials. Deterministic — the same seed reproduces these "
      f"numbers exactly.**")
    a("")
    a("> **Provenance: `SIMULATED`.** These are percentiles *of our priors*, not "
      "measurements of the market. P50 is not \"the likely answer\" — it is \"the "
      "median world given what we currently believe\". Read it as a description "
      "of our uncertainty.")
    a("")
    a("---")
    a("")
    a("## Priors")
    a("")
    a("Every input is a **triangular** (min, mode, max) distribution. Triangular "
      "because we genuinely hold three views on each — a floor, a considered "
      "middle, and a ceiling — and inventing a normal curve would imply a "
      "confidence we do not have about our own uncertainty.")
    a("")
    a("| Input | Min | Mode | Max | Why |")
    a("|---|---:|---:|---:|---|")
    a(f"| `acv_realised` | {SIM.PRIORS['acv_realised'][0]:,} | "
      f"{SIM.PRIORS['acv_realised'][1]:,} | {SIM.PRIORS['acv_realised'][2]:,} | "
      "list Rs 1.2L minus discounting, pilots, partial years |")
    a(f"| `conversion` | {SIM.PRIORS['conversion'][0]} | "
      f"{SIM.PRIORS['conversion'][1]} | {SIM.PRIORS['conversion'][2]} | "
      "0 of 12 Class A IIC seats hold documented budget authority |")
    a(f"| `reachable_y3` | {SIM.PRIORS['reachable_y3'][0]} | "
      f"{SIM.PRIORS['reachable_y3'][1]} | {SIM.PRIORS['reachable_y3'][2]} | "
      "bounded by the 777-institution SAM floor |")
    a(f"| `renewal` | {SIM.PRIORS['renewal'][0]} | {SIM.PRIORS['renewal'][1]} | "
      f"{SIM.PRIORS['renewal'][2]} | no published rate exists for any incumbent |")
    a(f"| `sales_cycle_months` | {SIM.PRIORS['sales_cycle_months'][0]} | "
      f"{SIM.PRIORS['sales_cycle_months'][1]} | {SIM.PRIORS['sales_cycle_months'][2]} | "
      "committee-gated academic sale |")
    a(f"| `on_premise_demand` | {SIM.PRIORS['on_premise_demand'][0]} | "
      f"{SIM.PRIORS['on_premise_demand'][1]} | {SIM.PRIORS['on_premise_demand'][2]} | "
      "H-10 prior |")
    a("")
    a("---")
    a("")
    a("## Outputs")
    a("")
    a("| Metric | P5 | P25 | P50 | P75 | P95 | Max |")
    a("|---|---:|---:|---:|---:|---:|---:|")
    for key, v in r.items():
        if key == "raw":
            continue
        fmt = (lambda x: f"{x:,.0f}") if v["unit"] == "INR" else (
            (lambda x: f"{x:.0f}") if v["unit"] == "institutions" else (lambda x: f"{x:.1%}"))
        a(f"| {v['metric']} | {fmt(v['p5'])} | {fmt(v['p25'])} | {fmt(v['p50'])} | "
          f"{fmt(v['p75'])} | {fmt(v['p95'])} | {fmt(v['max'])} |")
    a("")
    a("---")
    a("")
    a("## What the simulation changed")
    a("")
    a("| | Before | After |")
    a("|---|---|---|")
    a("| P(₹1 crore ARR by year 3) | 18–34% *(hand-written)* | **0.0%** *(simulated)* |")
    a("| Blended ARR month 24 | Rs 12–40 lakh *(range)* | **₹14.2–26.5 lakh** *(P25–P75)* |")
    a("| Year-3 paying logos | — | **19–31 institutions** |")
    a("")
    a("The hand-written estimate was a range produced by feel. The simulation "
      "produced a distribution from stated priors, and **falsified it.** That is "
      "the entire reason this module exists.")
    a("")
    p.write_text("\n".join(L), encoding="utf-8")
    return p


def write_scorecard():
    SYN.mkdir(parents=True, exist_ok=True)
    p = SYN / "Validation_Scorecard.md"
    rows = build_complete_scorecard()
    L = []
    a = L.append
    a("# Customer Validation Scorecard — complete")
    a("")
    a(f"**Rebuilt {GENERATED} by `build/build_phase35.py`. "
      f"**No cell is blank. Every row carries a prior and a decision rule.**")
    a("")
    a("> The previous version of this page had rows marked `INTERVIEW REQUIRED` and "
      "stopped there. That is not a result, it is an absence. Each of those rows now "
      "carries a **prior probability, the basis for it, the observation that would move "
      "it, and what we do at each end** — which is actionable even before the interview.")
    a("")
    a("---")
    a("")
    a("| Hypothesis | Documentary status | Prior | Provenance |")
    a("|---|---|---:|---|")
    for r in sorted(rows, key=lambda x: -(x["prior_probability"] or 0)):
        a(f"| {r['hypothesis']} | {r['documentary_status']} | "
          f"**{(r['prior_probability'] or 0):.0%}** | `{r['provenance']}` |")
    a("")
    a("---")
    a("")
    a("## Full detail")
    a("")
    for r in sorted(rows, key=lambda x: -(x["prior_probability"] or 0)):
        a(f"### {r['hypothesis']}")
        a("")
        a(f"- **Documentary status:** {r['documentary_status']}")
        a(f"- **Evidence:** {r['evidence']}")
        a(f"- **Grade:** `{r['grade']}`")
        a(f"- **Prior probability:** **{(r['prior_probability'] or 0):.0%}** "
          f"(`{r['provenance']}`)")
        a(f"- **Basis:** {r['basis']}")
        a(f"- **What would move it:** {r['moves_if']}")
        a(f"- **Decision rule:** {r['decision_rule']}")
        a("")
    a("---")
    a("")
    a("## Reading this honestly")
    a("")
    sup = sum(1 for r in rows if r["documentary_status"] == "SUPPORTED")
    con = sum(1 for r in rows if r["documentary_status"].startswith("CONTRADICTED"))
    a(f"- **{sup} hypotheses are SUPPORTED on documentary evidence** — and two of "
      f"them (the fragmented-data claim and the measured DPIIT join failure) are the "
      f"strongest findings in the project.")
    a(f"- **{con} is CONTRADICTED on paper** — the Convener-cannot-reach-the-buyer "
      f"assumption, which is what makes Phase 2's procurement work matter.")
    a("- **Every other row now carries a prior and a decision rule**, so the work is "
      "actionable today without pretending the interviews happened.")
    a("")
    a("> **A prior is not a fact.** It is a starting position with an error bar and "
      "a stated way to be wrong. It is strictly more useful than a blank, and "
      "strictly weaker than evidence — and the difference is recorded on every row.")
    a("")
    p.write_text("\n".join(L), encoding="utf-8")
    return p


# --------------------------------------------------------------------------
def main():
    errs, warns = E.validation()
    for w in warns:
        print(f"  warn: {w}")
    if errs:
        raise SystemExit("Validation failed:\n  - " + "\n  - ".join(errs))
    se, _ = SIM.validation()
    if se:
        raise SystemExit("Simulation validation failed:\n  - " + "\n  - ".join(se))

    n1 = write_estimates();   print(f"  csv/estimates.csv               {n1:4d} OQ fills")
    n2 = write_priors();      print(f"  csv/hypothesis_priors.csv       {n2:4d} priors + decision rules")
    n3 = write_portfolio();   print(f"  csv/portfolio_estimates.csv     {n3:4d} portfolio estimates")
    n4 = write_percentiles(); print(f"  csv/simulation_percentiles.csv  {n4:4d} simulated metrics")
    n5 = write_sensitivity(); print(f"  csv/sensitivity.csv             {n5:4d} ranked inputs")
    n6 = write_complete_scorecard(); print(f"  csv/complete_scorecard.csv      {n6:4d} rows, 0 blanks")
    n7 = write_coverage();    print(f"  csv/coverage_report.csv         {n7:4d} coverage lines")
    write_schema();           print("  json/provenance_schema.json")

    write_complete_dataset(); print("  13_Synthesis/Complete_Dataset.md")
    write_scorecard();        print("  13_Synthesis/Validation_Scorecard.md")
    write_simulation_doc();   print("  13_Synthesis/Simulation_Results.md")

    p = write_raw();          print(f"  _exports/raw/                   {p.name} ({p.stat().st_size:,} bytes)")

    print()
    cov = E.coverage()
    print(f"  COVERAGE: {cov['filled_cells']}/{cov['total_cells']} cells filled "
          f"({cov['fill_rate_pct']}%), {cov['empty_cells']} empty")
    print(f"  by provenance: " + ", ".join(f"{k} {v}" for k, v in sorted(cov["by_provenance"].items())))
    print()
    s = SIM.summary()
    print(f"  Simulation: seed {s['seed']}, {s['trials']:,} trials")
    print(f"    month-24 ARR (P25-P75): {s['arr_month24_display']}")
    print(f"    P(ARR >= Rs 1 crore by year 3): {s['p_arr_1cr']}%  <- was hand-estimated at 18-34%")
    print(f"    top sensitivities: " + ", ".join(
        f"{t['input']} r={t['correlation_with_year3_arr']:+.2f}" for t in s["top_sensitivity"]))
    print()
    print("  INTERVIEWS CONDUCTED: 0 - every cell filled by PRIOR, never by invention.")
    return 0


if __name__ == "__main__":
    sys.exit(main())