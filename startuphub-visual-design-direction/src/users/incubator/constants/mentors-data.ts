/* StartupHub Labs — mentor datasets.
 *
 * One shared source for the four mentor screens (management, discovery,
 * assignments, tracking). The mentor records are the same people the
 * public directory lists in `src/views/explore/mentors/constants/mentors.ts`
 * — the incubator bench and the public catalogue must never disagree.
 */

/* ── Types ─────────────────────────────────────────────────────── */

export type Tone = "default" | "accent" | "good" | "warn" | "bad";

export type MentorRecord = {
  slug: string;
  name: string;
  initials: string;
  role: string;
  expertise: string[];
  industry: string;
  location: string;
  sessions: number;
  availability: string;
  openSlots: number;
  rating: number;
  /* The incubator's own relationship with this mentor. */
  assigned: string[];
  hours: number;
  target: number;
  engaged: boolean;
  tone: Tone;
};

export type BenchKpi = {
  label: string;
  value: string;
  note: string;
  tone: Tone;
};

export type ExpertiseGap = {
  expertise: string;
  covered: number;
  needed: number;
  mentors: string;
  tone: Tone;
};

export type Assignment = {
  id: string;
  mentorSlug: string;
  mentor: string;
  startup: string;
  startupSlug: string;
  since: string;
  focus: string;
  outcome: string;
  state: "Working" | "Needs review" | "New";
  tone: Tone;
};

export type OpenSlot = {
  startup: string;
  startupSlug: string;
  needs: string;
  shortlisted: number;
  note: string;
  tone: Tone;
};

export type NetworkMentor = {
  slug: string;
  name: string;
  initials: string;
  role: string;
  expertise: string[];
  industry: string;
  location: string;
  experience: string;
  availability: string;
  match: number;
  reason: string;
  alreadyEngaged: boolean;
  tone: Tone;
};

export type MatchDimension = {
  dim: string;
  score: number;
  weight: number;
  note: string;
};

export type MatchStep = {
  step: string;
  body: string;
};

export type SessionLog = {
  id: string;
  mentor: string;
  startup: string;
  topic: string;
  date: string;
  duration: string;
  rating: number;
  actions: number;
  closed: number;
  tone: Tone;
};

export type ActionItem = {
  id: string;
  text: string;
  owner: string;
  due: string;
  done: boolean;
};

export type FeedbackSignal = {
  signal: string;
  effect: string;
  when: string;
};

export type ImpactEntry = {
  startup: string;
  healthBefore: number;
  healthAfter: number;
  note: string;
};

/* ── The incubator's bench ─────────────────────────────────────── */

export const BENCH: MentorRecord[] = [
  {
    slug: "priya-nair",
    name: "Priya Nair",
    initials: "PN",
    role: "ex-CTO, ZetaPay",
    expertise: ["Architecture", "Scaling teams", "FinTech"],
    industry: "FinTech",
    location: "Mumbai",
    sessions: 214,
    availability: "2 slots / week",
    openSlots: 2,
    rating: 4.9,
    assigned: ["Lumen AI", "OrbitalWorks", "FreshChain", "EduFold", "SilkRoute AI"],
    hours: 38,
    target: 40,
    engaged: true,
    tone: "good",
  },
  {
    slug: "vikram-rao",
    name: "Vikram Rao",
    initials: "VR",
    role: "ex-VP Growth, FreshKart",
    expertise: ["Growth loops", "Retention", "Marketplaces"],
    industry: "Consumer",
    location: "Bengaluru",
    sessions: 187,
    availability: "1 slot / week",
    openSlots: 1,
    rating: 4.7,
    assigned: ["TerraGrid", "HealthLoop", "QuantumLeaf"],
    hours: 26,
    target: 40,
    engaged: true,
    tone: "warn",
  },
  {
    slug: "sunita-deshmukh",
    name: "Sunita Deshmukh",
    initials: "SD",
    role: "VP Innovation, Arvind Industries",
    expertise: ["Enterprise sales", "Pilots", "Corporate partnerships"],
    industry: "Manufacturing",
    location: "Ahmedabad",
    sessions: 98,
    availability: "1 slot / week",
    openSlots: 0,
    rating: 4.8,
    assigned: ["AquaPure", "MedSync"],
    hours: 41,
    target: 40,
    engaged: true,
    tone: "good",
  },
  {
    slug: "karan-chadha",
    name: "Karan Chadha",
    initials: "KC",
    role: "ex-CPO, LearnLoop",
    expertise: ["Product", "EdTech", "Consumer UX"],
    industry: "EdTech",
    location: "Delhi NCR",
    sessions: 143,
    availability: "Waitlist",
    openSlots: 0,
    rating: 4.8,
    assigned: ["FinEdge", "EduFold"],
    hours: 22,
    target: 40,
    engaged: true,
    tone: "bad",
  },
  {
    slug: "arjun-bedekar",
    name: "Arjun Bedekar",
    initials: "AB",
    role: "Founder, exited 2022",
    expertise: ["Zero-to-one", "Fundraising", "B2B SaaS"],
    industry: "SaaS",
    location: "Pune",
    sessions: 156,
    availability: "2 slots / week",
    openSlots: 2,
    rating: 4.9,
    assigned: ["GridSense", "SilkRoute AI"],
    hours: 34,
    target: 40,
    engaged: true,
    tone: "good",
  },
];

export const BENCH_KPIS: BenchKpi[] = [
  { label: "Mentors on bench", value: "5", note: "from a network of 2,800", tone: "accent" },
  { label: "Hours delivered", value: "161", note: "of 200 allowed", tone: "warn" },
  { label: "Average rating", value: "4.8", note: "across 41 sessions", tone: "good" },
  { label: "Startups covered", value: "13", note: "2 still unassigned", tone: "default" },
];

export const EXPERTISE_GAPS: ExpertiseGap[] = [
  { expertise: "Hardware & supply chain", covered: 1, needed: 2, mentors: "Vikram Rao", tone: "warn" },
  { expertise: "IP & licensing", covered: 0, needed: 2, mentors: "Dr. Meera Krishnan — available", tone: "bad" },
  { expertise: "Hospital partnerships", covered: 0, needed: 1, mentors: "Sunita Deshmukh — at capacity", tone: "bad" },
  { expertise: "Architecture & scaling", covered: 2, needed: 2, mentors: "Priya Nair, Nikhil Verma", tone: "good" },
  { expertise: "Fundraising & zero-to-one", covered: 1, needed: 1, mentors: "Arjun Bedekar", tone: "good" },
  { expertise: "Product & consumer UX", covered: 1, needed: 1, mentors: "Karan Chadha — waitlist", tone: "default" },
];

export const ASSIGNMENTS: Assignment[] = [
  { id: "as-1", mentorSlug: "sunita-deshmukh", mentor: "Sunita Deshmukh", startup: "AquaPure", startupSlug: "aquapure", since: "Jan 2026", focus: "Enterprise pilots and procurement", outcome: "2 enterprise intros → 2 pilots", state: "Working", tone: "good" },
  { id: "as-2", mentorSlug: "priya-nair", mentor: "Priya Nair", startup: "Lumen AI", startupSlug: "lumen-ai", since: "Oct 2025", focus: "Inference cost per acre", outcome: "GPU cost cut 33% since pairing", state: "Working", tone: "good" },
  { id: "as-3", mentorSlug: "vikram-rao", mentor: "Vikram Rao", startup: "FreshChain", startupSlug: "freshchain", since: "Feb 2026", focus: "Retention and distribution", outcome: "Engagement flagged — conflict mediation needed", state: "Needs review", tone: "warn" },
  { id: "as-4", mentorSlug: "karan-chadha", mentor: "Karan Chadha", startup: "FinEdge", startupSlug: "finedge", since: "Jan 2026", focus: "Vernacular onboarding", outcome: "Onboarding redesigned after 2 sessions", state: "Working", tone: "good" },
  { id: "as-5", mentorSlug: "priya-nair", mentor: "Priya Nair", startup: "OrbitalWorks", startupSlug: "orbitalworks", since: "Nov 2025", focus: "Ground station architecture", outcome: "Station build now self-owned, vendor dropped", state: "Working", tone: "good" },
  { id: "as-6", mentorSlug: "arjun-bedekar", mentor: "Arjun Bedekar", startup: "GridSense", startupSlug: "gridsense", since: "Dec 2025", focus: "Bridge round and B2B pricing", outcome: "Bridge term sheet still open", state: "Needs review", tone: "warn" },
  { id: "as-7", mentorSlug: "vikram-rao", mentor: "Vikram Rao", startup: "TerraGrid", startupSlug: "terragrid", since: "Mar 2026", focus: "Second supplier strategy", outcome: "Second source qualified", state: "New", tone: "accent" },
  { id: "as-8", mentorSlug: "sunita-deshmukh", mentor: "Sunita Deshmukh", startup: "MedSync", startupSlug: "medsync", since: "Apr 2026", focus: "Hospital procurement pathway", outcome: "Hospital #5 intro made", state: "New", tone: "accent" },
];

export const OPEN_SLOTS: OpenSlot[] = [
  { startup: "BloomBio", startupSlug: "bloombio", needs: "BioTech regulatory mentor", shortlisted: 3, note: "3 candidates shortlisted", tone: "warn" },
  { startup: "HealthLoop", startupSlug: "healthloop", needs: "Hospital partnership coach", shortlisted: 1, note: "Sunita at capacity — widen or reallocate", tone: "warn" },
  { startup: "QuantumLeaf", startupSlug: "quantumleaf", needs: "Hardware sourcing mentor", shortlisted: 2, note: "Pilot scope depends on a supply partner", tone: "default" },
];

export const NETWORK_MENTORS: NetworkMentor[] = [
  { slug: "dr-meera-krishnan", name: "Dr. Meera Krishnan", initials: "DM", role: "IPR Attorney & Strategist", expertise: ["Patents", "IP strategy", "Licensing"], industry: "Legal / IPR", location: "Chennai", experience: "19 yrs", availability: "Monthly office hours", match: 94, reason: "5 IP filings still outstanding before Cohort VI demo day", alreadyEngaged: false, tone: "good" },
  { slug: "nikhil-verma", name: "Nikhil Verma", initials: "NV", role: "ex-VP Engineering, QuickShip", expertise: ["Architecture", "Logistics", "Team building"], industry: "Logistics", location: "Hyderabad", experience: "15 yrs", availability: "2 slots / week", match: 91, reason: "Logistics depth matches SilkRoute's pilot route", alreadyEngaged: false, tone: "good" },
  { slug: "sara-dsouza", name: "Sara D'Souza", initials: "SD", role: "Founder, D2C brand (acquired 2021)", expertise: ["Brand", "Retention", "Unit economics"], industry: "D2C / Retail", location: "Mumbai", experience: "10 yrs", availability: "1 slot / week", match: 88, reason: "Built a ₹140 Cr D2C brand — unit economics depth", alreadyEngaged: false, tone: "accent" },
  { slug: "imran-sheikh", name: "Imran Sheikh", initials: "IS", role: "Growth & Performance Marketing Lead", expertise: ["Growth loops", "Paid acquisition", "Analytics"], industry: "D2C / Retail", location: "Hyderabad", experience: "9 yrs", availability: "2 slots / week", match: 84, reason: "FreshChain's distribution problem is a growth problem", alreadyEngaged: false, tone: "accent" },
  { slug: "lakshmi-iyer", name: "Lakshmi Iyer", initials: "LI", role: "Regulatory & Quality Lead", expertise: ["Quality systems", "Regulation", "Manufacturing"], industry: "Manufacturing", location: "Chennai", experience: "13 yrs", availability: "Monthly office hours", match: 86, reason: "BloomBio's regulatory pathway needs a quality lead", alreadyEngaged: false, tone: "good" },
  { slug: "priya-nair", name: "Priya Nair", initials: "PN", role: "ex-CTO, ZetaPay", expertise: ["Architecture", "Scaling teams", "FinTech"], industry: "FinTech", location: "Mumbai", experience: "16 yrs", availability: "2 slots / week", match: 82, reason: "Already on the bench — additional capacity available", alreadyEngaged: true, tone: "default" },
];

export const MATCH_DIMENSIONS: MatchDimension[] = [
  { dim: "Problem-stage fit", score: 96, weight: 30, note: "Has solved the exact problem before" },
  { dim: "Sector depth", score: 91, weight: 20, note: "IP and hardware operating experience" },
  { dim: "Challenge recency", score: 88, weight: 15, note: "Solved it within the last 3 years" },
  { dim: "Style compatibility", score: 84, weight: 15, note: "Direct, operator-first, no slides" },
  { dim: "Availability match", score: 79, weight: 12, note: "Monthly office hours vs a weekly need" },
  { dim: "Network leverage", score: 72, weight: 8, note: "Intros to our 5 target investor firms" },
];

export const MATCH_PIPELINE: MatchStep[] = [
  { step: "Read", body: "The programme's stated gaps, stage, sector and assessment findings" },
  { step: "Score", body: "Six weighted dimensions, 0–100 each" },
  { step: "Rank", body: "Top of the catalogue first; ties broken by open slots" },
  { step: "Introduce", body: "Warm intro request with a one-line problem" },
];

export const SESSION_LOG: SessionLog[] = [
  { id: "sess-1", mentor: "Priya Nair", startup: "Lumen AI", topic: "GPU cost optimization review", date: "Apr 02", duration: "48 min", rating: 5, actions: 4, closed: 4, tone: "good" },
  { id: "sess-2", mentor: "Priya Nair", startup: "Lumen AI", topic: "Series A tech diligence prep", date: "Mar 26", duration: "52 min", rating: 5, actions: 3, closed: 3, tone: "good" },
  { id: "sess-3", mentor: "Sunita Deshmukh", startup: "AquaPure", topic: "Procurement pathway — plant 3", date: "Mar 27", duration: "41 min", rating: 5, actions: 2, closed: 2, tone: "good" },
  { id: "sess-4", mentor: "Karan Chadha", startup: "FinEdge", topic: "Vernacular onboarding redesign", date: "Mar 25", duration: "55 min", rating: 4, actions: 3, closed: 2, tone: "warn" },
  { id: "sess-5", mentor: "Vikram Rao", startup: "FreshChain", topic: "Distribution conflict — mediation prep", date: "Mar 21", duration: "38 min", rating: 3, actions: 2, closed: 0, tone: "bad" },
  { id: "sess-6", mentor: "Arjun Bedekar", startup: "GridSense", topic: "Bridge round and B2B pricing", date: "Mar 19", duration: "46 min", rating: 4, actions: 3, closed: 1, tone: "warn" },
  { id: "sess-7", mentor: "Priya Nair", startup: "OrbitalWorks", topic: "Ground station architecture review", date: "Mar 18", duration: "50 min", rating: 5, actions: 2, closed: 2, tone: "good" },
  { id: "sess-8", mentor: "Karan Chadha", startup: "EduFold", topic: "School pilot success criteria", date: "Mar 14", duration: "44 min", rating: 5, actions: 2, closed: 2, tone: "good" },
];

export const ACTION_ITEMS: ActionItem[] = [
  { id: "ai-1", text: "Share inference cost-per-acre dashboard", owner: "Priya Nair", due: "Before Thu", done: false },
  { id: "ai-2", text: "Intro plant-3 procurement lead", owner: "Sunita Deshmukh", due: "This week", done: false },
  { id: "ai-3", text: "Redesign vernacular onboarding flow", owner: "Karan Chadha", due: "This week", done: true },
  { id: "ai-4", text: "Mediation notes — FreshChain", owner: "Meera Iyer", due: "Overdue", done: false },
  { id: "ai-5", text: "Send bridge term sheet draft", owner: "Arjun Bedekar", due: "This week", done: true },
  { id: "ai-6", text: "Confirm second supplier sample", owner: "Vikram Rao", due: "Done", done: true },
];

export const FEEDBACK_SIGNALS: FeedbackSignal[] = [
  { signal: "Intro accepted", effect: "+6 sector depth", when: "Dr. Meera Krishnan" },
  { signal: "Intro declined", effect: "+11 availability weight", when: "Imran Sheikh" },
  { signal: "Session rated 5/5", effect: "+4 style compatibility", when: "Priya Nair" },
  { signal: "Challenge tightened", effect: "+41 match quality", when: "This month" },
];

export const IMPACT: ImpactEntry[] = [
  { startup: "Lumen AI", healthBefore: 62, healthAfter: 84, note: "Cost and architecture unblocked a Series A" },
  { startup: "AquaPure", healthBefore: 58, healthAfter: 88, note: "Two signed pilots from enterprise intros" },
  { startup: "OrbitalWorks", healthBefore: 54, healthAfter: 81, note: "Self-owned ground station architecture" },
  { startup: "MedSync", healthBefore: 61, healthAfter: 82, note: "Hospital procurement pathway opened" },
  { startup: "EduFold", healthBefore: 52, healthAfter: 71, note: "School pilot criteria tightened" },
  { startup: "FreshChain", healthBefore: 66, healthAfter: 41, note: "Mediation in flight — no outcome yet" },
];
