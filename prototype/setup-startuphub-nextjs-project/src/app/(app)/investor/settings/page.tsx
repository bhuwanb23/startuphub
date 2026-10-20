import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { InvestorSettings } from "@/users/investor/components/settings/settings";

export const metadata: Metadata = { title: "Settings · Meridian Capital" };

export default function Page() {
  return (
    <InvestorShell title="Settings">
      <InvestorSettings />
    </InvestorShell>
  );
}
