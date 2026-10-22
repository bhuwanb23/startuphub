/* Product workspace data — the single source of truth for MVP management,
   the roadmap and product validation. Every screen derives its numbers from
   here, so the three can never disagree with each other. */

export type Tone = "default" | "accent" | "good" | "warn" | "bad";

/* ── The release in flight ──────────────────────────────────── */

export type FeatureState = "Shipped" | "In QA" | "In dev" | "Backlog";

export type MvpFeature = {
  id: string;
  name: string;
  state: FeatureState;
  pct: number;
  owner: string;
  effort: string;
  /* Customer requests sitting behind the feature. */
  requests: number;
  note: string;
};

export const currentMvp = {
  version: "v2 — Field Alert",
  code: "MVP v2",
  releaseDate: "Apr 12",
  daysToRelease: 6,
  pilot: "Pilot 3 — cooperative rollout",
  weeklyActiveUsers: 214,
  weeklyActiveUsersPrev: 191,
  activeFpos: 18,
  plotsMonitored: 12400,
  alertsDelivered: 38600,
  weeklyRetention: 71,
};

export const mvpFeatures: MvpFeature[] = [
  {
    id: "f-stress",
    name: "Per-acre stress alerts",
    state: "Shipped",
    pct: 100,
    owner: "Priya Nair",
    effort: "3 days",
    requests: 41,
    note: "Carry-over from v1, rebuilt on the 7-day forecast window.",
  },
  {
    id: "f-priority",
    name: "Treatment priority maps",
    state: "Shipped",
    pct: 100,
    owner: "Ravi Sharma",
    effort: "5 days",
    requests: 28,
    note: "Replaces the static choropleth with a ranked treatment queue.",
  },
  {
    id: "f-voice",
    name: "Vernacular alert voice-overs",
    state: "In QA",
    pct: 86,
    owner: "Sunita Rao",
    effort: "4 days",
    requests: 63,
    note: "Kannada, Telugu and Malayalam — the single most requested item.",
  },
  {
    id: "f-bilingual",
    name: "Bilingual alert copy",
    state: "In QA",
    pct: 91,
    owner: "Sunita Rao",
    effort: "2 days",
    requests: 31,
    note: "English alongside the local script, no voice needed.",
  },
  {
    id: "f-offline",
    name: "Offline field mode",
    state: "In dev",
    pct: 58,
    owner: "Kavya Nair",
    effort: "9 days",
    requests: 52,
    note: "Last-sync-first cache for the low-connectivity blocks.",
  },
  {
    id: "f-coop",
    name: "Cooperative share links",
    state: "In dev",
    pct: 34,
    owner: "Priya Nair",
    effort: "6 days",
    requests: 19,
    note: "One FPO shares a plot map with another without a login.",
  },
  {
    id: "f-history",
    name: "Crop-health history strip",
    state: "Shipped",
    pct: 100,
    owner: "Kavya Nair",
    effort: "4 days",
    requests: 17,
    note: "Season-over-season strip under every plot card.",
  },
  {
    id: "f-contagion",
    name: "Adjacent-plot contagion view",
    state: "Backlog",
    pct: 0,
    owner: "Unassigned",
    effort: "9 days",
    requests: 24,
    note: "Blocked on the PlotGrid polygon API — waiting on the vendor.",
  },
];

/* What still stands between the branch and the release. */
export const releaseChecklist: { id: string; item: string; done: boolean; owner: string }[] = [
  { id: "c1", item: "Alert contract frozen for v2", done: true, owner: "Priya Nair" },
  { id: "c2", item: "Voice-over QA across 3 languages", done: true, owner: "Sunita Rao" },
  { id: "c3", item: "Treatment priority maps signed off", done: true, owner: "Ravi Sharma" },
  { id: "c4", item: "Offline mode cache stress test", done: true, owner: "Kavya Nair" },
  { id: "c5", item: "Crop-health strip behind the rollout flag", done: true, owner: "Kavya Nair" },
  { id: "c6", item: "Bilingual copy review by the field team", done: true, owner: "Sunita Rao" },
  { id: "c7", item: "Pilot 3 dogfood with 4 FPOs", done: true, owner: "Ravi Sharma" },
  { id: "c8", item: "Release notes and in-app tour", done: true, owner: "Ananya Rao" },
  { id: "c9", item: "Billing flags checked against the new pack", done: true, owner: "Ananya Rao" },
  { id: "c10", item: "Offline mode out of the critical path", done: false, owner: "Kavya Nair" },
  { id: "c11", item: "Cooperative share links behind a flag", done: false, owner: "Priya Nair" },
];

/* Readiness is what the checklist says, not what anyone remembers. */
export const releaseReadiness = Math.round(
  (releaseChecklist.filter((c) => c.done).length / releaseChecklist.length) * 100,
);

export const shippedCount = mvpFeatures.filter((f) => f.state === "Shipped").length;
export const inFlightCount = mvpFeatures.filter((f) => f.state === "In QA" || f.state === "In dev").length;

/* The MVP feature an experiment or roadmap item landed on. */
export const featureName = (id: string) => mvpFeatures.find((f) => f.id === id)?.name ?? id;

/* ── What users say ─────────────────────────────────────────── */

export type Sentiment = "Promoter" | "Passive" | "Detractor";

export type Feedback = {
  id: string;
  quote: string;
  by: string;
  role: string;
  sentiment: Sentiment;
  featureId?: string;
  since: string;
};

export const feedback: Feedback[] = [
  {
    id: "fb1",
    quote: "The pest alerts saved our chilli belt — twice.",
    by: "S. Ramana",
    role: "FPO lead, Guntur",
    sentiment: "Promoter",
    featureId: "f-stress",
    since: "Apr 05",
  },
  {
    id: "fb2",
    quote: "Maps are gold. Alerts in Kannada will change everything.",
    by: "M. Prakash",
    role: "Agronomist, Raichur",
    sentiment: "Promoter",
    featureId: "f-voice",
    since: "Apr 04",
  },
  {
    id: "fb3",
    quote: "Maps are gold. Alerts in Kannada will change everything.",
    by: "M. Prakash",
    role: "Agronomist, Raichur",
    sentiment: "Promoter",
    featureId: "f-priority",
    since: "Apr 04",
  },
  {
    id: "fb4",
    quote: "Signal drops twice a week here. Without offline mode we work blind.",
    by: "K. Devi",
    role: "Field officer, Ananthapur",
    sentiment: "Passive",
    featureId: "f-offline",
    since: "Apr 03",
  },
  {
    id: "fb5",
    quote: "Our cooperative shares one map today. We want the whole block.",
    by: "T. Ramesh",
    role: "Cooperative secretary, Kadapa",
    sentiment: "Promoter",
    featureId: "f-coop",
    since: "Apr 02",
  },
  {
    id: "fb6",
    quote: "The crop-health strip is the one screen I send to my banker.",
    by: "R. Iyer",
    role: "FPO lead, Tirunelveli",
    sentiment: "Promoter",
    featureId: "f-history",
    since: "Apr 01",
  },
  {
    id: "fb7",
    quote: "I open it once a week. A daily push would be noise.",
    by: "A. Joseph",
    role: "Agronomist, Thrissur",
    sentiment: "Passive",
    since: "Mar 29",
  },
  {
    id: "fb8",
    quote: "Contagion view was the reason we bought. It is still not there.",
    by: "V. Prasad",
    role: "FPO lead, Nashik",
    sentiment: "Detractor",
    featureId: "f-contagion",
    since: "Mar 27",
  },
];

/* The scorecard behind the headline NPS number. */
export const npsBreakdown = { responses: 100, promoters: 57, passives: 30, detractors: 13 };

export const productNps = Math.round(
  ((npsBreakdown.promoters - npsBreakdown.detractors) / npsBreakdown.responses) * 100,
);

export const adoptionTrend = Math.round(
  ((currentMvp.weeklyActiveUsers - currentMvp.weeklyActiveUsersPrev) / currentMvp.weeklyActiveUsersPrev) * 100,
);

/* ── Roadmap ────────────────────────────────────────────────── */

export type RoadmapLane = "Now" | "Next" | "Later";
export type RoadmapState = "ship" | "qa" | "dev" | "plan" | "idea";

export type RoadmapItem = {
  id: string;
  name: string;
  lane: RoadmapLane;
  quarter: string;
  state: RoadmapState;
  owner: string;
  /* How likely the team is to hit that quarter. */
  confidence: number;
  requests: number;
  note: string;
  /* Set when the item is a feature of the MVP release in flight. */
  featureId?: string;
};

export const roadmapLanes: { lane: RoadmapLane; quarter: string; caption: string }[] = [
  {
    lane: "Now",
    quarter: "Q2 2026",
    caption: "Everything the current release depends on — nothing else earns a slot here.",
  },
  {
    lane: "Next",
    quarter: "Q3 2026",
    caption: "Committed only where validation has already said yes.",
  },
  {
    lane: "Later",
    quarter: "Q4 2026",
    caption: "Unvalidated bets. Nothing here is promised to anyone.",
  },
];

export const roadmapItems: RoadmapItem[] = [
  {
    id: "r1",
    name: "Field Alert v2 release",
    lane: "Now",
    quarter: "Q2 2026",
    state: "qa",
    owner: "Priya Nair",
    confidence: 88,
    requests: 112,
    note: "Six of eight features are in QA or shipped.",
    featureId: "f-voice",
  },
  {
    id: "r2",
    name: "Vernacular alert voice-overs",
    lane: "Now",
    quarter: "Q2 2026",
    state: "qa",
    owner: "Sunita Rao",
    confidence: 82,
    requests: 63,
    note: "Highest-requested item in the catalogue of feedback.",
    featureId: "f-voice",
  },
  {
    id: "r3",
    name: "Offline field mode",
    lane: "Now",
    quarter: "Q2 2026",
    state: "dev",
    owner: "Kavya Nair",
    confidence: 61,
    requests: 52,
    note: "Slipped out of the critical path — it ships behind a flag.",
    featureId: "f-offline",
  },
  {
    id: "r4",
    name: "Pilot 3 analytics pack",
    lane: "Now",
    quarter: "Q2 2026",
    state: "dev",
    owner: "Ravi Sharma",
    confidence: 74,
    requests: 27,
    note: "What each pilot FPO gets at the end of the season.",
  },
  {
    id: "r5",
    name: "Cooperative white-label",
    lane: "Next",
    quarter: "Q3 2026",
    state: "plan",
    owner: "Priya Nair",
    confidence: 55,
    requests: 19,
    note: "One cooperative already pays for its own share links.",
    featureId: "f-coop",
  },
  {
    id: "r6",
    name: "Weather-insurance hooks",
    lane: "Next",
    quarter: "Q3 2026",
    state: "plan",
    owner: "Ravi Sharma",
    confidence: 47,
    requests: 34,
    note: "Partner integration — the pilot depends on their API, not ours.",
  },
  {
    id: "r7",
    name: "Public API v2",
    lane: "Next",
    quarter: "Q3 2026",
    state: "plan",
    owner: "Kavya Nair",
    confidence: 52,
    requests: 8,
    note: "Two cooperatives have asked for a programmatic read.",
  },
  {
    id: "r8",
    name: "SEA localization",
    lane: "Later",
    quarter: "Q4 2026",
    state: "idea",
    owner: "Unassigned",
    confidence: 30,
    requests: 6,
    note: "No demand in the field yet — watching the pipeline.",
  },
  {
    id: "r9",
    name: "Carbon-baseline module",
    lane: "Later",
    quarter: "Q4 2026",
    state: "idea",
    owner: "Unassigned",
    confidence: 26,
    requests: 4,
    note: "Grant-funded idea, not a customer request.",
  },
  {
    id: "r10",
    name: "Mobile SDK",
    lane: "Later",
    quarter: "Q4 2026",
    state: "idea",
    owner: "Unassigned",
    confidence: 22,
    requests: 3,
    note: "Parked until a second cooperative asks for it.",
  },
];

export const laneItems = (lane: RoadmapLane) => roadmapItems.filter((i) => i.lane === lane);

export const roadmapConfidence = (lane: RoadmapLane) => {
  const items = laneItems(lane);
  if (items.length === 0) return 0;
  return Math.round(items.reduce((sum, i) => sum + i.confidence, 0) / items.length);
};

/* ── Validation ─────────────────────────────────────────────── */

export type Verdict = "Validated" | "Inconclusive" | "Invalidated";

export type Experiment = {
  id: string;
  hypothesis: string;
  method: string;
  segment: string;
  sample: string;
  sampleSize: number;
  lift: number;
  verdict: Verdict;
  result: string;
  decision: string;
  ranOn: string;
  /* What the answer turned into, when it turned into something. */
  shippedAs?: string;
};

export const experiments: Experiment[] = [
  {
    id: "e1",
    hypothesis: "Alerts spoken in the local language raise weekly usage.",
    method: "6-week in-field A/B across 3 villages",
    segment: "Mid-size FPOs",
    sample: "240 plots",
    sampleSize: 240,
    lift: 31,
    verdict: "Validated",
    result: "Vernacular cohorts opened the app 31% more often than the control.",
    decision: "Voice-overs shipped in MVP v2 rather than waiting for Q3.",
    ranOn: "Mar 12",
    shippedAs: "f-voice",
  },
  {
    id: "e2",
    hypothesis: "A weekly digest replaces the daily push without losing engagement.",
    method: "Cohort split across 4 FPOs",
    segment: "All segments",
    sample: "86 users",
    sampleSize: 86,
    lift: -4,
    verdict: "Invalidated",
    result: "Digest cohorts opened less, not more — daily alerts carry the habit.",
    decision: "Daily push stays. The digest moved to the backlog.",
    ranOn: "Feb 28",
  },
  {
    id: "e3",
    hypothesis: "Offline mode unblocks the low-connectivity blocks.",
    method: "Pre-release field trial in 3 blocks",
    segment: "Low-connectivity FPOs",
    sample: "54 users",
    sampleSize: 54,
    lift: 22,
    verdict: "Validated",
    result: "Field officers in the trial logged 22% more plots per week.",
    decision: "Promoted into MVP v2 — behind a flag, not on the critical path.",
    ranOn: "Mar 22",
    shippedAs: "f-offline",
  },
  {
    id: "e4",
    hypothesis: "In-app feedback captures more signal than the WhatsApp line.",
    method: "Interviews plus an in-app intercept survey",
    segment: "All segments",
    sample: "18 users",
    sampleSize: 18,
    lift: 0,
    verdict: "Inconclusive",
    result: "Too few intercepts to separate the two channels.",
    decision: "Keep both channels, revisit once 60 intercepts are in.",
    ranOn: "Apr 02",
  },
  {
    id: "e5",
    hypothesis: "Cooperative sharing pulls a second FPO into the product.",
    method: "Design-partner interviews with 6 cooperatives",
    segment: "Cooperative secretaries",
    sample: "12 cooperatives",
    sampleSize: 12,
    lift: 17,
    verdict: "Validated",
    result: "Co-ops that shared plots brought in 17% more active FPOs.",
    decision: "Share links moved into development for MVP v2.",
    ranOn: "Mar 30",
    shippedAs: "f-coop",
  },
  {
    id: "e6",
    hypothesis: "Priority maps change when FPOs spray, not just where they look.",
    method: "Before and after study with the pilot 2 FPOs",
    segment: "Pilot 2 FPOs",
    sample: "38 users",
    sampleSize: 38,
    lift: 12,
    verdict: "Validated",
    result: "Spraying moved 12% earlier in the season on the mapped blocks.",
    decision: "Maps shipped in v2 — the strongest evidence the product has.",
    ranOn: "Mar 18",
    shippedAs: "f-priority",
  },
];

export const validatedCount = experiments.filter((e) => e.verdict === "Validated").length;
export const inconclusiveCount = experiments.filter((e) => e.verdict === "Inconclusive").length;
export const invalidatedCount = experiments.filter((e) => e.verdict === "Invalidated").length;

/* Average lift across the experiments that actually settled a question. */
export const averageValidatedLift = Math.round(
  experiments
    .filter((e) => e.verdict === "Validated")
    .reduce((sum, e) => sum + e.lift, 0) / Math.max(1, validatedCount),
);

/* How the customers who answered break down by size. */
export const demandSegments: {
  id: string;
  name: string;
  fpos: number;
  nps: number;
  willingness: string;
  topNeed: string;
}[] = [
  {
    id: "s1",
    name: "Mid-size FPOs (50–200 members)",
    fpos: 7,
    nps: 58,
    willingness: "₹1.2 L / year",
    topNeed: "Vernacular alerts",
  },
  {
    id: "s2",
    name: "Small FPOs (under 50 members)",
    fpos: 5,
    nps: 31,
    willingness: "₹28 K / year",
    topNeed: "Offline mode",
  },
  {
    id: "s3",
    name: "Cooperative federations",
    fpos: 3,
    nps: 44,
    willingness: "₹2.4 L / year",
    topNeed: "Cooperative share links",
  },
  {
    id: "s4",
    name: "Estate managers",
    fpos: 2,
    nps: 27,
    willingness: "₹1.8 L / year",
    topNeed: "Crop-health history strip",
  },
  {
    id: "s5",
    name: "Individual large growers",
    fpos: 1,
    nps: 12,
    willingness: "₹9 K / year",
    topNeed: "Priority maps",
  },
];

/* The next questions, before anyone promises a date. */
export const validationQueue: {
  id: string;
  hypothesis: string;
  method: string;
  sample: string;
  owner: string;
  starts: string;
  blocks: string;
}[] = [
  {
    id: "q1",
    hypothesis: "Contagion view is worth the PlotGrid wait for large growers.",
    method: "Concierge prototype with 8 estates",
    sample: "8 estates",
    owner: "Ravi Sharma",
    starts: "Apr 10",
    blocks: "r8 · SEA localization",
  },
  {
    id: "q2",
    hypothesis: "Estate managers will pay for season history on its own.",
    method: "Price-page test to 6 estates",
    sample: "6 estates",
    owner: "Ananya Rao",
    starts: "Apr 14",
    blocks: "r9 · Carbon-baseline module",
  },
  {
    id: "q3",
    hypothesis: "Offline mode is the gate for the entire low-connectivity segment.",
    method: "12-week holdout with 3 FPOs",
    sample: "3 FPOs",
    owner: "Kavya Nair",
    starts: "Apr 18",
    blocks: "r3 · Offline field mode",
  },
];

/* The pilot the release ships into. */
export const pilotRollout = {
  name: "Pilot 3 — cooperative rollout",
  fpos: 4,
  villages: 11,
  plots: 1240,
  startDate: "Apr 01",
  status: "In flight",
  owner: "Ravi Sharma",
};
