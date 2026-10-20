import type { Metadata } from "next";
import { CorporateShell } from "@/users/corporate/corporate";
import { PilotPipeline } from "@/users/corporate/components/pilots";

export const metadata: Metadata = { title: "Pilot Pipeline · Arjuna Industries" };

export default function Page() {
  return (
    <CorporateShell title="Pilot Pipeline">
      <PilotPipeline />
    </CorporateShell>
  );
}
