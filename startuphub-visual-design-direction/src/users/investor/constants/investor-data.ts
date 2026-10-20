/* Investor workspace seed dataset — keeps JSX free of inline data. */

export type Deal = {
  id: number;
  name: string;
  sector: string;
  stage: string;
  ask: string;
  score: number;
  location: string;
  note: string;
};

export const PIPELINE_STAGES: { key: string; label: string; deals: Deal[] }[] = [
  {
    key: "new",
    label: "New",
    deals: [
      {
        id: 1, name: "CropLens AI", sector: "AI · Agritech", stage: "Seed",
        ask: "₹6 Cr", score: 86, location: "Bengaluru",
        note: "Drone-vision crop diagnostics; 42 paid pilot farms.",
      },
      {
        id: 2, name: "SettleX", sector: "FinTech", stage: "Seed",
        ask: "₹4.5 Cr", score: 78, location: "Mumbai",
        note: "Cross-border B2B settlement rails, 3 corridor licenses.",
      },
      {
        id: 3, name: "Verdant Grid", sector: "ClimateTech", stage: "Pre-seed",
        ask: "₹2 Cr", score: 74, location: "Chennai",
        note: "Distributed battery second-life aggregation.",
      },
    ],
  },
  {
    key: "screening",
    label: "Screening",
    deals: [
      {
        id: 4, name: "PathPilot", sector: "HealthTech", stage: "Series A",
        ask: "₹18 Cr", score: 91, location: "Hyderabad",
        note: "Pathology AI with CDSCO clearance; 9 hospital chains live.",
      },
      {
        id: 5, name: "Mandiverse", sector: "AI · Agritech", stage: "Series A",
        ask: "₹14 Cr", score: 83, location: "Indore",
        note: "Mandi price exchange; 310K monthly trader sessions.",
      },
      {
        id: 6, name: "LedgerPort", sector: "FinTech", stage: "Seed",
        ask: "₹5 Cr", score: 80, location: "Gurugram",
        note: "Ledger infrastructure for NBFC co-lending stacks.",
      },
    ],
  },
  {
    key: "diligence",
    label: "Diligence",
    deals: [
      {
        id: 7, name: "ReJoule Energy", sector: "ClimateTech", stage: "Seed",
        ask: "₹7 Cr", score: 88, location: "Pune",
        note: "Cell-level battery diagnostics; LOIs from 2 OEMs.",
      },
      {
        id: 8, name: "SehatGrid", sector: "HealthTech", stage: "Seed",
        ask: "₹6.5 Cr", score: 81, location: "Jaipur",
        note: "Hub-and-spoke rural tele-clinics, 62 spokes active.",
      },
    ],
  },
  {
    key: "termsheet",
    label: "Term Sheet",
    deals: [
      {
        id: 9, name: "CarbonKart", sector: "ClimateTech", stage: "Seed",
        ask: "₹5.5 Cr", score: 90, location: "New Delhi",
        note: "B2B carbon procurement marketplace; ₹1.2 Cr GMV/mo.",
      },
    ],
  },
  {
    key: "closed",
    label: "Closed",
    deals: [
      {
        id: 10, name: "SoilSense Labs", sector: "AI · Agritech", stage: "Pre-seed",
        ask: "₹1.8 Cr", score: 85, location: "Nagpur",
        note: "Invested Mar 2026 · ₹40L tranche wired.",
      },
    ],
  },
];

export type InboxDeck = {
  id: number;
  company: string;
  founder: string;
  sector: string;
  stage: string;
  received: string;
  aiScore: number;
  oneLiner: string;
  via: string;
};

export const INBOX_DECKS: InboxDeck[] = [
  {
    id: 1, company: "AquaMend Robotics", founder: "Ishita Verma",
    sector: "ClimaTech · Water", stage: "Seed", received: "2h ago", aiScore: 89,
    oneLiner: "Autonomous canal-cleaning robots sold as-a-service to irrigation departments.",
    via: "Incubator referral — Nexus Ventures",
  },
  {
    id: 2, company: "Kaarobar Credit", founder: "Rohan Iyer",
    sector: "FinTech · MSME", stage: "Series A", received: "5h ago", aiScore: 84,
    oneLiner: "Cash-flow lending for kirana stores using account-aggregator data.",
    via: "Investor intro — Blume Syndicate",
  },
  {
    id: 3, company: "NeuroNest", founder: "Dr. Farah Ali",
    sector: "HealthTech · Neuro", stage: "Pre-seed", received: "Yesterday", aiScore: 77,
    oneLiner: "EEG-based early dementia screening for district hospitals.",
    via: "StartupHub deck room",
  },
  {
    id: 4, company: "FleetFox", founder: "Aditya Rao",
    sector: "Logistics SaaS", stage: "Seed", received: "Yesterday", aiScore: 71,
    oneLiner: "Route-optimisation copilot for mid-mile trucking fleets.",
    via: "Cold inbound",
  },
  {
    id: 5, company: "Prithvi Metals", founder: "Sara Mathew",
    sector: "DeepTech · Materials", stage: "Seed", received: "2 days ago", aiScore: 68,
    oneLiner: "Bio-leaching process recovering rare earths from e-waste.",
    via: "Demo day — Nexus Cohort V",
  },
];

export const SCREENING_ROWS: {
  id: number; company: string; sector: string; ask: string; fit: number;
  thesis: string; irr: string; status: "Advance" | "Park" | "Pass";
  analyst: string;
}[] = [
  { id: 1, company: "PathPilot", sector: "HealthTech", ask: "₹18 Cr", fit: 91, thesis: "AI diagnostics", irr: "34%", status: "Advance", analyst: "AM" },
  { id: 2, company: "Mandiverse", sector: "Agritech", ask: "₹14 Cr", fit: 83, thesis: "Agri exchange", irr: "28%", status: "Advance", analyst: "SK" },
  { id: 3, company: "LedgerPort", sector: "FinTech", ask: "₹5 Cr", fit: 80, thesis: "Credit infra", irr: "31%", status: "Advance", analyst: "AM" },
  { id: 4, company: "FleetFox", sector: "Logistics", ask: "₹4 Cr", fit: 64, thesis: "Logistics SaaS", irr: "19%", status: "Park", analyst: "RJ" },
  { id: 5, company: "GameVerse", sector: "Consumer", ask: "₹3 Cr", fit: 41, thesis: "Off-thesis", irr: "—", status: "Pass", analyst: "SK" },
  { id: 6, company: "Prithvi Metals", sector: "DeepTech", ask: "₹5 Cr", fit: 72, thesis: "Circular materials", irr: "26%", status: "Park", analyst: "AM" },
];

export const WATCHLIST: {
  id: number; name: string; sector: string; spark: number[];
  trigger: string; milestone: string; momentum: number;
}[] = [
  {
    id: 1, name: "CropLens AI", sector: "AI · Agritech",
    spark: [12, 18, 16, 24, 30, 38, 44], trigger: "Crosses ₹1 Cr MRR",
    milestone: "₹68L MRR · +24% MoM", momentum: 86,
  },
  {
    id: 2, name: "SettleX", sector: "FinTech",
    spark: [8, 10, 14, 13, 18, 22, 26], trigger: "3rd corridor licence",
    milestone: "2 licences · RBI sandbox", momentum: 74,
  },
  {
    id: 3, name: "NeuroNest", sector: "HealthTech",
    spark: [4, 6, 9, 12, 11, 16, 21], trigger: "Clinical trial readout",
    milestone: "Trial 68% enrolled", momentum: 69,
  },
  {
    id: 4, name: "Verdant Grid", sector: "ClimateTech",
    spark: [6, 9, 8, 12, 15, 14, 19], trigger: "First utility-scale PPA",
    milestone: "LOI stage · 2 DISCOMs", momentum: 71,
  },
];

export const PORTFOLIO: {
  id: number; name: string; sector: string; stage: string; invested: string;
  value: string; multiple: number; health: "Strong" | "Stable" | "Watch";
  growth: string; nextRound: string;
}[] = [
  { id: 1, name: "Averia Health", sector: "AI · Healthcare", stage: "Series A", invested: "₹4.0 Cr", value: "₹14.2 Cr", multiple: 3.6, health: "Strong", growth: "+18% QoQ", nextRound: "Series B · Q3'26" },
  { id: 2, name: "Finlattice", sector: "FinTech", stage: "Seed", invested: "₹2.5 Cr", value: "₹5.1 Cr", multiple: 2.0, health: "Strong", growth: "+22% QoQ", nextRound: "Series A · Q4'26" },
  { id: 3, name: "Terragrid", sector: "ClimateTech", stage: "Series A", invested: "₹5.0 Cr", value: "₹11.8 Cr", multiple: 2.4, health: "Stable", growth: "+11% QoQ", nextRound: "Series B · Q2'27" },
  { id: 4, name: "Qwron", sector: "DeepTech", stage: "Seed", invested: "₹3.2 Cr", value: "₹4.9 Cr", multiple: 1.5, health: "Stable", growth: "+9% QoQ", nextRound: "Series A · Q1'27" },
  { id: 5, name: "NomadPay", sector: "FinTech", stage: "Seed", invested: "₹2.0 Cr", value: "₹1.6 Cr", multiple: 0.8, health: "Watch", growth: "-4% QoQ", nextRound: "Bridge · TBD" },
  { id: 6, name: "Zephyr Drones", sector: "Logistics", stage: "Seed", invested: "₹2.8 Cr", value: "₹6.4 Cr", multiple: 2.3, health: "Strong", growth: "+26% QoQ", nextRound: "Series A · Q3'26" },
  { id: 7, name: "KhetScore", sector: "Agritech", stage: "Pre-seed", invested: "₹1.2 Cr", value: "₹2.0 Cr", multiple: 1.7, health: "Stable", growth: "+14% QoQ", nextRound: "Seed · Q4'26" },
  { id: 8, name: "SoilSense Labs", sector: "AI · Agritech", stage: "Pre-seed", invested: "₹1.8 Cr", value: "₹2.1 Cr", multiple: 1.2, health: "Strong", growth: "+31% QoQ", nextRound: "Seed · Q1'27" },
];

export const ALLOCATION = [
  { label: "FinTech", pct: 30 },
  { label: "HealthTech", pct: 24 },
  { label: "ClimateTech", pct: 19 },
  { label: "Agritech", pct: 15 },
  { label: "DeepTech & Other", pct: 12 },
];

export const FUND_SERIES = [
  { label: "TVPI", value: "2.14×" },
  { label: "Net IRR", value: "31.4%" },
  { label: "DPI", value: "0.42×" },
  { label: "RVPI", value: "1.72×" },
];

export const FUND_CURVE = [
  20, 22, 21, 26, 30, 29, 36, 41, 40, 48, 53, 60, 58, 67, 74, 83,
];

export const FOLLOW_ONS: {
  id: number; company: string; rationale: string[]; suggested: string;
  reservePct: number; urgency: "High" | "Medium" | "Low";
}[] = [
  { id: 1, company: "Averia Health", rationale: ["Series B lead interest from Nexora", "ARR tripled since entry", "Defend pro-rata 14.2%"], suggested: "₹7.5 Cr", reservePct: 82, urgency: "High" },
  { id: 2, company: "Zephyr Drones", rationale: ["Series A at 3.1× step-up", "New defence corridor contract"], suggested: "₹4.0 Cr", reservePct: 64, urgency: "High" },
  { id: 3, company: "Finlattice", rationale: ["Series A discussions opening", "Merchant base 2.1L and growing"], suggested: "₹3.5 Cr", reservePct: 58, urgency: "Medium" },
  { id: 4, company: "KhetScore", rationale: ["Seed round forming", "Two anchor agri-banks onboarded"], suggested: "₹1.5 Cr", reservePct: 41, urgency: "Low" },
];

export const SIGNALS: {
  id: number; sector: string; headline: string; summary: string;
  delta: string; good: boolean; spark: number[]; time: string;
}[] = [
  { id: 1, sector: "AI & Agritech", headline: "Farm-gate data infra is the new moat", summary: "Three portfolio-relevant startups moved from pilots to paid contracts this month; pricing power consolidating around data density.", delta: "+18.4% sector momentum", good: true, spark: [22, 26, 24, 31, 34, 39, 52], time: "Today" },
  { id: 2, sector: "FinTech", headline: "Embedded credit outpaces neobanking", summary: "Early-stage cheques favour rails and infra over consumer apps; account-aggregator underwriting up 2.3× YoY.", delta: "+12.1% sector momentum", good: true, spark: [48, 44, 46, 47, 51, 55, 58], time: "Yesterday" },
  { id: 3, sector: "ClimateTech", headline: "Carbon MRV liquidity unlock", summary: "Standards convergence is pulling enterprise buyers forward; watch procurement-led demand in Q3.", delta: "+26.7% sector momentum", good: true, spark: [12, 15, 19, 23, 28, 38, 51], time: "2 days ago" },
  { id: 4, sector: "Consumer", headline: "D2C discount fatigue deepens", summary: "CAC inflated 31% across consumer categories; contribution-margin-positive stories scarce below Series A.", delta: "-8.2% sector momentum", good: false, spark: [40, 38, 41, 36, 33, 30, 28], time: "3 days ago" },
];

export const SECTOR_REPORTS: {
  id: number; name: string; size: string; growth: string; deals: number;
  median: string; read: string; spark: number[];
}[] = [
  { id: 1, name: "AI & Agritech", size: "$42.8B", growth: "+18.4%", deals: 96, median: "$1.8M", read: "Consolidation around farm-gate data; AI diagnostics crossing to paid.", spark: [22, 26, 24, 31, 34, 32, 39, 44, 41, 52, 58, 64] },
  { id: 2, name: "FinTech", size: "$31.5B", growth: "+12.1%", deals: 183, median: "$2.6M", read: "Embedded credit absorbs early capital; consumer neobanking cools.", spark: [48, 44, 46, 42, 47, 51, 49, 55, 53, 58, 57, 62] },
  { id: 3, name: "ClimateTech", size: "$18.9B", growth: "+26.7%", deals: 58, median: "$1.4M", read: "Carbon MRV and battery second-life compounding fastest.", spark: [12, 15, 14, 19, 23, 21, 28, 26, 33, 38, 42, 51] },
  { id: 4, name: "HealthTech", size: "$27.2B", growth: "+15.9%", deals: 121, median: "$2.1M", read: "Diagnostics AI dominates dealflow; devices slower but deeper.", spark: [30, 33, 31, 36, 34, 40, 43, 41, 48, 47, 54, 59] },
];

export const IP_WATCH: {
  id: number; org: string; filing: string; domain: string; date: string;
  overlap: "Direct" | "Adjacent" | "None";
}[] = [
  { id: 1, org: "ScanMedix (competitor of Averia)", filing: "Multi-modal radiology triage pipeline", domain: "Diagnostics AI", date: "Mar 24", overlap: "Direct" },
  { id: 2, org: "AgriSense Corp", filing: "Soil NPK estimation via hyperspectral drone", domain: "Agri sensing", date: "Mar 21", overlap: "Adjacent" },
  { id: 3, org: "PayRail Systems", filing: "Atomic settlement across CBDC corridors", domain: "Payment rails", date: "Mar 18", overlap: "Adjacent" },
  { id: 4, org: "VoltCircle Energy", filing: "Second-life battery pack balancing method", domain: "Storage", date: "Mar 14", overlap: "Direct" },
  { id: 5, org: "FinEdge Labs", filing: "Behavioural scoring for thin-file borrowers", domain: "Credit risk", date: "Mar 09", overlap: "None" },
];

export const RAISING: {
  id: number; name: string; sector: string; stage: string; ask: string;
  raised: number; target: number; traction: string; score: number;
}[] = [
  { id: 1, name: "CropLens AI", sector: "AI · Agritech", stage: "Seed", ask: "₹6 Cr", raised: 4.1, target: 6, traction: "₹68L MRR · 42 pilot farms", score: 86 },
  { id: 2, name: "PathPilot", sector: "HealthTech", stage: "Series A", ask: "₹18 Cr", raised: 9, target: 18, traction: "9 hospital chains · CDSCO cleared", score: 91 },
  { id: 3, name: "SettleX", sector: "FinTech", stage: "Seed", ask: "₹4.5 Cr", raised: 2.2, target: 4.5, traction: "2 corridors live · ₹40Cr TPV", score: 78 },
  { id: 4, name: "ReJoule Energy", sector: "ClimateTech", stage: "Seed", ask: "₹7 Cr", raised: 3.6, target: 7, traction: "2 OEM LOIs · 14 patents filed", score: 88 },
  { id: 5, name: "Mandiverse", sector: "Agritech", stage: "Series A", ask: "₹14 Cr", raised: 5.5, target: 14, traction: "310K trader sessions/mo", score: 83 },
  { id: 6, name: "SehatGrid", sector: "HealthTech", stage: "Seed", ask: "₹6.5 Cr", raised: 1.9, target: 6.5, traction: "62 rural spokes active", score: 81 },
];

export const FOUNDERS: {
  id: number; name: string; company: string; domains: string[];
  stage: string; note: string; initials: string;
}[] = [
  { id: 1, name: "Dr. Ananya Rao", company: "Averia Health", domains: ["Clinical AI", "Radiology", "FDA/CDSCO"], stage: "Series A", note: "Radiologist-turned-founder; 3 patents. Exceptional on regulatory pathing.", initials: "AR" },
  { id: 2, name: "Kabir Mehta", company: "Terragrid", domains: ["Remote sensing", "Carbon MRV"], stage: "Series A", note: "Ex-ISRO scientist; mapped 1.4M hectares in year one.", initials: "KM" },
  { id: 3, name: "Ishita Verma", company: "AquaMend Robotics", domains: ["Robotics", "Water infra"], stage: "Seed", note: "Second-time founder; previous exit to a utility major.", initials: "IV" },
  { id: 4, name: "Rohan Iyer", company: "Kaarobar Credit", domains: ["Lending", "AA stack"], stage: "Series A", note: "Deep MSME credit intuition; built risk teams at two NBFCs.", initials: "RI" },
  { id: 5, name: "Dr. Farah Ali", company: "NeuroNest", domains: ["Neuro diagnostics", "EEG"], stage: "Pre-seed", note: "AIIMS neuro researcher; trial design needs commercial co-pilot.", initials: "FA" },
  { id: 6, name: "Aditya Rao", company: "FleetFox", domains: ["Logistics", "SaaS"], stage: "Seed", note: "Ops-heavy builder; fleet-side network across 3 states.", initials: "AR" },
];

export const CO_INVESTORS: {
  id: number; name: string; focus: string; overlap: number; lastDeal: string; since: string;
}[] = [
  { id: 1, name: "Nexora Capital", focus: "Series A · Health/AI", overlap: 6, lastDeal: "Averia Health Series A", since: "2023" },
  { id: 2, name: "Blume Syndicate", focus: "Seed · FinTech", overlap: 4, lastDeal: "Kaarobar Credit", since: "2024" },
  { id: 3, name: "Frontier Fund", focus: "Pre-seed · DeepTech", overlap: 3, lastDeal: "Qwron seed", since: "2024" },
  { id: 4, name: "Atlas Angels", focus: "Climate · Seed", overlap: 5, lastDeal: "ReJoule Energy", since: "2025" },
  { id: 5, name: "State Innovation Fund", focus: "Grants + equity", overlap: 2, lastDeal: "SehatGrid", since: "2026" },
];

export const INCUBATOR_PARTNERS: {
  id: number; name: string; focus: string; portfolio: number; referralScore: number;
}[] = [
  { id: 1, name: "Nexus Ventures", focus: "DeepTech & AI", portfolio: 64, referralScore: 92 },
  { id: 2, name: "AgriTech Hub, Indore", focus: "Agritech", portfolio: 41, referralScore: 88 },
  { id: 3, name: "Health Launchpad", focus: "HealthTech", portfolio: 53, referralScore: 85 },
  { id: 4, name: "Zero-to-One Studio", focus: "Pre-seed generalist", portfolio: 38, referralScore: 79 },
  { id: 5, name: "Climate Foundry", focus: "ClimateTech", portfolio: 29, referralScore: 76 },
];

export const LEDGER: {
  id: number; date: string; deal: string; type: "Investment" | "Follow-on" | "Distribution" | "Fee";
  amount: string; good: boolean;
}[] = [
  { id: 1, date: "Mar 26", deal: "SoilSense Labs", type: "Investment", amount: "-₹40.0 L", good: true },
  { id: 2, date: "Mar 18", deal: "Averia Health", type: "Follow-on", amount: "-₹1.6 Cr", good: true },
  { id: 3, date: "Mar 04", deal: "Exit — MediChain (partial)", type: "Distribution", amount: "+₹3.2 Cr", good: true },
  { id: 4, date: "Feb 22", deal: "Finlattice seed", type: "Investment", amount: "-₹90.0 L", good: true },
  { id: 5, date: "Feb 10", deal: "Fund ops Q1", type: "Fee", amount: "-₹8.4 L", good: false },
  { id: 6, date: "Jan 30", deal: "Terragrid Series A", type: "Investment", amount: "-₹2.4 Cr", good: true },
];

export const SYNDICATES: {
  id: number; name: string; deal: string; target: number; committed: number;
  partners: string[]; closes: string;
}[] = [
  { id: 1, name: "Climate Pre-Series A", deal: "ReJoule Energy", target: 6, committed: 4.2, partners: ["Atlas Angels", "Frontier Fund", "Meridian"], closes: "Apr 18" },
  { id: 2, name: "Health AI Circle", deal: "PathPilot", target: 12, committed: 7.5, partners: ["Nexora Capital", "Meridian"], closes: "May 02" },
  { id: 3, name: "Agri Exchange Pool", deal: "Mandiverse", target: 8, committed: 3.1, partners: ["Blume Syndicate", "AgriTech Hub", "Meridian"], closes: "May 21" },
];

export const SCHEDULE: {
  id: number; time: string; title: string; withWhom: string; kind: "Pitch" | "Portfolio" | "Partner" | "IC";
  detail: string; day: string;
}[] = [
  { id: 1, day: "Today", time: "10:00", title: "PathPilot — partner deep-dive", withWhom: "Dr. R. Menon, CEO", kind: "Pitch", detail: "Series A · unit economics walk-through. Bring radiology QA set." },
  { id: 2, day: "Today", time: "13:30", title: "Averia Health board sync", withWhom: "Board + Founders", kind: "Portfolio", detail: "Series B readiness; Nexora term sheet review." },
  { id: 3, day: "Today", time: "16:00", title: "IC weekly — vote: CarbonKart", withWhom: "Investment Committee", kind: "IC", detail: "Final vote on ₹5.5 Cr seed term sheet." },
  { id: 4, day: "Tomorrow", time: "09:30", title: "CropLens AI — field day", withWhom: "Founders + 3 pilot farms", kind: "Pitch", detail: "On-site drone demo, Mandya district." },
  { id: 5, day: "Tomorrow", time: "15:00", title: "Blume Syndicate co-invest call", withWhom: "S. Kapoor", kind: "Partner", detail: "Agri Exchange Pool syndication split." },
  { id: 6, day: "Fri", time: "11:00", title: "Qwron quarterly review", withWhom: "Dr. V. Krishnan", kind: "Portfolio", detail: "Design-win pipeline + Series A narrative." },
];

export const MEETING_NOTES: {
  id: number; title: string; deal: string; date: string; tags: string[]; excerpt: string;
}[] = [
  { id: 1, title: "PathPilot radiology QA findings", deal: "PathPilot", date: "Mar 25", tags: ["Diligence", "Technical"], excerpt: "Sensitivity at 97.2% on their test set; ask for district-hospital distribution before final vote…" },
  { id: 2, title: "CarbonKart pricing power check", deal: "CarbonKart", date: "Mar 22", tags: ["Market"], excerpt: "Enterprise buyers prepaying credits; margin structure holds even at 40% volume discount…" },
  { id: 3, title: "Zephyr defence corridor terms", deal: "Zephyr Drones", date: "Mar 19", tags: ["Portfolio"], excerpt: "Contract is milestone-billed; working capital line needed — coordinate with SBI AVA fund…" },
  { id: 4, title: "FleetFox churn deep-dive", deal: "FleetFox", date: "Mar 15", tags: ["Screening"], excerpt: "Logo churn 8%/mo concentrated in sub-20-truck fleets; ICP drift suspected…" },
  { id: 5, title: "Averia Series B narrative", deal: "Averia Health", date: "Mar 11", tags: ["Portfolio", "Fundraising"], excerpt: "Lead with 140-centre network density; regulatory moat slide needs CDSCO timeline…" },
];

export const DEAL_ROOM: {
  id: number; file: string; deal: string; kind: "Deck" | "Model" | "Legal" | "Data" | "Memo";
  size: string; updated: string;
}[] = [
  { id: 1, file: "CarbonKart_IC_memo_v3.pdf", deal: "CarbonKart", kind: "Memo", size: "1.2 MB", updated: "2h ago" },
  { id: 2, file: "PathPilot_financial_model.xlsx", deal: "PathPilot", kind: "Model", size: "4.8 MB", updated: "Yesterday" },
  { id: 3, file: "ReJoule_technical_DD_pack.zip", deal: "ReJoule Energy", kind: "Data", size: "38 MB", updated: "Yesterday" },
  { id: 4, file: "CarbonKart_term_sheet_draft.docx", deal: "CarbonKart", kind: "Legal", size: "240 KB", updated: "2 days ago" },
  { id: 5, file: "Mandiverse_deck_SeriesA.pdf", deal: "Mandiverse", kind: "Deck", size: "6.1 MB", updated: "3 days ago" },
  { id: 6, file: "SehatGrid_cap_table.csv", deal: "SehatGrid", kind: "Data", size: "18 KB", updated: "4 days ago" },
  { id: 7, file: "SettleX_regulatory_summary.pdf", deal: "SettleX", kind: "Legal", size: "890 KB", updated: "Last week" },
];

export const DATA_REQUESTS: {
  id: number; item: string; company: string; due: string;
  status: "Pending" | "Received" | "Overdue"; owner: string;
}[] = [
  { id: 1, item: "Cohort retention by hospital tier", company: "PathPilot", due: "Today", status: "Pending", owner: "AM" },
  { id: 2, item: "Signed OEM LOI copies", company: "ReJoule Energy", due: "Mar 28", status: "Pending", owner: "SK" },
  { id: 3, item: "Cap table with ESOP shuffle", company: "CarbonKart", due: "Mar 25", status: "Received", owner: "AM" },
  { id: 4, item: "Corridor licence applications", company: "SettleX", due: "Mar 20", status: "Overdue", owner: "RJ" },
  { id: 5, item: "Trader cohort GMV split", company: "Mandiverse", due: "Apr 02", status: "Pending", owner: "SK" },
  { id: 6, item: "IP assignment agreements", company: "Qwron", due: "Mar 18", status: "Received", owner: "AM" },
];

export const LP_REPORTS: {
  id: number; title: string; period: string; status: "Published" | "Draft" | "Scheduled";
  updated: string; pages: number;
}[] = [
  { id: 1, title: "Q4 FY25 LP Letter", period: "Jan – Mar 2026", status: "Draft", updated: "2h ago", pages: 14 },
  { id: 2, title: "Portfolio Valuation Pack", period: "Q4 FY25", status: "Draft", updated: "Yesterday", pages: 22 },
  { id: 3, title: "Q3 FY25 LP Letter", period: "Oct – Dec 2025", status: "Published", updated: "Jan 15", pages: 16 },
  { id: 4, title: "Annual Impact Report", period: "FY 2025", status: "Published", updated: "Feb 02", pages: 30 },
  { id: 5, title: "Q1 FY26 LP Letter", period: "Apr – Jun 2026", status: "Scheduled", updated: "Due Jul 12", pages: 0 },
];

export const THESIS = {
  focus: ["HealthTech", "FinTech infra", "ClimateTech", "Agri AI"],
  stages: ["Pre-seed", "Seed", "Series A"],
  cheque: "₹2 – 6 Cr initial · up to ₹12 Cr with follow-ons",
  geography: "India-first, corridors to SEA",
  antiThesis: [
    "Consumer marketplaces without unit-economics proof",
    "Crypto-adjacent infra without regulatory path",
    "Hardware without a signed anchor buyer",
    " anything requiring >₹40 Cr to break even",
  ],
  pillars: [
    { title: "Regulation-aware", detail: "We back founders who treat CDSCO/RBI/SEBI pathways as strategy, not admin." },
    { title: "Data-moat compounding", detail: "Every product loop must deepen proprietary data density." },
    { title: "Distribution before polish", detail: "Signed demand corridors beat perfect products at seed." },
    { title: "IP as an asset", detail: "Defensible filings reviewed with StartupHub IPR desk pre-term-sheet." },
  ],
};

export const ACTIVITY: {
  id: number; text: string; time: string; kind: "deal" | "portfolio" | "intel" | "network";
}[] = [
  { id: 1, text: "CarbonKart moved to Term Sheet — IC vote today 16:00", time: "8m", kind: "deal" },
  { id: 2, text: "Averia Health posted February metrics: ₹3.6 Cr MRR (+18%)", time: "1h", kind: "portfolio" },
  { id: 3, text: "New signal: Agri infra momentum up 3 weeks straight", time: "3h", kind: "intel" },
  { id: 4, text: "Nexus Ventures referred 2 decks from Cohort V", time: "5h", kind: "network" },
  { id: 5, text: "PathPilot uploaded updated financial model to deal room", time: "Yesterday", kind: "deal" },
  { id: 6, text: "SettleX crossed ₹40 Cr TPV — watchlist trigger hit", time: "Yesterday", kind: "intel" },
];
