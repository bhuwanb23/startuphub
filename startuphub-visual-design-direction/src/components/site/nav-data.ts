import {
  Award,
  BookOpen,
  Building2,
  CalendarDays,
  HandCoins,
  Landmark,
  Layers,
  Radar,
  Rocket,
  Sparkles,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";

export type NavChild = {
  label: string;
  href: string;
  desc: string;
  icon: LucideIcon;
  soon?: boolean;
};

export type NavItem = {
  label: string;
  href?: string;
  children?: NavChild[];
  footer?: { label: string; href: string };
};

export const NAV: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Lifecycle", href: "/lifecycle" },
  { label: "Platform", href: "/platform" },
  {
    label: "Solutions",
    footer: { label: "All solutions →", href: "/solutions" },
    children: [
      { label: "Founders", href: "/solutions/founders", desc: "Idea to scale, every stage", icon: Rocket },
      { label: "Incubators", href: "/solutions/incubators", desc: "Programs, cohorts & impact", icon: Building2 },
      { label: "Investors", href: "/solutions/investors", desc: "Deal flow & intelligence", icon: HandCoins },
      { label: "Mentors", href: "/solutions/mentors", desc: "Guide the next wave", icon: Users },
      { label: "Corporates", href: "/solutions/corporates", desc: "Scout, pilot & partner", icon: Landmark },
      { label: "Government", href: "/solutions/government", desc: "Programs & ecosystem data", icon: Landmark },
    ],
  },
  {
    label: "Explore",
    footer: { label: "Browse the ecosystem →", href: "/explore/startups" },
    children: [
      { label: "Startups", href: "/explore/startups", desc: "The ventures building now", icon: Rocket },
      { label: "Incubators", href: "/explore/incubators", desc: "Programs & facilities", icon: Building2 },
      { label: "Investors", href: "/explore/investors", desc: "Capital by stage & thesis", icon: HandCoins },
      { label: "Mentors", href: "/explore/mentors", desc: "Operators & experts", icon: Users },
      { label: "Resources", href: "/explore/resources", desc: "Tools, credits & templates", icon: Layers, soon: true },
    ],
  },
  {
    label: "Intelligence",
    children: [
      { label: "Market Intelligence", href: "/intelligence/market", desc: "Sectors, funding & signals", icon: TrendingUp },
      { label: "Ecosystem Insights", href: "/intelligence/insights", desc: "Reports on the network", icon: Radar, soon: true },
    ],
  },
  {
    label: "More",
    children: [
      { label: "Opportunities", href: "/opportunities", desc: "Funding calls & challenges", icon: Sparkles, soon: true },
      { label: "Events", href: "/events", desc: "Demo days & meetups", icon: CalendarDays, soon: true },
      { label: "Knowledge Hub", href: "/knowledge-hub", desc: "Guides & playbooks", icon: BookOpen, soon: true },
      { label: "Success Stories", href: "/success-stories", desc: "Founders, in their words", icon: Award, soon: true },
    ],
  },
];
