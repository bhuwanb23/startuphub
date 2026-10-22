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
  {
    slug: "nikhil-verma",
    name: "Nikhil Verma", role: "ex-VP Engineering, QuickShip",
    expertise: ["Architecture", "Logistics", "Team building"],
    industry: "Logistics", experience: "15 yrs", location: "Hyderabad",
    sessions: 167, availability: "2 slots / week",
    bio: "Ran a 400-engineer org through three re-platforms. Teaches founders how to sequence infra work so it survives Series A.",
  },
  {
    slug: "sara-dsouza",
    name: "Sara D'Souza", role: "Founder, D2C brand (acquired 2021)",
    expertise: ["Brand", "Retention", "Unit economics"],
    industry: "D2C / Retail", experience: "10 yrs", location: "Mumbai",
    sessions: 121, availability: "1 slot / week",
    bio: "Built a ₹40 Cr D2C brand from a spare room and sold it. Keeps a sharp eye on contribution margin, not vanity revenue.",
  },
  {
    slug: "imran-sheikh",
    name: "Imran Sheikh", role: "Growth & Performance Marketing Lead",
    expertise: ["Growth loops", "Paid acquisition", "Analytics"],
    industry: "D2C / Retail", experience: "9 yrs", location: "Hyderabad",
    sessions: 88, availability: "2 slots / week",
    bio: "Runs spend across six brands and knows exactly which CAC numbers were engineered rather than earned.",
  },
  {
    slug: "lakshmi-iyer",
    name: "Lakshmi Iyer", role: "ex-Head of Supply Chain, BigBasket",
    expertise: ["Supply chain", "FPO sourcing", "Unit economics"],
    industry: "AgriTech", experience: "17 yrs", location: "Coimbatore",
    sessions: 203, availability: "Monthly office hours",
    bio: "Sourced from 900+ farmer producer organisations. Helps agri founders model harvest cycles before they model growth.",
  },
];

export const mentorFilters = {
  expertise: ["Product", "Growth loops", "Fundraising", "Patents", "Architecture", "Enterprise sales", "Supply chain", "Brand", "Analytics"],
  industries: ["FinTech", "Consumer", "Legal / IPR", "SaaS", "Manufacturing", "EdTech", "Logistics", "AgriTech", "D2C / Retail"],
  locations: ["Mumbai", "Bengaluru", "Chennai", "Pune", "Ahmedabad", "Delhi NCR", "Hyderabad", "Coimbatore"],
  availability: ["2 slots / week", "1 slot / week", "Monthly office hours", "Waitlist"],
};
