import type { Metadata } from "next";
import { ProviderShell } from "@/users/provider/provider";
import { ResourceCategories } from "@/users/provider/components/resources";

export const metadata: Metadata = { title: "Resource Categories · Vertex Labs & Compute" };

export default function Page() {
  return (
    <ProviderShell title="Resource Categories">
      <ResourceCategories />
    </ProviderShell>
  );
}
