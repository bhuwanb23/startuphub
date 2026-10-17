import type { Metadata } from "next";
import { Workflow } from "lucide-react";
import { IncubatorShell } from "@/users/incubator/incubator";
import { AppTemplate } from "@/users/startup/components/app-shell/template";

export const metadata: Metadata = { title: "Program Discovery · StartupHub Labs" };

export default function Page() {
  return (
    <IncubatorShell title="Program Discovery">
      <AppTemplate
        icon={Workflow}
        title="Program Discovery"
        desc="Find external ecosystem programs your incubator can participate in or partner with."
        nextFeatures={["External programs", "Partner matching", "Consortium view", "Apply as program"]}
      />
    </IncubatorShell>
  );
}
