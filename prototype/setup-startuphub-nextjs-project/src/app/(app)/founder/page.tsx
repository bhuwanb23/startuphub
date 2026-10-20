import type { Metadata } from "next";
import { FounderShell } from "@/users/startup/startup";
import { FounderDashboard } from "@/users/startup/components/dashboard/dashboard";

export const metadata: Metadata = { title: "Overview · Lumen AI" };

export default function Page() {
  return (
    <FounderShell title="Overview">
      <FounderDashboard />
    </FounderShell>
  );
}
