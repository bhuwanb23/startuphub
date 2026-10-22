import type { Metadata } from "next";
import { FounderShell } from "@/users/startup/startup";
import { ComplianceTracking } from "@/users/startup/components/ipr/compliance";

export const metadata: Metadata = { title: "Compliance Tracking · Lumen AI" };

export default function Page() {
  return (
    <FounderShell title="Compliance Tracking">
      <ComplianceTracking />
    </FounderShell>
  );
}
