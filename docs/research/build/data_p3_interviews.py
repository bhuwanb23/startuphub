#!/usr/bin/env python3
"""StartupHub Phase 3B - the interview programme.

todo.md PHASE 3 (lines 342-472) specifies a user-interview phase with five
question banks: current workflow, pain, existing tools, buying, value. This
module turns that spec into instruments that can actually be run.

WHY THE SPEC HAD TO BE REWRITTEN TO BE USABLE:

  The spec says: don't ask "Would you use StartupHub?" - it "produces weak
  validation". It is right, and the fix is not softer questions, it is
  ANCHORING EVERY BANK TO A RECENT REAL EVENT. So every question here carries
  a `probe` (what to follow with) and an `evidence_hook` (which prior finding it
  is designed to test or to falsify). A question with no evidence hook is a
  question we cannot act on, and the build rejects it.

EVIDENCE RULES (repo standard, D-017):

  DOCUMENTED     - multiple primary sources read and cited
  SINGLE-SOURCE  - one primary source
  HYPOTHESIS     - structurally implied, NOT evidenced

  THIS MODULE CONTAINS NO INTERVIEW EVIDENCE. It contains instruments, targets
  and falsification tests. Zero interviews have been conducted. `validation()`
  enforces that no instrument may smuggle in a result.

THE ONE HARD RULE, ENCODED IN validation():

  Every instrument question must be answerable from OBSERVED PAST BEHAVIOUR.
  Any question containing a forward-looking purchase-intent frame
  ("would you", "would you pay", "will you", "do you plan to") is REJECTED.
  Hypothetical willingness produces answers that feel like validation and
  behave like noise.
"""

import re

SCHEMA_VERSION = "1.0"
BUILD_DATE = "2026-10-19"

# Phrasings that signal a hypothetical-intent frame. These are banned outright.
BANNED_INTENT_FRAMES = [
    "would you", "will you", "do you plan", "do you intend", "are you likely",
    "how much would you", "would you pay", "do you think you would",
    "if we built", "if startuphub", "how interested are you", "on a scale of 1 to 10",
]


# ==========================================================================
# 1. The five question banks from the todo.md spec, reframed
# ==========================================================================
# anchors   - the past event the question hangs off
# probe     - the follow-up that turns an answer into evidence
# hook      - what finding/OQ/problem this tests (must exist in phase0-3)
# falsifies - the claim that dies if the answer goes the stated way

BANKS = [
    dict(
        id="Q1", name="Current workflow",
        spec_questions=[
            "How do you currently track startups?",
            "Where is startup data stored?",
            "How do you manage mentors?",
            "How do you track incubation milestones?",
            "How do you manage IPR?",
            "How do you generate reports?",
            "How do you track student innovation?",
            "What software do you currently use?",
        ],
        rationale=(
            "This bank is the whole point of the phase. Phase 1's P-A10 says "
            "institution-wide innovation data is consolidated by hand, but we "
            "have only ever seen the EXPORT - never the tool upstream of it. "
            "Every question here is anchored to the last completed cycle, not "
            "to the general present."
        ),
    ),
    dict(
        id="Q2", name="Pain",
        spec_questions=[
            "What takes the most time?",
            "What gets missed?",
            "What information is difficult to obtain?",
            "What do you currently do manually?",
            "What causes reporting problems?",
            "What information do you wish you had in one dashboard?",
        ],
        rationale=(
            "Anchored to the last submission cycle. 'What takes the most time' "
            "is unusable without a timeframe; the reframed form asks for hours "
            "spent on the last cycle, which is answerable."
        ),
    ),
    dict(
        id="Q3", name="Existing tools",
        spec_questions=[
            "What software do you currently pay for?",
            "What is free?",
            "What do you use Excel for?",
            "What do you use WhatsApp for?",
            "What systems does the institution already have?",
        ],
        rationale=(
            "This is the bank that tests the 'free incumbent' assumption "
            "underpinning StartupHub's entire pricing model. Phase 0 assumes "
            "Excel / Sheets / WhatsApp are free incumbents. That is currently "
            "an ASSUMPTION, not a finding."
        ),
    ),
    dict(
        id="Q4", name="Buying",
        spec_questions=[
            "Who approves new software?",
            "Who controls the budget?",
            "How long does procurement take?",
            "What budget category would this fall under?",
            "What would prevent you from buying it?",
        ],
        rationale=(
            "Phase 2 proved only 4 of 25 roles hold DOCUMENTED budget "
            "authority, and none is Class A. This bank is the only way to find "
            "out whether that documentary finding matches reality - and whether "
            "the person we interview can even authorise anything."
        ),
    ),
    dict(
        id="Q5", name="Value",
        spec_questions=[
            "If this problem disappeared tomorrow, what would that save you?",
        ],
        rationale=(
            "todo.md is explicit that this is the right question and "
            "'would you pay Rs 1.2 lakh' is the wrong one. It is reframed here "
            "to demand a quantity - hours, or rupees already committed - "
            "because 'it would save a lot of time' is not evidence."
        ),
    ),
]


# ==========================================================================
# 2. Role-class guides - four classes, matching Phase 2's taxonomy
# ==========================================================================
# Class A  Mandated IIC seats           - the integration point, first target
# Class B  Adjacent institutional offices - Registrar/Dean, VC, Finance
# Class C  Off-portal gatekeepers        - Purchase Committee, IT Admin, Audit
# Class D  Individual users              - students, founders
#
# Each guide states which banks are PRIMARY for that role, which are SKIP, and
# why. Skipping matters: asking a student who approves software wastes the slot.

ROLE_GUIDES = [
    dict(
        id="G-A", cls="A", title="IIC Convener / Coordinator / ARIIA-NIRF nodal officer",
        phase2_refs=["A-03", "A-01", "A-10"],
        priority=1,
        banks={"Q1": "PRIMARY", "Q2": "PRIMARY", "Q3": "PRIMARY",
               "Q4": "SECONDARY", "Q5": "PRIMARY"},
        skip=[],
        why_first=(
            "Phase 1 shows this is one part-time academic doing the work for the "
            "whole institution (SSCET: 40 IIC members, 30 ambassadors, 2 mentors; "
            "NIT Calicut: 29 mentors against 155 ideas). They are simultaneously "
            "the user, the evidence source, and the only plausible internal "
            "champion. They are also the person who already discovered the DPIIT "
            "join problem in practice."
        ),
        questions=[
            dict(q="Walk me through the last NIRF innovation submission you filed, start to finish. Where did you begin?",
                 bank="Q1", probe="What was open on your screen? What was next to it?",
                 hook="P-A10 / F-DPIIT-JOIN",
                 falsifies="If they begin from a single system that already holds a venture list, the 'no venture register' gap is smaller than Phase 1 concluded."),
            dict(q="In that same submission, you had to record a TRL for each innovation. Where did the DPIIT registration number come from?",
                 bank="Q1", probe="Did you ask the founder? Look it up on the DPIIT portal? Did someone else give you a list?",
                 hook="OQ-32", falsifies="Resolves OQ-32. Determines whether the product is a better spreadsheet or a workflow carrier."),
            dict(q="When you could not find a DPIIT number for a startup, what did you actually type into the cell?",
                 bank="Q2", probe="Did you leave it blank, put a placeholder, or drop the row entirely?",
                 hook="OQ-33 / F-DPIIT-JOIN",
                 falsifies="Explains the DIPP0000 placeholders in 3 real forms."),
            dict(q="How long did that whole submission take you, and how much of it was re-work?",
                 bank="Q2", probe="Roughly how many hours? Was there a point where you had to redo rows?",
                 hook="P-A08 / P-A02",
                 falsifies="P-A08 grades hand-assembly DOCUMENTED; this tests whether it is felt as rework."),
            dict(q="What do you use between cycles to keep track of these startups - before the form asks you to?",
                 bank="Q3", probe="Excel? Google Sheets? WhatsApp groups? A register someone else maintains?",
                 hook="P-A10 / P-A01",
                 falsifies="P-A01 asks whether institutions keep a venture register at all."),
            dict(q="Is that spreadsheet yours, or does it come from someone else in the institute?",
                 bank="Q3", probe="Who else edits it? Does the Registrar see it?",
                 hook="OQ-28 / P-A04",
                 falsifies="Tests whether Convener and Incubation Manager are one person, and whether data flows upward."),
            dict(q="When ARIIA asks for a similar count a few weeks later, do you reuse the same list?",
                 bank="Q1", probe="Have you ever compared the two numbers?",
                 hook="OQ-34 / F-ARIYA-AY",
                 falsifies="If they reuse and reconcile, the duplication problem is weaker than claimed."),
            dict(q="You asked for Rs 1.2 lakh for something. Where did that number come from?",
                 bank="Q5", probe="Did you compare it to something you already spend, or was it a guess?",
                 hook="D-007 / pricing ledger",
                 falsifies="Tests whether the price band is anchored to anything real."),
        ],
    ),
    dict(
        id="G-B", cls="B", title="Registrar / Dean (ICSR) / Controller of Examinations-adjacent office",
        phase2_refs=["C-01", "B-01", "B-02"],
        priority=2,
        banks={"Q1": "PRIMARY", "Q2": "SECONDARY", "Q3": "SECONDARY",
               "Q4": "PRIMARY", "Q5": "SECONDARY"},
        skip=[],
        why_first=(
            "Phase 2's only role with DOCUMENTED budget authority in Class C. "
            "Interviewing them at the SAME institution as the Convener is the "
            "entire point: two accounts of one portfolio that can be compared "
            "line by line."
        ),
        questions=[
            dict(q="Does the institute's official record of startups come to you, or do you go and get it?",
                 bank="Q1", probe="Who compiles it? How often? In what format?",
                 hook="P-A10 / OQ-29",
                 falsifies="P-A10 documents consolidation by hand; this tests who owns the output."),
            dict(q="Last time an annual report or NIRF filing needed innovation numbers, what did you do with them?",
                 bank="Q1", probe="Did you chase anyone? Did you get them once or repeatedly?",
                 hook="P-A04 / P-A08",
                 falsifies="P-A04 says one coordinator is the integration point for several problems."),
            dict(q="Which budget head would a Rs 1-2 lakh annual software purchase come from?",
                 bank="Q4", probe="Have you approved anything in this range? Under which head?",
                 hook="OQ-29",
                 falsifies="OQ-29 asks exactly this. Phase 0 has no answer."),
            dict(q="Walk me through the last software purchase you approved. What was the route?",
                 bank="Q4", probe="Was there a committee? GeM? Direct purchase? How many weeks?",
                 hook="Phase 2 procurement ladders / OQ-27",
                 falsifies="Tests whether the Rs 50K-Rs 10L committee spread is reality."),
            dict(q="What would make you NOT approve this?",
                 bank="Q4", probe="Is there a security questionnaire? A data-localisation clause?",
                 hook="OQ-30 / EcoSync SOC2 disqualification",
                 falsifies="OQ-30 asks whether IT Admin has a veto."),
            dict(q="Is there an existing system that already holds this, and why wasn't it used?",
                 bank="Q3", probe="ERP? Student information system? Existing software renewal?",
                 hook="Phase 0 free-incumbent assumption",
                 falsifies="If a paid system already exists, the incumbent is not free."),
        ],
    ),
    dict(
        id="G-C", cls="C", title="Purchase Committee member / IT Administrator / Finance officer",
        phase2_refs=["C-02", "C-03", "C-04"],
        priority=3,
        banks={"Q1": "SKIP", "Q2": "SECONDARY", "Q3": "SECONDARY",
               "Q4": "PRIMARY", "Q5": "SKIP"},
        skip=["Q1", "Q5"],
        why_first=(
            "They control the money and the security gate but do not do the "
            "work, so workflow questions are wasted slots. Phase 2 found the IT "
            "Administrator appears in ZERO procurement instruments by name."
        ),
        questions=[
            dict(q="What falls below a committee, and what goes to it?",
                 bank="Q4", probe="Is there a de-minimis threshold? Has it changed?",
                 hook="Phase 2 procurement ladders",
                 falsifies="Confirms or breaks the documented Rs 50K-Rs 10L spread."),
            dict(q="If a vendor must store venture data on their own servers, who signs that off?",
                 bank="Q4", probe="Has anyone ever refused a purchase on security grounds?",
                 hook="OQ-30", falsifies="Resolves whether IT Admin has a real veto."),
            dict(q="What security documents do you require from a software vendor?",
                 bank="Q3", probe="SOC 2? ISO 27001? Data localisation? Government cloud only?",
                 hook="Phase 0 competitor disqualification (EcoSync)",
                 falsifies="Tests whether on-premise/data-localisation is universal."),
        ],
    ),
    dict(
        id="G-D", cls="D", title="Student founder / incubator participant",
        phase2_refs=["D-01", "D-02"],
        priority=4,
        banks={"Q1": "PRIMARY", "Q2": "PRIMARY", "Q3": "PRIMARY",
               "Q4": "SKIP", "Q5": "SECONDARY"},
        skip=["Q4"],
        why_first=(
            "They are the source of the DPIIT number and the person who "
            "experiences the missing record, but they cannot buy anything. The "
            "buying bank is skipped to protect interview time."
        ),
        questions=[
            dict(q="After your startup was recognised, did anyone at the institute ask you for anything - a form, a number, a report?",
                 bank="Q1", probe="Did you get asked for your DPIIT number? Did you have to dig for it?",
                 hook="OQ-32", falsifies="Tests the founder side of the join-key problem."),
            dict(q="Is there any place you can see what stage your own startup is at, that the institute also sees?",
                 bank="Q2", probe="Or is it only the institute that tracks it?",
                 hook="P-A06 / P-A01",
                 falsifies="P-A06 grades stock-not-movement DOCUMENTED."),
            dict(q="When your institute filed a report that mentioned you, did it get anything wrong?",
                 bank="Q2", probe="Did you correct it? Did anyone notice?",
                 hook="P-A02 / P-A06",
                 falsifies="Tests whether the ledger is wrong about real startups."),
            dict(q="What do you personally use to keep track of your startup right now?",
                 bank="Q3", probe="Notes app? WhatsApp? Google Sheets? Nothing?",
                 hook="Phase 0 free-incumbent assumption",
                 falsifies="Tests the 'free incumbent' claim from the user side."),
        ],
    ),
]


# Named handles, so hypotheses can point at a guide without string lookups.
G_A, G_B, G_C, G_D = ROLE_GUIDES


# ==========================================================================
# 3. Falsification matrix - what observation would kill what claim
# ==========================================================================
# This is the core discipline of the phase. Each hypothesis carries the single
# observation that would refute it. A hypothesis with no refutation condition is
# unfalsifiable and cannot be tested in an interview.

HYPOTHESES = [
    dict(
        id="H-01",
        claim="Institutions have no venture register; StartupHub's portfolio is the first.",
        source="P-A01 / P-A06 (documentary, 36-doc corpus)",
        status="HYPOTHESIS",
        refuting_observation=(
            "A Convener opens an existing system - institute ERP, a student "
            "information system, or a maintained shared sheet - that already "
            "lists their startups with names, stages and dates."
        ),
        if_refuted="The wedge is 'one place to see it', not 'first record'. Pricing and moat both weaken.",
        interview=G-B, question=1,
    ),
    dict(
        id="H-02",
        claim="The NIRF DPIIT join is broken because the officer lacks the number.",
        source="F-DPIIT-JOIN (DOCUMENTED, 7 forms, 32/354 measured)",
        status="SINGLE-SOURCE",
        refuting_observation=(
            "The Convener says they receive a ready list of DPIIT numbers with "
            "stages already filled, from the institute or a state portal."
        ),
        if_refuted="The join failure is a form-design artefact nobody actually feels, which removes the Phase 3A headline as a product driver.",
        interview=G-A, question=2,
    ),
    dict(
        id="H-03",
        claim="Excel / Sheets / WhatsApp are the free incumbent StartupHub displaces.",
        source="Phase 0 assumption - NEVER EVIDENCED",
        status="HYPOTHESIS",
        refuting_observation=(
            "The institute already pays for a system that does this work, or "
            "the work is done on the IIC portal itself and costs nothing either way."
        ),
        if_refuted="There is no free incumbent; the comparison set is wrong and the whole positioning is mis-aimed.",
        interview=G-A, question=6,
    ),
    dict(
        id="H-04",
        claim="Coordinated filing deadlines are the forcing event that creates urgency.",
        source="D-007 (Phase 0 inference) / P-A02",
        status="HYPOTHESIS",
        refuting_observation=(
            "The work is done continuously and the deadline simply marks when it "
            "is submitted - no deadline pressure, no rework, no overtime."
        ),
        if_refuted="There is no forcing event, so there is no trigger to sell against. Timing strategy must change entirely.",
        interview=G-A, question=4,
    ),
    dict(
        id="H-05",
        claim="The Convener is the buyer, or can reach the buyer directly.",
        source="Phase 2: 4/25 roles hold budget authority, none Class A",
        status="HYPOTHESIS",
        refuting_observation=(
            "The Convener states they cannot initiate or influence any purchase, "
            "and that the Registrar does not consult them on this at all."
        ),
        if_refuted="There is no internal champion. Go-to-market must start with the Registrar as the entry point instead.",
        interview=G-A, question=6,
    ),
    dict(
        id="H-06",
        claim="Convener and Incubation Manager are often the same person.",
        source="Phase 2 structural observation",
        status="HYPOTHESIS",
        refuting_observation=(
            "They are separate people with separate spreadsheets, neither of "
            "whom sees the other's list."
        ),
        if_refuted="The 'one integration point' framing is wrong and the integration cost of any product is much higher than assumed.",
        interview=G-A, question=6,
    ),
    dict(
        id="H-07",
        claim="Rs 1.2 lakh is inside a plausible institutional budget range.",
        source="Phase 0 anchor: LabelNest verified Rs 75,000/yr",
        status="HYPOTHESIS",
        refuting_observation=(
            "The Registrar describes any purchase at this level as requiring a "
            "committee, a budget cycle wait, and a category that innovation "
            "software does not cleanly fit into."
        ),
        if_refuted="The price band is wrong and must move materially - probably down, and probably to a different billing period.",
        interview=G-B, question=3,
    ),
    dict(
        id="H-08",
        claim="Institutions manage cohorts, so cohort tracking is a real need.",
        source="P-A03, graded HYPOTHESIS",
        status="HYPOTHESIS",
        refuting_observation=(
            "There is no cohort; startups are handled individually as they "
            "arrive, and nobody has ever grouped them."
        ),
        if_refuted="Drop cohort management from the product entirely. Absence from reports was absence of concept, not absence of data.",
        interview=G-A, question=6,
    ),
    dict(
        id="H-09",
        claim="IPR tracking is a real institutional problem, not just a documentation gap.",
        source="P-A07 DOCUMENTED CRITICAL - no institution has a patent deadline calendar",
        status="SINGLE-SOURCE",
        refuting_observation=(
            "IPR is handled by an outside agency or a TTO, deadlines are tracked "
            "on individual researchers' own systems, and the institute itself "
            "never tracks a patent."
        ),
        if_refuted="The CRITICAL finding is a reporting artefact. The patent module loses its justification.",
        interview=G-A, question=5,
    ),
    dict(
        id="H-10",
        claim="On-premise / data-localisation is a near-universal procurement condition.",
        source="Phase 0 inference from competitor filtering",
        status="HYPOTHESIS",
        refuting_observation=(
            "A cloud SaaS product with no on-premise option clears procurement "
            "without objection, because the data is non-sensitive."
        ),
        if_refuted="The deployment constraint is soft and the vendor list narrows sharply.",
        interview=G-C, question=3,
    ),
]


# ==========================================================================
# 4. Recruitment shortlist - 6 institutions, evidence-ranked
# ==========================================================================
# Ranking rule: an institution is a BETTER interview if its documentary record
# CONTRADICTS ITSELF. A contradiction is a live question; a clean report is not.
# This inverts the usual instinct to interview the most impressive institutions.

SHORTLIST = [
    dict(
        rank=1, institution="NIT Calicut",
        pair=("IIC Coordinator / Convener", "Registrar or Dean ICSR"),
        contradiction="55 vs 17 startups in one PDF; Rs 1,51,488 vs Rs 16,00,000 awareness spend (P-A08)",
        why="The single largest documented internal contradiction in the corpus. Both halves of that discrepancy were produced by the same office in the same document, so the Convener can explain it - or cannot, which is equally informative.",
        tests=["H-01", "H-03", "H-04", "H-05"],
    ),
    dict(
        rank=2, institution="NIT Andhra Pradesh",
        pair=("ARIIA/NIRF nodal officer", "Registrar"),
        contradiction="6 startups recognised, TRL evidence for only 2 - the worst join rate measured (67%)",
        why="The Phase 3A headline has a live example. Asking this officer directly where the other 4 DPIIT numbers went is the single highest-value question in the whole programme.",
        tests=["H-02", "H-01", "H-03"],
    ),
    dict(
        rank=3, institution="NIT Warangal",
        pair=("ARIIA/NIRF nodal officer", "Registrar or IIC President"),
        contradiction="TRL table carries a DPIIT number absent from the recognised table (reverse gap)",
        why="A contradiction in the opposite direction - the data exists but is filed under a key nobody recognised. Tests whether anyone reconciles the two tables (OQ-34).",
        tests=["H-02", "H-05"],
    ),
    dict(
        rank=4, institution="Teresa's College",
        pair=("IIC Coordinator", "Principal or Registrar"),
        contradiction="A 13-item grant narrative inserted into a field meant for a number (P-A02)",
        why="The most vivid evidence of form abuse in the corpus, and the officer who typed it can describe the pressure. Best case for H-04 - is the deadline actually forcing bad data?",
        tests=["H-04", "H-03", "H-01"],
    ),
    dict(
        rank=5, institution="Dr. N.G.P. Arts and Science College",
        pair=("IIC Coordinator", "Principal"),
        contradiction="Grant figure reconciles to two unrelated DBT grants - aggregation presented as one number (P-A09)",
        why="Tests whether institutions can state what a rupee of government money actually funded. Directly probes the stock-vs-flow problem behind P-A06.",
        tests=["H-01", "H-08", "H-03"],
    ),
    dict(
        rank=6, institution="SSCET",
        pair=("IIC Coordinator", "Principal or Dean"),
        contradiction="40 IIC members, 30 ambassadors, 2 mentors - ratio implies capacity, not pipeline",
        why="A high-volume institution with an implausibly thin mentoring base. Best case for testing H-08 (are cohorts real?) and H-03 (what is the 2-mentor process actually doing).",
        tests=["H-08", "H-03", "H-06"],
    ),
]

# Deliberately NOT on the list, and why.
SHORTLIST_EXCLUSIONS = [
    dict(institution="IIT Kanpur",
         reason="Its ARIIA records 0 IIC stars while running a mature incubator. Tempting, but the 0 is probably an officer who delegates the form - we would get the wrong respondent. Approach second, through a named coordinator."),
    dict(institution="IIT Bombay / IISc",
         reason="Excellent documentary evidence, but a Convener there is unlikely to be doing the data work personally. We need people who touch the spreadsheet, not people who sign it."),
]


# ==========================================================================
# 5. Capture, consent and coding
# ==========================================================================
CONSENT_BLOCK = [
    "This is a research interview about how your institution handles startup and innovation records. It is not a sales call and not a product demo.",
    "We will not share anything you tell us with other institutions, or name your institution in any external material without asking you first.",
    "We may quote you anonymously, attributed only to your role and institution type (for example 'a Convener at a central university'), unless you ask us not to.",
    "You may skip any question, or stop the interview at any point, with no consequence.",
    "We are recording notes and, with your permission, audio, purely so we do not misquote you.",
    "There is no payment. If you would like a summary of what we learn, we will send it.",
]

CODING_SCHEME = [
    dict(code="W-TOOL", bank="Q1", definition="Named tool, file or channel used to hold startup data",
         evidence="must name the artefact", falsifies="H-01, H-03"),
    dict(code="W-SOURCE", bank="Q1", definition="Where a specific required field physically came from",
         evidence="must name the person, system or portal", falsifies="H-02"),
    dict(code="W-REWORK", bank="Q2", definition="Work redone because a number was wrong or missing",
         evidence="must quantify (rows, hours)", falsifies="H-04"),
    dict(code="W-HOURS", bank="Q2", definition="Time spent on the last completed cycle",
         evidence="numeric estimate the respondent accepts", falsifies="H-04"),
    dict(code="W-ORPHAN", bank="Q2", definition="A startup the institute lost track of",
         evidence="narrative + how it was noticed", falsifies="H-01"),
    dict(code="W-PAID", bank="Q3", definition="Software the institute already pays for that overlaps this job",
         evidence="name + cost if known", falsifies="H-03"),
    dict(code="W-HEAD", bank="Q4", definition="The budget head a purchase would come from",
         evidence="named head", falsifies="H-07"),
    dict(code="W-GATE", bank="Q4", definition="A person or rule that can block the purchase",
         evidence="named role or cited rule", falsifies="H-10, H-05"),
    dict(code="W-ANCHOR", bank="Q5", definition="What the respondent already spends that this was compared against",
         evidence="a real rupee figure they named", falsifies="H-07"),
    dict(code="W-DEPLOY", bank="Q4", definition="Deployment constraint (on-premise / localisation / cloud)",
         evidence="constraint stated as fact, not preference", falsifies="H-10"),
]

# Rules that make the analysis reproducible rather than anecdotal.
ANALYSIS_RULES = [
    "One interview is an anecdote. No code may be reported as a finding until it appears in at least 3 of 6 institutions, and the count of institutions is always printed beside it.",
    "A claim that contradicts Phase 1 or 3A is recorded as a contradiction, never silently dropped. Phase 1's corpus is evidence too.",
    "Paired interviews are compared on the same four questions: does the Registrar's picture match the Convener's, on venture count, on who owns the data, and on what was last paid for.",
    "Silence is recorded. If a respondent cannot answer a question, that is a coded non-answer and counts toward the finding - an institution that cannot name its own budget head is the finding.",
    "Quotes are verbatim only, with the recording checked. No paraphrase is ever placed in quotation marks.",
    "Every finding states which hypotheses it confirms, refutes, or leaves open. An interview that resolves nothing is still recorded, and still costs time - say so.",
]


# ==========================================================================
# 6. Ollama validation rules - instrument only, never evidence
# ==========================================================================
OLLAMA_RULES = dict(
    purpose=(
        "Validate that the interview guides are answerable and non-leading BEFORE a "
        "human is asked them. A synthetic respondent should produce an answer that is "
        "obviously synthesised and reveals nothing real."
    ),
    forbidden=[
        "any synthetic text entering _exports/ (except _exports/synthetic/, which is excluded from the manifest)",
        "any synthetic sentence being quoted as a respondent",
        "any synthetic count entering a finding, grade, or headline",
        "a synthetic answer being used to 'confirm' a hypothesis",
        "recording synthetic output with a parse_status of 'parsed'",
    ],
    required_marker="SYNTHETIC — NOT EVIDENCE",
    instruction=(
        "Run a synthetic respondent against each guide with a deliberately wrong, "
        "inconsistent persona, to check the questions do not lead the answer. A model "
        "that answers everything smoothly means the question is leading."
    ),
)


# ==========================================================================
# 7. Validation
# ==========================================================================
def validation():
    errs, warns = [], []

    if not BANNED_INTENT_FRAMES:
        errs.append("BANNED_INTENT_FRAMES is empty - the intent-frame guard is off")

    for b in BANKS:
        if not b.get("spec_questions"):
            errs.append(f"{b['id']} has no spec questions")
        if not b.get("rationale"):
            errs.append(f"{b['id']} has no rationale")

    if len(ROLE_GUIDES) != 4:
        errs.append(f"{len(ROLE_GUIDES)} role guides; Phase 2 taxonomy requires 4")

    # Every question must be free of hypothetical-purchase framing.
    for g in ROLE_GUIDES:
        for qq in g["questions"]:
            blob = (qq["q"] + " " + qq["probe"]).lower()
            for bad in BANNED_INTENT_FRAMES:
                if bad in blob:
                    errs.append(f"{g['id']}: hypothetical-intent frame '{bad}' in: {qq['q'][:60]}")

    # Every question must hang off a bank, a hook and a falsifier.
    bank_ids = {b["id"] for b in BANKS}
    for g in ROLE_GUIDES:
        for qq in g["questions"]:
            if qq["bank"] not in bank_ids:
                errs.append(f"{g['id']}: question cites unknown bank {qq['bank']}")
            for field in ("probe", "hook", "falsifies"):
                if not qq.get(field):
                    errs.append(f"{g['id']}: question missing {field}")

    # Role guide banks must cover exactly the five spec banks.
    for g in ROLE_GUIDES:
        if set(g["banks"]) != bank_ids:
            errs.append(f"{g['id']}: bank map {sorted(g['banks'])} != spec banks {sorted(bank_ids)}")
        for b, level in g["banks"].items():
            if level not in ("PRIMARY", "SECONDARY", "SKIP"):
                errs.append(f"{g['id']}/{b}: unknown priority {level}")
            if level == "SKIP" and b not in g["skip"]:
                errs.append(f"{g['id']}/{b}: marked SKIP but not listed in skip[]")
        if not g.get("why_first"):
            errs.append(f"{g['id']} has no why_first")

    # Every hypothesis must be falsifiable and traceable to an interview.
    hids = {h["id"] for h in HYPOTHESES}
    for h in HYPOTHESES:
        for field in ("refuting_observation", "if_refuted", "source", "status"):
            if not h.get(field):
                errs.append(f"{h['id']} missing {field}")
        if h["status"] not in ("HYPOTHESIS", "SINGLE-SOURCE", "DOCUMENTED"):
            errs.append(f"{h['id']}: bad status {h['status']}")
        if not h.get("interview") or h["interview"] not in {g["id"] for g in ROLE_GUIDES}:
            errs.append(f"{h['id']}: interview target not a real guide")
        if not h.get("tests"):
            errs.append(f"{h['id']}: no tests list")

    # Coding scheme must reference real banks and real hypotheses.
    for c in CODING_SCHEME:
        if c["bank"] not in bank_ids:
            errs.append(f"{c['code']}: unknown bank {c['bank']}")
        for hid in re.findall(r"H-\d+", c["falsifies"]):
            if hid not in hids:
                errs.append(f"{c['code']}: references unknown hypothesis {hid}")
        if not c.get("evidence"):
            errs.append(f"{c['code']}: no evidence bar defined")

    if len(SHORTLIST) != 6:
        errs.append(f"shortlist has {len(SHORTLIST)} institutions; plan specifies 6")
    for s in SHORTLIST:
        for field in ("institution", "pair", "contradiction", "why"):
            if not s.get(field):
                errs.append(f"shortlist {s.get('rank')}: missing {field}")
        if len(s["pair"]) != 2:
            errs.append(f"shortlist {s['rank']}: must be a PAIRED interview (2 roles)")
        for hid in s["tests"]:
            if hid not in hids:
                errs.append(f"shortlist {s['rank']}: tests unknown {hid}")

    # The critical claim: no interview results exist.
    blob = str(BANKS) + str(ROLE_GUIDES) + str(HYPOTHESES) + str(SHORTLIST) + str(ANALYSIS_RULES)
    for banned in ["respondents said", "interviewees reported", "in our interviews",
                   "participants told us", "n=6 interviews"]:
        if banned in blob.lower():
            errs.append(f"interview-result claim present in instrument module: '{banned}'")

    if not ANALYSIS_RULES:
        errs.append("ANALYSIS_RULES empty")
    if not CONSENT_BLOCK:
        errs.append("CONSENT_BLOCK empty")

    if len(CONSENT_BLOCK) < 5:
        warns.append("consent block is thin")

    return errs, warns


def summary():
    return dict(
        schema_version=SCHEMA_VERSION,
        build_date=BUILD_DATE,
        interviews_conducted=0,          # the only true number
        banks=len(BANKS),
        spec_questions=sum(len(b["spec_questions"]) for b in BANKS),
        role_guides=len(ROLE_GUIDES),
        questions=sum(len(g["questions"]) for g in ROLE_GUIDES),
        hypotheses=len(HYPOTHESES),
        shortlist=len(SHORTLIST),
        pairing="6 institutions x 2 roles = 12 interviews",
        codes=len(CODING_SCHEME),
        status=dict(HYPOTHESIS=sum(1 for h in HYPOTHESES if h["status"] == "HYPOTHESIS"),
                    **{k: sum(1 for h in HYPOTHESES if h["status"] == k)
                       for k in ("SINGLE-SOURCE", "DOCUMENTED")}),
    )


if __name__ == "__main__":
    import json
    print(json.dumps(summary(), indent=2, ensure_ascii=False))
    e, w = validation()
    print("\nerrors:", e or "none")
    print("warns :", w or "none")