import type { Metadata } from "next";
import { CorporateShell } from "@/users/corporate/corporate";
import { ContractManagement } from "@/users/corporate/components/contracts";

export const metadata: Metadata = { title: "Contract Management · Arjuna Industries" };

export default function Page() {
  return (
    <CorporateShell title="Contract Management">
      <ContractManagement />
    </CorporateShell>
  );
}
