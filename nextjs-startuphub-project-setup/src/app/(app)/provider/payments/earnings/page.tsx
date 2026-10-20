import type { Metadata } from "next";
import { ProviderShell } from "@/users/provider/provider";
import { EarningsPage } from "@/users/provider/components/payments";

export const metadata: Metadata = { title: "Earnings · Vertex Labs & Compute" };

export default function Page() {
  return (
    <ProviderShell title="Earnings">
      <EarningsPage />
    </ProviderShell>
  );
}
