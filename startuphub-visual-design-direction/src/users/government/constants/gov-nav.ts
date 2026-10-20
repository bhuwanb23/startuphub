import {
  Activity,
  Banknote,
  BarChart3,
  Bell,
  Brain,
  Building2,
  CalendarDays,
  ClipboardCheck,
  FileText,
  FolderOpen,
  Gauge,
  LayoutDashboard,
  LifeBuoy,
  ListChecks,
  Mail,
  School,
  Settings,
  ShieldCheck,
  Target,
  Trophy,
} from "lucide-react";
import type {
  AppNavGroup,
  AppNavItem,
  AppUser,
} from "@/components/app/app-shell";

/* Government workspace navigation — State Innovation Mission. */
export const govNav: AppNavGroup[] = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/government" },
  {
    label: "My Organization",
    icon: Building2,
    href: "/government/organization",
    subs: [
      { name: "Organization Profile", href: "/government/organization" },
      { name: "Departments & Teams", href: "/government/organization/departments" },
      { name: "Roles & Permissions", href: "/government/organization/roles" },
      { name: "Organization Documents", href: "/government/organization/documents" },
    ],
  },
  {
    label: "Startup Registry",
    icon: ClipboardCheck,
    href: "/government/registry",
    subs: [
      { name: "Startup Registry", href: "/government/registry" },
      { name: "Startup Discovery", href: "/government/registry/discovery" },
      { name: "Startup Verification", href: "/government/registry/verification" },
      { name: "Startup Profiles", href: "/government/registry/profiles" },
      { name: "Verification Queue", href: "/government/registry/queue" },
      { name: "Registry Analytics", href: "/government/registry/analytics" },
    ],
  },
  {
    label: "Programs & Schemes",
    icon: ListChecks,
    href: "/government/programs",
    subs: [
      { name: "Scheme Management", href: "/government/programs" },
      { name: "Grant Management", href: "/government/programs/grants" },
      { name: "Funding Programs", href: "/government/programs/funding" },
      { name: "Startup Eligibility", href: "/government/programs/eligibility" },
      { name: "Startup Matching", href: "/government/programs/matching" },
      { name: "Applications", href: "/government/programs/applications" },
      { name: "Program Calendar", href: "/government/programs/calendar" },
    ],
  },
  {
    label: "Challenges",
    icon: Trophy,
    href: "/government/challenges",
    subs: [
      { name: "Challenge Management", href: "/government/challenges" },
      { name: "Active Challenges", href: "/government/challenges/active" },
      { name: "Applications", href: "/government/challenges/applications" },
      { name: "Evaluation", href: "/government/challenges/evaluation" },
      { name: "Selection", href: "/government/challenges/selection" },
      { name: "Challenge Outcomes", href: "/government/challenges/outcomes" },
    ],
  },
  {
    label: "Incubation Ecosystem",
    icon: School,
    href: "/government/incubation",
    subs: [
      { name: "Incubator Management", href: "/government/incubation" },
      { name: "Incubator Directory", href: "/government/incubation/directory" },
      { name: "Incubator Performance", href: "/government/incubation/performance" },
      { name: "Accelerator Management", href: "/government/incubation/accelerators" },
      { name: "Ecosystem Partners", href: "/government/incubation/partners" },
    ],
  },
  {
    label: "Funding & Resources",
    icon: Banknote,
    href: "/government/funding",
    subs: [
      { name: "Funding Overview", href: "/government/funding" },
      { name: "Grant Allocation", href: "/government/funding/allocation" },
      { name: "Resource Allocation", href: "/government/funding/resources" },
      { name: "Fund Utilization", href: "/government/funding/utilization" },
      { name: "Allocation Tracking", href: "/government/funding/tracking" },
    ],
  },
  {
    label: "Analytics",
    icon: BarChart3,
    href: "/government/analytics",
    subs: [
      { name: "Ecosystem Analytics", href: "/government/analytics" },
      { name: "Startup Analytics", href: "/government/analytics/startups" },
      { name: "Sector Analytics", href: "/government/analytics/sectors" },
      { name: "Regional Analytics", href: "/government/analytics/regional" },
      { name: "Funding Analytics", href: "/government/analytics/funding" },
      { name: "Employment Analytics", href: "/government/analytics/employment" },
      { name: "IPR Analytics", href: "/government/analytics/ipr" },
      { name: "Growth Analytics", href: "/government/analytics/growth" },
    ],
  },
  {
    label: "Program Performance",
    icon: Gauge,
    href: "/government/performance",
    subs: [
      { name: "Program Overview", href: "/government/performance" },
      { name: "Program KPIs", href: "/government/performance/kpis" },
      { name: "Beneficiary Performance", href: "/government/performance/beneficiaries" },
      { name: "Funding Performance", href: "/government/performance/funding" },
      { name: "Outcome Tracking", href: "/government/performance/outcomes" },
    ],
  },
  {
    label: "Impact Assessment",
    icon: Target,
    href: "/government/impact",
    subs: [
      { name: "Impact Dashboard", href: "/government/impact" },
      { name: "Economic Impact", href: "/government/impact/economic" },
      { name: "Employment Impact", href: "/government/impact/employment" },
      { name: "Innovation Impact", href: "/government/impact/innovation" },
      { name: "Regional Impact", href: "/government/impact/regional" },
      { name: "Social Impact", href: "/government/impact/social" },
    ],
  },
  {
    label: "Policy Intelligence",
    icon: Brain,
    href: "/government/policy",
    subs: [
      { name: "Policy Insights", href: "/government/policy" },
      { name: "Trend Analysis", href: "/government/policy/trends" },
      { name: "Gap Analysis", href: "/government/policy/gaps" },
      { name: "Opportunity Analysis", href: "/government/policy/opportunities" },
      { name: "Policy Recommendations", href: "/government/policy/recommendations" },
      { name: "Scenario Analysis", href: "/government/policy/scenarios" },
    ],
  },
  {
    label: "Reports",
    icon: FileText,
    href: "/government/reports",
    subs: [
      { name: "Startup Reports", href: "/government/reports" },
      { name: "Program Reports", href: "/government/reports/programs" },
      { name: "Funding Reports", href: "/government/reports/funding" },
      { name: "Ecosystem Reports", href: "/government/reports/ecosystem" },
      { name: "Impact Reports", href: "/government/reports/impact" },
      { name: "Custom Reports", href: "/government/reports/custom" },
    ],
  },
  { label: "Documents", icon: FolderOpen, href: "/government/documents" },
  { label: "Calendar", icon: CalendarDays, href: "/government/calendar" },
  { label: "Messages", icon: Mail, href: "/government/messages" },
  { label: "Notifications", icon: Bell, href: "/government/notifications" },
  { label: "Activity", icon: Activity, href: "/government/activity" },
];

export const govUtility: AppNavItem[] = [
  { name: "Help & Support", href: "/government/help", icon: LifeBuoy },
];

export const govBottom: AppNavItem[] = [
  { name: "Settings", href: "/government/settings", icon: Settings },
  { name: "Audit & Compliance", href: "/government/activity", icon: ShieldCheck },
];

export const govUser: AppUser = {
  name: "Sunita Verma",
  role: "Mission Director",
  org: "State Innovation Mission",
  initials: "SV",
  home: "/government",
};
