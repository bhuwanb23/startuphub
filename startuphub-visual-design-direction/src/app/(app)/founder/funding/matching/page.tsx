import type { Metadata } from "next";
import { FounderShell } from "@/users/startup/startup";
import { InvestorMatching } from "@/users/startup/components/funding/matching";

export const metadata: Metadata = { title: "Investor Matching · Lumen AI" };

export default function Page() {
  return (
    <FounderShell title="Investor Matching">
      <InvestorMatching />
    </FounderShell>
  );
}
