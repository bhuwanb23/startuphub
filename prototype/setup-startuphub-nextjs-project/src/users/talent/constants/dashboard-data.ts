import {
  Award,
  BookmarkCheck,
  Briefcase,
  CheckCircle2,
  Compass,
  Eye,
  FileText,
  Gauge,
  Handshake,
  ListTodo,
  Plus,
  Send,
  Sparkles,
  Star,
  UserRound,
} from "lucide-react";

/* Dashboard overview — the eleven professional vitals. */
export const TALENT_STATS = [
  { label: "Profile completion", value: "92%", delta: "+4%", icon: UserRound },
  { label: "Skill score", value: "86/100", delta: "+3", icon: Gauge },
  { label: "Profile views", value: "1,284", delta: "+22%", icon: Eye },
  { label: "Startup matches", value: "18", delta: "+5", icon: Sparkles },
  { label: "Recommended opportunities", value: "24", hint: "12 above 80 fit", icon: Compass },
  { label: "Active applications", value: "7", hint: "2 in interview", icon: Send },
  { label: "Pending requests", value: "3", hint: "respond by Friday", icon: Handshake },
  { label: "Active projects", value: "3", hint: "2 on track · 1 at risk", icon: Briefcase },
  { label: "Upcoming tasks", value: "12", hint: "4 due this week", icon: ListTodo },
  { label: "Completed projects", value: "16", icon: CheckCircle2 },
  { label: "Rating", value: "4.9", hint: "32 reviews", icon: Star },
];

export const QUICK_ACTIONS = [
  { label: "Update Profile", icon: UserRound, href: "/talent/profile" },
  { label: "Add Skill", icon: Plus, href: "/talent/profile" },
  { label: "Upload Portfolio", icon: FileText, href: "/talent/documents" },
  { label: "Set Availability", icon: BookmarkCheck, href: "/talent/profile" },
  { label: "Discover Startups", icon: Compass, href: "/talent/discover" },
  { label: "Find Opportunities", icon: Send, href: "/talent/discover" },
  { label: "Apply for Opportunity", icon: CheckCircle2, href: "/talent/discover" },
  { label: "Review Requests", icon: Handshake, href: "/talent/collaborate" },
];

export const PROFILE_TIPS = [
  { tip: "Add 2 verified skills to reach 95% completion", impact: "+9% match rate" },
  { tip: "Upload the OrbitPay case study", impact: "3× more profile saves" },
];

export const APP_SNAPSHOT: [string, number][] = [
  ["Submitted", 3],
  ["Under review", 2],
  ["Shortlisted", 1],
  ["Interview", 2],
  ["Offer", 1],
];

export const UPCOMING = [
  { what: "System design round — AgriSense AI", when: "Today · 5:00 PM", kind: "Interview" },
  { what: "Pestlens · API contract review", when: "Tomorrow · 11:00 AM", kind: "Deliverable" },
  { what: "Intro call — Terraforma Corp", when: "Wed · 3:30 PM", kind: "Interview" },
];
