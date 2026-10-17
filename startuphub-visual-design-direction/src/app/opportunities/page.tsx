import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import SoonView from "@/components/soon";

export const metadata: Metadata = {
  title: "Opportunities — StartupHub",
  description: "Funding calls, incubation cohorts, challenges and grants — curated and current.",
};

export default function Page() {
  return (
    <SoonView
      icon={Sparkles}
      title="Opportunities are being curated."
      desc="Every funding call, cohort, challenge and grant across the ecosystem — filtered by your stage and sector."
      features={["Funding calls & grants", "Incubation cohorts", "Innovation challenges", "Deadline reminders"]}
    />
  );
}
