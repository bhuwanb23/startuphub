export const COLLAB_REQUESTS = [
  { id: "r1", startup: "AgriSense AI", role: "Founding Frontend Engineer", scope: "Full-time · kickoff April", terms: "₹68L + 0.4%", since: "2d ago" },
  { id: "r2", startup: "Pestlens (Crestmont spin-off)", role: "API architecture review", scope: "4 sessions · March", terms: "₹1.2L fixed", since: "5d ago" },
  { id: "r3", startup: "Nexus Labs", role: "Demo-day technical judge", scope: "Apr 18 · half day", terms: "Honorarium", since: "1w ago" },
];

export const COLLABORATIONS = [
  { name: "Pestlens — Vision API", org: "Crestmont spin-off", kind: "Consulting", role: "Architecture advisor", progress: 62, next: "API contract review · tomorrow" },
  { name: "Open-source: fintech-ledger-kit", org: "1.8k stars", kind: "Open source", role: "Maintainer", progress: 90, next: "v2.1 release · Mar 25" },
  { name: "Nexus IoT innovation project", org: "Nexus Labs × 3 startups", kind: "Innovation project", role: "Technical mentor", progress: 45, next: "Mid-point demo · Apr 02" },
];

export type AppStatus = "Submitted" | "Under Review" | "Shortlisted" | "Interview" | "Offer" | "Rejected";

export type Application = {
  id: string;
  role: string;
  org: string;
  type: "Job" | "Project" | "Consulting" | "Freelance";
  applied: string;
  status: AppStatus;
  next: string;
};

export const APPLICATIONS: Application[] = [
  { id: "a1", role: "Founding Frontend Engineer", org: "AgriSense AI", type: "Job", applied: "Mar 08", status: "Interview", next: "System design · today 5 PM" },
  { id: "a2", role: "Payments Infrastructure Review", org: "Ledgerline", type: "Consulting", applied: "Mar 05", status: "Offer", next: "Respond by Mar 21" },
  { id: "a3", role: "Clinical NLP Pipeline", org: "MedSynapse", type: "Project", applied: "Mar 02", status: "Shortlisted", next: "Client call pending" },
  { id: "a4", role: "Staff Engineer — Risk", org: "KredKart", type: "Job", applied: "Feb 27", status: "Under Review", next: "Follow-up Mar 24" },
  { id: "a5", role: "Design-system migration", org: "Terraforma Corp", type: "Freelance", applied: "Mar 10", status: "Under Review", next: "Awaiting scope doc" },
  { id: "a6", role: "Fractional CTO", org: "RootStack", type: "Consulting", applied: "Feb 20", status: "Interview", next: "Intro call · Wed 3:30 PM" },
  { id: "a7", role: "Platform Engineer", org: "OrbitPay", type: "Job", applied: "Feb 12", status: "Rejected", next: "Feedback received" },
  { id: "a8", role: "AI Prototype Sprint", org: "Nexus Labs", type: "Freelance", applied: "Mar 11", status: "Submitted", next: "Review in ~3 days" },
];

export const APP_STATUS_TONE: Record<AppStatus, string> = {
  Submitted: "bg-slate-100 text-slate-600",
  "Under Review": "bg-sky-50 text-sky-700",
  Shortlisted: "bg-amber-50 text-amber-700",
  Interview: "bg-accent-soft text-accent-deep",
  Offer: "bg-emerald-50 text-emerald-700",
  Rejected: "bg-red-50 text-red-600",
};

export const INTERVIEWS = [
  {
    startup: "AgriSense AI", role: "Founding Frontend Engineer", round: "Round 3 · System design",
    time: "Today · 5:00–6:30 PM IST", mode: "Meet link", link: "meet.startuphub.app/zk-agri-3",
    focus: ["Design a field-offline dashboard sync", "Expect questions on geospatial tiling", "They value trade-off narration over diagrams"],
  },
  {
    startup: "RootStack", role: "Fractional CTO", round: "Intro call · Founders",
    time: "Wed · 3:30 PM IST", mode: "Meet link", link: "meet.startuphub.app/zk-root-1",
    focus: ["Founders are scientist-led — translate, don't jargon", "Discuss 2-day/wk operating model", "Bring the NexIoT mentor story"],
  },
];

export const INTERVIEW_HISTORY = [
  { startup: "MedSynapse", role: "Clinical NLP Pipeline", result: "Shortlisted — awaiting client", date: "Mar 09" },
  { startup: "OrbitPay", role: "Platform Engineer", result: "Rejected after R2 — strong feedback", date: "Feb 26" },
];

export const OFFERS = [
  {
    id: "of1", startup: "Ledgerline", role: "Consulting Architect — Payments", kind: "Consulting retainer",
    comp: "₹4.8L / month · 6-month retainer", expires: "Mar 21, 2026",
    scope: ["Quarterly architecture audit of treasury APIs", "Incident post-mortems on demand", "2 engineering-advance workshops / quarter"],
    terms: ["30-day termination notice both sides", "IP stays with Ledgerline", "Remote · 10 days/month expected"],
  },
  {
    id: "of2", startup: "Pestlens", role: "Architecture Advisor", kind: "Project",
    comp: "₹1.2L fixed · 4 sessions", expires: "Mar 26, 2026",
    scope: ["Vision API contract design", "Infra cost guardrails (<USD 400/mo)", "Two code-review loops"],
    terms: ["University TTO consent completed", "No IP assignment beyond session output", "Sessions scheduled by Mar 31"],
  },
];

export const PROJECTS = [
  { name: "Pestlens — Vision API hardening", client: "Pestlens (Crestmont spin-off)", role: "Architecture advisor", progress: 62, due: "Apr 04", deliverables: 4, team: "Zoya + 3 engineers" },
  { name: "fintech-ledger-kit v2.1", client: "Open source", role: "Maintainer", progress: 90, due: "Mar 25", deliverables: 2, team: "Zoya + 6 contributors" },
  { name: "Nexus IoT innovation project", client: "Nexus Labs", role: "Technical mentor", progress: 45, due: "May 15", deliverables: 5, team: "3 startup teams" },
];

export const DELIVERABLES = [
  { name: "API contract pack", project: "Pestlens", status: "In review", due: "Tomorrow" },
  { name: "v2.1 migration guide", project: "ledger-kit", status: "Submitted", due: "Mar 25" },
  { name: "Mid-point demo feedback", project: "Nexus IoT", status: "Approved", due: "Done" },
  { name: "Cost-guardrail runbook", project: "Pestlens", status: "Revision", due: "Mar 28" },
];

export const DELIVERABLE_TONE: Record<string, string> = {
  Submitted: "bg-sky-50 text-sky-700",
  "In review": "bg-amber-50 text-amber-700",
  Approved: "bg-emerald-50 text-emerald-700",
  Revision: "bg-red-50 text-red-600",
};

export type Task = { id: string; title: string; project: string; priority: "High" | "Medium" | "Low"; due: string };
export const TASK_COLUMNS: { key: "todo" | "doing" | "done"; label: string; tasks: Task[] }[] = [
  {
    key: "todo", label: "To do",
    tasks: [
      { id: "t1", title: "Draft API contract v2", project: "Pestlens", priority: "High", due: "Tomorrow" },
      { id: "t2", title: "Prep system design talk-track", project: "AgriSense interview", priority: "High", due: "Today 4 PM" },
      { id: "t3", title: "Review mid-point demo notes", project: "Nexus IoT", priority: "Medium", due: "Mar 30" },
      { id: "t4", title: "Renew AWS cert — exam slot", project: "Personal", priority: "Low", due: "Apr 30" },
    ],
  },
  {
    key: "doing", label: "In progress",
    tasks: [
      { id: "t5", title: "Ledger-kit v2.1 changelog", project: "ledger-kit", priority: "Medium", due: "Mar 24" },
      { id: "t6", title: "Cost-guardrail runbook (rev 2)", project: "Pestlens", priority: "High", due: "Mar 28" },
      { id: "t7", title: "Terraforma scope questions", project: "Application", priority: "Low", due: "Apr 02" },
    ],
  },
  {
    key: "done", label: "Done",
    tasks: [
      { id: "t8", title: "Mid-point demo feedback", project: "Nexus IoT", priority: "Medium", due: "Done" },
      { id: "t9", title: "Architecture audit Q1", project: "Advisory", priority: "Medium", due: "Done" },
      { id: "t10", title: "Ledgerline counter-offer sent", project: "Offer", priority: "High", due: "Done" },
    ],
  },
];

export const PRIORITY_TONE: Record<Task["priority"], string> = {
  High: "bg-red-50 text-red-600",
  Medium: "bg-amber-50 text-amber-700",
  Low: "bg-slate-100 text-slate-500",
};

export const RATING_BREAKDOWN = [
  { stars: 5, pct: 88 }, { stars: 4, pct: 9 }, { stars: 3, pct: 3 }, { stars: 2, pct: 0 }, { stars: 1, pct: 0 },
] as const;

export const REVIEWS = [
  {
    from: "Ananya Rao", org: "Canopy Analytics · Series A", rating: 5,
    text: "Zoya rebuilt our ingestion pipeline in six weeks. Calm under deadline, ruthlessly clear in writing. The architecture doc she left behind is still our onboarding reference.",
    strengths: ["Technical depth", "Documentation", "Ownership"],
  },
  {
    from: "Sana Merchant", org: "Nexus Labs · Program Director", rating: 5,
    text: "Mentored three of our Batch 06 teams through technical due diligence. Every founder asked for her by name for Batch 07.",
    strengths: ["Mentorship", "Communication", "Reliability"],
  },
  {
    from: "Kabir S", org: "RootStack · Co-founder", rating: 4.5,
    text: "Sharp, direct, and honest when our scope was fantasy. Would have liked more hours — but that's the deal with in-demand advisors.",
    strengths: ["Honesty", "Product judgment"],
  },
];

export const ACHIEVEMENTS = [
  { title: "Top Rated Plus — Engineering", detail: "StartupHub verified · 32 reviews", kind: "badge" },
  { title: "16 projects delivered", detail: "2 at-risk recoveries", kind: "work" },
  { title: "4 verified skills", detail: "Assessed by StartupHub", kind: "verified" },
  { title: "1.8k★ open-source maintainer", detail: "fintech-ledger-kit", kind: "oss" },
];
