import {
  Blocks,
  Building2,
  HandCoins,
  Landmark,
  Network,
  Rocket,
  ShieldCheck,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";

/* ── Hero journey chips ─────────────────────────────────── */
export const journey = ["Idea", "Incubation", "IPR", "Resources", "Market", "Funding", "Growth"];

/* ── Lifecycle preview ──────────────────────────────────── */
export const stages = [
  { n: "01", name: "Idea", line: "Every venture starts with a spark.", flow: "Discover → Shape → Commit" },
  { n: "02", name: "Validation", line: "Pressure-test the idea before you invest in it.", flow: "Research → Interview → Evidence" },
  { n: "03", name: "Incubation", line: "Structure, mentors and momentum in one place.", flow: "Mentors → Milestones → Cohort" },
  { n: "04", name: "IPR", line: "Protect what makes you different.", flow: "Protect → Manage → Commercialize" },
  { n: "05", name: "Resources", line: "The right tool at exactly the right time.", flow: "Credits → Templates → Talent" },
  { n: "06", name: "MVP", line: "Ship the smallest thing that truly matters.", flow: "Scope → Build → Learn" },
  { n: "07", name: "Market", line: "Find your first true believers.", flow: "Position → Launch → Convert" },
  { n: "08", name: "Funding", line: "The right capital at the right stage.", flow: "Prepare → Match → Close" },
  { n: "09", name: "Growth", line: "Turn early traction into a repeatable rhythm.", flow: "Measure → Optimize → Compound" },
  { n: "10", name: "Scale", line: "From promising company to lasting institution.", flow: "Expand → Systematize → Endure" },
];

/* ── Platform modules preview ───────────────────────────── */
export const modules: {
  icon: LucideIcon;
  name: string;
  tags: string[];
  desc: string;
}[] = [
  { icon: Blocks, name: "Build", tags: ["Product", "MVP", "Validation"], desc: "Structured build sprints, validation frameworks and MVP tooling that turn raw ideas into working products." },
  { icon: ShieldCheck, name: "Protect", tags: ["IPR", "Legal", "Compliance"], desc: "An integrated IPR desk for patents, trademarks and filings — plus the legal scaffolding to stay compliant." },
  { icon: Network, name: "Connect", tags: ["Mentors", "Resources", "Partners"], desc: "Warm paths to 2,800+ operators, ecosystem resources and institutional partners, matched by stage and sector." },
  { icon: Landmark, name: "Fund", tags: ["Investors", "Grants", "Capital"], desc: "Investor relationships, grant discovery and readiness scoring so the right capital finds you at the right stage." },
  { icon: TrendingUp, name: "Grow", tags: ["Market", "Performance", "Intelligence"], desc: "Market access programmes and live intelligence that turn early traction into durable growth." },
];

/* ── Who we serve ───────────────────────────────────────── */
export const audiences: {
  icon: LucideIcon;
  name: string;
  href: string;
  line: string;
  points: string[];
}[] = [
  { icon: Rocket, name: "Founders", href: "/solutions/founders", line: "Everything between your idea and scale.", points: ["Validate", "Protect", "Raise"] },
  { icon: Building2, name: "Incubators", href: "/solutions/incubators", line: "Run world-class programs, minus the spreadsheets.", points: ["Cohorts", "Mentors", "Impact"] },
  { icon: HandCoins, name: "Investors", href: "/solutions/investors", line: "Deal flow with the diligence already started.", points: ["AI match", "Intelligence", "Portfolio"] },
  { icon: Users, name: "Mentors", href: "/solutions/mentors", line: "Guide the next wave of builders, on your terms.", points: ["Matching", "Sessions", "Impact"] },
  { icon: Landmark, name: "Corporates", href: "/solutions/corporates", line: "Scout technology before your competitors do.", points: ["Scouting", "Pilots", "Challenges"] },
  { icon: Landmark, name: "Government", href: "/solutions/government", line: "Run startup programs with real outcome data.", points: ["Grants", "Analytics", "Impact"] },
];

/* ── Ecosystem statistics ───────────────────────────────── */
export const stats: { to: number; decimals?: number; prefix?: string; suffix: string; label: string }[] = [
  { to: 10, suffix: "K+", label: "Startups building" },
  { to: 450, suffix: "+", label: "Incubators & partners" },
  { to: 2.8, decimals: 1, suffix: "K+", label: "Expert mentors" },
  { to: 1.2, decimals: 1, prefix: "₹", suffix: "K Cr", label: "Capital connected" },
  { to: 68, suffix: "K+", label: "Ecosystem connections" },
];

/* ── Featured startups ──────────────────────────────────── */
export const featuredStartups = [
  { slug: "lumen-ai", name: "Lumen AI", sector: "Applied AI", place: "Bengaluru", stage: "Series A", line: "Vision models measuring crop health across 3.2M hectares of farmland.", metrics: ["3.2M ha mapped", "14 states", "₹2.4 Cr raised"], initials: "Lu" },
  { slug: "terragrid", name: "TerraGrid", sector: "ClimateTech", place: "Pune", stage: "Seed", line: "Grid-scale storage intelligence for renewable operators.", initials: "TG" },
  { slug: "medsync", name: "MedSync", sector: "HealthTech", place: "Hyderabad", stage: "Series A", line: "Interoperable patient records for 400+ clinics.", initials: "MS" },
  { slug: "finedge", name: "FinEdge", sector: "FinTech", place: "Mumbai", stage: "Pre-seed", line: "Credit rails for India's micro-entrepreneurs.", initials: "FE" },
  { slug: "orbitalworks", name: "OrbitalWorks", sector: "SpaceTech", place: "Chennai", stage: "Seed", line: "Realtime satellite data pipelines for logistics.", initials: "OW" },
];

/* ── Featured opportunities ─────────────────────────────── */
export const opportunities = [
  { type: "Funding", title: "Seed Forward Program — Cohort VII", org: "Northgate Partners", meta: "Closes Mar 30" },
  { type: "Incubation", title: "Global Incubation Sprint", org: "StartupHub Labs", meta: "Rolling applications" },
  { type: "Challenge", title: "AgriTech Innovation Challenge 2026", org: "National Agri Mission", meta: "₹50L prize pool" },
  { type: "Grant", title: "DeepTech Research Grant", org: "National Science Foundation", meta: "Opens Apr 12" },
];

/* ── Success stories ────────────────────────────────────── */
export const quotes = [
  {
    quote: "We filed our first patent, found our lead investor and closed two enterprise pilots — all inside one platform. StartupHub compressed two years of ecosystem navigation into five months.",
    name: "Ananya Rao", role: "Co-founder & CEO, Lumen AI", chip: "Series A · ₹2.4 Cr raised",
  },
  {
    quote: "The IPR desk alone is worth it. What used to take our team months of back-and-forth was done in weeks, at a fraction of the cost — before our first public pitch.",
    name: "Daniel Mathew", role: "Founder, OrbitalWorks", chip: "3 patents filed",
  },
  {
    quote: "As a first-time founder, the mentor matching felt almost unfair. I had an ex-CTO reviewing our architecture every Thursday before we'd even written our first line of code.",
    name: "Sarah Fernandes", role: "Co-founder, MedSync", chip: "400+ clinics onboarded",
  },
];

/* ── How StartupHub works ───────────────────────────────── */
export const howSteps = [
  { n: "01", title: "Create your profile", desc: "Tell us who you are — founder, mentor, investor, incubator. The ecosystem opens around your role." },
  { n: "02", title: "Get matched", desc: "AI connects you to mentors, resources, programs and capital that fit your stage and sector." },
  { n: "03", title: "Move through the lifecycle", desc: "Validate, protect, build and raise — with every stage wired to the next, nothing falls through." },
  { n: "04", title: "Measure everything", desc: "Readiness scores, traction and impact tracked live, so stakeholders see real progress." },
];
