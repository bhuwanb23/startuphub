import type { Metadata } from "next";
import { IncubatorShell } from "@/users/incubator/incubator";
import { RolesPermissions } from "@/users/incubator/components/organization/roles";

export const metadata: Metadata = { title: "Roles & Permissions · StartupHub Labs" };

export default function Page() {
  return (
    <IncubatorShell title="Roles & Permissions">
      <RolesPermissions />
    </IncubatorShell>
  );
}
