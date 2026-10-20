import type { Metadata } from "next";
import { CorporateShell } from "@/users/corporate/corporate";
import { ResultsOutcomes } from "@/users/corporate/components/pilots";

export const metadata: Metadata = { title: "Results & Outcomes · Arjuna Industries" };

export default function Page() {
  return (
    <CorporateShell title="Results & Outcomes">
      <ResultsOutcomes />
    </CorporateShell>
  );
}
