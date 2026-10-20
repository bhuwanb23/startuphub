import type { Metadata } from "next";
import { TalentShell } from "@/users/talent/talent";
import { TalentHelp } from "@/users/talent/components/help/help";

export const metadata: Metadata = { title: "Help · Zoya Khan" };

export default function Page() {
  return (
    <TalentShell title="Help & Support">
      <TalentHelp />
    </TalentShell>
  );
}
