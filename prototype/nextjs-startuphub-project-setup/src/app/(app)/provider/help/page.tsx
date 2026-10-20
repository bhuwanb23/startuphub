import type { Metadata } from "next";
import { ProviderShell } from "@/users/provider/provider";
import { ProviderHelp } from "@/users/provider/components/ops/preferences";

export const metadata: Metadata = { title: "Help & Support · Vertex Labs & Compute" };

export default function Page() {
  return (
    <ProviderShell title="Help & Support">
      <ProviderHelp />
    </ProviderShell>
  );
}
