import type { Metadata } from "next";
import { CorporateShell } from "@/users/corporate/corporate";
import { PartnershipPipeline } from "@/users/corporate/components/partnerships";

export const metadata: Metadata = { title: "Partnership Pipeline · Arjuna Industries" };

export default function Page() {
  return (
    <CorporateShell title="Partnership Pipeline">
      <PartnershipPipeline />
    </CorporateShell>
  );
}
