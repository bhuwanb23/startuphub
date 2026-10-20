import {
  Compass,
  FileText,
  Handshake,
  Landmark,
  Lightbulb,
  LifeBuoy,
  LogOut,
  Rocket,
  Settings,
  Users,
} from "lucide-react";
import type { AppNavGroup, AppUser } from "@/components/app/app-shell";

export const founderNav: AppNavGroup[] = [
  { label: "Overview", icon: Compass, href: "/founder" },
  {
    label: "Journey",
    icon: Rocket,
    href: "/founder/journey",
    subs: [
      { name: "Idea", href: "/founder/journey/idea", soon: true },
      { name: "Incubation", href: "/founder/journey/incubation", soon: true },
      { name: "IPR", href: "/founder/journey/ipr", soon: true },
    ],
  },
  {
    label: "Capital",
    icon: Landmark,
    href: "/founder/capital",
    subs: [
      { name: "Funding", href: "/founder/capital/funding", soon: true },
      { name: "Market", href: "/founder/capital/market", soon: true },
    ],
  },
  {
    label: "Network",
    icon: Users,
    href: "/founder/network",
    subs: [
      { name: "Mentors", href: "/founder/network/mentors", soon: true },
      { name: "Opportunities", href: "/founder/network/opportunities", soon: true },
    ],
  },
  { label: "Partners", icon: Handshake, href: "/founder/partners", subs: [{ name: "Resources", href: "/founder/partners/resources", soon: true }] },
];

export const founderUtility: AppNavGroup[] = [
  { label: "Documents", icon: FileText, href: "/founder/documents" },
  { label: "Settings", icon: Settings, href: "/founder/settings" },
];

export const founderBottom: AppNavGroup[] = [
  { label: "Help & Support", icon: LifeBuoy, href: "#" },
  { label: "Log out", icon: LogOut, href: "/login" },
];

export const founderUser: AppUser = {
  name: "Ravi Sharma",
  role: "Founder",
  org: "Lumen AI",
  initials: "RS",
  home: "/founder",
  copilot: true,
};

/* Idea icon kept for journey sub-screens */
export const journeyIcon = Lightbulb;
