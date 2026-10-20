import type { ReviewCase } from "../components/shared/case-review";
import type { TimelineEvent } from "../components/shared/directory";

/* ------------------------------ verification ------------------------------- */

export const VERIFICATION_CASES: ReviewCase[] = [
  {
    id: 4821, queue: "Startups", type: "Startup Verification", entity: "QuickFin Services",
    applicant: "Sanjay Kapoor", severity: "Medium", status: "Pending", submitted: "Apr 10, 2026",
    sla: "22h left", docs: [
      { name: "Certificate of Incorporation.pdf", status: "Valid" },
      { name: "GST Certificate.pdf", status: "Valid" },
      { name: "Founder PAN (masked).pdf", status: "Valid" },
    ],
    flags: ["Email domain registered 7 days ago", "Possible duplicate: QuickFin Systems (2024, inactive)"],
    meta: [
      { label: "Entity type", value: "Startup" }, { label: "Region", value: "Maharashtra" },
      { label: "Queue wait", value: "2d 4h" }, { label: "Reviewer", value: "Unassigned" },
    ],
    history: [
      { when: "Apr 11, 2026", actor: "System", action: "Duplicate scan completed", note: "1 possible match found" },
      { when: "Apr 10, 2026", actor: "Sanjay Kapoor", action: "Verification request submitted" },
    ],
  },
  {
    id: 4815, queue: "Investors", type: "Investor Verification", entity: "Sethi Family Office",
    applicant: "Vikram Sethi", severity: "High", status: "Escalated", submitted: "Mar 04, 2026",
    sla: "Overdue 5d", overdue: true,
    docs: [
      { name: "SEBI registration (AIF Cat-I).pdf", status: "Valid" },
      { name: "Office address proof.pdf", status: "Expired" },
      { name: "Beneficial ownership declaration.pdf", status: "Valid" },
    ],
    flags: ["Owner account locked (security — geo-velocity)", "One document expired"],
    meta: [
      { label: "Entity type", value: "Fund" }, { label: "Region", value: "Delhi NCR" },
      { label: "Queue wait", value: "41d" }, { label: "Reviewer", value: "S. Iyer" },
    ],
    history: [
      { when: "Apr 06, 2026", actor: "S. Iyer (Verification)", action: "Escalated to senior review", note: "Security hold on owner account must clear first" },
      { when: "Mar 22, 2026", actor: "S. Iyer (Verification)", action: "Requested updated address proof" },
      { when: "Mar 04, 2026", actor: "Vikram Sethi", action: "Verification request submitted" },
    ],
  },
  {
    id: 4824, queue: "Mentors", type: "Mentor Credential", entity: "T. Srinivasan",
    applicant: "T. Srinivasan", severity: "Low", status: "In review", submitted: "Apr 08, 2026",
    sla: "18h left",
    docs: [
      { name: "LinkedIn + CV export.pdf", status: "Valid" },
      { name: "Employer reference — AgriWorks.pdf", status: "Pending" },
    ],
    flags: [],
    meta: [
      { label: "Entity type", value: "Mentor" }, { label: "Domain", value: "AgriTech hardware" },
      { label: "Experience", value: "14 yrs" }, { label: "Reviewer", value: "K. Bose" },
    ],
    history: [
      { when: "Apr 09, 2026", actor: "K. Bose (Verification)", action: "Reference check initiated" },
      { when: "Apr 08, 2026", actor: "T. Srinivasan", action: "Credential verification submitted" },
    ],
  },
  {
    id: 4826, queue: "IPR Experts", type: "IPR Expert Credential", entity: "S. Banerjee",
    applicant: "S. Banerjee", severity: "Medium", status: "Needs info", submitted: "Apr 05, 2026",
    sla: "Paused (applicant)",
    docs: [
      { name: "Bar Council ID.pdf", status: "Unreadable" },
      { name: "Practice certificate.pdf", status: "Valid" },
    ],
    flags: ["Bar Council scan illegible — replacement requested"],
    meta: [
      { label: "Entity type", value: "IPR Expert" }, { label: "Specialization", value: "Copyright · Media" },
      { label: "Queue wait", value: "9d" }, { label: "Reviewer", value: "S. Iyer" },
    ],
    history: [
      { when: "Apr 07, 2026", actor: "S. Iyer (Verification)", action: "Requested clearer Bar Council document" },
      { when: "Apr 05, 2026", actor: "S. Banerjee", action: "Credential verification submitted" },
    ],
  },
  {
    id: 4790, queue: "Organizations", type: "Organization Verification", entity: "AgroCorp Industries",
    applicant: "Sunita Jain", severity: "Medium", status: "In review", submitted: "Apr 06, 2026",
    sla: "6h left",
    docs: [
      { name: "Certificate of Incorporation.pdf", status: "Valid" },
      { name: "Board resolution.pdf", status: "Valid" },
      { name: "GST Certificate.pdf", status: "Valid" },
    ],
    flags: [],
    meta: [
      { label: "Entity type", value: "Corporate" }, { label: "Region", value: "Punjab" },
      { label: "Queue wait", value: "8d" }, { label: "Reviewer", value: "K. Bose" },
    ],
    history: [
      { when: "Apr 11, 2026", actor: "K. Bose (Verification)", action: "Documents verified — awaiting owner confirmation" },
      { when: "Apr 06, 2026", actor: "Sunita Jain", action: "Organization verification submitted" },
    ],
  },
  {
    id: 4782, queue: "Startups", type: "Startup Verification", entity: "Zenith Traders",
    applicant: "Arjun Mehta", severity: "Critical", status: "Rejected", submitted: "Mar 01, 2026",
    sla: "Closed",
    docs: [
      { name: "Certificate of Incorporation.pdf", status: "Invalid" },
      { name: "Bank statement.pdf", status: "Invalid" },
    ],
    flags: ["Bank statement failed registry cross-check", "Same device as 4 previously rejected accounts"],
    meta: [
      { label: "Entity type", value: "Startup" }, { label: "Region", value: "Delhi NCR" },
      { label: "Decision", value: "Rejected" }, { label: "Reviewer", value: "You (Super Admin)" },
    ],
    history: [
      { when: "Mar 28, 2026", actor: "You (Super Admin)", action: "Verification rejected", note: "Documents failed external registry cross-check — case RF-1182 opened" },
      { when: "Mar 12, 2026", actor: "S. Iyer (Verification)", action: "Escalated", note: "Registry mismatch on bank statement" },
    ],
  },
  {
    id: 4830, queue: "Renewals", type: "Reverification", entity: "Quantum Angels",
    applicant: "D. Majumdar", severity: "Low", status: "Pending", submitted: "Apr 12, 2026",
    sla: "9d left",
    docs: [{ name: "Annual compliance declaration 2026.pdf", status: "Valid" }],
    flags: [],
    meta: [
      { label: "Entity type", value: "Investor" }, { label: "Cycle", value: "Annual renewal" },
      { label: "Previous", value: "Verified Jan 2025" }, { label: "Reviewer", value: "Unassigned" },
    ],
    history: [{ when: "Apr 12, 2026", actor: "System", action: "Reverification case auto-generated" }],
  },
];

export const VERIFICATION_CHECKLIST = [
  "Submitted documents complete",
  "Name matches registration",
  "Document validity checked",
  "Duplicate scan reviewed",
  "External registry cross-check",
  "Risk flags assessed",
];

/* ------------------------------- moderation -------------------------------- */

export const MODERATION_CASES: ReviewCase[] = [
  {
    id: 2291, queue: "Profiles", type: "Impersonation report", entity: "@arjun.fake (Arjun Mehta)",
    applicant: "Reported by R. Sharma", severity: "Critical", status: "In review", submitted: "Apr 12, 2026",
    sla: "3h left", appeal: false,
    docs: [
      { name: "Reporter statement.txt", status: "Attached" },
      { name: "Profile screenshot (claims).png", status: "Attached" },
      { name: "Victim verification (real A. Mehta).pdf", status: "Attached" },
    ],
    flags: ["Same device fingerprint as 4 rejected accounts", "Copied bio from legitimate founder"],
    meta: [
      { label: "Report type", value: "Impersonation" }, { label: "Reporter", value: "Verified founder" },
      { label: "Prior reports", value: "3 on linked accounts" }, { label: "Moderator", value: "T. Ali" },
    ],
    history: [
      { when: "Apr 13, 2026", actor: "T. Ali (Moderation)", action: "Interim: account hidden from directory" },
      { when: "Apr 12, 2026", actor: "R. Sharma", action: "Report filed", note: "This account is impersonating our company and messaging investors" },
    ],
  },
  {
    id: 2288, queue: "Content", type: "IP complaint", entity: "LegalDesk template pack v3",
    applicant: "Reported by LexVerse", severity: "High", status: "Escalated", submitted: "Apr 09, 2026",
    sla: "Overdue 1d", overdue: true,
    docs: [
      { name: "Original template (2023).pdf", status: "Attached" },
      { name: "Side-by-side comparison.pdf", status: "Attached" },
    ],
    flags: ["Near-duplicate content (92% match)"],
    meta: [
      { label: "Report type", value: "IP complaint" }, { label: "Complainant", value: "Verified provider" },
      { label: "Related case", value: "Provider suspended Mar 12" }, { label: "Moderator", value: "R. Dev" },
    ],
    history: [
      { when: "Apr 13, 2026", actor: "R. Dev (Ops)", action: "Escalated to legal review" },
      { when: "Apr 09, 2026", actor: "LexVerse", action: "Complaint filed" },
    ],
  },
  {
    id: 2294, queue: "Opportunities", type: "Fake listing", entity: "\"Guaranteed ₹50L grant — apply ₹4,999\"",
    applicant: "Auto-detected + 7 user reports", severity: "Critical", status: "Pending", submitted: "Apr 13, 2026",
    sla: "8h left",
    docs: [
      { name: "Listing snapshot.png", status: "Attached" },
      { name: "Payment trail summary.txt", status: "Attached" },
    ],
    flags: ["Advance-fee scam pattern", "UPI handle linked to 2 prior takedowns"],
    meta: [
      { label: "Report type", value: "Fraud listing" }, { label: "Source", value: "Risk engine + reports" },
      { label: "Poster", value: "acct NEW_8841 (unverified)" }, { label: "Moderator", value: "Unassigned" },
    ],
    history: [
      { when: "Apr 13, 2026", actor: "Risk Engine", action: "Auto-flagged: advance-fee pattern (score 94)" },
    ],
  },
  {
    id: 2275, queue: "Messages", type: "Abusive messages", entity: "Thread M-55218 (investor ↔ founder)",
    applicant: "Reported by founder", severity: "Medium", status: "In review", submitted: "Apr 10, 2026",
    sla: "18h left",
    docs: [{ name: "Message excerpt (privacy-scoped).txt", status: "Attached" }],
    flags: ["Repeated unsolicited contact after opt-out"],
    meta: [
      { label: "Report type", value: "Harassment" }, { label: "Scope", value: "Excerpt review only (policy)" },
      { label: "Parties", value: "Founder (verified) · Investor" }, { label: "Moderator", value: "T. Ali" },
    ],
    history: [
      { when: "Apr 11, 2026", actor: "T. Ali (Moderation)", action: "Interim warning issued to investor account" },
      { when: "Apr 10, 2026", actor: "Founder (reported)", action: "Report filed" },
    ],
  },
  {
    id: 2230, queue: "Startups", type: "Misleading claims", entity: "MediQueue listing",
    applicant: "Reported by user", severity: "Medium", status: "Restricted", submitted: "Apr 02, 2026",
    sla: "Appeal 2d left", appeal: true,
    docs: [
      { name: "Claim evidence (" + "\"120 hospitals\"" + ").pdf", status: "Attached" },
      { name: "Contract copies (sample).pdf", status: "Attached" },
    ],
    flags: [],
    meta: [
      { label: "Report type", value: "Misleading metrics" }, { label: "Action taken", value: "Listing restricted" },
      { label: "Appeal", value: "Filed Apr 11 — independent review" }, { label: "Moderator", value: "R. Dev" },
    ],
    history: [
      { when: "Apr 11, 2026", actor: "MediQueue (appellant)", action: "Appeal filed with contracts evidence" },
      { when: "Apr 05, 2026", actor: "R. Dev (Ops)", action: "Listing restricted", note: "Unverifiable traction claim until evidence reviewed" },
    ],
  },
  {
    id: 2210, queue: "Profiles", type: "Spam reports", entity: "@growth-hacks-24",
    applicant: "11 user reports", severity: "Low", status: "Resolved", submitted: "Apr 01, 2026",
    sla: "Closed",
    docs: [{ name: "Message samples.zip", status: "Attached" }],
    flags: [],
    meta: [
      { label: "Report type", value: "Spam" }, { label: "Outcome", value: "Account suspended" },
      { label: "Resolution time", value: "6h" }, { label: "Moderator", value: "T. Ali" },
    ],
    history: [
      { when: "Apr 01, 2026", actor: "T. Ali (Moderation)", action: "Account suspended (bulk spam, no appeal)" },
    ],
  },
];

export const MODERATION_CHECKLIST = [
  "Evidence reviewed in full",
  "Prior history checked",
  "Proportionality assessed",
  "Policy section cited",
  "Notification drafted",
];

/* -------------------------------- audit log -------------------------------- */

export type AuditEvent = {
  id: number;
  time: string;
  actor: string;
  role: string;
  module: string;
  action: string;
  target: string;
  severity: string;
  outcome: string;
  reason?: string;
  before?: string;
  after?: string;
  correlation: string;
  ip: string;
  timeline: TimelineEvent[];
};

const ev = (
  id: number, time: string, actor: string, role: string, module: string,
  action: string, target: string, severity: string, outcome: string,
  extra: Partial<AuditEvent> = {},
): AuditEvent => ({
  id, time, actor, role, module, action, target, severity, outcome,
  correlation: `req_${(48210 + id).toString(16)}`,
  ip: "10.4.2.18",
  timeline: [{ when: time, actor, action }],
  ...extra,
});

export const AUDIT_EVENTS: AuditEvent[] = [
  ev(1, "10:41:22", "Kabir Malhotra", "Super Admin", "Users", "account.suspend", "usr_00004 · Arjun Mehta", "Critical", "Success", { reason: "Fraud case RF-1182", before: "status: active", after: "status: suspended" }),
  ev(2, "10:38:07", "M. Qureshi", "Finance Admin", "Payments", "settlement.process", "Batch SB-114 · ₹18.2L", "Normal", "Success", { before: "status: pending", after: "status: settled" }),
  ev(3, "10:31:54", "S. Iyer", "Verification", "Verification", "org.verify_approve", "Kaveri BioLabs Pvt Ltd", "Normal", "Success", { before: "status: in_review", after: "status: verified" }),
  ev(4, "10:12:40", "A. Bansal", "AI / Data Admin", "AI", "matching.config_rollback", "Matching config v18 → v17", "High", "Success", { reason: "False-match spike 4.2% → 6.8%", before: "version: 18", after: "version: 17" }),
  ev(5, "09:58:11", "R. Dev", "Operations Admin", "Content", "program.publish", "Frontier Cohort VII update", "Normal", "Success"),
  ev(6, "09:47:03", "System", "—", "Auth", "login.attempt_block", "acct v.sethi@oldfund.co", "High", "Denied", { reason: "9 failed attempts · geo-velocity" }),
  ev(7, "09:22:36", "T. Ali", "Content Moderator", "Moderation", "content.hide", "Listing \"Guaranteed ₹50L grant\"", "High", "Success", { reason: "Advance-fee scam pattern" }),
  ev(8, "08:55:19", "Kabir Malhotra", "Super Admin", "Permissions", "role.grant_add", "Finance Admin → Export × Finance", "Critical", "Success", { reason: "Quarterly reconciliation workflow", before: "grant: none", after: "export: allowed" }),
  ev(9, "08:31:02", "S. Iyer", "Verification", "Verification", "case.request_info", "Northern Angels LLP", "Normal", "Success"),
  ev(10, "08:04:47", "System", "—", "Reports", "export.generate", "Ecosystem Report Q1 (3.4M rows)", "Normal", "Failed", { reason: "Query timeout > 900s" }),
  ev(11, "Yesterday", "M. Qureshi", "Finance Admin", "Subscriptions", "entitlement.override", "Apex University — 60d grace", "High", "Success", { reason: "Public institution under MoU" }),
  ev(12, "Yesterday", "R. Dev", "Operations Admin", "Ecosystem", "incubator.suspend", "OrbitX Incubator", "Critical", "Success", { reason: "Fund utilization audit" }),
];
