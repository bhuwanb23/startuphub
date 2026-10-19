# Consent and Ethics

Built 2026-10-19 by `build/build_phase3b.py`.

---

## Read this verbatim, at the start, every time

Do not paraphrase. Do not trim. If the interview runs long, cut questions, never consent.

> This is a research interview about how your institution handles startup and innovation records. It is not a sales call and not a product demo.
> We will not share anything you tell us with other institutions, or name your institution in any external material without asking you first.
> We may quote you anonymously, attributed only to your role and institution type (for example 'a Convener at a central university'), unless you ask us not to.
> You may skip any question, or stop the interview at any point, with no consequence.
> We are recording notes and, with your permission, audio, purely so we do not misquote you.
> There is no payment. If you would like a summary of what we learn, we will send it.

---

## Handling what we collect

| Rule | Detail |
|---|---|
| **Attribution** | Default is anonymous with role + institution type ("a Convener at a central university"). Naming requires explicit written permission. |
| **Quotations** | Verbatim only, checked against the recording. No paraphrase ever appears inside quotation marks. |
| **Institutional naming** | A documented contradiction we already hold is already in a public PDF — but the *interview* is not. Do not connect a respondent's words to a named public document without permission. |
| **Screenshots** | Blank out every name, registration number and email before storing. |
| **Retention** | Notes and recordings stored locally, never in a third-party transcription service. |
| **Declining** | An institution can withdraw at any point, and everything derived from that interview is deleted on request. |

---

## Synthetic material is quarantined, permanently

Ollama may be used to check that these guides are answerable. Every synthetic artefact carries the marker **`SYNTHETIC — NOT EVIDENCE`** and is written only to `_exports/synthetic/`, which is excluded from the manifest.

Forbidden, without exception:

- any synthetic text entering _exports/ (except _exports/synthetic/, which is excluded from the manifest)
- any synthetic sentence being quoted as a respondent
- any synthetic count entering a finding, grade, or headline
- a synthetic answer being used to 'confirm' a hypothesis
- recording synthetic output with a parse_status of 'parsed'

The test is simple: **if a sentence could ever be mistaken for something a person said, it does not belong in the evidence layer.**
