import type { Metadata } from "next";
import { ProviderShell } from "@/users/provider/provider";
import { ResourceAnalytics } from "@/users/provider/components/analytics";

export const metadata: Metadata = { title: "Resource Analytics · Vertex Labs & Compute" };

export default function Page() {
  return (
    <ProviderShell title="Resource Analytics">
      <ResourceAnalytics />
    </ProviderShell>
  );
}
