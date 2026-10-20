import type { Metadata } from "next";
import { CorporateShell } from "@/users/corporate/corporate";
import { RiskAssessment } from "@/users/corporate/components/evaluation";

export const metadata: Metadata = { title: "Risk Assessment · Arjuna Industries" };

export default function Page() {
  return (
    <CorporateShell title="Risk Assessment">
      <RiskAssessment />
    </CorporateShell>
  );
}
