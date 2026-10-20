import type { Metadata } from "next";
import { CorporateShell } from "@/users/corporate/corporate";
import { BusinessUnits } from "@/users/corporate/components/organization";

export const metadata: Metadata = { title: "Business Units · Arjuna Industries" };

export default function Page() {
  return (
    <CorporateShell title="Business Units">
      <BusinessUnits />
    </CorporateShell>
  );
}
