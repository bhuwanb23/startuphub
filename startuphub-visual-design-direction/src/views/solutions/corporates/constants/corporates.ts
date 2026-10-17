import {
  FileCheck2,
  FlaskConical,
  Handshake,
  Radar,
  ScanSearch,
  Trophy,
} from "lucide-react";
import type { SolutionData } from "@/components/solution/types";

export const corporatesData: SolutionData = {
  slug: "corporates",
  audience: "Corporates",
  icon: Handshake,
  title: "Scout the technology your roadmap will need next year.",
  lead: "Run innovation challenges, scout startups by capability and launch pilots with real usage data — without building a scouting department from scratch.",
  ticks: ["Curated startup pipeline", "Structured pilots", "Procurement fast-track"],
  panel: {
    title: "Innovation partnership desk",
    rows: [
      { icon: ScanSearch, label: "Startups scouted this quarter", value: "214" },
      { icon: Trophy, label: "Active challenges", value: "2 live" },
      { icon: FlaskConical, label: "Pilots in progress", value: "5 running" },
      { icon: FileCheck2, label: "PoCs completed", value: "11 this year" },
    ],
    stat: { value: "62 days", label: "average from first call to live pilot" },
  },
  capabilitiesHeading: "Open innovation that actually ships.",
  capabilities: [
    { icon: Radar, title: "Startup Discovery", desc: "Search 10,000+ startups by capability, traction and readiness — not just demo-day luck." },
    { icon: ScanSearch, title: "Technology Scouting", desc: "Map emerging tech against your business units with AI-assisted sector scans." },
    { icon: Trophy, title: "Innovation Challenges", desc: "Publish a problem statement; receive solution-grade applications from vetted startups." },
    { icon: FlaskConical, title: "Pilot Programs", desc: "Structured pilots with success criteria, legal templates and usage tracking built-in." },
    { icon: FileCheck2, title: "Proof of Concept", desc: "Run time-boxed PoCs with agreed metrics — decide with data, extend or exit cleanly." },
    { icon: Handshake, title: "Partnerships", desc: "Convert successful pilots into licensing, vendor or co-innovation agreements." },
  ],
  workflow: [
    { n: "01", title: "Publish your interest", desc: "Define the technologies and problem areas your business units care about." },
    { n: "02", title: "Receive the shortlist", desc: "Scouted, vetted startups — with traction data — land in your inbox weekly." },
    { n: "03", title: "Pilot with guardrails", desc: "Launch structured pilots with clear success criteria and legal scaffolding." },
    { n: "04", title: "Scale what works", desc: "Move winners into procurement, partnership or investment — with proof attached." },
  ],
  outcomes: [
    { to: 340, suffix: "+", label: "enterprises partner on StartupHub" },
    { to: 1.9, decimals: 1, suffix: "K+", label: "pilots launched through the platform" },
    { to: 68, suffix: "%", label: "of pilots convert to paid engagements" },
  ],
  quote: {
    text: "Our innovation team ran 5 pilots last quarter with the effort it used to take for one. Two are now vendors.",
    name: "Sunita Deshmukh",
    role: "VP Innovation, Arvind Industries",
  },
  ctaLabel: "Partner With Startups",
};
