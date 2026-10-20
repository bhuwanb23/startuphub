import type { Metadata } from "next";
import { CorporateShell } from "@/users/corporate/corporate";
import { PartnershipHistory } from "@/users/corporate/components/partnerships";

export const metadata: Metadata = { title: "Partnership History · Arjuna Industries" };

export default function Page() {
  return (
    <CorporateShell title="Partnership History">
      <PartnershipHistory />
    </CorporateShell>
  );
}
