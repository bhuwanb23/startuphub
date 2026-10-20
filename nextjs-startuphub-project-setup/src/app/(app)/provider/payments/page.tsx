import type { Metadata } from "next";
import { ProviderShell } from "@/users/provider/provider";
import { PaymentOverview } from "@/users/provider/components/payments";

export const metadata: Metadata = { title: "Payment Overview · Vertex Labs & Compute" };

export default function Page() {
  return (
    <ProviderShell title="Payment Overview">
      <PaymentOverview />
    </ProviderShell>
  );
}
