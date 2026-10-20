import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { InvestorProfile } from "@/users/investor/components/profile";

export const metadata: Metadata = { title: "Investor Profile · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Investor Profile">
      <InvestorProfile />
    </InvestorShell>
  );
}
