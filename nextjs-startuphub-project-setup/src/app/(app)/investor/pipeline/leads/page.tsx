import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { NewLeads } from "@/users/investor/components/pipeline";

export const metadata: Metadata = { title: "New Leads · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="New Leads">
      <NewLeads />
    </InvestorShell>
  );
}
