import type { Metadata } from "next";
import { CorporateShell } from "@/users/corporate/corporate";
import { ProcurementAnalytics } from "@/users/corporate/components/analytics";

export const metadata: Metadata = { title: "Procurement Analytics · Arjuna Industries" };

export default function Page() {
  return (
    <CorporateShell title="Procurement Analytics">
      <ProcurementAnalytics />
    </CorporateShell>
  );
}
