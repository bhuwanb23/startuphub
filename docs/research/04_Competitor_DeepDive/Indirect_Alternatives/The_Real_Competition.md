# Indirect Alternatives — The Real Competition

**"If StartupHub didn't exist, what would the institution actually do?"**

The honest answer, in almost every case: **use Excel, WhatsApp and email — for free.** That is the incumbent StartupHub must beat, and it is not beaten on features.

---

## 1. Microsoft Excel / Google Sheets

**The default substrate.** Google Sheets is free at consumer tier; institutional deployments arrive bundled inside Google Workspace or Microsoft 365 licences the college already pays for.
🟢 Google Workspace Business Starter India ≈ **₹1,918–3,240 per user/yr** (₹160–270/mo) — but ₹0 marginal. `COMP-022`

### Why institutions land here
1. **Zero marginal cost.** Already paid for. No procurement, no new vendor, no budget line.
2. **Everyone already knows it.** No training cost.
3. **Total offline tolerance.** Works on campus Wi-Fi failures, low-end Android devices and power cuts. **This matters enormously in tier-2/3 Indian colleges.**
4. **It matches how the job is organised.** One IIC coordinator, one Nodal Officer, one Innovation Activity Coordinator — a handful of people who already think in rows and columns.

### Genuinely good at
Ad-hoc tracking of 20–200 records with irregular fields · fast one-off analysis · producing the annual submission artefact by hand.

### Hard limits

| Limit | Consequence in an HEI |
|---|---|
| **Version control** | One file, many editors. Silent overwrites. No merge semantics. No way to answer *"who changed the revenue figure and when?"* |
| **No permissions model** | Access = view/edit/link. Cannot express *"mentors see their own mentees; IIC sees all; HOD sees revenue only; students see nothing."* Sheet protection is not RBAC. |
| **No audit trail** | Revisions are cell-diffs, not attributable events. Impossible to evidence to an auditor or a funding agency. |
| **No relational integrity** | A startup appears in the Incubation sheet, the IPR sheet, the Awards sheet and the ARIIA sheet with no shared key. **Divergence is guaranteed.** |
| **Manual consolidation** | Department coordinators email spreadsheets to the IIC coordinator, who copy-pastes into a master file. Digitised duplicate entry — the exact anti-pattern ERPs sell against. |
| **No workflow** | No approval gates, no state machine, no SLA, no escalation. *"Pending"* is a text value, not a state. |
| **No automation** | Mentor session reminders are WhatsApp messages typed by hand. |
| **No AI, no integrations** | No API, no Zapier-equivalent, no OCR of patent certificates. |

### Evidence
Indian ERP vendors themselves market against this. MasterSoft lists *"Multiple Excel Sheets for Data Entry Resulting in Human Errors."* AskERP frames the *"Without AskERP"* baseline as *"Data Management: Scattered across spreadsheets and paper files"* and *"Reporting: Manual, hours-long report compilation."* DigiERP states: *"The departments still outside the system keep their own registers in the meantime, so you carry both the software cost and the duplicate work."* `COMP-026`

⚠️ Tier 4 — vendor marketing, not independent research. Use as sentiment.

---

## 2. WhatsApp + Google Drive — the hidden incumbent

**In Indian incubators the WhatsApp group *is* the operational database.**

### Evidence — direct and strong
- **IISc Innovation Council's own website:** *"IISc Students - **Join this Whatsapp group** for updates"* — linked from the official IIC student-coordinators page. **India's most research-intensive institution routes student coordination through WhatsApp.** `COMP-024`
- The MoE's IIC charter defines the IIC President's role as *"collect the inputs from all the members of the council at regular interval"* — a **consolidation job**, which is exactly what WhatsApp + a shared folder does by default. `COMP-025`
- VIT Vellore's IIC organises into student-led *Domains* (Startup, Industry Connect, Media) with named student coordinators — the operating unit is a person with a phone, not a record in a system.
- PSG Tech IIC publishes a *"Timeline and Track sheet"* as a static web artefact — a manual, document-centric record.

### Pricing
**₹0.** Consumer WhatsApp and Google Drive free tier.
⚠️ From **1 Oct 2026**, Meta began charging for Indian business messaging: Marketing **₹0.8631**/delivered message; Utility/Authentication/Service **₹0.115** after the first **1,000 free replies/month/number**. `COMP-023`

> **This is a small opening.** The Oct 2026 change removes free business-initiated nudges — weakening the free WhatsApp incumbent for institutions that were using it for mentor reminders. Relevant to any StartupHub messaging layer.

### Hard limits
**No structure** — a startup is a conversation thread, mentorship history is a wall of text · **No permissions** — everyone sees everything, *including commercially sensitive revenue and valuation figures about other startups in the same centre* · **No audit trail** — messages scroll away, files get replaced, there is no *"who granted this seed grant"* record · **No version control** · **No reporting** — you cannot generate an ARIIA submission from a WhatsApp group, so a **second manual spreadsheet-based reporting layer exists in parallel**, doubling the work · **Search is useless** — *"all startups with a filed patent but no revenue"* is unanswerable · **Data protection exposure** — student and founder phone numbers in a group chat, no consent trail, a live problem under the DPDP Act 2023.

---

## 3. Notion / Superhuman Docs (ex-Coda) / Airtable

The "good enough database" substitutes a digitally-motivated coordinator reaches for before any vendor conversation.

| | Real India cost at IIC scale (8 editors) |
|---|---|
| **Notion Plus** ($10/member/mo) | ≈ $960/yr ≈ **₹86k** |
| **Superhuman Docs Pro** ($12/Doc Maker/mo) | ≈ $288/yr ≈ **₹26k** |
| **Airtable Team** ($20/editor/mo) | ≈ $1,920/yr ≈ **₹1.73L** |

🔴 **All three sit inside or just below the ₹50k–5L band. This is the most dangerous pricing neighbourhood.** `COMP-017`, `COMP-018`, `COMP-019`

### What they lack for institutional use

| Missing | Why it blocks |
|---|---|
| **Audit log / activity log** | 🔴 **Notion:** *"The audit log feature is available to organization owners on the Enterprise Plan. If you upgrade to an Enterprise Plan, audit log events are recorded **starting from the time of upgrade**."* **No retroactive history.** Enterprise pricing is *"Contact Sales."* 🔴 **Superhuman Docs gates audit events, SCIM, SAML, SOC 2 Type 2 and HIPAA all at Enterprise.** `COMP-031` |
| **RBAC depth** | Field- and row-level permissions only at Business/Enterprise. Notion's roadmap lists *"Database row permissions (coming soon)"*. Permissions cannot express *"mentor sees own mentees"* cleanly at low tiers. |
| **Regulatory reporting output** | No pre-built MoE/DPIIT/ARIIA/NIDHI-PRAYAS submission formats. Every report is hand-built or hand-consulted. |
| **Relational integrity** | Notion *"does not enforce referential integrity"*. **Relations export to CSV as plain URLs and cannot be re-imported to restore relations** — a real data-portability trap. |
| **Scale** | Notion databases slow past ~1,000 rows. |
| **Offline** | Notion's own roadmap lists offline mode as its *"#1 most requested feature."* Kills adoption in low-connectivity campuses. |
| **Compliance** | No DPDP Act 2023 posture, no Indian data-residency commitment, no Government of India procurement track record. |

### Verified complaints
- **Notion performance:** *"Users with hundreds of pages or complex database relations report workspaces becoming unusable."* Notion's own docs confirm *"overloaded databases are responsible for 70% of performance complaints."*
- **Notion learning curve:** *"Building systems with databases, relations, rollups, and linked views requires conceptual understanding that takes 1–2 weeks of active use."*
- **Airtable quota walls:** Team caps at 25,000 automation runs and 100,000 API calls/month; Free cannot use *"Run a script"*.
- **Airtable publishes contradictory limits:** Business records 100,000 on the pricing card vs 125,000 in the help centre.
- **Superhuman Docs instability:** *"Renamed twice in under two years… Headline AI features and Business databases are labelled Beta… Pro to Business is a 2.75× price jump per Doc Maker."*
- **Maker-billing pain:** *"The 'maker billing' pricing model… can lead to higher costs for organizations with numerous content creators."*

### 🔴 The decisive gap
**Institutions need retroactive audit trails for accreditation and grant audits.** Notion explicitly cannot provide history before upgrade. Superhuman Docs gates audit events entirely behind Enterprise. Airtable puts them on Enterprise Scale.

**This is a structural barrier, not a feature gap — and it is cheap to compete on.** → `Decision_Log` `D-008`

---

## 4. Project management tools — Trello / ClickUp / Monday / Asana

| At 10 users | Per year |
|---|---|
| Trello Standard $5/user/mo | **₹54k** |
| ClickUp Unlimited $7/user/mo | **₹76k** |
| Monday Basic $9/seat/mo | **₹97k** |
| Asana Starter $10.99/user/mo | **₹1.19L** |

`COMP-020` · **Trello at ₹54k/yr is the floor StartupHub cannot undercut.**

### Hard limits
**No domain model** — a startup is a card; no first-class entity for startup/mentor/patent/milestone/funding round with relationships · **No intake/application workflow** — no multi-stage review, scoring rubrics, reviewer assignment, conflict-of-interest declaration, blind review · **No IPR module** · **No milestone/outcome tracking** — cannot answer *"of 200 registered startups, how many became revenue-generating?"* · **No funder reporting** · 🔴 **Audit logs Enterprise-only** (Asana explicitly; Trello Enterprise is $17.50/user/mo) · **Per-seat tax on mentors and students** — a 200-student innovation cell on Asana Starter is ~$26k/yr, instantly uneconomic vs a flat institutional price.

⚠️ **AI pricing is a real cost trap:** ClickUp Brain AI $9/user/mo; Everything AI $28/user/mo. Monday AI is credit-metered with credits sold on top.

---

## 5. Campus ERP / Student Information Systems

### ⚠️ The finding: zero Indian campus ERP vendors have a startup-incubation module

| Vendor | Innovation/startup module? |
|---|---|
| Teachmint | ❌ Admissions, attendance, exams, fees |
| Academia ERP | ❌ |
| Instita ERP | ❌ |
| MasterSoft (iITMS) | ❌ Placement, Accreditation, LMS — no incubation |
| **AskERP** | ⚠️ **Closest** — "Research & Publications — publication tracker, **grant management**, H-index, patents". Still no startup portfolio, IIC workflow, mentorship or incubation |
| DigiERP | ❌ |
| OnCampusERP | ❌ — but claims *"19 modules"* incl. *"NAAC SSR Auto-Generation… NIRF ranking data, AISHE submissions"* |
| EduplusCampus | ⚠️ Has *"Accreditation Reporting (NAAC/NBA/NIRF)"* — **no incubation/startup module** |

🔴 **`COMP-021`**

### 🔴 The per-student tax — the strategic insight
The dominant Indian model is **per-student, per-year**. EducateSync's analysis:
> *"Say an ERP charges ₹30 per student per year… 300 students ₹9,000/yr; 800 students ₹24,000/yr; 1,500 students ₹45,000/yr. **Nothing about the software changed. The school just grew… Worse, the increase lands every April**"*

> **An Indian institution's instinct is to distrust any vendor whose price scales with its success.** The per-student ERP model trains them to see it that way. **A flat institutional price is genuinely differentiated** — but it must be *defensible*, not just cheap.

### The real risk is channel, not product
They compete for the **compliance** budget (NAAC/NBA/NIRF/AISHE), not the innovation budget — but **they own the relationship, the data, and the procurement precedent.** A Phase 19 question: is StartupHub a partner, a competitor, or a module they'd resell? → `OQ-17`

**Adjacent player worth watching:** **Jaraka / Habbinson International (Pune)** — sells *"Institutional Excellence & IIC"* as a module alongside "Habbinson ERP" (21 modules, 5 role-based logins). Claims *"80% of Pune's leading institutes"*. **Consultancy + ERP bundling, not startup-management SaaS.** Its homepage CTA is literally *"Chat on WhatsApp"* — a Pune edtech vendor's primary conversion channel.

---

## 6. Email + Word/PDF — the mandatory reporting channel

**₹0 marginal.** Every IIC must file to MoE's Innovation Cell via the portal; NIDHI-TBI/CoE institutions must file utilisation and action-plan reports to DST; ARIIA submissions are data-heavy.

### Documented burden
**NIDHI umbrella** spans 8+ schemes with a network of ~100 STEPs/TBIs, requiring separate bank accounts, bond execution, interest reporting, **PFMS/CGA registration**, and refund of unspent balances to the Consolidated Fund of India.

**DST penalises underperformance explicitly:** proposals are evaluated on *"inability to get adequate number of incubatee, frequent leaving of incubatee, inability to meet targets"* — a revised action plan must be sent to DST.

**ARIIA submissions are spreadsheets.** Published IIT Mandi and IMS UC ARIIA documents are PDF renders of tabular data — venture name, CIN/LLP/OPC number, GST number, FY of establishment, DPIIT recognition flag, technology-licensing table with literal *"No Data Found"* rows, expenditure in rupees, mentor names and phone numbers.

### Hard limits
**No calculation** — every figure manually keyed in and reconciled against a separate internal sheet · **No lineage** — if a number is wrong, there is no way to trace which mentor or spreadsheet cell produced it · **Binary re-entry** — the same data typed into the internal tracker *and* the government portal, every submission a fresh re-key · **Month-end spike** — reporting consumes the nodal officer's entire bandwidth in a narrow window, exactly when mentoring and incubation get neglected.

### 🔴 The pitch implication
India's Reducing Compliance Burden debate records: *"a typical firm has to navigate around 1,500 Acts which collectively impose 69,233 separate compliances and 6,618 independent filings"* (`COMP-028`).

> **Institutions are compliance-saturated. A tool that reads as "more compliance" is dead on arrival. A tool that *reduces* re-keying has a strong pitch.** → `Decision_Log` `D-007`

---

## 7. Custom-built internal portals / Google Sites / WordPress

**Very common.** Almost every IIC site researched — VIT Pune, VIT Vellore, IISc, MGIT, ITM University, PSG Tech, OPJU — is a **hand-built static site** with a Gallery, Calendar and Policy Documents page and no functional database.

**Why so common:** the IIC charter itself asks each institution to *"Create an Institution's Innovation portal to highlight innovative projects"* — **a formal MoE/AICTE requirement.** `COMP-025`

OPJU's Innovation Hub does have a *"Portfolio Showcase"* of ~10 startups — but a manually curated marketing page, not a searchable record.

### Hard limits
No records, no workflow, no permissions, no forms beyond a contact form, no data ownership, no reporting export. **Rots within 6–18 months** as the person who built it graduates or is transferred. Free tiers break quietly — Google Sites' per-domain limits mean institutions routinely hit the cap and abandon the site. **Zero institutional memory.**

---

## 8. 🔴 Synthesis — the real cost and the real switching barrier

### The incumbent's honest cost

| Cost dimension | Excel/Sheets | WhatsApp + Drive | Notion/Airtable | Real money |
|---|---|---|---|---|
| **Licence** | ₹0 | ₹0 | ₹26k–1.9L/yr | ₹75k–5L/yr |
| **Migration of historical data** | Manual re-key | Irretrievable | Manual re-key | Real switching cost |
| **Coordinator time / month** | ~20–40 hrs consolidating | ~15–30 hrs chasing | ~10–20 hrs | **→ 2–6 hrs** |
| **Reporting cycle spike** | Full month-end blackout | Cannot report at all | Ad-hoc | **→ hours, not days** |
| **Failure modes** | Silent overwrites, lost rows | Lost threads, exit attrition | Quota walls, no audit | **Audit trail exists** |
| **Risk if the officer leaves** | Knowledge loss | **Total loss** | Some loss | **Documented handover** |

> **The comparison that matters:** StartupHub is not competing against ₹0 on price. It is competing against a **hidden ₹4–8 lakh/year in nodal-officer labour and lost incubation bandwidth**, plus the reputational risk of an inaccurate ARIIA or NIDHI filing. At ₹2–3 lakh/year, the ROI argument is **labour substitution, not features.**

### The switching barrier is real — and it is a barrier to StartupHub, not to the incumbent

1. **Data is already split across systems.** ARIIA data in one file, mentorship in a WhatsApp group, IPR in a register, startup names in a Word doc. **Nobody has a clean migration because there is no clean source.** This is the single biggest obstacle — and the single biggest discovery opportunity in a pilot.
2. **Habit and cost-aversion.** The coordinator's default answer is *"put it in a Google Sheet."*
3. **Fear of the government form.** Institutions are compliance-saturated; a tool that resembles another mandatory portal is resisted. A tool that says *"your ARIIA data is already here"* is not.
4. **Free-tier anchoring.** Trello at ₹54k/yr for 10 users is dangerously close to our floor. **We cannot compete on being cheap** — we must compete on being the only thing that produces a compliant submission.
5. **Single-buyer dynamics.** The decision maker is one nodal officer with no budget line of their own. **StartupHub must attach to an existing budget head** — the IIC grant, the NIDHI grant, or an Atal Lab. → `D-007`