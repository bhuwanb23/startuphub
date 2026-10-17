import type { Metadata } from "next";
import { Activity } from "lucide-react";
import { MentorShell } from "@/users/mentor/mentor";
import { AppTemplate } from "@/users/startup/components/app-shell/template";

export const metadata: Metadata = { title: "Activity · Priya Nair" };

export default function Page() {
  return (
    <MentorShell title="Activity">
      <AppTemplate
        icon={Activity}
        title="Activity"
        desc="Your complete action history across mentorships, sessions, tasks and documents."
        nextFeatures={["Mentorship activity", "Session log", "Task history", "Filters"]}
      />
    </MentorShell>
  );
}
