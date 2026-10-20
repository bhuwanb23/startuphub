export type Researcher = {
  name: string;
  title: string;
  dept: string;
  interests: string[];
  pubs: number;
  patents: number;
  projects: number;
  available: boolean;
  focus: string;
};

export const RESEARCHERS: Researcher[] = [
  {
    name: "Dr. Vikram Acharya", title: "Professor", dept: "Computer Science",
    interests: ["Edge AI", "Model compression", "Agri-vision"],
    pubs: 84, patents: 6, projects: 4, available: true,
    focus: "Edge-AI pest detection model — TRL 6, seeking pilot farms",
  },
  {
    name: "Dr. Lena Mathew", title: "Associate Professor", dept: "Biotechnology",
    interests: ["Biosensors", "Point-of-care diagnostics"],
    pubs: 61, patents: 4, projects: 3, available: true,
    focus: "Low-cost arsenic biosensor — TRL 7, industry enquiries open",
  },
  {
    name: "Dr. Imran Sheikh", title: "Assistant Professor", dept: "Materials Science",
    interests: ["Solid-state batteries", "Electrolytes"],
    pubs: 38, patents: 3, projects: 2, available: false,
    focus: "SSB electrolyte — TRL 5, corporate RFI under review",
  },
  {
    name: "Dr. Grace D'Souza", title: "Professor", dept: "Agri & Env Science",
    interests: ["Soil microbiome", "Carbon MRV"],
    pubs: 92, patents: 5, projects: 5, available: true,
    focus: "Soil micro-biome kit — licensed to spin-off RootStack",
  },
  {
    name: "Dr. Harish Naidu", title: "Associate Professor", dept: "Electrical Eng",
    interests: ["Power converters", "EV charging"],
    pubs: 47, patents: 2, projects: 2, available: false,
    focus: "Bidirectional charger topology — granted IN2022089",
  },
  {
    name: "Dr. Priya Kulkarni", title: "Assistant Professor", dept: "Computer Science",
    interests: ["Privacy-preserving ML", "Federated learning"],
    pubs: 29, patents: 1, projects: 3, available: true,
    focus: "Federated clinical training — seeking hospital partners",
  },
];

export const EXPERTISE_DOMAINS = [
  { domain: "Applied AI & ML", experts: 62 },
  { domain: "Climate & Energy", experts: 48 },
  { domain: "Biotechnology", experts: 44 },
  { domain: "Advanced Materials", experts: 38 },
  { domain: "Agri Science", experts: 31 },
  { domain: "Robotics", experts: 26 },
] as const;

export const PEOPLE_STATS = [
  { label: "Active researchers", value: "320", hint: "62 available for consultation" },
  { label: "PhD scholars", value: "1,150", hint: "214 in final year" },
  { label: "Research teams", value: "58", hint: "cross-department" },
  { label: "Student innovators", value: "410", hint: "86 with startup interest" },
];
