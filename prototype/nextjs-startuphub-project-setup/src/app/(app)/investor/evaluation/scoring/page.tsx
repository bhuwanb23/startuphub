import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { StartupScoring } from "@/users/investor/components/evaluation";

export const metadata: Metadata = { title: "Startup Scoring · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Startup Scoring">
      <StartupScoring />
    </InvestorShell>
  );
}
