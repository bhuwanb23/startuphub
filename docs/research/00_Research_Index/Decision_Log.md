# Decision Log

Append-only. New entries go at the bottom. Never edit or delete a past entry — if a decision changes, add a new entry that supersedes it and says so.

Format: **date · decision · evidence · what would reverse it**

---

## D-001 · 2026-10-18 · Organise research by type of evidence, not by phase

**Decision.** The repository is structured as `01_Evidence_Vault` / `02_Landscape_Map` / `03_Problem_Evidence` / `04_Competitor_DeepDive` / … rather than as one folder per phase, and not as the flat 24-folder list in todo.md Phase 33.

**Evidence.** A claim gathered in Phase 9 and a claim gathered in Phase 20 must land in the same place if they prove the same thing. `todo.md` itself is the phase map; duplicating it as the folder taxonomy creates two competing sources of truth that drift.

**Reverses if.** The 34 phases are later reordered such that phase number becomes the only meaningful retrieval key.

---

## D-002 · 2026-10-18 · Do not freeze the beachhead customer in Phase 0

**Decision.** Phase 0 examines universities, engineering colleges, IIC/TBI institutions, standalone incubators and startups **equally and in parallel**. No shortlist is produced yet. Narrowing happens at the end, from evidence.

**Evidence.** todo.md Phase 0 asks for a frozen beachhead. But the segment census (Phase 0, `02_Landscape_Map/Segment_Census.md`) shows the candidate segments differ by roughly three orders of magnitude — 1,289 universities vs 48,246 colleges vs 160+ DST TBIs. Choosing before the competitor and margin evidence exists would be premature. The user explicitly directed research in all directions first.

**Reverses if.** Evidence shows one segment is unserviceable (no budget, no data access, or fully pre-empted) — then it can be dropped early.

**Note.** This **supersedes nothing** but intentionally diverges from `todo.md` Phase 0. Deviation recorded here so it is not mistaken for an oversight.

---

## D-003 · 2026-10-18 · Run competitor research inside Phase 0, not at Phase 9

**Decision.** Workstreams B and C (direct competitors, ecosystem platforms) executed in Phase 0 alongside the segment census.

**Evidence.** todo.md itself states competitor research "needs to be one of your highest-priority workstreams, not something we do at the end." Confirmed empirically: LabelNest Orbit, IncubatX and EcoSync already sell institution-facing incubation software at ₹75k–₹6L/yr with India-specific government-scheme coverage. A V1 scope frozen without knowing this would have been wrong on arrival.

**Reverses if.** Nothing — this is settled.

---

## D-004 · 2026-10-18 · The core structural finding: mandated systems are compliance ledgers, not systems of record

**Decision.** StartupHub's positioning hypothesis is anchored on a **category error in Indian innovation policy digitisation**, not on a missing feature inside an existing product.

**Evidence.** Each mandated system has a different unit of record, and none of them is "a venture, over time":

| System | Unit of record |
|---|---|
| IIC | the activity/event (16+ per year, each a form with 2 photos, a video URL, participant counts, one expenditure line) — `GOV-018`, `GOV-021` |
| YUKTI-NIR | the innovation snapshot in three static buckets — `GOV-023` |
| NIRF-Innovation | the spreadsheet row — `GOV-027`, `GOV-028` |
| AISHE | the institution-year aggregate — `GOV-032` |
| DPIIT | the recognition certificate — `GOV-039` |

The sharpest single proof: the IIC portal has a menu item called **"IPR/TTO Centres"** that registers a technology-transfer office's existence and floor area — and then has **no field anywhere to record a single patent** (`GOV-022`). Meanwhile NIRF-Innovation demands "Patents Commercialized & Technology Transferred" and "Income from Technology Transferred (in Rupees)" (`GOV-028`), and ARIIA demands "Patent Application No" and "Year of Patent Application" (`GOV-032`). So institutions maintain a **separate, off-platform, manually-rekeyed patent ledger** purely to answer two government screens.

**Reverses if.** A mandated system is found that does model ventures over time. MAARG comes closest (`GOV-041`) but is scoped to DPIIT-recognised startups, not institutional portfolios — that scoping must be re-verified before this decision is revisited.

---

## D-005 · 2026-10-18 · Three capabilities are contested by zero commercial competitors

**Decision.** Treat IPR lifecycle management, TRL-as-a-first-class-object, and YUKTI-NIR/IIC/ARIIA export as the strategic core of the differentiation hypothesis.

**Evidence.** Across 11 direct competitors researched, **not one** has an IPR module (`COMP-001` to `COMP-013`). The only two traces in the entire market are a data field in a Swedish product and a dashboard tile in IncubatX. Meanwhile three government requirements make them unavoidable:

- YUKTI-NIR bands every submission by TRL (TRL 1–4 / 5–9 / Business) — `GOV-023`
- ARIIA asks for "Stage of Innovation (TRL Stage)" — `GOV-032`
- MeitY's official investment playbook mandates TRL benchmarking and IP due diligence including freedom-to-operate and distinguishing ownership from a 2-year university tech-transfer licence — `GOV-038`

Every competitor tracks "stage" as a free-text or dropdown field. Nobody models TRL as a reportable, government-alignable object, and nobody joins IP docketing to incubation programme management.

**Reverses if.** A competitor ships an IPR module. Given 6 of the 11 vendors researched have zero third-party reviews and no named Indian institutional customers, this is low-risk for at least 12 months — but it must be re-checked before any external launch.

---

## D-006 · 2026-10-18 · The price anchor is ₹75,000/yr, not ₹1.2 lakh

**Decision.** Treat LabelNest Orbit Launch at **₹75,000/year all-in** as the number that will appear in StartupHub's competitive deals. Keep Incubatee's **₹3,95,200 year-one** as the upper reference. Do not build the financial model on the ₹1.2L assumption carried in todo.md.

**Evidence.** `COMP-001` (Orbit Launch ₹75k / Starter ₹99k / Growth ₹1.25L / Scale ₹2.5L) and `COMP-004` (Incubatee ₹3,95,200 year one). The ₹50k–₹1.2L band in todo.md is anchored above the cheapest credible Indian incumbent.

**Critical pricing caveat recorded.** LabelNest publishes **two conflicting Orbit price lists on its own domain** — the institutional tiers above, and "Orbit OS ₹29,999/month (₹2,99,999/year)" on its NestLens overview page. In a procurement-comparison conversation where that surfaces, StartupHub wins.

**Reverses if.** Phase 8 pricing research or Phase 3 interviews establish a validated different price point. Until then ₹75k is a *competitive* anchor, not a *pricing decision*.

---

## D-007 · 2026-10-18 · StartupHub must attach to an existing budget head

**Decision.** Do not create a new budget line. Position against the IIC grant, the DST/NIDHI grant, or an Atal Incubation Centre allocation.

**Evidence.** The decision-maker is typically a single nodal officer or IIC coordinator with **no budget line of their own** (`COMP-024`, `COMP-025`). India's compliance burden is already extreme — "a typical firm has to navigate around 1,500 Acts which collectively impose 69,233 separate compliances and 6,618 independent filings" (`COMP-028`). A tool that reads as *more compliance* is dead on arrival; a tool that **reduces re-keying into existing mandated portals** has a strong pitch.

**Reverses if.** Phase 19 GTM research finds a dedicated institutional innovation-software budget line at a material number of institutions.

---

## D-008 · 2026-10-18 · Do not compete on price; compete on being the only thing that produces a compliant submission

**Decision.** Pricing floor stays above the free-tier anchors (Trello ~₹54k/yr at 10 users, Notion Plus ~₹86k/yr at 8 editors, ClickUp ~₹76k/yr). Differentiation is the mandated-portal export, not cost.

**Evidence.** `COMP-017`, `COMP-020`, `COMP-001`. The most dangerous pricing neighbourhood is Notion/Airtable/Coda at 8 editors — all inside or just below the ₹50k–5L band — and **all three gate their audit logs behind Enterprise** (`COMP-017`, `COMP-019`). Notion's audit log records events only "starting from the time of upgrade", with **no retroactive history** (`COMP-031`). Institutions need retroactive audit trails for accreditation and grant audits. That is a hard, citable, structural barrier.

**Reverses if.** Phase 8 reveals institutions genuinely cannot pay above ₹50k/yr, in which case a deliberately thinner, cheaper product is required — but it would have to accept losing the audit-trail differentiator.

---

## D-009 · 2026-10-18 · Log negative research findings as findings

**Decision.** "We searched and found nothing" is written into the research record as a result, with the scope of the search.

**Evidence.** Three negative findings materially change the work: no public API exists for IIC, YUKTI, NIRF, AISHE or MAARG (`GOV-043`); no Indian campus ERP vendor has a startup-incubation module (`COMP-021`); and no peer-reviewed literature quantifies Indian institutional reporting burden. Each removes a build-vs-buy option or opens a gap, and each would otherwise be re-researched every phase.

---

## D-010 · 2026-10-18 · The biggest single sale blocker is migration, so migration must be a product

**Decision.** Guaranteed, free-or-subsidised migration — explicitly including **WhatsApp group → structured records** — is a Phase 20 pilot requirement and a Phase 22 build decision, not a customer service courtesy.

**Evidence.** In Indian incubators the WhatsApp group *is* the operational database (`COMP-024` — IISc's own IIC links students to a WhatsApp group). Incu (Sweden) is the only vendor in the entire research stating it will import existing data at onboarding. Nobody has productised migration from open-question forms and spreadsheets. Migrating a university's data out of those is the #1 real blocker to any sale and is manual, unpaid work the *buyer* would otherwise do.

**Reverses if.** Phase 12 feature-gap research finds a migration tool already commoditised.

---

## D-011 · 2026-10-18 · Watch item: BHASKAR may become the national master data layer

**Decision.** Flag as the single most important external risk. StartupHub's data model must be designed so it can **reconcile to BHASKAR IDs** rather than duplicate them. Do not build a proprietary startup identity.

**Evidence.** DPIIT has reportedly planned an overhaul of BHASKAR into a "National Startup Master Data" registry that would unify records and track the startup lifecycle, with MeitY Startup Hub floating a similar tender (`GOV-040`). **Confidence: LOW** — this is trade-press reporting of a plan, not a published notification.

**Reverses if.** No tender or notification materialises within ~18 months. Re-verify before any external communication; do not cite this externally until confirmed from a government source.

---

## D-012 · 2026-10-18 · Ignore hallucinated vendor claims; the market is full of them

**Decision.** Self-reported metrics, customer testimonials and award badges are treated as Tier 4 unless independently corroborated. Specific credibility flags recorded during Phase 0: Gohorto's "G2 High Performer 2026" badge rests on 3 reviews, one vendor-referred, with self-authored comparison pages rating itself 4.8 and every rival 2.1–3.6 (`COMP-009`); IncubatX's "SOC 2-ready" is not SOC 2 (`COMP-005`); Incubatee claims no GST/TDS/UPI despite being an Indian vendor; and four names on the original watchlist (Applied, Bezu, Value Design Lab, Gobi) **do not exist as incubator software** (`COMP-016`).

**Evidence.** Multiple vendors in this category serve AI-generated SEO content as their entire published feature set, with no documentation, no screenshots and no third-party review trail.

**Reverses if.** Independent verification becomes available for any specific claim.