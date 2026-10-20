import type { Metadata } from "next";
import { ProviderShell } from "@/users/provider/provider";
import { ProviderDashboard } from "@/users/provider/components/dashboard/overview";

export const metadata: Metadata = { title: "Operations Dashboard · Vertex Labs & Compute" };

export default function Page() {
  return (
    <ProviderShell title="Operations Dashboard">
      <ProviderDashboard />
    </ProviderShell>
  );
}
