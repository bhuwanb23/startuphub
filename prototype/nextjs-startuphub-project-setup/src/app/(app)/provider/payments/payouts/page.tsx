import type { Metadata } from "next";
import { ProviderShell } from "@/users/provider/provider";
import { PayoutsPage } from "@/users/provider/components/payments";

export const metadata: Metadata = { title: "Payouts · Vertex Labs & Compute" };

export default function Page() {
  return (
    <ProviderShell title="Payouts">
      <PayoutsPage />
    </ProviderShell>
  );
}
