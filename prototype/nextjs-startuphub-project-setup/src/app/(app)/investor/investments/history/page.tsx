import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { InvestmentHistory } from "@/users/investor/components/investments";

export const metadata: Metadata = { title: "Investment History · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Investment History">
      <InvestmentHistory />
    </InvestorShell>
  );
}
