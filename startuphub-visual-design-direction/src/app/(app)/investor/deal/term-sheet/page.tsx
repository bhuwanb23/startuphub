import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { DealTermSheet } from "@/users/investor/components/deal";

export const metadata: Metadata = { title: "Term Sheet · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Term Sheet">
      <DealTermSheet />
    </InvestorShell>
  );
}
