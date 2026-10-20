import type { Metadata } from "next";
import { CorporateShell } from "@/users/corporate/corporate";
import { PartnershipAnalytics } from "@/users/corporate/components/analytics";

export const metadata: Metadata = { title: "Partnership Analytics · Arjuna Industries" };

export default function Page() {
  return (
    <CorporateShell title="Partnership Analytics">
      <PartnershipAnalytics />
    </CorporateShell>
  );
}
