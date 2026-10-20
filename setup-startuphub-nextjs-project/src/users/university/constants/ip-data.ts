export const IP_STATS = [
  { label: "Patents filed", value: "148", delta: "+12", hint: "this FY" },
  { label: "Patents granted", value: "62", delta: "+7" },
  { label: "Pending applications", value: "71", hint: "14 in final stage" },
  { label: "Trademarks", value: "22" },
  { label: "Copyrights", value: "38" },
  { label: "Designs", value: "12" },
];

export type Patent = {
  id: string;
  title: string;
  inventors: string;
  dept: string;
  type: "Patent" | "Trademark" | "Copyright" | "Design";
  status: "Disclosure" | "Assessed" | "Filed" | "Published" | "Granted";
  filed: string;
  commercialization: "Unassigned" | "Showcase" | "Negotiation" | "Licensed" | "Spin-off";
};

export const PATENTS: Patent[] = [
  { id: "IN2024110", title: "Low-cost arsenic detection biosensor", inventors: "Mathew · Iyer", dept: "Biotechnology", type: "Patent", status: "Filed", filed: "Jan 2026", commercialization: "Negotiation" },
  { id: "IN2021162", title: "Membrane distillation brine recovery unit", inventors: "D'Souza · Bose", dept: "Agri & Env Science", type: "Patent", status: "Granted", filed: "Mar 2024", commercialization: "Licensed" },
  { id: "IN2022089", title: "Bidirectional EV charging topology", inventors: "Naidu", dept: "Electrical Eng", type: "Patent", status: "Granted", filed: "Jun 2024", commercialization: "Licensed" },
  { id: "IN2024147", title: "Edge inference compression for pest vision", inventors: "Acharya · Rao", dept: "Computer Science", type: "Patent", status: "Published", filed: "Feb 2026", commercialization: "Spin-off" },
  { id: "IN2024131", title: "Solid-state electrolyte composite", inventors: "Sheikh · Verma", dept: "Materials Science", type: "Patent", status: "Assessed", filed: "—", commercialization: "Showcase" },
  { id: "TM2025091", title: "RootStack brand & logotype", inventors: "TTO · RootStack", dept: "TTO", type: "Trademark", status: "Filed", filed: "Dec 2025", commercialization: "Spin-off" },
  { id: "IN2024077", title: "Federated clinical training protocol", inventors: "Kulkarni", dept: "Computer Science", type: "Patent", status: "Disclosure", filed: "—", commercialization: "Unassigned" },
];

export const PATENT_STATUS_TONE: Record<Patent["status"], string> = {
  Disclosure: "bg-slate-100 text-slate-600",
  Assessed: "bg-amber-50 text-amber-700",
  Filed: "bg-accent-soft text-accent-deep",
  Published: "bg-sky-50 text-sky-700",
  Granted: "bg-emerald-50 text-emerald-700",
};

export const COMM_TONE: Record<Patent["commercialization"], string> = {
  Unassigned: "border-line bg-soft text-slate-500",
  Showcase: "border-line bg-white text-slate-600",
  Negotiation: "border-amber-200 bg-amber-50 text-amber-700",
  Licensed: "border-emerald-200 bg-emerald-50 text-emerald-700",
  "Spin-off": "border-accent-200 bg-accent-soft text-accent-deep",
};

export const IP_FLOW = [
  { stage: "Disclosures", count: 34 },
  { stage: "Assessed", count: 21 },
  { stage: "Filed", count: 18 },
  { stage: "Granted", count: 9 },
] as const;

/* ---------------- Licensing ---------------- */

export const LICENSING_STATS = [
  { label: "Active licenses", value: "14", delta: "+4", hint: "this year" },
  { label: "In negotiation", value: "5", hint: "2 term sheets out" },
  { label: "Royalty revenue FY", value: "₹2.4 Cr", delta: "+31%" },
  { label: "Open enquiries", value: "9", hint: "3 this week" },
];

export const AVAILABLE_IP = [
  { tech: "Arsenic biosensor kit", field: "Water quality", trl: "TRL 7", ask: "₹30L + 4% royalty" },
  { tech: "Edge pest-vision model", field: "AgriTech", trl: "TRL 6", ask: "₹18L + equity option" },
  { tech: "SSB electrolyte process", field: "Energy storage", trl: "TRL 5", ask: "Co-development" },
];

export const LICENSE_REQUESTS = [
  { org: "AquaPure Industries", tech: "Arsenic biosensor", type: "Exclusive · India", status: "Negotiation" },
  { org: "AgriSense AI", tech: "Pest-vision model", type: "Non-exclusive", status: "Term sheet sent" },
  { org: "NorthGrid Power", tech: "EV charging topology", type: "Field-limited", status: "Due diligence" },
  { org: "MediRay Devices", tech: "Biosensor cartridge", type: "Evaluation", status: "NDA signed" },
];

export const ACTIVE_LICENSES = [
  { licensee: "AquaPure Industries", tech: "Membrane distillation unit", type: "Exclusive", royalty: "₹48L + 3.5%", renewal: "Mar 2027" },
  { licensee: "VoltEdge Energy", tech: "Thermal imaging algorithm", type: "Non-exclusive", royalty: "₹22L + 2%", renewal: "Feb 2027" },
  { licensee: "RootStack (spin-off)", tech: "Soil micro-biome kit", type: "Equity-based", royalty: "8% equity", renewal: "Perpetual" },
  { licensee: "Terraforma Corp", tech: "Nanocoating formulation", type: "Exclusive · EU", royalty: "€60K + 4%", renewal: "Nov 2026" },
];

/* ---------------- Technology transfer ---------------- */

export type TransferDeal = { tech: string; trl: string; partner: string; value: string };
export type TransferColumn = { stage: string; deals: TransferDeal[] };

export const TRANSFER_PIPELINE: TransferColumn[] = [
  {
    stage: "Assessment",
    deals: [
      { tech: "Federated clinical protocol", trl: "TRL 4", partner: "Targeting hospitals", value: "TBD" },
      { tech: "SSB electrolyte process", trl: "TRL 5", partner: "—", value: "Co-dev" },
    ],
  },
  {
    stage: "Matched",
    deals: [
      { tech: "Arsenic biosensor kit", trl: "TRL 7", partner: "AquaPure Industries", value: "₹30L+" },
      { tech: "Pest-vision model", trl: "TRL 6", partner: "AgriSense AI", value: "₹18L+" },
      { tech: "Nanocoating formulation", trl: "TRL 6", partner: "Terraforma Corp", value: "€60K+" },
    ],
  },
  {
    stage: "Negotiation",
    deals: [
      { tech: "EV charging topology", trl: "TRL 7", partner: "NorthGrid Power", value: "₹35L" },
      { tech: "Biosensor cartridge", trl: "TRL 6", partner: "MediRay Devices", value: "TBD" },
    ],
  },
  {
    stage: "Handover",
    deals: [{ tech: "Brine recovery unit", trl: "TRL 8", partner: "AquaPure Industries", value: "₹48L closed" }],
  },
];

export const TRANSFER_STATS = [
  { label: "Transfers this FY", value: "11", delta: "+4" },
  { label: "Transfer value", value: "₹3.1 Cr", delta: "+26%" },
  { label: "Avg cycle time", value: "5.2 mo", delta: "-1.1 mo" },
];
