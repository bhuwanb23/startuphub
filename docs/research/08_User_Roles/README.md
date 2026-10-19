# Phase 2 — Customer Roles, Buying Centres and the Approval Chain

todo.md Phase 2 asks: *who uses it, who decides, who pays, who approves? — "these might be four different people."*

**They are.** And the answer is not uniform across institutions, which is the most commercially important thing this phase found.

---

## The short answer

| Question | Who | Evidence |
|---|---|---|
| **Uses** | The IIC Convener and the activity coordinators — the portal-enforced offices | `DOCUMENTED` in 10 of 25 roles |
| **Decides** | Split. Inside the council: Convener. Inside the institution: Registrar / Dean / Purchase Committee | `SINGLE-SOURCE` — rules describe authority, not behaviour |
| **Pays** | **Unknown for every IIC seat.** Budget authority is documented only for VC/Director, Dean, Registrar and Finance Officer | `DOCUMENTED` in **4 of 25** roles |
| **Approves** | Registrar / Dean (ICSR), then VC/Director above their ceiling | `DOCUMENTED` in 6 of 25 roles |

## The four findings that matter

### 1. Not one of the 12 mandated IIC seats holds documented budget authority

Every Class A office is portal-enforced and has a published job description. **None of them is documented anywhere as holding a budget line.** Four roles outside the IIC structure are: VC/Director, Dean/Innovation Head, Registrar/Dean (ICSR), and the Finance Officer. The offices that own the data are not the offices that own the money.

This is enforced mechanically, not asserted. `build/data_p2_roles.py::validation()` fails the build if any role is graded `DOCUMENTED` on `pays` without citing a procurement instrument that actually confers budget authority.

### 2. The IIC portal is not an org chart — it is a compliance gate

The MIC portal states that deleting the Convener, YUKTI, Social Media, Innovation Activity, Internship, IPR, Startup, ARIIA, NIRF or Member roles turns the sub-tab to a **red cross**, and that *"If it is in 'red cross' then you cannot add any activity under 'Manage Activity' section."*

These are mandated seats, not discovered personas. One of them — the Social Media Coordinator — has no innovation workload at all, which is exactly why seat count is not a proxy for demand.

### 3. Price selects the approver, and the spread is 20x

Across 8 institutions with published procurement instruments, the value at which a **purchase committee is engaged** ranges from **Rs 50K to Rs 10.00 lakh** — a 20.0x spread.

There is no uniform Indian threshold. Any pricing decision therefore changes the *number and type of approvers*, not just the deal size. Full ladders in [`Procurement_Authority.md`](Procurement_Authority.md).

### 4. At above ₹2 lakh in the private segment, the budget must already exist

Sathyabama's purchase policy: *"All the Major Purchases (above 2 Lakhs) shall be included in the budgetary proposals of the department, duly approved by the Finance Committee, Board of Management before heading to the purchase procedure."*

A purchase above ₹2 lakh in this segment cannot create a budget line — it can only spend one that was approved earlier in the year. This is the strongest documentary support yet for **D-007** (sell against an existing IIC / NIDHI / AIC allocation rather than create a new budget line).

---

## Evidence grading on this page

| Grade | Meaning |
|---|---|
| `DOCUMENTED` | Multiple primary sources read and cited. |
| `SINGLE-SOURCE` | One primary source. Suggestive; must not carry a claim alone. |
| `HYPOTHESIS` | Structurally implied but NOT evidenced. Requires Phase 3 interviews. |

Census across all 25 roles:

| Question | DOCUMENTED | SINGLE-SOURCE | HYPOTHESIS |
|---|---|---|---|
| uses | 10 | 14 | 1 |
| decides | 6 | 12 | 7 |
| pays | 4 | 3 | 18 |
| approves | 6 | 3 | 16 |

Note the shape: **confidence falls as the question gets closer to money.** That is the expected pattern for a compliance-driven system and it tells Phase 3 exactly where to spend its interview time.

## The four role classes

| Class | n | What it is |
|---|---|---|
| **A** | 12 | Mandated IIC seats - portal-enforced. No activity can be entered without them. |
| **B** | 6 | Adjacent institutional offices - real, but outside the IIC portal. |
| **C** | 5 | Off-portal gatekeepers - control the purchase; absent from the IIC portal and from todo.md's list. Added per D-019. |
| **D** | 2 | Individual users - students and founders. Never institutional buyers. |

## Documents

| File | Contents |
|---|---|
| [`Mandated_IIC_Seats.md`](Mandated_IIC_Seats.md) | The 12 portal-enforced offices and the gate that enforces them |
| [`Role_Matrix.md`](Role_Matrix.md) | All 25 roles × uses / decides / pays / approves |
| [`Decision_Map.md`](Decision_Map.md) | The four questions answered by segment, with grades |
| [`Procurement_Authority.md`](Procurement_Authority.md) | The price→approver ladders from 8 published instruments |
| [`Deep_Dives/`](Deep_Dives/) | Full profiles for Convener, President, ARIIA/NIRF Coordinator, Registrar/Dean |

## What this phase does **not** establish

- **Who pays, in practice.** No source read establishes that an IIC seat holds a budget. Phase 0's D-007 remains an inference.

- **Which role actually says yes.** Procurement rules describe who *may* approve. Real buying behaviour is unobserved and unobservable from documents.

- **Whether the 8 procurement instruments are representative.** They were found on public institution sites, which likely favours well-governed institutions. The 20x spread may understate the true variation (OQ-25).

- **Whether the Convener and the Incubation Manager are the same person.** The MIC portal's own guidance says Convener should preferably be the incubation in-charge, but no institution surveyed confirms it.

- **Founder behaviour.** Phase 1 `P-A01` found 38 of NIT Calicut's 55 startups were an unattributed *"others"* category. We cannot currently establish who the institution's own founders are, let alone whether they use its systems.

---

Machine-readable: `_exports/phase2/`. Sources registered as `P2-001`–`P2-012` in [`Source_Registry.csv`](../00_Research_Index/Source_Registry.csv).

Back to [Research Index](../00_Research_Index/README.md)
