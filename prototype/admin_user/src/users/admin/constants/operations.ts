import type { TimelineEvent } from "../components/shared/directory";

/* ------------------------------- notifications ------------------------------ */

export const NOTIF_CHANNELS = [
  { name: "In-app", delivered: "1.2M / 30d", rate: "100%", failures: 0, note: "Always available" },
  { name: "Email", delivered: "842K / 30d", rate: "98.2%", failures: 214, note: "Provider throttle incident today" },
  { name: "Push", delivered: "396K / 30d", rate: "96.4%", failures: 88, note: "Token expiry batch retried" },
  { name: "SMS", delivered: "48K / 30d", rate: "99.1%", failures: 12, note: "DLT-registered templates only" },
];

export type TemplateRow = {
  id: number;
  name: string;
  trigger: string;
  channels: string;
  version: string;
  status: string;
  timeline: TimelineEvent[];
};

export const NOTIF_TEMPLATES: TemplateRow[] = [
  { id: 1, name: "user.registration.welcome", trigger: "Account created", channels: "Email · In-app", version: "v14", status: "Published", timeline: [] },
  { id: 2, name: "verification.decision", trigger: "Verification approved / rejected", channels: "Email · In-app · SMS", version: "v9", status: "Published", timeline: [{ when: "Apr 09", actor: "R. Dev (Ops)", action: "v9 published — added re-apply link" }] },
  { id: 3, name: "security.alert", trigger: "Login anomaly / account lock", channels: "Email · SMS · Push", version: "v6", status: "Published", timeline: [] },
  { id: 4, name: "program.application.update", trigger: "Shortlist / rejection / waitlist", channels: "Email · In-app", version: "v11", status: "Published", timeline: [] },
  { id: 5, name: "match.created", trigger: "New mentor / investor match", channels: "In-app · Email (digest)", version: "v7", status: "Published", timeline: [] },
  { id: 6, name: "event.reminder", trigger: "T-24h and T-1h before event", channels: "Email · Push", version: "v5", status: "Published", timeline: [] },
  { id: 7, name: "payment.update", trigger: "Receipt / refund / failure", channels: "Email · In-app", version: "v8", status: "Published", timeline: [] },
  { id: 8, name: "moderation.decision", trigger: "Enforcement / appeal outcome", channels: "Email · In-app", version: "v4", status: "In review", timeline: [{ when: "Apr 13", actor: "Legal", action: "Reviewing policy wording before re-publish" }] },
  { id: 9, name: "digest.weekly.ecosystem", trigger: "Weekly Monday 09:00", channels: "Email", version: "v22", status: "Published", timeline: [] },
];

export type DeliveryRow = {
  id: number;
  campaign: string;
  audience: string;
  sent: string;
  status: string;
  failed: number;
  when: string;
};

export const DELIVERY_LOG: DeliveryRow[] = [
  { id: 1, campaign: "Frontier VII deadline reminder", audience: "4,214 eligible founders", sent: "8,412 delivered", status: "Partial", failed: 214, when: "26m ago" },
  { id: 2, campaign: "verification.decision batch", audience: "126 applicants", sent: "126 delivered", status: "Delivered", failed: 0, when: "1h ago" },
  { id: 3, campaign: "Investor digest — April W2", audience: "1,462 investors", sent: "1,404 delivered", status: "Delivered", failed: 3, when: "Yesterday" },
  { id: 4, campaign: "AgriSense challenge announcement", audience: "11,208 agri founders", sent: "scheduled Apr 16", status: "Scheduled", failed: 0, when: "—" },
  { id: 5, campaign: "security.alert — geo-velocity", audience: "1 affected user", sent: "email + sms sent", status: "Delivered", failed: 0, when: "Apr 05" },
];

/* ---------------------------------- reports -------------------------------- */

export const REPORT_CATALOG = [
  { domain: "Platform operations", desc: "Health, queues, throughput, SLA", last: "Today 06:00", cadence: "Daily", formats: "CSV · PDF" },
  { domain: "Users & organizations", desc: "Growth, verification, lifecycle states", last: "Today 06:00", cadence: "Daily", formats: "CSV · XLSX" },
  { domain: "Verification", desc: "Decisions, SLA compliance, reviewer load", last: "Today 09:00", cadence: "Hourly", formats: "CSV" },
  { domain: "Startup ecosystem", desc: "Stage, sector, region distributions", last: "Yesterday", cadence: "Weekly", formats: "PDF · XLSX" },
  { domain: "Programs & cohorts", desc: "Selection, completion, outcomes", last: "Apr 12", cadence: "Weekly", formats: "PDF" },
  { domain: "Mentors & experts", desc: "Engagement, ratings, utilization", last: "Apr 13", cadence: "Monthly", formats: "CSV · PDF" },
  { domain: "Investors & funding", desc: "Matches, verified closes, activity", last: "Apr 11", cadence: "Weekly", formats: "PDF" },
  { domain: "Market intelligence", desc: "Snapshots, sector trends, freshness", last: "Apr 10", cadence: "Monthly", formats: "PDF" },
  { domain: "AI performance", desc: "Accuracy, drift, incidents, cost", last: "Today 08:00", cadence: "Daily", formats: "CSV" },
  { domain: "Risk & moderation", desc: "Alerts, resolutions, false positives", last: "Today 08:00", cadence: "Daily", formats: "CSV · PDF" },
  { domain: "Payments & subscriptions", desc: "GTV, refunds, churn, reconciliation", last: "Today 07:00", cadence: "Daily", formats: "XLSX" },
  { domain: "Audit & compliance", desc: "Privileged actions, reviews, exports", last: "Today 06:30", cadence: "Daily", formats: "PDF" },
];

export const BUILDER_DOMAINS = [
  { value: "startups", label: "Startups" },
  { value: "users", label: "Users" },
  { value: "verification", label: "Verification cases" },
  { value: "payments", label: "Transactions" },
];

export const BUILDER_FIELDS: Record<string, string[]> = {
  startups: ["Name", "Sector", "Stage", "Region", "Verification status", "Founded", "Traction metric"],
  users: ["Name", "Role", "Region", "Status", "Registered", "Last active"],
  verification: ["Case ID", "Entity", "Type", "Reviewer", "Decision", "SLA hours", "Decided on"],
  payments: ["Transaction ID", "Customer", "Amount", "Method", "Status", "Date"],
};

export const BUILDER_PREVIEW: Record<string, { head: string[]; rows: string[][] }> = {
  startups: {
    head: ["Name", "Sector", "Stage", "Region"],
    rows: [
      ["Vantara Robotics", "AgriRobotics", "Series A", "Bengaluru"],
      ["MediQueue", "HealthTech", "Seed", "Hyderabad"],
      ["GridSense", "Climate", "Seed", "Pune"],
      ["StackLedger", "FinTech", "Pre-seed", "Mumbai"],
    ],
  },
  users: {
    head: ["Name", "Role", "Region", "Status"],
    rows: [
      ["Ravi Sharma", "Founder", "Karnataka", "Active"],
      ["Priya Nair", "Mentor", "Kerala", "Active"],
      ["Aditya Rao", "Investor", "Maharashtra", "Active"],
    ],
  },
  verification: {
    head: ["Case", "Entity", "Decision", "SLA"],
    rows: [
      ["#4821", "QuickFin", "Pending", "22h left"],
      ["#4815", "Sethi FO", "Escalated", "Overdue 5d"],
      ["#4824", "T. Srinivasan", "In review", "18h left"],
    ],
  },
  payments: {
    head: ["Txn", "Customer", "Amount", "Status"],
    rows: [
      ["txn_90210", "Lumen AI", "₹24,000", "Paid"],
      ["txn_90211", "OrbitX", "₹8,500", "Failed"],
      ["txn_90214", "Apex Univ.", "₹1,20,000", "Paid"],
    ],
  },
};

export type ReportRun = {
  id: number;
  name: string;
  ran: string;
  by: string;
  format: string;
  status: string;
};

export const REPORT_HISTORY: ReportRun[] = [
  { id: 1, name: "Verification SLA — weekly", ran: "Today 09:00", by: "Scheduled (system)", format: "CSV", status: "Ready" },
  { id: 2, name: "Ecosystem Report Q1", ran: "Yesterday", by: "Kabir Malhotra", format: "PDF", status: "Failed" },
  { id: 3, name: "Payments reconciliation — Mar", ran: "Apr 01", by: "M. Qureshi", format: "XLSX", status: "Ready" },
  { id: 4, name: "AI performance — weekly", ran: "Today 08:00", by: "Scheduled (system)", format: "CSV", status: "Ready" },
];
