export type Mentor = {
  slug: string;
  name: string;
  role: string;
  expertise: string[];
  industry: string;
  experience: string;
  location: string;
  sessions: number;
  availability: "2 slots / week" | "1 slot / week" | "Monthly office hours" | "Waitlist";
  bio: string;
};

export const mentors: Mentor[] = [
  {
    slug: "priya-nair",
    name: "Priya Nair", role: "ex-CTO, ZetaPay",
    expertise: ["Architecture", "Scaling teams", "FinTech"],
    industry: "FinTech", experience: "16 yrs", location: "Mumbai",
    sessions: 214, availability: "2 slots / week",
    bio: "Built payments infrastructure processing ₹40K Cr annually. Helps technical founders make boring, correct architecture decisions.",
  },
  {
    slug: "vikram-rao",
    name: "Vikram Rao", role: "ex-VP Growth, FreshKart",
    expertise: ["Growth loops", "Retention", "Marketplaces"],
    industry: "Consumer", experience: "12 yrs", location: "Bengaluru",
    sessions: 187, availability: "1 slot / week",
    bio: "Scaled a grocery marketplace from 3 to 180 cities. Obsessed with retention mechanics and honest unit economics.",
  },
  {
    slug: "dr-meera-krishnan",
    name: "Dr. Meera Krishnan", role: "IPR Attorney & Strategist",
    expertise: ["Patents", "IP strategy", "Licensing"],
    industry: "Legal / IPR", experience: "19 yrs", location: "Chennai",
    sessions: 342, availability: "Monthly office hours",
    bio: "Filed 900+ patents across three continents. Helps founders protect what matters before the world sees it.",
  },
  {
    slug: "arjun-bedekar",
    name: "Arjun Bedekar", role: "Founder, exited 2022",
    expertise: ["Zero-to-one", "Fundraising", "B2B SaaS"],
    industry: "SaaS", experience: "14 yrs", location: "Pune",
    sessions: 156, availability: "2 slots / week",
    bio: "Founded and sold a vertical SaaS company after 8 years. Now helps first-time founders skip his most expensive mistakes.",
  },
  {
    slug: "sunita-deshmukh",
    name: "Sunita Deshmukh", role: "VP Innovation, Arvind Industries",
    expertise: ["Enterprise sales", "Pilots", "Corporate partnerships"],
    industry: "Manufacturing", experience: "18 yrs", location: "Ahmedabad",
    sessions: 98, availability: "1 slot / week",
    bio: "Runs an industrial innovation program. Teaches startups how large companies actually buy — procurement, politics and all.",
  },
  {
    slug: "karan-chadha",
    name: "Karan Chadha", role: "ex-CPO, LearnLoop",
    expertise: ["Product", "EdTech", "Consumer UX"],
    industry: "EdTech", experience: "11 yrs", location: "Delhi NCR",
    sessions: 143, availability: "Waitlist",
    bio: "Shipped learning products used by 40M students. Reviews product with brutal kindness and a whiteboard.",
  },
];

export const mentorFilters = {
  expertise: ["Product", "Growth loops", "Fundraising", "Patents", "Architecture", "Enterprise sales"],
  industries: ["FinTech", "Consumer", "Legal / IPR", "SaaS", "Manufacturing", "EdTech"],
  locations: ["Mumbai", "Bengaluru", "Chennai", "Pune", "Ahmedabad", "Delhi NCR"],
  availability: ["2 slots / week", "1 slot / week", "Monthly office hours", "Waitlist"],
};
