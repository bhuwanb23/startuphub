import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { DealClosing } from "@/users/investor/components/deal/execution";

export const metadata: Metadata = { title: "Closing · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Closing">
      <DealClosing />
    </InvestorShell>
  );
}
