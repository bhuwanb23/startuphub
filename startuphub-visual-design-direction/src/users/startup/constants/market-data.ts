/* Market intelligence data — the single source of truth for the market
   overview, the competitor watch, the report library and the trends board.
   Every screen derives its numbers from here, so the four can never
   disagree with each other. */

export type Tone = "default" | "accent" | "good" | "warn" | "bad";
export type Impact = "High" | "Medium" | "Low";

/* ── The market, sized ──────────────────────────────────────── */

export type MarketSegment = {
  id: string;
  name: string;
  size: number;
  growth: number;
  note: string;
  kind: "TAM" | "SAM" | "SOM";
};

export const marketSegments: MarketSegment[] = [
  {
    id: "sg-tam",
    name: "India agri-tech spend",
    size: 42.8,
    growth: 18.4,
    kind: "TAM",
    note: "Everything from advisory to input distribution — the number every deck opens with.",
  },
  {
    id: "sg-sam",
    name: "Precision crop advisory",
    size: 6.2,
    growth: 24,
    kind: "SAM",
    note: "Satellite plus agronomy advice sold to cooperatives and FPOs.",
  },
  {
    id: "sg-som",
    name: "Vernacular-first FPO advisory",
    size: 0.184,
    growth: 31,
    kind: "SOM",
    note: "Two crop belts, three states, the slice Lumen actually sells into today.",
  },
];

export const tam = marketSegments.find((s) => s.kind === "TAM")!;
export const sam = marketSegments.find((s) => s.kind === "SAM")!;
export const som = marketSegments.find((s) => s.kind === "SOM")!;

/* How much of the big number the addressable slice really is. */
export const samShare = Math.round((sam.size / tam.size) * 1000) / 10;
export const somShare = Math.round((som.size / tam.size) * 1000) / 10;

/* ── Where Lumen sits ───────────────────────────────────────── */

/* The axes buyers actually compare on. `best` is the strongest score
   any tracked competitor reaches on that axis. */
export type MarketAxis = {
  id: string;
  axis: string;
  us: number;
  best: number;
  note: string;
};

export const marketAxes: MarketAxis[] = [
  {
    id: "ax-early",
    axis: "Early-warning accuracy",
    us: 9,
    best: 7,
    note: "Two-to-one against the incumbent in the pilot 2 study.",
  },
  {
    id: "ax-vernacular",
    axis: "Vernacular field ops",
    us: 9,
    best: 3,
    note: "Nobody else ships spoken alerts in Kannada, Telugu or Malayalam.",
  },
  {
    id: "ax-hardware",
    axis: "Zero-hardware deployment",
    us: 9,
    best: 4,
    note: "No sensors to install, no field engineer to dispatch.",
  },
  {
    id: "ax-price",
    axis: "Tier-2 FPO pricing",
    us: 8,
    best: 4,
    note: "₹180–220 an acre a year, against ₹8K a hectare of hardware.",
  },
  {
    id: "ax-offline",
    axis: "Low-connectivity operation",
    us: 8,
    best: 2,
    note: "Offline field mode is the reason low-connectivity blocks stay.",
  },
  {
    id: "ax-coop",
    axis: "Cooperative multi-tenant",
    us: 7,
    best: 3,
    note: "One federation, many FPOs, one bill.",
  },
  {
    id: "ax-data",
    axis: "Imagery and weather breadth",
    us: 6,
    best: 8,
    note: "They buy more sources than we do — and resell them.",
  },
  {
    id: "ax-compliance",
    axis: "Enterprise compliance",
    us: 3,
    best: 7,
    note: "No US or EU compliance layer yet.",
  },
];

/* Whitespace is the share of axes nobody matches us on. */
export const whitespaceScore = Math.round(
  (marketAxes.filter((a) => a.us > a.best).length / marketAxes.length) * 100,
);

export const leadingAxes = marketAxes.filter((a) => a.us > a.best);
export const trailingAxes = marketAxes.filter((a) => a.us < a.best);

/* ── The competitor watch ───────────────────────────────────── */

export type Competitor = {
  id: string;
  name: string;
  usp: string;
  price: string;
  tech: string;
  stage: string;
  /* Share of the buying decision they take from us, 0–100. */
  overlap: number;
  note: string;
  lastMove: string;
  us?: boolean;
};

export const directCompetitors: Competitor[] = [
  {
    id: "c-agrievue",
    name: "AgriVue Global",
    usp: "Enterprise dashboards, global coverage",
    price: "$14/acre/yr",
    tech: "Satellite + cloud",
    stage: "Series C",
    overlap: 78,
    note: "US pricing, no vernacular — you win tier-2 India",
    lastMove: "Opened an Andhra Pradesh sales pod in March",
  },
  {
    id: "c-cropsense",
    name: "CropSense Labs",
    usp: "Hardware sensors + soil data",
    price: "₹8K/hectare capex+",
    tech: "IoT hardware",
    stage: "Series B",
    overlap: 71,
    note: "Strong on hardware, weak on software economics",
    lastMove: "Bundled a free advisory tier with every sensor",
  },
  {
    id: "c-terralens",
    name: "TerraLens",
    usp: "Raw imagery marketplace",
    price: "API call pricing",
    tech: "Data reseller",
    stage: "Seed",
    overlap: 64,
    note: "Data reseller model — margin cap evident at scale",
    lastMove: "Added a soil-moisture layer to the marketplace",
  },
  {
    id: "c-farmpulse",
    name: "FarmPulse",
    usp: "Government-backed advisory app",
    price: "₹900/season/user",
    tech: "Satellite + government data",
    stage: "Series A",
    overlap: 57,
    note: "Subsidised pricing — cannot serve commercial FPOs",
    lastMove: "Signed the Karnataka precision-farming programme",
  },
  {
    id: "c-kisanmitra",
    name: "KisanMitra AI",
    usp: "WhatsApp-first advisory",
    price: "Free with input subsidies",
    tech: "LLM chat + satellite",
    stage: "Seed",
    overlap: 49,
    note: "Cheap to copy, weak on verification",
    lastMove: "Raised a seed round to scale the WhatsApp funnel",
  },
  {
    id: "c-agroverse",
    name: "AgroVerse",
    usp: "Enterprise ESG and carbon reporting",
    price: "Contract pricing",
    tech: "Satellite + carbon models",
    stage: "Series B",
    overlap: 41,
    note: "Different buyer — no field-ops competition",
    lastMove: "Added a cooperative-carbon module",
  },
  {
    id: "c-plotgrid",
    name: "PlotGrid",
    usp: "API-first agronomy data",
    price: "$0.004/plot/day",
    tech: "Data API",
    stage: "Series A",
    overlap: 33,
    note: "Upstream supplier and a possible partner",
    lastMove: "Published an offline-sync SDK",
  },
];

export type WatchPlayer = {
  id: string;
  name: string;
  category: string;
  note: string;
};

export const adjacentCompetitors: WatchPlayer[] = [
  { id: "a1", name: "Satyamev Weather", category: "Weather data", note: "Upstream input, also sells a farmer app" },
  { id: "a2", name: "Kaveri Analytics", category: "Supply-chain analytics", note: "Buys our insights for their own dashboards" },
  { id: "a3", name: "Nandi Agri Inputs", category: "Input distribution", note: "Could bundle advisory with fertiliser" },
  { id: "a4", name: "Pragati Crop Insurance", category: "Insurance", note: "Wants the loss signals we already produce" },
  { id: "a5", name: "Jal-Mitra Sensors", category: "IoT irrigation", note: "Hardware-first, sold through cooperatives" },
  { id: "a6", name: "Dhenu Labs", category: "Soil testing", note: "Lab network, wants weekly ground truth" },
  { id: "a7", name: "BharatAgro Cloud", category: "ERP for FPOs", note: "Could white-label advisory to its 900 cooperatives" },
  { id: "a8", name: "Terra Pulse", category: "Carbon MRV", note: "Reads our vegetation index for credits" },
  { id: "a9", name: "Sona Signals", category: "Advisory call centre", note: "Human agronomists, sold per season" },
];

export const substituteCompetitors: WatchPlayer[] = [
  { id: "s1", name: "Local agronomy officers", category: "Human advisory", note: "The incumbent we actually replace" },
  { id: "s2", name: "WhatsApp groups", category: "Peer advice", note: "Free, fast, wrong half the time" },
  { id: "s3", name: "Agronomy YouTube", category: "Open content", note: "Free and endless" },
  { id: "s4", name: "Extension officers", category: "Public service", note: "Free, slow, uneven" },
  { id: "s5", name: "Guesswork", category: "No input", note: "What most of the 214 active users did before us" },
  { id: "s6", name: "Dealer visits", category: "Sales-led advice", note: "Comes free with the input purchase" },
  { id: "s7", name: "Farm weather apps", category: "Free apps", note: "Rain alerts, nothing about the crop" },
];

export const trackedCompetitors =
  directCompetitors.length + adjacentCompetitors.length + substituteCompetitors.length;

export const averageOverlap = Math.round(
  directCompetitors.reduce((sum, c) => sum + c.overlap, 0) / directCompetitors.length,
);

export const closestRival = directCompetitors.reduce((a, b) => (b.overlap > a.overlap ? b : a));

/* The strategic read on our own position. */
export const swot: { label: string; items: string[]; tone: Tone }[] = [
  {
    label: "Strengths",
    tone: "good",
    items: [
      "Early-warning accuracy beat incumbents 2:1",
      "Vernacular field adoption — the only one shipping it",
      "Zero-hardware deployment, so no field engineer",
    ],
  },
  {
    label: "Weaknesses",
    tone: "warn",
    items: [
      "No US or EU compliance layer yet",
      "Single-revenue product",
      "Smaller team than the top competitor",
    ],
  },
  {
    label: "Opportunities",
    tone: "accent",
    items: [
      "Insurance-linked agronomy wave",
      "Government precision-farm subsidies",
      "SEA cooperatives expansion",
    ],
  },
  {
    label: "Threats",
    tone: "bad",
    items: [
      "Big-tech satellite free-data plays",
      "CropSense bundling hardware and software",
      "Commodity price shocks cutting budgets",
    ],
  },
];

/* ── Trends ─────────────────────────────────────────────────── */

export type Trend = {
  id: string;
  title: string;
  /* How fast the signal is moving, 0–100. */
  momentum: number;
  impact: Impact;
  since: string;
  window: string;
  source: string;
  note: string;
  /* What we do about it. */
  action: string;
  /* The axis it strengthens or threatens, when it touches one. */
  axisId?: string;
};

export const trends: Trend[] = [
  {
    id: "t-subsidy",
    title: "Precision-farming subsidy wave opens the government channel",
    momentum: 86,
    impact: "High",
    since: "Mar 2026",
    window: "Next 2 quarters",
    source: "Ministry of Agriculture programme note",
    note: "State precision-farming programmes are being tendered as software, not hardware.",
    action: "Pursue the Karnataka and AP tenders through the incubator programme.",
    axisId: "ax-price",
  },
  {
    id: "t-satcost",
    title: "Satellite data cost dropping 22% year on year",
    momentum: 74,
    impact: "High",
    since: "Jan 2026",
    window: "Structural",
    source: "TerraLens pricing disclosure",
    note: "Imagery resale prices fell again — the data moat keeps eroding.",
    action: "Move the differentiation onto the agronomy layer, not the imagery.",
    axisId: "ax-data",
  },
  {
    id: "t-insurance",
    title: "Insurance-linked agronomy becoming the buyer's ask",
    momentum: 62,
    impact: "High",
    since: "Feb 2026",
    window: "Next 12 months",
    source: "Pragati Crop Insurance buyer interviews",
    note: "Insurers now ask for loss-linked agronomy signals, not raw NDVI.",
    action: "Ship the weather-insurance hooks planned for Q3.",
    axisId: "ax-data",
  },
  {
    id: "t-vernacular",
    title: "Vernacular voice interfaces crossing into agri apps",
    momentum: 58,
    impact: "Medium",
    since: "Mar 2026",
    window: "Next 2 quarters",
    source: "Vernacular Tech Adoption Index",
    note: "Voice is no longer a differentiator for long — it is expected.",
    action: "Defend the lead: ship three languages before anyone else ships one.",
    axisId: "ax-vernacular",
  },
  {
    id: "t-consolidation",
    title: "Three agri apps acquired in the last two quarters",
    momentum: 41,
    impact: "Medium",
    since: "Dec 2025",
    window: "Ongoing",
    source: "DeepTech Funding Outlook",
    note: "Distribution is being bought rather than built.",
    action: "Treat cooperative distribution as the asset to defend.",
    axisId: "ax-coop",
  },
  {
    id: "t-openmandate",
    title: "Open satellite mandates narrowing the imagery moat",
    momentum: 34,
    impact: "Low",
    since: "Nov 2025",
    window: "Already here",
    source: "Indian AgriTech Operating Map",
    note: "Free public imagery is good enough for a first cut of the problem.",
    action: "Watch it, do not build for it — the agronomy layer is the defence.",
    axisId: "ax-data",
  },
];

export const highImpactTrends = trends.filter((t) => t.impact === "High");
export const averageMomentum = Math.round(
  trends.reduce((sum, t) => sum + t.momentum, 0) / trends.length,
);

/* ── Reports ────────────────────────────────────────────────── */

export type Report = {
  id: string;
  title: string;
  kind: "Market research" | "Sector deep-dive" | "Quarterly index" | "Regulatory brief" | "Investor memo";
  meta: string;
  pages: number;
  readMinutes: number;
  date: string;
  unread: boolean;
  /* How much this report matters to the current plan, 0–100. */
  relevance: number;
  summary: string;
};

export const reports: Report[] = [
  {
    id: "rp-operating-map",
    title: "Indian AgriTech Operating Map 2026",
    kind: "Market research",
    meta: "Market research · 40 min",
    pages: 64,
    readMinutes: 40,
    date: "Apr 02",
    unread: true,
    relevance: 94,
    summary:
      "Who is buying what in India agri-tech, broken down by FPO size and crop belt. The vernacular-first segment is now 0.4% of spend and growing 31%.",
  },
  {
    id: "rp-subsidy",
    title: "Precision Farming Subsidy Tracker — AP & Karnataka",
    kind: "Regulatory brief",
    meta: "Regulatory brief · 18 min",
    pages: 22,
    readMinutes: 18,
    date: "Apr 05",
    unread: true,
    relevance: 92,
    summary:
      "Every open state tender for precision-farming software, with deadlines and the eligibility language that decides whether a small team can bid.",
  },
  {
    id: "rp-vernacular",
    title: "Vernacular Tech Adoption Index",
    kind: "Quarterly index",
    meta: "Quarterly index · 25 min",
    pages: 38,
    readMinutes: 25,
    date: "Mar 28",
    unread: true,
    relevance: 88,
    summary:
      "Voice interfaces now cross 40% of agri app sessions in three southern states. The lead Lumen holds is real but shrinking every quarter.",
  },
  {
    id: "rp-pricing",
    title: "AgriAI Pricing Benchmarks",
    kind: "Market research",
    meta: "Market research · 22 min",
    pages: 31,
    readMinutes: 22,
    date: "Mar 19",
    unread: false,
    relevance: 84,
    summary:
      "Per-acre and per-season pricing across 26 competitors. Lumen prices 38% below the median for comparable coverage.",
  },
  {
    id: "rp-funding",
    title: "DeepTech Funding Outlook",
    kind: "Sector deep-dive",
    meta: "Sector deep-dive · 45 min",
    pages: 71,
    readMinutes: 45,
    date: "Feb 27",
    unread: false,
    relevance: 71,
    summary:
      "Where agronomy-stage capital went this cycle, which geographies it avoided, and what that means for the Series A window.",
  },
  {
    id: "rp-insurance",
    title: "Insurance-linked Agronomy: Buyer Landscape",
    kind: "Investor memo",
    meta: "Investor memo · 30 min",
    pages: 44,
    readMinutes: 30,
    date: "Feb 11",
    unread: false,
    relevance: 66,
    summary:
      "What insurers will pay for loss-linked agronomy signals, and which three products are already being piloted.",
  },
];

export const unreadReports = reports.filter((r) => r.unread).length;
export const averageRelevance = Math.round(
  reports.reduce((sum, r) => sum + r.relevance, 0) / reports.length,
);

/* ── What to do about all of it ─────────────────────────────── */

export type MarketAction = {
  id: string;
  action: string;
  owner: string;
  due: string;
  impact: Impact;
  href: string;
};

export const marketActions: MarketAction[] = [
  {
    id: "ma-1",
    action: "Bid the Karnataka precision-farming software tender with the incubator team",
    owner: "Ravi Sharma",
    due: "Apr 18",
    impact: "High",
    href: "/founder/incubation",
  },
  {
    id: "ma-2",
    action: "Move the weather-insurance hooks into the Q3 roadmap slot",
    owner: "Priya Nair",
    due: "Apr 22",
    impact: "High",
    href: "/founder/product/roadmap",
  },
  {
    id: "ma-3",
    action: "Cut imagery resale cost before the Q3 data bill lands",
    owner: "Kavya Nair",
    due: "May 02",
    impact: "Medium",
    href: "/founder/resources",
  },
  {
    id: "ma-4",
    action: "Put the operating map and subsidy tracker in the investor data room",
    owner: "Ananya Rao",
    due: "Apr 12",
    impact: "Medium",
    href: "/founder/funding/data-room",
  },
];
