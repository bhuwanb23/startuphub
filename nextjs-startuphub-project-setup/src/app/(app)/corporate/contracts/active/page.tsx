import type { Metadata } from "next";
import { CorporateShell } from "@/users/corporate/corporate";
import { ActiveContracts } from "@/users/corporate/components/contracts";

export const metadata: Metadata = { title: "Active Contracts · Arjuna Industries" };

export default function Page() {
  return (
    <CorporateShell title="Active Contracts">
      <ActiveContracts />
    </CorporateShell>
  );
}
