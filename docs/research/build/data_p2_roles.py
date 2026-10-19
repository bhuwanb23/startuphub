#!/usr/bin/env python3
"""StartupHub Phase 2 - customer roles, buying centres and the approval chain.

todo.md Phase 2 lists 12 customer roles and asks four questions: who uses it,
who decides, who pays, who approves - noting "these might be four different
people". The evidence says something sharper, and this module encodes it.

ROLE CLASSES (four, not one flat list - see D-019):

  A  Mandated IIC seats      Offices the IIC portal HARD-ENFORCES. Without them the
                             role sub-tab goes to a red cross and NO activity can
                             be entered. These are not personas; they are compliance
                             obligations with published responsibilities.
  B  Adjacent institutional  Real offices that matter but sit OUTSIDE the IIC portal
                             (VC/Director, Dean, Incubation Manager, E-Cell...).
  C  Off-portal gatekeepers  Control the purchase and appear NOWHERE in the IIC
                             portal and nowhere on todo.md's list. Added per user
                             decision. Registrar/Dean(ICSR), Purchase Committee,
                             Finance, Audit, IT Administrator.
  D  Individual users        Students and founders. Real users, never institutional
                             buyers.

EVIDENCE GRADING (repo standard, D-017):
  DOCUMENTED     - multiple primary sources read and cited
  SINGLE-SOURCE  - one primary source
  HYPOTHESIS     - structurally implied, NOT evidenced

THE MECHANICAL HONESTY GUARD (the important one):

  No role may be graded DOCUMENTED on `pays` without citing a source that
  actually grants budget authority. Procurement rules tell us who may approve a
  spend; they do NOT tell us who holds a budget line for innovation software.
  `validation()` enforces this and fails the build. Phase 0's D-007 ("sell
  against the IIC grant") is an INFERENCE, and this guard stops it silently
  hardening into a fact.
"""

# --------------------------------------------------------------------------
# Sources used. Tiers follow 00_Research_Index/README.md section 3.
# --------------------------------------------------------------------------
SOURCES = {
    "P2-S01": dict(
        org="Ministry of Education, Innovation Cell (MIC)",
        title="IIC portal - Add/Update Faculty Member Details: role assignment",
        url="https://iic.mic.gov.in/assets/html/AddUpdateFacultyMemberDetails.html",
        tier="T1", source_type="Government portal - mandate",
        why=("Establishes the mandatory role set AND the gate: deleting Convener / YUKTI / "
             "Social Media / Innovation Activity / Internship / IPR / Startup / ARIIA / NIRF / "
             "Member roles turns the sub-tab to a red cross, and \"If it is in 'red cross' then "
             "you cannot add any activity under 'Manage Activity' section.\"")),
    "P2-S02": dict(
        org="IIT Palakkad",
        title="Purchase Procedure 2025",
        url="https://rti.iitpkd.ac.in/sites/default/files/2025-05/Purchase%20Procedure%202025.pdf",
        tier="T1", source_type="Institutional procurement manual",
        why=("LPC Rs 1,00,001-10,00,000; CSPC for computers/software >Rs 2,50,000; SPC >Rs "
             "5,00,000 acting for the Director; EPC >Rs 25 lakh composed of Chairperson + "
             "Indenter (Convener) + 2-3 faculty + Purchase Nominee + Finance Nominee; Audit >Rs "
             "10 lakh; administrative approval of Registrar / Dean (ICSR).")),
    "P2-S03": dict(
        org="NIT Warangal",
        title="Manual for Procurement of Goods & Services 2025",
        url="https://nitw.ac.in/api/static/files/MANUAL_2025-4-22-15-15-19.pdf",
        tier="T1", source_type="Institutional procurement manual",
        why=("Competent Financial Authority limits: Director all cases; Deputy Director / "
             "Registrar / Dean (R&D) Rs 10,00,000 non-consumable and Rs 5,00,000 consumable; "
             "HoD Rs 2,50,000 and Rs 1,00,000. Major Purchase Committee >Rs 30 lakhs.")),
    "P2-S04": dict(
        org="NIT Karnataka",
        title="Manual of Purchase of Goods (Plan Fund, Sponsored Projects)",
        url="https://www.nitk.ac.in/document/attachments/116/Pre-Revised_NITK_Manual-of-Purchase.pdf",
        tier="T1", source_type="Institutional procurement manual",
        why=("Administrative approval chain: Faculty-in-charge of Purchase (buyer) -> H.O.D. for "
             "cost >Rs 1 Lakh -> Dean (P&D) for cost >Rs 3 Lakhs -> Director. Cost >Rs 1 Lakh "
             "goes to limited tender; >Rs 25 Lakhs requires newspaper advertisement via Dean (P&D).")),
    "P2-S05": dict(
        org="Central Rajasthan State University",
        title="Purchase Rules 2020",
        url="https://crsu.ac.in/wp-content/uploads/ArchiveNotification/2020/Purchase%20Rules%202020.pdf",
        tier="T1", source_type="University purchase rules",
        why=("HPSC >Rs 15 Lacs; SPC-I Rs 2,00,001-15 Lacs; SPC-II Rs 25,001-2,00,000. "
             "Recommendations of SPC-II approved by the REGISTRAR; SPC-I and HPSC by the "
             "VICE-CHANCELLOR. Registrar up to Rs 2,00,000; above that vests in the VC.")),
    "P2-S06": dict(
        org="Sathyabama Institute of Science and Technology (deemed university)",
        title="Purchase Policy",
        url="https://sist.sathyabama.ac.in/download/iqac/purchase_policy.pdf",
        tier="T1", source_type="Private deemed university purchase policy",
        why=("Central Purchase Committee headed by VC with Registrar, Finance Officer, 2-3 "
             "management members, a Dean and a HoD. CRITICAL: purchases above Rs 2 lakhs \"shall "
             "be included in the budgetary proposals of the department, duly approved by the "
             "Finance Committee, Board of Management before heading to the purchase procedure.\" "
             "Purchases under Rs 2 lakhs are brought to the same bodies only for ratification.")),
    "P2-S07": dict(
        org="Mangalore Institute of Technology & Engineering (autonomous college)",
        title="Administration - Purchase Committee",
        url="https://mite.ac.in/administration/",
        tier="T1", source_type="Private college administration page",
        why=("Purchase Committee chaired by the Chairman of the governing Trust, convened by the "
             "PRINCIPAL, members Vice Principal and Heads of Departments. Triggered for "
             "\"purchases worth more than 1 lakh\" (new purchase only).")),
    "P2-S08": dict(
        org="ICAR - Indian Institute of Rice Research",
        title="Institute Purchase Committee 2025",
        url="https://wii.webline.net.in/uploads/media/pdf/institute_purchase_committee_2025.pdf",
        tier="T1", source_type="Institute purchase procedure",
        why=("SPC-I up to Rs 2.00 lacs chaired by Head of Office; SPC-II above Rs 2.00 lacs "
             "chaired by DEAN. The indentor or project leader is co-opted as a committee member "
             "\"The co-opted member can only advise the committee.\" Above Rs 10.00 lakhs a "
             "checklist goes to the competent authority.")),
    "P2-S09": dict(
        org="Delhi University",
        title="Procurement of Goods & Services (GFR extract)",
        url="https://www.du.ac.in/uploads/new-web/11052022_Procurement%20of%20Goods%20&%20Services.pdf",
        tier="T1", source_type="University procurement rule",
        why=("Purchases above Rs 25,000 and up to Rs 2,50,000 require a duly constituted Local "
             "Purchase Committee of three members, who jointly record a certificate of "
             "reasonableness, quality, specification and supplier reliability.")),
    "P2-S10": dict(
        org="Ministry of Finance, Government of India",
        title="General Financial Rules 2017 (Rule 145 / Rule 157)",
        url="https://doe.gov.in/files/circulars_document/Delegation_of_Financial_Powers_Rules_2024_Booklet.pdf",
        tier="T1", source_type="Statutory procurement rule",
        why=("Rule 157: demand for goods \"should not be divided into small quantities to make "
             "piecemeal purchases to avoid the necessity of obtaining the sanction of higher "
             "authority required with reference to the estimated value of the total demand.\" "
             "Closes the obvious workaround of splitting a licence into line items.")),
    "P2-S11": dict(
        org="IIT Hyderabad",
        title="IIC Guidelines - composition and responsibilities",
        url="https://iic-iith.netlify.app/files/IIC-IITH%20Guidelines.pdf",
        tier="T1", source_type="Institutional IIC constitution",
        why=("Named IIC office holders with their underlying post: President = Director; Vice "
             "President = Dean (R&D); Startup Activity Coordinator = Faculty-in-Charge Incubation "
             "Centre; IPR coordinator = Faculty-in-Charge IP Cell. Student-held seats: Internship "
             "Coordinator is a BTech 4th Year student, IPR Coordinator an MTech 3rd year student.")),
    "P2-S12": dict(
        org="Scottish Church College, Kolkata",
        title="IIC Annual Report 2024-25",
        url="https://www.scottishchurch.ac.in/docs/IIC/20251229_IIC_Annual_Report_2024_25.pdf",
        tier="T1", source_type="Institutional IIC annual report (Phase 1 corpus IIC-012)",
        why=("Names the three offices that produced the report: President Dr. Samrat "
             "Bhattacharjee; Convener Mr. Saptarshi Chakraborty; report compiled by Dr. Tamanna "
             "Sultana, Innovation Activity Coordinator. Evidence that the compiling role is a "
             "distinct office from President and Convener.")),
}

ROLE_CLASSES = {
    "A": "Mandated IIC seats - portal-enforced. No activity can be entered without them.",
    "B": "Adjacent institutional offices - real, but outside the IIC portal.",
    "C": "Off-portal gatekeepers - control the purchase; absent from the IIC portal and from "
         "todo.md's list. Added per D-019.",
    "D": "Individual users - students and founders. Never institutional buyers.",
}

EVIDENCE_GRADES = {
    "DOCUMENTED": "Multiple primary sources read and cited.",
    "SINGLE-SOURCE": "One primary source. Suggestive; must not carry a claim alone.",
    "HYPOTHESIS": "Structurally implied but NOT evidenced. Requires Phase 3 interviews.",
}

DEEP_DIVE_ROLES = ["A-03", "A-01", "A-10", "C-01"]


def R(**kw):
    kw.setdefault("cites", [])
    kw.setdefault("in_todo_list", False)
    kw.setdefault("todo_ref", None)
    kw.setdefault("portal_enforced", False)
    kw.setdefault("official_responsibility", None)
    kw.setdefault("grades", {})
    kw.setdefault("notes", None)
    return kw


# --------------------------------------------------------------------------
# The four questions, answered per role.
# Each is a (answer, grade) pair. Grades mirror the repo scale.
# --------------------------------------------------------------------------
ROLES = [
    # ---------------- CLASS A - mandated IIC seats ----------------
    R(id="A-01", name="IIC President", role_class="A", in_todo_list=True, todo_ref="IIC President / Coordinator",
      portal_enforced=True,
      official_responsibility=(
          "Holds the IIC portal Login ID and is \"custodian of IIC portal login and data/ reports "
          "uploaded therein\". Constitutes the council, chairs quarterly council meetings, is the "
          "main point of contact with the MHRD Innovation Cell, and is \"responsible for submitting "
          "the monthly progress/activity reports on the IIC portal\"."),
      grades=dict(uses="DOCUMENTED", decides="SINGLE-SOURCE", pays="HYPOTHESIS", approves="HYPOTHESIS"),
      uses=("Yes, ultimately. Owns the portal login and is custodian of uploaded data, so is the "
            "account of record even where day-to-day entry is delegated to the Convener."),
      decides=("Likely the internal decision-maker for adopting a tool, because they can change "
               "council membership and monitor deliverables. But no source establishes that the "
               "President decides anything about procurement."),
      pays="UNKNOWN. No source states the President holds or controls a budget line.",
      approves=("UNKNOWN for the purchase itself. At IIT Palakkad the administrative approval of a "
                "purchase is Registrar/Dean(ICSR), not the IIC President."),
      cites=["P2-S01", "P2-S02", "P2-S11", "P2-S12"],
      notes=("The strongest asset in Class A: a named officeholder who is formally the custodian of "
             "the data a replacement product would own. But custodian-of-data is not budget "
             "authority.")),
    R(id="A-02", name="IIC Vice President", role_class="A", portal_enforced=True,
      official_responsibility=(
          "\"An Honorary post for a senior expert representative from Industry/Ecosystem enablers.\" "
          "At IIT Hyderabad the office is held by the Dean (R&D)."),
      grades=dict(uses="SINGLE-SOURCE", decides="SINGLE-SOURCE", pays="HYPOTHESIS", approves="HYPOTHESIS"),
      uses="No operational role described in any source read.",
      decides="Not described as a decision-maker in any source read.",
      pays="UNKNOWN.",
      approves="No.",
      cites=["P2-S01", "P2-S11"],
      notes=("Listed by the portal as an assignable role but described as HONORARY. Likely a "
             "credibility seat for external industry members. Worth interviewing as a champion, "
             "not as a buyer.")),
    R(id="A-03", name="IIC Convener", role_class="A", in_todo_list=True, todo_ref="IIC President / Coordinator",
      portal_enforced=True,
      official_responsibility=(
          "\"This is more responsible role, the person who is assigned to this role should carry "
          "out the day to day activity under IIC.\" Describes self as \"Immediate point of contact "
          "and coordination\" and \"Preferably Incubation in charge of institute or Faculty with "
          "Entrepreneurship Experience or interest.\" Collects inputs from all council members at "
          "regular intervals. The portal instructs that no extra roles be assigned to Convener."),
      grades=dict(uses="DOCUMENTED", decides="DOCUMENTED", pays="HYPOTHESIS", approves="SINGLE-SOURCE"),
      uses=("Yes - the primary operator. Day-to-day activity, data collection from members, "
            "coordination across departments, and compilation of the annual report in practice."),
      decides=("Yes, within the council. Cannot change council membership (President can) but "
               "controls what is presented, and effectively sets the quarterly agenda."),
      pays=("UNKNOWN, and this is the single most important unknown in Phase 2. Every source read "
            "describes authority to SPEND money; none describes a budget line to spend FROM. The "
            "Convener is frequently a part-time academic - Phase 1 found SSCET fielding 40 IIC "
            "members, 30 innovation ambassadors and 2 mentors (P1 corpus IIC-024)."),
      approves=("Not the purchase approver. But at IIT Palakkad, purchases above Rs 25 lakh go to an "
                "Exclusive Purchase Committee whose composition explicitly includes the "
                "\"Indenter (Convenor)\" - so at high spend the Convener gets a formal vote."),
      cites=["P2-S01", "P2-S02", "P2-S12"],
      notes=("The most probable champion and the most probable first user. The user-decides-pays "
             "split for this role is the central open question of Phase 2. Portal guidance "
             "forbids stacking extra roles onto Convener, which concentrates the operational load.")),
    R(id="A-04", name="YUKTI Coordinator", role_class="A", portal_enforced=True,
      official_responsibility=(
          "\"This person will be responsible for the collection of ideas/prototype/startup "
          "information from their institute students/alumni/faculty/incubates and to verify the "
          "submission.\" May hold an additional role."),
      grades=dict(uses="DOCUMENTED", decides="HYPOTHESIS", pays="HYPOTHESIS", approves="HYPOTHESIS"),
      uses=("Yes, narrowly. Collects and verifies YUKTI submissions. This is the one office whose "
            "described job is already a data-collection task."),
      decides="Verifies submissions - a gatekeeping act, but over YUKTI entries only.",
      pays="UNKNOWN.",
      approves="No.",
      cites=["P2-S01"],
      notes=("The cleanest possible overlap between an existing mandated office and a product "
             "surface. YUKTI-NIR is already in the Phase 0 differentiation thesis; this role is "
             "who would actually use it.")),
    R(id="A-05", name="Social Media Coordinator", role_class="A", portal_enforced=True,
      official_responsibility="Manages the IIC page/account and publishes council resolutions, action plans and activity posts.",
      grades=dict(uses="SINGLE-SOURCE", decides="HYPOTHESIS", pays="HYPOTHESIS", approves="HYPOTHESIS"),
      uses="Publication only. No overlap with innovation records.",
      decides="No.", pays="UNKNOWN.", approves="No.",
      cites=["P2-S01", "P2-S11"],
      notes=("A portal-enforced office with no StartupHub-relevant workload. Worth recording "
             "because it proves the portal mandates seats by category rather than by workload - "
             "which is exactly why Class A seats are not a proxy for user demand.")),
    R(id="A-06", name="Innovation Activity Coordinator", role_class="A", in_todo_list=True,
      todo_ref="Faculty Coordinator",
      portal_enforced=True,
      official_responsibility="Responsible for all innovation-related activities; brings ideas to the council and implements activities.",
      grades=dict(uses="DOCUMENTED", decides="SINGLE-SOURCE", pays="HYPOTHESIS", approves="HYPOTHESIS"),
      uses=("Yes. And in the Phase 1 corpus this is the office that literally compiles the annual "
            "report - named explicitly at Scottish Church College."),
      decides="Implements council decisions.", pays="UNKNOWN.", approves="No.",
      cites=["P2-S01", "P2-S12"],
      notes=("Directly evidenced as the report compiler at one institution. This is the office "
             "that does the hand-assembly work described in Phase 1 problem P-A08.")),
    R(id="A-07", name="Internship Activity Coordinator", role_class="A", portal_enforced=True,
      official_responsibility="Arranges student internships in startups and promotes internship-related activities.",
      grades=dict(uses="SINGLE-SOURCE", decides="HYPOTHESIS", pays="HYPOTHESIS", approves="HYPOTHESIS"),
      uses="Internship placement only.", decides="No.", pays="UNKNOWN.", approves="No.",
      cites=["P2-S01", "P2-S11"],
      notes=("Frequently student-held - at IIT Hyderabad the seat is a BTech 4th year student. "
             "Recorded here as churn evidence, not as a buyer.")),
    R(id="A-08", name="IPR Activity Coordinator", role_class="A", portal_enforced=True,
      official_responsibility="Promotes IPR awareness and conducts IPR-related activities on campus.",
      grades=dict(uses="DOCUMENTED", decides="SINGLE-SOURCE", pays="HYPOTHESIS", approves="HYPOTHESIS"),
      uses=("Yes, and this role owns the CRITICAL problem found in Phase 1 (P-A07): no institution "
            "in the 36-document corpus shows a patent deadline field anywhere."),
      decides="Brings IPR matters to the council.",
      pays="UNKNOWN. Note KAPILA (MoE KAPILA) funds patent filings and is a plausible source, but no source read establishes that.",
      approves="No.",
      cites=["P2-S01", "P2-S11"],
      notes=("The strongest CHAMPION candidate and the weakest decision-maker. Owns the "
             "highest-severity documented problem but sits below the Convener in authority and has "
             "no procurement role. Also frequently student-held (MTech 3rd year at IIT Hyderabad), "
             "which makes the seat itself unstable.")),
    R(id="A-09", name="Startup Activity Coordinator", role_class="A", in_todo_list=True,
      todo_ref="Startup Manager",
      portal_enforced=True,
      official_responsibility="Responsible for all startup-related activities and for boosting startup generation among students.",
      grades=dict(uses="DOCUMENTED", decides="SINGLE-SOURCE", pays="HYPOTHESIS", approves="HYPOTHESIS"),
      uses=("Yes. At IIT Hyderabad the seat is held by the Faculty-in-Charge of the Incubation "
            "Centre, making it the overlap with Class B's Incubation Manager."),
      decides="Implements council decisions on startup matters.", pays="UNKNOWN.", approves="No.",
      cites=["P2-S01", "P2-S11"],
      notes=("The natural seat for the venture-register product implied by Phase 1 problems P-A01 "
             "and P-A06.")),
    R(id="A-10", name="ARIIA Coordinator", role_class="A", in_todo_list=True,
      todo_ref="IIC President / Coordinator",
      portal_enforced=True,
      official_responsibility=(
          "\"Primary responsible for creating repository and advising on more innovation and startup "
          "activities in campus to increase the ranking in ARIIA.\" Marked optional in the "
          "institutional charters but present in the MIC portal role list."),
      grades=dict(uses="DOCUMENTED", decides="SINGLE-SOURCE", pays="HYPOTHESIS", approves="HYPOTHESIS"),
      uses=("Yes, and most acutely. ARIIA demands patent application numbers, year and "
            "commercialisation figures. Phase 0 established (D-004) that institutions therefore "
            "maintain a SEPARATE off-platform patent ledger purely to answer this screen."),
      decides="Advises the council on rank improvement.", pays="UNKNOWN.", approves="No.",
      cites=["P2-S01", "P2-S11"],
      notes=("Owns the repository. This is the role whose job description is literally \"creating "
             "a repository\" - i.e. the role that already does by hand what a system of record "
             "would do. Deep-dived in Decision_Map.")),
    R(id="A-11", name="NIRF Coordinator", role_class="A", portal_enforced=True,
      official_responsibility=(
          "\"Primary responsible for creating repository and advising on more innovation and "
          "Research activities in campus to increase the ranking in NIRF.\" Also marked optional "
          "in institutional charters but present in the MIC portal role list."),
      grades=dict(uses="DOCUMENTED", decides="SINGLE-SOURCE", pays="HYPOTHESIS", approves="HYPOTHESIS"),
      uses=("Yes, and the evidence here is strong and independent of Phase 1: NIRF's Data Capture "
            "System forms are published in full by institutions - NIT Rourkela, IIM Goa, JBIET and "
            "Rajah Serfoji Government College were all verified as posting their own submitted forms "
            "on the open web in Phase 0."),
      decides="Advises the council on rank improvement.", pays="UNKNOWN.", approves="No.",
      cites=["P2-S01", "P2-S11"],
      notes="Deep-dived jointly with A-10, because the two roles are routinely held by the same person and drive the same two screens."),
    R(id="A-12", name="IIC Member", role_class="A", portal_enforced=True,
      official_responsibility="No additional responsibilities. Portal states at least one is required and \"there is no less / more important role under this category, all the persons share equal\".",
      grades=dict(uses="SINGLE-SOURCE", decides="HYPOTHESIS", pays="HYPOTHESIS", approves="HYPOTHESIS"),
      uses="Presence at events and discussions is the stated requirement.",
      decides="No seat described.", pays="UNKNOWN.", approves="No.",
      cites=["P2-S01", "P2-S11"],
      notes=("Required to exist but undefined in scope. Relevant as the pool StartupHub would "
             "licence for read access, and as evidence that IIC membership is much larger than "
             "the number of people who do the work - Phase 1 found 40 members, 30 ambassadors and "
             "2 mentors at SSCET.")),

    # ---------------- CLASS B - adjacent institutional offices ----------------
    R(id="B-01", name="Vice Chancellor / Director", role_class="B", in_todo_list=True,
      todo_ref="Vice Chancellor / Director",
      official_responsibility="Head of institution. At IIT Hyderabad the IIC President is the Director; at SurTech the IIC President is the Principal.",
      grades=dict(uses="SINGLE-SOURCE", decides="DOCUMENTED", pays="DOCUMENTED", approves="DOCUMENTED"),
      uses=("Not a direct user. But holds or heads the IIC presidency at several institutions, so "
            "is structurally the IIC's institutional owner."),
      decides=("Yes, at the top. CRSU vests administrative and financial approval above "
               "Rs 2,00,000 in the Vice-Chancellor; NIT Warangal gives the Director 'All Cases'."),
      pays=("YES - and this is one of only two roles in Phase 2 where budget authority is DOCUMENTED. "
            "NIT Warangal: Director = all cases. CRSU: VC = without limit. NITK: Director is the "
            "final approver in the administrative approval chain."),
      approves="Yes, at the ceiling of the authority chain.",
      cites=["P2-S03", "P2-S04", "P2-S05", "P2-S11", "P2-S12"],
      notes=("Budget authority DOCUMENTED here because three independent procurement manuals grant "
             "it explicitly. That is what makes this grade different from every Class A seat.")),
    R(id="B-02", name="Dean / Innovation Head", role_class="B", in_todo_list=True,
      todo_ref="Dean / Innovation Head",
      official_responsibility=("Dean (R&D) / Dean (ICSR) / Coordinator (R&D) across institutions. "
                               "At IIT Hyderabad the IIC Vice President is the Dean (R&D)."),
      grades=dict(uses="SINGLE-SOURCE", decides="DOCUMENTED", pays="DOCUMENTED", approves="DOCUMENTED"),
      uses="Not a daily user of innovation records.",
      decides=("Yes. At ICAR-WII the SPC-II - which handles all purchases above Rs 2.00 lacs - is "
               "chaired by the DEAN."),
      pays=("YES - DOCUMENTED. NIT Warangal: Deputy Director / Registrar / Dean (R&D) Rs 10,00,000 "
            "non-consumable, Rs 5,00,000 consumable. ICAR-WII: Dean chairs the committee covering "
            "all purchases above Rs 2.00 lacs."),
      approves=("Yes. NITK's administrative approval chain passes through Dean (P&D) for cost above "
                "Rs 3 Lakhs. IIT Palakkad requires 'Administrative Approval of the Registrar / Dean "
                "(ICSR)' as part of the audit pack."),
      cites=["P2-S02", "P2-S03", "P2-S04", "P2-S08", "P2-S11"],
      notes=("The most likely approver inside StartupHub's price band, because the Rs 2.5-10 lakh "
             "tier sits with a Dean/Registrar at every institution measured.")),
    R(id="B-03", name="Incubation Manager / TBI Manager", role_class="B", in_todo_list=True,
      todo_ref="Incubation Manager",
      official_responsibility="\"Preferably Incubation in charge of institute\" is the portal's own guidance for who should be Convener. At IIT Hyderabad the Startup Activity Coordinator is the Faculty-in-Charge of the Incubation Centre.",
      grades=dict(uses="SINGLE-SOURCE", decides="SINGLE-SOURCE", pays="HYPOTHESIS", approves="HYPOTHESIS"),
      uses=("Yes for venture-level data - but Phase 1 P-A03 found NO cohort concept anywhere in the "
            "36-document corpus, so what they record is not established."),
      decides="No procurement role found in any source read.",
      pays="UNKNOWN. A DST/AIC TBI grant would be the plausible route, but no source read confirms it.",
      approves="No.",
      cites=["P2-S01", "P2-S11"],
      notes=("Frequently the SAME PERSON as the IIC Convener, per the MIC portal's own guidance. "
             "Do not model as two distinct seats without Phase 3 confirmation.")),
    R(id="B-04", name="Entrepreneurship Cell / E-Cell", role_class="B", in_todo_list=True,
      todo_ref="Entrepreneurship Cell",
      official_responsibility="A student body. At IIT Hyderabad the student-held Startup Activity Coordinator is 'Head, E Cell'.",
      grades=dict(uses="SINGLE-SOURCE", decides="HYPOTHESIS", pays="HYPOTHESIS", approves="HYPOTHESIS"),
      uses="Student-facing engagement; runs competitions and exhibitions.",
      decides="No.", pays="No budget of its own in any source read.", approves="No.",
      cites=["P2-S11"],
      notes=("High churn by construction - student body. Valuable as a distribution channel, not as "
             "a buyer, and not as a seat to licence.")),
    R(id="B-05", name="Faculty Coordinator / Head of Department", role_class="B", in_todo_list=True,
      todo_ref="Faculty Coordinator",
      official_responsibility="Raises the indent (requisition) for a departmental purchase. Under NITK rules the 'Faculty-in-charge of Purchase (buyer)' initiates the process.",
      grades=dict(uses="SINGLE-SOURCE", decides="SINGLE-SOURCE", pays="SINGLE-SOURCE", approves="DOCUMENTED"),
      uses=("Yes - this is where innovation data ORIGINATES. Phase 1 P-A10 found Teresa's College's "
            "grant field organised entirely by department, which is this person filling in a form."),
      decides="Recommends specifications and quantities.",
      pays=("Single-SOURCE. NITK: HoD signs for cost above Rs 1 Lakh. NIT Warangal: HoD has "
            "Rs 2,50,000 non-consumable and Rs 1,00,000 consumable authority - so at the bottom of "
            "StartupHub's band a HoD may be able to approve alone."),
      approves=("Yes at low value. NIT Warangal grants the HoD Rs 2,50,000 non-consumable "
                "authority; software is classed non-consumable in most of these manuals."),
      cites=["P2-S03", "P2-S04", "P2-S12"],
      notes=("The only role in the entire map that may be able to approve StartupHub at the entry "
             "price point WITHOUT a committee - and only if that price stays under about Rs 1 "
             "lakh. This is the single strongest argument for a low entry tier.")),
    R(id="B-06", name="Startup Manager", role_class="B", in_todo_list=True, todo_ref="Startup Manager",
      official_responsibility="Not a distinct office in any IIC charter read; functionally the Startup Activity Coordinator (A-09).",
      grades=dict(uses="DOCUMENTED", decides="SINGLE-SOURCE", pays="HYPOTHESIS", approves="HYPOTHESIS"),
      uses=("Yes. Phase 1 P-A01/P-A06 found institutions cannot produce a defensible venture list "
            "and report startups as a stock, not a movement."),
      decides="No procurement role found.", pays="UNKNOWN.", approves="No.",
      cites=["P2-S01", "P2-S11"],
      notes=("todo.md lists this as a separate role from the IIC President/Coordinator, but no "
             "source read separates it. Flagged as a probable duplicate of A-09 pending Phase 3.")),

    # ---------------- CLASS C - off-portal gatekeepers ----------------
    R(id="C-01", name="Registrar / Dean (ICSR)", role_class="C",
      official_responsibility=("Grants administrative approval for purchases and holds delegated "
                               "financial limits. At IIT Palakkad the 'Administrative Approval of "
                               "the Registrar / Dean (ICSR) for the Purchase' is a required document "
                               "in the audit pack above Rs 10 lakh."),
      grades=dict(uses="SINGLE-SOURCE", decides="DOCUMENTED", pays="DOCUMENTED", approves="DOCUMENTED"),
      uses=("No. Appears in this map only as an approver. Phase 0 already recorded the sharpest "
            "version of this: a competitor's analysis concludes \"Their buyer is the "
            "Principal/Registrar. The IIC nodal officer - StartupHub's actual buyer - has no seat "
            "in that buying decision.\""),
      decides=("Yes. CRSU vests administrative and financial approval above Rs 2,00,000 in the VC "
               "AFTER the Registrar's own ceiling of Rs 2,00,000 - making the Registrar the "
               "decision point for the middle band."),
      pays=("YES - DOCUMENTED. NIT Warangal: Registrar Rs 10,00,000 non-consumable, Rs 5,00,000 "
            "consumable. CRSU: Registrar up to Rs 2,00,000. UoH: Registrar Rs 1,50,000 without "
            "pre-check, Rs 5,00,000 with Purchase Committee recommendation."),
      approves=("Yes. This is the role that signs. In every institution measured, the IIC Convener "
                "recommends and the Registrar or Dean administratively approves."),
      cites=["P2-S02", "P2-S03", "P2-S05", "P2-S10"],
      notes=("Added per D-019. Deep-dived because it is the most probable approver of a "
             "StartupHub-scale purchase. The uncomfortable finding: the person who will sign has no "
             "reason to care about innovation records and every reason to care about procurement "
             "risk and precedent.")),
    R(id="C-02", name="Purchase Committee", role_class="C", in_todo_list=True, todo_ref="Finance / Procurement",
      official_responsibility=("Constituted differently almost everywhere, but always includes the "
                               "indenter, a finance member and faculty. IIT Palakkad EPC: "
                               "Chairperson, Indenter (Convener), 2-3 faculty, Purchase Nominee, "
                               "Finance Nominee. MITE: Chairperson is the Trust Chairman, Convener "
                               "is the Principal, members are Vice Principal and HoDs."),
      grades=dict(uses="SINGLE-SOURCE", decides="DOCUMENTED", pays="SINGLE-SOURCE", approves="DOCUMENTED"),
      uses="No.",
      decides=("Yes. Scrutinises requirement, budget position, comparative statements and vendor "
               "selection, then recommends."),
      pays=("Single-SOURCE. Committees do not hold budget; they recommend against a budget. At "
            "Sathyabama the Central Purchase Committee is headed by the VC."),
      approves=("Yes, recommendentially. Its recommendation must then be ratified by a competent "
                "financial authority - which is why it is not the final approver."),
      cites=["P2-S02", "P2-S06", "P2-S07", "P2-S08", "P2-S09"],
      notes=("The gate. Triggered at a remarkably consistent threshold across both segments: about "
             "Rs 1 lakh. Below it, a HoD may act; above it, a committee is engaged.")),
    R(id="C-03", name="Finance Nominee / Finance Officer", role_class="C", in_todo_list=True,
      todo_ref="Finance / Procurement",
      official_responsibility=("Sits on every purchase committee. Sathyabama's Central Purchase "
                               "Committee is headed by the VC with the Registrar, Finance Officer, "
                               "2-3 management members, a Dean and a HoD. WII's SPC-I and SPC-II "
                               "both require the Finance Officer and Internal Audit Officer to be "
                               "present, and quorum is broken without them."),
      grades=dict(uses="SINGLE-SOURCE", decides="DOCUMENTED", pays="DOCUMENTED", approves="SINGLE-SOURCE"),
      uses="No.",
      decides=("Yes, and unusually powerful. At ICAR-WII, SPC-I and SPC-II quorum REQUIRES the "
               "presence of the Chairman, the Finance Officer or the Internal Audit Officer. A "
               "finance officer can therefore block a purchase alone."),
      pays=("YES - DOCUMENTED. CRSU grants the Finance Officer administrative and financial "
            "approval up to Rs 15,000; UoH up to Rs 25,000. Small, real, and documented."),
      approves="Recommends and can block; does not hold the final signature at larger values.",
      cites=["P2-S05", "P2-S06", "P2-S08"],
      notes=("The most underrated role in the map. Often the only person who asks the question that "
             "actually matters: what happens to this spend next year?")),
    R(id="C-04", name="Audit / Internal Audit Officer", role_class="C",
      official_responsibility=("Required in the purchase chain above defined thresholds. IIT "
                               "Palakkad: purchases above Rs 10 lakh are presented to the Audit for "
                               "perusal and approval, and the PO/WO is issued only on receipt of "
                               "audit approval. WII: checklist to the competent authority above Rs "
                               "10.00 lakhs; IAO is a mandatory SPC member."),
      grades=dict(uses="SINGLE-SOURCE", decides="SINGLE-SOURCE", pays="SINGLE-SOURCE", approves="DOCUMENTED"),
      uses="No.",
      decides="Reviews documentation completeness and ratification of expenditure.",
      pays="No. Audit does not disburse.",
      approves=("YES for purchases above about Rs 10 lakh - and at IIT Palakkad the purchase order "
                "is not issued until audit approval is received."),
      cites=["P2-S02", "P2-S08"],
      notes=("Below StartupHub's entire realistic band at most institutions, but decisive at the top "
             "of the Incubatee price point (~Rs 3.95 lakh is under it; a university-wide deal is "
             "not). Relevant if StartupHub ever sells campus-wide.")),
    R(id="C-05", name="IT Administrator", role_class="C", in_todo_list=True, todo_ref="IT Administrator",
      official_responsibility="Not a named role in any procurement manual read. Present implicitly via data-residency and security requirements.",
      grades=dict(uses="SINGLE-SOURCE", decides="SINGLE-SOURCE", pays="HYPOTHESIS", approves="SINGLE-SOURCE"),
      uses="Would administer hosting, SSO and access.",
      decides=("Likely, on technical fit. Phase 0 established data localisation and on-premise "
               "requirements as a near-universal procurement condition, and found EcoSync already "
               "disqualified on exactly this axis by answering 'no' to SOC 2 and ISO 27001."),
      pays="UNKNOWN.", approves="Advisory in the sources read; no source names them as an approver.",
      cites=["P2-S02", "P2-S04"],
      notes=("Role listed in todo.md but evidenced only indirectly. The honest position: this role "
             "is a plausible technical gate, not a documented one. Phase 24 must test it.")),

    # ---------------- CLASS D - individual users ----------------
    R(id="D-01", name="Student Innovators", role_class="D", in_todo_list=True, todo_ref="Student Innovators",
      official_responsibility=("Student representation on the IIC is mandatory - up to 10 student "
                               "coordinators per category are permitted alongside faculty."),
      grades=dict(uses="DOCUMENTED", decides="HYPOTHESIS", pays="HYPOTHESIS", approves="HYPOTHESIS"),
      uses=("Yes, at the intake end - they are the source of ideas, prototypes and applications. "
            "Phase 1 found NIT Calicut running Demo Days with 57 UG/PG student projects and 155 "
            "ideas generated in one year."),
      decides="No institutional decision authority.", pays="No institutional budget.", approves="No.",
      cites=["P2-S01", "P2-S11"],
      notes=("Also frequently HOLD Class A seats (Internship Coordinator, IPR Coordinator at IIT "
             "Hyderabad were undergraduates). So a single human can be both the mandated officeholder "
             "and an end user.")),
    R(id="D-02", name="Founders / Startups", role_class="D", in_todo_list=True, todo_ref="Founders",
      official_responsibility="Not an institutional office. Incubatees of the institution.",
      grades=dict(uses="HYPOTHESIS", decides="HYPOTHESIS", pays="HYPOTHESIS", approves="HYPOTHESIS"),
      uses=("Presumed, not evidenced. Phase 1 P-A01 found 38 of NIT Calicut's 55 reported startups "
            "fell into an unattributed 'others' category - so StartupHub cannot currently "
            "establish who its own ventures are."),
      decides="No.", pays="No.", approves="No.",
      cites=[],
      notes=("Deliberately left mostly unevidenced. No source read describes founders as system "
             "users, and Phase 1 shows institutions cannot even identify them. Phase 3 must test "
             "whether founders are users of the institution's system at all.")),
]


def by_id():
    return {r["id"]: r for r in ROLES}


def by_class():
    out = {}
    for r in ROLES:
        out.setdefault(r["role_class"], []).append(r)
    return out


def role_by_name(name):
    for r in ROLES:
        if r["name"].lower() == name.lower():
            return r
    raise KeyError(name)


def validation():
    """Fail the build on a missing field, a bad grade, or an over-claim.

    The over-claim rule is the point: `pays` may be DOCUMENTED only when the role
    cites at least one source that actually confers budget authority.
    """
    required = ["id", "name", "role_class", "grades", "uses", "decides", "pays", "approves", "cites"]
    valid_grades = {"DOCUMENTED", "SINGLE-SOURCE", "HYPOTHESIS"}
    problems = []
    seen = set()
    for r in ROLES:
        for f in required:
            if f not in r or r[f] in (None, ""):
                problems.append(f"{r.get('id', '???')}: missing '{f}'")
        if r["id"] in seen:
            problems.append(f"duplicate id {r['id']}")
        seen.add(r["id"])
        if r["role_class"] not in ROLE_CLASSES:
            problems.append(f"{r['id']}: bad role_class '{r['role_class']}'")
        for q, g in r["grades"].items():
            if q not in ("uses", "decides", "pays", "approves"):
                problems.append(f"{r['id']}: unexpected grade key '{q}'")
            if g not in valid_grades:
                problems.append(f"{r['id']}: bad grade '{g}' for {q}")
        if set(r["grades"]) != {"uses", "decides", "pays", "approves"}:
            problems.append(f"{r['id']}: must grade all four questions")
        for c in r["cites"]:
            if c not in SOURCES:
                problems.append(f"{r['id']}: unknown source id {c}")
        # THE HONESTY GUARD
        if r["grades"].get("pays") == "DOCUMENTED" and not r["cites"]:
            problems.append(
                f"{r['id']}: `pays` graded DOCUMENTED with no cited source. Budget authority must "
                "be proven by a procurement rule, not asserted.")
    # Every role a DOCUMENTED pays claim needs a source in BUDGET_AUTHORITY_SOURCES.
    for r in ROLES:
        if r["grades"].get("pays") == "DOCUMENTED":
            if not (set(r["cites"]) & set(BUDGET_AUTHORITY_SOURCES)):
                problems.append(
                    f"{r['id']}: `pays` graded DOCUMENTED but cites no budget-authority source "
                    f"(one of {sorted(BUDGET_AUTHORITY_SOURCES)})")
    # todo.md coverage
    todo_roles = [r for r in ROLES if r["in_todo_list"]]
    if len(todo_roles) < 10:
        problems.append(f"only {len(todo_roles)} roles map to todo.md's 12; expected coverage")
    # deep dives must exist
    for d in DEEP_DIVE_ROLES:
        if d not in seen:
            problems.append(f"deep-dive role {d} does not exist")
    return problems


# Sources that explicitly confer budget authority. A role cannot be graded
# DOCUMENTED on `pays` unless it cites one of these.
BUDGET_AUTHORITY_SOURCES = {"P2-S02", "P2-S03", "P2-S04", "P2-S05", "P2-S06", "P2-S07",
                            "P2-S08", "P2-S09", "P2-S10"}


def grade_census():
    out = {}
    for r in ROLES:
        for q, g in r["grades"].items():
            out[(q, g)] = out.get((q, g), 0) + 1
    return out


def todo_coverage():
    """todo.md's 12 roles mapped onto this taxonomy, so nothing is silently dropped."""
    mapping = {
        "Vice Chancellor / Director": "B-01",
        "Dean / Innovation Head": "B-02",
        "IIC President / Coordinator": "A-01 / A-03",
        "Incubation Manager": "B-03",
        "Entrepreneurship Cell": "B-04",
        "Faculty Coordinator": "B-05 / A-06",
        "Startup Manager": "B-06 / A-09",
        "IT Administrator": "C-05",
        "Finance / Procurement": "C-02 / C-03",
        "Student Innovators": "D-01",
        "Founders": "D-02",
    }
    return [(k, v) for k, v in mapping.items()]