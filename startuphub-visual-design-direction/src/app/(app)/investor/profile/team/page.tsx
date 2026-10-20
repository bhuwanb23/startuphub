import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { InvestmentTeam } from "@/users/investor/components/profile";

export const metadata: Metadata = { title: "Investment Team · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Investment Team">
      <InvestmentTeam />
    </InvestorShell>
  );
}
