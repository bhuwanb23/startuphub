import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { InvestorDashboard } from "@/users/investor/components/dashboard/dashboard";

export const metadata: Metadata = { title: "Overview · Meridian Capital" };

export default function Page() {
  return (
    <InvestorShell title="Overview">
      <InvestorDashboard />
    </InvestorShell>
  );
}
