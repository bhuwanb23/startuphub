import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { FundingPerformance } from "@/users/government/components/performance";

export const metadata: Metadata = { title: "Funding Performance · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="Funding Performance">
      <FundingPerformance />
    </GovernmentShell>
  );
}
