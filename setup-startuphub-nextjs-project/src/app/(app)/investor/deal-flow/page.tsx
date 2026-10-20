import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { DealFlowPipeline } from "@/users/investor/components/deal-flow/pipeline";

export const metadata: Metadata = { title: "Deal Flow · Meridian Capital" };

export default function Page() {
  return (
    <InvestorShell title="Deal Flow">
      <DealFlowPipeline />
    </InvestorShell>
  );
}
