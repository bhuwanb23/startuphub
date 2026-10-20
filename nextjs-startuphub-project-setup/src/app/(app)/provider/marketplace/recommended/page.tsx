import type { Metadata } from "next";
import { ProviderShell } from "@/users/provider/provider";
import { RecommendedStartups } from "@/users/provider/components/marketplace";

export const metadata: Metadata = { title: "Recommended Startups · Vertex Labs & Compute" };

export default function Page() {
  return (
    <ProviderShell title="Recommended Startups">
      <RecommendedStartups />
    </ProviderShell>
  );
}
