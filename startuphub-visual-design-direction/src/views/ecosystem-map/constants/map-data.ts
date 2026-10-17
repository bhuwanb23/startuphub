export type EcoType =
  | "Startups" | "Incubators" | "Investors" | "Mentors"
  | "Corporates" | "Universities" | "Labs" | "Resources";

export type EcoEntity = {
  id: string;
  name: string;
  type: EcoType;
  location: string;
  industry: string;
  note: string;
  x: number;
  y: number;
  links?: string[];
};

export const ECO_TYPES: EcoType[] = [
  "Startups", "Incubators", "Investors", "Mentors",
  "Corporates", "Universities", "Labs", "Resources",
];

export const ecoLocations = [
  "Delhi NCR", "Jaipur", "Ahmedabad", "Mumbai", "Pune",
  "Hyderabad", "Bengaluru", "Chennai", "Kochi",
];

export const ecoIndustries = [
  "AgriTech", "AI", "ClimateTech", "EdTech", "FinTech",
  "HealthTech", "Logistics", "Space", "DeepTech", "Multi-sector",
];

export const ecoStages = ["Validation", "MVP", "Growth", "Scale"];

export const entities: EcoEntity[] = [
  /* startups (x,y loosely geographic) */
  { id: "lumen-ai", name: "Lumen AI", type: "Startups", location: "Bengaluru", industry: "AgriTech", note: "Crop-health vision models · Series A", x: 24, y: 80, links: ["startuphub-labs", "northgate-partners", "atlas-capital"] },
  { id: "terragrid", name: "TerraGrid", type: "Startups", location: "Pune", industry: "ClimateTech", note: "Storage dispatch intelligence · Seed", x: 12, y: 57, links: ["cied-pune", "horizon-fund"] },
  { id: "medsync", name: "MedSync", type: "Startups", location: "Hyderabad", industry: "HealthTech", note: "Consented health records · Series A", x: 30, y: 62, links: ["t-hub-health", "vertex-global", "meridian-labs"] },
  { id: "finedge", name: "FinEdge", type: "Startups", location: "Mumbai", industry: "FinTech", note: "Alt-data credit rails · Pre-seed", x: 7, y: 48, links: ["startuphub-labs", "nexus-angels"] },
  { id: "orbitalworks", name: "OrbitalWorks", type: "Startups", location: "Chennai", industry: "Space", note: "Ground-segment pipelines · Seed", x: 40, y: 74, links: ["ciie-space", "atlas-capital", "nexus-angels"] },
  { id: "skyline-logistics", name: "Skyline", type: "Startups", location: "Delhi NCR", industry: "Logistics", note: "Empty-mile marketplace · Series B", x: 21, y: 16, links: ["startuphub-labs", "northgate-partners", "vertex-global"] },
  { id: "edufold", name: "EduFold", type: "Startups", location: "Jaipur", industry: "EdTech", note: "Vernacular adaptive learning · Pre-seed", x: 14, y: 9, links: ["mnit-innovation-hub", "samriddhi-fund"] },
  { id: "aquapure", name: "AquaPure", type: "Startups", location: "Kochi", industry: "ClimateTech", note: "Industrial water recycling · Seed", x: 19, y: 92, links: ["kerala-startup-mission", "nexus-angels", "meridian-labs"] },
  /* incubators */
  { id: "startuphub-labs", name: "StartupHub Labs", type: "Incubators", location: "Bengaluru", industry: "Multi-sector", note: "Flagship 16-week program", x: 29, y: 86 },
  { id: "cied-pune", name: "CIED Pune", type: "Incubators", location: "Pune", industry: "DeepTech", note: "Deep-tech & energy programs", x: 16, y: 53 },
  { id: "t-hub-health", name: "T-Hub Health", type: "Incubators", location: "Hyderabad", industry: "HealthTech", note: "Clinical pilot corridors", x: 34, y: 58 },
  { id: "mnit-innovation-hub", name: "MNIT Innovation Hub", type: "Incubators", location: "Jaipur", industry: "EdTech", note: "University-anchored incubation", x: 10, y: 13 },
  { id: "kerala-startup-mission", name: "Kerala Startup Mission", type: "Incubators", location: "Kochi", industry: "DeepTech", note: "Hardware-first public network", x: 24, y: 96 },
  { id: "ciie-space", name: "CIIE Space", type: "Incubators", location: "Chennai", industry: "Space", note: "Space & defence specialist", x: 45, y: 79 },
  /* investors */
  { id: "northgate-partners", name: "Northgate Partners", type: "Investors", location: "Bengaluru", industry: "AI", note: "Seed–A · ₹50L–5Cr", x: 33, y: 78 },
  { id: "nexus-angels", name: "Nexus Angels", type: "Investors", location: "Mumbai", industry: "Multi-sector", note: "First-cheque angel network", x: 3, y: 44 },
  { id: "vertex-global", name: "Vertex Global", type: "Investors", location: "Mumbai", industry: "HealthTech", note: "Growth stage · A/B rounds", x: 12, y: 42 },
  { id: "meridian-labs", name: "Meridian Labs (CVC)", type: "Investors", location: "Bengaluru", industry: "ClimateTech", note: "Corporate venture · strategic", x: 27, y: 73 },
  { id: "atlas-capital", name: "Atlas Capital", type: "Investors", location: "Bengaluru", industry: "DeepTech", note: "Deep-tech first cheques", x: 37, y: 84 },
  { id: "samriddhi-fund", name: "Samriddhi Fund", type: "Investors", location: "Delhi NCR", industry: "AgriTech", note: "Govt-backed inclusive fund", x: 26, y: 20 },
  /* mentors */
  { id: "priya-nair", name: "Priya Nair", type: "Mentors", location: "Mumbai", industry: "FinTech", note: "ex-CTO · 214 sessions", x: 5, y: 53 },
  { id: "vikram-rao", name: "Vikram Rao", type: "Mentors", location: "Bengaluru", industry: "Multi-sector", note: "Growth loops · 187 sessions", x: 21, y: 69 },
  { id: "meera-krishnan", name: "Dr. Meera Krishnan", type: "Mentors", location: "Chennai", industry: "DeepTech", note: "IPR attorney · 342 sessions", x: 43, y: 69 },
  { id: "arjun-bedekar", name: "Arjun Bedekar", type: "Mentors", location: "Pune", industry: "AI", note: "Exited founder · 156 sessions", x: 9, y: 60 },
  { id: "sunita-deshmukh", name: "Sunita Deshmukh", type: "Mentors", location: "Ahmedabad", industry: "DeepTech", note: "Enterprise sales · 98 sessions", x: 4, y: 31 },
  { id: "karan-chadha", name: "Karan Chadha", type: "Mentors", location: "Delhi NCR", industry: "EdTech", note: "ex-CPO · 143 sessions", x: 17, y: 21 },
  /* corporates */
  { id: "arvind-industries", name: "Arvind Industries", type: "Corporates", location: "Ahmedabad", industry: "DeepTech", note: "Innovation partner · 5 pilots", x: 8, y: 26 },
  { id: "nimbus-cloud", name: "Nimbus Cloud", type: "Corporates", location: "Bengaluru", industry: "AI", note: "Credits & GPU grants", x: 18, y: 76 },
  { id: "axis-retail", name: "Axis Retail Group", type: "Corporates", location: "Mumbai", industry: "Logistics", note: "Retail pilots program", x: 2, y: 37 },
  { id: "national-agri-mission", name: "National Agri Mission", type: "Corporates", location: "Delhi NCR", industry: "AgriTech", note: "Challenge sponsor", x: 30, y: 11 },
  { id: "skyport-logistics", name: "SkyPort Logistics", type: "Corporates", location: "Chennai", industry: "Logistics", note: "Port operations pilots", x: 36, y: 80 },
  /* universities */
  { id: "iisc-bengaluru", name: "IISc Bengaluru", type: "Universities", location: "Bengaluru", industry: "DeepTech", note: "Tech-transfer partner", x: 14, y: 84 },
  { id: "iit-madras", name: "IIT Madras RP", type: "Universities", location: "Chennai", industry: "Multi-sector", note: "Research park network", x: 48, y: 72 },
  { id: "mnit-jaipur", name: "MNIT Jaipur", type: "Universities", location: "Jaipur", industry: "EdTech", note: "Student founder pipeline", x: 19, y: 5 },
  { id: "iim-ahmedabad", name: "IIM Ahmedabad", type: "Universities", location: "Ahmedabad", industry: "FinTech", note: "Venture studio partner", x: 2, y: 22 },
  /* labs */
  { id: "cdac-pune", name: "C-DAC Pune", type: "Labs", location: "Pune", industry: "AI", note: "HPC & compute access", x: 20, y: 48 },
  { id: "csir-cecri", name: "CSIR-CECRI", type: "Labs", location: "Kochi", industry: "ClimateTech", note: "Electrochemistry testing", x: 13, y: 95 },
  { id: "narl", name: "NARL", type: "Labs", location: "Chennai", industry: "Space", note: "Atmospheric research data", x: 33, y: 85 },
  { id: "thub-health-lab", name: "T-Hub Health Lab", type: "Labs", location: "Hyderabad", industry: "HealthTech", note: "Clinical simulation", x: 38, y: 54 },
  /* resources */
  { id: "nimbus-credits", name: "Cloud Credits Pool", type: "Resources", location: "Bengaluru", industry: "AI", note: "$25K–40K credits", x: 10, y: 78 },
  { id: "sh-legal-desk", name: "SH Legal Desk", type: "Resources", location: "Mumbai", industry: "Multi-sector", note: "Founders' legal kit", x: 16, y: 36 },
  { id: "signalworks", name: "SignalWorks Analytics", type: "Resources", location: "Delhi NCR", industry: "AI", note: "1 yr free telemetry", x: 34, y: 17 },
  { id: "foundry-bench", name: "Foundry Hardware Bench", type: "Resources", location: "Pune", industry: "DeepTech", note: "Prototyping by the hour", x: 5, y: 62 },
];

/* which entities connect behind the map */
export const links: [string, string][] = entities.flatMap((e) =>
  (e.links ?? []).map((t) => [e.id, t] as [string, string])
);

export const typeStyles: Record<EcoType, { chip: string; dot: string; size: number }> = {
  Startups: { chip: "bg-accent text-white", dot: "bg-accent ring-2 ring-accent/30", size: 14 },
  Incubators: { chip: "bg-ink text-white", dot: "bg-ink ring-2 ring-ink/20", size: 12 },
  Investors: { chip: "bg-accent-soft text-accent", dot: "bg-accent/70 rotate-45 ring-2 ring-accent/20", size: 11 },
  Mentors: { chip: "bg-white text-ink ring-1 ring-line", dot: "bg-white border-2 border-accent", size: 11 },
  Corporates: { chip: "bg-ink/5 text-ink ring-1 ring-ink/10", dot: "bg-white border-2 border-ink/60", size: 12 },
  Universities: { chip: "bg-accent-mist text-accent", dot: "bg-accent-soft border-2 border-accent/50", size: 12 },
  Labs: { chip: "bg-slate-100 text-slate-600", dot: "bg-slate-400 ring-2 ring-slate-300", size: 10 },
  Resources: { chip: "bg-emerald-50 text-emerald-600", dot: "bg-emerald-400/80 ring-2 ring-emerald-200", size: 10 },
};
