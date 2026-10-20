import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { FollowOnInvestments } from "@/users/investor/components/investments";

export const metadata: Metadata = { title: "Follow-on Investments · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Follow-on Investments">
      <FollowOnInvestments />
    </InvestorShell>
  );
}
