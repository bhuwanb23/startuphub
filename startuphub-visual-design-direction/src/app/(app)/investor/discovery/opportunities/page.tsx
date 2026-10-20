import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { OpportunitiesPage } from "@/users/investor/components/discovery";

export const metadata: Metadata = { title: "Opportunities · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Opportunities">
      <OpportunitiesPage />
    </InvestorShell>
  );
}
