import type { Metadata } from "next";
import { IncubatorShell } from "@/users/incubator/incubator";
import { ProgramCalendar } from "@/users/incubator/components/programs/calendar";

export const metadata: Metadata = {
  title: "Program Calendar · StartupHub Labs",
};

export default function Page() {
  return (
    <IncubatorShell title="Program Calendar">
      <ProgramCalendar />
    </IncubatorShell>
  );
}
