import type { Metadata } from "next";
import { Settings } from "lucide-react";
import { MentorShell } from "@/users/mentor/mentor";
import { AppTemplate } from "@/users/startup/components/app-shell/template";

export const metadata: Metadata = { title: "Settings · Priya Nair" };

export default function Page() {
  return (
    <MentorShell title="Settings">
      <AppTemplate
        icon={Settings}
        title="Settings"
        desc="Account, mentor profile, preferences, availability defaults, notifications, privacy and billing."
        nextFeatures={["Profile visibility", "Preferences", "Alerts", "Billing"]}
      />
    </MentorShell>
  );
}
