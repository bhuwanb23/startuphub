import {
  Briefcase,
  CalendarDays,
  Compass,
  FileText,
  KanbanSquare,
  LifeBuoy,
  LogOut,
  MessageSquare,
  Network,
  Radar,
  Settings,
} from "lucide-react";
import type { AppNavGroup, AppUser } from "@/components/app/app-shell";

export const investorNav: AppNavGroup[] = [
  { label: "Overview", icon: Compass, href: "/investor" },
  {
    label: "Deal Flow",
    icon: KanbanSquare,
    href: "/investor/deal-flow",
    subs: [
      { name: "Pipeline", href: "/investor/deal-flow" },
      { name: "Screening", href: "/investor/deal-flow/screening" },
      { name: "Matching", href: "/investor/deal-flow/matching" },
      { name: "Watchlist", href: "/investor/deal-flow/watchlist" },
    ],
  },
  {
    label: "Portfolio",
    icon: Briefcase,
    href: "/investor/portfolio",
    subs: [
      { name: "Companies", href: "/investor/portfolio" },
      { name: "Performance", href: "/investor/portfolio/performance" },
      { name: "Follow-ons", href: "/investor/portfolio/follow-ons", soon: true },
    ],
  },
  {
    label: "Intelligence",
    icon: Radar,
    href: "/investor/intelligence",
    subs: [
      { name: "Market & Signals", href: "/investor/intelligence" },
      { name: "Sector Reports", href: "/investor/intelligence/reports", soon: true },
      { name: "IP Activity", href: "/investor/intelligence/ip", soon: true },
    ],
  },
  {
    label: "Network",
    icon: Network,
    href: "/investor/network",
    subs: [
      { name: "Founders", href: "/investor/network/founders" },
      { name: "Incubators", href: "/investor/network/incubators", soon: true },
      { name: "Co-investors", href: "/investor/network/co-investors", soon: true },
    ],
  },
  { label: "Meetings", icon: CalendarDays, href: "/investor/meetings" },
];

export const investorUtility: AppNavGroup[] = [
  { label: "Messages", icon: MessageSquare, href: "#" },
  { label: "Documents", icon: FileText, href: "#" },
  { label: "Settings", icon: Settings, href: "/investor/settings" },
];

export const investorBottom: AppNavGroup[] = [
  { label: "Help & Support", icon: LifeBuoy, href: "#" },
  { label: "Log out", icon: LogOut, href: "/login" },
];

export const investorUser: AppUser = {
  name: "Arjun Mehta",
  role: "Investment Partner",
  org: "Meridian Capital",
  initials: "AM",
  home: "/investor",
  copilot: true,
};
