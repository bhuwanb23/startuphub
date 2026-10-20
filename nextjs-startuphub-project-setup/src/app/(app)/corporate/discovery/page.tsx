import type { Metadata } from "next";
import { CorporateShell } from "@/users/corporate/corporate";
import { StartupDiscovery } from "@/users/corporate/components/discovery";

export const metadata: Metadata = { title: "Startup Discovery · Arjuna Industries" };

export default function Page() {
  return (
    <CorporateShell title="Startup Discovery">
      <StartupDiscovery />
    </CorporateShell>
  );
}
