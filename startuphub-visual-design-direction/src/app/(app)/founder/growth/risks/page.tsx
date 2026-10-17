import type { Metadata } from "next";
import { FounderShell } from "@/users/startup/startup";
import { RiskManagement } from "@/users/startup/components/growth/risks";

export const metadata: Metadata = { title: "Risk Management · Lumen AI" };

export default function Page() {
  return (
    <FounderShell title="Risk Management">
      <RiskManagement />
    </FounderShell>
  );
}
