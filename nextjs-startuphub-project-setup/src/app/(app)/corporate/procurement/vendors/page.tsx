import type { Metadata } from "next";
import { CorporateShell } from "@/users/corporate/corporate";
import { VendorManagement } from "@/users/corporate/components/procurement";

export const metadata: Metadata = { title: "Vendor Management · Arjuna Industries" };

export default function Page() {
  return (
    <CorporateShell title="Vendor Management">
      <VendorManagement />
    </CorporateShell>
  );
}
