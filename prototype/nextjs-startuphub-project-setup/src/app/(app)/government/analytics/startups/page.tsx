import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { StartupAnalytics } from "@/users/government/components/analytics";

export const metadata: Metadata = { title: "Startup Analytics · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="Startup Analytics">
      <StartupAnalytics />
    </GovernmentShell>
  );
}
