import type { Metadata } from "next";
import { CorporateShell } from "@/users/corporate/corporate";
import { EvaluationHistory } from "@/users/corporate/components/evaluation";

export const metadata: Metadata = { title: "Evaluation History · Arjuna Industries" };

export default function Page() {
  return (
    <CorporateShell title="Evaluation History">
      <EvaluationHistory />
    </CorporateShell>
  );
}
