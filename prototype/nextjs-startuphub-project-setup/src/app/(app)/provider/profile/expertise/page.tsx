import type { Metadata } from "next";
import { ProviderShell } from "@/users/provider/provider";
import { ExpertiseCapabilities } from "@/users/provider/components/profile";

export const metadata: Metadata = { title: "Expertise & Capabilities · Vertex Labs & Compute" };

export default function Page() {
  return (
    <ProviderShell title="Expertise & Capabilities">
      <ExpertiseCapabilities />
    </ProviderShell>
  );
}
