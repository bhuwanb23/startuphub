export const OPP_CATEGORIES = ["All", "Jobs", "Projects", "Freelance", "Consulting"] as const;

export type Opportunity = {
  id: string;
  role: string;
  org: string;
  sector: string;
  type: Exclude<(typeof OPP_CATEGORIES)[number], "All">;
  comp: string;
  match: number;
  location: string;
  deadline: string;
  tags: string[];
};

export const OPPORTUNITIES: Opportunity[] = [
  { id: "o1", role: "Founding Frontend Engineer", org: "AgriSense AI", sector: "AI × Agritech", type: "Jobs", comp: "₹55–70L + 0.4% equity", match: 94, location: "Bengaluru · Hybrid", deadline: "Apr 05", tags: ["React", "Geospatial UI", "0→1"] },
  { id: "o2", role: "Payments Infrastructure Review", org: "Ledgerline", sector: "FinTech Infra", type: "Consulting", comp: "₹4.8L retainer / mo", match: 91, location: "Remote", deadline: "Mar 28", tags: ["Treasury APIs", "Audit"] },
  { id: "o3", role: "Clinical NLP Pipeline", org: "MedSynapse", sector: "HealthTech", type: "Projects", comp: "₹6.5L fixed · 10 wks", match: 88, location: "Remote", deadline: "Apr 02", tags: ["RAG", "FHIR", "Python"] },
  { id: "o4", role: "Fractional CTO", org: "RootStack", sector: "ClimateTech", type: "Consulting", comp: "2 days/wk · equity", match: 86, location: "Bengaluru", deadline: "Rolling", tags: ["Leadership", "MRV systems"] },
  { id: "o5", role: "Design-system migration", org: "Terraforma Corp", sector: "ClimateTech", type: "Freelance", comp: "₹4,200/hr · 6 wks", match: 79, location: "Remote · EU overlap", deadline: "Apr 12", tags: ["Tokens", "Storybook"] },
  { id: "o6", role: "Staff Engineer — Risk", org: "KredKart", sector: "FinTech", type: "Jobs", comp: "₹80L–₹1.1Cr + ESOP", match: 84, location: "Mumbai · Hybrid", deadline: "Apr 20", tags: ["Scoring", "Scale"] },
  { id: "o7", role: "AI Prototype Sprint", org: "Nexus Labs Batch 07", sector: "DeepTech", type: "Freelance", comp: "₹2.8L · 3 wks", match: 77, location: "On-campus + remote", deadline: "Mar 30", tags: ["Agents", "POC"] },
  { id: "o8", role: "Post-Quantum Crypto Audit", org: "OrbitPay", sector: "FinTech", type: "Projects", comp: "₹9L fixed · 12 wks", match: 72, location: "Remote", deadline: "Apr 15", tags: ["Security", "Go"] },
];

export type StartupMatch = {
  startup: string;
  sector: string;
  stage: string;
  role: string;
  score: number;
  dims: { skill: number; experience: number; availability: number };
  reasons: string[];
};

export const STARTUP_MATCHES: StartupMatch[] = [
  {
    startup: "AgriSense AI", sector: "AI × Agritech", stage: "Series A", role: "Founding Frontend Engineer",
    score: 94, dims: { skill: 96, experience: 92, availability: 90 },
    reasons: ["Your geospatial dashboard work at OrbitPay maps 1:1", "They cap-equity roles at your preferred band", "Kickoff in 3 weeks — matches your notice window"],
  },
  {
    startup: "Ledgerline", sector: "FinTech Infra", stage: "Seed", role: "Consulting architect",
    score: 91, dims: { skill: 93, experience: 90, availability: 88 },
    reasons: ["Treasury API audit is exactly your KredKart playbook", "Retainer fits your 30h capacity", "Team of your ex-colleagues — culture signal strong"],
  },
  {
    startup: "RootStack", sector: "ClimateTech", stage: "Seed", role: "Fractional CTO",
    score: 86, dims: { skill: 82, experience: 84, availability: 92 },
    reasons: ["University spin-off needs senior product judgment", "Advisory equity aligns with your goals", "2 days/wk — stacks with Ledgerline retainer"],
  },
  {
    startup: "MedSynapse", sector: "HealthTech", stage: "Pre-seed", role: "Project lead — clinical NLP",
    score: 84, dims: { skill: 88, experience: 80, availability: 81 },
    reasons: ["FHIR experience from Meridian Health transfers directly", "Fixed-scope project suits your freelance window", "Compliance bar means fewer competing applicants"],
  },
];
