import Hero from "@/views/home/components/hero";
import LifecyclePreview from "@/views/home/components/lifecycle-preview";
import ModulesPreview from "@/views/home/components/modules-preview";
import WhoWeServe from "@/views/home/components/who-we-serve";
import Stats from "@/views/home/components/stats";
import Showcase from "@/views/home/components/showcase";
import Opportunities from "@/views/home/components/opportunities";
import Stories from "@/views/home/components/stories";
import HowItWorks from "@/views/home/components/how-it-works";
import TrustStrip from "@/components/trust-strip";
import CTA from "@/components/cta";

export function HomeView() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <LifecyclePreview />
      <ModulesPreview />
      <WhoWeServe />
      <Stats />
      <Showcase />
      <Opportunities />
      <Stories />
      <HowItWorks />
      <CTA />
    </>
  );
}
