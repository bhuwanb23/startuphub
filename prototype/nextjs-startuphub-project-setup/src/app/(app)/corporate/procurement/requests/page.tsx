import type { Metadata } from "next";
import { CorporateShell } from "@/users/corporate/corporate";
import { PurchaseRequests } from "@/users/corporate/components/procurement";

export const metadata: Metadata = { title: "Purchase Requests · Arjuna Industries" };

export default function Page() {
  return (
    <CorporateShell title="Purchase Requests">
      <PurchaseRequests />
    </CorporateShell>
  );
}
