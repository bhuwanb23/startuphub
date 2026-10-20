/* Documents, calendar, messages, notifications and activity datasets */

export const DOC_CATEGORIES = ["All", "Resume", "Certificates", "Contracts", "Work samples", "Invoices"] as const;

export type TalentDocument = {
  name: string;
  type: (typeof DOC_CATEGORIES)[number];
  updated: string;
  size: string;
  visibility: "Public" | "Matches" | "Private";
};

export const DOCUMENTS: TalentDocument[] = [
  { name: "Zoya_Khan_Resume_2026.pdf", type: "Resume", updated: "Mar 12", size: "340 KB", visibility: "Matches" },
  { name: "Cover letter — AgriSense AI.pdf", type: "Resume", updated: "Mar 08", size: "120 KB", visibility: "Private" },
  { name: "AWS SA Professional.pdf", type: "Certificates", updated: "Jan 2026", size: "660 KB", visibility: "Public" },
  { name: "Stanford ML Specialization.pdf", type: "Certificates", updated: "Nov 2025", size: "510 KB", visibility: "Public" },
  { name: "Consulting retainer — Ledgerline.pdf", type: "Contracts", updated: "Mar 05", size: "880 KB", visibility: "Private" },
  { name: "NDA — Terraforma Corp.pdf", type: "Contracts", updated: "Mar 10", size: "290 KB", visibility: "Private" },
  { name: "OrbitPay treasury case study.pdf", type: "Work samples", updated: "Feb 20", size: "2.1 MB", visibility: "Matches" },
  { name: "Invoice #INV-2026-031 — Pestlens.pdf", type: "Invoices", updated: "Mar 14", size: "95 KB", visibility: "Private" },
];

export const DOC_VIS_TONE: Record<TalentDocument["visibility"], string> = {
  Public: "bg-emerald-50 text-emerald-700",
  Matches: "bg-accent-soft text-accent-deep",
  Private: "bg-slate-100 text-slate-500",
};

export const CALENDAR_DAYS: {
  day: string;
  date: string;
  events: { time: string; title: string; kind: string }[];
}[] = [
  {
    day: "Mon", date: "Mar 16",
    events: [
      { time: "16:00", title: "Prep block — AgriSense system design", kind: "Personal" },
      { time: "17:00", title: "Round 3 interview — AgriSense AI", kind: "Interview" },
    ],
  },
  {
    day: "Tue", date: "Mar 17",
    events: [
      { time: "11:00", title: "Pestlens · API contract review", kind: "Deliverable" },
      { time: "15:30", title: "Ledger-kit v2.1 maintainer sync", kind: "Meeting" },
    ],
  },
  {
    day: "Wed", date: "Mar 18",
    events: [
      { time: "15:30", title: "Intro call — RootStack founders", kind: "Interview" },
      { time: "18:00", title: "Advisory session — Batch 06 team", kind: "Consulting" },
    ],
  },
  {
    day: "Fri", date: "Mar 20",
    events: [
      { time: "10:00", title: "Ledgerline offer response deadline", kind: "Deadline" },
      { time: "14:00", title: "Cost-guardrail runbook due", kind: "Deliverable" },
    ],
  },
];

export const EVENT_TONE: Record<string, string> = {
  Interview: "bg-accent-soft text-accent-deep",
  Deadline: "bg-red-50 text-red-600",
  Deliverable: "bg-amber-50 text-amber-700",
  Consulting: "bg-emerald-50 text-emerald-700",
  Meeting: "bg-slate-100 text-slate-600",
  Personal: "bg-slate-100 text-slate-600",
};

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
    id: "c1", name: "AgriSense AI", role: "Startup · Hiring",
    preview: "Looking forward to your system design round at 5!", time: "11:20", unread: 1,
    messages: [
      { from: "Nikhil (CTO)", text: "Hi Zoya — looking forward to your system design round at 5!", time: "11:18" },
      { from: "Nikhil (CTO)", text: "We'll whiteboard the offline-sync dashboard. Bring your war stories.", time: "11:20" },
      { from: "Zoya Khan", text: "Perfect — I'll have the tiling trade-off notes ready. See you at 5.", time: "11:24", mine: true },
    ],
  },
  {
    id: "c2", name: "Ledgerline Talent", role: "Client · Offer",
    preview: "Offer letter attached — happy to walk the terms live.", time: "Yesterday", unread: 1,
    messages: [
      { from: "Priya S", text: "Offer letter attached — ₹4.8L retainer, 6 months. Happy to walk the terms live.", time: "Yesterday" },
      { from: "Zoya Khan", text: "Received, thanks. I've sent one question on the termination clause.", time: "Yesterday", mine: true },
    ],
  },
  {
    id: "c3", name: "Kabir S", role: "RootStack · Founder",
    preview: "Founders would love to meet Wednesday — 3:30 work?", time: "Yesterday", unread: 0,
    messages: [
      { from: "Kabir S", text: "Founders would love to meet Wednesday — 3:30 work?", time: "Yesterday" },
      { from: "Zoya Khan", text: "3:30 is good. Send the deck and I'll come with questions.", time: "Yesterday", mine: true },
    ],
  },
  {
    id: "c4", name: "Pestlens eng channel", role: "Project team",
    preview: "Contract pack looks great — two nits in review.", time: "Sat", unread: 0,
    messages: [
      { from: "Dev M", text: "Contract pack looks great — two nits in review, mostly naming.", time: "Sat" },
    ],
  },
];

export const NOTIF_CATEGORIES = ["All", "Matches", "Applications", "Interviews", "Offers", "Work"] as const;

export type TalentNotification = {
  title: string;
  detail: string;
  time: string;
  category: Exclude<(typeof NOTIF_CATEGORIES)[number], "All">;
  unread: boolean;
};

export const NOTIFICATIONS: TalentNotification[] = [
  { title: "New match · 94 fit", detail: "AgriSense AI — Founding Frontend Engineer", time: "1h ago", category: "Matches", unread: true },
  { title: "Interview today 5 PM", detail: "Round 3 · AgriSense AI · Meet link in invite", time: "3h ago", category: "Interviews", unread: true },
  { title: "Offer expires in 5 days", detail: "Ledgerline consulting retainer — respond by Mar 21", time: "6h ago", category: "Offers", unread: true },
  { title: "Shortlisted", detail: "MedSynapse — Clinical NLP Pipeline", time: "1d ago", category: "Applications", unread: true },
  { title: "Deliverable in review", detail: "Pestlens — API contract pack", time: "1d ago", category: "Work", unread: false },
  { title: "3 new opportunities above 80 fit", detail: "This week's recommendation batch is ready", time: "2d ago", category: "Matches", unread: false },
  { title: "Application viewed", detail: "Terraforma Corp opened your profile twice", time: "3d ago", category: "Applications", unread: false },
  { title: "New review received", detail: "Kabir S rated your engagement 4.5", time: "3d ago", category: "Work", unread: false },
];

export const ACTIVITY: { actor: string; action: string; entity: string; time: string; kind: "app" | "work" | "profile" | "rep" | "doc" }[] = [
  { actor: "You", action: "received offer from", entity: "Ledgerline — consulting retainer", time: "6h ago", kind: "app" },
  { actor: "Pestlens", action: "opened review on", entity: "API contract pack", time: "1d ago", kind: "work" },
  { actor: "You", action: "applied to", entity: "AI Prototype Sprint — Nexus Labs", time: "2d ago", kind: "app" },
  { actor: "You", action: "updated", entity: "Resume 2026 + case study", time: "2d ago", kind: "doc" },
  { actor: "Kabir S", action: "left a 4.5 review on", entity: "RootStack advisory engagement", time: "3d ago", kind: "rep" },
  { actor: "You", action: "set availability to", entity: "Open to select engagements", time: "4d ago", kind: "profile" },
  { actor: "You", action: "counter-offered", entity: "Ledgerline termination clause", time: "4d ago", kind: "app" },
];

export const ACTIVITY_TONE: Record<string, string> = {
  app: "bg-accent",
  work: "bg-emerald-500",
  profile: "bg-sky-500",
  rep: "bg-amber-500",
  doc: "bg-slate-400",
};
