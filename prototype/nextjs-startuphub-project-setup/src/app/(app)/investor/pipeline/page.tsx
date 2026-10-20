import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { PipelineOverview } from "@/users/investor/components/pipeline";

export const metadata: Metadata = { title: "Deal Pipeline · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Deal Pipeline">
      <PipelineOverview />
    </InvestorShell>
  );
}
