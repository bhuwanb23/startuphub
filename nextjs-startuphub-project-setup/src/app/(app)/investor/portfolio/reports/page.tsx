import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { PortfolioReports } from "@/users/investor/components/portfolio";

export const metadata: Metadata = { title: "Portfolio Reports · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Portfolio Reports">
      <PortfolioReports />
    </InvestorShell>
  );
}
