/* Corporate core dataset — Arjuna Industries (agri-sciences & food processing).
   Innovation, discovery, evaluation, pilots, partnerships, procurement, contracts. */

export const CORP_STATS = {
  programs: 6,
  problems: 9,
  challenges: 2,
  startupPipeline: 34,
  techOpportunities: 12,
  pilots: 3,
  pocs: 2,
  partnerships: 6,
  spend: "₹4.2 Cr FY26",
  roi: "3.1× innovation ROI",
};

/* ── Innovation ────────────────────────────────────────────── */
export const PROBLEMS = [
  { id: "PS-014", title: "Post-harvest spoilage at farm gates exceeds 18%", bu: "AgriProcure", need: "Real-time QC at collection points without lab dependency", tech: "Hyperspectral / CV-based grading, offline-tolerant", budget: "₹40 L pilot", timeline: "Q2'26", status: "Open" },
  { id: "PS-011", title: "Manual quality inspection caps throughput at 2,400 crates/day", bu: "FreshLine Foods", need: "10× inspection throughput with ≥95% accuracy", tech: "Computer vision inline QC", budget: "₹60 L pilot", timeline: "Q2'26", status: "Open" },
  { id: "PS-008", title: "Cold-chain temperature excursions discovered too late", bu: "ColdNet Logistics", need: "Predictive alerting ≥6h before excursion", tech: "IoT telemetry + ML prediction", budget: "₹35 L pilot", timeline: "Q3'26", status: "Active pilot" },
  { id: "PS-006", title: "Packaging sustainability targets unmet for export SKUs", bu: "FreshLine Foods", need: "Compostable packaging with 6-week shelf performance", tech: "Bio-polymer materials", budget: "₹50 L pilot", timeline: "Q3'26", status: "Open" },
  { id: "PS-002", title: "Soil-health data absent from supplier contracts", bu: "AgriInput Sciences", need: "Verifiable soil carbon + health scoring across 4,000 farms", tech: "Satellite MRV", budget: "₹45 L program", timeline: "Q3'26", status: "Solved (FY25)" },
];

export const CORP_CHALLENGES = [
  { id: "CH-05", title: "Farm Gate Quality Challenge", prize: "₹40 L + paid pilot", problem: "PS-014", submissions: 96, deadline: "Apr 22", status: "Active" },
  { id: "CH-04", title: "Cold-Chain Intelligence Sprint", prize: "₹35 L + ColdNet rollout", problem: "PS-008", submissions: 61, deadline: "Evaluation closed", status: "Evaluation" },
  { id: "CH-02", title: "Sustainable Packaging Call", prize: "₹50 L + export SKU contract", problem: "PS-006", submissions: 0, deadline: "Opens May 12", status: "Upcoming" },
];

export const THEMES = [
  { theme: "AI quality & traceability", priority: "P1", note: "Board-level priority for export compliance" },
  { theme: "Climate-resilient sourcing", priority: "P1", note: "Soil MRV + regenerative framing for ESG audit" },
  { theme: "Cold-chain optimization", priority: "P2", note: "2.1% of revenue lost to excursions annually" },
  { theme: "Sustainable packaging", priority: "P2", note: "EU export rules tighten 2027" },
  { theme: "Water efficiency in processing", priority: "P3", note: "Long-term cost + license-to-operate" },
  { theme: "Farm data infrastructure", priority: "P3", note: "Foundational for future traceability products" },
];

export const OPEN_INNOVATION = [
  { kind: "Open call", title: "Traceable Harvest 2026", submissions: 148, selected: 6, status: "Screening" },
  { kind: "Idea box", title: "Employee innovation ideas", submissions: 64, selected: 9, status: "2 in pilot" },
  { kind: "Research call", title: "Shelf-life extension (with CCMB)", submissions: 22, selected: 2, status: "Joint research active" },
];

/* ── Discovery ─────────────────────────────────────────────── */
export const SCOUTED_TECHS = [
  { tech: "Hyperspectral farm-gate grading", trl: "TRL 8", maturity: "Deployable", providers: "3 startups", watch: "CropLens AI leads on tier-2 data density" },
  { tech: "Federated learning for on-prem AI", trl: "TRL 7", maturity: "Pilotable", providers: "5 startups", watch: "Solves our data-residency constraint" },
  { tech: "Predictive cold-chain excursion ML", trl: "TRL 6", maturity: "Pilotable", providers: "3 startups", watch: "Accuracy claims need bench validation" },
  { tech: "Compostable bio-polymer films", trl: "TRL 5", maturity: "Emerging", providers: "7 startups", watch: "Shelf-life evidence still thin" },
  { tech: "Satellite soil-carbon MRV", trl: "TRR 8", maturity: "Deployable", providers: "4 startups", watch: "Terragrid already covers 1.4M ha" },
];

export const CORP_MATCHES = [
  { startup: "CropLens AI", overall: 94, dims: [{ label: "Problem fit", v: 96 }, { label: "Technology", v: 88 }, { label: "Industry fit", v: 98 }, { label: "Readiness", v: 90 }], why: "Directly solves PS-014 farm-gate QC; 42 paid pilot farms prove field robustness; offline-first model matches our rural collection points.", action: "Expand pilot to 12 collection points" },
  { startup: "Terragrid", overall: 90, dims: [{ label: "Problem fit", v: 88 }, { label: "Technology", v: 91 }, { label: "Industry fit", v: 92 }, { label: "Readiness", v: 90 }], why: "Satellite soil MRV maps perfectly onto our supplier-contract data gap; ESG audit benefits compound.", action: "Scale to 4,000 supplier farms" },
  { startup: "ReJoule Energy", overall: 82, dims: [{ label: "Problem fit", v: 78 }, { label: "Technology", v: 86 }, { label: "Industry fit", v: 80 }, { label: "Readiness", v: 84 }], why: "Second-life battery packs could power remote cold-storage huts — early but promising unit economics.", action: "PoC at 2 island cold stores" },
  { startup: "Mandiverse", overall: 79, dims: [{ label: "Problem fit", v: 76 }, { label: "Technology", v: 80 }, { label: "Industry fit", v: 86 }, { label: "Readiness", v: 74 }], why: "Mandi exchange data enriches procurement price discovery — monitor until API matures.", action: "Watchlist · API sandbox" },
];

export const SOLUTIONS_SHORTLIST = [
  { solution: "Farm-gate CV QC station", startup: "CropLens AI", fitP: 96, cost: "₹4.2 L/station", roi: "11 months", complexity: "Low" },
  { solution: "Inline line-vision QC retrofit", startup: "VisionHarvest", fitP: 81, cost: "₹22 L/line", roi: "19 months", complexity: "Medium" },
  { solution: "Manual + mobile sampling app", startup: "QC Way (incumbent)", fitP: 58, cost: "₹0.4 L/user/yr", roi: "—", complexity: "Low" },
];

export const WATCHLIST_CORP = [
  { name: "CropLens AI", type: "Direct solution", trigger: "Series A close → pricing power", momentum: "₹68L MRR · +24% MoM" },
  { name: "Terragrid", type: "Strategic", trigger: "MRV standard v2 launch", momentum: "1.4M hectares mapped" },
  { name: "AquaMend Robotics", type: "Adjacent (water)", trigger: "Pilot procurement award", momentum: "Won Water Grid challenge" },
  { name: "Prithvi Metals", type: "Future (materials)", trigger: "First demo-scale plant", momentum: "Pre-seed · watch" },
];

/* ── Evaluation (subject: CropLens AI) ─────────────────────── */
export const EVAL_SUBJECT_CORP = {
  name: "CropLens AI",
  fit: 86,
  recommendation: "Expand pilot → partnership track",
  overall: "Scout-of-quarter · Q1 FY26",
};

export const EVAL_DIMS_CORP = [
  { label: "Problem fit (PS-014)", score: 96, note: "Built exactly for farm-gate QC" },
  { label: "Technology", score: 88, note: "Offline-first, field-proven in 42 farms" },
  { label: "Business fit (AgriProcure)", score: 90, note: "Matches BU budget + KPI structure" },
  { label: "Scalability", score: 82, note: "Station economics scale after 10 units" },
  { label: "Integration", score: 76, note: "ERP bridge via APIs; SAP connector in beta" },
  { label: "Cost / ROI", score: 85, note: "11-month payback at 12 points" },
];

export const SOLUTION_EVAL = {
  overview: "Portable farm-gate CV grading station + cloud QC dashboard",
  problemFit: "Cuts inspection time 14× and catches 96% of grade defects at collection",
  businessFit: "Fits AgriProcure capex plan; operators run after 2-hour training",
  cost: "₹4.2 L/station capex + ₹18K/mo subscription",
  roi: "11-month payback driven by spoilage reduction + premium-grade recovery",
  complexity: "Low — standalone stations, optional ERP sync",
  implementation: "12 points in 6 weeks, phased 4+4+4",
};

export const TECH_ASSESSMENT_CORP = {
  stack: ["Edge CV (Jetson-class)", "Hyperspectral+RGB fusion", "Offline sync mesh", "Cloud QC analytics"],
  readiness: "TRL 8 — deployed in production across 42 farms",
  security: "On-prem processing; QC images hashed; SOC2 in progress",
  integration: "REST + SAP connector (beta); SSO ready; data export open format",
  maturity: "Generation-3 hardware roadmap funded to FY28",
  ipOwnership: "2 patents filed on fusion grading; assignment clean per IPR scan",
  risks: ["Jetson supply chain — 16-week lead", "Model drift across new crop varieties (retrain cadence quarterly)"],
  score: 88,
};

export const BUSINESS_FIT = [
  { area: "Strategic fit", verdict: "Strong", note: "Core to Traceable Harvest 2026 board theme" },
  { area: "Operational fit", verdict: "Strong", note: "Fits existing collection-point SOPs with 2h training" },
  { area: "Market fit", verdict: "Strong", note: "Export customers demand documented QC since 2025" },
  { area: "Business unit fit", verdict: "Strong", note: "AgriProcure owns budget; ColdNet secondary benefit" },
  { area: "Customer fit", verdict: "Medium", note: "Export SKU buyers value it; domestic oblivious" },
  { area: "Cost fit", verdict: "Strong", note: "Inside approved innovation window" },
];

export const RISK_MATRIX_CORP = [
  { area: "Technology", level: "Medium", weight: 58, mitigation: "Bench-test next crop variety before scale-out" },
  { area: "Vendor viability", level: "Low", weight: 38, mitigation: "Series A closed; 18-month runway verified" },
  { area: "Integration", level: "Medium", weight: 52, mitigation: "Phased ERP bridge; manual export accepted in phase 1" },
  { area: "IPR", level: "Low", weight: 29, mitigation: "FTO clear — StartupHub IPR desk opinion on file" },
  { area: "Security", level: "Low", weight: 33, mitigation: "On-prem processing satisfies data policy" },
  { area: "Compliance", level: "Low", weight: 26, mitigation: "Export documentation standards met" },
];

export const EVAL_HISTORY_CORP = [
  { date: "Mar 26", action: "Partner-track recommendation approved by Innovation Council", by: "V. Sethi" },
  { date: "Mar 14", action: "Solution evaluation closed — score 86", by: "R. Agarwal" },
  { date: "Mar 02", action: "Technology assessment complete", by: "Dr. S. Iyer" },
  { date: "Feb 18", action: "Initial scouting evaluation", by: "R. Agarwal" },
];

/* ── Pilots & PoC ──────────────────────────────────────────── */
export const PILOTS = [
  { id: "PL-021", name: "Farm-gate QC stations", startup: "CropLens AI", bu: "AgriProcure", objective: "Cut spoilage 18% → 8% at 12 points", stage: "Active", kpis: 74, budget: "₹40 L", window: "Feb 15 – May 01" },
  { id: "PL-018", name: "Cold-chain excursion prediction", startup: "Frostat", bu: "ColdNet Logistics", objective: "≥6h prediction horizon on 8 routes", stage: "Active", kpis: 61, budget: "₹35 L", window: "Mar 01 – May 15" },
  { id: "PL-014", name: "Soil MRV supplier scoring", startup: "Terragrid", bu: "AgriInput Sciences", objective: "4,000 farms scored before FY27 contracts", stage: "Active", kpis: 82, budget: "₹45 L", window: "Jan 20 – Jun 30" },
  { id: "PL-009", name: "Inline line-vision QC retrofit", startup: "VisionHarvest", bu: "FreshLine Foods", objective: "10× line throughput at 95% accuracy", stage: "Planning", kpis: 12, budget: "₹60 L", window: "Starts May 05" },
];

export const POCS = [
  { id: "PC-011", name: "Second-life battery cold huts", startup: "ReJoule Energy", scope: "2 island cold stores · 90-day duty cycle", stage: "Proposed", budget: "₹12 L" },
  { id: "PC-009", name: "Compostable film 6-week shelf test", startup: "BioShell", scope: "3 export SKUs · lab + field barmeters", stage: "Active", budget: "₹9 L" },
];

export const PILOT_EVAL_SUBJECT = {
  name: "Farm-gate QC stations (CropLens AI)",
  kpis: [
    { kpi: "Spoilage reduction", target: "≤ 8%", actual: "7.4%", status: "Ahead" },
    { kpi: "Inspection throughput", target: "8 crates/min", actual: "9.1", status: "Ahead" },
    { kpi: "Grading accuracy", target: "≥ 95%", actual: "96.1%", status: "Ahead" },
    { kpi: "Cost per crate", target: "≤ ₹1.10", actual: "₹1.24", status: "Behind" },
  ],
  impact: [
    "Spoilage down 58% vs. control points across 6 live stations",
    "Premium-grade recovery worth ₹9.6 L incremental in 6 weeks",
    "Rejected-lot disputes dropped 71% — supplier trust index up",
  ],
  feedback: "AgriProcure field leads: 'running without it feels blind now.'",
  roi: "11-month payback on current trajectory",
};

export const DEPLOY_READINESS = [
  { area: "Technical", score: 92, note: "Field-stable at 42+ sites; crop-drift retrain SOP documented" },
  { area: "Business", score: 88, note: "Budget approved; operator training 2h/module" },
  { area: "Security", score: 84, note: "On-prem processing; SOC2 scheduled Q3" },
  { area: "Compliance", score: 90, note: "Export documentation + ESG audit trail complete" },
  { area: "Procurement", score: 86, note: "Vendor packet + insurance verified; MSA counter-signed" },
  { area: "Scalability", score: 82, note: "Station supply 3/wk capacity via contract manufacturer" },
];

/* ── Partnerships ──────────────────────────────────────────── */
export const PARTNERSHIPS = [
  { id: "PT-006", partner: "Terragrid", type: "Strategic · Data", area: "Soil MRV for 4,000 supplier farms", stage: "Active", score: 91, value: "₹65 L/yr", since: "2025" },
  { id: "PT-008", partner: "CropLens AI", type: "Solution partner", area: "Farm-gate QC stations + traceability", stage: "Partner track", score: 88, value: "₹4.2 Cr potential", since: "2026" },
  { id: "PT-004", partner: "CCMB", type: "Research · Joint", area: "Shelf-life extension co-research", stage: "Active", score: 84, value: "12-month joint", since: "2024" },
  { id: "PT-002", partner: "IIT-H Agri-AI center", type: "Research · Talent", area: "Student co-op + applied research", stage: "Active", score: 79, value: "—", since: "2024" },
  { id: "PT-001", partner: "State Innovation Mission", type: "Ecosystem", area: "Challenge co-hosting + grant corridors", stage: "Active", score: 86, value: "₹1 Cr challenge pool", since: "2023" },
];

export const COLLAB_PROJECTS = [
  { name: "Traceable Harvest chain", with: "Terragrid + CropLens AI", milestones: "18/22", status: "On track" },
  { name: "Shelf-life v2 film trial", with: "CCMB", milestones: "7/11", status: "On track" },
  { name: "ColdNet predictive model", with: "Frostat", milestones: "5/9", status: "Watch" },
];

export const PARTNER_HISTORY = [
  { partner: "ColdChain India", years: "2023–25", outcome: "Scaled to 26 routes, then closed — tech plateaued", lesson: "Set re-benchmark gates at 18 months" },
  { partner: "AgriDataWorks", years: "2024", outcome: "Terminated at pilot — data quality below bar", lesson: "Pilot KPIs now include data-freshness SLAs" },
];

/* ── Procurement ───────────────────────────────────────────── */
export const VENDORS = [
  { id: "VN-041", name: "CropLens AI", category: "Startup · CV systems", product: "Farm-gate QC stations", pricing: "₹4.2 L + ₹18K/mo", score: 90, status: "Approved vendor" },
  { id: "VN-037", name: "Terragrid", category: "Startup · MRV data", product: "Soil health scoring", pricing: "₹160/farm/yr", score: 91, status: "Active" },
  { id: "VN-031", name: "VisionHarvest", category: "Startup · Line vision", product: "Inline QC retrofit", pricing: "₹22 L/line", score: 76, status: "Evaluation" },
  { id: "VN-028", name: "Vertex Labs & Compute", category: "Infrastructure", product: "Lab + GPU capacity", pricing: "Package pricing", score: 88, status: "Active" },
  { id: "VN-019", name: "QC Way", category: "Incumbent", product: "Manual QC tools + app", pricing: "₹0.4 L/user/yr", score: 61, status: "Legacy" },
];

export const PROC_OPPORTUNITIES = [
  { id: "RFP-026", kind: "RFP", title: "12 farm-gate QC stations + 3-year SaaS", value: "₹61 L", responses: 3, shortlisted: 1, status: "Awarded" },
  { id: "RFQ-019", kind: "RFQ", title: "Soil MRV for 4,000 farms FY27", value: "₹64 L/yr", responses: 4, shortlisted: 2, status: "Evaluation" },
  { id: "RFI-031", kind: "RFI", title: "Compostable export packaging", value: "TBD", responses: 7, shortlisted: 0, status: "Open" },
];

export const PURCHASE_REQUESTS = [
  { id: "PR-0812", item: "6 additional QC stations (Phase 2)", bu: "AgriProcure", amount: "₹30.6 L", approver: "CPO", status: "Pending approval" },
  { id: "PR-0808", item: "Terragrid FY27 farm coverage renewal", bu: "AgriInput Sciences", amount: "₹64 L", approver: "CPO", status: "Approved" },
  { id: "PR-0801", item: "ColdNet sensor hardware (Frostat pilot)", bu: "ColdNet Logistics", amount: "₹8.4 L", approver: "BU Head", status: "In procurement" },
  { id: "PR-0797", item: "Lab capacity retainer — Vertex Labs", bu: "R&D", amount: "₹60K/mo", approver: "BU Head", status: "Rejected" },
];

export const PROC_HISTORY = [
  { item: "6 QC stations (Phase 1)", vendor: "CropLens AI", value: "₹25.2 L", supplier: "On time, 96% first-pass", saving: "₹9.6 L/mo recovered" },
  { item: "Soil MRV FY26", vendor: "Terragrid", value: "₹58 L", supplier: "4.8/5 quality", saving: "audit cost -38%" },
  { item: "Sensing retrofit trial", vendor: "Legacy OEM", value: "₹14 L", supplier: "3.1/5 — support gaps", saving: "—" },
];

/* ── Contracts ─────────────────────────────────────────────── */
export const CONTRACTS = [
  { id: "CT-026-018", type: "Pilot agreement", party: "CropLens AI", value: "₹40 L", window: "Feb 15 – May 01, 2026", status: "Active" },
  { id: "CT-025-104", type: "Partnership + MSA", party: "Terragrid", value: "₹65 L/yr", window: "Renewal Jun 2026", status: "Renewal" },
  { id: "CT-026-021", type: "Pilot agreement", party: "Frostat", value: "₹35 L", window: "Mar – May 2026", status: "Active" },
  { id: "CT-024-011", type: "Research agreement", party: "CCMB", value: "12-month joint", window: "Ends Nov 2026", status: "Active" },
  { id: "CT-026-033", type: "Vendor MSA", party: "Vertex Labs & Compute", value: "Frame · on-demand", window: "12 months", status: "Negotiation" },
  { id: "CT-023-090", type: "Pilot conclusion", party: "AgriDataWorks", value: "₹12 L", window: "Closed 2025", status: "Expired" },
];

export const CONTRACT_SUBJECT = {
  id: "CT-025-104 · Terragrid renewal",
  terms: [
    { clause: "Coverage", detail: "4,200 farms + 8% surplus buffer", status: "Agreed" },
    { clause: "Pricing", detail: "₹152/farm/yr (-5% YoY)", status: "Agreed" },
    { clause: "Data freshness SLA", detail: "≤ 14-day revisit per farm", status: "Counter" },
    { clause: "Audit trail", detail: "ESG-auditable chain per plot", status: "Agreed" },
    { clause: "Exit", detail: "90-day notice with data handover", status: "Open" },
  ],
  obligations: "Quarterly traceability reports + MRV standard upgrade path.",
  risk: "Counter-proposal on data freshness: monthly revisit for drip-irrigated zones. Finance accepts a ₹4 L delta either way.",
};

export const RENEWALS = [
  { contract: "Terragrid FY27", expiry: "Jun 30", value: "₹64 L/yr", action: "Renew with buffer", status: "Draft ready" },
  { contract: "Vertex Labs lab retainer", expiry: "Jul 31", value: "₹7.2 L/yr", action: "Renegotiate", status: "Evaluation" },
  { contract: "Sensing OEM support", expiry: "Aug 15", value: "₹4.8 L/yr", action: "Not renewing", status: "Decided" },
];

/* ── Performance & analytics ───────────────────────────────── */
export const CORP_KPIS = [
  { kpi: "Innovation ROI", target: "≥ 3.0×", actual: "3.1×", trend: "up", owner: "CIO office" },
  { kpi: "Pilot → deployment rate", target: "≥ 55%", actual: "61%", trend: "up", owner: "Innovation" },
  { kpi: "Spoilage (pilot points)", target: "≤ 8%", actual: "7.4%", trend: "up", owner: "AgriProcure" },
  { kpi: "Traceable supply share", target: "40%", actual: "34%", trend: "steady", owner: "Sustainability" },
  { kpi: "Startup-sourced savings", target: "₹2 Cr/yr", actual: "₹2.7 Cr", trend: "up", owner: "Procurement" },
  { kpi: "Innovation cycle time", target: "≤ 120 days", actual: "104 days", trend: "up", owner: "Innovation" },
];

export const INNOVATION_SPEND = [1.8, 2.1, 2.4, 2.2, 2.9, 3.1, 3.4, 3.2, 3.8, 4.0, 3.9, 4.2];

export const PILOT_ANALYTICS = {
  total: 21,
  successRate: 61,
  deploymentRate: 58,
  avgCost: "₹38 L",
  avgRoi: "2.9×",
  outcomes: [
    { label: "Deployed to production", n: 12, tone: "rise" as const },
    { label: "Extended / iterative", n: 4, tone: "accent" as const },
    { label: "Closed after pilot", n: 5, tone: "slate" as const },
  ],
};
