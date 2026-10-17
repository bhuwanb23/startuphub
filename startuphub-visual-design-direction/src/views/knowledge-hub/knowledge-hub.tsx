import PageHero from "@/components/page-hero";
import { Container } from "@/components/ui";
import FeaturedGuides from "@/views/knowledge-hub/components/featured-guides";
import HubClient from "@/views/knowledge-hub/components/hub-client";
import CTA from "@/components/cta";

export function KnowledgeHubView() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Resources" }, { label: "Knowledge Hub" }]}
        eyebrow="Knowledge Hub"
        title={
          <>
            Everything we know,{" "}
            <span className="text-accent">written down for you.</span>
          </>
        }
        lead="Articles, guides, playbooks, research and templates — practical knowledge from operators, not recycled listicles."
      />
      <FeaturedGuides />
      <section className="bg-white pb-24 pt-12 md:pb-28">
        <Container>
          <HubClient />
        </Container>
      </section>
      <CTA
        title="Knowledge is better with context."
        lead="Members get guides matched to their current lifecycle stage — the right chapter exactly when you need it."
        primary={{ label: "Get matched content", href: "/register" }}
        secondary={{ label: "Explore resources", href: "/explore/resources" }}
      />
    </>
  );
}
