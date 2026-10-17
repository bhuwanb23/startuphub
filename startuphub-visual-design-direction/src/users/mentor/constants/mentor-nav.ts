import {
  Activity,
  Bell,
  CalendarDays,
  FileText,
  GraduationCap,
  HelpCircle,
  LayoutDashboard,
  MessageSquare,
  Rocket,
  Settings,
  TrendingUp,
  UserRound,
} from "lucide-react";
import type { AppNavGroup } from "@/components/app/app-shell";

export const mentorUser = {
  name: "Priya Nair",
  role: "Mentor · ex-CTO, ZetaPay",
  org: "Architecture & Scaling",
  initials: "PN",
  home: "/mentor",
};

export const mentorNav: AppNavGroup[] = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/mentor" },
  {
    label: "My Profile", icon: UserRound, href: "/mentor/profile",
    subs: [
      { name: "Expert Profile", href: "/mentor/profile" },
      { name: "Expertise Management", href: "/mentor/profile#expertise", soon: true },
      { name: "Experience & Credentials", href: "/mentor/profile#credentials", soon: true },
      { name: "Availability Management", href: "/mentor/profile#availability", soon: true },
    ],
  },
  {
    label: "Startups", icon: Rocket, href: "/mentor/startups",
    subs: [
      { name: "Startup Discovery", href: "/mentor/startups" },
      { name: "Startup Matching", href: "/mentor/startups/matching" },
      { name: "Mentorship Requests", href: "/mentor/startups/requests" },
      { name: "Assigned Startups", href: "/mentor/startups/assigned" },
    ],
  },
  {
    label: "Mentorship", icon: GraduationCap, href: "/mentor/mentorship",
    subs: [
      { name: "Mentoring Sessions", href: "/mentor/mentorship" },
      { name: "Session Scheduling", href: "/mentor/mentorship/scheduling" },
      { name: "Video Meetings", href: "/mentor/mentorship#video", soon: true },
      { name: "Recommendations", href: "/mentor/mentorship/recommendations" },
      { name: "Task Assignment", href: "/mentor/mentorship/tasks" },
      { name: "Milestone Review", href: "/mentor/mentorship/milestones" },
      { name: "Document Review", href: "/mentor/mentorship/documents" },
    ],
  },
  {
    label: "Monitoring", icon: Activity, href: "/mentor/monitoring",
    subs: [
      { name: "Startup Assessment", href: "/mentor/monitoring" },
      { name: "Progress Tracking", href: "/mentor/monitoring#progress", soon: true },
      { name: "Feedback", href: "/mentor/monitoring/feedback" },
      { name: "Risk & Attention", href: "/mentor/monitoring/risks" },
    ],
  },
  {
    label: "Impact", icon: TrendingUp, href: "/mentor/impact",
    subs: [
      { name: "Mentorship History", href: "/mentor/impact" },
      { name: "Impact Tracking", href: "/mentor/impact#tracking", soon: true },
      { name: "Outcomes", href: "/mentor/impact/outcomes" },
    ],
  },
];

export const mentorUtility: AppNavGroup[] = [
  { label: "Calendar", icon: CalendarDays, href: "/mentor/calendar" },
  { label: "Messages", icon: MessageSquare, href: "/mentor/messages" },
  { label: "Notifications", icon: Bell, href: "/mentor/notifications" },
  { label: "Documents", icon: FileText, href: "/mentor/documents" },
  { label: "Activity", icon: Activity, href: "/mentor/activity" },
];

export const mentorBottom: AppNavGroup[] = [
  { label: "Settings", icon: Settings, href: "/mentor/settings" },
  { label: "Help & Support", icon: HelpCircle, href: "/mentor/help" },
];
