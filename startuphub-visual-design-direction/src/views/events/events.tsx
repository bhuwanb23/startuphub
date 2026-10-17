import PageHero from "@/components/page-hero";
import { Container } from "@/components/ui";
import EventsClient from "@/views/events/components/events-client";
import CTA from "@/components/cta";

export function EventsView() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Resources" }, { label: "Events" }]}
        eyebrow="Events"
        title={
          <>
            The rooms where the ecosystem{" "}
            <span className="text-accent">actually meets.</span>
          </>
        }
        lead="Hackathons, workshops, demo days, investor events and conferences — curated for builders, not badge collectors."
      />

      <section className="bg-soft py-14 md:py-16">
        <Container>
          <EventsClient />
        </Container>
      </section>

      <CTA
        title="Get the weekly event radar."
        lead="One concise email each Monday — the events worth your time, filtered to your city and stage."
        primary={{ label: "Subscribe free", href: "/register" }}
        secondary={{ label: "Browse opportunities", href: "/opportunities" }}
      />
    </>
  );
}
