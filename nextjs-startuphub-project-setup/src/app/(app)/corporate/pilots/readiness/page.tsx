import type { Metadata } from "next";
import { CorporateShell } from "@/users/corporate/corporate";
import { DeploymentReadiness } from "@/users/corporate/components/pilots";

export const metadata: Metadata = { title: "Deployment Readiness · Arjuna Industries" };

export default function Page() {
  return (
    <CorporateShell title="Deployment Readiness">
      <DeploymentReadiness />
    </CorporateShell>
  );
}
