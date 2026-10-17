import PageHero from "@/components/page-hero";
import { Container } from "@/components/ui";
import EcoMap from "@/views/ecosystem-map/components/eco-map";
import CTA from "@/components/cta";

export function EcosystemView() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Explore" }, { label: "Ecosystem Map" }]}
        eyebrow="Ecosystem Map"
        title={
          <>
            The whole network.{" "}
            <span className="text-accent">One living map.</span>
          </>
        }
        lead="Startups, incubators, investors, mentors, corporates, universities, labs and resources — filter by anything, click any node to trace its connections."
      />

      <section className="bg-soft py-12 md:py-14">
        <Container>
          <EcoMap />
        </Container>
      </section>

      <CTA
        title="Your organization belongs on this map."
        lead="A verified profile puts you in the graph — visible to founders, investors and partners looking for exactly what you do."
        primary={{ label: "Claim your node", href: "/register" }}
        secondary={{ label: "Explore startups", href: "/explore/startups" }}
      />
    </>
  );
}
