import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { DealFlowMatching } from "@/users/investor/components/deal-flow/matching";

export const metadata: Metadata = { title: "Matching · Meridian Capital" };

export default function Page() {
  return (
    <InvestorShell title="Matching">
      <DealFlowMatching />
    </InvestorShell>
  );
}
