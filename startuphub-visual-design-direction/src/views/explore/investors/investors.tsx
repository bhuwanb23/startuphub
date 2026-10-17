import PageHero from "@/components/page-hero";
import { Container } from "@/components/ui";
import InvestorsDirectory from "@/views/explore/investors/components/directory-client";
import CTA from "@/components/cta";

export function InvestorsDirectoryView() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Explore" }, { label: "Investors" }]}
        eyebrow="Investor Directory"
        title={
          <>
            Capital that matches{" "}
            <span className="text-accent">your stage and thesis.</span>
          </>
        }
        lead="480+ verified investors — with public theses, ticket sizes and portfolio signals. Warm introductions happen inside the platform."
      />

      <section className="bg-soft py-14 md:py-16">
        <Container>
          <InvestorsDirectory />
        </Container>
      </section>

      <CTA
        title="Want matched, not listed?"
        lead="Cold pitching rarely works. Verified startups get double opt-in introductions based on real thesis fit."
        primary={{ label: "Raise with StartupHub", href: "/solutions/founders" }}
        secondary={{ label: "Join as an investor", href: "/solutions/investors" }}
      />
    </>
  );
}
