import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { InvestmentMandate } from "@/users/investor/components/profile";

export const metadata: Metadata = { title: "Investment Mandate · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Investment Mandate">
      <InvestmentMandate />
    </InvestorShell>
  );
}
