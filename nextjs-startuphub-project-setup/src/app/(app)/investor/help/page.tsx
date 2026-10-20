import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { HelpPage } from "@/users/investor/components/ops/preferences";

export const metadata: Metadata = { title: "Help & Support · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Help & Support">
      <HelpPage />
    </InvestorShell>
  );
}
