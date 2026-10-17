import PageHero from "@/components/page-hero";
import { Container } from "@/components/ui";
import NewsClient from "@/views/news/components/news-client";
import CTA from "@/components/cta";

export function NewsView() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Resources" }, { label: "News & Updates" }]}
        eyebrow="News & Updates"
        title={
          <>
            The ecosystem,{" "}
            <span className="text-accent">this week.</span>
          </>
        }
        lead="Startup moves, funding flows, IPR milestones, policy shifts and platform updates — concise, sourced and noise-free."
      />
      <section className="bg-soft py-14 md:py-16">
        <Container>
          <NewsClient />
        </Container>
      </section>
      <CTA
        title="Get the Friday briefing."
        lead="Five minutes, twelve stories, zero fluff — the exact digest 10,000+ founders read to stay current."
        primary={{ label: "Subscribe to the briefing", href: "/register" }}
        secondary={{ label: "Ecosystem insights", href: "/intelligence/insights" }}
      />
    </>
  );
}
