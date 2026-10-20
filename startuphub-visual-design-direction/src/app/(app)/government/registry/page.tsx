import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { StartupRegistry } from "@/users/government/components/registry";

export const metadata: Metadata = { title: "Startup Registry · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="Startup Registry">
      <StartupRegistry />
    </GovernmentShell>
  );
}
