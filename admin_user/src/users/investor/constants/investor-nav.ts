import {
  Bell,
  Briefcase,
  CalendarDays,
  FileText,
  GitPullRequest,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  Radar,
  Search,
  Settings,
  Users,
} from "lucide-react";
import type { AppNavGroup, AppUser } from "@/components/app/app-shell";

export const investorUser: AppUser = {
  name: "Aditya Rao",
  role: "Partner",
  org: "Northbridge Capital",
  initials: "AR",
  home: "/investor",
  copilot: true,
};

export const investorNav: AppNavGroup[] = [
  { label: "Overview", icon: LayoutDashboard, href: "/investor" },
  {
    label: "Dealflow",
    icon: GitPullRequest,
    href: "/investor/dealflow",
    subs: [
      { name: "Pipeline", href: "/investor/dealflow/pipeline", soon: true },
      { name: "Smart Matching", href: "/investor/dealflow/matching", soon: true },
      { name: "Watchlist", href: "/investor/dealflow/watchlist", soon: true },
      { name: "Meeting Notes", href: "/investor/dealflow/notes", soon: true },
    ],
  },
  {
    label: "Portfolio",
    icon: Briefcase,
    href: "/investor/portfolio",
    subs: [
      { name: "Companies", href: "/investor/portfolio/companies", soon: true },
      { name: "Performance", href: "/investor/portfolio/performance", soon: true },
      { name: "Follow-ons", href: "/investor/portfolio/follow-ons", soon: true },
    ],
  },
  {
    label: "Intelligence",
    icon: Radar,
    href: "/investor/intelligence",
    subs: [
      { name: "Market Signals", href: "/investor/intelligence/signals", soon: true },
      { name: "Sector Briefs", href: "/investor/intelligence/sectors", soon: true },
      { name: "Comparables", href: "/investor/intelligence/comps", soon: true },
    ],
  },
  {
    label: "Network",
    icon: Users,
    href: "/investor/network",
    subs: [
      { name: "Founders", href: "/investor/network/founders", soon: true },
      { name: "Co-investors", href: "/investor/network/co-investors", soon: true },
      { name: "Events", href: "/investor/network/events", soon: true },
    ],
  },
];

export const investorUtility: AppNavGroup[] = [
  { label: "Search", icon: Search, href: "/investor/search" },
  { label: "Meetings", icon: CalendarDays, href: "/investor/meetings" },
  { label: "Reports", icon: FileText, href: "/investor/reports" },
  { label: "Notifications", icon: Bell, href: "/investor/notifications" },
];

export const investorBottom: AppNavGroup[] = [
  { label: "Settings", icon: Settings, href: "/investor/settings" },
  { label: "Support", icon: LifeBuoy, href: "/investor/support" },
  { label: "Log out", icon: LogOut, href: "/login" },
];
