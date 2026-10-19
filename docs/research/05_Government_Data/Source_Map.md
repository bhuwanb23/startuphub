# Source Map — 13 government bodies

**Phase 6. Built 2026-10-19.**

> The field that matters most here is **access**, and it is the one Phase 0 never recorded. `OQ-04` ("no public API in the mandated stack") is really a statement about access, and access has to be mapped before anything can integrate.

| # | Body | Ministry | Access | Machine-readable | Buyer-relevant |
|---:|---|---|---|---|---|
| 1 | **DPIIT** | Commerce & Industry | `REGISTER_GATED` | no | **yes** |
| 2 | **Startup India** | Commerce & Industry (Invest India) | `OPEN_HTML` | no | **yes** |
| 3 | **Ministry of Education (MoE)** | MoE | `OPEN_HTML` | no | **yes** |
| 4 | **Department of Higher Education** | MoE | `OPEN_PDF` | yes | **yes** |
| 5 | **NIRF** | MoE | `OPEN_PDF` | no | **yes** |
| 6 | **AICTE** | Education | `OPEN_HTML` | no | no |
| 7 | **UGC** | Education | `OPEN_HTML` | no | no |
| 8 | **IIC / MIC portal** | MoE Innovation Cell | `LOGIN_GATED` | no | **yes** |
| 9 | **Invest India** | Commerce & Industry | `OPEN_HTML` | no | no |
| 10 | **DST (NIDHI)** | Science & Technology | `OPEN_PDF` | no | **yes** |
| 11 | **MeitY (TIDE 2.0)** | Electronics & IT | `OPEN_HTML` | no | **yes** |
| 12 | **State Startup Missions** | State governments | `OPEN_PDF` | no | **yes** |
| 13 | **State Innovation Councils** | State governments | `OPEN_HTML` | no | no |

---

### 1. DPIIT

- **Ministry:** Commerce & Industry
- **Publishes:** Startup recognition, TRL recognition ladder, recognition numbers, sector categorisation
- **Form:** HTML + press releases · **Access:** `REGISTER_GATED` — registration required for detail
- **Note:** 197,692 recognised startups (Oct 2025). The recognition number is the join key Phase 3A proved institutions do not hold.

### 2. Startup India

- **Ministry:** Commerce & Industry (Invest India)
- **Publishes:** Ecosystem map, incubator schemes, state startup policies, States' Startup Ranking portal
- **Form:** HTML portal + PDF · **Access:** `OPEN_HTML` — public web page, no login
- **Note:** Hosts the SRF and every state policy PDF. The single richest source in this phase.

### 3. Ministry of Education (MoE)

- **Ministry:** MoE
- **Publishes:** Innovation Cell, IIC framework, IIC portal counters
- **Form:** HTML + PDF · **Access:** `OPEN_HTML` — public web page, no login
- **Note:** Source of the 16,367 IIC figure and the '48th GII rank' claim.

### 4. Department of Higher Education

- **Ministry:** MoE
- **Publishes:** Annual budget, AISHE, NIRF framework
- **Form:** PDF budget + HTML · **Access:** `OPEN_PDF` — public PDF, no login
- **Note:** FY 2025-26 DoHE Rs 50,078 cr. Already mined in Phase 5.

### 5. NIRF

- **Ministry:** MoE
- **Publishes:** Rankings, per-institution submitted innovation data (777 Innovation filers)
- **Form:** PDF + submitted PDFs · **Access:** `OPEN_PDF` — public PDF, no login
- **Note:** The only public source of institutions' own submitted innovation data. Mined in Phase 3A.

### 6. AICTE

- **Ministry:** Education
- **Publishes:** Approved institutions list, technical education regulation
- **Form:** HTML lists · **Access:** `OPEN_HTML` — public web page, no login
- **Note:** Budget CUT 50% to Rs 200 cr in FY 2025-26. Approved-institution count not published as a single figure (OQ-02).

### 7. UGC

- **Ministry:** Education
- **Publishes:** Grants, university lists, accreditation
- **Form:** HTML + PDF · **Access:** `OPEN_HTML` — public web page, no login
- **Note:** Rs 3,336 cr FY 2025-26. Uses a different frame for 'university' than AISHE (OQ-06).

### 8. IIC / MIC portal

- **Ministry:** MoE Innovation Cell
- **Publishes:** IIC registry, quarterly activity reports, scoring
- **Form:** Web application · **Access:** `LOGIN_GATED` — login required - cannot be bulk-harvested
- **Note:** The mandated stack's most important dataset and the least accessible. OQ-22 (actual filing rate) is unanswerable because of this.

### 9. Invest India

- **Ministry:** Commerce & Industry
- **Publishes:** Investment facilitation data, state-wise investment
- **Form:** HTML + reports · **Access:** `OPEN_HTML` — public web page, no login
- **Note:** Overlaps DPIIT/Startup India. Not separately mined.

### 10. DST (NIDHI)

- **Ministry:** Science & Technology
- **Publishes:** PRAYAS 2.0, TBI, iTBI, Seed Support, Accelerator, CoE guidelines
- **Form:** HTML + PDF guidelines · **Access:** `OPEN_PDF` — public PDF, no login
- **Note:** Guidelines are public; per-incubator disbursement is not. PRAYAS Centres Rs 20L, Advance PRAYAS Rs 40L.

### 11. MeitY (TIDE 2.0)

- **Ministry:** Electronics & IT
- **Publishes:** TIDE 2.0 centres, MeitY Startup Hub
- **Form:** HTML + PDF · **Access:** `OPEN_HTML` — public web page, no login
- **Note:** 51 incubators, ~2000 startups over 5 years. Grant up to Rs 27.2 cr - the LARGEST incubator grant found.

### 12. State Startup Missions

- **Ministry:** State governments
- **Publishes:** State startup policy, nodal officer/department, startup portal, incubator list
- **Form:** Per-state PDF + portal · **Access:** `OPEN_PDF` — public PDF, no login
- **Note:** THE BUYER. 31 of 36 States/UTs have a startup policy; 34 participated in SRF 5.0.

### 13. State Innovation Councils

- **Ministry:** State governments
- **Publishes:** Legacy tier-1 AICTE innovation council listings
- **Form:** HTML lists · **Access:** `OPEN_HTML` — public web page, no login
- **Note:** Predates IIC/AIM. Largely dormant and frequently superseded. Listed for completeness only.

---

## What access gating actually costs us

| Question | Blocked by | Why it matters |
|---|---|---|
| `OQ-22` What fraction of IICs actually file? | IIC portal `LOGIN_GATED` | The single biggest sizing uncertainty |
| `OQ-32` How do officers get a DPIIT number? | DPIIT `REGISTER_GATED` | Determines whether the product is a spreadsheet or a workflow |
| `OQ-10` How is the IIC star formula computed? | MoE publishes the band, not the formula | Stars are unusable as a benchmark input |
| Incubator disbursement by centre | DST/MeitY publish guidelines, not disbursement | Cannot verify the Rs 27.2 cr figures beyond the ceiling |

> **Two of the three most important sources are gated, and neither is bulk-harvestable.** Any integration plan that assumes API access to the mandated stack is wrong.
