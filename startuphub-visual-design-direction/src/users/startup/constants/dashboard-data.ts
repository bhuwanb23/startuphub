import {
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  CircleDollarSign,
  FileText,
  Layers,
  Scale,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

export const dashKpis = [
  { icon: Target, label: "Readiness score", value: "78", delta: "+6 this month", tone: "good" as const },
  { icon: Layers, label: "Validation score", value: "82%", delta: "4 experiments live", tone: "default" as const },
  { icon: Scale, label: "IP assets", value: "11", delta: "1 filing in progress", tone: "default" as const },
  { icon: CircleDollarSign, label: "Runway", value: "11.2 mo", delta: "Post Series A", tone: "good" as const },
];

export const milestones = [
  { name: "MVP v2 release", due: "Apr 12", pct: 82, status: "On track" },
  { name: "Pilot 3 — cooperative rollout", due: "Apr 26", pct: 45, status: "On track" },
  { name: "Complete patent claims", due: "Apr 09", pct: 28, status: "At risk" },
  { name: "Series A data room refresh", due: "May 02", pct: 60, status: "On track" },
];

export const tasks = [
  { title: "Complete patent claim review", tag: "IPR", due: "Today", done: false },
  { title: "Send pilot metrics to Northgate", tag: "Funding", due: "Tomorrow", done: false },
  { title: "Review mentor session notes", tag: "Mentors", due: "Apr 08", done: false },
  { title: "Publish MVP v2 changelog", tag: "Product", due: "Apr 12", done: true },
  { title: "Update runway forecast", tag: "Finance", due: "Apr 15", done: false },
];

export const copilotFeed = {
  action: "Attach the two pilot testimonials to your data room before Thursday's investor call.",
  why: "Northgate flagged 'reference customers' as their top diligence item. Both testimonials are approved and ready in Documents.",
  impact: "High",
  alternatives: [
    { title: "File trademark for the v2 product name", why: "Launch announcement is 9 days out — protect before disclosure.", impact: "Medium" },
    { title: "Respond to Horizon's pilot RFP", why: "Deadline in 4 days and your water-reuse metrics fit perfectly.", impact: "Medium" },
    { title: "Book Meera's Q2 IP portfolio review", why: "Your complete specification window closes in 11 weeks.", impact: "Low" },
  ],
};

export const risks = [
  { level: "High", text: "Patent claims review is blocking the complete spec filing (11 weeks left)." },
  { level: "Medium", text: "Pilot 3 rollout depends on cooperative sign-off expected this week." },
  { level: "Low", text: "Two mentor sessions unscheduled for April — drift risk on GTM." },
];

export const opportunities = [
  { title: "AgriTech Innovation Challenge 2026", meta: "₹50L pool · closes in 11 days", fit: 94 },
  { title: "Smart Water Metering Pilot", meta: "Kochi Water Authority · paid pilot", fit: 88 },
  { title: "Climate Sandbox Accelerator", meta: "$120K · closes in 8 days", fit: 81 },
];

export const fundingStatus = { round: "Series A", raised: "₹2.4 Cr", investors: 6, readiness: 78, next: "Follow-on conversations · Q3" };

export const iprStatus = { assets: 11, filings: 1, upcoming: "Complete spec window — 11 weeks", risk: "Claims review overdue" };

/* The resource card on the dashboard reads the resource workspace's own
   ledger (see overview.tsx) so the two screens can never disagree on
   what is live, what is left, or what is about to lapse. */

export const events = [
  { name: "Demo Day — Cohort VI", when: "Apr 28 · Bengaluru", going: true },
  { name: "IPR Masterclass", when: "Apr 03 · Virtual", going: true },
  { name: "Founder Mixer — BLR", when: "May 09 · Bengaluru", going: false },
];

export const mentorActions = [
  { mentor: "Priya Nair", action: "Weekly architecture review", when: "Thu 16:00", type: "Session" },
  { mentor: "Vikram Rao", action: "Retention deep-dive prep", when: "Submit by Fri", type: "Action" },
];

export const activity = [
  { icon: FileText, text: "Data room viewed by Northgate Partners", when: "2h ago" },
  { icon: Users, text: "Meera accepted the IPR review session", when: "5h ago" },
  { icon: Scale, text: "Patent claims v3 uploaded", when: "1d ago" },
  { icon: Sparkles, text: "Copilot flagged 2 new match opportunities", when: "1d ago" },
  { icon: CalendarDays, text: "Pilot 3 kickoff confirmed for Apr 26", when: "2d ago" },
];

export const riskTone: Record<string, "bad" | "warn" | "default"> = {
  High: "bad",
  Medium: "warn",
  Low: "default",
};
export const taskIcon = CheckCircle2;
export const riskIcon = AlertTriangle;
