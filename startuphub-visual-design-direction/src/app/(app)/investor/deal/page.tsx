import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { DealOverview } from "@/users/investor/components/deal";

export const metadata: Metadata = { title: "Deal Overview · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Deal Overview">
      <DealOverview />
    </InvestorShell>
  );
}
