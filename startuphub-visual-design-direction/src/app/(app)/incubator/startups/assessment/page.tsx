import type { Metadata } from "next";
import { Rocket } from "lucide-react";
import { IncubatorShell } from "@/users/incubator/incubator";
import { AppTemplate } from "@/users/startup/components/app-shell/template";

export const metadata: Metadata = { title: "Startup Assessment · StartupHub Labs" };

export default function Page() {
  return (
    <IncubatorShell title="Startup Assessment">
      <AppTemplate
        icon={Rocket}
        title="Startup Assessment"
        desc="Periodic scored assessments per startup with recommendations and history."
        nextFeatures={["Readiness scores", "Dimension breakdown", "Assessment history", "AI recommendations"]}
      />
    </IncubatorShell>
  );
}
