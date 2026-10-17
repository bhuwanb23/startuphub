import type { Metadata } from "next";
import { FounderShell } from "@/users/startup/startup";
import { Dashboard } from "@/users/startup/components/dashboard/dashboard";

export const metadata: Metadata = {
  title: "Dashboard · Lumen AI — StartupHub",
};

export default function Page() {
  return (
    <FounderShell title="Dashboard">
      <Dashboard />
    </FounderShell>
  );
}
