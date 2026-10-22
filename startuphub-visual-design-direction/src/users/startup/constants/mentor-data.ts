/* ──────────────────────────────────────────────────────────────
   Mentor workspace data.

   Shared by the three founder mentor screens — Discover, Matching
   and Sessions — so a number a founder reads on one screen never
   drifts from the next.

   Deliberately consistent with the incubation workspace: the hours
   logged here sum to the 40 of 50 programme hours reported on
   /founder/incubation/workspace. A test asserts that invariant.

   Tone values map onto the Badge component palette:
   default | accent | good | warn | bad
   ────────────────────────────────────────────────────────────── */

export type Tone = "default" | "accent" | "good" | "warn" | "bad";

/* ── Discover ──────────────────────────────────────────────── */

/* Fit is computed against the founder's stated challenge (inference
   cost at scale), sector (AgriTech · Applied AI) and the weakest
   dimension from the startup assessment (IP & Legal). */
export const matchScoreBySlug: Record<string, number> = {
  "priya-nair": 96,
  "dr-meera-krishnan": 91,
  "karan-chadha": 88,
  "sunita-deshmukh": 84,
  "arjun-bedekar": 81,
  "lakshmi-iyer": 79,
  "imran-sheikh": 74,
  "nikhil-verma": 71,
  "vikram-rao": 72,
  "sara-dsouza": 66,
};

export const matchReasonBySlug: Record<string, string> = {
  "priya-nair": "Your active CTO advisor — owns the inference cost-per-acre work",
  "dr-meera-krishnan":
    "IP & Legal is your weakest assessment dimension; 900+ patents filed",
  "karan-chadha": "Product reviews for your FPO vernacular onboarding flow",
  "sunita-deshmukh": "Enterprise procurement for the agribusiness CFO buyer",
  "arjun-bedekar": "Vertical SaaS pricing that maps to your per-acre model",
  "lakshmi-iyer": "Sourced from 900+ FPOs — knows your channel's harvest cycle",
  "imran-sheikh": "CAC discipline for FPO channel pilots, without vanity spend",
  "nikhil-verma": "Re-platform sequencing for infra that has to survive Series A",
  "vikram-rao": "Marketplace retention — secondary to your current challenge",
  "sara-dsouza": "D2C margin discipline — useful, but not your bottleneck",
};

export type Engagement = {
  slug: string;
  role: string;
  cadence: string;
  sessions: number;
  hours: number;
  focus: string;
  state: "Active" | "Onboarding" | "Waitlist" | "Closed";
  tone: Tone;
};

/* Hours sum to 40 — the figure the incubation workspace reports as
   used of the 50-hour programme allocation. */
export const engagements: Engagement[] = [
  {
    slug: "priya-nair",
    role: "CTO advisor · active engagement",
    cadence: "Weekly · Thursday 16:00",
    sessions: 14,
    hours: 21,
    focus: "Inference pipeline cost per acre. Target ₹4.5 → ₹3.0 by May.",
    state: "Active",
    tone: "good",
  },
  {
    slug: "karan-chadha",
    role: "Product advisor · FPO onboarding",
    cadence: "Fortnightly · Tuesday 11:00",
    sessions: 6,
    hours: 8,
    focus: "Vernacular onboarding funnel for field agents.",
    state: "Active",
    tone: "good",
  },
  {
    slug: "vikram-rao",
    role: "Growth advisor · retention review",
    cadence: "Monthly · Thursday 15:00",
    sessions: 3,
    hours: 5,
    focus: "FPO cohort retention after the first season.",
    state: "Active",
    tone: "good",
  },
  {
    slug: "sunita-deshmukh",
    role: "Enterprise sales · pilot procurement",
    cadence: "On demand",
    sessions: 2,
    hours: 3,
    focus: "Navigating agribusiness procurement for the CFO buyer.",
    state: "Onboarding",
    tone: "accent",
  },
  {
    slug: "dr-meera-krishnan",
    role: "IPR counsel · patent + trademark",
    cadence: "Monthly office hours",
    sessions: 2,
    hours: 2,
    focus: "Patent claims draft and v2 trademark filing.",
    state: "Onboarding",
    tone: "accent",
  },
  {
    slug: "arjun-bedekar",
    role: "Fundraising · Series A narrative",
    cadence: "Waitlisted",
    sessions: 0,
    hours: 1,
    focus: "Not started — waiting on a slot.",
    state: "Waitlist",
    tone: "warn",
  },
];

/* Programme allocation. Deliberately declared here rather than imported
   from the incubation data so this file stays loadable on its own —
   tests/mentors.test.mjs asserts the two figures stay identical. */
export const mentorHourAllocation = {
  used: 40,
  total: 50,
  unit: "hrs",
  lapsesOn: "Apr 30",
};

export const pendingRequests: {
  mentor: string;
  expertise: string;
  sent: string;
  state: string;
  tone: Tone;
}[] = [
  {
    mentor: "Arjun Bedekar",
    expertise: "Fundraising · B2B SaaS",
    sent: "3 days ago",
    state: "Awaiting reply",
    tone: "accent",
  },
  {
    mentor: "Dr. Meera Krishnan",
    expertise: "Patents · IP strategy",
    sent: "1 week ago",
    state: "Accepted",
    tone: "good",
  },
];

/* ── Matching ──────────────────────────────────────────────── */

export const matchingDimensions = [
  { dim: "Problem-stage fit", score: 96, weight: 30, note: "They have solved your exact problem before" },
  { dim: "Sector depth", score: 91, weight: 20, note: "AgriTech / applied-AI operating experience" },
  { dim: "Challenge recency", score: 88, weight: 15, note: "Solved it within the last 3 years" },
  { dim: "Style compatibility", score: 84, weight: 15, note: "Technical, direct, operator-first" },
  { dim: "Availability match", score: 79, weight: 12, note: "Weekly cadence vs their open slots" },
  { dim: "Network leverage", score: 72, weight: 8, note: "Intros to your 5 target investor firms" },
];

export const matchPipeline = [
  { step: "Read", body: "Your stated challenge, stage, sector and assessment gaps" },
  { step: "Score", body: "Six weighted dimensions, 0–100 each" },
  { step: "Rank", body: "Top of catalogue first; ties broken by open slots" },
  { step: "Introduce", body: "Warm intro request with your one-line problem" },
];

export type PreferenceOption = { value: string; confidence: number; note: string };

/* Preference pickers on /founder/mentors/matching. Choosing a more
   specific challenge raises the model's confidence — which is the
   whole point of the screen. */
export const preferenceChoices: Record<string, PreferenceOption[]> = {
  challenge: [
    { value: "Scaling", confidence: 38, note: "Too broad — 210 mentors could claim it" },
    { value: "Inference cost at scale", confidence: 74, note: "Narrows to architecture & infra mentors" },
    { value: "Cost per acre under ₹3 by May", confidence: 93, note: "One unambiguous problem, one obvious mentor" },
  ],
  engagement: [
    { value: "Monthly check-in", confidence: 44, note: "Too slow for a May deadline" },
    { value: "Weekly sessions + async", confidence: 74, note: "Matches your top match's cadence" },
    { value: "Weekly + on-call for incidents", confidence: 88, note: "Highest confidence, highest ask" },
  ],
  style: [
    { value: "Advisory", confidence: 46, note: "Advice without accountability" },
    { value: "Technical, direct, operator-first", confidence: 74, note: "Scores highest with your top 3" },
    { value: "Operator-first, joins working sessions", confidence: 90, note: "Highest confidence, most commitment" },
  ],
};

export const preferenceLabels: { key: string; label: string }[] = [
  { key: "challenge", label: "Primary challenge" },
  { key: "engagement", label: "Engagement type" },
  { key: "style", label: "Mentor style" },
];

export const declinedMatches = [
  {
    mentor: "Vikram Rao",
    reason: "Consumer marketplace retention — not your current bottleneck",
    when: "Mar 28",
  },
  {
    mentor: "Arjun Bedekar",
    reason: "Fundraising track is pre-seed focused; you are pre-Series A",
    when: "Mar 21",
  },
];

export const feedbackSignals = [
  { signal: "Accepted intro", effect: "+6 sector depth", when: "Dr. Meera Krishnan" },
  { signal: "Declined intro", effect: "+11 availability weight", when: "Vikram Rao" },
  { signal: "Session rated 5/5", effect: "+4 style compatibility", when: "Priya Nair" },
  { signal: "Challenge tightened", effect: "+41 match quality", when: "This month" },
];

/* ── Sessions ──────────────────────────────────────────────── */

export const upcomingSessions: {
  id: string;
  mentor: string;
  topic: string;
  when: string;
  type: string;
  prep: string;
  tone: Tone;
}[] = [
  {
    id: "sess-1",
    mentor: "Priya Nair",
    topic: "GPU cost optimization review",
    when: "Thu, Apr 09 · 16:00 IST",
    type: "Weekly 1:1",
    prep: "Bring cost-per-acre dashboard",
    tone: "accent",
  },
  {
    id: "sess-2",
    mentor: "Karan Chadha",
    topic: "FPO channel — vernacular onboarding",
    when: "Tue, Apr 14 · 11:00 IST",
    type: "Intro call",
    prep: "Share channel economics sheet",
    tone: "accent",
  },
  {
    id: "sess-3",
    mentor: "Dr. Meera Krishnan",
    topic: "Patent claims draft review",
    when: "Fri, Apr 17 · 10:00 IST",
    type: "Office hours",
    prep: "Claims draft v2 + prior art list",
    tone: "accent",
  },
];

export const sessionHistory = [
  {
    id: "hist-1",
    mentor: "Priya Nair",
    topic: "Vernacular agronomy terms — data quality",
    date: "Apr 02",
    score: 5,
    notes: "4 action items logged · all closed",
    duration: "48 min",
  },
  {
    id: "hist-2",
    mentor: "Priya Nair",
    topic: "Series A tech diligence prep",
    date: "Mar 26",
    score: 5,
    notes: "Mock questions + room checklist",
    duration: "62 min",
  },
  {
    id: "hist-3",
    mentor: "Vikram Rao",
    topic: "Retention deep-dive",
    date: "Mar 19",
    score: 4,
    notes: "Cohort view rebuilt post-session",
    duration: "41 min",
  },
  {
    id: "hist-4",
    mentor: "Karan Chadha",
    topic: "FPO agent app — first-run flow",
    date: "Mar 12",
    score: 5,
    notes: "Onboarding cut from 9 to 4 screens",
    duration: "55 min",
  },
];

export const sessionActionItems = [
  {
    id: "ai-1",
    text: "Share cost-per-acre dashboard link",
    owner: "You",
    due: "Before Thu",
    done: false,
  },
  {
    id: "ai-2",
    text: "Intro inference-optimization eng at Nimbus",
    owner: "Priya Nair",
    due: "This week",
    done: true,
  },
  {
    id: "ai-3",
    text: "Decide: spot vs reserved GPU for Q3",
    owner: "You",
    due: "Apr 15",
    done: false,
  },
  {
    id: "ai-4",
    text: "Send claims draft v2 to IPR counsel",
    owner: "Vikash Jha",
    due: "Apr 04",
    done: false,
  },
  {
    id: "ai-5",
    text: "Cohort retention view — rebuild post-session",
    owner: "Kavya Nair",
    due: "Mar 20",
    done: true,
  },
];

export const cadence = [
  { day: "Mon", booked: false },
  { day: "Tue", booked: true, mentor: "Karan Chadha" },
  { day: "Wed", booked: false },
  { day: "Thu", booked: true, mentor: "Priya Nair" },
  { day: "Fri", booked: true, mentor: "Dr. Meera Krishnan" },
];

/* Slots offered when a founder moves a booked session. */
export const sessionSlots = [
  "Tue, Apr 21 · 11:00 IST",
  "Wed, Apr 22 · 16:00 IST",
  "Fri, Apr 24 · 10:00 IST",
  "Mon, Apr 27 · 15:00 IST",
];

/* Agenda for the next session — the founder ticks items off during
   the call, and the state persists across a page reload. */
export const nextAgenda = [
  { id: "ag-1", item: "Walk the current cost-per-acre breakdown", done: true },
  { id: "ag-2", item: "Reserved vs spot GPU — decision", done: false },
  { id: "ag-3", item: "Batch-window scheduling for night inference", done: false },
  { id: "ag-4", item: "Q3 compute budget sign-off", done: false },
];

export const topicsCovered = [
  { topic: "Inference & compute cost", sessions: 8, last: "Apr 02" },
  { topic: "Series A readiness", sessions: 4, last: "Mar 26" },
  { topic: "FPO channel & onboarding", sessions: 4, last: "Mar 12" },
  { topic: "Retention & cohort economics", sessions: 3, last: "Mar 19" },
  { topic: "IP, patents & trademarks", sessions: 2, last: "Mar 05" },
  { topic: "Enterprise procurement", sessions: 1, last: "Feb 27" },
];
