import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { DealDocuments } from "@/users/investor/components/deal/execution";

export const metadata: Metadata = { title: "Deal Documents · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Deal Documents">
      <DealDocuments />
    </InvestorShell>
  );
}
