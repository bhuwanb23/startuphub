import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { TechnologyAssessment } from "@/users/investor/components/evaluation/analysis";

export const metadata: Metadata = { title: "Technology Assessment · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Technology Assessment">
      <TechnologyAssessment />
    </InvestorShell>
  );
}
