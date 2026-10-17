import PageHero from "@/components/page-hero";
import { Container } from "@/components/ui";
import FeaturedStory from "@/views/success-stories/components/featured";
import StoriesClient from "@/views/success-stories/components/stories-client";
import CTA from "@/components/cta";

export function SuccessStoriesView() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Resources" }, { label: "Success Stories" }]}
        eyebrow="Success Stories"
        title={
          <>
            Proof, told by the people{" "}
            <span className="text-accent">who lived it.</span>
          </>
        }
        lead="Startup stories, founder journeys, funding wins, IPR saves and enterprise breakthroughs — with the numbers attached."
      />
      <FeaturedStory />
      <section className="border-t border-line bg-soft py-20 md:py-24">
        <Container>
          <StoriesClient />
        </Container>
      </section>
      <CTA
        title="Your story could be next."
        lead="Every story on this page started as a profile on StartupHub. Write yours."
        primary={{ label: "Start your journey", href: "/register" }}
        secondary={{ label: "Startup showcase", href: "/showcase" }}
      />
    </>
  );
}
