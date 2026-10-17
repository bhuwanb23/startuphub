import type { Metadata } from "next";
import { HelpCircle } from "lucide-react";
import { FounderShell } from "@/users/startup/startup";
import { AppTemplate } from "@/users/startup/components/app-shell/template";

export const metadata: Metadata = { title: "Help & Support · Lumen AI" };

export default function Page() {
  return (
    <FounderShell title="Help & Support">
      <AppTemplate
        icon={HelpCircle}
        title="Help & Support"
        desc="Guides, FAQs and a direct line to the ecosystem team."
        nextFeatures={["Getting started", "Contact support", "System status", "Feature requests"]}
      />
    </FounderShell>
  );
}
