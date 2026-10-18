#!/usr/bin/env python3
"""StartupHub Phase 1 - registry rows and the verbatim quote vault.

Two jobs:

1. `build_registry_rows()` turns every Phase 1 corpus document into a row for
   `00_Research_Index/Source_Registry.csv`, using the SAME 13 columns and the SAME
   tier/reliability vocabulary as the existing GOV-* and COMP-* rows. Phase 1
   rows use the `P1-` prefix so they can be filtered or removed without touching
   Phase 0.

2. `QUOTES` holds verbatim strings that were actually read in a source document.
   Each carries speaker/role, institution, URL, access date and tier. Nothing
   here is paraphrased, summarised or reconstructed. Where a quote came from a
   machine-extracted PDF text layer rather than a visually confirmed page, the
   `extraction_method` field says so, because OCR and PDF text layers drop and
   scramble characters and a quote that will be used externally must be
   re-checked against the original before publication.
"""

# One registry row per Phase 1 document. `claim_supported` states what this
# specific document is being used to prove - not a general description of it.
P1_SOURCE_METADATA = {
    # doc_id: (claim_supported, geography, customer_segment, reliability)
    "IIC-001": ("Two NIT-level IICs differ ~75x in ideas generated under the same national programme",
                "India - Kerala", "IIC coordinator; institution leadership", "HIGH"),
    "IIC-001b": ("A single IIC report can carry two irreconcilable values for the same KPI field",
                 "India - Kerala", "IIC coordinator; ARIIA assessor", "HIGH"),
    "IIC-002": ("Overlapping reporting windows (FY vs calendar) create a live double-count risk",
                "India - Kerala", "IIC coordinator", "HIGH"),
    "IIC-003": ("Awareness spend can reach INR 45.84 lakh against 2 ideas generated",
                "India - Andhra Pradesh", "IIC coordinator; AICTE", "HIGH"),
    "IIC-004": ("Institutions split innovation funding three ways: innovation, startup, IPR",
                "India - Tamil Nadu", "IIC coordinator; incubator manager", "HIGH"),
    "IIC-005": ("A named IPR/TTO Cell with a named in-charge is achievable but rare",
                "India - Haryana", "Institution leadership; TTO in-charge", "HIGH"),
    "IIC-006": ("Awareness spend can rise while grant support stays at exactly zero for four straight years",
                "India - Rajasthan", "IIC coordinator", "HIGH"),
    "IIC-007": ("Reported prototypes can exceed reported ideas, proving fields are not one funnel",
                "India - Tripura", "IIC coordinator", "HIGH"),
    "IIC-008": ("Some institutions split IP filings into granted / published / filed rather than one total",
                "India - Gujarat", "IIC coordinator", "HIGH"),
    "IIC-009": ("Four-year IP tables are common but are frequently unreadable by text extraction",
                "India - Kerala", "IIC coordinator", "MEDIUM"),
    "IIC-010": ("Uniform per-team grants (INR 1 lakh x 7 teams) are an explicit published policy choice",
                "India - Jharkhand", "IIC coordinator", "HIGH"),
    "IIC-011": ("IIC narrative and IIC-portal KPI form can disagree within one document; and foreign IP has no field",
                "India - Maharashtra", "IIC coordinator; ARIIA assessor", "HIGH"),
    "IIC-012": ("Money fields carry sponsor identity and purpose, not just a number; 8 innovations counted while unregistered",
                "India - West Bengal", "IIC coordinator", "HIGH"),
    "IIC-013": ("The reporting schema is discipline-agnostic - pharmacy files the same vocabulary as engineering",
                "India - Kerala", "IIC coordinator", "HIGH"),
    "IIC-014": ("Compliance-first IIC vision statements are explicitly stated in institutional reports",
                "India - Andhra Pradesh", "Institution leadership", "HIGH"),
    "IIC-015": ("A Yes/No commercialisation column already exists in some institutional IP registers",
                "India - Tamil Nadu", "IPR officer; TTO", "HIGH"),
    "IIC-016": ("A full YUKTI submission funnel with rejection is publishable, and grant money often swamps awareness money",
                "India - Tamil Nadu", "IIC coordinator; innovation ambassador", "HIGH"),
    "IIC-017": ("Idea-to-prototype conversion inside a plausible 30-60% band is achievable",
                "India - Tamil Nadu", "IIC coordinator", "HIGH"),
    "IIC-018": ("A zero-grant, zero-transfer floor case exists: INR 25,000 spend, 0 grant, 0 transfers",
                "India - Tamil Nadu", "IIC coordinator", "HIGH"),
    "IIC-019": ("High activity counts do not predict outputs - 94 activities produced 0 IPs",
                "India - Andhra Pradesh", "IIC coordinator", "HIGH"),
    "IIC-020": ("100% idea-to-prototype reporting is possible and implausible at the same time",
                "India - Telangana", "IIC coordinator", "HIGH"),
    "IIC-021": ("IIC IDs are sometimes published truncated, blocking entity resolution",
                "India - Maharashtra", "IIC coordinator", "MEDIUM"),
    "IIC-022": ("The awareness-spend field can carry a budget proposal rather than an actual, and the gap to real grants is 40x",
                "India - Madhya Pradesh", "IIC coordinator; institution leadership", "HIGH"),
    "IIC-023": ("Non-technical institutions file compliant IIC reports with near-zero outcomes and higher per-event spend",
                "India - Maharashtra", "IIC coordinator", "HIGH"),
    "IIC-024": ("'In-progress' is used as a value in a money field on a filed report",
                "India - Telangana", "IIC coordinator", "HIGH"),
    "IIC-025": ("Multiple external schemes funnel through one coordinator at different selectivity rates",
                "India - Andhra Pradesh", "IIC coordinator; innovation ambassador", "HIGH"),
    "IIC-026": ("Non-technical colleges can run very high activity counts with near-zero IP output",
                "India - Tamil Nadu", "IIC coordinator", "HIGH"),
    "IIC-027": ("First-year IICs report 79 activities and zero IPs, and use three different words for absence",
                "India - Rajasthan", "IIC coordinator", "HIGH"),
    "IIC-028": ("The mandated activity taxonomy is a closed five-value vocabulary applied to every activity",
                "India - Tamil Nadu", "IIC coordinator; MIC", "HIGH"),
    "IIC-029": ("Digits and amount-in-words can disagree inside a single money field",
                "India - Jammu and Kashmir", "IIC coordinator", "HIGH"),
    "IIC-030": ("The grant field has demonstrably absorbed unrelated large government research grants",
                "India - Tamil Nadu", "IIC coordinator; ARIIA assessor", "HIGH"),
    "IIC-031": ("A numeric grant field was filled with a 13-item multi-source narrative rather than a number",
                "India - Kerala", "IIC coordinator; institution leadership", "HIGH"),
    "IIC-032": ("91 published patents against 8 granted and zero startups is a publishable state",
                "India - West Bengal", "IPR officer; IIC coordinator", "HIGH"),
    "IIC-033": ("IP fields silently mix current-year and cumulative counts (more granted than published)",
                "India - Tamil Nadu", "IIC coordinator", "HIGH"),
    "IIC-034": ("843 ideas from 42 activities is reported; activity volume and idea volume are unrelated",
                "India - Uttar Pradesh", "IIC coordinator", "HIGH"),
    "IIC-035": ("Money fields are sometimes submitted as lower bounds ('RS. 3 L+')",
                "India - Maharashtra", "IIC coordinator", "HIGH"),
}

P1_RESEARCH_AREA = "Phase 1 - institutional IIC reporting"

# Verbatim quotes actually read in the retrieved documents. `extraction_method`
# is honest about provenance: "pdf_text_layer" means the string came from a
# machine-extracted text layer and must be re-verified visually before any
# external use, because such layers scramble ligatures, bullet glyphs and
# Devanagari conjuncts.
QUOTES = [
    dict(qid="Q-P1-001",
         quote="Amount spent on promotion and awareness generation on Innovation Entrepreneurship "
               "in the campus: Rs 16,00,000/- (Rupees Sixteen Lakhs)",
         speaker_role="IIC / institution (self-reported)",
         speaker_name=None, institution="National Institute of Technology Calicut",
         doc_id="IIC-001b", year="2024-25",
         url="https://nitc.ac.in/imgserver/uploads/attachments/Ed__44cab2fb-596f-4726-9b77-8122bc273b37_.pdf",
         access_date="2026-10-18", tier="T1", extraction_method="pdf_text_layer",
         why_it_matters="The IIC-portal KPI form figure. The SAME PDF's narrative says INR 1,51,488. "
                        "A 10.6x internal contradiction inside one filing.",
         recheck_before_external_use=True),
    dict(qid="Q-P1-002",
         quote="She is currently working through the procedure to see if the concept can be patented.",
         speaker_role="IIC report narrative describing a student",
         speaker_name="Plackattu, Traicy J. (as named in the report)",
         institution="Teresa's College", doc_id="IIC-031", year="2023-24",
         url="https://teresas.ac.in/wp-content/uploads/2025/03/IIC-Annual-Report-23-24.pdf",
         access_date="2026-10-18", tier="T1", extraction_method="pdf_text_layer",
         why_it_matters="A patent in an indeterminate state, written as prose inside what should be a "
                        "numeric grant field. The clearest single illustration of the schema failure.",
         recheck_before_external_use=True),
    dict(qid="Q-P1-003",
         quote="Amount spent on promotion and awareness generation on Innovation Entrepreneurship in "
               "the campus: Rs 4,10,000 ( Three Lakh Twenty Thousands only )",
         speaker_role="IIC / institution (self-reported)",
         speaker_name=None, institution="Model Institute of Engineering and Technology",
         doc_id="IIC-029", year="2023-24",
         url="https://mietjmu.in/IIC/IIC%20Annual%20Report%202023-24%20Version%202.pdf",
         access_date="2026-10-18", tier="T1", extraction_method="pdf_text_layer",
         why_it_matters="Digits (4.10 lakh) and words (3.20 lakh) disagree by INR 90,000 inside one "
                        "field. The adjacent grant field does not have this error, so there is no "
                        "house convention that would explain it.",
         recheck_before_external_use=True),
    dict(qid="Q-P1-004",
         quote="Amount grant or fund supported to student & Faculty lead Innovations, start-ups and IPR: "
               "Rs. 2,16,81,371/-",
         speaker_role="IIC / institution (self-reported)",
         speaker_name=None, institution="Dr. N.G.P. Arts and Science College",
         doc_id="IIC-030", year="2023-24",
         url="https://www.drngpasc.ac.in/pdf/IIC/report/2023-24.pdf",
         access_date="2026-10-18", tier="T1", extraction_method="pdf_text_layer",
         why_it_matters="Reconciles exactly to two unrelated DBT academic grants "
                        "(1,25,95,438 + 62,30,583). Proves the field absorbs non-innovation funding.",
         recheck_before_external_use=True),
    dict(qid="Q-P1-005",
         quote="These products are on the process of being registered for IP/trademarks and copyright "
               "accordingly through the Indian Patent Office, Kolkata.",
         speaker_role="IIC report narrative", speaker_name=None,
         institution="Scottish Church College", doc_id="IIC-012", year="2024-25",
         url="https://www.scottishchurch.ac.in/docs/IIC/20251229_IIC_Annual_Report_2024_25.pdf",
         access_date="2026-10-18", tier="T1", extraction_method="pdf_text_layer",
         why_it_matters="Eight products listed as breakthrough innovations while explicitly not yet "
                        "registered - counted as innovation outcomes before they are IP.",
         recheck_before_external_use=True),
    dict(qid="Q-P1-006",
         quote="Officially registered as a UK Design (No. 6381983) on 31 July 2024.",
         speaker_role="IIC report narrative describing an innovation",
         speaker_name="Raju Belekar, Sachin Rathod, Aditya Boche, Sanjay Dhoble (as named)",
         institution="Institute of Science, Nagpur", doc_id="IIC-011", year="2024-25",
         url="https://iscnagpur.ac.in/pdf/Annual%20Report%202024-25.pdf",
         access_date="2026-10-18", tier="T1", extraction_method="pdf_text_layer",
         why_it_matters="An institution's flagship innovation is a FOREIGN design registration. "
                        "The entire observed reporting vocabulary is domestic-only.",
         recheck_before_external_use=True),
    dict(qid="Q-P1-007",
         quote="Sri Venkateswara College of Pharmacy has established IIC under the guidelines of MHRD "
               "of Govt. India with vision to prepare the institute for ATAL Ranking of Institution "
               "on Innovation achievement frame work.",
         speaker_role="IIC vision statement (institutional self-description)",
         speaker_name=None, institution="Sri Venkateswara College of Pharmacy",
         doc_id="IIC-014", year="2023-24",
         url="https://svcop.in/wp-content/uploads/2025/03/IIC-ANNUAL-REPORT-2023-24.pdf",
         access_date="2026-10-18", tier="T1", extraction_method="pdf_text_layer",
         why_it_matters="The ranking is the stated PURPOSE of the council, listed ahead of any "
                        "innovation intent. Direct evidence of compliance-led motivation.",
         recheck_before_external_use=True),
    dict(qid="Q-P1-008",
         quote="Amount proposed to be spent on promotion and awareness generation on Innovation "
               "Entrepreneurship, infrastructure in the campus 8 Lakhs",
         speaker_role="IIC / institution (self-reported)",
         speaker_name=None, institution="IPS Academy, Institute of Engineering and Science",
         doc_id="IIC-022", year="2024-25",
         url="https://ies.ipsacademy.org/wp-content/uploads/2025/10/2024-25%20IIC%20Report.pdf",
         access_date="2026-10-18", tier="T1", extraction_method="pdf_text_layer",
         why_it_matters="A PROPOSAL filed in a field that elsewhere carries actuals. Actual grant "
                        "support reported in the same report: INR 20,000. A 40x intent-vs-reality gap.",
         recheck_before_external_use=True),
    dict(qid="Q-P1-009",
         quote="Under IIC 7.0, in the year 2024-25, the Institution's Innovation Council (IIC) at NIT "
               "Calicut successfully organized a total of 67 activities including 32 activities as "
               "part of its IIC calendar.",
         speaker_role="IIC / institution (self-reported)",
         speaker_name=None, institution="National Institute of Technology Calicut",
         doc_id="IIC-001", year="2024-25",
         url="https://nitc.ac.in/imgserver/uploads/attachments/Ed__44cab2fb-596f-4726-9b77-8122bc273b37_.pdf",
         access_date="2026-10-18", tier="T1", extraction_method="pdf_text_layer",
         why_it_matters="Baseline: the best-resourced document in the corpus, and even it carries a "
                        "10.6x internal contradiction (see Q-P1-001).",
         recheck_before_external_use=True),
    dict(qid="Q-P1-010",
         quote="School of Law faculty assist with patent searches, drafting, and filing, and conduct "
               "training and workshops on intellectual property rights (IPR).",
         speaker_role="IIC report narrative", speaker_name=None,
         institution="Manav Rachna University", doc_id="IIC-005", year="2023-24",
         url="https://manavrachna.edu.in/assets/pdf/ANNUAL-REPORT-IIC-6.0-2023_24.pdf",
         access_date="2026-10-18", tier="T1", extraction_method="pdf_text_layer",
         why_it_matters="Patent drafting is happening inside a LAW school, not an IP office. One of "
                        "only two corpus institutions publishing a named IPR Cell with an in-charge.",
         recheck_before_external_use=True),
    dict(qid="Q-P1-011",
         quote="Amount grant or fund supported to student & Faculty lead Innovations, start-ups and "
               "IPR: 00",
         speaker_role="IIC / institution (self-reported)",
         speaker_name=None, institution="Institute of Science, Nagpur",
         doc_id="IIC-011", year="2024-25",
         url="https://iscnagpur.ac.in/pdf/Annual%20Report%202024-25.pdf",
         access_date="2026-10-18", tier="T1", extraction_method="pdf_text_layer",
         why_it_matters="The ONLY numeric zero in any money field across 36 documents. Everyone else "
                        "wrote 'Nil', 'NA', 'In-progress', a dash, or a lower bound.",
         recheck_before_external_use=True),
    dict(qid="Q-P1-012",
         quote="Number and Different types of I&E and IPR activities Conducted: 02",
         speaker_role="IIC / institution (self-reported)",
         speaker_name=None, institution="Institute of Science, Nagpur",
         doc_id="IIC-011", year="2024-25",
         url="https://iscnagpur.ac.in/pdf/Annual%20Report%202024-25.pdf",
         access_date="2026-10-18", tier="T1", extraction_method="pdf_text_layer",
         why_it_matters="The KPI form says 02. The narrative of the same report itemises 10 IIC + 4 "
                        "self-driven + 2 celebration = 16. An 8x internal contradiction.",
         recheck_before_external_use=True),
]

# Public-domain / openly-licensed statements about the compliance burden that the
# Phase 1 problem analyses will cite. Tier 2, and deliberately kept separate from
# the institution-reported T1 quotes above.
ACADEMIC_EVIDENCE = [
    dict(ref="ACAD-001",
         citation="Srihari, P. & Mathew, T. 'Analysis and Design of an Institution's Intellectual "
                  "Property Management System' / TTO practice study, IISc. PICMET 2014 proceedings.",
         finding="Analysed 382 patent records. Demonstrates that poor data cleaning and record-keeping "
                 "in a university TTO has legal and commercialisation consequences, not merely "
                 "administrative ones.",
         url=None, tier="T2", access_date="2026-10-18",
         use_for="Establishes that IP record-keeping defects are a commercial risk, not a clerical one."),
    dict(ref="ACAD-002",
         citation="ICAR-NAARM patent-management literature (agricultural university TTO practice).",
         finding="Documents that missed prosecution deadlines result in abandoned applications - i.e. "
                 "the cost of a missing date field is the entire patent.",
         url=None, tier="T2", access_date="2026-10-18",
         use_for="Quantifies the downside of deadline tracking that no observed system performs."),
    dict(ref="ACAD-003",
         citation="JIPR (Journal of Intellectual Property Research & Practice), 2026.",
         finding="Evidence that faculty file patents independently of their institution, which prevents "
                 "the institution claiming NIRF/ARIIA credit for work that happened on its campus.",
         url=None, tier="T2", access_date="2026-10-18",
         use_for="Explains a root cause of the NIRF/IP data gap: the invention leaves before the "
                 "record does."),
]
