import {
  Banknote,
  Building2,
  GraduationCap,
  Landmark,
  Layers,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";

export type EcosystemPillar = {
  id: string;
  label: string;
  icon: LucideIcon;
  x: number;
  y: number;
  blurb: string;
  brings: string[];
  metric: { value: string; label: string };
  cta: string;
};

export const ECOSYSTEM_PILLARS: EcosystemPillar[] = [
  {
    id: "mentor", label: "Mentors", icon: Users, x: 14, y: 28,
    blurb: "Operators who have done it before — matched to your sector, stage and current bottleneck.",
    brings: ["1:1 milestone reviews", "Sector playbooks", "Warm introductions"],
    metric: { value: "2,800+", label: "mentors, averaging 11 yrs operating experience" },
    cta: "Browse mentors",
  },
  {
    id: "investor", label: "Investors", icon: Banknote, x: 86, y: 28,
    blurb: "Capital matched to your stage and signal — from first cheque angels to Series B funds.",
    brings: ["Signal-based matching", "Sector-aligned funds", "Term-sheet support"],
    metric: { value: "₹1,200 Cr+", label: "in capital connected through the hub" },
    cta: "Meet investors",
  },
  {
    id: "government", label: "Government", icon: Landmark, x: 50, y: 8,
    blurb: "Policy, grants and regulatory sandboxes — indexed and translated into plain next steps.",
    brings: ["Grant pathways", "Regulatory sandboxes", "State startup missions"],
    metric: { value: "40+", label: "active schemes indexed and tracked" },
    cta: "Explore schemes",
  },
  {
    id: "ipr", label: "IPR Cells", icon: ShieldCheck, x: 9, y: 63,
    blurb: "Defensibility from day one — embedded IP cells that move at startup speed.",
    brings: ["Patent drafting", "Filing fast-track", "Portfolio strategy"],
    metric: { value: "1,900+", label: "filings supported across the network" },
    cta: "Protect your IP",
  },
  {
    id: "corporate", label: "Corporates", icon: Building2, x: 91, y: 63,
    blurb: "Pilots that become contracts. Enterprises come here to find their next capability.",
    brings: ["Enterprise pilots", "Procurement access", "Co-innovation programs"],
    metric: { value: "300+", label: "corporate partners running pilots" },
    cta: "Start a pilot",
  },
  {
    id: "university", label: "Universities", icon: GraduationCap, x: 27, y: 92,
    blurb: "Research that becomes product — labs, tech transfer and talent pipelines on tap.",
    brings: ["Tech transfer offices", "Lab & equipment access", "Student talent pipelines"],
    metric: { value: "85", label: "partner institutions across 12 states" },
    cta: "Find a lab",
  },
  {
    id: "resources", label: "Resources", icon: Layers, x: 73, y: 92,
    blurb: "Everything a build requires — credits, templates and tooling, negotiated at ecosystem scale.",
    brings: ["Cloud & infra credits", "Legal templates", "Tooling bundles"],
    metric: { value: "$8M+", label: "in partner credits available to members" },
    cta: "Claim resources",
  },
];
