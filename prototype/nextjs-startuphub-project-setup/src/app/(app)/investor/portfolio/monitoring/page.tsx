import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { PortfolioMonitoring } from "@/users/investor/components/portfolio";

export const metadata: Metadata = { title: "Portfolio Monitoring · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Portfolio Monitoring">
      <PortfolioMonitoring />
    </InvestorShell>
  );
}
