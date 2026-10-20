import {
  Activity,
  Banknote,
  Briefcase,
  Building2,
  CircleCheck,
  Clock4,
  Cpu,
  FileWarning,
  GraduationCap,
  Rocket,
  ShieldAlert,
  ShieldCheck,
  Ticket,
  UserCheck,
  Users,
  UserX,
  type LucideIcon,
} from "lucide-react";

/* ------------------------------ executive KPIs ------------------------------ */

export type AdminKpi = {
  icon: LucideIcon;
  label: string;
  value: string;
  delta?: string;
  tone?: "up" | "down" | "flat";
  hint?: string;
};

export const EXEC_KPIS: AdminKpi[] = [
  { icon: Users, label: "Registered users", value: "84,210", delta: "+1,284 this week", tone: "up" },
  { icon: Activity, label: "Active users (30d)", value: "41,906", delta: "+4.1%", tone: "up" },
  { icon: UserCheck, label: "Verified users", value: "52,377", hint: "62% of base" },
  { icon: UserX, label: "Suspended / restricted", value: "1,208", delta: "-3.2% WoW", tone: "up" },
  { icon: Building2, label: "Organizations", value: "9,842", delta: "+96 this week", tone: "up" },
  { icon: Rocket, label: "Verified startups", value: "10,214", delta: "+212", tone: "up" },
  { icon: GraduationCap, label: "Active mentors & experts", value: "2,843", hint: "1,904 IPR experts included" },
  { icon: Briefcase, label: "Active investors", value: "1,462", hint: "312 funds · 1,150 angels" },
];

/* ---------------------------- operational queues ---------------------------- */

export type OpsQueue = {
  icon: LucideIcon;
  title: string;
  count: number;
  severity: "critical" | "high" | "normal";
  note: string;
  href: string;
};

export const OPS_QUEUES: OpsQueue[] = [
  { icon: ShieldCheck, title: "Pending verification requests", count: 186, severity: "high", note: "23 overdue beyond SLA", href: "/admin/verification" },
  { icon: FileWarning, title: "Moderation cases", count: 42, severity: "high", note: "6 escalated · 3 appeals pending", href: "/admin/moderation" },
  { icon: Clock4, title: "Unassigned review queues", count: 31, severity: "normal", note: "Verification 18 · Moderation 13", href: "/admin/verification" },
  { icon: Banknote, title: "Payment exceptions", count: 17, severity: "critical", note: "₹4.6L pending reconciliation", href: "/admin/payments" },
  { icon: Cpu, title: "AI service errors", count: 4, severity: "high", note: "Matching svc latency degraded", href: "/admin/ai" },
  { icon: Ticket, title: "Support escalations", count: 29, severity: "normal", note: "SLA 24h · oldest 19h", href: "/admin/notifications" },
  { icon: Building2, title: "Org onboarding in progress", count: 64, severity: "normal", note: "40 awaiting owner confirmation", href: "/admin/identity/organizations" },
  { icon: CircleCheck, title: "Program applications to review", count: 312, severity: "normal", note: "Frontier Cohort VII closes in 9d", href: "/admin/programs" },
];

/* ------------------------------ ecosystem ---------------------------------- */

export const STARTUPS_BY_STAGE = [
  { label: "Idea", value: 3120 },
  { label: "MVP", value: 2840 },
  { label: "Seed", value: 2160 },
  { label: "Series A", value: 1180 },
  { label: "Growth", value: 640 },
  { label: "Scale", value: 274 },
];

export const STARTUPS_BY_SECTOR = [
  { label: "AI/ML", value: 2410, display: "2,410" },
  { label: "FinTech", value: 1840, display: "1,840" },
  { label: "HealthTech", value: 1520, display: "1,520" },
  { label: "AgriTech", value: 1180, display: "1,180" },
  { label: "Climate", value: 960, display: "960" },
  { label: "DeepTech", value: 720, display: "720" },
  { label: "EdTech", value: 614, display: "614" },
];

export const FUNDING_TREND = [42, 48, 45, 61, 58, 74, 70, 86, 92, 88, 104, 121];

export const ECOSYSTEM_MINI = [
  { label: "Corporate–startup pilots", value: 486, display: "486" },
  { label: "Research → startup transfers", value: 132, display: "132" },
  { label: "Mentorship sessions (30d)", value: 6240, display: "6,240" },
  { label: "IPR filings supported", value: 1942, display: "1,942" },
];

/* ------------------------------ platform health ----------------------------- */

export type HealthService = {
  name: string;
  status: "Operational" | "Degraded" | "Down";
  metric: string;
};

export const HEALTH_SERVICES: HealthService[] = [
  { name: "API gateway", status: "Operational", metric: "99.98% · p95 182ms" },
  { name: "Authentication", status: "Operational", metric: "42 failed logins flagged" },
  { name: "Background jobs", status: "Operational", metric: "1,204 ok · 3 failed" },
  { name: "Database / storage", status: "Operational", metric: "61% · 2.1TB of 3.5TB" },
  { name: "Matching engine", status: "Degraded", metric: "latency p95 1.4s (+3×)" },
  { name: "AI model providers", status: "Operational", metric: "5 of 5 reachable" },
  { name: "Notification delivery", status: "Operational", metric: "98.2% delivered" },
  { name: "Payment gateway", status: "Operational", metric: "webhook sync 14s ago" },
  { name: "Risk engine", status: "Operational", metric: "alerts processed 100%" },
];

/* ------------------------------ action center ------------------------------- */

export type AdminTask = {
  id: string;
  title: string;
  meta: string;
  severity: "critical" | "high" | "normal";
  href: string;
};

export const MY_TASKS: AdminTask[] = [
  { id: "t1", title: "Second-approve: verification revoke — Zenith Traders Pvt Ltd", meta: "Verification · requested by S. Iyer", severity: "critical", href: "/admin/verification" },
  { id: "t2", title: "Review appeal — MediQueue listing restriction", meta: "Moderation · independent review required", severity: "high", href: "/admin/moderation" },
  { id: "t3", title: "Approve payment refund batch (6 refunds, ₹82,400)", meta: "Finance · batch RB-2291", severity: "high", href: "/admin/payments" },
  { id: "t4", title: "Sign off AI model v2.5 promotion to production", meta: "AI Governance · eval report attached", severity: "normal", href: "/admin/ai" },
  { id: "t5", title: "Expiring investor verifications (12) — renewal nudge", meta: "Verification · SLA 5d", severity: "normal", href: "/admin/verification" },
];

export const RECENT_CHANGES = [
  { when: "12m ago", actor: "S. Iyer (Verification)", action: "Approved org verification", target: "Kaveri BioLabs Pvt Ltd" },
  { when: "38m ago", actor: "M.yaml (Finance)", action: "Processed settlement batch", target: "SB-114 · ₹18.2L" },
  { when: "1h ago", actor: "You (Super Admin)", action: "Suspended user account", target: "@arjun.fake — fraud signal" },
  { when: "2h ago", actor: "R. Dev (Ops)", action: "Published program update", target: "Frontier Cohort VII" },
  { when: "3h ago", actor: "A. Bansal (AI Ops)", action: "Rolled back matching config", target: "v18 → v17 (FP spike)" },
  { when: "5h ago", actor: "S. Iyer (Verification)", action: "Requested additional evidence", target: "Northern Angels LLP" },
];

export const FAILED_OPS = [
  { what: "Bulk email — Frontier reminders", why: "214 of 8,412 failed (provider throttle)", when: "26m ago" },
  { what: "Payout — AquaTrace settlement", why: "Bank account unverified", when: "1h ago" },
  { what: "Export — Ecosystem report Q1", why: "Query timeout (>10M rows)", when: "Yesterday" },
];
