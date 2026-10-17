import type { Metadata } from "next";
import { ArrowLeftRight } from "lucide-react";
import { IprShell } from "@/users/ipr-expert/ipr-expert";
import { AppTemplate } from "@/users/startup/components/app-shell/template";

export const metadata: Metadata = { title: "IP Transfer Management · Dr. Kavita Rao" };

export default function Page() {
  return (
    <IprShell title="IP Transfer Management">
      <AppTemplate
        icon={ArrowLeftRight}
        title="IP Transfer Management"
        desc="Transfer requests, agreements and ownership changes with full audit trail."
        nextFeatures={["Transfer requests", "Agreements", "Ownership change", "History"]}
      />
    </IprShell>
  );
}
