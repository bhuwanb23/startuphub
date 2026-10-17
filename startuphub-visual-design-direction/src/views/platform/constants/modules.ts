import {
  BrainCircuit,
  Building2,
  FlaskConical,
  Gauge,
  HandCoins,
  Layers,
  Lightbulb,
  Rocket,
  ShieldCheck,
  Store,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

export type PlatformModule = {
  icon: LucideIcon;
  name: string;
  stage: string;
  desc: string;
  points: string[];
};

export const aiModule = {
  icon: BrainCircuit,
  name: "AI Intelligence",
  stage: "Runs through everything",
  desc: "Not a module — the nervous system. It reads signals from all ten modules and turns them into matches, scores and next-best-actions for every actor in the ecosystem.",
  points: ["Stage detection & readiness scoring", "Precision matching across the network", "Market & outcome forecasting", "Anomaly alerts and weekly recommendations"],
};

export const modules: PlatformModule[] = [
  {
    icon: Lightbulb,
    name: "Idea Management",
    stage: "Stage 01 · Idea",
    desc: "Capture, frame and evolve ideas with structure instead of sticky notes.",
    points: ["Structured idea workspace", "Whitespace & duplicate analysis", "Founder profile & intent"],
  },
  {
    icon: FlaskConical,
    name: "Product & Validation",
    stage: "Stages 02 · 06",
    desc: "Experiments, interviews and MVP sprints that replace opinion with evidence.",
    points: ["Experiment templates & scoring", "MVP sprint management", "Beta tester network"],
  },
  {
    icon: Building2,
    name: "Incubation",
    stage: "Stage 03 · Incubation",
    desc: "Cohorts, milestones and mentor operations for startups and the programs running them.",
    points: ["Cohort & milestone tooling", "Mentor hour tracking", "450+ partner programs"],
  },
  {
    icon: ShieldCheck,
    name: "IPR",
    stage: "Stage 04 · IPR",
    desc: "Patents, trademarks and designs — searched, filed and tracked from inside the journey.",
    points: ["72-hour patentability search", "Fixed-fee filing packages", "Portfolio & renewal tracking"],
  },
  {
    icon: Layers,
    name: "Resource Hub",
    stage: "Stage 05 · Resources",
    desc: "Credits, templates, tools and talent — unlocked automatically as your stage advances.",
    points: ["$250K+ in credits & perks", "Legal, finance & hiring kits", "Vetted service marketplace"],
  },
  {
    icon: TrendingUp,
    name: "Market Intelligence",
    stage: "Stage 07 · Market",
    desc: "Sector data, funding flows and IP trends — the same intelligence institutions use.",
    points: ["Live sector dashboards", "Funding & IP activity tracking", "Pilot & GTM matching"],
  },
  {
    icon: HandCoins,
    name: "Funding",
    stage: "Stage 08 · Funding",
    desc: "Readiness scoring, double-opt-in investor matching and a deal room built for speed.",
    points: ["Investor readiness score", "AI deal matching", "Structured deal room"],
  },
  {
    icon: Rocket,
    name: "Growth",
    stage: "Stage 09 · Growth",
    desc: "Experiment discipline and honest metrics that turn traction into compounding growth.",
    points: ["Growth experiment tracking", "Benchmark cohorts", "Retention programs"],
  },
  {
    icon: Gauge,
    name: "Performance",
    stage: "Stage 10 · Performance",
    desc: "One performance layer across product, revenue, team and capital — for every stakeholder.",
    points: ["Unified KPI dashboards", "Auto investor updates", "Health & anomaly scoring"],
  },
  {
    icon: Store,
    name: "Ecosystem Marketplace",
    stage: "All stages",
    desc: "The exchange layer: startups, mentors, corporates, grants and services — matched both ways.",
    points: ["Pilot & challenge listings", "Grant & opportunity feed", "Two-sided matching"],
  },
];
