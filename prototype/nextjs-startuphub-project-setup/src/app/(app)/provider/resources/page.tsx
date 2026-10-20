import type { Metadata } from "next";
import { ProviderShell } from "@/users/provider/provider";
import { ResourceListings } from "@/users/provider/components/resources";

export const metadata: Metadata = { title: "Resource Listings · Vertex Labs & Compute" };

export default function Page() {
  return (
    <ProviderShell title="Resource Listings">
      <ResourceListings />
    </ProviderShell>
  );
}
