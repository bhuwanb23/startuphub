import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { InvestorIntelligence } from "@/users/investor/components/intelligence/intelligence";

export const metadata: Metadata = { title: "Intelligence · Meridian Capital" };

export default function Page() {
  return (
    <InvestorShell title="Intelligence">
      <InvestorIntelligence />
    </InvestorShell>
  );
}
