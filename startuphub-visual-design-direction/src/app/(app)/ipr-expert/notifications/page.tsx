import type { Metadata } from "next";
import { Bell } from "lucide-react";
import { IprShell } from "@/users/ipr-expert/ipr-expert";
import { AppTemplate } from "@/users/startup/components/app-shell/template";

export const metadata: Metadata = { title: "Notifications · Dr. Kavita Rao" };

export default function Page() {
  return (
    <IprShell title="Notifications">
      <AppTemplate
        icon={Bell}
        title="Notifications"
        desc="Filing deadlines, renewal alerts, case updates, risk alerts and client requests."
        nextFeatures={["Deadline alerts", "Renewal pings", "Case updates", "Risk alerts"]}
      />
    </IprShell>
  );
}
