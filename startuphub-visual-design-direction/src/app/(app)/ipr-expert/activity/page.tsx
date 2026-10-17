import type { Metadata } from "next";
import { Activity } from "lucide-react";
import { IprShell } from "@/users/ipr-expert/ipr-expert";
import { AppTemplate } from "@/users/startup/components/app-shell/template";

export const metadata: Metadata = { title: "Activity · Dr. Kavita Rao" };

export default function Page() {
  return (
    <IprShell title="Activity">
      <AppTemplate
        icon={Activity}
        title="Activity"
        desc="Complete audit trail across clients, filings, cases, documents and licensing."
        nextFeatures={["Audit trail", "Filing log", "Case log", "User activity"]}
      />
    </IprShell>
  );
}
