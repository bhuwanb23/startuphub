import type { Metadata } from "next";
import { CorporateShell } from "@/users/corporate/corporate";
import { StartupPerformance } from "@/users/corporate/components/performance";

export const metadata: Metadata = { title: "Startup Performance · Arjuna Industries" };

export default function Page() {
  return (
    <CorporateShell title="Startup Performance">
      <StartupPerformance />
    </CorporateShell>
  );
}
