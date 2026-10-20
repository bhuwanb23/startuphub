import type { Metadata } from "next";
import { ProviderShell } from "@/users/provider/provider";
import { ResourcePerformance } from "@/users/provider/components/usage";

export const metadata: Metadata = { title: "Resource Performance · Vertex Labs & Compute" };

export default function Page() {
  return (
    <ProviderShell title="Resource Performance">
      <ResourcePerformance />
    </ProviderShell>
  );
}
