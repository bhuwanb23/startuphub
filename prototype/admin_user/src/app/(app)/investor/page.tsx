import type { Metadata } from "next";
import { InvestorDashboard } from "@/users/investor/components/dashboard/dashboard";
import { InvestorShell } from "@/users/investor/investor";

export const metadata: Metadata = {
  title: "Investor Overview · Aditya Rao",
};

export default function Page() {
  return (
    <InvestorShell title="Overview">
      <InvestorDashboard />
    </InvestorShell>
  );
}
