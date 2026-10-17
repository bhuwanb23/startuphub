export type Story = {
  category: string;
  company: string;
  slug?: string;
  quote: string;
  name: string;
  role: string;
  metric: { v: string; l: string };
  readTime: string;
};

export const storyCategories = [
  "Startup Stories", "Founder Stories", "Incubation Success", "Funding Success",
  "IPR Success", "Corporate Partnerships", "Market Success",
];

export const featuredStory = {
  category: "Startup Stories",
  company: "Lumen AI",
  slug: "lumen-ai",
  title: "From a co-working desk to 3.2 million hectares in 18 months.",
  body: "Ananya and Vikash joined StartupHub with a notebook and an unproven claim about crop stress. The platform did the rest of the introductions: an agronomy mentor in week one, a validation cohort in week three, two provisional patents before their first demo, and a Series A matched through readiness scoring — not cold email.",
  milestones: ["Mentor matched · Week 1", "IPR filed · Month 4", "2 enterprise pilots · Month 10", "Series A closed · Month 16"],
  quote: "Every stage just handed us to the next. We never once wondered what to do next week.",
  by: "Ananya Rao, Co-founder & CEO",
};

export const stories: Story[] = [
  {
    category: "Founder Stories", company: "EduFold", slug: "edufold",
    quote: "I failed my own company's entrance exam in English — and scored 94% in Hindi. That gap is why EduFold exists, and why 24,000 students use it today.",
    name: "Pooja Rathore", role: "Founder & CEO",
    metric: { v: "24K", l: "students in 9 languages" }, readTime: "6 min read",
  },
  {
    category: "Incubation Success", company: "AquaPure", slug: "aquapure",
    quote: "Kerala Startup Mission gave us lab benches; StartupHub gave us the milestone structure that turned a filtration prototype into 19 paying factory units.",
    name: "Thomas George", role: "Founder & CEO",
    metric: { v: "19", l: "units in 14 months" }, readTime: "5 min read",
  },
  {
    category: "Funding Success", company: "Skyline Logistics", slug: "skyline-logistics",
    quote: "Our Series B took 41 days from first call to money in the bank. The diligence room was 80% assembled before the lead partner even asked for it.",
    name: "Aditya Bansal", role: "Co-founder & CEO",
    metric: { v: "₹32 Cr", l: "Series B · 41 days" }, readTime: "7 min read",
  },
  {
    category: "IPR Success", company: "OrbitalWorks", slug: "orbitalworks",
    quote: "Three patents filed before our first customer meeting. When the enterprise procurement team asked 'what stops a big player copying you?' — we had an answer.",
    name: "Daniel Mathew", role: "Founder & CEO",
    metric: { v: "3", l: "patents before revenue" }, readTime: "5 min read",
  },
  {
    category: "Corporate Partnerships", company: "MedSync", slug: "medsync",
    quote: "The hospital pilot we cold-emailed about for 8 months closed in 3 weeks through the marketplace. It became a 412-clinic network.",
    name: "Sarah Fernandes", role: "Co-founder & COO",
    metric: { v: "412", l: "clinics from one pilot" }, readTime: "6 min read",
  },
  {
    category: "Market Success", company: "TerraGrid", slug: "terragrid",
    quote: "We thought storage was a grid product. Pilot data showed it was a revenue product. That one insight, surfaced by market intelligence, repriced our entire round.",
    name: "Ishita Kulkarni", role: "Co-founder & CEO",
    metric: { v: "14.2%", l: "revenue uplift for clients" }, readTime: "5 min read",
  },
  {
    category: "Funding Success", company: "FinEdge", slug: "finedge",
    quote: "₹50L pre-seed in two weeks — from angels who'd been waiting for exactly this problem. Thesis matching beat 200 cold emails.",
    name: "Kabir Malhotra", role: "Founder & CEO",
    metric: { v: "2 wks", l: "from match to cheque" }, readTime: "4 min read",
  },
  {
    category: "Startup Stories", company: "OrbitalWorks", slug: "orbitalworks",
    quote: "Everyone says space is a decade-long game. We're at 38-minute capture-to-API in year two — because every resource we needed was one login away.",
    name: "Ayesha Khan", role: "Head of Ground Systems",
    metric: { v: "38 min", l: "capture-to-API latency" }, readTime: "6 min read",
  },
];
