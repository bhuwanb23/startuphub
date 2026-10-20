import {
  Briefcase,
  Building2,
  KeyRound,
  Rocket,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";

export type WorkspaceRole = {
  slug: string;
  name: string;
  desc: string;
  href: string;
  icon: LucideIcon;
};

export const WORKSPACE_ROLES: WorkspaceRole[] = [
  {
    slug: "founder",
    name: "Founder",
    desc: "Build, protect and scale your startup",
    href: "/founder",
    icon: Rocket,
  },
  {
    slug: "mentor",
    name: "Mentor",
    desc: "Guide founders with structure and signal",
    href: "/mentor",
    icon: Users,
  },
  {
    slug: "ipr-expert",
    name: "IPR Expert",
    desc: "Protect innovation across the network",
    href: "/ipr-expert",
    icon: ShieldCheck,
  },
  {
    slug: "incubator",
    name: "Incubator",
    desc: "Run cohorts with live milestones",
    href: "/incubator",
    icon: Building2,
  },
  {
    slug: "investor",
    name: "Investor",
    desc: "Dealflow with real context attached",
    href: "/investor",
    icon: Briefcase,
  },
  {
    slug: "admin",
    name: "Admin",
    desc: "Governance, operations and platform control",
    href: "/admin",
    icon: KeyRound,
  },
];
