import type { Metadata } from "next";
import { CorporateShell } from "@/users/corporate/corporate";
import { StartupAnalytics } from "@/users/corporate/components/analytics";

export const metadata: Metadata = { title: "Startup Analytics · Arjuna Industries" };

export default function Page() {
  return (
    <CorporateShell title="Startup Analytics">
      <StartupAnalytics />
    </CorporateShell>
  );
}
