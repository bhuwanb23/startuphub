import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { ImpactDashboard } from "@/users/government/components/impact";

export const metadata: Metadata = { title: "Impact Assessment · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="Impact Assessment">
      <ImpactDashboard />
    </GovernmentShell>
  );
}
