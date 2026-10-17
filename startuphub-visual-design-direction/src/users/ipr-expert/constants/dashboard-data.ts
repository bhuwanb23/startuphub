import {
  AlertTriangle,
  BarChart3,
  Briefcase,
  CalendarClock,
  FileCheck2,
  Handshake,
  Scale,
  Search,
} from "lucide-react";

export const iprKpis = [
  { icon: Briefcase, label: "Active clients", value: "18", delta: "3 new this month", tone: "good" as const },
  { icon: Scale, label: "Assets under management", value: "412", delta: "+31 in Q1", tone: "default" as const },
  { icon: FileCheck2, label: "Filings in progress", value: "27", delta: "6 need action", tone: "warn" as const },
  { icon: BarChart3, label: "Portfolio value (est.)", value: "₹18.6 Cr", delta: "+12% YoY", tone: "good" as const },
];

export const portfolioMix = [
  { type: "Patents", count: 186, pct: 100, tone: "accent" as const },
  { type: "Trademarks", count: 121, pct: 65, tone: "accent" as const },
  { type: "Copyrights", count: 68, pct: 37, tone: "default" as const },
  { type: "Designs", count: 24, pct: 13, tone: "default" as const },
  { type: "Trade secrets", count: 13, pct: 7, tone: "default" as const },
];

export const activeClients = [
  { name: "Lumen AI", assets: 3, open: "Patent claims v3 review", deadline: "Apr 09", health: 82 },
  { name: "OrbitalWorks", assets: 3, open: "Mesh protocol — complete spec", deadline: "May 20", health: 91 },
  { name: "MedSync", assets: 2, open: "Trademark class 9 filing", deadline: "Apr 14", health: 68 },
  { name: "AquaPure", assets: 2, open: "Design registration", deadline: "Apr 18", health: 74 },
  { name: "TerraGrid", assets: 1, open: "FER response drafting", deadline: "Jun 02", health: 88 },
  { name: "BloomBio", assets: 0, open: "IP strategy onboarding", deadline: "Apr 16", health: 40 },
];

export const pendingAssessments = [
  { client: "BloomBio", ask: "Full IP assessment — what's protectable in our assay pipeline?", type: "IP Assessment", age: "1 day" },
  { client: "FinEdge", ask: "Patentability of cash-flow entropy credit scoring", type: "Patentability", age: "3 days" },
  { client: "MedData Labs", ask: "Prior-art search — HL7 record exchange method", type: "Prior-Art", age: "4 days" },
  { client: "QuantumLeaf", ask: "Freedom-to-operate opinion on phenotyping rig", type: "FTO Opinion", age: "5 days" },
];

export const patentPipeline = [
  { stage: "Drafting", count: 6 },
  { stage: "Filed", count: 9 },
  { stage: "Published", count: 5 },
  { stage: "FER", count: 4 },
  { stage: "Granted", count: 3 },
];

export const deadlines = [
  { client: "Lumen AI", matter: "Complete-spec claims v3", due: "Apr 09", days: 2, severity: "Critical" },
  { client: "MedSync", matter: "Trademark class 9 filing", due: "Apr 14", days: 7, severity: "High" },
  { client: "AquaPure", matter: "Design registration response", due: "Apr 18", days: 11, severity: "Medium" },
  { client: "OrbitalWorks", matter: "PCT national-phase entry (US)", due: "Apr 22", days: 15, severity: "High" },
  { client: "TerraGrid", matter: "FER response", due: "Jun 02", days: 56, severity: "Low" },
];

export const renewalAlerts = [
  { client: "Lumen AI", mark: "“Lumen AI” wordmark", renewal: "2034", note: "Auto-renewal active" },
  { client: "MedSync", mark: "“MedSync” wordmark", renewal: "2027", note: "10-yr window — 14 months out" },
  { client: "Skyline Logistics", mark: "“Skyline” logo + word", renewal: "2026", note: "Due Nov 2026 — budget now" },
];

export const ipRisks = [
  { client: "Lumen AI", risk: "Launching “Field Alert” unfiled", severity: "Critical", mitigation: "File this week — ₹9K fixed fee" },
  { client: "MedSync", risk: "Contractor IP assignment ×2 missing", severity: "High", mitigation: "Assignment docs sent for signature" },
  { client: "BloomBio", risk: "No IP strategy at onboarding", severity: "High", mitigation: "Assessment booked Apr 16" },
  { client: "TerraGrid", risk: "Prior-art overlap in JP literature", severity: "Medium", mitigation: "Claims narrowed; FER response drafted" },
];

export const licensingActivity = [
  { client: "OrbitalWorks", deal: "GroundEdge Stream — data licensing", value: "₹42L / yr", stage: "Negotiation" },
  { client: "MedSync", deal: "Consent Mesh API — hospital site license", value: "₹18L / yr", stage: "Signed" },
  { client: "Lumen AI", deal: "Vision model — agri-coop licensing", value: "₹64L / yr", stage: "Term sheet" },
];

export const iprActivity = [
  { icon: FileCheck2, text: "Filed AquaPure design registration", when: "2h ago" },
  { icon: Search, text: "Prior-art search delivered — MedData Labs", when: "6h ago" },
  { icon: Handshake, text: "OrbitalWorks licensing term sheet issued", when: "1d ago" },
  { icon: AlertTriangle, text: "Flagged Lumen AI trademark gap at launch", when: "1d ago" },
  { icon: CalendarClock, text: "BloomBio IP assessment booked Apr 16", when: "2d ago" },
];

export const quickActions = [
  ["Add client", "/ipr-expert/clients"],
  ["Assess IP", "/ipr-expert/intelligence/assessment"],
  ["Prior-art search", "/ipr-expert/intelligence/prior-art"],
  ["Create filing", "/ipr-expert/filings"],
  ["Open case", "/ipr-expert/filings/cases"],
  ["Add IP asset", "/ipr-expert/ip/portfolio"],
  ["Schedule consult", "/ipr-expert/filings#consult"],
];
