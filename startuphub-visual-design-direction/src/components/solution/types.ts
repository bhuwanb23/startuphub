import type { LucideIcon } from "lucide-react";

export type Capability = { icon: LucideIcon; title: string; desc: string };
export type WorkflowStep = { n: string; title: string; desc: string };
export type Outcome = { to: number; decimals?: number; prefix?: string; suffix: string; label: string };

export type SolutionData = {
  slug: string;
  audience: string;
  icon: LucideIcon;
  title: string;
  lead: string;
  ticks: string[];
  panel: {
    title: string;
    rows: { icon: LucideIcon; label: string; value: string }[];
    stat: { value: string; label: string };
  };
  capabilitiesHeading: string;
  capabilities: Capability[];
  workflow: WorkflowStep[];
  outcomes: Outcome[];
  quote: { text: string; name: string; role: string };
  ctaLabel: string;
};
