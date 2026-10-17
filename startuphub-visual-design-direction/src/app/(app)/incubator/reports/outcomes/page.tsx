import type { Metadata } from "next";
import { BarChart3 } from "lucide-react";
import { IncubatorShell } from "@/users/incubator/incubator";
import { AppTemplate } from "@/users/startup/components/app-shell/template";

export const metadata: Metadata = { title: "Outcome Tracking · StartupHub Labs" };

export default function Page() {
  return (
    <IncubatorShell title="Outcome Tracking">
      <AppTemplate
        icon={BarChart3}
        title="Outcome Tracking"
        desc="Survival, jobs, funding, patents and market outcomes per program."
        nextFeatures={["Outcome metrics", "Funder exports", "Year-over-year", "Benchmarks"]}
      />
    </IncubatorShell>
  );
}
