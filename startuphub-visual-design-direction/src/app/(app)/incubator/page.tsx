import type { Metadata } from "next";
import { IncubatorShell } from "@/users/incubator/incubator";
import { IncubatorDashboard } from "@/users/incubator/components/dashboard/dashboard";

export const metadata: Metadata = { title: "Dashboard · StartupHub Labs" };

export default function Page() {
  return (
    <IncubatorShell title="Dashboard">
      <IncubatorDashboard />
    </IncubatorShell>
  );
}
