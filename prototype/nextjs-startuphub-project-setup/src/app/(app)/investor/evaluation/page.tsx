import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { StartupEvaluation } from "@/users/investor/components/evaluation";

export const metadata: Metadata = { title: "Startup Evaluation · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Startup Evaluation">
      <StartupEvaluation />
    </InvestorShell>
  );
}
