/* ------------------------------- ai services ------------------------------- */

export type AiService = {
  id: number;
  name: string;
  purpose: string;
  owner: string;
  provider: string;
  version: string;
  env: string;
  enabled: boolean;
  health: string;
  latency: string;
  errorRate: string;
  usage: string;
  cost: string;
  fallback: string;
};

export const AI_SERVICES: AiService[] = [
  { id: 1, name: "MatchRank", purpose: "Entity matching & ranking", owner: "AI Ops", provider: "In-house · matchrank", version: "v2.4", env: "Production", enabled: true, health: "Degraded", latency: "1.4s p95", errorRate: "0.8%", usage: "2.1M req/d", cost: "$310/d", fallback: "Rules v3 (deterministic)" },
  { id: 2, name: "Copilot", purpose: "Startup Q&A assistant", owner: "AI Ops", provider: "External LLM (2 providers)", version: "v1.9", env: "Production", enabled: true, health: "Healthy", latency: "860ms p50", errorRate: "0.3%", usage: "48K sessions/d", cost: "$520/d", fallback: "Provider B auto-failover" },
  { id: 3, name: "SignalScan", purpose: "Traction signal extraction", owner: "Intel desk", provider: "In-house · NER pipeline", version: "v3.2", env: "Production", enabled: true, health: "Healthy", latency: "—", errorRate: "0.1%", usage: "140K docs/d", cost: "$96/d", fallback: "Queue pauses safely" },
  { id: 4, name: "RiskNet", purpose: "Fraud & risk scoring", owner: "Trust & Safety", provider: "In-house · gradient-boosted", version: "v4.1", env: "Production", enabled: true, health: "Healthy", latency: "42ms p95", errorRate: "0.0%", usage: "310K events/d", cost: "$88/d", fallback: "Alert-only mode" },
  { id: 5, name: "RecoFeed", purpose: "Personalized recommendations", owner: "AI Ops", provider: "In-house · two-tower", version: "v1.4", env: "Production", enabled: true, health: "Healthy", latency: "120ms p95", errorRate: "0.4%", usage: "890K req/d", cost: "$140/d", fallback: "Editorial slots" },
  { id: 6, name: "DocuSense", purpose: "Verification document OCR", owner: "Verification", provider: "External OCR", version: "v2.0", env: "Production", enabled: true, health: "Healthy", latency: "2.1s p95", errorRate: "1.1%", usage: "9K docs/d", cost: "$64/d", fallback: "Manual review queue" },
];

export type ModelVersion = {
  version: string;
  env: string;
  status: string;
  accuracy: string;
  drift: string;
  deployed: string;
  note: string;
};

export const MODEL_VERSIONS: ModelVersion[] = [
  { version: "MatchRank v2.5", env: "Staging", status: "Awaiting approval", accuracy: "84.2% (+2.1)", drift: "0.04", deployed: "Staged Apr 12", note: "Fairness eval passed · awaiting sign-off" },
  { version: "MatchRank v2.4", env: "Production", status: "Live", accuracy: "82.1%", drift: "0.07 (watch)", deployed: "Mar 28", note: "Latency degraded — investigation open" },
  { version: "MatchRank v2.3", env: "Production", status: "Rolled back", accuracy: "81.6%", drift: "0.05", deployed: "Mar 02", note: "Stable fallback — instant rollback target" },
  { version: "MatchRank v2.2", env: "Retired", status: "Deprecated", accuracy: "79.4%", drift: "0.11", deployed: "Jan 2026", note: "Deprecated — kept 90d for audit" },
];

export const DRIFT_BARS = [
  { label: "W1", value: 0.03 }, { label: "W2", value: 0.04 }, { label: "W3", value: 0.04 },
  { label: "W4", value: 0.05 }, { label: "W5", value: 0.07 }, { label: "W6", value: 0.06 },
  { label: "W7", value: 0.08 }, { label: "W8", value: 0.07 },
];

export const AI_INCIDENTS = [
  { id: "AI-221", what: "MatchRank latency p95 above 1s", sev: "High", when: "2h ago", state: "Investigating" },
  { id: "AI-218", what: "Copilot hallucination report (unsupported grant claim)", sev: "High", when: "Yesterday", state: "Guardrail added" },
  { id: "AI-204", what: "DocuSense OCR misread on Devanagari docs", sev: "Normal", when: "Apr 08", state: "Resolved" },
];

/* --------------------------------- matching -------------------------------- */

export type MatchFactor = "sector" | "stage" | "geo" | "availability" | "track" | "prefs";

export const MATCH_FACTORS: { key: MatchFactor; label: string; hint: string }[] = [
  { key: "sector", label: "Sector fit", hint: "Domain similarity (taxonomy)" },
  { key: "stage", label: "Stage compatibility", hint: "Founder stage vs. counterparty sweet spot" },
  { key: "geo", label: "Geography", hint: "Region overlap & language" },
  { key: "availability", label: "Availability", hint: "Capacity right now" },
  { key: "track", label: "Track record", hint: "Verified outcomes history" },
  { key: "prefs", label: "Preference alignment", hint: "Both sides' stated preferences" },
];

export type MatchCandidate = {
  id: number;
  pair: string;
  kind: string;
  factors: Record<MatchFactor, number>;
  acceptance: string;
};

export const MATCH_CANDIDATES: MatchCandidate[] = [
  { id: 1, pair: "Vantara Robotics ↔ T. Srinivasan", kind: "Startup–Mentor", factors: { sector: 0.96, stage: 0.78, geo: 0.84, availability: 0.72, track: 0.88, prefs: 0.81 }, acceptance: "96% hist." },
  { id: 2, pair: "GridSense ↔ Northbridge Capital", kind: "Startup–Investor", factors: { sector: 0.91, stage: 0.94, geo: 0.62, availability: 0.58, track: 0.9, prefs: 0.87 }, acceptance: "81% hist." },
  { id: 3, pair: "MediQueue ↔ HealthBridge Hospitals", kind: "Startup–Corporate", factors: { sector: 0.98, stage: 0.72, geo: 0.9, availability: 0.66, track: 0.84, prefs: 0.92 }, acceptance: "88% hist." },
  { id: 4, pair: "AquaTrace ↔ Coastal Marine Inst.", kind: "Startup–Institution", factors: { sector: 0.95, stage: 0.6, geo: 0.97, availability: 0.8, track: 0.62, prefs: 0.72 }, acceptance: "74% hist." },
  { id: 5, pair: "FiberForge ↔ AgriNest Incubator", kind: "Startup–Incubator", factors: { sector: 0.82, stage: 0.88, geo: 0.44, availability: 0.9, track: 0.66, prefs: 0.69 }, acceptance: "69% hist." },
  { id: 6, pair: "StackLedger ↔ FinEdge Bank", kind: "Startup–Corporate", factors: { sector: 0.88, stage: 0.52, geo: 0.71, availability: 0.4, track: 0.91, prefs: 0.78 }, acceptance: "77% hist." },
];

export const MATCH_VERSIONS = [
  { v: "v18", when: "Apr 10 → Apr 13", note: "Raised availability weight · false-match +2.6 pts → rolled back", current: false },
  { v: "v17", when: "Mar 22 → live", note: "Current production config", current: true },
  { v: "v16", when: "Mar 02 → Mar 22", note: "Geo factor down-weighted for remote-first" , current: false },
];

/* ------------------------------ recommendations ----------------------------- */

export const RECO_SURFACES = [
  { id: 1, name: "Content feed", slot: "Home · for-you rail", audience: "All founders", ctr: "6.4%", engagement: "31%", cap: 3, status: true },
  { id: 2, name: "Event recommendations", slot: "Events sidebar", audience: "Active users", ctr: "4.8%", engagement: "22%", cap: 2, status: true },
  { id: 3, name: "Program alerts", slot: "In-app + email", audience: "Eligible by stage/sector", ctr: "9.1%", engagement: "41%", cap: 2, status: true },
  { id: 4, name: "Market insights", slot: "Intelligence page", audience: "Founders + investors", ctr: "5.6%", engagement: "27%", cap: 4, status: false },
  { id: 5, name: "Next-best-action", slot: "Workspace top card", audience: "All roles", ctr: "12.8%", engagement: "58%", cap: 1, status: true },
];

export const RECO_EXPERIMENTS = [
  { id: "EXP-41", name: "Diversity boost in content feed", variants: "A: control · B: +20% cross-sector", metric: "CTR", result: "B +0.9 pts — promoting", running: true },
  { id: "EXP-39", name: "Cold-start via onboarding tags", variants: "A: popular · B: tagged", metric: "7d retention", result: "B +3.2 pts — shipped", running: false },
];

/* -------------------------------- risk engine ------------------------------ */

export type RiskRule = {
  id: number;
  name: string;
  condition: string;
  severity: string;
  threshold: number;
  fp: string;
  version: string;
  active: boolean;
};

export const RISK_RULES: RiskRule[] = [
  { id: 1, name: "Duplicate identity cluster", condition: "Same device + PAN similarity ≥ 0.8 across ≥ 2 accounts", severity: "High", threshold: 80, fp: "2.1%", version: "v7", active: true },
  { id: 2, name: "Advance-fee scam pattern", condition: "Listing promises funds + requests payment", severity: "Critical", threshold: 90, fp: "1.4%", version: "v12", active: true },
  { id: 3, name: "Document forgery signal", condition: "OCR inconsistency + registry cross-check fail", severity: "Critical", threshold: 85, fp: "3.2%", version: "v5", active: true },
  { id: 4, name: "Traction inflation heuristic", condition: "Claimed metrics > 4σ vs. sector peers & unverifiable", severity: "Medium", threshold: 70, fp: "6.8%", version: "v9", active: true },
  { id: 5, name: "Geo-velocity login anomaly", condition: "Impossible travel or datacenter ASN on auth", severity: "High", threshold: 75, fp: "2.9%", version: "v15", active: true },
  { id: 6, name: "Grant misuse pattern", condition: "Payout account changed within 7d of disbursement", severity: "High", threshold: 82, fp: "4.4%", version: "v3", active: false },
];

export type RiskAlert = {
  id: number;
  entity: string;
  rule: string;
  score: number;
  severity: string;
  status: string;
  age: string;
};

export const RISK_ALERTS: RiskAlert[] = [
  { id: 1, entity: "acct NEW_8841 (grant listing)", rule: "Advance-fee scam pattern", score: 94, severity: "Critical", status: "Open", age: "2h" },
  { id: 2, entity: "usr_00004 · Arjun Mehta", rule: "Duplicate identity cluster", score: 87, severity: "High", status: "Investigating", age: "6h" },
  { id: 3, entity: "Offshore Spark Ltd", rule: "KYC / AML failure", score: 91, severity: "Critical", status: "Investigating", age: "2d" },
  { id: 4, entity: "Zenith Traders", rule: "Document forgery signal", score: 88, severity: "High", status: "Open", age: "4d" },
  { id: 5, entity: "FarmLedger", rule: "Traction inflation heuristic", score: 72, severity: "Medium", status: "Open", age: "1d" },
  { id: 6, entity: "v.sethi@oldfund.co", rule: "Geo-velocity login anomaly", score: 79, severity: "High", status: "Contained (locked)", age: "9d" },
];

export const RISK_FP_TREND = [
  { label: "W1", value: 4.9 }, { label: "W2", value: 4.6 }, { label: "W3", value: 5.1 },
  { label: "W4", value: 4.4 }, { label: "W5", value: 4.2 }, { label: "W6", value: 3.9 },
  { label: "W7", value: 4.1 }, { label: "W8", value: 3.6 },
];
