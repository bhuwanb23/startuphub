import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { PerformanceAnalytics } from "@/users/investor/components/analytics";

export const metadata: Metadata = { title: "Performance Analytics · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Performance Analytics">
      <PerformanceAnalytics />
    </InvestorShell>
  );
}
