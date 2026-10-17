import {
  Activity,
  BarChart3,
  Bell,
  Briefcase,
  CalendarDays,
  FileText,
  HelpCircle,
  LayoutDashboard,
  MessageSquare,
  Search,
  Settings,
  ShieldCheck,
  Scale,
  UserRound,
} from "lucide-react";
import type { AppNavGroup } from "@/components/app/app-shell";

export const iprUser = {
  name: "Dr. Kavita Rao",
  role: "IPR Expert · Patent Strategist",
  org: "StartupHub IPR Desk",
  initials: "KR",
  home: "/ipr-expert",
};

export const iprNav: AppNavGroup[] = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/ipr-expert" },
  {
    label: "My Profile", icon: UserRound, href: "/ipr-expert/profile",
    subs: [
      { name: "Professional Profile", href: "/ipr-expert/profile" },
      { name: "Expertise Management", href: "/ipr-expert/profile#expertise", soon: true },
      { name: "Credentials & Experience", href: "/ipr-expert/profile#credentials", soon: true },
      { name: "Availability", href: "/ipr-expert/profile#availability", soon: true },
    ],
  },
  {
    label: "Clients & Startups", icon: Briefcase, href: "/ipr-expert/clients",
    subs: [
      { name: "Client Management", href: "/ipr-expert/clients" },
      { name: "Startup Discovery", href: "/ipr-expert/clients/discovery" },
      { name: "Client Requests", href: "/ipr-expert/clients/requests" },
    ],
  },
  {
    label: "IP Intelligence", icon: Search, href: "/ipr-expert/intelligence",
    subs: [
      { name: "IP Discovery", href: "/ipr-expert/intelligence" },
      { name: "IP Assessment", href: "/ipr-expert/intelligence/assessment" },
      { name: "Prior-Art Search", href: "/ipr-expert/intelligence/prior-art" },
      { name: "Patentability Assessment", href: "/ipr-expert/intelligence/patentability" },
      { name: "IP Strategy", href: "/ipr-expert/intelligence/strategy" },
    ],
  },
  {
    label: "IP Management", icon: Scale, href: "/ipr-expert/ip/patents",
    subs: [
      { name: "Patent Management", href: "/ipr-expert/ip/patents" },
      { name: "Trademark Management", href: "/ipr-expert/ip/trademarks" },
      { name: "Copyright Management", href: "/ipr-expert/ip/copyright", soon: true },
      { name: "Design Management", href: "/ipr-expert/ip/designs", soon: true },
      { name: "Trade Secrets", href: "/ipr-expert/ip/trade-secrets", soon: true },
      { name: "IP Portfolio", href: "/ipr-expert/ip/portfolio" },
    ],
  },
  {
    label: "Filing & Cases", icon: FileText, href: "/ipr-expert/filings",
    subs: [
      { name: "Filing Management", href: "/ipr-expert/filings" },
      { name: "Case Management", href: "/ipr-expert/filings/cases" },
      { name: "Case Tracking", href: "/ipr-expert/filings#tracking", soon: true },
      { name: "Legal Consultation", href: "/ipr-expert/filings#consult", soon: true },
    ],
  },
  {
    label: "Commercialization", icon: BarChart3, href: "/ipr-expert/commercialization",
    subs: [
      { name: "IP Valuation", href: "/ipr-expert/commercialization" },
      { name: "Licensing Management", href: "/ipr-expert/commercialization/licensing" },
      { name: "IP Transfer", href: "/ipr-expert/commercialization/transfer", soon: true },
    ],
  },
  {
    label: "Compliance", icon: ShieldCheck, href: "/ipr-expert/compliance",
    subs: [
      { name: "Deadline Management", href: "/ipr-expert/compliance" },
      { name: "Renewal Management", href: "/ipr-expert/compliance/renewals" },
      { name: "IP Risk Assessment", href: "/ipr-expert/compliance/risks" },
    ],
  },
];

export const iprUtility: AppNavGroup[] = [
  { label: "Documents", icon: FileText, href: "/ipr-expert/documents" },
  { label: "Calendar", icon: CalendarDays, href: "/ipr-expert/calendar" },
  { label: "Messages", icon: MessageSquare, href: "/ipr-expert/messages" },
  { label: "Notifications", icon: Bell, href: "/ipr-expert/notifications" },
  { label: "Activity", icon: Activity, href: "/ipr-expert/activity" },
];

export const iprBottom: AppNavGroup[] = [
  { label: "Settings", icon: Settings, href: "/ipr-expert/settings" },
  { label: "Help & Support", icon: HelpCircle, href: "/ipr-expert/help" },
];
