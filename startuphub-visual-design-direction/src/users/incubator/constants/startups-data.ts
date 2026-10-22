/* StartupHub Labs — startup portfolio datasets.
 *
 * One shared source for the four startup screens (portfolio, assessment,
 * at-risk, interventions). The startup records here carry exactly the
 * health / readiness / mentor / risk values that the cohort screens in
 * `cohorts-data.ts` already use, so the two never disagree.
 */

/* ── Types ─────────────────────────────────────────────────────── */

export type Tone = "default" | "accent" | "good" | "warn" | "bad";

export type RiskLevel = "Low" | "Medium" | "High";

export type PortfolioStartup = {
  slug: string;
  name: string;
  sector: string;
  stage:
    | "Idea"
    | "Validation"
    | "Pre-seed"
    | "Seed"
    | "Series A"
    | "Growth";
  cohort: string;
  health: number;
  readiness: number;
  mentor: string;
  risk: RiskLevel;
  arr: string;
  employees: number;
  milestones: string;
  raised: string;
  nextMilestone: string;
};

export type PortfolioKpi = {
  label: string;
  value: string;
  note: string;
  tone: Tone;
};

export type DistributionSlice = {
  label: string;
  count: number;
  share: number;
  note: string;
};

export type CohortSpread = {
  cohort: string;
  startups: number;
  avgHealth: number;
  status: string;
  tone: Tone;
};

export type HealthBand = {
  band: string;
  count: number;
  range: string;
  tone: Tone;
};

export type MentorCoverage = {
  mentor: string;
  initials: string;
  startups: number;
  load: number;
  sectors: string;
  hours: number;
  tone: Tone;
};

export type FundingReadiness = {
  stage: string;
  ready: number;
  total: number;
  raised: string;
  tone: Tone;
};

export type RubricDimension = {
  key: string;
  label: string;
  weight: number;
  rubric: string;
};

export type AssessmentScores = {
  startupSlug: string;
  scores: Record<string, number>;
  overall: number;
  trend: "up" | "flat" | "down";
  assessor: string;
  date: string;
  recommendation: string;
};

export type AssessmentHistory = {
  startupSlug: string;
  quarters: { label: string; score: number }[];
};

export type AssessmentQueue = {
  startupSlug: string;
  due: string;
  assessor: string;
  state: "Due" | "Overdue" | "Scheduled";
  tone: Tone;
};

export type AtRiskRecord = {
  slug: string;
  name: string;
  sector: string;
  risk: string;
  severity: "High" | "Medium" | "Low";
  owner: string;
  action: string;
  age: string;
  health: number;
  runway: string;
  tone: Tone;
};

export type RiskTrendPoint = {
  week: number;
  atRisk: number;
  avgScore: number;
};

export type RunwayExposure = {
  name: string;
  runway: string;
  months: number;
  arr: string;
  burn: string;
  severity: "Critical" | "Watch" | "Stable";
  tone: Tone;
};

export type EarlyWarning = {
  signal: string;
  startups: number;
  detected: string;
  severity: "High" | "Medium" | "Low";
  note: string;
  tone: Tone;
};

export type OwnerLoad = {
  owner: string;
  initials: string;
  cases: number;
  critical: number;
  age: string;
  tone: Tone;
};

export type InterventionPlan = {
  id: string;
  startup: string;
  sector: string;
  plan: string;
  owner: string;
  tasksDone: number;
  tasksTotal: number;
  started: string;
  due: string;
  status: "Active" | "Monitoring" | "Closed";
  trigger: string;
  outcome: string;
  tone: Tone;
};

export type InterventionTask = {
  planId: string;
  task: string;
  owner: string;
  due: string;
  state: "Done" | "In progress" | "Not started";
  tone: Tone;
};

export type InterventionOutcome = {
  startup: string;
  healthBefore: number;
  healthAfter: number;
  outcome: string;
  cost: string;
  tone: Tone;
};

/* ── Portfolio ─────────────────────────────────────────────────── */

export const PORTFOLIO: PortfolioStartup[] = [
  { slug: "lumen-ai", name: "Lumen AI", sector: "AgriTech", stage: "Series A", cohort: "VI", health: 84, readiness: 78, mentor: "Priya Nair", risk: "Low", arr: "₹1.2 Cr", employees: 14, milestones: "10/12", raised: "₹6.5 Cr", nextMilestone: "Final demo — Apr 28" },
  { slug: "aquapure", name: "AquaPure", sector: "CleanTech", stage: "Seed", cohort: "VI", health: 88, readiness: 81, mentor: "Sunita D.", risk: "Low", arr: "₹38 L", employees: 9, milestones: "11/12", raised: "₹3.2 Cr", nextMilestone: "Unit 20 deployment — Apr 15" },
  { slug: "terragrid", name: "TerraGrid", sector: "ClimateTech", stage: "Seed", cohort: "V", health: 72, readiness: 66, mentor: "Vikram Rao", risk: "Medium", arr: "₹22 L", employees: 7, milestones: "8/12", raised: "₹2.4 Cr", nextMilestone: "3-operator pilot bundle — Apr 20" },
  { slug: "finedge", name: "FinEdge", sector: "FinTech", stage: "Pre-seed", cohort: "VII", health: 68, readiness: 61, mentor: "Karan Chadha", risk: "Medium", arr: "₹12 L", employees: 5, milestones: "7/12", raised: "₹1.1 Cr", nextMilestone: "NBFC pilot #3 go-live — Apr 30" },
  { slug: "orbitalworks", name: "OrbitalWorks", sector: "SpaceTech", stage: "Seed", cohort: "VI", health: 81, readiness: 74, mentor: "Priya Nair", risk: "Low", arr: "₹26 L", employees: 8, milestones: "10/12", raised: "₹3.8 Cr", nextMilestone: "Ground station #10 live — May 06" },
  { slug: "freshchain", name: "FreshChain", sector: "AgriTech", stage: "Pre-seed", cohort: "VII", health: 41, readiness: 38, mentor: "Vikram Rao", risk: "High", arr: "₹4 L", employees: 4, milestones: "5/12", raised: "₹45 L", nextMilestone: "Rohatgi distribution MOU — Apr 10" },
  { slug: "gridsense", name: "GridSense", sector: "Energy", stage: "Seed", cohort: "V", health: 44, readiness: 51, mentor: "Arjun Bedekar", risk: "High", arr: "₹9 L", employees: 6, milestones: "6/12", raised: "₹1.8 Cr", nextMilestone: "Bridge plan close — Apr 18" },
  { slug: "medsync", name: "MedSync", sector: "HealthTech", stage: "Series A", cohort: "IV", health: 82, readiness: 79, mentor: "Sunita D.", risk: "Low", arr: "₹1.6 Cr", employees: 18, milestones: "11/12", raised: "₹9.2 Cr", nextMilestone: "Hospital #6 go-live — May 12" },
  { slug: "edufold", name: "EduFold", sector: "EdTech", stage: "Pre-seed", cohort: "VII", health: 71, readiness: 64, mentor: "Karan Chadha", risk: "Low", arr: "₹7 L", employees: 4, milestones: "7/12", raised: "₹80 L", nextMilestone: "School pilot #2 — Apr 24" },
  { slug: "healthloop", name: "HealthLoop", sector: "HealthTech", stage: "Pre-seed", cohort: "VII", health: 52, readiness: 47, mentor: "Sunita D.", risk: "Medium", arr: "₹6 L", employees: 5, milestones: "6/12", raised: "₹60 L", nextMilestone: "Pilot unblock — Apr 16" },
  { slug: "quantumleaf", name: "QuantumLeaf", sector: "ClimateTech", stage: "Pre-seed", cohort: "VII", health: 57, readiness: 54, mentor: "Meera Iyer", risk: "Medium", arr: "₹3 L", employees: 3, milestones: "7/12", raised: "₹35 L", nextMilestone: "Scope re-baseline — Apr 12" },
  { slug: "bloombio", name: "BloomBio", sector: "BioTech", stage: "Pre-seed", cohort: "VI", health: 64, readiness: 60, mentor: "Nandita Bose", risk: "Low", arr: "₹2 L", employees: 3, milestones: "8/12", raised: "₹1.2 Cr", nextMilestone: "Pilot MOU — May 03" },
  { slug: "silkroute", name: "SilkRoute AI", sector: "Logistics", stage: "Validation", cohort: "VI", health: 70, readiness: 66, mentor: "Arjun Bedekar", risk: "Medium", arr: "₹5 L", employees: 4, milestones: "8/12", raised: "₹50 L", nextMilestone: "Pilot #1 sign — Apr 22" },
];

export const PORTFOLIO_KPIS: PortfolioKpi[] = [
  { label: "Startups in portfolio", value: "240", note: "across 12 programmes", tone: "accent" },
  { label: "Average health", value: "77", note: "+4 vs last quarter", tone: "good" },
  { label: "Capital mobilised", value: "₹186 Cr", note: "61 raises", tone: "good" },
  { label: "At risk", value: "4", note: "2 critical, 1 intervention live", tone: "warn" },
];

export const SECTOR_SPLIT: DistributionSlice[] = [
  { label: "AgriTech", count: 52, share: 22, note: "Largest cluster" },
  { label: "HealthTech", count: 41, share: 17, note: "Fastest growing" },
  { label: "FinTech", count: 38, share: 16, note: "Strong funding" },
  { label: "ClimateTech", count: 34, share: 14, note: "Most funded" },
  { label: "Deep tech", count: 29, share: 12, note: "Longest cycles" },
  { label: "Other", count: 46, share: 19, note: "EdTech, SaaS, commerce" },
];

export const STAGE_SPLIT: DistributionSlice[] = [
  { label: "Idea", count: 62, share: 26, note: "Pre-incubation" },
  { label: "Pre-seed", count: 71, share: 30, note: "Main entry stage" },
  { label: "Seed", count: 64, share: 27, note: "Most active" },
  { label: "Series A", count: 31, share: 13, note: "Graduating" },
  { label: "Growth", count: 12, share: 4, note: "Alumni territory" },
];

export const COHORT_SPREAD: CohortSpread[] = [
  { cohort: "Cohort VI", startups: 14, avgHealth: 78, status: "Graduation sprint", tone: "accent" },
  { cohort: "Cohort VII", startups: 12, avgHealth: 71, status: "Mid-program", tone: "accent" },
  { cohort: "Sprint: AgriTech", startups: 8, avgHealth: 83, status: "Milestone week", tone: "good" },
  { cohort: "Cohort V", startups: 16, avgHealth: 88, status: "Graduated", tone: "default" },
  { cohort: "Cohort IV", startups: 14, avgHealth: 86, status: "Graduated", tone: "default" },
  { cohort: "Earlier cohorts", startups: 176, avgHealth: 74, status: "Alumni", tone: "default" },
];

export const HEALTH_BANDS: HealthBand[] = [
  { band: "Healthy", count: 142, range: "80 and above", tone: "good" },
  { band: "Watch", count: 71, range: "60 to 79", tone: "accent" },
  { band: "At risk", count: 27, range: "below 60", tone: "bad" },
];

export const MENTOR_COVERAGE: MentorCoverage[] = [
  { mentor: "Priya Nair", initials: "PN", startups: 34, load: 62, sectors: "Architecture, deep tech", hours: 1420, tone: "accent" },
  { mentor: "Vikram Rao", initials: "VR", startups: 29, load: 78, sectors: "Hardware, climate", hours: 1190, tone: "warn" },
  { mentor: "Sunita Deshpukh", initials: "SD", startups: 31, load: 68, sectors: "Health, go-to-market", hours: 1340, tone: "accent" },
  { mentor: "Karan Chadha", initials: "KC", startups: 26, load: 55, sectors: "Fintech, compliance", hours: 980, tone: "default" },
  { mentor: "Arjun Bedekar", initials: "AB", startups: 24, load: 47, sectors: "Deep tech, space", hours: 870, tone: "default" },
  { mentor: "Meera Iyer", initials: "MI", startups: 11, load: 22, sectors: "Programme oversight", hours: 380, tone: "default" },
];

export const FUNDING_READINESS: FundingReadiness[] = [
  { stage: "Idea", ready: 8, total: 62, raised: "₹3 Cr", tone: "default" },
  { stage: "Pre-seed", ready: 24, total: 71, raised: "₹31 Cr", tone: "default" },
  { stage: "Seed", ready: 38, total: 64, raised: "₹96 Cr", tone: "good" },
  { stage: "Series A", ready: 17, total: 31, raised: "₹52 Cr", tone: "good" },
  { stage: "Growth", ready: 4, total: 12, raised: "₹18 Cr", tone: "accent" },
];

/* ── Assessment ───────────────────────────────────────────────── */

export const RUBRIC: RubricDimension[] = [
  { key: "product", label: "Product maturity", weight: 20, rubric: "How close is a working product to a customer?" },
  { key: "market", label: "Market evidence", weight: 20, rubric: "Is the demand proven beyond founder belief?" },
  { key: "team", label: "Team strength", weight: 20, rubric: "Do the founders have the skills and reason to win?" },
  { key: "traction", label: "Traction signal", weight: 15, rubric: "Revenue, pilots, usage — anything but a deck." },
  { key: "compliance", label: "Compliance", weight: 15, rubric: "Legal, regulatory and standards readiness." },
  { key: "ip", label: "IP position", weight: 10, rubric: "Is the innovation protectable and already protected?" },
];

export const ASSESSMENTS: AssessmentScores[] = [
  {
    startupSlug: "lumen-ai",
    scores: { product: 88, market: 82, team: 86, traction: 84, compliance: 74, ip: 78 },
    overall: 83,
    trend: "up",
    assessor: "Meera Iyer",
    date: "08 Apr 2026",
    recommendation: "Strong demo candidate",
  },
  {
    startupSlug: "aquapure",
    scores: { product: 92, market: 86, team: 84, traction: 88, compliance: 78, ip: 80 },
    overall: 85,
    trend: "up",
    assessor: "Rohan Pillai",
    date: "08 Apr 2026",
    recommendation: "Lead the demo block",
  },
  {
    startupSlug: "orbitalworks",
    scores: { product: 84, market: 80, team: 82, traction: 78, compliance: 76, ip: 72 },
    overall: 79,
    trend: "flat",
    assessor: "Arjun Nair",
    date: "08 Apr 2026",
    recommendation: "Solid — watch IP filings",
  },
  {
    startupSlug: "medsync",
    scores: { product: 86, market: 84, team: 80, traction: 82, compliance: 72, ip: 70 },
    overall: 78,
    trend: "flat",
    assessor: "Meera Iyer",
    date: "08 Apr 2026",
    recommendation: "Conditional on IP completion",
  },
  {
    startupSlug: "terragrid",
    scores: { product: 74, market: 78, team: 70, traction: 66, compliance: 70, ip: 62 },
    overall: 71,
    trend: "down",
    assessor: "Rohan Pillai",
    date: "08 Apr 2026",
    recommendation: "Pilot bundle is the gap",
  },
  {
    startupSlug: "finedge",
    scores: { product: 70, market: 68, team: 74, traction: 58, compliance: 64, ip: 60 },
    overall: 66,
    trend: "down",
    assessor: "Karan Chadha",
    date: "08 Apr 2026",
    recommendation: "Traction needs evidence",
  },
  {
    startupSlug: "freshchain",
    scores: { product: 48, market: 44, team: 40, traction: 32, compliance: 52, ip: 44 },
    overall: 43,
    trend: "down",
    assessor: "Meera Iyer",
    date: "08 Apr 2026",
    recommendation: "Intervention required",
  },
];

export const ASSESSMENT_HISTORY: AssessmentHistory[] = [
  { startupSlug: "lumen-ai", quarters: [{ label: "Q4 25", score: 62 }, { label: "Q1 26", score: 71 }, { label: "Q2 26", score: 83 }] },
  { startupSlug: "aquapure", quarters: [{ label: "Q4 25", score: 68 }, { label: "Q1 26", score: 77 }, { label: "Q2 26", score: 85 }] },
  { startupSlug: "terragrid", quarters: [{ label: "Q4 25", score: 74 }, { label: "Q1 26", score: 76 }, { label: "Q2 26", score: 71 }] },
  { startupSlug: "finedge", quarters: [{ label: "Q4 25", score: 70 }, { label: "Q1 26", score: 70 }, { label: "Q2 26", score: 66 }] },
  { startupSlug: "freshchain", quarters: [{ label: "Q4 25", score: 61 }, { label: "Q1 26", score: 52 }, { label: "Q2 26", score: 43 }] },
];

export const ASSESSMENT_QUEUE: AssessmentQueue[] = [
  { startupSlug: "gridsense", due: "12 Apr 2026", assessor: "Arjun Nair", state: "Overdue", tone: "bad" },
  { startupSlug: "healthloop", due: "14 Apr 2026", assessor: "Sunita D.", state: "Due", tone: "warn" },
  { startupSlug: "quantumleaf", due: "15 Apr 2026", assessor: "Meera Iyer", state: "Due", tone: "warn" },
  { startupSlug: "silkroute", due: "18 Apr 2026", assessor: "Arjun Nair", state: "Scheduled", tone: "default" },
  { startupSlug: "bloombio", due: "18 Apr 2026", assessor: "Nandita Bose", state: "Scheduled", tone: "default" },
];

/* ── At risk ───────────────────────────────────────────────────── */

export const AT_RISK: AtRiskRecord[] = [
  { slug: "freshchain", name: "FreshChain", sector: "AgriTech", risk: "Co-founder conflict + cash", severity: "High", owner: "Meera Iyer", action: "Mediation session Apr 09", age: "11 days", health: 41, runway: "3.2 months", tone: "bad" },
  { slug: "gridsense", name: "GridSense", sector: "Energy", risk: "Runway under 4 months", severity: "High", owner: "Arjun Nair", action: "Emergency bridge plan", age: "8 days", health: 44, runway: "3.8 months", tone: "bad" },
  { slug: "healthloop", name: "HealthLoop", sector: "HealthTech", risk: "Pilot stalled 6 weeks", severity: "Medium", owner: "Rohan Pillai", action: "Hospital partner escalation", age: "14 days", health: 52, runway: "7.1 months", tone: "warn" },
  { slug: "quantumleaf", name: "QuantumLeaf", sector: "ClimateTech", risk: "Milestone drift A-3", severity: "Medium", owner: "Meera Iyer", action: "Scope re-baseline", age: "4 days", health: 57, runway: "8.4 months", tone: "warn" },
  { slug: "terragrid", name: "TerraGrid", sector: "ClimateTech", risk: "Component supplier delay", severity: "Low", owner: "Vikram Rao", action: "Second source qualified", age: "2 days", health: 72, runway: "11.2 months", tone: "default" },
  { slug: "finedge", name: "FinEdge", sector: "FinTech", risk: "NBFC pilot slipping to Q3", severity: "Medium", owner: "Karan Chadha", action: "Re-baseline pilot scope", age: "5 days", health: 68, runway: "9.6 months", tone: "warn" },
];

export const RISK_TREND: RiskTrendPoint[] = [
  { week: 1, atRisk: 3, avgScore: 74 },
  { week: 2, atRisk: 4, avgScore: 72 },
  { week: 3, atRisk: 4, avgScore: 71 },
  { week: 4, atRisk: 5, avgScore: 70 },
  { week: 5, atRisk: 4, avgScore: 71 },
  { week: 6, atRisk: 6, avgScore: 68 },
  { week: 7, atRisk: 5, avgScore: 70 },
  { week: 8, atRisk: 4, avgScore: 73 },
];

export const RUNWAY_EXPOSURE: RunwayExposure[] = [
  { name: "FreshChain", runway: "3.2 months", months: 3.2, arr: "₹4 L", burn: "₹1.2 L/mo", severity: "Critical", tone: "bad" },
  { name: "GridSense", runway: "3.8 months", months: 3.8, arr: "₹9 L", burn: "₹2.4 L/mo", severity: "Critical", tone: "bad" },
  { name: "HealthLoop", runway: "7.1 months", months: 7.1, arr: "₹6 L", burn: "₹0.8 L/mo", severity: "Watch", tone: "warn" },
  { name: "QuantumLeaf", runway: "8.4 months", months: 8.4, arr: "₹3 L", burn: "₹0.4 L/mo", severity: "Watch", tone: "warn" },
  { name: "FinEdge", runway: "9.6 months", months: 9.6, arr: "₹12 L", burn: "₹1.2 L/mo", severity: "Watch", tone: "warn" },
  { name: "TerraGrid", runway: "11.2 months", months: 11.2, arr: "₹22 L", burn: "₹2.0 L/mo", severity: "Stable", tone: "good" },
];

export const EARLY_WARNINGS: EarlyWarning[] = [
  { signal: "Mentor hours stopped", startups: 3, detected: "This week", severity: "High", note: "No mentor touchpoint in 21 days", tone: "bad" },
  { signal: "Milestone slipped twice", startups: 4, detected: "This week", severity: "High", note: "Same milestone rescheduled", tone: "bad" },
  { signal: "Founder no-show", startups: 2, detected: "Last week", severity: "Medium", note: "Missed two consecutive sessions", tone: "warn" },
  { signal: "No revenue movement", startups: 5, detected: "Last week", severity: "Medium", note: "90 days without an ARR change", tone: "warn" },
  { signal: "IP filing incomplete", startups: 6, detected: "2 weeks ago", severity: "Low", note: "Missing provisional filing", tone: "default" },
  { signal: "Grant deadline missed", startups: 2, detected: "2 weeks ago", severity: "Low", note: "Utilisation report not filed", tone: "default" },
];

export const OWNER_LOADS: OwnerLoad[] = [
  { owner: "Meera Iyer", initials: "MI", cases: 3, critical: 2, age: "11 days", tone: "bad" },
  { owner: "Arjun Nair", initials: "AN", cases: 2, critical: 1, age: "8 days", tone: "warn" },
  { owner: "Rohan Pillai", initials: "RP", cases: 2, critical: 0, age: "14 days", tone: "warn" },
  { owner: "Karan Chadha", initials: "KC", cases: 1, critical: 0, age: "5 days", tone: "default" },
  { owner: "Vikram Rao", initials: "VR", cases: 1, critical: 0, age: "2 days", tone: "default" },
];

/* ── Interventions ─────────────────────────────────────────────── */

export const INTERVENTIONS: InterventionPlan[] = [
  { id: "ip-1", startup: "FreshChain", sector: "AgriTech", plan: "Co-founder mediation + bridge run", owner: "Meera Iyer", tasksDone: 3, tasksTotal: 6, started: "09 Apr 2026", due: "30 Apr 2026", status: "Active", trigger: "Assessment score 43", outcome: "Pending", tone: "bad" },
  { id: "ip-2", startup: "GridSense", sector: "Energy", plan: "Emergency bridge round", owner: "Arjun Nair", tasksDone: 2, tasksTotal: 5, started: "13 Apr 2026", due: "15 May 2026", status: "Active", trigger: "Runway under 4 months", outcome: "Pending", tone: "bad" },
  { id: "ip-3", startup: "HealthLoop", sector: "HealthTech", plan: "Hospital partner re-introduction", owner: "Rohan Pillai", tasksDone: 4, tasksTotal: 4, started: "25 Mar 2026", due: "16 Apr 2026", status: "Monitoring", trigger: "Pilot stalled 6 weeks", outcome: "Pilot re-scoped, health 44 → 52", tone: "warn" },
  { id: "ip-4", startup: "QuantumLeaf", sector: "ClimateTech", plan: "Scope re-baseline", owner: "Meera Iyer", tasksDone: 2, tasksTotal: 3, started: "15 Apr 2026", due: "30 Apr 2026", status: "Active", trigger: "Milestone drift A-3", outcome: "Pending", tone: "warn" },
  { id: "ip-5", startup: "FinEdge", sector: "FinTech", plan: "Pilot re-baseline with NBFC", owner: "Karan Chadha", tasksDone: 1, tasksTotal: 4, started: "17 Apr 2026", due: "22 May 2026", status: "Active", trigger: "NBFC pilot slipping to Q3", outcome: "Pending", tone: "warn" },
  { id: "ip-6", startup: "TerraGrid", sector: "ClimateTech", plan: "Second supplier qualification", owner: "Vikram Rao", tasksDone: 3, tasksTotal: 3, started: "06 Apr 2026", due: "20 Apr 2026", status: "Closed", trigger: "Component supplier delay", outcome: "Second source qualified, health 68 → 72", tone: "good" },
];

export const INTERVENTION_TASKS: InterventionTask[] = [
  { planId: "ip-1", task: "Schedule mediation with co-founders", owner: "Meera Iyer", due: "11 Apr", state: "Done", tone: "good" },
  { planId: "ip-1", task: "Review cap table and vesting", owner: "Arjun Nair", due: "13 Apr", state: "Done", tone: "good" },
  { planId: "ip-1", task: "Open bridge term sheet shortlist", owner: "Arjun Nair", due: "17 Apr", state: "In progress", tone: "accent" },
  { planId: "ip-1", task: "Weekly founder check-in cadence", owner: "Rohan Pillai", due: "18 Apr", state: "Not started", tone: "default" },
  { planId: "ip-2", task: "Model three bridge scenarios", owner: "Arjun Nair", due: "17 Apr", state: "Done", tone: "good" },
  { planId: "ip-2", task: "Approach Nexus Angels on bridge", owner: "Arjun Nair", due: "21 Apr", state: "In progress", tone: "accent" },
  { planId: "ip-3", task: "Re-introduce to partner hospital", owner: "Rohan Pillai", due: "02 Apr", state: "Done", tone: "good" },
  { planId: "ip-3", task: "Re-scope pilot success criteria", owner: "Sunita D.", due: "08 Apr", state: "Done", tone: "good" },
  { planId: "ip-3", task: "Confirm first new deployment", owner: "Sunita D.", due: "20 Apr", state: "In progress", tone: "accent" },
  { planId: "ip-4", task: "Re-cut the milestone plan", owner: "Meera Iyer", due: "20 Apr", state: "In progress", tone: "accent" },
  { planId: "ip-5", task: "Renegotiate NBFC go-live date", owner: "Karan Chadha", due: "24 Apr", state: "In progress", tone: "accent" },
  { planId: "ip-5", task: "Model the revenue impact of delay", owner: "Karan Chadha", due: "28 Apr", state: "Not started", tone: "default" },
  { planId: "ip-6", task: "Qualify second component source", owner: "Vikram Rao", due: "10 Apr", state: "Done", tone: "good" },
  { planId: "ip-6", task: "Sample and test the alternates", owner: "Vikram Rao", due: "14 Apr", state: "Done", tone: "good" },
];

export const INTERVENTION_OUTCOMES: InterventionOutcome[] = [
  { startup: "TerraGrid", healthBefore: 68, healthAfter: 72, outcome: "Second source qualified — build unblocked", cost: "₹0.4 L", tone: "good" },
  { startup: "HealthLoop", healthBefore: 44, healthAfter: 52, outcome: "Partner re-introduction landed, pilot re-scoped", cost: "₹0.2 L", tone: "good" },
  { startup: "QuantumLeaf", healthBefore: 61, healthAfter: 57, outcome: "Scope re-baseline in flight — no outcome yet", cost: "₹0.1 L", tone: "warn" },
  { startup: "FinEdge", healthBefore: 72, healthAfter: 68, outcome: "Pilot slipped — plan opened this week", cost: "₹0.2 L", tone: "warn" },
  { startup: "GridSense", healthBefore: 48, healthAfter: 44, outcome: "Bridge round in progress — no outcome yet", cost: "₹0.6 L", tone: "bad" },
  { startup: "FreshChain", healthBefore: 58, healthAfter: 41, outcome: "Co-founder conflict escalated — mediation in flight", cost: "₹0.3 L", tone: "bad" },
];
