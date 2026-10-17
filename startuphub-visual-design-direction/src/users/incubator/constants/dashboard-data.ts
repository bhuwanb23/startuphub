import {
  BadgeCheck,
  Building2,
  HandCoins,
  Layers,
  Rocket,
  ShieldAlert,
  Users,
} from "lucide-react";

export const incubKpis = [
  { icon: Rocket, label: "Total startups", value: "240", delta: "+38 this year", tone: "good" as const },
  { icon: Users, label: "Active cohorts", value: "3", delta: "Cohort VI graduating", tone: "default" as const },
  { icon: HandCoins, label: "Capital raised by portfolio", value: "₹186 Cr", delta: "+₹41 Cr in Q1", tone: "good" as const },
  { icon: ShieldAlert, label: "At-risk startups", value: "7", delta: "2 need intervention", tone: "warn" as const },
];

export const cohortPulse = [
  { name: "Cohort VI", startups: 14, health: 78, graduation: "Apr 28", status: "Graduation sprint" },
  { name: "Cohort VII", startups: 12, health: 71, graduation: "Aug 30", status: "Mid-program" },
  { name: "Sprint: AgriTech", startups: 8, health: 83, graduation: "Jun 15", status: "Milestone week" },
];

export const applications = [
  { stage: "New", count: 12 },
  { stage: "In review", count: 9 },
  { stage: "Shortlisted", count: 4 },
  { stage: "Offer out", count: 2 },
];

export const atRiskStartups = [
  { name: "FreshChain", risk: "Co-founder conflict", level: "High", owner: "Meera", action: "Mediation session Apr 09" },
  { name: "GridSense", risk: "Runway < 4 months", level: "High", owner: "Arjun", action: "Emergency bridge plan" },
  { name: "HealthLoop", risk: "Pilot stalled 6 weeks", level: "Medium", owner: "Rohan", action: "Hospital partner escalation" },
  { name: "QuantumLeaf", risk: "Milestone drift ×3", level: "Medium", owner: "Meera", action: "Scope re-baseline" },
];

export const upcomingMilestones = [
  { startup: "Lumen AI", milestone: "Cohort VI final demo", due: "Apr 28", pct: 86 },
  { startup: "TerraGrid", milestone: "3-operator pilot bundle", due: "Apr 20", pct: 64 },
  { startup: "AquaPure", milestone: "Unit 20 deployment", due: "Apr 15", pct: 91 },
  { startup: "FinEdge", milestone: "NBFC pilot #3 go-live", due: "Apr 30", pct: 42 },
];

export const mentorsActivity = [
  { mentor: "Priya Nair", startups: 4, hours: "21 h", note: "Top-ranked this quarter" },
  { mentor: "Vikram Rao", startups: 3, hours: "14 h", note: "Retention playbooks landing well" },
  { mentor: "Sunita Deshmukh", startups: 2, hours: "9 h", note: "Enterprise intros produced 2 pilots" },
];

export const resourceUtilization = [
  { resource: "GPU cluster", used: 78, note: "High demand from AI block" },
  { resource: "Wet lab benches", used: 46, note: "Underutilized — promote to bio startups" },
  { resource: "Legal sessions", used: 64, note: "3 unused slots this month" },
  { resource: "Cloud credits pool", used: 62, note: "On plan" },
];

export const fundingActivity = [
  { startup: "TerraGrid", event: "Seed closed — ₹2.1 Cr", when: "Mar 12" },
  { startup: "AquaPure", event: "Seed closed — ₹1.9 Cr", when: "Feb 26" },
  { startup: "FinEdge", event: "Pre-seed — ₹50L", when: "Feb 14" },
];

export const incubRecommendations = [
  { action: "Intervene with FreshChain this week", why: "Co-founder conflict historically costs 6+ weeks if it ages past 2 weeks.", impact: "High" },
  { action: "Push AquaPure's press moment", why: "Unit-20 deployment closes Apr 15 — strong PR + program credibility.", impact: "Medium" },
  { action: "Rebalance wet-lab access", why: "46% utilization while AI block is oversubscribed — convert one bench to GPU hours.", impact: "Medium" },
];

export const incubActivity = [
  { icon: Users, text: "Cohort VI demo-day speaker slots locked", when: "2h ago" },
  { icon: BadgeCheck, text: "4 applications moved to shortlisted", when: "5h ago" },
  { icon: HandCoins, text: "TerraGrid's seed closed — term sheet countersigned", when: "1d ago" },
  { icon: Layers, text: "NBFC pilot approved for FinEdge", when: "1d ago" },
  { icon: Building2, text: "IPR Desk filed AquaPure trademark", when: "2d ago" },
];

export const incubOutcomes = [
  { k: "Startup survival", v: "84%" },
  { k: "Funding per startup (avg)", v: "₹77L" },
  { k: "Jobs created", v: "1,840" },
  { k: "Patents filed", v: "212" },
];
