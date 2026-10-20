import type { Metadata } from "next";
import { ProviderShell } from "@/users/provider/provider";
import { UsageTracking } from "@/users/provider/components/usage";

export const metadata: Metadata = { title: "Usage Tracking · Vertex Labs & Compute" };

export default function Page() {
  return (
    <ProviderShell title="Usage Tracking">
      <UsageTracking />
    </ProviderShell>
  );
}
