import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { TeamAnalysis } from "@/users/investor/components/evaluation/analysis";

export const metadata: Metadata = { title: "Team Analysis · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Team Analysis">
      <TeamAnalysis />
    </InvestorShell>
  );
}
