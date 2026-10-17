import type { Metadata } from "next";
import { Settings } from "lucide-react";
import { FounderShell } from "@/users/startup/startup";
import { AppTemplate } from "@/users/startup/components/app-shell/template";

export const metadata: Metadata = { title: "Settings · Lumen AI" };

export default function Page() {
  return (
    <FounderShell title="Settings">
      <AppTemplate
        icon={Settings}
        title="Settings"
        desc="Account, startup, team, notifications, privacy, integrations and billing."
        nextFeatures={["Account security", "Team roles", "Notification rules", "Billing & plan"]}
      />
    </FounderShell>
  );
}
