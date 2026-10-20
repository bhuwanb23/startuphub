import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { RolesPermissions } from "@/users/government/components/organization";

export const metadata: Metadata = { title: "Roles & Permissions · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="Roles & Permissions">
      <RolesPermissions />
    </GovernmentShell>
  );
}
