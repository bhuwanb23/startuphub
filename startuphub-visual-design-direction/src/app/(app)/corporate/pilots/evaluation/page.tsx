import type { Metadata } from "next";
import { CorporateShell } from "@/users/corporate/corporate";
import { PilotEvaluation } from "@/users/corporate/components/pilots";

export const metadata: Metadata = { title: "Pilot Evaluation · Arjuna Industries" };

export default function Page() {
  return (
    <CorporateShell title="Pilot Evaluation">
      <PilotEvaluation />
    </CorporateShell>
  );
}
