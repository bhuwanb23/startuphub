import type { Metadata } from "next";
import { CheckSquare } from "lucide-react";
import { MentorShell } from "@/users/mentor/mentor";
import { AppTemplate } from "@/users/startup/components/app-shell/template";

export const metadata: Metadata = { title: "Task Assignment · Priya Nair" };

export default function Page() {
  return (
    <MentorShell title="Task Assignment">
      <AppTemplate
        icon={CheckSquare}
        title="Task Assignment"
        desc="Create and track tasks for your assigned startups with deadlines and completion states."
        nextFeatures={["Task board", "Due dates", "Completion tracking", "Task history"]}
      />
    </MentorShell>
  );
}
