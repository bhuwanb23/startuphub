import {
  Award,
  BadgeCheck,
  CalendarCheck,
  Crosshair,
  Sparkles,
  Users,
} from "lucide-react";
import type { SolutionData } from "@/components/solution/types";

export const mentorsData: SolutionData = {
  slug: "mentors",
  audience: "Mentors",
  icon: Users,
  title: "Guide the next wave of builders — on your terms.",
  lead: "Share your operating experience with startups that actually match it. Structured sessions, protected time and visible impact — no open-ended obligations.",
  ticks: ["You set the commitment", "Matched by expertise", "Impact you can point to"],
  panel: {
    title: "Mentor studio",
    rows: [
      { icon: Users, label: "Active mentees", value: "4 startups" },
      { icon: CalendarCheck, label: "Sessions this month", value: "9 booked" },
      { icon: Sparkles, label: "New matches waiting", value: "3 reviewed" },
      { icon: Award, label: "Your impact score", value: "Top 5%" },
    ],
    stat: { value: "4.9 / 5", label: "average mentee rating across the network" },
  },
  capabilitiesHeading: "Mentorship, engineered for busy operators.",
  capabilities: [
    { icon: BadgeCheck, title: "Expert Profile", desc: "A verified profile built around what you actually know — sectors, stages, superpowers." },
    { icon: Crosshair, title: "Startup Matching", desc: "Only startups whose stage and problem fit your experience. Decline anything, no friction." },
    { icon: Users, title: "Mentorship", desc: "Structured 6–12 week engagements with goals, milestones and clean endings." },
    { icon: CalendarCheck, title: "Sessions", desc: "Scheduling, agendas, notes and follow-ups handled in one calm interface." },
    { icon: Sparkles, title: "Recommendations", desc: "AI suggests plays from 2,800+ operators when a mentee hits a problem you've seen." },
    { icon: Award, title: "Impact Tracking", desc: "See your mentees' growth curves and outcomes attributed to your sessions." },
  ],
  workflow: [
    { n: "01", title: "Build your expert profile", desc: "Ten minutes on your background and superpowers. Verification keeps quality high." },
    { n: "02", title: "Set your terms", desc: "Hours per month, session formats, stages you love. You control the load." },
    { n: "03", title: "Meet matched startups", desc: "Review precise matches — problem, stage and traction attached — then say yes." },
    { n: "04", title: "Watch them grow", desc: "Track outcomes over months and collect the most satisfying metric: impact." },
  ],
  outcomes: [
    { to: 2.8, decimals: 1, suffix: "K+", label: "expert mentors on the network" },
    { to: 96, suffix: "K+", label: "mentorship hours delivered" },
    { to: 71, suffix: "%", label: "mentees reach next stage within a year" },
  ],
  quote: {
    text: "I give four hours a month and I can see exactly where those hours land. It's become the most leveraged thing I do.",
    name: "Priya Nair",
    role: "ex-CTO, fintech · Mentor since 2023",
  },
  ctaLabel: "Become a Mentor",
};
