import PageHero from "@/components/page-hero";
import { FeaturedGrid, MonthSpotlight } from "@/views/showcase/components/spotlight";
import { EmergingRail, ProductSpotlight } from "@/views/showcase/components/rails";
import CTA from "@/components/cta";

export function ShowcaseView() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Intelligence" }, { label: "Startup Showcase" }]}
        eyebrow="Startup Showcase"
        title={
          <>
            The ecosystem&apos;s finest,{" "}
            <span className="text-accent">in one gallery.</span>
          </>
        }
        lead="Featured ventures, emerging founders and the products worth watching — curated monthly by the intelligence team."
      />
      <MonthSpotlight />
      <FeaturedGrid />
      <EmergingRail />
      <ProductSpotlight />
      <CTA
        title="Want to be showcased?"
        lead="The showcase is curated from live platform data — the fastest way in is to build, track and verify on StartupHub."
        primary={{ label: "List your startup", href: "/register" }}
        secondary={{ label: "Startup directory", href: "/explore/startups" }}
      />
    </>
  );
}
