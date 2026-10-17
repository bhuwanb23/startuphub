import PageHero from "@/components/page-hero";
import LifecycleOverview from "@/views/lifecycle/components/overview";
import StageExplorer from "@/views/lifecycle/components/stage-explorer";
import HowConnected from "@/views/lifecycle/components/how-connected";
import Journey from "@/views/lifecycle/components/journey";
import AiLayer from "@/views/lifecycle/components/ai-layer";
import CTA from "@/components/cta";

export function LifecycleView() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Startup Lifecycle" }]}
        eyebrow="Startup Lifecycle"
        title={
          <>
            Eleven stages. One path.{" "}
            <span className="text-accent">Zero dead ends.</span>
          </>
        }
        lead="The lifecycle is the backbone of StartupHub — every module, match and metric hangs off where you are on this path."
      />
      <LifecycleOverview />
      <StageExplorer />
      <HowConnected />
      <Journey />
      <AiLayer />
      <CTA
        title="Where are you on the path?"
        primary={{ label: "Find your stage", href: "/register" }}
        secondary={{ label: "See the platform", href: "/platform" }}
        note="Takes 4 minutes · Your stage unlocks the right tools automatically"
      />
    </>
  );
}
