import type { Metadata } from "next";
import { Copyright } from "lucide-react";
import { IprShell } from "@/users/ipr-expert/ipr-expert";
import { AppTemplate } from "@/users/startup/components/app-shell/template";

export const metadata: Metadata = { title: "Copyright Management · Dr. Kavita Rao" };

export default function Page() {
  return (
    <IprShell title="Copyright Management">
      <AppTemplate
        icon={Copyright}
        title="Copyright Management"
        desc="Copyright portfolio, works, registrations, ownership and jurisdictions per client."
        nextFeatures={["Works registry", "Registrations", "Ownership", "Documents"]}
      />
    </IprShell>
  );
}
