import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { MarketAnalytics } from "@/users/investor/components/analytics";

export const metadata: Metadata = { title: "Market Analytics · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Market Analytics">
      <MarketAnalytics />
    </InvestorShell>
  );
}
