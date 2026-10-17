import PageHero from "@/components/page-hero";
import { Container } from "@/components/ui";
import IncubatorsDirectory from "@/views/explore/incubators/components/directory-client";
import CTA from "@/components/cta";

export function IncubatorsView() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Explore" }, { label: "Incubators" }]}
        eyebrow="Incubator Directory"
        title={
          <>
            Find the program that{" "}
            <span className="text-accent">fits your stage.</span>
          </>
        }
        lead="450+ verified incubators and accelerators — with real program data, mentor depth and facilities listed. Apply to several with one profile."
      />

      <section className="bg-soft py-14 md:py-16">
        <Container>
          <IncubatorsDirectory />
        </Container>
      </section>

      <CTA
        title="Run an incubator? Get discovered."
        lead="Verified programs receive stage-matched applications from across the ecosystem — and the tooling to run them."
        primary={{ label: "Join as Incubator", href: "/solutions/incubators" }}
        secondary={{ label: "Explore startups", href: "/explore/startups" }}
      />
    </>
  );
}
