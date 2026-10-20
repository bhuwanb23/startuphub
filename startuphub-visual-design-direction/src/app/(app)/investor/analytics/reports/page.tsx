import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { AnalyticsReports } from "@/users/investor/components/analytics";

export const metadata: Metadata = { title: "Reports · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Reports">
      <AnalyticsReports />
    </InvestorShell>
  );
}
