import type { Metadata } from "next";
import { BarChart3 } from "lucide-react";
import { IncubatorShell } from "@/users/incubator/incubator";
import { AppTemplate } from "@/users/startup/components/app-shell/template";

export const metadata: Metadata = { title: "Cohort Analytics · StartupHub Labs" };

export default function Page() {
  return (
    <IncubatorShell title="Cohort Analytics">
      <AppTemplate
        icon={BarChart3}
        title="Cohort Analytics"
        desc="Compare cohorts by survival, funding, IPR, validation and graduation."
        nextFeatures={["Cohort comparison", "Survival curves", "Funding charts", "Outcome deltas"]}
      />
    </IncubatorShell>
  );
}
