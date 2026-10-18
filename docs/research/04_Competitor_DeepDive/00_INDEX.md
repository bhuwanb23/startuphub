# Competitor Deep Dive — Index

**Compiled:** 18 October 2026 · **Method:** 4 parallel research streams · Source IDs → [`../00_Research_Index/Source_Registry.csv`](../00_Research_Index/Source_Registry.csv)

> ### The one-paragraph version
> StartupHub is **not entering an empty market.** Eleven direct competitors, three of them India-native with published INR prices from ₹75,000/yr upward. The market's biggest weakness is not that it lacks features — it is that **almost nobody in it can prove an Indian institution runs on their software**, and **exactly zero competitors have an IPR module or a TRL engine**, both of which India mandates. That is where the white space is, and it is a mandate-shaped hole, not a feature gap.

---

## 1. Who we researched

### Direct competitors — `Direct/` (11 dossiers)

| # | Vendor | Origin | Public price | Named Indian institutional customers | Independent reviews |
|---|---|---|---|---|---|
| 1 | **NestLens Orbit** | Bengaluru | 🟢 **₹75k / ₹99k / ₹1.25L / ₹2.5L per year** | None verifiable | **Zero** |
| 2 | **EcoSync** | India (LLP) | 🔴 login-gated | **1** (TBI-KIET) | **Zero** |
| 3 | **Incubatee (SCIP)** | Bhopal | 🟢 **₹25k/mo + ₹75k + ₹10k + ₹850/admin/mo = ₹3,95,200 yr 1** | None | **Zero** |
| 4 | **IncubatX** | India (2026) | 🟢 **₹10–15k / ₹30–40k / ₹50–60k per month** | None | **Zero** |
| 5 | **Accubate** (Cunomial) | India | 🔴 own site · 🟡 Capterra $149/mo | **6+** — NSRCEL, NASSCOM, TCS, Hero, KPMG, Accenture | 🟢 **26 Capterra, 4.8** |
| 6 | **AcceleratorApp** | Lithuania | 🔴 core · 🟢 funding module $549–899/mo | **Zero Indian**; Yale, MIT Design X, Max Planck | None found |
| 7 | **Gohorto** | London (claim) | 🔴 JS-only · 🟡 GetApp $399/mo | None | 3 GetApp, one vendor-referred |
| 8 | **Founderhood** | Athens/London (conflict) | 🟢 **Free / $199 / $649 / custom — universities get 15% off** | None | 1 G2 + 2 Capterra |
| 9 | **VentureLink** | Toronto | 🟢 **Free / $180/mo or $1,730/yr + $500** | None | **Zero** |
| 10 | **incuTrack** | USA (2002) | 🟢 **$75 / $250 per mo + $595 setup** | None (US/kitchen incubators) | 10 G2, 3.8 — "quite outdated" |
| 11 | **RiserNest** | Europe | 🟢 **€399/799/1500 per mo *or* €40/70/120 per user/mo** | None (Frank and the Backs, Belgium) | **Zero** |

### Ecosystem platforms — `Ecosystem_Platforms/`
The mandatory government stack. **Not competitors — statutory infrastructure.** StartupHub must complement them, and three of them are the highest-value integration targets in the entire project.

| Platform | Operator | Unit of record | What it gives the institution | What it takes |
|---|---|---|---|---|
| **IIC Portal** | MoE Innovation Cell | the activity/event | Star rating (1–5), Performance Card | 16+ activities/yr, each a full evidence submission |
| **YUKTI-NIR** | MoE MIC + AICTE | the innovation snapshot | TRL banding, institute-side verification, **auto-flows to ARIIA** | Every innovation, institute-verified |
| **NIRF Innovation** | MoE | the spreadsheet row | Ranking, and 5 marks hinge on one countable | ~11 screens **per discipline**, per startup |
| **ARIIA** | AIM / Atal Innovation Mission | institution-year + innovation rows | Ranking, incumbent performance data | 100+ indicators, 5 categories |
| **AISHE** | DoHE | the institution-year aggregate | National registry, statistical frame | Binary innovation items only |
| **Startup India / DPIIT** | DPIIT | the recognition certificate | Recognition, funding, IPR facilitation, MAARG mentorship | Startup-level only — **institutions get nothing back** |
| **BHASKAR** | DPIIT | the registered entity | Ecosystem-universal ID | ⚠️ Possibly being overhauled into a national master data registry |

### Indirect alternatives — `Indirect_Alternatives/`
**The real competition.** In Indian institutions, the incumbent is almost always free.

| Alternative | Real price | What it can't do |
|---|---|---|
| **Excel / Google Sheets** | ₹0 (bundled in licences they already pay) | No permissions, no audit trail, no relational integrity, no workflow, manual consolidation |
| **WhatsApp + Google Drive** | ₹0 | No structure, no permissions, no audit trail, no reporting. **This is the operational database.** |
| **Notion / Superhuman Docs / Airtable** | ₹26k–1.73L/yr at IIC scale | **Audit logs gated behind Enterprise** · no retroactive history · no offline · no Indian compliance |
| **Trello / ClickUp / Monday / Asana** | ₹54k–1.19L/yr at 10 users | No domain model, no intake workflow, no IPR. Audit logs Enterprise-only |
| **Campus ERP** | ₹500–2,000/student/yr (per-seat trap) | **Zero Indian campus ERP vendors have a startup-incubation module** |
| **Email + Word/PDF** | ₹0 | No calculation, no lineage, binary re-entry, month-end blackout |

### Global — `Global/`
| Vendor | Price | Why it matters |
|---|---|---|
| **Elsevier Pure** | 🟢 **£19,406–£58,504/yr + £32,250 onboarding** (public UK G-Cloud list) | Hardest benchmark in the research. ~₹44.6L/yr + ₹43.5L onboarding for a *small* Indian university. **Manages research outputs, not startups.** |
| **IdeaScale** | 🟢 **$12,999–$64,999 per TWO years**, no free plan | ~$6,500/yr ≈ ₹5.85L/yr entry. Corporate intrapreneurial; assumes employee base + SSO + IT dept |
| **Innoloft / LoftOS** | 🟢 Free – $849/mo | 🔴 **The DIY threat** — a no-code portal builder *with an accelerator template*. A university IT team could build its own for $29–349/mo |
| **Incu (Sweden)** | 🟢 790 kr/user/mo + €3,500 | **The only competitor anywhere with any patent awareness** — a data field, not a workflow |

---

## 2. The comparison matrix

**Scoring:** ◎ strong/native · ● good · ◐ basic/partial · ○ absent
*Assessment from published evidence, 18 Oct 2026.*

| | EcoSync | Orbit | Incubatee | IncubatX | Accubate | AcceleratorApp | Gohorto | Founderhood | VentureLink | incuTrack | RiserNest |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Startup/portfolio mgmt | ● | ● | ● | ◐ | ● | ● | ● | ● | ● | ● | ● |
| Incubation (cohorts, intake, evaluation) | ● | ◎ | ◎ | ◐ | ● | ◎ | ◎ | ● | ● | ◐ | ● |
| **Weighted panel eval + audit trail** | **◎** | ● | ● | ◐ | ● | ● | ● | ◐ | ◐ | ◐ | ◐ |
| Mentorship (directory + matching + session logging) | ● | ● | ● | ● | ● | ● | ◎ | ● | ● | $30/mo add-on | ◎ |
| **IPR / patent tracking** | **○** | **○** | **○** | **○** | **○** | **○** | **○** | **○** | **○** | **○** | **○** |
| **TRL modelling** | **○** | **○** | **○** | **○** | **○** | **○** | **○** | **○** | **○** | **○** | **○** |
| Resource mgmt (labs, rooms, desks) | ◎ | ○ | ○ | ○ | ○ | ○ | ○ | ○ | ◐ | **◎** | ○ |
| Programme mgmt / PMO | ● | ● | ● | ◐ | ● | ● | ◎ | ● | ● | ◐ | ● |
| Milestone tracking | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● |
| **Funding ledger (source→programme→tranche)** | ◎ | ● | ● | ◐ | ◐ | **◎** | ◐ | ○ | ○ | ○ | ○ |
| Reporting / analytics | ● | ● | ● | ● | ● | ● | ● | ◐ | ● | ● | ◎ |
| AI / automation | ○ | ◐ (Sarvam) | ○ | ◎ | ○ | ◐ | ◎? | ○ | ○ | ○ | ◐ |
| Integrations / API | ● | ● | ● | ● | ◐ | ● | ● | ◐ | ◐ | ◐ | ? |
| White-label | ● | ● | ○ | ○ | ● | ● | ○ | ◐ | ○ | ○ | **◎ own domain + mobile apps** |
| **India compliance (IIC/NIRF/DPIIT/YUKTI)** | ◐ (GST/TDS/UPI) | **◎** | ◐ | ● | ○ | ○ | ○ | ○ | ○ | ○ | ○ |
| **IIC / YUKTI / ARIIA submission** | ○ | ○ | ○ | ○ | ○ | ○ | ○ | ○ | ○ | ○ | ○ |
| **Free tier / trial** | ● free (individuals) | ○ | ○ | ○ | ● | ○ | ● trial | **◎ free forever, 15 startups/program** | ● Lite forever | ○ | ● trial |
| **Independent reviews** | **None** | **None** | **None** | **None** | ● 26 Capterra | **None** | 3 GetApp | 1 G2 + 2 Cappa | **None** | 10 G2 (3.8) | **None** |
| **Named Indian customers** | **1** | 0 | 0 | 0 | **6+** | 0 | 0 | 0 | 0 | 0 | 0 |

---

## 3. Read the matrix this way

**Six of eleven competitors have zero third-party reviews and zero verifiable named customers.** Founderhood has one G2 review. AcceleratorApp has the best logo list in the market and zero Indian institutions.

**Two rows are entirely empty across the board:**
- `IPR / patent tracking` — **eleven out of eleven ○**
- `TRL modelling` — **eleven out of eleven ○**
- `IIC / YUKTI / ARIIA submission` — **eleven out of eleven ○**

The third row is not a feature. It is a **government workflow**, and it is where India's institutions are currently doing the most manual labour.

---

## 4. Files in this section

| File | Contents |
|---|---|
| `00_INDEX.md` | This file |
| `Positioning_Map.md` | **The 13 gaps nobody covers** + where StartupHub wins and where it must not compete |
| `Pricing_Evidence.md` | Every real, cited price across direct, indirect and global |
| `Direct/*.md` | One dossier per competitor |
| `Ecosystem_Platforms/` | The mandatory stack, and the structural gap analysis |
| `Indirect_Alternatives/` | What they use if StartupHub doesn't exist |

---

## 5. Honesty notes on this research

- **G2 and Capterra return HTTP 403 to automated fetch.** All review quotes come from search-index excerpts. They are accurate renderings of the source but must be re-verified directly before use in customer-facing material.
- **Several vendors serve AI-generated SEO content as their entire published feature set** — no documentation, no screenshots, no third-party review trail. Recurring tells: a "Guides on this topic" footer linking to unrelated blog posts, feature bullets repeated verbatim three times on one page, FAQ blocks written as marketing copy.
- **Four names on the original watchlist do not exist as incubator software:** Applied (applied.co is Applied Intuition, an autonomous-vehicle company), Bezu, Value Design Lab, Gobi. Also unverified: Envisage, IdeaForge, EIT InnoEnergy, Knowledge Transfer Innovation. See `COMP-016`.
- **Metrics and testimonials have been treated as Tier 4** unless independently corroborated. Specific flags in `Decision_Log` `D-012`.