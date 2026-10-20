import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { PortfolioEvents } from "@/users/investor/components/portfolio";

export const metadata: Metadata = { title: "Portfolio Events · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Portfolio Events">
      <PortfolioEvents />
    </InvestorShell>
  );
}
