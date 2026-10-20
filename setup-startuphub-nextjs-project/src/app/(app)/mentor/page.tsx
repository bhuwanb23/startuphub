import type { Metadata } from "next";
import { MentorShell } from "@/users/mentor/mentor";
import { MentorDashboard } from "@/users/mentor/components/dashboard/dashboard";

export const metadata: Metadata = { title: "Overview · Priya Nair" };

export default function Page() {
  return (
    <MentorShell title="Overview">
      <MentorDashboard />
    </MentorShell>
  );
}
