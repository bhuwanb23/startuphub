import type { Metadata } from "next";
import { ProviderShell } from "@/users/provider/provider";
import { ResourcePackages } from "@/users/provider/components/resources/plan";

export const metadata: Metadata = { title: "Resource Packages · Vertex Labs & Compute" };

export default function Page() {
  return (
    <ProviderShell title="Resource Packages">
      <ResourcePackages />
    </ProviderShell>
  );
}
