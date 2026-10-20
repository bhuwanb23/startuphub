import type { TimelineEvent } from "../components/shared/directory";

/* --------------------------------- payments -------------------------------- */

export type TxnRow = {
  id: number;
  txn: string;
  customer: string;
  org: string;
  kind: string;
  method: string;
  amount: string;
  amountNum: number;
  status: string;
  date: string;
  gateway: string;
  timeline: TimelineEvent[];
};

export const TRANSACTIONS: TxnRow[] = [
  { id: 1, txn: "txn_90210", customer: "Ravi Sharma", org: "Lumen AI", kind: "Subscription · Scale", method: "UPI", amount: "₹24,000", amountNum: 24000, status: "Paid", date: "Apr 13, 18:42", gateway: "gw_7f2c9a", timeline: [{ when: "Apr 13, 18:42", actor: "Gateway webhook", action: "Payment confirmed → invoice INV-10293 issued" }] },
  { id: 2, txn: "txn_90211", customer: "S. Bhandari", org: "OrbitX Incubator", kind: "Subscription · Pro", method: "Card", amount: "₹8,500", amountNum: 8500, status: "Failed", date: "Apr 13, 17:05", gateway: "gw_8a1d3e", timeline: [{ when: "Apr 13, 17:05", actor: "Gateway webhook", action: "Declined — insufficient funds · retry scheduled T+2d" }] },
  { id: 3, txn: "txn_90208", customer: "Meera Krishnan", org: "Apex University", kind: "Enterprise annual", method: "NEFT", amount: "₹1,20,000", amountNum: 120000, status: "Paid", date: "Apr 13, 11:20", gateway: "recon_manual_note", timeline: [{ when: "Apr 13, 13:02", actor: "M. Qureshi (Finance)", action: "Manual reconciliation completed against NEFT UTR" }] },
  { id: 4, txn: "txn_90197", customer: "K. Reddy", org: "Vantara Robotics", kind: "Program fee · Frontier VII", method: "Card", amount: "₹15,000", amountNum: 15000, status: "Refund pending", date: "Apr 12, 16:44", gateway: "gw_4c8b21", timeline: [{ when: "Apr 13, 09:10", actor: "Vantara (customer)", action: "Refund requested", note: "Withdrew before cohort start — policy: full refund T-7d" }] },
  { id: 5, txn: "txn_90188", customer: "D. Majumdar", org: "Quantum Angels", kind: "Subscription · Fund", method: "Card", amount: "₹48,000", amountNum: 48000, status: "Chargeback", date: "Apr 10, 09:12", gateway: "gw_1e77f9", timeline: [{ when: "Apr 11, 08:00", actor: "Gateway", action: "Chargeback opened — evidence due Apr 25" }] },
  { id: 6, txn: "txn_90172", customer: "Lakshmi Menon", org: "AgroFields Labs", kind: "Settlement payout", method: "IMPS", amount: "₹62,400", amountNum: 62400, status: "Settled", date: "Apr 09, 15:30", gateway: "payout_8841", timeline: [{ when: "Apr 09, 15:44", actor: "Bank", action: "IMPS settled · UTR 22044022" }] },
  { id: 7, txn: "txn_90164", customer: "Sanjay Kapoor", org: "QuickFin Services", kind: "Subscription · Trial→Paid", method: "Card", amount: "₹4,200", amountNum: 4200, status: "Pending", date: "Apr 14, 08:20", gateway: "gw_pending_3m", timeline: [{ when: "Apr 14, 08:20", actor: "Gateway", action: "Awaiting 3DS confirmation — 12m elapsed" }] },
  { id: 8, txn: "txn_90140", customer: "A. Pillai", org: "BioCore Facility", kind: "Settlement payout", method: "IMPS", amount: "₹1,12,800", amountNum: 112800, status: "Failed", date: "Apr 08, 10:05", gateway: "payout_8802", timeline: [{ when: "Apr 08, 10:32", actor: "Bank", action: "Payout failed — beneficiary account unverified" }] },
];

export const REFUNDS = [
  { id: "RF-2291", txn: "txn_90197", customer: "Vantara Robotics", amount: "₹15,000", reason: "Withdrew T-7d (policy: full)", deadline: "Today", status: "Awaiting approval" },
  { id: "RF-2290", txn: "txn_89941", customer: "FarmLedger", amount: "₹3,600", reason: "Duplicate charge (verified)", deadline: "Tomorrow", status: "Awaiting approval" },
  { id: "RF-2287", txn: "txn_89872", customer: "Nest Program LLP", amount: "₹8,500", reason: "Service outage claim — under review", deadline: "Apr 18", status: "Evidence requested" },
];

export const RECON_EXCEPTIONS = [
  { id: 1, what: "NEFT credit ₹1,20,000 without reference", holder: "Apex (probable)", age: "2d" },
  { id: 2, what: "Gateway fee mismatch on 14 txns", holder: "₹842 total", age: "1d" },
  { id: 3, what: "Payout 8802 bounced — funds returning", holder: "BioCore Facility", age: "6d" },
];

/* ------------------------------- subscriptions ------------------------------ */

export type PlanRow = {
  id: number;
  name: string;
  price: string;
  interval: string;
  seats: string;
  features: string[];
  status: string;
  version: string;
  subscribers: number;
};

export const PLANS: PlanRow[] = [
  { id: 1, name: "Free", price: "₹0", interval: "forever", seats: "3 seats", features: ["Directory listing", "1 program application /mo", "Community events"], status: "Published", version: "v6", subscribers: 61204 },
  { id: 2, name: "Pro", price: "₹999/mo", interval: "monthly", seats: "10 seats", features: ["Priority matching", "Unlimited applications", "Resource credits marketplace", "Basic analytics"], status: "Published", version: "v9", subscribers: 14862 },
  { id: 3, name: "Scale", price: "₹2,499/mo", interval: "monthly", seats: "30 seats", features: ["Everything in Pro", "Deal-room access", "Advanced analytics + exports", "Dedicated success manager"], status: "Published", version: "v7", subscribers: 5840 },
  { id: 4, name: "Enterprise / Institutional", price: "Custom", interval: "annual", seats: "Unlimited", features: ["SSO + SCIM", "Custom data residency", "SLA 99.9%", "Institute-wide reporting"], status: "Published", version: "v4", subscribers: 212 },
  { id: 5, name: "Pro (legacy 2024)", price: "₹699/mo", interval: "monthly", seats: "5 seats", features: ["Legacy — grandfathered pricing"], status: "Deprecated", version: "v3", subscribers: 884 },
];

export type SubRow = {
  id: number;
  org: string;
  plan: string;
  seats: string;
  mrr: string;
  status: string;
  renewal: string;
  timeline: TimelineEvent[];
};

export const SUBSCRIPTIONS: SubRow[] = [
  { id: 1, org: "Lumen AI", plan: "Scale", seats: "9/30", mrr: "₹2,499", status: "Active", renewal: "May 13", timeline: [] },
  { id: 2, org: "OrbitX Incubator", plan: "Pro", seats: "6/10", mrr: "₹999", status: "Past due", renewal: "Retry T+2d", timeline: [{ when: "Apr 13", actor: "System", action: "Renewal failed — grace period started (5d)" }] },
  { id: 3, org: "Apex University", plan: "Enterprise", seats: "88/unlimited", mrr: "₹10,000", status: "Active", renewal: "Mar 2027", timeline: [{ when: "Yesterday", actor: "M. Qureshi (Finance)", action: "Entitlement override — 60d reporting grace", note: "Public institution under MoU" }] },
  { id: 4, org: "Vantara Robotics", plan: "Scale", seats: "12/30", mrr: "₹2,499", status: "Active", renewal: "Apr 28", timeline: [] },
  { id: 5, org: "QuickFin Services", plan: "Pro", seats: "3/10", mrr: "₹0 (trial)", status: "Trialing", renewal: "Trial ends Apr 21", timeline: [] },
  { id: 6, org: "Zenith Traders", plan: "Pro", seats: "2/10", mrr: "₹999", status: "Suspended", renewal: "—", timeline: [{ when: "1h ago", actor: "You (Super Admin)", action: "Subscription suspended with account" }] },
  { id: 7, org: "OldCo Textiles", plan: "Pro (legacy)", seats: "1/5", mrr: "₹699", status: "Cancelled", renewal: "Ended Mar 30", timeline: [{ when: "Mar 30", actor: "System", action: "Subscription ended — data retained per policy" }] },
  { id: 8, org: "FiberForge", plan: "Pro", seats: "5/10", mrr: "₹999", status: "Active", renewal: "Apr 30", timeline: [] },
  { id: 9, org: "Harbour Hub", plan: "Scale", seats: "8/30", mrr: "₹2,499", status: "Active", renewal: "May 02", timeline: [] },
];
