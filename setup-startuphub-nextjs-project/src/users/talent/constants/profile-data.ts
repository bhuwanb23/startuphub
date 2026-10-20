export const PROFILE = {
  name: "Zoya Khan",
  headline: "Senior Product Engineer · AI & Fintech",
  about:
    "I build production systems at the intersection of applied AI and financial infrastructure — eight years across early-stage startups and scale-ups. I work best in the 0→1 window: ambiguous problem, small team, real users within weeks.",
  category: "Engineering & Product",
  location: "Bengaluru, IN · Remote-first",
  goal: "Technical leadership roles or high-leverage consulting mandates with climate and fintech startups at Seed–Series A.",
  industries: ["FinTech", "ClimateTech", "Applied AI", "Developer Tools", "HealthTech"],
  engagement: ["Full-time (Series A+)", "Consulting (retainer)", "Advisory (equity)"],
  contact: {
    email: "zoya.khan@workmail.dev",
    phone: "+91 98200 41157",
    links: ["github.com/zoyak", "zoyakhan.dev", "linkedin.com/in/zoyakhan"],
  },
};

export const SKILLS = [
  { name: "TypeScript / React / Next.js", level: 94, years: 8, verified: true },
  { name: "Node & distributed systems", level: 88, years: 7, verified: true },
  { name: "Applied GenAI (RAG, agents)", level: 82, years: 3, verified: true },
  { name: "Fintech rails & payments", level: 86, years: 5, verified: true },
  { name: "Product strategy & discovery", level: 78, years: 6, verified: false },
  { name: "Team leadership", level: 74, years: 4, verified: false },
];

export const EXPERIENCE = [
  {
    role: "Senior Product Engineer",
    org: "OrbitPay — cross-border payments",
    period: "2023 — 2025",
    kind: "Startup · Series A",
    note: "Owned treasury reconciliation stack; cut settlement errors 61%. Led pod of 4.",
  },
  {
    role: "Founding Engineer (Contract)",
    org: "Meridian Health Systems",
    period: "2022 — 2023",
    kind: "Freelance engagement",
    note: "Shipped HIPAA-grade document pipeline used by 40 clinics at launch.",
  },
  {
    role: "Engineer → Staff Engineer",
    org: "KredKart — MSME credit",
    period: "2018 — 2022",
    kind: "Startup · Seed → Series B",
    note: "First engineering hire; built scoring API from 0 to 2M calls/day.",
  },
  {
    role: "Technical Advisor",
    org: "Nexus Labs portfolio companies",
    period: "2024 — present",
    kind: "Consulting · Advisory",
    note: "Architecture reviews and AI roadmaps for 6 incubated startups.",
  },
];

export const EDUCATION = [
  { title: "B.E. Computer Science", org: "Visvesvaraya Technological University", period: "2014 — 2018" },
];

export const CERTIFICATIONS = [
  { name: "AWS Solutions Architect — Professional", issuer: "AWS", year: "2024" },
  { name: "Machine Learning Specialization", issuer: "Stanford Online", year: "2023" },
  { name: "Certified Kubernetes Application Developer", issuer: "CNCF", year: "2022" },
];

export const AVAILABILITY = {
  status: "Open to select engagements",
  hours: "Mon–Fri · IST overlap ≥ 5h with EU",
  start: "Immediate for consulting · 30 days for full-time",
  capacity: 30, // hrs per week
  capacityMax: 40,
  modes: ["Remote", "Hybrid · Bengaluru", "On-site for kickoffs"],
};
