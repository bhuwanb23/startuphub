import type { Metadata } from "next";
import { CorporateShell } from "@/users/corporate/corporate";
import { PocManagement } from "@/users/corporate/components/pilots";

export const metadata: Metadata = { title: "PoC Management · Arjuna Industries" };

export default function Page() {
  return (
    <CorporateShell title="PoC Management">
      <PocManagement />
    </CorporateShell>
  );
}
