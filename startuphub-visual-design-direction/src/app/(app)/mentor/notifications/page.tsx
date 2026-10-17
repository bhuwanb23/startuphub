import type { Metadata } from "next";
import { Bell } from "lucide-react";
import { MentorShell } from "@/users/mentor/mentor";
import { AppTemplate } from "@/users/startup/components/app-shell/template";

export const metadata: Metadata = { title: "Notifications · Priya Nair" };

export default function Page() {
  return (
    <MentorShell title="Notifications">
      <AppTemplate
        icon={Bell}
        title="Notifications"
        desc="Mentorship requests, sessions, tasks, milestones and system alerts in one place."
        nextFeatures={["Request alerts", "Session reminders", "Milestone pings", "Filters"]}
      />
    </MentorShell>
  );
}
