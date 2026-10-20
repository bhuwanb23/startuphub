export type HomeStartup = {
  id: number;
  name: string;
  sector: string;
  stage: string;
  location: string;
  oneLiner: string;
  metric: string;
  accent: string;
  featured: boolean;
};

export const HOME_STARTUPS: HomeStartup[] = [
  {
    id: 1, name: "Vantara Robotics", sector: "AI · AgriRobotics", stage: "Series A",
    location: "Bengaluru",
    oneLiner:
      "Autonomous micro-fleets that cut spraying costs for smallholder farms by 60% — already live across 14,000 acres.",
    metric: "$4.2M raised", accent: "#3157E8", featured: true,
  },
  {
    id: 2, name: "MediQueue", sector: "HealthTech", stage: "Seed", location: "Hyderabad",
    oneLiner: "Smart queue infrastructure that gives hospital OPDs back 2.1M patient-hours a year.",
    metric: "120 hospitals live", accent: "#0F766E", featured: false,
  },
  {
    id: 3, name: "GridSense", sector: "Climate · Energy", stage: "Seed", location: "Pune",
    oneLiner: "Grid-interactive compute scheduling that turns data centers into virtual power plants.",
    metric: "31% grid loss cut", accent: "#0E7490", featured: false,
  },
  {
    id: 4, name: "StackLedger", sector: "FinTech Infra", stage: "Pre-seed", location: "Mumbai",
    oneLiner: "Compliance-first ledger rails so any fintech can ship embedded lending in weeks, not years.",
    metric: "18 bank pilots", accent: "#6D28D9", featured: false,
  },
  {
    id: 5, name: "FiberForge", sector: "DeepTech · Materials", stage: "Seed", location: "Chennai",
    oneLiner: "Bio-composite fibers from agricultural waste — stronger than plastic, compostable in 90 days.",
    metric: "6 patents filed", accent: "#B45309", featured: false,
  },
  {
    id: 6, name: "AquaTrace", sector: "Blue Economy", stage: "Incubation", location: "Kochi",
    oneLiner: "Sensor-verified carbon traceability for coastal aquaculture supply chains.",
    metric: "42t CO2e traced", accent: "#0369A1", featured: false,
  },
];

export type HomeOpportunity = {
  id: number;
  type: "funding" | "incubation" | "challenge";
  title: string;
  org: string;
  meta: string;
  deadline: string;
};

export const HOME_OPPORTUNITIES: HomeOpportunity[] = [
  {
    id: 1, type: "funding", title: "Seed Grant — Innovation Mission 2026",
    org: "National Innovation Foundation", meta: "Pre-seed · Pan-India", deadline: "Closes Apr 30",
  },
  {
    id: 2, type: "funding", title: "Nexus Angels — Sector-agnostic Sprint",
    org: "Nexus Angel Network", meta: "Seed · Tier-2/3 focus", deadline: "Rolling",
  },
  {
    id: 3, type: "incubation", title: "Frontier Cohort VII",
    org: "Catalyst Labs", meta: "MVP-ready · 12 weeks", deadline: "Closes May 12",
  },
  {
    id: 4, type: "challenge", title: "AgriSense Grand Challenge",
    org: "Ministry of Agriculture × StartupHub", meta: "Prototype · Global · ₹50L prize",
    deadline: "Closes Jun 02",
  },
  {
    id: 5, type: "incubation", title: "University Deep-Tech Residency",
    org: "Apex University TBI", meta: "Research spin-offs · 6 months", deadline: "Closes May 28",
  },
];

export type HomeStory = {
  id: number;
  quote: string;
  name: string;
  role: string;
  initials: string;
  metric: string;
};

export const HOME_STORIES: HomeStory[] = [
  {
    id: 1,
    quote:
      "We walked in with a prototype and walked out with our first hospital network. The mentor bench here is unreal.",
    name: "Ananya Rao", role: "Co-founder, MediQueue", initials: "AR",
    metric: "3.2× revenue in 12 months",
  },
  {
    id: 2,
    quote: "IPR Studio turned our thesis into six filed patents — before our seed round even closed.",
    name: "Rohan Iyer", role: "CTO, FiberForge", initials: "RI",
    metric: "6 patents filed pre-seed",
  },
  {
    id: 3,
    quote:
      "The investor match was surgical. Two meetings in, we had a term sheet at exactly the right valuation.",
    name: "Sara Mathew", role: "CEO, GridSense", initials: "SM",
    metric: "$1.8M seed closed",
  },
];
