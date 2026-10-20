import type { Metadata } from "next";
import { CorporateShell } from "@/users/corporate/corporate";
import { CorporateCalendar } from "@/users/corporate/components/ops/workspace";

export const metadata: Metadata = { title: "Calendar · Arjuna Industries" };

export default function Page() {
  return (
    <CorporateShell title="Calendar">
      <CorporateCalendar />
    </CorporateShell>
  );
}
