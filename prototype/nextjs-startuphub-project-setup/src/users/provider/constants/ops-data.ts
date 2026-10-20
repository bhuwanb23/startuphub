/* Provider ops dataset — profile, organization, availability,
   documents, messages, notifications, audit, settings, help. */

export const PROVIDER_PROFILE = {
  name: "Vertex Labs & Compute",
  type: "Shared Infrastructure & Services Provider",
  served: "HealthTech · Climate · DeepTech · AI · Logistics",
  locations: "Hyderabad (HQ) · Shamshabad range · Cloud regions",
  since: "On StartupHub since Aug 2025 · Verified",
  bio: "NABL-aligned shared R&D infrastructure and A100-class compute for early-stage startups. 24 resource units across lab, facility, equipment, workspace and expert-service categories.",
  contact: { email: "ops@vertexlabs.in", phone: "+91 · 40 · xxxx xxxx", web: "vertexlabs.in" },
  rating: 4.8,
  reviews: 214,
};

export const ORG_DETAILS = {
  registered: "Vertex Infrastructure Pvt. Ltd. · CIN U74999TG2021PTC14xxxx",
  gst: "GSTIN 36AABCVxxxx1Z5",
  certifications: ["NABL-aligned SOPs (labs)", "ISO 9001:2015 facility", "DGCA-certified range partner", "MeghRaj empanelled compute"],
  compliance: ["BSL-2 compliance certificate", "Public liability insurance ₹5 Cr", "Fire NOC (all facilities)", "Annual safety audit — passed Feb 2026"],
  sites: [
    { name: "Gachibowli Campus", size: "18,000 sq ft", note: "Labs + benches + cleanroom" },
    { name: "Madhapur Prototyping", size: "6,500 sq ft", note: "CNC, 3D print, laser" },
    { name: "Hitech City Suites", size: "4 suites", note: "Demo & boardrooms" },
    { name: "Shamshabad Range", size: "12 acres", note: "Certified drone test range" },
  ],
};

export const TEAM_STAFF = [
  { name: "Karan Malhotra", role: "Head of Operations", scope: "All facilities · pricing · partnerships", i: "KM" },
  { name: "Divya Rao", role: "Lab Manager", scope: "Bio-Bench + cleanroom + safety", i: "DR" },
  { name: "Arif Sheikh", role: "Compute Lead", scope: "GPU cluster + SLAs + monitoring", i: "AS" },
  { name: "Meena Pillai", role: "Bookings & Billing", scope: "Requests · invoicing · payouts", i: "MP" },
  { name: "R. Chandran", role: "Range Safety Officer", scope: "Drone range · certifications", i: "RC" },
];

export const PROVIDER_AVAILABILITY = {
  hours: "Mon–Sat · 08:00 – 20:00 IST",
  compute: "GPU cluster: 24×7 (auto-provisioned)",
  holidays: ["Apr 14 — facility maintenance", "May 01 — public holiday"],
  blocked: ["Apr 03 — battery bench recalibration", "Every Sunday — demo suites closed"],
  sla: "Live-session support < 10 min response",
};

export const PROVIDER_DOCS = [
  { id: 1, file: "BSL-2 compliance certificate.pdf", area: "Certifications", size: "480 KB", updated: "Feb 2026", ver: "2026" },
  { id: 2, file: "SOP_handbook_v9.pdf", area: "SOPs", size: "3.4 MB", updated: "Mar 10", ver: "v9" },
  { id: 3, file: "public_liability_insurance.pdf", area: "Compliance", size: "290 KB", updated: "2026", ver: "active" },
  { id: 4, file: "master_services_agreement.docx", area: "Agreements", size: "180 KB", updated: "Jan 2026", ver: "v5" },
  { id: 5, file: "startup_onboarding_deck.pdf", area: "Templates", size: "2.1 MB", updated: "Mar 01", ver: "v3" },
  { id: 6, file: "safety_audit_feb2026.pdf", area: "Compliance", size: "1.6 MB", updated: "Feb 2026", ver: "final" },
];

export const PROVIDER_THREADS = [
  { id: 1, name: "Farah — NeuroNest", group: "Startups", last: "Bench is perfect. Sending trial batch list tonight.", time: "1h", unread: 2 },
  { id: 2, name: "Nikhil — ReJoule Energy", group: "Startups", last: "Can you block bench 2 for Apr 03–04? DD bench test.", time: "3h", unread: 1 },
  { id: 3, name: "Nexus nodal — incubator", group: "Incubators", last: "Cohort V wants a shared lab pass quote.", time: "Yesterday", unread: 0 },
  { id: 4, name: "Mission resources cell", group: "Government", last: "Vendor panel docs verified — contract countersigned.", time: "Yesterday", unread: 0 },
  { id: 5, name: "Meena Pillai", group: "Internal", last: "PO-119 payout queued for Apr 03.", time: "Mon", unread: 0 },
];

export const PROVIDER_NOTIFICATIONS = [
  { id: 1, group: "Requests", text: "New request REQ-1041 — NeuroNest wants Bio-Bench Apr 06–10", time: "12m", unread: true },
  { id: 2, group: "Requests", text: "Qwron countered your cleanroom quote (3 days)", time: "1h", unread: true },
  { id: 3, group: "Matches", text: "4 new AI matches above 80 — ReJoule Energy at 94", time: "2h", unread: true },
  { id: 4, group: "Payments", text: "INV-2026-0429 is 4 days overdue — nudge ready", time: "3h", unread: true },
  { id: 5, group: "Availability", text: "Battery benches recalibration Fri — 3 bookings auto-notified", time: "5h", unread: false },
  { id: 6, group: "Usage", text: "GPU cluster hit 91% peak last night — consider adding nodes", time: "Yesterday", unread: false },
  { id: 7, group: "Reviews", text: "New 5-star review from Zephyr Drones", time: "Yesterday", unread: false },
  { id: 8, group: "System", text: "Payout PO-119 scheduled for Apr 03", time: "2d", unread: false },
];

export const PROVIDER_AUDIT = [
  { actor: "K. Malhotra", action: "approved request", object: "REQ-1038 · CropLens GPU", time: "Today · 09:41" },
  { actor: "D. Rao", action: "allocated", object: "Bench 3 → NeuroNest", time: "Today · 08:30" },
  { actor: "M. Pillai", action: "issued invoice", object: "INV-2026-0441 · ₹60,480", time: "Yesterday · 17:22" },
  { actor: "System", action: "flagged maintenance", object: "Battery benches · Fri", time: "Yesterday · 09:00" },
  { actor: "A. Sheikh", action: "expanded node pool", object: "GPU nodes 15–16 online", time: "Mar 27 · 13:14" },
  { actor: "K. Malhotra", action: "published listing", object: "Drone Range seasonal pricing", time: "Mar 24 · 11:08" },
  { actor: "R. Chandran", action: "certified range slot", object: "Zephyr BVLOS series", time: "Mar 22 · 15:47" },
  { actor: "System", action: "processed payout", object: "PO-118 · ₹8.6 L", time: "Apr 01 · 06:00" },
];

export const PROVIDER_SETTINGS = [
  {
    title: "Account", desc: "Personal information and security",
    rows: [
      { label: "Name", value: "Karan Malhotra" },
      { label: "Email", value: "ops@vertexlabs.in" },
      { label: "Two-factor authentication", on: true },
    ],
  },
  {
    title: "Provider", desc: "Public identity and verification",
    rows: [
      { label: "Public profile", on: true },
      { label: "Listed in marketplace", on: true },
      { label: "Verification", value: "Verified since Aug 2025" },
    ],
  },
  {
    title: "Resource defaults", desc: "Applied to new listings",
    rows: [
      { label: "Booking window", value: "Min 2h slots · 48h advance" },
      { label: "Cancellation policy", value: "Free until 24h before" },
      { label: "Auto-approve repeat customers", on: true },
    ],
  },
  {
    title: "Payments", desc: "Earnings and payouts",
    rows: [
      { label: "Payout schedule", value: "Weekly · Thursdays" },
      { label: "Bank account", value: "HDFC ····4821" },
      { label: "GST invoices", on: true },
    ],
  },
  {
    title: "Notifications", desc: "Operational alerts",
    rows: [
      { label: "New request alerts", on: true },
      { label: "Booking reminders", on: true },
      { label: "Utilization digests", on: true },
      { label: "Review alerts", on: false },
    ],
  },
];

export const PROVIDER_HELP_GUIDES = [
  { title: "Provider quickstart", desc: "Profile → first listing → first booking in a day", mins: 6 },
  { title: "Pricing & packages that convert", desc: "Startup-tier pricing without margin bleed", mins: 7 },
  { title: "Allocation vs. booking", desc: "When to use which, and how expiry works", mins: 4 },
  { title: "Vendor panels & programs", desc: "Getting onto government and incubator rosters", mins: 8 },
  { title: "Handling disputes", desc: "Cancellations, refunds and damage claims", mins: 5 },
  { title: "Reading utilization analytics", desc: "Turn idle hours into packaged revenue", mins: 6 },
];

export const PROVIDER_FAQ = [
  { q: "Who can see my resources?", a: "Only verified startups, incubators and program officers. Pricing tiers for incubated startups are visible only to eligible accounts — the public listing shows standard rates." },
  { q: "When do I get paid?", a: "Completed sessions settle T+1 into available balance; weekly payouts every Thursday. Government voucher sessions settle with the mission's monthly billing run." },
  { q: "What if a startup damages equipment?", a: "Bookings include a damage matrix per category. File within 48h with photos from the session log; payout holds apply to the responsible party pending review." },
  { q: "Can I offer free hours to a special case?", a: "Yes — comp hours are a first-class feature. They appear as sponsored usage in analytics and don't affect your utilization-based ranking." },
];
