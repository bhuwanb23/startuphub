export const INFRA_STATS = [
  { label: "Research labs", value: "22", hint: "9 centers" },
  { label: "Equipment units", value: "340", hint: "48 shared externally" },
  { label: "Utilization", value: "71%", delta: "+5 pts" },
  { label: "Pending requests", value: "8", hint: "3 external" },
];

export type Lab = {
  name: string;
  center: string;
  capacity: number; // pct booked
  equipment: number;
  status: "Available" | "Busy" | "Maintenance";
  hours: string;
  safety: "BSL-2" | "Cleanroom" | "Standard" | "High-voltage";
};

export const LABS: Lab[] = [
  { name: "Cleanroom & Nanofab Lab", center: "Materials Center", capacity: 86, equipment: 34, status: "Busy", hours: "24×7 · carded", safety: "Cleanroom" },
  { name: "Bio-Safety Level 2 Facility", center: "Biotech Center", capacity: 62, equipment: 28, status: "Available", hours: "8:00 – 20:00", safety: "BSL-2" },
  { name: "HPC Compute Cluster", center: "CS Research Wing", capacity: 94, equipment: 12, status: "Busy", hours: "24×7 · remote", safety: "Standard" },
  { name: "Central Instrumentation", center: "Core Facilities", capacity: 48, equipment: 96, status: "Available", hours: "9:00 – 18:00", safety: "Standard" },
  { name: "High-Voltage Power Lab", center: "EE Block B", capacity: 22, equipment: 18, status: "Maintenance", hours: "Reopens Mar 24", safety: "High-voltage" },
];

export const LAB_STATUS_TONE: Record<Lab["status"], string> = {
  Available: "bg-emerald-50 text-emerald-700",
  Busy: "bg-amber-50 text-amber-700",
  Maintenance: "bg-red-50 text-red-600",
};

export const BOOKING_REQUESTS = [
  { lab: "Cleanroom & Nanofab", requester: "Dr. I. Sheikh · SSB project", purpose: "Electrolyte thin-film deposition", slot: "Mar 19 · 6h" },
  { lab: "BSL-2 Facility", requester: "RootStack (startup)", purpose: "Soil kit batch validation", slot: "Mar 21 · 4h" },
  { lab: "HPC Cluster", requester: "Dr. V. Acharya", purpose: "Pest model retraining run", slot: "Mar 22 · 12h" },
];

export const EQUIPMENT = [
  { name: "FE-SEM with EDS", spec: "1 nm resolution", lab: "Central Instrumentation", status: "Available", usage: 88 },
  { name: "XRD Diffractometer", spec: "Cu Kα, thin-film stage", lab: "Materials Center", status: "Available", usage: 74 },
  { name: "Bioreactor skid", spec: "3 × 50L parallel", lab: "Bio-Safety Facility", status: "Booked till Mar 28", usage: 92 },
  { name: "Grid emulator", spec: "45 kVA, 4-quadrant", lab: "High-Voltage Lab", status: "Maintenance", usage: 31 },
];
