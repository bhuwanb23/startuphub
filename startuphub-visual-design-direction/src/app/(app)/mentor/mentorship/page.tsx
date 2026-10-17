import type { Metadata } from "next";
import { MentorShell } from "@/users/mentor/mentor";
import { MentorshipSessions } from "@/users/mentor/components/mentorship/mentorship";

export const metadata: Metadata = { title: "Mentoring Sessions · Priya Nair" };

export default function Page() {
  return (
    <MentorShell title="Mentoring Sessions">
      <MentorshipSessions />
    </MentorShell>
  );
}
