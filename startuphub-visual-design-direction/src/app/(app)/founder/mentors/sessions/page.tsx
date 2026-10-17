import type { Metadata } from "next";
import { FounderShell } from "@/users/startup/startup";
import { MentorSessions } from "@/users/startup/components/mentors/sessions";

export const metadata: Metadata = { title: "Mentor Sessions · Lumen AI" };

export default function Page() {
  return (
    <FounderShell title="Mentor Sessions">
      <MentorSessions />
    </FounderShell>
  );
}
