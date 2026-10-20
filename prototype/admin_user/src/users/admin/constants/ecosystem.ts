import type { TimelineEvent } from "../components/shared/directory";

/* ---------------------------------- types ---------------------------------- */

export type EntityRow = {
  id: number;
  name: string;
  owner: string;
  category: string;
  region: string;
  status: string;
  joined: string;
  metric: { label: string; value: string };
  linked: string[];
  flags: string[];
  timeline: TimelineEvent[];
};

export type EntityConfig = {
  slug: string;
  title: string;
  singular: string;
  plural: string;
  description: string;
  categoryLabel: string;
  kpis: { label: string; value: string }[];
  rows: EntityRow[];
};

/* --------------------------------- helpers --------------------------------- */

const row = (
  id: number, name: string, owner: string, category: string, region: string,
  status: string, joined: string, metricLabel: string, metricValue: string,
  linked: string[] = [], flags: string[] = [], timeline: TimelineEvent[] = [],
): EntityRow => ({
  id, name, owner, category, region, status, joined,
  metric: { label: metricLabel, value: metricValue },
  linked, flags, timeline,
});

const verified = (when: string): TimelineEvent[] => [
  { when, actor: "S. Iyer (Verification)", action: "Profile verification approved" },
];

/* ---------------------------------- data ----------------------------------- */

export const ENTITIES: EntityConfig[] = [
  {
    slug: "startups", title: "Startup Management", singular: "Startup", plural: "startups",
    description: "Startup records, verification, participation and platform compliance. Admin oversees the record — material changes stay attributable and auditable.",
    categoryLabel: "Industry",
    kpis: [
      { label: "Total startups", value: "12,214" },
      { label: "Verified", value: "10,214" },
      { label: "Pending verification", value: "312" },
      { label: "Restricted / suspended", value: "86" },
    ],
    rows: [
      row(1, "Vantara Robotics", "K. Reddy (Founder)", "AI · AgriRobotics", "Bengaluru", "Verified", "Aug 2024", "Traction", "$4.2M raised", ["Northbridge (investor)", "Frontier VII", "3 mentors"], [], verified("Sep 2024")),
      row(2, "MediQueue", "Ananya Rao (Founder)", "HealthTech", "Hyderabad", "Verified", "Jan 2025", "Scale", "120 hospitals live", ["2 programs", "1 pilot"], [], verified("Jan 2025")),
      row(3, "QuickFin Services", "Sanjay Kapoor", "FinTech", "Mumbai", "Pending", "Apr 2026", "Stage", "Pre-seed", [], ["Duplicate org possible match", "Email domain 7d old"]),
      row(4, "Zenith Traders", "Arjun Mehta", "B2B Trading", "Delhi NCR", "Suspended", "Feb 2026", "Flags", "3 open", ["Flagged org ZO-2291"], ["Fraud case RF-1182", "Founder suspended"], [{ when: "1h ago", actor: "You (Super Admin)", action: "Startup suspended", note: "Linked to fraud case RF-1182" }]),
      row(5, "GridSense", "Sara Mathew (CEO)", "Climate · Energy", "Pune", "Verified", "May 2025", "Traction", "31% grid loss cut", ["Nexus Angels", "Climate Compute cohort"], [], verified("May 2025")),
      row(6, "OldCo Textiles", "R. Mehta", "Manufacturing", "Surat", "Inactive", "Nov 2024", "Last activity", "9 months ago", [], ["Inactive > 6 months"]),
    ],
  },
  {
    slug: "incubators", title: "Incubator Management", singular: "Incubator", plural: "incubators",
    description: "Incubator organizations — verification, program portfolio, cohort performance, complaints and interventions.",
    categoryLabel: "Focus",
    kpis: [
      { label: "Total incubators", value: "486" },
      { label: "Verified", value: "452" },
      { label: "Active cohorts", value: "118" },
      { label: "Under review", value: "7" },
    ],
    rows: [
      row(1, "Catalyst Labs", "Nikhil Rao", "DeepTech · AI", "Hyderabad", "Verified", "Oct 2023", "Portfolio", "142 startups", ["7 programs", "86 mentors"], [], verified("Nov 2023")),
      row(2, "Apex University TBI", "Meera Krishnan", "University spin-offs", "Chennai", "Verified", "Oct 2023", "Portfolio", "38 startups", ["Tech transfer", "6 spin-offs"], [], verified("Oct 2023")),
      row(3, "Nest Program LLP", "K. Thomas", "Consumer · D2C", "Kochi", "Pending", "Mar 2026", "Programs", "1 draft", [], ["Legal name mismatch on PAN"]),
      row(4, "Harbour Hub", "D. Patel", "Climate · Oceans", "Visakhapatnam", "Verified", "Jun 2024", "Portfolio", "24 startups", ["2 programs"], [], verified("Jun 2024")),
      row(5, "OrbitX Incubator", "S. Bhandari", "SpaceTech", "Bengaluru", "Suspended", "May 2024", "Flags", "2 complaints", [], ["Program fund complaint under review"], [{ when: "Mar 28", actor: "R. Dev (Ops)", action: "Incubator suspended", note: "Pending fund utilization audit" }]),
      row(6, "AgriNest", "P. Singh", "AgriTech", "Ludhiana", "Warning", "Jul 2024", "Outcome rate", "41% (low)", [], ["Two low-outcome cohorts"]),
    ],
  },
  {
    slug: "mentors", title: "Mentor Management", singular: "Mentor", plural: "mentors",
    description: "Mentor expertise, availability, verification, assignments, feedback quality and disciplinary review.",
    categoryLabel: "Expertise",
    kpis: [
      { label: "Total mentors", value: "2,843" },
      { label: "Verified", value: "2,406" },
      { label: "Sessions (30d)", value: "6,240" },
      { label: "Complaints open", value: "4" },
    ],
    rows: [
      row(1, "Priya Nair", "Independent", "GTM · SaaS", "Kochi", "Verified", "Nov 2025", "Rating", "4.9 (212 sessions)", ["12 startups"], [], verified("Nov 2025")),
      row(2, "Vikram Anand", "Ex-CPO, FinEdge", "Product · FinTech", "Mumbai", "Verified", "Sep 2025", "Rating", "4.8 (168 sessions)", ["8 startups"], [], [
        { when: "Mar 2026", actor: "System", action: "Conflict-of-interest declaration filed" },
        ...verified("Sep 2025"),
      ]),
      row(3, "T. Srinivasan", "Independent", "AgriTech hardware", "Coimbatore", "Pending", "Apr 2026", "Experience", "14 yrs", [], ["Credential proof pending"]),
      row(4, "Ritu Kapoor", "VP Eng, Cloudly", "Infra · DevOps", "Delhi NCR", "Verified", "Dec 2025", "Rating", "4.7 (96 sessions)", ["5 startups"], [], verified("Dec 2025")),
      row(5, "M. Farhan", "Independent", "Fundraising", "Hyderabad", "Restricted", "Oct 2025", "Flags", "1 quality review", [], ["Two no-show complaints"], [{ when: "Apr 02", actor: "K. Bose (Ops)", action: "Mentor restricted", note: "Paused pending quality review" }]),
      row(6, "Elena D'Souza", "Angel investor", "Climate · Energy", "Goa", "Verified", "Aug 2025", "Rating", "5.0 (64 sessions)", ["6 startups"], [], verified("Aug 2025")),
    ],
  },
  {
    slug: "investors", title: "Investor Management", singular: "Investor", plural: "investors",
    description: "Investor and fund profiles, thesis, verification, deal-flow activity and risk review. Deal rooms stay restricted to authorized users.",
    categoryLabel: "Type",
    kpis: [
      { label: "Active investors", value: "1,462" },
      { label: "Verified", value: "1,204" },
      { label: "Matches (30d)", value: "2,108" },
      { label: "Flags open", value: "6" },
    ],
    rows: [
      row(1, "Northbridge Capital", "Aditya Rao (Partner)", "VC · Seed–A", "Mumbai", "Verified", "Dec 2025", "Deployed", "₹86 Cr / ₹180 Cr", ["12 portfolio", "24 active deals"], [], verified("Dec 2025")),
      row(2, "Nexus Angels", "R. Ranganathan", "Angel network", "Bengaluru", "Verified", "Feb 2025", "Checks", "₹25L–₹2Cr", ["86 members"], [], verified("Feb 2025")),
      row(3, "Meridian Ventures", "S. Kapoor", "VC · Series A+", "Delhi NCR", "Verified", "Nov 2024", "Fund", "$140M", ["9 portfolio"], [], verified("Nov 2024")),
      row(4, "Sethi Family Office", "Vikram Sethi", "Family office", "Delhi NCR", "Pending", "Mar 2026", "Checks", "Undisclosed", [], ["Owner account locked (security)"]),
      row(5, "Quantum Angels", "D. Majumdar", "Angel network", "Kolkata", "Verified", "Jan 2026", "Deployed", "₹12 Cr YTD", ["41 members"], [], verified("Jan 2026")),
      row(6, "Offshore Spark Ltd", "Unknown", "Foreign entity", "Undisclosed", "Suspended", "Mar 2026", "Flags", "KYC incomplete", [], ["AML check failed twice"], [{ when: "Mar 30", actor: "You (Super Admin)", action: "Investor suspended", note: "KYC could not be completed" }]),
    ],
  },
  {
    slug: "ipr-experts", title: "IPR Expert Management", singular: "IPR Expert", plural: "IPR experts",
    description: "Legal and IPR professionals — credentials, jurisdictions, assignments, service quality and renewals.",
    categoryLabel: "Specialization",
    kpis: [
      { label: "Total experts", value: "1,904" },
      { label: "Verified", value: "1,622" },
      { label: "Active filings", value: "3,412" },
      { label: "Disciplinary open", value: "2" },
    ],
    rows: [
      row(1, "Deepa Venkat", "IP Law Partners", "Patents · DeepTech", "Bengaluru", "Restricted", "Sep 2025", "Filings", "31 active", ["12 startups"], ["Client complaint (quality) under review"], [{ when: "Apr 08", actor: "R. Dev (Ops)", action: "Expert restricted", note: "Pending review MC-221" }]),
      row(2, "Rohan Iyer", "Independent", "Trademarks", "Chennai", "Verified", "Jan 2026", "Filings", "18 active", ["6 startups"], [], verified("Jan 2026")),
      row(3, "A. Krishnamurthy", "Chambers of AK", "Patents · Pharma", "Hyderabad", "Verified", "Nov 2025", "Filings", "26 active", ["9 startups"], [], verified("Nov 2025")),
      row(4, "S. Banerjee", "IPfirst LLP", "Copyright · Media", "Kolkata", "Pending", "Apr 2026", "Bar reg.", "Verification pending", [], ["Bar council ID unverified"]),
      row(5, "Nikita Shah", "LexVerse", "Designs · Consumer", "Mumbai", "Verified", "Feb 2026", "Filings", "11 active", ["4 startups"], [], verified("Feb 2026")),
      row(6, "G. Nair", "Retainer counsel", "IP Strategy", "Kochi", "Verified", "Dec 2025", "Rating", "4.9 (44 reviews)", ["15 startups"], [], verified("Dec 2025")),
    ],
  },
  {
    slug: "resource-providers", title: "Resource Provider Management", singular: "Provider", plural: "providers",
    description: "Resource listings, capacity, utilization, complaints, settlements and service performance.",
    categoryLabel: "Category",
    kpis: [
      { label: "Providers", value: "614" },
      { label: "Verified", value: "542" },
      { label: "Bookings (30d)", value: "4,108" },
      { label: "Settlements pending", value: "₹8.4L" },
    ],
    rows: [
      row(1, "AgroFields Labs", "Lakshmi Menon", "Testing labs", "Coimbatore", "Verified", "Jan 2026", "Bookings", "128 completed", ["4 listings"], [], verified("Feb 2026")),
      row(2, "CloudPeer Credits", "Channel partner", "Cloud credits", "Remote", "Verified", "Dec 2024", "Utilization", "$1.2M issued", ["2 listings"], [], verified("Dec 2024")),
      row(3, "MakerSpace One", "T. George", "Prototyping", "Thiruvananthapuram", "Verified", "Oct 2025", "Utilization", "74%", ["6 listings"], [], verified("Oct 2025")),
      row(4, "QuickRent Equipment", "S. Yadav", "Equipment rental", "Gurugram", "Pending", "Apr 2026", "Listings", "9 draft", [], ["Insurance certificate expired"]),
      row(5, "BioCore Facility", "A. Pillai", "Wet labs", "Bengaluru", "Verified", "Sep 2025", "Bookings", "312 completed", ["5 listings"], [], verified("Sep 2025")),
      row(6, "LegalDesk Partners", "Various", "Legal templates", "Remote", "Suspended", "Jan 2026", "Flags", "3 complaints", [], ["Outdated template caused client loss"], [{ when: "Mar 12", actor: "K. Bose (Ops)", action: "Provider suspended", note: "Template audit in progress" }]),
    ],
  },
  {
    slug: "corporates", title: "Corporate Management", singular: "Corporate", plural: "corporates",
    description: "Corporate innovation profiles — challenges, scouting, pilots, procurement outcomes and compliance review.",
    categoryLabel: "Industry",
    kpis: [
      { label: "Corporate partners", value: "312" },
      { label: "Verified", value: "288" },
      { label: "Open challenges", value: "86" },
      { label: "Pilots running", value: "486" },
    ],
    rows: [
      row(1, "AgroCorp Industries", "Sunita Jain", "Agri processing", "Ludhiana", "Onboarding", "Apr 2026", "Challenges", "2 open", [], ["Owner confirmation pending"]),
      row(2, "TelStar Communications", "Innovation office", "Telecom", "Mumbai", "Verified", "Aug 2024", "Pilots", "14 running", ["38 scouting requests"], [], verified("Aug 2024")),
      row(3, "HealthBridge Hospitals", "Ops division", "Healthcare", "Hyderabad", "Verified", "Nov 2024", "Pilots", "8 running", ["MediQueue rollout"], [], verified("Nov 2024")),
      row(4, "FinEdge Bank", "Digital office", "Banking", "Mumbai", "Verified", "Sep 2024", "Procurement", "₹4.2 Cr awarded", ["6 vendor contracts"], [], verified("Sep 2024")),
      row(5, "LogiTrans Fleet", "Strategy", "Logistics", "Delhi NCR", "Suspended", "Feb 2026", "Flags", "Pilot dispute", [], ["Unpaid pilot invoice (disputed)"], [{ when: "Mar 22", actor: "R. Dev (Ops)", action: "Corporate suspended", note: "Mediation requested by startup" }]),
      row(6, "UrbanNest Realty", "Innovation lab", "PropTech", "Bengaluru", "Verified", "Jan 2026", "Challenges", "3 open", [], [], verified("Jan 2026")),
    ],
  },
  {
    slug: "institutions", title: "Institution Management", singular: "Institution", plural: "institutions",
    description: "Universities and research institutions — departments, labs, tech transfer, spin-offs and commercialization outcomes.",
    categoryLabel: "Type",
    kpis: [
      { label: "Institutions", value: "85" },
      { label: "Verified", value: "79" },
      { label: "Tech transfers", value: "132" },
      { label: "Spin-off startups", value: "61" },
    ],
    rows: [
      row(1, "Apex University", "Meera Krishnan", "University", "Chennai", "Verified", "Oct 2025", "Spin-offs", "6 active", ["TBI", "34 research projects"], [], verified("Oct 2025")),
      row(2, "Northern Institute of Technology", "Dean (Research)", "Technical", "Delhi", "Verified", "Aug 2024", "Transfers", "18 completed", ["12 labs listed"], [], verified("Aug 2024")),
      row(3, "Coastal Marine Institute", "Director office", "Research", "Kochi", "Verified", "Nov 2025", "Projects", "9 active", ["AquaTrace partnership"], [], verified("Nov 2025")),
      row(4, "Greenfield Agricultural Univ.", "Registrar", "University", "Ludhiana", "Pending", "Apr 2026", "Departments", "11 mapped", [], ["MoU signature pending"]),
      row(5, "Institute of Nano Science", "Tech transfer office", "Research", "Pune", "Verified", "Sep 2025", "IP portfolio", "41 patents", ["8 licensing offers"], [], verified("Sep 2025")),
      row(6, "Eastern Medical College", "Research cell", "Medical", "Kolkata", "Verified", "Jan 2026", "Projects", "14 active", ["4 clinical validations"], [], verified("Jan 2026")),
    ],
  },
];

export const ENTITY_INDEX: Record<string, EntityConfig> = Object.fromEntries(
  ENTITIES.map((e) => [e.slug, e]),
);
