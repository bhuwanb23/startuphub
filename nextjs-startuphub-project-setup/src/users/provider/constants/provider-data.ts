/* Provider core dataset — resources, requests, bookings, allocations,
   usage and payments. Vertex Labs & Compute, Hyderabad. */

export const PROVIDER_STATS = {
  resources: "24 units across 8 listings",
  listings: 8,
  allocated: 9,
  bookings: 38,
  pendingRequests: 7,
  activeStartups: 96,
  utilization: 73,
  monthRevenue: "₹4.2 L",
  pendingPayments: "₹1.8 L",
};

/* ── Resource inventory ────────────────────────────────────── */
export type ResourceStatus =
  | "Available" | "Allocated" | "Booked" | "Maintenance" | "Unavailable" | "Archived";

export const RESOURCES: {
  id: string;
  name: string;
  type: string;
  category: string;
  location: string;
  status: ResourceStatus;
  price: string;
  units: number;
  rating: number;
  util: number;
  listing: "Active" | "Draft" | "Paused" | "Expired";
}[] = [
  { id: "RES-001", name: "Bio-Bench Lab Suite A", type: "Wet lab bench + analytics", category: "Testing / Lab", location: "Hyderabad · Gachibowli", status: "Allocated", price: "₹1,800/hr", units: 4, rating: 4.9, util: 86, listing: "Active" },
  { id: "RES-002", name: "GPU Compute Cluster", type: "8× A100 nodes", category: "Compute / Software", location: "Cloud · India region", status: "Available", price: "₹420/GPU-hr", units: 16, rating: 4.8, util: 74, listing: "Active" },
  { id: "RES-003", name: "Rapid Prototyping Bay", type: "3D print + CNC + laser", category: "Manufacturing", location: "Hyderabad · Madhapur", status: "Booked", price: "₹2,400/half-day", units: 2, rating: 4.7, util: 68, listing: "Active" },
  { id: "RES-004", name: "ISO-7 Cleanroom Access", type: "2,000 sq ft cleanroom", category: "Facility", location: "Hyderabad · Gachibowli", status: "Available", price: "₹9,500/day", units: 1, rating: 4.9, util: 52, listing: "Active" },
  { id: "RES-005", name: "Demo & Boardroom Suites", type: "4 suites · 8–20 seats", category: "Workspace", location: "Hyderabad · Hitech City", status: "Booked", price: "₹1,200/hr", units: 4, rating: 4.6, util: 81, listing: "Active" },
  { id: "RES-006", name: "Battery Test Benches", type: "Cell + pack cyclers", category: "Equipment", location: "Hyderabad · Gachibowli", status: "Maintenance", price: "₹3,100/day", units: 6, rating: 4.8, util: 91, listing: "Active" },
  { id: "RES-007", name: "Compliance & FTO Desk", type: "Expert-hours service", category: "Professional Service", location: "Remote + on-site", status: "Available", price: "₹4,500/hr", units: 8, rating: 4.9, util: 62, listing: "Active" },
  { id: "RES-008", name: "Drone Test Range", type: "12-acre certified range", category: "Facility", location: "Shamshabad outskirts", status: "Available", price: "₹14,000/day", units: 1, rating: 4.9, util: 44, listing: "Active" },
];

export const RESOURCE_SUBJECT = {
  name: "Bio-Bench Lab Suite A",
  id: "RES-001",
  type: "Wet-lab bench + analytical stack",
  location: "Vertex Labs Campus, Gachibowli, Hyderabad",
  rating: 4.9,
  specs: [
    ["Benches", "4 × shared wet benches (BSL-2)"],
    ["Analytics", "HPLC, qPCR, plate reader, gel doc"],
    ["Capacity", "24 simultaneous stations"],
    ["Certifications", "NABL-aligned SOPs · ISO 9001 facility"],
    ["Pricing", "₹1,800/hr · ₹9,800/day · ₹1.6L/mo station"],
    ["Booking", "Min 2-hour slots · 48h advance for suites"],
  ],
  features: [
    "Trained lab manager on-site 08:00–20:00",
    "Consumables store with GST invoicing",
    "Cold-chain storage (-20° / -80°)",
    "Sample courier tie-up (24h TAT)",
    "Safety induction included",
  ],
  incremental: [
    { label: "Utilization", value: "86% rolling 30d" },
    { label: "Repeat customers", value: "68% of bookings" },
    { label: "Downtime (30d)", value: "0.8%" },
  ],
  docs: ["BSL-2 compliance certificate.pdf", "SOP_handbook_v9.pdf", "Insurance certificate 2026.pdf", "Equipment service log.pdf"],
};

export const CATEGORIES = [
  { name: "Testing / Lab", count: 4, util: 86, note: "Benches + analytics suites" },
  { name: "Compute / Software", count: 16, util: 74, note: "GPU clusters + licensed stacks" },
  { name: "Manufacturing", count: 2, util: 68, note: "Rapid prototyping, CNC, laser" },
  { name: "Facility", count: 2, util: 48, note: "Cleanroom + drone range" },
  { name: "Equipment", count: 6, util: 91, note: "Battery cyclers, sensor rigs" },
  { name: "Workspace", count: 4, util: 81, note: "Boardrooms + demo suites" },
  { name: "Professional Service", count: 8, util: 62, note: "Expert-hours compliance desk" },
];

export const AVAILABILITY_WEEK: { day: string; slots: ("open" | "booked" | "blocked" | "maint")[] }[] = [
  { day: "Mon 30", slots: ["booked", "booked", "open", "open"] },
  { day: "Tue 31", slots: ["booked", "open", "open", "blocked"] },
  { day: "Wed 01", slots: ["open", "open", "booked", "open"] },
  { day: "Thu 02", slots: ["booked", "booked", "booked", "open"] },
  { day: "Fri 03", slots: ["open", "maint", "maint", "open"] },
  { day: "Sat 04", slots: ["open", "open", "blocked", "blocked"] },
  { day: "Sun 05", slots: ["blocked", "blocked", "blocked", "blocked"] },
];

export const PRICING_TIERS: { resource: string; hourly: string; daily: string; monthly: string; startup: string; util: number }[] = [
  { resource: "Bio-Bench Lab Suite A", hourly: "₹1,800", daily: "₹9,800", monthly: "₹1.6 L", startup: "-20% for incubated", util: 86 },
  { resource: "GPU Compute Cluster", hourly: "₹420", daily: "₹8,400", monthly: "₹1.9 L", startup: "-35% off-peak", util: 74 },
  { resource: "Rapid Prototyping Bay", hourly: "—", daily: "₹2,400", monthly: "₹42K", startup: "First 2 days free", util: 68 },
  { resource: "ISO-7 Cleanroom", hourly: "—", daily: "₹9,500", monthly: "₹2.2 L", startup: "-15% for grant holders", util: 52 },
  { resource: "Battery Test Benches", hourly: "—", daily: "₹3,100", monthly: "₹68K", startup: "-25% for climate cohort", util: 91 },
  { resource: "Drone Test Range", hourly: "—", daily: "₹14,000", monthly: "₹2.8 L", startup: "Safe-fly package incl.", util: 44 },
];

export const DISCOUNT_PLANS = [
  { name: "Incubated Startup", cut: "-20%", scope: "All categories", rule: "Verified incubator association" },
  { name: "Grant-holder Priority", cut: "-15%", scope: "Facility + Equipment", rule: "Active government grant" },
  { name: "Off-peak Compute", cut: "-35%", scope: "GPU nights & weekends", rule: "Auto-applied 22:00–06:00" },
  { name: "Commit-6-month", cut: "-18%", scope: "Monthly plans", rule: "Prepaid commitment" },
];

export const PACKAGES = [
  { name: "Starter Lab Pass", price: "₹18,000/mo", includes: "10 lab hrs + 4 expert hrs + courier credits", active: 14, popular: true },
  { name: "Compute Monthly", price: "₹62,000/mo", includes: "160 GPU-hrs + reserved node Fridays", active: 9, popular: true },
  { name: "Founder Bundle", price: "₹9,500/mo", includes: "2 boardroom slots + 1 bench day + 2 advisory hrs", active: 22, popular: false },
];

/* ── Requests / bookings / allocations ─────────────────────── */
const STATUSES = ["New", "Pending", "Negotiation", "Approved", "Rejected", "Completed", "Cancelled"] as const;
export type RequestStatus = (typeof STATUSES)[number];

export const REQUESTS: {
  id: string; startup: string; resource: string; purpose: string;
  qty: string; duration: string; date: string; budget: string; status: RequestStatus;
}[] = [
  { id: "REQ-1041", startup: "NeuroNest", resource: "Bio-Bench Lab Suite A", purpose: "EEG consumables + sample prep for trial batch", qty: "1 bench", duration: "Apr 06 – Apr 10", date: "Today 09:14", budget: "₹38K", status: "New" },
  { id: "REQ-1040", startup: "Qwron", resource: "ISO-7 Cleanroom", purpose: "Photonic packaging run for design-win tape-in", qty: "3 days", duration: "Apr 08 – Apr 10", date: "Yesterday", budget: "₹28.5K", status: "Negotiation" },
  { id: "REQ-1038", startup: "CropLens AI", resource: "GPU Compute Cluster", purpose: "Retrain crop-disease model v4 on new mandi data", qty: "4 GPUs", duration: "72 hrs continuous", date: "2 days ago", budget: "₹61K", status: "Approved" },
  { id: "REQ-1036", startup: "Zephyr Drones", resource: "Drone Test Range", purpose: "BVLOS certification flight series", qty: "2 days", duration: "Apr 14 – Apr 15", date: "2 days ago", budget: "₹28K", status: "Approved" },
  { id: "REQ-1033", startup: "ReJoule Energy", resource: "Battery Test Benches", purpose: "Second-life pack grading — third-party bench verification", qty: "2 benches", duration: "5 days", date: "Mar 26", budget: "₹31K", status: "Pending" },
  { id: "REQ-1029", startup: "KhetScore", resource: "Demo & Boardroom Suites", purpose: "Agri-bank pilot review with Nabard team", qty: "1 suite (16 seats)", duration: "Half day", date: "Mar 25", budget: "₹6K", status: "Completed" },
  { id: "REQ-1024", startup: "FleetFox", resource: "GPU Compute Cluster", purpose: "Route sims — overflow burst", qty: "2 GPUs", duration: "48 hrs", date: "Mar 24", budget: "₹20K", status: "Rejected" },
];

export const BOOKINGS: {
  id: string; startup: string; resource: string; date: string; slot: string;
  qty: string; price: string; status: "Upcoming" | "Active" | "Completed" | "Cancelled" | "Rescheduled"; pay: "Paid" | "Pending" | "Refunded";
}[] = [
  { id: "BK-2211", startup: "CropLens AI", resource: "GPU Compute Cluster", date: "Apr 05", slot: "00:00 → 72h", qty: "4 GPUs", price: "₹60,480", status: "Upcoming", pay: "Pending" },
  { id: "BK-2208", startup: "Zephyr Drones", resource: "Drone Test Range", date: "Apr 14", slot: "Full day ×2", qty: "1 range", price: "₹28,000", status: "Upcoming", pay: "Paid" },
  { id: "BK-2204", startup: "NeuroNest", resource: "Bio-Bench Lab Suite A", date: "Today", slot: "08:00 → 16:00", qty: "1 bench", price: "₹14,400", status: "Active", pay: "Paid" },
  { id: "BK-2199", startup: "SehatGrid", resource: "Demo Suites", date: "Today", slot: "14:00 → 18:00", qty: "Suite 2", price: "₹4,800", status: "Active", pay: "Paid" },
  { id: "BK-2194", startup: "Qwron", resource: "Rapid Prototyping Bay", date: "Mar 30", slot: "Half day", qty: "1 bay", price: "₹2,400", status: "Completed", pay: "Paid" },
  { id: "BK-2190", startup: "Mandiverse", resource: "GPU Compute Cluster", date: "Mar 28", slot: "48h", qty: "2 GPUs", price: "₹20,160", status: "Completed", pay: "Paid" },
  { id: "BK-2186", startup: "AquaMend", resource: "Battery Test Benches", date: "Mar 27", slot: "Full day", qty: "1 bench", price: "₹3,100", status: "Rescheduled", pay: "Refunded" },
  { id: "BK-2181", startup: "GameVerse", resource: "Demo Suites", date: "Mar 26", slot: "2h", qty: "Suite 4", price: "₹2,400", status: "Cancelled", pay: "Refunded" },
];

export const ALLOCATIONS: {
  id: string; startup: string; resource: string; start: string; end: string;
  progress: number; status: "Active" | "Scheduled" | "Expiring" | "Completed";
}[] = [
  { id: "AL-301", startup: "NeuroNest", resource: "Bio-Bench Suite A · Bench 3", start: "Apr 06", end: "Apr 10", progress: 22, status: "Active" },
  { id: "AL-298", startup: "CropLens AI", resource: "GPU nodes 04–07 (reserved)", start: "Apr 01", end: "Apr 05", progress: 71, status: "Expiring" },
  { id: "AL-294", startup: "PathPilot", resource: "Starter Lab Pass (monthly)", start: "Apr 01", end: "Apr 30", progress: 38, status: "Active" },
  { id: "AL-290", startup: "Zephyr Drones", resource: "Drone Range · bay north", start: "Apr 14", end: "Apr 15", progress: 0, status: "Scheduled" },
  { id: "AL-286", startup: "Terragrid", resource: "Cleanroom access (tertiary)", start: "Mar 24", end: "Mar 29", progress: 100, status: "Completed" },
];

/* ── Usage ─────────────────────────────────────────────────── */
export const LIVE_SESSIONS = [
  { startup: "NeuroNest", resource: "Bench 3 · Bio-Bench A", since: "08:40", hours: 3.2, meter: "₹5,760" },
  { startup: "SehatGrid", resource: "Suite 2 · Demo Suites", since: "14:02", hours: 1.1, meter: "₹1,320" },
  { startup: "CropLens AI", resource: "GPU nodes 05–06 (warm-up)", since: "22:00 yd", hours: 11.5, meter: "₹9,660" },
];

export const USAGE_LOG = [
  { date: "Apr 01", startup: "CropLens AI", resource: "GPU cluster", hours: 18.5, amount: "₹15,540" },
  { date: "Apr 01", startup: "NeuroNest", resource: "Bio-Bench A", hours: 8.2, amount: "₹14,760" },
  { date: "Mar 31", startup: "PathPilot", resource: "Starter Lab Pass", hours: 6.0, amount: "incl. plan" },
  { date: "Mar 31", startup: "ReJoule Energy", resource: "Battery bench 2", hours: 9.5, amount: "₹3,100/d bench" },
  { date: "Mar 30", startup: "Qwron", resource: "Prototyping Bay", hours: 4.0, amount: "₹2,400" },
  { date: "Mar 30", startup: "KhetScore", resource: "Boardroom suite", hours: 3.0, amount: "₹3,600" },
];

export const UTILIZATION = [
  { resource: "Battery Test Benches", util: 91, idle: "0.5 units", peak: "Weekdays 10–16h" },
  { resource: "Bio-Bench Suite A", util: 86, idle: "0.6 units", peak: "Mon–Wed" },
  { resource: "Demo Suites", util: 81, idle: "0.8 units", peak: "Tue/Thu afternoons" },
  { resource: "GPU Compute", util: 74, idle: "4 nodes", peak: "Nights (off-peak)" },
  { resource: "Prototyping Bay", util: 68, idle: "0.6 units", peak: "Fri–Sat" },
  { resource: "Drone Test Range", util: 44, idle: "0.6 units", peak: "Weekends" },
  { resource: "Cleanroom", util: 52, idle: "0.5 units", peak: "Tape-out windows" },
];

export const RESOURCE_PERFORMANCE = [
  { resource: "Bio-Bench Suite A", score: 96, bookings30: 41, revenue: "₹11.4 L", rating: 4.9, downtime: 0.8 },
  { resource: "Battery Test Benches", score: 94, bookings30: 22, revenue: "₹5.6 L", rating: 4.8, downtime: 1.2 },
  { resource: "GPU Compute", score: 92, bookings30: 56, revenue: "₹14.8 L", rating: 4.8, downtime: 0.4 },
  { resource: "Demo Suites", score: 88, bookings30: 63, revenue: "₹4.2 L", rating: 4.6, downtime: 0 },
  { resource: "Prototyping Bay", score: 84, bookings30: 16, revenue: "₹2.1 L", rating: 4.7, downtime: 2.1 },
  { resource: "Cleanroom", score: 79, bookings30: 8, revenue: "₹3.0 L", rating: 4.9, downtime: 0.6 },
  { resource: "Drone Test Range", score: 76, bookings30: 6, revenue: "₹2.6 L", rating: 4.9, downtime: 0 },
];

export const SERVICES = [
  { name: "Lab Manager Assist", schedule: "On-demand · 08:00–20:00", staff: "2 certified", quality: 4.9, active: 6 },
  { name: "Compliance & FTO Desk", schedule: "Tue / Thu bookings", staff: "IPR counsel + paralegal", quality: 4.9, active: 3 },
  { name: "Drone Safety Officer", schedule: "Included with range booking", staff: "DGCA-certified", quality: 5.0, active: 1 },
  { name: "Prototype Technician", schedule: "Half-day blocks", staff: "3 technicians", quality: 4.7, active: 2 },
];

export const FEEDBACK = [
  { startup: "CropLens AI", rating: 5, text: "Night GPU windows halved our training cost. Support actually answers at 2 AM.", date: "Mar 30", resource: "GPU Compute" },
  { startup: "NeuroNest", rating: 5, text: "Bench was trial-ready. Safety induction done in 20 minutes, not 2 days like elsewhere.", date: "Mar 28", resource: "Bio-Bench A" },
  { startup: "Zephyr Drones", rating: 5, text: "Only certified range that understood BVLOS paperwork. Safety officer is excellent.", date: "Mar 24", resource: "Drone Range" },
  { startup: "AquaMend", rating: 4, text: "Bench quality great; want Saturday half-slots added for battery tests.", date: "Mar 21", resource: "Battery Benches" },
  { startup: "GameVerse", rating: 3, text: "Boardroom AC died mid-pitch. Fixed in an hour but awkward with investors present.", date: "Mar 18", resource: "Demo Suites" },
];

/* ── Payments ──────────────────────────────────────────────── */
export const PAYMENT_SUMMARY = {
  totalEarnings: "₹48.6 L FY26",
  pending: "₹1.8 L",
  availableBalance: "₹9.4 L",
  monthRevenue: "₹4.2 L",
  refunds: "₹9,900 (4 this month)",
  failed: "₹4,200 (1 txn)",
};

export const TRANSACTIONS = [
  { id: "TXN-99241", from: "CropLens AI", for: "GPU Compute · BK-2211 deposit", amount: "+₹60,480", status: "Completed", date: "Today 10:12" },
  { id: "TXN-99238", from: "NeuroNest", for: "Bio-Bench day pass", amount: "+₹14,400", status: "Completed", date: "Today 08:36" },
  { id: "TXN-99235", from: "Zephyr Drones", for: "Drone Range 2-day", amount: "+₹28,000", status: "Completed", date: "Yesterday" },
  { id: "TXN-99230", from: "Qwron", for: "Cleanroom quote (deposit)", amount: "+₹9,500", status: "Pending", date: "Yesterday" },
  { id: "TXN-99227", from: "AquaMend", for: "Battery bench reschedule", amount: "-₹3,100", status: "Refunded", date: "Mar 27" },
  { id: "TXN-99219", from: "FleetFox", for: "GPU burst (declined card)", amount: "+₹4,200", status: "Failed", date: "Mar 26" },
];

export const EARNINGS_SERIES = [2.4, 2.8, 3.1, 2.9, 3.6, 3.8, 4.4, 4.1, 4.8, 4.2, 3.9, 4.2];

export const EARNINGS_BY_RESOURCE = [
  { resource: "GPU Compute", v: "₹14.8 L", pct: 100 },
  { resource: "Bio-Bench Labs", v: "₹11.4 L", pct: 77 },
  { resource: "Battery Benches", v: "₹5.6 L", pct: 38 },
  { resource: "Demo Suites", v: "₹4.2 L", pct: 28 },
  { resource: "Cleanroom", v: "₹3.0 L", pct: 20 },
  { resource: "Drone Range", v: "₹2.6 L", pct: 18 },
  { resource: "Expert services", v: "₹6.9 L", pct: 47 },
];

export const INVOICES = [
  { id: "INV-2026-0441", startup: "CropLens AI", amount: "₹60,480", due: "Apr 05", status: "Sent" },
  { id: "INV-2026-0438", startup: "NeuroNest", amount: "₹14,400", due: "Paid", status: "Paid" },
  { id: "INV-2026-0434", startup: "ReJoule Energy", amount: "₹31,000", due: "Apr 12", status: "Sent" },
  { id: "INV-2026-0429", startup: "PortFolio Labs", amount: "₹8,800", due: "Mar 28", status: "Overdue" },
  { id: "INV-2026-0421", startup: "SehatGrid", amount: "₹4,800", due: "Paid", status: "Paid" },
  { id: "INV-2026-0416", startup: "FleetFox", amount: "₹4,200", due: "—", status: "Cancelled" },
];

export const PAYOUTS = [
  { id: "PO-118", amount: "₹8.6 L", date: "Apr 01", status: "Completed", bank: "HDFC ····4821" },
  { id: "PO-119", amount: "₹9.4 L", date: "Apr 03 (scheduled)", status: "Scheduled", bank: "HDFC ····4821" },
  { id: "PO-117", amount: "₹7.9 L", date: "Mar 24", status: "Completed", bank: "HDFC ····4821" },
  { id: "PO-116", amount: "₹8.1 L", date: "Mar 17", status: "Completed", bank: "HDFC ····4821" },
];

/* ── Marketplace (demand side) ─────────────────────────────── */
export const DEMAND_RADAR = [
  { need: "BSL-2 wet benches", sector: "HealthTech · Bio", demand: "38 startups searching", budget: "₹1–4K/hr", trend: "+31% MoM" },
  { need: "GPU hours (A100-class)", sector: "AI · all sectors", demand: "61 searches this week", budget: "₹350–550/GPU-hr", trend: "+18% MoM" },
  { need: "Battery cyclers", sector: "Climate · Storage", demand: "17 startups", budget: "₹2–4K/day", trend: "+42% MoM" },
  { need: "Certified drone ranges", sector: "Logistics · Defence", demand: "11 startups", budget: "₹10–18K/day", trend: "+26% MoM" },
  { need: "Cleanroom days", sector: "DeepTech · Photonics", demand: "9 startups", budget: "₹8–12K/day", trend: "+14% MoM" },
];

export const PROVIDER_MATCHES = [
  { startup: "ReJoule Energy", overall: 94, dims: [{ label: "Need fit", v: 98 }, { label: "Budget", v: 88 }, { label: "Location", v: 96 }, { label: "Stage", v: 92 }], why: "Needs battery bench verification for Series A DD — you have 2 certified benches idle Thu–Fri.", action: "Propose Apr 03–04 slots" },
  { startup: "Qwron", overall: 89, dims: [{ label: "Need fit", v: 91 }, { label: "Budget", v: 82 }, { label: "Location", v: 94 }, { label: "Stage", v: 88 }], why: "Photonic tape-in needs ISO-7 cleanroom 3 days; your cleanroom is 52% utilized.", action: "Send package quote" },
  { startup: "AquaMend Robotics", overall: 84, dims: [{ label: "Need fit", v: 86 }, { label: "Budget", v: 78 }, { label: "Location", v: 90 }, { label: "Stage", v: 80 }], why: "Robotics field trials + battery tests — bundle prototyping bay with bench days for deal.", action: "Offer bundle" },
  { startup: "SoilSense Labs", overall: 78, dims: [{ label: "Need fit", v: 74 }, { label: "Budget", v: 84 }, { label: "Location", v: 72 }, { label: "Stage", v: 82 }], why: "Sensing hardware prototypes monthly; price-sensitive pre-seed — Starter Lab Pass fits.", action: "Recommend pass" },
];

export const PROVIDER_OPPORTUNITIES = [
  { kind: "Government", title: "State Innovation Mission — lab-access grant vendor panel", detail: "Guaranteed ₹40L resource vouchers/qtr for listed providers", match: 96, window: "Apply by Apr 20" },
  { kind: "Incubator", title: "Nexus Ventures — in-house bench partner", detail: "Anchor provider for 64-portfolio cohort", match: 92, window: "Rolling" },
  { kind: "Program", title: "Climate Foundry — battery testing corridor", detail: "29 climate startups routed weekly", match: 88, window: "Closes May 02" },
  { kind: "Corporate", title: "Pharma SME — overflow QC suite share", detail: "Offload idle bench hours weekday nights", match: 74, window: "Negotiable" },
];

/* ── Analytics ─────────────────────────────────────────────── */
export const PEAK_WEEK = [42, 58, 66, 61, 74, 38, 22];
export const TOP_CUSTOMERS = [
  { startup: "CropLens AI", spent: "₹2.9 L FY26", sessions: 18, trend: "+41%" },
  { startup: "NeuroNest", spent: "₹1.6 L", sessions: 11, trend: "+64%" },
  { startup: "Qwron", spent: "₹1.2 L", sessions: 8, trend: "+22%" },
  { startup: "PathPilot", spent: "₹98K", sessions: 9, trend: "plan-based" },
  { startup: "ReJoule Energy", spent: "₹86K", sessions: 6, trend: "+38%" },
];
