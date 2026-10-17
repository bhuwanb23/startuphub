import PageHero from "@/components/page-hero";
import IpTypes from "@/views/ipr/components/ip-types";
import Awareness from "@/views/ipr/components/awareness";
import { IpStats, IpExpertsSection } from "@/views/ipr/components/stats-experts";
import { InnovationShowcase, IpResourcesSection } from "@/views/ipr/components/showcase-resources";
import CTA from "@/components/cta";
import { ButtonLink } from "@/components/ui";

export function IprView() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Platform" }, { label: "IPR & Innovation Hub" }]}
        eyebrow="IPR & Innovation Hub"
        title={
          <>
            Your ideas are the asset.{" "}
            <span className="text-accent">Treat them like one.</span>
          </>
        }
        lead="Learn what to protect, file it before you pitch, and manage it like a portfolio — with the StartupHub IPR desk beside you."
      >
        <div className="mt-3 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/register" size="lg">Get a free IP audit</ButtonLink>
          <ButtonLink href="/knowledge-hub" variant="secondary" size="lg">Learn the basics</ButtonLink>
        </div>
      </PageHero>
      <IpTypes />
      <Awareness />
      <IpStats />
      <InnovationShowcase />
      <IpExpertsSection />
      <IpResourcesSection />
      <CTA
        title="Protect it before you pitch it."
        lead="A 20-minute audit tells you exactly what's protectable — and what to file first. Fixed-fee packages, no surprises."
        primary={{ label: "Book an IP audit", href: "/register" }}
        secondary={{ label: "Explore the lifecycle", href: "/lifecycle" }}
      />
    </>
  );
}
