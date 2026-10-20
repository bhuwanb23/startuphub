import type { Metadata } from "next";
import { ProviderShell } from "@/users/provider/provider";
import { ProviderSettings } from "@/users/provider/components/ops/preferences";

export const metadata: Metadata = { title: "Settings · Vertex Labs & Compute" };

export default function Page() {
  return (
    <ProviderShell title="Settings">
      <ProviderSettings />
    </ProviderShell>
  );
}
