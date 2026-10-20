import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { StartupProfiles } from "@/users/government/components/registry";

export const metadata: Metadata = { title: "Startup Profiles · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="Startup Profiles">
      <StartupProfiles />
    </GovernmentShell>
  );
}
