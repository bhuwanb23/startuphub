import type { Metadata } from "next";
import { CorporateShell } from "@/users/corporate/corporate";
import { SolutionDiscovery } from "@/users/corporate/components/discovery";

export const metadata: Metadata = { title: "Solution Discovery · Arjuna Industries" };

export default function Page() {
  return (
    <CorporateShell title="Solution Discovery">
      <SolutionDiscovery />
    </CorporateShell>
  );
}
