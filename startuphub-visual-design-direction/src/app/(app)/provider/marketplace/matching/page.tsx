import type { Metadata } from "next";
import { ProviderShell } from "@/users/provider/provider";
import { StartupMatching } from "@/users/provider/components/marketplace";

export const metadata: Metadata = { title: "Startup Matching · Vertex Labs & Compute" };

export default function Page() {
  return (
    <ProviderShell title="Startup Matching">
      <StartupMatching />
    </ProviderShell>
  );
}
