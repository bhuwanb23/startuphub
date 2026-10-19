#!/usr/bin/env python3
"""StartupHub - seeded Monte Carlo over the stated priors.

This produces the SIMULATED provenance cells in data_p35_estimates. It is a real
simulation with a fixed seed, so every number it produces is exactly
reproducible and can be recomputed by anyone.

WHAT IT IS:
  A distribution over plausible worlds, given assumptions we have written down.
  NOT a measurement. NOT a forecast. It answers: "given what we believe might be
  true, how wide is the answer, and which of our unknowns is widening it most?"

WHY IT MATTERS MORE THAN A POINT ESTIMATE:
  Three of our unknowns dominate everything else - willingness to pay, price
  realisation (discounting/free pilots), and conversion. This module quantifies
  each one's contribution to the spread, so the next hour of research goes
  where it shrinks the uncertainty fastest.

SEEDING:
  SEED = 20261019. Same seed, same numbers, every run. The build is
  deterministic; nothing here is a random walk across rebuilds.

TRIANGULAR DISTRIBUTIONS:
  Every input is a triangular (min, mode, max) prior. Triangular because we
  genuinely hold three points of view on each - a floor, a considered middle,
  and a ceiling - and inventing a normal curve would imply a confidence we do
  not have about our own uncertainty.

INTERPRETATION:
  Percentiles here are percentiles OF OUR PRIORS. P50 is not "the likely
  answer"; it is "the median world given what we currently believe". Read it as
  a description of our uncertainty, not of the market.

Usage:  python build/data_p36_simulation.py
"""

import math
import random

SCHEMA_VERSION = "1.0"
BUILD_DATE = "2026-10-19"

SEED = 20261019
TRIALS = 50_000

# ==========================================================================
# Priors - each is (min, mode, max) and must be justifiable
# ==========================================================================

PRIORS = dict(
    # OQ-03 / H-07. List price is fixed at Rs 120,000; this is what we actually
    # collect per institution per year after discounting, pilots and partial-year.
    acv_realised=(35_000, 95_000, 180_000),
    # H-05 / OQ-26. Probability a CONTACTED institution becomes a paying customer.
    # Committee-gated academic sales run low: Phase 2 found 0 of 12 Class A IIC
    # seats hold documented budget authority.
    conversion=(0.02, 0.06, 0.20),
    # Institutions a founder-led motion can actually ENGAGE over 3 years - not
    # close, engage. Bounded by the 777-institution SAM floor.
    reachable_y3=(150, 300, 600),
    # Probability a customer renews at year 2. No published rate exists for any
    # incumbent in this category, so this is the widest honest prior we can hold.
    renewal=(0.40, 0.65, 0.90),
    # Months from first contact to signature in a committee-gated academic sale.
    sales_cycle_months=(3, 6, 14),
    # Probability the institution asks for on-premise deployment, which roughly
    # doubles delivery cost and is the single largest cost driver (H-10).
    on_premise_demand=(0.20, 0.55, 0.85),
)


def triangular(rng, lo, mode, hi):
    """Standard triangular sampling, guarded against a mis-ordered prior."""
    if not (lo <= mode <= hi):
        lo, mode, hi = min(lo, mode, hi), sorted((lo, mode, hi))[1], max(lo, mode, hi)
    return rng.triangular(lo, mode, hi)


def pct(xs, p):
    if not xs:
        return None
    k = (len(xs) - 1) * (p / 100.0)
    f = math.floor(k)
    c = math.ceil(k)
    if f == c:
        return xs[int(k)]
    return xs[f] + (xs[c] - xs[f]) * (k - f)


def summarise(name, xs, unit=""):
    xs = sorted(xs)
    return dict(
        metric=name, unit=unit,
        p5=pct(xs, 5), p25=pct(xs, 25), p50=pct(xs, 50),
        p75=pct(xs, 75), p95=pct(xs, 95),
        mean=sum(xs) / len(xs), min=xs[0], max=xs[-1],
    )


def run():
    rng = random.Random(SEED)

    acv, conv, cap, ren, cycle, onprem = [], [], [], [], [], []
    arr_m24, arr_y3, logos, arr_logo, logos_y3 = [], [], [], [], []

    for _ in range(TRIALS):
        a = triangular(rng, *PRIORS["acv_realised"])
        c = triangular(rng, *PRIORS["conversion"])
        k = triangular(rng, *PRIORS["reachable_y3"])
        r = triangular(rng, *PRIORS["renewal"])
        m = triangular(rng, *PRIORS["sales_cycle_months"])
        o = triangular(rng, *PRIORS["on_premise_demand"])

        acv.append(a); conv.append(c); cap.append(k); ren.append(r)
        cycle.append(m); onprem.append(o)

        # Paying logos by year 3 = institutions engaged x conversion.
        paying = k * c
        logos_y3.append(paying)
        arr_y3.append(paying * a)

        # Month-24 ARR: logos ramp linearly over the sales cycle, so at month 24
        # roughly (24 - cycle/2) / 24 of the year-3 cohort is live.
        ramp = max(0.0, (24.0 - m / 2.0) / 24.0)
        arr_m24.append(paying * ramp * a)

        # ARR per logo including year-2 renewal, for LTV-shape intuition only.
        arr_logo.append(a * (1 + r))

    return dict(
        acv_realised=summarise("Realised ACV per institution per year", acv, "INR"),
        conversion=summarise("Probability an engaged institution converts", conv, "probability"),
        capacity=summarise("Institutions engageable by year 3", cap, "institutions"),
        renewal=summarise("Year-2 renewal rate", ren, "probability"),
        sales_cycle=summarise("Sales cycle length", cycle, "months"),
        on_premise=summarise("Probability on-premise is demanded", onprem, "probability"),
        logos_y3=summarise("Paying logos at year 3", logos_y3, "institutions"),
        arr_month24=summarise("Blended ARR at month 24", arr_m24, "INR"),
        arr_year3=summarise("Blended ARR at year 3", arr_y3, "INR"),
        arr_per_logo=summarise("Year-1 ARR per logo including renewal", arr_logo, "INR"),
        raw=dict(acv=acv, conv=conv, cap=cap, ren=ren, cycle=cycle,
                 onprem=onprem, arr_m24=arr_m24, arr_y3=arr_y3, logos_y3=logos_y3),
    )


def sensitivity(res):
    """One-at-a-time elasticity: which unknown widens year-3 ARR the most?

    Method: correlation between each input and the output. Cheaper to explain,
    honest, and adequate because the priors are independent by construction.
    A correlation of ~0 means that input does not currently explain any of the
    outcome spread, which is itself actionable - it means we need not measure it.
    """
    raw = res["raw"]
    out = raw["arr_y3"]

    def corr(a, b):
        n = len(a)
        ma, mb = sum(a) / n, sum(b) / n
        num = sum((x - ma) * (y - mb) for x, y in zip(a, b))
        da = math.sqrt(sum((x - ma) ** 2 for x in a))
        db = math.sqrt(sum((y - mb) ** 2 for y in b))
        return 0.0 if da == 0 or db == 0 else num / (da * db)

    pairs = [("acv_realised", raw["acv"]), ("conversion", raw["conv"]),
             ("reachable_y3", raw["cap"]), ("renewal", raw["ren"]),
             ("on_premise_demand", raw["onprem"]), ("sales_cycle_months", raw["cycle"])]
    rows = [dict(input=k, correlation_with_year3_arr=round(corr(v, out), 4),
                 priority=0) for k, v in pairs]
    for i, r in enumerate(sorted(rows, key=lambda x: -abs(x["correlation_with_year3_arr"])), 1):
        r["priority"] = i
    return sorted(rows, key=lambda x: x["priority"])


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


def cr(n):
    return f"Rs {n/1e7:.2f} crore" if n < 1e9 else f"Rs {n/1e7:.1f} crore"


def validation():
    errs = []
    if not isinstance(SEED, int):
        errs.append("SEED must be an int so the simulation is deterministic")
    if TRIALS < 10_000:
        errs.append(f"TRIALS={TRIALS} too low for stable percentiles")
    for k, v in PRIORS.items():
        if len(v) != 3:
            errs.append(f"prior '{k}' must be a (min, mode, max) triple")
        elif not v[0] <= v[1] <= v[2]:
            errs.append(f"prior '{k}' is not ordered: {v}")

    # Determinism check - the whole point of the seed.
    a = run()
    b = run()
    if a["arr_year3"]["p50"] != b["arr_year3"]["p50"]:
        errs.append("simulation is not deterministic; the seed is not working")
    return errs, []


def summary():
    r = run()
    return dict(
        schema_version=SCHEMA_VERSION, build_date=BUILD_DATE,
        seed=SEED, trials=TRIALS,
        provenance="SIMULATED - a distribution over our priors, not a measurement",
        acv_realised_p10_p90=[pct(sorted(r["raw"]["acv"]), 10), pct(sorted(r["raw"]["acv"]), 90)],
        arr_month24_p25_p75=[r["arr_month24"]["p25"], r["arr_month24"]["p75"]],
        arr_month24_display=f"{cr(r['arr_month24']['p25'])} - {cr(r['arr_month24']['p75'])} (P25-P75)",
        arr_year3_display=f"{cr(r['arr_year3']['p25'])} - {cr(r['arr_year3']['p75'])} (P25-P75)",
        p_arr_1cr=round(sum(1 for x in r["raw"]["arr_y3"] if x >= 1e7) / TRIALS * 100, 1),
        top_sensitivity=sensitivity(r)[:3],
        interviews_conducted=0,
    )


if __name__ == "__main__":
    import json
    print(json.dumps(summary(), indent=2, ensure_ascii=False))
    print()
    print("DETERMINISM + SENSITIVITY")
    e, _ = validation()
    print("  errors:", e or "none")
    r = run()
    for row in sensitivity(r):
        print(f"   {row['priority']}. {row['input']:<22} r={row['correlation_with_year3_arr']:+.3f}")
    print()
    print("KEY OUTPUTS (P25 - P75)")
    for k in ("arr_month24", "arr_year3", "logos_y3"):
        v = r[k]
        print(f"   {v['metric']:<44} {inr(v['p25'])} - {inr(v['p75'])}")
    v = r["acv_realised"]
    print(f"   {v['metric']:<44} {inr(v['p25'])} - {inr(v['p75'])}")
    print(f"   P(ARR >= Rs 1 crore by year 3) = {summary()['p_arr_1cr']}%")