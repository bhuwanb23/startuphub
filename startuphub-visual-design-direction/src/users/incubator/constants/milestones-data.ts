/* StartupHub Labs — milestone and roadmap datasets.
 *
 * One shared source for the two milestone screens (all milestones,
 * roadmaps). Milestone names, owners, due dates and progress match the
 * burn-up records in `cohorts-data.ts` and the startup slugs match
 * `startups-data.ts`, so the three screens never contradict each other.
 */

/* ── Types ─────────────────────────────────────────────────────── */

export type Tone = "default" | "accent" | "good" | "warn" | "bad";

export type MilestoneState =
  | "On track"
  | "Watch"
  | "At risk"
  | "Blocked"
  | "Overdue"
  | "Done";

export type Milestone = {
  id: string;
  name: string;
  startupSlug: string;
  startup: string;
  cohort: string;
  phase: string;
  owner: string;
  due: string;
  pct: number;
  driftDays: number;
  state: MilestoneState;
  evidence: string;
  tone: Tone;
  blockedBy?: string;
};

export type MilestoneKpi = {
  label: string;
  value: string;
  note: string;
  tone: Tone;
};

export type StateBucket = {
  state: MilestoneState;
  count: number;
  share: number;
  note: string;
  tone: Tone;
};

export type DriftBucket = {
  bucket: string;
  count: number;
  tone: Tone;
};

export type MilestoneOwner = {
  owner: string;
  initials: string;
  assigned: number;
  overdue: number;
  critical: number;
  capacity: number;
  tone: Tone;
};

export type Checkpoint = {
  name: string;
  reviewer: string;
  state: "Approved" | "Pending" | "Blocked" | "Upcoming";
  due: string;
  tone: Tone;
};

export type RoadmapPhase = {
  id: string;
  name: string;
  weeks: string;
  startWeek: number;
  endWeek: number;
  goal: string;
  deliverable: string;
  owner: string;
  milestones: number;
  complete: number;
  tone: Tone;
};

export type Dependency = {
  from: string;
  to: string;
  kind: "gates" | "informs" | "parallel";
};

export type Swimlane = {
  startupSlug: string;
  startup: string;
  cohort: string;
  chain: { id: string; name: string; pct: number; tone: Tone }[];
  overall: number;
};

/* ── The milestone register ────────────────────────────────────── */

export const MILESTONES: Milestone[] = [
  {
    id: "ms-demo-day",
    name: "Final demo — Demo Day",
    startupSlug: "lumen-ai",
    startup: "Lumen AI",
    cohort: "VI",
    phase: "Fund",
    owner: "Priya Nair",
    due: "Apr 28",
    pct: 86,
    driftDays: 2,
    state: "Watch",
    evidence: "Deck drafted, pilot walkthrough ready",
    tone: "warn",
    blockedBy: "ms-trademark",
  },
  {
    id: "ms-unit-20",
    name: "Unit 20 deployment",
    startupSlug: "aquapure",
    startup: "AquaPure",
    cohort: "VI",
    phase: "Commercialise",
    owner: "Sunita D.",
    due: "Apr 15",
    pct: 91,
    driftDays: 0,
    state: "On track",
    evidence: "Site acceptance signed 12 Apr",
    tone: "good",
  },
  {
    id: "ms-pilot-bundle",
    name: "3-operator pilot bundle",
    startupSlug: "terragrid",
    startup: "TerraGrid",
    cohort: "VI",
    phase: "Commercialise",
    owner: "Vikram Rao",
    due: "Apr 20",
    pct: 64,
    driftDays: 5,
    state: "Watch",
    evidence: "2 of 3 operator agreements signed",
    tone: "warn",
    blockedBy: "ms-supplier",
  },
  {
    id: "ms-nbfc-pilot",
    name: "NBFC pilot #3 go-live",
    startupSlug: "finedge",
    startup: "FinEdge",
    cohort: "VII",
    phase: "Commercialise",
    owner: "Karan Chadha",
    due: "Apr 30",
    pct: 42,
    driftDays: 9,
    state: "At risk",
    evidence: "NBFC legal review still open",
    tone: "bad",
    blockedBy: "ms-nbfc-legal",
  },
  {
    id: "ms-rohatgi",
    name: "Rohatgi distribution MOU",
    startupSlug: "freshchain",
    startup: "FreshChain",
    cohort: "VII",
    phase: "Commercialise",
    owner: "Meera Iyer",
    due: "Apr 10",
    pct: 20,
    driftDays: 12,
    state: "Overdue",
    evidence: "Awaiting counterparty signature",
    tone: "bad",
  },
  {
    id: "ms-ground-station",
    name: "Ground station #10 live",
    startupSlug: "orbitalworks",
    startup: "OrbitalWorks",
    cohort: "VI",
    phase: "Build",
    owner: "Priya Nair",
    due: "May 06",
    pct: 55,
    driftDays: 0,
    state: "On track",
    evidence: "Stations 1–9 commissioned, #10 in calibration",
    tone: "good",
  },
  {
    id: "ms-trademark",
    name: "Trademark class 35 filed",
    startupSlug: "bloombio",
    startup: "BloomBio",
    cohort: "VI",
    phase: "Protect",
    owner: "Nandita Bose",
    due: "Apr 22",
    pct: 78,
    driftDays: 0,
    state: "On track",
    evidence: "Claims draft with counsel, filing queued",
    tone: "good",
  },
  {
    id: "ms-hospital-6",
    name: "Hospital #6 go-live",
    startupSlug: "medsync",
    startup: "MedSync",
    cohort: "IV",
    phase: "Commercialise",
    owner: "Sunita D.",
    due: "May 12",
    pct: 74,
    driftDays: 0,
    state: "On track",
    evidence: "5 sites live, #6 in onboarding",
    tone: "good",
  },
  {
    id: "ms-school-pilot",
    name: "School pilot #2",
    startupSlug: "edufold",
    startup: "EduFold",
    cohort: "VII",
    phase: "Commercialise",
    owner: "Karan Chadha",
    due: "Apr 24",
    pct: 66,
    driftDays: 0,
    state: "Watch",
    evidence: "Pilot 1 in place, #2 scheduled",
    tone: "warn",
  },
  {
    id: "ms-bridge-plan",
    name: "Bridge plan close",
    startupSlug: "gridsense",
    startup: "GridSense",
    cohort: "V",
    phase: "Fund",
    owner: "Arjun Nair",
    due: "Apr 18",
    pct: 38,
    driftDays: 8,
    state: "Blocked",
    evidence: "Waiting on investor term sheet",
    tone: "bad",
    blockedBy: "ms-bridge-terms",
  },
  {
    id: "ms-pilot-unblock",
    name: "Pilot unblock — new hospital",
    startupSlug: "healthloop",
    startup: "HealthLoop",
    cohort: "VII",
    phase: "Commercialise",
    owner: "Rohan Pillai",
    due: "Apr 16",
    pct: 47,
    driftDays: 14,
    state: "At risk",
    evidence: "Partner intro booked for 22 Apr",
    tone: "bad",
  },
  {
    id: "ms-scope-rebaseline",
    name: "Scope re-baseline",
    startupSlug: "quantumleaf",
    startup: "QuantumLeaf",
    cohort: "VII",
    phase: "Build",
    owner: "Meera Iyer",
    due: "Apr 12",
    pct: 54,
    driftDays: 4,
    state: "Watch",
    evidence: "New milestone plan drafted",
    tone: "warn",
  },
  {
    id: "ms-pilot-mou",
    name: "Pilot MOU",
    startupSlug: "silkroute",
    startup: "SilkRoute AI",
    cohort: "VI",
    phase: "Commercialise",
    owner: "Arjun Bedekar",
    due: "Apr 22",
    pct: 58,
    driftDays: 0,
    state: "On track",
    evidence: "MOU with logistics partner drafted",
    tone: "good",
  },
  {
    id: "ms-kpi-baseline",
    name: "KPI baseline submitted",
    startupSlug: "aquapure",
    startup: "AquaPure",
    cohort: "VI",
    phase: "Orientation",
    owner: "Rohan Pillai",
    due: "Mar 10",
    pct: 100,
    driftDays: 0,
    state: "Done",
    evidence: "Baseline deck submitted 08 Mar",
    tone: "good",
  },
  {
    id: "ms-pilot-report",
    name: "Pilot deployment report",
    startupSlug: "lumen-ai",
    startup: "Lumen AI",
    cohort: "VI",
    phase: "Commercialise",
    owner: "Priya Nair",
    due: "Apr 18",
    pct: 88,
    driftDays: 0,
    state: "On track",
    evidence: "Report drafted, review scheduled",
    tone: "good",
  },
  {
    id: "ms-unit-economics",
    name: "Unit economics model",
    startupSlug: "finedge",
    startup: "FinEdge",
    cohort: "VII",
    phase: "Build",
    owner: "Karan Chadha",
    due: "Apr 20",
    pct: 62,
    driftDays: 3,
    state: "Watch",
    evidence: "Model v2 with cohort data",
    tone: "warn",
  },
  {
    id: "ms-investor-onepager",
    name: "Investor one-pager",
    startupSlug: "orbitalworks",
    startup: "OrbitalWorks",
    cohort: "VI",
    phase: "Fund",
    owner: "Arjun Nair",
    due: "Apr 24",
    pct: 71,
    driftDays: 0,
    state: "On track",
    evidence: "One-pager in review with investor desk",
    tone: "good",
  },
  {
    id: "ms-supplier",
    name: "Second component source qualified",
    startupSlug: "terragrid",
    startup: "TerraGrid",
    cohort: "VI",
    phase: "Build",
    owner: "Vikram Rao",
    due: "Apr 10",
    pct: 100,
    driftDays: 0,
    state: "Done",
    evidence: "Alternate supplier approved 08 Apr",
    tone: "good",
  },
  {
    id: "ms-nbfc-legal",
    name: "NBFC legal review",
    startupSlug: "finedge",
    startup: "FinEdge",
    cohort: "VII",
    phase: "Protect",
    owner: "Karan Chadha",
    due: "Apr 14",
    pct: 30,
    driftDays: 6,
    state: "Blocked",
    evidence: "Awaiting NBFC counsel opinion",
    tone: "bad",
  },
  {
    id: "ms-bridge-terms",
    name: "Bridge term sheet",
    startupSlug: "gridsense",
    startup: "GridSense",
    cohort: "V",
    phase: "Fund",
    owner: "Arjun Nair",
    due: "Apr 16",
    pct: 22,
    driftDays: 11,
    state: "Overdue",
    evidence: "Nexus Angels reviewing, no term sheet yet",
    tone: "bad",
  },
];

export const MILESTONE_KPIS: MilestoneKpi[] = [
  { label: "Active milestones", value: "24", note: "across 8 cohorts", tone: "accent" },
  { label: "Completed this quarter", value: "61", note: "+18 vs last quarter", tone: "good" },
  { label: "Overdue", value: "5", note: "2 need escalation", tone: "bad" },
  { label: "On-time rate", value: "86%", note: "vs 74% network avg", tone: "good" },
];

export const STATE_BUCKETS: StateBucket[] = [
  { state: "On track", count: 61, share: 46, note: "Committed and moving", tone: "good" },
  { state: "Watch", count: 38, share: 29, note: "Slipping but recoverable", tone: "warn" },
  { state: "At risk", count: 14, share: 11, note: "Needs an intervention", tone: "bad" },
  { state: "Blocked", count: 8, share: 6, note: "Waiting on someone else", tone: "bad" },
  { state: "Overdue", count: 5, share: 4, note: "Past due date", tone: "bad" },
  { state: "Done", count: 7, share: 5, note: "Closed this month", tone: "accent" },
];

export const DRIFT_BUCKETS: DriftBucket[] = [
  { bucket: "On time", count: 61, tone: "good" },
  { bucket: "1–3 days late", count: 22, tone: "default" },
  { bucket: "4–7 days late", count: 14, tone: "warn" },
  { bucket: "8–14 days late", count: 9, tone: "bad" },
  { bucket: "Over 14 days late", count: 3, tone: "bad" },
];

export const MILESTONE_OWNERS: MilestoneOwner[] = [
  { owner: "Priya Nair", initials: "PN", assigned: 7, overdue: 0, critical: 0, capacity: 8, tone: "good" },
  { owner: "Sunita D.", initials: "SD", assigned: 6, overdue: 0, critical: 0, capacity: 8, tone: "good" },
  { owner: "Arjun Nair", initials: "AN", assigned: 6, overdue: 2, critical: 1, capacity: 8, tone: "warn" },
  { owner: "Vikram Rao", initials: "VR", assigned: 5, overdue: 0, critical: 0, capacity: 7, tone: "good" },
  { owner: "Karan Chadha", initials: "KC", assigned: 5, overdue: 1, critical: 1, capacity: 6, tone: "warn" },
  { owner: "Meera Iyer", initials: "MI", assigned: 4, overdue: 1, critical: 1, capacity: 6, tone: "warn" },
  { owner: "Rohan Pillai", initials: "RP", assigned: 4, overdue: 0, critical: 0, capacity: 6, tone: "good" },
  { owner: "Nandita Bose", initials: "NB", assigned: 3, overdue: 0, critical: 0, capacity: 5, tone: "default" },
];

export const REVIEW_CHECKPOINTS: Checkpoint[] = [
  { name: "Eligibility screening", reviewer: "Rohan Pillai", state: "Approved", due: "28 Mar 2026", tone: "good" },
  { name: "Criterion scoring", reviewer: "Meera Iyer", state: "Pending", due: "08 Apr 2026", tone: "warn" },
  { name: "Co-founder reference calls", reviewer: "Nandita Bose", state: "Blocked", due: "05 Apr 2026", tone: "bad" },
  { name: "IP and compliance check", reviewer: "Nandita Bose", state: "Approved", due: "30 Mar 2026", tone: "good" },
  { name: "Investor readiness check", reviewer: "Arjun Nair", state: "Upcoming", due: "18 Apr 2026", tone: "default" },
  { name: "Demo-day deck sign-off", reviewer: "Meera Iyer", state: "Upcoming", due: "24 Apr 2026", tone: "default" },
];

/* ── The programme roadmap ─────────────────────────────────────── */

export const ROADMAP_PHASES: RoadmapPhase[] = [
  { id: "ph-orientation", name: "Orientation", weeks: "Week 0–1", startWeek: 0, endWeek: 1, goal: "Frame the problem and baseline where we are today", deliverable: "One-page problem statement", owner: "Rohan Pillai", milestones: 6, complete: 6, tone: "good" },
  { id: "ph-validation", name: "Validation", weeks: "Week 2–4", startWeek: 2, endWeek: 4, goal: "Prove the problem is real, frequent and expensive", deliverable: "Validated insight pack", owner: "Rohan Pillai", milestones: 9, complete: 8, tone: "good" },
  { id: "ph-build", name: "Build", weeks: "Week 5–8", startWeek: 5, endWeek: 8, goal: "Get a working product in front of a real customer", deliverable: "Working MVP", owner: "Farhan Qureshi", milestones: 11, complete: 9, tone: "warn" },
  { id: "ph-commercialise", name: "Commercialise", weeks: "Week 9–12", startWeek: 9, endWeek: 12, goal: "Convert pilots into pricing and pipeline", deliverable: "Signed pilot", owner: "Arjun Nair", milestones: 14, complete: 10, tone: "warn" },
  { id: "ph-protect", name: "Protect", weeks: "Week 13–14", startWeek: 13, endWeek: 14, goal: "File the IP and clear compliance", deliverable: "Filed IP + compliance pack", owner: "Nandita Bose", milestones: 7, complete: 5, tone: "warn" },
  { id: "ph-fund", name: "Fund", weeks: "Week 15–16", startWeek: 15, endWeek: 16, goal: "Be investor-ready on the day you demo", deliverable: "Investor-ready data room", owner: "Arjun Nair", milestones: 5, complete: 3, tone: "accent" },
];

export const DEPENDENCIES: Dependency[] = [
  { from: "ms-kpi-baseline", to: "ms-unit-20", kind: "gates" },
  { from: "ms-supplier", to: "ms-pilot-bundle", kind: "gates" },
  { from: "ms-pilot-bundle", to: "ms-pilot-mou", kind: "informs" },
  { from: "ms-trademark", to: "ms-demo-day", kind: "gates" },
  { from: "ms-nbfc-legal", to: "ms-nbfc-pilot", kind: "gates" },
  { from: "ms-bridge-terms", to: "ms-bridge-plan", kind: "gates" },
  { from: "ms-rohatgi", to: "ms-pilot-mou", kind: "parallel" },
  { from: "ms-unit-economics", to: "ms-investor-onepager", kind: "informs" },
  { from: "ms-pilot-report", to: "ms-investor-onepager", kind: "gates" },
];

/* The chain that gates graduation — the longest dependency path to the
   demo day, and the one a cohort lead watches weekly. */
export const CRITICAL_PATH = {
  startup: "Lumen AI",
  startupSlug: "lumen-ai",
  totalWeeks: 16,
  leadWeeks: 13,
  summary:
    "A filing waits on a claims draft, the demo day waits on the filing, and the filing waits on the validated baseline. Break any link and the whole chain slips.",
  steps: [
    { id: "ms-kpi-baseline", name: "KPI baseline submitted", week: 1, owner: "Rohan Pillai" },
    { id: "ms-trademark", name: "Trademark class 35 filed", week: 14, owner: "Nandita Bose" },
    { id: "ms-demo-day", name: "Final demo — Demo Day", week: 16, owner: "Priya Nair" },
  ],
};

export const SWIMLANES: Swimlane[] = [
  {
    startupSlug: "lumen-ai",
    startup: "Lumen AI",
    cohort: "VI",
    overall: 86,
    chain: [
      { id: "ms-kpi-baseline", name: "KPI baseline", pct: 100, tone: "good" },
      { id: "ms-pilot-report", name: "Pilot report", pct: 88, tone: "good" },
      { id: "ms-trademark", name: "Trademark", pct: 78, tone: "good" },
      { id: "ms-demo-day", name: "Demo day", pct: 86, tone: "accent" },
    ],
  },
  {
    startupSlug: "aquapure",
    startup: "AquaPure",
    cohort: "VI",
    overall: 91,
    chain: [
      { id: "ms-kpi-baseline", name: "KPI baseline", pct: 100, tone: "good" },
      { id: "ms-unit-20", name: "Unit 20", pct: 91, tone: "good" },
    ],
  },
  {
    startupSlug: "terragrid",
    startup: "TerraGrid",
    cohort: "VI",
    overall: 68,
    chain: [
      { id: "ms-supplier", name: "2nd source", pct: 100, tone: "good" },
      { id: "ms-pilot-bundle", name: "Pilot bundle", pct: 64, tone: "warn" },
    ],
  },
  {
    startupSlug: "finedge",
    startup: "FinEdge",
    cohort: "VII",
    overall: 52,
    chain: [
      { id: "ms-unit-economics", name: "Unit economics", pct: 62, tone: "warn" },
      { id: "ms-nbfc-legal", name: "NBFC legal", pct: 30, tone: "bad" },
      { id: "ms-nbfc-pilot", name: "NBFC pilot", pct: 42, tone: "bad" },
    ],
  },
  {
    startupSlug: "orbitalworks",
    startup: "OrbitalWorks",
    cohort: "VI",
    overall: 74,
    chain: [
      { id: "ms-ground-station", name: "Ground station", pct: 55, tone: "warn" },
      { id: "ms-investor-onepager", name: "Investor 1-pager", pct: 71, tone: "good" },
    ],
  },
  {
    startupSlug: "gridsense",
    startup: "GridSense",
    cohort: "V",
    overall: 30,
    chain: [
      { id: "ms-bridge-terms", name: "Bridge terms", pct: 22, tone: "bad" },
      { id: "ms-bridge-plan", name: "Bridge plan", pct: 38, tone: "bad" },
    ],
  },
];
