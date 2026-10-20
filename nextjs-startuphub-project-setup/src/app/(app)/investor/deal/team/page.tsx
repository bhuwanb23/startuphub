import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { DealTeam } from "@/users/investor/components/deal";

export const metadata: Metadata = { title: "Deal Team · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Deal Team">
      <DealTeam />
    </InvestorShell>
  );
}
