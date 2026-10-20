import type { Metadata } from "next";
import { CorporateShell } from "@/users/corporate/corporate";
import { PartnershipManagement } from "@/users/corporate/components/partnerships";

export const metadata: Metadata = { title: "Partnership Management · Arjuna Industries" };

export default function Page() {
  return (
    <CorporateShell title="Partnership Management">
      <PartnershipManagement />
    </CorporateShell>
  );
}
