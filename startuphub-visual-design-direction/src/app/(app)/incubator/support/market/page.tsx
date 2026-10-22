import type { Metadata } from "next";
import { IncubatorShell } from "@/users/incubator/incubator";
import { MarketSupport } from "@/users/incubator/components/support/market";

export const metadata: Metadata = {
  title: "Market Support · StartupHub Labs",
};

export default function Page() {
  return (
    <IncubatorShell title="Market Support">
      <MarketSupport />
    </IncubatorShell>
  );
}
