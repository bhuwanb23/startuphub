import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { DdChecklist } from "@/users/investor/components/dd";

export const metadata: Metadata = { title: "DD Checklist · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="DD Checklist">
      <DdChecklist />
    </InvestorShell>
  );
}
