import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { InvestorDashboard } from "@/users/investor/components/dashboard/overview";

export const metadata: Metadata = { title: "Investor Dashboard · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Investor Dashboard">
      <InvestorDashboard />
    </InvestorShell>
  );
}
