import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { EvaluationStage } from "@/users/investor/components/pipeline";

export const metadata: Metadata = { title: "Evaluation · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Evaluation">
      <EvaluationStage />
    </InvestorShell>
  );
}
