import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { TechnologyReview } from "@/users/investor/components/dd/reviews";

export const metadata: Metadata = { title: "Technology Review · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Technology Review">
      <TechnologyReview />
    </InvestorShell>
  );
}
