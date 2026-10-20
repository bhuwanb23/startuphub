export const SPINOFF_STATS = [
  { label: "Active spin-offs", value: "26", delta: "+4", hint: "this year" },
  { label: "In incubation", value: "19", hint: "Nexus Labs & on-campus" },
  { label: "Combined revenue", value: "₹18 Cr", delta: "+42%" },
  { label: "Institution equity pool", value: "6.2%", hint: "avg holding" },
];

export type Spinoff = {
  name: string;
  tech: string;
  founder: string;
  stage: "Idea" | "Validation" | "Incubation" | "Market";
  incubator: string;
  progress: number; // 0–100
  ip: string;
};

export const SPINOFFS: Spinoff[] = [
  { name: "RootStack", tech: "Soil micro-biome kit", founder: "Dr. G. D'Souza + 2 scholars", stage: "Market", incubator: "Nexus Labs · Batch 06", progress: 88, ip: "Licensed · 8% equity" },
  { name: "Pestlens", tech: "Edge pest-vision model", founder: "Dr. V. Acharya, A. Rao", stage: "Incubation", incubator: "On-campus TBI", progress: 62, ip: "Patent filed IN2024147" },
  { name: "Aqualyte Sensors", tech: "Arsenic biosensor", founder: "Dr. L. Mathew", stage: "Validation", incubator: "Nexus Labs", progress: 44, ip: "Under license negotiation" },
  { name: "ChargeLoop", tech: "Bidirectional charger", founder: "Dr. H. Naidu, V. Menon", stage: "Incubation", incubator: "On-campus TBI", progress: 57, ip: "Granted IN2022089" },
  { name: "FedClin", tech: "Federated clinical training", founder: "Dr. P. Kulkarni", stage: "Idea", incubator: "—", progress: 18, ip: "Disclosure in review" },
  { name: "Solstice Cells", tech: "SSB electrolyte", founder: "Dr. I. Sheikh", stage: "Validation", incubator: "Nexus Labs · Batch 07", progress: 39, ip: "Assessment complete" },
];

export const STAGE_TONE: Record<Spinoff["stage"], string> = {
  Idea: "bg-slate-100 text-slate-600",
  Validation: "bg-amber-50 text-amber-700",
  Incubation: "bg-accent-soft text-accent-deep",
  Market: "bg-emerald-50 text-emerald-700",
};

/* ---------------- Startup matching ---------------- */

export type StartupMatch = {
  name: string;
  sector: string;
  need: string;
  score: number;
  dims: { tech: number; market: number; team: number };
  reasons: string[];
};

export const STARTUP_MATCHES: StartupMatch[] = [
  {
    name: "AgriSense AI", sector: "AI × Agritech", need: "On-device crop-vision models",
    score: 92,
    dims: { tech: 95, market: 90, team: 88 },
    reasons: ["Pest-vision model cuts their inference cost by ~60%", "Already licensed adjacent soil IP", "Raising seed extension · $2.0M"],
  },
  {
    name: "AquaPure Industries", sector: "Water systems", need: "Field water-quality sensing",
    score: 88,
    dims: { tech: 90, market: 85, team: 84 },
    reasons: ["Arsenic biosensor TRL 7 — field-ready", "Existing licensee relationship", "Wants exclusivity for India"],
  },
  {
    name: "VoltEdge", sector: "ClimateTech", need: "Thermal & charging IP",
    score: 85,
    dims: { tech: 82, market: 88, team: 86 },
    reasons: ["Two prior sponsored projects", "EV topology grant co-owned", "Series seed closing Q2"],
  },
  {
    name: "CardioMesh", sector: "HealthTech", need: "Privacy-safe model training",
    score: 78,
    dims: { tech: 84, market: 72, team: 80 },
    reasons: ["Federated protocol matches HIPAA-like constraints", "Needs hospital pilot network we can open", "Early — watch before offering terms"],
  },
];

/* ---------------- Technology showcase ---------------- */

export const SHOWCASE_STATS = [
  { label: "Published technologies", value: "34", hint: "of 96 developed" },
  { label: "Enquiries this month", value: "12", delta: "+5" },
  { label: "Industry profile views", value: "840", delta: "+18%" },
];

export type ShowcaseTech = {
  name: string;
  category: string;
  trl: string;
  applications: string;
  licensing: boolean;
  enquiries: number;
  prototype: string;
};

export const SHOWCASE: ShowcaseTech[] = [
  { name: "Low-cost arsenic biosensor", category: "Water & Environment", trl: "TRL 7", applications: "Field kits for municipal water boards and NGOs; per-test cost under ₹12.", licensing: true, enquiries: 5, prototype: "Field-validated · 400 tests" },
  { name: "Edge pest-vision model", category: "Applied AI", trl: "TRL 6", applications: "On-device pest detection for smallholder smartphones; 93% field accuracy.", licensing: true, enquiries: 3, prototype: "Piloted · 120 farms" },
  { name: "Solid-state electrolyte", category: "Energy Storage", trl: "TRL 5", applications: "Fast-charging, non-flammable cells for two- and three-wheeler EVs.", licensing: false, enquiries: 2, prototype: "Lab-scale pouch cells" },
  { name: "Nanocoating formulation", category: "Advanced Materials", trl: "TRL 6", applications: "Anti-corrosive marine coatings; 4× lifespan in salt-spray tests.", licensing: true, enquiries: 2, prototype: "EU pilot line validated" },
];
