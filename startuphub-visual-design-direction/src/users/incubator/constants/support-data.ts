/* StartupHub Labs — support datasets.
 *
 * One shared source for the five support screens (overview, funding, IPR,
 * market, investor connections). The per-startup views are *derived* from
 * the canonical portfolio rather than re-typed, so stage, readiness,
 * health and the money raised can never drift from the record the
 * portfolio page shows. Only the support-specific fields are hand-written.
 *
 * A test asserts every startup resolves to the portfolio, every investor
 * resolves to the public catalogue, and the counsel capacity matches what
 * the resources pages already promise.
 */

import { PORTFOLIO } from "./startups-data";

/* ── Types ─────────────────────────────────────────────────────── */

export type Tone = "default" | "accent" | "good" | "warn" | "bad";

export type SupportPillar = "Funding" | "IPR" | "Market" | "Investor";

export type SupportKpi = {
  label: string;
  value: string;
  note: string;
  tone: Tone;
};

export type PillarCoverage = {
  pillar: SupportPillar;
  startups: number;
  sessions: number;
  delivered: number;
  note: string;
  tone: Tone;
};

export type SupportQueueItem = {
  id: string;
  startup: string;
  startupSlug: string;
  need: string;
  pillar: SupportPillar;
  urgency: string;
  owner: string;
  due: string;
  note: string;
  tone: Tone;
};

export type SupportTeamMember = {
  name: string;
  initials: string;
  role: string;
  pillars: SupportPillar[];
  load: number;
  capacity: number;
  note: string;
  tone: Tone;
};

export type SupportIntervention = {
  id: string;
  action: string;
  startup: string;
  startupSlug: string;
  pillar: SupportPillar;
  impact: string;
  status: string;
  note: string;
  tone: Tone;
};

/* ── Funding ──────────────────────────────────────────────────── */

export type FundingStatus = {
  startup: string;
  startupSlug: string;
  stage: string;
  sector: string;
  readiness: number;
  health: number;
  raised: string;
  target: string;
  next: string;
  tone: Tone;
};

export type FundraisingDeal = {
  id: string;
  startup: string;
  startupSlug: string;
  round: string;
  target: string;
  status: string;
  lead: string;
  days: number;
  note: string;
  tone: Tone;
};

export type GrantScheme = {
  name: string;
  provider: string;
  amount: string;
  deadline: string;
  eligible: number;
  applied: number;
  note: string;
  tone: Tone;
};

export type FundingBlocker = {
  reason: string;
  startups: number;
  severity: string;
  fix: string;
  note: string;
  tone: Tone;
};

export type FundingIntervention = {
  id: string;
  action: string;
  startup: string;
  startupSlug: string;
  outcome: string;
  note: string;
  tone: Tone;
};

export type FundingCalendar = {
  month: string;
  event: string;
  count: number;
  note: string;
  tone: Tone;
};

/* ── IPR ──────────────────────────────────────────────────────── */

export type IpStatus = {
  startup: string;
  startupSlug: string;
  sector: string;
  filings: number;
  patents: number;
  trademarks: number;
  gaps: string;
  risk: string;
  tone: Tone;
};

export type IpPortfolioSlice = {
  type: string;
  count: number;
  share: number;
  note: string;
  tone: Tone;
};

export type IpRisk = {
  id: string;
  startup: string;
  startupSlug: string;
  risk: string;
  exposure: string;
  mitigation: string;
  note: string;
  tone: Tone;
};

export type IpExpert = {
  slug: string;
  name: string;
  initials: string;
  role: string;
  expertise: string[];
  match: number;
  availability: string;
  reason: string;
  tone: Tone;
};

export type CounselSlot = {
  month: string;
  slots: number;
  booked: number;
  note: string;
  tone: Tone;
};

export type IpDeadline = {
  id: string;
  filing: string;
  startup: string;
  startupSlug: string;
  due: string;
  days: number;
  owner: string;
  note: string;
  tone: Tone;
};

/* ── Market ───────────────────────────────────────────────────── */

export type MarketReadiness = {
  startup: string;
  startupSlug: string;
  sector: string;
  market: string;
  readiness: number;
  firstRevenue: string;
  blocker: string;
  tone: Tone;
};

export type CorporatePilot = {
  id: string;
  startup: string;
  startupSlug: string;
  corporate: string;
  objective: string;
  stage: string;
  window: string;
  note: string;
  tone: Tone;
};

export type GovOpportunity = {
  id: string;
  name: string;
  provider: string;
  amount: string;
  deadline: string;
  matches: number;
  note: string;
  tone: Tone;
};

export type MarketBlocker = {
  blocker: string;
  startups: number;
  cost: string;
  fix: string;
  note: string;
  tone: Tone;
};

export type MarketIntro = {
  id: string;
  startup: string;
  startupSlug: string;
  partner: string;
  type: string;
  status: string;
  value: string;
  note: string;
  tone: Tone;
};

export type SectorDemand = {
  sector: string;
  interest: number;
  startups: number;
  note: string;
  tone: Tone;
};

/* ── Investor connections ─────────────────────────────────────── */

export type InvestorMatch = {
  id: string;
  startup: string;
  startupSlug: string;
  investor: string;
  investorSlug: string;
  stage: string;
  score: number;
  warm: string;
  note: string;
  tone: Tone;
};

export type IntroPipeline = {
  id: string;
  startup: string;
  startupSlug: string;
  investor: string;
  investorSlug: string;
  requested: string;
  status: string;
  meetings: number;
  note: string;
  tone: Tone;
};

export type InvestorDemand = {
  stage: string;
  interest: number;
  count: number;
  note: string;
  tone: Tone;
};

export type Relationship = {
  investor: string;
  investorSlug: string;
  lastTouch: string;
  strength: number;
  note: string;
  tone: Tone;
};

/* ── Support overview ─────────────────────────────────────────── */

export const SUPPORT_KPIS: SupportKpi[] = [
  { label: "Startups in support", value: "13", note: "all tracked portfolio ventures", tone: "accent" },
  { label: "Support sessions", value: "71", note: "delivered this quarter", tone: "good" },
  { label: "Open requests", value: "9", note: "3 flagged urgent", tone: "warn" },
  { label: "Capital mobilised", value: "₹27.4 Cr", note: "across 5 live raises", tone: "accent" },
];

export const PILLAR_COVERAGE: PillarCoverage[] = [
  { pillar: "Funding", startups: 8, sessions: 26, delivered: 14, note: "Five live raises and three grant applications", tone: "accent" },
  { pillar: "IPR", startups: 7, sessions: 18, delivered: 11, note: "Eleven filings cleared, four still outstanding", tone: "warn" },
  { pillar: "Market", startups: 6, sessions: 15, delivered: 9, note: "Corporate pilots, procurement and intros", tone: "good" },
  { pillar: "Investor", startups: 5, sessions: 12, delivered: 8, note: "Thirty-four introductions delivered", tone: "good" },
];

export const SUPPORT_QUEUE: SupportQueueItem[] = [
  { id: "sq-1", startup: "FreshChain", startupSlug: "freshchain", need: "Emergency bridge — 4 months of runway", pillar: "Funding", urgency: "Urgent", owner: "Arjun Nair", due: "2 days", note: "Angels shortlist of four is ready to approach", tone: "bad" },
  { id: "sq-2", startup: "OrbitalWorks", startupSlug: "orbitalworks", need: "Patent filing — design registration", pillar: "IPR", urgency: "Urgent", owner: "Nandita Bose", due: "6 days", note: "Demo day is in three weeks", tone: "bad" },
  { id: "sq-3", startup: "MedSync", startupSlug: "medsync", need: "Trademark class 9", pillar: "IPR", urgency: "Soon", owner: "Nandita Bose", due: "11 days", note: "Brand launch is scheduled for the same week", tone: "warn" },
  { id: "sq-4", startup: "GridSense", startupSlug: "gridsense", need: "Corporate pilot — utility operator", pillar: "Market", urgency: "Urgent", owner: "Sunita Deshmukh", due: "4 days", note: "Two operators have asked for a deck", tone: "bad" },
  { id: "sq-5", startup: "TerraGrid", startupSlug: "terragrid", need: "Series A readiness review", pillar: "Funding", urgency: "Soon", owner: "Arjun Nair", due: "9 days", note: "Metrics are there, the narrative is not", tone: "warn" },
  { id: "sq-6", startup: "FinEdge", startupSlug: "finedge", need: "Seed investor intros — 3 targets", pillar: "Investor", urgency: "Soon", owner: "Meera Iyer", due: "14 days", note: "Data room is two-thirds complete", tone: "warn" },
  { id: "sq-7", startup: "HealthLoop", startupSlug: "healthloop", need: "Procurement — district hospital pilot", pillar: "Market", urgency: "Soon", owner: "Sunita Deshmukh", due: "18 days", note: "District selection closes at the end of the month", tone: "warn" },
  { id: "sq-8", startup: "BloomBio", startupSlug: "bloombio", need: "Assay validation bench time", pillar: "IPR", urgency: "Routine", owner: "Kavi Sharma", due: "3 weeks", note: "Coordinates with the resource request already open", tone: "default" },
  { id: "sq-9", startup: "EduFold", startupSlug: "edufold", need: "School district pilot — 2 districts", pillar: "Market", urgency: "Routine", owner: "Vikram Rao", due: "4 weeks", note: "Districts need a 6-week procurement cycle", tone: "default" },
];

export const SUPPORT_TEAM: SupportTeamMember[] = [
  { name: "Arjun Nair", initials: "AN", role: "Funding Lead", pillars: ["Funding", "Investor"], load: 78, capacity: 100, note: "Carries every live raise plus the grant calendar", tone: "warn" },
  { name: "Nandita Bose", initials: "NB", role: "IPR Counsel", pillars: ["IPR"], load: 92, capacity: 100, note: "Four pro bono slots a month, and all four are booked", tone: "bad" },
  { name: "Sunita Deshmukh", initials: "SD", role: "VP Innovation, Arvind Industries", pillars: ["Market"], load: 61, capacity: 100, note: "Runs the corporate pilot pipeline", tone: "good" },
  { name: "Meera Iyer", initials: "MI", role: "Program Director", pillars: ["Investor", "Funding"], load: 55, capacity: 100, note: "Handles escalations and warm intros", tone: "good" },
];

export const SUPPORT_INTERVENTIONS: SupportIntervention[] = [
  { id: "si-1", action: "Ran the term-sheet clinic for TerraGrid", startup: "TerraGrid", startupSlug: "terragrid", pillar: "Funding", impact: "High", status: "Delivered", note: "Walked the founder through three clauses she had not seen before", tone: "good" },
  { id: "si-2", action: "Cleared two patent filings before demo day", startup: "OrbitalWorks", startupSlug: "orbitalworks", pillar: "IPR", impact: "High", status: "Delivered", note: "Used the second pro bono slot of the month", tone: "good" },
  { id: "si-3", action: "Introduced GridSense to a utility procurement lead", startup: "GridSense", startupSlug: "gridsense", pillar: "Market", impact: "High", status: "In progress", note: "First meeting booked — a pilot scope follows if it goes well", tone: "accent" },
  { id: "si-4", action: "Delivered three investor intros for FinEdge", startup: "FinEdge", startupSlug: "finedge", pillar: "Investor", impact: "Medium", status: "Delivered", note: "Two funds asked for the data room within a day", tone: "good" },
  { id: "si-5", action: "Guided the Samriddhi grant application", startup: "QuantumLeaf", startupSlug: "quantumleaf", pillar: "Funding", impact: "Medium", status: "In progress", note: "Shortlisted — the full application is the next step", tone: "accent" },
  { id: "si-6", action: "Rebuilt the FreshChain runway plan", startup: "FreshChain", startupSlug: "freshchain", pillar: "Funding", impact: "High", status: "In progress", note: "Turned a four-month gap into a twelve-week bridge ask", tone: "warn" },
];

/* ── Funding data ─────────────────────────────────────────────── */

/* Support-specific fields per startup. Everything else — stage, readiness,
 * health and money raised — is read straight from the portfolio. */
const FUNDING_DETAIL: Record<
  string,
  { target: string; next: string; tone: Tone }
> = {
  "lumen-ai": { target: "Series B · ₹40 Cr", next: "Data room audit before the first raise", tone: "good" },
  "aquapure": { target: "Series A · ₹25 Cr", next: "Unit economics proof for the diligence pack", tone: "good" },
  "terragrid": { target: "Series A · ₹18 Cr", next: "Narrative rework — metrics are already there", tone: "warn" },
  "finedge": { target: "Pre-seed · ₹2.5 Cr", next: "Three seed intros queued, data room 70% done", tone: "warn" },
  "orbitalworks": { target: "Series A · ₹30 Cr", next: "Deep-tech round, Atlas Capital is the obvious lead", tone: "good" },
  "freshchain": { target: "Bridge · ₹1.2 Cr", next: "Emergency bridge — angels shortlist of four", tone: "bad" },
  "gridsense": { target: "Seed · ₹6 Cr", next: "Pilot conversion before the next raise", tone: "bad" },
  "medsync": { target: "Series B · ₹60 Cr", next: "No action — the round is not the constraint", tone: "good" },
  "edufold": { target: "Pre-seed · ₹1.5 Cr", next: "District pilots will carry the story", tone: "default" },
  "healthloop": { target: "Pre-seed · ₹3 Cr", next: "Procurement proof is the cheapest route in", tone: "warn" },
  "quantumleaf": { target: "Pre-seed · ₹2 Cr", next: "Samriddhi grant shortlisted — apply before the window closes", tone: "default" },
  "bloombio": { target: "Pre-seed · ₹4 Cr", next: "Assay validation before any raise conversation", tone: "default" },
  "silkroute": { target: "Validation · ₹1.8 Cr", next: "First revenue will carry this raise", tone: "default" },
};

export const FUNDING_STATUS: FundingStatus[] = PORTFOLIO.map((p) => {
  const d = FUNDING_DETAIL[p.slug];
  return {
    startup: p.name,
    startupSlug: p.slug,
    stage: p.stage,
    sector: p.sector,
    readiness: p.readiness,
    health: p.health,
    raised: p.raised,
    target: d.target,
    next: d.next,
    tone: d.tone,
  };
});

export const FUNDING_DEALS: FundraisingDeal[] = [
  { id: "fd-1", startup: "Lumen AI", startupSlug: "lumen-ai", round: "Series B", target: "₹40 Cr", status: "Data room", lead: "Northgate Partners", days: 21, note: "Auditing the data room before the first partner meeting", tone: "good" },
  { id: "fd-2", startup: "AquaPure", startupSlug: "aquapure", round: "Series A", target: "₹25 Cr", status: "Diligence", lead: "Meridian Labs", days: 12, note: "Strategic lead — the corporate angle is the differentiator", tone: "good" },
  { id: "fd-3", startup: "TerraGrid", startupSlug: "terragrid", round: "Series A", target: "₹18 Cr", status: "Narrative", lead: "Vertex Global", days: 6, note: "The fund liked the traction and not the story", tone: "warn" },
  { id: "fd-4", startup: "OrbitalWorks", startupSlug: "orbitalworks", round: "Series A", target: "₹30 Cr", status: "First meeting", lead: "Atlas Capital", days: 28, note: "Deep-tech fund — bring the physics, not the deck", tone: "accent" },
  { id: "fd-5", startup: "FinEdge", startupSlug: "finedge", round: "Pre-seed", target: "₹2.5 Cr", status: "Intro queued", lead: "Nexus Angels", days: 9, note: "Angel network — three targets, all within the ticket", tone: "warn" },
  { id: "fd-6", startup: "FreshChain", startupSlug: "freshchain", round: "Bridge", target: "₹1.2 Cr", status: "At risk", lead: "Samriddhi Fund", days: 2, note: "Fund-of-funds route is slow — angels are the fallback", tone: "bad" },
  { id: "fd-7", startup: "GridSense", startupSlug: "gridsense", round: "Seed", target: "₹6 Cr", status: "Paused", lead: "—", days: 45, note: "Paused until the utility pilot converts", tone: "bad" },
  { id: "fd-8", startup: "MedSync", startupSlug: "medsync", round: "Series B", target: "₹60 Cr", status: "Not raising", lead: "—", days: 90, note: "Profitable and not raising — this is a different kind of support", tone: "good" },
];

export const GRANT_SCHEMES: GrantScheme[] = [
  { name: "Samriddhi Inclusion Fund", provider: "Government of India", amount: "₹20 L – ₹2 Cr", deadline: "18 May 2026", eligible: 3, applied: 2, note: "Shortlisted QuantumLeaf and FreshChain", tone: "accent" },
  { name: "Karnataka Startup Mission", provider: "State Government", amount: "₹10 L – ₹50 L", deadline: "30 Apr 2026", eligible: 7, applied: 4, note: "Rolling — eligibility is automatic for enrolled startups", tone: "good" },
  { name: " BIRAC BIG Grant", provider: "Department of Biotechnology", amount: "₹50 L", deadline: "12 Jun 2026", eligible: 2, applied: 0, note: "Only BloomBio qualifies and has not applied", tone: "warn" },
  { name: "DSR Central Fund", provider: "ISRO", amount: "₹15 L – ₹40 L", deadline: "22 May 2026", eligible: 3, applied: 1, note: "TerraGrid is eligible, EduFold is not", tone: "default" },
  { name: "Atmanirbhar Seed Fund", provider: "Government of India", amount: "₹20 L – ₹50 L", deadline: "08 May 2026", eligible: 6, applied: 3, note: "The most-used scheme in the portfolio", tone: "good" },
];

export const FUNDING_BLOCKERS: FundingBlocker[] = [
  { reason: "No data room", startups: 3, severity: "Critical", fix: "Template and a two-hour setup clinic", note: "The single most common reason a raise stalls", tone: "bad" },
  { reason: "Metrics not instrumented", startups: 2, severity: "High", fix: "Analytics sprint with a mentor", note: "Both are pre-revenue and cannot show a curve", tone: "warn" },
  { reason: "Story does not match the market", startups: 2, severity: "High", fix: "Narrative review with a domain investor", note: "Both are pitching the category rather than the wedge", tone: "warn" },
  { reason: "No named lead investor", startups: 3, severity: "Medium", fix: "Targeted intros from the investor network", note: "Seven startups are looking for a first cheque", tone: "default" },
  { reason: "Round size below the market", startups: 1, severity: "Medium", fix: "Wait, or add a co-investor", note: "The round is real but will not move the needle", tone: "default" },
  { reason: "Cap table needs cleaning", startups: 2, severity: "Low", fix: "One session with an incorporation specialist", note: "Two hours of work that unblocks a term sheet", tone: "default" },
];

export const FUNDING_INTERVENTIONS: FundingIntervention[] = [
  { id: "fi-1", action: "Data room setup clinic", startup: "FinEdge", startupSlug: "finedge", outcome: "Data room 70% complete", note: "Two hours of work that unblocked the intros", tone: "good" },
  { id: "fi-2", action: "Term-sheet clinic", startup: "TerraGrid", startupSlug: "terragrid", outcome: "Three clauses clarified", note: "Founder had not seen a liquidation preference before", tone: "good" },
  { id: "fi-3", action: "Runway rebuild", startup: "FreshChain", startupSlug: "freshchain", outcome: "12-week bridge ask", note: "Down from a four-month gap", tone: "good" },
  { id: "fi-4", action: "Grant application drafted", startup: "QuantumLeaf", startupSlug: "quantumleaf", outcome: "Shortlisted", note: "Samriddhi shortlist — full application is the next step", tone: "accent" },
  { id: "fi-5", action: "Metrics instrumentation sprint", startup: "SilkRoute AI", startupSlug: "silkroute", outcome: "Dashboard live", note: "Priced per route, ready for a diligence pack", tone: "good" },
  { id: "fi-6", action: "Investor narrative review", startup: "OrbitalWorks", startupSlug: "orbitalworks", outcome: "Rewritten for deep tech", note: "Physics first, market second", tone: "accent" },
];

export const FUNDING_CALENDAR: FundingCalendar[] = [
  { month: "Apr 2026", event: "Karnataka Startup Mission deadline", count: 4, note: "Four applications already in", tone: "good" },
  { month: "May 2026", event: "Atmanirbhar Seed Fund deadline", count: 3, note: "Applications close on the 8th", tone: "warn" },
  { month: "May 2026", event: "Samriddhi Fund deadline", count: 2, note: "One shortlisted, one application still missing", tone: "warn" },
  { month: "Jun 2026", event: "BIRAC BIG Grant deadline", count: 0, note: "BloomBio has not applied and it is the only fit", tone: "bad" },
  { month: "Jun 2026", event: "Demo day — Cohort VI", count: 14, note: "Two raises are pitched on the same day", tone: "accent" },
];

/* ── IPR data ─────────────────────────────────────────────────── */

const IP_DETAIL: Record<
  string,
  { filings: number; patents: number; trademarks: number; gaps: string; risk: string; tone: Tone }
> = {
  "lumen-ai": { filings: 4, patents: 2, trademarks: 2, gaps: "None — exemplar", risk: "Low", tone: "good" },
  "aquapure": { filings: 2, patents: 1, trademarks: 1, gaps: "Design filing pending", risk: "Medium", tone: "accent" },
  "terragrid": { filings: 3, patents: 2, trademarks: 1, gaps: "No copyright on the model", risk: "Low", tone: "good" },
  "finedge": { filings: 2, patents: 1, trademarks: 1, gaps: "Trade secret policy missing", risk: "Medium", tone: "accent" },
  "orbitalworks": { filings: 3, patents: 3, trademarks: 0, gaps: "Design registration outstanding", risk: "High", tone: "bad" },
  "freshchain": { filings: 0, patents: 0, trademarks: 0, gaps: "No IP strategy at all", risk: "High", tone: "bad" },
  "gridsense": { filings: 1, patents: 1, trademarks: 0, gaps: "Trademark class 42 missing", risk: "Medium", tone: "warn" },
  "medsync": { filings: 2, patents: 0, trademarks: 2, gaps: "Trademark class 9 missing", risk: "High", tone: "warn" },
  "edufold": { filings: 1, patents: 0, trademarks: 1, gaps: "Curriculum copyright incomplete", risk: "Medium", tone: "accent" },
  "healthloop": { filings: 2, patents: 1, trademarks: 1, gaps: "None — filed before launch", risk: "Low", tone: "good" },
  "quantumleaf": { filings: 2, patents: 2, trademarks: 0, gaps: "Co-ownership with the university unsigned", risk: "Medium", tone: "warn" },
  "bloombio": { filings: 2, patents: 2, trademarks: 0, gaps: "Provisional not converted", risk: "High", tone: "bad" },
  "silkroute": { filings: 1, patents: 1, trademarks: 0, gaps: "Assignment from the founder missing", risk: "Medium", tone: "warn" },
};

export const IP_STATUS: IpStatus[] = PORTFOLIO.map((p) => {
  const d = IP_DETAIL[p.slug];
  return {
    startup: p.name,
    startupSlug: p.slug,
    sector: p.sector,
    filings: d.filings,
    patents: d.patents,
    trademarks: d.trademarks,
    gaps: d.gaps,
    risk: d.risk,
    tone: d.tone,
  };
});

export const IP_PORTFOLIO: IpPortfolioSlice[] = [
  { type: "Patents", count: 16, share: 42, note: "The largest block — mostly method and process claims", tone: "accent" },
  { type: "Trademarks", count: 9, share: 24, note: "Under-filed — four class gaps remain", tone: "warn" },
  { type: "Copyrights", count: 7, share: 18, note: "Code, curriculum and datasets", tone: "default" },
  { type: "Designs", count: 6, share: 16, note: "Two are still provisional", tone: "bad" },
];

export const IP_RISKS: IpRisk[] = [
  { id: "ir-1", startup: "BloomBio", startupSlug: "bloombio", risk: "Provisional patent lapses before the next round", exposure: "2 provisionals · 60 days left", mitigation: "Convert both before the BIRAC deadline", note: "A lapsed provisional cannot be restored", tone: "bad" },
  { id: "ir-2", startup: "OrbitalWorks", startupSlug: "orbitalworks", risk: "No design registration before demo day", exposure: "3 weeks to demo day", mitigation: "Second pro bono slot of the month", note: "Nandita Bose is holding the slot", tone: "bad" },
  { id: "ir-3", startup: "MedSync", startupSlug: "medsync", risk: "Trademark class 9 collides with a live mark", exposure: "Brand launch in 11 days", mitigation: "Clear the class before the launch date", note: "A launch in conflict is a rebrand later", tone: "bad" },
  { id: "ir-4", startup: "FreshChain", startupSlug: "freshchain", risk: "No IP position at all", exposure: "0 filings", mitigation: "IP strategy session, then a filing plan", note: "The cheapest fix is the earliest one", tone: "bad" },
  { id: "ir-5", startup: "QuantumLeaf", startupSlug: "quantumleaf", risk: "University co-ownership unsigned", exposure: "2 patents · ownership unclear", mitigation: "Sign the co-ownership assignment", note: "Diligence will stop on this", tone: "warn" },
  { id: "ir-6", startup: "SilkRoute AI", startupSlug: "silkroute", risk: "Founder assignment missing on one patent", exposure: "1 patent · chain of title broken", mitigation: "Record a one-page assignment", note: "Every investor's counsel will ask", tone: "warn" },
];

export const IP_EXPERTS: IpExpert[] = [
  { slug: "dr-meera-krishnan", name: "Dr. Meera Krishnan", initials: "DM", role: "IPR Attorney & Strategist", expertise: ["Patents", "IP strategy", "Licensing"], match: 94, availability: "Monthly office hours", reason: "5 IP filings still outstanding before Cohort VI demo day", tone: "good" },
  { slug: "karan-chadha", name: "Karan Chadha", initials: "KC", role: "Product & EdTech advisor", expertise: ["Product", "EdTech", "Consumer UX"], match: 88, availability: "2 slots / month", reason: "EduFold's curriculum copyright is incomplete", tone: "accent" },
  { slug: "priya-nair", name: "Priya Nair", initials: "PN", role: "ex-CTO, ZetaPay", expertise: ["Architecture", "Scaling teams", "FinTech"], match: 81, availability: "2 slots / week", reason: "Trade-secret policy for FinEdge needs a technical owner", tone: "default" },
  { slug: "vikram-rao", name: "Vikram Rao", initials: "VR", role: "ex-VP Growth, FreshKart", expertise: ["Growth loops", "Retention", "Marketplaces"], match: 76, availability: "1 slot / week", reason: "Advises on the licensing model when EduFold goes to schools", tone: "default" },
];

export const COUNSEL_SLOTS: CounselSlot[] = [
  { month: "Apr 2026", slots: 4, booked: 4, note: "Full — OrbitalWorks took the fourth slot", tone: "bad" },
  { month: "May 2026", slots: 4, booked: 2, note: "Two free — one is earmarked for MedSync", tone: "warn" },
  { month: "Jun 2026", slots: 4, booked: 0, note: "Open — the line expires on 31 May and must be renewed", tone: "default" },
];

export const IP_DEADLINES: IpDeadline[] = [
  { id: "id-1", filing: "Design registration — payload housing", startup: "OrbitalWorks", startupSlug: "orbitalworks", due: "28 Apr 2026", days: 6, owner: "Nandita Bose", note: "Demo day is 20 May", tone: "bad" },
  { id: "id-2", filing: "Trademark class 9 — MedSync", startup: "MedSync", startupSlug: "medsync", due: "03 May 2026", days: 11, owner: "Nandita Bose", note: "Brand launch is 14 May", tone: "bad" },
  { id: "id-3", filing: "Provisional conversion — assay method", startup: "BloomBio", startupSlug: "bloombio", due: "18 May 2026", days: 26, owner: "Nandita Bose", note: "Convert before the BIRAC deadline", tone: "warn" },
  { id: "id-4", filing: "Trademark class 42 — GridSense", startup: "GridSense", startupSlug: "gridsense", due: "26 May 2026", days: 34, owner: "Nandita Bose", note: "The pilot agreement needs it in place", tone: "warn" },
  { id: "id-5", filing: "Co-ownership assignment", startup: "QuantumLeaf", startupSlug: "quantumleaf", due: "12 Jun 2026", days: 51, owner: "Meera Iyer", note: "Diligence will stop on this", tone: "default" },
  { id: "id-6", filing: "Founder assignment — routing patent", startup: "SilkRoute AI", startupSlug: "silkroute", due: "22 Jun 2026", days: 61, owner: "Meera Iyer", note: "One page, but it has to be signed", tone: "default" },
];

/* ── Market data ──────────────────────────────────────────────── */

const MARKET_DETAIL: Record<
  string,
  { market: string; readiness: number; firstRevenue: string; blocker: string; tone: Tone }
> = {
  "lumen-ai": { market: "AgriTech — farm advisory", readiness: 82, firstRevenue: "₹1.2 Cr ARR", blocker: "None — the channel works", tone: "good" },
  "aquapure": { market: "Water — municipal treatment", readiness: 79, firstRevenue: "₹0.8 Cr ARR", blocker: "Procurement cycle is 90 days", tone: "good" },
  "terragrid": { market: "Climate — carbon accounting", readiness: 68, firstRevenue: "₹0.5 Cr ARR", blocker: "Two pilots still unconverted", tone: "warn" },
  "finedge": { market: "FinTech — NBFC lending", readiness: 63, firstRevenue: "₹0.2 Cr ARR", blocker: "No reference customer yet", tone: "warn" },
  "orbitalworks": { market: "Space — ground segment", readiness: 76, firstRevenue: "₹0.6 Cr ARR", blocker: "Procurement is slow and seasonal", tone: "accent" },
  "freshchain": { market: "AgriTech — cold chain", readiness: 41, firstRevenue: "₹0.1 Cr ARR", blocker: "Co-founder conflict is stalling everything", tone: "bad" },
  "gridsense": { market: "Energy — utility forecasting", readiness: 54, firstRevenue: "₹0.3 Cr ARR", blocker: "Pilot did not convert to a contract", tone: "bad" },
  "medsync": { market: "HealthTech — diagnostics", readiness: 84, firstRevenue: "₹2.1 Cr ARR", blocker: "None — scaling is the constraint", tone: "good" },
  "edufold": { market: "EdTech — school districts", readiness: 71, firstRevenue: "₹0.2 Cr ARR", blocker: "Procurement needs two districts", tone: "accent" },
  "healthloop": { market: "HealthTech — hospital care", readiness: 58, firstRevenue: "₹0.1 Cr ARR", blocker: "District selection has not happened", tone: "warn" },
  "quantumleaf": { market: "Climate — agriculture MRV", readiness: 56, firstRevenue: "₹0.1 Cr ARR", blocker: "No buyer beyond the pilot partner", tone: "warn" },
  "bloombio": { market: "BioTech — diagnostics kits", readiness: 61, firstRevenue: "₹0.2 Cr ARR", blocker: "Assay validation is not finished", tone: "warn" },
  "silkroute": { market: "Logistics — route optimisation", readiness: 72, firstRevenue: "₹0.4 Cr ARR", blocker: "Enterprise sales cycle is long", tone: "accent" },
};

export const MARKET_READINESS: MarketReadiness[] = PORTFOLIO.map((p) => {
  const d = MARKET_DETAIL[p.slug];
  return {
    startup: p.name,
    startupSlug: p.slug,
    sector: p.sector,
    market: d.market,
    readiness: d.readiness,
    firstRevenue: d.firstRevenue,
    blocker: d.blocker,
    tone: d.tone,
  };
});

export const CORPORATE_PILOTS: CorporatePilot[] = [
  { id: "cp-1", startup: "GridSense", startupSlug: "gridsense", corporate: "Arvind Industries", objective: "Forecast load on 3 substations", stage: "Negotiation", window: "Apr 2026 – Jun 2026", note: "Two procurement leads have asked for a deck", tone: "warn" },
  { id: "cp-2", startup: "TerraGrid", startupSlug: "terragrid", corporate: "ColdNet Logistics", objective: "Carbon reporting across 8 routes", stage: "Pilot", window: "Mar 2026 – May 2026", note: "KPI target is a 6-hour prediction horizon", tone: "accent" },
  { id: "cp-3", startup: "AquaPure", startupSlug: "aquapure", corporate: "Municipal water authority", objective: "Turbidity anomaly detection", stage: "Pilot", window: "Apr 2026 – Jul 2026", note: "The corporate VC is in the same round", tone: "good" },
  { id: "cp-4", startup: "Lumen AI", startupSlug: "lumen-ai", corporate: "AgriInput Sciences", objective: "Advisory for 4,000 farms", stage: "Scaled", window: "Nov 2025 – ongoing", note: "Converted from pilot to a paid contract", tone: "good" },
  { id: "cp-5", startup: "HealthLoop", startupSlug: "healthloop", corporate: "District hospital network", objective: "Care pathway pilot, 2 units", stage: "Proposed", window: "May 2026 – Aug 2026", note: "District selection closes at the end of the month", tone: "warn" },
  { id: "cp-6", startup: "EduFold", startupSlug: "edufold", corporate: "State education department", objective: "Pilot in 2 districts", stage: "Proposed", window: "Jun 2026 – Sep 2026", note: "Districts need a 6-week procurement cycle", tone: "default" },
];

export const GOV_OPPORTUNITIES: GovOpportunity[] = [
  { id: "go-1", name: "BIRAC BIG Grant — biotech", provider: "Department of Biotechnology", amount: "₹50 L", deadline: "12 Jun 2026", matches: 1, note: "Only BloomBio qualifies — and it has not applied", tone: "bad" },
  { id: "go-2", name: "DSR Central Fund — space", provider: "ISRO", amount: "₹15 L – ₹40 L", deadline: "22 May 2026", matches: 2, note: "OrbitalWorks and TerraGrid are both eligible", tone: "accent" },
  { id: "go-3", name: "Smart Cities Mission — water", provider: "Ministry of Housing", amount: "₹25 L", deadline: "30 Jun 2026", matches: 1, note: "AquaPure's municipal contact is already in place", tone: "good" },
  { id: "go-4", name: "Rural Employment Fund — agri", provider: "Government of India", amount: "₹10 L – ₹30 L", deadline: "18 May 2026", matches: 2, note: "FreshChain and Lumen AI both fit the criteria", tone: "warn" },
  { id: "go-5", name: "National Education Mission — edtech", provider: "Ministry of Education", amount: "₹20 L", deadline: "10 Jul 2026", matches: 1, note: "EduFold needs the district pilot to qualify", tone: "default" },
];

export const MARKET_BLOCKERS: MarketBlocker[] = [
  { blocker: "Procurement cycle longer than the runway", startups: 4, cost: "4–9 months", fix: "Bridge the gap from the grant route", note: "The most expensive blocker on this list", tone: "bad" },
  { blocker: "Pilot did not convert to a contract", startups: 2, cost: "₹0 – ₹15 L", fix: "Re-scope the pilot with a signed success metric", note: "Both had a pilot and no commercial terms", tone: "bad" },
  { blocker: "No reference customer", startups: 2, cost: "₹5 L – ₹10 L", fix: "Design partner at a discount", note: "Both are pre-revenue with no logo to show", tone: "warn" },
  { blocker: "Product not ready for a pilot", startups: 2, cost: "1 quarter", fix: "Fix the build before the intro, not after", note: "An intro to a broken product burns the relationship", tone: "warn" },
  { blocker: "Sector procurement is closed for the quarter", startups: 3, cost: "1 quarter", fix: "Time the intro to the next window", note: "Nothing to fix — this is calendar", tone: "default" },
];

export const MARKET_INTROS: MarketIntro[] = [
  { id: "mi-1", startup: "GridSense", startupSlug: "gridsense", partner: "Arvind Industries", type: "Corporate pilot", status: "Negotiation", value: "₹12 L pilot", note: "Procurement lead asked for the deck on Friday", tone: "accent" },
  { id: "mi-2", startup: "TerraGrid", startupSlug: "terragrid", partner: "ColdNet Logistics", type: "Corporate pilot", status: "Running", value: "₹9 L pilot", note: "KPIs are being met", tone: "good" },
  { id: "mi-3", startup: "AquaPure", startupSlug: "aquapure", partner: "Municipal water authority", type: "Procurement", status: "Pilot", value: "₹15 L pilot", note: "The corporate VC sits in the same round", tone: "good" },
  { id: "mi-4", startup: "Lumen AI", startupSlug: "lumen-ai", partner: "AgriInput Sciences", type: "Contract", status: "Signed", value: "₹45 L contract", note: "The one that worked", tone: "good" },
  { id: "mi-5", startup: "HealthLoop", startupSlug: "healthloop", partner: "District hospital network", type: "Pilot", status: "Proposed", value: "₹8 L pilot", note: "District selection closes 30 Apr", tone: "warn" },
  { id: "mi-6", startup: "EduFold", startupSlug: "edufold", partner: "State education department", type: "Pilot", status: "Proposed", value: "₹6 L pilot", note: "Six-week procurement cycle", tone: "default" },
];

export const SECTOR_DEMAND: SectorDemand[] = [
  { sector: "AgriTech", interest: 3, startups: 3, note: "The warmest sector — three funds want more here", tone: "good" },
  { sector: "ClimateTech", interest: 3, startups: 2, note: "Two funds are actively looking", tone: "good" },
  { sector: "HealthTech", interest: 3, startups: 2, note: "One is growth-stage only, which is not our range", tone: "accent" },
  { sector: "DeepTech", interest: 2, startups: 1, note: "One fund, but a very good fit", tone: "accent" },
  { sector: "FinTech", interest: 1, startups: 1, note: "Thin investor appetite in our range", tone: "warn" },
  { sector: "Logistics", interest: 1, startups: 1, note: "Only a growth-stage fund in the network", tone: "warn" },
];

/* ── Investor connections ─────────────────────────────────────── */

export const INVESTOR_MATCHES: InvestorMatch[] = [
  { id: "im-1", startup: "OrbitalWorks", startupSlug: "orbitalworks", investor: "Atlas Capital", investorSlug: "atlas-capital", stage: "Series A", score: 94, warm: "Warm", note: "Deep-tech specialist — the first call was a fit, not a pitch", tone: "good" },
  { id: "im-2", startup: "TerraGrid", startupSlug: "terragrid", investor: "Vertex Global", investorSlug: "vertex-global", stage: "Series A", score: 87, warm: "Cold", note: "Climate fit, but they lead Series A and we are at Seed", tone: "accent" },
  { id: "im-3", startup: "AquaPure", startupSlug: "aquapure", investor: "Meridian Labs", investorSlug: "meridian-labs", stage: "Series A", score: 89, warm: "Warm", note: "Strategic — the pilot is already running inside the group", tone: "good" },
  { id: "im-4", startup: "Lumen AI", startupSlug: "lumen-ai", investor: "Northgate Partners", investorSlug: "northgate-partners", stage: "Series B", score: 72, warm: "Cold", note: "AgriTech fit; their Series A is done, so this is a stretch", tone: "warn" },
  { id: "im-5", startup: "FinEdge", startupSlug: "finedge", investor: "Nexus Angels", investorSlug: "nexus-angels", stage: "Pre-seed", score: 91, warm: "Warm", note: "Ticket and stage line up exactly", tone: "good" },
  { id: "im-6", startup: "HealthLoop", startupSlug: "healthloop", investor: "Nexus Angels", investorSlug: "nexus-angels", stage: "Pre-seed", score: 84, warm: "Warm", note: "HealthTech operators, and they write first cheques fast", tone: "good" },
  { id: "im-7", startup: "FreshChain", startupSlug: "freshchain", investor: "Samriddhi Fund", investorSlug: "samriddhi-fund", stage: "Bridge", score: 79, warm: "Cold", note: "Fund-of-funds route is slow for a bridge — angels are faster", tone: "warn" },
  { id: "im-8", startup: "QuantumLeaf", startupSlug: "quantumleaf", investor: "Samriddhi Fund", investorSlug: "samriddhi-fund", stage: "Pre-seed", score: 81, warm: "Warm", note: "Already shortlisted for the inclusion grant", tone: "accent" },
  { id: "im-9", startup: "EduFold", startupSlug: "edufold", investor: "Nexus Angels", investorSlug: "nexus-angels", stage: "Pre-seed", score: 68, warm: "Cold", note: "EdTech is outside their stated focus — a long shot", tone: "warn" },
];

export const INTRO_PIPELINE: IntroPipeline[] = [
  { id: "ip-1", startup: "OrbitalWorks", startupSlug: "orbitalworks", investor: "Atlas Capital", investorSlug: "atlas-capital", requested: "02 Apr 2026", status: "Meeting booked", meetings: 2, note: "Second meeting is the deep-dive", tone: "good" },
  { id: "ip-2", startup: "AquaPure", startupSlug: "aquapure", investor: "Meridian Labs", investorSlug: "meridian-labs", requested: "28 Mar 2026", status: "In diligence", meetings: 3, note: "They asked for the unit economics pack", tone: "good" },
  { id: "ip-3", startup: "TerraGrid", startupSlug: "terragrid", investor: "Vertex Global", investorSlug: "vertex-global", requested: "26 Mar 2026", status: "Meeting booked", meetings: 1, note: "Narrative has to land first", tone: "warn" },
  { id: "ip-4", startup: "FinEdge", startupSlug: "finedge", investor: "Nexus Angels", investorSlug: "nexus-angels", requested: "22 Mar 2026", status: "Intro delivered", meetings: 1, note: "Data room opened the same day", tone: "accent" },
  { id: "ip-5", startup: "HealthLoop", startupSlug: "healthloop", investor: "Nexus Angels", investorSlug: "nexus-angels", requested: "18 Mar 2026", status: "Intro delivered", meetings: 1, note: "The first of three targets", tone: "accent" },
  { id: "ip-6", startup: "Lumen AI", startupSlug: "lumen-ai", investor: "Northgate Partners", investorSlug: "northgate-partners", requested: "12 Mar 2026", status: "Awaiting response", meetings: 0, note: "No reply in three weeks", tone: "warn" },
  { id: "ip-7", startup: "FreshChain", startupSlug: "freshchain", investor: "Samriddhi Fund", investorSlug: "samriddhi-fund", requested: "08 Mar 2026", status: "Declined", meetings: 0, note: "Right size, wrong stage for a bridge", tone: "bad" },
];

export const INTRO_FUNNEL = {
  requested: 48,
  delivered: 34,
  met: 22,
  termSheet: 7,
};

export const INVESTOR_DEMAND: InvestorDemand[] = [
  { stage: "Pre-seed", interest: 74, count: 2, note: "Nexus Angels and Atlas Capital both write here", tone: "good" },
  { stage: "Seed", interest: 62, count: 4, note: "The most crowded stage in the network", tone: "accent" },
  { stage: "Series A", interest: 48, count: 4, note: "Northgate, Vertex, Meridian and Samriddhi", tone: "accent" },
  { stage: "Series B", interest: 19, count: 1, note: "Only Vertex — and we have one candidate", tone: "warn" },
];

export const RELATIONSHIPS: Relationship[] = [
  { investor: "Northgate Partners", investorSlug: "northgate-partners", lastTouch: "12 Mar 2026", strength: 78, note: "Reliable for agri and enterprise — slow to reply", tone: "accent" },
  { investor: "Nexus Angels", investorSlug: "nexus-angels", lastTouch: "22 Mar 2026", strength: 92, note: "Fastest decision cycle in the network", tone: "good" },
  { investor: "Vertex Global", investorSlug: "vertex-global", lastTouch: "26 Mar 2026", strength: 71, note: "Growth only, but a strong portfolio", tone: "accent" },
  { investor: "Meridian Labs", investorSlug: "meridian-labs", lastTouch: "28 Mar 2026", strength: 85, note: "Writes strategic cheques and pulls pilots", tone: "good" },
  { investor: "Atlas Capital", investorSlug: "atlas-capital", lastTouch: "02 Apr 2026", strength: 88, note: "The deep-tech specialist — our best single relationship", tone: "good" },
  { investor: "Samriddhi Fund", investorSlug: "samriddhi-fund", lastTouch: "08 Mar 2026", strength: 64, note: "Strong on inclusive growth, slow on process", tone: "warn" },
];
