import type { Metadata } from "next";
import { MentorShell } from "@/users/mentor/mentor";
import { Recommendations } from "@/users/mentor/components/mentorship/recommendations";

export const metadata: Metadata = { title: "Recommendations & Tasks · Priya Nair" };

export default function Page() {
  return (
    <MentorShell title="Recommendations & Tasks">
      <Recommendations />
    </MentorShell>
  );
}
