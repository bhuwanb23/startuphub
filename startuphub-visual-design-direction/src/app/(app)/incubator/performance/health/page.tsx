import type { Metadata } from "next";
import { TrendingUp } from "lucide-react";
import { IncubatorShell } from "@/users/incubator/incubator";
import { AppTemplate } from "@/users/startup/components/app-shell/template";

export const metadata: Metadata = { title: "Health Monitoring · StartupHub Labs" };

export default function Page() {
  return (
    <IncubatorShell title="Health Monitoring">
      <AppTemplate
        icon={TrendingUp}
        title="Health Monitoring"
        desc="Dimension-level health trends per startup and cohort over time."
        nextFeatures={["Health trends", "Cohort comparison", "Alert thresholds", "Weekly digests"]}
      />
    </IncubatorShell>
  );
}
