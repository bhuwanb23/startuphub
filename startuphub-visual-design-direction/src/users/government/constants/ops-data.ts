/* Government ops dataset — organization, documents, calendar,
   messages, notifications, audit, settings and help. */

/* ── My Organization ───────────────────────────────────────── */
export const ORG_PROFILE = {
  name: "State Innovation Mission",
  dept: "Dept. of Industries & Commerce",
  level: "State Government",
  jurisdiction: "Telangana State · 33 districts",
  mission:
    "Make the state the most founder-friendly jurisdiction in Asia: register, verify, fund and grow every credible startup, and measure the impact of every rupee.",
  contact: { email: "mission@innovation.ts.gov.in", phone: "+91 · 40 · xxxx xxxx", web: "innovation.telangana.gov.in" },
  programs: 14,
  schemes: 14,
  profile: "Public · verified · listed since Jan 2024",
};

export const DEPARTMENTS = [
  { name: "Startup Registry & Verification", head: "R. Nair", staff: 8, scope: "Registration, verification, profiles, queue SLA" },
  { name: "Programs & Schemes", head: "S. Iqbal", staff: 12, scope: "Scheme design, grants, applications, approvals" },
  { name: "Funding & Resources", head: "P. Das", staff: 7, scope: "Allocation, disbursement, utilization, audit" },
  { name: "Ecosystem & Incubation", head: "K. Rao", staff: 6, scope: "Incubators, accelerators, partners" },
  { name: "Analytics & Policy", head: "Dr. M. Krishnan", staff: 9, scope: "Ecosystem intelligence, impact, policy recommendations" },
  { name: "Challenges & Procurement", head: "A. Dutta", staff: 4, scope: "Challenge prizes, pilots, outcomes" },
];

export const ROLE_MATRIX = [
  { role: "Mission Director", access: "Full workspace + approval authority L3", ic: true },
  { role: "Program Manager", access: "Programs, applications, approvals L2", ic: false },
  { role: "Verification Officer", access: "Registry, queue, documents", ic: false },
  { role: "Analyst", access: "Analytics, reports, policy (read + draft)", ic: false },
  { role: "Auditor (ext.)", access: "Funding + activity logs (read-only)", ic: false },
];

export const ORG_DOCUMENTS = [
  { file: "Startup Policy 2022–27 (v3 amendment)", kind: "Policy", updated: "Feb 2026", size: "4.1 MB" },
  { file: "Seed Ignition Grant — guidelines.pdf", kind: "Guideline", updated: "Mar 2026", size: "1.2 MB" },
  { file: "Scheme circular 04/2026 — rural window", kind: "Circular", updated: "Mar 2026", size: "220 KB" },
  { file: "SIDBI co-investment MoU", kind: "Agreement", updated: "Nov 2025", size: "2.8 MB" },
  { file: "Evaluation rubric template v6", kind: "Template", updated: "Jan 2026", size: "310 KB" },
];

/* ── Documents library ─────────────────────────────────────── */
export const GOV_DOC_LIBRARY = [
  { id: 1, file: "startup_policy_2026_amendment.pdf", area: "Policy", size: "4.1 MB", updated: "2h ago", ver: "v3" },
  { id: 2, file: "seed_ignition_grants_circular_04-2026.pdf", area: "Schemes", size: "220 KB", updated: "Yesterday", ver: "final" },
  { id: 3, file: "agrichain_challenge_guidelines.pdf", area: "Challenges", size: "890 KB", updated: "Mar 20", ver: "v2" },
  { id: 4, file: "verification_sop_v8.pdf", area: "Registry", size: "1.1 MB", updated: "Mar 18", ver: "v8" },
  { id: 5, file: "sidbi_coinvest_mou.pdf", area: "Agreements", size: "2.8 MB", updated: "Nov 2025", ver: "executed" },
  { id: 6, file: "incubator_accreditation_framework.pdf", area: "Incubation", size: "640 KB", updated: "Feb 2026", ver: "v4" },
  { id: 7, file: "disbursement_audit_Q3.pdf", area: "Funding", size: "1.9 MB", updated: "Mar 02", ver: "final" },
  { id: 8, file: "report_template_bneficiary.csv", area: "Templates", size: "48 KB", updated: "Jan 2026", ver: "v2" },
];

/* ── Calendar ──────────────────────────────────────────────── */
export const GOV_CALENDAR_DAYS: { day: number; events: ("scheme" | "grant" | "challenge" | "review" | "disbursal" | "policy")[] }[] = [
  { day: 1, events: ["review"] }, { day: 2, events: [] }, { day: 3, events: ["grant"] },
  { day: 4, events: [] }, { day: 5, events: ["disbursal"] }, { day: 6, events: ["review"] },
  { day: 7, events: [] }, { day: 8, events: ["disbursal"] }, { day: 9, events: ["challenge"] },
  { day: 10, events: ["review"] }, { day: 11, events: [] }, { day: 12, events: ["challenge"] },
  { day: 13, events: [] }, { day: 14, events: ["scheme"] }, { day: 15, events: ["disbursal"] },
  { day: 16, events: ["review"] }, { day: 17, events: [] }, { day: 18, events: ["policy"] },
  { day: 19, events: ["grant"] }, { day: 20, events: [] }, { day: 21, events: ["review"] },
  { day: 22, events: ["disbursal"] }, { day: 23, events: ["scheme"] }, { day: 24, events: [] },
  { day: 25, events: ["review"] }, { day: 26, events: ["challenge"] }, { day: 27, events: [] },
  { day: 28, events: ["grant"] }, { day: 29, events: ["policy"] }, { day: 30, events: ["scheme"] },
];

export const GOV_UPCOMING = [
  { date: "Apr 02", kind: "Grant", text: "Women Founder Sprint — application window closes" },
  { date: "Apr 08", kind: "Disbursal", text: "Seed Ignition Cohort 07 · tranche M2 (₹4.2 Cr)" },
  { date: "Apr 12", kind: "Challenge", text: "AgriChain Innovation — submission deadline" },
  { date: "Apr 18", kind: "Policy", text: "Steering review — co-investment expansion memo" },
  { date: "Apr 30", kind: "Scheme", text: "Seed Ignition Grant FY26 window closes" },
];

/* ── Messages / notifications / audit ──────────────────────── */
export const GOV_THREADS = [
  { id: 1, name: "Nexus Ventures (Nodal officer)", group: "Incubators", last: "Accreditation renewal docs uploaded — awaiting review…", time: "10:12", unread: 2 },
  { id: 2, name: "Anil Deshmukh — CropLens AI", group: "Startups", last: "Milestone M2 evidence shared in the scheme room.", time: "Yesterday", unread: 1 },
  { id: 3, name: "SIDBI partnership cell", group: "Partners", last: "Co-investment tranche 4 reconciliation complete.", time: "Yesterday", unread: 0 },
  { id: 4, name: "Dr. M. Krishnan — Analytics", group: "Internal", last: "Karimnagar intervention memo ready for steering.", time: "Mon", unread: 0 },
  { id: 5, name: "Irrigation SE's office", group: "Challenges", last: "Water Grid finals venue confirmed for Apr 22.", time: "Sun", unread: 0 },
];

export const GOV_NOTIFICATIONS = [
  { id: 1, group: "Registry", text: "412 new startup registrations this month — 38 pending verification", time: "1h", unread: true },
  { id: 2, group: "Verification", text: "NeuroNest eligibility clarification needed (turnover window)", time: "2h", unread: true },
  { id: 3, group: "Grants", text: "41 Seed Ignition applications awaiting review — SLA day 6", time: "3h", unread: true },
  { id: 4, group: "Funding", text: "Rural window underutilization alert — 34% with 6 weeks left", time: "5h", unread: true },
  { id: 5, group: "Challenges", text: "AgriChain crossed 200 applications", time: "Yesterday", unread: false },
  { id: 6, group: "Incubators", text: "Nexus Ventures accreditation renewal submitted", time: "Yesterday", unread: false },
  { id: 7, group: "Analytics", text: "Q1 ecosystem report auto-assembled — review in Reports", time: "2d", unread: false },
  { id: 8, group: "System", text: "Registry API sync with MCA completed — 0 mismatches", time: "2d", unread: false },
];

export const GOV_AUDIT = [
  { actor: "S. Verma", action: "approved allocation AL-0538", object: "DeepTech Fund · ₹6.0 Cr", time: "Today · 11:42" },
  { actor: "R. Nair", action: "verified", object: "CropLens AI · profile", time: "Today · 10:15" },
  { actor: "S. Iqbal", action: "shortlisted 3 applications", object: "DeepTech Capability Fund", time: "Yesterday · 17:20" },
  { actor: "System", action: "flagged underutilization", object: "Rural window · 34%", time: "Yesterday · 09:00" },
  { actor: "P. Das", action: "reconciled disbursal", object: "SIDBI tranche 4", time: "Mar 25 · 14:32" },
  { actor: "A. Dutta", action: "published winners", object: "Water Grid Challenge", time: "Mar 22 · 16:04" },
  { actor: "Dr. M. Krishnan", action: "submitted policy memo", object: "Karimnagar intervention", time: "Mar 21 · 12:11" },
  { actor: "K. Rao", action: "accredited incubator", object: "Health Launchpad (A)", time: "Mar 18 · 15:47" },
];

/* ── Settings & help ───────────────────────────────────────── */
export const GOV_SETTINGS = [
  {
    title: "Organization", desc: "Identity and jurisdiction",
    rows: [
      { label: "Organization", value: "State Innovation Mission" },
      { label: "Jurisdiction", value: "Telangana · 33 districts" },
      { label: "Public profile", on: true },
    ],
  },
  {
    title: "Users & access", desc: "46 officials across 6 departments",
    rows: [
      { label: "Two-factor authentication", on: true },
      { label: "Approval authority threshold", value: "₹50 L per officer (L2)" },
      { label: "External auditor access", value: "Read-only, logged" },
    ],
  },
  {
    title: "Program defaults", desc: "Applied to new schemes and grants",
    rows: [
      { label: "Auto-eligibility check", on: true },
      { label: "Milestone-based disbursement", on: true },
      { label: "Evaluation rubric", value: "Template v6" },
    ],
  },
  {
    title: "Notifications", desc: "What reaches mission staff",
    rows: [
      { label: "Verification SLA alerts", on: true },
      { label: "Underutilization alerts", on: true },
      { label: "Weekly ecosystem digest", on: true },
      { label: "Policy insight alerts", on: false },
    ],
  },
];

export const GOV_SECURITY = [
  "NIC-compliant infrastructure",
  "Immutable audit log on all approvals",
  "Data residency: India (MeghRaj cloud)",
  "Role-based access with L1/L2/L3 approval authority",
];

export const GOV_INTEGRATIONS = [
  { n: "MCA registry sync", c: true },
  { n: "GSTN eligibility feed", c: true },
  { n: "PFMS disbursement rail", c: true },
  { n: "DPIIT startup recognition", c: true },
  { n: "State treasury (budget)", c: false },
];

export const GOV_HELP_GUIDES = [
  { title: "Registry & verification SOP", desc: "SLA, checks, escalation matrix", mins: 8 },
  { title: "Designing a scheme", desc: "Objectives → eligibility → rubric → launch", mins: 11 },
  { title: "Grant disbursement rules", desc: "Milestones, PFMS rail, utilization certificates", mins: 7 },
  { title: "Reading ecosystem analytics", desc: "What the density and survival metrics mean", mins: 6 },
  { title: "Policy intelligence workflow", desc: "From gap evidence to recommendation memo", mins: 9 },
  { title: "Challenge procurement guide", desc: "Running challenge prizes within GFR norms", mins: 10 },
];

export const GOV_FAQ = [
  { q: "Who sees startup financial data?", a: "Only officers with scoped need-to-know. Founders control document-level sharing; every view is audit-logged and cited in the startup's transparency report." },
  { q: "How is the co-investment window compatible with state rules?", a: "The MoU routes equity via SIDBI as the investment vehicle, keeping the mission's role strictly catalytic and GFR-compliant." },
  { q: "What triggers an underutilization alert?", a: "Any program below 60% projected utilization at the 60% timeline mark — the alert specifies amount, window and remediation options." },
  { q: "Can recommendations become circulars directly?", a: "No — recommendations require steering-committee approval, after which the system drafts the circular from the memo for legal vetting." },
];
