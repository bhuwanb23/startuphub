import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { InvestmentPreferences } from "@/users/investor/components/profile";

export const metadata: Metadata = { title: "Investment Preferences · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Investment Preferences">
      <InvestmentPreferences />
    </InvestorShell>
  );
}
