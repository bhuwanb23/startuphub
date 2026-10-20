/* Public-site navigation data. */
export type NavLink = { label: string; href: string };

export const siteNav: NavLink[] = [
  { label: "Platform", href: "#platform" },
  { label: "Journey", href: "#journey" },
  { label: "Ecosystem", href: "#ecosystem" },
  { label: "Intelligence", href: "#intelligence" },
  { label: "Opportunities", href: "#opportunities" },
];

export const footerNav: { title: string; links: string[] }[] = [
  { title: "Platform", links: ["Build", "Protect · IPR", "Connect", "Fund", "Grow"] },
  { title: "Explore", links: ["Startup directory", "Incubators", "Investors", "Mentors", "Corporates"] },
  { title: "Intelligence", links: ["Market snapshots", "Sector reports", "Trend radar", "Research desk"] },
  { title: "Company", links: ["About", "Careers", "Press kit", "Privacy", "Terms"] },
];
