import type { Metadata } from "next";
import { FounderShell } from "@/users/startup/startup";
import { TeamManagement } from "@/users/startup/components/startup/team";

export const metadata: Metadata = { title: "Team Management · Lumen AI" };

export default function Page() {
  return (
    <FounderShell title="Team Management">
      <TeamManagement />
    </FounderShell>
  );
}
