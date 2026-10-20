import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { PortfolioCompanies } from "@/users/investor/components/portfolio/companies";

export const metadata: Metadata = { title: "Portfolio · Meridian Capital" };

export default function Page() {
  return (
    <InvestorShell title="Portfolio">
      <PortfolioCompanies />
    </InvestorShell>
  );
}
