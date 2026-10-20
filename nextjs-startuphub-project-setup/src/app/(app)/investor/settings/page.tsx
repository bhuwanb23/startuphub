import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { SettingsPage } from "@/users/investor/components/ops/preferences";

export const metadata: Metadata = { title: "Settings · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Settings">
      <SettingsPage />
    </InvestorShell>
  );
}
