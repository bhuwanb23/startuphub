import type { Metadata } from "next";
import { Settings } from "lucide-react";
import { IprShell } from "@/users/ipr-expert/ipr-expert";
import { AppTemplate } from "@/users/startup/components/app-shell/template";

export const metadata: Metadata = { title: "Settings · Dr. Kavita Rao" };

export default function Page() {
  return (
    <IprShell title="Settings">
      <AppTemplate
        icon={Settings}
        title="Settings"
        desc="Account, professional profile, jurisdictions, notifications, privacy and billing."
        nextFeatures={["Professional profile", "Jurisdictions", "Alerts", "Billing"]}
      />
    </IprShell>
  );
}
