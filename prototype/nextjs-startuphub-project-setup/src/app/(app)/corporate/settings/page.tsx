import type { Metadata } from "next";
import { CorporateShell } from "@/users/corporate/corporate";
import { CorporateSettings } from "@/users/corporate/components/ops/preferences";

export const metadata: Metadata = { title: "Settings · Arjuna Industries" };

export default function Page() {
  return (
    <CorporateShell title="Settings">
      <CorporateSettings />
    </CorporateShell>
  );
}
