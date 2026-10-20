import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { IpAssessment } from "@/users/investor/components/evaluation/analysis";

export const metadata: Metadata = { title: "IP Assessment · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="IP Assessment">
      <IpAssessment />
    </InvestorShell>
  );
}
