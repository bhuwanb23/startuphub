export type Investor = {
  slug: string;
  name: string;
  initials: string;
  type: "VC Fund" | "Angel Network" | "Corporate VC" | "Government Fund";
  stages: string[];
  sectors: string[];
  geography: string;
  ticket: string;
  portfolio: number;
  desc: string;
};

export const investors: Investor[] = [
  {
    slug: "northgate-partners",
    name: "Northgate Partners", initials: "NP", type: "VC Fund",
    stages: ["Seed", "Series A"], sectors: ["AI", "SaaS", "AgriTech", "Enterprise"],
    geography: "Pan-India + SEA", ticket: "₹50L – ₹5Cr", portfolio: 42,
    desc: "Early-stage fund backing boring-looking markets with non-obvious technology. Leads rounds, boards, and very direct feedback.",
  },
  {
    slug: "nexus-angels",
    name: "Nexus Angels", initials: "NA", type: "Angel Network",
    stages: ["Pre-seed", "Seed"], sectors: ["Multi-sector", "Consumer", "HealthTech"],
    geography: "India-wide", ticket: "₹10L – ₹75L", portfolio: 118,
    desc: "A 300-member operator-angel network writing first cheques fast — 3-week decisions, no investment-committee theatre.",
  },
  {
    slug: "vertex-global",
    name: "Vertex Global", initials: "VG", type: "VC Fund",
    stages: ["Series A", "Series B"], sectors: ["HealthTech", "Logistics", "FinTech", "Climate"],
    geography: "India + MENA", ticket: "₹4Cr – ₹20Cr", portfolio: 31,
    desc: "Growth-stage capital for companies with proven unit economics. Known for hands-on international expansion support.",
  },
  {
    slug: "meridian-labs",
    name: "Meridian Labs", initials: "ML", type: "Corporate VC",
    stages: ["Seed", "Series A"], sectors: ["CleanTech", "Water", "Energy", "Industrial"],
    geography: "India + EU", ticket: "₹1Cr – ₹8Cr", portfolio: 26,
    desc: "The venture arm of a global engineering group — invests where startups can become strategic suppliers or partners.",
  },
  {
    slug: "atlas-capital",
    name: "Atlas Capital", initials: "AC", type: "VC Fund",
    stages: ["Pre-seed", "Seed", "Series A"], sectors: ["Space", "DeepTech", "AgriTech", "Robotics"],
    geography: "India", ticket: "₹25L – ₹4Cr", portfolio: 57,
    desc: "Deep-tech first-cheque fund led by former scientists. Comfortable with long timelines and physics problems.",
  },
  {
    slug: "samriddhi-fund",
    name: "Samriddhi Fund", initials: "SF", type: "Government Fund",
    stages: ["Seed", "Series A"], sectors: ["Agriculture", "Social Impact", "MSME", "Rural"],
    geography: "Tier 2/3 India", ticket: "₹20L – ₹2Cr", portfolio: 84,
    desc: "Government-backed fund of funds and direct investor focused on inclusive growth beyond metro ecosystems.",
  },
];

export const investorFilters = {
  types: ["VC Fund", "Angel Network", "Corporate VC", "Government Fund"],
  stages: ["Pre-seed", "Seed", "Series A", "Series B"],
  sectors: ["AI", "SaaS", "AgriTech", "HealthTech", "FinTech", "Climate", "DeepTech", "Consumer"],
};
