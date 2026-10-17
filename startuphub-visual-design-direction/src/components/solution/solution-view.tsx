import SolutionHero from "@/components/solution/solution-hero";
import { Capabilities, Outcomes, Workflow } from "@/components/solution/sections";
import CTA from "@/components/cta";
import type { SolutionData } from "@/components/solution/types";

export default function SolutionView({ data }: { data: SolutionData }) {
  return (
    <>
      <SolutionHero data={data} />
      <Capabilities data={data} />
      <Workflow data={data} />
      <Outcomes data={data} />
      <CTA
        title={`Ready to join as ${data.audience.toLowerCase().replace(/s$/, "")}?`}
        lead="Create your free profile — the ecosystem configures itself around your role in minutes."
        primary={{ label: data.ctaLabel, href: "/register" }}
        secondary={{ label: "Browse all solutions", href: "/solutions" }}
        note="Free to start · Verified in 48 hours · Cancel anytime"
      />
    </>
  );
}
