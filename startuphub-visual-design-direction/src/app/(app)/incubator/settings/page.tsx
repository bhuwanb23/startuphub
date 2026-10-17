import type { Metadata } from "next";
import { Settings } from "lucide-react";
import { IncubatorShell } from "@/users/incubator/incubator";
import { AppTemplate } from "@/users/startup/components/app-shell/template";

export const metadata: Metadata = { title: "Settings · StartupHub Labs" };

export default function Page() {
  return (
    <IncubatorShell title="Settings">
      <AppTemplate
        icon={Settings}
        title="Settings"
        desc="Organization, team, program defaults, notifications, privacy, integrations and billing."
        nextFeatures={["Org profile", "Roles & access", "Program defaults", "Billing"]}
      />
    </IncubatorShell>
  );
}
