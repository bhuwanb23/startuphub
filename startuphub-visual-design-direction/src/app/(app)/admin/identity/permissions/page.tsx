import type { Metadata } from "next";
import { AdminShell } from "@/users/admin/admin";
import { PermissionsAdmin } from "@/users/admin/components/identity/identity";

export const metadata: Metadata = { title: "Permission Management · StartupHub Admin" };

export default function Page() {
  return (
    <AdminShell title="Permission Management">
      <PermissionsAdmin />
    </AdminShell>
  );
}
