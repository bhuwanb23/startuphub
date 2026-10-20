import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { DdFindings } from "@/users/investor/components/dd/reviews";

export const metadata: Metadata = { title: "DD Findings · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="DD Findings">
      <DdFindings />
    </InvestorShell>
  );
}
