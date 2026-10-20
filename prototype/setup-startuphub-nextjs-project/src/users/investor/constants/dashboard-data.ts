/* Investor workspace — typed seed dataset. Screens render constants,
   never inline JSX data. Swap these for live queries when wiring the DB. */

export const DEAL_STAGES = [
  "New",
  "Screening",
  "Diligence",
  "IC Review",
  "Term Sheet",
] as const;

export type DealStage = (typeof DEAL_STAGES)[number];

export type Deal = {
  id: string;
  name: string;
  sector: string;
  stage: DealStage;
  asking: string;
  location: string;
  score: number; // 0–100
  source: string;
  updated: string;
  thesis: string;
};

export const DEALS: Deal[] = [
  { id: "d1", name: "AgriSense AI", sector: "AI × Agritech", stage: "New", asking: "$2.0M · Seed ext.", location: "Bengaluru, IN", score: 91, source: "StartupHub match", updated: "2h ago", thesis: "Climate-data moat" },
  { id: "d2", name: "TerraLoop", sector: "ClimateTech", stage: "New", asking: "$1.2M · Pre-seed", location: "Berlin, DE", score: 74, source: "Nexus Labs demo day", updated: "5h ago", thesis: "Circular materials" },
  { id: "d3", name: "PathwayBio", sector: "HealthTech", stage: "New", asking: "$4.5M · Series A", location: "Boston, US", score: 68, source: "Inbound", updated: "1d ago", thesis: "Diagnostics AI" },
  { id: "d4", name: "HarvestOS", sector: "AgriTech SaaS", stage: "Screening", asking: "$800K · Pre-seed", location: "Pune, IN", score: 79, source: "Incubator referral", updated: "3h ago", thesis: "Farm ops automation" },
  { id: "d5", name: "Ledgerline", sector: "FinTech Infra", stage: "Screening", asking: "$1.8M · Seed", location: "Singapore, SG", score: 83, source: "Co-investor intro", updated: "6h ago", thesis: "Treasury APIs" },
  { id: "d6", name: "CardioMesh", sector: "HealthTech", stage: "Diligence", asking: "$2.5M · Seed", location: "Hyderabad, IN", score: 87, source: "StartupHub match", updated: "1d ago", thesis: "Remote cardiac care" },
  { id: "d7", name: "RootStack", sector: "ClimateTech", stage: "Diligence", asking: "$1.5M · Seed", location: "Bengaluru, IN", score: 81, source: "Founder network", updated: "2d ago", thesis: "Soil carbon MRV" },
  { id: "d8", name: "NeuraForge", sector: "AI Infrastructure", stage: "IC Review", asking: "$5.0M · Series A", location: "Mumbai, IN", score: 89, source: "StartupHub match", updated: "4h ago", thesis: "Inference tooling" },
  { id: "d9", name: "PayMeridian", sector: "FinTech Infra", stage: "IC Review", asking: "$6.0M · Series A", location: "Dubai, AE", score: 76, source: "Inbound", updated: "3d ago", thesis: "Cross-border FX" },
  { id: "d10", name: "VoltEdge", sector: "ClimateTech", stage: "Term Sheet", asking: "$3.2M · Seed", location: "Munich, DE", score: 93, source: "Co-investor intro", updated: "1h ago", thesis: "Storage analytics" },
];

export type PortfolioCo = {
  name: string;
  sector: string;
  stage: string;
  invested: string;
  current: string;
  multiple: string;
  arr: string;
  health: "green" | "amber" | "red";
};

export const PORTFOLIO: PortfolioCo[] = [
  { name: "Canopy Analytics", sector: "ClimateTech", stage: "Series A", invested: "₹8.2 Cr", current: "₹26.4 Cr", multiple: "3.2x", arr: "₹9.1 Cr", health: "green" },
  { name: "KredKart", sector: "FinTech", stage: "Series B", invested: "₹11.5 Cr", current: "₹31.8 Cr", multiple: "2.8x", arr: "₹22.4 Cr", health: "green" },
  { name: "MedSynapse", sector: "HealthTech", stage: "Seed", invested: "₹2.4 Cr", current: "₹4.1 Cr", multiple: "1.7x", arr: "₹1.2 Cr", health: "green" },
  { name: "GridForge", sector: "ClimateTech", stage: "Seed", invested: "₹3.0 Cr", current: "₹3.4 Cr", multiple: "1.1x", arr: "₹0.8 Cr", health: "amber" },
  { name: "FleetSage", sector: "Logistics AI", stage: "Pre-seed", invested: "₹1.2 Cr", current: "₹1.0 Cr", multiple: "0.8x", arr: "₹0.3 Cr", health: "amber" },
  { name: "OrbitPay", sector: "FinTech", stage: "Seed", invested: "₹4.6 Cr", current: "₹6.9 Cr", multiple: "1.5x", arr: "₹2.6 Cr", health: "green" },
  { name: "NanoKart", sector: "Commerce", stage: "Pre-seed", invested: "₹0.9 Cr", current: "₹0.5 Cr", multiple: "0.5x", arr: "₹0.1 Cr", health: "red" },
  { name: "Skyline Robotics", sector: "DeepTech", stage: "Series A", invested: "₹6.8 Cr", current: "₹12.5 Cr", multiple: "1.8x", arr: "₹5.4 Cr", health: "green" },
];

export const SECTOR_MIX = [
  { sector: "ClimateTech", pct: 32 },
  { sector: "FinTech Infra", pct: 26 },
  { sector: "HealthTech", pct: 18 },
  { sector: "AI Infrastructure", pct: 14 },
  { sector: "Other", pct: 10 },
];

export const FUND_SERIES = [
  100, 104, 111, 109, 118, 126, 124, 135, 142, 151, 148, 160,
  171, 168, 182, 194, 190, 206, 218, 226, 221, 238, 252, 261,
];

export const BENCH_SERIES = [
  100, 102, 105, 104, 108, 111, 110, 114, 117, 119, 118, 122,
  126, 125, 130, 134, 132, 138, 142, 146, 144, 150, 155, 159,
];

export type Match = {
  name: string;
  sector: string;
  stage: string;
  location: string;
  ask: string;
  score: number;
  dims: { thesis: number; traction: number; team: number };
  reasons: string[];
};

export const MATCHES: Match[] = [
  {
    name: "AgriSense AI", sector: "AI × Agritech", stage: "Series A", location: "Bengaluru, IN", ask: "$2.0M",
    score: 94, dims: { thesis: 96, traction: 92, team: 90 },
    reasons: ["Thesis fit: climate data moats", "+212% pilot growth in 2 quarters", "IP filed in 3 markets"],
  },
  {
    name: "CardioMesh", sector: "HealthTech", stage: "Seed", location: "Hyderabad, IN", ask: "$2.5M",
    score: 88, dims: { thesis: 84, traction: 90, team: 91 },
    reasons: ["40 hospital LOIs signed", "Regulatory clearance cohort #1", "Ex-HCA clinical team"],
  },
  {
    name: "Ledgerline", sector: "FinTech Infra", stage: "Seed", location: "Singapore, SG", ask: "$1.8M",
    score: 85, dims: { thesis: 90, traction: 78, team: 86 },
    reasons: ["Treasury API wedge matches fund thesis", "3 bank integrations live", "Co-invest overlap: 2 funds"],
  },
  {
    name: "RootStack", sector: "ClimateTech", stage: "Seed", location: "Bengaluru, IN", ask: "$1.5M",
    score: 82, dims: { thesis: 88, traction: 74, team: 83 },
    reasons: ["Soil-carbon MRV tailwind", "2 enterprise pilots converting", "University lab spin-out"],
  },
];

export const WATCHLIST = [
  { name: "HarvestOS", sector: "AgriTech SaaS", metric: "MRR ₹14.2L", series: [6, 7, 7, 9, 10, 12, 14], note: "Crossed ₹14L MRR — trigger at ₹18L" },
  { name: "TerraLoop", sector: "ClimateTech", metric: "LOIs 6", series: [2, 2, 3, 4, 4, 5, 6], note: "Watching pilot conversion rate" },
  { name: "PathwayBio", sector: "HealthTech", metric: "Sites 12", series: [4, 5, 6, 8, 9, 11, 12], note: "Regulatory readout due Q3" },
  { name: "FleetSage", sector: "Logistics AI", metric: "Retention 71%", series: [88, 84, 80, 78, 75, 73, 71], note: "Churn risk — review at next board" },
];

export type Signal = {
  tag: string;
  title: string;
  detail: string;
  time: string;
};

export const SIGNALS: Signal[] = [
  { tag: "Funding", title: "Climate seed rounds up 24% QoQ", detail: "Median check now $2.1M across 68 tracked rounds", time: "2h ago" },
  { tag: "IP", title: "Agri-AI patent filings hit record", detail: "412 filings this quarter, +31% YoY — moat window narrowing", time: "5h ago" },
  { tag: "Policy", title: "New deep-tech grant window opens", detail: "₹25L–₹1Cr non-dilutive, closes Apr 30 — 4 portfolio cos eligible", time: "1d ago" },
  { tag: "Talent", title: "Series A ops hiring accelerates", detail: "Head-of-ops searches up 3.1x since Jan in your sectors", time: "1d ago" },
  { tag: "Exit", title: "Two agri-SaaS acquisitions this week", detail: "Strategic buyers paying 6–9x ARR in consolidation wave", time: "2d ago" },
];

export type SectorIntel = {
  name: string;
  growth: string;
  deals: number;
  avgCheck: string;
  spark: number[];
};

export const SECTORS_INTEL: SectorIntel[] = [
  { name: "AI & Agritech", growth: "+18.4%", deals: 128, avgCheck: "$1.9M", spark: [8, 10, 9, 13, 15, 14, 19, 22, 21, 27, 31, 38] },
  { name: "ClimateTech", growth: "+22.1%", deals: 214, avgCheck: "$2.4M", spark: [14, 16, 21, 19, 24, 28, 26, 33, 37, 35, 44, 52] },
  { name: "FinTech Infra", growth: "+9.8%", deals: 386, avgCheck: "$2.8M", spark: [30, 32, 31, 35, 34, 38, 40, 39, 43, 45, 47, 49] },
  { name: "HealthTech", growth: "+15.2%", deals: 273, avgCheck: "$2.2M", spark: [18, 20, 24, 22, 27, 25, 30, 34, 33, 39, 42, 46] },
];

export type FounderRow = {
  name: string;
  startup: string;
  sector: string;
  stage: string;
  raising: string;
  match: number;
};

export const FOUNDERS: FounderRow[] = [
  { name: "Ananya Rao", startup: "Canopy Analytics", sector: "ClimateTech", stage: "Series A", raising: "Not raising", match: 96 },
  { name: "Ravi Sharma", startup: "Lumen AI", sector: "Agri AI", stage: "Seed", raising: "₹4.2 Cr", match: 91 },
  { name: "Vikram Iyer", startup: "RootStack", sector: "ClimateTech", stage: "Seed", raising: "$1.5M", match: 88 },
  { name: "Meera Krishnan", startup: "CardioMesh", sector: "HealthTech", stage: "Seed", raising: "$2.5M", match: 86 },
  { name: "Jonas Weber", startup: "VoltEdge", sector: "ClimateTech", stage: "Seed", raising: "$3.2M", match: 84 },
  { name: "Sara Lim", startup: "Ledgerline", sector: "FinTech Infra", stage: "Seed", raising: "$1.8M", match: 81 },
];

export type Meeting = {
  time: string;
  title: string;
  withWhom: string;
  kind: "Founder call" | "IC" | "Portfolio" | "LP" | "Partner";
  location: string;
};

export const MEETINGS: Meeting[] = [
  { time: "09:30", title: "IC review — NeuraForge", withWhom: "Investment committee", kind: "IC", location: "Boardroom 2" },
  { time: "11:00", title: "First call — AgriSense AI", withWhom: "Ananya Rao, CEO", kind: "Founder call", location: "Meet link" },
  { time: "14:00", title: "Portfolio check-in — GridForge", withWhom: "Daniel Osei, CEO", kind: "Portfolio", location: "Meet link" },
  { time: "16:30", title: "Term sheet walkthrough — VoltEdge", withWhom: "Counsel + Jonas Weber", kind: "Partner", location: "Conference 1" },
  { time: "18:00", title: "Quarterly LP update prep", withWhom: "Fund ops", kind: "LP", location: "Boardroom 2" },
];

export const WEEK_MEETINGS = [
  { day: "Tue", count: 4, note: "2 first calls · 1 diligence · 1 mentor sync" },
  { day: "Wed", count: 3, note: "Demo day — Nexus Labs Batch 06" },
  { day: "Thu", count: 5, note: "IC vote · 2 portfolio · LP call" },
  { day: "Fri", count: 2, note: "Term sheet · founder dinner" },
];
