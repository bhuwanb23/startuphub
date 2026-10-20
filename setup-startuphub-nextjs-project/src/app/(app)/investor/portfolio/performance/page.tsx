import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { PortfolioPerformance } from "@/users/investor/components/portfolio/performance";

export const metadata: Metadata = { title: "Performance · Meridian Capital" };

export default function Page() {
  return (
    <InvestorShell title="Performance">
      <PortfolioPerformance />
    </InvestorShell>
  );
}
