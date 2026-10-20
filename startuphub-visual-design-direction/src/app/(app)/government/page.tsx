import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { GovDashboard } from "@/users/government/components/dashboard/overview";

export const metadata: Metadata = { title: "Ecosystem Command Center · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="Ecosystem Command Center">
      <GovDashboard />
    </GovernmentShell>
  );
}
