# Coding Scheme

Built 2026-10-19 by `build/build_phase3b.py`. **10 codes.**

---

## Codes

| Code | Bank | Definition | Evidence bar | Falsifies |
|---|---|---|---|---|
| `W-TOOL` | Q1 | Named tool, file or channel used to hold startup data | must name the artefact | H-01, H-03 |
| `W-SOURCE` | Q1 | Where a specific required field physically came from | must name the person, system or portal | H-02 |
| `W-REWORK` | Q2 | Work redone because a number was wrong or missing | must quantify (rows, hours) | H-04 |
| `W-HOURS` | Q2 | Time spent on the last completed cycle | numeric estimate the respondent accepts | H-04 |
| `W-ORPHAN` | Q2 | A startup the institute lost track of | narrative + how it was noticed | H-01 |
| `W-PAID` | Q3 | Software the institute already pays for that overlaps this job | name + cost if known | H-03 |
| `W-HEAD` | Q4 | The budget head a purchase would come from | named head | H-07 |
| `W-GATE` | Q4 | A person or rule that can block the purchase | named role or cited rule | H-10, H-05 |
| `W-ANCHOR` | Q5 | What the respondent already spends that this was compared against | a real rupee figure they named | H-07 |
| `W-DEPLOY` | Q4 | Deployment constraint (on-premise / localisation / cloud) | constraint stated as fact, not preference | H-10 |

---

## Analysis rules

These exist so the analysis is reproducible rather than anecdotal.

- One interview is an anecdote. No code may be reported as a finding until it appears in at least 3 of 6 institutions, and the count of institutions is always printed beside it.
- A claim that contradicts Phase 1 or 3A is recorded as a contradiction, never silently dropped. Phase 1's corpus is evidence too.
- Paired interviews are compared on the same four questions: does the Registrar's picture match the Convener's, on venture count, on who owns the data, and on what was last paid for.
- Silence is recorded. If a respondent cannot answer a question, that is a coded non-answer and counts toward the finding - an institution that cannot name its own budget head is the finding.
- Quotes are verbatim only, with the recording checked. No paraphrase is ever placed in quotation marks.
- Every finding states which hypotheses it confirms, refutes, or leaves open. An interview that resolves nothing is still recorded, and still costs time - say so.

---

### The 3-of-6 bar, stated plainly

```
1 interview  -> an anecdote. Never reported as a finding.
2 interviews -> a lead. Investigate, do not conclude.
3 of 6       -> a finding. Publish it, with the count beside it.
4+ of 6      -> a pattern. It goes in the synthesis.
```

Every number printed anywhere must carry its denominator. *"Convener spends 3 days on the submission (3 of 6 institutions)"* — never *"Convener spends 3 days"*.
