import {
  BarChart3,
  BrainCircuit,
  CreditCard,
  FolderKanban,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  Network,
  Settings2,
  ShieldCheck,
  Users,
} from "lucide-react";
import type { AppNavGroup, AppUser } from "@/components/app/app-shell";

export const adminUser: AppUser = {
  name: "Kabir Malhotra",
  role: "Super Admin",
  org: "StartupHub",
  initials: "KM",
  home: "/admin",
  copilot: false,
};

/* Compact sidebar per architecture §23 — full subpages inside each group */
export const adminNav: AppNavGroup[] = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  {
    label: "Identity & Access",
    icon: Users,
    href: "/admin/identity/users",
    subs: [
      { name: "User Management", href: "/admin/identity/users" },
      { name: "Role Management", href: "/admin/identity/roles" },
      { name: "Permission Management", href: "/admin/identity/permissions" },
      { name: "Organization Management", href: "/admin/identity/organizations" },
    ],
  },
  {
    label: "Ecosystem Management",
    icon: Network,
    href: "/admin/ecosystem/startups",
    subs: [
      { name: "Startup", href: "/admin/ecosystem/startups" },
      { name: "Incubator", href: "/admin/ecosystem/incubators" },
      { name: "Mentor", href: "/admin/ecosystem/mentors" },
      { name: "Investor", href: "/admin/ecosystem/investors" },
      { name: "IPR Expert", href: "/admin/ecosystem/ipr-experts" },
      { name: "Resource Provider", href: "/admin/ecosystem/resource-providers" },
      { name: "Corporate", href: "/admin/ecosystem/corporates" },
      { name: "Institution", href: "/admin/ecosystem/institutions" },
    ],
  },
  {
    label: "Governance",
    icon: ShieldCheck,
    href: "/admin/verification",
    subs: [
      { name: "Verification Management", href: "/admin/verification" },
      { name: "Moderation", href: "/admin/moderation" },
      { name: "Audit Logs", href: "/admin/audit" },
    ],
  },
  {
    label: "Content & Programs",
    icon: FolderKanban,
    href: "/admin/content",
    subs: [
      { name: "Content Management", href: "/admin/content" },
      { name: "Market Content", href: "/admin/market-content" },
      { name: "Program Management", href: "/admin/programs" },
      { name: "Event Management", href: "/admin/events" },
    ],
  },
  {
    label: "AI & Intelligence",
    icon: BrainCircuit,
    href: "/admin/ai",
    subs: [
      { name: "AI Management", href: "/admin/ai" },
      { name: "Matching Engine", href: "/admin/ai/matching" },
      { name: "Recommendations", href: "/admin/ai/recommendations" },
      { name: "Risk Engine", href: "/admin/ai/risk" },
    ],
  },
  {
    label: "Analytics",
    icon: BarChart3,
    href: "/admin/analytics",
    subs: [
      { name: "Platform Analytics", href: "/admin/analytics" },
      { name: "Ecosystem Analytics", href: "/admin/analytics/ecosystem" },
    ],
  },
  {
    label: "Finance",
    icon: CreditCard,
    href: "/admin/payments",
    subs: [
      { name: "Payment Management", href: "/admin/payments" },
      { name: "Subscription Management", href: "/admin/subscriptions" },
      { name: "Report Management", href: "/admin/reports" },
    ],
  },
  {
    label: "Platform Operations",
    icon: Settings2,
    href: "/admin/notifications",
    subs: [
      { name: "Notification Management", href: "/admin/notifications" },
      { name: "System Configuration", href: "/admin/config" },
    ],
  },
];

export const adminBottom: AppNavGroup[] = [
  { label: "Help & Support", icon: LifeBuoy, href: "/admin/support" },
  { label: "Log out", icon: LogOut, href: "/login" },
];
