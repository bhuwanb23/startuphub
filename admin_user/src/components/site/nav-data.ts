export type NavChild = { label: string; href: string; desc?: string };
export type NavItem = { label: string; href?: string; children?: NavChild[] };

export const NAV: NavItem[] = [
  {
    label: "Platform",
    children: [
      { label: "Platform Overview", href: "/platform", desc: "One platform, every critical connection" },
      { label: "Startup Lifecycle", href: "/lifecycle", desc: "Idea to scale, stage by stage" },
      { label: "IPR Studio", href: "/ipr", desc: "Protect what makes you defensible" },
      { label: "Market Intelligence", href: "/intelligence/market", desc: "Live sector signals" },
      { label: "Ecosystem Insights", href: "/intelligence/insights", desc: "Reports, patterns and playbooks" },
    ],
  },
  {
    label: "Explore",
    children: [
      { label: "Startups", href: "/explore/startups", desc: "Verified startups, searchable by signal" },
      { label: "Mentors", href: "/explore/mentors", desc: "Operators across every sector" },
      { label: "Investors", href: "/explore/investors", desc: "Angels to growth funds" },
      { label: "Incubators", href: "/explore/incubators", desc: "Programs across the network" },
      { label: "Resources", href: "/explore/resources", desc: "Credits, tools and templates" },
      { label: "Opportunities", href: "/opportunities", desc: "Live grants, cohorts and challenges" },
    ],
  },
  {
    label: "Solutions",
    children: [
      { label: "For Founders", href: "/solutions/founders", desc: "Build, protect and scale" },
      { label: "For Mentors", href: "/solutions/mentors", desc: "Multiply your impact" },
      { label: "For Incubators", href: "/solutions/incubators", desc: "Run cohorts with signal" },
      { label: "For Investors", href: "/solutions/investors", desc: "Dealflow with context" },
      { label: "For Corporates", href: "/solutions/corporates", desc: "Pilots that become contracts" },
      { label: "For Government", href: "/solutions/government", desc: "Policy that reaches builders" },
    ],
  },
  { label: "Ecosystem", href: "/ecosystem" },
  { label: "Pricing", href: "/pricing" },
];
