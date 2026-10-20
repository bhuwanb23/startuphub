import { CTA } from "@/components/cta";
import { Capabilities, Outcomes, Workflow } from "./sections";
import { SolutionHero } from "./solution-hero";
import type { SolutionData } from "./types";

export default function SolutionView({ data }: { data: SolutionData }) {
  return (
    <>
      <SolutionHero data={data} />
      <Capabilities data={data} />
      <Workflow data={data} />
      <Outcomes data={data} />
      <CTA
        title={`Ready to join as ${data.audience.toLowerCase()}?`}
        lead="One account opens every workspace in the ecosystem."
        primary={{ label: data.ctaLabel, href: "/register" }}
        secondary={{ label: "Talk to our team", href: "/contact" }}
      />
    </>
  );
}
