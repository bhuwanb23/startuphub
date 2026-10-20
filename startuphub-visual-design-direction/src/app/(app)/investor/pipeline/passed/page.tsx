import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { PassedStage } from "@/users/investor/components/pipeline/stages";

export const metadata: Metadata = { title: "Passed Deals · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Passed Deals">
      <PassedStage />
    </InvestorShell>
  );
}
