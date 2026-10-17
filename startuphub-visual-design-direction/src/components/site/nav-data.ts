import {
  Award,
  BookOpen,
  Building2,
  CalendarDays,
  Compass,
  HandCoins,
  HelpCircle,
  Landmark,
  Layers,
  Map,
  Newspaper,
  Radar,
  Rocket,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Workflow,
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
  {
    label: "Explore",
    footer: { label: "Browse the ecosystem →", href: "/explore/startups" },
    children: [
      { label: "Startups", href: "/explore/startups", desc: "The ventures building now", icon: Rocket },
      { label: "Incubators", href: "/explore/incubators", desc: "Programs & facilities", icon: Building2 },
      { label: "Investors", href: "/explore/investors", desc: "Capital by stage & thesis", icon: HandCoins },
      { label: "Mentors", href: "/explore/mentors", desc: "Operators & experts", icon: Users },
      { label: "Resources", href: "/explore/resources", desc: "Tools, credits & templates", icon: Layers },
      { label: "Opportunities", href: "/opportunities", desc: "Funding calls & challenges", icon: Sparkles },
      { label: "Ecosystem Map", href: "/ecosystem", desc: "The network, visualized", icon: Map },
    ],
  },
  {
    label: "Intelligence",
    children: [
      { label: "Market Intelligence", href: "/intelligence/market", desc: "Sectors, funding & IP signals", icon: TrendingUp },
      { label: "Ecosystem Insights", href: "/intelligence/insights", desc: "Live network analytics", icon: Radar },
    ],
  },
  {
    label: "Platform",
    footer: { label: "Why StartupHub →", href: "/platform" },
    children: [
      { label: "Features", href: "/platform", desc: "All 11 connected modules", icon: Workflow },
      { label: "Startup Lifecycle", href: "/lifecycle", desc: "Idea to scale in 11 stages", icon: Compass },
      { label: "Solutions", href: "/solutions", desc: "For every ecosystem role", icon: Users },
      { label: "IPR & Innovation Hub", href: "/ipr", desc: "Patents, filing & IP education", icon: ShieldCheck },
    ],
  },
  {
    label: "Resources",
    children: [
      { label: "Knowledge Hub", href: "/knowledge-hub", desc: "Guides, playbooks & templates", icon: BookOpen },
      { label: "Startup Showcase", href: "/showcase", desc: "The ecosystem's finest", icon: Sparkles },
      { label: "Events", href: "/events", desc: "Demo days & meetups", icon: CalendarDays },
      { label: "Success Stories", href: "/success-stories", desc: "Founders, in their words", icon: Award },
      { label: "News & Updates", href: "/news", desc: "The ecosystem this week", icon: Newspaper },
      { label: "FAQ", href: "/faq", desc: "Answers, fast", icon: HelpCircle },
    ],
  },
  { label: "About", href: "/about" },
];
