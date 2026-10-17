import type { Metadata } from "next";
import { CalendarDays } from "lucide-react";
import { IncubatorShell } from "@/users/incubator/incubator";
import { AppTemplate } from "@/users/startup/components/app-shell/template";

export const metadata: Metadata = { title: "Program Calendar · StartupHub Labs" };

export default function Page() {
  return (
    <IncubatorShell title="Program Calendar">
      <AppTemplate
        icon={CalendarDays}
        title="Program Calendar"
        desc="One calendar across programs — intakes, reviews, demo days and milestones."
        nextFeatures={["Intake windows", "Review calendar", "Demo-day timeline", "Milestone overlay"]}
      />
    </IncubatorShell>
  );
}
