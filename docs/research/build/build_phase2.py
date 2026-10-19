#!/usr/bin/env python3
"""StartupHub Phase 2 exporter - customer roles, buying centres, approval chain.

Writes, per the repository layering rule (summaries in topic folders, data in
_exports):

  08_User_Roles/README.md                      hub
  08_User_Roles/Mandated_IIC_Seats.md          the 12 portal-enforced offices
  08_User_Roles/Role_Matrix.md                 all 25 roles x four questions
  08_User_Roles/Decision_Map.md                the four questions, by segment
  08_User_Roles/Procurement_Authority.md       the price->approver ladders
  08_User_Roles/Deep_Dives/<role>.md            4 full profiles
  _exports/phase2/role_matrix.csv
  _exports/phase2/procurement_thresholds.csv
  _exports/phase2/role_profiles.json + schema
  _exports/raw/phase2_roles_RAW.json

Usage:  python build/build_phase2.py
"""

import csv
import json
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
ROOT = HERE.parent

import data_p2_roles as R        # noqa: E402
import data_p2_procurement as P  # noqa: E402

OUT = ROOT / "_exports" / "phase2"
RAW = ROOT / "_exports" / "raw"
ROLES_DIR = ROOT / "08_User_Roles"

REGISTRY_COLUMNS = ["id", "research_area", "claim_supported", "source_org", "source_type",
                    "tier", "reliability", "url", "publication_date", "access_date",
                    "geography", "customer_segment", "notes"]

P2_RESEARCH_AREA = "Phase 2 - customer roles and buying centres"

# What each source is being used to prove.
P2_CLAIMS = {
    "P2-S01": "The IIC portal hard-enforces a minimum role set; no activity can be entered without it",
    "P2-S02": "Software purchases above Rs 2.5L trigger a software-specific committee; the IIC Convener gains a seat on the EPC above Rs 25L",
    "P2-S03": "Registrar / Dean hold Rs 10L non-consumable authority; GeM availability bypasses the local purchase committee",
    "P2-S04": "Administrative approval for a departmental software purchase passes through HoD at Rs 1L and Dean (P&D) at Rs 3L",
    "P2-S05": "Registrar approves up to Rs 2L; above that vests in the Vice-Chancellor",
    "P2-S06": "Above Rs 2L a private deemed university purchase must already sit in an approved budget line",
    "P2-S07": "A private autonomous college engages its Purchase Committee above Rs 1L, chaired by the governing Trust",
    "P2-S08": "A Finance Officer or Internal Audit Officer can block a purchase alone via quorum rules",
    "P2-S09": "A Local Purchase Committee is required above Rs 25,000 in at least one central university",
    "P2-S10": "Splitting a demand to stay under an approval threshold is prohibited by GFR 2017 Rule 157",
    "P2-S11": "IIC offices are held by named incumbents, and several coordinator seats are student-held",
    "P2-S12": "The IIC report is compiled by a distinct office - the Innovation Activity Coordinator",
}


def slug(s):
    return s.lower().replace(" ", "_").replace("/", "-").replace("&", "and").replace("(", "").replace(")", "")


def write_csv(path, cols, rows):
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", newline="", encoding="utf-8-sig") as fh:
        w = csv.DictWriter(fh, fieldnames=cols, extrasaction="ignore")
        w.writeheader()
        for r in rows:
            w.writerow(r)
    return len(rows)


def registry_rows():
    out = []
    n = 0
    for sid, s in R.SOURCES.items():
        n += 1
        out.append({
            "id": f"P2-{n:03d}", "research_area": P2_RESEARCH_AREA,
            "claim_supported": P2_CLAIMS.get(sid, "Phase 2 role/authority evidence"),
            "source_org": s["org"], "source_type": s["source_type"], "tier": s["tier"],
            "reliability": "HIGH", "url": s["url"],
            "publication_date": "2025" if "2025" in s["title"] else None,
            "access_date": "2026-10-18", "geography": "India",
            "customer_segment": "Indian higher education institutions",
            "notes": f"source_key={sid}; {s['why'][:180]}",
        })
    return out


def merge_registry(rows):
    reg = ROOT / "00_Research_Index" / "Source_Registry.csv"
    with reg.open("r", encoding="utf-8-sig", newline="") as fh:
        existing = list(csv.DictReader(fh))
    have = {r["id"] for r in existing}
    todo = [r for r in rows if r["id"] not in have]
    if not todo:
        return len(existing), 0
    fields = list(existing[0].keys())
    if set(fields) ^ set(REGISTRY_COLUMNS):
        raise SystemExit("Source_Registry.csv columns changed; update REGISTRY_COLUMNS.")
    with reg.open("w", encoding="utf-8", newline="") as fh:
        w = csv.DictWriter(fh, fieldnames=fields)
        w.writeheader()
        for r in existing + todo:
            w.writerow(r)
    return len(existing), len(todo)


# --------------------------------------------------------------------------
# Summaries
# --------------------------------------------------------------------------

def write_hub(written):
    i = P.insights()
    census = R.grade_census()
    cls = R.by_class()
    L = ["# Phase 2 — Customer Roles, Buying Centres and the Approval Chain", "",
         "todo.md Phase 2 asks: *who uses it, who decides, who pays, who approves? — "
         "\"these might be four different people.\"*", "",
         "**They are.** And the answer is not uniform across institutions, which is the most "
         "commercially important thing this phase found.", "",
         "---", "",
         "## The short answer", "",
         "| Question | Who | Evidence |", "|---|---|---|",
         "| **Uses** | The IIC Convener and the activity coordinators — the portal-enforced offices | "
         "`DOCUMENTED` in 10 of 25 roles |",
         "| **Decides** | Split. Inside the council: Convener. Inside the institution: Registrar / Dean / "
         "Purchase Committee | `SINGLE-SOURCE` — rules describe authority, not behaviour |",
         "| **Pays** | **Unknown for every IIC seat.** Budget authority is documented only for VC/Director, "
         "Dean, Registrar and Finance Officer | `DOCUMENTED` in **4 of 25** roles |",
         "| **Approves** | Registrar / Dean (ICSR), then VC/Director above their ceiling | "
         "`DOCUMENTED` in 6 of 25 roles |", "",
         "## The four findings that matter", "",
         f"### 1. Not one of the 12 mandated IIC seats holds documented budget authority", "",
         "Every Class A office is portal-enforced and has a published job description. **None of them "
         "is documented anywhere as holding a budget line.** Four roles outside the IIC structure are: "
         "VC/Director, Dean/Innovation Head, Registrar/Dean (ICSR), and the Finance Officer. The "
         "offices that own the data are not the offices that own the money.", "",
         "This is enforced mechanically, not asserted. `build/data_p2_roles.py::validation()` fails the "
         "build if any role is graded `DOCUMENTED` on `pays` without citing a procurement instrument "
         "that actually confers budget authority.", "",
         "### 2. The IIC portal is not an org chart — it is a compliance gate", "",
         "The MIC portal states that deleting the Convener, YUKTI, Social Media, Innovation Activity, "
         "Internship, IPR, Startup, ARIIA, NIRF or Member roles turns the sub-tab to a **red cross**, "
         "and that *\"If it is in 'red cross' then you cannot add any activity under 'Manage Activity' "
         "section.\"*", "",
         "These are mandated seats, not discovered personas. One of them — the Social Media Coordinator "
         "— has no innovation workload at all, which is exactly why seat count is not a proxy for "
         "demand.", "",
         "### 3. Price selects the approver, and the spread is 20x", "",
         f"Across {i['institutions']} institutions with published procurement instruments, the value at "
         f"which a **purchase committee is engaged** ranges from **{P.display_inr(i['committee_trigger_min'])} "
         f"to {P.display_inr(i['committee_trigger_max'])}** — a {i['committee_trigger_spread']}x spread.", "",
         "There is no uniform Indian threshold. Any pricing decision therefore changes the *number and "
         "type of approvers*, not just the deal size. Full ladders in "
         "[`Procurement_Authority.md`](Procurement_Authority.md).", "",
         "### 4. At above ₹2 lakh in the private segment, the budget must already exist", "",
         "Sathyabama's purchase policy: *\"All the Major Purchases (above 2 Lakhs) shall be included in "
         "the budgetary proposals of the department, duly approved by the Finance Committee, Board of "
         "Management before heading to the purchase procedure.\"*", "",
         "A purchase above ₹2 lakh in this segment cannot create a budget line — it can only spend one "
         "that was approved earlier in the year. This is the strongest documentary support yet for "
         "**D-007** (sell against an existing IIC / NIDHI / AIC allocation rather than create a new "
         "budget line).", "", "---", "",
         "## Evidence grading on this page", "",
         "| Grade | Meaning |", "|---|---|"]
    for g, m in R.EVIDENCE_GRADES.items():
        L.append(f"| `{g}` | {m} |")
    L += ["", "Census across all 25 roles:", ""]
    L.append("| Question | DOCUMENTED | SINGLE-SOURCE | HYPOTHESIS |")
    L.append("|---|---|---|---|")
    for q in ("uses", "decides", "pays", "approves"):
        L.append(f"| {q} | {census.get((q,'DOCUMENTED'),0)} | "
                 f"{census.get((q,'SINGLE-SOURCE'),0)} | {census.get((q,'HYPOTHESIS'),0)} |")
    L += ["", "Note the shape: **confidence falls as the question gets closer to money.** That is the "
          "expected pattern for a compliance-driven system and it tells Phase 3 exactly where to "
          "spend its interview time.", "",
          "## The four role classes", "",
          "| Class | n | What it is |", "|---|---|---|"]
    for c, roles in sorted(cls.items()):
        L.append(f"| **{c}** | {len(roles)} | {R.ROLE_CLASSES[c]} |")
    L += ["", "## Documents", "",
          "| File | Contents |", "|---|---|",
          "| [`Mandated_IIC_Seats.md`](Mandated_IIC_Seats.md) | The 12 portal-enforced offices and the "
          "gate that enforces them |",
          "| [`Role_Matrix.md`](Role_Matrix.md) | All 25 roles × uses / decides / pays / approves |",
          "| [`Decision_Map.md`](Decision_Map.md) | The four questions answered by segment, with grades |",
          "| [`Procurement_Authority.md`](Procurement_Authority.md) | The price→approver ladders from 8 "
          "published instruments |",
          "| [`Deep_Dives/`](Deep_Dives/) | Full profiles for Convener, President, ARIIA/NIRF "
          "Coordinator, Registrar/Dean |", "",
          "## What this phase does **not** establish", "",
          "- **Who pays, in practice.** No source read establishes that an IIC seat holds a budget. "
          "Phase 0's D-007 remains an inference.", "",
          "- **Which role actually says yes.** Procurement rules describe who *may* approve. Real buying "
          "behaviour is unobserved and unobservable from documents.", "",
          "- **Whether the 8 procurement instruments are representative.** They were found on public "
          "institution sites, which likely favours well-governed institutions. The 20x spread may "
          "understate the true variation (OQ-25).", "",
          "- **Whether the Convener and the Incubation Manager are the same person.** The MIC portal's own "
          "guidance says Convener should preferably be the incubation in-charge, but no institution "
          "surveyed confirms it.", "",
          "- **Founder behaviour.** Phase 1 `P-A01` found 38 of NIT Calicut's 55 startups were an "
          "unattributed *\"others\"* category. We cannot currently establish who the institution's own "
          "founders are, let alone whether they use its systems.", "", "---", "",
          "Machine-readable: `_exports/phase2/`. Sources registered as `P2-001`–`P2-012` in "
          "[`Source_Registry.csv`](../00_Research_Index/Source_Registry.csv).", "",
          "Back to [Research Index](../00_Research_Index/README.md)", ""]
    (ROLES_DIR / "README.md").write_text("\n".join(L), encoding="utf-8")


def write_mandated_seats():
    cls = R.by_class()["A"]
    L = ["# The 12 Mandated IIC Seats", "",
         "These are not personas. They are **offices the IIC portal refuses to let an institution "
         "operate without.**", "",
         "## The gate, quoted", "",
         '> *"If you delete the existing "Convener" / "YUKTI coordinator" / "Social Media '
         'coordinator" / "Innovation Activity coordinator" / "Internship activity coordinator" / '
         '"IPR activity coordinator" / "Startup activity coordinator" / "ARIIA coordinator" / '
         '"NIRF coordinator" / "Member" role details the sub-tab will become as "red cross". '
         'Because all the above mentioned roles are required to make this sub-tab to stay in "green '
         'tick". If it is in "red cross" then you cannot add any activity under "Manage Activity" '
         'section."*',
         ">",
         "> — MIC IIC portal, *Add/Update Faculty Member Details* `P2-S01`", "",
         "Two consequences follow, and they matter commercially:", "",
         "1. **Every IIC has someone in every one of these seats.** The population is not hypothetical — "
         "it exists, with named holders, right now.",
         "2. **Seats are assigned by category, not by workload.** The Social Media Coordinator is a "
         "mandated office with no innovation-record workload. So the *number of IIC seats is not a "
         "proxy for seats that would use innovation software*.", "",
         'The portal also constrains stacking: *"Try not to assign any extra roles for President and '
         'Convener alone, for other faculty you can assign two roles at max."* That concentrates the '
         "operational load on the Convener, who is explicitly told not to hold anything else.", "",
         "---", "",
         "## The twelve", "",
         "| # | Office | Portal-enforced | Uses | Decides | Pays | Approves |",
         "|---|---|---|---|---|---|---|"]
    for r in cls:
        g = r["grades"]
        L.append(f"| {r['id'][-2:]} | **{r['name']}** | {'yes' if r['portal_enforced'] else 'no'} "
                 f"| `{g['uses']}` | `{g['decides']}` | `{g['pays']}` | `{g['approves']}` |")
    L += ["", "## Who actually fills them", "",
          "From the institutional constitutions read:", "",
          "- **IIT Hyderabad** — the President is the **Director**. The Vice President is the **Dean "
          "(R&D)**. The Startup Activity Coordinator is the **Faculty-in-Charge of the Incubation "
          "Centre**. The IPR coordinator is the **Faculty-in-Charge of the IP Cell**. The Social Media "
          "Coordinator is the **Public Relations Officer**. `P2-S11`",
          "- **Scottish Church College** — the 2024-25 report names President Dr. Samrat Bhattacharjee, "
          "Convener Mr. Saptarshi Chakraborty, and states it was *compiled by* **Dr. Tamanna Sultana, "
          "Innovation Activity Coordinator** — evidence that the compiling office is distinct from "
          "both President and Convener. `P2-S12` `P1-008`", "",
          "**The IIC president is frequently the head of the institution.** That is why Class A is not "
          "the buying centre: the office owns the *data*, but the person holding it is often above "
          "the IIC entirely and delegating.", "",
          "## The churn problem", "",
          "Some coordinator seats are held by students. At IIT Hyderabad the Internship Coordinator is "
          "a **BTech 4th year** and the IPR Coordinator an **MTech 3rd year** student; the "
          "student-held Startup Activity Coordinator is Head of the E-Cell. `P2-S11`", "",
          "So one human can simultaneously be a mandated officeholder and an end user — and will "
          'graduate. Phase 0 recorded the consequence: *"The person who would champion StartupHub '
          'graduates in 2–3 years; the person who signs is a faculty member who may transfer."*',
          "**Licensing implication:** per-seat licensing is structurally fragile here. The institution "
          "is the durable unit; the seat is not.", "",
          "## What this class is good for", "",
          "It is a **complete, enumerable, already-populated seat list with published job "
          "descriptions** — a far better starting point than a persona exercise, because every duty "
          "below was written by the Ministry of Education, not invented here.", "",
          "What it cannot do is tell us who buys. See [`Role_Matrix.md`](Role_Matrix.md) and "
          "[`Decision_Map.md`](Decision_Map.md).", "",
          "Back to [Phase 2 hub](README.md) · "
          "[Procurement Authority](Procurement_Authority.md)", ""]
    (ROLES_DIR / "Mandated_IIC_Seats.md").write_text("\n".join(L), encoding="utf-8")


def write_matrix():
    cls = R.by_class()
    L = ["# Role Matrix", "",
         "All 25 roles × todo.md's four questions, each answer carrying its own evidence grade.", "",
         "Grade key: `DOCUMENTED` multiple primary sources · `SINGLE-SOURCE` one · "
         "`HYPOTHESIS` not evidenced.", ""]
    for c, roles in sorted(cls.items()):
        L += ["", f"## Class {c} — {R.ROLE_CLASSES[c]}", "",
              "| ID | Role | Uses | Decides | Pays | Approves | todo.md |",
              "|---|---|---|---|---|---|---|"]
        for r in roles:
            g = r["grades"]
            L.append(f"| `{r['id']}` | **{r['name']}** | `{g['uses']}` | `{g['decides']}` "
                     f"| `{g['pays']}` | `{g['approves']}` | "
                     f"{('yes — ' + r['todo_ref']) if r['in_todo_list'] else '—'} |")
    L += ["", "---", "",
          "## todo.md's 12 roles, mapped", "",
          "Nothing in todo.md's list was dropped. Two were found to be probable duplicates of IIC "
          "offices and are flagged rather than silently merged.", "",
          "| todo.md role | Maps to | Note |", "|---|---|---|"]
    dupes = {"Startup Manager": "Probably the same human as the IIC Startup Activity Coordinator — no "
                                "source read separates them.",
             "IIC President / Coordinator": "Splits into two distinct offices: A-01 President and "
                                           "A-03 Convener, with different authority.",
             "Finance / Procurement": "Splits into three distinct roles: C-01 Registrar, C-02 Purchase "
                                      "Committee, C-03 Finance Officer."}
    for todo, mapping in R.todo_coverage():
        L.append(f"| {todo} | `{mapping}` | {dupes.get(todo, '')} |")
    L += ["", "---", "",
          "## Reading the matrix", "",
          "- **Uses is well evidenced; pays is not.** That gradient is the finding, not a gap in the "
          "data collection.",
          "- **`pays` is `HYPOTHESIS` for 18 of 25 roles.** Only VC/Director, Dean/Innovation Head, "
          "Registrar/Dean (ICSR) and Finance Officer have documented budget authority, and every one "
          "of those citations is a procurement instrument.",
          "- **Class A has a high `uses` score and a zero `pays` score.** The mandated offices run the "
          "system without funding it.", "",
          "Full answer text per role is in the machine-readable export and the deep dives.", "",
          "Back to [Phase 2 hub](README.md)", ""]
    (ROLES_DIR / "Role_Matrix.md").write_text("\n".join(L), encoding="utf-8")


def write_decision_map():
    i = P.insights()
    seg = {}
    for q in ("uses", "decides", "pays", "approves"):
        for cls, roles in R.by_class().items():
            seg[(q, cls)] = [r for r in roles if r["grades"][q] == "DOCUMENTED"]
    central = sorted({t["institution"] for t in P.CENTRAL})
    private = sorted({t["institution"] for t in P.PRIVATE})
    L = ["# Decision Map — who uses, decides, pays, approves", "",
         "todo.md's four questions, answered per segment. **Grades are per claim, not per phase.**", "",
         "---", "",
         "## Segment 1 — Central / government institutions", "",
         f"Instruments read: {', '.join(central)}.", "",
         "| Question | Answer | Grade |", "|---|---|---|"]
    L += ["| **Uses** | IIC Convener + the activity coordinators. Portal-enforced, with published duties. "
          "| `DOCUMENTED` |",
          "| **Decides** | Convener inside the council; **Registrar / Dean** inside the institution; "
          "**Purchase Committee** on the merits | `SINGLE-SOURCE` |",
          "| **Pays** | Budget authority sits with **Director** (all cases), **Deputy Director / "
          "Registrar / Dean (R&D)** (₹10 lakh non-consumable), and **HoD** (₹2.5 lakh) at NIT Warangal. "
          "**No IIC seat is documented to hold any of these.** | `DOCUMENTED` for the four offices; "
          "`HYPOTHESIS` for every Class A seat |",
          "| **Approves** | Registrar/Dean (ICSR) for administrative approval; VC/Director above their "
          "ceiling; **Audit above ~₹10 lakh, where the PO is not issued until audit approves** | "
          "`DOCUMENTED` |", "",
          "## Segment 2 — Private / deemed universities and colleges", "",
          f"Instruments read: {', '.join(private)}.", "",
          "| Question | Answer | Grade |", "|---|---|---|"]
    L += ["| **Uses** | Same offices — the IIC role set is imposed centrally regardless of sector | "
          "`DOCUMENTED` |",
          "| **Decides** | **Principal** convenes the Purchase Committee at MITE; **Trust Chairman** "
          "chairs it; **Board of Management + Finance Committee** above ₹2 lakh at Sathyabama | "
          "`SINGLE-SOURCE` |",
          "| **Pays** | Budget authority is more diffuse: VC + Registrar + Finance Officer sit on a "
          "single Central Purchase Committee at Sathyabama. **Still no IIC seat.** | `DOCUMENTED` for "
          "the committee; `HYPOTHESIS` for Class A |",
          "| **Approves** | Purchase Committee above ₹1 lakh at MITE; **above ₹2 lakh the purchase must "
          "already be in an approved budget line** at Sathyabama | `DOCUMENTED` |", "",
          "---", "",
          "## The four are four different people — here is where each one lives", "",
          "| | Who | Where the authority is documented |", "|---|---|---|",
          "| **Uses** | IIC Convener, activity coordinators | MIC portal role definitions `P2-S01`; "
          "Scottish Church College names the compiling office `P2-S12` |",
          "| **Decides (internal)** | Convener — sets agenda, collects member inputs, cannot change "
          "council membership | MIC portal `P2-S01` |",
          "| **Decides (institutional)** | Purchase Committee | IIT Palakkad EPC `P2-S02`; MITE `P2-S07`; "
          "ICAR-WII SPC `P2-S08` |",
          "| **Pays** | **Unknown — this is the gap.** Four offices have documented budget authority "
          "(VC/Director, Dean, Registrar, Finance Officer); none is an IIC seat | procurement "
          "instruments `P2-S02`–`P2-S09` |",
          "| **Approves** | Registrar / Dean (ICSR) → VC/Director above ceiling; Audit above ~₹10 lakh | "
          "`P2-S02`, `P2-S03`, `P2-S05` |", "",
          "---", "",
          "## Three asymmetries that should shape the GTM", "",
          "### 1. The user cannot authorise the purchase", "",
          "Phase 0 recorded this from competitor analysis: *\"Their buyer is the Principal/Registrar. "
          "The IIC nodal officer — StartupHub's actual buyer — has no seat in that buying decision.\"* "
          "The procurement manuals now confirm it structurally: the IIC Convener's signature appears "
          "only as the **indenter** on a requisition, and at ICAR-WII the co-opted indentor *\"can only "
          "advise the committee.\"* `P2-S08`", "",
          "### 2. The person who signs has no reason to care about innovation records", "",
          "The Registrar/Dean cares about procurement risk, precedent and budget period. They do not "
          "own innovation data. This means the champion and the approver are answering to different "
          "motivations, and the product must survive both.", "",
          "### 3. The approver has one question StartupHub must pre-empt", "",
          f"\"Is there an existing budget line for this?\" Above roughly ₹2 lakh in the private "
          "segment the answer is structurally *no* — the line had to exist before the conversation "
          "started. `P2-S06` This is D-007 restated as a procurement fact rather than a sales "
          "opinion.", "", "---", "",
          "## What Phase 3 must settle", "",
          "| Question | Why it matters |", "|---|---|",
          "| Does the IIC Convener hold a budget line, or does the Dean/R&D office hold it and the "
          "Convener merely spends from it? | The single most important unknown in Phase 2. Determines "
          "who the economic buyer actually is. |",
          "| Who actually initiates the requisition in practice — the Convener, the TBI manager, or the "
          "Dean? | Determines whether StartupHub has an internal champion or only a user. |",
          "| Is the Convener and the Incubation Manager the same person? | MIC guidance says they "
          "should be. If true, the buying centre is one person, not two. |",
          "| Do founders use the institution's systems at all? | `P-A01` found 38/55 startups "
          "unattributed. If founders are not users, the product is a single-sided compliance tool. |", "",
          "Back to [Phase 2 hub](README.md) · "
          "[Role Matrix](Role_Matrix.md) · [Procurement Authority](Procurement_Authority.md)", ""]
    (ROLES_DIR / "Decision_Map.md").write_text("\n".join(L), encoding="utf-8")


def write_procurement():
    i = P.insights()
    L = ["# Procurement Authority — the price selects the approver", "",
         f"{i['threshold_rows']} authority thresholds read from {i['institutions']} published "
         "institutional procurement instruments, plus one statutory rule (GFR 2017).", "",
         "---", "",
         "## The headline", "",
         "| | |", "|---|---|",
         f"| Lowest committee trigger measured | **{P.display_inr(i['committee_trigger_min'])}** |",
         f"| Highest committee trigger measured | **{P.display_inr(i['committee_trigger_max'])}** |",
         f"| **Spread** | **{i['committee_trigger_spread']}x** |",
         f"| Highest solo-officer ceiling measured | {P.display_inr(i['solo_ceiling_max'])} |", "",
         "**There is no uniform Indian threshold.** Pricing is therefore not only a revenue decision "
         "— it changes *how many people must agree* and *which offices are in the room*.", "",
         "### Committee trigger by institution", "",
         "The value at which a purchase stops being a departmental decision.", "",
         "| Institution | Segment | Committee engaged above |",
         "|---|---|---|"]
    seg = {t["institution"]: t["segment"] for t in P.ALL_THRESHOLDS}
    for inst, v in sorted(P.committee_triggers().items(), key=lambda kv: kv[1]):
        L.append(f"| {inst} | {seg[inst]} | **{P.display_inr(v)}** |")
    L += ["", "---", "",
          "## Where StartupHub's price band lands", ""]
    for pb in P.PRICE_BAND:
        label = pb["label"] + (" ⚠" if pb.get("caution") else "")
        L.append(f"### {P.display_inr(pb['inr'])} — {label}")
        L.append("")
        L.append("| Institution | Committee status |")
        L.append("|---|---|")
        for r in P.band_position(pb["inr"]):
            L.append(f"| {r['institution']} | {r['verdict']} |")
        L.append("")
    L += ["---", "",
          "## Why the entry price matters so much", "",
          "At **₹75,000** the sale splits across institutions: a solo officer can act at some, a "
          "committee is engaged at others. At **₹3,95,200** the picture inverts — the sale crosses "
          "into committee-and-escalation territory at most.", "",
          "The same table also shows why a *uniform* national price cannot be optimised: the correct "
          "price for IIT Palakkad and for NIT Warangal are not the same number.", "",
          "**Interaction with D-008.** The Decision Log holds the pricing floor above free-tier anchors "
          "(Trello ~₹54k/yr, ClickUp ~₹76k/yr, Notion ~₹86k/yr). Phase 2 says that floor sits *above* "
          "the solo-officer ceiling at most institutions measured (₹10k–₹25k), so StartupHub should "
          "**expect a committee, not a rubber stamp, even at the entry tier** — and should plan the "
          "sale accordingly rather than assuming a fast, cheap close.", "",
          "---", "",
          "## Six procedural facts that change the ladder", ""]
    for e in P.EXEMPTIONS:
        L += [f"### {e['title']}", "",
              f"*{e['detail']}* — `{e['source']}` `{e['grade']}`", "",
              f"**Consequence.** {e['consequence']}", ""]
    L += ["---", "",
          "## Full ladders", ""]
    for segment, rows in (("CENTRAL", P.CENTRAL), ("PRIVATE", P.PRIVATE)):
        L += [f"### {segment}", "",
              "| Institution | Authority | Ceiling | Scope |", "|---|---|---|---|"]
        for t in sorted(rows, key=lambda t: (t["institution"], -(t["max_inr"] or 10**9))):
            L.append(f"| {t['institution']} | {t['authority']} | {P.display_inr(t['max_inr'])} "
                     f"| {t['scope']} |")
        L.append("")
    L += ["---", "",
          "## Sources", "",
          "| Key | Organisation | Document | Tier |", "|---|---|---|---|"]
    for k, s in R.SOURCES.items():
        if k in {t["source"] for t in P.ALL_THRESHOLDS} | {e["source"] for e in P.EXEMPTIONS}:
            L.append(f"| `{k}` | {s['org']} | {s['title']} | {s['tier']} |")
    L += ["", "## Honest limits", "",
          "- **These eight are not a sample.** They were found on public institution websites, which "
          "likely favours well-governed, publication-friendly institutions. The true national spread is "
          "**at least** 20x, probably wider. Logged as OQ-25.",
          "- **No national HEI procurement standard was found.** GFR 2017 binds central institutions, "
          "but private universities set their own policy under UGC norms, and these two private "
          "instruments differ sharply from the central ones.",
          "- **Threshold is not behaviour.** A rule says what *may* happen. What happens is unobserved "
          "and is Phase 3's job.",
          "- **Software is not always 'non-consumable'.** NIT Warangal separates the two, and the "
          "classification changes the ceiling. Untested elsewhere.", "",
          "Back to [Phase 2 hub](README.md) · [Decision Map](Decision_Map.md)", ""]
    (ROLES_DIR / "Procurement_Authority.md").write_text("\n".join(L), encoding="utf-8")


def write_deep_dives():
    dd = ROLES_DIR / "Deep_Dives"
    dd.mkdir(parents=True, exist_ok=True)
    byid = R.by_id()
    written = []
    for rid in R.DEEP_DIVE_ROLES:
        r = byid[rid]
        L = [f"# {r['id']} — {r['name']}", "",
             f"**Class {r['role_class']}** — {R.ROLE_CLASSES[r['role_class']]}", "",
             "| Question | Answer | Grade |", "|---|---|---|"]
        for q, label in (("uses", "Who uses it"), ("decides", "Who decides"),
                         ("pays", "Who pays"), ("approves", "Who approves")):
            L.append(f"| **{label}** | {r[q]} | `{r['grades'][q]}` |")
        L += ["", "## Mandated responsibility", ""]
        if r["official_responsibility"]:
            L += [f"> {r['official_responsibility']}", ""]
        else:
            L += ["_No official description located in the sources read._", ""]
        if r["notes"]:
            L += ["## Why this role matters", "", r["notes"], ""]
        L += ["## Sources", ""]
        if r["cites"]:
            for c in r["cites"]:
                s = R.SOURCES[c]
                L.append(f"- `{c}` — {s['org']}, *{s['title']}*. {s['tier']}. <{s['url']}>")
        else:
            L += ["_No sources. This role is recorded as unevidenced._", ""]
        L += ["", "---", "",
              "Back to [Phase 2 hub](../README.md) · "
              "[Role Matrix](../Role_Matrix.md) · "
              "[Procurement Authority](../Procurement_Authority.md)", ""]
        p = dd / f"{r['id']}_{slug(r['name'])}.md"
        p.write_text("\n".join(L), encoding="utf-8")
        written.append((r, p))
    return written


def nid(rid):
    return rid.replace("-", "_")


def write_diagram():
    """Mermaid block consumed by render_diagrams.py."""
    path = ROLES_DIR / "IIC_Roles_And_Approval_Chain.md"
    cls = R.by_class()
    byname = {r["name"]: r for r in R.ROLES}

    A03 = nid("A-03")   # Convener
    A01 = nid("A-01")   # President
    A06 = nid("A-06")   # Innovation Activity Coordinator
    A08 = nid("A-08")   # IPR Activity Coordinator
    A10 = nid("A-10")   # ARIIA Coordinator
    A11 = nid("A-11")   # NIRF Coordinator
    B01 = nid("B-01")   # VC / Director
    B02 = nid("B-02")   # Dean / Innovation Head
    B05 = nid("B-05")   # HoD
    C01 = nid("C-01")   # Registrar / Dean ICSR
    C02 = nid("C-02")   # Purchase Committee
    C03 = nid("C-03")   # Finance Officer
    C04 = nid("C-04")   # Audit
    C05 = nid("C-05")   # IT Administrator

    L = [
        "# IIC roles and the approval chain", "",
        "Class A seats are portal-enforced. The approval chain is off-portal. The gap between them "
        "is the commercial problem.", "",
        "```mermaid",
        "flowchart LR",
        "",
        '  subgraph CLASS_A["Class A - mandated IIC seats (IIC portal enforces all of these)"]',
        "  direction TB",
        f'    {A01}["IIC President<br/>holds the portal login"]',
        f'    {A03}["IIC Convener<br/>day-to-day operator"]',
        f'    {A06}["Innovation Activity<br/>Coordinator"]',
        f'    {A08}["IPR Activity<br/>Coordinator"]',
        f'    {A10}["ARIIA Coordinator<br/>builds the repository"]',
        f'    {A11}["NIRF Coordinator<br/>builds the repository"]',
        "  end",
        "",
        '  subgraph CLASS_B["Class B - adjacent institutional offices"]',
        "  direction TB",
        f'    {B01}["VC / Director"]',
        f'    {B02}["Dean / Innovation Head"]',
        f'    {B05}["Head of Department"]',
        "  end",
        "",
        '  subgraph CLASS_C["Class C - off-portal gatekeepers"]',
        "  direction TB",
        f'    {C01}["Registrar / Dean (ICSR)"]',
        f'    {C02}["Purchase Committee"]',
        f'    {C03}["Finance Officer"]',
        f'    {C04}["Audit"]',
        f'    {C05}["IT Administrator"]',
        "  end",
        "",
        f'  DATA[("Innovation data<br/>hand-assembled")]',
        f'  GOV[("Government screens<br/>IIC / ARIIA / NIRF / YUKTI")]',
        "",
        f'  {A03} -.->|"collects"| DATA',
        f'  {A06} -.->|"compiles the report"| DATA',
        f'  {A08} -.->|"IPR records"| DATA',
        f'  {A10} -.->|"off-platform repository"| DATA',
        f'  {A11} -.->|"off-platform repository"| DATA',
        f'  DATA -.->|"re-keyed by hand"| GOV',
        "",
        f'  {A03} -->|"requisition as indenter"| {C02}',
        f'  {B05} -->|"departmental indent"| {C02}',
        f'  {C02} -->|"recommends"| {C01}',
        f'  {C03} -.->|"can block via quorum"| {C02}',
        f'  {C01} -->|"approves to its ceiling"| {C03}',
        f'  {C01} -->|"escalates above ceiling"| {B01}',
        f'  {B02} -->|"research budget"| {C01}',
        f'  {C04} -.->|"PO not issued above ~Rs 10L"| {C02}',
        f'  {C05} -.->|"technical gate"| {C01}',
        f'  {A01} -.->|"institutional sponsor"| {B01}',
        "",
        "  classDef gate fill:#fee2e2,stroke:#b91c1c,color:#450a0a",
        "  classDef seat fill:#eef2ff,stroke:#4f46e5,color:#1e1b4b",
        "  classDef money fill:#ecfdf5,stroke:#047857,color:#022c22",
        "  classDef data fill:#fef3c7,stroke:#b45309,color:#451a03",
        f"  class {A01},{A03},{A06},{A08},{A10},{A11} seat",
        f"  class {C01},{C02},{C03},{C04},{C05} gate",
        f"  class {B01},{B02},{B05} money",
        "  class DATA,GOV data",
        "```",
        "",
        "Reading it: the mandated seats on the left run the entire system and **hold no documented "
        "budget**. The gatekeepers on the right control the money and **never touch innovation "
        "records**. Dashed edges are the work nobody owns.", "",
        "Source: `build/data_p2_roles.py` and `build/data_p2_procurement.py`, both T1-sourced.",
        "Back to [Phase 2 hub](README.md)", "",
    ]
    path.write_text("\n".join(L), encoding="utf-8")
    return path


def write_exports():
    cols = ["id", "name", "role_class", "in_todo_list", "todo_ref", "portal_enforced",
            "grade_uses", "grade_decides", "grade_pays", "grade_approves",
            "uses", "decides", "pays", "approves", "official_responsibility", "notes", "cites"]
    rows = []
    for r in R.ROLES:
        rows.append(dict(
            id=r["id"], name=r["name"], role_class=r["role_class"],
            in_todo_list=r["in_todo_list"], todo_ref=r["todo_ref"],
            portal_enforced=r["portal_enforced"],
            grade_uses=r["grades"]["uses"], grade_decides=r["grades"]["decides"],
            grade_pays=r["grades"]["pays"], grade_approves=r["grades"]["approves"],
            uses=r["uses"], decides=r["decides"], pays=r["pays"], approves=r["approves"],
            official_responsibility=r["official_responsibility"], notes=r["notes"],
            cites=";".join(r["cites"])))
    n1 = write_csv(OUT / "role_matrix.csv", cols, rows)

    tcols = ["institution", "segment", "doc", "authority", "max_inr", "display_inr",
             "scope", "note", "source"]
    trows = [dict(institution=t["institution"], segment=t["segment"], doc=t["doc"],
                  authority=t["authority"], max_inr=t["max_inr"],
                  display_inr=P.display_inr(t["max_inr"]), scope=t["scope"],
                  note=t["note"], source=t["source"]) for t in P.ALL_THRESHOLDS]
    n2 = write_csv(OUT / "procurement_thresholds.csv", tcols, trows)

    payload = dict(
        generated="2026-10-18", generated_by="build/build_phase2.py",
        evidence_grades=dict(DOCUMENTED="Multiple primary sources read and cited.",
                             SINGLE_SOURCE="One primary source. Suggestive only.",
                             HYPOTHESIS="Structurally implied, NOT evidenced."),
        role_classes=R.ROLE_CLASSES,
        sources=R.SOURCES, roles=R.ROLES, deep_dive_roles=R.DEEP_DIVE_ROLES,
        procurement=dict(thresholds=P.ALL_THRESHOLDS, exemptions=P.EXEMPTIONS,
                        price_band=P.PRICE_BAND, insights=P.insights()),
    )
    (OUT / "role_profiles.json").write_text(json.dumps(payload, indent=2, ensure_ascii=False),
                                           encoding="utf-8")
    schema = dict(
        generated="2026-10-18",
        description="One record per customer role across four classes.",
        classes=R.ROLE_CLASSES,
        fields={
            "id": "Stable role identifier. Class letter encodes the class.",
            "role_class": "A mandated IIC seat / B adjacent institutional / C off-portal gatekeeper / D individual user.",
            "in_todo_list": "True if the role appears in todo.md Phase 2's list of 12.",
            "todo_ref": "The todo.md label it maps to.",
            "portal_enforced": "True if the IIC portal refuses activity entry without this role.",
            "grades": "Per-question evidence grade. Falls in confidence as the question approaches money.",
            "uses/decides/pays/approves": "The four questions, answered in prose with a grade.",
            "official_responsibility": "Quoted or closely paraphrased from a published IIC constitution.",
            "cites": "Keys into `sources`.",
        },
        honesty_guard=("validation() FAILS the build if any role is graded DOCUMENTED on `pays` "
                       "without citing a source in BUDGET_AUTHORITY_SOURCES - i.e. a procurement "
                       "instrument that actually confers budget authority. Result: only 4 of 25 roles "
                       "carry a documented `pays`, and none is a mandated IIC seat."),
        known_gaps=[
            "No source read establishes which budget head, if any, funds an IIC seat.",
            "Procurement instruments come from 8 institutions found on public sites; not a sample.",
            "Role incumbency is documented for a handful of institutions only.",
        ],
    )
    (OUT / "role_schema.json").write_text(json.dumps(schema, indent=2, ensure_ascii=False),
                                          encoding="utf-8")
    return n1, n2


def write_raw():
    RAW.mkdir(parents=True, exist_ok=True)
    p = RAW / "phase2_roles_RAW.json"
    p.write_text(json.dumps(dict(
        note="Raw Phase 2 extraction layer. Same records as _exports/phase2/role_profiles.json "
             "with no interpretation added. Regenerated - do not hand-edit.",
        generated="2026-10-18", generated_by="build/build_phase2.py",
        sources=R.SOURCES, roles=R.ROLES, todo_coverage=R.todo_coverage(),
        thresholds=P.ALL_THRESHOLDS, exemptions=P.EXEMPTIONS, insights=P.insights(),
    ), indent=2, ensure_ascii=False), encoding="utf-8")
    return p


def main():
    print("=" * 78)
    print("  PHASE 2 — CUSTOMER ROLES, BUYING CENTRES, APPROVAL CHAIN")
    print("=" * 78)

    errs = R.validation() + P.validation()
    if errs:
        raise SystemExit("Validation failed:\n  - " + "\n  - ".join(errs))

    n1, n2 = write_exports()
    print(f"  csv/role_matrix.csv              {n1:4d} roles x 17 cols")
    print(f"  csv/procurement_thresholds.csv   {n2:4d} thresholds x 8 institutions")
    print(f"  json/role_profiles.json          {len(R.ROLES):4d} nested role records")
    print(f"  json/role_schema.json            field defs + honesty guard")

    ROLES_DIR.mkdir(parents=True, exist_ok=True)
    write_mandated_seats();   print("  08_User_Roles/Mandated_IIC_Seats.md")
    write_matrix();            print("  08_User_Roles/Role_Matrix.md")
    write_procurement();      print("  08_User_Roles/Procurement_Authority.md")
    write_decision_map();      print("  08_User_Roles/Decision_Map.md")
    dd = write_deep_dives()
    print(f"  08_User_Roles/Deep_Dives/        {len(dd)} profiles")
    for r, p in dd:
        print(f"      {r['id']}  {r['name']}")
    dg = write_diagram();      print("  08_User_Roles/IIC_Roles_And_Approval_Chain.md  (mermaid source)")
    write_hub(dd);             print("  08_User_Roles/README.md")

    before, added = merge_registry(registry_rows())
    print(f"  Source_Registry.csv              +{added} rows ({before} -> {before + added})")

    p = write_raw();           print(f"  _exports/raw/                     {p.name} ({p.stat().st_size:,} bytes)")

    print()
    i = P.insights()
    print(f"  Roles: {len(R.ROLES)} across 4 classes | documents: {i['institutions']}")
    print(f"  Committee trigger spread: {P.display_inr(i['committee_trigger_min'])} "
          f"- {P.display_inr(i['committee_trigger_max'])} ({i['committee_trigger_spread']}x)")
    dd_roles = [r for r in R.ROLES if r["grades"]["pays"] == "DOCUMENTED"]
    print(f"  Roles with DOCUMENTED budget authority: {len(dd_roles)}/25 "
          f"({', '.join(r['id'] for r in dd_roles)}) - none is Class A")
    return 0


if __name__ == "__main__":
    sys.exit(main())