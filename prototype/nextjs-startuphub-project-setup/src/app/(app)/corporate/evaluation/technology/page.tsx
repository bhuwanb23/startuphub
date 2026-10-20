import type { Metadata } from "next";
import { CorporateShell } from "@/users/corporate/corporate";
import { TechnologyAssessment } from "@/users/corporate/components/evaluation";

export const metadata: Metadata = { title: "Technology Assessment · Arjuna Industries" };

export default function Page() {
  return (
    <CorporateShell title="Technology Assessment">
      <TechnologyAssessment />
    </CorporateShell>
  );
}
