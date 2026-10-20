import type { Metadata } from "next";
import { ProviderShell } from "@/users/provider/provider";
import { MyResources } from "@/users/provider/components/resources";

export const metadata: Metadata = { title: "My Resources · Vertex Labs & Compute" };

export default function Page() {
  return (
    <ProviderShell title="My Resources">
      <MyResources />
    </ProviderShell>
  );
}
