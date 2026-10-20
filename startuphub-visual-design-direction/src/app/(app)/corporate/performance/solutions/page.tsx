import type { Metadata } from "next";
import { CorporateShell } from "@/users/corporate/corporate";
import { SolutionPerformance } from "@/users/corporate/components/performance";

export const metadata: Metadata = { title: "Solution Performance · Arjuna Industries" };

export default function Page() {
  return (
    <CorporateShell title="Solution Performance">
      <SolutionPerformance />
    </CorporateShell>
  );
}
