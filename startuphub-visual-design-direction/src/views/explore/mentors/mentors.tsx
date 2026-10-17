import PageHero from "@/components/page-hero";
import { Container } from "@/components/ui";
import MentorsDirectory from "@/views/explore/mentors/components/directory-client";
import CTA from "@/components/cta";

export function MentorsDirectoryView() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Explore" }, { label: "Mentors" }]}
        eyebrow="Mentor & Expert Directory"
        title={
          <>
            Operators who&apos;ve built{" "}
            <span className="text-accent">before you.</span>
          </>
        }
        lead="2,800+ verified experts across product, growth, IPR, fundraising and more. Request structured mentorship — not cold LinkedIn asks."
      />

      <section className="bg-soft py-14 md:py-16">
        <Container>
          <MentorsDirectory />
        </Container>
      </section>

      <CTA
        title="Built something before? Teach it forward."
        lead="Give a few structured hours a month and watch the next generation of founders skip your mistakes."
        primary={{ label: "Become a Mentor", href: "/solutions/mentors" }}
        secondary={{ label: "Explore startups", href: "/explore/startups" }}
      />
    </>
  );
}
