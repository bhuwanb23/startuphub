import type { Metadata } from "next";
import { UniversityShell } from "@/users/university/university";
import { UniversityCalendar } from "@/users/university/components/workspace/calendar";

export const metadata: Metadata = { title: "Calendar · Crestmont University" };

export default function Page() {
  return (
    <UniversityShell title="Calendar">
      <UniversityCalendar />
    </UniversityShell>
  );
}
