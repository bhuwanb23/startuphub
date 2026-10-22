import type { Metadata } from "next";
import { IncubatorShell } from "@/users/incubator/incubator";
import { MentorAssignments } from "@/users/incubator/components/mentors/assignments";

export const metadata: Metadata = {
  title: "Mentor Assignments · StartupHub Labs",
};

export default function Page() {
  return (
    <IncubatorShell title="Mentor Assignments">
      <MentorAssignments />
    </IncubatorShell>
  );
}
