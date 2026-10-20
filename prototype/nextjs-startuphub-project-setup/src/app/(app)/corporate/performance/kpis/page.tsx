import type { Metadata } from "next";
import { CorporateShell } from "@/users/corporate/corporate";
import { KpiManagement } from "@/users/corporate/components/performance";

export const metadata: Metadata = { title: "KPI Management · Arjuna Industries" };

export default function Page() {
  return (
    <CorporateShell title="KPI Management">
      <KpiManagement />
    </CorporateShell>
  );
}
