#!/usr/bin/env python3
"""StartupHub Phase 13 - Customer Journey Research.

    Map the customer's end-to-end journey across 11 stages, answering 6
    questions at each: what happens, who manages it, what tool is used, what
    data is produced, where it breaks, and how much manual work is involved.

WHY THIS PHASE EXISTS
---------------------
Phases 0-12 established WHAT the mandated portals require and WHAT the market
does not build. None of that answers the question a buyer asks at the demo:
"show me my week in this product." That question needs a stage-by-stage map
with the same evidentiary discipline as the rest of the programme.

THE FOUR RULES THAT GOVERN EVERY CELL
-------------------------------------
1. Interviews conducted: ZERO. No respondent, buyer or competitor quote is
   invented. Every fact is documentary, with per-cell provenance, or it is
   graded UNKNOWN.
2. Grade vocabulary is DOCUMENTARY | INFERRED | UNKNOWN | NOT_APPLICABLE.
   The words ASSUMED and HYPOTHESIS are hard audit failures - the build stops.
3. No external fetching. Evaluation, Market Validation and Growth therefore
   ship as UNKNOWN. That is the correct result of a zero-interview study with
   no registered sources on those three stages, not an omission.
4. Structural counts (activities per year, evidence artifacts per activity,
   screens per discipline) are MEASURED-FROM-DOCS. Hours and rupees of manual
   work are UNKNOWN by design and route to the Phase 3B interview instrument.

THE TWO-TRACK INSIGHT
---------------------
The venture track (idea -> evaluation -> incubation -> prototype -> IPR ->
funding -> growth) and the data track (IIC portal -> YUKTI-NIR -> ARIIA ->
NIRF) never formally join. YUKTI-NIR auto-pools into ARIIA Section 4
(GOV-024), but that is a one-directional fetch with no shared write path, and
NIRF screens show no evidence of auto-population from YUKTI. StartupHub's
wedge is the join neither portal implements.

Usage:  python build/data_p13_journey.py
"""

import csv
import json
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent
sys.path.insert(0, str(HERE))

SCHEMA_VERSION = "1.0"
BUILD_DATE = "2026-10-19"

# Grade vocabulary. ASSUMED and HYPOTHESIS are deliberately absent: their
# presence anywhere in a cell is an audit failure.
GRADES = ("DOCUMENTARY", "INFERRED", "UNKNOWN", "NOT_APPLICABLE")
FORBIDDEN_GRADES = ("ASSUMED", "HYPOTHESIS")

# Fabrication tripwires. Any of these strings appearing in a cell answer is
# an audit failure - they were researched and confirmed absent from the repo,
# absent from Source_Registry, and must never be asserted.
BANNED_STRINGS = (
    "VRS Siddhartha",
    "Google Sheet",          # except the Diagram-5 reconstruction, which is
                             # handled by a separate allow-list check below
    "Galgotias",
    "NISP 2019",
    "startup_policy_2019",
    "Calendar 2025-26",
    "IIC 8.0 Calendar",
    "PSA TRL",
)

# Diagram 5 is a marked reconstruction from official forms (N3 = "Coordinator
# types into GOOGLE SHEET"). That single node may be cited as INFERRED. The
# banned-string check exempts only cells whose cross_ref names Diagram 5.
DIAGRAM5_RECONSTRUCTION = {"GOOGLE SHEET"}


# ==========================================================================
# The 11 stages
# ==========================================================================
# track: "venture" | "data" | "both"
# evidence: "substantial" | "partial" | "zero"

STAGES = [
    dict(id="S01", name="Student Idea", track="venture", evidence="partial",
         problem_areas=[3],
         blurb="A student or faculty member has an idea and surfaces it "
               "somehow - usually through a WhatsApp group or a department "
               "coordinator. No portal exists at this stage."),
    dict(id="S02", name="Innovation Cell / Council", track="data",
         evidence="substantial",
         problem_areas=[2, 8],
         blurb="The IIC council meets quarterly and approves activities. The "
               "council-meeting upload is a hard gate: no meeting uploaded, "
               "no activities can be filed for that quarter."),
    dict(id="S03", name="Evaluation", track="both", evidence="partial",
         problem_areas=[2],
         blurb="YUKTI-NIR runs an institute-side verifier workflow with a "
               "Recommended / Not Recommended status. This is the only "
               "documented evaluation gate in the mandated stack."),
    dict(id="S04", name="Incubation", track="venture", evidence="partial",
         problem_areas=[4],
         blurb="The institution registers an incubation unit on the IIC "
               "portal. No registered source describes the incubation "
               "workflow beyond unit registration."),
    dict(id="S05", name="Mentor", track="venture", evidence="partial",
         problem_areas=[5],
         blurb="MAARG is the national mentorship platform. Internal mentor "
               "session records are undocumented across every registered "
               "source."),
    dict(id="S06", name="Prototype", track="both", evidence="partial",
         problem_areas=[3, 9],
         blurb="YUKTI-NIR buckets innovations by TRL. Recommended entries "
               "auto-pool into ARIIA Section 4 - the single documentary join "
               "between the venture track and the data track."),
    dict(id="S07", name="IPR", track="venture", evidence="substantial",
         problem_areas=[6],
         blurb="The mandated portal has an IPR/TTO Centres menu that records "
               "a TTO's existence and floor area but has no field to record a "
               "patent. Patent tables live in annual reports and private "
               "registers."),
    dict(id="S08", name="Market Validation", track="venture", evidence="zero",
         problem_areas=[],
         blurb="No registered source describes institutional market-"
               "validation practice. All six questions are UNKNOWN by "
               "design."),
    dict(id="S09", name="Funding", track="both", evidence="partial",
         problem_areas=[7, 9],
         blurb="DPIIT-recognised startups feed the NIRF FSI sub-metric. "
               "Per-startup rows are hand-typed per discipline per year with "
               "no auto-population from MCA, GST, ROC or DPIIT."),
    dict(id="S10", name="Growth", track="venture", evidence="zero",
         problem_areas=[],
         blurb="No registered source describes institutional growth-"
               "tracking practice. All six questions are UNKNOWN by "
               "design."),
    dict(id="S11", name="Reporting", track="data", evidence="substantial",
         problem_areas=[10, 12, 1],
         blurb="Four mandated systems - IIC, YUKTI-NIR, ARIIA, NIRF - each "
               "with its own schema and (for IIC vs YUKTI) its own "
               "credentials. The annual report is hand-assembled from "
               "spreadsheets."),
]

STAGE_BY_ID = {s["id"]: s for s in STAGES}


# ==========================================================================
# The 6 questions
# ==========================================================================

QUESTIONS = [
    dict(id="Q1", key="what_happens", label="What happens"),
    dict(id="Q2", key="who_manages", label="Who manages it"),
    dict(id="Q3", key="what_tool", label="What tool is used"),
    dict(id="Q4", key="what_data", label="What data is produced"),
    dict(id="Q5", key="where_breaks", label="Where it breaks"),
    dict(id="Q6", key="manual_work", label="How much manual work"),
]

Q_KEYS = [q["key"] for q in QUESTIONS]


# ==========================================================================
# The 66 cells
# ==========================================================================
# One dict per (stage, question). Field meanings:
#   answer        - the finding, in one or two sentences
#   basis         - why this grade, and (for INFERRED) the inference chain
#   grade         - DOCUMENTARY | INFERRED | UNKNOWN | NOT_APPLICABLE
#   source_ids    - registered Source_Registry ids (may be empty for UNKNOWN)
#   still_needs   - what would close the cell (empty if closed)
#   cross_ref     - problem area / P-A / D / GAP / Diagram-5 pointers

def _c(stage, qkey, answer, grade, source_ids=(), still_needs="", cross_ref="",
       basis=""):
    assert grade in GRADES, f"{stage}/{qkey}: bad grade {grade!r}"
    assert not any(g in answer for g in FORBIDDEN_GRADES), \
        f"{stage}/{qkey}: forbidden grade word in answer"
    assert not any(g in basis for g in FORBIDDEN_GRADES), \
        f"{stage}/{qkey}: forbidden grade word in basis"
    return dict(stage=stage, question=qkey, answer=answer, basis=basis,
                grade=grade, source_ids=list(source_ids),
                still_needs=still_needs, cross_ref=cross_ref)


CELLS = [
    # ---------------- S01 Student Idea ----------------
    _c("S01", "what_happens",
       "Students and faculty form ideas and surface them informally. Two "
       "NIT-level IICs differ ~75x in ideas generated under the same national "
       "programme, so the count is a function of local practice, not of any "
       "standard intake process.",
       "DOCUMENTARY", ["P1-001"], cross_ref="P-A01",
       basis="P1-001 measures the 75x variance directly from published IIC "
             "reports. No source documents a standardised intake process."),
    _c("S01", "who_manages",
       "Innovation Activity Coordinator (A-06) and IIC Members (A-12) collect; "
       "the Convener (A-03) controls what is presented to council. No source "
       "binds a named role specifically to idea intake.",
       "INFERRED", ["P1-001"],
       still_needs="Phase 3B: ask who actually receives an idea first, and "
                   "whether that person is named in any institutional "
                   "document.",
       cross_ref="Phase 2 roles A-03, A-06, A-12",
       basis="The roles are documentary (Phase 2) and the Convener's agenda "
             "control is documentary, but the binding of any role to THIS "
             "stage is inferred from role descriptions, not stated."),
    _c("S01", "what_tool",
       "No mandated portal for idea capture. IISc routes student coordination "
       "through WhatsApp (COMP-024); Diagram 5 reconstructs the coordinator "
       "asking in the same group.",
       "DOCUMENTARY", ["COMP-024"],
       still_needs="Internal tooling at this stage is UNKNOWN across every "
                   "registered source (P-A10).",
       cross_ref="Diagram 5 N1, N2; COMP-024",
       basis="COMP-024 is a direct quote from IISc's own coordination page. "
             "Diagram 5 is a marked reconstruction from official forms."),
    _c("S01", "what_data",
       "Idea description, team, department - captured informally. No "
       "registered source documents an idea-capture schema.",
       "UNKNOWN", [],
       still_needs="Phase 3B: capture the actual fields an institution "
                   "records when an idea is first logged.",
       cross_ref="P-A10 evidence_gap",
       basis="P-A10 states internal tooling and schemas are UNKNOWN at every "
             "stage. No registered source documents an idea-capture form."),
    _c("S01", "where_breaks",
       "Idea counts are not funnel-linked to downstream outputs: reported "
       "prototypes can exceed reported ideas, proving the fields are not one "
       "funnel.",
       "DOCUMENTARY", ["P1-008"], cross_ref="P-A01",
       basis="P1-008 is measured directly from published IIC reports."),
    _c("S01", "manual_work",
       "UNKNOWN. Phase 10 problem analysis P-A10 states hours are not "
       "measured and calls this the highest-value unknown in that section.",
       "UNKNOWN", [],
       still_needs="Phase 3B interview instrument: hours per idea logged, "
                   "per quarter.",
       cross_ref="P-A10:554",
       basis="P-A10:554 is explicit: 'Not measured. This is the highest-value "
             "unknown in Section A.'"),

    # ---------------- S02 Innovation Cell / Council ----------------
    _c("S02", "what_happens",
       "The IIC council meets quarterly. Minimum 3 IIC Calendar activities "
       "plus 1 Celebration per quarter, i.e. a 16+ activity/year baseline. "
       "Activities cannot be filed until the quarter's council meeting is "
       "uploaded.",
       "DOCUMENTARY", ["GOV-020", "GOV-019"], cross_ref="P-A02; Diagram 5 P5",
       basis="GOV-020 states the activity minimums; GOV-019 states the "
             "council-meeting gate verbatim from the IIC portal."),
    _c("S02", "who_manages",
       "IIC President (A-01) chairs and can change council membership; "
       "Convener (A-03) controls the quarterly agenda; nine named coordinator "
       "roles (A-04 to A-12) implement.",
       "DOCUMENTARY", ["GOV-018"],
       cross_ref="Phase 2 roles A-01..A-12; P-A08",
       basis="The full council role set is documented on the IIC portal "
             "(GOV-018) and mapped in Phase 2 against 25 institutional "
             "roles."),
    _c("S02", "what_tool",
       "IIC Portal (mandated). Menu exposes dashboard, IIC performance, "
       "activity status, council status, student/faculty participation, "
       "incubation unit registration and e-Repository.",
       "DOCUMENTARY", ["GOV-018"], cross_ref="GOV-018",
       basis="GOV-018 enumerates the portal's dashboard fields directly."),
    _c("S02", "what_data",
       "Per activity: 4 social media links, participant counts, expenditure, "
       "video URL, 2 photographs and 1 document upload.",
       "DOCUMENTARY", ["GOV-021"], cross_ref="P-A02",
       basis="GOV-021 lists the per-activity report requirements verbatim "
             "from the IIC portal."),
    _c("S02", "where_breaks",
       "The council-meeting upload gates the entire activity pipeline for "
       "the quarter. If the meeting is not uploaded, no activities can be "
       "added - a single missing artefact blocks 16+ downstream filings.",
       "DOCUMENTARY", ["GOV-019"], cross_ref="Diagram 5 P5; P-A02",
       basis="GOV-019 states the gate directly. Diagram 5 P5 independently "
             "names it as a pain point."),
    _c("S02", "manual_work",
       "16+ mandated activities/year, each carrying 4 social links + 2 "
       "photos + 1 video + 1 document = 8 evidence artefacts, so ~128+ "
       "artefacts/year per institution. Structural count MEASURED-FROM-DOCS; "
       "hours UNKNOWN.",
       "DOCUMENTARY", ["GOV-020", "GOV-021"],
       still_needs="Phase 3B: hours per activity report, and hours to "
                   "assemble the quarterly evidence pack.",
       cross_ref="P-A02",
       basis="The 16 and the 8 are both registered portal requirements. The "
             "product (~128) is arithmetic on two documentary numbers. Hours "
             "are not stated in any registered source."),

    # ---------------- S03 Evaluation ----------------
    _c("S03", "what_happens",
       "YUKTI-NIR runs an institute-side verification workflow. Status flow "
       "is Pending -> Recommended / Not Recommended. A Recommended entry is "
       "eligible for YIC, which in 2025 was open to TRL 4+ registered "
       "innovations.",
       "DOCUMENTARY", ["GOV-023"], cross_ref="GOV-023",
       basis="GOV-023 states the verifier workflow and the YIC eligibility "
             "threshold directly from the IIC portal."),
    _c("S03", "who_manages",
       "YUKTI Coordinator (A-04) verifies submissions - a gatekeeping act, "
       "but over YUKTI entries only. HEIs manage expert verification through "
       "an 'Add Verifier' tab.",
       "DOCUMENTARY", ["GOV-023"],
       cross_ref="Phase 2 roles A-04",
       basis="GOV-023 documents the Add Verifier tab and the status flow; "
             "Phase 2 documents the A-04 role."),
    _c("S03", "what_tool",
       "YUKTI-NIR, reachable from the IIC portal but under SEPARATE "
       "credentials: 'IIC login credentials and the YUKTI login credentials "
       "are different.'",
       "DOCUMENTARY", ["GOV-025"], cross_ref="GOV-025; Diagram 5 N7",
       basis="GOV-025 is a verbatim portal statement about credential "
             "divergence."),
    _c("S03", "what_data",
       "TRL bucket (Idea/PoC 1-4, Innovation/Prototype 5-9, "
       "Business/Startup), indexed on Themes & Stages, TRL, MRL and IRL.",
       "DOCUMENTARY", ["GOV-023"], cross_ref="GOV-023",
       basis="GOV-023 enumerates the three TRL buckets and the four indexing "
             "axes."),
    _c("S03", "where_breaks",
       "Two breaks. Separate credentials force a second login and a second "
       "identity. And IIC's own 'Rating and Scoring System' help page returns "
       "'Coming Soon', so the star-rating formula is not publicly documented.",
       "DOCUMENTARY", ["GOV-025", "GOV-044"], cross_ref="GOV-044",
       basis="GOV-025 and GOV-044 are both verbatim portal observations."),
    _c("S03", "manual_work",
       "Each recommended entry must be re-submitted downstream to ARIIA "
       "(auto-pool) and separately to NIRF (manual). The re-key is "
       "structural; the hours are UNKNOWN.",
       "INFERRED", ["GOV-024"],
       still_needs="Phase 3B: hours per YUKTI entry, and whether the "
                   "coordinator re-keys or copies.",
       cross_ref="GOV-024; GOV-028",
       basis="GOV-024 documents the ARIIA auto-pool; GOV-028 documents that "
             "NIRF does not auto-populate. The inference is that the "
             "coordinator therefore re-keys at least once."),

    # ---------------- S04 Incubation ----------------
    _c("S04", "what_happens",
       "The institution registers an incubation unit on the IIC portal. No "
       "registered source describes the incubation workflow beyond unit "
       "registration.",
       "DOCUMENTARY", ["GOV-018"], cross_ref="GOV-018",
       basis="GOV-018 lists 'incubation unit registration' as a dashboard "
             "field. No source documents workflow beyond it."),
    _c("S04", "who_manages",
       "Incubation Manager / TBI Manager (B-03) is the named role. No source "
       "establishes a procurement or spend role for it.",
       "DOCUMENTARY", [],
       still_needs="Phase 3B: does the Incubation Manager hold a budget line, "
                   "and at what ceiling?",
       cross_ref="Phase 2 roles B-03; P-A10",
       basis="Phase 2 documents B-03 and explicitly records its spend "
             "authority as UNKNOWN."),
    _c("S04", "what_tool",
       "IIC Portal has an incubation unit registration field. Internal "
       "incubation tooling is UNKNOWN across every registered source.",
       "DOCUMENTARY", ["GOV-018"],
       still_needs="Phase 3B: what system holds the incubation cohort, and "
                   "is it a spreadsheet?",
       cross_ref="P-A10; COMP-026",
       basis="GOV-018 documents the registration field. COMP-026 quotes two "
             "ERP vendors describing departments keeping their own "
             "registers."),
    _c("S04", "what_data",
       "Unit existence and (for TTOs) floor area. No venture-level "
       "incubation record schema is documented in any registered source.",
       "DOCUMENTARY", ["GOV-018", "GOV-022"],
       still_needs="Phase 3B: what per-venture fields the institution "
                   "actually maintains inside the incubation unit.",
       cross_ref="GOV-022",
       basis="GOV-018 documents unit registration; GOV-022 documents the "
             "IPR/TTO menu's limited field set (existence + floor area)."),
    _c("S04", "where_breaks",
       "Departments outside the system keep their own registers. DigiERP's "
       "own marketing states the institution 'carries both the software cost "
       "and the duplicate work'.",
       "DOCUMENTARY", ["COMP-026"], cross_ref="P-A10; COMP-026",
       basis="COMP-026 is a verbatim vendor statement about departmental "
             "duplicate registers."),
    _c("S04", "manual_work",
       "UNKNOWN.",
       "UNKNOWN", [],
       still_needs="Phase 3B: hours per incubation unit per year, and how "
                   "many ventures are tracked inside it.",
       cross_ref="P-A10",
       basis="P-A10 records internal incubation tooling and hours as "
             "UNKNOWN."),

    # ---------------- S05 Mentor ----------------
    _c("S05", "what_happens",
       "MAARG is the national mentorship platform, with AI matchmaking, "
       "session scheduling, cohort programmes and dashboards.",
       "DOCUMENTARY", ["GOV-041"], cross_ref="GOV-041",
       basis="GOV-041 enumerates MAARG's four capabilities directly from "
             "Startup India."),
    _c("S05", "who_manages",
       "IIC Member (A-12) and Entrepreneurship Cell (B-04). Mentorship "
       "coordination is problem area 5.",
       "INFERRED", [],
       still_needs="Phase 3B: who owns the mentor roster, and does that "
                   "person appear in any institutional document?",
       cross_ref="Phase 2 roles A-12, B-04; problem area 5",
       basis="The roles are documentary; the binding of either to mentorship "
             "is inferred from role titles, not stated."),
    _c("S05", "what_tool",
       "MAARG (mandated, GOV-041). Internal mentor-session records are "
       "UNKNOWN; Diagram 5 reconstructs mentorship in WhatsApp threads.",
       "DOCUMENTARY", ["GOV-041"],
       still_needs="Phase 3B: does the institution log mentor sessions "
                   "anywhere, and where?",
       cross_ref="Diagram 5 N10, P3",
       basis="GOV-041 documents MAARG. Diagram 5 N10 is a marked "
             "reconstruction from official forms."),
    _c("S05", "what_data",
       "Mentor profiles, matching, session logs. Schema undocumented in every "
       "registered source.",
       "UNKNOWN", [],
       still_needs="Phase 3B: capture the mentor-session record fields, if "
                   "any.",
       cross_ref="P-A10",
       basis="No registered source documents an internal mentor-session "
             "schema."),
    _c("S05", "where_breaks",
       "No permissions model - mentors see everything. Diagram 5 names this "
       "as pain point P3.",
       "INFERRED", [],
       still_needs="Phase 3B: confirm whether mentor visibility is actually "
                   "unrestricted, and whether NDA-tiered access is ever "
                   "discussed internally.",
       cross_ref="Diagram 5 P3",
       basis="Diagram 5 P3 is a marked reconstruction. It is the only source "
             "naming the permissions gap; no registered documentary source "
             "states it."),
    _c("S05", "manual_work",
       "UNKNOWN.",
       "UNKNOWN", [],
       still_needs="Phase 3B: hours per mentor per month, and hours to "
                   "arrange a session.",
       cross_ref="P-A10",
       basis="No registered source measures mentorship hours."),

    # ---------------- S06 Prototype ----------------
    _c("S06", "what_happens",
       "YUKTI-NIR buckets innovations by TRL: Idea/PoC (1-4), "
       "Innovation/Prototype (5-9), Business/Startup. Recommended entries "
       "auto-pool into ARIIA Section 4.",
       "DOCUMENTARY", ["GOV-023", "GOV-024"], cross_ref="GOV-024; D1",
       basis="GOV-023 gives the TRL buckets; GOV-024 states the ARIIA "
             "auto-pool."),
    _c("S06", "who_manages",
       "YUKTI Coordinator (A-04) verifies; HEI manages verifiers through the "
       "'Add Verifier' tab. Status: Pending -> Recommended / Not "
       "Recommended.",
       "DOCUMENTARY", ["GOV-023"], cross_ref="Phase 2 roles A-04",
       basis="GOV-023 documents the Add Verifier tab and status flow."),
    _c("S06", "what_tool",
       "YUKTI-NIR, separate login. No venture lifecycle, no funding ledger, "
       "no IP docket, no cohort management - YUKTI is a submission plus "
       "verification queue with three static buckets.",
       "DOCUMENTARY", ["GOV-025"], cross_ref="GOV-025; D1",
       basis="GOV-025 documents the credential split. The absence of "
             "lifecycle features is documented in the Phase 4 ecosystem "
             "deep-dive (GOV-023 scope)."),
    _c("S06", "what_data",
       "TRL, MRL and IRL indexing; Theme & Stage tags; a Recommended status "
       "that becomes the ARIIA Section 4 record.",
       "DOCUMENTARY", ["GOV-023", "GOV-024"], cross_ref="GOV-024",
       basis="GOV-023 and GOV-024 both document the indexing and the "
             "auto-pool."),
    _c("S06", "where_breaks",
       "The auto-pool is one-directional and scoped to ARIIA only. NIRF "
       "Innovation screens show no evidence of auto-population from YUKTI, "
       "so a Recommended prototype still has to be re-keyed for NIRF.",
       "DOCUMENTARY", ["GOV-024", "GOV-028"],
       cross_ref="GOV-028; two-track join",
       basis="GOV-024 states the ARIIA auto-pool; GOV-028 documents NIRF's "
             "own per-discipline capture with no auto-population. The "
             "absence of a YUKTI->NIRF write path is the core two-track "
             "finding."),
    _c("S06", "manual_work",
       "One YUKTI entry does NOT equal one NIRF row: NIRF requires ~11 "
       "screens per discipline, so a 4-discipline university files the "
       "Innovation form 4x. Structural count MEASURED-FROM-DOCS; hours "
       "UNKNOWN.",
       "DOCUMENTARY", ["GOV-028"],
       still_needs="Phase 3B: hours per YUKTI entry, and hours per NIRF "
                   "discipline row.",
       cross_ref="GOV-028; Diagram 5 N6, N7",
       basis="GOV-028 documents the per-discipline repetition. The 4x is "
             "arithmetic on that documentary number."),

    # ---------------- S07 IPR ----------------
    _c("S07", "what_happens",
       "IIC has an 'IPR/TTO Centres' menu that registers a TTO's existence "
       "and floor area but has NO field to record a patent. Institutions "
       "file patent tables separately, usually in the annual report, often "
       "splitting granted / published / filed.",
       "DOCUMENTARY", ["GOV-022", "P1-009"], cross_ref="P-A06; D2",
       basis="GOV-022 states the menu's field set directly. P1-009 measures "
             "the granted/published/filed split from published reports."),
    _c("S07", "who_manages",
       "IPR Activity Coordinator (A-08) brings IPR matters to council. A "
       "named IPR/TTO Cell with a named in-charge is achievable but rare.",
       "DOCUMENTARY", ["P1-006"], cross_ref="Phase 2 roles A-08; P-A06",
       basis="P1-006 measures the rarity of a named IPR/TTO Cell directly "
             "from published reports."),
    _c("S07", "what_tool",
       "No mandated patent register. ARIIA DCS requires 'Patent Application "
       "No', 'Year of Patent Application', 'Current Status' and 'IP / "
       "Patented Technology' per innovation - fields the IIC portal does not "
       "carry.",
       "DOCUMENTARY", ["COMP-032", "GOV-022"], cross_ref="COMP-032; D2",
       basis="COMP-032 enumerates ARIIA's per-patent DCS fields; GOV-022 "
             "documents the IIC portal's absence of a patent field."),
    _c("S07", "what_data",
       "Granted / published / filed split (P1-009). A Yes/No "
       "commercialisation column already exists in some institutional IP "
       "registers (P1-016). Foreign IP has no field anywhere (P1-012).",
       "DOCUMENTARY", ["P1-009", "P1-016", "P1-012"], cross_ref="P-A06",
       basis="All three are measured directly from published IIC reports and "
             "IP registers."),
    _c("S07", "where_breaks",
       "The mandated portal cannot record a patent, and foreign IP has no "
       "field. Separately, NIDHI-PRAYAS 2.0 requires an NOC confirming IP "
       "vests entirely with the innovator or startup - a requirement with no "
       "portal to enforce it.",
       "DOCUMENTARY", ["GOV-022", "P1-012", "GOV-037"],
       cross_ref="P-A06; D2; GOV-037",
       basis="GOV-022, P1-012 and GOV-037 are each documented: the portal "
             "gap, the foreign-IP gap, and the NIDHI-PRAYAS NOC requirement."),
    _c("S07", "manual_work",
       "Four-year IP tables are common but frequently unreadable by text "
       "extraction (P1-010). Diagram 5 reconstructs patents tracked in a "
       "private register, re-keyed every year.",
       "DOCUMENTARY", ["P1-010"], cross_ref="P-A06; Diagram 5 N9",
       basis="P1-010 measures the unreadability problem directly. Diagram 5 "
             "N9 is a marked reconstruction."),

    # ---------------- S08 Market Validation (zero evidence) ----------------
    _c("S08", "what_happens",
       "UNKNOWN. No registered source describes institutional "
       "market-validation practice.",
       "UNKNOWN", [],
       still_needs="Phase 3B interview: how does an institution know a "
                   "venture has customers?",
       cross_ref="P-A09",
       basis="Zero registered sources address this stage. Ship UNKNOWN by "
             "design."),
    _c("S08", "who_manages",
       "UNKNOWN.",
       "UNKNOWN", [],
       still_needs="Phase 3B: which role, if any, owns market validation.",
       cross_ref="P-A09",
       basis="Zero registered sources address this stage."),
    _c("S08", "what_tool",
       "UNKNOWN.",
       "UNKNOWN", [],
       still_needs="Phase 3B: is any tool used, or is this informal?",
       cross_ref="P-A09",
       basis="Zero registered sources address this stage."),
    _c("S08", "what_data",
       "UNKNOWN.",
       "UNKNOWN", [],
       still_needs="Phase 3B: what evidence of market validation, if any, is "
                   "ever recorded.",
       cross_ref="P-A09",
       basis="Zero registered sources address this stage."),
    _c("S08", "where_breaks",
       "UNKNOWN.",
       "UNKNOWN", [],
       still_needs="Phase 3B: where does market validation typically fail or "
                   "stall?",
       cross_ref="P-A09",
       basis="Zero registered sources address this stage."),
    _c("S08", "manual_work",
       "UNKNOWN.",
       "UNKNOWN", [],
       still_needs="Phase 3B: hours, if any.",
       cross_ref="P-A09",
       basis="Zero registered sources address this stage."),

    # ---------------- S09 Funding ----------------
    _c("S09", "what_happens",
       "DPIIT-recognised startups feed the NIRF FSI sub-metric SU = 20 x "
       "f(N_vsp), where N_vsp = DPIIT-recognised startups in the previous "
       "three years. NIDHI-PRAYAS 2.0 requires an NOC confirming IP vests "
       "entirely with the innovator or startup.",
       "DOCUMENTARY", ["GOV-027", "GOV-037"], cross_ref="GOV-027; D1",
       basis="GOV-027 states the SU formula; GOV-037 states the "
             "NIDHI-PRAYAS NOC requirement."),
    _c("S09", "who_manages",
       "Startup Activity Coordinator (A-09) implements. Institutional spend "
       "authority sits with VC/Director (B-01) and Dean (B-02) at documented "
       "ceilings - one of only two Phase 2 roles with DOCUMENTED budget "
       "authority.",
       "DOCUMENTARY", [],
       cross_ref="Phase 2 roles A-09, B-01, B-02, C-01, C-03",
       basis="Phase 2 documents the approval chain with named ceilings "
             "(NIT Warangal Director = all cases; CRSU VC above Rs 2,00,000; "
             "Dean Rs 10,00,000 non-consumable)."),
    _c("S09", "what_tool",
       "NIRF Innovation DCS per-startup rows. No funding ledger is mandated "
       "by any registered portal.",
       "DOCUMENTARY", ["GOV-028"],
       cross_ref="GOV-028; P-A09",
       basis="GOV-028 enumerates the NIRF per-startup capture fields. No "
             "registered source documents a mandated funding ledger."),
    _c("S09", "what_data",
       "Per startup: name, DPIIT number, amount, funding organisation name, "
       "year, achievement level and type of investment - repeated per "
       "discipline per year.",
       "DOCUMENTARY", ["GOV-028"], cross_ref="GOV-028; P-A02",
       basis="GOV-028 lists all seven per-startup fields verbatim from the "
             "NIRF DCS."),
    _c("S09", "where_breaks",
       "The awareness-spend field can carry a budget proposal rather than an "
       "actual, and the gap to real grants is 40x. Money fields carry sponsor "
       "identity and purpose, not just a number.",
       "DOCUMENTARY", ["P1-023", "P1-013"], cross_ref="P-A02; P-A09",
       basis="P1-023 measures the 40x proposal-vs-actual gap; P1-013 "
             "measures the sponsor-identity contamination. Both are "
             "measured from published IIC reports."),
    _c("S09", "manual_work",
       "Hand-typed per startup per discipline per year. None of it "
       "auto-populates from MCA, GST, ROC or DPIIT's own recognition "
       "database.",
       "DOCUMENTARY", ["GOV-028"], cross_ref="GOV-028; Diagram 5 N6",
       basis="GOV-028 documents the per-discipline repetition and the "
             "absence of any auto-population source."),

    # ---------------- S10 Growth (zero evidence) ----------------
    _c("S10", "what_happens",
       "UNKNOWN. No registered source describes institutional growth-tracking "
       "practice.",
       "UNKNOWN", [],
       still_needs="Phase 3B interview: does the institution track post-"
                   "incubation growth at all?",
       cross_ref="P-A10; Diagram 5 P6",
       basis="Zero registered sources address this stage. Diagram 5 P6 "
             "('cannot answer how many are still alive') is a reconstruction, "
             "not documentary evidence of a growth process."),
    _c("S10", "who_manages",
       "UNKNOWN.",
       "UNKNOWN", [],
       still_needs="Phase 3B: which role, if any, owns growth tracking.",
       cross_ref="P-A10",
       basis="Zero registered sources address this stage."),
    _c("S10", "what_tool",
       "UNKNOWN.",
       "UNKNOWN", [],
       still_needs="Phase 3B: is any system used, or is growth untracked?",
       cross_ref="P-A10",
       basis="Zero registered sources address this stage."),
    _c("S10", "what_data",
       "UNKNOWN.",
       "UNKNOWN", [],
       still_needs="Phase 3B: what growth metrics, if any, are recorded.",
       cross_ref="P-A10",
       basis="Zero registered sources address this stage."),
    _c("S10", "where_breaks",
       "UNKNOWN. Diagram 5 names 'cannot answer how many are still alive' as "
       "pain point P6, but that is a reconstruction.",
       "UNKNOWN", [],
       still_needs="Phase 3B: confirm whether the institution can answer the "
                   "alumni-venture question today.",
       cross_ref="Diagram 5 P6",
       basis="Diagram 5 P6 is a marked reconstruction. No documentary source "
             "states the break."),
    _c("S10", "manual_work",
       "UNKNOWN.",
       "UNKNOWN", [],
       still_needs="Phase 3B: hours, if any.",
       cross_ref="P-A10",
       basis="Zero registered sources address this stage."),

    # ---------------- S11 Reporting ----------------
    _c("S11", "what_happens",
       "Institutions hand-assemble annual reports from spreadsheets and file "
       "IIC, YUKTI-NIR, ARIIA and NIRF returns. A single IIC report can carry "
       "two irreconcilable values for the same KPI field.",
       "DOCUMENTARY", ["P1-002"], cross_ref="P-A08; P-A10; D5",
       basis="P1-002 measures the within-document contradiction directly "
             "from published IIC reports. P-A10 documents the hand-"
             "consolidation from departmental silos."),
    _c("S11", "who_manages",
       "ARIIA Coordinator (A-10) and NIRF Coordinator (A-11) advise council "
       "on rank improvement. ARIIA's own DCS fetches from IIC, NISP, YUKTI "
       "and Innovation Ambassador portals.",
       "DOCUMENTARY", ["GOV-031"],
       cross_ref="Phase 2 roles A-10, A-11; GOV-031",
       basis="GOV-031 states the ARIIA DCS fetch behaviour verbatim. Phase 2 "
             "documents both coordinator roles."),
    _c("S11", "what_tool",
       "Four mandated systems: IIC Portal, YUKTI-NIR, ARIIA DCS and NIRF DCS. "
       "IIC and YUKTI use separate credentials. No public API, developer "
       "documentation or bulk export exists for any of them.",
       "DOCUMENTARY", ["GOV-018", "GOV-025", "GOV-043"],
       cross_ref="GOV-043; D5; Diagram 5 N7, N8",
       basis="GOV-018 and GOV-025 document the portals and the credential "
             "split; GOV-043 states the absence of any public API or bulk "
             "export."),
    _c("S11", "what_data",
       "ARIIA DCS fetches from IIC, NISP, YUKTI and Innovation Ambassador "
       "portals. NIRF Innovation is ~11 screens per discipline, so a "
       "4-discipline university files the Innovation form 4x.",
       "DOCUMENTARY", ["GOV-031", "GOV-028"],
       cross_ref="GOV-028; GOV-031; D6",
       basis="GOV-031 states the ARIIA fetch; GOV-028 documents the "
             "per-discipline repetition. The 4x is arithmetic on the "
             "documentary 11-screen figure."),
    _c("S11", "where_breaks",
       "One IIC report can carry two irreconcilable values for the same KPI "
       "field (P1-002). Money fields carry sponsor identity and purpose, not "
       "just a number (P1-013). 'In-progress' is used as a value in a money "
       "field on a filed report (P1-025).",
       "DOCUMENTARY", ["P1-002", "P1-013", "P1-025"], cross_ref="P-A02; P-A08",
       basis="All three are measured directly from published IIC reports."),
    _c("S11", "manual_work",
       "A university with 4 disciplines files the NIRF Innovation form 4x. "
       "None of the per-startup or per-patent data auto-populates. Structural "
       "count MEASURED-FROM-DOCS; hours UNKNOWN.",
       "DOCUMENTARY", ["GOV-028"],
       still_needs="Phase 3B: total hours per reporting cycle across all "
                   "four systems.",
       cross_ref="P-A08; P-A10; D5",
       basis="GOV-028 documents the repetition. P-A10:554 states hours are "
             "not measured."),
]

assert len(CELLS) == 66, f"expected 66 cells, got {len(CELLS)}"


# ==========================================================================
# Two-track map
# ==========================================================================

TWO_TRACK = dict(
    venture=["S01", "S03", "S04", "S06", "S07", "S09", "S10"],
    data=["S02", "S11"],
    join_stage="S06",
    join_evidence=("YUKTI-NIR entries with 'Recommended' status auto-pool "
                   "into ARIIA Section 4. This is the only documentary join "
                   "between the two tracks, and it is one-directional: ARIIA "
                   "pulls, with no shared write path back, scoped to ARIIA "
                   "only, and it does not remove NIRF-I."),
    join_source_ids=["GOV-024", "GOV-031"],
    rekey_targets=[
        dict(system="IIC Portal", source_ids=["GOV-018", "GOV-021"]),
        dict(system="YUKTI-NIR", source_ids=["GOV-023", "GOV-025"]),
        dict(system="ARIIA DCS", source_ids=["GOV-031"]),
        dict(system="NIRF Innovation", source_ids=["GOV-028"]),
    ],
    note=("StartupHub's wedge is the join neither portal implements: a single "
          "venture record that emits all four submissions as a by-product, "
          "keyed on the entity and its state over time."),
)


# ==========================================================================
# Breakpoints
# ==========================================================================
# severity 1 = friction, 2 = real break, 3 = hard gate or data-integrity
# failure. Every breakpoint cites at least one registered source or names its
# Diagram-5 reconstruction status.

BREAKPOINTS = [
    dict(id="BP-01", stage="S02", severity=3,
         title="Council-meeting upload gates all activity filing",
         detail="If the quarterly council meeting is not uploaded, no "
                "activities can be added for that quarter - a single missing "
                "artefact blocks 16+ downstream filings.",
         grade="DOCUMENTARY", source_ids=["GOV-019"],
         cross_ref="Diagram 5 P5"),
    dict(id="BP-02", stage="S02", severity=3,
         title="16+ activities/year x 8 evidence artefacts = 128+ artefacts",
         detail="Each activity report requires 4 social links, 2 photos, 1 "
                "video and 1 document. The volume is structural and "
                "mandatory.",
         grade="DOCUMENTARY", source_ids=["GOV-020", "GOV-021"],
         cross_ref="P-A02"),
    dict(id="BP-03", stage="S06", severity=3,
         title="Two tracks never join: YUKTI auto-pools to ARIIA but not to "
               "NIRF",
         detail="The ARIIA auto-pool is one-directional and ARIIA-scoped. "
                "NIRF screens show no evidence of auto-population from YUKTI, "
                "so every recommended prototype is re-keyed for NIRF.",
         grade="DOCUMENTARY", source_ids=["GOV-024", "GOV-028"],
         cross_ref="two-track join; D1"),
    dict(id="BP-04", stage="S03", severity=2,
         title="IIC and YUKTI use different credentials",
         detail="The portal states IIC and YUKTI logins are different - a "
                "second identity for the same coordinator.",
         grade="DOCUMENTARY", source_ids=["GOV-025"], cross_ref="Diagram 5 N7"),
    dict(id="BP-05", stage="S03", severity=2,
         title="IIC star-rating formula is undocumented ('Coming Soon')",
         detail="The official Rating and Scoring help page returns 'Coming "
                "Soon'. A product that promises to optimise the star rating "
                "is promising against an unpublished formula.",
         grade="DOCUMENTARY", source_ids=["GOV-044"], cross_ref="Phase 22"),
    dict(id="BP-06", stage="S07", severity=3,
         title="The mandated portal has no field to record a patent",
         detail="IIC's IPR/TTO Centres menu registers TTO existence and floor "
                "area only. ARIIA DCS requires per-patent fields the IIC "
                "portal does not carry.",
         grade="DOCUMENTARY", source_ids=["GOV-022", "COMP-032"],
         cross_ref="P-A06; D2"),
    dict(id="BP-07", stage="S09", severity=3,
         title="Budget proposals filed in actuals fields; gap to real grants "
               "40x",
         detail="The awareness-spend field can carry a proposal rather than "
                "an actual. Money fields also carry sponsor identity and "
                "purpose instead of a number.",
         grade="DOCUMENTARY", source_ids=["P1-023", "P1-013"],
         cross_ref="P-A02; P-A09"),
    dict(id="BP-08", stage="S11", severity=3,
         title="Same KPI field carries two irreconcilable values in one "
               "report",
         detail="Measured directly from published IIC reports. Relational "
                "integrity is absent at the schema level.",
         grade="DOCUMENTARY", source_ids=["P1-002"], cross_ref="Diagram 5 P2"),
    dict(id="BP-09", stage="S11", severity=3,
         title="No public API or bulk export for any mandated portal",
         detail="No public API, developer documentation or bulk export found "
                "for IIC, YUKTI, NIRF, AISHE or MAARG. Every integration is "
                "therefore manual or screen-scraped.",
         grade="DOCUMENTARY", source_ids=["GOV-043"], cross_ref="D5"),
    dict(id="BP-10", stage="S11", severity=2,
         title="NIRF Innovation filed per discipline, not per institution",
         detail="~11 screens per discipline. A 4-discipline university files "
                "the same startup rows 4 times.",
         grade="DOCUMENTARY", source_ids=["GOV-028"], cross_ref="D6"),
    dict(id="BP-11", stage="S04", severity=2,
         title="Departments outside the system keep their own registers",
         detail="ERP vendors' own marketing states the institution carries "
                "both the software cost and the duplicate work.",
         grade="DOCUMENTARY", source_ids=["COMP-026"], cross_ref="P-A10"),
    dict(id="BP-12", stage="S05", severity=2,
         title="No permissions model - mentors see everything",
         detail="Diagram 5 names this as pain point P3. NDA-tiered "
                "visibility is absent.",
         grade="INFERRED", source_ids=[], cross_ref="Diagram 5 P3"),
    dict(id="BP-13", stage="S01", severity=2,
         title="Prototypes reported exceed ideas reported",
         detail="The idea and prototype fields are not one funnel. Reported "
                "prototypes can exceed reported ideas.",
         grade="DOCUMENTARY", source_ids=["P1-008"], cross_ref="P-A01"),
    dict(id="BP-14", stage="S11", severity=2,
         title="Text in money fields ('In-progress') on filed reports",
         detail="Measured from published IIC reports. Numeric validation is "
                "absent at the portal schema level.",
         grade="DOCUMENTARY", source_ids=["P1-025"], cross_ref="P-A08"),
]


# ==========================================================================
# Manual work ledger
# ==========================================================================
# measure_type:
#   STRUCTURAL_COUNT - a countable derived from registered portal requirements
#   UNKNOWN          - hours or rupees; no registered source measures it

MANUAL_WORK = [
    dict(id="MW-01", stage="S02", measure_type="STRUCTURAL_COUNT",
         metric="Mandated activities per institution per year",
         value="16+",
         detail="3 IIC Calendar activities per quarter (12/yr) plus 1 "
                "Celebration per quarter (4/yr).",
         grade="DOCUMENTARY", source_ids=["GOV-020"], cross_ref="P-A02"),
    dict(id="MW-02", stage="S02", measure_type="STRUCTURAL_COUNT",
         metric="Evidence artefacts per activity report",
         value="8",
         detail="4 social media links + 2 photographs + 1 video URL + 1 "
                "document upload.",
         grade="DOCUMENTARY", source_ids=["GOV-021"], cross_ref="P-A02"),
    dict(id="MW-03", stage="S02", measure_type="STRUCTURAL_COUNT",
         metric="Evidence artefacts per institution per year",
         value="128+",
         detail="16+ activities x 8 artefacts. Arithmetic on two registered "
                "portal requirements.",
         grade="DOCUMENTARY", source_ids=["GOV-020", "GOV-021"],
         cross_ref="P-A02"),
    dict(id="MW-04", stage="S11", measure_type="STRUCTURAL_COUNT",
         metric="NIRF Innovation screens per discipline",
         value="~11",
         detail="A university with 4 disciplines files the Innovation form "
                "4x.",
         grade="DOCUMENTARY", source_ids=["GOV-028"], cross_ref="D6"),
    dict(id="MW-05", stage="S09", measure_type="STRUCTURAL_COUNT",
         metric="Per-startup NIRF fields hand-typed",
         value="7",
         detail="Name, DPIIT number, amount, funding organisation, year, "
                "achievement level, investment type - per discipline per "
                "year, with no auto-population from MCA, GST, ROC or DPIIT.",
         grade="DOCUMENTARY", source_ids=["GOV-028"], cross_ref="Diagram 5 N6"),
    dict(id="MW-06", stage="S11", measure_type="STRUCTURAL_COUNT",
         metric="Mandated reporting systems per institution",
         value="4",
         detail="IIC Portal, YUKTI-NIR, ARIIA DCS, NIRF Innovation - two of "
                "which (IIC, YUKTI) use separate credentials.",
         grade="DOCUMENTARY",
         source_ids=["GOV-018", "GOV-023", "GOV-031", "GOV-028", "GOV-025"],
         cross_ref="D5"),
    dict(id="MW-07", stage="S11", measure_type="STRUCTURAL_COUNT",
         metric="Institutional roles on the IIC council alone",
         value="12",
         detail="President, VP, Convener and nine named coordinator roles, "
                "on top of the 25 institutional roles mapped in Phase 2.",
         grade="DOCUMENTARY", source_ids=["GOV-018"], cross_ref="Phase 2"),
    dict(id="MW-08", stage="ALL", measure_type="UNKNOWN",
         metric="Hours of manual consolidation per reporting cycle",
         value="UNKNOWN",
         detail="Phase 10 P-A10 states this is not measured and calls it the "
                "highest-value unknown in Section A.",
         grade="UNKNOWN", source_ids=[], cross_ref="P-A10:554"),
    dict(id="MW-09", stage="ALL", measure_type="UNKNOWN",
         metric="Rupees spent on manual reporting labour per year",
         value="UNKNOWN",
         detail="No registered source prices the labour. OQ-03 (willingness "
                "to pay) is unmeasured and blocked on Phase 3B.",
         grade="UNKNOWN", source_ids=[], cross_ref="OQ-03"),
    dict(id="MW-10", stage="S01", measure_type="UNKNOWN",
         metric="Hours per idea logged",
         value="UNKNOWN",
         detail="No registered source measures idea-intake effort.",
         grade="UNKNOWN", source_ids=[], cross_ref="P-A10"),
]


# ==========================================================================
# External benchmarks - SEPARATE register, excluded from the 66-cell matrix
# ==========================================================================

EXTERNAL_BENCHMARKS = [
    dict(id="XB-01", name="NIRF Innovation parameters 2025",
         detail="FSI 0.25, IA 0.15, RIO 0.30, PII 0.10, AIE 0.10, Perception "
                "0.10. Weights changed from 2024.",
         grade="DOCUMENTARY", source_ids=["GOV-026"],
         relevance="Sets the scoring surface StartupHub's reporting output "
                   "must satisfy."),
    dict(id="XB-02", name="NIRF FSI startup sub-metric",
         detail="SU = 20 x f(N_vsp), N_vsp = DPIIT-recognised startups in "
                "previous 3 years. 5 marks of the final Innovation score "
                "hinge on one countable.",
         grade="DOCUMENTARY", source_ids=["GOV-027"],
         relevance="The single most quantified institutional incentive in "
                   "the mandated stack."),
    dict(id="XB-03", name="ARIIA DCS cross-portal fetch",
         detail="ARIIA fetches from IIC, NISP, YUKTI and Innovation "
                "Ambassador portals, reducing submission effort by checking "
                "redundancy. One-directional, ARIIA-scoped only.",
         grade="DOCUMENTARY", source_ids=["GOV-031"],
         relevance="The only existing cross-portal de-duplication, and the "
                   "template for what StartupHub generalises."),
    dict(id="XB-04", name="Factly/Dataful NIRF startup dataset",
         detail="6,817 rows, 204 institutions, 5,490 distinct ventures, "
                "4,538 registration numbers, 26 states, 80 cities, "
                "2024-2026. Monetised from public DCS PDFs.",
         grade="DOCUMENTARY", source_ids=["GOV-029", "GOV-030"],
         relevance="Proves institution-submitted innovation data is already "
                   "public and already packaged by a third party."),
    dict(id="XB-05", name="State Startup Ranking (SRF) 5.0",
         detail="Results announced 16 Jan 2026; 34 States/UTs participated; "
                "19 Action Points, 6 Reform Areas. Best Performer Cat A = "
                "Gujarat.",
         grade="DOCUMENTARY", source_ids=["GOV-035"],
         relevance="State-level pressure that propagates down to HEI "
                   "reporting expectations."),
    dict(id="XB-06", name="Maharashtra Startup Policy 2025",
         detail="Commits to an online system mapping startups, incubators, "
                "accelerators, innovation labs, investors and mentors under "
                "a unique ID.",
         grade="DOCUMENTARY", source_ids=["GOV-036"],
         relevance="A state building the registry StartupHub would sit "
                   "under - both a channel and a competitive risk."),
    dict(id="XB-07", name="NIDHI-PRAYAS 2.0 NOC requirement",
         detail="Students/faculty must submit an NOC confirming IP vests "
                "entirely with the innovator or startup.",
         grade="DOCUMENTARY", source_ids=["GOV-037"],
         relevance="An IP-vesting requirement with no portal to enforce it - "
                   "StartupHub's IPR docket (D2) is the enforcement "
                   "point."),
    dict(id="XB-08", name="MeitY Startup Hub IP due diligence",
         detail="Mandates TRL benchmarking and IP due diligence: ownership "
                "clarity, freedom to operate, defensibility. Distinguishes "
                "ownership vs a 2-year university tech-transfer licence.",
         grade="DOCUMENTARY", source_ids=["GOV-038"],
         relevance="The most explicit institutional statement that TRL and "
                   "IP must be joined - StartupHub D1 + D2."),
    dict(id="XB-09", name="BHASKAR ID",
         detail="DPIIT launched BHASKAR (Bharat Startup Knowledge Access "
                "Registry) 16 Sep 2024, issuing an ecosystem-universal "
                "BHASKAR ID.",
         grade="DOCUMENTARY", source_ids=["GOV-039"],
         relevance="A national identity layer StartupHub must key to, not "
                   "duplicate."),
    dict(id="XB-10", name="National Startup Master Data (planned)",
         detail="DPIIT plans to overhaul BHASKAR into a National Startup "
                "Master Data registry tracking the startup lifecycle. MeitY "
                "Startup Hub floated a similar tender.",
         grade="DOCUMENTARY", source_ids=["GOV-040"],
         relevance="The largest structural risk and the largest channel "
                   "opportunity in the segment."),
    dict(id="XB-11", name="MAARG national mentorship platform",
         detail="AI matchmaking, session scheduling, cohort programmes and "
                "dashboards.",
         grade="DOCUMENTARY", source_ids=["GOV-041"],
         relevance="Mandated mentorship surface; StartupHub must integrate, "
                   "not compete."),
    dict(id="XB-12", name="Kerala Startup Mission scale",
         detail="375+ IEDCs across colleges and universities, 27 R&D "
                "institutions, 63 incubators; issues a KSUM UID as a third "
                "identity layer.",
         grade="DOCUMENTARY", source_ids=["GOV-042"],
         relevance="The densest documented state ecosystem and a model for "
                   "how far a UID layer can reach."),
]


# ==========================================================================
# Gaps that route to the Phase 3B interview instrument
# ==========================================================================

def evidence_gaps():
    """Every cell that is not DOCUMENTARY, plus the UNKNOWN manual-work rows."""
    gaps = []
    for c in CELLS:
        if c["grade"] in ("UNKNOWN", "INFERRED"):
            gaps.append(dict(
                stage=c["stage"],
                stage_name=STAGE_BY_ID[c["stage"]]["name"],
                question=c["question"],
                grade=c["grade"],
                still_needs=c["still_needs"] or
                            "Close via Phase 3B interview.",
                cross_ref=c["cross_ref"],
            ))
    for mw in MANUAL_WORK:
        if mw["measure_type"] == "UNKNOWN":
            gaps.append(dict(
                stage=mw["stage"],
                stage_name=(STAGE_BY_ID[mw["stage"]]["name"]
                            if mw["stage"] in STAGE_BY_ID else "All stages"),
                question=mw["metric"],
                grade="UNKNOWN",
                still_needs="Measure via Phase 3B interview.",
                cross_ref=mw["cross_ref"],
            ))
    return gaps


# ==========================================================================
# Accessors
# ==========================================================================

def cells():
    return CELLS


def cells_for(stage_id):
    return [c for c in CELLS if c["stage"] == stage_id]


def cells_for_question(qkey):
    return [c for c in CELLS if c["question"] == qkey]


def grade_counts():
    counts = {g: 0 for g in GRADES}
    for c in CELLS:
        counts[c["grade"]] += 1
    return counts


def stage_grade_counts(stage_id):
    counts = {g: 0 for g in GRADES}
    for c in cells_for(stage_id):
        counts[c["grade"]] += 1
    return counts


def source_map():
    """stage -> question -> sorted list of registered source ids."""
    sm = {}
    for c in CELLS:
        sm.setdefault(c["stage"], {})[c["question"]] = sorted(c["source_ids"])
    return sm


def all_source_ids():
    ids = set()
    for c in CELLS:
        ids.update(c["source_ids"])
    for mw in MANUAL_WORK:
        ids.update(mw["source_ids"])
    for bp in BREAKPOINTS:
        ids.update(bp["source_ids"])
    for xb in EXTERNAL_BENCHMARKS:
        ids.update(xb["source_ids"])
    for src in TWO_TRACK["join_source_ids"]:
        ids.add(src)
    for rt in TWO_TRACK["rekey_targets"]:
        ids.update(rt["source_ids"])
    return sorted(ids)


def summary():
    gc = grade_counts()
    return dict(
        schema_version=SCHEMA_VERSION,
        build_date=BUILD_DATE,
        stages=len(STAGES),
        questions=len(QUESTIONS),
        cells=len(CELLS),
        documentary=gc["DOCUMENTARY"],
        inferred=gc["INFERRED"],
        unknown=gc["UNKNOWN"],
        not_applicable=gc["NOT_APPLICABLE"],
        zero_evidence_stages=[s["id"] for s in STAGES if s["evidence"] == "zero"],
        substantial_stages=[s["id"] for s in STAGES
                            if s["evidence"] == "substantial"],
        partial_stages=[s["id"] for s in STAGES if s["evidence"] == "partial"],
        breakpoints=len(BREAKPOINTS),
        manual_work_rows=len(MANUAL_WORK),
        structural_counts=sum(1 for m in MANUAL_WORK
                              if m["measure_type"] == "STRUCTURAL_COUNT"),
        unknown_manual=sum(1 for m in MANUAL_WORK
                           if m["measure_type"] == "UNKNOWN"),
        external_benchmarks=len(EXTERNAL_BENCHMARKS),
        evidence_gaps=len(evidence_gaps()),
        distinct_sources=len(all_source_ids()),
        interviews=0,
    )


# ==========================================================================
# Validation - mirrors the Phase 12 discipline
# ==========================================================================

def validation():
    """Return a list of (ok, name, expected, actual) tuples."""
    checks = []
    ok = True

    # 1. Cell count and shape
    checks.append((len(CELLS) == 66, "66 cells present", "66", len(CELLS)))
    pair_set = {(c["stage"], c["question"]) for c in CELLS}
    expected_pairs = {(s["id"], q["key"]) for s in STAGES for q in QUESTIONS}
    checks.append((pair_set == expected_pairs, "all 11x6 pairs present",
                   len(expected_pairs), len(pair_set)))

    # 2. Grade vocabulary
    bad = [f"{c['stage']}/{c['question']}={c['grade']}"
           for c in CELLS if c["grade"] not in GRADES]
    checks.append((not bad, "grades in vocabulary", "clean", bad[:5] or "clean"))
    bad_f = [f"{c['stage']}/{c['question']}"
             for c in CELLS
             if any(g in c["answer"] or g in c["basis"] for g in FORBIDDEN_GRADES)]
    checks.append((not bad_f, "no ASSUMED/HYPOTHESIS in cells", "clean",
                   bad_f[:5] or "clean"))

    # 3. Banned fabrication strings
    bad_b = []
    for c in CELLS:
        for banned in BANNED_STRINGS:
            if banned in c["answer"] or banned in c["basis"]:
                # Diagram-5 GOOGLE SHEET reconstruction is allowed, but only
                # when the cell explicitly names Diagram 5 as its cross_ref.
                if banned == "Google Sheet" and "Diagram 5" in c["cross_ref"]:
                    continue
                bad_b.append(f"{c['stage']}/{c['question']}: {banned}")
    checks.append((not bad_b, "no banned fabrication strings", "clean",
                   bad_b[:5] or "clean"))

    # 4. Zero-evidence stages stay UNKNOWN
    for sid in ("S08", "S10"):
        st = stage_grade_counts(sid)
        checks.append((st["UNKNOWN"] == 6,
                       f"{sid} ships 6 UNKNOWN cells", 6, st["UNKNOWN"]))

    # 5. Registered sources only
    try:
        reg_ids = set()
        reg = ROOT / "00_Research_Index" / "Source_Registry.csv"
        with open(reg, newline="", encoding="utf-8") as fh:
            for row in csv.DictReader(fh):
                reg_ids.add(row["id"].strip())
        unregistered = [s for s in all_source_ids() if s not in reg_ids]
        checks.append((not unregistered, "every cited source_id is registered",
                       "clean", unregistered[:5] or "clean"))
    except FileNotFoundError:
        checks.append((False, "Source_Registry.csv readable", "found", "missing"))

    # 6. Zero interviews
    checks.append((summary()["interviews"] == 0, "interviews conducted", 0,
                   summary()["interviews"]))

    # 7. Breakpoint severity and provenance
    bad_bp = [b["id"] for b in BREAKPOINTS
              if b["severity"] not in (1, 2, 3)
              or (b["grade"] == "DOCUMENTARY" and not b["source_ids"])]
    checks.append((not bad_bp, "breakpoints well-formed", "clean",
                   bad_bp[:5] or "clean"))

    # 8. Manual-work measure types
    bad_mw = [m["id"] for m in MANUAL_WORK
              if m["measure_type"] not in ("STRUCTURAL_COUNT", "UNKNOWN")]
    checks.append((not bad_mw, "manual-work measure types valid", "clean",
                   bad_mw[:5] or "clean"))

    # 9. UNKNOWN rows carry a still_needs or cross_ref
    unclosed = [f"{c['stage']}/{c['question']}" for c in CELLS
                if c["grade"] == "UNKNOWN"
                and not (c["still_needs"] or c["cross_ref"])]
    checks.append((not unclosed, "every UNKNOWN cell names what it needs",
                   "clean", unclosed[:5] or "clean"))

    # 10. Two-track join cites registered sources
    join_ok = all(s in all_source_ids()
                  for s in TWO_TRACK["join_source_ids"])
    checks.append((join_ok, "two-track join cites registered sources",
                   "clean", TWO_TRACK["join_source_ids"]))

    # 11. External benchmarks are DOCUMENTARY and registered
    bad_xb = [x["id"] for x in EXTERNAL_BENCHMARKS
              if x["grade"] != "DOCUMENTARY" or not x["source_ids"]]
    checks.append((not bad_xb, "external benchmarks documentary with sources",
                   "clean", bad_xb[:5] or "clean"))

    ok = all(c[0] for c in checks)
    return checks, ok


# ==========================================================================
# CLI
# ==========================================================================

def main():
    checks, ok = validation()
    s = summary()
    print("Phase 13 - Customer Journey Research")
    print(f"  stages={s['stages']} questions={s['questions']} "
          f"cells={s['cells']}")
    print(f"  DOCUMENTARY={s['documentary']} INFERRED={s['inferred']} "
          f"UNKNOWN={s['unknown']} N/A={s['not_applicable']}")
    print(f"  substantial={len(s['substantial_stages'])} "
          f"partial={len(s['partial_stages'])} "
          f"zero={len(s['zero_evidence_stages'])} "
          f"({', '.join(s['zero_evidence_stages'])})")
    print(f"  breakpoints={s['breakpoints']} "
          f"structural_counts={s['structural_counts']} "
          f"unknown_manual={s['unknown_manual']} "
          f"external_benchmarks={s['external_benchmarks']} "
          f"evidence_gaps={s['evidence_gaps']}")
    print(f"  distinct_sources={s['distinct_sources']} interviews={s['interviews']}")
    fails = [c for c in checks if not c[0]]
    print(f"  validation: {len(checks) - len(fails)}/{len(checks)} checks passed")
    for okc, name, exp, act in fails:
        print(f"    FAIL  {name}: expected={exp} actual={act}")
    if not ok:
        sys.exit(1)


if __name__ == "__main__":
    main()
