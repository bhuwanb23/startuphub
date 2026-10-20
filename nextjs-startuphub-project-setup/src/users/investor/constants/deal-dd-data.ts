/* Due diligence, pipeline-stage, and deal-execution datasets. */

/* ── Due Diligence (subject: ReJoule Energy, active DD) ────── */
export const DD_SUBJECT = {
  name: "ReJoule Energy",
  sector: "ClimateTech",
  stage: "Seed",
  ask: "₹7 Cr",
  started: "Mar 12",
  target: "Apr 14",
};

export const DD_CHECKLIST = [
  { area: "Corporate", done: 6, total: 6, owner: "AM" },
  { area: "Financial", done: 5, total: 8, owner: "RJ" },
  { area: "Legal", done: 4, total: 6, owner: "Ext. counsel" },
  { area: "Tax", done: 2, total: 3, owner: "RJ" },
  { area: "Technology", done: 3, total: 5, owner: "S. Kapoor" },
  { area: "Product", done: 4, total: 4, owner: "SK" },
  { area: "Market", done: 3, total: 4, owner: "AM" },
  { area: "Team", done: 2, total: 3, owner: "AM" },
  { area: "IPR", done: 3, total: 5, owner: "IPR Desk" },
  { area: "Regulatory", done: 1, total: 3, owner: "Ext. counsel" },
  { area: "Commercial", done: 3, total: 4, owner: "RJ" },
  { area: "Operations", done: 2, total: 3, owner: "SK" },
];

export const DD_OPEN_ISSUES = [
  { id: 1, title: "Cell-grading accuracy claim needs third-party bench verification", severity: "Critical", owner: "Tech reviewer", status: "Open" },
  { id: 2, title: "OEM LOI (VoltPlus) is non-binding and expires Apr 30", severity: "High", owner: "AM", status: "In discussion" },
  { id: 3, title: "GST registration lag in Telangana entity (reconciling)", severity: "Medium", owner: "RJ", status: "Open" },
  { id: 4, title: "One provisional patent unassigned from founder's prior employer", severity: "High", owner: "IPR Desk", status: "Pending document" },
  { id: 5, title: "Lab lease renewal terms undocumented", severity: "Low", owner: "Legal", status: "Resolved" },
];

export const DD_REVIEWS: Record<
  string,
  { title: string; items: { label: string; status: "Clear" | "Flag" | "Pending"; note: string }[]; findings: string[]; score: number }
> = {
  legal: {
    title: "Legal Review",
    score: 78,
    items: [
      { label: "Certificate of incorporation & share register", status: "Clear", note: "Matches MCA records" },
      { label: "Founder employment/IP assignment agreements", status: "Flag", note: "One prior-employer carve-out ambiguous" },
      { label: "OEM pilot contracts (2)", status: "Pending", note: "Awaiting signed counterparts" },
      { label: "Lab lease & safety compliance", status: "Clear", note: "Renewal rider documented Mar 26" },
      { label: "Pending litigation check", status: "Clear", note: "None found, Nil return verified" },
    ],
    findings: [
      "IP assignment carve-out must be cured before signing — draft amendment in negotiation",
      "No regulatory exposure under current battery-handling rules; 2027 rules add reporting only",
    ],
  },
  financial: {
    title: "Financial Review",
    score: 81,
    items: [
      { label: "Audited financials FY24 / FY25", status: "Clear", note: "Clean opinion, Big-6 affiliate" },
      { label: "Revenue verification (bank-reconciled)", status: "Clear", note: "94% of booked revenue traced" },
      { label: "Expense & payroll verification", status: "Clear", note: "Variance 1.8%, within tolerance" },
      { label: "Debt & contingent liabilities", status: "Flag", note: "₹18L founder loan — convert or repay pre-close" },
      { label: "Tax filings (GST / TDS)", status: "Pending", note: "Telangana GST lag from Mar — reconciling" },
    ],
    findings: [
      "Founder loan must convert to equity or settle at closing — term sheet condition recommended",
      "Burn multiple 1.4 sits well inside our climate-seed band",
    ],
  },
  technology: {
    title: "Technology Review",
    score: 84,
    items: [
      { label: "Architecture & codebase review", status: "Clear", note: "Clean monorepo, tests at 71% on core cell logic" },
      { label: "Cell-grading accuracy bench test", status: "Pending", note: "Third-party lab booked Apr 02" },
      { label: "Security posture & data handling", status: "Clear", note: "ISO 27001 roadmap in place" },
      { label: "Scalability — fleet telemetry at 10×", status: "Flag", note: "Edge sync needs queue refactor at scale" },
      { label: "Technical debt assessment", status: "Clear", note: "2 quarters of structured debt, documented" },
    ],
    findings: [
      "Accuracy bench test is the gating item for IC — results due before term sheet",
      "Edge-sync refactor scoped: 2 engineers, 6 weeks — price into use of funds",
    ],
  },
  ip: {
    title: "IP Review",
    score: 74,
    items: [
      { label: "Patent filings — 14 across cell grading + pack balancing", status: "Clear", note: "Inventor assignments complete for 13" },
      { label: "Prior-employer assignment (1 filing)", status: "Flag", note: "Carve-out ambiguity — cure required" },
      { label: "FTO scan vs. VoltCircle Mar-14 filing", status: "Pending", note: "IPR desk opinion due Apr 05" },
      { label: "Trademark status", status: "Clear", note: "Registered, classes 9/37" },
      { label: "Trade secret protocols", status: "Clear", note: "Process docs behind NDA-controlled lab access" },
    ],
    findings: [
      "Do not close before the assignment carve-out is cured — precedent risk on every future filing",
      "If FTO is clear, the pack-balancing family is the real moat (blocks 2 known followers)",
    ],
  },
};

export const DD_FINDINGS = [
  { id: "F-01", title: "Accuracy claim 96.4% not yet third-party verified", area: "Technology", severity: "Critical", status: "Open", owner: "Tech reviewer", note: "Bench test Apr 02 gates IC" },
  { id: "F-02", title: "Prior-employer IP carve-out ambiguous", area: "IPR", severity: "High", status: "Pending cure", owner: "IPR Desk", note: "Amendment drafted; founder counsel reviewing" },
  { id: "F-03", title: "OEM LOIs non-binding, one lapsing", area: "Commercial", severity: "High", status: "In discussion", owner: "AM", note: "VoltPlus renewal requested in writing" },
  { id: "F-04", title: "Founder loan ₹18L on books", area: "Financial", severity: "Medium", status: "Open", owner: "RJ", note: "Option: convert at round price" },
  { id: "F-05", title: "Telangana GST registration lag", area: "Tax", severity: "Medium", status: "Reconciling", owner: "RJ", note: "CAs aligned Mar 27" },
  { id: "F-06", title: "Lease renewal rider undocumented", area: "Legal", severity: "Low", status: "Resolved", owner: "Legal", note: "Rider executed Mar 26" },
  { id: "F-07", title: "Edge-sync scaling refactor needed", area: "Technology", severity: "Low", status: "Open", owner: "Tech reviewer", note: "Priced into use of funds" },
];

export const DD_RECOMMENDATION = {
  verdict: "Proceed — conditional",
  score: 79,
  text: "Strategic fit is strong and the moat is real if the two gating items clear. Recommend proceeding to IC conditional on (1) bench-verified accuracy ≥94% and (2) cured IP assignment. Tranche ₹4 Cr at closing, ₹3 Cr on first OEM conversion.",
};

/* ── Pipeline stage views ───────────────────────────────────── */
export const PIPELINE_STAGE_SUMMARY = [
  { key: "leads", label: "New Leads", count: 42, conv: 43, accent: false },
  { key: "screening", label: "Screening", count: 18, conv: 50, accent: false },
  { key: "evaluation", label: "Evaluation", count: 9, conv: 78, accent: true },
  { key: "dd", label: "Due Diligence", count: 7, conv: 43, accent: false },
  { key: "negotiation", label: "Negotiation", count: 3, conv: 67, accent: false },
  { key: "termsheet", label: "Term Sheet", count: 2, conv: 50, accent: false },
  { key: "ic", label: "Investment Committee", count: 1, conv: 100, accent: true },
  { key: "closed", label: "Closed", count: 24, conv: null as number | null, accent: false },
  { key: "passed", label: "Passed", count: 156, conv: null as number | null, accent: false },
];

export const NEW_LEADS_LIST = [
  { id: 1, name: "AquaMend Robotics", sector: "ClimaTech · Water", source: "Incubator referral", received: "2h ago", score: null },
  { id: 2, name: "Kaarobar Credit", sector: "FinTech · MSME", source: "Investor intro", received: "5h ago", score: 84 },
  { id: 3, name: "NeuroNest", sector: "HealthTech · Neuro", source: "Deck room", received: "Yesterday", score: null },
  { id: 4, name: "FleetFox", sector: "Logistics SaaS", source: "Cold inbound", received: "Yesterday", score: 71 },
  { id: 5, name: "Prithvi Metals", sector: "DeepTech", source: "Demo day", received: "2 days ago", score: null },
  { id: 6, name: "GridLoom", sector: "Energy SaaS", source: "Partner referral", received: "3 days ago", score: 66 },
];

export const EVAL_ACTIVE = [
  { id: 1, name: "PathPilot", score: 84, stage: "Final review", analyst: "AM", days: 6 },
  { id: 2, name: "Mandiverse", score: 79, stage: "Market analysis", analyst: "SK", days: 4 },
  { id: 3, name: "LedgerPort", score: 76, stage: "Financial analysis", analyst: "RJ", days: 3 },
];

export const DD_ACTIVE = [
  { id: 1, name: "ReJoule Energy", progress: 71, critical: 1, docs: 4, target: "Apr 14" },
  { id: 2, name: "SehatGrid", progress: 38, critical: 2, docs: 7, target: "Apr 28" },
];

export const NEGOTIATIONS_ACTIVE = [
  { id: 1, name: "CarbonKart", valuation: "₹42 Cr pre", ownership: "13.1%", round: 4, status: "Founder counter received", last: "2h ago" },
  { id: 2, name: "Zephyr Drones", valuation: "₹31 Cr pre", ownership: "9.8%", round: 2, status: "Awaiting founder response", last: "Yesterday" },
];

export const TERM_SHEETS = [
  { id: 1, deal: "CarbonKart", version: "v4", status: "Sent", sent: "Mar 24", expires: "Apr 02", open: "3 open terms" },
  { id: 2, deal: "SoilSense Labs", version: "v2", status: "Accepted", sent: "Mar 02", expires: "—", open: "Executed Mar 09" },
];

export const IC_PENDING = [
  {
    id: 1, deal: "CarbonKart", memo: "IC memo v3", presenter: "AM", date: "Today · 16:00",
    votes: [
      { member: "A. Mehta", vote: "Approve" },
      { member: "S. Kapoor", vote: "Approve" },
      { member: "R. Joshi", vote: "Hold" },
      { member: "Ext. Observer", vote: "Pending" },
    ],
  },
];

export const CLOSED_RECENT = [
  { id: 1, name: "SoilSense Labs", round: "Pre-seed", amount: "₹1.8 Cr", date: "Mar 09", portfolio: "Onboarded Mar 12" },
  { id: 2, name: "Finlattice", round: "Seed", amount: "₹2.5 Cr", date: "Feb 22", portfolio: "Active" },
  { id: 3, name: "Terragrid", round: "Series A", amount: "₹5.0 Cr", date: "Jan 30", portfolio: "Active" },
];

export const PASSED_DEALS = [
  { id: 1, name: "GameVerse", reason: "Off-thesis consumer", date: "Mar 18", revisit: false },
  { id: 2, name: "QuickKlinic", reason: "Unit economics unproven", date: "Mar 11", revisit: true },
  { id: 3, name: "AdNova AI", reason: "Crowded space, no moat", date: "Feb 27", revisit: false },
  { id: 4, name: "ByteBharat", reason: "Valuation gap", date: "Feb 12", revisit: true },
];

/* ── Deal management (subject: CarbonKart) ─────────────────── */
export const DEAL_SUBJECT = {
  name: "CarbonKart",
  round: "Seed",
  ask: "₹5.5 Cr",
  valuation: { pre: "₹42 Cr", post: "₹47.5 Cr" },
  ownership: "11.6%",
  status: "Negotiation · Term sheet v4 sent",
  timeline: [
    { date: "Feb 28", event: "First partner meeting", done: true },
    { date: "Mar 08", event: "Evaluation complete — score 90", done: true },
    { date: "Mar 14", event: "DD kickoff", done: true },
    { date: "Mar 22", event: "DD complete — conditional pass", done: true },
    { date: "Mar 24", event: "Term sheet v4 sent", done: true },
    { date: "Today", event: "IC vote 16:00", done: false },
    { date: "Apr 05", event: "Target signing", done: false },
    { date: "Apr 12", event: "Target close & wire", done: false },
  ],
};

export const DEAL_TEAM = [
  { name: "Arjun Mehta", role: "Deal Lead", i: "AM", scope: "Economics, terms, IC presentation" },
  { name: "Sana Kapoor", role: "Analyst", i: "SK", scope: "Market, competitor and growth workstreams" },
  { name: "Reyansh Joshi", role: "Financial Review", i: "RJ", scope: "Financials, model audit, tax" },
  { name: "Meera Iyer", role: "Legal — External", i: "MI", scope: "SHA/SSA drafting, corporate review" },
  { name: "IPR Desk", role: "Advisor", i: "IP", scope: "FTO and filing strategy review" },
];

export const DEAL_VALUATION = {
  pre: "₹42 Cr",
  post: "₹47.5 Cr",
  ask: "₹5.5 Cr",
  ownership: "11.6%",
  method: "Blended: 60% comparable multiples + 40% VC method",
  comps: [
    { name: "CarbonChain", multiple: "9.2× ARR", note: "Series A, enterprise-heavy" },
    { name: "Offsetra", multiple: "7.4× ARR", note: "Seed, SMB-heavy base" },
    { name: "VerdantLedger", multiple: "8.8× ARR", note: "Seed, similar GMV mix" },
  ],
  scenarios: [
    { name: "Bear", value: "₹36 Cr", irr: "18%", note: "Procurement slippage 2 quarters" },
    { name: "Base", value: "₹42 Cr", irr: "31%", note: "Current GMV trajectory" },
    { name: "Bull", value: "₹51 Cr", irr: "44%", note: "Enterprise prepay pulls demand forward" },
  ],
  history: [
    { v: "₹38 Cr", d: "Mar 12", note: "Opening anchor" },
    { v: "₹40 Cr", d: "Mar 18", note: "Post DD findings" },
    { v: "₹42 Cr", d: "Mar 24", note: "Current v4 — founder countered ₹45 Cr" },
  ],
};

export const TERM_SHEET_TERMS = [
  { term: "Valuation", value: "₹42 Cr pre / ₹47.5 Cr post", status: "Counter" },
  { term: "Investment", value: "₹5.5 Cr in two tranches", status: "Agreed" },
  { term: "Ownership", value: "11.6% fully diluted", status: "Counter" },
  { term: "Liquidation preference", value: "1× non-participating", status: "Agreed" },
  { term: "Anti-dilution", value: "Broad-based weighted average", status: "Agreed" },
  { term: "Board", value: "1 investor seat + 1 independent", status: "Agreed" },
  { term: "ESOP", value: "10% pool created pre-money", status: "Open" },
  { term: "Founder vesting", value: "4-year re-vest from closing", status: "Open" },
  { term: "Pro-rata rights", value: "Full in next round", status: "Agreed" },
  { term: "Tranche 2 condition", value: "First OEM conversion or ₹1.2 Cr GMV/mo", status: "Open" },
];

export const AGREEMENTS = [
  { doc: "Term Sheet", status: "Sent — counter received", parties: ["Founders", "Meridian"] },
  { doc: "Share Subscription Agreement (SSA)", status: "Draft v2", parties: ["Founders", "Meridian", "ESOP trust"] },
  { doc: "Shareholders' Agreement (SHA)", status: "Draft v1", parties: ["Founders", "Meridian"] },
  { doc: "IP Assignment Amendment", status: "With founder counsel", parties: ["Founders"] },
  { doc: "Founder Re-vesting Deeds", status: "Pending terms", parties: ["Founders", "Meridian"] },
];

export const CLOSING_CHECKLIST = [
  { item: "IC approval minuted", done: false },
  { item: "Term sheet executed", done: false },
  { item: "IP assignment cured", done: false },
  { item: "SSA + SHA signed", done: false },
  { item: "ESOP pool created (board resolution)", done: false },
  { item: "Conditions precedent certificate", done: false },
  { item: "Tranche 1 wire — ₹4.0 Cr", done: false },
  { item: "Share certificates + register update", done: false },
  { item: "Portfolio onboarding in StartupHub", done: false },
];

export const INVEST_HISTORY_EXTRA = [
  { id: 1, name: "MediChain", round: "Seed 2023", outcome: "Partial exit", multiple: "3.4×", irr: "41%", year: "2026" },
  { id: 2, name: "QuickKlinic", round: "Seed 2023", outcome: "Write-off", multiple: "0.0×", irr: "—", year: "2025" },
  { id: 3, name: "FleetWorks", round: "Pre-seed 2023", outcome: "Full exit", multiple: "2.8×", irr: "36%", year: "2025" },
  { id: 4, name: "EduTrail", round: "Seed 2024", outcome: "Write-off", multiple: "0.2×", irr: "—", year: "2026" },
];

export const RETURNS_TABLE = [
  { name: "Averia Health", invested: "₹4.0 Cr", current: "₹14.2 Cr", realized: "—", moic: "3.6×", irr: "48%" },
  { name: "Terragrid", invested: "₹5.0 Cr", current: "₹11.8 Cr", realized: "—", moic: "2.4×", irr: "39%" },
  { name: "Zephyr Drones", invested: "₹2.8 Cr", current: "₹6.4 Cr", realized: "—", moic: "2.3×", irr: "37%" },
  { name: "MediChain (exit)", invested: "₹3.0 Cr", current: "—", realized: "₹10.2 Cr", moic: "3.4×", irr: "41%" },
  { name: "FleetWorks (exit)", invested: "₹2.0 Cr", current: "—", realized: "₹5.6 Cr", moic: "2.8×", irr: "36%" },
  { name: "Finlattice", invested: "₹2.5 Cr", current: "₹5.1 Cr", realized: "—", moic: "2.0×", irr: "33%" },
];
