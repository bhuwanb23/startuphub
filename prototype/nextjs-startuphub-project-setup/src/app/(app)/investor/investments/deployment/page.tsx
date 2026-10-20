import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { CapitalDeployment } from "@/users/investor/components/investments";

export const metadata: Metadata = { title: "Capital Deployment · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Capital Deployment">
      <CapitalDeployment />
    </InvestorShell>
  );
}
