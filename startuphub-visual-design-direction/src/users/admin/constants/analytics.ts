/* ------------------------------ platform analytics --------------------------- */

export const PLATFORM_KPIS = [
  { label: "DAU / WAU / MAU", value: "6.2K / 19.8K / 41.9K", delta: "stickiness 29.7%", tone: "up" as const },
  { label: "New registrations (7d)", value: "1,284", delta: "+6.4%", tone: "up" as const },
  { label: "Activation rate", value: "62%", delta: "+1.8 pts", tone: "up" as const },
  { label: "Retention (D30)", value: "46%", delta: "+0.9 pts", tone: "up" as const },
  { label: "Churn (30d)", value: "1.8%", delta: "-0.3 pts", tone: "up" as const },
  { label: "Verified share", value: "62%", hint: "of registered base" },
  { label: "Search → action", value: "38%", delta: "+2.1 pts", tone: "up" as const },
  { label: "Notification engagement", value: "34%", hint: "open rate, 30d" },
];

export const DAU_BARS = [
  { label: "Apr 3", value: 5.4 }, { label: "Apr 4", value: 5.8 }, { label: "Apr 5", value: 5.2 },
  { label: "Apr 6", value: 6.1 }, { label: "Apr 7", value: 6.4 }, { label: "Apr 8", value: 5.9 },
  { label: "Apr 9", value: 6.6 }, { label: "Apr 10", value: 6.3 }, { label: "Apr 11", value: 5.8 },
  { label: "Apr 12", value: 6.9 }, { label: "Apr 13", value: 7.2 }, { label: "Apr 14", value: 6.2 },
];

export const FUNNEL = [
  { label: "Visited", value: 100, display: "48.2K" },
  { label: "Signed up", value: 24, display: "11.6K" },
  { label: "Activated", value: 15, display: "7.2K" },
  { label: "Verified", value: 9.4, display: "4.5K" },
  { label: "First key action", value: 6.8, display: "3.3K" },
];

export const FEATURE_ADOPTION = [
  { label: "Smart matching", value: 74, display: "74%" },
  { label: "Program applications", value: 62, display: "62%" },
  { label: "IPR Studio", value: 41, display: "41%" },
  { label: "Resource booking", value: 33, display: "33%" },
  { label: "Copilot", value: 58, display: "58%" },
  { label: "Market intelligence", value: 29, display: "29%" },
];

export const RETENTION_GRID: number[][] = [
  [100, 62, 54, 48, 46, 44],
  [100, 64, 56, 51, 48, 46],
  [100, 66, 58, 52, 49, 47],
  [100, 63, 55, 50, 47, 46],
  [100, 67, 59, 54, 51, 48],
  [100, 69, 61, 55, 52, 50],
];

export const PERF_ROWS = [
  { name: "Service availability", value: "99.97%", status: "Operational" },
  { name: "API latency (p95)", value: "182 ms", status: "Operational" },
  { name: "Error rate", value: "0.12%", status: "Operational" },
  { name: "Background job failures", value: "3 / 1,204", status: "Operational" },
  { name: "Auth failures flagged", value: "42 today", status: "Degraded" },
  { name: "Incident MTTR", value: "38 min", status: "Operational" },
];

export const ADMIN_ANALYTICS = [
  { label: "Verification throughput", value: 184, display: "184/wk" },
  { label: "Moderation actions", value: 96, display: "96/wk" },
  { label: "Org onboardings", value: 64, display: "64 live" },
  { label: "Escalations opened", value: 12, display: "12 open" },
  { label: "Exports run", value: 41, display: "41 (audited)" },
];

/* ------------------------------ ecosystem analytics -------------------------- */

export const ECO_STAGE = [
  { label: "Idea", value: 3120 }, { label: "MVP", value: 2840 }, { label: "Seed", value: 2160 },
  { label: "Ser. A", value: 1180 }, { label: "Growth", value: 640 }, { label: "Scale", value: 274 },
];

export const ECO_SECTOR = [
  { label: "AI/ML", value: 2410, display: "2,410" }, { label: "FinTech", value: 1840, display: "1,840" },
  { label: "HealthTech", value: 1520, display: "1,520" }, { label: "AgriTech", value: 1180, display: "1,180" },
  { label: "Climate", value: 960, display: "960" }, { label: "DeepTech", value: 720, display: "720" },
];

export const ECO_REGION = [
  { label: "KA", value: 2840, display: "2,840" }, { label: "MH", value: 2410, display: "2,410" },
  { label: "TN", value: 1980, display: "1,980" }, { label: "DL", value: 1620, display: "1,620" },
  { label: "TG", value: 1340, display: "1,340" }, { label: "KL", value: 860, display: "860" },
  { label: "GJ", value: 720, display: "720" }, { label: "Others", value: 444, display: "444" },
];

export const FUNDING_SERIES = [42, 48, 45, 61, 58, 74, 70, 86, 92, 88, 104, 121];

export const FUNDING_BY_STAGE = [
  { label: "Pre-seed", value: 186, display: "186 deals" },
  { label: "Seed", value: 142, display: "142 deals" },
  { label: "Series A", value: 64, display: "64 deals" },
  { label: "Series B+", value: 21, display: "21 deals" },
];

export const MENTOR_ENGAGEMENT = [
  { label: "Sessions completed", value: 6240, display: "6,240" },
  { label: "Mentor utilization", value: 61, display: "61%" },
  { label: "Repeat engagements", value: 44, display: "44%" },
  { label: "Avg rating", value: 96, display: "4.8/5" },
];

export const RESOURCE_UTIL = [
  { label: "Lab & testing", value: 74 },
  { label: "Cloud credits", value: 68 },
  { label: "Prototyping", value: 61 },
  { label: "Legal templates", value: 52 },
  { label: "Coworking seats", value: 47 },
];

export const IMPACT_CARDS = [
  { label: "Jobs created (validated)", value: "18,406", note: "+2,104 this quarter" },
  { label: "Funding mobilized", value: "₹1,204 Cr", note: "verified closes only" },
  { label: "Technologies commercialized", value: "132", note: "research → product transfers" },
  { label: "Startups supported", value: "10,214", note: "active in ≥1 program/service" },
  { label: "Women-led startups", value: "21.4%", note: "self-declared, consented" },
  { label: "Tier-2/3 participation", value: "34%", note: "of active startups" },
];

export const ECOSYSTEM_GAPS = [
  "DeepTech mentors scarce in North-East region (ratio 1:48)",
  "Series A funding gap in AgriTech outside KA/MH",
  "Testing lab capacity < 60% of demand in TN coastal belt",
  "IPR experts for biotech patents — 40d avg wait vs 12d overall",
];
