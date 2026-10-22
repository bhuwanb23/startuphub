/* Customer data — the single source of truth for the customers workspace.

   Five things live here, and every screen that shows any of them reads
   from this file rather than repeating a number:

     1. Segments      — who we sell to, how big, how well they fit.
     2. Personas      — who buys inside those segments, and what they say.
     3. Validation    — the discovery funnel and the live experiments.
     4. Surveys       — the survey program and what each question proved.
     5. Feedback      — every piece of raw feedback, scored for sentiment.

   The idea workspace (customer discovery, survey results) reads the same
   ledger, so the two workspaces can never disagree about who the customer
   is or what they said. Derived values are computed here rather than
   typed into a screen, for the same reason. */

export type Tone = "default" | "accent" | "good" | "warn" | "bad";
/* Progress bars cannot take the neutral "default" tone. */
export type ProgressTone = "accent" | "good" | "warn" | "bad";
export type Impact = "High" | "Medium" | "Low";
export type Sentiment = "positive" | "neutral" | "negative";
export type SegmentStatus = "Validated" | "Pilot" | "Rejected" | "Unknown";
export type Stance = "Champion" | "Open to pilot" | "Not a fit";
export type ExperimentStatus = "Confirmed" | "Testing" | "Failed";

/* ── Segments ─────────────────────────────────────────────────
   `share` is the segment's share of the reachable addressable base.
   `interviews` is how many customer conversations we ran against it —
   zero means the segment is mapped but never actually tested.        */

export type Segment = {
  id: string;
  name: string;
  size: string;
  /* How many farms we can theoretically reach in this segment. */
  reachable: string;
  /* Share of the addressable base, as a percentage. */
  share: number;
  interviews: number;
  /* How well the segment fits what we sell, 0–100. */
  fit: number;
  status: SegmentStatus;
  /* What one full penetration of the segment is worth. */
  potential: string;
  /* Who signs the contract. */
  buyingUnit: string;
  /* How long a sale takes. */
  cycle: string;
  note: string;
};

export const segments: Segment[] = [
  {
    id: "sg-large",
    name: "Large-scale Agri-farms",
    size: "5K+ acres",
    reachable: "12K+",
    share: 35,
    interviews: 20,
    fit: 92,
    status: "Validated",
    potential: "₹1.2Cr",
    buyingUnit: "Operations head",
    cycle: "6–9 weeks",
    note: "Highest concentration of pilot-ready networks and the only segment that clears the pricing gate unaided.",
  },
  {
    id: "sg-coop",
    name: "Cooperative farms",
    size: "500–2K acres",
    reachable: "8K+",
    share: 22,
    interviews: 18,
    fit: 74,
    status: "Pilot",
    potential: "₹40L",
    buyingUnit: "FPO coordinator",
    cycle: "10–14 weeks",
    note: "Strong cooperative density, but multi-tenant billing is still unproven.",
  },
  {
    id: "sg-small",
    name: "Smallholder farms",
    size: "<500 acres",
    reachable: "5K+",
    share: 20,
    interviews: 9,
    fit: 18,
    status: "Rejected",
    potential: "₹8L",
    buyingUnit: "Owner-grower",
    cycle: "5+ months",
    note: "Service cost per acre exceeds what a fragmented holder will pay.",
  },
  {
    id: "sg-indiv",
    name: "Individual growers",
    size: "<40 acres",
    reachable: "3K+",
    share: 15,
    interviews: 0,
    fit: 12,
    status: "Unknown",
    potential: "₹2L",
    buyingUnit: "Owner-grower",
    cycle: "Not tested",
    note: "Mapped from the addressable base but never interviewed — do not quote a fit score for this segment.",
  },
];

/* The segments we have actually run conversations against. */
export const testedSegments = segments.filter((s) => s.interviews > 0);

/* How a segment's status is coloured, shared by every screen. */
export const segmentTone: Record<SegmentStatus, Tone> = {
  Validated: "good",
  Pilot: "accent",
  Rejected: "bad",
  Unknown: "default",
};

/* The same mapping for progress bars, which have no neutral tone. */
export const segmentProgressTone: Record<SegmentStatus, ProgressTone> = {
  Validated: "good",
  Pilot: "accent",
  Rejected: "bad",
  Unknown: "warn",
};

/* How a survey's positive share is coloured. */
export const surveyTone = (positive: number): ProgressTone =>
  positive >= 70 ? "good" : positive >= 55 ? "accent" : positive >= 40 ? "warn" : "bad";

/* The segment we are deliberately serving. */
export const primarySegment = segments.find((s) => s.status === "Validated")!;

/* The segment we deliberately are not serving. */
export const rejectedSegment = segments.find((s) => s.status === "Rejected")!;

/* The share of the addressable base we have mapped to a segment. */
export const mappedShare = segments.reduce((sum, s) => sum + s.share, 0);

/* Reach we cannot yet attribute to a segment. */
export const unmappedShare = 100 - mappedShare;

/* The average fit across the segments we actually tested. */
export const averageFit = Math.round(
  testedSegments.reduce((sum, s) => sum + s.fit, 0) / testedSegments.length,
);

/* Total interviews across every segment. */
export const totalInterviews = segments.reduce((sum, s) => sum + s.interviews, 0);

/* ── Geography ──────────────────────────────────────────────── */

export type Geography = {
  id: string;
  region: string;
  interviews: number;
  farms: number;
  note: string;
};

export const geographies: Geography[] = [
  {
    id: "geo-punjab",
    region: "Punjab agri belt",
    interviews: 18,
    farms: 210,
    note: "Highest concentration of pilot-ready networks",
  },
  {
    id: "geo-vidarbha",
    region: "Vidarbha",
    interviews: 12,
    farms: 160,
    note: "Strong cooperative density",
  },
  {
    id: "geo-rajasthan",
    region: "Western Rajasthan",
    interviews: 10,
    farms: 140,
    note: "Drier, water-stress signal confirmed",
  },
  {
    id: "geo-karnataka",
    region: "Karnataka",
    interviews: 7,
    farms: 95,
    note: "Early interest, thin data",
  },
];

export const totalGeographies = geographies.length;

/* The discovery work still to do, in the order it should happen. */
export type DiscoveryStep = {
  action: string;
  impact: Impact;
  timeline: string;
  cost: string;
};

export const discoveryNextSteps: DiscoveryStep[] = [
  { action: "Pilot with 3 cooperative farms", impact: "High", timeline: "12 weeks", cost: "₹15L" },
  { action: "Partner with an FPO consortium for channel access", impact: "High", timeline: "16 weeks", cost: "₹20L" },
  { action: "Develop SMS-based stress alert system", impact: "Medium", timeline: "6 weeks", cost: "₹8L" },
  { action: "Complete patent filing for v2 product", impact: "Medium", timeline: "8 weeks", cost: "₹5L" },
];

/* ── Personas ─────────────────────────────────────────────────
   One persona per tested segment — the person who actually decides. */

export type Persona = {
  id: string;
  name: string;
  org: string;
  segmentId: string;
  stance: Stance;
  tone: Tone;
  quote: string;
  /* How much of the segment this persona speaks for, 0–100. */
  reach: number;
  /* How likely they are to adopt, 0–100. */
  adoption: number;
  /* The channel they will actually read. */
  channel: string;
  pains: string[];
  /* What they would buy. */
  buys: string[];
  budgetAuthority: string;
};

export const personas: Persona[] = [
  {
    id: "pn-ops-head",
    name: "Operations head",
    org: "5K+ acre agri-farm",
    segmentId: "sg-large",
    stance: "Champion",
    tone: "good",
    quote:
      "We lose three days of yield every season because stress shows up too late to act on.",
    reach: 62,
    adoption: 88,
    channel: "WhatsApp, then a phone call",
    pains: [
      "Stress is detected after the irrigation window has closed",
      "No single view across 5,000+ acres",
      "Field reports arrive too late to change a schedule",
    ],
    buys: ["10-day early warning", "Water-stress alerts", "Per-acre advisory"],
    budgetAuthority: "Owns the agronomy budget outright",
  },
  {
    id: "pn-fpo-coordinator",
    name: "FPO coordinator",
    org: "Cooperative, 1,200 members",
    segmentId: "sg-coop",
    stance: "Open to pilot",
    tone: "accent",
    quote: "If the alert arrives on WhatsApp, our members will actually read it.",
    reach: 74,
    adoption: 71,
    channel: "WhatsApp groups",
    pains: [
      "Members do not open new apps",
      "Literacy varies across the federation",
      "One bill for a thousand members is hard to justify",
    ],
    buys: ["Cooperative multi-tenant bundle", "Vernacular voice alerts", "Group broadcast"],
    budgetAuthority: "Recommends — the federation committee pays",
  },
  {
    id: "pn-owner-grower",
    name: "Owner-grower",
    org: "Individual, 40 acres",
    segmentId: "sg-indiv",
    stance: "Not a fit",
    tone: "bad",
    quote: "I cannot pay ₹200 an acre for something I cannot see working.",
    reach: 41,
    adoption: 22,
    channel: "SMS",
    pains: [
      "Price is a real share of the season's margin",
      "No way to verify a satellite alert independently",
      "Fragments fall outside usable revisit windows",
    ],
    buys: ["Nothing today — needs a lower price and proof"],
    budgetAuthority: "Pays out of the season, alone",
  },
];

export const champions = personas.filter((p) => p.stance === "Champion");
export const personaSegments = new Set(personas.map((p) => p.segmentId)).size;

/* ── Discovery funnel ──────────────────────────────────────── */

export type FunnelStage = {
  stage: string;
  count: number;
  note: string;
};

export const discoveryFunnel: FunnelStage[] = [
  { stage: "Outreach sent", count: 120, note: "Across 4 agri belts" },
  { stage: "Responded", count: 74, note: "62% response rate" },
  { stage: "Interviewed", count: 47, note: "38 complete records" },
  { stage: "Validated signal", count: 38, note: "Enough for segment fit" },
];

export const discoveryConfidence = 87;

/* ── Validation experiments ───────────────────────────────────
   The validation dashboard. `confidence` is the weight this
   experiment carries in the overall validation score.            */

export type Experiment = {
  id: string;
  hypothesis: string;
  metric: string;
  segmentId: string;
  status: ExperimentStatus;
  /* 0–100. The mean across every live experiment is the validation
     score quoted on the founder dashboard. */
  confidence: number;
  evidence: string;
  owner: string;
  due: string;
  impact: Impact;
};

export const experiments: Experiment[] = [
  {
    id: "ve-price",
    hypothesis: "Large-scale farms will pay ₹180–220 per acre for 10-day-early alerts.",
    metric: "Willingness to pay",
    segmentId: "sg-large",
    status: "Confirmed",
    confidence: 91,
    evidence: "71% of 128 respondents said yes at ₹180–220; none accepted above ₹240.",
    owner: "Ravi Sharma",
    due: "Apr 18",
    impact: "High",
  },
  {
    id: "ve-severity",
    hypothesis: "Water stress is the top unmet need, ahead of pest and nutrient stress.",
    metric: "Stated severity",
    segmentId: "sg-large",
    status: "Confirmed",
    confidence: 86,
    evidence: "8.2 / 10 average severity across 362 responses; pest stress stays under-reported.",
    owner: "Kavya Nair",
    due: "Apr 12",
    impact: "Medium",
  },
  {
    id: "ve-channel",
    hypothesis: "Alerts will land in WhatsApp, not in an app.",
    metric: "Preferred channel",
    segmentId: "sg-coop",
    status: "Confirmed",
    confidence: 80,
    evidence: "WhatsApp 54% · SMS 31% · App 15% across every survey run so far.",
    owner: "Priya Nair",
    due: "Apr 22",
    impact: "High",
  },
  {
    id: "ve-billing",
    hypothesis: "Cooperatives will pay for a multi-tenant federation bundle.",
    metric: "Contract appetite",
    segmentId: "sg-coop",
    status: "Testing",
    confidence: 71,
    evidence: "3 of 5 coordinators asked for a member-level breakdown before signing.",
    owner: "Ananya Rao",
    due: "May 02",
    impact: "Medium",
  },
];

export const liveExperiments = experiments.filter((e) => e.status !== "Failed");
export const confirmedExperiments = experiments.filter((e) => e.status === "Confirmed");

/* The validation score — the mean confidence across every live experiment. */
export const validationScore = Math.round(
  liveExperiments.reduce((sum, e) => sum + e.confidence, 0) / liveExperiments.length,
);

/* ── Survey program ────────────────────────────────────────── */

export type Survey = {
  id: string;
  name: string;
  segmentId: string;
  sent: number;
  responses: number;
  /* Share of respondents who rated the survey's focus positively. */
  positive: number;
  status: "Live" | "Closed";
  closes: string;
  question: string;
};

export const surveys: Survey[] = [
  {
    id: "sv-problem",
    name: "Problem validation survey",
    segmentId: "sg-large",
    sent: 160,
    responses: 128,
    positive: 73,
    status: "Live",
    closes: "Apr 18",
    question: "How painful is water stress in a normal season?",
  },
  {
    id: "sv-pricing",
    name: "Pricing sensitivity survey",
    segmentId: "sg-small",
    sent: 130,
    responses: 89,
    positive: 61,
    status: "Live",
    closes: "Apr 24",
    question: "Would you pay ₹200 per acre for 10-day-early alerts?",
  },
  {
    id: "sv-feature",
    name: "Feature priority survey",
    segmentId: "sg-coop",
    sent: 110,
    responses: 67,
    positive: 55,
    status: "Live",
    closes: "Apr 30",
    question: "Which feature should we build first this quarter?",
  },
  {
    id: "sv-nps",
    name: "NPS survey",
    segmentId: "sg-large",
    sent: 90,
    responses: 45,
    positive: 48,
    status: "Live",
    closes: "Apr 12",
    question: "Would you recommend this to another grower?",
  },
  {
    id: "sv-usability",
    name: "Usability test survey",
    segmentId: "sg-coop",
    sent: 70,
    responses: 33,
    positive: 42,
    status: "Closed",
    closes: "Mar 28",
    question: "Could you set up the alert on your own?",
  },
];

export const totalSent = surveys.reduce((sum, s) => sum + s.sent, 0);
export const totalResponses = surveys.reduce((sum, s) => sum + s.responses, 0);

/* Aggregate completion across the whole program. */
export const responseRate = Math.round((totalResponses / totalSent) * 100);

/* Net promoter score, computed from the response mix below. */
export const nps = 42;
export const promoterMix = { promoters: 58, passives: 26, detractors: 16 };
export const credibilityScore = 85;

export type SurveyQuestion = {
  id: string;
  question: string;
  answer: string;
  pct: number;
  tone: ProgressTone;
};

export const surveyQuestions: SurveyQuestion[] = [
  {
    id: "q-severity",
    question: "How painful is water stress in a normal season?",
    answer: "8.2 / 10 average severity",
    pct: 84,
    tone: "good",
  },
  {
    id: "q-price",
    question: "Would you pay ₹200 per acre for 10-day-early alerts?",
    answer: "71% said yes at ₹180–220",
    pct: 71,
    tone: "good",
  },
  {
    id: "q-channel",
    question: "Which channel should carry the alert?",
    answer: "WhatsApp 54% · SMS 31% · App 15%",
    pct: 54,
    tone: "accent",
  },
  {
    id: "q-detection",
    question: "How do you currently detect crop stress?",
    answer: "Scouting 62% · Farmer gut 31% · Nothing 7%",
    pct: 62,
    tone: "accent",
  },
  {
    id: "q-recommend",
    question: "Would you recommend this to another grower?",
    answer: "NPS 42 — promoters exceed detractors 3:1",
    pct: 48,
    tone: "warn",
  },
];

export type ResponseChannel = {
  id: string;
  label: string;
  responses: number;
  note: string;
};

export const responseChannels: ResponseChannel[] = [
  { id: "rc-direct", label: "Direct outreach", responses: 196, note: "52% of all responses" },
  { id: "rc-fpo", label: "FPO network", responses: 108, note: "29% of all responses" },
  { id: "rc-product", label: "In-product", responses: 58, note: "19% of all responses" },
];

/* The response rate, week by week. It ends on the live aggregate. */
export const responseTrend = [39, 43, 47, 50, 53, 56, 58, 60, 61, 63, 64, responseRate];

/* What the survey program concluded. */
export const surveyFindings = {
  key: "Water stress is the #1 unmet need across all farmer segments",
  secondary: "Willingness to pay for the solution is 40% higher than expected",
};

/* What the survey program says we should do next. */
export type SurveyAction = {
  action: string;
  impact: Impact;
  timeline: string;
  cost: string;
  priority: "high" | "medium";
};

export const surveyRecommendedActions: SurveyAction[] = [
  { action: "Develop prototype based on top survey findings", impact: "High", timeline: "10 weeks", cost: "₹10L", priority: "high" },
  { action: "A/B test pricing models with pilot users", impact: "Medium", timeline: "6 weeks", cost: "₹4L", priority: "medium" },
  { action: "Build community of early adopters", impact: "Medium", timeline: "8 weeks", cost: "₹3L", priority: "medium" },
  { action: "File provisional patent on core innovation", impact: "High", timeline: "4 weeks", cost: "₹2L", priority: "high" },
];

/* ── Feedback, scored for sentiment ───────────────────────────
   Every item carries a score from -100 (hostile) to +100 (delighted).
   The mix and the net sentiment are computed from these, never typed
   in by hand, so adding an item moves every number that depends on it. */

export type FeedbackSource = "Interview" | "Survey" | "Pilot" | "Support" | "App review";

export type FeedbackItem = {
  id: string;
  quote: string;
  source: FeedbackSource;
  segmentId: string;
  themeId: string;
  sentiment: Sentiment;
  /* -100 to +100. */
  score: number;
  date: string;
  /* Who said it, described rather than named. */
  author: string;
};

export type FeedbackTheme = {
  id: string;
  name: string;
  area: "Product" | "Price" | "Delivery" | "Trust";
  /* What we do about the feedback in this theme. */
  action: string;
};

export const feedbackThemes: FeedbackTheme[] = [
  {
    id: "ft-timing",
    name: "Early-warning timing",
    area: "Product",
    action: "Push the detection window from 10 days to 14 — it is the only thing champions pay for.",
  },
  {
    id: "ft-channel",
    name: "Delivery channel",
    area: "Delivery",
    action: "Ship WhatsApp and SMS as the default carriers; keep the app as a secondary surface.",
  },
  {
    id: "ft-language",
    name: "Vernacular delivery",
    area: "Delivery",
    action: "Speed up the spoken alerts — reading numbers out slowly loses the field operator.",
  },
  {
    id: "ft-price",
    name: "Price per acre",
    area: "Price",
    action: "Hold ₹180–220 for large-scale, publish a smallholder tier we can defend later.",
  },
  {
    id: "ft-proof",
    name: "Proof it works",
    area: "Trust",
    action: "Publish the verification trail with every alert — one false flag cost a cooperative two irrigations.",
  },
  {
    id: "ft-support",
    name: "Onboarding & support",
    area: "Delivery",
    action: "Ship a self-serve setup path; the smallholders who churned never called support.",
  },
  {
    id: "ft-coverage",
    name: "Field & plot coverage",
    area: "Product",
    action: "Publish a plot-level coverage check before signup so fragmented holders are not sold a blind spot.",
  },
];

export const feedback: FeedbackItem[] = [
  {
    id: "fb-01",
    quote: "We lost three days of yield last season because stress showed up too late to act on.",
    source: "Interview",
    segmentId: "sg-large",
    themeId: "ft-timing",
    sentiment: "negative",
    score: -78,
    date: "Apr 09",
    author: "Operations head, 6,000-acre farm",
  },
  {
    id: "fb-02",
    quote: "The ten-day head start let us move irrigation two days earlier — that alone paid for the season.",
    source: "Pilot",
    segmentId: "sg-large",
    themeId: "ft-timing",
    sentiment: "positive",
    score: 88,
    date: "Apr 11",
    author: "Farm manager, Punjab",
  },
  {
    id: "fb-03",
    quote: "If the alert arrives on WhatsApp, our members will actually read it.",
    source: "Interview",
    segmentId: "sg-coop",
    themeId: "ft-channel",
    sentiment: "positive",
    score: 74,
    date: "Apr 07",
    author: "FPO coordinator, 1,200 members",
  },
  {
    id: "fb-04",
    quote: "Alerts on the app are fine. Nobody in the village has the app installed.",
    source: "Survey",
    segmentId: "sg-coop",
    themeId: "ft-channel",
    sentiment: "negative",
    score: -62,
    date: "Apr 08",
    author: "Cooperative member",
  },
  {
    id: "fb-05",
    quote: "₹220 an acre is fair if it saves one irrigation cycle.",
    source: "Survey",
    segmentId: "sg-large",
    themeId: "ft-price",
    sentiment: "positive",
    score: 66,
    date: "Apr 10",
    author: "Operations head, 6,000-acre farm",
  },
  {
    id: "fb-06",
    quote: "₹200 an acre is a lot when the whole crop only earns ₹9,000 an acre.",
    source: "Survey",
    segmentId: "sg-indiv",
    themeId: "ft-price",
    sentiment: "negative",
    score: -71,
    date: "Apr 10",
    author: "Owner-grower, 40 acres",
  },
  {
    id: "fb-07",
    quote: "The advisory in Kannada is exactly what we needed — the vendor quoted us in English.",
    source: "Pilot",
    segmentId: "sg-large",
    themeId: "ft-language",
    sentiment: "positive",
    score: 81,
    date: "Apr 12",
    author: "Cooperative operations lead",
  },
  {
    id: "fb-08",
    quote: "The voice alerts work, but the numbers are read out too slowly to follow.",
    source: "Interview",
    segmentId: "sg-coop",
    themeId: "ft-language",
    sentiment: "neutral",
    score: 18,
    date: "Apr 06",
    author: "FPO coordinator, 1,200 members",
  },
  {
    id: "fb-09",
    quote: "We checked two alerts against the agronomist's visit. Both were right.",
    source: "Survey",
    segmentId: "sg-large",
    themeId: "ft-proof",
    sentiment: "positive",
    score: 59,
    date: "Apr 11",
    author: "Farm manager, Punjab",
  },
  {
    id: "fb-10",
    quote: "You flagged drought on a field that was under a canal. Two irrigations were wasted.",
    source: "Support",
    segmentId: "sg-coop",
    themeId: "ft-proof",
    sentiment: "negative",
    score: -84,
    date: "Apr 09",
    author: "Cooperative member",
  },
  {
    id: "fb-11",
    quote: "Your field engineer set the whole thing up in a morning. No hardware, no digging.",
    source: "Pilot",
    segmentId: "sg-large",
    themeId: "ft-support",
    sentiment: "positive",
    score: 64,
    date: "Apr 12",
    author: "Operations head, 6,000-acre farm",
  },
  {
    id: "fb-12",
    quote: "Nobody came to show us how to start it. We are not going to call a support number.",
    source: "Survey",
    segmentId: "sg-small",
    themeId: "ft-support",
    sentiment: "negative",
    score: -55,
    date: "Apr 05",
    author: "Extension officer",
  },
  {
    id: "fb-13",
    quote: "Half my plots are too small for your satellite to see. I get alerts for my neighbour.",
    source: "Survey",
    segmentId: "sg-small",
    themeId: "ft-coverage",
    sentiment: "neutral",
    score: 12,
    date: "Apr 05",
    author: "Smallholder, 18 acres",
  },
  {
    id: "fb-14",
    quote: "We caught the pest round before it took the third spray. That saved us ₹40,000.",
    source: "Survey",
    segmentId: "sg-large",
    themeId: "ft-timing",
    sentiment: "positive",
    score: 72,
    date: "Apr 12",
    author: "Farm manager, Punjab",
  },
  {
    id: "fb-15",
    quote: "At ₹200 an acre across 1,200 members the invoice is ₹2.4 lakh a season. That works if the yield holds.",
    source: "Interview",
    segmentId: "sg-coop",
    themeId: "ft-price",
    sentiment: "neutral",
    score: 8,
    date: "Apr 07",
    author: "FPO coordinator, 1,200 members",
  },
  {
    id: "fb-16",
    quote: "The app asks for my card before it shows me anything. I closed it.",
    source: "App review",
    segmentId: "sg-indiv",
    themeId: "ft-channel",
    sentiment: "neutral",
    score: -22,
    date: "Apr 04",
    author: "Owner-grower, 40 acres",
  },
  {
    id: "fb-17",
    quote: "Our federation manager showed the same alerts to two other cooperatives. Both asked how to sign up.",
    source: "Survey",
    segmentId: "sg-coop",
    themeId: "ft-proof",
    sentiment: "positive",
    score: 53,
    date: "Apr 12",
    author: "Cooperative member",
  },
];

/* The mix, computed from the feedback items. */
export const sentimentMix = {
  positive: feedback.filter((f) => f.sentiment === "positive").length,
  neutral: feedback.filter((f) => f.sentiment === "neutral").length,
  negative: feedback.filter((f) => f.sentiment === "negative").length,
};

/* Net sentiment — positive minus negative, as a share of everything heard. */
export const netSentiment = Math.round(
  ((sentimentMix.positive - sentimentMix.negative) / feedback.length) * 100,
);

export const positiveShare = Math.round((sentimentMix.positive / feedback.length) * 100);

/* Net sentiment, week by week. It ends on the live figure. */
export const sentimentTrend = [-34, -28, -22, -30, -14, -9, -16, -4, 3, 9, 14, netSentiment];

export const detractors = feedback
  .filter((f) => f.sentiment === "negative")
  .sort((a, b) => a.score - b.score);

/* The themes that need attention first — the lowest scoring ones. */
export type ThemeTally = FeedbackTheme & {
  total: number;
  positive: number;
  neutral: number;
  negative: number;
  /* Mean sentiment for the theme, -100 to +100. */
  score: number;
};

export const themeTallies: ThemeTally[] = feedbackThemes
  .map((theme) => {
    const items = feedback.filter((f) => f.themeId === theme.id);
    const positive = items.filter((f) => f.sentiment === "positive").length;
    const neutral = items.filter((f) => f.sentiment === "neutral").length;
    const negative = items.filter((f) => f.sentiment === "negative").length;
    const score = items.length
      ? Math.round(items.reduce((sum, f) => sum + f.score, 0) / items.length)
      : 0;
    return { ...theme, total: items.length, positive, neutral, negative, score };
  })
  .sort((a, b) => a.score - b.score);

export const worstTheme = themeTallies[0];
export const bestTheme = themeTallies[themeTallies.length - 1];

/* Sentiment per segment — the chart on the feedback screen. */
export type SegmentSentiment = {
  segmentId: string;
  total: number;
  score: number;
  positive: number;
  negative: number;
};

export const segmentSentiment: SegmentSentiment[] = segments
  .map((s) => {
    const items = feedback.filter((f) => f.segmentId === s.id);
    const score = items.length
      ? Math.round(items.reduce((sum, f) => sum + f.score, 0) / items.length)
      : 0;
    return {
      segmentId: s.id,
      total: items.length,
      score,
      positive: items.filter((f) => f.sentiment === "positive").length,
      negative: items.filter((f) => f.sentiment === "negative").length,
    };
  })
  .filter((s) => s.total > 0);

/* ── What to do about it ────────────────────────────────────── */

export type CustomerAction = {
  id: string;
  action: string;
  owner: string;
  due: string;
  impact: Impact;
  themeId?: string;
};

export const customerActions: CustomerAction[] = [
  {
    id: "ca-proof",
    action: "Ship the verification trail on every alert — one false flag cost a cooperative two irrigations",
    owner: "Kavya Nair",
    due: "Apr 12",
    impact: "High",
    themeId: "ft-proof",
  },
  {
    id: "ca-channel",
    action: "Make WhatsApp and SMS the default carriers and drop the app from the signup path",
    owner: "Priya Nair",
    due: "Apr 18",
    impact: "High",
    themeId: "ft-channel",
  },
  {
    id: "ca-timing",
    action: "Extend the detection window from 10 days to 14 — it is the only thing champions pay for",
    owner: "Ravi Sharma",
    due: "Apr 24",
    impact: "High",
    themeId: "ft-timing",
  },
  {
    id: "ca-onboarding",
    action: "Publish a self-serve setup path for holders below 40 acres",
    owner: "Ananya Rao",
    due: "May 02",
    impact: "Medium",
    themeId: "ft-support",
  },
  {
    id: "ca-coverage",
    action: "Add a plot-level coverage check before signup so fragmented holders are not sold a blind spot",
    owner: "Priya Nair",
    due: "May 06",
    impact: "Medium",
    themeId: "ft-coverage",
  },
];

/* ── Insights carried across from discovery ────────────────── */

export const customerInsights = [
  "Water stress is the #1 unmet need across every farmer segment — pest stress is consistently under-reported.",
  "The CFO angle converts 2:1 better than the agronomy angle on landing pages.",
  "Punjab and Vidarbha together account for 64% of pilot-ready networks.",
  "30+ farmer testimonials collected; 3 pilot studies completed end to end.",
];

/* Why the rejected segment is out of scope. */
export const rejectionReasons = [
  {
    reason: "Service cost per acre exceeds willingness to pay",
    detail: "₹200/acre asked vs. ₹85/acre ceiling for individual smallholders",
  },
  {
    reason: "No existing satellite pass over their holdings",
    detail: "Small fragmented plots fall outside usable revisit windows",
  },
  {
    reason: "Decision-making is seasonal and slow",
    detail: "Median 5+ months from first contact to a paid pilot",
  },
];
