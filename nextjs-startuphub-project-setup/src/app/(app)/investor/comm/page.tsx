import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { FounderCommunication } from "@/users/investor/components/comm";

export const metadata: Metadata = { title: "Founder Communication · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Founder Communication">
      <FounderCommunication />
    </InvestorShell>
  );
}
