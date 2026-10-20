import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { RiskAssessment } from "@/users/investor/components/evaluation/analysis";

export const metadata: Metadata = { title: "Risk Assessment · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Risk Assessment">
      <RiskAssessment />
    </InvestorShell>
  );
}
