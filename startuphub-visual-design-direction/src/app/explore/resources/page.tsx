import type { Metadata } from "next";
import { Layers } from "lucide-react";
import SoonView from "@/components/soon";

export const metadata: Metadata = {
  title: "Resource Directory — StartupHub",
  description: "Curated tools, credits, templates and services for every startup stage.",
};

export default function Page() {
  return (
    <SoonView
      icon={Layers}
      title="The Resource Hub is being stocked."
      desc="Browse and claim startup resources — cloud credits, legal templates, tooling perks and vetted services, all stage-matched."
      features={["$250K+ in credits & perks", "Template library", "Vetted service marketplace", "Stage-gated unlocking"]}
    />
  );
}
