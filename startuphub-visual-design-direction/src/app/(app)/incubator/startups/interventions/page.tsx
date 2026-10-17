import type { Metadata } from "next";
import { Target } from "lucide-react";
import { IncubatorShell } from "@/users/incubator/incubator";
import { AppTemplate } from "@/users/startup/components/app-shell/template";

export const metadata: Metadata = { title: "Interventions · StartupHub Labs" };

export default function Page() {
  return (
    <IncubatorShell title="Interventions">
      <AppTemplate
        icon={Target}
        title="Interventions"
        desc="Intervention plans for at-risk startups — owners, tasks, progress and outcomes."
        nextFeatures={["Intervention plans", "Assigned experts", "Task tracking", "Outcome history"]}
      />
    </IncubatorShell>
  );
}
