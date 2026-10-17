import type { Metadata } from "next";
import { MentorShell } from "@/users/mentor/mentor";
import { MentorRequests } from "@/users/mentor/components/startups/requests";

export const metadata: Metadata = { title: "Mentorship Requests · Priya Nair" };

export default function Page() {
  return (
    <MentorShell title="Mentorship Requests">
      <MentorRequests />
    </MentorShell>
  );
}
