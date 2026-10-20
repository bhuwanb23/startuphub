import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { StartupPerformance } from "@/users/investor/components/portfolio";

export const metadata: Metadata = { title: "Startup Performance · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Startup Performance">
      <StartupPerformance />
    </InvestorShell>
  );
}
