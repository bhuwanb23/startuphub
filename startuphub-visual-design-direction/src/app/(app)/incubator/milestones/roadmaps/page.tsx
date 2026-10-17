import type { Metadata } from "next";
import { Target } from "lucide-react";
import { IncubatorShell } from "@/users/incubator/incubator";
import { AppTemplate } from "@/users/startup/components/app-shell/template";

export const metadata: Metadata = { title: "Roadmaps · StartupHub Labs" };

export default function Page() {
  return (
    <IncubatorShell title="Roadmaps">
      <AppTemplate
        icon={Target}
        title="Roadmaps"
        desc="Program-level roadmaps and per-startup timelines with dependencies."
        nextFeatures={["Program roadmap", "Phases & goals", "Dependencies", "Progress overlays"]}
      />
    </IncubatorShell>
  );
}
