import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { ChallengeSelection } from "@/users/government/components/challenges";

export const metadata: Metadata = { title: "Challenge Selection · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="Challenge Selection">
      <ChallengeSelection />
    </GovernmentShell>
  );
}
