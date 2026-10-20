export type HomeStat = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

export const HOME_STATS: HomeStat[] = [
  { value: 10, suffix: "K+", label: "Startups building" },
  { value: 450, suffix: "+", label: "Incubators & programs" },
  { value: 2.8, decimals: 1, suffix: "K+", label: "Mentors & operators" },
  { value: 1.2, decimals: 1, prefix: "₹", suffix: "K Cr", label: "Capital connected" },
  { value: 68, suffix: "K+", label: "Ecosystem connections" },
];
