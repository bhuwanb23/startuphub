export type NewsItem = {
  id: string;
  category: "Startup News" | "Funding News" | "IPR News" | "Government Updates" | "Ecosystem Updates" | "Platform Updates";
  title: string;
  excerpt: string;
  date: string;
  source: string;
  read: string;
  featured?: boolean;
};

export const newsCategories = [
  "Startup News", "Funding News", "IPR News", "Government Updates", "Ecosystem Updates", "Platform Updates",
];

export const news: NewsItem[] = [
  {
    id: "n1", category: "Funding News",
    title: "Q1 2026 closes at ₹8,412 Cr — early-stage volume hits record",
    excerpt: "412 pre-seed and seed rounds closed in Q1, the strongest opening quarter on record for the ecosystem. DeepTech and climate took 56% of deployed capital.",
    date: "Mar 31, 2026", source: "SH Intelligence Desk", read: "4 min", featured: true,
  },
  {
    id: "n2", category: "Government Updates",
    title: "National DeepTech Mission expands to 14 more states",
    excerpt: "The mission's ₹1Cr milestone-based grants will now be accessible through state innovation councils, with StartupHub as the application pipeline in 9 states.",
    date: "Mar 28, 2026", source: "Policy Wire", read: "5 min",
  },
  {
    id: "n3", category: "Startup News",
    title: "Lumen AI crosses 3 million hectares, enters Southeast Asia",
    excerpt: "The crop-intelligence startup signed its first international deployment — 400K hectares with a rice cooperative in Vietnam.",
    date: "Mar 26, 2026", source: "Ecosystem Desk", read: "3 min",
  },
  {
    id: "n4", category: "IPR News",
    title: "Patent filings by funded startups up 31% year-on-year",
    excerpt: "The IP race is formalizing: investors increasingly cite pending filings in term sheets, and provisional-first strategies are becoming the default.",
    date: "Mar 24, 2026", source: "IPR Desk", read: "5 min",
  },
  {
    id: "n5", category: "Platform Updates",
    title: "Readiness Score 2.0 rolls out to all startups",
    excerpt: "The scoring model now weighs pilot conversion and IP coverage alongside traction — with full transparency on every input.",
    date: "Mar 22, 2026", source: "StartupHub Product", read: "3 min",
  },
  {
    id: "n6", category: "Ecosystem Updates",
    title: "Tier-2 founder registrations grow 34% — fastest ever",
    excerpt: "Jaipur, Kochi, Indore and Coimbatore lead the surge, driven by vernacular tooling and remote incubation cohorts.",
    date: "Mar 20, 2026", source: "SH Intelligence Desk", read: "4 min",
  },
  {
    id: "n7", category: "Funding News",
    title: "Vertex Global announces $180M India-focused growth fund",
    excerpt: "The firm's third India vehicle will lead Series A and B rounds in health, logistics and climate — 60% reserved for follow-on.",
    date: "Mar 18, 2026", source: "Capital Wire", read: "3 min",
  },
  {
    id: "n8", category: "Startup News",
    title: "MedSync's consent mesh now processes 1.8M patient records",
    excerpt: "The HealthTech startup doubled its record volume in 90 days after onboarding two hospital chains in Tamil Nadu.",
    date: "Mar 15, 2026", source: "Ecosystem Desk", read: "3 min",
  },
  {
    id: "n9", category: "IPR News",
    title: "IPR Desk hits 4,000th filing — 72-hour search keeps its record",
    excerpt: "Four years in, the desk maintains a 92% first-examination success rate across patents, trademarks and designs.",
    date: "Mar 12, 2026", source: "IPR Desk", read: "2 min",
  },
  {
    id: "n10", category: "Government Updates",
    title: "Pune Municipal opens ₹2Cr smart-mobility RFP to startups",
    excerpt: "The city's first startup-route procurement pilot invites solutions for last-mile transit optimization, with a one-year paid pilot guaranteed.",
    date: "Mar 10, 2026", source: "Policy Wire", read: "4 min",
  },
  {
    id: "n11", category: "Platform Updates",
    title: "Ecosystem Map goes live with 34,000+ mapped connections",
    excerpt: "Every verified organization now appears on the public map — filter, trace and explore how the network actually connects.",
    date: "Mar 08, 2026", source: "StartupHub Product", read: "2 min",
  },
  {
    id: "n12", category: "Ecosystem Updates",
    title: "Incubated-cohort survival reaches 84% for 2024 class",
    excerpt: "Structured milestone programs continue to widen the survival gap versus unincubated startups — now 2.4× at the two-year mark.",
    date: "Mar 05, 2026", source: "SH Intelligence Desk", read: "5 min",
  },
];
