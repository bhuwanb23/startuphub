import type { Metadata } from "next";
import { CorporateShell } from "@/users/corporate/corporate";
import { InnovationTeam } from "@/users/corporate/components/organization";

export const metadata: Metadata = { title: "Innovation Team · Arjuna Industries" };

export default function Page() {
  return (
    <CorporateShell title="Innovation Team">
      <InnovationTeam />
    </CorporateShell>
  );
}
