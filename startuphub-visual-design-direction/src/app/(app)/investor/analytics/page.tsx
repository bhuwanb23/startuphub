import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { InvestmentAnalytics } from "@/users/investor/components/analytics";

export const metadata: Metadata = { title: "Investment Analytics · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Investment Analytics">
      <InvestmentAnalytics />
    </InvestorShell>
  );
}
