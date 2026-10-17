import PageHero from "@/components/page-hero";
import { Container } from "@/components/ui";
import StartupsDirectory from "@/views/explore/startups/components/directory-client";
import CTA from "@/components/cta";

export function StartupsView() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Explore" }, { label: "Startups" }]}
        eyebrow="Startup Directory"
        title={
          <>
            The ventures building{" "}
            <span className="text-accent">right now.</span>
          </>
        }
        lead="Search the public ecosystem — verified profiles, real stages. Financials and contact details unlock after you join."
      />

      <section className="bg-soft py-14 md:py-16">
        <Container>
          <StartupsDirectory />
        </Container>
      </section>

      <CTA
        title="Building something? Get listed."
        lead="A verified directory profile puts you in front of investors, corporates and mentors — on your terms."
        primary={{ label: "List your startup", href: "/register" }}
        secondary={{ label: "Explore incubators", href: "/explore/incubators" }}
      />
    </>
  );
}
