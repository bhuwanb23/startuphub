import type { Metadata } from "next";
import { CorporateShell } from "@/users/corporate/corporate";
import { VendorDiscovery } from "@/users/corporate/components/procurement";

export const metadata: Metadata = { title: "Vendor Discovery · Arjuna Industries" };

export default function Page() {
  return (
    <CorporateShell title="Vendor Discovery">
      <VendorDiscovery />
    </CorporateShell>
  );
}
