/* ──────────────────────────────────────────────────────────────
   IPR workspace data.

   Shared by all seven founder IPR screens — Overview, Patents,
   Trademarks, Copyright, Portfolio, Risk and Compliance — so a
   number a founder reads on one screen never drifts from the next.

   The health score is one model, not seven opinions:

     score = Σ (dimension score × dimension weight)

   Patents 84×30, Trademarks 48×35, Designs 22×10 and Contract
   coverage 88×25 give 66.2 → 66. Closing the three open actions
   lifts Patents to 86, Trademarks to 88 and Contract coverage to
   92, which gives 81.8 → 82 — the same "takes you to ~82" the
   Startup Copilot already quotes.

   The 66 also matches the "IP & Legal" assessment dimension and
   the "IP health" score on the growth health screen. A test asserts
   all three still agree.

   Tone values map onto the Badge component palette:
   default | accent | good | warn | bad
   ────────────────────────────────────────────────────────────── */

export type Tone = "default" | "accent" | "good" | "warn" | "bad";

/* The one function that turns dimension scores into the health number
   every IPR screen quotes. Weights are percentages and sum to 100, so
   the weighted average is the score. */
export function healthScoreFrom(dims: { score: number; weight: number }[]): number {
  return Math.round(dims.reduce((sum, d) => sum + d.score * d.weight, 0) / 100);
}

/* "₹1.9 Cr" → 190 (lakhs). One parser so a valuation can never be
   quoted in one unit on one screen and another unit on the next. */
export function toLakhs(amount: string): number {
  const n = Number(amount.replace(/[^\d.]/g, ""));
  if (!Number.isFinite(n)) return 0;
  return /cr/i.test(amount) ? n * 100 : n;
}

/* ₹3.87 Cr — the whole portfolio, valued. */
export function formatCr(lakhs: number): string {
  const cr = lakhs / 100;
  return `₹${cr >= 10 ? cr.toFixed(1) : cr.toFixed(2)} Cr`;
}

/* ── Portfolio ──────────────────────────────────────────────── */

export type AssetType = "Patent" | "Trademark" | "Copyright" | "Design" | "Trade secret";

export const assetTypes: {
  type: AssetType;
  count: number;
  registered: number;
  estValue: string;
  note: string;
  tone: Tone;
}[] = [
  {
    type: "Patent",
    count: 3,
    registered: 0,
    estValue: "₹1.9 Cr",
    note: "2 filed, 1 ready to file — claims v3 blocks the complete spec",
    tone: "accent",
  },
  {
    type: "Trademark",
    count: 2,
    registered: 1,
    estValue: "₹24 L",
    note: "Class 9 & 42 only — the v2 brand is unfiled 9 days from launch",
    tone: "warn",
  },
  {
    type: "Copyright",
    count: 2,
    registered: 2,
    estValue: "₹8 L",
    note: "Platform source code + FPO dataset schema, both registered",
    tone: "good",
  },
  {
    type: "Design",
    count: 0,
    registered: 0,
    estValue: "—",
    note: "Dashboard UX is a registrable design — no review filed yet",
    tone: "default",
  },
  {
    type: "Trade secret",
    count: 4,
    registered: 0,
    estValue: "₹1.65 Cr",
    note: "Model weights, pricing logic, FPO list, inference pipeline",
    tone: "good",
  },
];

/* Owner of every instrument, and whether the chain of title is clean. */
export const ownership = [
  {
    owner: "Lumen AI Pvt Ltd",
    assets: 10,
    status: "Clean",
    note: "All registrations and assignments are in the company name",
    tone: "good" as Tone,
  },
  {
    owner: "Founders (pre-incorp)",
    assets: 1,
    status: "Assignment pending",
    note: "Field Alert trademark application predates incorporation",
    tone: "warn" as Tone,
  },
  {
    owner: "University research tie-in",
    assets: 0,
    status: "N/A — no encumbrance",
    note: "Research collaboration carries no IP claim over your assets",
    tone: "default" as Tone,
  },
];

/* Per-asset valuation. The three patents sum to the ₹1.9 Cr the
   portfolio page quotes as the estimate. */
export const valuation: {
  asset: string;
  type: AssetType;
  value: string;
  stage: string;
  owner: string;
}[] = [
  { asset: "Multispectral crop stress inference", type: "Patent", value: "₹95 L", stage: "FER", owner: "Lumen AI Pvt Ltd" },
  { asset: "Per-acre yield attribution method", type: "Patent", value: "₹70 L", stage: "Published", owner: "Lumen AI Pvt Ltd" },
  { asset: "Drone-edge preprocessing pipeline", type: "Patent", value: "₹25 L", stage: "Draft", owner: "Lumen AI Pvt Ltd" },
  { asset: "Lumen AI wordmark", type: "Trademark", value: "₹24 L", stage: "Registered", owner: "Lumen AI Pvt Ltd" },
  { asset: "FPO dataset & schema", type: "Copyright", value: "₹8 L", stage: "Registered", owner: "Lumen AI Pvt Ltd" },
  { asset: "Model weights", type: "Trade secret", value: "₹60 L", stage: "Undisclosed", owner: "Lumen AI Pvt Ltd" },
  { asset: "Pricing engine logic", type: "Trade secret", value: "₹35 L", stage: "Undisclosed", owner: "Lumen AI Pvt Ltd" },
  { asset: "FPO partner list", type: "Trade secret", value: "₹18 L", stage: "Undisclosed", owner: "Lumen AI Pvt Ltd" },
  { asset: "Inference pipeline design", type: "Trade secret", value: "₹52 L", stage: "Undisclosed", owner: "Lumen AI Pvt Ltd" },
  { asset: "Platform source code", type: "Copyright", value: "—", stage: "Registered", owner: "Lumen AI Pvt Ltd" },
  { asset: "Field Alert mark (v2)", type: "Trademark", value: "—", stage: "Not filed", owner: "Founders (pre-incorp)" },
];

/* Every instrument the founder holds, counted once. */
export const totalAssets = assetTypes.reduce((sum, a) => sum + a.count, 0);

/* The five documents an investor asks for. Mirrors the evidence pack
   below, and matches the "IPR portfolio — 5 items, 60% complete" line
   on the funding screen. */
export const diligenceChecklist = [
  { item: "Patent filing receipts (2)", status: "Ready", tone: "good" as Tone, note: "Both provisional filings acknowledged" },
  { item: "Trademark registration certificate — Lumen AI", status: "Ready", tone: "good" as Tone, note: "Registered Mar 2023, renewal Mar 2034" },
  { item: "Copyright registration certificates (2)", status: "Ready", tone: "good" as Tone, note: "Code + FPO dataset, both deposited" },
  { item: "Claims v3 + FER status report", status: "Missing", tone: "bad" as Tone, note: "Claims review is 3 days overdue" },
  { item: "Contractor IP assignments (2 of 4)", status: "Missing", tone: "bad" as Tone, note: "Diligence blocker — 2 of 4 executed" },
];

/* ── Health ─────────────────────────────────────────────────── */

/* Weights sum to 100. */
export const coverageDimensions = [
  {
    dim: "Patents",
    score: 84,
    weight: 30,
    note: "2 of 3 filed — claims v3 blocks the complete-spec window",
    after: 86,
  },
  {
    dim: "Trademarks",
    score: 48,
    weight: 35,
    note: "Class 9 & 42 only — the v2 brand is unfiled",
    after: 88,
  },
  {
    dim: "Designs",
    score: 22,
    weight: 10,
    note: "No design registrations — dashboard UX is exposed",
    after: 22,
  },
  {
    dim: "Contract coverage",
    score: 88,
    weight: 25,
    note: "2 contractor assignments still outstanding",
    after: 92,
  },
];

/* The three things standing between 66 and 82. */
export const openActions: {
  id: string;
  title: string;
  detail: string;
  impact: number;
  owner: string;
  due: string;
  dimension: string;
  cost: string;
}[] = [
  {
    id: "act-tm",
    title: "File the 'Field Alert' trademark",
    detail:
      "Launch announcement is 9 days out. Class 9 and 42 are unregistered — a competitor can claim the name in that window.",
    impact: 14,
    owner: "You · Meera Krishnan",
    due: "Before launch (9 days)",
    dimension: "Trademarks",
    cost: "₹9,000 fixed fee",
  },
  {
    id: "act-claims",
    title: "Finish patent claims v3",
    detail:
      "Two suggestions from Meera are unattached. The complete-spec window closes in 11 weeks and is blocked until claims v3 lands.",
    impact: 1,
    owner: "Meera Krishnan",
    due: "Overdue 3 days",
    dimension: "Patents",
    cost: "2 hrs · counsel retainer",
  },
  {
    id: "act-ipassign",
    title: "Collect 2 missing contractor IP assignments",
    detail:
      "Two of four contractor agreements still carry pre-incorporation language that does not vest the work in the company.",
    impact: 1,
    owner: "You · Vikash Jha",
    due: "Apr 15",
    dimension: "Contract coverage",
    cost: "₹0 · countersignature",
  },
];

export const healthScore = 66;
export const projectedHealth = 82;

/* ── Patents ────────────────────────────────────────────────── */

export const patentStages = ["Draft", "Filed", "Published", "FER", "Responded", "Grant"];

export const patents: {
  id: string;
  title: string;
  number: string;
  filed: string;
  stage: number;
  counsel: string;
  next: string;
  value: string;
  tone: Tone;
  claims: number;
  jurisdiction: string;
}[] = [
  {
    id: "pat-1",
    title: "Multispectral crop stress inference",
    number: "IN 2024/112233",
    filed: "Nov 2024",
    stage: 3,
    counsel: "Dr. Meera Krishnan",
    next: "Claims v3 review — overdue 3 days",
    value: "₹95 L",
    tone: "warn",
    claims: 14,
    jurisdiction: "India · PCT filed",
  },
  {
    id: "pat-2",
    title: "Per-acre yield attribution method",
    number: "IN 2025/441208",
    filed: "Feb 2025",
    stage: 2,
    counsel: "Dr. Meera Krishnan",
    next: "FER response due Jun 02",
    value: "₹70 L",
    tone: "accent",
    claims: 11,
    jurisdiction: "India",
  },
  {
    id: "pat-3",
    title: "Drone-edge preprocessing pipeline",
    number: "—",
    filed: "—",
    stage: 0,
    counsel: "Unassigned",
    next: "Patentability search clear — ready to file",
    value: "₹25 L",
    tone: "good",
    claims: 9,
    jurisdiction: "India · not filed",
  },
];

/* Claims v3 — the item blocking the complete-spec window. */
export const claimChecklist: { id: string; item: string; owner: string; done: boolean }[] = [
  { id: "cl-1", item: "Independent claim 1 — inference graph construction", owner: "Meera", done: true },
  { id: "cl-2", item: "Dependent claims 2-4 — multispectral band weighting", owner: "Meera", done: true },
  { id: "cl-3", item: "Attach suggestion 1 — narrow the temperature-range fallback", owner: "You", done: false },
  { id: "cl-4", item: "Attach suggestion 2 — add the FPO-calibrated embodiment", owner: "You", done: false },
  { id: "cl-5", item: "Inventor declaration — 3 names confirmed", owner: "Vikash", done: true },
  { id: "cl-6", item: "Attach prior-art reference to the July paper", owner: "You", done: false },
];

export const priorArtWatch = [
  { title: "Multispectral stress scoring — AgriVision Labs", filed: "Jan 2026", overlap: "Claim 1 overlap", status: "Monitoring", tone: "warn" as Tone },
  { title: "Edge crop canopy estimation — NIPUN thesis", filed: "Sep 2025", overlap: "Background art only", status: "Clear", tone: "good" as Tone },
  { title: "Yield attribution via spectral indices — CropLink", filed: "Mar 2026", overlap: "Claims 2-3 overlap", status: "Monitoring", tone: "warn" as Tone },
];

export const patentCosts = [
  { item: "Provisional filing — drone-edge pipeline", amount: "₹16,000", when: "On file", tone: "accent" as Tone },
  { item: "Claims v3 drafting — counsel retainer", amount: "₹38,000", when: "Apr 12", tone: "warn" as Tone },
  { item: "FER response — per-acre patent", amount: "₹24,000", when: "Jun 02", tone: "accent" as Tone },
  { item: "PCT national phase — multispectral", amount: "₹1.8 L", when: "Nov 2026", tone: "default" as Tone },
];

/* ── Trademarks ─────────────────────────────────────────────── */

export const trademarkClasses = [
  { code: "9", name: "Software & apps", needed: true, note: "Your mobile app and CLI ship here" },
  { code: "42", name: "SaaS & AI services", needed: true, note: "The platform itself — your core revenue" },
  { code: "35", name: "Advertising & commerce", needed: false, note: "Only if you run your own marketplace" },
  { code: "41", name: "Education & training", needed: false, note: "Your FPO academy product" },
  { code: "45", name: "Legal & agronomy services", needed: false, note: "Not a revenue line today" },
];

export const trademarks: {
  id: string;
  name: string;
  kind: string;
  classes: string[];
  status: string;
  tone: Tone;
  filed: string;
  renewal: string;
  owner: string;
  note: string;
}[] = [
  {
    id: "tm-lumen",
    name: "Lumen AI",
    kind: "Word mark",
    classes: ["9", "42"],
    status: "Registered",
    tone: "good",
    filed: "Mar 2023",
    renewal: "Mar 2034",
    owner: "Lumen AI Pvt Ltd",
    note: "Logo device and word mark, both registered in class 9 and 42",
  },
  {
    id: "tm-field",
    name: "Field Alert",
    kind: "Word mark (v2)",
    classes: ["9", "42"],
    status: "Not filed",
    tone: "bad",
    filed: "—",
    renewal: "—",
    owner: "Founders (pre-incorp) — assignment pending",
    note: "Launch announcement in 9 days. Nothing protects the name today.",
  },
];

export const conflictingMarks = [
  { mark: "FIELDALERT", owner: "FieldAlert Systems Pvt Ltd", class: "9", status: "Live since 2019", clash: "Direct", tone: "bad" as Tone },
  { mark: "Field Alert Pro", owner: "AgriAlert Solutions", class: "42", status: "Application pending", clash: "Strong", tone: "warn" as Tone },
  { mark: "Fieldwise", owner: "Fieldwise Analytics", class: "42", status: "Live since 2021", clash: "Weak", tone: "default" as Tone },
];

export const trademarkWatchlist = [
  { term: "Lumen", class: "9, 42", result: "No conflicting live marks", checked: "2 days ago", tone: "good" as Tone },
  { term: "Field Alert", class: "9, 42", result: "2 close matches — 1 direct", checked: "2 days ago", tone: "warn" as Tone },
  { term: "Lumen Agri", class: "35", result: "No conflicting live marks", checked: "Apr 01", tone: "good" as Tone },
];

export const renewalCalendar = [
  { mark: "Lumen AI", class: "9, 42", renewal: "Mar 2034", days: "7 years", action: "Renews automatically", tone: "good" as Tone },
  { mark: "Field Alert", class: "9, 42", renewal: "—", days: "Not filed", action: "File now — 9 days to launch", tone: "bad" as Tone },
];

/* ── Copyright ──────────────────────────────────────────────── */

export const copyrightWorks = [
  {
    id: "cw-code",
    title: "Platform source code",
    kind: "Literary work (computer programme)",
    status: "Registered",
    tone: "good" as Tone,
    filed: "Aug 2022",
    certificate: "CR-2022-118742",
    owner: "Lumen AI Pvt Ltd",
    note: "Automatic protection under the Copyright Act; certificate on file",
  },
  {
    id: "cw-dataset",
    title: "FPO dataset & attribution schema",
    kind: "Literary work (database)",
    status: "Registered",
    tone: "good" as Tone,
    filed: "Mar 2024",
    certificate: "CR-2024-044119",
    owner: "Lumen AI Pvt Ltd",
    note: "Registered as a separate database right — the schema, not the rows",
  },
  {
    id: "cw-docs",
    title: "Agronomy handbook & training decks",
    kind: "Literary work",
    status: "Unregistered",
    tone: "warn" as Tone,
    filed: "—",
    certificate: "—",
    owner: "Lumen AI Pvt Ltd",
    note: "Protected automatically, but no certificate — 18 months of teaching material",
  },
];

export const ossInventory: {
  id: string;
  dependency: string;
  license: string;
  usage: string;
  risk: string;
  tone: Tone;
  action: string;
}[] = [
  { id: "oss-1", dependency: "torch / torchvision", license: "BSD-3-Clause", usage: "Model training + inference", risk: "Low", tone: "good", action: "Attribution file — done" },
  { id: "oss-2", dependency: "Next.js", license: "MIT", usage: "Platform web app", risk: "Low", tone: "good", action: "Attribution file — done" },
  { id: "oss-3", dependency: "drizzle-orm", license: "Apache-2.0", usage: "Data layer", risk: "Low", tone: "good", action: "Attribution file — done" },
  { id: "oss-4", dependency: "ffmpeg", license: "LGPL-2.1 (binary build)", usage: "Edge video preprocessing", risk: "Medium", tone: "warn", action: "Relink or publish source offer" },
  { id: "oss-5", dependency: "pyannote-segmentation", license: "MIT + model licence", usage: "Canopy segmentation model", risk: "Medium", tone: "warn", action: "Model weights are non-commercial" },
  { id: "oss-6", dependency: "chartjs-adapter-date-fns", license: "MIT", usage: "Dashboard charts", risk: "Low", tone: "good", action: "Attribution file — done" },
];

export const aiAssistedFiles = [
  { file: "src/inference/batch-window.ts", origin: "AI-assisted", policy: "Reviewed", tone: "good" as Tone, note: "Attribution comment present" },
  { file: "src/inference/cost-model.ts", origin: "AI-assisted", policy: "Reviewed", tone: "good" as Tone, note: "Attribution comment present" },
  { file: "src/ingest/fpo-normalise.py", origin: "AI-assisted", policy: "Unreviewed", tone: "warn" as Tone, note: "No attribution comment" },
  { file: "src/ui/field-alert-dashboard.tsx", origin: "Human-written", policy: "n/a", tone: "default" as Tone, note: "No AI involvement recorded" },
];

export const assignmentRegister = [
  { id: "as-1", party: "Vikash Jha — Founding engineer", scope: "All inventions and works", status: "Executed", tone: "good" as Tone, date: "Jun 2023" },
  { id: "as-2", party: "Kavya Nair — ML engineer", scope: "Model weights and training pipeline", status: "Executed", tone: "good" as Tone, date: "Aug 2023" },
  { id: "as-3", party: "Sunita Rao — Contract agronomist", scope: "Agronomy handbook chapters", status: "Outstanding", tone: "bad" as Tone, date: "— (pre-incorporation wording)" },
  { id: "as-4", party: "Northgate pilot team", scope: "FPO channel integration notes", status: "Outstanding", tone: "bad" as Tone, date: "— (pre-incorporation wording)" },
];

export const depositRecords = [
  { work: "Platform source code", deposited: "Aug 22, 2022", method: "Physical copy — registrar", status: "On file", tone: "good" as Tone },
  { work: "FPO dataset & schema", deposited: "Mar 14, 2024", method: "Online deposit — registrar", status: "On file", tone: "good" as Tone },
  { work: "Agronomy handbook", deposited: "—", method: "Not deposited", status: "Missing", tone: "warn" as Tone },
];

/* ── Risk ───────────────────────────────────────────────────── */

export const ipRisks: {
  id: string;
  title: string;
  category: string;
  likelihood: number;
  impact: "High" | "Medium" | "Low";
  exposure: string;
  mitigation: string;
  mitigationCost: string;
  owner: string;
  due: string;
  state: "Open" | "Mitigating" | "Closed";
  tone: Tone;
}[] = [
  {
    id: "risk-brand",
    title: "Launching 'Field Alert' unprotected",
    category: "Trademark",
    likelihood: 90,
    impact: "High",
    exposure: "9 days of unprotected brand — a squatter can claim the class",
    mitigation: "File trademark this week (₹9K fixed fee)",
    mitigationCost: "₹9,000 · 2 hrs",
    owner: "You",
    due: "Before launch",
    state: "Open",
    tone: "bad",
  },
  {
    id: "risk-assign",
    title: "Contractor IP assignment — 2 missing",
    category: "Ownership",
    likelihood: 55,
    impact: "Medium",
    exposure: "2 works may not vest in the company — diligence blocker",
    mitigation: "Collect both countersigned assignments",
    mitigationCost: "₹0 · 1 week",
    owner: "Vikash Jha",
    due: "Apr 15",
    state: "Open",
    tone: "warn",
  },
  {
    id: "risk-priorart",
    title: "Prior-art overlap in literature",
    category: "Patent",
    likelihood: 25,
    impact: "Low",
    exposure: "Claim 1 reads close to one January filing — monitor only",
    mitigation: "Log the reference in claims v3",
    mitigationCost: "₹0 · 30 min",
    owner: "Meera Krishnan",
    due: "Apr 12",
    state: "Mitigating",
    tone: "default",
  },
  {
    id: "risk-oss",
    title: "LGPL binary in the edge image",
    category: "Open source",
    likelihood: 35,
    impact: "Medium",
    exposure: "Distribution terms unverified in 2 pilot deployments",
    mitigation: "Relink against a shared library or publish the source offer",
    mitigationCost: "₹25,000 · 3 days",
    owner: "Kavya Nair",
    due: "Apr 30",
    state: "Open",
    tone: "warn",
  },
];

export const freedomToOperate = [
  { claim: "Multispectral stress inference", cleared: "No blocking claims found", clearedTone: "good" as Tone, note: "Searched 4 jurisdictions, Mar 2026" },
  { claim: "Per-acre yield attribution", cleared: "1 overlapping independent claim", clearedTone: "warn" as Tone, note: "CropLink filing Mar 2026 — monitor" },
  { claim: "Drone-edge preprocessing", cleared: "Not searched", clearedTone: "default" as Tone, note: "Run the search before filing" },
];

export const riskCategories = ["Trademark", "Ownership", "Patent", "Open source"];

/* ── Compliance ─────────────────────────────────────────────── */

export const obligations: {
  id: string;
  name: string;
  authority: string;
  kind: string;
  due: string;
  days: number;
  status: "Compliant" | "Due" | "Overdue" | "Not started";
  tone: Tone;
  evidence: string;
  owner: string;
}[] = [
  {
    id: "ob-1",
    name: "GST annual return (GSTR-9)",
    authority: "GST Council",
    kind: "Statutory",
    due: "Apr 30",
    days: 21,
    status: "Due",
    tone: "warn",
    evidence: "CA sign-off pending",
    owner: "Finance",
  },
  {
    id: "ob-2",
    name: "Startup India self-certification",
    authority: "DPIIT",
    kind: "Statutory",
    due: "May 15",
    days: 36,
    status: "Due",
    tone: "warn",
    evidence: "Trademark receipt is a hard gate",
    owner: "You",
  },
  {
    id: "ob-3",
    name: "FER response — per-acre patent",
    authority: "Indian Patent Office",
    kind: "Statutory",
    due: "Jun 02",
    days: 54,
    status: "Not started",
    tone: "default",
    evidence: "Draft with counsel not started",
    owner: "Meera Krishnan",
  },
  {
    id: "ob-4",
    name: "Contractor IP assignment collection",
    authority: "Internal — investors",
    kind: "Investor",
    due: "Apr 15",
    days: 6,
    status: "Overdue",
    tone: "bad",
    evidence: "2 of 4 executed",
    owner: "Vikash Jha",
  },
  {
    id: "ob-5",
    name: "Copyright deposit — agronomy handbook",
    authority: "Copyright Office",
    kind: "Statutory",
    due: "Apr 22",
    days: 13,
    status: "Not started",
    tone: "default",
    evidence: "Manuscript not deposited",
    owner: "Sunita Rao",
  },
  {
    id: "ob-6",
    name: "OSS attribution file",
    authority: "Internal — licence terms",
    kind: "Internal",
    due: "Mar 15",
    days: -13,
    status: "Compliant",
    tone: "good",
    evidence: "NOTICE file published",
    owner: "Kavya Nair",
  },
  {
    id: "ob-7",
    name: "Trademark watch — Lumen AI",
    authority: "IP India",
    kind: "Internal",
    due: "Apr 02",
    days: -5,
    status: "Compliant",
    tone: "good",
    evidence: "No conflicting live marks",
    owner: "Meera Krishnan",
  },
  {
    id: "ob-8",
    name: "Trademark class coverage review",
    authority: "Internal — investors",
    kind: "Investor",
    due: "Apr 10",
    days: 1,
    status: "Due",
    tone: "warn",
    evidence: "Class 35 decision outstanding",
    owner: "You",
  },
];

export const filingTracker = [
  { filing: "Patent — Multispectral crop stress inference", stage: "FER", next: "Claims v3", due: "Apr 09", owner: "Meera Krishnan", tone: "warn" as Tone },
  { filing: "Patent — Per-acre yield attribution method", stage: "Published", next: "FER response", due: "Jun 02", owner: "Meera Krishnan", tone: "accent" as Tone },
  { filing: "Patent — Drone-edge preprocessing pipeline", stage: "Draft", next: "Provisional filing", due: "Apr 30", owner: "Unassigned", tone: "default" as Tone },
  { filing: "Trademark — Field Alert", stage: "Not filed", next: "Class selection + filing", due: "Before launch", owner: "You", tone: "bad" as Tone },
  { filing: "Trademark — Lumen AI", stage: "Registered", next: "Renewal 2034", due: "Mar 2034", owner: "Meera Krishnan", tone: "good" as Tone },
  { filing: "Copyright — Platform source code", stage: "Registered", next: "—", due: "—", owner: "You", tone: "good" as Tone },
  { filing: "Copyright — FPO dataset & attribution schema", stage: "Registered", next: "—", due: "—", owner: "You", tone: "good" as Tone },
];

export const auditTrail = [
  { when: "Apr 02 · 11:20", who: "Meera Krishnan", what: "Claims v3 reviewed — 2 suggestions attached", ref: "pat-1" },
  { when: "Apr 02 · 09:05", who: "System", what: "Trademark watch completed — 1 direct match on 'Field Alert'", ref: "tm-field" },
  { when: "Apr 01 · 18:40", who: "Kavya Nair", what: "OSS attribution file published", ref: "oss-6" },
  { when: "Mar 30 · 14:12", who: "Vikash Jha", what: "1 contractor assignment countersigned", ref: "as-3" },
  { when: "Mar 28 · 10:02", who: "You", what: "FER status report uploaded to the data room", ref: "pat-2" },
];

export const evidencePack = [
  { doc: "Trademark certificate — Lumen AI", present: true, tone: "good" as Tone, shared: "Data room" },
  { doc: "Copyright certificates (2)", present: true, tone: "good" as Tone, shared: "Data room" },
  { doc: "Patent filing receipts (2)", present: true, tone: "good" as Tone, shared: "Data room" },
  { doc: "Claims v3 + FER status report", present: false, tone: "bad" as Tone, shared: "Counsel only" },
  { doc: "Contractor IP assignments (4)", present: false, tone: "bad" as Tone, shared: "Counsel only" },
];
