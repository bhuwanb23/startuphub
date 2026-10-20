import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { DdDashboard } from "@/users/investor/components/dd";

export const metadata: Metadata = { title: "Due Diligence Dashboard · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Due Diligence Dashboard">
      <DdDashboard />
    </InvestorShell>
  );
}
