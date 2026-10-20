import type { Metadata } from "next";
import { CorporateShell } from "@/users/corporate/corporate";
import { RolesPermissions } from "@/users/corporate/components/organization";

export const metadata: Metadata = { title: "Roles & Permissions · Arjuna Industries" };

export default function Page() {
  return (
    <CorporateShell title="Roles & Permissions">
      <RolesPermissions />
    </CorporateShell>
  );
}
