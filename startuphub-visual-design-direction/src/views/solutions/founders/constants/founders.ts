import {
  Blocks,
  Building2,
  Compass,
  FlaskConical,
  Gauge,
  Globe2,
  HandCoins,
  Layers,
  Rocket,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import type { SolutionData } from "@/components/solution/types";

export const foundersData: SolutionData = {
  slug: "founders",
  audience: "Founders",
  icon: Rocket,
  title: "Everything between your idea and scale — in one place.",
  lead: "Stop stitching together fifteen portals and cold emails. StartupHub gives you one guided path: validate, protect, build, raise and grow — with the ecosystem wired in from day one.",
  ticks: ["Free to start", "Your IP stays yours", "Mentor matched in 48h"],
  panel: {
    title: "Founder command center",
    rows: [
      { icon: Compass, label: "Current stage", value: "Incubation" },
      { icon: ShieldCheck, label: "IP assets protected", value: "3 filings" },
      { icon: HandCoins, label: "Investor matches", value: "6 warm" },
      { icon: TrendingUp, label: "Readiness score", value: "78 / 100" },
    ],
    stat: { value: "2.4×", label: "higher survival rate for guided founders" },
  },
  capabilitiesHeading: "Everything a founder needs to move forward.",
  capabilities: [
    { icon: Compass, title: "Discover", desc: "Map your idea against 10,000+ startups and find the whitespace before you build." },
    { icon: FlaskConical, title: "Validate", desc: "Run structured experiments and interviews. Evidence over opinions, always." },
    { icon: Building2, title: "Incubate", desc: "Join a cohort matched to your sector and stage — milestones and mentors included." },
    { icon: ShieldCheck, title: "Protect", desc: "File patents and trademarks before your first public pitch, at founder-friendly rates." },
    { icon: Blocks, title: "Build", desc: "Ship your MVP with sprint frameworks and senior architecture reviews." },
    { icon: Layers, title: "Find Resources", desc: "Cloud credits, templates and talent — unlocked automatically as you advance." },
    { icon: Globe2, title: "Find Market", desc: "Launch through pilots and corporate partners instead of shouting into the void." },
    { icon: HandCoins, title: "Raise Funding", desc: "Readiness scoring, warm investor matching and a deal room that closes faster." },
    { icon: TrendingUp, title: "Grow", desc: "Growth experiments with benchmark cohorts so you scale what actually works." },
    { icon: Gauge, title: "Track Performance", desc: "One honest dashboard across product, revenue, team and capital." },
  ],
  workflow: [
    { n: "01", title: "Create your profile", desc: "Four minutes. Tell us the idea and where you are — the platform maps your stage." },
    { n: "02", title: "Validate & protect", desc: "Run your first experiments and secure your IP before the world sees it." },
    { n: "03", title: "Incubate & build", desc: "Get matched to a cohort and mentors, then ship your MVP with real support." },
    { n: "04", title: "Raise & grow", desc: "Pitch with a readiness score and verified traction. Then compound." },
  ],
  outcomes: [
    { to: 10, suffix: "K+", label: "founders building on StartupHub" },
    { to: 40, suffix: "%", label: "faster from idea to MVP" },
    { to: 1.2, decimals: 1, prefix: "₹", suffix: "K Cr", label: "capital raised by our founders" },
  ],
  quote: {
    text: "StartupHub compressed two years of ecosystem navigation into five months. Every stage just handed me to the next.",
    name: "Ananya Rao",
    role: "Co-founder & CEO, Lumen AI",
  },
  ctaLabel: "Start Your Startup",
};
