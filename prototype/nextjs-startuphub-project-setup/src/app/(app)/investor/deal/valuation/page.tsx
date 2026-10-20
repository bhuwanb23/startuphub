import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { DealValuation } from "@/users/investor/components/deal";

export const metadata: Metadata = { title: "Valuation · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Valuation">
      <DealValuation />
    </InvestorShell>
  );
}
