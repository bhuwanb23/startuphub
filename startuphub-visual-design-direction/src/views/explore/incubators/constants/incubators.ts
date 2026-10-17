export type Incubator = {
  slug: string;
  name: string;
  initials: string;
  location: string;
  founded: string;
  domains: string[];
  desc: string;
  programs: number;
  startups: number;
  mentors: number;
  facilities: string[];
  application: "Rolling" | "Applications open" | "Opens Apr 2026";
};

export const incubators: Incubator[] = [
  {
    slug: "startuphub-labs",
    name: "StartupHub Labs",
    initials: "SL",
    location: "Bengaluru",
    founded: "2021",
    domains: ["Multi-sector", "AI", "SaaS"],
    desc: "StartupHub's flagship program — a 16-week sprint from validated idea to fund-ready venture, with the full platform wired in.",
    programs: 12, startups: 240, mentors: 96,
    facilities: ["Prototyping studio", "Co-working", "Investor lounge"],
    application: "Rolling",
  },
  {
    slug: "cied-pune",
    name: "CIED Pune",
    initials: "CP",
    location: "Pune",
    founded: "2016",
    domains: ["DeepTech", "Energy", "Advanced Manufacturing"],
    desc: "Deep-tech incubation with wet labs, pilot-scale manufacturing and an uncommon patience for long validation cycles.",
    programs: 8, startups: 165, mentors: 74,
    facilities: ["Wet labs", "Pilot plant", "Testing rigs"],
    application: "Applications open",
  },
  {
    slug: "t-hub-health",
    name: "T-Hub Health",
    initials: "TH",
    location: "Hyderabad",
    founded: "2018",
    domains: ["HealthTech", "BioTech", "Med Devices"],
    desc: "Healthcare-dedicated incubation with hospital pilot corridors, regulatory mentorship and clinical validation support.",
    programs: 6, startups: 128, mentors: 61,
    facilities: ["Clinical simulation lab", "Hospital partnerships", "Regulatory desk"],
    application: "Applications open",
  },
  {
    slug: "mnit-innovation-hub",
    name: "MNIT Innovation Hub",
    initials: "MH",
    location: "Jaipur",
    founded: "2019",
    domains: ["EdTech", "ICT", "Social Impact"],
    desc: "University-anchored incubation turning student research and regional problems into ventures that scale nationally.",
    programs: 5, startups: 89, mentors: 42,
    facilities: ["Research labs", "Student talent pool", "Fabrication lab"],
    application: "Rolling",
  },
  {
    slug: "kerala-startup-mission",
    name: "Kerala Startup Mission",
    initials: "KM",
    location: "Kochi",
    founded: "2015",
    domains: ["Hardware", "CleanTech", "IoT"],
    desc: "One of India's largest public incubation networks — hardware-first facilities and strong government program linkage.",
    programs: 14, startups: 310, mentors: 118,
    facilities: ["Electronics lab", "IoT testbed", "Maker space"],
    application: "Rolling",
  },
  {
    slug: "ciie-space",
    name: "CIIE Space",
    initials: "CS",
    location: "Chennai",
    founded: "2020",
    domains: ["Space", "Defence", "Aerospace"],
    desc: "Specialised space-tech incubation with launch-adjacent mentors, ground infrastructure access and defence procurement guidance.",
    programs: 3, startups: 41, mentors: 29,
    facilities: ["Ground station access", "Clean room", "Vibration testing"],
    application: "Opens Apr 2026",
  },
];

export const incubatorFilters = {
  domains: ["Multi-sector", "AI", "SaaS", "DeepTech", "Energy", "HealthTech", "EdTech", "Hardware", "CleanTech", "Space"],
  locations: ["Bengaluru", "Pune", "Hyderabad", "Jaipur", "Kochi", "Chennai"],
};
