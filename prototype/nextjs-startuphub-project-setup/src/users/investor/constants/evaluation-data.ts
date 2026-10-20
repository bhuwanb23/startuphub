/* Evaluation workspace dataset — subject startup: PathPilot (Series A). */

export const EVAL_SUBJECT = {
  name: "PathPilot",
  tagline: "Pathology AI for tier-2 diagnostic chains",
  sector: "HealthTech",
  stage: "Series A",
  location: "Hyderabad",
  ask: "₹18 Cr",
  round: "Series A",
  overallScore: 84,
  recommendation: "Advance to Due Diligence",
  analysts: ["AM", "SK"],
};

export const EVAL_SECTIONS = [
  { label: "Problem", score: 90, summary: "70% of tier-2 pathology reports wait 48h+; radiologist density 1:100K outside metros." },
  { label: "Solution", score: 86, summary: "AI triage + pathologist-in-loop model; reports in under 4 hours at half the cost." },
  { label: "Product", score: 84, summary: "Live in 9 chains, 140 centres; NPS 62; CDSCO Class-B cleared Feb 2026." },
  { label: "Business Model", score: 82, summary: "Per-report SaaS fee + annual platform licence; 71% recurring revenue." },
  { label: "Traction", score: 85, summary: "₹1.2 Cr MRR, +22% MoM growth, 11-month average enterprise retention." },
  { label: "Market", score: 88, summary: "₹24K Cr diagnostics spend growing 14% CAGR; tier-2 segment fastest at 21%." },
  { label: "Team", score: 90, summary: "Radiologist CEO + IIT ML lead + ex-chain ops COO; rare regulatory-commercial blend." },
  { label: "Technology", score: 86, summary: "97.2% sensitivity on internal set; federated training solves data residency." },
  { label: "Financials", score: 76, summary: "Burn disciplined at ₹86L/mo; 14 months runway; collections cycle 62 days is a drag." },
  { label: "IPR", score: 82, summary: "3 patents filed (triage pipeline, QC), clear FTO from StartupHub IPR desk scan." },
  { label: "Funding", score: 80, summary: "₹6 Cr seed from Nexora; clean cap table; ESOP pool adequate at 8%." },
  { label: "Growth", score: 89, summary: "2.3× YoY revenue; pipeline covers 5× current ARR; state tender shortlist in TN." },
];

export const SCORE_DIMENSIONS: { label: string; score: number; note: string }[] = [
  { label: "Market", score: 88, note: "Large, growing, underserved tier-2 wedge" },
  { label: "Product", score: 84, note: "Regulatory-cleared, high NPS" },
  { label: "Team", score: 90, note: "Founder-market fit among best in cohort" },
  { label: "Financial", score: 76, note: "Healthy margins; receivables need work" },
  { label: "Technology", score: 86, note: "Federated moat; accuracy verified" },
  { label: "IP", score: 82, note: "3 filings, clean FTO" },
  { label: "Growth", score: 89, note: "Compounding 22% MoM" },
  { label: "Risk", score: 62, note: "Reimbursement dependence flagged" },
];

export const SCORE_HISTORY = [
  { date: "Mar 26", score: 84, by: "A. Mehta", note: "Post partner review" },
  { date: "Mar 19", score: 81, by: "S. Kapoor", note: "Updated after unit-econ walk-through" },
  { date: "Mar 08", score: 78, by: "A. Mehta", note: "Initial screen" },
];

export const MARKET_ANALYSIS = {
  tam: { label: "TAM", value: "₹24,800 Cr", note: "India diagnostics market, 2026" },
  sam: { label: "SAM", value: "₹6,100 Cr", note: "Tier-2/3 imaging + pathology" },
  som: { label: "SOM", value: "₹410 Cr", note: "5-year realistic capture (6.7%)" },
  cagr: "+14.2%",
  trends: [
    "Radiologist scarcity pushing AI triage adoption up 3.1× YoY",
    "AB-PMJAY reimbursement expansion into diagnostics (2027 rollout)",
    "Chain consolidation creating enterprise-scale buyers",
    "CDSCO fast-track pathway for proven SaMD cleared Feb 2026",
  ],
  segments: [
    { label: "Standalone labs", pct: 44 },
    { label: "Hospital-linked", pct: 33 },
    { label: "National chains", pct: 23 },
  ],
  opportunities: [
    "State tender pipeline (TN, KA) worth ~₹90 Cr is uncontested for AI triage",
    "B2B2C insurance bundles opening reimbursement-first distribution",
  ],
  risks: [
    "Reimbursement policy timing could slip 2-3 quarters",
    "National chains building in-house triage tools",
  ],
};

export const COMPETITORS = [
  { name: "ScanMedix", funding: "$22M", focus: "Radiology triage", pricing: "Per scan", share: "8.1%", strength: "Brand + metro chains" },
  { name: "DeepTrace Dx", funding: "$9M", focus: "Pathology AI", pricing: "Licence", share: "4.4%", strength: "Accuracy on rare cancers" },
  { name: "MediSight", funding: "$31M", focus: "Full-stack imaging", pricing: "Enterprise", share: "11.6%", strength: "Global regulatory clearances" },
  { name: "LabFlow (in-house)", funding: "Internal", focus: "Chain-led tools", pricing: "Internal", share: "—", strength: "Zero-cost distribution" },
];

export const SWOT = {
  strengths: ["Tier-2 distribution moat (140 centres)", "97.2% sensitivity, independently verified", "CDSCO Class-B + state tender shortlist", "71% recurring revenue"],
  weaknesses: ["62-day collections cycle", "Single-payer concentration in 2 anchor chains", "No DICOM-native native viewer yet"],
  opportunities: ["PMJAY reimbursement expansion", "Radiology-adjacent pathology expansion 2027", "GCC diagnostic export corridor"],
  threats: ["Chain in-house tooling", "Commodity open-source triage models", "Reimbursement policy delay"],
};

export const FIN_ANALYSIS = {
  kpis: [
    { label: "MRR", value: "₹1.2 Cr", delta: "+22% MoM", good: true },
    { label: "Net burn", value: "₹86 L/mo", delta: "-8% QoQ", good: true },
    { label: "Runway", value: "14 months", delta: "post-raise 28 mo", good: true },
    { label: "Gross margin", value: "68%", delta: "+4 pts QoQ", good: true },
    { label: "CAC", value: "₹42,000", delta: "-12% QoQ", good: true },
    { label: "LTV", value: "₹2.1 L", delta: "LTV/CAC 5.0x", good: true },
    { label: "NRR", value: "118%", delta: "expansion-led", good: true },
    { label: "Collections", value: "62 days", delta: "+9 days QoQ", good: false },
  ],
  revenueSeries: [18, 22, 21, 28, 34, 33, 42, 49, 47, 58, 66, 78, 86, 96, 108, 120],
  scenarios: [
    { name: "Bear", rev26: "₹11.2 Cr", rev27: "₹19 Cr", margin: "61%", note: "Tender slip + 1 chain churn" },
    { name: "Base", rev26: "₹16.4 Cr", rev27: "₹31 Cr", margin: "68%", note: "Current trajectory holds" },
    { name: "Bull", rev26: "₹21.8 Cr", rev27: "₹44 Cr", margin: "72%", note: "PMJAY pull-forward + KA tender" },
  ],
  notes: [
    "Receivables concentrate in 2 government-linked chains; require credit insurance plan",
    "Unit economics improve materially past 200 centres (fixed ML ops dilution)",
  ],
};

export const TEAM_ANALYSIS = {
  founders: [
    { name: "Dr. R. Menon", role: "CEO", background: "Interventional radiologist, 14 yrs · ex-Apollo networks", fit: 94 },
    { name: "Priya Chandran", role: "CTO", background: "IIT-M ML · ex-NVIDIA medical imaging", fit: 91 },
    { name: "Vikram Shetty", role: "COO", background: "Ops head, tier-2 chain (1,100 centres scaled)", fit: 88 },
  ],
  composition: [
    { label: "Engineering", count: 9 },
    { label: "Clinical", count: 4 },
    { label: "Sales & Ops", count: 6 },
    { label: "Regulatory", count: 2 },
  ],
  gaps: ["VP Sales (tier-3 expansion)", "DICOM integrations engineer"],
  risks: ["CEO also chairs clinical board — succession depth limited", "Attrition below 8% but no retention ESOP refresh yet"],
  verdict: "Exceptional founder-market fit; hiring gaps are standard for Series A.",
};

export const TECH_ASSESSMENT = {
  score: 86,
  stack: ["Python/PyTorch", "Federated node mesh", "DICOM gateway", "K8s on Yotta (data-resident)", "React viewer (beta)"],
  readiness: "TRL 9 — deployed and revenue-generating in production",
  scalability: "Federated nodes scale horizontally; cost per report falls 38% at 2× volume",
  moat: [
    "Federated training sidesteps data-residency — rivals can't replicate without re-architecture",
    "Proprietary tier-2 pathology corpus (1.9M annotated slides)",
  ],
  risks: [
    "Viewer dependency on third-party DICOM component (licence risk, replaceable)",
    "Model drift monitoring is manual; auto-retrain pipeline scheduled Q3",
  ],
};

export const IP_ASSESSMENT = {
  score: 82,
  portfolio: [
    { kind: "Patent", count: 3, note: "Triage pipeline, QC auto-check, federated update protocol" },
    { kind: "Trademark", count: 2, note: "Wordmark + device mark, classes 9/42/44" },
    { kind: "Copyright", count: 1, note: "Annotation methodology handbook" },
  ],
  ownership: "Clean — all assignees signed; IIT-M licence exclusive in field of use",
  strength: "Core filing (triage pipeline) has broad independent claims; FTO clear per IPR desk",
  risks: [
    "ScanMedix filed adjacent multi-modal claim Mar 24 — monitor opposition window",
    "One provisional lapses Oct 2026 if complete spec not filed",
  ],
  advantage: "Federated-update protocol patent, if granted, blocks the fast-follower path for 36+ months",
};

export const RISK_MATRIX: { area: string; level: "High" | "Medium" | "Low"; weight: number; mitigation: string }[] = [
  { area: "Reimbursement policy", level: "High", weight: 92, mitigation: "Parallel B2B sales motion; PMJAY treated as upside not base case" },
  { area: "Chain concentration", level: "High", weight: 84, mitigation: "Cap any payer at 22% of revenue by Series B; 3 new chains in pipeline" },
  { area: "Competitive (in-house)", level: "Medium", weight: 61, mitigation: "Lock multi-year contracts with auto-renewal + data exclusivity" },
  { area: "Regulatory (SaMD)", level: "Low", weight: 38, mitigation: "Class-B cleared; Class-C dossier already 60% assembled" },
  { area: "Technology drift", level: "Low", weight: 33, mitigation: "Auto-retrain pipeline + quarterly clinical QA audit" },
  { area: "Key person (CEO)", level: "Medium", weight: 55, mitigation: "Key-person insurance + clinical deputy elevation plan" },
];

export const RISK_SUMMARY = {
  score: 62,
  verdict: "Proceed with structured terms",
  note: "Concentration and reimbursement risks are addressable via tranche-linked milestones and payer-diversification covenants.",
  history: [
    { date: "Mar 26", score: 62, note: "Reimbursement timing downgraded" },
    { date: "Mar 08", score: 58, note: "Initial assessment" },
  ],
};
