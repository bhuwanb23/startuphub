import PageHero from "@/components/page-hero";
import {
  Distribution,
  GrowthAndCapital,
  IncubationAndEmerging,
  KpiRow,
} from "@/views/ecosystem-insights/components/sections";
import CTA from "@/components/cta";

export function EcosystemInsightsView() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Intelligence" }, { label: "Ecosystem Insights" }]}
        eyebrow="Ecosystem Insights"
        title={
          <>
            The ecosystem,{" "}
            <span className="text-accent">measured live.</span>
          </>
        }
        lead="Startup counts, industries, funding and IPR trends, geography, survival and incubation outcomes — aggregated public intelligence from the network itself."
      />
      <KpiRow />
      <Distribution />
      <GrowthAndCapital />
      <IncubationAndEmerging />
      <CTA
        title="Need this data for your report or decision?"
        lead="Members export every chart, filter by sector and region, and get quarterly deep-dives before they're public."
        primary={{ label: "Unlock the data", href: "/register" }}
        secondary={{ label: "Market intelligence", href: "/intelligence/market" }}
      />
    </>
  );
}
