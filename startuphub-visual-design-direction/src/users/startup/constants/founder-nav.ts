import {
  Building2,
  CalendarDays,
  Crosshair,
  Users,
  CreditCard,
  FileText,
  Handshake,
  HelpCircle,
  LayoutDashboard,
  Lightbulb,
  MessageSquare,
  Package,
  Rocket,
  Scale,
  Settings,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  BarChart3,
  Wallet,
  type LucideIcon,
} from "lucide-react";

export type FounderSub = { name: string; href: string; soon?: boolean };
export type FounderGroup = {
  label: string;
  icon: LucideIcon;
  href: string; // first sub-page (landing)
  subs?: FounderSub[];
};

export const founderNav: FounderGroup[] = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/founder" },
  {
    label: "My Startup", icon: Rocket, href: "/founder/startup",
    subs: [
      { name: "Startup Profile", href: "/founder/startup" },
      { name: "Founder Profile", href: "/founder/startup/founder-profile" },
      { name: "Team Management", href: "/founder/startup/team" },
      { name: "Startup Assessment", href: "/founder/startup/assessment" },
    ],
  },
  {
    label: "Idea & Validation", icon: Lightbulb, href: "/founder/idea",
    subs: [
      { name: "Idea Management", href: "/founder/idea" },
      { name: "Idea Evaluation", href: "/founder/idea/evaluation" },
      { name: "Idea Validation", href: "/founder/idea/validation" },
      { name: "Customer Discovery", href: "/founder/idea/discovery" },
      { name: "Surveys", href: "/founder/idea/surveys" },
    ],
  },
  {
    label: "Incubation", icon: Building2, href: "/founder/incubation",
    subs: [
      { name: "Discover Incubators", href: "/founder/incubation/discover" },
      { name: "Applications", href: "/founder/incubation" },
      { name: "Incubation Workspace", href: "/founder/incubation/workspace" },
      { name: "Milestones", href: "/founder/incubation/milestones" },
    ],
  },
  {
    label: "Mentors", icon: Users, href: "/founder/mentors",
    subs: [
      { name: "Discover Mentors", href: "/founder/mentors" },
      { name: "Mentor Matching", href: "/founder/mentors/matching" },
      { name: "Mentor Sessions", href: "/founder/mentors/sessions" },
    ],
  },
  {
    label: "IPR & Legal", icon: Scale, href: "/founder/ipr",
    subs: [
      { name: "IPR Overview", href: "/founder/ipr" },
      { name: "Patent Management", href: "/founder/ipr/patents" },
      { name: "Trademark Management", href: "/founder/ipr#trademarks", soon: true },
      { name: "Copyright Management", href: "/founder/ipr#copyright", soon: true },
      { name: "IP Portfolio", href: "/founder/ipr/portfolio" },
      { name: "IP Risk Assessment", href: "/founder/ipr#risk", soon: true },
      { name: "Compliance Tracking", href: "/founder/ipr#compliance", soon: true },
    ],
  },
  {
    label: "Resources", icon: ShoppingBag, href: "/founder/resources",
    subs: [
      { name: "Resource Discovery", href: "/founder/resources" },
      { name: "Resource Matching", href: "/founder/resources#matching", soon: true },
      { name: "Resource Requests", href: "/founder/resources/requests" },
      { name: "Resource Allocation", href: "/founder/resources#allocation", soon: true },
    ],
  },
  {
    label: "Product", icon: Package, href: "/founder/product",
    subs: [
      { name: "MVP Management", href: "/founder/product" },
      { name: "Product Roadmap", href: "/founder/product/roadmap" },
      { name: "Product Validation", href: "/founder/product#validation", soon: true },
    ],
  },
  {
    label: "Market Intelligence", icon: BarChart3, href: "/founder/market",
    subs: [
      { name: "Market Overview", href: "/founder/market" },
      { name: "Reports", href: "/founder/market#reports", soon: true },
      { name: "Trends", href: "/founder/market#trends", soon: true },
      { name: "Competitor Analysis", href: "/founder/market/competitors" },
    ],
  },
  { label: "Customers", icon: Users, href: "/founder/customers" },
  {
    label: "Funding", icon: Wallet, href: "/founder/funding",
    subs: [
      { name: "Funding Overview", href: "/founder/funding" },
      { name: "Funding Discovery", href: "/founder/funding/discovery" },
      { name: "Investor Matching", href: "/founder/funding/matching" },
      { name: "Fundraising", href: "/founder/funding#raise", soon: true },
      { name: "Pitch Deck", href: "/founder/funding/pitch" },
      { name: "Data Room", href: "/founder/funding/data-room" },
    ],
  },
  {
    label: "Finance", icon: CreditCard, href: "/founder/finance",
    subs: [
      { name: "Financial Overview", href: "/founder/finance" },
      { name: "Runway & Burn", href: "/founder/finance#runway", soon: true },
      { name: "Documents", href: "/founder/finance#docs", soon: true },
    ],
  },
  {
    label: "Growth", icon: TrendingUp, href: "/founder/growth",
    subs: [
      { name: "Growth Planning", href: "/founder/growth" },
      { name: "Goals & KPIs", href: "/founder/growth#kpis", soon: true },
      { name: "Startup Health", href: "/founder/growth/health" },
      { name: "Risk Management", href: "/founder/growth/risks" },
      { name: "Recommendations", href: "/founder/growth/recommendations" },
    ],
  },
  { label: "Partnerships", icon: Handshake, href: "/founder/partnerships" },
  { label: "Opportunities", icon: Crosshair, href: "/founder/opportunities" },
];

export const founderUtility: FounderGroup[] = [
  { label: "Startup Copilot", icon: Sparkles, href: "/founder/copilot" },
  { label: "Documents", icon: FileText, href: "/founder/documents" },
  { label: "Messages", icon: MessageSquare, href: "/founder/messages" },
  { label: "Calendar", icon: CalendarDays, href: "/founder/calendar" },
];

export const founderBottom: FounderGroup[] = [
  { label: "Settings", icon: Settings, href: "/founder/settings" },
  { label: "Help & Support", icon: HelpCircle, href: "/founder/help" },
];
