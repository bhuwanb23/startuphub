import type { Metadata } from "next";
import { CorporateShell } from "@/users/corporate/corporate";
import { StartupWatchlist } from "@/users/corporate/components/discovery";

export const metadata: Metadata = { title: "Startup Watchlist · Arjuna Industries" };

export default function Page() {
  return (
    <CorporateShell title="Startup Watchlist">
      <StartupWatchlist />
    </CorporateShell>
  );
}
