import type { Metadata } from "next";
import { Activity } from "lucide-react";
import { IncubatorShell } from "@/users/incubator/incubator";
import { AppTemplate } from "@/users/startup/components/app-shell/template";

export const metadata: Metadata = { title: "Activity · StartupHub Labs" };

export default function Page() {
  return (
    <IncubatorShell title="Activity">
      <AppTemplate
        icon={Activity}
        title="Activity"
        desc="Complete audit trail across programs, startups, mentors, resources and documents."
        nextFeatures={["Full audit trail", "Per-startup view", "Per-user view", "Filters"]}
      />
    </IncubatorShell>
  );
}
