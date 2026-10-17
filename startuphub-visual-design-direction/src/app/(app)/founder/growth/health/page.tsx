import type { Metadata } from "next";
import { FounderShell } from "@/users/startup/startup";
import { StartupHealth } from "@/users/startup/components/growth/health";

export const metadata: Metadata = { title: "Startup Health · Lumen AI" };

export default function Page() {
  return (
    <FounderShell title="Startup Health">
      <StartupHealth />
    </FounderShell>
  );
}
