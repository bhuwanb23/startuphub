import type { Metadata } from "next";
import { ProviderShell } from "@/users/provider/provider";
import { MarketplaceOpportunities } from "@/users/provider/components/marketplace";

export const metadata: Metadata = { title: "Opportunities · Vertex Labs & Compute" };

export default function Page() {
  return (
    <ProviderShell title="Opportunities">
      <MarketplaceOpportunities />
    </ProviderShell>
  );
}
