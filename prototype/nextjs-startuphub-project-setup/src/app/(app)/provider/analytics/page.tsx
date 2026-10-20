import type { Metadata } from "next";
import { ProviderShell } from "@/users/provider/provider";
import { ProviderAnalytics } from "@/users/provider/components/analytics";

export const metadata: Metadata = { title: "Provider Analytics · Vertex Labs & Compute" };

export default function Page() {
  return (
    <ProviderShell title="Provider Analytics">
      <ProviderAnalytics />
    </ProviderShell>
  );
}
