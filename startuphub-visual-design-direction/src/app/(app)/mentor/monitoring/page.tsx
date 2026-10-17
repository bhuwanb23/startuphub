import type { Metadata } from "next";
import { MentorShell } from "@/users/mentor/mentor";
import { Monitoring } from "@/users/mentor/components/monitoring/monitoring";

export const metadata: Metadata = { title: "Monitoring · Priya Nair" };

export default function Page() {
  return (
    <MentorShell title="Monitoring">
      <Monitoring />
    </MentorShell>
  );
}
