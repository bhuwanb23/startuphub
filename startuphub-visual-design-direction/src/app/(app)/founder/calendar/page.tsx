import type { Metadata } from "next";
import { CalendarDays } from "lucide-react";
import { FounderShell } from "@/users/startup/startup";
import { AppTemplate } from "@/users/startup/components/app-shell/template";

export const metadata: Metadata = { title: "Calendar · Lumen AI" };

export default function Page() {
  return (
    <FounderShell title="Calendar">
      <AppTemplate
        icon={CalendarDays}
        title="Calendar"
        desc="Meetings, mentor sessions, deadlines and milestones on one honest grid."
        nextFeatures={["Mentor sessions", "IPR deadlines", "Investor meetings", "Milestone view"]}
      />
    </FounderShell>
  );
}
