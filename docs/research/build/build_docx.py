#!/usr/bin/env python3
"""StartupHub research — Word deliverables.

Produces:
    _exports/docx/StartupHub_Phase0_Findings.docx          the pitch-facing synthesis
    _exports/docx/StartupHub_Competitor_Pack.docx          all 15 dossiers
    _exports/docx/StartupHub_Segment_Census.docx           denominators
    _exports/docx/StartupHub_Source_Register.docx         76 cited sources
    _exports/docx/StartupHub_Positioning_Gaps.docx         the 13 gaps

Usage: python build/build_docx.py
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from docx import Document                                      # noqa: E402
from docx.enum.section import WD_ORIENT                       # noqa: E402
from docx.enum.table import WD_TABLE_ALIGNMENT                # noqa: E402
from docx.enum.text import WD_ALIGN_PARAGRAPH                 # noqa: E402
from docx.oxml import OxmlElement                              # noqa: E402
from docx.oxml.ns import qn                                    # noqa: E402
from docx.shared import Cm, Pt, RGBColor                       # noqa: E402

from data_sources import SOURCES, RESEARCH_META                # noqa: E402
from data_market import SEGMENTS, PRICING, PRICING_FIELDS, GAPS, STARTUPS_BY_STATE  # noqa: E402
from data_competition import COMPETITORS, FEATURE_KEYS, OPEN_QUESTIONS             # noqa: E402
from data_governance import DECISIONS, PROBLEMS               # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "_exports" / "docx"
CHARTS = ROOT / "_exports" / "charts"
DIAGRAMS = ROOT / "_exports" / "diagrams" / "png"

NAVY = RGBColor(0x1E, 0x3A, 0x5F)
TEAL = RGBColor(0x0F, 0x76, 0x6E)
RED = RGBColor(0xB9, 0x1C, 0x1C)
GREY = RGBColor(0x47, 0x55, 0x69)
WHITE = RGBColor(0xFF, 0xFF, 0xFF)


# ---------------------------------------------------------------------------------
def new_doc(landscape=False, margins=1.9):
    doc = Document()
    st = doc.styles["Normal"]
    st.font.name = "Calibri"
    st.font.size = Pt(10)
    st.paragraph_format.space_after = Pt(6)
    for s in doc.sections:
        if landscape:
            s.orientation = WD_ORIENT.LANDSCAPE
            s.page_width, s.page_height = s.page_height, s.page_width
        for a in ("left_margin", "right_margin"):
            setattr(s, a, Cm(margins))
        s.top_margin = Cm(1.6)
        s.bottom_margin = Cm(1.6)
    return doc


def shade(cell, hexcolor):
    el = OxmlElement("w:shd")
    el.set(qn("w:val"), "clear")
    el.set(qn("w:fill"), hexcolor)
    cell._tc.get_or_add_tcPr().append(el)


def title_block(doc, title, subtitle):
    p = doc.add_paragraph()
    r = p.add_run(title)
    r.font.size = Pt(24); r.font.bold = True; r.font.color.rgb = NAVY
    p.space_after = Pt(2)
    p = doc.add_paragraph()
    r = p.add_run(subtitle)
    r.font.size = Pt(10); r.font.color.rgb = GREY; r.font.italic = True
    p.space_after = Pt(4)
    rule(doc)


def h1(doc, text):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(14)
    p.paragraph_format.space_after = Pt(6)
    r = p.add_run(text)
    r.font.size = Pt(15); r.font.bold = True; r.font.color.rgb = NAVY
    pPr = p._p.get_or_add_pPr()
    b = OxmlElement("w:pBdr"); bt = OxmlElement("w:bottom")
    bt.set(qn("w:val"), "single"); bt.set(qn("w:sz"), "12")
    bt.set(qn("w:space"), "2"); bt.set(qn("w:color"), "0F766E")
    b.append(bt); pPr.append(b)


def h2(doc, text, colour=NAVY):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(10)
    p.paragraph_format.space_after = Pt(3)
    r = p.add_run(text)
    r.font.size = Pt(11.5); r.font.bold = True; r.font.color.rgb = colour


def rule(doc):
    p = doc.add_paragraph()
    pPr = p._p.get_or_add_pPr()
    b = OxmlElement("w:pBdr"); bt = OxmlElement("w:bottom")
    bt.set(qn("w:val"), "single"); bt.set(qn("w:sz"), "8")
    bt.set(qn("w:space"), "1"); bt.set(qn("w:color"), "0F766E")
    b.append(bt); pPr.append(b)


def para(doc, text, size=10, bold=False, italic=False, colour=None, space=6, align=None):
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(space)
    if align:
        p.alignment = align
    r = p.add_run(text)
    r.font.size = Pt(size); r.font.bold = bold; r.font.italic = italic
    if colour:
        r.font.color.rgb = colour
    return p


def bullet(doc, text, size=10, colour=None, bold_prefix=None):
    p = doc.add_paragraph(style="List Bullet")
    p.paragraph_format.space_after = Pt(3)
    if bold_prefix:
        r = p.add_run(bold_prefix); r.font.bold = True; r.font.size = Pt(size)
        if colour:
            r.font.color.rgb = colour
    r = p.add_run(text); r.font.size = Pt(size)
    return p


def callout(doc, text, fill="FEE2E2", colour=RED, bold=True, size=10):
    t = doc.add_table(rows=1, cols=1)
    t.alignment = WD_TABLE_ALIGNMENT.CENTER
    c = t.rows[0].cells[0]
    shade(c, fill)
    c.text = ""
    p = c.paragraphs[0]
    p.paragraph_format.space_after = Pt(2)
    r = p.add_run(text)
    r.font.size = Pt(size); r.font.bold = bold; r.font.color.rgb = colour
    doc.add_paragraph().paragraph_format.space_after = Pt(2)
    return t


def table(doc, headers, rows, widths=None, size=8.5, hdr_size=8.5, colour_map=None):
    t = doc.add_table(rows=1, cols=len(headers))
    t.style = "Table Grid"
    t.alignment = WD_TABLE_ALIGNMENT.CENTER
    for i, h in enumerate(headers):
        c = t.rows[0].cells[i]
        shade(c, "1E3A5F")
        c.text = ""
        r = c.paragraphs[0].add_run(str(h))
        r.font.size = Pt(hdr_size); r.font.bold = True; r.font.color.rgb = WHITE
    for row in rows:
        cells = t.add_row().cells
        for i, v in enumerate(row):
            cells[i].text = ""
            p = cells[i].paragraphs[0]
            p.paragraph_format.space_after = Pt(1)
            r = p.add_run("" if v is None else str(v))
            r.font.size = Pt(size)
            if colour_map:
                fill = colour_map(headers[i], v)
                if fill:
                    shade(cells[i], fill)
    if widths:
        for row in t.rows:
            for i, w in enumerate(widths):
                row.cells[i].width = Cm(w)
    doc.add_paragraph().paragraph_format.space_after = Pt(2)
    return t


def add_image(doc, path, width_cm=16.5, caption=None):
    if not Path(path).exists():
        return
    doc.add_picture(str(path), width=Cm(width_cm))
    doc.paragraphs[-1].alignment = WD_ALIGN_PARAGRAPH.CENTER
    if caption:
        para(doc, caption, size=8.5, italic=True, colour=GREY,
             align=WD_ALIGN_PARAGRAPH.CENTER, space=10)


def fmt_inr(v):
    if v is None:
        return "not public"
    return f"Rs {v:,}" if v >= 100000 else f"Rs {v/1000:.0f}k"


# =================================================================================
# DOC 1 — PHASE 0 FINDINGS
# =================================================================================
def doc_findings():
    doc = new_doc()
    title_block(doc, "StartupHub — Phase 0 Findings",
                "Positioning · Landscape Sweep · Competitive Deep Dive   |   Compiled 18 October 2026")

    para(doc, "Read this before writing a single slide. It compresses Phase 0 into what is defensible, "
              "what is not, and what to do next. Every claim is cited to the source register "
              f"({len(SOURCES)} sources: 44 government primary, 32 competitive).", 10, italic=True, colour=GREY)

    h1(doc, "1. The five findings that change the project")

    h2(doc, "Finding 1 — India digitised innovation ACCOUNTABILITY, not innovation OPERATIONS", RED)
    callout(doc, "Every mandated system is a periodic compliance ledger keyed on events and snapshots. "
                 "Not one is a system of record keyed on a venture through time.", fill="FEE2E2")
    table(doc,
          ["System", "Unit of record", "What it demands"],
          [["IIC", "the activity/event",
            "16+/yr, each a form with 4 social links, 3-way participant counts, expenditure, video URL, 2 photos, a document upload"],
           ["YUKTI-NIR", "the innovation snapshot", "Three static buckets: Idea/PoC (TRL 1-4), Innovation/Prototype (TRL 5-9), Business/Startup"],
           ["NIRF-Innovation", "the spreadsheet row", "~11 screens PER DISCIPLINE; per startup: name, DPIIT no, amount, funder, year, achievement level, investment type"],
           ["AISHE", "the institution-year aggregate", "Binary NIRF participation status — plus the AISHE code everything else keys off"],
           ["DPIIT", "the recognition certificate", "No institution-facing dashboard exists at all"]],
          widths=[2.6, 4.0, 11.0])
    callout(doc, "Nothing in the stack can answer: \"how many of our incubatees are still alive?\"",
            fill="FEF3C7", colour=RGBColor(0xB4, 0x53, 0x09))
    para(doc, "This is not a feature gap inside an existing product. It is a category error in how innovation "
              "policy was digitised.  →  Decision Log D-004", 9, italic=True, colour=GREY)

    h2(doc, "Finding 2 — The sharpest proof in the entire project", RED)
    callout(doc, "The IIC portal has a menu item called \"IPR/TTO Centres\". It registers a technology-transfer "
                 "office's EXISTENCE and FLOOR AREA. The portal then has NO FIELD ANYWHERE to record a single patent.")
    table(doc,
          ["Body", "What it demands", "Source"],
          [["IIC", "Registers the TTO centre — no patent field exists", "GOV-022"],
           ["NIRF Innovation", "\"Patents Commercialized & Technology Transferred\" and \"Income from Technology Transferred (in Rupees)\"", "GOV-028"],
           ["ARIIA", "\"Patent Application No\", \"Year of Patent Application\", \"Current Status\", \"IP / Patented Technology\" per innovation", "GOV-032"],
           ["KAPILA (MoE)", "2,746 institutes registered; 11,768 patents reimbursed; HEI patent filings 15,383 (FY23) → 33,675 (FY25) = +119%", "GOV-007"],
           ["MeitY playbook", "IP due diligence: ownership clarity, freedom to operate, defensibility; ownership vs 2-year university tech-transfer licence", "GOV-038"],
           ["IIT Madras", "431 patents filed in FY25-26; IP Management Cell + Technology Transfer Office", "COMP-027"]],
          widths=[2.8, 11.4, 2.0])
    callout(doc, "The patent data exists in the institution, exists nowhere in the ecosystem stack, and is "
                 "re-entered by hand every year. AND ZERO OF ELEVEN DIRECT COMPETITORS HAVE ANY IPR MODULE.")
    add_image(doc, CHARTS / "09_mandate_chain.png", 17.0,
              "The mandate chain — what institutions must report, and what no system holds")

    h2(doc, "Finding 3 — The market is not empty, and the price is Rs 75,000 not Rs 1.2 lakh", RED)
    callout(doc, "todo.md carries an assumed Rs 1.2 lakh/year with NO source. It sits ABOVE the cheapest "
                 "credible Indian incumbent.", fill="FEF3C7", colour=RGBColor(0xB4, 0x53, 0x09))
    table(doc,
          ["Product", "Price / year", "Note"],
          [["NestLens Orbit Launch", "Rs 75,000", "India-native, published INR, every feature. THE COMPETITIVE ANCHOR."],
           ["IncubatX Foundation", "Rs 1,20,000", "Founded 2026, zero verifiable customers, demo data on live dashboard"],
           ["Founderhood Starter −15% (university)", "Rs 1,82,070", "THE CREDIBLE GLOBAL PRICE OBJECTION"],
           ["Incubatee year one", "Rs 3,95,200", "Highest verified Indian price point"],
           ["AcceleratorApp core", "Rs 5,39,000", "ISO 27001 certified. Yale, MIT Design X, Max Planck. Zero Indian institutions."],
           ["Elsevier Pure, min Indian deployment", "Rs 44,60,000", "+ Rs 43.5 lakh mandatory onboarding. Does NOT manage startups."]],
          widths=[5.4, 3.0, 8.2])
    para(doc, "Rs 75,000/yr is a COMPETITIVE anchor, not a pricing decision. We have asked zero institutions "
              "what they would pay.  →  Decision Log D-006, Open Question OQ-03", 9, italic=True, colour=GREY)
    add_image(doc, CHARTS / "02_price_band.png", 15.5, "The price band")

    h2(doc, "Finding 4 — Three capabilities are contested by literally nobody", RED)
    table(doc,
          ["Capability", "Competitors with it", "Why India makes it mandatory"],
          [["IPR / patent lifecycle management", "0 of 11", "ARIIA fields, IIC IPR Cells, MeitY diligence, 3,249 TTO offices, +119% filing growth"],
           ["TRL as a first-class, reportable object", "0 of 11", "YUKTI-NIR bands every submission by TRL; ARIIA asks for TRL Stage; MeitY uses TRL as the investment benchmark"],
           ["YUKTI-NIR / IIC / ARIIA submission workflow", "0 of 11", "A government workflow. Verified YUKTI-NIR entries AUTO-POOL into ARIIA Section 4 ranking"]],
          widths=[5.6, 2.6, 8.4])
    callout(doc, "This is a mandate-shaped hole, not a feature gap.  →  Decision Log D-005")
    add_image(doc, CHARTS / "03_gap_matrix.png", 17.0,
              "Competitor feature matrix — the three red columns are empty across all eleven vendors")

    h2(doc, "Finding 5 — The real competitor is free, and it is WhatsApp", RED)
    callout(doc, "\"IISc Students — Join this Whatsapp group for updates.\"  India's most research-intensive "
                 "institution routes student coordination through WhatsApp.", fill="DBEAFE", colour=NAVY)
    table(doc,
          ["Alternative", "Real India cost", "What it structurally cannot do"],
          [["Excel / Google Sheets", "Rs 0 (bundled)", "No permissions, no audit trail, no relational integrity, no workflow, manual consolidation"],
           ["WhatsApp + Google Drive", "Rs 0", "No structure, no permissions, no audit trail, no reporting. THIS IS THE OPERATIONAL DATABASE."],
           ["Notion / Superhuman Docs / Airtable", "Rs 26k–1.73L at IIC scale", "AUDIT LOGS GATED BEHIND ENTERPRISE. Notion records events only \"starting from the time of upgrade\" — no retroactive history."],
           ["Trello / ClickUp / Monday / Asana", "Rs 54k–1.19L at 10 users", "No domain model, no intake workflow, no IPR. Audit logs Enterprise-only."],
           ["Campus ERP", "Rs 500–2,000 per student per year", "ZERO Indian campus ERP vendors have a startup-incubation module"]],
          widths=[4.6, 3.6, 8.4])
    para(doc, "We cannot win by being cheaper. We can only win by being the ONLY thing that produces a compliant "
              "submission — and by having the retroactive audit trail that free and cheap tools structurally cannot "
              "provide.  →  Decision Log D-008", 10, bold=True)

    doc.add_page_break()

    # ---------------- Positioning ----------------
    h1(doc, "2. The positioning, stated precisely")
    para(doc, "NOT a platform for startups.  NOT a directory.  NOT another IIC portal.  "
              "NOT an \"AI-powered ecosystem platform\" — IncubatX already claims that and ships demo data on its dashboard.")
    callout(doc, "StartupHub is a SYSTEM OF RECORD for the venture — keyed on the entity and its state over time — "
                 "that produces the mandated submissions as a by-product.",
            fill="DCFCE7", colour=RGBColor(0x16, 0x65, 0x34))
    para(doc, "The institution enters a startup ONCE. That single record then generates:")
    table(doc,
          ["Submission", "Why it matters", "Competitor coverage"],
          [["IIC activity pack (evidence attached)", "Star rating is a headline institution attribute", "0 of 11"],
           ["YUKTI-NIR entry with correct TRL + verifier workflow", "AUTO-POOLS into ARIIA Section 4 ranking  ★", "0 of 11"],
           ["NIRF Innovation rows across all disciplines", "5 marks hinge on one countable", "0 of 11"],
           ["ARIIA submission", "100+ indicators, 5 categories", "0 of 11"],
           ["DST / BIRAC / MeitY utilisation report", "Audited, PFMS-registered", "1 partial"],
           ["IPR docket — disclosure → filing → deadlines → annuity → royalty", "Nobody has it; India mandates it", "0 of 11"]],
          widths=[6.6, 6.8, 3.2])
    callout(doc, "★ The YUKTI-NIR → ARIIA auto-pool is the single most powerful business-model insight in Phase 0. "
                 "A product that makes an institution look better in a national ranking is selling into a budget "
                 "line that ALREADY EXISTS.  →  Decision Log D-007", fill="FEF3C7",
            colour=RGBColor(0xB4, 0x53, 0x09))

    # ---------------- Where not to compete ----------------
    h1(doc, "3. Where StartupHub must NOT compete")
    para(doc, "Honest scoping is more useful than optimism.", 10, italic=True, colour=GREY)
    table(doc,
          ["Territory", "Who owns it", "Why we refuse"],
          [["Real estate, labs, desks, key control", "incuTrack (20 years, work orders, key control, insurance, kitchen incubators) and EcoSync (5 pricing tiers, deposits, Razorpay)",
            "Capital-intensive, peripheral to the wedge, and the most likely source of a free defensive feature"],
           ["Grant disbursement depth", "AcceleratorApp's Funding module and EcoSync", "Cover with scheme MATCHING, not a general ledger"],
           ["Community / social feed", "RiserNest and Circle (Rs 89–199/mo)", "They do it better and cheaper than we can"],
           ["Generic LMS", "Disco, Circle, LoftOS", "Not our business"],
           ["Big logo walls", "AcceleratorApp (Yale, MIT, Max Planck) and Accubate (TCS, KPMG, Hero)", "We cannot out-muscle either on brand"]],
          widths=[4.4, 6.4, 5.8])
    callout(doc, "And the under-rated threat: LoftOS. A no-code portal builder WITH an accelerator template. "
                 "A university IT team could build its own incubation portal for $29–349/month and OWN IT OUTRIGHT. "
                 "Case study: RWTH Aachen University (Collaeb).",
            fill="FEF3C7", colour=RGBColor(0xB4, 0x53, 0x09))
    para(doc, "Implication: the moat cannot be \"we have features a builder doesn't\". It must be the things a "
              "builder structurally cannot produce — mandated-portal schemas, IPR docket logic, TRL-to-scheme "
              "mapping, and a compliance output the institution can hand to a government body.", 10, bold=True)

    doc.add_page_break()

    # ---------------- What we don't know ----------------
    h1(doc, "4. What we know we do NOT know")
    blocking = [q for q in OPEN_QUESTIONS if q["priority"] == "BLOCKING"]
    table(doc,
          ["ID", "Unknown", "Blocks", "How to settle it"],
          [[q["id"], q["title"], q["why_it_blocks"][:150], q["what_would_settle_it"][:160]] for q in blocking],
          widths=[1.6, 5.0, 5.4, 4.6],
          colour_map=lambda h, v: "FEE2E2" if h == "ID" and str(v).startswith("OQ") else None)
    table(doc,
          ["ID", "Other significant unknowns"],
          [["OQ-04", "No public API exists for IIC, YUKTI, NIRF, AISHE or MAARG → assume NO API, design export/import (Phase 22)"],
           ["OQ-10", "The IIC star-rating formula is NOT publicly documented — the official page returns \"Coming Soon\". FEATURE RISK."],
           ["OQ-11", "BHASKAR may be overhauled into a \"National Startup Master Data\" registry. Tier 4 — trade press, not a notification."],
           ["OQ-13", "Procurement mechanics (GeM, DRE, data localisation) may be the hardest constraint in the business."]],
          widths=[1.8, 14.8])
    add_image(doc, CHARTS / "08_open_questions.png", 16.5, "All 18 open questions")

    # ---------------- Exploitable weaknesses ----------------
    h1(doc, "5. Three verified weaknesses we can attack directly")
    para(doc, "These are quotable, citable, and true — not spin.", 10, italic=True, colour=GREY)

    h2(doc, "EcoSync has already conceded it cannot pass enterprise procurement")
    callout(doc, "\"We do not hold SOC 2 or ISO 27001 certification, and we would rather tell you that here than have "
                 "you find out in a security questionnaire. We do not publish an uptime SLA. We are a small team in "
                 "India building this for incubators in India, and our first incubator is still our reference customer "
                 "rather than our hundredth.\"  — ecosync.network", fill="F1F5F9", colour=NAVY)
    para(doc, "EcoSync is arguably the best-placed competitor operationally — and it has pre-emptively answered "
              "\"no\" to the two questions a university IT committee asks first.", 9, italic=True, colour=GREY)

    h2(doc, "Gohorto's trust badges rest on three reviews")
    para(doc, "It claims a \"G2 High Performer 2026\" badge and a \"5.0/5 on Capterra\" rating — built on 3 GetApp "
              "reviews, one flagged vendor-referred. Its own comparison pages score itself 4.8 and every rival "
              "2.1–3.6. Its scale claims are unverifiable and its timeline implausible.")

    h2(doc, "Orbit publishes two conflicting price lists on its own domain")
    para(doc, "Institutional tiers say Rs 75,000/yr. The NestLens overview page says \"Orbit OS Rs 29,999/month "
              "(Rs 2,99,999/year)\". A buyer hits both within one click. In a procurement-comparison conversation "
              "where that surfaces, StartupHub wins on transparency — and transparency is cheap to compete on.")

    callout(doc, "No competitor can prove a large Indian institution runs on their software. Six of eleven have "
                 "ZERO third-party reviews; the two with real reference bases (AcceleratorApp, Accubate) have ZERO "
                 "Indian institutions.  For StartupHub, ONE published, verifiable Indian university case study with "
                 "named referees is worth more than any feature on the comparison table. It takes months — start early.",
            fill="DCFCE7", colour=RGBColor(0x16, 0x65, 0x34))

    doc.add_page_break()

    # ---------------- Next steps ----------------
    h1(doc, "6. What to do next")
    h2(doc, "Immediate (this week)")
    bullet(doc, "Query MIC (mic-mhrd@gov.in) or read the MIC Brochure 2025 graphic to resolve the IIC count. GATES TAM/SAM.",
           bold_prefix="Resolve OQ-01 — the IIC count. ")
    bullet(doc, "Factly proved it is extractable and monetised it (6,817 rows, 204 institutions). That cohort is our most reachable segment and the seed of a potential data asset.",
           bold_prefix="Extract the NIRF PDF corpus into 01_Evidence_Vault/Datasets/. ")
    bullet(doc, "Six of eleven competitors have no reference institution. A named case study takes months to produce and is worth more than features.",
           bold_prefix="Start the reference-customer clock. ")

    h2(doc, "Phase 1 (Problem Research)")
    bullet(doc, "Six of twelve problem areas are currently INFERRED or ASSUMED. Only IPR tracking has 9 independent primary citations.")
    bullet(doc, "Commission a time-and-motion study across ~20 IIC institutions. No one has published this (OQ-12). "
                 "It is the difference between saying \"institutions have this problem\" and \"7 of 10 lose X hours per month to it.\"")

    h2(doc, "Phase 2–3 (Customer Research + Interviews)")
    bullet(doc, "Start with PERFORMANCE MONITORING (weakest evidence, strongest structural claim) and the IPR WORKFLOW "
                "(best-documented, never observed). Full interview priority order is in 03_Problem_Evidence.")
    bullet(doc, "Use the VALUE framing, never the price framing: \"If this problem disappeared tomorrow, what would that save you?\"")

    h2(doc, "Phase 21 (MVP) — the scope consequence")
    callout(doc, "todo.md Phase 0's proposed V1 is NO LONGER VIABLE AS WRITTEN.", fill="FEE2E2")
    para(doc, "Ten modules — dashboard, registry, idea management, incubation, mentor, IPR, resource, program, "
              "performance, reports — is what IncubatX, Orbit and EcoSync already sell. If that is V1, StartupHub is a "
              "worse version of three funded competitors.")
    para(doc, "The V1 must be narrower and deeper on the mandate:  one venture record  ·  the TRL engine  ·  the IPR "
              "docket  ·  the generated submissions.  Four things. Everything else in Phase 21's list is table stakes.",
         11, bold=True, colour=TEAL)

    h1(doc, "7. The uncomfortable summary")
    callout(doc, "Phase 0 did not find a BIGGER opportunity. It found a much SHARPER and much SMALLER one.",
            fill="DBEAFE", colour=NAVY)
    para(doc, "Not \"the innovation ecosystem needs a platform.\" Eleven vendors already sell that, from Rs 75,000/yr.", 11, bold=True)
    para(doc, "Instead:", 11, bold=True)
    para(doc, "Indian institutions are legally required to file patent-level data three times a year to three "
              "different government bodies, in a national system that has no field for recording a patent — and eleven "
              "vendors are competing on AI and grant ledgers instead.", 12, bold=True, colour=RED)
    para(doc, "That is the gap. It is narrow, it is real, it is documented entirely in primary government sources, "
              "and NOBODY is competing for it.", 11, bold=True, colour=TEAL)

    p = OUT / "StartupHub_Phase0_Findings.docx"
    doc.save(p)
    print(f"  docx  {p.relative_to(ROOT)}  ({p.stat().st_size//1024} KB)")


# =================================================================================
# DOC 2 — COMPETITOR PACK
# =================================================================================
def doc_competitors():
    doc = new_doc(landscape=True, margins=1.4)
    title_block(doc, "StartupHub — Competitor Pack",
                f"{len(COMPETITORS)} profiles across direct, global and DIY-build categories   |   Compiled 18 October 2026")

    callout(doc, "StartupHub is NOT entering an empty market. Three India-native competitors publish INR prices "
                 "from Rs 75,000/yr upward. The market's biggest weakness is that almost nobody in it can prove an "
                 "Indian institution runs on their software — and exactly ZERO competitors have an IPR module or a "
                 "TRL engine, both of which India mandates.", fill="DBEAFE", colour=NAVY)

    h1(doc, "Comparison matrix")
    short = {"portfolio": "Portfolio", "incubation": "Incubation", "panel_eval_audit": "Panel+audit",
             "mentorship": "Mentorship", "ipr": "IPR", "trl": "TRL", "resources": "Resources",
             "programme": "Programme", "milestones": "Milestones", "funding_ledger": "Funding",
             "reporting": "Reporting", "ai": "AI", "integrations": "Integr.",
             "india_compliance": "India", "mandated_export": "MANDATE"}
    score = {"Absent": "○", "Partial": "◐", "Good": "●", "Strong": "◎"}
    rows = []
    for c in COMPETITORS:
        r = [c["name"], c["origin"], fmt_inr(c["price_low_inr"]), c["pricing_confidence"],
             str(c["indian_customers"]), c["reviews"].split("(")[0].strip()]
        for k in FEATURE_KEYS:
            r.append(score[{0: "Absent", 1: "Partial", 2: "Good", 3: "Strong"}[c[k]]])
        rows.append(r)
    hdr = ["Vendor", "Origin", "Entry price", "Price conf.", "Indian cust.", "Reviews"] + \
          [short[k] for k in FEATURE_KEYS]

    def cm(h, v):
        if h in short.values() and v in ("○",):
            return "FEE2E2"
        if h in ("Entry price",) and str(v).startswith("Rs 75,000"):
            return "FEE2E2"
        if h == "Price conf." and v == "NOT_PUBLIC":
            return "FECACA"
        return None

    table(doc, hdr, rows, widths=[3.4, 3.0, 2.0, 1.8, 1.4, 1.8] + [1.15] * len(FEATURE_KEYS),
          size=7.5, hdr_size=7.5, colour_map=cm)
    para(doc, "○ Absent   ◐ Partial   ● Good   ◎ Strong        "
              "Red = absent everywhere; the IPR, TRL and MANDATE columns are ○ for all eleven direct vendors.",
         8.5, italic=True, colour=GREY)

    add_image(doc, CHARTS / "05_competitor_positioning.png", 17.0, "Competitive positioning")
    add_image(doc, CHARTS / "03_gap_matrix.png", 24.0, "Feature matrix")

    # Individual dossiers
    for c in COMPETITORS:
        doc.add_page_break()
        h1(doc, f"{c['name']}  —  {c['vendor']}")
        table(doc, ["Field", "Detail"],
              [["Origin / founded", f"{c['origin']}  ·  {c['founded']}"],
               ["Category", c["category"]],
               ["URL", c["url"]],
               ["Pricing model", c["price_model"]],
               ["Price", f"{fmt_inr(c['price_low_inr'])} — {fmt_inr(c['price_high_inr'])}  [{c['pricing_confidence']}]"],
               ["Price detail", c["price_note"]],
               ["Free tier", c["free_tier"]],
               ["Indian institutional customers", f"{c['indian_customers']}  {('— ' + c['indian_customer_names']) if c['indian_customer_names'] else ''}"],
               ["Independent reviews", c["reviews"]],
               ["Security certification", c["iso_cert"]],
               ["White-label", c["white_label"]],
               ["Threat level", c["threat_level"]]],
              widths=[4.4, 19.0], size=9)

        h2(doc, "Feature coverage")
        SCALE = {0: "○ Absent", 1: "◐ Partial", 2: "● Good", 3: "◎ Strong"}
        table(doc, ["Dimension", "Coverage", "Dimension", "Coverage"],
              [[FEATURE_KEYS[i], SCALE[c[FEATURE_KEYS[i]]],
                FEATURE_KEYS[i + 7] if i + 7 < len(FEATURE_KEYS) else "",
                SCALE[c[FEATURE_KEYS[i + 7]]] if i + 7 < len(FEATURE_KEYS) else ""]
               for i in range(7)],
              widths=[4.0, 3.0, 4.0, 3.0], size=8.5,
              colour_map=lambda h, v: "FEE2E2" if v == "○ Absent" else None)

        for label, txt, col in [("STRENGTHS", c["strengths"], RGBColor(0x16, 0x65, 0x34)),
                                ("WEAKNESSES", c["weaknesses"], RGBColor(0xB4, 0x53, 0x09)),
                                ("VERIFIED USER COMPLAINTS", c["complaints"], RGBColor(0xB9, 0x1C, 0x1C)),
                                ("WHAT IT DOES NOT DO", c["does_not_do"], RED)]:
            h2(doc, label, col)
            para(doc, txt, 9)

    p = OUT / "StartupHub_Competitor_Pack.docx"
    doc.save(p)
    print(f"  docx  {p.relative_to(ROOT)}  ({p.stat().st_size//1024} KB)")


# =================================================================================
# DOC 3 — SEGMENT CENSUS
# =================================================================================
def doc_segments():
    doc = new_doc()
    title_block(doc, "StartupHub — Segment Census",
                "How big is each segment, really?  |  Compiled 18 October 2026")

    callout(doc, "⚠  The three biggest figures a pitch will want — how many institutions have an IIC, how many "
                 "incubators exist, and what institutions will pay — are respectively UNVERIFIABLE, NOT PUBLISHED "
                 "BY ANYONE, and COMPLETELY UNVALIDATED. Nothing below should be presented externally without its date and source.",
            fill="FEE2E2")
    para(doc, "Segment sizes span THREE orders of magnitude. This is why Phase 0 deliberately did not freeze a "
              "beachhead customer.", 11, bold=True, colour=TEAL)
    add_image(doc, CHARTS / "01_segment_sizes.png", 17.0, "Segment census (log scale)")

    h1(doc, "All denominators")
    def cm(h, v):
        if h == "conflict":
            return "FEE2E2" if v is True else None
        if h == "reliability":
            return {"HIGH": "DCFCE7", "MEDIUM": "FEF3C7", "LOW": "FEE2E2"}.get(v)
        return None
    table(doc, ["Segment", "Count", "As of", "Source", "Rel.", "Conflict", "Notes"],
          [[s["segment"], f"{s['count']:,}", s["as_of"], s["source_id"], s["reliability"],
            "YES" if s["conflict"] else "", s["notes"]] for s in SEGMENTS],
          widths=[4.6, 1.9, 1.8, 1.6, 1.2, 1.4, 6.5], size=8, colour_map=cm)

    h1(doc, "DPIIT-recognised startups by State (31 March 2026)")
    add_image(doc, CHARTS / "04_startups_by_state.png", 15.5, "Top 10 published")
    table(doc, ["State / UT", "Startups", "Direct jobs"],
          [[s, f"{v:,}", f"{j:,}"] for s, v, j in STARTUPS_BY_STATE], widths=[5.0, 4.0, 4.0], size=9)

    h1(doc, "Where the reporting burden is concentrated")
    table(doc, ["Obligation", "Scale", "Source"],
          [["IIC council meetings", "Min 2/yr with signed resolutions, quarterly plans, minutes, photographs — AND THEY GATE EVERYTHING ELSE", "GOV-019"],
           ["IIC activities", "16+/yr, each a full evidence submission (4 social links, 3-way counts, expenditure, video, 2 photos, document)", "GOV-020/021"],
           ["YUKTI-NIR", "Every innovation/startup, TRL-banded, institute-verified, FLOWS INTO ARIIA", "GOV-023/024"],
           ["NIRF Innovation", "~11 screens PER DISCIPLINE; per startup: name, DPIIT no, amount, funder, year, achievement level, investment type", "GOV-028"],
           ["ARIIA", "100+ indicators across 5 categories, incl. patent-level fields", "GOV-032"],
           ["NIDHI / DST / BIRAC", "Grant utilisation, audited certificates, PFMS/CGA registration, unspent-balance refund", "GOV-010"],
           ["AISHE", "Binary NIRF status — plus the AISHE code everything else keys off", "GOV-032"]],
          widths=[3.4, 10.6, 2.6], size=8.5)

    callout(doc, "And the hard gate, verbatim from the portal manual: \"If it is in red cross then you cannot add any "
                 "activity under 'Manage Activity' section.\"  A governance artefact gates the reporting form.",
            fill="FEF3C7", colour=RGBColor(0xB4, 0x53, 0x09))

    p = OUT / "StartupHub_Segment_Census.docx"
    doc.save(p)
    print(f"  docx  {p.relative_to(ROOT)}  ({p.stat().st_size//1024} KB)")


# =================================================================================
# DOC 4 — SOURCE REGISTER
# =================================================================================
def doc_sources():
    doc = new_doc(landscape=True, margins=1.4)
    title_block(doc, "StartupHub — Source Register",
                f"{len(SOURCES)} cited sources   |   Compiled 18 October 2026   |   Every factual claim traces to one row here")

    h1(doc, "Evidence tier standard")
    for k, v in RESEARCH_META["evidence_grading"].items():
        bullet(doc, v, 9.5, bold_prefix=f"TIER {k} — ")

    h1(doc, "Reliability markers")
    for k, v in RESEARCH_META["reliability_markers"].items():
        bullet(doc, v, 9.5, bold_prefix=f"{k} — ")

    doc.add_page_break()
    h1(doc, f"All {len(SOURCES)} sources")
    def cm(h, v):
        if h == "Conflict":
            return "FEE2E2" if v is True else None
        if h == "Reliability":
            return {"HIGH": "DCFCE7", "MEDIUM": "FEF3C7", "LOW": "FEE2E2"}.get(v)
        if h == "Tier":
            return "DBEAFE"
        return None
    table(doc, ["ID", "Area", "Claim", "Organisation", "Type", "Tier", "Rel.", "Conflict", "Accessed", "Notes"],
          [[s["id"], s["area"], s["claim"], s["org"], s["stype"], s["tier"], s["reliability"],
            "YES" if s["conflict"] else "", s["access"], s["notes"]] for s in SOURCES],
          widths=[1.5, 2.2, 7.4, 3.4, 2.4, 0.9, 1.3, 1.3, 1.6, 6.0], size=7.5, colour_map=cm)

    doc.add_page_break()
    h1(doc, "Full URLs")
    table(doc, ["ID", "URL"],
          [[s["id"], s["url"] or "— (negative finding)"] for s in SOURCES],
          widths=[1.6, 22.4], size=8)

    p = OUT / "StartupHub_Source_Register.docx"
    doc.save(p)
    print(f"  docx  {p.relative_to(ROOT)}  ({p.stat().st_size//1024} KB)")


# =================================================================================
# DOC 5 — POSITIONING GAPS
# =================================================================================
def doc_gaps():
    doc = new_doc()
    title_block(doc, "StartupHub — Positioning Gaps",
                "13 things nobody in this market does well   |   Ranked by severity and by how confidently no competitor covers them")

    callout(doc, "The structural finding: every mandated Indian system is a periodic compliance ledger keyed on events "
                 "and snapshots. Not one is a system of record keyed on a venture through time. The gap is not a "
                 "missing feature inside an existing product — it is a CATEGORY ERROR in how Indian innovation policy "
                 "was digitised.", fill="DBEAFE", colour=NAVY)

    add_image(doc, CHARTS / "07_positioning_gaps.png", 17.0, "Coverage by the 11 direct vendors")

    for g in GAPS:
        col = {"CRITICAL": RED, "HIGH": RGBColor(0xB4, 0x53, 0x09), "MEDIUM": NAVY}[g["severity"]]
        doc.add_page_break()
        h1(doc, f"{g['gap_id']} — {g['title']}")
        para(doc, f"Severity: {g['severity']}   ·   Covered by {g['competitors_with']} of {g['competitors_total']} direct vendors",
             10, bold=True, colour=col)
        h2(doc, "The evidence")
        para(doc, g["evidence"], 9.5)
        h2(doc, "What the gap actually is")
        para(doc, g["gap_detail"], 9.5)
        h2(doc, "Why India makes this unavoidable")
        para(doc, g["why_india"], 9.5)
        h2(doc, "Nearest competitor")
        para(doc, g["nearest_competitor"], 9.5, italic=True)
        callout(doc, g["verdict"], fill="FEE2E2" if g["severity"] == "CRITICAL" else "FEF3C7",
                colour=col if g["severity"] == "CRITICAL" else RGBColor(0xB4, 0x53, 0x09))

    p = OUT / "StartupHub_Positioning_Gaps.docx"
    doc.save(p)
    print(f"  docx  {p.relative_to(ROOT)}  ({p.stat().st_size//1024} KB)")


DOCS = [doc_findings, doc_competitors, doc_segments, doc_sources, doc_gaps]


def main() -> int:
    OUT.mkdir(parents=True, exist_ok=True)
    print("Building Word documents...")
    for fn in DOCS:
        fn()
    print(f"\nDone. {len(DOCS)} documents.")
    return 0


if __name__ == "__main__":
    sys.exit(main())