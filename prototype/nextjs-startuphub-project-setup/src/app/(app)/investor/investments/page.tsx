import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { InvestmentManagement } from "@/users/investor/components/investments";

export const metadata: Metadata = { title: "Investment Management · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Investment Management">
      <InvestmentManagement />
    </InvestorShell>
  );
}
