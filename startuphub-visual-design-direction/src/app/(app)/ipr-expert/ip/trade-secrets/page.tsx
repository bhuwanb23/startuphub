import type { Metadata } from "next";
import { Lock } from "lucide-react";
import { IprShell } from "@/users/ipr-expert/ipr-expert";
import { AppTemplate } from "@/users/startup/components/app-shell/template";

export const metadata: Metadata = { title: "Trade Secret Management · Dr. Kavita Rao" };

export default function Page() {
  return (
    <IprShell title="Trade Secret Management">
      <AppTemplate
        icon={Lock}
        title="Trade Secret Management"
        desc="Classified assets, access control, confidentiality measures and protection audits."
        nextFeatures={["Classification", "Access control", "NDA tracking", "Risk audit"]}
      />
    </IprShell>
  );
}
