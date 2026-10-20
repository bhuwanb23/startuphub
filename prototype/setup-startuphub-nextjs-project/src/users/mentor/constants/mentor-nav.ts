import {
  Award,
  Building2,
  CalendarDays,
  Compass,
  FileText,
  HeartHandshake,
  LifeBuoy,
  LogOut,
  Settings,
} from "lucide-react";
import type { AppNavGroup, AppUser } from "@/components/app/app-shell";

export const mentorNav: AppNavGroup[] = [
  { label: "Overview", icon: Compass, href: "/mentor" },
  {
    label: "Mentorship",
    icon: HeartHandshake,
    href: "/mentor/mentorship",
    subs: [
      { name: "Tasks", href: "/mentor/mentorship/tasks", soon: true },
      { name: "Milestones", href: "/mentor/mentorship/milestones", soon: true },
      { name: "Scheduling", href: "/mentor/mentorship/scheduling", soon: true },
      { name: "Documents", href: "/mentor/mentorship/documents", soon: true },
    ],
  },
  {
    label: "Startups",
    icon: Building2,
    href: "/mentor/startups",
    subs: [
      { name: "Assigned", href: "/mentor/startups/assigned", soon: true },
      { name: "Matching", href: "/mentor/startups/matching", soon: true },
      { name: "Requests", href: "/mentor/startups/requests", soon: true },
    ],
  },
  { label: "Impact", icon: Award, href: "/mentor/impact" },
  { label: "Calendar", icon: CalendarDays, href: "/mentor/calendar" },
];

export const mentorUtility: AppNavGroup[] = [
  { label: "Documents", icon: FileText, href: "/mentor/documents" },
  { label: "Settings", icon: Settings, href: "/mentor/settings" },
];

export const mentorBottom: AppNavGroup[] = [
  { label: "Help & Support", icon: LifeBuoy, href: "#" },
  { label: "Log out", icon: LogOut, href: "/login" },
];

export const mentorUser: AppUser = {
  name: "Priya Nair",
  role: "Mentor · GTM & Growth",
  org: "Priya Nair",
  initials: "PN",
  home: "/mentor",
  copilot: false,
};
