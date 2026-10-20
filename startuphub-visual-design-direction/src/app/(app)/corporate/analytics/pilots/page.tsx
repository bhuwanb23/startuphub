import type { Metadata } from "next";
import { CorporateShell } from "@/users/corporate/corporate";
import { PilotAnalytics } from "@/users/corporate/components/analytics";

export const metadata: Metadata = { title: "Pilot Analytics · Arjuna Industries" };

export default function Page() {
  return (
    <CorporateShell title="Pilot Analytics">
      <PilotAnalytics />
    </CorporateShell>
  );
}
