import type { Metadata } from "next";
import { CorporateShell } from "@/users/corporate/corporate";
import { CorporateHelp } from "@/users/corporate/components/ops/preferences";

export const metadata: Metadata = { title: "Help & Support · Arjuna Industries" };

export default function Page() {
  return (
    <CorporateShell title="Help & Support">
      <CorporateHelp />
    </CorporateShell>
  );
}
