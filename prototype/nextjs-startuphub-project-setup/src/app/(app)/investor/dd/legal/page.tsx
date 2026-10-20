import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { LegalReview } from "@/users/investor/components/dd/reviews";

export const metadata: Metadata = { title: "Legal Review · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Legal Review">
      <LegalReview />
    </InvestorShell>
  );
}
