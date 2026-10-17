import type { Metadata } from "next";
import { MentorShell } from "@/users/mentor/mentor";
import { Scheduling } from "@/users/mentor/components/mentorship/scheduling";

export const metadata: Metadata = { title: "Session Scheduling · Priya Nair" };

export default function Page() {
  return (
    <MentorShell title="Session Scheduling">
      <Scheduling />
    </MentorShell>
  );
}
