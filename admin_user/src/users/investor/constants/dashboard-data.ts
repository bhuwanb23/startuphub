import {
  Briefcase,
  Flame,
  Inbox,
  IndianRupee,
  type LucideIcon,
} from "lucide-react";

export type InvestorStat = {
  icon: LucideIcon;
  label: string;
  value: string;
  delta?: string;
  tone?: "up" | "down" | "flat";
  hint?: string;
};

export const INVESTOR_STATS: InvestorStat[] = [
  { icon: Inbox, label: "Active deals", value: "24", delta: "+6 this week", tone: "up" },
  { icon: Flame, label: "In deep dive", value: "7", hint: "2 reaching IC this week" },
  { icon: Briefcase, label: "Portfolio companies", value: "12", delta: "+2 this year", tone: "up" },
  { icon: IndianRupee, label: "Deployed FY26", value: "₹86 Cr", hint: "of ₹180 Cr fund" },
];

export type PipelineStage = { stage: string; count: number };

export const PIPELINE_STAGES: PipelineStage[] = [
  { stage: "Sourced", count: 42 },
  { stage: "Screened", count: 18 },
  { stage: "Deep dive", count: 7 },
  { stage: "IC review", count: 3 },
  { stage: "Term sheet", count: 2 },
];

export type DealMatch = {
  name: string;
  sector: string;
  stage: string;
  location: string;
  signal: number; // 0..100
  note: string;
};

export const NEW_MATCHES: DealMatch[] = [
  {
    name: "Vantara Robotics",
    sector: "AI · AgriRobotics",
    stage: "Series A",
    location: "Bengaluru",
    signal: 94,
    note: "Traction inflecting — 14,000 acres live, 2 corporate pilots",
  },
  {
    name: "GridSense",
    sector: "Climate · Energy",
    stage: "Seed",
    location: "Pune",
    signal: 88,
    note: "31% grid-loss reduction verified by third-party audit",
  },
  {
    name: "MediQueue",
    sector: "HealthTech",
    stage: "Seed",
    location: "Hyderabad",
    signal: 86,
    note: "120 hospitals live; revenue compounding 3.2× YoY",
  },
  {
    name: "FiberForge",
    sector: "DeepTech · Materials",
    stage: "Seed",
    location: "Chennai",
    signal: 81,
    note: "6 patents filed; strong IP moat scoring in IPR Studio",
  },
];

export type Holding = {
  name: string;
  metric: string;
  delta: string;
  tone: "up" | "down" | "flat";
};

export const PORTFOLIO_PULSE: Holding[] = [
  { name: "StackLedger", metric: "MRR $64K", delta: "+18% MoM", tone: "up" },
  { name: "VitalMesh", metric: "MRR $112K", delta: "+9% MoM", tone: "up" },
  { name: "AquaTrace", metric: "42t CO2e traced", delta: "steady", tone: "flat" },
  { name: "ThermalStack", metric: "Pilot backlog 6", delta: "-1 this month", tone: "down" },
];

export type Meeting = {
  who: string;
  org: string;
  when: string;
  kind: string;
};

export const UPCOMING_MEETINGS: Meeting[] = [
  { who: "Ananya Rao", org: "MediQueue", when: "Tue · 10:30", kind: "Deep dive" },
  { who: "Sara Mathew", org: "GridSense", when: "Wed · 15:00", kind: "IC prep" },
  { who: "Rohan Iyer", org: "FiberForge", when: "Fri · 11:15", kind: "First call" },
];
