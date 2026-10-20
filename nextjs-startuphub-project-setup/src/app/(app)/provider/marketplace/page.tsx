import type { Metadata } from "next";
import { ProviderShell } from "@/users/provider/provider";
import { MarketplaceDiscovery } from "@/users/provider/components/marketplace";

export const metadata: Metadata = { title: "Resource Discovery · Vertex Labs & Compute" };

export default function Page() {
  return (
    <ProviderShell title="Resource Discovery">
      <MarketplaceDiscovery />
    </ProviderShell>
  );
}
