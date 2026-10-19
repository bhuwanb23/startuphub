#!/usr/bin/env python3
"""StartupHub Phase 3B exporter - the interview programme, ready to run.

Writes, per the repository layering rule (summaries in topic folders, data in
_exports):

  02_User_Research/README.md                   the programme hub + method
  02_User_Research/Interview_Protocol.md       how to run one interview
  02_User_Research/Consent_And_Ethics.md      consent block + recording rules
  02_User_Research/Guides/Guide_A_IIC_Seats.md
  02_User_Research/Guides/Guide_B_Institutional_Office.md
  02_User_Research/Guides/Guide_C_Off_Portal_Gatekeepers.md
  02_User_Research/Guides/Guide_D_Individual_Users.md
  02_User_Research/Falsification_Matrix.md     10 hypotheses x what would kill it
  02_User_Research/Recruitment_Shortlist.md    6 institutions, evidence-ranked
  02_User_Research/Coding_Scheme.md            10 codes + the 3-of-6 rule
  02_User_Research/Capture_Template.md         the note-taking sheet
  _exports/phase3b/guides.json
  _exports/phase3b/falsification_matrix.csv
  _exports/phase3b/recruitment_shortlist.csv
  _exports/phase3b/coding_scheme.csv
  _exports/phase3b/instrument_schema.json
  _exports/raw/phase3b_instruments_RAW.json

NOTHING HERE IS A RESULT. This is an instrument, a target list and a
falsification plan. `interviews_conducted` is 0 and the build prints it.

Usage:  python build/build_phase3b.py
"""

import csv
import json
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
ROOT = HERE.parent

import data_p3_interviews as I        # noqa: E402

OUT = ROOT / "_exports" / "phase3b"
RAW = ROOT / "_exports" / "raw"
UR = ROOT / "02_User_Research"
GUIDES = UR / "Guides"

GENERATED = "2026-10-19"

GUIDE_FILES = {
    "G-A": "Guide_A_IIC_Seats.md",
    "G-B": "Guide_B_Institutional_Office.md",
    "G-C": "Guide_C_Off_Portal_Gatekeepers.md",
    "G-D": "Guide_D_Individual_Users.md",
}


def write_csv(path, cols, rows):
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", newline="", encoding="utf-8-sig") as fh:
        w = csv.DictWriter(fh, fieldnames=cols, extrasaction="ignore")
        w.writeheader()
        for r in rows:
            w.writerow(r)
    return len(rows)


# --------------------------------------------------------------------------
# machine exports
# --------------------------------------------------------------------------
GUIDE_COLS = ["guide_id", "role_class", "title", "priority", "phase2_refs",
              "question_no", "bank", "question", "probe", "hook", "falsifies"]


def write_guides():
    rows = []
    for g in I.ROLE_GUIDES:
        for n, qq in enumerate(g["questions"], 1):
            rows.append({
                "guide_id": g["id"], "role_class": g["cls"], "title": g["title"],
                "priority": g["priority"],
                "phase2_refs": ", ".join(g["phase2_refs"]),
                "question_no": n, "bank": qq["bank"],
                "question": qq["q"], "probe": qq["probe"],
                "hook": qq["hook"], "falsifies": qq["falsifies"],
            })
    return write_csv(OUT / "guides.csv", GUIDE_COLS, rows)


FALS_COLS = ["id", "claim", "source", "status", "refuting_observation",
             "if_refuted", "tested_by_guide", "guide_question_no"]


def write_falsification():
    rows = [{
        "id": h["id"], "claim": h["claim"], "source": h["source"],
        "status": h["status"], "refuting_observation": h["refuting_observation"],
        "if_refuted": h["if_refuted"],
        "tested_by_guide": h["interview"]["id"], "guide_question_no": h["question"],
    } for h in I.HYPOTHESES]
    return write_csv(OUT / "falsification_matrix.csv", FALS_COLS, rows)


SHORT_COLS = ["rank", "institution", "role_1", "role_2", "documented_contradiction",
              "why_this_institution", "hypotheses_tested"]


def write_shortlist():
    rows = [{
        "rank": s["rank"], "institution": s["institution"],
        "role_1": s["pair"][0], "role_2": s["pair"][1],
        "documented_contradiction": s["contradiction"],
        "why_this_institution": s["why"],
        "hypotheses_tested": ", ".join(s["tests"]),
    } for s in I.SHORTLIST]
    return write_csv(OUT / "recruitment_shortlist.csv", SHORT_COLS, rows)


CODE_COLS = ["code", "bank", "definition", "evidence_bar", "falsifies"]


def write_codes():
    rows = [{"code": c["code"], "bank": c["bank"], "definition": c["definition"],
             "evidence_bar": c["evidence"], "falsifies": c["falsifies"]}
            for c in I.CODING_SCHEME]
    return write_csv(OUT / "coding_scheme.csv", CODE_COLS, rows)


def write_schema():
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / "instrument_schema.json").write_text(json.dumps(dict(
        note="Instrument definitions and the guards enforced by "
             "data_p3_interviews.validation().",
        interviews_conducted=0,
        banks=[dict(id=b["id"], name=b["name"], spec_questions=b["spec_questions"],
                    rationale=b["rationale"]) for b in I.BANKS],
        role_classes={"A": "Mandated IIC seats - integration point, target first",
                      "B": "Adjacent institutional offices (Registrar/Dean, VC, Finance)",
                      "C": "Off-portal gatekeepers (Purchase Cttee, IT Admin, Audit)",
                      "D": "Individual users (students, founders)"},
        guards=[
            "no question may contain a hypothetical purchase-intent frame",
            "every question must carry a bank, a probe, an evidence hook and a falsifier",
            "every hypothesis must name a refuting observation and a real guide question",
            "a DOCX/count may never be reported without the institution count beside it",
            "synthetic output may never enter _exports outside _exports/synthetic/",
        ],
        banned_intent_frames=I.BANNED_INTENT_FRAMES,
        analysis_rules=I.ANALYSIS_RULES,
        ollama_rules=I.OLLAMA_RULES,
    ), indent=2, ensure_ascii=False), encoding="utf-8")
    return 1


def write_raw():
    RAW.mkdir(parents=True, exist_ok=True)
    p = RAW / "phase3b_instruments_RAW.json"
    p.write_text(json.dumps(dict(
        note="Raw Phase 3B instrument layer. Instruments, targets and falsification "
             "tests only. Contains NO interview data and NO synthetic output. "
             "Regenerated - do not hand-edit.",
        generated=GENERATED, generated_by="build/build_phase3b.py",
        interviews_conducted=0,
        banks=I.BANKS, guides=I.ROLE_GUIDES, hypotheses=I.HYPOTHESES,
        shortlist=I.SHORTLIST, exclusions=I.SHORTLIST_EXCLUSIONS,
        consent=I.CONSENT_BLOCK, coding=I.CODING_SCHEME,
        analysis_rules=I.ANALYSIS_RULES, ollama_rules=I.OLLAMA_RULES,
    ), indent=2, ensure_ascii=False), encoding="utf-8")
    return p


# --------------------------------------------------------------------------
# prose
# --------------------------------------------------------------------------
def write_hub():
    UR.mkdir(parents=True, exist_ok=True)
    p = UR / "README.md"
    L = []
    a = L.append
    a("# Phase 3B — The Interview Programme")
    a("")
    a(f"**Built {GENERATED} by `build/build_phase3b.py`. "
      f"Interviews conducted: {I.summary()['interviews_conducted']}.**")
    a("")
    a("> **Everything in this folder is an instrument, not a result.** There are "
      "guides to ask, targets to call and hypotheses to kill. No respondent has been "
      "spoken to. No claim here may be cited externally as user evidence until a "
      "real interview supports it.")
    a("")
    a("---")
    a("")
    a("## Why this exists")
    a("")
    a("Phase 1 (36 institutional reports) and Phase 2 (8 procurement instruments) are "
      "**documentary**. Phase 3A (11 NIRF/ARIIA forms) is also documentary. All three "
      "are strong on what institutions *published*, and silent on what people "
      "*do*.")
    a("")
    a("The things that decide whether StartupHub is a product or a guess all live in "
      "the gap: who holds the budget, whether a venture register exists at all, what "
      "the nodal officer types when a DPIIT number is missing, whether anyone "
      "reconciles NIRF against ARIIA.")
    a("")
    a("**6 institutions × 2 paired roles = 12 interviews.**")
    a("")
    a("| | |")
    a("|---|---|")
    a("| Interviews | 12 (6 institutions, 2 roles each) |")
    a("| Length | 30–40 min each |")
    a("| Method | Semi-structured, past-behaviour anchored |")
    a("| Hypotheses to test | 10 (see `Falsification_Matrix.md`) |")
    a("| Reporting bar | 3 of 6 institutions minimum, count always shown |")
    a("")
    a("---")
    a("")
    a("## The pairing is the method")
    a("")
    a("Each institution gets two interviews with **different roles** so the two "
      "accounts of one portfolio can be compared directly:")
    a("")
    a("- **The operational view** — the Convener / ARIIA-NIRF nodal officer, who "
      "does the work.")
    a("- **The authority view** — the Registrar / Dean (ICSR), who can authorise "
      "or refuse.")
    a("")
    a("Compared on four questions:")
    a("")
    a("1. How many startups does the institute have? Do the two numbers match?")
    a("2. Who owns the startup data?")
    a("3. What was the last thing the institute paid for in this space?")
    a("4. Who could actually approve a purchase here?")
    a("")
    a("A divergence between the operational and authority views is itself the "
      "finding. It tells us whether the person with the pain can reach the person "
      "with the money — which is the entire go-to-market question.")
    a("")
    a("---")
    a("")
    a("## The one rule that matters")
    a("")
    a("`todo.md` is right that *\"Would you use StartupHub?\"* produces weak "
      "validation. The fix is not softer questions. **It is anchoring every "
      "question to a recent real event.**")
    a("")
    a("> ❌ Don't ask: *\"Would you pay ₹1.2 lakh?\"*")
    a("> ✅ Ask: *\"You asked for ₹1.2 lakh for something. Where did that number "
      "come from? Did you compare it to something you already spend?\"*")
    a("")
    a("Every question in every guide carries:")
    a("")
    a("| Field | Purpose |")
    a("|---|---|")
    a("| `question` | The ask, anchored to a past event |")
    a("| `probe` | The follow-up that turns an answer into evidence |")
    a("| `hook` | The prior finding it tests (`P-A10`, `OQ-32`, `F-DPIIT-JOIN`…) |")
    a("| `falsifies` | The claim that dies if the answer goes this way |")
    a("")
    a("A question with no `hook` is a question we cannot act on. The build rejects "
      "it.")
    a("")
    a("---")
    a("")
    a("## Files")
    a("")
    a("| File | What it is |")
    a("|---|---|")
    a("| `Interview_Protocol.md` | How to run one interview, end to end |")
    a("| `Consent_And_Ethics.md` | Consent block, recording rules, what we never publish |")
    a("| `Guides/` | 4 role-class guides, 21 questions, each with probe + hook + falsifier |")
    a("| `Falsification_Matrix.md` | 10 hypotheses and the observation that would kill each |")
    a("| `Recruitment_Shortlist.md` | 6 institutions, ranked by *contradiction*, not prestige |")
    a("| `Coding_Scheme.md` | 10 codes, evidence bars, and the 3-of-6 reporting rule |")
    a("| `Capture_Template.md` | The note sheet — fill one per interview |")
    a("")
    a("Machine-readable: `_exports/phase3b/`.")
    a("")
    a("---")
    a("")
    a("## What Workstream A changed")
    a("")
    a("Phase 3A found the NIRF form's only join is the founder's DPIIT number, and "
      f"that **{32} of 354** recognised startups lose identity at it. That turns "
      "three of the guides' best questions:")
    a("")
    a("- *\"Where did the DPIIT number come from?\"* (`OQ-32`)")
    a("- *\"What did you type when you couldn't find it?\"* (`OQ-33`)")
    a("- *\"When ARIIA asks again, do you reuse the same list?\"* (`OQ-34`)")
    a("")
    a("Without Phase 3A these would have been generic workflow questions. With it "
      "they are specific, and the answers are decision-changing.")
    a("")
    a("---")
    a("")
    a("## Blocked")
    a("")
    a("**This phase cannot progress past instrumentation without people.** The "
      "remaining work is: recruit 6 institutions, run 12 interviews, code them, and "
      "report only what survives the 3-of-6 bar.")
    a("")
    a("Ollama is available for **instrument validation only** — checking that the "
      "guides are answerable and non-leading before a human wastes time on them. "
      "Synthetic output is permanently quarantined: `SYNTHETIC — NOT EVIDENCE`, "
      "excluded from the manifest, never counted, never quoted.")
    a("")
    p.write_text("\n".join(L), encoding="utf-8")
    return p


def write_protocol():
    p = UR / "Interview_Protocol.md"
    L = []
    a = L.append
    a("# Interview Protocol")
    a("")
    a(f"Built {GENERATED} by `build/build_phase3b.py`.")
    a("")
    a("---")
    a("")
    a("## Before you book")
    a("")
    a("1. Read the guide for the role class you are interviewing.")
    a("2. Check the `hook` on each question — know what finding it tests, so you "
      "can follow up when the answer is thin.")
    a("3. Confirm the respondent is the person who **does the work**, not the "
      "person who signs it. A Convener who delegates the form to a junior gives "
      "you the wrong answer.")
    a("4. Have `Capture_Template.md` open. Have a copy of that institution's "
      "documented contradiction ready — you will be tempted to prime them with "
      "it, and you must not. Ask, then check.")
    a("")
    a("---")
    a("")
    a("## Timing — 30 to 40 minutes")
    a("")
    a("| Minutes | Block |")
    a("|---:|---|")
    a("| 0–5 | Consent. Read `Consent_And_Ethics.md` verbatim. Do not paraphrase. |")
    a("| 5–20 | Core questions (bank priority PRIMARY for this role) |")
    a("| 20–30 | Secondary questions |")
    a("| 30–37 | **The artefact ask** — see below |")
    a("| 37–40 | Close: what did we get wrong? Anything you would add? |")
    a("")
    a("### The artefact ask")
    a("")
    a("The single highest-value request in the whole programme:")
    a("")
    a("> *\"Would you be willing to share a screenshot or a blank version of what "
      "you filled in last time? Blank out any names. I just want to see the shape "
      "of it — which columns you had open, where the data came from.\"*")
    a("")
    a("This is how `P-A10` stops being a hypothesis. Phase 1 has only ever seen "
      "institutions' **exports**. The tool upstream of the export has never been "
      "observed by anyone on this project.")
    a("")
    a("> **This is the one place a \"would you\" phrasing is correct.** It asks "
      "permission to receive a document — it is a consent request, not a "
      "validation question, and it asks nothing about the future. The rule bans "
      "hypothetical *purchase* intent; it does not ban asking for consent.")
    a("")
    a("---")
    a("")
    a("## Rules in the room")
    a("")
    a("| Do | Don't |")
    a("|---|---|")
    a("| Ask \"walk me through the last time\" | Ask \"how do you usually\" |")
    a("| Let the silence run after a question | Fill the silence yourself |")
    a("| Record non-answers as findings | Push past \"I don't know\" |")
    a("| Ask what actually happened | Ask what should happen |")
    a("| Take the contradiction seriously | Use it to catch them out |")
    a("| Ask for a number, then accept \"roughly\" | Insist on precision |")
    a("")
    a("**On the documented contradiction.** We know, for example, that one "
      "institution reported 55 and 17 startups in the same PDF. We must **not** "
      "open with it. Ask the workflow questions cold. Only if the contradiction "
      "comes up unprompted do we probe it. If it never comes up, that is itself "
      "the finding — the institution does not know its own numbers.")
    a("")
    a("---")
    a("")
    a("## Immediately after — 10 minutes")
    a("")
    a("1. Fill `Capture_Template.md` while it is fresh.")
    a("2. Tag every answer with a code from `Coding_Scheme.md`.")
    a("3. Mark any question where the respondent **could not answer**. Silence is "
      "data.")
    a("4. Note which hypotheses this interview confirms, refutes, or leaves open.")
    a("5. For paired institutions, write the divergence note before you forget it.")
    a("")
    a("---")
    a("")
    a("## What not to do")
    a("")
    a("- **Do not demo the product.** No pilot, no screens, no pricing. We are "
      "measuring the current workflow, not selling.")
    a("- **Do not ask whether they would buy.** Ask what they last paid for and "
      "what head it came from.")
    a("- **Do not promise anything.** This is research.")
    a("- **Do not correct a wrong number** they give. Record it. A wrong number is "
      "the finding.")
    a("")
    p.write_text("\n".join(L), encoding="utf-8")
    return p


def write_consent():
    p = UR / "Consent_And_Ethics.md"
    L = []
    a = L.append
    a("# Consent and Ethics")
    a("")
    a(f"Built {GENERATED} by `build/build_phase3b.py`.")
    a("")
    a("---")
    a("")
    a("## Read this verbatim, at the start, every time")
    a("")
    a("Do not paraphrase. Do not trim. If the interview runs long, cut questions, "
      "never consent.")
    a("")
    a("> " + "\n> ".join(I.CONSENT_BLOCK))
    a("")
    a("---")
    a("")
    a("## Handling what we collect")
    a("")
    a("| Rule | Detail |")
    a("|---|---|")
    a("| **Attribution** | Default is anonymous with role + institution type "
      "(\"a Convener at a central university\"). Naming requires explicit written "
      "permission. |")
    a("| **Quotations** | Verbatim only, checked against the recording. No "
      "paraphrase ever appears inside quotation marks. |")
    a("| **Institutional naming** | A documented contradiction we already hold is "
      "already in a public PDF — but the *interview* is not. Do not connect a "
      "respondent's words to a named public document without permission. |")
    a("| **Screenshots** | Blank out every name, registration number and email "
      "before storing. |")
    a("| **Retention** | Notes and recordings stored locally, never in a "
      "third-party transcription service. |")
    a("| **Declining** | An institution can withdraw at any point, and everything "
      "derived from that interview is deleted on request. |")
    a("")
    a("---")
    a("")
    a("## Synthetic material is quarantined, permanently")
    a("")
    a(f"Ollama may be used to check that these guides are answerable. Every "
      f"synthetic artefact carries the marker **`{I.OLLAMA_RULES['required_marker']}`** "
      f"and is written only to `_exports/synthetic/`, which is excluded from the "
      f"manifest.")
    a("")
    a("Forbidden, without exception:")
    a("")
    for f in I.OLLAMA_RULES["forbidden"]:
        a(f"- {f}")
    a("")
    a("The test is simple: **if a sentence could ever be mistaken for something a "
      "person said, it does not belong in the evidence layer.**")
    a("")
    p.write_text("\n".join(L), encoding="utf-8")
    return p


def write_guide_docs():
    GUIDES.mkdir(parents=True, exist_ok=True)
    out = []
    for g in I.ROLE_GUIDES:
        p = GUIDES / GUIDE_FILES[g["id"]]
        L = []
        a = L.append
        a(f"# Guide {g['id']} — {g['title']}")
        a("")
        a(f"**Role class {g['cls']} · recruitment priority {g['priority']} · "
          f"Phase 2 refs: {', '.join(g['phase2_refs'])}**")
        a("")
        a(f"Built {GENERATED} by `build/build_phase3b.py`. {len(g['questions'])} "
          f"questions. 30–40 minutes.")
        a("")
        a("---")
        a("")
        a("## Why this role, and why now")
        a("")
        a(g["why_first"])
        a("")
        a("---")
        a("")
        a("## Bank priority for this role")
        a("")
        a("| Bank | Priority |")
        a("|---|---|")
        for b in I.BANKS:
            a(f"| {b['id']} {b['name']} | **{g['banks'][b['id']]}** |")
        a("")
        if g["skip"]:
            a(f"**Skipped here:** {', '.join(g['skip'])}. Asking a "
              + ("student" if g['cls'] == 'D' else "gatekeeper")
              + " who approves software wastes a scarce slot.")
            a("")
        a("---")
        a("")
        a("## Questions")
        a("")
        for n, qq in enumerate(g["questions"], 1):
            bank = [b for b in I.BANKS if b["id"] == qq["bank"]][0]
            a(f"### {n}. {qq['q']}")
            a("")
            a(f"- **Bank:** {qq['bank']} — {bank['name']}")
            a(f"- **If the answer is thin, ask:** {qq['probe']}")
            a(f"- **Tests:** `{qq['hook']}`")
            a(f"- **This answer would show:** {qq['falsifies']}")
            a("")
        a("---")
        a("")
        a("## The artefact ask")
        a("")
        a("> *\"Would you be willing to share a screenshot or a blank version of "
          "what you filled in last time? Blank out any names. I just want to see "
          "the shape of it — which columns you had open, where the data came from.\"*")
        a("")
        a("Optional, at the end. Declining is fine and is not a signal about the "
          "institution.")
        a("")
        a("> *Note:* this asks permission to receive a document. It is a consent "
          "request, not a validation question — it hypothesises nothing about the "
          "future, which is why it is allowed to be phrased this way when the "
          "structured questions are not.")
        a("")
        p.write_text("\n".join(L), encoding="utf-8")
        out.append((g["id"], p))
    return out


def write_falsification_doc():
    p = UR / "Falsification_Matrix.md"
    L = []
    a = L.append
    a("# Falsification Matrix")
    a("")
    a(f"Built {GENERATED} by `build/build_phase3b.py`. "
      f"**{len(I.HYPOTHESES)} hypotheses. "
      f"{I.summary()['status']['HYPOTHESIS']} are graded HYPOTHESIS and "
      f"{I.summary()['status']['SINGLE-SOURCE']} SINGLE-SOURCE.**")
    a("")
    a("> **These are claims waiting to die.** Each one names the single observation "
      "that would refute it. A hypothesis with no refutation condition is "
      "unfalsifiable and cannot be tested by an interview — none of these have "
      "that problem.")
    a("")
    a("---")
    a("")
    a("## Summary")
    a("")
    a("| ID | Claim | Graded | Source |")
    a("|---|---|---|---|")
    for h in I.HYPOTHESES:
        a(f"| [{h['id']}](#{h['id'].lower()}) | {h['claim']} | {h['status']} | "
          f"{h['source']} |")
    a("")
    a("---")
    a("")
    for h in I.HYPOTHESES:
        a(f"### {h['id']}")
        a("")
        a(f"**Claim.** {h['claim']}")
        a("")
        a(f"- **Graded:** {h['status']}")
        a(f"- **Source:** {h['source']}")
        a(f"- **Tested in:** Guide `{h['interview']['id']}`, question "
          f"{h['question']} — {h['interview']['title']}")
        a("")
        a(f"**Refuting observation.** {h['refuting_observation']}")
        a("")
        a(f"**If refuted.** {h['if_refuted']}")
        a("")
        a("---")
        a("")
    a("## Rule")
    a("")
    a("A refutation is recorded as loudly as a confirmation. "
      "`Falsification_Matrix.md` is not a sales document — if four of these ten "
      "die, the roadmap changes and that is the point of running it.")
    a("")
    p.write_text("\n".join(L), encoding="utf-8")
    return p


def write_shortlist_doc():
    p = UR / "Recruitment_Shortlist.md"
    L = []
    a = L.append
    a("# Recruitment Shortlist")
    a("")
    a(f"Built {GENERATED} by `build/build_phase3b.py`. "
      f"**6 institutions × 2 paired roles = 12 interviews.**")
    a("")
    a("> ## The ranking rule is inverted on purpose")
    a(">")
    a("> A better interview target is one whose documentary record **contradicts "
      "itself**. A contradiction is a live question; a clean annual report is not. "
      "We are not chasing the most impressive institutions — we are chasing the "
      "ones where something visibly does not add up, because the officer who "
      "produced that can explain it, or cannot, and both are informative.")
    a("")
    a("---")
    a("")
    a("## Targets")
    a("")
    for s in I.SHORTLIST:
        a(f"### {s['rank']}. {s['institution']}")
        a("")
        a(f"- **Interview 1:** {s['pair'][0]}")
        a(f"- **Interview 2:** {s['pair'][1]}")
        a(f"- **Tests:** {', '.join(s['tests'])}")
        a("")
        a(f"**Documented contradiction.** {s['contradiction']}")
        a("")
        a(f"**Why this institution.** {s['why']}")
        a("")
        a("---")
        a("")
    a("## Deliberately not first")
    a("")
    a("| Institution | Why it is not on the list |")
    a("|---|---|")
    for e in I.SHORTLIST_EXCLUSIONS:
        a(f"| {e['institution']} | {e['reason']} |")
    a("")
    a("---")
    a("")
    a("## Pairing checklist")
    a("")
    a("Before an institution counts as done, both roles must have been interviewed. "
      "Compare on:")
    a("")
    a("1. How many startups does the institute have? Do the two numbers match?")
    a("2. Who owns the startup data?")
    a("3. What was the last thing the institute paid for in this space?")
    a("4. Who could actually approve a purchase here?")
    a("")
    a("**A divergence is the finding**, not a data-quality problem. It tells us "
      "whether the person with the pain can reach the person with the money.")
    a("")
    p.write_text("\n".join(L), encoding="utf-8")
    return p


def write_coding():
    p = UR / "Coding_Scheme.md"
    L = []
    a = L.append
    a("# Coding Scheme")
    a("")
    a(f"Built {GENERATED} by `build/build_phase3b.py`. "
      f"**{len(I.CODING_SCHEME)} codes.**")
    a("")
    a("---")
    a("")
    a("## Codes")
    a("")
    a("| Code | Bank | Definition | Evidence bar | Falsifies |")
    a("|---|---|---|---|---|")
    for c in I.CODING_SCHEME:
        a(f"| `{c['code']}` | {c['bank']} | {c['definition']} | {c['evidence']} | "
          f"{c['falsifies']} |")
    a("")
    a("---")
    a("")
    a("## Analysis rules")
    a("")
    a("These exist so the analysis is reproducible rather than anecdotal.")
    a("")
    for r in I.ANALYSIS_RULES:
        a(f"- {r}")
    a("")
    a("---")
    a("")
    a("### The 3-of-6 bar, stated plainly")
    a("")
    a("```")
    a("1 interview  -> an anecdote. Never reported as a finding.")
    a("2 interviews -> a lead. Investigate, do not conclude.")
    a("3 of 6       -> a finding. Publish it, with the count beside it.")
    a("4+ of 6      -> a pattern. It goes in the synthesis.")
    a("```")
    a("")
    a("Every number printed anywhere must carry its denominator. *\"Convener spends "
      "3 days on the submission (3 of 6 institutions)\"* — never *\"Convener "
      "spends 3 days\"*.")
    a("")
    p.write_text("\n".join(L), encoding="utf-8")
    return p


def write_capture():
    p = UR / "Capture_Template.md"
    L = []
    a = L.append
    a("# Capture Template")
    a("")
    a("One per interview. Fill within 10 minutes, while it is fresh.")
    a("")
    a("```")
    a("=" * 60)
    a("INTERVIEW RECORD")
    a("=" * 60)
    a("")
    a("Institution (may be withheld) : ______________________________")
    a("Institution type               : ______________________________")
    a("Role                          : ______________________________")
    a("Guide used                    : G-____")
    a("Date                          : ______________________________")
    a("Interviewer                   : ______________________________")
    a("Duration                      : ______ min")
    a("Recording                     : yes / no")
    a("Consent read verbatim         : yes / NO — STOP IF NOT")
    a("Artefact requested            : yes / no / declined")
    a("Artefact received             : yes / no / later")
    a("")
    a("-" * 60)
    a("NON-ANSWERS  (record every question you could not get answered)")
    a("-" * 60)
    a("These are findings. An institution that cannot name its own budget")
    a("head is the finding.")
    a("")
    a("  #  | question (short)          | refused / blank / did not know")
    a("  ---|---------------------------|---------------------------------")
    a("     |                           |")
    a("     |                           |")
    a("     |                           |")
    a("")
    a("-" * 60)
    a("CODES APPLIED")
    a("-" * 60)
    a("Format: CODE — one line of what was actually said, not a summary.")
    a("")
    a("  W-TOOL   : ")
    a("  W-SOURCE : ")
    a("  W-REWORK : ")
    a("  W-HOURS  : ")
    a("  W-ORPHAN : ")
    a("  W-PAID   : ")
    a("  W-HEAD   : ")
    a("  W-GATE   : ")
    a("  W-ANCHOR : ")
    a("  W-DEPLOY : ")
    a("")
    a("-" * 60)
    a("VERBATIM WORTH KEEPING  (exactly as said, checked against recording)")
    a("-" * 60)
    a("")
    a("  1. ")
    a("  2. ")
    a("")
    a("-" * 60)
    a("HYPOTHESES")
    a("-" * 60)
    a("Confirmed : ")
    a("Refuted   : ")
    a("Open      : ")
    a("")
    a("-" * 60)
    a("DIVERGENCE  (paired institutions only)")
    a("-" * 60)
    a("vs the other role at this institution:")
    a("")
    a("  Startup count agrees?        : ")
    a("  Data ownership agrees?       : ")
    a("  Last purchase agrees?       : ")
    a("  Approver agrees?            : ")
    a("")
    a("  What the divergence means:")
    a("")
    a("-" * 60)
    a("WHAT WE GOT WRONG")
    a("-" * 60)
    a("What did this person tell us that contradicts the research?")
    a("")
    a("  ")
    a("")
    a("=" * 60)
    a("```")
    a("")
    a("---")
    a("")
    a("**Reminder:** the reporting bar is 3 of 6 institutions, with the count "
      "printed beside every number. One interview is an anecdote.")
    a("")
    p.write_text("\n".join(L), encoding="utf-8")
    return p


# --------------------------------------------------------------------------
def main():
    errs, warns = I.validation()
    for w in warns:
        print(f"  warn: {w}")
    if errs:
        raise SystemExit("Validation failed:\n  - " + "\n  - ".join(errs))

    n1 = write_guides();        print(f"  csv/guides.csv                  {n1:4d} questions x 4 guides")
    n2 = write_falsification(); print(f"  csv/falsification_matrix.csv    {n2:4d} hypotheses")
    n3 = write_shortlist();     print(f"  csv/recruitment_shortlist.csv   {n3:4d} institutions (paired)")
    n4 = write_codes();         print(f"  csv/coding_scheme.csv           {n4:4d} codes")
    write_schema();             print("  json/instrument_schema.json")

    write_hub();                print("  02_User_Research/README.md")
    write_protocol();           print("  02_User_Research/Interview_Protocol.md")
    write_consent();            print("  02_User_Research/Consent_And_Ethics.md")
    gs = write_guide_docs();       print(f"  02_User_Research/Guides/        {len(gs)} guides")
    for gid, _ in gs:
        print(f"      {gid}  {GUIDE_FILES[gid]}")
    write_falsification_doc()
    print("  02_User_Research/Falsification_Matrix.md")
    write_shortlist_doc()
    print("  02_User_Research/Recruitment_Shortlist.md")
    write_coding();             print("  02_User_Research/Coding_Scheme.md")
    write_capture();            print("  02_User_Research/Capture_Template.md")

    p = write_raw();            print(f"  _exports/raw/                  {p.name} ({p.stat().st_size:,} bytes)")

    print()
    s = I.summary()
    print(f"  Banks {s['banks']} | Guides {s['role_guides']} | Questions {s['questions']} "
          f"| Hypotheses {s['hypotheses']} | Codes {s['codes']}")
    print(f"  Targeting {s['shortlist']} institutions = {s['pairing']}")
    print(f"  Hypotheses: {s['status']['HYPOTHESIS']} HYPOTHESIS, "
          f"{s['status']['SINGLE-SOURCE']} SINGLE-SOURCE")
    print()
    print(f"  INTERVIEWS CONDUCTED: {s['interviews_conducted']}")
    print("  This folder is an instrument, not a result. Nothing here may be cited")
    print("  as user evidence until a real interview supports it.")
    return 0


if __name__ == "__main__":
    sys.exit(main())