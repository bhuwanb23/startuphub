import PageHero from "@/components/page-hero";
import MarketOverview from "@/views/market-intelligence/components/overview";
import { IndustryInsights, MarketTrends } from "@/views/market-intelligence/components/sections";
import { InfographicsSection, ReportsSection, StartupTrends } from "@/views/market-intelligence/components/reports";
import CTA from "@/components/cta";

export function MarketIntelligenceView() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Intelligence" }, { label: "Market Intelligence" }]}
        eyebrow="Market Intelligence"
        title={
          <>
            See where the market is going{" "}
            <span className="text-accent">before it gets there.</span>
          </>
        }
        lead="Sector data, funding flows, competitor structure and startup formation — the same intelligence institutions pay for, built for founders."
      />
      <MarketOverview />
      <IndustryInsights />
      <MarketTrends />
      <StartupTrends />
      <ReportsSection />
      <InfographicsSection />
      <CTA
        title="Want intelligence tuned to your sector?"
        lead="Members get weekly signal digests, exportable data and sector watchlists matched to their venture."
        primary={{ label: "Unlock full intelligence", href: "/register" }}
        secondary={{ label: "Ecosystem insights", href: "/intelligence/insights" }}
      />
    </>
  );
}
