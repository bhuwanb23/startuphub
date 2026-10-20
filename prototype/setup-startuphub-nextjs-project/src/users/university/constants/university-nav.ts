import {
  Activity,
  BarChart3,
  Bell,
  Building2,
  CalendarDays,
  FileText,
  FlaskConical,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  MessageSquare,
  Microscope,
  Rocket,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";
import type { AppNavGroup, AppUser } from "@/components/app/app-shell";

/* University / Research Institution workspace — research discovery →
   IP protection → technology transfer → commercialization → spin-offs. */

export const universityNav: AppNavGroup[] = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/university" },
  {
    label: "My Institution",
    icon: Building2,
    href: "/university/institution",
    subs: [
      { name: "Institution Profile", href: "/university/institution" },
      { name: "Departments & Faculties", href: "/university/institution/departments" },
      { name: "Research Centers", href: "/university/institution/centers", soon: true },
      { name: "Institution Documents", href: "/university/institution/documents", soon: true },
      { name: "Roles & Permissions", href: "/university/institution/roles", soon: true },
    ],
  },
  {
    label: "People & Expertise",
    icon: Users,
    href: "/university/people",
    subs: [
      { name: "Researcher Profiles", href: "/university/people" },
      { name: "Faculty Expertise", href: "/university/people/faculty", soon: true },
      { name: "Student Talent", href: "/university/people/students", soon: true },
      { name: "Research Teams", href: "/university/people/teams", soon: true },
      { name: "Expertise Directory", href: "/university/people/expertise", soon: true },
    ],
  },
  {
    label: "Research & Innovation",
    icon: FlaskConical,
    href: "/university/research",
    subs: [
      { name: "Research Projects", href: "/university/research" },
      { name: "Research Funding", href: "/university/research/funding" },
      { name: "Research Discovery", href: "/university/research/discovery", soon: true },
      { name: "Technology Discovery", href: "/university/research/technology", soon: true },
      { name: "Collaboration", href: "/university/research/collaboration", soon: true },
      { name: "Project Tracking", href: "/university/research/tracking", soon: true },
    ],
  },
  {
    label: "Intellectual Property",
    icon: ShieldCheck,
    href: "/university/ip",
    subs: [
      { name: "Patent Portfolio", href: "/university/ip" },
      { name: "IP Licensing", href: "/university/ip/licensing" },
      { name: "Technology Transfer", href: "/university/ip/transfer" },
      { name: "IP Assessment", href: "/university/ip/assessment", soon: true },
      { name: "IP Agreements", href: "/university/ip/agreements", soon: true },
      { name: "IP Commercialization", href: "/university/ip/commercialization", soon: true },
    ],
  },
  {
    label: "Infrastructure",
    icon: Microscope,
    href: "/university/infrastructure",
    subs: [
      { name: "Lab Management", href: "/university/infrastructure" },
      { name: "Facility Booking", href: "/university/infrastructure/booking", soon: true },
      { name: "Equipment Inventory", href: "/university/infrastructure/equipment", soon: true },
      { name: "Resource Sharing", href: "/university/infrastructure/sharing", soon: true },
      { name: "Utilization Tracking", href: "/university/infrastructure/utilization", soon: true },
    ],
  },
  {
    label: "Commercialization",
    icon: Rocket,
    href: "/university/commercialization",
    subs: [
      { name: "Startup Spin-offs", href: "/university/commercialization" },
      { name: "Startup Matching", href: "/university/commercialization/matching" },
      { name: "Technology Showcase", href: "/university/commercialization/showcase" },
      { name: "Industry Collaboration", href: "/university/commercialization/industry", soon: true },
      { name: "Licensing Opportunities", href: "/university/commercialization/licensing", soon: true },
      { name: "Tracking", href: "/university/commercialization/tracking", soon: true },
    ],
  },
  { label: "Analytics", icon: BarChart3, href: "/university/analytics" },
];

export const universityUtility: AppNavGroup[] = [
  { label: "Documents", icon: FileText, href: "/university/documents" },
  { label: "Calendar", icon: CalendarDays, href: "/university/calendar" },
  { label: "Messages", icon: MessageSquare, href: "/university/messages" },
  { label: "Notifications", icon: Bell, href: "/university/notifications" },
  { label: "Activity", icon: Activity, href: "/university/activity" },
];

export const universityBottom: AppNavGroup[] = [
  { label: "Settings", icon: Settings, href: "/university/settings" },
  { label: "Help & Support", icon: LifeBuoy, href: "/university/help" },
  { label: "Log out", icon: LogOut, href: "/login" },
];

export const universityUser: AppUser = {
  name: "Dr. Amara Deshpande",
  role: "Director · Technology Transfer",
  org: "Crestmont University",
  initials: "AD",
  home: "/university",
  copilot: true,
};
