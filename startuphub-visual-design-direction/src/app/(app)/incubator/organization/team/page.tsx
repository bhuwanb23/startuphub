import type { Metadata } from "next";
import { IncubatorShell } from "@/users/incubator/incubator";
import { TeamStaff } from "@/users/incubator/components/organization/team";

export const metadata: Metadata = { title: "Team & Staff · StartupHub Labs" };

export default function Page() {
  return (
    <IncubatorShell title="Team & Staff">
      <TeamStaff />
    </IncubatorShell>
  );
}
