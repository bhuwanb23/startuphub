import PageHero from "@/components/page-hero";
import { Container } from "@/components/ui";
import OpportunityBoard from "@/views/opportunities/components/board";
import CTA from "@/components/cta";

export function OpportunitiesView() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Explore" }, { label: "Opportunities" }]}
        eyebrow="Opportunities"
        title={
          <>
            Every door in the ecosystem.{" "}
            <span className="text-accent">One board.</span>
          </>
        }
        lead="Incubation programs, accelerators, grants, funding, challenges, jobs, pilots and partnerships — unified, filterable and always current."
      />

      <section className="bg-soft py-14 md:py-16">
        <Container>
          <OpportunityBoard />
        </Container>
      </section>

      <CTA
        title="Never miss a deadline again."
        lead="Members get a weekly, stage-matched opportunity digest — plus one-click applications with their startup profile."
        primary={{ label: "Get the digest", href: "/register" }}
        secondary={{ label: "Browse resources", href: "/explore/resources" }}
      />
    </>
  );
}
