import type { Metadata } from "next";
import { FileText } from "lucide-react";
import { IprShell } from "@/users/ipr-expert/ipr-expert";
import { AppTemplate } from "@/users/startup/components/app-shell/template";

export const metadata: Metadata = { title: "Documents · Dr. Kavita Rao" };

export default function Page() {
  return (
    <IprShell title="Documents">
      <AppTemplate
        icon={FileText}
        title="Documents"
        desc="IP, legal, filing and case documents — plus your template library."
        nextFeatures={["Filing docs", "Legal docs", "Case files", "Templates"]}
      />
    </IprShell>
  );
}
