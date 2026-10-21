/* ──────────────────────────────────────────────────────────────
   Incubation workspace data.

   Shared by the four founder incubation screens — Applications,
   Discover, Workspace and Milestones — so the numbers a founder
   reads on one screen never drift from the next.

   Tone values map onto the Badge component palette:
   default | accent | good | warn | bad
   ────────────────────────────────────────────────────────────── */

export type Tone = "default" | "accent" | "good" | "warn" | "bad";

/* ── Applications ─────────────────────────────────────────── */

export const applications = [
  {
    id: "app-climate",
    program: "Climate Sandbox Accelerator",
    org: "Horizon Fund",
    status: "Under review",
    tone: "warn" as Tone,
    stage: 3,
    stages: 4,
    applied: "Mar 22",
    decision: "Apr 12",
    next: "Panel review — Apr 12",
    value: "₹8.0L",
    fit: 91,
  },
  {
    id: "app-agritech",
    program: "AgriTech Innovation Challenge",
    org: "National Agri Mission",
    status: "Accepted",
    tone: "good" as Tone,
    stage: 4,
    stages: 4,
    applied: "Mar 10",
    decision: "Mar 28",
    next: "Cohort onboarding — Apr 01",
    value: "₹12.0L",
    fit: 88,
  },
  {
    id: "app-deeetech",
    program: "DeepTech Scale Lab",
    org: "CIED Pune",
    status: "Draft",
    tone: "default" as Tone,
    stage: 1,
    stages: 4,
    applied: "—",
    decision: "Apr 30",
    next: "Submit application — Apr 30",
    value: "₹6.5L",
    fit: 84,
  },
];

export const pipelineStages = [
  { stage: "Draft", count: 1, note: "1 unsubmitted", avg: "—" },
  { stage: "Submitted", count: 1, note: "1 submitted", avg: "2 days" },
  { stage: "Screening", count: 2, note: "eligibility checks", avg: "6 days" },
  { stage: "Panel review", count: 1, note: "in review", avg: "4 days" },
  { stage: "Decision", count: 1, note: "accepted", avg: "9 days" },
];

export const deadlines = [
  {
    date: "Apr 12",
    days: "5 days",
    title: "Climate Sandbox — panel review",
    detail: "Bring the KPI baseline and pilot ROI model.",
    tone: "warn" as Tone,
  },
  {
    date: "Apr 15",
    days: "8 days",
    title: "Startup Karnataka Grant Window opens",
    detail: "Rolling 30-day window · fit score 93.",
    tone: "accent" as Tone,
  },
  {
    date: "Apr 30",
    days: "23 days",
    title: "DeepTech Scale Lab — submit application",
    detail: "Draft is 60% complete — 3 fields outstanding.",
    tone: "default" as Tone,
  },
  {
    date: "May 02",
    days: "25 days",
    title: "T-Hub Cross-Border Cohort closes",
    detail: "Rolling intake · SEA expansion track.",
    tone: "default" as Tone,
  },
];

export const recommendedPrograms = [
  {
    name: "Startup Karnataka Grant Window",
    fit: 93,
    note: "Your 14-state footprint qualifies for the max slab",
    when: "Opens Apr 15",
  },
  {
    name: "Space-Tech Transfer Program",
    fit: 81,
    note: "ISRO data sandbox matches your inference stack",
    when: "Rolling",
  },
  {
    name: "T-Hub Cross-Border Cohort",
    fit: 77,
    note: "SEA expansion is your stated Q3 goal",
    when: "May 02",
  },
  {
    name: "AgriTech Innovation Challenge — Cohort VII",
    fit: 74,
    note: "Past cohort took 4 of 11 AgriTech ventures to Series A",
    when: "Opens Jun 01",
  },
];

export const benefitUsage = [
  { label: "Mentor hours", used: 40, total: 50, unit: "hrs" },
  { label: "Lab credits", used: 3.2, total: 5, unit: "₹L" },
  { label: "Legal sessions", used: 3, total: 6, unit: "" },
  { label: "Peer AMAs", used: 11, total: 16, unit: "" },
];

export const applicationMaterials = [
  { name: "Founder profile & team roster", state: "Complete", tone: "good" as Tone },
  { name: "12-slide pitch deck", state: "Complete", tone: "good" as Tone },
  { name: "Financial model (3-year)", state: "Complete", tone: "good" as Tone },
  { name: "Customer validation report", state: "In review", tone: "warn" as Tone },
  { name: "IP & trademark filing receipt", state: "Missing", tone: "bad" as Tone },
  { name: "Prototype demo recording", state: "Missing", tone: "bad" as Tone },
];

export const activityFeed = [
  {
    who: "Horizon Fund",
    what: "moved your Climate Sandbox application to panel review",
    when: "2 hours ago",
    tone: "accent" as Tone,
  },
  {
    who: "You",
    what: "uploaded the revised customer validation report",
    when: "Yesterday",
    tone: "default" as Tone,
  },
  {
    who: "National Agri Mission",
    what: "issued an acceptance letter for AgriTech Innovation Challenge",
    when: "3 days ago",
    tone: "good" as Tone,
  },
  {
    who: "StartupHub Labs",
    what: "released the Cohort VI graduation checklist",
    when: "5 days ago",
    tone: "default" as Tone,
  },
];

/* ── Program / cohort ─────────────────────────────────────── */

export const cohort = {
  program: "StartupHub Labs · Cohort VI",
  track: "AgriTech & Applied AI",
  lead: "Priya Deshmukh",
  leadRole: "Cohort Lead",
  start: "Feb 03",
  end: "May 22",
  weeks: 16,
  progress: 86,
  demoDay: "Apr 28",
  daysToDemo: 19,
  cohortSize: 18,
  batch: "Cohort VI",
};

export const sprintPhases = [
  { name: "Foundations", weeks: "Weeks 1–3", state: "done", tone: "good" as Tone },
  { name: "Product validation", weeks: "Weeks 4–7", state: "done", tone: "good" as Tone },
  { name: "Pilot & scale", weeks: "Weeks 8–12", state: "active", tone: "accent" as Tone },
  { name: "Demo day sprint", weeks: "Weeks 13–16", state: "upcoming", tone: "default" as Tone },
];

export const deliverables = [
  { name: "Validated problem brief", owner: "Ravi Sharma", due: "Mar 14", state: "Approved", tone: "good" as Tone },
  { name: "Pilot deployment report", owner: "Arjun Rao", due: "Apr 18", state: "In review", tone: "warn" as Tone },
  { name: "Unit economics model", owner: "Ananya Rao", due: "Apr 20", state: "In progress", tone: "accent" as Tone },
  { name: "IP filing receipt", owner: "Vikash Jha", due: "Apr 08", state: "Overdue", tone: "bad" as Tone },
  { name: "Investor one-pager", owner: "Kavya Nair", due: "Apr 24", state: "Not started", tone: "default" as Tone },
  { name: "Demo day deck v1", owner: "Ravi Sharma", due: "Apr 26", state: "Not started", tone: "default" as Tone },
];

export const mentorPanel = [
  {
    name: "Dr. Sanjay Mehta",
    focus: "Applied AI · model validation",
    sessions: 8,
    next: "Apr 11 · 15:00",
  },
  {
    name: "Anjali Bhatt",
    focus: "Go-to-market · FPO partnerships",
    sessions: 6,
    next: "Apr 15 · 11:30",
  },
  {
    name: "Kabir Rao",
    focus: "Fundraising · Series A narrative",
    sessions: 5,
    next: "Apr 17 · 16:00",
  },
  {
    name: "Fatima Sheikh",
    focus: "IP & regulatory strategy",
    sessions: 4,
    next: "Apr 19 · 10:00",
  },
];

export const kpiTargets = [
  { label: "Pilot acres under management", actual: 82000, target: 100000, unit: "acres", pct: 82, invert: false },
  { label: "Signed pilot partners", actual: 7, target: 10, unit: "partners", pct: 70, invert: false },
  { label: "Recurring revenue", actual: 46, target: 60, unit: "₹L", pct: 77, invert: false },
  { label: "Detection accuracy", actual: 91, target: 94, unit: "%", pct: 97, invert: false },
  { label: "Cost per acre served", actual: 168, target: 150, unit: "₹", pct: 89, invert: true },
];

export const facilityAccess = [
  { name: "Prototyping studio", booked: "Apr 14 · 10:00–13:00", state: "Confirmed", tone: "good" as Tone },
  { name: "Multispectral test bench", booked: "Apr 16 · 09:00–12:00", state: "Confirmed", tone: "good" as Tone },
  { name: "Investor lounge", booked: "Apr 22 · 14:00–17:00", state: "Pending", tone: "warn" as Tone },
  { name: "Field trial van (Kolar)", booked: "Apr 24 · 06:00–18:00", state: "Pending", tone: "warn" as Tone },
];

export const cohortPeers = [
  { name: "Krishna Iyer", startup: "SoilSync", stage: "Pilot", focus: "Soil nutrient sensing" },
  { name: "Nandini Bose", startup: "HarvestRoute", stage: "Pre-seed", focus: "Cold-chain logistics" },
  { name: "Farhan Ali", startup: "AquaSense", stage: "Seed", focus: "Irrigation automation" },
  { name: "Preeti Menon", startup: "CropCare AI", stage: "Pilot", focus: "Disease diagnostics" },
  { name: "Aditya Kulkarni", startup: "TerraMetrics", stage: "Pre-seed", focus: "Yield forecasting" },
];

/* ── Milestones ────────────────────────────────────────────── */

export const milestones = [
  {
    id: "ms-1",
    name: "Cohort VI final demo",
    phase: "Demo day sprint",
    due: "Apr 28",
    owner: "Ravi Sharma",
    state: "Upcoming",
    tone: "accent" as Tone,
    evidence: "Demo deck + live pilot walkthrough",
  },
  {
    id: "ms-2",
    name: "Mentor hours: 40/50 completed",
    phase: "Pilot & scale",
    due: "Apr 30",
    owner: "Ananya Rao",
    state: "In progress",
    tone: "warn" as Tone,
    evidence: "Session logs in the mentor portal",
  },
  {
    id: "ms-3",
    name: "KPI baseline submitted",
    phase: "Foundations",
    due: "Apr 05",
    owner: "Kavya Nair",
    state: "Completed",
    tone: "good" as Tone,
    evidence: "Baseline deck submitted Apr 05",
  },
  {
    id: "ms-4",
    name: "IP & trademark filing receipt",
    phase: "Product validation",
    due: "Apr 08",
    owner: "Vikash Jha",
    state: "Blocked",
    tone: "bad" as Tone,
    evidence: "Waiting on claims draft from counsel",
  },
  {
    id: "ms-5",
    name: "Three signed pilot partners",
    phase: "Pilot & scale",
    due: "Apr 18",
    owner: "Arjun Rao",
    state: "In progress",
    tone: "warn" as Tone,
    evidence: "7 of 10 signed · 3 in legal review",
  },
  {
    id: "ms-6",
    name: "Unit economics model v2",
    phase: "Pilot & scale",
    due: "Apr 20",
    owner: "Ananya Rao",
    state: "In progress",
    tone: "warn" as Tone,
    evidence: "Cost-per-acre model in review",
  },
  {
    id: "ms-7",
    name: "Problem brief approved",
    phase: "Foundations",
    due: "Mar 14",
    owner: "Ravi Sharma",
    state: "Completed",
    tone: "good" as Tone,
    evidence: "Signed off by cohort lead",
  },
  {
    id: "ms-8",
    name: "Investor one-pager",
    phase: "Demo day sprint",
    due: "Apr 24",
    owner: "Kavya Nair",
    state: "Upcoming",
    tone: "accent" as Tone,
    evidence: "One-pager template with traction proof",
  },
];

export const milestonePhases = [
  { name: "Foundations", done: 4, total: 4, tone: "good" as Tone },
  { name: "Product validation", done: 3, total: 4, tone: "warn" as Tone },
  { name: "Pilot & scale", done: 5, total: 8, tone: "warn" as Tone },
  { name: "Demo day sprint", done: 1, total: 4, tone: "accent" as Tone },
];

export const keyDates = [
  { date: "Apr 08", title: "IP filing receipt due", note: "Hard gate for graduation review" },
  { date: "Apr 18", title: "Pilot deployment report", note: "Reviewed by cohort lead" },
  { date: "Apr 24", title: "Investor one-pager", note: "Feeds the demo day data room" },
  { date: "Apr 28", title: "Demo Day — Cohort VI", note: "19 days remaining" },
  { date: "May 22", title: "Graduation & certificate", note: "Cohort closes" },
];

export const reviewCheckpoints = [
  { name: "Mentor sign-off", reviewer: "Dr. Sanjay Mehta", state: "Approved", tone: "good" as Tone },
  { name: "Cohort lead review", reviewer: "Priya Deshmukh", state: "Pending", tone: "warn" as Tone },
  { name: "Legal review", reviewer: "Fatima Sheikh", state: "Blocked", tone: "bad" as Tone },
  { name: "Investor readiness check", reviewer: "Kabir Rao", state: "Upcoming", tone: "default" as Tone },
];

export const risks = [
  {
    title: "IP filing slips past Apr 08",
    impact: "High",
    tone: "bad" as Tone,
    mitigation: "Escalate claims draft to counsel by Apr 02 — one week of buffer left.",
  },
  {
    title: "Only 7 of 10 pilot partners signed",
    impact: "Medium",
    tone: "warn" as Tone,
    mitigation: "Two deals in legal review; add two warm FPO intros for cover.",
  },
  {
    title: "Cost per acre still above ₹150 target",
    impact: "Medium",
    tone: "warn" as Tone,
    mitigation: "Move inference to night batch windows to cut compute cost 12%.",
  },
  {
    title: "Demo day deck not started",
    impact: "Low",
    tone: "default" as Tone,
    mitigation: "Template assigned; draft outline due Apr 16.",
  },
];

/* ── Discover ──────────────────────────────────────────────── */

export const fitBreakdown = [
  { criterion: "Sector overlap", score: 96, note: "AgriTech is the #1 funded domain here" },
  { criterion: "Stage alignment", score: 92, note: "Cohorts accept pre-seed to Series A" },
  { criterion: "Mentor match", score: 88, note: "4 applied-AI mentors on the panel" },
  { criterion: "Facility access", score: 74, note: "Test bench available, field van shared" },
  { criterion: "Funding linkage", score: 68, note: "Demo-day investors cover 2 of your 5 target sectors" },
  { criterion: "Cohort timing", score: 61, note: "Next intake starts 6 weeks after your deadline" },
];

export const alumniOutcomes = [
  { startup: "TerraMetrics", cohort: "Cohort IV", outcome: "₹12Cr Series A", year: "2025" },
  { startup: "SoilSync", cohort: "Cohort V", outcome: "₹4.5Cr seed + govt grant", year: "2026" },
  { startup: "HarvestRoute", cohort: "Cohort III", outcome: "Acquired — agri logistics", year: "2025" },
  { startup: "KrishiEdge", cohort: "Cohort IV", outcome: "₹8Cr Series A", year: "2026" },
];

export const applicationWindows = [
  { program: "StartupHub Labs", window: "Rolling", next: "Intake live", tone: "good" as Tone },
  { program: "CIED Pune", window: "Applications open", next: "Closes Apr 30", tone: "accent" as Tone },
  { program: "T-Hub Health", window: "Applications open", next: "Closes May 12", tone: "accent" as Tone },
  { program: "MNIT Innovation Hub", window: "Rolling", next: "Intake live", tone: "good" as Tone },
  { program: "Kerala Startup Mission", window: "Rolling", next: "Intake live", tone: "good" as Tone },
  { program: "CIIE Space", window: "Opens Apr 2026", next: "Opens in 3 weeks", tone: "default" as Tone },
];

/* ── Discover filters ─────────────────────────────────────── */

/* Every chip offered maps to at least one incubator, so a filter
   never dead-ends on an empty result unless sector and city are
   genuinely incompatible. */
export const discoverSectors = [
  "All sectors",
  "AI & SaaS",
  "DeepTech",
  "HealthTech",
  "Hardware",
  "Space",
  "EdTech",
];

export const discoverLocations = [
  "All locations",
  "Bengaluru",
  "Pune",
  "Hyderabad",
  "Jaipur",
  "Kochi",
  "Chennai",
];

/* Maps an incubator's declared domains onto exactly one filter
   bucket, so counts across chips always sum to the full list. */
export function sectorTag(domains: string[]): string {
  if (domains.includes("AI") || domains.includes("SaaS") || domains.includes("Multi-sector"))
    return "AI & SaaS";
  if (domains.includes("DeepTech")) return "DeepTech";
  if (domains.includes("HealthTech")) return "HealthTech";
  if (domains.includes("Hardware")) return "Hardware";
  if (domains.includes("Space")) return "Space";
  if (domains.includes("EdTech")) return "EdTech";
  return "AI & SaaS";
}

export const supportMatrix = [
  { support: "Seed grant", startupHub: "₹10L", cied: "₹15L", ksm: "₹12L" },
  { support: "Lab / prototyping", startupHub: "In-house", cied: "Wet labs", ksm: "Maker space" },
  { support: "Cloud credits", startupHub: "₹2L", cied: "₹1.5L", ksm: "₹1L" },
  { support: "Mentor panel", startupHub: "96 mentors", cied: "74 mentors", ksm: "118 mentors" },
  { support: "Investor demo day", startupHub: "Quarterly", cied: "Biannual", ksm: "Quarterly" },
  { support: "Placement support", startupHub: "14 mo", cied: "12 mo", ksm: "18 mo" },
];
