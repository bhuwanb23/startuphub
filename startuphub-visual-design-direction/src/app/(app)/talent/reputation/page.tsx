import type { Metadata } from "next";
import { TalentShell } from "@/users/talent/talent";
import { TalentReputation } from "@/users/talent/components/reputation/reputation";

export const metadata: Metadata = { title: "Reputation · Zoya Khan" };

export default function Page() {
  return (
    <TalentShell title="Reputation">
      <TalentReputation />
    </TalentShell>
  );
}
