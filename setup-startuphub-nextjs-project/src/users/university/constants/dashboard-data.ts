import {
  Award,
  BookOpen,
  Building2,
  FileBadge,
  FlaskConical,
  Handshake,
  Landmark,
  LayoutGrid,
  Microscope,
  Plus,
  Rocket,
  Share2,
  ShieldCheck,
  UserPlus,
  Users,
} from "lucide-react";

/* Dashboard overview — the twelve institutional vitals. */
export const UNI_STATS = [
  { label: "Active Research Projects", value: "84", delta: "+9", hint: "this quarter", icon: FlaskConical },
  { label: "Researchers", value: "320", hint: "across 14 departments", icon: Users },
  { label: "Publications", value: "1,240", delta: "+86", hint: "this year", icon: BookOpen },
  { label: "Technologies Developed", value: "96", hint: "34 showcase-ready", icon: LayoutGrid },
  { label: "Patents Filed", value: "148", delta: "+12", hint: "this FY", icon: FileBadge },
  { label: "Patents Granted", value: "62", delta: "+7", icon: ShieldCheck },
  { label: "Licensing Opportunities", value: "18", hint: "5 in negotiation", icon: Handshake },
  { label: "Active Spin-offs", value: "26", delta: "+4", hint: "this year", icon: Rocket },
  { label: "Industry Collaborations", value: "41", hint: "9 signed this quarter", icon: Building2 },
  { label: "Research Funding", value: "₹86 Cr", delta: "+18%", hint: "YoY", icon: Landmark },
  { label: "Available Labs", value: "22", hint: "7 open for external booking", icon: Microscope },
  { label: "Resource Utilization", value: "71%", delta: "+5 pts", icon: Award },
];

/* Intelligence rail — what needs the TTO's attention. */
export const READY_TECHNOLOGIES = [
  { name: "Low-cost arsenic biosensor", trl: "TRL 7", interest: "3 industry enquiries" },
  { name: "Edge-AI pest detection model", trl: "TRL 6", interest: "2 startup matches" },
  { name: "Solid-state battery electrolyte", trl: "TRL 5", interest: "1 corporate RFI" },
];

export const IP_DEADLINES = [
  { matter: "IN2024110 — complete specification", due: "In 6 days" },
  { matter: "IN2023078 — renewal fee window", due: "In 19 days" },
];

export const QUICK_ACTIONS = [
  { label: "Add Research Project", icon: Plus, href: "/university/research" },
  { label: "Register Technology", icon: LayoutGrid, href: "/university/commercialization/showcase" },
  { label: "Add Researcher", icon: UserPlus, href: "/university/people" },
  { label: "Submit Patent", icon: FileBadge, href: "/university/ip" },
  { label: "Publish Technology", icon: Share2, href: "/university/commercialization/showcase" },
  { label: "Create Licensing Opportunity", icon: Handshake, href: "/university/ip/licensing" },
  { label: "Register Spin-off", icon: Rocket, href: "/university/commercialization" },
  { label: "Share Lab Resource", icon: Microscope, href: "/university/infrastructure" },
];

export const RESEARCH_PIPELINE = [
  { stage: "Proposed", count: 12, pct: 18 },
  { stage: "Active", count: 84, pct: 62 },
  { stage: "Completed", count: 210, pct: 100 },
] as const;

export const RECENT_TRANSFERS = [
  { tech: "Membrane distillation unit", partner: "AquaPure Industries", value: "₹48L license", date: "Mar 04, 2026" },
  { tech: "Soil micro-biome kit", partner: "RootStack (spin-off)", value: "Equity 8%", date: "Feb 21, 2026" },
  { tech: "Thermal imaging algorithm", partner: "VoltEdge Energy", value: "₹22L + royalty", date: "Feb 02, 2026" },
];
