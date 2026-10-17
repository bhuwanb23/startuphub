export type ChartKey = "Trends" | "Companies" | "Investment" | "IP Activity";

export const chartTabs: Record<ChartKey, { metric: string; caption: string; pts: number[] }> = {
  Trends: { metric: "+18.4%", caption: "Market momentum · trailing 12 months", pts: [22, 28, 26, 34, 40, 38, 48, 52, 58, 64, 72, 84] },
  Companies: { metric: "1,284", caption: "Active companies tracked", pts: [12, 14, 18, 17, 22, 26, 25, 31, 36, 40, 45, 52] },
  Investment: { metric: "$2.1B", caption: "Capital deployed · FY 2026", pts: [8, 10, 9, 14, 18, 16, 22, 26, 24, 32, 38, 46] },
  "IP Activity": { metric: "3,412", caption: "Filings across the sector", pts: [6, 8, 12, 10, 15, 18, 17, 22, 26, 28, 34, 40] },
};

export const dailySnapshot = [
  { label: "Sector market size", value: "$42.8B", delta: "+12% vs 2025" },
  { label: "YoY growth", value: "+18.4%", delta: "Accelerating" },
  { label: "Active startups", value: "1,284", delta: "+96 this quarter" },
  { label: "Median seed round", value: "₹2.1 Cr", delta: "+8% QoQ" },
];

export const sectors = [
  { name: "AI & Agritech", size: "$42.8B", growth: "+18.4%", startups: "1,284", momentum: 92, signal: "Strong tailwind from government precision-farming missions and satellite data availability." },
  { name: "HealthTech", size: "$18.2B", growth: "+14.1%", startups: "892", momentum: 78, signal: "Hospital digitization budgets freed up post-ABDM; interoperability is the wedge." },
  { name: "ClimateTech", size: "$11.6B", growth: "+21.7%", startups: "613", momentum: 74, signal: "Storage economics flipped in 2025; carbon markets maturing faster than expected." },
  { name: "FinTech", size: "$9.4B", growth: "+9.8%", startups: "1,041", momentum: 66, signal: "Consolidation phase — infra and rails over consumer apps winning deals." },
];

export const marketTrends = [
  { trend: "AI agents move from demo to procurement", pct: 88, note: "Enterprise AI budgets shifted from pilots to line items in Q4 2025." },
  { trend: "Vernacular-first products outgrow English-only 3×", pct: 76, note: "Tier-2/3 digital spend is now larger than metro growth in 6 of 9 tracked categories." },
  { trend: "Deep-tech valuations decouple from SaaS multiples", pct: 71, note: "Hardware-heavy startups command premium on IP, not revenue multiples." },
  { trend: "Climate compliance becomes a sales trigger", pct: 64, note: "BRSR disclosures push mid-market manufacturers toward clean tech vendors." },
];

export const competitors = [
  { archetype: "Horizontal point tools", coverage: "One stage well", gap: "No handoff to next stage", threat: "Medium" },
  { archetype: "Government portals", coverage: "Schemes & registrations", gap: "No matching, no intelligence", threat: "Low" },
  { archetype: "Offline incubators", coverage: "Physical programs", gap: "No data layer, limited reach", threat: "Low" },
  { archetype: "Global deal platforms", coverage: "Investor-side tooling", gap: "Weak India data, no lifecycle", threat: "Medium" },
];

export const startupTrends = [
  { tag: "Agentic workflows", growth: "+212%" },
  { tag: "Space debris tracking", growth: "+98%" },
  { tag: "Alt-protein fermentation", growth: "+87%" },
  { tag: "Grid-edge storage", growth: "+74%" },
  { tag: "Vernacular EdTech", growth: "+69%" },
  { tag: "Climate insurance", growth: "+61%" },
  { tag: "Silicon photonics", growth: "+54%" },
  { tag: "Lab-grown materials", growth: "+48%" },
];

export const reports = [
  { title: "State of Indian Startups 2026", pages: "84 pages", date: "Jan 2026", kind: "Flagship report" },
  { title: "DeepTech Funding Outlook", pages: "42 pages", date: "Feb 2026", kind: "Sector deep-dive" },
  { title: "IPR Activity Annual Review", pages: "36 pages", date: "Mar 2026", kind: "Data report" },
  { title: "Tier-2 Founder Sentiment Index", pages: "28 pages", date: "Mar 2026", kind: "Quarterly index" },
];

export const infographics = {
  fundingSplit: [
    { label: "AI & DeepTech", pct: 34 },
    { label: "Climate & Energy", pct: 22 },
    { label: "Health & Bio", pct: 18 },
    { label: "FinTech", pct: 14 },
    { label: "Others", pct: 12 },
  ],
  stageFunnel: [
    { stage: "Idea", count: "38K" },
    { stage: "Validation", count: "12.4K" },
    { stage: "MVP", count: "5.9K" },
    { stage: "Funded", count: "2.1K" },
    { stage: "Scaling", count: "640" },
  ],
  quickFacts: [
    { value: "17.2%", label: "of seed rounds now include a strategic corporate" },
    { value: "2.4×", label: "more patents per funded startup vs 2022" },
    { value: "61%", label: "of Series A startups had 2+ enterprise pilots" },
  ],
};
