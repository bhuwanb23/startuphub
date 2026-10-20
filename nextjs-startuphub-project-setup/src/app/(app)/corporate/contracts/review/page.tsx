import type { Metadata } from "next";
import { CorporateShell } from "@/users/corporate/corporate";
import { ContractReview } from "@/users/corporate/components/contracts";

export const metadata: Metadata = { title: "Contract Review · Arjuna Industries" };

export default function Page() {
  return (
    <CorporateShell title="Contract Review">
      <ContractReview />
    </CorporateShell>
  );
}
