import PageHero from "@/components/page-hero";
import WhatIs from "@/views/about/components/what-is";
import MissionVision from "@/views/about/components/mission-vision";
import Problem from "@/views/about/components/problem";
import Approach from "@/views/about/components/approach";
import EcosystemMap from "@/views/about/components/ecosystem-map";
import Impact from "@/views/about/components/impact";
import Team from "@/views/about/components/team";
import TrustStrip from "@/components/trust-strip";
import CTA from "@/components/cta";

export function AboutView() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "About StartupHub" }]}
        eyebrow="About StartupHub"
        title={
          <>
            The ecosystem the next generation of companies{" "}
            <span className="text-accent">will be built on.</span>
          </>
        }
        lead="StartupHub exists for one reason: great ideas fail too often — not from lack of talent, but from lack of connection. We're fixing the connection."
      />
      <WhatIs />
      <MissionVision />
      <Problem />
      <Approach />
      <EcosystemMap />
      <Impact />
      <Team />
      <TrustStrip label="Backed by institutions across the innovation economy" />
      <CTA
        title="Build the ecosystem with us."
        lead="Whether you're a founder, an institution or an investor — there's a place for you here."
        primary={{ label: "Join StartupHub", href: "/register" }}
        secondary={{ label: "Explore the platform", href: "/platform" }}
      />
    </>
  );
}
