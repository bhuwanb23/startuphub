import type { Metadata } from "next";
import { CorporateShell } from "@/users/corporate/corporate";
import { PilotManagement } from "@/users/corporate/components/pilots";

export const metadata: Metadata = { title: "Pilot Management · Arjuna Industries" };

export default function Page() {
  return (
    <CorporateShell title="Pilot Management">
      <PilotManagement />
    </CorporateShell>
  );
}
