import {
  Activity,
  BarChart3,
  Bell,
  Building2,
  CalendarDays,
  Compass,
  FileText,
  FlaskConical,
  FolderOpen,
  Gauge,
  Handshake,
  LayoutDashboard,
  LifeBuoy,
  Lightbulb,
  Mail,
  Settings,
  ShoppingCart,
  Target,
  TrendingUp,
} from "lucide-react";
import type {
  AppNavGroup,
  AppNavItem,
  AppUser,
} from "@/components/app/app-shell";

/* Corporate workspace navigation — Arjuna Industries. */
export const corporateNav: AppNavGroup[] = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/corporate" },
  {
    label: "My Organization",
    icon: Building2,
    href: "/corporate/organization",
    subs: [
      { name: "Corporate Profile", href: "/corporate/organization" },
      { name: "Industry Profile", href: "/corporate/organization/industry" },
      { name: "Business Units", href: "/corporate/organization/units" },
      { name: "Innovation Team", href: "/corporate/organization/team" },
      { name: "Roles & Permissions", href: "/corporate/organization/roles" },
    ],
  },
  {
    label: "Innovation",
    icon: Lightbulb,
    href: "/corporate/innovation",
    subs: [
      { name: "Innovation Overview", href: "/corporate/innovation" },
      { name: "Problem Statements", href: "/corporate/innovation/problems" },
      { name: "Challenge Management", href: "/corporate/innovation/challenges" },
      { name: "Innovation Themes", href: "/corporate/innovation/themes" },
      { name: "Open Innovation", href: "/corporate/innovation/open" },
      { name: "Innovation Pipeline", href: "/corporate/innovation/pipeline" },
    ],
  },
  {
    label: "Startup Discovery",
    icon: Compass,
    href: "/corporate/discovery",
    subs: [
      { name: "Startup Discovery", href: "/corporate/discovery" },
      { name: "AI Startup Matching", href: "/corporate/discovery/matching" },
      { name: "Technology Scouting", href: "/corporate/discovery/scouting" },
      { name: "Solution Discovery", href: "/corporate/discovery/solutions" },
      { name: "Startup Watchlist", href: "/corporate/discovery/watchlist" },
    ],
  },
  {
    label: "Evaluation",
    icon: Gauge,
    href: "/corporate/evaluation",
    subs: [
      { name: "Startup Evaluation", href: "/corporate/evaluation" },
      { name: "Solution Evaluation", href: "/corporate/evaluation/solution" },
      { name: "Technology Assessment", href: "/corporate/evaluation/technology" },
      { name: "Business Fit", href: "/corporate/evaluation/fit" },
      { name: "Risk Assessment", href: "/corporate/evaluation/risk" },
      { name: "Evaluation History", href: "/corporate/evaluation/history" },
    ],
  },
  {
    label: "Pilots & PoC",
    icon: FlaskConical,
    href: "/corporate/pilots",
    subs: [
      { name: "Pilot Management", href: "/corporate/pilots" },
      { name: "PoC Management", href: "/corporate/pilots/poc" },
      { name: "Pilot Pipeline", href: "/corporate/pilots/pipeline" },
      { name: "Pilot Evaluation", href: "/corporate/pilots/evaluation" },
      { name: "Results & Outcomes", href: "/corporate/pilots/results" },
      { name: "Deployment Readiness", href: "/corporate/pilots/readiness" },
    ],
  },
  {
    label: "Partnerships",
    icon: Handshake,
    href: "/corporate/partnerships",
    subs: [
      { name: "Partnership Management", href: "/corporate/partnerships" },
      { name: "Collaborations", href: "/corporate/partnerships/collaborations" },
      { name: "Strategic Partnerships", href: "/corporate/partnerships/strategic" },
      { name: "Partnership Pipeline", href: "/corporate/partnerships/pipeline" },
      { name: "Partner Performance", href: "/corporate/partnerships/performance" },
      { name: "Partnership History", href: "/corporate/partnerships/history" },
    ],
  },
  {
    label: "Procurement",
    icon: ShoppingCart,
    href: "/corporate/procurement",
    subs: [
      { name: "Vendor Discovery", href: "/corporate/procurement" },
      { name: "Vendor Management", href: "/corporate/procurement/vendors" },
      { name: "Opportunities", href: "/corporate/procurement/opportunities" },
      { name: "Purchase Requests", href: "/corporate/procurement/requests" },
      { name: "Procurement History", href: "/corporate/procurement/history" },
    ],
  },
  {
    label: "Contracts",
    icon: FileText,
    href: "/corporate/contracts",
    subs: [
      { name: "Contract Management", href: "/corporate/contracts" },
      { name: "Active Contracts", href: "/corporate/contracts/active" },
      { name: "Contract Requests", href: "/corporate/contracts/requests" },
      { name: "Contract Review", href: "/corporate/contracts/review" },
      { name: "Renewals", href: "/corporate/contracts/renewals" },
      { name: "Contract Documents", href: "/corporate/contracts/documents" },
    ],
  },
  {
    label: "Performance",
    icon: Target,
    href: "/corporate/performance",
    subs: [
      { name: "Performance Tracking", href: "/corporate/performance" },
      { name: "Startup Performance", href: "/corporate/performance/startups" },
      { name: "Pilot Performance", href: "/corporate/performance/pilots" },
      { name: "Solution Performance", href: "/corporate/performance/solutions" },
      { name: "Partnership Performance", href: "/corporate/performance/partnerships" },
      { name: "KPI Management", href: "/corporate/performance/kpis" },
    ],
  },
  {
    label: "Analytics",
    icon: BarChart3,
    href: "/corporate/analytics",
    subs: [
      { name: "Innovation Analytics", href: "/corporate/analytics" },
      { name: "Startup Analytics", href: "/corporate/analytics/startups" },
      { name: "Technology Analytics", href: "/corporate/analytics/technology" },
      { name: "Pilot Analytics", href: "/corporate/analytics/pilots" },
      { name: "Partnership Analytics", href: "/corporate/analytics/partnerships" },
      { name: "Procurement Analytics", href: "/corporate/analytics/procurement" },
    ],
  },
  { label: "Documents", icon: FolderOpen, href: "/corporate/documents" },
  { label: "Calendar", icon: CalendarDays, href: "/corporate/calendar" },
  { label: "Messages", icon: Mail, href: "/corporate/messages" },
  { label: "Notifications", icon: Bell, href: "/corporate/notifications" },
  { label: "Activity", icon: Activity, href: "/corporate/activity" },
];

export const corporateUtility: AppNavItem[] = [
  { name: "Help & Support", href: "/corporate/help", icon: LifeBuoy },
];

export const corporateBottom: AppNavItem[] = [
  { name: "Settings", href: "/corporate/settings", icon: Settings },
  { name: "Innovation KPIs", href: "/corporate/performance", icon: TrendingUp },
];

export const corporateUser: AppUser = {
  name: "Vikram Sethi",
  role: "Chief Innovation Officer",
  org: "Arjuna Industries",
  initials: "VS",
  home: "/corporate",
};
