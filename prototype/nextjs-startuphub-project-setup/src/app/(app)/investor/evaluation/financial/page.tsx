import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { FinancialAnalysis } from "@/users/investor/components/evaluation/analysis";

export const metadata: Metadata = { title: "Financial Analysis · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Financial Analysis">
      <FinancialAnalysis />
    </InvestorShell>
  );
}
