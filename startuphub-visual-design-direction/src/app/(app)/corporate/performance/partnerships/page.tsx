import type { Metadata } from "next";
import { CorporateShell } from "@/users/corporate/corporate";
import { PartnershipPerformance } from "@/users/corporate/components/performance";

export const metadata: Metadata = { title: "Partnership Performance · Arjuna Industries" };

export default function Page() {
  return (
    <CorporateShell title="Partnership Performance">
      <PartnershipPerformance />
    </CorporateShell>
  );
}
