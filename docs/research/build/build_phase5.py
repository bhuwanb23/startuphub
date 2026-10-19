#!/usr/bin/env python3
"""StartupHub Phase 5 exporter - the financial rebuild.

Writes:
  03_Market_Research/Financial_Landscape.md    budgets, headroom, funding pools
  03_Market_Research/Buyer_Determination.md    the funnel + disqualifiers
  03_Market_Research/Market_Sizing.md          three sizings, never summed
  03_Market_Research/Unit_Economics.md         CAC / LTV / payback / required ACV
  03_Market_Research/README.md                 rewritten, financial-first
  _exports/phase5/budget_allocations.csv
  _exports/phase5/budget_headroom.csv
  _exports/phase5/funding_pools.csv
  _exports/phase5/market_sizing.csv
  _exports/phase5/buyer_funnel.csv
  _exports/phase5/unit_economics.csv
  _exports/phase5/conflicts.csv
  _exports/phase5/financial_schema.json
  _exports/raw/phase5_finance_RAW.json

Unchanged by this phase: Segmentation_Matrix.md, ICP.md.

Usage:  python build/build_phase5.py
"""

import csv
import json
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
ROOT = HERE.parent

import data_p5_finance as F          # noqa: E402
import data_p36_simulation as SIM    # noqa: E402

OUT = ROOT / "_exports" / "phase5"
RAW = ROOT / "_exports" / "raw"
MR = ROOT / "03_Market_Research"
GENERATED = "2026-10-19"
LIST_PRICE = 120000


def write_csv(path, cols, rows):
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", newline="", encoding="utf-8-sig") as fh:
        w = csv.DictWriter(fh, fieldnames=cols, extrasaction="ignore")
        w.writeheader()
        for r in rows:
            w.writerow(r)
    return len(rows)


def cr(n):
    return f"Rs {n/1e7:.2f} crore" if n < 1e9 else f"Rs {n/1e7:.1f} crore"


def inr(n):
    s = str(int(round(n)))
    if len(s) <= 3:
        return f"Rs {s}"
    head, tail = s[:-3], s[-3:]
    g = []
    while len(head) > 2:
        g.insert(0, head[-2:]); head = head[:-2]
    if head:
        g.insert(0, head)
    return "Rs " + ",".join(g) + "," + tail


# --------------------------------------------------------------------------
# machine exports
# --------------------------------------------------------------------------
def write_budget():
    rows = [dict(key=h["key"], label=h["label"].strip(), value_cr=h["value"],
                 fy=F.FY, source=F.BUDGET_FY2526["source"], url=F.BUDGET_FY2526["url"],
                 tier=F.BUDGET_FY2526["tier"], note=h["note"].strip() or "")
            for h in F.BUDGET_FY2526["heads"]]
    return write_csv(OUT / "budget_allocations.csv",
                     ["key", "label", "value_cr", "fy", "source", "url", "tier", "note"], rows)


def write_headroom():
    rows = F.unspent_capacity(LIST_PRICE)
    for r in rows:
        r["fy"] = r["fy"]
        r["source"] = "Union Expenditure Budget 2025-26 / Ministry of Education budget analysis"
    return write_csv(OUT / "budget_headroom.csv",
                     ["group", "fy", "allocated_cr", "expended_cr", "utilisation_pct",
                      "unspent_cr", "institutions", "unspent_per_institution_cr",
                      "unspent_per_institution_inr", "price_as_pct_of_unspent",
                      "price_as_pct_of_total_budget", "source", "note"], rows)


def write_pools():
    return write_csv(OUT / "funding_pools.csv",
                     ["pool", "committed_cr", "deployed_cr", "vehicles", "beneficiaries",
                      "as_of", "direction", "source", "note"], F.FUNDING_POOLS)


def write_sizing():
    return write_csv(OUT / "market_sizing.csv",
                     ["sizing", "value", "unit", "year", "forecast_value", "forecast_year",
                      "cagr_pct", "source", "tier", "relevant", "value_note", "note"],
                     F.MARKET_SIZING)


def write_funnel():
    rows = [dict(stage=f["stage"], label=f["label"], count=f["count"],
                 count_high=f.get("count_high", ""), source=f["source"],
                 is_buyer_count=f["is_buyer_count"], why=f["why"],
                 excluded_note=f["excluded_note"])
            for f in F.BUYER_FUNNEL]
    return write_csv(OUT / "buyer_funnel.csv",
                     ["stage", "label", "count", "count_high", "source",
                      "is_buyer_count", "why", "excluded_note"], rows)


def write_unit_economics():
    ue = SIM.unit_economics()
    req = SIM.required_acv()
    rows = []
    for key in ("cac", "ltv", "payback", "effective_margin", "cost_to_serve"):
        v = ue[key]
        rows.append(dict(metric=v["metric"], unit=v["unit"], p25=round(v["p25"], 2),
                         p50=round(v["p50"], 2), p75=round(v["p75"], 2),
                         provenance="SIMULATED", note="seeded Monte Carlo, seed 20261019"))
    s = SIM.unit_economics_summary()
    rows.append(dict(metric="LTV/CAC ratio", unit="ratio", p25=s["ltv_cac_p25_p75"][0],
                     p50=s["ltv_cac_p50"], p75=s["ltv_cac_p25_p75"][1],
                     provenance="SIMULATED", note="Below 1.0 means value destroyed per deal"))
    rows.append(dict(metric="% of trials reaching LTV/CAC > 3", unit="percent",
                     p50=s["pct_viable_gt_3x"], p75=None, p25=None,
                     provenance="SIMULATED", note="Viability threshold"))
    rows.append(dict(metric="ACV required for LTV/CAC = 3", unit="INR",
                     p25=req["p25"], p50=req["p50"], p75=req["p75"],
                     provenance="SIMULATED",
                     note=f"{req['p50']/LIST_PRICE:.1f}x the Rs {LIST_PRICE:,} list price"))
    return write_csv(OUT / "unit_economics.csv",
                     ["metric", "unit", "p25", "p50", "p75", "provenance", "note"], rows)


def write_conflicts():
    cols = ["id", "subject", "type", "variant_a", "variant_b", "variant_c",
            "spread_pct", "why_it_matters", "our_choice"]
    return write_csv(OUT / "conflicts.csv", cols, F.CONFLICTS)


def write_schema():
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / "financial_schema.json").write_text(json.dumps(dict(
        note="Phase 5 financial layer. Field definitions and the guards enforced by "
             "data_p5_finance.validation().",
        rules=[
            "Every rupee figure carries a fiscal year and a source.",
            "Funnel stages are strictly filters of one another and are NEVER summed.",
            "C-05 (the 625x ERP market-sizing conflict) must appear in every output.",
            "BOUNDED figures may never be presented as DOCUMENTED.",
            "Budget headroom is capacity evidence, never willingness evidence. Phase 7's "
            "price band is deliberately unchanged on the basis of unspent budget.",
        ],
        fiscal_year=F.FY,
        institution_counts_used=F.INSTITUTION_COUNTS,
        unit_economics_priors=SIM.PRIORS,
        conflicts=F.CONFLICTS,
    ), indent=2, ensure_ascii=False), encoding="utf-8")
    return 1


def write_raw():
    RAW.mkdir(parents=True, exist_ok=True)
    p = RAW / "phase5_finance_RAW.json"
    p.write_text(json.dumps(dict(
        note="Phase 5 financial layer. Union Budget + NITI Aayog + market sizing. "
             "Contains NO fabricated observations.",
        generated=GENERATED, generated_by="build/build_phase5.py",
        interviews_conducted=0,
        budget=F.BUDGET_FY2526, utilisation=F.UTILISATION,
        headroom=F.unspent_capacity(LIST_PRICE), trend=F.ALLOCATION_TREND,
        state_public=F.STATE_PUBLIC, funding_pools=F.FUNDING_POOLS,
        market_sizing=F.MARKET_SIZING, conflicts=F.CONFLICTS,
        buyer_funnel=F.BUYER_FUNNEL, disqualifiers=F.BUYER_DISQUALIFIERS,
        private_college_bound=F.PRIVATE_COLLEGE_BOUND,
        unit_economics_summary=SIM.unit_economics_summary(),
    ), indent=2, ensure_ascii=False), encoding="utf-8")
    return p


# --------------------------------------------------------------------------
# prose
# --------------------------------------------------------------------------
def write_financial_landscape():
    MR.mkdir(parents=True, exist_ok=True)
    p = MR / "Financial_Landscape.md"
    cap = F.unspent_capacity(LIST_PRICE)
    L = []
    a = L.append
    a("# Financial Landscape")
    a("")
    a(f"**Phase 5 — built {GENERATED} by `build/build_phase5.py`. "
      f"Budget FY {F.FY}. All government figures T1.**")
    a("")
    a("---")
    a("")
    a("## The headline: the product is cheap, and nearly unbuyable")
    a("")
    a("Both halves are evidenced, and together they redefine the commercial problem.")
    a("")
    nit_budget_cr = 5687.47 / F.INSTITUTION_COUNTS["nits"]
    a("### 1. Affordability has never been the problem")
    a("")
    a(f"A NIT's FY {F.FY} allocation averages **{inr(nit_budget_cr*1e7)}** "
      f"(Rs {nit_budget_cr:.0f} crore).")
    a("")
    a(f"Our list price is **{inr(LIST_PRICE)}**.")
    a("")
    a(f"> ### That is {LIST_PRICE/(nit_budget_cr*1e7)*100:.4f}% of the institution's "
      f"entire annual budget.")
    a("")
    a("Not once, not anywhere, in any segment, have we been price-disqualified. "
      "**Any go-to-market plan that leads with price is solving the wrong problem.**")
    a("")
    a("### 2. The money is already unspent")
    a("")
    a(f"NIT budget **utilisation fell to {cap[0]['utilisation_pct']}%** in FY 2023-24 — "
      f"the lowest since FY 2019-20. That is "
      f"**{inr(cap[0]['unspent_per_institution_inr'])} unspent per NIT**.")
    a("")
    a("| Group | Utilisation | Unspent | Per institution | Our price as % of unspent |")
    a("|---|---:|---:|---:|---:|")
    for c in cap:
        a(f"| {c['group']} | {c['utilisation_pct']}% | Rs {c['unspent_cr']:,.0f} cr | "
          f"Rs {c['unspent_per_institution_cr']:,.2f} cr | {c['price_as_pct_of_unspent']:.4f}% |")
    a("")
    a("### 3. So the barrier is process")
    a("")
    a("Phase 2 already found the real blockers:")
    a("")
    a("- a **20× spread** in committee triggers across 8 institutional instruments "
      "(Rs 50,000 to Rs 10,00,000)")
    a("- **zero of the twelve** mandated IIC seats hold documented budget authority")
    a("")
    a("> **A product that is 0.006% of the budget, sitting behind a procurement "
      "committee that 0 of 12 authorised officers can bypass, is a process problem.** "
      "Reducing friction is the whole game.")
    a("")
    a("---")
    a("")
    a("## Budget allocation, FY 2025-26")
    a("")
    a(f"*Source: {F.BUDGET_FY2526['source']}*")
    a("")
    a("| Head | Rs crore |")
    a("|---|---:|")
    for h in F.BUDGET_FY2526["heads"]:
        a(f"| {h['label'].strip()} | {h['value']:,.2f} |")
    a("")
    a("Two lines deserve attention:")
    a("")
    a("- **AICTE was cut 50%** — Rs 400 cr (BE 24-25) to **Rs 200 cr** (BE 25-26). The "
      "regulator of technical education is losing budget while the institutions it "
      "regulates are not.")
    a("- **Private deemed universities receive Rs 604 crore** — the only private "
      "university line in the entire DoHE budget, across 10 institutions.")
    a("")
    a("### Allocation trend")
    a("")
    a("| FY | Central Universities | IITs | NITs & IIEST | Others |")
    a("|---|---:|---:|---:|---:|")
    for t in F.ALLOCATION_TREND:
        a(f"| {t['fy']} | {t['central_universities']:,} | {t['iits']:,} | "
          f"{t['nits']:,} | {t['others']:,} |")
    a("")
    a("Central University allocations grew 35% in two years; NIT allocations grew 18%. "
      "The public money is growing faster than the problem is being solved.")
    a("")
    a("---")
    a("")
    a("## The state-public system — 81% of students, barely in this budget")
    a("")
    sp = F.STATE_PUBLIC
    a(f"*Source: {sp['source']}*")
    a("")
    a(f"- **{sp['spus']:,} State Public Universities** with **{sp['affiliated_institutions']:,} "
      f"affiliated institutions** carry **{sp['share_of_enrolment_pct']}%** of all student "
      f"enrolment ({sp['students_crore']} crore students).")
    a(f"- They are funded by **state governments**, so they barely appear in the Union budget.")
    a(f"- The only central line reaching them is **PM-USHA: Rs {sp['pm_usha_central_scheme_cr']:,.0f} crore**.")
    a(f"- Higher education expenditure is **{sp['he_expenditure_pct_of_gdp']}% of GDP**; "
      f"total education {sp['total_education_pct_of_gdp']}% against an NEP target of "
      f"{sp['nep_target_pct']}%.")
    a("")
    a(f"**This is the real college market** — not the 45,473 AISHE figure, which counts "
      f"registration. {sp['affiliated_institutions']:,} institutions, 81% of the students, "
      f"and essentially invisible in the financial data.")
    a("")
    a("---")
    a("")
    a("## Funding pools")
    a("")
    a("| Pool | Committed | Deployed | Vehicles | Beneficiaries | Direction |")
    a("|---|---:|---:|---:|---:|---|")
    for p_ in F.FUNDING_POOLS:
        c = f"Rs {p_['committed_cr']:,.0f} cr" if p_["committed_cr"] else "—"
        d = f"Rs {p_['deployed_cr']:,.2f} cr" if p_["deployed_cr"] else "—"
        a(f"| {p_['pool']} | {c} | {d} | {p_['vehicles'] or '—'} | "
          f"{p_['beneficiaries'] or '—'} | {p_['direction']} |")
    a("")
    a("> **Only one of these points forward in time.** AIM's grant-in-aid of up to "
      "Rs 10 crore per incubator over five years is a *future* commitment. ARIIA's "
      "expenditure split (Phase 3A) is *retrospective*. For anyone selling into this "
      "ecosystem, that is the difference between a budget you can plan around and one "
      "you can only read after the fact.")
    a("")
    a("---")
    a("")
    a("## What this does NOT license")
    a("")
    a("> **Headroom is not willingness.** Rs 53 crore unspent per NIT is *capacity* "
      "evidence. Nothing in the public record establishes what any institution would "
      "*pay*. Conflating the two would be the same inference error this repository has "
      "refused throughout.")
    a("")
    a("**Phase 7's price band (Rs 75,000–1,20,000) is deliberately left unchanged** on the "
      "strength of unspent budget. The correct use of this data is to know we have room "
      "to move — not to justify moving yet. That requires `OQ-03`.")
    a("")
    p.write_text("\n".join(L), encoding="utf-8")
    return p


def write_buyer_determination():
    MR.mkdir(parents=True, exist_ok=True)
    p = MR / "Buyer_Determination.md"
    L = []
    a = L.append
    a("# Which institutions are actually potential buyers")
    a("")
    a(f"**Phase 5 — built {GENERATED}.** The spec's instruction: *\"Don't automatically add "
      f"all of these together. You need to determine which ones are actually potential "
      f"buyers.\"*")
    a("")
    a("> Modelled as a **funnel**, because each stage strictly filters the one above it. "
      "Adding these numbers produces 1,19,477, which is nonsense — it counts the same "
      "institution four times.")
    a("")
    a("---")
    a("")
    a("| Stage | Population | Basis | A buyer population? |")
    a("|---|---:|---|---|")
    for f in F.BUYER_FUNNEL:
        cnt = f"{f['count']:,}" + (f"–{f['count_high']:,}" if f.get("count_high") else "")
        mark = "**YES — this one**" if f["is_buyer_count"] else "no"
        a(f"| {f['stage']}. {f['label']} | {cnt} | {f['source']} | {mark} |")
    a("")
    for f in F.BUYER_FUNNEL:
        a(f"**Stage {f['stage']} — {f['label']}**  ")
        a(f"{f['why']}  ")
        a(f"*Why it is not the answer:* {f['excluded_note']}")
        a("")
    a("---")
    a("")
    a("## 777 is a ceiling of who *could* buy, not who *will*")
    a("")
    a("Stage 4 is the only stage we treat as a real population, because a NIRF Innovation "
      "filing is **observed behaviour** — something an institution actually did, not "
      "something it registered for.")
    a("")
    a("It is still not willingness to pay. The funnel gets us to *who is capable of "
      "being a buyer*. What they will pay remains `OQ-03`, unmeasured after five phases.")
    a("")
    a("---")
    a("")
    a("## Disqualifiers — who we should NOT sell to")
    a("")
    a("A funnel that only describes who to sell to will eventually be used to sell to "
      "someone who cannot buy.")
    a("")
    for d in F.BUYER_DISQUALIFIERS:
        a(f"- {d}")
    a("")
    a("---")
    a("")
    a("## The designated primary segment — and its honest financial bound")
    a("")
    b = F.PRIVATE_COLLEGE_BOUND
    a(f"Colleges are 65.3% private unaided and the primary target by user direction. "
      f"**They have no published itemised finances anywhere.** Rather than guess:")
    a("")
    a(f"> **Estimate ({b['provenance']}):** {b['headline']}")
    a("")
    a(f"**Method.** {b['method']}")
    a("")
    a(f"**Caveat.** {b['caveat']}")
    a("")
    a(f"**What would narrow it:** {b['what_would_narrow_it']}")
    a("")
    a("**Sources:**")
    for s in b["sources"]:
        a(f"- {s}")
    a("")
    p.write_text("\n".join(L), encoding="utf-8")
    return p


def write_market_sizing():
    MR.mkdir(parents=True, exist_ok=True)
    p = MR / "Market_Sizing.md"
    L = []
    a = L.append
    a("# Market Sizing — three independent approaches, never summed")
    a("")
    a(f"**Phase 5 — built {GENERATED}.**")
    a("")
    a("> Three sizings, three methods. They answer different questions, so they are "
      "reported side by side and **never added**.")
    a("")
    a("---")
    a("")
    a("| Sizing | Value | Year | Forecast | CAGR | Relevance |")
    a("|---|---|---|---:|---:|---|")
    for m in F.MARKET_SIZING:
        v = f"{m['value']:,.2f} {m['unit']}" if m["value"] else "—"
        fv = f"{m['forecast_value']:,.2f} ({m['forecast_year']})" if m["forecast_value"] else "—"
        cagr = f"{m['cagr_pct']}%" if m["cagr_pct"] else "—"
        a(f"| {m['sizing']} | {v} | {m['year']} | {fv} | {cagr} | {m['relevant']} |")
    a("")
    a("### The closest analogue")
    a("")
    he = next(m for m in F.MARKET_SIZING if "Higher education technology" in m["sizing"])
    a(f"**{he['sizing']}: US$ {he['value']:,.1f}M ({he['year']}) → "
      f"US$ {he['forecast_value']:,.1f}M ({he['forecast_year']}), CAGR {he['cagr_pct']}%.**")
    a("")
    a(f"> {he['note']}")
    a("")
    a("---")
    a("")
    a("## Conflict C-05 — the same market sized 625× apart")
    a("")
    c5 = next(c for c in F.CONFLICTS if c["id"] == "C-05")
    a("| Research house | Size | Year | Forecast | CAGR |")
    a("|---|---:|---|---:|---:|")
    for m in F.MARKET_SIZING:
        if m["relevant"] != "CONFLICTED":
            continue
        a(f"| {m['source']} | US$ {m['value']:,.1f}M | {m['year']} | "
          f"US$ {m['forecast_value']:,.1f}M ({m['forecast_year']}) | {m['cagr_pct']}% |")
    a("")
    a(f"**That is a {499/0.8:.0f}× disagreement** between two research houses, on the "
      f"same market, in the same currency.")
    a("")
    a(f"> {c5['why_it_matters']}")
    a("")
    a(f"**Our choice.** {c5['our_choice']}")
    a("")
    a("---")
    a("")
    a("## Conflict C-04 — institution counts differ by frame, not by error")
    a("")
    c4 = next(c for c in F.CONFLICTS if c["id"] == "C-04")
    a("| Source | Colleges | Universities |")
    a("|---|---:|---:|")
    a("| AISHE 2021-22 | 45,473 | 1,168 |")
    a("| IBEF FY26 | 52,461 | 1,409 |")
    a("| NITI Feb 2025 | ~46,000 affiliates of 495 SPUs | 495 SPUs |")
    a("")
    a(f"> {c4['why_it_matters']}")
    a("")
    a(f"**Our choice.** {c4['our_choice']}")
    a("")
    p.write_text("\n".join(L), encoding="utf-8")
    return p


def write_unit_economics_doc():
    MR.mkdir(parents=True, exist_ok=True)
    p = MR / "Unit_Economics.md"
    ue = SIM.unit_economics()
    s = SIM.unit_economics_summary()
    req = SIM.required_acv()
    L = []
    a = L.append
    a("# Unit Economics")
    a("")
    a(f"**Phase 5 — built {GENERATED} by `build/build_phase5.py`. Seeded Monte Carlo, "
      f"50,000 trials, seed `{SIM.SEED}`. Modelled at the same ACV distribution as "
      f"everything else, so it stays internally consistent.**")
    a("")
    a("> **Provenance: `SIMULATED`.** These describe our cost assumptions, not the market.")
    a("")
    a("---")
    a("")
    a("## The finding: at Rs 1.2 lakh, this business destroys value on every deal")
    a("")
    a("| Metric | P25 | P50 | P75 |")
    a("|---|---:|---:|---:|")
    for key, fmt in (("cac", inr), ("ltv", inr), ("payback", lambda x: f"{x:.1f} months")):
        v = ue[key]
        a(f"| {v['metric']} | {fmt(v['p25'])} | {fmt(v['p50'])} | {fmt(v['p75'])} |")
    a(f"| **LTV / CAC** | **{s['ltv_cac_p25_p75'][0]}** | **{s['ltv_cac_p50']}** | "
      f"**{s['ltv_cac_p25_p75'][1]}** |")
    a("")
    a(f"### P(LTV/CAC > 3) = {s['pct_viable_gt_3x']}%")
    a("")
    a("**Zero of 50,000 trials reach even 1.0.** At a median ratio of "
      f"**{s['ltv_cac_p50']}**, every rupee of acquisition cost returns about "
      "twenty paise of lifetime value.")
    a("")
    a("### Why")
    a("")
    a("CAC is dominated by the **sales cycle**, not by marketing spend:")
    a("")
    a(f"- cycle {SIM.PRIORS['sales_cycle_months'][1]} months × "
      f"{inr(SIM.PRIORS['seller_monthly_cost'][1])}/month × "
      f"{SIM.PRIORS['people_per_deal'][1]} people ≈ **{inr(ue['cac']['p50'])}**")
    a(f"- LTV at {inr(ue['ltv']['p50'])} is capped by a {LIST_PRICE//100000}.2 lakh "
      f"contract, a ~{ue['effective_margin']['p50']:.0%} effective margin and a "
      f"{SIM.PRIORS['renewal'][1]:.0%} renewal rate")
    a("")
    a("> **The ACV is roughly an order of magnitude too small for this sales motion.** "
      "No amount of sales-process improvement closes a 0.21 ratio.")
    a("")
    a("---")
    a("")
    a("## What ACV would make it work?")
    a("")
    a("| | P25 | P50 | P75 |")
    a("|---|---:|---:|---:|")
    a(f"| **ACV required for LTV/CAC = 3** | {inr(req['p25'])} | **{inr(req['p50'])}** | "
      f"{inr(req['p75'])} |")
    a("")
    a(f"That is **{req['p50']/LIST_PRICE:.1f}× the current Rs {LIST_PRICE:,} list price.**")
    a("")
    a("### And the budget can absorb it")
    a("")
    nit_cr = 5687.47 / F.INSTITUTION_COUNTS["nits"]
    a(f"At {inr(req['p50'])} a year, against a NIT's {inr(nit_cr*1e7)} budget, that is "
      f"**{req['p50']/(nit_cr*1e7)*100:.3f}% of the institution's annual budget.**")
    a("")
    a("> ### The coherent picture, for the first time")
    a(">")
    a("> 1. Phase 36: P(Rs 1 crore ARR by year 3) = **0.0%**")
    a("> 2. Phase 5: our price is **0.006%** of a NIT's budget — affordability is a non-issue")
    a("> 3. Phase 5 unit economics: **LTV/CAC = 0.21** at the current price")
    a("> 4. Viability needs ACV ≈ **Rs 10.3 lakh**, which is **0.054%** of that same budget")
    a(">")
    a("> **We are priced roughly 9× too low for our own sales model, and the budget has "
      "enormous room to absorb the increase.** The only thing arguing against it is "
      "willingness to pay — `OQ-03` — which is still unmeasured.")
    a("")
    a("This is what the budget data is for: **not to raise the price, but to know that "
      "price is not the constraint.** Raising it on the strength of unspent budget would "
      "be the exact inference error we have refused throughout. `OQ-03` has to be answered.")
    a("")
    a("---")
    a("")
    a("## The three ways out")
    a("")
    a("| Lever | Effect | Evidence status |")
    a("|---|---|---|")
    a("| **Raise ACV to ~Rs 10 lakh** | LTV/CAC 0.21 → 3.0 | Affordable (budget headroom proven). "
      "Willingness **unmeasured** (`OQ-03`) |")
    a("| **Cut CAC** via shorter cycle | CAC is `cycle × seller × people` — halving the "
      "cycle halves CAC | Committee-gated (Phase 2). `OQ-27` (GeM bypass) is the lever |")
    a("| **Sell through a partner** (incubators, AIM-funded) | Removes the founder from "
      "the CAC equation entirely | 244 funded incubators (G5). Untested |")
    a("")
    a("The simulation says **conversion (r=0.65) and ACV (r=0.56) dominate** the year-3 "
      "answer, and that renewal and sales-cycle length sit at r ≈ 0.00. But the "
      "unit-economics model shows the sales cycle is what *creates* the CAC. The two "
      "models agree on ACV and disagree on cycle length — which is itself worth knowing.")
    a("")
    a("---")
    a("")
    a("## Assumptions")
    a("")
    a("| Input | Min | Mode | Max | Basis |")
    a("|---|---:|---:|---:|---|")
    for k, why in (("seller_monthly_cost", "Rs 8 lakh/yr fully loaded ≈ Rs 66,700/month"),
                   ("people_per_deal", "seller plus a technical/commercial half"),
                   ("gross_margin", "SaaS minus on-premise servicing"),
                   ("on_premise_annual_cost", "infra, patches, support per on-prem customer")):
        v = SIM.PRIORS[k]
        a(f"| `{k}` | {v[0]:,} | {v[1]:,} | {v[2]:,} | {why} |")
    a("")
    a("**Every figure here is an assumption we chose.** The model is only as good as "
      "these, which is why they are published rather than buried.")
    a("")
    p.write_text("\n".join(L), encoding="utf-8")
    return p


def write_readme():
    MR.mkdir(parents=True, exist_ok=True)
    p = MR / "README.md"
    s = SIM.unit_economics_summary()
    L = []
    a = L.append
    a("# Indian Innovation Ecosystem — Market Research")
    a("")
    a(f"**Phase 5 — rebuilt {GENERATED} by `build/build_phase5.py`, financial-first.**")
    a("")
    a("| Page | What it answers |")
    a("|---|---|")
    a("| [Financial_Landscape.md](Financial_Landscape.md) | Where is the money, and is it ours to take? |")
    a("| [Buyer_Determination.md](Buyer_Determination.md) | Which of these institutions can actually buy? |")
    a("| [Market_Sizing.md](Market_Sizing.md) | How big, three ways — and why two houses disagree 625× |")
    a("| [Unit_Economics.md](Unit_Economics.md) | Does a rupee in return more than a rupee out? |")
    a("| [Segmentation_Matrix.md](Segmentation_Matrix.md) | 8 segments × 4 axes + quadrant (Phase 4) |")
    a("| [ICP.md](ICP.md) | Ideal customer profile + exclusions (Phase 4) |")
    a("")
    a("---")
    a("")
    a("## Three findings that change the plan")
    a("")
    a("### 1. We have never been price-disqualified")
    a("")
    a("Rs 120,000 against a NIT's ~Rs 190 crore budget is **0.006%**. Against a private "
      "deemed university, 0.002%. Lead with anything other than process friction and we "
      "are solving the wrong problem.")
    a("")
    a("### 2. The money is already unspent")
    a("")
    a("NIT budget utilisation fell to **67%** — the lowest since FY 2019-20 — worth "
      "**~Rs 53 crore unspent per NIT**.")
    a("")
    a("### 3. But the business does not yet work")
    a("")
    a(f"**LTV/CAC = {s['ltv_cac_p50']}.** Not one trial in 50,000 reaches 1.0. Viability "
      f"needs ACV ≈ **Rs {s['required_acv_for_3x'][1]:,}**, which is "
      f"{s['required_acv_for_3x'][1]/LIST_PRICE:.1f}× the current price — and only "
      f"0.054% of a NIT's budget.")
    a("")
    a("> **We are priced roughly 9× too low for our own sales model, and the budget can "
      "absorb the increase. Only willingness to pay (`OQ-03`) argues against it.**")
    a("")
    a("---")
    a("")
    a("## The buyer funnel")
    a("")
    a("| Stage | Population |")
    a("|---|---:|")
    for f in F.BUYER_FUNNEL:
        cnt = f"{f['count']:,}" + (f"–{f['count_high']:,}" if f.get("count_high") else "")
        mark = " ← **buyer population**" if f["is_buyer_count"] else ""
        a(f"| {f['stage']}. {f['label']} | {cnt}{mark} |")
    a("")
    a("Never summed. See [Buyer_Determination.md](Buyer_Determination.md).")
    a("")
    a("---")
    a("")
    a("## Five recorded conflicts")
    a("")
    a("| ID | Subject | Spread |")
    a("|---|---|---|")
    for c in F.CONFLICTS:
        sp = f"{c['spread_pct']}%" if c.get("spread_pct") else "625×"
        a(f"| {c['id']} | {c['subject']} | {sp} |")
    a("")
    a("---")
    a("")
    a("## What this phase could NOT establish")
    a("")
    a("- **No private or state college balance sheet exists in any public source.** "
      "The designated primary segment's financials are `BOUNDED`, not documented.")
    a("- **No published renewal or churn rate** exists for any incumbent in this category.")
    a("- **C-05 shows published market sizing is unusable** — 625× disagreement on one market.")
    a("- **Zero interviews.** Willingness to pay is still `OQ-03`, open since Phase 0.")
    a("")
    a("Machine-readable: `_exports/phase5/`. Reproduce: `python build/build_phase5.py`.")
    a("")
    p.write_text("\n".join(L), encoding="utf-8")
    return p


# --------------------------------------------------------------------------
def main():
    errs, warns = F.validation()
    for w in warns:
        print(f"  warn: {w}")
    if errs:
        raise SystemExit("Validation failed:\n  - " + "\n  - ".join(errs))

    n1 = write_budget();          print(f"  csv/budget_allocations.csv  {n1:4d} budget heads")
    n2 = write_headroom();        print(f"  csv/budget_headroom.csv     {n2:4d} classes")
    n3 = write_pools();           print(f"  csv/funding_pools.csv       {n3:4d} pools")
    n4 = write_sizing();          print(f"  csv/market_sizing.csv       {n4:4d} sizings")
    n5 = write_funnel();          print(f"  csv/buyer_funnel.csv        {n5:4d} funnel stages")
    n6 = write_unit_economics();  print(f"  csv/unit_economics.csv      {n6:4d} metrics")
    n7 = write_conflicts();       print(f"  csv/conflicts.csv           {n7:4d} recorded conflicts")
    write_schema();               print("  json/financial_schema.json")

    write_financial_landscape();  print("  03_Market_Research/Financial_Landscape.md")
    write_buyer_determination();  print("  03_Market_Research/Buyer_Determination.md")
    write_market_sizing();        print("  03_Market_Research/Market_Sizing.md")
    write_unit_economics_doc();  print("  03_Market_Research/Unit_Economics.md")
    write_readme();               print("  03_Market_Research/README.md")

    p = write_raw();              print(f"  _exports/raw/                {p.name} ({p.stat().st_size:,} bytes)")

    print()
    cap = F.unspent_capacity(LIST_PRICE)
    s = SIM.unit_economics_summary()
    nit = 5687.47 / F.INSTITUTION_COUNTS["nits"]
    print(f"  Budget FY{F.FY}: DoHE Rs {F.BUDGET_FY2526['heads'][2]['value']:,.0f} cr")
    print(f"    NIT budget per institution : Rs {nit:.0f} crore")
    print(f"    our list price as % of it  : {LIST_PRICE/(nit*1e7)*100:.4f}%  <- never price-disqualified")
    print(f"    NIT unspent per institution: Rs {cap[0]['unspent_per_institution_cr']:.0f} crore (67% utilisation)")
    print(f"  Buyer population (NIRF Innovation filers): 777 of 58,643 registered")
    print(f"  Unit economics: LTV/CAC = {s['ltv_cac_p50']} | P(>3x) = {s['pct_viable_gt_3x']}%")
    print(f"    ACV required for viability: Rs {s['required_acv_for_3x'][1]:,} "
          f"({s['required_acv_for_3x'][1]/LIST_PRICE:.1f}x list price)")
    print("  NOTE: interviews = 0. WTP (OQ-03) remains the open question.")
    return 0


if __name__ == "__main__":
    sys.exit(main())