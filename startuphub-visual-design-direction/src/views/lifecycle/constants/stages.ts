export type LifecycleStage = {
  n: string;
  name: string;
  tagline: string;
  desc: string;
  activities: string[];
  helps: string[];
  metric: { value: string; label: string };
};

export const lifecycleStages: LifecycleStage[] = [
  {
    n: "01", name: "Idea", tagline: "Every venture starts with a spark.",
    desc: "Capture the idea, shape it into something concrete and see instantly who else around you is circling the same problem.",
    activities: ["Idea capture & framing", "Problem-solution canvas", "Duplicate & whitespace check", "Founder profile setup"],
    helps: ["Structured idea workspace", "AI whitespace analysis", "Instant sector classification"],
    metric: { value: "38K+", label: "ideas captured" },
  },
  {
    n: "02", name: "Validation", tagline: "Pressure-test before you invest.",
    desc: "Replace gut feel with evidence. Structured experiments, customer interviews and demand signals — all scored and logged.",
    activities: ["Customer interview kits", "Landing-page experiments", "Demand signal tracking", "Validation score"],
    helps: ["Experiment templates", "Signal dashboards", "Mentor review loops"],
    metric: { value: "2.4×", label: "higher survival rate" },
  },
  {
    n: "03", name: "Incubation", tagline: "Structure, mentors, momentum.",
    desc: "Join a cohort matched to your sector and stage. Milestones, mentor hours and peer pressure that keeps you shipping.",
    activities: ["Cohort matching", "Milestone planning", "Weekly mentor sessions", "Peer reviews"],
    helps: ["450+ partner incubators", "Program tooling built-in", "Progress scoring"],
    metric: { value: "450+", label: "partner incubators" },
  },
  {
    n: "04", name: "IPR", tagline: "Protect what makes you different.",
    desc: "Patents, trademarks, designs — searched, filed and tracked before your first public pitch, not after your first lawsuit.",
    activities: ["Patentability search", "Filing & prosecution", "Trademark & design", "Portfolio tracking"],
    helps: ["72-hour search turnaround", "Fixed-fee packages", "Renewal automation"],
    metric: { value: "4.1K+", label: "filings managed" },
  },
  {
    n: "05", name: "Resources", tagline: "The right tool at the right time.",
    desc: "Cloud credits, legal templates, hiring pipelines, software perks — unlocked automatically as your stage advances.",
    activities: ["Credits & perks", "Template library", "Service marketplace", "Talent pool"],
    helps: ["$250K+ value per startup", "Vetted providers", "Stage-gated unlocking"],
    metric: { value: "$250K", label: "avg. credits unlocked" },
  },
  {
    n: "06", name: "MVP", tagline: "Ship the smallest thing that matters.",
    desc: "Scope ruthlessly, build fast, learn faster. Build sprints with senior review so your v1 isn't your last rewrite.",
    activities: ["Scope definition", "Build sprints", "Architecture review", "Beta programs"],
    helps: ["Sprint frameworks", "CTO-in-residence reviews", "Beta tester network"],
    metric: { value: "6 wks", label: "median time to MVP" },
  },
  {
    n: "07", name: "Market", tagline: "Find your first true believers.",
    desc: "Positioning, pricing and go-to-market — then real distribution through pilots, corporate partners and market programs.",
    activities: ["Positioning workshops", "Pricing strategy", "Pilot matching", "GTM playbooks"],
    helps: ["340+ corporate partners", "Pilot program fast-track", "Market signal data"],
    metric: { value: "1,900+", label: "pilots launched" },
  },
  {
    n: "08", name: "Funding", tagline: "Right capital, right stage.",
    desc: "Readiness scoring before you pitch, double-opt-in investor matching, and a deal room that makes diligence painless.",
    activities: ["Readiness assessment", "Investor matching", "Deal room & diligence", "Term negotiation support"],
    helps: ["AI deal matching", "Verified traction data", "Term-sheet benchmarks"],
    metric: { value: "₹1.2K Cr", label: "capital connected" },
  },
  {
    n: "09", name: "Growth", tagline: "Turn traction into rhythm.",
    desc: "Repeatable growth engines, honest metrics and the discipline to compound — instead of lurching from hack to hack.",
    activities: ["Growth experiments", "Funnel analytics", "Retention programs", "Channel expansion"],
    helps: ["Experiment tracking", "Benchmark cohorts", "Growth mentor pods"],
    metric: { value: "3.1×", label: "avg. revenue multiple" },
  },
  {
    n: "10", name: "Performance", tagline: "Numbers that tell the truth.",
    desc: "A single performance layer across product, revenue, team and capital — for you, and for everyone backing you.",
    activities: ["KPI dashboards", "Investor updates", "Team OKRs", "Health scoring"],
    helps: ["Auto-generated updates", "Anomaly alerts", "Stakeholder views"],
    metric: { value: "94%", label: "update compliance" },
  },
  {
    n: "11", name: "Scale", tagline: "From company to institution.",
    desc: "New markets, new entities, serious governance. The platform grows teeth as you grow headcount.",
    activities: ["Market expansion", "Entity & compliance", "Leadership hiring", "Governance"],
    helps: ["Cross-border playbooks", "Exec talent network", "Compliance automation"],
    metric: { value: "120+", label: "startups scaled abroad" },
  },
];

export const journey = [
  { when: "Month 0–1", stage: "Idea → Validation", text: "Capture the idea, run 20 customer interviews, kill two assumptions, keep one that matters." },
  { when: "Month 2–4", stage: "Incubation", text: "Join the Applied AI cohort at StartupHub Labs. Weekly mentor sessions, milestone plan approved." },
  { when: "Month 4", stage: "IPR", text: "Patentability search clears in 72 hours. Two provisional patents filed before the first public demo." },
  { when: "Month 5–7", stage: "Resources → MVP", text: "$40K in cloud credits unlocked. MVP ships in a 6-week sprint with architecture review." },
  { when: "Month 8–11", stage: "Market", text: "Two corporate pilots through the marketplace — a farm cooperative and a logistics operator." },
  { when: "Month 12–18", stage: "Funding → Growth", text: "Readiness score 78. Matched with 6 investors, closes ₹2.4 Cr Series A. Growth pod assigned." },
];

export const aiFeatures = [
  { title: "Stage detection", desc: "The platform reads your signals and knows which stage you're actually in — not which one you claim." },
  { title: "Next best action", desc: "Every week, one recommendation that moves you to the next stage. Not a dashboard of guilt." },
  { title: "Precision matching", desc: "Mentors, investors, pilots and programs matched on sector, stage, thesis and timing." },
  { title: "Outcome forecasting", desc: "See how startups like yours performed at this stage — and what separated the ones that made it." },
];
