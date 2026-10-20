import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { ChallengeEvaluation } from "@/users/government/components/challenges";

export const metadata: Metadata = { title: "Challenge Evaluation · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="Challenge Evaluation">
      <ChallengeEvaluation />
    </GovernmentShell>
  );
}
