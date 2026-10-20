import type { Metadata } from "next";
import { ProviderShell } from "@/users/provider/provider";
import { ServiceManagement } from "@/users/provider/components/usage";

export const metadata: Metadata = { title: "Service Management · Vertex Labs & Compute" };

export default function Page() {
  return (
    <ProviderShell title="Service Management">
      <ServiceManagement />
    </ProviderShell>
  );
}
