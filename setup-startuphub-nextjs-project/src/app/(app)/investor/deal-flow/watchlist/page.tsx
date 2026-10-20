import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { DealFlowWatchlist } from "@/users/investor/components/deal-flow/watchlist";

export const metadata: Metadata = { title: "Watchlist · Meridian Capital" };

export default function Page() {
  return (
    <InvestorShell title="Watchlist">
      <DealFlowWatchlist />
    </InvestorShell>
  );
}
