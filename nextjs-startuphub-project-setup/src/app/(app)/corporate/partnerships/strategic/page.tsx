import type { Metadata } from "next";
import { CorporateShell } from "@/users/corporate/corporate";
import { StrategicPartnerships } from "@/users/corporate/components/partnerships";

export const metadata: Metadata = { title: "Strategic Partnerships · Arjuna Industries" };

export default function Page() {
  return (
    <CorporateShell title="Strategic Partnerships">
      <StrategicPartnerships />
    </CorporateShell>
  );
}
