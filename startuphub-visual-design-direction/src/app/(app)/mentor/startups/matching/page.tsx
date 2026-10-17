import type { Metadata } from "next";
import { MentorShell } from "@/users/mentor/mentor";
import { MentorMatching } from "@/users/mentor/components/startups/matching";

export const metadata: Metadata = { title: "Startup Matching · Priya Nair" };

export default function Page() {
  return (
    <MentorShell title="Startup Matching">
      <MentorMatching />
    </MentorShell>
  );
}
