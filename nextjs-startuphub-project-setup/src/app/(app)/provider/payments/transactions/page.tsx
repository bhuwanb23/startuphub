import type { Metadata } from "next";
import { ProviderShell } from "@/users/provider/provider";
import { TransactionsPage } from "@/users/provider/components/payments";

export const metadata: Metadata = { title: "Transactions · Vertex Labs & Compute" };

export default function Page() {
  return (
    <ProviderShell title="Transactions">
      <TransactionsPage />
    </ProviderShell>
  );
}
