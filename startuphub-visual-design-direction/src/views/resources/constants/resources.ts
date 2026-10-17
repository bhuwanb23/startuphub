export type Resource = {
  id: string;
  category: string;
  title: string;
  provider: string;
  value: string;
  desc: string;
  stage: string;
};

export const categories = [
  "Funding", "Grants", "Labs", "Infrastructure", "Technology", "Cloud",
  "Tools", "Talent", "Mentors", "Research", "Legal", "IPR", "Learning",
];

export const resources: Resource[] = [
  { id: "r1", category: "Cloud", title: "Cloud Credits — Tier I", provider: "Nimbus Cloud", value: "$25K credits", desc: "Two-year compute credits for pre-seed and seed startups, with architecture office hours.", stage: "Validation+" },
  { id: "r2", category: "Funding", title: "Seed Forward Program", provider: "Northgate Partners", value: "₹50L avg", desc: "A rolling seed program with 3-week decisions for readiness-scored startups.", stage: "MVP+" },
  { id: "r3", category: "Grants", title: "BIRAC BioIgnite Grant", provider: "BIRAC, Govt. of India", value: "₹50L grant", desc: "Non-dilutive grant for biotech startups with validated proof of concept.", stage: "Validation+" },
  { id: "r4", category: "Labs", title: "Electronics Prototyping Lab", provider: "Kerala Startup Mission", value: "₹400/hr", desc: "Full SMT line, 3D printing and RF testing — bookable by the hour.", stage: "Idea+" },
  { id: "r5", category: "Infrastructure", title: "Wet Lab Access — CIED", provider: "CIED Pune", value: "Subsidized", desc: "BSL-1 wet lab benches and equipment time for bio and material startups.", stage: "Idea+" },
  { id: "r6", category: "Technology", title: "Satellite Data Sandbox", provider: "ISRO Tech Transfer", value: "Free tier", desc: "Licensed earth-observation datasets and APIs for eligible research startups.", stage: "MVP+" },
  { id: "r7", category: "Tools", title: "Startup Stack Bundle", provider: "Notion · Figma · Linear", value: "12 mo free", desc: "Workspace, design and engineering tools bundled for StartupHub founders.", stage: "Idea+" },
  { id: "r8", category: "Talent", title: "Founder Associate Program", provider: "StartupHub Talent", value: "Curated", desc: "Pre-vetted operators for 3–6 month engagements across product, growth and ops.", stage: "Seed+" },
  { id: "r9", category: "Mentors", title: "Office Hours Pool", provider: "2,800+ verified mentors", value: "Free", desc: "Open weekly office hours across 40+ specializations — book up to two per week.", stage: "Idea+" },
  { id: "r10", category: "Research", title: "University IP Licensing Pool", provider: "86 partner institutions", value: "Royalty deals", desc: "Browse licensable patents and lab technologies ready for commercialization.", stage: "Validation+" },
  { id: "r11", category: "Legal", title: "Founders' Legal Kit", provider: "StartupHub Legal Desk", value: "₹0", desc: "Incorporation, founder agreements, ESOP and contractor templates — India-ready.", stage: "Idea+" },
  { id: "r12", category: "IPR", title: "Patent Filing Pack", provider: "StartupHub IPR Desk", value: "₹14,999 fixed", desc: "72-hour patentability search plus provisional filing, attorney-reviewed.", stage: "Validation+" },
  { id: "r13", category: "Learning", title: "Founder School", provider: "StartupHub Knowledge Hub", value: "Free", desc: "21-playbook curriculum across validation, IP, fundraising and growth.", stage: "Idea+" },
  { id: "r14", category: "Cloud", title: "GPU Compute Grant", provider: "Nimbus Cloud Research", value: "$40K credits", desc: "Dedicated A100 capacity for AI startups training models under 12 months old.", stage: "Seed+" },
  { id: "r15", category: "Funding", title: "Micro Seed Notes", provider: "Nexus Angels", value: "₹10–40L", desc: "Small, fast first cheques for validation-stage startups — 2-week decisions.", stage: "Validation+" },
  { id: "r16", category: "Grants", title: "DeepTech Research Grant", provider: "National Science Foundation", value: "₹1Cr", desc: "Milestone-based non-dilutive funding for TRL 3–6 deep-tech ventures.", stage: "MVP+" },
  { id: "r17", category: "Tools", title: "Analytics & Telemetry Suite", provider: "SignalWorks", value: "1 yr free", desc: "Product analytics and monitoring for your first 100K monthly users.", stage: "MVP+" },
  { id: "r18", category: "Research", title: "Market Sizing Models", provider: "SH Intelligence", value: "Members", desc: "Bottom-up TAM models for 38 sectors, with the assumptions visible.", stage: "Idea+" },
];
