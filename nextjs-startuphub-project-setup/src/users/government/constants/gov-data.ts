/* Government core dataset — registry, schemes, challenges, incubators, funding.
   Jurisdiction: State Innovation Mission (Telangana). */

/* ── Dashboard ─────────────────────────────────────────────── */
export const GOV_STATS = {
  registered: "12,480",
  verified: "8,214",
  active: "9,730",
  newMonth: "412",
  schemes: 14,
  grants: 6,
  allocated: "₹420 Cr",
  disbursed: "₹286 Cr",
  utilized: "₹221 Cr",
  incubators: 68,
  challenges: 9,
  jobs: "48.2K",
  patents: "3,120",
  growth: "+23.4% YoY",
};

export const REGISTRATION_SERIES = [
  420, 460, 510, 580, 640, 720, 810, 890, 960, 1040, 1120, 1248,
];

export const GOV_INTELLIGENCE = [
  { kind: "Growth", tone: "rise" as const, text: "ClimateTech registrations up 26.7% YoY — fastest compounding sector in the state." },
  { kind: "Risk", tone: "amber" as const, text: "Seed Ignition Grant (rural window) is 34% underutilized with 6 weeks to deadline." },
  { kind: "Region", tone: "amber" as const, text: "Karimnagar startup density is 41% below district target — intervention memo drafted." },
  { kind: "IPR", tone: "accent" as const, text: "Patent filings crossed 3,100 — commercialized IP up 38% after IPR desk integration." },
  { kind: "Policy", tone: "accent" as const, text: "Grant-to-jobs efficiency improved 17% after milestone-based disbursement went live." },
];

export const GOV_QUICK_ACTIONS = [
  { name: "Verify Startup", href: "/government/registry/verification" },
  { name: "Create Scheme", href: "/government/programs" },
  { name: "Create Grant", href: "/government/programs/grants" },
  { name: "Create Challenge", href: "/government/challenges" },
  { name: "Allocate Funding", href: "/government/funding/allocation" },
  { name: "Add Incubator", href: "/government/incubation" },
  { name: "Generate Report", href: "/government/reports/custom" },
];

/* ── Startup Registry ──────────────────────────────────────── */
export type RegistryStatus =
  | "Verified"
  | "Pending"
  | "Under Review"
  | "Info Requested"
  | "Rejected"
  | "Suspended"
  | "Graduated";

export const REGISTRY: {
  id: string;
  name: string;
  sector: string;
  district: string;
  stage: string;
  status: RegistryStatus;
  employees: number;
  registered: string;
  schemes: number;
}[] = [
  { id: "TS-SU-2026-0412", name: "CropLens AI", sector: "Agritech", district: "Rangareddy", stage: "Seed", status: "Verified", employees: 18, registered: "Jan 2026", schemes: 2 },
  { id: "TS-SU-2026-0388", name: "NeuroNest", sector: "HealthTech", district: "Hyderabad", stage: "Pre-seed", status: "Under Review", employees: 7, registered: "Feb 2026", schemes: 1 },
  { id: "TS-SU-2025-2901", name: "Terragrid", sector: "ClimateTech", district: "Hyderabad", stage: "Series A", status: "Graduated", employees: 44, registered: "Oct 2024", schemes: 3 },
  { id: "TS-SU-2026-0456", name: "AquaMend Robotics", sector: "ClimateTech · Water", district: "Warangal", stage: "Seed", status: "Pending", employees: 11, registered: "Mar 2026", schemes: 0 },
  { id: "TS-SU-2026-0309", name: "FleetFox", sector: "Logistics SaaS", district: "Nizamabad", stage: "Seed", status: "Info Requested", employees: 14, registered: "Feb 2026", schemes: 1 },
  { id: "TS-SU-2025-1177", name: "KhetScore", sector: "Agritech", district: "Karimnagar", stage: "Pre-seed", status: "Verified", employees: 9, registered: "Jun 2025", schemes: 2 },
  { id: "TS-SU-2026-0477", name: "Prithvi Metals", sector: "DeepTech", district: "Hyderabad", stage: "Seed", status: "Pending", employees: 12, registered: "Mar 2026", schemes: 0 },
  { id: "TS-SU-2025-2210", name: "GameVerse", sector: "Consumer", district: "Hyderabad", stage: "Seed", status: "Suspended", employees: 16, registered: "Sep 2025", schemes: 1 },
];

export const VERIFICATION_SUBJECT = {
  name: "NeuroNest",
  id: "TS-SU-2026-0388",
  checks: [
    { check: "Identity verification (founder KYC)", status: "Clear" as const, note: "Aadhaar + PAN matched" },
    { check: "Registration verification (MCA)", status: "Clear" as const, note: "CIN active, incorporated Nov 2025" },
    { check: "Founder verification", status: "Clear" as const, note: "AIIMS-affiliation letter verified" },
    { check: "Document verification", status: "Pending" as const, note: "1 of 6 documents awaiting certified copy" },
    { check: "Business activity verification", status: "Pending" as const, note: "Product demo call scheduled Apr 01" },
    { check: "Eligibility verification", status: "Flag" as const, note: "Turnover document predates incorporation window — clarify" },
  ],
  sla: "Day 4 of 10",
};

export const QUEUE = [
  { id: "TS-SU-2026-0477", name: "Prithvi Metals", age: "2d", review: "Document check", risk: "Low" },
  { id: "TS-SU-2026-0456", name: "AquaMend Robotics", age: "3d", review: "Business verification", risk: "Low" },
  { id: "TS-SU-2026-0388", name: "NeuroNest", age: "4d", review: "Eligibility clarification", risk: "Medium" },
  { id: "TS-SU-2026-0309", name: "FleetFox", age: "6d", review: "Info requested — awaiting founder", risk: "Medium" },
  { id: "TS-SU-2026-0491", name: "GridLoom", age: "1d", review: "New request", risk: "Low" },
];

export const REGISTRY_ANALYTICS = {
  verificationPass: 84,
  avgTime: "6.2 days",
  sectorDist: [
    { label: "HealthTech", pct: 21 },
    { label: "FinTech", pct: 19 },
    { label: "Agritech", pct: 16 },
    { label: "ClimateTech", pct: 14 },
    { label: "DeepTech", pct: 12 },
    { label: "Other", pct: 18 },
  ],
  districtDist: [
    { label: "Hyderabad", pct: 46 },
    { label: "Rangareddy", pct: 18 },
    { label: "Warangal", pct: 9 },
    { label: "Karimnagar", pct: 7 },
    { label: "Nizamabad", pct: 6 },
    { label: "Others", pct: 14 },
  ],
  stageDist: [
    { label: "Ideation", pct: 31 },
    { label: "Pre-seed", pct: 27 },
    { label: "Seed", pct: 24 },
    { label: "Series A+", pct: 18 },
  ],
  activeSplit: { active: 78, inactive: 22 },
};

export const PROFILE_SUBJECT = {
  name: "CropLens AI",
  id: "TS-SU-2026-0412",
  sector: "Agritech · Computer vision",
  district: "Rangareddy",
  stage: "Seed",
  founders: ["Anil Deshmukh (CEO)", "Farah Khan (CTO)"],
  employees: 18,
  revenue: "₹68L MRR",
  funding: "₹4.1 Cr raised",
  ipr: "2 patents filed",
  incubator: "AgriTech Hub, Hyderabad",
  schemes: ["Seed Ignition Grant", "AgriChain Challenge — Winner 2026"],
  grants: "₹40L disbursed · 86% utilized",
  since: "Registered Jan 2026 · Verified Feb 2026",
  docs: 14,
};

/* ── Programs & Schemes ────────────────────────────────────── */
export const SCHEMES = [
  { id: 1, name: "Seed Ignition Grant", status: "Active", budget: "₹60 Cr", disbursed: "₹38 Cr", beneficiaries: 212, utilization: 78, deadline: "Apr 30", window: "State-wide + rural window" },
  { id: 2, name: "Rural Innovation Fellowship", status: "Active", budget: "₹24 Cr", disbursed: "₹11 Cr", beneficiaries: 86, utilization: 66, deadline: "May 15", window: "Tier-2/3 districts" },
  { id: 3, name: "DeepTech Capability Fund", status: "Active", budget: "₹90 Cr", disbursed: "₹44 Cr", beneficiaries: 38, utilization: 71, deadline: "Rolling", window: "DeepTech only" },
  { id: 4, name: "Women Founder Sprint", status: "Active", budget: "₹18 Cr", disbursed: "₹12 Cr", beneficiaries: 96, utilization: 82, deadline: "Apr 02", window: "Women-led startups" },
  { id: 5, name: "Green Manufacturing Pilot", status: "Upcoming", budget: "₹45 Cr", disbursed: "—", beneficiaries: 0, utilization: 0, deadline: "Opens May", window: "Manufacturing + climate" },
];

export const GRANTS = [
  { id: 1, name: "Seed Ignition Grant — Cohort 07", pool: "₹12 Cr", approved: 64, pending: 41, disbursed: "₹8.6 Cr", compliance: 92 },
  { id: 2, name: "Rural Innovation Fellowship — 2026", pool: "₹6 Cr", approved: 29, pending: 38, disbursed: "₹3.1 Cr", compliance: 87 },
  { id: 3, name: "DeepTech Lab Access Grant", pool: "₹15 Cr", approved: 12, pending: 9, disbursed: "₹7.4 Cr", compliance: 95 },
];

export const FUNDING_PROGRAMS = [
  { id: 1, name: "Credit-Linked Capital Subsidy", type: "Subsidy", limit: "₹50L / startup", window: "State-wide", active: true },
  { id: 2, name: "Co-Investment Window (with SIDBI)", type: "Equity", limit: "₹2 Cr / deal", window: "Seed–Series A", active: true },
  { id: 3, name: "Patent Reimbursement Scheme", type: "Reimbursement", limit: "₹5L / filing", window: "All registered", active: true },
  { id: 4, name: "Export Readiness Grant", type: "Grant", limit: "₹25L / startup", window: "Growth stage", active: false },
];

export const ELIGIBILITY_RULES: { group: string; rules: string[]; automated: string }[] = [
  { group: "Sector", rules: ["Manufacturing + services both eligible", "Real-estate & trading excluded"], automated: "Auto-mapped from registry tags" },
  { group: "Stage", rules: ["Idea → Series A for grants", "Series B+ only for co-investment"], automated: "Stage inferred from funding data" },
  { group: "Geography", rules: ["State HQ or 60%+ operations in-state", "Rural window: district-pinned"], automated: "Geo-tagged from MCA address" },
  { group: "Revenue", rules: ["Pre-revenue OK for fellowship", "≥ ₹5L ARR for subsidy window"], automated: "Pulled from GST-linked returns" },
  { group: "Founder", rules: ["Indian resident, first-founder preference", "Women-led bonus +10 scoring points"], automated: "KYC-linked check" },
  { group: "IPR", rules: ["Filed IP gets priority in DeepTech fund", "Patent reimbursement requires grant status"], automated: "IPR desk API" },
];

export const SCHEME_MATCHES = [
  { scheme: "Seed Ignition Grant", match: 94, reason: "Seed stage, in-state HQ, agritech priority sector, IP filed", action: "Auto-invited Mar 12" },
  { scheme: "AgriChain Challenge", match: 91, reason: "Direct problem-statement fit — supply chain + AI", action: "Applied · Won" },
  { scheme: "Export Readiness Grant", match: 58, reason: "Needs 2y operating history — revisit Q4", action: "Watchlist" },
];

export const APPLICATION_ROWS = [
  { id: "GA-2241", startup: "CropLens AI", program: "Seed Ignition Grant", amount: "₹40 L", score: 88, status: "Approved", officer: "R. Nair" },
  { id: "GA-2288", startup: "NeuroNest", program: "Rural Fellowship", amount: "₹25 L", score: 81, status: "Under Review", officer: "S. Iqbal" },
  { id: "GA-2302", startup: "AquaMend Robotics", program: "DeepTech Fund", amount: "₹80 L", score: 85, status: "Shortlisted", officer: "R. Nair" },
  { id: "GA-2190", startup: "KhetScore", program: "Seed Ignition Grant", amount: "₹30 L", score: 72, status: "Approved", officer: "P. Das" },
  { id: "GA-2307", startup: "FleetFox", program: "Rural Fellowship", amount: "₹25 L", score: 64, status: "Under Review", officer: "S. Iqbal" },
  { id: "GA-2176", startup: "GameVerse", program: "Seed Ignition Grant", amount: "₹35 L", score: 41, status: "Rejected", officer: "P. Das" },
];

/* ── Challenges ────────────────────────────────────────────── */
export const CHALLENGES = [
  { id: 1, title: "AgriChain Innovation Challenge", agency: "Dept. of Agriculture", prize: "₹1 Cr pool", apps: 214, deadline: "Apr 12", status: "Active" },
  { id: 2, title: "Urban Mobility Data Sprint", agency: "Smart City Mission, Warangal", prize: "Paid PoC", apps: 96, deadline: "May 05", status: "Active" },
  { id: 3, title: "Water Grid Robotics Challenge", agency: "Irrigation Dept.", prize: "₹60 L + pilot", apps: 61, deadline: "Evaluation", status: "Evaluation" },
  { id: 4, title: "Tele-Health Rural Access", agency: "Health Mission", prize: "₹45 L", apps: 133, deadline: "Completed", status: "Completed" },
];

export const CHALLENGE_EVAL = {
  title: "Water Grid Robotics Challenge",
  criteria: [
    { label: "Technical feasibility", weight: 30 },
    { label: "Field readiness", weight: 25 },
    { label: "Cost per km covered", weight: 20 },
    { label: "Team capability", weight: 15 },
    { label: "Scalability", weight: 10 },
  ],
  evaluators: ["Mission Director", "Irrigation SE", "IIT-H nominee", "Industry expert"],
  rankings: [
    { rank: 1, name: "AquaMend Robotics", score: 91 },
    { rank: 2, name: "CanalBot Systems", score: 84 },
    { rank: 3, name: "JalRakshak Labs", score: 79 },
    { rank: 4, name: "DrainEye AI", score: 71 },
  ],
};

export const CHALLENGE_FINALISTS = [
  { name: "AquaMend Robotics", award: "Winner — ₹40L + paid pilot", decision: "Approved", pilot: "Khammam canals · 22 km" },
  { name: "CanalBot Systems", award: "Runner-up — ₹15L", decision: "Approved", pilot: "Lab validation track" },
  { name: "JalRakshak Labs", award: "Special mention — ₹5L", decision: "Approved", pilot: "Sensor-only trial" },
];

export const CHALLENGE_OUTCOMES = [
  { challenge: "Tele-Health Rural Access", winner: "SehatGrid", implemented: "62 rural spokes live", adoption: "3 districts", impact: "41K consultations/quarter" },
  { challenge: "AgriChain Innovation", winner: "CropLens AI", implemented: "Farm-gate QC stations", adoption: "2 mandis piloting", impact: "18% spoilage reduction" },
];

/* ── Incubation ────────────────────────────────────────────── */
export const INCUBATORS = [
  { id: 1, name: "Nexus Ventures", district: "Hyderabad", startups: 64, mentors: 42, accreditation: "A+", utilization: 88, success: 71 },
  { id: 2, name: "AgriTech Hub", district: "Hyderabad", startups: 41, mentors: 26, accreditation: "A", utilization: 79, success: 66 },
  { id: 3, name: "Health Launchpad", district: "Rangareddy", startups: 53, mentors: 31, accreditation: "A", utilization: 84, success: 69 },
  { id: 4, name: "Zero-to-One Studio", district: "Warangal", startups: 38, mentors: 18, accreditation: "B+", utilization: 62, success: 54 },
  { id: 5, name: "Climate Foundry", district: "Karimnagar", startups: 29, mentors: 15, accreditation: "B+", utilization: 58, success: 51 },
];

export const INCUBATOR_PERFORMANCE = {
  graduationRate: 64,
  fundingRaised: "₹486 Cr by cohort startups",
  jobsCreated: "11,420",
  iprGenerated: "920 filings",
  completion: 81,
  resourceUtilization: 76,
};

export const ACCELERATORS = [
  { name: "Velocity Seed Program", district: "Hyderabad", startups: 22, focus: "B2B SaaS", outcome: "19 raised seed within 9 months" },
  { name: "Frontier Deep Accelerator", district: "Hyderabad", startups: 14, focus: "DeepTech", outcome: "7 design wins in 12 months" },
  { name: "Rural Scale Program", district: "Nizamabad", startups: 17, focus: "Rural commerce", outcome: "2.4× avg. revenue multiple" },
];

export const PARTNER_GROUPS = [
  { group: "Universities", count: 24, examples: "IIT-H, NIT-W, Osmania, JNTU" },
  { group: "Research institutions", count: 11, examples: "CCMB, IICT, NGRI" },
  { group: "Corporates", count: 31, examples: "Pilot corridors in pharma, agri, aerospace" },
  { group: "Investors", count: 47, examples: "Funds + angel networks on co-invest window" },
  { group: "Industry bodies", count: 9, examples: "FICCI, CII, T-HUB alliance" },
  { group: "Government partners", count: 6, examples: "DPIIT, SIDBI, NITI linked programs" },
];

/* ── Funding & Resources ───────────────────────────────────── */
export const FUNDING_SUMMARY = {
  allocated: "₹420 Cr",
  disbursed: "₹286 Cr",
  utilized: "₹221 Cr",
  pending: "₹38 Cr",
  remaining: "₹96 Cr",
  disbursementRate: 68,
  utilizationRate: 77,
};

export const FUNDING_BY_SCHEME = [
  { label: "Seed Ignition Grant", v: 60, disbursed: 38 },
  { label: "DeepTech Capability Fund", v: 90, disbursed: 44 },
  { label: "Credit-Linked Subsidy", v: 75, disbursed: 59 },
  { label: "Rural Fellowship", v: 24, disbursed: 11 },
  { label: "Women Founder Sprint", v: 18, disbursed: 12 },
  { label: "Challenge Pools", v: 12, disbursed: 9 },
];

export const FUNDING_BY_DISTRICT = [
  { label: "Hyderabad", pct: 46 },
  { label: "Rangareddy", pct: 17 },
  { label: "Warangal", pct: 11 },
  { label: "Nizamabad", pct: 8 },
  { label: "Karimnagar", pct: 7 },
  { label: "Others", pct: 11 },
];

export const RESOURCE_POOL = [
  { resource: "Lab access hours", allocated: "9,200 hrs", used: 71, partner: "Research institutions" },
  { resource: "Cloud credits", allocated: "₹4.2 Cr", used: 64, partner: "3 cloud partners" },
  { resource: "Testing & QA benches", allocated: "38 benches", used: 58, partner: "Incubators" },
  { resource: "Expert hours (IPR/legal)", allocated: "2,400 hrs", used: 83, partner: "IPR experts" },
];

export const UTILIZATION_ROWS = [
  { area: "Seed Ignition Grant", rate: 78, status: "Healthy" },
  { area: "Rural Fellowship", rate: 66, status: "Watch" },
  { area: "DeepTech Fund", rate: 71, status: "Healthy" },
  { area: "Rural window (SIG)", rate: 34, status: "Under" },
  { area: "Challenge pools", rate: 88, status: "Healthy" },
];

export const ALLOCATION_TRACKING = [
  { id: "AL-0551", program: "Seed Ignition Grant", milestone: "Cohort 07 · M2 completion", amount: "₹4.2 Cr", status: "On track", date: "Apr 08" },
  { id: "AL-0538", program: "DeepTech Fund", milestone: "Lab access verification", amount: "₹6.0 Cr", status: "Pending approval", date: "Apr 02" },
  { id: "AL-0522", program: "Rural Fellowship", milestone: "Field deployment review", amount: "₹2.4 Cr", status: "Delayed", date: "Mar 28" },
  { id: "AL-0517", program: "Credit-Linked Subsidy", milestone: "Bank disbursal match", amount: "₹8.8 Cr", status: "On track", date: "Apr 15" },
];
