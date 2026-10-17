import {
  Award,
  BarChart3,
  ClipboardList,
  Landmark,
  LifeBuoy,
  Network,
} from "lucide-react";
import type { SolutionData } from "@/components/solution/types";

export const governmentData: SolutionData = {
  slug: "government",
  audience: "Government",
  icon: Landmark,
  title: "Run startup programs with data you can defend.",
  lead: "From grants to state missions — design, disburse and measure startup support with live ecosystem analytics instead of annual guesswork.",
  ticks: ["Auditable by design", "Live outcome data", "Citizen-simple applications"],
  panel: {
    title: "Mission control room",
    rows: [
      { icon: Network, label: "Ecosystem startups mapped", value: "6,412" },
      { icon: ClipboardList, label: "Active programs", value: "4 running" },
      { icon: Landmark, label: "Grants disbursed FY 26", value: "₹84 Cr" },
      { icon: Award, label: "Jobs created (reported)", value: "9,800+" },
    ],
    stat: { value: "68K+", label: "ecosystem connections tracked live" },
  },
  capabilitiesHeading: "Policy, programs and proof — in one room.",
  capabilities: [
    { icon: Network, title: "Startup Ecosystem", desc: "A live map of your region's startups — stages, sectors, health and momentum." },
    { icon: ClipboardList, title: "Programs", desc: "Launch schemes and missions digitally with structured applications and review workflows." },
    { icon: Landmark, title: "Grants", desc: "Milestone-based disbursement with complete audit trails from application to impact." },
    { icon: LifeBuoy, title: "Startup Support", desc: "Route founders to the right incubator, mentor or scheme based on their actual stage." },
    { icon: BarChart3, title: "Ecosystem Analytics", desc: "Sector flows, funding patterns and employment — refreshed weekly, exportable always." },
    { icon: Award, title: "Impact Measurement", desc: "Outcome-level reporting: survival rates, capital raised, jobs — per rupee deployed." },
  ],
  workflow: [
    { n: "01", title: "Map your ecosystem", desc: "We onboard your existing startups, incubators and institutions into one live registry." },
    { n: "02", title: "Launch programs digitally", desc: "Schemes go live with structured intake, transparent review and milestone tracking." },
    { n: "03", title: "Support at scale", desc: "Every supported startup gets the full platform — mentors, IPR, resources, market." },
    { n: "04", title: "Report real impact", desc: "Cabinet-ready impact dashboards, generated from live data — not consultant decks." },
  ],
  outcomes: [
    { to: 120, suffix: "+", label: "government programs on the platform" },
    { to: 840, prefix: "₹", suffix: " Cr", label: "in grants tracked & disbursed" },
    { to: 3.2, decimals: 1, suffix: "×", label: "better targeting vs. manual schemes" },
  ],
  quote: {
    text: "For the first time, we can see which schemes actually produce surviving startups — and fund accordingly.",
    name: "Dr. Kavya Reddy",
    role: "Director, State Innovation Council",
  },
  ctaLabel: "Partner With StartupHub",
};
