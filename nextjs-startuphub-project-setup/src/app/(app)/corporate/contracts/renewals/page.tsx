import type { Metadata } from "next";
import { CorporateShell } from "@/users/corporate/corporate";
import { Renewals } from "@/users/corporate/components/contracts";

export const metadata: Metadata = { title: "Renewals · Arjuna Industries" };

export default function Page() {
  return (
    <CorporateShell title="Renewals">
      <Renewals />
    </CorporateShell>
  );
}
