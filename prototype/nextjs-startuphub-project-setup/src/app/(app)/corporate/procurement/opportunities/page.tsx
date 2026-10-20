import type { Metadata } from "next";
import { CorporateShell } from "@/users/corporate/corporate";
import { ProcurementOpportunities } from "@/users/corporate/components/procurement";

export const metadata: Metadata = { title: "Opportunities · Arjuna Industries" };

export default function Page() {
  return (
    <CorporateShell title="Opportunities">
      <ProcurementOpportunities />
    </CorporateShell>
  );
}
