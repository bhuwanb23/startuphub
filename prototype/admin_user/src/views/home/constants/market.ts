export type MarketTabKey = "Trends" | "Companies" | "Investment" | "IP";
export const MARKET_TABS: MarketTabKey[] = ["Trends", "Companies", "Investment", "IP"];

export type MarketRow = { name: string; value: string; share: number };

export type MarketSector = {
  label: string;
  stats: { value: string; label: string }[];
  series: number[];
  tabs: Record<MarketTabKey, MarketRow[]>;
};

export const MARKET_SECTORS: MarketSector[] = [
  {
    label: "AI & Agritech",
    stats: [
      { value: "$42.8B", label: "Market size" },
      { value: "+18.4%", label: "YoY growth" },
      { value: "1,284", label: "Active startups" },
    ],
    series: [0.18, 0.24, 0.21, 0.32, 0.38, 0.35, 0.48, 0.55, 0.62, 0.58, 0.74, 0.9],
    tabs: {
      Trends: [
        { name: "Precision spraying robotics", value: "+42% signal", share: 0.86 },
        { name: "Soil intelligence APIs", value: "+31% signal", share: 0.68 },
        { name: "Autonomous micro-fleets", value: "+24% signal", share: 0.52 },
      ],
      Companies: [
        { name: "Northwind Labs", value: "Series A", share: 0.9 },
        { name: "TerraPulse AI", value: "Seed", share: 0.64 },
        { name: "CropSignal", value: "Pre-seed", share: 0.42 },
      ],
      Investment: [
        { name: "Agri robotics rounds", value: "$310M · Q1", share: 0.84 },
        { name: "Govt. innovation grants", value: "$96M · live", share: 0.58 },
        { name: "Corporate venture", value: "$142M · YTD", share: 0.44 },
      ],
      IP: [
        { name: "Patents filed — sector", value: "312 · YTD", share: 0.78 },
        { name: "Active licenses", value: "96", share: 0.5 },
        { name: "University transfers", value: "41", share: 0.34 },
      ],
    },
  },
  {
    label: "Fintech Infra",
    stats: [
      { value: "$61.2B", label: "Market size" },
      { value: "+12.1%", label: "YoY growth" },
      { value: "2,036", label: "Active startups" },
    ],
    series: [0.3, 0.34, 0.42, 0.4, 0.5, 0.47, 0.55, 0.52, 0.63, 0.7, 0.68, 0.82],
    tabs: {
      Trends: [
        { name: "Embedded lending rails", value: "+29% signal", share: 0.74 },
        { name: "Compliance automation", value: "+21% signal", share: 0.58 },
        { name: "Real-time treasury", value: "+17% signal", share: 0.46 },
      ],
      Companies: [
        { name: "StackLedger", value: "Pre-seed", share: 0.66 },
        { name: "RailGrid Pay", value: "Series A", share: 0.84 },
        { name: "Ledgerline", value: "Seed", share: 0.52 },
      ],
      Investment: [
        { name: "Infra rounds — Series A+", value: "$540M · Q1", share: 0.9 },
        { name: "Angel syndicates", value: "$88M · live", share: 0.42 },
        { name: "Bank venture arms", value: "$210M · YTD", share: 0.62 },
      ],
      IP: [
        { name: "Patents filed — sector", value: "188 · YTD", share: 0.56 },
        { name: "Active licenses", value: "74", share: 0.4 },
        { name: "Standards contributions", value: "29", share: 0.3 },
      ],
    },
  },
  {
    label: "Climate Compute",
    stats: [
      { value: "$28.4B", label: "Market size" },
      { value: "+24.7%", label: "YoY growth" },
      { value: "864", label: "Active startups" },
    ],
    series: [0.12, 0.18, 0.26, 0.24, 0.34, 0.44, 0.42, 0.55, 0.66, 0.72, 0.8, 0.94],
    tabs: {
      Trends: [
        { name: "Grid-interactive compute", value: "+54% signal", share: 0.94 },
        { name: "Carbon-aware scheduling", value: "+38% signal", share: 0.72 },
        { name: "Waste-heat reuse", value: "+26% signal", share: 0.5 },
      ],
      Companies: [
        { name: "GridSense", value: "Seed", share: 0.7 },
        { name: "ThermalStack", value: "Series A", share: 0.8 },
        { name: "CarbonLoop", value: "Pre-seed", share: 0.44 },
      ],
      Investment: [
        { name: "Climate infra funds", value: "$260M · Q1", share: 0.76 },
        { name: "Green grants — govt.", value: "$140M · live", share: 0.6 },
        { name: "Energy majors' CVC", value: "$175M · YTD", share: 0.54 },
      ],
      IP: [
        { name: "Patents filed — sector", value: "142 · YTD", share: 0.48 },
        { name: "Active licenses", value: "58", share: 0.36 },
        { name: "University transfers", value: "33", share: 0.28 },
      ],
    },
  },
  {
    label: "Health Systems",
    stats: [
      { value: "$39.9B", label: "Market size" },
      { value: "+15.8%", label: "YoY growth" },
      { value: "1,542", label: "Active startups" },
    ],
    series: [0.22, 0.3, 0.28, 0.38, 0.36, 0.46, 0.54, 0.52, 0.64, 0.62, 0.74, 0.86],
    tabs: {
      Trends: [
        { name: "Care navigation AI", value: "+33% signal", share: 0.78 },
        { name: "Hospital ops automation", value: "+27% signal", share: 0.64 },
        { name: "Remote diagnostics", value: "+19% signal", share: 0.5 },
      ],
      Companies: [
        { name: "MediQueue", value: "Seed", share: 0.72 },
        { name: "VitalMesh", value: "Series A", share: 0.82 },
        { name: "ClinicOS", value: "Pre-seed", share: 0.4 },
      ],
      Investment: [
        { name: "Digital health rounds", value: "$410M · Q1", share: 0.86 },
        { name: "Hospital group CVC", value: "$120M · YTD", share: 0.52 },
        { name: "Public health grants", value: "$74M · live", share: 0.38 },
      ],
      IP: [
        { name: "Patents filed — sector", value: "204 · YTD", share: 0.6 },
        { name: "Active licenses", value: "81", share: 0.44 },
        { name: "Clinical validations", value: "57", share: 0.4 },
      ],
    },
  },
];
