<task id="ses_eb0068e91ffeV2ZgSJoMutYv4w" state="completed">
<task_result>
# Competitive Research: Indirect Alternatives & Global Competitors
**StartupHub — Indian institutional innovation/startup management platform**
**Research date: 18 October 2026.** All sources accessed 18 Oct 2026 unless the page carried its own publication date.
**FX assumption for indicative conversions: USD ≈ ₹90, GBP ≈ ₹135.** Treat all ₹ conversions as directional only.

---

# PART 1 — INDIRECT ALTERNATIVES
*"If StartupHub didn't exist, what would they actually do?"*

---

## 1. Microsoft Excel / Google Sheets

### What it is
The default substrate for tracking startups, IPR filings, mentorship hours, hackathon registrations and incubator progress in almost every Indian HEI. Google Sheets is free at consumer tier; institutional deployments usually arrive bundled inside Google Workspace or Microsoft 365 licences the college already pays for.

### Real pricing
| Item | Price | Source |
|---|---|---|
| Google Sheets (consumer) | ₹0 | [workspace.google.com/intl/en_in/pricing.html](https://workspace.google.com/intl/en_in/pricing.html) |
| Workspace Business Starter (India, via reseller, annual) | ₹1,917.80–₹3,240 /user/yr (~₹160–270/mo) | [wesetup.in/google-workspace-pricing-india.html](https://wesetup.in/google-workspace-pricing-india.html); [netspaceindia.com/email-solutions/google-workspace-pricing](https://www.netspaceindia.com/email-solutions/google-workspace-pricing) |
| Workspace Business Starter (official, USD, annual) | $7/user/mo ($8.40 flexible) | [knowledge.workspace.google.com/admin/getting-started/editions/business-editions](https://knowledge.workspace.google.com/admin/getting-started/editions/business-editions) |
| Microsoft 365 / Excel | ⚠️ **Not verified in this research** — bundled in M365 licensing; flag for follow-up | — |

### Why institutions land here
1. **Zero marginal cost.** Already paid for. No new procurement, no new vendor, no budget line.
2. **Everyone already knows it.** Faculty, IIC convenors, student coordinators — no training cost.
3. **Total offline tolerance.** Works on campus Wi-Fi failures, low-end Android devices, and during power cuts. This matters enormously in tier-2/3 Indian colleges.
4. **It matches how the job is actually organised.** One IIC coordinator, one Nodal Officer, one Innovation Activity Coordinator — a handful of people who already think in rows and columns.

### Genuinely good at
- Ad-hoc tracking of 20–200 records with irregular fields.
- Fast one-off analysis the coordinator needs once (e.g. "how many startups have revenue > ₹50L?").
- Producing the annual submission artefact by hand.

### Hard limits for institutional startup/innovation management
| Limit | Consequence in an HEI |
|---|---|
| **Version control** | One file, many editors. Silent overwrites. No merge semantics. No way to answer "who changed the revenue figure and when?" |
| **No permissions model** | Access = view/edit/link. Cannot express "mentors see their own mentees; IIC sees all; HOD sees revenue only; students see nothing." Sheet protection is not RBAC. |
| **No audit trail** | Revisions exist but are cell-diffs, not attributable events. Impossible to evidence to an auditor or to a funding agency. |
| **No relational integrity** | A startup appears in the "Incubation" sheet, the "IPR" sheet, the "Awards" sheet and the "ARIIA" sheet with no shared key. Divergence is guaranteed. |
| **Manual consolidation** | Department coordinators email spreadsheets to the IIC coordinator, who copy-pastes into a master file. Digitised duplicate entry — the exact anti-pattern ERPs sell against. |
| **No workflow** | No approval gates, no state machine, no SLA, no escalation. "Pending" is a text value, not a state. |
| **No notifications/automation** | Mentor session reminders are WhatsApp messages typed by hand. |
| **No AI, no integrations** | No API, no Zapier-equivalent, no document extraction, no OCR of patent certificates. |

### Verified complaints / evidence
- **Indian ERP vendors themselves market against this.** MasterSoft (iitms.co.in) lists as an institutional pain point: *"Multiple Excel Sheets for Data Entry Resulting in Human Errors."* ([iitms.co.in/products/erp-campus-solutions](https://www.iitms.co.in/products/erp-campus-solutions)). AskERP frames the "Without AskERP" baseline as *"Data Management: Scattered across spreadsheets and paper files"* and *"Reporting: Manual, hours-long report compilation"* ([askerp.in/industry-colleges](https://www.askerp.in/industry-colleges)).
- **Dual-tracking is openly admitted as normal.** DigiERP's own pricing page states: *"The departments still outside the system keep their own registers in the meantime, so you carry both the software cost and the duplicate work"* ([digierp.in/education-erp-software-pricing-india](https://www.digierp.in/education-erp-software-pricing-india)).
- **Generic technical complaint.** Spreadsheets lack data validation, relationships and usable change attribution: *"No data validation… No relationships… Version history exists but is impractical for tracking individual cell changes across thousands of rows"* ([soft-amis.com, 17 Mar 2026](https://www.soft-amis.com/blog/2026-03-17-spreadsheet-alternatives-structured-data)).

---

## 2. Notion / Coda (now Superhuman Docs) / Airtable

The "good enough database" substitutes. These are the tools a digitally-motivated IIC coordinator or a young Nodal Officer reaches for before any vendor conversation.

### Pricing (verified)

| Product | Plans | Audit log? | Notes |
|---|---|---|---|
| **Notion** | Free / Plus **$10** / Business **$20** per member/mo / Enterprise custom | ❌ **Enterprise only** | Notion AI *included* only on Business. Source: [notion.com/pricing](https://www.notion.com/pricing) |
| **Superhuman Docs** (ex-Coda) | Free / Pro **$12** per *Doc Maker* ($15 monthly) / Business **$33** ($40 monthly) / Enterprise custom | ❌ Enterprise only (+ SOC 2 Type 2, HIPAA, SCIM, SAML all Enterprise) | **Editors and Viewers are free** — only Doc Makers are billed. Source: [coda.io/pricing](https://www.coda.io/pricing); rebrand confirmed at [digijaws.com/reviews/coda-review](https://digijaws.com/reviews/coda-review/) (1 Oct 2026) |
| **Airtable** | Free / Team **$20** ($24 monthly) / Business **$45** ($54 monthly) / Enterprise Scale custom | Enterprise Scale only (SSO on Business) | Per **editor** seat, not per user. Records/base: 1k / 50k / 125k* / 500k. Automation runs capped at 100 / 25,000 / 100,000. Source: [airtable.com/pricing](http://airtable.com/pricing); [superdupr.com](https://superdupr.com/blog/airtable-pricing) (9 Oct 2026) |

\* Airtable's own pricing page card says 100,000 for Business; its help-centre plans overview says 125,000. Airtable publishes inconsistent numbers.

**Real India cost at typical IIC scale (8 editors):**
- Notion Plus: ~$960/yr ≈ ₹86k
- Superhuman Docs Pro, 2 Doc Makers: ~$288/yr ≈ ₹26k
- Airtable Team, 8 editors: ~$1,920/yr ≈ ₹1.73 lakh

All three sit **inside or just below StartupHub's ₹50k–5L band.** This is the most dangerous pricing neighbourhood.

### Coda/Superhuman Docs rebrand — important competitive intel
Grammarly acquired Coda in **December 2024**; renamed itself Superhuman in **October 2025**; completed the product rebrand on **8 July 2026**. `coda.io/pricing` now redirects to `superhuman.com/plans/docs` ([digijaws.com/reviews/coda-review](https://digijaws.com/reviews/coda-review/), 1 Oct 2026). A direct competitor renamed twice in 20 months, with roadmap attention split across three sibling products.

### What these genuinely lack for institutional use
| Missing | Why it blocks HEI use |
|---|---|
| **Audit log / activity log** | Notion: *"The audit log feature is available to organization owners on the Enterprise Plan. If you upgrade to an Enterprise Plan, audit log events are recorded starting from the time of upgrade."* ([notion.com/help/audit-log](https://www.notion.com/help/audit-log)) — no retroactive history. Enterprise pricing is "Contact Sales". **Superhuman Docs gates audit events, SCIM, SAML, SOC 2 Type 2 and HIPAA all at Enterprise.** |
| **RBAC depth** | Field-level and row-level permissions only at Business/Enterprise. Notion's own roadmap lists *"Database row permissions (coming soon)"* with *"#1 most requested feature is offline mode"* ([notion.com/releases/2025-07-10](https://www.notion.com/releases/2025-07-10)) — as of that release. Notion permissions cannot express "mentor sees own mentees" cleanly at low tiers. |
| **Regulatory reporting output** | No pre-built MoE/DPIIT/ARIIA/NIDHI-PRAYAS submission formats. Every report is hand-built or hand-consulted. |
| **Relational integrity** | Notion *"does not enforce referential integrity"* ([tech-insider.org, 12 Apr 2026](https://tech-insider.org/airtable-vs-notion-2026)). Relations export to CSV as plain URLs and cannot be re-imported to restore relations ([notion.com/help/relations-and-rollups](https://www.notion.com/help/relations-and-rollups)) — a real data-portability trap. |
| **Scale** | Notion databases slow past ~1,000 rows ([getgrist.com/lookup/grist-vs-notion](https://www.getgrist.com/lookup/grist-vs-notion), 11 Jun 2025); large databases load noticeably slower than Airtable ([soft-amis.com](https://www.soft-amis.com/blog/2026-03-17-spreadsheet-alternatives-structured-data)). |
| **Offline** | No offline mode. Kills adoption in low-connectivity campuses. |
| **Compliance** | No DPDP Act 2023 posture, no Indian data-residency commitment, no Government of India procurement track record. |
| **AI** | Notion AI is a trial on Free/Plus; you must reach Business ($20/member) for daily AI. Airtable's AI credits are bundled but the automation-run ceiling bites first. |

### Verified complaints
- **Notion database performance:** *"Users with hundreds of pages or complex database relations report workspaces becoming unusable. Notion's own help documentation confirms the structural issue: overloaded databases are responsible for 70% of performance complaints"* ([retentioncheck.com/blog/notion-churn-analysis](https://retentioncheck.com/blog/notion-churn-analysis)).
- **Notion learning curve:** *"Building systems with databases, relations, rollups, and linked views requires conceptual understanding that takes 1–2 weeks of active use"* ([saasmaste.com/reviews/notion-review](https://saasmaste.com/reviews/notion-review), 24 Apr 2026).
- **Airtable quota walls:** Team caps at 25,000 automation runs and 100,000 API calls per workspace per month; Free plan cannot use the "Run a script" automation action; Business/Enterprise require a company email domain (Gmail/Yahoo cannot upgrade) ([superdupr.com](https://superdupr.com/blog/airtable-pricing)).
- **Airtable publishes contradictory limits:** Business record limit listed as 100,000 on the pricing card vs 125,000 in the help centre; Enterprise automation runs listed as 1,000,000 vs 500,000 in the automations guide ([superdupr.com](https://superdupr.com/blog/airtable-pricing); [saascompared.com](https://saascompared.com/blog/airtable-pricing-2026-explained), both 9 Oct 2026).
- **Superhuman Docs instability:** *"Renamed twice in under two years… Headline AI features and Business databases are labelled Beta… Pro to Business is a 2.75× price jump per Doc Maker… Competes for roadmap attention with three sibling products in one suite"* ([digijaws.com/reviews/coda-review](https://digijaws.com/reviews/coda-review/)).
- **Maker-billing pain:** *"The 'maker billing' pricing model… can lead to higher costs for organizations with numerous content creators"* and *"performance slowdowns with massive datasets"* ([invgate.com/itdb/coda-enterprise](https://invgate.com/itdb/coda-enterprise)).

---

## 3. Trello / Asana / Monday.com / ClickUp

### Pricing (verified)

| Tool | Free | Entry paid | Mid | Top self-serve | Enterprise |
|---|---|---|---|---|---|
| **Trello** (Atlassian) | $0, 10 collaborators, 10 boards | Standard **$5**/user/mo annual ($6 monthly) | Premium **$10**/user/mo annual ($12.50) | — | **$17.50**/user/mo annual ($210/yr/user) |
| **Asana** | Personal, 2 users | Starter **$10.99**/user/mo | Advanced **$24.99**/user/mo | — | custom (SAML/SCIM/**Audit Logs** = Enterprise) |
| **Monday.com** | $0, 2 seats, 3 boards | Basic **$9**/seat/mo | Standard **$12**/seat/mo | Pro **$19**/seat/mo | custom (>40 users → quote) |
| **ClickUp** | Free Forever, unlimited users, 60 MB | Unlimited **$7**/user/mo | Business **$12**/user/mo | — | custom |

Sources: [clickup.com/compare/asana-vs-clickup](https://clickup.com/compare/asana-vs-clickup) (prices checked 28 Sep 2026); [monday.com/pricing](https://monday.com/marketing/pricing); [monday.com/blog/project-management/trello-alternatives](https://monday.com/blog/project-management/trello-alternatives); [clickup.com/blog/clickup-vs-trello](https://clickup.com/blog/clickup-vs-trello/) (13 Oct 2026).

**AI pricing (a real cost trap):** ClickUp Brain AI **$9/user/mo**; Everything AI **$28/user/mo**. Monday AI is credit-metered (1,000–3,000 credits/month by tier, credits sold on top). Asana bundles AI into paid plans but caps Starter at 5 requests/user/month.

**India cost at 10 users:**
- Trello Standard: ~$600/yr ≈ **₹54k** — at the very bottom of StartupHub's band
- ClickUp Unlimited: ~$840/yr ≈ **₹76k**
- Monday Basic: ~$1,080/yr ≈ **₹97k**
- Asana Starter: ~$1,319/yr ≈ **₹1.19L**

### Genuinely good at
Task tracking, deadlines, reminders, Kanban/Gantt/timeline views, dashboards, Slack/Teams integration. Trello in particular is excellent for a single hackathon or a single cohort's weekly tasks at near-zero cost.

### Hard limits for institutional startup/innovation management
- **No domain model.** A "startup" is a card. There is no first-class entity for a startup, mentor, patent, milestone, or funding round with relationships between them. Everything must be faked with labels, checklists and card descriptions.
- **No intake/application workflow** out of the box — no multi-stage review, scoring rubrics, reviewer assignment, conflict-of-interest declaration, blind review, or admission decision.
- **No IPR module.** No invention disclosure, no patent filing status, no prior-art hook, no inventor assignment tracking.
- **No milestone/outcome tracking.** Cannot answer "of 200 registered startups, how many became revenue-generating?" — only "how many cards are done?"
- **No funder reporting.** No ARIIA/NAAC/NIDHI-PRAYAS/DPIIT export, no MoE calendar reporting.
- **Audit logs are Enterprise-only** (Asana explicitly; Trello's Enterprise is $17.50/user/mo).
- **Per-seat tax on mentors and students.** A 200-student innovation cell on Asana Starter is ~$26k/yr — instantly uneconomic vs StartupHub's flat band.
- **Weak/low-cost tier caps.** ClickUp Free = 60 MB storage. Monday Free = 3 boards.
- **No India compliance, no data residency, no GST invoicing.**

---

## 4. Campus ERP / SIS used in Indian colleges

### Do any have innovation/startup modules? — **Essentially no.**

| Vendor | Country | Positioning | Innovation/startup module? | Pricing |
|---|---|---|---|---|
| **Teachmint** | India | K-12 + college, AI classroom tech | ❌ None. Admissions, attendance, exams, fees, ID cards. | Starts ~$5/user/yr ([softwarefinder.com/lms/teachmint](https://softwarefinder.com/lms/teachmint), Apr 2026); category avg ~$9/mo ([saasworthy.com](https://www.saasworthy.com/product/teachmint/pricing)) |
| **Academia ERP** | India (Indore, 2009, ~191 staff) | Cloud ERP for HEI | ❌ None | Not public ([tracxn.com](https://platform.tracxn.com/a/d/company/55115146e4b075e8945e38e7/academia%20erp?utm_source=parallel&utm_medium=ai#a:about)) |
| **Instita ERP** | India | Degree & autonomous colleges | ❌ Admissions, CIE, exams, finance | Not public ([instita.in/solutions/colleges](https://instita.in/solutions/colleges)) |
| **MasterSoft (iITMS)** | India | 30+ module campus ERP | ❌ Placement, Accreditation, LMS. No incubation. | Not public ([iitms.co.in](https://www.iitms.co.in/products/erp-campus-solutions)) |
| **AskERP** | India | 200+ institutions, 1M+ students | ⚠️ **Closest thing found**: "Research & Publications — publication tracker, **grant management**, H-index, patents". Still **no startup portfolio, no IIC workflow, no mentorship, no incubation** | Not public ([askerp.in/industry-colleges](https://www.askerp.in/industry-colleges)) |
| **DigiERP** | India | 18 modules, flat AMC | ❌ None. "All modules" = academics/finance/hostel | Flat annual AMC, quote-only. Claims unlimited students/staff/parents, no per-student billing ([digierp.in/pricing](https://digierp.in/pricing)) |
| **OnCampusERP** | India (Mumbai) | AI ERP | ❌ None. Notably runs a "**Edu-Startup Launchpad**" for *newly founded institutions* (<3 years) — that's for colleges, not for startups. | ₹1 Lakh credits + free setup for eligible new institutes ([oncampuserp.com/programs/edu-startup-launchpad](https://www.oncampuserp.com/programs/edu-startup-launchpad)) |
| **Optimus / eCampus / Zoops** | India | ⚠️ **Could not verify current state, pricing or module lists.** eCampus ERP (ecampuss.in) = K-12, founded 2022, Haryana. Zoops and Optimus not verified in this research — **flag for follow-up** | — | — |
| **CollegeSAAS, College ERP (collegesoftware.in), Institute Management System (imscloud.co.in)** | India | **DEADPOOLED** per Tracxn | — | — |

### The ERP pricing trap in India — documented
The dominant Indian model is **per-student, per-year**. EducateSync's analysis: *"Say an ERP charges ₹30 per student per year… 300 students ₹9,000/yr; 800 students ₹24,000/yr; 1,500 students ₹45,000/yr. Nothing about the software changed. The school just grew… Worse, the increase lands every April"* ([educatesync.com/blog/affordable-school-erp-india](https://www.educatesync.com/blog/affordable-school-erp-india), 6 Sep 2026).

**Strategic implication:** An Indian college's instinct is to distrust any vendor whose price scales with its success. A flat ₹50k–5L band is genuinely differentiated against this backdrop.

### Verified complaints about Indian ERPs
- Teachmint reviewer: *"While each feature is commendable customization becomes necessary for operating larger institutions"* ([softwarefinder.com/lms/teachmint/reviews](https://softwarefinder.com/lms/teachmint/reviews)).

### Adjacent Indian player worth watching
**Jaraka / Habbinson International (Pune)** — sells *"Institutional Excellence & IIC"* as a module alongside "Habbinson ERP" (21 modules, 5 role-based logins) and Habbinson Placement. Claims *"80% of Pune's leading institutes"*, 20+ partner institutions ([jaraka.com](https://jaraka.com/)). This is **consultancy + ERP bundling**, not a startup-management SaaS, and no public pricing. **Flag as the nearest Indian adjacency, not a direct competitor.**

---

## 5. WhatsApp groups + Google Drive shared folders — the real hidden incumbent

### Evidence of institutional coordination happening there — **direct and strong**

- **IISc Innovation Council's own website, verbatim:** *"IISc Students - **Join this Whatsapp group** for updates"* — linked from the official IIC student-coordinators page ([iic.iisc.ac.in/student-coordinators](https://iic.iisc.ac.in/student-coordinators), accessed 18 Oct 2026). India's most research-intensive institution routes student coordination through WhatsApp.
- The MoE's own IIC framework defines the role of the IIC President as: *"He/ She will coordinate with MHRD innovation cell… collect the inputs from all the members of the council at regular interval, especially external members"* ([dayanandasagar.edu IIC charter PDF](https://www.dayanandasagar.edu/dsit/images/pdf/IICa.pdf)). This is a **coordination-and-consolidation job** — exactly the job WhatsApp + a shared folder performs by default.
- **VIT Vellore's IIC** organises into student-led *Domains* (Startup, Industry Connect, Media) with named student coordinators — the operating unit is a person with a phone, not a record in a system ([innovations.vit.ac.in/innovations/iic.html](https://innovations.vit.ac.in/innovations/iic.html)).
- **PSG Tech IIC** publishes *"Timeline and Track sheet"* as a static web artefact, plus a separate "IIC Data" page — indicative of a manual, document-centric record ([psgtech.edu/IIC](https://www.psgtech.edu/IIC/)).
- **IIT Mandi / IMS UC / SSN** publish ARIIA submissions as **PDF exports of spreadsheet-shaped tables**, full of blank cells and literal *"No Data Found"* entries (see §6). ([iitmandi.ac.in/administration/files/ARIIA2021-22.pdf](https://iitmandi.ac.in/administration/files/ARIIA2021-22.pdf); [imsuc.ac.in/admin/uploads/ARIIA_2021_Report.pdf](https://www.imsuc.ac.in/admin/uploads/ARIIA_2021_Report.pdf); [ssn.edu.in ARIIA Full Data Report](https://www.ssn.edu.in/wp-content/uploads/2025/05/ARIIA-_-2022-Updated-Report_compressed.pdf))
- **Jaraka's homepage CTA is literally "Chat on WhatsApp"** — a Pune edtech vendor's primary conversion channel is WhatsApp ([jaraka.com](https://jaraka.com/)).

### Pricing
- **Consumer WhatsApp / Google Drive: ₹0.** This is the incumbent's full price.
- **WhatsApp Business Platform in India (from 1 Oct 2026):** Marketing **₹0.8631**/delivered message; Utility **₹0.115**; Authentication **₹0.115**; Service **₹0.115** after the first **1,000 free service replies/month/number**. Meta began charging for utility messages inside the 24-hour window from 1 Oct 2026 ([business-standard.com, 1 Oct 2026](https://www.business-standard.com/world-news/whatsapp-business-pricing-changes-from-today-what-indian-firms-should-know-126100100165_1.html); [indiatoday.in, 29 Sep 2026](https://www.indiatoday.in/technology/news/story/business-whatsapp-messages-to-cost-more-from-october-1-in-india-pricing-revised-3005605-2026-09-29); [whatsappbusiness.com/products/platform-pricing](https://whatsappbusiness.com/products/platform-pricing/)).
  - **Note the strategic shift:** Meta's Oct 2026 change removes free utility/service messaging inside the care window. This *weakens* the free-WhatsApp incumbent for institutions that were using business-initiated nudges for mentor reminders. Relevant to StartupHub's messaging layer.

### Why institutions land here
Zero cost, zero procurement, near-universal penetration, works on ₹7,000 Android phones, students and mentors are *already* there, and the institution's nodal officer is a 30-year-old who lives in WhatsApp. Google Drive free tier gives shared folders with basic sharing permissions.

### Hard limits
- **No structure.** A startup is a conversation thread. Mentorship history is a wall of text. Nothing is queryable, nothing is aggregable.
- **No permissions.** Everyone in the group sees everything — including commercially sensitive revenue and valuation figures about *other* startups in the same incubation centre.
- **No audit trail.** Messages scroll away. Files get replaced. There is no "who granted this seed grant" record.
- **No version control.** Two coordinators maintain two competing files; Drive's version history is per-file and unstructured.
- **No reporting.** You cannot generate an ARIIA submission, a MoE calendar report, or a funder dashboard from a WhatsApp group. So a second, manual, spreadsheet-based reporting layer exists *in parallel* — doubling the work.
- **Search is useless.** WhatsApp search does not index by field. "All startups with a filed patent but no revenue" is unanswerable.
- **No offline/archival guarantees.** Group media is time-limited and lost when members leave.
- **Data protection exposure.** Student/founder phone numbers and personal data in a group chat, with no consent trail — a live problem under the DPDP Act 2023.

---

## 6. Email + Word/PDF for reporting to MoE / DPIIT

### What it is
The **mandatory** reporting channel. Every IIC must file to the MoE's Innovation Cell via the prescribed portal; NIDHI-TBI/CoE institutions must file utilisation and action-plan reports to DST; ARIIA submissions are data-heavy. Let me capture the actual scale of this.

### Real pricing
₹0 marginal (already-paid Microsoft 365/Google Workspace + one nodal officer's salary time).

### Documented evidence of the burden
- **NIDHI umbrella programme** spans 8+ schemes (NIDHI-GCC, NIDHI-PRAYAS, NIDHI-EIR, Startup-NIDHI via IEDCs, NIDHI-TBI, NIDHI-Accelerator, NIDHI-SSS, NIDHI-CoE), with a network of ~100 STEPs/TBIs. Terms require separate bank accounts, bond execution, interest reporting, PFMS/CGA registration, and refund of unspent balances to the Consolidated Fund of India via NTRP/bharatkosh ([NIDHI CoE Guidelines PDF, DST](https://cdnbbsr.s3waas.gov.in/s312b1e42dc0746f22cf361267de07073f/uploads/2023/09/20230906543462663.pdf)).
- **NIDHI-PRAYAS:** max ₹10 lakh prototype grant per innovator, 10 innovators/centre/year, ₹1 crore/year for 5 years per Prayas Centre ([Documents-NIDHI-PRAYAS.pdf, ISTI](https://www.indiascienceandtechnology.gov.in/sites/all/themes/vigyan/images/Documents-NIDHI-PRAYAS.pdf)).
- **DST penalises underperformance explicitly:** proposals are evaluated on *"inability to get adequate number of incubatee, frequent leaving of incubatee, inability to meet targets"*; a revised action plan must be sent to DST.
- **ARIIA submissions are spreadsheets.** Published IIT Mandi and IMS UC ARIIA documents are PDF renders of tabular data — venture name, CIN/LLP/OPC registration number, GST number, FY of establishment, DPIIT recognition flag, technology-licensing table with *"No Data Found"* rows, expenditure in rupees, mentor names and phone numbers. ([iitmandi.ac.in](https://iitmandi.ac.in/administration/files/ARIIA2021-22.pdf); [imsuc.ac.in](https://www.imsuc.ac.in/admin/uploads/ARIIA_2021_Report.pdf); [ssn.edu.in](https://www.ssn.edu.in/wp-content/uploads/2025/05/ARIIA-_-2022-Updated-Report_compressed.pdf))

### Hard limits
- **No calculation.** Every figure (startup counts, IPR counts, revenue bands, fund utilisation) is manually keyed in and manually reconciled against a separate internal sheet.
- **No lineage.** If an underlying number is wrong, there is no way to trace which mentor, coordinator or spreadsheet cell produced it.
- **Binary re-entry.** The same data is typed into the internal tracker *and* the government portal. Every submission is a fresh re-key.
- **Month-end spike.** Reporting consumes the nodal officer's entire bandwidth in a narrow window, which is exactly when mentoring and incubation activity is neglected.
- **Contextual context for why institutions won't adopt more tooling:** India's Reducing Compliance Burden debate records that *"a typical firm has to navigate around 1,500 Acts which collectively impose 69,233 separate compliances and 6,618 independent filings"* (Standing Committee on Commerce report summary, 7 Aug 2026, [prsindia.org](https://prsindia.org/policy/report-summaries/doing-business-in-india-the-way-forward)). **Institutions are compliance-saturated. Any tool that reads as "more compliance" is dead on arrival; a tool that *reduces* re-keying has a strong pitch.**

---

## 7. Custom-built internal portals / Google Sites / WordPress

### What it is
Very common. A Google Sites or WordPress page for the IIC; occasionally a bespoke portal built by a campus IT team or a local student dev cell. Used for: publishing the IIC page, listing startups, posting event galleries.

### Real pricing
₹0 (Google Sites) to ₹1–5 lakh one-off (bespoke build, often student labour). Ongoing: hosting ~₹500–3,000/yr.

### Evidence of the pattern
- VIT Pune, VIT Vellore, IISc, MGIT, ITM University, PSG Tech, OPJU, VIT Pune — **almost every IIC site in this research is a hand-built static site** with a "Gallery", "Calendar", "Policy Documents" page and no functional database ([innovations.vit.ac.in](https://innovations.vit.ac.in/innovations/iic.html); [iic.iisc.ac.in/about-us](https://iic.iisc.ac.in/about-us/); [mgit.ac.in/iic](https://mgit.ac.in/iic); [innovation.opju.ac.in](https://innovation.opju.ac.in/); [www.vit.edu/institutions-innovation-council](https://www.vit.edu/institutions-innovation-council/)).
- OPJU's Innovation Hub does have a "**Portfolio Showcase**" of ~10 startups with names/sectors/links — but it is a manually curated marketing page, not a searchable record ([innovation.opju.ac.in](https://innovation.opju.ac.in/)).
- The IIC charter itself asks each institution to *"Create an Institution's Innovation portal to highlight innovative projects"* ([dayanandasagar.edu IIC charter PDF](https://www.dayanandasagar.edu/dsit/images/pdf/IICa.pdf)) — **this is a formal MoE/AICTE requirement**, which explains the ubiquity of hand-built portals.

### Hard limits
- No records, no workflow, no permissions, no forms beyond a contact form, no data ownership, no reporting export.
- **Rots within 6–18 months** as the person who built it graduates or is transferred.
- **Free tiers break quietly.** Google Sites' Sites-per-domain limits mean institutions routinely hit the cap and abandon the site.
- **Zero institutional memory.** Everything lives in a departed faculty member's head.

---

## 8. Free government portals — **cross-reference only**

Deliberately not duplicated here (other researchers are covering these). For cross-referencing only:

| Portal | Purpose | Relevance to StartupHub |
|---|---|---|
| **MoE Innovation Cell / IIC framework** | Mandates the IIC structure, roles (President, Convenor, Innovation Activity Coordinator, Startup Activity Coordinator, IPR Coordinator, Social Media Coordinator, ARIIA/NIRF Coordinators), and reporting cadence ([dayanandasagar.edu IIC charter](https://www.dayanandasagar.edu/dsit/images/pdf/IICa.pdf); [sowdambikaengg.edu.in/IIC.pdf](https://www.sowdambikaengg.edu.in/IIC.pdf)) | **Defines the roles StartupHub must serve.** These are the seats that would hold StartupHub licences. |
| **ARIIA (Atal Ranking of Institutions on Innovation Achievements)** | Ranking framework; institutions self-report via portal | **The strongest single demand driver** — ranking visibility creates budget |
| **NISP portal** | National Innovation & Startup Policy adoption registration | Compliance anchor |
| **YUKTI National Innovation Repository** | Where IIC-recommended ventures are recorded | StartupHub would be a system of record feeding this |
| **NIDHI-PRAYAS / NIDHI-TBI / NIDHI-CoE (DST)** | Grant programmes with utilisation + action-plan reporting | ₹10L/₹1Cr funding flows with manual reporting |
| **Startup India / DPIIT recognition** | Recognition, tax benefits | External system; StartupHub stores the recognition number |
| **KAPILA / SIH** | National hackathons; institutions must register and report participation ([IIT Mandi ARIIA](https://iitmandi.ac.in/administration/files/ARIIA2021-22.pdf)) | Hackathon participation reporting |

**The structural read:** every one of these portals is a **sink**, not a source. They demand data. None of them hold the institution's day-to-day record of startups, mentors, IPR and milestones. That gap is the entire StartupHub opportunity.

---

## SYNTHESIS — The real cost and switching barrier from free/cheap alternatives

### The honest cost of the incumbent

| Cost dimension | Excel/Sheets | WhatsApp + Drive | Notion/Airtable | Real money |
|---|---|---|---|---|
| **Licence** | ₹0 | ₹0 | ₹26k–1.9L/yr | ₹50k–5L/yr (StartupHub) |
| **Migration/historical data** | Manual re-key | Irretrievable | Manual re-key | Real switching cost |
| **Coordinator time/month** | ~20–40 hrs consolidating | ~15–30 hrs chasing | ~10–20 hrs | **→ 2–6 hrs** |
| **Reporting cycle spike** | Full month-end blackout | No reporting possible | Ad-hoc | **→ hours, not days** |
| **Failure modes** | Silent overwrites, lost rows | Lost threads, exit attrition | Quota walls, no audit | Audit trail exists |
| **Risk if the officer leaves** | Knowledge loss | Total loss | Some loss | Documented handover |

**The comparison that matters:** StartupHub is *not* competing against ₹0 on price. It is competing against a **hidden ₹4–8 lakh/year in nodal-officer labour and lost incubation bandwidth** — plus the reputational risk of an inaccurate ARIIA/NIDHI filing. At ₹2–3 lakh/year, the ROI argument is labour substitution, not features.

### The switching barrier is real, and it is a barrier to *StartupHub*, not to the incumbent

1. **Data is already split across systems.** ARIIA data in one file, mentorship in a WhatsApp group, IPR in a register, startup names on a Word doc. **Nobody has a clean migration because there is no clean source.** This is the single biggest obstacle — and also the single biggest discovery opportunity in a pilot.
2. **Habit and cost-aversion.** Coordinator's default answer is "put it in a Google Sheet."
3. **Fear of the government form.** Institutions are compliance-saturated; a tool that resembles another mandatory portal is resisted. A tool that says "your ARIIA data is already here" is not.
4. **Free tier anchoring.** Trello at ₹54k/yr for 10 users is dangerously close to StartupHub's floor. **StartupHub cannot compete on being cheap — it must compete on being the only thing that produces a compliant submission.**
5. **Single-buyer dynamics.** The decision maker is one nodal officer with no budget line of their own. The budget usually comes from the IIC grant, the NIDHI grant, or an Atal Lab. **StartupHub must attach to an existing budget head, not create a new one.**

---

# PART 2 — GLOBAL COMPETITORS

## A. Innovation Management (enterprise idea/innovation portfolios)

| Vendor | URL / Country | Target customer | Core pitch | Public pricing (18 Oct 2026) | Coverage vs StartupHub's 9 pillars |
|---|---|---|---|---|---|
| **HYPE Innovation** (owns former Planbox) | hypeinnovation.com · US | Large enterprises — idea management + initiative execution | "Business performance system" connecting idea capture to initiative delivery | Quote-only. **Planbox was acquired by HYPE Innovation in 2024** ([leadiq.com/c/planbox](https://leadiq.com/c/planbox/5a1d7e18240000240057dd95)); planbox.com now redirects to HYPE ([guideflow.com](https://www.guideflow.com/blog/workplace-innovation-platforms), 13 Oct 2026) | Portfolio ● / Intake ◐ / Mentorship ✗ / IPR ✗ / Resources ◐ / Milestones ◐ / Reporting ● / AI ● / Integrations ● |
| **IdeaScale** | ideascale.com · San Francisco (founded 2009, ~75–1000 staff) | Government, education, regulated enterprises; 4.5M+ participants | Crowdsourced idea campaigns, voting, evaluation | ⚠️ **Public list exists:** Engage **$12,999**, Evolve **$21,999**, Advance **$34,999**, Transform **$64,999** — **all two-year subscriptions. No free plan.** ([saasworthy.com/product/ideascale/pricing](https://www.saasworthy.com/product/ideascale/pricing), 14 Oct 2026). Vendor now says "custom subscriptions" ([pricingsaas.com/companies/ideascale](https://pricingsaas.com/companies/ideascale)) | Portfolio ● / Intake ● / Mentorship ✗ / IPR ✗ / Resources ◐ / Milestones ◐ / Reporting ● / AI ● / Integrations ● |
| **Brightidea** | brightidea.com · Canada | Large enterprises | Idea Box, Program (challenges), Hackathon, Lab, Ecosystem, Transformation | Quote-only for cloud. **Brightidea Memo from $99/team-site/mo** ([guideflow.com](https://www.guideflow.com/blog/workplace-innovation-platforms)) | Portfolio ● / Intake ● / Mentorship ✗ / IPR ✗ / Resources ✗ / Milestones ◐ / Reporting ● / AI ● / Integrations ● |
| **BrightWork 365** | brightwork.com · US (Boston, founded 1995, ~99 staff) | Enterprises on Microsoft 365 | Project/portfolio management *on the Microsoft 365 Power Platform* | **$17 / $15 / $13 / $11 per user/month** (annual) by tier: Teams 20–50 / Groups 51–100 / Departments 101–250 / Divisions 251–500 users. Start service 40 hrs @ **$8,750** or €6,500 ([brightwork.com/brightwork-365/pricing](https://www.brightwork.com/brightwork-365/pricing)) | Portfolio ● / Intake ✗ / Mentorship ✗ / IPR ✗ / Resources ◐ / Milestones ● / Reporting ● / AI ✗ / Integrations ● (M365-native) |
| **Qmarkets** | qmarkets.com · US | Global enterprises | Modular suite: Q-ideate, Q-optimize, Horizon, Q-scout, Q-impact | Quote-only; annual licence, on-prem option, ISO 27001/SSO/SCIM/MFA ([itonics-innovation.com](https://www.itonics-innovation.com/blog/top-innovation-management-software), 15 Oct 2026) | Portfolio ● / Intake ● / Mentorship ✗ / IPR ✗ / Resources ✗ / Milestones ◐ / Reporting ● / AI ● / Integrations ● |
| **ITONICS** | itonics.com · Europe | Enterprises | "Innovation OS" | Quote-only ([itonics-innovation.com](https://www.itonics-innovation.com/blog/top-innovation-management-software)) | Portfolio ● / Intake ● / Mentorship ✗ / IPR ✗ / Resources ◐ / Milestones ◐ / Reporting ● / AI ● / Integrations ● |
| **Wazoku** | wazoku.com · UK | Open innovation, market intelligence | Internal ideation + external expert/scouting | From **$15,000/yr** ([guideflow.com](https://www.guideflow.com/blog/workplace-innovation-platforms)) | Portfolio ● / Intake ◐ / Mentorship ✗ / IPR ◐ / Resources ✗ / Milestones ◐ / Reporting ● / AI ● / Integrations ● |
| **InnovationCast** | — | Structured employee innovation programs | Guided challenges, participation mechanics, implementation support | From **$2,999/mo** ([guideflow.com](https://www.guideflow.com/blog/workplace-innovation-platforms)) | Portfolio ◐ / Intake ● / Mentorship ✗ / IPR ✗ / Resources ◐ / Milestones ✗ / Reporting ◐ / AI ◐ / Integrations ◐ |

**Critical observation on this entire category:** *Every one of these is a corporate intrapreneurial idea-management tool.* They assume an HR-grade employee base, an SSO directory, and an IT department. None assumes a student body, a rotating student-coordinator workforce, or a Ministry reporting obligation. **None of them has a university-incubator customer in India at any price.**

**IdeaScale's public list is the most useful single benchmark in this research.** $12,999 for a **two-year** subscription = **~$6,500/yr ≈ ₹5.85 lakh/yr** at the entry tier. That is right at the ceiling of StartupHub's band — and IdeaScale still requires a sales conversation for anything real.

---

## B. Incubator / Accelerator Management — the most directly relevant category

### AcceleratorApp (acceleratorapp.co) — **THE closest global competitor**

| | |
|---|---|
| **URL** | [acceleratorapp.co](https://www.acceleratorapp.co/en) |
| **Country** | USA (New York), founded 2017, ~16 staff (Tracxn est. revenue ~$7.1M) |
| **Target** | Accelerators, incubators, corporate innovation teams, **and government/grant funders** |
| **Core pitch** | *"The accelerator platform built for how cohorts actually run… It replaces the five tools your team is already patching together. From the first application to the final portfolio report, everything your program needs is connected in one place."* |
| **Pricing — Core** | **From $499/month, no hidden setup fees, full migration included, no consulting requirement** ([acceleratorapp.co/en/lp/accelerators](https://www.acceleratorapp.co/en/lp/accelerators)) |
| **Pricing — Funding module** | Essential **$549/mo**, Professional **$899/mo**, Enterprise custom. Funding seats **+$49/mo each**. ([acceleratorapp.co/en/pricing/funding](https://www.acceleratorapp.co/en/pricing/funding)) |
| **Feature coverage** | Portfolio ● (Startup Data Collection & Tracking) / Cohort+Intake ● (multi-stage review, reviewer assignment, blind review) / Mentorship ● (Coaching Tools, scheduling, notes) / IPR ✗ / Resources ● (integrated LMS) / Milestones ● (Smart Tasks, KPI tracking) / Reporting ● / AI ● (**AI application scoring + AI applicant coaching, live**) / Integrations ◐ (Zapier; Enterprise has API) |
| **Compliance** | **ISO/IEC 27001 certified, GDPR compliant.** SSO, audit logs, API access and data residency = **Enterprise only** |
| **Known customers** | Start It @KBC, SparkLabs, **German Accelerator**, Startup Braga, MBC Africa, **MIT Design X**, Imagine, H2O, Ignite Bermuda, Yale, Global GreenChemistry, zuMtl, CIIE |
| **Scale claims** | 200+ organizations across 6 continents, 700k+ applications processed, 6,000+ program managers, live in 1–2 weeks |
| **Strengths** | Purpose-built domain model (founder record is the spine). Multi-program. Clone-a-program. Translations into EN/FR/ES/DE/PT/AR/UK. Public pricing. Migration included. |
| **Weaknesses** | No IPR module. No Indian regulatory reporting. Quote-gated audit logs. English-first UX. No evidence of Indian HEI customers. Thin integration surface outside Zapier. Very small team. |
| **What it does NOT do** | Cannot file ARIIA / NIDHI-PRAYAS / MoE Innovation Cell submissions. No DPIIT recognition tracking. No per-department coordinator model. No Indian-language-first UX. No GST invoicing. |

**$499/month = $5,988/year ≈ ₹5.4 lakh/year.** This is *inside* StartupHub's stated band, at the top. **This is the single most important competitive data point in this research.**

### Others in this category

| Vendor | Status | Pricing | Notes |
|---|---|---|---|
| **Dealum** | ✅ Exists — accelerator-specific (apps + deal rooms) | **$119/mo single program → $479/mo multi-program** | Cited by AcceleratorApp, 2026 ([acceleratorapp.co/en/blogs/how-to-manage-accelerator-applications-across-programs](https://www.acceleratorapp.co/en/blogs/how-to-manage-accelerator-applications-across-programs)) |
| **F6S** | ✅ Exists | **Core application + evaluation features free** | Long-standing incubator platform ([acceleratorapp.co blog](https://www.acceleratorapp.co/en/blogs/how-to-manage-accelerator-applications-across-programs)) |
| **Devpost** | ✅ Exists | **FREE for student organisations hosting student-only events** (academic-email verification required); enterprise = **custom quote, reported low-five-figure to $80,000** | 6M+ builders. Reg→submission conversion 5–33% ([info.devpost.com/product/public-hackathons](https://info.devpost.com/product/public-hackathons); [help.devpost.com/article/127](https://help.devpost.com/article/127-how-do-i-create-a-hackathon); [builderbase.com/compare/devpost](https://www.builderbase.com/compare/devpost/)) |
| **Disco** | ✅ Exists | Organisation plan ~**$399/mo** billed annually | Learning-heavy, light on program ops ([acceleratorapp.co/en/blogs/best-incubator-accelerator-software](https://www.acceleratorapp.co/en/blogs/best-incubator-accelerator-software)) |
| **BuilderBase** | ✅ Exists | **€999 per flagship event**, published up front; free to start | Explicit competitor positioning against Devpost ([builderbase.com/compare/devpost](https://www.builderbase.com/compare/devpost/)) |
| **Submittable** | ✅ Exists | Custom | Generalist grantmaking/CSR; aimed at foundations, not HEIs ([acceleratorapp.co blog](https://www.acceleratorapp.co/en/blogs/best-tools-multi-program-accelerator-applications)) |

### ❌ Flagged as misidentified / not a competitor
- **"Applied (applied.co)"** — ❌ **WRONG ENTITY.** `applied.co` is **Applied Intuition**, autonomous-vehicle and ADAS software ("Applied Intuition accelerates the adoption of safe, AI-driven machines with software for autonomous vehicles, ADAS, & beyond"). ([applied.co/about](https://applied.co/about), accessed 18 Oct 2026). **There is no accelerator management platform at applied.co.** The candidate list entry is mistaken.
- **Founder Institute** — ⚠️ Programme operator, not software. Listed by Startup Genome among accelerators ([startupgenome.com](https://startupgenome.com/insight/articles/unraveling-accelerators-to-fund-or-not-to-fund)).
- **Unreasonable / Unreasonable Group** — ⚠️ Programme operator (accelerator/mentorship programmes, Shell UK, Pearson, Accenture co-founded). **No software product.** ([unreasonablegroup.com/press](https://unreasonablegroup.com/press); [unreasonablegroup.com/initiatives/unreasonable-future](https://unreasonablegroup.com/initiatives/unreasonable-future/))
- **Startup Genome** — ⚠️ Ecosystem research/advisory organisation, not software. 200+ clients incl. Sebrae Brazil, FDRE Ethiopia, Alberta Innovates, Vinnova, Compagnia di San Paolo ([startupgenome.com/insight/articles/unraveling-accelerators-to-fund-or-not-to-fund](https://startupgenome.com/insight/articles/unraveling-accelerators-to-fund-or-not-to-fund))
- **MassChallenge Platform / OpenView / Startup Garage / MIT Entrepreneurship / Ideatable / MIT Design X** — ⚠️ These are **programmes, networks and events**, not separately productised software platforms. MIT Design X appears as an AcceleratorApp *customer*, which is the more relevant fact.
- **⚠️ AcceleratorGO, Slime Accelerator Services, Bitfinder, StartHub, League of Innovators** — **COULD NOT VERIFY** as current standalone software products in this research. **Flag as unverified; do not cite.**

---

## C. Grant / Portfolio & Research Management

| Vendor | URL / Country | Pitch | Public pricing | Coverage |
|---|---|---|---|---|
| **Elsevier Pure (RIMS/CRIS)** ⭐ | elsevier.com/products/pure · Netherlands/UK | Research Information Management System — 500+ institutions, 50+ countries; publications, funding, people, projects, impact; syncs with Scopus, ORCID, Web of Science, HR/finance | ✅ **PUBLIC UK government price list (G-Cloud 14)** — see table below | Portfolio ● (research) / Intake ✗ / Mentorship ✗ / IPR ◐ / Resources ✗ / Milestones ◐ / Reporting ● / AI ◐ / Integrations ● |
| **SmartSimple (Foundant)** | smartsimple.com · US | Grant lifecycle for foundations, government, pharma research funders | Quote-only. **One-time implementation fee + recurring subscription.** 1.4M+ annual users; $22B+ grant & scholarship awards 2025; 4,000+ organisations ([smartsimple.com/pricing](https://www.smartsimple.com/pricing), [smartsimple.com](https://www.smartsimple.com/)) | Portfolio ● / Intake ● / Mentorship ✗ / IPR ✗ / Resources ✗ / Milestones ● / Reporting ● / AI ◐ / Integrations ◐ (Salesforce) |
| **Anaqua** | anaqua.com · Boston, MA (founded 2004, raised $25M Bessemer) | IP portfolio management: AQX, PATTSY WAVE, AcclaimIP, RightHub | Quote-only. "Nearly half of the top 100 U.S. patent filers." Acquired **Unified Patents (Aug 2026)** and **Patrix**. ([anaqua.com/solutions/corporate](https://www.anaqua.com/solutions/corporate); [anaqua.com/products/aqx](https://www.anaqua.com/products/aqx)) | Portfolio ● (IP) / Intake ◐ (invention) / Mentorship ✗ / IPR ●● / Resources ✗ / Milestones ✗ / Reporting ● / AI ● / Integrations ● |
| **CPA Global** | cpaglobal.com · UK | Global IP obligations + portfolio analytics; CPA Global Invention Planning | Quote-only. Ranked #1 in 2026 IP asset-management comparisons ([gitnux.org/best/intellectual-property-asset-management-software](https://gitnux.org/best/intellectual-property-asset-management-software)) | Portfolio ● / Intake ◐ / Mentorship ✗ / IPR ●● / Resources ✗ / Milestones ✗ / Reporting ● / AI ◐ / Integrations ● |
| **PatSnap** | patsnap.com · Singapore/UK | "AI-native innovation intelligence platform," 2B+ structured data points, agents for IP/R&D | ⚠️ Vendor page shows **$200/mo "Light"** for occasional use ([patsnap.com/pricing](https://www.patsnap.com/pricing)). **Real enterprise contracts reported $15k–$30k/yr entry, $50k+ with modules, six figures multi-seat** ([beyondelevation.com/insights/patsnap-pricing-2026](https://beyondelevation.com/insights/patsnap-pricing-2026), 21 Jul 2026) | Portfolio ◐ / Intake ✗ / Mentorship ✗ / IPR ● / Resources ✗ / Milestones ✗ / Reporting ● / AI ●● / Integrations ● |
| **LexisNexis IP (ex-PatentSight)** | lexisnexisip.com · Horsham PA, founded 2016, Series A 2023, ~$161M disclosed, ~160 staff | Patent search/analytics + IP workflows | Quote-only. PatentSight ranked #10 in 2026 comparison list. ([tracxn.com](https://platform.tracxn.com/a/d/company/57da6f43e4b0c47e4ab55cf4/lexisnexis%20ip?utm_source=parallel&utm_medium=ai#a:about); [gitnux.org](https://gitnux.org/best/intellectual-property-asset-management-software)) | Portfolio ◐ / Intake ✗ / Mentorship ✗ / IPR ● / Resources ✗ / Milestones ✗ / Reporting ● / AI ● / Integrations ● |
| **Dolcera** | dolcera.com · US/India | IP management suite | Quote-only. **No public pricing found.** Named as a vendor competitor in PatSnap's DaaS terms ([patsnap.com/legal/patsnap-daas-terms-and-conditions](https://www.patsnap.com/legal/patsnap-daas-terms-and-conditions/)) | Portfolio ● / Intake ◐ / Mentorship ✗ / IPR ●● / Resources ✗ / Milestones ✗ / Reporting ● / AI ● / Integrations ● |

### ⭐ Elsevier Pure — the single hardest pricing benchmark available

**Public UK G-Cloud 14 price list** ([assets.applytosupply.digitalmarketplace.service.gov.uk](https://assets.applytosupply.digitalmarketplace.service.gov.uk/g-cloud-14/documents/711237/839883258276840-pricing-document-2024-04-17-0856.pdf), 17 Apr 2024 — still the most recent published list found; Elsevier has since moved to "Contact us"):

| Item | Tier 1 (1–999 researchers) | Tier 5 (7,000–9,999) |
|---|---|---|
| **Pure Core Module** (mandatory) | **£19,406/yr** | £58,504/yr |
| Reporting Module | £6,805 | £20,516 |
| Portal | £6,805 | £20,516 |
| CV Module | £2,452 | £7,391 |
| **Award Management Module** | **£11,149** | £33,610 |
| Assessment Module | £5,444 | £14,585 |
| **Setup service (one-off, mandatory)** | **£13,500** | £13,500 |
| **Management service startup (one-off, mandatory)** | **£18,750** | £18,750 |
| **Each integration/import** | **£5,188** | £5,188 |

**Minimum realistic Indian university deployment:** Core + Portal + Reporting = **£33,016/yr ≈ ₹44.6 lakh/yr**, plus **£32,250 one-off ≈ ₹43.5 lakh**, plus integrations. **Even a 1–999-researcher Indian university — a small college — faces a ~₹45L/year + ₹44L onboarding commitment.** A mid-size institution with Award Management is nearer ₹60L+/yr.

**Also note Elsevier's own buy-vs-build claim:** *"Pure benefits… Pure provides 70% added value over DIY and costs at least 41% less than DIY systems"* ([elsevier.com/en-gb/products/pure/why-pure](https://www.elsevier.com/en-gb/products/pure/why-pure)) — and University of Vienna's quote: *"Developing an in-house solution is not cheaper than having a system like Pure… this is an expert system"* ([Pure Multipersona Flyer, Jan 2026](https://assets.ctfassets.net/zlnfaxb2lcqx/6GGqRNrx6NJk22HC0vruec/9236b461bfbbab56875742796023148c/Pure_Multipersona_Flyer_Jan26.pdf)).

**But critically: Pure does not manage startups, cohorts, mentors or incubation.** It manages *research outputs and grants*. A college that only needs a startup tracker would not buy it — and cannot afford it regardless.

### ❌ Flagged as unverified
- **Sympaact** — **COULD NOT VERIFY.** Flag.
- **Research360** — **COULD NOT VERIFY.** Flag.
- **"PureData"** — ⚠️ **Likely a conflation with Elsevier Pure.** `puredata.info` resolves to a near-empty page unrelated to research management (accessed 18 Oct 2026). Assume the intended entity is **Elsevier Pure**.

---

## D. University Technology Transfer / TTO Software

| Vendor | Status |
|---|---|
| **Tech Transfer Ware** | ❌ **COULD NOT VERIFY** as a current standalone product. The searches surfaced only "TTO" consultancy services (tto.eu — a European advisory firm, not software) and university TTO offices. **Flag as unverified.** |
| **Invenio** | ✅ Exists — CERN-origin open-source research repository/IR platform family. It is **repository software (preprints, records, communities, preservation)**, not a TTO workflow suite (no invention disclosure, no patent docket, no licensing, no revenue share). |
| **DSpace** | ✅ Exists — open-source repository platform (Rice University). Repository, not TTO management. |
| **eSpace** | ⚠️ Stanford's repository software. Legacy; largely superseded by Hyrax/DSpace. |
| **Wellspring (formerly Accolade)** | ✅ Exists — technology transfer / innovation management for universities and research institutions. Quote-only ([pricingnow.com/question/accolade-pricing](https://pricingnow.com/question/accolade-pricing)). **This is the product most likely to be confused with "Accela."** |

### ❌ Flagged as miscategorised
- **Accela** — ❌ `accela.com` is **GovTech: permits, licensing and inspections** for US state/local government (founded 1999, San Ramon CA, $255.6M disclosed, acquired) ([tracxn.com](https://platform.tracxn.com/a/d/company/53187f52e4b01c90cfdc8b93/accela?utm_source=parallel&utm_medium=ai#a:about)). **Not innovation management.** The innovation-management product in that family is **Wellspring (ex-Accolade)**.
- **Sphera** — ❌ **Sphera is operational risk, EHS and sustainability management for process industries** (chemicals, oil & gas, pharma), formed 2016 from IHS + EHS acquisitions ([sphera.com](https://sphera.com/); [riskwatch.com](https://www.riskwatch.com/top-10-risk-management-software-for-manufacturing)). **Not innovation management.** Real pricing signal: SpendHound reports **average $268,953/year** across 160 Sphera customers ([spendhound.com/marketplace/sphera-pricing](https://www.spendhound.com/marketplace/sphera-pricing), 5 May 2026) — 45× the top of StartupHub's band.
- **Siemens Teamcenter** — ❌ **PLM/CAD/engineering data management.** Not innovation management. Irrelevant to this analysis.
- **Stage-Gate International** — ⚠️ **Not software.** A management consultancy selling the Stage-Gate® framework to "$50M+ companies and business units" ([linkedin.com/company/stage-gate-international](https://www.linkedin.com/company/stage-gate-international)). The methodology is relevant (portfolio gates map loosely to StartupHub's milestone tracking); the *company* is a competitor for advisory budget, not software budget.

---

## E. IP Management — covered in table C above (Anaqua, CPA Global, PatSnap, LexisNexis IP, Dolcera)

---

# CRITICAL OUTPUT

## "WHY HASN'T THE PROBLEM BEEN SOLVED?"

For each strong global player — the specific thing that stops them from serving Indian HEIs at Indian price points.

### 1. AcceleratorApp — *the* closest competitor
> **"It replaces the five tools your team is already patching together. From the first application to the final portfolio report."** — $499/mo, 200+ orgs, MIT Design X and Yale as customers.

**What stops them:**
- **Their product is designed around a *funding institution*, not an institution.** The presence of a separate "Funding" module with **capital call management** and **disbursement tranches** ([acceleratorapp.co/en/pricing/funding](https://www.acceleratorapp.co/en/pricing/funding)) tells you the unit of sale is a government or corporate venture fund dispensing money. An Indian HEI *receives* DST grants (NIDHI-CoE, NIDHI-PRAYAS, TBI) but **disburses none to student startups** — that money comes from DST or the institution. The hardest, most differentiated half of their product has no Indian HEI use case.
- **No Indian regulatory reporting at all.** ARIIA, NIDHI utilisation reports, MoE Innovation Cell calendar filings, YUKTI repository feeds, DPIIT recognition tracking. StartupHub's central reason to exist does not exist for them. Their customers report to *their own funders*, not to a ministry.
- **Audit logs and SSO are Enterprise-only, quote-gated.** An HEI whose MoE-mandated IIC structure requires demonstrable governance cannot self-serve it. Meanwhile their own blog says: *"For a single, small program, yes, [a Google Sheet] can work fine… The problem starts when programs grow"* — i.e. the Indian tier-2/3 college segment is *below* their economic threshold.
- **Pricing scales with concurrent programs and seats** ($49/Funding seat, $99/additional program) — exactly the per-seat dynamic Indian institutions distrust.
- **16-person company, New York.** No Indian entity, no Indian GST invoicing, no Indian-language-first UX, no on-ground implementation capacity, no India data residency story. Their strongest Indian-adjacent proof point is German Accelerator (a German government programme).

### 2. Elsevier Pure
> The most institutionally-credible system in the world. 500+ universities, 50+ countries. Public price list.

**What stops them:**
- **Price is structurally disqualifying.** Even the smallest tier is **£19,406/yr ≈ ₹26 lakh** for the Core module alone, with **£13,500 + £18,750 mandatory one-off fees** and **£5,188 per integration**. For an Indian college this is not a purchase decision; it is a non-starter requiring a research grant to justify.
- **Wrong object model.** Pure manages research outputs, publications, awards and grants. It has **no concept of a startup, a cohort, a mentor match, an incubation milestone, or a demo day.** An IIC does not need a CRIS; it needs a startup portfolio. The overlap is a shared IT department, nothing more.
- **Indian institutional budgets are built for teaching, not research infrastructure.** The target user (research office, librarian, VP Research) does not exist or does not have budget authority at a typical Indian private college.
- **Upmarket/European-first.** Even at Tier 1, the price assumes a university with 1,000+ researchers and a functioning IT integration team.

### 3. IdeaScale
> The only innovation-management vendor with a genuinely public price list — and it starts at **$12,999 for two years**.

**What stops them:**
- **The floor is at the ceiling of StartupHub's band** ($6,500/yr ≈ ₹5.85L) **before** any module is added, and the vendor now describes pricing as "custom subscriptions" with no published list ([pricingsaas.com](https://pricingsaas.com/companies/ideascale)).
- **Their model is campaign/crowdsourcing-shaped** — votes, gamification, community participation, 4.5M participants. An IIC needs a **structured, defensible record** for a ministry submission. Crowd-engagement mechanics are the opposite of an auditable register.
- **Independence problem.** Their published evaluation scores **reporting 2.4/5** and **single source of truth 1.9/5** — the two dimensions that matter most to a HEI buying for ARIIA/NIDHI compliance ([itonics-innovation.com](https://www.itonics-innovation.com/blog/top-innovation-management-software), 15 Oct 2026).
- **Education is named as a vertical but never as the buyer.** FedRAMP and SSO are aimed at government, not Indian HEIs.

### 4. Devpost
> The reason Indian student hackathons already work.

**What stops them:**
- **It is free *because* it is only a hackathon layer.** Free for student orgs hosting student-only events, academic-email verified ([help.devpost.com/article/127](https://help.devpost.com/article/127-how-do-i-create-a-hackathon)). Enterprise/custom is *"reported to run from the low five figures to $80K depending on scope"* ([builderbase.com/compare/devpost](https://www.builderbase.com/compare/devpost/); [hackathonhost.com](https://hackathonhost.com/articles/hackathon-platform-pricing-comparison)).
- **It stops at the hackathon.** No cohort management, no pre-incubation pipeline, no incubation portfolio, no IPR, no ministry reporting. A college runs SIH on Devpost and then has *nothing* for the rest of the year.
- **It is a US company with no Indian regulatory or language layer.** No ARIIA, no NIDHI, no GST.
- **Strategically, this is StartupHub's clearest wedge:** Devpost owns the event. Nobody owns what happens after it.

### 5. Airtable / Notion / Coda
> Cheap, flexible, already adopted.

**What stops them:**
- **Audit log, SCIM, SAML, SOC 2, HIPAA, granular RBAC, row-level permissions and compliance all sit above the tier an Indian college will buy.** Notion's audit log *"events are recorded starting from the time of upgrade"* — no retroactive history ([notion.com/help/audit-log](https://www.notion.com/help/audit-log)).
- **Airtable's quota walls are the wall**: 25,000 automation runs and 100,000 API calls/month on Team; automation limits consume quota even when switched off ([superdupr.com](https://superdupr.com/blog/airtable-pricing)). An institution running annual cohort + ARIIA + grant reporting will hit them.
- **Neither has referential integrity**, which is precisely what a startup↔IPR↔mentor↔funding model needs.
- **No single price a budget holder can plan against** beyond a seat count — and per-seat models are the exact thing Indian institutions distrust (see §4 ERP evidence).
- **No ministry reporting, ever.**

### 6. Indian Campus ERPs
> Already installed, already paid for, already trusted.

**What stops them:**
- **Nobody has built the module and nobody wants to.** AskERP gets closest — "publication tracker, grant management, H-index" — but there is no startup portfolio, no IIC workflow, no mentorship, no incubation anywhere in the Indian ERP module lists surveyed (Academia, Instita, MasterSoft, DigiERP, OnCampusERP, EduplusCampus, AskERP).
- **Their incentive structure is wrong.** ERP vendors make money from *more modules and more seats*. StartupHub's model (flat fee, low price, narrow scope) is antagonistic to their revenue model.
- **Their buyer is the Principal/Registrar.** The IIC nodal officer — StartupHub's actual buyer — has no seat in that buying decision.
- **Per-student pricing actively punishes the very thing ARIIA rewards** (a college that incubates more startups).

### 7. Anaqua / CPA Global / PatSnap / LexisNexis IP
> Real IP-management depth.

**What stops them:**
- **Enterprise IP docket economics don't exist at an Indian college scale.** A college files maybe 20–200 patents/year (PDEU IIC reports "140+ IPR filed" cumulatively — [pdeu.ac.in](https://pdeu.ac.in/academics/centre-of-excellence/innovation-and-incubation-centre)). A global docketing platform is built for thousands of matters and dozens of attorneys.
- **PatSnap's real entry contract is $15k–$30k/yr** — 2–5× the top of StartupHub's band — before modules ([beyondelevation.com](https://beyondelevation.com/insights/patsnap-pricing-2026)).
- **Patent analytics is not the job.** An IIC's job is *tracking filings and nudging students to file*, not landscaping competitors.
- **Anaqua acquired Unified Patents in Aug 2026 and Patrix before that** — consolidating at the enterprise end, moving further from small institutions.

---

## THE 5 STRUCTURAL REASONS THE INDIAN INSTITUTIONAL MARKET IS UNDER-SERVED

### 1. **The buyer has no budget line, and the budget is compliance-shaped, not feature-shaped.**
The IIC Nodal Officer is the user, but the money comes from an IIC grant, an NIDHI-TBI/CoE grant, or an Atal Lab. India's entire compliance discourse runs the other way: *"a typical firm has to navigate around 1,500 Acts which collectively impose 69,233 separate compliances and 6,618 independent filings"* (PRS Standing Committee summary, 7 Aug 2026, [prsindia.org](https://prsindia.org/policy/report-summaries/doing-business-in-india-the-way-forward)). **The only pitch that lands is "stop re-keying the same data into four places."** Feature marketing fails; time-and-risk elimination works. No global vendor has made this pitch because it is only true in India.

### 2. **The price gap is a cliff, not a slope — and it sits 10–100× below every incumbent's floor.**
| | Floor price | vs StartupHub band (₹50k–5L) |
|---|---|---|
| AcceleratorApp | $499/mo = ₹5.4L/yr | Top edge |
| Devpost (enterprise) | ~₹9L–₹72L per event | 2–14× above |
| IdeaScale | $12,999/2yr = ₹5.85L/yr | Top edge |
| Elsevier Pure | £19,406/yr = ₹26L/yr | **5× above** |
| Sphera (analogue) | $268,953/yr = ₹2.4Cr/yr | **485× above** |
| Anaqua / CPA Global / PatSnap | Quote-only enterprise | Far above |
| **Notion Plus, 8 seats** | **₹86k/yr** | **Inside the band** |
| **Trello Standard, 10 users** | **₹54k/yr** | **At the floor** |
| **WhatsApp + Sheets** | **₹0** | **Free** |

There is **no global vendor occupying ₹50k–5L for institutional startup management.** The two nearest price points (Notion Plus, Trello Standard) are generic work tools without audit, compliance or ministry reporting. **The gap is not "no one has built it" — it is "no one has built it *at this price with Indian compliance baked in*."**

### 3. **The demand is mandated but the data model is not standardised — so no global vendor can template it.**
The MoE/AICTE IIC framework fixes the *organisational* shape — President, Convenor, Innovation Activity Coordinator, Startup Activity Coordinator, IPR Coordinator, Social Media Coordinator, ARIIA/NIRF Coordinators ([dayanandasagar.edu IIC charter](https://www.dayanandasagar.edu/dsit/images/pdf/IICa.pdf)) — but each institution invents its own fields, its own mentor taxonomy, its own milestone vocabulary. ARIIA, NIDHI-PRAYAS, YUKTI, SIH and DST each demand **different, overlapping but non-identical** submission formats, evidenced in the public IIT Mandi and IMS UC submissions. **Global platforms standardise the buyer (a corporation with a clean HR directory and a chart of accounts). There is no such thing as a standard Indian HEI. The only way to productise this is to absorb the reporting formats as a first-class requirement — a purely Indian, purely local cost.**

### 4. **Every workaround is free, and the true cost is invisible — so the problem is chronically under-articulated.**
Excel, Google Sheets, Google Sites and WhatsApp are all ₹0, and all are genuinely adequate at the scale of a single hackathon or a 30-startup cohort. Nobody is *complaining*, because nothing is broken — the process is merely expensive in a currency (nodal-officer hours and re-keying) that no software purchase is ever benchmarked against. AcceleratorApp's own diagnosis is the clearest statement of this: *"The tools most accelerators are using weren't built for this… Strong applicants get missed because a reviewer's scores never made it into the master sheet"* ([acceleratorapp.co blog, 30 Apr 2026](https://www.acceleratorapp.co/en/blogs/why-accelerators-struggle-application-management-software/)). **The incumbent does not lose a single user — it just quietly consumes the institution's most constrained human resource.**

### 5. **The workforce is transient, so the incumbent's switching cost is artificially low — and the buyer's tenure is shorter than the payback period.**
The IIC operating unit is named *student* coordinators and rotating faculty (VIT Vellore's domain system; IISc's student coordinators; the IIC charter's "Innovation Activity Coordinator" and "Startup Activity Coordinator" roles are commonly student-held — [innovations.vit.ac.in](https://innovations.vit.ac.in/innovations/iic.html); [iic.iisc.ac.in/student-coordinators](https://iic.iisc.ac.in/student-coordinators)). **The person who would champion StartupHub graduates in 2–3 years; the person who signs is a faculty member who may transfer.** This creates three hard structural penalties: near-zero willingness to pay for migration services; an instinctive preference for a tool that is trivially learnable by a fresh coordinator each year; and **no institutional memory to accumulate in the incumbent**, which paradoxically means **there is little data to migrate — reducing switching friction to near zero**. A vendor must therefore win on *this year's* value proposition, and price below the point where it needs a business case.

---

## GLOBAL PLAYERS WITH PRICING COMPARABLE TO INDIA'S ₹50k–5L/YEAR BAND THAT COULD ENTER

| Player | Entry price | ₹/yr | **Could they serve Indian HEIs?** |
|---|---|---|---|
| ⭐ **AcceleratorApp** | $499/mo | **₹5.4 lakh** | **YES — most likely entrant.** Purpose-built domain model, public pricing, migration included, ISO 27001, MIT Design X + German Accelerator as proof, AI scoring already live. **If they build ARIIA/NIDHI/PRAYAS reporting templates and open audit logs below Enterprise, they can take the segment.** This is the highest-priority competitive threat. |
| **Dealum** | $119/mo | **₹1.28 lakh** | **YES, plausibly.** Accelerator-specific (applications + deal rooms). Would need to add cohort/mentorship/milestone depth beyond deal-flow. |
| **Disco** | $399/mo | ₹4.3 lakh | **Possible.** Learning-heavy; thin on program ops. |
| **F6S** | **Free** (core) | **₹0** | **YES as a wedge.** Free incumbent for intake; would have to upsell. Highest existing HEI/student penetration risk at zero price. |
| **Devpost (student tier)** | **Free** | **₹0** | **YES as a wedge** — but only for the hackathon slice. Cannot serve the year-round portfolio. |
| **BuilderBase** | €999/event | ~₹91k/event | **Possible** for the event module. European entity; no Indian compliance. |
| **Notion Plus** | $10/member/mo | ~₹86k for 8 seats | **Already present** and will be used by digitally-motivated nodal officers. Real competitor for the *intake and tracker* surface — but audit log and granular permissions gate at Enterprise. |
| **Coda / Superhuman Docs Pro** | $12/Doc Maker/mo | ~₹26k for 2 makers | **Already present.** Cheapest credible relational option; structurally unstable (two rebrands in 20 months). |
| **Trello / monday / ClickUp** | $5–9/user/mo | ₹54k–1.19L for 10 users | **Already present.** Cheap task tracking; no domain model. |
| **Airtable Team** | $20/editor/mo | ₹1.7L for 8 editors | Possible for a sophisticated coordinator; quota walls and no audit trail block institutional use. |

### Explicitly OUT of band (>₹6L/yr entry)
**IdeaScale** ($12,999/2yr), **Brightidea** enterprise (quote), **HYPE Innovation** (quote), **Qmarkets/ITONICS/Wazoku/Accolade/Wellspring** (all quote-only, enterprise-first), **BrightWork 365** ($17/user/mo + $8,750 start service), **Elsevier Pure** (£19,406/yr), **SmartSimple** (quote + implementation), **Anaqua / CPA Global / Dolcera / LexisNexis IP / PatSnap enterprise** (quote-only, $15k–$50k+), **Sphera** (~$269k/yr).

### Strategic conclusion
**No global player is currently positioned in the ₹50k–5L band for institutional startup management.** The two that could get there — **AcceleratorApp** ($499/mo, already proven on accelerators, already has university-adjacent customers, and already ships AI application scoring) — are structurally disincentivised by the Indian regulatory reporting requirement. **That requirement is the moat, and it is only as strong as StartupHub's coverage of ARIIA, NIDHI-PRAYAS/TBI/CoE, YUKTI, SIH/KAPILA and DPIIT submission formats.**

**Highest-priority watch items:** (1) AcceleratorApp adding India-specific reporting or opening audit logs below Enterprise; (2) Devpost or F6S extending from events into cohort/portfolio management; (3) any Indian campus ERP vendor adding an IIC/incubation module to defend the bundle; (4) F6S or Devpost launching an India-specific free tier at university scale.
</task_result>
</task>