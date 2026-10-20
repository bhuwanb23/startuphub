import type { Metadata } from "next";
import { ProviderShell } from "@/users/provider/provider";
import { ProviderActivity } from "@/users/provider/components/ops/workspace";

export const metadata: Metadata = { title: "Activity · Vertex Labs & Compute" };

export default function Page() {
  return (
    <ProviderShell title="Activity">
      <ProviderActivity />
    </ProviderShell>
  );
}
