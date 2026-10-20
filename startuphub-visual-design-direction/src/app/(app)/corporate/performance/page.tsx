import type { Metadata } from "next";
import { CorporateShell } from "@/users/corporate/corporate";
import { PerformanceTracking } from "@/users/corporate/components/performance";

export const metadata: Metadata = { title: "Performance Tracking · Arjuna Industries" };

export default function Page() {
  return (
    <CorporateShell title="Performance Tracking">
      <PerformanceTracking />
    </CorporateShell>
  );
}
