import type { Metadata } from "next";
import { CorporateShell } from "@/users/corporate/corporate";
import { PartnerPerformance } from "@/users/corporate/components/partnerships";

export const metadata: Metadata = { title: "Partner Performance · Arjuna Industries" };

export default function Page() {
  return (
    <CorporateShell title="Partner Performance">
      <PartnerPerformance />
    </CorporateShell>
  );
}
