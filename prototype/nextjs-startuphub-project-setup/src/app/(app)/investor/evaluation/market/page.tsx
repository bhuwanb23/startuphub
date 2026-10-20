import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { MarketAnalysis } from "@/users/investor/components/evaluation";

export const metadata: Metadata = { title: "Market Analysis · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Market Analysis">
      <MarketAnalysis />
    </InvestorShell>
  );
}
