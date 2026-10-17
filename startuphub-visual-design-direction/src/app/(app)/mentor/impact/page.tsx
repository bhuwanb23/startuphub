import type { Metadata } from "next";
import { MentorShell } from "@/users/mentor/mentor";
import { MentorImpact } from "@/users/mentor/components/impact/impact";

export const metadata: Metadata = { title: "Impact · Priya Nair" };

export default function Page() {
  return (
    <MentorShell title="Impact">
      <MentorImpact />
    </MentorShell>
  );
}
