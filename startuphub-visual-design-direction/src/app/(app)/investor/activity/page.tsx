import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { ActivityPage } from "@/users/investor/components/ops/workspace";

export const metadata: Metadata = { title: "Activity · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Activity">
      <ActivityPage />
    </InvestorShell>
  );
}
