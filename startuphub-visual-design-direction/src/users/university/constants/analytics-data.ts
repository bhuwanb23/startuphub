export const ANALYTICS_STATS = [
  { label: "Research output index", value: "1,240", delta: "+7.4%", hint: "publications / yr" },
  { label: "Tech transfer rate", value: "11.5%", delta: "+2.1 pts", hint: "research → market" },
  { label: "IP revenue", value: "₹2.4 Cr", delta: "+31%" },
  { label: "Grant success", value: "38%", delta: "+4 pts" },
];

export const YEAR_LABELS = ["2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026"];

export const PUB_SERIES = [620, 705, 760, 812, 940, 1042, 1154, 1240];
export const TECH_SERIES = [18, 24, 31, 38, 52, 64, 79, 96];

export const IP_BY_DEPT = [
  { dept: "Computer Science", pct: 92, count: 31 },
  { dept: "Biotechnology", pct: 78, count: 24 },
  { dept: "Materials Science", pct: 64, count: 19 },
  { dept: "Electrical Eng", pct: 48, count: 14 },
  { dept: "Mechanical Eng", pct: 31, count: 9 },
] as const;

export const FUNDING_SOURCES = [
  { src: "Government grants", pct: 46 },
  { src: "Industry sponsored", pct: 28 },
  { src: "International programs", pct: 16 },
  { src: "Institutional seed", pct: 10 },
] as const;

export const COMMERCIAL_FUNNEL = [
  { stage: "Research outcomes", value: 96 },
  { stage: "Assessed for IP", value: 61 },
  { stage: "IP protected", value: 42 },
  { stage: "Licensed", value: 14 },
  { stage: "Spin-offs", value: 9 },
] as const;

export const OUTCOME_ROWS = [
  { name: "Research → publication rate", value: "86%", delta: "+2 pts" },
  { name: "Research → IP conversion", value: "44%", delta: "+6 pts" },
  { name: "IP → license conversion", value: "33%", delta: "+5 pts" },
  { name: "Lab → external utilization", value: "22%", delta: "+4 pts" },
];
