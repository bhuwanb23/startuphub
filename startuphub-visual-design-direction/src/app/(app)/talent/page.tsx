import type { Metadata } from "next";
import { TalentShell } from "@/users/talent/talent";
import { TalentDashboard } from "@/users/talent/components/dashboard/dashboard";

export const metadata: Metadata = { title: "Dashboard · Zoya Khan" };

export default function Page() {
  return (
    <TalentShell title="Dashboard">
      <TalentDashboard />
    </TalentShell>
  );
}
