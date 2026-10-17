import type { Metadata } from "next";
import { TrendingUp } from "lucide-react";
import SoonView from "@/components/soon";

export const metadata: Metadata = {
  title: "Market Intelligence — StartupHub",
  description: "Live sector dashboards: market size, growth signals, funding flows and IP activity.",
};

export default function Page() {
  return (
    <SoonView
      icon={TrendingUp}
      title="Market Intelligence is coming online."
      desc="The same sector intelligence institutions use — market size, momentum, funding flows and IP trends — built for founders."
      features={["Live sector dashboards", "Funding flow tracking", "IP activity signals", "Comparables & benchmarks"]}
    />
  );
}
