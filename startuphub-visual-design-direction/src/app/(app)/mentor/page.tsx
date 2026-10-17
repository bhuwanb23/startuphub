import type { Metadata } from "next";
import { MentorShell } from "@/users/mentor/mentor";
import { MentorDashboard } from "@/users/mentor/components/dashboard/dashboard";

export const metadata: Metadata = { title: "Dashboard · Priya Nair" };

export default function Page() {
  return (
    <MentorShell title="Dashboard">
      <MentorDashboard />
    </MentorShell>
  );
}
