import type { Metadata } from "next";
import { ProviderShell } from "@/users/provider/provider";
import { ProviderNotifications } from "@/users/provider/components/ops/workspace";

export const metadata: Metadata = { title: "Notifications · Vertex Labs & Compute" };

export default function Page() {
  return (
    <ProviderShell title="Notifications">
      <ProviderNotifications />
    </ProviderShell>
  );
}
