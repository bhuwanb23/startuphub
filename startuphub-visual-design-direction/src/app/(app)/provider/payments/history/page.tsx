import type { Metadata } from "next";
import { ProviderShell } from "@/users/provider/provider";
import { PaymentHistory } from "@/users/provider/components/payments";

export const metadata: Metadata = { title: "Payment History · Vertex Labs & Compute" };

export default function Page() {
  return (
    <ProviderShell title="Payment History">
      <PaymentHistory />
    </ProviderShell>
  );
}
