import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { StartupDiscovery } from "@/users/investor/components/discovery";

export const metadata: Metadata = { title: "Startup Discovery · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Startup Discovery">
      <StartupDiscovery />
    </InvestorShell>
  );
}
