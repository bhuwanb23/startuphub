import {
  Activity,
  BarChart3,
  Bell,
  Boxes,
  CalendarDays,
  ClipboardList,
  FolderOpen,
  Gauge,
  LayoutDashboard,
  LifeBuoy,
  Mail,
  Receipt,
  Settings,
  Store,
  UserCircle,
  Wallet,
} from "lucide-react";
import type {
  AppNavGroup,
  AppNavItem,
  AppUser,
} from "@/components/app/app-shell";

/* Resource Provider workspace navigation — Vertex Labs & Compute. */
export const providerNav: AppNavGroup[] = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/provider" },
  {
    label: "My Profile",
    icon: UserCircle,
    href: "/provider/profile",
    subs: [
      { name: "Provider Profile", href: "/provider/profile" },
      { name: "Organization Details", href: "/provider/profile/organization" },
      { name: "Team & Staff", href: "/provider/profile/team" },
      { name: "Expertise & Capabilities", href: "/provider/profile/expertise" },
      { name: "Availability", href: "/provider/profile/availability" },
    ],
  },
  {
    label: "Resources",
    icon: Boxes,
    href: "/provider/resources",
    subs: [
      { name: "Resource Listing", href: "/provider/resources" },
      { name: "Resource Profile", href: "/provider/resources/profile" },
      { name: "My Resources", href: "/provider/resources/inventory" },
      { name: "Categories", href: "/provider/resources/categories" },
      { name: "Availability", href: "/provider/resources/availability" },
      { name: "Pricing", href: "/provider/resources/pricing" },
      { name: "Packages", href: "/provider/resources/packages" },
      { name: "Documents", href: "/provider/resources/documents" },
    ],
  },
  {
    label: "Marketplace",
    icon: Store,
    href: "/provider/marketplace",
    subs: [
      { name: "Resource Discovery", href: "/provider/marketplace" },
      { name: "Startup Matching", href: "/provider/marketplace/matching" },
      { name: "Recommended Startups", href: "/provider/marketplace/recommended" },
      { name: "Opportunities", href: "/provider/marketplace/opportunities" },
    ],
  },
  {
    label: "Requests & Bookings",
    icon: ClipboardList,
    href: "/provider/requests",
    subs: [
      { name: "Request Management", href: "/provider/requests" },
      { name: "Booking Management", href: "/provider/bookings" },
      { name: "Allocation Management", href: "/provider/allocations" },
      { name: "Calendar", href: "/provider/bookings/calendar" },
      { name: "Booking History", href: "/provider/bookings/history" },
    ],
  },
  {
    label: "Usage & Performance",
    icon: Gauge,
    href: "/provider/usage",
    subs: [
      { name: "Usage Tracking", href: "/provider/usage" },
      { name: "Resource Utilization", href: "/provider/usage/utilization" },
      { name: "Resource Performance", href: "/provider/usage/performance" },
      { name: "Service Management", href: "/provider/usage/services" },
      { name: "Service Feedback", href: "/provider/usage/feedback" },
    ],
  },
  {
    label: "Analytics",
    icon: BarChart3,
    href: "/provider/analytics",
    subs: [
      { name: "Provider Analytics", href: "/provider/analytics" },
      { name: "Resource Analytics", href: "/provider/analytics/resources" },
      { name: "Usage Analytics", href: "/provider/analytics/usage" },
      { name: "Revenue Analytics", href: "/provider/analytics/revenue" },
      { name: "Performance Reports", href: "/provider/analytics/reports" },
    ],
  },
  {
    label: "Payments",
    icon: Wallet,
    href: "/provider/payments",
    subs: [
      { name: "Payment Overview", href: "/provider/payments" },
      { name: "Transactions", href: "/provider/payments/transactions" },
      { name: "Earnings", href: "/provider/payments/earnings" },
      { name: "Invoices", href: "/provider/payments/invoices" },
      { name: "Payouts", href: "/provider/payments/payouts" },
      { name: "Payment History", href: "/provider/payments/history" },
    ],
  },
  { label: "Documents", icon: FolderOpen, href: "/provider/documents" },
  { label: "Messages", icon: Mail, href: "/provider/messages" },
  { label: "Notifications", icon: Bell, href: "/provider/notifications" },
  { label: "Activity", icon: Activity, href: "/provider/activity" },
];

export const providerUtility: AppNavItem[] = [
  { name: "Help & Support", href: "/provider/help", icon: LifeBuoy },
];

export const providerBottom: AppNavItem[] = [
  { name: "Settings", href: "/provider/settings", icon: Settings },
  { name: "Payout Center", href: "/provider/payments/payouts", icon: Receipt },
];

export const providerUser: AppUser = {
  name: "Karan Malhotra",
  role: "Head of Operations",
  org: "Vertex Labs & Compute",
  initials: "KM",
  home: "/provider",
};
