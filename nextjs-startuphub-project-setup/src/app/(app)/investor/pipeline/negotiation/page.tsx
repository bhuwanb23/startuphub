import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { NegotiationStage } from "@/users/investor/components/pipeline/stages";

export const metadata: Metadata = { title: "Negotiation · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Negotiation">
      <NegotiationStage />
    </InvestorShell>
  );
}
