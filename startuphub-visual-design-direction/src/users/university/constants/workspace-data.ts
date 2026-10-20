/* Documents, calendar, messages, notifications and activity datasets */

export const DOC_CATEGORIES = ["All", "Research", "Patents", "Agreements", "Funding", "Templates"] as const;

export type UniDocument = {
  name: string;
  type: (typeof DOC_CATEGORIES)[number];
  owner: string;
  updated: string;
  size: string;
  access: "Restricted" | "Department" | "Institution" | "Public";
};

export const DOCUMENTS: UniDocument[] = [
  { name: "Invention Disclosure — IN2024077.docx", type: "Patents", owner: "TTO", updated: "2h ago", size: "212 KB", access: "Restricted" },
  { name: "Complete Specification — IN2024110.pdf", type: "Patents", owner: "TTO · External counsel", updated: "Yesterday", size: "3.4 MB", access: "Restricted" },
  { name: "Exclusive License — AquaPure × Crestmont.pdf", type: "Agreements", owner: "Legal Cell", updated: "Mar 04", size: "1.1 MB", access: "Restricted" },
  { name: "NDA — MediRay Devices.pdf", type: "Agreements", owner: "Legal Cell", updated: "Feb 27", size: "420 KB", access: "Department" },
  { name: "SSB Electrolyte — Progress Report Q4.pdf", type: "Research", owner: "Dr. I. Sheikh", updated: "Feb 25", size: "2.8 MB", access: "Department" },
  { name: "National Agri Mission — Phase II Sanction.pdf", type: "Funding", owner: "Research Office", updated: "Feb 18", size: "640 KB", access: "Institution" },
  { name: "Technology Disclosure Template v4.docx", type: "Templates", owner: "TTO", updated: "Jan 30", size: "96 KB", access: "Public" },
  { name: "IP Policy — 2026 Revision.pdf", type: "Agreements", owner: "Registrar", updated: "Jan 12", size: "880 KB", access: "Institution" },
];

export const DOC_ACCESS_TONE: Record<UniDocument["access"], string> = {
  Restricted: "bg-red-50 text-red-600",
  Department: "bg-amber-50 text-amber-700",
  Institution: "bg-accent-soft text-accent-deep",
  Public: "bg-emerald-50 text-emerald-700",
};

/* ---------------- Calendar ---------------- */

export const CALENDAR_DAYS: {
  day: string;
  date: string;
  events: { time: string; title: string; kind: string }[];
}[] = [
  {
    day: "Mon", date: "Mar 16",
    events: [
      { time: "10:00", title: "TTO weekly pipeline review", kind: "Internal" },
      { time: "14:30", title: "AquaPure negotiation — biosensor", kind: "Licensing" },
      { time: "17:00", title: "Lab booking window closes", kind: "Infrastructure" },
    ],
  },
  {
    day: "Tue", date: "Mar 17",
    events: [
      { time: "09:30", title: "SSB electrolyte — quarterly review", kind: "Project review" },
      { time: "15:00", title: "Spin-off mentor sync — Pestlens", kind: "Commercialization" },
    ],
  },
  {
    day: "Wed", date: "Mar 18",
    events: [
      { time: "11:00", title: "Complete specification due — IN2024110", kind: "Patent deadline" },
      { time: "16:00", title: "Industry consortium pre-call", kind: "Funding" },
    ],
  },
  {
    day: "Fri", date: "Mar 20",
    events: [
      { time: "10:30", title: "Deep-Tech Mission proposal lock", kind: "Grant deadline" },
      { time: "13:00", title: "Showcase review — 4 new technologies", kind: "Commercialization" },
      { time: "18:00", title: "Founders dinner — Batch 07", kind: "Ecosystem" },
    ],
  },
];

export const EVENT_TONE: Record<string, string> = {
  "Patent deadline": "bg-red-50 text-red-600",
  "Grant deadline": "bg-amber-50 text-amber-700",
  Licensing: "bg-accent-soft text-accent-deep",
  "Project review": "bg-slate-100 text-slate-600",
  Infrastructure: "bg-slate-100 text-slate-600",
  Commercialization: "bg-accent-soft text-accent-deep",
  Funding: "bg-emerald-50 text-emerald-700",
  Internal: "bg-slate-100 text-slate-600",
  Ecosystem: "bg-slate-100 text-slate-600",
};

/* ---------------- Messages ---------------- */

export type Message = { from: string; text: string; time: string; mine?: boolean };
export type Conversation = {
  id: string;
  name: string;
  role: string;
  preview: string;
  time: string;
  unread: number;
  messages: Message[];
};

export const CONVERSATIONS: Conversation[] = [
  {
    id: "c1", name: "AquaPure Industries", role: "Corporate · Licensing",
    preview: "We can accept the 4% royalty if exclusivity stays India-only…", time: "10:42", unread: 2,
    messages: [
      { from: "Rohan Kapoor", text: "Thanks for the revised term sheet. Two points from our board.", time: "10:31" },
      { from: "Rohan Kapoor", text: "We can accept the 4% royalty if exclusivity stays India-only.", time: "10:32" },
      { from: "Dr. Amara Deshpande", text: "India-only field-of-use works for us. I'll confirm with legal today.", time: "10:38", mine: true },
      { from: "Rohan Kapoor", text: "Great — also need the validation data annexure for our diligence call Thursday.", time: "10:42" },
    ],
  },
  {
    id: "c2", name: "Dr. Vikram Acharya", role: "Researcher · CS",
    preview: "The pest model hit 93% field accuracy on the new cohort.", time: "09:15", unread: 0,
    messages: [
      { from: "Dr. Vikram Acharya", text: "The pest model hit 93% field accuracy on the new cohort.", time: "09:12" },
      { from: "Dr. Amara Deshpande", text: "Excellent — that's showcase-ready. Want me to publish the tech profile?", time: "09:15", mine: true },
    ],
  },
  {
    id: "c3", name: "AgriSense AI", role: "Startup · License enquiry",
    preview: "Is the pest-vision model available for a non-exclusive license?", time: "Yesterday", unread: 1,
    messages: [
      { from: "Ananya Rao", text: "Hi Dr. Deshpande — is the pest-vision model available for a non-exclusive license?", time: "Yesterday" },
    ],
  },
  {
    id: "c4", name: "IP Cell — External Counsel", role: "Legal",
    preview: "Complete specification draft for IN2024110 is ready for review.", time: "Yesterday", unread: 0,
    messages: [
      { from: "Mehta & Rao IP", text: "Complete specification draft for IN2024110 is ready for your review.", time: "Yesterday" },
    ],
  },
  {
    id: "c5", name: "RootStack team", role: "Spin-off",
    preview: "Batch validation slot confirmed at BSL-2 for Mar 21.", time: "Sat", unread: 0,
    messages: [
      { from: "Kabir S", text: "Batch validation slot confirmed at BSL-2 for Mar 21. Sharing the protocol doc.", time: "Sat" },
    ],
  },
];

/* ---------------- Notifications ---------------- */

export const NOTIF_CATEGORIES = ["All", "IP", "Funding", "Licensing", "Matches", "Infrastructure"] as const;

export type UniNotification = {
  title: string;
  detail: string;
  time: string;
  category: Exclude<(typeof NOTIF_CATEGORIES)[number], "All">;
  unread: boolean;
};

export const NOTIFICATIONS: UniNotification[] = [
  { title: "Complete specification due", detail: "IN2024110 — arsenic biosensor · 6 days remaining", time: "1h ago", category: "IP", unread: true },
  { title: "New license request", detail: "AgriSense AI requested non-exclusive rights to pest-vision model", time: "3h ago", category: "Licensing", unread: true },
  { title: "Startup match · 92 fit", detail: "AgriSense AI matched to your AI & Agri portfolio", time: "5h ago", category: "Matches", unread: true },
  { title: "Deep-Tech Mission opens", detail: "₹25L–₹1Cr window · closes Apr 30", time: "1d ago", category: "Funding", unread: true },
  { title: "Lab booking request", detail: "RootStack — BSL-2, Mar 21, 4 hours", time: "1d ago", category: "Infrastructure", unread: false },
  { title: "Patent granted", detail: "IN2022089 — bidirectional EV charging topology", time: "2d ago", category: "IP", unread: false },
  { title: "Grant awarded", detail: "National Agri Mission Phase II — ₹48L sanctioned", time: "3d ago", category: "Funding", unread: false },
  { title: "Showcase enquiry", detail: "Terraforma Corp viewed nanocoating profile 6 times", time: "3d ago", category: "Matches", unread: false },
];

/* ---------------- Activity ---------------- */

export const ACTIVITY: { actor: string; action: string; entity: string; time: string; kind: "ip" | "research" | "infra" | "comm" | "doc" }[] = [
  { actor: "Legal Cell", action: "uploaded agreement", entity: "Exclusive License — AquaPure × Crestmont", time: "1h ago", kind: "doc" },
  { actor: "TTO", action: "moved to negotiation", entity: "Arsenic biosensor → AquaPure", time: "2h ago", kind: "comm" },
  { actor: "Dr. I. Sheikh", action: "updated progress", entity: "SSB electrolyte — 41% budget utilized", time: "4h ago", kind: "research" },
  { actor: "IP Cell", action: "filed", entity: "TM2025091 — RootStack logotype", time: "1d ago", kind: "ip" },
  { actor: "Facilities", action: "approved booking", entity: "HPC Cluster — pest model run", time: "1d ago", kind: "infra" },
  { actor: "TTO", action: "published showcase", entity: "Nanocoating formulation", time: "2d ago", kind: "comm" },
  { actor: "Research Office", action: "recorded award", entity: "Agri Mission Phase II — ₹48L", time: "3d ago", kind: "research" },
  { actor: "IP Cell", action: "marked granted", entity: "IN2022089 — EV charging topology", time: "3d ago", kind: "ip" },
];

export const ACTIVITY_TONE: Record<string, string> = {
  ip: "bg-accent",
  research: "bg-emerald-500",
  infra: "bg-amber-500",
  comm: "bg-sky-500",
  doc: "bg-slate-400",
};
