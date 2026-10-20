import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { GovCalendar } from "@/users/government/components/ops/workspace";

export const metadata: Metadata = { title: "Calendar · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="Calendar">
      <GovCalendar />
    </GovernmentShell>
  );
}
