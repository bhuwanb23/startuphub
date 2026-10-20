import type { LucideIcon } from "lucide-react";

export type Capability = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

export type WorkflowStep = {
  title: string;
  desc: string;
};

export type Outcome = {
  value: string;
  label: string;
  desc?: string;
};

export type SolutionPanelRow = {
  icon: LucideIcon;
  title: string;
  sub: string;
};

export type SolutionData = {
  slug: string;
  audience: string;
  icon: LucideIcon;
  title: string;
  lead: string;
  ticks: string[];
  panel: {
    title: string;
    rows: SolutionPanelRow[];
    stat: { value: string; label: string };
  };
  capabilitiesHeading: string;
  capabilities: Capability[];
  workflow: WorkflowStep[];
  outcomes: Outcome[];
  quote: { text: string; name: string; role: string };
  ctaLabel: string;
};
