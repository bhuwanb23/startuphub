import type { Metadata } from "next";
import { EcosystemInsightsView } from "@/views/ecosystem-insights/ecosystem-insights";

export const metadata: Metadata = {
  title: "Ecosystem Insights — StartupHub",
  description:
    "Public aggregated intelligence: startup counts, industries, funding trends, IPR trends, geographic distribution, growth and incubation outcomes.",
};

export default function Page() {
  return <EcosystemInsightsView />;
}
