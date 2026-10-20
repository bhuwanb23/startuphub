/* Profile, discovery, communication, portfolio-monitoring and ops datasets. */

/* ── My Profile ─────────────────────────────────────────────── */
export const INVESTOR_PROFILE = {
  name: "Arjun Mehta",
  type: "Angel Fund — Managing Partner",
  org: "Meridian Angels",
  location: "Mumbai + Bengaluru",
  experience: "14 years · 11 operating, 3 investing",
  bio: "Operator-led investor. Built and sold a health-logistics company before turning operator-capital toward regulation-aware founders in health, fintech infrastructure, climate and agri-AI.",
  achievements: [
    "3 exits across 38-company portfolio",
    "Top-quartile Fund I (2023 vintage, TVPI 2.14×)",
    "Co-authored state startup-exchange framework",
    "Angel of the Year — National Startup Awards 2025",
  ],
  public: { visibility: "Public profile", listed: "Since Mar 2024", views: "1,842 this month" },
  contact: { email: "arjun@meridian.angels", phone: "+91 · 98xxx xxxx", linkedin: "/in/arjunmehta" },
};

export const PREFERENCES = {
  industries: ["HealthTech", "FinTech infrastructure", "ClimateTech", "Agri AI", "DeepTech"],
  technologies: ["Applied AI/ML", "Federated systems", "IoT + sensing", "Satellite data"],
  geography: ["India-first", "SEA corridors", "GCC (follow-on only)"],
  stages: ["Pre-seed", "Seed", "Series A"],
  models: ["B2B SaaS", "Marketplace infra", "Hardware-as-a-service"],
  size: "₹2 – 6 Cr initial · ₹12 Cr with follow-ons",
  ownership: "8 – 15% fully diluted at entry",
  revenue: "Post-revenue preferred; pre-revenue with signed pilots considered",
  growth: "≥15% MoM revenue or equivalent engagement proxy",
  risk: "Balanced — structured downside via tranches and covenants",
};

export const MANDATE = {
  fundSize: "₹120 Cr (Fund I · 2023 vintage)",
  available: "₹33.6 Cr (₹9.6 Cr new deals + ₹24 Cr reserves)",
  range: "₹2 – 6 Cr entry cheques",
  sectorAllocation: [
    { label: "FinTech", target: 25, actual: 30 },
    { label: "HealthTech", target: 25, actual: 24 },
    { label: "ClimateTech", target: 20, actual: 19 },
    { label: "Agri AI", target: 20, actual: 15 },
    { label: "DeepTech & other", target: 10, actual: 12 },
  ],
  geoAllocation: [
    { label: "India", pct: 92 },
    { label: "SEA", pct: 8 },
  ],
  stageAllocation: [
    { label: "Pre-seed", pct: 20 },
    { label: "Seed", pct: 55 },
    { label: "Series A", pct: 25 },
  ],
  ownershipTarget: "10 – 12% post-round average",
  limits: ["Max 12% of fund per company", "Max 30% concentration per sector", "Min 4 board seats per 10 deals"],
};

export const INVESTMENT_TEAM = [
  { name: "Arjun Mehta", role: "Managing Partner", focus: "Final IC authority · health & climate", i: "AM", ic: true },
  { name: "Sana Kapoor", role: "Principal", focus: "HealthTech & Agri · IC voter", i: "SK", ic: true },
  { name: "Reyansh Joshi", role: "Analyst", focus: "FinTech & Climate · IC observer", i: "RJ", ic: true },
  { name: "Meera Iyer", role: "Legal Counsel (Ext.)", focus: "Deal documentation", i: "MI", ic: false },
  { name: "IPR Desk — StartupHub", role: "Advisor", focus: "FTO & filing strategy", i: "IP", ic: false },
];

/* ── Discovery extras ───────────────────────────────────────── */
export const DISCOVERY_FILTERS: { group: string; options: string[] }[] = [
  { group: "Industry", options: ["HealthTech", "FinTech", "ClimateTech", "Agri AI", "DeepTech"] },
  { group: "Stage", options: ["Pre-seed", "Seed", "Series A"] },
  { group: "Geography", options: ["Bengaluru", "Mumbai", "Hyderabad", "Delhi NCR"] },
  { group: "Funding ask", options: ["< ₹2 Cr", "₹2–6 Cr", "> ₹6 Cr"] },
  { group: "Growth", options: ["> 20% MoM", "> 15% MoM", "> 10% MoM"] },
  { group: "IPR strength", options: ["Filed", "Granted", "Cleared FTO"] },
];

export const SAVED_SEARCHES = [
  { name: "Agri AI · Seed · >15% MoM", results: 18, alerts: true, last: "Today" },
  { name: "HealthTech Series A · CDSCO cleared", results: 7, alerts: true, last: "Yesterday" },
  { name: "Climate · Pre-seed · hardware OK", results: 23, alerts: false, last: "Mar 22" },
];

export const SEARCH_HISTORY = [
  { q: "battery diagnostics", ts: "11:04", results: 6 },
  { q: "DICOM viewer", ts: "Yesterday", results: 3 },
  { q: "mandi exchange", ts: "Yesterday", results: 9 },
  { q: "carbon MRV", ts: "Mar 24", results: 12 },
];

export const AI_MATCHES = [
  {
    id: 1, name: "CropLens AI", sector: "AI · Agritech", stage: "Seed", overall: 92,
    dims: [
      { label: "Thesis", v: 96 }, { label: "Market", v: 88 }, { label: "Stage", v: 100 },
      { label: "Financial", v: 84 }, { label: "Technology", v: 91 }, { label: "Team", v: 87 },
      { label: "Risk", v: 78 },
    ],
    why: "Matches 3 thesis pillars; sector momentum +18.4%; founder-market fit verified; nearest portfolio analogue Terragrid hit 2.4× in 14 months.",
    action: "Request intro via AgriTech Hub",
  },
  {
    id: 2, name: "AquaMend Robotics", sector: "ClimaTech", stage: "Seed", overall: 86,
    dims: [
      { label: "Thesis", v: 90 }, { label: "Market", v: 82 }, { label: "Stage", v: 100 },
      { label: "Financial", v: 74 }, { label: "Technology", v: 88 }, { label: "Team", v: 91 },
      { label: "Risk", v: 72 },
    ],
    why: "Water-infra HaaS with government demand corridor; second-time founder; hardware exposure within tolerance due to service model.",
    action: "Add to screening queue",
  },
  {
    id: 3, name: "LedgerPort", sector: "FinTech", stage: "Seed", overall: 81,
    dims: [
      { label: "Thesis", v: 84 }, { label: "Market", v: 86 }, { label: "Stage", v: 100 },
      { label: "Financial", v: 70 }, { label: "Technology", v: 82 }, { label: "Team", v: 85 },
      { label: "Risk", v: 66 },
    ],
    why: "Co-lending ledger infra rides the embedded-credit wave; risk score pulled by regulatory grey zone — flag for IPR+counsel scan.",
    action: "Watchlist · 30-day review",
  },
];

export const DEAL_SOURCES = [
  { label: "Partner referrals", count: 14, quality: 88 },
  { label: "Incubator channels", count: 12, quality: 83 },
  { label: "Direct submissions", count: 9, quality: 61 },
  { label: "Proactive sourcing", count: 5, quality: 91 },
  { label: "Cold inbound", count: 2, quality: 38 },
];

export const WATCHLIST_FEED = [
  { type: "Funding", text: "SettleX crossed ₹40 Cr TPV — corridor 3 filing spotted", time: "2h" },
  { type: "Performance", text: "CropLens AI MRR ₹68L (+24% MoM) — approaching ₹1 Cr trigger", time: "6h" },
  { type: "Startup", text: "NeuroNest trial enrollment hit 68%", time: "Yesterday" },
  { type: "Risk", text: "Verdant Grid: PPA discussion slowed per incubator signal", time: "2d" },
];

export const OPPORTUNITY_LIST = [
  { id: 1, kind: "Funding round", title: "PathPilot Series A — ₹18 Cr", detail: "50% committed · lead slot open", match: 91, window: "Closes in 3 weeks" },
  { id: 2, kind: "Co-investment", title: "Climate Pre-Series A (ReJoule)", detail: "Atlas Angels leading · ₹1.8 Cr slot", match: 88, window: "Closes Apr 18" },
  { id: 3, kind: "Follow-on", title: "Averia Health — Series B insider round", detail: "Defend 14.2% pro-rata", match: 94, window: "Term sheet expected May" },
  { id: 4, kind: "Syndicate", title: "Agri Exchange Pool (Mandiverse)", detail: "Blume syndicating · ₹2 Cr slot", match: 83, window: "Closes May 21" },
  { id: 5, kind: "Strategic", title: "Qwron — corporate co-invest invite", detail: "Strategic anchor at 20% discount", match: 79, window: "Rolling" },
];

/* ── Communication ──────────────────────────────────────────── */
export const THREADS = [
  { id: 1, name: "Shreya Menon", company: "CarbonKart", last: "Happy to accept the tranche structure — one ask on ESOP…", time: "9:42", unread: 2 },
  { id: 2, name: "Dr. R. Menon", company: "PathPilot", last: "Sending the hospital cohort split tonight.", time: "Yesterday", unread: 1 },
  { id: 3, name: "Kabir Mehta", company: "Terragrid", last: "Board deck for Series B is up in the room.", time: "Yesterday", unread: 0 },
  { id: 4, name: "Nikhil Bansal", company: "ReJoule Energy", last: "Bench test booked Apr 02 — invite sent.", time: "Mon", unread: 0 },
  { id: 5, name: "Rohan Iyer", company: "Kaarobar Credit", last: "Thanks for the intro to Blume!", time: "Sun", unread: 0 },
];

export const ACTIVE_THREAD = {
  name: "Shreya Menon",
  company: "CarbonKart",
  messages: [
    { from: "them", text: "Arjun — v4 reads well. Tranche 2 condition is fine if we can peg it to GMV OR OEM conversion.", time: "9:12" },
    { from: "me", text: "That works. I'll take it into IC at 16:00 today as the proposed amendment.", time: "9:18" },
    { from: "them", text: "One ask: ESOP pool at 8% post instead of 10% pre? Dilution math on our side…", time: "9:31" },
    { from: "them", text: "Happy to accept the tranche structure — one ask on ESOP…", time: "9:42" },
    { from: "me", text: "Understood. Bring your model to Friday's call — if the pool stays functional for VP Eng + Head of Carbon Markets, we can flex structure.", time: "9:47" },
  ],
};

export const INTRODUCTIONS = [
  { id: 1, person: "Dr. Ananya Rao", company: "Averia Health", via: "Portfolio", direction: "Received", status: "Accepted", date: "Mar 26" },
  { id: 2, person: "S. Kapoor", company: "Blume Syndicate", via: "Co-investor", direction: "Sent", status: "Accepted", date: "Mar 24" },
  { id: 3, person: "Ishita Verma", company: "AquaMend Robotics", via: "Nexus Ventures", direction: "Requested", status: "Pending", date: "Mar 22" },
  { id: 4, person: "Agri Ministry Nodal", company: "State mission", via: "StartupHub", direction: "Received", status: "Declined", date: "Mar 18" },
];

/* ── Portfolio extras ───────────────────────────────────────── */
export const MONITORING_FEED = [
  { type: "KPI", company: "Averia Health", text: "Feb metrics: ₹3.6 Cr MRR (+18%), NRR 121%", time: "2h", good: true },
  { type: "Funding", company: "Finlattice", text: "Series A conversations opened with 2 leads", time: "6h", good: true },
  { type: "Team", company: "Terragrid", text: "VP Growth hired — ex-Climeworks", time: "1d", good: true },
  { type: "Product", company: "Qwron", text: "Photonic interconnect taped out — design win #2", time: "2d", good: true },
  { type: "IPR", company: "Zephyr Drones", text: "3 defence-related filings granted", time: "3d", good: true },
  { type: "Risk", company: "NomadPay", text: "Monthly burn exceeds plan by 31% — review triggered", time: "4h", good: false },
  { type: "Market", company: "KhetScore", text: "Anchor agri-bank extended pilot to 3 districts", time: "2d", good: true },
];

export const COMPANY_KPI = {
  name: "Averia Health",
  kpis: [
    { label: "MRR", value: "₹3.6 Cr", delta: "+18% MoM", good: true },
    { label: "Centres live", value: "140", delta: "+11 this month", good: true },
    { label: "NRR", value: "121%", delta: "expansion-led", good: true },
    { label: "Burn multiple", value: "1.1", delta: "elite band", good: true },
  ],
  series: [42, 48, 55, 61, 66, 74, 82, 95, 104, 118, 131, 148, 168, 192, 218, 246, 280, 320, 360],
  events: [
    { date: "Mar 24", text: "Series B data room opened to Nexora" },
    { date: "Mar 12", text: "3 patents granted (triage pipeline family)" },
    { date: "Feb 28", text: "Crossed 140 diagnostic centres" },
  ],
};

export const PORTFOLIO_RISKS = [
  { company: "NomadPay", area: "Financial", level: "High", detail: "Burn 31% over plan; runway 5.5 months", action: "Bridge evaluation meeting Apr 02" },
  { company: "KhetScore", area: "Team", level: "Medium", detail: "CTO transition in progress", action: "Interim CTO via mentor bench offered" },
  { company: "Qwron", area: "Technology", level: "Medium", detail: "Tape-out slip risk on second node", action: "Foundry escalation channel engaged" },
  { company: "Terragrid", area: "Market", level: "Low", detail: "Carbon price softening in voluntary market", action: "Compliance-market pivot memo in review" },
];

export const PORTFOLIO_EVENTS = [
  { date: "Apr 04", kind: "Board", company: "Averia Health", text: "Q1 board meeting — Series B readiness vote" },
  { date: "Apr 18", kind: "Funding", company: "Finlattice", text: "Series A term sheets expected" },
  { date: "Apr 30", kind: "Launch", company: "Terragrid", text: "Carbon MRV v2 product launch" },
  { date: "May 09", kind: "Partnership", company: "Zephyr", text: "Defence corridor framework signing" },
  { date: "May 15", kind: "Reporting", company: "All", text: "Q1 portfolio reporting deadline" },
];

/* ── Ops: notifications, documents, calendar, audit ─────────── */
export const NOTIFICATIONS = [
  { id: 1, group: "Deals", text: "CarbonKart — founder countered term sheet v4", time: "12m", unread: true },
  { id: 2, group: "Matches", text: "3 new AI matches above 80 — CropLens AI at 92", time: "1h", unread: true },
  { id: 3, group: "DD", text: "ReJoule: bench test scheduled Apr 02", time: "2h", unread: true },
  { id: 4, group: "Portfolio", text: "NomadPay risk alert — burn 31% over plan", time: "3h", unread: true },
  { id: 5, group: "Watchlist", text: "SettleX TPV trigger hit (₹40 Cr)", time: "5h", unread: false },
  { id: 6, group: "Deals", text: "PathPilot uploaded cohort retention data", time: "Yesterday", unread: false },
  { id: 7, group: "Portfolio", text: "Averia February metrics posted (MRR +18%)", time: "Yesterday", unread: false },
  { id: 8, group: "System", text: "Q1 LP letter draft is 70% assembled", time: "2d", unread: false },
];

export const DOC_LIBRARY = [
  { id: 1, file: "CarbonKart_IC_memo_v3.pdf", area: "Deals", kind: "Memo", size: "1.2 MB", updated: "2h ago", ver: "v3" },
  { id: 2, file: "PathPilot_financial_model.xlsx", area: "Deals", kind: "Model", size: "4.8 MB", updated: "Yesterday", ver: "v5" },
  { id: 3, file: "ReJoule_DD_report_wip.docx", area: "Due Diligence", kind: "Report", size: "980 KB", updated: "Yesterday", ver: "v2" },
  { id: 4, file: "Meridian_thesis_2026.pdf", area: "Fund", kind: "Policy", size: "2.2 MB", updated: "Mar 02", ver: "v8" },
  { id: 5, file: "Averia_board_pack_Q1.zip", area: "Portfolio", kind: "Board", size: "18 MB", updated: "Mar 20", ver: "final" },
  { id: 6, file: "SHA_template_standard.docx", area: "Templates", kind: "Legal", size: "310 KB", updated: "Feb 14", ver: "v6" },
  { id: 7, file: "Finlatice_SeriesA_datapack.pdf", area: "Portfolio", kind: "Data", size: "7.4 MB", updated: "Mar 25", ver: "v1" },
  { id: 8, file: "IPR_desk_FTO_CarbonKart.pdf", area: "Due Diligence", kind: "Legal", size: "460 KB", updated: "Mar 22", ver: "final" },
];

export const CALENDAR_DAYS: { day: number; events: ("pitch" | "ic" | "dd" | "portfolio" | "report")[] }[] = [
  { day: 1, events: [] }, { day: 2, events: ["dd"] }, { day: 3, events: ["pitch"] },
  { day: 4, events: ["portfolio"] }, { day: 5, events: [] }, { day: 6, events: ["pitch", "dd"] },
  { day: 7, events: [] }, { day: 8, events: ["portfolio"] }, { day: 9, events: ["dd"] },
  { day: 10, events: ["pitch"] }, { day: 11, events: ["portfolio"] }, { day: 12, events: [] },
  { day: 13, events: ["dd"] }, { day: 14, events: ["ic"] }, { day: 15, events: [] },
  { day: 16, events: ["pitch"] }, { day: 17, events: ["portfolio"] }, { day: 18, events: ["dd", "report"] },
  { day: 19, events: [] }, { day: 20, events: ["pitch"] }, { day: 21, events: ["ic"] },
  { day: 22, events: ["portfolio"] }, { day: 23, events: ["dd"] }, { day: 24, events: [] },
  { day: 25, events: ["portfolio"] }, { day: 26, events: ["pitch"] }, { day: 27, events: [] },
  { day: 28, events: ["dd"] }, { day: 29, events: ["report"] }, { day: 30, events: ["portfolio"] },
];

export const AUDIT_TRAIL = [
  { actor: "A. Mehta", action: "sent term sheet v4 to", object: "CarbonKart", time: "Mar 24 · 18:02" },
  { actor: "S. Kapoor", action: "approved DD checklist item", object: "ReJoule · Product/4", time: "Mar 24 · 15:44" },
  { actor: "R. Joshi", action: "uploaded", object: "PathPilot financial model v5", time: "Mar 24 · 11:19" },
  { actor: "System", action: "triggered watchlist alert", object: "SettleX · TPV ₹40 Cr", time: "Mar 24 · 09:00" },
  { actor: "A. Mehta", action: "voted Approve on", object: "IC · SoilSense Labs", time: "Mar 09 · 17:20" },
  { actor: "IPR Desk", action: "delivered FTO opinion", object: "CarbonKart", time: "Mar 22 · 14:31" },
  { actor: "M. Iyer", action: "commented on", object: "SHA draft v1: clause 6.2", time: "Mar 21 · 16:08" },
  { actor: "S. Kapoor", action: "requested data", object: "SehatGrid · Q4 cohort", time: "Mar 19 · 10:52" },
];

/* ── Settings & help ────────────────────────────────────────── */
export const SETTINGS_SECTIONS: { title: string; desc: string; rows: { label: string; value?: string; on?: boolean }[] }[] = [
  {
    title: "Account", desc: "Personal information and security",
    rows: [
      { label: "Name", value: "Arjun Mehta" },
      { label: "Email", value: "arjun@meridian.angels" },
      { label: "Two-factor authentication", on: true },
      { label: "Session alerts (new device)", on: true },
    ],
  },
  {
    title: "Investment settings", desc: "Defaults applied to matching and scoring",
    rows: [
      { label: "Cheque range", value: "₹2 – 6 Cr" },
      { label: "Stages", value: "Pre-seed · Seed · Series A" },
      { label: "Risk preference", value: "Balanced" },
      { label: "Auto-match alerts", on: true },
    ],
  },
  {
    title: "Notifications", desc: "Choose what reaches you, and where",
    rows: [
      { label: "Deal alerts", on: true },
      { label: "Watchlist triggers", on: true },
      { label: "Portfolio risk alerts", on: true },
      { label: "Weekly digest email", on: false },
      { label: "Push notifications", on: true },
    ],
  },
  {
    title: "Team & permissions", desc: "Access control for Meridian workspace",
    rows: [
      { label: "Deal room access — S. Kapoor", value: "Full" },
      { label: "Deal room access — R. Joshi", value: "Full" },
      { label: "IC voting — external counsel", value: "Observer" },
    ],
  },
];

export const HELP_GUIDES = [
  { title: "Investor quickstart", desc: "Set thesis, preferences and matching in 10 minutes", mins: 6 },
  { title: "Running due diligence", desc: "Checklists, data rooms and findings workflow", mins: 9 },
  { title: "Reading AI match scores", desc: "What the seven match dimensions mean", mins: 4 },
  { title: "Term sheets without the tears", desc: "Negotiation, versions and e-signature flow", mins: 7 },
  { title: "Portfolio monitoring setup", desc: "KPI cadence, alerts and LP reporting", mins: 8 },
  { title: "Syndicating a deal", desc: "Invite co-investors and split allocations", mins: 5 },
];

export const FAQ = [
  { q: "How accurate is the AI match score?", a: "It blends seven dimensions against your stated thesis plus the dealflow you historically advanced. Scores above 85 have a 71% screening-advance rate across the network." },
  { q: "Can founders see my internal notes?", a: "Never. Notes sit in your workspace; only content you explicitly send into a shared deal room is visible to founders." },
  { q: "Who sees my DD findings?", a: "Your deal team by default. You can share scoped views with co-investors or external counsel per finding." },
  { q: "How does tranche condition tracking work?", a: "Conditions attach to the term sheet, appear on your closing checklist, and fire alerts when evidence lands in the data room." },
];

export const TRENDING_CHIPS = ["Agri AI +18.4%", "ClimateTech +26.7%", "HealthTech +15.9%", "FinTech +12.1%"];
