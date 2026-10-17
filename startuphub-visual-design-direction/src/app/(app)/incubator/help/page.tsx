import type { Metadata } from "next";
import { HelpCircle } from "lucide-react";
import { IncubatorShell } from "@/users/incubator/incubator";
import { AppTemplate } from "@/users/startup/components/app-shell/template";

export const metadata: Metadata = { title: "Help & Support · StartupHub Labs" };

export default function Page() {
  return (
    <IncubatorShell title="Help & Support">
      <AppTemplate
        icon={HelpCircle}
        title="Help & Support"
        desc="Guides for program and startup management, plus direct support from StartupHub."
        nextFeatures={["Program guide", "Startup guide", "FAQs", "Contact support"]}
      />
    </IncubatorShell>
  );
}
