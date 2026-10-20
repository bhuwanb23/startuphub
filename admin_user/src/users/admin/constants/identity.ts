import type { TimelineEvent } from "../components/shared/directory";

/* ---------------------------------- users ---------------------------------- */

export type AdminUserRow = {
  id: number;
  name: string;
  email: string;
  role: string;
  org: string;
  region: string;
  verification: string;
  status: string;
  registered: string;
  lastActive: string;
  sessions: number;
  risk: string[];
  linked: string[];
  timeline: TimelineEvent[];
};

export const ADMIN_USERS: AdminUserRow[] = [
  {
    id: 1, name: "Ravi Sharma", email: "ravi@lumenai.in", role: "Founder", org: "Lumen AI",
    region: "Karnataka", verification: "Verified", status: "Active",
    registered: "Jan 12, 2026", lastActive: "4m ago", sessions: 3,
    risk: [], linked: ["Lumen AI (Startup)", "Frontier Cohort VII"],
    timeline: [
      { when: "Mar 28, 2026", actor: "System", action: "Organization linked", note: "Lumen AI Pvt Ltd" },
      { when: "Feb 02, 2026", actor: "S. Iyer (Verification)", action: "Identity verified" },
      { when: "Jan 12, 2026", actor: "System", action: "Account created" },
    ],
  },
  {
    id: 2, name: "Priya Nair", email: "priya.nair@mentornet.io", role: "Mentor", org: "Independent",
    region: "Kerala", verification: "Verified", status: "Active",
    registered: "Nov 03, 2025", lastActive: "12m ago", sessions: 2,
    risk: [], linked: ["12 startup assignments", "Frontier Cohort VI"],
    timeline: [
      { when: "Apr 01, 2026", actor: "System", action: "Availability updated" },
      { when: "Nov 10, 2025", actor: "A. Bansal (Ops)", action: "Credential verification approved" },
    ],
  },
  {
    id: 3, name: "Aditya Rao", email: "aditya@northbridge.vc", role: "Investor", org: "Northbridge Capital",
    region: "Maharashtra", verification: "Verified", status: "Active",
    registered: "Dec 18, 2025", lastActive: "1h ago", sessions: 4,
    risk: [], linked: ["Northbridge Capital (Fund)", "18 watched startups"],
    timeline: [
      { when: "Mar 15, 2026", actor: "System", action: "Deal-room access granted", note: "Scoped: 3 active deals" },
      { when: "Dec 22, 2025", actor: "S. Iyer (Verification)", action: "Investor verification approved" },
    ],
  },
  {
    id: 4, name: "Arjun Mehta", email: "arjun.m88@gmail.com", role: "Founder", org: "Zenith Traders",
    region: "Delhi NCR", verification: "Rejected", status: "Suspended",
    registered: "Feb 24, 2026", lastActive: "6d ago", sessions: 0,
    risk: ["Duplicate identity signal", "Chargeback on subscription", "Unverified claims in profile"],
    linked: ["Zenith Traders (flagged org)"],
    timeline: [
      { when: "1h ago", actor: "You (Super Admin)", action: "Suspended user account", note: "Fraud signal RF-1182 under investigation" },
      { when: "Mar 30, 2026", actor: "Risk Engine", action: "Risk score raised to 87/100" },
      { when: "Feb 24, 2026", actor: "System", action: "Account created" },
    ],
  },
  {
    id: 5, name: "Meera Krishnan", email: "meera.k@apex.edu", role: "Institution Admin", org: "Apex University",
    region: "Tamil Nadu", verification: "Verified", status: "Active",
    registered: "Oct 11, 2025", lastActive: "22m ago", sessions: 2,
    risk: [], linked: ["Apex University TBI", "Tech transfer office"],
    timeline: [{ when: "Oct 14, 2025", actor: "K. Bose (Ops)", action: "Institution admin role assigned" }],
  },
  {
    id: 6, name: "Sanjay Kapoor", email: "s.kapoor@quickfin.in", role: "Founder", org: "QuickFin",
    region: "Maharashtra", verification: "Pending", status: "Pending activation",
    registered: "Apr 10, 2026", lastActive: "Apr 10, 2026", sessions: 1,
    risk: ["Email domain newly registered (7d)"], linked: [],
    timeline: [{ when: "Apr 10, 2026", actor: "System", action: "Account created — awaiting email confirmation" }],
  },
  {
    id: 7, name: "Deepa Venkat", email: "deepa.v@iplaw.in", role: "IPR Expert", org: "IP Law Partners",
    region: "Karnataka", verification: "Verified", status: "Restricted",
    registered: "Sep 30, 2025", lastActive: "19h ago", sessions: 1,
    risk: ["Client complaint under review (quality)"], linked: ["31 active filings"],
    timeline: [
      { when: "Apr 08, 2026", actor: "R. Dev (Ops)", action: "Account restricted", note: "Filing access paused pending review MC-221" },
    ],
  },
  {
    id: 8, name: "Kabir Malhotra", email: "kabir@startuphub.eco", role: "Admin", org: "StartupHub",
    region: "Delhi NCR", verification: "Verified", status: "Active",
    registered: "Aug 01, 2024", lastActive: "now", sessions: 2,
    risk: [], linked: ["Super Admin (protected)"],
    timeline: [{ when: "Jan 10, 2026", actor: "System", action: "Privileged access review passed" }],
  },
  {
    id: 9, name: "Lakshmi Menon", email: "lakshmi@agrofields.in", role: "Resource Provider", org: "AgroFields Labs",
    region: "Tamil Nadu", verification: "Verified", status: "Active",
    registered: "Jan 29, 2026", lastActive: "3h ago", sessions: 1,
    risk: [], linked: ["4 resource listings", "128 bookings"],
    timeline: [{ when: "Feb 02, 2026", actor: "S. Iyer (Verification)", action: "Provider verification approved" }],
  },
  {
    id: 10, name: "Vikram Sethi", email: "v.sethi@oldfund.co", role: "Investor", org: "Sethi Family Office",
    region: "Delhi NCR", verification: "Pending", status: "Locked",
    registered: "Mar 02, 2026", lastActive: "9d ago", sessions: 0,
    risk: ["9 failed login attempts", "Geo-velocity anomaly"], linked: [],
    timeline: [
      { when: "Apr 05, 2026", actor: "System", action: "Account locked", note: "Login attempt limit exceeded" },
      { when: "Apr 05, 2026", actor: "Security", action: "Alert sent to user email" },
    ],
  },
];

/* ---------------------------------- roles ---------------------------------- */

export type RoleTemplate = {
  name: string;
  desc: string;
  scope: string;
  assignments: number;
  protected?: boolean;
  bundles: string[];
};

export const ROLE_TEMPLATES: RoleTemplate[] = [
  { name: "Super Admin", desc: "Full platform control, incl. config and finance", scope: "Platform", assignments: 3, protected: true, bundles: ["All modules", "Audit access"] },
  { name: "Operations Admin", desc: "Users, orgs, ecosystem records, programs", scope: "Platform", assignments: 6, bundles: ["Identity", "Ecosystem", "Programs"] },
  { name: "Verification Officer", desc: "Verification queues, decisions, SLA tools", scope: "Platform", assignments: 14, bundles: ["Verification", "Read ecosystem"] },
  { name: "Finance Admin", desc: "Payments, refunds, settlements, subscriptions", scope: "Platform", assignments: 4, bundles: ["Payments", "Subscriptions", "Reports"] },
  { name: "Content Moderator", desc: "Moderation queue, enforcements, appeals", scope: "Platform", assignments: 9, bundles: ["Moderation", "Read content"] },
  { name: "AI / Data Admin", desc: "Models, matching, recommendations, risk rules", scope: "Platform", assignments: 5, bundles: ["AI Mgmt", "Matching", "Risk"] },
  { name: "Read-Only Analyst", desc: "View-only access to analytics and reports", scope: "Platform", assignments: 11, bundles: ["Analytics (view)", "Reports (view)"] },
];

export type AdminRoleRow = {
  id: number;
  name: string;
  type: string;
  scope: string;
  permissions: number;
  assignments: number;
  status: string;
  updated: string;
  timeline: TimelineEvent[];
};

export const ADMIN_ROLES: AdminRoleRow[] = [
  { id: 1, name: "Super Admin", type: "System", scope: "Platform", permissions: 84, assignments: 3, status: "Active", updated: "Jan 10, 2026", timeline: [{ when: "Jan 10, 2026", actor: "System", action: "Privileged access review passed" }] },
  { id: 2, name: "Operations Admin", type: "Administrative", scope: "Platform", permissions: 41, assignments: 6, status: "Active", updated: "Mar 18, 2026", timeline: [{ when: "Mar 18, 2026", actor: "You (Super Admin)", action: "Grant added: Programs → Approve" }] },
  { id: 3, name: "Verification Officer", type: "Administrative", scope: "Platform", permissions: 18, assignments: 14, status: "Active", updated: "Mar 11, 2026", timeline: [{ when: "Mar 11, 2026", actor: "K. Bose (Super Admin)", action: "Scope narrowed: no finance visibility" }] },
  { id: 4, name: "Finance Admin", type: "Administrative", scope: "Platform", permissions: 23, assignments: 4, status: "Active", updated: "Feb 27, 2026", timeline: [] },
  { id: 5, name: "Incubator Manager", type: "Ecosystem", scope: "Organization", permissions: 26, assignments: 402, status: "Active", updated: "Apr 01, 2026", timeline: [{ when: "Apr 01, 2026", actor: "System", action: "Org-scoped role cloned from template" }] },
  { id: 6, name: "Startup Founder", type: "Ecosystem", scope: "Organization", permissions: 31, assignments: 14208, status: "Active", updated: "Mar 30, 2026", timeline: [] },
  { id: 7, name: "Legacy Reviewer", type: "Administrative", scope: "Platform", permissions: 12, assignments: 0, status: "Deprecated", updated: "Nov 12, 2025", timeline: [{ when: "Nov 12, 2025", actor: "You (Super Admin)", action: "Role retired", note: "Merged into Verification Officer" }] },
];

/* -------------------------------- permissions ------------------------------ */

export const PERMISSION_MODULES = [
  "Identity & Access", "Ecosystem Records", "Verification", "Moderation",
  "Content & Programs", "AI & Intelligence", "Finance", "Notifications",
  "Reports", "Analytics", "Audit", "Configuration",
];

export const PERMISSION_ACTIONS = ["View", "Create", "Update", "Delete", "Approve", "Export", "Configure"];

export type PermMap = Record<string, Set<string>>;

const all = () =>
  new Set(PERMISSION_MODULES.flatMap((m) => PERMISSION_ACTIONS.map((a) => `${m}:${a}`)));
const ofModules = (...mods: string[]) =>
  new Set(PERMISSION_MODULES.flatMap((m) => mods.includes(m) ? PERMISSION_ACTIONS.map((a) => `${m}:${a}`) : [`${m}:View`]));
const viewOnly = () => new Set(PERMISSION_MODULES.map((m) => `${m}:View`));

export const ROLE_PERMISSIONS: PermMap = {
  "Super Admin": all(),
  "Operations Admin": ofModules("Identity & Access", "Ecosystem Records", "Verification", "Content & Programs", "Notifications", "Reports"),
  "Verification Officer": new Set([
    "Verification:View", "Verification:Update", "Verification:Approve", "Verification:Export",
    "Ecosystem Records:View", "Identity & Access:View", "Audit:View",
  ]),
  "Finance Admin": new Set([
    "Finance:View", "Finance:Update", "Finance:Approve", "Finance:Export", "Finance:Configure",
    "Reports:View", "Reports:Export", "Analytics:View", "Identity & Access:View",
  ]),
  "Content Moderator": new Set([
    "Moderation:View", "Moderation:Update", "Moderation:Approve",
    "Content & Programs:View", "Identity & Access:View", "Audit:View",
  ]),
  "AI / Data Admin": new Set([
    "AI & Intelligence:View", "AI & Intelligence:Update", "AI & Intelligence:Approve", "AI & Intelligence:Configure",
    "Analytics:View", "Reports:View", "Audit:View",
  ]),
  "Read-Only Analyst": viewOnly(),
};

export const SIMULATION_USERS = [
  { name: "Kabir Malhotra", role: "Super Admin" },
  { name: "S. Iyer", role: "Verification Officer" },
  { name: "M. Qureshi", role: "Finance Admin" },
  { name: "R. Dev", role: "Operations Admin" },
  { name: "T. Ali", role: "Content Moderator" },
  { name: "N. Fernandes", role: "Read-Only Analyst" },
];

export const PRIVILEGED_REVIEW = [
  { user: "Kabir Malhotra", grant: "Super Admin", lastUsed: "Active now", review: "Passed Jan 10, 2026" },
  { user: "M. Qureshi", grant: "Finance → Approve refunds", lastUsed: "38m ago", review: "Due May 01, 2026" },
  { user: "A. Bansal", grant: "AI → Production deploys", lastUsed: "Yesterday", review: "Due Apr 20, 2026" },
  { user: "S. Iyer", grant: "Verification → Revoke", lastUsed: "2h ago", review: "Due Apr 15, 2026" },
];

/* ------------------------------- organizations ------------------------------ */

export type AdminOrgRow = {
  id: number;
  name: string;
  type: string;
  owner: string;
  members: number;
  region: string;
  status: string;
  registered: string;
  step: number; // 0 Registered · 1 Docs verified · 2 Owner confirmed · 3 Approved · 4 Active
  linked: string[];
  docs: number;
  timeline: TimelineEvent[];
};

export const ORG_STEPS = ["Registered", "Docs verified", "Owner confirmed", "Approved", "Active"];

export const ADMIN_ORGS: AdminOrgRow[] = [
  { id: 1, name: "Lumen AI Pvt Ltd", type: "Startup", owner: "Ravi Sharma", members: 9, region: "Karnataka", status: "Verified", registered: "Jan 12, 2026", step: 4, linked: ["1 startup", "3 founders", "2 programs"], docs: 6, timeline: [{ when: "Jan 30, 2026", actor: "S. Iyer (Verification)", action: "Organization verified" }] },
  { id: 2, name: "Catalyst Labs Foundation", type: "Incubator", owner: "Nikhil Rao", members: 24, region: "Telangana", status: "Verified", registered: "Oct 05, 2025", step: 4, linked: ["7 programs", "142 startups"], docs: 11, timeline: [] },
  { id: 3, name: "Northbridge Capital LLP", type: "Fund", owner: "Aditya Rao", members: 12, region: "Maharashtra", status: "Verified", registered: "Dec 18, 2025", step: 4, linked: ["1 investor profile", "12 portfolio cos"], docs: 8, timeline: [] },
  { id: 4, name: "Zenith Traders Pvt Ltd", type: "Startup", owner: "Arjun Mehta", members: 4, region: "Delhi NCR", status: "Suspended", registered: "Feb 24, 2026", step: 3, linked: ["1 flagged startup"], docs: 5, timeline: [{ when: "1h ago", actor: "You (Super Admin)", action: "Organization suspended", note: "Linked to fraud case RF-1182" }] },
  { id: 5, name: "AgroCorp Industries", type: "Corporate", owner: "Sunita Jain", members: 46, region: "Punjab", status: "Onboarding", registered: "Apr 06, 2026", step: 2, linked: ["2 open challenges"], docs: 7, timeline: [{ when: "Apr 09, 2026", actor: "K. Bose (Verification)", action: "Documents verified — awaiting owner confirmation" }] },
  { id: 6, name: "Apex University", type: "Institution", owner: "Meera Krishnan", members: 88, region: "Tamil Nadu", status: "Verified", registered: "Oct 11, 2025", step: 4, linked: ["1 TBI", "34 research projects", "6 spin-offs"], docs: 14, timeline: [] },
  { id: 7, name: "QuickFin Services", type: "Startup", owner: "Sanjay Kapoor", members: 3, region: "Maharashtra", status: "Onboarding", registered: "Apr 10, 2026", step: 1, linked: [], docs: 4, timeline: [{ when: "Apr 11, 2026", actor: "System", action: "Duplicate scan — 1 possible match", note: "QuickFin Systems (2024, inactive)" }] },
  { id: 8, name: "AgroFields Labs", type: "Provider", owner: "Lakshmi Menon", members: 7, region: "Tamil Nadu", status: "Verified", registered: "Jan 29, 2026", step: 4, linked: ["4 resource listings"], docs: 5, timeline: [] },
  { id: 9, name: "Sethi Family Office", type: "Fund", owner: "Vikram Sethi", members: 2, region: "Delhi NCR", status: "Onboarding", registered: "Mar 02, 2026", step: 2, linked: [], docs: 6, timeline: [{ when: "Apr 05, 2026", actor: "System", action: "Owner lock — verification paused (security)" }] },
];
