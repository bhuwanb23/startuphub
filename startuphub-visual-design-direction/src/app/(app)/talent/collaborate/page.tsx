import type { Metadata } from "next";
import { TalentShell } from "@/users/talent/talent";
import { TalentCollaborate } from "@/users/talent/components/collaborate/collaborate";

export const metadata: Metadata = { title: "Collaborate · Zoya Khan" };

export default function Page() {
  return (
    <TalentShell title="Collaborate">
      <TalentCollaborate />
    </TalentShell>
  );
}
