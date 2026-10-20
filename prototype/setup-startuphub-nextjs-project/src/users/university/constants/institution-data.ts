export const INSTITUTION = {
  name: "Crestmont University",
  type: "Public Research University",
  founded: "Est. 1962",
  overview:
    "Crestmont University is a research-intensive institution spanning 14 departments and 9 dedicated research centers, with a mandate to move laboratory breakthroughs into the economy. The Technology Transfer Office manages IP, licensing, spin-offs and industry collaboration across the institute.",
  stats: [
    { label: "Departments", value: "14" },
    { label: "Research Centers", value: "9" },
    { label: "Faculty", value: "480" },
    { label: "PhD Scholars", value: "1,150" },
    { label: "Students", value: "12,400" },
  ],
  researchAreas: [
    "Applied AI & ML",
    "Climate & Energy Systems",
    "Biotechnology",
    "Advanced Materials",
    "Agri Science",
    "Robotics",
    "Water & Environment",
    "Semiconductor Devices",
  ],
  facilities: [
    "Central Instrumentation Facility",
    "Cleanroom & Nanofab Lab",
    "Bio-safety Level 2 Facility",
    "High-Performance Computing Cluster",
    "Prototyping & Capstone Workshop",
    "Field Robotics Test Range",
  ],
  partners: [
    "AquaPure Industries",
    "VoltEdge Energy",
    "Terraforma Corp",
    "Meridian Health Systems",
    "National Agri Mission",
    "Nexus Labs Incubator",
  ],
  contact: {
    office: "Technology Transfer Office, Block C, Crestmont University",
    email: "tto@crestmont.edu",
    phone: "+91 44 2800 1400",
    profile: "startuphub.app/university/crestmont",
  },
};

export type Department = {
  name: string;
  head: string;
  faculty: number;
  projects: number;
  patents: number;
  performance: number; // 0–100
  focus: string;
};

export const DEPARTMENTS: Department[] = [
  { name: "Computer Science & Engineering", head: "Dr. R. Iyer", faculty: 58, projects: 22, patents: 31, performance: 92, focus: "AI systems · edge computing · security" },
  { name: "Biotechnology", head: "Dr. S. Menon", faculty: 44, projects: 18, patents: 24, performance: 88, focus: "biosensors · genomics · bioprocess" },
  { name: "Materials Science", head: "Dr. K. Rao", faculty: 39, projects: 15, patents: 19, performance: 84, focus: "energy materials · nanocoatings" },
  { name: "Electrical Engineering", head: "Dr. L. Furtado", faculty: 47, projects: 12, patents: 14, performance: 78, focus: "power electronics · RF systems" },
  { name: "Mechanical Engineering", head: "Dr. P. Sharma", faculty: 52, projects: 9, patents: 9, performance: 71, focus: "robotics · thermal systems" },
  { name: "Agri & Environmental Science", head: "Dr. N. Bose", faculty: 36, projects: 8, patents: 8, performance: 76, focus: "soil health · water systems" },
];

export const FACULTY_STATS = [
  { label: "Departments", value: "14", hint: "12 with active TTO projects" },
  { label: "Full professors", value: "168", hint: "of 480 faculty" },
  { label: "Joint appointments", value: "23", hint: "cross-department" },
  { label: "Industry chairs", value: "6", hint: "sponsored positions" },
];
