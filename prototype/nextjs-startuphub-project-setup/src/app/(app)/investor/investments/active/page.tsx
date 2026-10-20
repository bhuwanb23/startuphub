import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { ActiveInvestments } from "@/users/investor/components/investments";

export const metadata: Metadata = { title: "Active Investments · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Active Investments">
      <ActiveInvestments />
    </InvestorShell>
  );
}
