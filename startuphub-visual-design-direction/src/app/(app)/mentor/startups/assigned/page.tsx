import type { Metadata } from "next";
import { MentorShell } from "@/users/mentor/mentor";
import { AssignedStartups } from "@/users/mentor/components/startups/assigned";

export const metadata: Metadata = { title: "Assigned Startups · Priya Nair" };

export default function Page() {
  return (
    <MentorShell title="Assigned Startups">
      <AssignedStartups />
    </MentorShell>
  );
}
