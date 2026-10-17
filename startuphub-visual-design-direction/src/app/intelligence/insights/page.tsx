import type { Metadata } from "next";
import { Radar } from "lucide-react";
import SoonView from "@/components/soon";

export const metadata: Metadata = {
  title: "Ecosystem Insights — StartupHub",
  description: "Reports and analysis on the connected startup ecosystem.",
};

export default function Page() {
  return (
    <SoonView
      icon={Radar}
      title="Ecosystem Insights is on the way."
      desc="Deep reports on how startups, capital and institutions actually move — drawn from live platform data, not surveys."
      features={["Quarterly ecosystem reports", "Cohort survival analysis", "Regional heatmaps", "Policy impact briefs"]}
    />
  );
}
