#!/usr/bin/env python3
"""StartupHub Phase 2 - procurement authority thresholds.

Phase 2's structural finding: in Indian higher education the approval chain for a
software purchase is a function of PRICE, and StartupHub's price band straddles
several distinct ladders in the same institution.

This module normalises seven published institutional procurement instruments so
they can be compared. It deliberately does NOT average them into a "typical"
Indian rule, because no national HEI procurement standard was found - the spread
is itself the finding (see OQ-25).

Segments follow todo.md's Phase 2 segment list:
    CENTRAL   - NITs, IITs and other centrally funded / deemed-to-be-government
    PRIVATE   - private deemed universities and private autonomous colleges

Money is stored as plain integers (rupees) so nothing has to parse a symbol or a
lakh abbreviation. `display_inr()` formats for humans.
"""

# --------------------------------------------------------------------------
# Authority ladders. Each entry is one published instrument.
# `authority` is the office; `max_inr` is the ceiling it may approve without
# higher escalation; `source` is a key from data_p2_roles.SOURCES.
# --------------------------------------------------------------------------
CENTRAL = [
    dict(institution="NIT Warangal", segment="CENTRAL", source="P2-S03",
         doc="Manual for Procurement of Goods & Services, 2025",
         authority="Director", max_inr=None, scope="All cases (no ceiling stated)",
         note="Widest single authority measured. Also chairs the Major Purchase Committee in absence of its Chairman."),
    dict(institution="NIT Warangal", segment="CENTRAL", source="P2-S03",
         doc="Manual for Procurement of Goods & Services, 2025",
         authority="Deputy Director / Registrar / Dean (R&D)", max_inr=1000000,
         scope="Non-consumable store", note="Software is treated as non-consumable in this manual."),
    dict(institution="NIT Warangal", segment="CENTRAL", source="P2-S03",
         doc="Manual for Procurement of Goods & Services, 2025",
         authority="Deputy Director / Registrar / Dean (R&D)", max_inr=500000,
         scope="Consumable store", note=""),
    dict(institution="NIT Warangal", segment="CENTRAL", source="P2-S03",
         doc="Manual for Procurement of Goods & Services, 2025",
         authority="Head of Department", max_inr=250000,
         scope="Non-consumable store", note="Entry point for departmental purchase."),
    dict(institution="NIT Warangal", segment="CENTRAL", source="P2-S03",
         doc="Manual for Procurement of Goods & Services, 2025",
         authority="Head of Department", max_inr=100000,
         scope="Consumable store", note=""),
    dict(institution="NIT Warangal", segment="CENTRAL", source="P2-S03",
         doc="Manual for Procurement of Goods & Services, 2025",
         authority="Major Purchase Committee", max_inr=3000000,
         scope="All goods and services above this value", note="7+ member committee advising the Director."),
    dict(institution="NIT Warangal", segment="CENTRAL", source="P2-S03",
         doc="Manual for Procurement of Goods & Services, 2025",
         authority="Local Purchase Committee", max_inr=1000000,
         scope="Above Rs 1,00,000 and up to Rs 10,00,000",
         note=("*** GE_M EXEMPTION *** The manual states LPC applies 'only on each occasion which "
               "are not available in GeM portal'. A purchase routed through the Government "
               "e-Marketplace bypasses the local purchase committee entirely. This is the single "
               "most commercially important procedural fact found in Phase 2.")),

    dict(institution="IIT Palakkad", segment="CENTRAL", source="P2-S02",
         doc="Purchase Procedure 2025",
         authority="Local Purchase Committee (3 members)", max_inr=1000000,
         scope="Rs 1,00,001 to Rs 10,00,000", note="Members nominated by the indenter."),
    dict(institution="IIT Palakkad", segment="CENTRAL", source="P2-S02",
         doc="Purchase Procedure 2025",
         authority="Computer & Software Purchase Committee (6 members)", max_inr=None,
         scope="Computers and peripherals above Rs 2,50,000",
         note="*** SOFTWARE-SPECIFIC COMMITTEE. Directly triggered by a software purchase above Rs 2.5 lakh. ***"),
    dict(institution="IIT Palakkad", segment="CENTRAL", source="P2-S02",
         doc="Purchase Procedure 2025",
         authority="Stores & Purchase Committee (7 members)", max_inr=None,
         scope="Above Rs 5,00,000 under the Institute Grant",
         note="Acts on behalf of the Director."),
    dict(institution="IIT Palakkad", segment="CENTRAL", source="P2-S02",
         doc="Purchase Procedure 2025",
         authority="Exclusive Purchase Committee", max_inr=None, scope="Above Rs 25,00,000",
         note=("Composition: Chairperson + Indenter (Convenor) + 2-3 faculty + Purchase Nominee + "
               "Finance Nominee. The IIC Convener, as indenter, gets a formal seat here.")),
    dict(institution="IIT Palakkad", segment="CENTRAL", source="P2-S02",
         doc="Purchase Procedure 2025",
         authority="Audit", max_inr=None, scope="Above Rs 10,00,000",
         note="PO/WO is issued only upon receipt of audit approval."),

    dict(institution="NIT Karnataka", segment="CENTRAL", source="P2-S04",
         doc="Manual of Purchase of Goods",
         authority="Faculty-in-charge of Purchase (buyer)", max_inr=None,
         scope="Initiates the process at any value", note="The indenter's signature is on DOC-1."),
    dict(institution="NIT Karnataka", segment="CENTRAL", source="P2-S04",
         doc="Manual of Purchase of Goods",
         authority="Head of Department", max_inr=100000,
         scope="Cost up to Rs 1,00,000", note="Administrative approval threshold."),
    dict(institution="NIT Karnataka", segment="CENTRAL", source="P2-S04",
         doc="Manual of Purchase of Goods",
         authority="Dean (P&D)", max_inr=300000, scope="Cost up to Rs 3,00,000",
         note="Administrative approval threshold."),
    dict(institution="NIT Karnataka", segment="CENTRAL", source="P2-S04",
         doc="Manual of Purchase of Goods",
         authority="Limited tender", max_inr=2500000,
         scope="Cost above Rs 1,00,000", note="Tender regime changes at Rs 1 lakh."),
    dict(institution="NIT Karnataka", segment="CENTRAL", source="P2-S04",
         doc="Manual of Purchase of Goods",
         authority="Open tender", max_inr=None, scope="Cost above Rs 25,00,000",
         note="Newspaper advertisement via Dean (P&D)."),

    dict(institution="Central Rajasthan State University", segment="CENTRAL", source="P2-S05",
         doc="Purchase Rules 2020",
         authority="Finance Officer / XEN / Asstt. Registrar / System Analyst", max_inr=15000,
         scope="Administrative and financial approval", note="Very low ceiling, but explicitly delegated."),
    dict(institution="Central Rajasthan State University", segment="CENTRAL", source="P2-S05",
         doc="Purchase Rules 2020",
         authority="Dean / COE / Proctor / Chief Warden / HoD", max_inr=25000,
         scope="Administrative and financial approval", note="Cumulative ceiling Rs 2,50,000 per year."),
    dict(institution="Central Rajasthan State University", segment="CENTRAL", source="P2-S05",
         doc="Purchase Rules 2020",
         authority="Registrar", max_inr=200000,
         scope="Administrative and financial approval", note="May delegate up to the functionary's ceiling."),
    dict(institution="Central Rajasthan State University", segment="CENTRAL", source="P2-S05",
         doc="Purchase Rules 2020",
         authority="Standing Purchase Committee-II", max_inr=200000,
         scope="Rs 25,001 to Rs 2,00,000", note="Recommendations approved by the REGISTRAR."),
    dict(institution="Central Rajasthan State University", segment="CENTRAL", source="P2-S05",
         doc="Purchase Rules 2020",
         authority="Standing Purchase Committee-I", max_inr=1500000,
         scope="Rs 2,00,001 to Rs 15,00,000", note="Recommendations approved by the VICE-CHANCELLOR."),
    dict(institution="Central Rajasthan State University", segment="CENTRAL", source="P2-S05",
         doc="Purchase Rules 2020",
         authority="High Power Standing Purchase Committee", max_inr=None,
         scope="Above Rs 15,00,000", note="Recommendations approved by the VICE-CHANCELLOR."),

    dict(institution="ICAR - Indian Institute of Rice Research", segment="CENTRAL", source="P2-S08",
         doc="Institute Purchase Committee 2025",
         authority="Head of Office", max_inr=15000, scope="Without ceiling per occasion",
         note=""),
    dict(institution="ICAR - Indian Institute of Rice Research", segment="CENTRAL", source="P2-S08",
         doc="Institute Purchase Committee 2025",
         authority="Local Purchase Committee (3 members)", max_inr=100000,
         scope="Above Rs 15,000 and up to Rs 1,00,000", note=""),
    dict(institution="ICAR - Indian Institute of Rice Research", segment="CENTRAL", source="P2-S08",
         doc="Institute Purchase Committee 2025",
         authority="Standing Purchase Committee-I (5 members)", max_inr=200000,
         scope="Up to Rs 2,00,000; repetitive needs",
         note=("Chaired by the Head of Office. Members: HoD, user officer, Finance Officer, "
               "Internal Audit Officer. Mandatory presence of all members; any dissent by a "
               "finance member goes to the Director.")),
    dict(institution="ICAR - Indian Institute of Rice Research", segment="CENTRAL", source="P2-S08",
         doc="Institute Purchase Committee 2025",
         authority="Standing Purchase Committee-II", max_inr=None,
         scope="Above Rs 2,00,000; major one-time purchases",
         note=("Chaired by the DEAN. Members: 2 scientific officers, Finance Officer, Internal "
               "Audit Officer, Administrative Officer as member convenor. The indentor is co-opted "
               "but 'can only advise the committee'.")),
    dict(institution="ICAR - Indian Institute of Rice Research", segment="CENTRAL", source="P2-S08",
         doc="Institute Purchase Committee 2025",
         authority="Competent authority checklist", max_inr=1000000,
         scope="Above Rs 10,00,000", note=""),

    dict(institution="Delhi University", segment="CENTRAL", source="P2-S09",
         doc="Procurement of Goods & Services (GFR extract)",
         authority="Local Purchase Committee (3 members)", max_inr=250000,
         scope="Above Rs 25,000 and up to Rs 2,50,000",
         note=("Committee jointly records a certificate on reasonableness of rate, quality, "
               "specification and supplier reliability, and debarment status.")),
]

PRIVATE = [
    dict(institution="Sathyabama Institute of Science and Technology", segment="PRIVATE", source="P2-S06",
         doc="Purchase Policy",
         authority="Head of department / office / research centre", max_inr=10000,
         scope="Without calling for quotations", note="Smallest verified threshold in the corpus."),
    dict(institution="Sathyabama Institute of Science and Technology", segment="PRIVATE", source="P2-S06",
         doc="Purchase Policy",
         authority="Purchase Committee (departmental)", max_inr=50000,
         scope="Rs 10,000 to Rs 50,000 - minimum 3 quotations",
         note=("Chairperson is Dean / Head; members Professor, Associate Professor, Assistant "
               "Professor by annual rotation, plus a technical expert.")),
    dict(institution="Sathyabama Institute of Science and Technology", segment="PRIVATE", source="P2-S06",
         doc="Purchase Policy",
         authority="Purchase Committee (departmental)", max_inr=500000,
         scope="Rs 50,000 to Rs 5,00,000 - notice inviting quotations to minimum 6 firms",
         note=""),
    dict(institution="Sathyabama Institute of Science and Technology", segment="PRIVATE", source="P2-S06",
         doc="Purchase Policy",
         authority="Finance Committee + Board of Management", max_inr=200000,
         scope="Ratification of all purchases below Rs 2,00,000", note="Post-hoc ratification."),
    dict(institution="Sathyabama Institute of Science and Technology", segment="PRIVATE", source="P2-S06",
         doc="Purchase Policy",
         authority="Finance Committee + Board of Management", max_inr=None,
         scope="Above Rs 2,00,000 - MUST be budgeted BEFORE the purchase procedure",
         note=("*** THE MOST IMPORTANT PRIVATE-SEGMENT FINDING. 'All the Major Purchases (above 2 "
               "Lakhs) shall be included in the budgetary proposals of the department, duly "
               "approved by the Finance Committee, Board of Management before heading to the "
               "purchase procedure.' A purchase above Rs 2 lakh can only be funded out of an "
               "existing, pre-approved budget line - it cannot be created mid-year. ***")),
    dict(institution="Sathyabama Institute of Science and Technology", segment="PRIVATE", source="P2-S06",
         doc="Purchase Policy",
         authority="Central Purchase Committee", max_inr=None, scope="Academic departments",
         note="Headed by the VC with Registrar, Finance Officer, 2-3 management members, a Dean and a HoD."),

    dict(institution="Mangalore Institute of Technology & Engineering", segment="PRIVATE", source="P2-S07",
         doc="Administration - Purchase Committee",
         authority="Purchase Committee", max_inr=100000,
         scope="Purchases worth more than Rs 1,00,000 (new purchase only)",
         note=("Chairperson: Chairman of the governing Trust. Convener: PRINCIPAL. Members: Vice "
               "Principal and Heads of Departments. Below Rs 1 lakh no committee is required - "
               "the lowest committee trigger of any institution measured.")),
]

ALL_THRESHOLDS = CENTRAL + PRIVATE


def display_inr(n):
    """Format rupees the way an Indian institution writes them."""
    if n is None:
        return "no stated ceiling"
    if n >= 10000000:
        return f"Rs {n/10000000:.2f} crore"
    if n >= 100000:
        return f"Rs {n/100000:.2f} lakh"
    if n >= 1000:
        return f"Rs {n/1000:.0f}K"
    return f"Rs {n:,}"


def institutions():
    seen = []
    for t in ALL_THRESHOLDS:
        if t["institution"] not in seen:
            seen.append(t["institution"])
    return seen


def committee_triggers(segment=None):
    """The lowest value at which a purchase committee is engaged, per institution.

    This is the number that matters commercially: below it a departmental officer
    may act alone, above it the sale requires committee consent.
    """
    out = {}
    for t in ALL_THRESHOLDS:
        if segment and t["segment"] != segment:
            continue
        if "committee" not in t["authority"].lower():
            continue
        inst = t["institution"]
        # A trigger is the LOWER bound of a band, not its ceiling.
        lo = t.get("max_inr")
        if lo is None:
            continue
        if inst not in out or lo < out[inst]:
            out[inst] = lo
    return out


def solo_authority_ceiling(segment=None):
    """The highest value a single named officer may approve without any committee."""
    out = {}
    for t in ALL_THRESHOLDS:
        if segment and t["segment"] != segment:
            continue
        a = t["authority"].lower()
        if any(k in a for k in ("committee", "audit", "council")):
            continue
        inst, v = t["institution"], t["max_inr"]
        if v is None:
            continue
        if inst not in out or v > out[inst]:
            out[inst] = v
    return out


# StartupHub's own competitive price band, from the Phase 0 pricing ledger.
PRICE_BAND = [
    dict(label="LabelNest Orbit Launch (entry, competitor anchor)", inr=75000, source="COMP-001"),
    dict(label="StartupHub Phase 0 unvalidated assumption (SUPERSEDED by D-006)", inr=120000,
         source="todo.md", caution=True),
    dict(label="LabelNest Orbit Growth", inr=125000, source="COMP-001"),
    dict(label="LabelNest Orbit Scale", inr=250000, source="COMP-001"),
    dict(label="Incubatee SCIP (upper competitor reference)", inr=395200, source="COMP-004"),
]


def band_position(price_inr, segment=None):
    """Where a given price lands across the measured approval ladders."""
    trig = committee_triggers(segment)
    solo = solo_authority_ceiling(segment)
    out = []
    for inst, t in sorted(trig.items()):
        if price_inr <= solo.get(inst, 0):
            verdict = "solo officer may act (no committee)"
        elif price_inr <= t:
            verdict = "committee engaged"
        else:
            verdict = "committee engaged + escalation"
        out.append(dict(institution=inst, trigger=t, verdict=verdict))
    return out


# Procedural exemptions and escapes that change the ladder entirely. Each is a
# cited fact in one of the instruments above, not a generalisation.
EXEMPTIONS = [
    dict(title="GeM availability bypasses the purchase committee",
         detail=("NIT Warangal's manual applies the Local Purchase Committee to purchases 'only "
                 "on each occasion which are not available in GeM portal'. A GeM-routed purchase "
                 "does not trigger the committee."),
         consequence=("If StartupHub lists on the Government e-Marketplace, a potentially "
                      "committee-bound sale becomes a direct purchase at institutions that adopt "
                      "this carve-out. Requires Phase 24 legal work to confirm the carve-out is "
                      "general, not NITW-specific."),
         source="P2-S03", grade="SINGLE-SOURCE"),
    dict(title="Purchases above Rs 2 lakh must already be budgeted - private segment",
         detail=("Sathyabama: 'All the Major Purchases (above 2 Lakhs) shall be included in the "
                 "budgetary proposals of the department, duly approved by the Finance Committee, "
                 "Board of Management before heading to the purchase procedure.'"),
         consequence=("Above roughly Rs 2 lakh in this segment the purchase can only be funded from "
                      "an existing, pre-approved budget line. It cannot be created mid-year. This is "
                      "the strongest documentary support for D-007 - sell against an existing grant, "
                      "do not create a new budget line."),
         source="P2-S06", grade="SINGLE-SOURCE"),
    dict(title="Committee membership can be blocked by one member",
         detail=("ICAR-WII: SPC-I quorum requires 'Chairman, FO or IAO' plus HoD and Administrative "
                 "Officer; SPC-II quorum requires Chairman, FO or IAO, one HoD and Administrative "
                 "Officer. Any dissent by a finance member goes to the Director."),
         consequence=("A Finance Officer or Internal Audit Officer can stall or block a purchase "
                      "alone. Role C-03 is a genuine veto player, not a reviewer."),
         source="P2-S08", grade="SINGLE-SOURCE"),
    dict(title="The indenter advises but does not vote",
         detail=("ICAR-WII: the 'concerned indentor/project leader or officer nominated by the "
                 "Project Leader shall be co-opted as a member of the committee... The co-opted "
                 "member can only advise the committee.'"),
         consequence=("The IIC Convener, as indenter, gets a voice but no vote at ICAR-WII. Contrast "
                      "IIT Palakkad above Rs 25 lakh where the Convener sits on the EPC as a full "
                      "member. Being the indenter does not confer decision rights."),
         source="P2-S08", grade="SINGLE-SOURCE"),
    dict(title="Splitting a demand to dodge a threshold is prohibited",
         detail=("GFR 2017 Rule 157: demand for goods 'should not be divided into small quantities to "
                 "make piecemeal purchases to avoid the necessity of obtaining the sanction of higher "
                 "authority required with reference to the estimated value of the total demand.'"),
         consequence=("Closes the workaround of licensing per department to stay under a threshold. "
                      "Any multi-year or multi-seat deal will be assessed on total annual value."),
         source="P2-S10", grade="DOCUMENTED"),
    dict(title="A purchase order is not issued until audit approves",
         detail=("IIT Palakkad: purchases above Rs 10 lakh are presented to Audit for perusal and "
                 "approval; 'Upon receipt of the approval from the Audit for the purchase, the PO/WO "
                 "is issued.'"),
         consequence=("Audit is a hard gate, not advisory, at that value. Relevant only if "
                      "StartupHub ever sells institution-wide rather than per-IIC."),
         source="P2-S02", grade="SINGLE-SOURCE"),
]


def insights():
    """Derived, and deliberately conservative about what the data supports."""
    trig = committee_triggers()
    vals = sorted(trig.values())
    solo = solo_authority_ceiling()
    svals = sorted(solo.values())
    return dict(
        institutions=len(institutions()),
        threshold_rows=len(ALL_THRESHOLDS),
        committee_trigger_min=vals[0] if vals else None,
        committee_trigger_max=vals[-1] if vals else None,
        committee_trigger_spread=(round(vals[-1] / vals[0], 1) if vals and vals[0] else None),
        solo_ceiling_min=svals[0] if svals else None,
        solo_ceiling_max=svals[-1] if svals else None,
        institutions_with_no_committee_band=[k for k in trig if k not in solo],
        central_committees=sorted({t["institution"] for t in CENTRAL if "committee" in t["authority"].lower()}),
        private_committees=sorted({t["institution"] for t in PRIVATE if "committee" in t["authority"].lower()}),
    )


def validation():
    required = ["institution", "segment", "source", "doc", "authority", "max_inr", "scope", "note"]
    import data_p2_roles as R
    problems = []
    for t in ALL_THRESHOLDS:
        for f in required:
            if f not in t:
                problems.append(f"{t.get('institution','???')}: missing '{f}'")
        if t["segment"] not in ("CENTRAL", "PRIVATE"):
            problems.append(f"{t['institution']}: bad segment '{t['segment']}'")
        if t["source"] not in R.SOURCES:
            problems.append(f"{t['institution']}: unknown source {t['source']}")
        if t["max_inr"] is not None and t["max_inr"] <= 0:
            problems.append(f"{t['institution']}: non-positive max_inr")
    if not CENTRAL:
        problems.append("no CENTRAL thresholds")
    if not PRIVATE:
        problems.append("no PRIVATE thresholds")
    return problems