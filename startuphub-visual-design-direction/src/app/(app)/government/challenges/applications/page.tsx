import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { ChallengeApplications } from "@/users/government/components/challenges";

export const metadata: Metadata = { title: "Challenge Applications · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="Challenge Applications">
      <ChallengeApplications />
    </GovernmentShell>
  );
}
