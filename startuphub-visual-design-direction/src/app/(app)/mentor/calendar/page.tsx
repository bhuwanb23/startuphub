import type { Metadata } from "next";
import { CalendarDays } from "lucide-react";
import { MentorShell } from "@/users/mentor/mentor";
import { AppTemplate } from "@/users/startup/components/app-shell/template";

export const metadata: Metadata = { title: "Calendar · Priya Nair" };

export default function Page() {
  return (
    <MentorShell title="Calendar">
      <AppTemplate
        icon={CalendarDays}
        title="Calendar"
        desc="Sessions, milestones, tasks and your availability on a single grid."
        nextFeatures={["Session grid", "Milestone overlay", "Availability view", "Deadlines"]}
      />
    </MentorShell>
  );
}
