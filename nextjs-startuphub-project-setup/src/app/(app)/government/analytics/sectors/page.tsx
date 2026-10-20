import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { SectorAnalytics } from "@/users/government/components/analytics";

export const metadata: Metadata = { title: "Sector Analytics · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="Sector Analytics">
      <SectorAnalytics />
    </GovernmentShell>
  );
}
