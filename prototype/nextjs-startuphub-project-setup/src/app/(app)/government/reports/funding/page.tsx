import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { FundingReportsPage } from "@/users/government/components/reports";

export const metadata: Metadata = { title: "Funding Reports · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="Funding Reports">
      <FundingReportsPage />
    </GovernmentShell>
  );
}
