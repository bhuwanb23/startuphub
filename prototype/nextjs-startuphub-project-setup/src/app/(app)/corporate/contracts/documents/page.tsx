import type { Metadata } from "next";
import { CorporateShell } from "@/users/corporate/corporate";
import { ContractDocuments } from "@/users/corporate/components/contracts";

export const metadata: Metadata = { title: "Contract Documents · Arjuna Industries" };

export default function Page() {
  return (
    <CorporateShell title="Contract Documents">
      <ContractDocuments />
    </CorporateShell>
  );
}
