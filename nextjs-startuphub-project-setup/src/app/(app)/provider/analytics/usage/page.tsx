import type { Metadata } from "next";
import { ProviderShell } from "@/users/provider/provider";
import { UsageAnalytics } from "@/users/provider/components/analytics";

export const metadata: Metadata = { title: "Usage Analytics · Vertex Labs & Compute" };

export default function Page() {
  return (
    <ProviderShell title="Usage Analytics">
      <UsageAnalytics />
    </ProviderShell>
  );
}
