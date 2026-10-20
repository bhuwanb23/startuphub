import type { Metadata } from "next";
import { ProviderShell } from "@/users/provider/provider";
import { InvoicesPage } from "@/users/provider/components/payments";

export const metadata: Metadata = { title: "Invoices · Vertex Labs & Compute" };

export default function Page() {
  return (
    <ProviderShell title="Invoices">
      <InvoicesPage />
    </ProviderShell>
  );
}
