import type { Metadata } from "next";
import { FounderShell } from "@/users/startup/startup";
import { MentorMatching } from "@/users/startup/components/mentors/matching";

export const metadata: Metadata = { title: "Mentor Matching · Lumen AI" };

export default function Page() {
  return (
    <FounderShell title="Mentor Matching">
      <MentorMatching />
    </FounderShell>
  );
}
