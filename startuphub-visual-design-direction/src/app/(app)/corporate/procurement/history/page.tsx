import type { Metadata } from "next";
import { CorporateShell } from "@/users/corporate/corporate";
import { ProcurementHistory } from "@/users/corporate/components/procurement";

export const metadata: Metadata = { title: "Procurement History · Arjuna Industries" };

export default function Page() {
  return (
    <CorporateShell title="Procurement History">
      <ProcurementHistory />
    </CorporateShell>
  );
}
