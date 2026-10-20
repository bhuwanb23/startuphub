import type { Metadata } from "next";
import { CorporateShell } from "@/users/corporate/corporate";
import { SolutionEvaluation } from "@/users/corporate/components/evaluation";

export const metadata: Metadata = { title: "Solution Evaluation · Arjuna Industries" };

export default function Page() {
  return (
    <CorporateShell title="Solution Evaluation">
      <SolutionEvaluation />
    </CorporateShell>
  );
}
