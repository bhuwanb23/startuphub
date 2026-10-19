#!/usr/bin/env python3
"""StartupHub Phase 6 exporter - Government & Official Data.

Writes:
  05_Government_Data/README.md                 the phase, the findings, the divergence note
  05_Government_Data/Source_Map.md             all 13 bodies + access status
  05_Government_Data/State_Startup_Ranking.md  framework evolution, results, tier movement
  05_Government_Data/State_Reports_Mined.md    tier-spread coverage + the Emerging-tier gap
  05_Government_Data/Funding_Schemes.md         incubator grants + state policy examples
  05_Government_Data/State_Segment.md          G9 - the buyer Phase 0-5 never modelled
  _exports/phase6/source_map.csv
  _exports/phase6/srf_editions.csv
  _exports/phase6/srf_results_5_0.csv
  _exports/phase6/srf_pillars.csv
  _exports/phase6/state_reports.csv
  _exports/phase6/mentorship_scored_on_srf.csv
  _exports/phase6/incubator_schemes.csv
  _exports/phase6/gov_schema.json
  _exports/raw/phase6_gov_RAW.json

Also refreshes the Phase 5 buyer funnel so the state layer appears as a PARALLEL
track (never as a fifth funnel stage - that would breach the nested-filter rule).

Usage:  python build/build_phase6.py
"""

import csv
import json
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
ROOT = HERE.parent

import data_p6_gov as G       # noqa: E402
import data_p5_finance as F   # noqa: E402

OUT = ROOT / "_exports" / "phase6"
RAW = ROOT / "_exports" / "raw"
GD = ROOT / G.FOLDER
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
def write_source_map():
    rows = [dict(n=s["n"], body=s["body"], ministry=s["ministry"],
                 publishes=s["publishes"], form=s["form"], access=s["access"],
                 access_meaning=G.ACCESS[s["access"]],
                 machine_readable=s["machine_readable"],
                 buyer_relevant=s["buyer_relevant"], note=s["note"])
            for s in G.SOURCE_MAP]
    return write_csv(OUT / "source_map.csv",
                     ["n", "body", "ministry", "publishes", "form", "access",
                      "access_meaning", "machine_readable", "buyer_relevant", "note"], rows)


def write_srf_editions():
    cols = ["edition", "year", "reform_areas", "action_points", "total_marks",
            "participating", "complete_submissions", "source", "areas", "note"]
    return write_csv(OUT / "srf_editions.csv", cols, G.SRF_EDITIONS)


def write_srf_results():
    rows = []
    for tier, states in G.SRF_RESULTS_5_0.items():
        for st, cat in states:
            rows.append(dict(tier=tier, state=st, category=cat,
                             category_meaning=G.CATEGORIES_5_0[cat],
                             edition="5th (SRF 5.0)", year=2026))
    return write_csv(OUT / "srf_results_5_0.csv",
                     ["tier", "state", "category", "category_meaning", "edition", "year"], rows)


def write_srf_pillars():
    return write_csv(OUT / "srf_pillars.csv",
                     ["area", "marks", "action_points", "absolute", "relative"],
                     G.SRF_5_0_PILLARS)


def write_state_reports():
    rows = []
    for r in G.STATE_REPORTS_MINED:
        rows.append(dict(status="MINED", state=r["state"], tier_5_0=r["tier_5_0"],
                         category=r["category"], portal=r["portal"] or "not_stated",
                         pages=r["pages"], chars=r["chars"],
                         verified_facts=json.dumps(r["verified_facts"], ensure_ascii=False),
                         note=r["note"]))
    for u in G.STATE_REPORTS_UNAVAILABLE:
        rows.append(dict(status="UNAVAILABLE", state=u["state"], tier_5_0=u["tier_5_0"],
                         category="", portal="", pages="", chars="",
                         verified_facts="", note=u["reason"]))
    return write_csv(OUT / "state_reports.csv",
                     ["status", "state", "tier_5_0", "category", "portal", "pages",
                      "chars", "verified_facts", "note"], rows)


def write_mentorship():
    sc = G.score_corpus_on_srf()
    return write_csv(OUT / "mentorship_scored_on_srf.csv",
                     ["id", "institution", "mentors", "cat_a_score", "cat_b_score"],
                     sc["rows"])


def write_schemes():
    return write_csv(OUT / "incubator_schemes.csv",
                     ["scheme", "ministry", "grant_max_crore", "duration_years",
                      "beneficiaries", "reaches_institutions", "eligibility", "note"],
                     G.INCUBATOR_SCHEMES)


def write_schema():
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / "gov_schema.json").write_text(json.dumps(dict(
        note="Phase 6 government data layer.",
        folder=G.FOLDER,
        folder_divergence=("todo.md PHASE 6 specifies `04_Government_Data`. That prefix is "
                           "already taken by `04_Competitor_DeepDive`. This repository runs "
                           "two folders per numeric prefix (00_, 01_, 02_, 03_ each have "
                           "two) and `05_Government_Data` already existed as an empty "
                           "placeholder referenced by todo.md's own status table. We use "
                           "05_Government_Data and record the divergence here."),
        access_vocabulary=G.ACCESS,
        guards=[
            "every source row must carry an access status - no source without one",
            "SRF editions must remain distinct; the 38->25->19 progression is a finding",
            "Emerging-tier report coverage must stay recorded as zero until re-verified",
            "the Phase 0 competitor-coverage miss must stay attributed to Phase 0",
            "state buyer layer is a PARALLEL track, never a funnel stage",
        ],
        parallel_buyer_tracks=F.PARALLEL_BUYER_TRACKS,
    ), indent=2, ensure_ascii=False), encoding="utf-8")
    return 1


def write_raw():
    RAW.mkdir(parents=True, exist_ok=True)
    p = RAW / "phase6_gov_RAW.json"
    p.write_text(json.dumps(dict(
        note="Phase 6 government data. Public sources only. No fabricated observations.",
        generated=GENERATED, generated_by="build/build_phase6.py",
        interviews_conducted=0,
        source_map=G.SOURCE_MAP, srf_editions=G.SRF_EDITIONS,
        srf_pillars=G.SRF_5_0_PILLARS, srf_results_5_0=G.SRF_RESULTS_5_0,
        srf_results_2022=G.SRF_RESULTS_2022, tier_movement=G.tier_movement(),
        state_reports_mined=G.STATE_REPORTS_MINED,
        state_reports_unavailable=G.STATE_REPORTS_UNAVAILABLE,
        emerging_tier=G.EMERGING_TIER_COVERAGE, state_portals=G.STATE_PORTALS,
        incubator_schemes=G.INCUBATOR_SCHEMES, state_policies=G.STATE_POLICY_EXAMPLES,
        mentorship_bands=G.SRF_MENTORSHIP_BANDS, corpus_srf=G.score_corpus_on_srf(),
        g9_segment=G.G9_SEGMENT,
    ), indent=2, ensure_ascii=False), encoding="utf-8")
    return p


# --------------------------------------------------------------------------
# prose
# --------------------------------------------------------------------------
def write_readme():
    GD.mkdir(parents=True, exist_ok=True)
    p = GD / "README.md"
    acc = G.access_summary()
    sc = G.score_corpus_on_srf()
    L = []
    a = L.append
    a("# Government & Official Data")
    a("")
    a(f"**Phase 6 — built {GENERATED} by `build/build_phase6.py`. 13 sources mapped, "
      f"9 of them buyer-relevant.**")
    a("")
    a("---")
    a("")
    a("## A declared divergence")
    a("")
    a("> `todo.md` PHASE 6 specifies **`04_Government_Data`**. That prefix is already "
      "taken by `04_Competitor_DeepDive`.")
    a(">")
    a("> This repository already runs two folders per numeric prefix — `00_`, `01_`, "
      "`02_` and `03_` each have two — and `05_Government_Data` already existed as an "
      f"empty placeholder that `todo.md`'s own status table points at. This phase uses "
      f"**`{G.FOLDER}`**, alongside `05_Market_Sizing`.")
    a("")
    a("---")
    a("")
    a("## The finding that justifies the phase")
    a("")
    a("> ### The State Startup Ranking is not a report. It is a buyer scorecard.")
    a(">")
    a("> Every state is scored annually, by the union, on whether it has an active "
      "State Startup Policy, a Nodal Officer, a Nodal Department, a Dedicated Team — "
      "**and the number of startups availing institutional support**.")
    a(">")
    a("> That last item is a venture register. Phases 0–5 modelled no such buyer.")
    a("")
    a("---")
    a("")
    a("## Three things we did not know")
    a("")
    a("### 1. An unmapped buyer (now Phase 4 segment **G9**)")
    a("")
    a("| | Institution | State Nodal Dept |")
    a("|---|---|---|")
    a("| Budget | none documented | policy-linked |")
    a("| Mandate | IIC compliance only | **scored nationally, annually** |")
    a("| Scope | one campus | whole state |")
    a("| Incumbent | none found | **a state startup portal** |")
    a("")
    a("**G9 is the first and only segment in Phase 4's `ACT NOW` quadrant** "
      "(urgency 4 / revenue 4) — the quadrant Phase 4 reported as empty.")
    a("")
    a("### 2. An unmapped incumbent")
    a("")
    a(f"> {G.STATE_PORTALS['finding']}")
    a("")
    for e in G.STATE_PORTALS["evidence"][:3]:
        a(f"- {e}")
    a("")
    a(f"> **Competitor implication.** {G.STATE_PORTALS['competitor_implication']}")
    a("")
    a(f"> **Open question, not resolved by assumption:** {G.STATE_PORTALS['strategic_question']}")
    a("")
    a("### 3. A publication bias in the government data itself")
    a("")
    a(f"> {G.EMERGING_TIER_COVERAGE['finding']}")
    a("")
    a("We mined six per-state reports deliberately spread across tiers. **Zero "
      "Emerging-tier reports were obtainable.** That mirrors OQ-21 in Phase 1: "
      "self-publishing institutions meant the winners were visible and the failures "
      "were not. Here, the states that need a product like this most are the least "
      "documented.")
    a("")
    a("---")
    a("")
    a("## Access is the real constraint")
    a("")
    a("| Access | Bodies |")
    a("|---|---:|")
    for k, v in sorted(acc.items(), key=lambda x: -x[1]):
        a(f"| `{k}` | {v} of {len(G.SOURCE_MAP)} |")
    a("")
    a("| Access | Means |")
    a("|---|---|")
    for k, v in G.ACCESS.items():
        a(f"| `{k}` | {v} |")
    a("")
    a("> **Only 0 of 13 publish machine-readable data, and the two most important — the "
      "IIC portal and DPIIT — are gated.** `OQ-22` (what fraction of IICs actually file) "
      "is unanswerable for exactly this reason. This is `OQ-04` restated as an access "
      "finding rather than a technology finding.")
    a("")
    a("---")
    a("")
    a("## Funding schemes — correcting Phase 5")
    a("")
    a("Phase 5 concluded that AIM's grant was the only forward-looking funding signal "
      "found. **That was wrong, and this phase corrects it.**")
    a("")
    a("| Scheme | Ministry | Max grant | Years | Reaches institutions |")
    a("|---|---|---:|---:|---|")
    for s in G.INCUBATOR_SCHEMES:
        gm = f"Rs {s['grant_max_crore']} cr" if s["grant_max_crore"] else "not stated"
        a(f"| **{s['scheme']}** | {s['ministry']} | {gm} | {s['duration_years']} | "
          f"{'yes' if s['reaches_institutions'] else 'no'} |")
    a("")
    a("**Four central schemes, and at least three flow directly to degree institutions.** "
      "TIDE 2.0's ceiling of Rs 27.2 crore is the largest incubator grant found anywhere "
      "in this research.")
    a("")
    a("---")
    a("")
    a("## Files")
    a("")
    a("| File | What it covers |")
    a("|---|---|")
    a("| [Source_Map.md](Source_Map.md) | All 13 bodies, what they publish, access status |")
    a("| [State_Startup_Ranking.md](State_Startup_Ranking.md) | Framework 2018→2026, results, tier movement |")
    a("| [State_Reports_Mined.md](State_Reports_Mined.md) | Tier-spread coverage and the Emerging-tier gap |")
    a("| [Funding_Schemes.md](Funding_Schemes.md) | Incubator grants + state policy examples |")
    a("| [State_Segment.md](State_Segment.md) | G9 — the buyer Phase 0–5 never modelled |")
    a("")
    a(f"Machine-readable: `_exports/phase6/`. Reproduce: `python build/build_phase6.py`.")
    a("")
    p.write_text("\n".join(L), encoding="utf-8")
    return p


def write_source_map_doc():
    p = GD / "Source_Map.md"
    L = []
    a = L.append
    a("# Source Map — 13 government bodies")
    a("")
    a(f"**Phase 6. Built {GENERATED}.**")
    a("")
    a("> The field that matters most here is **access**, and it is the one Phase 0 never "
      "recorded. `OQ-04` (\"no public API in the mandated stack\") is really a statement "
      "about access, and access has to be mapped before anything can integrate.")
    a("")
    a("| # | Body | Ministry | Access | Machine-readable | Buyer-relevant |")
    a("|---:|---|---|---|---|---|")
    for s in G.SOURCE_MAP:
        a(f"| {s['n']} | **{s['body']}** | {s['ministry']} | `{s['access']}` | "
          f"{'yes' if s['machine_readable'] else 'no'} | "
          f"{'**yes**' if s['buyer_relevant'] else 'no'} |")
    a("")
    a("---")
    a("")
    for s in G.SOURCE_MAP:
        a(f"### {s['n']}. {s['body']}")
        a("")
        a(f"- **Ministry:** {s['ministry']}")
        a(f"- **Publishes:** {s['publishes']}")
        a(f"- **Form:** {s['form']} · **Access:** `{s['access']}` — {G.ACCESS[s['access']]}")
        a(f"- **Note:** {s['note']}")
        a("")
    a("---")
    a("")
    a("## What access gating actually costs us")
    a("")
    a("| Question | Blocked by | Why it matters |")
    a("|---|---|---|")
    a("| `OQ-22` What fraction of IICs actually file? | IIC portal `LOGIN_GATED` | "
      "The single biggest sizing uncertainty |")
    a("| `OQ-32` How do officers get a DPIIT number? | DPIIT `REGISTER_GATED` | "
      "Determines whether the product is a spreadsheet or a workflow |")
    a("| `OQ-10` How is the IIC star formula computed? | MoE publishes the band, not the formula | "
      "Stars are unusable as a benchmark input |")
    a("| Incubator disbursement by centre | DST/MeitY publish guidelines, not disbursement | "
      "Cannot verify the Rs 27.2 cr figures beyond the ceiling |")
    a("")
    a("> **Two of the three most important sources are gated, and neither is bulk-harvestable.** "
      "Any integration plan that assumes API access to the mandated stack is wrong.")
    a("")
    p.write_text("\n".join(L), encoding="utf-8")
    return p


def write_srf_doc():
    p = GD / "State_Startup_Ranking.md"
    L = []
    a = L.append
    a("# States' Startup Ranking — the framework, the results, and who fell")
    a("")
    a(f"**Phase 6. Built {GENERATED}.**")
    a("")
    a("---")
    a("")
    a("## The state has halved its own measurement")
    a("")
    a("| Edition | Year | Reform areas | Action points | Marks | Participating | Complete |")
    a("|---:|---:|---:|---:|---:|---:|---:|")
    for e in G.SRF_EDITIONS:
        a(f"| {e['edition']}th | {e['year']} | {e['reform_areas']} | "
          f"**{e['action_points']}** | {e['total_marks']} | {e['participating']} | "
          f"{e.get('complete_submissions', '—')} |")
    a("")
    a("**38 → 25 → 19 action points, and marks cut from 100 to 75**, while participation "
      "rose from ~30 to 34 States and UTs. The framework got narrower as it got broader.")
    a("")
    a("### Scoring weights")
    a("")
    a("| Edition | Documents | Startup feedback | Private ecosystem mapping |")
    a("|---|---:|---:|---:|")
    for e in G.SRF_EDITIONS:
        w = e.get("weights")
        a(f"| {e['edition']}th ({e['year']}) | {w['documents']}%" if w else
          f"| {e['edition']}th ({e['year']}) | — | — | — |")
    a("")
    a("The 4th edition put **15% of the score on 10,000+ startup survey responses in "
      "9 languages**. The 5th added **Private Ecosystem Mapping at 10%** — the first time "
      "private, non-government activity is scored.")
    a("")
    a("---")
    a("")
    a("## SRF 5.0 pillars")
    a("")
    a("| Reform area | Marks | Action points | Absolute | Relative |")
    a("|---|---:|---:|---:|---:|")
    for p_ in G.SRF_5_0_PILLARS:
        a(f"| {p_['area']} | {p_['marks']} | {p_['action_points']} | "
          f"{p_['absolute']} | {p_['relative']} |")
    a(f"| **Total** | **{sum(p['marks'] for p in G.SRF_5_0_PILLARS)}** | "
      f"**{sum(p['action_points'] for p in G.SRF_5_0_PILLARS)}** | "
      f"**{sum(p['absolute'] for p in G.SRF_5_0_PILLARS)}** | "
      f"**{sum(p['relative'] for p in G.SRF_5_0_PILLARS)}** |")
    a("")
    a("> **Institutional Support is 25 of 75 marks — a third of the score — and it is "
      "the pillar that scores a state on its Nodal Officer, Nodal Department, Dedicated "
      "Team and the number of startups availing institutional support.**")
    a("")
    a("Categories: **A1** " + G.CATEGORIES_5_0["A1"] + " · **A2** " +
      G.CATEGORIES_5_0["A2"] + " · **B** " + G.CATEGORIES_5_0["B"])
    a("")
    a("---")
    a("")
    a("## SRF 5.0 results")
    a("")
    a("| Tier | States |")
    a("|---|---|")
    for tier in G.TIER_ORDER:
        st = ", ".join(f"{s} ({c})" for s, c in G.SRF_RESULTS_5_0[tier])
        a(f"| **{tier}** | {st} |")
    a("")
    a(f"Total ranked: **{sum(len(v) for v in G.SRF_RESULTS_5_0.values())}** States and UTs.")
    a("")
    a("---")
    a("")
    a("## Who fell between the 4th and 5th editions")
    a("")
    a("| State | 2022 | SRF 5.0 | Tiers fell |")
    a("|---|---|---|---:|")
    for m in G.tier_movement():
        a(f"| **{m['state']}** | {m['from_tier']} | {m['to_tier']} | {m['tiers_fell']} |")
    a("")
    a("> **Kerala and Odisha each fell two tiers; six more fell one.** Gujarat has been "
      "a Best Performer continuously since 2018 — the only state with that record in the "
      "published results.")
    a("")
    a("**What this tells StartupHub:** state ecosystem quality is not a fixed ranking. A "
      "state at the top in 2022 can be a Leader in 2026, which means the need is not "
      "static and a one-off state sale is not a durable position. It also means **emerging "
      "states are where relative improvement is easiest** — and they are the ones with "
      "no published evidence at all.")
    a("")
    a("---")
    a("")
    a("## The scoring rubric we can borrow")
    a("")
    a("SRF scores states on mentorship with explicit bands. We can score our own "
      "36-document corpus on the same scale:")
    a("")
    a("| Band | Category A (>1 crore pop) | Category B (<1 crore pop) |")
    a("|---|---|---|")
    for i in range(3):
        a(f"| Score {3-i} | {G.SRF_MENTORSHIP_BANDS['Category_A'][i][0]} | "
          f"{G.SRF_MENTORSHIP_BANDS['Category_B'][i][0]} |")
    a("")
    sc = G.score_corpus_on_srf()
    a(f"**{sc['scoreable']} of {sc['total']} institutions ({sc['coverage_pct']}%) can be "
      f"scored on this rubric.** Where we can:")
    a("")
    a("| Institution | Mentors | Category A | Category B |")
    a("|---|---:|---:|---:|")
    for r in sc["rows"]:
        if r["cat_a_score"] is not None:
            a(f"| {r['institution']} | {r['mentors']} | {r['cat_a_score']}/3 | "
              f"{r['cat_b_score']}/3 |")
    a("")
    a("> **The limit is the data, not the rubric.** Phase 1 populates "
      "`faculty_mentors` in only 2 of 36 institutions. The government's own metric is "
      "the right one and we cannot apply it — which is itself the strongest argument "
      "for the product.")
    a("")
    p.write_text("\n".join(L), encoding="utf-8")
    return p


def write_state_reports_doc():
    p = GD / "State_Reports_Mined.md"
    L = []
    a = L.append
    a("# State Reports — tier-spread coverage")
    a("")
    a(f"**Phase 6. Built {GENERATED}.**")
    a("")
    a("---")
    a("")
    a("## Why tier-spread, and not the winners")
    a("")
    a("Phase 1 learned what happens when a corpus is made of institutions that volunteer "
      "their own success: the winners are visible and the failures are not. That is "
      "recorded as OQ-21.")
    a("")
    a("Mining only Gujarat and Tamil Nadu would repeat the same error at state level. So "
      "the target list was deliberately spread across all five SRF tiers.")
    a("")
    a("---")
    a("")
    a("## What we got")
    a("")
    a("| Status | State | Tier (SRF 5.0) | Cat | Pages | Portal | Verified facts |")
    a("|---|---|---|---|---:|---|---|")
    for r in G.STATE_REPORTS_MINED:
        vf = ", ".join(f"{k}={v}" for k, v in r["verified_facts"].items()) or "—"
        a(f"| ✅ mined | **{r['state']}** | {r['tier_5_0']} | {r['category']} | "
          f"{r['pages']} | {r['portal'] or 'not stated'} | {vf} |")
    for u in G.STATE_REPORTS_UNAVAILABLE:
        a(f"| ❌ unavailable | {u['state']} | {u['tier_5_0']} | — | — | — | "
          f"{u['reason'][:60]}… |")
    a("")
    a("---")
    a("")
    a("## Tier coverage")
    a("")
    a(f"- Tiers targeted: **{G.EMERGING_TIER_COVERAGE['tiers_targeted']}**")
    a(f"- Tiers with at least one report: **{G.EMERGING_TIER_COVERAGE['tiers_with_reports']}**")
    a(f"- **Emerging-tier reports obtained: {G.EMERGING_TIER_COVERAGE['emerging_tier_reports_obtained']}**")
    a("")
    a(f"> ### {G.EMERGING_TIER_COVERAGE['finding']}")
    a("")
    a("Six states were attempted across the missing tiers (Odisha, Meghalaya, Puducherry, "
      "Goa, Chhattisgarh, NCT of Delhi). Filename variants were tried for each; every one "
      "returned an HTML error page rather than a PDF.")
    a("")
    a("**We are not filling that gap with an assumption.** It stays recorded as zero "
      "until someone re-verifies it. The build guard fails if this figure is changed "
      "without re-checking.")
    a("")
    a("---")
    a("")
    a("## What the mined reports show")
    a("")
    for r in G.STATE_REPORTS_MINED:
        a(f"**{r['state']}** ({r['tier_5_0']}, {r['category']}) — {r['note']}")
        a("")
    a("Two figures stand out:")
    a("")
    a("- **Gujarat lists 250 incubators.** A state maintaining an incubator directory of "
      "that size has an information-management problem that is not a spreadsheet problem.")
    a("- **Himachal Pradesh runs a Rs 10 crore seed fund** despite being a Category B "
      "state (population under 1 crore). Category is a poor proxy for budget.")
    a("")
    p.write_text("\n".join(L), encoding="utf-8")
    return p


def write_funding_doc():
    p = GD / "Funding_Schemes.md"
    L = []
    a = L.append
    a("# Funding Schemes and State Policies")
    a("")
    a(f"**Phase 6. Built {GENERATED}.** This page corrects a Phase 5 conclusion.")
    a("")
    a("---")
    a("")
    a("## The correction")
    a("")
    a("Phase 5 concluded:")
    a("")
    a("> *\"Only one of these points forward in time — AIM's grant-in-aid. ARIIA's "
      "expenditure split is retrospective. For anyone selling into this ecosystem, that "
      "is the difference between a budget you can plan around and one you can only read "
      "after the fact.\"*")
    a("")
    a("**That was based on the funding pools Phase 5 had collected. It was incomplete.** "
      "There are four central incubator schemes, and at least three of them flow "
      "directly to degree institutions.")
    a("")
    a("---")
    a("")
    a("## Central incubator schemes")
    a("")
    a("| Scheme | Ministry | Max grant | Duration | Reaches institutions |")
    a("|---|---|---:|---:|---|")
    for s in G.INCUBATOR_SCHEMES:
        gm = f"**Rs {s['grant_max_crore']} cr**" if s["grant_max_crore"] else "not published"
        a(f"| **{s['scheme']}** | {s['ministry']} | {gm} | {s['duration_years']} yr | "
          f"{'**yes**' if s['reaches_institutions'] else 'no'} |")
    a("")
    for s in G.INCUBATOR_SCHEMES:
        a(f"**{s['scheme']}** — {s['eligibility']}. {s['note']}")
        a("")
    a("> **TIDE 2.0's Rs 27.2 crore ceiling is the largest incubator grant found in this "
      "research** — more than double AIM's Rs 10 crore, and it is not in any Phase 5 "
      "document.")
    a("")
    a("---")
    a("")
    a("## State policy examples")
    a("")
    a("| State | Provision | Target |")
    a("|---|---|---|")
    for s in G.STATE_POLICY_EXAMPLES:
        a(f"| **{s['state']}** | {s['provision']} | {s['target']} |")
    a("")
    a("> **Assam's is the sharpest:** a 75% grant capped at Rs 5 crore, explicitly for "
      "incubation centres **at IITs, engineering colleges and universities**. That is "
      "forward-looking capital aimed squarely at the Phase 4 G2 segment.")
    a("")
    a("---")
    a("")
    a("## What this changes")
    a("")
    a("1. **The 'no forward-looking budget signal' finding was wrong.** Institutions and "
      "incubators at them are grant recipients under at least three central schemes.")
    a("2. **The grant is tied to infrastructure and incubation, not software.** A Rs 5 "
      "crore incubator grant is not a Rs 1.2 lakh software budget. The software has to "
      "attach to a grant-funded programme, which is a different sale.")
    a("3. **`OQ-03` is still open.** Grant availability says an institution *could* spend. "
      "It says nothing about what it would spend on innovation software. Nothing here "
      "changes the price-band decision.")
    a("")
    p.write_text("\n".join(L), encoding="utf-8")
    return p


def write_g9_doc():
    p = GD / "State_Segment.md"
    L = []
    a = L.append
    a("# Segment G9 — the State Startup Nodal Department")
    a("")
    a(f"**Phase 6, added to Phase 4 segmentation. Built {GENERATED}.**")
    a("")
    a("---")
    a("")
    a(f"## {G.G9_SEGMENT['name']}")
    a("")
    a(f"> {G.G9_SEGMENT['why']}")
    a("")
    a("---")
    a("")
    a("## Why this is a different buyer, not another segment")
    a("")
    a("| | Institution (G1–G8) | State Nodal Dept (G9) |")
    a("|---|---|---|")
    a("| **Who is scored** | nobody | the union, annually, publicly |")
    a("| **What it must evidence** | IIC activity (soft quarterly score) | a startup "
      "count supporting institutional support (hard, documentary) |")
    a("| **Budget** | none documented in 8 procurement instruments | policy-linked funds |")
    a("| **Scope** | one campus | whole state |")
    a("| **Incumbent** | none found | an existing portal, already live |")
    a("| **Deal shape** | a licence | a portal replacement |")
    a("")
    a("---")
    a("")
    a("## What they need")
    a("")
    a(f"{G.G9_SEGMENT['what_they_need']}")
    a("")
    a("The first of those is the wedge: **a state cannot evidence a startup count it "
      "cannot produce.** That is structurally the same defect as the NIRF DPIIT join we "
      "measured in Phase 3A — one level up, and with a funded buyer attached.")
    a("")
    a("---")
    a("")
    a("## The forcing event")
    a("")
    a(f"- **{G.G9_SEGMENT['forcing_event']}**")
    a("")
    a("This is a **hard, annual, public** deadline — the strongest forcing event found "
      "anywhere in this project, and materially stronger than the NIRF 31 January "
      "submission that drives G3.")
    a("")
    a("---")
    a("")
    a("## The quadrant result")
    a("")
    a("| | Urgency | Revenue | Quadrant |")
    a("|---|---:|---:|---|")
    a(f"| **G9 State Nodal Dept** | {G.G9_SEGMENT['urgency']} | {G.G9_SEGMENT['revenue']} | "
      f"**{G.G9_SEGMENT['quadrant']}** |")
    a("")
    a("> **G9 is the first and only occupant of the `ACT NOW` quadrant.** Phase 4 reported "
      "that quadrant as empty and called the disagreement between urgency and revenue "
      "\"the go-to-market problem\". It is now occupied — by a segment that did not exist "
      "in the segmentation until this phase.")
    a("")
    a("---")
    a("")
    a("## The caveat that matters")
    a("")
    a(f"> {G.G9_SEGMENT['caveat']}")
    a("")
    a("---")
    a("")
    a("## What is unresolved")
    a("")
    a(f"- **Is a state portal a competitor, a data source, a partner, or an integration "
      f"target?** {G.STATE_PORTALS['strategic_question']}")
    a("- **No Emerging-tier state has any public evidence.** We do not know what those "
      "portals do, who buys them, or what they cost.")
    a("- **We have never spoken to a Nodal Officer.** Every claim on this page is "
      "documentary, and the commercial shape is inferred from the scoring rubric.")
    a("")
    a("Machine-readable: `_exports/phase6/`. Segment defined in "
      "`build/data_p4_segmentation.py` (`G9`).")
    a("")
    p.write_text("\n".join(L), encoding="utf-8")
    return p


def refresh_funnel_doc():
    """Add the parallel state track to the Phase 5 buyer determination page."""
    p = ROOT / "03_Market_Research" / "Buyer_Determination.md"
    if not p.exists():
        return None
    txt = p.read_text(encoding="utf-8")
    marker = "## Parallel buyer track"
    if marker in txt:
        return p
    L = []
    a = L.append
    a("---")
    a("")
    a("## Parallel buyer track — added by Phase 6")
    a("")
    a("This is **not** funnel stage 5. The state layer is a different buyer buying a "
      "different thing over a different scope; folding it into the funnel would breach "
      "the nested-filter rule that makes the funnel meaningful.")
    a("")
    a("| Track | Count | Basis |")
    a("|---|---:|---|")
    for t in F.PARALLEL_BUYER_TRACKS:
        a(f"| **{t['track']}** | {t['count']} | {t['source']} |")
    a("")
    for t in F.PARALLEL_BUYER_TRACKS:
        a(f"**{t['track']}**")
        a("")
        a(f"- {t['why']}")
        a(f"- **Distinct because:** {t['distinct_because']}")
        a(f"- **Phase 4 quadrant:** {t['quadrant']}")
        a(f"- **Caveat:** {t['caveat']}")
        a("")
    p.write_text(txt + "\n".join(L), encoding="utf-8")
    return p


# --------------------------------------------------------------------------
def main():
    errs, warns = G.validation()
    fe, fw = F.validation()
    for w in (warns + fw):
        print(f"  warn: {w}")
    errs = errs + fe
    if errs:
        raise SystemExit("Validation failed:\n  - " + "\n  - ".join(errs))

    n1 = write_source_map();    print(f"  csv/source_map.csv             {n1:4d} government bodies")
    n2 = write_srf_editions();  print(f"  csv/srf_editions.csv           {n2:4d} framework editions")
    n3 = write_srf_results();   print(f"  csv/srf_results_5_0.csv       {n3:4d} ranked states")
    n4 = write_srf_pillars();   print(f"  csv/srf_pillars.csv            {n4:4d} pillars")
    n5 = write_state_reports(); print(f"  csv/state_reports.csv          {n5:4d} mined + unavailable")
    n6 = write_mentorship();    print(f"  csv/mentorship_scored_on_srf   {n6:4d} corpus institutions")
    n7 = write_schemes();       print(f"  csv/incubator_schemes.csv      {n7:4d} central schemes")
    write_schema();             print("  json/gov_schema.json")

    write_readme();             print(f"  {G.FOLDER}/README.md")
    write_source_map_doc();     print(f"  {G.FOLDER}/Source_Map.md")
    write_srf_doc();            print(f"  {G.FOLDER}/State_Startup_Ranking.md")
    write_state_reports_doc();  print(f"  {G.FOLDER}/State_Reports_Mined.md")
    write_funding_doc();        print(f"  {G.FOLDER}/Funding_Schemes.md")
    write_g9_doc();             print(f"  {G.FOLDER}/State_Segment.md")
    if refresh_funnel_doc():   print("  03_Market_Research/Buyer_Determination.md  (+ parallel track)")

    p = write_raw();            print(f"  _exports/raw/                   {p.name} ({p.stat().st_size:,} bytes)")

    print()
    acc = G.access_summary()
    sc = G.score_corpus_on_srf()
    print(f"  Sources mapped: {len(G.SOURCE_MAP)} ({sum(1 for s in G.SOURCE_MAP if s['buyer_relevant'])} buyer-relevant)")
    print(f"    access: " + ", ".join(f"{k} {v}" for k, v in sorted(acc.items(), key=lambda x: -x[1])))
    print(f"    machine-readable: {sum(1 for s in G.SOURCE_MAP if s['machine_readable'])} of {len(G.SOURCE_MAP)}")
    print(f"  SRF action points: {' -> '.join(str(e['action_points']) for e in G.SRF_EDITIONS)} (marks {' -> '.join(str(e['total_marks']) for e in G.SRF_EDITIONS)})")
    print(f"  States ranked in SRF 5.0: {sum(len(v) for v in G.SRF_RESULTS_5_0.values())} | fell tiers: {len(G.tier_movement())}")
    print(f"  State reports mined: {len(G.STATE_REPORTS_MINED)} across "
          f"{G.EMERGING_TIER_COVERAGE['tiers_with_reports']} tiers | "
          f"Emerging-tier reports: {G.EMERGING_TIER_COVERAGE['emerging_tier_reports_obtained']}")
    print(f"  Corpus scoreable on SRF mentorship bands: {sc['scoreable']}/{sc['total']} ({sc['coverage_pct']}%)")
    print(f"  New segment: {G.G9_SEGMENT['id']} — {G.G9_SEGMENT['quadrant']} (the quadrant Phase 4 found empty)")
    print("  NOTE: interviews = 0. No Nodal Officer has been spoken to.")
    return 0


if __name__ == "__main__":
    sys.exit(main())