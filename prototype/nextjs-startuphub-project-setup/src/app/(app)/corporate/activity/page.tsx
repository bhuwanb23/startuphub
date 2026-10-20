import type { Metadata } from "next";
import { CorporateShell } from "@/users/corporate/corporate";
import { CorporateActivity } from "@/users/corporate/components/ops/workspace";

export const metadata: Metadata = { title: "Activity · Arjuna Industries" };

export default function Page() {
  return (
    <CorporateShell title="Activity">
      <CorporateActivity />
    </CorporateShell>
  );
}
