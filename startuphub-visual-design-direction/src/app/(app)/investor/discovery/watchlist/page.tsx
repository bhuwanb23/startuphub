import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { WatchlistPage } from "@/users/investor/components/discovery";

export const metadata: Metadata = { title: "Watchlist · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Watchlist">
      <WatchlistPage />
    </InvestorShell>
  );
}
