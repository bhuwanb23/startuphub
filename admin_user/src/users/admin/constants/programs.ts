import type { TimelineEvent } from "../components/shared/directory";

/* --------------------------------- content --------------------------------- */

export type ContentRow = {
  id: number;
  title: string;
  type: string;
  category: string;
  author: string;
  status: string;
  updated: string;
  views: string;
  timeline: TimelineEvent[];
};

export const CONTENT_ROWS: ContentRow[] = [
  { id: 1, title: "From TBI to Term Sheet: The Apex playbook", type: "Case study", category: "Ecosystem", author: "R. Dev", status: "Published", updated: "Apr 12", views: "18.2K", timeline: [{ when: "Apr 12", actor: "R. Dev (Ops)", action: "Published v3 (SEO metadata updated)" }] },
  { id: 2, title: "AgriSense Challenge — official announcement", type: "Announcement", category: "Programs", author: "Comms", status: "Scheduled", updated: "Apr 16", views: "—", timeline: [{ when: "Apr 13", actor: "T. Ali", action: "Approved for scheduled release Apr 16 09:00" }] },
  { id: 3, title: "DPIIT recognition: a founder's checklist", type: "Guide", category: "Compliance", author: "K. Bose", status: "Published", updated: "Apr 08", views: "42.6K", timeline: [] },
  { id: 4, title: "The state of Climate Compute, Q1", type: "Article", category: "Intelligence", author: "Intel desk", status: "In review", updated: "Apr 13", views: "—", timeline: [{ when: "Apr 13", actor: "Intel desk", action: "Submitted for editorial review" }] },
  { id: 5, title: "MediQueue: 120 hospitals and counting", type: "Success story", category: "Startups", author: "R. Dev", status: "Published", updated: "Mar 30", views: "9.4K", timeline: [] },
  { id: 6, title: "Grant writing masterclass (template pack)", type: "Downloadable", category: "Resources", author: "Programs team", status: "Draft", updated: "Apr 11", views: "—", timeline: [] },
  { id: 7, title: "\"Guaranteed grants\" — staying safe online", type: "Help article", category: "Trust & Safety", author: "Moderation", status: "Published", updated: "Apr 05", views: "31.8K", timeline: [] },
  { id: 8, title: "Old pricing FAQ (2024)", type: "FAQ", category: "Support", author: "Support", status: "Archived", updated: "Jan 02", views: "1.1K", timeline: [{ when: "Jan 02", actor: "R. Dev", action: "Archived — superseded by 2026 pricing page" }] },
];

/* ------------------------------ market content ------------------------------ */

export type MarketReportRow = {
  id: number;
  title: string;
  domain: string;
  source: string;
  confidence: string;
  freshness: string;
  coverage: string;
  updated: string;
  status: string;
  timeline: TimelineEvent[];
};

export const MARKET_REPORTS: MarketReportRow[] = [
  { id: 1, title: "India AgriTech Landscape 2026", domain: "AgriTech", source: "StartupHub Intel + Tracxn", confidence: "High", freshness: "Fresh", coverage: "Pan-India", updated: "Apr 10", status: "Published", timeline: [] },
  { id: 2, title: "Climate Compute — emerging segment brief", domain: "Climate", source: "Internal research", confidence: "Medium", freshness: "Fresh", coverage: "India + SEA", updated: "Apr 08", status: "Published", timeline: [] },
  { id: 3, title: "FinTech infra funding tracker Q1 FY26", domain: "FinTech", source: "Verified closes registry", confidence: "High", freshness: "Fresh", coverage: "Pan-India", updated: "Apr 02", status: "Published", timeline: [] },
  { id: 4, title: "Tier-2/3 founder participation study", domain: "Ecosystem", source: "Platform data (aggregate)", confidence: "Medium", freshness: "Stale (62d)", coverage: "Tier-2/3 cities", updated: "Feb 11", status: "Flagged", timeline: [{ when: "Apr 11", actor: "System", action: "Stale-data alert raised (>60d)" }] },
  { id: 5, title: "Health systems digitization — buyer map", domain: "HealthTech", source: "Partner survey (n=214)", confidence: "Medium", freshness: "Fresh", coverage: "South + West", updated: "Apr 06", status: "In review", timeline: [] },
  { id: 6, title: "Conflicting seed valuation medians — note", domain: "Funding", source: "Two sources disagree", confidence: "Low", freshness: "Fresh", coverage: "Pan-India", updated: "Apr 09", status: "Flagged", timeline: [{ when: "Apr 09", actor: "Intel desk", action: "Conflict flag — medians differ 38% between sources" }] },
];

export const MARKET_SOURCES = [
  { name: "StartupHub Intelligence desk", cadence: "Continuous", reliability: "Primary" },
  { name: "Verified closes registry", cadence: "Daily", reliability: "Primary" },
  { name: "Tracxn (licensed)", cadence: "Weekly", reliability: "Secondary" },
  { name: "Partner surveys", cadence: "Quarterly", reliability: "Secondary" },
  { name: "Public filings (MCA)", cadence: "Monthly", reliability: "Primary" },
];

/* --------------------------------- programs -------------------------------- */

export type ProgramRow = {
  id: number;
  name: string;
  type: string;
  sponsor: string;
  status: string;
  stage: string;
  applications: number;
  seats: number;
  window: string;
  timeline: TimelineEvent[];
};

export const PROGRAMS: ProgramRow[] = [
  { id: 1, name: "Frontier Cohort VII", type: "Incubation", sponsor: "Catalyst Labs", status: "Active", stage: "Selection", applications: 1214, seats: 40, window: "Closes Apr 23", timeline: [{ when: "Apr 02", actor: "R. Dev (Ops)", action: "Program published — notifications delivered to 4.2K eligible founders" }] },
  { id: 2, name: "AgriSense Grand Challenge", type: "Challenge", sponsor: "Ministry × StartupHub", status: "Published", stage: "Applications", applications: 486, seats: 12, window: "Closes Jun 02", timeline: [] },
  { id: 3, name: "Climate Compute Accelerator", type: "Accelerator", sponsor: "Meridian Ventures", status: "Active", stage: "Delivery (wk 6/12)", applications: 342, seats: 20, window: "Running", timeline: [] },
  { id: 4, name: "University Deep-Tech Residency", type: "Residency", sponsor: "Apex University", status: "Published", stage: "Applications", applications: 96, seats: 15, window: "Closes May 28", timeline: [] },
  { id: 5, name: "Seed Grant — Innovation Mission", type: "Grant", sponsor: "National Innovation Fdn.", status: "Active", stage: "Evaluation", applications: 2804, seats: 100, window: "Closes Apr 30", timeline: [] },
  { id: 6, name: "Frontier Cohort VI", type: "Incubation", sponsor: "Catalyst Labs", status: "Completed", stage: "Graduated", applications: 1084, seats: 40, window: "Closed Feb", timeline: [{ when: "Feb 28", actor: "System", action: "Program closed — impact report generated" }] },
  { id: 7, name: " women-led SaaS Sprint", type: "Sprint", sponsor: "StartupHub", status: "Draft", stage: "Configuration", applications: 0, seats: 25, window: "Not scheduled", timeline: [] },
  { id: 8, name: "Hardware Sandbox Bengaluru", type: "Sandbox", sponsor: "MakerSpace One", status: "Paused", stage: "Delivery (paused)", applications: 142, seats: 18, window: "On hold", timeline: [{ when: "Apr 01", actor: "K. Bose", action: "Paused — facility maintenance, resumes Apr 21" }] },
];

export type ApplicationRow = {
  id: number;
  startup: string;
  stage: string;
  sector: string;
  score: number;
  reviewer: string;
  status: string;
};

export const APPLICATIONS: ApplicationRow[] = [
  { id: 1, startup: "Vantara Robotics", stage: "Series A", sector: "AgriRobotics", score: 92, reviewer: "P. Nair", status: "Shortlisted" },
  { id: 2, startup: "AquaTrace", stage: "Pre-seed", sector: "Blue economy", score: 86, reviewer: "P. Nair", status: "Shortlisted" },
  { id: 3, startup: "CropSignal", stage: "Pre-seed", sector: "Agri data", score: 78, reviewer: "K. Bose", status: "In review" },
  { id: 4, startup: "ThermalStack", stage: "Series A", sector: "Climate infra", score: 84, reviewer: "S. Iyer", status: "Interview" },
  { id: 5, startup: "FarmLedger", stage: "MVP", sector: "Agri fintech", score: 71, reviewer: "K. Bose", status: "In review" },
  { id: 6, startup: "DroneSow", stage: "Seed", sector: "Agri drones", score: 64, reviewer: "P. Nair", status: "Waitlisted" },
  { id: 7, startup: "SoilScope AI", stage: "MVP", sector: "Agri data", score: 58, reviewer: "S. Iyer", status: "Rejected" },
  { id: 8, startup: "NanoSpray Labs", stage: "Idea", sector: "Materials", score: 49, reviewer: "—", status: "Screening" },
];

/* ---------------------------------- events --------------------------------- */

export type EventRow = {
  id: number;
  title: string;
  category: string;
  organizer: string;
  date: string;
  mode: string;
  registered: number;
  capacity: number;
  status: string;
  checkin: string;
  timeline: TimelineEvent[];
};

export const EVENTS: EventRow[] = [
  { id: 1, title: "StartupHub Capital Connect — Bengaluru", category: "Investor meetup", organizer: "StartupHub", date: "Apr 24, 2026", mode: "Physical", registered: 412, capacity: 500, status: "Published", checkin: "—", timeline: [] },
  { id: 2, title: "IPR Office Hours: patents for hardware", category: "Workshop", organizer: "IPR Cell", date: "Apr 17, 2026", mode: "Virtual", registered: 186, capacity: 200, status: "Published", checkin: "—", timeline: [] },
  { id: 3, title: "Frontier VII — Selection week kickoff", category: "Program", organizer: "Catalyst Labs", date: "Apr 14, 2026", mode: "Hybrid", registered: 240, capacity: 240, status: "Live", checkin: "221/240", timeline: [{ when: "09:02", actor: "System", action: "Check-in opened" }] },
  { id: 4, title: "University–Corporate Innovation Roundtable", category: "Roundtable", organizer: "Apex University", date: "May 06, 2026", mode: "Physical", registered: 88, capacity: 120, status: "Published", checkin: "—", timeline: [] },
  { id: 5, title: "Climate Compute demo day", category: "Demo day", organizer: "Meridian Ventures", date: "Mar 12, 2026", mode: "Hybrid", registered: 520, capacity: 520, status: "Completed", checkin: "486/520", timeline: [{ when: "Mar 12", actor: "System", action: "Event report generated" }] },
  { id: 6, title: "Founder legal bootcamp (April)", category: "Bootcamp", organizer: "LexVerse", date: "Apr 28, 2026", mode: "Virtual", registered: 0, capacity: 300, status: "Draft", checkin: "—", timeline: [] },
];

export const REGISTRATIONS = [
  { name: "Ravi Sharma · Lumen AI", type: "Founder", status: "Checked in" },
  { name: "Aditya Rao · Northbridge", type: "Investor", status: "Checked in" },
  { name: "Sara Mathew · GridSense", type: "Founder", status: "Checked in" },
  { name: "T. Srinivasan", type: "Mentor", status: "Registered" },
  { name: "D. Majumdar · Quantum Angels", type: "Investor", status: "No-show" },
  { name: "K. Reddy · Vantara", type: "Founder", status: "Registered" },
];
