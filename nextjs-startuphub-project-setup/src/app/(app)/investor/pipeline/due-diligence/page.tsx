import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { DdStage } from "@/users/investor/components/pipeline/stages";

export const metadata: Metadata = { title: "Due Diligence · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Due Diligence">
      <DdStage />
    </InvestorShell>
  );
}
