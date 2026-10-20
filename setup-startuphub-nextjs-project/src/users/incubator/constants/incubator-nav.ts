import {
  BarChart3,
  Building2,
  Compass,
  FileText,
  Layers,
  LifeBuoy,
  LogOut,
  Settings,
  Target,
  Users,
  Wrench,
} from "lucide-react";
import type { AppNavGroup, AppUser } from "@/components/app/app-shell";

export const incubatorNav: AppNavGroup[] = [
  { label: "Overview", icon: Compass, href: "/incubator" },
  {
    label: "Cohorts",
    icon: Layers,
    href: "/incubator/cohorts",
    subs: [
      { name: "All cohorts", href: "/incubator/cohorts/all", soon: true },
      { name: "Analytics", href: "/incubator/cohorts/analytics", soon: true },
    ],
  },
  { label: "Programs", icon: Target, href: "/incubator/programs" },
  {
    label: "Startups",
    icon: Building2,
    href: "/incubator/startups",
    subs: [
      { name: "Assessment", href: "/incubator/startups/assessment", soon: true },
      { name: "Interventions", href: "/incubator/startups/interventions", soon: true },
    ],
  },
  { label: "Mentors", icon: Users, href: "/incubator/mentors" },
  { label: "Performance", icon: BarChart3, href: "/incubator/performance" },
  { label: "Resources", icon: Wrench, href: "/incubator/resources" },
];

export const incubatorUtility: AppNavGroup[] = [
  { label: "Reports", icon: FileText, href: "/incubator/reports" },
  { label: "Organization", icon: Settings, href: "/incubator/organization" },
];

export const incubatorBottom: AppNavGroup[] = [
  { label: "Help & Support", icon: LifeBuoy, href: "#" },
  { label: "Log out", icon: LogOut, href: "/login" },
];

export const incubatorUser: AppUser = {
  name: "Sana Merchant",
  role: "Program Director",
  org: "Nexus Labs",
  initials: "SM",
  home: "/incubator",
  copilot: true,
};
