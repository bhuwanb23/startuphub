import PageHero from "@/components/page-hero";
import ModulesGrid from "@/views/platform/components/modules-grid";
import CTA from "@/components/cta";

export function PlatformView() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Platform" }]}
        eyebrow="The Platform"
        title={
          <>
            One operating system for{" "}
            <span className="text-accent">the entire journey.</span>
          </>
        }
        lead="Idea management, incubation, IPR, resources, intelligence, funding, growth, performance, marketplace — and the AI layer tying all of it together."
      />
      <ModulesGrid />
      <CTA
        title="See the modules working for you."
        lead="Create a free profile and the platform configures itself around your role and stage."
        primary={{ label: "Get Started", href: "/register" }}
        secondary={{ label: "Explore the lifecycle", href: "/lifecycle" }}
        note="Free to start · Set up in 4 minutes · No credit card"
      />
    </>
  );
}
