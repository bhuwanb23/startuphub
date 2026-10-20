import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { PortfolioCompanies } from "@/users/investor/components/portfolio";

export const metadata: Metadata = { title: "Portfolio Companies · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Portfolio Companies">
      <PortfolioCompanies />
    </InvestorShell>
  );
}
