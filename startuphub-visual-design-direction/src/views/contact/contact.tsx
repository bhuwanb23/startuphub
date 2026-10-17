import PageHero from "@/components/page-hero";
import { Container } from "@/components/ui";
import ContactClient from "@/views/contact/components/contact-client";

export function ContactView() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Organization" }, { label: "Contact & Support" }]}
        eyebrow="Contact & Support"
        title={
          <>
            Real humans, <span className="text-accent">fast replies.</span>
          </>
        }
        lead="Questions, partnerships, support, feedback or issues — pick a lane and a real person on the ecosystem team picks it up."
      />
      <section className="bg-soft py-16 md:py-20">
        <Container>
          <ContactClient />
        </Container>
      </section>
    </>
  );
}
