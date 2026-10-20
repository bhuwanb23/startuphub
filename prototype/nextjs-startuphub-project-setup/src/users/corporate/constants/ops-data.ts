/* Corporate ops dataset — organization, documents, calendar,
   messages, notifications, audit, settings, help. */

export const CORP_PROFILE = {
  name: "Arjuna Industries",
  descriptor: "Agri-sciences & food processing group",
  revenue: "₹9,400 Cr FY25",
  employees: "6,800",
  locations: "Hyderabad HQ · 9 plants · 340 collection points",
  since: "Corporate innovation office on StartupHub since Nov 2025",
  profile: "Public profile · verified enterprise",
  contact: { email: "innovation@arjuna.in", phone: "+91 · 40 · xxxx xxxx", web: "arjunaindustries.in" },
};

export const INDUSTRY_PROFILE = {
  segments: ["Agri procurement & grading", "Fresh & packaged foods", "Agri-inputs", "Cold-chain logistics"],
  domains: ["Quality & traceability", "Climate-resilient sourcing", "Cold-chain", "Packaging"],
  technologies: ["Computer vision", "Satellite MRV", "IoT cold telemetry", "Bio-materials", "Federated ML"],
  challenges: [
    "Post-harvest losses compress margins 2–3%",
    "Export compliance tightening rapidly (EU 2027)",
    "Supplier data absent below farm level",
  ],
  trends: [
    "Retail + export buyers demanding documented QC",
    "Carbon-linked sourcing becoming contractual",
    "Cold-chain electrification economics flipping",
  ],
  competitive: "Top-3 processors all launched startup-program offices by 2024",
  priorities: ["Traceable Harvest 2026", "Carbon-documented sourcing", "Sustainable export packaging"],
};

export const BUSINESS_UNITS = [
  { name: "AgriProcure", lead: "S. Reddy", budget: "₹1.1 Cr innovation", problems: 3, note: "Farm collection + grading" },
  { name: "FreshLine Foods", lead: "M. Kulkarni", budget: "₹1.4 Cr innovation", problems: 2, note: "Processing + export SKUs" },
  { name: "AgriInput Sciences", lead: "Dr. P. Nambiar", budget: "₹0.8 Cr innovation", problems: 2, note: "Supplier programs + inputs" },
  { name: "ColdNet Logistics", lead: "T. Iyer", budget: "₹0.9 Cr innovation", problems: 2, note: "Cold-chain fleet + stores" },
];

export const INNOVATION_TEAM = [
  { name: "Vikram Sethi", role: "Chief Innovation Officer", scope: "Strategy + council + board updates", i: "VS" },
  { name: "R. Agarwal", role: "Innovation Manager", scope: "Scouting, evaluation, pilot operations", i: "RA" },
  { name: "Dr. S. Iyer", role: "Technology Expert", scope: "Technical assessment + architecture review", i: "SI" },
  { name: "A. Bhatt", role: "Procurement Lead", scope: "Vendor packets, RFPs, purchase governance", i: "AB" },
  { name: "S. Menon", role: "Legal Counsel", scope: "MSAs, NDAs, IP clauses, risk review", i: "SM" },
];

export const CORP_DOCS = [
  { id: 1, file: "corporate_innovation_charter_2026.pdf", area: "Strategy", size: "1.8 MB", updated: "Jan 2026", ver: "v2" },
  { id: 2, file: "MSA_template_vendor_v5.docx", area: "Templates", size: "240 KB", updated: "Feb 2026", ver: "v5" },
  { id: 3, file: "pilot_kit_playbook.pdf", area: "Playbooks", size: "4.6 MB", updated: "Mar 2026", ver: "v7" },
  { id: 4, file: "NDA_mutual_standard.docx", area: "Templates", size: "96 KB", updated: "2026", ver: "v3" },
  { id: 5, file: "evaluation_rubric_corporate_v4.pdf", area: "Playbooks", size: "380 KB", updated: "Mar 12", ver: "v4" },
  { id: 6, file: "vendor_onboarding_packet.pdf", area: "Procurement", size: "860 KB", updated: "Feb 2026", ver: "v2" },
];

export const CORP_CALENDAR_DAYS: { day: number; events: ("pilot" | "contract" | "proc" | "meeting" | "review")[] }[] = [
  { day: 1, events: ["pilot"] }, { day: 2, events: [] }, { day: 3, events: ["proc"] },
  { day: 4, events: ["meeting"] }, { day: 5, events: ["pilot"] }, { day: 6, events: [] },
  { day: 7, events: ["contract"] }, { day: 8, events: ["meeting"] }, { day: 9, events: ["pilot"] },
  { day: 10, events: ["proc"] }, { day: 11, events: ["review"] }, { day: 12, events: [] },
  { day: 13, events: ["pilot"] }, { day: 14, events: ["meeting"] }, { day: 15, events: ["contract"] },
  { day: 16, events: ["pilot"] }, { day: 17, events: ["proc"] }, { day: 18, events: ["review"] },
  { day: 19, events: ["meeting"] }, { day: 20, events: [] }, { day: 21, events: ["pilot"] },
  { day: 22, events: ["proc"] }, { day: 23, events: ["meeting"] }, { day: 24, events: ["contract"] },
  { day: 25, events: ["review"] }, { day: 26, events: ["pilot"] }, { day: 27, events: [] },
  { day: 28, events: ["meeting"] }, { day: 29, events: ["contract"] }, { day: 30, events: ["pilot"] },
];

export const CORP_UPCOMING = [
  { date: "Apr 05", kind: "Meeting", text: "Terragrid quarterly partnership review" },
  { date: "Apr 08", kind: "Pilot", text: "QC stations — 6-point mid-pilot KPI review" },
  { date: "Apr 12", kind: "Proc", text: "RFP-026 award circulation for countersign" },
  { date: "Apr 15", kind: "Contract", text: "Terragrid renewal terms due back to legal" },
  { date: "Apr 22", kind: "Challenge", text: "Farm Gate Quality Challenge submissions close" },
];

export const CORP_THREADS = [
  { id: 1, name: "Anil — CropLens AI", group: "Startups", last: "Mid-pilot KPI pack uploaded — spoilage at 7.4%…", time: "1h", unread: 2 },
  { id: 2, name: "Kabir — Terragrid", group: "Startups", last: "Renewal counter on data freshness SLA attached.", time: "3h", unread: 1 },
  { id: 3, name: "Vertex ops desk", group: "Vendors", last: "Lab retainer quote v2 for your review.", time: "Yesterday", unread: 0 },
  { id: 4, name: "S. Reddy — AgriProcure", group: "Internal", last: "Phase 2 station request is in Purchase Requests.", time: "Yesterday", unread: 0 },
  { id: 5, name: "Mission ecosystem cell", group: "Government", last: "AgriChain winners connected — intro made.", time: "Mon", unread: 0 },
];

export const CORP_NOTIFICATIONS = [
  { id: 1, group: "Matches", text: "4 new AI matches — CropLens AI remains top at 94 for PS-014", time: "1h", unread: true },
  { id: 2, group: "Pilot", text: "QC stations KPI review due Apr 08 — mid-pilot pack ready", time: "2h", unread: true },
  { id: 3, group: "Contract", text: "Terragrid renewal counter received (data freshness SLA)", time: "4h", unread: true },
  { id: 4, group: "Procurement", text: "RFP-026 award — awaiting your countersign", time: "5h", unread: true },
  { id: 5, group: "Challenge", text: "Farm Gate Challenge crossed 96 submissions", time: "Yesterday", unread: false },
  { id: 6, group: "Watchlist", text: "AquaMend won Water Grid Challenge — relevant to water theme", time: "Yesterday", unread: false },
  { id: 7, group: "Performance", text: "Innovation ROI updated: 3.1× (+0.2 Q/Q)", time: "2d", unread: false },
  { id: 8, group: "System", text: "Q1 innovation board pack auto-assembled", time: "2d", unread: false },
];

export const CORP_AUDIT = [
  { actor: "V. Sethi", action: "approved partner track", object: "CropLens AI · PS-014", time: "Today · 10:12" },
  { actor: "R. Agarwal", action: "scored solution evaluation", object: "CropLens AI · 86/100", time: "Yesterday · 16:31" },
  { actor: "S. Menon", action: "countered clause", object: "CT-025-104 data freshness", time: "Yesterday · 14:02" },
  { actor: "A. Bhatt", action: "circulated award", object: "RFP-026 · countersign", time: "Mar 26 · 11:20" },
  { actor: "System", action: "flagged KPI milestone", object: "PL-021 · 6-point review", time: "Mar 25 · 09:00" },
  { actor: "Dr. S. Iyer", action: "approved tech assessment", object: "TRL 8 verified", time: "Mar 24 · 15:44" },
  { actor: "S. Reddy", action: "raised purchase request", object: "PR-0812 · Phase 2", time: "Mar 22 · 13:29" },
  { actor: "V. Sethi", action: "co-signed challenge", object: "CH-05 with State Mission", time: "Mar 18 · 12:06" },
];

export const CORP_SETTINGS = [
  {
    title: "Organization", desc: "Corporate identity and strategy",
    rows: [
      { label: "Organization", value: "Arjuna Industries" },
      { label: "Innovation strategy", value: "Traceable Harvest 2026" },
      { label: "Public profile", on: true },
    ],
  },
  {
    title: "Innovation preferences", desc: "Matching and evaluation defaults",
    rows: [
      { label: "Problem-first matching", on: true },
      { label: "Evaluation rubric", value: "Corporate v4 · 6 dimensions" },
      { label: "Challenge defaults", value: "Blind scoring · 5-criteria" },
    ],
  },
  {
    title: "Procurement rules", desc: "Approvals and vendor governance",
    rows: [
      { label: "Approval workflow", value: "BU Head → CPO (₹25L+) → CFO (₹75L+)" },
      { label: "Vendor requirements", value: "Insurance + MSA + security pack" },
      { label: "Startup fast-track lane", on: true },
    ],
  },
  {
    title: "Notifications", desc: "What reaches the innovation office",
    rows: [
      { label: "Match alerts", on: true },
      { label: "Pilot milestone alerts", on: true },
      { label: "Contract deadline alerts", on: true },
      { label: "Weekly scouting digest", on: false },
    ],
  },
];

export const CORP_HELP_GUIDES = [
  { title: "Innovation office quickstart", desc: "Problems → pilots → deployment in 120 days", mins: 8 },
  { title: "Writing problem statements", desc: "Business need, constraints, expected outcomes", mins: 5 },
  { title: "Running pilots that convert", desc: "KPIs, evaluation gates, deployment readiness", mins: 9 },
  { title: "Corporate evaluation rubric", desc: "How the 6-dimension score works", mins: 6 },
  { title: "Startup fast-track procurement", desc: "Vendor packets without the 90-day cycle", mins: 7 },
  { title: "Partnership governance", desc: "Quarterly reviews, scorecards, renewals", mins: 6 },
];

export const CORP_FAQ = [
  { q: "How visible is our scouting to startups?", a: "Your corporate profile and problem statements are public; evaluation progress is private. Startups see engagement only after you open a conversation." },
  { q: "Can a startup be both challenge winner and vendor?", a: "Yes — challenge outcomes fast-track into procurement with the fast-track lane, skipping re-verification for 12 months." },
  { q: "Who owns IP from a joint pilot?", a: "Default MSA template keeps background IP with the owner; foreground IP is negotiated case-by-case, and legal gates every agreement." },
  { q: "How does procurement fast-track work with existing ERP?", a: "Approved startup vendors sync into your ERP via the integration pack; purchase governance rules stay identical." },
];
