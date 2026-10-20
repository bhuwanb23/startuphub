import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { ChallengeOutcomes } from "@/users/government/components/challenges";

export const metadata: Metadata = { title: "Challenge Outcomes · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="Challenge Outcomes">
      <ChallengeOutcomes />
    </GovernmentShell>
  );
}
