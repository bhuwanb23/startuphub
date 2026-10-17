import type { Metadata } from "next";
import { MentorShell } from "@/users/mentor/mentor";
import { DocumentReview } from "@/users/mentor/components/mentorship/review";

export const metadata: Metadata = { title: "Document Review · Priya Nair" };

export default function Page() {
  return (
    <MentorShell title="Document Review">
      <DocumentReview />
    </MentorShell>
  );
}
