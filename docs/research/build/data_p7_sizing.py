#!/usr/bin/env python3
"""StartupHub Phase 7 - TAM / SAM / SOM, rebuilt for investor scrutiny.

todo.md PHASE 7 opens with two instructions that are methodological, not
decorative:

    "Don't calculate this yet. First collect the raw numbers."
    "Don't start with 'We want Rs 100 crore market.' Start with 'How many
     institutions can we realistically acquire?'"

This module therefore builds SOM FIRST from acquisition capacity, and only
then asks what the surrounding market looks like. The market is a consequence
of the capacity, not an aspiration.

THE PRICE PROBLEM, AND WHY THERE ARE TWO SCENARIOS:

  Phase 5 established two facts that pull in opposite directions.
    - At the Rs 1,20,000 list price, unit economics do not work: LTV/CAC = 0.21.
    - The ACV required for LTV/CAC >= 3 is Rs 10,28,000 - 8.6x the list price -
      and that is only 0.054% of a NIT's annual budget, so the BUDGET never
      objects. Only willingness to pay does.

  Neither price has any primary evidence. OQ-03 has been open since Phase 0.
  So we publish BOTH, side by side, for every single figure:

    SCENARIO A  Rs 1,20,000   the list price. Defensible. Not viable alone.
    SCENARIO B  Rs 10,28,000  the price unit economics require. Viable on paper.
                              Zero evidence anyone would pay it.

  Scenario A is the base case. Scenario B is the upside case. An investor who
  asks "which is your base case?" gets the honest answer.

THE THREE TAM METHODS, DELIBERATELY DISAGREEING:

  A single TAM number is a claim with no audit trail. So we compute three
  methods that rest on different logic, and REPORT the divergence rather than
  averaging it:

    M1 BOTTOM-UP   eligible institutions x annual contract value
    M2 TOP-DOWN    India higher-education technology market x defensible share
    M3 PENETRATION analogous-category penetration applied to our universe

  If these land within a small multiple of each other, that is evidence. If
  they do not, the divergence is the finding - and Phase 5 already showed that
  published sizing in this category is unusable (conflict C-05, 625x apart).

SIX SAM FILTERS, EACH WITH A NAMED SOURCE:

  todo.md names six: geography, institution type, digital readiness, innovation
  activity, budget, ecosystem maturity. Phase 5's first pass had data for only
  two. All six now have a source, and each records whether its survival rate is
  MEASURED or DERIVED. One of them - budget - passes 100% of institutions,
  which is itself the Phase 5 result restated as a filter.

Usage:  python build/data_p7_sizing.py
"""

import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))

import data_p5_finance as F     # noqa: E402  (budget, funnel, sizings)
import data_p36_simulation as SIM  # noqa: E402  (capacity + unit economics)
import data_p6_gov as G         # noqa: E402  (state tiers, G9)

SCHEMA_VERSION = "2.0"
BUILD_DATE = "2026-10-19"

PROVENANCE_CLASSES = ["T1_DOCUMENTED", "MODELLED", "SIMULATED", "BOUNDED", "PRIOR"]


# ==========================================================================
# 1. Price scenarios - the input everything else multiplies
# ==========================================================================

_UE_CACHE = {}


def ue_summary():
    """Unit-economics summary, cached (it is recomputed on every access)."""
    if "ue" not in _UE_CACHE:
        _UE_CACHE["ue"] = SIM.unit_economics_summary()
    return _UE_CACHE["ue"]


def required_acv_p50():
    """Median ACV at which simulated LTV/CAC first clears 3.0.

    Derived, never hardcoded, so Scenario B cannot silently drift away from the
    simulation that produced it.
    """
    return ue_summary()["required_acv_for_3x"][1]


def cac_p50():
    return (ue_summary()["cac_p25_p75"][0] + ue_summary()["cac_p25_p75"][1]) / 2


def ltv_p50():
    return (ue_summary()["ltv_p25_p75"][0] + ue_summary()["ltv_p25_p75"][1]) / 2


def prob_arr_ge(threshold):
    """P(blended ARR >= threshold) from the raw Monte Carlo draws.

    Computed from the raw array rather than read from a summary key, because the
    simulation does not publish that probability directly - and the whole point
    of Phase 3B was that a hand-estimated 18-34% had to be checked against it.
    """
    import numpy as np
    return float(np.mean(np.array(sim_run()["raw"]["arr_y3"]) >= threshold))


ONE_CRORE = 10_000_000


PRICE_SCENARIOS = {
    "A": dict(
        key="A", label="Scenario A - list price",
        acv=ue_summary()["current_list_price"],
        basis="StartupHub list price; matches the Rs 75,000-1,20,000 band used in Phase 7's first pass",
        provenance="T1_DOCUMENTED (competitor anchor Rs 75,000) + PRIOR (our own list price)",
        ltv_cac=ue_summary()["ltv_cac_p50"],
        viable=False,
        base_case=True,
        caveat=("OQ-03: no primary willingness-to-pay evidence exists. This price is what "
                "we intend to charge, not what anyone has agreed to pay."),
    ),
    "B": dict(
        key="B", label="Scenario B - required ACV",
        acv=required_acv_p50(),
        basis="Median ACV at which simulated LTV/CAC first reaches 3.0 (data_p36_simulation)",
        provenance="SIMULATED",
        ltv_cac=3.0,
        viable=True,
        base_case=False,
        caveat=("This is the price the SALES MODEL demands, not the price the market bears. "
                "Budget evidence is not willingness evidence: the required ACV is ~0.054% of "
                "a NIT's annual budget, so affordability is not the objection. Nobody has "
                "agreed to pay it."),
    ),
}

SCENARIO_ORDER = ["A", "B"]


# ==========================================================================
# 2. Raw base - every input a sizing could possibly need, with provenance
# ==========================================================================

RAW_NUMBERS = [
    # population
    dict(key="heis_registered", value=58643, unit="institutions", source="AISHE 2021-22",
         provenance="T1_DOCUMENTED", note="SUPER-BOUND. Never a market on its own."),
    dict(key="universities", value=1168, unit="institutions", source="AISHE 2021-22",
         provenance="T1_DOCUMENTED", note="685 government-managed (240 central + 445 state)"),
    dict(key="colleges", value=45473, unit="institutions", source="AISHE 2021-22",
         provenance="T1_DOCUMENTED", note="21.5% govt / 13.2% private aided / 65.3% private unaided"),
    dict(key="standalone", value=12002, unit="institutions", source="AISHE 2021-22",
         provenance="T1_DOCUMENTED",
         note="Diploma-level polytechnics, teacher training, nursing. NO innovation mandate - excluded by filter 1."),
    dict(key="iic_floor", value=14067, unit="institutions", source="AIM 2024-07-31",
         provenance="T1_DOCUMENTED", note="Conflict C-01: three official counts, 16.4% spread"),
    dict(key="iic_ceiling", value=16367, unit="institutions", source="MoE status page 2025-26",
         provenance="T1_DOCUMENTED", note=""),
    dict(key="nirf_innovation_filers", value=777, unit="institutions",
         source="NIRF India Rankings 2025, Innovation category",
         provenance="T1_DOCUMENTED", note="Observed behaviour, not registration. The hardest filter."),
    dict(key="nirf_any_applicants", value=7692, unit="institutions",
         source="NIRF India Rankings 2025", provenance="T1_DOCUMENTED", note=""),
    dict(key="state_startup_missions", value=34, unit="states and UTs",
         source="SRF 5.0 participating", provenance="T1_DOCUMENTED", note="Segment G9, sized separately."),
    dict(key="seed_funded_incubators", value=244, unit="incubators",
         source="Startup India NSD26", provenance="T1_DOCUMENTED", note="Segment G5 ceiling"),
    dict(key="sisfs_incubators", value=217, unit="incubators", source="PIB PRID=2114865",
         provenance="T1_DOCUMENTED", note=""),

    # digital readiness - the filter Phase 5 had no data for
    dict(key="digital_nkn_university", value=0.56, unit="share with NKN connectivity",
         source="AISHE 2021-22, Box 7", provenance="T1_DOCUMENTED", note="National Knowledge Network"),
    dict(key="digital_nkn_college", value=0.24, unit="share with NKN connectivity",
         source="AISHE 2021-22, Box 7", provenance="T1_DOCUMENTED",
         note="Colleges have computers (88% computer centre) but only a quarter have institutional backbone."),
    dict(key="digital_nmeict_university", value=0.41, unit="share with NMEICT connectivity",
         source="AISHE 2021-22, Box 7", provenance="T1_DOCUMENTED", note="Education-specific backbone"),
    dict(key="digital_nmeict_college", value=0.22, unit="share with NMEICT connectivity",
         source="AISHE 2021-22, Box 7", provenance="T1_DOCUMENTED", note=""),
    dict(key="digital_computer_university", value=0.93, unit="share with a computer centre",
         source="AISHE 2021-22, Box 7", provenance="T1_DOCUMENTED", note=""),
    dict(key="digital_computer_college", value=0.88, unit="share with a computer centre",
         source="AISHE 2021-22, Box 7", provenance="T1_DOCUMENTED",
         note="Colleges have the hardware in 88% of cases. The binding constraint is connectivity, not hardware."),
    dict(key="digital_iqac_university", value=0.68, unit="share with an IQAC",
         source="AISHE 2021-22, Box 7", provenance="T1_DOCUMENTED",
         note="Internal Quality Assurance Cell - the best available institutional-maturity proxy"),
    dict(key="digital_iqac_college", value=0.31, unit="share with an IQAC",
         source="AISHE 2021-22, Box 7", provenance="T1_DOCUMENTED", note=""),

    # geography
    dict(key="nirf_innovation_south", value=416, unit="institutions", source="NIRF 2025",
         provenance="T1_DOCUMENTED", note="53.6% of Innovation filers"),
    dict(key="nirf_innovation_west", value=178, unit="institutions", source="NIRF 2025",
         provenance="T1_DOCUMENTED", note="22.9%"),
    dict(key="nirf_innovation_north", value=125, unit="institutions", source="NIRF 2025",
         provenance="T1_DOCUMENTED", note="16.1%"),
    dict(key="nirf_innovation_east", value=58, unit="institutions", source="NIRF 2025",
         provenance="T1_DOCUMENTED", note="7.5%"),
    dict(key="dpiit_tier23_pct", value=0.53, unit="share of recognised startups in Tier 2/3 cities",
         source="Startup India NSD26", provenance="T1_DOCUMENTED", note="Geography proxy"),

    # budget
    dict(key="nit_budget_per_institution_cr", value=189.58, unit="INR crore",
         source="Union Budget 2025-26 / 30 NITs", provenance="T1_DOCUMENTED", note=""),
    dict(key="nit_unspent_per_institution_cr", value=53.03, unit="INR crore",
         source="Budget utilisation 67% FY 2023-24", provenance="T1_DOCUMENTED",
         note="CAPACITY evidence only. Never willingness evidence."),
    dict(key="private_college_revenue_floor_cr", value=0.4, unit="INR crore",
         source="data_p5_finance PRIVATE_COLLEGE_BOUND", provenance="BOUNDED",
         note="No public balance sheet exists for private unaided colleges."),

    # top-down inputs
    dict(key="india_he_tech_market_usd_m", value=3347.2, unit="USD million",
         source="MarketsandMarkets 2025", provenance="T3_MARKET", note="Projection, not a government figure."),
]


def raw(key):
    return next(r["value"] for r in RAW_NUMBERS if r["key"] == key)


# ==========================================================================
# 3. TAM - three methods, deliberately not reconciled
# ==========================================================================

def tam_method_bottom_up():
    """Eligible institutions x annual contract value. The spec's own formula."""
    inst_lo, inst_hi = raw("iic_floor"), raw("iic_ceiling")
    out = {}
    for s in SCENARIO_ORDER:
        acv = PRICE_SCENARIOS[s]["acv"]
        out[s] = dict(
            method="M1 bottom-up",
            formula="IIC-bearing institutions x annual contract value",
            institutions_low=inst_lo, institutions_high=inst_hi, acv=acv,
            value_low=inst_lo * acv, value_high=inst_hi * acv,
        )
    return out


def tam_method_top_down():
    """India HE technology market x a defensible share.

    The share is the whole difficulty. We bound it rather than assert it:
    0.5% is the share implied by institutions that demonstrably file innovation
    returns; 3% is the share implied if IIC-bearing institutions each bought a
    typical academic-systems line item.
    """
    mkt_usd_m = raw("india_he_tech_market_usd_m")
    # USD -> INR. Recorded as an explicit, replaceable input.
    usd_inr = 83.5
    mkt_inr = mkt_usd_m * 1e6 * usd_inr
    shares = [0.005, 0.03]
    out = {}
    for s in SCENARIO_ORDER:
        acv = PRICE_SCENARIOS[s]["acv"]
        # In Scenario B the product must carry a larger share of wallet, so the
        # share band is scaled by the price ratio, not held constant.
        scale = acv / PRICE_SCENARIOS["A"]["acv"]
        lo, hi = shares[0] * scale, shares[1] * scale
        out[s] = dict(
            method="M2 top-down",
            formula="India HE technology market (US$ 3,347.2M) x defensible share",
            market_inr=mkt_inr, usd_inr=usd_inr, acv=acv,
            share_low=lo, share_high=hi,
            value_low=mkt_inr * lo, value_high=mkt_inr * hi,
        )
    return out


def tam_method_penetration():
    """Penetration of the analogous category applied to our universe."""
    heis = raw("heis_registered")
    filers = raw("nirf_innovation_filers")
    observed_pen = filers / heis
    # If the category matures and filing behaviour diffuses to 5% / 15% of HEIs,
    # and we capture 5% / 15% of that expanding filer pool.
    pen_bands = [0.05, 0.15]
    cap_bands = [0.05, 0.15]
    out = {}
    for s in SCENARIO_ORDER:
        acv = PRICE_SCENARIOS[s]["acv"]
        out[s] = dict(
            method="M3 penetration",
            formula="HEI universe x future filing penetration x our capture x ACV",
            observed_penetration_pct=round(observed_pen * 100, 2),
            pen_low=pen_bands[0], pen_high=pen_bands[1],
            cap_low=cap_bands[0], cap_high=cap_bands[1],
            value_low=heis * pen_bands[0] * cap_bands[0] * acv,
            value_high=heis * pen_bands[1] * cap_bands[1] * acv,
        )
    return out


def tam_bundle():
    return dict(A=tam_method_bottom_up(), top_down=tam_method_top_down(),
                penetration=tam_method_penetration())


# ==========================================================================
# 4. SAM - six filters, each with a named source and a survival rate
# ==========================================================================
# `method` is MEASURED when the survival rate is a directly observed count, and
# DERIVED when it is computed from per-type shares. We never present a derived
# rate as a measured one.

SAM_FILTERS = [
    dict(
        n=1, filter="Institution type",
        question="Must be a degree-granting body with an innovation function",
        source="AISHE 2021-22 category counts",
        method="DERIVED",
        rule="universities + colleges; standalone diploma institutes excluded (no innovation mandate)",
        low_population=1168 + 45473,
        high_population=1168 + 45473,
        note="Stand-alone institutions (12,002) are polytechnics, teacher-training and "
             "nursing institutes at diploma level. They have no IIC and no NIRF Innovation "
             "obligation. Excluding them removes 20% of the registered base.",
    ),
    dict(
        n=2, filter="Digital readiness",
        question="Must have institutional internet, not just computers in a room",
        source="AISHE 2021-22 Box 7 (NKN / NMEICT connectivity)",
        method="DERIVED",
        rule="universities x NKN share + colleges x NKN share",
        low_population=int(1168 * raw("digital_nkn_university") + 45473 * raw("digital_nkn_college")),
        high_population=int(1168 * raw("digital_computer_university")
                            + 45473 * raw("digital_computer_college")),
        note=("THE FINDING. Colleges have a computer centre in 88% of cases but "
              "institutional backbone connectivity in only 24%. A cloud product needs "
              "the backbone; the upper bound assumes computer-centre presence suffices."),
    ),
    dict(
        n=3, filter="Innovation activity",
        question="Must demonstrably file an innovation return",
        source="NIRF India Rankings 2025, Innovation category",
        method="MEASURED",
        rule="count of institutions that filed the Innovation category in 2025",
        low_population=777, high_population=777,
        note=("The only filter with a directly observed count. Everything upstream of "
              "this is a proxy; this is 777 institutions that demonstrably did the work."),
    ),
    dict(
        n=4, filter="Budget",
        question="Must be able to afford the contract",
        source="Union Budget 2025-26; data_p5_finance PRIVATE_COLLEGE_BOUND",
        method="DERIVED",
        rule="Rs 1.2L is 0.0063% of a NIT budget and 0.3% of the LOW end of the bounded "
             "private college revenue band",
        low_population=777, high_population=777,
        note=("PASSES 100%. This filter excludes nobody, at either price. That is the "
              "Phase 5 result restated: affordability has never been the obstacle."),
    ),
    dict(
        n=5, filter="Ecosystem maturity",
        question="Must sit in a state whose startup ecosystem is functional",
        source="SRF 5.0 tiers",
        method="BOUNDED",
        rule="exclude Emerging-tier states (7 of 34); institution counts by state are not public",
        low_population=int(777 * 0.75), high_population=777,
        note=("BOUNDED, not measured. Seven states are Emerging-tier; their share of the "
              "777 is not published. The 25% haircut is an analyst floor, not a measurement. "
              "Note the perverse case: Emerging states may be the BEST prospects because "
              "they have the most to gain and the least incumbent."),
    ),
    dict(
        n=6, filter="Geography",
        question="Must be reachable in the initial selling motion",
        source="NIRF 2025 regional split; Startup India Tier 2/3 data",
        method="DERIVED",
        rule="exclude the East (7.5% of filers, lowest concentration and most dispersed)",
        low_population=int(777 * (1 - 58 / 777)), high_population=777,
        note=("The East holds 7.5% of Innovation filers. Excluding it costs 7.5% of the "
              "market and is a distribution decision, not an economic one - the East is "
              "where relative improvement is easiest."),
    ),
]


def sam_funnel():
    """Sequential funnel. Each stage filters the stage above it.

    Carries BOTH a low and a high residual per stage. A funnel that collapses to
    a single upper-bound number each time silently hides which filters are hard
    and which are soft - and three of these filters are genuinely uncertain.
    """
    total = raw("heis_registered")
    stages = [dict(n=0, filter="Registered higher education institutions",
                   remaining_low=total, remaining_high=total, dropped_low=0, dropped_high=0,
                   survival_low_pct=100.0, survival_high_pct=100.0,
                   cumulative_low_pct=100.0, cumulative_high_pct=100.0,
                   method="MEASURED", source="AISHE 2021-22",
                   question="How many higher education institutions exist?",
                   rule="all registered HEIs", note="Super-bound. Not a market.")]
    prev_hi = prev_lo = total
    for f in SAM_FILTERS:
        # Each filter's own bounds are additionally capped by what survived above.
        hi = min(prev_hi, f["high_population"])
        lo = min(prev_lo, f["low_population"])
        if lo > hi:
            lo = hi
        stages.append(dict(
            n=f["n"], filter=f["filter"], remaining_low=lo, remaining_high=hi,
            dropped_low=prev_lo - lo, dropped_high=prev_hi - hi,
            survival_low_pct=round(lo / prev_lo * 100, 1) if prev_lo else 0.0,
            survival_high_pct=round(hi / prev_hi * 100, 1) if prev_hi else 0.0,
            cumulative_low_pct=round(lo / total * 100, 2),
            cumulative_high_pct=round(hi / total * 100, 2),
            method=f["method"], source=f["source"],
            question=f["question"], rule=f["rule"], note=f["note"],
        ))
        prev_lo, prev_hi = lo, hi
    return stages


def sam_value():
    """Value the surviving SAM at both price scenarios."""
    stages = sam_funnel()
    lo = stages[-1]["remaining_low"]
    hi = stages[-1]["remaining_high"]
    measured = raw("nirf_innovation_filers")
    out = {}
    for s in SCENARIO_ORDER:
        acv = PRICE_SCENARIOS[s]["acv"]
        out[s] = dict(
            count_low=lo, count_high=hi, measured_count=measured, acv=acv,
            value_low=lo * acv, value_high=hi * acv,
            value_measured=measured * acv,
        )
    return out


# ==========================================================================
# 5. SOM - built from acquisition capacity, per the spec's instruction
# ==========================================================================

_RUN_CACHE = {}


def sim_run():
    """The Monte Carlo is expensive; call it once per process."""
    if "run" not in _RUN_CACHE:
        _RUN_CACHE["run"] = SIM.run()
    return _RUN_CACHE["run"]


def som_capacity():
    """How many institutions can we ACTUALLY acquire? No market share wishes."""
    lg = sim_run()["logos_y3"]
    return dict(
        method="Capacity-built. Derived from the seeded Monte Carlo, not from ambition.",
        reachable_y3=SIM.PRIORS["reachable_y3"],
        conversion=SIM.PRIORS["conversion"],
        logos_y3_p25_p75=[lg["p25"], lg["p75"]],
        paying_logos_p50=lg["p50"],
        rejected_plan=dict(y1=5, y2=15, y3="40-50",
                           why=("todo.md PHASE 7 proposed 5 / 15 / 40-50 institutions. The "
                                "year-3 figure implies ~50 paying institutions, a sales team "
                                "that does not exist, and a conversion rate nobody has "
                                "measured. We reject it and model capacity instead.")),
        ltv_cac_p50=ue_summary()["ltv_cac_p50"],
        note=("Capacity is the binding constraint, and it binds HARD: the binding limit is "
              "conversion (r=0.65), which is precisely the quantity no interview has measured."),
    )


def som_scenario(scenario="A"):
    """Paying logos and revenue by year, capacity-constrained.

    IMPORTANT: the logo band is taken from the Monte Carlo quantiles, scaled by
    the ramp. It is NOT the product of the reachable and conversion endpoints.
    The quantile of a product is not the product of the quantiles - multiplying
    150 x 2% x 0.6 and 600 x 20% x 0.6 gives 1.8-72, which is the analytic
    ENVELOPE, not the modelled range. The distribution is heavily right-skewed,
    so its p25-p75 is 19-31 while the envelope is 2-72. Both are published; only
    the envelope is used as a bound.
    """
    acv = PRICE_SCENARIOS[scenario]["acv"]
    reach = SIM.PRIORS["reachable_y3"]
    conv = SIM.PRIORS["conversion"]
    ramp = {1: 0.10, 2: 0.32, 3: 0.60, 4: 0.80, 5: 1.00}
    lg = sim_run()["logos_y3"]
    years = []
    for y in range(1, 6):
        scale = ramp[y] / ramp[3]
        lo_logos = lg["p25"] * scale
        hi_logos = lg["p75"] * scale
        env_lo = reach[0] * conv[0] * ramp[y]
        env_hi = reach[2] * conv[2] * ramp[y]
        years.append(dict(
            year=y,
            logos_low=round(lo_logos, 1), logos_high=round(hi_logos, 1),
            envelope_low=round(env_lo, 1), envelope_high=round(env_hi, 1),
            arr_low=round(lo_logos * acv), arr_high=round(hi_logos * acv),
            ramp_pct=ramp[y],
        ))
    return dict(scenario=scenario, acv=acv, years=years,
                basis="Monte Carlo p25-p75 logos, ramp-scaled",
                arr_year3_low=years[2]["arr_low"], arr_year3_high=years[2]["arr_high"])


# ==========================================================================
# 6. State layer - sum of the parts, sized separately
# ==========================================================================
# Segment G9 is a different deal shape: 34 buyers, portal contracts, a longer
# and politically different sale. Mixing it into the institutional SOM would
# corrupt both.

STATE_SOTP = dict(
    buyers=raw("state_startup_missions"),
    deal_shape="portal replacement / platform contract",
    acv_low=2_500_000, acv_high=8_000_000,
    acv_basis=("Analyst range. No state portal procurement value is published anywhere. "
               "Anchored on the observation that a state portal must serve a whole-state "
               "ecosystem and is a scored national deliverable - but this is PRIOR, not "
               "evidence."),
    provenance="PRIOR",
    attainable_years=(3, 8),
    attainable_basis=("Zero to eight of 34 over three years. A state portal decision is a "
                      "ministerial one; it is not a founder-led sales motion and it does not "
                      "compound the way institutional licences do."),
    caveat=("Sized separately and on the PRIOR tier. The whole point of segment G9 is that "
            "it is the only ACT NOW quadrant - but ACT NOW means the forcing event is strong, "
            "not that the sale is easy. Treat this as an option, not a plan."),
    forcing_event="SRF evaluation cycle; results published each January",
)


def state_sotp_value():
    lo = STATE_SOTP["attainable_years"][0] * STATE_SOTP["acv_low"]
    hi = STATE_SOTP["attainable_years"][1] * STATE_SOTP["acv_high"]
    return dict(arr_low=lo, arr_high=hi)


# ==========================================================================
# 7. Adoption and penetration - the growth argument
# ==========================================================================

ADOPTION_CURVES = [
    dict(series="NIRF unique institutions", start_year=2016, start=2426,
         end_year=2025, end=7692, provenance="T1_DOCUMENTED",
         meaning="The number of institutions voluntarily entering a ranking regime."),
    dict(series="NIRF total applications", start_year=2016, start=3565,
         end_year=2025, end=14163, provenance="T1_DOCUMENTED",
         meaning="Applications across categories - shows multi-category filing."),
    dict(series="IICs established", start_year=2022, start=6400,
         end_year=2026, end=16367, provenance="T1_DOCUMENTED",
         note="Conflict C-01: the start figure is an earlier official count, the end is the latest."),
    dict(series="SRF participating states", start_year=2018, start=30,
         end_year=2026, end=34, provenance="T1_DOCUMENTED",
         meaning="State participation is effectively saturated - the only curve that is."),
]


def adoption_stats():
    out = []
    for c in ADOPTION_CURVES:
        yrs = c["end_year"] - c["start_year"]
        out.append(dict(
            series=c["series"], years=yrs, start=c["start"], end=c["end"],
            multiple=round(c["end"] / c["start"], 2),
            cagr_pct=round(((c["end"] / c["start"]) ** (1 / yrs) - 1) * 100, 1),
            provenance=c["provenance"], meaning=c.get("meaning", c.get("note", "")),
        ))
    return out


PENETRATION = dict(
    heis=raw("heis_registered"),
    innovation_filers=raw("nirf_innovation_filers"),
    innovation_penetration_pct=round(raw("nirf_innovation_filers") / raw("heis_registered") * 100, 2),
    any_category_penetration_pct=round(raw("nirf_any_applicants") / raw("heis_registered") * 100, 1),
    iic_penetration_floor_pct=round(raw("iic_floor") / raw("heis_registered") * 100, 1),
    iic_penetration_ceiling_pct=round(raw("iic_ceiling") / raw("heis_registered") * 100, 1),
    interpretation=("Only 1.32% of registered higher education institutions file a NIRF "
                    "Innovation return, while 24-28% hold an IIC. The gap between those two "
                    "numbers - roughly 13,000 institutions that are mandated to report and "
                    "do not - is the structural headroom. It is also the population most "
                    "likely to be unready, which is why digital readiness (filter 2) and "
                    "innovation activity (filter 3) remove most of them."),
)


# ==========================================================================
# 8. Triangulation - do the methods agree?
# ==========================================================================

def reachable_market():
    """The reachable slice: how many of those institutions could we actually win.

    A TAM built as "eligible institutions x price" implicitly assumes we win
    every one of them. That is a ceiling, not a market. This function applies an
    explicit capture band to the TAM population so the deck can say "even if we
    are excellent, here is the top of what is winnable" without pretending to
    know the share.
    """
    heis = raw("heis_registered")
    out = {}
    for s in SCENARIO_ORDER:
        acv = PRICE_SCENARIOS[s]["acv"]
        out[s] = dict(
            formula="HEI universe x reachable adoption x our capture x ACV", acv=acv,
            adoption_low=0.05, adoption_high=0.15,
            capture_low=0.05, capture_high=0.15,
            institutions_low=heis * 0.05 * 0.05,
            institutions_high=heis * 0.15 * 0.15,
            value_low=heis * 0.05 * 0.05 * acv,
            value_high=heis * 0.15 * 0.15 * acv,
        )
    return out


def triangulation():
    """Compare methods WITHIN class. Ceilings must not be averaged with reachables.

    Two of the three methods are ceilings (what would exist if we won everyone).
    One is a reachable estimate. Averaging a ceiling with a reachable produces a
    number that means nothing, so we report them separately and then report the
    ceiling-to-reachable gap, which is the honest headline.
    """
    rows = []
    for s in SCENARIO_ORDER:
        bu = tam_method_bottom_up()[s]
        td = tam_method_top_down()[s]
        rm = reachable_market()[s]
        ceil_lo = min(bu["value_low"], td["value_low"])
        ceil_hi = max(bu["value_high"], td["value_high"])
        ceil_span = ceil_hi / max(1.0, ceil_lo)
        # "Agree" means the two independent ceiling methods land within one order
        # of magnitude of each other. Anything tighter than a decade is not a
        # meaningful test for market sizing; anything looser means we have no
        # idea and should say so.
        rows.append(dict(
            scenario=s,
            m1_ceiling=f"{bu['value_low']/1e7:.1f}-{bu['value_high']/1e7:.1f} cr",
            m2_ceiling=f"{td['value_low']/1e7:.1f}-{td['value_high']/1e7:.1f} cr",
            reachable=f"{rm['value_low']/1e7:.1f}-{rm['value_high']/1e7:.1f} cr",
            ceiling_low=ceil_lo / 1e7, ceiling_high=ceil_hi / 1e7,
            reachable_low=rm["value_low"] / 1e7, reachable_high=rm["value_high"] / 1e7,
            ceiling_span_multiple=round(ceil_span, 1),
            ceilings_agree=ceil_span <= 10.0,
            ceiling_to_reachable_gap_x=round(ceil_hi / max(1.0, rm["value_high"]), 1),
        ))
    return rows


TRIANGULATION_VERDICT = dict(
    finding=("The ceiling methods and the reachable method are NOT supposed to agree, and "
             "we refuse to average them. Their gap is the single most useful number here."),
    rule=("M1 and M2 are ceilings: they state what would exist if we won every eligible "
          "institution. The reachable method applies an explicit adoption-and-capture band. "
          "Report both. The ratio between them is the growth headroom an investor is buying."),
    precedent=("Phase 5 recorded conflict C-05: two research houses size the SAME market "
               "625x apart (US$499M vs US$0.8M). Published sizing in this category is "
               "demonstrably unusable. That is why M1 is built bottom-up from institution "
               "counts and budget documents rather than from a report."),
    investor_note=("A TAM is a ceiling, not a forecast. The number to underwrite is SOM, which "
                   "is capacity-built and roughly two orders of magnitude below TAM. Anyone "
                   "showing one TAM number without its method is asking you to trust a method "
                   "they have not shown you. Ours are all three, and one of them is the bad news."),
)


# ==========================================================================
# 9. Falsification - pre-committed, so the sizing cannot be quietly re-tuned
# ==========================================================================

FALSIFIERS = [
    dict(id="F-01", claim="SAM contains ~777 institutions",
         what_would_break_it="NIRF Innovation filers turn out to file for a compliance "
                             "minimum with no reporting burden worth paying to remove",
         threshold="If 3 of 6 interviewed filers describe the return as near-zero-effort, "
                   "SAM collapses toward the IIC registration count rather than the filer count",
         observable="Phase 3B interviews"),
    dict(id="F-02", claim="Digital readiness removes most colleges",
         what_would_break_it="Cloud delivery makes institutional backbone irrelevant",
         threshold="If on-premise demand falls below 20% (H-10 prior lower bound) then "
                   "the 24% NKN figure stops being a constraint and SAM roughly doubles",
         observable="OQ-30 / H-10; currently 0% of institutions observed"),
    dict(id="F-03", claim="Ecosystem maturity removes ~25% of SAM",
         what_would_break_it="Emerging-tier states turn out to be the best prospects "
                             "(most to gain, least incumbent)",
         threshold="If Emerging-tier states are easier to convert than established ones, "
                   "the haircut is removed and SAM rises to the full 777",
         observable="No Emerging-tier state report obtainable (Phase 6) - untestable today"),
    dict(id="F-04", claim="SOM is capacity-constrained, not demand-constrained",
         what_would_break_it="Conversion turns out much higher than the 2-20% prior",
         threshold="Conversion above 30% would make capacity, not conversion, the binding "
                   "constraint and would justify hiring ahead of revenue",
         observable="OQ-03 / first 12 institutions"),
    dict(id="F-05", claim="Scenario B is a real price",
         what_would_break_it="it is not - every rupee in Scenario B is aspirational",
         threshold="Any single signed contract at or above Rs 5 lakh per year",
         observable="OQ-03, open since Phase 0"),
    dict(id="F-06", claim="The state layer is an option worth pursuing",
         what_would_break_it="State portals are politically untouchable or already "
                             "outsourced to a consortium",
         threshold="One state nodal officer describing the portal as fixed or out of scope",
         observable="No Nodal Officer has been spoken to"),
]


# ==========================================================================
# 10. Validation
# ==========================================================================

def validation():
    errs, warns = [], []

    if set(PRICE_SCENARIOS) != set(SCENARIO_ORDER):
        errs.append("price scenario keys and SCENARIO_ORDER disagree")
    for k, p in PRICE_SCENARIOS.items():
        for field in ("label", "acv", "basis", "provenance", "caveat"):
            if not p.get(field):
                errs.append(f"price scenario {k} missing {field}")
        if p["acv"] <= 0:
            errs.append(f"price scenario {k} has a non-positive ACV")

    base = [p for p in PRICE_SCENARIOS.values() if p["base_case"]]
    if len(base) != 1:
        errs.append(f"exactly one price scenario may be the base case; found {len(base)}")

    if len(SAM_FILTERS) != 6:
        errs.append(f"{len(SAM_FILTERS)} SAM filters; the spec names six")
    named = ["geography", "institution type", "digital readiness", "innovation activity",
             "budget", "ecosystem maturity"]
    for n in named:
        if n not in " ".join(f["filter"].lower() for f in SAM_FILTERS):
            errs.append(f"spec-required SAM filter missing: {n}")

    stages = sam_funnel()
    for i in range(1, len(stages)):
        if stages[i]["remaining_high"] > stages[i - 1]["remaining_high"]:
            errs.append(f"SAM funnel is not monotonically decreasing at filter {stages[i]['n']}")
        if stages[i]["remaining_low"] > stages[i]["remaining_high"]:
            errs.append(f"SAM filter {stages[i]['n']} has an inverted band")
        if stages[i]["dropped_low"] < 0 or stages[i]["dropped_high"] < 0:
            errs.append(f"negative drop at filter {stages[i]['n']}")
    if stages[-1]["remaining_high"] <= 0:
        errs.append("SAM funnel eliminates every institution")
    if stages[-1]["remaining_low"] > raw("nirf_innovation_filers"):
        errs.append("SAM lower bound exceeds the measured filer count; the funnel is not applying filter 3")

    # Scenario A must NOT clear the viability bar; that is Phase 5's finding.
    if PRICE_SCENARIOS["A"]["viable"]:
        errs.append("Scenario A is marked viable; Phase 5 proved LTV/CAC = 0.21")
    if not PRICE_SCENARIOS["B"]["viable"]:
        errs.append("Scenario B must be marked viable or the price split is meaningless")

    tri = triangulation()
    for t in tri:
        if t["ceiling_high"] <= t["ceiling_low"]:
            errs.append(f"scenario {t['scenario']} ceiling envelope is inverted")
        if t["reachable_high"] > t["ceiling_high"]:
            errs.append(f"scenario {t['scenario']} reachable exceeds the ceiling; capture band is inverted")
        if t["reachable_low"] <= 0:
            errs.append(f"scenario {t['scenario']} reachable lower bound collapsed to zero")

    # The modelled SOM band must sit INSIDE the analytic envelope. If it does
    # not, one of the two is stale - this is the check that catches the
    # quantile-vs-product-of-quantiles mistake.
    for s in SCENARIO_ORDER:
        ys = som_scenario(s)["years"][2]
        lg = sim_run()["logos_y3"]
        if not (ys["logos_low"] >= lg["p5"] - 1e-9 and ys["logos_high"] <= lg["p95"] + 1e-9):
            errs.append(f"scenario {s} SOM band is outside the simulated logo distribution")
        if ys["envelope_low"] > ys["logos_low"] + 1e-9 or ys["envelope_high"] < ys["logos_high"] - 1e-9:
            errs.append(f"scenario {s} SOM envelope does not contain the modelled band")

    if len(FALSIFIERS) < 5:
        errs.append("a sizing without pre-committed falsifiers can be quietly re-tuned")

    if not STATE_SOTP["caveat"] or STATE_SOTP["provenance"] != "PRIOR":
        errs.append("the state SOTP must stay PRIOR and carry its caveat")

    blob = str(RAW_NUMBERS) + str(PRICE_SCENARIOS) + str(SAM_FILTERS) + str(FALSIFIERS)
    for bad in ["respondents said", "interviewees reported", "they told us", "interviews show"]:
        if bad in blob.lower():
            errs.append(f"fabricated-observation phrasing: '{bad}'")

    # Every raw number needs a source and a provenance class.
    for r in RAW_NUMBERS:
        for field in ("key", "value", "unit", "source", "provenance"):
            if r.get(field) in (None, ""):
                errs.append(f"raw number '{r.get('key','?')}' missing {field}")

    return errs, warns


def summary():
    stages = sam_funnel()
    sv = sam_value()
    tri = triangulation()
    return dict(
        schema_version=SCHEMA_VERSION, build_date=BUILD_DATE,
        scenarios=len(PRICE_SCENARIOS),
        acv_a=PRICE_SCENARIOS["A"]["acv"], acv_b=PRICE_SCENARIOS["B"]["acv"],
        tam_m1_a=f"{tam_method_bottom_up()['A']['value_low']/1e7:.1f}-"
                 f"{tam_method_bottom_up()['A']['value_high']/1e7:.1f} cr",
        tam_m1_b=f"{tam_method_bottom_up()['B']['value_low']/1e7:.1f}-"
                 f"{tam_method_bottom_up()['B']['value_high']/1e7:.1f} cr",
        reachable_a=f"{reachable_market()['A']['value_low']/1e7:.1f}-"
                    f"{reachable_market()['A']['value_high']/1e7:.1f} cr",
        reachable_b=f"{reachable_market()['B']['value_low']/1e7:.1f}-"
                    f"{reachable_market()['B']['value_high']/1e7:.1f} cr",
        ceiling_to_reachable_gap_x=[t["ceiling_to_reachable_gap_x"] for t in tri],
        sam_final_count_lo=stages[-1]["remaining_low"],
        sam_final_count_hi=stages[-1]["remaining_high"],
        sam_pct_of_registered=[stages[-1]["cumulative_low_pct"], stages[-1]["cumulative_high_pct"]],
        sam_measured_crosscheck=sv["A"]["measured_count"],
        sam_value_a_lo_cr=sv["A"]["value_low"] / 1e7,
        sam_value_a_hi_cr=sv["A"]["value_high"] / 1e7,
        sam_value_b_lo_cr=sv["B"]["value_low"] / 1e7,
        sam_value_b_hi_cr=sv["B"]["value_high"] / 1e7,
        som_logos_y3=[sim_run()["logos_y3"]["p25"], sim_run()["logos_y3"]["p75"]],
        state_sotp_arr=[state_sotp_value()["arr_low"] / 1e7, state_sotp_value()["arr_high"] / 1e7],
        penetration_pct=PENETRATION["innovation_penetration_pct"],
        falsifiers=len(FALSIFIERS),
        interviews_conducted=0,
    )


if __name__ == "__main__":
    import json
    print(json.dumps(summary(), indent=2, ensure_ascii=False))
    print()
    print("SAM FUNNEL (six filters, sequential, low-high band)")
    print(f"   {'#':<3}{'filter':<26}{'remaining':>18}{'survival':>16}{'method':>10}")
    for s in sam_funnel():
        print(f"   {s['n']:<3}{s['filter']:<26}"
              f"{s['remaining_low']:>8,} - {s['remaining_high']:>7,}"
              f"{s['survival_low_pct']:>7.1f}-{s['survival_high_pct']:>6.1f}%"
              f"{s['method']:>10}")
    print()
    print("TRIANGULATION (ceilings vs reachable, never averaged)")
    for t in triangulation():
        print(f"   Scenario {t['scenario']}:")
        print(f"      M1 ceiling  {t['m1_ceiling']:<18} M2 ceiling {t['m2_ceiling']:<18}")
        print(f"      Reachable   {t['reachable']:<18} "
              f"ceiling->reachable gap {t['ceiling_to_reachable_gap_x']}x")
        print(f"      ceilings within one decade: {t['ceilings_agree']} "
              f"(span {t['ceiling_span_multiple']}x)")
    print()
    print("ADOPTION")
    for a in adoption_stats():
        print(f"   {a['series']:<30}{a['start']:>7,} -> {a['end']:>7,}  "
              f"{a['multiple']:>5.2f}x  CAGR {a['cagr_pct']:>5.1f}%")
    print()
    e, w = validation()
    print("errors:", e or "none")
    print("warns :", w or "none")