import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { DealAnalytics } from "@/users/investor/components/analytics";

export const metadata: Metadata = { title: "Deal Analytics · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Deal Analytics">
      <DealAnalytics />
    </InvestorShell>
  );
}
