import PageHero from "@/components/page-hero";
import { Container } from "@/components/ui";
import ResourceExplorer from "@/views/resources/components/resource-explorer";
import CTA from "@/components/cta";

export function ResourcesView() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Explore" }, { label: "Resources" }]}
        eyebrow="Resource Hub"
        title={
          <>
            $250K+ of fuel,{" "}
            <span className="text-accent">unlocked by stage.</span>
          </>
        }
        lead="Cloud credits, lab time, grants, templates and talent — every resource on the platform, claimable as your startup advances."
      />

      <section className="bg-soft py-14 md:py-16">
        <Container>
          <ResourceExplorer />
        </Container>
      </section>

      <CTA
        title="Your stage unlocks your stack."
        lead="Create a profile and the Resource Hub configures itself to where you are right now."
        primary={{ label: "Unlock resources", href: "/register" }}
        secondary={{ label: "See the lifecycle", href: "/lifecycle" }}
      />
    </>
  );
}
