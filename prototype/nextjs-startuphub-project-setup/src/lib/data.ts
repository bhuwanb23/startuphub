/* Shared data contracts + fallback content.
   The homepage queries PostgreSQL via Drizzle; if the tables are empty or not
   yet provisioned it falls back to this content so the site always renders. */

export type StatItem = {
  id: number;
  label: string;
  value: number;
  decimals: number;
  prefix: string;
  suffix: string;
  subtext: string;
};

export type StartupItem = {
  id: number;
  name: string;
  sector: string;
  stage: string;
  location: string;
  description: string;
  traction: string;
  mark: string;
  featured: boolean;
};

export type OpportunityItem = {
  id: number;
  kind: "Funding" | "Incubation" | "Challenge";
  title: string;
  org: string;
  meta: string;
  deadline: string;
};

export type EmergingCompany = { name: string; stage: string };
export type InvestmentInfo = { deals: number; median: string; qoq: string };
export type IpInfo = {
  filings: number;
  grants: number;
  categories: { label: string; pct: number }[];
};

export type SectorItem = {
  id: number;
  slug: string;
  name: string;
  marketSize: string;
  growth: string;
  activeStartups: number;
  insight: string;
  sparkline: number[];
  trends: string[];
  emerging: EmergingCompany[];
  investment: InvestmentInfo;
  ip: IpInfo;
};

export const fallbackStats: StatItem[] = [
  { id: 1, label: "Startups synced", value: 10, decimals: 0, prefix: "", suffix: "K+", subtext: "across 24 sectors" },
  { id: 2, label: "Incubators & programs", value: 450, decimals: 0, prefix: "", suffix: "+", subtext: "verified partners" },
  { id: 3, label: "Active mentors", value: 2.8, decimals: 1, prefix: "", suffix: "K+", subtext: "operators & founders" },
  { id: 4, label: "Capital connected", value: 1.2, decimals: 1, prefix: "₹", suffix: "K Cr", subtext: "tracked across stages" },
  { id: 5, label: "Ecosystem connections", value: 68, decimals: 0, prefix: "", suffix: "K+", subtext: "and counting" },
];

export const fallbackStartups: StartupItem[] = [
  {
    id: 1,
    name: "Averia Health",
    sector: "AI · Healthcare",
    stage: "Series A",
    location: "Bengaluru",
    description:
      "Clinical intelligence that reads radiology scans in seconds, now live in 140 diagnostic centres.",
    traction: "₹38 Cr ARR · 3 patents",
    mark: "Av",
    featured: true,
  },
  {
    id: 2,
    name: "Finlattice",
    sector: "FinTech",
    stage: "Seed",
    location: "Mumbai",
    description: "Embedded credit rails for tier-2 MSMEs with instant underwriting.",
    traction: "2.1L merchants onboarded",
    mark: "Fi",
    featured: false,
  },
  {
    id: 3,
    name: "Terragrid",
    sector: "ClimateTech",
    stage: "Series A",
    location: "Pune",
    description: "Satellite-driven soil carbon MRV powering verified farm credits.",
    traction: "1.4M hectares mapped",
    mark: "Tg",
    featured: false,
  },
  {
    id: 4,
    name: "Qwron",
    sector: "DeepTech",
    stage: "Incubated",
    location: "Hyderabad",
    description: "Photonic chip interconnects spun out of a national research lab.",
    traction: "2 design wins · 11 filings",
    mark: "Qw",
    featured: false,
  },
];

export const fallbackOpportunities: OpportunityItem[] = [
  {
    id: 1,
    kind: "Funding",
    title: "Seed Ignition Grant — cohort 07",
    org: "StartupHub Capital Network",
    meta: "Up to ₹40 L · equity-free",
    deadline: "Closes Mar 28",
  },
  {
    id: 2,
    kind: "Incubation",
    title: "DeepTech Residency, Spring 2026",
    org: "National Research Innovation Park",
    meta: "6 months · lab access + mentorship",
    deadline: "Rolling",
  },
  {
    id: 3,
    kind: "Challenge",
    title: "AgriChain Innovation Challenge",
    org: "Dept. of Agriculture & Farmers Welfare",
    meta: "₹1 Cr prize pool · pilot guaranteed",
    deadline: "Closes Apr 12",
  },
  {
    id: 4,
    kind: "Funding",
    title: "Climate Pre-Series A Syndicate",
    org: "Meridian Angels + StartupHub",
    meta: "₹2–6 Cr cheques",
    deadline: "Open investments",
  },
  {
    id: 5,
    kind: "Incubation",
    title: "Zero-to-MVP Sprint — women founders",
    org: "StartupHub Studios",
    meta: "8 weeks · 40 seats",
    deadline: "Closes Apr 02",
  },
  {
    id: 6,
    kind: "Challenge",
    title: "Urban Mobility Data Sprint",
    org: "Smart City Mission, Pune",
    meta: "Paid PoC · city datasets",
    deadline: "Closes May 05",
  },
];

export const fallbackSectors: SectorItem[] = [
  {
    id: 1,
    slug: "ai-agritech",
    name: "AI & Agritech",
    marketSize: "$42.8B",
    growth: "+18.4%",
    activeStartups: 1284,
    insight:
      "Precision-agri platforms are consolidating around farm-gate data, while AI-native crop diagnostics pull fresh capital upstream.",
    sparkline: [22, 26, 24, 31, 34, 32, 39, 44, 41, 52, 58, 64],
    trends: [
      "Farm-gate data infrastructure becomes the new moat",
      "AI diagnostics move from pilots to paid contracts",
      "Climate-linked insurance bundles gain distribution",
    ],
    emerging: [
      { name: "CropLens AI", stage: "Seed" },
      { name: "Mandiverse", stage: "Series A" },
      { name: "SoilSense Labs", stage: "Pre-seed" },
    ],
    investment: { deals: 96, median: "$1.8M", qoq: "+22%" },
    ip: {
      filings: 214,
      grants: 61,
      categories: [
        { label: "Computer vision", pct: 46 },
        { label: "IoT sensing", pct: 32 },
        { label: "Supply chain", pct: 22 },
      ],
    },
  },
  {
    id: 2,
    slug: "fintech",
    name: "FinTech",
    marketSize: "$31.5B",
    growth: "+12.1%",
    activeStartups: 2211,
    insight:
      "Embedded credit and cross-border B2B rails are absorbing most early-stage capital as consumer neobanking cools.",
    sparkline: [48, 44, 46, 42, 47, 51, 49, 55, 53, 58, 57, 62],
    trends: [
      "Embedded lending outpaces standalone neobanks",
      "Account-aggregator data unlocks MSME underwriting",
      "Cross-border B2B payments see margin compression",
    ],
    emerging: [
      { name: "LedgerPort", stage: "Seed" },
      { name: "Kaarobar Credit", stage: "Series A" },
      { name: "SettleX", stage: "Seed" },
    ],
    investment: { deals: 183, median: "$2.6M", qoq: "+9%" },
    ip: {
      filings: 146,
      grants: 38,
      categories: [
        { label: "Risk engines", pct: 41 },
        { label: "Payment rails", pct: 37 },
        { label: "Compliance", pct: 22 },
      ],
    },
  },
  {
    id: 3,
    slug: "climatetech",
    name: "ClimateTech",
    marketSize: "$18.9B",
    growth: "+26.7%",
    activeStartups: 947,
    insight:
      "Carbon MRV, battery second-life and industrial heat-pumps are the fastest-compounding niches this quarter.",
    sparkline: [12, 15, 14, 19, 23, 21, 28, 26, 33, 38, 42, 51],
    trends: [
      "MRV standards converge, unlocking carbon credit liquidity",
      "Battery recycling capacity races to meet 2027 supply gap",
      "Industrial decarbonisation pilots convert to orders",
    ],
    emerging: [
      { name: "Verdant Grid", stage: "Pre-seed" },
      { name: "ReJoule Energy", stage: "Seed" },
      { name: "CarbonKart", stage: "Seed" },
    ],
    investment: { deals: 58, median: "$1.4M", qoq: "+31%" },
    ip: {
      filings: 189,
      grants: 54,
      categories: [
        { label: "Energy storage", pct: 44 },
        { label: "Carbon tech", pct: 33 },
        { label: "Efficiency", pct: 23 },
      ],
    },
  },
  {
    id: 4,
    slug: "healthtech",
    name: "HealthTech",
    marketSize: "$27.2B",
    growth: "+15.9%",
    activeStartups: 1576,
    insight:
      "AI-led diagnostics and hospital ops software dominate dealflow; regulated-device startups see longer but deeper rounds.",
    sparkline: [30, 33, 31, 36, 34, 40, 43, 41, 48, 47, 54, 59],
    trends: [
      "Radiology AI reaches reimbursement maturity",
      "Hospital command centres adopt ops copilots",
      "Rural tele-clinics scale via hub-and-spoke models",
    ],
    emerging: [
      { name: "PathPilot", stage: "Series A" },
      { name: "SehatGrid", stage: "Seed" },
      { name: "NeuroNest", stage: "Pre-seed" },
    ],
    investment: { deals: 121, median: "$2.1M", qoq: "+14%" },
    ip: {
      filings: 262,
      grants: 87,
      categories: [
        { label: "Diagnostics", pct: 48 },
        { label: "Devices", pct: 29 },
        { label: "Care delivery", pct: 23 },
      ],
    },
  },
];
