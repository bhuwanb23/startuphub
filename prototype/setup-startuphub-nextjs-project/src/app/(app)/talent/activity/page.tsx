import type { Metadata } from "next";
import { TalentShell } from "@/users/talent/talent";
import { TalentActivity } from "@/users/talent/components/workspace/activity";

export const metadata: Metadata = { title: "Activity · Zoya Khan" };

export default function Page() {
  return (
    <TalentShell title="Activity">
      <TalentActivity />
    </TalentShell>
  );
}
