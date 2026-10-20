import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { PortfolioOverview } from "@/users/investor/components/portfolio";

export const metadata: Metadata = { title: "Portfolio Overview · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Portfolio Overview">
      <PortfolioOverview />
    </InvestorShell>
  );
}
