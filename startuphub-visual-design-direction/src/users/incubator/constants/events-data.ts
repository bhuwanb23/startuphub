/* StartupHub Labs — events & workshops datasets.
 *
 * The incubator's own programme of events for the quarter, plus the
 * operational detail behind it: registrations, speakers, feedback and
 * what each event actually produced.
 *
 * The *vocabulary* is shared with the public catalogue
 * (`src/views/events/constants/events.ts`) — same event types, same
 * formats — but the events themselves are the incubator's own. The public
 * listing carries a separate Demo Day in March; the incubator's Cohort VI
 * graduation is 28 Apr, and that is the date every other incubator screen
 * already shows. Reusing the public rows wholesale would have put two
 * demo days in front of the user with a month between them.
 *
 * A test asserts the types and formats here are the same vocabulary the
 * public catalogue uses, and that every mentor, investor and startup
 * referenced resolves to a real record.
 */

import { PORTFOLIO } from "./startups-data.ts";

/* ── Types ─────────────────────────────────────────────────────── */

export type Tone = "default" | "accent" | "good" | "warn" | "bad";

export type EventKind =
  | "Demo Day"
  | "Workshop"
  | "Webinar"
  | "Hackathon"
  | "Investor Event"
  | "Networking"
  | "Conference";

export type EventFormat = "In-person" | "Virtual" | "Hybrid";

export type EventStatus =
  | "Registration open"
  | "Filling fast"
  | "Waitlist"
  | "Full"
  | "Completed";

export type EventRecord = {
  id: string;
  slug: string;
  title: string;
  kind: EventKind;
  format: EventFormat;
  date: string;
  day: number;
  month: number;
  time: string;
  duration: string;
  location: string;
  organizer: string;
  capacity: number;
  registered: number;
  waitlist: number;
  status: EventStatus;
  agenda: string[];
  eligibility: string;
  fee: string;
  note: string;
  tone: Tone;
};

export type EventKpi = {
  label: string;
  value: string;
  note: string;
  tone: Tone;
};

export type EventTypeMix = {
  kind: EventKind;
  events: number;
  seats: number;
  note: string;
  tone: Tone;
};

export type FormatSplit = {
  format: EventFormat;
  events: number;
  seats: number;
  note: string;
  tone: Tone;
};

export type EventAttention = {
  id: string;
  event: string;
  slug: string;
  issue: string;
  impact: string;
  owner: string;
  note: string;
  tone: Tone;
};

export type EventSeries = {
  name: string;
  cadence: string;
  next: string;
  sessions: number;
  audience: string;
  note: string;
  tone: Tone;
};

export type CalendarDay = {
  day: number;
  month: number;
  entries: { id: string; title: string; kind: EventKind; time: string }[];
};

export type KeyDate = {
  date: string;
  days: string;
  title: string;
  detail: string;
  tone: Tone;
};

export type EventConflict = {
  title: string;
  detail: string;
  impact: string;
  fix: string;
  tone: Tone;
};

export type RegistrationSource = {
  source: string;
  registrations: number;
  share: number;
  note: string;
  tone: Tone;
};

export type ShowRate = {
  event: string;
  slug: string;
  registered: number;
  attended: number;
  rate: number;
  note: string;
  tone: Tone;
};

export type CapacityGap = {
  event: string;
  slug: string;
  capacity: number;
  filled: number;
  gap: number;
  note: string;
  tone: Tone;
};

export type SpeakerRecord = {
  id: string;
  name: string;
  initials: string;
  role: string;
  org: string;
  kind: "Mentor" | "Investor" | "Founder" | "External";
  sessions: number;
  topics: string[];
  rating: number;
  availability: string;
  note: string;
  tone: Tone;
};

export type SessionRecord = {
  id: string;
  title: string;
  event: string;
  eventSlug: string;
  date: string;
  duration: string;
  seats: number;
  filled: number;
  facilitator: string;
  format: EventFormat;
  note: string;
  tone: Tone;
};

export type TopicDemand = {
  topic: string;
  asked: number;
  covered: boolean;
  note: string;
  tone: Tone;
};

export type FeedbackRecord = {
  id: string;
  event: string;
  slug: string;
  responses: number;
  rating: number;
  nps: number;
  best: string;
  worst: string;
  note: string;
  tone: Tone;
};

export type OutcomeRecord = {
  id: string;
  outcome: string;
  count: number;
  detail: string;
  note: string;
  tone: Tone;
};

export type ImprovementAction = {
  id: string;
  action: string;
  event: string;
  owner: string;
  due: string;
  status: string;
  note: string;
  tone: Tone;
};

export type EventReach = {
  label: string;
  value: number;
  total: number;
  note: string;
  tone: Tone;
};

export type EventLogistics = {
  id: string;
  event: string;
  slug: string;
  venue: string;
  setup: string;
  crew: number;
  checklist: string[];
  tone: Tone;
};

export type RegistrationVelocity = {
  event: string;
  slug: string;
  last7: number;
  last30: number;
  peak: string;
  note: string;
  tone: Tone;
};

export type NoShowRisk = {
  event: string;
  slug: string;
  risk: number;
  driver: string;
  fix: string;
  note: string;
  tone: Tone;
};

export type SpeakerRating = {
  id: string;
  name: string;
  initials: string;
  rating: number;
  responses: number;
  quote: string;
  tone: Tone;
};

export type SpeakerAvailability = {
  name: string;
  initials: string;
  slots: string;
  blackout: string;
  canTake: number;
  note: string;
  tone: Tone;
};

export type FeedbackTheme = {
  theme: string;
  mentions: number;
  sentiment: string;
  quote: string;
  tone: Tone;
};

export type QuarterTrend = {
  quarter: string;
  rating: number;
  nps: number;
  events: number;
  note: string;
  tone: Tone;
};

/* ── The event programme ───────────────────────────────────────── */

export const EVENTS: EventRecord[] = [
  {
    id: "ev-1",
    slug: "ipr-masterclass-apr",
    title: "IPR Masterclass — File Before You Pitch",
    kind: "Workshop",
    format: "Virtual",
    date: "03 Apr 2026",
    day: 3,
    month: 4,
    time: "15:00",
    duration: "2h 30m",
    location: "Virtual (live)",
    organizer: "StartupHub IPR Desk",
    capacity: 500,
    registered: 500,
    waitlist: 84,
    status: "Full",
    agenda: [
      "15:00 — Why investors diligence IP before traction",
      "15:30 — The four filings every founder should have",
      "16:15 — Live drafting: one provisional, one trademark",
      "17:00 — Cost, timeline and the traps",
    ],
    eligibility: "Open to members · 1 seat per startup",
    fee: "Free for members · ₹999 public",
    note: "Ran out of seats 11 days early — the waitlist is the workshop",
    tone: "good",
  },
  {
    id: "ev-2",
    slug: "climate-storage-webinar",
    title: "Climate & Storage Economics Webinar",
    kind: "Webinar",
    format: "Virtual",
    date: "09 Apr 2026",
    day: 9,
    month: 4,
    time: "16:00",
    duration: "1h",
    location: "Virtual (live + replay)",
    organizer: "SH Intelligence",
    capacity: 2000,
    registered: 1264,
    waitlist: 0,
    status: "Completed",
    agenda: [
      "16:00 — The storage cost curve for grid assets",
      "16:20 — What actually moves the LCOE",
      "16:40 — Q&A",
    ],
    eligibility: "Open to all",
    fee: "Free",
    note: "63% turnout — the replay is doing more work than the live session",
    tone: "accent",
  },
  {
    id: "ev-3",
    slug: "demo-day-dry-run",
    title: "Demo-Day Dry Run — Cohort VI",
    kind: "Workshop",
    format: "Virtual",
    date: "21 Apr 2026",
    day: 21,
    month: 4,
    time: "15:00",
    duration: "2h",
    location: "Virtual",
    organizer: "StartupHub Labs",
    capacity: 40,
    registered: 34,
    waitlist: 0,
    status: "Filling fast",
    agenda: [
      "15:00 — Deck order and the five-minute cut",
      "15:30 — Live pitch, one founder at a time",
      "16:15 — Investor questions, answered live",
    ],
    eligibility: "Cohort VI only",
    fee: "Free",
    note: "Rehearsal for the 28th — 6 of 14 have not signed up",
    tone: "warn",
  },
  {
    id: "ev-4",
    slug: "investor-office-hours-apr",
    title: "Investor Office Hours — April",
    kind: "Investor Event",
    format: "In-person",
    date: "24 Apr 2026",
    day: 24,
    month: 4,
    time: "11:00",
    duration: "2h",
    location: "Investor lounge, StartupHub Campus",
    organizer: "StartupHub Capital Network",
    capacity: 60,
    registered: 48,
    waitlist: 0,
    status: "Filling fast",
    agenda: [
      "11:00 — Fund intros, ten minutes each",
      "11:30 — Open desk: bring a deck, leave with a partner",
      "12:30 — Debrief",
    ],
    eligibility: "Members in good standing",
    fee: "Free",
    note: "Four funds on site — Northgate, Vertex, Meridian and Samriddhi",
    tone: "accent",
  },
  {
    id: "ev-5",
    slug: "demo-day-cohort-vi",
    title: "Demo Day — Cohort VI",
    kind: "Demo Day",
    format: "Hybrid",
    date: "28 Apr 2026",
    day: 28,
    month: 4,
    time: "16:00",
    duration: "3h",
    location: "StartupHub Campus, Bengaluru + virtual",
    organizer: "StartupHub Labs",
    capacity: 1440,
    registered: 1312,
    waitlist: 0,
    status: "Filling fast",
    agenda: [
      "16:00 — Doors, badges and data-room access",
      "16:30 — 14 startup pitches, five minutes each",
      "17:45 — Investor second-meeting sign-ups",
      "18:00 — Close",
    ],
    eligibility: "Vetted registration · 240 in-person, 1,200 virtual",
    fee: "Free",
    note: "14 startups · the 240 in-person track is full, 128 virtual seats left",
    tone: "accent",
  },
  {
    id: "ev-6",
    slug: "founders-mixer-may",
    title: "Founders' Mixer — Chennai Chapter",
    kind: "Networking",
    format: "In-person",
    date: "09 May 2026",
    day: 9,
    month: 5,
    time: "19:00",
    duration: "3h",
    location: "IIT Madras Research Park",
    organizer: "StartupHub Chennai",
    capacity: 150,
    registered: 87,
    waitlist: 0,
    status: "Registration open",
    agenda: [
      "19:00 — Arrivals and introductions",
      "19:45 — Five-minute founder lightning rounds",
      "20:30 — Dinner and open tables",
    ],
    eligibility: "Members · 2 seats per startup",
    fee: "₹299, includes dinner",
    note: "58% of capacity sold six weeks out — the chapter is new",
    tone: "default",
  },
  {
    id: "ev-7",
    slug: "gtm-clinic-meridian",
    title: "Go-to-Market Clinic with Meridian Labs",
    kind: "Workshop",
    format: "Virtual",
    date: "13 May 2026",
    day: 13,
    month: 5,
    time: "12:00",
    duration: "1h 30m",
    location: "Virtual",
    organizer: "StartupHub Labs × Meridian Labs",
    capacity: 120,
    registered: 96,
    waitlist: 0,
    status: "Registration open",
    agenda: [
      "12:00 — How a corporate actually buys a startup",
      "12:30 — First-pilot scoping clinic",
    ],
    eligibility: "Cohort VI and VII",
    fee: "Free",
    note: "Meridian's playbook is the session — and they want a pilot out of it",
    tone: "accent",
  },
  {
    id: "ev-8",
    slug: "ai-agents-hackathon",
    title: "Agentic AI Hackathon — Campus Track",
    kind: "Hackathon",
    format: "In-person",
    date: "22 May 2026",
    day: 22,
    month: 5,
    time: "09:00",
    duration: "12h",
    location: "T-Hub, Hyderabad",
    organizer: "StartupHub × Nimbus Cloud",
    capacity: 400,
    registered: 341,
    waitlist: 0,
    status: "Registration open",
    agenda: [
      "09:00 — Registration and team formation",
      "10:00 — Briefing and credit hand-out",
      "13:00 — Build sprint",
      "18:00 — Demos and judging",
    ],
    eligibility: "Open · 4 per team, 100 teams",
    fee: "₹499 per team",
    note: "100 teams at 85% — needs 12 more teams for a full grid",
    tone: "warn",
  },
  {
    id: "ev-9",
    slug: "reverse-pitch-may",
    title: "Reverse Pitch — Investors Present to Founders",
    kind: "Investor Event",
    format: "In-person",
    date: "29 May 2026",
    day: 29,
    month: 5,
    time: "18:00",
    duration: "2h 30m",
    location: "WeWork Galaxy, Mumbai",
    organizer: "StartupHub Capital Network",
    capacity: 180,
    registered: 112,
    waitlist: 0,
    status: "Registration open",
    agenda: [
      "18:00 — Six funds, six minutes each",
      "18:45 — Founder Q&A in the room",
      "19:30 — Introductions",
    ],
    eligibility: "Founders only · vetted",
    fee: "Free",
    note: "Only one fifth of the Seed–A book in the city is in the room",
    tone: "default",
  },
  {
    id: "ev-10",
    slug: "filing-clinic-jun",
    title: "IP Filing Clinic",
    kind: "Workshop",
    format: "Virtual",
    date: "11 Jun 2026",
    day: 11,
    month: 6,
    time: "15:00",
    duration: "2h",
    location: "Virtual",
    organizer: "StartupHub IPR Desk",
    capacity: 4,
    registered: 4,
    waitlist: 6,
    status: "Waitlist",
    agenda: [
      "15:00 — Bring one filing, leave with a draft",
      "16:00 — Sign-off and next steps",
    ],
    eligibility: "Cohort VI and VII · pro bono",
    fee: "Free",
    note: "Four pro bono slots a month — six startups are waiting for June",
    tone: "bad",
  },
  {
    id: "ev-11",
    slug: "scaling-roundtable",
    title: "Scaling Roundtable — Series A Founders",
    kind: "Workshop",
    format: "In-person",
    date: "02 Jun 2026",
    day: 2,
    month: 6,
    time: "10:00",
    duration: "3h",
    location: "Boardroom, StartupHub Campus",
    organizer: "StartupHub Labs",
    capacity: 24,
    registered: 19,
    waitlist: 0,
    status: "Registration open",
    agenda: [
      "10:00 — What breaks between Series A and Series B",
      "11:00 — Closed-door round: first hires, first hires' problems",
      "12:00 — Close",
    ],
    eligibility: "Closed door · Series A and above",
    fee: "Free",
    note: "Chatham House rule — nothing leaves the room",
    tone: "accent",
  },
  {
    id: "ev-12",
    slug: "cohort-vii-welcome-mixer",
    title: "Cohort VII Welcome Mixer",
    kind: "Networking",
    format: "In-person",
    date: "19 Jun 2026",
    day: 19,
    month: 6,
    time: "18:30",
    duration: "2h 30m",
    location: "Investor lounge, StartupHub Campus",
    organizer: "StartupHub Labs",
    capacity: 90,
    registered: 41,
    waitlist: 0,
    status: "Registration open",
    agenda: [
      "18:30 — Cohort VII welcome and mentor intros",
      "19:15 — Alumni panel",
      "20:00 — Mixer",
    ],
    eligibility: "Cohort VII, mentors and alumni",
    fee: "Free",
    note: "46% of capacity — the cohort has not been told the date yet",
    tone: "warn",
  },
];

/* ── Overview data ─────────────────────────────────────────────── */

export const EVENT_KPIS: EventKpi[] = [
  { label: "Events this quarter", value: "12", note: "across 3 formats and 6 running types", tone: "accent" },
  { label: "Seats offered", value: "5,008", note: "of which 2,344 are in the room", tone: "accent" },
  { label: "Registrations", value: "3,858", note: "77% of every seat offered", tone: "good" },
  { label: "On the waitlist", value: "90", note: "across two sold-out events", tone: "warn" },
];

export const EVENT_TYPE_MIX: EventTypeMix[] = [
  { kind: "Demo Day", events: 1, seats: 1440, note: "The one that converts the room into term sheets", tone: "accent" },
  { kind: "Workshop", events: 5, seats: 688, note: "The most-run format — and the cheapest to run", tone: "accent" },
  { kind: "Investor Event", events: 2, seats: 240, note: "Office hours and reverse pitch, both free", tone: "good" },
  { kind: "Networking", events: 2, seats: 240, note: "Chapters and the cohort welcome", tone: "default" },
  { kind: "Hackathon", events: 1, seats: 400, note: "One national event, 100 teams", tone: "warn" },
  { kind: "Webinar", events: 1, seats: 2000, note: "Reach, but the lowest turnout", tone: "bad" },
  { kind: "Conference", events: 0, seats: 0, note: "Not this quarter — the summit is in Q3", tone: "default" },
];

export const FORMAT_SPLIT: FormatSplit[] = [
  { format: "Virtual", events: 5, seats: 2664, note: "Cheapest to run and the widest reach", tone: "good" },
  { format: "In-person", events: 6, seats: 904, note: "Where the introductions actually happen", tone: "accent" },
  { format: "Hybrid", events: 1, seats: 1440, note: "One event, and it is the important one", tone: "accent" },
];

export const EVENT_ATTENTION: EventAttention[] = [
  { id: "ea-1", event: "IP Filing Clinic", slug: "filing-clinic-jun", issue: "Six startups waiting, four pro bono slots", impact: "12 days of waiting", owner: "Nandita Bose", note: "The counsel line expires on 31 May — renew or convert", tone: "bad" },
  { id: "ea-2", event: "Agentic AI Hackathon", slug: "ai-agents-hackathon", issue: "85% of teams confirmed, 12 short", impact: "Grid is not full", owner: "Divya Menon", note: "Two weeks out — the last push is next week", tone: "warn" },
  { id: "ea-3", event: "Demo-Day Dry Run", slug: "demo-day-dry-run", issue: "6 of 14 Cohort VI startups have not signed up", impact: "Pitch quality risk", owner: "Priya Nair", note: "The dry run is the cheapest way to find a broken deck", tone: "warn" },
  { id: "ea-4", event: "Cohort VII Welcome Mixer", slug: "cohort-vii-welcome-mixer", issue: "41 of 90 seats and the cohort has not been told", impact: "4 weeks of runway", owner: "Divya Menon", note: "Announce before the cohort starts asking", tone: "warn" },
  { id: "ea-5", event: "IPR Masterclass", slug: "ipr-masterclass-apr", issue: "84 on the waitlist and no second sitting scheduled", impact: "Demand outstrips supply", owner: "Nandita Bose", note: "Run it again in May with the same facilitator", tone: "accent" },
];

export const EVENT_SERIES: EventSeries[] = [
  { name: "IPR Masterclass", cadence: "Monthly", next: "12 May 2026", sessions: 4, audience: "Founders pre-pitch", note: "Dr. Meera Krishnan runs every sitting", tone: "good" },
  { name: "Investor Office Hours", cadence: "Monthly", next: "22 May 2026", sessions: 6, audience: "Any member in good standing", note: "Four funds rotate through the lounge", tone: "accent" },
  { name: "Go-to-Market Clinic", cadence: "Fortnightly", next: "27 May 2026", sessions: 3, audience: "Cohort VI and VII", note: "Each sitting is run by a corporate partner", tone: "good" },
  { name: "Demo-Day Dry Run", cadence: "Per cohort", next: "24 Apr 2026", sessions: 3, audience: "Graduating cohort only", note: "Seven days before every demo day, no exceptions", tone: "warn" },
  { name: "IP Filing Clinic", cadence: "Monthly", next: "11 Jun 2026", sessions: 3, audience: "Cohort VI and VII · pro bono", note: "Four slots a month, matching the counsel line", tone: "bad" },
];

/* ── Calendar data ─────────────────────────────────────────────── */

/* April 2026 starts on a Wednesday. */
export const MONTHS = [
  { name: "April", month: 4, leading: 2 },
  { name: "May", month: 5, leading: 4 },
  { name: "June", month: 6, leading: 0 },
];

export const KEY_DATES: KeyDate[] = [
  { date: "03 Apr", days: "Today", title: "IPR Masterclass", detail: "Virtual · 500 seats · full", tone: "good" },
  { date: "21 Apr", days: "18 days", title: "Demo-Day Dry Run", detail: "Virtual · 34 of 40", tone: "warn" },
  { date: "24 Apr", days: "21 days", title: "Investor Office Hours", detail: "Campus · 48 of 60", tone: "accent" },
  { date: "28 Apr", days: "25 days", title: "Demo Day — Cohort VI", detail: "Hybrid · 1,312 registered", tone: "accent" },
  { date: "09 May", days: "36 days", title: "Founders' Mixer — Chennai", detail: "IIT Madras · 87 of 150", tone: "default" },
  { date: "22 May", days: "49 days", title: "Agentic AI Hackathon", detail: "T-Hub · 341 of 400", tone: "warn" },
  { date: "02 Jun", days: "60 days", title: "Scaling Roundtable", detail: "Boardroom · 24 of 24", tone: "accent" },
  { date: "19 Jun", days: "77 days", title: "Cohort VII Welcome Mixer", detail: "Campus · 41 of 90", tone: "warn" },
];

export const EVENT_CONFLICTS: EventConflict[] = [
  { title: "Office hours and the dry run share a week", detail: "24 Apr office hours, 21 Apr dry run", impact: "Two founder-facing events in four days", fix: "Move the dry run to the 23rd", tone: "warn" },
  { title: "Demo day lands mid-selection", detail: "Selection committee sits 18 Apr, demo day 28 Apr", impact: "Cohort VI graduates before Cohort VIII starts", fix: "Deliberate — but it starves the bench", tone: "warn" },
  { title: "The webinar under-fills while the hackathon over-fills", detail: "1,264 of 2,000 seats against 341 of 400", impact: "Wrong format for the demand", fix: "Cut the webinar seat cap to 1,200", tone: "accent" },
  { title: "Two events need the investor lounge", detail: "Office hours 24 Apr and the welcome mixer 19 Jun", impact: "No clash, but both need a marshal", fix: "One marshal covers both", tone: "default" },
];

/* ── Registration data ─────────────────────────────────────────── */

export const REGISTRATION_SOURCES: RegistrationSource[] = [
  { source: "Cohort members", registrations: 2540, share: 66, note: "The core of every event", tone: "accent" },
  { source: "Alumni network", registrations: 656, share: 17, note: "Alumni attend everything and bring founders", tone: "good" },
  { source: "Public listing", registrations: 386, share: 10, note: "Came through the events directory", tone: "default" },
  { source: "Partner channels", registrations: 276, share: 7, note: "Meridian, Nimbus and IIT Madras each run a list", tone: "default" },
];

export const SHOW_RATES: ShowRate[] = [
  { event: "Climate & Storage Economics Webinar", slug: "climate-storage-webinar", registered: 1264, attended: 796, rate: 63, note: "The replay carried the other 468", tone: "bad" },
  { event: "IPR Masterclass — April", slug: "ipr-masterclass-apr", registered: 500, attended: 437, rate: 87, note: "Workshop seats are used", tone: "good" },
  { event: "Investor Office Hours — March", slug: "investor-office-hours-mar", registered: 52, attended: 44, rate: 85, note: "People show up for a partner", tone: "good" },
  { event: "Founders' Mixer — Bengaluru", slug: "founders-mixer-blr", registered: 118, attended: 92, rate: 78, note: "Dinner is the reason people stay", tone: "accent" },
  { event: "Demo Day — Cohort V", slug: "demo-day-cohort-v", registered: 980, attended: 781, rate: 80, note: "In-person turnout is higher than the blend", tone: "accent" },
  { event: "Go-to-Market Clinic — March", slug: "gtm-clinic-mar", registered: 88, attended: 71, rate: 81, note: "Lunch-and-learn slot, midday", tone: "accent" },
];

export const CAPACITY_GAPS: CapacityGap[] = [
  { event: "Climate & Storage Economics Webinar", slug: "climate-storage-webinar", capacity: 2000, filled: 1264, gap: 736, note: "Nobody registers for a free webinar in advance", tone: "bad" },
  { event: "Founders' Mixer — Chennai Chapter", slug: "founders-mixer-may", capacity: 150, filled: 87, gap: 63, note: "New chapter — no word of mouth yet", tone: "warn" },
  { event: "Cohort VII Welcome Mixer", slug: "cohort-vii-welcome-mixer", capacity: 90, filled: 41, gap: 49, note: "The cohort has not been told the date", tone: "warn" },
  { event: "Scaling Roundtable", slug: "scaling-roundtable", capacity: 24, filled: 24, gap: 0, note: "Fully subscribed — the cap is the point", tone: "default" },
  { event: "IP Filing Clinic", slug: "filing-clinic-jun", capacity: 4, filled: 4, gap: 0, note: "Capped by pro bono counsel, not by demand", tone: "bad" },
];

/* ── Speakers and sessions ─────────────────────────────────────── */

export const SPEAKERS: SpeakerRecord[] = [
  { id: "sp-1", name: "Dr. Meera Krishnan", initials: "DM", role: "IPR Attorney & Strategist", org: "Independent", kind: "Mentor", sessions: 4, topics: ["Patents", "IP strategy", "Licensing"], rating: 4.9, availability: "Monthly office hours", note: "Runs the masterclass and the filing clinic — the busiest voice on the programme", tone: "good" },
  { id: "sp-2", name: "Sunita Deshmukh", initials: "SD", role: "VP Innovation, Arvind Industries", org: "Arvind Industries", kind: "Mentor", sessions: 3, topics: ["Enterprise sales", "Pilots", "Corporate partnerships"], rating: 4.8, availability: "2 slots / week", note: "Runs the go-to-market clinic and introduces the corporate pipeline", tone: "good" },
  { id: "sp-3", name: "Priya Nair", initials: "PN", role: "ex-CTO, ZetaPay", org: "Independent", kind: "Mentor", sessions: 3, topics: ["Architecture", "Scaling teams", "FinTech"], rating: 4.9, availability: "2 slots / week", note: "Runs the demo-day dry run — she has seen 60 decks", tone: "good" },
  { id: "sp-4", name: "Vikram Rao", initials: "VR", role: "ex-VP Growth, FreshKart", org: "Independent", kind: "Mentor", sessions: 2, topics: ["Growth loops", "Retention", "Marketplaces"], rating: 4.7, availability: "1 slot / week", note: "Fireside and the growth track", tone: "accent" },
  { id: "sp-5", name: "Karan Chadha", initials: "KC", role: "Product advisor", org: "Independent", kind: "Mentor", sessions: 2, topics: ["Product", "EdTech", "Consumer UX"], rating: 4.8, availability: "2 slots / month", note: "Product teardown session at the hackathon", tone: "accent" },
  { id: "sp-6", name: "Vikram Sethi", initials: "VS", role: "GP, Northgate Partners", org: "Northgate Partners", kind: "Investor", sessions: 2, topics: ["Seed to Series A", "AgriTech", "Enterprise"], rating: 4.6, availability: "On demo days", note: "Judges demo day and sits the investor office hours", tone: "accent" },
  { id: "sp-7", name: "Ananya Rao", initials: "AR", role: "CEO, Lumen AI", org: "Lumen AI", kind: "Founder", sessions: 1, topics: ["Series B", "Fundraising"], rating: 4.7, availability: "Alumni only", note: "Speaks on the panel because she raised the round everyone asks about", tone: "good" },
  { id: "sp-8", name: "Nikhil Verma", initials: "NV", role: "ex-VP Engineering, QuickShip", org: "Independent", kind: "Mentor", sessions: 1, topics: ["Architecture", "Logistics", "Team building"], rating: 4.6, availability: "2 slots / week", note: "Architecture teardown at the scaling roundtable", tone: "default" },
];

export const SESSIONS: SessionRecord[] = [
  { id: "se-1", title: "IPR Masterclass — File Before You Pitch", event: "IPR Masterclass", eventSlug: "ipr-masterclass-apr", date: "03 Apr 2026", duration: "2h 30m", seats: 500, filled: 500, facilitator: "Dr. Meera Krishnan", format: "Virtual", note: "Full — 84 on the waitlist", tone: "bad" },
  { id: "se-2", title: "The four filings every founder should have", event: "IPR Masterclass", eventSlug: "ipr-masterclass-apr", date: "03 Apr 2026", duration: "45m", seats: 500, filled: 500, facilitator: "Dr. Meera Krishnan", format: "Virtual", note: "The segment that gets replayed", tone: "good" },
  { id: "se-3", title: "Demo-Day Dry Run", event: "Demo-Day Dry Run", eventSlug: "demo-day-dry-run", date: "21 Apr 2026", duration: "2h", seats: 40, filled: 34, facilitator: "Priya Nair", format: "Virtual", note: "6 of 14 startups still to sign up", tone: "warn" },
  { id: "se-4", title: "Investor Office Hours — open desk", event: "Investor Office Hours", eventSlug: "investor-office-hours-apr", date: "24 Apr 2026", duration: "1h", seats: 60, filled: 48, facilitator: "Vikram Sethi", format: "In-person", note: "Bring a deck, leave with a partner", tone: "accent" },
  { id: "se-5", title: "Demo Day — 14 startup pitches", event: "Demo Day", eventSlug: "demo-day-cohort-vi", date: "28 Apr 2026", duration: "1h 15m", seats: 1440, filled: 1312, facilitator: "Priya Nair", format: "Hybrid", note: "Five minutes each, hard cut", tone: "accent" },
  { id: "se-6", title: "How a corporate actually buys a startup", event: "Go-to-Market Clinic", eventSlug: "gtm-clinic-meridian", date: "13 May 2026", duration: "30m", seats: 120, filled: 96, facilitator: "Sunita Deshmukh", format: "Virtual", note: "The corporate playbook, unedited", tone: "good" },
  { id: "se-7", title: "First-pilot scoping clinic", event: "Go-to-Market Clinic", eventSlug: "gtm-clinic-meridian", date: "13 May 2026", duration: "60m", seats: 40, filled: 38, facilitator: "Sunita Deshmukh", format: "Virtual", note: "38 of 40 — a long queue", tone: "warn" },
  { id: "se-8", title: "Architecture teardown", event: "Scaling Roundtable", eventSlug: "scaling-roundtable", date: "02 Jun 2026", duration: "45m", seats: 24, filled: 24, facilitator: "Nikhil Verma", format: "In-person", note: "Closed room, Chatham House rule", tone: "accent" },
  { id: "se-9", title: "IP Filing Clinic", event: "IP Filing Clinic", eventSlug: "filing-clinic-jun", date: "11 Jun 2026", duration: "2h", seats: 4, filled: 4, facilitator: "Dr. Meera Krishnan", format: "Virtual", note: "Four slots, six waiting", tone: "bad" },
  { id: "se-10", title: "Product teardown", event: "Agentic AI Hackathon", eventSlug: "ai-agents-hackathon", date: "22 May 2026", duration: "1h", seats: 100, filled: 100, facilitator: "Karan Chadha", format: "In-person", note: "Every team gets 3 minutes", tone: "good" },
];

export const TOPIC_DEMAND: TopicDemand[] = [
  { topic: "IPR and filings", asked: 4, covered: true, note: "The most-asked topic and the best-covered one", tone: "good" },
  { topic: "Go-to-market and enterprise sales", asked: 3, covered: true, note: "Corridor clinics every fortnight", tone: "good" },
  { topic: "Fundraising and investor readiness", asked: 3, covered: true, note: "Office hours and the dry run", tone: "good" },
  { topic: "Hiring and team build", asked: 2, covered: true, note: "The scaling roundtable covers it", tone: "accent" },
  { topic: "AI agents and tooling", asked: 2, covered: true, note: "One hackathon — a thin answer for that much demand", tone: "warn" },
  { topic: "Regulatory and compliance", asked: 2, covered: false, note: "No session and no owner", tone: "bad" },
  { topic: "Pricing and unit economics", asked: 1, covered: false, note: "Came up three times in feedback", tone: "bad" },
];

/* ── Feedback and outcomes ─────────────────────────────────────── */

export const FEEDBACK: FeedbackRecord[] = [
  { id: "fb-1", event: "IPR Masterclass — April", slug: "ipr-masterclass-apr", responses: 341, rating: 4.7, nps: 71, best: "The live drafting — people filed something", worst: "Two hours is not enough for the trademark segment", note: "The best-rated session of the quarter", tone: "good" },
  { id: "fb-2", event: "Investor Office Hours — March", slug: "investor-office-hours-mar", responses: 38, rating: 4.6, nps: 64, best: "The open desk — a real partner in ten minutes", worst: "The queue in the last 20 minutes", note: "Attendees asked for twice the time", tone: "good" },
  { id: "fb-3", event: "Climate & Storage Economics Webinar", slug: "climate-storage-webinar", responses: 402, rating: 3.9, nps: 28, best: "The Q&A", worst: "A webinar with 2,000 seats and no conversation", note: "Big reach, worst experience — the fix is fewer seats", tone: "bad" },
  { id: "fb-4", event: "Demo Day — Cohort V", slug: "demo-day-cohort-v", responses: 519, rating: 4.8, nps: 78, best: "The second-meeting board", worst: "The queue for badge pickup", note: "Badge pickup is the one thing to fix", tone: "good" },
  { id: "fb-5", event: "Founders' Mixer — Bengaluru", slug: "founders-mixer-blr", responses: 74, rating: 4.4, nps: 51, best: "The lightning rounds", worst: "Not enough founders from outside the cohort", note: "Needs a wider invitation list", tone: "accent" },
  { id: "fb-6", event: "Go-to-Market Clinic — March", slug: "gtm-clinic-mar", responses: 63, rating: 4.5, nps: 58, best: "The pilot scoping", worst: "Only 90 minutes for a complex question", note: "Run the follow-up clinic longer", tone: "accent" },
];

export const OUTCOMES: OutcomeRecord[] = [
  { id: "ou-1", outcome: "Investor second meetings", count: 34, detail: "Booked within 30 days of a demo day", note: "Up from 26 the previous quarter", tone: "good" },
  { id: "ou-2", outcome: "Term sheets after demo day", count: 7, detail: "From 14 startups, 5 cohorts", note: "The 60% second-meeting rate is holding", tone: "good" },
  { id: "ou-3", outcome: "Corporate pilots started", count: 6, detail: "Introduced by a workshop or office hours", note: "The go-to-market clinic is doing this", tone: "accent" },
  { id: "ou-4", outcome: "IP filings completed", count: 11, detail: "Straight out of the masterclass and clinic", note: "Eight of the eleven are provisional patents", tone: "accent" },
  { id: "ou-5", outcome: "Co-founder and mentor intros", count: 19, detail: "Made in networking events and sessions", note: "A mixer is the cheapest way to make one", tone: "default" },
  { id: "ou-6", outcome: "Repeat attendances", count: 148, detail: "People who came to two or more events", note: "The cohort community is the product", tone: "accent" },
];

export const IMPROVEMENT_ACTIONS: ImprovementAction[] = [
  { id: "ia-1", action: "Cut the webinar seat cap to 1,200 and add a live Q&A panel", event: "Climate & Storage Economics Webinar", owner: "Divya Menon", due: "Before the next sitting", status: "Not started", note: "2,000 seats and a 3.9 rating — the scale is the problem", tone: "bad" },
  { id: "ia-2", action: "Run the IPR masterclass a second time in May", event: "IPR Masterclass", owner: "Nandita Bose", due: "12 May 2026", status: "Scheduled", note: "84 on the waitlist and the facilitator is available", tone: "accent" },
  { id: "ia-3", action: "Move badge pickup to a second desk for demo day", event: "Demo Day", owner: "Meera Iyer", due: "Before 28 Apr", status: "In progress", note: "The queue was the only thing attendees complained about", tone: "warn" },
  { id: "ia-4", action: "Extend the pilot-scoping clinic to two hours", event: "Go-to-Market Clinic", owner: "Sunita Deshmukh", due: "13 May 2026", status: "Scheduled", note: "38 of 40 seats and the questions deserved longer", tone: "accent" },
  { id: "ia-5", action: "Add a pricing and unit-economics session", event: "Programme", owner: "Karan Chadha", due: "By the end of the quarter", status: "Not started", note: "Three separate requests and no owner", tone: "bad" },
  { id: "ia-6", action: "Widen the mixer invitation beyond cohort members", event: "Founders' Mixer — Chennai", owner: "Divya Menon", due: "Before 09 May", status: "In progress", note: "Too many of the room already know each other", tone: "warn" },
];

/* ── Programme reach, logistics and pace ───────────────────────── */

export const EVENT_REACH: EventReach[] = [
  { label: "Startups using the programme", value: 8, total: 13, note: "62% of the tracked portfolio", tone: "good" },
  { label: "Attended three or more", value: 5, total: 13, note: "The committed half of the cohort", tone: "good" },
  { label: "Attended exactly one", value: 3, total: 13, note: "Usually the masterclass and nothing else", tone: "warn" },
  { label: "Never attended", value: 5, total: 13, note: "FreshChain, GridSense and three more", tone: "bad" },
  { label: "Alumni attending", value: 3, total: 8, note: "Alumni bring their own founders", tone: "accent" },
  { label: "Mentors speaking", value: 5, total: 8, note: "Five of the eight on the bill are on the bench", tone: "accent" },
];

export const EVENT_LOGISTICS: EventLogistics[] = [
  { id: "lg-1", event: "Demo Day — Cohort VI", slug: "demo-day-cohort-vi", venue: "Investor lounge + auditorium", setup: "Doors 15:00, pitches from 16:00", crew: 4, checklist: ["Badge desk", "Data-room terminals", "Second-meeting board", "Pitch timer"], tone: "accent" },
  { id: "lg-2", event: "IPR Masterclass", slug: "ipr-masterclass-apr", venue: "Virtual studio", setup: "Go live 14:30, screen share at 15:00", crew: 1, checklist: ["Recording", "Slides", "Filing template"], tone: "good" },
  { id: "lg-3", event: "Investor Office Hours", slug: "investor-office-hours-apr", venue: "Investor lounge", setup: "Four desks, one per fund", crew: 2, checklist: ["Desk signs", "Deck printer", "Coffee"], tone: "accent" },
  { id: "lg-4", event: "Agentic AI Hackathon", slug: "ai-agents-hackathon", venue: "T-Hub, Hyderabad", setup: "Doors 09:00, briefing 10:00", crew: 6, checklist: ["Team allocation", "Credit hand-out", "Wi-Fi cards", "Judging room"], tone: "warn" },
  { id: "lg-5", event: "Founders' Mixer — Chennai", slug: "founders-mixer-may", venue: "IIT Madras Research Park", setup: "Arrivals 19:00, rounds from 19:45", crew: 3, checklist: ["Name badges", "Dinner seating", "Table cards", "Mentor host"], tone: "default" },
  { id: "lg-6", event: "Scaling Roundtable", slug: "scaling-roundtable", venue: "Boardroom", setup: "Chatham House rule on the table", crew: 1, checklist: ["No recording sign", "Notepads"], tone: "default" },
];

export const REGISTRATION_VELOCITY: RegistrationVelocity[] = [
  { event: "IPR Masterclass", slug: "ipr-masterclass-apr", last7: 0, last30: 214, peak: "12 Mar 2026", note: "Sold out 11 days out — the waitlist is the workshop", tone: "good" },
  { event: "Demo Day — Cohort VI", slug: "demo-day-cohort-vi", last7: 96, last30: 388, peak: "18 Apr 2026", note: "Steady right up to the week", tone: "good" },
  { event: "Founders' Mixer — Chennai", slug: "founders-mixer-may", last7: 41, last30: 87, peak: "This week", note: "New chapter — 58% of capacity in one week", tone: "warn" },
  { event: "Agentic AI Hackathon", slug: "ai-agents-hackathon", last7: 128, last30: 341, peak: "This week", note: "A third of the signups came in the last 7 days", tone: "warn" },
  { event: "Cohort VII Welcome Mixer", slug: "cohort-vii-welcome-mixer", last7: 12, last30: 41, peak: "Not yet", note: "The cohort has not been told the date", tone: "bad" },
  { event: "Reverse Pitch — May", slug: "reverse-pitch-may", last7: 18, last30: 112, peak: "Last week", note: "Only a fifth of the Seed–A book in the city", tone: "default" },
];

export const NO_SHOW_RISK: NoShowRisk[] = [
  { event: "Climate & Storage Economics Webinar", slug: "climate-storage-webinar", risk: 37, driver: "Free, optional and a replay exists", fix: "Cap the seats and add a live Q&A", note: "The worst offender and the easiest to fix", tone: "bad" },
  { event: "Cohort VII Welcome Mixer", slug: "cohort-vii-welcome-mixer", risk: 54, driver: "Nobody has told the cohort", fix: "Announce it, then confirm individually", note: "A no-show is a wasted seat and a bad signal", tone: "bad" },
  { event: "Agentic AI Hackathon", slug: "ai-agents-hackathon", risk: 15, driver: "Paid, team-sized, two days", fix: "Nothing — the commitment is the attendance", note: "Paid events barely no-show", tone: "good" },
  { event: "Founders' Mixer — Chennai", slug: "founders-mixer-may", risk: 23, driver: "Paid and it includes dinner", fix: "Confirm three days out", note: "Payment is the best turn-up guarantee we have", tone: "accent" },
  { event: "Go-to-Market Clinic", slug: "gtm-clinic-meridian", risk: 12, driver: "Midday slot and a named corporate", fix: "Nothing", note: "A named partner is worth a reminder", tone: "good" },
  { event: "IP Filing Clinic", slug: "filing-clinic-jun", risk: 8, driver: "Four slots and people need the filing", fix: "Nothing", note: "Nobody gives up a filing slot", tone: "good" },
];

export const SPEAKER_RATINGS: SpeakerRating[] = [
  { id: "sr-1", name: "Dr. Meera Krishnan", initials: "DM", rating: 4.9, responses: 341, quote: "I filed a provisional patent in the session. I had been putting it off for a year.", tone: "good" },
  { id: "sr-2", name: "Priya Nair", initials: "PN", rating: 4.9, responses: 34, quote: "She found the weak slide in my pitch in four minutes. Nobody else had.", tone: "good" },
  { id: "sr-3", name: "Sunita Deshmukh", initials: "SD", rating: 4.8, responses: 96, quote: "The pilot scoping clinic was worth the whole month on its own.", tone: "good" },
  { id: "sr-4", name: "Vikram Sethi", initials: "VS", rating: 4.6, responses: 48, quote: "Ten minutes, an honest answer, and a partner. That is the whole value.", tone: "accent" },
  { id: "sr-5", name: "Karan Chadha", initials: "KC", rating: 4.4, responses: 100, quote: "Three minutes per team is not enough, but it is all you can do with 100 teams.", tone: "warn" },
  { id: "sr-6", name: "Nikhil Verma", initials: "NV", rating: 4.6, responses: 19, quote: "The only room where I can say what I actually think.", tone: "accent" },
];

export const SPEAKER_AVAILABILITY: SpeakerAvailability[] = [
  { name: "Dr. Meera Krishnan", initials: "DM", slots: "Monthly office hours", blackout: "12–19 Apr · and 10–24 May", canTake: 1, note: "One more sitting possible before the counsel line expires", tone: "warn" },
  { name: "Sunita Deshmukh", initials: "SD", slots: "2 slots / week", blackout: "None booked", canTake: 3, note: "The most available person on the programme", tone: "good" },
  { name: "Priya Nair", initials: "PN", slots: "2 slots / week", blackout: "21–28 Apr · demo day", canTake: 2, note: "Committed to the dry run and demo day", tone: "accent" },
  { name: "Vikram Rao", initials: "VR", slots: "1 slot / week", blackout: "None booked", canTake: 1, note: "One slot a month, and it is usually gone", tone: "warn" },
  { name: "Karan Chadha", initials: "KC", slots: "2 slots / month", blackout: "15–22 May · hackathon", canTake: 1, note: "Free once the hackathon is behind him", tone: "default" },
  { name: "Nikhil Verma", initials: "NV", slots: "2 slots / week", blackout: "None booked", canTake: 2, note: "Available and under-used", tone: "good" },
];

export const FEEDBACK_THEMES: FeedbackTheme[] = [
  { theme: "Hands-on over theory", mentions: 14, sentiment: "Positive", quote: "I left with a draft, not notes.", tone: "good" },
  { theme: "More time on the Q&A", mentions: 11, sentiment: "Negative", quote: "The questions were the best part and we ran out of time.", tone: "bad" },
  { theme: "Peer conversation", mentions: 9, sentiment: "Positive", quote: "The founder next to me had the same problem I did.", tone: "good" },
  { theme: "Speakers over slides", mentions: 8, sentiment: "Positive", quote: "I did not need another deck.", tone: "good" },
  { theme: "Right scale, wrong slot", mentions: 6, sentiment: "Negative", quote: "Thursday lunchtime does not work for a working founder.", tone: "warn" },
  { theme: "Follow-up material", mentions: 5, sentiment: "Negative", quote: "I wanted the templates afterwards, not the slides.", tone: "warn" },
];

export const QUARTER_TREND: QuarterTrend[] = [
  { quarter: "Q3 FY26", rating: 4.1, nps: 44, events: 9, note: "The webinar-heavy quarter — high reach, low scores", tone: "warn" },
  { quarter: "Q4 FY26", rating: 4.3, nps: 51, events: 11, note: "First coworking by the team, the mixer landed", tone: "accent" },
  { quarter: "Q1 FY27", rating: 4.5, nps: 58, events: 10, note: "The masterclass started, and NPS moved with it", tone: "good" },
  { quarter: "Q2 FY27", rating: 4.6, nps: 61, events: 12, note: "This quarter — the dry run and the clinic are working", tone: "good" },
];

/* ── Derived helpers ───────────────────────────────────────────── *//* Every event's capacity, registered and waitlist, in one place. */
export const EVENT_TOTALS = {
  events: EVENTS.length,
  capacity: EVENTS.reduce((s, e) => s + e.capacity, 0),
  registered: EVENTS.reduce((s, e) => s + e.registered, 0),
  waitlist: EVENTS.reduce((s, e) => s + e.waitlist, 0),
  inPerson: EVENTS.filter((e) => e.format === "In-person").length,
  hybrid: EVENTS.filter((e) => e.format === "Hybrid").length,
  virtual: EVENTS.filter((e) => e.format === "Virtual").length,
};

/* Startups that attended, drawn from the tracked portfolio. */
export const EVENT_ATTENDANCE: { startup: string; startupSlug: string; events: number; sessions: string; note: string; tone: Tone }[] = [
  { startup: "Lumen AI", startupSlug: "lumen-ai", events: 6, sessions: "Masterclass, office hours, demo day, GTM clinic, mixer, hackathon", note: "Shows up to everything", tone: "good" },
  { startup: "AquaPure", startupSlug: "aquapure", events: 4, sessions: "Masterclass, demo day, GTM clinic, mixer", note: "A pilot in the making", tone: "good" },
  { startup: "OrbitalWorks", startupSlug: "orbitalworks", events: 4, sessions: "Masterclass, office hours, demo day, roundtable", note: "Came for the corporate playbook", tone: "accent" },
  { startup: "TerraGrid", startupSlug: "terragrid", events: 3, sessions: "Masterclass, demo day, office hours", note: "Working the investor desk", tone: "accent" },
  { startup: "FinEdge", startupSlug: "finedge", events: 3, sessions: "Masterclass, office hours, reverse pitch", note: "Three investor events in a month", tone: "good" },
  { startup: "BloomBio", startupSlug: "bloombio", events: 2, sessions: "Masterclass, filing clinic", note: "Two filings out of one workshop", tone: "good" },
  { startup: "EduFold", startupSlug: "edufold", events: 2, sessions: "Masterclass, mixer", note: "Looking for district introductions", tone: "default" },
  { startup: "FreshChain", startupSlug: "freshchain", events: 1, sessions: "Masterclass", note: "Has not come to a founder-facing event since February", tone: "bad" },
];

/* Sanity: the portfolio must actually contain every startup above. */
export const ATTENDANCE_SLUGS = new Set(PORTFOLIO.map((p) => p.slug));
