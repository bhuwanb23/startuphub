import PageHero from "@/components/page-hero";
import { Container } from "@/components/ui";
import FaqClient from "@/views/faq/components/faq-client";
import CTA from "@/components/cta";

export function FaqView() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Resources" }, { label: "FAQ" }]}
        eyebrow="FAQ"
        title={
          <>
            Answers, before you{" "}
            <span className="text-accent">have to ask.</span>
          </>
        }
        lead="Everything about the platform, lifecycle, IPR, funding, mentorship and organizations — searchable and straight to the point."
      />
      <section className="bg-soft py-16 md:py-20">
        <Container>
          <FaqClient />
        </Container>
      </section>
      <CTA
        title="Didn't find your answer?"
        lead="The ecosystem team replies within one working day — and genuinely good questions become new FAQ entries."
        primary={{ label: "Ask us anything", href: "/contact" }}
        secondary={{ label: "Get started free", href: "/register" }}
      />
    </>
  );
}
