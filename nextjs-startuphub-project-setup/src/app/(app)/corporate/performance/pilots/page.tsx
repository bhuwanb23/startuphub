import type { Metadata } from "next";
import { CorporateShell } from "@/users/corporate/corporate";
import { PilotPerformance } from "@/users/corporate/components/performance";

export const metadata: Metadata = { title: "Pilot Performance · Arjuna Industries" };

export default function Page() {
  return (
    <CorporateShell title="Pilot Performance">
      <PilotPerformance />
    </CorporateShell>
  );
}
