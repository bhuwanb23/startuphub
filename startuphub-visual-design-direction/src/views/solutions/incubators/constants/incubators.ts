import {
  Award,
  ClipboardList,
  Gauge,
  Layers,
  MessageSquare,
  Radar,
  Users,
} from "lucide-react";
import type { SolutionData } from "@/components/solution/types";

export const incubatorsData: SolutionData = {
  slug: "incubators",
  audience: "Incubators",
  icon: Users,
  title: "World-class programs, without the spreadsheet sprawl.",
  lead: "Cohorts, mentors, resources, milestones and impact — in one operating system built for incubators. Spend your time on startups, not status reports.",
  ticks: ["Free for verified programs", "Onboard in a week", "Impact data built-in"],
  panel: {
    title: "Program operations hub",
    rows: [
      { icon: Users, label: "Active cohort", value: "14 startups" },
      { icon: MessageSquare, label: "Mentor hours this month", value: "126 h" },
      { icon: Layers, label: "Resources allocated", value: "82%" },
      { icon: Gauge, label: "Cohort health", value: "Strong" },
    ],
    stat: { value: "94%", label: "average milestone completion" },
  },
  capabilitiesHeading: "Run the whole program from one place.",
  capabilities: [
    { icon: Radar, title: "Discover Startups", desc: "A pipeline of stage-matched, sector-relevant startups applies to you — not the other way around." },
    { icon: ClipboardList, title: "Manage Programs", desc: "Design multi-track programs with milestones, gates and automated communications." },
    { icon: Users, title: "Manage Cohorts", desc: "See every venture's progress, blockers and mentor notes in one live cohort view." },
    { icon: MessageSquare, title: "Mentor Startups", desc: "Assign mentors, track hours and measure session outcomes — no more chasing calendars." },
    { icon: Layers, title: "Allocate Resources", desc: "Distribute credits, space, equipment and grants with a clear audit trail." },
    { icon: Gauge, title: "Track Performance", desc: "KPIs for every startup roll up into program health you can act on weekly." },
    { icon: Award, title: "Measure Impact", desc: "Outcome-level impact reports for funders and government — generated, not assembled." },
  ],
  workflow: [
    { n: "01", title: "Register your program", desc: "Tell us your focus, capacity and facilities. Verification typically completes in days." },
    { n: "02", title: "Open applications", desc: "Receive pre-scored, stage-matched applications from across the ecosystem." },
    { n: "03", title: "Run the cohort", desc: "Milestones, mentors and resources managed in one place — progress always visible." },
    { n: "04", title: "Prove the impact", desc: "Graduate startups with verified traction; export funder-ready impact reports." },
  ],
  outcomes: [
    { to: 450, suffix: "+", label: "incubators run programs on StartupHub" },
    { to: 38, suffix: "K+", label: "startups incubated through the network" },
    { to: 32, suffix: "%", label: "less admin time per cohort" },
  ],
  quote: {
    text: "We replaced five tools and a part-time reporting role. Our mentors finally see the same picture our program managers do.",
    name: "Prof. Ramesh Iyer",
    role: "Director, CIED — Centre for Innovation",
  },
  ctaLabel: "Join as Incubator",
};
