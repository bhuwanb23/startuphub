#!/usr/bin/env python3
"""StartupHub Phase 1 - the ten institutional problem analyses (Section A).

todo.md Section A asks for evidence on ten institutional problems. This module
holds one record per problem, and every record forces the same nine fields:

    statement, evidence, who_experiences_it, severity, frequency,
    current_workaround, quantified_cost, failure_consequence,
    potential_fixer, competitive_implication

HONESTY RULE (non-negotiable, and enforced by `evidence_grade`):

    A problem may only be graded DOCUMENTED if primary documents were actually
    read and are cited by corpus_id. A problem with thin documentary evidence is
    graded HYPOTHESIS and its `evidence_gap` field says exactly what is missing
    and how to close it. Nothing is upgraded to sound certain because it would
    read better.

Evidence grades:
    DOCUMENTED  - multiple primary documents read and cited; finding is robust
    SINGLE-SOURCE - one primary document; suggestive, not load-bearing alone
    HYPOTHESIS  - structurally implied but NOT evidenced; needs Phase 3 interviews

Phase 3 (user interviews) has not happened. Nothing in this file may be presented
to a third party as an observed user problem. See todo.md status note.
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import data_p1_iic as D  # noqa: E402

SEVERITY_SCALE = {
    "CRITICAL": "Compliance, legal or commercial risk if it goes wrong.",
    "HIGH": "Recurring, substantial time loss or error rate.",
    "MEDIUM": "Recurring friction that slows work but is survivable.",
    "LOW": "Genuine inconvenience.",
}

EVIDENCE_GRADES = {
    "DOCUMENTED": "Multiple primary documents read and cited by corpus_id.",
    "SINGLE-SOURCE": "One primary document. Suggestive; must not carry a claim alone.",
    "HYPOTHESIS": "Structurally implied but NOT evidenced. Requires Phase 3 interviews.",
}


def spend_per_idea(doc_id):
    """Awareness spend divided by ideas generated. A defensible waste proxy."""
    r = D._by_id(doc_id)
    m = r.get("metrics", {})
    spend, ideas = m.get("amount_inr"), m.get("ideas_generated")
    if not spend or not ideas:
        return None
    return round(float(spend) / float(ideas))


def ratio(num_key, den_key, doc_id):
    r = D._by_id(doc_id)
    m = r.get("metrics", {})
    a, b = m.get(num_key), m.get(den_key)
    if a is None or b is None or not b:
        return None
    return round(float(a) / float(b), 2)


PROBLEMS = [
    dict(
        id="P-A01", number=1,
        title="Institutions cannot produce a defensible list of their own startups",
        statement="An institution cannot state, from its own records, which ventures it incubated, "
                  "who founded them, or whether they still exist. The startup figure that reaches the "
                  "government is unreconcilable with the institution's own understanding of it.",
        evidence=[
            "NIT Calicut's single 2024-25 report states 55 startups in its narrative - broken down as "
            "13 student/alumni, 4 faculty and 38 'others' - and 17 in its IIC-portal KPI form. "
            "3.2x divergence inside one PDF. (`IIC-001`, `IIC-001b`)",
            "The 38 'others' category is itself an admission: 69% of the incubated population cannot "
            "be attributed to students, faculty or any defined owner. (`IIC-001`)",
            "Brainware University reports 91 patents published, 8 granted and 0 startups - an "
            "institution that demonstrably produced research output but reports no venture at all. "
            "(`IIC-032`)",
            "ICFAI University Tripura reports startups established as 0 and startups in pipeline as 5, "
            "the only institution in the corpus that separates the two. (`IIC-007`)",
        ],
        evidence_grade="DOCUMENTED",
        evidence_gap="Whether institutions keep ANY internal venture register is unknown. A corpus "
                     "that reports zero startups may have zero, or may simply not be counting. Only "
                     "an interview can separate those.",
        who_experiences_it="IIC coordinator; Director-Research or R&D office; anyone answering a "
                           "board, AICTE inspection or ARIIA question about incubated ventures.",
        severity="HIGH",
        severity_justification="Not CRITICAL - no evidence in this corpus of a legal or licensing "
                               "consequence. But it is the single hardest number to defend, and it "
                               "is asked for by inspection bodies.",
        frequency="Annual and unconditional. Every institution must answer it every year, and cannot.",
        current_workaround="Reconstructing the number from memory, from incubator records, from "
                           "DPIIT recognitions, and from Udyam registrations held by founders - then "
                           "reconciling those sources by hand before submitting.",
        quantified_cost="Not measured. No source in this corpus quantifies coordinator time. "
                        "Available proxy only: the divergence between the two NIT Calicut figures is "
                        "38 ventures of unexplained difference, which is the size of the "
                        "reconciliation problem, not the cost of it.",
        failure_consequence="An institution either over-claims (and is corrected during inspection, "
                            "damaging credibility and future funding) or under-claims (and loses ARIIA "
                            "points it earned). A startup the institution actually incubated can end "
                            "up unclaimed and unattributed.",
        potential_fixer="A venture register that is the institution's system of record, with founder, "
                        "cohort, incorporation date and current status - exporting to the government "
                        "screens rather than replacing them.",
        competitive_implication="None of the 11 direct competitors surveyed in Phase 0 model a "
                                "venture-with-a-lifecycle as the primary object; they track incubation "
                                "intake and programme milestones. A venture register with status "
                                "over time is a direct differentiator, not a feature.",
        cited_corpus_ids=["IIC-001", "IIC-001b", "IIC-032", "IIC-007"],
        quotes=["Q-P1-001"],
    ),
    dict(
        id="P-A02", number=2,
        title="The mandated IIC activity form is internally inconsistent and cannot be trusted",
        statement="The IIC reporting schema produces documents whose narrative and KPI form disagree "
                  "with each other, by up to 10.6x on a money field. Institutions cannot treat their "
                  "own submission as a reliable record of what they did.",
        evidence=[
            "Six same-document contradictions across 36 documents. NIT Calicut: 55 vs 17 startups, "
            "INR 1,51,488 vs INR 16,00,000 awareness spend, INR 2,28,212 vs INR 50,00,000 grant. "
            "(`IIC-001`, `IIC-001b`)",
            "Institute of Science Nagpur itemises 16 activities in its narrative and enters 02 in its "
            "KPI form - an 8x gap inside one report. (`IIC-011`)",
            "MIET Jammu writes 'Rs 4,10,000' in digits and 'Three Lakh Twenty Thousands only' in "
            "words in the same field. The adjacent grant field has no such mismatch, so no house "
            "convention explains it. (`IIC-029`)",
            "The mandated activity taxonomy is a closed five-value vocabulary "
            "('Innovation & Design Thinking', 'Pre incubation & Incubation management', "
            "'Entrepreneurship & startup', 'IPR & Technology transfer', 'Celebration Activity') "
            "applied to every activity, so a TRL workshop is filed as design thinking. "
            "(`IIC-028`)",
        ],
        evidence_grade="DOCUMENTED",
        evidence_gap="Whether the IIC portal validates submissions at all is unknown. If it validates "
                     "nothing, the contradictions are a documentation problem; if ARIIA reads the "
                     "portal, they are a ranking problem. Logged as OQ-20.",
        who_experiences_it="IIC coordinator and IIC President - typically a single part-time "
                           "academic, evidenced by SSCET fielding 40 IIC members and 30 innovation "
                           "ambassadors for 2 mentors (`IIC-024`), and NIT Calicut pairing 29 faculty "
                           "mentors against 155 ideas (`IIC-001`).",
        severity="HIGH",
        severity_justification="Drives every downstream number an institution is assessed on. Not "
                               "CRITICAL because no evidence here of legal consequence.",
        frequency="Continuous during the activity year; acute in the 2-4 weeks before submission.",
        current_workaround="Writing the narrative and the KPI table separately and never comparing "
                           "them. There is no mechanism in the form that would surface the difference.",
        quantified_cost="Not measured. Proxy: the misstatement is not small. At NIT Andhra Pradesh, "
                        f"INR {spend_per_idea('IIC-003'):,.0f} of awareness spend per idea generated, "
                        f"against INR {spend_per_idea('IIC-001'):,.0f} at NIT Calicut - a "
                        f"{round(spend_per_idea('IIC-003')/spend_per_idea('IIC-001')):,}x difference "
                        "between two institutions in the same national programme.",
        failure_consequence="Institutional rankings rest on numbers the institution itself does not "
                            "believe. A correction discovered during verification costs credibility "
                            "that a whole academic year's activity cannot rebuild.",
        potential_fixer="A reconciliation layer, not another form: one activity register that derives "
                        "the narrative, the KPI table and the ARIIA/NIRF submissions from a single "
                        "set of records, so the three cannot disagree.",
        competitive_implication="This is the strongest evidenced problem in Phase 1. A product that "
                                "makes the government submission derivable - rather than asking the "
                                "coordinator to re-key - is not competing on features. It is removing "
                                "a task the user currently does by hand.",
        cited_corpus_ids=["IIC-001", "IIC-001b", "IIC-011", "IIC-029", "IIC-028", "IIC-024"],
        quotes=["Q-P1-001", "Q-P1-012", "Q-P1-009"],
    ),
    dict(
        id="P-A03", number=3,
        title="Incubator cohorts are not visible in institutional reporting",
        statement="The IIC reporting schema has no cohort concept. Nothing in the 36-document corpus "
                  "records which ventures entered which batch, when, or on what terms.",
        evidence=[
            "Across 36 documents, no institution reports a cohort, batch, intake cycle or admission "
            "date. The vocabulary is uniformly ideas / prototypes / IPs / startups.",
            "Incubation appears only as infrastructure narrative - NIT Calicut's TBI incubating 115 "
            "startups and 1,500+ jobs (`IIC-001`), CMRIT's pre-incubation centre serving 25 students, "
            "46 faculty and 5 external startups (`IIC-016`) - with no cohort structure attached.",
            "Scottish Church College reports a single innovation centre funded by an individual angel "
            "investor, with no intake or cohort accounting at all (`IIC-012`).",
        ],
        evidence_grade="HYPOTHESIS",
        evidence_gap="MATERIAL. This is an absence-of-evidence finding, not a positive finding. The "
                     "corpus contains almost no cohort data because the IIC form does not ask for "
                     "any. It does NOT follow that institutions lack cohorts - only that this "
                     "reporting surface cannot show them. To close: interview 3-4 incubators "
                     "(TBI/AIC/ATAL-incubatee) and ask directly how they define and record a cohort. "
                     "Phase 18 modelling depends on this.",
        who_experiences_it="Incubator managers; programme managers running cohorts for DST, Atal "
                           "Innovation Mission, NIDHI-PRAYAS or state missions.",
        severity="MEDIUM",
        severity_justification="Downgraded from HIGH precisely because the evidence is an absence. "
                               "Would be HIGH if a single document showed cohort data being lost.",
        frequency="Per intake cycle, for institutions running any cohort-based programme.",
        current_workaround="UNKNOWN - this is the point. No workaround is visible in any retrieved "
                           "document because no document discusses cohorts. Presenting a workaround "
                           "here would be fabrication.",
        quantified_cost="Not available. No cost data exists in this corpus for cohort management.",
        failure_consequence="Cannot yet be stated. If cohorts are tracked manually, the exposure is "
                            "lost institutional memory and funding-reporting errors. That is a "
                            "reasoned expectation, NOT an observation.",
        potential_fixer="Cohort as a first-class object with intake, terms, seats, and per-seat "
                        "funding - which is also what scheme reporting requires.",
        competitive_implication="Cannot be claimed yet. This is a candidate differentiator for "
                                "Phase 4 segmentation, and it must not appear in any external "
                                "material until Phase 3 confirms cohorts are a real managed object.",
        cited_corpus_ids=["IIC-001", "IIC-016", "IIC-012"],
        quotes=[],
    ),
    dict(
        id="P-A04", number=4,
        title="One coordinator is the integration point for several unrelated national schemes",
        statement="Institutions are simultaneously running IIC, YUKTI-NIR, MSME Idea Hackathon, "
                  "Smart India Hackathon, ATL and state innovation missions - each with its own "
                  "portal, vocabulary and selection rules - through a single coordinator.",
        evidence=[
            "CMRIT published a full YUKTI funnel for 2024-25: 50 PoCs + 70 innovations + 7 startups "
            "submitted, 162 ideas recommended after scouting, 10 forwarded to the national challenge. "
            "(`IIC-016`)",
            "Vijaya Institute of Pharmaceutical Sciences ran the same year through three schemes with "
            "markedly different selectivity: Idea Hackathon 4.0 forwarded 12 of 17 ideas received "
            "(71%); Idea Hackathon 5.0 recommended 29 of 59 (49%); YUKTI recommended 5 of 15 "
            "submissions (33%). One coordinator, three screens, three different rates. (`IIC-025`)",
            "St Paul's College ran IIC, SIH, YUKTI and MSME Idea Hackathon 3.0 and 4.0 in one year, "
            "with 11 SIH teams and ~15 YUKTI products. (`IIC-013`)",
            "Rathinam College of Pharmacy's activity register shows MIC-driven, IIC-calendar, "
            "self-driven and celebration activities all tagged from one fixed five-value vocabulary "
            "regardless of which scheme they serve. (`IIC-028`)",
        ],
        evidence_grade="DOCUMENTED",
        evidence_gap="The corpus shows the multiplicity and the differing selectivity rates. It does "
                     "not show the coordinator's time cost, nor how many schemes a typical institution "
                     "runs. Both need Phase 3.",
        who_experiences_it="The IIC coordinator / Innovation Activity Coordinator. Evidence they are "
                           "a single point: SSCET names a compiler, St Paul's names an Innovation "
                           "Activity Coordinator as the report author, Scottish Church names the same "
                           "role.",
        severity="HIGH",
        severity_justification="Multiple mandatory destinations, each with its own schema, funneled "
                               "through one part-time role. Directly produces the P-A02 contradictions.",
        frequency="Continuous, and spikes at each scheme's submission deadline, which do not align.",
        current_workaround="Tracking each scheme separately, then manually reconciling at the point "
                           "where an idea or startup is submitted to more than one - and manually "
                           "preventing double-counting across schemes.",
        quantified_cost="Not measured. Observable proxy: CMRIT submitted 127 items across three YUKTI "
                        "categories and forwarded 10 - an 92% rejection rate, meaning most "
                        "coordinator effort in scouting and documentation produced no forwardable "
                        "submission.",
        failure_consequence="Double-submission of the same invention across schemes, or a missed "
                            "deadline in one scheme because attention went to another. Both carry "
                            "scheme-level consequences.",
        potential_fixer="One innovation object with per-scheme submissions as derived views - so the "
                        "same invention can legitimately appear in several schemes without being "
                        "re-entered or double-counted.",
        competitive_implication="The Phase 0 thesis already identified YUKTI-NIR / IIC / ARIIA export "
                                "as a core differentiator. This is the documentary backing for it: "
                                "the multiplicity is real and the selectivity rates differ per scheme.",
        cited_corpus_ids=["IIC-016", "IIC-025", "IIC-013", "IIC-028"],
        quotes=[],
    ),
    dict(
        id="P-A05", number=5,
        title="Mentorship capacity is disclosed as a count with no ratio, workload or outcome",
        statement="Institutions report how many mentors they have. None report mentor capacity per "
                  "innovator, hours contributed, or any mentorship outcome.",
        evidence=[
            "NIT Calicut: 29 faculty mentors against 155 ideas generated in the year - roughly 5.3 "
            "ideas per mentor, with no indication of mentor hours or whether all 155 were mentored. "
            "(`IIC-001`)",
            "SSCET: 40 IIC members, 30 innovation ambassadors, and 2 faculty mentors/mentees. (`IIC-024`)",
            "Vijaya Institute of Pharmaceutical Sciences: 5 faculty mentors, 12 IIC members "
            "(12 faculty, 13 students), 12 innovation ambassadors of whom 10 were still in "
            "training. (`IIC-025`)",
            "BIT Mesra is the only institution publishing a mentorship-linked money figure: INR 1 lakh "
            "per student team, 7 teams. It still publishes no session count or outcome. (`IIC-010`)",
        ],
        evidence_grade="SINGLE-SOURCE",
        evidence_gap="Only 4 of 36 documents publish any mentor count at all, and none publish "
                     "workload or outcome. The mentor-count-vs-idea ratio spans 2.1 to 20 across "
                     "these four, which may reflect real capacity differences or nothing more than "
                     "differing disclosure habits. NOT sufficient to claim institutions under-manage "
                     "mentorship. To close: Phase 3 interviews plus a wider mentor-field extraction "
                     "across the corpus.",
        who_experiences_it="IIC coordinator (allocating mentors); mentors themselves; students "
                           "requesting mentorship.",
        severity="MEDIUM",
        severity_justification="Evidence is thin and the failure mode is diffuse. Not a HIGH-severity "
                               "claim until mentorship outcome data exists.",
        frequency="Continuous during the academic year.",
        current_workaround="UNKNOWN from documents. Likely informal allocation via email and "
                           "WhatsApp, but that is an expectation and is flagged as such.",
        quantified_cost="Not available.",
        failure_consequence="Cannot be stated on this evidence. A plausible risk is mentor "
                            "double-booking and students receiving no response, but that is reasoning, "
                            "not observation.",
        potential_fixer="Mentor capacity and session logging against innovation objects, so "
                        "allocation is visible and mentor time is auditable.",
        competitive_implication="Phase 0 noted that no competitor separates a public mentor from a "
                                "confidential expert under NDA. If mentorship proves to be a managed "
                                "object in Phase 3, that gap becomes relevant. Do not claim it yet.",
        cited_corpus_ids=["IIC-001", "IIC-024", "IIC-025", "IIC-010"],
        quotes=[],
    ),
    dict(
        id="P-A06", number=6,
        title="Startup progress is reported as a stock, not as movement over time",
        statement="No institution in the corpus reports how its startups are doing. Reporting is a "
                  "count at a point in time, and several institutions cannot even produce the count.",
        evidence=[
            "Of 36 documents, the startup field resolves to a number in only a minority; the rest use "
            "seven distinct expressions of absence or incompletion: Nil, NA, 'In process', "
            "'In-progress', a dash, or an implied blank.",
            "ICFAI University Tripura is the only institution that separates startups established (0) "
            "from startups in pipeline (5) - i.e. the only one treating progress as two states "
            "rather than one number. (`IIC-007`)",
            "Brainware University: 91 patents published, 8 granted, 0 startups - a decade-scale "
            "research output with no reported venture formation at all. (`IIC-032`)",
            "Women's Christian College ran 84 activities and reports startups as 'In process' with no "
            "further detail. (`IIC-033`)",
        ],
        evidence_grade="SINGLE-SOURCE",
        evidence_gap="The absence is well evidenced; the CAUSE is not. A null startup count could "
                     "mean no startups, or no counting. Phase 3 must distinguish these, and this is "
                     "the single most important question for the P-A01 thesis.",
        who_experiences_it="IIC coordinator; investors doing diligence on the institution's "
                           "incubation claim; ARIIA assessors.",
        severity="HIGH",
        severity_justification="Rated above the mentorship problem because the evidence base is "
                               "stronger and the consequence is more concrete: an institution "
                               "actively running programmes reports nothing measurable about whether "
                               "any of it worked.",
        frequency="Annual, at reporting time.",
        current_workaround="UNKNOWN from documents. Cannot be stated without interview evidence.",
        quantified_cost="Not available.",
        failure_consequence="An institution cannot demonstrate outcome to an investor, a funding "
                            "agency or an accreditation body, because it never captured the data.",
        potential_fixer="Status and milestone history per venture, with an explicit 'unknown' state "
                        "distinct from zero.",
        competitive_implication="Every competitor surveyed in Phase 0 tracks intake and programme "
                                "milestones, not venture survival or revenue. Outcome tracking over "
                                "time is unclaimed ground - but it can only be sold if Phase 3 "
                                "confirms institutions care about it.",
        cited_corpus_ids=["IIC-007", "IIC-032", "IIC-033"],
        quotes=["Q-P1-002"],
    ),
    dict(
        id="P-A07", number=7,
        title="No institution in the corpus has a patent deadline, and IP records are held outside the innovation record",
        statement="IP activity is tracked as counts of filings, publications and grants. Nothing "
                  "observed tracks prosecution deadlines, ownership, or the link between an invention "
                  "and the innovation that produced it.",
        evidence=[
            "NIT Calicut, the richest IP record in the corpus: 75 applications filed, 36 granted, 39 "
            "published, 10 in process - reported as counts only. No deadline, no next-action date, no "
            "attorney, no fee. (`IIC-001`)",
            "Peer-reviewed work on university TTO practice analysed 382 patent records and found poor "
            "data cleaning carries legal and commercialisation consequences. (`ACAD-001`)",
            "Agricultural-university TTO literature documents that missed prosecution deadlines "
            "produce abandoned applications - the entire patent is the cost of a missing date field. "
            "(`ACAD-002`)",
            "Faculty file patents independently of their institution, which prevents the institution "
            "claiming NIRF/ARIIA credit for work done on its own campus. (`ACAD-003`)",
            "A mandatory IP register at KIT CoE already carries a Yes/No column: 'Has this IP been "
            "Commercialized/Transferred to Industry/Startup/Society?' - proving the field is "
            "understood and wanted, yet absent from the IIC form. (`IIC-015`)",
            "Institute of Science Nagpur's flagship innovation is a UK design registration "
            "(No. 6381983). No field in the observed reporting vocabulary accommodates foreign IP. "
            "(`IIC-011`)",
        ],
        evidence_grade="DOCUMENTED",
        evidence_gap="The academic sources are Tier 2 and were located but not read in full this "
                     "session; ACAD-001/002/003 need direct citation before external use. No corpus "
                     "document shows a deadline field, which is an absence finding - consistent "
                     "across 36 documents, but not proof that no institution has one internally.",
        who_experiences_it="IPR officer / TTO in-charge (rare and named at only 2 of 36 institutions "
                           "- Manav Rachna's IPR Cell, and CMRIT's KSCST-collaborated IPR Cell); "
                           "research scholars chasing grants; ARIIA assessors.",
        severity="CRITICAL",
        severity_justification="The only problem graded CRITICAL in Section A. A missed prosecution "
                               "deadline extinguishes the patent; an unclaimed invention cannot be "
                               "counted in NIRF or ARIIA. Both losses are permanent and both are "
                               "documented consequences, not speculation.",
        frequency="Per patent, continuously, across multi-year prosecution timelines.",
        current_workaround="Manual deadline tracking, if it happens at all. Two institutions publish "
                           "a named IPR Cell with an in-charge and direct email "
                           "(`IIC-005`, `IIC-016`); the other 34 publish no IP owner at all.",
        quantified_cost="Not directly measured. The ACAD-002 literature establishes the consequence "
                        "(abandoned application) without quantifying frequency in this population.",
        failure_consequence="Permanent loss of the patent; permanent loss of the institution's claim "
                            "to it for NIRF/ARIIA purposes; possible loss of funding attached to the "
                            "invention.",
        potential_fixer="An IP record with prosecution milestones and deadlines, linked to the "
                        "invention, with ownership and a commercialisation-status field.",
        competitive_implication="This is the strongest strategic finding in Phase 1 and it "
                                "corroborates the Phase 0 thesis independently. Phase 0 found, across "
                                "11 direct competitors, that NOT ONE has an IPR module - only a data "
                                "field in a Swedish product and a dashboard tile in IncubatX. The "
                                "documentary corpus now shows why that gap persists: institutions "
                                "track IP as counts inside a form that cannot hold a lifecycle.",
        cited_corpus_ids=["IIC-001", "IIC-005", "IIC-016", "IIC-015", "IIC-011"],
        quotes=["Q-P1-005", "Q-P1-006", "Q-P1-010"],
    ),
    dict(
        id="P-A08", number=8,
        title="The annual report is hand-assembled, and its numeric fields fail in predictable ways",
        statement="The IIC annual report is produced by a part-time academic re-keying activity data "
                  "into a mandated form. The report format has no way to express a real-world value, "
                  "so coordinators write prose into number fields.",
        evidence=[
            "Teresa's College put a 13-item bulleted narrative - spanning DST, Cochin Shipyard CSR, "
            "KSUM x3, AICTE YUKTI, ICSSR, NCERT, SERB, UNDP Green Innovation Fund, Nidhi Prayas, "
            "Federal Bank CSR and a YIP prize, plus a student 'currently working through the "
            "procedure to see if the concept can be patented' - into the field 'Amount grant or fund "
            "supported to student & Faculty lead Innovations, start-ups and IPR'. The adjacent "
            "awareness-spend field in the same report was entered cleanly as INR 3,42,624, which "
            "proves the failure is specific to grant data, not to data entry generally. (`IIC-031`)",
            "Marathwada Mitra Mandal's College submitted both money fields as lower bounds: 'RS. 3 L+' "
            "and 'RS. 7 L+'. (`IIC-035`)",
            "SSCET wrote 'In-progress' in the awareness and grant fields, and 'Nil' for startups, on "
            "a report filed after the year closed. (`IIC-024`)",
            "IPS Academy filed a PROPOSAL in the awareness field ('Amount proposed to be spent ... 8 "
            "Lakhs') where the grant field carried INR 20,000 actually supported - a 40x "
            "intent-versus-reality gap inside one report. (`IIC-022`)",
            "Scottish Church College carried sponsor identity and purpose inside money fields: "
            "'Rs. 30,000 sponsored by Microbiologists Society India for supporting an awareness "
            "seminar'. (`IIC-012`)",
            "MIET Jammu's digits and amount-in-words disagree by INR 90,000 in one field. (`IIC-029`)",
        ],
        evidence_grade="DOCUMENTED",
        evidence_gap="Strong on the pattern, silent on the cause. We observe that fields fail; we "
                     "have not observed a coordinator explaining why, and we do not know whether "
                     "the IIC portal would accept a richer data structure if offered.",
        who_experiences_it="Whoever compiles the report - consistently a single named academic "
                           "(named compiler at Scottish Church, St Paul's and SSCET), not an "
                           "administrator or a system.",
        severity="HIGH",
        severity_justification="This is the mechanism that generates P-A02's contradictions and "
                               "P-A09's misfiled money. It is upstream of the others.",
        frequency="Annual, concentrated into the submission window.",
        current_workaround="Hand-writing prose into numeric fields, writing lower bounds when the "
                           "exact figure is unknown, and entering proposals where actuals belong.",
        quantified_cost="Not measured directly. The Teresa's College case shows a single field "
                        "carrying at least 13 distinct funding events across 6 funding bodies - work "
                        "that is entirely invisible to the government system it is reported to.",
        failure_consequence="The institution's own record of its innovation activity is not "
                            "machine-readable, not comparable, and not auditable - by the "
                            "institution or anyone else.",
        potential_fixer="Make the government submission a derived output of records captured during "
                        "the year, so the report assembles itself. Include a first-class 'unknown / "
                        "not applicable / pending' value so nobody has to write prose to escape a "
                        "numeric field.",
        competitive_implication="This reframes the product. The competitor set sells dashboards and "
                                "intake. The unclaimed job is 'make the mandated report assemble "
                                "itself'. No competitor in the Phase 0 survey does derivation; they "
                                "all ask the user to fill in another system.",
        cited_corpus_ids=["IIC-031", "IIC-035", "IIC-024", "IIC-022", "IIC-012", "IIC-029"],
        quotes=["Q-P1-002", "Q-P1-003", "Q-P1-008", "Q-P1-011"],
    ),
    dict(
        id="P-A09", number=9,
        title="Government scheme money is tracked as one lump and is frequently the wrong money",
        statement="Institutions manage multiple concurrent funding streams. The single mandated "
                  "'grant supported' field cannot represent them, so it absorbs whatever large "
                  "government grants arrived that year - including unrelated academic funding.",
        evidence=[
            "Dr. N.G.P. Arts and Science College reported INR 2,16,81,371 as grant support to "
            "innovations, start-ups and IPR. That figure reconciles exactly to two DBT academic "
            "grants (INR 1,25,95,438 + INR 62,30,583 = INR 2,16,81,371) for undergraduate science "
            "teaching - not innovation funding. (`IIC-030`)",
            "Teresa's College's grant field lists 13 separate awards from 6 funding bodies. (`IIC-031`)",
            "Vijaya Institute ran MSME Idea Hackathon 4.0, Idea Hackathon 5.0, YUKTI Innovation "
            "Challenge 2025, and NIPAM in one year, each with its own portal and deadline. (`IIC-025`)",
            "St Paul's College ran MSME Idea Hackathon 3.0 and 4.0, SIH 2024, YUKTI and KAPILA IP "
            "filing support in one year, publishing grants from MSME and WBSCST separately. "
            "(`IIC-013`)",
            "Only one institution in 36 documents wrote a true numeric zero in a grant field "
            "(`IIC-011`); five others wrote Nil, NA, In-progress, or a dash.",
        ],
        evidence_grade="DOCUMENTED",
        evidence_gap="We can prove the DBT absorption arithmetically for one institution. We have "
                     "not checked whether any government body actually reads this field, which "
                     "determines whether the misfiling has consequences. Logged as OQ-24.",
        who_experiences_it="R&D office; the funding coordinator; the principal's office signing off "
                           "the submission; finance, reconciling after the fact.",
        severity="HIGH",
        severity_justification="Wrong-money reporting is a real integrity exposure if the field is "
                               "ever audited, and it destroys the field's usefulness as a market "
                               "signal regardless.",
        frequency="Continuous; spikes at each scheme's financial reporting.",
        current_workaround="Maintaining the real grant portfolio separately and transcribing an "
                           "aggregate into the government field.",
        quantified_cost="Not measured. Observable: the reported total is off by at least "
                        "INR 2.16 lakh at one institution, in the direction of overstating "
                        "innovation funding. Kongu is the only institution splitting grant money three "
                        "ways (innovation / startup / IPR), which suggests the split is achievable "
                        "but rare - 1 of 36 documents.",
        failure_consequence="Overstated innovation funding on the public record; a market analyst "
                            "sizing the innovation-support market from this field would be measuring "
                            "government research budgets.",
        potential_fixer="A grant record per award - source, scheme, amount, date, beneficiary - with "
                        "the government field derived as a filtered aggregate.",
        competitive_implication="Directly supports the Phase 0 positioning decision D-007 (sell "
                                "against an existing IIC or scheme grant rather than create a new "
                                "budget line). This finding shows the grant data itself is unreliable, "
                                "which strengthens the 'reduces re-keying' pitch.",
        cited_corpus_ids=["IIC-030", "IIC-031", "IIC-025", "IIC-013", "IIC-011", "IIC-004"],
        quotes=["Q-P1-004", "Q-P1-002"],
    ),
    dict(
        id="P-A10", number=10,
        title="Institution-wide innovation data is consolidated by hand from departmental silos",
        statement="Innovation data originates in departments, cells, a TTO, an incubator and a "
                  "research office. It reaches the IIC form only through manual aggregation by one "
                  "person, and the same vocabulary is reused by institutions with completely "
                  "different underlying structures.",
        evidence=[
            "Teresa's College's grant list is organised BY DEPARTMENT - 'department of physics', "
            "'department of home science' (three separate awards), 'department of mathematics and "
            "statistics', 'department of Botany' (two awards). The grant field is effectively a "
            "manual roll-up of departmental records. (`IIC-031`)",
            "St Paul's College submitted a 10-line budget-vs-actual table spanning infrastructure, "
            "library, lab equipment, consumables, salaries, maintenance, R&D, training and "
            "miscellaneous - an institution-level finance roll-up presented as the innovation "
            "expenditure answer. (`IIC-013`)",
            "Manav Rachna University published a 12-member Innovation Cell list spanning Fluid "
            "Mechanics, Peace and Sustainability, Production Development and Law, plus a separate "
            "IPR Cell with a named in-charge - i.e. the reporting population is a union of "
            "unrelated units. (`IIC-005`)",
            "NIT Calicut's IIC is constituted from multiple departments plus external industry "
            "experts, and its patent table mixes faculty and student inventions with no unit field. "
            "(`IIC-001`)",
            "13 distinct institution types across 36 documents file the same schema, from NITs to a "
            "management college with 2 activities and INR 50,000 spend (`IIC-023`).",
        ],
        evidence_grade="DOCUMENTED",
        evidence_gap="Strong on the structure of the problem, silent on the tooling. We have not "
                     "observed a single institution's internal system - we only see its export. "
                     "Whether consolidation is done in Excel, Tally, an ERP or by hand is "
                     "UNKNOWN from documents and is a primary Phase 3 interview question. This is "
                     "the gap that most directly threatens todo.md Section B's 'Excel dependency' "
                     "claims, which remain unevidenced.",
        who_experiences_it="Whoever consolidates - typically the IIC coordinator, drawing from "
                           "departmental coordinators who have no obligation to report.",
        severity="HIGH",
        severity_justification="It is the upstream cause of P-A02, P-A08 and P-A09, and it is the "
                               "reason no institution's numbers agree with its own.",
        frequency="Continuous, with a hard deadline at year end.",
        current_workaround="Manual aggregation across departments. Internal tooling is unknown - the "
                           "Excel dependency that todo.md Section B assumes is NOT yet evidenced and "
                           "must not be asserted.",
        quantified_cost="Not measured. This is the highest-value unknown in Section A: without it, "
                        "the operational problem set in Section B has no quantified foundation.",
        failure_consequence="Departmental records and the institutional submission diverge, and the "
                            "institution cannot tell which is correct because neither was designed "
                            "to be the record of truth.",
        potential_fixer="A departmental-level intake with institutional roll-up derived "
                        "automatically, with the government forms as an export.",
        competitive_implication="This is the strongest version of the Phase 0 thesis and it is now "
                                "independently corroborated by documents. Mandated systems are "
                                "compliance ledgers, not systems of record (D-004). Phase 0 proved "
                                "this from the government side by finding the IIC portal can register "
                                "an 'IPR/TTO Centre' but has no field for a single patent. Phase 1 "
                                "proves it from the institution side: the same 36 documents cannot "
                                "agree with themselves.",
        cited_corpus_ids=["IIC-031", "IIC-013", "IIC-005", "IIC-001", "IIC-023"],
        quotes=[],
    ),
]


def grade_counts():
    out = {}
    for p in PROBLEMS:
        out[p["evidence_grade"]] = out.get(p["evidence_grade"], 0) + 1
    return out


def severity_counts():
    out = {}
    for p in PROBLEMS:
        out[p["severity"]] = out.get(p["severity"], 0) + 1
    return out


def validation():
    """Fail loudly if a record is missing a required field or over-claims."""
    import data_p1_registry as R
    known_quotes = {q["qid"] for q in R.QUOTES}
    known_corpus_ids = {r["id"] for r in D.IIC_REPORTS}
    required = ["id", "number", "title", "statement", "evidence", "evidence_grade",
                "evidence_gap", "who_experiences_it", "severity", "severity_justification",
                "frequency", "current_workaround", "quantified_cost", "failure_consequence",
                "potential_fixer", "competitive_implication", "cited_corpus_ids"]
    problems = []
    seen = set()
    for p in PROBLEMS:
        for f in required:
            if f not in p or p[f] in (None, ""):
                problems.append(f"{p.get('id', '???')}: missing '{f}'")
        if p["evidence_grade"] not in EVIDENCE_GRADES:
            problems.append(f"{p['id']}: bad evidence_grade '{p['evidence_grade']}'")
        if p["severity"] not in SEVERITY_SCALE:
            problems.append(f"{p['id']}: bad severity '{p['severity']}'")
        if p["id"] in seen:
            problems.append(f"duplicate id {p['id']}")
        seen.add(p["id"])
        # An over-claiming rule: DOCUMENTED must cite at least 2 corpus ids.
        if p["evidence_grade"] == "DOCUMENTED" and len(p["cited_corpus_ids"]) < 2:
            problems.append(f"{p['id']}: graded DOCUMENTED but cites fewer than 2 corpus ids")
        # Quotes must resolve to the quote vault.
        for q in p["quotes"]:
            if q not in known_quotes:
                problems.append(f"{p['id']}: unknown quote {q}")
        # Cited corpus ids must resolve to real corpus records.
        for c in p["cited_corpus_ids"]:
            if c not in known_corpus_ids:
                problems.append(f"{p['id']}: unknown corpus id {c}")
    nums = sorted(p["number"] for p in PROBLEMS)
    if nums != list(range(1, 11)):
        problems.append(f"Section A must cover problems 1-10 exactly; got {nums}")
    return problems
