import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { TermSheetStage } from "@/users/investor/components/pipeline/stages";

export const metadata: Metadata = { title: "Term Sheet · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Term Sheet">
      <TermSheetStage />
    </InvestorShell>
  );
}
