import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { ActiveChallenges } from "@/users/government/components/challenges";

export const metadata: Metadata = { title: "Active Challenges · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="Active Challenges">
      <ActiveChallenges />
    </GovernmentShell>
  );
}
