import type { Metadata } from "next";
import { Palette } from "lucide-react";
import { IprShell } from "@/users/ipr-expert/ipr-expert";
import { AppTemplate } from "@/users/startup/components/app-shell/template";

export const metadata: Metadata = { title: "Design Management · Dr. Kavita Rao" };

export default function Page() {
  return (
    <IprShell title="Design Management">
      <AppTemplate
        icon={Palette}
        title="Design Management"
        desc="Design applications, registered designs, jurisdictions and renewal dates."
        nextFeatures={["Design registry", "Registrations", "Renewals", "Drawings"]}
      />
    </IprShell>
  );
}
