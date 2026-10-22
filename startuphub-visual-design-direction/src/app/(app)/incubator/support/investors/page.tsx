import type { Metadata } from "next";
import { IncubatorShell } from "@/users/incubator/incubator";
import { InvestorConnections } from "@/users/incubator/components/support/investors";

export const metadata: Metadata = {
  title: "Investor Connections · StartupHub Labs",
};

export default function Page() {
  return (
    <IncubatorShell title="Investor Connections">
      <InvestorConnections />
    </IncubatorShell>
  );
}
