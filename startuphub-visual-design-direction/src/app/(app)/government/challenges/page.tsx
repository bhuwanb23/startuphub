import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { ChallengeManagement } from "@/users/government/components/challenges";

export const metadata: Metadata = { title: "Challenge Management · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="Challenge Management">
      <ChallengeManagement />
    </GovernmentShell>
  );
}
