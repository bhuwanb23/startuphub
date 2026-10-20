import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { NetworkFounders } from "@/users/investor/components/network/founders";

export const metadata: Metadata = { title: "Founders · Meridian Capital" };

export default function Page() {
  return (
    <InvestorShell title="Founder Network">
      <NetworkFounders />
    </InvestorShell>
  );
}
