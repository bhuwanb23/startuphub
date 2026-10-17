import type { Metadata } from "next";
import { HelpCircle } from "lucide-react";
import { IprShell } from "@/users/ipr-expert/ipr-expert";
import { AppTemplate } from "@/users/startup/components/app-shell/template";

export const metadata: Metadata = { title: "Help & Support · Dr. Kavita Rao" };

export default function Page() {
  return (
    <IprShell title="Help & Support">
      <AppTemplate
        icon={HelpCircle}
        title="Help & Support"
        desc="IPR expert guide, legal workspace guide and direct support."
        nextFeatures={["IPR expert guide", "FAQs", "Contact support", "Feature requests"]}
      />
    </IprShell>
  );
}
