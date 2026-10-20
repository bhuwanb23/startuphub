import type { Metadata } from "next";
import { CorporateShell } from "@/users/corporate/corporate";
import { ContractRequests } from "@/users/corporate/components/contracts";

export const metadata: Metadata = { title: "Contract Requests · Arjuna Industries" };

export default function Page() {
  return (
    <CorporateShell title="Contract Requests">
      <ContractRequests />
    </CorporateShell>
  );
}
