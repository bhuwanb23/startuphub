import type { Metadata } from "next";
import { MentorShell } from "@/users/mentor/mentor";
import { MilestoneReview } from "@/users/mentor/components/mentorship/review";

export const metadata: Metadata = { title: "Milestone Review · Priya Nair" };

export default function Page() {
  return (
    <MentorShell title="Milestone Review">
      <MilestoneReview />
    </MentorShell>
  );
}
