/* StartupHub Labs — resource datasets.
 *
 * One shared source for the four resource screens (inventory, requests,
 * allocation, utilization). Modelled on the founder's `resource-data.ts`
 * and held to the same discipline: the committed spend is the sum of
 * every allocation, the team split adds up to that same number, and the
 * utilisation figures match what the incubator dashboard already shows.
 * A test asserts all three.
 *
 * Tonance values map onto the Badge palette:
 * default | accent | good | warn | bad
 */

/* ── Types ─────────────────────────────────────────────────────── */

export type Tone = "default" | "accent" | "good" | "warn" | "bad";

export type ResourceCategory =
  | "Compute"
  | "Cloud credits"
  | "Lab & hardware"
  | "Legal & IP"
  | "Workspace"
  | "Data";

export type InventoryItem = {
  id: string;
  name: string;
  category: ResourceCategory;
  pool: string;
  capacity: string;
  used: number;
  unit: string;
  cost: string;
  note: string;
  tone: Tone;
};

export type ResourceKpi = {
  label: string;
  value: string;
  note: string;
  tone: Tone;
};

export type CategoryCoverage = {
  category: ResourceCategory;
  note: string;
  supplied: number;
  tone: Tone;
};

export type ResourceProvider = {
  name: string;
  kind: string;
  reliability: number;
  items: number;
  note: string;
  tone: Tone;
};

export type RequestStatus =
  | "Approved"
  | "Pending"
  | "Rejected"
  | "Partially approved";

export type ResourceRequest = {
  id: string;
  startup: string;
  startupSlug: string;
  item: string;
  category: ResourceCategory;
  qty: string;
  /* Rupees in lakhs — what the request is worth if approved. */
  value: number;
  submitted: string;
  approver: string;
  status: RequestStatus;
  sla: string;
  note: string;
  tone: Tone;
};

export type ApprovalRoute = {
  category: ResourceCategory;
  approver: string;
  role: string;
  sla: string;
  note: string;
  tone: Tone;
};

export type Turnaround = {
  category: ResourceCategory;
  days: number;
  volume: number;
  tone: Tone;
};

export type CoverageGap = {
  area: string;
  asked: number;
  needed: number;
  note: string;
  tone: Tone;
};

export type RequestTrend = {
  month: string;
  raised: number;
  approved: number;
};

export type BudgetLedger = {
  team: string;
  spend: number;
  pct: number;
  startups: number;
  note: string;
  tone: Tone;
};

export type CreditLine = {
  id: string;
  label: string;
  provider: string;
  granted: number;
  used: number;
  unit: string;
  expires: string;
  daysLeft: number;
  allocatedTo: string;
  tone: Tone;
};

export type StartupAllocation = {
  startup: string;
  startupSlug: string;
  resource: string;
  value: number;
  share: number;
  tone: Tone;
};

export type Reallocation = {
  id: string;
  move: string;
  from: string;
  to: string;
  saves: string;
  rationale: string;
  requested: string;
  requester: string;
  tone: Tone;
};

export type UtilisationTrend = {
  month: string;
  pool: number;
  lab: number;
  workspace: number;
};

export type UnderusedAsset = {
  resource: string;
  used: number;
  idle: string;
  recommendation: string;
  tone: Tone;
};

export type ProviderEfficiency = {
  provider: string;
  supplied: number;
  utilisation: number;
  note: string;
  tone: Tone;
};

/* ── The inventory ─────────────────────────────────────────────── */

export const INVENTORY: InventoryItem[] = [
  {
    id: "res-gpu",
    name: "GPU cluster (32× A100)",
    category: "Compute",
    pool: "Nimbus Cloud grant",
    capacity: "32 GPUs",
    used: 78,
    unit: "GPU-hours",
    cost: "₹0 · grant funded",
    note: "AI block oversubscribed 1.4×",
    tone: "warn",
  },
  {
    id: "res-wetlab",
    name: "Wet lab benches × 6",
    category: "Lab & hardware",
    pool: "CIED partnership",
    capacity: "6 benches",
    used: 46,
    unit: "bench-hours",
    cost: "₹0 · partner funded",
    note: "Underutilized — promote to bio cohort",
    tone: "default",
  },
  {
    id: "res-electronics",
    name: "Electronics lab access",
    category: "Lab & hardware",
    pool: "KSM shared infra",
    capacity: "3 stations",
    used: 62,
    unit: "station-days",
    cost: "₹0.4 L / quarter",
    note: "On plan",
    tone: "default",
  },
  {
    id: "res-legal",
    name: "Legal sessions / month",
    category: "Legal & IP",
    pool: "SH Legal Desk",
    capacity: "12 sessions",
    used: 64,
    unit: "sessions",
    cost: "₹0.2 L / month",
    note: "3 unused slots this month",
    tone: "default",
  },
  {
    id: "res-coworking",
    name: "Co-working seats",
    category: "Workspace",
    pool: "StartupHub Labs",
    capacity: "120 seats",
    used: 88,
    unit: "seats",
    cost: "₹0.9 L / month",
    note: "Near capacity — review waitlist",
    tone: "warn",
  },
  {
    id: "res-credits",
    name: "Cloud credits pool",
    category: "Cloud credits",
    pool: "Nimbus Cloud Research",
    capacity: "₹24 L credit",
    used: 62,
    unit: "credit",
    cost: "₹24 L committed",
    note: "Burns down against usage",
    tone: "accent",
  },
  {
    id: "res-data",
    name: "Satellite & rainfall data",
    category: "Data",
    pool: "ISRO Tech Transfer",
    capacity: "2 datasets",
    used: 34,
    unit: "datasets",
    cost: "₹0 · public body",
    note: "Access approval takes 2–3 weeks, then free forever",
    tone: "good",
  },
];

export const RESOURCE_KPIS: ResourceKpi[] = [
  { label: "Pool size", value: "7 assets", note: "across 5 providers", tone: "accent" },
  { label: "Average utilisation", value: "62%", note: "up 6 pts since Jan", tone: "good" },
  { label: "Credits deployed", value: "₹14.9 L", note: "of ₹24 L committed", tone: "accent" },
  { label: "Open requests", value: "2", note: "1 awaiting approval", tone: "warn" },
];

export const CATEGORY_COVERAGE: CategoryCoverage[] = [
  { category: "Compute", note: "GPU hours and edge hardware", supplied: 1, tone: "accent" },
  { category: "Cloud credits", note: "Provider credit lines that burn down", supplied: 1, tone: "accent" },
  { category: "Lab & hardware", note: "Wet lab, electronics and test rigs", supplied: 2, tone: "good" },
  { category: "Legal & IP", note: "Counsel, filings and contract design", supplied: 1, tone: "warn" },
  { category: "Workspace", note: "Desks, pods and the investor lounge", supplied: 1, tone: "warn" },
  { category: "Data", note: "Satellite, rainfall and field datasets", supplied: 1, tone: "good" },
];

export const PROVIDERS: ResourceProvider[] = [
  { name: "Nimbus Cloud Research", kind: "Compute partner", reliability: 91, items: 2, note: "Responds in under a day, grants credits the same week", tone: "accent" },
  { name: "CIED Pune", kind: "Lab partnership", reliability: 84, items: 1, note: "Wet lab benches shared at no cost to the programme", tone: "good" },
  { name: "SH Legal Desk", kind: "Legal partner", reliability: 93, items: 1, note: "Pro bono slots for cohort startups — limited to 4 a month", tone: "good" },
  { name: "Karnataka Startup Mission", kind: "State shared infra", reliability: 78, items: 1, note: "Electronics stations billed at cost", tone: "default" },
  { name: "ISRO Tech Transfer", kind: "Public data body", reliability: 87, items: 1, note: "Approval takes 2–3 weeks, then the data is free forever", tone: "accent" },
];

/* ── Requests ──────────────────────────────────────────────────── */

export const RESOURCE_REQUESTS: ResourceRequest[] = [
  { id: "rq-1", startup: "Lumen AI", startupSlug: "lumen-ai", item: "GPU hours for load test", category: "Compute", qty: "₹8.2 K credit", value: 8.2, submitted: "02 Apr 2026", approver: "Arjun Nair", status: "Approved", sla: "3 days", note: "Load test ahead of the Series A diligence", tone: "good" },
  { id: "rq-2", startup: "BloomBio", startupSlug: "bloombio", item: "Wet lab for assay validation", category: "Lab & hardware", qty: "40 hrs", value: 4.0, submitted: "04 Apr 2026", approver: "Kavi Sharma", status: "Pending", sla: "2 days", note: "Waiting on bench availability at CIED", tone: "warn" },
  { id: "rq-3", startup: "FinEdge", startupSlug: "finedge", item: "ArcGIS seats × 2", category: "Data", qty: "2 seats", value: 1.2, submitted: "05 Apr 2026", approver: "Kavi Sharma", status: "Pending", sla: "1 day", note: "Same-day activation on an annual invoice", tone: "warn" },
  { id: "rq-4", startup: "OrbitalWorks", startupSlug: "orbitalworks", item: "Vibration testing rig", category: "Lab & hardware", qty: "12 hrs", value: 2.4, submitted: "28 Mar 2026", approver: "Kavi Sharma", status: "Approved", sla: "2 days", note: "Rig time booked for the ground station batch", tone: "good" },
  { id: "rq-5", startup: "TerraGrid", startupSlug: "terragrid", item: "Cloud credits for simulation run", category: "Cloud credits", qty: "₹3.0 L credit", value: 3.0, submitted: "26 Mar 2026", approver: "Arjun Nair", status: "Partially approved", sla: "3 days", note: "₹2 L approved, ₹1 L held for the next cycle", tone: "accent" },
  { id: "rq-6", startup: "AquaPure", startupSlug: "aquapure", item: "Pilot legal review — supply agreement", category: "Legal & IP", qty: "3 sessions", value: 0.9, submitted: "24 Mar 2026", approver: "Nandita Bose", status: "Approved", sla: "5 days", note: "Pro bono slot used from the SH Legal Desk allocation", tone: "good" },
  { id: "rq-7", startup: "FreshChain", startupSlug: "freshchain", item: "Desk extension during the conflict", category: "Workspace", qty: "2 months", value: 0.6, submitted: "22 Mar 2026", approver: "Meera Iyer", status: "Rejected", sla: "1 day", note: "No free desks — pair the team on the waitlist instead", tone: "bad" },
];

export const APPROVAL_ROUTES: ApprovalRoute[] = [
  { category: "Compute", approver: "Arjun Nair", role: "Funding Lead", sla: "3 days", note: "Anything that draws down a credit line", tone: "accent" },
  { category: "Cloud credits", approver: "Arjun Nair", role: "Funding Lead", sla: "3 days", note: "Top-ups only — the existing line needs no approval", tone: "accent" },
  { category: "Lab & hardware", approver: "Kavi Sharma", role: "Operations", sla: "2 days", note: "Bench and rig time, booked against the partner quota", tone: "default" },
  { category: "Legal & IP", approver: "Nandita Bose", role: "IPR Counsel", sla: "5 days", note: "Pro bono slots — 4 a month across the cohort", tone: "warn" },
  { category: "Workspace", approver: "Meera Iyer", role: "Program Director", sla: "1 day", note: "Desks, pods and extensions", tone: "default" },
  { category: "Data", approver: "Kavi Sharma", role: "Operations", sla: "5 days", note: "Public datasets — approval only for restricted sets", tone: "default" },
];

export const TURNAROUND: Turnaround[] = [
  { category: "Workspace", days: 1, volume: 18, tone: "good" },
  { category: "Lab & hardware", days: 2, volume: 11, tone: "good" },
  { category: "Compute", days: 3, volume: 7, tone: "accent" },
  { category: "Cloud credits", days: 3, volume: 5, tone: "accent" },
  { category: "Legal & IP", days: 5, volume: 6, tone: "warn" },
  { category: "Data", days: 5, volume: 3, tone: "warn" },
];

export const COVERAGE_GAPS: CoverageGap[] = [
  { area: "Bio assay consumables", asked: 0, needed: 3, note: "Nobody has asked — BloomBio needs it next", tone: "bad" },
  { area: "Holographic test ranges", asked: 0, needed: 1, note: "Space startups cannot self-fund this", tone: "bad" },
  { area: "Field data collection", asked: 1, needed: 4, note: "AgriTech cohort under-uses satellite sets", tone: "warn" },
  { area: "Certification support", asked: 2, needed: 3, note: "Two startups pre-emptively asked", tone: "warn" },
  { area: "Cloud credits", asked: 5, needed: 5, note: "Fully covered", tone: "good" },
];

export const REQUEST_TREND: RequestTrend[] = [
  { month: "Nov", raised: 9, approved: 8 },
  { month: "Dec", raised: 12, approved: 10 },
  { month: "Jan", raised: 15, approved: 13 },
  { month: "Feb", raised: 11, approved: 11 },
  { month: "Mar", raised: 17, approved: 14 },
  { month: "Apr", raised: 6, approved: 3 },
];

/* ── Allocation ────────────────────────────────────────────────── */

/* Rupees in lakhs. The sum of `spend` across the ledger equals
   `committed` below — a test asserts it. */
export const RESOURCE_BUDGET = {
  cap: 32,
  committed: 21.4,
  period: "Q2 FY27 · Apr–Jun",
  owner: "Kavi Sharma · Operations",
};

export const BUDGET_LEDGER: BudgetLedger[] = [
  { team: "Compute & AI", spend: 6.2, pct: 29, startups: 12, note: "GPU hours, edge kits and the credit line", tone: "accent" },
  { team: "Lab & hardware", spend: 4.8, pct: 22, startups: 8, note: "Wet lab, electronics and test rigs", tone: "accent" },
  { team: "Workspace", spend: 3.6, pct: 17, startups: 34, note: "Desks, pods and the investor lounge", tone: "warn" },
  { team: "Legal & IP", spend: 2.1, pct: 10, startups: 9, note: "Pro bono slots and filing support", tone: "warn" },
  { team: "Data & tooling", spend: 1.9, pct: 9, startups: 11, note: "Seats, licences and public datasets", tone: "default" },
  { team: "Programme overhead", spend: 2.8, pct: 13, startups: 0, note: "Facilities, partner fees and insurance", tone: "default" },
];

export const CREDIT_LINES: CreditLine[] = [
  { id: "cl-nimbus", label: "Cloud credits — Tier I", provider: "Nimbus Cloud Research", granted: 16, used: 9.4, unit: "₹ L", expires: "30 Jun 2026", daysLeft: 81, allocatedTo: "Compute & AI", tone: "accent" },
  { id: "cl-nimbus-2", label: "Cloud credits — Tier II", provider: "Nimbus Cloud Research", granted: 8, used: 5.5, unit: "₹ L", expires: "30 Jun 2026", daysLeft: 81, allocatedTo: "Compute & AI", tone: "warn" },
  { id: "cl-cied", label: "Wet lab bench quota", provider: "CIED Pune", granted: 6, used: 2.8, unit: "benches", expires: "31 Aug 2026", daysLeft: 143, allocatedTo: "Lab & hardware", tone: "good" },
  { id: "cl-legal", label: "Pro bono legal slots", provider: "SH Legal Desk", granted: 4, used: 1.2, unit: "slots / mo", expires: "31 May 2026", daysLeft: 51, allocatedTo: "Legal & IP", tone: "warn" },
  { id: "cl-ksm", label: "Electronics station quota", provider: "Karnataka Startup Mission", granted: 3, used: 1.9, unit: "stations", expires: "30 Sep 2026", daysLeft: 183, allocatedTo: "Lab & hardware", tone: "good" },
];

export const STARTUP_ALLOCATIONS: StartupAllocation[] = [
  { startup: "Lumen AI", startupSlug: "lumen-ai", resource: "GPU cluster", value: 3.2, share: 24, tone: "accent" },
  { startup: "AquaPure", startupSlug: "aquapure", resource: "Wet lab benches", value: 2.4, share: 18, tone: "good" },
  { startup: "OrbitalWorks", startupSlug: "orbitalworks", resource: "Electronics lab", value: 2.1, share: 16, tone: "accent" },
  { startup: "TerraGrid", startupSlug: "terragrid", resource: "Cloud credits", value: 1.9, share: 14, tone: "accent" },
  { startup: "MedSync", startupSlug: "medsync", resource: "Legal sessions", value: 1.4, share: 10, tone: "default" },
  { startup: "FinEdge", startupSlug: "finedge", resource: "Data licences", value: 1.1, share: 8, tone: "default" },
  { startup: "EduFold", startupSlug: "edufold", resource: "Co-working seats", value: 0.8, share: 6, tone: "default" },
  { startup: "BloomBio", startupSlug: "bloombio", resource: "Wet lab benches", value: 0.6, share: 4, tone: "warn" },
];

export const REALLOCATIONS: Reallocation[] = [
  {
    id: "re-1",
    move: "Move 6 bench-days from AgriTech to Bio cohort",
    from: "Wet lab benches",
    to: "Bio (BloomBio, HealthLoop)",
    saves: "₹0.4 L",
    rationale: "AgriTech demand fell after the Coorg pilot; the bio cohort cannot start without bench time",
    requested: "2 days ago",
    requester: "Kavi Sharma",
    tone: "warn",
  },
  {
    id: "re-2",
    move: "Release 2 unused Tier II credit hours",
    from: "Cloud credits — Tier II",
    to: "Lumen AI load testing",
    saves: "₹1.0 L",
    rationale: "Tier II is 75% unclaimed and expires with Tier I on 30 Jun",
    requested: "5 days ago",
    requester: "Arjun Nair",
    tone: "bad",
  },
  {
    id: "re-3",
    move: "Convert 3 unused legal slots into filing support",
    from: "Legal sessions",
    to: "IP filing clinic for Cohort VII",
    saves: "₹0.2 L",
    rationale: "Only 1 of 4 pro bono slots was used last month, and filings are gating demo day",
    requested: "1 week ago",
    requester: "Nandita Bose",
    tone: "accent",
  },
];

/* ── Utilisation ───────────────────────────────────────────────── */

export const UTILISATION_TREND: UtilisationTrend[] = [
  { month: "Nov", pool: 48, lab: 38, workspace: 72 },
  { month: "Dec", pool: 51, lab: 41, workspace: 76 },
  { month: "Jan", pool: 55, lab: 40, workspace: 79 },
  { month: "Feb", pool: 58, lab: 43, workspace: 83 },
  { month: "Mar", pool: 64, lab: 45, workspace: 86 },
  { month: "Apr", pool: 62, lab: 46, workspace: 88 },
];

export const UNDERUSED_ASSETS: UnderusedAsset[] = [
  { resource: "Satellite & rainfall data", used: 34, idle: "₹0 · public body", recommendation: "AgriTech cohort under-uses the sets — book a walkthrough", tone: "bad" },
  { resource: "Wet lab benches", used: 46, idle: "2.8 benches free", recommendation: "Move 6 bench-days to the bio cohort", tone: "warn" },
  { resource: "Cloud credits — Tier II", used: 75, idle: "₹2.0 L unclaimed", recommendation: "Release to Lumen AI before 30 Jun", tone: "warn" },
  { resource: "Legal sessions", used: 64, idle: "3 slots free", recommendation: "Convert to filing support for Cohort VII", tone: "warn" },
  { resource: "Electronics lab access", used: 62, idle: "1.1 stations free", recommendation: "On plan — hold", tone: "default" },
];

export const PROVIDER_EFFICIENCY: ProviderEfficiency[] = [
  { provider: "SH Legal Desk", supplied: 6, utilisation: 64, note: "Pro bono slots go unused when filings are not gated early", tone: "warn" },
  { provider: "CIED Pune", supplied: 11, utilisation: 46, note: "Bench time is the biggest idle asset in the pool", tone: "bad" },
  { provider: "Nimbus Cloud Research", supplied: 12, utilisation: 62, note: "Responds same-week, but Tier II is unclaimed", tone: "accent" },
  { provider: "ISRO Tech Transfer", supplied: 3, utilisation: 34, note: "Approval delay, not demand — the datasets are free forever", tone: "bad" },
  { provider: "Karnataka Startup Mission", supplied: 9, utilisation: 78, note: "Billed at cost and reliably used", tone: "good" },
];
