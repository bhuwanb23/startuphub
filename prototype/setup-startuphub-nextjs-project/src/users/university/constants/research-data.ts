export type ProjectStatus = "Proposed" | "Active" | "Completed";

export type Project = {
  id: string;
  title: string;
  pi: string;
  dept: string;
  status: ProjectStatus;
  budget: string;
  spent: number; // pct
  endDate: string;
  deliverables: number;
  ip: boolean;
  agency: string;
};

export const PROJECTS: Project[] = [
  { id: "p1", title: "Edge-AI pest detection for smallholder farms", pi: "Dr. Vikram Acharya", dept: "Computer Science", status: "Active", budget: "₹48L", spent: 64, endDate: "Dec 2026", deliverables: 5, ip: true, agency: "National Agri Mission" },
  { id: "p2", title: "Solid-state electrolyte for fast-charging cells", pi: "Dr. Imran Sheikh", dept: "Materials Science", status: "Active", budget: "₹1.2 Cr", spent: 41, endDate: "Aug 2027", deliverables: 8, ip: true, agency: "DST Energy Program" },
  { id: "p3", title: "Arsenic biosensor — field validation cohort", pi: "Dr. Lena Mathew", dept: "Biotechnology", status: "Active", budget: "₹36L", spent: 82, endDate: "Jun 2026", deliverables: 4, ip: true, agency: "DBT Innovation Grant" },
  { id: "p4", title: "Federated learning for clinical diagnostics", pi: "Dr. Priya Kulkarni", dept: "Computer Science", status: "Proposed", budget: "₹52L", spent: 0, endDate: "Mar 2028", deliverables: 6, ip: false, agency: "MeitY Applied AI" },
  { id: "p5", title: "Membrane distillation for brine recovery", pi: "Dr. Grace D'Souza", dept: "Agri & Env Science", status: "Completed", budget: "₹64L", spent: 100, endDate: "Nov 2025", deliverables: 7, ip: true, agency: "Ministry of Jal Shakti" },
  { id: "p6", title: "Bidirectional EV charging topology study", pi: "Dr. Harish Naidu", dept: "Electrical Eng", status: "Completed", budget: "₹28L", spent: 100, endDate: "Sep 2025", deliverables: 3, ip: true, agency: "Industry · VoltEdge Energy" },
];

export const STATUS_TONE: Record<ProjectStatus, string> = {
  Proposed: "bg-slate-100 text-slate-600",
  Active: "bg-accent-soft text-accent-deep",
  Completed: "bg-emerald-50 text-emerald-700",
};

export const FUNDING_STATS = [
  { label: "Total research funding", value: "₹86 Cr", delta: "+18%", hint: "YoY" },
  { label: "Awarded this FY", value: "₹24.6 Cr", delta: "+₹4.2 Cr" },
  { label: "Grant success rate", value: "38%", delta: "+4 pts" },
  { label: "Fund utilization", value: "71%", delta: "+5 pts" },
];

export type Grant = {
  name: string;
  agency: string;
  amount: string;
  deadline: string;
  fit: number;
};

export const GRANT_OPPORTUNITIES: Grant[] = [
  { name: "National Deep-Tech Research Mission", agency: "DST, Govt. of India", amount: "₹25L – ₹1 Cr", deadline: "Apr 30, 2026", fit: 94 },
  { name: "Horizon Europe — Climate Materials Call", agency: "European Commission", amount: "€250K – €1.2M", deadline: "May 12, 2026", fit: 81 },
  { name: "Industry Consortium: Water Reuse", agency: "AquaPure-led consortium", amount: "₹40L sponsored", deadline: "Apr 08, 2026", fit: 88 },
  { name: "BioCARe Women Innovators Grant", agency: "DBT / BIRAC", amount: "₹10L – ₹50L", deadline: "Jun 01, 2026", fit: 76 },
];

export type Awarded = {
  grant: string;
  agency: string;
  amount: string;
  project: string;
  utilization: number; // pct
};

export const AWARDED_FUNDING: Awarded[] = [
  { grant: "Edge-AI for Agriculture — Phase II", agency: "National Agri Mission", amount: "₹48L", project: "Pest detection model", utilization: 64 },
  { grant: "DST Energy Materials Program", agency: "DST", amount: "₹1.2 Cr", project: "Solid-state electrolyte", utilization: 41 },
  { grant: "DBT Innovation Grant", agency: "BIRAC", amount: "₹36L", project: "Arsenic biosensor", utilization: 82 },
  { grant: "Sponsored Research — VoltEdge", agency: "VoltEdge Energy", amount: "₹28L", project: "EV charging topology", utilization: 100 },
];

export const FUNDING_DEADLINES = [
  { grant: "Industry Consortium: Water Reuse", due: "Apr 08" },
  { grant: "National Deep-Tech Mission", due: "Apr 30" },
  { grant: "Horizon Europe Materials", due: "May 12" },
];
