/* StartupHub Labs — cohort datasets.
 *
 * One shared source for the four cohort screens (management, cohort
 * detail, progress, analytics). Cohort names, slugs, leads, seat counts
 * and demo days match the programme records in `programs-data.ts` so the
 * two screens never disagree.
 */

/* ── Types ─────────────────────────────────────────────────────── */

export type Tone = "default" | "accent" | "good" | "warn" | "bad";

export type CohortStatus = "Active" | "Intake" | "Alumni";

export type Cohort = {
  slug: string;
  name: string;
  track: string;
  lead: string;
  leadInitials: string;
  start: string;
  end: string;
  weeks: number;
  currentWeek: number;
  seats: number;
  filled: number;
  health: number;
  status: CohortStatus;
  phase: string;
  demoDay: string;
  tone: Tone;
};

export type HealthDimension = {
  label: string;
  score: number;
  note: string;
};

export type Phase = {
  name: string;
  weeks: string;
  state: "done" | "active" | "upcoming";
  tone: Tone;
  focus: string;
};

export type CohortStartup = {
  name: string;
  sector: string;
  stage: string;
  health: number;
  readiness: number;
  milestones: string;
  mentor: string;
  risk: "Low" | "Medium" | "High";
  tone: Tone;
};

export type MentorAssignment = {
  mentor: string;
  initials: string;
  expertise: string;
  startups: number;
  hours: number;
  target: number;
  tone: Tone;
};

export type MilestoneBurn = {
  milestone: string;
  owner: string;
  due: string;
  pct: number;
  drift: string;
  tone: Tone;
};

export type Blocker = {
  startup: string;
  blocker: string;
  severity: "High" | "Medium" | "Low";
  owner: string;
  action: string;
  age: string;
  tone: Tone;
};

export type PulseWeek = {
  week: number;
  attendance: number;
  mentorHours: number;
  events: number;
  note: string;
};

export type CompletionItem = {
  item: string;
  pct: number;
  owner: string;
};

export type DemoReadiness = {
  item: string;
  pct: number;
  note: string;
  tone: Tone;
};

export type HistoricalCohort = {
  name: string;
  track: string;
  year: string;
  size: number;
  graduated: number;
  survival12: number;
  survival36: number;
  funding: string;
  ipr: number;
  jobs: number;
  stillActive: number;
  tone: Tone;
};

export type OutcomeMetric = {
  metric: string;
  cohort: string;
  network: string;
  delta: string;
  better: boolean;
};

export type SurvivalPoint = {
  month: number;
  cohortV: number;
  cohortIV: number;
  cohortIII: number;
  network: number;
};

export type Benchmark = {
  metric: string;
  ours: string;
  network: string;
  note: string;
  tone: Tone;
};

/* ── Cohorts ───────────────────────────────────────────────────── */

export const COHORTS: Cohort[] = [
  {
    slug: "cohort-vi",
    name: "Cohort VI",
    track: "Multi-sector",
    lead: "Rohan Pillai",
    leadInitials: "RP",
    start: "02 Feb 2026",
    end: "28 Apr 2026",
    weeks: 16,
    currentWeek: 14,
    seats: 16,
    filled: 14,
    health: 78,
    status: "Active",
    phase: "Graduation sprint",
    demoDay: "Apr 28",
    tone: "accent",
  },
  {
    slug: "cohort-vii",
    name: "Cohort VII",
    track: "Multi-sector",
    lead: "Rohan Pillai",
    leadInitials: "RP",
    start: "04 May 2026",
    end: "24 Aug 2026",
    weeks: 16,
    currentWeek: 9,
    seats: 16,
    filled: 12,
    health: 71,
    status: "Active",
    phase: "Mid-program",
    demoDay: "Aug 30",
    tone: "accent",
  },
  {
    slug: "agritech-sprint",
    name: "Sprint: AgriTech",
    track: "AgriTech",
    lead: "Divya Menon",
    leadInitials: "DM",
    start: "20 Jan 2026",
    end: "17 Mar 2026",
    weeks: 8,
    currentWeek: 6,
    seats: 10,
    filled: 8,
    health: 83,
    status: "Active",
    phase: "Milestone week",
    demoDay: "Jun 15",
    tone: "good",
  },
  {
    slug: "cohort-viii",
    name: "Cohort VIII",
    track: "Multi-sector",
    lead: "Meera Iyer",
    leadInitials: "MI",
    start: "03 Aug 2026",
    end: "23 Nov 2026",
    weeks: 16,
    currentWeek: 0,
    seats: 16,
    filled: 0,
    health: 0,
    status: "Intake",
    phase: "Applications open",
    demoDay: "Nov 24",
    tone: "warn",
  },
  {
    slug: "cohort-v",
    name: "Cohort V",
    track: "Multi-sector",
    lead: "Meera Iyer",
    leadInitials: "MI",
    start: "06 Jan 2025",
    end: "27 Apr 2025",
    weeks: 16,
    currentWeek: 16,
    seats: 16,
    filled: 16,
    health: 88,
    status: "Alumni",
    phase: "Graduated Jan 2026",
    demoDay: "—",
    tone: "default",
  },
];

export const COHORT_KPIS = [
  { label: "Live cohorts", value: "3", note: "34 startups in flight", tone: "accent" as Tone },
  { label: "Average health", value: "77", note: "+4 vs last quarter", tone: "good" as Tone },
  { label: "Graduation rate", value: "86%", note: "vs 71% network avg", tone: "good" as Tone },
  { label: "Mentor hours logged", value: "1,240", note: "across 34 startups", tone: "default" as Tone },
];

/* ── Cohort VI — the active batch ──────────────────────────────── */

export const COHORT_VI_HEALTH: HealthDimension[] = [
  { label: "Growth health", score: 81, note: "12% median MoM across the batch" },
  { label: "Financial health", score: 74, note: "3 startups under 6 months runway" },
  { label: "Product health", score: 79, note: "11 of 14 have a working MVP" },
  { label: "Team health", score: 83, note: "No unresolved co-founder splits" },
  { label: "Market health", score: 77, note: "Pilot pipeline holds at 2.1 per startup" },
  { label: "IP health", score: 58, note: "5 filings still outstanding before demo" },
];

export const COHORT_VI_PHASES: Phase[] = [
  { name: "Orientation", weeks: "Week 0–1", state: "done", tone: "good", focus: "Problem framing and baseline" },
  { name: "Validation", weeks: "Week 2–4", state: "done", tone: "good", focus: "Customer discovery and evidence" },
  { name: "Build", weeks: "Week 5–8", state: "done", tone: "good", focus: "MVP scope and first prototype" },
  { name: "Commercialise", weeks: "Week 9–12", state: "done", tone: "good", focus: "Pilot, pricing and pipeline" },
  { name: "Protect", weeks: "Week 13–14", state: "active", tone: "accent", focus: "IP filings and compliance" },
  { name: "Fund", weeks: "Week 15–16", state: "upcoming", tone: "default", focus: "Data room and investor readiness" },
];

export const COHORT_VI_STARTUPS: CohortStartup[] = [
  { name: "Lumen AI", sector: "AgriTech", stage: "Series A", health: 84, readiness: 78, milestones: "10/12", mentor: "Priya Nair", risk: "Low", tone: "good" },
  { name: "AquaPure", sector: "CleanTech", stage: "Seed", health: 88, readiness: 81, milestones: "11/12", mentor: "Sunita D.", risk: "Low", tone: "good" },
  { name: "OrbitalWorks", sector: "SpaceTech", stage: "Seed", health: 81, readiness: 74, milestones: "10/12", mentor: "Priority N.", risk: "Low", tone: "good" },
  { name: "TerraGrid", sector: "ClimateTech", stage: "Seed", health: 72, readiness: 66, milestones: "8/12", mentor: "Vikram Rao", risk: "Medium", tone: "accent" },
  { name: "FinEdge", sector: "FinTech", stage: "Pre-seed", health: 68, readiness: 61, milestones: "7/12", mentor: "Karan Chadha", risk: "Medium", tone: "accent" },
  { name: "MedSync", sector: "HealthTech", stage: "Series A", health: 82, readiness: 79, milestones: "11/12", mentor: "Sunita D.", risk: "Low", tone: "good" },
  { name: "EduFold", sector: "EdTech", stage: "Pre-seed", health: 71, readiness: 64, milestones: "7/12", mentor: "Karan Chadha", risk: "Low", tone: "accent" },
  { name: "FreshChain", sector: "AgriTech", stage: "Pre-seed", health: 41, readiness: 38, milestones: "5/12", mentor: "Vikram Rao", risk: "High", tone: "bad" },
  { name: "GridSense", sector: "Energy", stage: "Seed", health: 44, readiness: 51, milestones: "6/12", mentor: "Arjun Bedekar", risk: "High", tone: "bad" },
  { name: "HealthLoop", sector: "HealthTech", stage: "Pre-seed", health: 52, readiness: 47, milestones: "6/12", mentor: "Sunita D.", risk: "Medium", tone: "warn" },
  { name: "QuantumLeaf", sector: "ClimateTech", stage: "Pre-seed", health: 57, readiness: 54, milestones: "7/12", mentor: "Meera Iyer", risk: "Medium", tone: "warn" },
  { name: "CartEdge", sector: "Commerce", stage: "Idea", health: 76, readiness: 72, milestones: "9/12", mentor: "Priority N.", risk: "Low", tone: "good" },
  { name: "BloomBio", sector: "BioTech", stage: "Pre-seed", health: 64, readiness: 60, milestones: "8/12", mentor: "Nandita Bose", risk: "Low", tone: "accent" },
  { name: "SilkRoute AI", sector: "Logistics", stage: "Validation", health: 70, readiness: 66, milestones: "8/12", mentor: "Arjun Bedekar", risk: "Medium", tone: "accent" },
];

export const COHORT_VI_MENTORS: MentorAssignment[] = [
  { mentor: "Priya Nair", initials: "PN", expertise: "Architecture & scaling", startups: 5, hours: 38, target: 40, tone: "good" },
  { mentor: "Vikram Rao", initials: "VR", expertise: "Hardware & supply chain", startups: 3, hours: 26, target: 40, tone: "warn" },
  { mentor: "Sunita Deshmukh", initials: "SD", expertise: "Go-to-market, health", startups: 2, hours: 41, target: 40, tone: "good" },
  { mentor: "Karan Chadha", initials: "KC", expertise: "Fintech compliance", startups: 2, hours: 22, target: 40, tone: "bad" },
  { mentor: "Arjun Bedekar", initials: "AB", expertise: "Deep tech, space", startups: 2, hours: 34, target: 40, tone: "good" },
];

export const COHORT_VI_MILESTONES: MilestoneBurn[] = [
  { milestone: "Final demo — Demo Day", owner: "Priya Nair", due: "Apr 28", pct: 86, drift: "2 days late", tone: "warn" },
  { milestone: "Unit 20 deployment", owner: "Sunita D.", due: "Apr 15", pct: 91, drift: "on track", tone: "good" },
  { milestone: "3-operator pilot bundle", owner: "Vikram Rao", due: "Apr 20", pct: 64, drift: "5 days late", tone: "warn" },
  { milestone: "NBFC pilot #3 go-live", owner: "Karan Chadha", due: "Apr 30", pct: 42, drift: "9 days late", tone: "bad" },
  { milestone: "Rohatgi distribution MOU", owner: "Meera Iyer", due: "Apr 10", pct: 20, drift: "12 days late", tone: "bad" },
  { milestone: "Trademark class 35 filed", owner: "Nandita Bose", due: "Apr 22", pct: 78, drift: "on track", tone: "good" },
];

export const COHORT_VI_COMPLETION: CompletionItem[] = [
  { item: "KPI baselines submitted", pct: 100, owner: "Rohan Pillai" },
  { item: "Mentor hours target (40h)", pct: 80, owner: "Rohan Pillai" },
  { item: "Demo-day decks reviewed", pct: 64, owner: "Meera Iyer" },
  { item: "Data-room completeness avg", pct: 74, owner: "Arjun Nair" },
  { item: "Graduation invites sent", pct: 100, owner: "Divya Menon" },
];

export const COHORT_VI_DEMO_READINESS: DemoReadiness[] = [
  { item: "Working MVP demonstrated", pct: 79, note: "11 of 14 startups", tone: "good" },
  { item: "Demo-day deck submitted", pct: 64, note: "9 of 14 submitted", tone: "warn" },
  { item: "Pilot signed or in negotiation", pct: 57, note: "8 of 14 startups", tone: "warn" },
  { item: "IP filings complete", pct: 45, note: "6 of 14 startups", tone: "bad" },
  { item: "Data room populated", pct: 74, note: "10 of 14 startups", tone: "good" },
  { item: "Investor intro accepted", pct: 50, note: "7 of 14 startups", tone: "warn" },
];

export const COHORT_VI_PULSE: PulseWeek[] = [
  { week: 10, attendance: 82, mentorHours: 34, events: 2, note: "Pilot week — two hospital pilots started" },
  { week: 11, attendance: 86, mentorHours: 37, events: 1, note: "IP clinic ran long, good engagement" },
  { week: 12, attendance: 79, mentorHours: 31, events: 3, note: "Demo-day briefings, decks still thin" },
  { week: 13, attendance: 88, mentorHours: 39, events: 2, note: "Strong week — final stretch begins" },
  { week: 14, attendance: 91, mentorHours: 42, events: 2, note: "Dry run done, 3 decks outstanding" },
];

/* ── Cross-cohort blockers ─────────────────────────────────────── */

export const COHORT_BLOCKERS: Blocker[] = [
  { startup: "FreshChain", blocker: "Co-founder conflict + cash", severity: "High", owner: "Meera", action: "Mediation session Apr 09", age: "11 days", tone: "bad" },
  { startup: "GridSense", blocker: "Runway under 4 months", severity: "High", owner: "Arjun", action: "Emergency bridge plan", age: "8 days", tone: "bad" },
  { startup: "FinEdge", blocker: "NBFC pilot slipping to Q3", severity: "Medium", owner: "Karan", action: "Re-baseline pilot scope", age: "5 days", tone: "warn" },
  { startup: "HealthLoop", blocker: "Pilot stalled 6 weeks", severity: "Medium", owner: "Rohan", action: "Hospital partner escalation", age: "14 days", tone: "warn" },
  { startup: "QuantumLeaf", blocker: "Milestone drift A-3", severity: "Medium", owner: "Meera", action: "Scope re-baseline", age: "4 days", tone: "warn" },
  { startup: "TerraGrid", blocker: "Component supplier delay", severity: "Low", owner: "Vikram", action: "Second source qualified", age: "2 days", tone: "default" },
];

/* ── Progress — live batch tracking ────────────────────────────── */

export const PROGRESS_PHASES: Phase[] = [
  { name: "Orientation", weeks: "Week 0–1", state: "done", tone: "good", focus: "Problem framing and baseline" },
  { name: "Validation", weeks: "Week 2–4", state: "done", tone: "good", focus: "Customer discovery and evidence" },
  { name: "Build", weeks: "Week 5–8", state: "done", tone: "good", focus: "MVP scope and first prototype" },
  { name: "Commercialise", weeks: "Week 9–12", state: "done", tone: "good", focus: "Pilot, pricing and pipeline" },
  { name: "Protect", weeks: "Week 13–14", state: "active", tone: "accent", focus: "IP filings and compliance" },
  { name: "Fund", weeks: "Week 15–16", state: "upcoming", tone: "default", focus: "Data room and investor readiness" },
];

export const VELOCITY: PulseWeek[] = [
  { week: 6, attendance: 74, mentorHours: 28, events: 1, note: "Build phase opened" },
  { week: 7, attendance: 78, mentorHours: 30, events: 1, note: "Two MVPs blocked on hardware" },
  { week: 8, attendance: 81, mentorHours: 33, events: 2, note: "First prototype demos" },
  { week: 9, attendance: 79, mentorHours: 32, events: 2, note: "Pilot scoping week" },
  { week: 10, attendance: 82, mentorHours: 34, events: 2, note: "Pilot week — two hospital pilots started" },
  { week: 11, attendance: 86, mentorHours: 37, events: 1, note: "IP clinic ran long, good engagement" },
  { week: 12, attendance: 79, mentorHours: 31, events: 3, note: "Demo-day briefings, decks still thin" },
  { week: 13, attendance: 88, mentorHours: 39, events: 2, note: "Strong week — final stretch begins" },
  { week: 14, attendance: 91, mentorHours: 42, events: 2, note: "Dry run done, 3 decks outstanding" },
];

export const NEXT_MILESTONES: MilestoneBurn[] = [
  { milestone: "Rohatgi distribution MOU", owner: "Meera Iyer", due: "Apr 10", pct: 20, drift: "12 days late", tone: "bad" },
  { milestone: "Unit 20 deployment", owner: "Sunita D.", due: "Apr 15", pct: 91, drift: "on track", tone: "good" },
  { milestone: "3-operator pilot bundle", owner: "Vikram Rao", due: "Apr 20", pct: 64, drift: "5 days late", tone: "warn" },
  { milestone: "Trademark class 35 filed", owner: "Nandita Bose", due: "Apr 22", pct: 78, drift: "on track", tone: "good" },
  { milestone: "Final demo — Demo Day", owner: "Priya Nair", due: "Apr 28", pct: 86, drift: "2 days late", tone: "warn" },
  { milestone: "NBFC pilot #3 go-live", owner: "Karan Chadha", due: "Apr 30", pct: 42, drift: "9 days late", tone: "bad" },
];

/* ── Analytics — historical comparison ─────────────────────────── */

export const HISTORICAL_COHORTS: HistoricalCohort[] = [
  { name: "Cohort V", track: "Multi-sector", year: "2025–26", size: 16, graduated: 14, survival12: 88, survival36: 71, funding: "₹86 Cr", ipr: 24, jobs: 412, stillActive: 84, tone: "good" },
  { name: "Cohort IV", track: "Multi-sector", year: "2024–25", size: 14, graduated: 12, survival12: 86, survival36: 68, funding: "₹64 Cr", ipr: 19, jobs: 318, stillActive: 82, tone: "good" },
  { name: "Cohort III", track: "AgriTech", year: "2023–24", size: 12, graduated: 9, survival12: 75, survival36: 58, funding: "₹31 Cr", ipr: 11, jobs: 196, stillActive: 75, tone: "accent" },
  { name: "Sprint: AgriTech", track: "AgriTech", year: "2026", size: 8, graduated: 7, survival12: 88, survival36: 0, funding: "₹12 Cr", ipr: 7, jobs: 74, stillActive: 100, tone: "good" },
  { name: "Cohort II", track: "FinTech", year: "2023–24", size: 10, graduated: 7, survival12: 70, survival36: 48, funding: "₹18 Cr", ipr: 6, jobs: 132, stillActive: 70, tone: "warn" },
  { name: "Cohort I", track: "General", year: "2022–23", size: 8, graduated: 5, survival12: 63, survival36: 38, funding: "₹9 Cr", ipr: 3, jobs: 71, stillActive: 63, tone: "warn" },
];

export const SURVIVAL_CURVE: SurvivalPoint[] = [
  { month: 6, cohortV: 100, cohortIV: 100, cohortIII: 100, network: 100 },
  { month: 12, cohortV: 88, cohortIV: 86, cohortIII: 75, network: 74 },
  { month: 18, cohortV: 86, cohortIV: 84, cohortIII: 71, network: 66 },
  { month: 24, cohortV: 84, cohortIV: 82, cohortIII: 67, network: 61 },
  { month: 30, cohortV: 80, cohortIV: 79, cohortIII: 62, network: 55 },
  { month: 36, cohortV: 78, cohortIV: 76, cohortIII: 58, network: 49 },
];

export const OUTCOME_METRICS: OutcomeMetric[] = [
  { metric: "Graduation rate", cohort: "86%", network: "71%", delta: "+15 pts", better: true },
  { metric: "12-month survival", cohort: "88%", network: "74%", delta: "+14 pts", better: true },
  { metric: "36-month survival", cohort: "78%", network: "49%", delta: "+29 pts", better: true },
  { metric: "Capital raised per startup", cohort: "₹61 L", network: "₹38 L", delta: "+61%", better: true },
  { metric: "IP filings per startup", cohort: "1.7", network: "0.9", delta: "+89%", better: true },
  { metric: "Jobs created per startup", cohort: "29", network: "17", delta: "+71%", better: true },
  { metric: "Time to first pilot", cohort: "11 wks", network: "17 wks", delta: "−6 wks", better: true },
  { metric: "Drop-out before demo", cohort: "14%", network: "29%", delta: "−15 pts", better: true },
];

export const BENCHMARKS: Benchmark[] = [
  { metric: "3-year survival", ours: "78%", network: "49%", note: "StartupHub Labs vs national incubation average", tone: "good" },
  { metric: "Capital mobilised", ours: "₹220 Cr", network: "₹96 Cr", note: "Across 5 cohorts since 2022", tone: "good" },
  { metric: "IP filings", ours: "70", network: "38", note: "1.7 filings per graduating startup", tone: "good" },
  { metric: "Jobs created", ours: "1,203", network: "742", note: "For the wider ecosystem, not just our batch", tone: "accent" },
  { metric: "Median weeks to pilot", ours: "11", network: "17", note: "Six weeks faster than the network average", tone: "good" },
  { metric: "Mentor hours per startup", ours: "36", network: "14", note: "2.6× the ecosystem average", tone: "good" },
];
