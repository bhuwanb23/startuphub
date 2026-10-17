import type { Metadata } from "next";
import { Users } from "lucide-react";
import { FounderShell } from "@/users/startup/startup";
import { AppTemplate } from "@/users/startup/components/app-shell/template";

export const metadata: Metadata = { title: "Customers · Lumen AI" };

export default function Page() {
  return (
    <FounderShell title="Customers">
      <AppTemplate
        icon={Users}
        title="Customers"
        desc="Segments, personas, validation dashboards, surveys and feedback with sentiment analysis."
        nextFeatures={["Segments & personas", "Validation experiments", "Survey builder", "Feedback sentiment"]}
      />
    </FounderShell>
  );
}
