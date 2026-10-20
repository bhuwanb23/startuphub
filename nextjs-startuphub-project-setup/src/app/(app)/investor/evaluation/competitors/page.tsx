import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { CompetitorAnalysis } from "@/users/investor/components/evaluation";

export const metadata: Metadata = { title: "Competitor Analysis · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Competitor Analysis">
      <CompetitorAnalysis />
    </InvestorShell>
  );
}
