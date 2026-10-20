import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { CommitteeStage } from "@/users/investor/components/pipeline/stages";

export const metadata: Metadata = { title: "Investment Committee · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Investment Committee">
      <CommitteeStage />
    </InvestorShell>
  );
}
