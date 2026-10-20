import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { FundingOverview } from "@/users/government/components/funding";

export const metadata: Metadata = { title: "Funding Overview · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="Funding Overview">
      <FundingOverview />
    </GovernmentShell>
  );
}
