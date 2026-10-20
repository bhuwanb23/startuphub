import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { RegistryDiscovery } from "@/users/government/components/registry";

export const metadata: Metadata = { title: "Startup Discovery · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="Startup Discovery">
      <RegistryDiscovery />
    </GovernmentShell>
  );
}
