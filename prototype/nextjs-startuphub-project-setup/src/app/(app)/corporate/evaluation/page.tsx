import type { Metadata } from "next";
import { CorporateShell } from "@/users/corporate/corporate";
import { StartupEvaluation } from "@/users/corporate/components/evaluation";

export const metadata: Metadata = { title: "Startup Evaluation · Arjuna Industries" };

export default function Page() {
  return (
    <CorporateShell title="Startup Evaluation">
      <StartupEvaluation />
    </CorporateShell>
  );
}
