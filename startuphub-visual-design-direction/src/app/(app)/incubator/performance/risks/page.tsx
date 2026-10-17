import type { Metadata } from "next";
import { ShieldAlert } from "lucide-react";
import { IncubatorShell } from "@/users/incubator/incubator";
import { AppTemplate } from "@/users/startup/components/app-shell/template";

export const metadata: Metadata = { title: "Risk Monitoring · StartupHub Labs" };

export default function Page() {
  return (
    <IncubatorShell title="Risk Monitoring">
      <AppTemplate
        icon={ShieldAlert}
        title="Risk Monitoring"
        desc="Risk dashboards with early-warning signals, history and owner routing."
        nextFeatures={["Risk register", "Early warnings", "Owner routing", "History"]}
      />
    </IncubatorShell>
  );
}
