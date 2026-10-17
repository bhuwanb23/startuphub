import type { Metadata } from "next";
import { IncubatorsView } from "@/views/solutions/incubators/incubators";

export const metadata: Metadata = {
  title: "For Incubators — StartupHub",
  description:
    "Discover startups, manage programs and cohorts, mentor ventures, allocate resources, track performance and measure impact — the incubator OS.",
};

export default function Page() {
  return <IncubatorsView />;
}
