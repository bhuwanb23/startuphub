import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { ScreeningStage } from "@/users/investor/components/pipeline";

export const metadata: Metadata = { title: "Screening · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Screening">
      <ScreeningStage />
    </InvestorShell>
  );
}
