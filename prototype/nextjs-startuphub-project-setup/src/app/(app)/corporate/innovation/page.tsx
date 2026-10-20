import type { Metadata } from "next";
import { CorporateShell } from "@/users/corporate/corporate";
import { InnovationOverview } from "@/users/corporate/components/innovation";

export const metadata: Metadata = { title: "Innovation Overview · Arjuna Industries" };

export default function Page() {
  return (
    <CorporateShell title="Innovation Overview">
      <InnovationOverview />
    </CorporateShell>
  );
}
