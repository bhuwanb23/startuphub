import type { Metadata } from "next";
import { CorporateShell } from "@/users/corporate/corporate";
import { ChallengeManagement } from "@/users/corporate/components/innovation";

export const metadata: Metadata = { title: "Challenge Management · Arjuna Industries" };

export default function Page() {
  return (
    <CorporateShell title="Challenge Management">
      <ChallengeManagement />
    </CorporateShell>
  );
}
