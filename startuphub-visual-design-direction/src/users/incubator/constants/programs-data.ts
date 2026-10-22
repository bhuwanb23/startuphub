/* StartupHub Labs — program datasets.
 *
 * One shared source for the six program screens (management,
 * applications, evaluation, selection, discovery, calendar). Typed at
 * the boundary so a page can never render a row that is missing a
 * field, and so the same program / applicant record is identical
 * wherever it appears.
 */

/* ── Types ─────────────────────────────────────────────────────── */

export type Tone = "default" | "accent" | "good" | "warn" | "bad";

export type ProgramStatus = "Active" | "Intake" | "Completed";

export type Program = {
  slug: string;
  name: string;
  type: "Incubation" | "Sprint" | "Accelerator";
  seats: number;
  filled: number;
  stage: string;
  status: ProgramStatus;
  tone: Tone;
  weeks: number;
  start: string;
  end: string;
  lead: string;
  sector: string;
};

export type ProgramKpi = {
  label: string;
  value: string;
  note: string;
  tone: Tone;
};

export type CurriculumPhase = {
  phase: string;
  weeks: string;
  focus: string;
  deliverable: string;
  owner: string;
};

export type ProgramLead = {
  name: string;
  role: string;
  initials: string;
  program: string;
  load: number;
  tone: Tone;
};

export type ProgramPartner = {
  name: string;
  kind: string;
  program: string;
  contribution: string;
};

export type ApplicationStatus =
  | "New"
  | "In review"
  | "Shortlisted"
  | "Offer out"
  | "Accepted"
  | "Waitlisted"
  | "Declined";

export type Application = {
  id: string;
  startup: string;
  sector: string;
  stage: "Idea" | "Validation" | "MVP" | "Growth";
  score: number;
  status: ApplicationStatus;
  applied: string;
  reviewer: string;
  completeness: number;
  documents: string;
  need: string;
  funding: string;
};

export type PipelineStage = {
  stage: ApplicationStatus;
  count: number;
  note: string;
  conversion: string;
  tone: Tone;
};

export type IntakeSource = {
  source: string;
  count: number;
  share: number;
  note: string;
};

export type ScreeningCheck = {
  check: string;
  required: boolean;
  passed: number;
  total: number;
  note: string;
};

export type ReviewerLoad = {
  reviewer: string;
  assigned: number;
  capacity: number;
  overdue: number;
  initials: string;
  tone: Tone;
};

export type Criterion = {
  key: string;
  label: string;
  weight: number;
  rubric: string;
};

export type Scorecard = {
  applicationId: string;
  scores: Record<string, number>;
  total: number;
  recommendation: "Accept" | "Hold" | "Reject";
  note: string;
  flags: string[];
};

export type ReviewQueueItem = {
  applicationId: string;
  startup: string;
  waiting: string;
  priority: "High" | "Normal" | "Low";
  reviewer: string;
  tone: Tone;
};

export type ScoreDistribution = {
  band: string;
  count: number;
  note: string;
};

export type ReviewCheckpoint = {
  name: string;
  reviewer: string;
  state: "Approved" | "Pending" | "Blocked" | "Upcoming";
  tone: Tone;
  due: string;
};

export type ShortlistEntry = {
  applicationId: string;
  startup: string;
  sector: string;
  composite: number;
  fit: number;
  traction: number;
  recommendation: "Accept" | "Hold" | "Reject";
  seats: number;
  note: string;
  tone: Tone;
};

export type CommitteeMember = {
  name: string;
  role: string;
  initials: string;
  votes: string;
  tone: Tone;
};

export type Decision = {
  startup: string;
  decision: "Accepted" | "Waitlisted" | "Declined";
  date: string;
  reason: string;
  tone: Tone;
};

export type SeatAllocation = {
  program: string;
  offered: number;
  seats: number;
  tone: Tone;
};

export type OfferTerms = {
  startup: string;
  grant: string;
  duration: string;
  equity: string;
  facilities: string;
  status: "Ready" | "Pending";
};

export type OnboardingStep = {
  step: string;
  done: number;
  total: number;
  owner: string;
};

export type ExternalProgram = {
  slug: string;
  name: string;
  org: string;
  sector: string;
  mode: "Cohort" | "Open call" | "Accelerator" | "Challenge";
  location: string;
  window: "Open" | "Opens soon" | "Closed";
  deadline: string;
  seats: number;
  partner: boolean;
  fit: number;
  note: string;
  tone: Tone;
};

export type ApplicationWindow = {
  program: string;
  window: string;
  next: string;
  tone: Tone;
};

export type AlumniOutcome = {
  startup: string;
  cohort: string;
  outcome: string;
  year: string;
};

export type Consortium = {
  name: string;
  members: number;
  focus: string;
  next: string;
};

export type CalendarEventType =
  | "Intake"
  | "Review"
  | "Demo day"
  | "Milestone"
  | "Deadline"
  | "Decision"
  | "Workshop";

export type CalendarEvent = {
  id: string;
  title: string;
  day: number;
  month: number;
  type: CalendarEventType;
  time: string;
  cohort: string;
  location: string;
  note: string;
};

export type KeyDate = {
  date: string;
  days: string;
  title: string;
  detail: string;
  type: CalendarEventType;
  tone: Tone;
};

export type CalendarConflict = {
  title: string;
  detail: string;
  impact: string;
  tone: Tone;
};

/* ── Programs ──────────────────────────────────────────────────── */

export const PROGRAMS: Program[] = [
  {
    slug: "cohort-vi",
    name: "Cohort VI — General",
    type: "Incubation",
    seats: 16,
    filled: 14,
    stage: "Graduation sprint",
    status: "Active",
    tone: "accent",
    weeks: 16,
    start: "02 Feb 2026",
    end: "28 Apr 2026",
    lead: "Rohan Pillai",
    sector: "Multi-sector",
  },
  {
    slug: "cohort-vii",
    name: "Cohort VII — General",
    type: "Incubation",
    seats: 16,
    filled: 12,
    stage: "Week 9 of 16",
    status: "Active",
    tone: "accent",
    weeks: 16,
    start: "04 May 2026",
    end: "24 Aug 2026",
    lead: "Rohan Pillai",
    sector: "Multi-sector",
  },
  {
    slug: "agritech-sprint",
    name: "Sprint: AgriTech Deep Dive",
    type: "Sprint",
    seats: 10,
    filled: 8,
    stage: "Milestone week 6",
    status: "Active",
    tone: "accent",
    weeks: 8,
    start: "20 Jan 2026",
    end: "17 Mar 2026",
    lead: "Divya Menon",
    sector: "AgriTech",
  },
  {
    slug: "cohort-viii",
    name: "Cohort VIII — Intake",
    type: "Incubation",
    seats: 16,
    filled: 0,
    stage: "Applications open",
    status: "Intake",
    tone: "warn",
    weeks: 16,
    start: "03 Aug 2026",
    end: "23 Nov 2026",
    lead: "Meera Iyer",
    sector: "Multi-sector",
  },
  {
    slug: "cohort-v",
    name: "Cohort V — Alumni",
    type: "Incubation",
    seats: 16,
    filled: 16,
    stage: "Graduated Jan 2026",
    status: "Completed",
    tone: "default",
    weeks: 16,
    start: "06 Jan 2025",
    end: "27 Apr 2025",
    lead: "Meera Iyer",
    sector: "Multi-sector",
  },
];

export const PROGRAM_KPIS: ProgramKpi[] = [
  { label: "Active programs", value: "3", note: "running right now", tone: "accent" },
  { label: "Startups in pipeline", value: "34", note: "across 3 live batches", tone: "default" },
  { label: "Seat utilisation", value: "85%", note: "34 of 42 seats filled", tone: "good" },
  { label: "Avg time to graduation", value: "16 wks", note: "unchanged for 3 cohorts", tone: "default" },
];

export const CURRICULUM: CurriculumPhase[] = [
  { phase: "Orientation", weeks: "Week 0–1", focus: "Problem framing and baseline", deliverable: "One-page problem statement", owner: "Rohan Pillai" },
  { phase: "Validation", weeks: "Week 2–4", focus: "Customer discovery and evidence", deliverable: "Validated insight pack", owner: "Rohan Pillai" },
  { phase: "Build", weeks: "Week 5–8", focus: "MVP scope and first prototype", deliverable: "Working MVP", owner: "Farhan Qureshi" },
  { phase: "Commercialise", weeks: "Week 9–12", focus: "Pilot, pricing and pipeline", deliverable: "Signed pilot", owner: "Arjun Nair" },
  { phase: "Protect", weeks: "Week 13–14", focus: "IP filings and compliance", deliverable: "Filed IP + compliance pack", owner: "Nandita Bose" },
  { phase: "Fund", weeks: "Week 15–16", focus: "Data room and investor readiness", deliverable: "Investor-ready data room", owner: "Arjun Nair" },
];

export const PROGRAM_LEADS: ProgramLead[] = [
  { name: "Rohan Pillai", role: "Program Manager", initials: "RP", program: "Cohort VI, VII", load: 74, tone: "accent" },
  { name: "Meera Iyer", role: "Program Director", initials: "MI", program: "Cohort VIII", load: 82, tone: "accent" },
  { name: "Divya Menon", role: "Community & Events", initials: "DM", program: "AgriTech Sprint", load: 58, tone: "default" },
  { name: "Arjun Nair", role: "Funding Lead", initials: "AN", program: "All programs", load: 66, tone: "default" },
  { name: "Nandita Bose", role: "IPR Counsel", initials: "NB", program: "Protect phase", load: 47, tone: "default" },
];

export const PROGRAM_PARTNERS: ProgramPartner[] = [
  { name: "CIED Pune", kind: "Incubator network", program: "Cohort VI", contribution: "Referrals and shared demo days" },
  { name: "T-Hub Health", kind: "Sector partner", program: "Cohort VII", contribution: "Hospital pilots for health startups" },
  { name: "Kerala Startup Mission", kind: "State mission", program: "Cohort VIII", contribution: "State grant co-application" },
  { name: "Nexus Angels", kind: "Angel syndicate", program: "All programs", contribution: "Term sheets at demo day" },
  { name: "Nimbus Cloud", kind: "Infrastructure", program: "All programs", contribution: "₹2.4 Cr in credits" },
  { name: "SH IPR Desk", kind: "IP services", program: "Protect phase", contribution: "Pro bono filings" },
];

/* ── Applications ──────────────────────────────────────────────── */

export const APPLICATIONS: Application[] = [
  { id: "app-northwind", startup: "NorthWind Energy", sector: "ClimateTech", stage: "MVP", score: 88, status: "Shortlisted", applied: "22 Mar", reviewer: "Meera Iyer", completeness: 100, documents: "12/12", need: "₹4 Cr seed", funding: "Raised ₹40L" },
  { id: "app-meddata", startup: "MedData Labs", sector: "HealthTech", stage: "MVP", score: 84, status: "Shortlisted", applied: "24 Mar", reviewer: "Rohan Pillai", completeness: 92, documents: "11/12", need: "₹3.2 Cr seed", funding: "Raised ₹25L" },
  { id: "app-silkroute", startup: "SilkRoute AI", sector: "Logistics", stage: "Validation", score: 79, status: "In review", applied: "27 Mar", reviewer: "Meera Iyer", completeness: 83, documents: "10/12", need: "₹2.5 Cr seed", funding: "Bootstrapped" },
  { id: "app-bloombio", startup: "BloomBio", sector: "BioTech", stage: "MVP", score: 76, status: "In review", applied: "28 Mar", reviewer: "Arjun Nair", completeness: 75, documents: "9/12", need: "₹5 Cr seed", funding: "Raised ₹60L" },
  { id: "app-cartedge", startup: "CartEdge", sector: "Commerce", stage: "Idea", score: 71, status: "New", applied: "01 Apr", reviewer: "Unassigned", completeness: 58, documents: "7/12", need: "₹1.5 Cr seed", funding: "Bootstrapped" },
  { id: "app-ledgerly", startup: "Ledgerly", sector: "FinTech", stage: "Growth", score: 66, status: "New", applied: "02 Apr", reviewer: "Unassigned", completeness: 50, documents: "6/12", need: "₹8 Cr Series A", funding: "Raised ₹1.2 Cr" },
  { id: "app-aquaglow", startup: "AquaGlow", sector: "CleanTech", stage: "Validation", score: 74, status: "In review", applied: "30 Mar", reviewer: "Nandita Bose", completeness: 92, documents: "11/12", need: "₹2 Cr seed", funding: "Raised ₹15L" },
  { id: "app-terraforge", startup: "TerraForge", sector: "SpaceTech", stage: "Idea", score: 62, status: "New", applied: "03 Apr", reviewer: "Unassigned", completeness: 42, documents: "5/12", need: "₹3 Cr seed", funding: "Pre-seed" },
  { id: "app-mediscan", startup: "MediScan", sector: "HealthTech", stage: "Growth", score: 81, status: "Shortlisted", applied: "26 Mar", reviewer: "Meera Iyer", completeness: 100, documents: "12/12", need: "₹6 Cr Series A", funding: "Raised ₹90L" },
  { id: "app-veggieflow", startup: "VeggieFlow", sector: "AgriTech", stage: "MVP", score: 68, status: "In review", applied: "01 Apr", reviewer: "Divya Menon", completeness: 67, documents: "8/12", need: "₹1.8 Cr seed", funding: "Raised ₹20L" },
];

export const PIPELINE: PipelineStage[] = [
  { stage: "New", count: 12, note: "awaiting first read", conversion: "100%", tone: "default" },
  { stage: "In review", count: 9, note: "with a reviewer", conversion: "43%", tone: "warn" },
  { stage: "Shortlisted", count: 4, note: "scored above 75", conversion: "31%", tone: "accent" },
  { stage: "Offer out", count: 2, note: "term sheet sent", conversion: "12%", tone: "accent" },
  { stage: "Accepted", count: 1, note: "joined Cohort VIII", conversion: "6%", tone: "good" },
];

export const INTAKE_SOURCES: IntakeSource[] = [
  { source: "Alumni referral", count: 9, share: 39, note: "Highest acceptance rate" },
  { source: "Direct application", count: 6, share: 26, note: "Steady across cohorts" },
  { source: "Partner ecosystem", count: 4, share: 17, note: "CIED, T-Hub" },
  { source: "Founder network", count: 3, share: 13, note: "Mentor-introduced" },
  { source: "Open call", count: 1, share: 5, note: "One campaign only" },
];

export const SCREENING_CHECKS: ScreeningCheck[] = [
  { check: "Entity and registration", required: true, passed: 23, total: 23, note: "Automatic" },
  { check: "Founder background", required: true, passed: 23, total: 23, note: "Automatic" },
  { check: "Problem statement", required: true, passed: 21, total: 23, note: "Manual check" },
  { check: "Prototype or MVP evidence", required: true, passed: 16, total: 23, note: "Manual check" },
  { check: "Traction snapshot", required: false, passed: 11, total: 23, note: "Optional" },
  { check: "IP and compliance", required: true, passed: 19, total: 23, note: "Manual check" },
  { check: "Funding ask and use", required: true, passed: 22, total: 23, note: "Automatic" },
];

export const REVIEWER_LOADS: ReviewerLoad[] = [
  { reviewer: "Meera Iyer", assigned: 5, capacity: 6, overdue: 1, initials: "MI", tone: "bad" },
  { reviewer: "Rohan Pillai", assigned: 4, capacity: 6, overdue: 0, initials: "RP", tone: "accent" },
  { reviewer: "Arjun Nair", assigned: 3, capacity: 5, overdue: 0, initials: "AN", tone: "default" },
  { reviewer: "Nandita Bose", assigned: 3, capacity: 5, overdue: 1, initials: "NB", tone: "warn" },
  { reviewer: "Divya Menon", assigned: 2, capacity: 4, overdue: 0, initials: "DM", tone: "default" },
];

/* ── Evaluation ────────────────────────────────────────────────── */

export const CRITERIA: Criterion[] = [
  { key: "problem", label: "Problem clarity", weight: 20, rubric: "Is the problem specific, frequent and expensive?" },
  { key: "team", label: "Team", weight: 20, rubric: "Do the founders have the skills and the reason to win?" },
  { key: "market", label: "Market size", weight: 15, rubric: "Is the wedge large enough to build a business on?" },
  { key: "traction", label: "Traction signal", weight: 15, rubric: "Is there evidence beyond founder belief?" },
  { key: "mvp", label: "MVP maturity", weight: 15, rubric: "How close is a working product?" },
  { key: "coach", label: "Coachability", weight: 15, rubric: "Will this founder take the hard feedback?" },
];

export const SCORECARDS: Scorecard[] = [
  {
    applicationId: "app-northwind",
    scores: { problem: 92, team: 90, market: 88, traction: 84, mvp: 86, coach: 88 },
    total: 88,
    recommendation: "Accept",
    note: "Clear wedge, credible field data, and a team that has shipped industrial hardware before.",
    flags: [],
  },
  {
    applicationId: "app-meddata",
    scores: { problem: 86, team: 82, market: 84, traction: 80, mvp: 88, coach: 84 },
    total: 84,
    recommendation: "Accept",
    note: "Strong hospital relationships, prototype already in two clinics.",
    flags: [],
  },
  {
    applicationId: "app-mediscan",
    scores: { problem: 84, team: 78, market: 80, traction: 82, mvp: 80, coach: 82 },
    total: 81,
    recommendation: "Hold",
    note: "Good business, but the regulatory timeline is unproven for their imaging modality.",
    flags: ["Regulatory path unclear"],
  },
  {
    applicationId: "app-silkroute",
    scores: { problem: 82, team: 76, market: 80, traction: 72, mvp: 80, coach: 78 },
    total: 79,
    recommendation: "Hold",
    note: "Convincing data, thin team on the hardware side.",
    flags: ["Reviewer split on team depth"],
  },
  {
    applicationId: "app-bloombio",
    scores: { problem: 78, team: 80, market: 74, traction: 70, mvp: 76, coach: 78 },
    total: 76,
    recommendation: "Hold",
    note: "Strong science, but the commercial path needs a partner.",
    flags: ["No signed pilot"],
  },
  {
    applicationId: "app-aquaglow",
    scores: { problem: 76, team: 72, market: 72, traction: 70, mvp: 80, coach: 74 },
    total: 74,
    recommendation: "Hold",
    note: "Worth a second look if they land one more pilot.",
    flags: [],
  },
  {
    applicationId: "app-cartedge",
    scores: { problem: 74, team: 70, market: 68, traction: 64, mvp: 70, coach: 72 },
    total: 71,
    recommendation: "Hold",
    note: "Attractive space, early on everything.",
    flags: ["No prototype yet"],
  },
];

export const REVIEW_QUEUE: ReviewQueueItem[] = [
  { applicationId: "app-ledgerly", startup: "Ledgerly", waiting: "3 days", priority: "Normal", reviewer: "Unassigned", tone: "default" },
  { applicationId: "app-terraforge", startup: "TerraForge", waiting: "2 days", priority: "Low", reviewer: "Unassigned", tone: "default" },
  { applicationId: "app-veggieflow", startup: "VeggieFlow", waiting: "1 day", priority: "Normal", reviewer: "Divya Menon", tone: "warn" },
  { applicationId: "app-silkroute", startup: "SilkRoute AI", waiting: "5 days", priority: "High", reviewer: "Meera Iyer", tone: "bad" },
  { applicationId: "app-bloombio", startup: "BloomBio", waiting: "4 days", priority: "High", reviewer: "Arjun Nair", tone: "bad" },
];

export const SCORE_DISTRIBUTION: ScoreDistribution[] = [
  { band: "85–100", count: 2, note: "accept" },
  { band: "75–84", count: 3, note: "hold" },
  { band: "65–74", count: 3, note: "borderline" },
  { band: "50–64", count: 2, note: "reject" },
  { band: "below 50", count: 1, note: "auto-reject" },
];

export const REVIEW_CHECKPOINTS: ReviewCheckpoint[] = [
  { name: "Eligibility screening", reviewer: "Rohan Pillai", state: "Approved", tone: "good", due: "28 Mar 2026" },
  { name: "Criterion scoring", reviewer: "Meera Iyer", state: "Pending", tone: "warn", due: "08 Apr 2026" },
  { name: "Co-founder reference calls", reviewer: "Nandita Bose", state: "Blocked", tone: "bad", due: "05 Apr 2026" },
  { name: "IP and compliance check", reviewer: "Nandita Bose", state: "Approved", tone: "good", due: "30 Mar 2026" },
  { name: "Committee review", reviewer: "Full committee", state: "Upcoming", tone: "default", due: "18 Apr 2026" },
];

export const CALIBRATION = {
  acceptedAverage: 87,
  rejectedAverage: 64,
  spread: 23,
  note: "Two reviewers sit 14 points apart on team depth — worth calibrating before the committee sits.",
};

/* ── Selection ─────────────────────────────────────────────────── */

export const SHORTLIST: ShortlistEntry[] = [
  { applicationId: "app-northwind", startup: "NorthWind Energy", sector: "ClimateTech", composite: 88, fit: 90, traction: 84, recommendation: "Accept", seats: 1, note: "Top of the pool and a natural fit for the Cohort VI tail.", tone: "good" },
  { applicationId: "app-meddata", startup: "MedData Labs", sector: "HealthTech", composite: 84, fit: 86, traction: 80, recommendation: "Accept", seats: 1, note: "Two signed pilots already.", tone: "good" },
  { applicationId: "app-mediscan", startup: "MediScan", sector: "HealthTech", composite: 81, fit: 82, traction: 82, recommendation: "Hold", seats: 1, note: "Waiting on the regulatory pathway.", tone: "warn" },
  { applicationId: "app-silkroute", startup: "SilkRoute AI", sector: "Logistics", composite: 79, fit: 80, traction: 72, recommendation: "Hold", seats: 1, note: "Team depth is the open question.", tone: "warn" },
  { applicationId: "app-bloombio", startup: "BloomBio", sector: "BioTech", composite: 76, fit: 78, traction: 70, recommendation: "Hold", seats: 1, note: "Needs a commercialisation partner.", tone: "warn" },
  { applicationId: "app-aquaglow", startup: "AquaGlow", sector: "CleanTech", composite: 74, fit: 76, traction: 70, recommendation: "Hold", seats: 1, note: "One more pilot would change the answer.", tone: "default" },
  { applicationId: "app-cartedge", startup: "CartEdge", sector: "Commerce", composite: 71, fit: 74, traction: 64, recommendation: "Hold", seats: 1, note: "Space is good, evidence is not.", tone: "default" },
];

export const COMMITTEE: CommitteeMember[] = [
  { name: "Meera Iyer", role: "Program Director · chair", initials: "MI", votes: "7 of 7", tone: "accent" },
  { name: "Arjun Nair", role: "Funding Lead", initials: "AN", votes: "7 of 7", tone: "accent" },
  { name: "Nandita Bose", role: "IPR Counsel", initials: "NB", votes: "6 of 7", tone: "default" },
  { name: "Divya Menon", role: "Community & Events", initials: "DM", votes: "7 of 7", tone: "accent" },
  { name: "Kavi Sharma", role: "Operations", initials: "KS", votes: "5 of 7", tone: "default" },
];

export const DECISIONS: Decision[] = [
  { startup: "MedData Labs", decision: "Accepted", date: "02 Apr 2026", reason: "Top-scoring applicant with signed pilots", tone: "good" },
  { startup: "NorthWind Energy", decision: "Accepted", date: "02 Apr 2026", reason: "Strong field evidence and hardware experience", tone: "good" },
  { startup: "KiteLoop", decision: "Waitlisted", date: "01 Apr 2026", reason: "Good fit, no seat in Cohort VIII", tone: "warn" },
  { startup: "OrbitalWorks", decision: "Declined", date: "28 Mar 2026", reason: "Team is committed to a venture-backed spin-out", tone: "bad" },
  { startup: "TerraMetrics", decision: "Accepted", date: "24 Mar 2026", reason: "Alumni fast-track on a new programme", tone: "good" },
];

export const SEAT_ALLOCATION: SeatAllocation[] = [
  { program: "Cohort VI — General", offered: 14, seats: 16, tone: "good" },
  { program: "Cohort VII — General", offered: 12, seats: 16, tone: "default" },
  { program: "Cohort VIII — Intake", offered: 2, seats: 16, tone: "accent" },
  { program: "Sprint: AgriTech Deep Dive", offered: 8, seats: 10, tone: "warn" },
];

export const OFFER_TERMS: OfferTerms[] = [
  { startup: "NorthWind Energy", grant: "₹8 L non-dilutive", duration: "16 weeks", equity: "0%", facilities: "Lab bay + investor lounge", status: "Ready" },
  { startup: "MedData Labs", grant: "₹8 L non-dilutive", duration: "16 weeks", equity: "0%", facilities: "Lab bay + hospital pilot intro", status: "Ready" },
  { startup: "MediScan", grant: "₹6 L non-dilutive", duration: "16 weeks", equity: "0%", facilities: "Co-working pod", status: "Pending" },
  { startup: "SilkRoute AI", grant: "₹6 L non-dilutive", duration: "16 weeks", equity: "0%", facilities: "Co-working pod", status: "Pending" },
];

export const ONBOARDING_STEPS: OnboardingStep[] = [
  { step: "Offer accepted", done: 2, total: 2, owner: "Arjun Nair" },
  { step: "Co-founder agreement", done: 2, total: 2, owner: "Meera Iyer" },
  { step: "Grants and funds released", done: 1, total: 2, owner: "Kavi Sharma" },
  { step: "Desk allotted and access granted", done: 0, total: 2, owner: "Kavi Sharma" },
  { step: "IP and compliance briefing", done: 0, total: 2, owner: "Nandita Bose" },
];

/* ── Discovery ─────────────────────────────────────────────────── */

export const EXTERNAL_PROGRAMS: ExternalProgram[] = [
  { slug: "cied-pune", name: "CIED Pune Flagship", org: "CIED", sector: "Multi-sector", mode: "Cohort", location: "Pune", window: "Open", deadline: "Closes 30 Apr 2026", seats: 40, partner: true, fit: 88, note: "Partner programme — shared demo day each quarter.", tone: "good" },
  { slug: "thub-health", name: "T-Hub Health Innovation", org: "T-Hub", sector: "HealthTech", mode: "Open call", location: "Hyderabad", window: "Open", deadline: "Closes 12 May 2026", seats: 25, partner: true, fit: 72, note: "Hospital pilot track for Cohort VII health startups.", tone: "accent" },
  { slug: "ksm-scheme", name: "Kerala Startup Mission Grant", org: "KSM", sector: "Multi-sector", mode: "Open call", location: "Thiruvananthapuram", window: "Open", deadline: "Rolling", seats: 120, partner: true, fit: 64, note: "State grant — we co-apply on behalf of cohorts.", tone: "accent" },
  { slug: "ciie-space", name: "CIIE Space Programme", org: "ISRO / CIIE", sector: "SpaceTech", mode: "Cohort", location: "Bengaluru", window: "Opens soon", deadline: "Opens in 3 weeks", seats: 12, partner: false, fit: 58, note: "Deep-space hardware track — very selective.", tone: "default" },
  { slug: "mnit-innovation", name: "MNIT Innovation Hub", org: "MNIT", sector: "Manufacturing", mode: "Cohort", location: "Indore", window: "Open", deadline: "Rolling", seats: 30, partner: true, fit: 70, note: "Shared prototyping facilities for hardware teams.", tone: "good" },
  { slug: "iim-ai-lab", name: "IIM AI Lab Residency", org: "IIM", sector: "AI / SaaS", mode: "Accelerator", location: "Mumbai", window: "Closed", deadline: "Closed 12 Mar 2026", seats: 10, partner: false, fit: 52, note: "Next round opens in September.", tone: "default" },
  { slug: "t-hub-aerospace", name: "Aerospace Innovation Cell", org: "T-Hub", sector: "Aerospace", mode: "Challenge", location: "Hyderabad", window: "Opens soon", deadline: "Opens 20 May 2026", seats: 8, partner: false, fit: 46, note: "Challenge track tied to a defence procurement brief.", tone: "default" },
];

export const APPLICATION_WINDOWS: ApplicationWindow[] = [
  { program: "StartupHub Labs", window: "Rolling", next: "Intake live", tone: "good" },
  { program: "CIED Pune", window: "Applications open", next: "Closes 30 Apr 2026", tone: "accent" },
  { program: "T-Hub Health", window: "Applications open", next: "Closes 12 May 2026", tone: "accent" },
  { program: "MNIT Innovation Hub", window: "Rolling", next: "Intake live", tone: "good" },
  { program: "Kerala Startup Mission", window: "Rolling", next: "Intake live", tone: "good" },
  { program: "CIIE Space", window: "Opens Apr 2026", next: "Opens in 3 weeks", tone: "default" },
];

export const ALUMNI_OUTCOMES: AlumniOutcome[] = [
  { startup: "TerraMetrics", cohort: "Cohort IV", outcome: "₹112 Cr Series A", year: "2025" },
  { startup: "SoilSync", cohort: "Cohort V", outcome: "₹14.5 Cr seed + govt grant", year: "2026" },
  { startup: "HarvestRoute", cohort: "Cohort III", outcome: "₹6 Cr seed, 3 districts", year: "2024" },
  { startup: "ClinicOne", cohort: "Cohort V", outcome: "₹22 Cr Series A", year: "2026" },
];

export const CONSORTIUMS: Consortium[] = [
  { name: "South India Deep Tech", members: 9, focus: "Hardware and climate", next: "Joint demo day · 18 Jul 2026" },
  { name: "Health Innovation Circle", members: 6, focus: "Clinical validation", next: "Partner intake · 02 Jun 2026" },
  { name: "State Mission Network", members: 12, focus: "Grant access", next: "Co-application round · 20 May 2026" },
];

/* ── Calendar ─────────────────────────────────────────────────── */

export const CALENDAR_EVENTS: CalendarEvent[] = [
  { id: "ev-1", title: "Cohort VIII — intake closes", day: 12, month: 4, type: "Intake", time: "18:00", cohort: "Cohort VIII", location: "Online", note: "Final application cut-off" },
  { id: "ev-2", title: "Criterion scoring window", day: 8, month: 4, type: "Review", time: "10:00", cohort: "Cohort VIII", location: "Remote", note: "Scoring due by 18 Apr" },
  { id: "ev-3", title: "Demo Day — Cohort VI", day: 28, month: 4, type: "Demo day", time: "16:00", cohort: "Cohort VI", location: "Bengaluru + hybrid", note: "240 guests, 14 startups" },
  { id: "ev-4", title: "Reference calls — shortlist", day: 5, month: 4, type: "Review", time: "15:00", cohort: "Cohort VIII", location: "Remote", note: "Co-founder references" },
  { id: "ev-5", title: "Milestone M3 — MVP freeze", day: 10, month: 4, type: "Milestone", time: "12:00", cohort: "Cohort VI", location: "Bengaluru", note: "Working MVP required" },
  { id: "ev-6", title: "Selection committee", day: 18, month: 4, type: "Decision", time: "11:00", cohort: "Cohort VIII", location: "Boardroom", note: "Quorum of 5 required" },
  { id: "ev-7", title: "IP filing clinic", day: 21, month: 4, type: "Workshop", time: "14:00", cohort: "Cohort VII", location: "Bengaluru", note: "Trademark and provisional patents" },
  { id: "ev-8", title: "Grant utilisation report due", day: 20, month: 4, type: "Deadline", time: "17:00", cohort: "All programmes", location: "Online", note: "4 schemes outstanding" },
  { id: "ev-9", title: "Investor office hours", day: 24, month: 4, type: "Workshop", time: "11:00", cohort: "Cohort VI", location: "Investor lounge", note: "Seed+ startups only" },
  { id: "ev-10", title: "Demo day dry run", day: 25, month: 4, type: "Demo day", time: "15:00", cohort: "Cohort VI", location: "Online", note: "Rehearsal for the 28th" },
  { id: "ev-11", title: "Cohort VII — mid-program review", day: 3, month: 5, type: "Review", time: "10:30", cohort: "Cohort VII", location: "Bengaluru", note: "Health check on every startup" },
  { id: "ev-12", title: "Intake opens — Cohort VIII", day: 3, month: 8, type: "Intake", time: "09:00", cohort: "Cohort VIII", location: "Online", note: "16-week programme, 16 seats" },
];

export const KEY_DATES: KeyDate[] = [
  { date: "05 Apr", days: "5 days", title: "Reference calls — shortlist", detail: "Two calls per shortlisted founder.", type: "Review", tone: "warn" },
  { date: "08 Apr", days: "8 days", title: "Criterion scoring window closes", detail: "All six criteria scored for 23 applicants.", type: "Deadline", tone: "accent" },
  { date: "12 Apr", days: "12 days", title: "Cohort VIII intake closes", detail: "Applications lock at 18:00.", type: "Intake", tone: "bad" },
  { date: "18 Apr", days: "18 days", title: "Selection committee", detail: "Quorum of five, two accepted so far.", type: "Decision", tone: "accent" },
  { date: "20 Apr", days: "20 days", title: "Grant utilisation report due", detail: "Four schemes still outstanding.", type: "Deadline", tone: "bad" },
  { date: "28 Apr", days: "28 days", title: "Demo Day — Cohort VI", detail: "Graduation, 14 startups, 240 guests.", type: "Demo day", tone: "good" },
  { date: "03 May", days: "33 days", title: "Cohort VII mid-program review", detail: "Mid-point health check on 12 startups.", type: "Review", tone: "default" },
  { date: "21 May", days: "51 days", title: "CIIE Space programme opens", detail: "Deep-space hardware track.", type: "Intake", tone: "default" },
];

export const CALENDAR_CONFLICTS: CalendarConflict[] = [
  { title: "Scoring window overlaps reference calls", detail: "5 of 7 reviewers are on calls that week.", impact: "Scoring lands 2 days late", tone: "warn" },
  { title: "Demo day dry run and office hours same week", detail: "Both need the investor lounge.", impact: "Room clash on 24–25 Apr", tone: "warn" },
  { title: "Grant report deadline is inside intake close", detail: "Same week as the Cohort VIII cut-off.", impact: "Meera is on both", tone: "bad" },
];
