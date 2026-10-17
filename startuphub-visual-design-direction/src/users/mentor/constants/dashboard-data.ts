import {
  CalendarClock,
  FileCheck2,
  Rocket,
  Star,
  Timer,
} from "lucide-react";

export const mentorKpis = [
  { icon: Rocket, label: "Active startups", value: "4", delta: "1 new this month", tone: "good" as const },
  { icon: CalendarClock, label: "Sessions this month", value: "9", delta: "2 today", tone: "default" as const },
  { icon: Timer, label: "Hours given (April)", value: "21 h", delta: "Target 24 h", tone: "default" as const },
  { icon: Star, label: "Impact rating", value: "4.9", delta: "Top 5% of network", tone: "good" as const },
];

export const todaysSessions = [
  { startup: "Lumen AI", topic: "GPU cost optimization review", time: "16:00 – 17:00", mode: "Video", founder: "Ravi Sharma", prep: "Cost-per-acre dashboard attached" },
  { startup: "OrbitalWorks", topic: "Ground-segment architecture review", time: "18:30 – 19:30", mode: "Video", founder: "Daniel Mathew", prep: "Telemetry mesh docs to skim" },
];

export const pendingRequests = [
  { startup: "FinEdge", founder: "Kabir Malhotra", ask: "Credit-scoring infra sanity check + hiring first ML lead", match: 88, age: "2 days" },
  { startup: "MedData Labs", founder: "Ishita Verma", ask: "HL7 integration architecture — hospital integrations", match: 76, age: "4 days" },
  { startup: "QuantumLeaf", founder: "Rohan Verma", ask: "Milestone drift — needs operating cadence coach", match: 71, age: "6 days" },
];

export const overdueActions = [
  { what: "Lumen AI — review cost-per-acre dashboard", why: "Needed for Thursday's session", days: 2 },
  { what: "OrbitalWorks — comment on mesh protocol doc", why: "Blocking their internal design review", days: 1 },
];

export const startupPulse = [
  { name: "Lumen AI", health: 84, focus: "Inference cost per acre", progress: 78, tone: "good" as const },
  { name: "OrbitalWorks", health: 81, focus: "Ground station reliability", progress: 74, tone: "good" as const },
  { name: "GridSense", health: 44, focus: "Runway + investor narrative", progress: 41, tone: "bad" as const },
  { name: "BloomBio", health: 62, focus: "Assay validation pipeline", progress: 58, tone: "warn" as const },
];

export const mentorImpact = [
  ["Startups mentored", "31"],
  ["Sessions completed", "214"],
  ["Hours given", "96"],
  ["Capital influenced", "₹9.2 Cr"],
];

export const mentorRecommendations = [
  { action: "Take FinEdge this week", why: "88% match and a 2-day ask age — credit infra is exactly your domain.", impact: "High" },
  { action: "Re-baseline GridSense roadmap", why: "Third slipping milestone — scope is the disease, not execution.", impact: "High" },
  { action: "Book BloomBio with Sunita jointly", why: "Their next barrier is enterprise sales, not your lane — pair the fix.", impact: "Medium" },
];

export const mentorActivity = [
  { icon: FileCheck2, text: "Marked Lumen AI milestone 10 complete", when: "2h ago" },
  { icon: Rocket, text: "Accepted BloomBio mentorship request", when: "1d ago" },
  { icon: CalendarClock, text: "Session with OrbitalWorks — mesh protocol deep-dive", when: "2d ago" },
  { icon: Star, text: "Rated 5.0 by Daniel (OrbitalWorks)", when: "2d ago" },
];
