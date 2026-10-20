export const ANALYTICS_STATS = [
  { label: "Profile views", value: "1,284", delta: "+22%", hint: "30 days" },
  { label: "Search appearances", value: "3,840", delta: "+11%", hint: "30 days" },
  { label: "Application success", value: "29%", delta: "+6 pts", hint: "this quarter" },
  { label: "Repeat clients", value: "64%", delta: "+8 pts" },
];

export const MONTH_LABELS = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
export const VIEWS_SERIES = [410, 480, 455, 620, 590, 705, 680, 760, 830, 910, 1052, 1284];
export const SEARCH_SERIES = [1050, 1180, 1140, 1420, 1510, 1690, 1745, 2010, 2260, 2580, 3120, 3840];

export const EARNINGS = [
  { label: "Earnings YTD", value: "₹18.6L", delta: "+34%", hint: "vs last FY" },
  { label: "This month", value: "₹2.4L", hint: "Ledgerline + Pestlens" },
  { label: "Avg consulting rate", value: "₹4,800/hr", delta: "+12%" },
  { label: "Pending invoices", value: "₹1.1L", hint: "2 invoices" },
];

export const APP_FUNNEL = [
  { stage: "Applications sent", value: 24 },
  { stage: "Shortlisted", value: 9 },
  { stage: "Interviews", value: 4 },
  { stage: "Offers", value: 2 },
] as const;

export const SKILL_DEMAND = [
  { skill: "Applied GenAI (RAG)", pct: 92 },
  { skill: "TypeScript / Next.js", pct: 88 },
  { skill: "Fintech infrastructure", pct: 81 },
  { skill: "Product discovery", pct: 64 },
  { skill: "Security & compliance", pct: 58 },
] as const;

export const RATINGS_TREND = [4.6, 4.7, 4.7, 4.8, 4.8, 4.85, 4.85, 4.9];
