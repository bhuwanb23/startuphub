import {
  Activity,
  Award,
  BarChart3,
  Bell,
  Briefcase,
  CalendarDays,
  Compass,
  FileText,
  Handshake,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  MessageSquare,
  Send,
  Settings,
  Star,
  User,
} from "lucide-react";
import type { AppNavGroup, AppUser } from "@/components/app/app-shell";

/* Talent / Professional workspace — profile → skills → discovery →
   AI matching → applications → work execution → verified reputation. */

export const talentNav: AppNavGroup[] = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/talent" },
  {
    label: "My Profile",
    icon: User,
    href: "/talent/profile",
    subs: [
      { name: "Professional Profile", href: "/talent/profile" },
      { name: "Skill Profile", href: "/talent/profile/skills", soon: true },
      { name: "Portfolio", href: "/talent/profile/portfolio", soon: true },
      { name: "Experience", href: "/talent/profile/experience", soon: true },
      { name: "Education & Certifications", href: "/talent/profile/education", soon: true },
      { name: "Availability", href: "/talent/profile/availability", soon: true },
    ],
  },
  {
    label: "Discover",
    icon: Compass,
    href: "/talent/discover",
    subs: [
      { name: "Opportunities", href: "/talent/discover" },
      { name: "Startup Discovery", href: "/talent/discover/startups", soon: true },
      { name: "Startup Matching", href: "/talent/discover/matching" },
      { name: "Jobs", href: "/talent/discover/jobs", soon: true },
      { name: "Projects", href: "/talent/discover/projects", soon: true },
      { name: "Freelance", href: "/talent/discover/freelance", soon: true },
      { name: "Consulting", href: "/talent/discover/consulting", soon: true },
    ],
  },
  {
    label: "Collaborate",
    icon: Handshake,
    href: "/talent/collaborate",
    subs: [
      { name: "My Collaborations", href: "/talent/collaborate" },
      { name: "Collaboration Requests", href: "/talent/collaborate/requests", soon: true },
      { name: "Saved Opportunities", href: "/talent/collaborate/saved", soon: true },
      { name: "Recommended", href: "/talent/collaborate/recommended", soon: true },
    ],
  },
  {
    label: "Applications",
    icon: Send,
    href: "/talent/applications",
    subs: [
      { name: "All Applications", href: "/talent/applications" },
      { name: "Interviews & Meetings", href: "/talent/applications/interviews" },
      { name: "Offers", href: "/talent/applications/offers" },
      { name: "Application History", href: "/talent/applications/history", soon: true },
    ],
  },
  {
    label: "My Work",
    icon: Briefcase,
    href: "/talent/work",
    subs: [
      { name: "Projects", href: "/talent/work" },
      { name: "Tasks", href: "/talent/work/tasks" },
      { name: "Milestones", href: "/talent/work/milestones", soon: true },
      { name: "Deliverables", href: "/talent/work/deliverables", soon: true },
      { name: "Work History", href: "/talent/work/history", soon: true },
      { name: "Work Documents", href: "/talent/work/documents", soon: true },
    ],
  },
  {
    label: "Reputation",
    icon: Star,
    href: "/talent/reputation",
    subs: [
      { name: "Ratings & Reviews", href: "/talent/reputation" },
      { name: "Achievements", href: "/talent/reputation/achievements", soon: true },
      { name: "Work Verification", href: "/talent/reputation/verification", soon: true },
    ],
  },
  { label: "Analytics", icon: BarChart3, href: "/talent/analytics" },
];

export const talentUtility: AppNavGroup[] = [
  { label: "Documents", icon: FileText, href: "/talent/documents" },
  { label: "Calendar", icon: CalendarDays, href: "/talent/calendar" },
  { label: "Messages", icon: MessageSquare, href: "/talent/messages" },
  { label: "Notifications", icon: Bell, href: "/talent/notifications" },
  { label: "Activity", icon: Activity, href: "/talent/activity" },
];

export const talentBottom: AppNavGroup[] = [
  { label: "Settings", icon: Settings, href: "/talent/settings" },
  { label: "Help & Support", icon: LifeBuoy, href: "/talent/help" },
  { label: "Log out", icon: LogOut, href: "/login" },
];

export const talentUser: AppUser = {
  name: "Zoya Khan",
  role: "Senior Product Engineer",
  org: "Zoya Khan",
  initials: "ZK",
  home: "/talent",
  copilot: true,
};

/* kept for parity with other roles' nav files */
export const talentAwards = Award;
