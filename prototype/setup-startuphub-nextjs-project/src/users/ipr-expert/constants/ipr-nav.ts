import {
  BadgeCheck,
  Compass,
  FileSignature,
  FileText,
  FolderKanban,
  HandCoins,
  LifeBuoy,
  LogOut,
  Radar,
  Settings,
  Users,
} from "lucide-react";
import type { AppNavGroup, AppUser } from "@/components/app/app-shell";

export const iprNav: AppNavGroup[] = [
  { label: "Overview", icon: Compass, href: "/ipr-expert" },
  {
    label: "IP Portfolio",
    icon: FolderKanban,
    href: "/ipr-expert/ip",
    subs: [
      { name: "Patents", href: "/ipr-expert/ip/patents", soon: true },
      { name: "Trademarks", href: "/ipr-expert/ip/trademarks", soon: true },
      { name: "Designs", href: "/ipr-expert/ip/designs", soon: true },
      { name: "Copyright", href: "/ipr-expert/ip/copyright", soon: true },
    ],
  },
  { label: "Filings", icon: FileSignature, href: "/ipr-expert/filings" },
  { label: "Commercialization", icon: HandCoins, href: "/ipr-expert/commercialization" },
  { label: "Intelligence", icon: Radar, href: "/ipr-expert/intelligence" },
  {
    label: "Clients",
    icon: Users,
    href: "/ipr-expert/clients",
    subs: [
      { name: "Active", href: "/ipr-expert/clients/active", soon: true },
      { name: "Requests", href: "/ipr-expert/clients/requests", soon: true },
    ],
  },
  { label: "Compliance", icon: BadgeCheck, href: "/ipr-expert/compliance" },
];

export const iprUtility: AppNavGroup[] = [
  { label: "Documents", icon: FileText, href: "/ipr-expert/documents" },
  { label: "Settings", icon: Settings, href: "/ipr-expert/settings" },
];

export const iprBottom: AppNavGroup[] = [
  { label: "Help & Support", icon: LifeBuoy, href: "#" },
  { label: "Log out", icon: LogOut, href: "/login" },
];

export const iprUser: AppUser = {
  name: "Kavya Reddy",
  role: "IP Attorney",
  org: "Kavya Reddy",
  initials: "KR",
  home: "/ipr-expert",
  copilot: false,
};
