import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { DealAgreements } from "@/users/investor/components/deal/execution";

export const metadata: Metadata = { title: "Agreements · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Agreements">
      <DealAgreements />
    </InvestorShell>
  );
}
