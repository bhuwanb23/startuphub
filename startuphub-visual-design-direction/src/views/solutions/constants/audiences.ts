import {
  BadgeCheck,
  Boxes,
  Briefcase,
  Building2,
  GraduationCap,
  HandCoins,
  Landmark,
  Rocket,
  UserRound,
  Users,
  type LucideIcon,
} from "lucide-react";

export type Audience = {
  icon: LucideIcon;
  name: string;
  href?: string;
  line: string;
  points: string[];
  soon?: boolean;
};

export const audiences: Audience[] = [
  {
    icon: Rocket, name: "Founders", href: "/solutions/founders",
    line: "Everything between your idea and scale — one connected path.",
    points: ["Validate & incubate", "Protect your IP", "Raise the right round"],
  },
  {
    icon: Building2, name: "Incubators", href: "/solutions/incubators",
    line: "World-class programs without the spreadsheet sprawl.",
    points: ["Cohorts & milestones", "Mentor operations", "Impact reporting"],
  },
  {
    icon: HandCoins, name: "Investors", href: "/solutions/investors",
    line: "Deal flow where diligence is already 80% done.",
    points: ["AI deal matching", "Verified traction", "Portfolio monitoring"],
  },
  {
    icon: Users, name: "Mentors", href: "/solutions/mentors",
    line: "Guide the next wave of builders — on your schedule.",
    points: ["Smart matching", "Structured sessions", "Impact tracking"],
  },
  {
    icon: Landmark, name: "Corporates", href: "/solutions/corporates",
    line: "Scout technology and pilot with startups before competitors do.",
    points: ["Tech scouting", "Innovation challenges", "Pilot programs"],
  },
  {
    icon: Landmark, name: "Government", href: "/solutions/government",
    line: "Run startup programs with real, outcome-level data.",
    points: ["Grants pipeline", "Ecosystem analytics", "Impact measurement"],
  },
  {
    icon: BadgeCheck, name: "IPR Experts",
    line: "Serve a steady pipeline of startups that need protection now.",
    points: ["Qualified demand", "Filing tooling", "Portfolio views"],
    soon: true,
  },
  {
    icon: Boxes, name: "Resource Providers",
    line: "Offer tools, credits and services to startups at the exact right stage.",
    points: ["Stage-gated offers", "Vetted marketplace", "Usage analytics"],
    soon: true,
  },
  {
    icon: GraduationCap, name: "Universities",
    line: "Turn research and students into startups and spin-offs.",
    points: ["Tech transfer", "Student founders", "Lab-to-market"],
    soon: true,
  },
  {
    icon: UserRound, name: "Talent",
    line: "Find your next role inside a startup that's actually going somewhere.",
    points: ["Verified startups", "Stage-matched roles", "Equity clarity"],
    soon: true,
  },
];

export const workflowMini = [
  { n: "01", title: "Pick your role", desc: "Ten audiences, one account. Your dashboard shapes itself around what you do." },
  { n: "02", title: "Get verified", desc: "Light-touch verification keeps the network trusted — usually within 48 hours." },
  { n: "03", title: "Start connecting", desc: "Matches, programs and deals start flowing based on your stage and intent." },
];
