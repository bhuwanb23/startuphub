/* ──────────────────────────────────────────────────────────────
   Resources workspace data.

   Shared by all four founder resource screens — Discovery, Matching,
   Requests and Allocation — so a number a founder reads on one screen
   never drifts from the next.

   The fit score is one model, not four opinions:

     fit = Σ (dimension score × dimension weight)

   Need urgency 25, Stage fit 20, Cost-to-value 20, Provider
   reliability 20 and Team capacity 15 give 100. Each catalogue item
   carries a score on every dimension, and the published `fit` on the
   item is exactly what the model computes. A test asserts it.

   The budget is one ledger too: the committed spend is the sum of
   every allocation, the team split adds up to that same number, and
   the dashboard's resource card reads the same figure. A test asserts
   all three.

   Tone values map onto the Badge component palette:
   default | accent | good | warn | bad
   ────────────────────────────────────────────────────────────── */

export type Tone = "default" | "accent" | "good" | "warn" | "bad";

/* ── The fit model ─────────────────────────────────────────── */

export type MatchDimension = {
  dim: string;
  weight: number;
  note: string;
};

/* Weights sum to 100. */
export const matchingDimensions: MatchDimension[] = [
  {
    dim: "Need urgency",
    weight: 25,
    note: "How hard the resource blocks work you have already committed to",
  },
  {
    dim: "Stage fit",
    weight: 20,
    note: "Does it help a 28-person, pre-Series-A agritech company specifically",
  },
  {
    dim: "Cost-to-value",
    weight: 20,
    note: "Value delivered per rupee of the quarterly resource budget",
  },
  {
    dim: "Provider reliability",
    weight: 20,
    note: "Whether this provider has actually delivered before",
  },
  {
    dim: "Team capacity",
    weight: 15,
    note: "Whether anyone on your team can absorb the resource in time",
  },
];

/* The one function that turns dimension scores into the fit number
   every resource screen quotes. Weights are percentages and sum to
   100, so the weighted average is the score. */
export function resourceScoreFrom(scores: Record<string, number>): number {
  return Math.round(
    matchingDimensions.reduce((sum, d) => sum + (scores[d.dim] ?? 0) * d.weight, 0) / 100,
  );
}

/* ── Catalogue ─────────────────────────────────────────────── */

export type ResourceCategory =
  | "Compute"
  | "Cloud credits"
  | "Data"
  | "Tooling"
  | "IP & legal"
  | "Talent"
  | "Lab time"
  | "Field access";

export const resourceCategories: { category: ResourceCategory; note: string; tone: Tone }[] = [
  { category: "Compute", note: "GPU hours and edge hardware for inference and training", tone: "accent" },
  { category: "Cloud credits", note: "Provider credit lines that burn down against usage", tone: "accent" },
  { category: "Data", note: "Satellite, rainfall and field datasets for the models", tone: "good" },
  { category: "Tooling", note: "Licences, analytics seats and observability tooling", tone: "default" },
  { category: "IP & legal", note: "Counsel, contract design and filing support", tone: "warn" },
  { category: "Talent", note: "Internships, fellowships and seconded specialists", tone: "good" },
  { category: "Lab time", note: "Bench hours for calibration and soil work", tone: "default" },
  { category: "Field access", note: "Cooperative sites for real-season validation", tone: "good" },
];

export type CostBand = "Free / grant" | "Under ₹1 L" | "₹1–3 L" | "Over ₹3 L";
export type LeadBand = "Instant" | "≤ 1 week" | "2–4 weeks" | "Over a month";

/* The bands the discovery filter offers — every one of them has at least
   one resource behind it, so no filter chip is a dead end. costBandOf still
   classifies anything dearer than ₹3 L, should one land in the catalogue. */
export const costBands: CostBand[] = ["Free / grant", "Under ₹1 L", "₹1–3 L"];
export const leadBands: LeadBand[] = ["Instant", "≤ 1 week", "2–4 weeks", "Over a month"];

/* Which band a priced item falls into — one function so the filter
   rail and the catalogue card can never disagree. */
export function costBandOf(cost: number): CostBand {
  if (cost <= 0) return "Free / grant";
  if (cost < 1) return "Under ₹1 L";
  if (cost <= 3) return "₹1–3 L";
  return "Over ₹3 L";
}

export function leadBandOf(days: number): LeadBand {
  if (days <= 1) return "Instant";
  if (days <= 7) return "≤ 1 week";
  if (days <= 28) return "2–4 weeks";
  return "Over a month";
}

export type CatalogueItem = {
  id: string;
  title: string;
  provider: string;
  category: ResourceCategory;
  value: string;
  /* Rupees in lakhs. Zero means the provider covers it. */
  cost: number;
  lead: string;
  leadDays: number;
  eligibility: string;
  tags: string[];
  note: string;
  /* The published fit — exactly what resourceScoreFrom(scores) returns. */
  fit: number;
  scores: Record<string, number>;
};

export const resourceCatalogue: CatalogueItem[] = [
  {
    id: "res-gpu-grant",
    title: "GPU Compute Grant",
    provider: "Nimbus Cloud Research",
    category: "Compute",
    value: "$40K credit",
    cost: 0,
    lead: "2 weeks",
    leadDays: 14,
    eligibility: "Deep-tech startups under 50 employees",
    tags: ["GPU", "Grant", "Training"],
    note: "Covers the v2 load test and the Q3 training runs — if you claim it before Apr 28.",
    fit: 96,
    scores: {
      "Need urgency": 100,
      "Stage fit": 96,
      "Cost-to-value": 98,
      "Provider reliability": 92,
      "Team capacity": 90,
    },
  },
  {
    id: "res-sat-sandbox",
    title: "Satellite Data Sandbox",
    provider: "ISRO Tech Transfer",
    category: "Data",
    value: "Free tier",
    cost: 0,
    lead: "2–4 weeks",
    leadDays: 21,
    eligibility: "Agritech or agri-research use only",
    tags: ["Satellite", "Spectral", "Sandbox"],
    note: "New multispectral bands are published in the sandbox — they are not in the paid API yet.",
    fit: 92,
    scores: {
      "Need urgency": 92,
      "Stage fit": 94,
      "Cost-to-value": 100,
      "Provider reliability": 88,
      "Team capacity": 84,
    },
  },
  {
    id: "res-ip-retainer",
    title: "Legal retainer — FER response",
    provider: "SH Legal Desk",
    category: "IP & legal",
    value: "1 session",
    cost: 0.35,
    lead: "3 days",
    leadDays: 3,
    eligibility: "Indian startups with a live patent application",
    tags: ["Patent", "FER", "Counsel"],
    note: "Dr. Meera already knows the per-acre filing — one session covers the Jun 02 response.",
    fit: 91,
    scores: {
      "Need urgency": 96,
      "Stage fit": 90,
      "Cost-to-value": 84,
      "Provider reliability": 91,
      "Team capacity": 93,
    },
  },
  {
    id: "res-arcgis",
    title: "ArcGIS Pro licenses × 2",
    provider: "Esri India",
    category: "Tooling",
    value: "₹1.4 L / yr",
    cost: 1.4,
    lead: "Instant",
    leadDays: 1,
    eligibility: "Any registered company",
    tags: ["GIS", "Analytics", "Seats"],
    note: "Two seats for field-mapping and the cooperative rollout analysis.",
    fit: 88,
    scores: {
      "Need urgency": 86,
      "Stage fit": 92,
      "Cost-to-value": 86,
      "Provider reliability": 90,
      "Team capacity": 84,
    },
  },
  {
    id: "res-interns",
    title: "Agronomy interns × 2",
    provider: "StartupHub Talent Pool",
    category: "Talent",
    value: "6 months",
    cost: 1.8,
    lead: "3 weeks",
    leadDays: 21,
    eligibility: "Startups in the StartupHub cohort network",
    tags: ["Talent", "Agronomy", "6 months"],
    note: "Two agronomy graduates for the cooperative rollout — 3 candidates in the pool.",
    fit: 85,
    scores: {
      "Need urgency": 88,
      "Stage fit": 88,
      "Cost-to-value": 75,
      "Provider reliability": 92,
      "Team capacity": 80,
    },
  },
  {
    id: "res-esop-session",
    title: "ESOP design session",
    provider: "SH Legal Desk",
    category: "IP & legal",
    value: "Free",
    cost: 0,
    lead: "1 week",
    leadDays: 7,
    eligibility: "Incorporated companies with an ESOP pool to refresh",
    tags: ["ESOP", "Pro bono", "Governance"],
    note: "Pro bono session to refresh the pool before the Series A option grant.",
    fit: 83,
    scores: {
      "Need urgency": 80,
      "Stage fit": 80,
      "Cost-to-value": 90,
      "Provider reliability": 95,
      "Team capacity": 66,
    },
  },
  {
    id: "res-edge-kit",
    title: "Edge inference device kit × 3",
    provider: "Bharat AI Compute",
    category: "Compute",
    value: "₹2.4 L",
    cost: 2.4,
    lead: "2–4 weeks",
    leadDays: 18,
    eligibility: "Indian entities with a registered business",
    tags: ["Edge", "Hardware", "On-prem"],
    note: "Three on-prem inference units — removes the per-acre cloud cost at pilot sites.",
    fit: 79,
    scores: {
      "Need urgency": 86,
      "Stage fit": 84,
      "Cost-to-value": 62,
      "Provider reliability": 79,
      "Team capacity": 82,
    },
  },
  {
    id: "res-cloud-tier1",
    title: "Nimbus Cloud — Tier I credits",
    provider: "Nimbus Cloud Research",
    category: "Cloud credits",
    value: "$25K credit",
    cost: 0,
    lead: "Provisioned",
    leadDays: 1,
    eligibility: "Applied-AI teams in the Nimbus partner programme",
    tags: ["Cloud", "Credits", "Inference"],
    note: "The credit line your inference workloads run on — $15.5K of it is already spent.",
    fit: 78,
    scores: {
      "Need urgency": 80,
      "Stage fit": 78,
      "Cost-to-value": 86,
      "Provider reliability": 90,
      "Team capacity": 48,
    },
  },
  {
    id: "res-rain-dataset",
    title: "Rainfall reanalysis dataset",
    provider: "ISRO Tech Transfer",
    category: "Data",
    value: "Free",
    cost: 0,
    lead: "2–4 weeks",
    leadDays: 18,
    eligibility: "Academic or commercial research use",
    tags: ["Rainfall", "Historical", "Free"],
    note: "Twenty years of reanalysis — the baseline your stress model is scored against.",
    fit: 76,
    scores: {
      "Need urgency": 70,
      "Stage fit": 80,
      "Cost-to-value": 94,
      "Provider reliability": 86,
      "Team capacity": 40,
    },
  },
  {
    id: "res-lab-bench",
    title: "Wet lab bench — CIED Pune",
    provider: "CIED Pune",
    category: "Lab time",
    value: "40 hrs",
    cost: 0,
    lead: "4 days",
    leadDays: 4,
    eligibility: "Agritech teams with a university tie-in",
    tags: ["Lab", "Calibration", "Grant"],
    note: "Bench hours for soil calibration — grant-funded, no co-payment.",
    fit: 74,
    scores: {
      "Need urgency": 66,
      "Stage fit": 74,
      "Cost-to-value": 92,
      "Provider reliability": 84,
      "Team capacity": 50,
    },
  },
  {
    id: "res-signalworks",
    title: "SignalWorks Analytics",
    provider: "SignalWorks",
    category: "Tooling",
    value: "1 year free",
    cost: 0,
    lead: "Provisioned",
    leadDays: 1,
    eligibility: "Teams under 30 people",
    tags: ["Analytics", "Free tier", "1 year"],
    note: "Product analytics for the FPO dashboard — renews Jul 2026, then it is not free.",
    fit: 71,
    scores: {
      "Need urgency": 58,
      "Stage fit": 78,
      "Cost-to-value": 90,
      "Provider reliability": 81,
      "Team capacity": 46,
    },
  },
  {
    id: "res-northgate",
    title: "Northgate pilot — field trial",
    provider: "Northgate FPO",
    category: "Field access",
    value: "1 season",
    cost: 0.4,
    lead: "3 weeks",
    leadDays: 21,
    eligibility: "Revenue-sharing pilots with a cooperative",
    tags: ["Pilot", "Cooperative", "Field"],
    note: "One real season on a cooperative's land — the cooperative covers the balance.",
    fit: 68,
    scores: {
      "Need urgency": 70,
      "Stage fit": 68,
      "Cost-to-value": 72,
      "Provider reliability": 86,
      "Team capacity": 35,
    },
  },
  {
    id: "res-fellowship",
    title: "AgriAI research fellowship",
    provider: "agriAI",
    category: "Talent",
    value: "12 months",
    cost: 0,
    lead: "6 weeks",
    leadDays: 42,
    eligibility: "Applied-AI teams with a research track record",
    tags: ["Fellowship", "Research", "12 months"],
    note: "A funded research year — nomination closes Apr 18, too late for the Q2 plan.",
    fit: 62,
    scores: {
      "Need urgency": 52,
      "Stage fit": 58,
      "Cost-to-value": 92,
      "Provider reliability": 80,
      "Team capacity": 20,
    },
  },
];

/* The catalogue, ranked. One order for every screen. */
export const rankedCatalogue = [...resourceCatalogue].sort((a, b) => b.fit - a.fit);

/* Catalogue arithmetic. Every screen quotes these instead of
   re-counting the list by hand, so the numbers cannot drift. */
export const freeCatalogue = resourceCatalogue.filter((r) => r.cost === 0);
export const paidCatalogue = resourceCatalogue
  .filter((r) => r.cost > 0)
  .sort((a, b) => b.fit - a.fit);
export const catalogueCost = resourceCatalogue.reduce((sum, r) => sum + r.cost, 0);

/* ── Providers ─────────────────────────────────────────────── */

export type Provider = {
  name: string;
  kind: string;
  /* The mean of the provider-reliability score across its items. */
  reliability: number;
  items: number;
  note: string;
  tone: Tone;
};

export const providers: Provider[] = [
  { name: "Nimbus Cloud Research", kind: "Compute partner", reliability: 91, items: 2, note: "Responds in under a day, grants credits the same week", tone: "accent" },
  { name: "ISRO Tech Transfer", kind: "Public data body", reliability: 87, items: 2, note: "Access approval takes 2–3 weeks, then the data is free forever", tone: "good" },
  { name: "SH Legal Desk", kind: "Legal partner", reliability: 93, items: 2, note: "Pro bono slots for cohort startups — limited to 4 a month", tone: "good" },
  { name: "Esri India", kind: "Licensed software", reliability: 90, items: 1, note: "Same-day activation on an annual invoice", tone: "default" },
  { name: "StartupHub Talent Pool", kind: "Talent network", reliability: 92, items: 1, note: "Pre-screened for agronomy, not for general engineering", tone: "good" },
  { name: "Bharat AI Compute", kind: "Hardware vendor", reliability: 79, items: 1, note: "Ships in 2–3 weeks, support is slow outside business hours", tone: "warn" },
  { name: "SignalWorks", kind: "Analytics vendor", reliability: 81, items: 1, note: "Free for a year, then it is a straight renewal", tone: "default" },
  { name: "CIED Pune", kind: "Academic lab", reliability: 84, items: 1, note: "Bench time is grant-funded but the queue is shared with 6 teams", tone: "default" },
  { name: "Northgate FPO", kind: "Cooperative partner", reliability: 86, items: 1, note: "Land access in exchange for a revenue share", tone: "good" },
  { name: "agriAI", kind: "Research programme", reliability: 80, items: 1, note: "One cohort a year, decided by nomination", tone: "default" },
];

/* ── Budget ────────────────────────────────────────────────── */

export const resourceBudget = {
  /* Rupees in lakhs. */
  cap: 8,
  committed: 6.35,
  period: "Q2 FY27 · Apr–Jun",
  owner: "Ananya Rao · CFO",
};

/* Spend per team. Adds up to resourceBudget.committed. */
export const allocationByTeam: {
  team: string;
  spend: number;
  pct: number;
  headcount: number;
  note: string;
  tone: Tone;
}[] = [
  { team: "Agronomy", spend: 3.2, pct: 50.4, headcount: 9, note: "Interns, licences and lab time — the field rollout", tone: "accent" },
  { team: "Infrastructure", spend: 2.4, pct: 37.8, headcount: 6, note: "Edge hardware and the two credit lines", tone: "accent" },
  { team: "GTM", spend: 0.4, pct: 6.3, headcount: 7, note: "Northgate pilot cost share", tone: "default" },
  { team: "Legal", spend: 0.35, pct: 5.5, headcount: 1, note: "The FER retainer session", tone: "warn" },
  { team: "Data", spend: 0, pct: 0, headcount: 5, note: "Runs on grant-funded sandboxes", tone: "good" },
];

/* ── Allocations ───────────────────────────────────────────── */

export type Allocation = {
  id: string;
  resourceId: string;
  name: string;
  provider: string;
  category: ResourceCategory;
  value: string;
  usedPct: number;
  note: string;
  /* Rupees in lakhs committed to this line this quarter. */
  allocated: number;
  owner: string;
  team: string;
  expires: string;
  daysLeft: number;
  status: "Active" | "At risk" | "Depleted";
  tone: Tone;
};

export const allocations: Allocation[] = [
  {
    id: "alloc-cloud",
    resourceId: "res-cloud-tier1",
    name: "Nimbus Cloud — Tier I",
    provider: "Nimbus Cloud Research",
    category: "Cloud credits",
    value: "$25K credit",
    usedPct: 62,
    note: "$15.5K of $25K used",
    allocated: 0,
    owner: "Kavya Nair",
    team: "Infrastructure",
    expires: "Dec 2026",
    daysLeft: 260,
    status: "Active",
    tone: "good",
  },
  {
    id: "alloc-gpu",
    resourceId: "res-gpu-grant",
    name: "GPU Cluster Grant",
    provider: "Nimbus Cloud Research",
    category: "Compute",
    value: "$40K credit",
    usedPct: 78,
    note: "Expires in 18 days — unused portion lost",
    allocated: 0,
    owner: "Priya Nair",
    team: "Infrastructure",
    expires: "18 days",
    daysLeft: 18,
    status: "At risk",
    tone: "warn",
  },
  {
    id: "alloc-signal",
    resourceId: "res-signalworks",
    name: "SignalWorks Analytics",
    provider: "SignalWorks",
    category: "Tooling",
    value: "1 year free",
    usedPct: 34,
    note: "1 year free · renews Jul",
    allocated: 0,
    owner: "Kavya Nair",
    team: "Product",
    expires: "Jul 2026",
    daysLeft: 87,
    status: "Active",
    tone: "good",
  },
  {
    id: "alloc-arcgis",
    resourceId: "res-arcgis",
    name: "ArcGIS Pro licenses × 2",
    provider: "Esri India",
    category: "Tooling",
    value: "₹1.4 L / yr",
    usedPct: 50,
    note: "2 seats · renews Mar 2027",
    allocated: 1.4,
    owner: "Sunita Rao",
    team: "Agronomy",
    expires: "Mar 2027",
    daysLeft: 332,
    status: "Active",
    tone: "good",
  },
  {
    id: "alloc-interns",
    resourceId: "res-interns",
    name: "Agronomy interns × 2",
    provider: "StartupHub Talent Pool",
    category: "Talent",
    value: "6 months",
    usedPct: 66,
    note: "2 of 3 months consumed",
    allocated: 1.8,
    owner: "Vikash Jha",
    team: "Agronomy",
    expires: "Sep 2026",
    daysLeft: 168,
    status: "Active",
    tone: "good",
  },
  {
    id: "alloc-legal",
    resourceId: "res-ip-retainer",
    name: "Legal retainer — FER response",
    provider: "SH Legal Desk",
    category: "IP & legal",
    value: "1 session",
    usedPct: 100,
    note: "Session used — renew before the Jun 02 FER",
    allocated: 0.35,
    owner: "Dr. Meera Krishnan",
    team: "Legal",
    expires: "Apr 30",
    daysLeft: 20,
    status: "Depleted",
    tone: "warn",
  },
  {
    id: "alloc-lab",
    resourceId: "res-lab-bench",
    name: "Wet lab bench — CIED Pune",
    provider: "CIED Pune",
    category: "Lab time",
    value: "40 hrs",
    usedPct: 25,
    note: "30 of 40 hours still open",
    allocated: 0,
    owner: "Sunita Rao",
    team: "Agronomy",
    expires: "Apr 30",
    daysLeft: 20,
    status: "Active",
    tone: "good",
  },
  {
    id: "alloc-pilot",
    resourceId: "res-northgate",
    name: "Northgate pilot — field trial",
    provider: "Northgate FPO",
    category: "Field access",
    value: "1 season",
    usedPct: 40,
    note: "Cooperative pays the balance",
    allocated: 0.4,
    owner: "Lakshmi Iyer",
    team: "GTM",
    expires: "Aug 2026",
    daysLeft: 120,
    status: "Active",
    tone: "good",
  },
  {
    id: "alloc-sandbox",
    resourceId: "res-sat-sandbox",
    name: "Satellite Data Sandbox",
    provider: "ISRO Tech Transfer",
    category: "Data",
    value: "Free tier",
    usedPct: 85,
    note: "Quota nearly exhausted — the next batch needs approval",
    allocated: 0,
    owner: "Kavya Nair",
    team: "Data",
    expires: "Jul 2026",
    daysLeft: 87,
    status: "At risk",
    tone: "warn",
  },
  {
    id: "alloc-edge",
    resourceId: "res-edge-kit",
    name: "Edge inference device kit × 3",
    provider: "Bharat AI Compute",
    category: "Compute",
    value: "₹2.4 L",
    usedPct: 35,
    note: "3 units · installed at 2 pilot sites",
    allocated: 2.4,
    owner: "Priya Nair",
    team: "Infrastructure",
    expires: "Dec 2026",
    daysLeft: 260,
    status: "Active",
    tone: "good",
  },
];

/* Utilisation weighted by committed spend — the share of the budget
   actually being used. Zero-cost grants do not move it. */
export function budgetUtilisation(rows: Allocation[] = allocations): number {
  const spend = rows.reduce((sum, a) => sum + a.allocated, 0);
  if (spend === 0) return 0;
  const used = rows.reduce((sum, a) => sum + a.usedPct * a.allocated, 0);
  return Math.round(used / spend);
}

/* The published figure the allocation screen and the dashboard quote —
   computed from the ledger, never typed in by hand. */
export const budgetUtilisationPct = budgetUtilisation(allocations);

/* Credit lines — dollars, not lakhs. They burn down, they do not
   appear on the rupee budget. */
export const creditLines: {
  id: string;
  label: string;
  provider: string;
  granted: number;
  used: number;
  expires: string;
  daysLeft: number;
  allocatedTo: string;
}[] = [
  {
    id: "cl-nimbus",
    label: "Cloud credits — Tier I",
    provider: "Nimbus Cloud Research",
    granted: 25000,
    used: 15500,
    expires: "Dec 2026",
    daysLeft: 260,
    allocatedTo: "Inference workloads",
  },
  {
    id: "cl-gpu",
    label: "GPU cluster grant",
    provider: "Nimbus Cloud Research",
    granted: 40000,
    used: 31200,
    expires: "18 days",
    daysLeft: 18,
    allocatedTo: "v2 load test + Q3 training",
  },
];

/* Dollars a founder has left to lose. */
export const creditsRemaining = creditLines.reduce((sum, l) => sum + (l.granted - l.used), 0);

/* The credit line that lapses first — the one every screen warns about. */
export const expiringCredit = creditLines
  .filter((l) => l.daysLeft <= 30)
  .sort((a, b) => a.daysLeft - b.daysLeft)[0];

export function formatUsd(amount: number): string {
  return `$${amount.toLocaleString("en-US")}`;
}

/* ── Requests ──────────────────────────────────────────────── */

export type RequestStatus =
  | "Approved"
  | "In review"
  | "Submitted"
  | "Shortlisting"
  | "Rejected"
  | "Fulfilled";

export type ResourceRequest = {
  id: string;
  resourceId: string;
  item: string;
  category: ResourceCategory;
  qty: string;
  /* Never higher than the catalogue fit of the resource it asks for. */
  fit: number;
  status: RequestStatus;
  tone: Tone;
  submitted: string;
  owner: string;
  sla: string;
  /* The sla in days — the same number the approval route promises. */
  slaDays: number;
  note: string;
};

export const resourceRequests: ResourceRequest[] = [
  {
    id: "req-gpu",
    resourceId: "res-gpu-grant",
    item: "GPU cluster — v2 load test",
    category: "Compute",
    qty: "$8.2K",
    fit: 96,
    status: "Approved",
    tone: "good",
    submitted: "Apr 02",
    owner: "Priya Nair",
    sla: "3 days",
    slaDays: 3,
    note: "Provisioned against the cluster grant — 22% of the line still unspent",
  },
  {
    id: "req-legal",
    resourceId: "res-ip-retainer",
    item: "Legal retainer — FER response",
    category: "IP & legal",
    qty: "1 session",
    fit: 91,
    status: "Submitted",
    tone: "default",
    submitted: "Apr 01",
    owner: "Dr. Meera Krishnan",
    sla: "4 days",
    slaDays: 4,
    note: "FER response is due Jun 02 — the retainer session has to land first",
  },
  {
    id: "req-edge",
    resourceId: "res-edge-kit",
    item: "Edge inference device kit × 3",
    category: "Compute",
    qty: "₹2.4 L",
    fit: 79,
    status: "Approved",
    tone: "good",
    submitted: "Apr 05",
    owner: "Priya Nair",
    sla: "3 days",
    slaDays: 3,
    note: "2 of 3 units installed — the third is at the Nagpur site",
  },
  {
    id: "req-arcgis",
    resourceId: "res-arcgis",
    item: "ArcGIS Pro licenses × 2",
    category: "Tooling",
    qty: "2 seats",
    fit: 88,
    status: "In review",
    tone: "warn",
    submitted: "Mar 28",
    owner: "Sunita Rao",
    sla: "2 days",
    slaDays: 2,
    note: "Renewal to Mar 2027 — waiting on finance sign-off",
  },
  {
    id: "req-interns",
    resourceId: "res-interns",
    item: "Agronomy interns × 2 (via talent pool)",
    category: "Talent",
    qty: "6 mo",
    fit: 85,
    status: "Shortlisting",
    tone: "accent",
    submitted: "Mar 24",
    owner: "Vikash Jha",
    sla: "10 days",
    slaDays: 10,
    note: "3 candidates in the pool — one is already at the pilot site",
  },
  {
    id: "req-lab",
    resourceId: "res-lab-bench",
    item: "Wet lab bench — CIED Pune",
    category: "Lab time",
    qty: "40 hrs",
    fit: 74,
    status: "Approved",
    tone: "good",
    submitted: "Mar 20",
    owner: "Sunita Rao",
    sla: "5 days",
    slaDays: 5,
    note: "Booked for Apr 14 — 30 hours still unspent",
  },
  {
    id: "req-pilot",
    resourceId: "res-northgate",
    item: "Northgate pilot — 1 season field trial",
    category: "Field access",
    qty: "1 season",
    fit: 68,
    status: "In review",
    tone: "warn",
    submitted: "Apr 03",
    owner: "Lakshmi Iyer",
    sla: "5 days",
    slaDays: 5,
    note: "The cooperative covers the balance of the cost",
  },
  {
    id: "req-fellow",
    resourceId: "res-fellowship",
    item: "AgriAI research fellowship",
    category: "Talent",
    qty: "12 mo",
    fit: 62,
    status: "Submitted",
    tone: "default",
    submitted: "Apr 04",
    owner: "Ravi Sharma",
    sla: "10 days",
    slaDays: 10,
    note: "Nomination closes Apr 18 — too late for the Q2 plan",
  },
];

/* Who signs off what, and how long they take. */
export const approvalRoutes: {
  category: ResourceCategory;
  approver: string;
  role: string;
  sla: string;
  note: string;
  tone: Tone;
}[] = [
  { category: "Compute", approver: "Ananya Rao", role: "CFO + programme office", sla: "3 days", note: "Anything that draws down a credit line", tone: "accent" },
  { category: "Cloud credits", approver: "Ananya Rao", role: "CFO", sla: "3 days", note: "Top-ups only — the existing line needs no approval", tone: "accent" },
  { category: "Tooling", approver: "Priya Nair", role: "CTO", sla: "2 days", note: "Seats and renewals under ₹2 L", tone: "default" },
  { category: "Data", approver: "Kavya Nair", role: "Head of Data", sla: "5 days", note: "Sandbox access and dataset exports", tone: "good" },
  { category: "IP & legal", approver: "Ravi Sharma", role: "Founder + external counsel", sla: "4 days", note: "Anything that touches a filing or a share", tone: "warn" },
  { category: "Talent", approver: "Neha Kulkarni", role: "Head of People + Founder", sla: "10 days", note: "Fellowships and paid placements", tone: "good" },
  { category: "Lab time", approver: "Sunita Rao", role: "Head of Agronomy", sla: "5 days", note: "Bench bookings and consumables", tone: "default" },
  { category: "Field access", approver: "Lakshmi Iyer", role: "Head of GTM", sla: "5 days", note: "Anything with a revenue share attached", tone: "good" },
];

/* ── Matching ──────────────────────────────────────────────── */

export const matchPipeline = [
  { step: "Read", body: "Your live requests, the budget cap and what your teams are already blocked on" },
  { step: "Score", body: "Five weighted dimensions, 0–100 each" },
  { step: "Rank", body: "Best fit first; ties broken by how soon the provider can deliver" },
  { step: "Claim", body: "A request with the fit score attached, routed to the right approver" },
];

export type PreferenceOption = { value: string; confidence: number; note: string };

/* Choosing a more specific need raises the model's confidence — which
   is the whole point of the matching screen. */
export const preferenceChoices: Record<string, PreferenceOption[]> = {
  need: [
    { value: "Anything resource-shaped", confidence: 39, note: `Too broad — ${resourceCatalogue.length} resources could claim it` },
    { value: "GPU credits for the v2 load test", confidence: 76, note: "Narrows to compute and credit lines" },
    { value: "$8.2K GPU credit inside 2 weeks", confidence: 94, note: "One unambiguous need, one obvious resource" },
  ],
  urgency: [
    { value: "Whenever it comes up", confidence: 43, note: "Nothing downstream is waiting on it" },
    { value: "Within 2 weeks", confidence: 76, note: "Matches the Apr 22 demo deadline" },
    { value: "Before the Apr 22 demo day", confidence: 93, note: "Highest confidence, tightest window" },
  ],
  constraint: [
    { value: "Free grants only", confidence: 47, note: `${freeCatalogue.length} of ${resourceCatalogue.length} resources qualify` },
    { value: "Up to ₹2 L, any lead time", confidence: 74, note: "Inside the quarterly cap" },
    { value: "Under ₹1 L and provisioned in 5 days", confidence: 90, note: "Highest confidence, smallest search" },
  ],
};

export const preferenceLabels: { key: string; label: string }[] = [
  { key: "need", label: "What you need" },
  { key: "urgency", label: "How soon" },
  { key: "constraint", label: "Hard constraint" },
];

export const declinedResources = [
  {
    resource: "Premium satellite imagery",
    reason: "₹4.8 L a year — more than the whole quarterly resource budget",
    when: "Mar 30",
  },
  {
    resource: "Custom model-training consultancy",
    reason: "A hiring decision, not a resource — 3-month engagement over budget",
    when: "Mar 22",
  },
];

export const feedbackSignals = [
  { signal: "Request approved", effect: "+6 stage fit", when: "GPU Compute Grant" },
  { signal: "Budget cap tightened", effect: "+11 cost-to-value weight", when: "This quarter" },
  { signal: "Provider confirmed", effect: "+4 provider reliability", when: "CIED Pune" },
  { signal: "Need narrowed", effect: "+38 match quality", when: "This month" },
];

/* ── Allocation ────────────────────────────────────────────── */

/* A move of an existing resource between teams or sites. */
export const reallocationQueue: {
  id: string;
  move: string;
  from: string;
  to: string;
  saves: string;
  rationale: string;
  requested: string;
  requester: string;
  tone: Tone;
}[] = [
  {
    id: "re-1",
    move: "Move 1 edge inference kit from Bengaluru to Nagpur",
    from: "Infrastructure · Bengaluru",
    to: "Infrastructure · Nagpur",
    saves: "₹0.8 L of cloud spend",
    rationale: "The Nagpur pilot has no on-prem hardware and is running entirely on credit",
    requested: "Apr 06",
    requester: "Priya Nair",
    tone: "accent",
  },
  {
    id: "re-2",
    move: "Extend SignalWorks to the Agronomy team",
    from: "Product · 1 seat",
    to: "Agronomy · 2 seats",
    saves: "No extra cost",
    rationale: "Free tier already covers 3 seats — nobody claimed the other two",
    requested: "Apr 05",
    requester: "Sunita Rao",
    tone: "good",
  },
  {
    id: "re-3",
    move: "Release 12 unused GPU cluster hours to the training pool",
    from: "Infrastructure · idle",
    to: "Data · training pool",
    saves: "$1,050 of the grant",
    rationale: "Those hours lapse with the grant in 18 days if nobody books them",
    requested: "Apr 04",
    requester: "Kavya Nair",
    tone: "warn",
  },
];

/* What the dashboard's resource card quotes. */
export const resourceStatus = {
  active: allocations.filter((a) => a.status !== "Depleted").length,
  depleted: allocations.filter((a) => a.status === "Depleted").length,
  credits: formatUsd(creditsRemaining),
  expiring: `${expiringCredit.label} · ${expiringCredit.daysLeft} days`,
};
