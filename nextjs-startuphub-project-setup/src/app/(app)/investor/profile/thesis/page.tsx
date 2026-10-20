import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { InvestmentThesis } from "@/users/investor/components/profile";

export const metadata: Metadata = { title: "Investment Thesis · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Investment Thesis">
      <InvestmentThesis />
    </InvestorShell>
  );
}
