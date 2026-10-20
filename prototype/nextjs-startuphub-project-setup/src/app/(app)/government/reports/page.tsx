import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { StartupReports } from "@/users/government/components/reports";

export const metadata: Metadata = { title: "Startup Reports · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="Startup Reports">
      <StartupReports />
    </GovernmentShell>
  );
}
