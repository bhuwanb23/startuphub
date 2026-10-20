import type { Metadata } from "next";
import { ProviderShell } from "@/users/provider/provider";
import { ResourceUtilization } from "@/users/provider/components/usage";

export const metadata: Metadata = { title: "Resource Utilization · Vertex Labs & Compute" };

export default function Page() {
  return (
    <ProviderShell title="Resource Utilization">
      <ResourceUtilization />
    </ProviderShell>
  );
}
