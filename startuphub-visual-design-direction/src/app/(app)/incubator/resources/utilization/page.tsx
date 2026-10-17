import type { Metadata } from "next";
import { Layers } from "lucide-react";
import { IncubatorShell } from "@/users/incubator/incubator";
import { AppTemplate } from "@/users/startup/components/app-shell/template";

export const metadata: Metadata = { title: "Resource Utilization · StartupHub Labs" };

export default function Page() {
  return (
    <IncubatorShell title="Resource Utilization">
      <AppTemplate
        icon={Layers}
        title="Resource Utilization"
        desc="Usage analytics across inventory, startups and providers with cost views."
        nextFeatures={["Usage trends", "Startup breakdown", "Cost per startup", "Underused assets"]}
      />
    </IncubatorShell>
  );
}
