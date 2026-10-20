import type { Metadata } from "next";
import { TalentShell } from "@/users/talent/talent";
import { TalentSettings } from "@/users/talent/components/settings/settings";

export const metadata: Metadata = { title: "Settings · Zoya Khan" };

export default function Page() {
  return (
    <TalentShell title="Settings">
      <TalentSettings />
    </TalentShell>
  );
}
