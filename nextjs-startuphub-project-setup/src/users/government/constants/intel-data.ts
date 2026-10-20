/* Government intelligence dataset — analytics, program performance,
   impact and policy layers. */

/* ── Analytics ─────────────────────────────────────────────── */
export const STARTUP_ANALYTICS = {
  survival: [
    { label: "1-year survival", pct: 86 },
    { label: "3-year survival", pct: 61 },
    { label: "5-year survival", pct: 44 },
  ],
  revenueBands: [
    { label: "Pre-revenue", pct: 34 },
    { label: "₹1L – ₹50L ARR", pct: 38 },
    { label: "₹50L – ₹5 Cr", pct: 21 },
    { label: "> ₹5 Cr", pct: 7 },
  ],
  healthSplit: [
    { label: "Thriving", n: 32, tone: "rise" as const },
    { label: "Steady", n: 41, tone: "accent" as const },
    { label: "Stressed", n: 19, tone: "amber" as const },
    { label: "Inactive", n: 8, tone: "slate" as const },
  ],
  stats: [
    { label: "Avg. revenue growth (verified)", value: "+31% YoY" },
    { label: "Funded startups", value: "4,110 (33%)" },
    { label: "Avg. team size", value: "11.4" },
    { label: "Export-linked startups", value: "819" },
  ],
};

export const SECTOR_ANALYTICS = [
  { sector: "HealthTech", startups: "2,140", growth: "+19.2%", funding: "₹618 Cr", jobs: "9,310", ipr: "486" },
  { sector: "FinTech", startups: "1,930", growth: "+14.8%", funding: "₹542 Cr", jobs: "8,120", ipr: "311" },
  { sector: "Agritech", startups: "1,640", growth: "+23.1%", funding: "₹394 Cr", jobs: "6,540", ipr: "402" },
  { sector: "ClimateTech", startups: "1,410", growth: "+26.7%", funding: "₹356 Cr", jobs: "5,980", ipr: "528" },
  { sector: "DeepTech", startups: "1,220", growth: "+21.4%", funding: "₹488 Cr", jobs: "5,110", ipr: "804" },
  { sector: "Consumer & other", startups: "4,140", growth: "+8.6%", funding: "₹462 Cr", jobs: "13,140", ipr: "589" },
];

export const EMERGING_SECTORS = [
  { name: "Spacetech components", momentum: 86, note: "34 startups formed in 12 months" },
  { name: "Carbon MRV", momentum: 81, note: "Pulled by enterprise procurement" },
  { name: "Battery second-life", momentum: 78, note: "2027 supply gap tailwind" },
  { name: "Rural health AI", momentum: 74, note: "PMJAY-linked demand" },
];

export const DECLINING_SECTORS = [
  { name: "Hyperlocal delivery", momentum: 28, note: "Consolidation complete; new formation -61%" },
  { name: "Generic D2C brands", momentum: 33, note: "CAC pressure; funding winter persists" },
];

export const REGIONAL_ANALYTICS = [
  { district: "Hyderabad", startups: "5,720", density: 142, growth: "+18%", funding: "₹1,410 Cr", incubators: 26, jobs: "22.4K", gap: null },
  { district: "Rangareddy", startups: "2,210", density: 84, growth: "+21%", funding: "₹620 Cr", incubators: 14, jobs: "8.9K", gap: null },
  { district: "Warangal", startups: "1,120", density: 41, growth: "+26%", funding: "₹168 Cr", incubators: 8, jobs: "4.6K", gap: null },
  { district: "Karimnagar", startups: "640", density: 22, growth: "+9%", funding: "₹38 Cr", incubators: 4, jobs: "2.1K", gap: "41% below target" },
  { district: "Nizamabad", startups: "720", density: 26, growth: "+14%", funding: "₹46 Cr", incubators: 3, jobs: "2.4K", gap: "Incubator capacity" },
  { district: "Khammam", startups: "540", density: 19, growth: "+17%", funding: "₹29 Cr", incubators: 3, jobs: "1.8K", gap: null },
];

export const FUNDING_ANALYTICS = {
  total: "₹2,860 Cr in last 12M",
  govt: { v: "₹286 Cr", pct: 10 },
  private: { v: "₹2,574 Cr", pct: 90 },
  byStage: [
    { label: "Pre-seed", pct: 12 },
    { label: "Seed", pct: 31 },
    { label: "Series A", pct: 29 },
    { label: "Series B+", pct: 28 },
  ],
  gap: {
    amount: "₹640 Cr annual seed-stage gap",
    note: "Seed rounds outside Hyderabad are 3.2× harder to close — strongest argument for the co-investment window expansion.",
  },
};

export const EMPLOYMENT_ANALYTICS = {
  total: "48,240",
  direct: "31,040",
  indirect: "17,200",
  growth: "+19.8% YoY",
  bySector: [
    { label: "HealthTech", n: 9310 },
    { label: "FinTech", n: 8120 },
    { label: "Consumer", n: 13140 },
    { label: "Agritech", n: 6540 },
    { label: "ClimateTech", n: 5980 },
    { label: "DeepTech", n: 5110 },
  ],
  skillDemand: ["ML engineering", "Clinical ops", "Embedded systems", "B2B sales", "Regulatory affairs", "Carbon accounting"],
};

export const IPR_ANALYTICS = {
  filed: "3,120",
  granted: "1,126",
  trademarks: "2,410",
  designs: "486",
  commercialized: "412",
  bySector: [
    { label: "DeepTech", n: 804 },
    { label: "ClimateTech", n: 528 },
    { label: "HealthTech", n: 486 },
    { label: "Agritech", n: 402 },
    { label: "FinTech", n: 311 },
  ],
  trend: "+38% commercialized YoY",
};

export const GROWTH_ANALYTICS = [
  { metric: "Registered startups", current: "12,480", yoy: "+23.4%", series: [62, 66, 71, 78, 84, 91, 99, 108, 116, 127, 138, 150] },
  { metric: "Total funding", current: "₹2,860 Cr", yoy: "+31.2%", series: [90, 88, 104, 121, 118, 136, 149, 161, 158, 181, 196, 221] },
  { metric: "Direct employment", current: "31,040", yoy: "+19.8%", series: [168, 174, 181, 192, 201, 208, 219, 228, 241, 257, 268, 281] },
  { metric: "Patent filings", current: "3,120", yoy: "+27.6%", series: [46, 52, 49, 61, 68, 74, 71, 88, 94, 101, 112, 121] },
];

/* ── Program Performance ───────────────────────────────────── */
export const PROGRAM_SUMMARY = [
  { name: "Seed Ignition Grant", beneficiaries: 212, budget: "₹60 Cr", utilization: 78, approval: 61, jobs: "3,410", outcomeScore: 86 },
  { name: "Rural Innovation Fellowship", beneficiaries: 86, budget: "₹24 Cr", utilization: 66, approval: 43, jobs: "1,120", outcomeScore: 74 },
  { name: "DeepTech Capability Fund", beneficiaries: 38, budget: "₹90 Cr", utilization: 71, approval: 28, jobs: "910", outcomeScore: 91 },
  { name: "Women Founder Sprint", beneficiaries: 96, budget: "₹18 Cr", utilization: 82, approval: 68, jobs: "1,480", outcomeScore: 88 },
  { name: "Credit-Linked Subsidy", beneficiaries: 264, budget: "₹75 Cr", utilization: 79, approval: 71, jobs: "5,260", outcomeScore: 83 },
];

export const BENEFICIARIES = [
  { startup: "CropLens AI", scheme: "Seed Ignition", funding: "₹40 L", milestones: 86, jobs: 18, revenue: "+24% MoM", status: "On track" },
  { startup: "KhetScore", scheme: "Seed Ignition", funding: "₹30 L", milestones: 71, jobs: 9, revenue: "+14% MoM", status: "On track" },
  { startup: "AquaMend Robotics", scheme: "DeepTech Fund", funding: "₹80 L", milestones: 62, jobs: 11, revenue: "Pre-rev → pilot", status: "On track" },
  { startup: "GridLoom", scheme: "Rural Fellowship", funding: "₹25 L", milestones: 44, jobs: 6, revenue: "+8% MoM", status: "Watch" },
  { startup: "JalRakshak Labs", scheme: "Challenge prize", funding: "₹5 L", milestones: 92, jobs: 4, revenue: "Pilot revenue", status: "On track" },
];

export const FUNDING_PERFORMANCE = {
  costPerBeneficiary: "₹68.4 L",
  effectiveness: "₹1 govt → ₹6.8 private",
  utilizationRate: 77,
  timeliness: "91% disbursed within 30 days of milestone",
};

export const OUTCOMES = [
  { category: "Startup outcomes", value: "61% of beneficiaries reach Series A within 24 months", tone: "rise" as const },
  { category: "Funding outcomes", value: "₹1,944 Cr follow-on capital unlocked by ₹286 Cr grants", tone: "rise" as const },
  { category: "Employment outcomes", value: "12,180 jobs created by grant beneficiaries alone", tone: "rise" as const },
  { category: "Innovation outcomes", value: "412 patents commercialized; 38 became export products", tone: "accent" as const },
  { category: "Market outcomes", value: "214 startups entered 2+ new states after scheme support", tone: "accent" as const },
  { category: "Long-term", value: "5-year survival 44% vs 21% national baseline", tone: "rise" as const },
];

/* ── Impact ────────────────────────────────────────────────── */
export const IMPACT_MULTIPLIERS = [
  { label: "₹1 Cr grant → jobs", value: "41.2 jobs" },
  { label: "₹1 govt → private capital", value: "₹6.8" },
  { label: "₹1 Cr grant → follow-on revenue", value: "₹9.4 Cr" },
  { label: "Beneficiary survival premium", value: "+23 pts" },
];

export const ECONOMIC_IMPACT = {
  revenueGenerated: "₹2,860 Cr (12M)",
  fundingAttracted: "₹2,574 Cr private",
  businessGrowth: "1,240 startups crossed ₹1 Cr revenue",
  marketExpansion: "612 startups selling inter-state; 214 exporting",
  contribution: "Est. 1.1% of state GSDP from startup ecosystem",
};

export const EMPLOYMENT_IMPACT = {
  jobsCreated: "48,240",
  jobsSustained: "36,900 (3+ yrs)",
  skilledJobs: "62%",
  growth: "+19.8% YoY",
  regionalSplit: [
    { label: "Urban core", pct: 64 },
    { label: "Tier-2", pct: 27 },
    { label: "Rural-linked", pct: 9 },
  ],
};

export const INNOVATION_IMPACT = {
  patents: "3,120 filed · 1,126 granted",
  products: "1,890 products launched",
  research: "86 lab-to-market spinouts",
  adoption: "214 government pilots adopted startup solutions",
  commercialization: "412 IP assets licensed or monetized",
};

export const REGIONAL_IMPACT = [
  { district: "Hyderabad", note: "Anchor ecosystem; 46% of state startups", highlight: "8 unicorn-track companies" },
  { district: "Warangal", note: "Fastest formation growth (+26%)", highlight: "Makerspace corridor" },
  { district: "Rangareddy", note: "Agri + health cluster maturing", highlight: "2 new incubators accredited" },
  { district: "Karimnagar", note: "Below-density target", highlight: "Intervention package drafted" },
];

export const SOCIAL_IMPACT = {
  womenLed: "31% of new registrations",
  ruralStartups: "1,840 (15%)",
  socialInnovation: "212 startups with explicit SDG mapping",
  accessibility: "46 assistive-tech products launched",
  inclusion: "Fellowship: 58% beneficiaries from non-metro districts",
};

export const IMPACT_COMPARISONS = [
  { dimension: "vs. national baseline", ours: "44% 5yr survival", theirs: "21%" },
  { dimension: "vs. peer state A", ours: "₹6.8 private per ₹1 grant", theirs: "₹4.1" },
  { dimension: "vs. last year", ours: "+38% IP commercialization", theirs: "—" },
  { dimension: "Top program", ours: "DeepTech Fund (score 91)", theirs: "National median 72" },
];

/* ── Policy Intelligence ───────────────────────────────────── */
export const POLICY_INSIGHTS = [
  { title: "Seed funding gap is geographic, not total", evidence: "Outside Hyderabad, 3.2× longer close times; ₹640 Cr annual gap", confidence: "High" },
  { title: "Milestone-based disbursement works", evidence: "Fund utilization +17 pts, zero misuse flags since rollout", confidence: "High" },
  { title: "Rural founders lack pre-seed mentorship, not capital", evidence: "Rural window underutilized despite open budget; completion 41% vs 78% urban", confidence: "Medium" },
  { title: "IPR desk integration is paying off", evidence: "Commercialized IP +38% YoY after free FTO scans", confidence: "High" },
];

export const TREND_ANALYSIS = [
  { trend: "ClimateTech formation compounding 26.7%", horizon: "12–24M", implication: "Prep sector-specific scheme window" },
  { trend: "AI-reporting mandates expanding", horizon: "6–12M", implication: "Health AI regulatory fast-track needed" },
  { trend: "Seed capital consolidating in fewer metros", horizon: "Ongoing", implication: "Co-investment window is the right instrument" },
  { trend: "Battery/storage IP density forming", horizon: "24M", implication: "Protect cluster IP pooling early" },
];

export const GAP_ANALYSIS = [
  { area: "Regional — Karimnagar density", severity: "High", gap: "41% below startup density target", evidence: "Registry + district data", action: "Satellite incubator + local mentor bench" },
  { area: "Funding — rural seed window", severity: "High", gap: "34% utilization of rural grant window", evidence: "Grant analytics", action: "Pre-seed fellowship w/ embedded mentors" },
  { area: "Incubation capacity — tier-3", severity: "Medium", gap: "3 districts with zero accredited incubators", evidence: "Incubator directory", action: "Micro-incubator accreditation track" },
  { area: "Skills — ML engineering", severity: "Medium", gap: "2,400 open roles vs. market supply", evidence: "Employment analytics", action: "University co-op expansion" },
  { area: "IPR — tier-2 filing activity", severity: "Low", gap: "Filing density 0.4 vs 1.8 urban", evidence: "IPR analytics", action: "Traveling IPR camps + reimbursement awareness" },
];

export const OPPORTUNITIES = [
  { opportunity: "Spacetech component corridor", window: "24 months", potential: "₹400 Cr cluster, 2,100 jobs" },
  { opportunity: "Agri-export tech from irrigated districts", window: "18 months", potential: "₹220 Cr exports, 900 jobs" },
  { opportunity: "Battery second-life manufacturing", window: "12–30 months", potential: "₹500 Cr investment pipeline" },
  { opportunity: "Rural tele-health procurement", window: "Immediate", potential: "3 districts live, 41K consults/qtr scaled ×4" },
];

export const POLICY_RECOMMENDATIONS = [
  { rec: "Expand co-investment window to tier-2/3 districts with 1:1 matching", priority: "P1", impact: "Close ~40% of seed gap in 18 months", evidence: "Funding gap analysis + Karnataka pilot data" },
  { rec: "Convert rural grant window into fellowship with embedded mentoring", priority: "P1", impact: "Rural utilization from 34% → 75%+", evidence: "Completion-rate correlation with mentoring hours" },
  { rec: "Seed a satellite incubator network in 3 zero-incubator districts", priority: "P2", impact: "Startup density +25% in target districts by FY28", evidence: "Warangal pre/post incubator data" },
  { rec: "Create Health AI regulatory fast-track with state ethics board", priority: "P2", impact: "Approval time 90d → 30d for proven SaMD", evidence: "CDSCO queue analysis" },
  { rec: "Institutionalize challenge-prize procurement at 2% of innovation budget", priority: "P3", impact: "Direct solution pipeline for 14 departments", evidence: "AgriChain + Water Grid outcomes" },
];

export const SCENARIOS = [
  { name: "A · Status quo", investment: "+₹0", startups26: "14,800", jobs26: "57K", gap: "Seed gap persists ₹640 Cr/yr" },
  { name: "B · Expand co-investment", investment: "+₹120 Cr over 3 yrs", startups26: "16,900", jobs26: "71K", gap: "Seed gap closes to ₹180 Cr" },
  { name: "C · B + rural fellowship + incubators", investment: "+₹165 Cr over 3 yrs", startups26: "18,400", jobs26: "79K", gap: "Gap closes; density target hit in 7/8 districts" },
];
