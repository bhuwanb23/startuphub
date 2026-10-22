/* StartupHub Labs — organization datasets.
 *
 * One shared source for the four organization screens (profile, team,
 * roles, documents). Typed at the boundary so a page can never render a
 * row that is missing a field.
 */

/* ── Types ─────────────────────────────────────────────────────── */

export type Tone = "default" | "accent" | "good" | "warn" | "bad";

export type OrgKpi = {
  label: string;
  value: string;
  note: string;
  tone: Tone;
};

export type OrgDetail = { label: string; value: string };

export type OrgProgram = {
  name: string;
  track: string;
  startups: number;
  weeks: number;
  status: "Active" | "Upcoming" | "Alumni";
  tone: Tone;
};

export type OrgFacility = {
  name: string;
  detail: string;
  capacity: string;
  utilisation: number;
};

export type OrgPartner = {
  name: string;
  kind: string;
  since: string;
  contribution: string;
};

export type OrgAccreditation = {
  body: string;
  status: "Valid" | "Renewal due" | "Under review";
  validTill: string;
  tone: Tone;
};

export type OrgCampus = {
  city: string;
  address: string;
  seats: number;
  opened: string;
  flagship: boolean;
};

export type TeamMember = {
  name: string;
  role: string;
  scope: string;
  initials: string;
  status: "Active" | "On leave";
  workload: number;
  since: string;
  location: string;
  tone: Tone;
};

export type TeamReport = {
  name: string;
  role: string;
  initials: string;
  reports: string[];
};

export type Onboarding = {
  name: string;
  role: string;
  stage: "Offer" | "Background" | "Documents" | "Access setup" | "Day one";
  start: string;
  owner: string;
  tone: Tone;
};

export type Advisor = {
  name: string;
  expertise: string;
  org: string;
  sessions: number;
  rating: number;
};

export type Departure = {
  name: string;
  role: string;
  lastDay: string;
  handover: string;
  tone: Tone;
};

export type HiringPlan = {
  role: string;
  team: string;
  openings: number;
  priority: "Critical" | "High" | "Planned";
  target: string;
  tone: Tone;
};

export type TeamFunction = {
  function: string;
  headcount: number;
  share: number;
  scope: string;
};

export type OrgRole = {
  name: string;
  tier: "L1" | "L2" | "L3";
  members: number;
  scope: string;
  seats: string;
  tone: Tone;
};

export type PermissionModule = {
  module: string;
  description: string;
  actions: string[];
};

export type CustomRole = {
  name: string;
  basedOn: string;
  members: number;
  added: string;
  tone: Tone;
};

export type Delegation = {
  approver: string;
  delegatesTo: string;
  scope: string;
  expires: string;
  active: boolean;
};

export type PermissionChange = {
  actor: string;
  action: string;
  target: string;
  when: string;
  tone: Tone;
};

export type SeatUsage = {
  role: string;
  used: number;
  total: number;
  tone: Tone;
};

export type RoleTemplate = {
  name: string;
  for: string;
  roles: number;
  description: string;
};

export type OrgDocument = {
  name: string;
  kind: "Policy" | "Agreement" | "Circular" | "Template" | "Report" | "Certificate";
  size: string;
  updated: string;
  owner: string;
  version: string;
  visibility: "Internal" | "Team" | "Public";
  expiry?: string;
};

export type DocActivity = {
  actor: string;
  action: string;
  file: string;
  when: string;
  tone: Tone;
};

export type ComplianceItem = {
  item: string;
  due: string;
  owner: string;
  state: "On track" | "Due soon" | "Overdue";
  tone: Tone;
};

export type SharedAudience = {
  name: string;
  scope: string;
  files: number;
  lastViewed: string;
};

export type RetentionRule = {
  category: string;
  keep: string;
  action: string;
  files: number;
};

export type Acknowledgement = {
  document: string;
  acknowledged: number;
  required: number;
  deadline: string;
  tone: Tone;
};

/* ── Organization profile ──────────────────────────────────────── */

export const ORG_KPIS: OrgKpi[] = [
  { label: "Startups incubated", value: "240", note: "+38 this year", tone: "accent" },
  { label: "Active programs", value: "12", note: "3 cohorts live", tone: "default" },
  { label: "Capital mobilised", value: "₹186 Cr", note: "across 61 raises", tone: "good" },
  { label: "Graduation rate", value: "86%", note: "vs 71% network avg", tone: "good" },
];

export const ORG_DETAILS: OrgDetail[] = [
  { label: "Legal entity", value: "StartupHub Labs Private Limited" },
  { label: "Founded", value: "2021 · Bengaluru, Karnataka" },
  { label:"Registration", value: "ROC-KA · U72900KA2021FTC148220" },
  { label: "Focus", value: "Multi-sector · deep-tech friendly" },
  { label: "Program length", value: "16 weeks, 3 cohorts a year" },
  { label: "Current capacity", value: "64 concurrent startups" },
  { label: "Staff", value: "18 full-time · 6 advisors" },
  { label: "Facilities", value: "Co-working, prototype studio, investor lounge" },
];

export const ORG_VISION = {
  statement:
    "Back the unglamorous middle of the founder journey — the part between a validated idea and a fundable company — with everything a venture needs to survive contact with a market.",
  pillars: [
    { title: "Ship, not slide", body: "Every cohort ends in a working product, not a pitch deck." },
    { title: "Non-dilutive first", body: "Weeks 1–6 are funded by us, not by equity." },
    { title: "Own the boring parts", body: "Compliance, IPR and grants are our job, not the founder's." },
  ],
};

export const ORG_PROGRAMS: OrgProgram[] = [
  { name: "Cohort VI — Deep Tech Sprint", track: "Deep tech", startups: 14, weeks: 16, status: "Active", tone: "accent" },
  { name: "Cohort VII — Climate & Agtech", track: "Climate", startups: 12, weeks: 16, status: "Active", tone: "accent" },
  { name: "Cohort VIII — Health & Bio", track: "Healthtech", startups: 10, weeks: 16, status: "Upcoming", tone: "default" },
  { name: "Founder-in-Residence", track: "Any sector", startups: 6, weeks: 26, status: "Active", tone: "accent" },
  { name: "Cohort V — Fintech", track: "Fintech", startups: 16, weeks: 16, status: "Alumni", tone: "good" },
  { name: "Seed-Ready Bootcamp", track: "Pre-seed", startups: 18, weeks: 8, status: "Active", tone: "accent" },
];

export const ORG_FACILITIES: OrgFacility[] = [
  { name: "Prototype studio", detail: "3D printing, CNC, PCB bench", capacity: "18 bays", utilisation: 86 },
  { name: "Co-working floor", detail: "12-person pods, bookable", capacity: "120 desks", utilisation: 78 },
  { name: "Investor lounge", detail: "Demo room + video wall", capacity: "40 seats", utilisation: 54 },
  { name: "IPR helpdesk", detail: "Filings, trademarks, transfer", capacity: "9 advisors", utilisation: 62 },
];

export const ORG_PARTNERS: OrgPartner[] = [
  { name: "CIED Pune", kind: "Incubator network", since: "2021", contribution: "Referral + shared events" },
  { name: "T-Hub Health", kind: "Sector partner", since: "2022", contribution: "Hospital pilots" },
  { name: "Kerala Startup Mission", kind: "State mission", since: "2023", contribution: "Grant co-applications" },
  { name: "Nexus Angels", kind: "Angel syndicate", since: "2022", contribution: "Term sheets at demo day" },
  { name: "Nimbus Cloud", kind: "Infrastructure", since: "2022", contribution: "₹2.4 Cr credits" },
  { name: "SH IPR Desk", kind: "IP services", since: "2024", contribution: "Pro bono filings" },
];

export const ORG_ACCREDITATIONS: OrgAccreditation[] = [
  { body: "DPIIT recognised incubator", status: "Valid", validTill: "Mar 2028", tone: "good" },
  { body: "NITI Aayog Atal Innovation", status: "Valid", validTill: "Dec 2026", tone: "good" },
  { body: "ISO 27001 — information security", status: "Renewal due", validTill: "Aug 2026", tone: "warn" },
  { body: "NASSCOM member", status: "Valid", validTill: "Jan 2027", tone: "good" },
  { body: "State Startup Cell empanelled", status: "Under review", validTill: "Pending", tone: "default" },
];

export const ORG_CAMPUS: OrgCampus[] = [
  { city: "Bengaluru", address: "Indiranagar 100ft Road", seats: 64, opened: "2021", flagship: true },
  { city: "Hyderabad", address: "HITEC City, Cyber Towers", seats: 28, opened: "2024", flagship: false },
  { city: "Kochi", address: "Infopark Kochi, Block 9", seats: 20, opened: "2025", flagship: false },
];

/* ── Team & staff ──────────────────────────────────────────────── */

export const TEAM_MEMBERS: TeamMember[] = [
  { name: "Meera Iyer", role: "Program Director", scope: "Full workspace", initials: "MI", status: "Active", workload: 82, since: "Mar 2021", location: "Bengaluru", tone: "accent" },
  { name: "Rohan Pillai", role: "Program Manager", scope: "Cohorts VI–VIII", initials: "RP", status: "Active", workload: 74, since: "Jun 2021", location: "Bengaluru", tone: "accent" },
  { name: "Arjun Nair", role: "Funding Lead", scope: "Investor relations", initials: "AN", status: "Active", workload: 66, since: "Jan 2022", location: "Bengaluru", tone: "accent" },
  { name: "Divya Menon", role: "Community & Events", scope: "Demo days, hiring", initials: "DM", status: "Active", workload: 58, since: "Aug 2022", location: "Kochi", tone: "default" },
  { name: "Kavi Sharma", role: "Operations", scope: "Facilities & vendors", initials: "KS", status: "Active", workload: 61, since: "Apr 2023", location: "Bengaluru", tone: "default" },
  { name: "Nandita Bose", role: "IPR Counsel", scope: "Filings, trademarks", initials: "NB", status: "Active", workload: 47, since: "Nov 2022", location: "Hyderabad", tone: "default" },
  { name: "Farhan Qureshi", role: "Mentor Coordinator", scope: "Panel, matching", initials: "FQ", status: "Active", workload: 52, since: "Feb 2024", location: "Bengaluru", tone: "default" },
  { name: "Ishita Sen", role: "Grant Specialist", scope: "Govt. schemes", initials: "IS", status: "On leave", workload: 22, since: "Jul 2023", location: "Bengaluru", tone: "warn" },
];

export const TEAM_REPORTS: TeamReport[] = [
  { name: "Meera Iyer", role: "Program Director", initials: "MI", reports: ["Rohan Pillai", "Arjun Nair", "Divya Menon", "Kavi Sharma", "Nandita Bose", "Farhan Qureshi", "Ishita Sen"] },
  { name: "Rohan Pillai", role: "Program Manager", initials: "RP", reports: ["Cohort VI pod leads", "Cohort VII pod leads"] },
  { name: "Arjun Nair", role: "Funding Lead", initials: "AN", reports: ["Investor desk"] },
  { name: "Nandita Bose", role: "IPR Counsel", initials: "NB", reports: ["IPR helpdesk"] },
];

export const ONBOARDING: Onboarding[] = [
  { name: "Tanvi Kulkarni", role: "Program Associate", stage: "Day one", start: "01 Apr 2026", owner: "Rohan Pillai", tone: "good" },
  { name: "Aman Grover", role: "Hardware Engineer", stage: "Access setup", start: "08 Apr 2026", owner: "Kavi Sharma", tone: "accent" },
  { name: "Sara Thomas", role: "Impact Analyst", stage: "Documents", start: "15 Apr 2026", owner: "Divya Menon", tone: "default" },
  { name: "Vivek Rana", role: "Community Manager", stage: "Background", start: "22 Apr 2026", owner: "Divya Menon", tone: "default" },
  { name: "Neha Joshi", role: "Finance Associate", stage: "Offer", start: "01 May 2026", owner: "Meera Iyer", tone: "default" },
];

export const ADVISORS: Advisor[] = [
  { name: "Priya Nair", expertise: "Architecture & scaling", org: "ex-CTO, ZetaPay", sessions: 34, rating: 4.9 },
  { name: "Raghav Iyer", expertise: "Hardware & supply chain", org: "Founder, Nimbus Robotics", sessions: 21, rating: 4.8 },
  { name: "Latha Menon", expertise: "IP & licensing", org: "Partner, IPR Chambers", sessions: 28, rating: 4.7 },
  { name: "Dev Malhotra", expertise: "Go-to-market, B2B", org: "VP Sales, Nimbus Cloud", sessions: 18, rating: 4.6 },
];

export const DEPARTURES: Departure[] = [
  { name: "Rohit Bansal", role: "Product Mentor", lastDay: "31 Mar 2026", handover: "Prototype studio", tone: "default" },
  { name: "Aisha Rahman", role: "Community Lead", lastDay: "14 Feb 2026", handover: "Events & demo days", tone: "default" },
  { name: "Karthik Raja", role: "Placement Officer", lastDay: "09 Dec 2025", handover: "Investor desk", tone: "warn" },
];

export const HIRING_PLAN: HiringPlan[] = [
  { role: "Hardware Lab Engineer", team: "Operations", openings: 2, priority: "Critical", target: "May 2026", tone: "bad" },
  { role: "Impact & Research Analyst", team: "Programs", openings: 1, priority: "High", target: "Jun 2026", tone: "warn" },
  { role: "IP Documentation Executive", team: "IPR", openings: 1, priority: "High", target: "Jul 2026", tone: "warn" },
  { role: "Investor Relations Associate", team: "Funding", openings: 1, priority: "Planned", target: "Q4 2026", tone: "default" },
];

export const TEAM_FUNCTIONS: TeamFunction[] = [
  { function: "Programs & delivery", headcount: 4, share: 50, scope: "Cohorts, applications, milestones" },
  { function: "Funding & investor relations", headcount: 2, share: 25, scope: "Investor pipeline, demo days" },
  { function: "IPR & grants", headcount: 2, share: 25, scope: "Filings, licensing, government schemes" },
  { function: "Operations & community", headcount: 2, share: 25, scope: "Facilities, events, hiring partners" },
  { function: "Leadership", headcount: 1, share: 12, scope: "Programme direction and approvals" },
];

/* ── Roles & permissions ───────────────────────────────────────── */

export const ORG_ROLES: OrgRole[] = [
  { name: "Program Director", tier: "L3", members: 1, scope: "Entire workspace, approvals, org settings", seats: "1 of 1", tone: "accent" },
  { name: "Program Manager", tier: "L2", members: 2, scope: "Cohorts, applications, milestones, mentors", seats: "2 of 3", tone: "default" },
  { name: "Funding Lead", tier: "L2", members: 1, scope: "Investor pipeline, demo days, term sheets", seats: "1 of 2", tone: "default" },
  { name: "IPR Counsel", tier: "L2", members: 1, scope: "IPR desk, filings, licensing, transfer", seats: "1 of 2", tone: "default" },
  { name: "Operations", tier: "L1", members: 1, scope: "Facilities, vendors, budget read-only", seats: "1 of 2", tone: "default" },
  { name: "Community & Events", tier: "L1", members: 1, scope: "Events, demo days, hiring partners", seats: "1 of 2", tone: "default" },
  { name: "Mentor Coordinator", tier: "L1", members: 1, scope: "Mentor panel, matching, scheduling", seats: "1 of 1", tone: "default" },
  { name: "Grant Specialist", tier: "L1", members: 1, scope: "Government schemes, applications, reporting", seats: "1 of 1", tone: "default" },
];

export const PERMISSION_MODULES: PermissionModule[] = [
  { module: "Cohorts & Programs", description: "Batches, weeks, milestones, demo days", actions: ["View", "Create", "Update", "Delete", "Approve", "Export"] },
  { module: "Applications & Selection", description: "Applicant pipeline and scoring", actions: ["View", "Create", "Update", "Approve", "Export"] },
  { module: "Startups", description: "Portfolio records and health", actions: ["View", "Create", "Update", "Delete", "Export"] },
  { module: "Mentor Network", description: "Panel, matching, session logs", actions: ["View", "Create", "Update", "Export"] },
  { module: "IPR Desk", description: "Filings, trademarks, transfers", actions: ["View", "Create", "Update", "Delete", "Approve", "Export"] },
  { module: "Funding & Investors", description: "Investor pipeline and term sheets", actions: ["View", "Create", "Update", "Delete", "Approve", "Export", "Configure"] },
  { module: "Facilities & Vendors", description: "Bookings, procurement, contracts", actions: ["View", "Create", "Update", "Delete", "Approve", "Export"] },
  { module: "Finance & Grants", description: "Scheme claims and disbursement", actions: ["View", "Create", "Update", "Approve", "Export"] },
  { module: "Organization Admin", description: "Team, roles, policies, documents", actions: ["View", "Create", "Update", "Delete", "Approve", "Configure"] },
];

export const PERMISSION_ACTIONS = ["View", "Create", "Update", "Delete", "Approve", "Export", "Configure"];

export const ROLE_PERMISSION_MATRIX: Record<string, string[]> = {
  "Program Director": PERMISSION_ACTIONS,
  "Program Manager": ["View", "Create", "Update", "Approve", "Export"],
  "Funding Lead": ["View", "Create", "Update", "Delete", "Approve", "Export"],
  "IPR Counsel": ["View", "Create", "Update", "Delete", "Approve", "Export"],
  Operations: ["View", "Update", "Export"],
  "Community & Events": ["View", "Create", "Update", "Export"],
  "Mentor Coordinator": ["View", "Create", "Update", "Export"],
  "Grant Specialist": ["View", "Create", "Update", "Approve", "Export"],
};

export const CUSTOM_ROLES: CustomRole[] = [
  { name: "Demo Day Marshal", basedOn: "Community & Events", members: 4, added: "Feb 2026", tone: "default" },
  { name: "IP Filing Reviewer", basedOn: "IPR Counsel", members: 2, added: "Nov 2025", tone: "default" },
  { name: "Investor Guest", basedOn: "View only", members: 11, added: "Jan 2026", tone: "warn" },
];

export const DELEGATIONS: Delegation[] = [
  { approver: "Meera Iyer", delegatesTo: "Rohan Pillai", scope: "Cohort VII selection approvals", expires: "30 Jun 2026", active: true },
  { approver: "Meera Iyer", delegatesTo: "Arjun Nair", scope: "Term sheet sign-off up to ₹2 Cr", expires: "31 Mar 2026", active: true },
  { approver: "Nandita Bose", delegatesTo: "Farhan Qureshi", scope: "Trademark class 35 filings", expires: "30 Apr 2026", active: true },
  { approver: "Kavi Sharma", delegatesTo: "Ishita Sen", scope: "Facility bookings above ₹50K", expires: "15 May 2026", active: false },
];

export const PERMISSION_CHANGES: PermissionChange[] = [
  { actor: "Meera Iyer", action: "granted Export on", target: "Funding & Investors · Grant Specialist", when: "2 days ago", tone: "good" },
  { actor: "Nandita Bose", action: "requested Delete on", target: "IPR Desk · Kavi Sharma", when: "5 days ago", tone: "warn" },
  { actor: "Rohan Pillai", action: "revoked Approve on", target: "Finance & Grants · Kavi Sharma", when: "12 days ago", tone: "bad" },
  { actor: "Meera Iyer", action: "created role", target: "Demo Day Marshal", when: "1 Feb 2026", tone: "default" },
  { actor: "Arjun Nair", action: "added guest access for", target: "Investor Guest · Nexus Angels", when: "18 Jan 2026", tone: "default" },
];

export const SEAT_USAGE: SeatUsage[] = [
  { role: "Program Director", used: 1, total: 1, tone: "bad" },
  { role: "Program Manager", used: 2, total: 3, tone: "warn" },
  { role: "Funding Lead", used: 1, total: 2, tone: "default" },
  { role: "IPR Counsel", used: 1, total: 2, tone: "default" },
  { role: "Operations", used: 1, total: 2, tone: "default" },
  { role: "Community & Events", used: 1, total: 2, tone: "default" },
  { role: "Mentor Coordinator", used: 1, total: 1, tone: "warn" },
  { role: "Grant Specialist", used: 1, total: 1, tone: "warn" },
];

export const ROLE_TEMPLATES: RoleTemplate[] = [
  { name: "New incubation cohort", for: "Program Manager", roles: 2, description: "Cohort, application and milestone access for a new batch." },
  { name: "Mentor panel", for: "Mentor Coordinator", roles: 1, description: "Mentor matching and session logging without financials." },
  { name: "IPR desk", for: "IPR Counsel", roles: 3, description: "Filing, trademark and transfer permissions with approval gates." },
  { name: "Demo day crew", for: "Community & Events", roles: 4, description: "Event setup, seating and live-day logistics." },
];

/* ── Organization documents ─────────────────────────────────────── */

export const ORG_DOCUMENTS: OrgDocument[] = [
  { name: "Incubation Program Policy 2026", kind: "Policy", size: "412 KB", updated: "12 Mar 2026", owner: "Meera Iyer", version: "v4.2", visibility: "Internal" },
  { name: "Equity Instrument & Vesting Policy", kind: "Policy", size: "288 KB", updated: "04 Mar 2026", owner: "Arjun Nair", version: "v2.1", visibility: "Internal" },
  { name: "NITI Aayog Atal MoU", kind: "Agreement", size: "1.8 MB", updated: "21 Feb 2026", owner: "Meera Iyer", version: "signed", visibility: "Public" },
  { name: "State Startup Cell Empanelment", kind: "Certificate", size: "640 KB", updated: "09 Jan 2026", owner: "Ishita Sen", version: "v1.0", visibility: "Public" },
  { name: "Founder Grant Sanction Letter", kind: "Circular", size: "356 KB", updated: "28 Feb 2026", owner: "Ishita Sen", version: "v1.4", visibility: "Team" },
  { name: "IP Filing Service Agreement — IPR Desk", kind: "Agreement", size: "524 KB", updated: "11 Jan 2026", owner: "Nandita Bose", version: "v3.0", visibility: "Internal" },
  { name: "Co-Working Membership Terms", kind: "Agreement", size: "198 KB", updated: "02 Dec 2025", owner: "Kavi Sharma", version: "v2.3", visibility: "Internal" },
  { name: "Cohort VI Impact Report", kind: "Report", size: "2.4 MB", updated: "18 Feb 2026", owner: "Rohan Pillai", version: "final", visibility: "Team" },
  { name: "Annual Impact Report FY25–26", kind: "Report", size: "5.1 MB", updated: "24 Feb 2026", owner: "Meera Iyer", version: "draft", visibility: "Internal" },
  { name: "Prototype Lab Usage Guidelines", kind: "Policy", size: "176 KB", updated: "15 Jan 2026", owner: "Kavi Sharma", version: "v1.7", visibility: "Team" },
  { name: "Investor Demo Day Template", kind: "Template", size: "1.2 MB", updated: "06 Mar 2026", owner: "Arjun Nair", version: "v5.1", visibility: "Team" },
  { name: "Standard Founder Agreement", kind: "Template", size: "312 KB", updated: "19 Dec 2025", owner: "Meera Iyer", version: "v6.0", visibility: "Team" },
  { name: "ISO 27001 Certificate", kind: "Certificate", size: "890 KB", updated: "08 Aug 2025", owner: "Kavi Sharma", version: "2025", visibility: "Public", expiry: "Renewal due Aug 2026" },
  { name: "Mentor Engagement Contract", kind: "Agreement", size: "264 KB", updated: "22 Jan 2026", owner: "Farhan Qureshi", version: "v1.9", visibility: "Internal" },
];

export const DOC_ACTIVITY: DocActivity[] = [
  { actor: "Meera Iyer", action: "uploaded", file: "Incubation Program Policy 2026 v4.2", when: "12 Mar 2026", tone: "good" },
  { actor: "Arjun Nair", action: "edited", file: "Investor Demo Day Template v5.1", when: "06 Mar 2026", tone: "default" },
  { actor: "Nandita Bose", action: "shared with", file: "IP Filing Service Agreement · IPR Desk", when: "05 Mar 2026", tone: "default" },
  { actor: "Kavi Sharma", action: "requested review of", file: "ISO 27001 Certificate", when: "02 Mar 2026", tone: "warn" },
  { actor: "Ishita Sen", action: "uploaded", file: "Founder Grant Sanction Letter v1.4", when: "28 Feb 2026", tone: "default" },
  { actor: "Rohan Pillai", action: "exported", file: "Cohort VI Impact Report", when: "20 Feb 2026", tone: "default" },
];

export const COMPLIANCE_ITEMS: ComplianceItem[] = [
  { item: "ISO 27001 recertification", due: "08 Aug 2026", owner: "Kavi Sharma", state: "Due soon", tone: "warn" },
  { item: "DPIIT recognition renewal", due: "31 Mar 2027", owner: "Meera Iyer", state: "On track", tone: "good" },
  { item: "NITI Aayog Atal renewal", due: "12 Dec 2026", owner: "Ishita Sen", state: "On track", tone: "good" },
  { item: "Grant utilisation reports (4 schemes)", due: "20 Mar 2026", owner: "Ishita Sen", state: "Overdue", tone: "bad" },
  { item: "Vendor insurance certificates", due: "02 Apr 2026", owner: "Kavi Sharma", state: "Due soon", tone: "warn" },
];

export const SHARED_AUDIENCES: SharedAudience[] = [
  { name: "All founders", scope: "Founder portal", files: 4, lastViewed: "Today" },
  { name: "Mentor panel", scope: "Mentor workspace", files: 3, lastViewed: "Yesterday" },
  { name: "Board & investors", scope: "External board room", files: 2, lastViewed: "4 days ago" },
  { name: "Karnataka Startup Cell", scope: "Government reviewer", files: 5, lastViewed: "2 weeks ago" },
];

export const RETENTION_RULES: RetentionRule[] = [
  { category: "Policy & circulars", keep: "7 years from supersession", action: "Archive, never delete", files: 4 },
  { category: "Agreements & MoUs", keep: "Permanent", action: "Retain, read-only", files: 4 },
  { category: "Impact reports", keep: "5 years", action: "Archive after 5 years", files: 2 },
  { category: "Templates", keep: "Current version only", action: "Auto-purge older versions", files: 2 },
  { category: "Certificates", keep: "Until superseded", action: "Flag on expiry", files: 2 },
];

export const ACKNOWLEDGEMENTS: Acknowledgement[] = [
  { document: "Incubation Program Policy 2026", acknowledged: 16, required: 18, deadline: "31 Mar 2026", tone: "warn" },
  { document: "Equity Instrument & Vesting Policy", acknowledged: 18, required: 18, deadline: "15 Feb 2026", tone: "good" },
  { document: "Prototype Lab Usage Guidelines", acknowledged: 14, required: 18, deadline: "30 Apr 2026", tone: "default" },
  { document: "Mentor Engagement Contract", acknowledged: 11, required: 14, deadline: "20 Apr 2026", tone: "default" },
  { document: "ISO 27001 Information Security Policy", acknowledged: 9, required: 18, deadline: "10 Apr 2026", tone: "bad" },
];
