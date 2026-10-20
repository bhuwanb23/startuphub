import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { DealFlow } from "@/users/investor/components/discovery";

export const metadata: Metadata = { title: "Deal Flow · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Deal Flow">
      <DealFlow />
    </InvestorShell>
  );
}
