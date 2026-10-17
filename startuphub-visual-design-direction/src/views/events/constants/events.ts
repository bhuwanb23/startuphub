export type StartupEvent = {
  slug: string;
  type: "Hackathon" | "Workshop" | "Webinar" | "Demo Day" | "Investor Event" | "Networking" | "Conference";
  title: string;
  day: string;
  mon: string;
  dateLine: string;
  time: string;
  location: string;
  format: "In-person" | "Virtual" | "Hybrid";
  organizer: string;
  overview: string;
  speakers: { name: string; role: string }[];
  agenda: { time: string; item: string }[];
  eligibility: string[];
  seats: string;
  fee: string;
  tags: string[];
};

export const eventTypes = ["Hackathon", "Workshop", "Webinar", "Demo Day", "Investor Event", "Networking", "Conference"];

export const events: StartupEvent[] = [
  {
    slug: "demoday-cohort-vi",
    type: "Demo Day",
    title: "StartupHub Labs Demo Day — Cohort VI",
    day: "28", mon: "MAR",
    dateLine: "Saturday, March 28, 2026",
    time: "14:00 – 18:00 IST",
    location: "StartupHub Campus, Bengaluru",
    format: "Hybrid",
    organizer: "StartupHub Labs",
    overview: "Fourteen startups graduate Cohort VI with five-minute pitches and verified traction data. Every deck comes with a live data room; every investor seat is double opt-in. The room historically produces 60%+ second meetings.",
    speakers: [
      { name: "Vikram Sethi", role: "GP, Northgate Partners (judge)" },
      { name: "Ananya Rao", role: "CEO, Lumen AI (alum)" },
      { name: "Meera Krishnan", role: "Head of Ecosystem, StartupHub" },
      { name: "Arjun Shah", role: "Head of Intelligence (host)" },
    ],
    agenda: [
      { time: "14:00", item: "Doors, badges & data-room access" },
      { time: "14:30", item: "Opening: state of the cohort" },
      { time: "14:50", item: "Pitches — block 1 (7 startups)" },
      { time: "16:10", item: "Pitches — block 2 (7 startups)" },
      { time: "17:20", item: "Investor-founder matched networking" },
      { time: "18:00", item: "Close & cohort photo" },
    ],
    eligibility: ["Verified investors & funds", "Corporate innovation teams", "Ecosystem partners by invitation"],
    seats: "240 in-person · 1,200 virtual",
    fee: "Free (vetted registration)",
    tags: ["Cohort VI", "Seed stage", "Investors welcome"],
  },
  {
    slug: "ai-agents-hackathon",
    type: "Hackathon",
    title: "Agentic AI National Hackathon",
    day: "11", mon: "APR",
    dateLine: "April 11–12, 2026 · 36 hours",
    time: "09:00 Sat – 21:00 Sun IST",
    location: "T-Hub, Hyderabad",
    format: "In-person",
    organizer: "StartupHub × Nimbus Cloud",
    overview: "36 hours to ship a working AI agent that solves a real operational problem — with $20K in credits, GPU clusters on tap, and every winning team fast-tracked into incubation. Judges score deployed demos, not slideware.",
    speakers: [
      { name: "Nikhil Rao", role: "CTO, StartupHub" },
      { name: "Dr. Priya Anand", role: "AI Research Lead, Nimbus" },
      { name: "Kabir Malhotra", role: "CEO, FinEdge" },
    ],
    agenda: [
      { time: "Day 1 · 09:00", item: "Check-in + team formation" },
      { time: "Day 1 · 11:00", item: "Problem statements released" },
      { time: "Day 1 · 20:00", item: "Mentor round 1 — architecture" },
      { time: "Day 2 · 10:00", item: "Mentor round 2 — demo readiness" },
      { time: "Day 2 · 17:00", item: "Final demos & judging" },
      { time: "Day 2 · 20:00", item: "Awards & incubation offers" },
    ],
    eligibility: ["Teams of 2–4", "At least one builder who codes", "Students & professionals welcome"],
    seats: "400 hackers · 100 teams",
    fee: "₹499 per team",
    tags: ["AI agents", "36 hours", "$20K credits"],
  },
  {
    slug: "ipr-masterclass-series",
    type: "Workshop",
    title: "IPR Masterclass: File Before You Pitch",
    day: "03", mon: "APR",
    dateLine: "Friday, April 3, 2026",
    time: "15:00 – 17:30 IST",
    location: "Virtual (live)",
    format: "Virtual",
    organizer: "StartupHub IPR Desk",
    overview: "A working session, not a lecture: bring your invention summary and leave with a filing roadmap — what's patentable, what to file first, and the exact fixed-fee path. Includes a live teardown of two volunteer startups' IP positions.",
    speakers: [
      { name: "Dr. Meera Krishnan", role: "IPR Attorney, 19 yrs" },
      { name: "Arvind Seshadri", role: "Patent Agent, DeepTech" },
    ],
    agenda: [
      { time: "15:00", item: "The 4 IP instruments in 15 minutes" },
      { time: "15:20", item: "Provisional vs complete — the timing game" },
      { time: "16:00", item: "Live teardown: two startups' IP positions" },
      { time: "16:45", item: "Your filing roadmap worksheet" },
      { time: "17:15", item: "Q&A" },
    ],
    eligibility: ["Founders any stage", "CTOs & product leads", "Limited to 2 per company"],
    seats: "500 seats",
    fee: "Free for members · ₹999 public",
    tags: ["IPR", "Hands-on", "Founders"],
  },
  {
    slug: "investor-reverse-pitch",
    type: "Investor Event",
    title: "Reverse Pitch: Investors Present to Founders",
    day: "17", mon: "APR",
    dateLine: "Friday, April 17, 2026",
    time: "18:00 – 20:30 IST",
    location: "WeWork Galaxy, Mumbai",
    format: "In-person",
    organizer: "StartupHub Capital Network",
    overview: "The tables turn: eight funds get five minutes each to pitch their thesis, cheque size and what they actually add post-investment. Founders then book 1:1 slots with the funds that fit — no cold decks, ever again.",
    speakers: [
      { name: "Vikram Sethi", role: "Northgate Partners" },
      { name: "Team Atlas", role: "Atlas Capital" },
      { name: "Team Vertex", role: "Vertex Global" },
      { name: "Team Samriddhi", role: "Samriddhi Fund" },
    ],
    agenda: [
      { time: "18:00", item: "Check-in & founder badge pickup" },
      { time: "18:20", item: "Fund pitches — 8 × 5 minutes" },
      { time: "19:10", item: "Founder questions, open floor" },
      { time: "19:30", item: "1:1 booking windows open" },
      { time: "20:30", item: "Close" },
    ],
    eligibility: ["Funded startups raising in 12 months", "Readiness score 60+ preferred", "Founders only, no service providers"],
    seats: "180 founders",
    fee: "Free (vetted)",
    tags: ["Fundraising", "Seed–A", "Mumbai"],
  },
  {
    slug: "founder-mixer-chennai",
    type: "Networking",
    title: "Founders' Mixer — Chennai Chapter",
    day: "24", mon: "APR",
    dateLine: "Friday, April 24, 2026",
    time: "19:00 – 22:00 IST",
    location: "IIT Madras Research Park",
    format: "In-person",
    organizer: "StartupHub Chennai",
    overview: "No panels, no pitches — just 150 curated founders, structured introductions and one legendary filter-coffee station. Matching cards connect you to the six people in the room you should actually meet.",
    speakers: [{ name: "Daniel Mathew", role: "CEO, OrbitalWorks (host)" }],
    agenda: [
      { time: "19:00", item: "Badges & matching cards" },
      { time: "19:20", item: "Structured intro rounds (6 × 8 min)" },
      { time: "20:30", item: "Open networking & coffee" },
      { time: "22:00", item: "Close" },
    ],
    eligibility: ["Founders & founding team only", "Chennai metro"],
    seats: "150 seats",
    fee: "₹299 (includes dinner)",
    tags: ["Networking", "Chennai", "Curated"],
  },
  {
    slug: "climate-webinar-storage",
    type: "Webinar",
    title: "The Storage Economics Webinar",
    day: "09", mon: "APR",
    dateLine: "Thursday, April 9, 2026",
    time: "16:00 – 17:00 IST",
    location: "Virtual (live + replay)",
    format: "Virtual",
    organizer: "SH Intelligence",
    overview: "Storage just became the cheapest grid asset in India. We walk through live dispatch data from 41 MWh of assets and what the new economics mean for founders building in climate.",
    speakers: [
      { name: "Ishita Kulkarni", role: "CEO, TerraGrid" },
      { name: "Arjun Shah", role: "Head of Intelligence" },
    ],
    agenda: [
      { time: "16:00", item: "The 2026 storage cost curve" },
      { time: "16:20", item: "Live dispatch data walkthrough" },
      { time: "16:40", item: "Founder opportunities in the stack" },
      { time: "16:50", item: "Q&A" },
    ],
    eligibility: ["Open to all"],
    seats: "2,000 seats",
    fee: "Free",
    tags: ["Climate", "Data talk", "Replay available"],
  },
  {
    slug: "innovation-summit-2026",
    type: "Conference",
    title: "National Innovation Ecosystem Summit 2026",
    day: "07", mon: "MAY",
    dateLine: "May 7–8, 2026 · Two days",
    time: "09:30 – 18:00 IST",
    location: "Pragati Maidan, New Delhi",
    format: "In-person",
    organizer: "StartupHub × State Innovation Councils",
    overview: "Two days, four stages, 3,000 attendees: the annual gathering of India's ecosystem builders — government, incubators, investors and founders in one working summit. Policy launches, ecosystem reports and 200+ curated meetings.",
    speakers: [
      { name: "Dr. Kavya Reddy", role: "State Innovation Council" },
      { name: "Aarav Mehta", role: "Founder & CEO, StartupHub" },
      { name: "Ministerial keynote", role: "TBA" },
      { name: "12 more speakers", role: "Announced weekly" },
    ],
    agenda: [
      { time: "Day 1 · 09:30", item: "Opening keynote & policy launch" },
      { time: "Day 1 · 11:00", item: "Ecosystem Report 2026 release" },
      { time: "Day 1 · 13:30", item: "Track stages + expo floor" },
      { time: "Day 2 · 09:30", item: "Investor-governments roundtables" },
      { time: "Day 2 · 14:00", item: "200+ curated one-on-one meetings" },
      { time: "Day 2 · 17:00", item: "National awards & close" },
    ],
    eligibility: ["Founders", "Ecosystem professionals", "Government & policy teams", "Students (day 2)"],
    seats: "3,000 attendees",
    fee: "₹1,499 early bird",
    tags: ["Flagship", "Policy", "2 days", "Delhi"],
  },
];
