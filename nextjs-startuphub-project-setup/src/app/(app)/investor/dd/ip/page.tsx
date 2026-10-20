import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { IpReview } from "@/users/investor/components/dd/reviews";

export const metadata: Metadata = { title: "IP Review · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="IP Review">
      <IpReview />
    </InvestorShell>
  );
}
