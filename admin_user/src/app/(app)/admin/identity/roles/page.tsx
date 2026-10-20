import type { Metadata } from "next";
import { AdminShell } from "@/users/admin/admin";
import { RolesAdmin } from "@/users/admin/components/identity/identity";

export const metadata: Metadata = { title: "Role Management · StartupHub Admin" };

export default function Page() {
  return (
    <AdminShell title="Role Management">
      <RolesAdmin />
    </AdminShell>
  );
}
