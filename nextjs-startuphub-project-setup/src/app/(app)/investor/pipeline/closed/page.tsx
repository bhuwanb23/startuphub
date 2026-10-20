import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { ClosedStage } from "@/users/investor/components/pipeline/stages";

export const metadata: Metadata = { title: "Closed Deals · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Closed Deals">
      <ClosedStage />
    </InvestorShell>
  );
}
