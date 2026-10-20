import type { Metadata } from "next";
import { CorporateShell } from "@/users/corporate/corporate";
import { CorporateDashboard } from "@/users/corporate/components/dashboard/overview";

export const metadata: Metadata = { title: "Innovation Command Center · Arjuna Industries" };

export default function Page() {
  return (
    <CorporateShell title="Innovation Command Center">
      <CorporateDashboard />
    </CorporateShell>
  );
}
