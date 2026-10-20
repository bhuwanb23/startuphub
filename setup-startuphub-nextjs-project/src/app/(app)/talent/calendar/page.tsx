import type { Metadata } from "next";
import { TalentShell } from "@/users/talent/talent";
import { TalentCalendar } from "@/users/talent/components/workspace/calendar";

export const metadata: Metadata = { title: "Calendar · Zoya Khan" };

export default function Page() {
  return (
    <TalentShell title="Calendar">
      <TalentCalendar />
    </TalentShell>
  );
}
