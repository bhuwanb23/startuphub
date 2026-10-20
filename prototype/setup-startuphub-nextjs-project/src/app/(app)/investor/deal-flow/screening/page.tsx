import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { DealFlowScreening } from "@/users/investor/components/deal-flow/screening";

export const metadata: Metadata = { title: "Screening · Meridian Capital" };

export default function Page() {
  return (
    <InvestorShell title="Screening">
      <DealFlowScreening />
    </InvestorShell>
  );
}
