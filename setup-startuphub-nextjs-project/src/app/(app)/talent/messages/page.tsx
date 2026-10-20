import type { Metadata } from "next";
import { TalentShell } from "@/users/talent/talent";
import { TalentMessages } from "@/users/talent/components/workspace/messages";

export const metadata: Metadata = { title: "Messages · Zoya Khan" };

export default function Page() {
  return (
    <TalentShell title="Messages">
      <TalentMessages />
    </TalentShell>
  );
}
