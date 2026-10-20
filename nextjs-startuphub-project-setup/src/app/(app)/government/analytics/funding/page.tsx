import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { FundingAnalytics } from "@/users/government/components/analytics/deep";

export const metadata: Metadata = { title: "Funding Analytics · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="Funding Analytics">
      <FundingAnalytics />
    </GovernmentShell>
  );
}
