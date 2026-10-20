import type { Metadata } from "next";
import { CorporateShell } from "@/users/corporate/corporate";
import { InnovationAnalytics } from "@/users/corporate/components/analytics";

export const metadata: Metadata = { title: "Innovation Analytics · Arjuna Industries" };

export default function Page() {
  return (
    <CorporateShell title="Innovation Analytics">
      <InnovationAnalytics />
    </CorporateShell>
  );
}
