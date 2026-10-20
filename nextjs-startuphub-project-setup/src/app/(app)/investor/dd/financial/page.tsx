import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { FinancialReview } from "@/users/investor/components/dd/reviews";

export const metadata: Metadata = { title: "Financial Review · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Financial Review">
      <FinancialReview />
    </InvestorShell>
  );
}
