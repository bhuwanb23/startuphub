import type { Metadata } from "next";
import { TalentShell } from "@/users/talent/talent";
import { TalentAnalytics } from "@/users/talent/components/analytics/analytics";

export const metadata: Metadata = { title: "Analytics · Zoya Khan" };

export default function Page() {
  return (
    <TalentShell title="Analytics">
      <TalentAnalytics />
    </TalentShell>
  );
}
