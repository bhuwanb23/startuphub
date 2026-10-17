export type Opportunity = {
  id: string;
  category: string;
  title: string;
  org: string;
  tags: string[];
  deadline: string;
  daysLeft: number;
  reward: string;
  remote: boolean;
};

export const oppCategories = [
  "Incubation Programs", "Accelerators", "Grants", "Funding", "Competitions",
  "Challenges", "Jobs", "Internships", "Mentorship", "Partnerships",
  "Pilot Opportunities", "Resources",
];

export const opportunities: Opportunity[] = [
  { id: "o1", category: "Incubation Programs", title: "Global Incubation Sprint — Cohort VI", org: "StartupHub Labs", tags: ["16 weeks", "Multi-sector"], deadline: "Apr 18, 2026", daysLeft: 21, reward: "₹15L support + credits", remote: false },
  { id: "o2", category: "Accelerators", title: "Climate Sandbox Accelerator", org: "Horizon Fund", tags: ["ClimateTech", "DeepTech"], deadline: "Apr 05, 2026", daysLeft: 8, reward: "$120K for 6%", remote: true },
  { id: "o3", category: "Grants", title: "BIRAC BioIgnite Grant", org: "BIRAC, Govt. of India", tags: ["BioTech", "Non-dilutive"], deadline: "Apr 30, 2026", daysLeft: 33, reward: "₹50L grant", remote: true },
  { id: "o4", category: "Funding", title: "Seed Forward Program — Cohort VII", org: "Northgate Partners", tags: ["Seed", "B2B"], deadline: "Mar 30, 2026", daysLeft: 2, reward: "₹50L – ₹2Cr", remote: true },
  { id: "o5", category: "Competitions", title: "National Startup Awards 2026", org: "DPIIT", tags: ["All sectors", "Recognition"], deadline: "May 12, 2026", daysLeft: 45, reward: "₹10L + visibility", remote: true },
  { id: "o6", category: "Challenges", title: "AgriTech Innovation Challenge", org: "National Agri Mission", tags: ["AgriTech", "Pilot guaranteed"], deadline: "Apr 08, 2026", daysLeft: 11, reward: "₹50L prize pool", remote: false },
  { id: "o7", category: "Challenges", title: "Smart City Mobility RFP", org: "Pune Municipal Corp.", tags: ["UrbanTech", "Govt. contract"], deadline: "Apr 22, 2026", daysLeft: 25, reward: "₹2Cr pilot contract", remote: false },
  { id: "o8", category: "Jobs", title: "Founding Engineer — TerraGrid", org: "TerraGrid · Pune", tags: ["Full-time", "Edge ML", "0.5–1.5% equity"], deadline: "Rolling", daysLeft: 90, reward: "₹28–40L + ESOP", remote: false },
  { id: "o9", category: "Jobs", title: "Growth Lead — EduFold", org: "EduFold · Jaipur", tags: ["Full-time", "B2C Growth"], deadline: "Rolling", daysLeft: 90, reward: "₹18–26L", remote: true },
  { id: "o10", category: "Internships", title: "Product Intern — MedSync", org: "MedSync · Hyderabad", tags: ["6 months", "HealthTech"], deadline: "Apr 02, 2026", daysLeft: 5, reward: "₹25K / month", remote: true },
  { id: "o11", category: "Mentorship", title: "Fundraising Sprint — 6 weeks", org: "Northgate Partners", tags: ["Group cohort", "Seed prep"], deadline: "Apr 15, 2026", daysLeft: 18, reward: "Free · 20 seats", remote: true },
  { id: "o12", category: "Partnerships", title: "Distribution Partner — Vernacular EdTech", org: "EduFold", tags: ["States: RJ, MP, UP"], deadline: "Open", daysLeft: 120, reward: "Revenue share", remote: true },
  { id: "o13", category: "Pilot Opportunities", title: "Smart Water Metering Pilot", org: "AquaPure × Kochi Water Authority", tags: ["CleanTech", "1-year pilot"], deadline: "Apr 28, 2026", daysLeft: 31, reward: "Paid pilot", remote: false },
  { id: "o14", category: "Pilot Opportunities", title: "Hospital Records Interop Pilot", org: "MedSync × T-Hub Health", tags: ["HealthTech", "2 hospitals"], deadline: "Apr 10, 2026", daysLeft: 13, reward: "Paid pilot + reference", remote: false },
  { id: "o15", category: "Resources", title: "GPU Compute Grant — AI Founders", org: "Nimbus Cloud Research", tags: ["AI/ML", "$40K credits"], deadline: "Rolling", daysLeft: 90, reward: "$40K compute", remote: true },
];
