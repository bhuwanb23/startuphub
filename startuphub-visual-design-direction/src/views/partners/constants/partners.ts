export type PartnerGroup = {
  name: string;
  desc: string;
  members: string[];
  stat: string;
};

export const partnerGroups: PartnerGroup[] = [
  {
    name: "Government Partners",
    desc: "Missions, grants and policy programs delivered through the platform.",
    members: ["State Innovation Council", "National Agri Mission", "BIRAC", "Kerala Startup Mission", "DPIIT Cell", "Smart Cities Mission"],
    stat: "6 active partnerships",
  },
  {
    name: "Incubator Partners",
    desc: "Programs that run cohorts, mentors and milestones on StartupHub.",
    members: ["StartupHub Labs", "CIED Pune", "T-Hub Health", "MNIT Innovation Hub", "CIIE Space", "Venture Center"],
    stat: "450+ in network · 6 featured",
  },
  {
    name: "University Partners",
    desc: "Tech-transfer, student founders and research commercialization.",
    members: ["IISc Bengaluru", "IIT Madras RP", "IIM Ahmedabad", "BITS Pilani", "Anna University", "IIIT Hyderabad"],
    stat: "86 partner institutions",
  },
  {
    name: "Corporate Partners",
    desc: "Innovation challenges, pilots and procurement fast-tracks.",
    members: ["Arvind Industries", "Nimbus Cloud", "Axis Retail Group", "SkyPort Logistics", "Meridian Labs", "Helios Pharma"],
    stat: "340+ enterprise partners",
  },
  {
    name: "Investor Partners",
    desc: "Funds that receive thesis-matched, diligence-ready deal flow.",
    members: ["Northgate Partners", "Nexus Angels", "Vertex Global", "Atlas Capital", "Horizon Fund", "Samriddhi Fund"],
    stat: "480+ investors",
  },
  {
    name: "Technology Partners",
    desc: "Credits, infrastructure and tooling that power the Resource Hub.",
    members: ["Nimbus Cloud", "SignalWorks", "Notion", "Figma", "Linear", "GitHub"],
    stat: "$250K+ value per startup",
  },
  {
    name: "Ecosystem Partners",
    desc: "Media, communities and networks amplifying the ecosystem.",
    members: ["YourStory Network", "Headstart", "TiE Chapters", "Founders Café", "Startup Saturday", "Product Folks"],
    stat: "30+ community allies",
  },
];

export const partnerPaths = [
  { title: "Partner as an institution", desc: "Government, university or corpus that wants measured startup outcomes." },
  { title: "Partner as a program", desc: "Incubators and accelerators that want applications and tooling in one place." },
  { title: "Partner as a provider", desc: "Tools and services that want to reach startups at the exact right stage." },
];
