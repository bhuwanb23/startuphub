import type { Metadata } from "next";
import { CorporateShell } from "@/users/corporate/corporate";
import { CorporateNotifications } from "@/users/corporate/components/ops/workspace";

export const metadata: Metadata = { title: "Notifications · Arjuna Industries" };

export default function Page() {
  return (
    <CorporateShell title="Notifications">
      <CorporateNotifications />
    </CorporateShell>
  );
}
