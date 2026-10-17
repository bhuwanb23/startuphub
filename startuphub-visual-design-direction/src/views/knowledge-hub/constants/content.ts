export type Content = {
  id: string;
  type: "Article" | "Guide" | "Startup Playbook" | "IPR Guide" | "Funding Guide" | "Market Research" | "Case Study" | "Report";
  title: string;
  desc: string;
  meta: string;
  level: "Foundations" | "Intermediate" | "Advanced";
};

export const contentTypes = [
  "Article", "Guide", "Startup Playbook", "IPR Guide", "Funding Guide",
  "Market Research", "Case Study", "Report",
];

export const featuredGuides = [
  {
    type: "IPR Guide",
    title: "The Startup IP Playbook",
    desc: "From 'do we even have IP?' to a managed portfolio — the full journey with filing calendars, cost tables and real claim examples.",
    meta: "21 chapters · 3.5 hrs · Free",
    accent: true,
  },
  {
    type: "Funding Guide",
    title: "The Fundraising Field Guide",
    desc: "Pipeline math, readiness scoring, term-sheet anatomy and the 40 investor questions you must be able to answer cold.",
    meta: "14 chapters · 2.5 hrs · Free",
    accent: false,
  },
];

export const contents: Content[] = [
  { id: "c1", type: "Startup Playbook", title: "Validation in 21 Days", desc: "A day-by-day experiment schedule that ends with evidence, not vibes.", meta: "45 min · Playbook", level: "Foundations" },
  { id: "c2", type: "Guide", title: "Choosing Your Incubator", desc: "What actually differs between programs — and the 7 questions to ask before signing.", meta: "18 min · Guide", level: "Foundations" },
  { id: "c3", type: "IPR Guide", title: "Provisional vs Complete: The Timing Game", desc: "When the 12-month provisional window helps you — and when it quietly hurts.", meta: "22 min · IPR", level: "Intermediate" },
  { id: "c4", type: "Funding Guide", title: "Readiness Scoring, Demystified", desc: "Exactly how investors score you before the first meeting — and how to move your number.", meta: "26 min · Funding", level: "Intermediate" },
  { id: "c5", type: "Market Research", title: "Indian AgriTech: The 2026 Operating Map", desc: "Value chains, buyer maps and the five wedges that actually work in farm tech.", meta: "40 min · Research", level: "Advanced" },
  { id: "c6", type: "Article", title: "Why Your First Pilot Should Be Unpaid", desc: "The counterintuitive economics of reference customers.", meta: "9 min · Article", level: "Foundations" },
  { id: "c7", type: "Case Study", title: "How MedSync Landed 412 Clinics From One Pilot", desc: "The rollout playbook, procurement navigation and consent design behind it.", meta: "15 min · Case study", level: "Intermediate" },
  { id: "c8", type: "Article", title: "The Myth of the Generalist Mentor", desc: "Stage-match matters 4× more than fame. Data from 96K mentorship hours.", meta: "11 min · Article", level: "Foundations" },
  { id: "c9", type: "Report", title: "State of Indian Startups 2026", desc: "The flagship annual report — formation, funding, survival and IP trends.", meta: "84 pages · Report", level: "Advanced" },
  { id: "c10", type: "Startup Playbook", title: "The MVP Scope Knife", desc: "Cut your v1 to something shippable in 6 weeks without losing the point.", meta: "30 min · Playbook", level: "Intermediate" },
  { id: "c11", type: "Guide", title: "ESOPs Without Tears", desc: "Pools, vesting and cliffs explained for first-time founders and early employees.", meta: "24 min · Guide", level: "Intermediate" },
  { id: "c12", type: "Funding Guide", title: "Grant Stacking for Deep-Tech", desc: "Combine BIRAC, DST and state schemes without violating any terms.", meta: "20 min · Funding", level: "Advanced" },
];

export const templates = [
  { title: "Investor Pitch Deck", desc: "12-slide structure with real examples", kind: "Slides · 4.2MB" },
  { title: "Cap Table Starter", desc: "Founder-friendly, rounds-ready", kind: "Sheet · 240KB" },
  { title: "Financial Model (Seed)", desc: "Monthly burn to Series A story", kind: "Sheet · 1.8MB" },
  { title: "IPR Readiness Checklist", desc: "14 tasks before demo day", kind: "PDF · 380KB" },
];
