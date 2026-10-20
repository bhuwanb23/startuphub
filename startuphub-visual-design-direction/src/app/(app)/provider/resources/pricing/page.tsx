import type { Metadata } from "next";
import { ProviderShell } from "@/users/provider/provider";
import { ResourcePricing } from "@/users/provider/components/resources/plan";

export const metadata: Metadata = { title: "Resource Pricing · Vertex Labs & Compute" };

export default function Page() {
  return (
    <ProviderShell title="Resource Pricing">
      <ResourcePricing />
    </ProviderShell>
  );
}
