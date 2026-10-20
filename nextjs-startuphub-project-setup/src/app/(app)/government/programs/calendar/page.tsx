import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { ProgramCalendar } from "@/users/government/components/programs";

export const metadata: Metadata = { title: "Program Calendar · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="Program Calendar">
      <ProgramCalendar />
    </GovernmentShell>
  );
}
