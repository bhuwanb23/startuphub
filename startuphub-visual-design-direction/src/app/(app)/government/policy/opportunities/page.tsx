import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { OpportunityAnalysis } from "@/users/government/components/policy";

export const metadata: Metadata = { title: "Opportunity Analysis · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="Opportunity Analysis">
      <OpportunityAnalysis />
    </GovernmentShell>
  );
}
