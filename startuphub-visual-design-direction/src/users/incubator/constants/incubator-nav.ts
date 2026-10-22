import {
  Activity,
  BarChart3,
  Building2,
  CalendarDays,
  FileText,
  HelpCircle,
  Layers,
  LayoutDashboard,
  MessagesSquare,
  Rocket,
  Settings,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import type { AppNavGroup } from "@/components/app/app-shell";

export const incubatorUser = {
  name: "Meera Iyer",
  role: "Program Director",
  org: "StartupHub Labs",
  initials: "MI",
  home: "/incubator",
};

export const incubatorNav: AppNavGroup[] = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/incubator" },
  {
    label: "My Organization", icon: Building2, href: "/incubator/organization",
    subs: [
      { name: "Organization Profile", href: "/incubator/organization" },
      { name: "Team & Staff", href: "/incubator/organization/team" },
      { name: "Roles & Permissions", href: "/incubator/organization/roles" },
      { name: "Organization Documents", href: "/incubator/organization/documents" },
    ],
  },
  {
    label: "Programs", icon: Workflow, href: "/incubator/programs",
    subs: [
      { name: "Program Management", href: "/incubator/programs" },
      { name: "Program Discovery", href: "/incubator/programs/discover" },
      { name: "Applications", href: "/incubator/programs/applications" },
      { name: "Applicant Evaluation", href: "/incubator/programs/evaluation" },
      { name: "Startup Selection", href: "/incubator/programs/selection" },
      { name: "Program Calendar", href: "/incubator/programs/calendar" },
    ],
  },
  {
    label: "Cohorts", icon: Users, href: "/incubator/cohorts",
    subs: [
      { name: "Cohort Management", href: "/incubator/cohorts" },
      { name: "Cohort VI (active)", href: "/incubator/cohorts/cohort-vi" },
      { name: "Cohort Progress", href: "/incubator/cohorts#progress", soon: true },
      { name: "Cohort Analytics", href: "/incubator/cohorts/analytics" },
    ],
  },
  {
    label: "Startups", icon: Rocket, href: "/incubator/startups",
    subs: [
      { name: "Startup Portfolio", href: "/incubator/startups" },
      { name: "Startup Assessment", href: "/incubator/startups/assessment" },
      { name: "At-Risk Startups", href: "/incubator/startups#risks", soon: true },
      { name: "Interventions", href: "/incubator/startups/interventions" },
    ],
  },
  {
    label: "Milestones & Roadmaps", icon: Target, href: "/incubator/milestones",
    subs: [
      { name: "All Milestones", href: "/incubator/milestones" },
      { name: "Roadmaps", href: "/incubator/milestones/roadmaps" },
    ],
  },
  {
    label: "Mentors", icon: ShieldCheck, href: "/incubator/mentors",
    subs: [
      { name: "Mentor Management", href: "/incubator/mentors" },
      { name: "Mentor Discovery", href: "/incubator/mentors/discover" },
      { name: "Mentor Assignments", href: "/incubator/mentors/assignments" },
      { name: "Mentorship Tracking", href: "/incubator/mentors/tracking" },
    ],
  },
  {
    label: "Resources", icon: Layers, href: "/incubator/resources",
    subs: [
      { name: "Resource Inventory", href: "/incubator/resources" },
      { name: "Resource Requests", href: "/incubator/resources#requests", soon: true },
      { name: "Resource Allocation", href: "/incubator/resources#allocation", soon: true },
      { name: "Utilization", href: "/incubator/resources/utilization" },
    ],
  },
  {
    label: "Startup Support", icon: TrendingUp, href: "/incubator/support",
    subs: [
      { name: "Funding Support", href: "/incubator/support/funding" },
      { name: "IPR Support", href: "/incubator/support/ipr" },
      { name: "Market Support", href: "/incubator/support#market", soon: true },
      { name: "Investor Connections", href: "/incubator/support#investors", soon: true },
    ],
  },
  { label: "Events & Workshops", icon: CalendarDays, href: "/incubator/events" },
  {
    label: "Performance", icon: TrendingUp, href: "/incubator/performance",
    subs: [
      { name: "Startup Performance", href: "/incubator/performance" },
      { name: "Health Monitoring", href: "/incubator/performance/health" },
      { name: "Risk Monitoring", href: "/incubator/performance/risks" },
    ],
  },
  {
    label: "Reports & Analytics", icon: BarChart3, href: "/incubator/reports",
    subs: [
      { name: "Startup Reports", href: "/incubator/reports" },
      { name: "Cohort Analytics", href: "/incubator/reports#cohorts", soon: true },
      { name: "Program Analytics", href: "/incubator/reports#programs", soon: true },
      { name: "Outcome Tracking", href: "/incubator/reports/outcomes" },
    ],
  },
];

export const incubatorUtility: AppNavGroup[] = [
  { label: "Documents", icon: FileText, href: "/incubator/documents" },
  { label: "Messages", icon: MessagesSquare, href: "/incubator/messages" },
  { label: "Activity", icon: Activity, href: "/incubator/activity" },
];

export const incubatorBottom: AppNavGroup[] = [
  { label: "Settings", icon: Settings, href: "/incubator/settings" },
  { label: "Help & Support", icon: HelpCircle, href: "/incubator/help" },
];
