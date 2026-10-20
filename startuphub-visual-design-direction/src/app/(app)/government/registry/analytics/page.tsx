import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { RegistryAnalytics } from "@/users/government/components/registry";

export const metadata: Metadata = { title: "Registry Analytics · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="Registry Analytics">
      <RegistryAnalytics />
    </GovernmentShell>
  );
}
