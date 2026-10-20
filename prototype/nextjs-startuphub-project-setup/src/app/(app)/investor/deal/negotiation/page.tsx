import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { DealNegotiation } from "@/users/investor/components/deal/execution";

export const metadata: Metadata = { title: "Negotiation · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Negotiation">
      <DealNegotiation />
    </InvestorShell>
  );
}
