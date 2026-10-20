import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { PortfolioRisks } from "@/users/investor/components/portfolio";

export const metadata: Metadata = { title: "Portfolio Risks · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Portfolio Risks">
      <PortfolioRisks />
    </InvestorShell>
  );
}
