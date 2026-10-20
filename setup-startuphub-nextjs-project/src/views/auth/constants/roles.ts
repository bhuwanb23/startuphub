import {
  Building2,
  GraduationCap,
  Landmark,
  Rocket,
  Scale,
  Users,
} from "lucide-react";

export const DEMO_WORKSPACES = [
  {
    role: "Founder",
    name: "Ravi Sharma",
    org: "Lumen AI",
    href: "/founder",
    icon: Rocket,
    blurb: "Idea → incubation → IPR → funding, in one journey",
  },
  {
    role: "Mentor",
    name: "Priya Nair",
    org: "GTM & Growth",
    href: "/mentor",
    icon: Users,
    blurb: "Mentees, milestones, matching and impact",
  },
  {
    role: "IPR Expert",
    name: "Kavya Reddy",
    org: "IP Attorney",
    href: "/ipr-expert",
    icon: Scale,
    blurb: "Portfolio, filings, deadlines, commercialization",
  },
  {
    role: "Incubator",
    name: "Sana Merchant",
    org: "Nexus Labs",
    href: "/incubator",
    icon: Building2,
    blurb: "Cohorts, programs, startups and performance",
  },
  {
    role: "Investor",
    name: "Arjun Mehta",
    org: "Meridian Capital",
    href: "/investor",
    icon: Landmark,
    blurb: "Deal flow, portfolio, intelligence and network",
  },
  {
    role: "University",
    name: "Dr. Amara Deshpande",
    org: "Crestmont University",
    href: "/university",
    icon: GraduationCap,
    blurb: "Research → IP → licensing → spin-offs and transfer",
  },
];
